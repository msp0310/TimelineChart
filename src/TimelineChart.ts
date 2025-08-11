import { Config } from "./config/config"; // 正しい小文字パス
import TimeUnitElement from "./TimeUnitElement";
import Tooltip from "./tooltip"; // 正しい小文字パス
import { DateTime } from "./core/TimeSpan";
import DateTimeHelper from "./extensions/DateTimeExtension";

/**
 * Timeline Chart.
 *
 * (C) Sawada Makoto | MIT License
 */
export default class TimelineChart {
  /**
   * 要素
   */
  public element: HTMLCanvasElement;

  /**
   * Canvas
   */
  public canvas: CanvasRenderingContext2D;

  /**
   * Config
   */
  public config: Config;

  /**
   * 時間ごと
   */
  public timeUnits: TimeUnitElement[];

  /**
   * ツールチップ
   */
  public tooltip: Tooltip;

  /**
   * バイナリサーチ用: 各ユニット開始分(開始境界からの経過分)
   */
  private startMinutesArray: number[] = [];

  /** イベントハンドラ参照保持 */
  private mouseMoveHandler: (ev: MouseEvent) => void;
  private mouseOutHandler: (ev: MouseEvent) => void;
  // リサイズ時の再描画は無効化したためハンドラ類は撤去

  /**
   * 合計（分）
   */
  public get totalMinutes(): number {
    return this.config.time.totalMinutes;
  }

  /**
   * 1分当たりの幅
   */
  public get oneMinuteWidth(): number {
    return this.drawableWidth / this.totalMinutes;
  }

  /**
   * Canvasの幅
   */
  public get elementWidth(): number {
    return this.element.clientWidth;
  }

  /**
   * Canvasの高さ
   */
  public get elementHeight(): number {
    return this.element.clientHeight;
  }

  /**
   * 描画可能な幅
   * (ボーダー・パディングを除く)
   */
  public get drawableWidth(): number {
    return (
      this.elementWidth -
      this.config.borderWidth -
      (this.config.layout.padding.left + this.config.layout.padding.right)
    );
  }

  /**
   * 描画可能な高さ
   */
  public get drawableHeight(): number {
    return this.elementHeight;
  }

  /** 時間帯バンド高さ */
  private get hourBandHeight(): number {
    return this.config.hourBand?.show ? this.config.hourBand.height : 0;
  }

  /** ユニット描画領域の上端オフセット */
  private get unitsTopOffset(): number {
    if (!this.config.hourBand?.show) return 0;
    return this.config.hourBand.placement === "top"
      ? this.config.hourBand.height
      : 0;
  }

  /** ユニット描画領域高さ */
  private get unitsDrawableHeight(): number {
    if (!this.config.hourBand?.show) return this.drawableHeight;
    return this.drawableHeight - this.config.hourBand.height;
  }

  constructor(element: HTMLCanvasElement, obj: any) {
    this.element = element;
    const ctx = this.element.getContext("2d");
    if (!ctx) {
      throw new Error("2D canvas context を取得できませんでした");
    }
    this.canvas = ctx as CanvasRenderingContext2D;
    this.tooltip = new Tooltip();
    this.config = new Config(obj?.config || {});

    // 初回のみ DPI を反映 (リサイズ時の再描画は行わない)
    const dpr = (window as any).devicePixelRatio || 1;
    const rect = this.element.getBoundingClientRect();
    if (rect.width && rect.height) {
      this.element.width = Math.max(1, Math.round(rect.width * dpr));
      this.element.height = Math.max(1, Math.round(rect.height * dpr));
      if (dpr !== 1) {
        this.canvas.scale(dpr, dpr);
      }
    }

    // generate time units with validation / clipping
    const startBoundary = this.config.time.start;
    const endBoundary = this.config.time.end;
    this.timeUnits = [];
    (obj?.data || []).forEach((unit: any, index: number) => {
      const rawStart = DateTimeHelper.parse(unit.startTime);
      const rawEnd = DateTimeHelper.parse(unit.endTime);
      // skip invalid
      if (!rawStart || !rawEnd || rawEnd.compareTo(rawStart) <= 0) {
        // 無効ユニットは無視
        return;
      }
      // クリッピング
      let clippedStart =
        rawStart.compareTo(startBoundary) < 0 ? startBoundary : rawStart;
      let clippedEnd = rawEnd.compareTo(endBoundary) > 0 ? endBoundary : rawEnd;
      if (clippedEnd.compareTo(clippedStart) <= 0) {
        return; // 完全に範囲外
      }
      const timeUnit = new TimeUnitElement(
        clippedStart,
        clippedEnd,
        this.oneMinuteWidth,
        unit.color,
        unit.label
      );
      // 0分要素はスキップ
      if (timeUnit.totalMinutes === 0) return;
      this.timeUnits.push(timeUnit);
    });

    // start 時刻でソート
    this.timeUnits.sort((a, b) => a.startTime.compareTo(b.startTime));
    this.rebuildStartMinutesArray();

    this.Initialize();

    // Attach Events (参照保持で destroy 時に解除可能に)
    this.mouseMoveHandler = (ev: MouseEvent) => this.onMouseMove(this, ev);
    this.mouseOutHandler = (ev: MouseEvent) => this.onMouseOut(this, ev);
    this.element.addEventListener("mousemove", this.mouseMoveHandler, false);
    this.element.addEventListener("mouseout", this.mouseOutHandler, false);

  // リサイズ時の再描画処理は要求により削除
  }

  /**
   * Initialize
   */
  private Initialize() {
    this.drawBackground();
    this.drawBorder();
  }

  /**
   * Draw.
   */
  public draw(): void {
    // クリア
    this.canvas.clearRect(0, 0, this.element.width, this.element.height);
    this.drawBackground();
    this.drawBorder();

    // 時間帯バンド
    if (this.config.hourBand?.show) {
      this.drawHourBand();
    }

    const borderWidth = this.config.borderWidth;
    const startDateTime = this.config.time.start;
    const labelConfig = this.config.label;
    const padding = this.config.layout.padding;
    const self = this;

    if (this.config.hourBand?.only) {
      return; // 時間帯のみ表示
    }

    const unitsTopOffset = this.unitsTopOffset;
    const unitsHeight = this.unitsDrawableHeight;

    this.timeUnits.forEach(function (timeUnit) {
      if (timeUnit.totalMinutes === 0) return;
      // oneMinuteWidth 同期 (リサイズ対応)
      timeUnit.oneMinuteWidth = self.oneMinuteWidth;
      const startMinutes = DateTime.between(
        startDateTime,
        timeUnit.startTime
      ).minutes;
      const x = padding.left + borderWidth + startMinutes * self.oneMinuteWidth;
      const y = padding.top + borderWidth + unitsTopOffset;
      const height =
        unitsHeight - borderWidth * 2 - (padding.top + padding.bottom);
      const width = timeUnit.width;
      self.canvas.fillStyle = timeUnit.color || "#fff";
      self.canvas.fillRect(x, y, width, height);

      if (labelConfig.showLabel && timeUnit.label) {
        // 背景色から簡易的にコントラスト判定 (輝度計算) して文字色を黒/白
        const rgb = self.canvas.fillStyle.match(/rgba?\((\d+),(\d+),(\d+)/);
        let textColor = "black";
        if (rgb) {
          const r = parseInt(rgb[1], 10),
            g = parseInt(rgb[2], 10),
            b = parseInt(rgb[3], 10);
          const l = 0.299 * r + 0.587 * g + 0.114 * b;
          textColor = l < 140 ? "white" : "black";
        }
        self.canvas.fillStyle = textColor;
        self.canvas.font = labelConfig.fontSize + " " + labelConfig.fontFamily;
        // 垂直中央寄せ (テキストベースライン調整)
        self.canvas.textBaseline = "middle";
        // 最小幅チェック
        if (width >= labelConfig.minWidthForText) {
          const available = width - 4; // 左右マージン
          const fontSizePx = parseInt(labelConfig.fontSize, 10) || 12;
          const lineHeight = fontSizePx * (labelConfig.lineHeight || 1.2);
          const maxLines = labelConfig.maxLines;
          const verticalCenter = y + height / 2;

          if (labelConfig.wrap) {
            // 単語境界を気にせず文字単位でラップ (日本語想定)
            const original = timeUnit.label;
            const lines: string[] = [];
            let current = "";
            for (let i = 0; i < original.length; i++) {
              const ch = original[i];
              const test = current + ch;
              const w = self.canvas.measureText(test).width;
              if (w <= available) {
                current = test;
              } else {
                if (current.length > 0) {
                  lines.push(current);
                }
                current = ch;
              }
              if (maxLines && lines.length >= maxLines) {
                break;
              }
            }
            if (current.length > 0 && (!maxLines || lines.length < maxLines)) {
              lines.push(current);
            }
            // maxLines 超過分を省略
            if (maxLines && lines.length > maxLines) {
              lines.length = maxLines;
            }
            // 縦位置: 全体高さ内で中央揃え
            const totalTextHeight = lines.length * lineHeight;
            let startY = verticalCenter - totalTextHeight / 2 + lineHeight / 2;
            for (let li = 0; li < lines.length; li++) {
              self.canvas.fillText(
                lines[li],
                x + 2,
                startY + li * lineHeight,
                available
              );
            }
          } else {
            let text = timeUnit.label;
            let measured = self.canvas.measureText(text).width;
            if (measured > available) {
              if (!labelConfig.useEllipsis) {
                return; // 非表示
              }
              const ellipsis = "…";
              const ellipsisWidth = self.canvas.measureText(ellipsis).width;
              let left = 0;
              let right = text.length - 1;
              let cut = 0;
              while (left <= right) {
                const mid = (left + right) >> 1;
                const substr = text.slice(0, mid + 1);
                const w = self.canvas.measureText(substr).width + ellipsisWidth;
                if (w <= available) {
                  cut = mid + 1;
                  left = mid + 1;
                } else {
                  right = mid - 1;
                }
              }
              text = text.slice(0, cut) + ellipsis;
            }
            self.canvas.fillText(text, x + 2, verticalCenter, available);
          }
        }
      }
    });
  }

  // #region Private Functions.
  private onMouseMove(sender: TimelineChart, event: MouseEvent) {
    const rect = this.element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const padding = this.config.layout.padding;
    const shouldShowTooltip = this.config.tooltip != null;
    const startDateTime = this.config.time.start;

    if (!shouldShowTooltip) {
      return;
    }

    // パディング範囲は無視
    // left, right, top, bottom
    const unitsTopOffset = this.unitsTopOffset;
    const unitsHeight = this.unitsDrawableHeight;
    // ユニット領域外 (時間帯バンド含め) は無視
    // バンドのみ表示のときはツールチップ無効
    if (this.config.hourBand?.only) {
      this.tooltip.hide();
      return;
    }
    if (
      x < padding.left ||
      x > this.drawableWidth - padding.right ||
      y < padding.top + unitsTopOffset ||
      y > padding.top + unitsTopOffset + unitsHeight - padding.bottom
    ) {
      this.tooltip.hide();
      return;
    }

    const minutesFromStart =
      (x - padding.left - this.config.borderWidth) / this.oneMinuteWidth;
    const idx = this.binarySearchUnit(minutesFromStart);
    if (idx >= 0) {
      const unit = this.timeUnits[idx];
      const startMinutes = this.startMinutesArray[idx];
      if (
        minutesFromStart >= startMinutes &&
        minutesFromStart <= startMinutes + unit.totalMinutes
      ) {
        this.tooltip.setPosition(event.clientX, event.clientY);
        this.tooltip.text = this.config.tooltip(unit);
        this.tooltip.show();
        return;
      }
    }
    this.tooltip.hide();
  }

  private onMouseOut(sender: TimelineChart, event: MouseEvent) {
    this.tooltip.hide();
  }

  /**
   * Draw Border.
   */
  private drawBorder() {
    if (this.config.borderWidth <= 0) {
      return;
    }

    const padding = this.config.layout.padding;
    const bw = this.config.borderWidth;
    const x = padding.left;
    const y = padding.top;
    // clientWidth/Height ベースで論理ピクセルサイズを取得
    const w = this.elementWidth - padding.y - bw;
    const h = this.elementHeight - padding.x - bw;
    this.canvas.strokeStyle = this.config.borderColor;
    this.canvas.lineWidth = bw;
    this.canvas.strokeRect(
      x + bw / 2,
      y + bw / 2,
      Math.max(0, w),
      Math.max(0, h)
    );
  }

  /**
   * Draw Background.
   */
  private drawBackground() {
    const padding = this.config.layout.padding;
    this.canvas.fillStyle = this.config.backgroundColor;
    this.canvas.fillRect(
      padding.left,
      padding.top,
      this.drawableWidth,
      this.drawableHeight - padding.x
    );
  }

  /**
   * リソース解放 (イベント解除)
   */
  public destroy(): void {
    if (this.mouseMoveHandler) {
      this.element.removeEventListener("mousemove", this.mouseMoveHandler);
    }
    if (this.mouseOutHandler) {
      this.element.removeEventListener("mouseout", this.mouseOutHandler);
    }
  }
  // #endregion

  /** 開始分配列再構築 */
  private rebuildStartMinutesArray(): void {
    const startDateTime = this.config.time.start;
    this.startMinutesArray = this.timeUnits.map(
      (u) => DateTime.between(startDateTime, u.startTime).minutes
    );
  }

  /** minutesFromStart に対して開始分が最大で start<= target のユニット index を返す */
  private binarySearchUnit(minutesFromStart: number): number {
    let low = 0;
    let high = this.startMinutesArray.length - 1;
    let candidate = -1;
    while (low <= high) {
      const mid = (low + high) >> 1;
      const val = this.startMinutesArray[mid];
      if (val <= minutesFromStart) {
        candidate = mid;
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
    return candidate;
  }

  /** 時間帯バンド描画 */
  private drawHourBand(): void {
    const hb = this.config.hourBand;
    if (!hb?.show) return;
    const padding = this.config.layout.padding;
    const borderWidth = this.config.borderWidth;
    const start = this.config.time.start.toDate();
    const end = this.config.time.end.toDate();
    const oneMinuteWidth = this.oneMinuteWidth;
    const placementTop = hb.placement === "top";

    // only モードではバンドを全高に拡張
    const hourHeight = hb.only
      ? this.drawableHeight - (padding.top + padding.bottom) - borderWidth * 2
      : hb.height;
    const bandY = placementTop
      ? padding.top + borderWidth
      : this.elementHeight - padding.bottom - borderWidth - hourHeight;

    // 背景帯
    this.canvas.save();
    this.canvas.font = hb.fontSize + " " + hb.fontFamily;
    this.canvas.textBaseline = "middle";
    this.canvas.fillStyle = hb.color;

    // 開始を次の「分=0」へ丸め
    const cursor = new Date(start.getTime());
    if (cursor.getMinutes() !== 0 || cursor.getSeconds() !== 0) {
      cursor.setMinutes(0, 0, 0);
      if (cursor.getTime() < start.getTime()) {
        cursor.setHours(cursor.getHours() + 1);
      }
    }
    // (上で算出済み)

    while (cursor.getTime() < end.getTime()) {
      const hourStartMs = cursor.getTime();
      const hourEndMs = new Date(cursor.getTime());
      hourEndMs.setHours(hourEndMs.getHours() + 1);
      const clampedEnd = Math.min(hourEndMs.getTime(), end.getTime());
      const minutesFromStart = (hourStartMs - start.getTime()) / 60000;
      const minutesLen = (clampedEnd - hourStartMs) / 60000;
      const x = padding.left + borderWidth + minutesFromStart * oneMinuteWidth;
      const w = minutesLen * oneMinuteWidth;

      // 交互塗り
      if (hb.alternateFill && cursor.getHours() % 2 === 1) {
        this.canvas.fillStyle = hb.alternateFill;
        this.canvas.fillRect(x, bandY, w, hourHeight);
      }

      // 区切り線
      if (hb.showSeparators) {
        this.canvas.strokeStyle = hb.lineColor;
        this.canvas.lineWidth = 1;
        this.canvas.beginPath();
        this.canvas.moveTo(x + 0.5, bandY);
        this.canvas.lineTo(x + 0.5, bandY + hourHeight);
        this.canvas.stroke();
      }

      // 時刻ラベル
      this.canvas.fillStyle = hb.color;
      const hourStr = ("0" + cursor.getHours()).slice(-2);
      const textX = x + 2;
      const textY = bandY + hourHeight / 2;
      this.canvas.fillText(hourStr, textX, textY, w - 4);

      // 次の時間へ
      cursor.setHours(cursor.getHours() + 1, 0, 0, 0);
    }

    // 外枠線（バンド区切り）: only モードでは全体枠線を優先するため省略
    if (!hb.only) {
      this.canvas.strokeStyle = hb.lineColor;
      this.canvas.lineWidth = 1;
      this.canvas.strokeRect(
        padding.left + borderWidth,
        bandY,
        this.drawableWidth - borderWidth * 2,
        hourHeight
      );
    }

    this.canvas.restore();
  }

  // リサイズ関連メソッドは削除済み
}

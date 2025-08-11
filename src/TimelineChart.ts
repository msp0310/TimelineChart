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

  constructor(element: HTMLCanvasElement, obj: any) {
    this.element = element;
    const ctx = this.element.getContext("2d");
    if (!ctx) {
      throw new Error("2D canvas context を取得できませんでした");
    }
    this.canvas = ctx as CanvasRenderingContext2D;
    this.tooltip = new Tooltip();
    this.config = new Config(obj?.config || {});

    // High DPI 対応: 物理ピクセル密度を考慮
    const dpr = (window as any).devicePixelRatio || 1;
    const logicalWidth = this.element.clientWidth;
    const logicalHeight = this.element.clientHeight;
    if (dpr !== 1) {
      this.element.width = logicalWidth * dpr;
      this.element.height = logicalHeight * dpr;
      this.canvas.scale(dpr, dpr);
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

    const borderWidth = this.config.borderWidth;
    const startDateTime = this.config.time.start;
    const labelConfig = this.config.label;
    const padding = this.config.layout.padding;
    const self = this;

    this.timeUnits.forEach(function (timeUnit) {
      if (timeUnit.totalMinutes === 0) return;
      // oneMinuteWidth 同期 (リサイズ対応)
      timeUnit.oneMinuteWidth = self.oneMinuteWidth;
      const startMinutes = DateTime.between(
        startDateTime,
        timeUnit.startTime
      ).minutes;
      const x = padding.left + borderWidth + startMinutes * self.oneMinuteWidth;
      const y = padding.top + borderWidth;
      const height =
        self.drawableHeight - borderWidth * 2 - (padding.top + padding.bottom);
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
        self.canvas.fillText(timeUnit.label, x + 2, y + height / 2, width - 4);
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
    if (
      x < padding.left ||
      x > this.drawableWidth - padding.right ||
      y < padding.top ||
      y > this.drawableHeight - padding.bottom
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

    // top and bottom
    this.canvas.strokeStyle = this.config.borderColor;
    this.canvas.lineWidth = this.config.borderWidth * 2;
    this.canvas.strokeRect(
      padding.left,
      padding.top,
      this.element.width - padding.y,
      this.element.height - padding.x
    );
  }

  /**
   * Draw Background.
   */
  private drawBackground() {
    const padding = this.config.layout.padding;

    this.canvas.fillStyle = this.config.backgroundColor;
    this.canvas.fillRect(
      this.config.layout.padding.left,
      this.config.layout.padding.top,
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
}

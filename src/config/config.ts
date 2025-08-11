import TimeUnitElement from "../TimeUnitElement";
import { DateTime } from "../core/TimeSpan";
import DateTimeHelper from "../extensions/DateTimeExtension";

/**
 * 設定.
 */
export class Config {
  /**
   * 背景色
   */
  public borderColor: string;

  /**
   * 枠線の幅
   */
  public borderWidth: number;

  /**
   * 枠線の色
   */
  public backgroundColor: string;

  /**
   * ツールチップの表示文字
   */
  public tooltip: (timeUnit: TimeUnitElement) => string;

  /**
   * レイアウトに関する設定
   */
  public layout: LayoutConfig;

  /**
   * 範囲設定
   */
  public time: TimeConfig;

  /**
   * ラベルの設定
   */
  public label: LabelConfig;

  /**
   * 時間帯（時刻HH）バンド設定
   */
  public hourBand: HourBandConfig;

  /**
   * Constructor
   * @param config Config
   */
  constructor(config: any) {
    config = config || {};
    this.borderColor = config.borderColor || "#000";
    this.borderWidth = Number(config.borderWidth || 1);
    this.backgroundColor = config.backgroundColor || "transparent";
    this.tooltip = config.tooltip;
    this.layout = LayoutConfig.from(config.layout || {});
    this.time = TimeConfig.from(config.time || {});
    this.label = LabelConfig.from(config.label || {});
    this.hourBand = HourBandConfig.from(config.hourBand || {});
  }
}

/**
 * TimeUnit Config.
 */
class TimeUnitConfig {
  public startTime!: string;
  public endTime!: string;
  public color!: string;
  public label!: string;
}

/**
 * 時間に関する設定
 */
class TimeConfig {
  /**
   * 開始時間
   */
  public start!: DateTime;

  /**
   * 終了時間
   */
  public end!: DateTime;

  /**
   * 合計(分)
   */
  public get totalMinutes(): number {
    return DateTime.between(this.start, this.end).minutes;
  }

  static from(config: any) {
    config = config || {};

    const timeConfig = new TimeConfig();
    timeConfig.start = DateTimeHelper.parse(config.start || "00:00");
    timeConfig.end = DateTimeHelper.parse(config.end || "24:00");

    return timeConfig;
  }
}

/**
 * ラベルに関する設定
 */
class LabelConfig {
  /**
   * フォントの種類
   */
  public fontFamily!: string;

  /**
   * フォントサイズ
   */
  public fontSize!: string;

  /**
   * ラベルの表示有無
   */
  public showLabel!: boolean;

  /**
   * ラベルを表示する最小幅(px)。これ未満なら描画しない
   */
  public minWidthForText!: number;

  /**
   * 省略表示に "…" を使うか
   */
  public useEllipsis!: boolean;

  /**
   * ラベルを折り返して表示するか
   */
  public wrap!: boolean;

  /**
   * 折り返し時の最大行数 (undefined/null なら高さに収まる限り)
   */
  public maxLines?: number;

  /**
   * 行間係数 (フォントサイズ * lineHeight)
   */
  public lineHeight!: number;

  /** 背景色から自動で白/黒を選ぶ */
  public autoContrast!: boolean;

  /** しきい値 (0-255)。これ未満なら白文字、それ以外黒文字 */
  public contrastThreshold!: number;

  static from(config: any) {
    const labelConfig = new LabelConfig();
    labelConfig.fontFamily = config.fontFamily || "メイリオ";
    labelConfig.fontSize = config.fontSize || "14px";
    labelConfig.showLabel = config.showLabel || false;
    labelConfig.minWidthForText = Number(config.minWidthForText || 20); // 20px 未満は読めないので非表示
    labelConfig.useEllipsis =
      config.useEllipsis !== undefined ? !!config.useEllipsis : true;
    labelConfig.wrap = !!config.wrap;
    labelConfig.maxLines =
      config.maxLines !== undefined && config.maxLines !== null
        ? Number(config.maxLines)
        : undefined;
    labelConfig.lineHeight = Number(config.lineHeight || 1.2);
    labelConfig.autoContrast = config.autoContrast !== undefined ? !!config.autoContrast : true;
    labelConfig.contrastThreshold = Number(
      config.contrastThreshold !== undefined ? config.contrastThreshold : 140
    );

    return labelConfig;
  }
}

/**
 * レイアウトに関する設定
 */
class LayoutConfig {
  public padding!: PaddingConfig;

  static from(layout: any) {
    const padding = layout.padding || {};
    const config = new LayoutConfig();
    config.padding = PaddingConfig.from(
      padding.left,
      padding.top,
      padding.right,
      padding.bottom
    );

    return config;
  }
}

/**
 * 時間帯(時間)バンド設定
 */
class HourBandConfig {
  public show!: boolean; // 表示するか
  public only!: boolean; // これのみ表示（ユニット非表示）
  public placement!: "top" | "bottom"; // 位置
  public height!: number; // バンド高さ
  public fontSize!: string;
  public fontFamily!: string;
  public color!: string;
  public lineColor!: string; // 区切り線色
  public showSeparators!: boolean; // 区切り線を表示
  public alternateFill?: string; // 偶数/奇数時間で背景交互塗りつぶし(オッド時間)

  static from(config: any): HourBandConfig {
    const c = new HourBandConfig();
    c.show = !!config.show;
    c.only = !!config.only;
    c.placement = config.placement === "top" ? "top" : "bottom";
    c.height = Number(config.height || 20);
    c.fontSize = config.fontSize || "10px";
    c.fontFamily = config.fontFamily || "メイリオ";
    c.color = config.color || "#000";
    c.lineColor = config.lineColor || "#ccc";
    c.showSeparators =
      config.showSeparators !== undefined ? !!config.showSeparators : true;
    c.alternateFill = config.alternateFill; // 例: 'rgba(0,0,0,0.03)'
    return c;
  }
}

/**
 * Paddingの設定
 */
class PaddingConfig {
  /**
   * Left
   */
  public left!: number;

  /**
   * Top
   */
  public top!: number;

  /**
   * Right
   */
  public right!: number;

  /**
   * Bottom
   */
  public bottom!: number;

  public get x(): number {
    return this.top + this.bottom;
  }

  public get y(): number {
    return this.left + this.right;
  }

  static from(
    left: string,
    top: string,
    right: string,
    bottom: string
  ): PaddingConfig {
    const paddingConfig = new PaddingConfig();
    paddingConfig.left = parseInt(left || "0");
    paddingConfig.top = parseInt(top || "0");
    paddingConfig.right = parseInt(right || "0");
    paddingConfig.bottom = parseInt(bottom || "0");

    return paddingConfig;
  }
}

import TimeUnitElement from "../TimeUnitElement";
import DateTime from "typescript-dotnet-es6/System/Time/DateTime";
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

  static from(config: any) {
    const labelConfig = new LabelConfig();
    labelConfig.fontFamily = config.fontFamily || "メイリオ";
    labelConfig.fontSize = config.fontSize || "14px";
    labelConfig.showLabel = config.showLabel || false;

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

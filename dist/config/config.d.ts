import TimeUnitElement from "../TimeUnitElement";
import { DateTime } from "../core/TimeSpan";
/**
 * 設定.
 */
export declare class Config {
    /**
     * 背景色
     */
    borderColor: string;
    /**
     * 枠線の幅
     */
    borderWidth: number;
    /**
     * 枠線の色
     */
    backgroundColor: string;
    /**
     * ツールチップの表示文字
     */
    tooltip: (timeUnit: TimeUnitElement) => string;
    /**
     * レイアウトに関する設定
     */
    layout: LayoutConfig;
    /**
     * 範囲設定
     */
    time: TimeConfig;
    /**
     * ラベルの設定
     */
    label: LabelConfig;
    /**
     * 時間帯（時刻HH）バンド設定
     */
    hourBand: HourBandConfig;
    /**
     * Constructor
     * @param config Config
     */
    constructor(config: any);
}
/**
 * 時間に関する設定
 */
declare class TimeConfig {
    /**
     * 開始時間
     */
    start: DateTime;
    /**
     * 終了時間
     */
    end: DateTime;
    /**
     * 合計(分)
     */
    get totalMinutes(): number;
    static from(config: any): TimeConfig;
}
/**
 * ラベルに関する設定
 */
declare class LabelConfig {
    /**
     * フォントの種類
     */
    fontFamily: string;
    /**
     * フォントサイズ
     */
    fontSize: string;
    /**
     * ラベルの表示有無
     */
    showLabel: boolean;
    /**
     * ラベルを表示する最小幅(px)。これ未満なら描画しない
     */
    minWidthForText: number;
    /**
     * 省略表示に "…" を使うか
     */
    useEllipsis: boolean;
    /**
     * ラベルを折り返して表示するか
     */
    wrap: boolean;
    /**
     * 折り返し時の最大行数 (undefined/null なら高さに収まる限り)
     */
    maxLines?: number;
    /**
     * 行間係数 (フォントサイズ * lineHeight)
     */
    lineHeight: number;
    /** 背景色から自動で白/黒を選ぶ */
    autoContrast: boolean;
    /** しきい値 (0-255)。これ未満なら白文字、それ以外黒文字 */
    contrastThreshold: number;
    static from(config: any): LabelConfig;
}
/**
 * レイアウトに関する設定
 */
declare class LayoutConfig {
    padding: PaddingConfig;
    static from(layout: any): LayoutConfig;
}
/**
 * 時間帯(時間)バンド設定
 */
declare class HourBandConfig {
    show: boolean;
    only: boolean;
    placement: "top" | "bottom";
    height: number;
    fontSize: string;
    fontFamily: string;
    color: string;
    lineColor: string;
    showSeparators: boolean;
    alternateFill?: string;
    static from(config: any): HourBandConfig;
}
/**
 * Paddingの設定
 */
declare class PaddingConfig {
    /**
     * Left
     */
    left: number;
    /**
     * Top
     */
    top: number;
    /**
     * Right
     */
    right: number;
    /**
     * Bottom
     */
    bottom: number;
    get x(): number;
    get y(): number;
    static from(left: string, top: string, right: string, bottom: string): PaddingConfig;
}
export {};

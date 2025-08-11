import { Config } from "./config/config";
import TimeUnitElement from "./TimeUnitElement";
import Tooltip from "./tooltip";
/**
 * Timeline Chart.
 *
 * (C) Sawada Makoto | MIT License
 */
export default class TimelineChart {
    /**
     * 要素
     */
    element: HTMLCanvasElement;
    /**
     * Canvas
     */
    canvas: CanvasRenderingContext2D;
    /**
     * Config
     */
    config: Config;
    /**
     * 時間ごと
     */
    timeUnits: TimeUnitElement[];
    /**
     * ツールチップ
     */
    tooltip: Tooltip;
    /**
     * バイナリサーチ用: 各ユニット開始分(開始境界からの経過分)
     */
    private startMinutesArray;
    /** イベントハンドラ参照保持 */
    private mouseMoveHandler;
    private mouseOutHandler;
    /**
     * 合計（分）
     */
    get totalMinutes(): number;
    /**
     * 1分当たりの幅
     */
    get oneMinuteWidth(): number;
    /**
     * Canvasの幅
     */
    get elementWidth(): number;
    /**
     * Canvasの高さ
     */
    get elementHeight(): number;
    /**
     * 描画可能な幅
     * (ボーダー・パディングを除く)
     */
    get drawableWidth(): number;
    /**
     * 描画可能な高さ
     */
    get drawableHeight(): number;
    /** 時間帯バンド高さ */
    private get hourBandHeight();
    /** ユニット描画領域の上端オフセット */
    private get unitsTopOffset();
    /** ユニット描画領域高さ */
    private get unitsDrawableHeight();
    constructor(element: HTMLCanvasElement, obj: any);
    /**
     * Initialize
     */
    private Initialize;
    /**
     * Draw.
     */
    draw(): void;
    private onMouseMove;
    private onMouseOut;
    /**
     * Draw Border.
     */
    private drawBorder;
    /**
     * Draw Background.
     */
    private drawBackground;
    /**
     * リソース解放 (イベント解除)
     */
    destroy(): void;
    /** 開始分配列再構築 */
    private rebuildStartMinutesArray;
    /** minutesFromStart に対して開始分が最大で start<= target のユニット index を返す */
    private binarySearchUnit;
    /** 時間帯バンド描画 */
    private drawHourBand;
}

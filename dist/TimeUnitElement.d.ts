import { DateTime } from "./core/TimeSpan";
/**
 * Time Unit Element.
 */
export default class TimeUnitElement {
    /**
     * 開始時間
     */
    startTime: DateTime;
    /**
     * 終了時間
     */
    endTime: DateTime;
    /**
     * 1分あたりの幅
     */
    oneMinuteWidth: number;
    /**
     * 色
     */
    color: string;
    /**
     * ラベル
     */
    label: string;
    constructor(startTime: DateTime, endTime: DateTime, oneMinuteWidth: number, color: string | undefined, label: string);
    get totalMinutes(): number;
    get startTimeText(): string;
    get endTimeText(): string;
    get width(): number;
    private getDateTimeText;
}

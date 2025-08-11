import { DateTime } from "./core/TimeSpan";

/**
 * Time Unit Element.
 */
export default class TimeUnitElement {
  /**
   * 開始時間
   */
  public startTime: DateTime;

  /**
   * 終了時間
   */
  public endTime: DateTime;

  /**
   * 1分あたりの幅
   */
  public oneMinuteWidth: number;

  /**
   * 色
   */
  public color: string = "#fff";

  /**
   * ラベル
   */
  public label: string;

  constructor(
    startTime: DateTime,
    endTime: DateTime,
    oneMinuteWidth: number,
    color: string = "#fff",
    label: string
  ) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.oneMinuteWidth = oneMinuteWidth;
    this.color = color;
    this.label = label;
  }

  public get totalMinutes(): number {
    return DateTime.between(this.startTime, this.endTime).minutes;
  }

  public get startTimeText(): string {
    return this.getDateTimeText(this.startTime);
  }

  public get endTimeText(): string {
    return this.getDateTimeText(this.endTime);
  }

  public get width(): number {
    return this.oneMinuteWidth * this.totalMinutes;
  }

  private getDateTimeText(date: DateTime): string {
    const timestamp = date.toTimeStamp();
    const zeroPadding = (num: number, length: number) =>
      ("0000000000" + num).slice(-length);
    return `${timestamp.year}/${timestamp.month}/${timestamp.day} ${
      timestamp.hour
    }:${zeroPadding(timestamp.minute, 2)}`;
  }
}

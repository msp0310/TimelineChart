import { TimeSpan } from "timespan";
import TimeSpanFormatter from './util/TimeSpanFormatter'

/**
 * Time Unit Element.
 */
export default class TimeUnitElement {
  constructor(
    public startTime: TimeSpan,
    public endTime: TimeSpan,
    public oneMinuteWidth: number,
    public color: string = "#fff",
    public label: string
  ) { }

  public get totalMinutes(): number {
    return this.endTime.totalMinutes() - this.startTime.totalMinutes();
  }

  public get startTimeText(): string {
    return TimeSpanFormatter.format(this.startTime)
  }

  public get endTimeText(): string {
    return TimeSpanFormatter.format(this.endTime)
  }

  public get width(): number {
    return this.oneMinuteWidth * this.totalMinutes;
  }
}

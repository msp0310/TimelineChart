import { TimeSpan } from "timespan";

/**
 * Time Unit Element.
 */
export class TimeUnitElement {
  public startTime: TimeSpan;
  public endTime: TimeSpan;
  public color: string;

  constructor(startTime: TimeSpan, endTime: TimeSpan, color: string) {
    this.startTime = startTime;
    this.endTime = endTime;
    this.color = color || "#fff";
  }

  get offset(): number {
    return this.startTime.totalMinutes();
  }

  get totalMinutes(): number {
    return this.endTime.totalMinutes() - this.startTime.totalMinutes();
  }

  draw(canvas: HTMLCanvasElement) {}

  onMouseMove() {}

  onMouseOut() {}

  isMouseOver(x, y) {}
}

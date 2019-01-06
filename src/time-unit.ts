import { TimeSpan } from "timespan";
import Config from './config';

/**
 * Time Unit Element.
 */
export default class TimeUnitElement {
  constructor(
    public height: number,
    public startTime: TimeSpan,
    public endTime: TimeSpan,
    public oneMinuteWidth: number,
    public color: string,
    public label: string,
    public config: Config
  ) {
    this.height = height;
    this.startTime = startTime;
    this.endTime = endTime;
    this.oneMinuteWidth = oneMinuteWidth;
    this.color = color || "#fff";
  }

  public get totalMinutes(): number {
    return this.endTime.totalMinutes() - this.startTime.totalMinutes();
  }

  public get width(): number {
    return this.oneMinuteWidth * this.totalMinutes;
  }

  public get x(): number {
    const offset = this.startTime.totalMinutes() * this.oneMinuteWidth;
    // 1px is border
    return (offset + 1) + this.config.layout.padding.left;
  }

  public get y(): number {
    // 1px is border
    return 1 + this.config.layout.padding.top;
  }

  public draw(canvas: CanvasRenderingContext2D): void {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
}

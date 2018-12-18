import { TimeSpan } from "timespan";
import { Config } from "./config";
import {TimeUnitElement} from "./time-unit";
import { start } from "repl";

/**
 * Timeline Chart.
 *
 * (C) Sawada Makoto | MIT License
 */
class TimelineChart {
  public element: HTMLCanvasElement;
  public canvas: CanvasRenderingContext2D;
  public config: Config;
  public width: number
  public height: number
  public oneMinutesWidth: number
  public data: TimeUnitElement[]

  constructor(element: HTMLCanvasElement, config: any) {
    this.element = element;
    this.canvas = this.element.getContext("2d");
    this.config = new Config(config)

    // Set Without Border Px.
    this.width = this.element.width - 2;
    this.height = this.element.height - 2;
    this.oneMinutesWidth = this.width / (24 * 60);
    this.data = config.data.map(unit => {
      const startTime = this.getTimeSpanFromString(unit.startTime);
      const endTime = this.getTimeSpanFromString(unit.endTime);
      return new TimeUnitElement(startTime, endTime, unit.color);
    });

    this.init()
  }

  /**
   * Initialize
   */
  private init() {
    this.drawBorder()
    this.drawBackground()
  }

  /**
   * Draw.
   */
  public draw(): void {
    // Draw.
    for (let unit of this.data) {
      this.canvas.fillStyle = unit.color;
      this.canvas.fillRect(
        unit.offset * this.oneMinutesWidth + 1,
        1,
        unit.totalMinutes * this.oneMinutesWidth,
        this.height
      );
    }
  }

  /**
   * Draw Border.
   */
  private drawBorder() {
    this.canvas.strokeStyle = this.config.borderColor;
    this.canvas.strokeRect(0, 0, this.element.width, this.element.height);
  }

  /**
   * Draw Background
   */
  private drawBackground() {
    this.canvas.fillStyle = this.config.backgroundColor;
    this.canvas.fillRect(1, 1, this.width, this.height);
  }

  /**
   * Parse Time String.
   * @param {string} time time ex) "00:00"
   * @returns {TimeSpan} timespan
   */
  private getTimeSpanFromString(time: string): TimeSpan {
    const timeArray: string[] = time.split(":");
    const timeSpan = new TimeSpan();
    timeSpan.addHours(parseInt(timeArray[0]));
    timeSpan.addMinutes(parseInt(timeArray[1]));

    return timeSpan;
  }
}

export default TimelineChart;

import { TimeSpan } from "timespan";
import Config from "./config/config";
import TimeUnitElement from "./time-unit";
import Tooltip from "./tooltip";
import TimeSpanParser from "./util/TimeSpanParser";

/**
 * Timeline Chart.
 *
 * (C) Sawada Makoto | MIT License
 */
export default class TimelineChart {
  public element: HTMLCanvasElement;
  public canvas: CanvasRenderingContext2D;
  public config: Config;
  public width: number;
  public height: number;
  public timeUnits: TimeUnitElement[];
  public tooltip: Tooltip;

  constructor(element: HTMLCanvasElement, obj: any) {
    this.element = element;
    this.canvas = this.element.getContext("2d");
    this.tooltip = new Tooltip();
    this.config = new Config(obj.config);

    // Set Without Border Px.
    this.width =
      this.element.width -
      2 -
      (this.config.layout.padding.left + this.config.layout.padding.right);
    this.height =
      this.element.height -
      2 -
      (this.config.layout.padding.top + this.config.layout.padding.bottom);
    // one minute width.
    const oneMinuteWidth = this.width / (24 * 60);
    // generate time units.
    this.timeUnits = obj.data.map(
      unit =>
        new TimeUnitElement(
          this.height,
          TimeSpanParser.parse(unit.startTime),
          TimeSpanParser.parse(unit.endTime),
          oneMinuteWidth,
          unit.color,
          unit.label,
          this.config
        )
    );

    this.init();

    // Attach Events.
    this.element.addEventListener(
      "mousemove",
      ev => this.onMouseMove(this, ev),
      false
    );
    this.element.addEventListener(
      "mouseout",
      ev => this.onMouseOut(this, ev),
      false
    );
  }

  /**
   * Initialize
   */
  private init() {
    this.drawBorder();
    this.drawBackground();
  }

  /**
   * Draw.
   */
  public draw(): void {
    for (let timeUnit of this.timeUnits) {
      timeUnit.draw(this.canvas);
    }
  }

  // #region Private Functions.
  private onMouseMove(sender: TimelineChart, event: MouseEvent) {
    const rect = this.element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const padLeft = (text: string, padChar: string, size: number): string => {
      return (String(padChar).repeat(size) + text).substr(size * -1, size);
    };
    const defaultTemplate = (timeUnit: TimeUnitElement): string => {
      return `開始時間: ${padLeft(
        "" + timeUnit.startTime.hours,
        "0",
        2
      )}:${padLeft("" + timeUnit.startTime.minutes, "0", 2)} <br>
              終了時間: ${padLeft(
                "" + timeUnit.endTime.hours,
                "0",
                2
              )}:${padLeft("" + timeUnit.endTime.minutes, "0", 2)} <br>
              ステータス: ${timeUnit.label}`;
    };
    for (let timeUnit of this.timeUnits) {
      // ignore y axis.
      // always y axis height is 100%.
      if (timeUnit.x < x && timeUnit.x + timeUnit.width > x) {
        this.tooltip.setPosition(event.clientX, event.clientY - 50);
        this.tooltip.text =
          this.config.tooltip != null
            ? this.config.tooltip(timeUnit)
            : defaultTemplate(timeUnit);
        this.tooltip.show();
      }
    }
  }

  private onMouseOut(sender: TimelineChart, event: MouseEvent) {
    this.tooltip.hide();
  }

  /**
   * Draw Border.
   */
  private drawBorder() {
    this.canvas.strokeStyle = this.config.borderColor;
    const paddingX =
      this.config.layout.padding.top + this.config.layout.padding.bottom;
    const paddingY =
      this.config.layout.padding.left + this.config.layout.padding.right;
    this.canvas.strokeRect(
      this.config.layout.padding.left,
      this.config.layout.padding.top,
      this.element.width - paddingY,
      this.element.height - paddingX
    );
  }

  /**
   * Draw Background.
   */
  private drawBackground() {
    this.canvas.fillStyle = this.config.backgroundColor;
    this.canvas.fillRect(
      this.config.layout.padding.left + 1,
      this.config.layout.padding.top + 1,
      this.width,
      this.height
    );
  }
  // #endregion
}

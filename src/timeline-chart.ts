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

  public get oneMinuteWidth(): number {
    return this.width / (24 * 60);
  }

  constructor(element: HTMLCanvasElement, obj: any) {
    this.element = element;
    this.canvas = this.element.getContext("2d");
    this.tooltip = new Tooltip();
    this.config = new Config(obj.config);

    // Set Without Border Px.
    this.width =
      this.element.width -
      this.config.borderWidth -
      (this.config.layout.padding.left + this.config.layout.padding.right);
    this.height = this.element.height;

    // generate time units.
    this.timeUnits = obj.data.map(
      unit =>
        new TimeUnitElement(
          TimeSpanParser.parse(unit.startTime),
          TimeSpanParser.parse(unit.endTime),
          this.oneMinuteWidth,
          unit.color,
          unit.label
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
    this.drawBackground();
    this.drawBorder();
  }

  /**
   * Draw.
   */
  public draw(): void {
    const timeOffset = this.config.offset.totalMinutes() * this.oneMinuteWidth;
    const padding = this.config.layout.padding;
    const borderWidth = this.config.borderWidth;

    // Draw Time Units
    for (let timeUnit of this.timeUnits) {
      const offset =
        timeUnit.startTime.totalMinutes() * this.oneMinuteWidth +
        borderWidth -
        timeOffset +
        padding.left;
      const isNegativeOffset = offset < 0;
      const x = !isNegativeOffset ? offset : 0;
      const y = borderWidth + padding.top;
      const height = this.height - (borderWidth * 2 + (padding.top + padding.bottom));
      const width = !isNegativeOffset ? timeUnit.width : timeUnit.width + offset;
      this.canvas.fillStyle = timeUnit.color;
      this.canvas.fillRect(x, y, width, height);
    }
  }

  // #region Private Functions.
  private onMouseMove(sender: TimelineChart, event: MouseEvent) {
    const rect = this.element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const padding = this.config.layout.padding
    const shouldShowTooltip = this.config.tooltip != null;

    if (!shouldShowTooltip) {
      return;
    }

    // パディング範囲は無視
    // left, right, top, bottom 
    if (x < padding.left
      || x > (this.width - padding.right)
      || y < padding.top
      || y > (this.height - padding.bottom)) {
      this.tooltip.hide()
      return;
    }

    let offset = padding.left
    for (let unit of this.timeUnits) {
      if (x >= offset && x <= (offset + unit.width)) {
        this.tooltip.setPosition(event.clientX, event.clientY)
        this.tooltip.text = this.config.tooltip(unit)
        this.tooltip.show()
        return
      }
      offset += unit.width
    }
    this.tooltip.hide()
  }

  private onMouseOut(sender: TimelineChart, event: MouseEvent) {
    this.tooltip.hide();
  }

  /**
   * Draw Border.
   */
  private drawBorder() {
    if (this.config.borderWidth <= 0) {
      return;
    }

    const padding = this.config.layout.padding;
    const paddingX = padding.top + padding.bottom;
    const paddingY = padding.left + padding.right;

    // top and bottom
    this.canvas.strokeStyle = this.config.borderColor;
    this.canvas.lineWidth = this.config.borderWidth * 2;
    this.canvas.strokeRect(
      padding.left,
      padding.top,
      this.element.width - paddingY,
      this.element.height - paddingX
    );
  }

  /**
   * Draw Background.
   */
  private drawBackground() {
    const padding = this.config.layout.padding;
    const paddingX = padding.top + padding.bottom;

    this.canvas.fillStyle = this.config.backgroundColor;
    this.canvas.fillRect(
      this.config.layout.padding.left,
      this.config.layout.padding.top,
      this.width,
      this.height - paddingX
    );
  }
  // #endregion
}

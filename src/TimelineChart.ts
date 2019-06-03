import { Config } from "./config/Config";
import TimeUnitElement from "./TimeUnitElement";
import Tooltip from "./Tooltip";
import DateTime from "typescript-dotnet-es6/System/Time/DateTime"
import DateTimeHelper from "./extensions/DateTimeExtension";

/**
 * Timeline Chart.
 *
 * (C) Sawada Makoto | MIT License
 */
export default class TimelineChart
{

  /**
   * 要素
   */
  public element: HTMLCanvasElement;

  /**
   * Canvas
   */
  public canvas: CanvasRenderingContext2D;

  /**
   * Config
   */
  public config: Config;

  /**
   * 時間ごと
   */
  public timeUnits: TimeUnitElement[];

  /**
   * ツールチップ
   */
  public tooltip: Tooltip;

  /**
   * 合計（分）
   */
  public get totalMinutes (): number
  {
    return this.config.time.totalMinutes
  }

  /**
   * 1分当たりの幅
   */
  public get oneMinuteWidth (): number
  {
    return this.drawableWidth / this.totalMinutes;
  }

  /**
   * Canvasの幅
   */
  public get elementWidth (): number
  {
    return this.element.width;
  }

  /**
  * Canvasの高さ
  */
  public get elementHeight (): number
  {
    return this.element.height
  }

  /**
   * 描画可能な幅
   * (ボーダー・パディングを除く)
   */
  public get drawableWidth (): number
  {
    return this.elementWidth -
      this.config.borderWidth -
      (this.config.layout.padding.x);
  }

  /**
   * 描画可能な高さ
   */
  public get drawableHeight (): number
  {
    return this.elementHeight -
      (this.config.borderWidth * 2) -
      this.config.layout.padding.y;
  }

  constructor(element: HTMLCanvasElement, obj: any)
  {
    this.element = element;
    this.canvas = this.element.getContext("2d");
    this.tooltip = new Tooltip();
    this.config = new Config(obj.config);

    // generate time units.
    this.timeUnits = obj.data.map(
      unit =>
        new TimeUnitElement(
          DateTimeHelper.parse(unit.startTime),
          DateTimeHelper.parse(unit.endTime),
          this.oneMinuteWidth,
          unit.color,
          unit.label
        )
    );

    this.Initialize();

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
  private Initialize ()
  {
    this.drawBackground();
    this.drawBorder();
  }

  /**
   * Draw.
   */
  public draw (): void
  {
    const borderWidth = this.config.borderWidth;
    const startDateTime = this.config.time.start
    const labelConfig = this.config.label;
    const self = this

    // Draw Time Units
    this.timeUnits.forEach(function (timeUnit, index)
    {

      // Guard If Zero Minutes.
      if (timeUnit.totalMinutes == 0) {
        return
      }

      let x = borderWidth + self.config.layout.padding.left
      if (index > 0) {
        const startMinutes = DateTime.between(startDateTime, timeUnit.startTime).minutes
        x += startMinutes * self.oneMinuteWidth;
      }

      const y = borderWidth + self.config.layout.padding.top;
      const height = self.drawableHeight;
      const width = timeUnit.width;
      self.canvas.fillStyle = timeUnit.color;
      self.canvas.fillRect(x, y, width, height);

      if (labelConfig.showLabel) {
        const textLeftMargin = 5;
        self.canvas.fillStyle = 'black';
        self.canvas.textBaseline = 'middle'
        self.canvas.font = labelConfig.fontSize + ' ' + labelConfig.fontFamily
        self.canvas.fillText(timeUnit.label, x + textLeftMargin, y + (height / 2), width - textLeftMargin)
      }
    })
  }

  // #region Private Functions.
  private onMouseMove (sender: TimelineChart, event: MouseEvent)
  {
    const rect = this.element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const padding = this.config.layout.padding
    const shouldShowTooltip = this.config.tooltip != null;
    const startDateTime = this.config.time.start

    if (!shouldShowTooltip) {
      return;
    }

    // パディング範囲は無視
    // left, right, top, bottom
    if (x < padding.left
      || x > (this.drawableWidth - padding.right)
      || y < padding.top
      || y > (this.drawableHeight - padding.bottom)) {
      this.tooltip.hide()
      return;
    }

    for (let unit of this.timeUnits) {
      let offset = padding.left
      const startMinutes = DateTime.between(startDateTime, unit.startTime).minutes
      offset += startMinutes * this.oneMinuteWidth
      if (x >= offset && x <= (offset + unit.width)) {
        this.tooltip.setPosition(event.clientX, event.clientY)
        this.tooltip.text = this.config.tooltip(unit)
        this.tooltip.show()
        return
      }
    }
    this.tooltip.hide()
  }

  private onMouseOut (sender: TimelineChart, event: MouseEvent)
  {
    this.tooltip.hide();
  }

  /**
   * Draw Border.
   */
  private drawBorder ()
  {
    if (this.config.borderWidth <= 0) {
      return;
    }

    const padding = this.config.layout.padding;

    // top and bottom
    this.canvas.strokeStyle = this.config.borderColor;
    this.canvas.lineWidth = this.config.borderWidth * 2;
    this.canvas.strokeRect(
      padding.left,
      padding.top,
      this.element.width - padding.x,
      this.element.height - padding.y
    );
  }

  /**
   * Draw Background.
   */
  private drawBackground ()
  {
    const padding = this.config.layout.padding;

    this.canvas.fillStyle = this.config.backgroundColor;
    this.canvas.fillRect(
      this.config.layout.padding.left,
      this.config.layout.padding.top,
      this.element.width - padding.x,
      this.element.height - padding.y
    );
  }
  // #endregion
}

import { TimeSpan } from "timespan"
import Config from "./config"
import TimeUnitElement from "./time-unit"
import Tooltip from './tooltip';

/**
 * Timeline Chart.
 *
 * (C) Sawada Makoto | MIT License
 */
export default class TimelineChart {
  public element: HTMLCanvasElement
  public canvas: CanvasRenderingContext2D
  public config: Config
  public width: number
  public height: number
  public timeUnits: TimeUnitElement[]
  public tooltip: Tooltip

  constructor(element: HTMLCanvasElement, config: any) {
    this.element = element
    this.canvas = this.element.getContext("2d")
    this.tooltip = new Tooltip()
    this.config = new Config(config)

    // Set Without Border Px.
    this.width = this.element.width - 2
    this.height = this.element.height - 2
    const oneMinuteWidth = this.width / (24 * 60)
    this.timeUnits = config.data.map(unit => {
      const startTime = this.getTimeSpanFromString(unit.startTime)
      const endTime = this.getTimeSpanFromString(unit.endTime)
      return new TimeUnitElement(
        this.height,
        startTime,
        endTime,
        oneMinuteWidth,
        unit.color
      )
    })

    this.init()

    // Attach Events.
    this.element.addEventListener(
      "mousemove",
      ev => this.onMouseMove(this, ev),
      false
    )
    this.element.addEventListener(
      "mouseout",
      ev => this.onMouseOut(this, ev),
      false
    )
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
    for (let timeUnit of this.timeUnits) {
      timeUnit.draw(this.canvas)
    }
  }

  // #region Private Functions.
  private onMouseMove(sender: TimelineChart, event: MouseEvent) {
    const rect = this.element.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const padLeft = (text: string, padChar: string, size: number): string => {
      return (String(padChar).repeat(size) + (text)).substr( (size * -1), size) ;
    }
    const defaultTemplate = (timeUnit: TimeUnitElement):string => {
      return `開始時間: ${padLeft('' + timeUnit.startTime.hours, '0', 2)}:${padLeft('' + timeUnit.startTime.minutes, '0', 2)} <br>
              終了時間: ${padLeft('' + timeUnit.endTime.hours, '0', 2)}:${padLeft('' + timeUnit.endTime.minutes, '0', 2)}`
    }
    for (let timeUnit of this.timeUnits) {
      // ignore y axis.
      // always y axis height is 100%.
      if (timeUnit.x < x && timeUnit.x + timeUnit.width > x) {
        console.log(this.config.tooltip)
        this.tooltip.setPosition(event.clientX, event.clientY - 50)
        this.tooltip.text = this.config.tooltip != null ? this.config.tooltip(timeUnit) : defaultTemplate(timeUnit)
        this.tooltip.show()
      }
    }
  }

  private onMouseOut(sender: TimelineChart, event: MouseEvent) {
    this.tooltip.hide()
    // redraw.
    sender.draw()
  }

  /**
   * Draw Border.
   */
  private drawBorder() {
    this.canvas.strokeStyle = this.config.borderColor
    this.canvas.strokeRect(0, 0, this.element.width, this.element.height)
  }

  /**
   * Draw Background.
   */
  private drawBackground() {
    this.canvas.fillStyle = this.config.backgroundColor
    this.canvas.fillRect(1, 1, this.width, this.height)
  }

  /**
   * Parse Time String.
   * @param {string} time time ex) "00:00"
   * @returns {TimeSpan} timespan
   */
  private getTimeSpanFromString(time: string): TimeSpan {
    const timeArray: string[] = time.split(":")
    const timeSpan = new TimeSpan()
    timeSpan.addHours(parseInt(timeArray[0]))
    timeSpan.addMinutes(parseInt(timeArray[1]))

    return timeSpan
  }
  // #endregion
}

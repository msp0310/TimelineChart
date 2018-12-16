import { TimeSpan } from 'timespan'
import DefaultConfig from './config.js'

/**
 * Timeline Chart.
 *
 * (C) Sawada Makoto | MIT License
 */
class TimelineChart {
  
  constructor(element, config) {
    this.element = element
    this.canvas = element.getContext('2d')
    this.config = Object.assign(DefaultConfig, config)
    this.data = config.data.map((unit) => {
      const startTime = this.parseTimeSpanString(unit.startTime)
      const endTime = this.parseTimeSpanString(unit.endTime)

      return {
        offset: startTime.totalMinutes(),
        minutes: endTime.totalMinutes() - startTime.totalMinutes(),
        color: unit.color,
      }
    })
  }

  /**
   * Draw.
   */
  draw() {
    // Draw Border.
    this.canvas.strokeStyle = this.config.borderColor
    this.canvas.strokeRect(0, 0, this.element.width, this.element.height);

    // Draw Background Color
    this.canvas.fillStyle = this.config.backgroundColor
    this.canvas.fillRect(1, 1, this.element.width - 2, this.element.height - 2);

    // Draw.
    const width = this.element.width - 2
    const height = this.element.height - 2
    const oneMinutesWidth = width / (24 * 60)
    for (let i = 0; i < this.data.length; i++) {
      const unit = this.data[i]
      this.canvas.fillStyle = (unit.color ? unit.color : '#fff')
      this.canvas.fillRect((unit.offset * oneMinutesWidth) + 1, 1, unit.minutes * oneMinutesWidth, height)
    }
  }

  /**
   * Parse Time String.
   * @param {string} time string ex) "00:00"
   * @returns {TimeSpan} timespan
   */
  parseTimeSpanString(timeStr) {
    const time = timeStr.split(':')
    const timeSpan = new TimeSpan()
    timeSpan.addHours(parseInt(time[0]))
    timeSpan.addMinutes(parseInt(time[1]))

    return timeSpan;
  }
}
export default TimelineChart

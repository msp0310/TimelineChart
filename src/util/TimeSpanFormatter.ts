import { TimeSpan } from "timespan";

/**
 * TimeSpan Formatter
 */
export default class TimeSpanFormatter
{
  /**
   * format
   * @param timespan timespan
   */
  static format (timespan: TimeSpan): string
  {
    const repeat = (text: string, size: number): string =>
    {
      return new Array(size + 1).join(text)
    }
    const padLeft = (text: string, padChar: string, size: number): string =>
    {
      return (repeat(padChar, size) + (text)).substr((size * -1), size);
    }

    return `${padLeft('' + timespan.hours, '0', 2)}:${padLeft('' + timespan.minutes, '0', 2)}`
  }
}

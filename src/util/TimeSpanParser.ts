import { TimeSpan } from "timespan";

/**
 * TimeSpan Parser
 *
 * Convert string to TimeSpan.
 */
export default class TimeSpanParser {
  /**
   * Parse
   * @param timeStr time
   */
  static parse(timeStr) {
    try {
      const timeArray: string[] = timeStr.split(":");
      const timeSpan = new TimeSpan();
      timeSpan.addHours(parseInt(timeArray[0]));
      timeSpan.addMinutes(parseInt(timeArray[1]));
      return timeSpan;
    } catch {
      return null;
    }
  }
}

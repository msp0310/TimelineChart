import TimeUnitElement from "../time-unit";
import LayoutConfig from "./config-layout";
import { TimeSpan } from "timespan";
import TimeSpanParser from "../util/TimeSpanParser";

/**
 * Config.
 */
export default class Config {
  public borderColor: string;
  public borderWidth: number;
  public backgroundColor: string;
  public tooltip: (timeUnit: TimeUnitElement) => string;
  public layout: LayoutConfig;
  public offset: TimeSpan;

  constructor(config: any) {
    this.borderColor = config.borderColor || "#000";
    this.borderWidth = parseInt(config.borderWidth) || 1;
    this.backgroundColor = config.backgroundColor || "transparent";
    this.tooltip = config.tooltip;
    this.offset = TimeSpanParser.parse(config.timeOffset || "00:00");
    this.layout = new LayoutConfig(config.layout != null ? config.layout : {});
  }
}

/**
 * TimeUnit Config.
 */
class TimeUnitConfig {
  public startTime: string;
  public endTime: string;
  public color: string;
  public label: string;
}

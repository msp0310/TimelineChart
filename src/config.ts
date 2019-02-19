import TimeUnitElement from "./time-unit";
import LayoutConfig from "./config/config-layout";

/**
 * Config.
 */
export default class Config {
  public borderColor: string;
  public backgroundColor: string;
  public data: TimeUnitConfig[];
  public tooltip: (timeUnit: TimeUnitElement) => string;
  public layout: LayoutConfig;

  constructor(config: any) {
    this.borderColor = config.borderColor || "#000";
    this.backgroundColor = config.backgroundColor || "#fff";
    this.data = config.data;
    this.tooltip = config.tooltip;
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

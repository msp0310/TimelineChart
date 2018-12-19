import TimeUnitElement from './time-unit';

/**
 * Config.
 */
export default class Config {
    public borderColor: string
    public backgroundColor: string
    public data: TimeUnitConfig[]
    public tooltip: (timeUnit: TimeUnitElement) => string

    constructor(config: any) {
        this.borderColor = config.borderColor || '#000'
        this.backgroundColor = config.backgroundColor || '#fff'
        this.data = config.data
        this.tooltip = config.tooltip
    }
}

/**
 * TimeUnit Config.
 */
class TimeUnitConfig {
    public startTime: string
    public endTime: string
    public color: string
}
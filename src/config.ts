/**
 * Config.
 */
export class Config {
    public borderColor: string
    public backgroundColor: string
    public data: TimeUnitConfig[]

    constructor(config: any) {
        this.borderColor = config.borderColor || '#000'
        this.backgroundColor = config.backgroundColor || '#fff'
        this.data = config.data
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
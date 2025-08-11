/** Lightweight TimeSpan (minutes precision) */
export default class TimeSpan {
    private _minutes;
    private constructor();
    static fromHoursMinutes(h: number, m: number): TimeSpan;
    static between(start: DateTime, end: DateTime): TimeSpan;
    get minutes(): number;
    get hours(): number;
}
/** Minimal DateTime wrapper */
export declare class DateTime {
    private date;
    private constructor();
    static today: DateTime;
    static from(date: Date): DateTime;
    static parseHM(hm: string): DateTime;
    static fromString(raw: string): DateTime;
    addHours(h: number): DateTime;
    addMinutes(m: number): DateTime;
    compareTo(other: DateTime): number;
    getTime(): number;
    toTimeStamp(): {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
    };
    static between(a: DateTime, b: DateTime): TimeSpan;
    toDate(): Date;
}

/** Lightweight TimeSpan (minutes precision) */
export default class TimeSpan {
  private _minutes: number;
  private constructor(totalMinutes: number) { this._minutes = totalMinutes; }
  static fromHoursMinutes(h: number, m: number): TimeSpan { return new TimeSpan(h * 60 + m); }
  static between(start: DateTime, end: DateTime): TimeSpan { return new TimeSpan(Math.max(0, end.getTime() - start.getTime()) / 60000); }
  get minutes(): number { return this._minutes; }
  get hours(): number { return Math.floor(this._minutes / 60); }
}

/** Minimal DateTime wrapper */
export class DateTime {
  private date: Date;
  private constructor(d: Date) { this.date = d; }
  static today: DateTime = new DateTime(new Date(new Date().setHours(0,0,0,0)));
  static from(date: Date): DateTime { return new DateTime(new Date(date.getTime())); }
  static parseHM(hm: string): DateTime {
    const parts = hm.split(':');
    const h = parseInt(parts[0] || '0', 10); const m = parseInt(parts[1] || '0', 10);
    const base = DateTime.today.toDate();
    const d = new Date(base.getFullYear(), base.getMonth(), base.getDate(), h, m, 0, 0);
    return new DateTime(d);
  }
  addHours(h: number): DateTime { const d = new Date(this.date.getTime()); d.setHours(d.getHours() + h); return new DateTime(d);}  
  addMinutes(m: number): DateTime { const d = new Date(this.date.getTime()); d.setMinutes(d.getMinutes() + m); return new DateTime(d);}  
  compareTo(other: DateTime): number { return this.getTime() - other.getTime(); }
  getTime(): number { return this.date.getTime(); }
  toTimeStamp(){ return { year: this.date.getFullYear(), month: this.date.getMonth()+1, day: this.date.getDate(), hour: this.date.getHours(), minute: this.date.getMinutes() }; }
  static between(a: DateTime, b: DateTime): TimeSpan { return TimeSpan.between(a, b); }
  toDate(): Date { return new Date(this.date.getTime()); }
}

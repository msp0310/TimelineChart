import { DateTime } from '../core/TimeSpan';

export default class DateTimeHelper
{
  public static parse (dateString: string): DateTime
  {
  // Accept formats: 'HH:mm' or 'YYYY/MM/DD HH:mm'
  const parts = dateString.trim().split(/\s+/);
  let hm = parts.pop() || '00:00';
  // ignore date portion for now (always today)
  return DateTime.parseHM(hm);
  }
}

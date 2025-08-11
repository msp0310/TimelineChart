import { DateTime } from "../core/TimeSpan";

export default class DateTimeHelper {
  /**
   * Parse string to DateTime.
   * Supported formats:
   *  - HH:mm
   *  - YYYY/MM/DD HH:mm
   *  - YYYY-MM-DD HH:mm
   *  - ISO 8601 (YYYY-MM-DDTHH:mm[:ss])
   */
  public static parse(dateString: string): DateTime {
    if (!dateString) return DateTime.parseHM('00:00');
    const raw = dateString.trim();

    // ISO 8601
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?/.test(raw)) {
      const d = new Date(raw);
      return DateTime.from(d);
    }

    // Split date & time
    const parts = raw.split(/\s+/);
    if (parts.length === 1 && /^\d{1,2}:\d{2}$/.test(parts[0])) {
      return DateTime.parseHM(parts[0]);
    }

    if (parts.length >= 2) {
      const datePart = parts[0];
      const timePart = parts[1];
      const dateMatch = datePart.match(/^(\d{4})[\/-](\d{1,2})[\/-](\d{1,2})$/);
      const timeMatch = timePart.match(/^(\d{1,2}):(\d{2})$/);
      if (dateMatch && timeMatch) {
        const y = parseInt(dateMatch[1], 10);
        const m = parseInt(dateMatch[2], 10) - 1;
        const d = parseInt(dateMatch[3], 10);
        const hh = parseInt(timeMatch[1], 10);
        const mm = parseInt(timeMatch[2], 10);
        return DateTime.from(new Date(y, m, d, hh, mm, 0, 0));
      }
    }

    // fallback HH:mm
    return DateTime.parseHM(raw);
  }
}

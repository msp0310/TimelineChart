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
    static parse(dateString: string): DateTime;
}

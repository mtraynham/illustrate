import {timeFormat} from 'd3-time-format/src/defaultLocale';
import StringUtils from './StringUtils';

const defaultFormat = timeFormat('%m/%d/%Y');
let _format = defaultFormat;

/**
 * Utilities for handling Dates
 */
class DateUtils {
    /**
     * Get the current date formatter
     * @returns {d3.time.format}
     */
    static get format () {
        return _format;
    }

    /**
     * Set a new date formatter
     * @param {string|d3.time.format} format
     */
    static set format (format) {
        if (format) {
            if (StringUtils.instanceOf(format)) {
                _format = timeFormat(format);
            } else {
                _format = format;
            }
        } else {
            _format = defaultFormat;
        }
    }
}

export default DateUtils;

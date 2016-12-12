import {timeFormat} from 'd3-time-format/src/defaultLocale';
import {isString} from './StringUtils';

const _defaultFormat = timeFormat('%m/%d/%Y');
let _format = _defaultFormat;

/**
 * Set a new date formatter
 * @param {string|d3.time.format} [format]
 * @returns {d3.format}
 */
export function defaultFormat (format) {
    if (arguments.length) {
        if (format) {
            if (isString(format)) {
                _format = timeFormat(format);
            } else {
                _format = format;
            }
        } else {
            _format = _defaultFormat;
        }
    }
    return _format;
}

export default null;

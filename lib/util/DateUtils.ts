import {timeFormat} from 'd3-time-format';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

const DEFAULT_FORMAT: (date: Date) => string = timeFormat('%m/%d/%Y');
let _format: (date: Date) => string = DEFAULT_FORMAT;

/**
 * Set a new date formatter
 * @param {string|d3.time.format} [format]
 * @returns {d3.format}
 */
export function defaultFormat (format?: ((date: Date) => string) | string): (date: Date) => string {
    if (!isEmpty(arguments)) {
        if (!isNil(format)) {
            if (isString(format)) {
                _format = timeFormat(format);
            } else {
                _format = format;
            }
        } else {
            _format = DEFAULT_FORMAT;
        }
    }
    return _format;
}

export default null;

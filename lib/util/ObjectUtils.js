import {defaultFormat as defaultDateFormat} from './DateUtils';
import {defaultFormat as defaultNumberFormat, isNumber} from './NumberUtils';

/**
 * A simplistic object toString converter
 * @param {object} value
 * @returns {string}
 */
export function toString (value) {
    if (value instanceof Date) {
        return defaultDateFormat()(value);
    } else if (isNumber(value)) {
        return defaultNumberFormat()(value);
    }
    return `${value}`;
}

import isNumber from 'lodash/isNumber';
import {defaultFormat as defaultDateFormat} from './DateUtils';
import {defaultFormat as defaultNumberFormat} from './NumberUtils';

/**
 * A simplistic object toString converter
 * @param {object} value
 * @returns {string}
 */
export function toString (value: any): string {
    if (value instanceof Date) {
        return defaultDateFormat()(value);
    } else if (isNumber(value)) {
        return defaultNumberFormat()(<number> value);
    }
    return `${value}`;
}

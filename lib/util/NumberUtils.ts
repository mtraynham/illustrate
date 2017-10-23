import {format as defaultLocaleFormat} from 'd3-format';
import isEmpty from 'lodash/isEmpty';
import isInteger from 'lodash/isInteger';
import isNil from 'lodash/isNil';
import isNumber from 'lodash/isNumber';
import isString from 'lodash/isString';

/**
 * Number.EPSILON
 * @memberOf NumberUtils
 * @type {number}
 */
export const EPSILON: number = 'EPSILON' in Number ? Number.EPSILON : 2.220446049250313e-16;

/**
 * Number.MAX_SAFE_INTEGER
 * @memberOf NumberUtils
 * @type {number}
 */
export const MAX_SAFE_INTEGER: number = 'MAX_SAFE_INTEGER' in Number ? Number.MAX_SAFE_INTEGER : 9007199254740991;

/**
 * Number.MIN_SAFE_INTEGER
 * @memberOf NumberUtils
 * @type {number}
 */
export const MIN_SAFE_INTEGER: number = 'MIN_SAFE_INTEGER' in Number ? Number.MIN_SAFE_INTEGER : -MAX_SAFE_INTEGER;

const DEFAULT_FORMAT: (n: number) => string = defaultLocaleFormat('.2f');
let _format: (n: number) => string = DEFAULT_FORMAT;

/**
 * Set/get the default number formatter
 * @memberOf NumberUtils
 * @param {string|d3.format} [format]
 * @returns {d3.format}
 */
export function defaultFormat (format?: ((n: number) => string) | string): (n: number) => string {
    if (!isEmpty(arguments)) {
        if (!isNil(format)) {
            if (isString(format)) {
                _format = defaultLocaleFormat(format);
            } else {
                _format = format;
            }
        } else {
            _format = DEFAULT_FORMAT;
        }
    }
    return _format;
}

const DEFAULT_NEGLIGIBLE_NUMBER: number = 1e-10;
let _negligibleNumber: number = DEFAULT_NEGLIGIBLE_NUMBER;

/**
 * Set a new negligible number
 * @memberOf NumberUtils
 * @param {number} [n]
 * @returns {number}
 */
export function negligibleNumber (n?: number): number {
    if (!isEmpty(arguments)) {
        _negligibleNumber = isNumber(n) ? n : DEFAULT_NEGLIGIBLE_NUMBER;
    }
    return _negligibleNumber;
}

/**
 * Check if an object is a float
 * @memberOf NumberUtils
 * @param {number} n
 * @returns {boolean}
 */
export function isFloat (n: any): boolean {
    return isNumber(n) && n !== Math.floor(n);
}

/**
 * Check if a number is relatively 0.
 * @memberOf NumberUtils
 * @param {number} n
 * @returns {boolean}
 */
export function isNegligible (n: number): boolean {
    return !isNumber(n) ||
        (n < negligibleNumber() && n > -negligibleNumber());
}

/**
 * Return a number if it is a number object, otherwise return a default.
 * @memberOf NumberUtils
 * @param {number} n
 * @param {number} def
 * @returns {number}
 */
export function safeNumber (n: any, def: number = 0): number {
    return isNumber(n) ? n : def;
}

/**
 * Given a number, clamp it inside a range.
 * @memberOf NumberUtils
 * @param {number} n
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp (n: number, min: number = -Number.MAX_VALUE, max: number = Number.MAX_VALUE): number {
    return Math.max(Math.min(n, max), min);
}

export {isInteger, isNumber};

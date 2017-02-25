import {format as defaultLocaleFormat} from 'd3-format/src/defaultLocale';
import {isString} from './StringUtils';

/**
 * Number.EPSILON
 * @memberOf NumberUtils
 * @type {number}
 */
export const EPSILON = 'EPSILON' in Number ? Number.EPSILON : 2.220446049250313e-16;

/**
 * Number.MAX_SAFE_INTEGER
 * @memberOf NumberUtils
 * @type {number}
 */
export const MAX_SAFE_INTEGER = 'MAX_SAFE_INTEGER' in Number ? Number.MAX_SAFE_INTEGER : 9007199254740991;

/**
 * Number.MIN_SAFE_INTEGER
 * @memberOf NumberUtils
 * @type {number}
 */
export const MIN_SAFE_INTEGER = 'MIN_SAFE_INTEGER' in Number ? Number.MIN_SAFE_INTEGER : -MAX_SAFE_INTEGER;


const _defaultFormat = defaultLocaleFormat('.2f');
let _format = _defaultFormat;

/**
 * Set/get the default number formatter
 * @memberOf NumberUtils
 * @param {string|d3.format} [format]
 * @returns {d3.format}
 */
export function defaultFormat (format) {
    if (arguments.length) {
        if (format) {
            if (isString(format)) {
                _format = defaultLocaleFormat(format);
            } else {
                _format = format;
            }
        } else {
            _format = _defaultFormat;
        }
    }
    return _format;
}

const defaultNegligibleNumber = 1e-10;
let _negligibleNumber = defaultNegligibleNumber;

/**
 * Set a new negligible number
 * @memberOf NumberUtils
 * @param {number} [n]
 * @returns {number}
 */
export function negligibleNumber (n) {
    if (arguments.length) {
        _negligibleNumber = n || defaultNegligibleNumber;
    }
    return _negligibleNumber;
}

/**
 * Check if an object is a number
 * @memberOf NumberUtils
 * @param {object} n
 * @returns {boolean}
 */
export function isNumber (n) {
    return typeof n === 'number' ||
        (typeof n === 'object' &&
        Object.prototype.toString.call(n) === '[object Number]');
}

/**
 * Check if an object is a float
 * @memberOf NumberUtils
 * @param {number} n
 * @returns {boolean}
 */
export function isFloat (n) {
    return isNumber(n) && n !== Math.floor(n);
}

/**
 * Check if an object is an integer
 * @memberOf NumberUtils
 * @param {number} n
 * @returns {boolean}
 */
export function isInteger (n) {
    return isNumber(n) && n === Math.floor(n);
}

/**
 * Check if a number is relatively 0.
 * @memberOf NumberUtils
 * @param {number} n
 * @returns {boolean}
 */
export function isNegligible (n) {
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
export function safeNumber (n, def = 0) {
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
export function clamp (n, min = -Number.MAX_VALUE, max = Number.MAX_VALUE) {
    return Math.max(Math.min(n, max), min);
}


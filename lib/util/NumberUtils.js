import {format as defaultLocaleFormat} from 'd3-format/src/defaultLocale';
import StringUtils from './StringUtils';

const defaultFormat = defaultLocaleFormat('.2f');
const maxSafeInteger = 'MAX_SAFE_INTEGER' in Number ? Number.MAX_SAFE_INTEGER : 9007199254740991;
const minSafeInteger = 'MIN_SAFE_INTEGER' in Number ? Number.MIN_SAFE_INTEGER : -maxSafeInteger;
const epsilon = 'EPSILON' in Number ? Number.EPSILON : 2.220446049250313e-16;
const defaultNegligibleNumber = 1e-10;

let _format = defaultFormat;
let _negligibleNumber = defaultNegligibleNumber;

/**
 * A numeric utility class for common numeric operations
 */
class NumberUtils {
    /**
     * Get the current number formatter
     * @returns {string|d3.format}
     */
    static get format () {
        return _format;
    }

    /**
     * Set a new number formatter
     * @param {string|d3.format} format
     */
    static set format (format) {
        if (format) {
            if (StringUtils.instanceOf(format)) {
                _format = defaultLocaleFormat(format);
            } else {
                _format = format;
            }
        } else {
            _format = defaultFormat;
        }
    }

    /**
     * Number.EPSILON
     * @returns {number}
     */
    static get EPSILON () {
        return epsilon;
    }

    /**
     * Number.MAX_SAFE_INTEGER
     * @returns {number}
     */
    static get MAX_SAFE_INTEGER () {
        return maxSafeInteger;
    }

    /**
     * Number.MIN_SAFE_INTEGER
     * @returns {number}
     */
    static get MIN_SAFE_INTEGER () {
        return minSafeInteger;
    }

    /**
     * Get the current negligible number
     * @returns {number}
     */
    static get negligibleNumber () {
        return _negligibleNumber;
    }

    /**
     * Set a new negligible number
     * @param {number} negligibleNumber
     */
    static set negligibleNumber (negligibleNumber) {
        _negligibleNumber = negligibleNumber || defaultNegligibleNumber;
    }

    /**
     * Check if an object is a number
     * @param {object} n
     * @returns {boolean}
     */
    static isNumber (n) {
        return typeof n === 'number' ||
            (n && typeof n === 'object' &&
            Object.prototype.toString.call(n) === '[object Number]');
    }

    /**
     * Check if an object is a float
     * @param {object} n
     * @returns {boolean}
     */
    static isFloat (n) {
        return NumberUtils.isNumber(n) && n !== Math.floor(n);
    }

    /**
     * Check if an object is an integer
     * @param {object} n
     * @returns {boolean}
     */
    static isInteger (n) {
        return NumberUtils.isNumber(n) && n === Math.floor(n);
    }

    /**
     * Check if a number is relatively 0.
     * @param {number} n
     * @returns {boolean}
     */
    static isNegligible (n) {
        return !NumberUtils.isNumber(n) || (n < NumberUtils.negligibleNumber && n > -NumberUtils.negligibleNumber);
    }

    /**
     * Return a number if it is a number object, otherwise return a default.
     * @param {number} n
     * @param {number} def
     * @returns {number}
     */
    static safeNumber (n, def = 0) {
        return NumberUtils.isNumber(n) ? n : def;
    }

    /**
     * Given a number, clamp it inside a range.
     * @param {number} n
     * @param {number} min
     * @param {number} max
     * @returns {number}
     */
    static clamp (n, min = -Number.MAX_VALUE, max = Number.MAX_VALUE) {
        return Math.max(Math.min(n, max), min);
    }
}

export default NumberUtils;

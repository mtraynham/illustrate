import {format as defaultLocaleFormat} from 'd3-format/src/defaultLocale';

let DEFAULT_FLOAT_FORMAT = defaultLocaleFormat('.2f');
let DEFAULT_NEGLIGIBLE_NUMBER = 1e-10;

/**
 * A simple numeric utility class for common numeric operations
 */
class NumberUtils {
    static get FLOAT_FORMAT () {
        return DEFAULT_FLOAT_FORMAT;
    }

    static set FLOAT_FORMAT (format) {
        DEFAULT_FLOAT_FORMAT = format;
    }

    static get NEGLIGIBLE_NUMBER () {
        return DEFAULT_NEGLIGIBLE_NUMBER;
    }

    static set NEGLIGIBLE_NUMBER (negligibleNumber) {
        DEFAULT_NEGLIGIBLE_NUMBER = negligibleNumber;
    }

    /**
     * Check if an object is a number
     * @param n
     * @returns {boolean}
     */
    static isNumber (n) {
        return typeof n === 'number' ||
            (n && typeof n === 'object' &&
            Object.prototype.toString.call(n) === '[object Number]');
    }

    /**
     * Check if an object is a float
     * @param n
     * @returns {boolean}
     */
    static isFloat (n) {
        return NumberUtils.isNumber(n) && n !== Math.floor(n);
    }

    /**
     * Check if an object is an integer
     * @param n
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
        return !NumberUtils.isNumber(n) || (n < NumberUtils.NEGLIGIBLE_NUMBER && n > -NumberUtils.NEGLIGIBLE_NUMBER);
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
    static clamp (n, min = Number.MIN_VALUE, max = Number.MAX_VALUE) {
        return Math.max(Math.min(n, max), min);
    }
}

export default NumberUtils;

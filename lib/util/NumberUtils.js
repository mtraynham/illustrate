import {format as defaultLocaleFormat} from 'd3-format/src/defaultLocale';
import StringUtils from './StringUtils';

const defaultFloatFormat = defaultLocaleFormat('.2f');
let _floatFormat = defaultFloatFormat;

const defaultNegligibleNumber = 1e-10;
let _negligibleNumber = defaultNegligibleNumber;

/**
 * A simple numeric utility class for common numeric operations
 */
class NumberUtils {
    static get floatFormat () {
        return _floatFormat;
    }

    static set floatFormat (floatFormat) {
        if (floatFormat) {
            if (StringUtils.instanceOf(floatFormat)) {
                _floatFormat = defaultLocaleFormat(floatFormat);
            } else {
                _floatFormat = floatFormat;
            }
        } else {
            _floatFormat = defaultFloatFormat;
        }
    }

    static get negligibleNumber () {
        return _negligibleNumber;
    }

    static set negligibleNumber (negligibleNumber) {
        _negligibleNumber = negligibleNumber || defaultNegligibleNumber;
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

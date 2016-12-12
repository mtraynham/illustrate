import Filter from './Filter';
import {toString} from '../util/ObjectUtils';

/**
 * A filter representing a range
 */
class RangeFilter extends Filter {
    /**
     * @constructor
     * @param {object} low
     * @param {object} high
     * @param {boolean} lte
     * @param {boolean} gte
     */
    constructor (low, high, lte = true, gte = true) {
        super();
        this.low = low;
        this.high = high;
        this.lte = lte;
        this.gte = gte;
    }

    /**
     * Check if a value is filtered between a range
     * @param {object} value
     * @returns {boolean}
     */
    isFiltered (value) {
        return (this.lte ? this.low <= value : this.low < value) &&
            (this.gte ? value <= this.high : value < this.high);
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    toString () {
        return `${this.lte ? '[' : '{'}${toString(this.low)} -> ${toString(this.high)}${this.gte ? ']' : '}'}`;
    }
}

export default RangeFilter;

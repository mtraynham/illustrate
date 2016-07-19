import Filter from './Filter';
import ObjectUtils from '../util/ObjectUtils';

class RangeFilter extends Filter {
    /**
     * A filter representing a range
     * @param {*} low
     * @param {*} high
     * @param {boolean} lte
     * @param {boolean} gte
     */
    constructor (low, high, lte = true, gte = true) {
        this.low = low;
        this.high = high;
        this.lte = lte;
        this.gte = gte;
    }

    /**
     * Check if a value is filtered between a range
     * @param {*} value
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
        return `${this.lte ? '[' : '{'}${ObjectUtils.toString(this.low)} -> ${ObjectUtils.toString(this.high)}${this.gte ? ']' : '}'}`;
    }
}

export default RangeFilter;

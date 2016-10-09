/**
 * A base class to handle filtering within charts.
 * @abstract
 */
class Filter {
    /**
     * @constructor
     */
    constructor () {
        if (this.constructor === Filter) {
            throw new Error('Cannot instantiate abstract class');
        }
    }

    /**
     * Check if a value is filtered
     * @param {object} value
     * @returns {boolean}
     */
    isFiltered (value) {
        throw new Error(`Method should be defined to handle param: ${value.toString()}`);
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    toString () {
        throw new Error('Method should be defined');
    }
}

export default Filter;

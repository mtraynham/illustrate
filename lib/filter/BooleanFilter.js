import Filter from './Filter';

/**
 * A filter that encompasses an array of filters
 * @abstract
 */
class BooleanFilter extends Filter {
    /**
     * @constructor
     * @param {Array<object>} filters
     */
    constructor (filters) {
        super();
        if (this.constructor === BooleanFilter) {
            throw new Error('Cannot instantiate abstract class');
        }
        this.filters = filters;
    }

    /**
     * Check if an array is filtered
     * @param {Array<object>} value
     * @returns {boolean}
     */
    isFiltered (value) {
        return this.filters.length === value.length;
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    toString () {
        return this.filters.map(filter => filter.toString()).join(', ');
    }
}

export default BooleanFilter;

import Filter from './Filter';

class BooleanFilter extends Filter {
    /**
     * A filter that encompasses an array of filters
     * @param {Array<Filter>} filters
     */
    constructor (filters) {
        if (this.constructor === BooleanFilter) {
            throw new Error('Cannot instantiate abstract class');
        }
        this.filters = filters;
    }

    /**
     * Check if an array is filtered
     * @param {Array<*>} value
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

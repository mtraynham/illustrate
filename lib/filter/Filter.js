/**
 * A base class to handle filtering within charts.
 */
class Filter {
    /**
     * Check if a value is filtered
     * @param {*} value
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

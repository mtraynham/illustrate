import BooleanFilter from './BooleanFilter';

/**
 * An {@link BooleanFilter} that all clauses SHOULD match
 * @param {Array<object>} values
 */
class ShouldFilter extends BooleanFilter {
    /**
     * Check if an array is filtered
     * @param {Array<object>} value
     * @returns {boolean}
     */
    isFiltered (value) {
        return super.isFiltered(value) &&
            this.filters.some((filter, index) => filter.isFiltered(value[index]));
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    toString () {
        return this.filters.map(filter => filter.toString()).join(' || ');
    }
}

export default ShouldFilter;

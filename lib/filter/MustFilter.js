import BooleanFilter from './BooleanFilter';

/**
 * An {@link BooleanFilter} that all clauses MUST match
 * @param {Array<*>} values
 */
class MustFilter extends BooleanFilter {
    /**
     * Check if an array is filtered
     * @param {Array<*>} value
     * @returns {boolean}
     */
    isFiltered (value) {
        return super.isFiltered(value) &&
                this.filters.every((filter, index) => filter.isFiltered(value[index]));
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    toString () {
        return this.filters.map(filter => filter.toString()).join(' && ');
    }
}

export default MustFilter;

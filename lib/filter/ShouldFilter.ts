import {Primitive} from 'd3-array';
import BooleanFilter from './BooleanFilter';
import Filter from './Filter';

/**
 * An {@link BooleanFilter} that all clauses SHOULD match
 * @param {Array<object>} values
 */
class ShouldFilter extends BooleanFilter {
    /**
     * Return a string representing this filter
     * @returns {string}
     */
    public toString (): string {
        return this.filters.map((filter: Filter<Primitive>) =>
            filter.toString()).join(' || ');
    }

    protected matches (value: Primitive[]): boolean {
        return this.filters.some((filter: Filter<Primitive>, index: number) =>
            filter.isFiltered(value[index]));
    }
}

export default ShouldFilter;

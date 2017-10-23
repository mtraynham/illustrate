import {Primitive} from 'd3-array';
import BooleanFilter from './BooleanFilter';
import Filter from './Filter';

/**
 * An {@link BooleanFilter} that all clauses MUST match
 * @param {Array<object>} values
 */
class MustFilter extends BooleanFilter {
    /**
     * Return a string representing this filter
     * @returns {string}
     */
    public toString (): string {
        return this.filters.map((filter: Filter<Primitive>) =>
            filter.toString()).join(' && ');
    }

    protected matches (value: Primitive[]): boolean {
        return this.filters.every((filter: Filter<Primitive>, index: number) =>
            filter.isFiltered(value[index]));
    }
}

export default MustFilter;

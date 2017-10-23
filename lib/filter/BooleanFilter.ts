import {Primitive} from 'd3-array';
import Filter from './Filter';

/**
 * A filter that encompasses an array of filters
 * @abstract
 */
abstract class BooleanFilter extends Filter<Primitive[]> {
    protected filters: Filter<Primitive>[];

    /**
     * @constructor
     * @param {Array<Primitive>} filters
     */
    constructor (filters: Filter<Primitive>[]) {
        super();
        this.filters = filters;
    }

    /**
     * Check if an array is filtered
     * @param {Array<Primitive>} value
     * @returns {boolean}
     */
    public isFiltered (value: Primitive[]): boolean {
        return this.filters.length === value.length &&
            this.matches(value);
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    public toString (): string {
        return this.filters.map((filter: Filter<Primitive>) =>
            filter.toString()).join(', ');
    }

    protected abstract matches (value: any[]): boolean;
}

export default BooleanFilter;

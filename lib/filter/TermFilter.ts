import {Primitive} from 'd3-array';
import {toString} from '../util/ObjectUtils';
import Filter from './Filter';

/**
 * A filter representing a single term value
 */
class TermFilter extends Filter<Primitive> {
    private term: string;

    /**
     * @constructor
     * @param {object} term
     */
    constructor (term: string) {
        super();
        this.term = term;
    }

    /**
     * Check if a value matches this filters value
     * @param {Primitive} term
     * @returns {boolean}
     */
    public isFiltered (term: Primitive): boolean {
        return this.term <= term && this.term >= term;
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    public toString (): string {
        return toString(this.term);
    }
}

export default TermFilter;

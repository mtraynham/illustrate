import {toString} from '../util/ObjectUtils';
import Filter from './Filter';

/**
 * A prefix filter matching the prefix of a term
 */
class PrefixFilter extends Filter<string> {
    private prefix: string;

    /**
     * @constructor
     * @param {object} prefix
     */
    constructor (prefix: string) {
        super();
        this.prefix = prefix.toString();
    }

    /**
     * Check if a value matches this filters value
     * @param {object} term
     * @returns {boolean}
     */
    public isFiltered (term: string): boolean {
        return term.toString().startsWith(this.prefix);
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    public toString (): string {
        return `${toString(this.prefix)}*`;
    }
}

export default PrefixFilter;

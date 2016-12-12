import Filter from './Filter';
import {toString} from '../util/ObjectUtils';

/**
 * A prefix filter matching the prefix of a term
 */
class PrefixFilter extends Filter {
    /**
     * @constructor
     * @param {object} prefix
     */
    constructor (prefix) {
        super();
        this.prefix = prefix.toString();
    }

    /**
     * Check if a value matches this filters value
     * @param {object} term
     * @returns {boolean}
     */
    isFiltered (term) {
        return term.toString().startsWith(this.prefix);
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    toString () {
        return `${toString(this.term)}*`;
    }
}

export default PrefixFilter;

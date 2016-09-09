import Filter from './Filter';
import ObjectUtils from '../util/ObjectUtils';

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
        return `${ObjectUtils.toString(this.term)}*`;
    }
}

export default PrefixFilter;

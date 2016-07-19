import Filter from './Filter';
import ObjectUtils from '../util/ObjectUtils';

class PrefixFilter extends Filter {
    /**
     * A prefix filter matching the prefix of a term
     * @param {*} prefix
     */
    constructor (prefix) {
        this.prefix = prefix.toString();
    }

    /**
     * Check if a value matches this filters value
     * @param {*} value
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

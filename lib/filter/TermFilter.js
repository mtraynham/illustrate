import Filter from './Filter';
import ObjectUtils from '../util/ObjectUtils';

/**
 * A filter representing a single term value
 */
class TermFilter extends Filter {
    /**
     * @constructor
     * @param {object} term
     */
    constructor (term) {
        super();
        this.term = term;
    }

    /**
     * Check if a value matches this filters value
     * @param {object} term
     * @returns {boolean}
     */
    isFiltered (term) {
        return this.term <= term && this.term >= term;
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    toString () {
        return ObjectUtils.toString(this.term);
    }
}

export default TermFilter;

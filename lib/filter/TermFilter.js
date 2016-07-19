import Filter from './Filter';
import ObjectUtils from '../util/ObjectUtils';

class TermFilter extends Filter {
    /**
     * A filter representing a single term value
     * @param {*} term
     */
    constructor (term) {
        this.term = term;
    }

    /**
     * Check if a value matches this filters value
     * @param {*} value
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

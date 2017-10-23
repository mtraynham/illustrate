import {Primitive} from 'd3-array';
import {toString} from '../util/ObjectUtils';
import Filter from './Filter';

/**
 * A filter representing a range
 */
class RangeFilter extends Filter<Primitive> {
    private low: Primitive;
    private high: Primitive;
    private lte: boolean;
    private gte: boolean;

    /**
     * @constructor
     * @param {Primitive} low
     * @param {Primitive} high
     * @param {boolean} lte
     * @param {boolean} gte
     */
    constructor (low: Primitive,
                 high: Primitive,
                 lte: boolean = true,
                 gte: boolean = true) {
        super();
        this.low = low;
        this.high = high;
        this.lte = lte;
        this.gte = gte;
    }

    /**
     * Check if a value is filtered between a range
     * @param {object} value
     * @returns {boolean}
     */
    public isFiltered (value: Primitive): boolean {
        return (this.lte ? this.low <= value : this.low < value) &&
            (this.gte ? value <= this.high : value < this.high);
    }

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    public toString (): string {
        return `${this.lte ? '[' : '{'}${toString(this.low)} -> ${toString(this.high)}${this.gte ? ']' : '}'}`;
    }
}

export default RangeFilter;

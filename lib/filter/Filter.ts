/**
 * A base class to handle filtering within charts.
 * @abstract
 */
abstract class Filter<T> {
    /**
     * Check if a value is filtered
     * @param {object} value
     * @returns {boolean}
     */
    public abstract isFiltered (value: T): boolean;

    /**
     * Return a string representing this filter
     * @returns {string}
     */
    public abstract toString (): string;
}

export default Filter;

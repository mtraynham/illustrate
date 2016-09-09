/**
 * A utility class for strings.
 */
class StringUtils {
    /**
     * Check if an object is an instance of the String prototype.
     * @param {object} value
     * @returns {boolean}
     */
    static instanceOf (value) {
        return typeof value === 'string' || value instanceof String;
    }
}

export default StringUtils;

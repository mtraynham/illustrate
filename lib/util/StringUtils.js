/**
 * Check if an object is an instance of the String prototype.
 * @param {object} value
 * @returns {boolean}
 */
export function isString (value) {
    return typeof value === 'string' || value instanceof String;
}

export default null;

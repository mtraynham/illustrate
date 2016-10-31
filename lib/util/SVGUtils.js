/**
 * Get the dimension size of an element (width/height).
 * @param {string} dimension
 * @param {Element} element
 * @returns {number}
 */
function calculateSize (dimension, element) {
    return (element && element.getBoundingClientRect && element.getBoundingClientRect()[dimension]) || 0;
}

/**
 * Get the width of a element
 * @function
 * @param {Element} element
 * @returns {number}
 */
export const calculateWidth = calculateSize.bind(null, 'width');

/**
 * Get the height of a element
 * @function
 * @param {Element} element
 * @returns {number}
 */
export const calculateHeight = calculateSize.bind(null, 'height');

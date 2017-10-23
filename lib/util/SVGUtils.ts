import isNil from 'lodash/isNil';

/**
 * Get the dimension size of an element (width/height).
 * @param {string} dimension
 * @param {Element} element
 * @returns {number}
 */
function calculateSize (dimension: 'height' | 'width', element: Element): number {
    return !isNil(element) ?
        element.getBoundingClientRect()[dimension] :
        0;
}

/**
 * Get the height of a element
 * @function
 * @param {Element} element
 * @returns {number}
 */
export function calculateHeight (element: Element): number {
    return calculateSize('height', element);
}

/**
 * Get the width of a element
 * @function
 * @param {Element} element
 * @returns {number}
 */
export function calculateWidth (element: Element): number {
    return calculateSize('width', element);
}

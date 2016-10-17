export function width (element) {
    return element && element.getBoundingClientRect && element.getBoundingClientRect().width;
}

export function height (element) {
    return element && element.getBoundingClientRect && element.getBoundingClientRect().height;
}

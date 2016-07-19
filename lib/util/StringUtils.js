class StringUtils {
    static nameToId (name) {
        return name.toLowerCase().replace(/[\s]/g, '_').replace(/[.']/g, '');
    }

    static arrayToString (array) {
        return array.map(datum => datum.toString()).join(', ');
    }
}

export default StringUtils;

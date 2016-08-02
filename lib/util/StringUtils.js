class StringUtils {
    static instanceOf (value) {
        return typeof value === 'string' || value instanceof String;
    }
}

export default StringUtils;

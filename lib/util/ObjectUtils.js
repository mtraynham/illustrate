import DateUtils from './DateUtils';
import NumberUtils from './NumberUtils';

class ObjectUtils {
    /**
     * A simplistic object toString converter
     * @param value
     * @returns {string}
     */
    static toString (value) {
        let s = `${value}`;
        if (value instanceof Date) {
            s = DateUtils.format(value);
        } else if (NumberUtils.isFloat(value)) {
            s = NumberUtils.floatFormat(value);
        } else if (NumberUtils.isInteger(value)) {
            s = Math.round(value).toString();
        }
        return s;
    }
}

export default ObjectUtils;

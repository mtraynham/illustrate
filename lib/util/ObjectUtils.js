import DateUtils from './DateUtils';
import NumberUtils from './NumberUtils';

class ObjectUtils {
    /**
     * A simplistic object toString converter
     * @param value
     * @returns {string}
     */
    static toString (value) {
        if (value instanceof Date) {
            return DateUtils.format(value);
        } else if (NumberUtils.isNumber(value)) {
            return NumberUtils.format(value);
        }
        return `${value}`;
    }
}

export default ObjectUtils;

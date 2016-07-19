import DateUtils from './DateUtils';
import NumberUtils from './NumberUtils';

class ObjectUtils {
    static toString(value) {
        let s = `${value}`;
        if (value instanceof Date) {
            s = DateUtils.DATE_FORMAT(value);
        } else if (NumberUtils.isFloat(value)) {
            s = NumberUtils.FLOAT_FORMAT(value);
        } else if (NumberUtils.isInteger(value)) {
            s = Math.round(value).toString();
        }
        return s;
    }
}

export default ObjectUtils;

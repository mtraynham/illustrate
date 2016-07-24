import {timeFormat} from 'd3-time-format/src/defaultLocale';
import StringUtils from './StringUtils';

const defaultFormat = timeFormat('%m/%d/%Y');
let _format = defaultFormat;

class DateUtils {
    static get format () {
        return _format;
    }

    static set format (format) {
        if (format) {
            if (StringUtils.instanceOf(format)) {
                _format = timeFormat(format);
            } else {
                _format = format;
            }
        } else {
            _format = defaultFormat;
        }
    }
}

export default DateUtils;

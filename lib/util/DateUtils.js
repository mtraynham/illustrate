import {timeFormat} from 'd3-time-format/src/defaultLocale';

const defaultFormat = timeFormat('%m/%d/%Y');
let _format = defaultFormat;

class DateUtils {
    static get format () {
        return _format;
    }

    static set format (format) {
        _format = format ? timeFormat(format) : defaultFormat;
    }
}

export default DateUtils;

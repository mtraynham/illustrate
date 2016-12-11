import {assert} from 'chai';
import {timeFormat} from 'd3-time-format/src/defaultLocale';
import DateUtils from '../../lib/util/DateUtils';

describe('DateUtils', () => {
    describe('.format', () => {
        it('has a default', () =>
            assert.equal(DateUtils.format(new Date(2016, 0, 1)), '01/01/2016'));

        it('can set a new string default', () => {
            DateUtils.format = '%Y';
            assert.equal(DateUtils.format(new Date(2016, 0, 1)), 2016);
        });

        it('can reset the string default', () => {
            DateUtils.format = null;
            assert.equal(DateUtils.format(new Date(2016, 0, 1)), '01/01/2016');
        });

        it('can set a new dateFormat default', () => {
            DateUtils.format = timeFormat('%Y');
            assert.equal(DateUtils.format(new Date(2016, 0, 1)), 2016);
        });

        it('can reset the dateFormat default', () => {
            DateUtils.format = null;
            assert.equal(DateUtils.format(new Date(2016, 0, 1)), '01/01/2016');
        });
    });
});

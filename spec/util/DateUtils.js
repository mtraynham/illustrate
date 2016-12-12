import {assert} from 'chai';
import {timeFormat} from 'd3-time-format/src/defaultLocale';
import {defaultFormat} from '../../lib/util/DateUtils';

describe('DateUtils', () => {
    describe('.format', () => {
        it('has a default', () =>
            assert.equal(defaultFormat()(new Date(2016, 0, 1)), '01/01/2016'));

        it('can set a new string default', () => {
            defaultFormat('%Y');
            assert.equal(defaultFormat()(new Date(2016, 0, 1)), 2016);
        });

        it('can reset the string default', () => {
            defaultFormat(null);
            assert.equal(defaultFormat()(new Date(2016, 0, 1)), '01/01/2016');
        });

        it('can set a new dateFormat default', () => {
            defaultFormat(timeFormat('%Y'));
            assert.equal(defaultFormat()(new Date(2016, 0, 1)), 2016);
        });

        it('can reset the dateFormat default', () => {
            defaultFormat(null);
            assert.equal(defaultFormat()(new Date(2016, 0, 1)), '01/01/2016');
        });
    });
});

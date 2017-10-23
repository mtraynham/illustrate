import {timeFormat} from 'd3-time-format';
import {defaultFormat} from './DateUtils';

describe('DateUtils', () => {
    describe('.format', () => {
        it('has a default', () =>
            expect(defaultFormat()(new Date(2016, 0, 1))).toEqual('01/01/2016'));

        it('can set a new string default', () => {
            defaultFormat('%Y');
            expect(defaultFormat()(new Date(2016, 0, 1))).toEqual('2016');
        });

        it('can reset the string default', () => {
            defaultFormat(null);
            expect(defaultFormat()(new Date(2016, 0, 1))).toEqual('01/01/2016');
        });

        it('can set a new dateFormat default', () => {
            defaultFormat(timeFormat('%Y'));
            expect(defaultFormat()(new Date(2016, 0, 1))).toEqual('2016');
        });

        it('can reset the dateFormat default', () => {
            defaultFormat(null);
            expect(defaultFormat()(new Date(2016, 0, 1))).toEqual('01/01/2016');
        });
    });
});

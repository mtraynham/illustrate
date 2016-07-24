import {assert} from 'chai';
import DateUtils from '../../lib/util/DateUtils';

describe('DateUtils', () => {
    describe('.format', () => {
        it('has a default', () =>
            assert.equal(DateUtils.format(new Date(0)), '12/31/1969'));

        it('can set a new default', () => {
            DateUtils.format = '%Y';
            assert.equal(DateUtils.format(new Date(0)), '1969');
        });

        it('can reset the default', () => {
            DateUtils.format = null;
            assert.equal(DateUtils.format(new Date(0)), '12/31/1969');
        });
    });
});

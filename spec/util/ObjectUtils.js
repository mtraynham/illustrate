import {assert} from 'chai';
import ObjectUtils from '../../lib/util/ObjectUtils';

describe('ObjectUtils', () => {
    describe('.toString', () => {
        it('Date', () =>
            assert.equal(ObjectUtils.toString(new Date(0)), '12/31/1969'));

        it('Float', () =>
            assert.equal(ObjectUtils.toString(Number.MIN_VALUE), '0.00'));

        it('Integer', () =>
            assert.equal(ObjectUtils.toString(Number.MAX_VALUE), '1.7976931348623157e+308'));

        it('String', () =>
            assert.equal(ObjectUtils.toString('foo'), 'foo'));

        it('Object', () =>
            assert.equal(ObjectUtils.toString({foo: 'bar'}), '[object Object]'));

        it('Array', () =>
            assert.equal(ObjectUtils.toString(['foo', 'bar']), 'foo,bar'));
    });
});

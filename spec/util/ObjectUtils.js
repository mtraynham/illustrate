import {assert} from 'chai';
import {toString} from '../../lib/util/ObjectUtils';

describe('ObjectUtils', () => {
    describe('.toString', () => {
        it('Date', () =>
            assert.equal(toString(new Date(2016, 0, 1)), '01/01/2016'));

        it('Float', () =>
            assert.equal(toString(Number.MIN_VALUE), '0.00'));

        it('Integer', () =>
            assert.equal(toString(Number.MAX_VALUE), '1.7976931348623157e+308'));

        it('String', () =>
            assert.equal(toString('foo'), 'foo'));

        it('Object', () =>
            assert.equal(toString({foo: 'bar'}), '[object Object]'));

        it('Array', () =>
            assert.equal(toString(['foo', 'bar']), 'foo,bar'));
    });
});

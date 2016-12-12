import {assert} from 'chai';
import {isString} from '../../lib/util/StringUtils';

describe('StringUtils', () => {
    describe('.isString', () => {
        it('String', () =>
            assert.equal(isString('foo'), true));

        it('Date', () =>
            assert.equal(isString(new Date(2016, 0, 1)), false));

        it('Float', () =>
            assert.equal(isString(Number.MIN_VALUE), false));

        it('Integer', () =>
            assert.equal(isString(Number.MAX_VALUE), false));

        it('Object', () =>
            assert.equal(isString({foo: 'bar'}), false));

        it('Array', () =>
            assert.equal(isString(['foo', 'bar']), false));

        it('null', () =>
            assert.equal(isString(null), false));

        it('undefined', () =>
            assert.equal(isString(undefined), false));
    });
});

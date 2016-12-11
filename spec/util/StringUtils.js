import {assert} from 'chai';
import StringUtils from '../../lib/util/StringUtils';

describe('StringUtils', () => {
    describe('.isString', () => {
        it('String', () =>
            assert.equal(StringUtils.isString('foo'), true));

        it('Date', () =>
            assert.equal(StringUtils.isString(new Date(2016, 0, 1)), false));

        it('Float', () =>
            assert.equal(StringUtils.isString(Number.MIN_VALUE), false));

        it('Integer', () =>
            assert.equal(StringUtils.isString(Number.MAX_VALUE), false));

        it('Object', () =>
            assert.equal(StringUtils.isString({foo: 'bar'}), false));

        it('Array', () =>
            assert.equal(StringUtils.isString(['foo', 'bar']), false));

        it('null', () =>
            assert.equal(StringUtils.isString(null), false));

        it('undefined', () =>
            assert.equal(StringUtils.isString(undefined), false));
    });
});

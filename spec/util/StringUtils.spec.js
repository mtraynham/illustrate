import {isString} from '../../lib/util/StringUtils';

describe('StringUtils', () => {
    describe('.isString', () => {
        it('String', () =>
            expect(isString('foo')).toEqual(true));

        it('Date', () =>
            expect(isString(new Date(2016, 0, 1))).toEqual(false));

        it('Float', () =>
            expect(isString(Number.MIN_VALUE)).toEqual(false));

        it('Integer', () =>
            expect(isString(Number.MAX_VALUE)).toEqual(false));

        it('Object', () =>
            expect(isString({foo: 'bar'})).toEqual(false));

        it('Array', () =>
            expect(isString(['foo', 'bar'])).toEqual(false));

        it('null', () =>
            expect(isString(null)).toEqual(false));

        it('undefined', () =>
            expect(isString(undefined)).toEqual(false));
    });
});

import {toString} from './ObjectUtils';

describe('ObjectUtils', () => {
    describe('.toString', () => {
        it('Date', () =>
            expect(toString(new Date(2016, 0, 1))).toEqual('01/01/2016'));

        it('Float', () =>
            expect(toString(Number.MIN_VALUE)).toEqual('0.00'));

        it('Integer', () =>
            expect(toString(Number.MAX_VALUE)).toEqual('1.7976931348623157e+308'));

        it('String', () =>
            expect(toString('foo')).toEqual('foo'));

        it('Object', () =>
            expect(toString({foo: 'bar'})).toEqual('[object Object]'));

        it('Array', () =>
            expect(toString(['foo', 'bar'])).toEqual('foo,bar'));
    });
});

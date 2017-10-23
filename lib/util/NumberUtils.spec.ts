import {format as defaultLocaleFormat} from 'd3-format';
import * as NumberUtils from './NumberUtils';

describe('NumberUtils', () => {
    describe('.format', () => {
        it('has a default', () =>
            expect(NumberUtils.defaultFormat()(0.1234567)).toEqual('0.12'));

        it('can set a new string default', () => {
            NumberUtils.defaultFormat('.3f');
            expect(NumberUtils.defaultFormat()(0.1234567)).toEqual('0.123');
        });

        it('can set reset the string default', () => {
            NumberUtils.defaultFormat(null);
            expect(NumberUtils.defaultFormat()(0.1234567)).toEqual('0.12');
        });

        it('can set a new format default', () => {
            NumberUtils.defaultFormat(defaultLocaleFormat('.3f'));
            expect(NumberUtils.defaultFormat()(0.1234567)).toEqual('0.123');
        });

        it('can set reset the format default', () => {
            NumberUtils.defaultFormat(null);
            expect(NumberUtils.defaultFormat()(0.1234567)).toEqual('0.12');
        });
    });

    describe('.negligibleNumber', () => {
        it('has a default', () =>
            expect(NumberUtils.negligibleNumber()).toEqual(1e-10));

        it('can set a new default', () => {
            const newNegligibleNumber: number = 5;
            NumberUtils.negligibleNumber(newNegligibleNumber);
            expect(NumberUtils.negligibleNumber()).toEqual(newNegligibleNumber);
        });

        it('can set reset the default', () => {
            NumberUtils.negligibleNumber(null);
            expect(NumberUtils.negligibleNumber()).toEqual(1e-10);
        });
    });

    describe('.isNumber', () => {
        describe('true', () => {
            it('float', () =>
                expect(NumberUtils.isNumber(0.1)).toEqual(true));

            it('int', () =>
                expect(NumberUtils.isNumber(1)).toEqual(true));

            it('overflow', () =>
                expect(NumberUtils.isNumber(0.1 + 0.2)).toEqual(true));

            it('zero', () =>
                expect(NumberUtils.isNumber(0)).toEqual(true));

            it('Number.NaN', () =>
                expect(NumberUtils.isNumber(Number.NaN)).toEqual(true));

            it('NumberUtils.EPSILON', () =>
                expect(NumberUtils.isNumber(NumberUtils.EPSILON)).toEqual(true));

            it('Number.POSITIVE_INFINITY', () =>
                expect(NumberUtils.isNumber(Number.POSITIVE_INFINITY)).toEqual(true));

            it('Number.NEGATIVE_INFINITY', () =>
                expect(NumberUtils.isNumber(Number.NEGATIVE_INFINITY)).toEqual(true));

            it('Number.MAX_VALUE', () =>
                expect(NumberUtils.isNumber(Number.MAX_VALUE)).toEqual(true));

            it('Number.MIN_VALUE', () =>
                expect(NumberUtils.isNumber(Number.MIN_VALUE)).toEqual(true));

            it('NumberUtils.MAX_SAFE_INTEGER', () =>
                expect(NumberUtils.isNumber(NumberUtils.MAX_SAFE_INTEGER)).toEqual(true));

            it('NumberUtils.MIN_SAFE_INTEGER', () =>
                expect(NumberUtils.isNumber(NumberUtils.MIN_SAFE_INTEGER)).toEqual(true));
        });

        describe('false', () => {
            it('String', () =>
                expect(NumberUtils.isNumber('')).toEqual(false));

            it('Boolean', () =>
                expect(NumberUtils.isNumber(true)).toEqual(false));

            it('Array', () =>
                expect(NumberUtils.isNumber([])).toEqual(false));

            it('Object', () =>
                expect(NumberUtils.isNumber({})).toEqual(false));
        });
    });

    describe('.isFloat', () => {
        describe('true', () => {
            it('float', () =>
                expect(NumberUtils.isFloat(0.1)).toEqual(true));

            it('overflow', () =>
                expect(NumberUtils.isFloat(0.1 + 0.2)).toEqual(true));

            it('Number.NaN', () =>
                expect(NumberUtils.isFloat(Number.NaN)).toEqual(true));

            it('NumberUtils.EPSILON', () =>
                expect(NumberUtils.isFloat(NumberUtils.EPSILON)).toEqual(true));

            it('Number.MIN_VALUE', () =>
                expect(NumberUtils.isFloat(Number.MIN_VALUE)).toEqual(true));
        });

        describe('false', () => {
            it('int', () =>
                expect(NumberUtils.isFloat(1)).toEqual(false));

            it('zero', () =>
                expect(NumberUtils.isFloat(0)).toEqual(false));

            it('Number.POSITIVE_INFINITY', () =>
                expect(NumberUtils.isFloat(Number.POSITIVE_INFINITY)).toEqual(false));

            it('Number.NEGATIVE_INFINITY', () =>
                expect(NumberUtils.isFloat(Number.NEGATIVE_INFINITY)).toEqual(false));

            it('Number.MAX_VALUE', () =>
                expect(NumberUtils.isFloat(Number.MAX_VALUE)).toEqual(false));

            it('NumberUtils.MAX_SAFE_INTEGER', () =>
                expect(NumberUtils.isFloat(NumberUtils.MAX_SAFE_INTEGER)).toEqual(false));

            it('NumberUtils.MIN_SAFE_INTEGER', () =>
                expect(NumberUtils.isFloat(NumberUtils.MIN_SAFE_INTEGER)).toEqual(false));
        });
    });

    describe('.isInteger', () => {
        describe('true', () => {
            it('int', () =>
                expect(NumberUtils.isInteger(1)).toEqual(true));

            it('zero', () =>
                expect(NumberUtils.isInteger(0)).toEqual(true));

            it('Number.POSITIVE_INFINITY', () =>
                expect(NumberUtils.isInteger(Number.POSITIVE_INFINITY)).toEqual(false));

            it('Number.NEGATIVE_INFINITY', () =>
                expect(NumberUtils.isInteger(Number.NEGATIVE_INFINITY)).toEqual(false));

            it('Number.MAX_VALUE', () =>
                expect(NumberUtils.isInteger(Number.MAX_VALUE)).toEqual(true));

            it('NumberUtils.MAX_SAFE_INTEGER', () =>
                expect(NumberUtils.isInteger(NumberUtils.MAX_SAFE_INTEGER)).toEqual(true));

            it('NumberUtils.MIN_SAFE_INTEGER', () =>
                expect(NumberUtils.isInteger(NumberUtils.MIN_SAFE_INTEGER)).toEqual(true));
        });

        describe('false', () => {
            it('float', () =>
                expect(NumberUtils.isInteger(0.1)).toEqual(false));

            it('overflow', () =>
                expect(NumberUtils.isInteger(0.1 + 0.2)).toEqual(false));

            it('Number.NaN', () =>
                expect(NumberUtils.isInteger(Number.NaN)).toEqual(false));

            it('NumberUtils.EPSILON', () =>
                expect(NumberUtils.isInteger(NumberUtils.EPSILON)).toEqual(false));

            it('Number.MIN_VALUE', () =>
                expect(NumberUtils.isInteger(Number.MIN_VALUE)).toEqual(false));
        });
    });

    const negligibleNumber: number = NumberUtils.negligibleNumber();
    describe('.isNegligible', () => {
        describe('true', () => {
            it(`${negligibleNumber - (negligibleNumber / 10)}`, () =>
                expect(NumberUtils.isNegligible(negligibleNumber - (negligibleNumber / 10))).toEqual(true));

            it(`${-negligibleNumber + (negligibleNumber / 10)}`, () =>
                expect(NumberUtils.isNegligible(-negligibleNumber + (negligibleNumber / 10))).toEqual(true));
        });

        describe('false', () => {
            it(`${negligibleNumber}`, () =>
                expect(NumberUtils.isNegligible(negligibleNumber)).toEqual(false));

            it(`${-negligibleNumber}`, () =>
                expect(NumberUtils.isNegligible(-negligibleNumber)).toEqual(false));
        });
    });

    describe('.safeNumber', () => {
        describe('returns value', () => {
            it('float', () =>
                expect(NumberUtils.safeNumber(0.1)).toEqual(0.1));

            it('int', () =>
                expect(NumberUtils.safeNumber(1)).toEqual(1));

            it('overflow', () =>
                expect(NumberUtils.safeNumber(0.1 + 0.2)).toEqual(0.1 + 0.2));

            it('zero', () =>
                expect(NumberUtils.safeNumber(0)).toEqual(0));

            it('NaN', () =>
                expect(isNaN(NumberUtils.safeNumber(Number.NaN))).toEqual(true));

            it('NumberUtils.EPSILON', () =>
                expect(NumberUtils.safeNumber(NumberUtils.EPSILON)).toEqual(NumberUtils.EPSILON));

            it('Number.POSITIVE_INFINITY', () =>
                expect(NumberUtils.safeNumber(Number.POSITIVE_INFINITY)).toEqual(Number.POSITIVE_INFINITY));

            it('Number.NEGATIVE_INFINITY', () =>
                expect(NumberUtils.safeNumber(Number.NEGATIVE_INFINITY)).toEqual(Number.NEGATIVE_INFINITY));

            it('Number.MAX_VALUE', () =>
                expect(NumberUtils.safeNumber(Number.MAX_VALUE)).toEqual(Number.MAX_VALUE));

            it('Number.MIN_VALUE', () =>
                expect(NumberUtils.safeNumber(Number.MIN_VALUE)).toEqual(Number.MIN_VALUE));

            it('NumberUtils.MAX_SAFE_INTEGER', () =>
                expect(NumberUtils.safeNumber(NumberUtils.MAX_SAFE_INTEGER)).toEqual(NumberUtils.MAX_SAFE_INTEGER));

            it('NumberUtils.MIN_SAFE_INTEGER', () =>
                expect(NumberUtils.safeNumber(NumberUtils.MIN_SAFE_INTEGER)).toEqual(NumberUtils.MIN_SAFE_INTEGER));
        });

        describe('returns no default with 0', () => {
            it('String', () =>
                expect(NumberUtils.safeNumber('')).toEqual(0));

            it('Boolean', () =>
                expect(NumberUtils.safeNumber(true)).toEqual(0));

            it('Array', () =>
                expect(NumberUtils.safeNumber([])).toEqual(0));

            it('Object', () =>
                expect(NumberUtils.safeNumber({})).toEqual(0));
        });

        describe('returns default', () => {
            it('String', () =>
                expect(NumberUtils.safeNumber('', 1)).toEqual(1));

            it('Boolean', () =>
                expect(NumberUtils.safeNumber(true, 1)).toEqual(1));

            it('Array', () =>
                expect(NumberUtils.safeNumber([], 1)).toEqual(1));

            it('Object', () =>
                expect(NumberUtils.safeNumber({}, 1)).toEqual(1));
        });
    });

    describe('.clamp', () => {
        describe('returns value', () => {
            it('0', () =>
                expect(NumberUtils.clamp(0)).toEqual(0));

            it('1', () =>
                expect(NumberUtils.clamp(1)).toEqual(1));

            it('-1', () =>
                expect(NumberUtils.clamp(-1)).toEqual(-1));
        });

        describe('returns high', () => {
            it('0, -5, -1', () =>
                expect(NumberUtils.clamp(0, -5, -1)).toEqual(-1));

            it('1, -5, 0', () =>
                expect(NumberUtils.clamp(1, -5, 0)).toEqual(0));

            it('-1, -5, -2', () =>
                expect(NumberUtils.clamp(-1, -5, -2)).toEqual(-2));
        });

        describe('returns low', () => {
            it('0, 1, 5', () =>
                expect(NumberUtils.clamp(0, 1, 5)).toEqual(1));

            it('1, 2, 5', () =>
                expect(NumberUtils.clamp(1, 2, 5)).toEqual(2));

            it('-1, 0, 5', () =>
                expect(NumberUtils.clamp(-1, 0, 5)).toEqual(0));
        });
    });
});

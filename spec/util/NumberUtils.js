import {assert} from 'chai';
import {format as defaultLocaleFormat} from 'd3-format/src/defaultLocale';
import NumberUtils from '../../lib/util/NumberUtils';

describe('NumberUtils', () => {
    describe('.format', () => {
        it('has a default', () =>
            assert.equal(NumberUtils.format(0.1234567), '0.12'));

        it('can set a new string default', () => {
            NumberUtils.format = '.3f';
            assert.equal(NumberUtils.format(0.1234567), '0.123');
        });

        it('can set reset the string default', () => {
            NumberUtils.format = null;
            assert.equal(NumberUtils.format(0.1234567), '0.12');
        });

        it('can set a new format default', () => {
            NumberUtils.format = defaultLocaleFormat('.3f');
            assert.equal(NumberUtils.format(0.1234567), '0.123');
        });

        it('can set reset the format default', () => {
            NumberUtils.format = null;
            assert.equal(NumberUtils.format(0.1234567), '0.12');
        });
    });

    describe('.negligibleNumber', () => {
        it('has a default', () =>
            assert.equal(NumberUtils.negligibleNumber, 1e-10));

        it('can set a new default', () => {
            const newNegligibleNumber = 5;
            NumberUtils.negligibleNumber = newNegligibleNumber;
            assert.equal(NumberUtils.negligibleNumber, newNegligibleNumber);
        });

        it('can set reset the default', () => {
            NumberUtils.negligibleNumber = null;
            assert.equal(NumberUtils.negligibleNumber, 1e-10);
        });
    });

    describe('.isNumber', () => {
        describe('true', () => {
            it('float', () =>
                assert.equal(NumberUtils.isNumber(0.1), true));

            it('int', () =>
                assert.equal(NumberUtils.isNumber(1), true));

            it('overflow', () =>
                assert.equal(NumberUtils.isNumber(0.1 + 0.2), true));

            it('zero', () =>
                assert.equal(NumberUtils.isNumber(0), true));

            it('Number.NaN', () =>
                assert.equal(NumberUtils.isNumber(Number.NaN), true));

            it('NumberUtils.EPSILON', () =>
                assert.equal(NumberUtils.isNumber(NumberUtils.EPSILON), true));

            it('Number.POSITIVE_INFINITY', () =>
                assert.equal(NumberUtils.isNumber(Number.POSITIVE_INFINITY), true));

            it('Number.NEGATIVE_INFINITY', () =>
                assert.equal(NumberUtils.isNumber(Number.NEGATIVE_INFINITY), true));

            it('Number.MAX_VALUE', () =>
                assert.equal(NumberUtils.isNumber(Number.MAX_VALUE), true));

            it('Number.MIN_VALUE', () =>
                assert.equal(NumberUtils.isNumber(Number.MIN_VALUE), true));

            it('NumberUtils.MAX_SAFE_INTEGER', () =>
                assert.equal(NumberUtils.isNumber(NumberUtils.MAX_SAFE_INTEGER), true));

            it('NumberUtils.MIN_SAFE_INTEGER', () =>
                assert.equal(NumberUtils.isNumber(NumberUtils.MIN_SAFE_INTEGER), true));
        });

        describe('false', () => {
            it('String', () =>
                assert.equal(NumberUtils.isNumber(''), false));

            it('Boolean', () =>
                assert.equal(NumberUtils.isNumber(true), false));

            it('Array', () =>
                assert.equal(NumberUtils.isNumber([]), false));

            it('Object', () =>
                assert.equal(NumberUtils.isNumber({}), false));
        });
    });

    describe('.isFloat', () => {
        describe('true', () => {
            it('float', () =>
                assert.equal(NumberUtils.isFloat(0.1), true));

            it('overflow', () =>
                assert.equal(NumberUtils.isFloat(0.1 + 0.2), true));

            it('Number.NaN', () =>
                assert.equal(NumberUtils.isFloat(Number.NaN), true));

            it('NumberUtils.EPSILON', () =>
                assert.equal(NumberUtils.isFloat(NumberUtils.EPSILON), true));

            it('Number.MIN_VALUE', () =>
                assert.equal(NumberUtils.isFloat(Number.MIN_VALUE), true));
        });

        describe('false', () => {
            it('int', () =>
                assert.equal(NumberUtils.isFloat(1), false));

            it('zero', () =>
                assert.equal(NumberUtils.isFloat(0), false));

            it('Number.POSITIVE_INFINITY', () =>
                assert.equal(NumberUtils.isFloat(Number.POSITIVE_INFINITY), false));

            it('Number.NEGATIVE_INFINITY', () =>
                assert.equal(NumberUtils.isFloat(Number.NEGATIVE_INFINITY), false));

            it('Number.MAX_VALUE', () =>
                assert.equal(NumberUtils.isFloat(Number.MAX_VALUE), false));

            it('NumberUtils.MAX_SAFE_INTEGER', () =>
                assert.equal(NumberUtils.isFloat(NumberUtils.MAX_SAFE_INTEGER), false));

            it('NumberUtils.MIN_SAFE_INTEGER', () =>
                assert.equal(NumberUtils.isFloat(NumberUtils.MIN_SAFE_INTEGER), false));
        });
    });

    describe('.isInteger', () => {
        describe('true', () => {
            it('int', () =>
                assert.equal(NumberUtils.isInteger(1), true));

            it('zero', () =>
                assert.equal(NumberUtils.isInteger(0), true));

            it('Number.POSITIVE_INFINITY', () =>
                assert.equal(NumberUtils.isInteger(Number.POSITIVE_INFINITY), true));

            it('Number.NEGATIVE_INFINITY', () =>
                assert.equal(NumberUtils.isInteger(Number.NEGATIVE_INFINITY), true));

            it('Number.MAX_VALUE', () =>
                assert.equal(NumberUtils.isInteger(Number.MAX_VALUE), true));

            it('NumberUtils.MAX_SAFE_INTEGER', () =>
                assert.equal(NumberUtils.isInteger(NumberUtils.MAX_SAFE_INTEGER), true));

            it('NumberUtils.MIN_SAFE_INTEGER', () =>
                assert.equal(NumberUtils.isInteger(NumberUtils.MIN_SAFE_INTEGER), true));
        });

        describe('false', () => {
            it('float', () =>
                assert.equal(NumberUtils.isInteger(0.1), false));

            it('overflow', () =>
                assert.equal(NumberUtils.isInteger(0.1 + 0.2), false));

            it('Number.NaN', () =>
                assert.equal(NumberUtils.isInteger(Number.NaN), false));

            it('NumberUtils.EPSILON', () =>
                assert.equal(NumberUtils.isInteger(NumberUtils.EPSILON), false));

            it('Number.MIN_VALUE', () =>
                assert.equal(NumberUtils.isInteger(Number.MIN_VALUE), false));
        });
    });

    const negligibleNumber = NumberUtils.negligibleNumber;
    describe('.isNegligible', () => {
        describe('true', () => {
            it(`${negligibleNumber - (negligibleNumber / 10)}`, () =>
                assert.equal(NumberUtils.isNegligible(negligibleNumber - (negligibleNumber / 10)), true));

            it(`${-negligibleNumber + (negligibleNumber / 10)}`, () =>
                assert.equal(NumberUtils.isNegligible(-negligibleNumber + (negligibleNumber / 10)), true));
        });

        describe('false', () => {
            it(`${negligibleNumber}`, () =>
                assert.equal(NumberUtils.isNegligible(negligibleNumber), false));

            it(`${-negligibleNumber}`, () =>
                assert.equal(NumberUtils.isNegligible(-negligibleNumber), false));
        });
    });

    describe('.safeNumber', () => {
        describe('returns value', () => {
            it('float', () =>
                assert.equal(NumberUtils.safeNumber(0.1), 0.1));

            it('int', () =>
                assert.equal(NumberUtils.safeNumber(1), 1));

            it('overflow', () =>
                assert.equal(NumberUtils.safeNumber(0.1 + 0.2), 0.1 + 0.2));

            it('zero', () =>
                assert.equal(NumberUtils.safeNumber(0), 0));

            it('NaN', () =>
                assert.equal(isNaN(NumberUtils.safeNumber(Number.NaN)), true));

            it('NumberUtils.EPSILON', () =>
                assert.equal(NumberUtils.safeNumber(NumberUtils.EPSILON), NumberUtils.EPSILON));

            it('Number.POSITIVE_INFINITY', () =>
                assert.equal(NumberUtils.safeNumber(Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY));

            it('Number.NEGATIVE_INFINITY', () =>
                assert.equal(NumberUtils.safeNumber(Number.NEGATIVE_INFINITY), Number.NEGATIVE_INFINITY));

            it('Number.MAX_VALUE', () =>
                assert.equal(NumberUtils.safeNumber(Number.MAX_VALUE), Number.MAX_VALUE));

            it('Number.MIN_VALUE', () =>
                assert.equal(NumberUtils.safeNumber(Number.MIN_VALUE), Number.MIN_VALUE));

            it('NumberUtils.MAX_SAFE_INTEGER', () =>
                assert.equal(NumberUtils.safeNumber(NumberUtils.MAX_SAFE_INTEGER), NumberUtils.MAX_SAFE_INTEGER));

            it('NumberUtils.MIN_SAFE_INTEGER', () =>
                assert.equal(NumberUtils.safeNumber(NumberUtils.MIN_SAFE_INTEGER), NumberUtils.MIN_SAFE_INTEGER));
        });

        describe('returns no default with 0', () => {
            it('String', () =>
                assert.equal(NumberUtils.safeNumber(''), 0));

            it('Boolean', () =>
                assert.equal(NumberUtils.safeNumber(true), 0));

            it('Array', () =>
                assert.equal(NumberUtils.safeNumber([]), 0));

            it('Object', () =>
                assert.equal(NumberUtils.safeNumber({}), 0));
        });

        describe('returns default', () => {
            it('String', () =>
                assert.equal(NumberUtils.safeNumber('', 1), 1));

            it('Boolean', () =>
                assert.equal(NumberUtils.safeNumber(true, 1), 1));

            it('Array', () =>
                assert.equal(NumberUtils.safeNumber([], 1), 1));

            it('Object', () =>
                assert.equal(NumberUtils.safeNumber({}, 1), 1));
        });
    });

    describe('.clamp', () => {
        describe('returns value', () => {
            it('0', () =>
                assert.equal(NumberUtils.clamp(0), 0));

            it('1', () =>
                assert.equal(NumberUtils.clamp(1), 1));

            it('-1', () =>
                assert.equal(NumberUtils.clamp(-1), -1));
        });

        describe('returns high', () => {
            it('0, -5, -1', () =>
                assert.equal(NumberUtils.clamp(0, -5, -1), -1));

            it('1, -5, 0', () =>
                assert.equal(NumberUtils.clamp(1, -5, 0), 0));

            it('-1, -5, -2', () =>
                assert.equal(NumberUtils.clamp(-1, -5, -2), -2));
        });

        describe('returns low', () => {
            it('0, 1, 5', () =>
                assert.equal(NumberUtils.clamp(0, 1, 5), 1));

            it('1, 2, 5', () =>
                assert.equal(NumberUtils.clamp(1, 2, 5), 2));

            it('-1, 0, 5', () =>
                assert.equal(NumberUtils.clamp(-1, 0, 5), 0));
        });
    });
});

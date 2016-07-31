import {assert} from 'chai';
import NumberUtils from '../../lib/util/NumberUtils';

describe('NumberUtils', () => {
    describe('.format', () => {
        it('has a default', () =>
            assert.equal(NumberUtils.format(0.1234567), '0.12'));

        it('can set a new default', () => {
            NumberUtils.format = '.3f';
            assert.equal(NumberUtils.format(0.1234567), '0.123');
        });

        it('can set reset the default', () => {
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

            it('NaN', () =>
                assert.equal(NumberUtils.isNumber(Number.NaN), true));

            it('POSITIVE_INFINITY', () =>
                assert.equal(NumberUtils.isNumber(Number.POSITIVE_INFINITY), true));

            it('NEGATIVE_INFINITY', () =>
                assert.equal(NumberUtils.isNumber(Number.NEGATIVE_INFINITY), true));

            it('MAX_VALUE', () =>
                assert.equal(NumberUtils.isNumber(Number.MAX_VALUE), true));

            it('MIN_VALUE', () =>
                assert.equal(NumberUtils.isNumber(Number.MIN_VALUE), true));
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

            it('NaN', () =>
                assert.equal(NumberUtils.isFloat(Number.NaN), true));

            it('MIN_VALUE', () =>
                assert.equal(NumberUtils.isFloat(Number.MIN_VALUE), true)); // TODO ?
        });

        describe('false', () => {
            it('int', () =>
                assert.equal(NumberUtils.isFloat(1), false));

            it('zero', () =>
                assert.equal(NumberUtils.isFloat(0), false));

            it('POSITIVE_INFINITY', () =>
                assert.equal(NumberUtils.isFloat(Number.POSITIVE_INFINITY), false));

            it('NEGATIVE_INFINITY', () =>
                assert.equal(NumberUtils.isFloat(Number.NEGATIVE_INFINITY), false));

            it('MAX_VALUE', () =>
                assert.equal(NumberUtils.isFloat(Number.MAX_VALUE), false));
        });
    });

    describe('.isInteger', () => {
        describe('true', () => {
            it('int', () =>
                assert.equal(NumberUtils.isInteger(1), true));

            it('zero', () =>
                assert.equal(NumberUtils.isInteger(0), true));

            it('POSITIVE_INFINITY', () =>
                assert.equal(NumberUtils.isInteger(Number.POSITIVE_INFINITY), true));

            it('NEGATIVE_INFINITY', () =>
                assert.equal(NumberUtils.isInteger(Number.NEGATIVE_INFINITY), true));

            it('MAX_VALUE', () =>
                assert.equal(NumberUtils.isInteger(Number.MAX_VALUE), true));
        });

        describe('false', () => {
            it('float', () =>
                assert.equal(NumberUtils.isInteger(0.1), false));

            it('overflow', () =>
                assert.equal(NumberUtils.isInteger(0.1 + 0.2), false));

            it('NaN', () =>
                assert.equal(NumberUtils.isInteger(Number.NaN), false));

            it('MIN_VALUE', () =>
                assert.equal(NumberUtils.isInteger(Number.MIN_VALUE), false)); // TODO ?
        });
    });

    const negligibleNumber = NumberUtils.negligibleNumber;
    describe('.isNegligible', () => {
        describe('true', () => {
            it(negligibleNumber - (negligibleNumber / 10), () =>
                assert.equal(NumberUtils.isNegligible(negligibleNumber - (negligibleNumber / 10)), true));

            it(-negligibleNumber + (negligibleNumber / 10), () =>
                assert.equal(NumberUtils.isNegligible(-negligibleNumber + (negligibleNumber / 10)), true));
        });

        describe('false', () => {
            it(negligibleNumber, () =>
                assert.equal(NumberUtils.isNegligible(negligibleNumber), false));

            it(-negligibleNumber, () =>
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

            it('POSITIVE_INFINITY', () =>
                assert.equal(NumberUtils.safeNumber(Number.POSITIVE_INFINITY), Number.POSITIVE_INFINITY));

            it('NEGATIVE_INFINITY', () =>
                assert.equal(NumberUtils.safeNumber(Number.NEGATIVE_INFINITY), Number.NEGATIVE_INFINITY));

            it('MAX_VALUE', () =>
                assert.equal(NumberUtils.safeNumber(Number.MAX_VALUE), Number.MAX_VALUE));

            it('MIN_VALUE', () =>
                assert.equal(NumberUtils.safeNumber(Number.MIN_VALUE), Number.MIN_VALUE));
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

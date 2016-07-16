import Chart from '../lib/Chart';

describe('A suite', () => {
    it('contains spec with an expectation', () =>
        expect(new Chart()).not.toEqual(null));
});

import {assert} from 'chai';
import Chart from '../lib/Chart';

describe('A suite', () => {
    it('contains spec with an expectation', () =>
        assert.notEqual(new Chart(), null));
});

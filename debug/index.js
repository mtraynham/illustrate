import Chance from 'chance';
import scaleLinear from 'd3-scale/src/linear';
import Chart from '../lib/Chart';

// Test Data
const chance = new Chance();
chance.mixin({row: () => ({
    date: chance.date({year: 2016}),
    vowels: chance.character({pool: 'aeiouy'}),
    county: chance.country(),
    age: chance.age({type: 'adult'}),
    bool: chance.bool(),
    float: chance.floating({min: -25, max: 25}),
    integer: chance.integer({min: -25, max: 25}),
    positiveInteger: chance.integer({min: 0, max: 25}),
    string: chance.string({length: 4})
})});
const data = chance.n(chance.row, 100);

(new Chart())
    .key(d => d.age, scaleLinear())
    .value(d => d.positiveInteger)
    .attach('#chart')
    .draw(data);

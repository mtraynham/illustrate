import Chance from 'chance';
import {Chart} from '../index.js';
// import {scaleLinear, scaleOrdinal} from 'd3-scale';

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
    string: chance.string({length: 4})
})});
const data = chance.n(chance.row, 100);

const chart = new Chart();
chart.draw(data);

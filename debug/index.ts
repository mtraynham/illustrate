import Chance from 'chance';
import {scaleLinear} from 'd3-scale';
import Chart from '../lib/chart/Bar';

interface IDatum {
    date: Date | string;
    vowels: string;
    county: string;
    age: number;
    bool: boolean;
    float: number;
    integer: number;
    positiveInteger: number;
    text: string;
}
interface IChanceWithRow extends Chance.Chance {
    row(): IDatum;
}

// Test Data
const chance: IChanceWithRow = <IChanceWithRow> new Chance();
chance.mixin({row: (): IDatum => ({
    date: chance.date({year: 2016}),
    vowels: chance.character({pool: 'aeiouy'}),
    county: chance.country(),
    age: chance.age({type: 'adult'}),
    bool: chance.bool(),
    float: chance.floating({min: -25, max: 25}),
    integer: chance.integer({min: -25, max: 25}),
    positiveInteger: chance.integer({min: 0, max: 25}),
    text: chance.string({length: 4})
})});
const data: IDatum[] = chance.n<IDatum>(chance.row, 100);

(new Chart())
    .key((d: IDatum) => d.age, scaleLinear())
    .value((d: IDatum) => d.positiveInteger)
    .attach('#chart')
    .draw(data);

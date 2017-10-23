import {Axis as D3Axis, AxisScale} from 'd3-axis';
import {Accessor} from './types';

abstract class Axis<T, TDomain, R extends AxisScale<TDomain>> {
    public accessor: Accessor<T, TDomain>;
    public scale: R;
    public axis: D3Axis<TDomain>;

    constructor (scale: R) {
        this.scale = scale;
    }

    public abstract domain (data: T[]): this;

    public abstract range (range: [number, number]): this;

    public abstract value (object: T): number;
}

export default Axis;

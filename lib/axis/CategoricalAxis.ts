import {ScaleOrdinal} from 'd3-scale';
import Axis from './Axis';

class CategoricalAxis<T, TDomain, Range> extends Axis<T, TDomain, ScaleOrdinal<TDomain, Range>> {
    public compute (data: T[]): this {
        return this.scale.domain(data);
    }
}

export default CategoricalAxis;

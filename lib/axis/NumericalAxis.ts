import {ScaleContinuousNumeric} from 'd3-scale';
import Axis from './Axis';

class NumericalAxis<T, TRange, Output> extends Axis<T, ScaleContinuousNumeric<TRange, Output>> {

}

export default NumericalAxis;

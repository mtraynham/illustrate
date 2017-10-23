import {AxisScale} from 'd3-axis';
import {Selection} from 'd3-selection';
import Chart from './Chart';

class Bar<T, TKey, TKeyAxisScale extends AxisScale<TKey>, TValue, TValueAxisScale extends AxisScale<TValue>> extends
    Chart<T, TKey, TKeyAxisScale, TValue, TValueAxisScale> {
    public draw (data: T[]): this {
        super.draw(data);
        const height: number = +this.g.attr('height');
        // bars
        const bars: Selection<SVGRectElement, T, SVGElement, void> = this.g.selectAll<SVGRectElement, T>('g.bar')
            .data(data); //, (d: T) => this.keyAxis.accessor(d));
        const barsEnter: Selection<SVGGElement, T, SVGElement, void> = bars.enter()
            .append<SVGGElement>('g')
            .classed('bar', true);
        barsEnter
            .append<SVGRectElement>('rect')
            .attr('x', this.keyAxis.value)
            .attr('width', 4)
            .attr('y', this.valueAxis.value)
            .attr('height', (d: T) => height - this.valueAxis.value(d));
        bars.exit()
            .remove();
        return this;
    }
}

export default Bar;

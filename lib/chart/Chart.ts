import {AxisScale} from 'd3-axis';
import {BaseType, select, Selection} from 'd3-selection';
import isNil from 'lodash/isNil';
import Axis from '../axis/Axis';
import {calculateHeight, calculateWidth} from '../util/SVGUtils';
import './Chart.scss';

interface IMargins {
    left: number;
    top: number;
    right: number;
    bottom: number;
}

/**
 * A base chart implementation
 * @abstract
 */
class Chart<T, TKey, TKeyAxisScale extends AxisScale<TKey>, TValue, TValueAxisScale extends AxisScale<TValue>> {
    protected g: Selection<SVGGElement, void, HTMLElement, void>;
    protected keyAxis: Axis<T, TKey, TKeyAxisScale>;
    protected valueAxis: Axis<T, TValue, TValueAxisScale>;
    private root: Selection<BaseType, void, null, undefined>;
    private svg: Selection<SVGGElement, void, HTMLElement, void>;
    private x: Selection<SVGGElement, void, HTMLElement, void>;
    private y: Selection<SVGGElement, void, HTMLElement, void>;

    /**
     * @constructor
     */
    constructor () {
        this.svg = select<HTMLBodyElement, void>('body')
            .append<SVGGElement>('svg')
            .classed('chart', true)
            .remove();
        this.g = this.svg.append<SVGGElement>('g')
            .classed('chart-body', true);
        this.x = this.g.append<SVGGElement>('g')
            .classed('y-axis', true);
        this.y = this.g.append<SVGGElement>('g')
            .classed('x-axis', true);
    }

    /**
     * Set the chart root node
     * @param {Element|d3.selection|string} root
     * @returns {Chart}
     */
    public attach (root: BaseType): this {
        if (!isNil(root)) {
            if (!isNil(this.root)) {
                this.detach();
            }
            this.root = select(root);
            (<Element> this.root.node()).appendChild(this.svg.node());
        }
        return this;
    }

    /**
     * Remove the chart from the root node
     * @returns {Chart}
     */
    public detach (): this {
        this.svg.remove();
        return this;
    }

    /**
     * Set the key axis
     * @param {Axis} axis
     * @returns {Chart}
     */
    public key (axis: Axis<T, TKey, TKeyAxisScale>): this {
        this.keyAxis = axis;
        return this;
    }

    /**
     * Set the scale for the value and it's data value accessor
     * @param {Axis} axis
     * @returns {Chart}
     */
    public value (axis: Axis<T, TValue, TValueAxisScale>): this {
        this.valueAxis = axis;
        return this;
    }

    /**
     * Draw the chart with a data set
     * @param {Array<object>} data
     * @returns {Chart}
     */
    public draw (data: T[]): this {
        // chart
        const chartWidth: number = calculateWidth(<Element> this.root.node());
        const chartHeight: number = calculateHeight(<Element> this.root.node());
        const margins: IMargins = {top: 10, left: 20, right: 10, bottom: 20};
        this.svg
            .attr('width', chartWidth)
            .attr('height', chartHeight);

        // chart body
        const width: number = chartWidth - margins.left - margins.right;
        const height: number = chartHeight - margins.top - margins.bottom;
        this.g
            .attr('transform', `translate(${margins.left}, ${margins.top})`)
            .attr('width', width)
            .attr('height', height);

        // y-axis
        this.keyAxis
            .domain(data)
            .range([height, 0]);
        this.y
            .attr('height', height)
            .call(this.keyAxis.axis);

        // x-axis
        this.valueAxis
            .domain(data)
            .range([0, width]);
        this.x
            .attr('transform', `translate(0, ${height})`)
            .attr('width', width)
            .call(this.valueAxis.axis);
        return this;
    }
}

export default Chart;

import {axisLeft, axisBottom} from 'd3-axis/src/axis';
import extent from 'd3-array/src/extent';
import select from 'd3-selection/src/select';
import scaleLinear from 'd3-scale/src/linear';
import scaleOrdinal from 'd3-scale/src/ordinal';

import './Chart.scss';
import {width, height} from './util/SVGUtils';

/**
 * @callback Accessor
 * @param {Object} datum
 * @returns {Object}
 */

/**
 * A base chart implementation
 * @abstract
 */
class Chart {
    /**
     * @constructor
     */
    constructor () {
        this.svg = select('body')
            .append('svg')
            .classed('chart', true)
            .remove();
        this.g = this.svg.append('g')
            .classed('chart-body', true);
        this.x = this.g.append('g')
            .classed('y-axis', true);
        this.y = this.g.append('g')
            .classed('x-axis', true);
    }

    /**
     * Set the chart root node
     * @param {Element|d3.selection|string} root
     * @returns {Chart}
     */
    attach (root) {
        if (root) {
            if (this.root) {
                this.detach();
            }
            this.root = select(root);
            this.root.node().appendChild(this.svg.node());
        }
        return this;
    }

    /**
     * Remove the chart from the root node
     * @returns {Chart}
     */
    detach () {
        this.svg.remove();
        return this;
    }

    /**
     * Set the scale for the key and it's data key accessor
     * @param {Accessor} accessor
     * @param {d3.scale} scale
     * @returns {Chart}
     */
    key (accessor, scale = scaleOrdinal()) {
        this.keyAccessor = accessor;
        this.keyScale = scale;
        this.axisLeft = axisLeft(scale);
        return this;
    }

    /**
     * Set the scale for the value and it's data value accessor
     * @param {Accessor} accessor
     * @param {d3.scale} scale
     * @returns {Chart}
     */
    value (accessor, scale = scaleLinear()) {
        this.valueAccessor = accessor;
        this.valueScale = scale;
        this.axisBottom = axisBottom(scale);
        return this;
    }

    /**
     * Draw the chart with a data set
     * @param {Array<object>} data
     * @returns {Chart}
     */
    draw (data) {
        // chart size
        const w = width(this.root.node());
        const h = height(this.root.node());
        this.svg
            .attr('width', w)
            .attr('height', h);

        // y-axis
        this.keyScale
            .domain(extent(data, this.keyAccessor))
            .range([h - 20, 0]);
        this.y
            .attr('transform', 'translate(20, 0)')
            .attr('height', h - 20)
            .call(this.axisLeft);

        // x-axis
        this.valueScale
            .domain(extent(data, this.valueAccessor))
            .range([0, w]);
        this.x
            .attr('transform', `translate(20, ${h - 20})`)
            .attr('width', w - 20)
            .call(this.axisBottom);

        // rows
        // const rows = this.g.selectAll('g.row')
        //     .data(data, this.keyAccessor);
        // const rowsEnter = rows.enter()
        //     .append('g')
        //     .classed('row');
        // rowsEnter
        //     .append('rect')
        //     .attr('width', 0);
        return this;
    }
}
Chart.DOMAIN = 725;

export default Chart;

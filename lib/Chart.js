import {axisLeft, axisBottom} from 'd3-axis/src/axis';
import extent from 'd3-array/src/extent';
import select from 'd3-selection/src/select';
import scaleLinear from 'd3-scale/src/linear';
import scaleOrdinal from 'd3-scale/src/ordinal';
import './Chart.scss';

/**
 * @callback Accessor
 * @param {Object} datum
 * @returns {Object}
 */

/**
 * A base chart implementation
 */
class Chart {
    /**
     * @constructor
     */
    constructor () {
        this.svg = select('body')
            .append('svg')
            .classed('chart', true)
            .attr('viewBox', `0 0 ${Chart.DOMAIN} ${Chart.DOMAIN}`)
            .attr('preserveAspectRatio', 'none')
            .attr('height', '100%')
            .attr('width', '100%')
            .remove();
        const g = this.svg.append('g')
            .classed('chart-body', true)
            .attr('transform', 'translate(0, 0)')
            .attr('height', Chart.DOMAIN)
            .attr('width', Chart.DOMAIN);
        g.append('g')
            .classed('y-axis', true)
            .attr('transform', 'translate(0, 0)')
            .attr('height', Chart.DOMAIN);
        g.append('g')
            .classed('x-axis', true)
            .attr('transform', `translate(0, ${Chart.DOMAIN})`)
            .attr('width', Chart.DOMAIN);
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
        this.keyScale = scale.range([0, Chart.DOMAIN]);
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
        this.valueScale = scale.range([0, Chart.DOMAIN]);
        this.axisBottom = axisBottom(scale);
        return this;
    }

    /**
     * Draw the chart with a data set
     * @param {Array<object>} data
     * @returns {Chart}
     */
    draw (data) {
        const g = this.svg.select('g');
        // y-axis
        this.keyScale.domain(extent(data, this.keyAccessor));
        g.select('g.y-axis')
            .call(this.axisLeft);
        // x-axis
        this.valueScale.domain(extent(data, this.valueAccessor));
        g.select('g.x-axis')
            .call(this.axisBottom);
        // rows
        const rows = g.selectAll('g.row')
            .data(data, this.keyAccessor);
        const rowsEnter = rows.enter()
            .append('g')
            .classed('row');
        rowsEnter
            .append('rect')
            .attr('width', 0);
        return this;
    }
}
Chart.DOMAIN = 4096;

export default Chart;

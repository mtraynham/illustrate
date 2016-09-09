import select from 'd3-selection/src/select';
// import dispatch from 'd3-dispatch/src/dispatch';
import {axisLeft, axisBottom} from 'd3-axis/src/axis';
import extent from 'd3-array/src/extent';
import './Chart.scss';

class Chart {
    constructor () {
        this.svg = select(document.createElement('svg'));
        const g = this.svg.append('g');
        // yScale
        g.append('g')
            .classed('y-axis');
        g.append('g')
            .classed('x-axis');
    }

    /**
     * Set the chart root node
     * @param root
     * @returns {Chart}
     */
    attach (root) {
        if (root) {
            if (this.root) {
                this.detach();
            }
            this.root = select(root);
            this.root.append(this.svg);
        }
        return this;
    }

    /**
     * Remove the chart from the root node
     * @param root
     * @returns {Chart}
     */
    detach () {
        this.svg.remove();
        return this;
    }

    key (scale, accessor) {
        this.keyScale = scale;
        this.axisLeft = axisLeft(scale);
        this.keyAccessor = accessor;
        return this;
    }

    value (scale, accessor) {
        this.valueScale = scale;
        this.axisBottom = axisBottom(scale);
        this.valueAccessor = accessor;
    }

    draw (data) {
        const g = this.svg.select('g');
        // y-axis
        this.keyScale.domain(data.map(this.keyAccessor));
        g.select('g.y-axis')
            .call(this.axisLeft);
        // x-axis
        this.valueScale.domain(extent(data, this.valueAccessor));
        g.select('g.x-axis')
            .call(this.axisBottom);
        // rows
        const rows = g.selectAll('g.row')
            .data(data);
        const rowsEnter = rows.enter()
            .append('g')
            .class('row');
        rowsEnter
            .append('rect')
            .attr('width', 0);
        return this;
    }
}

export default Chart;

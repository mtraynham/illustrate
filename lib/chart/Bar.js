import Chart from './Chart';

class Bar extends Chart {
    draw (data) {
        super.draw(data);
        const height = this.g.attr('height');
        // bars
        const bars = this.g.selectAll('g.bar')
            .data(data, this.keyAccessor);
        const barsEnter = bars.enter()
            .append('g')
            .classed('bar', true);
        barsEnter
            .append('rect')
            .attr('x', d => this.keyScale(this.keyAccessor(d)))
            .attr('width', 4)
            .attr('y', d => this.valueScale(this.valueAccessor(d)))
            .attr('height', d => height - this.valueScale(this.valueAccessor(d)));
        bars.exit().remove();
    }
}

export default Bar;

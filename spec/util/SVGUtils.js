import {assert} from 'chai';
import select from 'd3-selection/src/select';
import {calculateHeight, calculateWidth} from '../../lib/util/SVGUtils';

describe('SVGUtils', () => {
    const divHeight = 100;
    const divWidth = 200;
    const svgHeight = 80;
    const svgWidth = 180;
    const rectHeight = 50;
    const rectWidth = 50;
    let div;
    let svg;
    let rect;

    beforeEach(() => {
        div = select('body')
            .append('div')
            .style('height', `${divHeight}px`)
            .style('width', `${divWidth}px`);
        svg = div.append('svg')
            .attr('height', svgHeight)
            .attr('width', svgWidth);
        rect = svg.append('rect')
            .attr('height', rectHeight)
            .attr('width', rectWidth);
    });

    afterEach(() => div.remove());

    describe('.calculateHeight', () => {
        it('div', () =>
            assert.equal(calculateHeight(div.node()), divHeight));

        it('svg', () =>
            assert.equal(calculateHeight(svg.node()), svgHeight));

        it('rect', () =>
            assert.equal(calculateHeight(rect.node()), rectHeight));
    });

    describe('.calculateWidth', () => {
        it('div', () =>
            assert.equal(calculateWidth(div.node()), divWidth));

        it('svg', () =>
            assert.equal(calculateWidth(svg.node()), svgWidth));

        it('rect', () =>
            assert.equal(calculateWidth(rect.node()), rectWidth));
    });
});

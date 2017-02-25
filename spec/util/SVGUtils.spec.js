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
            expect(calculateHeight(div.node())).toEqual(divHeight));

        it('svg', () =>
            expect(calculateHeight(svg.node())).toEqual(svgHeight));

        it('rect', () =>
            expect(calculateHeight(rect.node())).toEqual(rectHeight));
    });

    describe('.calculateWidth', () => {
        it('div', () =>
            expect(calculateWidth(div.node())).toEqual(divWidth));

        it('svg', () =>
            expect(calculateWidth(svg.node())).toEqual(svgWidth));

        it('rect', () =>
            expect(calculateWidth(rect.node())).toEqual(rectWidth));
    });
});

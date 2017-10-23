import {select, Selection} from 'd3-selection';
import {calculateHeight, calculateWidth} from './SVGUtils';

describe('SVGUtils', () => {
    const divHeight: number = 100;
    const divWidth: number = 200;
    const svgHeight: number = 80;
    const svgWidth: number = 180;
    const rectHeight: number = 50;
    const rectWidth: number = 50;
    let div: Selection<HTMLDivElement, void, HTMLElement, void>;
    let svg: Selection<SVGElement, void, HTMLElement, void>;
    let rect: Selection<SVGRectElement, void, HTMLElement, void>;

    beforeEach(() => {
        div = select<HTMLBodyElement, void>('body')
            .append<HTMLDivElement>('div')
            .style('height', `${divHeight}px`)
            .style('width', `${divWidth}px`);
        svg = div.append<SVGElement>('svg')
            .attr('height', svgHeight)
            .attr('width', svgWidth);
        rect = svg.append<SVGRectElement>('rect')
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

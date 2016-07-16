import './Chart.scss';
import dispatch from 'd3-dispatch/src/dispatch';

class Chart {
    constructor () {
        this.events = dispatch(['foo']);
    }

    set rootSelection (rootSelection) {
        this.rootSelector = rootSelection;
    }

    get rootSelection () {
        return this.rootSelector;
    }
}

export default Chart;

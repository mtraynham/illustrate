import './Chart.scss';
import select from 'd3-selection/src/select';
import dispatch from 'd3-dispatch/src/dispatch';

class Chart {
    constructor () {
        this.events = dispatch(['foo']);
    }

    setRoot (root) {
        this.root = select(root);
    }

    getRoot () {
        return this.root;
    }
}

export default Chart;

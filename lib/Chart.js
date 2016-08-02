import select from 'd3-selection/src/select';
import dispatch from 'd3-dispatch/src/dispatch';
import './Chart.scss';

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

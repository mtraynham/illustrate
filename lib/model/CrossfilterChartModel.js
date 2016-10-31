import ChartModel from './ChartModel';

export default class CrossfilterChartModel extends ChartModel {
    /**
     * A chart model that represents a specific Crossfilter dimension and it's
     * grouping.
     * @param {crossfilter.Dimension} dimension
     * @param {crossfilter.Group} group
     */
    constructor (dimension, group) {
        super();
        this.dimension = dimension;
        this.group = group;
    }

    apply () {
        if (this.filters && this.filters.length > 0) {
            this.dimension.filterFunction(value =>
                this.filters.some(filter =>
                    filter.isFiltered(value)));
        } else {
            this.dimension.filterAll();
        }
        return this;
    }

    data () {
        return this.group.all();
    }

    destroy () {
        this.dimension.filterAll();
    }
}

import dispatch from 'd3-dispatch/src/dispatch';

class ChartModel {
    constructor () {
        if (this.constructor === ChartModel) {
            throw new Error('Cannot instantiate abstract class');
        }
        this.listeners = dispatch(
            ChartModel.FILTER,
            ChartModel.APPLY
        );
        this.filters = [];
    }

    hasFilter (filter) {
        return this.filters.indexOf(filter) > -1;
    }

    isFiltered (key) {
        return this.filters.some(filter => filter.isFiltered(key));
    }

    addFilter (filter) {
        return this.filters.push(filter);
    }

    removeFilter (filter) {
        const index = this.filters.indexOf(filter);
        if (index > -1) {
            this.filters.splice(index, 1);
        }
        return filter;
    }

    clearFilters () {
        const tmp = this.filters;
        this.filters = [];
        return tmp;
    }

    filter (filter) {
        if (arguments.length) {
            if (!filter) {
                this.clearFilters();
            } else if (this.hasFilter(filter)) {
                this.removeFilter(filter);
            } else {
                this.addFilter(filter);
            }
            this.apply();
        }
        return this;
    }

    apply () {
        throw new Error('This method is abstract.');
    }

    data () {
        throw new Error('This method is abstract.');
    }

    destroy () {
        throw new Error('This method is abstract.');
    }
}
ChartModel.FILTER = 'filter';
ChartModel.APPLY = 'apply';

export default ChartModel;

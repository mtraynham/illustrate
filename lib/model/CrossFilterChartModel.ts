import isEmpty from 'lodash/isEmpty';
import Filter from '../filter/Filter';
import ChartModel from './ChartModel';

class CrossFilterChartModel<T, TKey, TValue> extends ChartModel<T, TKey, CrossFilter.Grouping<TKey, TValue>> {
    private dimension: CrossFilter.Dimension<T, TKey>;
    private group: CrossFilter.Group<T, TKey, TValue>;

    /**
     * A chart model that represents a specific CrossFilter dimension and it's
     * grouping.
     * @param {CrossFilter.Dimension} dimension
     * @param {CrossFilter.Group} group
     */
    constructor (dimension: CrossFilter.Dimension<T, TKey>,
                 group: CrossFilter.Group<T, TKey, TValue>) {
        super();
        this.dimension = dimension;
        this.group = group;
    }

    public apply (): this {
        if (!isEmpty(this.filters.length)) {
            this.dimension.filterFunction((value: TKey) =>
                this.filters.some((filter: Filter<TKey>) =>
                    filter.isFiltered(value)));
        } else {
            this.dimension.filterAll();
        }
        return this;
    }

    public data (): CrossFilter.Grouping<TKey, TValue>[] {
        return this.group.all();
    }

    public destroy (): this {
        this.group.dispose();
        this.dimension.filterAll();
        this.dimension.dispose();
        return this;
    }
}

export default CrossFilterChartModel;

import {dispatch, Dispatch} from 'd3-dispatch';
import isEmpty from 'lodash/isEmpty';
import isNil from 'lodash/isNil';
import Filter from '../filter/Filter';

class ChartModel<T, TKey, TOutput> {
    public static FILTER: string = 'filter';
    public static APPLY: string = 'apply';

    public listeners: Dispatch<undefined>;
    protected filters: Filter<TKey>[];

    constructor () {
        if (this.constructor === ChartModel) {
            throw new Error('Cannot instantiate abstract class');
        }
        this.filters = [];
        this.listeners = dispatch(
            ChartModel.FILTER,
            ChartModel.APPLY
        );
    }

    public hasFilter (filter: Filter<TKey>): boolean {
        return this.filters.indexOf(filter) > -1;
    }

    public isFiltered (key: TKey): boolean {
        return this.filters.some((filter: Filter<TKey>) =>
            filter.isFiltered(key));
    }

    public addFilter (filter: Filter<TKey>): number {
        return this.filters.push(filter);
    }

    public removeFilter (filter: Filter<TKey>): Filter<TKey> {
        const index: number = this.filters.indexOf(filter);
        if (index > -1) {
            this.filters.splice(index, 1);
        }
        return filter;
    }

    public clearFilters (): Filter<TKey>[] {
        const tmp: Filter<TKey>[] = this.filters;
        this.filters = [];
        return tmp;
    }

    public filter (filter: Filter<TKey>): this {
        if (!isEmpty(arguments)) {
            if (isNil(filter)) {
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

    public apply (): this {
        throw new Error('This method is abstract.');
    }

    public data (): TOutput[] {
        throw new Error('This method is abstract.');
    }

    public destroy (): this {
        throw new Error('This method is abstract.');
    }
}

export default ChartModel;

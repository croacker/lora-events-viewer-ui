import BaseFilter from './base-filter'

export default class ErrorFilter extends BaseFilter {
    buildFilter() {
        return `${this.getFilterBetween()}${this.getFilterDevEui()}${this.getFilterDeviceName()}${this.getFilterApplicationName()}`;
    }

    buildWhere() {
        return `${this.getWhereBetween()}${this.getWhereDevEui()}${this.getWhereDeviceName()}${this.getWhereApplicationName()}`;
    }
}
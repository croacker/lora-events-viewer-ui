export default class BaseFilter {
    constructor() {
        this.devEui = '';
        this.deviceName = '';
        this.applicationName = '';
        this.dateFrom = this.previousWeek()
            .toISOString()
            .substr(0, 10);
        this.dateTo = new Date().toISOString().substr(0, 10);
    }

    getFilterBetween() {
        const from = new Date(this.dateFrom).toISOString();
        const to = new Date(`${this.dateTo}T23:59:59.999Z`).toISOString();
        return `filter[where][receivedAt][between][0]=${from}&filter[where][receivedAt][between][1]=${to}`;
    }

    getWhereBetween() {
        const from = new Date(this.dateFrom).toISOString();
        const to = new Date(`${this.dateTo}T23:59:59.999Z`).toISOString();
        return `where[receivedAt][between][0]=${from}&where[receivedAt][between][1]=${to}`;
    }


    getFilterDeviceName() {
        let filter = '';
        if (this.deviceName) {
            filter = `&filter[where][deviceName][like]=%${this.deviceName}%`;
        }
        return filter;
    }

    getWhereDeviceName() {
        let where = '';
        if (this.deviceName) {
            where = `&where[deviceName][like]=%${this.deviceName}%`;
        }
        return where;
    }

    getFilterDevEui() {
        let filter = '';
        if (this.devEui) {
            filter = `&filter[where][devEui][like]=%${this.devEui}%`;
        }
        return filter;
    }

    getWhereDevEui() {
        let where = '';
        if (this.devEui) {
            where = `&where[devEui][like]=%${this.devEui}%`;
        }
        return where;
    }

    getFilterApplicationName() {
        let filter = '';
        if (this.applicationName) {
            filter = `&filter[where][applicationName][like]=%${this.applicationName}%`;
        }
        return filter;
    }

    getWhereApplicationName() {
        let where = '';
        if (this.applicationName) {
            where = `&where[applicationName][like]=%${this.applicationName}%`;
        }
        return where;
    }

    previousMonth() {
        const now = new Date();
        return now.getMonth() === 0
            ? new Date(now.getFullYear() - 1, 11, now.getDate())
            : new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    }

    previousWeek() {
        const today = new Date();
        return new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    }
}
import BaseMapper from "./base-mapper";

export default class ErrorMapper extends BaseMapper {
    get fieldMap() {
        return new Map([
            ['id', 'id'],
            ['receivedAt', this.receivedAtToLocaleDate],
            ['devEui', 'devEui'],
            ['deviceName', 'deviceName'],
            ['applicationId', 'applicationId'],
            ['applicationName', 'applicationName'],
            ['type', 'type'],
            ['error', 'error'],
            ['fCnt', 'fCnt'],
            ])
    }

}
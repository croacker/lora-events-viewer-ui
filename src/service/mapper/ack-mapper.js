import BaseMapper from "./base-mapper";

export default class AckMapper extends BaseMapper {
    get fieldMap() {
        return new Map([
            ['id', 'id'],
            ['receivedAt', this.receivedAtToLocaleDate],
            ['devEui', 'devEui'],
            ['deviceName', 'deviceName'],
            ['applicationId', 'applicationId'],
            ['applicationName', 'applicationName'],
            ['acknowledged', 'acknowledged'],
            ['fCnt', 'fCnt'],
            ])
    }

}
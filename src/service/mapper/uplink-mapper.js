import BaseMapper from "./base-mapper";

export default class UplinkMapper extends BaseMapper {
    get fieldMap() {
        return new Map([
            ['id', 'id'],
            ['receivedAt', this.receivedAtToLocaleDate],
            ['devEui', 'devEui'],
            ['deviceName', 'deviceName'],
            ['applicationName', 'applicationName'],
            ['frequency', 'frequency'],
            ['fCnt', 'fCnt'],
            ['data', this.dataToBase64],
            ['rxInfo', 'rxInfo'],
            ['rxInfoDescription', 'JSON'],
        ])
    }

}
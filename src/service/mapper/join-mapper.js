import BaseMapper from "./base-mapper";

export default class JoinMapper extends BaseMapper {
    get fieldMap() {
        return new Map([
            ['id', 'id'],
            ['receivedAt', this.receivedAtToLocaleDate],
            ['devEui', 'devEui'],
            ['deviceName', 'deviceName'],
            ['applicationId', 'applicationId'],
            ['applicationName', 'applicationName'],
            ['devAddr', 'devAddr'],
            ])
    }

}
import BaseMapper from "./base-mapper";

export default class StatusMapper extends BaseMapper {
    get fieldMap() {
        return new Map([
            ['id', 'id'],
            ['receivedAt', this.receivedAtToLocaleDate],
            ['devEui', 'devEui'],
            ['deviceName', 'deviceName'],
            ['applicationId', 'applicationId'],
            ['applicationName', 'applicationName'],
            ['margin', 'margin'],
            ['externalPowerSource', 'externalPowerSource'],
            ['batteryLevelUnavailable', 'batteryLevelUnavailable'],
            ['batteryLevel', 'batteryLevel'],
            ])
    }

}
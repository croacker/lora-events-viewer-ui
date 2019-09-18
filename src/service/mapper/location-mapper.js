import BaseMapper from "./base-mapper";

export default class LocationMapper extends BaseMapper {
    get fieldMap() {
        return new Map([
            ['id', 'id'],
            ['receivedAt', this.receivedAtToLocaleDate],
            ['devEui', 'devEui'],
            ['deviceName', 'deviceName'],
            ['applicationId', 'applicationId'],
            ['applicationName', 'applicationName'],
            ['altitude', 'altitude'],
            ['latitude', 'latitude'],
            ['geohash', 'geohash'],
            ['accuracy', 'accuracy'],
            ])
    }

}

import DataService from "../DataService";

export default class BaseMapper {
  get fieldMap() {
    throw new Error('Not implemented RootItemDataMapper.fieldMap')
  }

  convertCollection(data) {
    let result = []

    if (data && data.length) {
      for (const i in data) {
        const item = data[i]
        result.push(this.map(item, i))
      }
    }
    return result
  }

  map(payload) {
    let item = {}
    for (const [internalKey, externalKey] of this.fieldMap.entries()) {
      let value = null
      if (null != externalKey && typeof externalKey === 'function') {
        value = externalKey(payload, internalKey)
      } else {
        value = payload[externalKey]
      }

      item[internalKey] = value
    }
    return item
  }

  receivedAtToLocaleDate(item) {
    const date = new Date(item.receivedAt);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  dataToBase64(item) {
    return DataService.byteToBase64(item.data.data)
  }
}
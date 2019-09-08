import axios from "axios";
import util from '../util'
import config from "../../config/config";

const networkAddress = config.APP_URL

export default class BaseDao{
  async getCount(filter){
    const u = `${util.stringTrimEnd(this.url, '/')}/count/${filter.id}`
    const response = await this.sendRequest({
      url: u,
      method: 'get',
    })
    const data = response.data
    let result = null
    if (data) {
      result = data.count
    }
    return result
  }
  async getItem(filter){
    const u = `${util.stringTrimEnd(this.url, '/')}/${filter.id}`
    const response = await this.sendRequest({
      url: u,
      method: 'get',
    })

    const data = response.data
    let result = null
    if (data) {
      result = this.map(data, 0)
    }
    return result
  }
  async getItems(filter){
    const response = await this.sendRequest({
      url: this.url,
      method: 'get',
      data: filter
    })

    const data = response.data

    return this.convertCollection(data)
  }
  sendRequest(props) {
    const url = props.url
    const method = props.method
    const formData = props.data

    // let accessTokenId = ''
    // if (this.$store.getters.accessToken) {
    //   accessTokenId = store.getters.accessToken.id
    // }

    if (!(url && url.length)) {
      throw new RangeError('Url null or empty')
    }

    let targetUrl = `${util.stringTrimEnd(networkAddress, '/')}/${util.stringTrimStart(url, '/')}`
    let bodyFormData = null

    if (method.toLowerCase() !== 'get') {
      bodyFormData = formData
    } else {
      targetUrl = targetUrl + '?'

      for (const p in formData) {
        targetUrl = targetUrl + p + '=' + encodeURIComponent(formData[p]) + '&'
      }
      targetUrl = util.stringTrim(targetUrl, '&')
      targetUrl = util.stringTrim(targetUrl, '?')
    }

    return axios({
      method: method,
      url: targetUrl,
      data: bodyFormData,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        // 'X-Access-Token': accessTokenId,
      }
    })
  }
}
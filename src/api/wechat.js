import request from '@/api/request'
import Api from '@/config/api'

export default {

  registerJsApi (params) {
    const options = {
      service: Api.Wechat.RegisterJsApi,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getPubTmpQrcode (params) {
    const options = {
      service: Api.Wechat.GetPubTmpQrcode,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

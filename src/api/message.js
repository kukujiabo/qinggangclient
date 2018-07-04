import request from '@/api/request'
import Api from '@/config/api'

export default {

  sendMessage (params) {
    const options = {
      service: Api.Message.SendMessage,
      method: 'post',
      params: params
    }
    return request(options)
  },

  checkCode (params) {
    const options = {
      service: Api.Message.CheckCode,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

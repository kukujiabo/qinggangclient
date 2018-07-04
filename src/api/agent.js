import request from '@/api/request'
import Api from '@/config/api'

export default {

  apply (params) {
    const options = {
      service: Api.Agent.Apply,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getApplied (params) {
    const options = {
      service: Api.Agent.GetApplied,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

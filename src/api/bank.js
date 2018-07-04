import request from '@/api/request'
import Api from '@/config/api'

export default {

  queryList (params) {
    const options = {
      service: Api.Bank.List,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getAll (params) {
    const options = {
      service: Api.Bank.All,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

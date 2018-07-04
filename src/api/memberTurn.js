import request from '@/api/request'
import Api from '@/config/api'

export default {

  list (params) {
    const options = {
      service: Api.MemberTurn.List,
      method: 'post',
      params: params
    }
    return request(options)
  },

  apply (params) {
    const options = {
      service: Api.MemberTurn.Apply,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

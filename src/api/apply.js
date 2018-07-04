import request from '@/api/request'
import Api from '@/config/api'

export default {

  applyCredit (params) {
    const options = {
      service: Api.Apply.Credit,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

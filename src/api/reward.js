import request from '@/api/request'
import Api from '@/config/api'

export default {

  /**
   * 新增
   * @param {} params
   */
  getList (params) {
    const options = {
      service: Api.Reward.List,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getDetail (params) {
    const options = {
      service: Api.Reward.GetDetail,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

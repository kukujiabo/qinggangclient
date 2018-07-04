import request from '@/api/request'
import Api from '@/config/api'

export default {

  /**
   * 新增
   * @param {} params
   */
  queryList (params) {
    const options = {
      service: Api.Shop.List,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getAll (params) {
    const options = {
      service: Api.Shop.GetAll,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getDetail (params) {
    const options = {
      service: Api.Shop.GetDetail,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

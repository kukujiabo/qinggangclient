import request from '@/api/request'
import Api from '@/config/api'

export default {

  applyWithdraw (params) {
    const options = {
      service: Api.Account.ApplyWithdraw,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getDetail (params) {
    const options = {
      service: Api.Account.GetDetail,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getLogList (params) {
    const options = {
      service: Api.Account.GetLogList,
      method: 'post',
      params: params
    }
    return request(options)
  },

  saveAliAccount (params) {
    const options = {
      service: Api.Account.SaveAliAccount,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getAliAccountDetail (params) {
    const options = {
      service: Api.Account.GetAliAccountDetail,
      method: 'post',
      params: params
    }
    return request(options)
  },

  cashApply (params) {
    const options = {
      service: Api.Account.CashApply,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

import request from '@/api/request'
import Api from '@/config/api'

export default {

  checkToken (params) {
    const options = {
      service: Api.Member.CheckToken,
      method: 'post',
      params: params
    }
    return request(options)
  },

  checkAccount (params) {
    const options = {
      service: Api.Member.CheckAccount,
      method: 'post',
      params: params
    }
    return request(options)
  },

  register (params) {
    const options = {
      service: Api.Member.Register,
      method: 'post',
      params: params
    }
    return request(options)
  },

  login (params) {
    const options = {
      service: Api.Member.Login,
      method: 'post',
      params: params
    }
    return request(options)
  },

  wechatLogin (params) {
    const options = {
      service: Api.Member.WechatLogin,
      method: 'post',
      params: params
    }
    return request(options)
  },

  listQuery (params) {
    const options = {
      service: Api.Member.List,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getQrcode (params) {
    const options = {
      service: Api.Member.GetQrcode,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getReferenceList (params) {
    const options = {
      service: Api.Member.GetReferenceList,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getReferenceLoans (params) {
    const options = {
      service: Api.Member.GetReferenceLoans,
      method: 'post',
      params: params
    }
    return request(options)
  },

  getReferenceCards (params) {
    const options = {
      service: Api.Member.GetReferenceCards,
      method: 'post',
      params: params
    }
    return request(options)
  },

  checkPartner (params) {
    const options = {
      service: Api.Member.CheckPartner,
      method: 'post',
      params: params
    }
    return request(options)
  },

  resetPassword (params) {
    const options = {
      service: Api.Member.ResetPassword,
      method: 'post',
      params: params
    }
    return request(options)
  }

}

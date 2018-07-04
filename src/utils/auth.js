import Cookies from 'vue-cookies'

const TokenKey = 'Client-Token'
const AgentId = 'AgentId'
const Redirect = 'redirect'
const Tab = 'tabView'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getAgent () {
  return Cookies.get(AgentId)
}

export function removeAgent () {
  return Cookies.remove(AgentId)
}

export function setRedirectParams (params) {
  return Cookies.set(Redirect, params)
}

export function getRedirectParams () {
  return Cookies.get(Redirect)
}

export function setAgent (id) {
  return Cookies.set(AgentId, id)
}

export function setIndexTab (view) {
  return Cookies.set(Tab, view)
}

export function getIndexTab () {
  return Cookies.get(Tab)
}

export function isWechat () {
  var agent = navigator.userAgent.toLowerCase()
  var matched = agent.match(/MicroMessenger/i)
  if (matched && matched[0] === 'micromessenger') {
    return true
  } else {
    return false
  }
}

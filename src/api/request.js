import fetch from '@/utils/request'
import host from '@/config/hosts'
import error from '@/config/error'
import { getToken } from '@/utils/auth'

export default (options, header) => {
  header = header || { }
  return fetch({
    url: options.url ? options.url : host(options.service),
    method: options.method,
    data: options.params,
    transformRequest: [data => {
      // Do whatever you want to transform the data
      let ret = ''
      for (var it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: options.headers ? options.headers : {
      'Content-Type': 'application/x-www-form-urlencoded',
      'CX-TOKEN': getToken()
    }
  }).then(response => {
    const result = response.data
    if (result.ret !== 200) {
      if (typeof error[result.ret] === 'function') {
        return error[result.ret](result)
      } else {
        return result
      }
    } else {
      return result
    }
  })
}

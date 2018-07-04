const protocol = document.location.protocol // 请求协议
const serverHost = 'qinggang.xinxingtianxia.com' // 请求地址
var urls = {
  server_host: protocol + '//' + serverHost + '/api/',
  img_upload_url: 'http://up.qiniu.com/', // protocol === 'https:' ? protocol + '//up.qbox.me' : protocol + '//up.qiniu.com',
  buckets: {
    video: 'http://p4zsxtp7z.bkt.clouddn.com/',
    image: 'http://p4zs4o36y.bkt.clouddn.com/'
  }
}

export default (service) => {
  return urls.server_host + '?service=' + service
}

export function getUrl (type) {
  return urls[type]
}

export function imgUrl (bucket, file) {
  return urls.buckets[bucket] + file
}

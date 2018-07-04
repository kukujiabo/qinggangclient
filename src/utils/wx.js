import WX from 'weixin-js-sdk'
import WechatApi from '@/api/wechat'

export default data => {
  WX.ready(res => {
    WX.onMenuShareTimeline({
      title: data.title, // 分享标题
      link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: data.imgUrl, // 分享图标
      success: function () {
        // 用户点击了分享后执行的回调函数
      }
    })
    WX.onMenuShareAppMessage({
      title: data.title, // 分享标题
      link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: data.imgUrl, // 分享图标
      desc: data.desc,
      success: function () {
          // 用户点击了分享后执行的回调函数
      }
    })
  })

  let url = window.location.href.split('#')[0]

  WechatApi.registerJsApi({
    url: url
  }).then(res => {
    if (res.ret === 200) {
      var conf = {
        debug: false,
        appId: res.data.appid,
        timestamp: res.data.timestamp,
        nonceStr: res.data.noncestr,
        signature: res.data.signature,
        jsApiList: [
          'checkJsApi',
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'getLocation'
        ]
      }
      WX.config(conf)
      if (data.reconfig) {
        WX.onMenuShareTimeline({
          title: data.title, // 分享标题
          link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: data.imgUrl, // 分享图标
          success: function () {
            // 用户点击了分享后执行的回调函数
          }
        })
        WX.onMenuShareAppMessage({
          title: data.title, // 分享标题
          link: data.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: data.imgUrl, // 分享图标
          desc: data.desc,
          success: function () {
              // 用户点击了分享后执行的回调函数
          }
        })
      }
    }
  })
}

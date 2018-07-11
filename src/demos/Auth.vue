<template>
    <div></div>
</template>
<script>
import MemberApi from '@/api/member'
import Db from '@/db'
import { setToken, setRedirectParams, getRedirectParams, setAgent, removeAgent } from '@/utils/auth'
const protocol = document.location.protocol + '//'

export default {
    data() {

        return {

            authUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?',

            oauthParams: {

                appid: 'wx56f67359ff45ef0d',

                redirect_uri: protocol + 'qinggang.xinxingtianxia.com/auth',

                response_type: 'code',

                scope: 'snsapi_userinfo',

                state: ''

            }

        }

    },
    created() {

        var query = this.$route.query

        if (!query.code) {

            var params = ''

            if (query.reference) {

                this.oauthParams.state = query.reference

            }

            for(var key in this.oauthParams) {

                params += key + '=' + this.oauthParams[key] + '&'

            }

            var url = this.authUrl + params.substr(0, params.length - 1) + '#wechat_redirect'

            window.location.href = url

        } else {

            MemberApi.wechatLogin({ code: query.code, reference: query.state }).then(res => {

                if ( res.ret == 200 ) {

                   setToken(res.data.token)

                   Db.set('auth', res.data.auth)
                   
                   Db.set('au_checked', 1)

                   if (res.data.auth.member_type > 0) {

                       setAgent(1)

                   } else {

                       removeAgent()

                   }

                   window.location.href = protocol + 'qinggang.xinxingtianxia.com'

                }

            })

        }

    },
    methods: {



    }
}
</script>

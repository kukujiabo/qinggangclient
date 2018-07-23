<template>
  <div class="my-page bt0">
    <simple-header class="bg-org wt-color" title="推广码"  :backText="''"  :back-link="true"></simple-header>
    <page-content>
        <div class="text-center" style="height:525px">
            <img width="350" height="525" :src="imgUrl">
        </div>
    </page-content>
  </div>
</template>

<style scoped>
    .bt0 {
        bottom: 0;
    }
</style>


<script>
import Content from '../components/content'
import { SimpleHeader } from '../components/header'
import { List, ListItem } from '../components/list'
import Icon from '../components/icons'
import Db from '@/db'
import { getToken, setToken } from '@/utils/auth'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'
import MemberApi from '@/api/member'
import WechatApi from '@/api/wechat'


export default {
    components: {
        SimpleHeader,
        'page-content': Content,
        List,
        ListItem,
        Alert,
        Confirm,
        Modal,
        Prompt,
        Icon
    },
    created() {

        var that = this

        if (this.$route.query.pub == 1) {

            WechatApi.getPubTmpQrcode([]).then(res => {

                if (res.ret == 200) {

                    that.draw(res.data)

                }

            })

        } else {

            this.url = this.$route.query.url

            MemberApi.getQrcode({ url: this.url }).then(res => {

                if (res.ret == 200) {

                    that.draw(res.data)

                }

            })

        }

    },
    data() {

        return {

            url: '',
            imgUrl: ''

        }

    },
    methods: {

        draw(qrCode) {

            var canvs = document.createElement('canvas')

            canvs.height = 525;

            canvs.width = 350;

            let context = canvs.getContext('2d')

            let bgImg = new Image()

            let that = this

            bgImg.width = 350

            bgImg.height = 550

            bgImg.setAttribute("crossOrigin",'Anonymous')

            let qrImg = new Image()

            qrImg.width = 128

            qrImg.height = 128

            qrImg.onload = _ => {

                context.drawImage(qrImg, 116, 362, 128, 128)

                let base64 = canvs.toDataURL('image/png')
                    
                that.imgUrl = base64

            }

            bgImg.onload = _ => {
                
                context.drawImage(bgImg, 0, 0, 350, 525)

                qrImg.src = qrCode

            }

            bgImg.src = '/static/qrcode_background.jpg'
            
        }   

    }

}
</script>

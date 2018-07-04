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

        this.url = this.$route.query.url

        MemberApi.getQrcode({ url: this.url }).then(res => {

            if (res.ret == 200) {

               that.draw(res.data)

            }

        })

    },
    data() {

        return {

            url: '',
            imgUrl: ''

        }

    },
    methods: {

        getQrcode() {



        },

        draw(qrCode) {

            var canvs = document.createElement('canvas')

            canvs.height = 525;

            canvs.width = 350;

            let context = canvs.getContext('2d')

            let bgImg = new Image()

            bgImg.width = 350

            bgImg.height = 550

            bgImg.setAttribute("crossOrigin",'Anonymous')

            bgImg.onload = _ => {
                
                context.drawImage(bgImg, 0, 0, 350, 525)

                let qrImg = new Image()

                qrImg.width = 128

                qrImg.height = 128

                qrImg.onload = _ => {

                    context.drawImage(qrImg, 116, 362, 128, 128)

                    this.imgUrl = canvs.toDataURL('image/png')

                }

                qrImg.src = qrCode

            }

            bgImg.src = 'http://oys4x0rd0.bkt.clouddn.com/qrcode.jpg'
            
        }   

    }
}
</script>

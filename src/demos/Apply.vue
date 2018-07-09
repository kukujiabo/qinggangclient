<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="确定办理人" :back-link="true"></simple-header>
        <page-content>
            <img :src="banner" class="holder">
            <form-list>
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right">真实姓名</div>
                        <div class="item-input">
                            <input class="text-center ft75" v-model="form.contact" AUTOCOMPLETE="off" type="text" placeholder="请填写真实姓名">
                        </div>
                    </div>
                </form-item>
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right">手机号码</div>
                        <div class="item-input">
                            <input class="text-center ft75" v-model="form.phone" AUTOCOMPLETE="off" type="text" placeholder="请填写手机号码">
                        </div>
                    </div>
                </form-item>
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right">身份证号</div>
                        <div class="item-input">
                            <input class="text-center ft75" v-model="form.address" AUTOCOMPLETE="off" type="text" placeholder="请填写身份证号">
                        </div>
                    </div>
                </form-item>
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right">期望额度</div>
                        <div class="item-input">
                            <input class="text-center ft75" v-model="form.brief" AUTOCOMPLETE="off" type="text" placeholder="请填写期望额度">
                        </div>
                    </div>
                </form-item>
            </form-list>
            <div class="login-btn">
                <m-button type="warning" @click.native="apply()">下一步：关键信息</m-button>
            </div>
            <div class="ft60 dark1-color tips bold">
                <p class="text-center org-color"> -------- 温馨提示 --------</p>
                <ol>
                    <li>如此前申请过信用卡，关键信息请填写尽量一致。</li>
                    <li>申请年龄需在18-60周岁以内。</li>
                    <li>尽量选择易批卡种(普卡、金卡等)。</li>
                    <li>填写实名手机号（手机号码使用时间越长越好），最好能和本人支付宝同号。</li>
                    <li>现居住地址填写越久越好，越具体越好，精确到几号几楼几室。</li>
                    <li>工作单位、地址、座机是必填项，工作时间越久越好，最好为寄卡地址。</li>
                    <li>学历填写大专以上，非大专可填写大专。</li>
                    <li>年收入包括保险、公积金、奖金等等。</li>
                    <li>同一家银行信用卡申请间隔70天以上。</li>
                </ol>
            </div>
        </page-content>
        <alert :title="'提示'" :content="noticeTxt"  ref="alert"></alert>
    </div> 
</template>
<style>
    .holder {
        width: 100%;
    }
    .form-list .item-title.label {
        width: 100px;
        padding-right: 16px;
    }
    input {
        -webkit-appearance:none;
        outline: none;
    }
    .login-btn {
        padding: 10px 30px;
    }
    .tips {
        padding: 10px 30px;
    }
    ol {
        padding: 0 0 0 10px;
    }
    li {
        padding: 0;
        margin: 6px;
    }
    div.list {
        margin: 0.5rem 0;
    }
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Button, ButtonGroup } from '../components/buttons'
import { Form, FormItem } from '../components/form'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'
import ApplyApi from '@/api/apply'
import Db from '@/db'
import Wx from '@/utils/wx'
import { isWechat } from '@/utils/auth'

export default {
    created() {

        this.url = this.$route.query.url

        this.form.type = this.$route.query.type

        this.form.relat_id = this.$route.query.id

        if (this.form.type == 'card') {

            this.banner = 'http://p4zs4o36y.bkt.clouddn.com/confirm-info.jpg'

        } else {
            
            this.banner = this.$route.query.image

        }

        if (isWechat()) {

            let auth = Db.get('auth')            

            let link = 'http://qinggang.xinxingtianxia.com/apply?url=' + this.url + '&type=' + this.form.type + '&id=' + this.form.relat_id + '&reference=' +  ( auth && auth.member_identity ? auth.member_identity : 1)

            let conf = {
                title: this.$route.query.card_name,
                link: link,
                desc: '审批快，额度高',
                imgUrl: this.$route.query.thumb,
                reconfig: true
            }
                    
            Wx(conf)

        }

    },

    components: {
        SimpleHeader,
        'page-content': Content,
        ButtonGroup,
        'm-button': Button,
        'form-list': Form,
        FormItem,
        Alert,
        Confirm,
        Modal,
        Prompt
    },
    
    data() {
        
        return {

            url: '',

            noticeTxt: '',

            banner: '',

            form: {

                type: '',
                relat_id: '',
                name: '1',
                contact: '',
                phone: '',
                address: '',
                brief: '',
                reference: ''

            },

            loading: false

        }

    },
    methods: {

        apply() {

            if (!this.form.name) {

                this.noticeTxt = '请正确填写姓名！'

                this.$refs.alert.open()

                return

            }
            if (!this.form.phone) {

                this.noticeTxt = '请正确填写手机号！'

                this.$refs.alert.open()

                return

            }
            if (!this.form.address || this.form.address.length != 18) {

                this.noticeTxt = '请正确填写身份证号！'

                this.$refs.alert.open()

                return

            }

            if (this.loading) {

                return

            } else {

                this.loading = true

            }

            this.form.reference = Db.get('referebce')

            ApplyApi.applyCredit(this.form).then(res => {

                if (res.ret == 200 && res.data > 0) {

                    window.location.href = this.url

                } else {

                    this.noticeTxt = '系统繁忙，请稍后再试，谢谢！'

                    this.$refs.alert.open()            

                    this.loading = false

                }

            }) 

        }

    }

}
</script>

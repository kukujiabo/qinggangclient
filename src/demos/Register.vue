<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="用户注册" :back-link="true"></simple-header>
        <page-content>
            <div><img src="http://p7vsax0lb.bkt.clouddn.com/58f89aa9d0bbf_meitu_3.jpg" style="width:100%"></div>
            <form-list>
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right va-mid">手机号</div>
                        <div class="item-input">
                            <input class="text-left ft75 va-mid" @change="inputPhone" AUTOCOMPLETE="off" v-model="form.phone" type="text" placeholder="请输入手机号">
                        </div>
                        <div class="item-after">
                        </div>
                    </div>
                </form-item>

                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right va-mid">姓名</div>
                        <div class="item-input">
                            <input class="text-left ft75 va-mid" AUTOCOMPLETE="off" v-model="form.member_name" type="text" placeholder="请输入昵称">
                        </div>
                        <div class="item-after">
                        </div>
                    </div>
                </form-item>
                
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right va-mid">密码</div>
                        <div class="item-input">
                            <input class="ext-left ft75 va-mid" AUTOCOMPLETE="off" v-model="form.password" type="password" placeholder="请输入密码">
                        </div>

                    </div>
                </form-item>

                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right va-mid">验证码</div>
                        <div class="item-input" style="width:200px">
                            <input type="number" class="va-mid ext-left ft75" v-model="form.code" placeholder="请输入验证码">
                        </div>
                        <div class="item-after">
                            <m-button v-show="show" size="small" type="warning" class="ft50" @click.native="sendMessage()">发送验证码</m-button>
                            <m-button v-show="!show" size="small" type="warning" class="ft50" >{{count}} s 重发</m-button>
                        </div>
                    </div>
                </form-item>
            </form-list>
            <div class="login-btn">
                <m-button type="warning" @click.native="submit()">立即注册</m-button>
            </div>
            <div class="alter clearfix">
                <div class="fr text-right">
                    <router-link :to="{ path: '/login' }">
                        <span class="ft60 dark1-color">已有账号，立即登录</span>
                    </router-link>
                </div>
            </div>
        </page-content>
        <alert :title="'错误！'" :content="noticeTxt" ref="error"></alert>
        <alert :title="'提示'" :content="noticeTxt" :on-ok="toLogin" ref="alert"></alert>
    </div>
</template>

<style scoped>
    .form-list .item-title.label {
        width: 80px;
        padding-right: 16px;
    }
    input {
        -webkit-appearance:none;
        outline: none;
    }
    .login-btn {
        padding: 5px 30px;
    }
    .alter {
        padding: 10px 30px;
    }
    .alter div {
        width: 50%;
    }
    .form-list {
        margin-top: 0 !important;
    }
    .list-append {
        
    }
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Button, ButtonGroup } from '../components/buttons'
import { Form, FormItem } from '../components/form'
import MessageApi from '@/api/message'
import MemberApi from '@/api/member'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'
import { getToken } from '@/utils/auth'

export default {
    
    components: {
        SimpleHeader,
        'page-content': Content,
        ButtonGroup,
        'm-button': Button,
        'form-list': Form,
        Alert,
        Confirm,
        Modal,
        Prompt,
        FormItem
    },

    created() {


    },

    data() {

        return {

            timer: null,
            count: '',
            show: true,
            noticeTxt: '',
            form: {

                phone: '',
                code: '',
                password: '',
                membr_name: ''

            }

        }

    },

    methods: {

        inputPhone(evt) {

            MemberApi.checkAccount({ account: evt.target.value }).then(res => {

                if (res.ret == 200 && res.data) {

                    this.form.phone = ''

                    this.noticeTxt = '该手机号已注册，请更换手机号！'

                    this.$refs.error.open()

                    return                   

                }

            })


        },

        sendMessage() {

            if (!this.form.phone || this.form.phone.length != 11) {

                this.noticeTxt = '请正确填写手机号！'

                this.$refs.error.open()

                return

            }

            var that = this

            MessageApi.sendMessage({

                mobile: this.form.phone

            }).then(res => {

                that.timeCount()

            })

        },

        timeCount() {

            const TIME_COUNT = 30

            if (!this.timer) {

                this.count = TIME_COUNT

                this.show = false

                var that = this

                this.timer = setInterval(() => {

                    if (that.count > 0) {

                        that.count--

                    } else {

                        that.show = true

                        clearInterval(that.timer)

                        that.timer = null

                    }

                }, 1000)

            }


        },

        submit() {

            if (!this.form.phone || this.form.phone.length != 11) {

                this.noticeTxt = '请正确填写手机号！'

                this.$refs.error.open()

                return

            }
            if (!this.form.code) {

                this.noticeTxt = '请正确填写验证码！'

                this.$refs.error.open()

                return

            }
            if (!this.form.member_name) {

                this.noticeTxt = '请正确填写姓名！'

                this.$refs.error.open()

                return

            }
            if (this.form.member_name) {

                var regex= /^[\u4e00-\u9fa50-9A-Za-z]+$/;

                var result = regex.test(this.form.member_name);

                if (!result) {

                    this.noticeTxt = '姓名只能输入英文和中文！'

                    this.$refs.error.open()

                    return               

                }

            }
            if (!this.form.password || this.form.password < 6) {

                this.noticeTxt = '密码至少为 6 位！'

                this.$refs.error.open()

                return

            }
            MessageApi.checkCode({

                mobile: this.form.phone,

                code: this.form.code

            }).then(res => {

                if (res.ret == 200 && res.data == 1) {

                    return true

                } else if (res.ret == 110001) {

                    this.noticeTxt = '该手机号已注册，请更换手机号！'

                    this.$refs.error.open()                    

                    return false                    

                } else {

                    this.noticeTxt = '验证码错误或已过期！'

                    this.$refs.error.open()                    

                    return false

                }

            }).then(res => {

                if (res) {

                    MemberApi.register({

                        mobile: this.form.phone,

                        member_name: this.form.member_name,

                        password: this.form.password,
                        
                        token: getToken()

                    }).then(res => {

                        if (res.ret == 200) {

                            if (res.data > 0) {

                                this.noticeTxt = '注册成功，请登录！'

                                this.$refs.alert.open()              

                            } else {


                            }

                        }

                    })  

                }

            })

        },

        toLogin() {

            this.$router.push({ path: '/login' })

        }

    }
    
}
</script>

<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="找回密码" :back-link="true"></simple-header>
        <page-content>
            <form-list>
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right va-mid">手机号</div>
                        <div class="item-input">
                            <input class="text-left ft75 va-mid" AUTOCOMPLETE="off" type="text" v-model="form.mobile" placeholder="请输入手机号">
                        </div>
                        <div class="item-after">
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
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right va-mid">密码</div>
                        <div class="item-input"> 
                            <input class="ext-left ft75 va-mid" AUTOCOMPLETE="off" v-model="form.new_password" type="password" placeholder="设置新密码">
                        </div>
                        <div class="item-after">
                        </div>
                    </div>
                </form-item>
            </form-list>
            <div class="login-btn">
                <m-button type="warning" @click.native="confirmPassword()">确认修改</m-button>
            </div>
        </page-content>
        <alert :title="'提示'" :content="noticeTxt" ref="alert"></alert>
        <alert :title="'提示'" :content="noticeTxt" :on-ok="toLogin" ref="resetsuccess"></alert>
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
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Button, ButtonGroup } from '../components/buttons'
import { Form, FormItem } from '../components/form'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'
import MessageApi from '@/api/message'
import MemberApi from '@/api/member'

export default {
    components: {
        SimpleHeader,
        'page-content': Content,
        ButtonGroup,
        'm-button': Button,
        'form-list': Form,
        FormItem,
        Alert
    },

    data() {

        return {

            noticeTxt: '',

            timer: null,

            count: '',

            form: {

                new_password: '',
                mobile: '',
                code: ''

            },
            
            show: true,

        }

    },

    methods: {

        sendMessage() {

            if (!this.form.mobile || this.form.mobile.length != 11) {

                this.noticeTxt = '请正确填写手机号！'

                this.$refs.alert.open()

                return

            }

            var that = this

            MessageApi.sendMessage({

                mobile: this.form.mobile

            }).then(res => {

                that.timeCount()

            })

        },

        checkForm() {

            if (!this.form.mobile) {

                this.noticeTxt = '请正确填写手机号！'

                this.$refs.alert.open()                 

                return false

            }
            if (!this.form.code) {

                this.noticeTxt = '请正确填写4位验证码！'

                this.$refs.alert.open()  

                return false

            }
            if (!this.form.new_password || this.form.new_password.length < 6) {

                this.noticeTxt = '请正确填写密码，密码必须大于6位！'

                this.$refs.alert.open()  

                return false

            }

            return true

        },

        confirmPassword() {
 
            if (!this.checkForm()) {

                return

            }

            MemberApi.resetPassword(this.form).then(res => {

                if (res.ret == 200) {

                    this.noticeTxt = '密码重置成功，请返回登录！'

                    this.$refs.resetsuccess.open()

                } else if (res.ret == 100005) {

                    this.noticeTxt = '手机号不存在！'

                    this.$refs.alert.open()    

                } else if (res.ret == 200004) {

                    this.noticeTxt = '验证码已失效，请重新获取！'

                    this.$refs.alert.open()    

                }

            })

        },

        toLogin() {

            this.$router.push({ path: '/login' })

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

    }
    
}
</script>

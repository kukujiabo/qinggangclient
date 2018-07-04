<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="用户登录" :back-link="true"></simple-header>
        <page-content>
            <form-list>
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-center">手机号</div>
                        <div class="item-input">
                            <input class="text-center ft75" AUTOCOMPLETE="off" v-model="form.phone" type="text" placeholder="请输入手机号">
                        </div>
                    </div>
                </form-item>
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-center">密码</div>
                        <div class="item-input">
                            <input class="text-center ft75" AUTOCOMPLETE="off" v-model="form.password" type="password" placeholder="请输入密码">
                        </div>
                    </div>
                </form-item>
            </form-list>
            <div class="login-btn">
                <m-button type="warning" @click.native="login()">登录</m-button>
            </div>
            <div class="alter clearfix">
                <div class="fl text-center" style="">
                    <router-link :to="{ path: '/password' }">
                        <span class="ft60 dark1-color">忘记密码</span>
                    </router-link>
                </div>
                <div class="fr text-center">
                    <router-link :to="{ path: '/register' }">
                        <span class="ft60 dark1-color">新用户注册</span>
                    </router-link>
                </div>
            </div>
        </page-content>
        <alert :title="'提示'" :content="noticeTxt"  ref="alert"></alert>
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
import MemberApi from '@/api/member'
import { getToken, setToken } from '@/utils/auth'
import Db from '@/db'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'

export default {

    created() {

        let memberInfo = Db.get('auth')

        if (memberInfo && memberInfo.mobile) {

            this.$router.push({ path: '/' })

        }

    },

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

            form: {

                phone: '',

                password: ''

            }

        }

    },

    methods: {

        login() {

            if (!this.checkForm()) {


                return

            }

            MemberApi.login({

                mobile: this.form.phone,

                password: this.form.password

            }).then(res => {

                if (res.ret == 200) {

                    setToken(res.data.token)

                    Db.set('auth', res.data.auth)

                    this.$router.push({ path: '/', tab: 'about' })

                } else {

                    this.noticeTxt = res.msg

                    this.$refs.alert.open()

                    return

                }

            })

        },

        checkForm() {

            if (!this.form.phone || this.form.phone.length != 11) {

                this.noticeTxt = '请正确填写手机号！'

                this.$refs.alert.open()

                return false

            }
            if (!this.form.password) {

                this.noticeTxt = '请输入密码！'

                this.$refs.alert.open()

                return false

            }

            return true
            
        }

    }
    
}
</script>

<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="支付宝账户" :back-link="true"></simple-header>
        <page-content>
            <div v-if="!account && !loading">
                <div class="notice-box">
                    <img src="http://p4zs4o36y.bkt.clouddn.com/notice-alipay.jpg" style="width:100%">
                </div>
                <form-list>
                    <form-item>
                        <div class="item-content">
                            <div class="item-title label ft75 text-right">真实姓名</div>
                            <div class="item-input">
                                <input class="text-center ft75" v-model="form.real_name" AUTOCOMPLETE="off" type="text" placeholder="请填写真实姓名">
                            </div>
                        </div>
                    </form-item>
                    <form-item>
                        <div class="item-content">
                            <div class="item-title label ft75 text-right">支付宝账号</div>
                            <div class="item-input">
                                <input class="text-center ft75" v-model="form.account" AUTOCOMPLETE="off" type="text" placeholder="请填写支付宝账号">
                            </div>
                        </div>
                    </form-item>
                </form-list>
                <div class="submit-btn">
                    <m-button type="warning" @click.native="saveAccount()" :disabled="forbidSubmit">保存账号</m-button>
                </div>
            </div>
            <div class="container" v-if="account">
                <div class="card-box">
                    <div class="text-center">
                        <img src="http://p4zs4o36y.bkt.clouddn.com/%E6%94%AF%E4%BB%98%E5%AE%9D%E8%AE%A4%E8%AF%81.png" width="64">
                    </div>
                    <p>姓名：{{account.real_name}}</p>
                    <p>账号：{{account.account}}</p>
                </div>
            </div>
            <alert :title="'错误！'" :content="noticeTxt" ref="alert"></alert>
        </page-content>
    </div>
</template>
<style scoped>
    .submit-btn {
        padding: 0px 30px;
    }
    .notice-box {

    }
    .list-title {
        padding: 0;
        margin: 0;
    }
    .list {
        margin: 0;
    }
    .container {
        padding: 18px;
    }
    .card-box {
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 15px #e7e7e7;
    }
</style>

<script>
import AgentApi from '@/api/agent'
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Form, FormItem } from '../components/form'
import { Button, ButtonGroup } from '../components/buttons'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'
import { getToken } from '@/utils/auth'
import AccountApi from '@/api/account'

export default {
    created() {

        this.getAliAccountDetail()

    },
    data() {

        return {

            form: {

                real_name: '',

                account: ''

            },

            account: undefined,

            showForm: true,

            loading: false,

            noticeTxt: '',

            forbidSubmit: false

        }

    },
    components: {
        SimpleHeader,
        'page-content': Content,
        'form-list': Form,
        FormItem,
        'm-button': Button,
        Alert,
        Confirm,
        Modal,
        Prompt
    },
    methods: {

        saveAccount() {

            if (!this.form.real_name) {

                this.noticeTxt = '请正确填写姓名！'

                this.$refs.alert.open()

                return

            }

            if (!this.form.account) {

                this.noticeTxt = '请正确填写账号！'

                this.$refs.alert.open()

                return

            }

            if (this.forbidSubmit) {

                return

            } else {

                this.forbidSubmit = true

            }

            AccountApi.saveAliAccount(this.form).then(res => {

                this.forbidSubmit = false

                if (res.ret == 200 && res.data > 0) {

                    this.getAliAccountDetail()

                }

            })

        },

        getAliAccountDetail() {

            this.loading = true

            AccountApi.getAliAccountDetail({}).then(res => {

                this.loading = false

                if (res.ret == 200 && res.data) {

                    this.account = res.data

                }

            })

        }

    }

}
</script>

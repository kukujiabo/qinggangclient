<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="合伙人申请" ></simple-header>
        <page-content>
            <div class="banner">
                <img :src="banner">
            </div>
            <div class="card-box" v-if="!showForm && loading">
                <div class="card ft75">
                    <p>{{applied.name}} {{applied.phone}}</p>
                    <p>{{applied.identity}}</p>
                    <p>{{applied.city}}</p>
                    <p class="org-color">
                        您的申请已提交，我们会尽快联系您！
                    </p>
                </div>
            </div>
            <form-list v-if="showForm && loading">
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right">真实姓名</div>
                        <div class="item-input">
                            <input class="text-center ft75" v-model="form.name" AUTOCOMPLETE="off" type="text" placeholder="请填写真实姓名">
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
                            <input class="text-center ft75" v-model="form.identity" AUTOCOMPLETE="off" type="text" placeholder="请填写身份证号">
                        </div>
                    </div>
                </form-item>
                <form-item>
                    <div class="item-content">
                        <div class="item-title label ft75 text-right">所在城市</div>
                        <div class="item-input">
                            <input class="text-center ft75" v-model="form.city" AUTOCOMPLETE="off" type="text" placeholder="请填写城市">
                        </div>
                    </div>
                </form-item>
            </form-list>
            <div class="submit-btn" v-if="showForm">
                <m-button type="warning" @click.native="apply()">提交申请</m-button>
            </div>
            <div class="ft60 dark1-color tips bold">

            </div>
            <div style="height:70px">
            </div>
        </page-content>
        <alert :title="'提示'" :content="noticeTxt"  ref="alert"></alert>
    </div>
</template>

<style scoped>
    .banner img {
        width: 100%;
    }
    .submit-btn {
        padding: 0px 30px;
    }
    .card-box {
        padding: 12px;
    }
    .card-box .card {
        padding: 18px;
        background: #f3f5f7;
        border-radius: 5px;
    }
</style>


<script>
import AgentApi from '@/api/agent'
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Form, FormItem } from '../components/form'
import { Button, ButtonGroup } from '../components/buttons'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'
import { getToken, getAuth } from '@/utils/auth'

export default {
    created() {

        this.getDetail()

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
    data() {

        return {

            banner: 'http://p7vsax0lb.bkt.clouddn.com/chengxinhaibao.jpg',

            noticeTxt: '',

            loading: false,

            showForm: false,

            form: {

                name: '',
                phone: '',
                city: '',
                identity: ''

            },

            applyed: {

                name: '',
                phone: '',
                city: '',
                identity: ''

            }
            
        }

    },
    methods: {

        apply() {

            if (!this.checkForm()) {

                return

            }

            AgentApi.apply(this.form).then(res => {

                if (res.ret == 200 && res.data > 0) {

                    this.noticeTxt = '提交成功，我们会在2个工作日内与您联系！'

                    this.$refs.alert.open()

                    this.getDetail()

                }

            })

        },

        getDetail() {

            AgentApi.getApplied({}).then(res => {

                if (res.ret == 200 && res.data) {

                    this.applied = res.data

                    this.showForm = false

                    
                } else {

                    this.showForm = true

                }

                this.loading = true

            })

        },

        checkForm() {

            if (!this.form.phone || this.form.phone.length != 11) {

                this.noticeTxt = '请正确填写手机号！'

                this.$refs.alert.open()

                return

            }
            if (!this.form.name) {

                this.noticeTxt = '请填写姓名！'

                this.$refs.alert.open()

                return

            }
            if (!this.form.city) {

                this.noticeTxt = '请填写城市！'

                this.$refs.alert.open()

                return

            }
            if (!this.form.identity || this.form.identity < 6) {

                this.noticeTxt = '身份证号必须填写！'

                this.$refs.alert.open()

                return

            }

            return true

        }
        
    }
}
</script>

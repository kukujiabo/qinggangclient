<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="我的收益" :back-link="true"></simple-header>
        <page-content>
            <div class="card-box tc">
                <div class="reward-info text-center">
                    <h5>可提现金额（元）</h5>
                    <h1 class="org-color">¥ {{account.rest ? account.rest : 0}}</h1>
                </div>
                <div style="height:8px;"></div>
                <m-button type="bg-org" @click.native="showConfirm">立即提现</m-button>
                <list>
                    <div slot="title">余额变动记录</div>
                    <list-item v-for="reward in rewards" :key="reward.id">
                        <div class="item-content">
                            <div class="item-title-row">
                                <div class="item-title org-color" v-if="reward.change_type == 1">收入：¥ {{reward.money}} </div>
                                <div class="item-title" v-if="reward.change_type == 0">提现：¥ {{reward.money}} ({{reward.state == 0 ? '审核中' : '已放款'}})</div>
                                <div class="item-after ft65" v-if="reward.relat_type == 1">信用卡佣金</div>
                                <div class="item-after ft65" v-if="reward.relat_type == 2">贷款佣金</div>
                                <div class="item-after ft65" v-if="reward.relat_type == 3">提现</div>
                            </div>
                            <div class="item-subtitle">
                                {{reward.created_at}}
                            </div>
                        </div>
                    </list-item> 
                </list>
            </div>
        </page-content>
        <alert :title="'提示'" :content="noticeTxt"  ref="alert"></alert>
        <confirm :title="'提示'" :content="confirmTxt" :on-ok="withdrawApply" ref="confirm"></confirm>
    </div> 
</template>
<style scoped>
    .card-box {
        padding: 16px 16px 6px 16px;
    }
    .reward-info {
        background: #f3f5f7;
        padding: 8px;
    }
</style>

<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Button, ButtonGroup } from '../components/buttons'
import { Form, FormItem } from '../components/form'
import { List, ListItem } from '../components/list'
import MemberTurnApi from '@/api/memberTurn'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'
import AccountApi from '@/api/account'

export default {

    components: {
        SimpleHeader,
        'page-content': Content,
        ButtonGroup,
        'm-button': Button,
        List,
        ListItem,
        Alert,
        Confirm,
        Modal,
        Prompt
    },
    created() {

        this.getAccountDetail()

        this.getRewardsList()

    },
    data() {
        
        return {

            account: { },

            rewards: [],

            available: 0,

            noticeTxt: '',

            confirmTxt: '',

            listQuery: {

                page: 1,
                page_size: 20

            }

        }

    },
    methods: {

        getAccountDetail() {

            AccountApi.getDetail({}).then(res => {

                if (res.ret == 200 && res.data) {

                    this.account = res.data

                }

            })

        },

        getRewardsList() {

            AccountApi.getLogList(this.listQuery).then(res => {

                if (res.ret == 200) {

                    this.rewards = res.data.list

                    this.listQuery.page = res.data.page

                }

            })

        },

        showConfirm() {

            if (this.account.rest == 0) {

                this.noticeTxt = '可提现余额不足！'

                this.$refs.alert.open()

                return           

            } else {

                this.confirmTxt = '确认提现：¥' + this.account.rest + '？'

                this.$refs.confirm.open()

            }

        },


        getCash() {

            if (!this.account.rest) {

                this.noticeTxt = '可提现余额不足！'

                this.$refs.alert.open()

                return false

            }

            return true

        },

        withdrawApply() {

            if (this.getCash()) {

                AccountApi.cashApply({

                    cash: this.account.rest

                }).then(res => {

                    if (res.ret == 200 && res.data > 0) {

                        this.getAccountDetail()

                        this.getRewardsList()

                        this.noticeTxt = '申请成功，请等待审核！'

                        this.$refs.alert.open()

                    } else {

                        this.noticeTxt = '系统错误，请拨打客服电话！'

                        this.$refs.alert.open()

                    }

                })

            }

        }

    }

}
</script>

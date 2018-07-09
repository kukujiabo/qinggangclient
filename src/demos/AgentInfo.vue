<template>
  <div class="page" style="background:#f3f5f7;">
    <div class="tabs">
        <div class="text-center ft75" style="border-right:1px solid #f3f5f7" @click="switchTab(1)">
            <span v-bind:class="{ 'org-color' : tab == 1 }">合伙人</span>
        </div>
        <div class="text-center ft75" style="border-right:1px solid #f3f5f7" @click="switchTab(2)">
            <span v-bind:class="{ 'org-color' : tab == 2 }">信用卡</span>
        </div>
        <div class="text-center ft75" @click="switchTab(3)">
            <span v-bind:class="{ 'org-color' : tab == 3 }">小额贷</span>
        </div>
    </div>
    <div class="tab-item" v-show="tab == 1">
      <div class="search">
        <input type="text" class="text-center ft75" placeholder="输入代理名称查询..." v-model="listQueryPartner.member_name">
        <button class="ft65">查询</button>
      </div>
      <scroll :on-refresh="onSubagentRefresh" :on-infinite="onSubagentInfinite" :enableInfinite="subs.length >= 8">
        <div class='content-padded' v-for="sub in subs" :key="sub.id">
            <div class="partner-item" >
                <div class="clearfix partner-top">
                    <p class="ft65 fl">办理时间：{{sub.created_at}}</p>
                   <!--  <span  class="ft65 org-color fr" @click="toDetail(sub)">查看详情</span> -->
                </div>
                <div class="title-divide"></div>
                <div>
                    <div class="agent-info ft75">
                        <span class="fl over-elips" style="max-width:6rem">{{sub.member_name}}</span>
                        <span class="fl">&nbsp;&nbsp;|&nbsp;&nbsp;</span>
                        <span class="fl">{{sub.mobile}}</span>
                        <span class="fr" v-if="sub.member_type == 2">二级代理</span>
                        <span class="fr" v-if="sub.member_type == 1">普通客户</span>
                        <div style="clear:both"></div>
                    </div>
                </div>
                <div>
                    <div class="grid-wrapper">
                        <div class="grids text-center partner-count">
                            <div class="grid ft75">
                                <p class="bold">{{sub.sub_count}}</p>
                                <p class="ft65 grid_label">客户数</p>
                            </div>
                            <div class="grid ft75">
                                <p class="bold">{{sub.card_apply_num}}</p>
                                <p class="ft65 grid_label">卡进件数</p>
                            </div>
                            <div class="grid ft75">
                                <p class="bold">{{sub.loan_apply_num}}</p>
                                <p class="ft65 grid_label">贷进件数</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </scroll>
      <div style="height:80px"></div>
    </div>
    <div class="tab-item"  v-show="tab == 2">
      <div class="search">
        <input type="text" class="text-center ft75" placeholder="输入办理人名称查询..." v-model="listQueryCard.name">
        <button class="ft65">查询</button>
      </div>
      <scroll :on-refresh="onCardRefresh" :on-infinite="onCardInfinite" :enableInfinite="cards.length >= 8">
            <div class='content-padded' >
                <div class="partner-item" v-for="card in cards" :key="card.id">
                    <div>
                        <p class="ft75 bold fl" style="margin: 6px 0">{{card.shop_name}}</p>
                        <p class="ft75 bold fr" style="margin: 6px 0" v-if="card.reference_name">推荐人：{{card.reference_name}}</p>
                        <div style="clear:both"></div>
                    </div>
                    <div class="title-divide"></div>
                    <div>
                        <div class="agent-info ft75">
                            <span class="fl">{{card.contact}}</span>
                            <span class="fl">（{{card.phone}}）</span>
                            <span class="fr org-color" v-if="card.state == 0">审核中</span>
                            <span class="fr grn-color" v-if="card.state == 1">通过</span>
                            <span class="fr red-color" v-if="card.state == 2">拒绝</span>
                            <div style="clear:both"></div>
                        </div>
                    </div>
                    <div>
                        <div class="agent-info ft65">
                            <span class="fl">{{card.created_at}}</span>
                            <div style="clear:both"></div>
                        </div>
                    </div>
                </div>
            </div>
      </scroll>
    </div>
    <div class="tab-item"  v-show="tab == 3">
      <div class="search">
        <input type="text" class="text-center ft75" placeholder="输入申请人名称查询..." v-model="listQueryLoan.name">
        <button class="ft65">查询</button>
      </div>
      <scroll :on-refresh="onLoanRefresh" :on-infinite="onLoanInfinite" :enableInfinite="loans.length > 8">
        <div class='content-padded'>
            <div class="partner-item" v-for="loan in loans" :key="loan.id">
                <div>
                    <p class="ft75 bold fl" style="margin: 6px 0">{{loan.loan_name}}</p>
                    <p class="ft75 bold fr" style="margin: 6px 0" v-if="loan.reference_name">推荐人：{{loan.reference_name}}</p>
                    <div style="clear:both"></div>
                </div>
                <div class="title-divide"></div>
                <div>
                    <div class="agent-info ft75">
                        <span class="fl">{{loan.contact}}</span>
                        <span class="fl">（{{loan.phone}}）</span>
                         <span class="fr org-color">审核中</span>
                        <div style="clear:both"></div>
                    </div>
                </div>
                <div>
                    <div class="agent-info ft65">
                        <span class="fl">{{loan.created_at}}</span>
                        <div style="clear:both"></div>
                    </div>
                </div>
            </div>
        </div>
      </scroll>
    </div>
    <preloader ref="preloader"></preloader>
  </div>  
</template>

<style scoped>
    .tabs {
        height: 45px;
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        z-index: 1000;
        line-height: 45px;
        border-bottom: 1px solid #f3f5f7;
    }
    .scroll {
        bottom: 56px;
    }
    .grid_icon {
        height: 18px;
    }
    .agent-info span {
        padding: 6px 0px 4px 0;
    }

    .title-divide {
        width: 100%;
        background:#f0f0f0;
        height: 1px;
    }
    .content-padded {

    }
    .tabs div {
        display: inline-block;
        width: 33%;
        float: left;
    }
    clearfix::after {
        content:".";
        display:block;
        height:0;
        visibility:hidden;
        clear:both;
    }
    .tab-item {
        left: 0;
        right: 0;
        top: 42px;
        bottom: 0;
        position: absolute;
    }

    .partner-item {
        background: #fff;
        border-radius: 5px;
        padding: 6px;
        margin: 5px 0;
    }

    .partner-top p {
        margin: 8px 0
    }
    .partner-top span {
        margin: 8px 0
    }
    .tabs:nth-child(0) {
        border-right: 1px solid #f3f4f7;
    }

    .tabs:nth-child(1) {
        border-right: 1px solid #f3f4f7;
    }

    .grid {
        padding: 3px 10px;
    }

    .clearfix::after {
        content:".";
        display:block;
        height:0;
        visibility:hidden;
        clear:both;
    }
    .partner-count p {
        margin: 3px 0
    }
    .search {
        position: absolute;
        z-index: 1001;
        top: 0;
        left: 0;
        right: 0;
        background: #f3f5f7;
        height: 50px;
        padding: .5rem;
    }
    .search input {
        width:100%;
        background: #fff;
        border: 1px solid #e7e7e7;
        border-radius: 3px;
        height: 1.8rem;
        outline: none;
        border: 0;
    }
    .search button {
        padding: 5px;
        border-radius: 3px;
        position: absolute;
        right: .7rem;
        top: .65rem;
        background: #2c2c2c;
        color: #fff;
        border: 0;
    }
</style>


<script>
import { SimpleHeader } from '../components/header'
import { Partner } from './Partner'
import Scroll from '../components/scroll'
import Grid from '../components/grid'
import MemberApi from '@/api/member'
import Preloader from '../components/preloader'
import Toast from '../components/toast'
import Db from '@/db'

export default {

    components: {
        SimpleHeader,
        Grid,
        Scroll,
        Preloader,
        Toast
    },

    created() {

        this.$nextTick(() => {

            this.showPreloader()
                
        })

        this.getPartnerList(this.listQueryPartner)

        this.getReferenceCards(this.listQueryCard)

        this.getReferenceLoans(this.listQueryLoan)

        this.auth = Db.get('auth')

    },

    data() {

        return {
            auth: {},
            tab: 1,
            onInfinite: true,
            subs: [],
            cards: [],
            loans: [],
            show: false,
            listQueryPartner: {
                member_name: '',
                page: 1,
                page_size: 10,
                order: ''
            },
            listQueryCard: {
                name: '',
                page: 1,
                page_size: 10,
                order: ''
            },
            listQueryLoan: {
                name: '',
                page: 1,
                page_size: 10,
                order: ''
            }

        }

    },

    methods: {

        switchTab(value) {

            this.tab = value

        },
        
        toDetail(row) {

            this.$router.push({ path: '/partnerDetail', query: { id: row.id } })

        },

        getPartnerList(params, done) {

            let query = {}

            for(var k in params) {

                if (params[k] != '') {

                    query[k] = params[k]

                }

            }

            MemberApi.getReferenceList(query).then(res => {

                if (typeof done === 'function') {

                    done()

                }

                this.hidePreloader()

                if (res.ret == 200) {

                    if (res.data.page < query.page ) {

                        this.listQueryPartner.page = res.data.page

                    }  else {

                        res.data.list.forEach(element => {
                            
                            this.subs.push(element)

                        })

                    }

                }

            })

        },

        showPreloader () {

            this.$refs.preloader.open()

        },

        hidePreloader() {

            this.$refs.preloader.close()

        },

        getReferenceCards(params, done) {

            let query = {}

            for(var k in params) {

                if (params[k] != '') {

                    query[k] = params[k]

                }

            }

            MemberApi.getReferenceCards(query).then(res => {

                if (typeof done === 'function') {

                    done()

                }

                if (res.ret == 200) {

                    if (res.data.page < query.page) {

                        this.listQueryCard.page = res.data.page

                    } else {

                        res.data.list.forEach(card => {

                            this.cards.push(card)

                        })

                    }

                }

            })

        },

        getReferenceLoans(params, done) {

            let query = {}

            for(var k in params) {

                if (params[k] != '') {

                    query[k] = params[k]

                }

            }

            MemberApi.getReferenceLoans(query).then(res => {


                if (typeof done === 'function') {

                    done()

                }

                if (res.ret == 200) {

                    if (res.data.page < query.page) {

                        this.listQueryCard.page = res.data.page

                    } else {

                        res.data.list.forEach(element => {

                            this.loans.push(element)

                        })

                    }

                }

            })

        },

        /**
         * 刷新合伙人列表
         */
        onSubagentRefresh(done) {

            this.listQueryPartner.page = 1

            this.subs = []

            this.getPartnerList(this.listQueryPartner, done)

        },

        /**
         * 加载更多合伙人
         */
        onSubagentInfinite(done) {

            this.listQueryPartner.page += 1

            this.getPartnerList(this.listQueryPartner, done)

        },

        /**
         * 刷新办理的信用卡列表
         */
        onCardRefresh(done) {

            this.listQueryCard.page = 1

            this.cards = []

            this.getReferenceCards(this.listQueryCard, done)

        },

        /**
         * 加载更多信用卡
         */
        onCardInfinite(done) {

            this.listQueryCard.page += 1

            this.getReferenceCards(this.listQueryCard, done)

        },

        /**
         * 刷新办理的贷款列表
         */
        onLoanRefresh(done) {

            this.listQueryLoan.page = 1

            this.loans = []

            this.getReferenceLoans(this.listQueryLoan, done)

        },

        /**
         * 加载更多贷款
         */
        onLoanInfinite(done) {

            this.listQueryLoan.page +=1 

            this.getReferenceLoans(this.listQueryLoan, done)

        }

    }

}
</script>

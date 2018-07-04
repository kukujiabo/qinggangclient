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
      <scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="false">
        <div class='content-padded' v-for="sub in subs" :key="sub.id">
            <div class="partner-item" >
                <div class="clearfix partner-top">
                    <p class="ft65 fl">办理时间：{{sub.created_at}}</p>
                    <span  class="ft65 org-color fr" @click="toDetail(sub)">查看详情</span>
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
                        <div class="grids text-center">
                            <div class="grid ft60">
                                <p class="grid_label">客户数：{{sub.sub_count}}</p>
                            </div>
                            <div class="grid ft60">
                                <p class="grid_label">卡进件数：{{sub.card_apply_num}}</p>
                            </div>
                            <div class="grid ft60">
                                <p class="grid_label">贷进件数：{{sub.loan_apply_num}}</p>
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
      <scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="false">
            <div class='content-padded' >
                <div class="partner-item" v-for="card in cards" :key="card.id">
                    <p class="ft75">{{card.shop_name}}</p>
                    <div class="title-divide"></div>
                    <div>
                        <div class="agent-info ft75">
                            <span class="fl">{{card.contact}}</span>
                            <span class="fl"> | </span>
                            <span class="fl">{{card.phone}}</span>
                            
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
      <scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="false">
        <div class='content-padded'>
            <div class="partner-item" v-for="loan in loans" :key="loan.id">
                <p class="ft75">{{loan.loan_name}}</p>
                <div class="title-divide"></div>
                <div>
                    <div class="agent-info ft75">
                        <span class="fl">{{loan.contact}}</span>
                        <span class="fl"> | </span>
                        <span class="fl">{{loan.phone}}</span>
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
        top: 45px;
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

</style>


<script>
import { SimpleHeader } from '../components/header'
import { Partner } from './Partner'
import Scroll from '../components/scroll'
import Grid from '../components/grid'
import MemberApi from '@/api/member'
import Preloader from '../components/preloader'

export default {

    components: {
        SimpleHeader,
        Grid,
        Scroll,
        Preloader
    },

    created() {

        this.getPartnerList()

        this.getReferenceCards()

        this.getReferenceLoans()

    },

    data() {

        return {

            tab: 1,
            onInfinite: true,
            subs: [],
            cards: [],
            loans: [],
            show: false

        }

    },

    methods: {

        switchTab(value) {

            this.tab = value

        },
        
        toDetail(row) {

            this.$router.push({ path: '/partnerDetail', query: { id: row.id } })

        },

        getPartnerList() {

            this.$nextTick(() => {

                this.showPreloader()
                
            })

            MemberApi.getReferenceList({

                page: 1, page_size: 100

            }).then(res => {

                this.hidePreloader()

                if (res.ret == 200) {

                    this.subs = res.data.list

                }

            })

        },

        showPreloader () {

            this.$refs.preloader.open()

        },

        hidePreloader() {

            this.$refs.preloader.close()

        },

        getReferenceCards() {

            MemberApi.getReferenceCards({

                page: 1, page_size: 100

            }).then(res => {

                if (res.ret == 200) {

                    this.cards = res.data.list

                }

            })

        },

        getReferenceLoans() {

            MemberApi.getReferenceLoans({

                page: 1, page_size: 100

            }).then(res => {

                if (res.ret == 200) {

                    this.loans = res.data.list

                }

            })

        }

    }

}
</script>

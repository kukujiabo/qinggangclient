<template>
    <div class="app-wrapper">
        <div class="tabs">
            <div class="text-center ft75 bold" style="border-right:1px solid #f3f5f7" @click="switchTab(1)">
                <span v-bind:class="{ 'org-color' : tab == 1 }">产 品</span>
            </div>
            <div class="text-center ft75 bold" @click="switchTab(2)">
                <span v-bind:class="{ 'org-color' : tab == 2 }">收 益</span>
            </div>
        </div>
        <div class="tab-item"  v-show="tab == 1">
            <div class="search">
                <div class="search-item">
                    <el-input placeholder="请输入内容" v-model="searchText" class="input-with-select ">
                        <el-button slot="append" icon="el-icon-search" type="infor" @click="handleSearch"></el-button>
                    </el-input>
                </div>
                <div class="search-item">
                    <div class="product-type">
                        <button class="ft75" v-bind:class="{ 'active' : pType == 1 }" type="light" @click="switchProduct(1)">贷款</button>
                        <button class="ft75" v-bind:class="{ 'active' : pType == 2 }" type="light" @click="switchProduct(2)">信用卡</button>
                    </div>
                </div>
                <div class="search-item">
                    <div class="ft70">
                        <el-checkbox v-model="loanSign.credit">额度高</el-checkbox>
                        <el-checkbox v-model="loanSign.audit_speed">审批快</el-checkbox>
                        <el-checkbox v-model="loanSign.interest">利息低</el-checkbox>
                        <el-checkbox v-model="loanSign.requires">要求低</el-checkbox>
                    </div>
                </div>
            </div>
            <div v-if="pType == 1">
                <div class="grids">
                    <router-link :to="{ path: 'productLoanDetail', query: { id: loan.id } }" class="grid" v-for="loan in loans" :key="loan.id">
                        <div class="grid_icon">
                            <img :src="loan.thumbnail" alt="">
                        </div>
                        <p class="grid_label ft65 dark1-color">
                            {{loan.reward_name}}
                        </p>
                    </router-link>
                </div>
            </div>
            <div v-if="pType == 2">
                <div class="grids">
                    <a href="javascript:;" class="grid" v-for="card in cards" :key="card.id">
                        <div class="grid_icon credit_card">
                            <img :src="card.thumbnail" alt="">
                        </div>
                        <p class="grid_label ft65 dark1-color">
                            {{card.shop_name}}
                        </p>
                    </a>
                </div>
            </div>
        </div>
        <div class="tab-item"  v-show="tab == 2">
            <div class="search">

            </div>
        </div>
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
    .grid_label {
        margin: 8px 0
    }
    .search-input {
        width: 80%;
        height: 2rem;
        line-height: 2rem;
        background: #fff;
        border-radius: 6px;
        border:0;
        outline: none;
        text-align: center;
    }
    .scroll {
        bottom: 56px;
    }
    .grid_icon {
        height: 50px;
        width: 50px;

    }
    .grid_icon img {
        border-radius: 25px;
        border: 1px solid #e7e7e7;
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
        width: 50%;
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
    .partner-count p {
        margin: 3px 0
    }
    .search {
        margin: 10px;
        border-radius: 6px;
        padding: 8px 12px;
        background: #f3f5f7;
    }
    .search-item {
        margin: 8px 0;
    }
    .do-search {
        border-radius: 5px;
        color: #fff;
        border: 0;
        background: #f60;
        height: 2rem;
        width: 18%;
    }
    .product-type button {
        width: 49%;
        height: 1.8rem;
        border-radius: 5px;
        background: #fff;
        border: 1px solid #e7e7e7;
        outline: none;
    }
    .product-type .active {
        background: #f60;
        color: #fff;
    }
    .credit_card {
        width: 58px;
        height: 45px;
    }
    .credit_card img {
        width: 58px;
        height: 40px;
        border-radius: 0;
        border: 0;
    }
    .el-checkbox+.el-checkbox {
        margin-left: 9px;
    }
</style>


<script>
import { Button, ButtonGroup } from '../components/buttons'
import Grid from '../components/grid'
import LoanApi from '@/api/reward'
import CreditApi from '@/api/credit'

export default {
    components: {
        ButtonGroup,
        'm-button': Button,
        Grid
    },
    created() {

        this.getLoanList(this.listQueryLoan)

        this.getCardList(this.listQueryCard)

    },
    data() {

        return {

            searchText: '',

            tab: 1,

            pType: 1,

            loans: '',

            listQueryLoan: {
                reward_name: '',
                page: 1,
                page_size: 12
            },

            listQueryCard: {
                shop_name: '',
                page: 1,
                page_size: 12             
            },

            loanSign: {
                credit: 0,
                interest: 0,
                audit_speed: 0,
                requires: 0
            }

        }

    },
    methods: {

        handleSearch() {



        },

        getLoanList(params) {

            let query = {}

            for(var key in params) {

                if (params[key] != '') {

                    query[key] = params[key]

                }

            }

            LoanApi.getList(query).then(res => {

                if (res.ret == 200) {

                    this.loans = res.data.list

                }

                this.listQueryLoan.page = res.data.page

            })

        },

        getCardList(params) {

            let query = {}

            for(var key in params) {

                if (params[key] != '') {

                    query[key] = params[key]

                }

            }

            CreditApi.queryList(query).then(res => {

                if (res.ret == 200) {

                    this.cards = res.data.list

                }

                this.listQueryCard.page = res.data.page

            })

        },

        switchTab(value) {

            this.tab = value

        },

        switchProduct(pType) {

            this.pType = pType

        }

    }

}
</script>

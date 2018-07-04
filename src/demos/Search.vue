<template>
  <div class="my-page">
    <simple-header title="信用卡" class="bg-org wt-color"></simple-header>
    <page-content>
      <div class="slide-wrapper">
        <div class="grids grids-small">
          <a href="javascript:;" class="grid">
            <p class="grid_label" @click="sldeMenu(1)">
              选择银行
            </p>
          </a>
        </div>
      </div>
      <list>
          <list-item v-for="card in creditCards" :key="card.id">
            <div class="item-media" @click="toDetail(card.id)">
              <img :src="card.thumbnail" width="95">
            </div>
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title ft75 va-mid" @click="toDetail(card.id)">{{card.shop_name}} 
                  <span class="org-color ft65" v-if="auth && auth.member_type == 2">（佣金：¥ {{card.sub_reward}}）</span>
                  <span class="org-color ft65" v-if="auth && auth.member_type == 3">（佣金：¥ {{parseInt(card.senior_reward) + parseInt(card.sub_reward)}}）</span>
                </div>
                <div class="item-after va-mid">
                  <div>
                    <img class="va-mid" src="../assets/images/qr_code_light.png" width="24" @click="toCardQrcode(card)">
                  </div>
                </div>
              </div>
              <div class="item-title-row">           
                <div class="item-text ft60 brief" @click="toDetail(card.id)">{{card.brief}}</div>
                <div>
                  <m-button width="55" class="ft60 button-tiny" size="small" type="warning" @click.native="toDetail(card.id)">申请</m-button>
                </div>
              </div>
              <div class="item-title-row" style="line-height: 28px; " @click="toDetail(card.id)"> 
                <div class="item-text ft60 dark1-color">平均额度：¥ {{card.av_credit}}  |  下卡人数：{{card.people_num}}</div>
              </div>
              <div class="item-title-row"> 
                <span class="tag tag-red" v-if="auth && auth.member_type > 1 && card.account_date == 2">每周结算</span>
              </div>
            </div>
          </list-item>
      </list>
    </page-content>

    <!-- 侧边栏 -->

    <side-panel :show="show" ref="s">
      <h4 class="text-center">{{menuTitle}}</h4>
      <list>
        <list-item :link="true" v-for="item in banks" :key="item.id">
          <div class="item-media">
            <!-- <img src="../assets/images/icon-list.png" width="30"> -->
          </div>
          <div class="item-content" @click="chooseItem(item)">
            <div class="item-title-row">
              <div class="item-title ft75">{{item.mname}}</div>
              <div class="item-after"></div>
            </div>
          </div>
        </list-item>
      </list>
      <div class="content-padded">
        <m-button type="warning" @click.native="$refs.s.close()">关闭</m-button>
      </div>
    </side-panel>
  </div>
</template>

<style scoped>
 .item-content > div {
   padding: 2px 0;
 }
 .slide-wrapper {
   padding: 0
 }
 .grid_label {
   margin: 0
 }
 .list {
   margin-top: 0
 }
 .brief {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow:ellipsis;
    width: 72%;
 }
</style>


<script>
import Grid from '../components/grid'
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { List, ListItem } from '../components/list'
import { Button, ButtonGroup } from '../components/buttons'
import { Tab, TabItem } from '../components/tab'
import SidePanel from '../components/side-panel'
import Icon from '../components/icons'
import CreditApi from '@/api/credit'
import BankApi from '@/api/bank'
import Db from '@/db'

export default {
  created() {

    this.auth = Db.get('auth')

    this.getCreditList(this.listQuery)

    this.getBankList({})

  },
  components: {
    SimpleHeader,
    'page-content': Content,
    List,
    ListItem,
    ButtonGroup,
    'm-button': Button,
    Tab,
    SidePanel,
    TabItem,
    Grid,
    Icon
  },
  data() {

    return {

      show: false,

      menuTitle: '选择银行',

      auth: {},

      listQuery: {

        mid: '',
        page: 1,
        page_size: 10

      },

      banks: [

      ],

      creditCards: []

    }

  },
  methods: {

    toCardQrcode(card) {

      let url = 'http://qinggang.xinxingtianxia.com/cardDetail?id=' + card.id

      this.$router.push({ path: '/qrcode', query: { url: url } })

    },

    getBankList(params) {

      BankApi.getAll(params).then(res => {

        if (res.ret == 200) {

          this.banks = res.data

        }

      })

    },

    sldeMenu(tab) {

      this.$refs.s.open()

    },

    getCreditList(params) {

      var query = {}

      for(var key in params) {

        if (params[key] != '') {

          query[key] = params[key]

        }

      }

      CreditApi.queryList(query).then(res => {

        if (res.ret == 200) {

          this.creditCards = res.data.list

          this.creditCards.forEach(card => {

            card.av_credit = (parseInt(card.ext_1) + parseInt(card.ext_2))/2

          })

          this.listQuery.page = res.data.page

        }

      })

    },

    chooseItem(item) {

      this.listQuery.mid = item.id

      this.getCreditList(this.listQuery)

      this.$refs.s.close()

    },

    toDetail(id) {

      this.$router.push({ path: '/cardDetail', query: {id: id } })

    }

  }
}
</script>

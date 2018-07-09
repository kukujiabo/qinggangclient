<template>
  <div class="my-page" >
    <page-content>

      <!-- 轮播图 -->
      <slide-wrapper>
        <slide>
            <img src="http://p7vsax0lb.bkt.clouddn.com/WechatIMG560.jpeg" @click="toDetail(7)"/>
        </slide>
        <slide>
            <img src="http://p4zs4o36y.bkt.clouddn.com/Fg_a2YkLx8tUpXRKfQb-QjkwK2aK" @click="toDetail(1)"/>
        </slide>
        <slide>
            <img src="http://p4zs4o36y.bkt.clouddn.com/FkHomMeXXmlPRluSCsqMabE4BxpJ" @click="toDetail(2)"/>
        </slide>
        <slide>
            <img src="http://p4zs4o36y.bkt.clouddn.com/WechatIMG258.jpeg" @click="toDetail(3)"/>
        </slide>
        <slide>
            <img src="http://p4zs4o36y.bkt.clouddn.com/%E4%BF%A1%E7%94%A8%E5%8D%A1.jpg"  @click="toDetail(4)"/>
        </slide>

      </slide-wrapper>
      <div class="grid-wrapper">
        <div class="grids grids-small">
          <div class="grid" @click="switchTab(1)">
            <div class="grid_icon" >
              <img src="../assets/images/credit.png" alt="">
            </div>
            <p class="grid_label">
              信用卡
            </p>
          </div>
          <div class="grid" @click="switchTab(2)">
            <div class="grid_icon">
              <img src="../assets/images/loan.png" alt="">
            </div>
            <p class="grid_label">
              贷款
            </p>
          </div>
          <div class="grid" @click="toProcess()">
            <div class="grid_icon">
              <img src="../assets/images/process.png" alt="">
            </div>
            <p class="grid_label">
              进度查询
            </p>
          </div>
          <div class="grid"  @click="toQrcode()">
            <div class="grid_icon">
              <img src="../assets/images/sales_code.png" alt="">
            </div>
            <p class="grid_label">
              推广码
            </p>
          </div>
        </div>
      </div>

      <!-- 首页信用卡列表 -->
      <h5 class="section-header" v-if="creditCards.length > 0"> <span class="org-color va-mid">|</span>&nbsp;&nbsp;<span class="va-mid dark1-color">推荐信用卡</span></h5>
      <list>
        <list-item  v-for="card in creditCards" :key="card.id">
          <div class="item-media">
            <img class="va-mid" :src="card.thumbnail" width=85>
          </div>
          <div class="item-content">
            <div class="item-title-row">
              <div class="item-title ft75 va-mid">{{card.shop_name}}
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
              <div class="item-text ft60 brief">{{card.brief}}</div>
              <div>
                <m-button width="55" class="ft60 button-tiny" size="small" type="warning" @click.native="toCardDetail(card)">申请</m-button>
              </div>
            </div>
            <div class="item-title-row">
              <span class="tag tag-red" v-if="auth && auth.member_type > 1 && card.account_date == 2">每周结算</span>
             </div>
          </div>
        </list-item>
      </list>

      <!-- 首页贷款列表 -->
      <h5 class="section-header" v-if="loans.length > 0"> <span class="org-color va-mid">|</span>&nbsp;&nbsp;<span class="va-mid dark1-color">优质贷款</span></h5>
      <list>
          <list-item v-for="loan in loans" :key="loan.id" @click.native="toLoanDetail(loan)">
            <div class="item-media">
              <img class="loan-head" :src="loan.thumbnail" width="75">
            </div>
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title ft75">{{loan.reward_name}} <span class="org-color ft65" v-if="auth && auth.member_type == 2">(佣金：{{loan.reward_type == 1 ? loan.sub_reward + '%' : loan.sub_reward + '元'}})</span><span  class="org-color ft65" v-if="auth && auth.member_type == 3">(佣金：{{loan.reward_type == 1 ? (parseFloat(loan.senior_reward) + parseFloat(loan.sub_reward)) + '%' : (parseFloat(loan.senior_reward) + parseFloat(loan.sub_reward)) + '元'}})</span></div>
                <div class="item-after">
                  <div>
                    <img class="va-mid" src="../assets/images/qr_code_light.png" width="24" @click="toLoanQrcode(loan)">
                  </div>
                </div>
              </div>
              <div class="item-title-row">
                <div class="loan-basic">
                  <div class="item-text ft60">
                    最高可贷： {{loan.max_credit}}
                  </div>
                  <div class="item-text ft60">
                    按月利率：{{loan.rate}}%
                  </div>
                  <div class="item-text ft60">
                    贷款期限：{{loan.limit}}
                  </div>
                  <div class="item-text ft60  org-color">
                    结算条件：{{auditTypes[loan.audit_type - 1]}}
                  </div>
                </div>
                <div class="loan-ad text-right">
                  <span class="tag tag-yellow" v-if="auth && auth.member_type > 1 && loan.account_date == 1">每日结算</span>
                  <span class="tag tag-red" v-if="auth && auth.member_type > 1 && loan.account_date == 2">每周结算</span>
                </div>
              </div>
            </div>
          </list-item>
      </list>

    <!--

      <header class='demos-header'>
        <h1 class="demos-title">CSS</h1>
      </header>
      <div class="grids grids-small">
        <router-link :to="{ path: 'page' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/page.png" alt="">
          </div>
          <p class="grid_label">
            Page
          </p>
        </router-link>
        <router-link :to="{ path: 'buttons' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/button.png" alt="">
          </div>
          <p class="grid_label">
            Button
          </p>
        </router-link>
        <router-link :to="{ path: 'column' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/column.png" alt="">
          </div>
          <p class="grid_label">
            Column
          </p>
        </router-link>
        <router-link :to="{ path: 'grid' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/grid.png" alt="">
          </div>
          <p class="grid_label">
            Grid
          </p>
        </router-link>
        <router-link :to="{ path: '/list' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/list.png" alt="">
          </div>
          <p class="grid_label">
            List
          </p>
        </router-link>
        <router-link :to="{ path: '/contacts' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/contacts.png" alt="">
          </div>
          <p class="grid_label">
            Contacts
          </p>
        </router-link>
        <router-link :to="{ path: '/form' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/form.png" alt="">
          </div>
          <p class="grid_label">
            Form
          </p>
        </router-link>
        <router-link :to="{ name: 'icons' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/toast.png" alt="">
          </div>
          <p class="grid_label">
            Icons
          </p>
        </router-link>
        <router-link :to="{ name: 'result' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/result.png" alt="">
          </div>
          <p class="grid_label">
            Result
          </p>
        </router-link>
        <router-link :to="{ name: 'stars' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/star.png" alt="">
          </div>
          <p class="grid_label">
            Stars
          </p>
        </router-link>
      </div>

      <h2 class="demos-title">Components</h2>
      <div class="grids grids-small">
        <router-link :to="{ path: 'modal' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/modal.png" alt="">
          </div>
          <p class="grid_label">
            Modal
          </p>
        </router-link>
        <router-link :to="{ path: 'preloader' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/preloader.png" alt="">
          </div>
          <p class="grid_label">
            Preloader
          </p>
        </router-link>
        <router-link :to="{ name: 'toast' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/toast.png" alt="">
          </div>
          <p class="grid_label">
            Toast
          </p>
        </router-link>
        <router-link :to="{ path: 'tab' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/tab.png" alt="">
          </div>
          <p class="grid_label">
            Tab
          </p>
        </router-link>
        <router-link :to="{ path: 'scroll' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/scroll.png" alt="">
          </div>
          <p class="grid_label">
            Scroll
          </p>
        </router-link>
        <router-link :to="{ path: 'popup' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/window.png" alt="">
          </div>
          <p class="grid_label">
            Popup
          </p>
        </router-link>
        <router-link :to="{ path: 'popwindow' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/window.png" alt="">
          </div>
          <p class="grid_label">
            PopWindow
          </p>
        </router-link>
        <router-link :to="{ path: 'actions' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/menu.png" alt="">
          </div>
          <p class="grid_label">
            Actions
          </p>
        </router-link>
        <router-link :to="{ path: 'searchbar' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/search.png" alt="">
          </div>
          <p class="grid_label">
            Searchbar
          </p>
        </router-link>
        <router-link :to="{ path: 'calendar' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/calendar.png" alt="">
          </div>
          <p class="grid_label">
            Calendar
          </p>
        </router-link>
        <router-link :to="{ path: 'slide' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/slide.png" alt="">
          </div>
          <p class="grid_label">
            Slide
          </p>
        </router-link>
        <router-link :to="{ path: 'side-panel' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/side.png" alt="">
          </div>
          <p class="grid_label">
            SidePanel
          </p>
        </router-link>
        <router-link :to="{ path: 'popover' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/menu.png" alt="">
          </div>
          <p class="grid_label">
            Popover
          </p>
        </router-link>
        <router-link :to="{ path: 'circle' }" class="grid">
          <div class="grid_icon">
            <img src="../assets/images/home/circle.png" alt="">
          </div>
          <p class="grid_label">
            Circle
          </p>
        </router-link>
      </div>
    -->
    </page-content>
  </div>
</template>

<style scoped>
.grid-wrapper {
  padding: 5px 0;
  background: #f7f9fb;
}
.slide-wrapper {
  padding: 12px 0;
}
.section-header {
  padding: 0 0.75rem;
  border: 0;
  margin: .6rem 0;
}
.loan-basic {
  width: 67%;
  display: inline-block;
}
.loan-ad {
  width: 30%;
  display: inline-block;
}
.item-text {

}
.item-content > div {
  padding: 5px 0;
}
.grid_icon {
  width: 42px;
  height: 42px;
}
.grid_icon img {

}
.grids:before {
  border-right: 0 !important;
  border: 0 !important;
}
.grids:after {
  border-bottom: 0 !important;
}
.brief {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow:ellipsis;
  width: 72%;
}
.list {
  margin: 0.75rem 0;
}
.loan-head {
  background: #FFFFBB;
  border-radius: 10px;
}
</style>


<script>
import Grid from '../components/grid'
import { Header, HeaderLink, HeaderTitle } from '../components/header'
import Content from '../components/content'
import { SimpleHeader } from '../components/header'
import { SlideWrapper, Slide } from '../components/slide'
import { List, ListItem } from '../components/list'
import { Button, ButtonGroup } from '../components/buttons'
import CreditApi from '@/api/credit'
import LoanApi from '@/api/reward'
import Db from '@/db'

export default {
  created() {

    this.auth = Db.get('auth')

    this.getCreditList(this.listQueryCredit)

    this.getLoanList(this.listQueryLoan)

  },
  components: {
    'page-header': Header,
    List,
    ListItem,
    HeaderLink,
    HeaderTitle,
    'page-content': Content,
    Grid,
    SimpleHeader,
    SlideWrapper,
    Slide,
    ButtonGroup,
    'm-button': Button
  },
  data() {

    return {

      auth: {},

      creditCards: [

      ],

      auditTypes: [ '下款', '实名注册', '授信额度' ],

      loans: [


      ],

      listQueryCredit: {
        
        order: 'display_order desc',
        page: 1,
        page_size: 5

      },

      listQueryLoan: {

        order: 'display_order desc',
        page: 1,
        page_size: 5

      },

      toProcess() {
 
        this.$router.push({ path: '/process' })

      }

    }

  },
  methods: {

    toCardQrcode(card) {

      let url = 'http://qinggang.xinxingtianxia.com/cardDetail?id=' + card.id

      this.$router.push({ path: '/qrcode', query: { url: url } })

    },

    toLoanDetail(loan) {

      this.$router.push({ path: '/loanDetail', query: { id: loan.id }})

    },

    toLoanQrcode(loan) {

      let url = 'http://qinggang.xinxingtianxia.com/LoanDetail?id=' + loan.id

      this.$router.push({ path: '/qrcode', query: { url: url } })

    },

    toQrcode() {

      let url = 'http://qinggang.xinxingtianxia.com/'

      this.$router.push({ path: '/qrcode', query: { url: url } })
 
    },

    toCardDetail(card) {

      this.$router.push({ path: '/cardDetail', query: { id: card.id }})

    },

    switchTab(tab) {

      this.$emit('switchTab', tab)

    },

    toDetail(idx) {

      switch(idx) {

        case 1:
          this.$router.push({ path: '/loanDetail', query: { id: 13 } })
        break;
        case 2:
          this.$router.push({ path: '/cardDetail', query: { id: 18 } })
        break;
        case 3:
          this.$router.push({ path: '/cardDetail', query: { id: 17 } })
        break;
        case 4:
          this.$router.push({ path: '/cardDetail', query: { id: 20 } })
        break;
        case 5:
          this.$router.push({ path: '/cardDetail', query: { id: 15 } })
        break;
        case 7: 
          this.$router.push({ path: '/loanDetail', query: { id: 21 }})
        break;

      }

    },

    getCreditList(params) {

      CreditApi.queryList(params).then(res => {

        if (res.ret == 200) {

          this.creditCards = res.data.list

          this.listQueryCredit.page = res.data.page

        }

      })

    },

    getLoanList(params) {

      LoanApi.getList(params).then(res => {

        if (res.ret == 200) {

          this.loans = res.data.list

          this.listQueryLoan.page = res.data.page

        }

      })

    }

  }

}
</script>

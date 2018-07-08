<template>
  <div class="page">
    <page-footer v-show="au_checked">
      <footer-item class="footer-tab" v-bind:class="{ 'active' : currentView === 'home' }" @click.native="changeView('home')">
        <span class="icon demo-icon-home"></span>
        <label>首页</label>
      </footer-item>
      <footer-item class="footer-tab" v-bind:class="{ 'active' : currentView === 'search' }" @click.native="changeView('search')">
        <span class="icon demo-icon-search"></span>
        <label>信用卡</label>
      </footer-item>
      <footer-item class="footer-tab" v-bind:class="{ 'active' : currentView === 'noti' }" @click.native="changeView('noti')">
        <span class="icon demo-icon-noti"></span>
        <label>贷款</label>
      </footer-item>
      <footer-item v-if="auth && auth.member_type != 1" class="footer-tab" v-bind:class="{ 'active' : ( currentView === 'agentInfo' || currentView === 'agentApply' || currentView === 'notifyLogin' ) }" @click.native="changeView('agent')">
        <span class="icon demo-icon-agent"></span>
        <label>合伙人</label>
      </footer-item>
      <footer-item class="footer-tab" v-bind:class="{ 'active' : currentView === 'about' }" @click.native="changeView('about')">
        <span class="icon demo-icon-me"></span>
        <label>我的</label>
      </footer-item>
    </page-footer>
    <keep-alive>
      <component v-show="au_checked" :is="currentView" @switchTab="switchView"></component>
    </keep-alive>
  </div>
</template>

<script>
import Page from '../components/page'
import { Footer, Item, FooterItem } from '../components/footer'
import Home from './Home'
import Search from './Search'
import Noti from './Noti'
import About from './About'
import AgentApply from './AgentApply'
import AgentInfo from './AgentInfo'
import Wx from '@/utils/wx'
import MemberApi from '@/api/member'
import { getToken, isWechat, getAgent, getIndexTab, setIndexTab } from '@/utils/auth'
import Db from '@/db'
import NotifyLogin from './NotifyLogin'
import Cookies from '@/utils/auth'
import util from '@/util'

const domain = "http://qinggang.xinxingtianxia.com"

const menus = [ 'home', 'search', 'about', 'noti', 'agent', 'agentInfo', 'agentApply' ] 

export default {

  created() {

    let auth = {}

    if (isWechat()) { 
    
      /**
       * 在微信浏览器中打开时
       * 
       * 检验是否获取到用户信息
       * 检验是否已经调用过微信鉴权
       */

      auth = this.auth = Db.get('auth')

      this.au_checked = Db.get('au_checked')

      /**
       * 查询是否有跳转页面
       */

      this.authRedirect()

    } else {

      /**
       * 在普通浏览器中打开时
       */

      if (!this.auth) {

        this.auth = true

        this.au_checked = true

      }

    }

    /**
     * 设置启动页面
     */
    this.initTab()

  },
  mounted() {

    if (isWechat()) {

      /**
       * 配置微信分享页面
       */
      let auth = this.auth = Db.get('auth')

      if (auth) {

        Wx({
          title: '云上信-信贷新口子',
          desc: '云上信从事金融信息服务，提供优质金融营销管理工具，提供信用卡办理，贷款办理最新资料，广招全国代理，诚信结算，诚邀广大代理商合作！',
          link: domain + '?reference=' +  ( auth && auth.member_identity ? auth.member_identity : 1),
          imgUrl: 'http://p4zs4o36y.bkt.clouddn.com/logo.png'
        })

      }

    }

  },
  components: {
    Page,
    'page-footer': Footer,
    'footer-item': Item,
    'home': Home,
    'search': Search,
    'noti': Noti,
    'about': About,
    'agentApply': AgentApply,
    'agentInfo': AgentInfo,
    'notifyLogin': NotifyLogin
  },
  data () {
    return {
      currentView: 'home',
      auth: undefined,
      au_checked: 0
    }
  },
  methods: {

    /**
     * 设置初始展示页
     */
    initTab() {

      let tab = this.$route.query.tab

      if (!tab) {

        tab = getIndexTab()

      }

      if (!util.inArray(tab, menus) || !tab) {

        tab = 'home'

      }

      this.changeView(tab)

    },

    authRedirect() {

      let redirect = Db.get('auth_redirect')

      Db.set('auth_redirect', '')

      if (redirect) {

        if (redirect == window.location.href) {

          return

        }

        let authQuery = Db.get('auth_redirect_query')

        Db.set('auth_redirect_query', '')

        let queryString = ''

        for(var key in authQuery) {

          queryString += key + '=' + authQuery[key] + '&'

        }

        if (queryString.length > 0) {

          window.location.href = redirect + '?' + queryString

        } else {

          window.location.href = redirect
          
        }

      }

    },

    changeView (view) {

      setIndexTab(view)

      if (view == 'agent') {

        let auth = Db.get('auth')

        if (auth && auth.mobile) {

          MemberApi.checkPartner({}).then(res => {

            if (res.data > 0) {

              this.currentView = 'agentInfo'

            } else {

              this.currentView = 'agentApply'

            }

          })

        } else {

          this.currentView = 'notifyLogin'

        }
 
      } else {

        this.currentView = view

      }

    },
    switchView(data) {

      switch(data) {

        case 1:

        this.currentView = Search

        break;

        case 2:

        this.currentView = Noti

        break

      }

    }

  }
  
}
</script>

<style lang="less">
.my-page {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  bottom: 2.8rem;
}
.demo-icon-home {
  background-image: url("../assets/images/home-inactive.png");
  background-size: 100%;
}
.demo-icon-search {
  background-image: url("../assets/images/credit-inactive.png");
  background-size: 100%;
}
.demo-icon-noti {
  background-image: url("../assets/images/money-inactive.png");
  background-size: 100%;
}
.demo-icon-agent {
  background-image: url("../assets/images/agent-inactive.png");
  background-size: 100%;
}
.demo-icon-me {
  background-image: url("../assets/images/partner-inactive.png");
  background-size: 100%; 
}

.active > .demo-icon-home {
  background-image: url("../assets/images/home-active.png");
}
.active > .demo-icon-search {
  background-image: url("../assets/images/credit-active.png");
}
.active > .demo-icon-noti {
  background-image: url("../assets/images/money-active.png");
}
.active > .demo-icon-agent {
  background-image: url("../assets/images/agent-active.png");
}
.active > .demo-icon-me {
  background-image: url("../assets/images/partner-active.png");
}
.active > label {
  color: #fe9d01;
}
</style>

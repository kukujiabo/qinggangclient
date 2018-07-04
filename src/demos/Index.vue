<template>
  <div class="page">
    <page-footer>
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
      <footer-item class="footer-tab" v-bind:class="{ 'active' : ( currentView === 'agentInfo' || currentView === 'agentApply' || currentView === 'notifyLogin' ) }" @click.native="changeView('agent')">
        <span class="icon demo-icon-agent"></span>
        <label>合伙人</label>
      </footer-item>
      <footer-item class="footer-tab" v-bind:class="{ 'active' : currentView === 'about' }" @click.native="changeView('about')">
        <span class="icon demo-icon-me"></span>
        <label>我的</label>
      </footer-item>
    </page-footer>
    <confirm :title="'Hello'" :content="'Hello there!'" :on-ok="toLogin" ref="confirm"></confirm>
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

export default {
  created() {

    let menus = [ 'home', 'search', 'about', 'noti', 'agent', 'agentInfo', 'agentApply' ]

    let auth = {}

    this.au_checked = Db.get('au_checked')

    if (isWechat()) {

      auth = this.auth = Db.get('auth')

    } else {

      if (!this.auth) {

        this.auth = true

      }

    }

    if (isWechat()) {

      Wx({
        title: '云上信-信贷新口子',
        desc: '云上信从事金融信息服务，提供优质金融营销管理工具，提供信用卡办理，贷款办理最新资料，广招全国代理，诚信结算，诚邀广大代理商合作！',
        link: 'http://qinggang.xinxingtianxia.com?reference=' +  ( auth && auth.member_identity ? auth.member_identity : 1),
        imgUrl: 'http://p4zs4o36y.bkt.clouddn.com/logo.png'
      })

    }

    var redirect = Db.get('auth_redirect')

    if (redirect) {

      Db.set('auth_redirect', '')

      let authQuery = Db.get('auth_redirect_query')

      let queryString = ''

      for(var key in authQuery) {

        queryString += key + '=' + authQuery[key] + '&'

      }

      Db.set('auth_redirect_query', '')

      window.location.href = redirect + '?' + queryString

    }

    /**
     * 设置启动页面
     */

    let tab = this.$route.query.tab

    if (tab) {

      this.changeView(tab)

    } else {

      tab = getIndexTab()

      if (tab) {

        this.changeView(tab)

      } else {

        this.changeView('home')

      }

    }

    let validMenu = false

    for(let i = 0; i < menus.length; i++) {

      if (tab == menus[i]) {

        validMenu = true
      
        break

      }

    }

    if (!validMenu) {

      this.currentView = 'home'

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
      currentView: '',
      auth: undefined,
      au_checked: 0
    }
  },
  methods: {

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

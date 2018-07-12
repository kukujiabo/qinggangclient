import Vue from 'vue'
import Router from 'vue-router'
import FastClick from 'fastclick'
import Cookie from 'vue-cookies'

import Vum from './vum.js'

// demos
import Index from './demos/Index'
import Page from './demos/Page'
import Buttons from './demos/Buttons'
import Column from './demos/Column'
import Grid from './demos/Grid'
import Modal from './demos/Modal'
import List from './demos/List'
import Contacts from './demos/Contacts'
import Form from './demos/Form'
import Icons from './demos/Icons'
import Tab from './demos/Tab'
import Scroll from './demos/Scroll'
import Popup from './demos/Popup'
import PopWindow from './demos/PopWindow'
import Preloader from './demos/Preloader'
import Actions from './demos/Actions'
import Toast from './demos/Toast'
import Searchbar from './demos/Searchbar'
import Calendar from './demos/Calendar'
import Result from './demos/Result'
import Slide from './demos/Slide'
import SidePanel from './demos/SidePanel'
import Popover from './demos/Popover'
import Stars from './demos/Stars'
import CircleProgress from './demos/CircleProgress'
import CardDetail from './demos/CardDetail'
import Login from './demos/Login'
import Register from './demos/Register'
import Password from './demos/Password'
import Partner from './demos/Partner'
import Fans from './demos/Fans'
import Rewards from './demos/Rewards'
import MyCode from './demos/MyCode'
import Apply from './demos/Apply'
import Auth from './demos/Auth'
import Setting from './demos/Setting'
import Process from './demos/Process'
import LoanDetail from './demos/LoanDetail'
import ApplyAgent from './demos/AgentApply'
import Db from '@/db'
import MemberApi from '@/api/member'
import QrCode from '@/demos/QrCode'
import Aliaccount from '@/demos/Aliaccount'
import NotifyLogin from '@/demos/NotifyLogin'
import PartnerDetail from '@/demos/PartnerDetail'
import Feedback from '@/demos/Feedback'

Vue.use(Router)
Vue.use(Vum)
Vue.use(Cookie)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/page',
      component: Page
    },
    {
      path: '/buttons',
      component: Buttons
    },
    {
      path: '/column',
      component: Column
    },
    {
      path: '/grid',
      component: Grid
    },
    {
      path: '/modal',
      component: Modal
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/contacts',
      component: Contacts
    },
    {
      path: '/form',
      component: Form
    },
    {
      path: '/icons',
      name: 'icons',
      component: Icons
    },
    {
      path: '/tab',
      component: Tab
    },
    {
      path: '/scroll',
      component: Scroll
    },
    {
      path: '/popup',
      component: Popup
    },
    {
      path: '/popwindow',
      component: PopWindow
    },
    {
      path: '/preloader',
      component: Preloader
    },
    {
      path: '/toast',
      name: 'toast',
      component: Toast
    },
    {
      path: '/actions',
      component: Actions
    },
    {
      path: '/searchbar',
      component: Searchbar
    },
    {
      path: '/calendar',
      component: Calendar
    },
    {
      path: '/result',
      name: 'result',
      component: Result
    },
    {
      path: '/slide',
      name: 'slide',
      component: Slide
    },
    {
      path: '/side-panel',
      name: 'side-panel',
      component: SidePanel
    },
    {
      path: '/popover',
      name: 'popover',
      component: Popover
    },
    {
      path: '/stars',
      name: 'stars',
      component: Stars
    },
    {
      path: '/circle',
      name: 'circle',
      component: CircleProgress
    },
    {
      path: '/cardDetail',
      name: 'card',
      component: CardDetail
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/password',
      name: 'password',
      component: Password
    },
    {
      path: '/partner',
      name: 'partner',
      component: Partner
    },
    {
      path: '/fans',
      name: 'fans',
      component: Fans
    },
    {
      path: '/rewards',
      name: 'rewards',
      component: Rewards
    },
    {
      path: '/mycode',
      name: 'mycode',
      component: MyCode
    },
    {
      path: '/apply',
      name: 'apply',
      component: Apply
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth
    },
    {
      path: '/setting',
      name: 'setting',
      component: Setting
    },
    {
      path: '/process',
      name: 'process',
      component: Process
    },
    {
      path: '/loanDetail',
      name: 'loanDetail',
      component: LoanDetail
    },
    {
      path: '/applyAgent',
      name: 'applyAgent',
      component: ApplyAgent
    },
    {
      path: '/qrcode',
      name: 'qrcode',
      component: QrCode
    },
    {
      path: '/aliaccount',
      name: 'aliaccount',
      component: Aliaccount
    },
    {
      path: '/notifyLogin',
      name: 'notifyLogin',
      component: NotifyLogin
    },
    {
      path: '/partnerDetail',
      name: 'partnerDetail',
      component: PartnerDetail
    },
    {
      path: '/feedback',
      name: 'feedback',
      component: Feedback
    }
  ]
})

var vue = new Vue({
  router
}).$mount('#app')

Vum.router(router)

FastClick.attach(document.body)

/**
 * 链接带有推荐人编号，则保存推荐人编号
 */
if (vue.$route.query.reference) {
  Db.set('referebce', vue.$route.query.reference)
}

if (isWeixinBrowser() && !Db.get('auth') && vue.$route.path !== '/auth') {
  Db.set('auth_redirect', vue.$route.path)
  Db.set('auth_redirect_query', vue.$route.query)
  router.push({ path: '/auth', query: vue.$route.query })
}

MemberApi.checkToken().then(res => {
  if (res.ret === 200) {
    if (isWeixinBrowser() && !res.data && vue.$route.path !== '/auth') {
      Db.set('auth_redirect', vue.$route.path)
      router.push({ path: '/auth', query: vue.$route.query })
    }
  }
})

function isWeixinBrowser () {
  var agent = navigator.userAgent.toLowerCase()

  var matched = agent.match(/MicroMessenger/i)

  if (matched && matched[0] === 'micromessenger') {
    return true
  } else {
    return false
  }
}

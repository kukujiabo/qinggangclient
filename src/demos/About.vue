<template>
  <div class="my-page">
    <simple-header class="bg-org wt-color" title="合伙人" ></simple-header>
    <page-content>
      <div class="content">
        <div class="user-card">
          <div class="card-wrapper">
            <div class="card-info">
              <div class="c-itm">
                <img v-if="!memberInfo.portrait" class="logo va-mid" src="../assets/images/dimond-user.png">
                <img v-else class="logo va-mid" :src="memberInfo.portrait">
                <span class="va-mid ft75">
                  <router-link :to="{ path: '/login' }" v-if="!memberInfo.mobile">
                    <span class="wt-color">用户登录</span>
                  </router-link>
                  <span class="wt-color" v-if="memberInfo.mobile">{{memberInfo.member_name}}</span>
                </span>
              </div>
              <div class="money-info c-itm wt-color" >
                <p class="ft65" v-if="memberInfo.member_type > 1 && memberInfo.mobile">账户余额：¥ {{account.rest}}</p>
                <p class="ft65" v-if="memberInfo.member_type > 1 && memberInfo.mobile">历史余额：¥ {{account.history}}</p>
              </div>
            </div>
          </div>
        </div>
        <list>
          <list-item v-if="account">
            <div class="item-media"><img src="http://p4zs4o36y.bkt.clouddn.com/51d3b7eeff4352c3bd8f1663d739a67f_meitu_1.jpg" width="30"></div>
            <div class="item-content" @click="checkAuth(1)">
              <div class="item-title-row">
                <div class="item-title ft75">支付宝账户</div>
                <div class="item-after"><icon icon="link"></icon></div>
              </div>
            </div>
          </list-item>
          <list-item>
            <div class="item-media"><img src="../assets/images/hearty.png" width="30"></div>
            <div class="item-content" @click="checkAuth(2)">
              <div class="item-title-row">
                <div class="item-title ft75">我的粉丝</div>
                <div class="item-after"><icon icon="link"></icon></div>
              </div>
            </div>
          </list-item>
          <list-item v-if="memberInfo.mobile && memberInfo.member_type > 1">
            <div class="item-media"><img src="../assets/images/rewards.png" width="30"></div>
            <div class="item-content" @click="checkAuth(3)">
              <div class="item-title-row">
                <div class="item-title ft75">我的收益</div>
                <div class="item-after">
                  <icon icon="link"></icon>
                </div>
              </div>
            </div>
          </list-item>
          <list-item>
            <div class="item-media"><img src="../assets/images/sales_code.png" width="30"></div>
            <div class="item-content" @click="checkAuth(4)">
              <div class="item-title-row">
                <div class="item-title ft75">我的推广码</div>
                <div class="item-after">
                  <icon icon="link"></icon>
                </div>
              </div>
            </div>
          </list-item>
          <list-item>
            <div class="item-media"><img src="../assets/images/question.png" width="30"></div>
            <div class="item-content">
              <div class="item-title-row">
                <div class="item-title ft75">联系客服</div>
                <div class="item-after">
                  <a class="va-mid" href="tel:18217083623">18217083623</a>
                  <icon class="va-mid" icon="link"></icon>
                </div>
              </div>
            </div>
          </list-item>
          <list-item>
            <div class="item-media"><img src="../assets/images/setting.png" width="30"></div>
            <div class="item-content" @click="checkAuth(6)">
              <div class="item-title-row">
                <div class="item-title ft75">设置</div>
                <div class="item-after">
                  <icon icon="link"></icon>
                </div>
              </div>
            </div>
          </list-item>
        </list>
      </div>
    </page-content>
    <alert :title="'提示'" :content="noticeTxt"  ref="alert"></alert>
  </div>
</template>

<style scoped>
  .user-card {
    padding: 20px;
    background: #fff7d2;
  }
  .list {
    margin: 0;
  }
  .item-media {
    border-radius: 50%;
  }
  .card-wrapper {
    position: relative;
    background-image: url(../assets/images/background.jpg);
    background-size: 100% auto;
    background-position: center center;
    border-radius: 6px;
  }
  .money-info {
    min-height: 3.6rem;
  }
  .logo {
    width: 75px;
    height: 75px;
    border-radius: 50%;
  }
  .c-itm {
    padding: 5px 0;
  }
  .c-itm span {
    padding: 0 12px;
  }
  .c-itm p {
    padding: 5px 0 0 8px;
    margin: 8px 0 0 0;
  }
  .card-wrapper img.background {
    width: 100%;
    top: 0;
    border-radius: 8px;
    position: absolute;
  }
  .card-wrapper .card-info {
    padding: 20px;
  }
  .list .item-inner {
    height: 2.0;
    line-height: 2.0;
  }
  .icon {
    font-size: 0.6rem;
  }
  .item-content {
    height: 3rem;
    line-height: 2rem;
  }
</style>

<script>
import Content from '../components/content'
import { SimpleHeader } from '../components/header'
import { List, ListItem } from '../components/list'
import Icon from '../components/icons'
import Db from '@/db'
import { getToken, setToken, getAgent } from '@/utils/auth'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'
import MemberApi from '@/api/member'
import AccountApi from '@/api/account'

export default {

  activated() {

    console.log(history)

    this.init()

  },

  components: {
    SimpleHeader,
    'page-content': Content,
    List,
    ListItem,
    Alert,
    Confirm,
    Modal,
    Prompt,
    Icon
  },

  data() {

    return {

      token: '',

      agent: 0,

      noticeTxt: '',

      account: undefined,

      memberInfo: {}

    }

  },
  methods: {

    init() {

      let token = getToken()

      if (token) {

        this.token = token

        let memberInfo = Db.get('auth')

        if (memberInfo) {

          this.memberInfo = memberInfo

        }

      }

      MemberApi.checkPartner({}).then(res => {

        if (res.ret == 200) {

          this.agent = res.data
  
        } else {

          this.agent = 0

        }

        return res.ret

      }).then(res => {

        if (res == 200) {

          AccountApi.getDetail({}).then(res => {

            if (res.ret == 200 && res.data) {

              this.account = res.data

            }

          })

        }

      })

    },

    toQrcode() {

      let url = 'http://qinggang.xinxingtianxia.com/'

      this.$router.push({ path: '/qrcode', query: { url: url } })
 
    },

    checkAuth(index) {

      if (!this.token) {

        this.noticeTxt = '请先登录！'

        this.$refs.alert.open()

        return

      }

      switch(index) {

        case 1:

          this.toAliAccount()

        break;

        case 2:

          this.toFans()

        break;

        case 3:

          this.toRewards()

        break;

        case 4:

          this.toQrcode()

        break;

        case 6:

          this.toSetting()

        break;

      }

    },

    toPartner() {

      this.$router.push({ path: '/partner' })
      
    },

    toFans() {

      this.$router.push({ path: '/fans' })

    },

    toRewards() {

      this.$router.push({ path: '/rewards' })

    },

    toMyCode() {

      this.$router.push({ path: '/myCode' })

    },

    toSetting() {

      this.$router.push({ path: '/setting' })

    },

    toAliAccount() {

      this.$router.push({ path: '/aliaccount'})

    }

  }

}
</script>

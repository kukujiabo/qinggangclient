<template>
  <div class="my-page">
    <simple-header class="bg-org wt-color" title="贷款"></simple-header>
    <page-content>
      <list>
          <list-item v-for="loan in loans" :key="loan.id" >
            <div class="item-media" @click="toLoanDetail(loan.id)"><img :src="loan.thumbnail" width="75"></div>
            <div class="item-content">
              <div class="item-title-row" >
                <div class="item-title ft75 bold" @click="toLoanDetail(loan.id)">{{loan.reward_name}}</div>
                <div class="item-after">
                  <div>
                    <img class="va-mid" src="../assets/images/qr_code_light.png" width="24" @click="toLoanQrcode(loan)">
                  </div>
                </div>
              </div>
              <div class="item-title-row" @click="toLoanDetail(loan.id)">
                <div style="width:75%">
                  <div class="item-text ft60">
                    最高可贷：¥ {{loan.max_credit}}
                  </div>
                  <div class="item-text ft60">
                    按月利率：{{loan.rate}}
                  </div>
                  <div class="item-text ft60">
                    贷款期限：{{loan.limit}}
                  </div>
                  <div class="item-text ft60 org-color">
                    结算条件：{{auditTypes[loan.audit_type - 1]}}
                  </div>
                </div>
                <div class="text-right" style="width:35%" @click="toLoanDetail(loan.id)">
                  <div class="ft60 org-color" v-if="auth && auth.member_type == 3">
                    返利：{{loan.reward_type == 1 ? ((parseFloat(loan.senior_reward) + parseFloat(loan.sub_reward)).toFixed(2)) + '%' : (parseFloat(loan.senior_reward) + parseFloat(loan.sub_reward)) + '元'}}
                  </div>
                  <div class="ft60 org-color" v-if="auth && auth.member_type == 2">
                    返利：{{loan.reward_type == 1 ? loan.sub_reward + '%' : loan.sub_reward + '元'}}
                  </div>
                  <div class="ft60 org-color" >
                    {{loan.time}} 下款
                  </div>
                  <div class="ft60 org-color">
                    {{loan.audit_num}} 人下款
                  </div>
                </div>
              </div>
              <div class="item-title-row">
                  <span class="tag tag-yellow" v-if="auth && auth.member_type > 1 && loan.account_date == 1">每日结算</span>
                  <span class="tag tag-red" v-if="auth && auth.member_type > 1 && loan.account_date == 2">每周结算</span>
              </div>
            </div>
          </list-item>
      </list>
    </page-content>
  </div>

</template>

<style scoped>
.item-text {
  width: 75%;
}
.item-content > div {
  padding: 5px 0;
}
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { List, ListItem } from '../components/list'
import LoanApi from '@/api/reward'
import Db from '@/db'

export default {
  components: {
    SimpleHeader,
    List,
    ListItem,
    'page-content': Content
  },
  created() {

    this.auth = Db.get('auth')

    this.getList(this.listQuery)

  },
  data() {

    return {

      loans: [

      ],

      auth: {},

      listQuery: {

        order: 'display_order desc',
        page: 1,
        page_size: 20

      },

      auditTypes: [ '下款', '实名注册', '授信额度', '下载App并登录' ]

    }

  },
  methods: {

    toLoanQrcode(loan) {

      let url = 'http://qinggang.xinxingtianxia.com/LoanDetail?id=' + loan.id

      this.$router.push({ path: '/qrcode', query: { url: url } })

    },

    toLoanDetail(id) {

      this.$router.push({ path: '/loanDetail', query: { id: id } })

    },

    getList(params) {

      var query = {}

      for(var key in params) {

        if (params[key] != '') {

          query[key] = params[key]

        }

      }

      LoanApi.getList(query).then(res => {

        if (res.ret == 200) {

          this.loans = res.data.list

          this.listQuery.page = res.data.page

        }

      })

    }

  }

}
</script>

<template>
  <div class="page">
    <simple-header :backText="''" class="bg-org wt-color" :title="card.shop_name" :back-link="true"></simple-header>
    <page-content>
      <div class="card-box">
          <img class="card-image" :src="card.thumbnail" style="width:100%">
      </div>
      <div class="card-info">
        <p class="ft85 bold">{{card.shop_name}}</p>
        <div class="ft75 number-info">
           <span>下卡数：{{card.num}}</span>
           <span>最高额度：¥ {{card.ext_2}}</span>
           <!--
           <span>佣金：¥ {{card.commission}}</span>
           -->
        </div>
        <router-link :to="{ path: '/apply', query: { url: card.words, type: 'card', id: card.id } }">
            <m-button type="warning">立即申请</m-button>
        </router-link>
      </div>
      <div class="process">
        <div class="grids grids-small">
          <a href="javascript:;" class="grid">
            <div class="grid_icon">
              <img src="../assets/images/p1.png" alt="">
            </div>
            <p class="grid_label ft50">
              1.网上申请
            </p>
          </a>
          <a href="javascript:;" class="grid">
            <div class="grid_icon">
              <img src="../assets/images/p2.png" alt="">
            </div>
            <p class="grid_label ft50">
              2.选择卡片
            </p>
          </a>
          <a href="javascript:;" class="grid">
            <div class="grid_icon">
              <img src="../assets/images/p3.png" alt="">
            </div>
            <p class="grid_label ft50">
              3.完善信息
            </p>
          </a>
          <a href="javascript:;" class="grid">
            <div class="grid_icon">
              <img src="../assets/images/p4.png" alt="">
            </div>
            <p class="grid_label ft50">
              4.等待审核
            </p>
          </a>
        </div>
      </div>
      <div class="introduction">
        <p class="ft75 bold" style="margin:0">卡片介绍</p>
        <div class="content">{{card.brief}}</div>
      </div>
      <div style="height:50px"></div>
    </page-content>
  </div>
</template>

<style scoped> 
    .footer-wrap {
        width: 100%;
        letter-spacing: 2px;
    }
    .card-box {
        padding: 8px 16px;
    }
    .card-image {
        width: 100%;
    }
    .card-info {
        padding: 0 24px 12px 24px;
        border-bottom: 1px solid #e7e7e7;
    }
    .card-info p {
        margin: 0
    }
    .number-info span {
        padding: 8px 10px 5px 0px;
        display: inline-block;
    }
    .process {
        padding: 0 24px;
        border-bottom: 1px solid #e7e7e7;
    }
    .grid_icon {
        width: 36px;
        height: 36px;
    }
    .introduction {
        padding: 24px
    }
    .introduction .content {
        font-size: 14px;
        padding: 12px 0;
    }
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import Grid from '../components/grid'
import { Footer, Item, FooterItem } from '../components/footer'
import { Button, ButtonGroup } from '../components/buttons'
import CreditApi from '@/api/credit'
import { isWechat } from '@/utils/auth'
import Wx from '@/utils/wx'
import Db from '@/db'

export default {

    created() {

        let id = this.$route.query.id

        CreditApi.getDetail({ id: id }).then(res => {

            if (res.ret == 200) {

                this.card = res.data

                this.card.num = 1278

                if (isWechat()) {

                    let auth = Db.get('auth')

                    let link = 'http://qinggang.xinxingtianxia.com/cardDetail?id=' + this.card.id + '&reference=' +  ( auth && auth.member_identity ? auth.member_identity : 1)

                    let conf = {
                        title: this.card.shop_name,
                        desc: this.card.shop_name,
                        link: link,
                        imgUrl: this.card.thumbnail,
                        reconfig: true
                    }
                    
                    Wx(conf)

                }

            }

        })

    },
    components: {
        SimpleHeader,
        Grid,
        'page-content': Content,
        'page-footer': Footer,
        ButtonGroup,
        'm-button': Button 
    },
    data() {

        return {

            card: {}
    
        }

    },
    methods: {


    }
}
</script>

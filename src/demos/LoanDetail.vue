<template>
  <div class="page">
    <simple-header :backText="''" class="bg-org wt-color" :title="loan.reward_name" :back-link="true"></simple-header>
    <page-content>
      <div class="card-box tc">
        <div class="loan-info text-center">
            <h5>最高贷款额度（元）</h5>
            <h1 class="org-color">¥ {{loan.max_credit}}</h1>
        </div>
        <div style="height:8px;"></div>
        <m-button type="warning" @click.native="toApply">我要借钱</m-button>
        <div>
            <div class="grids grids-small">
                <div class="grid text-center" style="padding: 5px 8px">
                    <div class="" >
                        <span class="ft50">贷款期限</span>
                    </div>
                    <p class="grid_label">
                    12个月
                    </p>
                </div>
                <div class="grid text-center" style="padding: 5px 8px">
                    <div class="" >
                        <span class="ft50">月利率</span>
                    </div>
                    <p class="grid_label">
                    {{loan.rate}} %
                    </p>
                </div>
                <div class="grid text-center" style="padding: 5px 8px">
                    <div class="" >
                        <span class="ft50">还款期限</span>
                    </div>
                    <p class="grid_label">
                    {{loan.limit}}
                    </p>
                </div>
                <div class="grid text-center" style="padding: 5px 8px">
                    <div class="" >
                        <span class="ft50">到账时间</span>
                    </div>
                    <p class="grid_label">
                        {{loan.time}}
                    </p>
                </div>
            </div>
        </div>
      </div>
      <div class="process">
        <div class="grids grids-small">
          <a href="javascript:;" class="grid">
            <div class="grid_icon">
              <img src="../assets/images/p1.png" alt="">
            </div>
            <p class="grid_label ft50">
              1.网填信息
            </p>
          </a>
          <a href="javascript:;" class="grid">
            <div class="grid_icon">
              <img src="../assets/images/p2.png" alt="">
            </div>
            <p class="grid_label ft50">
              2.选择额度
            </p>
          </a>
          <a href="javascript:;" class="grid">
            <div class="grid_icon">
              <img src="../assets/images/p3.png" alt="">
            </div>
            <p class="grid_label ft50">
              3.授信审查
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
        <p class="ft60 bold" style="margin:0">申请条件</p>
        <div class="content" v-html="loan.image_text"></div>
      </div>
      <div class="introduction">
        <p class="ft60 bold" style="margin:0">办理材料</p>
        <div class="content">{{loan.material}}</div>
      </div>
      <div class="introduction">
        <p class="ft60 bold" style="margin:0">机构介绍</p>
        <div class="content">{{loan.institution}}</div>
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
        padding: 16px 16px 6px 16px;
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
        padding: 8px 20px
    }
    .introduction .content {
        font-size: 14px;
        padding: 12px 0;
    }
    .loan-info {
        background: #f3f5f7;
        padding: 8px;
    }
    .introduction .content {
        padding: 8px 5px;
        margin: 5px 0;
        background: #f3f5f7;
    }
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import Grid from '../components/grid'
import { Footer, Item, FooterItem } from '../components/footer'
import { Button, ButtonGroup } from '../components/buttons'
import LoanApi from '@/api/reward'

export default {

    created() {

        let id = this.$route.query.id

        LoanApi.getDetail({ id: id }).then(res => {

            if (res.ret == 200) {

                this.loan = res.data

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

            loan: {}
    
        }

    },
    methods: {

        toApply() {

            this.$router.push({ path: '/apply', query: { type: 'loan', id: this.loan.id, url: this.loan.url, image: this.loan.banner }})

        }

    }
}
</script>

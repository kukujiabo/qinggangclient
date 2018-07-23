<template>
    <div class="page fft14">
        <simple-header :backText="''" class="bg-org wt-color" :title="title" :back-link="true"></simple-header>
        <page-content>
            <div class="info">
                <div class="p-img text-center">
                    <img src="http://p4zs4o36y.bkt.clouddn.com/FnnxwZn6wampqSuDeLlEFtBLlmYS">
                    <p class="ft80 bold">百度有钱花</p>
                </div>
            </div>
            <div class="info">
                <div class="grid-demo text-center">
                    <div class="grids grids-small">
                        <a href="javascript:;" class="grid">
                            <div class="grid_icon">
                                <span class="ft75 bold black-color">50000</span>
                            </div>
                            <p class="grid_label ft65 dark1-color">
                                最大额度
                            </p>
                        </a>
                        <a href="javascript:;" class="grid">
                            <div class="grid_icon">
                            <span class="ft75 bold black-color">0.05%</span>
                            </div>
                            <p class="grid_label ft65 dark1-color">
                                每日利率
                            </p>
                        </a>
                        <a href="javascript:;" class="grid">
                            <div class="grid_icon">
                                <span class="ft75 bold black-color">3分钟</span>
                            </div>
                            <p class="grid_label ft65 dark1-color">
                                审批时间
                            </p>
                        </a>
                        <a href="javascript:;" class="grid">
                            <div class="grid_icon">
                                <span class="ft75 bold black-color">3-12个月</span>
                            </div>
                            <p class="grid_label ft65 dark1-color">
                                借款期限
                            </p>
                        </a>
                    </div>
                </div>
                <div class="grid-demo text-center">
                    <div class="grids grids-small">
                        <a href="javascript:;" class="grid">
                            <div class="grid_icon">
                                <span class="ft75 bold black-color">必须</span>
                            </div>
                            <p class="grid_label ft65 dark1-color">信用卡</p>
                        </a>
                        <a href="javascript:;" class="grid">
                            <div class="grid_icon">
                                <span class="ft75 bold black-color">无限制</span>
                            </div>
                            <p class="grid_label ft65 dark1-color">地域限制</p>
                        </a>
                        <a href="javascript:;" class="grid">
                            <div class="grid_icon">
                                <span class="ft75 bold black-color">必须</span>
                            </div>
                            <p class="grid_label ft65 dark1-color">要求征信</p>
                        </a>
                        <a href="javascript:;" class="grid">
                            <div class="grid_icon">
                                <span class="ft75 bold black-color">必须</span>
                            </div>
                            <p class="grid_label ft65 dark1-color">手机实名</p>
                        </a>
                    </div>
                </div>
            </div>
            <div class="info">
                <el-card class="bg-light short-remark process" shadow="never">
                    <h5>小云短评：</h5>
                    <p class="ft70">百度有钱花额度大（20w），利率低（年化18%），无杂费，要求信用较高，适合：有信用卡，贷款记录并且信用较好的客户，不适合：白户，黑户。</p>
                </el-card>
            </div>
            <div class="info">
                <el-card class="process" shadow="never">
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <h5>分享二维码：</h5>
                        </el-col>
                        <el-col :span="12" class="text-right">
                            <img class="va-mid" src="../assets/images/qr_code_light.png" width="32" @click="toShareCode()">
                        </el-col>
                    </el-row>
                </el-card>
            </div>
            <div class="info">
                <el-card class="process" shadow="never">
                    <h5>佣金结算说明：</h5>
                    <ol>
                        <li class="ft70">结算类型：{{loan.commission_rate}}</li>
                        <li class="ft70">结算周期：{{loan.commission_introduction}}</li>
                    </ol>
                </el-card>
            </div>
            <div class="info">
                <el-card shadow="never">
                    <h5>图文步骤：</h5>
                    <div class="img-flow" v-for="step in steps" :key="step.id">
                        <img :src="step.img" v-show="showProcessImage">
                        <p class="ft70">{{step.desc}}</p>
                    </div>
                    <el-button class="full-length" plain type="primary" @click="showProcessImage = !showProcessImage">{{ showProcessImage ? '隐藏图片' : '查看图片' }}</el-button>
                </el-card>
            </div>
            <div class="info">
                <el-card shadow="never">
                    
                    <el-row :gutter="20">
                        <el-col class="text-left" :span="12">
                            <h5>提问与评论：</h5>
                        </el-col>
                        <el-col class="text-right" :span="12">
                            <el-button size="mini" class="va-mid">查看全部</el-button>
                        </el-col>
                    </el-row>
                    <div style="height:8px"></div>
                    <el-card class="remark-flow"  v-for="remark in remarks" :key="remark.id">
                        <p class="ft75 bold">{{remark.nick_name}}：</p>
                        <p class="ft70">{{remark.content}}</p>
                        <img v-show="remark.showImage" v-for="(img, idx) in remark.imgs" :key="idx" :src="img">
                        <el-button class="full-length" plain type="primary" @click="remark.showImage = !remark.showImage">{{ remark.showImage ? '隐藏图片' : '查看评论图片' }}</el-button>
                    </el-card>
                </el-card>
            </div>
        </page-content>
    </div>
</template>

<style>
.p-img  {
    padding-top: 12px;
}
h5 {
    margin: .15rem 0;
}
.short-remark p {
    word-break: normal;
}
.info {
    border-bottom: 1px solid #f0f0f0;
    padding: 10px;
}
.full-length {
    width: 100%;
}
.p-img img {
    width: 100px;
    height: 100px;
    border-radius: 100px;
    border: 1px solid #e7e7e7;
}
.grid_icon {
    width: 100%;
}
.el-card__body {
    padding: 12px;
}
.process p {
    margin: .15rem 0;
}

ol {
    -webkit-padding-start: 20px;
    -webkit-margin-before: .15rem;
    -webkit-margin-after: .15rem;
}
.img-flow {
    margin: .15rem 0;
}
.img-flow img {
    width: 100%;
}
.remark-flow img {
    width: 100%;
}
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import Grid from '../components/grid'

export default {
    components: {
        SimpleHeader,
        'page-content': Content,
        Grid
    },
    created() {



    },
    data() {

        return {

            title: '百度有钱花',

            showProcessImage: false,

            loan: {

                commission_rate: '授信结算',

                commission_introduction: '每周五结算上周业绩，例如本周一 0:00 至 周日 23:59 办理的客户，均在下周周五结算，结算后佣金进入个人账户，申请提现后支付到绑定的支付宝账号。'

            },
            
            steps: [
                { id: 1, img: 'http://p7vsax0lb.bkt.clouddn.com/baidujie_step0.png', desc: '步骤1: 确认申请人' },
                { id: 2, img: 'http://p7vsax0lb.bkt.clouddn.com/baidujie_step1.png', desc: '步骤2: 验证手机号' },
                { id: 3, img: 'http://p7vsax0lb.bkt.clouddn.com/baidujie_step2.png', desc: '步骤3: 实名认证（身份证，银行卡）' }
            ],

            remarks: [
                { 
                    id: 1, 
                    imgs: [ 'http://p7vsax0lb.bkt.clouddn.com/baidujie_step0.png', 'http://p7vsax0lb.bkt.clouddn.com/baidujie_step1.png' ],
                    content: '请教一下这个步骤为何过不去？',
                    nick_name: '办卡高手',
                    member_id: 12,
                    showImage: false
                }
            ]

        }

    },
    methods: {

        toShareCode() {

            let url = 'http://qinggang.xinxingtianxia.com/loanDetail?id=' + this.loan.id

            this.$router.push({ path: '/qrcode', query: { url: url } })

        }

    }
}
</script>

<template>
    <div class="page">
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
                            <span class="ft75 bold">50000</span>
                        </div>
                        <p class="grid_label ft70">
                            最大额度
                        </p>
                    </a>
                    <a href="javascript:;" class="grid">
                        <div class="grid_icon">
                           <span class="ft75 bold">0.05%</span>
                        </div>
                        <p class="grid_label ft70">
                            每日利率
                        </p>
                    </a>
                    <a href="javascript:;" class="grid">
                        <div class="grid_icon">
                            <span class="ft75 bold">3分钟</span>
                        </div>
                        <p class="grid_label ft70">
                            审批时间
                        </p>
                    </a>
                    <a href="javascript:;" class="grid">
                        <div class="grid_icon">
                            <span class="ft75 bold">3-12个月</span>
                        </div>
                        <p class="grid_label ft70">
                            借款期限
                        </p>
                    </a>
                    </div>
            </div>
        </page-content>
    </div>
</template>

<style>
.p-img  {
    padding-top: 12px;
}
.info {
    border-bottom: 1px solid #f0f0f0;
    padding: 10px 0;
}
.p-img img {
    width: 120px;
    height: 120px;
    border-radius: 100px;
    border: 1px solid #e7e7e7;
}
.grid_icon {
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

            title: ''

        }

    },
    methods: {



    }
}
</script>

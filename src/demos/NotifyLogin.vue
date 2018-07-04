<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="提示登录" :back-link="true"></simple-header>
        <page-content>
            <div class="container">
                <div class="notibox text-center">
                    <div>
                        <img src="http://p7vsax0lb.bkt.clouddn.com/lock.png" width=100>
                    </div>
                    <div>
                        您尚未登录，无法操作！
                    </div>
                    <div>
                        <m-button type="warning" @click.native="goLogin">立即登录</m-button>
                    </div>
                </div>
            </div>
        </page-content>
    </div>
</template>
<style>
    .container {
        padding: 32px;
    }
    .notibox {
        border: 1px dashed #e7e7e7;
        border-radius: 12px;
        background: #f0f0f0;
        padding: 20px;
    }
    .notibox div {
        padding: 8px 0
    }
</style>

<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Button, ButtonGroup } from '../components/buttons'

export default {
    components: {
        SimpleHeader,
        'page-content': Content,
        ButtonGroup,
        'm-button': Button
    },
    data() {

        return {


        }

    },
    methods: {

        goLogin() {

            this.$router.push({ path: '/login' })

        }

    }

}
</script>

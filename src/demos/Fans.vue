<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="粉丝列表" :back-link="true"></simple-header>
        <page-content>
            <list>
                <list-item v-for="fan in fans" :key="fan.id">
                    <div class="item-media"><img :src="fan.portrait" width="66"></div>
                    <div class="item-content">
                        <div class="item-title-row">
                            <div class="item-title">{{fan.member_name}}</div>
                        </div>
                        <div class="item-subtitle">
                            {{fan.created_at}}
                        </div>
                    </div>
                </list-item>
            </list>
        </page-content>
    </div> 
</template>
<style scoped>
    .item-inner {
        padding: 0.5rem 0 0.5rem .75rem;
        border-top: 0;
    }
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Button, ButtonGroup } from '../components/buttons'
import { Form, FormItem } from '../components/form'
import { List, ListItem } from '../components/list'
import MemberApi from '@/api/member'
import Db from '@/db'

export default {

    components: {
        SimpleHeader,
        'page-content': Content,
        ButtonGroup,
        'm-button': Button,
        List,
        ListItem,
    },
    data() {
        
        return {

            fans: []

        }

    },
    created() {

        this.getList()

    },
    methods: {

        getList() {

            let memberInfo = Db.get('auth')

            MemberApi.listQuery({ reference: memberInfo.member_identity }).then(res => {

                if (res.ret == 200) {

                    this.fans = res.data.list

                }

            })

        }


    }

}
</script>

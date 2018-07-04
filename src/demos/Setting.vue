<template>
  <div class="my-page">
    <simple-header class="bg-org wt-color" title="设置" ></simple-header>
    <page-content>
        <list>
          <list-item>
            <div class="item-content" @click="logout()">
                <div class="item-title-row">
                    <div class="item-title ft75">退出登录</div>
                    <div class="item-after">
                      <icon icon="link"></icon>
                    </div>
                </div>
            </div>
          </list-item>
        </list>
    </page-content>
  </div>
</template>
<script>
import Content from '../components/content'
import { SimpleHeader } from '../components/header'
import { List, ListItem } from '../components/list'
import Icon from '../components/icons'
import { getToken, setToken, removeToken } from '@/utils/auth'
import Db from '@/db'

export default {

    created() {

        
    },

    components: {
        SimpleHeader,
        'page-content': Content,
        List,
        ListItem,
        Icon
    },

    data() {

        return {

            


        }

    },

    methods: {

        logout() {

            removeToken()

            Db.remove('auth')

            this.$router.push({ path: '/login' })

        }

    }

}
</script>

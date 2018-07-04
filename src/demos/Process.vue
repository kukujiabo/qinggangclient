<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="查询进度" :back-link="true"></simple-header>
        <page-content>
            <div class="slide-wrapper">
                <div class="grids grids-small">
                    <div class="grid" @click="goProcess(bank)" v-for="bank in banks" :key="bank.id">
                        <div class="grid_icon" >
                        <img :src="bank.thumbnail" alt="">
                        </div>
                        <p class="grid_label">{{bank.mname}}</p>
                    </div>
                </div>
            </div>
        </page-content>
    </div>
</template>

<style scoped> 
.grid_icon {
  width: 42px;
  height: 42px;
}
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import BankApi from '@/api/bank'

export default {

    components: {

        SimpleHeader,

        'page-content': Content

    },
    created() {

        BankApi.getAll({}).then(res => {

            if (res.ret == 200) {

                this.banks = res.data

            }

        })

    },
    data() {

        return {

            banks: []

        }

    },
    methods: {

        goProcess(bank) {

            window.location.href = bank.process_url

        }

    }
    
}
</script>
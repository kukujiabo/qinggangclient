<template>
  <div class="page">
    <simple-header :backText="''" class="bg-org wt-color" title="粉丝列表" :back-link="true"></simple-header>
    <page-content>

    </page-content>   
  </div>
</template>
<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'

export default {
    components: {
        SimpleHeader,
        'page-content': Content,
        ButtonGroup,
        'm-button': Button
    },
    created() {

    },
    data(){


    },
    methods: {

    }
}
</script>

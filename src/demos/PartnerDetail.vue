<template>
  <div class="page">
    <simple-header title="合伙人详情" class="bg-org wt-color" :back-link="true" :backText="''"></simple-header>
    <page-content>

    </page-content>
  </div>
</template>
<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'

export default {
    created() {


    },
    components: {
        SimpleHeader,
        'page-content': Content
    },
    data() {

      return {


      }

    },
    methods: {



    }
}
</script>

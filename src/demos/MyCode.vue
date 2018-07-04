<template>
    <div class="page">
        <simple-header :backText="''" class="bg-org wt-color" title="我的二维码" :back-link="true"></simple-header>
        <page-content>

        </page-content>
    </div> 
</template>
<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Button, ButtonGroup } from '../components/buttons'
import { Form, FormItem } from '../components/form'

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



    }

}
</script>

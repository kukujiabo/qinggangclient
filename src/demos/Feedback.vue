<template>
  <div class="page">
    <simple-header :backText="''" class="bg-org wt-color" title="意见反馈" :back-link="true"></simple-header>
    <page-content>
      <div class="tabs">
        <div class="text-center ft75" style="border-right:1px solid #f3f5f7" @click="switchTab(1)">
          <span v-bind:class="{ 'org-color' : tab == 1 }">反馈问题</span>
        </div>
        <div class="text-center ft75" style="border-right:1px solid #f3f5f7" @click="switchTab(2)">
          <span v-bind:class="{ 'org-color' : tab == 2 }">历史反馈</span>
        </div>
      </div>
      <div class="tab-item" v-show="tab == 1">
        <div class="text-wrapper">
          <textarea v-model="content" :rows="12" class="ft75" placeholder="请填写您的建议或问题，我们会尽快给您回复！"></textarea>
          <div style="height:10px"></div>
          <m-button type="warning" @click.native="addFeedback()">提交建议</m-button>
        </div>
      </div>
      <div class="tab-item"  v-show="tab == 2">
        <scroll :on-refresh="onRefresh" :on-infinite="onInfinite" :enableInfinite="feedbacks.length > 8">
          <div class='content-padded'>
              <div class="partner-item" v-for="feedback in feedbacks" :key="feedback.id">
                  <div>
                      <div class="ft75 feedback-itm">
                        <div>{{feedback.content}}</div>
                        <div class="ft65 bold">{{feedback.created_at}}</div>
                      </div>
                  </div>
              </div>
          </div>
        </scroll>
      </div>
      <preloader ref="preloader"></preloader>
      <alert :title="'提示'" :content="noticeTxt" ref="alert"></alert>
    </page-content> 
  </div>
</template>

<style scoped>
  .text-wrapper {
    padding: 8px;
  }
  .text-wrapper textarea {
    padding: 5px;
    border-radius: 5px;
    width: 100%;
    outline: none;
    border: 0;
    background: #f3f5f7;
  }

  .tabs {
    height: 45px;
    background: #f9f9f9;
    position: absolute;
    left: 0;
    right: 0;
    z-index: 1000;
    line-height: 45px;
    border-bottom: 1px solid #e7e7e7;
  }
  .tabs div {
    display: inline-block;
    width: 50%;
    float: left;
  }
  .tab-item {
      left: 0;
      right: 0;
      top: 45px;
      bottom: 0;
      position: absolute;
  }
  .scroll {
      bottom: 56px;
  }
  .feedback-itm {
    margin:3px;
    padding:10px 5px;
    background: #f3f5f7;
    border-radius: 3px;
  }
  .feedback-itm div {
    padding: 2px 3px;
  }
</style>


<script>
import { SimpleHeader } from '../components/header'
import Content from '../components/content'
import { Button, ButtonGroup } from '../components/buttons'
import MemberApi from '@/api/member'
import { Alert, Confirm, Prompt, Modal } from '../components/modal'
import Preloader from '../components/preloader'

export default {
    components: {
        SimpleHeader,
        'page-content': Content,
        ButtonGroup,
        'm-button': Button,
        Alert,
        Preloader
    },
    created() {

      this.getList(this.listQuery)

    },
    data(){

      return {

        tab: 1,

        feedbacks: [],

        content: '',

        listQuery: {

          page: 1,

          page_size: 20

        },

        noticeTxt: ''

      }

    },
    methods: {

      addFeedback() {

        if (!this.content || this.content.length < 6) {

          this.noticeTxt = '请至少填写6个字！'

          this.$refs.alert.open()

          return         

        }

        this.$nextTick(() => {

            this.showPreloader()
                
        })

        MemberApi.addFeedback({ content: this.content }).then(res => {

          this.hidePreloader()

          if (res.ret == 200 && res.data > 0) {

            this.noticeTxt = '反馈成功，我们会尽快联系您！'

            this.$refs.alert.open()

            this.onRefresh()

          }

          this.content = ''

        })

      },

      showPreloader () {

        this.$refs.preloader.open()

      },

      hidePreloader() {

        this.$refs.preloader.close()

      },

      getList(params, done) {

        MemberApi.getFeedbackList(params).then(res => {

          if (typeof done == 'function') {

            done()

          }

          if (res.ret == 200) {

            if (this.listQuery.page > res.data.page) {

              this.listQuery.page = res.data.page
 
            } else {

              res.data.list.forEach(el => {

                this.feedbacks.push(el)

              })

            }

          }

        })

      },

      switchTab(tab) {

        this.tab = tab

      },

      onRefresh(done) {

        this.listQuery.page = 1;

        this.feedbacks = []

        this.getList(this.listQuery, done)

      },

      onInfinite(done) {

        this.listQuery.page += 1

        this.getList(this.listQuery, done)

      }

    }

}
</script>

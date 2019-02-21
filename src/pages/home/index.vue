<template>
  <HelloWorld :list="list"/>
</template>

<script>
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld'
import fetch from '@/plugins/axios'
import Alert from '@/components/Alert'
import Toast from '@/components/Toast'
import Confirm from '@/components/Confirm'
let a = data => fetch.get('/api/list')
export default {
  name: 'home',
  data () {
    return {
      list: []
    }
  },
  components: {
    HelloWorld
  },
  beforeCreate () {
    // console.log('beforeCreate')
    // Alert({
    //   content: '你范德萨发份大礼上飞机发发发呆'
    // })
    Toast({
      content: '你好久供电局啊师傅'
    })
    // Confirm({
    //   content: '你范德萨肌肤肌肤减少大量放假了',
    //   title: 'confirm'
    // }).then((res) => {
    //   console.log(888888, res)
    // }).catch((res) => {
    //   console.log(res, '9999')
    // })
    axios.get('https://easy-mock.com/mock/5bae14d6254fc84a9987714d/api/list.do').then((res) => {
      console.log(res, 'res====')
    })
  },
  mounted () {
    // this.$toast('toast')
    this.$cookie.set('mobile', 11111111)
    // this.$request({
    //   url: '/api/list'
    // }).then((res) => {
    //   console.log(res, 'res')
    //   this.list = res.list
    // })
    // fetch('/api/list').then((res) => {
    //   console.log(res, 'res====')
    //   this.list = res.data.list
    // })
    this.getlist()
  },
  created () {
    console.log('created')
  },
  methods: {
    async getlist () {
      let result = await a()
      if (result.data.status === '0') {
        this.list = result.data.list
      }
      console.log(result, 'result')
    } 
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>

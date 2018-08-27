<template>
  <HelloWorld :list="list"/>
</template>

<script>
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld'
import fetch from '@/plugins/axios'
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
    console.log('beforeCreate')
  },
  mounted () {
    this.$toast('toast')
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

<template>
  <HelloWorld :list="list"/>
</template>

<script>
import axios from 'axios'
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'index',
  data () {
    return {
      list: []
    }
  },
  components: {
    HelloWorld
  },
  mounted () {
    this.$toast('toast')
    this.$request({
      url: '/list'
    })
    axios.post('/api/list').then((res) => {
      console.log(res.data, 'res====')
      this.list = res.data.list
    })
    axios.get('/api/user').then((res) => {
      console.log(res, 'res')
    })
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

</style>

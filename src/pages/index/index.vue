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
<style scoped>

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: block;
  margin: 30px 10px;
}

</style>

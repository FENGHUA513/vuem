<template>
  <div class="hello">
   <h1>{{msg}}</h1>
   <ul>
     <li v-for="(item, index) in list" :key="index">{{item}}</li>
   </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'vue + mock'
    }
  },
  props: {
    list: {
      type: Array
    }
  },
  mounted () {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
h1, h2 {
  font-weight: normal;
}
li {
  font-size: 40px;
}
</style>

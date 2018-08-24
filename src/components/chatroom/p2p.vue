<template>
  <div class="wrap">
    聊天室
  </div>
</template>

<script>
export default {
  name: 'chatroom',
  data () {
    return {
    }
  },
  components: {
    
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  mounted () {
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.wrap {
  width: 750px;
  margin: 0 auto;
  background-color: #f5f5f5;
}
</style>

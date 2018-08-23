<template>
  <div class="wrap">
    <header>
      <button @click="goRegist">请先注册</button>
    </header>
    <ul class="members">
      <li v-for="item in list"> <span class="nickname">{{item.nickname}} :</span><span class="message">{{item.message}}</span></li>
    </ul>
    <Register @registSuccess="registSuccess" v-if="registerPop"></Register>
  </div>
</template>

<script>
import Register from 'components/chatroom/register'
export default {
  name: 'chatroom',
  data () {
    return {
      list: [],
      registerPop: false
    }
  },
  components: {
    Register
  },
  beforeCreate () {
  },
  methods: {
    goRegist () {
      this.registerPop = true
    },
    registSuccess (res) {
      this.list.push({nickname: res.nickname})
      this.registerPop = false
    }
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
header {
  padding: 30px 0;
  text-align: center;
  width: 100%;
  font-size: 34px;
  border-bottom: solid red 2px;
  button {
    border: none;
    background-color: blue;
    color: #fff;
    border-radius: 8px;
    width: 200px;
    padding: 10px;
  }
}
.members {
  margin-top: 10px;
  li {
    line-height: 60px;
    padding: 0 20px;
    .nickname {

    }
    .message {
      float: right;
    }
  }
}
</style>

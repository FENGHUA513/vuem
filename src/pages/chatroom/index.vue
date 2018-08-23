<template>
  <div class="wrap">
    <header>
      <button @click="goRegist">请先注册</button>
    </header>
    <ul class="members">
      <li v-for="item in list"> <span class="nickname">{{item.nickname}} :</span><span class="message">{{item.message}}</span></li>
    </ul>
    <footer>
      <input placeholder="请输入" type="" name="">
      <button>发送</button>
    </footer>
    <Register @registSuccess="registSuccess" v-if="registerPop" :ws="ws"></Register>
  </div>
</template>

<script>
import Register from 'components/chatroom/register'
export default {
  name: 'chatroom',
  data () {
    return {
      list: [],
      registerPop: false,
      ws: ''
    }
  },
  components: {
    Register
  },
  created () {
    this.wsconnect() // 链接服务
  },
  methods: {
    goRegist () {
      this.registerPop = true
    },
    registSuccess (res) {
      this.list.push({nickname: res.nickname})
      this.registerPop = false
    },
    wsconnect () {
      this.ws = new WebSocket('ws://localhost:8081');
      this.ws.onopen = function() {
        console.log('链接服务器成功')
      }
      this.ws.onerror = function() {
        that.$toast('链接服务器失败')
      }
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
footer {
  position: fixed;
  bottom: 50px;
  width: 100%;
  // height: 100px;
  background-color: gray;
  padding: 30px 0;
  input {
    border: 1px solid red;
    margin-left: 30px;
    width: 500px;
    height: 80px;
  }
  button {
    background-color: blue;
    color: #fff;
    margin-left: 40px;
  }
}
</style>

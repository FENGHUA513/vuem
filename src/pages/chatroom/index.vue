<template>
  <div class="wrap">
    <header>
      <button @click="goRegist">请先注册</button><span>{{myName}}</span>
    </header>
    <ul class="members">
      <li v-for="item in list"><span class="message">{{item.message}}</span><span class="nickname"> :{{item.nickname}}</span></li>
    </ul>
    <footer>
      <input placeholder="请输入" type="" name="" v-model="message">
      <button @click="sendMessage">发送</button>
    </footer>
    <Register v-if="registerPop" :ws="ws"></Register>
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
      ws: '',
      message: '',
      myName: ''
    }
  },
  components: {
    Register
  },
  created () {
    let that = this
    this.wsconnect() // 链接服务
    this.ws.onmessage = function(res) {
      let data = JSON.parse(res.data)
      console.log(data, 'data')
      if (data.protocal === 'broadcast') {
        that.list.push({nickname: that.myName, message: that.message})
      } else if (data.protocal === 'register') {
        if (data.code === '1001') {
          that.$toast('该用户已存在')
        } else {
          that.$toast('恭喜注册成功')
          that.registerPop = false
          that.myName = data.nickname
        }
      } else if (data.protocal === 'p2p') {
        // 点对点的
      }
    }
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
    },
    sendMessage () {
      let that = this
      let jsonObj = {
        message: that.message,
        protocal: 'broadcast',
        language: 'zh'
      }
      that.ws.json = function(jsonObj) {
        let jsonStr = JSON.stringify(jsonObj)
        that.ws.send(jsonStr)
      } 
      console.log(this.ws)
      if (that.ws && that.ws.readyState === 1) {
         that.ws.json(jsonObj)
      } else {
        that.$toast('与服务器链接中断') 
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
  span {
    float: right;
    margin-right: 20px;
  }
}
.members {
  margin-top: 10px;
  li {
    line-height: 60px;
    padding: 0 20px;
    // float: right;
    p {
      float: right;
    }
    .nickname {
      color: green;
    }
    .message {
      font-size: 30px;
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

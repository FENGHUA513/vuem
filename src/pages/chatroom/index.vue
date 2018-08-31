<template>
  <div class="wrap">
    <header>
      <button @click="goRegist">注册</button><span>{{myName}}</span>
    </header>
    <Register v-if="registerPop" :ws="ws"></Register>
  </div>
</template>

<script>
import Register from 'components/chatroom/register'
export default {
  name: 'chatroom',
  data () {
    return {
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
    this.ws.onmessage = function(evt) {
      try {
        let data = JSON.parse(evt.data)
        console.log(data)
        switch (data.protocal){
          case 'register':
            switch(data.code){
              case '1000':
                that.myName = data.nickname
                that.$toast('恭喜注册成功')
                that.$router.push({name: 'ChatEn', params: {ws: that.ws, nickname: data.nickname}})
                break
              case '1001':
                that.$toast('用户名被占用了')
                break
              default:
                break
            }
          default:
            break
        }
      } catch (e) {
        console.log('解析服务器发送的数据失败')
      }
    }
  },
  methods: {
    goRegist () {
      this.registerPop = true
    },
    wsconnect () {
      this.ws = new WebSocket('ws://localhost:8081');
      let that = this
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
    cursor: pointer;
  }
  span {
    float: right;
    margin-right: 20px;
  }
}

footer {
  position: fixed;
  bottom: 50px;
  width: 100%;
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

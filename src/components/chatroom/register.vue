<template>
  <div class="register">
    <div class="box">
      <input type="text" name="" placeholder="请输入昵称" v-model="nickname">
      <button @click="confirmBtn">确定</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chatroom',
  data () {
    return {
      ws: '',
      users: [], //用户列表
      nickname: ''
    }
  },
  components: {
    
  },
  beforeCreate () {
    console.log('beforeCreate')
  },
  mounted () {
    let that = this
    this.ws = new WebSocket('ws://localhost:8081');
    this.ws.onopen = function() {
      console.log('链接服务器成功')
    }
    this.ws.onerror = function() {
      that.$toast('链接服务器失败')
    }
    this.ws.onmessage = function(res) {
        let data = JSON.parse(res.data)
        if (data.code === '1001') {
          that.$toast('该用户已存在')
        } else {
          that.$toast('恭喜注册成功')
          that.$emit('registSuccess', data)
        }
    }
  },
  methods: {
    confirmBtn () {
      let that = this
      let jsonObj = {
        nickname: this.nickname,
        protocal: 'register',
        language: 'zh'
      }
      this.ws.json = function(jsonObj) {
        let jsonStr = JSON.stringify(jsonObj)
        that.ws.send(jsonStr)
      } 
      console.log(this.ws)
      if (this.ws && this.ws.readyState === 1) {
         this.ws.json(jsonObj)
      } else {
        this.$toast('与服务器链接中断') 
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.register {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .6);
  .box {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -60%);
    width: 600px;
    height: 300px;
    background-color: #ffffff;
    text-align: center;
    padding-top: 40px;
    box-sizing: border-box;
    border-radius: 10px;
    input {
      width: 80%;
      height: 80px;
      display: block;
      border-radius: 10px;
      margin: 0 auto;
      font: inherit;
      vertical-align: baseline;
      box-sizing: border-box;
      outline: none;
      border: solid 2px #f5f5f5;
      background: transparent;
      -webkit-appearance: none;
      padding-left: 30px;
    }
    button {
      margin-top: 70px;
      background-color: red;
      width: 80%;
      height: 80px;
      border-radius: 10px;
      border: none;
      font-size: 34px;
      color: #fff;
    }
  }
}

</style>

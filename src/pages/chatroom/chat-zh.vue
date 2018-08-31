<template>
  <div class="wrap">
    <header>
      <button @click="goRegist">注册</button><span>{{nickname}}</span>
    </header>
    <div class='title'>
      <input placeholder="请输入发送的消息" type="" name="" v-model="message">
      <button @click="sendMessage">发送</button>
    </div>
    <ul class="content">
      <li v-for="item in list" :class="[item.language == 'zh' ? 'own':'any']"><img v-if="item.language!='zh'" :src="item.image" alt=""><span :class="[item.language == 'zh' ? 'own':'any']">{{item.message}}</span><img v-if="item.language=='zh'" :src="item.image" alt=""></li>
      <!--<li v-else class='any'><img :src="item.image" alt=""><span class="any">{{item.message}}</span></li>-->
    </ul>
    <Register v-if="registerPop" :ws="ws"></Register>
  </div>
</template>

<script>
import Register from 'components/chatroom/register'
import axios from 'axios'
import {md5} from '../../libs/md5'
import ajax from '../../plugins/ajax'
export default {
  name: 'chatroom',
  data () {
    return {
      registerPop: false,
      ws: '',
      message: '',
      nickname: '',
      list: []
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
//        console.log(data)
        switch (data.protocal){
          case 'register':
            switch(data.code){
              case '1000':
                that.nickname = data.nickname
                that.$toast('恭喜注册成功')
                that.registerPop = false
                break
              case '1001':
                that.$toast('用户名被占用了')
                break
              default:
                break
            }
            break;
          case 'broadcast':
            if (data.language == 'zh') {
              that.list.push({message: data.message, image: data.image, language: data.language})
            } else {
              that.translate(data)
            }
            break;
          case 'p2p':
            switch (data.code) {
              case '2000':
                that.translate(data)
                break
              case '2001':
                that.$toast('该用户不在线')
                break
              default:
                break
            }
            break;
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
    },
    sendMessage () {
      let that = this
      this.ws.json = function (jsonObj){
        let jsonStr = JSON.stringify(jsonObj)
        that.ws.send(jsonStr)
      }
      if (that.ws && that.nickname) {
        let regex = /^(.+):(.+)$/
        let txt = that.message
        let matches = regex.exec(txt)
        if (matches) {
          that.ws.json({
            protocal: 'p2p',
            language: 'zh',
            image: require('assets/111.jpg'),
            from: that.nickname,
            to: matches[1],
            message: matches[2]
          })
        } else {
          that.ws.json({
            protocal: 'broadcast',
            language: 'zh',
            from: that.nickname,
            image: require('assets/111.jpg'),
            message: that.message
          })
        }
      } else {
        that.$toast('与服务器链接中断')
      }
    },
    translate (data) {
      let md = md5('20180817000195588' + data.message + '12345678QNtcbQLcMllDv2w8Fvbz')
      let that = this
      ajax({
        url: 'http://api.fanyi.baidu.com/api/trans/vip/translate',
        method: 'jsonp',
        // dataType: 'json',
        data: {
          q: data.message, //encodeURI(contents.trim()),
          from: data.language,
          to: "zh",
          appid: 20180817000195588,
          salt: 12345678,
          sign: md
        },
        success (res) {
          var dstText = '';
          for (var i = 0; i < res.trans_result.length; i++) {
            dstText += res.trans_result[i].dst;
          }
          that.list.push({message: dstText, image: data.image, language: data.language})
        }
      })
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
.content {
  height: 690px;
  background-color: pink;
  overflow-y: auto;
  padding: 20px;
  list-style: none;
  li {
    margin: 10px 0;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      vertical-align: middle;
    }
    span {
      display: inline-block;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      padding: 0 10px;
      margin-right: 10px;
    }
    span.own {
      background: #9EEA6A;
      margin-right: 10px;
    }
    span.any {
      background: #fff;
      margin-left: 10px;
    }
  }
  li.own {
    text-align: right;
  }
  li.any {
    text-align: left;
  }
}
.title {
    width: 100%;
    background-color: #ccc;
    text-align: center;
    padding: 30px 0;
  input {
    border: 1px solid red;
    margin-left: 30px;
    width: 500px;
    height: 50px;
  }
  button {
    width: 100px;
    height: 50px;
    background-color: #B3D33F;
    color: #fff;
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>

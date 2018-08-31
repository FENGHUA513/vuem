<template>
  <div class='chat'>
    <div class='title'>
      <input placeholder="请输入发送的消息" type="" name="" v-model="message">
      <button @click="sendMessage">发送</button>
    </div>
    <ul class="content">
      <li v-if="flag" v-for="item in list" :class="{own:flag, any:!flag}"><span :class="{own:flag, any:!flag}">{{item.message}}</span><img :src="item.image" alt=""></li>
      <li v-if="!flag" v-for="item in list" :class="{own:flag, any:!flag}"><img :src="item.image" alt=""><span :class="{own:flag, any:!flag}">{{item.message}}</span></li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import md5 from 'libs/md5.min'
  export default {
    name: 'chat',
    data () {
      return {
        ws: '',
        message: '',
        nickname: '',
        list: [],
        flag: true
      }
    },
    components: {
    },
    mounted () {
      this.ws = this.$route.params.ws
      this.nickname = this.$route.params.nickname
      let that = this
      this.ws.onmessage = function (evt){
        try{
          let data = JSON.parse(evt.data)
          switch (data.protocal){
            case 'broadcast':
              if (data.language == 'zh') {
                that.flag = true
                that.list.push({message: data.message, image: data.image})
                //("<li><img src='" + data.image + "' alt=''><span class='own'>" + data.message + "</span></li>")
              } else {
                that.flag = false
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
              break;
          }
        } catch (e){
          console.log('解析服务器发送的数据失败')
        }
      }
    },
    methods: {
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
        var md = md5('20180817000195588' + data.message + '12345678QNtcbQLcMllDv2w8Fvbz')
        this.$request({
          type: "get",
          async: false, //must be synchronized
          url: "http://api.fanyi.baidu.com/api/trans/vip/translate",
          dataType: "jsonp",
          data: {
            q: data.message, //encodeURI(contents.trim()),
            from: data.language,
            to: "zh",
            appid: 20180817000195588,
            salt: 12345678,
            sign: md
          },
        }).then((json) => {
          console.log(json, 'res')
//          this.list = json.list
//          var dstText = '';
//          for (var i = 0; i < json.trans_result.length; i++) {
//            dstText += json.trans_result[i].dst;
//          }
//          $('#content').append("<li style='text-align:right;'><span class='else'>" + dstText + "</span><img src='" + data.image + "' alt=''></li>")
        })
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.chat{
  width: 800px;
  height: 800px;
  margin: 50px auto;
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

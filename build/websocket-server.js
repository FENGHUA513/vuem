var ws = require('nodejs-websocket');
var fs = require('fs');
var users = {}
var server = ws.createServer(function(conn) {
    console.log('new conneciton');
    conn.json = function(jsonObj) {
      var jsonStr = JSON.stringify(jsonObj)
      conn.sendText(jsonStr)
    }
    conn.on("text", function(str) {
      try {
        data = JSON.parse(str)
        switch (data.protocal) {
          case 'register':
            // 做用户注册的处理逻辑
            var username = data.nickname
            if (users[username]) {
                // 告诉客户端，当前用户名已存在
                return conn.json({
                    protocal: 'register',
                    language: 'zh',
                    code: '1001',
                    message: '用户名已存在'
                })
            }
            // 用户注册成功，将用户名和该用户对应的 Socket 对象保存起来（映射关系）
            users[username] = conn

            // 注册成功，告诉客户端，OK了
            conn.json({
                protocal: 'register',
                language: 'zh',
                code: '1000',
                nickname: username,
                message: '恭喜注册成功'
            })
            console.log('注册成功了')
            break
          case 'broadcast':
            // 做广播消息处理
              conn.json({
                  protocal: 'broadcast',
                  language: data.language,
                  message: data.message
              })
            break
          case 'p2p':
            // 做点对点消息处理
            // 先判定一下，当前用户是否在线，如果有，直接将消息发送该用户
            var toUser = users[data.to]
            // 如果没有，告诉客户端，该用户不存在
            if (!toUser) {
              return conn.json({
                protocal: 'p2p',
                language: 'zh',
                code: '2001',
                message: '用户不在线'
              })
            }

            toUser.json({
              protocal: 'p2p',
              language: data.language,
              code: '2000',
              message: data.from + '：' + data.message
            })

            break
          default:
            break
        }
      } catch (e) {
        console.log('解析客户端发送的数据失败')
      }



        // broadcast(server, str);
    });
    conn.on("close", function(code, reason) {
      console.log('connection closed');
    })
    conn.on("error", function(code, reason) {
      console.log('有客户端异常退出了');
    })
}).listen(8081);

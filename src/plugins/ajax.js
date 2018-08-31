export default function ajax(obj) {
  // 创建XHR对象
  let xhr = new window.XMLHttpRequest()
  // 通过params()将名值对转换成字符串
  obj.data = params(obj.data)
  if (!obj.method) {
    obj.method = 'get'
  }
  // 若是GET请求，则将数据加到url后面
  if (obj.method === 'get' || obj.method === 'jsonp') {
    obj.url += (obj.url.indexOf('?') === -1 ? '?' : '&') + obj.data
  }
  // 默认cache false
  if (obj.cache !== true) {
    obj.url += (obj.url.indexOf('?') === -1 ? '?' : '&') + '_=' + new Date().getTime()
  }

  if (obj.method === 'jsonp') {
    createJsonp(obj)
    return
  }

  obj.async = obj.async !== false
  // async 默认开启
  if (obj.async !== false) {
    // 使用异步调用的时候，需要触发readystatechange 事件
    xhr.onreadystatechange = function () {
      // 判断对象的状态是否交互完成
      if (xhr.readyState === 4) {
        callback()
      }
    }
  }
  // 在使用XHR对象时，必须先调用open()方法，
  // 它接受三个参数：请求类型(get、post)、请求的URL和表示是否异步。
  xhr.open(obj.method, obj.url, obj.async)
  if (obj.method === 'post') {
    // post方式需要自己设置http的请求头，来模仿表单提交。
    // 放在open方法之后，send方法之前。
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    // post方式将数据放在send()方法里
    xhr.send(obj.data)
  } else {
    // get方式则填null
    xhr.send(null)
  }
  // 同步
  if (obj.async === false) {
    callback()
  }

  function callback() {
    // 判断http的交互是否成功，200表示成功
    if (xhr.status === 200) {
      let response = xhr.responseText
      if (obj.dataType === 'json') {
        response = JSON.parse(response)
      }
      obj.success && obj.success(response)
    } else {
      obj.error && obj.error(xhr.status, xhr.statusText)
    }
  }
}

let __id = 0
function createJsonp(obj) {
  let url = obj.url
  let callbackName = '__cb__' + __id
  url += '&callback=' + callbackName

  window[callbackName] = function (response) {
    obj.success && obj.success(response)
  }

  let sc = document.createElement('script')
  sc.type = 'text/javascript'
  sc.async = 'async'

  sc.onload = sc.onreadystatechange = function () {
    if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
      try {
        delete window[callbackName]
      } catch (e) {
      }
      sc.onload = sc.onreadystatechange = null
    }
  }

  sc.onerror = function () {
    obj.error && obj.error(0)
    try {
      delete window[callbackName]
    } catch (e) {
    }
    sc.onerror = null
  }

  sc.src = url
  document.getElementsByTagName('head')[0].appendChild(sc)
}

// 名值对转换为字符串
function params(data) {
  let arr = []
  for (let i in data) {
    // 特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理
    arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]))
  }
  return arr.join('&')
}
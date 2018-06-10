import axios from 'axios'
import qs from 'qs'
import { md5 } from '../libs/encrypt_md5'

const config = {
  timeout: 6000,
  headers: {
    lang: 'zh',
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

function fixURL (url, type) {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'release') {
    if (type === 'r') {
      return `${window.location.origin}/api/v2${url}`
    } else if (type === 'c') {
      return `${window.location.origin}/api/chariot${url}`
    } else if (type === 'm') {
      return `${window.location.origin}/api/mocar${url}`
    } else if (type === 'u') {
      return `${window.location.origin}/api/ads-unicorn${url}`
    } else if (type === 'a') {
      return `${window.location.origin}/api/activity${url}`
    } else if (type === 'api') { // 请求跟api平级
      return `${window.location.origin}/api${url}`
    } else if (type === 'ad') {
      return `${window.location.origin}/api/ads-hermes${url}`
    } else if (type === 'pan') {
      return `${window.location.origin}/api/pandora${url}`
    } else if (type === 'wx') {
      return `${window.location.origin}/api/wechat${url}`
    }
  } else {
    return url
  }
}

function getEption (mobile, time) {
  return md5(`${mobile}#${time}`).substring(2, 7)
}

function checkResponse (response, notice) {
  console.log('response', response)
  return new Promise((resolve, reject) => {
    let code = response.code
    if (code === 0 || code === 2000 || code === '0' || code === '1' || code === '2' || code === 2 || code === '200') {
      // let data = response.data || response.object || ''
      resolve(response)
    } else {
      if (notice) {
        // 提示信息
        console.log('response-notice', notice)
      }
      reject(response)
    }
  })
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {object} [options]         The options we want to pass to axios
 * @param  {string} [options.url]     请求的url地址（必须）
 * @param  {string} [options.method]  请求方式， get or post，默认post
 * @param  {object} [options.data]    请求参数
 * @param  {number} [options.timeout] 请求超时时间
 * @param  {boolean} [options.notice] 请求失败是否显示提示，默认true
 * @return {object}                   promise对象
 */
function request (options = {}) {
  let {
    url,
    method,
    data,
    timeout,
    headers,
    notice,
    type,
    dataType
  } = options
  method = method || 'post'
  data = data || {}
  timeout = timeout || config.timeout
  headers = Object.assign({}, config.headers, headers)
  notice = notice === undefined ? true : notice
  // 请求类型，c - car r - ride
  type = type || 'r'
  dataType = dataType || 'formdata'
  // 默认传参为formdata的格式，目前post请求存在传json情况
  var time = +new Date() + ''

  // 处理登录参数
  if (data.mobileNo) {
    headers.eption = getEption(data.mobileNo, time)
    headers.time = time
    // headers.mainSource = 3002
  }
  let result = {}
  // 请求类型判断
  if (method === 'get') {
    result = new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url: fixURL(url, type),
        params: data,
        timeout,
        headers
      })
      .then((res) => {
        checkResponse(res.data, notice).then((data) => {
          resolve(data)
        })
        .catch((data) => {
          reject(data)
        })
      })
      .catch((data) => {
        reject(data)
      })
    })
  } else if (method === 'post') {
    result = new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: fixURL(url, type),
        data: dataType === 'json' ? data : qs.stringify(data),
        timeout,
        headers
      })
      .then((res) => {
        checkResponse(res.data, notice).then((data) => {
          resolve(data)
        })
        .catch((data) => {
          reject(data)
        })
      })
      .catch((data) => {
        reject(data)
      })
    })
  }

  return result
}

export default request

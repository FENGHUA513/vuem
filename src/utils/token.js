import axios from 'axios'
import qs from 'qs'
import { getEption } from './md5'

const config = {
  timeout: 10000,
  headers: {
    lang: window.LANG,
    'Content-Type': 'application/x-www-form-urlencoded',
    // accesstoken: window.localStorage.getItem('authtoken'),
    'X-Requested-With': 'XMLHttpRequest'
  }
}

function fixURL (url, type) {
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'release') {
    if (type === 'r') {
      return `${window.location.origin}/api/v2${url}`
    } else if (type === 'c') {
      return `${window.location.origin}/api/chariot${url}`
    } else if (type === 'o') {
      return `${window.location.origin}/openapi/partner${url}`
    } else if (type === 'op') {
      return `${window.location.origin}/openapi/mobike-api${url}`
    }
  } else {
    return url
  }
}

function checkResponse (response, notice) {
  console.log('response', response)
  return new Promise((resolve, reject) => {
    let code = response.code
    if (code === 0 || code === 2000 || code === '0' || code === -1) {
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
    type
  } = options

  method = method || 'post'
  data = data || {}
  timeout = timeout || config.timeout
  headers = Object.assign({}, headers, config.headers)
  notice = notice === undefined ? true : notice
  // 请求类型，c - car r - ride
  type = type || 'r'

  let result = {}
  let authtoken = window.localStorage.getItem('authtoken')
  let mobileNo = window.localStorage.getItem('mobileNo')
  let time = +new Date()
  let eption = getEption(mobileNo, time)
  headers.platform = 99
  headers.subSource = 99
  headers.eption = eption
  headers.mobileNo = mobileNo
  headers.lang = 'zh'
  headers.time = time
  if (authtoken !== null) {
    headers.accesstoken = authtoken
  }
  if (url.indexOf('uploadFileToTencent') > 0) {
    let s = 'Content-Type'
    headers[s] = 'multipart/form-data; boundary=-----------------------------23659361659'
  }
  if (url.indexOf('deleteGiftActionConfig') > 0) {
    let s = 'Content-Type'
    headers[s] = 'application/x-www-form-urlencoded'
  }
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
    let param = ''
    let form = new FormData()
    if (url.indexOf('uploadFileToTencent') > 0) {
      form.append('files', data.file)
      form.append('countryFlag', data.countryFlag)
    } else {
      param = qs.stringify(data)
      console.log(param)
    }
    result = new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url: fixURL(url, type),
        data: param || form,
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

import axios from 'axios'

const baseURL = ''


const instance = axios.create()

instance.defaults.timeout = 30000 // 所有接口30s超时

// 请求统一处理
instance.interceptors.request.use(async config => {
  if (config.url && config.url.charAt(0) === '/') {
    config.url = `${baseURL}${config.url}`
  }

  return config
}, error => Promise.reject(error))

// 对返回的内容做统一处理
instance.interceptors.response.use(response => {
  if (response.status === 200) {
    if (response.data.code === 0) {
      
    }
    return response
  }
  return Promise.reject(response)
}, error => {
  if (error) {
    console.log(JSON.stringify(error))
  } else {
    console.log('网络繁忙 请稍后再死')
  }
  return Promise.reject(error)
})

export default instance

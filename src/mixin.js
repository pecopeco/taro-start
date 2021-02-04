import { computed } from 'vue'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import Fly from 'flyio/dist/npm/wx'
import dayjs from 'dayjs'
import store from '@/store'

const fly = new Fly()

export default () => {
  
  // api配置
  const config = { api: 'https://baidu.com' }

  // 日期处理函数
  const day = dayjs

  // 跳转
  const go = (key, replace = false, encode = false) => {
    let url
    if (typeof key === 'string') {
      url = `/pages/${key}/${key}`
    } else {
      url = `/pages/${key.path}/${key.path}`
      let queryArr = []
      for (let item in key.query) {
        queryArr.push(`${item}=${encode ? encodeURIComponent(key.query[item]) : key.query[item]}`)
      }
      url = `/pages/${key.path}/${key.path}?${queryArr.join('&')}`
    }
    replace ? Taro.redirectTo({url: url}) : Taro.navigateTo({url: url})
  }

  // 返回
  const goBack = (key = 1) => {
    Taro.navigateBack({
      delta: key
    })
  }

  // 获取路由参数
  const query = getCurrentInstance().router && getCurrentInstance().router.params

  // toast
  const toast = (text, delay = 1500) => {
    Taro.showToast({ title: text, icon: 'none', duration: delay })
  }

  // http配置
  const http = (url, form = {}, type) => {
    url = url.indexOf("http") !== -1 ? url : config.api + url
    return fly.request(url, form, {
      method: type,
      headers: {
        token: 'xxxxxxxxxxxx'
      },
      timeout: 10000
    }).then((res) => {
      if (res.status === 200) {
        return res.data
      } else {
        toast(`请求错误：${res.message}，状态码：${res.status}`)
      }
    }).catch((err) => {
      toast(`请求错误：${err.message}，状态码：${err.status}`)
    })
  }
  http.get = (url, form) => http(url, form, 'get')
  http.post = (url, form) => http(url, form, 'post')
  http.delete = (url, form) => http(url, form, 'delete')
  http.put = (url, form) => http(url, form, 'put')

  // 表单验证
  const validate = (arr) => {
    let err = {}
    arr.some((item) => {
      // 数字转换字符串
      if (typeof (item.key) === 'number') {
        item.key = item.key.toString()
      }
      // 验证非空
      if (!item.key || item.key.match(/^[ ]+$/)) {
        err[item.type] = true
        err.msg = '请填写' + item.name
        return true
      }
      // 验证姓名
      if (item.type === 'name' && (!/^[\u4e00-\u9fa5]+$/.test(item.key) || item.key.length < 2)) {
        err[item.type] = true
        err.msg = '请输入正确的' + item.name
        return true
      }
      // 验证手机号
      if (item.type === 'phone' && !(item.key.length === 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/.test(item.key))) {
        err[item.type] = true
        err.msg = '请输入正确的' + item.name
        return true
      }
      // 验证身份证号
      if (item.type === 'idCard' && !/^\d{6}(19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(item.key)) {
        err[item.type] = true
        err.msg = '请输入正确的' + item.name
        return true
      }
      // 验证金额
      if (item.type === 'price' && ((!Number.isFinite(Number(item.key)) || Number(item.key) <= 0) || (item.key.split('.')[1] && item.key.split('.')[1].length > 2))) {
        err.msg = '请输入正确的' + item.name
        return true
      }
      // 验证密码必须为数字或字母
      if (item.type === 'password' && (!/^[0-9a-zA-Z]+$/.test(item.key) || item.key.length < 6)) {
        err[item.type] = true
        err.msg = item.key.length < 6 ? '密码至少为6位' : '密码必须包含数字或字母'
        return true
      }
    })
    return err.msg || ''
  }

  // 防抖
  let debounceTimer
  const debounce = function (func, delay = 1000) {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
      debounceTimer = null
    }
    let callNow = !debounceTimer
    debounceTimer = setTimeout(() => {
      debounceTimer = null
    }, delay)
    if (callNow) {
      func.apply(this, arguments)
    }
  }

  // 深拷贝
  const cleanCopy = (obj) => {
    return JSON.parse(JSON.stringify(obj))
  }

  // 判断是否是数字
  const isNum = (key) => {
    return typeof key === 'number' && isFinite(key)
  }
  
  // 计算属性
  const userInfo = computed(() => {
    return store.state.userInfo
  })

  // 系统是否是ios
  const isIos = wx.getSystemInfoSync().platform !== 'android'

  return {
    Taro,
    store,
    config,
    day,
    go,
    goBack,
    query,
    toast,
    config,
    http,
    validate,
    debounce,
    cleanCopy,
    isNum,
    userInfo,
    isIos
  }
}
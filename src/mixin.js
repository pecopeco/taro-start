import Taro from '@tarojs/taro'
import Fly from 'flyio/dist/npm/wx'
import dayjs from 'dayjs'

let fly = new Fly()

let config = {
  api: 'https://baidu.com'
}

export default {
  components: {
  },
  data () {
    return {
      query: '',
      debounceTimer: '',
      day: dayjs
    }
  },
  filters: {
  },
  methods: {
    go (key) {
      let url
      if (typeof key === 'string') {
        url = `/pages/${key}/index`
      } else {
        url = `/pages/${key.path}/index`
        let queryArr = []
        for (let item in key.query) {
          queryArr.push(`${item}=${key.query[item]}`)
        }
        wx.setStorage({key: key.path, data: queryArr.join('&')})
      }
      Taro.navigateTo({url: url})
    },
    goBack (key = -1) {
      Taro.navigateBack({
        delta: 2
      })
    },
    getQuery () {
      let pages = getCurrentPages()
      if (pages.length) {
        let pageName = pages[pages.length - 1].is.split('/')[1]
        return new Promise((resolve) => {
          wx.getStorage({
            key: pageName,
            success: (res) => {
              let obj = {}
              res.data.split('&').map((item) => {
                obj[item.split('=')[0]] = item.split('=')[1]
              })
              this.query = obj
              wx.removeStorage({key: pageName})
              resolve(obj)
            }
          })
        })
      }
    },
    toast (text, delay = 1500) {
      Taro.showToast({ title: text, icon: 'none', duration: delay || 1000 })
    },
    http (url, form = {}, type) {
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
          this.toast(`请求错误：${res.message}，状态码：${res.status}`)
        }
      }).catch((err) => {
        this.toast(`请求错误：${err.message}，状态码：${err.status}`)
      })
    },
    setHttp () {
      this.http.get = (url, form) => this.http(url, form, 'get')
      this.http.post = (url, form) => this.http(url, form, 'post')
      this.http.delete = (url, form) => this.http(url, form, 'delete')
      this.http.put = (url, form) => this.http(url, form, 'put')
    },
    // 表单验证
    validate (arr) {
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
    },
    // 防抖
    async debounce (func, delay = 1000) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer)
      }
      let callNow = !this.debounceTimer
      this.debounceTimer = setTimeout(() => {
        this.debounceTimer = null
      }, delay)
      if (callNow) {
        func.apply(this, arguments)
      }
    },
    // 获取url参数
    getQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let param = location.search || location.hash
      let r = param.substr(1).match(reg)
      if (param.split(name).length > 2 && r) {
        param = '?' + param.split(r[0])[param.split(r[0]).length - 1]
        r = param.substr(1).match(reg)
      }
      if (r !== null) return unescape(r[2])
      return null
    }
  },
  computed: {
    userInfo () {
      return this.$store.state.userInfo
    }
  },
  watch: {
  },
  mounted () {
    this.setHttp()
  },
  beforeDestory () {
  }
}

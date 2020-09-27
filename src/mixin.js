import fly from 'flyio'
import moment from 'moment'

export default {
  components: {
  },
  data () {
    return {
      debounceTimer: '',
      moment: moment()
    }
  },
  filters: {
  },
  methods: {
    go (path) {
      this.$router.push(path)
    },
    goBack (key = -1) {
      this.$router.go(key)
    },
    toast (text, delay = 1500) {
      this.$toast({message: text, duration: delay})
    },
    http (url, form = {}, type) {
      url = url.indexOf("http") !== -1 ? url : api + url
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
          this.toast(`请求错误：${res.message}\n状态码：${res.status}`)
        }
      }).catch((err) => {
        this.toast(`请求错误：${err.message}\n状态码：${err.status}`)
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

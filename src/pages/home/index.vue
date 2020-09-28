<template lang="pug">
.home
  image.logo.active(@tap="submit()" src="@/assets/logo.png")
  .msg {{msg}}
  button.btn(@tap="go({path: 'detail', query: {id: 1}})") go detail
  button.btn(@tap="debounce(submit)") 提交
  loading
</template>

<script>
import loading from '@/components/loading'

export default {
  name: 'home',
  components: {
    loading
  },
  data() {
    return {
      msg: 'vue 3'
    }
  },
  methods: {
    async submit () {
      let res = await this.http.get('/hehe')
      console.log(res)
    }
  },
  mounted () {
    console.log(this.userInfo)
  }
}
</script>

<style vars lang="stylus">

.home {
  .logo {
    width 100px
    height 100px
  }
  .msg {
    color theme
  }
}
</style>
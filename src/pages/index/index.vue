<template lang="pug">
  .home
    img.logo.active(src="/@/assets/logo.png")
    .msg {{msg}}
    .btn(@click="go('/detail')") go detail
    .btn(@click="debounce(submit)") 提交
</template>

<script>
export default {
  name: 'home',
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
  }
}
</script>

<style scoped vars lang="stylus">

.home {
  .logo {
    width 1rem
  }
  .msg {
    color theme
  }
}
</style>
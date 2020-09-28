<template lang="pug">
.home
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
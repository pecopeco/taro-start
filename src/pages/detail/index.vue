<template lang="pug">
.detail
  button.btn(@tap="goBack") 返回
</template>

<script>
export default {
  name: 'detail',
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
  onLoad (option) {
  }
}
</script>

<style vars lang="stylus">

.detail {
  .logo {
    width 100px
    height 100px
  }
  .msg {
    color theme
  }
}
</style>
<template lang="pug">
.home
  text {{ msg.text }}
  button(@tap="go({path: 'detail', query: {from: 'home'}})") go detail
</template>

<script>
import { ref, onMounted } from 'vue'
import mixin from '@/mixin.js'

export default {
  setup () {
    const { store, day, go, query, http, userInfo } = mixin()
    const msg = ref({text: 'Hello world'})
    const getData = async () => {
      await http.get('/hehe')
      store.dispatch('setUser', 'teng')
      console.log('getData', query(), msg.value.text, userInfo.value, day().format('YYYY年MM月DD HH:mm:ss'))
    }
    return {
      go,
      msg,
      getData
    }
  },
  onShow () {
    const setup = this.$options.setup()
    setup.getData()
  }
}
</script>

<style vars lang="stylus">

.home {
}
</style>
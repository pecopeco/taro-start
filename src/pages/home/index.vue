<template lang="pug">
.home
  text {{ msg.text }}
  button(@tap="go({path: 'detail', query: {from: 'home'}})") go detail
  loadingWrap
</template>

<script>
import { ref } from 'vue'
import mixin from '@/mixin.js'
import loadingWrap from '@/components/loadingWrap'

export default {
  components: {
    loadingWrap
  },
  setup () {
    const { store, day, go, query, http, userInfo } = mixin()

    const msg = ref({text: 'Hello world'})

    const getData = async () => {
      await http.get('/hehe')
      store.dispatch('setUser', 'teng')
      console.log('getData', query, msg.value.text, userInfo.value, day().format('YYYY年MM月DD HH:mm:ss'))
    }
    getData()
    
    return {
      go,
      msg
    }
  },
  onShow () {
    console.log(this.msg.text)
  }
}
</script>

<style vars lang="stylus">

.home {
}
</style>
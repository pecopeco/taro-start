<template lang="pug">
.home
  text {{ msg.text }}
  button(@tap="go({path: 'detail', query: {from: 'home'}})") go detail
  loading
</template>

<script>
import { ref } from 'vue'
import mixin from '@/mixin.js'
import loading from '@/components/loading'

export default {
  components: {
    loading
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
    console.log(this)
  }
}
</script>

<style vars lang="stylus">

.home {
}
</style>
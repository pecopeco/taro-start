<template lang="pug">
.detail
  view {{ msg }}
  view get query: {{query.from}}
</template>

<script>
import { ref } from 'vue'
import mixin from '@/mixin.js'

export default {
  setup () {
    const { query } = mixin()
    
    const msg = ref('Hello world: detail')
    console.log(query)
    
    return {
      msg,
      query
    }
  },
  onShow () {
    console.log(this.query.from)
  }
}
</script>

<style vars lang="stylus">

.detail {
}
</style>

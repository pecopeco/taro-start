<template lang="pug">
.my
  text {{ msg }}
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    const msg = ref('Hello world: my')
    return {
      msg
    }
  }
}
</script>

<style vars lang="stylus">

.my {
}
</style>
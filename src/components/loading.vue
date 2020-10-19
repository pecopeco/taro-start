<template lang="pug">
.loading
  AtButton(loading type="secondary")
</template>

<script>
import { AtButton } from 'taro-ui-vue3'

export default {
  components: {
    AtButton
  }
}
</script>

<style vars lang="stylus">

.loading {
  display flex
  align-items center
  justify-content center
  width 100%
  height 200px
  .at-button {
    background transparent
    border none
  }
}
</style>

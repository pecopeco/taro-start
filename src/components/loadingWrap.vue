<template lang="pug">
.loading
  van-loading(type="circular" :size="size" :color="color")
</template>

<script>

export default {
  components: {
  },
  props: {
    showLoading: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: '24px'
    },
    color: {
      type: String,
      default: '#1989fa'
    }
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
}
</style>

<template lang="pug">
.loading
  van-loading(type="circular" size="24px" color="#1989fa")
</template>

<script>

export default {
  name: 'loading',
  props: {
  },
  components: {
  },
  data () {
    return {}
  },
  methods: {
  },
  mounted () {
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

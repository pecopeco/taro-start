<template lang="pug">
.detail
  .query {{query.id}}
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
      query: ''
    }
  },
  methods: {
  },
  onLoad (option) {
    this.query = option
  }
}
</script>

<style vars lang="stylus">

.detail {
}
</style>
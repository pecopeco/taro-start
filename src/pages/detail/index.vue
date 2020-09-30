<template lang="pug">
.detail
  .query {{query.id}}
  .date {{day().format('YYYY年MM月DD HH:mm:ss')}}
</template>

<script>
export default {
  name: 'detail',
  data() {
    return {
    }
  },
  methods: {
  },
  async mounted () {
    await this.getQuery()
    console.log(this.query)
  }
}
</script>

<style vars lang="stylus">

.detail {
}
</style>
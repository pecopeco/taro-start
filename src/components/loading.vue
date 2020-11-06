<template lang="pug">
.loading-wrap
  .loading
</template>

<script>

export default {
  components: {
  },
  props: {
    color: {
      type: String,
      default: '#0dc5c1'
    },
    background: {
      type: String,
      default: '#f6f7f9'
    }
  }
}
</script>

<style vars="{ color, background }" lang="stylus">

.loading-wrap {
  display flex
  align-items center
  justify-content center
  min-height 300px
  .loading {
    position relative
    width 10em
    height 10em
    box-shadow inset 0 0 0 1em
    border-radius 50%
    font-size 11px
    text-indent -99999em
    color var(--color)
    transform translateZ(0)
    transform scale(0.5)
    &:before {
      position absolute
      content ''
      width 5.2em
      height 10.2em
      background var(--background)
      border-radius 10.2em 0 0 10.2em
      top -0.1em
      left -0.1em
      transform-origin 5.1em 5.1em
      animation loading 1.5s infinite ease 1.2s
    }
    &:after {
      position absolute
      content ''
      width 5.2em
      height 10.2em
      background var(--background)
      border-radius 0 10.2em 10.2em 0
      top -0.1em
      left 4.9em
      transform-origin 0.1em 5.1em
      animation loading 1.5s infinite ease
    }
  }
  @keyframes loading {
    0% {
      transform rotate(0deg)
    }
    100% {
      transform rotate(360deg)
    }
  }
}
</style>

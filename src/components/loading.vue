<template lang="pug">
.loading(:style="{color: color}")
</template>

<script>

export default {
  components: {
  },
  props: {
    size: {
      type: String,
      default: '24px'
    },
    color: {
      type: String,
      default: '#0dc5c1'
    }
  }
}
</script>

<style vars>

.loading,
.loading:before,
.loading:after {
  border-radius: 50%;
}
.loading {
  font-size: 11px;
  text-indent: -99999em;
  margin: 55px auto;
  position: relative;
  width: 10em;
  height: 10em;
  box-shadow: inset 0 0 0 1em;
  transform: translateZ(0);
  transform: scale(0.5);
}
.loading:before,
.loading:after {
  position: absolute;
  content: '';
}
.loading:before {
  width: 5.2em;
  height: 10.2em;
  background: #f6f7f9;
  border-radius: 10.2em 0 0 10.2em;
  top: -0.1em;
  left: -0.1em;
  transform-origin: 5.1em 5.1em;
  animation: load 1.5s infinite ease 1.2s;
}
.loading:after {
  width: 5.2em;
  height: 10.2em;
  background: #f6f7f9;
  border-radius: 0 10.2em 10.2em 0;
  top: -0.1em;
  left: 4.9em;
  transform-origin: 0.1em 5.1em;
  animation: load 1.5s infinite ease;
}
@-webkit-keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes load {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

import { createApp } from 'vue'
import store from '@/store'
import mixin from '@/mixin'

import '@/app.styl'

const App = createApp({
  onShow (options) {
  }
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(store)
App.mixin(mixin)

export default App

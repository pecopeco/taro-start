import { createApp } from 'vue'
import store from '@/store'
import mixin from '@/mixin'

import '@/app.styl'

const App = createApp({
  onShow (options) {
  }
})

App.use(store)
App.mixin(mixin)

export default App

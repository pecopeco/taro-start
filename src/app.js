import { createApp } from 'vue'
import store from '@/store'
import mixin from '@/mixin'
import './app.styl'

const { update } = mixin()

const App = createApp({
  onShow (options) {
    update()
  }
})

App.use(store)

export default App

import { createStore } from 'vuex'

export default createStore({
  state: {
    userInfo: 'yang'
  },
  actions: {
    setUser: ({ commit }, data) => {
      commit('setUser', data)
    }
  },
  mutations: {
    setUser (state, data) {
      state.userInfo = data
    }
  }
})

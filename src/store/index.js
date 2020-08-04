import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: []
  },
  mutations: {
    pushEventToHistory: (state, event) => {
      state.history.unshift(event)
      if (state.history.length > 10) {
        state.history.length = 10
      }
    }
  },
  getters: {
    history: state => state.history
  }
})

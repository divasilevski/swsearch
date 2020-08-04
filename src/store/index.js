import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    history: []
  },
  mutations: {
    pushEventToHistory: (state, event) => {
      state.history = state.history.filter(e => e.name !== event.name)
      state.history.unshift(event)

      if (state.history.length > 10) {
        state.history.length = 10
      }
    },
    
    clearHistory: state => state.history.length = 0
  },
  getters: {
    history: state => state.history
  }
})

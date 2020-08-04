<template>
  <div v-if="history.length">
    <div v-if="history.length >= 9">
      Последние 10 просмотренных страниц:
    </div>
    <div v-else>
      Вы посещали следующиие страницы:
    </div>
    
    <div class="content">
      <ul>
        <li 
          class="link" 
          v-for="(event, i) in history" 
          :key="event.path + i"
          v-on:click="$router.push(event.path)"
        >
          › {{event.name}}
        </li>
      </ul>
    </div>
    
    <span
      class='link small'
      v-on:click="clearHistory"
    >
      › очистить историю ‹
    </span>
  </div>

  <div v-else>
    История просмотров появится здесь
  </div>
</template>

<script>
export default {
  name: 'Home',

  data: () => ({
    history: []
  }),

  created() {
    this.history = this.$store.getters.history
  },

  methods: {
    clearHistory() {
      this.$store.commit('clearHistory')
      this.history = []
    }
  }
}
</script>

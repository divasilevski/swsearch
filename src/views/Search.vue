<template>
  <div v-if="!statusMessage">
    <p>Кол-во результатов по запросу '{{this.$route.query.search}}': {{searchResults.count}}</p>
    
    {{searchResults}}

  </div>

  <div v-else>{{statusMessage}}</div>
</template>

<script>

export default {
  name: 'Search',
  data: () => ({
    searchResults: undefined,
    statusMessage: "Загрузка..."
  }),

  created() {
    this.fetchData()
  },

  beforeRouteUpdate(to, from, next) {
    next()
    statusMessage: "Загрузка..."
    this.fetchData()
  },

  methods: {
    fetchData() {
      const queryParams = this.getQuery(this.$route.fullPath)
      const URL = `https://swapi.dev/api/people${queryParams}`
      
      fetch(URL)
        .then(response => response.json())
        .then(data => {
          if (data.detail) throw new Error(data.detail)

          if (data.count) {
            this.searchResults = data
            this.statusMessage = ''
          } else {
            const request = this.$route.query.search
            this.statusMessage = `Не найдено ни одного персонажа по запросу ${request}`
          }
        })
        .catch(error => {
          this.statusMessage = `Что-то пошло не так. Ошибка ${error.message}`
        })
    },

    getQuery(url) {
      const splitedURL = url.split('?')
      return `?${splitedURL[splitedURL.length - 1]}`
    }
  }
}
</script>

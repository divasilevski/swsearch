<template>
  <div v-if="!statusMessage">
    <p>Кол-во результатов по запросу '{{this.$route.query.search}}': {{searchResults.count}}</p>
    
    <div class="content">
      <ul>
        <li v-for="result in searchResults.results" :key="result.name">
          <router-link 
            class="link" 
            :to="getLink(result.url)"
          >
            › {{result.name}}
          </router-link>
        </li>
      </ul>
    </div>

    <div>
      <span 
        class="link" 
        v-if="searchResults.previous" 
        v-on:click="openPage(searchResults.previous)"
      >
        ‹‹ previous
      </span>
      <span v-if="searchResults.previous && searchResults.next"> | </span>
      <span 
        class="link" 
        v-if="searchResults.next"
        v-on:click="openPage(searchResults.next)"
      >
        next ››
      </span>
    </div>

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
    },

    getLink(url){
      const splitedURL = url.split('/')
      return `/people/${splitedURL[splitedURL.length - 2]}`
    },

    openPage(url) {
      this.$router.push(`/search${this.getQuery(url)}`)
    }
  }
}
</script>

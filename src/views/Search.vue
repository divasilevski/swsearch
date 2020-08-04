<template>
  <div>
    {{searchResults}}
  </div>
</template>

<script>

export default {
  name: 'Search',
  data: () => ({
    searchResults: undefined,
  }),

  created() {
    this.fetchData()
  },

  beforeRouteUpdate(to, from, next) {
    next()
    this.fetchData()
  },

  methods: {
    fetchData() {
      const queryParams = this.getQuery(this.$route.fullPath)
      const URL = `https://swapi.dev/api/people${queryParams}`
      
      fetch(URL)
        .then(response => response.json())
        .then(data => {
          this.searchResults = data
        })
    },

    getQuery(url) {
      const splitedURL = url.split('?')
      return `?${splitedURL[splitedURL.length - 1]}`
    }
  }
}
</script>

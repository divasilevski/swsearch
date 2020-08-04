<template>
  <div v-if="!statusMessage">
    <h1>{{ peopleFetch.name }}</h1>

    <div class="content">
      <pre>{{ peopleFetch }}</pre>
    </div>

    <span class="link" v-on:click="$router.back()">‹‹ back</span>
  </div>

  <div v-else>{{statusMessage}}</div>
</template>

<script>

export default {
  name: 'People',
  data: () => ({
    peopleFetch: undefined,
    statusMessage: "Загрузка..."
  }),

  created() {
    const URL = `https://swapi.dev/api/people/${this.$route.params.id}/`

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.detail) throw new Error(data.detail)
      
        this.peopleFetch = data
        this.statusMessage = ''

        const event = {
          name: data.name,
          path: this.$route.fullPath
        }
        this.$store.commit('pushEventToHistory', event)
      })
      .catch(error => {
        this.statusMessage = `Что-то пошло не так. Ошибка ${error.message}`
      })
  }

}
</script>

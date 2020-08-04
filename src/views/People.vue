<template>
  <div v-if="!statusMessage">
    <pre>{{ peopleFetch }}</pre>

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
    const URL = `https://swapi.dev/api/people/${this.$route.params.id}`

    fetch(URL)
      .then(response => response.json())
      .then(data => {
        if (data.detail) throw new Error(data.detail)
      
        this.peopleFetch = data
        this.statusMessage = ''
      })
      .catch(error => {
        this.statusMessage = `Что-то пошло не так. Ошибка ${error.message}`
      })
  }

}
</script>

<template>
  <div id="app">

    <header>
      <router-link to="/" class="logo">HOME</router-link>
      <nav>
        <input 
          type="text"
          v-model="inputValue"
          v-on:keydown.enter="search()"
        />
        <button v-on:click="search()">SW Search</button>
      </nav>
    </header>

    <div class="container">
      <router-view />
    </div>

  </div>
</template>


<script>
export default {
  data: () => ({
    inputValue: ''
  }),

  methods: {
    search() {
      const search = this.inputValue.trim().toLowerCase()

      if (search) {
        this.$router.push({name: 'Search', query: {search}}).catch(() => {})    
      }
    }
  }
}
</script>


<style>
* {
  font-family: Georgia, 'Times New Roman', Times, serif;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #eee;
}

button, input, .logo {
  font-weight: 500;
  font-size: 30px;
  color: black;
  text-decoration: none;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 30px 10%;
  background-color: #fff;
}

button {
  padding: 2px 25px;
  background-color: orange;
  border: none;
  cursor: pointer;
}

.container {
  padding: 30px 10%;
}

.content {
  margin: 20px 0;
}

li {
  margin: 10px 0;
  border: 1px dushed black;
  list-style-type: none;
}

.link {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.link:hover {
  color: darkblue;
}

.small {
  font-size: 80%;
}
</style>

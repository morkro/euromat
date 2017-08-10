<template>
  <div id="app">
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'Eur-O-Mat'
  }
</script>

<style lang="scss">
  @import "~node_modules/normalize.css/normalize";

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100vw;
    height: 100vh;
  }

  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    padding: 10px;
  }

  main {
    max-width: 50vw;
    margin: 0 auto;
  }
</style>

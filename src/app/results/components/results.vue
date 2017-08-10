<template>
  <section>
    <router-link :to="{ path: '/' }">
      Zurück
    </router-link>
    <code>{{ results }}</code>
  </section>
</template>

<script>
  export default {
    name: 'Results',

    data () {
      return {
        results: {}
      }
    },

    mounted () {
      this.results = JSON.parse(localStorage.getItem('results'))
    }
  }
</script>

<style lang="scss" scoped></style>

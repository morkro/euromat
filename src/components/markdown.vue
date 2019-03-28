<template>
  <vue-markdown :source="source" />
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  export default {
    name: 'Markdown',

    components: {
      VueMarkdown
    },

    props: {
      source: { type: String, required: true }
    }
  }
</script>

<template>
  <section>
    <h1>{{ $t('euromat.emphasis.headline') }}</h1>
    <p>{{ $t('euromat.emphasis.content') }}</p>

    <ol class="thesis-list">
      <li v-for="thesis of theses">
        <label :for="`thesis-${thesis.id}`">
          {{ thesis.thesis }}
        </label>
        <input :name="`thesis-${thesis.id}`" :id="`thesis-${thesis.id}`" type="checkbox" />
      </li>
    </ol>

    <div class="emphasis-controls">
      <router-link class="btn" :to="{ path: '/thesen/ergebnis' }">
        {{ $t('euromat.emphasis.button') }}
      </router-link>
    </div>
  </section>
</template>

<script>
  import { getAllTheses } from '@/utils/data'

  export default {
    name: 'Emphasis',

    data () {
      return {
        theses: getAllTheses()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  h1, p {
    margin-bottom: $base-gap;
  }

  .thesis-list {
    margin-top: $base-gap;
    list-style: decimal;

    li {
      padding-bottom: $base-gap / 2;
      display: flex;
      justify-content: space-between;
    }

    li:not(:last-child) {
      margin-bottom: $base-gap / 2;
      border-bottom: 4px solid $dark-blue;
    }

    label {
      cursor: pointer;
      flex-grow: 0;
      flex-shrink: 0;
      flex-basis: 90%;
    }
  }

  .emphasis-controls {
    margin-top: $base-gap;
    display: flex;
    justify-content: flex-end;
  }
</style>

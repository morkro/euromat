<template>
  <section>
    <h1>{{ $t('about.headline') }}</h1>
    <p v-for="txt of $t('about.content')">
      {{ txt }}
    </p>

    <ul>
      <li v-for="(member, index) of $t('members.polis')">
        <a :href="$t(`members.polis[${index}].profile`)" target="_blank">
          <span>{{ $t(`members.polis[${index}].name`) }}</span>
        </a>
      </li>
    </ul>

    <ul>
      <li v-for="(member, index) of $t('members.poe')">
        <a :href="$t(`members.poe[${index}].profile`)" target="_blank">
          <span>{{ $t(`members.poe[${index}].name`) }}</span>
        </a>
      </li>
    </ul>

    <ul>
      <li v-for="(member, index) of $t('members.dev')">
        <a :href="$t(`members.dev[${index}].profile`)" target="_blank">
          <span>{{ $t(`members.dev[${index}].name`) }}</span>
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  export default {
    name: 'About'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }
</style>

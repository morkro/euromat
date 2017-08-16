<template>
  <section>
    <h1>{{ $t('about.headline') }}</h1>
    <p v-for="txt of $t('about.content')">
      {{ txt }}
    </p>

    <h2>{{ $t('about.teamLabel.polis') }}</h2>
    <ul>
      <li v-for="(member, index) of $t('about.members.polis')">
        <a :href="$t(`about.members.polis[${index}].profile`)" target="_blank">
          <span>{{ $t(`about.members.polis[${index}].name`) }}</span>
        </a>
      </li>
    </ul>

    <h2>{{ $t('about.teamLabel.poe') }}</h2>
    <ul>
      <li v-for="(member, index) of $t('about.members.poe')">
        <a :href="$t(`about.members.poe[${index}].profile`)" target="_blank">
          <span>{{ $t(`about.members.poe[${index}].name`) }}</span>
        </a>
      </li>
    </ul>

    <h2>{{ $t('about.teamLabel.dev') }}</h2>
    <ul>
      <li v-for="(member, index) of $t('about.members.dev')">
        <a :href="$t(`about.members.dev[${index}].profile`)" target="_blank">
          <span>{{ $t(`about.members.dev[${index}].name`) }}</span>
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

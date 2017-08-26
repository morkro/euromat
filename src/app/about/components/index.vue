<template>
  <section>
    <h1>{{ $t('about.headline') }}</h1>

    <div class="about-content">
      <div class="about-text">
        <p v-for="txt of $t('about.content')">
          {{ txt }}
        </p>
      </div>

      <div class="about-people">
        <h2>
          <a :href="$t('about.teamLabel.polis.url')" tagret="_blank">
            {{ $t('about.teamLabel.polis.label') }}
          </a>
        </h2>
        <ul>
          <li v-for="(member, index) of $t('about.members.polis')">
            <a :href="$t(`about.members.polis[${index}].profile`)" target="_blank">
              <span>{{ $t(`about.members.polis[${index}].name`) }}</span>
            </a>
          </li>
        </ul>

        <h2>
          <a :href="$t('about.teamLabel.poe.url')" tagret="_blank">
            {{ $t('about.teamLabel.poe.label') }}
          </a>
        </h2>
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
      </div>
    </div>
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

  .about-content {
    display: flex;
  }

  .about-people {
    flex: 1 0 350px;
    margin-left: $base-gap;

    h2 {
      margin-bottom: $small-gap;
    }

    ul {
      list-style: none;
      margin-bottom: $base-gap;
    }
  }
</style>

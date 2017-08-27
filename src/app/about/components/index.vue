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
        <div class="people-group">
          <h2>
            <a :href="$t('about.teamLabel.polis.url')" target="_blank">
              <svgicon class="team-logo" name="polis-logo" width="150" height="100" />
              <span hidden>{{ $t('about.teamLabel.polis.label') }}</span>
            </a>
          </h2>
          <ul>
            <li v-for="(member, index) of $t('about.members.polis')">
              <a v-if="member.profile" :href="$t(`about.members.polis[${index}].profile`)" target="_blank">
                {{ $t(`about.members.polis[${index}].name`) }}
                <feather-external-link />
              </a>
              <span v-else>{{ $t(`about.members.polis[${index}].name`) }}</span>
            </li>
          </ul>
        </div>

        <div class="people-group">
          <h2>
            <a :href="$t('about.teamLabel.poe.url')" target="_blank">
              <svgicon class="team-logo" name="poe-logo" width="400" height="60" />
              <span hidden>{{ $t('about.teamLabel.poe.label') }}</span>
            </a>
          </h2>
          <ul>
            <li v-for="(member, index) of $t('about.members.poe')">
              <a v-if="member.profile" :href="$t(`about.members.poe[${index}].profile`)" target="_blank">
                {{ $t(`about.members.poe[${index}].name`) }}
                <feather-external-link />
              </a>
              <span v-else>{{ $t(`about.members.poe[${index}].name`) }}</span>
            </li>
          </ul>
        </div>

        <div class="people-group">
          <h2>{{ $t('about.teamLabel.dev') }}</h2>
          <ul>
            <li v-for="(member, index) of $t('about.members.dev')">
              <a v-if="member.profile" :href="$t(`about.members.dev[${index}].profile`)" target="_blank">
                {{ $t(`about.members.dev[${index}].name`) }}
                <feather-external-link />
              </a>
              <span v-else>{{ $t(`about.members.dev[${index}].name`) }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>


  </section>
</template>

<script>
  import '@/assets/icons'
  export default {
    name: 'About'
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  h1,
  p {
    margin-bottom: $base-gap;
  }

  .about-content {
    display: flex;
    flex-direction: column;
  }

  .about-people {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .people-group {
      flex: 1 0 50%;
      text-align: center;
    }

    h2 {
      margin-bottom: $small-gap;
    }

    ul {
      list-style: none;
      margin-bottom: $base-gap;
    }

    li:not(:last-child) {
      margin-bottom: $small-gap;
    }

    svg:not(.team-logo) {
      stroke: $transparent-white;
      width: 1em;
      height: 1em;
    }
  }
</style>

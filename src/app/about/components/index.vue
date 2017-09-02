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
        <div class="people-group polis">
          <div class="group-inner">
            <h2>
              <a :href="$t('about.teamLabel.polis.url')" target="_blank">
                <img class="team-logo polis" :src="polisLogo" width="150" height="100" />
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
        </div>

        <div class="people-group poe">
          <div class="group-inner">
            <h2>
              <a :href="$t('about.teamLabel.poe.url')" target="_blank">
                <img class="team-logo poe" :src="poeLogo" width="400" height="60" />
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
        </div>

        <div class="people-group dev">
          <div class="group-inner dark">
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
    </div>
  </section>
</template>

<script>
  import '@/assets/icons'
  export default {
    name: 'About',

    data () {
      return {
        polisLogo: require('@/assets/svg/polis-colored-logo.svg'),
        poeLogo: require('@/assets/svg/poe-colored-logo.svg')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  $breakpoint: 630px;

  h1,
  p {
    margin-bottom: $base-gap;
  }

  .team-logo.poe {
    width: 100%;
    height: auto;
  }

  .about-content {
    display: flex;
    flex-direction: column;
  }

  .about-people {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;

    @media (max-width: $breakpoint) {
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
    }

    .people-group {
      flex: 0 0 50%;
      text-align: center;

      @media (max-width: $breakpoint) {
        flex: 0 0 100%;
        width: 100%;

        &.poe {
          order: 1;
        }

        &.polis {
          order: 2;
        }

        &.dev {
          order: 3;
        }
      }
    }

    h2 {
      margin-bottom: $small-gap;
      color: $text-color-secondary;
    }

    ul {
      list-style: none;
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

  .group-inner {
    width: calc(100% - #{$base-gap});
    background: $background-secondary;
    border-radius: $border-radius / 2;
    box-shadow: $button-shadow;
    padding: $base-gap;
    color: $text-color-secondary;
    margin-bottom: $base-gap;

    @media (max-width: $breakpoint) {
      width: 100%;
    }

    &.dark {
      background: $dark-blue;

      h2,
      a,
      span {
        color: $text-color-base;
      }
    }

    a,
    span {
      color: $text-color-secondary;
      font-weight: 700;
    }

    a:hover {
      color: $text-color-special;
    }

    svg:not(.team-logo) {
      stroke: $blue !important;
    }
  }
</style>

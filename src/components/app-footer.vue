<template>
  <div class="footer">
    <ul class="footer-social">
      <li v-for="item of social"
        :data-message="item.label === 'clipboard' ? item.message : ''"
        :class="{ 'show-info': showInfo }">
        <button class="btn-dark" @click="share(item)" >
          <feather-icon :type="item.icon" />
        </button>
      </li>
    </ul>
    <ul class="footer-menu">
      <li v-for="item of menu">
        <router-link tag="a" :to="item.route">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'AppFooter',

    props: {
      menu: { type: Array, default: () => [] },
      social: { type: Array, default: () => [] }
    },

    data () {
      return {
        url: window.location.origin,
        showInfo: false,
        infoTimeout: 2000
      }
    },

    methods: {
      share (social) {
        switch (social.label.toLowerCase()) {
          case 'twitter': return this.shareViaTwitter(social.message)
          case 'facebook': return this.shareViaFacebook(social.message)
          case 'clipboard': return this.copyToClipboard(social.message)
          default: return
        }
      },
      shareViaTwitter () {
        console.log('shareViaTwitter')
      },
      shareViaFacebook () {
        console.log('shareViaFacebook')
      },
      copyToClipboard (message) {
        const $textarea = document.createElement('textarea')
        $textarea.value = this.url
        document.body.appendChild($textarea)
        $textarea.select()

        try {
          const successful = document.execCommand('copy')
          if (successful) {
            this.showInfo = true
            setTimeout(() => { this.showInfo = false }, this.infoTimeout)
          }
        } catch (err) {
          console.log('Oops, unable to copy')
        }

        document.body.removeChild($textarea)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/colors";
  @import "~styles/layout";

  $social-btn-size: 40px;

  .footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    ul {
      list-style: none;
    }
  }

  .footer-menu {
    background: transparentize($background-primary, 0.5);
    display: flex;
    font-size: $font-size-small;
    padding: $small-gap;
    border-radius: $border-radius;

    a {
      color: $text-color-secondary;
      font-weight: 600;

      &:hover {
        color: $text-color-special;
      }
    }

    li:not(:first-child) {
      margin-left: $base-gap;
    }
  }

  .footer-social {
    padding: 0 $small-gap 0 0;

    li {
      position: relative;

      &.show-info::before {
        display: block;
      }
    }

    li::before {
      content: attr(data-message);
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-105%, -50%);
      white-space: pre;
      padding: 10px 20px;
      border-radius: $border-radius;
      background: rgba(0, 0, 0, 0.3);
      width: auto;
      font-size: $font-size-small;
      display: none;
    }

    li:not(:last-child) {
      margin-bottom: 5px;
    }

    button {
      width: $social-btn-size;
      height: $social-btn-size;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      margin: 0;
    }
  }
</style>

<template>
  <div class="footer">
    <ul class="footer-social">
      <li v-for="item of social"
        :key="item.label"
        :data-message="getMessage(item)"
        :class="getSocialClass(item)"
      >
        <button class="btn-dark" @click="share(item)">
          <component :is="'feather-' + item.icon" />
        </button>
      </li>
    </ul>

    <ul class="footer-menu">
      <li v-for="item of menu" :key="item.label">
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

    components: {
      'feather-twitter': () =>
        import('vue-feather-icons/icons/TwitterIcon' /* webpackChunkName: "icons" */),
      'feather-facebook': () =>
        import('vue-feather-icons/icons/FacebookIcon' /* webpackChunkName: "icons" */),
      'feather-clipboard': () =>
        import('vue-feather-icons/icons/ClipboardIcon' /* webpackChunkName: "icons" */)
    },

    props: {
      menu: { type: Array, default: () => [] },
      social: { type: Array, default: () => [] }
    },

    data () {
      return {
        shareURL: window.location.origin,
        showClipboardInfo: false,
        infoTimeout: 2000
      }
    },

    methods: {
      getMessage (item) {
        return item.label === 'clipboard'
          ? item.message
          : ''
      },
      getSocialClass (item) {
        return {
          'show-info': item.label === 'clipboard' && this.showClipboardInfo
        }
      },
      // https://stackoverflow.com/a/16861050/1724106
      getPopupDimensions (w = 800, h = 600) {
        const { screenLeft, screenTop, innerWidth, innerHeight } = window
        const dualScreenLeft = screenLeft || screen.left
        const dualScreenTop = screenTop || screen.top
        const width = innerWidth || document.documentElement.clientWidth || screen.width
        const height = innerHeight || document.documentElement.clientHeight || screen.height

        return {
          width: w,
          height: h,
          left: ((width / 2) - (w / 2)) + dualScreenLeft,
          top: ((height / 2) - (h / 2)) + dualScreenTop
        }
      },
      constructTwitterURL (message) {
        const { text, hashtags } = message
        const url = 'https://twitter.com/intent/tweet'
        return `${url}?text=${encodeURI(text)}&hashtags=${hashtags}&url=${this.shareURL}`
      },
      share (social) {
        switch (social.label.toLowerCase()) {
          case 'twitter': return this.shareViaTwitter(social.message)
          case 'facebook': return this.shareViaFacebook(social.message)
          case 'clipboard': return this.copyToClipboard(social.message)
          default: break
        }
      },
      shareViaTwitter (message) {
        const frameName = 'Post a Tweet on Twitter'
        const { width, height, left, top } = this.getPopupDimensions()
        const options = `resizable,scrollbars,width=${width},height=${height},top=${top},left=${left}`

        const popup = window.open(this.constructTwitterURL(message), frameName, options)
        if (window.focus) {
          popup.focus()
        }
      },
      shareViaFacebook () {
        FB.ui({
          method: 'share',
          display: 'popup',
          href: this.shareURL
        }, response => {})
      },
      copyToClipboard (message) {
        const $textarea = document.createElement('textarea')
        $textarea.value = this.shareURL
        document.body.appendChild($textarea)
        $textarea.select()

        try {
          const successful = document.execCommand('copy')
          if (successful) {
            this.showClipboardInfo = true
            setTimeout(() => { this.showClipboardInfo = false }, this.infoTimeout)
          }
        } catch (error) {
          console.log('Oops, unable to copy', error)
        }

        document.body.removeChild($textarea)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/styles/animations";
  @import "~@/styles/colors";
  @import "~@/styles/layout";

  $social-btn-size: 40px;
  $breakpoint: 1050px;

  .footer {
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    ul {
      list-style: none;
    }

    @media (max-width: $breakpoint) {
      align-items: center;
    }
  }

  .footer-menu {
    background: transparentize($background-primary, 0.5);
    display: flex;
    font-size: $font-size-small;
    padding: $small-gap / 2 $small-gap $small-gap;
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
    margin: 0 $small-gap / 2 0 0;
    padding: $small-gap / 2;
    background: $background-primary;
    border-radius: $border-radius;

    @media (max-width: $breakpoint) {
      display: flex;
      justify-content: center;
      padding: 0;
      margin: 0;

      li:not(:last-child) {
        margin-bottom: 0;
        margin-right: $small-gap;
      }
    }

    li {
      position: relative;

      &.show-info::before {
        transform: translate(-105%, -50%) scale(1);
        opacity: 1;

        @media (max-width: $breakpoint) {
          transform: translate(-50%, -55%) scale(1);
        }
      }
    }

    li::before {
      content: attr(data-message);
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-105%, -50%) scale(0);
      white-space: pre;
      padding: 10px 20px;
      border-radius: $border-radius;
      background: rgba(0, 0, 0, 0.3);
      width: auto;
      font-size: $font-size-small;
      opacity: 0;
      transition: opacity 150ms $easeOutBack;

      @media (max-width: $breakpoint) {
        left: 50%;
        top: -50%;
      }
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
      margin: 0 auto;
    }
  }
</style>

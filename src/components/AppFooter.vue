<template>
  <footer>
    <ul class="footer-menu">
      <li v-for="item of menu" :key="item.label">
        <router-link tag="a" :to="item.route">
          {{ item.label }}
        </router-link>
      </li>
    </ul>
    <ul class="footer-social">
      <li
        v-for="item of social"
        :key="item.label"
        :data-message="getMessage(item)"
        :class="getSocialClass(item)"
      >
        <v-button dark @click="share(item)">
          <visually-hidden>{{ item.label }}</visually-hidden>
          <component :is="'feather-' + item.icon" />
        </v-button>
      </li>
    </ul>
  </footer>
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
        import('vue-feather-icons/icons/ClipboardIcon' /* webpackChunkName: "icons" */),
    },

    props: {
      menu: { type: Array, default: () => [] },
      social: { type: Array, default: () => [] },
    },

    data() {
      return {
        shareURL: window.location.origin,
        showClipboardInfo: false,
        infoTimeout: 2000,
      }
    },

    methods: {
      getMessage(item) {
        return item.label === 'clipboard' ? item.message : ''
      },
      getSocialClass(item) {
        return {
          'show-info': item.label === 'clipboard' && this.showClipboardInfo,
        }
      },
      // https://stackoverflow.com/a/16861050/1724106
      getPopupDimensions(w = 800, h = 600) {
        const { screenLeft, screenTop, innerWidth, innerHeight } = window
        const dualScreenLeft = screenLeft || screen.left
        const dualScreenTop = screenTop || screen.top
        const width = innerWidth || document.documentElement.clientWidth || screen.width
        const height = innerHeight || document.documentElement.clientHeight || screen.height

        return {
          width: w,
          height: h,
          left: width / 2 - w / 2 + dualScreenLeft,
          top: height / 2 - h / 2 + dualScreenTop,
        }
      },
      constructTwitterURL(message) {
        const { text, hashtags } = message
        const url = 'https://twitter.com/intent/tweet'
        return `${url}?text=${encodeURI(text)}&hashtags=${hashtags}&url=${this.shareURL}`
      },
      share(social) {
        switch (social.label.toLowerCase()) {
          case 'twitter':
            return this.shareViaTwitter(social.message)
          case 'facebook':
            return this.shareViaFacebook(social.message)
          case 'clipboard':
            return this.copyToClipboard(social.message)
          default:
            break
        }
      },
      shareViaTwitter(message) {
        const frameName = 'Post a Tweet on Twitter'
        const { width, height, left, top } = this.getPopupDimensions()
        const options = `resizable,scrollbars,width=${width},height=${height},top=${top},left=${left}`

        const popup = window.open(this.constructTwitterURL(message), frameName, options)
        if (window.focus) {
          popup.focus()
        }
      },
      shareViaFacebook() {
        FB.ui(
          {
            method: 'share',
            display: 'popup',
            href: this.shareURL,
          },
          (response) => {}
        )
      },
      copyToClipboard(message) {
        const $textarea = document.createElement('textarea')
        $textarea.value = this.shareURL
        document.body.appendChild($textarea)
        $textarea.select()

        try {
          const successful = document.execCommand('copy')
          if (successful) {
            this.showClipboardInfo = true
            setTimeout(() => {
              this.showClipboardInfo = false
            }, this.infoTimeout)
          }
        } catch (error) {
          // eslint-disable-next-line
          console.error('Oops, unable to copy', error)
        }

        document.body.removeChild($textarea)
      },
    },
  }
</script>

<style lang="postcss" scoped>
  footer {
    position: fixed;
    z-index: 2;
    bottom: calc(var(--small-gap) / 2);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: flex-end;
    align-items: center;

    @media (max-width: 1050px) {
      position: static;
      z-index: 0;
      justify-content: center;
      align-items: center;
      margin-top: var(--base-gap);
    }

    & ul {
      list-style: none;
    }
  }

  .footer-menu {
    background: var(--background-primary);
    display: flex;
    font-size: var(--font-size-small);
    padding: calc(var(--small-gap) / 2);
    border-radius: var(--border-radius);

    & a {
      color: var(--prussian-blue);
      font-weight: 600;

      &:hover {
        color: var(--orange);
      }

      &:focus {
        color: var(--prussian-blue);
      }
    }

    & li:not(:first-child) {
      margin-left: var(--base-gap);
    }
  }

  .footer-social {
    display: flex;
    margin-left: var(--base-gap);

    @media (max-width: 1050px) {
      display: flex;
      justify-content: center;
    }

    & li {
      position: relative;

      &.show-info::before {
        transform: translate(-105%, -50%) scale(1);
        opacity: 1;

        @media (max-width: 1050px) {
          transform: translate(-50%, -55%) scale(1);
        }
      }
    }

    & li::before {
      content: attr(data-message);
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(-105%, -50%) scale(0);
      white-space: pre;
      padding: 10px 20px;
      border-radius: var(--border-radius);
      background: rgba(0, 0, 0, 0.3);
      width: auto;
      font-size: var(--font-size-small);
      opacity: 0;
      transition: opacity 150ms var(--ease-out-back);

      @media (max-width: 1050px) {
        left: 50%;
        top: -50%;
      }
    }

    & li:not(:last-child) {
      margin-right: 5px;
    }

    & button {
      --social-btn-size: 40px;
      width: var(--social-btn-size);
      height: var(--social-btn-size);
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    & svg {
      margin: 0 auto;
    }
  }
</style>

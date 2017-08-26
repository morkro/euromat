<template>
  <div class="footer">
    <ul class="footer-social">
      <li v-for="item of social"
        :data-message="item.label === 'clipboard' ? item.message : ''"
        :class="{ 'show-info': item.label === 'clipboard' && showClipboardInfo }">
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
        shareURL: window.location.origin,
        showClipboardInfo: false,
        infoTimeout: 2000
      }
    },

    methods: {
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
      share (social) {
        switch (social.label.toLowerCase()) {
          case 'twitter': return this.shareViaTwitter(social.message)
          case 'facebook': return this.shareViaFacebook(social.message)
          case 'clipboard': return this.copyToClipboard(social.message)
          default: return
        }
      },
      shareViaTwitter () {
        const url = 'https://twitter.com/intent/tweet'
        const frameName = 'Post a Tweet on Twitter'
        const { width, height, left, top } = this.getPopupDimensions()
        const options = `resizable,scrollbars,width=${width},height=${height},top=${top},left=${left}`

        const popup = window.open(url, frameName, options)
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
        } catch (err) {
          console.log('Oops, unable to copy')
        }

        document.body.removeChild($textarea)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "~styles/animations";
  @import "~styles/colors";
  @import "~styles/layout";

  $social-btn-size: 40px;
  $breakpoint: 768px;

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

    @media (max-width: $breakpoint) {
      display: flex;
      justify-content: center;
      padding: 0;

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
      transition: opacity 150ms $easeInOutQuint;
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

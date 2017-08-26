<template>
  <div class="footer">
    <ul class="footer-social">
      <li v-for="item of social">
        <button class="btn-dark" @click="share(item.label)" >
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
        url: 'https://euromat.info'
      }
    },

    methods: {
      share (type) {
        switch (type.toLowerCase()) {
          case 'twitter': return this.shareViaTwitter()
          case 'facebook': return this.shareViaFacebook()
          case 'clipboard': return this.copyToClipboard()
          default: return
        }
      },
      shareViaTwitter () {
        console.log('shareViaTwitter')
      },
      shareViaFacebook () {
        console.log('shareViaFacebook')
      },
      copyToClipboard () {
        const $textarea = document.createElement('textarea')
        $textarea.value = this.url
        document.body.appendChild($textarea)
        $textarea.select()

        try {
          const successful = document.execCommand('copy')
          const msg = successful ? 'successful' : 'unsuccessful'
          console.log('Copying text command was ' + msg)
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

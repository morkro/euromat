<template>
  <router-link v-if="routerLink" :tag="as" :class="btnClass" v-bind="$attrs" v-on="$listeners">
    <slot />
  </router-link>
  <component :is="as" v-else :class="btnClass" v-bind="$attrs" v-on="$listeners">
    <slot />
  </component>
</template>

<script>
  const asPropMap = ['button', 'a']
  export default {
    name: 'VButton',

    props: {
      routerLink: {
        type: Boolean,
        default: false,
      },
      as: {
        type: String,
        default: asPropMap[0],
        validator: (v) => asPropMap.includes(v),
      },
      small: {
        type: Boolean,
        default: false,
      },
      dark: {
        type: Boolean,
        default: false,
      },
      textOnly: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      btnClass() {
        return [
          'btn',
          this.color,
          this.small && 'btn-small',
          this.textOnly && 'btn-txt',
          this.dark && 'btn-dark',
        ]
      },
    },
  }
</script>

<style lang="postcss">
  .btn {
    display: inline-flex;
    align-items: center;
    text-decoration: none;
    padding: 15px 18px;
    font-size: var(--font-size-medium);
    font-weight: 600;
    background: var(--white);
    color: var(--prussian-blue);
    border-radius: var(--border-radius);
    border: 2px solid var(--prussian-blue);
    cursor: pointer;
    position: relative;
    transition: border-color 150ms var(--ease-out-back);

    &:hover {
      border-color: var(--orange);
    }

    &:focus,
    &:active {
      outline: none;
      border: 2px solid var(--orange) !important;
    }

    & svg {
      stroke: var(--orange);
      width: 20px;
      height: 20px;
      margin-left: calc(var(--small-gap) / 2);

      & path,
      & polyline {
        stroke: var(--orange);
      }
    }

    &[disabled] {
      cursor: not-allowed;
      color: var(--cornflower-blue);
      border-color: var(--cornflower-blue);

      &.btn-dark {
        color: var(--prussian-blue);
      }
    }

    &.btn-dark {
      background: var(--cornflower-blue);
      border-color: var(--cornflower-blue);
      font-weight: 500;
      padding: 12px 15px;
      transition: background 150ms var(--ease-out-back);

      &:not([disabled]):hover {
        background: var(--white);
      }

      &:focus,
      &:active {
        outline: none;
        border: 2px solid var(--orange);
      }

      & svg {
        stroke: var(--prussian-blue);

        & path,
        & polyline {
          stroke: var(--prussian-blue);
        }
      }
    }

    &.btn-small {
      padding: 8px 14px;
      font-size: var(--font-size-small);
    }

    &.btn-txt {
      position: relative;
      all: unset;
      cursor: pointer;
      background: transparent;
      color: var(--prussian-blue);
      border: none;
      font-weight: 400;
    }
  }
</style>

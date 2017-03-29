<template lang="pug">
  b-navbar.bg-primary.sticky-top(type="inverse" toggleable)
    b-nav.is-nav-bar
      b-nav-item(@click="toggleMenu()")
        icon.menu-icon(name="bars")
    b-link.navbar-brand
      span money-agent
    b-nav.ml-auto(is-nav-bar)
      b-nav-item-dropdown(right-alignment @click="test()")
        template(slot="text")
          span Language
        b-dropdown-item.nav-item
          div(@click="setLanguage('cn')") 中文
        b-dropdown-item.nav-item
          div(@click="setLanguage('en')") English
      b-nav-item(right-alignment) {{ $store.state.AUTH.username }}
      b-nav-item(@click="logout()")
        icon(name="sign-out")
</template>

<script>
  export default {
    name: 'nav-bar',

    methods: {
      setLanguage (lang) {
        this.$store.dispatch('setLanguage', lang)
      },
      toggleMenu () {
        this.$emit('toggleMenu')
      },
      logout () {
        console.log('logout')
        this.$root.logout()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "scss/share";

  .navbar-brand {
    span {
      color: $reverse_color0;
    }
  }
  .nav-item {
    list-style: none;
  }

  .nav-link {
    i {
      font-size: 1.142em;
    }
  }

  .menu-icon {
    color: rgba($reverse_color0, .5);
    &:hover {
      color: rgba($reverse_color0, .75);
    }
  }
</style>

<template lang="pug">
  b-navbar.bg-primary.sticky-top(toggleable)
    b-nav-toggle(target="nav_collapse")
    b-link.navbar-brand
      span money-agent
    b-collapse(is-nav id="nav_collapse")
      b-nav.ml-auto(is-nav-bar)
        b-nav-item-dropdown(right-alignment)
          template(slot="text")
            span USER
          b-dropdown-item.nav-item Profile
          b-dropdown-item.nav-item Logout
</template>

<script>
  export default {
    name: 'nav-bar'
  }
</script>

<style lang="scss" scoped>
  .nav-item {
    list-style: none;
  }
</style>

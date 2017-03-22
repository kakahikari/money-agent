<template lang="pug">
  section
    transition(name="fade" mode="out-in")
      .layout__viewport
        router-view
</template>

<script>
export default {
  name: 'body-contents'
}
</script>

<style lang="scss">

</style>

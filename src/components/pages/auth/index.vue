<template lang="pug">
  section.layout__container
    router-view
</template>

<script>
export default {
  name: 'auth__index',

  data () {
    return {
      helloo: 'hellooooo'
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.hello()
    })
  },

  methods: {
    hello () {
      console.log('hello')
    }
  }
}
</script>

<style lang="scss">

</style>

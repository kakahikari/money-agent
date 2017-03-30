<template lang="pug">
  div
    span do
</template>

<script>
export default {
  name: 'templates__index',

  data () {
    return {
      templateName: '',
      inputs: []
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.createView()
      if (this.templateName === '' || this.inputs === undefined) {
        this.$router.replace({name: 'index'})
      }
    })
  },

  watch: {
    $route (newVal, oldVal) {
      this.createView()
    }
  },

  methods: {
    createView () {
      this.templateName = this.$route.params.templateName
      this.inputs = this.$route.params.inputs
    }
  }
}
</script>

<template lang="pug">
section
  h4.page-title {{ pageTitle }}
  .card
    .card-block
      form(@submit.prevent="action()")
        template(v-for="input in inputs")
          .form-group.col-3
            label {{ $root.i18n(input['label-name']) }}
            b-form-select(v-if="input.type=='select'" ":options"="input.options" v-model="input.value")
            b-form-input(
              v-else
              v-model="input.value"
              ":name"="input.name"
              ":type"="input.type"
              ":class"="input.class"
            )
        .form-group.col
          button.btn.btn-primary(type="submit") {{ $root.i18n('Submit', $store.state.AUTH.language) }}
  router-view(":formData"="formData")
</template>

<script>
  export default {
    name: 'templates__index',

    data () {
      return {
        pageTitle: '',
        actionName: '',
        inputs: [],
        formData: {}
      }
    },

    mounted () {
      this.$nextTick(() => {
        this.createView()
        if (this.actionName === '' || this.inputs === undefined) {
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
        this.pageTitle = this.$route.params.pageTitle
        this.actionName = this.$route.params.actionName
        this.inputs = this.$route.params.inputs
      },
      action () {
        const formData = {}
        for (var i = 0; i < this.inputs.length; i++) {
          if (this.inputs[i].value !== undefined) formData[this.inputs[i].name] = this.inputs[i].value
          else formData[this.inputs[i].name] = ''
        }
        this.formData = formData
      }
    }
  }
</script>
<style lang="scss" scoped>
  .page-title {
    margin-top: 1em;
  }
  .card {
    margin: 1em 0;
    &:first-child {
      margin-top: 0;
    }
  }
  .form-group {
    display: inline-flex;
    flex-direction: column;
  }
  label {
    height: 1em;
  }
</style>

<template lang="pug">
  transition(name="fade", mode="out-in")
    ol.form-errors(v-if="errors.$error")
      transition-group(name="fade", mode="out-in")
        form-error(v-if="typeof(errors.required) !== 'undefined' && !errors.required", key="node") 必填栏位
        form-error(v-if="typeof(errors.alphaNum) !== 'undefined' && !errors.alphaNum", key="node") 栏位只可使用英文及数字
      slot
</template>

<script>
  import formError from 'resources/form/form-error'

  export default {
    name: 'form-errors',

    props: {
      errors: {
        default: {}
      }
    },

    components: {
      formError
    }
  }
</script>

<style lang="scss" scoped>
  @import 'scss/share';

  .form-errors {
    padding-top: .3em;
    padding-left: 1.5em;
    font-size: .6em;
    color: #FF6779;
  }
</style>

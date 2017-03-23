<template lang="pug">
  .layout__viewport.container-fluid
    section.layout__container
      .card.text-center
        .card-block
          h4.card-title {{ $root.i18n('Login', formData.language) }}
          form(@submit.prevent="login(formData)")
            .form-group
              b-form-input(":placeholder"="$root.i18n('Account', formData.language)" v-model="formData.username")
              b-form-input(type="password" ":placeholder"="$root.i18n('Password', formData.language)" v-model="formData.password")
              label Language
              select.form-control.col(v-model="formData.language")
                option(value="cn") 中文
                option(value="en") English
            button.btn.btn-primary(type="submit") {{ $root.i18n('Submit', formData.language) }}
          .card-text.text-right
            small.text-muted v{{ VERSION }}
</template>

<script>
import { DEFAULT_LNG } from 'src/config'
import { _VERSION } from 'src/version'

export default {
  name: 'login',

  data () {
    return {
      VERSION: _VERSION,
      formData: {
        username: '',
        password: '',
        language: DEFAULT_LNG
      }
    }
  },

  watch: {
    language (val) {
      this.$store.dispatch('setLanguage', val)
    }
  },

  methods: {
    login (formData) {
      this.$root.login(formData).then((res) => {
        return this.$router.replace({path: '/'})
      }).catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    margin-bottom: 1em;
  }

  .layout__container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .card {
    width: 25em;
  }
</style>

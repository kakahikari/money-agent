import helper from 'src/helper'
import Vue from 'vue'
import router from './router'
import store from 'stores'

// filters
Vue.filter('currency', function (value) {
  return value.currency({})
})
Vue.filter('toNumber', function (value) {
  let out = value
  if (value === null) return 0
  if (typeof value !== String) {
    out = value.toString()
  }
  return out.toNumber({})
})

// UI
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import Waves from 'vue-directive-waves'
Vue.use(Waves)

// components
import icon from 'resources/icon'
Vue.component('icon', icon)
import vForm from 'layout/components/v-form'
Vue.component('vForm', vForm)
import vToast from 'resources/v-toast'

Vue.config.productionTip = false

/* eslint-disable no-new */
export const System = new Vue({
  mounted () {
    this.$store.dispatch('SET_DEFAULT', {context: this})
  },

  methods: {
    default () {
      this.$store.dispatch('ERASE_COOKIES')
      this.$router.replace({name: 'login'})
    },
    async onReady () {
      await this.$store.dispatch('checkStatus', {context: this})
    },
    init () {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('setUser', {context: this}).then((res) => {
          return resolve(res)
        }).catch((err) => {
          return reject(err)
        })
      })
    },
    login (formData) {
      return new Promise((resolve, reject) => {
        const params = {context: this, body: formData}
        this.$store.dispatch('login', params).then((res) => {
          this.$root.showToast({content: this.i18n('Login success')})
          return resolve(res)
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: this.i18n(err)})
          return reject(err)
        })
      })
    },
    logout () {
      this.$store.dispatch('logout', {context: this})
      this.$store.dispatch('ERASE_COOKIES')
      this.$root.showToast({type: 'warning', content: this.i18n('Logout')})
      return this.$router.replace({name: 'login'})
    },
    i18n (str, language = this.$store.state.AUTH.language) {
      return helper.i18n(str, language)
    },
    showToast (obj) {
      this.$refs.vToast.add
        ? this.$refs.vToast.add(obj)
        : window.alert(obj.content)
    }
  },

  router,

  store,

  components: {
    vToast
  }
}).$mount('#system')

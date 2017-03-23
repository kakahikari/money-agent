import helper from 'src/helper'
import Vue from 'vue'
import router from './router'
import store from 'stores'

// UI
import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import Waves from 'vue-directive-waves'
Vue.use(Waves)

// components
import icon from 'resources/icon'
Vue.component('icon', icon)

Vue.config.productionTip = false

/* eslint-disable no-new */
export const Syetem = new Vue({
  mounted () {
    this.$store.dispatch('SET_DEFAULT')
  },

  methods: {
    default () {
      this.$store.dispatch('ERASE_COOKIES')
      this.$router.replace({path: '/'})
    },
    onReady () {
      this.$store.dispatch('checkStatus')
    },
    init () {
      return new Promise((resolve, reject) => {
        const params = { context: this }
        this.$store.dispatch('setUser', params).then((res) => {
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
          // this.$root.showToast({content: '登入成功'})
          return resolve(res)
        }).catch((err) => {
          // this.$root.showToast({type: 'warning', content: err})
          return reject(err)
        })
      })
    },
    logout () {
      this.$store.dispatch('logout', {context: this})
      this.$store.dispatch('ERASE_COOKIES')
      // this.$root.showToast({type: 'warning', content: '已登出'})
      return this.$router.replace({name: 'login'})
    },
    i18n (str, language = this.$store.state.AUTH.language) {
      return helper.i18n(str, language)
    }
  },

  router,

  store
}).$mount('#system')

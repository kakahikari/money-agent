import helper from 'src/helper'
import Vue from 'vue'
import router from './router'
import store from 'stores'

Vue.config.productionTip = false

/* eslint-disable no-new */
export const Syetem = new Vue({
  mounted () {
    this.$store.dispatch('SET_DEFAULT')
  },

  router,

  store
}).$mount('#system')

<template lang="pug">
  section
    p main
</template>

<script>
import helper from 'helper'
// import MemberService from 'services/MemberService'

export default {
  name: 'main',

  mounted () {
    this.$nextTick(() => {
      let d = {username: 'banana', password: '123456'}
      const params = {context: this, body: d}
      this.$store.dispatch('login', params)
      .then((res) => {
        return this.$store.dispatch('getMemberList', params)
      })
      .then((res) => {
        return this.$store.dispatch('getAgentList', params)
      })
      .then((res) => {
        return this.$store.dispatch('getGameCompanyList', params)
      })
      // .then(() => {
      //   helper.log(2)
      //   const params = {context: this}
      //   this.$store.dispatch('logout', params)
      // })
      .catch((err) => {
        helper.log(err)
      })
    })
  }
}
</script>

<style lang="scss">

</style>

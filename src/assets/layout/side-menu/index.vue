<template lang="pug">
  nav
    div.text-muted.nav-title {{ $root.i18n('Navigation') }}
    ul.nav.nav-pills.flex-column
      template(v-for="item in list")
        node
          template(slot="icon")
            icon(":name"="iconList[item.name]")
          template(slot="text") {{ item.text }}
          template(slot="child" v-if="item.child.length > 0")
            template(v-for="child in item.child")
              li.nav-item__child__link("v-waves.block"="") {{ child.text }}
</template>

<script>
  import node from './node'
  import UserService from 'services/userService'
  import helper from 'helper'

  export default {
    name: 'side-menu__index',

    data () {
      return {
        list: [],
        iconList: {
          member: 'user',
          finance: 'money',
          agent: 'users',
          report: 'file-text-o',
          rate_money: 'gift'
        }
      }
    },

    mounted () {
      this.$nextTick(() => {
        const params = {context: this}
        UserService.getFieldList(params).then((res) => {
          this.list = res
        })
        .catch((err) => {
          helper.log(err)
        })
      })
    },

    components: {
      node
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>

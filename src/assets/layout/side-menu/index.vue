<template lang="pug">
  nav
    div.text-muted.nav-title {{ $root.i18n('Navigation') }}
    ul.nav.nav-pills.flex-column
      template(v-for="item in $store.state.AUTH.sideMenu")
        node
          template(slot="icon")
            icon(":name"="iconList[item.name]")
          template(slot="text") {{ item.text }}
          template(slot="child" v-if="item.child.length > 0")
            template(v-for="child in item.child")
              li.nav-item__child__link(
                @click="action(child.action_key)"
                "v-waves.block"=""
              ) {{ child.text }}
</template>

<script>
  import node from './node'
  import UiService from 'services/uiService'
  import helper from 'helper'

  export default {
    name: 'side-menu__index',

    data () {
      return {
        iconList: {
          member: 'user',
          finance: 'money',
          agent: 'users',
          report: 'file-text-o',
          rate_money: 'gift'
        }
      }
    },

    methods: {
      action (key) {
        const params = {context: this, actionKey: key}
        UiService.getTemplate(params).then((res) => {
          this.$router.push({ name: 'do', params: {templateName: res.template, inputs: res.inputs} })
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      }
    },

    components: {
      node
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>

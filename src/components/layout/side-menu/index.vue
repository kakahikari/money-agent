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
                @click="action(child.action_key, child.text)"
                "v-waves.block"=""
              ) {{ child.text }}
</template>

<script>
  import node from './node'
  import UiService from 'services/uiService'
  import { AgentTreeNode, AgentTree } from 'helper/agentTree'

  export default {
    name: 'side-menu',

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

    mounted () {
      if (this.$store.state.AUTH.sideMenu.length === 0) {
        this.$store.dispatch('getSideMenu', {context: this})
      }
    },

    methods: {
      action (key, pageTitle) {
        const params = {context: this, actionKey: key}
        UiService.getTemplate(params).then((res) => {
          // 處理agent_id之階層顯示
          let agent = res.inputs.filter(node => node.type === 'select' && node.name === 'agent_id')
          let agentTree = new AgentTree()
          if (agent.length > 0) {
            agent = agent[0]
            agent['agent-info'].forEach((node) => {
              let agentTreeNode = new AgentTreeNode(node.id, node.name, node.parent_id)
              agentTree.add(agentTreeNode)
            })
            agentTree.setOptions()
            agent.options = agentTree.options
          }

          let selectList = res.inputs.filter(node => node.type === 'select')
          for (var i = 0; i < selectList.length; i++) {
            if (selectList[i].required === 'true') selectList[i].value = selectList[i].options[0].value
            let options = selectList[i].options
            // options的text丟進翻譯
            for (var j = 0; j < options.length; j++) {
              options[j].text = this.$root.i18n(options[j].text)
            }
            // 當不為required
            if (selectList[i].options !== undefined && selectList[i].required !== 'true') {
              selectList[i].options.unshift({text: 'all', value: undefined})
            }
          }

          this.$router.push({ name: res.template, params: {actionName: res.template, inputs: res.inputs, pageTitle: pageTitle} })
        })
        .catch((err) => {
          console.log(err)
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

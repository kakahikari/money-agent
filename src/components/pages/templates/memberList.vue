<template lang="pug">
  .card(v-if="list.length > 0")
    .card-block
      .card-text.text-right
        .text-muted {{ $root.i18n('Total number of records') }}: {{ total }}
      b-table.table-bordered.table-sm(striped ":per-page"="Number(formData.page_size)" ":items"="list" ":fields"="fields")
        template(slot="status" scope="item")
          | {{ item.value? $root.i18n('activate') : $root.i18n('forbid') }}
        template(slot="deposit_withdrawl" scope="item")
          template(v-if="item.sum_in_money")
            | {{ item.sum_in_money | toNumber }}
          template(v-else) 0
          |  / 
          template(v-if="item.sum_out_money")
            | {{ item.sum_out_money | toNumber }}
          template(v-else) 0
        template(slot="money" scope="item")
          | {{ item.value | toNumber }}
      .row.justify-content-center
        pagination(v-model="currentPage" ":totalPage"="totalPage" @pageChange="pageChange")
</template>

<script>
  import pagination from './pagination'
  import MemberService from 'services/memberService'

  export default {
    name: 'templates__memberList',

    data () {
      return {
        currentPage: 1,
        total: 100,
        list: [],
        fields: {
          agent: { label: this.$root.i18n('agent'), sortable: true },
          rate_level: { label: this.$root.i18n('rebate level'), sortable: true },
          user: { label: this.$root.i18n('membership account'), sortable: true },
          name: { label: this.$root.i18n('member'), sortable: true },
          status: { label: this.$root.i18n('user status'), sortable: true },
          register_date: { label: this.$root.i18n('register time'), sortable: true },
          login_date: { label: this.$root.i18n('last login time'), sortable: true },
          login_ip: { label: this.$root.i18n('last login IP'), sortable: true },
          deposit_withdrawl: { label: this.$root.i18n('total deposit amount/total withdrawl amount') },
          money: { label: this.$root.i18n('account balance'), sortable: true },
          note: { label: this.$root.i18n('note') }
        }
      }
    },

    props: {
      formData: {
        default: null,
        type: Object
      }
    },

    computed: {
      totalPage () {
        return Math.ceil(this.total) / this.formData.page_size
      }
    },

    watch: {
      formData (val) {
        this.doRequest(val)
      }
    },

    methods: {
      doRequest (formData) {
        const body = {}
        body.agent_id = formData.agent_id
        body.login_ip = formData.login_ip
        body.page_size = formData.page_size
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.user_account = formData.user_account
        body.user_name = formData.user_name
        body.user_status = formData.user_status
        body.page_num = this.currentPage
        MemberService.getMemberList({context: this, body: body}).then((res) => {
          this.list = res
        })
      },
      pageChange (val) {
        if (val <= this.totalPage && val > 0) {
          this.currentPage = val
          this.doRequest(this.formData)
        }
      }
    },

    components: {
      pagination
    }
  }
</script>

<style lang="scss" scoped>
  .nowrap {
    white-space: nowrap;
  }
  .card-text {
    margin-bottom: .5em;
  }
</style>

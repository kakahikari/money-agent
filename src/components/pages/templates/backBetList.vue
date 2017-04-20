<template lang="pug">
  .card(v-if="backList.length > 0")
    .card-block
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="mainList" ":fields"="mainFields")
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="backList" ":fields"="backFields")
</template>

<script>
  import ReportService from 'services/reportService'

  export default {
    name: 'templates__backBetList',

    data () {
      return {
        currentPage: 1,
        mainList: [],
        mainFields: {
          agent_name: { label: this.$root.i18n('agent'), sortable: true },
          number: { label: this.$root.i18n('有效會員?'), sortable: true },
          kind_code: { label: this.$root.i18n('4 categories'), sortable: true },
          sum_bet: { label: this.$root.i18n('account balance'), sortable: true },
          Sub_total: { label: this.$root.i18n('agent'), sortable: true },
          back_money: { label: this.$root.i18n('membership account'), sortable: true },
          profit: { label: this.$root.i18n('優惠?'), sortable: true },
          fee_money: { label: this.$root.i18n('手續費?'), sortable: true },
          cheap_money: { label: this.$root.i18n('member'), sortable: true },
          rake_money: { label: this.$root.i18n('會員反水') }
        },
        backList: [],
        backFields: {
          people_money: { label: this.$root.i18n('agent'), sortable: true },
          people_num: { label: this.$root.i18n('agent'), sortable: true },
          rateEG: { label: this.$root.i18n('agent'), sortable: true },
          rateLI: { label: this.$root.i18n('agent'), sortable: true },
          rateLO: { label: this.$root.i18n('agent'), sortable: true },
          rateSP: { label: this.$root.i18n('agent'), sortable: true }
        }
      }
    },

    props: {
      formData: {
        default: null,
        type: Object
      }
    },

    watch: {
      formData (val) {
        this.doRequest(val)
      }
    },

    methods: {
      doRequest (formData) {
        this.mainList = []
        this.backList = []
        const body = {}
        body.agent_id = formData.agent_id
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.page_size = formData.page_size
        ReportService.getBackBetReport({context: this, body: body}).then((res) => {
          // if()
          this.mainList = res.main_list
          this.backList = res.back_set
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      }
    }
  }
</script>

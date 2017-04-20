<template lang="pug">
  .card(v-if="mainList.length > 0")
    .card-block
      b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="mainList" ":fields"="mainFields")
      template(v-if="kind == '10' && backList10.length > 0")
        b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="backList10" ":fields"="backFields10")
      template(v-else-if="backList.length > 0")
        b-table.table-bordered(striped ":per-page"="Number(formData.page_size)" ":items"="backList" ":fields"="backFields")
          template(slot="kind_code" scope="item")
            | {{ $root.i18n(item.value) }}
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
          kind_code: { label: this.$root.i18n('4 categories'), sortable: true },
          sum_bet: { label: this.$root.i18n('combined valid bet'), sortable: true },
          profit: { label: this.$root.i18n('profits (valid bet-payout)'), sortable: true },
          back_money: { label: this.$root.i18n('amount of return commission rate'), sortable: true },
          cheap_money: { label: this.$root.i18n('promotion'), sortable: true },
          fee_money: { label: this.$root.i18n('processing fees'), sortable: true },
          rake_money: { label: this.$root.i18n('member rebate') },
          Sub_total: { label: this.$root.i18n('return commission tally'), sortable: true }
        },
        backList: [],
        backFields: {
          name: { label: this.$root.i18n('game company'), sortable: true },
          money: { label: this.$root.i18n('4 categories'), sortable: true },
          rate: { label: this.$root.i18n('agent'), sortable: true }
        },
        backList10: [],
        backFields10: {
          people_money: { label: this.$root.i18n('valid bet (condition)'), sortable: true },
          people_num: { label: this.$root.i18n('valid member (condition)'), sortable: true },
          rateEG: { label: this.$root.i18n('electronic return commission rate (profits)'), sortable: true },
          rateLI: { label: this.$root.i18n('live return commission rate (profits)'), sortable: true },
          rateLO: { label: this.$root.i18n('lottery comission rate (valid)'), sortable: true },
          rateSP: { label: this.$root.i18n('sports return commission (profits)'), sortable: true }
        },
        kind: 0
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
        this.backList10 = []
        const body = {}
        body.agent_id = formData.agent_id
        body.start_date = formData.start_date
        body.end_date = formData.end_date
        body.page_size = formData.page_size
        ReportService.getBackBetReport({context: this, body: body}).then((res) => {
          this.kind = res.kind
          if (this.kind === '10') {
            this.mainFields.number = { label: this.$root.i18n('number of active members'), sortable: true }
            this.backList10 = res.back_set
          } else {
            delete this.mainFields['number']
            this.backList = res.back_set
          }
          this.mainList.push(res.main_list[''])
          this.mainList.push(res.main_list[0])
        })
        .catch((err) => {
          this.$root.showToast({type: 'warning', content: err})
        })
      }
    }
  }
</script>

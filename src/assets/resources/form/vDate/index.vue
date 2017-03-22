<template lang="pug">
  v-scroll.calendar-wrap(ref="scrollToY")
    .label-area(@click.prevent="open()")
      v-label(":v-class"="vClass", ":legend"="legend")
        slot
        input(type="text", ":placeholder"="placeholder", v-model="result", readonly="true", ":class"="inputClass", ":disabled"="disabled")
        template(slot="errors")
          slot(name="errors")
    datepicker(":format"="format", v-model="result", language="zh", ref="datepickerBody", ":disabled"="range")
</template>

<script>
  import vLabel from 'layout/components/v-label'
  import Datepicker from './calendar'
  import moment from 'moment'
  import vScroll from 'layout/components/v-scroll'

  const datePipe = (val) => {
    if(val == 'today') return new Date()
    return val
  }

  export default {
    name: 'v-date',

    data() {
      return {
        result: ''
      }
    },

    props: {
      value: {
        validator: (val) => {
          return val === null || val instanceof Date || typeof val === 'string'
        }
      },
      legend: String,
      vClass: {
        type: String,
        default: ''
      },
      inputClass: {
        type: Object
      },
      placeholder: {
        type: String
      },
      format: {
        default: 'yyyy-MM-dd'
      },
      startDate: {
        type: String
      },
      endDate: {
        type: String
      },
      disabled: {
        type: Boolean
      }
    },

    watch: {
      result(val, oldVal) {
        const valDate = moment(val).format('YYYY-MM-DD')
        const result = valDate != 'Invalid date' ? valDate : ''
        this.$emit('selected', result)
        this.$emit('input', result)
      },
      value(val, oldVal) {
        this.result = val
      }
    },

    computed: {
      range() {
        let obj = {}
        const isStartDate = !!this.startDate && moment(datePipe(this.startDate)).isValid()
        const isEndDate = !!this.endDate && moment(datePipe(this.endDate)).isValid()

        if(isStartDate) obj.to = moment(datePipe(this.startDate)).toDate()
        if(isEndDate) obj.from = moment(datePipe(this.endDate)).toDate()

        return obj
      }
    },

    mounted() {
      this.result = this.value
    },

    methods: {
      async open() {
        if(await this.disabled) return
        await this.$refs.datepickerBody.showCalendar()
        this.$refs.scrollToY.scroll({el: this.$el})
      }
    },

    components: {
      Datepicker,
      vLabel,
      vScroll
    }
  }
</script>

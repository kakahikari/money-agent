<template>
  <transition-group tag="div" name="wrapper" v-show="isOpen()">

    <!-- Day View -->
    <div class="calendar" v-show="showDayView" key="calendar">
        <header>
            <span
                @click="previousMonth"
                class="prev"
                v-bind:class="{ 'disabled' : previousMonthDisabled(currDate) }"><icon name="arrow-left"></icon></span>
            <span @click="showMonthCalendar" class="up">{{ currMonthName }} {{ currYear }}</span>
            <span
                @click="nextMonth"
                class="next"
                v-bind:class="{ 'disabled' : nextMonthDisabled(currDate) }"><icon name="arrow-right"></icon></span>
        </header>
        <div class="weekdays">
          <span class="cell day-header" v-for="d in daysOfWeek">{{ d }}</span>
        </div>
        <div class="days">
          <span class="cell day blank" v-for="d in blankDays"></span>
          <span class="cell day"
          v-for="day in days"
          track-by="timestamp"
          v-bind:class="{ 'selected':day.isSelected, 'disabled':day.isDisabled, 'highlighted': day.isHighlighted}"
          @click="selectDate(day)">
            {{ day.date }}
          </span>
        </div>
    </div>

    <!-- Month View -->
    <div class="calendar" v-show="showMonthView" key="calendar">
        <header>
          <span
              @click="previousYear"
              class="prev"
              v-bind:class="{ 'disabled' : previousYearDisabled(currDate) }"><icon name="arrow-left"></icon></span>
          <span @click="showYearCalendar" class="up">{{ getYear() }}</span>
          <span
              @click="nextYear"
              class="next"
              v-bind:class="{ 'disabled' : nextYearDisabled(currDate) }"><icon name="arrow-right"></icon></span>
        </header>
        <span class="cell month"
            v-for="month in months"
            track-by="timestamp"
            v-bind:class="{ 'selected': month.isSelected, 'disabled': month.isDisabled }"
            @click.stop="selectMonth(month)">{{ month.month }}</span>
    </div>

    <!-- Year View -->
    <div class="calendar" v-show="showYearView" key="calendar">
        <header>
          <span @click="previousDecade" class="prev"
              v-bind:class="{ 'disabled' : previousDecadeDisabled(currDate) }"><icon name="arrow-left"></icon></span>
          <span>{{ getDecade() }}</span>
          <span @click="nextDecade" class="next"
              v-bind:class="{ 'disabled' : nextMonthDisabled(currDate) }"><icon name="arrow-right"></icon></span>
        </header>
        <span
            class="cell year"
            v-for="year in years"
            track-by="timestamp"
            v-bind:class="{ 'selected': year.isSelected, 'disabled': year.isDisabled }"
            @click.stop="selectYear(year)">{{ year.year }}</span>
    </div>

  </transition-group>
</template>

<script>
  import DateUtils from './utils/DateUtils.js'
  import DateLanguages from './utils/DateLanguages.js'
  import moment from 'moment'

  export default {
    props: {
      value: {
        validator: (val) => {
          return val === null || val instanceof Date || typeof val === 'string'
        }
      },
      name: {
        value: String
      },
      format: {
        value: String,
        default: 'yyyy-MM-dd'
      },
      language: {
        value: String,
        default: 'en'
      },
      disabled: {
        type: Object
      },
      highlighted: {
        type: Object
      },
      placeholder: {
        type: String
      },
      inline: {
        type: Boolean
      },
      inputClass: {
        type: String
      },
      wrapperClass: {
        type: String
      },
      mondayFirst: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        currDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).getTime(),
        selectedDate: null,
        showDayView: false,
        showMonthView: false,
        showYearView: false,
        calendarHeight: 0
      }
    },
    watch: {
      value (value) {
        this.setValue(value)
      }
    },
    computed: {
      formattedValue () {
        if (!this.selectedDate) {
          return null
        }
        return DateUtils.formatDate(new Date(this.selectedDate), this.format, this.translation)
      },
      translation () {
        return DateLanguages.translations[this.language]
      },
      currMonthName () {
        const d = new Date(this.currDate)
        return DateUtils.getMonthNameAbbr(d.getMonth(), this.translation.months.abbr)
      },
      currYear () {
        const d = new Date(this.currDate)
        return d.getFullYear()
      },
      blankDays () {
        const d = new Date(this.currDate)
        let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes())
        if (this.mondayFirst) {
          return dObj.getDay() > 0 ? dObj.getDay() - 1 : 6
        }
        return dObj.getDay()
      },
      daysOfWeek () {
        if (this.mondayFirst) {
          const tempDays = this.translation.days.slice()
          tempDays.push(tempDays.shift())
          return tempDays
        }
        return this.translation.days
      },
      days () {
        const d = new Date(this.currDate)
        let days = []
        let dObj = new Date(d.getFullYear(), d.getMonth(), 1, d.getHours(), d.getMinutes())
        let daysInMonth = DateUtils.daysInMonth(dObj.getFullYear(), dObj.getMonth())
        for (let i = 0; i < daysInMonth; i++) {
          days.push({
            date: dObj.getDate(),
            timestamp: dObj.getTime(),
            isSelected: this.isSelectedDate(dObj),
            isDisabled: this.isDisabledDate(dObj),
            isHighlighted: this.isHighlightedDate(dObj)
          })
          dObj.setDate(dObj.getDate() + 1)
        }
        return days
      },
      months () {
        const d = new Date(this.currDate)
        let months = []
        let dObj = new Date(d.getFullYear(), 0, d.getDate(), d.getHours(), d.getMinutes())
        for (let i = 0; i < 12; i++) {
          months.push({
            month: DateUtils.getMonthName(i, this.translation.months.original),
            timestamp: dObj.getTime(),
            isSelected: this.isSelectedMonth(dObj),
            isDisabled: this.isDisabledMonth(dObj)
          })
          dObj.setMonth(dObj.getMonth() + 1)
        }
        return months
      },
      years () {
        const d = new Date(this.currDate)
        let years = []
        let dObj = new Date(Math.floor(d.getFullYear() / 10) * 10, d.getMonth(), d.getDate(), d.getHours(), d.getMinutes())
        for (let i = 0; i < 10; i++) {
          years.push({
            year: dObj.getFullYear(),
            timestamp: dObj.getTime(),
            isSelected: this.isSelectedYear(dObj),
            isDisabled: this.isDisabledYear(dObj)
          })
          dObj.setFullYear(dObj.getFullYear() + 1)
        }
        return years
      }
    },
    methods: {
      close () {
        this.showDayView = this.showMonthView = this.showYearView = false
      },
      isOpen () {
        return this.showDayView || this.showMonthView || this.showYearView
      },
      isInline () {
        return typeof this.inline !== 'undefined' && this.inline
      },
      showCalendar () {
        if (this.isInline()) {
          return false
        }
        if (this.isOpen()) {
          return this.close()
        }
        this.showDayCalendar()
      },
      showDayCalendar () {
        this.close()
        this.showDayView = true
        this.$emit('opened')
      },
      showMonthCalendar () {
        this.close()
        this.showMonthView = true
      },
      showYearCalendar () {
        this.close()
        this.showYearView = true
      },

      setDate (timestamp) {
        const result = moment(timestamp).format('YYYY-MM-DD')
        this.selectedDate = new Date(timestamp)
        this.currDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1).getTime()
        this.$emit('selected', result)
        this.$emit('input', result)
      },

      selectDate (day) {
        if (day.isDisabled) {
          return false
        }
        this.setDate(day.timestamp)
        if (this.isInline()) {
          return this.showDayCalendar()
        }
        this.close()
      },

      selectMonth (month) {
        if (month.isDisabled) {
          return false
        }
        this.currDate = month.timestamp
        this.showDayCalendar()
      },

      selectYear (year) {
        if (year.isDisabled) {
          return false
        }
        this.currDate = year.timestamp
        this.showMonthCalendar()
      },

      getMonth () {
        let d = new Date(this.currDate)
        return d.getMonth()
      },

      getYear () {
        let d = new Date(this.currDate)
        return d.getFullYear()
      },

      getDecade () {
        let d = new Date(this.currDate)
        let sD = Math.floor(d.getFullYear() / 10) * 10
        return sD + '\'s'
      },

      previousMonth () {
        if (this.previousMonthDisabled()) {
          return false
        }
        let d = new Date(this.currDate)
        d.setMonth(d.getMonth() - 1)
        this.currDate = d.getTime()
      },

      previousMonthDisabled () {
        if (typeof this.disabled === 'undefined' || typeof this.disabled.to === 'undefined' || !this.disabled.to) {
          return false
        }
        let d = new Date(this.currDate)
        if (
          this.disabled.to.getMonth() >= d.getMonth() &&
          this.disabled.to.getFullYear() >= d.getFullYear()
        ) {
          return true
        }
        return false
      },

      nextMonth () {
        if (this.nextMonthDisabled()) {
          return false
        }
        let d = new Date(this.currDate)
        const daysInMonth = DateUtils.daysInMonth(d.getFullYear(), d.getMonth())
        d.setDate(d.getDate() + daysInMonth)
        this.currDate = d.getTime()
      },

      nextMonthDisabled () {
        if (typeof this.disabled === 'undefined' || typeof this.disabled.from === 'undefined' || !this.disabled.from) {
          return false
        }
        let d = new Date(this.currDate)
        if (
          this.disabled.from.getMonth() <= d.getMonth() &&
          this.disabled.from.getFullYear() <= d.getFullYear()
        ) {
          return true
        }
        return false
      },

      previousYear () {
        if (this.previousYearDisabled()) {
          return false
        }
        let d = new Date(this.currDate)
        d.setYear(d.getFullYear() - 1)
        this.currDate = d.getTime()
      },

      previousYearDisabled () {
        if (typeof this.disabled === 'undefined' || typeof this.disabled.to === 'undefined' || !this.disabled.to) {
          return false
        }
        let d = new Date(this.currDate)
        if (this.disabled.to.getFullYear() >= d.getFullYear()) {
          return true
        }
        return false
      },

      nextYear () {
        if (this.nextYearDisabled()) {
          return false
        }
        let d = new Date(this.currDate)
        d.setYear(d.getFullYear() + 1)
        this.currDate = d.getTime()
      },

      nextYearDisabled () {
        if (typeof this.disabled === 'undefined' || typeof this.disabled.from === 'undefined' || !this.disabled.from) {
          return false
        }
        let d = new Date(this.currDate)
        if (this.disabled.from.getFullYear() <= d.getFullYear()) {
          return true
        }
        return false
      },

      previousDecade () {
        if (this.previousDecadeDisabled()) {
          return false
        }
        let d = new Date(this.currDate)
        d.setYear(d.getFullYear() - 10)
        this.currDate = d.getTime()
      },

      previousDecadeDisabled () {
        if (typeof this.disabled === 'undefined' || typeof this.disabled.to === 'undefined' || !this.disabled.to) {
          return false
        }
        let d = new Date(this.currDate)
        if (Math.floor(this.disabled.to.getFullYear() / 10) * 10 >= Math.floor(d.getFullYear() / 10) * 10) {
          return true
        }
        return false
      },

      nextDecade () {
        if (this.nextDecadeDisabled()) {
          return false
        }
        let d = new Date(this.currDate)
        d.setYear(d.getFullYear() + 10)
        this.currDate = d.getTime()
      },

      nextDecadeDisabled () {
        if (typeof this.disabled === 'undefined' || typeof this.disabled.from === 'undefined' || !this.disabled.from) {
          return false
        }
        let d = new Date(this.currDate)
        if (Math.ceil(this.disabled.from.getFullYear() / 10) * 10 <= Math.ceil(d.getFullYear() / 10) * 10) {
          return true
        }
        return false
      },

      isSelectedDate (dObj) {
        return this.selectedDate && this.selectedDate.toDateString() === dObj.toDateString()
      },

      isDisabledDate (date) {
        let disabled = false

        if (typeof this.disabled === 'undefined') {
          return false
        }

        if (typeof this.disabled.dates !== 'undefined') {
          this.disabled.dates.forEach((d) => {
            if (date.toDateString() === d.toDateString()) {
              disabled = true
              return true
            }
          })
        }
        if (typeof this.disabled.to !== 'undefined' && this.disabled.to && date < this.disabled.to) {
          disabled = true
        }
        if (typeof this.disabled.from !== 'undefined' && this.disabled.from && date > this.disabled.from) {
          disabled = true
        }
        if (typeof this.disabled.days !== 'undefined' && this.disabled.days.indexOf(date.getDay()) !== -1) {
          disabled = true
        }
        return disabled
      },

      isHighlightedDate (date) {
        if (this.isDisabledDate(date)) {
          return false
        }

        let highlighted = false

        if (typeof this.highlighted === 'undefined') {
          return false
        }

        if (typeof this.highlighted.dates !== 'undefined') {
          this.highlighted.dates.forEach((d) => {
            if (date.toDateString() === d.toDateString()) {
              highlighted = true
              return true
            }
          })
        }

        if (this.isDefined(this.highlighted.from) && this.isDefined(this.highlighted.to)) {
          highlighted = date >= this.highlighted.from && date <= this.highlighted.to
        }

        if (typeof this.highlighted.days !== 'undefined' && this.highlighted.days.indexOf(date.getDay()) !== -1) {
          highlighted = true
        }
        return highlighted
      },

      isDefined (prop) {
        return typeof prop !== 'undefined' && prop
      },

      isSelectedMonth (date) {
        return (this.selectedDate &&
          this.selectedDate.getFullYear() === date.getFullYear() &&
          this.selectedDate.getMonth() === date.getMonth())
      },

      isDisabledMonth (date) {
        let disabled = false

        if (typeof this.disabled === 'undefined') {
          return false
        }

        if (typeof this.disabled.to !== 'undefined' && this.disabled.to) {
          if (
            (date.getMonth() < this.disabled.to.getMonth() && date.getFullYear() <= this.disabled.to.getFullYear()) ||
            date.getFullYear() < this.disabled.to.getFullYear()
          ) {
            disabled = true
          }
        }
        if (typeof this.disabled.from !== 'undefined' && this.disabled.from) {
          if (
            this.disabled.from &&
            (date.getMonth() > this.disabled.from.getMonth() && date.getFullYear() >= this.disabled.from.getFullYear()) ||
            date.getFullYear() > this.disabled.from.getFullYear()
          ) {
            disabled = true
          }
        }
        return disabled
      },

      isSelectedYear (date) {
        return this.selectedDate && this.selectedDate.getFullYear() === date.getFullYear()
      },

      isDisabledYear (date) {
        let disabled = false
        if (typeof this.disabled === 'undefined' || !this.disabled) {
          return false
        }

        if (typeof this.disabled.to !== 'undefined' && this.disabled.to) {
          if (date.getFullYear() < this.disabled.to.getFullYear()) {
            disabled = true
          }
        }
        if (typeof this.disabled.from !== 'undefined' && this.disabled.from) {
          if (date.getFullYear() > this.disabled.from.getFullYear()) {
            disabled = true
          }
        }

        return disabled
      },

      setValue (date) {
        if (typeof date === 'string') {
          let parsed = new Date(date)
          date = isNaN(parsed.valueOf()) ? null : parsed
        }
        if (!date) {
          const d = new Date()
          this.currDate = new Date(d.getFullYear(), d.getMonth(), 1).getTime()
          this.selectedDate = null
          return
        }
        this.selectedDate = date
        this.currDate = new Date(date.getFullYear(), date.getMonth(), 1).getTime()
      },

      init () {
        if (this.value) {
          this.setValue(this.value)
        }
        if (this.isInline()) {
          this.showDayCalendar()
        }

        document.addEventListener('click', (e) => {
          const bigBrother = this.$parent.$el
          if (bigBrother && !bigBrother.contains(e.target)) {
            if (this.isInline()) {
              return this.showDayCalendar()
            }
            this.close()
          }
        }, false)
      }
    },

    mounted () {
      this.init()
    }
  }
</script>

<style lang="scss" scoped>
  @import "./style";
</style>

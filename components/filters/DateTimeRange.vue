<template>
  <div>
    <p>
      <input
        v-model="dateVal"
        type="date"
        :min="min"
        :max="max"
        @input="myDate = $event.target.valueAsDate"
      >
    </p>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['trigger', 'sdate', 'min', 'max'],

  data () {
    return {
      myDate: new Date(), // note this date is set in UTC (Greenwich time) not your current timezone
      dateVal: this.sdate ? (Date.parse(this.sdate) && new Date(new Date(this.sdate).getTime() - (new Date(this.sdate).getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0]) : new Date() && new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0] // UTC (Greenwich time)
    }
  },

  watch: {
    myDate: {
      handler (newVal) {
        this.$emit('DTChange', newVal)
      }
    },

    trigger: {
      handler (newVal) {
        this.$emit('DTChange', this.myDate)
      }
    },

    sdate: {
      handler (newVal) {
        let dt = Date.parse(newVal)
        dt = dt && new Date(new Date(dt).getTime() - (new Date(dt).getTimezoneOffset() * 60 * 1000)).toISOString().split('T')[0] // UTC (Greenwich time)
        this.dateVal = dt
      }
    }
  }
}
</script>

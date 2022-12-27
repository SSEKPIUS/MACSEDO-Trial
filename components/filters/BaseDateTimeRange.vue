<template>
  <div>
    <div class="flex items-center justify-center p-1">
      <div class="flex border-2 border-gray-200 items-center p-1 rounded-md">
        <div class="p-1 bg-gray-200 rounded-l-md h-8 cursor-pointer" @click="DTChange()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div class="p-1 bg-gray-200  h-8">
          <DateTimeRange :trigger="trigger" :sdate="From" @DTChange="DTRangeFrom" />
        </div>
        <div class="p-1 bg-gray-200  h-8">
          <DateTimeRange :trigger="trigger" :sdate="To" @DTChange="DTRangeTo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters, mapMutations } from 'vuex'
import DateTimeRange from '@/components/filters/DateTimeRange'
export default {

  components: {
    DateTimeRange
  },

  data () {
    return {
      trigger: 0,
      dtFrom: null,
      dtTo: null,
      retry: 0
    }
  },

  computed: {
    ...mapGetters(['getSearch']),

    From () { return this.getSearch.DRange.from },
    To () { return this.getSearch.DRange.to }
  },

  methods: {
    ...mapMutations(['SET_SEARCH']),

    DTRangeFrom (val) {
      this.dtFrom = val
    },

    DTRangeTo (val) {
      this.dtTo = val
    },

    DTChange () {
      if (this.dtFrom == null || this.dtTo == null) {
        this.$toast.success('Choosing Default Date Range!')
        this.trigger = Math.random()
        this.retry += 1
        if (this.retry > 2) {
          this.retry = 0
          return this
        }
        setTimeout(() => {
          this.$nextTick(() => {
            this.DTChange()
          })
        }, 500)
        return this
      }

      const from = this.formatDate(this.dtFrom)
      const to = this.formatDate(this.dtTo)

      // eslint-disable-next-line no-unused-vars
      const search = {
        selection: this.getSearch.selection,
        search: this.getSearch.search,
        DRange: {
          from,
          to
        }
      }
      this.SET_SEARCH(search)
    },

    formatDate (val) {
      const date = new Date(val)
      return date.toLocaleString(['en-US'], // { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric'
        })
    }
  }

}
</script>

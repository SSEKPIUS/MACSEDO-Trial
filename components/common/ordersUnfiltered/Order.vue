<template>
  <div class=" border  w-full p-2 h-full">
    <div class=" w-full p-2  shadow-2xl">
      <BaseFilter
        section="orders"
        section-text="view orders"
        :selection="selection"
        :search="true"
        :options="true"
        :dates="true"
        :reset-date="resetDate"
        @fnselection="fnselection"
        @fnsearch="fnsearch"
        @DTRange="DTRange"
      />

      <ContentOrders :trigger="trigger" :search="search" :users="getUsers" />
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable vue/require-prop-types */
import { mapGetters } from 'vuex'
import BaseFilter from '@/components/filters/BaseFilter'
import ContentOrders from '@/components/common/ordersUnfiltered/ContentOrders'
export default {
  name: 'OrderUnFiltered',

  components: {
    ContentOrders, BaseFilter
  },

  data () {
    return {
      selection: ['ALL', 'SUPERVISOR', 'SERVICE-BAR', 'SERVICE-WAITER-WAITRESS', 'RECEPTION', 'KITCHEN', 'STEAM-SAUNA-MASSAGE', 'STORE', 'ACCOUNTS'],
      search: {
        mode: null,
        selection: null,
        search: null,
        DRange: {
          from: null,
          to: null
        }
      },
      trigger: null,
      resetDate: null
    }
  },

  computed: {
    ...mapGetters(['getUsers'])
  },

  methods: {
    fnselection (val) {
      this.search.selection = val
      this.search.mode = 'selection'
      this.trigger = Math.random()
    },

    fnsearch (val) {
      this.search.search = val
      this.search.mode = 'search'
      this.trigger = Math.random()
    },

    DTRange (Dfrom, Dto) {
      this.search.DRange = { from: Dfrom, to: Dto }
      this.search.mode = 'DTRange'
      this.trigger = Math.random()
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

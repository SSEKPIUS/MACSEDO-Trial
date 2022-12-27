<template>
  <div class=" min-w-min main">
    <div class="h-auto">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <Orders :users="getUsers" :orders="orders" @loadOrders="loadOrders" />
        </div>
      </div>
      <TabBottom :tabs="tabs" />
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable vue/require-prop-types */
import { mapGetters, mapActions, mapMutations } from 'vuex'
import _ from 'lodash'
import Orders from '@/components/kitchen/orders/Orders'
import TabBottom from '@/components/common/tabroutes/TabBottom'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Orders,
    TabBottom,
    TabTop
  },

  data () {
    return {
      tabs: [
        { name: 'NEW ORDERS', path: '/kitchen/new-orders', active: true },
        { name: 'ALL ORDERS', path: '/kitchen/all-orders', active: false },
        { name: 'INVENTORY', path: '/kitchen/inventory', active: false },
        { name: 'INVENTORY LOGS', path: '/kitchen/inventory-logs', active: false }
      ]
    }
  },

  computed: {
    ...mapGetters(['getUsers', 'getToken', 'getTimer', 'getTimerInterval', 'getOrders']),

    getActiveTab () { return this.$store.state.activeTabs.kitchenMain },

    orders () {
      return this.filterNew_CancellingOrders(this.getOrders)
    }
  },

  mounted () {
    this.loadUsers()
    this.loadOrders()
    clearInterval(this.getTimer)
    this.setTimerInterval()
  },

  methods: {
    ...mapActions(['loadUsers', 'loadOrders']),
    ...mapMutations(['setTimer']),

    setTimerInterval () {
      this.setTimer(setInterval(this.refreshData, this.getTimerInterval))
    },

    refreshData () {
      this.loadOrders()
    },

    filterNew_CancellingOrders (orders) { // 5 pending, 10 new  15 served 20 cancelling 25 cancelled
      return _.filter(orders, function (o) {
        return (o.status == 10 || o.status == 20)
      })
    }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
</style>

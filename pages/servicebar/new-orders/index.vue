<template>
  <div class=" min-w-min main">
    <div class="h-auto">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <Orders :users="getUsers" :token="getToken" :orders="orders" @loadOrders="loadOrders" />
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
import Orders from '@/components/servicebar/orders/Orders'
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
      // orders: [],
      tabs: [
        { name: 'NEW ORDERS', path: '/servicebar/new-orders', active: true, mark: 0 },
        { name: 'ALL ORDERS', path: '/servicebar/all-orders', active: false, mark: 0 },
        { name: 'INVOICES', path: '/servicebar/invoices', active: false, mark: 0 },
        { name: 'INVENTORY', path: '/servicebar/inventory', active: false, mark: 0 },
        { name: 'INVENTORY LOGS', path: '/servicebar/inventory-logs', active: false, mark: 0 }
      ]
    }
  },

  computed: {
    ...mapGetters(['getUser', 'getToken', 'getUsers', 'getTimer', 'getTimerInterval', 'getOrders']),

    orders () {
      return _.filter(this.getOrders, function (o) { // 5 pending, 10 new  15 served 20 cancelling 25 cancelled
        return (o.status == 10 || o.status == 20)
      })
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
    }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
</style>

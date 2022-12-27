<template>
  <div class="min-w-min main">
    <div class="h-auto">
      <TabTop :tabs="tabs" />
      <div class="w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <Orders
            :users="getUsers"
            :token="getToken"
            :orders="getOrders"
            @loadOrders="loadOrders"
          />
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
      tabs: [
        { name: 'NEW ORDERS', path: '/servicebar/new-orders', active: false },
        { name: 'ALL ORDERS', path: '/servicebar/all-orders', active: true },
        { name: 'INVOICES', path: '/servicebar/invoices', active: false },
        { name: 'INVENTORY', path: '/servicebar/inventory', active: false },
        {
          name: 'INVENTORY LOGS',
          path: '/servicebar/inventory-logs',
          active: false
        }
      ]
    }
  },

  computed: {
    ...mapGetters([
      'getUser',
      'getToken',
      'getUsers',
      'getTimer',
      'getTimerInterval',
      'getOrders'
    ])
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

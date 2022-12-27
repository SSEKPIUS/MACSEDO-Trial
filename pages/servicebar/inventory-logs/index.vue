<template>
  <div class=" min-w-min main">
    <div class="h-auto">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <Inventorylogs />
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
import Inventorylogs from '@/components/common/Inventorylogs'
import TabBottom from '@/components/common/tabroutes/TabBottom'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Inventorylogs,
    TabBottom,
    TabTop
  },

  data () {
    return {
      tabs: [
        { name: 'NEW ORDERS', path: '/servicebar/new-orders', active: false },
        { name: 'ALL ORDERS', path: '/servicebar/all-orders', active: false },
        { name: 'INVOICES', path: '/servicebar/invoices', active: false },
        { name: 'INVENTORY', path: '/servicebar/inventory', active: false },
        { name: 'INVENTORY LOGS', path: '/servicebar/inventory-logs', active: true }
      ]
    }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
</style>

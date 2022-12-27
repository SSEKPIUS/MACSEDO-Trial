<template>
  <div class=" min-w-min main">
    <div class="h-screen">
      <!--actual component start-->
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <Invoices />
        </div>
      </div>
      <TabBottom :tabs="tabs" />
    <!--actual component end-->
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Invoices from '@/components/common/invoicesUnfiltered/UnfilteredInvoices'
import TabBottom from '@/components/common/tabroutes/TabBottom'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Invoices,
    TabBottom,
    TabTop
  },

  data () {
    return {
      tabs: [
        { name: 'MENU BAR', path: '/supervisor/menu-bar', active: false },
        { name: 'MENU KITCHEN', path: '/supervisor/menu-kitchen', active: false },
        { name: 'INVOICES', path: '/supervisor/invoices', active: true },
        { name: 'ORDERS', path: '/supervisor/orders', active: false },
        { name: 'HOTEL ROOMS', path: '/supervisor/rooms', active: false },
        { name: 'STEAM-SAUNA-MASSAGE', path: '/supervisor/sauna-massage', active: false },
        { name: 'INVENTORY', path: '/supervisor/inventory', active: false },
        { name: 'REPORTS', path: '/supervisor/reports', active: false },
        { name: 'INVENTORY LOGS', path: '/supervisor/inventory-logs', active: false },
        { name: 'SYSTEM LOGS', path: '/supervisor/system-logs', active: false }
      ]
    }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
.menu li {
    color: #343434;
    font-weight: normal;
    font-family: 'Ultra', sans-serif;
    line-height: 40px;
    text-transform: uppercase;
    text-shadow: 0 2px white, 0 3px #777;
}

@media (max-width: 767px) {
    .menu li {
        font-size: 18px;
        line-height: 10px;
        text-transform: uppercase;
        text-shadow: 0 2px white, 0 3px #777;
    }

}
</style>

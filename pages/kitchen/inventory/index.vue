<template>
  <div class=" min-w-min main">
    <div class="h-auto">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <Inventory :usersection="getUser.section" :search="search" />
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
import { mapGetters, mapMutations } from 'vuex'
import Inventory from '@/components/common/Inventory'
import TabBottom from '@/components/common/tabroutes/TabBottom'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Inventory,
    TabBottom,
    TabTop
  },

  data () {
    return {
      tabs: [
        { name: 'NEW ORDERS', path: '/kitchen/new-orders', active: false },
        { name: 'ALL ORDERS', path: '/kitchen/all-orders', active: false },
        { name: 'INVENTORY', path: '/kitchen/inventory', active: true },
        { name: 'INVENTORY LOGS', path: '/kitchen/inventory-logs', active: false }
      ],
      search: {
        selection: 'KITCHEN',
        search: null,
        DRange: {
          from: null,
          to: null
        }
      }
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  },

  created () {
    this.SET_SEARCH(this.search)
  },

  methods: {
    ...mapMutations(['SET_SEARCH'])
  }

}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
</style>

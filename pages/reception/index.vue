<template>
  <div class="min-w-min main">
    <div>
      <div class="flex flex-row">
        <SideNav
          class="bg-gray-300 min-h-screen"
          :page="routeName"
          :service-waiter-waitress-arr-count="serviceWaiterWaitressArrCount"
          @selection="setSelection"
        />
        <div class="border w-full">
          <Guests v-if="selection == 1" @Print="Print" />
          <Rooms v-if="selection == 2" />
          <Orders
            v-if="selection == 3"
            :service-waiter-waitress-arr="serviceWaiterWaitressArr"
            :token="getToken"
            :user="getUser"
            @refresh="loadInvoices"
          />
          <div v-if="selection == 4" class="w-full bg-white p-2 text-center mx-auto">
            <Inventory :usersection="getUser.section" :search="search" />
          </div>
        </div>
      </div>
      <InvoicePrint
        v-show="showModal"
        :showmodal.sync="showModal"
        :invoice="invoiceDataPrint"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable vue/require-prop-types */
import _ from 'lodash'
import { mapGetters, mapMutations, mapActions } from 'vuex'
import SideNav from '@/components/reception/SideNav'
import Guests from '@/components/reception/dashboard/Guests'
import Rooms from '@/components/reception/dashboard/Rooms'
import Orders from '@/components/reception/dashboard/Orders'
import InvoicePrint from '@/components/dialog/InvoicePrintRooms'
import Inventory from '@/components/common/Inventory'

export default {
  components: {
    SideNav,
    Guests,
    Rooms,
    Orders,
    InvoicePrint,
    Inventory
  },

  data () {
    return {
      routeName: 'index',
      selection: 1,
      showModal: false,
      invoiceDataPrint: [],
      serviceWaiterWaitressArr: [],

      search: {
        selection: 'RECEPTION',
        search: null,
        DRange: {
          from: null,
          to: null
        }
      }
    }
  },

  computed: {
    ...mapGetters(['getToken', 'getUser', 'getTimer', 'getTimerInterval', 'getReceipts']),

    serviceWaiterWaitressArrCount () {
      return Object.keys(this.serviceWaiterWaitressArr).length
    }
  },

  watch: {
    getReceipts: {
      handler (newVal) {
        this.serviceWaiterWaitressArr = _.filter(newVal, function (o) {
          return (o.section == 'RECEPTION' && o.status != 15)
        })
      }
    }
  },

  created () {
    this.SET_SEARCH(this.search)
  },

  mounted () {
    this.loadguestsroomsPaginated()
    this.loadGuestsPaginated()
    this.loadguestsrooms()
    this.loadInvoices()
    this.fetchAllMenu()
    clearInterval(this.getTimer)
    this.setTimerInterval()
  },

  methods: {
    ...mapMutations(['SET_SEARCH', 'setGuests', 'setRooms', 'setGuestsCnt', 'setTimer']),
    ...mapActions(['loadInvoices', 'fetchAllMenu', 'loadguestsroomsPaginated', 'loadGuestsPaginated', 'loadguestsrooms']),

    setTimerInterval () {
      this.setTimer(setInterval(this.refreshData, this.getTimerInterval))
    },

    refreshData () {
      this.loadInvoices()
    },

    setSelection (selection) {
      this.selection = selection
    },

    Print (guest) {
      this.invoiceDataPrint = guest
      this.showModal = true
    }
  }
}
</script>

<style scoped>
.main {
  min-width: 1280px;
}
</style>

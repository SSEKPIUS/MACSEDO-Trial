<template>
  <div class=" min-w-min main">
    <Menu
      :receipt="receiptSuper"
      :user="getUser"
      :loading-add-inv="loadingAddInv"
      :loading-save-inv="loadingSaveInv"
      @clear="clear"
      @addToInvoice="addToInvoice"
      @saveInvoicefn="saveInvoicefn"
    />
    <div class="h-auto">
      <!--actual component start-->
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <Invoices :user="getUser" :token="getToken" :receipts="receipts" @refresh="loadInvoices" />
        </div>
      </div>
      <TabBottom :tabs="tabs" />
      <!--actual component end-->
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable vue/require-prop-types */
import { mapGetters, mapActions, mapMutations } from 'vuex'
import _ from 'lodash'
import Invoices from '@/components/servicebar/invoices/Invoices'
import Menu from '@/components/common/Menu'
import TabBottom from '@/components/common/tabroutes/TabBottom'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Menu,
    Invoices,
    TabBottom,
    TabTop
  },

  data () {
    return {
      loadingAddInv: false,
      loadingSaveInv: false,
      receiptSuper: {
        uID: 0,
        name: 0,
        section: 0,
        status: 5, // 5 unpaid, 10 paid
        TTotal: 0,
        created_at: Date.now(),
        orders: []
      },
      tabs: [
        { name: 'NEW ORDERS', path: '/servicebar/new-orders', active: false },
        { name: 'ALL ORDERS', path: '/servicebar/all-orders', active: false },
        { name: 'INVOICES', path: '/servicebar/invoices', active: true },
        { name: 'INVENTORY', path: '/servicebar/inventory', active: false },
        { name: 'INVENTORY LOGS', path: '/servicebar/inventory-logs', active: false }
      ]
    }
  },

  computed: {
    ...mapGetters(['getUser', 'getToken', 'getUsers', 'getTimer', 'getTimerInterval', 'getOrders', 'getReceipts']),

    watchReceiptSuperOrders () { // for sum on orders
      return this.receiptSuper.orders
    },

    receipts () {
      return _.filter(this.getReceipts, function (o) { // not closed invoices
        return (o.status != 15)
      })
    }
  },

  watch: {
    watchReceiptSuperOrders: {
      handler (newVal) {
        let sum = 0
        newVal.forEach(function (order) {
          sum += parseInt(order.cost, 10)
        })
        this.receiptSuper.TTotal = sum
      }
    }
  },

  mounted () {
    this.loadUsers()
    this.loadInvoices()
    this.fetchAllMenu()
    this.resetInvoicefn()
    clearInterval(this.getTimer)
    this.setTimerInterval()
  },

  methods: {
    ...mapActions(['loadUsers', 'loadInvoices', 'fetchAllMenu']),
    ...mapMutations(['setTimer']),

    setTimerInterval () {
      this.setTimer(setInterval(this.refreshData, this.getTimerInterval))
    },

    refreshData () {
      this.loadInvoices()
    },

    clear () {
      this.resetInvoicefn()
    },

    addToInvoice (order) {
      this.loadingAddInv = true
      this.receiptSuper.orders.push(order)
      this.loadingAddInv = false
    },

    resetInvoicefn () {
      this.receiptSuper.uID = this.getUser.id
      this.receiptSuper.name = this.getUser.name
      this.receiptSuper.section = this.getUser.section
      this.receiptSuper.TTotal = 0
      this.receiptSuper.created_at = Date.now()
      this.receiptSuper.orders = []
    },

    async  saveInvoicefn () {
      this.loadingSaveInv = true
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      try {
        await this.$axios.$post('addReceipts', this.receiptSuper, config)
          .then(({ result }) => {
            if (result) {
              this.$toast.success('Receipt Published')
              this.resetInvoicefn()
            }
          })
          .catch((errors) => {
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
        console.log(e)
      }
      this.loadingSaveInv = false
    }
  }
}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
</style>

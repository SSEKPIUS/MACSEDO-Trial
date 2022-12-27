<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class=" min-w-min main" @mousemove="mouseMove">
    <div class="flex flex-row">
      <!--waiters-->
      <div class="shadow-2xl" @mouseenter="show=true" @mouseleave="show=false">
        <div class="scroll max-h-screen ">
          <div class="p-5">
            <UserTile
              v-for="(objuser, n) in users"
              :key="n"
              :user="objuser"
              :show="show"
              :active-u-i-d="activeUID"
              :invoices-users="serviceWaiterWaitressArr"
              @active="active"
              @clear="clear"
            />
          </div>
        </div>
      </div>

      <div class=" w-full h-auto min-h-screen">
        <Menu
          :receipt="receiptSuper"
          :user="user"
          @increaseTimerSet="increaseTimerSet"
          @addToInvoice="addToInvoice"
          @saveInvoicefn="saveInvoicefn"
          @clear="clear"
        />
        <div class=" w-full py-4 pl-5">
          <div class=" flex flex-row">
            <div class="w-min whitespace-nowrap border-black border-r-2 mr-2">
              <span class=" uppercase text-gray-500 font-black text-lg mr-2">selected account</span>
            </div>
            <span class=" uppercase text-red-600 text-lg"> {{ user.name }} </span>
          </div>
        </div>
        <Invoices
          :user="user"
          :invoices="serviceWaiterWaitressArrSorted"
          @cancel="cancelServiceBar"
          @ConfirmInvoice="ConfirmInvoice"
          @CloseInvoice="CloseInvoice"
          @Print="Print"
        />
      </div>
    </div>

    <InvoicePrint
      v-show="showModal"
      :showmodal.sync="showModal"
      :invoice="getinvoiceDataPrint"
    />
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable vue/require-prop-types */
import _ from 'lodash'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Menu from '@/components/common/Menu'
import UserTile from '@/components/common/UserTile'
import Invoices from '@/components/common/invoices/Invoices'
import InvoicePrint from '@/components/dialog/InvoicePrint'
export default {
  components: { Menu, UserTile, Invoices, InvoicePrint },

  layout: 'servicewaiterwairess',

  data () {
    return {
      AllowCloseInv: false,
      show: false,
      timerSet: 0,
      TimerSetRoutine: 1200000, // 120 secs  // time out and clear
      user: {
        section: null,
        id: 0,
        name: null
      },
      users: [],
      activeUID: 0,
      serviceWaiterWaitressArr: [],
      serviceWaiterWaitressArrSorted: [],
      receiptSuper: {
        uID: null,
        name: '',
        section: '',
        status: 5, // 5 unpaid, 10 paid
        TTotal: 0,
        created_at: Date.now(),
        orders: []
      },
      intervalTime: 30000, // figure below server crashes make 30s
      showModal: false,
      invoiceDataPrint: []
    }
  },

  computed: {
    ...mapGetters(['getToken', 'getTimer', 'getTimerInterval', 'getReceipts']),

    getUseruID () { return this.user.id },

    getUserName () { return this.user.name },

    getuserSection () { return this.user.section },

    watchReceiptSuperOrders () {
      return this.receiptSuper.orders
    },

    getinvoiceDataPrint () { return this.invoiceDataPrint }
  },

  watch: {
    getUseruID: {
      handler (newVal) {
        this.receiptSuper.uID = newVal
      }
    },

    getUserName: {
      handler (newVal) {
        this.receiptSuper.name = newVal
      }
    },

    getuserSection: {
      handler (newVal) {
        this.receiptSuper.section = newVal
      }
    },

    watchReceiptSuperOrders: {
      handler (newVal) {
        let sum = 0
        newVal.forEach(function (order) {
          sum += parseInt(order.cost, 10)
        })
        this.receiptSuper.TTotal = sum
      }
    },

    activeUID: {
      handler (newVal, oldval) {
        this.setserviceWaiterWaitressArrSorted()
      }
    },

    serviceWaiterWaitressArr: {
      handler (newVal, oldval) {
        this.setserviceWaiterWaitressArrSorted()
      }
    },

    getReceipts: {
      handler (newVal) {
        this.serviceWaiterWaitressArr = _.filter(newVal, function (o) {
          return (o.section == 'SERVICE-WAITER-WAITRESS' && o.status != 15)
        })
      }
    }
  },

  mounted () {
    this.fetchAllMenu()
    this.resetInvoicefn()
    this.getUsers()
    this.loadInvoices()

    clearInterval(this.getTimer)
    this.setTimerInterval()
  },

  methods: {
    ...mapActions(['loadInvoices', 'fetchAllMenu']),
    ...mapMutations(['setTimer']),

    setTimerInterval () {
      this.setTimer(setInterval(this.refreshData, this.getTimerInterval))
    },

    refreshData () {
      this.loadInvoices()
    },

    mouseMove (event) {
      // eslint-disable-next-line no-console
      // console.log(event.clientX, event.clientY)
    },

    setserviceWaiterWaitressArrSorted () {
      const activeUID = this.activeUID
      if (Object.keys(this.serviceWaiterWaitressArr).length > 0 && activeUID > 0) {
        this.serviceWaiterWaitressArrSorted = _.filter(this.serviceWaiterWaitressArr, function (o) {
          return (o.uID == activeUID)
        })
      } else {
        this.serviceWaiterWaitressArrSorted = []
      }
    },

    increaseTimerSet () {
      this.timerSet = this.timerSet + 1
      setTimeout(this.clearTimer, this.TimerSetRoutine)
    },

    active (user) {
      this.increaseTimerSet()
      // set user
      this.user.id = user.id
      this.user.section = user.section
      this.user.name = user.name
      this.activeUID = user.id
    },

    clearTimer () {
      if (this.timerSet > 1) { // mitigate counter clear overuns across selections
        this.timerSet = this.timerSet - 1
      } else {
        this.clear()
      }
    },

    clear () {
      this.resetInvoicefn()
    },

    addToInvoice (order) {
      if (!order.Names || !order.SentFrom || !order.uID) {
        this.$toast.error('Please Select User from the Left Pane!')
      } else {
        this.receiptSuper.orders.push(order)
      }
    },

    resetInvoicefn () {
      this.timerSet = 0
      this.receiptSuper.TTotal = 0
      this.receiptSuper.created_at = Date.now()
      this.receiptSuper.orders = []
      this.serviceWaiterWaitressArrSorted = []
      // reset user
      this.user.id = 0
      this.user.section = null
      this.user.name = null
      this.activeUID = 0
    },

    cancelServiceBar (ordersid) { this.changeorderState(ordersid, 20) },

    ConfirmInvoice (invoice) {
      try {
        if (Object.keys(invoice.orders).length > 0) {
          this.updateInvoice(invoice.receipts_id, 'CONFIRM')
        } else {
          // eslint-disable-next-line no-throw-literal
          throw { message: 'The Invoice has no Orders!' }
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    CloseInvoice (invoice) {
      this.$toast.error('Only SERVICE-BAR is Allowed to Close an Invoice')
    },

    Print (invoice) {
      this.invoiceDataPrint = invoice
      this.showModal = true
    },

    async  saveInvoicefn () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      try {
        await this.$axios.$post('addReceipts', this.receiptSuper, config)
          .then(({ result }) => {
            if (result) {
              this.$toast.success('Receipt Published')
              this.resetInvoicefn()
              this.loadInvoices()
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
      }
    },

    async getUsers () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        key: ''
      }
      try {
        await this.$axios.$post('AllUsers', bodyParameters, config)
          .then((resp) => {
            if (resp.users !== null) {
              this.users = _.filter(resp.users, function (o) {
                return (o.section == 'SERVICE-WAITER-WAITRESS')
              })
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
      }
    },

    async changeorderState (Orderid = 0, stateMode = null) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        id: Orderid,
        state: stateMode
      }
      try {
        await this.$axios.$post('requestCancelOrder', bodyParameters, config)
          .then(({ result, message }) => {
            if (result && message) {
              this.loadInvoices()
              this.$toast.success(message)
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
      }
    },

    async updateInvoice (id = 0, mode = null) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        id,
        mode
      }
      try {
        await this.$axios.$post('updateReceipts', bodyParameters, config)
          .then(({ result, message }) => {
            if (result && message) {
              this.$toast.success(message)
              this.loadInvoices()
            }
          })
          .catch((errors) => {
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
      }
    }
  }

}
</script>

<style scoped>
.scroll {
  overflow-y: scroll;
}

.scroll::-webkit-scrollbar {
    display: none;
}

.scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<template>
  <div class=" px-auto h-auto">
    <Menu
      :receipt="receiptSuper"
      :user="user"
      @addToInvoice="addToInvoice"
      @saveInvoicefn="saveInvoicefn"
      @clear="clear"
    />
    <Invoices
      :user="user"
      :invoices="serviceWaiterWaitressArr"
      @cancel="cancelServiceBar"
      @ConfirmInvoice="ConfirmInvoice"
      @CloseInvoice="CloseInvoice"
      @Print="Print"
    />
    <InvoicePrint
      v-show="showModal"
      :showmodal.sync="showModal"
      :invoice="getinvoiceDataPrint"
    />
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable vue/require-prop-types */
import Menu from '@/components/common/Menu'
import Invoices from '@/components/common/invoices/Invoices'
import InvoicePrint from '@/components/dialog/InvoicePrint'
export default {
  components: { Menu, Invoices, InvoicePrint },

  props: ['serviceWaiterWaitressArr', 'user', 'token'],

  data () {
    return {
      // timerSet: 0,
      AllowCloseInv: false,
      receiptSuper: {
        uID: null,
        name: null,
        section: null,
        status: 5, // 5 unpaid, 10 paid
        TTotal: 0,
        created_at: Date.now(),
        orders: []
      },
      // intervalTime: 30000, // figure below server crashes make 30s
      showModal: false,
      invoiceDataPrint: []
    }
  },

  computed: {
    watchReceiptSuperOrders () { return this.receiptSuper.orders },

    getinvoiceDataPrint () { return this.invoiceDataPrint }
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
    this.resetInvoicefn()
    this.receiptSuper.uID = this.user.id
    this.receiptSuper.name = this.user.name
    this.receiptSuper.section = this.user.section
  },

  methods: {
    addToInvoice (order) {
      if (!order.Names || !order.SentFrom || !order.uID) {
        this.$toast.error('No user logged In!')
      } else {
        this.receiptSuper.orders.push(order)
      }
    },

    Print (invoice) {
      this.invoiceDataPrint = invoice
      this.showModal = true
    },

    clear () {
      this.resetInvoicefn()
    },

    resetInvoicefn () {
      this.receiptSuper.TTotal = 0
      this.receiptSuper.created_at = Date.now()
      this.receiptSuper.orders = []
    },

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
      try {
        if (Object.keys(invoice.orders).length > 0) {
          if (this.AllowCloseInv) {
            this.updateInvoice(invoice.receipts_id, 'CLOSE')
          } else {
            // eslint-disable-next-line no-throw-literal
            throw { message: 'Contact Cashier to Close this Invoice!' }
          }
        } else {
          // eslint-disable-next-line no-throw-literal
          throw { message: 'The Invoice has no Orders!' }
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    cancelServiceBar (ordersid) { this.changeorderState(ordersid, 20) },

    async  saveInvoicefn () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      try {
        await this.$axios.$post('addReceipts', this.receiptSuper, config)
          .then(({ result }) => {
            if (result) {
              this.$toast.success('Receipt Published')
              this.resetInvoicefn()
              this.$emit('refresh')
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
    },

    async changeorderState (Orderid = 0, stateMode = null) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id: Orderid,
        state: stateMode
      }
      try {
        await this.$axios.$post('requestCancelOrder', bodyParameters, config)
          .then(({ result, message }) => {
            if (result && message) {
              this.$toast.success(message)
              this.$emit('refresh')
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
    },

    async updateInvoice (id = 0, mode = null) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
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
              this.$emit('refresh')
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
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class=" mx-auto bg-gray-50 p-2">
    <div>
      <!-- start  -->
      <div class="bg-gray-100 mx-auto border-gray-500 shadow-lg rounded-sm text-gray-700 h-auto">
        <div class="flex p-3 border-l-8" :class="getorderStatus(parseInt(invoice.status)).styeBorder">
          <div class="space-y-1 border-r-2 pr-3">
            <div class="text-sm leading-5 font-semibold">
              <span class="text-xs leading-4 font-normal text-gray-500"> Invoice #</span> <span class=" font-extrabold"> {{ invoice.receipts_id }} </span>
            </div>
            <div class="text-sm leading-5 font-semibold">
              <span class="text-xs leading-4 font-normal text-gray-500 pr"> Total:</span> <span class=" font-extrabold"> Shs: {{ invoice.TTotal | number_format }}/= </span>
            </div>
            <div class="text-sm leading-5 font-semibold text-green-500">
              {{ invoice.section }}
            </div>
            <div class="text-xm leading-5 font-semiboldtext-red-700">
              {{ invoice.name }}
            </div>
            <div class="text-xs leading-5 font-semibold text-gray-500">
              {{ invoice.created_at | humanDayDate }}
            </div>
          </div>

          <div class=" flex flex-col justify-center align-middle ml-2">
            <button
              v-show="invoice.status == 5"
              class=" text-white text-center font-bold py-1 my-1 px-3 rounded text-xs hover:bg-green-700  bg-green-400 uppercase"
              @click="ConfirmInvoice(invoice)"
            >
              Confirm Invoice
            </button>
            <button
              v-show="invoice.status == 10"
              class=" text-white text-center font-bold py-1 my-1 px-3 rounded text-xs hover:bg-blue-700  bg-blue-400 uppercase"
              @click="Print(invoice)"
            >
              Print
            </button>
            <button
              v-show="invoice.status == 10"
              class=" text-white text-center font-bold py-1 my-1 px-3 rounded text-xs hover:bg-red-700  bg-red-400 uppercase"
              @click="Close(invoice)"
            >
              Close
            </button>
          </div>

          <div class="flex-1">
            <div class="ml-3 space-y-1 border-r-2 pr-3">
              <div class="text-sm leading-4 font-normal">
                <InvoiceOrder
                  :orders-t-r="invoice.orders"
                  :loading="loading"
                  :usersection="usersection"
                  @cancel="cancel"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InvoiceOrder from '@/components/common/orderFiltered/InvoiceOrder'
export default {
  components: { InvoiceOrder },

  props: ['invoice', 'loading', 'usersection'],

  methods: {
    getorderStatus (val) {
      switch (val) { // 5 unpaid, 10 paid
        case 5:
          return { styeBorder: 'border-yellow-200', styeBg: 'bg-yellow-200', text: 'Unpaid' }
        case 10:
          return { styeBorder: 'border-green-900', styeBg: 'bg-green-900', text: 'Paid' }
        default:
          return { styeBorder: 'border-gray-400', styeBg: 'bg-gray-00', text: 'Unknown' }
      }
    },

    cancel (ordersid) { this.$emit('cancel', ordersid) },

    ConfirmInvoice (invoice) {
      try {
        if (Object.keys(invoice.orders).length > 0) {
          invoice.orders.forEach((element) => { // 5 pending, 10 new  15 served 20 cancelling, 25 cancelled
            if ((parseInt(element.status) !== 15) && (parseInt(element.status) !== 25)) {
              // eslint-disable-next-line no-throw-literal
              throw { message: 'The Invoice has Uncleared Orders!' }
            }
          })
          this.$emit('ConfirmInvoice', invoice)
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    },

    Print (invoice) {
      this.$emit('Print', invoice)
    },

    Close (invoice) {
      try {
        if (Object.keys(invoice.orders).length > 0) {
          invoice.orders.forEach((element) => { // 5 pending, 10 new  15 served 20 cancelling, 25 cancelled
            if ((parseInt(element.status) !== 15) && (parseInt(element.status) !== 25)) {
              // eslint-disable-next-line no-throw-literal
              throw { message: 'The Invoice has Uncleared Orders!' }
            }
          })
          this.$emit('CloseInvoice', invoice)
        }
      } catch (error) {
        this.$toast.error(error.message)
      }
    }
  }
}
</script>

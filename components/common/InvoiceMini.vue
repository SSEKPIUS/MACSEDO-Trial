<template>
  <!-- component -->
  <div class="container mx-auto bg-gray-50 p-2 antialiased">
    <div>
      <!-- start  -->
      <div class="bg-gray-100 mx-auto border-gray-500 border rounded-sm text-gray-700 h-auto">
        <div class="flex p-3 border-l-8" :class="getorderStatus(parseInt(receipt.status)).styeBorder">
          <div class="space-y-1 border-r-2 pr-3">
            <div class="text-sm leading-5 font-semibold">
              <span class="text-xs leading-4 font-normal text-gray-500"> Invoice #</span> <span class=" font-extrabold"> {{ receipt.receipts_id }} </span>
            </div>
            <div class="text-sm leading-5 font-semibold">
              <span class="text-xs leading-4 font-normal text-gray-500 pr"> Total:</span> <span class=" font-extrabold"> UGX: {{ receipt.TTotal }} </span>
            </div>
            <div class="text-sm leading-5 font-semibold text-gray-500">
              {{ receipt.created_at | humanDayDate }}
            </div>
          </div>

          <div class="flex-1">
            <div class="ml-3 space-y-1 border-r-2 pr-3">
              <div class="text-sm leading-4 font-normal">
                <InvoiceOrder
                  :orders-t-r="receipt.orders"
                  :loading="loading"
                  :usersection="usersection"
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
import InvoiceOrder from '@/components/common/orderUnfiltered/InvoiceOrder'
export default {
  components: { InvoiceOrder },

  // eslint-disable-next-line vue/require-prop-types
  props: ['receipt', 'loading', 'usersection'],

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
    }
  }
}
</script>

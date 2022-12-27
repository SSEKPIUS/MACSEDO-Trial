<!--eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class=" w-full p-2 h-full">
      <div class=" w-full p-2  shadow-2xl rounded mt-5">
        <Invoice
          v-for="(invoice,n) in invoices "
          :key="n"
          :invoice="invoice"
          :loading="loadinghandleInvoice"
          :usersection="user.section"
          @cancel="cancel"
          @ConfirmInvoice="ConfirmInvoice"
          @CloseInvoice="CloseInvoice"
          @Print="Print"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable vue/require-prop-types */
import Invoice from '@/components/common/orderFiltered/Invoice'
export default {
  name: 'InvoiceCommon',
  components: { Invoice },
  props: ['invoices', 'user'],

  data () {
    return {
      loadinghandleInvoice: false,
      invoicePaginated: [],
      currentUrl: null
    }
  },

  methods: {
    cancel (ordersid) { this.$emit('cancel', ordersid) },

    ConfirmInvoice (invoice) { this.$emit('ConfirmInvoice', invoice) },

    CloseInvoice (invoice) { this.$emit('CloseInvoice', invoice) },

    Print (invoice) { this.$emit('Print', invoice) }
  }

}
</script>

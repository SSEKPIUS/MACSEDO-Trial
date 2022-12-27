<template>
  <div class=" flex flex-row">
    <div class=" w-10/12">
      <div class=" w-full p-5 border  shadow-2xl rounded">
        <Invoice
          :receipt="receipt"
          :loading="false"
          :usersection="usersection"
        />
      </div>
    </div>
    <div class="w-1/6 flex align-middle justify-center">
      <div class=" my-auto">
        <Spinner v-if="loadingSaveInv" />
        <button
          v-else
          class=" hover:bg-green-500 bg-green-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 rounded w-full uppercase"
          @click="$emit('saveInvoicefn')"
        >
          SAVE
        </button>
        <button
          class=" hover:bg-red-500 bg-red-300 text-white font-bold py-2 mt-2 px-4 border-b-4 border-red-700 rounded w-full uppercase"
          @click="$emit('clear')"
        >
          CLEAR
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Invoice from '@/components/common/InvoiceMini'
import Spinner from '@/components/filters/Spinner'
export default {
  components: {
    Invoice, Spinner
  },

  // eslint-disable-next-line vue/require-prop-types
  props: ['usersection', 'receipt', 'loadingSaveInv']
}
</script>

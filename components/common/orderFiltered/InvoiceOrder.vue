<template>
  <div class="mx-auto">
    <div class="bg-white shadow-md rounded">
      <table class="text-left w-full border-collapse">
        <!--Border collapse doesn't work on this site yet but it's available in newer tailwind versions -->
        <thead>
          <tr>
            <th class="py-1  px-1 bg-grey-lightest font-medium  uppercase text-xs  border-b border-grey-light text-left text-black">
              Item
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-medium  uppercase text-xs  border-b border-grey-light text-left text-black">
              Description
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-medium  uppercase text-xs  border-b border-grey-light text-left text-black">
              qty
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-medium  uppercase text-xs  border-b border-grey-light text-left text-black">
              cost
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-medium  uppercase text-xs  border-b border-grey-light text-left text-black">
              From
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-left text-black">
              reason
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-left text-black">
              Dest'n
            </th>
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black" />
            <th class="py-1  px-1 bg-grey-lightest font-black  uppercase text-xs  border-b border-grey-light text-center text-black">
              controls
            </th>
          </tr>
        </thead>
        <tbody>
          <InvoiceOrderTableRow
            v-for="(order,n) in ordersTR"
            :key="n"
            :order-t-r="order"
            :loading="loading"
            :usersection="usersection"
            class=" my-1"
            @cancel="cancel"
          />
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import InvoiceOrderTableRow from '@/components/common/orderFiltered/InvoiceOrderTableRow'

export default {
  components: { InvoiceOrderTableRow },

  // eslint-disable-next-line vue/require-prop-types
  props: ['ordersTR', 'loading', 'usersection'],

  methods: {
    cancel (ordersid) { this.$emit('cancel', ordersid) }
  }

}
</script>

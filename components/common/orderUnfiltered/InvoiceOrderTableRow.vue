<template>
  <tr class="hover:bg-grey-lighter">
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.dish }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.Description }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.qty }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center">
      {{ orderTR.cost }}
    </td>
    <td class="py-2  px-6 border-b border-grey-light text-center uppercase font-extrabold text-white flex justify-end items-center">
      <span class=" px-4 rounded-lg py-1" :class="getClass(parseInt(orderTR.status))"> {{ getStatus(parseInt(orderTR.status)) }} </span>
    </td>
  </tr>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['orderTR', 'loading'],

  methods: {
    getStatus (status) {
      switch (status) { // 5 pending, 10 new  15 served 20 cancelled
        case 5:
          return 'pending'
        case 10:
          return 'new'
        case 15:
          return 'served'
        case 20:
          return 'cancelling'
        case 25:
          return 'cancelled'
        default:
          break
      }
    },

    getClass (status) {
      switch (status) { // 5 pending, 10 new  15 served 20 cancelling 25 cancelled
        case 5:
          return 'bg-gray-500'
        case 10:
          return 'bg-yellow-500'
        case 15:
          return 'bg-green-500'
        case 20:
          return 'bg-red-300'
        case 25:
          return 'bg-red-500'
        default:
          break
      }
    }

  }
}
</script>

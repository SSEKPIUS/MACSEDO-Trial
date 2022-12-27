<template>
  <tr class="hover:bg-grey-lighter" :class="parseInt(orderTR.status) == 25 ? 'line-through': ''">
    <td class="py-2  px-1 border-b border-grey-light text-left">
      {{ orderTR.dish }}
    </td>
    <td class="py-2  px-1 border-b border-grey-light text-left">
      {{ orderTR.Description }}
    </td>
    <td class="py-2  px-1 border-b border-grey-light text-left">
      {{ orderTR.qty }}
    </td>
    <td class="py-2  px-1 border-b border-grey-light text-left">
      {{ orderTR.cost }}
    </td>
    <td class="py-2 text-xs  px-1 border-b border-grey-light text-left">
      {{ orderTR.SentFrom }}
    </td>
    <td class="py-2  px-2 border-b border-grey-light text-left">
      {{ orderTR.reason }}
    </td>
    <td class="py-2  px-2 border-b border-grey-light text-center">
      <div class=" flex flex-col">
        <span v-show="orderTR.destRmn">{{ orderTR.destRmn }}</span>
        <span v-show=" orderTR.destTbl">{{ orderTR.destTbl }}</span>
      </div>
    </td>
    <td class="py-2  px-1 border-b border-grey-light text-center uppercase font-extrabold text-white">
      <span class=" px-4 rounded-lg py-1" :class="getClass(parseInt(orderTR.status))"> {{ getStatus(parseInt(orderTR.status)) }} </span>
    </td>
    <td class="py-2  px-1 border-b border-grey-light">
      <div v-if="parseInt(orderTR.status) != 5" class=" flex flex-col">
        <button
          v-if="parseInt(orderTR.status) == 10"
          class=" text-white text-center font-bold py-1 my-1 px-3 rounded text-xs hover:bg-red-500  bg-red-400 uppercase"
          @click="$emit('cancel', orderTR.orders_id)"
        >
          cancel
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['orderTR', 'loading', 'usersection'],

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

<style lang="scss" scoped>

</style>

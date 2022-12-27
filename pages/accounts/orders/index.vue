<template>
  <div class=" w-full p-2 h-full">
    <Orders :users="getUsers" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Orders from '@/components/common/ordersUnfiltered/Order'
export default {
  components: {
    Orders
  },
  layout: 'accounts',
  computed: {
    ...mapGetters(['getUsers', 'getToken'])
  }
}
</script>

<style scoped>
</style>

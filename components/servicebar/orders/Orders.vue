<template>
  <div>
    <div class=" w-full p-2 h-full">
      <div class=" w-full p-2 shadow-2xl rounded mt-5">
        <Order
          v-for="(order,n) in orders "
          :key="n"
          :order="order"
          :loading="loadinghandleOrder"
          :users="users"
          @changeorderState="changeorderState"
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
import Order from '@/components/common/orderFiltered/Order'
export default {
  components: { Order },

  props: ['users', 'token', 'orders'],

  data () {
    return {
      loadinghandleOrder: false
    }
  },

  methods: {
    async changeorderState (Orderid = 0, stateMode = null, message = null) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = {
        id: Orderid,
        state: stateMode,
        message
      }
      this.loadinghandleOrder = true
      try {
        await this.$axios.$post('changeorderState', bodyParameters, config)
          .then(({ result, category }) => {
            if (result && category) {
              this.$emit('loadOrders')
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
      this.loadinghandleOrder = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

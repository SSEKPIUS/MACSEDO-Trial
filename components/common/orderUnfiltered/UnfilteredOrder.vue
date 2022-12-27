<template>
  <div class="container mx-auto p-2 antialiased">
    <!-- start  -->
    <div class="bg-gray-100 mx-auto border-gray-500 shadow-lg rounded-sm text-gray-700 h-auto">
      <div class="flex p-3 border-l-8" :class="getorderStatus(parseInt(order.status)).styeBorder">
        <div class="space-y-1 border-r-2 pr-3">
          <div class="text-sm leading-5 font-semibold">
            <span class="text-xs leading-4 font-normal text-gray-500"> OrderID #</span> <span class=" font-extrabold"> {{ order.OrderID }} </span>
          </div>
          <div class="text-sm leading-5 font-semibold">
            <span class="text-xs leading-4 font-normal text-gray-500"> USER </span> <span class=" font-extrabold"> {{ getSortedUserName }} </span>
          </div>
          <div class="text-sm leading-5 font-semibold">
            <span class="text-xs leading-4 font-normal text-gray-500 pr"> Invoice #</span> <span class=" font-extrabold">  {{ order.receipts_id }} </span>
          </div>
          <div class="text-sm leading-5 font-semibold">
            <span class="text-xs leading-4 font-normal text-gray-500 pr"> Amount:</span> <span class=" text-xs font-extrabold"> UGX: {{ order.cost }} </span>
          </div>
          <div class="text-sm leading-5 font-semibold text-gray-500">
            {{ order.created_at | humanDayDate }}
          </div>
        </div>

        <div class="flex-1">
          <div class="ml-3 space-y-1 pr-3">
            <div class="text-base leading-6 uppercase font-extrabold">
              {{ order.dish }}
            </div>
            <div class="text-sm leading-4 font-normal">
              <span class="text-xs leading-4 font-normal text-gray-500"> `Description:`</span>  {{ order.Description }}
            </div>
            <div class="text-sm leading-4 font-normal">
              <span class="text-xs leading-4 font-normal text-gray-500"> Destination</span> Sent Fom <span class=" font-extrabold">{{ order.SentFrom }} </span> to <span class=" font-extrabold">{{ order.section }} </span>
            </div>
          </div>
        </div>

        <div v-show="order.reason" class=" pr-3">
          <div>
            <div class="ml-3 my-3 border-gray-200 border-2 bg-gray-300 p-1">
              <div class="uppercase text-xs leading-4 font-medium">
                Reason:
              </div>
              <div class="text-xs leading-4 font-normal max-w-sm text-gray-500">
                {{ order.reason }}
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center min-w-max ">
          <div class="flex h-full items-center min-w-max p-1 w-20 rounded-md">
            <div class=" w-full uppercase text-xs px-1 leading-4 font-black text-center text-yellow-100">
              <span class=" px-4 rounded-lg py-1" :class="getorderStatus(parseInt(order.status)).styeBg">  {{ getorderStatus(parseInt(order.status)).text }} </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- end -->
    <Dialog
      v-show="showModal"
      :showmodal.sync="showModal"
      :head="Modalhead"
      :message="Modalmessage"
      :modal-routine="modalRoutine"
      :require-message="requireMessage"
      @click-modal="clickmodal"
    />
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
// eslint-disable-next-line no-unused-vars
import _ from 'lodash'
// import SwitchContainer from '@/components/common/SwitchContainer'
import Dialog from '@/components/dialog/Dialog.vue'
export default {
  components: { Dialog },

  // eslint-disable-next-line vue/require-prop-types
  props: ['order', 'users'],

  data () {
    return {
      // start mordal
      requireMessage: false,
      showModal: false,
      modalRoutine: null,
      Modalhead: this.order.dish,
      Modalmessage: null
      // end mordal
    }
  },

  computed: {
    getStateServed () {
      return parseInt(this.order.status) == 15
    },

    getStateCancelled () {
      return parseInt(this.order.status) == 25
    },

    getSortedUserName () {
      return this.sortUser()
    }
  },

  methods: {
    sortUser () {
      const srt = this.order.uID
      const usr = _.filter(this.users, function (o) {
        return (o.id == srt)
      })
      return usr[0] ? usr[0].name : ''
    },

    clickmodal (bol, mode, message = null) {
      this.showModal = false
      // eslint-disable-next-line eqeqeq
      if (bol == true) {
        switch (mode) {
          case 'handleServe' :
            this.handleServe()
            break
          case 'handleCancel' :
            this.handleCancel(message)
            break
          default :
        }
      }
    },

    getorderStatus (val) {
      switch (val) { // 5 pending, 10 new  15 served 20 cancelled
        case 5:
          return { styeBorder: 'border-yellow-400', styeBg: 'bg-yellow-400', text: 'Pending' }
        case 10:
          return { styeBorder: 'border-blue-400', styeBg: 'bg-blue-400', text: 'New' }
        case 15:
          return { styeBorder: 'border-green-400', styeBg: 'bg-green-400', text: 'Served' }
        case 20:
          return { styeBorder: 'border-red-300', styeBg: 'bg-red-300 animate-bounce', text: 'Cancelling' }
        case 25:
          return { styeBorder: 'border-red-500', styeBg: 'bg-red-500', text: 'Cancelled' }
        default:
          return { styeBorder: 'border-gray-400', styeBg: 'bg-gray-400', text: 'Unknown' }
      }
    },

    handleServe () {
      if (parseInt(this.order.status) == 10) {
        this.$emit('changeorderState', this.order.orders_id, 15)
      } else {
        this.$toast.error('This Order has a Request to Cancel')
      }
    },

    handleCancel (message) {
      if (message == null) {
        this.$toast.error('Please Provide Reason for Cancelling')
      } else {
        this.$emit('changeorderState', this.order.orders_id, 25, message)
      }
    }
  }

}
</script>

<style lang="scss" scoped>

</style>

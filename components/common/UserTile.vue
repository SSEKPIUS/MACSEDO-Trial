<template>
  <div>
    <div
      v-if="user"
      :class="getactive ? 'bg-gray-400' : ''"
      class=" border rounded-md shadow-xl flex flex-row md:flex-col items-start justify-start m-2 pt-2 pr-8 hover:bg-gray-300"
      @click="setactive"
    >
      <img class="h-14 w-14 m-2 rounded-sm" :src="user.image" alt="user photo">
      <div v-show="show" class=" flex flex-col  m-3">
        <span class="text-green-600 text-sm font-bold uppercase">{{ user.name }}</span>
        <span class=" text-sm font-bold capitalize">{{ user.email }}</span>
      </div>
      <div class=" w-full">
        <div class="flex justify-end mr-8">
          <span v-show=" parseInt(getserviceWaiterWaitressArrCount) > 0" class=" bg-red-500 text-center text-xs py-2 px-3 rounded-full">
            {{ getserviceWaiterWaitressArrCount }}
          </span>
        </div>
      </div>
    </div>

    <DialogPassKey
      v-show="showModal"
      :showmodal.sync="showModal"
      :head="user.name"
      message="Provide Quick Access Code for this Account"
      modal-routine="QAC"
      ok="ENTER"
      placeholder="*****"
      @click-modal="clickmodal"
    />
  </div>
</template>

<script>
import _ from 'lodash'
import DialogPassKey from '@/components/dialog/DialogPassKey.vue'
export default {
  components: { DialogPassKey },

  props: {
    user: {
      type: [Array, Object],
      required: true
    },
    activeUID: {
      type: Number,
      required: false,
      default: 0
    },
    invoicesUsers: {
      type: [Array, Object],
      required: false,
      default: () => [{}]
    },
    show: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  data () {
    return {
      active: false,
      showModal: false
    }
  },

  computed: {
    getactive () {
      return this.activeUID == this.user.id
    },

    getserviceWaiterWaitressArrCount () {
      const id = this.user.id
      return Object.keys(_.filter(this.invoicesUsers, function (o) {
        return (o.uID == id)
      })
      ).length
    }
  },

  methods: {
    setactive () {
      this.showModal = true
    },

    clickmodal (bol, mode, message = null) {
      this.showModal = false
      if (bol == true) {
        switch (mode) {
          case 'QAC' :
            if (message == null) {
              this.$toast.error('Provide Quick Access Code for ' + this.user.name)
              return
            }
            if (this.user.qac == message) {
              this.$emit('active', this.user)
            } else {
              this.$toast.error('Wrong Quick Access Code for ' + this.user.name)
            }
            break
          default :
        }
      }
    }
  }
}
</script>

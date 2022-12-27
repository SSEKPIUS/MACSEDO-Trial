<template>
  <div class="p-5 border-2 bg-white rounded-lg flex items-center justify-between space-x-8">
    <div class="flex-1 flex justify-between items-center">
      <div class=" flex flex-col w-full">
        <div class="w-48 bg-gray-300 capitalize rounded">
          {{ menu.category }}
        </div>
        <div class=" grid grid-cols-2 gap-1 ">
          <div class=" text-left text-sm pt-2 text-gray-500">
            {{ menu.description }}
          </div>
          <div class=" pt-2 flex items-center text-right">
            UGX: {{ menu.price | number_format }} /=
          </div>
        </div>
      </div>
      <div class="w-24 rounded-lg bg-purple-300 flex flex-row">
        <svg
          v-if="!loading"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5  left-0 text-red-600 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="showModal = true; modalRoutine = 'deleteMenu'"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <Spinner v-else class="h-5 w-5 absolute right-2 text-red-500 cursor-pointer" />
      </div>
    </div>
    <Dialog
      v-show="showModal"
      :showmodal.sync="showModal"
      :head="Modalhead"
      :message="Modalmessage"
      :modal-routine="modalRoutine"
      @click-modal="clickmodal"
    />
  </div>
</template>

<script>
import Spinner from '@/components/filters/Spinner'
import Dialog from '@/components/dialog/Dialog.vue'
export default {
  components: {
    Spinner, Dialog
  },

  // eslint-disable-next-line vue/require-prop-types
  props: ['loading', 'menu'],

  data () {
    return {
      // start mordal
      showModal: false,
      modalRoutine: null,
      Modalhead: this.menu.category,
      Modalmessage: 'Do you Wish to Delete?'
      // end mordal
    }
  },

  methods: {
    clickmodal (bol, mode, message = null) {
      this.showModal = false
      // eslint-disable-next-line eqeqeq
      if (bol == true) {
        switch (mode) {
          case 'deleteMenu' :
            this.deleteMenu()
            break
          default :
        }
      }
    },

    deleteMenu () { this.$emit('deleteMenu', this.menu.menu1s_id) }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class=" items-center justify-center p-1" @mouseover="showSelection=true" @mouseleave="showSelection=false">
    <div class="border-2 border-gray-200 items-center p-1 rounded-md minW">
      <div class=" p-1 bg-gray-200 rounded-md place-items-stretch">
        <span class="float-left uppercase text-xs pl-2"> {{ DisplayText }} </span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pl-1 right" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
      <div v-show="showSelection" class="rounded shadow-md my-0 pin-t pin-l z-50 minW w-full">
        <ul class=" w-auto  bg-gray-50 rounded-sm absolute minW min-w-full">
          <li
            v-for="(account,index) in selection"
            :key="index"
            class="p-2 block text-black hover:bg-grey-light hover:font-black cursor-pointer text-xs"
            @click="fnselection(index)"
          >
            <p class=" capitalize">
              {{ account }}
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selection: {
      type: [Array, Object],
      required: true
    },
    selectedText: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      selectedAccount: null,
      showSelection: false,
      DisplayText: this.selectedText
    }
  },

  watch: {
    selection: {
      handler () {
        this.DisplayText = 'Select'
      }
    }
  },

  methods: {
    fnselection (index) {
      this.selectedAccount = index
      this.DisplayText = this.selection[index]
      this.showSelection = false
      this.$emit('fnselection', this.selection[index])
    }
  }
}
</script>

<style scoped>
  .minW {
   min-width: 112px;
 }
</style>

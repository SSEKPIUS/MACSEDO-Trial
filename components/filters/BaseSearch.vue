<template>
  <div>
    <div class="flex items-center justify-center p-1">
      <div class="flex border-2 border-gray-200 items-center p-1 rounded-md">
        <div class="p-1 bg-gray-200 rounded-l-md h-8 cursor-pointer" @click="fnsearch()">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input v-model="input" type="text" class="px-4 py-2 min-w-min bg-gray-200 h-8 focus:ring-2 border-0  outline-white" placeholder="Search...">
        <div class="p-1 bg-gray-200 rounded-r-md h-8 cursor-pointer" @click="input = null">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 "
            viewBox="0 0 20 20"
            fill="currentColor"
            @click="input=null"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      input: null
    }
  },

  computed: {
    ...mapGetters(['getSearch'])
  },

  watch: {
    getSearch: {
      handler (newVal) {
        this.input = newVal.search
      }
    }
  },

  mounted () {
    this.input = this.getSearch.search
  },

  methods: {
    ...mapMutations(['SET_SEARCH']),

    fnsearch () {
      if (this.input == null) { return this }
      // eslint-disable-next-line no-unused-vars
      const search = {
        selection: this.getSearch.selection,
        search: this.input,
        DRange: {
          from: this.getSearch.DRange.from,
          to: this.getSearch.DRange.to
        }
      }
      this.SET_SEARCH(search)
    }
  }
}
</script>

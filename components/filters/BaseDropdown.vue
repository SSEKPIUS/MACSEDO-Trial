<template>
  <div class=" items-center justify-center relative p-1" @mouseover="showSelection=true" @mouseleave="showSelection=false">
    <div class="border-2 border-gray-200 items-center p-1 rounded-md minW">
      <div class=" p-1 bg-gray-200 rounded-md min-w-max flex flex-row">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
        <span class="float-left uppercase text-sm pl-2"> {{ getSearch.selection }} </span>
      </div>
    </div>
    <!--min width-->
    <div v-show="showSelection" class="rounded shadow-md my-0 absolute pin-t pin-l z-50 minW">
      <ul class="bg-gray-50 rounded-sm  minW">
        <li
          v-for="(account,n) in getSelection"
          :key="n"
          class="p-2 block text-black  hover:font-black cursor-pointer text-xs capitalize hover:bg-gray-400"
          @click="fnselection(account)"
        >
          <p>
            {{ account }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  data () {
    return {
      showSelection: false
    }
  },

  computed: {
    ...mapGetters(['getSelection', 'getSearch'])
  },

  methods: {
    ...mapMutations(['SET_SEARCH']),

    fnselection (account) {
      const search = {
        // eslint-disable-next-line eqeqeq
        selection: account == 'ALL' ? null : account,
        search: this.getSearch.search,
        DRange: {
          from: this.getSearch.DRange.from,
          to: this.getSearch.DRange.to
        }
      }
      this.SET_SEARCH(search)
      this.showSelection = false
    }
  }
}
</script>

<style scoped>
  .minW {
   min-width: 275px;
 }
</style>

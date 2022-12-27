<template>
  <div class="min-w-min main">
    <div>
      <div class="flex flex-row">
        <SideNav
          class="bg-gray-100 shadow-sm h-screen"
        />
        <div class="border w-full">
          <div class="w-full bg-white p-2 text-center mx-auto">
            <Inventory :usersection="getUser.section" :search="search" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import SideNav from '@/components/steamsaunamassage/SideNav'
import Inventory from '@/components/common/Inventory'

export default {
  components: {
    SideNav,
    Inventory
  },

  data () {
    return {
      search: {
        selection: 'STEAM-SAUNA-MASSAGE',
        search: null,
        DRange: {
          from: null,
          to: null
        }
      }
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  },

  created () {
    this.SET_SEARCH(this.search)
  },

  methods: {
    ...mapMutations(['SET_SEARCH'])
  }
}
</script>

<style scoped>
.main {
  min-width: 1280px;
}
</style>

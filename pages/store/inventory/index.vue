<template>
  <div class=" min-w-min main">
    <div class="h-screen">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <Inventory :usersection="getUser.section" :search="search" />
        </div>
      </div>
      <TabBottom :tabs="tabs" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Inventory from '@/components/common/Inventory'
import TabBottom from '@/components/common/tabroutes/TabBottom'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Inventory,
    TabBottom,
    TabTop
  },

  async asyncData ({ store }) {
    await store.dispatch('loadUsers')
    await store.commit('SET_SEARCH', {
      selection: 'STORE',
      search: null,
      DRange: {
        from: null,
        to: null
      }
    })
  },

  data () {
    return {
      users: [],
      tabs: [
        { name: 'INVENTORY', path: '/store/inventory', active: true },
        { name: 'INVENTORY LOGS', path: '/store/inventory-logs', active: false }
      ]
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  },

  mounted () {
    // this.SET_SEARCH(this.search)
  },

  methods: {
    // ...mapMutations(['SET_SEARCH'])
  }

}
</script>

<style scoped>
.main {
   min-width: 1280px;
}
.menu li {
    color: #343434;
    font-weight: normal;
    font-family: 'Ultra', sans-serif;
    line-height: 40px;
    text-transform: uppercase;
    text-shadow: 0 2px white, 0 3px #777;
}

@media (max-width: 767px) {
    .menu li {
        font-size: 18px;
        line-height: 10px;
        text-transform: uppercase;
        text-shadow: 0 2px white, 0 3px #777;
    }

}
</style>

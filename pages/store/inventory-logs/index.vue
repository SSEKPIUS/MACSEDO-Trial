<template>
  <div class=" min-w-min main">
    <div class="h-screen">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <Inventorylogs />
        </div>
      </div>
      <TabBottom :tabs="tabs" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Inventorylogs from '@/components/common/Inventorylogs'
import TabBottom from '@/components/common/tabroutes/TabBottom'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    Inventorylogs,
    TabBottom,
    TabTop
  },

  data () {
    return {
      tabs: [
        { name: 'INVENTORY', path: '/store/inventory', active: false },
        { name: 'INVENTORY LOGS', path: '/store/inventory-logs', active: true }
      ]
    }
  },

  computed: {
    ...mapGetters(['getUsers', 'getUser'])
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

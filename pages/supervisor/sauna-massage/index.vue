<template>
  <div class=" min-w-min main">
    <div class="h-screen">
      <TabTop :tabs="tabs" />
      <div class=" w-full p-2">
        <div class="w-full bg-white p-2 text-center mx-auto">
          <SteamSaunaMassage :token="getToken" @refresh="getSteamSaunaMassage" />
        </div>
      </div>
      <TabBottom :tabs="tabs" />
    </div>
  </div>
</template>

<script>
/* eslint-disable no-console */
import { mapGetters, mapMutations } from 'vuex'
import SteamSaunaMassage from '@/components/supervisor/steamSaunaMassage/SteamSaunaMassage'
import TabBottom from '@/components/common/tabroutes/TabBottom'
import TabTop from '@/components/common/tabroutes/TabTop'
export default {
  components: {
    SteamSaunaMassage,
    TabBottom,
    TabTop
  },

  data () {
    return {
      tabs: [
        { name: 'MENU BAR', path: '/supervisor/menu-bar', active: false },
        { name: 'MENU KITCHEN', path: '/supervisor/menu-kitchen', active: false },
        { name: 'INVOICES', path: '/supervisor/invoices', active: false },
        { name: 'ORDERS', path: '/supervisor/orders', active: false },
        { name: 'HOTEL ROOMS', path: '/supervisor/rooms', active: false },
        { name: 'STEAM-SAUNA-MASSAGE', path: '/supervisor/sauna-massage', active: true },
        { name: 'INVENTORY', path: '/supervisor/inventory', active: false },
        { name: 'REPORTS', path: '/supervisor/reports', active: false },
        { name: 'INVENTORY LOGS', path: '/supervisor/inventory-logs', active: false },
        { name: 'SYSTEM LOGS', path: '/supervisor/system-logs', active: false }
      ]
    }
  },

  computed: {
    ...mapGetters(['getToken'])
  },

  mounted () {
    this.getSteamSaunaMassage()
  },

  methods: {
    ...mapMutations(['setSteamSaunaMassage']),

    setClick (index) {
      this.activeTab = index
    },

    async getSteamSaunaMassage () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {}
      try {
        await this.$axios.$post('getSteamSaunaMassagePackages', bodyParameters, config)
          .then(({ result, guests, steamsauna, massage }) => {
            if (result) {
              steamsauna = Object.keys(steamsauna).length > 0 ? steamsauna : []
              massage = Object.keys(massage).length > 0 ? massage : []
              this.setSteamSaunaMassage({ steamsauna, massage })
            }
          })
          .catch((errors) => {
            console.log(errors.response)
          })
      } catch (e) {
        console.log(e)
      }
    }
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

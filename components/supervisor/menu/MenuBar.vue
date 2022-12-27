<template>
  <div>
    <div class=" my-4">
      <div class=" w-full bg-gray-50 py-2">
        <span class=" uppercase text-gray-500 font-extrabold">add bar menu</span>
        <div class="w-full">
          <div class="grid grid-cols-2 gap-2 my-2 w-full items-center">
            <!--major-->
            <div class=" w-full">
              <div class="flex items-center max-w-md mx-auto bg-white rounded-full border drop-shadow-lg float-right minWdth">
                <div class="w-full h-12">
                  <div class=" items-center justify-center relative p-1 px-4">
                    <div class="border-2 border-gray-200 items-center p-1 rounded-md">
                      <div class=" p-1 bg-gray-200 rounded-md min-w-max" @click="showSelectionMajor=!showSelectionMajor">
                        <span class="float-left uppercase text-sm pl-2"> {{ selectedStockbarText }} </span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div v-show="showSelectionMajor" class="w-max rounded shadow-md my-2 absolute pin-t pin-l z-50 minWdth overflow-y-scroll max-h-60">
                      <ul class=" w-auto  bg-gray-50 rounded-sm">
                        <li
                          v-for="(stock,index) in getstockBarFilterUnique"
                          :key="index"
                          class="p-2 block text-black hover:bg-grey-light hover:font-black cursor-pointer text-base capitalize"
                          @click="fnselectionMain(stock)"
                        >
                          <p> {{ stock.category }} </p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!--minor-->
            <div class=" w-full">
              <div class="flex items-center max-w-md mx-auto bg-white rounded-full border drop-shadow-lg float-left minWdth ">
                <div class="w-full h-12">
                  <div class=" items-center justify-center relative p-1 px-4">
                    <div class="border-2 border-gray-200 items-center p-1 rounded-md">
                      <div class=" p-1 bg-gray-200 rounded-md min-w-max" @click="showSelectionMinor=!showSelectionMinor">
                        <span class="float-left uppercase text-sm pl-2"> {{ selectedStockbarMinorText }} </span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pl-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    <div v-show="showSelectionMinor" class="rounded shadow-md my-2 absolute pin-t pin-l z-50 minWdth overflow-y-scroll max-h-60">
                      <ul class=" w-auto  bg-gray-50 rounded-sm">
                        <li
                          v-for="(stock,index) in stocks"
                          :key="index"
                          class="p-2 block text-black hover:bg-grey-light hover:font-black cursor-pointer text-base capitalize"
                          @click="fnselectionMinor(stock)"
                        >
                          <p> {{ stock.stocks }} </p>
                        </li>
                      </ul>
                    </div>
                    <div v-show="selectedStockbarMinorText" class=" w-full bg-gray-200 p-2 px-4 border rounded my-2 absolute pin-t pin-l z-40">
                      <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2 text-left" for="description">
                          <span>Description</span><span class=" text-gray-400 float-right" @click="selectedStockbarMinorText=null">X</span>
                        </label>
                        <input
                          id="description"
                          v-model="form.description"
                          class="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Description"
                        >
                      </div>
                      <div class="mb-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2 text-left" for="price">
                          Price
                        </label>
                        <input
                          id="price"
                          v-model="form.price"
                          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                          type="number"
                          placeholder="0.00"
                          min="0"
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <button type="submit" class="flex items-center justify-center w-12 h-12 text-gray-100 rounded-full m-1" :class="(menuFullSelect) ? 'bg-purple-500' :'bg-gray-500 cursor-not-allowed'" :disabled="!menuFullSelect || loading" @click="addMenu()">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2 my-2">
      <div class=" w-full">
        <div class="bg-gray-50  flex items-center justify-center px-2">
          <div class=" w-full max-w-lg">
            <div class="m-8 relative space-y-4">
              <!--menu tile-->
              <div v-if="menuBar.length > 0">
                <MenuBarTile
                  v-for="(menu, n) in menuBarPaginated"
                  :key="n"
                  :menu="menu"
                  :loading="loading"
                  :menuid="Menuid"
                  @selectMenu="selectMenuBar"
                />
              </div>
              <div v-if="menuBar.length > 0" class="">
                <Pagination
                  :per-page="parseInt(4)"
                  :itemlist="getMenuBarUnique"
                  resource="Major Menu"
                  :expectcurrentpage="CurrentPage"
                  @display-data="setDisplayDataMenuBar"
                  @selectedPage="setSelectedPage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class=" w-full">
        <div class="bg-gray-50 h-full justify-center px-2 ">
          <div class=" w-full flex h-full justify-center items-center">
            <div class="m-8 relative space-y-4">
              <!--tile details-->
              <div v-for="(menu, n) in getsetDisplayDataMenuBarMinor" :key="n">
                <MenuBarMinorTile :menu="menu" @deleteMenu="deleteMenuBar" />
              </div>
              <div v-if="menuBar.length > 0" class="">
                <Pagination
                  :per-page="parseInt(4)"
                  :itemlist="getMenudMajorSelected"
                  resource="Minor Menu"
                  :expectcurrentpage="CurrentPage"
                  @display-data="setDisplayDataMenuBarMinor"
                  @selectedPage="setSelectedPage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable vue/require-prop-types */
import { mapGetters } from 'vuex'
import _ from 'lodash'
import MenuBarTile from '@/components/supervisor/menu/MenuBarTile'
import MenuBarMinorTile from '@/components/supervisor/menu/MenuBarMinorTile'
export default {
  components: {
    MenuBarTile, MenuBarMinorTile
  },

  data () {
    return {
      loading: false,
      showSelectionMajor: false,
      showSelectionMinor: false,
      stockBarFilter: null,
      menuBar: [],
      menuBarMinor: [],
      stockBar: [],
      selectedStockbarText: null,
      selectedStockbarMinorText: null,
      stocks: [],
      CurrentPage: 1,
      menuBarPaginated: [],
      Menuid: 0,
      form: {
        stock1s_id: null,
        category: null,
        stocks: null,
        description: null,
        price: 0
      },
      MenudMajorSelected: [],
      MenudMajorSelectedPaginated: []
    }
  },

  computed: {
    ...mapGetters(['getToken']),

    getstockBarFilterUnique () {
      return _.uniqBy(this.stockBar, 'category')
    },

    getMenuBarUnique () {
      return _.uniqBy(this.menuBar, 'category')
    },

    menuFullSelect () {
      return (
        this.form.stock1s_id != null &&
        this.form.category != null &&
        this.form.stocks != null &&
        this.form.description != null &&
        this.tryParseInt(this.form.price) >= 500
      )
    },

    getMenudMajorSelected () {
      return this.MenudMajorSelected
    },

    getsetDisplayDataMenuBarMinor () {
      return this.MenudMajorSelectedPaginated
    }
  },

  watch: {
    selectedStockbarMinorText: {
      handler (newVal) {
        if (newVal == null) {
          this.form = {
            stock1s_id: null,
            category: null,
            stocks: null,
            description: null,
            price: null
          }
        }
      }
    }
  },

  mounted () { this.fetch() },

  methods: {
    tryParseInt (val) {
      try {
        return parseInt(val)
      } catch (Exception) {
        console.log(Exception)
        return 0
      }
    },

    setSelectedPage (page) {
      this.CurrentPage = page
    },

    setDisplayDataMenuBar (data) {
      this.menuBarPaginated = data
    },

    setDisplayDataMenuBarMinor (data) {
      this.MenudMajorSelectedPaginated = data
    },

    selectMenuBar (Menu) {
      this.Menuid = Menu.menu_bars_id
      const temp = _.filter(this.menuBar, function (o) {
        return (o.category == Menu.category)
      })
      this.MenudMajorSelected = temp
    },

    clearMinorMenu () {
      this.showSelectionMajor = false
      this.selectedStockbarMinorText = null
      this.showSelectionMinor = false
      this.stocks = []
    },

    fnselectionMain (stock) {
      this.selectedStockbarText = stock.category
      this.showSelectionMajor = false
      this.stocks = _.filter(this.stockBarFilter, function (c) {
        return (c.category == stock.category) // remove if stock1s_id in menuBar is stock1s_id in stockBar
      })
      // for minor stock
      this.selectedStockbarMinorText = null
      this.showSelectionMinor = false
    },

    fnselectionMinor (stock) {
      this.selectedStockbarMinorText = stock.stocks
      this.showSelectionMinor = false
      this.form.stock1s_id = stock.stock1s_id
      this.form.category = stock.category
      this.form.stocks = stock.stocks
    },

    async fetch () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        key: ''
      }
      try {
        await this.$axios.$post('getMenuBar', bodyParameters, config)
          .then(({ result, menuBar, stockBar }) => {
            if (result && menuBar && stockBar) {
              this.menuBar = Object.keys(menuBar).length > 0 ? menuBar : []
              this.stockBar = Object.keys(stockBar).length > 0 ? stockBar : []

              // filter ADDTO STOCK MENU from here
              _(menuBar).forEach(function (value) {
                _.remove(stockBar, function (c) {
                  return (c.stock1s_id == value.stock1s_id) // remove if stock1s_id in menuBar is stock1s_id in stockBar
                })
              })
              this.stockBarFilter = stockBar
            }
          })
          .catch((errors) => {
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
        console.log(e)
      }
    },

    async addMenu () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = this.form
      this.loading = true
      try {
        await this.$axios.$post('addMenuBar', bodyParameters, config)
          .then(({ result, category }) => {
            if (result) {
              this.selectedStockbarMinorText = null
              this.$toast.success('Added ' + category)
              this.clearMinorMenu()
              this.fetch()
            } else {
              this.$toast.error('Adding ' + category + ' might have failed!')
            }
          })
          .catch((errors) => {
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
        console.log(e)
      }
      this.loading = false
    },

    async deleteMenuBar (val) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = { id: val }
      this.loading = true
      try {
        await this.$axios.$post('delMenuBar', bodyParameters, config)
          .then(({ result, category }) => {
            if (result) {
              this.selectedStockbarMinorText = null
              this.MenudMajorSelected = []
              this.$toast.success('Deleted ' + category)
              this.fetch()
            } else {
              this.$toast.error('Deleting ' + category + ' might have failed!')
            }
          })
          .catch((errors) => {
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
            } else {
              this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
            }
          })
      } catch (e) {
        this.$toast.error(e)
        console.log(e)
      }
      this.loading = false
    }

  }
}
</script>

<style scoped>
  .minWdth {
     min-width: 400px;
  }
</style>

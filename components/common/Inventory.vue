<template>
  <div>
    <!--Add Inventoey-->
    <div v-show="usersection == 'STORE'">
      <!--menu-->
      <div
        class="w-full p-5 border shadow-2xl mt-2 flex flex-row cursor-pointer"
        @click="toggleShowMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <span class="px-2 uppercase">add stock</span>
      </div>
      <div v-if="showMenu" class="grid grid-cols-3 gap-2">
        <div class="w-full">
          <div class="bg-gray-50 flex items-center justify-center px-2">
            <div class="w-full max-w-lg">
              <div class="m-8 relative space-y-4">
                <!--add to major list item-->
                <span class="capitalize text-gray-500">add major category</span>
                <AddCategory
                  :uppercase="true"
                  :loading="loading"
                  @firedEvent="firedEventMajor"
                  @search="filterSearchMajor"
                />
                <div v-if="getmenuMajor.length > 0">
                  <MajorCategory
                    v-for="(inventory, n) in inventoryMajorPaginated"
                    :key="n"
                    :menu="inventory"
                    :loading="loading"
                    :menuid="MenuidMajor"
                    @deleteMenu="deleteInventoryMajor"
                    @selectMenu="selectInventoryMajor"
                  />
                </div>
                <div>
                  <Pagination
                    :per-page="parseInt(6)"
                    :itemlist="getmenuMajorFiltered"
                    resource="Major Menu"
                    :expectcurrentpage="CurrentPage"
                    @display-data="setDisplayDataMenuMajor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="bg-gray-50 flex items-center justify-center px-2">
            <div class="w-full max-w-lg">
              <div class="m-8 relative space-y-4">
                <!--add to minor list item-->
                <span class="capitalize text-gray-500">add minor category</span>
                <AddCategory
                  :uppercase="true"
                  :loading="loading"
                  :search="getCategoryText"
                  @firedEvent="firedEventMinor"
                  @search="filterSearchMinor"
                />
                <div v-if="inventoryMinorSelected.length > 0">
                  <MajorCategory
                    v-for="(inventory, n) in inventoryMinorPaginated"
                    :key="n"
                    :menu="inventory"
                    :loading="loading"
                    :menuid="MenuidMinor"
                    @deleteMenu="deleteInventoryMinor"
                    @selectMenu="selectInventoryMinor"
                  />
                </div>
                <div v-else class="text-red-500">
                  <p>No Menu Selected!</p>
                </div>
                <div>
                  <Pagination
                    :per-page="parseInt(6)"
                    :itemlist="getinventoryMinorSelected"
                    resource="Minor Menu"
                    @display-data="setDisplayDataInventoryMinor"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full">
          <div class="bg-gray-50 flex items-center justify-center px-2">
            <div class="w-full max-w-lg">
              <div class="m-8 relative space-y-4">
                <!--add to units list item-->
                <span class="capitalize text-gray-500">add units of measure</span>
                <AddCategory
                  :uppercase="false"
                  :loading="loading"
                  @firedEvent="firedEventUnit"
                  @search="filterSearchUnits"
                />
                <MajorCategory
                  v-for="(unit, n) in unitsPaginated"
                  :key="n"
                  :menu="unit"
                  :loading="loading"
                  :menuid="Unitid"
                  @deleteMenu="deleteUnits"
                  @selectMenu="selectUnit"
                />
                <div>
                  <Pagination
                    :per-page="parseInt(6)"
                    :itemlist="getmenuUnitsFiltered"
                    :expectcurrentpage="getPage"
                    resource="Units"
                    @display-data="setDisplayDataUnits"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--add stock-->
      <div class="w-full p-5 border shadow-2xl mt-1">
        <div class="grid grid-cols-3 gap-2">
          <div>
            <div
              v-show="parseInt(MenuidMajor) > 0"
              class="bg-gray-100 border-green-600  dark:bg-gray-800  bg-opacity-95
              border-opacity-60 p-1 border-solid rounded-3xl border-2 flex
              justify-around  hover:bg-green-400 dark:hover:bg-green-600  hover:border-transparent
              transition-colors  duration-500"
            >
              <div class="flex flex-col justify-center">
                <p
                  class="text-gray-900 dark:text-gray-300 uppercase font-semibold"
                >
                  {{ getMenuidMajor[0] ? getMenuidMajor[0].category : "" }}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div>
            <div
              v-show="parseInt(MenuidMinor) > 0"
              class="bg-gray-100  border-green-600  dark:bg-gray-800  bg-opacity-95
              border-opacity-60 p-1 border-solid rounded-3xl border-2 flex justify-around
              hover:bg-green-400  dark:hover:bg-green-600 hover:border-transparent
              transition-colors duration-500"
            >
              <div class="flex flex-col justify-center">
                <p class="text-gray-900 dark:text-gray-300 font-semibold">
                  {{ getMenuidMinor[0] ? getMenuidMinor[0].category : "" }}
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
          <div>
            <div
              v-show="parseInt(Unitid) > 0 && getMenuidMinor[0]"
              class="bg-gray-100 border-green-600 dark:bg-gray-800 bg-opacity-95
              border-opacity-60 p-1 border-solid rounded-3xl border-2 flex justify-around
              hover:bg-green-400 dark:hover:bg-green-600 hover:border-transparent
              transition-colors duration-500"
            >
              <div class="flex flex-col justify-center">
                <p class="text-gray-900 dark:text-gray-300 font-semibold">
                  UNIT ({{ getUnitid[0] ? getUnitid[0].category : "" }})
                </p>
              </div>
              <svg
                v-if="!loadingAddStock"
                xmlns="http://www.w3.org/2000/svg"
                class="h-10 w-10 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
                @click="AddStock"
              >
                <path
                  d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                />
                <path
                  stroke="#fff"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 11h4m-2-2v4"
                />
              </svg>
              <Spinner v-else class="h-10 w-10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--end add inventory-->

    <div class="w-full p-5 border shadow-2xl mt-5">
      <BaseFilter
        class="border-b-2 mb-5 pb-2"
        section="Section"
        :section-text="getSearch.selection ? getSearch.selection : 'NULL'"
        :options="(getUser.section=='STORE' || getUser.section == 'SUPERVISOR')"
      />
    </div>

    <div class=" w-full p-5 border  shadow-2xl rounded">
      <div class="p-1 rounded-l-md h-8 w-min rounded" :class="getloadingStock ? '' : 'bg-gray-200'">
        <svg
          v-if="!getloadingStock"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 cursor-pointer"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          @click="reset"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        <Spinner v-else />
      </div>
    </div>

    <!--stock pile Bar-->
    <div class="w-full p-5 border shadow mt-5">
      <div class="w-full grid grid-cols-3 gap-2">
        <StockTile
          v-for="(stock, n) in stockPaginated"
          :key="n"
          :stock="stock"
          :usersection="usersection"
          :stock-operation-use="true"
          :selection-users="userAndDepartments"
          @inboundTile="inboundStock"
          @outboundTile="outboundStock"
          @fixinboundStock="fixinboundStock"
          @fixoutboundStock="fixoutboundStock"
          @consumeTile="consumeTile"
          @deleteStock="deleteStock"
        />
      </div>
      <div>
        <Pagination
          :per-page="parseInt(8)"
          :itemlist="getStockAll"
          resource="Stock"
          :expectcurrentpage="getPage"
          @display-data="setDisplayDataStock"
          @selectedPage="setSelectedPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import MajorCategory from '@/components/common/MajorCategory'
import AddCategory from '@/components/common/AddCategory'
import StockTile from '@/components/common/StockTile'
import Spinner from '@/components/filters/Spinner'
import BaseFilter from '@/components/filters/BaseFilter'

export default {
  name: 'Inventory',

  components: {
    AddCategory,
    MajorCategory,
    StockTile,
    Spinner,
    BaseFilter
  },

  data () {
    return {
      showMenu: false,
      SelectionMinorMenu: [],
      MenuidMajor: 0,
      MenuidMinor: 0,
      Unitid: 0,
      AddCategoryText: '',
      loading: false,
      loadingAddStock: false,
      inventoryMajorPaginated: [],
      inventoryMinorPaginated: [],
      stockPaginated: [],
      unitsPaginated: [],
      inventoryMinorSelected: [],
      CurrentPage: 1,
      getmenuMajorFiltered: [],
      filterMinor: null,
      getmenuUnitsFiltered: []
    }
  },

  computed: {
    ...mapGetters([
      'getToken',
      'getUser',
      'getUsers',
      'getStockAll',
      'getmenuMajor',
      'getmenuMinor',
      'getUnits',
      'getPage',
      'getSearch',
      'getloadingStock'
    ]),

    usersection () { return this.getUser ? this.getUser.section : null },

    userAndDepartments () {
      return this.getUsers
    },

    getinventoryMinorSelected () {
      return _.filter(this.inventoryMinorSelected, (o) => {
        return o.category.includes(this.filterMinor)
      })
    },

    getMenuidMajor () {
      const MenuidMajor = this.MenuidMajor
      return _.filter(this.inventoryMajorPaginated, function (o) {
        return o.stocks_id == MenuidMajor
      })
    },

    getMenuidMinor () {
      const MenuidMinor = this.MenuidMinor
      return _.filter(this.inventoryMinorPaginated, function (o) {
        return o.stock1s_id == MenuidMinor
      })
    },

    getUnitid () {
      const Unitid = this.Unitid
      return _.filter(this.unitsPaginated, function (o) {
        return o.stock2s_id == Unitid
      })
    },

    getCategoryText () {
      return this.AddCategoryText
    }
  },

  watch: {
    getmenuMinor: {
      handler (newVal) {
        if (this.MenuidMajor && this.MenuidMajor > 0) {
          this.selectInventoryMajor(this.MenuidMajor)
        }
      }
    },
    getSearch: {
      handler (newVal) { // prevent double search
        if (!this.getloadingStock) { this.fetchStock() }
      }
    }
  },

  created () {
    this.setSelectedPage(1)
    this.fetchMenu()
    this.fetchStock()
  },

  methods: {
    ...mapActions(['fetchMenu', 'fetchStock']),
    ...mapMutations(['setPage', 'RESET_SEARCH', 'SET_SEARCH']),

    toggleShowMenu () {
      this.showMenu = !this.showMenu
    },

    setSelectedPage (page) {
      this.setPage(page)
    },

    AddStock () {
      if (
        this.getMenuidMajor[0] &&
        this.getMenuidMinor[0] &&
        this.getUnitid[0]
      ) {
        this.AddStocks(
          this.usersection, // Section
          this.getMenuidMinor[0].category, // Stocks
          this.MenuidMinor, //  stock1sid
          this.getMenuidMajor[0].category, // Category
          this.getUnitid[0].category // Unit
        )
      } else {
        this.$toast.error('Make Full Selection')
      }
    },

    firedEventMajor (val) {
      this.addMenu(val, 'Major')
    },

    filterSearchMajor (val) { // from input element
      this.getmenuMajorFiltered = _.filter(this.getmenuMajor, (o) => {
        return o.category.includes(val)
      })
    },

    filterSearchMinor (val) { // from input element
      this.filterMinor = val
    },

    filterSearchUnits (val) {
      this.getmenuUnitsFiltered = _.filter(this.getUnits, (o) => {
        return o.category.includes(val)
      })
    },

    firedEventMinor (val) {
      if (!this.MenuidMajor || !(this.MenuidMajor > 0)) {
        this.$toast.error(
          'Major Menu Not Selected or Required Fields are not provided'
        )
        return
      }
      this.addMenu(val, 'Minor', this.MenuidMajor)
    },

    firedEventUnit (val) {
      this.addMenu(val, 'Unit')
    },

    deleteInventoryMajor (val) {
      this.deleteStockMenu(val, 'Major')
    },

    deleteInventoryMinor (val) {
      this.deleteStockMenu(val, 'Minor')
    },

    deleteUnits (val) {
      this.deleteStockMenu(val, 'Unit')
    },

    setDisplayDataInventoryMinor (data) {
      this.inventoryMinorPaginated = data
    },

    setDisplayDataUnits (data) {
      this.unitsPaginated = data
    },

    selectInventoryMajor (val) {
      const temp = _.filter(this.getmenuMinor, function (o) {
        return parseInt(o.stocks_id, 10) == parseInt(val, 10)
      })
      this.inventoryMinorSelected = temp.length > 0 ? temp : []
      this.MenuidMajor = val
      this.MenuidMinor = 0
      this.Unitid = 0
      this.inventoryMinorPaginated = []
    },

    selectInventoryMinor (val) {
      this.MenuidMinor = val
      this.Unitid = 0
    },

    selectUnit (val) {
      this.Unitid = val
    },

    setDisplayDataMenuMajor (data) {
      this.inventoryMajorPaginated = data
    },

    setDisplayDataStock (data) {
      this.stockPaginated = data
    },

    reset () {
      if (this.getUser.section == 'STORE' || this.getUser.section == 'SUPERVISOR' || this.getUser.section == 'ACCOUNTS') {
        this.RESET_SEARCH()
      } else {
        this.SET_SEARCH({
          selection: this.getUser.section,
          search: null,
          DRange: {
            from: null,
            to: null
          }
        })
      }

      this.fetchStock()
    },

    async addMenu (val, section, MenuidMajor = 0) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        category: val,
        type: section,
        id: MenuidMajor
      }
      this.loading = true
      try {
        await this.$axios
          .$post('addStockMenu', bodyParameters, config)
          .then(({ result }) => {
            if (result) {
              this.AddCategoryText = null
              this.inventoryMinorPaginated = []
              this.inventoryMinorSelected = []
              this.$toast.success('Added Successfully')
              this.fetchMenu()
            } else {
              this.$toast.error('Adding  might have failed!')
            }
          })
          .catch((errors) => {
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.data.message)
              )
            } else {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.request.statusText)
              )
            }
          })
      } catch (e) {
        this.$toast.error(e)
        console.log(e)
      }
      this.loading = false
    },

    async deleteStockMenu (Stockid, section) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        id: Stockid,
        type: section
      }
      this.loading = true
      try {
        await this.$axios
          .$post('delStockMenu', bodyParameters, config)
          .then(({ result }) => {
            if (result) {
              this.MenuidMajor = 0
              this.inventoryMinorPaginated = []
              this.inventoryMinorSelected = []
              this.$toast.success('Deleted Successfully')
              this.fetchMenu()
            } else {
              this.$toast.error('Deleting might have failed!')
            }
          })
          .catch((errors) => {
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.data.message)
              )
            } else {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.request.statusText)
              )
            }
          })
      } catch (e) {
        this.$toast.error(e)
        console.log(e)
      }
      this.loading = false
    },

    async AddStocks (Section, Stocks, stock1sid, Category, Unit) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        section: Section,
        stocks: Stocks,
        stock1s_id: stock1sid,
        category: Category,
        unit: Unit
      }
      this.loadingAddStock = true
      try {
        await this.$axios
          .$post('AddStocks', bodyParameters, config)
          .then(({ result }) => {
            if (result) {
              this.$toast.success('Added ' + Category)
              this.MenuidMajor = 0
              this.MenuidMinor = 0
              this.Unitid = 0
              this.showMenu = !this.showMenu
              this.fetchStock()
            } else {
              this.$toast.error('Adding ' + Category + ' might have failed!')
            }
          })
          .catch((errors) => {
            console.log(errors.response)
            if (errors.response.data.message) {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.data.message)
              )
            } else {
              this.$toast.error(
                this.$ObjTemplate.trim(errors.response.request.statusText)
              )
            }
          })
      } catch (e) {
        this.$toast.error(e)
        console.log(e)
      }
      this.loadingAddStock = false
    },

    async inboundStock (stock, inboundData) {
      try {
        await this.$swal.fire({
          title: 'Note!',
          html: `<div>
          <span style="color:red; font-size: x-large;">ADD</span><br> ${inboundData} ${stock.unit} of <span style="color:black; text-transform: uppercase;">${stock.stocks}</span> to <br><span style="color:red; font-size: x-large;">STORE</store>
          </div>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, ADD!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: stock.asset_id,
              inbound: inboundData
            }
            return this.$axios.$post('inboundStock', bodyParameters, config)
              .then(({ result }) => {
                if (result) {
                  this.$toast.success(`Added ${inboundData} ${stock.unit} of ${stock.stocks} to STORE`)
                  this.fetchStock()
                } else {
                  this.$toast.error(`Adding ${inboundData} ${stock.unit} of ${stock.stocks} to STORE might have failed!`)
                  return this.$swal.showValidationMessage('Addition might have failed!')
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Added Stock!',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> has been Added to STORE.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    },

    async fixinboundStock (stock, inboundData) {
      try {
        await this.$swal.fire({
          title: `Authentication needed to Add ${inboundData} Units to ${stock.stocks} Stock`,
          html: `<form class="w-full">
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-2s00 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="email" type="text" placeholder="Supervisor Account">
              </div>
            </div>
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="password" type="password" placeholder="Password">
              </div>
            </div>
          </form>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, ADD!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            if (!email) { return this.$swal.showValidationMessage('Email Required!') }
            if (!password) { return this.$swal.showValidationMessage('password Required!') }
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: stock.asset_id,
              inbound: inboundData,
              email,
              password
            }
            return this.$axios.$post('inboundStock/fix', bodyParameters, config)
              .then(({ result }) => {
                if (result) {
                  this.$toast.success('Correction Applied ')
                  this.fetchStock()
                } else {
                  this.$toast.error('Correcting might have failed!')
                  return this.$swal.showValidationMessage('Corrrecting might have failed!')
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Correction Applied!',
              `${stock.stocks} has been corrected.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `${stock.stocks} is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    },

    async outboundStock (
      stock,
      selectedDepartment,
      selectedUser,
      outboundData
    ) {
      try {
        await this.$swal.fire({
          title: 'Note!',
          html: `<div>
          <span style="color:red; font-size: x-large;">TRANSFER</span><br>
          ${outboundData} ${stock.unit} of <span style="color:black; text-transform: uppercase;">${stock.stocks}</span> to ${selectedUser}
          <br><span style="color:red; font-size: x-large;">${selectedDepartment}</store>
          </div>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, TRANSFER!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: stock.asset_id,
              section: selectedDepartment,
              onrequestof: selectedUser,
              outbound: outboundData
            }
            return this.$axios.$post('outboundStock', bodyParameters, config)
              .then(({ result }) => {
                if (result) {
                  this.$toast.success(`Transfered ${outboundData} ${stock.unit} of ${stock.stocks} to ${selectedDepartment}`)
                  this.fetchStock()
                } else {
                  this.$toast.error(`Transfering ${outboundData} ${stock.unit} of ${stock.stocks} to ${selectedDepartment} might have failed!`)
                  return this.$swal.showValidationMessage('Transfering might have failed!')
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Transfered Stock!',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> has been Transfered to <span style="text-transform: uppercase;">${selectedDepartment}</span>.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    },

    async fixoutboundStock (stock, outboundData) {
      try {
        await this.$swal.fire({
          title: `Authentication needed to Remove ${outboundData} Units from ${stock.stocks} Stock`,
          html: `<form class="w-full">
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-2s00 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="email" type="text" placeholder="Supervisor Account">
              </div>
            </div>
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="password" type="password" placeholder="Password">
              </div>
            </div>
          </form>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, REMOVE!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            if (!email) { return this.$swal.showValidationMessage('Email Required!') }
            if (!password) { return this.$swal.showValidationMessage('password Required!') }
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: stock.asset_id,
              outbound: outboundData,
              email,
              password
            }
            return this.$axios.$post('outboundStock/fix', bodyParameters, config)
              .then(({ result }) => {
                if (result) {
                  this.$toast.success('Correction Applied ')
                  this.fetchStock()
                } else {
                  this.$toast.error('Correcting  might have failed!')
                  return this.$swal.showValidationMessage('Corrrecting might have failed!')
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Correction Applied!',
              `${stock.stocks} has been corrected.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `${stock.stocks} is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
        console.log(e)
      }
    },

    async consumeTile (stock, selectedUseOperation, stockOperationsData) {
      try {
        const config = {
          headers: { 'X-CSRF-TOKEN': this.getToken }
        }
        const bodyParameters = {
          id: stock.asset_id,
          selectedUseOperation,
          stockOperationsData
        }
        if (selectedUseOperation.toLowerCase() == 'used') {
          await this.$swal.fire({
            title: 'Note!',
            html: `<div>
          <span style="color:red; font-size: x-large; text-transform: uppercase;">${selectedUseOperation}</span><br>
          ${stockOperationsData} ${stock.unit} of <span style="color:black; text-transform: uppercase;">${stock.stocks}</span>
          </div>`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: `Yes, <span style="text-transform: uppercase;">${selectedUseOperation}</span>!`,
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
              return this.$axios.$post('consumeStock', bodyParameters, config)
                .then(({ result }) => {
                  if (result) {
                    this.$toast.success(`${selectedUseOperation} ${stockOperationsData} ${stock.unit} of ${stock.stocks}`)
                    this.fetchStock()
                  } else {
                    this.$toast.error(`${selectedUseOperation} ${stockOperationsData} ${stock.unit} of ${stock.stocks} might have failed!`)
                    return this.$swal.showValidationMessage(`${selectedUseOperation} might have failed!`)
                  }
                })
                .catch((errors) => {
                  if (errors.response.data.message) {
                    this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                    return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                  } else {
                    this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                    return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                  }
                })
            },
            allowOutsideClick: () => !this.$swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              this.$swal.fire(
              `${selectedUseOperation} Stock!`,
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> is ${selectedUseOperation}.`,
              'success'
              )
            } else if (
              result.dismiss == this.$swal.DismissReason.cancel
            ) {
              this.$swal.fire(
                'Cancelled',
              `<span style="color: black; text-transform: uppercase;">${stock.stocks}</span> is safe :)`,
              'error'
              )
            }
          })
        } else {
          await this.$swal.fire({
            title: 'Supervisor QAC needed to Transact',
            html: `<form class="w-full">
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="qac" type="password" placeholder="Supervisor's QAC">
              </div>
            </div>
          </form>`,
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, Proceed!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
              const qac = document.getElementById('qac').value
              if (!qac) { return this.$swal.showValidationMessage('QAC Required!') }
              bodyParameters.qac = qac
              return this.$axios.$post('consumeStock', bodyParameters, config)
                .then(({ result, message }) => {
                  if (result) {
                    this.$toast.success(message)
                    this.fetchStock()
                  } else {
                    this.$toast.error(message)
                    return this.$swal.showValidationMessage(message)
                  }
                })
                .catch((errors) => {
                  if (errors.response.data.message) {
                    this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                    return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                  } else {
                    this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                    return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                  }
                })
            },
            allowOutsideClick: () => !this.$swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
              this.$swal.fire(
                'Success!',
                'Operation Complete!',
                'success'
              )
            }
          })
        }
      } catch (e) {
        this.$toast.error(e)
      }
    },

    async deleteStock (Stock) { // this.stock.asset_id, this.stock.section
      try {
        await this.$swal.fire({
          title: `Supervisor Authentication needed to Delete ${Stock.stocks}`,
          html: `<form class="w-full">
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-2s00 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="email" type="text" placeholder="Supervisor Account">
              </div>
            </div>
            <div class="flex items-center mb-6">
              <div class="w-full">
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-green-500" id="password" type="password" placeholder="Password">
              </div>
            </div>
            <p style="color: red;">You won't be able to revert this!</p>
          </form>`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const email = document.getElementById('email').value
            const password = document.getElementById('password').value
            if (!email) { return this.$swal.showValidationMessage('Email Required!') }
            if (!password) { return this.$swal.showValidationMessage('password Required!') }
            const config = {
              headers: { 'X-CSRF-TOKEN': this.getToken }
            }
            const bodyParameters = {
              id: Stock.asset_id,
              type: Stock.section,
              email,
              password
            }
            return this.$axios.$post('delStock', bodyParameters, config)
              .then(({ result, category }) => {
                if (result) {
                  this.$toast.success('Deleted ' + category)
                  this.fetchStock()
                } else {
                  this.$toast.error(`Deleting  ${category} might have failed!`)
                  return this.$swal.showValidationMessage(`Deleting  ${category} might have failed!`)
                }
              })
              .catch((errors) => {
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                  return this.$swal.showValidationMessage(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Deleted!',
              `${Stock.stocks} has been deleted.`,
              'success'
            )
          } else if (
            result.dismiss == this.$swal.DismissReason.cancel
          ) {
            this.$swal.fire(
              'Cancelled',
              `${Stock.stocks} is safe :)`,
              'error'
            )
          }
        })
      } catch (e) {
        this.$toast.error(e)
      }
    }
  }
}
</script>

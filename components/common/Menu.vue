<template>
  <div class=" mb-5">
    <!--menu-->
    <div class=" w-full p-5 border  shadow-2xl mt-2 flex flex-row cursor-pointer" @click="showMenu = !showMenu">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
      <span class=" px-2 uppercase">menu</span>
    </div>

    <div v-show="showMenu" class="grid grid-cols-6 md:grid-row-6 gap-2 p-5 mt-2 mb-5 h-80">
      <!--section-->
      <div class=" col-span-1 shadow-xl rounded-md overflow-scroll h-80">
        <div class=" w-full h-full flex flex-col justify-center align-middle">
          <div class="mx-5 my-5">
            <button
              :class="checkOrdersSection == 'KITCHEN'?'bg-blue-500':'bg-blue-300'"
              class=" hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700 shadow-xl rounded w-full uppercase"
              @click="getMenuKitchen(); $emit('increaseTimerSet')"
            >
              kitchen
            </button>
          </div>
          <div class="mx-5 my-5">
            <button
              :class="checkOrdersSection == 'SERVICE-BAR'?'bg-blue-500':'bg-blue-300'"
              class=" hover:bg-blue-500 text-white font-bold py-2 px-4 border-b-4 border-blue-700  shadow-xl rounded w-full uppercase"
              @click="getMenuBar(); $emit('increaseTimerSet')"
            >
              bar
            </button>
          </div>
        </div>
      </div>

      <!--majors-->
      <div class=" col-span-2 shadow-xl rounded-md overflow-scroll h-80">
        <div class="container flex mx-auto items-center justify-center">
          <ul class="flex flex-col bg-gray-100 p-4  my-2 mx-2 rounded-md w-full">
            <li
              v-for="(menu_, n) in getmenuFilterUnique"
              :key="n"
              class="border-gray-400 flex flex-row mb-2"
              @click="fnselectionMain(menu_.category, n)"
            >
              <div
                :class="majorIndex==n?'bg-gray-400':'bg-gray-200'"
                class="select-none cursor-pointer rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div class="flex flex-col rounded-md w-4 h-4 justify-center items-center mr-4">
                  📖
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium uppercase">
                    {{ menu_.category }}
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--minors-->
      <div class=" col-span-2 shadow-xl rounded-md overflow-scroll h-80">
        <div class="container flex mx-auto items-center justify-center ">
          <ul class="flex flex-col bg-gray-100 p-4 my-2 mx-2 rounded-md w-full">
            <li
              v-for="(menu_, n) in minorMenuBar"
              :key="n"
              class="border-gray-400 flex flex-row mb-2"
              @click="setMinors(n, menu_)"
            >
              <div
                :class="minorIndex==n?'bg-gray-400':'bg-gray-200'"
                class="select-none cursor-pointer bg-gray-200 rounded-md flex flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div class="flex flex-col rounded-md w-4 h-4 justify-center items-center mr-4">
                  📖
                </div>
                <div class="flex-1 pl-1 mr-16">
                  <div class="font-medium">
                    {{ menu_.stocks }}
                  </div>
                  <div class="text-gray-600 text-sm">
                    {{ menu_.description }}
                  </div>
                </div>
                <div class="text-gray-600 text-xs">
                  {{ menu_.price }} UGX
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!--selection-->
      <div class=" col-span-1 h-full rounded-md">
        <div class="border-gray-400 flex flex-row mb-2">
          <div
            class="bg-gray-200 select-none rounded-md flex flex-col flex-1 items-center p-4  transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            <div class="text-gray-600 text-lg font-black text-left w-full">
              {{ orders.cost |number_format }} UGX
            </div>
          </div>
        </div>

        <div>
          <section>
            <div class=" border flex flex-wrap w-full mb-4 relative h-15 bg-white items-center rounded pr-10">
              <div class="flex -mr-px justify-center w-15">
                <span
                  class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.871 4A17.926 17.926 0 003 12c0 2.874.673 5.59 1.871 8m14.13 0a17.926 17.926 0 001.87-8c0-2.874-.673-5.59-1.87-8M9 9h1.246a1 1 0 01.961.725l1.586 5.55a1 1 0 00.961.725H15m1-7h-.08a2 2 0 00-1.519.698L9.6 15.302A2 2 0 018.08 16H8" />
                  </svg>
                  <span class=" text-xs text-gray-400">Qty</span>
                </span>
              </div>
              <input
                v-model="refQty"
                min="1"
                type="number"
                class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-8 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-sm outline-none"
                placeholder="Quantity"
              >
            </div>

            <div class=" border flex flex-wrap w-full mb-4 relative h-15 bg-white items-center rounded pr-10">
              <div class="flex -mr-px justify-center w-15">
                <span
                  class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
                  </svg>
                </span>
              </div>
              <input
                v-model="orders.destTbl"
                type="text"
                class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-8 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-sm outline-none"
                placeholder="Table Number"
              >
            </div>

            <div class=" border flex flex-wrap w-full mb-4 relative h-15 bg-white items-center rounded pr-10">
              <div class="flex -mr-px justify-center w-15">
                <span
                  class="flex items-center leading-normal bg-white px-3 border-0 rounded rounded-r-none text-2xl text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </span>
              </div>
              <input
                v-model="orders.destRmn"
                type="text"
                class="flex-shrink flex-grow flex-auto leading-normal w-px border-0 h-8 border-grey-light rounded rounded-l-none px-3 self-center relative  font-roboto text-sm outline-none"
                placeholder="Room Number"
              >
            </div>
          </section>
        </div>

        <div class="w-full justify-self-stretch">
          <div class="my-5 align-bottom">
            <Spinner v-if="loadingAddInv" />
            <button
              v-else
              class=" hover:bg-green-500 bg-green-300 text-white font-bold py-2 px-4 border-b-4 border-green-700 rounded w-full uppercase"
              @click="addToInvoicefn"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-show="showMenu" class=" px-5 mt-10">
      <InvoiceTile
        :usersection="user?user.section:''"
        :receipt="receipt"
        :loading-save-inv="loadingSaveInv"
        @saveInvoicefn="saveInvoicefn"
        @clear="clear"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
import _ from 'lodash'
import { mapGetters } from 'vuex'
import InvoiceTile from '@/components/common/InvoiceTile'
import Spinner from '@/components/filters/Spinner'

export default {
  components: {
    InvoiceTile, Spinner
  },

  // eslint-disable-next-line vue/require-prop-types
  props: ['user', 'receipt', 'loadingAddInv', 'loadingSaveInv'],

  data () {
    return {
      showMenu: false,
      menu: [],
      minorMenuBar: [],
      refCost: 0,
      majorIndex: -1,
      minorIndex: -1,
      OrdersSection: '',
      refQty: 1,
      orders: {
        /* orders_id: 0, */
        section: null,
        /* receipts_id: '',
        OrderID: 0, */
        Category: '',
        dish: '',
        Description: '',
        cost: 0,
        qty: 1,
        SentFrom: null,
        status: 10, // 5 pending, 10 new  15 served 20 cancelling 25 cancelled
        /* reason: '',
        requestdel: 0, */
        uID: null,
        Names: null,
        destTbl: '',
        destRmn: ''
      }
    }
  },

  computed: {
    ...mapGetters(['getAllMenu']),

    getmenuFilterUnique () {
      return _.uniqBy(this.menu, 'category')
    },

    checkOrdersSection () {
      return this.OrdersSection
    },

    getSentFrom () { return this.user ? this.user.section : '' },

    getUserID () { return this.user ? this.user.id : '' },

    getUserName () { return this.user ? this.user.name : '' }
  },

  watch: {
    refQty: {
      handler (newVal) {
        if (this.orders.cost == 0) {
          this.orders.qty = 1
        } else {
          this.orders.cost = this.refCost * newVal
          this.orders.qty = newVal
        }
      }
    },

    showMenu: {
      handler (newVal) {
        if (newVal == false) {
          this.resetOrders()
        }
      }
    },

    getSentFrom: {
      handler (newVal) {
        this.orders.SentFrom = newVal
      }
    },

    getUserID: {
      handler (newVal) {
        this.orders.uID = newVal
      }
    },

    getUserName: {
      handler (newVal) {
        this.orders.Names = newVal
      }
    }
  },

  mounted () {
    this.resetOrders()
  },

  methods: {
    clear () {
      this.$emit('clear')
      this.resetOrders()
    },

    getMenuKitchen () {
      this.orders.section = this.OrdersSection = 'KITCHEN'
      this.menu = this.getAllMenu.Kitchen
      this.resetMinors()
    },

    getMenuBar () {
      this.orders.section = this.OrdersSection = 'SERVICE-BAR'
      this.menu = this.getAllMenu.Bar
      this.resetMinors()
    },

    setMinors (n, menu) {
      if (this.orders.Category) {
        this.refQty = 1
        this.orders.dish = menu.stocks
        this.orders.Description = menu.description
        this.orders.cost = this.refCost = menu.price
        this.minorIndex = n
      } else {
        this.$toast.error('Select Major Category First')
      }
    },

    resetMinors () {
      this.minorMenuBar = []
      this.orders.dish = ''
      this.orders.Description = ''
      this.orders.cost = 0
      this.minorIndex = -1
      this.refQty = 1
    },

    resetOrders () {
      this.recoveryOrders()
      this.resetMinors()
      this.menu = []
      this.majorIndex = -1
      this.minorIndex = -1
      this.refCost = 0
      this.refQty = 1
      this.OrdersSection = ''
    },

    recoveryOrders () {
      Object.keys(this.orders).forEach(key => delete this.orders[key])
      this.orders.section = null
      this.orders.Category = ''
      this.orders.dish = ''
      this.orders.Description = ''
      this.orders.cost = 0
      this.orders.qty = 1
      this.orders.SentFrom = this.user.section
      this.orders.status = 10 // 5 pending, 10 new  15 served 20 cancelled
      this.orders.uID = this.user.id
      this.orders.Names = this.user.name
      this.orders.destTbl = ''
      this.orders.destRmn = ''
    },

    fnselectionMain (category, n) {
      if (this.orders.section) {
        this.majorIndex = n
        this.resetMinors()
        this.orders.Category = category
        this.minorMenuBar = _.filter(this.menu, function (c) {
          return (c.category == category) // remove if stock1s_id in menu is stock1s_id in stockBar
        })
      } else {
        this.$toast.error('Please Select Destination')
      }
    },

    addToInvoicefn () {
      if (this.minorIndex >= 0) {
        const orders_ = Object.assign({}, this.orders)
        this.resetOrders()
        this.$emit('addToInvoice', orders_)
      } else {
        this.$toast.error(('Select Menu'))
      }
    },

    saveInvoicefn () {
      this.$emit('saveInvoicefn')
    }
  }

}
</script>

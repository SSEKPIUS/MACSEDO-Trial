<template>
  <div>
    <div ref="guest" class="flex w-full flex-row">
      <div class="w-full relative">
        <div
          v-if="addGuest && getUser && getUser.section == 'RECEPTION'"
          class=" w-full h-full top-0 bottom-0 z-10 fixed bg-opacity-30 bg-gray-300"
        >
          <AddGuest
            class="z-10  top-5 left-0 overflow-y-scroll right-0 shadow-2xl bg-white
              mx-auto fixed"
          />
        </div>

        <div v-if="getUser && getUser.section == 'RECEPTION'" class="w-full h-10 m-5">
          <h1 class="text-2xl text-gray-500 font-black">
            Manage Guests
          </h1>
        </div>
        <div class="w-fill px-10 mx-auto">
          <div class="flex flex-row mb-5 items-center justify-center">
            <!-- active users -->
            <div
              v-if="getUser && getUser.section == 'SUPERVISOR'"
              class=" w-1/2 mb-10  mx-5 shadow-2xl grid grid-cols-2 items-center
                justify-center gap-6 text-white rounded-xl p-8 lg:p-16 bg-pink-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-48 w-48"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"
                />
              </svg>
              <div class="text-2xl font-bold">
                <p>Over {{ allGuestsCount }} Guests Lodged</p>
              </div>
            </div>

            <!-- messages -->
            <div v-if="getUser && getUser.section == 'SUPERVISOR'" class="w-1/2 mx-5">
              <div class="my-3 font-black flex flex-row align-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"
                  />
                </svg>
                Notifications
              </div>

              <div
                class=" mb-5 sm:mb-0 w-full divide-y divide-white text-sm  relative
                  rounded-xl text-white p-5 h-32 overflow-y-scroll bg-green-500"
              >
                <p class="p-2 flex flex-row align-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 mr-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span v-if="displayData ? displayData[0] : false">
                    {{ displayData[0].fullname }} checked just checked into room
                    {{ displayData[0].roomNo }}
                  </span>
                </p>

                <p class="p-2 flex flex-row align-middle">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6 mr-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span v-if="displayData ? displayData[1] : false">
                    {{ displayData[1].fullname }} checked just checked into room
                    {{ displayData[1].roomNo }}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <!-- GUESTS  table part -->

          <!---CARD--->

          <div class="w-full grid grid-cols-2 space-between items-center">
            <h1 class="my-5 text-2xl font-black text-left">
              All Guests
            </h1>

            <div v-if="getUser && getUser.section == 'RECEPTION'" class="text-right flex justify-end">
              <button
                class="
                  p-3
                  text-white
                  rounded-md
                  bg-gray-500
                  whitespace-nowrap
                  flex flex-row
                "
                @click="toggleAddGuest"
              >
                Add Guest
                <!--font-awesome-icon class="ml-2" :icon="['fas', 'plus']" /-->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          <BaseFilter
            class="border-b-2 mb-5 pb-2"
            section="Section"
            section-text="GUESTS"
            :options="false"
          />

          <div class=" w-full p-5 border  shadow-2xl rounded">
            <div class="p-1 rounded-l-md h-8 w-min rounded" :class="getloadingGuests ? '' : 'bg-gray-200'">
              <svg
                v-if="!getloadingGuests"
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

          <div v-if="allGuests" class="">
            <div v-show="allGuests.links" class=" w-full p-2  shadow-2xl rounded mt-2  ">
              <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
                <!--eslint-disable-next-line vue/no-v-html-->
                <!--eslint-disable-next-line vue/max-attributes-per-line-->
                <span v-for="(link, n) in allGuests.links" :key="n" :class="allGuests.current_page == link.label?' text-red-600':' text-black'" class=" px-2 cursor-pointer" @click="loadPaginationPage(link.url)" v-html="link.label" />
              </div>
            </div>
          </div>

          <div
            class="
              w-full
              rounded-xl
              overflow-x-scroll
              mb-10
              min-h-full
              bg-white
            "
          >
            <div class="table w-full">
              <div class="w-full table-row-group overflow-x-scroll">
                <!-- heading row -->
                <div class="table-row bg-black rounded-xl text-white">
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      Name
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      ID Num
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      Room NO.
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      Status
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      Paid
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      Days
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      Checked In
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      Leave Date
                    </div>
                  </div>
                  <div v-if="getUser && getUser.section == 'RECEPTION'" class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      Action
                    </div>
                  </div>
                </div>
                <!-- end of heading row -->
                <div
                  v-for="(guest, i) in displayData"
                  :key="i"
                  class="table-row bg-gray-500 text-white"
                >
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ guest.fullname }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-wrap flex flex-col">
                      <span>{{ guest.idType }} ({{ guest.idNum }})</span>
                      <span class=" text-xs text-black">{{ guest.email }}</span>
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ guest.roomNo }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap uppercase">
                      {{ guest.status }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div v-if="guest.paid == true" class="m-3 whitespace-nowrap text-green-500">
                      PAID
                    </div>
                    <div v-if="guest.paid == false" class="m-3 whitespace-nowrap text-red-500">
                      UNPAID
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ guest.rdays }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ guest.checkIn ? guest.checkIn : null | humanDayDate }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ guest.leaveDate ? guest.leaveDate : null | humanDayDate }}
                    </div>
                  </div>
                  <div v-if="getUser && getUser.section == 'RECEPTION'">
                    <div v-if="guest.status == 'active'" class="flex flex-row">
                      <button
                        class="p-2 m-3 bg-green-200 hover:bg-green-500  capitalize rounded-md whitespace-nowrap text-red-500"
                        @click="checkOut(guest)"
                      >
                        check-out
                      </button>
                      <button
                        class="p-2 m-3 whitespace-nowrap capitalize rounded-md bg-green-500"
                        @click="Print(guest)"
                      >
                        Receipt
                      </button>
                    </div>
                    <div
                      v-if="guest.status == 'checked'"
                      class="flex flex-row"
                    >
                      <button class="p-2 m-3 whitespace-nowrap capitalize rounded-md bg-blue-500" @click="Paid(guest)">
                        Paid
                      </button>
                      <button class="p-2 m-3 whitespace-nowrap capitalize rounded-md bg-red-500" @click="Close(guest)">
                        Close
                      </button>
                    </div>
                    <div v-if="guest.status == 'inactive'" class="text-center capitalize rounded-md whitespace-nowrap">
                      Closed
                    </div>
                  </div>
                </div>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AddGuest from '@/components/reception/AddGuest'
import BaseFilter from '@/components/filters/BaseFilter'
import Spinner from '@/components/filters/Spinner2'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Guests',

  components: { AddGuest, BaseFilter, Spinner },

  data () {
    return {
      routeName: 'guests'
    }
  },

  computed: {
    ...mapGetters(['addGuest', 'allGuests', 'allGuestsCount', 'getToken', 'getUser', 'getloadingGuests', 'getSearch']),

    displayData () {
      return this.allGuests.data
    }
  },

  watch: {
    getSearch: {
      handler (newVal) {
        this.loadGuestsPaginated()
      }
    }
  },

  methods: {
    ...mapActions(['toggleAddGuest', 'loadGuestsPaginated', 'loadguestsrooms']),
    ...mapMutations(['RESET_SEARCH']),

    Print (guest) {
      this.$emit('Print', guest)
    },

    setDisplayData (data) {
      this.displayData = data
    },

    loadPaginationPage (url) {
      if (!url) { return }
      this.loadGuestsPaginated(url)
    },

    reset () {
      this.RESET_SEARCH()
      this.loadGuestsPaginated()
    },

    async checkOut (guest) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = guest
      try {
        await this.$swal.fire({
          title: `ChekOut ${guest.fullname}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, CheckOut!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: (event) => {
            this.$axios
              .$post('newGuestcheckOut', bodyParameters, config)
              .then(({ result, message }) => {
                if (result == true) {
                  this.$toast.success(message)
                  this.loadGuestsPaginated()
                  this.loadguestsrooms()
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
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              `Checked Out ${guest.fullname}!`,
              'Guest is Checked Out.',
              'success'
            )
          } else if (result.dismiss == this.$swal.DismissReason.cancel) {
            // this.$swal.fire(
            //   'Cancelled',
            //   `${guest.fullname} is not Checked Out! :)`,
            //   'error'
            // )
          }
        })
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async Paid (guest) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = guest
      try {
        await this.$swal.fire({
          title: `${guest.fullname} Paid Cash?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Paid!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: (event) => {
            this.$axios
              .$post('newGuestPaid', bodyParameters, config)
              .then(({ result, message }) => {
                if (result == true) {
                  this.$toast.success(message)
                  this.loadGuestsPaginated()
                  this.loadguestsrooms()
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
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            // this.$swal.fire(
            //   `${guest.fullname} Paid!`,
            //   'Guest has Paid.',
            //   'success'
            // )
          } else if (result.dismiss == this.$swal.DismissReason.cancel) {
            // this.$swal.fire(
            //   'Cancelled',
            //   `${guest.fullname} has not Paid! :)`,
            //   'error'
            // )
          }
        })
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    async Close (guest) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = guest
      try {
        await this.$swal.fire({
          title: `Close Room Order for ${guest.fullname}?`,
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Close!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: (event) => {
            this.$axios
              .$post('newGuestClose', bodyParameters, config)
              .then(({ result, message }) => {
                if (result == true) {
                  this.$toast.success(message)
                  this.loadGuestsPaginated()
                  this.loadguestsrooms()
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
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            // this.$swal.fire(
            //   `${guest.fullname} Closed!`,
            //   'Guest was closed.',
            //   'success'
            // )
          } else if (result.dismiss == this.$swal.DismissReason.cancel) {
            // this.$swal.fire(
            //   'Cancelled',
            //   `${guest.fullname} is not Closed! :)`,
            //   'error'
            // )
          }
        })
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e)
      }
    }
  }
}
</script>

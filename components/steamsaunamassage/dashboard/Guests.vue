<template>
  <div>
    <div ref="guest" class="flex w-full flex-row ">
      <div class="w-full relative">
        <div v-if="addGuest" class="w-full h-full top-0 bottom-0 z-10 fixed bg-opacity-30 bg-gray-300">
          <AddGuest class="z-10 top-5 left-0 overflow-y-scroll right-0 shadow-2xl bg-white mx-auto fixed" @refresh="refresh" />
        </div>
        <div class="w-4/5 mx-auto">
          <div class="w-full grid grid-cols-2 space-between items-center">
            <h1 class="my-5 text-2xl font-black">
              All Guests
            </h1>

            <div class="text-right flex justify-end">
              <button class="p-3 text-white rounded-md bg-gray-500 whitespace-nowrap flex flex-row" @click="toggleAddGuest">
                Add Guest <!--font-awesome-icon class="ml-2" :icon="['fas', 'plus']" /-->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
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

          <!--pagination-->
          <div v-show="allGuests.links" class=" w-full p-2  shadow-2xl rounded mt-2  ">
            <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
              <!--eslint-disable-next-line vue/no-v-html-->
              <!--eslint-disable-next-line vue/max-attributes-per-line-->
              <span v-for="(link, n) in allGuests.links" :key="n" :class="allGuests.current_page == link.label?' text-red-600':' text-black'" class=" px-2 cursor-pointer" @click="loadPaginationPage(link.url)" v-html="link.label" />
            </div>
          </div>

          <div class="w-full rounded-xl overflow-x-scroll mb-10 min-h-full bg-white">
            <div class="table w-full">
              <div class="w-full table-row-group">
                <!-- heading row -->
                <div class="table-row bg-black rounded-xl text-white">
                  <div class="table-cell">
                    <div class="m-3">
                      Section
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      Name
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      Service
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      Fee
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      Status
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      Checked In
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      Action
                    </div>
                  </div>
                </div>
                <!-- end of heading row -->
                <div v-for="(guest, i) in allGuests.data" :key="i" class="table-row bg-gray-500 text-white">
                  <div class="table-cell">
                    <div class="m-3">
                      {{ guest.section }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      {{ guest.fullname }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ guest.service }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      {{ guest.fee }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div v-if="guest.paid == true" class="m-3">
                      PAID
                    </div>
                    <div v-if="guest.paid == false" class="m-3 text-red-500">
                      UNPAID
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      {{ guest.created_at | humanDayDate }}
                    </div>
                  </div>
                  <div>
                    <div v-if="guest.paid == true" class=" flex flex-row">
                      <button class="p-2 m-3 bg-green-500 rounded-md" @click="Print(guest)">
                        Receipt
                      </button>
                    </div>
                    <div v-if="guest.paid == false" class=" flex flex-row">
                      <button class="p-2 m-3 bg-blue-500 rounded-md" @click="Paid(guest)">
                        Paid
                      </button>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'
import AddGuest from '@/components/steamsaunamassage/AddGuest'
import BaseFilter from '@/components/filters/BaseFilter'
import Spinner from '@/components/filters/Spinner2'
export default {
  components: { AddGuest, BaseFilter, Spinner },

  data () {
    return {
      routeName: 'guests'
    }
  },

  computed: {
    ...mapGetters(['addGuest', 'allGuests', 'getToken', 'getloadingGuests', 'getSearch'])
  },

  watch: {
    getSearch: {
      handler (newVal) {
        this.loadSteamSaunaMassagePaginated()
      }
    }
  },

  methods: {
    ...mapActions(['toggleAddGuest', 'loadSteamSaunaMassagePaginated']),
    ...mapMutations(['RESET_SEARCH']),

    refresh () { this.$emit('refresh') },

    Print (guest) {
      this.$emit('Print', guest)
    },

    async Paid (guest) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = guest
      try {
        await this.$swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Paid!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.$axios.$post('guestSaunaMasagePaid', bodyParameters, config)
              .then(({ result, message }) => {
                // eslint-disable-next-line eqeqeq
                if (result == true) {
                  this.$toast.success(message)
                  this.refresh()
                }
              })
              .catch((errors) => {
                this.$swal.showValidationMessage(`Request failed: ${errors.response}`)
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })

            this.$swal.fire(
              'Paid!',
              'The guest Paid.',
              'success'
            )
          }
        })
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e)
      }
    },

    reset () {
      this.RESET_SEARCH()
      this.refresh()
    },

    loadPaginationPage (url) {
      if (this.getloadingGuests) { return }
      if (!url) { return }
      this.loadSteamSaunaMassagePaginated(url)
    }

  }
}
</script>

<style scoped>

</style>

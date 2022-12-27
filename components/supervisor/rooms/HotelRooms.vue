<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <div class="w-full">
      <div class="w-full h-10 m-8">
        <h1 class="font-black">
          All Rooms
        </h1>
      </div>
      <div class="w-4/5 mx-auto min">
        <div class="mb-5 w-full rounded-xl px-32 py-10 bg-gray-300">
          <div>
            <h1 class=" uppercase text-gray-500 font-black">
              add room
            </h1>
            <div>
              <form @submit.prevent="newRoom">
                <div class=" flex flex-row">
                  <div class="p-2 text-sm w-1/2">
                    <label class="font-bold text-yellow-800 text-sm" for="RType">Room Type</label>
                    <select id="RType" v-model="form.type" name="" class="py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" required>
                      <option value="SINGLE">
                        SINGLE
                      </option>
                      <option value="DOUBLE">
                        DOUBLE
                      </option>
                      <option value="TWIN">
                        TWIN
                      </option>
                      <option value="STANDARD DBL">
                        STANDARD DBL
                      </option>
                    </select>
                  </div>

                  <div class="p-2 text-sm w-1/2">
                    <label class="font-bold text-yellow-800 text-sm" for="IDNumber">Room Number</label>
                    <input id="IDNumber" v-model="form.roomNo" type="text" class="py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
                  </div>
                </div>

                <div class=" flex flex-row">
                  <div class="p-2 text-sm w-1/2">
                    <label class="font-bold text-yellow-800 text-sm" for="NBeds">Number of Beds</label>
                    <input
                      id="NBeds"
                      v-model="form.beds"
                      type="number"
                      min="1"
                      max="4"
                      class="py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300"
                      required
                    >
                  </div>

                  <div class="p-2 text-sm w-1/2">
                    <label class="font-bold text-yellow-800 text-sm" for="Fees">Fees</label>
                    <input
                      id="Fees"
                      v-model="form.fee"
                      type="number"
                      min="10000"
                      class="py-3 px-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300"
                      required
                    >
                  </div>
                </div>
                <div class="text-sm p-2" />

                <div class="my-3">
                  <button class="p-3 bg-green-500 text-white" type="submit">
                    Submit
                  </button>
                  <button class="p-3 bg-red-500 text-white" @click.prevent="toggleAddGuest">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mb-5 w-full rounded-xl px-32 py-10  bg-gray-300">
          <!--pagination-->
          <div v-show="roomsPaginated.links" class=" w-full p-2  shadow-2xl rounded mt-2  ">
            <div class=" m-2 flex flex-row flex-nowrap justify-center items-center">
              <!--eslint-disable-next-line vue/no-v-html-->
              <!--eslint-disable-next-line vue/max-attributes-per-line-->
              <span v-for="(link, n) in roomsPaginated.links" :key="n" :class="roomsPaginated.current_page == link.label ? ' text-red-600' : ' text-black'" class=" px-2 cursor-pointer" @click="loadPaginationPage(link.url)" v-html="link.label" />
            </div>
          </div>
          <!------>

          <div class="w-full rounded-xl overflow-x-scroll mb-1 min-h-full bg-white">
            <div class="table w-full">
              <div class="w-full table-row-group">
                <!-- heading row -->
                <div class="table-row bg-black rounded-xl text-white">
                  <div class="table-cell">
                    <div class="m-3">
                      ID
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      TYPE
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      Room NO.
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      Status
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      No. BEDS
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      FEES
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3" />
                  </div>
                </div>
                <!-- end of heading row -->
                <div v-for="(room, i) in roomsPaginated.data" :key="i" class="table-row bg-gray-500 text-white">
                  <div class="table-cell">
                    <div class="m-3">
                      {{ room.id }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ room.type }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      {{ room.roomNo }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 uppercase">
                      {{ room.occupied == true ? 'OCCUPIED' : 'EMPTY' }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 uppercase">
                      {{ room.beds }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 uppercase">
                      UGX: {{ room.fee | number_format }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mt-5 h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      @click="delRoom(room.id)"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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
import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {
      routeName: 'rooms',
      form: {
        type: '',
        roomNo: '',
        beds: '',
        fee: 0
      }
    }
  },

  computed: {
    ...mapGetters(['roomsPaginated', 'getToken'])
  },

  methods: {
    ...mapActions(['loadguestsroomsPaginated']),

    resetForm () {
      this.form.type = ''
      this.form.roomNo = ''
      this.form.beds = ''
      this.form.fee = ''
    },

    loadPaginationPage (url) {
      if (!url) { return }
      this.loadguestsroomsPaginated(url)
    },

    async newRoom () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = this.form
      try {
        await this.$axios.$post('newRoom', bodyParameters, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.$toast.success(message)
              this.resetForm()
              this.$emit('refresh')
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
        console.log(e)
      }
    },

    async delRoom (id) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      try {
        await this.$axios.$post('delRoom', { id }, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.$toast.success(message)
              this.$emit('refresh')
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
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>

</style>

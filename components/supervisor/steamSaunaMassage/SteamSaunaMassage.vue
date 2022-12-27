<template>
  <div>
    <div class="w-full">
      <div class="w-4/5 mx-auto min">
        <div class="mb-5 w-full rounded-xl px-32 py-10 bg-gray-300">
          <div>
            <h1 class="uppercase text-gray-500 font-black">
              add massage package
            </h1>
            <div>
              <form @submit.prevent="newMassagePackage">
                <div class="flex flex-row">
                  <div class="p-2 text-sm w-1/2">
                    <label
                      class="font-bold text-yellow-800 text-sm"
                      for="NBeds"
                    >massage Package</label>
                    <input
                      id="NBeds"
                      v-model="massage.name"
                      type="text"
                      class="
                        py-3
                        px-3
                        w-full
                        border-b-2 border-gray-200
                        focus:outline-none
                        hover:border-yellow-300
                      "
                      required
                    >
                  </div>

                  <div class="p-2 text-sm w-1/2">
                    <label
                      class="font-bold text-yellow-800 text-sm"
                      for="Fees"
                    >Fees</label>
                    <input
                      id="Fees"
                      v-model="massage.fee"
                      type="number"
                      min="10000"
                      class="
                        py-3
                        px-3
                        w-full
                        border-b-2 border-gray-200
                        focus:outline-none
                        hover:border-yellow-300
                      "
                      required
                    >
                  </div>

                  <div class="p-2 text-sm w-1/2">
                    <label
                      class="font-bold text-yellow-800 text-sm"
                      for="Fees"
                    >Period (Hours)</label>
                    <input
                      id="Fees"
                      v-model="massage.time"
                      type="number"
                      min="1"
                      max="5"
                      class="
                        py-3
                        px-3
                        w-full
                        border-b-2 border-gray-200
                        focus:outline-none
                        hover:border-yellow-300
                      "
                      required
                    >
                  </div>
                </div>
                <div class="text-sm p-2" />

                <div class="my-3">
                  <button class="p-3 bg-green-500 text-white" type="submit">
                    Submit
                  </button>
                  <button
                    class="p-3 bg-red-500 text-white"
                    @click.prevent="Clear"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mb-5 w-full rounded-xl px-32 py-10 bg-green-300">
          <div
            class="w-full rounded-xl overflow-x-scroll mb-1 min-h-full bg-white"
          >
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
                      MASSAGE PACKAGE
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      FEE.
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      PERIOD
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3" />
                  </div>
                </div>
                <!-- end of heading row -->
                <div
                  v-for="(room, i) in allMassage"
                  :key="i"
                  class="table-row bg-gray-500 text-white"
                >
                  <div class="table-cell">
                    <div class="m-3">
                      {{ room.id }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ room.name }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      {{ room.fee }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      {{ room.time }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="
                        mt-5
                        h-6
                        w-6
                        text-red-500
                        hover:text-red-700
                        cursor-pointer
                      "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      @click="delMassage(room.id)"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-5 w-full rounded-xl px-32 py-10 bg-gray-300">
          <div>
            <h1 class="uppercase text-gray-500 font-black">
              add steam sauna package
            </h1>
            <div>
              <form @submit.prevent="newSteamSaunaPackage">
                <div class="flex flex-row">
                  <div class="p-2 text-sm w-1/2">
                    <label
                      class="font-bold text-yellow-800 text-sm"
                      for="NBeds"
                    >steam sauna Package</label>
                    <input
                      id="NBeds"
                      v-model="sauna.name"
                      type="text"
                      class="
                        py-3
                        px-3
                        w-full
                        border-b-2 border-gray-200
                        focus:outline-none
                        hover:border-yellow-300
                      "
                      required
                    >
                  </div>

                  <div class="p-2 text-sm w-1/2">
                    <label
                      class="font-bold text-yellow-800 text-sm"
                      for="Fees"
                    >Fees</label>
                    <input
                      id="Fees"
                      v-model="sauna.fee"
                      type="number"
                      min="10000"
                      class="
                        py-3
                        px-3
                        w-full
                        border-b-2 border-gray-200
                        focus:outline-none
                        hover:border-yellow-300
                      "
                      required
                    >
                  </div>
                </div>
                <div class="text-sm p-2" />

                <div class="my-3">
                  <button class="p-3 bg-green-500 text-white" type="submit">
                    Submit
                  </button>
                  <button
                    class="p-3 bg-red-500 text-white"
                    @click.prevent="Clear"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="mb-5 w-full rounded-xl px-32 py-10 bg-green-300">
          <div
            class="w-full rounded-xl overflow-x-scroll mb-1 min-h-full bg-white"
          >
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
                      STEAM SAUNA PACKAGE
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      FEE.
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3" />
                  </div>
                </div>
                <!-- end of heading row -->
                <div
                  v-for="(room, i) in allsteamsauna"
                  :key="i"
                  class="table-row bg-gray-500 text-white"
                >
                  <div class="table-cell">
                    <div class="m-3">
                      {{ room.id }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3 whitespace-nowrap">
                      {{ room.name }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <div class="m-3">
                      {{ room.fee }}
                    </div>
                  </div>
                  <div class="table-cell">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="
                        mt-5
                        h-6
                        w-6
                        text-red-500
                        hover:text-red-700
                        cursor-pointer
                      "
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                      @click="delSauna(room.id)"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
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
import { mapGetters } from 'vuex'
export default {
  props: ['token'],

  data () {
    return {
      routeName: 'rooms',
      massage: {
        name: '',
        fee: 0,
        time: 0
      },
      sauna: {
        name: '',
        fee: 0
      }
    }
  },

  computed: {
    ...mapGetters(['allMassage', 'allsteamsauna'])
  },

  methods: {
    Clear () {
      this.massage.name = ''
      this.massage.fee = 0
      this.massage.time = 0

      this.sauna.name = ''
      this.sauna.fee = 0
    },

    async newMassagePackage () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = this.massage
      try {
        await this.$axios
          .$post('newMassagePackage', bodyParameters, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.Clear()
              this.$toast.success(message)
              this.$emit('refresh')
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
        console.log(e)
      }
    },

    async newSteamSaunaPackage () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      const bodyParameters = this.sauna
      try {
        await this.$axios
          .$post('newSteamSaunaPackage', bodyParameters, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.Clear()
              this.$toast.success(message)
              this.$emit('refresh')
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
        console.log(e)
      }
    },

    async delMassage (id) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      try {
        await this.$axios
          .$post('delMassage', { id }, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.$toast.success(message)
              this.$emit('refresh')
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
        console.log(e)
      }
    },

    async delSauna (id) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.token }
      }
      try {
        await this.$axios
          .$post('delSauna', { id }, config)
          .then(({ result, message }) => {
            if (result == true) {
              this.$toast.success(message)
              this.$emit('refresh')
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
        console.log(e)
      }
    }
  }
}
</script>

<style scoped>
</style>


<template>
  <div class="p-10 shadow-xl shadow-yellow-300 w-6/12 sm:w-1/2 rounded-xl h-auto">
    <div class="m-2">
      <h1 class="font-black text-yellow-800">
        New Guest
      </h1>
    </div>

    <div>
      <form @submit.prevent="newGuest">
        <div class="p-2 flex flex-row">
          <div class="p-2 text-sm w-full">
            <label class="font-bold text-yellow-800 text-sm" for="FullName">FullName</label>
            <input id="FullName" v-model="form.fullname" type="text" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300" required>
          </div>
        </div>

        <div class="p-2 flex flex-row">
          <div class="flex flex-col justify-center items-center w-1/2">
            <SwitchContainer :loading-perm="false" :left="left" leftmsg="Steam Sauna" rigthmsg="Massage" @handleToggleActive="handleToggleActive" />
          </div>

          <div v-show="left" class="p-2 mb-3 text-sm w-1/2">
            <label for="rooms" class="text-sm text-yellow-800 font-bold">Select SteamSauna Service</label>
            <select id="rooms" v-model="SteamSauna" name="" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
              <option v-for="(val, i) in allsteamsauna" :key="i" :value="val">
                {{ val.name }}
              </option>
            </select>
          </div>

          <div v-show="!left" class="p-2 mb-3 text-sm w-1/2">
            <label for="rooms" class="text-sm text-yellow-800 font-bold">Select Massage Service</label>
            <select id="rooms" v-model="Massage" name="" class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300">
              <option v-for="(val, i) in allMassage" :key="i" :value="val">
                {{ val.name }} ({{ val.time }} Mins)
              </option>
            </select>
          </div>
        </div>

        <div class="p-2 flex flex-row">
          <div class="p-2 text-sm w-1/3">
            <label class="font-bold text-yellow-800 text-sm" for="fee">Customers</label>
            <input
              v-model="PCount"
              type="number"
              min="1"
              max="10"
              class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300"
            >
          </div>
          <div class="p-2 text-sm w-1/3">
            <label class="font-bold text-yellow-800 text-sm" for="fee">Fee</label>
            <div
              class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300"
            >
              {{ form.fee }}
            </div>
          </div>
          <div class="p-2 text-sm w-1/3">
            <label class="font-bold text-yellow-800 text-sm" for="fee">Service</label>
            <div
              class="py-3 pr-3 w-full border-b-2 border-gray-200 focus:outline-none hover:border-yellow-300 mb-0"
            >
              {{ form.service }}
            </div>
          </div>
        </div>

        <div class="text-sm p-2" />

        <div class="my-3">
          <button :disabled="loading" class="p-3 text-white rounded-md" :class="{'bg-gray-500':loading, 'bg-green-500':!loading}" type="submit">
            Submit
          </button>
          <button class="p-3 bg-red-500 text-white rounded-md" @click.prevent="toggleAddGuest">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SwitchContainer from '@/components/common/SwitchContainerCustom'
export default {
  name: 'AddGuest',

  components: { SwitchContainer },

  data () {
    return {
      left: true,
      PCount: 1,
      form: {
        section: '',
        fullname: '',
        service: '',
        fee: '0',
        time: '1'
      },
      SteamSauna: [],
      Massage: [],
      loading: false
    }
  },

  computed: {
    ...mapGetters(['allsteamsauna', 'allMassage', 'getToken']),

    formRoom () { return this.form.Room }
  },

  watch: {
    PCount: {
      immediate: true,
      handler (newVal) {
        if (Object.keys(this.SteamSauna).length > 0) {
          this.form.fee = parseInt(this.SteamSauna.fee) * parseInt(newVal)
        }
        if (Object.keys(this.Massage).length > 0) {
          this.form.fee = parseInt(this.Massage.fee) * parseInt(newVal)
        }
      }
    },
    SteamSauna: {
      immediate: true,
      handler (newVal) {
        this.form.service = newVal.name
        this.form.fee = parseInt(newVal.fee) * parseInt(this.PCount)
      }
    },
    Massage: {
      immediate: true,
      handler (newVal) {
        this.form.service = newVal.name
        this.form.fee = parseInt(newVal.fee) * parseInt(this.PCount)
        this.form.time = newVal.time
      }
    },
    left: {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          this.form.section = 'steam-sauna'
        } else {
          this.form.section = 'massage'
        }
        this.form.fullname = ''
        this.form.service = ''
        this.form.fee = '0'
        this.form.time = '1'
        this.PCount = 1
      }
    }
  },

  methods: {

    handleToggleActive () {
      this.left = !this.left
    },

    async newGuest () {
      this.loading = true
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = this.form
      try {
        await this.$swal.fire({
          title: 'Adding New Guest?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, Add!',
          cancelButtonText: 'No, cancel!',
          reverseButtons: true,
          showLoaderOnConfirm: true,
          preConfirm: (event) => {
            this.$axios.$post('newGuestSteamSaunMassage', bodyParameters, config)
              .then(({ result, message }) => {
                if (result == true) {
                  this.$toast.success(message)
                  this.$emit('refresh')
                  this.toggleAddGuest()
                }
              })
              .catch((errors) => {
                this.$swal.showValidationMessage(`Request failed: ${errors}`)
                if (errors.response.data.message) {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.data.message))
                } else {
                  this.$toast.error(this.$ObjTemplate.trim(errors.response.request.statusText))
                }
              })
          },
          allowOutsideClick: () => !this.$swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire(
              'Saved!',
              'Guest is added.',
              'success'
            )
          } else if (result.dismiss == this.$swal.DismissReason.cancel) {
            this.$swal.fire(
              'Cancelled',
              'Guest is not added! :)',
              'error'
            )
          }
        })
      } catch (e) {
      // eslint-disable-next-line no-console
        console.log(e)
      }
      this.loading = false
    },

    ...mapActions(['toggleAddGuest'])
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <div class=" my-4">
      <div class=" w-full bg-gray-50 py-2">
        <span class=" uppercase text-gray-500 font-extrabold">add kitchen menu</span>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <div class=" w-full">
        <div class="bg-gray-50  flex items-center justify-center px-2">
          <div class=" w-full max-w-lg">
            <div class="m-8 relative space-y-4">
              <!--add to major list item-->
              <span class=" capitalize text-gray-500">major category</span>
              <AddCategory
                :uppercase="true"
                :loading="loading"
                @firedEvent="firedEventMajor"
                @search="filterSearchMajor"
              />
              <!--list Major-->
              <div v-if="menuMajor.length > 0">
                <MajorCategory
                  v-for="(menu, n) in menuMajorPaginated"
                  :key="n"
                  :menu="menu"
                  :loading="loading"
                  :menuid="Menuid"
                  @deleteMenu="deleteMenuMajor"
                  @selectMenu="selectMinorMenu"
                />
              </div>
              <div v-if="menuMajor.length > 0" class="">
                <Pagination
                  :per-page="parseInt(4)"
                  :itemlist="getmenuMajorFiltered"
                  resource="Major Menu"
                  :expectcurrentpage="CurrentPage"
                  @display-data="setDisplayDataMenuMajor"
                  @selectedPage="setSelectedPage"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class=" w-full">
        <div class="bg-gray-50 flex items-center justify-center px-2">
          <div class=" w-full max-w-lg">
            <div class="m-8 relative space-y-4">
              <!--add to minor list item-->
              <span class=" capitalize text-gray-500">minor category</span>
              <AddCategory
                :uppercase="false"
                :search.sync="search"
                @firedEvent="firedEventMinor"
                @search="filterSearchMinor"
              >
                <div v-show="search" class=" w-full p-2 border rounded">
                  <div class="mb-2">
                    <label class="block text-gray-700 text-sm font-bold mb-2 text-left" for="description">
                      Description
                    </label>
                    <input
                      id="description"
                      v-model="Menudescription"
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
                      v-model="Menuprice"
                      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      type="number"
                      placeholder="0.00"
                      min="0"
                    >
                  </div>
                </div>
              </AddCategory>
              <!--list item-->
              <MinorCategory
                v-for="(menu, n) in menuMinorPaginated"
                :key="n"
                :menu="menu"
                :loading="loading"
                @deleteMenu="deleteMenuMinor"
              />
              <div v-if="menuMinorSelected.length > 0" class="">
                <Pagination
                  :per-page="parseInt(3)"
                  :itemlist="getmenuMinorSelected"
                  resource="Minor Menu"
                  @display-data="setDisplayDataMenuMinor"
                />
              </div>
              <span v-else class=" m-10 p-10">No menu Selected!</span>
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
import MajorCategory from '@/components/common/MajorCategory'
import MinorCategory from '@/components/common/MinorCategory'
import AddCategory from '@/components/common/AddCategory'
export default {
  components: {
    MajorCategory,
    AddCategory,
    MinorCategory
  },

  props: ['getToken'],

  data () {
    return {
      search: null,
      Menudescription: null,
      Menuprice: 0,
      loading: false,
      Menuid: 0,
      menuMinorSelected: [],
      menuMajorPaginated: [],
      menuMinorPaginated: [],
      CurrentPage: 1,
      filterMinor: null,
      getmenuMajorFiltered: []
    }
  },

  computed: {
    ...mapGetters(['getToken']),

    getmenuMinorSelected () {
      // return this.menuMinorSelected
      return _.filter(this.menuMinorSelected, (o) => {
        return o.category.includes(this.filterMinor)
      })
    },
    getPaginatedMenuMinor () {
      return this.menuMinorPaginated
    },
    menuMajor () {
      return this.$store.state.menuStore.menuMajor
    }
  },

  mounted () { this.fetch() },

  methods: {
    firedEventMajor (val) {
      this.addMenu(val, 'Major')
    },

    filterSearchMajor (val) { // from input element
      this.getmenuMajorFiltered = _.filter(this.menuMajor, (o) => {
        return o.category.toLowerCase().trim().includes(val.toLowerCase().trim())
      })
    },

    filterSearchMinor (val) { // from input element
      this.filterMinor = val
    },

    firedEventMinor (val) {
      if (!this.Menuid || !(this.Menuid > 0) || !(this.Menuprice > 100)) {
        this.$toast.error('Major Menu Not Selected or Required Fields are not provided')
        return
      }
      this.addMenu(val, 'Minor', this.Menuid, this.Menudescription, this.Menuprice)
    },

    deleteMenuMajor (val) {
      this.deleteMenu(val, 'Major')
    },

    deleteMenuMinor (val) {
      this.deleteMenu(val, 'Minor')
    },

    setDisplayDataMenuMinor (data) {
      this.menuMinorPaginated = data
    },

    setDisplayDataMenuMajor (data) {
      this.menuMajorPaginated = data
    },

    setSelectedPage (page) {
      this.CurrentPage = page
    },

    async fetch () {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        key: ''
      }
      try {
        await this.$axios.$post('getMenuKitchen', bodyParameters, config)
          .then(({ result, menuKitchen }) => {
            if (result) {
              const menuMajor = Object.keys(menuKitchen.Major).length > 0 ? menuKitchen.Major : []
              const menuMinor = Object.keys(menuKitchen.Minor).length > 0 ? menuKitchen.Minor : []
              this.$store.dispatch('menuStore/setMenu', { menuMajor, menuMinor })
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

    selectMinorMenu (Menuid) {
      const temp = _.filter(this.$store.state.menuStore.menuMinor, function (o) {
        return (parseInt(o.menus_id, 10) == parseInt(Menuid, 10))
      })
      this.menuMinorSelected = temp.length > 0 ? temp : []
      this.Menuid = Menuid
      this.menuMinorPaginated = []
    },

    async deleteMenu (Menuid, section) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        id: Menuid,
        type: section
      }
      this.loading = true
      try {
        await this.$axios.$post('delMenu', bodyParameters, config)
          .then(({ result, category }) => {
            if (result) {
              this.menuMinorPaginated = []
              this.menuMinorSelected = []
              this.search = null
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
    },

    async addMenu (menu, section, Menuid = 0, Menudescription = '', Menuprice = 100) {
      const config = {
        headers: { 'X-CSRF-TOKEN': this.getToken }
      }
      const bodyParameters = {
        category: menu,
        type: section,
        id: Menuid,
        description: Menudescription,
        price: Menuprice
      }
      this.loading = true
      try {
        await this.$axios.$post('addMenu', bodyParameters, config)
          .then(({ result, category }) => {
            if (result) {
              this.menuMinorPaginated = []
              this.menuMinorSelected = []
              this.search = null
              this.Menudescription = null
              this.Menuprice = null
              this.$toast.success('Added ' + category)
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
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

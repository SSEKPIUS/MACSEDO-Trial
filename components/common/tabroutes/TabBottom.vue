<template>
  <div class=" flex flex-col justify-center items-center  w-full">
    <ul class="flex justify-center items-center my-2">
      <div v-for="(tab, index) in tabs" :key="index">
        <nuxt-link
          class="cursor-pointer whitespace-nowrap py-2 px-4 rounded transition shadow-2xl"
          :class="tab.active ? 'bg-green-500 text-white' : ' text-gray-500'"
          :to="tab.path"
        >
          {{ tab.name }}
        </nuxt-link>
      </div>
    </ul>

    <div class="flex gap-4 justify-center border-t p-4 mb-4">
      <nuxt-link
        v-show="activeTab>0"
        class="py-2 px-4 border rounded-md border-blue-600 text-blue-600 cursor-pointer uppercase text-sm font-bold hover:bg-blue-500 hover:text-white hover:shadow"
        :to="activeTab>0?tabs[activeTab-1].path:''"
      >
        Back
      </nuxt-link>
      <nuxt-link
        v-show="activeTab<tabs.length-1"
        class="py-2 px-4 border rounded-md border-blue-600 text-blue-600 cursor-pointer uppercase text-sm font-bold hover:bg-blue-500 hover:text-white hover:shadow"
        :to="activeTab<tabs.length-1?tabs[activeTab+1].path:''"
      >
        Next
      </nuxt-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
export default {
  name: 'TabBottom',

  props: ['tabs'],

  computed: {
    activeTab () {
      return this.findactiveTab()
    }
  },

  methods: {
    findactiveTab () {
      let position = 0
      this.tabs.forEach((element, index, self) => {
        if (element.active) {
          position = index
        }
      })
      return position
    }
  }
}
</script>

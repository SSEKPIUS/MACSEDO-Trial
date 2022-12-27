<template>
  <div
    class="p-5 border-2  rounded-lg flex items-center justify-between space-x-8"
    :class="menuid == menu.menu_bars_id ? 'bg-gray-500' : 'bg-white'"
  >
    <div class="flex-1 flex justify-between items-center">
      <div class="w-48 bg-gray-300 uppercase rounded">
        {{ menu.category }}
      </div>
      <div class="w-24 rounded-lg flex flex-row bg-purple-300" @click="selectMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 left-0 cursor-pointer" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable vue/require-prop-types */
export default {
  props: ['menu', 'menuid'],

  methods: {
    selectMenu () { this.$emit('selectMenu', this.menu) }
  }
}
</script>

<style lang="scss" scoped>

</style>

<template>
  <div class=" flex justify-center items-center  w-full">
    <ul class="flex justify-center items-center my-2">
      <div v-for="(tab, index) in tabs" :key="index" class="menu">
        <nuxt-link
          class="cursor-pointer whitespace-nowrap py-2 px-4 text-gray-500 border-b-8"
          :class="tab.active ? 'text-green-500 border-green-500' : ''"
          :to="tab.path"
        >
          {{ tab.name }}
        </nuxt-link>
        <span v-if="tab.mark" class=" absolute text-white bg-red-500 p-1 -mt-5 -ml-8 px-2 float rounded-full">{{ tab.mark }}</span>
      </div>
    </ul>
  </div>
</template>

<script>
/* eslint-disable vue/require-prop-types */
export default {
  name: 'TabTop',

  props: ['tabs']
}
</script>

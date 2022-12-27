<template>
  <div class=" flex flex-row items-center justify-center w-full m-2">
    <img
      class=" h-20 w-20 m-2 border border-gray-400 rounded-full"
      :src="getUser?getUser.image:pf"
      alt="user photo"
    >
    <div class=" flex flex-col  m-3">
      <span class="text-green-600 text-2xl md:text-xl font-bold uppercase">
        {{ getUser ? getUser.name : '' }}
      </span>
      <span class=" text-xl md:text-sm font-bold uppercase">
        {{ getUser ? getUser.section : '' }}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Uimage from '@/assets/f.png'
export default {
  data () {
    return {
      pf: Uimage
    }
  },

  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>

<style lang="scss" scoped>

</style>

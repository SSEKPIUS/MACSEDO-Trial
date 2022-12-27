<template>
  <div class="flex flex-row items-center justify-center w-full m-2">
    <span class="main">
      <h1>MACSEDO QUICK SERVICE</h1>
    </span>
    <span class=" p-4 md:hidden">
      <DigitalClock /></span>
  </div>
</template>

<script>
import DigitalClock from '@/components/user/DigitalClock'
export default {
  components: {
    DigitalClock
  }
}
</script>

<style scoped>
.main h1 {
    margin: 1em 0 0.5em 0;
    color: #343434;
    font-weight: normal;
    font-family: 'Ultra', sans-serif;
    font-size: 26px;
    line-height: 40px;
    text-transform: uppercase;
    text-shadow: 0 2px white, 0 3px #777;
}

@media (max-width: 767px) {
    .main h1 {
       /* margin: .2em 0 0.2em 0;
        font-size: 18px;
        line-height: 10px;
        text-transform: uppercase;
        text-shadow: 0 2px white, 0 3px #777;*/
    }

}
</style>

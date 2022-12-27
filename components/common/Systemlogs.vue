<!--  eslint-disable vue/multi-word-component-names -->
<template>
  <div class=" border  w-full p-2 h-full">
    <div class=" w-full p-2 border  shadow-2xl">
      <ContentSystemLogs />
    </div>
  </div>
</template>

<script>
import ContentSystemLogs from '@/components/common/ContentSystemLogs'
export default {
  components: {
    ContentSystemLogs
  }
}
</script>

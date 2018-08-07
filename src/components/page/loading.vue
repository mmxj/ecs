<style lang='less' scoped>

</style>
<template>
  <!-- <video src="/static/cloud.mp4" loop='loop' autoplay="autoplay" width="100%" height="100%"></video> -->

  <div class="el_mainContent" ref='indexContent' style='width:100%;height:99%;overflow:hidden' v-loading='loadingTable'>
    <!-- <video src="/static/cloud.mp4" loop='loop' autoplay="autoplay" height="100%"></video> -->
  </div>
</template>
<script>
// console.log(window.devicePixelRatio)
export default {
  data() {
    return {
      loadingTable: true
    }
  },
  computed: {},
  methods: {
  },
  mounted() {
  },
  destroyed() {
  }
}

</script>

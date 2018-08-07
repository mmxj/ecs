<template>
  <div id="ecos">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  watch: {
    $route() {
      let vm = this
      let fullPath = vm.$route.fullPath
      let pathArr = fullPath.split('/')
      let path = ''
      for (let index in pathArr) {
        if (pathArr[index] == 'ecos') {
          path = pathArr[Number(index) + 1].split('?')
          path = path[0]
          vm.setActiveMenu(path)
          break
        }
      }
    }
  },
  methods: {
    ...mapActions({
      setActiveMenu: 'set_activeMenu',
    }),
  }
}

</script>

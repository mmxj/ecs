<template>
  <div style="height:100%">
    <warning v-if='isShow' :propsData="projectData"></warning>
  </div>
</template>
<script>
import warning from './common/warning';
export default {
  data: function() {
    return {
      projectData: {
        ProjectId: '',
        fromMap: false
      },
      isShow: false
    }
  },
  components: {
    warning
  },
  methods: {
    init() {
      let vm = this
      vm.projectData.ProjectId = this.$route.query.ProjectId || ''
      vm.projectData.fromMap = this.$route.query.fromMap || false
      vm.isShow = true
    }
  },
  mounted() {
    let vm = this
    vm.init()
  },
  watch: {
    //检测$route是因为要避免用户如果先从首页的预警告警统计框进入,再点击左侧菜单导致无反应的问题
    $route() {
      let vm = this
      vm.isShow = false
      vm.$nextTick(function() {
        vm.init()
      })

    }
  }
}

</script>
<style>


</style>

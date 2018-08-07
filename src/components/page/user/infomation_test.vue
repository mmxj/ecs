<style scoped="scoped">
.el_mainContent{
	background: #ccc;
	width:100%;
	height:99%
}
.leftmenu{
	width: 200px;
	height: 100%;
	position: relative;
	background: yellow;
}
.innertest{
	width: 100%;
	position: absolute;
	top: 50px;
	bottom: 100px;
	background: #abc;
	overflow-y: auto;
}
#index{
  height: 500px;
  width: 500px;
  border: 1px solid #000;
}
</style>
<template>
  <div class="el_mainContent">
    <div class="leftmenu">
    	<div id="index"></div>
      <!--<div class="innertest">
        <div v-for='item in 5'>123</div>
        <div>123</div>
      </div>-->      
    </div>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
// require('echarts/lib/chart/scatter')
// require('echarts/lib/chart/effectScatter')
// require('echarts/lib/chart/custom')
// require('echarts/extension/bmap/bmap')
import buildings from 'assets/js/chartOption/buildings.json'
export default {
  data() {
    return {

    }
  },
  methods: {
    initMap() {
      let vm = this
      let el = document.querySelector('#building')
      let myChart = echarts.init(el)
      echarts.registerMap('zhongguo', geoJson);
      myChart.setOption(mapOption);
      myChart.resize()
      myChart.on('click', function(item) {
        vm.uPDATE_SHOWWHICHTAB({ showWhichTab: 4 })
        let routerPath = 'project_list'
        routerPath = (vm.EntitySort == 2 ? routerPath : 'wb_items_manage')
        FUNC.tntool.setTnAuth(routerPath)
        vm.$router.push({
          name: 'sm_project_detail',
          params: {
            ProjectId: item.data.value[8],
            isFromMap: true
          }
        })

      });
    },
  },
  mounted() {
    echarts.registerMap('zhongguo', geoJson);
    console.log(buildings)
  },
  watch: {}
}

</script>

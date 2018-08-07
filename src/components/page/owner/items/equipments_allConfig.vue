<style scoped lang='less'>
.tempp {
  text-align: left;
  height: 34px;
  line-height: 34px;
  & span:first-child {
    color: #8492A6
  }
}

</style>
<template>
  <div>
    <div id="right_equip_details">
      <div class="dataTables_wrapper no-footer" v-if="loading">
        <div id="example1_processing" class="dataTables_processing">数据加载中...</div>
      </div>
      <ul class="list-unstyled" v-else>
        <!-- {{equipmentDetails}} -->
        <li v-show="!noData" style="margin-left: 30px; margin-top: 15px;width: 300px;" class="text-center row form-group">
          <p v-for="item in equipmentDetails" class='tempp'>
            <span>{{item.DisplayName}}:</span>
            <span>{{item.DataValue}}</span>
          </p>
        </li>
        <div class="noDataBg" v-show="noData">
          <div>
            <img class="img-responsive" src="../../../../../static/css/images/noEquipDetialBg.png" />
            <h3>暂无数据</h3>
          </div>
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
import commonFn from '../../../../assets/js/common/commonFunc'
let projectContr = commonFn.projectContr;
export default {
  props: ['propsData'],
  data: function() {
    return {
      equipmentDetails: [],
      noData: true,
      loading: true,
    }
  },
  computed: {},
  watch: {
    propsData: function() {
      let vm = this
      vm.loading = true
      let data = vm.propsData
      if (!data||data.length==0) {
        vm.noData = true;
      } else {
        vm.noData = false;
        vm.equipmentDetails = data[0].Details
        // console.log(vm.equipmentDetails)
      }
      setTimeout(function() {
        vm.loading = false
      }, 500)
    }
  },
  mounted: function() {},
  methods: {
  }



}

</script>
<style scoped="scoped">
.list-unstyled {
  max-height: 545px;
  overflow-y: auto;
  overflow-x: hidden;
}

.noDataBg {
  height: 545px;
  align-items: center;
  display: flex;
  justify-content: center;
}

.noDataBg img {
  margin: 0 auto;
  margin-top: 5vh;
}

.noDataBg h3 {
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
  font-size: 16px;
  font-weight: bolder;
  color: #1abc9c;
}

</style>

<template>
  <!--ele_statistics-->
  <div class="commonDialog">
    <el-dialog :title="otherParams.currEleSettingName" :visible.sync="otherParams.dialogVisible" width="500px" :before-close="handleClose">
      <statistic-setting :equipmentDataList="equipmentDataList" :otherParams="otherParams" v-if="otherParams.currEleSetting=='ele_statistics'">
      </statistic-setting>
      <eleandtemperature-setting :equipmentDataList="equipmentDataList" :otherParams="otherParams" v-if="otherParams.currEleSetting=='eleAndtemperature'">
      </eleandtemperature-setting>
      <item-setting :equipmentDataList="equipmentDataList" :otherParams="otherParams" v-if="otherParams.currEleSetting=='sub_item'">
      </item-setting>
      <peak-setting :equipmentDataList="equipmentDataList" :otherParams="otherParams" v-if="otherParams.currEleSetting=='ele_peak'">
      </peak-setting>
      <ringratio-setting :equipmentDataList="equipmentDataList" :otherParams="otherParams" v-if="otherParams.currEleSetting=='ele_ringRatio'">
      </ringratio-setting>
      <trend-setting :equipmentDataList="equipmentDataList" :otherParams="otherParams" v-if="otherParams.currEleSetting=='ele_trend'">
      </trend-setting>
      <span slot="footer" class="dialog-footer">
			    <el-button @click="cancelCurrSetting()">取 消</el-button>
			    <el-button type="primary" @click="saveCurrSetting()">保存</el-button>
			  </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    mapMutations
  } from 'vuex'
  import statisticSetting from './setting/statisticSetting.vue'
  import eleandtemperatureSetting from './setting/eleandtemperatureSetting.vue'
  import itemSetting from './setting/itemSetting.vue'
  import peakSetting from './setting/peakSetting.vue'
  import ringratioSetting from './setting/ringratioSetting.vue'
  import trendSetting from './setting/trendSetting.vue'
  export default {
    data() {
      return {
        dialogVisible: false
      }
    },
    props: ['equipmentDataList', 'otherParams'],
    components: {
      statisticSetting,
      eleandtemperatureSetting,
      itemSetting,
      peakSetting,
      ringratioSetting,
      trendSetting
    },
    methods: {
      ...mapMutations({
        uPDATE_VCOUNT: 'UPDATE_VCOUNT'
      }),
      cancelCurrSetting() {
        let vm = this;
        vm.otherParams.currEleSetting = '';
        vm.otherParams.dialogVisible = false
      },
      saveCurrSetting() {
        this.otherParams.isFinishSaved = false;
        this.uPDATE_VCOUNT({
          isReset: true
        });
        this.otherParams.isStartSaveOperate = true;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
  }
</script>
<style lang="less" scoped="scoped">

</style>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
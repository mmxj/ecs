<style lang="less" scoped="scoped">
  .myHr {
    border-top: 1px dashed #d1e3e2;
    height: 2px;
    background: #fff;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .fontStyle {
    font-size: 14px;
    color: #8492A6;
  }
  
  .addSetting {
    text-align: center;
    margin-top: 20px;
    .addSettingWrap {
      width: 70px;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  
  .setting_title_tips {
    width: 100%;
    font-size: 14px;
    color: #1F2D3D;
    padding: 8px 0;
  }
</style>
<template>
  <div class="mask_setting_wrap">
    <common-setting v-if="otherParams.currType==4" :otherParams="otherParams" :equipmentDataList="equipmentDataList">
    </common-setting>
    <div style="font-weight: bolder; padding: 0;" class="setting_title_tips" v-if="otherParams.currType==4">
      项目总用电
    </div>
    <div class="setting_title_tips" v-if="otherParams.currType!=3">
      选择数据流(N个数据流相加)
    </div>
    <data-stream v-if="otherParams.currType!=3" v-for="(item,index) in settingInfo.settingDataLists" :otherParams="otherParams" :settingInfo="settingInfo" :equipmentDataList="equipmentDataList" :item="item" :indexs="index">
    </data-stream>
    <data-stream v-if="otherParams.currType==3" v-for="(item,index) in settingInfo.settingItemDataLists" :otherParams="otherParams" :settingInfo="settingInfo" :equipmentDataList="equipmentDataList" :item="item" :indexs="index">
    </data-stream>
    <div class="myHr" v-if="otherParams.currType!=3"></div>
    <div class="addSetting">
      <div @click="addDataStream()" class="addSettingWrap">
        <img src="static/css/images/new_drag/13.png" />
        <div class="fontStyle" v-if="otherParams.currType!=3">
          添加数据点
        </div>
        <div class="fontStyle" v-if="otherParams.currType==3">
          添加分项
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import dataStream from './dataStream.vue'
  import commonSetting from './commonSetting.vue'
  export default {
    data() {
      return {
        noExpandBg: 'noExpandBg',
        ExpandBg: 'ExpandBg',
        AccessToken: eosCommon.storage.get("AccessToken"),
        myGetProtocolData: [],
        settingInfo: {
          currentSetting: '数据0',
          settingDataLists: [{
            TerminalEquipmentId: '',
            Address: ''
			}],
          settingItemDataLists: [{
            TerminalEquipmentId: '',
            Address: '',
            GroupName: ''
		}]
        }
      }
    },
    components: {
      dataStream,
      commonSetting
    },
    props: ['equipmentDataList', 'otherParams'],
    watch: {
      'otherParams.isStartSaveOperate' (val, oldval) {
        let vm = this;
        if(val) {
          if(vm.otherParams.currType == 1 ||
            vm.otherParams.currType == 2 ||
            vm.otherParams.currType == 5 ||
            vm.otherParams.currType == 6
          ) {
            vm.SetEnergyConfig();
          } else if(vm.otherParams.currType == 3) {
            vm.SetItemEnergyConfig();
          }

        }
      }
    },
    mounted() {
      if(this.otherParams.initSettingLists.length != 0) {
        this.settingInfo.settingDataLists = this.otherParams.initSettingLists;
      }
      if(this.otherParams.initSettingItemLists.length != 0) {
        this.settingInfo.settingItemDataLists = this.otherParams.initSettingItemLists;
      }

    },
    methods: {
      SetEnergyConfig() {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "ProjectId": vm.otherParams.ProjectId,
            "Type": vm.otherParams.currType,
            "Config": vm.settingInfo.settingDataLists
          }
        };
        let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/SetEnergyConfig";
        eosCommon.eosAjax(url, "post", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.otherParams.isFinishSaved = true;
            vm.otherParams.dialogVisible = false;
            vm.otherParams.isStartSaveOperate = false;
            vm.otherParams.currEleSetting = '';
          }
        });
      },
      SetItemEnergyConfig() {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "ProjectId": vm.otherParams.ProjectId,
            "Config": vm.settingInfo.settingItemDataLists
          }

        };
        let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/SetEnergyPeakValueConfig";
        eosCommon.eosAjax(url, "post", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.otherParams.isFinishSaved = true;
            vm.otherParams.dialogVisible = false;
            vm.otherParams.isStartSaveOperate = false;
            vm.otherParams.currEleSetting = '';
          }
        });
      },
      addDataStream() {
        let vm = this;
        if(vm.otherParams.currType != 3) {
          let singleDataStream = {
            TerminalEquipmentId: '',
            Address: ''
          }
          vm.settingInfo.settingDataLists.push(singleDataStream);
          vm.settingInfo.currentSetting = '数据' + (vm.settingInfo.settingDataLists.length - 1);

        } else {
          let singleDataStream = {
            TerminalEquipmentId: '',
            Address: '',
            GroupName: ''
          }
          vm.settingInfo.settingItemDataLists.push(singleDataStream);
          vm.settingInfo.currentSetting = '分项' + (vm.settingInfo.settingItemDataLists.length - 1);
        }

      }
    }
  }
</script>
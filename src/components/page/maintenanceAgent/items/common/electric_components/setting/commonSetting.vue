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
  <!--ele_statistics-->
  <div class="mask_setting_wrap">
    <div style="font-weight: bolder; padding: 0;" class="setting_title_tips" v-if="otherParams.currType==4"> 项目总用电量 </div>
    <div class="setting_title_tips" v-if="otherParams.currType!=3"> 选择数据流(N个数据流相加) </div>
    <data-stream v-if="otherParams.currType!=3 && otherParams.currType!=4 && hasInit" v-for="(item,index) in settingInfo.settingDataLists" :dataArr="settingInfo.settingDataLists" :otherParams="otherParams" :settingInfo="settingInfo" :equipmentDataList="equipmentDataList" :item="item" :indexs="index"> </data-stream>
    <data-stream v-if="otherParams.currType==3 && hasInit" v-for="(item,index) in settingInfo.settingItemDataLists" :dataArr="settingInfo.settingItemDataLists" :otherParams="otherParams" :settingInfo="settingInfo" :equipmentDataList="equipmentDataList" :item="item" :indexs="index"> </data-stream>
    <data-stream v-if="otherParams.currType==4" v-for="(item,index) in otherParams.initSetEnergyTemperatureConfig.EnergyItemList" :dataArr="otherParams.initSetEnergyTemperatureConfig.EnergyItemList" :otherParams="otherParams" :settingInfo="settingInfo" :equipmentDataList="equipmentDataList" :item="item" :indexs="index"> </data-stream>
    <div class="myHr" v-if="otherParams.currType!=3"></div>
    <div class="addSetting">
      <div @click="addDataStream()" class="addSettingWrap"> <img src="static/css/images/new_drag/13.png" />
        <div class="fontStyle" v-if="otherParams.currType!=3"> 添加数据点 </div>
        <div class="fontStyle" v-if="otherParams.currType==3"> 添加分项 </div>
      </div>
    </div>
  </div>
</template>
<script>
  import dataStream from './dataStream.vue'
  export default {
    data() {
      return {
        noExpandBg: 'noExpandBg',
        ExpandBg: 'ExpandBg',
        AccessToken: eosCommon.storage.get("AccessToken"),
        myGetProtocolData: [],
        settingInfo: {
          currentSetting: '数据0',
          validCount: 0,
          settingDataLists: [{
            TerminalEquipmentId: '',
            Address: ''
          }],
          settingItemDataLists: [{
            TerminalEquipmentId: '',
            Address: '',
            GroupName: ''
          }]
        },
        dataList: [],
        hasInit:false
      }
    },
    components: {
      dataStream
    },
    props: ['OutdoorTem', 'equipmentDataList', 'otherParams'],
    watch: {
      'otherParams.canSave' (val, oldval) {
        let vm = this;
        if(val) {
          if(vm.otherParams.currType == 1 ||
          	vm.otherParams.currType == 2 ||
          	vm.otherParams.currType == 5 ||
          	vm.otherParams.currType == 6) {
            vm.SetEnergyConfig();
          } else if(vm.otherParams.currType == 3) {
            vm.SetItemEnergyConfig();
          } else if(vm.otherParams.currType == 4) {
            vm.SetEnergyTemperatureConfig();
          }
        }
      }
    },
    mounted() {
    	let vm=this;
    	let confState=vm.otherParams.GetEnergyConfigState;
				if(!confState.length){
					vm.hasInit=true;
				}else{
					let res=confState.filter((val)=>{
						return val.Type==vm.otherParams.currType;
					});
					if(!res.length){
						vm.hasInit=true;
					}
				}
      if(vm.otherParams.initSettingLists.length != 0) {      	
        vm.settingInfo.settingDataLists = vm.otherParams.initSettingLists;
        vm.hasInit=true;
      }
      if(vm.otherParams.initSettingItemLists.length != 0) {
        vm.settingInfo.settingItemDataLists = vm.otherParams.initSettingItemLists;
        vm.hasInit=true;
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
          	eosCommon.eosMessage( "success", '配置成功');
            vm.otherParams.isFinishSaved = true;
            vm.otherParams.dialogVisible = false;
            vm.otherParams.isStartSaveOperate = false;
            vm.otherParams.canSave = false;
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
          	eosCommon.eosMessage( "success", '配置成功');         	          	
            vm.otherParams.isFinishSaved = true;
            vm.otherParams.dialogVisible = false;
            vm.otherParams.isStartSaveOperate = false;
            vm.otherParams.canSave = false;
          }
        });
      },
      SetEnergyTemperatureConfig() {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "ProjectId": vm.otherParams.ProjectId,
            "Config": vm.otherParams.initSetEnergyTemperatureConfig
          }
        };
        let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/SetEnergyTemperatureConfig";
        eosCommon.eosAjax(url, "post", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
          	eosCommon.eosMessage( "success", '配置成功');
            vm.otherParams.isFinishSaved = true;
            vm.otherParams.dialogVisible = false;
            vm.otherParams.isStartSaveOperate = false;
            vm.otherParams.canSave = false;
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
          if(vm.otherParams.currType == 4) {
            vm.otherParams.initSetEnergyTemperatureConfig.EnergyItemList.push(singleDataStream);
            vm.settingInfo.currentSetting = '数据' + (vm.otherParams.initSetEnergyTemperatureConfig.EnergyItemList.length - 1);
            return;
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
<template>
  <!--ele_statistics-->
  <div class="eleAndtemperature">
    <div>
      <div class="setting_title_tips">
        室外温度
      </div>
      <div class="myHr"></div>
      <div class="info">
        <span class="fontStyle infoFsp">数据1：</span>
        </span>
      </div>
      <div class="mt10 clearfloat">
        <el-select v-model="otherParams.initSetEnergyTemperatureConfig.TerminalEquipmentId" @change='getProtocolList(true,otherParams.initSetEnergyTemperatureConfig.TerminalEquipmentId)' style="padding-left: 0;padding-right: 5px;" class="selec_pd pull-left col-xs-6 col-sm-6 col-md-6 col-lg-6" size="small" filterable clearable placeholder="请选择设备">
          <el-option v-for="(eitem, index) in equipmentDataList" :key="index" :label="eitem.EquipmentAlias" :value="eitem.EquipmentId">
          </el-option>
        </el-select>
        <el-select v-model="otherParams.initSetEnergyTemperatureConfig.TempAddress" style="padding-left: 5px;padding-right: 0px;" class="selec_pd pull-left col-xs-6 col-sm-6 col-md-6 col-lg-6" size="small" filterable clearable placeholder="请选择数据地址">
          <el-option v-for="(pitem, index) in myGetProtocolData" :key="index" :label="pitem.DisplayName" :value="pitem.RegisterAddress">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="myHr"></div>
    <common-setting :otherParams="otherParams" :equipmentDataList="equipmentDataList">
    </common-setting>
  </div>
</template>

<script>
  import commonSetting from './commonSetting.vue'

  export default {
    data() {
      return {
        AccessToken: eosCommon.storage.get("AccessToken"),
        myGetProtocolData: [],
        rules: {
          TerminalEquipmentId: [{
              required: true,
              message: '请选择设备',
              trigger: ''
           }],
          Address: [{
              required: true,
              message: '请选择数据地址',
              trigger: ''
            }]
        }
      }
    },
    props: ['otherParams', 'equipmentDataList'],
    components: {
      commonSetting
    },
    watch: {
      'otherParams.isStartSaveOperate' (val, oldval) {}
    },
    mounted() {
    	let vm=this;
    	let TerminalEquipmentId=vm.otherParams.initSetEnergyTemperatureConfig.TerminalEquipmentId;
      if(TerminalEquipmentId) {
        vm.getProtocolList(false, TerminalEquipmentId);
      }
    },
    methods: {
      getProtocolList(isChange, EquipmentId) {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "EquipmentId": EquipmentId
        };
        let url = eosCommon.ENTERPRISE_API + "api/Equipment/QueryWorkProtocl";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.myGetProtocolData = result.Data;
            if(isChange) {
              vm.otherParams.initSetEnergyTemperatureConfig.TempAddress = '';
            }

          }
        });
      }
    }
  }
</script>

<style lang="less" scoped="scoped">
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }
  
  .setting_title_tips {
    width: 100%;
    font-size: 14px;
    font-weight: bolder;
    color: #1F2D3D;
    padding: 8px 0;
  }
  
  .fontStyle {
    font-size: 14px;
    color: #8492A6;
  }
  
  .myHr {
    border-top: 1px dashed #d1e3e2;
    height: 2px;
    background: #fff;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .info {
    position: relative;
    .infoFsp {
      display: inline-block;
      width: 230px;
      /*cursor: pointer;*/
      padding-left: 0px;
      /*transition: all ease 1s;*/
    }
    /*.ExpandBg{
			background: url(../../../../../../../../static/css/images/new_drag/10.png) no-repeat left center;
		}
		.noExpandBg{
			background: url(../../../../../../../../static/css/images/new_drag/11.png) no-repeat left center;
		}*/
  }
</style>
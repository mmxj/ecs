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
  
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }
  
  .dataSetting {
    .info {
      position: relative;
      .infoFsp {
        display: inline-block;
        width: 400px;
        cursor: pointer;
        padding-left: 16px;
        transition: all ease 1s;
      }
      .ExpandBg {
        background: url(../../../../../../../../static/css/images/new_drag/10.png) no-repeat left center;
      }
      .noExpandBg {
        background: url(../../../../../../../../static/css/images/new_drag/11.png) no-repeat left center;
      }
      .infoSsp {
        cursor: pointer;
        position: absolute;
        width: 12px;
        height: 12px;
        right: 0;
        top: 50%;
        margin-top: -6px;
        display: inline-block;
        background: url(../../../../../../../../static/css/images/new_drag/12.png) no-repeat center;
      }
    }
  }
  
  .chartName {
    position: relative;
    display: block;
    span {
      display: inline-block;
      height: 30px;
      line-height: 30px;
    }
    .chartName_input {
      width: 177px;
      position: absolute;
      top: 0;
      left: 69px;
    }
  }
</style>
<template>
  <!--ele_statistics-->
  <div class="dataSetting">
    <div v-if="otherParams.currType!='3'" class="myHr"></div>
    <div class="info">
      <span class="fontStyle infoFsp" :class="[settingInfo.currentSetting==('数据'+indexs) ? ExpandBg : noExpandBg]" @click="toggleSetting(indexs)">数据{{indexs+1}}：{{item.EquipmentAlias}}__{{DisplayName}}</span>
      <span v-if="dataArr.length>1" class="infoSsp" @click="deleteDataStream(indexs)">							
				</span>
    </div>
    <div v-show="settingInfo.currentSetting=='数据'+indexs">
      <el-form :model="item" :rules="rules" :ref="refs" class="">
        <div class="mt10 clearfloat">
          <el-form-item label="" prop="TerminalEquipmentId" style="padding-left: 0;padding-right: 5px;" class="selec_pd pull-left col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <el-select style="width: 100%;" v-model="item.TerminalEquipmentId" @change='getProtocolList(true,item.TerminalEquipmentId)' size="small" filterable clearable placeholder="请选择或搜索设备">
              <el-option v-for="(eitem, index) in equipmentDataList" :key="index" :label="eitem.EquipmentAlias" :value="eitem.EquipmentId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" prop="Address" style="padding-left: 5px;padding-right: 0px;" class="selec_pd pull-left col-xs-6 col-sm-6 col-md-6 col-lg-6">
            <el-select style="width: 100%;" v-model="item.Address" size="small" @change="getDisplayName()" filterable clearable placeholder="请选择或搜索数据地址">
              <el-option v-for="(pitem, index) in myGetProtocolData" :key="index" :label="pitem.DisplayName" :value="pitem.RegisterAddress">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <span v-if="otherParams.currType=='3'" class="mt-10 chartName">
			<span class="fontStyle">分项名称：</span>
        <el-form-item class="chartName_input" prop="GroupName">
          <el-input style="width: 100%;" v-model="item.GroupName" size='small'></el-input>
        </el-form-item>
        </span>
      </el-form>
    </div>
    <div v-if="otherParams.currType=='3'" class="myHr"></div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        rules: {
          GroupName: [{
              required: true,
              message: '分项名称不能为空',
              trigger: 'blur'
            }],
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
        },
        noExpandBg: 'noExpandBg',
        ExpandBg: 'ExpandBg',
        AccessToken: eosCommon.storage.get("AccessToken"),
        myGetProtocolData: [],
        refs: '',
        DisplayName:''
      }
    },
    props: ['dataArr', 'settingInfo', 'equipmentDataList', 'item', 'indexs', 'otherParams'],
    watch: { //canSave
      'otherParams.isStartSaveOperate' (val, oldval) {
        let vm = this;
        if(val) {
          vm.$refs[vm.refs].validate((valid) => {
            if(valid) {
              vm.uPDATE_VCOUNT({
                isReset: false
              });
              if(vm.get_validCount == vm.dataArr.length) {
                vm.otherParams.canSave = true;
              }
            } else {
              vm.otherParams.isStartSaveOperate = false;
              vm.otherParams.canSave = false;
              return false;
            }
          });
        }
      }
    },
    computed: {
      ...mapGetters(['get_validCount'])
    },
    mounted() {
      this.refs = 'ruleForm' + this.indexs;
      if(this.item.TerminalEquipmentId) {
        this.getProtocolList(false, this.item.TerminalEquipmentId);
      }
    },
    methods: {
      ...mapMutations({
        uPDATE_VCOUNT: 'UPDATE_VCOUNT'
      }),
      getDisplayName(){
      	let vm=this;
      	for(let val of vm.myGetProtocolData){
      		if(val.RegisterAddress==vm.item.Address){      		
      				vm.DisplayName=val.DisplayName;
      		}
      	}
      },
      toggleSetting(index) {
        this.settingInfo.currentSetting = '数据' + index;
      },
      deleteDataStream(index) {
        let vm = this;
        vm.dataArr.splice(index, 1);

      },
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
            for(let val of vm.equipmentDataList){
            	if(val.EquipmentId==EquipmentId){
            		vm.item.EquipmentAlias=val.EquipmentAlias;
            	}
            }
            if(isChange) {
            		vm.item.Address='';
            	 vm.DisplayName='';
            }else{            	
            	vm.getDisplayName();
            }
          }
        });
      }
    }
  }
</script>
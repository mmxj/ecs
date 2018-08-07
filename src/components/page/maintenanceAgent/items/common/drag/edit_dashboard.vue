<style scoped="scoped" lang="less">
.edit_panel {
  width: 280px;
  position: absolute;
  top: 0;
  right: 0px;
  bottom: 0px;
  /*height: 100%;*/
  display: none;
  z-index: 100;
  border: 2px solid #d1e3e2;
  background: #fff;
  & h3.edit_panel_name {
    color: #1F2D3D;
    font-size: 14px;
    font-weight: bold;
    width: 100%;
    height: 48px;
    line-height: 48px;
    text-align: center;
    margin: 0;
    /*border-top: 2px solid #eaedef;*/
    border-bottom: 1px solid #eaedef;
    background: #dfeceb;
  }
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
  .el-select {
    margin-top: 10px;
  }
  .edit_content {
    padding: 15px;
    position: absolute;
    margin-top: 10px;
    top: 48px;
    bottom: 48px;
    right: 0;
    width: 100%;
    overflow: auto;
    .addColorSetting {
      text-align: center;
      margin-top: 20px;
      .addColorSettingWrap {
        width: 70px;
        margin: 0 auto;
        cursor: pointer;
      }
    }
    .selectHeader {
      width: 100%;
      a {
        cursor: pointer;
        /*display: inline-block;*/
        width: 120px;
        text-align: center;
        background: #8492A6;
        font-size: 14px;
        color: #fff;
        padding: 5px 0px;
      }
      a.aActive {
        background: #1ABC9C;
      }
    }
    .colorSetting_wrap {
      display: inline-block;
      margin-top: 10px;
      position: relative;
      .dotVal {
        position: absolute;
        top: 0;
        left: 20px;
        width: 50px;
      }
      .colorSettingSpan {
        display: block;
        position: absolute;
        top: 1px;
        height: 30px;
        line-height: 30px;
      }
      .colorSettingPiker {
        height: 30px;
        margin-left: 155px;
      }
      .infoSsp {
        cursor: pointer;
        position: absolute;
        width: 12px;
        height: 12px;
        right: -16px;
        top: 50%;
        margin-top: -6px;
        display: inline-block;
        background: url(../../../../../../../static/css/images/new_drag/12.png) no-repeat center;
      }
    }
  }
  & .operations {
    width: 100%;
    height: 48px;
    border-bottom: 1px solid #eaedef;
    background: #eef6f6;
    position: absolute;
    bottom: 0;
    .operatesBtns {
      width: 100%;
      margin-top: 10px;
      .btn_wrap {
        padding: 0 18px;
      }
    }
  }
}

.isEquipClass {
  top: 40px;
  bottom: 0px;
}

</style>
<template>
  <div :id="id" class="edit_panel" :class="{isEquipClass:isEquip==true}">
    <h3 class="edit_panel_name">表盘设置</h3>
    <div class="edit_content my_edit_chart">
      <div class="info fontStyle"> 选择数据来源： </div>
      <!-- 如果是场景类的,则选择挂载设备 -->
      <el-select v-if='!propsData.IsEquipment' style="width: 100%;" class="mt10" v-model="propsData.dataStream.EquipmentId" size="small" filterable clearable placeholder="选择设备" @change='getProtocolList(true)'>
        <el-option v-for="(eitem, index) in relatedEquipment" :key="index" :label="eitem.EquipmentAlias" :value="eitem.TerminalEquipmentId"> </el-option>
      </el-select>
      <!-- 如果是设备类的,则选择可用设备 -->
      <el-select v-else style="width: 100%;" class="mt10" v-model="propsData.dataStream.EquipmentId" size="small" filterable clearable placeholder="选择设备" @change='getProtocolList(true)'>
        <el-option v-for="(eitem, index) in get_equipment_data" :key="index" :label="eitem.EquipmentAlias" :value="eitem.EquipmentId"> </el-option>
      </el-select>
      <el-select style="width: 100%;" size="small" v-model="propsData.dataStream.RegisterAddress" @change="changeUnitData()" filterable clearable placeholder="选择数据地址">
        <el-option v-for="(pitem, index) in protocolList" :key="index" :label="pitem.DisplayName" :value="pitem.RegisterAddress"> </el-option>
      </el-select>
      <template v-if='!propsData.IsEquipment'>
        <div style="margin-top: 10px;margin-bottom: 10px">
          <span>是否重点数据：</span>
          <el-radio-group v-model="propsData.IsMain">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </div>
        <template v-if='propsData.IsMain==1'>
          <div class="txtF">重点数据别名：</div>
          <el-input :maxlength="25" v-model="propsData.AliasName"></el-input>
        </template>
      </template>
      <div class="myHr"></div>
      <div class="info fontStyle"> 颜色配置：(值须从小到大连续排列) </div>
      <single-dashbordsetting v-for="(item,index) in propsData.colorSettingInfo" :mindex="index" :sColorSettingInfoList="sColorSettingInfoList" :propsData="item"> {{index}} </single-dashbordsetting>
      <div v-if="sColorSettingInfoList.length<5" class="addColorSetting">
        <div @click="addColorSetting()" class="addColorSettingWrap"> <img src="static/css/images/new_drag/13.png" />
          <div class="fontStyle"> 添加数值段 </div>
        </div>
      </div>
    </div>
    <div class="operations" style="">
      <div class="operatesBtns form-inline clearfix">
        <span class="pull-left btn_wrap" style="width: 100%;">
          <button @click='deleteCurrentPanel($event)' id="btnInsert" type="button" style="background: #E74C3C;color: #fff; width: 100%;" class="btn" >
              <i style="margin-left: 0;" class="fa fa-trash-o m-r-5"></i>删除
          </button>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const URL = Common.Const.url
const AXIOS = FUNC.axios
const GET = AXIOS.get
import { testProtocol, deletePanel } from 'src/assets/js/common/util';
import { mapGetters, mapMutations } from 'vuex'
import singleDashbordsetting from './edit_singleDashboardSetting.vue'
export default {
  data() {
    return {
      relatedEquipment: [], //场景挂载设备列表
      id: '',
      AccessToken: eosCommon.storage.get("AccessToken"),
      sColorSettingInfoList: [],
      sColorSettingInfo: {
        startNum: 0,
        endNum: 0,
        regionColor: ''
      },
      isEquip: false
    }
  },
  props: ['propsData', 'currentkey'],
  watch: {
    propsData(val) {
      this.sColorSettingInfoList = this.propsData.colorSettingInfo;
    }
  },
  components: {
    singleDashbordsetting
  },
  mounted() {
    let vm = this;
    vm.isEquip = vm.propsData.IsEquipment;
    vm.sColorSettingInfoList = vm.propsData.colorSettingInfo;
    vm.id = "edit_" + vm.propsData.refs
    if (vm.isEquip) {
      if (vm.get_equipment_data.length == 0) {
        vm.gET_EQUIPMENT_DATA({
          isEquip: false,
          EquipmentList: this.propsData.eqInfo
        });
      }
    } else {
      vm.getProtocolList();
      vm.GetAssemblageRelatedEquipment()
    }
  },
  computed: {
    ...mapGetters([
      "get_curr_TargetId",
      "get_protocol_data",
      "get_equipment_data",
      "get_STORE_protocol"
    ]),
    startNumList() {
      let vm = this;
      let startNumList = [];
      for (let val of vm.sColorSettingInfoList) {
        startNumList.push(val.startNum);
      }
      return startNumList;
    },
    endNumList() {
      let vm = this;
      let endNumList = [];
      for (let val of vm.sColorSettingInfoList) {
        endNumList.push(val.endNum);
      }
      return endNumList;
    },
    protocolList() {
      if (this.isEquip) {
        return this.get_protocol_data;
      } else {
        return this.propsData.protocolList;
      }
    },
    testParams() {
      let vm = this;
      return [vm.get_STORE_protocol, vm.propsData.dataStream.EquipmentId, 'others'];
    }
  },
  methods: { ...mapMutations({
      dELETE_DASHBAORD: 'DELETE_CURR_PANEL',
      gETPROTOCOLDATA: 'GETPROTOCOLDATA',
      gET_EQUIPMENT_DATA: 'GET_EQUIPMENT_DATA',
      uPDATE_OPERATEMEMORY: 'UPDATE_OPERATEMEMORY',
      uPDATE_LOCAL: 'UPDATE_EQLIST'
    }),
    GetAssemblageRelatedEquipment() {
      let vm = this;
      vm.relatedEquipment = []
      let relatedEquipment = eosCommon.storage.get('relatedEquipment');
      if (relatedEquipment) {
        vm.relatedEquipment = JSON.parse(relatedEquipment)
      }
    },
    deleteColorSetting(index) {
      let vm = this;
      vm.vm.sColorSettingInfoList[len].endNum.splice(index, 1);
    },
    addColorSetting() {
      let vm = this;
      let len = vm.sColorSettingInfoList.length - 1;
      vm.sColorSettingInfoList.push({
        startNum: Number(vm.sColorSettingInfoList[len].endNum),
        endNum: Number(Number(vm.sColorSettingInfoList[len].endNum) + 20),
        regionColor: '#E74C3C'
      });
    },
    changeUnitData(item) {
      let vm = this;
      for (let val of vm.protocolList) {
        if (val.RegisterAddress == vm.propsData.dataStream.RegisterAddress) {
          vm.propsData.DisplayName = val.DisplayName;
          vm.propsData.Unit = val.Unit;
          vm.propsData.Unit = val.Unit;
          vm.propsData.AliasName = val.DisplayName;
          break;
        }
      }
    },
    getProtocolList(isChange) {
      let vm = this;
      let res = testProtocol(...vm.testParams);
      if (res.length > 0) {
        vm.propsData.protocolList = res;
        if (isChange) {
          vm.propsData.dataStream.RegisterAddress = '';
        }
        return;
      }
      let param = {
        "AccessToken": vm.AccessToken,
        "EquipmentId": vm.propsData.dataStream.EquipmentId
      };
      let url = eosCommon.ENTERPRISE_API + "api/Equipment/QueryWorkProtocl";
      eosCommon.eosAjax(url, "get", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.uPDATE_LOCAL({
            updateType: 1,
            protocolList: {
              TerminalEquipmentId: vm.propsData.dataStream.EquipmentId,
              ProtocalInfo: [...result.Data]
            }
          })
          let res = [...result.Data]
          vm.propsData.protocolList = res
          if (isChange) {
            vm.propsData.dataStream.RegisterAddress = '';
          }
        }
      });
    },
    deleteCurrentPanel(event) {
      let vm = this;
      event.cancelBubble = true;
      deletePanel(vm.propsData.refs);
      vm.dELETE_DASHBAORD({
        typeName: vm.propsData.typeName,
        currenIndex: vm.propsData.refs,
        isDeleteClick: true,
        isResetOperateMemory: false
      })
    }
  }
}

</script>

<template>
  <div class="content_data">
    <!-- 如果是场景类的,则选择挂载设备 -->
    <el-select v-if='!isEquip' style="width: 100%;" class="mt10" v-model="item.dataStream.EquipmentId" size="small" filterable clearable placeholder="选择设备" @change='getProtocolList(true)'>
      <el-option v-for="(eitem, index) in relatedEquipment" :key="index" :label="eitem.EquipmentAlias" :value="eitem.TerminalEquipmentId">
      </el-option>
    </el-select>
    <!-- 如果是设备类的,则选择可用设备 -->
    <el-select v-else style="width: 100%;" class="mt10" v-model="item.dataStream.EquipmentId" size="small" filterable clearable placeholder="选择设备" @change='getProtocolList(true)'>
      <el-option v-for="(eitem, index) in item.get_equipment_data" :key="index" :label="eitem.EquipmentAlias" :value="eitem.EquipmentId">
      </el-option>
    </el-select>
    <el-select @change="changeUnitData()" style="width: 100%;" size="small" v-model="item.dataStream.RegisterAddress" filterable clearable placeholder="选择数据地址">
      <el-option v-for="(pitem, index) in myGetProtocolData" :key="index" :label="pitem.DisplayName" :value="pitem.RegisterAddress">
      </el-option>
    </el-select>
    <span class="mt-10 chartName">
    <span class="fontStyle">曲线名称：</span>
    <el-input class="chartName_input" v-model="item.yData.name" size='small'></el-input>
    </span>
    <div class="colorSetting_wrap" style="margin-top: 10px;">
      <span class="fontStyle colorSettingSpan" style="">曲线颜色：</span>
      <el-color-picker class="colorSettingPiker" style="" v-model="item.yData.color"></el-color-picker>
    </div>
    <div class="axisSetting my_radio" style="margin-top: 20px;">
      <el-radio-group v-model="item.yData.yAxis" @change="axisChange(indexs)">
        <el-radio class="radio" :label="0">用于左Y轴</el-radio>
        <el-radio class="radio" :disabled="chartsData.length<=1" :label="1">用于右Y轴</el-radio>
      </el-radio-group>
    </div>
  </div>
</template>
<script>
import {
  testProtocol
} from 'src/assets/js/common/util';
import * as Common from 'src/assets/js/common';
import {
  mapMutations,
  mapGetters
} from 'vuex'
export default {
  data() {
    return {
      relatedEquipment: [],
      AccessToken: eosCommon.storage.get("AccessToken"),
    }
  },
  props: ['item', 'indexs', 'chartsData', 'isEquip'],
  mounted() {
    let vm = this;
    if (!vm.isEquip) {
      vm.getProtocolList();
      vm.GetAssemblageRelatedEquipment()
    }
  },
  computed: {
    ...mapGetters([
      "get_protocol_data",
      "get_equipment_data",
      "get_STORE_protocol"
    ]),
    myGetProtocolData() {
      if (this.isEquip)
        return this.get_protocol_data
      else
        return this.item.protocolList;
    },
    testParams() {
      let vm = this;
      return [vm.get_STORE_protocol, vm.item.dataStream.EquipmentId, 'others'];
    }
  },
  methods: {
    ...mapMutations({
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
    changeUnitData() {
      let vm = this;
      for (let val of vm.myGetProtocolData) {
        if (val.RegisterAddress == vm.item.dataStream.RegisterAddress) {
          vm.item.yData.name = val.DisplayName;
        }
      }
    },
    axisChange(index) {
      let vm = this; //opposite
      for (let i of Object.keys(vm.chartsData)) {
        if (i == index) {
          if (vm.chartsData[i].yData.yAxis == 0) {
            vm.chartsData[i].yAxis.opposite = false;
          } else {
            vm.chartsData[i].yAxis.opposite = true;
          }
        }
      }
    },
    getProtocolList(isChange) {
      let vm = this;
      let res = testProtocol(...vm.testParams);
      if (res.length > 0) {
        vm.item.protocolList = res;
        if (isChange) {
          vm.item.dataStream.RegisterAddress = '';
        }
        return;
      }
      let param = {
        "AccessToken": vm.AccessToken,
        "EquipmentId": vm.item.dataStream.EquipmentId
      };
      let url = eosCommon.ENTERPRISE_API + "api/Equipment/QueryWorkProtocl";
      eosCommon.eosAjax(url, "get", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.uPDATE_LOCAL({
            updateType: 1,
            protocolList: {
              TerminalEquipmentId: vm.item.dataStream.EquipmentId,
              ProtocalInfo: [...result.Data]
            }
          })
          let res = [...result.Data]
          vm.item.protocolList = res;
          if (isChange) {
            vm.item.dataStream.RegisterAddress = '';
          }
        }
      });
    },

  }
}

</script>
<style scoped="scoped" lang="less">
.content_data {
  transition: all ease 2s;
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
      left: 69px;
    }
  }
  .el-select {
    margin-top: 10px;
  }
}

</style>

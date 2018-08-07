<style scoped="scoped" lang="less">
.edit_panel {
  width: 280px;
  position: absolute;
  top: 0;
  right: 0px;
  bottom: 0px;
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
    border-bottom: 1px solid #eaedef;
    background: #dfeceb;
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
    <h3 class="edit_panel_name">状态控制设置</h3>
    <div class="edit_content my_edit_chart">
      <!-- 如果是场景类的,则选择挂载设备 -->
      <el-select v-if='!isEquip' style="width: 100%;" class="mt10" v-model="propsData.dataStream.EquipmentId" size="small" filterable clearable placeholder="选择设备" @change='getProtocolList()'>
        <el-option v-for="(eitem, index) in relatedEquipment" :key="index" :label="eitem.EquipmentAlias" :value="eitem.TerminalEquipmentId">
        </el-option>
      </el-select>
      <!-- 如果是设备类的,则选择可用设备 -->
      <el-select v-else style="width: 100%;" class="mt10" v-model="propsData.dataStream.EquipmentId" size="small" filterable clearable placeholder="选择设备" @change='getProtocolList()'>
        <el-option v-for="(eitem, index) in get_equipment_data" :key="index" :label="eitem.EquipmentAlias" :value="eitem.EquipmentId">
        </el-option>
      </el-select>
      <el-select style="width: 100%;" size="small" v-model="propsData.dataStream.RegisterAddress" filterable clearable placeholder="选择数据地址">
        <el-option v-for="(pitem, index) in protocolList" :key="index" :label="pitem.DisplayName" :value="pitem.RegisterAddress">
        </el-option>
      </el-select>
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
import { testProtocol, deletePanel } from 'src/assets/js/common/util';
import {
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  data() {
    return {
      relatedEquipment: [],
      id: '',
      AccessToken: eosCommon.storage.get("AccessToken"),
      isEquip: false
    }
  },
  props: ['propsData', 'currentkey'],
  watch: {},
  components: {},
  mounted() {
    let vm = this;
    vm.isEquip = vm.propsData.IsEquipment;
    vm.id = "edit_" + vm.propsData.refs
    if (vm.isEquip) {
      if (vm.get_equipment_data.length == 0) {
        vm.gET_EQUIPMENT_DATA({
          isEquip: false,
          EquipmentList: vm.propsData.eqInfo
        });
      }
    }else{
      vm.GetAssemblageRelatedEquipment()
    }
  },
  computed: {
    ...mapGetters([
      "get_protocol_data",
      "get_equipment_data",
      "get_STORE_protocol"
    ]),
    protocolList() {

      if (this.isEquip) {
        return this.get_protocol_data.filter((val) => {
          return val.Status.length > 0;
        });
      } else {
        return this.propsData.protocolList;
      }
    },
    testParams() {
      let vm = this;
      return [vm.get_STORE_protocol, vm.propsData.dataStream.EquipmentId, 'datastate'];
    }
  },
  methods: {
    ...mapMutations({
      dELETE_DATASTATE: 'DELETE_CURR_PANEL',
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
    getProtocolList() {
      let vm = this;
      let res = testProtocol(...vm.testParams);
      if (res.length > 0) {
        vm.propsData.protocolList = res;
        vm.propsData.dataStream.RegisterAddress = '';
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
          vm.propsData.protocolList = res.filter((val) => {
            return val.Status.length > 0;
          });
          vm.propsData.dataStream.RegisterAddress = '';
        }
      });
    },
    deleteCurrentPanel() {
      let vm = this;
      event.cancelBubble = true;
      deletePanel(vm.propsData.refs);
      vm.dELETE_DATASTATE({
        typeName: vm.propsData.typeName,
        currenIndex: vm.propsData.refs,
        isDeleteClick: true,
        isResetOperateMemory: false
      })
    }
  }
}

</script>

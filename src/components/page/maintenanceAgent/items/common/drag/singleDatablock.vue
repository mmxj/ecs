<style scoped="scoped" lang="less">
.content_data {
  transition: all ease 2s;
  .datablockName {
    position: relative;
    display: block;
    span {
      display: inline-block;
      height: 30px;
      line-height: 30px;
    }
    .name_input {
      width: 177px;
      position: absolute;
      left: 69px;
    }
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
  .el-select {
    margin-top: 10px;
  }
  .others_setting {
    position: relative;
    .fontStyleSetting {
      width: 161px;
      height: 30px;
      display: inline-block;
      border: 1px solid #D1E3E2;
      border-radius: 4px;
      padding: 3px 24px 0;
    }
    .colorSettingPiker {
      display: inline-block;
      /*margin-left: 4px;*/
      position: absolute;
      right: 0;
      /*margin-top: 2px;*/
    }
    a {
      padding: 0 10px;
      color: #000;
      font-size: 18px;
      cursor: pointer;
    }
    a.B {
      font-weight: bold;
    }
    a.I {
      font-style: italic
    }
    a.U {
      text-decoration: underline;
    }
  }
}

</style>
<template>
  <div class="content_data">
    <!-- 如果是场景类的,则选择挂载设备 -->
    <el-select v-if='!isEquip' style="width: 100%;" class="mt10" v-model="item.dataStream.EquipmentId" size="small" filterable clearable placeholder="选择设备" @change='getProtocolList(true)'>
      <el-option v-for="(eitem, index) in relatedEquipment" :key="index" :label="eitem.EquipmentAlias" :value="eitem.TerminalEquipmentId">
      </el-option>
    </el-select>
    <!-- 如果是设备类的,则选择可用设备 -->
    <el-select v-else style="width: 100%;" class="mt10" v-model="item.dataStream.EquipmentId" size="small" filterable clearable placeholder="选择设备" @change='getProtocolList(true)'>
      <el-option v-for="(eitem, index) in get_equipment_data" :key="index" :label="eitem.EquipmentAlias" :value="eitem.EquipmentId">
      </el-option>
    </el-select>
    <el-select style="width: 100%;" size="small" v-model="item.dataStream.RegisterAddress" @change="changeUnitData()" filterable clearable placeholder="选择数据地址">
      <el-option v-for="(pitem, index) in myGetProtocolData" :key="index" :label="pitem.DisplayName" :value="pitem.RegisterAddress">
      </el-option>
    </el-select>
    <template v-if='!isEquip'>
      <div style="margin-top: 10px;margin-bottom: 10px">
        <span>是否重点数据：</span>
        <el-radio-group v-model="item.IsMain">
          <el-radio :label="1">是</el-radio>
          <el-radio :label="0">否</el-radio>
        </el-radio-group>
      </div>
      <template v-if='item.IsMain==1'>
        <div class="txtF">重点数据别名：</div>
        <el-input :maxlength="25" v-model="item.AliasName"></el-input>
      </template>
    </template>
    <div class=" mt-10">
      <span class="fontStyle">文本样式：</span>
    </div>
    <el-select style="width: 100%;" size="small" v-model="styleTypesVal" filterable clearable placeholder="样式设置选择">
      <el-option v-for="(item, index) in styleTypes" :key="index" :label="item" :value="index">
      </el-option>
    </el-select>
    <div v-show="styleTypesVal==0" class="dataName">
      <el-select v-model="item.PrePositionStyle.fontSize" style="width: 100%;" size="small" filterable clearable placeholder="字体大小">
        <el-option value="10">10px</el-option>
        <el-option value="20">16px</el-option>
        <el-option value="30">20px</el-option>
      </el-select>
      <div class="others_setting mt-10">
        <div class="fontStyleSetting">
          <a @click="changeFontWeight('PrePositionStyle')" class="B">B</a>
          <a @click="changeFontItalic('PrePositionStyle')" class="I">I</a>
          <a @click="changeFontUnderLine('PrePositionStyle')" class="U">U</a>
        </div>
        <el-color-picker v-model="item.PrePositionStyle.color" class="colorSettingPiker"></el-color-picker>
      </div>
    </div>
    <div v-show="styleTypesVal==1" class="dataValue">
      <el-select v-model="item.PostPositionStyle.fontSize" style="width: 100%;" size="small" filterable clearable placeholder="字体大小">
        <el-option value="10">10px</el-option>
        <el-option value="20">16px</el-option>
        <el-option value="30">20px</el-option>
      </el-select>
      <div class="others_setting mt-10">
        <div class="fontStyleSetting">
          <a @click="changeFontWeight('PostPositionStyle')" class="B">B</a>
          <a @click="changeFontItalic('PostPositionStyle')" class="I">I</a>
          <a @click="changeFontUnderLine('PostPositionStyle')" class="U">U</a>
        </div>
        <el-color-picker v-model="item.PostPositionStyle.color" class="colorSettingPiker"></el-color-picker>
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
import { testProtocol } from 'src/assets/js/common/util';
import {
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  data() {
    return {
      relatedEquipment: [], //场景挂载设备列表
      AccessToken: eosCommon.storage.get("AccessToken"),
      styleTypes: ['数据名字体格式', '数据值字体格式'], //, '单位字体格式'
      styleTypesVal: 1
    }
  },
  props: ['item', 'indexs', 'datablockData', 'isEquip'],
  mounted() {
    let vm = this;
    vm.GetAssemblageRelatedEquipment()
  },
  computed: {
    ...mapGetters([
      "get_curr_TargetId",
      "get_protocol_data",
      "get_equipment_data",
      "get_STORE_protocol"
    ]),
    myGetProtocolData() {
      if (this.isEquip) {
        return this.get_protocol_data
      } else {
        return this.item.protocolList;
      }
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
    getProtocolList(isChange) {
      let vm = this;
      let res = testProtocol(...vm.testParams);
      if (res.length > 0) {
        vm.item.protocolList = res;
        vm.item.dataStream.RegisterAddress = '';
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
    changeFontWeight(styleType) {
      let fontWeight = this.item[styleType].fontWeight;
      this.item[styleType].fontWeight = fontWeight == 'bold' ? 'normal' : 'bold';
    },
    changeFontItalic(styleType) {
      let fontItalic = this.item[styleType].fontItalic;
      this.item[styleType].fontItalic = fontItalic == 'italic' ? 'normal' : 'italic';
    },
    changeFontUnderLine(styleType) {
      let fontUnderLine = this.item[styleType].fontUnderLine;
      this.item[styleType].fontUnderLine = fontUnderLine == 'underline' ? 'none' : 'underline';
    },
    changeUnitData() {
      let vm = this;
      let pro = vm.myGetProtocolData;
      let len = pro.length;
      // console.log(vm.item)
      for (let i = 0; i < len; i++) {
        if (pro[i].RegisterAddress == vm.item.dataStream.RegisterAddress) {
          vm.item.dataName = pro[i].DisplayName + ':';
          vm.item.Unit = pro[i].Unit;
          vm.item.valContent = vm.item.dataValue + vm.item.Unit;
          vm.item.AliasName = pro[i].DisplayName
          break
        }
      }
    }
  }
}

</script>

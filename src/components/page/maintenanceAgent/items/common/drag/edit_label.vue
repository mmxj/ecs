<style scoped="scoped" lang="less">
.typeSelect {
  label {
    color: #000;
    font-size: 14px;
  }
}

.txtF {
  height: 30px;
  line-height: 30px;
  margin-top: 6px;
  margin-bottom: 6px;
  font-size: 14px;
  color: #848484;
}

.txtContent {
  margin-top: 5px;
}

.edit_panel {
  width: 280px;
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0px;
  display: none;
  z-index: 100;
  border: 2px solid #d1e3e2;
  background: #fff;
  & h3 {
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
  & .operations {
    width: 100%;
    height: 48px;
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid #eaedef;
    background: #eef6f6;
    .operatesBtns {
      width: 100%;
      margin-top: 10px;
      .btn_wrap {
        padding: 0 18px;
      }
    }
  }
}

.others_setting {
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

.isEquipClass {
  top: 40px;
  bottom: 0px;
}

.edit_content {
  position: absolute;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 10px;
  top: 48px;
  bottom: 48px;
  right: 0;
  width: 100%;
  overflow: auto;
}

</style>
<template>
  <div :id="id" class="edit_panel" :class="{isEquipClass:isEquip==true}">
    <h3>文本设置</h3>
    <div class="edit_content" style="">
      <div style="width: 100%;" class="label_position_wrap">
        <div style="width:96px; display: inline-block;" class="label_position">
          <div style="display: inline-block;" class="txtF">X：</div>
          <input style="width: 40px;height: 30px;" v-model="left" class="form-control">
          <span>px</span>
        </div>
        <div style="width:96px; display: inline-block;margin-left: 1px;" class="label_position">
          <div style="display: inline-block;" class="txtF">Y：</div>
          <input style="width: 40px;height: 30px;" v-model="top" class="form-control">
          <span>px</span>
        </div>
      </div>
      <div style="width: 220px; margin: 0;" class="typeSelect">
        <div class="txtF">文字类型：</div>
        <div class="radio radio-custom radio-inline">
          <input v-model="propsData.editData.selectDataType" type="radio" :name="selectDataTypeName" :id="fixedTxt" value="fixedTxt" checked>
          <label :for="fixedTxt">
            固定文字
          </label>
        </div>
        <div class="radio radio-custom radio-inline">
          <input v-model="propsData.editData.selectDataType" type="radio" :name="selectDataTypeName" :id="dataStream" value="dataStream">
          <label :for="dataStream">
            数据流值
          </label>
        </div>
      </div>
      <div class="content" v-if="propsData.editData.selectDataType=='fixedTxt'">
        <div class="txtContent">
          <div class="txtF">文本内容：</div>
          <input style="width: 100%;" v-model="propsData.editData.labelContent" type="text" maxlength="25" class="form-control" />
        </div>
        <div class="txtContent">
          <div class="txtF">文本格式：</div>
          <div class="font_setting">
            <div class="fontSelect">
              <el-select v-model="propsData.editData.Style.fontSize" filterable clearable placeholder="字体大小">
                <el-option value="10">10px</el-option>
                <el-option value="12">12px</el-option>
                <el-option value="14">14px</el-option>
                <el-option value="16">16px</el-option>
                <el-option value="18">18px</el-option>
                <el-option value="20">20px</el-option>
                <el-option value="22">22px</el-option>
                <el-option value="24">24px</el-option>
              </el-select>
              <div class="others_setting" style="margin-top: 25px;">
                <a @click="changeFontWeight('Style')" class="B">B</a>
                <a @click="changeFontItalic('Style')" class="I">I</a>
                <a @click="changeFontUnderLine('Style')" class="U">U</a>
                <div style="display: inline-block;margin-left: 10px;">
                  <el-color-picker size="medium" v-model="propsData.editData.Style.color"></el-color-picker>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content" v-if="propsData.editData.selectDataType=='dataStream'">
        <div class="txtContent">
          <div class="txtF">选择数据流：</div>
          <!-- 如果是场景类的,则选择挂载设备 -->
          <el-select v-if='!propsData.IsEquipment' v-model="propsData.editData.dataStream.EquipmentId" filterable clearable placeholder="选择设备" @change='getProtocolList(true)'>
            <el-option v-for="(item, index) in relatedEquipment" :key="item.TerminalEquipmentId" :label="item.EquipmentAlias" :value="item.TerminalEquipmentId">
            </el-option>
          </el-select>
          <!-- 如果是设备类的,则选择可用设备 -->
          <el-select v-else v-model="propsData.editData.dataStream.EquipmentId" filterable clearable placeholder="选择设备" @change='getProtocolList(true)'>
            <el-option v-for="(item, index) in get_equipment_data" :key="item.EquipmentId" :label="item.EquipmentAlias" :value="item.EquipmentId">
            </el-option>
          </el-select>
          <el-select style="margin-top: 10px;" v-model="propsData.editData.dataStream.RegisterAddress" @change='changeUnitData()' filterable clearable placeholder="选择数据地址">
            <el-option v-for="(item, index) in myGetProtocolData" :key="index" :label="item.DisplayName" :value="item.RegisterAddress">
            </el-option>
          </el-select>
          <template v-if='!propsData.IsEquipment'>
            <div style="margin-top: 10px;margin-bottom: 10px">
              <span>是否重点数据：</span>
              <el-radio-group v-model="propsData.editData.IsMain">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </div>
            <template v-if='propsData.editData.IsMain==1'>
              <div class="txtF">重点数据别名：</div>
              <el-input :maxlength="25" v-model="propsData.editData.AliasName"></el-input>
            </template>
          </template>
        </div>
        <div class="txtContent">
          <div class="txtF">前置值：</div>
          <input style="width: 100%;" v-model="propsData.editData.PrePositionValue" type="text" maxlength="25" class="form-control" />
        </div>
        <div class="txtContent" style="display: none;">
          <div class="txtF">单位：</div>
          <el-select v-model="propsData.editData.PostPositionValue" filterable allow-create default-first-option placeholder="请选择单或输入位">
            <el-option v-for="(item, index) in unitData" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </div>
        <div class="txtContent">
          <div class="txtF">当数据无值时显示：</div>
          <input style="width: 100%;" v-model="propsData.editData.noDataVal" type="text" maxlength="25" class="form-control" />
        </div>
        <div class="txtF" style="text-align: center;margin-top: 15px; font-size: 16px; font-weight: bold; color: #607D8B;">字体格式设置</div>
        <div class="hr mb10" style="height: 2px;margin-bottom: 15px;"></div>
        <div class="txtContent" style="margin-top: 10px;">
          <el-select v-model="styleTypesVal" filterable clearable placeholder="样式设置选择">
            <el-option v-for="(item, index) in styleTypes" :key="index" :label="item" :value="index">
            </el-option>
          </el-select>
        </div>
        <div class="txtContent" v-if="styleTypesVal==0">
          <div class="font_setting">
            <div class="fontSelect">
              <div class="txtContent" style="margin-top: 10px;">
                <el-select v-model="propsData.editData.PrePositionStyle.fontSize" filterable clearable placeholder="字体大小">
                  <el-option value="10">10px</el-option>
                  <el-option value="12">12px</el-option>
                  <el-option value="14">14px</el-option>
                  <el-option value="16">16px</el-option>
                  <el-option value="18">18px</el-option>
                  <el-option value="20">20px</el-option>
                  <el-option value="22">22px</el-option>
                  <el-option value="24">24px</el-option>
                </el-select>
              </div>
              <div class="others_setting" style="margin-top: 25px;">
                <a @click="changeFontWeight('PrePositionStyle')" class="B">B</a>
                <a @click="changeFontItalic('PrePositionStyle')" class="I">I</a>
                <a @click="changeFontUnderLine('PrePositionStyle')" class="U">U</a>
                <div style="display: inline-block;margin-left: 10px;">
                  <el-color-picker size="medium" v-model="propsData.editData.PrePositionStyle.color"></el-color-picker>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="txtContent" v-if="styleTypesVal==1">
          <div class="font_setting">
            <div class="fontSelect">
              <div class="txtContent" style="margin-top: 10px;">
                <el-select v-model="propsData.editData.PostPositionStyle.fontSize" filterable clearable placeholder="样式设置选择">
                  <el-option value="10">10px</el-option>
                  <el-option value="12">12px</el-option>
                  <el-option value="14">14px</el-option>
                  <el-option value="16">16px</el-option>
                  <el-option value="18">18px</el-option>
                  <el-option value="20">20px</el-option>
                  <el-option value="22">22px</el-option>
                  <el-option value="24">24px</el-option>
                </el-select>
              </div>
              <div class="others_setting" style="margin-top: 25px;">
                <a @click="changeFontWeight('PostPositionStyle')" class="B">B</a>
                <a @click="changeFontItalic('PostPositionStyle')" class="I">I</a>
                <a @click="changeFontUnderLine('PostPositionStyle')" class="U">U</a>
                <div style="display: inline-block;margin-left: 10px;">
                  <el-color-picker size="medium" v-model="propsData.editData.PostPositionStyle.color"></el-color-picker>
                </div>
              </div>
            </div>
          </div>
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
import {
  testProtocol,
  deletePanel
} from 'src/assets/js/common/util';
import {
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  data() {
    return {
      relatedEquipment: [],//场景挂载设备列表
      //图片上传
      AccessToken: eosCommon.storage.get("AccessToken"),
      id: '',
      selectDataTypeName: '',
      fixedTxt: '',
      dataStream: '',
      EquipmentId: '',
      unitData: ['', '°C', 'kPa', 'mPa', '%', 'hr', 'V', 'KV', 'W', 'KW', 'A', 'KA', '△kPa'],
      styleTypes: ['数据名字体格式', '数据值字体格式'], //, '单位字体格式'
      styleTypesVal: 1,
      tempLabelContent: '',
      top: '',
      left: '',
      initSelectDataType: '',
      isEquip: false
    }
  },
  props: ['propsData', 'currentkey'],
  watch: {
    /*'propsData.editData.IsMain': function(val) {
      let vm = this
      if (vm.propsData.editData.IsMain==1&&vm.propsData.editData.AliasName=='') {
        
      }
    },*/
    'propsData.editData.selectDataType': function(val) {
      let vm = this;
      if (vm.initSelectDataType == `fixedTxt`) {
        if (val == `fixedTxt`) //如果是固定文本            
          vm.propsData.editData.labelContent = vm.tempLabelContent;
        else //否则           
          vm.propsData.editData.labelContent = `--`;
      } else if (vm.initSelectDataType == `dataStream`) {
        if (val == `fixedTxt`) //如果是固定文本
          vm.propsData.editData.labelContent = `文本内容...`;
        else //否则           
          vm.propsData.editData.labelContent = vm.tempLabelContent;
      }
    },
    top(val, oldval) {
      this.propsData.editData.layOutStyle.top = `${val}px`;
    },
    left(val, oldval) {
      this.propsData.editData.layOutStyle.left = `${val}px`;
    }
  },
  mounted() {
    let vm = this;
    vm.isEquip = vm.propsData.IsEquipment;
    // console.log(vm.propsData.IsEquipment)
    vm.initSelectDataType = vm.propsData.editData.selectDataType;
    let topPx = vm.propsData.editData.layOutStyle.top;
    let leftPx = vm.propsData.editData.layOutStyle.left;
    vm.top = topPx.substring(0, topPx.length - 2);
    vm.left = leftPx.substring(0, leftPx.length - 2);
    vm.tempLabelContent = vm.propsData.editData.labelContent;
    vm.EquipmentId = vm.propsData.editData.dataStream.EquipmentId;
    if (vm.isEquip) {
      if (vm.get_equipment_data.length == 0) {
        vm.gET_EQUIPMENT_DATA({
          isEquip: false,
          EquipmentList: vm.propsData.eqInfo
        });
      }
    } else {
      if (vm.initSelectDataType == 'dataStream') {
        vm.getProtocolList();
      }
      vm.GetAssemblageRelatedEquipment()
    }
    vm.id = `edit_${vm.propsData.refs}`;
    vm.selectDataTypeName = `selectDataTypeName${vm.propsData.refs}`;
    vm.fixedTxt = `fixedTxt${vm.propsData.refs}`;
    vm.dataStream = `dataStream${vm.propsData.refs}`;
    // console.log(vm.propsData)
  },
  computed: {
    ...mapGetters([
      "get_curr_TargetId",
      "get_protocol_data",
      "get_equipment_data",
      "get_STORE_protocol"
    ]),
    myGetProtocolData() {
      let vm = this;
      if (vm.isEquip)
        return vm.get_protocol_data;
      else
        return vm.propsData.protocolList;
    },
    testParams() {
      let vm = this;
      return [vm.get_STORE_protocol, vm.propsData.editData.dataStream.EquipmentId, 'others'];
    }
  },
  methods: {
    ...mapMutations({
      dELETE_LABEL: 'DELETE_CURR_PANEL',
      gETPROTOCOLDATA: 'GETPROTOCOLDATA',
      gET_EQUIPMENT_DATA: 'GET_EQUIPMENT_DATA',
      uPDATE_OPERATEMEMORY: 'UPDATE_OPERATEMEMORY',
      uPDATE_LOCAL: 'UPDATE_EQLIST'
    }),
    GetAssemblageRelatedEquipment(){
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
        vm.propsData.protocolList = res;
        if (isChange) {
          vm.propsData.editData.dataStream.RegisterAddress = '';
        }
        return;
      }
      let param = {
        "AccessToken": vm.AccessToken,
        "EquipmentId": vm.propsData.editData.dataStream.EquipmentId
      };
      let url = eosCommon.ENTERPRISE_API + "api/Equipment/QueryWorkProtocl";
      eosCommon.eosAjax(url, "get", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.uPDATE_LOCAL({
            updateType: 1,
            protocolList: {
              TerminalEquipmentId: vm.propsData.editData.dataStream.EquipmentId,
              ProtocalInfo: [...result.Data]
            }
          })
          let res = [...result.Data]
          vm.propsData.protocolList = res;
          vm.propsData.editData.dataStream.RegisterAddress = '';
        }
      });
    },
    changeUnitData() {
      let vm = this;
      let pro = vm.myGetProtocolData;
      let len = pro.length;
      for (let i = 0; i < len; i++) {
        if (pro[i].RegisterAddress == vm.propsData.editData.dataStream.RegisterAddress) {
          vm.propsData.editData.PrePositionValue = pro[i].DisplayName + ':';
          vm.propsData.editData.PostPositionValue = pro[i].Unit;
          vm.propsData.editData.labelContent = vm.propsData.editData.val + pro[i].Unit;
          vm.propsData.editData.AliasName = pro[i].DisplayName
          break;
        }
      }
    },
    changeFontWeight(styleType) {
      let fontWeight = this.propsData.editData[styleType].fontWeight;
      this.propsData.editData[styleType].fontWeight = fontWeight == 'bold' ? 'normal' : 'bold';
    },
    changeFontItalic(styleType) {
      let fontItalic = this.propsData.editData[styleType].fontItalic;
      this.propsData.editData[styleType].fontItalic = fontItalic == 'italic' ? 'normal' : 'italic';
    },
    changeFontUnderLine(styleType) {
      let fontUnderLine = this.propsData.editData[styleType].fontUnderLine;
      this.propsData.editData[styleType].fontUnderLine = fontUnderLine == 'underline' ? 'normal' : 'underline';
    },
    deleteCurrentPanel(event) {
      let vm = this;
      event.cancelBubble = true;
      deletePanel(this.propsData.refs);
      this.dELETE_LABEL({
        typeName: this.propsData.typeName,
        currenIndex: this.propsData.refs,
        isDeleteClick: true,
        isResetOperateMemory: false
      })
    }
  }
}

</script>

<style scoped="scoped" lang="less">
  .edit_panel {
    width: 280px;
    position: absolute;
    top: 0;
    right: 0px;
    /*height: 100%;*/
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
    .edit_content {
      padding: 15px;
      position: absolute;
      margin-top: 10px;
      top: 48px;
      bottom: 48px;
      right: 0;
      width: 100%;
      overflow: auto;
      .addDatablock {
        text-align: center;
        margin-top: 20px;
        .addDatablockWrap {
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
      .el-select {
        margin-top: 10px;
      }
      .titleName {
        margin-left: 58px;
        width: 188px;
      }
      .dataSetting_wrap {
        .dataSetting {
          /*padding: 20px 0;*/
          .info {
            position: relative;
            .infoFsp {
              display: inline-block;
              width: 230px;
              cursor: pointer;
              padding-left: 16px;
              transition: all ease 1s;
            }
            .ExpandBg {
              background: url(../../../../../../../static/css/images/new_drag/10.png) no-repeat left center;
            }
            .noExpandBg {
              background: url(../../../../../../../static/css/images/new_drag/11.png) no-repeat left center;
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
              background: url(../../../../../../../static/css/images/new_drag/12.png) no-repeat center;
            }
          }
        }
      }
      .colorSetting_wrap {
        display: inline-block;
        margin-top: 10px;
        position: relative;
        .colorSettingSpan {
          display: block;
          position: absolute;
          top: 1px;
          height: 30px;
          line-height: 30px;
        }
        .colorSettingPiker {
          margin-left: 115px;
        }
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
    & .operations {
      width: 100%;
      height: 48px;
      border-bottom: 1px solid #eaedef;
      background: #eef6f6;
      position: absolute;
      bottom: 0;
      /*right: 10;
			bottom: 0;*/
      /*z-index: 101;*/
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
  <!--propsData.editPanelPropsData.editClass-->
  <div :id="id" class="edit_panel" :class="{isEquipClass:isEquip==true}">
    <h3 class="edit_panel_name">数据块设置</h3>
    <div class="edit_content my_edit_chart">
      <!--:style="propsData.editPanelPropsData.editPanelClass"-->
      <div class="selectHeader clearfix">
        <a class="pull-left" :class="{aActive:currEdit=='dataSetting'}" @click="toggleSetting('dataSetting')">数据源设置</a>
        <a class="pull-left" :class="{aActive:currEdit=='styleSetting'}" @click="toggleSetting('styleSetting')">控件样式设置</a>
      </div>
      <div v-show="currEdit=='dataSetting'" class="colorSetting_wrap"> <span class="fontStyle colorSettingSpan" style="">标题名：</span>
        <el-input class='titleName' size='small' v-model="propsData.title" placeholder="标题名"></el-input>
        <!--<el-color-picker v-model="propsData.editData.datablockTitleBg" class="colorSettingPiker" ></el-color-picker>-->
      </div>
      <div v-for="(item,index) in datablockData" class="setting_wrap">
        <div class="dataSetting_wrap">
          <div v-show="currEdit=='dataSetting'" class="dataSetting">
            <div class="myHr"></div>
            <div class="info"> <span class="fontStyle infoFsp" :class="[currentDatablock==('数据'+index) ? ExpandBg : noExpandBg]" @click="toggleDatablock(index)">数据{{index+1}}：</span> <span v-if="datablockData.length>1" @click="deleteDatablock(index)" class="deleteDatablock infoSsp"></span> </div>
            <single-datablock v-show="currentDatablock=='数据'+index"  :datablockData="datablockData" :isEquip="isEquip" :indexs="index" :item="item"> </single-datablock>
          </div>
        </div>
      </div>
      <div v-show="currEdit=='styleSetting'" class="styleSetting">
        <div class="colorSetting_wrap"> <span class="fontStyle colorSettingSpan" style="">控件背景颜色：</span>
          <el-color-picker v-model="propsData.editData.datablockBg" class="colorSettingPiker"></el-color-picker>
        </div>
        <div class="colorSetting_wrap"> <span class="fontStyle colorSettingSpan" style="">标题栏背景颜色：</span>
          <el-color-picker v-model="propsData.editData.datablockTitleBg" class="colorSettingPiker"></el-color-picker>
        </div>
        <div class=" mt-10"> <span class="fontStyle">标题字体样式：</span> </div>
        <el-select v-model="propsData.editData.Style.fontSize" style="width: 100%;" size="small" filterable clearable placeholder="字体大小">
          <el-option value="10">10px</el-option>
          <el-option value="20">20px</el-option>
          <el-option value="30">30px</el-option>
        </el-select>
        <div class="others_setting mt-10">
          <div class="fontStyleSetting">
            <a @click="changeFontWeight('Style')" class="B">B</a>
            <a @click="changeFontItalic('Style')" class="I">I</a>
            <a @click="changeFontUnderLine('Style')" class="U">U</a>
          </div>
          <el-color-picker v-model="propsData.editData.Style.color" class="colorSettingPiker"></el-color-picker>
        </div>
      </div>
      <div v-if="currEdit=='dataSetting'" class="addDatablock">
        <div @click="addDatablock()" class="addDatablockWrap"> <img src="static/css/images/new_drag/13.png" />
          <div class="fontStyle"> 添加数点 </div>
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
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import singleDatablock from './singleDatablock'
  import {deletePanel } from 'src/assets/js/common/util';	  
  export default {
    data() {
      return {
        id: '',
        AccessToken: eosCommon.storage.get( "AccessToken" ),
        currEdit: 'dataSetting',
        noExpandBg: 'noExpandBg',
        ExpandBg: 'ExpandBg',
        currentDatablock: '数据0',
        getProtocolData: [],
        datablockData: [],
        isEquip: false,
        EquipmentId: ''
      }
    },
    props: [ 'propsData', 'currentkey' ],
    watch: {},
    mounted() {
      let vm = this;
      vm.isEquip = vm.propsData.IsEquipment;
      let len = vm.get_equipment_data.length;
      vm.id = "edit_" + vm.propsData.refs
      vm.datablockData = vm.propsData.singleDatablockLists;
      if( vm.isEquip ) {
        vm.EquipmentId = vm.propsData.eqInfo[ 0 ].EquipmentId;
        if( len == 0 ) vm.gET_EQUIPMENT_DATA( {
        	isEquip:false,
          EquipmentList: this.propsData.eqInfo
        } );
        for( let val of vm.datablockData ) {       	
          val.get_equipment_data = vm.propsData.eqInfo;
        }
      }
    },
    computed: { ...mapGetters( [ "get_protocol_data", "get_equipment_data", 'get_line_ID' ] )
    },
    components: {
      singleDatablock
    },
    methods: { ...mapMutations( {
        gETPROTOCOLDATA: 'GETPROTOCOLDATA',
        gET_EQUIPMENT_DATA: 'GET_EQUIPMENT_DATA',
        uPDATE_OPERATEMEMORY: 'UPDATE_OPERATEMEMORY',
        uPDATE_LINE_ID: 'UPDATE_LINE_ID',
        dELETE_DATABLOCK: 'DELETE_CURR_PANEL'
      } ),
      toggleSetting( tab ) {
        this.currEdit = tab;
      },
      toggleDatablock( index ) {
        this.currentDatablock = '数据' + index;
      },
      deleteDatablock( index ) {
        let vm = this;
        vm.datablockData.splice( index, 1 );
      },
      addDatablock() {
        let vm = this;
        vm.uPDATE_LINE_ID( {
          isReset: false
        } );
        let lineID = vm.get_line_ID;
        let singleChartSettingData = {
          get_equipment_data: vm.get_equipment_data,
          get_protocol_data: [],
          protocolList:[],
          lineID: lineID,
          dataStream: {
            RegisterAddress: '',
            EquipmentId: vm.EquipmentId
          },
          dataName: '',
          IsMain: 0,
          AliasName: '',
          dataValue: '--',
          Unit: '',
          valContent: '',
          PrePositionStyle: {
            fontSize: '12',
            color: '#1F2D3D',
            fontWeight: 'normal',
            fontItalic: 'normal',
            fontUnderLine: 'normal',
            AlignType: 1
          },
          PostPositionStyle: {
            fontSize: '12',
            color: '#1F2D3D',
            fontWeight: 'normal',
            fontItalic: 'normal',
            fontUnderLine: 'normal',
            AlignType: 1
          }
        }
        vm.datablockData.push( singleChartSettingData );
        vm.currentDatablock = '数据' + ( vm.datablockData.length - 1 );
      },
      changeFontWeight( styleType ) {
        let fontWeight = this.propsData.editData[ styleType ].fontWeight;
        this.propsData.editData[ styleType ].fontWeight = fontWeight == 'bold' ? 'normal' : 'bold';
      },
      changeFontItalic( styleType ) {
        let fontItalic = this.propsData.editData[ styleType ].fontItalic;
        this.propsData.editData[ styleType ].fontItalic = fontItalic == 'italic' ? 'normal' : 'italic';
      },
      changeFontUnderLine( styleType ) {
        let fontUnderLine = this.propsData.editData[ styleType ].fontUnderLine;
        this.propsData.editData[ styleType ].fontUnderLine = fontUnderLine == 'underline' ? 'none' : 'underline';
      },
      deleteCurrentPanel( event ) {
      	let vm=this;
        event.cancelBubble = true;
				deletePanel(vm.propsData.refs);
        vm.dELETE_DATABLOCK( {
          typeName: vm.propsData.typeName,
          currenIndex: vm.propsData.refs,
          isDeleteClick: true,
          isResetOperateMemory: false
        } )
      }
    }
  }
</script>
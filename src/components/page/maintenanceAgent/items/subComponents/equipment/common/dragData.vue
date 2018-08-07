<style lang="less" src="assets/css/dragStyle/equipDrag.less" scoped="scoped"> 
</style>
<template>
  <div class="ovh dragData_wrap">
    <div class="dataHeader">
      <ul class="headerSelect clearfix">
        <li @click="toggleHeader('dragPanel',true)" :class="{seTitleActive:currHeaderSelected=='dragPanel'}" class="seTitle pull-left">图示数据</li>
        <li v-if="!get_curr_setting" @click="toggleHeader('tablePanel',true)" :class="{seTitleActive:currHeaderSelected=='tablePanel'}" class="seTitle pull-left">列表数据</li>
        <li :class="{settingBlanks:get_curr_setting==true}" class="blanks pull-left">
          <div v-if="currHeaderSelected=='dragPanel'" class="funLists">
            <ul v-if="get_curr_setting" class="clearfix" style="width: 100%; height: 40px; padding: 5px 0px;">
              <li class="pull-left"> <img draggable="true" title="图片" class="img" src="static/css/images/drag/1.png" id="icon_upLoadImg" /> </li>
              <li class="pull-left"> <img draggable="true" title="文本" class="img" src="static/css/images/drag/2.png" id="icon_label" /> </li class="pull-left">
              <li class="pull-left"> <img draggable="true" title="曲线" class="img" src="static/css/images/new_drag/3.png" id="icon_chart" /> </li>
              <li class="pull-left"> <img draggable="true" title="仪表盘" class="img" src="static/css/images/new_drag/4.png" id="icon_dashboard" /> </li>
              <li class="pull-left"> <img draggable="true" title="数据块" class="img" src="static/css/images/new_drag/5.png" id="icon_datablock" /> </li>
              <li class="pull-left"> <img draggable="true" title="状态" class="img" src="static/css/images/new_drag/6.png" id="icon_datastate" /> </li>
              <ul class="right_operations pull-right">
                <li class="pull-right"> <img @click="confirmClose()" title="关闭" class="img" src="static/css/images/drag/7.png" id="icon_close" /> </li>
                <li class="pull-right"> <img @click="confirmGiveUp()" title="放弃" class="img" src="static/css/images/drag/6.png" id="icon_give_up" /> </li>
                <li class="pull-right"> <img @click="saveAllDragDatas()" title="保存" class="img" src="static/css/images/drag/5.png" id="icon_save" /> </li>
              </ul>
            </ul>
            <ul v-if="!get_curr_setting && isShowDebugBtnByRole_PJ" class="pull-right" style="margin-bottom: 0;"> <span class="pull-left btn_wrap">
	    			<button @click='comeToEdit()' style="padding-top: 5px; padding-bottom: 5px;border: 1px solid #E2E6E9;font-size: 12px;" id="btnInsert" type="button" class="btn fullScreen" >
		                <i style="margin-left: 0;" class="fa  fa-cog m-r-5"></i>配置
		            </button>
		        </span> <span class="pull-left btn_wrap">
		            <button style="margin-right: 15px; font-size: 12px;padding-top: 5px; padding-bottom: 5px;border: 1px solid #E2E6E9;"  @click='intoFullScreen()' id="btn_t" type="button" class="btn fullScreen"  >
		                <i class="fa fa-arrows"></i>
		            </button>
		      	</span> </ul>
            <div id="freshTimeSetting" class="clearfix pull-right" v-show="!get_curr_setting">
              <div class="timerSetting pull-left"> 
              	<span style="margin-right: 10px;" class="freshTimeSettingSpan">刷新频率：</span> 
              	<span class="freshTimeSettingDataSpan">{{get_freshTime_Data.Rate}}</span> 
              	<span style="padding: 0 5px;" class="freshTimeSettingSpan">秒</span>
                <span v-if="isShowDebugBtnByRole_PJ" style="" class="btn_wrap">
			            <button style="margin: 0px;margin-bottom:3px;border: 1px solid #E2E6E9;"  @click='freshTimeSetting()' id="btn_t" type="button" class="btn fullScreen"  >
			                <i class="fa fa-cog"></i>
			            </button>
	      				</span> 
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <running-data :propsData="propsData" v-if="currHeaderSelected=='tablePanel'"></running-data>
    <div v-if="currHeaderSelected=='dragPanel'" class="main_contents_wrap" style="position: absolute;width: 100%; top: 40px;bottom: 0;overflow: auto; ">
      <div class="main_contents" v-loading='get_dragDataState.isDragDetalLoading' style="height: 100%; position: relative;">
        <!--v-loading='get_dragDataState.isDragDetalLoading'-->
        <div v-if="(!get_curr_setting) && (!get_curr_isPreview)&& get_curr_isHasData" class="drag_panel_content" style="position: relative; min-height:600px">
          <div class="noDataimg"> <img src="static/css/images/drag/noSettingPage.png" />
            <p>未配置显示界面</p>
          </div>
        </div>
        <div v-if="get_curr_isPreview" class="drag_panel_content droptarget" style="position: relative;">
          <div v-bind:class="{bgC:get_curr_setting}" class="drag_region">
            <common-drag v-for="(item,index) in get_upLoad_img_data" :propsData="item" :key="item.refs" ref="wraps_upLoadImg">
              <div class="content" style="position: relative;">
                <div class="imgss">
                  <h2 class="typeTips" v-if="!item.editData.imgUrl">请先上传图片</h2> <img v-if="item.editData.imgUrl" style="margin: 0 auto; width: 100%; height: 100%;" :src="item.editData.imgUrl" class="avatar" /> </div>
              </div>
            </common-drag>
            <common-drag v-for="(item,index) in get_label_data" :propsData="item" :key="item.refs" ref="wraps_label">
              <div class="content" style="position: relative; height: 100%;">
                <div class="imgss" style="height: 100%;">
                  <common-label :item="item"></common-label>
                </div>
              </div>
            </common-drag>
            <common-drag v-for="(item,index) in get_chart_data" :propsData="item" :key="item.refs" ref="wraps_chart">
              <div class="content" style="position: relative; height: 100%;">
                <div class="imgss" style="height: 100%;width: 100%;;">
                  <common-chart :propsData="item"></common-chart>
                </div>
              </div>
            </common-drag>
            <common-drag v-for="(item,index) in get_dashboard_data" :propsData="item" :key="item.refs" ref="wraps_dashboard">
              <div class="content" style="position: relative; height: 100%;">
                <div class="imgss" style="height: 100%;width: 100%;;">
                  <!--仪表盘-->
                  <common-dashboard :propsData="item"></common-dashboard>
                </div>
              </div>
            </common-drag>
            <common-drag v-for="(item,index) in get_datablock_data" :propsData="item" :key="item.refs" ref="wraps_datablock">
              <div class="content" style="position: relative; height: 100%;">
                <div class="imgss" style="height: 100%;width: 100%;;">
                  <common-datablock :propsData="item"></common-datablock>
                </div>
              </div>
            </common-drag>
            <common-drag v-for="(item,index) in get_datastate_data" :propsData="item" :key="item.refs" ref="wraps_datastate">
              <div class="content" style="position: relative; height: 100%;">
                <div class="imgss" style="height: 100%;width: 100%;;">
                  <!--状态控件-->
                  <common-datastate :propsData="item"></common-datastate>
                </div>
              </div>
            </common-drag>
            <common-dialog v-if="get_ctrData.dialogVisible"></common-dialog>
          </div>
        </div>
      </div>
    </div>
    <edit_uploadimg v-for="(item,index) in get_upLoad_img_data" :propsData="item" :key="item.refs" :currentkey="index"> </edit_uploadimg>
    <edit_label v-for="(item,index) in get_label_data" :propsData="item" :key="item.refs" :currentkey="index"> </edit_label>
    <edit_chart v-for="(item,index) in get_chart_data" :propsData="item" :key="item.refs" :currentkey="index"> </edit_chart>
    <edit_datablock v-for="(item,index) in get_datablock_data" :propsData="item" :key="item.refs" :currentkey="index"> </edit_datablock>
    <edit_dashboard v-for="(item,index) in get_dashboard_data" :propsData="item" :key="item.refs" :currentkey="index"> </edit_dashboard>
    <edit_datastate v-for="(item,index) in get_datastate_data" :propsData="item" :key="item.refs" :currentkey="index"> </edit_datastate>
  </div>
</template>
<script>
  import * as Common from 'src/assets/js/common';
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    getStyle,
    getWinSize,
    copyArr,
    showNowBorder
  } from 'src/assets/js/common/util.js';
  import commonDrag from '../../../common/drag/commonDrag'
  import edit_uploadimg from '../../../common/drag/edit_upLoadImg'
  import edit_label from '../../../common/drag/edit_label'
  import edit_chart from '../../../common/drag/edit_chart'
  import commonChart from '../../../common/drag/commonChart'
  import edit_datablock from '../../../common/drag/edit_datablock'
  import commonDatablock from '../../../common/drag/commonDatablock'
  import edit_dashboard from '../../../common/drag/edit_dashboard'
  import commonDashboard from '../../../common/drag/commonDashboard'
  import commonLabel from '../../../common/drag/commonLabel'
  import edit_datastate from '../../../common/drag/edit_datastate'
  import commonDatastate from '../../../common/drag/commonDatastate'
  import runningData from './runningData.vue'
  import commonDialog from '../../../common/drag/commonDialog'
  let FUNC = Common.Func
  export default {
    data() {
      return {
        currHeaderSelected: 'dragPanel',
        AccessToken: eosCommon.storage.get("AccessToken"),
        TargetId: '',
        AssemblageDetail: [],
        AssemblageDynamicData: [],
        //保存数据
        Texts: [],
        Images: [],
        Graphs: [],
        TextGroups: [],
        Dashboards: [],
        StateGraphs: [],
        //数据处理
        typeDatas: ['get_upLoad_img_data', 'get_label_data', 'get_chart_data', 'get_datablock_data', 'get_dashboard_data', 'get_datastate_data'],
        isItemListInto: false,
        hasMakeFreshTime: false,
        timer: null,
        changeEQUIP: false,
        isFullScreen: false,
        isDataChange: false,
        isReback: false,
        isMenuChange: false,
        isShowDebugBtnByRole_PJ: false,
        isClick: false,
        dragPosReduceLeft:310,
        dragPosReduceTop:180
      }
    },
    components: {
      commonDrag,
      edit_uploadimg,
      edit_label,
      edit_chart,
      commonChart,
      edit_datablock,
      commonDatablock,
      edit_dashboard,
      commonDashboard,
      commonLabel,
      edit_datastate,
      commonDatastate,
      runningData,
      commonDialog
    },
    props: ['propsData', 'operateType', 'isAddDrag'],
    watch: {
      "get_freshTime_Data.Time" (val, oldVal) {
        this.isDataChange = true;
        setTimeout(() => {
          this.isDataChange = false;
        }, 500);
      },
      currHeaderSelected(val, oldval) {},
      'operateType.reBackClickFlag' (val, oldval) {
        if(val == 2) {
          //提示进入保存 
          this.isReback = true;
          this.confirmClose();
        }
      },
      'operateType.mChangeState' (val, oldval) {
        //console.log('改变菜单：',val);
        if(val == 1) {
          this.isMenuChange = true;
          this.confirmClose();
        }
      },
      'propsData.EquipmentId' (val, oldval) {
        let vm = this;
        vm.isClick = false;
        let isEx = vm.propsData.IsExperienceProject
        let isSelf = eosCommon.storage.get('IsSelfProject');
        vm.isShowDebugBtnByRole_PJ = FUNC.operator.operateRoleFilter(Number(isEx), Number(isSelf));
        vm.uPDATE_EXPOSELF({
          expOself: vm.isShowDebugBtnByRole_PJ
        });
        if(vm.currHeaderSelected != 'dragPanel') {
          vm.TargetId = val;
          return;
        }
        vm.changeEQUIP = true;
        vm.getObjId(val);
      },
      hasMakeFreshTime(val, oldval) {
        this.QueryAssemblageDetail();
      },
      get_isAddDrag_state(val, oldval) {
        if(val) {
          let vm = this;
          vm.$nextTick(() => {
            vm.handlePositionData(vm.get_isAddDrag_data.type,
              vm.get_isAddDrag_data.currTypeID,
              vm.get_isAddDrag_data.L,
              vm.get_isAddDrag_data.T,
              vm.get_isAddDrag_data.refs
            );
            vm.uPDATE_REFS();
          })
        }
      }
   
    },
    computed: { ...mapGetters(['get_dragDataState', 'get_ctrData', 'isShowSideBar', 'get_upLoad_img_ID', 'get_label_ID', 'get_chart_ID', 'get_line_ID', 'get_datablock_ID', 'get_datastate_ID', 'get_curr_setting', 'get_curr_isPreview', 'get_upLoad_img_data', 'get_label_data', 'get_chart_data', 'get_datablock_data', 'get_dashboard_data', 'get_datastate_data', 'get_curr_TargetId', 'get_tempDrag_Datas', 'get_freshTime_Data', 'get_isAddDrag_state', 'get_curr_isHasData', 'get_isAddDrag_data', 'get_isDeleteClick_state'])
    },
    beforeDestroy() {
      let vm = this;
      clearInterval(eosCommon.timer);
      vm.clearAllDrag();
    },
    mounted() {
      let vm = this;
      vm.uPDATE_CTRDATA({
        dialogVisible: false,
        EquipmentId: '',
        valContent: '',
        Status: [],
        DisplayName: '',
        finiedDialogVisi: false
      });
	    let isEx = vm.propsData.IsExperienceProject
	    let isSelf = eosCommon.storage.get('IsSelfProject');
	    vm.isShowDebugBtnByRole_PJ = FUNC.operator.operateRoleFilter(Number(isEx), Number(isSelf));
      vm.TargetId = vm.propsData.EquipmentId;
      vm.uPDATE_SETTING_STATE({
        curr_setting_state: false,
        isPreview: true,
        targetId: vm.TargetId,
        isHasData: false
      });
      if(vm.TargetId) {
        vm.QueryAssemblageDetail();
      }
    },
    methods: { ...mapMutations({
        uPDATETEMPDATA: 'UPDATETEMPDATA',
        uPDATE_SETTING_STATE: 'UPDATE_SETTING_STATE',
        uPDATE_IMG_ID: 'UPDATE_IMG_ID',
        uPDATE_LABEL_ID: 'UPDATE_LABEL_ID',
        //底图
        uPDATE_UPLOAD_IMG: 'UPDATE_UPLOAD_IMG',
        //文本
        uPDATE_LABEL: 'UPDATE_LABEL',
        uPDATE_FRESHTIME_DATA: 'UPDATE_FRESHTIME_DATA',
        uPDATE_REFS: 'UPDATE_REFS',
        dELETE_LABEL: 'DELETE_CURR_PANEL',
        //曲线
        uPDATE_CHART_ID: 'UPDATE_CHART_ID',
        uPDATE_LINE_ID: 'UPDATE_LINE_ID',
        uPDATE_DATABLOCK_ID: 'UPDATE_DATABLOCK_ID',
        uPDATE_DATABLOCK: 'UPDATE_DATABLOCK',
        uPDATE_CHART: 'UPDATE_CHART',
        uPDATE_CHARTCURRENTDATA: 'UPDATE_CHARTCURRENTDATA',
        uPDATE_DATABLOCKCURRENTDATA: 'UPDATE_DATABLOCKCURRENTDATA',
        uPDATE_DASHBOARD_ID: 'UPDATE_DASHBOARD_ID',
        uPDATE_DASHBOARD: 'UPDATE_DASHBOARD',
        uPDATE_DATASTATE_ID: 'UPDATE_DATASTATE_ID',
        uPDATE_DATASTATE: 'UPDATE_DATASTATE',
        uPDATE_CTRDATA: 'UPDATE_CTRDATA',
        uPDATE_EXPOSELF: 'UPDATE_EXPOSELF',
        gETPROTOCOLDATA: 'GETPROTOCOLDATA',
        uPDATE_DRAGDATA_STATE: 'UPDATE_DRAGDATA_STATE'
      }),
      clearAllDrag() {
        let vm = this;
        vm.uPDATE_UPLOAD_IMG({
          isClear: true,
          imgDatas: []
        });
        vm.uPDATE_LABEL({
          isClear: true,
          isFreshLabel: false,
          labelDatas: []
        });
        vm.uPDATE_CHART({
          isClear: true,
          isFreshChart: false,
          chartDatas: []
        });
        vm.uPDATE_DATABLOCK({
          isClear: true,
          isFreshDatablock: false,
          datablockDatas: []
        });
        vm.uPDATE_DASHBOARD({
          isClear: true,
          isFreshDashboard: false,
          dashboardDatas: []
        });
        eosCommon.storage.set('storageType', '');
        this.uPDATE_SETTING_STATE({
          curr_setting_state: false,
          isPreview: false,
          targetId: '',
          isHasData: false
        });
      },
      getProtocolList(resolve, reject) {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "EquipmentId": vm.TargetId
        };
        let url = eosCommon.ENTERPRISE_API + "api/Equipment/QueryWorkProtocl";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.gETPROTOCOLDATA({
              protocolList: result.Data
            });
            resolve();
          }
        });
      },
			getProtocols() {
        return new Promise(this.getProtocolList);
      },
      toggleHeader(tab, isClick) {
        let vm = this;
        vm.isClick = isClick;
        if(tab == 'tablePanel') {
          clearInterval(eosCommon.timer);
        } else {
          vm.getObjId(vm.TargetId);
        }
        vm.currHeaderSelected = tab;
      },
      handlePositionData(type, currTypeID, L, T, refs) {
        let vm = this;
        vm.$nextTick(() => {
          for(let i = 0; i < vm.$refs[`wraps_${type}`].length; i++) {
            if(vm.$refs[`wraps_${type}`][i].$el.id == `wrap_${type}${currTypeID}`) {
                vm.$refs[`wraps_${type}`][i].$el.style.left = L - vm.dragPosReduceLeft + 'px';
              vm.$refs[`wraps_${type}`][i].$el.style.top = T - vm.dragPosReduceTop + 'px';
            }
          }
          showNowBorder(refs);
        });
      },
      intoFullScreen() {
        window.open("/#/full_page_?TargetId=" + this.get_curr_TargetId + '&IsEquipment=true')
      },
      getObjId(id) {
        let vm = this;
        if(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
          vm.TargetId = id;       
          eosCommon.storage.set('storageType', '');
          vm.QueryAssemblageDetail();
          vm.uPDATE_SETTING_STATE({
            curr_setting_state: false,
            isPreview: true,
            targetId: vm.get_curr_TargetId,
            isHasData: true
          });
          vm.changeEQUIP = false;
          return;
        }
        vm.$confirm('部分操作暂未保存, 是否保存所有操作后再关闭?', '提示', {
          confirmButtonText: '先保存',
          cancelButtonText: '直接关闭',
          type: 'warning',
          isCustomClose: true,
          closeOnClickModal: false
        }).then(() => {
          //确定操作
          vm.TargetId = id;
          vm.saveAllDragDatas();
        }).catch(() => {
          if(vm.TargetId == id) {
            return false;
          }
          vm.TargetId = id;
          eosCommon.storage.set('storageType', '');
          vm.QueryAssemblageDetail();
          vm.uPDATETEMPDATA({
            isClear: true,
            data: 'giveUp'
          });
          vm.uPDATE_SETTING_STATE({
            curr_setting_state: false,
            isPreview: true,
            targetId: vm.get_curr_TargetId,
            isHasData: true
          });
          vm.dELETE_LABEL({
            typeName: '',
            currenIndex: '',
            isDeleteClick: false,
            isResetOperateMemory: true
          });
          vm.changeEQUIP = false;
        })
      },
      freshTimeSetting() {
        let vm = this;
        vm.$prompt('刷新时间(秒):', '设置刷新频率', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[5-9]$|^[1-9]\d{1,2}$|1000$/,
          inputValue: vm.get_freshTime_Data.Rate,
          inputErrorMessage: '刷新时间不能为空且为不小于5且不大于1000的整数'
        }).then(({
          value
        }) => {
          vm.SetAssemblageDataRate(value);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消操作'
          });
        });
      },
      SetAssemblageDataRate(val) {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "IsEquipment": true,
            "TargetId": vm.get_curr_TargetId,
            "Rate": val
          }
        };
        let url = eosCommon.ENTERPRISE_API + "api/Assemblage/SetAssemblageDataRate";
        eosCommon.eosAjax(url, "POST", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.hasMakeFreshTime = !vm.hasMakeFreshTime;
            //clearInterval(vm.timer)
            vm.$message({
              type: 'success',
              message: '设置成功！'
            });
          }
        });
      },
      confirmClose() {
        let vm = this
        if(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
          vm.uPDATE_SETTING_STATE({
            curr_setting_state: false,
            isPreview: true,
            targetId: vm.get_curr_TargetId,
            isHasData: true
          });
          clearInterval(eosCommon.timer);
          eosCommon.timer = setInterval(() => {
            vm.QueryAssemblageDynamicData();
          }, vm.get_freshTime_Data.Rate * 1000);
          return;
        }
        vm.$confirm('部分操作暂未保存, 是否保存所有操作后再关闭?', '提示', {
          confirmButtonText: '先保存',
          cancelButtonText: '直接关闭',
          type: 'warning',
          isCustomClose: true,
          closeOnClickModal: false
        }).then(() => {
          //确定操作

          vm.saveAllDragDatas();
        }).catch(() => {
          vm.clearStorageTempDragData();
          vm.uPDATE_SETTING_STATE({
            curr_setting_state: false,
            isPreview: true,
            targetId: vm.get_curr_TargetId,
            isHasData: true
          });
          if(vm.isReback) {
            vm.operateType.reBackClickFlag = 3;
          }
          if(vm.isMenuChange) {
            vm.operateType.mChangeState = 2;
          }
        })
      },
      confirmGiveUp() {
        let vm = this
        if(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
          return;
        }
        vm.$confirm('部分操作暂未保存, 是否继续放弃操作?', '提示', {
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          //确定操作
          vm.giveUpTempDragDatas();
        }).catch(() => {})
      },
      giveUpTempDragDatas() {
        let vm = this;
        vm.clearStorageTempDragData();
      },
      clearStorageTempDragData() {
        let vm = this;
        let tempStorageStr = eosCommon.storage.get('storageType');
        let tempStorageArr = tempStorageStr.split(',');
        let len = tempStorageArr.length;
        let len1 = vm.get_tempDrag_Datas.length;
        for(let j = 0; j < len1; j++) {
          for(let i = 0; i < len; i++) {
            if(vm.get_tempDrag_Datas[j] == tempStorageArr[i]) {
              tempStorageArr.splice(i, 1);
            }
          }
        }
        tempStorageStr = tempStorageArr.join(',');
        eosCommon.storage.set('storageType', tempStorageStr);
        vm.uPDATETEMPDATA({
          isClear: true,
          data: 'giveUp'
        });
        vm.dELETE_LABEL({
          typeName: '',
          currenIndex: '',
          isDeleteClick: false,
          isResetOperateMemory: true
        });
      },
      comeToEdit() {
        let vm = this;
        clearInterval(eosCommon.timer);
        vm.uPDATE_SETTING_STATE({
          curr_setting_state: true,
          isPreview: true,
          targetId: vm.get_curr_TargetId,
          isHasData: true
        });
      },
      async QueryAssemblageDetail(saveSetting) {
        let vm = this;
        vm.clearAllDrag();
      	await vm.getProtocols();
        vm.uPDATE_DRAGDATA_STATE({
          isObjListLoading: false,
          isDragDetalLoading: true
        });
        let param = {
          "AccessToken": vm.AccessToken,
          "IsEquipment": true,
          "TargetId": vm.TargetId
        };
        let url = eosCommon.ENTERPRISE_API + "api/Assemblage/QueryAssemblageDetail";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.uPDATE_DRAGDATA_STATE({
              isObjListLoading: false,
              isDragDetalLoading: false
            });
            vm.AssemblageDetail = result.Data;

            vm.uPDATE_FRESHTIME_DATA({
              Rate: result.Data.Rate,
              Time: vm.get_freshTime_Data.Time
            });
            let DefaultValues = vm.AssemblageDetail.DefaultValues;
            let imgDatasArr = [];
            let chartDatasArr = [];
            let labelDatasArr = [];
            let datablockDatasArr = [];
            let dashboardDatasArr = [];
            let datastateDatasArr = [];
            if(DefaultValues.Image.length == 0 && DefaultValues.Text.length == 0 && DefaultValues.Graph.length == 0 && DefaultValues.TextGroups.length == 0 && DefaultValues.Dashboard.length == 0 && DefaultValues.StateGraphs.length == 0) {
              //未配置数据get_curr_TargetId
              vm.uPDATE_SETTING_STATE({
                curr_setting_state: false,
                isPreview: false,
                targetId: vm.TargetId,
                isHasData: true
              });
              vm.uPDATE_UPLOAD_IMG({
                isClear: true,
                imgDatas: imgDatasArr
              });
              vm.uPDATE_LABEL({
                isClear: true,
                isFreshLabel: false,
                labelDatas: labelDatasArr
              });
              vm.uPDATE_CHART({
                isClear: true,
                isFreshChart: false,
                chartDatas: chartDatasArr
              });
              vm.uPDATE_DATABLOCK({
                isClear: true,
                isFreshDatablock: false,
                datablockDatas: datablockDatasArr
              });
              vm.uPDATE_DASHBOARD({
                isClear: true,
                isFreshDashboard: false,
                dashboardDatas: dashboardDatasArr
              });
              vm.uPDATE_DATASTATE({
                isClear: true,
                isFreshDatastate: false,
                datastateDatas: datastateDatasArr
              });
              if(vm.isClick) {
                return;
              }
              vm.toggleHeader('tablePanel', false);
            } else {
              //console.log('有数据了');
              //展示数据							
              vm.uPDATE_SETTING_STATE({
                curr_setting_state: false,
                isPreview: true,
                targetId: vm.TargetId,
                isHasData: true
              });
              let imgLen = DefaultValues.Image.length;
              let chartLen = DefaultValues.Graph.length;
              let labelLen = DefaultValues.Text.length;
              let datablockLen = DefaultValues.TextGroups.length;
              let dashboardLen = DefaultValues.Dashboard.length;
              let datastateLen = DefaultValues.StateGraphs.length;
              if(imgLen > 0) { //图片有数据
                for(let i = 0; i < imgLen; i++) {
                  let currImgID = vm.get_upLoad_img_ID;
                  let newLayOutStyle = DefaultValues.Image[i].Layout;
                  let imgUrl = DefaultValues.Image[i].Value;
                  let ResoureId = DefaultValues.Image[i].ResoureId;
                  imgDatasArr.push({
                    typeName: `upLoadImg`,
                    IsEquipment: true,
                    openScenePic: false,
                    openEquiPic: false,
                    Type: DefaultValues.Image[i].Type,
                    refs: DefaultValues.Image[i].Id,
                    title: '底图',
                    previewData: {},
                    editData: {
                      imgUrl: imgUrl,
                      ResoureId: ResoureId,
                      layOutStyle: JSON.parse(newLayOutStyle)
                    }

                  })
                }
              }
              if(labelLen > 0) {
                for(let i = 0; i < labelLen; i++) {
                  let labelLength = vm.get_label_data.length;
                  let currLabelID = vm.get_label_ID;
                  let selectDataType = DefaultValues.Text[i].Type == '1' ? 'fixedTxt' : 'dataStream';
                  let labelContent = '';
                  if(selectDataType == 'fixedTxt') {
                    labelContent = DefaultValues.Text[i].DefaultValue;
                  } else {
                    labelContent = DefaultValues.Text[i].Value + DefaultValues.Text[i].PostPositionValue;
                  }
                  let fontWeight = DefaultValues.Text[i].Style.IsBold == '0' ? 'normal' : 'bold';
                  let fontItalic = DefaultValues.Text[i].Style.IsItalic == '0' ? 'normal' : 'italic';
                  let IsUnderLine = DefaultValues.Text[i].Style.IsUnderLine == '0' ? 'normal' : 'underline';
                  let prefontWeight = DefaultValues.Text[i].PrePositionStyle.IsBold == '0' ? 'normal' : 'bold';
                  let prefontItalic = DefaultValues.Text[i].PrePositionStyle.IsItalic == '0' ? 'normal' : 'italic';
                  let preIsUnderLine = DefaultValues.Text[i].PrePositionStyle.IsUnderLine == '0' ? 'normal' : 'underline';
                  let posfontWeight = DefaultValues.Text[i].PostPositionStyle.IsBold == '0' ? 'normal' : 'bold';
                  let posfontItalic = DefaultValues.Text[i].PostPositionStyle.IsItalic == '0' ? 'normal' : 'italic';
                  let posIsUnderLine = DefaultValues.Text[i].PostPositionStyle.IsUnderLine == '0' ? 'normal' : 'underline';
                  let Address = DefaultValues.Text[i].Address;
                  let TerminalEquipmentId = DefaultValues.Text[i].TerminalEquipmentId;
                  let newLayOutStyle = DefaultValues.Text[i].Layout;
                  //propsData.EquipmentId
                  let eqInfo = {
                    EquipmentAlias: vm.propsData.EquipmentName,
                    EquipmentId: vm.propsData.EquipmentId
                  }
                  labelDatasArr.push({
                    typeName: `label`,
                    IsEquipment: true,
                    eqInfo: [eqInfo],
                    //typeId: currLabelID,
                    refs: DefaultValues.Text[i].Id,
                    labelLength: labelLength,
                    title: '文本',
                    previewData: {},
                    editData: {
                      layOutStyle: JSON.parse(newLayOutStyle),
                      selectDataType: selectDataType,
                      PrePositionValue: DefaultValues.Text[i].PrePositionValue,
                      noDataVal: DefaultValues.Text[i].DefaultValue,
                      val: DefaultValues.Text[i].Value,
                      labelContent: labelContent,
                      PostPositionValue: DefaultValues.Text[i].PostPositionValue,
                      Style: {
                        fontSize: DefaultValues.Text[i].Style.FontSize,
                        color: DefaultValues.Text[i].Style.Color,
                        fontWeight: fontWeight,
                        fontItalic: fontItalic,
                        fontUnderLine: IsUnderLine,
                        AlignType: 1
                      },
                      PostPositionStyle: {
                        fontSize: DefaultValues.Text[i].PostPositionStyle.FontSize,
                        color: DefaultValues.Text[i].PostPositionStyle.Color,
                        fontWeight: posfontWeight,
                        fontItalic: posfontItalic,
                        fontUnderLine: posIsUnderLine,
                        AlignType: 1
                      },
                      PrePositionStyle: {
                        fontSize: DefaultValues.Text[i].PrePositionStyle.FontSize,
                        color: DefaultValues.Text[i].PrePositionStyle.Color,
                        fontWeight: prefontWeight,
                        fontItalic: prefontItalic,
                        fontUnderLine: preIsUnderLine,
                        AlignType: 1
                      },
                      fixedTxt: {},
                      dataStream: {
                        RegisterAddress: Address,
                        EquipmentId: TerminalEquipmentId
                      }
                    }
                  })
                }
              }
              if(chartLen > 0) { //曲线有数据
                for(let i = 0; i < chartLen; i++) {
                  let chartLength = vm.get_chart_data.length;
                  let currChartID = vm.get_chart_ID;
                  let containerID = `${vm.get_curr_TargetId}container${currChartID}`;
                  let newLayOutStyle = DefaultValues.Graph[i].Layout;
                  let BackgroundColor = DefaultValues.Graph[i].BackgroundColor;
                  let XCutLineColor = DefaultValues.Graph[i].XCutLineColor;
                  let IsShowXCutLine = DefaultValues.Graph[i].IsShowXCutLine;
                  let YCutLineColor = DefaultValues.Graph[i].YCutLineColor;
                  let IsShowYCutLine = DefaultValues.Graph[i].IsShowYCutLine;
                  let IsShowLeftY = DefaultValues.Graph[i].IsShowLeftY;
                  let IsShowRightY = DefaultValues.Graph[i].IsShowRightY;
                  let LeftYColor = DefaultValues.Graph[i].LeftYColor;
                  let RightYColor = DefaultValues.Graph[i].RightYColor;
                  let Content = DefaultValues.Graph[i].Content;
                  let refs = DefaultValues.Graph[i].GraphId; //chart
                  let Interval = DefaultValues.Graph[i].Interval;
                  let currUUid = refs.slice(5);
                  let singleChartData = [];
                  let eqInfo = {
                    EquipmentAlias: vm.propsData.EquipmentName,
                    EquipmentId: vm.propsData.EquipmentId
                  }
                  for(let n of Object.keys(Content)) {
                    let yAxis = 1;
                    let opposite = true;
                    let yVisible = false;
                    if(Content[n].IsRightY) {
                      yAxis = 1;
                      opposite = true;
                      yVisible = IsShowRightY;
                    } else {
                      yAxis = 0;
                      opposite = false;
                      yVisible = IsShowLeftY;
                    }
                    singleChartData.push({
                      get_equipment_data: vm.get_equipment_data,
                      get_protocol_data: [],
                      lineId: Content[n].LineId,
                      dataStream: {
                        RegisterAddress: Content[n].Address,
                        EquipmentId: Content[n].TerminalEquipmentId
                      },
                      color: '',
                      chartDataSetting: {
                        //axis:0//用于哪个轴0：左Y轴  1：右Y轴
                      },
                      chartAxisSetting: {
                        info: '设置' + 0
                      },
                      yAxis: {
                        title: {
                          text: ''
                        },
                        //y轴分割线
                        gridLineColor: YCutLineColor,
                        gridLineDashStyle: 'longdash',
                        gridLineWidth: IsShowYCutLine,
                        lineWidth: 1, //y轴粗细
                        lineColor: LeftYColor,
                        opposite: opposite,
                        showEmpty: false,
                        visible: yVisible,
                        tickPixelInterval: 50,
                        //tickAmount: 5,
                        startOnTick: true,
                        softMin: 0
                      },
                      yData: {
                        id: Content[n].LineId,
                        name: Content[n].Name,
                        yAxis: yAxis,
                        color: Content[n].Color,
                        data: Content[n].data
                      }
                    })
                  }
                  chartDatasArr.push({
                    typeName: `chart`,
                    Interval: Interval,
                    IsEquipment: true,
                    eqInfo: [eqInfo],
                    refs: refs,
                    chartLength: chartLength,
                    title: '曲线',
                    previewData: {},
                    editData: {
                      layOutStyle: JSON.parse(newLayOutStyle)
                    },
                    containerID: `container${currUUid}`,
                    chartName: '',
                    backgroundColor: BackgroundColor,
                    xAxis: {
                      type: 'datetime',
                      tickPixelInterval: 50,
                      //x轴分割线
                      gridLineWidth: IsShowXCutLine,
                      gridZIndex: 4,
                      gridLineColor: XCutLineColor,
                      gridLineDashStyle: 'longdash',
                      lineColor: '#8492a6',
                    },
                    yAxis: {
                      lineWidth: 1,
                      gridLineColor: YCutLineColor, //y轴分割线
                      lineColor: LeftYColor, //右y轴颜色
                      gridLineWidth: IsShowYCutLine,
                      visible: IsShowLeftY
                    },
                    rightYAxis: {
                      lineWidth: 1, //y轴粗细,
                      lineColor: RightYColor,
                      visible: IsShowRightY
                    },
                    singleChartDataLists: singleChartData
                  })
                }
              }
              if(dashboardLen > 0) { //文本数据let dashboardLen = DefaultValues.TextGroups.length;
                for(let i = 0; i < dashboardLen; i++) {
                  let dashboardLength = vm.get_dashboard_data.length;
                  let currDashboardID = vm.get_dashboard_ID;
                  let containerID = `container${currDashboardID}`;
                  let mainInfo = DefaultValues.Dashboard[i];
                  let newLayOutStyle = JSON.parse(mainInfo.Layout);
                  let refs = mainInfo.DashboardId;
                  let currUUid = refs.slice(9);
                  let Config = mainInfo.Config;
                  let colorSettingInfo = [];
                  let eqInfo = {
                    EquipmentAlias: vm.propsData.EquipmentName,
                    EquipmentId: vm.propsData.EquipmentId
                  }
                  for(let val of Config) {
                    colorSettingInfo.push({
                      startNum: val.FloorValue,
                      endNum: val.UpperValue,
                      regionColor: val.Color
                    });
                  }
                  dashboardDatasArr.push({
                    typeName: `dashboard`,
                    IsEquipment: true,
                    eqInfo: [eqInfo],
                    containerID: `container${currUUid}`,
                    ProjectId: vm.ProjectId,
                    DisplayName: mainInfo.Theme,
                    Unit: mainInfo.Unit,
                    value: mainInfo.Value,
                    //typeId: currLabelID,
                    refs: refs,
                    dashboardLength: dashboardLength,
                    dataStream: {
                      RegisterAddress: mainInfo.Address,
                      EquipmentId: mainInfo.TerminalEquipmentId
                    },
                    previewData: {
                      dashboardContent: ''
                    },
                    editData: {
                      layOutStyle: newLayOutStyle
                    },
                    colorSettingInfo: colorSettingInfo
                  })
                }
              }
              if(datablockLen > 0) { //文本数据let datablockLen = DefaultValues.TextGroups.length;
                for(let i = 0; i < datablockLen; i++) {
                  let datablockLength = vm.get_datablock_data.length;
                  let fontWeight = !DefaultValues.TextGroups[i].Style.IsBold ? 'normal' : 'bold';
                  let fontItalic = !DefaultValues.TextGroups[i].Style.IsItalic ? 'normal' : 'italic';
                  let IsUnderLine = !DefaultValues.TextGroups[i].Style.IsUnderLine ? 'normal' : 'underline';
                  let mainInfo = DefaultValues.TextGroups[i];
                  let newLayOutStyle = JSON.parse(mainInfo.Layout);
                  let refs = mainInfo.TextGroupId;
                  let Content = mainInfo.Content;
                  let singleDatablockLists = [];
                  let eqInfo = {
                    EquipmentAlias: vm.propsData.EquipmentName,
                    EquipmentId: vm.propsData.EquipmentId
                  }
                  for(let val of Content) {
                    let prefontWeight = !val.PrePositionStyle.IsBold ? 'normal' : 'bold';
                    let prefontItalic = !val.PrePositionStyle.IsItalic ? 'normal' : 'italic';
                    let preIsUnderLine = !val.PrePositionStyle.IsUnderLine ? 'normal' : 'underline';
                    let posfontWeight = !val.PostPositionStyle.IsBold ? 'normal' : 'bold';
                    let posfontItalic = !val.PostPositionStyle.IsItalic ? 'normal' : 'italic';
                    let posIsUnderLine = !val.PostPositionStyle.IsUnderLine ? 'normal' : 'underline';
                    singleDatablockLists.push({
                      //title:'气温数据图',
                      get_equipment_data: vm.get_equipment_data,
                      get_protocol_data: [],
                      lineID: val.TextItemId,
                      dataStream: {
                        RegisterAddress: val.Address,
                        EquipmentId: val.TerminalEquipmentId
                      },
                      dataName: val.PrePositionValue,
                      dataValue: val.Value,
                      Unit: val.PostPositionValue,
                      valContent: val.Value + val.PostPositionValue,
                      PrePositionStyle: {
                        fontSize: val.PrePositionStyle.FontSize,
                        color: val.PrePositionStyle.Color,
                        fontWeight: prefontWeight,
                        fontItalic: prefontItalic,
                        fontUnderLine: preIsUnderLine,
                        AlignType: 1
                      },
                      PostPositionStyle: {
                        fontSize: val.PostPositionStyle.FontSize,
                        color: val.PostPositionStyle.Color,
                        fontWeight: posfontWeight,
                        fontItalic: posfontItalic,
                        fontUnderLine: posIsUnderLine,
                        AlignType: 1
                      }
                    });
                  }
                  datablockDatasArr.push({
                    typeName: `datablock`,
                    IsEquipment: true,
                    eqInfo: [eqInfo],
                    ProjectId: vm.ProjectId,
                    //typeId: currLabelID,
                    refs: refs,
                    datablockLength: datablockLength,
                    title: mainInfo.Theme,
                    previewData: {
                      datablockContent: ''
                    },
                    editData: {
                      layOutStyle: newLayOutStyle,
                      title: mainInfo.Theme,
                      datablockBg: mainInfo.BackgroundColor,
                      datablockTitleBg: mainInfo.ThemeColor,
                      Style: {
                        fontSize: mainInfo.Style.FontSize,
                        color: mainInfo.Style.Color,
                        fontWeight: fontWeight,
                        fontItalic: fontItalic,
                        fontUnderLine: IsUnderLine,
                        AlignType: 1
                      }
                    },
                    singleDatablockLists: singleDatablockLists
                  })
                }
              }
              if(datastateLen > 0) { //文本数据let dashboardLen = DefaultValues.TextGroups.length;
                for(let i = 0; i < datastateLen; i++) {
                  let datastateLength = vm.get_datastate_data.length;
                  let currDatastateID = vm.get_datastate_ID;
                  //let containerID = `container${currdatastateID}`;
                  let mainInfo = DefaultValues.StateGraphs[i];
                  let newLayOutStyle = JSON.parse(mainInfo.Layout);
                  let refs = mainInfo.StateGraphId;
                  let Value = mainInfo.Value;
                  let OriginValue = mainInfo.OriginValue;

                  let eqInfo = {
                    EquipmentAlias: vm.propsData.EquipmentName,
                    EquipmentId: vm.propsData.EquipmentId
                  }
                  datastateDatasArr.push({
                    typeName: `datastate`,
                    IsEquipment: true,
                    eqInfo: [eqInfo],
                    ProjectId: vm.ProjectId,
                    typeId: currDatastateID,
                    refs: refs,
                    datastateLength: datastateLength,
                    stateValue: Value,
                    OriginValue: OriginValue,
                    dataStream: {
                      RegisterAddress: mainInfo.Address,
                      EquipmentId: mainInfo.TerminalEquipmentId
                    },
                    editData: {
                      layOutStyle: newLayOutStyle
                    }
                  })
                }
              }
              //更新数据
              if(saveSetting) {
                return;
              }
              vm.uPDATE_UPLOAD_IMG({
                isClear: true,
                imgDatas: imgDatasArr
              });
              vm.uPDATE_LABEL({
                isClear: true,
                isFreshLabel: false,
                labelDatas: labelDatasArr
              });
              vm.uPDATE_CHART({
                isClear: true,
                isFreshChart: false,
                chartDatas: chartDatasArr
              });
              vm.uPDATE_DATABLOCK({
                isClear: true,
                isFreshDatablock: false,
                datablockDatas: datablockDatasArr
              });
              vm.uPDATE_DASHBOARD({
                isClear: true,
                isFreshDashboard: false,
                dashboardDatas: dashboardDatasArr
              });
              vm.uPDATE_DATASTATE({
                isClear: true,
                isFreshDatastate: false,
                datastateDatas: datastateDatasArr
              });
              //刷新数据
              //vm.QueryAssemblageDynamicData();
              clearInterval(eosCommon.timer);
              eosCommon.timer = setInterval(() => {
                vm.QueryAssemblageDynamicData();
              }, vm.get_freshTime_Data.Rate * 1000);
            }
          }
        });
      },
      QueryAssemblageDynamicData() {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "IsEquipment": true,
          "TargetId": vm.TargetId
        };
        let url = eosCommon.ENTERPRISE_API + "api/Assemblage/QueryAssemblageDynamicData";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(result.State == 10002) {
            clearInterval(eosCommon.timer);
          }
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.AssemblageDynamicData = result.Data.Result;
            vm.uPDATE_FRESHTIME_DATA({
              Rate: vm.get_freshTime_Data.Rate,
              Time: result.Data.Time
            });
            var len1 = vm.AssemblageDynamicData.length;
            var chartCurrentData = [];
            var datablockCurrentData = [];
            for(let i = 0; i < len1; i++) {
              if(vm.AssemblageDynamicData[i].Type == 'Text') {
                //get_label_data									
                for(let j = 0; j < vm.get_label_data.length; j++) {
                  if(vm.AssemblageDynamicData[i].Id == vm.get_label_data[j].refs) {
                    //console.log('刷数据哦哦：',vm.get_label_data[j]);
                    vm.uPDATE_LABEL({
                      isClear: true,
                      isFreshLabel: true,
                      labelContentInfo: {
                        val: vm.AssemblageDynamicData[i].Value,
                        Id: vm.AssemblageDynamicData[i].Id,
                        labelContent: vm.AssemblageDynamicData[i].Value + vm.get_label_data[j].editData.PostPositionValue
                      }
                    });
                    break;
                  }
                }
              } else if(vm.AssemblageDynamicData[i].Type == 'Graph') {
                chartCurrentData.push(...[vm.AssemblageDynamicData[i]]);
              } else if(vm.AssemblageDynamicData[i].Type == 'TextGroup') {
                datablockCurrentData.push(...[vm.AssemblageDynamicData[i]]);
              } else if(vm.AssemblageDynamicData[i].Type == 'Dashboard') {
                for(let j = 0; j < vm.get_dashboard_data.length; j++) {
                  if(vm.AssemblageDynamicData[i].Id == vm.get_dashboard_data[j].refs) {
                    vm.uPDATE_DASHBOARD({
                      isClear: true,
                      isFreshDashboard: true,
                      dashboardContent: vm.AssemblageDynamicData[i]
                    });
                    break;
                  }
                }
              } else if(vm.AssemblageDynamicData[i].Type == 'StateGraph') {
                for(let j = 0; j < vm.get_datastate_data.length; j++) {
                  if(vm.AssemblageDynamicData[i].Id == vm.get_datastate_data[j].refs) {
                    vm.uPDATE_DATASTATE({
                      isClear: true,
                      isFreshDatastate: true,
                      StateGraphId: vm.AssemblageDynamicData[i].StateGraphId,
                      datastateValue: vm.AssemblageDynamicData[i].Value,
                      OriginValue: vm.AssemblageDynamicData[i].OriginValue

                    });
                    break;
                  }
                }
              }
            }
            vm.uPDATE_CHARTCURRENTDATA(chartCurrentData);
            vm.uPDATE_DATABLOCKCURRENTDATA(datablockCurrentData);
          }
        })
      },
      saveAllDragDatas() {
        let vm = this;
        let len_type = vm.typeDatas.length;
        let len_label = vm.get_label_data.length;
        let len_img = vm.get_upLoad_img_data.length;
        let len_chart = vm.get_chart_data.length;
        let len_datablock = vm.get_datablock_data.length;
        let len_dashboard = vm.get_dashboard_data.length;
        let len_datastate = vm.get_datastate_data.length;
        vm.Images = [];
        vm.Texts = [];
        vm.Graphs = [];
        vm.TextGroups = [];
        vm.Dashboards = [];
        vm.StateGraphs = [];
        for(let j = 0; j < len_type; j++) {
          if(vm.typeDatas[j] == 'get_label_data') {
            for(let i = 0; i < len_label; i++) {
              vm.getStyleValue(vm.get_label_data[i]);
              let typeName = vm.get_label_data[i].typeName;
              //let typeId = vm.get_label_data[i].typeId;
              let refs = vm.get_label_data[i].refs;
              let type = vm.get_label_data[i].editData.selectDataType == 'fixedTxt' ? 1 : 2;
              let PrePositionValue = vm.get_label_data[i].editData.PrePositionValue;
              //let DefaultValue = vm.get_label_data[i].editData.noDataVal;
              let DefaultValue = '';
              if(type == 1) {
                DefaultValue = vm.get_label_data[i].editData.labelContent;
              } else {
                DefaultValue = vm.get_label_data[i].editData.noDataVal;
              }
              let PostPositionValue = vm.get_label_data[i].editData.PostPositionValue;
              let TerminalEquipmentId = vm.get_label_data[i].editData.dataStream.EquipmentId
              let Address = vm.get_label_data[i].editData.dataStream.RegisterAddress
              let Color = vm.get_label_data[i].editData.Style.color;
              let FontSize = vm.get_label_data[i].editData.Style.fontSize;
              let IsBold = vm.get_label_data[i].editData.Style.fontWeight == 'bold';
              let fontItalic = vm.get_label_data[i].editData.Style.fontItalic == 'italic';
              let IsUnderLine = vm.get_label_data[i].editData.Style.fontUnderLine == 'underline';
              let posColor = vm.get_label_data[i].editData.PostPositionStyle.color;
              let posFontSize = vm.get_label_data[i].editData.PostPositionStyle.fontSize;
              let posIsBold = vm.get_label_data[i].editData.PostPositionStyle.fontWeight == 'bold';
              let posfontItalic = vm.get_label_data[i].editData.PostPositionStyle.fontItalic == 'italic';
              let posIsUnderLine = vm.get_label_data[i].editData.PostPositionStyle.fontUnderLine == 'underline';
              let preColor = vm.get_label_data[i].editData.PrePositionStyle.color;
              let preFontSize = vm.get_label_data[i].editData.PrePositionStyle.fontSize;
              let preIsBold = vm.get_label_data[i].editData.PrePositionStyle.fontWeight == 'bold';
              let prefontItalic = vm.get_label_data[i].editData.PrePositionStyle.fontItalic == 'italic';
              let preIsUnderLine = vm.get_label_data[i].editData.PrePositionStyle.fontUnderLine == 'underline';
              vm.Texts.push({
                "TextId": refs,
                "Type": type,
                "PrePositionValue": PrePositionValue,
                "DefaultValue": DefaultValue,
                'PostPositionValue': PostPositionValue,
                "TerminalEquipmentId": TerminalEquipmentId,
                "Address": Address,
                "Style": {
                  "Color": Color,
                  "FontSize": FontSize,
                  "IsBold": IsBold,
                  "IsItalic": fontItalic,
                  "IsUnderLine": IsUnderLine,
                  "AlignType": 1,
                },
                "PostPositionStyle": {
                  "Color": posColor,
                  "FontSize": posFontSize,
                  "IsBold": posIsBold,
                  "IsItalic": posfontItalic,
                  "IsUnderLine": posIsUnderLine,
                  "AlignType": 1,
                },
                "PrePositionStyle": {
                  "Color": preColor,
                  "FontSize": preFontSize,
                  "IsBold": preIsBold,
                  "IsItalic": prefontItalic,
                  "IsUnderLine": preIsUnderLine,
                  "AlignType": 1,
                },
                "Layout": JSON.stringify(vm.get_label_data[i].editData.layOutStyle),
                "Level": 2
              });
            }
          } else if(vm.typeDatas[j] == 'get_upLoad_img_data') {
            for(let i = 0; i < len_img; i++) {
              vm.getStyleValue(vm.get_upLoad_img_data[i]);
              let typeName = vm.get_upLoad_img_data[i].typeName;
              let refs = vm.get_upLoad_img_data[i].refs;

              vm.Images.push({
                "ImageId": refs,
                "Type": vm.get_upLoad_img_data[i].Type,
                "ResoureId": vm.get_upLoad_img_data[i].editData.ResoureId,
                "Layout": JSON.stringify(vm.get_upLoad_img_data[i].editData.layOutStyle),
                "Level": 2
              });
            }
          } else if(vm.typeDatas[j] == 'get_chart_data') {
            for(let i = 0; i < len_chart; i++) {
              vm.getStyleValue(vm.get_chart_data[i]);
              let typeName = vm.get_chart_data[i].typeName;
              //let typeId = vm.get_chart_data[i].typeId;
              let refs = vm.get_chart_data[i].refs;
              let Layout = JSON.stringify(vm.get_chart_data[i].editData.layOutStyle);
              let BackgroundColor = vm.get_chart_data[i].backgroundColor;
              let Interval = vm.get_chart_data[i].Interval;
              let LeftYColor = vm.get_chart_data[i].yAxis.lineColor;
              let RightYColor = vm.get_chart_data[i].rightYAxis.lineColor;
              let IsShowLeftY = vm.get_chart_data[i].yAxis.visible;
              let IsShowRightY = vm.get_chart_data[i].rightYAxis.visible;
              let IsShowXCutLine = vm.get_chart_data[i].xAxis.gridLineWidth;
              let IsShowYCutLine = vm.get_chart_data[i].yAxis.gridLineWidth;
              let XCutLineColor = vm.get_chart_data[i].xAxis.gridLineColor;
              let YCutLineColor = vm.get_chart_data[i].yAxis.gridLineColor;
              let singleChartDataLists = vm.get_chart_data[i].singleChartDataLists;
              let noRegisterAddressSingle = singleChartDataLists.filter((val) => {
                return val.dataStream.RegisterAddress == '';
              })
              if(noRegisterAddressSingle.length > 0) {
                vdialog({
                  type: 'confirm',
                  title: '提示',
                  content: '每条曲线中协议地址不能为空！',
                  ok: function() {},
                  cancel: true,
                  modal: true
                });
                if(vm.isMenuChange) {
                  vm.operateType.mChangeState = 0;
                };
                return false;
              }
              let Items = [];
              for(let m of Object.keys(singleChartDataLists)) {
                Items.push({
                  "LineId": singleChartDataLists[m].lineId,
                  "Name": singleChartDataLists[m].yData.name,
                  "TerminalEquipmentId": singleChartDataLists[m].dataStream.EquipmentId,
                  "Address": singleChartDataLists[m].dataStream.RegisterAddress,
                  "Color": singleChartDataLists[m].yData.color,
                  "IsRightY": singleChartDataLists[m].yData.yAxis == 1,
                });
              }
              //"ImageId": typeName + typeId,
              vm.Graphs.push({
                "GraphId": refs,
                "Theme": "",
                "Layout": Layout,
                "Level": 1,
                "Interval": Interval,
                "BackgroundColor": BackgroundColor,
                "LeftYColor": LeftYColor,
                "RightYColor": RightYColor,
                "IsShowLeftY": IsShowLeftY,
                "IsShowRightY": IsShowRightY,
                "IsShowXCutLine": IsShowXCutLine,
                "IsShowYCutLine": IsShowYCutLine,
                "XCutLineColor": XCutLineColor,
                "YCutLineColor": YCutLineColor,
                "Items": Items
              });
            }
          } else if(vm.typeDatas[j] == 'get_datablock_data') {
            for(let i = 0; i < len_datablock; i++) {
              vm.getStyleValue(vm.get_datablock_data[i]);
              let typeName = vm.get_datablock_data[i].typeName;
              //let typeId = vm.get_chart_data[i].refs;
              let refs = vm.get_datablock_data[i].refs;
              let Theme = vm.get_datablock_data[i].title;
              let Layout = JSON.stringify(vm.get_datablock_data[i].editData.layOutStyle);
              let BackgroundColor = vm.get_datablock_data[i].editData.datablockBg;
              let ThemeColor = vm.get_datablock_data[i].editData.datablockTitleBg;
              let singleDatablockLists = vm.get_datablock_data[i].singleDatablockLists;
              let Color = vm.get_datablock_data[i].editData.Style.color;
              let FontSize = vm.get_datablock_data[i].editData.Style.fontSize;
              let IsBold = vm.get_datablock_data[i].editData.Style.fontWeight == 'bold';
              let fontItalic = vm.get_datablock_data[i].editData.Style.fontItalic == 'italic';
              let IsUnderLine = vm.get_datablock_data[i].editData.Style.fontUnderLine == 'underline';
              let Texts = [];
              for(let val of singleDatablockLists) {
                let preColor = val.PrePositionStyle.color;
                let preFontSize = val.PrePositionStyle.fontSize;
                let preIsBold = val.PrePositionStyle.fontWeight == 'bold';
                let prefontItalic = val.PrePositionStyle.fontItalic == 'italic';
                let preIsUnderLine = val.PrePositionStyle.fontUnderLine == 'underline';
                let posColor = val.PostPositionStyle.color;
                let posFontSize = val.PostPositionStyle.fontSize;
                let posIsBold = val.PostPositionStyle.fontWeight == 'bold';
                let posfontItalic = val.PostPositionStyle.fontItalic == 'italic';
                let posIsUnderLine = val.PostPositionStyle.fontUnderLine == 'underline';
                Texts.push({
                  "TextItemId": val.lineID,
                  "TerminalEquipmentId": val.dataStream.EquipmentId,
                  "Address": val.dataStream.RegisterAddress,
                  "PrePositionStyle": {
                    "Color": preColor,
                    "IsBold": preIsBold,
                    "IsUnderLine": preIsUnderLine,
                    "IsItalic": prefontItalic,
                    "AlignType": 1,
                    "FontSize": preFontSize
                  },
                  "PostPositionStyle": {
                    "Color": posColor,
                    "IsBold": posIsBold,
                    "IsUnderLine": posIsUnderLine,
                    "IsItalic": posfontItalic,
                    "AlignType": 1,
                    "FontSize": posFontSize
                  },
                  "PrePositionValue": val.dataName,
                  "PostPositionValue": val.Unit,
                  "Value": ""
                })
              }
              //let BackgroundColor=vm.get_datablock_data[i].datablockTitleBg.datablockTitleBg;
              //"ImageId": typeName + typeId,
              vm.TextGroups.push({
                "TextGroupId": refs,
                "Theme": Theme,
                "ThemeColor": ThemeColor,
                "BackgroundColor": BackgroundColor,
                "Texts": Texts,
                "Layout": Layout,
                "Style": {
                  "Color": Color,
                  "IsBold": IsBold,
                  "IsUnderLine": IsUnderLine,
                  "IsItalic": fontItalic,
                  "AlignType": 1,
                  "FontSize": FontSize
                },
                "Level": "1"
              });
            }
          } else if(vm.typeDatas[j] == 'get_dashboard_data') {
            for(let i = 0; i < len_dashboard; i++) {
              vm.getStyleValue(vm.get_dashboard_data[i]);
              let refs = vm.get_dashboard_data[i].refs;
              let TerminalEquipmentId = vm.get_dashboard_data[i].dataStream.EquipmentId;
              let Address = vm.get_dashboard_data[i].dataStream.RegisterAddress;
              let Theme = vm.get_dashboard_data[i].DisplayName;
              let Unit = vm.get_dashboard_data[i].Unit;
              let Layout = JSON.stringify(vm.get_dashboard_data[i].editData.layOutStyle);
              let colorSettingInfo = vm.get_dashboard_data[i].colorSettingInfo;
              let Conifg = [];
              for(let val of colorSettingInfo) {
                Conifg.push({
                  "Color": val.regionColor,
                  "UpperValue": val.endNum,
                  "FloorValue": val.startNum
                })
              }
              vm.Dashboards.push({
                "DashboardId": refs,
                "TerminalEquipmentId": TerminalEquipmentId,
                "Address": Address,
                "DefaultValue": 0,
                "Layout": Layout,
                "Theme": Theme,
                "Unit": Unit,
                "Level": 1,
                "Conifg": Conifg
              });
            }
          } else if(vm.typeDatas[j] == 'get_datastate_data') {
            for(let i = 0; i < len_datastate; i++) {
              vm.getStyleValue(vm.get_datastate_data[i]);
              let refs = vm.get_datastate_data[i].refs;
              let TerminalEquipmentId = vm.get_datastate_data[i].dataStream.EquipmentId;
              let Address = vm.get_datastate_data[i].dataStream.RegisterAddress;
              let Layout = JSON.stringify(vm.get_datastate_data[i].editData.layOutStyle);
              vm.StateGraphs.push({
                "StateGraphId": refs,
                "TerminalEquipmentId": TerminalEquipmentId,
                "Address": Address,
                "Layout": Layout,
                "Level": 1
              });
            }
          }
        }
        //Texts Images
        vm.submitDragDatas();
      },
      submitDragDatas() {
        let vm = this;
        for(let i = 0; i < vm.Images.length; i++) {
          if(!vm.Images[i].ResoureId) {
            vdialog({
              type: 'confirm',
              title: '提示',
              content: '请先上传底图！',
              ok: function() {},
              cancel: true,
              modal: true
            })
            if(vm.isMenuChange) {
              vm.operateType.mChangeState = 0;
            };
            return false;
          }
        }
        for(let j of vm.TextGroups) {
          for(let m of j.Texts) {
            if(m.TerminalEquipmentId == '' || m.Address == '') {
              vdialog({
                type: 'confirm',
                title: '提示',
                content: '数据块中请先选择设备和协议地址！',
                ok: function() {},
                cancel: true,
                modal: true
              });
              if(vm.isMenuChange) {
                vm.operateType.mChangeState = 0;
              }
              return false;
            }
          }
        }
        //Dashboards
        for(let val of vm.Dashboards) {
          let Conifg = val.Conifg;
          let UpperValueArr = [];
          let isOrdered = true;
          let isNum = true;
          if(val.TerminalEquipmentId == '' || val.Address == '') {
            vdialog({
              type: 'confirm',
              title: '提示',
              content: '仪表盘中请先选择设备和协议地址！',
              ok: function() {},
              cancel: true,
              modal: true
            });
            if(vm.isMenuChange) {
              vm.operateType.mChangeState = 0;
            }
            return false;
          }
          for(let i of Object.keys(Conifg)) {
            if(isNaN(Number(Conifg[i].FloorValue))) {
              vdialog({
                type: 'confirm',
                title: '提示',
                content: '仪表盘中配置值须是数字！',
                ok: function() {},
                cancel: true,
                modal: true
              });
              if(vm.isMenuChange) {
                vm.operateType.mChangeState = 0;
              }
              return false;
            }
            if(i == 0) {
              UpperValueArr.push(Number(Conifg[i].FloorValue));
            } else {
              UpperValueArr.push(Number(Conifg[i].UpperValue));
            }
          }
          let OriginalUpperValueArr = copyArr(UpperValueArr);

          function NumAscSort(a, b) {
            return a - b;
          }
          UpperValueArr.sort(NumAscSort);
          for(let index of Object.keys(OriginalUpperValueArr)) {
            if(OriginalUpperValueArr[index] != UpperValueArr[index]) {
              vdialog({
                type: 'confirm',
                title: '提示',
                content: '仪表盘中配置值须从小到大排列！',
                ok: function() {},
                cancel: true,
                modal: true
              });
              if(vm.isMenuChange) {
                vm.operateType.mChangeState = 0;
              }
              return false;
            }
          }
        }
        for(let sVal of vm.StateGraphs) {
          if(sVal.TerminalEquipmentId == '' || sVal.Address == '') {
            vdialog({
              type: 'confirm',
              title: '提示',
              content: '状态控件中请先选择设备和协议地址！',
              ok: function() {},
              cancel: true,
              modal: true
            });
            if(vm.isMenuChange) {
              vm.operateType.mChangeState = 0;
            }
            return false;
          }
        }
        let param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "IsEquipment": true,
            "TargetId": vm.get_curr_TargetId,
            "Html": '',
            "Texts": vm.Texts,
            "Images": vm.Images,
            "Graphs": vm.Graphs,
            "TextGroups": vm.TextGroups,
            "Dashboards": vm.Dashboards,
            "StateGraphs": vm.StateGraphs
          }
        };
        let url = eosCommon.ENTERPRISE_API + "api/Assemblage/SetAssemblageContent";
        eosCommon.eosAjax(url, "POST", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.$message({
              type: 'success',
              message: '保存成功！'
            });
            eosCommon.storage.set('storageType', '');
            vm.uPDATETEMPDATA({
              isClear: true,
              data: 'save'
            });
            vm.dELETE_LABEL({
              typeName: '',
              currenIndex: '',
              isDeleteClick: false,
              isResetOperateMemory: true
            });
            vm.uPDATE_SETTING_STATE({
              curr_setting_state: false,
              isPreview: true,
              targetId: vm.get_curr_TargetId,
              isHasData: true
            });
            if(vm.changeEQUIP) {
              vm.getObjId(vm.propsData.EquipmentId);
            }
            if(vm.isReback) {
              vm.operateType.reBackClickFlag = 3;
            }
            if(vm.isMenuChange) {
              vm.operateType.mChangeState = 2;
            }
            vm.QueryAssemblageDetail();
            vm.changeEQUIP = false;
          }
        });
      },
      getStyleValue(data) {
        let vm = this;
        let left = '';
        let top = '';
        let width = '';
        let height = '';
        let el = document.querySelector('#wrap_' + data.refs);
        left = el.style.left;
        top = el.style.top;
        width = getStyle(el)['width'];
        height = getStyle(el)['height'];
        //data.editData.layOutStyle = `left:${left};top:${top};width:${width};height:${height};`
        data.editData.layOutStyle = {
          left: left,
          top: top,
          width: width,
          height: height
        }
      }
    }
  }
</script>
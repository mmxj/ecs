<style lang="less" scoped="scoped">
  #fullScreen {
    #freshTimeSetting {
      height: 50px;
      width: 500px;
      position: absolute;
      top: 0;
      .freshTimeSettingSpan {
        color: #8492A6;
        font-size: 14px;
      }
      .freshTimeSettingDataSpan {
        color: #1abc9c;
        font-weight: bold;
      }
      .timeShow {
        width: 250px;
        height: 50px;
        display: inline-block;
        margin-top: 20px;
      }
      .timerSetting {
        width: 250px;
        height: 50px;
        display: inline-block;
        margin-top: 20px;
      }
    }
    .drag_panel_content {
      .bgC {
        background: url('../../../../../../../static/css/images/drag/drag_region_bg.png') no-repeat center;
      }
      width: 100%;
      background: #fff;
      overflow: auto;
      .noDataimg {
        margin-top: 200px;
        text-align: center;
        img {}
        p {
          color: #1abc9c;
          font-size: 18px;
          font-weight: bold;
          margin-top: 15px;
        }
      }
      .txtInfo {
        resize: none;
        background: transparent;
        border: none;
        display: inline-block;
        margin: 0;
        padding: 0;
        line-height: 20px;
        width: 100%;
        text-align: left;
      }
      .txtInfo {
        resize: none;
        background: transparent;
        border: none;
        margin: 0;
        padding: 0;
        line-height: 20px;
        text-align: left;
      }
      .extendTxtInfo1 {
        width: 50%;
        text-align: center;
      }
      .extendTxtInfo {
        width: 25%;
        text-align: left;
      }
      .extendT {
        width: 100%;
      }
      .drag_region {
        /*width: 1000px;
			height: 800px;*/
        width: 100rem;
        height: 80rem;
        position: relative;
        margin: 0 auto;
        margin-left: 0;
      }
    }
  }
</style>
<template>
  <div id="fullScreen">
    <div class="main_contents">
      <div id="freshTimeSetting" style="width: 125px;position: fixed;top: 0;right: 0; z-index: 1000;">
        <div class="timerSetting">
          <span style="margin-right: 0px;" class="freshTimeSettingSpan">刷新频率：</span>
          <span class="freshTimeSettingDataSpan">{{get_freshTime_Data.Rate}}</span>
          <span style="padding: 0 5px;" class="freshTimeSettingSpan">秒</span>
        </div>
      </div>
      <div class="drag_panel_content droptarget" style="position: relative;">
        <div class="drag_region">
          <common-drag v-for="(item,index) in get_upLoad_img_data" :propsData="item" :key="item.refs" ref="wraps">
            <div class="content" style="position: relative;">
              <div class="imgss">
                <h2 class="typeTips" v-if="!item.editData.imgUrl">请先上传图片</h2>
                <img v-if="item.editData.imgUrl" style="margin: 0 auto; width: 100%; height: 100%;" :src="item.editData.imgUrl" class="avatar" />
              </div>
            </div>
          </common-drag>
          <common-drag v-for="(item,index) in get_label_data" :propsData="item" :key="item.refs" ref="wraps">
            <div class="content" style="position: relative; height: 100%;">
              <div class="imgss" style="height: 100%;">
                <textarea class="txtInfo" :class="{extendTxtInfo1:item.editData.selectDataType=='dataStream'}" v-show="item.editData.selectDataType=='dataStream'&& item.editData.PrePositionValue!=''" v-model="item.editData.PrePositionValue" :style="`font-size:${item.editData.PrePositionStyle.fontSize}px;color: ${item.editData.PrePositionStyle.color};font-weight: ${item.editData.PrePositionStyle.fontWeight};font-style:${item.editData.PrePositionStyle.fontItalic};text-decoration:${item.editData.PrePositionStyle.fontUnderLine};`" style="height: 100%; text-align: right; cursor: move" maxlength="100">																										
								</textarea>
                <textarea v-show="item.editData.selectDataType!='dataStream'" class="txtInfo" :class="{extendTxtInfo:item.editData.selectDataType=='dataStream',extendT:item.editData.selectDataType=='dataStream'&&(item.editData.PrePositionValue==''&&item.editData.PostPositionValue=='')}" :style="`font-size:${item.editData.Style.fontSize}px;color: ${item.editData.Style.color};font-weight: ${item.editData.Style.fontWeight};font-style:${item.editData.Style.fontItalic};text-decoration:${item.editData.Style.fontUnderLine};`" v-model="item.editData.labelContent" style="height: 100%; cursor: move" maxlength="100" placeholder="内容...">															
								</textarea>
                <textarea v-show="(!isDataChange) && (item.editData.selectDataType=='dataStream')" class="txtInfo" :class="{extendTxtInfo:item.editData.selectDataType=='dataStream',extendT:item.editData.selectDataType=='dataStream'&&(item.editData.PrePositionValue==''&&item.editData.PostPositionValue=='')}" :style="`font-size:${item.editData.Style.fontSize}px;color: ${item.editData.Style.color};font-weight: ${item.editData.Style.fontWeight};font-style:${item.editData.Style.fontItalic};text-decoration:${item.editData.Style.fontUnderLine};`" v-model="item.editData.labelContent" style="height: 100%; cursor: move" maxlength="100" placeholder="内容...">															
								</textarea>
                <textarea class="txtInfo" :class="{extendTxtInfo:item.editData.selectDataType=='dataStream'}" v-show="item.editData.selectDataType=='dataStream' && item.editData.PostPositionValue!=''" v-model="item.editData.PostPositionValue" :style="`font-size:${item.editData.PostPositionStyle.fontSize}px;color: ${item.editData.PostPositionStyle.color};font-weight: ${item.editData.PostPositionStyle.fontWeight};font-style:${item.editData.PostPositionStyle.fontItalic};text-decoration:${item.editData.PostPositionStyle.fontUnderLine};`" style="height: 100%; text-align:left;position: absolute;right: 8px; top: 0; cursor: move" maxlength="100">																										
								</textarea>
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
          <common-drag v-for="(item,index) in get_datablock_data" :propsData="item" :key="item.refs" ref="wraps_datablock">
            <div class="content" style="position: relative; height: 100%;">
              <div class="imgss" style="height: 100%;width: 100%;;">
                <common-datablock :propsData="item"></common-datablock>
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
          <common-drag v-for="(item,index) in get_datastate_data" :propsData="item" :key="item.refs" ref="wraps_datastate">
            <div class="content" style="position: relative; height: 100%;">
              <div class="imgss" style="height: 100%;width: 100%;;">
                <!--状态控件-->
                <common-datastate :propsData="item"></common-datastate>
              </div>
            </div>
          </common-drag>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import commonDrag from './commonDrag'
  import commonChart from './commonChart'
  import commonDatablock from './commonDatablock'
  import commonDashboard from './commonDashboard'
  import commonDatastate from './commonDatastate'
  export default {
    data() {
      return {
        AssemblageDetail: [],
        AssemblageDynamicData: [],
        TargetId: '',
        editPanelPropsData: {
          editClass: '',
          editPanelClass: ''
        },
        timer: null,
        isDataChange: false,
        zoomValue: 1.4,
        IsEquipment: false
      }
    },
    computed: {
      ...mapGetters([
				'isShowSideBar',
				'get_upLoad_img_ID',
				'get_label_ID',
				'get_chart_ID',
				'get_line_ID',
				'get_datablock_ID',
				'get_dashboard_ID',
				'get_datastate_ID',
				'get_isAddDropEventListener',
				'get_curr_setting',
				'get_curr_isPreview',
				'get_upLoad_img_data',
				'get_label_data',
				'get_chart_data',
				'get_datablock_data',
				'get_dashboard_data',
				'get_datastate_data',
				'get_curr_TargetId',
				'get_tempDrag_Datas',
				'get_freshTime_Data'
			])
    },
    watch: {
      "get_freshTime_Data.Time" (val, oldVal) {
        this.isDataChange = true;
        setTimeout(() => {
          this.isDataChange = false;
        }, 500);
      }
    },
    components: {
      commonDrag,
      commonChart,
      commonDatablock,
      commonDashboard,
      commonDatastate
    },
    methods: {
      ...mapMutations({
        uPDATETEMPDATA: 'UPDATETEMPDATA',
        uPDATE_SETTING_STATE: 'UPDATE_SETTING_STATE',
        uPDATE_IMG_ID: 'UPDATE_IMG_ID',
        uPDATE_LABEL_ID: 'UPDATE_LABEL_ID',
        uPDATE_CHART_ID: 'UPDATE_CHART_ID',
        uPDATE_LINE_ID: 'UPDATE_LINE_ID',
        uPDATE_DATABLOCK_ID: 'UPDATE_DATABLOCK_ID',
        //底图
        uPDATE_UPLOAD_IMG: 'UPDATE_UPLOAD_IMG',
        aDD_DROP_EVENT: 'ADD_DROP_EVENT',
        //文本
        uPDATE_LABEL: 'UPDATE_LABEL',
        uPDATE_CHART: 'UPDATE_CHART',

        uPDATE_DATABLOCK: 'UPDATE_DATABLOCK',
        uPDATE_FRESHTIME_DATA: 'UPDATE_FRESHTIME_DATA',
        uPDATE_CHARTCURRENTDATA: 'UPDATE_CHARTCURRENTDATA',
        uPDATE_DATABLOCKCURRENTDATA: 'UPDATE_CHARTCURRENTDATA',
        uPDATE_DASHBOARD_ID: 'UPDATE_DASHBOARD_ID',
        uPDATE_DASHBOARD: 'UPDATE_DASHBOARD',
        uPDATE_DATASTATE_ID: 'UPDATE_DATASTATE_ID',
        uPDATE_DATASTATE: 'UPDATE_DATASTATE'
      }),
      handLayOut(layout) {
        let newlayOut = layout.replace(/px/g, "rem")
        let layoutArr = newlayOut.split(';')
        let layoutArrLen = layoutArr.length;
        for(let l = 0; l < layoutArrLen; l++) {
          if(l == layoutArrLen - 1) {
            break;
          }
          let index1 = layoutArr[l].indexOf(':');
          let index2 = layoutArr[l].indexOf('rem');
          let val = layoutArr[l].slice(index1 + 1, index2)
          val = val / 10;
          layoutArr[l] = layoutArr[l].slice(0, index1 + 1) + val + layoutArr[l].slice(index2)
        }
        let newlayOutStr = layoutArr.join(';');
        return newlayOutStr;
      },
      QueryAssemblageDetail() {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "IsEquipment": vm.IsEquipment,
          "TargetId": vm.TargetId

        };
        let url = eosCommon.ENTERPRISE_API + "api/Assemblage/QueryAssemblageDetail";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.AssemblageDetail = result.Data;
            vm.uPDATE_FRESHTIME_DATA({
              Rate: result.Data.Rate,
              Time: vm.get_freshTime_Data.Time
            });
            let DefaultValues = vm.AssemblageDetail.DefaultValues;
            let imgDatasArr = [],
              labelDatasArr = [],
              chartDatasArr = [],
              datablockDatasArr = [];
            let dashboardDatasArr = [];
            let datastateDatasArr = [];
            if(DefaultValues.Image.length == 0 &&
              DefaultValues.Text.length == 0 &&
              DefaultValues.Graph.length == 0 &&
              DefaultValues.TextGroups.length == 0 &&
              DefaultValues.Dashboard.length == 0 &&
              DefaultValues.StateGraphs.length == 0
            ) {
              //未配置数据get_curr_TargetId
              vm.uPDATE_SETTING_STATE({
                curr_setting_state: false,
                isPreview: false,
                targetId: vm.TargetId
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
            } else {
              //展示数据							
              vm.uPDATE_SETTING_STATE({
                curr_setting_state: false,
                isPreview: true,
                targetId: vm.TargetId
              });
              let imgLen = DefaultValues.Image.length;
              let labelLen = DefaultValues.Text.length;
              let chartLen = DefaultValues.Graph.length;
              let datablockLen = DefaultValues.TextGroups.length;
              let dashboardLen = DefaultValues.Dashboard.length;
              let datastateLen = DefaultValues.StateGraphs.length;
              if(imgLen > 0) { //图片有数据
                for(let i = 0; i < imgLen; i++) {
                  let upLoadImgLength = vm.get_upLoad_img_data.length;
                  let currImgID = vm.get_upLoad_img_ID;
                  let newLayOutStyle = DefaultValues.Image[i].Layout;
                  imgDatasArr.push({
                    typeName: `upLoadImg`,
                    //typeId: currImgID,
                    refs: DefaultValues.Image[i].Id,
                    upLoadImgLength: upLoadImgLength,
                    title: '底图',
                    previewData: {},
                    editData: {
                      imgUrl: DefaultValues.Image[i].Value,
                      ResoureId: DefaultValues.Image[i].ResoureId,
                      layOutStyle: JSON.parse(newLayOutStyle)
                    }
                  })
                }
              }
              if(labelLen > 0) { //文本数据
                for(let i = 0; i < labelLen; i++) {
                  let labelLength = vm.get_label_data.length;
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
                  labelDatasArr.push({
                    typeName: `label`,
                    ProjectId: vm.ProjectId,
                    //										typeId: currLabelID,
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
                        fontSize: DefaultValues.Text[i].Style.FontSize / vm.zoomValue,
                        color: DefaultValues.Text[i].Style.Color,
                        fontWeight: fontWeight,
                        fontItalic: fontItalic,
                        fontUnderLine: IsUnderLine,
                        AlignType: 1
                      },
                      PostPositionStyle: {
                        fontSize: DefaultValues.Text[i].PostPositionStyle.FontSize / vm.zoomValue,
                        color: DefaultValues.Text[i].PostPositionStyle.Color,
                        fontWeight: posfontWeight,
                        fontItalic: posfontItalic,
                        fontUnderLine: posIsUnderLine,
                        AlignType: 1
                      },
                      PrePositionStyle: {
                        fontSize: DefaultValues.Text[i].PrePositionStyle.FontSize / vm.zoomValue,
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
                          text: 'Value'
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
                        tickAmount: 5,
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
                    IsEquipment: false,
                    eqInfo: [],
                    refs: refs,
                    chartLength: chartLength,
                    title: '曲线',
                    previewData: {

                    },
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
              if(datablockLen > 0) { //文本数据
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
                        fontSize: val.PrePositionStyle.FontSize / vm.zoomValue,
                        color: val.PrePositionStyle.Color,
                        fontWeight: prefontWeight,
                        fontItalic: prefontItalic,
                        fontUnderLine: preIsUnderLine,
                        AlignType: 1
                      },
                      PostPositionStyle: {
                        fontSize: val.PostPositionStyle.FontSize / vm.zoomValue,
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
                    IsEquipment: false,
                    eqInfo: [],
                    ProjectId: vm.ProjectId,
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
                        fontSize: mainInfo.Style.FontSize / vm.zoomValue,
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
              if(dashboardLen > 0) {
                for(let i = 0; i < dashboardLen; i++) {
                  let dashboardLength = vm.get_dashboard_data.length;
                  let currDashboardID = vm.get_dashboard_ID;
                  let mainInfo = DefaultValues.Dashboard[i];
                  let newLayOutStyle = JSON.parse(mainInfo.Layout);
                  let refs = mainInfo.DashboardId;
                  let currUUid = refs.slice(9);
                  let Config = mainInfo.Config;
                  let colorSettingInfo = [];
                  for(let val of Config) {
                    colorSettingInfo.push({
                      startNum: val.FloorValue,
                      endNum: val.UpperValue,
                      regionColor: val.Color
                    });
                  }
                  dashboardDatasArr.push({
                    typeName: `dashboard`,
                    IsEquipment: false,
                    eqInfo: [],
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
              if(datastateLen > 0) {
                for(let i = 0; i < datastateLen; i++) {
                  let datastateLength = vm.get_datastate_data.length;
                  let currDatastateID = vm.get_datastate_ID;
                  let mainInfo = DefaultValues.StateGraphs[i];
                  let newLayOutStyle = JSON.parse(mainInfo.Layout);
                  let refs = mainInfo.StateGraphId;
                  let Value = mainInfo.Value;
                  datastateDatasArr.push({
                    typeName: `datastate`,
                    IsEquipment: false,
                    eqInfo: [],
                    ProjectId: vm.ProjectId,
                    typeId: currDatastateID,
                    refs: refs,
                    datastateLength: datastateLength,
                    stateValue: Value,
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
              vm.QueryAssemblageDynamicData();
              vm.timer = setInterval(() => {
                vm.QueryAssemblageDynamicData();
              }, vm.get_freshTime_Data.Rate * 1000);

            }

          }
        });
      },
      QueryAssemblageDynamicData() {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "IsEquipment": vm.IsEquipment,
          "TargetId": vm.TargetId
        };
        let url = eosCommon.ENTERPRISE_API + "api/Assemblage/QueryAssemblageDynamicData";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(result.State == 10002) {
            clearInterval(vm.timer);
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
                    vm.uPDATE_LABEL({
                      isClear: true,
                      isFreshLabel: true,
                      labelContentInfo: {
                        Id: vm.AssemblageDynamicData[i].Id,
                        labelContent: vm.AssemblageDynamicData[i].Value
                      }
                    });
                    break;
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
                          datastateValue: vm.AssemblageDynamicData[i].Value
                        });
                        break;
                      }
                    }
                  }
                }
                vm.uPDATE_CHARTCURRENTDATA(chartCurrentData);
                vm.uPDATE_DATABLOCKCURRENTDATA(datablockCurrentData);
              }
            }
          }
        })
      },
      getRequest() {
        var url = window.location.href; //获取url中"?"符后的字串   
        var theRequest = new Object();
        if(url.indexOf("?") != -1) {
          var str = url.substr(1);
          var strs = str.split("&");
          for(var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
          }
        }
        return theRequest;
      }
    },
    destroyed() {
      clearInterval(this.timer);
    },
    mounted() {
      var objects = this.getRequest();
      for(var key in objects) {
        if(key == 'IsEquipment') {
          this.IsEquipment = objects[key];
        } else {
          this.TargetId = objects[key];
        }

      }
      let htmls = document.querySelector('.droptarget');
      htmls.style['zoom'] = `${this.zoomValue}`;
      this.QueryAssemblageDetail();
    }
  }
</script>
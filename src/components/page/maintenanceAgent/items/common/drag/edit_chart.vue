<template>
  <div :id="id" class="edit_panel" :class="{isEquipClass:isEquip==true}">
    <h3 class="edit_panel_name">曲线设置</h3>
    <div class="edit_content my_edit_chart">
      <div class="selectHeader clearfix">
        <a class="pull-left" :class="{aActive:currEdit=='chartDataSetting'}" @click="toggleSetting('chartDataSetting')">数据源设置</a>
        <a class="pull-left" :class="{aActive:currEdit=='chartAxisSetting'}" @click="toggleSetting('chartAxisSetting')">坐标轴设置</a>
      </div>
      <div v-show="currEdit=='chartDataSetting'" class="time_wrap">
        <div class="time clearfix">
          <span class="txtF fontStyle pull-left">显示的数据时长：</span>
          <div class="timeSelect pull-left">
            <el-select size="small" v-model="propsData.Interval" filterable clearable>
              <el-option value="10">10</el-option>
              <el-option value="20">20</el-option>
              <el-option value="30">30</el-option>
            </el-select>
            <span class="min">分钟</span>
          </div>
        </div>
      </div>
      <div v-show="currEdit=='chartAxisSetting'" class="chartAxisSetting">
        <div class="colorSetting_wrap">
          <span class="fontStyle colorSettingSpan" style="">背景颜色：</span>
          <el-color-picker class="colorSettingPiker" v-model="propsData.backgroundColor"></el-color-picker>
        </div>
        <div class="colorSetting_wrap">
          <span class="fontStyle colorSettingSpan">X轴颜色：</span>
          <el-color-picker class="colorSettingPiker" v-model="propsData.xAxis.lineColor"></el-color-picker>
        </div>
        <div class="myHr"></div>
        <div class="axisCorlorSetting_wrap">
          <span class="fontStyle axisCorlorSettingSpan">左侧Y轴：</span>
          <el-checkbox class="axisCheckBox" v-model="propsData.yAxis.visible">显示</el-checkbox>
          <el-color-picker class="axisCorlorSettingPiker" v-model="propsData.yAxis.lineColor"></el-color-picker>
        </div>
        <div class="axisCorlorSetting_wrap">
          <!--if="rightY.length>0"-->
          <span class="fontStyle axisCorlorSettingSpan">右侧Y轴：</span>
          <el-checkbox class="axisCheckBox" v-model="propsData.rightYAxis.visible">显示</el-checkbox>
          <el-color-picker class="axisCorlorSettingPiker" v-model="propsData.rightYAxis.lineColor"></el-color-picker>
        </div>
        <div class="myHr"></div>
        <div class="axisCorlorSetting_wrap">
          <span class="fontStyle axisCorlorSettingSpan">X轴分割线：</span>
          <el-checkbox class="axisCheckBox" v-model="propsData.xAxis.gridLineWidth">显示</el-checkbox>
          <el-color-picker class="axisCorlorSettingPiker" v-model="propsData.xAxis.gridLineColor"></el-color-picker>
        </div>
        <div class="axisCorlorSetting_wrap">
          <span class="fontStyle axisCorlorSettingSpan">Y轴分割线：</span>
          <el-checkbox class="axisCheckBox" v-model="propsData.yAxis.gridLineWidth">显示</el-checkbox>
          <el-color-picker class="axisCorlorSettingPiker" v-model="propsData.yAxis.gridLineColor"></el-color-picker>
        </div>
      </div>
      <div v-for="(item,index) in chartsData" class="setting_wrap">
        <div class="chartDataSetting">
          <div v-show="currEdit=='chartDataSetting'" class="dataSetting">
            <div class="myHr"></div>
            <div class="info">
              <span class="fontStyle infoFsp" :class="[currentChart==('数据'+index) ? ExpandBg : noExpandBg]" @click="toggleChart(index)">数据{{index+1}}：</span>
              <span v-if="chartsData.length>1" @click="deleteChart(index)" class="deleteChart infoSsp">											
				</span>
            </div>
            <single-chart v-show="currentChart=='数据'+index" :isEquip="isEquip" :getProtocolData="get_protocol_data" :chartsData="chartsData" :indexs="index" :item="item"></single-chart>
          </div>

        </div>
      </div>
      <div v-if="currEdit=='chartDataSetting' && chartsData.length<5" class="addChart">
        <div @click="addChart()" class="addChartWrap">
          <img src="static/css/images/new_drag/13.png" />
          <div class="fontStyle">
            添加数据点
          </div>
        </div>
      </div>
    </div>
    <div class="operations">
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
	import {deletePanel } from 'src/assets/js/common/util';
  import singleChart from './singleChart'
  export default {
    data() {
      return {
        //图片上传
        AccessToken: eosCommon.storage.get("AccessToken"),
        checked: true,
        noExpandBg: 'noExpandBg',
        ExpandBg: 'ExpandBg',
        id: '',
        time: 10,
        currEdit: 'chartDataSetting',
        currentChart: '数据0',
        singleChartSettingData: {
          chartDataSetting: {
            axis: 'leftY'
          },
          chartAxisSetting: {
            info: '设置' + 0
          }
        },
        chartsData: [

				],
        myChecked: true,
        rightY: [],
        getProtocolData: [],
        isEquip: false,
        EquipmentId: ''

      }
    },
    watch: {
      'propsData': {
        handler(val, oldval) {
          let vm = this;
          vm.rightY = vm.chartsData.filter((val) => {
            return val.yData.yAxis == 1
          });
        },
        deep: true
      }
    },
    props: ['propsData', 'currentkey'],
    components: {
      singleChart
    },
    computed: {
      ...mapGetters([
				//"get_protocol_data",
				"get_equipment_data",
				"get_line_ID",
				"get_protocol_data"
			])
    },
    mounted() {
      let vm = this;
      vm.isEquip = vm.propsData.IsEquipment;
      vm.chartsData = vm.propsData.singleChartDataLists;
      if(vm.isEquip) {
        vm.EquipmentId = vm.propsData.eqInfo[0].EquipmentId;
        vm.gET_EQUIPMENT_DATA({
          isEquip: false,
          EquipmentList: this.propsData.eqInfo
        });
        for(let index of Object.keys(vm.chartsData)) {
          vm.chartsData[index].get_equipment_data = vm.propsData.eqInfo;
        }
      } else {
      }

      this.id = "edit_" + this.propsData.refs
    },
    methods: {
      ...mapMutations({
        dELETE_CHART: 'DELETE_CURR_PANEL',
        gET_EQUIPMENT_DATA: 'GET_EQUIPMENT_DATA',
        gETPROTOCOLDATA: 'GETPROTOCOLDATA',
        uPDATE_LINE_ID: 'UPDATE_LINE_ID'
      }),
      toggleChart(index) {
        this.currentChart = '数据' + index;
      },
      addChart() {
        let vm = this;
        let co = ['red', 'blue', 'yellow'];
        let r = parseInt(Math.random() * 20);
        vm.uPDATE_LINE_ID({
          isReset: false
        });
        let lineID = vm.propsData.containerID + vm.get_line_ID;
        let singleChartSettingData = {
          //title:'气温数据图',
          get_equipment_data: vm.get_equipment_data,
          get_protocol_data: [],
          protocolList: [],
          lineId: lineID,
          dataStream: {
            RegisterAddress: '',
            EquipmentId: vm.EquipmentId
          },
          color: 'rgb(102, 102, 102)',
          chartDataSetting: {
            //axis:0//用于哪个轴0：左Y轴  1：右Y轴
          },
          chartAxisSetting: {
            info: '设置' + 1
          },
          yAxis: {
            title: {
              text: 'Value'
            },
            //y轴分割线
            gridLineColor: '#666',
            gridLineDashStyle: 'longdash',
            lineWidth: 1, //y轴粗细
            lineColor: '#666',
            opposite: false,
            showEmpty: false,
            visible: true
          },
          yData: {
            name: '',
            color: '#999',
            yAxis: 0,
            data: [12, r, 3, 8, r, 22, 1]
          }
        }
        vm.chartsData.push(singleChartSettingData);
        vm.currentChart = '数据' + (vm.chartsData.length - 1);
      },
      deleteChart(index) {
        let vm = this;
        vm.chartsData.splice(index, 1);
        if(vm.chartsData.length == 1) {
          vm.chartsData[0].yData.yAxis = 0;
          vm.chartsData[0].yAxis.opposite = false;
        }
      },
      toggleSetting(tab) {
        this.currEdit = tab;
      },
      changeprotocolData() {
        let vm = this;
      },
      getEuipmentDatas: function() {
        var vm = this;
        var param = {
          "AccessToken": vm.AccessToken,
          "PageIndex": 1,
          "PageSize": 100,
          "IsDefaultEquipment": 0, // -- 是否只获取第一台设备的数据
          "Parameters": {
            "CompanyId": '', //--业主Id
            "ProjectId": vm.propsData.ProjectId, //--项目Id(必填)
            "GatewayId": '', //-- 网关id, 可传空
            "Keywords": "", //-- 搜索关键字, 可传空
            "OnlineStatus": -1, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
            "AlarmStatus": -1, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
            "RunStatus": -1, //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
            "Status": '0'
          }
        }
        var url = eosCommon.ENTERPRISE_API + "api/equipment/QueryCommonEquipmentList";
        eosCommon.eosAjax(url, "GET", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            if(result.Data instanceof Array) {
              vm.gET_EQUIPMENT_DATA({
                EquipmentList: []
              });
            } else {
              vm.gET_EQUIPMENT_DATA({
                EquipmentList: result.Data.Equipments
              });
              for(let index of Object.keys(vm.chartsData)) {
                vm.chartsData[index].get_equipment_data = result.Data.Equipments;
              }
            }
          }
        })
      },
      deleteCurrentPanel(event) {
        event.cancelBubble = true;
		let vm=this;
		deletePanel(vm.propsData.refs);
        vm.dELETE_CHART({
          typeName: vm.propsData.typeName,
          currenIndex: vm.propsData.refs,
          isDeleteClick: true,
          isResetOperateMemory: false
        })
      }
    }
  }
</script>
<style lang="less" scoped="scoped">
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
    .el-radio__inner::after {
      background-color: red!important;
    }
    .mychart_radio .el-radio__input.is-checked .el-radio__inner {
      border-color: red;
      background: #1abc9c;
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
      .addChart {
        text-align: center;
        margin-top: 20px;
        .addChartWrap {
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
      .chartAxisSetting {
        .colorSetting_wrap {
          display: inline-block;
          margin-top: 10px;
          position: relative;
        }
        .axisCorlorSetting_wrap {
          display: inline-block;
          margin-top: 10px;
          position: relative;
        }
        .colorSettingSpan {
          display: block;
          position: absolute;
          top: 1px;
          height: 30px;
          line-height: 30px;
        }
        .colorSettingPiker {
          margin-left: 70px;
        }
        .axisCorlorSettingSpan {
          display: block;
          position: absolute;
          top: 1px;
          height: 30px;
          line-height: 30px;
        }
        .axisCheckBox {
          left: 80px;
          height: 30px;
          line-height: 30px;
          position: absolute;
          top: 1px;
        }
        .axisCorlorSettingPiker {
          margin-left: 140px;
        }
      }
      .setting_wrap {}
      .time {
        width: 100%;
        margin-top: 15px;
        .txtF {
          width: 120px;
          height: 30px;
          line-height: 30px;
        }
        .timeSelect {
          width: 120px;
          .el-select {
            width: 87px;
          }
          span.min {
            font-size: 14px;
            color: #000000;
          }
        }
      }
      .chartDataSetting {
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
        /*.content_data{
						transition: all ease 2s;
						.chartName{
							position: relative;
							display: block;
							span{
								display: inline-block;
								height: 30px; 
								line-height: 30px;
							}
							.chartName_input{
								width: 177px;
								position: absolute;
								left: 69px;
							}
						}
						.el-select{
							margin-top: 10px;
												
							
						}
						
					}*/
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
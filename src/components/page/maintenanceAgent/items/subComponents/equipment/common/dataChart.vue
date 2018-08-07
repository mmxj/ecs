<style scoped lang='scss'>
.runWrap {
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  position: relative;
  /* & .title {
    margin-top: 15px;
    color: #8492A6;
    font-size: 14px;
  } */
  & .cont {
    // width: 100%;
    position: absolute;
    top: 0;
    bottom: 15px;
    left: 15px;
    right: 15px; // border: 1px solid #000;
    & .chartWrap {
      padding: 15px; // float: left;
      width: 100%;
      height: 100%; // border: 1px solid #000;
      & .chartCont {
        width: 100%;
        height: 100%;
        border: 1px solid #1ABC9C;
        border-radius: 5px;
        position: absolute;
        left: 0;
        right: 0;
        & .titleWrap {
          background-color: #DFECEB;
          overflow: hidden;
          padding-left: 15px;
          height: 50px;
          line-height: 50px;
          border-bottom: 1px solid #1ABC9C;
          position: relative;
          & .poabtn {
            position: absolute;
            top: 10px;
            right: 15px;
          }
        }
        & .dataChart {
          position: absolute;
          top: 50px;
          bottom: 0;
          left: 0;
          right: 0;
        }
      }
    }
  }
  & .noData {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
  }
  & .pagin {
    // width: 100%;
    position: absolute;
    bottom: 10px;
    left: 15px;
    right: 15px;
    overflow-x: hidden;
  }
}

</style>
<template>
  <div v-loading='loading' class="runWrap">
    <!-- <div class="title">
      <div class="w50p fl tar">
        <span>
          分组名称：
          <el-select v-model="GroupName" size='small' class='por' @change='changeGroupName'>
            <el-option v-for="(item, index) in GroupNameOpts" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </span>
      </div>
      <div class="w50p fl" style="padding-left:120px;line-height:30px;">
        采集时间：
        <span style="font-weight:bold;color:#1ABC9C">{{UploadOn}}</span>
      </div>
    </div> -->
    <!-- <div class="cont" v-show='!isNoData'> -->
    <div class="cont">
      <!-- <div class="chartWrap" v-for='item in chartArr'> -->
      <div class="chartWrap">
        <div class="chartCont">
          <div class="titleWrap">
            <span>单位：</span>
            <el-radio-group v-model="QueryTimeTypeLabel" size='small' @change='setChart'>
              <el-radio-button v-for='item in QueryTimeTypeOpts' :label='item.label'></el-radio-button>
            </el-radio-group>
            <span style="padding-left:20px;">日期：</span>
            <el-date-picker v-if='QueryTimeTypeLabel=="时"||QueryTimeTypeLabel=="分"' v-model="StatTimeRaw" size='small' type="date" placeholder="选择日期" @change='setChart' :clearable='false'>
            </el-date-picker>
            <el-time-select v-if='QueryTimeTypeLabel=="分"' v-model="time" size='small' :picker-options="pickerOption" placeholder="选择时间" @change='setChart' :clearable='false'>
            </el-time-select>
            <el-date-picker v-if='QueryTimeTypeLabel=="天"' v-model="StatTimeRaw" size='small' type="month" placeholder="选择月" @change='setChart' :clearable='false'>
            </el-date-picker>
            <el-date-picker v-if='QueryTimeTypeLabel=="月"' v-model="StatTimeRaw" size='small' type="year" placeholder="选择年" @change='setChart' :clearable='false'>
            </el-date-picker>
            <el-button type="primary" icon="setting" size='small' class='poabtn' @click='showOptionDia'>图表设置</el-button>
          </div>
          <div class="dataChart" ref='chartRef'>
          </div>
        </div>
      </div>
    </div>
    <nodata v-show='isNoData' class='noData'></nodata>
    <el-dialog title="图表设置" :visible.sync="dialogFormVisible">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="多Y轴：" class='w100p'>
          <el-radio v-model="isMulYAxis" :label="false">单Y轴</el-radio>
          <el-radio v-model="isMulYAxis" :label="true">多Y轴</el-radio>
        </el-form-item>
        <el-form-item label="Y轴最大值：" class='w100p'>
          <el-switch
            v-model="isYMax"
            on-color="#13ce66"
            off-color="#ff4949"
            on-text="手动"
            off-text="默认">
          </el-switch>
          <span class="w100 ml15" v-show='isYMax'>
            <el-input v-model="yMaxVal" type="number"></el-input>
          </span>
          
        </el-form-item>
        <el-form-item label="节点筛选：" class='w100p'>
          <el-select v-model="RegisterAddresses" multiple filterable class='w100p'>
            <el-option v-for="item in RegisterAddressesOpts" :key="item.DisplayName" :label="item.DisplayName" :value="item.RegisterAddress">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitNodeForm()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
let echarts = require('echarts/lib/echarts')
import chartOptionOri from 'assets/js/chartOption/historyChartOption'
import nodata from 'components/common/common_tools/tool_components/noData'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const URL = Common.Const.url
const OPTS = Common.Const.options
const Vlidator = Common.Func.validator
export default {
  data: function() {
    return {
      yMaxVal: 0,
      isYMax: false,
      isMulYAxis: true,
      timeIdResize: null,
      loading: true,
      QueryTimeTypeLabel: '时',
      pickerOption: {
        start: '00:00',
        step: '01:00',
        end: '24:00'
      },
      time: '00:00',
      StatTimeRaw: new Date(),
      QueryTimeTypeOpts: OPTS.QUERYTIMETYPEOPTIONS,
      dialogFormVisible: false,
      RegisterAddresses: '',
      RegisterAddressesName: [],
      RegisterAddressesOpts: [],
      isNoData: false
    }
  },
  props: ['propsData'],
  computed: {
    QueryTimeType() {
      let vm = this
      for (let item of OPTS.QUERYTIMETYPEOPTIONS) {
        if (vm.QueryTimeTypeLabel === item.label) {
          return item.value
        }
      }
    },
    StatTime() {
      Date.prototype.format = FUNC.date.format
      return this.StatTimeRaw.format("yyyy-MM-dd hh:mm:ss")
    }

  },
  components: {
    nodata
  },
  methods: {
    //设置数据图
    setChart() {
      let vm = this
      vm.loading = true
      let RegisterAddresses = ''
      /*for (let item of vm.RegisterAddresses) {
        RegisterAddresses += item + ','
      }*/
      let arr = vm.RegisterAddresses
      for (var i = 0; i < arr.length; i++) {
        if (i == arr.length - 1) {
          RegisterAddresses += arr[i]
          break
        }
        RegisterAddresses += arr[i] + ','
      }
      if (RegisterAddresses == '') {
        vm.isNoData = true
        vm.loading = false
        // vm.$message.warning('暂无数据')
        return
      }
      // RegisterAddresses = RegisterAddresses.Substring(0,RegisterAddresses.Length-1)
      let StatTime = vm.StatTime + ''
      if (vm.QueryTimeTypeLabel=='分') {
        StatTime = [StatTime.split(' ')[0], vm.time].join(' ')
      }
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TerminalEquipmentId": vm.propsData.EquipmentId, //设备ID 
        "QueryTimeType": vm.QueryTimeType, //查询类型 0:时 1:天 2:月 3:年
        StatTime, //统计时间，按小时查询精确到小时，按天查询精确到日期，按月查询精确到当月的1号，按年查询精确到今年的1月1号
        RegisterAddresses
      }
      let url = URL.QUERYEQUIPMENTRUNDATA
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.isNoData = false
            let el = vm.$refs.chartRef
            let Data = res.Data
            let myChart = echarts.init(el)
            myChart.clear();
            let chartOption = chartOptionOri
            chartOption.legend.data = vm.RegisterAddressesName
            chartOption.xAxis[0].data = Data[0].XArray
            let yAxisUnit = {}
            let yAxis = []
            let seriesUnit = {}
            let series = []
            let offset = 80
            let color = ['#93D5F1', '#EFCA99', '#BE6B9F', '#8DC1A9', '#EA7E53']
            for (let index in Data) {
              yAxisUnit = {
                type: 'value',
                name: Data[index].DisplayName,
                position: 'right',
                axisLine: {
                  lineStyle: {
                    color: color[index],
                    width: 2
                  }
                },
                axisTick: {
                  show: true
                },
                splitLine: {
                  show: false
                },
                // min: Data[index].YMin,
                // max: Math.ceil(Data[index].YMax),
                max: vm.isYMax?vm.yMaxVal:null,
                axisLabel: {
                  formatter: `{value} ${Data[index].Unit}`,
                  // lineHeight: 56
                }
              }
              if (vm.isMulYAxis) {
                if (index == 0) {
                  yAxisUnit.position = 'left'
                  // yAxisUnit.max = Data[index].YMax
                  yAxisUnit.splitLine.show = true
                  chartOption.grid.right = '100px'
                }
                if (index > 0) {
                  yAxisUnit.offset = offset * index - offset
                  chartOption.grid.right = `${100+yAxisUnit.offset}px`
                }
                if (index > 1) {
                  yAxisUnit.name = `${Data[index].DisplayName.substr(0, 5)}...`
                }
              }else{
                if (index == 0) {
                  yAxisUnit.position = 'left'
                  // yAxisUnit.max = Data[index].YMax
                  yAxisUnit.splitLine.show = true
                  chartOption.grid.right = '100px'
                }
                if (index > 0) {
                  yAxisUnit.axisLine.show = false
                  yAxisUnit.name = ''
                  yAxisUnit.axisLabel = ''
                  yAxisUnit.axisTick.show = false
                }
              }

              yAxis.push(yAxisUnit)

              seriesUnit = {
                name: Data[index].DisplayName,
                type: 'line',
                data: Data[index].YArray,
                yAxisIndex: index,
                smooth: true,
                itemStyle: {
                  normal: {
                    color: color[index],
                    lineStyle: {
                      width: 2
                    },
                  },
                },
                areaStyle: {
                  normal: {
                    // color: color[index],
                    opacity: 0
                  }
                },
              }
              series.push(seriesUnit)
            }
            chartOption.series = series
            chartOption.yAxis = yAxis
            // console.log(chartOption)
            myChart.setOption(chartOption);
            myChart.resize();
            vm.loading = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    submitNodeForm() {
      let vm = this
      if (vm.RegisterAddresses.length > 5) {
        vm.$message.error('节点数量不得大于5')
        return
      }
      if (vm.RegisterAddresses.length < 1) {
        vm.$message.error('请至少选择1个节点')
        return
      }
      vm.setRegisterAddresses()
      vm.dialogFormVisible = false
    },
    setRegisterAddresses() {
      let vm = this
      let Opts = vm.RegisterAddressesOpts
      let addresses = vm.RegisterAddresses
      let nameArr = []
      for (let index in Opts) {
        for (let item of addresses) {
          if (item == Opts[index].RegisterAddress) {
            nameArr.push(Opts[index].DisplayName)
          }
        }
      }
      vm.RegisterAddressesName = nameArr
      vm.setChart()
    },
    setRegisterAddressesOpts(TerminalEquipmentId) {
      let vm = this
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageIndex": 1,
        "PageSize": 0, //PageSize=0时传全部数据
        "Parameters": {
          TerminalEquipmentId
        }
      }
      let url = URL.QUERYSTATPROTOCOL
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.RegisterAddressesOpts = res.Data.Result
            let l = vm.RegisterAddressesOpts.length
            l = l > 4 ? 4 : l
            vm.RegisterAddresses = []
            for (let index in vm.RegisterAddressesOpts) {
              if (index > l) break
              vm.RegisterAddresses.push(vm.RegisterAddressesOpts[index].RegisterAddress)
              vm.RegisterAddressesName.push(vm.RegisterAddressesOpts[index].DisplayName)
            }
            // console.log(vm.RegisterAddresses)
            vm.setChart()
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    showOptionDia() {
      let vm = this
      vm.dialogFormVisible = true
    },
    init() {
      let vm = this
      vm.$nextTick(function() {
        // vm.resetIndexWH()
        setTimeout(function() {
          vm.setRegisterAddressesOpts(vm.propsData.EquipmentId)
        }, 0)
      })
    },
    resizeFun() {
      let vm = this
      clearTimeout(vm.timeIdResize)
      // this.judgeScroll()
      // this.resetIndexWH()
      // this.initMap()
      vm.timeIdResize = setTimeout(function() {
        vm.setChart()
      }, 300)
    },
  },
  watch: {
    propsData: {
      handler(val, oldVal) {
        this.init();
      },
      deep: true
    }
  },
  mounted: function() {
    let vm = this
    vm.init()
    window.addEventListener('resize', vm.resizeFun)
  },
  beforeDestroy: function() {
    let vm = this
    window.removeEventListener('resize', vm.resizeFun)
  }
}

</script>

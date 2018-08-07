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
          & .frbtn {
            margin-top: 10px;
            float: right;
          }
        }
        & .dataList {
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
    <div class="cont">
      <div class="chartWrap">
        <div class="chartCont">
          <div class="titleWrap">
            <span>开始时间：</span>
            <!-- <el-date-picker size='small' v-model="timeRange" type="datetimerange" placeholder="选择时间范围" align="right" :clearable='false' @change='search' :picker-options="pickerOptions">
            </el-date-picker> -->
            <el-date-picker size='small' v-model="StartDate" :clearable='false' :editable='false' type="datetime" @change='search' placeholder="开始时间"></el-date-picker>
            <span style="padding-left:20px;">结束时间：</span>
            <el-date-picker size='small' v-model="EndDate" :clearable='false' :editable='false' type="datetime" @change='search' placeholder="结束时间"></el-date-picker>
            <span style="padding-left:20px;">每页显示：</span>
            <el-select size='small' v-model="PageSize" placeholder="客户类型" @change='search' class='w100'>
              <el-option :key="20" label="20条" :value="20"></el-option>
              <el-option :key="50" label="50条" :value="50"></el-option>
              <el-option :key="100" label="100条" :value="100"></el-option>
              <el-option :key="200" label="200条" :value="200"></el-option>
            </el-select>
            <el-button type="primary" size='small' class='frbtn' @click='exportAll' style='margin-left: 10px;margin-right: 10px;'>导出所有数据</el-button>
            <el-button type="primary" size='small' class='frbtn' @click='exportCurrentPage'>导出当前表格</el-button>
            <el-button type="primary" icon="setting" size='small' class='frbtn' @click='showOptionDia'>筛选</el-button>
          </div>
          <div class="dataList" ref='dataList'>
            <div></div>
            <el-table id='hisDataTable' :data="tableData" class='userTable' :height='tableHeight' stripe>
              <el-table-column v-for='(item,index) in tableHead' :prop="item" :label="item" align='center' width='200'>
              </el-table-column>
            </el-table>
            <div class="pagin">
              <div class="pageDes">
                <span>当前显示 {{firstPage}} 到 {{lastPage}} 条记录</span>
                <span>共 {{Total}} 条记录</span>
              </div>
              <div class="pageBlock">
                <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="Total">
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nodata v-show='isNoData' class='noData'></nodata>
    <el-dialog title="请选择节点" :visible.sync="dialogFormVisible">
      <el-form label-width="100px" class="demo-ruleForm">
        <el-form-item label="节点：" class='w100p'>
          <el-select v-model="tableHead" multiple filterable class='w100p'>
            <el-option v-for="item in RegisterAddressesOpts" :key="item" :label="item" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="setTableHead()">关 闭</el-button>
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
Date.prototype.format = FUNC.date.format
const AXIOS = FUNC.axios
const GET = AXIOS.get
const DELETE = AXIOS.delete
const URL = Common.Const.url
const OPTS = Common.Const.options
const Vlidator = Common.Func.validator
// const NOW = new Date()
export default {
  data: function() {
    return {
      PageSize: 20,
      Total: undefined,
      PageIndex: 1,
      tableHeight: 0,
      tableHead: [],
      tableData: [],
      isOperate: {},
      // timeRange: [new Date(NOW.getTime() - 3600 * 1000 * 16), NOW],
      StartDate: '',
      EndDate: '',
      loading: false,
      /*pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            picker.$emit('pick', [new Date(NOW.getTime() - 3600 * 1000 * 24 * 7), NOW]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            picker.$emit('pick', [new Date(NOW.getTime() - 3600 * 1000 * 24 * 30), NOW]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            picker.$emit('pick', [new Date(NOW.getTime() - 3600 * 1000 * 24 * 90), NOW]);
          }
        }]
      },*/
      RegisterAddressesOpts: [],
      isNoData: false,
      dialogFormVisible: false,
    }
  },
  props: ['propsData'],
  computed: {
    StartTime() {
      if (this.StartDate) {
        let startTime = this.setTimeStr(this.StartDate)
        return startTime
      } else {
        return ''
      }
    },
    EndTime() {
      if (this.EndDate) {
        let endTime = this.setTimeStr(this.EndDate)
        return endTime
      } else {
        return ''
      }
    },
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.Total)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.Total)
    },
  },
  components: {
    nodata
  },
  methods: {
    setTimeStr(date) {
      Date.prototype.format = FUNC.date.format
      date = date.format("yyyy-MM-dd hh:mm:ss")
      return date
    },
    exportCurrentPage() {
      $('#hisDataTable').tableExport({
        type: 'excel',
        escape: false
      });
    },
    exportAll() {
      let vm = this
      vm.loading = true
      if (!vm.propsData.EquipmentId) return
      let TerminalEquipmentId = vm.propsData.EquipmentId
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageIndex": 0,
        "PageSize": 0,
        "Parameters": {
          TerminalEquipmentId,
          // "RegisterAddresses": vm.RegisterAddress,
          "StartTime": vm.StartTime,
          "EndTime": vm.EndTime
        }
      }
      let url = URL.EXPORTHISTORIC
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            if (data instanceof Array) {
              vm.$message.warning('无数据导出');
              return
            }
            window.location.href = data.DownloadUrl;
            vm.$message.success('导出数据成功');
            vm.$nextTick(function() {
              vm.loading = false
              // vm.deleteRes(data.ResourceId);
            })
          }
        })
        .catch(function(error) {
          vm.$message.error('导出数据超时，您可以尝试缩小查询时间范围再试！')
          vm.$nextTick(function() {
            vm.loading = false
          })
          console.log(error.message)
        });
    },
    deleteRes(ResourceId) {
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        "Parameters": {
          ResourceId, //必填
          "ResourceType": 4 //必填 可选值：0:项目资源 1:设备资源 2:证件资源 3:配置资源 4:其他资源
        }
      }
      DELETE(URL.DELETERESOURCE, data)
    },
    pageIndexChange(val) {
      this.PageIndex = val
      this.setTable()
    },
    search() {
      this.setTable(this.PageIndex = 1)
    },
    setTable(PageIndex = this.PageIndex) {
      let vm = this
      vm.loading = true
      vm.isNoData = true
      if (!vm.propsData.EquipmentId) return
      let TerminalEquipmentId = vm.propsData.EquipmentId
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        PageIndex,
        "PageSize": vm.PageSize,
        "Parameters": {
          TerminalEquipmentId,
          // "RegisterAddresses": vm.RegisterAddress,
          "StartTime": vm.StartTime,
          "EndTime": vm.EndTime
        }
      }
      let url = URL.QUERYDATA
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.isNoData = false
            let dataArr = res.Data.Result
            if (!res.Data.Total) {
              vm.Total = 0
            } else {
              vm.Total = res.Data.Total
            }
            vm.reload(dataArr)
            // console.log(vm.RegisterAddresses)
            vm.$nextTick(function() {
              vm.loading = false
            })
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    reload(dataArr) {
      let temp = []
      let tableHead = []
      for (let index in dataArr) {
        let unit = {
          '时间': dataArr[index].ActivityDate
        }
        if (index == 0) tableHead.push('时间')
        for (let jtem of dataArr[index].Details) {
          unit[jtem.DisplayName] = jtem.NodeValue
          if (index == 0) {
            tableHead.push(jtem.DisplayName)
          }
        }
        temp.push(unit)
      }
      // console.log(temp)
      // console.log(tableHead)
      this.RegisterAddressesOpts = tableHead
      this.tableHead = tableHead
      this.tableData = temp
    },
    setTableHead() {
      let vm = this
      vm.dialogFormVisible = false
    },
    showOptionDia() {
      let vm = this
      vm.dialogFormVisible = true
    },
    init() {
      let vm = this
      let Now = new Date()
      vm.StartDate = new Date(Now.getTime() - 3600 * 1000 * 16)
      vm.EndDate = new Date()
      vm.setTable()
      vm.$nextTick(function() {
        setTimeout(function() {
          let el = vm.$refs.dataList
          vm.tableHeight = el.clientHeight - 50
        }, 0)
      })
    },
    resizeFun() {
      let vm = this
      vm.setTable()
      vm.$nextTick(function() {
        setTimeout(function() {
          let el = vm.$refs.dataList
          vm.tableHeight = el.clientHeight - 50
        }, 0)
      })
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
    vm.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(vm.isOperate)
    vm.init()
    window.addEventListener('resize', vm.resizeFun)
  },
  beforeDestroy: function() {
    let vm = this
    window.removeEventListener('resize', vm.resizeFun)
  }
}

</script>

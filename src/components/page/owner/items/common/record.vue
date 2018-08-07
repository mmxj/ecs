<style scoped lang='less'>
.el_mainContent{
  width:100%;
  height:100%;
  position: relative;
  background-color: #fff;
}

</style>
<template>
  <div class='el_mainContent' v-loading="loadingTable">
    <div class="el_content" style="padding: 15px;padding-top: 10px" element-loading-text="努力加载中" v-show='showWhichTab==1'>
      <el-row class='border-1px' v-if="!propsData.EquipmentId">
        <el-col :span="22">
          <h3>服务管理</h3>
        </el-col>
      </el-row>
      <div class="hr mb10" v-if="!propsData.EquipmentId"></div>
      <div>
        <el-row>
          <el-col :span='24'>
            <el-button style='position:relative;top:-2px' size='small' v-show='isOperate.create' type="primary" icon='plus' @click="showWhichTab=3" class='mb10'>新增</el-button>
            <span v-show='isOperate.query'>
            <span class="w100 mb10" v-show='isShowProjectId'>
              <el-select size='small' v-model="ProjectId" filterable clearable placeholder="项目名称" @change='search'>
                <el-option
                    v-for="(item, index) in projectOpts"
                    :key="index"
                    :label="item.ProjectName"
                    :value="item.ProjectId">
                  </el-option>
              </el-select >
            </span>
            <span class="w100 mb10">
              <el-select size='small' v-model="ServiceType" filterable clearable placeholder="服务类型" @change='search'>
                <el-option
                    v-for="item in ServiceTypeOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w100 mb10">
              <el-select size='small' v-model="ServiceState" clearable placeholder="服务状态" @change='search'>
                <el-option
                    v-for="item in ServiceStateOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w100 mb10">
              <el-select size='small' v-model="SignedState" clearable placeholder="确认状态" @change='search'>
                <el-option
                    v-for="item in SignedStateOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <!-- <el-button type="primary" icon='search' class='ml15 mb10' @click='search'>查找</el-button> -->
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" style="width: 100%" class='userTable' stripe>
              <el-table-column prop="ServiceTypeName" label="服务类型" align='center' width='100'>
              </el-table-column>
              <el-table-column label="所属项目" align='center' width='120'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.ProjectName">{{scope.row.ProjectName}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="ServiceContent" label="服务内容" align='center' width='120'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.ServiceContent">{{scope.row.ServiceContent}}</div>
                </template>
              </el-table-column>
              <el-table-column label="服务客户" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.CustomerName">{{scope.row.CustomerName}}</div>
                </template>
              </el-table-column>
              <el-table-column label="服务人员" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.Technicians">{{scope.row.Technicians}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="StartTime" label="开始时间" align='center' width='180'>
              </el-table-column>
              <el-table-column prop="EndTime" label="结束时间" align='center' width='180'>
              </el-table-column>
              <el-table-column label="所关联工单" align='center' min-width='180'>
                <template scope="scope">
                  <router-link :title="scope.row.WorkOrderNo" class='nowrap' :to="{ name: 'work_order_details', params: { orderinfos: {
                    WorkOrderId: scope.row.FromWorkOrderId,
                    ProjectId: scope.row.ProjectId
                  } }}">{{scope.row.WorkOrderNo}}</router-link>
                </template>
              </el-table-column>
              <el-table-column prop="ServiceStateName" label="服务状态" align='center' width='100'>
              </el-table-column>
              <el-table-column prop="SignedName" label="确认状态" align='center' width='100'>
              </el-table-column>
              <el-table-column prop="CustomerComments" label="确认描述" align='center' width='100'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.CustomerComments">{{scope.row.CustomerComments}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="AlarmLevelName" label="操作" align='center' fixed="right" width='120'>
                <template scope="scope">
                  <el-button @click="seeDetail(scope.row)" type="text" size="mini" class='eosLink' v-show='isShowConfirmBtn(scope.row)'>确认</el-button>
                  <el-button @click="seeDetail(scope.row)" type="text" size="mini" class='eosLink'>详情</el-button>
                  <!-- <el-button @click="seeDetail(scope.row)" type="text" size="big" class='eosLink'><i class="fa fa-eye" title="查看详情"></i></el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- <div class="clearfix mb10"></div> -->
        <!-- <el-row>
          <el-col :span='24'>
            <div class="pageBlock">
              <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="Total">
              </el-pagination>
            </div>
          </el-col>
        </el-row> -->
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
    <div class="el_content" v-if='showWhichTab==2'>
      <el-row class='border-1px'>
        <el-col :span="22">
          <h3>服务详情</h3>
        </el-col>
        <el-col :span="2">
          <el-button class='mb10 fr' size='small' @click='showWhichTab=1'><i class="fa fa-mail-reply-all mr5"></i>返回</el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <el-row class='border-1px'>
        <el-col :span="14">
          <detailBox :serviceOrderId='currentRow.ServiceOrderId' :commentRow.sync='commentRow'></detailBox>
        </el-col>
        <el-col :span="10" v-if='currentRow.isShowConfirm'>
          <!-- <confirmBox :row='currentRow'></confirmBox> -->
          <commentBox :row='commentRow'></commentBox>
        </el-col>
      </el-row>
    </div>
    <div class="el_content" v-if='showWhichTab==3'>
      <el-row class='border-1px'>
        <el-col :span="22">
          <h3>新增服务记录</h3>
        </el-col>
        <el-col :span="2">
          <el-button class='mb10 fr' size='small' @click='showWhichTab=1'><i class="fa fa-mail-reply-all mr5"></i>返回</el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <el-row class='border-1px'>
        <el-col :span="24">
          <addBox :projectOpts='projectOpts' :showWhichTab.sync='showWhichTab' :propsData='{ProjectId:ProjectId,EquipmentId:EquipmentId}'></addBox>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import detailBox from './serviceDetailBox'
// import confirmBox from './serviceConfirmBox'
import commentBox from './serviceCommentBox'
import addBox from './serviceAddBox'
const OPTS = Common.Const.options
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
import * as Common from 'src/assets/js/common';
let URL = Common.Const.url
export default {
  data: function() {
    return {
      isShowProjectId: true,
      ProjectId: '',
      EquipmentId: '',
      projectOpts: [],

      ServiceType: '',
      ServiceTypeOpts: OPTS.SERVICETYPEOPTIONS,
      ServiceTypeName: '',

      SignedState: '',
      SignedStateOpts: OPTS.SIGNEDSTATEOPTIONS,

      ServiceState: '',
      ServiceStateOpts: OPTS.SERVICESTATEOPTIONS,

      timeRange: [],

      loadingTable: true,
      tableData: [],
      PageIndex: 1,
      PageSize: 10,
      Total: undefined,
      showWhichTab: 1,
      commentRow: {},
      //操作权限相关
      isOperate: {},

      currentRow: {
        ServiceAttitude: 5,
        ServiceEfficiency: 5,
        ServiceQuality: 5,
        ServiceSuggestion: '',
      },

      getServicesUrl: URL.SERVICES, //获取服务条目
      projectListUrl: URL.PROJECT, //获取项目列表(下拉框)

    }
  },

  computed: {
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.Total)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.Total)
    },
    ServiceTypeBeSet() {
      if (this.ServiceType == '') {
        return 0
      }
      return this.ServiceType
    },
    ServiceStateBeSet() {
      if (this.ServiceState == '') {
        return 0
      }
      return this.ServiceState
    },
    StartTime() {
      if (this.timeRange[0]) {
        let startTime = this.setTimeStr(this.timeRange[0])
        return startTime
      } else {
        return ''
      }
    },
    EndTime() {
      if (this.timeRange[1]) {
        let endTime = this.setTimeStr(this.timeRange[1])
        return endTime
      } else {
        return ''
      }
    },
  },
  components: {
    detailBox,
    // confirmBox,
    commentBox,
    addBox
  },
  props: ['propsData'],
  methods: {
    isShowConfirmBtn(row) {
      if (row.HasSignPower == 1 && row.CustomerSigned == 0) return true
      return false
    },
    setProjectOpts() {
      let vm = this
      let url = vm.projectListUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.projectOpts = res.Data.Result
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },

    //搜索按钮
    search() {
      this.tableLoad(this.PageSize, this.PageIndex = 1,
        this.ProjectId, this.ServiceTypeBeSet,
        this.ServiceStateBeSet, this.SignedState,
        this.CustomerName,
        this.StartTime, this.EndTime)
    },

    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      ProjectId = this.ProjectId,
      EquipmentId = this.EquipmentId,
      ServiceType = this.ServiceTypeBeSet,
      ServiceState = this.ServiceStateBeSet,
      SignedState = this.SignedState,
      CustomerName = this.CustomerName,
      StartTime = this.StartTime,
      EndTime = this.EndTime) {
      let vm = this
      vm.loadingTable = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageIndex": this.PageIndex,
        "PageSize": this.PageSize,
        "Parameters": {
          "ProjectId": this.ProjectId,
          "EquipmentId": this.EquipmentId,
          "ServiceType": this.ServiceTypeBeSet,
          'ServiceState': this.ServiceStateBeSet,
          'SignedState': this.SignedState,
          "CustomerName": this.CustomerName,
          "StartTime": this.StartTime,
          "EndTime": this.EndTime
        }
      }
      let url = this.getServicesUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = response.data.Data.Result
            let Total = response.data.Data.Total
            if (!Total) {
              vm.Total = 0
              dataArr = []
            } else {
              vm.Total = Total
            }
            vm.reload(dataArr)
            vm.loadingTable = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    pageIndexChange(val) {
      this.PageIndex = val
      this.tableLoad(this.PageSize, this.PageIndex,
        this.ProjectId, this.ServiceTypeBeSet,
        this.ServiceStateBeSet, this.SignedState,
        this.CustomerName,
        this.StartTime, this.EndTime)
    },
    reload(dataArr) {
      for (let item of dataArr) {}
      this.tableData = dataArr
    },
    setTimeRange() {
      let endTime = new Date()
      let startTime = endTime.valueOf()
      startTime = startTime - 30 * 24 * 60 * 60 * 1000
      startTime = new Date(startTime)
      return [startTime, endTime]
    },
    setTimeStr(date) {
      Date.prototype.format = FUNC.date.format
      date = date.format("yyyy-MM-dd")
      return date
    },
    seeDetail(row) {
      this.currentRow = row
      this.currentRow.isShowConfirm = row.HasSignPower == 1 ? true : false
      this.showWhichTab = 2;
    },
    isHasPropsData() {
      let vm = this
      if (vm.propsData.ProjectId) {
        vm.ProjectId = vm.propsData.ProjectId
        vm.isShowProjectId = false
      }
    },
    initData() {
      this.setProjectOpts()
      this.isHasPropsData()
      this.EquipmentId = this.propsData.EquipmentId;
      this.tableLoad()

    }
  },
  watch: {
    showWhichTab: function() {
      this.tableLoad()
    },
    propsData() {
      this.initData();
    }
  },
  mounted: function() {
    this.initData();
    let op = FUNC.tntool.setTnAuthByName('服务管理')
    this.isOperate = FUNC.operator.eosOperDataHandle(op)
    // console.log(this.isOperate)
  }
}

</script>

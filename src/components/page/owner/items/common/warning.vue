<style lang='less' scoped>
.colorSpan {
  line-height: 20px
}
.el_mainContent{
  width:100%;
  height:100%;
  position: relative;
  background-color: #fff;
}
.el_content{
  padding: 15px;
  overflow-y: auto;
  width:100%;
}
.pdt0{
  padding-top: 0;
}
</style>
<template>
  <div class='el_mainContent' v-loading="loadingTable">
    <div class="el_content" :class='(propsData.ProjectId && !propsData.fromMap)?"pdt0":""' element-loading-text="努力加载中" style="height: calc(100% - 40px)">
      <div v-if='!propsData.ProjectId || propsData.fromMap'>
        <el-row class='border-1px'>
          <el-col :span="22">
            <h3>预警告警</h3>
          </el-col>
          <el-col :span="2" class='tar'>
            <el-button class='mb5' size='small' @click='goBack'>
              <i class="fa fa-mail-reply-all mr5"></i>返回
            </el-button>
          </el-col>
        </el-row>
        <div class="hr mb10"></div>
      </div>
      <div class="mb10" v-else></div>
      <div>
        <el-row v-show='isOperate.query'>
          <el-col :span='22'>
            <span class="w100 mb10" v-show='isShowCompanyId && isShowWithProp'>
              <el-select v-model="CompanyId" filterable clearable placeholder="客户名称" @change='resetProjectOpts(CompanyId)' size='small'>
                <el-option
                    v-for="(item, index) in companyOpts"
                    :key="index"
                    :label="item.CompanyName"
                    :value="item.CompanyId">
                  </el-option>
              </el-select >
            </span>
            <span class="w200 mb10" v-if='isShowProjectId || isShowWithProp'>
              <el-select v-model="ProjectId" @change='changeEquipmentOpts' filterable clearable placeholder="项目名称" size='small'>
                <el-option
                    v-for="(item, index) in projectOpts"
                    :key="index"
                    :label="item.ProjectName"
                    :value="item.ProjectId">
                  </el-option>
              </el-select >
            </span>
            <span class="w100 mb10" v-show='isShowEquipmentId'>
              <el-select v-model="EquipmentId" filterable clearable placeholder="设备名称" @change='search' size='small'>
                <el-option
                    v-for="item in EquipmentOpts"
                    :key="item.EquipmentId"
                    :label="item.EquipmentName"
                    :value="item.EquipmentId">
                  </el-option>
              </el-select>
            </span>
            <span class="w100 mb10">
              <el-select v-model="Level" clearable placeholder="级别" @change='search' size='small'>
                <el-option
                    v-for="item in LevelOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <!-- <span class="w100 mb10">
              <el-select v-model="ResetStatus" clearable placeholder="状态" @change='search' size='small'>
                <el-option
                    v-for="item in ResetStatusOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span> -->
          </el-col>
          <el-col :span='2'>
            <el-button size='small' class='mb10 fr' @click='isSearchHistory=!isSearchHistory'>查看{{isSearchHistory?'未':'已'}}复位记录</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" style="width: 100%" class='userTable' stripe>
              <el-table-column type="index" label="序号" width='65' align='center'>
              </el-table-column>
              <el-table-column prop="EquipmentAlias" label="设备名称" align='center' width='100'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.EquipmentAlias">{{scope.row.EquipmentAlias}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="ProjectName" label="所属项目" align='center' width='120'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.ProjectName">{{scope.row.ProjectName}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="AlarmTime" label="预警/告警时间" align='center' width='180'>
              </el-table-column>
              <el-table-column prop="FaultCodes" label="故障代码" align='center' width='100'>
              </el-table-column>
              <el-table-column prop="AlarmLocation" label="预警位置" align='center' width='100'>
              </el-table-column>
              <el-table-column label="故障描述" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.AlarmContent">{{scope.row.AlarmContent}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="AlarmLevelName" label="级别" align='center' width='100'>
                <template scope="scope">
                  <div>
                    <label :style='scope.row.AlarmLevel==1?alarmLevelLableStyle.style1:(scope.row.AlarmLevel==2?alarmLevelLableStyle.style2:alarmLevelLableStyle.style3)' class='colorLabel'>{{scope.row.AlarmLevelName}}</label>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="ResetStatusName" label="状态" align='center' width='100'>
                <template scope="scope">
                  <div>
                    <label :style='scope.row.ResetStatus==0?resetStatusLableStyle.style0:resetStatusLableStyle.style1' class='colorLabel'>{{scope.row.ResetStatusName}}</label>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="所关联工单" align='center' width='200'>
                <template scope="scope">
                  <router-link :title="scope.row.WorkOrderNo" class='nowrap' :to="{ name: 'work_order_details', params: { orderinfos: {
                    WorkOrderId: scope.row.WorkOrderId,
                    ProjectId: scope.row.ProjectId
                  } }}">{{scope.row.WorkOrderNo}}</router-link>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" align='center' width='150'>
                <template scope="scope">
                  <el-popover trigger="click" placement="top" :ref='scope.row.FaultId'>
                    <p style="text-align: center;">确认手动复位吗？</p>
                    <div style="text-align: center; margin-top: 10px">
                      <el-button size="mini" type="text" @click="hideResetPop">取消</el-button>
                      <el-button type="primary" size="mini" @click="reset(scope.row)">确定</el-button>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <el-button type="text" size="small" v-show='isShowResetBtn(scope.row)' title='手动复位'><i class="fa fa-refresh"></i></el-button>
                    </div>
                  </el-popover>
                  <el-button @click="seeMore(scope.row)" type="text" size="small" class='ml5'><i class="fa fa-eye" title="查看详情"></i></el-button>
                  <el-popover trigger="click" placement="top" :ref='scope.row.ProjectId'>
                    <p style="text-align: center;">确认手动创建工单吗？</p>
                    <div style="text-align: center; margin-top: 10px">
                      <el-button size="mini" type="text" @click="hideResetPop">取消</el-button>
                      <el-button type="primary" size="mini" @click="createOrderDirectly(scope.row)">确定</el-button>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <el-button type="text" size="small" class='ml5' v-show='isShowCreateBtn(scope.row)' title='手动创建工单'><i class="fa fa-plus"></i></el-button>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- <div class="clearfix mb10"></div>
        <el-row>
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
    <el-dialog title="预警告警详情" :visible.sync="isShowDetailDialog">
      <el-row v-loading="loadingDetailDialog" element-loading-text="努力加载中">
        <el-col :span='12'>
          <el-form label-width="120px" class="demo-ruleForm">
            <el-form-item label="设备名称：">{{detailForm.EquipmentAlias}}</el-form-item>
            <el-form-item label="报警时间：">{{detailForm.AlarmTime}}</el-form-item>
            <el-form-item label="故障代码：">{{detailForm.FaultCodes}}</el-form-item>
            <el-form-item label="维保联系人：">{{detailForm.Contact}}</el-form-item>
            <el-form-item label="维保联系电话：">{{detailForm.Mobile}}</el-form-item>
            <el-form-item label="故障持久性：">{{detailForm.FaultDurabilitys}}</el-form-item>
            <!-- <el-form-item label="警报信息：">
              {{detailForm.EventDetail.CreatedBy}}
              {{detailForm.EventDetail.CreatedOn}}
              {{detailForm.EventDetail.Account}}
              {{detailForm.EventDetail.Status}}
              {{detailForm.EventDetail.Remark}}
            </el-form-item> -->
          </el-form>
        </el-col>
        <el-col :span='12'>
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="级别：">
              <span :style='detailForm.AlarmLevel==1?alarmLevelLableStyle.style1:(detailForm.AlarmLevel==2?alarmLevelLableStyle.style2:alarmLevelLableStyle.style3)' class='colorLabel colorSpan'>{{detailForm.AlarmLevelName}}</span>
            </el-form-item>
            <el-form-item label="状态：">
              <label :style='detailForm.Status==1?resetStatusLableStyle.style0:resetStatusLableStyle.style1' class='colorLabel colorSpan'>{{detailForm.StatusName}}</label>
            </el-form-item>
            <el-form-item label="报警位置：">{{detailForm.EquipmentPlace}}</el-form-item>
            <el-form-item label="所属项目：">{{detailForm.ProjectName}}</el-form-item>
            <el-form-item label="项目地址：">{{detailForm.ProjectAddress}}</el-form-item>
          </el-form>
        </el-col>
        <el-col :span='24'>
          <el-form label-width="120px" class="demo-ruleForm">
            <el-form-item label="故障描述：">{{detailForm.AlarmContent}}</el-form-item>
            <el-form-item label="警报信息：">{{detailForm.EventDetailDes}}</el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDetailDialog = false">关 闭</el-button>
        <el-button type="primary" @click="createOrder" v-show='detailForm.isShowCreateOrder'>手动创建工单</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const PUT = AXIOS.put
const URL = Common.Const.url
const OPTS = Common.Const.options
const operateOptions = Common.Const.options.FUNC_OPERATEOPTIONS
const STYLE = Common.Const.style
// console.log(STYLE)
export default {
  data() {
    return {
      isSearchHistory: false,
      IsExperienceUser: FUNC.storage.get("IsExperienceUser"),
      IsAdmin: FUNC.storage.get("IsAdmin"),
      EntitySort: FUNC.storage.get("EntitySort"),
      CompanyId: '',
      companyOpts: [],
      detailForm: {
        EventDetail: {}
      },
      loadingDetailDialog: true,
      isShowDetailDialog: false,
      //操作权限相关
      isOperate: {},
      isShowProjectId: true,
      isShowEquipmentId: true,
      alarmLevelLableStyle: STYLE.alarmLevelLable,
      resetStatusLableStyle: STYLE.resetStatusLable,

      //加载表格相关
      loadingTable: false,
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      ProjectId: "", //项目id
      projectOpts: [],

      EquipmentId: "", //设备id
      EquipmentOpts: [],

      ResetStatus: "", //复位状态：0-未复位 1-已复位 空-全部
      ResetStatusOptions: OPTS.RESETSTATUSOPTIONS,

      Level: "", //状态:0-启用,1-停用,空-全部
      LevelOptions: OPTS.LEVELOPTIONS,

      StartTime: '',
      EndTime: '',

      tableData: [],

      queryFaultUrl: URL.QUERYFAULT, //预警告警列表
      equipmentListUrl: URL.EQUIPMENT, //获取设备列表(下拉框)
      resetUrl: URL.FAULTRESET, //复位设备
      detailUrl: URL.FAULTDETAIL, //查看详情
      createOrderUrl: URL.ALARMWORKORDER, //新增告警类工单
      companyListUrl: URL.GETALLCOMPANY, //获取业主列表(下拉框)
      resetProjectListUrl: URL.PROJECTQUERY, //获取项目列表(下拉框)
    }
  },
  props: ['propsData'],
  computed: {
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.Total)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.Total)
    },
    //之所以要把Level处理
    LevelBeSet() {
      if (!this.Level) {
        return '0'
      } else {
        return this.Level
      }
    },

    //判断是否平台账号,只有平台账号才会显示客户选项
    isShowCompanyId() {
      let EntitySort = FUNC.storage.get("EntitySort")
      if (EntitySort == 2) {
        this.setCompanyOpts()
        return true
      } else {
        return false
      }
    },
    isShowWithProp(){
      if (this.propsData.fromMap) return true
      if (!this.propsData.ProjectId) {
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    toggleHistory(){

    },
    goBack(){
      this.$router.go(-1)
    },
    hasResetRight(row){
      if (row.HasResetPower == 1 || (this.EntitySort == 1 && this.IsAdmin == 1)) return true
      return false
    },
    isShowResetBtn(row) {
      if (this.hasResetRight(row) && row.ResetStatus==0) return true
      return false
    },
    isShowCreateBtn(row) {
      if (this.hasResetRight(row) && !row.WorkOrderId) return true
      return false
    },
    resetProjectOpts(CompanyId) {
      let vm = this
      let url = vm.resetProjectListUrl
      let data = {
        IsMaint: 2,
        AccessToken: FUNC.storage.get("AccessToken"),
        CompanyId: CompanyId
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.projectOpts = res.Data.Result
            vm.ProjectId = ''
            vm.search()
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setCompanyOpts() {
      let vm = this
      let url = vm.companyListUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.companyOpts = res.Data
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    createOrder() {
      let vm = this
      let url = vm.createOrderUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "EquipmentAlarmId": vm.detailForm.FaultId,
        "ProjectId": vm.detailForm.ProjectId,
        "EquipmentId": vm.detailForm.EquipmentId,
        "AlarmLevel": vm.detailForm.AlarmLevel,
        "FaultDurabilitys": vm.detailForm.FaultDurabilitys,
        "AlarmTime": vm.detailForm.AlarmTime,
        "AlarmName": vm.detailForm.AlarmContent,
      }
      // console.log(data)
      POST(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.successMsg('创建工单成功')
            vm.isShowDetailDialog = false
            vm.tableLoad()
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    hideResetPop() {
      document.querySelector("#ecos").click()
    },
    reset(row) {
      // console.log(row)
      let vm = this
      let url = vm.resetUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "FaultId": row.FaultId
        }
      }
      PUT(url, data).then(function(response) {
        // console.log(res)
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.successMsg('复位成功')
          vm.hideResetPop()
          vm.tableLoad()
        }
      })
    },
    //成功提示信息
    successMsg(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'success'
      });
    },
    setProjectOpts() {
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }

      let url = URL.PROJECT
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.projectOpts = res.Data.Result
            // console.log(vm.projectOpts)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    changeEquipmentOpts() {
      this.setEquipmentOpts()
      this.EquipmentId = ''
      this.search()
    },
    //加载功能父祖列表
    setEquipmentOpts() {
      let vm = this
      if (vm.ProjectId == '') {
        vm.EquipmentOpts = []
        return false
      }
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters: {
          ProjectId: vm.ProjectId,
        }
      }
      let url = vm.equipmentListUrl
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.EquipmentOpts = res.Data.Result
            // console.log(vm.EquipmentOpts)
          }

        })
        .catch(function(error) {
          console.log(error.message)
        });
    },

    //查看更多
    seeMore(row) {
      // console.log(row)
      let vm = this
      vm.loadingDetailDialog = true
      vm.isShowDetailDialog = true
      let url = vm.detailUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "FaultId": row.FaultId
        }
      }
      GET(url, data).then(function(response) {
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.detailForm = res.Data.queryEquipmentFaultDetail[0]
          // vm.detailForm.EventDetail = res.Data.EventDetail[0]
          // console.log(row)
          // vm.detailForm.EquipmentAlarmId
          vm.detailForm.ProjectId = row.ProjectId
          let EventDetail = res.Data.EventDetail[0]
          vm.detailForm.EventDetailDes = `${EventDetail.CreatedBy} ${EventDetail.CreatedOn} ${EventDetail.Account} ${EventDetail.Status}`
          // console.log(vm.detailForm.EventDetailDes)
          vm.detailForm.isShowCreateOrder = vm.isShowCreateBtn(row)
          vm.loadingDetailDialog = false
          // console.log(vm.detailForm)
        }
      })

    },

    //直接手动创建工单
    createOrderDirectly(row) {
      let vm = this
      let url = vm.detailUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "FaultId": row.FaultId
        }
      }
      GET(url, data).then(function(response) {
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.detailForm = res.Data.queryEquipmentFaultDetail[0]
          vm.detailForm.ProjectId = row.ProjectId
          vm.createOrder()
        }
      })
    },

    //搜索预警告警条目
    search() {
      this.tableLoad(this.PageSize, this.PageIndex = 1)
    },

    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      CompanyId = this.CompanyId,
      ProjectId = this.ProjectId,
      EquipmentId = this.EquipmentId,
      Level = this.LevelBeSet, //注意这个LevelBeSet是被处理后的Level
      ResetStatus = this.ResetStatus,
      StartTime = this.StartTime,
      EndTime = this.EndTime) {
      let vm = this
      vm.loadingTable = true

      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          'CompanyId': CompanyId,
          'ProjectId': ProjectId,
          'EquipmentId': EquipmentId,
          'Level': Level,
          'ResetStatus': ResetStatus,
          'StartTime': StartTime,
          'EndTime': EndTime,
        }
      }
      let url = vm.queryFaultUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data.Result
            let Total = res.Data.Total
            // console.log(vm.Total)
            if (!Total) {
              vm.Total = 0
            } else {
              vm.Total = Total
            }
            // console.log(vm.Total)
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
      this.tableLoad(this.PageSize, this.PageIndex)
    },
    reload(dataArr) {
      this.tableData = dataArr
    },
    isHasPropsData() {
      let vm = this
      if (vm.propsData.ProjectId) {
        vm.ProjectId = vm.propsData.ProjectId
        vm.setEquipmentOpts()
        vm.isShowProjectId = false
      }
      if (vm.propsData.EquipmentId) {
        vm.EquipmentId = vm.propsData.EquipmentId
        vm.isShowEquipmentId = false
      }
         vm.tableLoad()
    }
  },
  mounted: function() {
    this.setProjectOpts()
    this.isHasPropsData()
    //this.tableLoad()
    this.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(this.isOperate)
    // console.log(this.IsExperienceUser)
  },
  watch: {
    isSearchHistory(){
      let vm = this
      if (vm.isSearchHistory) {
        vm.queryFaultUrl = URL.QUERYFAULTHISTORY
        vm.search()
      }else{
        vm.queryFaultUrl = URL.QUERYFAULT
        vm.search()
      }
    },
    propsData() {
      this.isHasPropsData()
      // this.tableLoad()
    },
  }
}

</script>

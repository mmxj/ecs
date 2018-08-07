<style lang='scss' scoped>
.colorSpan {
  line-height: 20px
}

.el_mainContent {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
}

.el_content {
  padding: 15px;
  overflow-y: auto;
  width: 100%;
}

.pdt0 {
  padding-top: 0;
}

</style>
<template>
  <div class='el_mainContent' v-loading="loading">
    <div class="el_content" element-loading-text="努力加载中" style="height: calc(100% - 40px);position: static;">
      <!-- <div class="el_content" :class='(propsData.ProjectId && !propsData.fromMap)?"pdt0":""' v-loading="loading" element-loading-text="努力加载中" style="height: calc(100% - 40px)"> -->
      <div v-if='true'>
        <!-- <div v-if='!propsData.ProjectId || propsData.fromMap'> -->
        <el-row class='border-1px'>
          <el-col :span="22">
            <h3>设备列表</h3>
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
          <el-col :span='24'>
            <span class="w150 mb10" v-show='isShowCompanyId'>
              <el-select v-model="CompanyId" filterable clearable placeholder="客户名称" @change='resetProjectOpts(CompanyId)' size='small'>
                <el-option
                    v-for="(item, index) in companyOpts"
                    :key="index"
                    :label="item.CompanyName"
                    :value="item.CompanyId">
                  </el-option>
              </el-select >
            </span>
            <span class="w150 mb10" v-if='isShowProjectId'>
              <el-select v-model="ProjectId" @change='search' filterable clearable placeholder="项目名称" size='small'>
                <el-option
                    v-for="(item, index) in projectOpts"
                    :key="index"
                    :label="item.ProjectName"
                    :value="item.ProjectId">
                  </el-option>
              </el-select >
            </span>
            <span class="w100 mb10">
              <el-select v-model="EquipmentTypeId" clearable placeholder="设备类型" @change='search' size='small'>
                <el-option
                    v-for="item in equipmentTypeIdOpts"
                    :key="item.EquipmentTypeId"
                    :label="item.TypeName"
                    :value="item.EquipmentTypeId">
                  </el-option>
              </el-select>
            </span>
            <span class="w100 mb10">
              <el-select v-model="OnlineStatus" filterable clearable placeholder="在线状态" @change='search' size='small'>
                <el-option
                    v-for="item in onlineStatusOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w100 mb10">
              <el-select v-model="RunStatus" clearable placeholder="运行状态" @change='search' size='small'>
                <el-option
                    v-for="item in runStatusOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w100 mb10">
              <el-select v-model="AlarmStatus" clearable placeholder="报警状态" @change='search' size='small'>
                <el-option
                    v-for="item in alarmStatusOpts"
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
            <span class="w200 mb10" @keyup='search'>
              <el-input size='small' v-model="KeyWords" placeholder="设备名称" ></el-input>
            </span>
            <el-button v-if='EntitySort==2' size='small' style='margin-top: 2px' type="primary" class='fr mb5 btn-2top' @click='exportInfo'>导出所有设备信息</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" style="width: 100%" class='userTable' stripe>
              <el-table-column prop="EquipmentAlias" label="设备名称" align='center' width='200'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.EquipmentAlias">{{scope.row.EquipmentAlias}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="ProjectName" label="所属项目" align='center'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.ProjectName">{{scope.row.ProjectName}}</div>
                </template>
              </el-table-column>
              <el-table-column v-if='isShowCompanyId' prop="CompanyName" label="客户名称" align='center'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.CompanyName">{{scope.row.CompanyName}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="TypeName" label="设备类型" align='center'>
              </el-table-column>
              <el-table-column prop="OnlineStatusName" label="在线状态" align='center'>
                <template scope="scope">
                  <div>
                    <label :style='scope.row.IsOnline == 1?onlineBgSty.style0:onlineBgSty.style1' class='colorLabel'>{{scope.row.OnlineStatusName}}</label>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="RunStateName" label="运行状态" align='center'>
                <template scope="scope">
                  <div>
                    <label :style='(scope.row.IsOnline!= 1||scope.row.RunState!=1)?onlineBgSty.style1:onlineBgSty.style0' class='colorLabel'>{{(scope.row.IsOnline!= 1||scope.row.RunState==0)?'未知':(scope.row.RunState == 1?'运行':'停机')}}</label>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="AlarmLevelName" label="报警状态" align='center'>
                <template scope="scope">
                  <div>
                    <label :style='scope.row.AlarmLevel == 3?alarmBgSty.style3:(scope.row.AlarmLevel == 2?alarmBgSty.style2:(scope.row.AlarmLevel == 1?alarmBgSty.style1:alarmBgSty.style0))' class='colorLabel'>{{scope.row.AlarmLevelName}}</label>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column label="所关联工单" align='center' width='200'>
                <template scope="scope">
                  <router-link :title="scope.row.WorkOrderNo" class='nowrap' :to="{ name: 'work_order_details', params: { orderinfos: {
                    WorkOrderId: scope.row.WorkOrderId,
                    ProjectId: scope.row.ProjectId
                  } }}">{{scope.row.WorkOrderNo}}</router-link>
                </template>
              </el-table-column> -->
              <el-table-column label="操作" align='center'>
                <template scope="scope">
                  <el-button @click="seeMore(scope.row.ProjectId, scope.row)" type="text" size="small" class='ml5'><i class="fa fa-eye" title="查看详情"></i></el-button>
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
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
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
      stopChange: true,
      onlineBgSty: STYLE.onlineStatusLable,
      alarmBgSty: STYLE.alarmLevelLable,
      // isSearchHistory: false,
      IsExperienceUser: FUNC.storage.get("IsExperienceUser"),
      IsAdmin: FUNC.storage.get("IsAdmin"),
      EntitySort: FUNC.storage.get("EntitySort"),
      detailFormData: {},
      CompanyId: '',
      companyOpts: [],
      detailForm: {
        EventDetail: {}
      },
      isShowDetailDialog: false,
      //操作权限相关
      isOperate: {},
      isShowProjectId: true,
      isShowEquipmentId: true,
      alarmLevelLableStyle: STYLE.alarmLevelLable,
      resetStatusLableStyle: STYLE.resetStatusLable,

      //加载表格相关
      loading: false,
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      KeyWords: "", //搜索关键字, 可传空 按设备id、编码、名称进行搜索

      ProjectId: "", //项目id
      projectOpts: [],

      EquipmentId: "", //设备id
      EquipmentOpts: [],

      OnlineStatus: '',
      onlineStatusOpts: OPTS.ONLINESTATUSOPTIONS,

      RunStatus: '',
      runStatusOpts: OPTS.RUNSTATUSOPTIONS,

      AlarmStatus: '',
      alarmStatusOpts: OPTS.LEVELOPTIONS, //报警状态

      EquipmentTypeId: '',
      equipmentTypeIdOpts: [],

      ResetStatus: "", //复位状态：0-未复位 1-已复位 空-全部
      ResetStatusOptions: OPTS.RESETSTATUSOPTIONS,

      Level: "", //状态:0-启用,1-停用,空-全部
      LevelOptions: OPTS.LEVELOPTIONS,

      StartTime: '',
      EndTime: '',

      tableData: [],

      queryFaultUrl: URL.QUERYFAULT, //预警告警列表
    }
  },
  computed: {
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.Total)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.Total)
    },

    isShowCompanyId() {
      let EntitySort = FUNC.storage.get("EntitySort")
      if (EntitySort == 2) {
        this.setCompanyOpts()
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    ...mapMutations({
      updateTab: 'UPDATE_SHOWWHICHTAB'
    }),
    exportInfo() {
      let vm = this;
      // vm.exporting = true
      let params = `?AccessToken=${FUNC.storage.get("AccessToken")}`
      let url = URL.EXPORTEQUIPMENTINFO
      window.location.href = `${url}${params}`
    },
    intoEquipmentList(IsExperienceProject, IsSelfProject) {
      FUNC.storage.set('IsExperienceProject', IsExperienceProject);
      FUNC.storage.set('IsSelfProject', IsSelfProject);
      // console.log('IsExperienceProject')
    },
    seeMore(ProjectId, row) {
      var vm = this;
      // console.log(row)
      vm.loading = true
      var param = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        ProjectId
      };
      let url = URL.QUERYDETAIL
      GET(url, param)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let item = res.Data
            vm.loading = false
            vm.detailFormData.ProjectId = ProjectId
            vm.detailFormData.EquipmentId = row.EquipmentId
            vm.detailFormData.ProjectName = row.ProjectName
            vm.detailFormData.ProjectLogo = item.ProjectLogo
            vm.detailFormData.IsLocked = item.IsLocked
            vm.detailFormData.IsExperienceProject = row.IsExperienceEquipment
            vm.detailFormData.IsSelfProject = row.IsSelfProject
            // console.log(vm.detailFormData)
            FUNC.storage.set('currentViewTab', '');
            vm.updateTab({
              showWhichTab: 4
            })
            if (vm.EntitySort != 2) {
              vm.intoEquipmentList(row.IsExperienceEquipment, row.IsSelfProject)
              let preName = vm.EntitySort == 1 ? 'wb_' : 'yz_'
              vm.$router.push({ name: `${preName}project_detail`, params: vm.detailFormData })
            } else {
              vm.$router.push({ name: 'sm_project_detail', params: vm.detailFormData })
            }
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setEquipmentTypeIdOpts() {
      let vm = this
      let url = URL.GETEQUIPMENTTYPE
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            // res.Data.push({EquipmentTypeId: -1, TypeName: "其他"})
            vm.equipmentTypeIdOpts = res.Data
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    goBack() {
      this.$router.go(-1)
    },
    resetProjectOpts(CompanyId) {
      let vm = this
      let url = URL.PROJECTQUERY //获取项目列表(下拉框)
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
      let url = URL.GETALLCOMPANY //获取业主列表(下拉框)
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
    setProjectOpts() {
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }

      let url = URL.PROJECT //获取项目列表(下拉框)
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
      let url = URL.EQUIPMENT
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

    //搜索预警告警条目
    search() {
      let vm = this
      if (vm.stopChange) return
      vm.tableLoad(vm.PageSize, vm.PageIndex = 1)
    },

    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      CompanyId = this.CompanyId,
      ProjectId = this.ProjectId,
      KeyWords = this.KeyWords,
      OnlineStatus = this.OnlineStatus, //注意这个LevelBeSet是被处理后的Level
      AlarmStatus = this.AlarmStatus,
      RunStatus = this.RunStatus,
      EquipmentTypeId = this.EquipmentTypeId) {
      let vm = this
      vm.loading = true

      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          CompanyId,
          ProjectId,
          KeyWords,
          OnlineStatus,
          AlarmStatus,
          RunStatus,
          EquipmentTypeId,
        }
      }
      let url = URL.QUERYEQUIPMENTLIST //获取设备列表
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data.Equipments
            let Total = res.Data.Total
            // console.log(vm.Total)
            if (!Total) {
              vm.Total = 0
            } else {
              vm.Total = Number(Total)
            }
            // console.log(vm.Total)
            vm.reload(dataArr)
            vm.loading = false
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
      if (vm.$route.params.EquipmentTypeId) {
        vm.EquipmentTypeId = vm.$route.params.EquipmentTypeId
      }

      if (vm.$route.params.AlarmStatus) {
        vm.AlarmStatus = vm.$route.params.AlarmStatus
      }
      if (vm.$route.params.RunStatus) {
        vm.RunStatus = vm.$route.params.RunStatus
      }
      if (vm.$route.query.EquipmentTypeId) {
        vm.EquipmentTypeId = vm.$route.query.EquipmentTypeId
      }
      if (vm.$route.query.AlarmStatus) {
        vm.AlarmStatus = Number(vm.$route.query.AlarmStatus)
      }
      if (vm.$route.query.RunStatus) {
        vm.RunStatus = vm.$route.query.RunStatus
      }
      if (vm.$route.query.OnlineStatus) {
        vm.OnlineStatus = Number(vm.$route.query.OnlineStatus)
      }
      if (vm.$route.query.ProjectId) {
        vm.ProjectId = vm.$route.query.ProjectId
      }
    }
  },
  mounted: function() {
    let vm = this
    vm.stopChange = true
    vm.setProjectOpts()
    vm.setEquipmentTypeIdOpts()
    vm.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(vm.isOperate)
    // console.log(vm.IsExperienceUser)
    vm.isHasPropsData()
    vm.tableLoad()
    vm.$nextTick(function() {
      vm.stopChange = false
    })
  },
  watch: {
    /*propsData() {
      this.isHasPropsData()
      this.tableLoad()
    },*/
  }
}

</script>

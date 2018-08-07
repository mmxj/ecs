<style scoped lang='less'>
.tableWrap{
  position: relative;
  height: 100%;
  padding: 0 15px;
}
</style>
<template>
  <div class="tableWrap" v-loading="loading">
    <div class="searchBar">
      <el-select v-model="ProjectId" :loading='loadingProjectOpts' filterable clearable placeholder="项目名称" size='small' @change='search'>
        <el-option
            v-for="(item, index) in projectOpts"
            :key="index"
            :label="item.ProjectName"
            :value="item.ProjectId">
          </el-option>
      </el-select >
      <el-select v-model="UserId" filterable :loading='loadingUserIdOpts' filterable clearable placeholder="操作人员" size='small' @change='search'>
        <el-option v-for="item in UserIdOpts" :key="item.UserId" :label="item.UserName" :value="item.UserId">
        </el-option>
      </el-select>
      <el-date-picker size='small' v-model="StartDate" clearable type="datetime" @change='search' placeholder="开始时间"></el-date-picker>
      <el-date-picker size='small' v-model="EndDate" clearable type="datetime" @change='search' placeholder="结束时间"></el-date-picker>
    </div>
    <div style="height: calc(100% - 100px);overflow: auto">
      <el-table :data="tableData" style="width: 100%" class='userTable' stripe>
        <el-table-column type="index" label="序号" width='65' align='center'>
        </el-table-column>
        <!-- <el-table-column prop="EquipmentAlias" label="设备名称" align='center' width='100'>
          <template scope="scope">
            <div class='nowrap' :title="scope.row.EquipmentAlias">{{scope.row.EquipmentAlias}}</div>
          </template>
        </el-table-column> -->
        <el-table-column prop="ProjectName" label="项目名称" align='center'></el-table-column>
        <el-table-column prop="EventContent" label="事件描述" align='center'></el-table-column>
        <el-table-column prop="UserName" label="操作人员" align='center'></el-table-column>
        <el-table-column prop="EventTime" label="时间" align='center'></el-table-column>
      </el-table>
    </div>
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
</template>
<script>
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
      loading: false,
      tableData: [],
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      ProjectId: "", //项目id
      projectOpts: [],
      loadingProjectOpts: true,

      UserId: "", //项目id
      UserIdOpts: [],
      loadingUserIdOpts: true,

      StartDate: '',
      EndDate: '',
    }
  },
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
  methods: {
    setProjectOpts() {
      let vm = this
      vm.loadingProjectOpts = true
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
            vm.loadingProjectOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //加载操作者
    setUserIdOpts() {
      let vm = this
      vm.loadingUserIdOpts = true
      let params = {
        "AccessToken": FUNC.storage.get('AccessToken'),
      }
      let url = URL.GETCOMPANYUSER
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.UserIdOpts = data
            vm.loadingUserIdOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //搜索预警告警条目
    search() {
      this.tableLoad(this.PageSize, this.PageIndex = 1)
    },

    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      ProjectId = this.ProjectId,
      UserId = this.UserId,
      StartTime = this.StartTime,
      EndTime = this.EndTime) {
      let vm = this
      vm.loading = true

      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'ProjectId': ProjectId,
        'UserId': UserId,
        'StartDate': StartTime,
        'EndDate': EndTime,
      }
      let url = URL.QUERYPROJECTEVENTLOG
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
            vm.loading = false
          }

        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    reload(dataArr) {
      this.tableData = dataArr
    },
    pageIndexChange(val) {
      this.PageIndex = val
      this.tableLoad(this.PageSize, this.PageIndex)
    },
    setTimeStr(date) {
      Date.prototype.format = FUNC.date.format
      date = date.format("yyyy-MM-dd hh:mm:ss")
      return date
    },
    init(){
      let vm = this
      vm.setProjectOpts()
      vm.setUserIdOpts()
      vm.tableLoad()
    }
  },
  mounted: function() {
    let vm = this
    vm.init()
  }
}

</script>

<template>
  <!-- 服务记录列表页面组件 -->
  <div class="el_content">
      <el-row>
        <el-col :span="22">
          <h3>服务记录详情</h3>
        </el-col>
        <el-col :span="2">
          <el-button class='fr mb10' size='small' @click='showWhichTab(2)'><i class="fa fa-mail-reply-all mr5"></i>返回 </el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      
      <!-- 服务记录详情列表表格 -->
      <div>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" v-loading="loadingTable" element-loading-text="努力加载中" style="width: 100%" class='userTable' stripe>
              <el-table-column type="index" label="序号" :width='65' align='center'>
              </el-table-column>
              <el-table-column prop="OwnerCompanyName" label="业主" align='center'>
              </el-table-column>
              <el-table-column prop="MaintCompanyName" label="维保商" align='center'>
              </el-table-column>
              <el-table-column prop="ProjectName" label="项目名称" align='center'>
              </el-table-column>
              <el-table-column prop="EffectedTime" label="服务开始日期" align='center'>
              </el-table-column>
              <el-table-column prop="InvalidTime" label="服务结束日期" align='center'>
              </el-table-column>
              <el-table-column prop="state" label="状态" align='center'>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="clearfix mb10"></div>
        <el-row>
          <el-col :span='24'>
            <div class="pageBlock">
              <el-pagination @current-change="pageIndexChange" :current-page.sync="pageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="Total">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>
<script>
import axios from 'axios'
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const FUNC = Common.Func
const GET = Common.Func.axios.get
export default {
  data: function() {
    return {
      companyFullName:'',
      loadingTable:false,
      tableData: [],
      PageSize: 10,
      pageIndex: 1,
      Total: undefined,
      getTenantProjectServiceHistoryUrl:URL.GETPROJECTSERVICEHISTORY,//查询客户的项目服务记录

    }
  },
  props: {
    rowData: [Object],
    showWhichTabBridge: [Number,String],
  },
  methods: {
    showWhichTab(val){
      this.$emit('update:showWhichTabBridge', val)
    },
    pageIndexChange(val) {
      this.pageIndex = val
      this.loadTable(
        this.PageSize, 
        this.PageIndexProjectServiceHistory, 
        this.rowData.MaintCompanyId,this.rowData.OwnerCompanyId)
    },

    loadTable(
      PageSize = this.PageSize,
      PageIndex = this.PageIndexProjectServiceHistory,
      maintCompanyId = this.rowData.MaintCompanyId,
      ownerCompanyId = this.rowData.OwnerCompanyId) {
      let vm = this
      vm.loadingTable = true
      let url = this.getTenantProjectServiceHistoryUrl;
      let params = {
        "AccessToken": this.AccessToken,
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          'MaintCompanyId': maintCompanyId,
          'OwnerCompanyId': ownerCompanyId,
        }
      }
      GET(url,params)
        .then(function(response) {
          // console.log(response)
          let dataArr = response.data.Data
          vm.Total = dataArr.Total
          vm.reloadTable(dataArr.Result)
          vm.loadingTable = false
        })
        .catch(function(error) {
          console.log(`${error.message}`)
        });
    },
    reloadTable(dataArr) {
      this.tableData = dataArr
    },
    initData(row) {
      // console.log(row)
      let vm = this
      vm.companyFullName = row.CompanyFullName
      vm.loadTable()
    },
  },
  mounted() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    this.initData(this.rowData)
  },
  watch: {
    rowData() {
      this.AccessToken = FUNC.storage.get("AccessToken")
      this.initData(this.rowData)
    }
  },
}

</script>
<style scoped lang='less'>
</style>

<style lang='less' scoped>
.el_content {
  overflow-y: auto;
  width:100%;
  // height:100%
  ;
}

.el_mainContent {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
}

</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" v-show='showWhichTab==1' style="height: calc(100% - 40px)">
      <el-row>
        <el-col :span="22">
          <h3>{{title}}</h3>
        </el-col>
        <el-col :span="2" class='tar'>
          <el-button class='mb10' size='small' v-if='!isShowMain' @click='showMain'><i class="fa fa-mail-reply-all mr5"></i>返回 </el-button>
          <el-button class='mb5' size='small' v-else @click='$router.go(-1)'>
            <i class="fa fa-mail-reply-all mr5"></i>返回
          </el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <!-- 客户详情 -->
      <detailBox v-if='!isShowMain&&isShowMore' :companyId='rowCompanyId' :canExtendePeriods='true'></detailBox>
      <settingBox v-if='!isShowMain&&isShowEdit' :rowData='editRowData'></settingBox>
      <!-- 主页面表格 -->
      <div v-show='isShowMain'>
        <el-row>
          <el-col :span='18'>
            <span class="w150 mb10">
              <el-select size='small' v-model="EntitySort" clearable placeholder="客户类别" @change='TenantList'>
                <el-option
                    v-for="item in EntitySortOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select >
            </span>
            <span class="w150 mb10">
              <el-select size='small' v-model="EntityClass" clearable placeholder="客户类型" @change='TenantList'>
                <el-option
                    v-for="item in EntityClassOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w200 mb10" @keyup='deTenantList'>
              <el-input size='small' v-model="KeyWord" placeholder="公司名称或联系人电话" ></el-input>
            </span>
            <el-button size='small' type="primary" icon='search' class='mb10 btn-2top' @click='TenantList'>查找</el-button>
          </el-col>
          <el-col :span='6' class='tar'>
            <el-button size='small' type="primary" class='mb10 btn-2top' @click='exportTenantList'><i class="fa fa-file-excel-o mr5"></i>导出全部</el-button>
          </el-col>
        </el-row>
        <!-- <div class="clearfix mb10"></div> -->
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" v-loading="loadingTable" element-loading-text="努力加载中" style="width: 100%" class='userTable' stripe>
              <el-table-column type="index" label="序号" width='65' align='center'>
              </el-table-column>
              <el-table-column prop="CompanyFullName" label="公司名称" width='180' align='center'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.CompanyFullName">{{scope.row.CompanyFullName}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="EntitySortName" label="客户类别" align='center' width='100'>
              </el-table-column>
              <el-table-column prop="EntityClassName" label="客户类型" align='center' width='100'>
              </el-table-column>
              <el-table-column prop="IndustryName" label="所属行业" align='center' width='120'>
              </el-table-column>
              <el-table-column prop="ContactPerson" label="联系人" align='center'>
              </el-table-column>
              <el-table-column prop="ContactMobile" label="联系人电话" align='center' width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.ContactMobile">{{scope.row.ContactMobile}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="EffectiveDate" label="生效时间" align='center' width='180'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.EffectiveDate">{{scope.row.EffectiveDate}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="ExpirationDate" label="截止时间" align='center' width='180'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.ExpirationDate">{{scope.row.ExpirationDate}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="ContractNo" label="合同编号" align='center' width='180'>
              </el-table-column>
              <el-table-column label="操作" align='center' fixed="right" width='160'>
                <template scope="scope">
                  <el-button @click="seeMore(scope.row)" type="text" size="mini" v-show='isOperate.update' class='eosLink'>详情</el-button>
                  <el-button type="text" size="mini" class='eosLink ml0' v-show='isOperate.update' @click='editTenant(scope.row)'>设置</el-button>
                  <el-button type="text" size="mini" class='eosLink' v-show='isOperate.update' @click="seeServiceHistory(scope.row)">服务记录</el-button>
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
    <!-- 服务记录列表 -->
    <serviceHistoryTable v-if='showWhichTab==2' :rowData='serviceHistoryRowData' :showWhichTabBridge.sync='showWhichTab' :seeProjectServiceHistoryBridge='seeProjectServiceHistory'>
    </serviceHistoryTable>
    <!-- 服务记录详情列表 -->
    <projectServiceHistoryTable v-if='showWhichTab==3' :rowData='serviceHistoryRowData' :showWhichTabBridge.sync='showWhichTab'>
    </projectServiceHistoryTable>
  </div>
</template>
<script>
import detailBox from 'components/common/companyDetailBox'
import settingBox from './common/tenantSettingBox'
import serviceHistoryTable from './common/serviceHistoryTable'
import projectServiceHistoryTable from './common/projectServiceHistoryTable'
import * as Common from 'src/assets/js/common';
import axios from 'axios'
const URL = Common.Const.url
let OPTS = Common.Const.options
const FUNC = Common.Func
const GET = Common.Func.axios.get
const titleDefault = '客户列表'
const titleDetail = '客户详情'
const titleSet = '客户设置'
export default {
  data() {
    return {
      timeId: null,
      editRowData: {},
      serviceHistoryRowData: {},
      projectServiceHistoryRowData: {},
      title: titleDefault,
      rowCompanyId: '',
      showWhichTab: 1,
      companyFullName: '',

      //设置租户相关
      isShowEdit: false,

      //租户详细内容
      isShowMore: false,

      //操作权限相关
      isOperate: {},

      //加载表格相关
      isShowMain: true,
      loadingTable: true,
      AccessToken: '',

      PageSize: 10,

      Total: undefined,

      PageIndex: 1,

      companyIdServiceHistory: '',
      entitySortServiceHistory: '',

      KeyWord: '', //公司名称关键字
      EntitySort: '', //客户类别
      EntityClass: '', //客户类型
      EntitySortOptions: OPTS.ENTITYSORTOPTIONS, //客户类别下拉框选项
      EntityClassOptions: OPTS.ENTITYCLASSOPTIONS, //客户类型下拉框选项

      tableData: [],
      getTenantListUrl: URL.GETTENANTLIST, //客户列表查询
      exportUrl: URL.EXPORTTENANTLIST, //客户列表导出EXCEL数据
    }
  },
  components: {
    detailBox,
    settingBox,
    serviceHistoryTable,
    projectServiceHistoryTable
  },
  computed: {
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.Total)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.Total)
    },
  },
  methods: {
    exportTenantList(PageSize = this.PageSize,
      PageIndex = 0,
      KeyWord = this.KeyWord,
      EntitySort = this.EntitySort,
      EntityClass = this.EntityClass) {
      let vm = this
      let url = this.exportUrl;
      let params = {
        "AccessToken": this.AccessToken,
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          'KeyWord': KeyWord,
          'EntitySort': EntitySort,
          'EntityClass': EntityClass
        }
      }
      GET(url, params)
        .then(function(res) {
          if (FUNC.checkCode(res.data.State, res.data.Message)) {
            window.location.href = res.data.Data.DownloadUrl;
            vm.$message.success('导出数据成功')
            // window.open(res.data.Data.DownloadUrl)
          }
        })
        .catch(function(error) {
          console.log(`${error.message}`)
        });
    },
    seeProjectServiceHistory(row) {
      // console.log(row)
      this.showWhichTab = 3
      this.projectServiceHistoryRowData = row
      if (this.entitySortServiceHistory == 1) {
        this.projectServiceHistoryRowData.MaintCompanyId = this.companyIdServiceHistory
        this.projectServiceHistoryRowData.OwnerCompanyId = row.CompanyId
      } else {
        this.projectServiceHistoryRowData.MaintCompanyId = row.CompanyId
        this.projectServiceHistoryRowData.OwnerCompanyId = this.companyIdServiceHistory
      }
    },

    //查询客户的服务记录
    seeServiceHistory(row) {
      // console.log(row)
      this.showWhichTab = 2
      this.companyFullName = row.CompanyFullName
      this.serviceHistoryRowData = row
      this.companyIdServiceHistory = row.CompanyId
      this.entitySortServiceHistory = row.EntitySort

    },

    //返回展示
    showMain() {
      this.title = titleDefault;
      this.isShowMain = true;
      this.isShowEdit = false;
      this.isShowMore = false;
      this.tableLoad(this.PageSize, this.PageIndex, this.KeyWord, this.EntitySort, this.EntityClass)
    },

    //编辑客户信息页面初始化
    editTenant(row) {
      // console.log(row)
      let vm = this
      this.title = `${titleSet}(${row.CompanyFullName})`
      vm.editRowData = row
      vm.isShowMain = false
      vm.isShowEdit = true
    },

    //查看更多租户信息
    seeMore(row) {
      this.rowCompanyId = row.CompanyId
      this.title = `${titleDetail}(${row.CompanyFullName})`
      this.isShowMain = false
      this.isShowMore = true
    },

    //获取客户列表
    TenantList() {
      this.tableLoad(this.PageSize, this.PageIndex = 1)
    },
    deTenantList() {
      FUNC.debounce(this.timeId, this, 'TenantList', [this.PageSize, this.PageIndex = 1])
      // this.tableLoad(this.PageSize, this.PageIndex = 1, this.KeyWord)
    },
    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      KeyWord = this.KeyWord,
      EntitySort = this.EntitySort,
      EntityClass = this.EntityClass) {
      let vm = this
      vm.loadingTable = true
      let url = this.getTenantListUrl;
      let params = {
        "AccessToken": this.AccessToken,
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          'KeyWord': KeyWord,
          'EntitySort': EntitySort,
          'EntityClass': EntityClass
        }
      }
      GET(url, params)
        .then(function(response) {
          let dataArr = response.data.Data
          vm.Total = dataArr.Total
          vm.reload(dataArr.Result)
          vm.loadingTable = false
        })
        .catch(function(error) {
          console.log(`${error.message}`)
        });
    },
    pageIndexChange(val) {
      this.PageIndex = val
      this.tableLoad(this.PageSize, this.PageIndex, this.KeyWord)
    },
    reload(dataArr) {
      for (let item of dataArr) {
        item.IsActiveDisplay = item.IsActive == 1 ? '是' : '否'
      }
      this.tableData = dataArr
    },
  },
  mounted: function() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    this.tableLoad()
    this.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(this.isOperate)
  }
}

</script>

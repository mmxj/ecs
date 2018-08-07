<style lang='less' scoped>
  a {
    cursor: pointer;
  }
  
  .el_mainContent {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #fff;
  }
  
  .el_content {
    overflow-y: auto;
    width: 100%;
  }
</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" style="height: calc(100% - 40px)">
      <div v-if="propsData.moduleType==0" class="mainModuel" style="width: 100%; height: 100%;">
        <el-row>
          <el-col :span="22">
            <h3>远程控制设置</h3>
          </el-col>
        </el-row>
        <div class="hr mb10"></div>
        <div>
          <el-row class="mb10">
            <el-col :span='24'>
              <el-button type="primary" icon='plus' size='small' @click="addRemote" style='position: relative;top: -2px;'>添加</el-button>
              <el-select placeholder="选择或搜索项目" filterable clearable style="width: 150px;" v-model="ProjectId" size='small' class='por' @change='QueryProjectIssueAction'>
                <el-option v-for="(item, index) in projectLists" :key="index" :label="item.ProjectName" :value="item.ProjectId">
                </el-option>
              </el-select>
              <el-select placeholder="是否可控" style="width: 150px;" v-model="isCtr" size='small' class='por' @change='QueryProjectIssueAction'>
                <el-option v-for="(item, index) in isCtrSelect" :key="index" :label="item.label" :value="item.state">
                </el-option>
              </el-select>
            </el-col>
          </el-row>
          <!-- <div class="clearfix mb10"></div> -->
          <el-row v-loading="loadingTable">
            <el-col :span='24'>
              <el-table :data="IssueList" element-loading-text="努力加载中" style="width: 100%" class='userTable' stripe>
                <el-table-column type="index" label="序号" width='80' align='center'>
                </el-table-column>
                <el-table-column label="项目名称" align='center' min-width='150'>
                  <template scope="scope">
                    <a :title="scope.row.ProjectName" class='nowrap eosLink' @click='QueryDetail(scope.row.ProjectId)'>{{scope.row.ProjectName}}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="Status" label="可否远程控制" align='center' min-width='100'>
                </el-table-column>
                <el-table-column label="可控账号" align='center' min-width='200'>
                  <template scope="scope">
                    <el-form ref="formItems1" label-width="58px" label-position="right">
                      <el-form-item style="margin-bottom: 0;" label="业主:" align='left'>
                        <span v-for="item in scope.row.OwnerList">{{item.UserName}}({{item.Account}})</span>
                      </el-form-item>
                    </el-form>
                    <el-form ref="formItems2" label-width="58px" label-position="right">
                      <el-form-item style="margin-bottom: 0;" label="维保商:" align='left'>
                        <span style="text-align: left!important;" v-for="item in scope.row.MaintList">{{item.UserName}}({{item.Account}})</span>
                      </el-form-item>
                    </el-form>
                    <el-form ref="formItems2" label-width="58px" label-position="right">
                      <el-form-item style="margin-bottom: 0;" label="平台:" align='left'>
                        <span style="text-align: left!important;" v-for="item in scope.row.PlatformList">{{item.UserName}}({{item.Account}})</span>
                      </el-form-item>
                    </el-form>
                  </template>
                </el-table-column>
                <el-table-column prop="UpdatedTime" label="修改时间" align='center' min-width='180'>
                </el-table-column>
                <el-table-column prop="UserName" label="修改人员" align='center' min-width='180'>
                </el-table-column>
                <el-table-column label="操作" fixed="right" align='center' min-width='100'>
                  <template scope="scope">
                    <a class='nowrap eosLink' @click='editFun(scope.row)'>修改</a>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <div class="pagin">
            <div class="pageDes">
              <span>当前显示 {{firstPage}} 到 {{lastPage}} 条记录</span>
              <span>共 {{TotalData}} 条记录</span>
            </div>
            <div class="pageBlock">
              <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="TotalData">
              </el-pagination>
            </div>
          </div>
        </div>
      </div>
      <add-remote :propsData="propsData" v-if="propsData.moduleType==1||propsData.moduleType==3"></add-remote>
      <!--<add-remote :propsData="propsData" v-if="propsData.moduleType==1"></add-remote>-->
      <info :propsData="projectDetail" :other="propsData" v-if="propsData.moduleType==2"></info>
    </div>
  </div>
</template>
<script>
  import addRemote from 'components/page/platforms/operationManage/common/addRemote.vue'
  import info from 'components/page/maintenanceAgent/items/subComponents/project/info.vue'
  import qs from 'qs'
  import * as Common from 'src/assets/js/common';
  import axios from 'axios'
  let URL = Common.Const.url
  let FUNC = Common.Func
  export default {
    data() {
      return {
        //操作权限相关
        isOperate: {},
        loadingTable: true,
        PageSize: 10,
        TotalData: undefined,
        PageIndex: 1,
        KeyWord: '',
        //新增表单的验证规则
        addFunFormRules: {
          CompanyId: [
            {
              type: 'string',
              required: true,
              message: '请选择公司名称',
              trigger: 'change'
            }
        ],
          FunctionId: [
            {
              type: 'string',
              required: true,
              message: '请选择功能名称',
              trigger: 'change'
            }
        ]
        },
        //参数
        isCtr: '',
        isCtrSelect: [
          {
            state: -1,
            label: '全部'
      	},
          {
            state: 1,
            label: '是'
      	},
          {
            state: 0,
            label: '否'
      	}
      ],
        projectLists: [],
        ProjectId: '',
        propsData: {
          //0主页面   1新增   2项目详情 3编辑
          moduleType: 0,
          data: null
        },
        IssueList: [],
        projectDetail: null
      }
    },
    components: {
      addRemote,
      info
    },
    watch: {
      "propsData.moduleType" (val) {
        if(val == 0) {
          this.getProject();
          this.QueryProjectIssueAction();
        }
      }
    },
    computed: {
      firstPage() {
        return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.TotalData)
      },
      lastPage() {
        return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.TotalData)
      },
      AccessToken() {
        return FUNC.storage.get("AccessToken");
      }
    },
    methods: {
      editFun(data) {
        let vm = this;
        vm.propsData.data = data;
        vm.propsData.moduleType = 3;
      },
      addRemote() {
        let vm = this;
        vm.propsData.moduleType = 1;
        vm.propsData.data = null;
      },
      QueryProjectIssueAction() {
        let vm = this;
        vm.loadingTable = true;
        var param = {
          "AccessToken": vm.AccessToken,
          "ProjectId": vm.ProjectId,
          "Status": vm.isCtr,
          "PageIndex": vm.PageIndex,
          "PageSize": vm.PageSize

        };
        var url = eosCommon.ENTERPRISE_API + 'api/project/QueryProjectIssueAction';
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.loadingTable = false;
            vm.TotalData = result.Data.Total
            vm.IssueList = result.Data.ActionData;
          }
        })
      },
      getProject() {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "IsIssue": true        
        };
        let url = eosCommon.ENTERPRISE_API + 'api/project/GetUnIssueProjectInfo';
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.projectLists = result.Data;
          }
        })
      },
      pageIndexChange(val) {
        this.PageIndex = val
        this.QueryProjectIssueAction();
      },
      QueryDetail(ProjectId) {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "ProjectId": ProjectId
        };
        let url = eosCommon.ENTERPRISE_API + "api/project/QueryDetail";
        eosCommon.eosAjax(url, "GET", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.projectDetail = result.Data;
            vm.propsData.moduleType = 2;
          }
        });
      }
    },
    mounted: function() {
      let vm = this;
      vm.getProject();
      vm.QueryProjectIssueAction();
    }
  }
</script>
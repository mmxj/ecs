<style lang='less' scoped>
  .inlineForm.el-form-item {
    float: left;
    width: 50%;
  }
  
  .el-select {
    width: 80%;
  }
  
  .w100p {
    width: 100%;
  }
  
  .el_content {
    overflow-y: auto;
  }
</style>
<template>
  <div class='el_mainContent' style='width:100%;height:100%'>
    <div class="el_content" style='width:100%;height:100%'>
      <el-row>
        <el-col :span="22">
          <h3>添加可远程控制项目</h3>
        </el-col>
        <el-col :span="2">
          <el-button class='mb10 fr' size='small' @click='propsData.moduleType=0'><i class="fa fa-mail-reply-all mr5"></i>返回 </el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <!-- 客户设置 -->
      <div class='detailBox bd0'>
        <el-row class='bd1 pd25 detailDiv'>
          <el-form :model="baseSetForm" :rules="baseSetRule" ref="baseSetForm1" label-width="200px" class="demo-ruleForm">
            <el-form-item class="inlineForm" label="项目名称：" prop="projectSelected">
              <el-select v-model="baseSetForm.projectSelected" @change="getAcount" filterable placeholder="请选择或搜索项目">
                <el-option v-for="item in projectList" class='w200' :key="item.ProjectId" :label="item.ProjectName" :value="item.ProjectId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="inlineForm" label="是否可远程控制：">
              <div class="axisSetting my_radio">
                <el-radio-group v-model="baseSetForm.remoteType">
                  <el-radio class="radio" :label="1">是</el-radio>
                  <el-radio class="radio" :label="0">否</el-radio>
                </el-radio-group>
              </div>
            </el-form-item>
            <div class="clearfix"></div>
            <el-form-item label="可控账号：" style="width: 100%;margin-bottom: 34px;">
              <el-form label-position="top" :model="baseSetForm" :rules="baseSetRule" ref="baseSetForm2" label-width="200px" class="demo-ruleForm">
                <el-form-item label="维保商账号" prop="wbSelected">
                  <el-select v-model="baseSetForm.wbSelected" multiple filterable placeholder="请选择或搜索维保商账号">
                    <el-option v-for="item in MaintUserList" class='w200' :key="item.AccountId" :label="item.UserName" :value="item.UserId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="margin-top: 34px;" label="业主账号" prop="yzSelected">
                  <el-select v-model="baseSetForm.yzSelected" multiple filterable placeholder="请选择或搜索业主账号">
                    <el-option v-for="item in OwnerUserList" class='w200' :key="item.AccountId" :label="item.UserName" :value="item.UserId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="margin-top: 34px;" label="运营平台账号" prop="smSelected">
                  <el-select v-model="baseSetForm.smSelected" multiple filterable placeholder="请选择运营平台账号">
                    <el-option v-for="item in userLists" class='w200' :key="item.AccountId" :label="item.UserName" :value="item.AccountId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancelAdd('baseSetForm')">取消</el-button>
              <el-button type="primary" @click="upDateSave()">提交</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        projectList: [],
        baseSetForm: {
          projectSelected: '',
          remoteType: 1,
          wbSelected: [],
          yzSelected: [],
          smSelected: []
        },
        baseSetRule: {
          projectSelected: [{
            required: true,
            message: '项目不能为空',
            trigger: 'blur'
          }, ],
          wbSelected: [{
            required: true,
            message: '请至少选择一个维保商账号',
            trigger: 'blur',
            type: 'array'
          }, ],
          yzSelected: [{
            required: true,
            message: '请至少选择一个业主账号',
            trigger: 'blur',
            type: 'array'
          }, ],
          smSelected: [{
            required: true,
            message: '请至少选择一个运营平台账号',
            trigger: 'blur',
            type: 'array'
          }, ],
        },
        //参数:
        userLists: [],
        acountList: null,
        MaintUserList: [],
        OwnerUserList: [],
        ActionId: ''
      }
    },
    props: ['propsData'],
    computed: {
      AccessToken() {
        return eosCommon.storage.get('AccessToken');
      }
    },
    methods: {
      cancelAdd(data) {
        this.propsData.moduleType = 0;
      },
      upDateSave() {
        let vm = this;
        vm.$refs['baseSetForm1'].validate((valid) => {
          if(valid) {
            vm.$refs['baseSetForm2'].validate((valid2) => {
              if(valid2) {
                if(vm.propsData.moduleType == 1) {
                  vm.SetProjectIssueAction();
                } else {
                  vm.UpdateProjectIssueAction();
                }
              } else {
                return false;
              }
            });
          } else {
            return false;
          }
        });
      },
      UpdateProjectIssueAction() {
        let vm = this;
        var param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "ActionId": vm.ActionId,
            "Status": vm.baseSetForm.remoteType,
            "OwnerList": vm.baseSetForm.yzSelected,
            "MaintList": vm.baseSetForm.wbSelected,
            "PlatformList": vm.baseSetForm.smSelected
          }

        };
        var url = eosCommon.ENTERPRISE_API + "api/project/UpdateProjectIssueAction";
        eosCommon.eosAjax(url, "post", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.$message({
              type: 'success',
              message: '修改成功！'
            });
            vm.propsData.moduleType = 0;
          }
        })
      },
      SetProjectIssueAction() {
        let vm = this;
        var param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "ProjectId": vm.baseSetForm.projectSelected,
            "Status": vm.baseSetForm.remoteType,
            "OwnerList": vm.baseSetForm.yzSelected,
            "MaintList": vm.baseSetForm.wbSelected,
            "PlatformList": vm.baseSetForm.smSelected
          }
        };
        var url = eosCommon.ENTERPRISE_API + "api/project/SetProjectIssueAction";
        eosCommon.eosAjax(url, "post", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.$message({
              type: 'success',
              message: '添加成功！'
            });
            vm.propsData.moduleType = 0;
          }
        })
      },
      getAcount() {
        let vm = this;
        if(vm.propsData.remoteType == 1) {
          vm.MaintUserList = [];
          vm.OwnerUserList = [];
          vm.baseSetForm.remoteType = 1;
          vm.baseSetForm.wbSelected = [];
          vm.baseSetForm.yzSelected = [];
          vm.baseSetForm.smSelected = [];
        }
        var param = {
          "AccessToken": vm.AccessToken,
          "ProjectId": vm.baseSetForm.projectSelected
        };
        var url = eosCommon.ENTERPRISE_API + "api/project/GetProjectUserInfo";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.acountList = result.Data;
            vm.MaintUserList = vm.acountList.MaintUserList;
            vm.OwnerUserList = vm.acountList.OwnerUserList;
          }
        })
      },
      getSMQueryuser() {
        let vm = this;
        var param = {
          "AccessToken": vm.AccessToken,
          "PageSize": '',
          "PageIndex": '',
          "Parameters": {
            "CompanyId": eosCommon.storage.get('CompanyId'), //公司id，必填
            "RoleId": '', //角色id
            "IsActive": '', //是否锁定
            "KeyWords": ''
          }
        };
        var url = eosCommon.COMMON_API + "api/user/queryuser";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.userLists = result.Data.Result;
          }
        })
      },
      getProject() {
        let vm = this;
        var param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "IsIssue": false
          }
        };
        var url = eosCommon.ENTERPRISE_API + 'api/project/GetUnIssueProjectInfo';
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.projectList = result.Data;
          }
        })
      }
    },
    created() {
      this.getSMQueryuser();
    },
    mounted: function() {
      let vm = this;
      let data = vm.propsData.data;
      console.log(data);
      if(data != null) {
        vm.projectList.push({
          ProjectId: data.ProjectId,
          ProjectName: data.ProjectName
        });
        let Status = data.Status == '是' ? 1 : 0;
        for(let val of data.MaintList) {
          vm.baseSetForm.wbSelected.push(val.UserId);
        }
        for(let val of data.OwnerList) {
          vm.baseSetForm.yzSelected.push(val.UserId);
        }
        for(let val of data.PlatformList) {
          vm.baseSetForm.smSelected.push(val.UserId);
        }
        vm.baseSetForm.projectSelected = data.ProjectId;
        vm.ActionId = data.ActionId;
        vm.baseSetForm.remoteType = Status;
      } else {
        vm.getProject();
      }
    }
  }
</script>
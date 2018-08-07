<template>
  <!-- 企业详细信息页面组件 -->
  <div class='detailBox bd0'>
    <!-- <h4>{{companyFullName}}</h4> -->
    <h4>重置管理员密码</h4>
    <el-row class='bd1 pd25 detailDiv'>

      <el-form :model="passwordForm" :rules="passwordRule" ref="passwordForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="员工帐号:">
          <div class="el-form-item__content">{{passwordForm.stuffAccount}}</div>
        </el-form-item>
        <el-form-item label="密码:" prop="pass">
          <el-input type="password" v-model="passwordForm.pass" auto-complete="off" class='w300'></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="checkPass">
          <el-input type="password" v-model="passwordForm.checkPass" auto-complete="off" class='w300'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPasswordForm('passwordForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div class="clearfix mb10"></div>
    <h4>企业类型设置</h4>
    <el-row class='bd1 pd25 detailDiv'>
      <el-form :model="typeForm" ref="typeForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="企业类型：">
          <el-radio-group v-model="typeForm.EntitySort">
            <el-radio :label="1">维保商</el-radio>
            <el-radio :label="0">业主</el-radio>
          </el-radio-group>
          <el-button type="primary" @click="changeCompanyType" class='ml30'>提交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div class="clearfix mb10"></div>
    <h4>合同设置</h4>
    <el-row class='bd1 pd25 detailDiv'>
      <el-form :model="contractForm" ref="contractForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="合同编号：">
          <el-input v-model="contractForm.ContractNo" class='w300'></el-input>
        </el-form-item>
        <el-form-item label="合同附件：">
          <el-upload class="upload-demo w300" ref="uploadFile" :action="uploadUrl" :data='uploadData' :multiple='false' :on-success='handleSuccess' :on-preview="handlePreview" :on-remove="handleRemove" :file-list="contractForm.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传合同附件相关文件或压缩包</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitContractForm('contractForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div class="clearfix mb10"></div>
    <h4>申请人（管理员）设置</h4>
    <el-row class='bd1 pd25 detailDiv'>
      <el-form :model="applyForm" ref="applyForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="申请人：">
          <el-select class="w300" v-model="NewRegisterAccountId" filterable :loading='loadingUserOpts'>
            <el-option
                v-for="item in applyForm.userOpts"
                :key="item.AccountId"
                :label="item.UserName"
                :value="item.AccountId">
              </el-option>
          </el-select >
        </el-form-item>
        <!-- <el-form-item label="申请人姓名：">
          <el-input v-model="applyForm.ApplyPsersonName" class='w300'></el-input>
        </el-form-item>
        <el-form-item label="申请人电话：">
          <el-input v-model="applyForm.ApplyPsersonPhone" class='w300'></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="submitApplyForm('applyForm')">提交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
    <div class="clearfix mb10"></div>
    <h4>锁定设置</h4>
    <el-row class='bd1 pd25 detailDiv'>
      <el-form :model="lockForm" ref="lockForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="锁定该客户：">
          <el-radio-group v-model="lockForm.IsLocked">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
          <el-button type="primary" @click="lockTenant(lockForm.CompanyId)" class='ml30'>提交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>
<script>
import axios from 'axios'
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const FUNC = Common.Func
const GET = Common.Func.axios.get
const POST = Common.Func.axios.post
const PUT = Common.Func.axios.put
const DELETE = Common.Func.axios.delete
const All = Common.Func.axios.all
export default {
  data: function() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.passwordForm.checkPass !== '') {
          this.$refs.passwordForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.passwordForm.pass) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      NewRegisterAccountId:'',
      loadingUserOpts: true,
      // companyFullName: '',
      passwordForm: {
        stuffAccount: '',
      },
      passwordRule: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      contractForm: {
        ContractNo: '',
        CompanyContractFileId: '',
        fileList: []
      },
      getTenantListUrl: URL.GETTENANTLIST, //客户列表查询
      querytenantinfoUrl: URL.QUERYTENANTINFO, //查询客户详细
      extendePeriodsUrl: URL.EXTENDEDPROBATIONARYPERIODS, //延长试用期申请
      getTenantMangerAccountUrl: URL.GETTENANTMANGERACCOUNT, //获取客户的企业管理员帐号
      resetTMAccountPassWordUrl: URL.RESETTMACCOUNTPASSWORD, //重置客户管理员帐号密码
      lockTenantUrl: URL.LOCKTENANT, //锁定客户
      uploadUrl: URL.UPLOADRESOURCE, //上传资源url
      deleteUrl: URL.DELETERESOURCE, //删除资源url
      updateTenantContractInfoUrl: URL.UPDATETENANTCONTRACTINFO, //修改与客户的合同信息url
      updateTenantApplyPersonInfoUrl: URL.UPDATETENANTAPPLYPERSONINFO, //修改与客户信息url
      getTenantServiceHistoryUrl: URL.GETTENANTSERVICEHISTORY, //查询客户的服务记录
      getTenantProjectServiceHistoryUrl: URL.GETPROJECTSERVICEHISTORY, //查询客户的项目服务记录
      queryuserUrl: URL.QUERYUSER, //查询客户的项目服务记录

      applyForm: {
        NewRegisterAccountId:'',
      },
      lockForm: {
        IsLocked: 0
      },
      typeForm: {
        EntitySort: null,
      },
    }
  },
  props: {
    rowData: [Object],
    canExtendePeriods: {
      type: Boolean,
      default: false
    },
  },
  computed: {

    //上传资源时的附加参数
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ResourceType": "2",
        "Title": "合同附件",
        "Description": "合同附件"
      }
    },
    //删除资源的附加参数
    deleteData() {
      return {
        "AccessToken": this.AccessToken,
        "Parameters": {
          "ResourceId": this.contractForm.ContractFileId,
          "ResourceType": "2"
        }
      }
    },
  },
  methods: {
    //更改密码
    resetPassword() {
      let vm = this
      console.log(vm.passwordForm.checkPass)
      let url = vm.resetTMAccountPassWordUrl
      let data = {
        'AccessToken': vm.AccessToken,
        Parameters: {
          'AccountId': vm.passwordForm.AccountId,
          'PassWord': vm.passwordForm.checkPass
        }
      }
      // console.log(data)
      PUT(url, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.successMsg('修改密码成功')
          // vm.isPopoverShow = false
        }
      })
    },

    //提交修改密码小表格
    submitPasswordForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.resetPassword()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    //提交合同修改表单
    submitContractForm() {
      this.updateTenantContractInfo()
    },

    //修改与客户的合同信息
    updateTenantContractInfo() {
      let vm = this
      let url = vm.updateTenantContractInfoUrl
      let data = {
        'AccessToken': vm.AccessToken,
        Parameters: {
          'CompanyId': vm.contractForm.CompanyId,
          'ContractNo': vm.contractForm.ContractNo,
          'ContractFileId': vm.contractForm.ContractFileId,
          'ContractFileName': vm.contractForm.ContractFileName
        }
      }
      PUT(url, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.successMsg('成功修改信息')
        }
      })
    },

    //提交修改申请人信息小表格
    submitApplyForm() {
      let vm = this
      if (vm.applyForm.OldRegisterAccountId == vm.NewRegisterAccountId) {
        vm.$message.warning('申请人未变更，无需修改')
        return false
      }
      for (let item of vm.applyForm.userOpts) {
        if (item.AccountId == vm.NewRegisterAccountId) {
          vm.applyForm.NewRegisterAccountId = item.AccountId
          vm.applyForm.NewRegisterName = item.UserName
          vm.applyForm.NewRegisterAccount = item.Account
        }
      }
      
      this.updateTenantApplyPersonInfo()
    },
    updateTenantApplyPersonInfo() {
      let vm = this
      let url = vm.updateTenantApplyPersonInfoUrl
      let data = {
        'AccessToken': vm.AccessToken,
        Parameters: {
          'CompanyId': vm.applyForm.CompanyId,
          'OldRegisterAccountId': vm.applyForm.OldRegisterAccountId,
          'NewRegisterName': vm.applyForm.NewRegisterName,
          'NewRegisterAccountId': vm.applyForm.NewRegisterAccountId,
          'NewRegisterAccount': vm.applyForm.NewRegisterAccount
        }
      }
      // console.log(data)
      PUT(url, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.applyForm.OldRegisterAccountId = vm.applyForm.NewRegisterAccountId
          vm.successMsg('修改客户信息成功')
        }
      })
    },
    //设置客户类型
    changeCompanyType() {
      let vm = this
      let url = URL.CHANGECOMPANYTYPE
      let data = {
        'AccessToken': vm.AccessToken,
        Parameters: {
          'CompanyId': vm.typeForm.CompanyId,
          'EntitySort': vm.typeForm.EntitySort
        }
      }
      POST(url, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.successMsg('类型设置成功')
        }
      })
    },
    //锁定客户
    lockTenant(companyId) {
      let vm = this
      let url = vm.lockTenantUrl
      let data = {
        'AccessToken': vm.AccessToken,
        Parameters: {
          'CompanyId': companyId,
          'IsLock': vm.lockForm.IsLocked
        }
      }
      PUT(url, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          if (vm.lockForm.IsLocked == 1) {
            vm.successMsg('成功锁定该客户')
          } else {
            vm.successMsg('成功解锁该客户')
          }
        }
      })
    },

    //控制资源上传按钮隐藏和显示
    uploadBtnShowAndHide(string = '') {
      let el0 = this.$refs['uploadFile'].$el
      let el1 = el0.getElementsByClassName('el-upload')
      let el2 = el0.getElementsByClassName('el-upload__tip')
      // console.log(el1)
      el1[0].style.display = string;
      el2[0].style.display = string;
    },

    //资源上传
    handleSuccess(res) {
      // console.log(res)
      let data = res.Data[0]
      this.contractForm.ContractFileId = data.ResourceId
      this.contractForm.ContractFileName = data.OriginalResourceName
      // console.log(this.contractForm.fileList)
      //当提交一张图片后隐藏上传按钮
      this.uploadBtnShowAndHide('none')
    },

    handlePreview(file) {
      let url = file.url
      window.open(url)
      // console.log(file);
    },

    handleRemove(file, fileList) {
      let vm = this
      vm.contractForm.fileList = []
      vm.uploadBtnShowAndHide('')
      // 删除服务器对应资源
      DELETE(vm.deleteUrl, vm.deleteData)
        .then(function(res) {
          if (res.data.State == 0) {
            // console.log(vm.contractForm)
            vm.contractForm.ContractFileId = ''
            vm.contractForm.ContractFileName = ''
          }
        })
    },

    //获取客户的企业管理员帐号
    getTenantMangerAccount(companyId) {
      let url = this.getTenantMangerAccountUrl
      let params = {
        AccessToken: this.AccessToken,
        Parameters: {
          CompanyId: companyId,
        }
      }
      return GET(url, params)
    },

    //获取租户详细信息
    querytenantinfo(companyId) {
      // console.log(row)
      let vm = this
      let url = this.querytenantinfoUrl;
      let params = {
        "AccessToken": this.AccessToken,
        'Parameters': {
          'CompanyId': companyId
        }
      }
      return GET(url, params)
    },

    //获取可更换申请人(管理员)列表
    queryUser(companyId){
      // console.log(row)
      let vm = this
      let url = this.queryuserUrl;
      vm.loadingUserOpts = true
      let params = {
        "AccessToken": this.AccessToken,
        "PageSize": 0,
        'Parameters': {
          'CompanyId': companyId
        }
      }
      return GET(url, params)
    },

    initData(row) {
      let vm = this
      // console.log(row)
      vm.$refs.passwordForm.resetFields()
      axios.all([
          vm.getTenantMangerAccount(row.CompanyId),
          vm.querytenantinfo(row.CompanyId),
          vm.queryUser(row.CompanyId)
        ])
        .then(axios.spread(function(acct, tent, userRes) {
          let res1 = acct.data
          if (FUNC.checkCode(res1.State, res1.Message)) {
            let accountData = acct.data.Data[0]
            vm.passwordForm.stuffAccount = accountData.Account
            vm.passwordForm.AccountId = accountData.AccountId
          }

          let res2 = tent.data
          if (FUNC.checkCode(res2.State, res2.Message)) {
            let tentInfo = tent.data.Data
            // console.log(tentInfo)

            vm.uploadBtnShowAndHide('')
            vm.$refs.uploadFile.clearFiles()
            vm.contractForm.CompanyId = row.CompanyId
            vm.contractForm.ContractNo = tentInfo.CompanyContractNo
            if (tentInfo.CompanyContractFileId) {
              vm.uploadBtnShowAndHide('none')
              vm.contractForm.ContractFileId = tentInfo.CompanyContractFileId
              vm.contractForm.fileList.push({
                name: tentInfo.CompanyContractFileName,
                url: tentInfo.CompanyContractFilesURL
              })
              vm.contractForm.ContractFileName = tentInfo.CompanyContractFileName
            }

            // console.log(vm.contractForm.ContractNo)
            vm.applyForm.CompanyId = row.CompanyId
            vm.applyForm.ApplyPsersonName = tentInfo.CompanyAplyName
            vm.applyForm.ApplyPsersonPhone = tentInfo.CompanyAplyPhone

            vm.lockForm.IsLocked = tentInfo.IsLocked
            vm.lockForm.CompanyId = row.CompanyId

            vm.typeForm.EntitySort = row.EntitySort
            vm.typeForm.CompanyId = row.CompanyId
          }

          let res3 = userRes.data
          if (FUNC.checkCode(res3.State, res3.Message)) {
            vm.applyForm.userOpts = userRes.data.Data.Result
            let userOpts = vm.applyForm.userOpts
            for (let item of userOpts) {
              if (item.IsAdmin==1) {
                vm.NewRegisterAccountId = item.AccountId
                vm.applyForm.OldRegisterAccountId = item.AccountId
                break;
              }
            }
            vm.loadingUserOpts = false
          }

        }))
        .catch(axios.spread(function(acct, tent, userRes) {
          console.log(acct)
          console.log(tent)
          console.log(userRes)
        }));
    },
    //后台返回保存失败信息
    warningFromBE(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      });
    },
    //成功提示信息
    successMsg(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'success'
      });
    },
    //清空表单
    resetForm() {
      this.passwordForm = {
        AccountId: '',
        checkPass: '',
        pass: '',
        stuffAccount: ''
      }
      this.contractForm = {
        CompanyContractFileId: '',
        CompanyId: '',
        ContractFileId: '',
        ContractNo: '',
        fileList: []
      }
      this.applyForm = {
        ApplyPsersonName: '',
        ApplyPsersonPhone: '',
        CompanyId: '',
      }
      this.lockForm = {
        CompanyId: '',
        IsLocked: '',
      }
      this.typeForm = {
        CompanyId: '',
        EntitySort: '',
      }
    }
  },
  mounted() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    this.resetForm()
    this.initData(this.rowData)
  },
  watch: {
    rowData() {
      this.AccessToken = FUNC.storage.get("AccessToken")
      this.resetForm()
      this.initData(this.rowData)
    }
  },
}

</script>
<style scoped lang='less'>
</style>

<style scoped lang='less'>
.tableWrap {
  position: relative;
  height: 100%;
}

.pd {
  padding: 0 15px
}

</style>
<template>
  <div class="tableWrap" v-loading="loading" :class='isShowProjectId?"":"pd"'>
    <div class="searchBar">
      <el-button size='small' type="primary" icon='plus' class='mb10 btn-2top' @click="showAddForm" v-show='isOperate.create'>新增</el-button>
      <el-select v-model="ProjectId" @change='search' filterable clearable placeholder="所属项目" size='small' v-if='isShowProjectId'>
        <el-option v-for="(item, index) in projectOpts" :key="index" :label="item.ProjectName" :value="item.ProjectId">
        </el-option>
      </el-select>
      <span class="w100">
        <el-select v-model="ReportType" clearable placeholder="报告类型" size='small' @change='search'>
          <el-option v-for="item in ReportTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </span>
      <span class="w100" v-if="EntitySort==2">
        <el-select v-model="CreatedBy" :loading='loadingCreatedByOpts' filterable clearable placeholder="提交人" size='small' @change='search'>
          <el-option v-for="item in CreatedByOpts" :key="item.AccountId" :label="item.UserName" :value="item.AccountId">
          </el-option>
        </el-select>
      </span>
      <span class="w200" @keyup='deSearch'>
        <el-input size='small' v-model="ReportName" placeholder="报告名称" ></el-input>
      </span>
    </div>
    <div style="height: calc(100% - 100px);overflow: auto">
      <el-table :data="tableData" style="width: 100%" class='userTable' stripe>
        <el-table-column type="index" label="序号" :width='65' align='center'>
        </el-table-column>
        <el-table-column prop="ReportName" label="报告名称" align='center'>
        </el-table-column>
        <el-table-column prop="CompanyFullName" label="业主/维保商" align='center' min-width='200'>
        </el-table-column>
        <el-table-column prop="ProjectName" label="所属项目" align='center' min-width='150'>
        </el-table-column>
        <el-table-column prop="ReportTypeName" label="类型" align='center' width='80'>
        </el-table-column>
        <el-table-column prop="CreatedOn" label="提交时间" align='center' min-width='150'>
        </el-table-column>
        <el-table-column prop="UserName" label="提交人" align='center'>
        </el-table-column>
        <el-table-column label="附件" align='center'>
          <template scope="scope">
            <a :title="scope.row.ResourceName" class='nowrap eosLink curp' @click='openUrl(scope.row.ReportContent)'>{{scope.row.ResourceName}}</a>
          </template>
        </el-table-column>
        <el-table-column label="操作" v-if='isOperate.delete' align='center' fixed='right' width='100'>
          <template scope="scope">
            <!-- <el-button @click="seeMore(scope.row)" type="text" size="small"><i class="fa fa-eye" title="查看详情"></i></el-button> -->
            <el-button type="text" size="small" v-show='scope.row.IsCanDelete' @click="deleteConfirm(scope.row.ProjectReportId)"><i class="el-icon-delete" title="删除报告"></i></el-button>
          </template>
        </el-table-column>
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
    <el-dialog title="新增报告" :visible.sync="dialogFormVisible">
      <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px" class="demo-ruleForm">
        <el-form-item label="所属项目：" prop="ProjectId">
          <el-select v-model="addForm.ProjectId" filterable style='width: 80%' :disabled='!isShowProjectId'>
            <el-option v-for="(item, index) in projectOpts" :key="index" :label="item.ProjectName" :value="item.ProjectId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报告名称：" prop="ReportName">
          <el-input v-model="addForm.ReportName" style='width: 80%'></el-input>
        </el-form-item>
        <el-form-item label="报告类型：" prop="ReportType">
          <el-select v-model="addForm.ReportType" style='width: 80%'>
            <el-option v-for="item in ReportTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接收对象：" prop="ReceiverSort">
          <el-checkbox v-model="checkBox.Maintenance" @change='checkBoxChange(1)'>维保商</el-checkbox>
          <el-checkbox v-model="checkBox.Owner" @change='checkBoxChange(1)'>业主</el-checkbox>
        </el-form-item>
        <el-form-item label="通知方式：">
          <el-checkbox v-model="checkBox.message" @change='checkBoxChange(2)'>短信</el-checkbox>
          <el-checkbox v-model="checkBox.email" @change='checkBoxChange(2)'>邮箱</el-checkbox>
        </el-form-item>
        <el-form-item label="上传报告：" prop="ReportContent">
          <el-input v-model="addForm.ReportContent" class="w300" v-show='false'></el-input>
          <el-upload class="upload-demo w300" :action="uploadResUrl" :data='uploadData' :multiple='false' :on-success="handleSuc" :on-remove="handleRemove" :file-list="addForm.fileList" ref='upload' :before-upload="beforeImgUpload">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const OPTS = Common.Const.options
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const DELETE = AXIOS.delete
import * as Common from 'src/assets/js/common';
let URL = Common.Const.url
export default {
  data: function() {
    return {
      timeId: null,
      EntitySort: '',
      dialogFormVisible: false,
      //表单入参
      checkBox: {
        Maintenance: true,
        Owner: false,
        message: true,
        email: false,
      },
      addForm: {
        ProjectId: '',
        ReportName: '',
        ReportType: '',
        ReceiverSort: '2', //接收对象 1-业主，2-维保商，3-业主&维保商 必填
        ReceiveType: '1', //通知方式 1:短信 2:邮件 3:短信+邮件
        ReportContent: '',
        ResourceName: '',
        fileList: []
      },
      uploadResUrl: URL.UPLOADRESOURCE, //上传资源url
      //表单的验证规则
      rules: {
        ProjectId: [
          { required: true, message: '请选择所属项目', trigger: 'change' },
        ],
        ReportName: [
          { required: true, message: '报告名称不能为空', trigger: 'blur' }
        ],
        ReportType: [
          { required: true, message: '请选择报告类型', trigger: 'change' }
        ],
        ReceiverSort: [
          { required: true, message: '请至少选择一个接收对象', trigger: 'change' }
        ],
        /*ReceiveType: [
          { required: true, message: '请至少选择一种通知方式', trigger: 'change' }
        ],*/
        ReportContent: [
          { required: true, message: '请上传程序附件', trigger: 'change' },
        ],
      },
      //操作权限相关
      isOperate: {},

      isShowProjectId: true,
      loading: false,
      tableData: [],
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      ProjectId: "", //项目id
      projectOpts: [],
      loadingProjectOpts: true,

      CreatedBy: "", //项目id
      CreatedByOpts: [],
      loadingCreatedByOpts: true,

      ReportType: '',
      ReportTypeOptions: OPTS.REPORTTYPEOPTIONS,
      ReportName: '',
    }
  },
  props: ['propsData'],
  computed: {
    //上传资源时的附加参数
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ResourceType": "0",
        "Title": "附件",
        "Description": "附件"
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
    beforeImgUpload(file) {
      const isLt16M = file.size / 1024 / 1024 < 16;
      // console.log(isLt16M)
      if (!isLt16M) {
        this.$message.error('报告文件大小不能超过 16MB!');
        return false
      }
    },
    checkBoxChange(type) {
      let vm = this
      let check = vm.checkBox
      if (type == 1) {
        if (check.Maintenance && check.Owner) {
          vm.addForm.ReceiverSort = '3'
          return
        }
        if (check.Maintenance && !check.Owner) {
          vm.addForm.ReceiverSort = '2'
          return
        }
        if (!check.Maintenance && check.Owner) {
          vm.addForm.ReceiverSort = '1'
          return
        }
        if (!check.Maintenance && !check.Owner) {
          vm.addForm.ReceiverSort = ''
          return
        }
      } else {
        if (check.message && check.email) {
          vm.addForm.ReceiveType = '3'
          return
        }
        if (check.message && !check.email) {
          vm.addForm.ReceiveType = '1'
          return
        }
        if (!check.message && check.email) {
          vm.addForm.ReceiveType = '2'
          return
        }
        if (!check.message && !check.email) {
          vm.addForm.ReceiveType = ''
          return
        }
      }
    },
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证
        if (valid) {
          this.saveReport()
        } else {
          return false;
        }
      });
    },
    saveReport() {
      let vm = this
      let add = vm.addForm
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters: {
          "ProjectId": add.ProjectId, //项目id,必填
          "ReportName": add.ReportName, //报告名称,必填
          "ReportContent": add.ReportContent, //报告资源Id,必填
          "ReportType": add.ReportType, //报告类型 1-月报，2-季报，3-年报 必填
          "ReceiverSort": add.ReceiverSort, //接收对象 1-业主，2-维保商，3-业主&维保商 必填
          "ResourceName": add.ResourceName, //报表资源名称,必填
          "ReceiveType": add.ReceiveType, //通知方式 1:短信 2:邮件 3:短信+邮件
        }
      }
      POST(URL.UPLOADPROJECTREPORT, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.$message.warning(res.data.Message)
          return false
        } else {
          // vm.$refs.addUpload.clearFiles()
          vm.tableLoad(undefined, 1)
          vm.dialogFormVisible = false
        }
      })
    },
    //资源上传
    handleSuc(response, file, fileList) {
      if (fileList.length > 1) {
        this.handleRemove()
      }
      this.addForm.fileList = fileList.slice(-1);
      if (file.response) {
        // console.log(file.response.Data[0])
        this.addForm.ReportContent = file.response.Data[0].ResourceId
        this.addForm.ResourceName = file.response.Data[0].OriginalResourceName
        // console.log(this.addForm.resMd5,'change')
      }
    },
    handleRemove(file, fileList) {
      // console.log(file)
      if (!this.addForm.fileList[0]) return
      let vm = this
      vm.addForm.ReportContent = ''
      vm.addForm.ResourceName = ''
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "ResourceId": this.addForm.fileList[0].response.Data[0].ResourceId,
          "ResourceType": "0"
        }
      }
      let url = URL.DELETEGRIDFS
      // 删除服务器对应资源
      DELETE(url, data)
        .then(function(res) {
          if (res.data.State == 0) {
            fileList = []
          }
        })
    },
    openUrl(url) {
      window.open(url)
    },
    //删除报告
    deleteConfirm(id) {
      let vm = this
      vm.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          AccessToken: FUNC.storage.get("AccessToken"),
          Parameters: {
            ProjectReportId: id
          }
        }
        DELETE(URL.DELETEPROJECTREPORT, data).then(function(res) {
          // 成功删除后提示用户
          if (res.data.State == 0) {
            vm.$message({
              // type: 'success',
              type: 'info',
              message: '删除成功!'
            });
            vm.tableLoad(undefined, vm.PageIndex)
          }
        })

      })
    },
    showAddForm() {
      let vm = this
      vm.dialogFormVisible = true
      vm.resetForm()
    },
    //清空表单
    resetForm() {
      let vm = this
      let el = vm.$refs.addForm
      if (el) {
        el.resetFields()
      }
      let ProjectId = ''
      if (vm.propsData) {
        ProjectId = vm.propsData.ProjectId||''
      }
      vm.addForm = {
        ProjectId,
        ReportName: '',
        ReportType: '',
        ReportContent: '',
        ResourceName: '',
        fileList: [],
        ReceiverSort: '2',
        ReceiveType: '1',
      }
      vm.checkBox = {
        Maintenance: true,
        Owner: false,
        message: true,
        email: false,
      }
    },
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
    //加载提交人
    setCreatedByOpts() {
      let vm = this
      vm.loadingCreatedByOpts = true
      let params = {
        "AccessToken": FUNC.storage.get('AccessToken'),
      }
      let url = URL.QUERYUSER
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data.Result
            vm.CreatedByOpts = data
            vm.loadingCreatedByOpts = false
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
    deSearch() {
      FUNC.debounce(this.timeId, this, 'search')
    },
    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      ProjectId = this.ProjectId,
      ReportType = this.ReportType,
      CreatedBy = this.CreatedBy,
      ReportName = this.ReportName) {
      let vm = this
      vm.loading = true

      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        PageSize,
        PageIndex,
        ProjectId,
        ReportType, //–报告类型，1：月报，2：季报，3：年报
        CreatedBy, //–报告上传者ID
        ReportName, //–报告名称
      }
      let url = URL.QUERYPROJECTREPORT
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data.Data
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
      for (let item of dataArr) {
        // console.log(item)
        item.CompanyFullName = `${item.OwnerCompanyName} / ${item.MaintCompanyName}`
      }
      this.tableData = dataArr
    },
    pageIndexChange(val) {
      this.PageIndex = val
      this.tableLoad(this.PageSize, this.PageIndex)
    },
    isHasPropsData() {
      let vm = this
      if (vm.propsData) {
        if (vm.propsData.ProjectId) {
          vm.ProjectId = vm.propsData.ProjectId
          vm.isShowProjectId = false
        }
        /*if (vm.propsData.EquipmentId) {
          vm.EquipmentId = vm.propsData.EquipmentId
        }*/
      }
      vm.tableLoad()
    },
    init() {
      let vm = this
      let op = FUNC.tntool.setTnAuthByName('服务报告')
      // console.log(op)
      vm.isOperate = FUNC.operator.eosOperDataHandle(op)
      vm.EntitySort = FUNC.storage.get("EntitySort")

      vm.setProjectOpts()
      vm.setCreatedByOpts()
      vm.isHasPropsData()
    }
  },
  mounted: function() {
    let vm = this
    vm.init()
  },
  watch: {
    propsData() {
      this.isHasPropsData()
    },
  }
}

</script>

<style lang='less' scoped>


</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" v-loading="loadingTable" element-loading-text="努力加载中" v-if='showWhichTab==1'>
      <div>
        <el-row class='border-1px'>
          <el-col :span="22">
            <h3>版本管理</h3>
          </el-col>
        </el-row>
        <div class="hr mb10"></div>
      </div>
      <div>
        <el-row>
          <el-col :span='24' v-show='isOperate.query'>
            <span class="w150 mb10">
              <el-select v-model="GatewayModel" clearable placeholder="网关型号" @change='search'>
                <el-option
                    v-for="item in GatewayModelOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w150 mb10">
              <el-select v-model="ProgramType" clearable placeholder="程序类型" @change='search'>
                <el-option
                    v-for="item in ProgramTypeOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w150 mb10">
              <el-select v-model="UpgradeWay" clearable placeholder="升级方式" @change='search'>
                <el-option
                    v-for="item in UpgradeWayOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w200 mb10">
              <el-date-picker v-model="CreatedOnBegin" value-format='yyyy' :editable='false' clearable class='w100p' type="datetime" placeholder="发布起始时间" @change='search'></el-date-picker>
            </span>
            <span class="w200 mb10">
              <el-date-picker v-model="CreatedOnEnd" :editable='false' clearable class='w100p' type="datetime" placeholder="发布截止时间" @change='search'></el-date-picker>
            </span>
            <span class="w150 mb10">
              <el-input v-model="ProgramVersion" placeholder="版本号" @keyup.enter='search'></el-input>
            </span>            
            <el-button type="primary" icon='search' class='ml15 mb10' @click='search'>查找</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" style="width: 100%" class='userTable noWrapTable' stripe>
              <el-table-column type="index" label="序号" width='65' align='center'>
              </el-table-column>
              <el-table-column prop="ProgramTypeName" label="程序类型" align='center' min-width='100'>
              </el-table-column>
              <el-table-column prop="ProgramVersion" label="版本号" min-width='150' align='center'>
              </el-table-column>
              <el-table-column prop="FileOrgName" label="程序文件名" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.FileOrgName">{{scope.row.FileOrgName}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="GatewayModelName" label="网关型号" align='center' min-width='150'>
              </el-table-column>
              <el-table-column prop="UpgradeWayName" label="升级方式" align='center' min-width='100'>
              </el-table-column>
              <el-table-column label="程序描述" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.Description">{{scope.row.Description}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="CreatedOn" label="发布时间" align='center' min-width='180'>
              </el-table-column>
              <el-table-column label="操作" width='140' align='center' fixed="right">
                <template scope="scope">
                  <el-button @click="download(scope.row.FileUrl)" type="text" size="small" class='ml5'>下载</el-button>
                  <el-button @click="showEditDia(scope.row)" type="text" size="small" class='ml5'>修改</el-button>
                  <el-popover trigger="click" placement="top" :ref='scope.row.FileId'>
                    <p style="text-align: center;">确认删除吗？</p>
                    <div style="text-align: center; margin-top: 10px">
                      <el-button size="mini" type="text" @click="hidePop">取消</el-button>
                      <el-button type="primary" size="mini" @click="deleteVer(scope.row.FileId)">确定</el-button>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <el-button type="text" size="small">删除</el-button>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="clearfix mb10"></div>
        <el-row>
          <el-col :span='24'>
            <el-button type="primary" icon='' size="small" class='mb10' @click='showAddDia'>发布版本</el-button>
            <div class="pageBlock">
              <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="Total">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog title="修改版本" :visible.sync="isShowEditDialog">
      <editForm :currentRow='currentRow' :isShowEditDialog.sync="isShowEditDialog" :tableLoad='tableLoad'></editForm>
    </el-dialog>
    <el-dialog title="发布版本" :visible.sync="isShowAddDialog" @close='closeAddDia' @open='openAddDia'>
      <el-row>
        <el-col :span='24'>
          <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label="网关型号：" prop="GatewayModel">
              <el-select v-model="addForm.GatewayModel" clearable class="w300" placeholder="发布后无法修改">
                <el-option v-for="item in GatewayModelOpts" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="程序类型：" prop="ProgramType">
              <el-select v-model="addForm.ProgramType" clearable class="w300" placeholder="发布后无法修改">
                <el-option v-for="item in ProgramTypeOpts" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="升级方式：" prop="UpgradeWay">
              <el-select v-model="addForm.UpgradeWay" clearable class="w300" placeholder="发布后无法修改">
                <el-option v-for="item in UpgradeWayOpts" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="版本号：" prop="ProgramVersion">
              <el-input v-model="addForm.ProgramVersion" class="w300" placeholder="发布后无法修改"></el-input>
            </el-form-item>
            <el-form-item label="程序描述：" prop="Description">
              <el-input type="textarea" v-model="addForm.Description" class="w300"></el-input>
            </el-form-item>
            <el-form-item label="上传文件：" prop="ProgramFiles">
              <el-input v-model="addForm.ProgramFiles" class="w300" v-show='false'></el-input>
              <el-upload class="upload-demo w300" :action="uploadResUrl" :data='uploadData' :multiple='false' :on-change="handleChange" :on-remove="handleRemove" :file-list="addForm.fileList" :before-upload="setFileMd5" ref='upload'>
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">上传合同附件相关文件或压缩包</div> -->
              </el-upload>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddDialog = false">关 闭</el-button>
        <el-button type="primary" @click="submitAddForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import editForm from './common/editForm'
import md5 from 'browser-md5-file'
let Base64 = require('js-base64').Base64;
// console.log(md5)
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const Vlidator = FUNC.validator
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const PUT = AXIOS.put
const DELETE = AXIOS.delete
const URL = Common.Const.url
const OPTS = Common.Const.options
Date.prototype.format = FUNC.date.format
export default {
  components: {
    editForm
  },
  data() {
    return {
      showWhichTab: 1,
      ProgramVersion: '',//程序版本号
      ProgramType: "", //程序类型，kernel-内核程序;apps-应用程序;web-Web程序;shellscript-脚本程序
      ProgramTypeOpts: OPTS.PROGRAMTYPOPTIONS,
      GatewayModel: "", //网关型号: 1-EOS100; 2-EOS200; 3-EOS300
      GatewayModelOpts: OPTS.GATEWAYMODELOPTIONS,

      UpgradeWay: "", //升级方式: 0-统一;1-指定
      UpgradeWayOpts: OPTS.UPGRADEWAYOPTIONS,

      CreatedOnBegin: "",
      CreatedOnEnd: "",
      currentRow: {},
      isShowEditDialog: false,
      isShowAddDialog: false,
      isUploadInserted:false,
      addForm: {
        GatewayModel: '',
        ProgramType: '',
        UpgradeWay: '',
        ProgramVersion: '',
        Description: '',
        ProgramFiles: '',
        localMd5: '',
        resMd5: '',
        fileList: []
      },
      addFormRules: {
        GatewayModel: [
          { required: true, message: '请选择网关型号', trigger: 'change' },
        ],
        ProgramType: [
          { required: true, message: '请选择程序类型', trigger: 'change' },
        ],
        UpgradeWay: [
          { required: true, message: '请选择升级方式', trigger: 'change' },
        ],
        ProgramVersion: [
          { required: true, message: '请填写版本号', trigger: 'change' },
          { validator: Vlidator.verNoComma, trigger: 'change' }
        ],
        Description: [],
        ProgramFiles: [
          { required: true, message: '请上传程序附件', trigger: 'change' },
        ],
      },
      //操作权限相关
      isOperate: {},

      //加载表格相关
      loadingTable: false,
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      tableData: [],

      queryTableUrl: URL.QUERYGATEWAYPROGRAM, //查询运行网关所在的企业列表
      deleteUrl: URL.DELGATEWAYPROGRAM, //查询升级网关列表(下拉框)
      insertUrl: URL.INSERTGATEWAYPROGRAM, //发布网关
      updateUrl: URL.UPDATEGATEWAYPROGRAM, //修改网关url
      uploadResUrl: URL.UPLOADGRIDFS, //上传资源url
      deleteResUrl: URL.DELETEGRIDFS, //删除资源url
    }
  },
  computed: {
    //上传资源时的附加参数
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "FileProperty": ""
      }
    },
    CreatedOnBeginFormat(){
      return this.CreatedOnBegin?(new Date(this.CreatedOnBegin)).format("yyyy-MM-dd hh:mm:ss"):''
    },
    CreatedOnEndFormat(){
      return this.CreatedOnEnd?(new Date(this.CreatedOnEnd)).format("yyyy-MM-dd hh:mm:ss"):''
    },
  },
  methods: {
    openAddDia(){
      this.isUploadInserted = false
    },
    setFileMd5(file){
      let vm = this
      md5(file, function (err, md5) {
        vm.addForm.localMd5 = md5
          // console.log(vm.addForm.localMd5)
      });
    },
    closeAddDia() {
      if (!this.isUploadInserted&&this.addForm.fileList.length > 0) this.handleRemove()
      // if (this.addForm.fileList.length > 1) this.handleRemove()
    },
    submitAddForm() {
      if (this.addForm.localMd5!==this.addForm.resMd5) {
        this.$message.warning('上传文件有误,请重新上传!')
        return false
      }
      this.$refs.addForm.validate((valid) => {
        //表单验证
        if (valid) {
          this.checkDulpliThenInsert(this.addForm,this.insertGateway)
          // console.log('可以提交')
        } else {
          return false;
        }
      });
    },
    insertGateway() {
      let vm = this
      let url = vm.insertUrl
      let add = vm.addForm
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "GatewayModel": add.GatewayModel,
        "ProgramType": add.ProgramType,
        "UpgradeWay": add.UpgradeWay,
        "ProgramVersion": add.ProgramVersion,
        "ProgramFiles": [add.ProgramFiles],
        "Description": add.Description,
        "CheckCode": add.localMd5
      }
      // console.log(data)
      POST(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.isUploadInserted = true
            vm.successMsg('发布网关版本成功')
            vm.isShowAddDialog = false
            vm.tableLoad(vm.PageSize, vm.PageIndex = 1)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    updateGateway(fileId) {
      let vm = this
      let url = vm.updateUrl
      let add = vm.addForm
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "FileId": fileId,
        "GatewayModel": add.GatewayModel,
        "ProgramType": add.ProgramType,
        "UpgradeWay": add.UpgradeWay,
        "ProgramVersion": add.ProgramVersion,
        "ProgramFiles": [add.ProgramFiles],
        "Description": add.Description,
        "CheckCode": add.localMd5
      }
      PUT(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.isUploadInserted = true
            vm.$message.success('覆盖网关成功')
            vm.isShowAddDialog = false
            vm.tableLoad()
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },    
    checkDulpliThenInsert(form,callback){
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        // "PageSize": PageSize,
        // "PageIndex": PageIndex,
        'Parameters': {
          "GatewayModel": form.GatewayModel,
          "ProgramType": form.ProgramType,
          "UpgradeWay": form.UpgradeWay,
          "ProgramVersion": form.ProgramVersion,
        }
      }
      let url = vm.queryTableUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let Total = res.Data.Total
            if (!Total) {
              callback()
            } else {
              let fileId = res.Data.Result[0].FileId
              vm.$confirm('列表中已存在相同记录，是否覆盖？', '提示', {
                confirmButtonText: '继续',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                vm.updateGateway(fileId)
              }).catch(() => {
                return false
              });
            }
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });      
    },
    //资源上传
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        this.handleRemove()
      }
      this.addForm.fileList = fileList.slice(-1);
      if (file.response) {
        this.addForm.ProgramFiles = file.response.Data[0].ResourceId
        this.addForm.resMd5 = file.response.Data[0].CheckCode
        // console.log(this.addForm.resMd5,'change')
      }
    },
    handleRemove(file, fileList) {
      // console.log(file)
      let vm = this
      vm.addForm.ProgramFiles = ''
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "ResourceId": this.addForm.fileList[0].response.Data[0].ResourceId,
          "ResourceType": "4"
        }
      }
      let url = vm.deleteResUrl
      // 删除服务器对应资源
      DELETE(url, data)
        .then(function(res) {
          if (res.data.State == 0) {
            fileList = []
          }
        })
    },

    hidePop() {
      document.querySelector("#ecos").click()
    },
    deleteVer(FileId) {
      // console.log(FileId)
      let vm = this
      let url = vm.deleteUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "FileId": FileId
      }
      DELETE(url, data).then(function(response) {
        // console.log(res)
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.successMsg('删除成功')
          vm.hidePop()
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

    //弹出修改发布网关话框
    showEditDia(row) {
      let vm = this
      vm.currentRow = row
      // console.log(vm.currentRow)
      vm.isShowEditDialog = true
    },

    //弹出发布网关话框
    showAddDia() {
      let vm = this
      vm.addForm.fileList = []
      vm.isShowAddDialog = true
      if (vm.$refs.addForm) vm.$refs.addForm.resetFields()

    },

    //下载
    download(url) {
      url = Base64.decode(url)
      // console.log()
      window.open(url)
    },

    //搜索预警告警条目
    search() {
      this.tableLoad(this.PageSize, this.PageIndex = 1)
    },

    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      GatewayModel = this.GatewayModel,
      ProgramType = this.ProgramType,
      UpgradeWay = this.UpgradeWay,
      ProgramVersion = this.ProgramVersion,
      CreatedOnBegin = this.CreatedOnBeginFormat,
      CreatedOnEnd = this.CreatedOnEndFormat) {
      let vm = this
      vm.loadingTable = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          "GatewayModel": GatewayModel,
          "ProgramType": ProgramType,
          "UpgradeWay": UpgradeWay,
          "ProgramVersion": ProgramVersion,
          "CreatedOnBegin": CreatedOnBegin,
          "CreatedOnEnd": CreatedOnEnd
        }
      }
      let url = vm.queryTableUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data.Result
            let Total = res.Data.Total
            // console.log(dataArr)
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
  },
  mounted: function() {
    this.tableLoad()
    this.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(this.isOperate)
  },
  watch: {}
}

</script>

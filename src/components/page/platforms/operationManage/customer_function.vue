<style lang='less' scoped>
a{cursor: pointer;}
.el_mainContent{
  width:100%;
  height:100%;
  position: relative;
  background-color: #fff;
}
.el_content {
  overflow-y: auto;
  width:100%;
}
</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" style="height: calc(100% - 40px)">
      <el-row>
        <el-col :span="22">
          <h3>客户功能管理</h3>
        </el-col>
        <el-col :span="2">
          <el-button class='mb10 fr' size='small' v-show='!isShowMain' @click='isShowMain=!isShowMain'><i class="fa fa-mail-reply-all mr5"></i>返回 </el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <div v-show='isShowMain'>
        <el-row class="mb10">
          <el-col :span='24'>
            <el-button type="primary" icon='plus' size='small' @click="addFun" style='position: relative;top: -2px;'>新增</el-button>
            <span class="w200" @keyup='deSearchKeyWord'>
              <el-input size='small' v-model="KeyWord" placeholder="公司名称" ></el-input>
            </span>
            <el-button type="primary" icon='search' size='small' @click='searchKeyWord' style='position: relative;top: -2px;'>查找</el-button>
          </el-col>
        </el-row>
        <!-- <div class="clearfix mb10"></div> -->
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" v-loading="loadingTable" element-loading-text="努力加载中" style="width: 100%" class='userTable' stripe>
              <el-table-column type="index" label="序号" width='80' align='center'>
              </el-table-column>
              <el-table-column prop="FunctionName" label="功能名称" align='center' min-width='100'>
              </el-table-column>
              <el-table-column label="公司名称" align='center' min-width='150'>
                <template scope="scope">
                  <a :title="scope.row.CompanyFullName" class='nowrap eosLink' @click='checkRowCompany(scope.row)'>{{scope.row.CompanyFullName}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="ApplicationName" label="所属应用" align='center' min-width='100'>
              </el-table-column>
              <el-table-column prop="FunctionSortName" label="功能类型" align='center' min-width='100'>
              </el-table-column>
              <el-table-column prop="BeginTime" label="开通时间" align='center' min-width='180'>
              </el-table-column>
              <el-table-column prop="EndTime" label="到期时间" align='center' min-width='180'>
              </el-table-column>
              <el-table-column prop="ContractNo" label="合同编号" align='center' min-width='100'>
              </el-table-column>
              <el-table-column label="附件" min-width='100'>
                <template scope="scope">
                  <el-button v-show='scope.row.ContractFileId && isOperate.download' @click="download(scope.row.ContractFileURL)" type="text" size="mini" class='eosLink'><u>下载</u></el-button>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" align='center' min-width='100'>
                <template scope="scope">
                  <!-- <el-button @click="seeMore(scope.row)" type="text" size="small"><i class="el-icon-more" title="查看详情"></i></el-button> -->
                  <el-button type="text" size="small" v-show='isOperate.update && scope.row.FunctionSort!=0' @click='editFun(scope.row)'><i class="el-icon-edit" title="编辑信息"></i></el-button>
                  <el-button type="text" size="small" v-show='isOperate.delete && scope.row.FunctionSort!=0' @click="deleteConfirm(scope.row)"><i class="el-icon-delete" title="删除信息"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- <div class="clearfix mb10"></div>
        <el-row>
          <el-col :span='24'>
            <div class="pageBlock">
              <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="TotalData">
              </el-pagination>
            </div>
          </el-col>
        </el-row> -->
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
      <detailBox v-if='!isShowMain' :companyId='rowCompanyId'></detailBox>
    </div>
    <el-dialog title="修改功能" :visible.sync="isShowEdit">
      <el-form :model="funEditForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司名称">
          <el-input v-model="funEditForm.CompanyFullName" disabled></el-input>
        </el-form-item>
        <el-form-item label="可选功能">
          <el-input v-model="funEditForm.FunctionName" disabled></el-input>
        </el-form-item>
        <el-form-item label="所属应用">
          <el-input v-model="funEditForm.ApplicationName" disabled></el-input>
        </el-form-item>
        <el-form-item label="开通时间">
          <el-input v-model="funEditForm.BeginTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker v-model="funEditForm.EndTime" class='w100p' type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="funEditForm.ContractNo"></el-input>
        </el-form-item>
        <el-form-item label="合同附件：">
          <el-upload class="upload-demo w300" ref="uploadFileEdit" :action="uploadUrl" :data='uploadData' :multiple='false' :on-preview="handlePreview" :on-success='handleSuccess2' :on-remove="handleRemove2" :file-list="funEditForm.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传合同附件相关文件或压缩包</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增功能" :visible.sync="dialogFormVisible">
      <el-form :model="addFunForm" :rules="addFunFormRules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司名称" prop="CompanyId">
          <el-select v-model="addFunForm.CompanyId" filterable placeholder="请选择" class='w100p' @change='setFunctionOpts($event)'>
            <el-option v-for="item in companyOptions" :key="item.CompanyId" :ref="item.CompanyId" :CompanyFullName="item.CompanyFullName" :label="item.CompanyFullName" :value="item.CompanyId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="可选功能" prop="FunctionId">
          <el-select v-model="addFunForm.FunctionId" filterable placeholder="请选择" class='w100p' :disabled="addFunForm.CompanyId==''" @change='setApplicationName($event)'>
            <el-option v-for="item in unusedFunctionOpts" :key="item.FunctionId" :ApplicationName='item.ApplicationName' :ApplicationId='item.ApplicationId' :FunctionName='item.FunctionName' :ref='item.FunctionId' :label="item.FunctionName" :value="item.FunctionId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属应用">
          <el-input v-model="addFunForm.ApplicationName" disabled></el-input>
        </el-form-item>
        <el-form-item label="开通时间">
          <el-input v-model="addFunForm.BeginTime" disabled></el-input>
        </el-form-item>
        <el-form-item label="截止时间">
          <el-date-picker v-model="addFunForm.EndTime" :editable='false' clearable class='w100p' type="datetime" placeholder="选择日期时间" @change='changeEndTime'>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="合同编号">
          <el-input v-model="addFunForm.ContractNo"></el-input>
        </el-form-item>
        <el-form-item label="合同附件：">
          <el-upload class="upload-demo w300" ref="uploadFile" :action="uploadUrl" :data='uploadData' :multiple='false' :on-success='handleSuccess' :on-remove="handleRemove" :file-list="addFunForm.fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">上传合同附件相关文件或压缩包</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import detailBox from 'components/common/companyDetailBox'
import qs from 'qs'
import * as Common from 'src/assets/js/common';
import axios from 'axios'
let URL = Common.Const.url
let FUNC = Common.Func
export default {
  data() {
    return {
      timeId: null,
      //编辑应用相关
      isShowEdit: false,
      funEditForm: {},



      //操作权限相关
      isOperate: {},

      //加载表格相关
      isShowMain: true,
      loadingTable: true,
      AccessToken: '',
      PageSize: 10,
      TotalData: undefined,
      PageIndex: 1,
      KeyWord: '',
      tableData: [],
      rowCompanyId:'',

      //新增应用表单入参
      addFunForm: {
        CompanyId: "",
        CompanyName: "",
        FunctionId: "",
        FunctionName: "",
        ApplicationId: "",
        ApplicationName: "",
        BeginTime: "",
        EndTime: "",
        ContractNo: "",
        ContractFileName: "",
        ContractFileId: "",
        fileList: []
      },

      //编辑应用表单入参
      funEditForm: {
        CompanyId: "",
        CompanyName: "",
        FunctionId: "",
        FunctionName: "",
        ApplicationId: "",
        ApplicationName: "",
        BeginTime: "",
        EndTime: "",
        ContractNo: "",
        ContractFileName: "",
        ContractFileId: "",
        fileList: []
      },

      //新增表单的验证规则
      addFunFormRules: {
        CompanyId: [
          { type: 'string', required: true, message: '请选择公司名称', trigger: 'change' }
        ],
        FunctionId: [
          { type: 'string', required: true, message: '请选择功能名称', trigger: 'change' }
        ]
      },

      dialogFormVisible: false,

      companyOptions: [], //公司名称下拉列表选项
      unusedFunctionOpts: [], //客户未使用的功能模块列表选项

      getTenantFunctionListUrl: URL.GETTENANTFUNCTIONLIST, //查询客户功能列表,包括过期和未过期的
      getTenantListUrl: URL.GETTENANTLIST, //获取客户列表信息
      getTenantUnusedFunctionListUrl: URL.GETTENANTUNUSEDFUNCTIONLIST, //获取客户未使用的功能模块

      uploadUrl: URL.UPLOADRESOURCE, //上传资源url
      deleteUrl: URL.DELETERESOURCE, //删除资源url

      //保存应用地址url
      saveFunUrl: URL.INSERTTENANTFUNCTION,

      //更新应用地址url
      saveUpdateFunUrl: URL.UPDATETENANTFUNCTION,

      //删除应用条目url
      deleteFunUrl: URL.DELETETENANTFUNCTION
    }
  },
  components:{
    detailBox
  },
  computed: {
    //上传资源时的附加参数
    uploadData() {
      return {
        "AccessToken": this.AccessToken,
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
          "ResourceId": this.addFunForm.ContractFileId,
          "ResourceType": "2"
        }
      }
    },
    deleteData2() {
      return {
        "AccessToken": this.AccessToken,
        "Parameters": {
          "ResourceId": this.funEditForm.ContractFileId,
          "ResourceType": "2"
        }
      }
    },
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.TotalData)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.TotalData)
    },
  },
  methods: {
    handlePreview(file) {
      let url = file.url
      window.open(url)
    },
    changeEndTime(value) {
      this.addFunForm.EndTime = value
    },
    addFun() {
      this.dialogFormVisible = true
      Date.prototype.format = FUNC.date.format
      this.addFunForm.BeginTime = (new Date()).format("yyyy-MM-dd hh:mm:ss")
    },
    setApplicationName(value) {
      console.log(value)
      let row = this.$refs[value][0].$attrs
      if (!row) return false
      let str = row.ApplicationName
      this.addFunForm.ApplicationName = str
      str = row.ApplicationId
      this.addFunForm.ApplicationId = str
      str = row.FunctionName
      this.addFunForm.FunctionName = str
    },
    setFunctionOpts(value) {
      let vm = this
      let str = this.$refs[value][0].$attrs.CompanyFullName
      this.addFunForm.CompanyName = str
      this.addFunForm.FunctionId = ''
      // console.log(this.addFunForm.CompanyName)
      let data = {
        AccessToken: vm.AccessToken,
        Parameters: {
          CompanyId: this.addFunForm.CompanyId
        }
      }
      data = qs.stringify(data)
      let url = `${vm.getTenantUnusedFunctionListUrl}?${data}`
      axios.get(url)
        .then(function(response) {
          let res = response.data.Data
          vm.unusedFunctionOpts = res
          // console.log(vm.unusedFunctionOpts)

        })
        .catch(function(error) {
          console.log(`${error.message}`)
        });
    },
    setCompanyOptions() {
      let vm = this
      let data = {
        AccessToken: vm.AccessToken,
      }
      data = qs.stringify(data)

      let url = `${vm.getTenantListUrl}?${data}`
      axios.get(url)
        .then(function(response) {
          let res = response.data.Data.Result
          vm.companyOptions = res
          // console.log(vm.companyOptions)
        })
        .catch(function(error) {
          console.log(`${error.message}`)
        });
    },
    //下载
    download(url) {
      window.open(url)
    },
    //删除功能
    deleteConfirm(row) {
      let vm = this
      vm.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          AccessToken: this.AccessToken,
          Parameters: {
            CompanyId: row.CompanyId,
            FunctionId: row.FunctionId
          }
        }
        axios.delete(this.deleteFunUrl, {
          data: data
        }).then(function(res) {
          // 成功删除后提示用户
          if (res.data.State == 0) {
            vm.$message({
              // type: 'success',
              type: 'info',
              message: '删除成功!'
            });
            vm.tableLoad()
          }
        })

      })
    },


    //编辑功能
    editFun(row) {
      let vm = this
      vm.isShowEdit = true
      vm.funEditForm = { ...row }
      // console.log(vm.funEditForm)
      vm.funEditForm.fileList = []
      setTimeout(function() {
        vm.uploadBtnShowAndHide('uploadFileEdit')
      }, 0)

      if (vm.funEditForm.ContractFileId) {
        vm.funEditForm.fileList = [{
          name: row.ContractFileName,
          url: row.ContractFileURL
        }]
        setTimeout(function() {
          vm.uploadBtnShowAndHide('uploadFileEdit', 'none')
        }, 1)
      }
    },

    //控制资源上传按钮隐藏和显示
    uploadBtnShowAndHide(refName = 'uploadFile', string = '') {
      let el = this.$refs[refName].$el
      // console.log(el)
      let el1 = el.childNodes[0]
      let el2 = el.childNodes[1]
      el1.style.display = string;
      el2.style.display = string;
    },

    //资源上传
    handleSuccess(res) {
      let data = res.Data[0]
      this.addFunForm.ContractFileId = data.ResourceId
      this.addFunForm.ContractFileName = data.OriginalResourceName
      // console.log(this.addFunForm.fileList)
      //当提交一张图片后隐藏上传按钮
      this.uploadBtnShowAndHide(undefined, 'none')
    },

    handleSuccess2(res) {
      let data = res.Data[0]
      this.funEditForm.ContractFileId = data.ResourceId
      this.funEditForm.ContractFileName = data.OriginalResourceName
      this.uploadBtnShowAndHide('uploadFileEdit', 'none')
    },

    handleRemove(file, fileList) {
      let vm = this
      vm.addFunForm.fileList = []
      vm.uploadBtnShowAndHide(undefined, '')
      // 删除服务器对应资源
      axios.delete(vm.deleteUrl, {
        data: vm.deleteData
      }).then(function(res) {
        if (res.data.State == 0) {
          // console.log(vm.addFunForm)
          vm.addFunForm.ContractFileId = ''
          vm.addFunForm.ContractFileName = ''
        }
      })
    },

    handleRemove2(file, fileList) {
      let vm = this
      vm.funEditForm.fileList = []
      vm.uploadBtnShowAndHide('uploadFileEdit', '')
      // 删除服务器对应资源
      axios.delete(vm.deleteUrl, {
        data: vm.deleteData2
      }).then(function(res) {
        if (res.data.State == 0) {
          // console.log(vm.addFunForm)
          vm.funEditForm.ContractFileId = ''
          vm.funEditForm.ContractFileName = ''
          console.log(vm.funEditForm)
        }
      })
    },

    //更新功能
    updateFun() {
      let vm = this
      let EndTime = vm.funEditForm.EndTime
      if (typeof EndTime !== 'string') {
        Date.prototype.format = FUNC.date.format
        EndTime = EndTime.format("yyyy-MM-dd hh:mm:ss")
      }
      let data = {
        AccessToken: vm.AccessToken,
        Parameters: {
          CompanyId: vm.funEditForm.CompanyId,
          FunctionId: vm.funEditForm.FunctionId,
          EndTime: EndTime,
          ContractNo: vm.funEditForm.ContractNo,
          ContractFileName: vm.funEditForm.ContractFileName,
          ContractFileId: vm.funEditForm.ContractFileId,
        }
      }
      // console.log(data)
      data = qs.stringify(data)
      axios.put(`${vm.saveUpdateFunUrl}`, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.$refs.uploadFileEdit.clearFiles()
          vm.uploadBtnShowAndHide('uploadFileEdit')
          vm.tableLoad(undefined, vm.PageIndex)
          vm.isShowEdit = false
          vm.$message.success('修改成功')
        }
      })
    },
    checkRowCompany(row){
      this.rowCompanyId = row.CompanyId
      // console.log(this.rowCompanyId)
      this.isShowMain = false
    },
    //修改表单提交
    submitEditForm() {
      this.updateFun()
    },

    //搜索应用名称
    searchKeyWord() {
      this.tableLoad(this.PageSize, this.PageIndex = 1, this.KeyWord)
    },
    deSearchKeyWord() {
      FUNC.debounce(this.timeId, this, 'searchKeyWord', [this.PageSize, this.PageIndex = 1, this.KeyWord])
      // this.tableLoad(this.PageSize, 1, this.KeyWord)
    },
    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      KeyWord = this.KeyWord) {
      let vm = this
      vm.loadingTable = true
      let url = this.getTenantFunctionListUrl;
      let params = {
        "AccessToken": this.AccessToken,
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          'KeyWord': KeyWord
        }
      }
      params = qs.stringify(params)
      url = `${url}?${params}`
      axios.get(url)
        .then(function(response) {
          let dataArr = response.data.Data
          vm.TotalData = dataArr.Total
          console.log(vm.TotalData)
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


    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证
        if (valid) {
          this.saveFun()
        } else {
          return false;
        }
      });
    },
    saveFun() {
      let vm = this
      let data = {
        AccessToken: vm.AccessToken,
        Parameters: {
          "CompanyId": vm.addFunForm.CompanyId, //公司ID
          "CompanyName": vm.addFunForm.CompanyName, //公司名
          "FunctionId": vm.addFunForm.FunctionId, //功能ID
          "FunctionName": vm.addFunForm.FunctionName, //功能名称
          "ApplicationId": vm.addFunForm.ApplicationId, //应用ID
          "ApplicationName": vm.addFunForm.ApplicationName, //应用名称
          "BeginTime": vm.addFunForm.BeginTime, //功能开通时间
          "EndTime": vm.addFunForm.EndTime, //功能截止时间  
          "ContractNo": vm.addFunForm.ContractNo, //合同编号
          "ContractFileName": vm.addFunForm.ContractFileName, //合同附件名称
          "ContractFileId": vm.addFunForm.ContractFileId //合同附件id
        }
      }
      // console.log(data)
      data = qs.stringify(data)
      axios.post(`${vm.saveFunUrl}`, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.$refs.uploadFile.clearFiles()
          vm.$refs.ruleForm.resetFields()
          vm.uploadBtnShowAndHide()
          vm.KeyWord = ''
          vm.tableLoad(undefined, 1)
          vm.resetForm()
          vm.dialogFormVisible = false
          vm.$message({
            showClose: true,
            message: '新增功能成功',
            type: 'success'
          });
        }
      })
    },
    //后台返回保存失败信息
    warningFromBE(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      });
    },
    //清空表单
    resetForm() {
      this.addFunForm = {
        CompanyId: "",
        CompanyName: "",
        FunctionId: "",
        FunctionName: "",
        ApplicationId: "",
        ApplicationName: "",
        BeginTime: "",
        EndTime: "",
        ContractNo: "",
        ContractFileName: "",
        ContractFileId: "",
        fileList: []
      }
    }


  },
  mounted: function() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    this.tableLoad()
    this.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(this.isOperate)
    this.setCompanyOptions()
  }
}

</script>

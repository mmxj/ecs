<style lang='less' scoped>
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
          <h3>应用管理</h3>
        </el-col>
        <el-col :span="2">
          <el-button class='mt20 mb10' size='small' v-show='!isShowMain' @click='isShowMain=!isShowMain'><i class="fa fa-mail-reply-all mr5"></i>返回 </el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <div v-show='!isShowMain&&isShowMore' class='detailBox'>
        <el-form :label-position="labelPosition" label-width="20%" :model="appDetail">
          <el-form-item label="应用代码：">
            <div class="el-form-item__content">{{appDetail.ApplicationCode}}</div>
          </el-form-item>
          <el-form-item label="应用名称：">
            <div class="el-form-item__content">{{appDetail.ApplicationName}}</div>
          </el-form-item>
          <el-form-item label="应用地址：">
            <div class="el-form-item__content">{{appDetail.ApplicationUrl}}</div>
          </el-form-item>
          <el-form-item label="应用图标：">
            <div class="el-form-item__content"><img :src="appDetail.ApplicationLogoUrl" alt="应用图标" v-show='appDetail.ApplicationLogoUrl' id='detailLogo' /></div>
          </el-form-item>
          <el-form-item label="应用版本：">
            <div class="el-form-item__content">{{appDetail.Version}}</div>
          </el-form-item>
          <el-form-item label="是否启用：">
            <div class="el-form-item__content">{{appDetail.IsActiveDisplay}}</div>
          </el-form-item>
          <el-form-item label="应用描述：">
            <div class="el-form-item__content">{{appDetail.ApplicationDescription}}</div>
          </el-form-item>
        </el-form>
      </div>
      <div v-show='isShowMain'>
        <el-row>
          <el-col :span='24'>
            <el-button size='small' type="primary" icon='plus' class='mb10 btn-2top' @click="showAddForm" v-show='isOperate.create'>新增</el-button>
            <span v-show='isOperate.query' class='mb10'>
            <span class="w200" @keyup='deSearchApplicationName'>
              <el-input size='small' v-model="ApplicationName" placeholder="应用名称" ></el-input>
            </span>
            <el-button size='small' type="primary" icon='search' class='mb10 btn-2top' @click='searchApplicationName'>查找</el-button>
            </span>
          </el-col>
        </el-row>
        <!-- <div class="clearfix mb10"></div> -->
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" v-loading="loadingTable" element-loading-text="努力加载中" style="width: 100%" class='userTable' stripe>
              <el-table-column type="index" label="序号" :width='65' align='center'>
              </el-table-column>
              <el-table-column prop="ApplicationCode" label="应用代码" align='center'>
              </el-table-column>
              <el-table-column prop="ApplicationName" label="应用名称" align='center'>
              </el-table-column>
              <el-table-column prop="ApplicationUrl" label="应用地址" align='center' min-width='150'>
              </el-table-column>
              <el-table-column prop="ApplicationDescription" label="应用描述" align='center'>
              </el-table-column>
              <el-table-column prop="Version" label="应用版本" align='center'>
              </el-table-column>
              <el-table-column prop="IsActiveDisplay" label="是否启用" align='center'>
              </el-table-column>
              <el-table-column label="操作" align='center' fixed='right'>
                <template scope="scope">
                  <el-button @click="seeMore(scope.row)" type="text" size="small"><i class="fa fa-eye" title="查看详情"></i></el-button>
                  <el-button type="text" size="small" v-show='isOperate.update' @click='editApp(scope.row)'><i class="el-icon-edit" title="编辑信息"></i></el-button>
                  <el-button type="text" size="small" v-show='isOperate.delete' @click="deleteConfirm(scope.row.ApplicationId)"><i class="el-icon-delete" title="删除信息"></i></el-button>
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
    </div>
    <el-dialog title="修改功能" :visible.sync="isShowEdit">
      <el-form :model="appEditForm" :rules="rules" ref="ruleEditForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="应用代码" prop="ApplicationCode">
          <el-input v-model="appEditForm.ApplicationCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="应用名称" prop="ApplicationName">
          <el-input v-model="appEditForm.ApplicationName"></el-input>
        </el-form-item>
        <el-form-item label="应用版本" prop="Version">
          <el-input v-model="appEditForm.Version"></el-input>
        </el-form-item>
        <el-form-item label="应用地址">
          <el-input v-model="appEditForm.ApplicationUrl"></el-input>
        </el-form-item>
        <el-form-item label="应用图标">
          <el-upload ref="updateUpload" :action="uploadImgUrl" list-type="picture-card" :data='uploadData' :on-success='updateImg' :on-remove="updateDeleteImg">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="appEditForm.ApplicationLogoUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="appEditForm.IsActive">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="功能描述">
          <el-input type="textarea" v-model="appEditForm.ApplicationDescription"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('ruleEditForm')">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增功能" :visible.sync="dialogFormVisible">
      <el-form :model="appForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="应用代码" prop="ApplicationCode">
          <el-input v-model="appForm.ApplicationCode"></el-input>
        </el-form-item>
        <el-form-item label="应用名称" prop="ApplicationName">
          <el-input v-model="appForm.ApplicationName"></el-input>
        </el-form-item>
        <el-form-item label="应用版本" prop="Version">
          <el-input v-model="appForm.Version"></el-input>
        </el-form-item>
        <el-form-item label="应用地址">
          <el-input v-model="appForm.Url"></el-input>
        </el-form-item>
        <el-form-item label="应用图标">
          <el-upload  ref="addUpload" :action="uploadImgUrl" list-type="picture-card" :data='uploadData' :on-success='handleSuccess' :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="appForm.IsActive">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="功能描述">
          <el-input type="textarea" v-model="appForm.Description"></el-input>
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
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const DELETE = AXIOS.delete
const PUT = AXIOS.put
const URL = Common.Const.url
export default {
  data() {
    return {
      timeId: null,
      //编辑应用相关
      isShowEdit: false,
      appEditForm: {},


      //应用详细内容
      appDetail: {},
      labelPosition: 'right',
      isShowMore: false,

      //操作权限相关
      isOperate: {},

      //加载表格相关
      isShowMain: true,
      loadingTable: true,
      AccessToken: '',
      PageSize: 10,
      TotalData: undefined,
      PageIndex: 1,
      ApplicationName: '',
      tableData: [],

      dialogImageUrl: '',
      dialogVisible: false,

      //新增应用表单入参
      appForm: {
        ApplicationCode: '',
        ApplicationName: '',
        Url: '',
        Logo: '',
        Description: '',
        Version: '',
        IsActive: 1
      },

      //新增应用表单的验证规则
      rules: {
        ApplicationCode: [
          { required: true, message: '应用代码不能为空', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ApplicationName: [
          { required: true, message: '应用名称不能为空', trigger: 'blur' }
        ],
        Version: [
          { required: true, message: '应用版本不能为空', trigger: 'blur' }
        ]
      },

      dialogFormVisible: false,


      //上传图片url
      uploadImgUrl:URL.UPLOADRESOURCE,

      //删除图片url
      deleteImgUrl:URL.DELETERESOURCE,
      //保存应用地址url
      saveAppUrl:URL.INSERTAPPLICATION,

      //更新应用地址url
      saveUpdateAppUrl:URL.UPDATEAPPLICATION,

      //删除应用条目url
      deleteAppUrl:URL.DELETEAPPLICATION
    }
  },
  computed: {
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.TotalData)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.TotalData)
    },
    //上传图片资源时的附加参数
    uploadData() {
      return {
        "AccessToken": this.AccessToken,
        "ResourceType": "4",
        "Title": "应用Logo",
        "Description": "应用Logo"
      }
    },
    //删除图片资源的附加参数
    deleteData() {
      return {
        "AccessToken": this.AccessToken,
        "Parameters": {
          "ResourceId": this.appForm.Logo,
          "ResourceType": "4"
        }
      }
    },
    deleteUpdateData() {
      return {
        "AccessToken": this.AccessToken,
        "Parameters": {
          "ResourceId": this.appEditForm.Logo,
          "ResourceType": "4"
        }
      }
    }
  },
  methods: {
    showAddForm() {
      let vm = this
      vm.dialogFormVisible = true
      vm.resetForm()
    },
    //删除应用
    deleteConfirm(id) {
      let vm = this
      vm.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          AccessToken: this.AccessToken,
          Parameters: {
            ApplicationId: id
          }
        }
        DELETE(this.deleteAppUrl,data).then(function(res) {
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


    //编辑应用
    editApp(row) {
      this.appEditForm = { ...row }
      this.appEditForm.Logo = row.ApplicationLogo
      this.appEditForm.ApplicationLogoUrl = row.ApplicationLogoUrl
      // console.log(this.appEditForm)
      this.isShowEdit = true
    },

    //更新图片
    //控制图片上传的继续添加按钮隐藏和显示
    imgUpdateUploadShowAndHide(string='') {
      let el = this.$refs['updateUpload'].$el.childNodes[1]
      el.style.display = string;
    },

    // updateImg(res,file,fileList) {
    updateImg(res) {
      //当提交一张图片后隐藏上传按钮
      this.imgUpdateUploadShowAndHide('none')
      this.appEditForm.Logo = res.Data[0].ResourceId
    },
    updateDeleteImg(res) {
      //当删除图片后重新显示上传按钮
      let vm = this
      vm.imgUpdateUploadShowAndHide('')

      // 删除服务器的图片资源
      DELETE(this.deleteImgUrl, this.deleteUpdateData).then(function(res) {
        // 成功删除图片后清空Logo url
        if (res.data.State == 0) {
          vm.appEditForm.Logo = ''
        }
      })
    },

    //更新应用
    saveUpdateApp() {
      let vm = this
      /*let data = {
        AccessToken:vm.AccessToken,
        Parameters:vm.appEditForm
      }*/
      // console.log(vm.appEditForm)
      let data = {
        AccessToken: vm.AccessToken,
        Parameters: {
          ApplicationId: vm.appEditForm.ApplicationId,
          ApplicationName: vm.appEditForm.ApplicationName,
          Url: vm.appEditForm.ApplicationUrl,
          Logo: vm.appEditForm.Logo,
          Description: vm.appEditForm.ApplicationDescription,
          Version: vm.appEditForm.Version,
          IsActive: vm.appEditForm.IsActive,
        }
      }
      // console.log(data)
      PUT(vm.saveUpdateAppUrl, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.$refs.updateUpload.clearFiles()
          vm.imgUpdateUploadShowAndHide()
          vm.tableLoad(undefined, vm.PageIndex)
          vm.isShowEdit = false
        }
      })
    },

    //修改表单提交
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证
        if (valid) {
          this.saveUpdateApp()
        } else {
          return false;
        }
      });
    },

    //查看更多
    seeMore(row) {
      // console.log(row)
      this.isShowMain = false
      this.isShowMore = true
      this.appDetail = row
    },
    //搜索应用名称
    searchApplicationName() {
      this.tableLoad(this.PageSize, this.PageIndex = 1)
    },
    deSearchApplicationName() {
      FUNC.debounce(this.timeId, this, 'searchApplicationName')
    },
    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      ApplicationName = this.ApplicationName) {
      let vm = this
      vm.loadingTable = true
      let url = URL.QUERYAPPLICATION;
      let params = {
        "AccessToken": this.AccessToken,
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          'ApplicationName': ApplicationName
        }
      }
      GET(url,params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)){
            let dataArr = res.Data
            if (dataArr.Total) {
              vm.TotalData = dataArr.Total
              vm.reload(dataArr.Result)
            }else{
              vm.TotalData = 0
              vm.reload([])
            }
            vm.loadingTable = false
          }
        })
        .catch(function(error) {
          console.log(`${error.message}`)
        });
    },
    pageIndexChange(val) {
      this.PageIndex = val
      this.tableLoad(this.PageSize, this.PageIndex, this.ApplicationName)
    },
    reload(dataArr) {
      for (let item of dataArr) {
        item.IsActiveDisplay = item.IsActive == 1 ? '是' : '否'
      }
      this.tableData = dataArr
    },

    //控制图片上传的继续添加按钮隐藏和显示
    imgAddUploadShowAndHide(string='') {
      let el = this.$refs['addUpload'].$el.childNodes[1]
      el.style.display = string;
    },

    //图片上传
    handleSuccess(res) {
      //当提交一张图片后隐藏上传按钮
      this.imgAddUploadShowAndHide('none')
      this.appForm.Logo = res.Data[0].ResourceId
    },
    handleRemove(res) {
      //当删除图片后重新显示上传按钮
      let vm = this
      vm.imgAddUploadShowAndHide('')

      // 删除服务器的图片资源
      DELETE(this.deleteImgUrl,this.deleteData).then(function(res) {
        // 成功删除图片后清空Logo url
        if (res.data.State == 0) {
          vm.appForm.Logo = ''
        }
      })
    },

    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证
        if (valid) {
          this.saveApp()
        } else {
          return false;
        }
      });
    },
    saveApp() {
      let vm = this
      let data = {
        AccessToken: vm.AccessToken,
        Parameters: vm.appForm
      }
      POST(vm.saveAppUrl, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.$refs.addUpload.clearFiles()
          vm.imgAddUploadShowAndHide()
          vm.ApplicationName = ''
          vm.tableLoad(undefined, 1)
          vm.resetForm()
          vm.dialogFormVisible = false
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
      this.appForm = {
        ApplicationCode: '',
        ApplicationName: '',
        Url: '',
        Logo: '',
        Description: '',
        Version: '',
        IsActive: 1
      }
    }


  },
  mounted: function() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    this.tableLoad()
    this.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(this.isOperate)

  }
}

</script>

<style lang='scss' scoped>
.colorSpan {
  line-height: 20px
}

.el_mainContent {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
}

.el_content {
  padding: 15px;
  overflow-y: auto;
  width: 100%;
}

</style>
<template>
  <div class='el_mainContent' v-loading="loading">
    <div class="el_content" element-loading-text="努力加载中" style="height: calc(100% - 40px);position: static;padding-top: 10px">
      <div v-if='true'>
        <el-row class='border-1px'>
          <el-col :span="22">
            <h3>巡检模板列表</h3>
          </el-col>
          <el-col :span="2" class='tar'>
            <el-button class='mb5' size='small' @click='goBack'>
              <i class="fa fa-mail-reply-all mr5"></i>返回
            </el-button>
          </el-col>
        </el-row>
        <div class="hr mb10"></div>
      </div>
      <div>
        <el-row v-show='isOperate.query'>
          <el-col :span='24'>
            <el-button size='small' type="primary" icon='plus' class='mb10 btn-2top' @click="showAddForm" v-show='isOperate.create'>新增</el-button>
            <span class="w200" @keyup='deSearch'>
              <el-input size='small' v-model="KeyWords" placeholder="品牌/种类/型号关键字" ></el-input>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" style="width: 100%" class='userTable' stripe>
              <el-table-column type="index" label="序号" width='65' align='center'></el-table-column>
              <el-table-column prop="BrandName" label="设备品牌" align='center'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.BrandName">{{scope.row.BrandName}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="TypeName" label="设备种类" align='center'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.TypeName">{{scope.row.TypeName}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="EquipmentClassName" label="设备型号" align='center'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.EquipmentClassName">{{scope.row.EquipmentClassName}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" align='center'>
                <template scope="scope">
                  <el-button @click="seeMore(scope.row.ModuleResourceId)" type="text" size="small" class='ml5'><i class="fa fa-eye" title="预览模板导入效果"></i></el-button>
                  <el-button @click="download(scope.row.ModuleResourceUrl)" type="text" size="small" class='ml5'><i class="fa fa-download" title="下载模板"></i></el-button>
                  <el-button type="text" size="small" @click="deleteConfirm(scope.row.PollingModuleId)"><i class="fa fa-trash-o" title="删除模板"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
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
        <el-dialog title="模板导入效果预览" :visible.sync="dialogFormVisible2">
          <div class="htmlview" v-html='htmlview' v-loading='loadingView'></div>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogFormVisible2 = false">取 消</el-button> -->
            <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
          </div>
        </el-dialog>
        <el-dialog title="新增模板" :visible.sync="dialogFormVisible">
          <el-form :model="addForm" :rules="rules" ref="addForm" label-width="150px" class="demo-ruleForm">
            <el-form-item label="设备型号：" prop="EquipmentClassId">
              <el-cascader expand-trigger="hover" class='w100p' :options="EquipmentClassIdOpts" v-model="addForm.EquipmentClassId">
              </el-cascader>
            </el-form-item>
            <el-form-item label="上传模板：" prop="ModuleResourceId" style='position: relative;'>
              <el-input v-model="addForm.ModuleResourceId" class="w300" v-show='false'></el-input>
              <el-upload class="upload-demo w300" :action="uploadResUrl" :data='uploadData' :multiple='false' :on-success="handleSuc" :on-remove="handleRemove" :file-list="addForm.fileList" :before-upload="beforeImgUpload">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
              <span style="font-size: 12px;float: left;position: absolute;top: 0;left: 80px;color: #1ABC9C;font-weight: bold;">请选择office 97-2003后缀为.xls的文件作为模板</span>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitForm('addForm')">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const PUT = AXIOS.put
const DELETE = AXIOS.delete
const URL = Common.Const.url
const Vlidator = Common.Func.validator
export default {
  data() {
    return {
      loadingView: true,
      timeId: null,
      addForm: {
        EquipmentClassId: [],
        ModuleResourceId: '',
        fileList: []
      },
      EquipmentClassIdOpts: [],
      dialogFormVisible: false,
      dialogFormVisible2: false,
      htmlview: '',
      //表单的验证规则
      rules: {
        EquipmentClassId: [
          { required: true, validator: Vlidator.classIdArr, trigger: 'change' },
        ],
        ModuleResourceId: [
          { required: true, message: '请上传模板文件', trigger: 'change' },
        ],
      },
      uploadResUrl: URL.UPLOADRESOURCE, //上传资源url
      //操作权限相关
      isOperate: {},

      //加载表格相关
      loading: false,
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      KeyWords: "", //搜索关键字

      tableData: [],

    }
  },
  computed: {
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.Total)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.Total)
    },
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ResourceType": "0",
        "Title": "附件",
        "Description": "附件"
      }
    }
  },
  methods: {
    showAddForm() {
      let vm = this
      vm.setEquipmentClassIdOpts()
      vm.dialogFormVisible = true
      vm.resetForm()
    },
    deSearch() {
      FUNC.debounce(this.timeId, this, 'search')
    },
    download(url) {
      window.location.href = url
    },
    //清空表单
    resetForm() {
      let vm = this
      let el = vm.$refs.addForm
      if (el) {
        el.resetFields()
      }
      let EquipmentClassId = []
      /*if (vm.propsData) {
        EquipmentClassId = vm.propsData.EquipmentClassId || ''
      }*/
      vm.addForm = {
        EquipmentClassId,
        ModuleResourceId: '',
        fileList: [],
      }
    },
    seeMore(ResourceId) {
      let vm = this;
      vm.dialogFormVisible2 = true
      vm.loadingView = true
      let param = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters: {
          ResourceId
        }
      };
      POST(URL.GETPOLLINGMODULEHTML, param)
        .then(function(response) {
          vm.loadingView = false
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.htmlview = data
            // console.log(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //删除报告
    deleteConfirm(id) {
      let vm = this
      vm.$confirm('此操作将永久删除该模板, 如果该模板已被关联使用, 将无法删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          AccessToken: FUNC.storage.get("AccessToken"),
          Parameters: {
            PollingReportModuleId: id
          }
        }
        POST(URL.DELETEPOLLINGREPORTMODULE, data).then(function(res) {
          // 成功删除后提示用户
          if (res.data.State == 0) {
            vm.$message({
              type: 'success',
              // type: 'info',
              message: '删除成功!'
            });
            vm.tableLoad(undefined, vm.PageIndex)
          }else{
            vm.$message.error(res.data.Message)
            vm.tableLoad(undefined, vm.PageIndex)
          }
        })

      })
    },
    //删除模板关联设备
    deleteRelatedEquipment(id) {
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters: {
          PollingReprortId: id
        }
      }
      POST(URL.DELETEPOLLINGREPORTCONFIG, data).then(function(res) {
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
    },
    beforeImgUpload(file) {
      const isLt3M = file.size / 1024 / 1024 < 3;
      // console.log(isLt3M)
      if (!isLt3M) {
        this.$message.error('模板文件大小不能超过 3MB!');
        return false
      }
    },
    //资源上传
    handleSuc(response, file, fileList) {
      if (fileList.length > 1) {
        this.handleRemove()
      }
      this.addForm.fileList = fileList.slice(-1);
      if (file.response) {
        // console.log(file.response.Data[0])
        this.addForm.ModuleResourceId = file.response.Data[0].ResourceId
        // console.log(this.addForm.resMd5,'change')
      }
    },
    handleRemove(file, fileList) {
      // console.log(file)
      if (!this.addForm.fileList[0]) return
      let vm = this
      vm.addForm.ModuleResourceId = ''
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
    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证
        if (valid) {
          this.saveForm()
        } else {
          return false;
        }
      });
    },
    saveForm() {
      let vm = this
      let add = vm.addForm
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters: {
          "EquipmentClassId": add.EquipmentClassId[2], //设备型号ID
          "ModuleResourceId": add.ModuleResourceId, //模板文件资源ID
        }
      }
      POST(URL.SETPOLLINGMODULE, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.$message.warning(res.data.Message)
          return false
        } else {
          vm.tableLoad(undefined, 1)
          vm.dialogFormVisible = false
        }
      })
    },
    //获取型号列表(新增用)
    setEquipmentClassIdOpts() {
      let vm = this
      let url = URL.EQUIPMENTCLASSINFO
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        IsAll: 0
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let json = vm.formatJson(res.Data)
            vm.EquipmentClassIdOpts = json
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //把后台返回的数据格式成组件可用的数据格式
    formatJson(json) {
      let index = 0
      let keyName = 'label'
      for (let i of json) {
        i.value = i.BrandName
        if ('Items' in i) {
          for (let j of i.Items) {
            j.value = j.TypeName
          }
        }
      }
      json = JSON.stringify(json)
      json = json.replace(/BrandName/g, keyName)
      json = json.replace(/TypeName/g, keyName)
      json = json.replace(/ClassName/g, keyName)
      json = json.replace(/Items/g, 'children')
      json = json.replace(/ClassId/g, 'value')
      json = JSON.parse(json)
      return json
    },
    goBack() {
      this.$router.go(-1)
    },

    //搜索预警告警条目
    search() {
      let vm = this
      vm.tableLoad(vm.PageSize, vm.PageIndex = 1)
    },

    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      KeyWords = this.KeyWords) {
      let vm = this
      vm.loading = true

      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        PageSize,
        PageIndex,
        KeyWords
      }
      let url = URL.GETPOLLINGMODULELIST //获取巡检模板列表

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
              vm.Total = Number(Total)
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
    pageIndexChange(val) {
      this.PageIndex = val
      this.tableLoad(this.PageSize, this.PageIndex)
    },
    reload(dataArr) {
      this.tableData = dataArr
    },
  },
  mounted: function() {
    let vm = this
    vm.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(vm.isOperate)
    vm.tableLoad()
  },
  watch: {
    /*propsData() {
      this.isHasPropsData()
      this.tableLoad()
    },*/
  }
}

</script>

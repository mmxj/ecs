<style lang='less' scoped>
.dialog-footer {
  text-align: right;
  margin-top: 40px;
  margin-bottom: -10px;
}

.fileTip {
  color: #ff4949;
  font-size: 12px;
  margin-top: -5px;
}

</style>
<template>
  <div>
    <el-row>
      <el-col :span='24'>
        <el-form label-width="200px" class="demo-ruleForm">
          <el-form-item label="网关型号：">
            <el-select v-model="editForm.GatewayModel" class="w300" disabled>
              <el-option v-for="item in GatewayModelOpts" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="程序类型：">
            <el-select v-model="editForm.ProgramType" class="w300" disabled>
              <el-option v-for="item in ProgramTypeOpts" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="升级方式：">
            <el-select v-model="editForm.UpgradeWay" class="w300" disabled>
              <el-option v-for="item in UpgradeWayOpts" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="版本号：">
            <el-input v-model="editForm.ProgramVersion" class="w300" disabled></el-input>
          </el-form-item>
          <el-form-item label="程序描述：">
            <el-input type="textarea" v-model="editForm.Description" class="w300"></el-input>
          </el-form-item>
          <el-form-item label="上传文件：">
            <!-- <el-input v-model="editForm.ProgramFiles" class="w300" v-show='false'></el-input> -->
            <el-upload class="upload-demo w300" :action="uploadResUrl" :data='uploadData' :multiple='false' :on-change="handleChange" :on-remove="handleRemove" :file-list="editForm.fileList" :before-upload="setFileMd5">
              <el-button size="small" type="primary">点击上传</el-button>
              <transition name="el-zoom-in-top">
                <div slot="tip" v-show='isHasFile' class='fileTip'>请上传程序附件</div>
              </transition>
            </el-upload>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <div class="dialog-footer">
      <el-button @click="closeEditDia">关 闭</el-button>
      <el-button type="primary" @click="submitEditForm">确 定</el-button>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
import md5 from 'browser-md5-file'
const FUNC = Common.Func
const Vlidator = FUNC.validator
const AXIOS = FUNC.axios
const DELETE = AXIOS.delete
const PUT = AXIOS.put
const URL = Common.Const.url
const OPTS = Common.Const.options
export default {
  props: ['currentRow', 'isShowEditDialog', 'tableLoad',],
  data() {
    return {
      isHasFile: false,
      editForm: {
        FileId: '',
        GatewayModel: '',
        ProgramType: '',
        UpgradeWay: '',
        ProgramVersion: '',
        Description: '',
        ProgramFiles: '',
        localMd5: '',
        resMd5: '',        
        fileList: [{ name: '', url: '' }]
      },
      ProgramTypeOpts: OPTS.PROGRAMTYPOPTIONS,
      GatewayModelOpts: OPTS.GATEWAYMODELOPTIONS,
      UpgradeWayOpts: OPTS.UPGRADEWAYOPTIONS,
      updateUrl: URL.UPDATEGATEWAYPROGRAM, //修改网关url
      uploadResUrl: URL.UPLOADGRIDFS, //上传资源url
      deleteResUrl: URL.DELETEGRIDFS, //删除资源url
    }
  },
  watch: {
    currentRow() {
      this.init()
    }
  },
  computed: {
    //上传资源时的附加参数
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ResourceType": "4",
        "Title": "附件",
        "Description": "附件"
      }
    },
  },
  methods: {
    setFileMd5(file){
      let vm = this
      md5(file, function (err, md5) {
        vm.editForm.localMd5 = md5
          // console.log(vm.addForm.localMd5)
      });
    },    
    updateGateway() {
      let vm = this
      let url = vm.updateUrl
      let edit = vm.editForm
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "FileId": edit.FileId,
        "GatewayModel": edit.GatewayModel,
        "ProgramType": edit.ProgramType,
        "UpgradeWay": edit.UpgradeWay,
        "ProgramVersion": edit.ProgramVersion,
        "ProgramFiles": [edit.ProgramFiles],
        "Description": edit.Description,
        "CheckCode": edit.localMd5
      }
      PUT(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.$message.success('修改网关成功')
            vm.closeEditDia()
            vm.tableLoad()
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    closeEditDia() {
      this.$emit('update:isShowEditDialog', false)
    },
    //资源上传
    handleChange(file, fileList) {
      if (fileList.length > 1) {
        this.handleRemove(file, fileList)
      }
      this.editForm.fileList = fileList.slice(-1);
      if (file.response !== undefined) {
        this.editForm.ProgramFiles = file.response.Data[0].ResourceId
        this.editForm.resMd5 = file.response.Data[0].CheckCode
        console.log(this.editForm.resMd5,this.editForm.localMd5)
        this.isHasFile = false
        // console.log(this.editForm.ProgramFiles)
      }
    },
    handleRemove(file, fileList) {
      let vm = this
      vm.editForm.ProgramFiles = ''
      if (file.response !== undefined) {
        vm.deleteRes(file.response.Data[0].ResourceId)
      }
    },
    deleteRes(resId) {
      let vm = this
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "ResourceId": resId,
          "ResourceType": "4"
        }
      }
      let url = vm.deleteResUrl
      // 删除服务器对应资源
      DELETE(url, data)
        .then(function(res) {
          if (res.data.State == 0) {

          }
        })
    },
    handleExceed(files, fileList) {
      this.$message.warning('只能上传 1 个附件');
    },
    submitEditForm() {
      let vm = this
      if (vm.editForm.ProgramFiles == '') {
        vm.isHasFile = true
        return false
      }
      // console.log(vm.editForm.localMd5,vm.editForm.resMd5)
      if (vm.editForm.localMd5!==vm.editForm.resMd5) {
        console.log(vm.editForm.localMd5,vm.editForm.resMd5)
        vm.$message.warning('上传文件有误,请重新上传!')
        return false
      }      
      vm.updateGateway()
    },
    init() {
      this.isHasFile = false
      this.editForm.FileId = String(this.currentRow.FileId)
      this.editForm.GatewayModel = String(this.currentRow.GatewayModel)
      this.editForm.ProgramType = this.currentRow.ProgramType
      this.editForm.UpgradeWay = String(this.currentRow.UpgradeWay)
      this.editForm.ProgramVersion = this.currentRow.ProgramVersion
      this.editForm.Description = this.currentRow.Description
      this.editForm.ProgramFiles = this.currentRow.ProgramFiles.slice(2, -2)
      this.editForm.resMd5 = this.currentRow.CheckCode
      this.editForm.localMd5 = this.currentRow.CheckCode
      this.editForm.fileList = [{
        name: this.currentRow.FileOrgName,
        url: this.currentRow.FileUrl
      }]
      // console.log(this.editForm.ProgramFiles)
    }
  },
  mounted: function() {
    this.init()
  },
}

</script>

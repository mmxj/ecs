<template>
  <!-- 服务详细信息页面组件 -->
  <div class='contentWrap'>
    <div class="contentBox detailDiv">
      <el-row class='border-1px'>
          <el-col :span="14">
            <el-form ref="insertForm" :model="insertForm" :rules="rules" label-width="150px">
              <el-form-item label="请选择项目" prop="ProjectId">
                <el-select v-model="insertForm.ProjectId"  @change='changeEquipmentOpts' filterable placeholder="项目名称" class='w100p' :disabled='hasProjectId'>
                  <el-option
                      v-for="(item, index) in projectOptsBeSet"
                      :key="index"
                      :label="item.ProjectName"
                      :value="item.ProjectId">
                    </el-option>
                </el-select >
              </el-form-item>
              <el-form-item label="请选择设备" prop="EquipmentId">
                <el-select v-model="EquipmentId" filterable placeholder="设备名称" class='w100p' :disabled='hasEquipmentId'>
                  <el-option
                      v-for="(item, index) in equipments"
                      :key="index"
                      :label="item.EquipmentName"
                      :value="item.EquipmentId">
                    </el-option>
                </el-select >
              </el-form-item>
              <el-form-item label="选择服务类别" prop="ServiceType">
                <el-select v-model="insertForm.ServiceType" filterable placeholder="服务类型" class='w100p'>
                  <el-option
                      v-for="item in ServiceTypeOpts"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择服务人员" prop="treeCheckedId">
                <el-select v-show='isShowtreeCheckedIdSel' disabled v-model="insertForm.treeCheckedId" multiple placeholder="请选择" class='w100p mb10'>
                  <el-option
                    v-for="item in insertForm.TechniciansList"
                    :key="item.AccountId"
                    :label="item.UserName"
                    :value="item.AccountId">
                  </el-option>
                </el-select>                
                <el-button type="primary" @click='openTechniciansList'>服务人员列表</el-button>
              </el-form-item>
              <el-form-item label="服务内容" prop="ServiceContent">
                <el-input type="textarea" v-model="insertForm.ServiceContent"></el-input>
              </el-form-item>
            </el-form>            
          </el-col>
      </el-row>
    <!-- 新增功能表单 -->
    <el-dialog title="请选择服务人员" :visible.sync="dialogFormVisible">
      <el-row class='border-1px'>
          <el-col :span="14" class='treeCol'>
            <el-tree
              :data="techniciansList"
              show-checkbox
              node-key="id"
              ref="tree"
              @check-change='treeChange'
              :default-expanded-keys="techniciansListDefaultOpen"
              :props="techniciansListDefaultProps">
            </el-tree>
          </el-col>
          <el-col :span="10" class='pl10'>
            <el-table
              stripe
              :data="treeCheckedNodes"
              style="width: 100%">
              <el-table-column
                prop="name"
                label="已选择人员">
              </el-table-column>
            </el-table>
          </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitTechniciansForm()">保 存</el-button>
      </div>      
    </el-dialog>
    </div>
    <div class="contentBox detailDiv">
      <el-row class='border-1px'>
        <el-col :span="14" class='pl10'>
          <el-form ref="insertForm2" :model="insertForm" :rules="rules" label-width="150px">
            <el-form-item label="开始及结束时间" prop="timeRange">
              <el-date-picker
                class='w100p'
                v-model="insertForm.timeRange"
                type="datetimerange"
                range-separator="  至  "
                placeholder="选择申请时间范围">
              </el-date-picker>
            </el-form-item>
          </el-form>  
        </el-col>
      </el-row>
    </div>
    <div class="contentBox detailDiv">
      <el-row class='border-1px'>
        <el-col :span="14" class='pl10'>
          <el-form ref="insertForm3" :model="insertForm" :rules="rules" label-width="150px">
            <el-form-item label="工作摘要" prop="JobSummary">
              <el-input type="textarea" v-model="insertForm.JobSummary"></el-input>
            </el-form-item>
            <el-form-item label="合同编号">
              <el-input v-model="insertForm.ContractNo"></el-input>
            </el-form-item>
            <el-form-item label="合同文件">
              <el-upload class="upload-demo w300" ref="contractFileUpload" :action="uploadUrl" :data='uploadData' 
              :multiple='false' 
              :on-success='handleSuccessContractFile' 
              :on-remove="handleRemoveContractFile" 
              :file-list="insertForm.ContractFileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip"><!-- 上传合同附件相关文件或压缩包 --></div>
              </el-upload>
            </el-form-item>
            <el-form-item label="清单文件">
             <el-upload class="upload-demo w300" ref="workOrderFileUpload" :action="uploadUrl" :data='uploadData' :multiple='false' :on-success='handleSuccessWorkOrderFile' :on-remove="handleRemoveWorkOrderFile" :file-list="insertForm.WorkOrderFileList">
               <el-button size="small" type="primary">点击上传</el-button>
               <div slot="tip" class="el-upload__tip"><!-- 上传合同附件相关文件或压缩包 --></div>
             </el-upload>
            </el-form-item>
            <el-form-item label="维修前照片">
             <el-upload ref="OriginalPhotosUpload" :action="uploadUrl" list-type="picture-card" :data='uploadData' :on-success='updateImg' :on-remove="updateDeleteImg" limit='3'>
               <i class="el-icon-plus"></i>
             </el-upload>
            </el-form-item>
            <el-form-item label="维修后照片">
             <el-upload ref="FinishedPhotosUpload" :action="uploadUrl" list-type="picture-card" :data='uploadData' :on-success='updateImg2' :on-remove="updateDeleteImg2" limit='3'>
               <i class="el-icon-plus"></i>
             </el-upload>
            </el-form-item>
             <!-- <el-dialog v-model="imgDialogVisible" size="tiny">
               <img width="100%" :src="imgDialogUrl" alt="">
             </el-dialog> -->
          </el-form>  
        </el-col>
      </el-row>
    </div>
    <div class="contentBox bd0">
      <el-row>
        <el-col :span="14" class='pl10'>
          <el-form ref="insertForm3" :model="insertForm" :rules="rules" label-width="150px">
            <el-form-item>
              <el-button type="primary" @click="submitInsertForm()">确认</el-button>
            </el-form-item>            
          </el-form>  
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const FUNC = Common.Func
const Vlidator = FUNC.validator
const GET = Common.Func.axios.get
const POST = Common.Func.axios.post
const DELETE = Common.Func.axios.delete
const OPTS = Common.Const.options
export default {
  data: function() {
    return {
      hasProjectId:false,
      hasEquipmentId:false,
      imgDialogUrl:'',
      imgDialogVisible: false,
      isShowtreeCheckedIdSel:false,
      treeCheckedNodes:[],
      dialogFormVisible: false,
      isAlreadySetTechniciansList:false,
      techniciansList:[],
      techniciansListDefaultOpen:[],
      techniciansListDefaultProps: {
        children: 'children',
        label: 'name'
      },
      ServiceTypeOpts: OPTS.SERVICETYPEOPTIONS,
      insertForm:{
        ProjectId:'',
        ServiceType:'',
        TechniciansList:[],
        ServiceContent:'',
        treeCheckedId:[],
        timeRange: [],
        ContractNo:'',
        JobSummary:'',
        ContractFileList:[],
        ContractFileId:'',
        ContractFileName:'',
        WorkOrderFileList:[],
        WorkOrderFileId:'',
        WorkOrderFileName:'',
        OriginalPhotosList:[],
        FinishedPhotosList:[],
      },
      //设备数据
      equipments:[],
      equipmentListUrl:URL.EQUIPMENT,
      EquipmentId:'',
      rules: {
        ProjectId: [
          { type: 'string', required: true, message: '项目不能为空', trigger: 'change' }
        ],
        ServiceType: [
          { type: 'number', required: true, message: '服务类别不能为空', trigger: 'change' }
        ],
        ServiceContent: [
          { required: true, message: '服务内容不能为空', trigger: 'blur' },
        ],
        timeRange: [
          { type: 'array', required: true, message: '时间范围不能为空', trigger: 'change' },
        ],
        treeCheckedId: [
          { type: 'array', required: true, message: '服务人员不能为空', trigger: 'change' }
        ],
      },
      insertOrderUrl: URL.INSERTSERVICEORDER,
      organizationUrl: URL.ORGANIZATION,
      uploadUrl: URL.UPLOADRESOURCE, //上传资源url
      deleteUrl: URL.DELETERESOURCE, //删除资源url
    }
  },
  props: {
    projectOpts:[Array],
    showWhichTab:[Number,String],
    propsData:[Object]
  },
  methods:{
  	changeEquipmentOpts() {
      this.getEuipmentDatas()
      this.EquipmentId = ''
    },
		getEuipmentDatas() {
 				let vm = this
	      if (vm.insertForm.ProjectId=='') {
	        vm.equipments = []
	        return false
	      }
	      let data = {
	        AccessToken: FUNC.storage.get("AccessToken"),
	        Parameters: {
	          ProjectId: vm.insertForm.ProjectId,
	        }
	      }
	      let url = vm.equipmentListUrl
	      GET(url, data)
	        .then(function(response) {
	          let res = response.data
	          if (FUNC.checkCode(res.State, res.Message)) {
	            vm.equipments = res.Data.Result;
            if(vm.propsData.EquipmentId) vm.EquipmentId=vm.propsData.EquipmentId;
	          }
	
	        })
	        .catch(function(error) {
	          console.log(error.message)
	        });
			},
    //控制图片上传的继续添加按钮隐藏和显示
    imgUpdateUploadShowAndHide(ref='OriginalPhotosUpload',string='') {
      let el = this.$refs[ref].$el.childNodes[1]
      el.style.display = string;
    },
    updateImg(res, file, fileList) {
      //当提交一张图片后隐藏上传按钮
      if (fileList.length>=3) this.imgUpdateUploadShowAndHide('OriginalPhotosUpload','none')
      // console.log(fileList)
      // console.log(res.Data.length)
    },
    updateDeleteImg(res, fileList) {
      //当删除图片后重新显示上传按钮
      let vm = this
      if (fileList.length<3) vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload','')
      vm.deleteImg(res)
    },
    updateImg2(res, file, fileList) {
      if (fileList.length>=3) this.imgUpdateUploadShowAndHide('FinishedPhotosUpload','none')
    },
    updateDeleteImg2(res, fileList) {
      //当删除图片后重新显示上传按钮
      let vm = this
      if (fileList.length<3) vm.imgUpdateUploadShowAndHide('FinishedPhotosUpload','')
      vm.deleteImg(res)
    },
    deleteImg(res){
      let vm = this
      // console.log(res)
      let fileName = res.name
      for (let item of res.response.Data) {
        if (fileName==item.OriginalResourceName) {
          vm.deleteRes(item.ResourceId).then(function(res) {
            if (res.data.State == 0) {
              // vm.insertForm.Logo = ''
            }
          })
        }
      }
    },
    submitTechniciansForm(){
      if (this.insertForm.TechniciansList.length==0) {
        this.$message({
              type: 'warning',
              message: `请选择服务人员`
            })
        return false
      }
      let treeCheckedId = []

      for (let item of this.$refs.tree.getCheckedNodes()) {
        if (!item.children) {
          treeCheckedId.push(item.id)
        }
      }
      this.isShowtreeCheckedIdSel = true
      this.insertForm.treeCheckedId = treeCheckedId
      this.dialogFormVisible = false
    },
    treeChange(){
      let tempNodes = []
      let tempKeys = []

      for (let item of this.$refs.tree.getCheckedNodes()) {
        if (!item.children) {
          tempNodes.push(item)
          tempKeys.push({
            UserName:item.name,
            AccountId:item.id
          })
        }
      }
      // console.log(tempNodes)
      this.treeCheckedNodes = tempNodes
      this.insertForm.TechniciansList = tempKeys
      // console.log(this.insertForm.TechniciansList)
    },
    openTechniciansList(){
      let vm = this
      vm.dialogFormVisible=true
      if (!vm.isAlreadySetTechniciansList) {
        vm.setTechniciansList()
      }
    },
    setTechniciansList() {
      let vm = this
      let url = vm.organizationUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters:{
          Type:3
        }
      }
      GET(url,data)
        .then(function(response) {
          let res = response.data.Data
          // vm.projectOpts = res.Result
          let result = FUNC.setTreeNodes(res, 'id', 'pId', 'children')
          vm.techniciansList = result.tree
          vm.techniciansListDefaultOpen = result.defaultOpen
          vm.isAlreadySetTechniciansList = true
          // console.log(res)
        })
        .catch(function(error) {
          console.log(`${error.message}`)
        });
    },
    submitInsertForm() {
        this.$refs.insertForm.validate((valid) => {
          if (valid) {
            this.insertOrder()
          } else {
            this.$alert('请正确填写表单')
            return false;
          }
        });
    },
    insertOrder(){
      let vm = this
      let url = vm.insertOrderUrl
      let temp = []
      let temp2 = []

      let OriginalPhotosList = vm.$refs.OriginalPhotosUpload.$refs['upload-inner'].fileList
      for (let index in OriginalPhotosList) {
        temp.push(OriginalPhotosList[index].response.Data[0].ResourceId)
      }
      OriginalPhotosList = temp

      let FinishedPhotosList = vm.$refs.FinishedPhotosUpload.$refs['upload-inner'].fileList
      for (let index in FinishedPhotosList) {
        temp2.push(FinishedPhotosList[index].response.Data[0].ResourceId)
      }
      FinishedPhotosList = temp2

      // console.log(OriginalPhotosList)
      // console.log(FinishedPhotosList)
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "ProjectId": vm.insertForm.ProjectId,
          "EquipmentId":vm.EquipmentId,
          "ServiceType": vm.insertForm.ServiceType,
          "ServiceContent": vm.insertForm.ServiceContent,
          "StartTime": vm.StartTime,
          "EndTime": vm.EndTime,
          "Technicians": vm.insertForm.TechniciansList,
          "JobSummary": vm.insertForm.JobSummary,
          "ContractNo": vm.insertForm.ContractNo,
          "ContractFiles": [{
            FileId:vm.insertForm.ContractFileId,
            FileName:vm.insertForm.ContractFileName
          }],
          "WorkOrderFiles": [{
            FileId:vm.insertForm.WorkOrderFileId,
            FileName:vm.insertForm.WorkOrderFileName
          }],
          "OriginalPhotos": OriginalPhotosList,
          "FinishedPhotos": FinishedPhotosList
        }
      }
      // console.log(data)
      POST(url, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          /*vm.row.SignedName = '已确认'
          vm.row.CustomerComments = vm.insertForm.desc
          vm.isShowInsertForm = false*/
          vm.$message({
            showClose: true,
            message: '新增服务记录成功',
            type: 'success',
          });
          vm.$emit('update:showWhichTab', 1)
        }
      })
    },
    hasPropsData(){
      let vm = this
      if (vm.propsData.ProjectId) {
        vm.insertForm.ProjectId = vm.propsData.ProjectId;
        vm.getEuipmentDatas();
        vm.hasProjectId = true
      }else{
        vm.insertForm.ProjectId = '';
        vm.getEuipmentDatas();
        vm.hasProjectId = false
      }
      if(vm.propsData.EquipmentId){      
      	 vm.getEuipmentDatas();
      	vm.hasEquipmentId=true;
      }else{
      	vm.hasEquipmentId=false;
      }
    },
    //初始化组件信息
    initData() {
      let vm = this
      vm.insertForm.timeRange = vm.setTimeRange()
      vm.hasPropsData()
      // console.log(this.propsData)
    },
    setTimeRange() {
      let endTime = new Date()
      let startTime = endTime.valueOf()
      startTime = startTime - 30 * 24 * 60 * 60 * 1000
      startTime = new Date(startTime)
      return [startTime, endTime]
    },
    setTimeStr(date) {
      Date.prototype.format = FUNC.date.format
      date = date.format("yyyy-MM-dd hh:mm:ss")
      return date
    },
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

    //控制资源上传按钮隐藏和显示
    uploadBtnShowAndHide(refName = 'contractFileUpload', string = '') {
      let el = this.$refs[refName].$el
      // console.log(el)
      let el1 = el.childNodes[0]
      let el2 = el.childNodes[1]
      el1.style.display = string;
      el2.style.display = string;
    },
    deleteRes(resId){
      let url = this.deleteUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "ResourceId": resId,
          "ResourceType": "2"
        }
      }
      // 删除服务器对应资源
      return DELETE(url,data)
    },
    //资源上传
    handleSuccessContractFile(res) {
      let data = res.Data[0]
      if (this.insertForm.ContractFileId) this.deleteRes(this.insertForm.ContractFileId)
      this.insertForm.ContractFileId = data.ResourceId
      this.insertForm.ContractFileName = data.OriginalResourceName
      // console.log(this.insertForm)
      //当提交一张图片后隐藏上传按钮
      this.uploadBtnShowAndHide(undefined, 'none')
    },

    handleRemoveContractFile(file, fileList) {
      let vm = this
      console.log(vm.insertForm.ContractFileList)
      vm.insertForm.ContractFiles = []
      vm.uploadBtnShowAndHide(undefined, '')
      // console.log(vm.insertForm)
      vm.deleteRes(vm.insertForm.ContractFileId).then(function(res) {
        if (res.data.State == 0) {
          // console.log(res)
          vm.insertForm.ContractFileId = ''
          vm.insertForm.ContractFileName = ''
        }
      })
    },

    handleSuccessWorkOrderFile(res) {
      let data = res.Data[0]
      if (this.insertForm.WorkOrderFileId) this.deleteRes(this.insertForm.WorkOrderFileId)
      this.insertForm.WorkOrderFileId = data.ResourceId
      this.insertForm.WorkOrderFileName = data.OriginalResourceName
      this.uploadBtnShowAndHide('workOrderFileUpload', 'none')
    },

    handleRemoveWorkOrderFile(file, fileList) {
      let vm = this
      vm.insertForm.fileList = []
      vm.uploadBtnShowAndHide('workOrderFileUpload', '')
      // 删除服务器对应资源
      vm.deleteRes(vm.insertForm.WorkOrderFileId).then(function(res) {
        if (res.data.State == 0) {
          // console.log(vm.addFunForm)
          vm.insertForm.WorkOrderFileId = ''
          vm.insertForm.WorkOrderFileName = ''
          console.log(vm.insertForm)
        }
      })
    },
  },
  computed: {
    StartTime() {
      let timeRange = this.insertForm.timeRange
      if (timeRange[0]) {
        let startTime = this.setTimeStr(timeRange[0])
        return startTime
      } else {
        return ''
      }
    },
    EndTime() {
      let timeRange = this.insertForm.timeRange
      if (timeRange[1]) {
        let endTime = this.setTimeStr(timeRange[1])
        return endTime
      } else {
        return ''
      }
    },
    //上传资源时的附加参数
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ResourceType": "0",
        "Title": "合同附件",
        "Description": "合同附件"
      }
    },
    //删除资源的附加参数
    deleteData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "ResourceId": this.addFunForm.ContractFileId,
          "ResourceType": "0"
        }
      }
    },
    deleteData2() {
      return {
        "AccessToken": this.AccessToken,
        "Parameters": {
          "ResourceId": this.funEditForm.ContractFileId,
          "ResourceType": "0"
        }
      }
    },
    //重新设置进来的项目列表下拉选项,如果是体验项目需要去掉
    projectOptsBeSet(){
      let temp = []
      for (let item of this.projectOpts) {
        if (item.IsExperienceProject!=1&&item.IsSelfProject==1) {
          temp.push(item)
        }
      }
      return temp
    }
  },
  mounted() {
    this.initData()
    // console.log(this.projectOpts)
  },
  watch: {
    row(){
      this.initData()
    }
  },
}

</script>
<style scoped lang='less'>
.contentWrap{padding: 0;}
.contentBox{padding: 24px;overflow: hidden;border: 1px solid #eeeeef;margin: 10px 0;}
.contentTitle {
  margin: -24px -24px 24px -24px;
  background: #EFF2F7;
  width: 200%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  & span {
    font-weight: 700;
    font-size: 15px
  }
}
.treeCol{max-height: 50vh;overflow-y: auto;border: 1px solid rgb(209, 229, 227);}
.el-tree{border-width: 0}
</style>

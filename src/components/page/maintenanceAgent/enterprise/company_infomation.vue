<style scoped="scoped">
.el_mainContent {
  background: #FEFEFE;
  height: 100%;
  position: relative;
}

.testinner {
  height: 100%;
  background: #000;
}

.pageContFixed {
  padding: 15px;
}

.logoWrap {
  overflow: hidden;
  text-align: center;
}

.operateMask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s;
  line-height: 100px;
}

.operateMask:hover {
  opacity: 1;
}

.operateMask:hover {
  display: inline-block;
}

.operateMask span {
  display: none;
  cursor: pointer;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
}

</style>
<template>
  <div class="el_mainContent" v-loading='loading'>
    <div class="pageTitle">
      企业信息
      <span style="color:#E74C3C">{{form.IsCanApplyModify==1?'':'（资料修改审核中）'}}</span>
      <el-button class='mt10 fr mr5' size='small' @click='$router.go(-1)'><i class="fa fa-mail-reply-all fa-lg mr5"></i>返回</el-button>
    </div>
    <div class="pageContFixed" style="bottom:50px">
      <!-- <div class="" v-for='item in 999'>123</div> -->
      <div class="contBlock por">
        <div class="blockTitle">基本信息</div>
        <div class="w50p fl">
          <el-form ref="form1" :model="form" :rules="rules" label-width="150px" style='margin:34px 0 34px 200px;'>
            <el-form-item label="公司名称：" prop="CompanyFullName">
              <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyFullName" :maxlength='30'></el-input>
            </el-form-item>
            <el-form-item label="注册地址：">
              <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyAddress" :maxlength='30'></el-input>
            </el-form-item>
            <el-form-item label="统一社会信用代码：">
              <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyUSCCode" :maxlength='30'></el-input>
            </el-form-item>
            <el-form-item label="组织机构代码证：">
              <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyORGCode" :maxlength='30'></el-input>
            </el-form-item>
            <el-form-item label="法人：">
              <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyLegalBody" :maxlength='20'></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="w50p fl">
          <el-form :model="form" label-width="100px" style='margin-left:50px;margin-right:200px;margin:34px 200px 34px 50px'>
            <el-form-item label="注册类型：">
              <!-- <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.IsRegular"></el-input> -->
              {{form.IsRegular?'正式用户':('试用用户'+(form.IsChecking==1?'（已提交正式会员申请）':''))}}
              <el-button @click='applyToUnlimitedUser' type="warning" v-show='form.IsRegular!=1&&form.IsChecking!=1&&isOperate.update==1' class='fr'>申请正式会员</el-button>
              <!-- <el-button type="primary" v-show='form.IsRegular==0&&isAdmin' size='small' class='ml30'>申请为正式会员</el-button> -->
            </el-form-item>
            <el-form-item label="所属行业：">
              <el-select :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyIndustryId" :loading='loadingIndustryOpts' class='w100p'>
                <el-option v-for="item in IndustryOpts" :key="item.IndustryId" :label="item.IndustryName" :value="item.IndustryId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="注册资本：">
              <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyRegCapital" type="number" @blur="limitNum('form','CompanyRegCapital')">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
            <el-form-item label="员工数量：">
              <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyStaffNum" type="number" @blur="limitNum('form','CompanyStaffNum')">
                <template slot="append">人</template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="logoWrap" style="position: absolute;top: 68px;left: 20px;">
          <el-upload :disabled='form.IsCanApplyModify==0||isOperate.update!=1' :data='uploadData' class="avatar-uploader" :action="uploadUrl" :show-file-list="false" :on-success="setFormLogo" :before-upload="beforeImgUpload" ref='uploadLogo'>
            <img v-if="form.CompanyLogoURL" :src="form.CompanyLogoURL" class="avatar">
            <span v-if="form.CompanyLogoURL" class="operateMask">
              <i class="fa fa-file-image-o mr5" title='更改' v-show='form.IsCanApplyModify==1&&isOperate.upload==1'></i>
              <i class="fa fa-trash-o mr5" title='删除' v-show='form.IsCanApplyModify==1&&isOperate.delete==1' @click.stop='delFormLogo'></i>
              <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.CompanyLogoURL)'></i>
            </span>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <span class='curd'>企业LOGO</span>
        </div>
      </div>
      <div class="contBlock por" style="margin-top:15px">
        <div class="blockTitle">联系信息</div>
        <div class="w50p fl">
          <el-form :model="form" label-width="150px" style='margin:34px 0 34px 200px;'>
            <el-form-item label="申请人姓名：">{{form.CompanyAplyName}}</el-form-item>
            <el-form-item label="申请人电话：">{{form.CompanyAplyPhone}}</el-form-item>
          </el-form>
        </div>
        <div class="w50p fl">
          <el-form ref='emailForm' :model="form" :rules="rules" label-width="100px" style='margin-left:50px;margin-right:200px;margin:34px 200px 34px 50px'>
            <el-form-item label="申请人职务：">
              <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyAplyPost" :maxlength='30'></el-input>
            </el-form-item>
            <el-form-item label="申请人邮箱：" prop="CompanyAplyEmail">
              <el-input :disabled='form.IsCanApplyModify==0||isOperate.update!=1' v-model="form.CompanyAplyEmail" :maxlength='30'></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="contBlock por" style="margin-top:15px">
        <div class="blockTitle">证件信息</div>
        <div class="w50p fl">
          <el-form :model="form" label-width="150px" style='margin:34px 0 34px 200px;'>
            <el-form-item label="企业营业执照：">
              <div class="logoWrap">
                <el-upload :disabled='form.IsCanApplyModify==0||isOperate.update!=1' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setBLFiles" :before-upload="beforeImgUpload">
                  <img v-if="form.CompanyBLFilesURL" :src="form.CompanyBLFilesURL" class="avatar">
                  <span v-if="form.CompanyBLFilesURL" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改' v-show='form.IsCanApplyModify==1&&isOperate.upload==1'></i>
                    <i class="fa fa-trash-o mr5" title='删除' v-show='form.IsCanApplyModify==1&&isOperate.delete==1' @click.stop='delBLFiles'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.CompanyBLFilesURL)'></i>
                  </span>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <div class="w50p fl" v-show='EntitySort!=0'>
          <el-form :model="form" label-width="100px" style='margin:34px 0 34px 50px'>
            <el-form-item label="企业资质：">
              <div class="logoWrap fl mr15">
                <el-upload :disabled='form.IsCanApplyModify==0||isOperate.update!=1' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setICFiles0" :before-upload="beforeImgUpload">
                  <img v-if="form.CompanyICFiles[0].FileUrl" :src="form.CompanyICFiles[0].FileUrl" class="avatar">
                  <span v-if="form.CompanyICFiles[0].FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改' v-show='form.IsCanApplyModify==1&&isOperate.upload==1'></i>
                    <i class="fa fa-trash-o mr5" title='删除' v-show='form.IsCanApplyModify==1&&isOperate.delete==1' @click.stop='delICFiles(0)'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.CompanyICFiles[0].FileUrl)'></i>
                  </span>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="logoWrap fl mr15">
                <el-upload :disabled='form.IsCanApplyModify==0||isOperate.update!=1' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setICFiles1" :before-upload="beforeImgUpload">
                  <img v-if="form.CompanyICFiles[1].FileUrl" :src="form.CompanyICFiles[1].FileUrl" class="avatar">
                  <span v-if="form.CompanyICFiles[1].FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改' v-show='form.IsCanApplyModify==1&&isOperate.upload==1'></i>
                    <i class="fa fa-trash-o mr5" title='删除' v-show='form.IsCanApplyModify==1&&isOperate.delete==1' @click.stop='delICFiles(1)'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.CompanyICFiles[1].FileUrl)'></i>
                  </span>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
              <div class="logoWrap fl">
                <el-upload :disabled='form.IsCanApplyModify==0||isOperate.update!=1' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setICFiles2" :before-upload="beforeImgUpload">
                  <img v-if="form.CompanyICFiles[2].FileUrl" :src="form.CompanyICFiles[2].FileUrl" class="avatar">
                  <span v-if="form.CompanyICFiles[2].FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改' v-show='form.IsCanApplyModify==1&&isOperate.upload==1'></i>
                    <i class="fa fa-trash-o mr5" title='删除' v-show='form.IsCanApplyModify==1&&isOperate.delete==1' @click.stop='delICFiles(2)'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.CompanyICFiles[2].FileUrl)'></i>
                  </span>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="pageFoot" style="height: 50px;line-height:50px;">
      <!-- <el-button size='small' style='margin-left:365px;padding-left:20px;padding-right:20px' @click='$router.go(-1)'>取消</el-button> -->
      <el-button size='small' v-show='form.IsRegular!=1&&isOperate.update==1' type="primary" style='margin-left:365px;padding-left:20px;padding-right:20px' @click='submitForm'>修改资料</el-button>
      <el-button v-show='form.IsRegular==1&&isOperate.update==1' :disabled='form.IsCanApplyModify==0||isOperate.update!=1' size='small' type="primary" style='margin-left:365px;padding-left:20px;padding-right:20px' @click='submitForm'>{{form.IsCanApplyModify==0?'审核中':'申请修改'}}</el-button>
    </div>
    <!-- 大图对话框 -->
    <el-dialog :visible.sync="isShowBigPic" class='bigPic'>
      <img :src="bigPicUrl" alt="" class='vh50' />
    </el-dialog>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const PUT = AXIOS.put
const DELETE = FUNC.axios.delete
export default {
  data() {
    return {
      isOperate: {},
      bigPicUrl: '',
      isShowBigPic: false,
      EntitySort: null,
      formOri: {
        CompanyId: '', //企业id，必填
        CompanyFullName: '', //能迪云服务公司, 
        CompanyLogo: '', //企业logo图片
        CompanyAplyPost: '', //申请人职务
        CompanyAplyEmail: '', //申请人邮箱
        CompanyUSCCode: '', //统一社会信用代码
        CompanyORGCode: '', //组织机构代码
        CompanyAddress: '', //注册地址
        CompanyRegCapital: '', //注册资金
        CompanyLegalBody: '', //法人
        CompanyStaffNum: '', //员工数量
        CompanyIndustryId: '', //行业id
        CompanyBLFiles: '', //营业执照
        CompanyICFiles: [], //企业资质
        CompanyICFilesId: [] //企业资质id
      },
      formNew: {
        CompanyId: '', //企业id，必填
        CompanyFullName: '', //能迪云服务公司, 
        CompanyLogo: '', //企业logo图片
        CompanyAplyPost: '', //申请人职务
        CompanyAplyEmail: '', //申请人邮箱
        CompanyUSCCode: '', //统一社会信用代码
        CompanyORGCode: '', //组织机构代码
        CompanyAddress: '', //注册地址
        CompanyRegCapital: '', //注册资金
        CompanyLegalBody: '', //法人
        CompanyStaffNum: '', //员工数量
        CompanyIndustryId: '', //行业id
        CompanyBLFiles: '', //营业执照
        CompanyICFiles: [], //企业资质
        CompanyICFilesId: [] //企业资质id
      },
      formSet: {},
      form: {
        IsCanApplyModify: 1,
        IsChecking: 0,
        CompanyId: '', //企业id，必填
        CompanyFullName: '',
        CompanyAddress: '',
        CompanyUSCCode: '',
        CompanyORGCode: '',
        CompanyLegalBody: '',
        IsRegular: '',
        CompanyRegCapital: '',
        CompanyStaffNum: '',
        CompanyIndustryId: '',
        CompanyLogo: '', //企业logo图片
        CompanyLogoURL: '',
        CompanyBLFiles: '', //营业执照
        CompanyBLFilesURL: '',
        CompanyAplyName: '',
        CompanyAplyPhone: '',
        CompanyAplyPost: '',
        CompanyAplyEmail: '',
        CompanyICFiles: [{
          FileUrl: ''
        }, {
          FileUrl: ''
        }, {
          FileUrl: ''
        }]
      },
      rules: {
        CompanyFullName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
        ],
        CompanyAplyEmail: [
          { required: false, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ]
      },
      loadingIndustryOpts: true,
      IndustryOpts: [],
      loading: true,
      uploadUrl: URL.UPLOADRESOURCE
    }
  },
  computed: {
    //上传资源时的附加参数
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ResourceType": "2",
        "Title": "上传附件",
        "Description": "上传附件"
      }
    },
    preRoute() {
      return this.EntitySort == 0 ? 'yz' : (this.EntitySort == 1 ? 'wb' : 'sm')
    }
  },
  methods: {
    limitNum(formName, propName) {
      let vm = this
      let num = vm[formName][propName]
      if (num.length > 9) vm[formName][propName] = num.slice(0, 9)
    },
    showBigPic(url) {
      this.isShowBigPic = true
      this.bigPicUrl = url
    },
    setFormLogo(res, file) {
      this.form.CompanyLogo = res.Data[0].ResourceId
      this.form.CompanyLogoURL = file.url
    },
    delFormLogo() {
      this.form.CompanyLogo = ''
      this.form.CompanyLogoURL = ''
    },

    setBLFiles(res, file) {
      this.form.CompanyBLFiles = res.Data[0].ResourceId
      this.form.CompanyBLFilesURL = file.url;
    },
    delBLFiles() {
      this.form.CompanyBLFiles = ''
      this.form.CompanyBLFilesURL = ''
    },

    setICFiles0(res, file) {
      this.form.CompanyICFiles[0].FileId = res.Data[0].ResourceId
      this.form.CompanyICFiles[0].FileUrl = file.url;
    },
    setICFiles1(res, file) {
      this.form.CompanyICFiles[1].FileId = res.Data[0].ResourceId
      this.form.CompanyICFiles[1].FileUrl = file.url;
    },
    setICFiles2(res, file) {
      this.form.CompanyICFiles[2].FileId = res.Data[0].ResourceId
      this.form.CompanyICFiles[2].FileUrl = file.url;
    },

    delICFiles(index) {
      this.form.CompanyICFiles[index].FileId = ''
      this.form.CompanyICFiles[index].FileUrl = ''
    },

    beforeImgUpload(file) {
      const isIMG = (file.type === 'image/jpeg' || file.type === 'image/png');
      // console.log(isIMG)
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isIMG) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
        return false
      }
      // return isIMG && isLt2M;
    },
    submitForm() {
      let vm = this
      let res1 = false
      let res2 = false
      vm.$refs.form1.validate((valid) => {
        if (valid) {
          res1 = true
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      vm.$refs.emailForm.validate((valid) => {
        if (valid) {
          res2 = true
        } else {
          console.log('error submit!!');
          return false;
        }
      });
      if (res1&&res2) {
        //试用会员直接修改资料
        if (vm.form.IsRegular == 0) {
          vm.editCompanyTrial();
        } else {
          //正式会员需要提交审核
          vm.setForm(vm.form, vm.formNew)
          if (vm.compareForm()) {
            vm.$message.warning('无内容变更，无需提交')
            return
          }
          vm.applyModify();
        }
      } else {
        console.log('error submit!!');
        return false;
      }
    },
    applyModify() {
      let vm = this
      vm.loading = true
      let url = URL.APPLYMODIFYCOMMANYINFO
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": vm.formSet
      }
      // console.log(data.Parameters)
      PUT(url, data).then(function(response) {
        // console.log(res)
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.loading = false
          vm.$alert('您的企业信息修改已提交，请耐心等待运营团队审核', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              let path = `${vm.preRoute}_certification`
              FUNC.tntool.setTnAuth(path)
              vm.$router.push({
                path,
                query: {
                  IsAduitCompany: 0
                }
              })
            }
          });
          // vm.$alert("您的企业信息修改已提交，请耐心等待运营团队审核");
          // vm.form.IsCanApplyModify = 0;
          // this.$message.success('您的企业信息修改已提交，请耐心等待运营团队审核')
        }
      })
    },
    editCompanyTrial() {
      let vm = this
      vm.loading = true
      let url = URL.MODIFYCOMPANYINFO
      let ICFiles = []
      let CompanyICFiles = vm.form.CompanyICFiles
      for (let index in CompanyICFiles) {
        if (CompanyICFiles[index].FileId) {
          ICFiles.push(CompanyICFiles[index].FileId)
          // console.log(ICFiles)
        }
      }
      let form = vm.form
      let Parameters = {
        CompanyId: form.CompanyId, //企业id，必填
        CompanyName: form.CompanyFullName, //能迪云服务公司, 
        CompanyLogo: form.CompanyLogo, //企业logo图片
        ApplyPosition: form.CompanyAplyPost, //申请人职务
        ApplyEmail: form.CompanyAplyEmail, //申请人邮箱
        USCCode: form.CompanyUSCCode, //统一社会信用代码
        ORGCode: form.CompanyORGCode, //组织机构代码
        RegisteredAddress: form.CompanyAddress, //注册地址
        CompanyRegCapital: form.CompanyRegCapital, //注册资金
        LegalBody: form.CompanyLegalBody, //法人
        StaffNum: form.CompanyStaffNum, //员工数量
        IndustryId: form.CompanyIndustryId, //行业id
        BLFiles: form.CompanyBLFiles, //营业执照
        ICFiles //企业资质id
      }
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        Parameters
      }
      // console.log(data.Parameters)
      PUT(url, data).then(function(response) {
        // console.log(res)
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.loading = false
          vm.$message.success("信息修改成功");
          vm.queryForm()
          // this.$message.success('您的企业信息修改已提交，请耐心等待运营团队审核')
        }
      })
    },
    applyToUnlimitedUser() {
      let vm = this
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken")
      }
      let url = URL.BECOMEFORMALUSE;
      PUT(url, data).then(function(response) {
        // console.log(res)
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          // vm.form.IsChecking = 1
          // vm.$alert("您的申请已提交，请耐心等待运营团队审核");
          vm.$alert("您的申请已提交，请耐心等待运营团队审核", '提示');
          vm.queryForm()
        }
      })
    },
    //设置所属行业下拉框
    setIndustryOpts() {
      let vm = this
      vm.loadingIndustryOpts = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = URL.INDUSTRY
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let opts = res.Data
            vm.IndustryOpts = opts
            vm.IndustryOpts.splice(0, 1) //删除"请选择行业"的多余选项
            // console.log(vm.IndustryOpts)
            vm.loadingIndustryOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //加载表格数据
    queryForm() {
      let vm = this
      vm.loading = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = URL.QUERYCOMPANYINFO
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data
            vm.loadData(dataArr)
            vm.setForm(dataArr, vm.formOri)
            vm.loading = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //填充表格数据
    loadData(dataArr) {
      let vm = this
      let form = vm.form
      for (let index in form) {
        if (index == 'CompanyICFiles') {
          for (let jndex in dataArr.CompanyICFiles) {
            form.CompanyICFiles[jndex].FileUrl = dataArr.CompanyICFiles[jndex].FileUrl
            form.CompanyICFiles[jndex].FileId = dataArr.CompanyICFiles[jndex].FileId
          }
          /*let length = dataArr.CompanyICFiles.length
          let i = 0
          for (i; i < length; i++) {
            form.CompanyICFiles[i].FileUrl = dataArr.CompanyICFiles[i].FileUrl
          }
          for (i; i < 3; i++) {
            form.CompanyICFiles[i].FileUrl = ''
          }*/
        } else {
          form[index] = dataArr[index]
          // vm.$set(form, index, dataArr[index])
        }
      }
    },
    setForm(dataArr, newOrOriForm) {
      let vm = this
      let tempArr = []
      for (let index in newOrOriForm) {
        if (index == 'CompanyICFilesId') {
          for (let jndex in dataArr.CompanyICFiles) {
            if (dataArr.CompanyICFiles[jndex].FileId) {
              tempArr.push(dataArr.CompanyICFiles[jndex].FileId)
              // console.log(tempArr)
            }
          }
          newOrOriForm.CompanyICFilesId = tempArr
        } else if (index == 'CompanyICFiles') {
          continue;
        } else {
          newOrOriForm[index] = dataArr[index] || ''
        }
      }
      // console.log(newOrOriForm)
    },
    compareForm() {
      let vm = this
      let result = true
      vm.formSet = {
        CompanyICFiles: []
      }
      //如果资质文件没有改变则不执行操作,如果改变则把改变的fileID进行添加到formSet对象中
      let newICId = vm.formNew.CompanyICFilesId
      let oriICId = vm.formOri.CompanyICFilesId
      Array.prototype.equals = FUNC.array.equals
      if (!newICId.equals(oriICId)) {
        vm.formSet.CompanyICFiles = newICId
        result = false
      }
      /*for (let index in newICId) {
        if (newICId[index] != oriICId[index]) {
          if (newICId[index]) vm.formSet.CompanyICFiles.push(newICId[index])
          result = false
        }
      }*/
      // if (vm.formSet.CompanyICFiles.length == 0) vm.formSet.CompanyICFiles = null
      //同上,除资质文件外的内容,没有改变则不执行操作,如果改变则把改变的内容进行添加到formSet对象中
      for (let index in vm.formNew) {
        if (index == 'CompanyICFiles' || index == 'CompanyICFilesId') {
          continue;
        } else {
          if (vm.formOri[index] != vm.formNew[index]) {
            // console.log(index, vm.formSet[index], vm.formNew[index])
            vm.formSet[index] = vm.formNew[index]
            result = false
          }
        }
      }
      vm.formSet.CompanyId = vm.formNew.CompanyId
      return result
    },
    setPageAuth() {
      let vm = this
      let path = `${vm.preRoute}_enterprise_info`
      FUNC.tntool.setTnAuth(path)
      vm.isOperate = FUNC.operator.eosOperDataHandle()
      // console.log(vm.isOperate)
    }
  },
  mounted() {
    let vm = this
    vm.EntitySort = FUNC.storage.get("EntitySort")
    vm.setPageAuth()
    vm.setIndustryOpts()
    vm.queryForm()
  },
}

</script>

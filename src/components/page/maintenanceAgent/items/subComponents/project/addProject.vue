<style scoped="scoped">
.el_mainContent {
  background: #FEFEFE;
  height: 100%;
  position: relative;
  /*overflow: auto;*/
}

.pageContFixed {
  padding: 15px;
  /*min-width: 1050px;*/
}

.el-radio__inner::after {
  background: red;
}

.w32p {
  width: 32%;
}

.mapWrap {
  /*width: 100%;*/
  margin-left: 100px;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  height: 243px;
  cursor: default;
}

.map {
  width: 100%;
  height: 243px;
  overflow: hidden;
  margin: 0;
  font-family: "微软雅黑";
  box-sizing: border-box;
  border: 1px solid #BFD9D7;
}

.s-point {
  position: absolute;
  width: 28px;
  height: 54.4px;
  z-index: 100;
  background-repeat: no-repeat;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  background-size: contain;
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

.radio{line-height: 10px;}
</style>
<template>
  <div class="el_mainContent" v-loading='loading'>
    <div class="pageTitle">
      新增项目
      <el-button class='mt10 fr' size='small' @click='btnReturn'><i class="fa fa-mail-reply-all fa-lg mr5"></i>返回</el-button>
    </div>
    <div class="pageContFixed" style="bottom:50px">
      <div class="contBlock por" id='addWay' v-if='EntitySort!=2'>
        <div class="blockTitle">新增方式</div>
        <div class="w60p fl ovh">
          <el-form label-width="150px" style='margin:34px 0 34px 100px;'>
            <el-form-item label="新增项目方式：" prop="CompanyFullName">
              <el-radio v-model="addWay" label="1">手动录入方式</el-radio>
              <el-radio v-model="addWay" label="2">关联码方式</el-radio>
            </el-form-item>
          </el-form>
        </div>
        <!-- <div class="w60p fl">
          <el-form label-width="0px" style='margin:34px 0;'>
            <el-form-item label="">
            </el-form-item>
          </el-form>
        </div> -->
      </div>
      <div class="contBlock por" v-show='addWay==1'>
        <div class="blockTitle">项目信息</div>
        <div class="w40p fl">
          <el-form :model="formL" ref="formL" :rules="rules" label-width="150px" style='margin:34px 0 34px 100px;'>
            <el-form-item label="所属业主：" prop="CompanyId" v-if='EntitySort==2'>
              <el-select v-model="formL.CompanyId" filterable :loading='loadingCompanyIdOpts' class='w100p' @change='CompanyIdChange'>
                <el-option v-for="item in CompanyIdOpts" :key="item.CompanyId" :label="item.CompanyName" :value="item.CompanyId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目名称：" prop="ProjectName">
              <el-input v-model="formL.ProjectName" :maxlength="25"></el-input>
            </el-form-item>
            <el-form-item label="项目负责人：" prop="ProjectLeader" v-if='EntitySort==2'>
              <el-select v-model="formL.ProjectLeader" :disabled='formL.CompanyId==""' filterable :loading='loadingProjectLeaderOpts' class='w100p' placeholder='需先选择所属业主'>
                <el-option v-for="item in ProjectLeaderOpts" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目负责人：" prop="ProjectLeader" v-else>
              <el-select v-model="formL.ProjectLeader" filterable :loading='loadingProjectLeaderOpts' class='w100p'>
                <el-option v-for="item in ProjectLeaderOpts" :key="item.UserId" :label="item.UserName" :value="item.UserId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="所属行业：">
              <el-select v-model="formL.IndustryId" :loading='loadingIndustryOpts' class='w100p'>
                <el-option v-for="item in IndustryOpts" :key="item.IndustryId" :label="item.IndustryName" :value="item.IndustryId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否能耗监测项目：">
              <el-radio class="radio" v-model="formL.IsEMProject" :label='1'>是</el-radio>
              <el-radio class="radio" v-model="formL.IsEMProject" :label='0'>否</el-radio>
            </el-form-item>
            
            <el-form-item label="项目介绍：">
              <el-input type="textarea" v-model="formL.ProjectIntro" :maxlength="100" :rows='8'></el-input>
            </el-form-item>
            <el-form-item label="合同编号：">
              <el-input v-model="formL.ContractNo" :maxlength="25"></el-input>
            </el-form-item>
            <el-form-item label="合同文件：">
              <el-upload class="upload-demo" :action="uploadUrl" :data='uploadData' :multiple='false' :on-success='fileUploadSuccess' :on-remove="fileRemove" :file-list="formL.ContractFileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
            </el-form-item>
          </el-form>
        </div>
        <div class="w60p fl">
          <el-form label-width="100px" style='margin:34px 10px 34px 50px;max-width:600px'>
            <el-form-item label="省、市、区：">
              <div class="w33p fl pr5">
                <el-select v-model="formL.ProvinceId" filterable @change='ProvinceIdChange' :loading='loadingProvinceIdOpts'>
                  <el-option v-for="item in ProvinceIdOpts" :key="item.ProvinceId" :label="item.ProvinceName" :value="item.ProvinceId">
                  </el-option>
                </el-select>
              </div>
              <div class="w33p fl pr5">
                <el-select v-model="formL.CityId" filterable @change='CityIdChange' :loading='loadingCityIdOpts'>
                  <el-option v-for="item in CityIdOpts" :key="item.CityId" :label="item.CityName" :value="item.CityId">
                  </el-option>
                </el-select>
              </div>
              <div class="w33p fl">
                <el-select v-model="formL.DistrictId" filterable :loading='loadingDistrictIdOpts'>
                  <el-option v-for="item in DistrictIdOpts" :key="item.DistrictId" :label="item.DistrictName" :value="item.DistrictId">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <el-form-item label="具体地址：">
              <el-select @change='locationChange' v-model="formL.ProjectAddress" class='w100p' filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loadingLocationList">
                <el-option v-for="item in locationList" :label="item.title" :value="item.title">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="mapWrap" v-loading='loadingMap'>
              <div id="user-map" class="map"></div>
              <div class="s-point" :style="pointSty"></div>
            </div>
            <el-form-item label="相关图片：">
              <div class="w100p">
                <div class="logoWrap fl mr15">
                  <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setProjectLogo" :before-upload="beforeImgUpload">
                    <img v-if="formL.ProjectLogo.FileUrl" :src="formL.ProjectLogo.FileUrl" class="avatar">
                    <span v-if="formL.ProjectLogo.FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delProjectLogo'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(formL.ProjectLogo.FileUrl)'></i>
                  	</span>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span class='curd'>项目LOGO</span>
                </div>
                <div class="logoWrap fl mr15">
                  <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setCoverPhoto" :before-upload="beforeImgUpload">
                    <img v-if="formL.CoverPhoto.FileUrl" :src="formL.CoverPhoto.FileUrl" class="avatar">
                    <span v-if="formL.CoverPhoto.FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delCoverPhoto'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(formL.CoverPhoto.FileUrl)'></i>
                  </span>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span class='curd'>项目封面</span>
                </div>
                <div class="logoWrap fl mr15">
                  <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setLivePhotos0" :before-upload="beforeImgUpload">
                    <img v-if="formL.LivePhotos[0].FileUrl" :src="formL.LivePhotos[0].FileUrl" class="avatar">
                    <span v-if="formL.LivePhotos[0].FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delLivePhotos(0)'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(formL.LivePhotos[0].FileUrl)'></i>
                  </span>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span class='curd'>现场图片1</span>
                </div>
                <div class="logoWrap fl mr15">
                  <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setLivePhotos1" :before-upload="beforeImgUpload">
                    <img v-if="formL.LivePhotos[1].FileUrl" :src="formL.LivePhotos[1].FileUrl" class="avatar">
                    <span v-if="formL.LivePhotos[1].FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delLivePhotos(1)'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(formL.LivePhotos[1].FileUrl)'></i>
                  </span>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span class='curd'>现场图片2</span>
                </div>
                <div class="logoWrap fl">
                  <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setLivePhotos2" :before-upload="beforeImgUpload">
                    <img v-if="formL.LivePhotos[2].FileUrl" :src="formL.LivePhotos[2].FileUrl" class="avatar">
                    <span v-if="formL.LivePhotos[2].FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delLivePhotos(2)'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(formL.LivePhotos[2].FileUrl)'></i>
                  </span>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <span class='curd'>现场图片3</span>
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="contBlock por" style="margin-top:15px" v-show='addWay==2'>
        <div class="blockTitle">项目信息</div>
        <div class="w40p fl">
          <el-form :model="formR" ref="formR1" :rules="rules" label-width="150px" style='margin:34px 0 34px 100px;'>
            <el-form-item :label="(EntitySort==1?'维保':'拥有')+'码：'" prop="LinkCode">
              <el-input v-model="formR.LinkCode" :maxlength="25"></el-input>
            </el-form-item>
            <el-form-item label="维保主管：" prop="MaintSupId" v-if='EntitySort==1'>
              <el-select v-model="formR.MaintSupId" filterable :loading='loadingProjectLeaderOpts' class='w100p'>
                <el-option v-for="item in ProjectLeaderOpts" :key="item.UserId" :label="item.UserName" :value="item.UserId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
        <div class="w60p fl">
          <el-form :model="formR" ref="formR2" :rules="rules" label-width="150px" style='margin:34px 10px 34px 50px'>
            <el-form-item label="维保人员：" prop="MaintUserId" v-if='EntitySort==1'>
              <el-select v-model="formR.MaintUserId" filterable :loading='loadingProjectLeaderOpts'>
                <el-option v-for="item in ProjectLeaderOpts" :key="item.UserId" :label="item.UserName" :value="item.UserId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="项目负责人：" prop="ProjectLeader" v-else>
              <el-select v-model="formR.ProjectLeader" filterable :loading='loadingProjectLeaderOpts'>
                <el-option v-for="item in ProjectLeaderOpts" :key="item.UserId" :label="item.UserName" :value="item.UserId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="pageFoot" style="height: 50px;line-height:50px;">
      <el-button size='small' type="primary" style='margin-left:265px;padding-left:20px;padding-right:20px' @click='submitForm'>确定</el-button>
    </div>
    <!-- 大图对话框 -->
    <el-dialog :visible.sync="isShowBigPic" class='bigPic'>
      <img :src="bigPicUrl" alt="" class='vh50' />
    </el-dialog>
  </div>
  </div>
</template>
<script>
import pointPng from 'assets/images/icon/sPoint.png'
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
import commonFn from 'assets/js/common/commonFunc';
const DELETE = commonFn.axios.delete
import { mapGetters, mapMutations } from 'vuex'
export default {
  data() {
    return {
      pointSty:{
        'backgroundImage':`url(${pointPng})`
      },
      pointPng,
      EntitySort: 1,
      addWay: '1',
      loading: false,
      formL: {
        IsEMProject: 0,
        CompanyId: '',
        ProjectName: '',
        ProjectLeader: '',
        ProjectIntro: '',
        IndustryId: '',
        ProvinceId: 1,
        CityId: 36,
        DistrictId: 37,
        ProjectAddress: '',
        ProjectLogo: {
          FileUrl: ''
        },
        CoverPhoto: {
          FileUrl: ''
        },
        LivePhotos: [{
          FileUrl: ''
        }, {
          FileUrl: ''
        }, {
          FileUrl: ''
        }],
        ContractNo: '',
        ContractFileList: [],
        ContractFileId: '',
        ContractFileName: ''
      },
      formR: {
        LinkCode: '',
        MaintUserId: '',
        MaintSupId: '',
        ProjectLeader: ''
      },
      CompanyIdOpts: [],
      loadingCompanyIdOpts: true,

      ProvinceIdOpts: [],
      loadingProvinceIdOpts: true,

      CityIdOpts: [],
      loadingCityIdOpts: true,

      DistrictIdOpts: [],
      loadingDistrictIdOpts: true,

      map: null,
      loadingMap: true,
      locationList: [],
      loadingLocationList: false,
      //默认北京坐标
      userPos: {
        lng: 116.38,
        lat: 39.90
      },

      bigPicUrl: '',
      isShowBigPic: false,

      rules: {
        CompanyId: [
          { required: true, message: '请选择所属业主', trigger: 'change' }
        ],
        ProjectName: [
          { required: true, message: '请输入项目名称', trigger: 'change' }
        ],
        ProjectLeader: [
          { required: true, message: '请选择项目负责人', trigger: 'change' }
        ],
        LinkCode: [
          { required: true, message: '请输入项目名称', trigger: 'change' }
        ],
        MaintSupId: [
          { required: true, message: '请选择维保主管', trigger: 'change' }
        ],
        MaintUserId: [
          { required: true, message: '请选择维保人员', trigger: 'change' }
        ],
      },
      ProjectLeaderOpts: [],
      //行业
      IndustryOpts: [],
      loadingIndustryOpts: true,
      loadingProjectLeaderOpts: true,
      //其它
      uploadUrl: URL.UPLOADRESOURCE, //上传资源url
    }
  },
  props: ['showWhichTab'],
  computed: {
    //上传资源时的附加参数
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ResourceType": "0",
        "Title": "上传附件",
        "Description": "上传附件"
      }
    },
    cityName() {
      let vm = this
      let cityName = ''
      for (let index in vm.CityIdOpts) {
        if (vm.CityIdOpts[index].CityId === vm.formL.CityId) {
          cityName = vm.CityIdOpts[index].CityName
          break
        }
      }
      return cityName
    },
    /*districtName() {
      let vm = this
      let districtName = ''
      for (let index in vm.DistrictIdOpts) {
        if (vm.DistrictIdOpts[index].DistrictId === vm.formL.DistrictId) {
          districtName = vm.DistrictIdOpts[index].districtName
          break
        }
      }
      return districtName
    },*/
    CodeType() {
      return this.EntitySort == 1 ? 2 : 1
    }
  },
  methods: {
    ...mapMutations({
      renderProject: 'RENDER_PRO_INDEX',
      UPDATE_SHOWWHICHTAB: 'UPDATE_SHOWWHICHTAB'
    }),
    submitForm() {
      let vm = this
      if (vm.addWay == 1) {
        vm.$refs.formL.validate((valid) => {
          if (valid) {
            vm.projectInsert()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      } else {
        let isForm1Right = false
        let isForm2Right = false
        vm.$refs.formR1.validate((valid) => {
          if (valid) {
            isForm1Right = true
          } else {
            console.log('error submit!!');
          }
        });
        vm.$refs.formR2.validate((valid) => {
          if (valid) {
            isForm2Right = true
          } else {
            console.log('error submit!!');
          }
        });
        if (isForm1Right && isForm2Right) {
          vm.projectInsertWithCode()
        } else {
          console.log('error submit!!');
        }
      }
    },
    projectInsert() {
      let vm = this;
      vm.loading = true
      let form = vm.formL
      let url = URL.INSERT
      let LivePhotos = []
      for (let item of form.LivePhotos) {
        if (item.FileId) {
          LivePhotos.push(item.FileId)
        }
      }
      let param = {
        "AccessToken": FUNC.storage.get('AccessToken'),
        "Parameters": {
          "IsEMProject": form.IsEMProject, //--是否能耗监测项目
          "ProjectName": form.ProjectName, //--项目名称(必填)
          "ProjectIntro": form.ProjectIntro, //--项目描述
          "ProvinceId": form.ProvinceId, //--省Id(必填)
          "CityId": form.CityId, //-市Id(必填)
          "DistrictId": form.DistrictId, //--区Id(必填)vm.DistrictId
          "ProjectLeader": form.ProjectLeader, // --项目负责人Id(必填)
          "ProjectLogo": form.ProjectLogo.FileId, //--logo
          "CoverPhoto": form.CoverPhoto.FileId, //--项目形象图片
          LivePhotos, //现场图片，json格式,
          "ProjectAddress": form.ProjectAddress,
          "ContractNo": form.ContractNo,
          "ContractFileId": form.ContractFileId,
          "ContractFileName": form.ContractFileName,
          "IndustryId": form.IndustryId,
          "ProjectLoaction": {
            "Latitude": vm.userPos.lat,
            "Longitude": vm.userPos.lng
          }
        }
      }
      // console.log(param)
      POST(url, param).then(function(response) {
        // console.log(res)
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.loading = false
          vm.$message.success("项目新增成功");
          vm.UPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
          // vm.$emit('update:showWhichTab', 1)
        } else {
          vm.loading = false
        }
      })
    },
    projectInsertWithCode() {
      let vm = this;
      vm.loading = true
      let form = vm.formR
      let param = {
        "AccessToken": FUNC.storage.get('AccessToken'),
        "Parameters": {
          "LinkCode": form.LinkCode, //--关联码                
          "MaintUserId": form.MaintUserId, //--维保人员（更换维保方关联码时必填）
          "MaintSupId": form.MaintSupId, //--维保主管（更换维保方关联码时选填）
          "ProjectLeader": form.ProjectLeader, //--项目负责人（更换业主方关联码时必填填）
          "CodeType": vm.CodeType //1-业务拥有码;2-维保关联码
        }
      }
      let url = URL.SCANLINKCODE
      // console.log(param)
      POST(url, param).then(function(response) {
        // console.log(res)
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.$message.success("项目新增成功")
          vm.getRenderProject(true);
          vm.loading = false
        } else {
          // vm.$message.error("项目新增失败")
          vm.loading = false
        }
      })
    },
    showBigPic(url) {
      this.isShowBigPic = true
      this.bigPicUrl = url
    },

    setProjectLogo(res, file) {
      this.formL.ProjectLogo.FileId = res.Data[0].ResourceId
      this.formL.ProjectLogo.FileUrl = file.url;
    },
    delProjectLogo() {
      this.formL.ProjectLogo.FileId = ''
      this.formL.ProjectLogo.FileUrl = ''
    },

    setCoverPhoto(res, file) {
    	
      this.formL.CoverPhoto.FileId = res.Data[0].ResourceId
      this.formL.CoverPhoto.FileUrl = file.url;
    },
    delCoverPhoto() {
      this.formL.CoverPhoto.FileId = ''
      this.formL.CoverPhoto.FileUrl = ''
    },

    setLivePhotos0(res, file) {
      this.formL.LivePhotos[0].FileId = res.Data[0].ResourceId
      this.formL.LivePhotos[0].FileUrl = file.url;
    },
    setLivePhotos1(res, file) {
      this.formL.LivePhotos[1].FileId = res.Data[0].ResourceId
      this.formL.LivePhotos[1].FileUrl = file.url;
    },
    setLivePhotos2(res, file) {
      this.formL.LivePhotos[2].FileId = res.Data[0].ResourceId
      this.formL.LivePhotos[2].FileUrl = file.url;
    },

    delLivePhotos(index) {
      this.formL.LivePhotos[index].FileId = ''
      this.formL.LivePhotos[index].FileUrl = ''
    },
    //资源上传
    fileUploadSuccess(res) {
      let data = res.Data[0]
      let vm = this
      if (vm.formL.ContractFileId) vm.deleteRes(vm.formL.ContractFileId)
      vm.formL.ContractFileId = data.ResourceId
      vm.formL.ContractFileName = data.OriginalResourceName
      // console.log(vm.formL.ContractFileList)
      vm.formL.ContractFileList = [{
        name: data.OriginalResourceName,
        url: ''
      }]
    },
    fileRemove(file, fileList) {
      let vm = this
      vm.formL.ContractFileList = []
      vm.deleteRes(vm.formL.ContractFileId).then(function(res) {
        if (res.data.State == 0) {
          vm.formL.ContractFileId = ''
          vm.formL.ContractFileName = ''
        }
      })
    },
    deleteRes(resId) {
      let url = URL.DELETERESOURCE
      let data = {
        "AccessToken": FUNC.storage.get('AccessToken'),
        "Parameters": {
          "ResourceId": resId,
          "ResourceType": "0"
        }
      }
      // 删除服务器对应资源          
      return DELETE(url, data)
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
    initMap: function() {
      let vm = this;
      vm.loadingMap = true
      let mapPoint = new BMap.Point(vm.userPos.lng, vm.userPos.lat);
      vm.map = new BMap.Map("user-map",{enableMapClick:false});
      vm.map.centerAndZoom(mapPoint, 18);
      vm.mapFunction(vm.map)
      vm.loadingMap = false
      // map.addControl(new BMap.MapTypeControl({ mapTypes: [BMAP_NORMAL_MAP] }));
      // map.setCurrentCity("苏州");
      // vm.map.enableScrollWheelZoom(true);
    },
    mapFunction(map) {
      let vm = this;
      var geo = new BMap.Geocoder();
      map.addEventListener('dragend', function(e) {
        let centerPoint = map.getCenter();
        geo.getLocation(centerPoint, function({ surroundingPois: autoComplete, address: address, addressComponents: ac }) {
          if (autoComplete.length) {
            vm.locationList = autoComplete
            vm.formL.ProjectAddress = `${autoComplete[0].title} -- ${autoComplete[0].address}`
            // [vm.shortAddress, vm.longAddress] = [autoComplete[0].title, autoComplete[0].address];
          } else {
            [vm.shortAddress, vm.longAddress] = [ac.city + ac.district + ac.street, address];
          }
          // console.log(autoComplete)
        })
      });
      map.addEventListener('dragging', function(e) {});

    },
    ProvinceIdChange(ProvinceId = this.formL.ProvinceId) {
      let vm = this
      vm.loadingCityIdOpts = true
      vm.formL.ProjectAddress = ''
      let params = {
        ProvinceId,
      }
      let url = URL.CITY
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.formL.CityId = data[0].CityId
            // console.log(vm.formL.CityId)
            vm.CityIdOpts = data
            vm.loadingCityIdOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    CityIdChange(CityId = this.formL.CityId) {
      let vm = this
      vm.loadingDistrictIdOpts = true
      vm.formL.ProjectAddress = ''
      let params = {
        CityId,
      }
      let url = URL.DISTRICT
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.formL.DistrictId = data[0].DistrictId
            vm.DistrictIdOpts = data
            vm.setCityPos()
            vm.loadingDistrictIdOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setCityPos() {
      let vm = this
      let local = new BMap.LocalSearch(vm.cityName, {
        onSearchComplete: (r) => {
          // console.log(r)
          if (r) {
            let point = r.getPoi(0).point
            vm.userPos.lng = point.lng
            vm.userPos.lat = point.lat
            vm.initMap()
          }
        }
      });
      local.search(vm.cityName, { forceLocal: true })
    },
    locationChange() {
      let vm = this
      // console.log(vm.formL.ProjectAddress)
      for (let index in vm.locationList) {
        if (vm.locationList[index].title === vm.formL.ProjectAddress) {
          let point = vm.locationList[index].point
          vm.userPos.lng = point.lng
          vm.userPos.lat = point.lat
          let geoc = new BMap.Geocoder();
          geoc.getLocation(point, function(rs) {
            let addComp = rs.addressComponents;
            // console.log(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber)
            /*for (let index in vm.ProvinceIdOpts) {
              if (addComp.province == vm.ProvinceIdOpts[index].ProvinceName) {
                console.log('found',vm.ProvinceIdOpts[index].ProvinceId)
              }
            }*/
            for (let index in vm.CityIdOpts) {
              if (addComp.city == vm.CityIdOpts[index].CityName) {
                console.log(addComp.city)
                vm.formL.CityId = vm.CityIdOpts[index].CityId
                break
              }
            }
            for (let index in vm.DistrictIdOpts) {
              if (addComp.district == vm.DistrictIdOpts[index].DistrictName) {
                console.log(addComp.district)
                vm.formL.DistrictId = vm.DistrictIdOpts[index].DistrictId
                break
              }
            }
          });
          vm.initMap()
          break
        }
      }
    },
    //加载省
    setProvinceIdOpts(Region = '') {
      let vm = this
      vm.loadingProvinceIdOpts = true
      let params = {
        Region,
      }
      let url = URL.PROVINCE
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.ProvinceIdOpts = data
            vm.loadingProvinceIdOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //加载市
    setCityIdOpts(ProvinceId = this.formL.ProvinceId) {
      let vm = this
      vm.loadingCityIdOpts = true
      let params = {
        ProvinceId,
      }
      let url = URL.CITY
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.CityIdOpts = data
            vm.loadingCityIdOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //加载区
    setDistrictIdOpts(CityId = this.formL.CityId) {
      let vm = this
      vm.loadingDistrictIdOpts = true
      let params = {
        CityId,
      }
      let url = URL.DISTRICT
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.DistrictIdOpts = data
            vm.loadingDistrictIdOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //加载项目负责人
    setProjectLeaderOpts() {
      let vm = this
      vm.loadingProjectLeaderOpts = true
      let params = {
        "AccessToken": FUNC.storage.get('AccessToken'),
      }
      let url = URL.GETCOMPANYUSER
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.ProjectLeaderOpts = data
            vm.loadingProjectLeaderOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },

    //加载所属业主
    setCompanyIdOpts() {
      let vm = this
      vm.loadingCompanyIdOpts = true
      let params = {
        "AccessToken": FUNC.storage.get('AccessToken'),
      }
      let url = URL.GETALLCOMPANY
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.CompanyIdOpts = data
            vm.loadingCompanyIdOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    CompanyIdChange() {
      let vm = this
      vm.loadingProjectLeaderOpts = true
      vm.formL.ProjectLeader = ''
      let params = {
        "AccessToken": FUNC.storage.get('AccessToken'),
        "PageSize": '',
        "PageIndex": '',
        "Parameters": {
          "Keywords": '',
          "CompanyId": vm.formL.CompanyId
        }
      }
      let url = URL.GETHAVEACCOUNTEMPLOYEE
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data.Result
            vm.ProjectLeaderOpts = data
            vm.loadingProjectLeaderOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });

    },
    getRenderProject(isRender) {
      this.renderProject({ isRender: isRender });
    },
    btnReturn() {
      this.UPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
    },

    setIndustryOpts() {
      let vm = this;
      let param = {
        "AccessToken": FUNC.storage.get('AccessToken')
      }
      vm.loadingIndustryOpts = true
      let url = URL.INDUSTRY
      GET(url, param)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.IndustryOpts = res.Data;
            vm.IndustryOpts.shift()
            vm.loadingIndustryOpts = false
            vm.formL.IndustryId = '83ff43dd-5104-11e7-bf75-00163e067ba3';
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    remoteMethod(txt) {
      // if(!txt) return this.locationList = this.isStart ? this.autoComplete : this.hotSpots;
      let vm = this;
      vm.loadingLocationList = true
      // let cityName = (vm.type == 1)? vm.startCity.startCityName:vm.destCity.destCityName;
      let local = new BMap.LocalSearch(vm.cityName, {
        onSearchComplete: (r) => {
          // console.log(r)
          if (r) {
            let number = r.getCurrentNumPois(),
              list = [];
            for (let i = 0; i < number; i++) {
              let unit = r.getPoi(i)
              // console.log(unit)
              unit.title = `${unit.title} -- ${unit.address}`
              // console.log(unit.title + unit.address)
              list.push(unit)
            }
            vm.locationList = list
            vm.loadingLocationList = false
          }
        }
      });
      local.search(txt.trim(), { forceLocal: true })
    },
    getUserPos() {
      let vm = this
      let geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(result) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          let point = result.point
          // vm.userPos.lng = point.lng || vm.userPos.lng
          // vm.userPos.lat = point.lat || vm.userPos.lat
          // console.log(vm.userPos)
          vm.initMap()
        } else {
          console.log('获取定位失败')
        }
      }, { enableHighAccuracy: true })
    },
    initInsertDatas() {
      let vm = this
      if (vm.EntitySort == 2) {
        vm.setCompanyIdOpts()
      } else {
        vm.setProjectLeaderOpts()
      }
      vm.setIndustryOpts();
      vm.setProvinceIdOpts()
      vm.setCityIdOpts()
      vm.setDistrictIdOpts()
      vm.getUserPos()
    },
  },
  mounted() {
    this.EntitySort = FUNC.storage.get('EntitySort');
    this.initInsertDatas();
  }

}

</script>

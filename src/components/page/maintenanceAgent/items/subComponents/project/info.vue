<style scoped="scoped">
.el_mainContent {
  background: #FEFEFE;
  height: 100%;
  position: relative;
  /*overflow: hidden;*/
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

.radio {
  line-height: 10px;
  padding-left: 0;
}

</style>
<template>
  <div class="el_mainContent" style="position:static;" v-loading='loading'>
  		<el-row v-if="other">
        <el-col :span="22">
          <h3>项目信息</h3>
        </el-col>
        <el-col :span="2">
          <el-button class='mb10 fr' size='small'  @click='other.moduleType=0'><i class="fa fa-mail-reply-all mr5"></i>返回 </el-button>
        </el-col>
      </el-row>
      <div v-if="other" class="hr mb10"></div>      
    <div style="overflow:hidden">
      <div class="w40p fl">
        <el-form :model="form" ref="form" :rules="rules" label-width="150px" style='margin:0'>
          <el-form-item label="项目名称：" prop="ProjectName">
            <el-input v-model="form.ProjectName" :maxlength="25"></el-input>
          </el-form-item>
          <el-form-item label="所属行业：">
            <el-select v-model="form.IndustryId" :loading='loadingIndustryOpts' class='w100p'>
              <el-option v-for="item in IndustryOpts" :key="item.IndustryId" :label="item.IndustryName" :value="item.IndustryId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否能耗监测项目：">
            <el-radio class="radio" v-model="form.IsEMProject" :label='1'>是</el-radio>
            <el-radio class="radio" v-model="form.IsEMProject" :label='0'>否</el-radio>
          </el-form-item>
          <el-form-item label="项目介绍：">
            <el-input type="textarea" v-model="form.ProjectIntro" :maxlength="100" :rows='8'></el-input>
          </el-form-item>
          <el-form-item label="合同编号：">
            <el-input v-model="form.ContractNo" :maxlength="25"></el-input>
          </el-form-item>
          <el-form-item label="合同文件：">
            <el-upload class="upload-demo" :action="uploadUrl" :data='uploadData' :multiple='false' :on-success='fileUploadSuccess' :on-remove="fileRemove" :file-list="form.ContractFileList">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <div class="w60p fl">
        <el-form label-width="100px" style='margin-left:50px;margin-right:10px;max-width:600px'>
          <el-form-item label="省、市、区：">
            <div class="w33p fl pr5">
              <el-select v-model="form.ProvinceId" filterable @change='ProvinceIdChange' :loading='loadingProvinceIdOpts'>
                <el-option v-for="item in ProvinceIdOpts" :key="item.ProvinceId" :label="item.ProvinceName" :value="item.ProvinceId">
                </el-option>
              </el-select>
            </div>
            <div class="w33p fl pr5">
              <el-select v-model="form.CityId" filterable @change='CityIdChange' :loading='loadingCityIdOpts'>
                <el-option v-for="item in CityIdOpts" :key="item.CityId" :label="item.CityName" :value="item.CityId">
                </el-option>
              </el-select>
            </div>
            <div class="w33p fl">
              <el-select v-model="form.DistrictId" filterable :loading='loadingDistrictIdOpts'>
                <el-option v-for="item in DistrictIdOpts" :key="item.DistrictId" :label="item.DistrictName" :value="item.DistrictId">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label="具体地址：">
            <el-select @change='locationChange' v-model="form.ProjectAddress" class='w100p' filterable remote reserve-keyword placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loadingLocationList">
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
                  <img v-if="form.ProjectLogo.FileUrl" :src="form.ProjectLogo.FileUrl" class="avatar">
                  <span v-if="form.ProjectLogo.FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delProjectLogo'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.ProjectLogo.FileUrl)'></i>
                  </span>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class='curd'>项目LOGO</span>
              </div>
              <div class="logoWrap fl mr15">
                <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setCoverPhoto" :before-upload="beforeImgUpload">
                  <img v-if="form.CoverPhoto.FileUrl" :src="form.CoverPhoto.FileUrl" class="avatar">
                  <span v-if="form.CoverPhoto.FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delCoverPhoto'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.CoverPhoto.FileUrl)'></i>
                  </span>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class='curd'>项目封面</span>
              </div>
              <div class="logoWrap fl mr15">
                <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setLivePhotos0" :before-upload="beforeImgUpload">
                  <img v-if="form.LivePhotos[0].FileUrl" :src="form.LivePhotos[0].FileUrl" class="avatar">
                  <span v-if="form.LivePhotos[0].FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delLivePhotos(0)'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.LivePhotos[0].FileUrl)'></i>
                  </span>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class='curd'>现场图片1</span>
              </div>
              <div class="logoWrap fl mr15">
                <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setLivePhotos1" :before-upload="beforeImgUpload">
                  <img v-if="form.LivePhotos[1].FileUrl" :src="form.LivePhotos[1].FileUrl" class="avatar">
                  <span v-if="form.LivePhotos[1].FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delLivePhotos(1)'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.LivePhotos[1].FileUrl)'></i>
                  </span>
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <span class='curd'>现场图片2</span>
              </div>
              <div class="logoWrap fl">
                <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setLivePhotos2" :before-upload="beforeImgUpload">
                  <img v-if="form.LivePhotos[2].FileUrl" :src="form.LivePhotos[2].FileUrl" class="avatar">
                  <span v-if="form.LivePhotos[2].FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delLivePhotos(2)'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(form.LivePhotos[2].FileUrl)'></i>
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
    <div v-if="!other" class="" style="height: 50px;line-height:50px;text-align:center">
      <el-button size='small' type="primary" style='padding-left:20px;padding-right:20px' @click='submitForm'>确定</el-button>
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
      advoidChange: true,
      pointSty: {
        'backgroundImage': `url(${pointPng})`
      },
      EntitySort: 1,
      loading: false,
      form: {
        IsEMProject: 0,
        ProjectId: '',
        ProjectName: '',
        ProjectIntro: '',
        ProjectLeader: '',
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
        ContractFileName: '',
        ProjectLoaction: {
          Latitude: '',
          Longitude: ''
        }
      },

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
        ProjectName: [
          { required: true, message: '请输入项目名称', trigger: 'change' }
        ]
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
  props: ['propsData','other'],
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
        if (vm.CityIdOpts[index].CityId === vm.form.CityId) {
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
        if (vm.DistrictIdOpts[index].DistrictId === vm.form.DistrictId) {
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
      // UPDATE_SHOWWHICHTAB: 'UPDATE_SHOWWHICHTAB'
    }),
    submitForm() {
      let vm = this
      vm.$refs.form.validate((valid) => {
        if (valid) {
          vm.projectUpdate()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    projectUpdate() {
      let vm = this;
      vm.loading = true
      let form = vm.form
      let url = URL.UPDATE
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
          "ProjectId": form.ProjectId, //--项目ID
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
          vm.$message.success("项目更新成功");
          // vm.UPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
        } else {
          vm.loading = false
        }
      })
    },
    showBigPic(url) {
      this.isShowBigPic = true
      this.bigPicUrl = url
    },

    setProjectLogo(res, file) {
      this.form.ProjectLogo.FileId = res.Data[0].ResourceId
      this.form.ProjectLogo.FileUrl = file.url;
    },
    delProjectLogo() {
      this.form.ProjectLogo.FileId = ''
      this.form.ProjectLogo.FileUrl = ''
    },

    setCoverPhoto(res, file) {
      this.form.CoverPhoto.FileId = res.Data[0].ResourceId
      this.form.CoverPhoto.FileUrl = file.url;
    },
    delCoverPhoto() {
      this.form.CoverPhoto.FileId = ''
      this.form.CoverPhoto.FileUrl = ''
    },

    setLivePhotos0(res, file) {
      this.form.LivePhotos[0].FileId = res.Data[0].ResourceId
      this.form.LivePhotos[0].FileUrl = file.url;
    },
    setLivePhotos1(res, file) {
      this.form.LivePhotos[1].FileId = res.Data[0].ResourceId
      this.form.LivePhotos[1].FileUrl = file.url;
    },
    setLivePhotos2(res, file) {
      this.form.LivePhotos[2].FileId = res.Data[0].ResourceId
      this.form.LivePhotos[2].FileUrl = file.url;
    },

    delLivePhotos(index) {
      this.form.LivePhotos[index].FileId = ''
      this.form.LivePhotos[index].FileUrl = ''
    },
    //资源上传
    fileUploadSuccess(res) {
      let data = res.Data[0]
      let vm = this
      if (vm.form.ContractFileId) vm.deleteRes(vm.form.ContractFileId)
      vm.form.ContractFileId = data.ResourceId
      vm.form.ContractFileName = data.OriginalResourceName
      // console.log(vm.form.ContractFileList)
      vm.form.ContractFileList = [{
        name: data.OriginalResourceName,
        url: ''
      }]
    },
    fileRemove(file, fileList) {
      let vm = this
      vm.form.ContractFileList = []
      vm.deleteRes(vm.form.ContractFileId).then(function(res) {
        if (res.data.State == 0) {
          vm.form.ContractFileId = ''
          vm.form.ContractFileName = ''
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
      vm.map = new BMap.Map("user-map", { enableMapClick: false });
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
            vm.form.ProjectAddress = `${autoComplete[0].title} -- ${autoComplete[0].address}`
            // [vm.shortAddress, vm.longAddress] = [autoComplete[0].title, autoComplete[0].address];
          } else {
            [vm.shortAddress, vm.longAddress] = [ac.city + ac.district + ac.street, address];
          }
          // console.log(autoComplete)
        })
      });
      map.addEventListener('dragging', function(e) {});

    },
    ProvinceIdChange(ProvinceId = this.form.ProvinceId) {
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
            // console.log(vm.advoidChange)
            if (!vm.advoidChange) {
              vm.form.ProjectAddress = ''
              vm.form.CityId = data[0].CityId
            }
            // console.log(vm.form.CityId)
            vm.CityIdOpts = data
            vm.loadingCityIdOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    CityIdChange(CityId = this.form.CityId) {
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
            if (!vm.advoidChange) {
              vm.form.ProjectAddress = ''
              vm.form.DistrictId = data[0].DistrictId
              vm.setCityPos()
            }
            vm.DistrictIdOpts = data
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
      // console.log('locationChange')
      if (!vm.advoidChange) {
        for (let index in vm.locationList) {
          if (vm.locationList[index].title === vm.form.ProjectAddress) {
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
                  vm.form.CityId = vm.CityIdOpts[index].CityId
                  break
                }
              }
              for (let index in vm.DistrictIdOpts) {
                if (addComp.district == vm.DistrictIdOpts[index].DistrictName) {
                  console.log(addComp.district)
                  vm.form.DistrictId = vm.DistrictIdOpts[index].DistrictId
                  break
                }
              }
            });
            vm.initMap()
            break
          }
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
    setCityIdOpts(ProvinceId = this.form.ProvinceId) {
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
    setDistrictIdOpts(CityId = this.form.CityId) {
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

    getRenderProject(isRender) {
      this.renderProject({ isRender: isRender });
    },
    btnSure() {
      let vm = this;
      if (!verifyCheck._click("verifyCheck_0")) {
        return false;
      }
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
            // vm.form.IndustryId = '83ff43dd-5104-11e7-bf75-00163e067ba3';
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
    setProjectData() {
      // console.log(this.propsData)
      let vm = this
      let prop = vm.propsData
      let form = vm.form
      for (let index in form) {
        // console.log(index, prop[index])
        if (index == 'ProjectLogo') {
          form.ProjectLogo.FileUrl = prop.ProjectLogoUrl
          form.ProjectLogo.FileId = prop.ProjectLogo
          continue
        }
        if (index == 'CoverPhoto') {
          form.CoverPhoto.FileUrl = prop.CoverPhotoUrl
          form.CoverPhoto.FileId = prop.CoverPhoto
          continue
        }
        if (index == 'LivePhotos') {
          for (let j in prop.LivePhotos) {
            form.LivePhotos[j].FileUrl = prop.LivePhotos[j].ResourceUrl
            form.LivePhotos[j].FileId = prop.LivePhotos[j].ResourceId
          }
          continue
        }
        if (index == 'ContractFileList' && prop.ContractFileId) {
          form.ContractFileList = [{
            name: prop.ContractFileName,
            url: prop.ContractFileIdUrl
          }]
          continue
        }
        if (index == 'ProjectLoaction') {
          vm.userPos.lng = form.ProjectLoaction.Longitude || 116.38
          vm.userPos.lat = form.ProjectLoaction.Latitude || 39.90
          continue
        }
        if (index == 'IsEMProject') {
          form[index] = prop[index]
          continue
        }
        form[index] = prop[index] || ''
      }
      // vm.advoidChange = false
      // console.log(form)
      vm.userPos.lng = prop.ProjectLocation.Longitude || 116.38
      vm.userPos.lat = prop.ProjectLocation.Latitude || 39.90

    },
    initInsertDatas() {
      let vm = this
      vm.setProjectData();
      vm.setIndustryOpts();
      vm.setProvinceIdOpts()
      vm.setCityIdOpts()
      vm.setDistrictIdOpts()
      // vm.getUserPos()
      setTimeout(function () {
        vm.initMap()
        vm.advoidChange = false
      }, 500)
    },
  },
  mounted() {
    this.EntitySort = FUNC.storage.get('EntitySort');
    this.initInsertDatas();
  }

}

</script>

<style scoped>
  
</style>
<template>
  <!--新增项目开始-->
  <div id="addItem" class="card-box table-responsive" style='overflow:auto;height:100%;'>
    <div class="row">
      <div class="col-md-6">
        <span class="size20 font-bold view-title">新增项目</span>
      </div>
      <div class="col-md-6">
        <button @click="btnReturn()" type="button" class="btn btn-white waves-effect waves-light pull-right">
          <i class="fa fa-mail-reply-all m-r-5"></i>返回
        </button>
      </div>
    </div>
    <hr class="divider mb-10 mt-10">
    <div class="row">
      <div class="col-lg-12">
        <!--手动录入开始-->
        <div id="verifyCheck_1">
          <div class="form-horizontal content-box">
            <div class="form-group">
              <label class="content-title-left">
                <em class="ak_required_em">*</em>所属业主：
              </label>
              <div class="col-lg-6 col-xs-6">
                <select @change="ownerSelectedChanges()" id="ownerSelected" style="width: 100%;" v-model="OwnerCompanyId" class="form-control selectpicker" data-style="btn-white" data-live-search="true" data-size="8">
                  <option value="">请选择项目所属业主</option>
                  <option v-for='item in enterprise' :value="item.CompanyId">{{item.CompanyName}}</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="content-title-left"><em class="ak_required_em">*</em>项目名称:</label>
              <div class="col-lg-6 col-xs-6">
                <span class="valid-form-group">
                                              <label id="lblNameMag" class="focus valid"></label>
                                          </span>
                <input id="txtProjectName" v-model="projectName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty" data-error="项目名称不能为空" placeholder="请输入项目名称" />
                <span class="ie8 ion-close-circled close hide text-danger valid-input-icon"></span>
                <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
              </div>
            </div>
            <div class="form-group">
              <label class="content-title-left"><em class="ak_required_em">*</em>所属行业</label>
              <div class="col-lg-6 col-xs-6">
                <select id="IndustrySelect" v-model="IndustryId" class="form-control selectpicker input-sm " data-style="btn-white" data-live-search="true" data-size="8">
                  <option v-for="item in IndustryData" :value="item.IndustryId">
                    {{item.IndustryName}}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label class="content-title-left">
                <em class="ak_required_em">*</em>省、市、区:
              </label>
              <div class="col-lg-2 col-xs-3">
                <select id="province" class="form-control selectpicker" data-size="8" data-style="btn-white" tabindex="-98"></select>
              </div>
              <div class="col-lg-2 col-xs-3">
                <select id="city" class="form-control selectpicker" data-size="8" data-style="btn-white" tabindex="-98"></select>
              </div>
              <div class="col-lg-2 col-xs-3">
                <select id="district" class="form-control selectpicker" data-size="8" data-style="btn-white" tabindex="-98"></select>
              </div>
            </div>
            <div class="form-group">
              <label class="content-title-left">街道地址:</label>
              <div class="col-lg-6 col-xs-9">
                <input id="txtProjectAddress" v-model="ProjectAddress" type="text" maxlength="100" class="form-control" placeholder="请输入街道地址" />
              </div>
            </div>
            <div class="form-group">
              <label class="content-title-left"><em class="ak_required_em">*</em>项目负责人</label>
              <div class="col-lg-6 col-xs-9">
                <select-employee :propsdata="projectLeaderData" title="选择项目负责人"></select-employee>
                <span class="input-group"><!--:value="projectLeaderData.name"-->
              <input id="projectLeader" v-model="projectLeaderData.name" class="form-control required" type="text" data-valid="isNonEmpty" data-error="项目负责人不能为空"  readonly placeholder="请选择项目负责人" disabled="disabled">
              <div style="position: absolute;" class="select_tips2">
                  <span class="valid-form-group-addon">
                      <label class="focus valid"></label>
                  </span>
              </div>
              <span @click="selectEmployee()" class="input-group-addon cursor" data-toggle="modal"><span class="fa fa-bars"></span></span>
              </span>
            </div>
          </div>
          <div class="form-group">
            <label class="content-title-left">项目LOGO:</label>
            <div class="col-lg-6 col-xs-9">
              <div id="imgBox1"></div>
              <label id="lblResourceId3" style="display:none;"></label>
            </div>
          </div>
          <div class="form-group">
            <label class="content-title-left">项目封面:</label>
            <div class="col-lg-6 col-xs-9">
              <div id="imgBox2"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="content-title-left">现场照片:</label>
            <div class="col-lg-6 col-xs-9">
              <div id="imgBox3"></div>
            </div>
          </div>
          <div class="form-group">
            <label class="content-title-left">项目介绍:</label>
            <div class="col-lg-6 col-xs-9">
              <textarea id="txtProjectIntro" v-model="txtProjectIntro" maxlength="100" class="form-control" placeholder="请输入项目介绍"></textarea>
            </div>
          </div>
          <el-form ref="insertForm3" :model="insertForm" label-width="150px">
            <el-form-item label="合同编号：">
              <el-input v-model="insertForm.ContractNo" style='width:50%'></el-input>
            </el-form-item>
            <el-form-item label="合同文件：">
              <el-upload class="upload-demo w300" ref="contractFileUpload" :action="uploadUrl" :data='uploadData' :multiple='false' :on-success='handleSuccessContractFile' :on-remove="handleRemoveContractFile" :file-list="insertForm.ContractFileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip"></div>
              </el-upload>
            </el-form-item>
          </el-form>
          <div class="form-group">
            <label class="content-title-left"></label>
            <div class="col-lg-5 col-xs-8 pl-22">
              <button @click="btnInputInfoSave()" type="submit" class="btn btn-default pull-left">确定</button>
            </div>
          </div>
        </div>
        <!--手动录入结束-->
      </div>
    </div>
  </div>
  </div>
  <!--添加项目结束-->
</template>
<script>
import selectEmployee from 'components/common/select-employee.vue';
import {mapMutations } from 'vuex'
export default {
  data() {
    return {
      AccessToken: eosCommon.storage.get('AccessToken'),
      enterprise: [],
      projectName: '',
      ProjectAddress: '',
      txtProjectIntro: '',
      projectLeaderData: {
        "id": "",
        "name": "",
        'UserId': '',
        'flag': '1',
        "CompanyId": ''
      },
      FResourceIds: '',
      FimgUrls: '',
      XResourceIds: [],
      LResourceIds: '',
      LimgUrls: '',
      OwnerCompanyId: '',
      IndustryId: '',
      IndustryData: [],
      //合同文件
      insertForm: {
        ContractNo: '',
        ContractFileList: [],
        ContractFileId: '',
        ContractFileName: ''
      },
      uploadUrl: eosCommon.RESOURCES_API + 'api/resource/upload', //上传资源url
    }
  },
  computed: {
    uploadData() {
      return {
        "AccessToken": this.AccessToken,
        "ResourceType": "2",
        "Title": "合同附件",
        "Description": "合同附件"
      }
    }
  },
  watch: {
  },
  components: {
    selectEmployee
  },
  props: {
    showWhichTab: [Number,String],
  },
  methods: {
  	...mapMutations({
				uPDATE_SHOWWHICHTAB:'UPDATE_SHOWWHICHTAB'
			}),
    btnReturn() {
      var vm = this;
      this.uPDATE_SHOWWHICHTAB({showWhichTab:1})
      vm.IndustryId = '';
      vm.$nextTick(() => {
        $('#queryIndustrySelect').selectpicker('refresh');
      });
    },
    btnInsert() {
      var vm = this,
        fielId = [],
        urlId = [];
      vm.initInsertDatas();
      for (let i = 0; i < vm.XResourceIds.length; i++) {
        fielId.push(vm.XResourceIds[i].FileId);
        urlId.push(vm.XResourceIds[i].FileUrl);
      }
      vm.initUpload(vm.FResourceIds, vm.FimgUrls, fielId, urlId, vm.LResourceIds, vm.LimgUrls);
    },
    enterpriseList: function() {
      //企业列表
      var vm = this;
      var param = {
        "AccessToken": vm.AccessToken,
      };
      var url = eosCommon.COMMON_API + "api/Company/GetAllCompany";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          console.log('企业列表数据：', result);
          vm.enterprise = result.Data;

          vm.$nextTick(function() {
            $("#enterprise").selectpicker('refresh');
            $('#ownerSelected').selectpicker('refresh');
          });

        }
      });
    },
    initInsertDatas: function() {
      var vm = this;
      eosCommon.cityLinage.init("", "", "");
      $("#province,#city,#district").selectpicker("refresh");
      vm.projectLeaderData.id = "";
      vm.projectLeaderData.name = "";
      vm.FResourceIds = '';
      vm.FimgUrls = '';
      vm.XResourceIds = [];
      vm.LResourceIds = '';
      vm.LimgUrls = '';
      vm.projectName = '';
      vm.ProjectAddress = '';
      vm.txtProjectIntro = '';
      vm.OwnerCompanyId = '';
      $('#ownerSelected').selectpicker('refresh');
      vm.IndustryId = '83ff43dd-5104-11e7-bf75-00163e067ba3';
      vm.$nextTick(() => {
        $('#IndustrySelect').selectpicker('refresh');
      });
      vm.insertForm = {
        ContractNo: '',
        ContractFileList: [],
        ContractFileId: '',
        ContractFileName: ''
      }
      vm.uploadBtnShowAndHide(undefined, '')
      //vm.handleRemoveContractFile();
    },
    //控制资源上传按钮隐藏和显示
    uploadBtnShowAndHide(refName = 'contractFileUpload', string = '') {
      let el = this.$refs[refName].$el
      let el1 = el.childNodes[0]
      let el2 = el.childNodes[1]
      el1.style.display = string;
      el2.style.display = string;
    },
    handleSuccessContractFile(res) {
      let data = res.Data[0]
      if (this.insertForm.ContractFileId) this.deleteRes(this.insertForm.ContractFileId)
      console.log('dat：', data);
      this.insertForm.ContractFileId = data.ResourceId
      this.insertForm.ContractFileName = data.OriginalResourceName
      //当提交一张图片后隐藏上传按钮
      this.uploadBtnShowAndHide(undefined, 'none')
    },
    handleRemoveContractFile(file, fileList) {
      let vm = this
      console.log(vm.insertForm.ContractFileList)
      vm.insertForm.ContractFiles = []
      vm.uploadBtnShowAndHide(undefined, '')
      vm.deleteRes(vm.insertForm.ContractFileId).then(function(res) {
        if (res.data.State == 0) {
          vm.insertForm.ContractFileId = ''
          vm.insertForm.ContractFileName = ''
        }
      })
    },
    initUpload: function(FResourceIds, FimgUrls, XResourceIds, XimgUrls, LResourceIds, LimgUrls) {
      var vm = this;
      //封面
      $("#imgBox1").empty();
      $("#imgBox1").html(
        '<div class="uploader_img1 eos_uploader_img">' +
        '<div class="queueList">' +
        '<div id="dndArea" class="placeholder">' +
        '<div id="filePickerImg1">点击选择图片</div>' +
        '</div>' +
        '<ul class="filelist clearfix"></ul>' +
        '</div>' +
        '<div class="statusBar" style="display:none;">' +
        '<div class="btns">' +
        '<div id="continueImgBtn1"></div><div class="uploadBtn">开始上传</div>' +
        '</div>' +
        '<div class="info"></div>' +
        '</div>' +
        '</div>'
      );
      //现场
      $("#imgBox2").empty();
      $("#imgBox2").html(
        '<div class="uploader_img2 eos_uploader_img">' +
        '<div class="queueList">' +
        '<div id="dndArea" class="placeholder">' +
        '<div id="filePickerImg2">点击选择图片</div>' +
        '</div>' +
        '<ul class="filelist clearfix"></ul>' +
        '</div>' +
        '<div class="statusBar" style="display:none;">' +
        '<div class="btns">' +
        '<div id="continueImgBtn2"></div><div class="uploadBtn">开始上传</div>' +
        '</div>' +
        '<div class="info"></div>' +
        '</div>' +
        '</div>'
      );
      //logo
      $("#imgBox3").empty();
      $("#imgBox3").html(
        '<div class="uploader_img3 eos_uploader_img">' +
        '<div class="queueList">' +
        '<div id="dndArea" class="placeholder">' +
        '<div id="filePickerImg3">点击选择图片</div>' +
        '</div>' +
        '<ul class="filelist clearfix"></ul>' +
        '</div>' +
        '<div class="statusBar" style="display:none;">' +
        '<div class="btns">' +
        '<div id="continueImgBtn3"></div><div class="uploadBtn">开始上传</div>' +
        '</div>' +
        '<div class="info"></div>' +
        '</div>' +
        '</div>'
      );
      var param = {
        "AccessToken": vm.AccessToken,
        "ResourceType": "0",
        "Title": "封面",
        "Description": "封面"
      };
      eosCommon.eosUploaderImg({
        'uploaderObj': 'uploaderImg1',
        'uploaderBox': '.uploader_img1',
        'uploaderList': '.queueList',
        'initBtn': '#filePickerImg1',
        'continueBtn': '#continueImgBtn1',
        'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
        'data': param,
        'fileNumLimit': 1,
        'fileSingleSizeLimit': 3 * 1024 * 1024,
        'ResourceIds': LResourceIds,
        'imgUrls': LimgUrls,
        'succ': function(result) {
          vm.LResourceIds = result.Data[0].ResourceId;
        },
        'del': function(result) {
          if (result != "") {
            var param = {
              "AccessToken": vm.AccessToken,
              "Parameters": {
                "ResourceId": result,
                "ResourceType": "0"
              }
            };
            var url = eosCommon.RESOURCES_API + "api/resource/delete";
            eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
              if (eosCommon.checkCode(result.State, result.Message)) {}
            });
          }
        }
      });
      eosCommon.eosUploaderImg({
        'uploaderObj': 'uploaderImg2',
        'uploaderBox': '.uploader_img2',
        'uploaderList': '.queueList',
        'initBtn': '#filePickerImg2',
        'continueBtn': '#continueImgBtn2',
        'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
        'data': param,
        'fileNumLimit': 1,
        'fileSingleSizeLimit': 3 * 1024 * 1024,
        'ResourceIds': FResourceIds,
        'imgUrls': FimgUrls,
        'succ': function(result) {
          vm.FResourceIds = result.Data[0].ResourceId;

        },
        'del': function(result) {
          //删除资源ID对应的文件
          if (result != "") {
            var param = {
              "AccessToken": vm.AccessToken,
              "Parameters": {
                "ResourceId": result,
                "ResourceType": "0"
              }
            };
            var url = eosCommon.RESOURCES_API + "api/resource/delete";
            eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
              if (eosCommon.checkCode(result.State, result.Message)) {}
            });
          }
        }
      });
      eosCommon.eosUploaderImg({
        'uploaderObj': 'uploaderImg3',
        'uploaderBox': '.uploader_img3',
        'uploaderList': '.queueList',
        'initBtn': '#filePickerImg3',
        'continueBtn': '#continueImgBtn3',
        'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
        'data': param,
        'fileNumLimit': 3,
        'fileSingleSizeLimit': 3 * 1024 * 1024,
        'ResourceIds': XResourceIds,
        'imgUrls': XimgUrls,
        'succ': function(result) {
          vm.XResourceIds.push(result.Data[0].ResourceId);

        },
        'del': function(result) {
          //删除资源ID对应的文件
          if (result != "") {
            var param = {
              "AccessToken": vm.AccessToken,
              "Parameters": {
                "ResourceId": result,
                "ResourceType": "0"
              }
            };
            var url = eosCommon.RESOURCES_API + "api/resource/delete";
            eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
              if (eosCommon.checkCode(result.State, result.Message)) {}
            });
          }
        }
      });
      /*项目封面——结束*/
    },
    ownerSelectedChanges() {
      this.projectLeaderData.CompanyId = this.OwnerCompanyId;
      this.projectLeaderData.name = '';
      this.projectLeaderData.UserId = '';
    },
    getIndustry() {
      let vm = this;
      let param = {
        "AccessToken": vm.AccessToken
      }
      let url = eosCommon.ENTERPRISE_API + 'api/common/industry';
      eosCommon.eosAjax(url, "get", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.IndustryData = result.Data;
          vm.$nextTick(() => {
            $('#IndustrySelect').selectpicker('refresh');
            $('#queryIndustrySelect').selectpicker('refresh');
          });
        }
      });
    },
    cityselect: function() {
      $("#province").change(function() {
        eosCommon.cityLinage.getCity($("#province").selectpicker('val'), function() {
          eosCommon.cityLinage.getDistrict($("#city").selectpicker('val'))
        })
      })
      $("#city").change(function() {
        eosCommon.cityLinage.getDistrict($("#city").selectpicker('val'));
      });
    },
    selectEmployee() {
      if (this.OwnerCompanyId == '') {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '请先选择项目所属业主！',
          ok: function() {

          },
          cancel: true,
          modal: true
        });
        return false;
      }
      $('#modal-employee').modal('show');
    },
    btnInputInfoSave() {
      var vm = this;
      if (!verifyCheck._click("verifyCheck_1")) {
        return false;
      }
      var param = {
        "AccessToken": vm.AccessToken,
        "Parameters": {
          "ProjectName": vm.projectName, //--项目名称(必填)
          "ProjectIntro": vm.txtProjectIntro, //--项目描述
          "ProvinceId": $("#province").selectpicker('val'), //--省Id(必填)
          "CityId": $("#city").selectpicker('val'), //-市Id(必填)
          "DistrictId": $("#district").selectpicker('val'), //--区Id(必填)vm.DistrictId
          "ProjectLeader": vm.projectLeaderData.UserId, // --项目负责人Id(必填)
          "ProjectLogo": vm.LResourceIds, //--logo
          "CoverPhoto": vm.FResourceIds, //--项目形象图片
          "LivePhotos": vm.XResourceIds, //现场图片，json格式,
          "ProjectAddress": vm.ProjectAddress,
          "OwnerCompanyId": vm.OwnerCompanyId,
          "IndustryId": vm.IndustryId,
          "ContractNo": vm.insertForm.ContractNo,
          "ContractFileId": vm.insertForm.ContractFileId,
          "ContractFileName": vm.insertForm.ContractFileName,
        }
      }
      var url = eosCommon.ENTERPRISE_API + 'api/project/insert';
      eosCommon.eosAjax(url, "Post", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
          vm.IndustryId = '';
          $('#queryIndustrySelect').selectpicker('refresh');
          vm.$emit('update:showWhichTab', 1)
        }
      });
    },
  },
  mounted() {
    var vm = this;
    vm.btnInsert()
    vm.getIndustry();
    vm.enterpriseList();
    vm.cityselect();
  },
  beforeDestroy() {
  }
}
</script>

<template>
  <div>
    <div id="modal-device-list" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-content" style="z-index: 99999;">
        <div class="modal-header">
          <button type="button" class="win-close" data-dismiss="modal">×</button>
          <button type="button" class="sava" v-on:click="getSelectedData()"><i class='fa fa-save m-r-5'></i>确定</button>
          <h4 class="modal-title">选择设备</h4>
        </div>
        <div>
          <div class="modal-body p-20">
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>品牌名称：</span>
                  <div class="col-sm-8 text-muted">
                    <select @change="bandChange()" id="BandSelect" v-model="BrandId" class="form-control selectpicker" data-style="btn-white">
                      <option value="">筛选品牌</option>
                      <option v-for="item in BandDatas" :value="item.BrandId">{{item.BrandName}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>设备种类：</span>
                  <div class="col-sm-8 text-muted">
                    <select id="EquipmentTypeSelect" @change="EquipmentTypeChange()" v-model="EquipmentTypeId" class="form-control selectpicker" data-style="btn-white">
                      <option value="">筛选种类</option>
                      <option :value="item.EquipmentTypeId" v-for="item in EquipmentTypeArr">{{item.TypeName}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>设备大类：</span>
                  <div class="col-sm-8 text-muted">
                    <select id="BigCategorySelect" @change="BigCategoryChange()" v-model="BigCategoryId" class="form-control selectpicker" data-style="btn-white">
                      <option value="">筛选大类</option>
                      <option :value="item.EquipmentClassId" v-for="item in BigCategoryDatas">{{item.EquipmentClassName}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>设备小类：</span>
                  <div class="col-sm-8 text-muted">
                    <select id="SmallCategorySelect" v-model="SmallCategoryId" @change="SmallCategoryChange()" class="form-control selectpicker" data-style="btn-white">
                      <option value="">筛选小类</option>
                      <option :value="item.EquipmentClassId" v-for="item in SmallCategoryDatas">{{item.EquipmentClassName}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>设备型号：</span>
                  <div class="col-sm-8 text-muted">
                    <select id="ProductTypeSelect" v-model="ProductTypeName" @change="ProductTypeChange()" class="form-control selectpicker" data-style="btn-white">
                      <option value="">筛选型号</option>
                      <option :value="item.ProductTypeName" v-for="item in ProductTypeDatas">{{item.ProductTypeName}}</option>

                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em"></em>固件版本号：</span>
                  <div class="col-sm-8 text-muted">
                    <select id="FirmwareVersion" class="form-control selectpicker" data-style="btn-white">
                      <option value="">筛选固件版本号</option>
                      <option :value="item.FirmwareVersion" v-for="item in FirmwareVersionDatas">{{item.FirmwareVersion}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <div class="form-group">
                  <span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>上传图片：</span>
                  <div id="EquipmentLogo" class="col-sm-8 text-muted">
                    <div class="eos_uploader_img" style="text-align: center;width: 210px;height: 157px;">
                      <img style="width: 210px;height: 157px;" class="img-responsive img-thumbnail" v-lazy="GalleryCover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data: function() {
      return {
        EquipmentLogoId: '',
        EquipmentLogoUrl: '',
        FirmwareVersion: '',
        detailData: '',
        //品牌变量

        BandDatas: [],
        BrandId: '',
        //种类变量
        EquipmentTypeId: '',
        EquipmentTypeArr: [],
        //大类变量
        BigCategoryId: '',
        BigCategoryDatas: [],
        //小类变量
        SmallCategoryId: '',
        SmallCategoryDatas: [],

        //型号变量
        ProductTypeDatas: [],
        ProductTypeId: '',
        ProductTypeName: '',
        GalleryCover: '',
        //版本号
        FirmwareVersionDatas: [],
        FirmwareVersion: '',
        //其它
        isFirstLoading: true

      }
    },
    props: ['deviceData'],
    methods: {
      getSelectedData: function() {
        this.testValData = '777';
        if(!this.detailData) {
          vdialog({
            type: 'confirm',
            title: '提示',
            content: '请填写完整设备数据或该设备数据不完整，请在设备库中完善后重新在试!',
            ok: function() {},
            cancel: true,
            modal: true
          });
          return false;
        }
        $('#modal-device-list').modal('hide');
        this.deviceData.FirmwareVersion = this.FirmwareVersion;
        this.deviceData.PhotoId = this.EquipmentLogoId;
        this.deviceData.PhotoUrl = this.EquipmentLogoUrl;
        this.deviceData.EquipmentTypeId = this.EquipmentTypeId;
        this.deviceData.deviceDetail = this.detailData;
      },
      initData: function() {
        let vm = this;
        //$("#deviceLogo").hide();
        //$("#imgBox1").show();
        vm.detailData = '';
        vm.EquipmentLogoId = '';
        vm.EquipmentLogoUrl = '';
        vm.FirmwareVersion = '';
        //vm.detailData= '';
        //品牌变量

        //vm.BrandId='';
        //种类变量
        //vm.EquipmentTypeId='';
        //vm.EquipmentTypeArr= [];
        //大类变量
        vm.BigCategoryId = '';
        vm.BigCategoryDatas = [];
        //小类变量
        vm.SmallCategoryId = '';
        vm.SmallCategoryDatas = [];

        //型号变量
        vm.ProductTypeDatas = [];
        vm.ProductTypeId = '';
        vm.ProductTypeName = '';
        vm.GalleryCover = '';
        //版本号
        vm.FirmwareVersionDatas = [];
        vm.FirmwareVersion = '';
        //其它
        vm.isFirstLoading = true;
        vm.$nextTick(() => {
          $("#BandSelect").selectpicker('refresh');
          $('#BigCategorySelect').selectpicker('refresh');
          $('#EquipmentTypeSelect').selectpicker('refresh');
          $('#SmallCategorySelect').selectpicker('refresh');
          $("#FirmwareVersion").selectpicker('refresh');
          $("#ProductTypeSelect").selectpicker('refresh');

        });
      },
      getBandDatas() { //获取品牌数据
        let vm = this,
          param = {
            "AccessToken": eosCommon.storage.get('AccessToken')
          },
          url = eosCommon.COMMON_API + 'api/common/brand';
        eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.BandDatas = result.Data;
            vm.$nextTick(() => {
              $("#BandSelect").selectpicker('refresh');
            });
          }
        });
      },
      getEquipmentType() { //获取种类数据
        var _this = this;
        eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/GetEquipmentType", "Get", {
          "AccessToken": eosCommon.storage.get("AccessToken"),
        }, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            _this.EquipmentTypeArr = result.Data;
            _this.EquipmentTypeId = '';
            _this.initData();
            _this.$nextTick(() => {
              $('#EquipmentTypeSelect').selectpicker('refresh');
            });
          }
        });
      },
      getBigCategoryDatas() { //获取大类
        var vm = this;
        eosCommon.eosAjax(
          eosCommon.COMMON_API + 'api/common/EquipmentClassLinkage',
          "Get", {
            "AccessToken": eosCommon.storage.get('AccessToken'),
            "PageIndex": 0,
            "PageSize": 0,
            "Parameters": {
              "BrandId": vm.BrandId,
              "EquipmentTypeId": vm.EquipmentTypeId,
              "EquipmentClassId": vm.BigCategoryId //为空时获取大类，否则获取小类
            }
          },
          "json",
          function(result) {
            if(eosCommon.checkCode(result.State, result.Message)) {
              if(vm.BigCategoryId == '') {
                vm.BigCategoryDatas = result.Data;
                vm.BigCategoryId = vm.BigCategoryDatas[0].EquipmentClassId;
                vm.$nextTick(() => {
                  $('#BigCategorySelect').selectpicker('refresh');
                });
              } else {
                if(result.Data.length == 0) {
                  vm.SmallCategoryDatas = result.Data;
                  vm.SmallCategoryId = '';
                  vm.$nextTick(() => {
                    $('#SmallCategorySelect').selectpicker('refresh');
                  });
                  return;
                }
                vm.SmallCategoryDatas = result.Data;
                vm.SmallCategoryId = vm.SmallCategoryDatas[0].EquipmentClassId;
                vm.$nextTick(() => {
                  $('#SmallCategorySelect').selectpicker('refresh');
                });
              }
            }
          })
      },
      getProductTypeDatas() { //获取设备型号数据
        var vm = this;
        eosCommon.eosAjax(
          eosCommon.PLATFORM_API + 'api/base/ImageGallery',
          "Get", {
            "AccessToken": eosCommon.storage.get('AccessToken'),
            "PageIndex": 0,
            "PageSize": 0,
            "Parameters": {
              "BrandId": vm.BrandId,
              "BigCategoryId": vm.BigCategoryId,
              "SmallCategoryId": vm.SmallCategoryId,
              "ProductTypeId": ""
            }
          },
          "json",
          function(result) {
            if(eosCommon.checkCode(result.State, result.Message)) {
              if(result.Data instanceof Array) {
                //数据为空
                vm.ProductTypeDatas = [];
                vm.ProductTypeName = '';
                vm.$nextTick(() => {
                  $("#ProductTypeSelect").selectpicker('refresh');
                });
                return;
              }
              vm.ProductTypeDatas = result.Data.Result;
              vm.ProductTypeName = vm.ProductTypeDatas[0].ProductTypeName;
              vm.$nextTick(() => {
                $("#ProductTypeSelect").selectpicker('refresh');
              });
            }
          })
      },
      getFirmwareVersionDatas() { //获取设备型号数据
        var vm = this;
        eosCommon.eosAjax(
          eosCommon.PLATFORM_API + 'api/base/QueryEquipment',
          "Get", {
            "AccessToken": eosCommon.storage.get('AccessToken'),
            "PageIndex": 0,
            "PageSize": 0,
            "Parameters": {
              "EquipmentName": "",
              "BrandId": vm.BrandId,
              "EquipmentModel": vm.ProductTypeName
            }
          },
          "json",
          function(result) {
            if(eosCommon.checkCode(result.State, result.Message)) {
              if(result.Data instanceof Array) {
                vm.FirmwareVersionDatas = [];
              } else {
                vm.FirmwareVersionDatas = result.Data.Result;
                vm.EquipmentLogoId = vm.FirmwareVersionDatas[0].EquipmentPhotosUrl[0].ResourceId;
                vm.EquipmentLogoUrl = vm.FirmwareVersionDatas[0].EquipmentPhotosUrl[0].ResourceUrl;
                vm.detailData = vm.FirmwareVersionDatas[0];
                vm.FirmwareVersion = vm.FirmwareVersionDatas[0].FirmwareVersion;
                for(let i = 0; i < vm.FirmwareVersionDatas.length; i++) {
                  if(vm.ProductTypeName == vm.FirmwareVersionDatas[i].EquipmentModel) {
                    vm.GalleryCover = vm.FirmwareVersionDatas[i].EquipmentPhotosUrl[0].ResourceUrl;
                  }
                }
              }
              vm.$nextTick(() => {
                $("#FirmwareVersion").selectpicker('refresh');
              });
            }
          })
      },
      bandChange() {
        let vm = this;
        //vm.isFirstLoading=false;
        if(!(vm.BrandId == '' && vm.isFirstLoading)) {
          vm.getEquipmentType();
          vm.isFirstLoading = false;
        }
        vm.getEquipmentType();
      },
      EquipmentTypeChange() {
        let vm = this;
        vm.BigCategoryId = '';
        if(vm.EquipmentTypeId == '') {
          vm.initData();
          return;
        }
        vm.getBigCategoryDatas();
      },
      BigCategoryChange() {
        let vm = this;
        vm.getBigCategoryDatas(); //获取小类
      },
      SmallCategoryChange() {
        let vm = this;
        vm.getProductTypeDatas(); //获取小类
      },
      ProductTypeChange() {
        let vm = this;
        vm.getFirmwareVersionDatas();
      }
    },
    watch: {
      deviceData: {
        handler(val, oldVal) {
          var vm = this;
          vm.BrandId = '';
          //种类变量
          vm.EquipmentTypeId = '';
          vm.EquipmentTypeArr = [];
          vm.initData();
        },
        deep: true
      },
      BigCategoryId(val){
      	this.BigCategoryChange();
      },
      SmallCategoryId(){
      	this.SmallCategoryChange();
      },
      ProductTypeName(){
      	this.ProductTypeChange();
      }
    },
    mounted: function() {
      let vm = this;
      vm.getBandDatas();
    }
  }
</script>
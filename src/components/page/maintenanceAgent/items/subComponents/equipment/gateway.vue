<style scoped="scoped">
  .form-horizontal {
    border: none;
    background: none;
  }
  
  .form-horizontal:hover {
    border: none;
    border-width: 0!important;
    border-color: none;
    background: none;
    box-shadow: none;
  }
  
  .selectWrap {
    max-width: 700px;
    margin: 0 auto;
    margin-top: 30px;
  }
  
  .equipmentInfo {
    text-align: center;
    margin-top: 15px;
  }
  
  .equipmentInfo img {
    width: 240px;
    height: 155px;
    margin: 0 auto;
  }
  
  .top_equipmentInfo {
    max-width: 800px;
    margin: 0 auto;
    height: 210px;
  }
  
  .center_pic {
    width: 287px;
    height: 210px;
    position: relative;
    background: url('../../../../../../../static/images/bindGateWay2.png')no-repeat center;
    /*border: 1px solid red;*/
  }
  
  .center_pic img {
    width: 26px;
    /*border: 1px solid red;*/
    height: 26px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -13px;
    margin-top: -13px;
  }
  
  .right_pic {
    width: 144px;
    /*border: 1px solid red;*/
    height: 210px;
    line-height: 210px;
    margin: 0 auto;
    padding: 42px 0;
  }
</style>
<template>
  <div id="divDataTableView" class="m-page table-responsive bg-white">
    <div class="form-horizontal content-box container-fluid">
      <div class="row top_equipmentInfo">
        <div class="col-lg-3 col-md-3 equipmentInfo"> <img class="img-responsive" v-lazy="EquipmentPhoto" />
          <p style="color: #000;margin-top: 15px;">{{EquipmentName}}</p>
        </div>
        <div class="col-lg-3 col-md-3 center_pic"> <img class="img-responsive" src="../../../../../../../static/images/bindGateWay1.png" /> </div>
        <div class="col-lg-3 col-md-3 right_pic"> <img class="img-responsive" src="../../../../../../../static/images/bindGateWay3.png" /> </div>
      </div>
      <div id="selectWrap" class="selectWrap">
        <div class="form-group"> <label class="content-title-left">网关ID:</label>
          <div class="col-lg-6 col-xs-9">
            <select @change="gateWayChange()" :disabled="propsDatas.GatewayId!=''&& propsDatas.GatewayId!='000000000000'" v-model="GatewayId" data-live-search="true" id="selectGateway" class="form-control selectpicker" data-size="8" data-style="btn-white">
              <option value="">选择网关ID</option>
              <option v-for="item in gateWayDatas" :disabled="item.NetworkingWay==2 && item.EquipmentNum==1" :value="item.GatewayId">{{item.GatewayId}}</option>
            </select>
          </div>
        </div>
        <div class="form-group"> <label class="content-title-left"><em class="ak_required_em"></em>网关别名:</label>
          <div class="col-lg-6 col-xs-6"> <span class="valid-form-group">
                            <label class="focus valid"></label>
                        </span> <input v-model="GatewayName" id="GatewayName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||maxLength:25||isOtherName" data-error="网关别名不能为空||设备名称最长为25位字符||只能输入中文、字母、数字、下划线，中划线，且以中文或字母开头" placeholder="请输入网关名称" /> <span class="ion-close-circled close hide text-danger valid-input-icon"></span> <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label> </div>
        </div>
        <div class="form-group"> <label class="content-title-left"><em class="ak_required_em"></em>网关位置:</label>
          <div class="col-lg-6 col-xs-6"> <span class="valid-form-group">
                            <label class="focus valid"></label>
                        </span> <input v-model="GatewayPlace" id="txtProjectName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||maxLength:25" data-error="网关位置不能为空||设备名称最长为25位字符" placeholder="请输入网关位置" /> <span class="ion-close-circled close hide text-danger valid-input-icon"></span> <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label> </div>
        </div>
        <div class="form-group"> <label class="content-title-left"><em class="ak_required_em"></em>链接方式:</label>
          <div class="col-lg-6 col-xs-6"> <span class="valid-form-group">
                            <label class="focus valid"></label>
                        </span> <input v-model="NetworkingWayName" disabled="disabled" id="txtProjectName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||maxLength:25||isOtherName" data-error="链接方式不能为空||设备名称最长为25位字符||只能输入中文、字母、数字、下划线，中划线，且以中文或字母开头" placeholder="请选择网关ID获取链接方式" /> <span class="ion-close-circled close hide text-danger valid-input-icon"></span> <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label> </div>
        </div>
        <div v-if="propsDatas.equipmentData" class="form-group" style="margin-top: 50px;"> <label class="content-title-left"></label>
          <div class="col-lg-6 col-xs-9"> <button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="ReturnClick()">取消</button> <button id="btnAddEdit" type="submit" class="btn btn-default pull-left" data-dismiss="modal" data="1" v-on:click="BindGateway()">确定</button> </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Bus from '../../../../../../assets/js/common/bus.js';
  export default {
    data() {
      return {
        EquipmentPhoto: '',
        ProjectId: '',
        EquipmentName: '',
        EquipmentId: '',
        BaseEquipmentId: '',
        GatewayId: '',
        GatewayName: '',
        NetworkingWay: '',
        NetworkingWayName: '',
        GatewayPlace: '',
        EquipmentNum: 0,
        gateWayDatas: []
      }
    },
    props: ['propsDatas'],
    watch: {},
    mounted() {
      let vm = this;
      vm.title = '绑定网关';
      vm.$emit('changeTitle', vm.title);
      if(vm.propsDatas.bindGateWay) {
        vm.propsDatas.equipmentData = true;
      }
      if(String(vm.propsDatas.GatewayId) == 'undefined') {
        Bus.$on('getGatewayId', function(data) {
          vm.propsDatas.GatewayId = data;
        });
      }
      vm.EquipmentPhoto = vm.propsDatas.EquipmentPhoto;
      vm.EquipmentName = vm.propsDatas.EquipmentName;
      vm.ProjectId = vm.propsDatas.ProjectId;
      vm.BaseEquipmentId = vm.propsDatas.BaseEquipmentId;
      vm.EquipmentId = vm.propsDatas.EquipmentId;
      if(!vm.propsDatas.equipmentData) {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '请先保存设备信息，才能编辑其它信息',
          ok: function() {},
          cancel: true,
          modal: true
        });
        return false;
      }
      vm.getRealGateWayDatas();
    },
    methods: {
      BindGateway() {
        if(!verifyCheck._click("selectWrap")) return false;
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "ProjectId": vm.ProjectId,
          "GatewayId": vm.GatewayId, //--网关id，必填
          "GatewayName": vm.GatewayName, //--网关名称，必填
          "EquipmentId": vm.EquipmentId, //--设备id
          "NetworkingWay": vm.NetworkingWay, //--网关与后台的连网方式:1-有线;2-无线; 默认为1
          "GatewayPlace": vm.GatewayPlace,
          "BaseEquipmentId": vm.BaseEquipmentId
        };
        //return;
        let url = eosCommon.ENTERPRISE_API + "api/equipment/BindGateway";
        eosCommon.eosAjax(url, "POST", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            eosCommon.eosMessage("success", '网关绑定成功');
            vm.ReturnClick();
          }
        });
      },
      getRealGateWayDatas() { //获取网关列表数据
        let vm = this;
        let params = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "ProjectId": vm.ProjectId,
          "CompanyId": eosCommon.storage.get('CompanyId')
        };
        eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/QueryProjectGateway', "GET", params, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            if(result.Data instanceof Array) {
              //暂无数据
              vm.gateWayDatas = [];
              vm.$nextTick(function() {
                $('#selectGateway').selectpicker('refresh');
              })
              return
            }
            vm.gateWayDatas = result.Data.Gateways;
            vm.GatewayId = vm.propsDatas.GatewayId;
            vm.gateWayChange();
            vm.$nextTick(function() {
              $('#selectGateway').selectpicker('refresh');
            })
          }
        })
      },
      gateWayChange() {
        let vm = this;
        if(vm.GatewayId == '') {
          vm.GatewayName = '';
          vm.GatewayPlace = '';
          vm.NetworkingWay = '';
          vm.NetworkingWayName = '';
          return;
        }
        for(let i = 0; i < vm.gateWayDatas.length; i++) {
          if(vm.GatewayId == vm.gateWayDatas[i].GatewayId) {
            vm.GatewayName = vm.gateWayDatas[i].GatewayAlias;
            vm.GatewayPlace = vm.gateWayDatas[i].GatewayPlace;
            vm.NetworkingWay = vm.gateWayDatas[i].NetworkingWay;
            vm.NetworkingWayName = vm.gateWayDatas[i].NetworkingWayName;
            vm.EquipmentNum = vm.gateWayDatas[i].EquipmentNum;
          }
        }
      },
      ReturnClick() {
        let vm = this;
        this.$router.go(-1);
      }
    }
  }
</script>
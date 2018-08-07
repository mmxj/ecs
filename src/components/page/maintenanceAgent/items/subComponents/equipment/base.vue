<template>
  <div id="base" class="tab-pane active">
    <!--基本信息开始-->
    <div id="addEquipment" class="card-box table-responsive" style="min-height: 480px;margin-bottom: 0;">
      <div class="row">
        <div class="col-lg-12">
          <div id="EquipmentVerifyCheck">
            <div v-if="!propsDatas.ProjectId" class="form-horizontal content-box">
              <div v-if="isCanShowCompany" class="form-group">
                <label class="content-title-left"><em class="ak_required_em">*</em>所属企业</label>
                <div class="col-lg-6 col-xs-8">
                  <select @change="enterpriseList()" data-live-search="true" v-model="CompanyId" id="selectCompany" class="form-control selectpicker" data-size="8" data-style="btn-white">
                    <option value="">请选择公司</option>
                    <option v-for="item in enterprise" :value="item.CompanyId">{{item.CompanyName}}</option>
                  </select>
                </div>
              </div>
              <div v-if="isCanShowProject" class="form-group">
                <label class="content-title-left"><em class="ak_required_em">*</em>所属项目</label>
                <div class="col-lg-6 col-xs-8">
                  <select data-live-search="true" v-model="ProjectId" id="selectProject" class="form-control selectpicker" data-size="8" data-style="btn-white">
                    <option value="">请选择项目</option>
                    <option v-for="item in projectListData" :value="item.ProjectId">{{item.ProjectName}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left text-right">
                  <em class="ak_required_em">*</em>设备名称
                </label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                                        <label class="focus valid"></label>
                                    </span>
                  <input v-model="EquipmentName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||maxLength:25||isOtherName" data-error="设备名称不能为空||设备名称最长为25位字符||只能输入中文、字母、数字、下划线，中划线，且以中文或字母开头" />
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
                <div v-show="!EquipmentId" class="col-lg-1 col-xs-1">
                  <span class="OrgTopAligin" style="margin-top: 0;">
                                        <button @click="hideImgBox1()" type="button" class="btn btn-default" data-toggle="modal" ><i class="fa fa-plus m-r-5"></i>从设备库添加
                                        </button>
                                    </span>
                  <deviceList :deviceData="deviceData"></deviceList>
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left"><em class="ak_required_em">*</em>设备种类</label>
                <div class="col-lg-6 col-xs-8">
                  <select id="EquipmentTypeSelect" v-model="deviceData.EquipmentTypeId" @change="EquipmentTypeChange()" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
                    <option value="">请选择设备种类</option>
                    <option :value="item.EquipmentTypeId" v-for="item in EquipmentTypeArr">{{item.TypeName}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left text-right">
                  <em class="ak_required_em"></em>固件版本号
                </label>
                <div class="col-lg-6 col-xs-8">
                  <input v-model="deviceData.FirmwareVersion" type="text" maxlength="25" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left">
                  <em class="ak_required_em">*</em>品牌名称
                </label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                                        <label class="focus valid"></label>
                                    </span>
                  <input v-model="deviceData.deviceDetail.BrandName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||maxLength:25||isOtherName" data-error="品牌名称不能为空||品牌名称最长为25位字符||只能输入中文、字母、数字、下划线，中划线，且以中文或字母开头" />
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left">
                  <em class="ak_required_em">*</em>设备型号
                </label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                                                                <label class="focus valid"></label>
                                                            </span>
                  <input v-model="deviceData.deviceDetail.SubId2Name" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||maxLength:25||isOtherName" data-error="设备型号不能为空||设备型号最长为25位字符||只能输入中文、字母、数字、下划线，中划线，且以中文或字母开头" />
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left">资产编号</label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                        <label class="focus valid"></label>
                    </span>
                  <input v-model="deviceData.deviceDetail.SerialNo" type="text" maxlength="25" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left"><em class="ak_required_em">*</em>每次采集协议地址数</label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                        <label class="focus valid"></label>
                    </span>
                  <input v-model="ProtocolNumPerCollectTxt" type="text" maxlength="3" class="form-control required" value="125" data-valid="isNonEmpty||isOneToHundredTwentyFive" data-error="采集协议地址数不能为空||只能输入1-125的数字" />
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left"><em class="ak_required_em">*</em>响应时长</label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                        <label class="focus valid"></label>
                    </span>
                  <input placeholder="单位：毫秒，范围：1-5000" v-model="ResponseDuration" type="text" maxlength="4" class="form-control required" value="50" data-valid="isNonEmpty||isOneToFiveThounsand" data-error="响应时长不能为空||只能输入1-5000的数字" />
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left"><em class="ak_required_em">*</em>所属项目</label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                        <label class="focus valid"></label>
                    </span>
                  <input v-model="propsDatas.ProjectName" type="text" maxlength="25" disabled="" class="form-control bg-no-input" />
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left"><em class="ak_required_em">*</em>是否计算COP值</label>
                <div class="col-lg-6 col-xs-8">
                  <div class="radio radio-custom radio-inline">
                    <input v-model="IsCountCOP" type="radio" name="cop" @change="copSelectChange()" id="calcul_cop" value="1" checked>
                    <label for="cacul_cop">
                      是
                    </label>
                  </div>
                  <div class="radio radio-custom radio-inline">
                    <input v-model="IsCountCOP" @change="copSelectChange()" type="radio" name="cop" id="no_calcul_cop" value="0">
                    <label for="no_cacul_cop">
                      否
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left"><em class="ak_required_em"></em>数据采集器</label>
                <div class="col-lg-6 col-xs-8">
                  <input v-model="GatewayId" type="text" maxlength="25" disabled="" class="form-control bg-no-input" />
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left"><em class="ak_required_em">*</em>总线类型</label>
                <div class="col-lg-6 col-xs-8">
                  <div class="radio radio-custom radio-inline">
                    <input v-model="ChannelType" type="radio" name="Modbus" @change="modbusChange()" id="Modbus-RTU" value="Modbus-RTU" checked>
                    <label for="Modbus-RTU">
                      Modbus-RTU
                    </label>
                  </div>
                  <div class="radio radio-custom radio-inline">
                    <input v-model="ChannelType" @change="modbusChange()" type="radio" name="Modbus" id="Modbus-TCP" value="Modbus-TCP">
                    <label for="Modbus-TCP">
                      Modbus-TCP
                    </label>
                  </div>
                </div>
              </div>
              <div class="b-t-1 pb-10">
                <div id="rtu" v-show="isModbus_RTU">
                  <div class="form-group">
                    <label class="content-title-left"><em class="ak_required_em">*</em>串口</label>
                    <div class="col-lg-6 col-xs-8">
                      <span class="valid-form-group">
                        <label class="focus valid"></label>
                    </span>
                      <input v-model="SerialPort" type="text" maxlength="20" class="form-control required" data-valid="isNonEmpty" data-error="串口不能为空" />
                      <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                      <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left"><em class="ak_required_em">*</em>波特率</label>
                    <div class="col-lg-6 col-xs-8">
                      <select id="BaudRate" v-model='BaudRate' class="form-control selectpicker" data-style="btn-white">
                        <option value="4800">4800</option>
                        <option value="9600">9600</option>
                        <option value="14400">14400</option>
                        <option value="19200">19200</option>
                        <option value="38400">38400</option>
                        <option value="57600">57600</option>
                        <option value="38400">115200</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left"><em class="ak_required_em">*</em>校验方式</label>
                    <div class="col-lg-6 col-xs-8">
                      <select id="Parity" v-model='Parity' class="form-control selectpicker" data-style="btn-white">
                        <option value="0">无校验</option>
                        <option value="1">奇校验</option>
                        <option value="2">偶校验</option>
                        <option value="3">1校验</option>
                        <option value="4">0校验</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left"><em class="ak_required_em">*</em>数据位</label>
                    <div class="col-lg-6 col-xs-8">
                      <select id="DataBit" v-model='DataBit' class="form-control selectpicker" data-style="btn-white">
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left"><em class="ak_required_em">*</em>停止位</label>
                    <div class="col-lg-6 col-xs-8">
                      <select id="StopBit" v-model='StopBit' class="form-control selectpicker" data-style="btn-white">
                        <option value="1">1</option>
                        <option value="2">2</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div v-show="!isModbus_RTU" id="tcp">
                  <div class="form-group">
                    <label class="content-title-left"><em class="ak_required_em">*</em>IP地址</label>
                    <div class="col-lg-6 col-xs-8">
                      <span class="valid-form-group">
                            <label class="focus valid"></label>
                        </span>
                      <input v-model="IP" type="text" maxlength="25" data-valid="isNonEmpty||isIpv4" data-error="IP地址不能为空||IP地址格式不正确" class="form-control required" />
                      <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                      <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left"><em class="ak_required_em">*</em>端口号</label>
                    <div class="col-lg-6 col-xs-8">
                      <span class="valid-form-group">
                        <label class="focus valid"></label>
                    </span>
                      <input v-model="Port" type="text" maxlength="25" data-valid="isNonEmpty||isInt" data-error="端口号不能为空||端口号为正整数" class="form-control required" />
                      <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                      <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left">
                  <em class="ak_required_em">*</em>总线ID
                </label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                        <label class="focus valid"></label>
                    </span>
                  <input id="ChannelId" v-model="ChannelId" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty" data-error="总线ID不能为空" />
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left">
                  <em class="ak_required_em">*</em>从站ID
                </label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                    <label class="focus valid"></label>
                </span>
                  <input id="SlaveId" v-model="SlaveId" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty" data-error="从站ID不能为空 " />
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left">设备LOGO</label>
                <div class="col-lg-6 col-xs-8">
                  <div id="imgBox1"></div>
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left">运行状态地址</label>
                <div class="col-lg-5 col-md-5 col-xs-8">
                  <span class="valid-form-group">
                    <label class="focus valid"></label>
                </span>
                  <input v-model="RunStateAddress" type="text" maxlength="25" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left">运行时长地址</label>
                <div class="col-lg-5 col-md-5 col-xs-8">
                  <span class="valid-form-group">
                        <label class="focus valid"></label>
                    </span>
                  <input v-model="RunTimeAddress" type="text" maxlength="25" class="form-control" />
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left"></label>
                <div class="col-lg-4" style="margin-top: 0px;width: 440px;">
                  <div v-show="RunTimeAddress!==''" style="margin: 0;" class="form-group">
                    <div style="width:280px;" class="col-lg-6 col-md-8 col-xs-8">
                      <div class="radio radio-custom radio-inline">
                        <input v-model="RunTimeCountType" type="radio" name="RunTimeCountType" @change="RunTimeCountTypeChange()" id="straight_val" value="0" checked>
                        <label for="straight_val">
                          直取(直接使用)
                        </label>
                      </div>
                      <div class="radio radio-custom radio-inline">
                        <input v-model="RunTimeCountType" @change="RunTimeCountTypeChange()" type="radio" name="RunTimeCountType" id="calcul_val" value="1">
                        <label for="calcul_val">
                          计算(系统计算)
                        </label>
                      </div>
                    </div>
                    <div v-show="RunTimeCountType==1" class="col-lg-4 col-md-4" style="padding: 0;width: 135px;">
                      <span>系统值：</span>
                      </label>
                      <input v-model="RunTimeDefault" class="form-control" style="width: 40px;padding: 0;" type="text" name="cop" id="no_calcul_cop" value="0">
                      <span>小时</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left">安装位置</label>
                <div class="col-lg-6 col-xs-8">
                  <input v-model="InstallPlace" type="text" maxlength="25" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <label class="content-title-left"></label>
            <div class="col-lg-6 col-xs-8">
              <button id="EquipmentCancelBtn" @click="cancelClick()" class="btn btn-white pull-left mr-10">取消</button>
              <button id="EquipmentSaveBtn" @click="insertEquipmentSave()" class="btn btn-default pull-left loading_btn" data-loading-text="保存中..." data-status="save">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import deviceList from "../../common/base-device.vue";
import Bus from '../../../../../../assets/js/common/bus.js';
export default {
  data() {
    return {
      title: '添加设备',
      EquipmentName: '',
      addEquipmentBtn: false,
      deviceData: {
        deviceDetail: {
          "BrandName": "",
          "SubId2Name": "",
          SerialNo: ''
        },
        FirmwareVersion: '',
        PhotoId: '',
        PhotoUrl: '',
        EquipmentTypeId: ''
      },
      ProtocolNumPerCollectTxt: '',
      ResponseDuration: '',
      SerialPort: '',
      IP: '',
      Port: '',
      ChannelId: '',
      SlaveId: '',
      RunStateAddress: '',
      RunTimeAddress: '',
      InstallPlace: '',
      GatewayId: '',
      addEquipmentBtn: true,
      ProjectId: '',
      LResourceIds: '',
      BaudRate: '',
      Parity: '',
      DataBit: '',
      StopBit: '',
      ChannelType: 'Modbus-RTU',
      isModbus_RTU: true,
      EquipmentId: '',
      EquipmentPhoto: '',
      GatewayName: '',
      EquipmentTypeArr: [],
      IsCountCOP: '1',
      RunTimeCountType: '0',
      RunTimeDefault: '',
      testVal: '',
      //其它
      EntitySort: '',
      CompanyId: '',
      isCanShowProject: false,
      isCanShowCompany: false,
      enterprise: [],
      projectListData: []
    }
  },
  components: {
    deviceList
  },
  watch: {
    deviceData: {
      handler(val, oldval) {},
      deep: true //对象内部的属性监听，也叫深度监听
    },
    'deviceData.PhotoId' (val, oldval) {
      var vm = this;
      vm.initUpload(vm.deviceData.PhotoId, vm.deviceData.PhotoUrl);
    },
    'deviceData.EquipmentTypeId' (val, oldval) {
      this.$nextTick(() => {
        $('#EquipmentTypeSelect').selectpicker('refresh');
      })
    },
    RunTimeAddress(val) {
      let vm = this;
      if (val == '') {
        //重置RunTimeCountType的值
        vm.RunTimeCountType = '0'
      }
    }
  },
  props: ['propsDatas'],
  mounted() {
    var vm = this;
    vm.EntitySort = eosCommon.storage.get('EntitySort');
    vm.ProjectId = vm.propsDatas.ProjectId;
    vm.EquipmentId = vm.propsDatas.EquipmentId;
    vm.initUpload(vm.LResourceIds, vm.LimgUrls);
    vm.getEquipmentType();
    if (vm.EquipmentId) {
      //进入编辑数据处理
      vm.getEditEquipment();
      vm.propsDatas.equipmentData = true;
      vm.title = '编辑设备';
      vm.$emit('changeTitle', vm.title);
      vm.$emit('canNext', vm.propsDatas.equipmentData);
    } else {
      //新增设备数据处理
      if ((vm.EntitySort == 0 || vm.EntitySort == 1) && (!vm.propsDatas.ProjectId)) {

        vm.isCanShowCompany = false;
        vm.isCanShowProject = true;
        vm.CompanyId = eosCommon.storage.get('CompanyId');
        vm.initDatas();
        vm.getProjectList();
        return;
      }
      if ((!vm.propsDatas.ProjectId) && (vm.EntitySort == 2)) {
        vm.isCanShowCompany = true;
        vm.isCanShowProject = true;
        vm.initDatas();
        vm.enterpriseList();
        return;
      }
      vm.initDatas();

    }
  },
  methods: {
    initDatas() {
      let vm = this;
      vm.title = '添加设备';
      vm.$emit('changeTitle', vm.title);
      if (vm.propsDatas.GatewayId !== 'null') {
        vm.GatewayId = vm.propsDatas.GatewayId;
      }
      vm.GatewayName = vm.propsDatas.GatewayName;
      vm.deviceData.EquipmentTypeId = '6ad78161-c9ae-11e7-8d2e-000c295ec690';
      vm.$nextTick(() => {
        $('#EquipmentTypeSelect').selectpicker('refresh');
      });
      vm.modbus_RTUinit();
    },
    enterpriseList() {
      //企业列表
      var vm = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
      };
      var url = eosCommon.COMMON_API + "api/Company/GetAllCompany";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.enterprise = result.Data;
          vm.$nextTick(function() {
            $("#selectCompany").selectpicker('refresh');
          });
          vm.getProjectList();
        }
      });
    },
    getProjectList: function() {
      //请求项目列表数据
      var vm = this;
      var param = {
        "AccessToken": eosCommon.storage.get('AccessToken'),
        "IsMaint": vm.EntitySort, //--是否维保方(0：业主列表；1：维保列表  必填)
        "PrincipalUserId": '', //--用户Id,IsMaint为0时表示项目负责人Id,为1表示项目维保人员Id
        "CompanyId": vm.CompanyId, //--企业Id，IsMaint为0时表示项目所属企业Id,为1表示项目维保方企业Id
        "LockType": '', //--是否锁定，(0：未加锁；1：加速，空或者-1：查全部)
        "AlarmType": '', //--报警等级（空或-1：全部,0-正常；1-提醒;2-警告;3-报警(严重)）
        "ProjectName": '', //--项目名称
        "PageIndex": '', //第几页（可为空，为空或为0时不分页）
        "PageSize": '' //条数（可为空，为空或者为0不分页）
      };
      var url = eosCommon.ENTERPRISE_API + "api/project/Query";
      eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.noData = false;
          if (result.Data.Result.length == 0) {
            vm.projectListData = result.Data.Result;
            vm.ProjectId = '';
          } else {
            vm.projectListData = result.Data.Result;

          }
          vm.$nextTick(() => {
            $("#selectProject").selectpicker('refresh');
          });
        }
      });
    },
    RunTimeCountTypeChange() {
      let vm = this;
      if (vm.RunTimeCountType == 0) {
        vm.RunTimeDefault = '';
      }
    },
    getEquipmentType() {
      var _this = this;
      eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/GetEquipmentType", "Get", {
        "AccessToken": eosCommon.storage.get("AccessToken"),
      }, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.EquipmentTypeArr = result.Data;
          _this.$nextTick(() => {
            $('#EquipmentTypeSelect').selectpicker('refresh');
          });
        }
      });

    },
    getEditEquipment() { //黄君福
      var vm = this;
      eosCommon.eosAjax(
        eosCommon.ENTERPRISE_API + "api/equipment/Detail",
        "Get", {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "EquipmentId": vm.EquipmentId,
            "Type": "1"
          }
        },
        "json",
        function(result) {
          if (eosCommon.checkCode(result.State, result.Message)) {
            vm.initEditEqmentDatas(result.Data);
          }
        }
      );
    },
    initEditEqmentDatas(data) {
      var vm = this;

      vm.EquipmentName = data.EquipmentName,
        vm.deviceData.deviceDetail.SerialNo = data.AssetsNo;
      vm.ProtocolNumPerCollectTxt = data.ProtocolNumPerCollect;
      vm.ResponseDuration = data.ResponseDuration;
      vm.SerialPort = data.Configs.SerialPort;
      if (data.ChannelType == "Modbus-RTU") {
        vm.isModbus_RTU = true;
        vm.ChannelType = "Modbus-RTU";
        vm.BaudRate = data.Configs.BaudRate;
        vm.Parity = data.Configs.Parity;
        vm.DataBit = data.Configs.DataBit;
        vm.StopBit = data.Configs.StopBit;

      } else {
        vm.isModbus_RTU = false;
        vm.ChannelType = "Modbus-TCP";
        vm.IP = data.Configs.IP;
        vm.Port = data.Configs.Port;
      }
      vm.ChannelId = data.ChannelId;
      vm.SlaveId = data.SlaveId;
      vm.RunStateAddress = data.RunStateAddress;
      vm.RunTimeAddress = data.RunTimeAddress;
      vm.InstallPlace = data.InstallPlace;
      vm.LResourceIds = data.EquipmentPhotoId; //？
      vm.EquipmentPhoto = data.EquipmentPhoto; //?
      vm.initUpload(vm.LResourceIds, vm.EquipmentPhoto); //?
      vm.deviceData.deviceDetail.BrandName = data.BrandName;
      vm.deviceData.deviceDetail.SubId2Name = data.EquipmentModel;
      vm.deviceData.deviceDetail.BaseEquipmentId = data.BaseEquipmentId;
      vm.deviceData.FirmwareVersion = data.FirmwareVersion;
      vm.deviceData.EquipmentTypeId = data.EquipmentTypeId;
      vm.IsCountCOP = data.IsCountCOP;
      vm.RunTimeCountType = data.RunTimeCountType;
      vm.RunTimeDefault = data.RunTimeDefault;
      vm.EquipmentId = data.EquipmentId;
      vm.GatewayId = data.GatewayId;
      if (String(vm.propsDatas.GatewayId) == 'undefined') {
        vm.propsDatas.GatewayId = vm.GatewayId;
        //Bus.$emit('getGatewayId',vm.GatewayId);
      }
      vm.ProjectId = data.ProjectId;
      vm.$nextTick(function() {
        $("#BaudRate").selectpicker('refresh');
        $("#Parity").selectpicker('refresh');
        $("#DataBit").selectpicker('refresh');
        $("#StopBit").selectpicker('refresh');
        $('#EquipmentTypeSelect').selectpicker('refresh');
      })
    },
    EquipmentReturn() {
      this.$router.go(-1);
    },
    hideImgBox1() {
      let vm = this;
      vm.deviceData = {
        deviceDetail: {
          "BrandName": "",
          "SubId2Name": ""
        },
        FirmwareVersion: '',
        PhotoId: '',
        PhotoUrl: '',
        EquipmentTypeId: ''
      }
      $('#modal-device-list').modal('show');
    },
    modbusChange() {
      var vm = this;
      if (this.ChannelType == 'Modbus-TCP') {
        vm.isModbus_RTU = false;
      } else {
        vm.isModbus_RTU = true;
      }
    },
    modbus_RTUinit() {
      var vm = this;
      vm.BaudRate = '4800';
      vm.Parity = '0';
      vm.DataBit = '0';
      vm.StopBit = '1';
      $("#BaudRate").selectpicker('refresh');
      $("#Parity").selectpicker('refresh');
      $("#DataBit").selectpicker('refresh');
      $("#StopBit").selectpicker('refresh');
    },
    cancelClick() {
      var vm = this;
      vm.btnReturn();

    },
    insertEquipmentSave() {
      var vm = this;
      if (!vm.ProjectId) {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '请先选择项目！',
          ok: function() {},
          cancel: true,
          modal: true
        });
        return false;
      }
      if (!verifyCheck._click("EquipmentVerifyCheck")) return false;
      if (vm.deviceData.EquipmentTypeId == '') {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '设备种类不能为空',
          ok: function() {},
          cancel: true,
          modal: true
        });
        return false;
      }
      var Configs = '';
      if (vm.ChannelType == 'Modbus-RTU') {
        Configs = {
          "SerialPort": vm.SerialPort,
          "BaudRate": vm.BaudRate,
          "Parity": vm.Parity,
          "DataBit": vm.DataBit,
          "StopBit": vm.StopBit,
        }
      } else {
        Configs = {
          "IP": vm.IP,
          "Port": vm.Port
        }
      }
      if (vm.title == '添加设备') {
        if (vm.deviceData.PhotoId != "") {
          vm.LResourceIds = vm.deviceData.PhotoId;
        }
        var params = {
          "AccessToken": eosCommon.storage.get('AccessToken'),
          "Parameters": {
            "EquipmentName": vm.EquipmentName,
            "BaseEquipmentId": vm.deviceData.deviceDetail.EquipmentId,
            "FirmwareVersion": vm.deviceData.FirmwareVersion,
            "ProjectId": vm.ProjectId,
            "GatewayId": vm.GatewayId,
            "GatewayName": vm.GatewayName,
            "InstallPlace": vm.InstallPlace,
            "AssetsNo": vm.deviceData.deviceDetail.SerialNo,
            "Photo": vm.LResourceIds,
            "BrandName": vm.deviceData.deviceDetail.BrandName,
            "EquipmentModel": vm.deviceData.deviceDetail.SubId2Name,
            "RunStateAddress": vm.RunStateAddress,
            "RunTimeAddress": vm.RunTimeAddress,
            "ChannelType": vm.ChannelType, //?
            "ChannelId": vm.ChannelId,
            "SlaveId": vm.SlaveId,
            "Configs": Configs, //?
            "ProtocolNumPerCollect": vm.ProtocolNumPerCollectTxt,
            "ResponseDuration": vm.ResponseDuration,
            "EquipmentTypeId": vm.deviceData.EquipmentTypeId,
            "IsCountCOP": vm.IsCountCOP,
            "RunTimeCountType": vm.RunTimeCountType,
            "RunTimeDefault": vm.RunTimeDefault
          }
        };
        $.ajax({
          url: eosCommon.ENTERPRISE_API + 'api/equipment/insert',
          type: 'Post',
          data: JSON.stringify(params),
          contentType: "application/json",
          dataType: 'json',
          success(result) {
            if (eosCommon.checkCode(result.State, result.Message)) {
              $(".loading_btn").button('reset');
              eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
              vm.btnReturn();
            }
          }
        });
      } else {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: "修改设备之后，需要重新点击发布按钮",
          ok() {
            $.ajax({
              url: eosCommon.ENTERPRISE_API + 'api/equipment/update',
              type: 'Put',
              data: JSON.stringify({
                "AccessToken": eosCommon.storage.get('AccessToken'),
                "Parameters": {
                  "EquipmentName": vm.EquipmentName,
                  "BaseEquipmentId": vm.deviceData.deviceDetail.EquipmentId,
                  "FirmwareVersion": vm.deviceData.FirmwareVersion,
                  "ProjectId": vm.ProjectId,
                  "GatewayId": vm.GatewayId,
                  "EquipmentId": vm.EquipmentId,
                  "InstallPlace": vm.InstallPlace,
                  "AssetsNo": vm.deviceData.deviceDetail.SerialNo,
                  "Photo": vm.LResourceIds,
                  "BrandName": vm.deviceData.deviceDetail.BrandName,
                  "EquipmentModel": vm.deviceData.deviceDetail.SubId2Name,
                  "RunStateAddress": vm.RunStateAddress,
                  "RunTimeAddress": vm.RunTimeAddress,
                  "ChannelType": vm.ChannelType, //?
                  "ChannelId": vm.ChannelId,
                  "SlaveId": vm.SlaveId,
                  "Configs": Configs, //?
                  "ProtocolNumPerCollect": vm.ProtocolNumPerCollectTxt,
                  "ResponseDuration": vm.ResponseDuration,
                  "EquipmentTypeId": vm.deviceData.EquipmentTypeId,
                  "IsCountCOP": vm.IsCountCOP,
                  "RunTimeCountType": vm.RunTimeCountType,
                  "RunTimeDefault": vm.RunTimeDefault
                }
              }),
              contentType: "application/json",
              dataType: 'json',
              success(result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                  $(".loading_btn").button('reset');
                  eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                  vm.btnReturn();
                }
              },
              timeout: 60000,
              error() {
                if ($(".loading_btn").length) {
                  $(".loading_btn").button('reset');
                }
              }
            });
          },
          cancel() {
            $(".loading_btn").button('reset');
          },
          close() {
            $(".loading_btn").button('reset');
          },
          modal: true
        });
      };

    },
    btnReturn() {
      let vm = this;
      eosCommon.storage.set('ProjectId', vm.ProjectId)
      this.$emit('changeShowWhichTab', '隐藏项目列表');
      this.$router.go(-1);
    },
    initUpload(LResourceIds, LimgUrls) {
      var vm = this;
      //设备logo
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

      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "ResourceType": "0",
        "Title": "设备LOGO",
        "Description": "设备LOGO"
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
        'succ' (result) {
          vm.LResourceIds = result.Data[0].ResourceId;
        },
        'del' (result) {
          vm.LResourceIds = '';
          if (result != "") {
            var param = {
              "AccessToken": eosCommon.storage.get("AccessToken"),
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

    }
  }

}

</script>
<style scoped="scoped">
[v-cloak] {
  display: none !important;
}

.getway-info .table-detail-title {
  padding: 10px 0;
  line-height: 30px;
}

.getway-info .table-detail-add {
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
}

.row.opport-box .table-detail {
  white-space: nowrap
}

.row.opport-box .table-detail.pt20 {
  padding-top: 20px;
}

.tab-content .equipment-title {
  font-size: 18px;
  padding-top: 10px;
  font-weight: bold;
  max-width: 200px;
  padding-left: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}

.tab-content .equipment-title-sub {
  font-size: 14px;
  padding-top: 0px;
  color: #bbb;
  white-space: nowrap;
  padding-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis
}

.member-info .getway-title .getway-title-sub {
  font-size: 18px;
  font-weight: bold;
  max-width: 200px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}

.center-vertical {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.ak-select .group-text {
  display: inline-block;
  overflow: hidden;
  height: 20px;
  line-height: 20px;
  text-align: left;
  font-size: 9pt;
}

.ak-select ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.ak-select ul li a {
  display: block;
  padding: 3px 20px;
  clear: both;
  font-weight: 400;
  line-height: 1.42857143;
  color: #333;
  white-space: nowrap;
}

.ak-select ul li a:hover {
  color: #262626;
  text-decoration: none;
  background-color: #f5f5f5;
  cursor: pointer;
}

.ak-select ul li .entry-input {
  width: 180px;
  height: 30px;
  margin: 0 8px 3px 8px;
  padding: 0 8px;
  border: 1px solid #E3E3E3;
}

.ak-select .dropdown-toggle .caret {
  position: absolute;
  top: 50%;
  right: 9pt;
  margin-top: -2px;
  vertical-align: middle;
}

.item-content-title-right {
  text-align: right;
  height: 34px;
  line-height: 32px;
}

.card-box:hover {
  box-shadow: none;
}

.content-title-left {
  /*width: 0;
    min-width: 100px;*/
}

</style>

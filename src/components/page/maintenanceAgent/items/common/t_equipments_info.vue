<template>
  <div id="item-index" style="position: absolute;top: 0; bottom: 0; left:15px;right:15px; background: #fff; overflow-y: auto;" class="">
    <!--<common-header  v-on:sendProjectId="getProjectId" v-on:commonHeaderMethods="ReturnClick" :mustInfo="headerInfos"></common-header>-->
    <div class="t_header clearfix">
      <div class="leftPartTitle pull-left" style="width: 230px;">
        <div class="imgWrap">
          <img v-lazy="customLazy(headerInfos.thingPhoto,defaultPro_img)" width="35" height="35">
        </div>
        <p class="nowrap" :title='headerInfos.thingName'>{{headerInfos.thingName}}</p>
        <!--functionInfo: '调试设备',
					thingName: vm.ProjectName,
					thingPhoto: vm.ProjectLogo,
					errorImg: vm.defaultPro_img,-->
      </div>
      <div class="reback_btn pull-right" style=" margin-left: 30px;height: 32px; margin-top: 10px;padding: 0px 15px; padding-left:30px;border-left: 1px solid #D1E3E2;">
        <el-button class='fr' size='small' style='' @click='btnReturn'>
          <i class="fa fa-mail-reply-all mr5"></i>返回
        </el-button>
      </div>
    </div>
    <div class="default_page" style="border: 1px solid #e3e7ea; border-top: none; margin: 15px; ">
      <div class="code form-inline" style="height: 50px;padding: 0 10px;">
        <div class="form-group col-lg-3 col-md-4 col-sm-5 col-xs-6" style="margin-top: 8px;">
          <label class="content-title-left" style="width: auto;margin-right: 10px;">网关名称:</label>
          <select @change="gateWayChange()" id="selectGateway" v-model="GatewayId" class="col-lg-4 col-md-4 col-sm-4 col-xs-7 form-control selectpicker" data-size="8" data-style="btn-white">
            <option value="">选择网关</option>
            <option v-for="item in gateWayDatas" :value="item.GatewayId">{{item.GatewayAlias}}</option>
          </select>
        </div>
        <div style="margin-top: 8px;" class="form-group col-lg-2 col-md-2 col-sm-3 col-xs-3">
          <label class="content-title-left" style="width: auto;">网络类型:</label>
          <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4 col-xs-4">
            <p class="form-control-static" style="color: #000000; font-weight: bold;width: 30px;">{{NetworkingWayName}}</p>
          </div>
        </div>
        <div class="form-group col-lg-2 col-md-2 col-sm-3 col-xs-3" style="margin-top: 8px;">
          <label class="content-title-left" style="width: auto;">状态:</label>
          <div class="col-lg-4 col-xs-7">
            <p class="form-control-static">
              <i v-if="IsOnline==1" class="fa fa-rss-square m-r-5" style="color: #2ecc71;font-size: 18px; "></i>
              <i v-if="IsOnline==0" class="fa fa-rss-square m-r-5" style="font-size: 18px;"></i>
            </p>
          </div>
        </div>
        <span v-if="IsLocked==0 && isShowOprate && isNullGateWay" class=" pull-right" style="margin-top:8px; ">
                    <button id="btnInsert" @click="editHasGateWay()"  type="button" class="btn btn-default" >
                        <i class="fa fa-pencil m-r-5"></i>修改网关
                    </button>
                </span>
        <span v-if="IsLocked==0 && isShowOprate && isNullGateWay" class=" pull-right" style="margin-top: 8px; margin-right: 20px;">
                    <button @click="clearEInfoInGateway()" style="border: 1px solid #F99C00!important; background-color: #F99C00!important;" type="button" class="btn btn-default" >
                        <i class="fa fa-minus-square m-r-5""></i>下发设备信息清除指令
                    </button>
              	</span>
        <span v-if="IsLocked==0 && isShowOprate && isNullGateWay" class=" pull-right" style="margin-top: 8px; margin-right: 20px;">
                    <button @click="DeleteGateway()" style="border: 1px solid #e5e8eb!important; background-color: #fefefe!important;color: #8492a6!important;" id="btnDelete" type="button" class="btn btn-default" >
                        <i class="fa fa-times m-r-5" style="color: #8492a6;"></i>删除网关
                    </button>
                </span>
        <div class="clearfix">
        </div>
      </div>
      <!--编辑网关开始-->
      <div id="modal-cleos" class="modal fade" role="dialog" data-backdrop="static" aria-hidden="true">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="win-close" data-dismiss="modal">×</button>
            <button @click="eidtGatewaySave()" type="button" data-dismiss="modal" class="sava">保存</button>
            <h4 id="ModuleTitle" class="modal-title">编辑网关</h4>
          </div>
          <div id="GatewayVerifyCheck">
            <div id="modal_body1" class="modal-body nicescroll">
              <div class="form-horizontal mt-10 content-box-modal" style="display: block;">
                <div id="shebeiImg">
                  <div class="form-group">
                    <label class="content-title-left text-right">
                      <em class="ak_required_em">*</em>网关ID
                    </label>
                    <div class="col-xs-9">
                      <input v-model="realGatewayId" id="selectGatewayId" type="text" maxlength="25" class="form-control" disabled="disabled" placeholder="网关ID" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left text-right">
                      网关别名
                    </label>
                    <div class="col-xs-9">
                      <input v-model="realGatewayAlias" id="GatewayAliasName" type="text" maxlength="25" class="form-control" placeholder="网关别名" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left text-right">
                      网关位置
                    </label>
                    <div class="col-xs-9">
                      <input v-model="realGatewayPlace" id="GatewayPlace" type="text" maxlength="25" class="form-control" placeholder="网关位置" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left text-right">
                      链接方式
                    </label>
                    <div class="col-xs-9">
                      <input v-model="realNetModeName" id="longzhoufeng" type="text" maxlength="25" class="form-control" placeholder="" disabled="disabled" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--添加网关结束-->
      <!--<loading v-show="noData"></loading>-->
      <!--设备列表开始-->
      <div id="itemList" class="item-data">
        <div class="col-sm-8 col-md-8 col-lg-9 bg-white">
          <div class="order-card-box  pb-20">
            <div class="tab-content" id="equipmentList" style="overflow: auto; ">
              <div class="table-box" style="padding:5px 0;  line-height:39px;border-bottom: 1px solid #e8ebed; margin-bottom: 15px;">
                <div class="col-sm-6 col-md-4 col-lg-2">
                  <i class="fa fa-building-o text-white size20 font-bold" style="color: #000;"></i></span>
                  <span class="size20 font-bold" style="color: #000;">设备列表</span>
                </div>
                <span v-if="!is2G && isShowOprate" class="pull-right">
                                    <button v-if="GatewayId !== 'null'" @click="delayPublishProtocl(5000)" type="button" class="btn btn-white ">
                                        <i style="color: #3498DB;" class="fa fa-cloud-upload m-r-10"></i>批量发布协议地址
                                    </button>
								</span>
                <span v-if="IsLocked==0 && !(TotalEquipments>0 && is2G) && isShowOprate" class=" pull-right" style=" margin-right: 20px;">
			                        <button id="btnInsert" @click="addEquipment()"  type="button" class="btn btn-default" >
			                            <i class="fa fa-plus m-r-5"></i>添加设备
			                        </button>
			                    </span>
              </div>
              <div id="equip_lists">
                <div class="text-center" style="margin-top: 50px;" v-if="isEmptyData">
                  <div class="text-error"><img class="mt-lg mb-lg" src="../../../../../../static/images/box.png"></div>
                  <h3 style="margin-top: 30px;">您还没有创建任何一个设备哦！</h3>
                  <br>
                </div>
                <loading v-show="noData"></loading>
                <div v-if="pagingDatas.total>0" @click="getCurrentEqInfo(index,item.EquipmentId,item.EquipmentAlias)" :class="{equipment_active:index==currIndex}" class="table-box border-1 p-10" v-for="(item,index) in Equipments">
                  <div class="col-xs-4 col-lg-6 table-detail">
                    <a>
                      <div class="member-info">
                        <router-link v-if="item.GatewayId != '000000000000'" :to="{name:'equipment_detail', params:{EquipmentId: item.EquipmentId}}">
                          <img style="border-radius: 5px;" v-lazy="customLazy(item.EquipmentPhoto,defaultEqui_img)" class="m-r-15">
                        </router-link>
                        <router-link v-if="item.GatewayId == '000000000000'" :to="{}">
                          <img style="border-radius: 5px;" v-lazy="customLazy(item.EquipmentPhoto,defaultEqui_img)" class="m-r-15">
                        </router-link>
                        <div class="div-ver clearfix">
                          <div class="getway-sub-title text-20">
                            <router-link v-if="item.GatewayId != '000000000000'" :to="{name:'equipment_detail', params:{EquipmentId: item.EquipmentId}}">
                              <b class="text-dark" style="color: #000; font-size: 17px;">{{item.EquipmentAlias}}</b>
                            </router-link>
                            <router-link v-if="item.GatewayId == '000000000000'" :to="{}">
                              <b class="text-dark" style="color: #000; font-size: 17px;">{{item.EquipmentAlias}}</b>
                            </router-link>
                          </div>
                          <div class="getway-sub-title project_infos">
                            <p>
                              <b class="fa  fa-street-view text-grey"></b>
                              <span class="names">运行时长：</span>
                              <span class="text-cog">{{item.RunTime}}小时</span>
                            </p>
                            <p>
                              <b class="fa  fa-user-secret text-grey"></b>
                              <span class="names">所属项目：</span>
                              <span class="text-cog">{{ item.ProjectName }}</span>
                            </p>
                            <div class="clearfix">
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <span v-if="item.GatewayId != '000000000000'" class="col-xs-1 table-detail pt20">
                                        <p><span>在线状态</span></p>
                  <label v-if="item.IsOnline == 1">
                    <a class="btn eos-btn-info btn-sm alarmLevel" style="padding: 0;">　在线　</a>
                  </label>
                  <label v-if="item.IsOnline == 0">
                    <a class="btn eos-btn-gray btn-sm alarmLevel" style="padding: 0;">　离线　</a>
                  </label>
                  </span>
                  <span v-if="item.GatewayId != '000000000000'" class="col-xs-1 table-detail pt20">
                                        <p><span>运行状态</span></p>
                  <label>
                    <a class="btn btn-sm alarmLevel" :class="[item.IsOnline == 0 ? nolineClass : onlineClass]"> {{ item.RunState }}</a>
                  </label>
                  </span>
                  <span v-if="item.GatewayId != '000000000000'" class="col-xs-1 table-detail pt20">
                                        <p><span>报警状态</span></p>
                  <label v-if="item.AlarmLevel == 0">
                    <a class="alarmLevel btn eos-btn-info btn-sm">正常</a>
                  </label>
                  <label v-if="item.AlarmLevel == 1">
                    <a style="background: #3498db!important;" class="alarmLevel btn eos-btn-warning btn-sm">提醒</a>
                  </label>
                  <label v-else-if="item.AlarmLevel == 2">
                    <a class="alarmLevel btn eos-btn-abnormal btn-sm">告警</a>
                  </label>
                  <label v-else-if="item.AlarmLevel == 3">
                    <a class="alarmLevel btn eos-btn-danger btn-sm">报警</a>
                  </label>
                  </span>
                  <div class="col-xs-2 table-detail pt20 table-actions-bar pull-right">
                    <div class="contact-action pl-subtitle">
                      <label v-if="isShowOprate && (item.GatewayId != '000000000000')" :class="{'text-cloud':(iconType=='text-cloud'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-cloud',index)" @mouseleave="addOremoveActiveClass('')" id="Publish" @click="delayPublish(item,5000)" style="padding-top: 20px;" class="commonIcoColor" title="发布协议地址"><i class="fa fa-cloud-upload m-rigth font-size-text"></i></label>
                      <label v-if="item.GatewayId != '000000000000'" :class="{'text-database':(iconType=='text-database'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-database',index)" @mouseleave="addOremoveActiveClass('')" @click="historyData(item)" class="commonIcoColor" style="padding-top: 20px; " title="设备数据"><i class="fa  fa-database m-rigth font-size-text" style="font-size: 16px; cursor:pointer"></i></label>
                      <label v-if="IsLocked==0 && isShowOprate" :class="{'text-pencil':(iconType=='text-pencil'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-pencil',index)" @mouseleave="addOremoveActiveClass('')" @click="intoEquipmentDetails(item,'edit')" class="commonIcoColor" style="padding-top: 20px;" title="编辑设备"><i class="fa fa-pencil m-rigth font-size-text"></i></label>
                      <label v-if="IsLocked==0 && isShowOprate" :class="{'text-trash-o':(iconType=='text-trash-o'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-trash-o',index)" @mouseleave="addOremoveActiveClass('')" @click="delEquipment(item)" class="commonIcoColor" style="padding-top: 20px;" title="删除设备"><i class="fa fa-trash-o m-rigth font-size-text"></i></label>
                      <label v-if="IsLocked==0 && isShowOprate && (item.GatewayId == '000000000000')" @click="intoEquipmentDetails(item,'bindGateWay')" :class="{'text-square':(iconType=='text-square'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-square',index)" @mouseleave="addOremoveActiveClass('')" class="commonIcoColor" style="padding-top: 20px;" title="绑定网关"><i class="fa fa-rss-square m-rigth font-size-text"></i></label>
                    </div>
                  </div>
                </div>
                <paging v-show="pagingDatas.total>0" :pagingData="pagingDatas"></paging>
              </div>
            </div>
          </div>
        </div>
        <div id="rightAddItemList" class="col-sm-4 col-md-4 col-lg-3 bg-white b-l-1">
          <div class="panel-group" style="padding: 24px; padding-bottom: 0;padding-top: 0;">
            <div class="panel-heading">
              <h2 class="panel-title">
	                           	 {{equipmentName}}<span class="eos-stat-icon bg-info"><i class="fa fa-home text-white"></i></span>
	                        </h2>
            </div>
            <hr class="divider">
            <div id="right_equip_details">
              <div class="form-group row" style="margin: 15px auto;">
                <div class="col-xs-12">
                  <select id="addProWbSelect" @change="changeGroup(groupId)" v-model='groupId' class="form-control selectpicker" data-style="btn-white" data-size="8">
                    <option value="">选择分组</option>
                    <option :value="item.groupId" v-for="(item,index) in equipmentDetails">{{item.GroupName}}</option>
                  </select>
                </div>
              </div>
              <div class="form-group row ">
                <div class="col-xs-12" style="margin-left:0 auto;">
                  <label class="content-title-left" style="width: auto; color: #000000; font-weight: bold;">数据时间:</label>
                  <div class="col-lg-8 col-md-8 col-sm-8 text-left">
                    <p style="color: #000000; font-weight: bold;" class="form-control-static">{{UpdatedOn}}</p>
                  </div>
                </div>
              </div>
              <hr class="divider">
              <ul class="list-unstyled">
                <li v-show="!noDetailData" style="margin-left: 30px; margin-top: 15px;width: 100%" v-if="groupId==item.groupId" class="text-center row form-group" v-for="(item,index) in equipmentDetails">
                  <p style="width:100%;height: 34px; line-height: 34px; font-weight: 400; text-align: left;" v-for="data in item.Details">
                    <span style="color: rgb(132, 146, 166); text-align: left;font-size: 14px;">
												{{data.DisplayName}}:
											</span>
                    <span style="color: rgb(83, 94, 106);text-align: left;font-size: 14px;">
												{{data.DataValue}}
											</span>
                  </p>
                  <!--<div class="" style="width: 300px;margin: 0;" v-for="data in item.Details">
										<label class="content-title-left" style="width: auto; color: #8492a6;">{{data.DisplayName}}:</label>
										<div class="col-lg-3 col-md-3 col-sm-3 text-left">
											<p style="color: #535e6a; " class="form-control-static">{{data.DataValue}}</p>
										</div>
										<div class="clearfix">
										</div>
									</div>-->
                </li>
                <div class="noDataBg" v-show="DetailDataEmpty">
                  <img class="img-responsive" src="../../../../../../static/css/images/noEquipDetialBg.png" />
                  <h3>暂无数据</h3>
                </div>
                <div class="dataTables_wrapper no-footer" v-show="noDetailData">
                  <div style="z-index: 9999;" id="example1_processing" class="dataTables_processing">数据加载中...</div>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix">
      </div>
    </div>
  </div>
</template>
<script>
import commonFn from 'src/assets/js/common/commonFunc'
import { mapMutations } from 'vuex'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const DELETE = AXIOS.delete
const URL = Common.Const.url
let projectContr = commonFn.projectContr;
export default {
  data: function() {
    return {

      allListData: '',
      allDatas: '',

      GatewayName: '',
      ProjectId: '',
      ProjectLogo: '',
      ProjectName: '',


      hasEqGateways: [],

      realGatewayList: '',

      tempGateWay: {
        "GatewayAlias": "",
        "GatewayId": "",
        "GatewayPlace": "",
        "IsOnline": 0,
        "NetworkingWay": 3,
        "NetworkingWayName": "",
        "TotalEquipments": 0
      },
      onlineClass: 'eos-btn-info',
      nolineClass: 'eos-btn-gray',

      InfoAddEquipmentBtn: false,

      groupId: 0,

      Equipments: [],
      isChangeGateWay: false,
      isEditGateWay: false,
      tempEditRealGateWay: [],
      tempAddRealGateWay: [],
      IsLocked: 0,
      temp_realGatewayList: [],

      isLatestRealGateWay: false,
      LatestRealGateWayDatas: [],
      tempsData: [],

      isAdmin: 0,
      EntitySort: 1,
      isProjectAdmin: 0,
      isProjectLeader: 0,
      IsExperienceProject: 0,
      timer: 0,
      //、、、///////////////////////
      //网关变量
      GatewayId: '',
      gateWayDatas: [],
      NetworkingWayName: '',
      IsOnline: '',
      nullGatewaysInfo: {
        "GatewayAlias": "空网关",
        "GatewayId": "null",
        "GatewayPlace": "",
        "IsOnline": '',
        "NetworkingWay": '',
        "NetworkingWayName": "",
        "TotalEquipments": ''
      },
      isNullGateWay: true,
      //网关修改变量
      realGatewayId: '',
      realGatewayAlias: '',
      realGatewayPlace: '',
      realNetModeName: '',
      is2G: false,
      //设备变量
      TotalEquipments: 0,
      Equipments: [],
      defaultEqui_img: '../../../../../../static/css/img/default_equi_bg.png',

      //左侧实时数据
      equipmentDetails: [],
      DetailDataEmpty: false,
      noDetailData: true,
      currIndex: 0,
      equipmentName: '',
      UpdatedOn: '',
      //其它
      iconType: '',
      currActiveIndex: '',
      last: 0,
      noData: true,
      isEmptyData: false,
      routerName: '',
      EntitySort: '',
      enterprise: '',
      projectListData: '',
      CompanyId: '',
      //头部变量
      defaultPro_img: '../../../../../static/css/img/default_porject_bg.png',
      headerInfos: {
        enterprise: [],
        projectListData: [],
        functionInfo: '',
        thingName: '',
        thingPhoto: '',
        errorImg: '',
        EntitySort: '',
        isCustomMethods: '',
        ProjectId: '',
        CompanyId: ''
      },
      isLoadHeader: false,
      IsSelfProject: 1,
      //分页数据				
      pagingDatas: {
        page_size: 5,
        page_index: 1,
        begin_row: 0,
        end_row: 0,
        total: 0,
        page_num: 0
      }
    }
  },
  props: ['propsData'],
  watch: {
    headerInfos: {
      handler: function(newVal, oldVal) {},
      deep: true
    },
    "pagingDatas.page_index": function(val, oldVal) {
      this.getEquipmentListDatas();
    },
    "headerInfos.CompanyId" (val, oldVal) {},
    "headerInfos.ProjectId" (val, oldVal) {},
  },
  computed: {
    showAddParams() {
      return [this.isAdmin, this.isProjectAdmin, this.IsExperienceProject, this.IsSelfProject]
    },
    isShowOprate() {
      return projectContr.equipmentAdd(...this.showAddParams);
    }

  },
  filters: {
    formateSeconds(seconds) {
      //eosCommon.formatSeconds(seconds);
      return Math.round(parseInt(seconds) / 3600);
    }

  },
  methods: {
    ...mapMutations({
      uPDATE_CURRENTVIEWTAB: 'UPDATE_CURRENTVIEWTAB'

    }),
    clearEInfoInGateway(){
      let vm = this
      if (vm.GatewayId == '') {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: "请先选择网关",
          ok: function() {},
          cancel: true,
          modal: true
        });
        return;
      }
      vdialog({
        type: 'confirm',
        title: '提示',
        content: "是否确定下发设备信息删除指令？",
        ok: function() {
          let data = {
            AccessToken: FUNC.storage.get("AccessToken"),
            Parameters: {
              GatewayId: vm.GatewayId
            }
          }
          DELETE(URL.CLEAREINFOINGATEWAY, data)
            .then(function(response) {
              let res = response.data
              if (FUNC.checkCode(res.State, res.Message)) {
                vm.$message({
                  type: 'success',
                  message: '下发清除指令完成，请重新给网关下发设备配置信息。'
                });
              }
            })
            .catch(function(error) {
              console.log(error.message)
            });
          /*var param = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "Parameters": {
              "GatewayId": vm.GatewayId
            }
          };
          var url = eosCommon.ENTERPRISE_API + "api/equipment/DeleteGateway";
          eosCommon.eosAjax(url, "Delete", param, "json", function(result) {
            if (eosCommon.checkCode(result.State, result.Message)) {

              eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
              vm.getEquipmentListDatas();
            }
          });*/

        },
        cancel: true,
        modal: true
      });

    },
    btnReturn() {
      let vm = this;
      eosCommon.storage.set('ProjectId', vm.ProjectId);
      vm.uPDATE_CURRENTVIEWTAB('equiList');
      vm.$router.go(-1)
      return
    },
    getCompanyId(msg) {
      this.CompanyId = msg;
      this.getProjectList();
    },
    getProjectId(msg) {
      if (!msg) {
        return;
      }
      this.ProjectId = msg;
      for (let i = 0; i < this.headerInfos.projectListData.length; i++) {
        if (msg == this.headerInfos.projectListData[i].ProjectId) {
          this.ProjectName = this.headerInfos.projectListData[i].ProjectName;
        }
      }
      this.getRealGateWayDatas();
      this.getEquipmentListDatas();
    },
    //			getMsg() {
    //				console.log('lll:');
    //				this.$refs.cl.childrenMsg();
    //
    //			},
    historyData: function(item) {
      this.$router.push({ name: 'equipment_detail', params: { EquipmentId: item.EquipmentId, isDirected: true } })
    },
    customLazy(src, errorImg) {
      return commonFn.customLazy(src, errorImg)
    },
    addOremoveActiveClass(iconType, currActiveIndex) {
      let vm = this;
      if (iconType == '') {
        vm.iconType = '';
        return;
      }
      vm.iconType = iconType;
      vm.currActiveIndex = currActiveIndex;
    },
    getEquipmentListDatas() { //获取设备数据
      var vm = this;
      vm.isEmptyData = false;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "PageIndex": vm.pagingDatas.page_index,
        "PageSize": vm.pagingDatas.page_size,
        "Parameters": {
          "ProjectId": vm.ProjectId, //--项目Id(必填)
          "GatewayId": vm.GatewayId, //-- 网关id, 可传空
          "Keywords": "", //-- 搜索关键字, 可传空
          "OnlineStatus": -1, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
          "AlarmStatus": -1, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
          "RunStatus": -1, //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
          "EquipmentTypeId": "" //--设备种类Id, 可传空
        }
      }
      var url = eosCommon.ENTERPRISE_API + "api/equipment/QueryDebugEquipmentList";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.noData = false;
          vm.TotalEquipments = result.Data.Total;
          vm.pagingDatas.total = result.Data.Total;
          if (result.Data.Equipments.length == 0) {
            //数据为空							
            vm.Equipments = [];
            vm.isEmptyData = true;
            vm.getCurrentEqInfo(0, vm.EquipmentId, '暂无设备');
          } else {
            vm.Equipments = result.Data.Equipments;
            vm.pagingDatas.begin_row = vm.pagingDatas.page_size * (vm.pagingDatas.page_index - 1) + 1;
            vm.pagingDatas.end_row = vm.pagingDatas.page_size * (vm.pagingDatas.page_index - 1) + vm.Equipments.length;
            vm.pagingDatas.page_num = Math.ceil(vm.pagingDatas.total / vm.pagingDatas.page_size);
            vm.getCurrentEqInfo(0, vm.Equipments[0].EquipmentId, vm.Equipments[0].EquipmentAlias);
          }

        }
      })
    },
    addEquipment() {
      var vm = this;
      if ((!vm.ProjectId) && ((vm.EntitySort == 0) || (vm.EntitySort == 1))) {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '请先选择项目！',
          ok: function() {

          },
          cancel: true,
          modal: true
        });
        return false;
      }
      if (!vm.ProjectId && (vm.EntitySort == 2)) {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '请先选择企业和项目！',
          ok: function() {

          },
          cancel: true,
          modal: true
        });
        return false;
      }
      let preName = '';
      if (this.EntitySort == 0) {
        preName = 'yz_'
      } else if (this.EntitySort == 1) {
        preName = 'wb_'
      } else {
        preName = 'sm_'
      }
      vm.$router.push({
        name: `${preName}equipment_detail_infos`,
        params: {
          ProjectName: vm.ProjectName,
          ProjectId: vm.ProjectId,
          GatewayId: vm.GatewayId,
          GatewayName: vm.GatewayName,
          isEdit: false,
          isInsert: true
        }
      });

    },
    intoEquipmentDetails(item, intoTyle) {
      var vm = this;
      eosCommon.storage.set('routerName', vm.$route.name);
      let EntitySort = eosCommon.storage.get('EntitySort');
      let preName = '';
      if (EntitySort == 0) {
        preName = 'yz_'
      } else if (EntitySort == 1) {
        preName = 'wb_'
      } else {
        preName = 'sm_'
      }

      //this.uPDATE_SHOWWHICHTAB({showWhichTab:4})
      //				  vm.$router.push({
      //						name:`${preName}equipment_detail_infos`,
      //				    params: params
      //});
      if (intoTyle == 'edit') {
        let params = {
          EquipmentId: item.EquipmentId,
          ProjectId: item.ProjectId,
          EquipmentName: item.EquipmentAlias,
          EquipmentPhoto: item.EquipmentPhoto,
          BaseEquipmentId: item.BaseEquipmentId,
          ProjectName: vm.Equipments[0].ProjectName,
          GatewayId: item.GatewayId,
          isEdit: true,
          isInsert: true
        }
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '修改设备信息的时候，请先暂停网关数据上传',
          ok: function() {
            vm.$router.push({
              name: `${preName}equipment_detail_infos`,
              params: params
            });
            //							vm.$router.push({
            //								name: 'equipment_detail_infos',
            //								params: {
            //									EquipmentId: item.EquipmentId,
            //									ProjectId: item.ProjectId,
            //									EquipmentName: item.EquipmentAlias,
            //									EquipmentPhoto: item.EquipmentPhoto,
            //									BaseEquipmentId: item.BaseEquipmentId,
            //									ProjectName: vm.Equipments[0].ProjectName,
            //									GatewayId:item.GatewayId,
            //								 	isEdit:true,
            //   								isInsert:true
            //								}
            //							});
          },
          cancel: true,
          modal: true
        });
      } else {
        let paramsJson = {
          EquipmentId: item.EquipmentId,
          EquipmentName: item.EquipmentAlias,
          BaseEquipmentId: item.BaseEquipmentId,
          ProjectId: item.ProjectId,
          ProjectName: item.ProjectName,
          EquipmentPhoto: item.EquipmentPhoto,
          GatewayId: '',
          bindGateWay: true,
          isInsert: true

        }
        vm.$router.push({
          name: `${preName}equipment_detail_infos`,
          params: paramsJson
        });
        //vm.$router.push({ name: 'equipment_detail_infos', params: paramsJson });
      }

    },
    getRealGateWayDatas() { //获取网关列表数据
      let vm = this;

      let params = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "ProjectId": vm.ProjectId,
        "CompanyId": ''
      };
      eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/QueryProjectGateway', "GET", params, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          if (result.Data instanceof Array) {
            //暂无数据
            vm.gateWayDatas = [];
            vm.gateWayDatas.push(vm.nullGatewaysInfo);
            vm.$nextTick(function() {
              $('#selectGateway').selectpicker('refresh');
            })
            return
          }
          vm.gateWayDatas = result.Data.Gateways;
          vm.gateWayDatas.push(vm.nullGatewaysInfo);
          if (vm.realGatewayId != '') {
            vm.GatewayId = vm.realGatewayId;
            vm.realGatewayId = '';
          }
          vm.$nextTick(function() {
            $('#selectGateway').selectpicker('refresh');
          })
        }
      })
    },
    gateWayChange() { //切换网关
      let vm = this;
      vm.pagingDatas.page_index = 1;
      for (let i = 0; i < vm.gateWayDatas.length; i++) {
        if (vm.GatewayId == vm.gateWayDatas[i].GatewayId) {
          vm.NetworkingWayName = vm.gateWayDatas[i].NetworkingWayName;
          if (vm.NetworkingWayName == 'GPRS') {
            vm.is2G = true;
          } else {
            vm.is2G = false;
          }
          vm.IsOnline = vm.gateWayDatas[i].IsOnline;
        }
      }
      //TotalEquipments
      if (vm.GatewayId == 'null') {
        vm.isNullGateWay = false;
        vm.EquipmentId = '';
      } else {
        vm.isNullGateWay = true;
      }
      vm.getEquipmentListDatas();
    },
    editHasGateWay() { //修改网关
      let vm = this;
      if (vm.GatewayId === '') {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: "请先选择网关",
          ok: function() {},
          cancel: true,
          modal: true
        });
        return;
      }
      $("#modal-cleos").modal('show');
      vm.$nextTick(() => {
        for (let i = 0; i < vm.gateWayDatas.length; i++) {
          if (vm.GatewayId == vm.gateWayDatas[i].GatewayId) {
            vm.realGatewayAlias = vm.gateWayDatas[i].GatewayAlias;
            vm.realGatewayId = vm.gateWayDatas[i].GatewayId;
            vm.realGatewayPlace = vm.gateWayDatas[i].GatewayPlace;
            vm.realNetModeName = vm.gateWayDatas[i].NetworkingWayName;
          }
        }

      });

    },
    eidtGatewaySave() {
      let NetworkingWay = '',
        vm = this;
      if (vm.realNetModeName == '有线') {
        NetworkingWay = 1;
      } else if (vm.realNetModeName == 'GPRS') {
        NetworkingWay = 2;

      } else if (vm.realNetModeName == '3G/4G') {
        NetworkingWay = 3;

      } else {
        NetworkingWay = 4;
      }
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "GatewayId": vm.realGatewayId,
          "GatewayAlias": vm.realGatewayAlias,
          "GatewayPlace": vm.realGatewayPlace,
          "NetworkingWay": NetworkingWay
        }
      };
      var url = eosCommon.ENTERPRISE_API + "api/equipment/UpdateGateway";
      eosCommon.eosAjax(url, "Put", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
          $("#modal-cleos").modal('hide');
          vm.getRealGateWayDatas();
        }
      });
    },
    DeleteGateway: function() {
      var vm = this;
      if (vm.GatewayId == '') {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: "请先选择网关",
          ok: function() {},
          cancel: true,
          modal: true
        });
        return;
      }
      vdialog({
        type: 'confirm',
        title: '提示',
        content: "删除网关的同时，将会同时删除网关下的所有设备，是否确定删除？",
        ok: function() {

          var param = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "Parameters": {
              "GatewayId": vm.GatewayId
            }
          };
          var url = eosCommon.ENTERPRISE_API + "api/equipment/DeleteGateway";
          eosCommon.eosAjax(url, "Delete", param, "json", function(result) {
            if (eosCommon.checkCode(result.State, result.Message)) {

              eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
              vm.getEquipmentListDatas();
            }
          });

        },
        cancel: true,
        modal: true
      });

    },
    getCurrentEqInfo: function(index, equipmentId, equipmentName) {
      var vm = this;
      vm.DetailDataEmpty = false;
      vm.noDetailData = true;
      vm.currIndex = index;
      vm.EquipmentId = equipmentId;
      vm.equipmentName = equipmentName;
      var param = {
        "AccessToken": eosCommon.storage.get('AccessToken'),
        "EquipmentId": vm.EquipmentId,
        "IsDefaultGroup": '' //-- 是否只获取第一个分组的数据						   
      }
      var url = eosCommon.ENTERPRISE_API + 'api/equipment/GroupRunning';
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.noDetailData = false;
          if (result.Data.length == 0) {
            //暂无数据
            vm.DetailDataEmpty = true;
            vm.equipmentDetails = [];
            vm.$nextTick(function() { $('#addProWbSelect').selectpicker('refresh'); })
          } else {
            vm.DetailDataEmpty = false;
            vm.equipmentDetails = result.Data;
            for (var i = 0; i < vm.equipmentDetails.length; i++) {
              vm.equipmentDetails[i].groupId = i;
            }
            $('#addProWbSelect').selectpicker('refresh');
            vm.UpdatedOn = vm.equipmentDetails[0].Details[0].UpdatedOn;
          }
        }
      });
    },
    changeGroup: function(groupId) {
      var vm = this;
      for (var i = 0; i < vm.equipmentDetails.length; i++) {
        if (groupId == vm.equipmentDetails[i].groupId) {
          vm.UpdatedOn = vm.equipmentDetails[i].Details[0].UpdatedOn;
        }
      }
    },
    delayPublishProtocl: function(delay) {
      var _this = this;
      if (_this.GatewayId == '') {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: "请先选择网关",
          ok: function() {},
          cancel: true,
          modal: true
        });
        return;
      }
      var curr = +new Date()
      if (curr - _this.last > delay) {
        _this.checkPublishProtocl(_this.GatewayId);
        _this.last = curr
      } else {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '发布频率太快，请5秒后再发布',
          ok: function() {

          },
          cancel: true,
          modal: true
        });
      }
    },
    checkPublishProtocl(GatewayId) {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "GatewayId": GatewayId,
          'IsCheckNull': 1
        }
      };
      var url = eosCommon.ENTERPRISE_API + "api/equipment/PublishProtocls";
      eosCommon.eosAjax(url, "Put", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          let data = JSON.parse(result.Data)
          if (data.IsCheckError) {
            vdialog({
              type: 'confirm',
              title: '提示',
              content: result.Message,
              ok: function() {
                _this.PublishProtocl(GatewayId)
              },
              cancel: true,
              modal: true
            });
          } else {
            _this.PublishProtocl(GatewayId)
          }
          // eosCommon.eosMessage('success', '发布成功');
        }
      });
    },
    PublishProtocl: function(GatewayId) {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "GatewayId": GatewayId
        }
      };
      var url = eosCommon.ENTERPRISE_API + "api/equipment/PublishProtocls";
      eosCommon.eosAjax(url, "Put", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage('success', '发布成功');
        }
      });
    },
    delayPublish: function(item, delay) {
      var _this = this;
      var curr = +new Date()
      if (curr - _this.last > delay) {
        _this.checkPublish(item);
        _this.last = curr
      } else {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '发布频率太快，请5秒后再发布',
          ok: function() {

          },
          cancel: true,
          modal: true
        });
      }
    },
    checkPublish(item) {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "EquipmentId": item.EquipmentId,
          'IsCheckNull': 1
        }
      };
      var url = eosCommon.ENTERPRISE_API + "api/equipment/Publish";
      eosCommon.eosAjax(url, "Put", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          let data = JSON.parse(result.Data)
          if (data.IsCheckError) {
            vdialog({
              type: 'confirm',
              title: '提示',
              content: result.Message,
              ok: function() {
                _this.Publish(item)
              },
              cancel: true,
              modal: true
            });
          } else {
            _this.Publish(item)
          }
        }
      });
    },
    Publish: function(item) {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "EquipmentId": item.EquipmentId
        }
      };
      var url = eosCommon.ENTERPRISE_API + "api/equipment/Publish";
      eosCommon.eosAjax(url, "Put", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage('success', '发布成功');
        }
      });
    },
    delEquipment: function(item) {
      var _this = this;
      vdialog({
        type: 'confirm',
        title: '提示',
        content: eosCommon.DELETE_MSG_ASK,
        ok: function() {
          var param = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "Parameters": {
              "EquipmentId": item.EquipmentId
            }
          };
          var url = eosCommon.ENTERPRISE_API + "api/equipment/delete";
          eosCommon.eosAjax(url, "Delete", param, "json", function(result) {
            if (eosCommon.checkCode(result.State, result.Message)) {
              eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
              _this.GatewayId = '';
              _this.getEquipmentListDatas();
            }
          });
        },
        cancel: true,
        modal: true
      });
    },
    ReturnClick() {
      let vm = this;
      if (vm.routerName == 'yz_equipments_manage' ||
        vm.routerName == 'wb_equipments_manage'
      ) {
        this.$router.push({
          name: vm.routerName,
          params: {
            type: 0
          }
        });
      } else {
        this.$router.push({
          name: vm.routerName
        });
      }
    },
    QueryDetail: function() {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "ProjectId": _this.ProjectId
      };
      var url = eosCommon.ENTERPRISE_API + "api/project/QueryDetail";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.initData(result.Data);

        }
      });
    },
    initData(proDetails) {
      let vm = this;
      //				$("#equip_lists").css('max-height', '560px').niceScroll();
      //				$("#equip_lists").getNiceScroll().resize();
      //				$(".list-unstyled").css('max-height', '545px').niceScroll();
      //				$(".list-unstyled").getNiceScroll().resize();
      vm.ProjectName = proDetails.ProjectName;
      vm.ProjectLogo = proDetails.ProjectLogoUrl;
      vm.headerInfos = {
        functionInfo: '调试设备',
        thingName: vm.ProjectName,
        thingPhoto: vm.ProjectLogo,
        errorImg: vm.defaultPro_img,
        isCustomMethods: true
      }
      vm.isLoadHeader = true;

      vm.getRealGateWayDatas();
      vm.getEquipmentListDatas();
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
          vm.headerInfos.enterprise = result.Data;
          vm.getProjectList();
        }
      });
    },
    getProjectList: function() {
      //请求项目列表数据
      var vm = this;
      var param = {
        "AccessToken": eosCommon.storage.get('AccessToken'),
      };
      var url = eosCommon.COMMON_API + "api/common/project";
      eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.noData = false;
          if (result.Data.Result.length == 0) {
            vm.headerInfos.projectListData = result.Data.Result;
            vm.ProjectId = '';
          } else {
            vm.headerInfos.projectListData = result.Data.Result;
          }
          vm.headerInfos.functionInfo = '调试设备';
          vm.headerInfos.thingName = vm.ProjectName;
          vm.headerInfos.thingPhoto = vm.ProjectLogo;
          vm.headerInfos.errorImg = vm.defaultPro_img;
          vm.headerInfos.isCustomMethods = true;
          vm.headerInfos.ProjectId = vm.ProjectId;
          vm.headerInfos.CompanyId = vm.CompanyId;
          vm.gateWayDatas = [];
          vm.$nextTick(function() {
            $('#selectGateway').selectpicker('refresh');
          })
          vm.Equipments = [];
          vm.isEmptyData = true;
          vm.noData = false;
          vm.isLoadHeader = true;
          vm.getCurrentEqInfo(0, vm.EquipmentId, '暂无设备')

        }
      });
    }
  },
  mounted: function() {
    let vm = this;
    vm.routerName = eosCommon.storage.get('routerName');
    vm.EntitySort = eosCommon.storage.get('EntitySort');
    vm.IsSelfProject = eosCommon.storage.get('IsSelfProject');
    vm.IsLocked = 0;
    vm.IsExperienceProject = 0;
    if (vm.IsLocked == 0 || vm.IsLocked == 1) {
      eosCommon.storage.set('IsLocked', vm.IsLocked)
    } else {
      vm.IsLocked = eosCommon.storage.get('IsLocked');
    }
    vm.isAdmin = eosCommon.storage.get('IsAdmin');
    vm.isProjectAdmin = eosCommon.storage.get('IsProjectAdmin');

    //			if((vm.EntitySort==0||vm.EntitySort==1)&& (!vm.$route.params.ProjectId)){
    //						
    //				vm.headerInfos.isCanShowCompany=false; 
    //				vm.headerInfos.isCanShowProject=true;
    //				vm.CompanyId=eosCommon.storage.get('CompanyId');
    //				vm.getProjectList();
    //				return;
    //			}
    //			if((!vm.$route.params.ProjectId)&&(vm.EntitySort==2)){
    //				vm.headerInfos.isCanShowCompany=true; 
    //				vm.headerInfos.isCanShowProject=true;
    //				vm.enterpriseList();								
    //				return;
    //			}
    if (vm.$route.params.ProjectId) {
      vm.ProjectId = vm.$route.params.ProjectId;
    } else {
      vm.ProjectId = eosCommon.storage.get('ProjectId');
    }
    vm.QueryDetail();
  },
  destroyed() {}

}

</script>
<style scoped="scoped" lang='less'>
#item-index .item-data .table-box.border-title {
  border: 1px solid #eeeeef;
  margin-bottom: 15px;
  margin-top: 20px;
}

#item-index .item-data .table-detail .contact-icon {
  position: absolute;
  right: 0;
  cursor: pointer;
  top: 10px;
  display: none;
}

#item-index .item-data .table-detail:hover .contact-icon {
  display: block;
  position: relative;
  right: 0;
  cursor: pointer;
  top: 10px;
}

#item-index .item-data .pl-subtitle {
  padding-left: 10px;
}

#item-index .item-data .table-detail {
  padding: 0;
  line-height: 75px
}

#item-index .item-data .table-detail .member-info {
  padding: 0;
  height: 100px;
}

#item-index .item-data .member-info img {
  width: 120px;
  height: 100px
}

#item-index .item-data .member-info .sub-title {
  padding-left: 0;
}

#item-index .member-info .div-ver {
  max-width: 180px;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 10px;
  position: absolute
}

.nowrap {
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
}

#item-index .member-info .getway-sub-title {
  background-color: #fff;
  height: 10px;
  line-height: 10px;
  margin: 0;
  padding-top: 13px;
}

#item-index .member-info .getway-sub-title.project_infos {
  line-height: 22px;
  margin-top: -21px;
}

#item-index .member-info .getway-sub-title.project_infos p b {
  border-radius: 14px;
  /*background:rgba(192,204,218,0.4);*/
  color: #8492A6;
  font-size: 16px;
}

#item-index .member-info .getway-sub-title.project_infos p span.names {
  text-indent: 5px;
  color: #8492A6;
}

#item-index .member-info .getway-sub-title.project_infos p span.text-cog {
  color: #8492A6;
  /*font-weight: bold;*/
}

.table-box {
  background: #fff;
}

#item-index .member-info .getway-sub-title.text-20 {
  font-size: 18px;
  margin-bottom: 30px;
}

#item-index .member-info .getway-title.text-20 {
  font-size: 18px
}

#item-index .member-info .sub-title {
  padding-left: 0;
}

#item-index .table-detail-title {
  padding: 10px 0;
  line-height: 30px;
}

#item-index .table-detail-title .sub-title {
  text-align: right
}

#item-index .table-detail-add {
  background-color: #fff;
  display: inline-block;
  padding: 0 10px 0 5px;
}

#item-index .table-box.card-box.border-add:hover {
  border: 1px dashed #bbb;
  color: #1abc9c;
  font-size: 18px;
}

#item-index .table-box.border-1 {
  border: 1px solid #eeeeef;
  position: relative;
  margin-top: 15px;
}

#item-index .text-pencil {
  color: #1abc9c;
}

#item-index .text-trash-o {
  color: #ff3f4e;
}

#item-index .text-cog {
  color: #aaa;
}

#item-index .text-star {
  color: #ccc;
}

#item-index .font-size-text {
  font-size: 20px;
  cursor: pointer;
}

#item-index .m-rigth {
  margin-right: 10px;
}

#item-index .equipment_panel_nav ul {
  border-bottom: 1px solid #e6e6e6;
  border-left: 1px solid #e6e6e6;
}

#item-index .equipment_panel_nav a {
  border-right: 1px solid #e6e6e6;
  border-top: 1px solid #e6e6e6;
}

#item-index .item-content-title-right {
  text-align: right;
  height: 34px;
  line-height: 32px;
}

#item-index .contact-card,
#item-index .item-wrapper {
  height: 40px;
}

#item-index .text-cleos,
#item-index .title-info {
  display: block;
  width: 100%;
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

#item-index .item-wrapper {
  height: 32px;
}

#item-index .project-list-item {
  float: left;
  width: 300px;
  height: 200px;
  margin-right: 10px;
}

#item-index .project-list-item img {
  width: 300px;
  height: 160px;
}

.p-10 {
  padding: 18px 10px!important;
}

a.alarmLevel {
  border-radius: 18px!important;
  font-size: 15px;
}

.alarmLevel span {
  display: inline-block;
  width: 18px;
  height: 18px;
  font-size: 18px;
  border-radius: 18px;
  background: #fff;
  line-height: 17px;
  text-align: center;
}

.alarmLevel b {
  color: #2ecc71;
  font-size: 16px;
}

.panel-title {
  color: #000;
  font-weight: bold;
}

.b-l-1 {
  padding: 0;
  border-left: 1px solid #f2f2f2 !important;
  border-right: 1px solid #f2f2f2 !important;
}

.isActive {
  background: #eff2f7;
}

#item-index .member-info .getway-sub-title {
  background-color: transparent;
}

.code {
  background: #eff2f7;
  padding: 10px;
}

#mainChanger {
  height: 26px;
  margin-top: 3px;
  margin-left: 5px;
}

#item-index .bootstrap-select.btn-group[class*=col-] {
  margin-left: 10px!important;
}

#item-index .item-data .table-detail {
  line-height: 48px;
}

.btn-group-sm>.btn,
.btn-sm {
  padding: 1px 14px;
}


/*添加设备*/

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


/*.bootstrap-select.btn-group[class*=col-] .dropdown-toggle {
    	width:50px!important;
	}*/

.bootstrap-select.btn-group .dropdown-toggle .filter-option {
  display: inline-block;
  overflow: hidden;
  max-width: 50px!important;
  height: 20px;
  line-height: 20px;
  text-align: left;
  font-size: 9pt;
}

.item-content-title-right {
  text-align: right;
  height: 34px;
  line-height: 32px;
}

.nicescroll-rails {
  top: 0px!important;
}

.equipment_active {
  background: #dfeceb;
}

.noDataBg img {
  margin: 0 auto;
  margin-top: 30px;
}

.noDataBg h3 {
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
  font-size: 16px;
  font-weight: bolder;
  color: #1abc9c;
}

.commonIcoColor {
  color: #97bebc;
}

.text-square {
  color: #3498db;
  /*font-size: 20px;*/
}

.text-cloud {
  color: #3498DB;
}

.text-database {
  color: #2ecc71;
}

.text-trash-o i,
.text-pencil i,
.text-square i,
.text-cloud i,
.text-database i {
  font-size: 24px!important;
}


/*.commonIcoColor:hover{
		color: #97bebc;
	}*/

.t_header {
  position: relative;
  /*width: 100%;*/
  margin-left: 15px;
  margin-right: 15px;
  bottom: 0;
  margin-top: 0px;
  border-bottom: 1px solid #D1E3E2;
  /*height: 100%;*/
  .leftPartTitle {
    width: 100%;
    height: 50px;
    /*background: red;*/
    & .imgWrap {
      /*margin-top: 15px;*/
      /*margin-left: 15px;*/
      float: left;
      width: 50px;
      height: 50px;
      /*background: #D1E3E2;*/
      background: #FFF;

      & img {
        border-radius: 50%;
        margin-left: 15px;
        margin-top: 8px;
      }
    }
    & p {
      float: left;
      /*margin-top: 15px;*/
      padding-left: 10px;
      font-weight: bold;
      font-size: 18px;
      width: 170px;
      overflow: hidden;
      line-height: 50px;
      background: #fff;
      color: #1F2D3D;
    }
  }
}

</style>

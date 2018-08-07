<style lang='less' scoped>
.mapBtn {
  margin-left: 10px;
  font-size: 13px;
  padding-left: 15px;
  padding-right: 15px;
  color: #797979
}

</style>
<template>
  <div id="sm_item-index" class="card-box m-page table-responsive">
    <div class="default_page" v-show='!isAdd'>
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-12">
          <span class="size20 font-bold">项目列表</span>
          <el-button v-show='isShowBackMap' @click="goTo('index',{'IndustryId':IndustryId,'FromMap':true})" size="small" class='mapBtn'>项目地图</el-button>
        </div>
      </div>
      <hr class="divider mb-10 mt-10" style="margin-bottom: 0!important;">
      <!--项目列表开始-->
      <div id="itemList" class="item-data">
        <div class="col-sm-8 col-md-8 col-lg-9 bg-white">
          <div class="order-card-box  pb-20">
            <div>
              <div class="tab-content">
                <div class="row">
                  <div class="col-lg-12">
                    <span v-if="isCanOperate" class="OrgTopAligin">
                        <button id="btnInsert" type="button" class="btn btn-default" v-on:click="btnInsert()">
                            <i class="fa fa-plus m-r-5"></i>新增
                        </button>
                    </span>
                    <span class="OrgTopAligin">
                     <select @change="btnQuery()"  id="queryIndustrySelect" v-model="IndustryId" class="form-control selectpicker input-sm " data-style="btn-white" data-live-search="true" data-size="8">
          						<option v-for="item in IndustryData" :value="item.IndustryId">
          							{{item.IndustryName}}
          						</option>
          					 </select>
               		  </span>
                    <span class="OrgTopAligin">
                      <select @change="getProjectList()" data-live-search='true' v-model="CompanyId" id="enterprise" class="form-control selectpicker" data-size="8" data-style="btn-white" tabindex="-98">
                            <option value="">请选择企业</option>
                            <option v-for='item in enterprise' :value="item.CompanyId">{{item.CompanyName}}</option>
                        </select>
                 		 </span>
                    <span class="OrgTopAligin">
  	                        <select id="runState" v-model='runState'  class="form-control selectpicker" data-style="btn-white">	                            
  	                            <option value="">运行状态</option>
  	                            <option value="0">正常</option>
  	                            <option value="1">提醒</option>
  	                            <option value="2">警告</option>
  	                            <option value="3">报警</option>												                                                   												                            
  	                        </select>
                 		 </span>
                    <span class="OrgTopAligin">
	                        <select id="selLock" v-model="IsLock" class="form-control selectpicker" data-style="btn-white">
	                            <option value="">是否锁定</option>
	                            <option value="1">锁定</option>
	                            <option value="0">非锁定</option>
	                        </select>
               		 </span>
                    <span class="">
                     	<span class="OrgTopAligin">
                          <input v-on:input="getProjectListData()" id="txtQueryKeywords"  v-model="keyWords" type="text" class="form-control w-128" placeholder="项目名称">
                      </span>
                      <span class="OrgTopAligin">
                          <button id="btnQuery" type="button" class="btn btn-default" v-on:click="btnQuery()">
                              <i class="fa fa-search m-r-5"></i>查找
                          </button>
                      </span>
                    </span>
                  </div>
                </div>
                <div class="hr mt-10"></div>
                <div class="dataTables_wrapper no-footer" v-show="noData">
                  <div id="example1_processing" class="dataTables_processing">数据加载中...</div>
                </div>
                <div id="noData" style="margin-top: 100px;" v-show="emptyData" class="">
                  <div class="text-center">
                    <div class="text-error"><img class="mt-lg mb-lg" src="../../../../../static/images/box.png"></div>
                    <h3>您还没有创建过项目哦！</h3>
                    <br>
                    <p class="text-muted">请点击下面按钮创建一个项目吧！</p>
                    <br>
                    <button type="button" @click="btnInsert()" class="ItemAddList btn btn-default waves-effect waves-light">
                      <i class="fa fa-plus m-r-5"></i>创建项目
                    </button>
                  </div>
                </div>
                <div v-show=" !noData && !emptyData " class="table-box border-1 p-10" :class="{isActive:index==currIndex}" @click="getCurrentProInfo(item.ProjectId,index,item.ProjectName)" v-for="(item,index) in allListData">
                  <div class="col-xs-8 table-detail">
                    <a>
                      <div class="member-info">
                        <router-link :to="{name:'item_detail', params:{ProjectId: item.ProjectId,ProjectName:item.ProjectName,ProjectLogo:item.ProjectLogo,IsLocked:item.IsLocked,IsExperienceProject:item.IsExperienceProject}}">
                          <img style="border-radius: 5px;" v-lazy="customLazy(item.ProjectLogo,defaultPro_img)" class="m-r-15">
                        </router-link>
                        <div class="div-ver clearfix">
                          <div class="getway-sub-title text-20">
                            <router-link :to="{name:'item_detail', params:{ProjectId: item.ProjectId,ProjectName:item.ProjectName,ProjectLogo:item.ProjectLogo,IsLocked:item.IsLocked,IsExperienceProject:item.IsExperienceProject}}">
                              <b class="text-dark" style="color: #000; font-size: 18px; position: relative; display: inline-block;">
                              	{{item.ProjectName}}
                            	<span style="border: 1px solid #a1afbc; color: #a1afbc; display: inline-block;padding: 5px 5px; border-radius: 5px; font-size: 12px;">
                            		{{item.IndustryName}}
                              </span>
                              </b>
                            </router-link>
                          </div>
                          <div class="getway-sub-title project_infos">
                            <p>
                              <b class="fa  fa-user-secret text-grey"></b>
                              <span class="names">所属业主：</span>
                              <span class="text-cog">{{ item.OwnerCompanyName }}</span>
                            </p>
                            <p>
                              <b class="fa fa-user text-grey"></b>
                              <span class="names">维保商：</span>
                              <span class="text-cog">{{ item.MaintCompanyName }}</span>
                            </p>
                            <p>
                              <b class="fa fa-map-marker text-grey"></b>
                              <span class="names">地址：</span>
                              <span class="text-cog">{{item.ProjectAddress}}</span>
                            </p>
                            <div class="clearfix">
                            </div>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="col-xs-2 table-detail">
                    <span class=""><!--ion-gear-a fa-cog fa-smile-o fa-snapchat-ghost-->
                      <span v-if="item.AlarmLevel == 0">
                          <a class="alarmLevel btn eos-btn-info btn-sm" ><span><b  class="fa fa-cog text-grey"></b></span>正常</a>
                      </span>
                      <span v-if="item.AlarmLevel == 1">
                        <a style="background: #3498db!important;" class="alarmLevel btn eos-btn-warning btn-sm"><span><b style="color: #3498db;" class="fa  fa-exclamation text-grey"></b></span>提醒</a>
                      </span>
                      <span v-else-if="item.AlarmLevel == 2">
                        <a style="background: #f39c12!important;" class=" alarmLevel eos-btn-abnormal btn-sm"><span style="line-height: 15px;"><b style="color: #f39c12; font-size: 14px; "  class="fa fa-exclamation-triangle text-grey"></b></span>警告</a>
                      </span>
                      <span v-else-if="item.AlarmLevel == 3">
                        <a class="alarmLevel btn eos-btn-danger btn-sm"><span><b style="color: #e74c3c;" class="fa fa-bell text-grey"></b></span>报警</a>
                      </span>
                    </span>
                  </div>
                  <div class="col-xs-2 table-detail">
                    <div class="contact-action pl-subtitle">
                      <a v-if="isCanOperate" @click="editRequest(item)" title="编辑项目" :class="{'text-pencil':(iconType=='text-pencil'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-pencil',index)" @mouseleave="addOremoveActiveClass('')" class="commonIcoColor OperatorBtnEdit"><i class="fa fa-pencil m-rigth font-size-text"></i></a>
                      <a v-if="isCanOperate" @click="delRequest(item.ProjectId)" title="删除项目" :class="{'text-trash-o':(iconType=='text-trash-o'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-trash-o',index)" @mouseleave="addOremoveActiveClass('')" class="commonIcoColor m-rigth font-size-text OperatorBtnDel"><i class="fa fa-trash-o"></i></a>
                    </div>
                  </div>
                </div>
                <!--分页开始-->
                <div v-show="!noData" class="col-md-12 dataTables_wrapper" v-if="page_num > 0">
                  <div class="dataTables_info" role="status" aria-live="polite">当前显示 {{begin_row}} 到 {{end_row}} 条记录 共 {{total}} 条记录</div>
                  <div class="dataTables_paginate paging_full_numbers">
                    <a class="paginate_button previous" v-bind:class="page_record == 1 ? 'disabled' : ''" v-on:click="up_page">上一页</a>
                    <span>
                      <template v-if="(page_num > 0 && page_num <= 7)">
                          <a class="paginate_button " v-on:click="on_page(num)" v-for="num in page_num" v-bind:class="num == page_index ? 'current' : ''">{{num}}</a>
                      </template>
                      <template v-else>
                        <a class="paginate_button " v-on:click="on_page(1)" v-bind:class="page_record == 1 ? 'current' : ''">1</a>
                        <span class="ellipsis" v-if="page_record-3 > 2">…</span>
                        <a class="paginate_button" v-on:click="on_page(one_page)" v-bind:class="page_record ==    one_page ? 'current' : ''">{{one_page}}</a>
                        <a class="paginate_button" v-on:click="on_page(two_page)" v-bind:class="page_record ==    two_page ? 'current' : ''">{{two_page}}</a>
                        <a class="paginate_button" v-on:click="on_page(three_page)" v-bind:class="page_record ==    three_page ? 'current' : ''">{{three_page}}</a>
                        <a class="paginate_button" v-on:click="on_page(four_page)" v-bind:class="page_record ==     four_page ? 'current' : ''">{{four_page}}</a>
                        <a class="paginate_button" v-on:click="on_page(five_page)" v-bind:class="page_record ==     five_page ? 'current' : ''">{{five_page}}</a>
                        <span class="ellipsis" v-if="page_record+3 <= page_num">…</span>
                        <a class="paginate_button " v-on:click="on_page(page_num)" v-bind:class="page_record == page_num ? 'current' : ''">{{page_num}}</a>
                      </template>
                      </span>
                      <a class="paginate_button next" v-bind:class="page_record == page_num ? 'disabled' : ''" v-on:click="dow_page">下一页</a>
                  </div>
                </div>
              <!--分页功能结束-->
              </div>
            </div>
          </div>
        </div>
          <div id="rightAddItemList" class="col-sm-4 col-md-4 col-lg-3 bg-white b-l-1">
  <div class="panel-group" style="padding: 24px; padding-bottom: 0;padding-top: 0;">
    <div class="panel-heading">
      <h2 class="panel-title">
				                           	 {{currProjectName}}<span class="eos-stat-icon bg-info"><i class="fa  fa-home text-white"></i></span>
				                        </h2>
    </div>
    <hr class="divider">
    <ul class="list-unstyled">
      <li class="row" v-for="item in SummaryData">
        <div class="col-lg-6 wb_imgs">
          <img class=" img-responsive" src="../../../../../static/css/img/p_total.png" />
          <h3 style="font-size: 34px;color: #1f2d3d; font-weight: bold;">{{item.Total}}</h3>
          <p>设备总数</p>
        </div>
        <div class="col-lg-6 wb_imgs">
          <img class=" img-responsive" src="../../../../../static/css/img/p_warning.gif" />
          <h3 style="font-size: 34px; color: #e74c3c;">{{item.AlarmCount}}</h3>
          <p>告警设备数</p>
        </div>
      </li>
    </ul>
  </div>
          </div>
        </div>
      </div>
<!--项目列表结束-->
<!--新增项目开始-->
<div id="addItem" class="card-box table-responsive" v-show='isAdd'>
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
              <span class="input-group">
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
        <div class="contentBox detailDiv">
          <el-row class='border-1px'>
            <el-col :span="14" class='pl10'>
              <el-form ref="insertForm3" :model="insertForm" label-width="150px">
                <el-form-item label="合同编号：">
                  <el-input v-model="insertForm.ContractNo"></el-input>
                </el-form-item>
                <el-form-item label="合同文件：">
                  <el-upload class="upload-demo w300" ref="contractFileUpload" :action="uploadUrl" :data='uploadData' :multiple='false' :on-success='handleSuccessContractFile' :on-remove="handleRemoveContractFile" :file-list="insertForm.ContractFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip"></div>
                  </el-upload>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
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
</div>
</template>
<script>
import selectEmployee from '../../../common/select-employee.vue';
import { Func } from '../../../../assets/js/common'
import { debounce } from '../../../../assets/js/common/util'
import commonFn from '../../../../assets/js/common/commonFunc';
 import {mapGetters,mapMutations} from 'vuex'
let projectContr = Func.projectContr;
const DELETE = commonFn.axios.delete
console.log('projectContr:', debounce)
export default {
  data: function() {
    return {
      isShowBackMap:null,
      runState: '',
      IsLock: '',
      UserId: '',
      owner: '',
      KeyWords: '',
      PageIndex: 1,
      PageSize: 5,
      allListData: [],
      isAdd: false,
      projectLeaderData: {
        "id": "",
        "name": "",
        'UserId': '',
        'flag': '1',
        "CompanyId": ''
      },
      defaultPro_img: '../../../../../static/css/img/default_porject_bg.png',
      projectName: '',
      txtProjectIntro: '',
      ProvinceId: '',
      CityId: '',
      DistrictId: '',
      FResourceIds: '',
      FimgUrls: '',
      XResourceIds: [],
      LResourceIds: '',
      LimgUrls: '',
      ProjectAddress: '',
      GetCompanyUsers: [],
      PrincipalUserId: '',
      CompanyId: '',
      keyWords: '',
      serviceCompany: '',
      //分页数据初始化
      page_size: 5,
      page_index: 1,
      begin_row: 0,
      end_row: 0,
      total: 0,
      page_num: 0,
      page_record: 1,
      currProjectInfo: null,
      OnlineCount: 0,
      UnOnlineCount: 0,
      OrderCount: 0,
      UnSignedServiceCount: 0,
      AlarmCount: 0,
      currIndex: 0,
      currProjectName: '',
      noData: true,
      wb_code: '',
      isCodeModeShow: false,
      companyUsers: [],
      addProWbSelect: '',
      addProMainWbSelect: '',
      addProChargerSelect: '',
      emptyData: false,
      ProjectId: '',
      enterprise: [],
      isAdmin: 0,
      EntitySort: 0,
      IsProjectAdmin: 0,
      OwnerCompanyId: '',
      SummaryData: [],
      noSummaryData: false,
      currActiveIndex: '',
      iconType: '',
      last: 0,
      //合同文件
      insertForm: {
        ContractNo: '',
        ContractFileList: [],
        ContractFileId: '',
        ContractFileName: ''
      },
      //行业
      IndustryId: '',
      IndustryData: [],
      //其它
      uploadUrl: eosCommon.RESOURCES_API + 'api/resource/upload', //上传资源url
      deleteUrl: eosCommon.RESOURCES_API + "api/resource/delete",
      AccessToken: eosCommon.storage.get('AccessToken'),



    }
  },
  components: {
    selectEmployee
  },
   destroyed(){   
    console.log('vm.page_index:',this.page_index);
   	
        	this.uPDATE_ITEMLIST_PARAMS({
        		keyWords:this.keyWords,
        		pageIndex:this.page_index,
        	});
        },
  mounted: function() {
    var vm = this;
   
    vm.keyWords=vm.get_itemListParams.keyWords;
		vm.page_index=vm.get_itemListParams.pageIndex;
		 console.log('vm.get_itemListParams:',vm.get_itemListParams,vm.page_index);
    vm.getIndustry();
    vm.isFromMap()
    vm.enterpriseList();
    vm.cityselect();
    vm.GetCompanyUser();
    vm.EntitySort = eosCommon.storage.get('EntitySort');
    vm.isAdmin = eosCommon.storage.get('IsAdmin');
    vm.IsProjectAdmin = eosCommon.storage.get('IsProjectAdmin')
    vm.getProjectList();
    vm.GetTargetCompany();
    vm.initListenChange();
  },
  computed: {
  	...mapGetters([
           	'get_itemListParams'
   	]),
    routeSort(){
    	if (commonFn.storage.get("EntitySort")==2) {
    		return 'sm_'
    	}else{
    		return 'wb_'
    	}
    },
    one_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 2 : this.page_num - 5) : 2);
    },
    two_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 1 : this.page_num - 4) : 3);
    },
    three_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index : this.page_num - 3) : 4);
    },
    four_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 1 : this.page_num - 2) : 5);
    },
    five_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 2 : this.page_num - 1) : 6);
    },
    isCanOperate() {
      return projectContr.isCanOperate(this.EntitySort, this.isAdmin, this.IsProjectAdmin);
    },
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
    page_index: function(val) {
      this.getProjectList();
    }
  },
  methods: {
  	...mapMutations({
        		uPDATE_ITEMLIST_PARAMS:'UPDATE_ITEMLIST_PARAMS'
        	}),
    goTo(routerName, routerParams) {
      // console.log(routerParams)
      if (routerName=='index') {
      	routerName = `${this.routeSort}${routerName}`
      	console.log(routerName)
      }
      this.$router.push({ name: routerName, params: routerParams })
    },
    isFromMap() {
      let vm = this
      // console.log('路由进入,所带入参数是: ',vm.$route.params.FromMap)
      let params = vm.$route.params
      if (params.FromMap) {
      	vm.isShowBackMap = true
      	vm.IndustryId = params.IndustryId
        return true
      } else {
      	vm.isShowBackMap = false
        return false
      }
    },
    deleteRes(resId) {
      let url = this.deleteUrl
      let data = {
        "AccessToken": this.AccessToken,
        "Parameters": {
          "ResourceId": resId,
          "ResourceType": "2"
        }
      }
      // 删除服务器对应资源		      
      return DELETE(url, data)
    },
    //资源上传
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
    //控制资源上传按钮隐藏和显示
    uploadBtnShowAndHide(refName = 'contractFileUpload', string = '') {
      let el = this.$refs[refName].$el
      let el1 = el.childNodes[0]
      let el2 = el.childNodes[1]
      el1.style.display = string;
      el2.style.display = string;
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
    getProjectListData() {
      let vm = this;
      return debounce(function() {
        vm.getProjectList();
      }, 500, vm)();
    },
    customLazy(src, errorImg) {
      return Func.customLazy(src, errorImg)
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
    ownerSelectedChanges() {
      this.projectLeaderData.CompanyId = this.OwnerCompanyId;
      this.projectLeaderData.name = '';
      this.projectLeaderData.UserId = '';
    },
    addProWithCode: function() {
      var vm = this;
      var param = {
        "AccessToken": vm.AccessToken,
        "Parameters": {
          "LinkCode": vm.wb_code, //--关联码						    
          "MaintUserId": vm.addProWbSelect, //--维保人员（更换维保方关联码时必填）
          "MaintSupId": vm.addProMainWbSelect, //--维保主管（更换维保方关联码时选填）
          "ProjectLeader": vm.addProChargerSelect //--项目负责人（更换业主方关联码时必填填）
        }
      }
      var url = eosCommon.ENTERPRISE_API + 'Api/Project/ScanLinkCode';
      eosCommon.eosAjax(url, "Post", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
        }
      });
    },
    btnSure: function() {
      var vm = this;
      if (!verifyCheck._click("verifyCheck_0")) {
        return false;
      }
      $("#modal-cleos").modal('show');
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
          vm.getProjectList();
          vm.isAdd = false;
        }
      });
    },
    btnReturn() {
      var vm = this;
      vm.isAdd = false
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
      vm.isAdd = true;
    },
    btnQuery() {
        this.page_index = 1;
      this.getProjectList();
    },
    isLock(projectId, isLock) {
      var vm = this;
      var IsLock = '';
      isLock == 0 ? IsLock = 1 : IsLock = 0;
      var param = {
        "AccessToken": vm.AccessToken,
        "Parameters": {
          "ProjectId": projectId, //--项目Id(必填)
          "IsLock": IsLock //--（0：解锁，1：锁定 必填） 
        }
      }
      var url = eosCommon.ENTERPRISE_API + 'Api/Project/LockProject';
      eosCommon.eosAjax(url, "Post", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          if (isLock == 0) {
            eosCommon.eosMessage("success", eosCommon.LOCK_MSG);
          } else {
            eosCommon.eosMessage("success", eosCommon.UNLOCK_MSG);
          }
          vm.getProjectList();
        }
      });
    },
    editRequest: function(item) {
      let [IsDualId, ProjectId, IsTrue] = [item.IsDualId, item.ProjectId, item.IsTrue];
      eosCommon.storage.set('IsTrue', item.IsTrue);
      this.$router.push({ name: 'wb_items_edit', params: { itemInfo: { IsDualId, ProjectId, IsTrue } } })
    },
    delRequest: function(ProjectId) {
      var vm = this;
      vdialog({
        type: 'confirm',
        title: '提示',
        content: eosCommon.DELETE_MSG_ASK,
        ok: function() {
          var param = {
            "AccessToken": vm.AccessToken,
            "Parameters": {
              "ProjectId": ProjectId
            }
          };
          var url = eosCommon.ENTERPRISE_API + "api/project/delete";
          eosCommon.eosAjax(url, "Delete", param, "json", function(result) {
            if (eosCommon.checkCode(result.State, result.Message)) {
              eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
              vm.getProjectList();
            }
          });
        },
        cancel: true,
        modal: true
      });
    },
    getCurrentProInfo: function(ProjectId, index, currProjectName) {
      var vm = this;
      vm.currIndex = index;
      vm.currProjectName = currProjectName;
      var param = {
        "AccessToken": vm.AccessToken,
        "ProjectId": ProjectId
      }
      var url = eosCommon.ENTERPRISE_API + 'api/project/Summary';
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          if (result.Data.Result.length == 0) {
            console.log('fdjkfdjkfjdkjfkd')
            vm.SummaryData = [];
            vm.noSummaryData = true; //暂无数据
          } else {
            vm.SummaryData = result.Data.Result;
            vm.noSummaryData = false; //暂无数据
          }
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
    initListenChange: function() {
      var vm = this;
      $("#runState").change(function() {
        vm.getProjectList()
      });
      $("#selLock").change(function() {
        vm.getProjectList()
      });
      $("#chargers").change(function() {
        vm.getProjectList()
      });
      $("#owner").change(function() {
        vm.getProjectList()
      });
      $("#runState").selectpicker('refresh');
      $("#selLock").selectpicker('refresh');
      $("#chargers").selectpicker('refresh');
      $("#owner").selectpicker('refresh');
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
    GetCompanyUser: function() {
      var vm = this;
      var param = {
          "AccessToken": vm.AccessToken,
        },
        url = eosCommon.ENTERPRISE_API + "Api/AccountOperation/GetCompanyUser";
      eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {

          vm.GetCompanyUsers = result.Data;
          vm.$nextTick(function() {
            $("#chargers,#addProWbSelect,#addProMainWbSelect,#addProChargerSelect").selectpicker('refresh');
          })
        }
      });

    },
    GetTargetCompany: function() {
      var vm = this;
      var param = {
          "AccessToken": vm.AccessToken,
          "IsMaint": vm.EntitySort == 1 ? 0 : 1
        },
        url = eosCommon.ENTERPRISE_API + "Api/Project/GetTargetCompany";
      eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.serviceCompany = result.Data;
          vm.$nextTick(function() {
            $("#owner").selectpicker('refresh');
          })


        }
      });
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
    getProjectList: function() {
      //请求项目列表数据
      var vm = this;

      var param = {
        "AccessToken": vm.AccessToken,
        "IsMaint": vm.EntitySort, //--是否维保方(0：业主列表；1：维保列表  必填)
        "PrincipalUserId": vm.PrincipalUserId, //--用户Id,IsMaint为0时表示项目负责人Id,为1表示项目维保人员Id
        "CompanyId": vm.CompanyId, //--企业Id，IsMaint为0时表示项目所属企业Id,为1表示项目维保方企业Id
        "LockType": vm.IsLock, //--是否锁定，(0：未加锁；1：加速，空或者-1：查全部)
        "IndustryId": vm.IndustryId,
        "AlarmType": vm.runState, //--报警等级（空或-1：全部,0-正常；1-提醒;2-警告;3-报警(严重)）
        "ProjectName": vm.keyWords, //--项目名称
        "PageIndex": vm.page_index, //第几页（可为空，为空或为0时不分页）
        "PageSize": vm.page_size //条数（可为空，为空或者为0不分页）
      };
      var url = eosCommon.ENTERPRISE_API + "api/project/Query";
      eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.noData = false;
          if (result.Data.Result.length == 0) {
            vm.emptyData = true;
            vm.page_num = 0;
            vm.allListData = result.Data.Result;

          } else {
            vm.emptyData = false;
            vm.total = result.Data.Total;
            vm.allListData = result.Data.Result;
            vm.currProjectName = vm.allListData[0].ProjectName;
            vm.ProjectId = vm.allListData[0].ProjectId;
            vm.getCurrentProInfo(vm.ProjectId, 0, vm.currProjectName);
            vm.begin_row = vm.page_size * (vm.page_index - 1) + 1;
            vm.end_row = vm.page_size * (vm.page_index - 1) + vm.allListData.length;
            vm.page_num = Math.ceil(vm.total / vm.page_size);
          }



        }
      });
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
    up_page: function() {
      if (this.page_index > 1) {
        this.page_index--;
        this.page_record--;
      }
    },
    on_page: function(data) {
      this.page_index = data;
      this.page_record = data;
    },
    dow_page: function() {
      if (this.page_index < this.page_num) {
        this.page_index++;
        this.page_record++;
      }
    }
  }




}

</script>
<style lang="less">
@import '/static/css/notice.css';
#sm_item-index {
  .item-data .table-box.border-title {
    border: 1px solid #eeeeef;
    margin-bottom: 15px;
    margin-top: 20px;
    /*border-bottom: 0 solid #eeeeef;*/
  }
  .item-data .table-detail .contact-icon {
    position: absolute;
    right: 0;
    cursor: pointer;
    top: 10px;
    display: none;
  }
  .item-data .table-detail:hover .contact-icon {
    display: block;
    position: relative;
    right: 0;
    cursor: pointer;
    top: 10px;
  }
  .item-data .pl-subtitle {
    padding-left: 10px;
  }
  .item-data .table-detail {
    padding: 0;
    line-height: 75px
  }
  .item-data .table-detail .member-info {
    padding: 0;
    height: 100px;
  }
  .item-data .member-info img {
    width: 120px;
    height: 100px
  }
  .item-data .member-info .sub-title {
    padding-left: 0;
  }
  .member-info .div-ver {
    max-width: 180px;
    white-space: nowrap;
    display: inline-block;
    text-overflow: ellipsis;
    padding-left: 10px;
    position: absolute
  }
  .member-info .getway-sub-title {
    background-color: #fff;
    height: 10px;
    line-height: 10px;
    margin: 0;
    padding-top: 13px;
  }
  .member-info .getway-sub-title.project_infos {
    line-height: 22px;
    margin-top: -21px;
  }
  .member-info .getway-sub-title.project_infos p b {
    border-radius: 14px;
    /*background:rgba(192,204,218,0.4);*/
    color: #8492A6;
    font-size: 16px;
  }
  .member-info .getway-sub-title.project_infos p span.names {
    text-indent: 5px;
    color: #8492A6;
  }
  .member-info .getway-sub-title.project_infos p span.text-cog {
    color: #8492A6;
    /*font-weight: bold;*/
  }
  .table-box {
    background: #fff;
  }
  .member-info .getway-sub-title.text-20 {
    font-size: 18px;
    margin-bottom: 30px;
  }
  .member-info .getway-title.text-20 {
    font-size: 18px
  }
  .member-info .sub-title {
    padding-left: 0;
  }
  .table-detail-title {
    padding: 10px 0;
    line-height: 30px;
  }
  .table-detail-title .sub-title {
    text-align: right
  }
  .table-detail-add {
    background-color: #fff;
    display: inline-block;
    padding: 0 10px 0 5px;
  }
  .table-box.card-box.border-add:hover {
    border: 1px dashed #bbb;
    color: #1abc9c;
    font-size: 18px;
  }
  .table-box.border-1 {
    border: 1px solid #eeeeef;
    position: relative;
    margin-bottom: 15px;
  }
  .text-pencil {
    color: #1abc9c;
  }
  .text-trash-o {
    color: #ff3f4e;
  }
  .text-cog {
    color: #aaa;
  }
  .text-star {
    color: #ccc;
  }
  .font-size-text {
    font-size: 20px;
    cursor: pointer;
  }
  .m-rigth {
    margin-right: 10px;
  }
  .equipment_panel_nav ul {
    border-bottom: 1px solid #e6e6e6;
    border-left: 1px solid #e6e6e6;
  }
  .equipment_panel_nav a {
    border-right: 1px solid #e6e6e6;
    border-top: 1px solid #e6e6e6;
  }
  .item-content-title-right {
    text-align: right;
    height: 34px;
    line-height: 32px;
  }
  .contact-card,
  .item-wrapper {
    height: 40px;
  }
  .text-cleos,
  .title-info {
    display: block;
    width: 100%;
    height: 40px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .item-wrapper {
    height: 32px;
  }
  .project-list-item {
    float: left;
    width: 300px;
    height: 200px;
    margin-right: 10px;
  }
  .project-list-item img {
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

  ul.list-unstyled li {

    margin-top: 54px;
  }
  ul.list-unstyled li div.wb_imgs {

    text-align: center;
  }
  ul.list-unstyled li div.wb_imgs img {

    margin: 0 auto;
  }
  /*ul.list-unstyled li p{
    	font-size: 20px;
    	color: #fff;
    	text-align: center;
    }
    ul.list-unstyled li p:nth-of-type(2){
    	font-weight: bold;
    	font-size: 26px;
    	
    }
    ul.list-unstyled li div.img{
    	width: 54px;
    	height: 54px;
    	border-radius: 54px;
    	background: #fff;
    	text-align: center;
    	position: relative;
    }
    ul.list-unstyled li div.img img{
    	position: absolute;
    	top: 50%;
    	left: 50%;
    	margin-top: -25px;
    	margin-left: -25px;
    }*/
  .b-l-1 {
    padding: 0;
    border-left: 1px solid #f2f2f2 !important;
    border-right: 1px solid #f2f2f2 !important;
  }
  .isActive {
    background: #dfeceb;
  }
  .member-info .getway-sub-title {
    background-color: transparent;
  }
  .btn-group-sm>.btn,
  .btn-sm {
    padding: 1px 8px;
  }

  .commonIcoColor {
    color: #97bebc;
  }
  .text-trash-o i,
  .text-star i,
  .eos-text-warning i,
  .text-pencil i {
    font-size: 24px!important;
  }
  .contentBox .el-upload__input {
    display: none !important;
  }
}

</style>

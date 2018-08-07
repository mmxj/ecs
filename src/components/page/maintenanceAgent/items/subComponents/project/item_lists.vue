<template>
  <div class="default_page">
    <div class="row">
      <div class="col-sm-6 col-md-4 col-lg-2">
        <span class="size20 font-bold">项目列表</span>
      </div>
    </div>
    <hr class="divider mb-10 mt-10" style="margin-bottom: 0!important;">
    <!--项目列表开始-->
    <div id="itemList" class="item-data clearfix">
      <div class="col-sm-9 col-md-8 col-lg-9 bg-white">
        <div class="order-card-box  pb-20">
          <div>
            <div class="tab-content">
              <div class="row">
                <div class="col-lg-12">
                  <span v-if="isShowAdd" class="OrgTopAligin">
                    <button id="btnInsert" type="button" class="btn btn-default" v-on:click="getRenderProject(false)">
                        <i class="fa fa-plus m-r-5"></i>新增
                    </button>
            	  </span>
                  <span class="OrgTopAligin">
                   <select @change="getProjectList(1)"  id="queryIndustrySelect" v-model="IndustryId" class="form-control selectpicker input-sm " data-style="btn-white" data-live-search="true" data-size="8">
						<option v-for="item in IndustryData" :value="item.IndustryId">
							{{item.IndustryName}}
						</option>
					</select>
				  </span>
                  <span class="OrgTopAligin">
                    <select id="runState" @change="getProjectList(1)" v-model='runState'  class="form-control selectpicker" data-style="btn-white">	                            
                        <option value="">运行状态</option>
                        <option value="0">正常</option>
                        <option value="1">提醒</option>
                        <option value="2">警告</option>
                    </select>
           		  </span>
                  <span class="OrgTopAligin">
                    <select id="selLock" @change="getProjectList(1)" v-model="IsLock" class="form-control selectpicker" data-style="btn-white">
                        <option value="">是否锁定</option>
                        <option value="1">锁定</option>
                        <option value="0">非锁定</option>
                    </select>
           		  </span>
                  <span class="OrgTopAligin">
                    <select id="chargers" @change="getProjectList(1)" v-model="UserId" class="form-control selectpicker" data-style="btn-white">
                        <option value="" v-if='EntitySort==1'>维保人</option>
                        <option value="" v-if='EntitySort==0'>负责人</option>
                        <option v-for='item in GetCompanyUsers' :value="item.UserId">{{item.UserName}}</option>
                    </select>
	       		  </span>
                  <span class="OrgTopAligin">
                    <select id="owner" @change="getProjectList(1)" v-model="owner" class="form-control selectpicker" data-style="btn-white">
                        <option value="" v-if='EntitySort==1'>业主</option>
                        <option value="" v-if='EntitySort==0'>维保公司</option>
                        <option v-for='item in serviceCompany' :value="item.CompanyId">{{item.CompanyFullName}}</option>
                    </select>
           		  </span>
                  <span class="OperatorSearch">
                   	<span style="position: relative;" class="OrgTopAligin">
                        <input style="border-radius: 5px; width: 180px;" id="txtQueryKeywords" v-on:input="getProjectListData()" v-model="keyWords" type="text" class="form-control w-128" placeholder="项目名称">
                    	<i @click="btnQuery()" style="position: absolute;right:5px;top: 10px; color: palevioletred;" class="fa fa-search m-r-5"></i>
                   	</span>
                  </span>
                </div>
              </div>
              <div class="hr mt-10"></div>
              <loading v-show="noData"></loading>
              <div id="noData" style="margin-top: 100px;" v-show="emptyData" class="">
                <div class="text-center">
                  <div class="text-error"><img class="mt-lg mb-lg" src="../../../../../../../static/images/box.png"></div>
                  <h3 style="margin-top: 30px;">您还没有创建过项目哦！</h3>
                  <br>
                  <!--<p class="text-muted">请点击下面按钮创建一个项目吧！</p>
	                <br>
	                <button type="button" @click="btnInsert()" class="ItemAddList btn btn-default waves-effect waves-light" >
	                   <i class="fa fa-plus m-r-5"></i>创建项目
	                </button>-->
                </div>
              </div>
              <transition-group enter-active-class="animated fadeIn" style="width: 100%;" name="bounce" v-cloak>
                <div v-show=" !noData && !emptyData " :key="index" class="table-box border-1 p-10" :class="{isActive:index==currIndex}" @click="getCurrentProInfo(item.ProjectId,index,item.ProjectName)" v-for="(item,index) in allListData">
                  <div class="col-xs-8 table-detail">
                    <a>
                      <div class="member-info" style="position: relative;">
                        <router-link :to="{name:'item_detail', params:{ProjectId: item.ProjectId,ProjectName:item.ProjectName,ProjectLogo:item.ProjectLogo,IsLocked:item.IsLocked,IsExperienceProject:item.IsExperienceProject}}">
                          <img @click="intoEquipmentList(item.IsExperienceProject)" style="border-radius: 5px;" v-lazy="customLazy(item.ProjectLogo,defaultPro_img)" class="m-r-15">
                        </router-link>
                        <p v-if="item.IsLocked == 1" class="lock_info" style="position: absolute;width: 38px;height: 18px; left: 0; top: 0px;">
                          <!--<span style="display: inline-block;height: 18px;width: 38px;top: 0;left: 0;position: absolute;"></span>-->
                          <img style="display: inline-block;height: 17px;width: 33px;top: 0;left: 0;position: absolute;" src="../../../../../../../static/css/img/locked_icon.png" />
                        </p>
                        <div class="div-ver clearfix">
                          <div class="getway-sub-title text-20" style="padding-top: 5px;margin-bottom: 30px;">
                            <router-link :to="{name:'item_detail', params:{ProjectId: item.ProjectId,ProjectName:item.ProjectName,ProjectLogo:item.ProjectLogo,IsLocked:item.IsLocked,IsExperienceProject:item.IsExperienceProject}}">
                              <b @click="intoEquipmentList(item.IsExperienceProject)" class="text-dark" style="color: #000; font-size: 18px; position: relative; display: inline-block;">
                            	{{item.ProjectName}}
                            	<span style="border: 1px solid #a1afbc; color: #a1afbc; display: inline-block;padding: 5px 5px; border-radius: 5px; font-size: 12px;">{{item.IndustryName}}</span>
                              </b>
                            </router-link>
                          </div>
                          <div class="getway-sub-title project_infos clearfix">
                            <p>
                              <b class="fa  fa-street-view text-grey"></b>
                              <span class="names" v-if="EntitySort==1">维保人：</span>
                              <span class="names" v-if="EntitySort==0">负责人：</span>
                              <span class="text-cog">{{ item.UserName }}</span>
                            </p>
                            <p>
                              <b class="fa  fa-user-secret text-grey"></b>
                              <span class="names" v-if="EntitySort==1">业主：</span>
                              <span class="names" v-if="EntitySort==0">维保商：</span>
                              <span v-if="EntitySort==1" class="text-cog">{{ item.OwnerCompanyName }}</span>
                              <span v-if="EntitySort==0" class="text-cog">{{ item.MaintCompanyName }}</span>
                            </p>
                            <p>
                              <b class="fa fa-map-marker text-grey"></b>
                              <span class="names">地址：</span>
                              <span class="text-cog">{{item.ProjectAddress}}</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="col-xs-2 table-detail">
                    <span class="">
                    <span v-if="item.AlarmLevel == 0">
                        <a class="alarmLevel btn eos-btn-info btn-sm" ><span><b  class="fa fa-cog text-grey"></b></span>正常</a>
                    </span>
                    <span v-if="item.AlarmLevel == 1">
                        <a style="background: #3498db!important;" class="alarmLevel btn eos-btn-warning btn-sm"><span><b style="color: #3498db;" class="fa fa-exclamation text-grey"></b></span>提醒</a>
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
                      <a @click="editRequest(item)" v-if="isShowEdit(item.IsDualId,item.IsProjectLeader,item.IsTrue,item.IsExperienceProject)" title="编辑项目" :class="{'text-pencil':(iconType=='text-pencil'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-pencil',index)" @mouseleave="addOremoveActiveClass('')" class="OperatorBtnEdit commonIcoColor"><i class="fa fa-pencil m-rigth font-size-text"></i></a>
                      <a @click="delRequest(item.ProjectId)" v-if="isShowDelete(item.IsDualId,item.IsTrue,item.IsExperienceProject)" title="删除项目" :class="{'text-trash-o':(iconType=='text-trash-o'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-trash-o',index)" @mouseleave="addOremoveActiveClass('')" class=" m-rigth font-size-text OperatorBtnDel commonIcoColor"><i class="fa fa-trash-o"></i></a>
                      <a @click="isLock(item.ProjectId,item.IsLocked)" title="点击锁定项目" :class="{'text-star':(iconType=='text-star'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-star',index)" @mouseleave="addOremoveActiveClass('')" v-if="((item.IsLocked == 0 || item.IsLocked == null) && isShowLock(item.IsProjectLeader,item.IsDualId,item.IsTrue,item.IsExperienceProject))" class="commonIcoColor" href="javascript:;"><i class="fa fa-unlock m-rigth font-size-text"></i></a>
                      <a @click="isLock(item.ProjectId,item.IsLocked)" title="点击取消锁定" :class="{'eos-text-warning':(iconType=='eos-text-warning'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('eos-text-warning',index)" @mouseleave="addOremoveActiveClass('')" v-if="((item.IsLocked == 1 || item.IsLocked == null) && isShowLock(item.IsProjectLeader,item.IsDualId,item.IsTrue,item.IsExperienceProject))" class="commonIcoColor" href="javascript:;"><i style="" class="fa fa-lock m-rigth font-size-text "></i></a>
                    </div>
                  </div>
                </div>
              </transition-group>
              <!--分页开始-->
              <paging v-show="pagingDatas.total!=0" :pagingData="pagingDatas"></paging>
              <!--分页功能结束-->
            </div>
          </div>
        </div>
      </div>
      <div id="rightAddItemList" class="col-sm-3 col-md-4 col-lg-3 bg-white b-l-1">
        <div class="panel-group" style="padding: 24px; padding-bottom: 0;padding-top: 0;">
          <div class="panel-heading">
            <h2 class="panel-title">
           	 	{{currProjectName}}<span class="eos-stat-icon bg-info"><i class="fa fa-home text-white"></i></span>
            </h2>
          </div>
          <hr class="divider">
          <ul class="list-unstyled" v-if="EntitySort==1">
            <li class="row" v-for="item in SummaryData">
              <div class="col-lg-6 wb_imgs">
                <img class=" img-responsive" src="static/css/img/p_total.png" />
                <h3 style="font-size: 34px;color: #1f2d3d; font-weight: bold;">{{item.Total}}</h3>
                <p>设备总数</p>
              </div>
              <div class="col-lg-6 wb_imgs">
                <img class=" img-responsive" src="static/css/img/p_warning.gif" />
                <h3 style="font-size: 34px; color: #e74c3c;">{{item.AlarmCount}}</h3>
                <p>告警设备数</p>
              </div>
            </li>
          </ul>
          <ul class="list-unstyled" v-if="EntitySort==0">
            <li class="row type_z" v-for="item in SummaryData" style="">
              <div class="col-lg-3 yz_imgs">
                <img class="img-responsive" src="static/css/img/p_zhu.png" />
                <img v-if="item.TypeName=='冷冻水泵'" class=" img-responsive" src="static/css/img/p_total_02.png" />
                <img v-if="item.TypeName=='冷却水泵'" class=" img-responsive" src="static/css/img/p_total_03.png" />
                <img v-if="item.TypeName=='冷却水塔'" class=" img-responsive" src="static/css/img/p_total_04.png" />
                <img v-if="item.TypeName=='多联机'" class=" img-responsive" src="static/css/img/p_total_05.png" />
                <img v-if="item.TypeName=='风柜'" class=" img-responsive" src="static/css/img/p_total_06.png" />
                <img v-if="item.TypeName=='其它'" class=" img-responsive" src="static/css/img/p_total_07.png" />
              </div>
              <div class="col-lg-8 yz_infos">
                <h3 style="">{{item.TypeName}}</h3>
                <p class="p1">
                  <span>告警设备数：</span>
                  <span class="span2">{{item.AlarmCount}}</span>
                </p>
                <p class="p2" style="">
                  <span style="float: left;padding-right: 16px;" class="">总设设备数：<span class="span_num">{{item.Total}}</span></span>
                  <span style="float: left; " class="span_title">离线设备数：<span class="span_num">{{item.OnlineCount}}</span></span>
                </p>
              </div>
            </li>
          </ul>
          <no-data v-if="noSummaryData"></no-data>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import commonFn from 'assets/js/common/commonFunc';
import { debounce } from 'assets/js/common/util';
import { mapGetters, mapMutations } from 'vuex'
let projectContr = commonFn.projectContr;
const DELETE = commonFn.axios.delete
export default {
  data: function() {
    return {
      runState: '',
      IsLock: '',
      UserId: '',
      owner: '',
      KeyWords: '',
      allListData: [],

      GetCompanyUsers: [],
      PrincipalUserId: '',
      CompanyId: '',
      keyWords: '',
      serviceCompany: '',
      currProjectInfo: null,
      OnlineCount: 0,
      UnOnlineCount: 0,
      AlarmCount: 0,
      currIndex: 0,
      currProjectName: '',
      noData: true,
      companyUsers: [],
      addProWbSelect: '',
      addProMainWbSelect: '',
      addProChargerSelect: '',
      emptyData: false,
      ProjectId: '',
      codeAddTitle: '维保关联码:',
      /* 新增项目*/
      addProParams: {

      },
      /*操作控制条件*/
      isAdmin: 0,
      EntitySort: 1,
      //IsDualId:0,
      isProjectAdmin: 0,
      isProjectLeader: 0,
      //projectContr:'',
      SummaryData: [],
      noSummaryData: false,
      currActiveIndex: '',
      iconType: '',
      //分页数据
      pagingDatas: {
        page_size: 5,
        page_index: 1,
        begin_row: 0,
        end_row: 0,
        total: 0,
        page_num: 0
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
  components: {},
  create() {
    this.getRenderProject(true);
  },
  mounted() {
    let vm = this;
    if (this.$route.params.subType == 1) {
      vm.runState = 3;
    }
    vm.getIndustry();
    vm.GetCompanyUser();

    vm.EntitySort = eosCommon.storage.get('EntitySort');
    vm.isAdmin = eosCommon.storage.get('IsAdmin');
    vm.isProjectAdmin = eosCommon.storage.get('IsProjectAdmin');
    vm.getProjectList();
    vm.GetTargetCompany();
    vm.initListenChange();
  },
  computed: {
    ...mapGetters(['get_isRenderPro_index']),
    //锁定			
    showLockParams() {
      return [this.EntitySort, this.isAdmin]
    },
    showAddParams() {
      return [this.isAdmin, this.isProjectAdmin]
    },
    isShowAdd() {
      return projectContr.projectAdd(...this.showAddParams);
    },
    showOtherParams() {
      return [this.EntitySort, this.isAdmin, this.isProjectAdmin]
    },
    uploadData() {
      return {
        "AccessToken": this.AccessToken,
        "ResourceType": "2",
        "Title": "合同附件",
        "Description": "合同附件"
      }
    },
    defaultPro_img() {
      return require('../../../../../../../static/css/img/default_porject_bg.png');
    }

  },
  watch: {

    "pagingDatas.page_index": function(val, oldVal) {
      this.getProjectList();
    }
  },
  methods: {
    ...mapMutations({
      renderProject: 'RENDER_PRO_INDEX'
    }),
    getRenderProject(isRender) {
      this.renderProject({ isRender: isRender });
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
        vm.getProjectList(1);
      }, 500, vm)();
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
    intoEquipmentList(IsExperienceProject) {
      eosCommon.storage.set('IsExperienceProject', IsExperienceProject);
    },
    isShowLock(IsProjectLeader, IsDualId, IsTrue, IsExperienceProject) {
      return projectContr.projectLock(...this.showLockParams, IsProjectLeader, IsDualId, IsTrue, IsExperienceProject);
    },
    isShowDelete(IsDualId, IsTrue, IsExperienceProject) {
      return projectContr.projectDelete(...this.showOtherParams, IsDualId, IsTrue, IsExperienceProject);
    },
    isShowEdit(IsDualId, IsProjectLeader, IsTrue, IsExperienceProject) {
      return projectContr.projectEdit(...this.showOtherParams, IsDualId, IsProjectLeader, IsTrue, IsExperienceProject);
    },


    btnQuery() {
      this.page_index = 1;
      this.getProjectList();
    },
    isLock(projectId, isLock) {
      let vm = this;
      let IsLock = '';
      isLock == 0 ? IsLock = 1 : IsLock = 0;
      let param = {
        "AccessToken": vm.AccessToken,
        "Parameters": {
          "ProjectId": projectId, //--项目Id(必填)
          "IsLock": IsLock //--（0：解锁，1：锁定 必填） 
        }
      }
      let url = eosCommon.ENTERPRISE_API + 'Api/Project/LockProject';
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
    editRequest(item) {
      let [IsDualId, ProjectId, IsTrue] = [item.IsDualId, item.ProjectId, item.IsTrue];
      eosCommon.storage.set('IsTrue', item.IsTrue);
      eosCommon.storage.set('IsDualId', item.IsDualId);
      this.$router.push({ name: 'wb_items_edit', params: { itemInfo: { IsDualId, ProjectId, IsTrue } } })
    },
    delRequest(ProjectId) {
      let vm = this;
      vdialog({
        type: 'confirm',
        title: '提示',
        content: eosCommon.DELETE_MSG_ASK,
        ok: function() {
          let param = {
            "AccessToken": vm.AccessToken,
            "Parameters": {
              "ProjectId": ProjectId
            }
          };
          let url = eosCommon.ENTERPRISE_API + "api/project/delete";
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
    getCurrentProInfo(ProjectId, index, currProjectName) {
      let vm = this;
      vm.currIndex = index;
      vm.currProjectName = currProjectName;
      let param = {
        "AccessToken": vm.AccessToken,
        "ProjectId": ProjectId
      }
      let url = eosCommon.ENTERPRISE_API + 'api/project/Summary';
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          if (result.Data.Result.length == 0) {
            vm.SummaryData = [];
            vm.noSummaryData = true; //暂无数据
          } else {
            vm.SummaryData = result.Data.Result;
            vm.noSummaryData = false;
          }
        }
      });
    },

    initListenChange() {
      let vm = this;
      vm.$nextTick(() => {
        $("#runState option[value='" + vm.runState + "']").prop("selected", true);
        $("#runState").selectpicker('refresh');
        $("#selLock").selectpicker('refresh');
        $("#chargers").selectpicker('refresh');
        $("#owner").selectpicker('refresh');
      });
    },

    GetCompanyUser() {
      let vm = this;
      let param = {
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
    GetTargetCompany() {
      let vm = this;
      let param = {
          "AccessToken": vm.AccessToken,
          "IsMaint": vm.EntitySort == 1 ? 0 : 1
        },
        mounted(){
        	 
        	let vm=this;       	
        	if(this.$route.params.subType==1){
        		vm.runState=3;
        	}        	       		
    		vm.keyWords=vm.get_itemListParams.keyWords;
    		vm.pagingDatas.page_index=vm.get_itemListParams.pageIndex;
        	vm.getIndustry();
        	vm.GetCompanyUser();
        	
    		vm.EntitySort=eosCommon.storage.get('EntitySort');
    		vm.isAdmin=eosCommon.storage.get('IsAdmin');
    		vm.isProjectAdmin=eosCommon.storage.get('IsProjectAdmin');
        	vm.getProjectList();        	
        	vm.GetTargetCompany(); 
        	vm.initListenChange();
        },
         computed: {
           ...mapGetters([
           	'get_isRenderPro_index',
           	'get_itemListParams'
           	]),
			//锁定			
			showLockParams(){
				return [this.EntitySort,this.isAdmin]
			},
			showAddParams(){
				return [this.isAdmin,this.isProjectAdmin]
			},
			isShowAdd(){
				return projectContr.projectAdd(...this.showAddParams);				
			},
			showOtherParams(){
				return [this.EntitySort,this.isAdmin,this.isProjectAdmin]
			},
			uploadData() {
		      return {
		        "AccessToken": this.AccessToken,
		        "ResourceType": "2",
		        "Title": "合同附件",
		        "Description": "合同附件"
		      }
    		},
    		 defaultPro_img(){
    		 	return require('../../../../../../../static/css/img/default_porject_bg.png');
    		 }
    	
        },
        watch:{
        	
        	"pagingDatas.page_index": function(val, oldVal) {
						 this.getProjectList();
					}
        },
        destroyed(){        	
        	this.uPDATE_ITEMLIST_PARAMS({
        		keyWords:this.keyWords,
        		pageIndex:this.pagingDatas.page_index,
        	});
        },
        methods:{
        	...mapMutations({
        		renderProject:'RENDER_PRO_INDEX',
        		uPDATE_ITEMLIST_PARAMS:'UPDATE_ITEMLIST_PARAMS'
        	}),
        	getRenderProject(isRender){
        		this.renderProject({isRender:isRender});
        	},
        	getIndustry(){
        		let vm=this;
        		let param = {
                    "AccessToken":vm.AccessToken						   
                  }
                    let url = eosCommon.ENTERPRISE_API + 'api/common/industry';
                    eosCommon.eosAjax(url, "get", param, "json", function(result) {
                        if(eosCommon.checkCode(result.State, result.Message)) {
                      	vm.IndustryData=result.Data;
	                       	vm.$nextTick(()=>{
	                       		$('#IndustrySelect').selectpicker('refresh');
	                       		$('#queryIndustrySelect').selectpicker('refresh');
	                       	});
                        }
                    });
        	},
        	getProjectListData(){
        		let vm=this;
        		return debounce(function(){
						vm.getProjectList(1);	
				},500,vm)();
        	},
        	customLazy(src,errorImg){			
				return commonFn.customLazy(src,errorImg)
			},
        	addOremoveActiveClass(iconType,currActiveIndex){
				let vm=this;
				if(iconType==''){
					vm.iconType='';
					return;
				}
				vm.iconType=iconType;
				vm.currActiveIndex=currActiveIndex;
			},
    	intoEquipmentList(IsExperienceProject){
    		eosCommon.storage.set('IsExperienceProject',IsExperienceProject);
    	},
    	isShowLock(IsProjectLeader,IsDualId,IsTrue,IsExperienceProject){
					return projectContr.projectLock(...this.showLockParams,IsProjectLeader,IsDualId,IsTrue,IsExperienceProject);				
			},			
			isShowDelete(IsDualId,IsTrue,IsExperienceProject){
				return projectContr.projectDelete(...this.showOtherParams,IsDualId,IsTrue,IsExperienceProject);				
			},
			isShowEdit(IsDualId,IsProjectLeader,IsTrue,IsExperienceProject){
				return projectContr.projectEdit(...this.showOtherParams,IsDualId,IsProjectLeader,IsTrue,IsExperienceProject);				
			},			

      if (vm.EntitySort == 1) {
        vm.PrincipalUserId = vm.UserId;
        vm.CompanyId = vm.owner;
        vm.codeAddTitle = '维保关联码:';
      } else if (vm.EntitySort == 0) {
        vm.codeAddTitle = '项目拥有码:';
      }
      let param = {
        "AccessToken": vm.AccessToken,
        "IsMaint": vm.EntitySort, //--是否维保方(0：业主列表；1：维保列表  必填)
        "PrincipalUserId": vm.PrincipalUserId, //--用户Id,IsMaint为0时表示项目负责人Id,为1表示项目维保人员Id
        "CompanyId": vm.CompanyId, //--企业Id，IsMaint为0时表示项目所属企业Id,为1表示项目维保方企业Id
        "LockType": vm.IsLock, //--是否锁定，(0：未加锁；1：加速，空或者-1：查全部)
        "AlarmType": vm.runState, //--报警等级（空或-1：全部,0-正常；1-提醒;2-警告;3-报警(严重)）
        "ProjectName": vm.keyWords, //--项目名称
        "IndustryId": vm.IndustryId,
        "PageIndex": vm.pagingDatas.page_index, //第几页（可为空，为空或为0时不分页）
        "PageSize": vm.pagingDatas.page_size //条数（可为空，为空或者为0不分页）
      };
      let url = eosCommon.ENTERPRISE_API + "api/project/Query";
      eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.noData = false;
          if (result.Data.Result.length == 0) {
            vm.emptyData = true;
            //vm.page_num = 0;
            vm.pagingDatas.total = 0;
            vm.allListData = result.Data.Result;

          } else {
            vm.emptyData = false;
            vm.pagingDatas.total = result.Data.Total;
            vm.allListData = result.Data.Result;
            vm.currProjectName = vm.allListData[0].ProjectName;
            vm.ProjectId = vm.allListData[0].ProjectId;
            vm.getCurrentProInfo(vm.ProjectId, 0, vm.currProjectName);
            vm.pagingDatas.begin_row = vm.pagingDatas.page_size * (vm.pagingDatas.page_index - 1) + 1;
            vm.pagingDatas.end_row = vm.pagingDatas.page_size * (vm.pagingDatas.page_index - 1) + vm.allListData.length;
            vm.pagingDatas.page_num = Math.ceil(vm.pagingDatas.total / vm.pagingDatas.page_size);
          }
        }
      });
    }

  }
}

</script>
<style lang="less">
/*scoped="scoped"*/

@import '/static/css/notice.css';
#item-index {
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
  .yz_imgs {
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 60px;
  }
  .yz_imgs img {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -30px;
    margin-top: -15px;
  }
  .yz_infos {
    text-align: left;
  }
  .yz_infos h3 {
    font-size: 14px;
    color: #1f2d3d;
    font-weight: bold;
  }
  .yz_infos span.span2 {
    color: #e74c3c;
    font-size: 20px;
    font-weight: bold;
  }

  .yz_infos p.p2 span.span_num {
    color: #1f2d3d;
    font-size: 16px;
  }
  .yz_infos p.p2 span.span_title {
    /*padding-left: 16px;*/
  }
  .b-l-1 {
    padding: 0;
    border-left: 1px solid #f2f2f2 !important;
    border-right: 1px solid #f2f2f2 !important;
  }
  .isActive {
    /*background: #eff2f7;*/
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

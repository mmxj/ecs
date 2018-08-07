<style scoped lang='less'>
.overviewCont {
  background: #fff;
  overflow: hidden;
  position: absolute; 
right: 15px;
/*width:300px;*/
 top: 15px;
 bottom: 0;
 left: 235px;

  & .rightPart {
    /*border: 1px solid red;*/
    position: absolute;
    left: 0px;
    top: 0px;
    bottom: 28px;
    right: 0px;
    overflow-x: hidden;
    overflow-y: auto;
    & .rightPartTitle {
      width: 100%;
      overflow: hidden;
      background: #DFECEB;
      position: relative;
      & .menu {
        float: left;
        overflow: hidden;
        & .unit {
          border-top: 1px solid #DFECEB;
          float: left;
          width: 90px;
          position: relative;
          height: 50px;
          /*overflow: hidden;*/
          text-align: center;
          cursor: pointer;
          & .menuLogo {
            width: 20px;
            height: 20px;
            margin: 7px auto 0;
            background: #1F2D3D none center center no-repeat;
            border-radius: 50%;
          }
          & .menuActive {
            background-color: #1ABC9C;
          }
          & span {
            color: #1F2D3D;
            position: relative;
            top: -22px;
            font-size: 12px;
            font-weight: bold;
          }
          & span.active {
            color: #1ABC9C;
          }
        }
        & .unit:after {
          content: '';
          width: 1px;
          height: 25px;
          background: #BFD9D7;
          position: absolute;
          right: 0;
          top: 15px;
        }
        & .bgActive {
          background: #fff;
        }
        & .bgActive:after {
          content: '';
          width: 1px;
          height: 25px;
          background: #fff;
          position: absolute;
          right: 0;
          top: 15px;
        }
      }
    }
    & .tabContent {
      position: absolute;
      top: 50px;
      bottom: 0;
      left: 0;	
      right: 0;
      overflow-x: hidden;
      overflow-y: auto;
      /*padding: 15px;*/
    }
    /*********************/

  }
}
.noDataBg {
	position: absolute;
	top: 0;
	bottom: 0;
	width:226px;
	height: 218px;
	top: 50%;
	left: 50%;
	margin-left: -113px;
	margin-top: -109px;
	text-align: center;
		img{
		margin: 0 auto;
		/*margin-top: 30px;*/
		width: 226px;
		height: 158px;
		}
		h3{
		margin: 0 auto;
		margin-top: 30px;
		text-align: center;
		font-size: 16px;
		font-weight: bolder;
		color: #1abc9c;
		}
		
		
	}
</style>
<template>
  <div class="overviewCont">
    <!--<div class="leftPart">
      <div class="leftPartTitle">
        <div class="imgWrap">
          <img v-lazy="customLazy(projectData.ProjectLogo||ProjectLogo,defaultPro_img)" width="35" height="35">
        </div>
        <p class="nowrap" :title='projectData.ProjectName||ProjectName'>{{projectData.ProjectName||ProjectName}}</p>
      </div>
      <div class="listArea">
       		 列表组件位置:
        <br /> 测试按钮:
        <el-button @click='isShow=!isShow'>切换测试</el-button>

      </div>
    </div>-->
    <div class="rightPart">
      <template>
        <div class="rightPartTitle">
          <div class="menu">
            <div class="unit" v-for='(item,index) in menuData' @click='setMenuIndex(index)' :class="item.isActive?'bgActive':''">
              <div class="menuLogo" :style="item.imgSty" :class="item.isActive?'menuActive':''"></div>
              <br />
              <span :class="item.isActive?'active':''">{{item.name}}</span>
            </div>
          </div>
          <el-button class='fr mr15' size='small' style='margin-top:8px' @click='btnReturn'>
            <i class="fa fa-mail-reply-all mr5"></i>返回
          </el-button>
        </div>
        <div class="tabContent">
        	<div v-show='!equipmentData.EquipmentId' class="noDataBg">
        		<img class="img-responsive" src="static/css/images/noEquip.png" />
						<!--noEquip  noEquipDetialBg-->
						<h3>项目下暂无设备</h3>
        	</div>
					<!--<no-data  v-show='!equipmentData.EquipmentId' :customStyle="'margin-top:120px;'" :others="false" :srcs="'static/css/images/noEquip.png'" :noDataInfo="'项目下暂无设备 !'"></no-data>-->
       										<!--detailData-->
          	<component v-if="detailData.EquipmentId" :operateType="operateType" :propsData="detailData" :is="menuView"></component>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
	import menu1Png from 'assets/images/projectList/realtime.png'
import menu2Png from 'assets/images/projectList/history.png'
import menu3Png from 'assets/images/projectList/warning.png'
import menu4Png from 'assets/images/projectList/record.png'
import menu5Png from 'assets/images/projectList/miaplan.png'
import menu6Png from 'assets/images/projectList/event.png'
import menu7Png from 'assets/images/projectList/equipmes.png'
import menu8Png from 'assets/images/projectList/equipfile.png'
import menu9Png from 'assets/images/projectList/polling.png'
//import * as Common from 'src/assets/js/common';
 import info from 'components/page/maintenanceAgent/items/subComponents/equipment/common/info.vue';
 import {getStyle,getWinSize } from 'src/assets/js/common/util.js';
import { mapGetters,mapMutations, mapActions } from 'vuex'
import fault_warning from 'components/page/owner/items/common/warning.vue';
import maintenance_plan from 'components/page/maintenanceAgent/items/subComponents/equipment/common/maintenance_plan.vue';
// import eventlog from 'components/page/maintenanceAgent/items/subComponents/equipment/common/event_log.vue';
import eventlog from 'components/page/common/log_list/equipmentEventLog';
import dragData from 'components/page/maintenanceAgent/items/subComponents/equipment/common/dragData.vue';
import realtime from 'components/page/maintenanceAgent/items/subComponents/equipment/common/realtime_data.vue';
import running from 'components/page/maintenanceAgent/items/subComponents/equipment/common/running.vue';
import history_data from 'components/page/maintenanceAgent/items/subComponents/equipment/history_data.vue';
import archives from 'components/page/maintenanceAgent/items/subComponents/equipment/common/archives.vue';
import polling from 'components/page/maintenanceAgent/items/subComponents/equipment/common/polling.vue';
import service from 'components/page/owner/items/common/record.vue'

// import commonFn from '../../../../../assets/js/common/commonFunc'
// let projectContr = commonFn.projectContr;
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const URL = Common.Const.url
export default {
  data: function() {
    return {
      IsOnline: '',
      RunState: '',
      AlarmLevel: '',
      OnlineStatusName: '',
      AlarmLevelName: '',

      activeName: 'tab10',
      showWhichTab: 'tab10',

      detailData:{
      	
      },
      operateType:{
      	reBackClickFlag:1,
      	mChangeState:0
      },
      currIndex:0,
		
      eventData: '',
      currentView: 'realtime',
      currentViewTab: 'realtime',
      archivesData: '',
      EquipmentId:'',
      /*equipmentData: {
        EquipmentId: this.equipmentData.EquipmentId,
        ProjectId: ''
      },*/
      onlineClass: 'eos-btn-info',
      nolineClass: 'eos-btn-gray',
      IsProjectAdmin: 0,
      el:null,
        //保存数据
		Texts: [],
		Images: [],
		Dashboards: [],
		//数据处理
		typeDatas: [
			'get_upLoad_img_data',
			'get_label_data'
		],
		menuView: 'service',
      menuData: [{
        name: '实时数据',
        menuView: 'dragData',
        isActive: true,
        src: menu1Png,
        imgSty: {
          backgroundImage: `url(${menu1Png})`
        }
      }, {
        name: '历史数据',
        menuView: 'history_data',
        isActive: false,
        src: menu2Png,
        imgSty: {
          backgroundImage: `url(${menu2Png})`
        }
      }, {
        name: '设备巡检',
        menuView: 'polling',
        isActive: false,
        src: menu9Png,
        imgSty: {
          backgroundImage: `url(${menu9Png})`
        }
      }, {
        name: '预警告警',
        menuView: 'fault_warning',
        isActive: false,
        src: menu3Png,
        imgSty: {
          backgroundImage: `url(${menu3Png})`
        }
      }, {
        name: '服务记录',
        menuView: 'service',
        isActive: false,
        src: menu4Png,
        imgSty: {
          backgroundImage: `url(${menu4Png})`
        }
      }, {
        name: '维保计划',
        menuView: 'maintenance_plan',
        isActive: false,
        src: menu5Png,
        imgSty: {
          backgroundImage: `url(${menu5Png})`
        }
      }, {
        name: '事件记录',
        menuView: 'eventlog',
        isActive: false,
        src: menu6Png,
        imgSty: {
          backgroundImage: `url(${menu6Png})`
        }
      }, {
        name: '设备信息',
        menuView: 'info',
        isActive: false,
        src: menu7Png,
        imgSty: {
          backgroundImage: `url(${menu7Png})`
        }
      }, {
        name: '设备档案',
        menuView: 'archives',
        isActive: false,
        src: menu8Png,
        imgSty: {
          backgroundImage: `url(${menu8Png})`
        }
      } ]
    }
  },
  props: ['equipmentData'],
  computed: {
    //工单管理和服务管理模块的显示控制
    iShowModels() {
      return projectContr.isProjectAdmin(...this.showModelsParams);
    },
    showModelsParams() {
      return [this.IsProjectAdmin]
    },
    propsData() {
      return {
        'EquipmentId': this.equipmentData.EquipmentId
      }
    },
    ...mapGetters([
      'isShowSideBar',
      'get_tempDrag_Datas',
      'get_curr_TargetId',
      'get_upLoad_img_data',
			'get_label_data',
			'get_isDeleteClick_state'
    ])
  },
  components: {
    realtime,
     info,
    fault_warning,
    maintenance_plan,
    eventlog,
    dragData,
    history_data,
    running,
    archives,
    polling,
    service
  
  },
      watch: {
    	'operateType.reBackClickFlag'(val,oldval){
    		let vm=this;
    		if(val==3){
    			//保存过的返回
		      if (vm.isFromMap()) {
		        vm.$router.go(-1)
		        return
		      }
		      this.uPDATE_SHOWWHICHTAB({
		        showWhichTab: 1
		      });
    		}
    	},
    	'operateType.mChangeState'(val,oldval){
    		let vm=this;
    			if(val==2){//保存成功，进行跳转
    				vm.intoMenu(vm.currIndex);
						eosCommon.storage.set('menuView',vm.menuView);
    			}
    		
    	},
      equipmentData(val,oldval) {      
      	this.EquipmentId=val.EquipmentId;
        this.getData();
      },
      isShowSideBar(val) {        
      }
    },
  methods: {
    ...mapActions({
        stopRenderChart: 'render_chart',
        uPDATE_SETTING_STATE:'UPDATE_SETTING_STATE'
      }),
      ...mapMutations({
      	uPDATE_SETTING_STATE:'UPDATE_SETTING_STATE',
      	uPDATETEMPDATA: 'UPDATETEMPDATA',
      	dELETE_LABEL:'DELETE_CURR_PANEL',
      	uPDATE_SHOWWHICHTAB:'UPDATE_SHOWWHICHTAB'
      }),
      btnReturn() {
	      let vm = this;
	      if(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
			       vm.$router.go(-1)
					return;
				}
	       vm.operateType['reBackClickFlag'] = 2;	 
	       //console.log(vm.detailData);
    },
     isFromMap() {
      let route = this.$route
      let bool = route.params.isFromMap || route.query.warn
      return bool
    },
     setMenuIndex(index) {
      let vm = this
				vm.currIndex=index; 
      //console.log('111');				
      if(!vm.equipmentData.EquipmentId){
      	for (let i in vm.menuData) {
	        vm.menuData[i].isActive = false
	      }
	      vm.menuData[index].isActive = true;
	      return;
      } 
      if(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {      	
		       vm.intoMenu(vm.currIndex);
  					eosCommon.storage.set('menuView',vm.menuView);
						return;
				}
        vm.operateType.mChangeState=1;//没有保存的情况，触发是否保存  
    },
    intoMenu(index){
    		let vm=this;
    		for (let i in vm.menuData) {
	        vm.menuData[i].isActive = false
	      }
	      vm.menuData[index].isActive = true;
    		vm.menuView = vm.menuData[index].menuView   
    },
      handleClick(tab, event) {
      		let vm=this;     		
      		if(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
					vm.toggleTabs(tab);
					return;
				}
				//get_curr_TargetId
				vm.$confirm('部分操作暂未保存, 是否保存所有操作后再关闭?', '提示', {
					confirmButtonText: '先保存',
					cancelButtonText: '直接关闭',
					type: 'warning'
				}).then(() => {
					//确定操作

					vm.saveAllDragDatas();
					vm.uPDATE_SETTING_STATE({
						curr_setting_state: false,
						isPreview: true,
						targetId: vm.get_curr_TargetId,
						isHasData: true
					});
					vm.toggleTabs(tab);
					//vm.initToggleTabs(tabText);
				}).catch(() => {
					vm.clearStorageTempDragData();
					vm.uPDATE_SETTING_STATE({
						curr_setting_state: false,
						isPreview: true,
						targetId: vm.get_curr_TargetId,
						isHasData: true
					});
					vm.toggleTabs(tab);
				})
      },
      saveAllDragDatas() {
				let vm = this;
				let len_type = vm.typeDatas.length;
				let len_label = vm.get_label_data.length;
				let len_img = vm.get_upLoad_img_data.length;

				vm.Images = [];
				vm.Texts = [];
				for(let j = 0; j < len_type; j++) {
					if(vm.typeDatas[j] == 'get_label_data') {
						for(let i = 0; i < len_label; i++) {
							vm.getStyleValue(vm.get_label_data[i]);
							let typeName = vm.get_label_data[i].typeName;
							let typeId = vm.get_label_data[i].typeId;
							let refs = vm.get_label_data[i].refs;
							let type = vm.get_label_data[i].editData.selectDataType == 'fixedTxt' ? 1 : 2;
							let PrePositionValue=vm.get_label_data[i].editData.PrePositionValue;							
							let DefaultValue = vm.get_label_data[i].editData.labelContent;
							let PostPositionValue=vm.get_label_data[i].editData.PostPositionValue;
							let TerminalEquipmentId = vm.get_label_data[i].editData.dataStream.EquipmentId
							let Address = vm.get_label_data[i].editData.dataStream.RegisterAddress
							let Color = vm.get_label_data[i].editData.Style.color;
							let FontSize = vm.get_label_data[i].editData.Style.fontSize;
							let IsBold = vm.get_label_data[i].editData.Style.fontWeight == 'bold' ;
							let fontItalic = vm.get_label_data[i].editData.Style.fontItalic == 'italic';
							let IsUnderLine = vm.get_label_data[i].editData.Style.fontUnderLine == 'underline';
							
							let posColor = vm.get_label_data[i].editData.PostPositionStyle.color;
							let posFontSize = vm.get_label_data[i].editData.PostPositionStyle.fontSize;
							let posIsBold = vm.get_label_data[i].editData.PostPositionStyle.fontWeight == 'bold' ;
							let posfontItalic = vm.get_label_data[i].editData.PostPositionStyle.fontItalic == 'italic';
							let posIsUnderLine = vm.get_label_data[i].editData.PostPositionStyle.fontUnderLine == 'underline';
							
							let preColor = vm.get_label_data[i].editData.PrePositionStyle.color;
							let preFontSize = vm.get_label_data[i].editData.PrePositionStyle.fontSize;
							let preIsBold = vm.get_label_data[i].editData.PrePositionStyle.fontWeight == 'bold' ;
							let prefontItalic = vm.get_label_data[i].editData.PrePositionStyle.fontItalic == 'italic';
							let preIsUnderLine = vm.get_label_data[i].editData.PrePositionStyle.fontUnderLine == 'underline';
							vm.Texts.push({
								"TextId": refs,
								"Type": type,
								"PrePositionValue":PrePositionValue,
								"DefaultValue": DefaultValue,
								'PostPositionValue':PostPositionValue,
								"TerminalEquipmentId": TerminalEquipmentId,
								"Address": Address,
								"Style":{									
									"Color": Color,
									"FontSize": FontSize,
									"IsBold": IsBold,
									"IsItalic": fontItalic,
									"IsUnderLine": IsUnderLine,
									"AlignType": 1,
								},
								"PostPositionStyle":{									
									"Color": posColor,
									"FontSize": posFontSize,
									"IsBold": posIsBold,
									"IsItalic": posfontItalic,
									"IsUnderLine": posIsUnderLine,
									"AlignType": 1,
								},
								"PrePositionStyle":{									
									"Color": preColor,
									"FontSize": preFontSize,
									"IsBold": preIsBold,
									"IsItalic": prefontItalic,
									"IsUnderLine": preIsUnderLine,
									"AlignType": 1,
								},
								"Layout": vm.get_label_data[i].editData.layOutStyle,
								"Level": 2
							});
						}
					} else if(vm.typeDatas[j] == 'get_upLoad_img_data') {
						for(let i = 0; i < len_img; i++) {
							vm.getStyleValue(vm.get_upLoad_img_data[i]);
							let typeName = vm.get_upLoad_img_data[i].typeName;
							let typeId = vm.get_upLoad_img_data[i].typeId;
							vm.Images.push({
								"ImageId": typeName + typeId,
								"ResoureId": vm.get_upLoad_img_data[i].editData.ResoureId,
								"Layout": vm.get_upLoad_img_data[i].editData.layOutStyle,
								"Level": 2
							});
						}
					}
				}
				//Texts Images
				vm.submitDragDatas();
			},
			submitDragDatas() {
				let vm = this;
				for(let i = 0; i < vm.Images.length; i++) {
					if(!vm.Images[i].ResoureId) {
						vdialog({
							type: 'confirm',
							title: '提示',
							content: '请先上传底图！',
							ok: function() {},
							cancel: true,
							modal: true
						});
						return false;
					}
				}
				let param = {
					"AccessToken": vm.AccessToken,					
					"Parameters": {
						"IsEquipment":1,
						"TargetId": vm.get_curr_TargetId,
						"Html": '',
						"Texts": vm.Texts,
						"Images": vm.Images,
						"Dashboards": vm.Dashboards
					}
				};
				let url = eosCommon.ENTERPRISE_API + "api/Assemblage/SetAssemblageContent";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.$message({
							type: 'success',
							message: '保存成功！'
						});
						vm.uPDATETEMPDATA({
							isClear: true,
							data: 'save'
						});
					}
				});
			},
			getStyleValue(data) {
				let vm = this;
				let left = '';
				let top = '';
				let width = '';
				let height = '';
				let el = document.querySelector('#wrap_' + data.refs);
				left = el.style.left;
				top = el.style.top;
				width = getStyle(el)['width'];
				height = getStyle(el)['height'];
				data.editData.layOutStyle = `left:${left};top:${top};width:${width};height:${height};`
			},
      clearStorageTempDragData() {
			let vm = this;
			let tempStorageStr = eosCommon.storage.get('storageType');
			let tempStorageArr = tempStorageStr.split(',');
			let len = tempStorageArr.length;
			let len1 = vm.get_tempDrag_Datas.length;
			for(let j = 0; j < len1; j++) {
				for(let i = 0; i < len; i++) {
					if(vm.get_tempDrag_Datas[j] == tempStorageArr[i]) {
						tempStorageArr.splice(i, 1);
					}
				}
			}
			tempStorageStr = tempStorageArr.join(',');
			eosCommon.storage.set('storageType', tempStorageStr);
			vm.uPDATETEMPDATA({
				isClear: true,
				data: 'giveUp'
			});
		},
      toggleTabs: function(tab) {
      	this.showWhichTab = tab.name
      	this.dELETE_LABEL({
			typeName: '',
			currenIndex:'' ,
			isDeleteClick:false,
			isResetOperateMemory:true
		});
        this.detailData.change = !this.detailData.change
        if (tab.name=='tab1') this.stopRenderChart(true)
            else this.stopRenderChart(false)
        //this.currentView = tabText;
        //this.currentViewTab = tabText;
      },
      getData: function() {
        if (!this.EquipmentId) return false
        var _this = this;
        var url = eosCommon.ENTERPRISE_API + 'api/equipment/Detail';
        var params = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "EquipmentId": _this.EquipmentId,
            "Type": "1"
          }
        }
        eosCommon.eosAjax(url, "GET", params, "json", function(result) {
          if (eosCommon.checkCode(result.State, result.Message)) {
            _this.detailData = result.Data;
            _this.operateType.reBackClickFlag = 1;
            if(!_this.menuView){
            	 _this.menuView='dragData';
            }
           
          }
        });
      },
      setCss(){
      	let vm=this;
	      	vm.el=document.querySelector('.el-tabs__header');
		      if(vm.$route.name=='wb_project_detail'||
				vm.$route.name == 'yz_project_detail'||
				vm.$route.name == 'sm_project_detail'){
					vm.el.className='el-tabs__header';
					let content=document.querySelector('.el-tabs__content');					
					content.style.height=`${getWinSize('Height',216)}px`;
					content.style.overflow='auto';
					content.style.paddingLeft='0';
					$(window).resize(function() {
						content.style.height=`${getWinSize('Height',216)}px`;
					})
		      }else if(vm.$route.name=='wb_equipments_manage'||
		      vm.$route.name=='yz_equipments_manage'||
		      vm.$route.name=='sm_equipmet_lists'){
					vm.el.className='el-tabs__header';
					let content=document.querySelector('.el-tabs__content');					
					content.style.height=`${getWinSize('Height',258)}px`;
					content.style.overflow='auto';
					content.style.paddingLeft='0';
					$(window).resize(function() {
						content.style.height=`${getWinSize('Height',258)}px`;
					})
		      }
      }
    },

    created(){
    	  let vm = this;
    	 vm.$nextTick(function(){
    				//vm.setCss();
    		})
    },
    updated: function() {
      
    },
   destroyed(){
   		eosCommon.storage.set('menuView','');
   },
    mounted: function() {    
      let vm = this;
        vm.menuView=eosCommon.storage.get('menuView');
       setTimeout(function() {
	        //vm.setCss();
      	}, 100)
      setTimeout(function() {
      	//vm.detailData={};
      	vm.EquipmentId=vm.equipmentData.EquipmentId
        vm.getData();
      }, 0)
      // console.log(this.equipmentData)
      // this.IsProjectAdmin = eosCommon.storage.get('IsProjectAdmin');
    }
  }

</script>


<style lang="less" scoped="scoped">
	.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.electric_energy {
		width: 100%;
		height: 100%;
		padding: 15px;
		.blocks {
			margin-bottom: 15px;
		}
		.block_content {
			width: 25%;
			height: 110px;
			border-right: 1px solid #D1E3E2;
		}
		.others_block_content {
			width: 100%;
			height: 224px;
			border-right: 1px solid #D1E3E2;
		}
	}
	
</style>
<template>
	<div class="electric_energy" style="min-width: 800px; height: auto;">
		<!--ele_statistics-->
		<div v-if="isConfigStateLoaded" class="blocks clearfloat" style="width: 100%;">
			<ele_commonblock :canOperate="canOperate" v-for="(item,index) in firstBlockList" :otherParams="otherParams" :propsData="item" v-on:getClick="getBlockClick">
				<statistic-view :propsData="item" :otherParams='otherParams'>
				</statistic-view>
			</ele_commonblock>
		</div>
		<div v-if="isConfigStateLoaded" class="blocks clearfloat" style="width: 100%;">
			<ele_commonblock :canOperate="canOperate" v-for="(item,index) in secondBlockList" :propsData="item" v-on:getClick="getBlockClick">
				<div class="others_block_content pull-left">
					<peak-view :otherParams="otherParams" :propsData="item" v-if="item.title=='ele_peak'">
					</peak-view>
					<item-view :otherParams="otherParams" :propsData="item" v-if="item.title=='sub_item'">
					</item-view>
					<eleandtemperature-view :otherParams="otherParams" :propsData="item" v-if="item.title=='eleAndtemperature'">
					</eleandtemperature-view>					
					<weather-view :propsData='propsData' v-if="item.title=='weather'">						
					</weather-view>	
				</div>
			</ele_commonblock>
		</div>
		<div v-if="isConfigStateLoaded" class="blocks clearfloat" style="width: 100%;">
			<ele_commonblock :canOperate="canOperate" v-for="(item,index) in thirdBlockList" :propsData="item" v-on:getClick="getBlockClick">
				<div class="others_block_content pull-left">
					<trend-view :otherParams="otherParams" :propsData="item" v-if="item.title=='ele_trend'">
					</trend-view>
					<ringratio-view :otherParams="otherParams" :propsData="item" v-if="item.title=='ele_ringRatio'">
					</ringratio-view>
				</div>
			</ele_commonblock>
		</div>
		<common-dialog :equipmentDataList="equipmentDataList" :otherParams="otherParams">
		</common-dialog>
	</div>
</template>
<script>
	import commonFn from 'assets/js/common/commonFunc';
	let projectContr = commonFn.projectContr;
	import ele_commonblock from './electric_components/ele_commonblock.vue'
	import commonDialog from './electric_components/commonDialog.vue'
	import statisticView from './electric_components/preview/statisticView.vue'
	import peakView from './electric_components/preview/peakView.vue'
	import itemView from './electric_components/preview/itemView.vue'
	import eleandtemperatureView from './electric_components/preview/eleandtemperatureView.vue'
	import weatherView from './electric_components/preview/weatherView.vue'
	import trendView from './electric_components/preview/trendView.vue'
	import ringratioView from './electric_components/preview/ringratioView.vue'
	export default {
		data() {
				return {
					isConfigStateLoaded:false,
					firstBlockList: [{
						title: 'ele_statistics',
						name: '项目电能耗统计',
						type:'1',
						ProjectId:this.propsData.ProjectId,
						previewDatas:[{
							title:'日用电量',
							icon:'static/css/images/electric_manage/day.png',
							value:'--kWh',
							time:''
						},{
							title:'月用电量',
							icon:'static/css/images/electric_manage/month.png',
							value:'--kWh',
							time:''
						},{
							title:'年用电量',
							icon:'static/css/images/electric_manage/year.png',
							value:'--kWh',
							time:''
						},{
							title:'累计用电量',
							icon:'static/css/images/electric_manage/accumulate.png',
							value:'--kWh',
							time:''
						}]
					}],
					//firstBlockListData
					secondBlockList: [

						{
							title: 'ele_peak',
							name: '用能峰值',
							type:'2',
							previewDatas:{
								Type:2,
								ProjectId:this.propsData.ProjectId
							}
//							[
//								{
//								  "DayKey": "--至--",
//								   "DayValue": '--',
//								   "MonthKey": "--至--",
//								   "MonthValue": '--'
//								}
//							]
						}, {
							title: 'sub_item',
							name: '项目用电分项',
							type:'3',
							previewDatas:{
								Type:1,
								ProjectId:this.propsData.ProjectId
							}
						}, {
							title: 'eleAndtemperature',
							name: '项目总用电趋势与室外温度',
							type:'4',
							previewDatas:{
								Type:1,
								ProjectId:this.propsData.ProjectId
							}
						}, {
							title: 'weather',
							name: '天气',
							previewDatas:[]
						}

					],
					thirdBlockList: [{
							title: 'ele_trend',
							name: '当月项目用电趋势',
							type:'5',
							previewDatas:{
								ProjectId:this.propsData.ProjectId
							}
						}, {
							title: 'ele_ringRatio',
							name: '当年项目用电环比',
							type:'6',
							previewDatas:{
								ProjectId:this.propsData.ProjectId
							}
						},

					],					
					otherParams: {
						dialogVisible: false,
						isFinishSaved: false,
						isStartSaveOperate: false,
						canSave:false,
						currEleSetting: 'ele_statistics',
						currEleSettingName:'项目电能耗统计',
						initSettingLists:[],
						initSettingItemLists:[],
						initSetEnergyTemperatureConfig:{
							TerminalEquipmentId:'',
							TempAddress:'',
							EnergyItemList:[
								{
									TerminalEquipmentId:'',
									Address:''
								}
								
							]
						},
						currType:'1',
						ProjectId:this.propsData.ProjectId,
						GetEnergyConfigState:[]
					},
					ProjectId:'',
					AccessToken: eosCommon.storage.get("AccessToken"),
					equipmentDataList:[],
					currentTime:'',
					currentSelectedTime:'days',
					canOperateParams:[]
					
					
					

				}
			},
			computed:{
			 	canOperate(){
		    				return projectContr.equipmentAdd(...this.canOperateParams)
			    }
	    	
			},
			watch: {
				'otherParams.isFinishSaved' (val, oldval) {

				}
			},
			props:['propsData'],
			components: {
				ele_commonblock,
				commonDialog,
				statisticView,
				peakView,
				itemView,
				eleandtemperatureView,
				weatherView,
				trendView,
				ringratioView

			},
			mounted() {
				let vm=this;
				vm.canOperateParams=[vm.isAdmin,
				vm.IsProjectAdmin,
				vm.IsExperienceProject,
				vm.IsSelfProject]=[
					Number(eosCommon.storage.get('IsAdmin')),
					Number(eosCommon.storage.get('IsProjectAdmin')),
					vm.propsData.IsExperienceProject,
					vm.propsData.IsSelfProject					
				]
				vm.ProjectId=vm.propsData.ProjectId;
				vm.GetEnergyConfigState();
				vm.formatCurrentTime();
				//vm.getStatisticsPreDatas();
				//vm.getPeakPreDatas();
				//vm.getEnergyTempStatistic();
				vm.getEuipmentDatas();
			},
			methods: {
				GetEnergyConfigState() {
					let vm = this;
					let param = {
						"AccessToken": vm.AccessToken,
						"ProjectId":vm.ProjectId,
					};
					let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/GetEnergyConfigState";
					eosCommon.eosAjax(url, "get", param, "json", function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							vm.otherParams.GetEnergyConfigState=result.Data;
							vm.isConfigStateLoaded=true;
						}
					});
				},
				getBlockClick(msg) {
					switch(msg.title) {
						case 'ele_statistics':
							this.openAlert(msg);
							break;
						case 'ele_peak':
							this.openAlert(msg);
							break;

						case 'sub_item':
							this.openAlert(msg);
							break;

						case 'eleAndtemperature':
							this.openAlert(msg);
							break;

						case 'weather':
							this.openAlert(msg);
							break;
						case 'ele_trend':

							this.openAlert(msg);
							break;
						case 'ele_ringRatio':
							this.openAlert(msg);
							break;
						default:
							console.log('默认值');
					}
				},
				openAlert(msg) {
					let vm=this;
					vm.GetEnergyConfig(msg);					
				},
				initSettingInfos(msg){
					let vm=this;
					vm.otherParams.currEleSettingName=`${msg.name}配置`;
					vm.otherParams.currType=msg.type;
					vm.otherParams.currEleSetting = msg.title;
					vm.otherParams.dialogVisible = true
				},
				GetEnergyConfig(msg) {
					let vm = this;
					let param = {
						"AccessToken": vm.AccessToken,
						"Type":msg.type,
						"ProjectId":vm.ProjectId,

					};
					let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/GetEnergyConfig";
					eosCommon.eosAjax(url, "get", param, "json", function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							if(msg.type!=3){
								vm.otherParams.initSettingLists=result.Data.Config;
							}else if(msg.type==3){
								vm.otherParams.initSettingItemLists=result.Data.Config;								
							}if(msg.type==4){
								if(result.Data.Config.length!=0){
									vm.otherParams.initSetEnergyTemperatureConfig=result.Data.Config;
								}								
							}
								vm.initSettingInfos(msg);
						}
					});
				},
				/************预览数据处理***************/
				

				
				/************预览数据处理结束***************/
				getEuipmentDatas: function() {
					var vm = this;
					var param = {
						"AccessToken": vm.AccessToken,
						"PageIndex": 1,
						"PageSize": 100,
						"IsDefaultEquipment": 0, // -- 是否只获取第一台设备的数据
						"Parameters": {
							"CompanyId": '', //--业主Id
							"ProjectId": vm.ProjectId, //--项目Id(必填)
							"GatewayId": '', //-- 网关id, 可传空
							"Keywords": "", //-- 搜索关键字, 可传空
							"OnlineStatus": -1, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
							"AlarmStatus": -1, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
							"RunStatus": -1, //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
							"Status": '0'
						}
					}
					var url = eosCommon.ENTERPRISE_API + "api/equipment/QueryCommonEquipmentList";
					eosCommon.eosAjax(url, "GET", param, "json", function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							if(result.Data instanceof Array) vm.equipmentDataList=[];
							else vm.equipmentDataList=result.Data.Equipments;
						}
					})
			},
		  	formatCurrentTime(){
            	var vm=this;
            	//vm.nowTime
            	var timeStamps=new Date(new Date().getTime());           	
            	if(vm.currentSelectedTime=='days'){
					vm.currentTime=timeStamps.getFullYear()+'-'+(timeStamps.getMonth()+1)+"-"+timeStamps.getDate();					
				}           	
            }

			}
	}
</script>
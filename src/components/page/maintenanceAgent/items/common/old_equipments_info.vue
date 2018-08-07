<style lang='less' scoped="scoped">
	#el_mainContent {
		width: 100%;
		/*padding: 10px;*/
		.el-tabs__content {
			padding-left: 0px;
		}
		.equipmentSearchArear {
			position: relative;
			background: rgba(122, 197, 205, 0.4);
			/*padding: 15px 20px;*/
			padding-bottom: 5px;
			.search_wrap {
				padding: 5px;
			}
			.navs_wrap {
				/*padding: 0px 10px;*/
				& span {
					width: 100%;
					& a {
						width: 107px;
						/*width: 100%;*/
						text-align: center;
						display: inline-block;
						padding: 5px 0px;
						color: #797979;
						background: #DCDCDC;
					}
					& a.activeBg {
						color: #fff;
						background: #1abc9c;
					}
				}
			}
		}
		.bd1 {
			border: none;
			border-top: none;
			border-left: none;
			margin-top: 30px;
		}
		.bd2 {
			border-top: none;
			border-left: none;
			margin-top: 133px;
		}
		.objList_bd1 {
			border: 1px solid #DFECEB;
			border-top: none;
			border-left: none;
			margin-top: 0px!important;
		}
		.objList_bd2 {
			border-top: none;
			border-left: none;
			margin-top: 92px!important;
		}
		.noData {
			line-height: 65px;
			text-align: center;
			font-weight: bold;
		}
		.left_lists {
			position: relative;
		}
		.right_c {
			margin-left: 220px;
		}
		.c_wrap {}
		.el_content {
			padding-left: 0;
		}
		.el-input__inner {
			height: 30px;
		}
		#drag_wrap {
			.fullScreen {
				font-size: 16px;
				padding: 2px 6px;
				background: #fff;
				color: #8492A6;
				text-align: center;
				margin-right: 8px;
				margin-top:10px i {
					margin: 0;
				}
			}
			.drag_panel_header {
				width: 100%;
				.funLists {
					width: 100%;
					height: 50px;
					background: #dfeceb;
					#freshTimeSetting {
						height: 50px;
						left: 50%;
						margin-left: 15px;
						.freshTimeSettingSpan {
							color: #8492A6;
							font-size: 12px;
						}
						.freshTimeSettingDataSpan {
							color: #1abc9c;
							font-weight: bold;
						}
						.timeShow {
							width: 250px;
							height: 50px;
							display: inline-block;
							margin-top: 20px;
						}
						.timerSetting {
							width: 250px;
							height: 50px;
							padding-top: 10px;
							padding-bottom: 10px;
							display: inline-block;
							/*margin-top: 18px;*/
						}
					}
					ul {
						list-style: none;
						padding: 10px 0;
						li {
							width: 30px;
							height:30px;
							border-radius: 30px;
							margin-left: 15px;
							cursor: pointer;
							img {
								width: 30px;
								height: 30px;
							}
						}
					}
					ul.right_operations {
						width: 200px;
						height:20px ;
						/*padding-top: 15px;*/
						/*padding-bottom: 15px;*/
						/*padding-top;*/
						padding: 0;
						padding-top: 5px;
						margin-right: 8px;
						li {
							padding: 0;
							margin: 0;
							width: 20px;
							height: 20px;
							margin-right: 10px;
							img {
								width: 20px;
								height: 20px;
							}
						}
					}
				}
			}
			.drag_panel_content {
				.bgC {
					background: url('../../../../../../static/css/images/drag/drag_region_bg.png') no-repeat center;
				}
				width: 100%;
				background: #fff;
				height: 100%;
				overflow: auto;
				/*margin-top: 70px;*/
				/*height: 1000px!important;*/
				.noDataimg {
					/*margin-top: 200px;*/
					text-align: center;
					width: 226px;
					height: 183px;
					position: absolute;
					left: 50%;
					top: 50%;
					margin-top: -91px;
					margin-left: -113px;
					img {
						width: 226px;
						height: 143px;
					}
					p {
						color: #1abc9c;
						font-size: 18px;
						font-weight: bold;
						margin-top: 15px;
					}
				}
				.txtInfo {
					resize: none;
					background: transparent;
					border: none;
					margin: 0;
					padding: 0;
					line-height: 20px;
					text-align: left;
				}
				.extendTxtInfo1 {
					width: 70%;
					text-align: center;
				}
				.extendTxtInfo {
					width: 25%;
					text-align: left;
				}
				.extendT {
					width: 100%;
					padding:8px;
					padding-left:8px!important;
				}
				.drag_region {
					width: 1000px;
					height: 800px;
					/*border: 1px dotted salmon;*/
					position: relative;
					margin: 0 auto;
					margin-left: 0;
				}
			}
			.el-tabs__header1 {
				position: fixed;
				left: 413px;
				top: 157px;
				z-index: 286;
				transition: left .8s;
				-webkit-transition: left .8s;
				/* Safari */
			}
			.el-tabs__header2 {
				position: fixed;
				left: 413px;
				top: 192px;
				transition: left .8s;
				-webkit-transition: left .8s;
				/* Safari */
				z-index: 286;
			}
			h2.typeTips {
				font-size: 18px;
				color: #000;
				font-weight: bold;
				text-align: left;
				height: 40px;
				margin-top: 0;
				/*line-height: 40px;*/
			}
		}
		.el_content {
			padding-bottom: 0!important;
		}
	}
	
	#equip_lists_search {
		.el-select .el-input {
			width: 35px;
		}
		.el-input__icon {
			width: 22px;
		}
		.el-select .el-input__inner {
			padding: 3px 0px;
		}
		.input-with-select .el-input-group__prepend {
			background-color: #fff;
		}
	}
.nobr{left: -5px;width: 145px;}
</style>
<template>
	<div id="el_mainContent" class="el_mainContent">
		<div class="el_content" style="padding: 0;">
			<el-row class='c_wrap'>
				<el-row class="w220 fl left_lists">
					<div class='equipmentSearchArear'>
						<div class="navs_wrap" v-if="$route.name!='consumption_manage'">
							<span class="tab-title-bottom curp">
			              		<a @click="toggleTabs('equiObjist',true);" :class="{activeBg: get_currentViewTab_data=='equiObjist'}">
					                <label >
				                  		<span class='curp' @click="toggleTabs('equiObjist',true);">场景列表</span>
									</label>
								</a>
								<a @click="toggleTabs('equiList',true);" :class="{activeBg: get_currentViewTab_data=='equiList'}">
									<label>
		                  				<span class='curp' @click="toggleTabs('equiList',true);">设备列表</span>
			            			</label>
							</a>
							</span>
						</div>
						<div id="equip_lists_search" v-show="get_currentViewTab_data=='equiList'" class="search_wrap">
							<el-select @change='delaySearch()' v-model="Status" placeholder="状态" class='w60els' size='small'>
								<el-option label="全部" value="0"></el-option>
								<el-option label="告警" value="1"></el-option>
								<el-option label="掉线" value="2"></el-option>
							</el-select>
							<el-input placeholder="设备名称" @change='delaySearch()' v-model="Keywords" class='nobr' size='small'>
							</el-input>
							<i @click="delaySearch()" :style="comsuptionsCSS" style="position: absolute;right:13px;top: 42px;" class="fa fa-search m-r-5">
							</i>
						</div>
						<div v-show="get_currentViewTab_data=='equiObjist'" class="search_wrap">
							<el-input size='small' v-model="equiListData.Keyword" placeholder="场景名称"></el-input>
							<i style="position: absolute;right:13px;top: 42px;" class="fa fa-search m-r-5">
	            			</i>
						</div>
					</div>
					<div>
						<component :fresh="freshData" v-on:comfirClose="getComfirClose" v-on:hasNoTargetIdList="getTargetIdListInfo" :propsData="equiListData" :is="equiListData.currentView" v-on:pageIndexChange="getPageIndex" :dataSend.sync='equiListDataSend' :tableLoad='tableLoad'>
						</component>
					</div>
				</el-row>
				<div v-if="get_currentViewTab_data=='equiObjist'" class="ovh right_c">
					<div id="drag_wrap">
						<div class="drag_panel_header">
							<div class="funLists">
								<div v-show="(!get_curr_setting)&& get_curr_isHasData" id="freshTimeSetting" class="clearfix">
									<div class="timerSetting pull-left">
										<span style="" class="freshTimeSettingSpan">刷新频率：</span>
										<span class="freshTimeSettingDataSpan">{{get_freshTime_Data.Rate}}</span>
										<span style="padding: 0 5px;" class="freshTimeSettingSpan">秒</span>
										<span v-if="propsData.IsSelfProject==1" style="border: 1px solid #E2E6E9; " class="btn_wrap">
								            <button style="margin: 0px;"  @click='freshTimeSetting()' id="btn_t" type="button" class="btn fullScreen"  >
								                <i class="fa fa-cog"></i>
								            </button>
							      		</span>
									</div>
								</div>
								<ul v-if="get_curr_setting && get_curr_isHasData" class="drag_funtion_list clearfix" style="width: 100%;">
									<li class="pull-left">
										<img draggable="true" title="图片" class="img" src="static/css/images/new_drag/1.png" id="icon_upLoadImg" />
									</li>
									<li class="pull-left">
										<img draggable="true" title="文本" class="img" src="static/css/images/new_drag/2.png" id="icon_label" />
									</li class="pull-left">
									<li class="pull-left">
										<img draggable="true" title="曲线" class="img" src="static/css/images/new_drag/3.png" id="icon_chart" />
									</li>
									<li class="pull-left">
										<img draggable="true" title="仪表盘" class="img" src="static/css/images/new_drag/4.png" id="icon_dashboard" />
									</li>
									<li class="pull-left">
										<img draggable="true" title="数据块" class="img" src="static/css/images/new_drag/5.png" id="icon_datablock" />
									</li>
									<li class="pull-left">
										<img draggable="true" title="状态" class="img" src="static/css/images/new_drag/6.png" id="icon_datastate" />
									</li>
									<ul class="right_operations pull-right">
										<li class="pull-right">
											<img @click="confirmClose()" title="关闭" class="img" src="static/css/images/new_drag/9.png" id="icon_close" />
										</li>

										<li class="pull-right">
											<img @click="confirmGiveUp()" title="放弃" class="img" src="static/css/images/new_drag/8.png" id="icon_give_up" />
										</li>
										<li class="pull-right">
											<img @click="saveAllDragDatas()" title="保存" class="img" src="static/css/images/new_drag/7.png" id="icon_save" />
										</li>
									</ul>
								</ul>
								<ul v-if="(!get_curr_setting) && get_curr_isHasData && propsData.IsSelfProject==1" class="pull-right" style="padding: 12px 0;margin-bottom: 0;">
									<span class="pull-left btn_wrap">
				            			<button style="padding-top: 3px; padding-bottom: 3px;font-size: 12px;" @click='comeToEdit()' id="btnInsert" type="button" class="btn fullScreen" >
							                <i style="margin-left: 0;" class="fa  fa-cog m-r-5"></i>配置
							            </button>
							        </span>
									<span class="pull-left btn_wrap">
								            <button style="margin-right: 15px; font-size: 12px;padding-top: 3px; padding-bottom: 3px;"  @click='intoFullScreen()' id="btn_t" type="button" class="btn fullScreen"  >
								                <i class="fa fa-arrows"></i>
								            </button>
							      	</span>
								</ul>
							</div>
							<div class="main_contents_wrap" style="position: relative;">
								<div class="el_mainContent" :style="[fullScreenCss['el_mainContent']]" ref='indexContent' style='height:99%;position: relative;' v-loading='get_dragDataState.isDragDetalLoading'>

									<div v-if="(!get_curr_setting) && (!get_curr_isPreview)&& get_curr_isHasData" class="drag_panel_content" style="position: relative;">
										<div class="noDataimg">
											<img src="static/css/images/drag/noSettingPage.png" />
											<p>未配置显示界面</p>
										</div>
									</div>
									<div v-if="(!get_curr_setting) && (!get_curr_isPreview)&& (!get_curr_isHasData)" class="drag_panel_content" style="position: relative;">
										<div class="noDataimg">
											<img src="static/css/images/drag/noSettingPage.png" />
											<p>不存在自定义场景</p>
										</div>
									</div>
									<div v-if="get_curr_isPreview && get_curr_isHasData" class="drag_panel_content droptarget" style="position: relative;">
										<div v-show="!get_curr_setting" class="edit_mask" style="position:absolute;width:100%;height: 150%;z-index: 296; left:0;top: 0;">
										</div>
										<div v-bind:class="{bgC:get_curr_setting}" class="drag_region">
											<common-drag v-for="(item,index) in get_upLoad_img_data" :propsData="item" :key="item.refs" ref="wraps_upLoadImg">
												<div class="content" style="position: relative;">
													<div class="imgss">
														<h2 class="typeTips" v-if="!item.editData.imgUrl">请先上传图片</h2>
														<img v-if="item.editData.imgUrl" style="margin: 0 auto; width: 100%; height: 100%;" :src="item.editData.imgUrl" class="avatar" />
													</div>
												</div>
											</common-drag>
											<common-drag v-for="(item,index) in get_label_data" :propsData="item" :key="item.refs" ref="wraps_label">
												<div class="content" style="position: relative; height: 100%;">
													<div class="imgss" style="height: 100%;width: 100%;;">
														<!--<textarea class="txtInfo" :class="{extendTxtInfo1:item.editData.selectDataType=='dataStream'}" v-show="item.editData.selectDataType=='dataStream'&& item.editData.PrePositionValue!=''" v-model="item.editData.PrePositionValue" :style="`font-size:${item.editData.PrePositionStyle.fontSize}px;color: ${item.editData.PrePositionStyle.color};font-weight: ${item.editData.PrePositionStyle.fontWeight};font-style:${item.editData.PrePositionStyle.fontItalic};text-decoration:${item.editData.PrePositionStyle.fontUnderLine};`" style="height: 100%; text-align: right; cursor: move;padding: 8px;" maxlength="100">																										
														</textarea>
														<textarea v-show="item.editData.selectDataType!='dataStream'" class="txtInfo" :class="{extendTxtInfo:item.editData.selectDataType=='dataStream',extendT:item.editData.selectDataType=='dataStream'&&(item.editData.PrePositionValue==''&&item.editData.PostPositionValue=='')}" :style="`font-size:${item.editData.Style.fontSize}px;color: ${item.editData.Style.color};font-weight: ${item.editData.Style.fontWeight};font-style:${item.editData.Style.fontItalic};text-decoration:${item.editData.Style.fontUnderLine};`" v-model="item.editData.labelContent" style="height: 100%; cursor: move;padding: 8px;" maxlength="100" placeholder="内容...">															
														</textarea>
														<textarea v-show="(!isDataChange) && (item.editData.selectDataType=='dataStream')" class="txtInfo" :class="{extendTxtInfo:item.editData.selectDataType=='dataStream',extendT:item.editData.selectDataType=='dataStream'&&(item.editData.PrePositionValue==''&&item.editData.PostPositionValue=='')}" :style="`font-size:${item.editData.Style.fontSize}px;color: ${item.editData.Style.color};font-weight: ${item.editData.Style.fontWeight};font-style:${item.editData.Style.fontItalic};text-decoration:${item.editData.Style.fontUnderLine};`" v-model="item.editData.labelContent" style="height: 100%; cursor: move;padding: 8px;padding-left: 0;" maxlength="100" placeholder="内容...">															
														</textarea>-->														
														<common-label :item="item"></common-label>
													</div>
												</div>
											</common-drag>
											
											<common-drag v-for="(item,index) in get_chart_data" :propsData="item" :key="item.refs" ref="wraps_chart">
												<div class="content" style="position: relative; height: 100%;">
													<div class="imgss" style="height: 100%;width: 100%;;">
														<!--<div :id="item.containerID" style="width: 100%; height: 100%; margin: 0 auto;padding: 10px;"></div>-->
														<common-chart :propsData="item"></common-chart>
													</div>
												</div>
											</common-drag>
											<common-drag v-for="(item,index) in get_dashboard_data" :propsData="item" :key="item.refs" ref="wraps_dashboard">
												<div class="content" style="position: relative; height: 100%;">
													<div class="imgss" style="height: 100%;width: 100%;;">
														<!--仪表盘-->
														<common-dashboard :propsData="item"></common-dashboard>
													</div>
												</div>
											</common-drag>
											<common-drag v-for="(item,index) in get_datablock_data" :propsData="item" :key="item.refs" ref="wraps_datablock">
												<div class="content" style="position: relative; height: 100%;">
													<div class="imgss" style="height: 100%;width: 100%;;">
														<common-datablock :propsData="item"></common-datablock>														
													</div>
												</div>
											</common-drag>
											<common-drag v-for="(item,index) in get_datastate_data" :propsData="item" :key="item.refs" ref="wraps_datastate">
												<div class="content" style="position: relative; height: 100%;">
													<div class="imgss" style="height: 100%;width: 100%;;">
														<!--状态控件-->
														<common-datastate :propsData="item"></common-datastate>
														<!--<common-datablock :propsData="item"></common-datablock>-->														
													</div>
												</div>
											</common-drag>
										</div>
									</div>
								</div>
								<edit_uploadimg v-for="(item,index) in get_upLoad_img_data" :propsData="{editPanelPropsData:editPanelPropsData,item:item}" :key="item.refs" :currentkey="index">
								</edit_uploadimg>
								<edit_label v-for="(item,index) in get_label_data" :propsData="{editPanelPropsData:editPanelPropsData,item:item}" :key="item.refs" :currentkey="index">
								</edit_label>
								<edit_chart v-for="(item,index) in get_chart_data" :propsData="{editPanelPropsData:editPanelPropsData,item:item}" :key="item.refs" :currentkey="index">									
								</edit_chart>
								<edit_dashboard v-for="(item,index) in get_dashboard_data" :propsData="{editPanelPropsData:editPanelPropsData,item:item}" :key="item.refs" :currentkey="index">									
								</edit_dashboard>
								<edit_datablock v-for="(item,index) in get_datablock_data" :propsData="{editPanelPropsData:editPanelPropsData,item:item}" :key="item.refs" :currentkey="index">									
								</edit_datablock>
								<edit_datastate v-for="(item,index) in get_datastate_data" :propsData="{editPanelPropsData:editPanelPropsData,item:item}" :key="item.refs" :currentkey="index">									
								</edit_datastate>
							</div>
						</div>
					</div>
				</div>

				<el-row id="right_c" v-if="get_currentViewTab_data=='equiList'" :style="" class="ovh right_c">
					<el-col :span='24'>
						<no-data :customStyle="'margin-top:120px;'" :others="false" :srcs="'static/css/images/noEquip.png'" v-show='Total==0' :noDataInfo="'项目下暂无设备 !'"></no-data>
						<equiTab v-if="Total!=0 && canShow" :equipmentData="equiTabData"></equiTab>
						<consumption-manage style="" v-if="Total!=0 && $route.name=='consumption_manage'" :equipmentData="equiTabData"></consumption-manage>
					</el-col>
				</el-row>
			</el-row>
		</div>
	</div>
</template>
<script>
	import * as Common from 'src/assets/js/common';
	import {
		Chart,
		myChart
	} from 'assets/js/common/dragCommon.js';
	const FUNC = Common.Func
	const AXIOS = FUNC.axios
	const GET = AXIOS.get
	const URL = Common.Const.url
	const DELETE = Common.Func.axios.delete
	import equiObjist from 'components/common/equipment_objlist'
	import equiList from 'components/common/old_equipment_list'
	import equiTab from './equipment_tabs'
	import consumptionManage from 'components/page/maintenanceAgent/consumption_manage'
	import commonDrag from './drag/commonDrag'
	import edit_uploadimg from './drag/edit_upLoadImg'
	import edit_label from './drag/edit_label'
	import edit_chart from './drag/edit_chart'
	import edit_datablock from './drag/edit_datablock'
	import commonChart from './drag/commonChart'
	import commonDatablock from './drag/commonDatablock'
	import edit_dashboard from './drag/edit_dashboard'
	import commonDashboard from './drag/commonDashboard'
	import commonLabel from './drag/commonLabel'
	import edit_datastate from './drag/edit_datastate'
	import commonDatastate from './drag/commonDatastate'
	import { mapGetters, mapMutations } from 'vuex'
	import { getStyle, getWinSize,copyArr } from 'src/assets/js/common/util';
	import {initConfig} from 'src/assets/js/common/commonData';
	export default {
		data: function() {
			return {
				AccessToken:eosCommon.storage.get("AccessToken"),
				tid: null,
				CompanyId: '',
				ProjectId: '',
				EquipmentTypeId: '',
				OnlineStatus: '',
				RunStatus: '',
				AlarmStatus: '',
				Status: '0',
				ProjectName: '',
				EquipmentId: '',
				equiListDataSend: {},
				equiTabData: {
					EquipmentName: '',
					IsOnline: '',
					RunState: '',
					AlarmLevel: '',
				},
				equiListData: {
					tableData: [],
					AssemblageList: [],
					currentView: '',
					hasMakeFreshTime: false,
					Keyword: '',
					isNotClick: false
				},
				freshData: {
					hasMakeFreshTime: false
				},
				Total: 0,
				loading: true,
				PageSize: 15,
				PageIndex: 1,
				Keywords: '',
				selectInfo: '',
				equipmentListUrl: URL.QUERYEQUIPMENTLIST, //获取服务条目
				detailUrl: URL.EQUIPMENTDETAIL, //获取设备详情
				canShow: false,
				isShowDebugBtnByRoute: null,
				//currentViewTab: '', //equiList
				is_item_detail: true,
				is_equipment_manage: false,
				comsuptionsCSS: '',
				heaer_el: null,
				ulClass: {},
				editClass: '',
				getHeaderWidth: {},
				//数据处理
				//typeDatas:initControlSettingData.typeDatas,
				typeLists: {},
				upLoadImg: [],
				typeListsLength: 0,
				//编辑框
				editPanelClass: '',
				equipmentListClass: '',
				editPanelPropsData: {
					editClass: '',
					editPanelClass: ''
				},
				//图片上传数据
				//imgUrl:''
				c_type: '',
				c_id: '',
				//保存数据
				Texts: [],
				Images: [],
				Graphs:[],
				TextGroups:[],
				Dashboards: [],
				StateGraphs:[],
				IsEquipment: false,
				hasListData: false,
				fullScreenCss: {
					drag_panel_header: {},
					funLists: {},
					el_mainContent: {}
				},
				isFullScreen: false,
				isDataChange: false,
				cometoData: false,
				//isAddDrag:false
				instanceChart:null,
				ChartDatas:{
					type:'line',
					title:'气温数据图'
				},
				isToggleTabs:false,
				tabs:'',
				dragPosReduceLeft:290,
				dragPosReduceTop:242
			}
		},
		components: {
			equiObjist,
			equiList,
			equiTab,
			consumptionManage,
			commonDrag,
			//  imgUpload,
			edit_uploadimg,
			edit_label,
			edit_chart,
			edit_datablock,
			commonChart,
			commonDatablock,
			edit_dashboard,
			commonDashboard,
			commonLabel,
			edit_datastate,
			commonDatastate
		},
		watch: {
			"get_freshTime_Data.Time" (val, oldVal) {
				this.isDataChange = true;
				setTimeout(() => {
					this.isDataChange = false;
				}, 500);
			},
			"propsData.ProjectId" (val, oldVal) {
				if(!val){
					return;
				}
				this.ProjectId = val;
				this.gET_EQUIPMENT_DATA({ EquipmentList: [] });
				this.gETPROTOCOLDATA({ protocolList:[]});
			},
			isShowSideBar(val) {},
			get_curr_isHasData(val, oldval) {},
			get_currentViewTab_data(val, oldval) {},
			propsData() {
				let vm = this
				let props = vm.propsData
				vm.equiListData.ProjectId = props.ProjectId
				vm.equiListData.ProjectName = props.ProjectName
				vm.equiListData.CompanyId = props.CompanyId
				vm.equiListData.IsExperienceProject = props.IsExperienceProject
				vm.equiListData.IsSelfProject = props.IsSelfProject
				vm.CompanyId = props.CompanyId || ''
				vm.ProjectId = props.ProjectId || ''
				vm.EquipmentTypeId = props.EquipmentTypeId || ''
				vm.OnlineStatus = props.OnlineStatus;
				vm.RunStatus = props.RunStatus || ''
				vm.AlarmStatus = props.AlarmStatus || ''
				vm.ProjectName = props.ProjectName || ''
				vm.tid = null
				vm.PageIndex = 1;
				vm.tid = setTimeout(function() {
					vm.tableLoad()
				}, 300)
			},
			'equiListData.Keyword' (val, oldval) {
				if(val != '') {
					this.equiListData.isNotClick = true;
				}
			},
			PageIndex() {
				this.tableLoad(this.PageSize, this.PageIndex)
			},
			equiListDataSend() {
				if(this.equiListDataSend.EquipmentId) {
					this.getEquiDetail()
				}
			}
		},
		props: ['propsData'],
		computed: {
			//上传资源时的附加参数
			uploadData() {
				return {
					"AccessToken": FUNC.storage.get("AccessToken"),
					"ResourceType": "0",
					"Title": "合同附件",
					"Description": "合同附件"
				}
			},
			typeDatas(){
	     		return initConfig.typeDatas();
	     	},
			computeStyle() {
				return this.get_curr_isPreview;
			},
			...mapGetters([
				'isShowSideBar',
				'get_equipment_data',
				'get_protocol_data',
				'get_upLoad_img_ID',
				'get_label_ID',
				'get_chart_ID',
				'get_line_ID',
				'get_datablock_ID',
				'get_dashboard_ID',
				'get_datastate_ID',
				
				'get_isAddDropEventListener',
				'get_curr_setting',
				'get_curr_isPreview',
				'get_curr_isHasData',
				//数据
				'get_upLoad_img_data',
				'get_label_data',
				'get_chart_data',
				'get_datablock_data',
				'get_dashboard_data',
				'get_datastate_data',
				
				'get_curr_TargetId',
				'get_tempDrag_Datas',
				'get_freshTime_Data',
				'get_dragDataState',
				'get_refs_data',
				'get_isAddDrag_state',
				'get_currentViewTab_data',
				'get_isDeleteClick_state'
			])
		},
		filters: {
			formateSeconds: function(seconds) {
				return eosCommon.formatSeconds(seconds);
			}
		},
		methods: {
			...mapMutations({
				gET_EQUIPMENT_DATA:'GET_EQUIPMENT_DATA',
				gETPROTOCOLDATA:'GETPROTOCOLDATA',
				uPDATETEMPDATA: 'UPDATETEMPDATA',
				uPDATE_SETTING_STATE: 'UPDATE_SETTING_STATE',
				uPDATE_ISADDDRAG_STATE: 'UPDATE_ISADDDRAG_STATE',
				uPDATE_IMG_ID: 'UPDATE_IMG_ID',
				uPDATE_LABEL_ID: 'UPDATE_LABEL_ID',
				
				//底图
				uPDATE_UPLOAD_IMG: 'UPDATE_UPLOAD_IMG',
				aDD_DROP_EVENT: 'ADD_DROP_EVENT',
				//文本
				uPDATE_LABEL: 'UPDATE_LABEL',
				uPDATE_DRAGDATA_STATE: 'UPDATE_DRAGDATA_STATE',
				uPDATE_CURRENTVIEWTAB: 'UPDATE_CURRENTVIEWTAB',
				//曲线
				uPDATE_CHART:'UPDATE_CHART',
				uPDATE_CHART_ID:'UPDATE_CHART_ID',
				uPDATE_LINE_ID:'UPDATE_LINE_ID',
				uPDATE_DATABLOCK_ID:'UPDATE_DATABLOCK_ID',
				uPDATE_DATABLOCK:'UPDATE_DATABLOCK',
				dELETE_LABEL: 'DELETE_CURR_PANEL',
				uPDATE_DASHBOARD_ID:'UPDATE_DASHBOARD_ID',
				uPDATE_DASHBOARD:'UPDATE_DASHBOARD',
				uPDATE_DATASTATE_ID: 'UPDATE_DATASTATE_ID',
				uPDATE_DATASTATE: 'UPDATE_DATASTATE'
				
			}),
			intoFullScreen() {
				window.open("/#/full_page_?TargetId=" + this.get_curr_TargetId)
				/*this.isFullScreen=!this.isFullScreen;
				if(this.isFullScreen){
					this.fullScreenCss['drag_panel_header']={
						width:`100%`,
						height:`100%`,
						left: `0px`,
						top: `0`,
						zIndex:`310`
					}
					this.fullScreenCss['funLists']={
						width:`100%`
					}
					this.fullScreenCss['el_mainContent']={
						width:`100%`,
						height:`100%`
					}
				}else{
					this.fullScreenCss['drag_panel_header']={}
					this.fullScreenCss['funLists']={}
					this.fullScreenCss['el_mainContent']={}
				}*/
				//"width:100%;height:100%;"
			},
			freshTimeSetting() {
				let vm = this;
				vm.$prompt('刷新时间(秒):', '设置刷新频率', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputPattern: /^[5-9]$|^[1-9]\d{1,2}$|1000$/,
					inputValue: vm.get_freshTime_Data.Rate,
					inputErrorMessage: '刷新时间不能为空且为不小于5且不大于1000的整数'
				}).then(({ value }) => {
					vm.SetAssemblageDataRate(value);
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '取消操作'
					});
				});
			},
			SetAssemblageDataRate(val) {
				let vm = this;
				let param = {
					"AccessToken": vm.AccessToken,
					"Parameters": {
						"TargetId": vm.get_curr_TargetId,
						"Rate": val
					}
				};
				let url = eosCommon.ENTERPRISE_API + "api/Assemblage/SetAssemblageDataRate";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.freshData.hasMakeFreshTime = !vm.freshData.hasMakeFreshTime;
						vm.$message({
							type: 'success',
							message: '设置成功！'
						});
					}
				});
			},
			comeToEdit() {
				let vm = this;
				vm.uPDATE_SETTING_STATE({
					curr_setting_state: true,
					isPreview: true,
					targetId: vm.get_curr_TargetId,
					isHasData: true
				});
			},
			confirmGiveUp() {
				let vm = this
				if(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
					return;
				}
				vm.$confirm('部分操作暂未保存, 是否继续放弃操作?', '提示', {
					confirmButtonText: '是',
					cancelButtonText: '否',
					type: 'warning'
				}).then(() => {
					//确定操作
					vm.giveUpTempDragDatas();
				}).catch(() => {})
			},
			giveUpTempDragDatas() {
				let vm = this;
				vm.clearStorageTempDragData();
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
				vm.dELETE_LABEL({
					typeName: '',
					currenIndex:'' ,
					isDeleteClick:false,
					isResetOperateMemory:true
				});
			},
			getComfirClose(data) {
				this.saveAllDragDatas();
			},
			getTargetIdListInfo(data) {
				this.cometoData = data;
				if(this.cometoData && (!this.equiListData.isNotClick)) {
					this.equiListData.currentView = 'equiList';
					this.uPDATE_CURRENTVIEWTAB('equiList');
					this.IsEquipment = true;
					this.tableLoad();
				}
			},
			confirmClose() {
				let vm = this
				if(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
					vm.uPDATE_SETTING_STATE({
						curr_setting_state: false,
						isPreview: true,
						targetId: vm.get_curr_TargetId,
						isHasData: true
					});
					return;
				}
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
				}).catch(() => {
					vm.clearStorageTempDragData();
					vm.uPDATE_SETTING_STATE({
						curr_setting_state: false,
						isPreview: true,
						targetId: vm.get_curr_TargetId,
						isHasData: true
					});
				})
			},
			saveAllDragDatas() {
				let vm = this;
				let len_type = vm.typeDatas.length;
				let len_label = vm.get_label_data.length;
				let len_img = vm.get_upLoad_img_data.length;
				let len_chart = vm.get_chart_data.length;
				let len_datablock = vm.get_datablock_data.length;
				let len_dashboard = vm.get_dashboard_data.length;
				let len_datastate = vm.get_datastate_data.length;
				vm.Images = [];
				vm.Texts = [];
				vm.Graphs = [];
				vm.TextGroups = [];
				vm.Dashboards=[];
				vm.StateGraphs=[];
				for(let j = 0; j < len_type; j++) {
					if(vm.typeDatas[j] == 'get_label_data') {
						for(let i = 0; i < len_label; i++) {
							vm.getStyleValue(vm.get_label_data[i]);
							
							let typeName = vm.get_label_data[i].typeName;
							//let typeId = vm.get_label_data[i].typeId;
							let refs = vm.get_label_data[i].refs;
							let type = vm.get_label_data[i].editData.selectDataType == 'fixedTxt' ? 1 : 2;
							let PrePositionValue = vm.get_label_data[i].editData.PrePositionValue;
							let DefaultValue='';
							if(type==1){
								DefaultValue = vm.get_label_data[i].editData.labelContent;
							}else{
								DefaultValue = vm.get_label_data[i].editData.noDataVal;								
							}
							let PostPositionValue = vm.get_label_data[i].editData.PostPositionValue;
							let TerminalEquipmentId = vm.get_label_data[i].editData.dataStream.EquipmentId
							let Address = vm.get_label_data[i].editData.dataStream.RegisterAddress
							//let stylesType=[]
							let Color = vm.get_label_data[i].editData.Style.color;
							let FontSize = vm.get_label_data[i].editData.Style.fontSize;
							let IsBold = vm.get_label_data[i].editData.Style.fontWeight == 'bold';
							let fontItalic = vm.get_label_data[i].editData.Style.fontItalic == 'italic';
							let IsUnderLine = vm.get_label_data[i].editData.Style.fontUnderLine == 'underline';

							let posColor = vm.get_label_data[i].editData.PostPositionStyle.color;
							let posFontSize = vm.get_label_data[i].editData.PostPositionStyle.fontSize;
							let posIsBold = vm.get_label_data[i].editData.PostPositionStyle.fontWeight == 'bold';
							let posfontItalic = vm.get_label_data[i].editData.PostPositionStyle.fontItalic == 'italic';
							let posIsUnderLine = vm.get_label_data[i].editData.PostPositionStyle.fontUnderLine == 'underline';

							let preColor = vm.get_label_data[i].editData.PrePositionStyle.color;
							let preFontSize = vm.get_label_data[i].editData.PrePositionStyle.fontSize;
							let preIsBold = vm.get_label_data[i].editData.PrePositionStyle.fontWeight == 'bold';
							let prefontItalic = vm.get_label_data[i].editData.PrePositionStyle.fontItalic == 'italic';
							let preIsUnderLine = vm.get_label_data[i].editData.PrePositionStyle.fontUnderLine == 'underline';
							if(type == 2) {
								//....
								if(!TerminalEquipmentId) {
									vdialog({
										type: 'confirm',
										title: '提示',
										content: '数据流模式必须先选择设备！',
										ok: function() {},
										cancel: true,
										modal: true
									});
									return false;
								}
							}
							vm.Texts.push({
								"TextId": refs,
								"Type": type,
								"PrePositionValue": PrePositionValue,
								"DefaultValue": DefaultValue,
								'PostPositionValue': PostPositionValue,
								"TerminalEquipmentId": TerminalEquipmentId,
								"Address": Address,
								"Style": {
									"Color": Color,
									"FontSize": FontSize,
									"IsBold": IsBold,
									"IsItalic": fontItalic,
									"IsUnderLine": IsUnderLine,
									"AlignType": 1,
								},
								"PostPositionStyle": {
									"Color": posColor,
									"FontSize": posFontSize,
									"IsBold": posIsBold,
									"IsItalic": posfontItalic,
									"IsUnderLine": posIsUnderLine,
									"AlignType": 1,
								},
								"PrePositionStyle": {
									"Color": preColor,
									"FontSize": preFontSize,
									"IsBold": preIsBold,
									"IsItalic": prefontItalic,
									"IsUnderLine": preIsUnderLine,
									"AlignType": 1,
								},
								"Layout": JSON.stringify(vm.get_label_data[i].editData.layOutStyle),
								"Level": 2
							});
						}
					} else if(vm.typeDatas[j] == 'get_upLoad_img_data') {
						for(let i = 0; i < len_img; i++) {
							vm.getStyleValue(vm.get_upLoad_img_data[i]);
							let typeName = vm.get_upLoad_img_data[i].typeName;
							let refs = vm.get_upLoad_img_data[i].refs;
							
							vm.Images.push({
								"ImageId":refs,
								"ResoureId": vm.get_upLoad_img_data[i].editData.ResoureId,
								"Layout": JSON.stringify(vm.get_upLoad_img_data[i].editData.layOutStyle),
								//vm.get_upLoad_img_data[i].editData.layOutStyle,
								"Level": 2
							});
						}
					}else if(vm.typeDatas[j] == 'get_chart_data') {
						for(let i = 0; i < len_chart; i++) {
							vm.getStyleValue(vm.get_chart_data[i]);
							let typeName = vm.get_chart_data[i].typeName;
							//let typeId = vm.get_chart_data[i].refs;
							let refs = vm.get_chart_data[i].refs;
							let Layout=JSON.stringify(vm.get_chart_data[i].editData.layOutStyle);
							let BackgroundColor=vm.get_chart_data[i].backgroundColor;
							let LeftYColor=vm.get_chart_data[i].yAxis.lineColor;
							let RightYColor=vm.get_chart_data[i].rightYAxis.lineColor;
							let IsShowLeftY=vm.get_chart_data[i].yAxis.visible;
							let IsShowRightY=vm.get_chart_data[i].rightYAxis.visible;
							
							let IsShowXCutLine=vm.get_chart_data[i].xAxis.gridLineWidth;
							let IsShowYCutLine=vm.get_chart_data[i].yAxis.gridLineWidth;
							let XCutLineColor=vm.get_chart_data[i].xAxis.gridLineColor;
							
							let YCutLineColor=vm.get_chart_data[i].yAxis.gridLineColor;
							let singleChartDataLists=vm.get_chart_data[i].singleChartDataLists;
							let noRegisterAddressSingle=singleChartDataLists.filter((val)=>{
								return val.dataStream.RegisterAddress=='';
							})
							if(noRegisterAddressSingle.length>0){
								
									vdialog({
										type: 'confirm',
										title: '提示',
										content: '每条曲线中协议地址不能为空！',
										ok: function() {},
										cancel: true,
										modal: true
									});
									return false;
								
							}
							let Items=[];	
							for(let m of Object.keys(singleChartDataLists)) {
								Items.push({
									"LineId":singleChartDataLists[m].lineId,
									"Name":singleChartDataLists[m].yData.name,
						          	"TerminalEquipmentId":singleChartDataLists[m].dataStream.EquipmentId,
						          	"Address":singleChartDataLists[m].dataStream.RegisterAddress,
						          	"Color":singleChartDataLists[m].yData.color,
						          	"IsRightY":singleChartDataLists[m].yData.yAxis==1,
								});
							}
							//"ImageId": typeName + typeId,
							vm.Graphs.push( {
						      "GraphId":refs,
						      "Theme":"",
						      "Layout":Layout,
						      "Level":1,
						      "Interval":10,
						      "BackgroundColor":BackgroundColor,
						      "LeftYColor":LeftYColor,
						      "RightYColor":RightYColor,
						      "IsShowLeftY":IsShowLeftY,
						      "IsShowRightY":IsShowRightY,
						      "IsShowXCutLine":IsShowXCutLine,
						      "IsShowYCutLine":IsShowYCutLine,
						      "XCutLineColor":XCutLineColor,
						      "YCutLineColor":YCutLineColor,
						      "Items":Items
						    });
						}
					}else if(vm.typeDatas[j] == 'get_datablock_data') {
						for(let i = 0; i < len_datablock; i++) {
							vm.getStyleValue(vm.get_datablock_data[i]);
							let typeName = vm.get_datablock_data[i].typeName;
							//let typeId = vm.get_chart_data[i].refs;
							let refs = vm.get_datablock_data[i].refs;
							let Theme=vm.get_datablock_data[i].title;
							let Layout=JSON.stringify(vm.get_datablock_data[i].editData.layOutStyle);							
							let BackgroundColor=vm.get_datablock_data[i].editData.datablockBg;
							let ThemeColor=vm.get_datablock_data[i].editData.datablockTitleBg;
							let singleDatablockLists=vm.get_datablock_data[i].singleDatablockLists;
							
							let Color = vm.get_datablock_data[i].editData.Style.color;
							let FontSize = vm.get_datablock_data[i].editData.Style.fontSize;
							let IsBold = vm.get_datablock_data[i].editData.Style.fontWeight == 'bold';
							let fontItalic = vm.get_datablock_data[i].editData.Style.fontItalic == 'italic';
							let IsUnderLine = vm.get_datablock_data[i].editData.Style.fontUnderLine == 'underline';
							let Texts=[];
							for(let val of singleDatablockLists){
								
								
								
								let preColor = val.PrePositionStyle.color;
								let preFontSize = val.PrePositionStyle.fontSize;
								let preIsBold = val.PrePositionStyle.fontWeight == 'bold';
								let prefontItalic = val.PrePositionStyle.fontItalic == 'italic';
								let preIsUnderLine = val.PrePositionStyle.fontUnderLine == 'underline';
								
								let posColor = val.PostPositionStyle.color;
								let posFontSize = val.PostPositionStyle.fontSize;
								let posIsBold = val.PostPositionStyle.fontWeight == 'bold';
								let posfontItalic = val.PostPositionStyle.fontItalic == 'italic';
								let posIsUnderLine = val.PostPositionStyle.fontUnderLine == 'underline';
								Texts.push({									  
						              "TextItemId": val.lineID,
						              "TerminalEquipmentId": val.dataStream.EquipmentId,
						              "Address": val.dataStream.RegisterAddress,
						               "PrePositionStyle": {
						                "Color": preColor,
						                "IsBold": preIsBold,
						                "IsUnderLine": preIsUnderLine,
						                "IsItalic": prefontItalic,
						                "AlignType": 1,
						                "FontSize": preFontSize
						              },
						              "PostPositionStyle": {
						                "Color": posColor,
						                "IsBold": posIsBold,
						                "IsUnderLine": posIsUnderLine,
						                "IsItalic": posfontItalic,
						                "AlignType": 1,
						                "FontSize": posFontSize
						              },
						             
						              "PrePositionValue": val.dataName,
						              "PostPositionValue": val.Unit,
						              "Value": ""            
								})
							}
							//let BackgroundColor=vm.get_datablock_data[i].datablockTitleBg.datablockTitleBg;
							//"ImageId": typeName + typeId,
							vm.TextGroups.push( {
						     	 "TextGroupId": refs,
						         "Theme": Theme,
						         "ThemeColor":ThemeColor,
						         "BackgroundColor": BackgroundColor,
						         "Texts":Texts,
						          "Layout": Layout,
						          "Style": {
						            "Color": Color,
						            "IsBold": IsBold,
						            "IsUnderLine": IsUnderLine,
						            "IsItalic": fontItalic,
						            "AlignType": 1,
						            "FontSize": FontSize
						          },
 								"Level": "1"
						    });
						}
					}else if(vm.typeDatas[j] == 'get_dashboard_data') {
						for(let i = 0; i < len_dashboard; i++) {
							vm.getStyleValue(vm.get_dashboard_data[i]);
							let refs = vm.get_dashboard_data[i].refs;
							let TerminalEquipmentId=vm.get_dashboard_data[i].dataStream.EquipmentId;
							let Address=vm.get_dashboard_data[i].dataStream.RegisterAddress;
							let Theme=vm.get_dashboard_data[i].DisplayName;
							let Unit=vm.get_dashboard_data[i].Unit;
							let Layout=JSON.stringify(vm.get_dashboard_data[i].editData.layOutStyle);							
							let colorSettingInfo=vm.get_dashboard_data[i].colorSettingInfo;							
							let Conifg=[];
							for(let val of colorSettingInfo){
								Conifg.push({									  
        							"Color":val.regionColor,
									"UpperValue":val.endNum,
									"FloorValue":val.startNum
								})
							}
							vm.Dashboards.push( {
								"DashboardId":refs,
								"TerminalEquipmentId":TerminalEquipmentId,
								"Address":Address,
								"DefaultValue":0,
								"Layout":Layout,
								"Theme":Theme,
								"Unit":Unit,
								"Level":1,
								"Conifg":Conifg
							});
						}
					}else if(vm.typeDatas[j] == 'get_datastate_data') {
						for(let i = 0; i < len_datastate; i++) {
							vm.getStyleValue(vm.get_datastate_data[i]);
							let refs = vm.get_datastate_data[i].refs;
							let TerminalEquipmentId=vm.get_datastate_data[i].dataStream.EquipmentId;
							let Address=vm.get_datastate_data[i].dataStream.RegisterAddress;
							let Layout=JSON.stringify(vm.get_datastate_data[i].editData.layOutStyle);							

							vm.StateGraphs.push( {
								"StateGraphId":refs,
								"TerminalEquipmentId":TerminalEquipmentId,
								"Address":Address,
								"Layout":Layout,
								"Level":1
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
				for(let j of vm.TextGroups) {
					for(let m of j.Texts){
						if(m.TerminalEquipmentId==''||m.Address==''){
							vdialog({
								type: 'confirm',
								title: '提示',
								content: '数据块中请先选择设备和协议地址！',
								ok: function() {},
								cancel: true,
								modal: true
							});
							return false;
						}
					}
					
				}
				//Dashboards
				for(let val of vm.Dashboards){
					let Conifg=val.Conifg;
					let UpperValueArr=[];
					let isOrdered=true;
					let isNum=true;
					if(val.TerminalEquipmentId==''||val.Address==''){
						vdialog({
							type: 'confirm',
							title: '提示',
							content: '仪表盘中请先选择设备和协议地址！',
							ok: function() {},
							cancel: true,
							modal: true
						});
						return false;
					}
					for(let i of Object.keys(Conifg)){
							if(isNaN(Number(Conifg[i].FloorValue))){
								vdialog({
									type: 'confirm',
									title: '提示',
									content: '仪表盘中配置值须是数字！',
									ok: function() {},
									cancel: true,
									modal: true
								});
								return false;
							}
						if(i==0){							
							UpperValueArr.push(Number(Conifg[i].FloorValue));
							UpperValueArr.push(Number(Conifg[i].UpperValue));
						}else{								
							UpperValueArr.push(Number(Conifg[i].UpperValue));
						}
					}
									
					let OriginalUpperValueArr=copyArr(UpperValueArr);
					function NumAscSort(a,b)
						{
						 return a - b;
						}
						UpperValueArr.sort(NumAscSort);
						console.log('两数组1：',OriginalUpperValueArr,UpperValueArr);
						for(let index of Object.keys(OriginalUpperValueArr)){
							if(OriginalUpperValueArr[index]!=UpperValueArr[index]){
								vdialog({
									type: 'confirm',
									title: '提示',
									content: '仪表盘中配置值须从小到大排列！',
									ok: function() {},
									cancel: true,
									modal: true
								});
								return false;
							}					
						}
				}
				for(let sVal of vm.StateGraphs) {
					if(sVal.TerminalEquipmentId==''||sVal.Address==''){
							vdialog({
								type: 'confirm',
								title: '提示',
								content: '状态控件中请先选择设备和协议地址！',
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
						"TargetId": vm.get_curr_TargetId,
						"Html": '',
						"Texts": vm.Texts,
						"Images": vm.Images,
						"Graphs":vm.Graphs,
						"TextGroups":vm.TextGroups,
						"Dashboards": vm.Dashboards,
						"StateGraphs":vm.StateGraphs
					}
				};
				
				let url = eosCommon.ENTERPRISE_API + "api/Assemblage/SetAssemblageContent";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						//vm.freshData.hasMakeFreshTime = !vm.freshData.hasMakeFreshTime;
						vm.$message({
							type: 'success',
							message: '保存成功！'
						});
						vm.uPDATETEMPDATA({
							isClear: true,
							data: 'save'
						});
						vm.dELETE_LABEL({
							typeName: '',
							currenIndex:'' ,
							isDeleteClick:false,
							isResetOperateMemory:true
						});
//						if(vm.isToggleTabs){
//							console.log('oo 哦哦');
//							vm.initToggleTabs(vm.tabs);
//							vm.isToggleTabs=false;
//						}
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
				//data.editData.layOutStyle = `left:${left};top:${top};width:${width};height:${height};`
				data.editData.layOutStyle={								
			  			left:left,
			  			top:top,
			  			width:width,
			  			height:height 						  		
				}
				
			},
			updateImgUrl(params) {},
			handleDrag(ev) {
				let vm = this;
				var ev = ev || event;
				vm.c_type = vm.c_id.substr(5);
				let elem = ev.srcElement || ev.target;
				while((elem.className) && (elem.className != "drag_region bgC")) {
					elem = elem.parentNode;
				}
				if(elem.className == "drag_region bgC") {
					let L = ev.clientX;
					let T = ev.clientY;
					if(vm.c_type == 'upLoadImg') {
						vm.uPDATE_IMG_ID({
							isReset: false
						});
						let upLoadImgLength = vm.get_upLoad_img_data.length;
						let currImgID = vm.get_upLoad_img_ID;
						let imgDatas = {
							typeName: `upLoadImg`,
							//typeId: currImgID,
							//refs: `${vm.get_curr_TargetId}upLoadImg${currImgID}`,
							refs: `upLoadImg${currImgID}`,
							upLoadImgLength: upLoadImgLength,
							title: '底图',
							previewData: {},
							editData: {
								imgUrl: '',
								layOutStyle: {
						  			left:'',
						  			top:'',
						  			width:'',
						  			height:''  			
						  		}
							}
						}
						vm.uPDATE_UPLOAD_IMG({
							isClear: false,
							imgDatas: imgDatas
						});
						vm.uPDATETEMPDATA({
							isClear: false,
							data: `${vm.get_curr_TargetId}upLoadImg${currImgID}`
						});
						vm.fixPosition('upLoadImg', currImgID, L, T, vm.isShowSideBar);
					} else if(vm.c_type == 'label') {
						vm.uPDATE_LABEL_ID({
							isReset: false
						});
						let eqInfo = {
							EquipmentAlias: '',
							EquipmentId: ''
						}
						if(vm.IsEquipment) {
							eqInfo.EquipmentAlias = vm.equiTabData.EquipmentName;
							eqInfo.EquipmentId = vm.equiTabData.EquipmentId;
						}
						let labelLength = vm.get_label_data.length;
						let currLabelID = vm.get_label_ID;
						let labelDatas = {
							typeName: `label`,
							IsEquipment: vm.IsEquipment,
							eqInfo: [eqInfo],
							ProjectId: vm.ProjectId,
							//typeId: currLabelID,
							refs: `label${currLabelID}`,
							labelLength: labelLength,
							title: '文本',
							previewData: {
								labelContent: ''
							},
							editData: {
								layOutStyle: {
						  			left:'',
						  			top:'',
						  			width:'170px',
						  			height:'45px'  			
						  		},
								selectDataType: 'fixedTxt',
								PrePositionValue: '',
								val:'--',
								noDataVal:'--',
								labelContent: '文本内容...',
								PostPositionValue: '',
								Style: {
									fontSize: '14',
									color: '#1F2D3D',
									fontWeight: 'normal',
									fontItalic: 'normal',
									fontUnderLine: 'normal',
									AlignType: 1
								},
								PostPositionStyle: {
									fontSize: '14',
									color: '#1F2D3D',
									fontWeight: 'normal',
									fontItalic: 'normal',
									fontUnderLine: 'normal',
									AlignType: 1
								},
								PrePositionStyle: {
									fontSize: '14',
									color: '#1F2D3D',
									fontWeight: 'normal',
									fontItalic: 'normal',
									fontUnderLine: 'normal',
									AlignType: 1
								},
								fixedTxt: {},
								dataStream: {
									RegisterAddress: '',
									EquipmentId: eqInfo.EquipmentId
								}
							}
						}
						vm.uPDATE_LABEL({
							isClear: false,
							isFreshLabel: false,
							labelDatas: labelDatas
						});
						vm.uPDATETEMPDATA({
							isClear: false,
							data: `label${currLabelID}`
						});
						vm.fixPosition('label', currLabelID, L, T, vm.isShowSideBar);
					}else if(vm.c_type == 'chart'){
						vm.uPDATE_CHART_ID({
							isReset: false
						});
						vm.uPDATE_LINE_ID({
							isReset: false
						});
						let chartLength = vm.get_chart_data.length;
						let currChartID = vm.get_chart_ID;
						let refs=`chart${currChartID}`;
						let containerID=`container${currChartID}`;
						let lineID=containerID+vm.get_line_ID;
						let eqInfo = {
							EquipmentAlias: '',
							EquipmentId: ''
						}
						if(vm.IsEquipment) {
							eqInfo.EquipmentAlias = vm.equiTabData.EquipmentName;
							eqInfo.EquipmentId = vm.equiTabData.EquipmentId;
						}
						let chartDatas = {
							typeName: `chart`,
							Interval:10,
							IsEquipment: vm.IsEquipment,
							eqInfo: [eqInfo],
							ProjectId: vm.ProjectId,
							//typeId: currChartID,
							refs: refs,
							chartLength: chartLength,
							title: '文本',
							previewData: {
								
							},
							editData: {
								layOutStyle: {
						  			left:'',
						  			top:'',
						  			width:'220px',
						  			height:'130px'  			
						  		}						
								
							},
							containerID:containerID,
							chartName:'',
							backgroundColor:'#EEF6F6',
							xAxis:{
						     	 type: 'datetime',
					    		  tickPixelInterval: 50,
						       //x轴分割线
						        gridZIndex: 4,
							 	gridLineColor: '#8492a6',
							 	gridLineDashStyle: 'longdash',
						 		lineColor: '#8492a6',
						 		gridLineWidth: true,						 		
						  	},
						  	yAxis:{
						  		lineWidth:1,
							 	gridLineColor: '#8492a6',//y轴分割线
						 		lineColor: '#8492a6',//右y轴颜色
						 		gridLineWidth: true,
						 		visible:true
						  	},
						  	rightYAxis:{						  	
						  		lineWidth: 1,//y轴粗细,
					       		lineColor: '#8492a6',
					       		visible:true
						  	},
//						  	leftYAxis:{
//						  		lineWidth: true,//y轴粗细,
//					       		lineColor: '#FF0000',
//						  	},
							singleChartDataLists:[{
								//title:'气温数据图',
								get_equipment_data:vm.get_equipment_data,
								get_protocol_data:[],
								lineId:lineID,
								dataStream: {
									RegisterAddress: '',
									EquipmentId: eqInfo.EquipmentId
								},
								color: '#fff',//rgb(102, 102, 102)
								chartDataSetting:{
									//axis:0//用于哪个轴0：左Y轴  1：右Y轴
								},
								chartAxisSetting:{
									info:'设置'+0
								},								
								yAxis:{
									title: {
								         text: ''
								      },
								      //y轴分割线
							 	 	gridLineColor: '#8492a6',
							 	 	gridLineDashStyle: 'longdash',
							 	 	 gridLineWidth: true,
							 	 	 color:'#EF2D3D',
							       	lineWidth: 1,//y轴粗细
							       	lineColor: '#8492a6',//#FF0000
							       	opposite: false,
									showEmpty: false,
									visible:true
								},
								yData:{
							      name:'',
							       yAxis:0,
							       color:'#00a2e9',//#EF0C0C
							      data:[]
							   }
							}]
							
							
						}
						vm.uPDATE_CHART({
							isClear: false,
							isFreshChart: false,
							chartDatas: chartDatas
						});
						vm.uPDATETEMPDATA({
							isClear: false,
							data: `chart${currChartID}`
						});
						vm.fixPosition('chart', currChartID, L, T, vm.isShowSideBar);
						//myChart(containerID,vm.ChartDatas);
//						this.$nextTick(()=>{
//					    	vm.instanceChart=new Chart('.com_'+refs,refs,`chart`,containerID,vm.ChartDatas);
//					  	});
						
					}else if(vm.c_type == 'datablock') {
						vm.uPDATE_DATABLOCK_ID({
							isReset: false
						});
						vm.uPDATE_LINE_ID({
							isReset: false
						});
						let eqInfo = {
							EquipmentAlias: '',
							EquipmentId: ''
						}
						if(vm.IsEquipment) {
							eqInfo.EquipmentAlias = vm.equiTabData.EquipmentName;
							eqInfo.EquipmentId = vm.equiTabData.EquipmentId;
						}
						let datablockLength = vm.get_datablock_data.length;
						let currDatablockID = vm.get_datablock_ID;
						let lineID=vm.get_line_ID;
						let datablockDatas = {
							typeName: `datablock`,
							
							IsEquipment: vm.IsEquipment,
							eqInfo: [eqInfo],
							ProjectId: vm.ProjectId,
							//typeId: currLabelID,
							refs: `datablock${currDatablockID}`,
							datablockLength: datablockLength,
							title: '标题',
							previewData: {
								datablockContent: ''
							},
							editData: {
								layOutStyle: {
						  			left:'',
						  			top:'',
						  			width:'220px',
						  			height:'74px'  			
						  		},
						  		title:'黄君福',
						  		datablockBg:'#fff',
						  		datablockTitleBg:'#EEF6F6',
								Style: {
									fontSize: '12',
									color: '#1F2D3D',
									fontWeight: 'bold',
									fontItalic: 'normal',
									fontUnderLine: 'normal',
									AlignType: 1
								}
							},
							singleDatablockLists:[{
								//title:'气温数据图',
								get_equipment_data:vm.get_equipment_data,
								get_protocol_data:[],
								lineID:lineID,
								dataStream: {
									RegisterAddress: '',
									EquipmentId: eqInfo.EquipmentId
								},
								dataName:'',
								dataValue:'--',
								Unit:'',
								valContent:'',
								PrePositionStyle: {
									fontSize: '12',
									color: '#1F2D3D',
									fontWeight: 'normal',
									fontItalic: 'normal',
									fontUnderLine: 'normal',
									AlignType: 1
								},
								PostPositionStyle: {
									fontSize: '12',
									color: '#1F2D3D',
									fontWeight: 'normal',
									fontItalic: 'normal',
									fontUnderLine: 'normal',
									AlignType: 1
								}
							}]
						}
						vm.uPDATE_DATABLOCK({
							isClear: false,
							isFreshDatablock: false,
							datablockDatas: datablockDatas
						});
						vm.uPDATETEMPDATA({
							isClear: false,
							data: `datablock${currDatablockID}`
						});
						vm.fixPosition('datablock', currDatablockID, L, T, vm.isShowSideBar);
					}else if(vm.c_type == 'dashboard') {
						vm.uPDATE_DASHBOARD_ID({
							isReset: false
						});
						let eqInfo = {
							EquipmentAlias: '',
							EquipmentId: ''
						}
						if(vm.IsEquipment) {
							eqInfo.EquipmentAlias = vm.equiTabData.EquipmentName;
							eqInfo.EquipmentId = vm.equiTabData.EquipmentId;
						}
						let dashboardLength = vm.get_dashboard_data.length;
						let currDashboardID = vm.get_dashboard_ID;
						let containerID = `container${currDashboardID}`;
						let dashboardDatas = {
							typeName: `dashboard`,
							containerID:`container${currDashboardID}`,
							IsEquipment: vm.IsEquipment,
							eqInfo: [eqInfo],
							ProjectId: vm.ProjectId,
							typeId: currDashboardID,
							refs: `dashboard${currDashboardID}`,
							dashboardLength: dashboardLength,
							title: '文本',
							DisplayName:'',
							Unit:'',
							value:0,
							dataStream: {
								RegisterAddress: '',
								EquipmentId: eqInfo.EquipmentId
							},
							colorSettingInfo:[{
								startNum:0,
								endNum:20,
								regionColor:'#1ABC9C'
							},
							{
								startNum:20,
								endNum:80,
								regionColor:'#3498DB'
							},
							{
								startNum:80,
								endNum:100,
								regionColor:'#E74C3C'
							}],
							previewData: {
								dashboardContent: ''
							},
							editData: {
								layOutStyle: {
						  			left:'',
						  			top:'',
						  			width:'218px',
						  			height:'218px'  			
						  		},
						  		title:'黄君福'
								
							}
						}
						vm.uPDATE_DASHBOARD({
							isClear: false,
							isFreshDashboard: false,
							dashboardDatas: dashboardDatas
						});
						vm.uPDATETEMPDATA({
							isClear: false,
							data: `dashboard${currDashboardID}`
						});
						vm.fixPosition('dashboard', currDashboardID, L, T, vm.isShowSideBar);
					}else if(vm.c_type == 'datastate') {
						vm.uPDATE_DATASTATE_ID({
							isReset: false
						});
						let eqInfo = {
							EquipmentAlias: '',
							EquipmentId: ''
						}
						if(vm.IsEquipment) {
							eqInfo.EquipmentAlias = vm.equiTabData.EquipmentName;
							eqInfo.EquipmentId = vm.equiTabData.EquipmentId;
						}
						let datastateLength = vm.get_datastate_data.length;
						let currDatastateID = vm.get_datastate_ID;
						//let containerID = `container${currDashboardID}`;
						let datastateDatas = {
							typeName: `datastate`,
							IsEquipment: vm.IsEquipment,
							eqInfo: [eqInfo],
							ProjectId: vm.ProjectId,
							typeId: currDatastateID,
							refs: `datastate${currDatastateID}`,
							datastateLength: datastateLength,
							stateValue:2,
							dataStream: {
								RegisterAddress: '',
								EquipmentId: eqInfo.EquipmentId
							},
							editData: {
								layOutStyle: {
						  			left:'',
						  			top:'',
						  			width:'45px',
						  			height:'45px'  			
						  		}								
							}
						}
						vm.uPDATE_DATASTATE({
							isClear: false,
							isFreshDatastate: false,
							datastateDatas: datastateDatas
						});
						vm.uPDATETEMPDATA({
							isClear: false,
							data: `datastate${currDatastateID}`
						});
						vm.fixPosition('datastate', currDatastateID, L, T, vm.isShowSideBar);
					}
				}
			},
			fixPosition(type, currTypeID, L, T, isShowSideBar) {
				let vm = this;
				if(vm.get_currentViewTab_data == 'equiList') {
					vm.uPDATE_ISADDDRAG_STATE({
						 isAddDrag:true,
						 type:type,
						 currTypeID:currTypeID,
						 L:L,
						 T:T,
						 isShowSideBar:isShowSideBar
					});
					return;
				}
				vm.handlePositionData(type, currTypeID, L, T, isShowSideBar);
			},
			handlePositionData(type, currTypeID, L, T, isShowSideBar){
				let vm=this;
				vm.$nextTick(() => {
					for(let i = 0; i < vm.$refs[`wraps_${type}`].length; i++) {
						if(vm.$refs[`wraps_${type}`][i].$el.id == `wrap_${type}${currTypeID}`) {
							if(isShowSideBar) {
								vm.$refs[`wraps_${type}`][i].$el.style.left = (L - vm.dragPosReduceLeft) + 'px';
							} else {
								vm.$refs[`wraps_${type}`][i].$el.style.left = (L - 413 + 183) + 'px';
							}
							vm.$refs[`wraps_${type}`][i].$el.style.top = (T - vm.dragPosReduceTop) + 'px';
						}
					}
				});
			},
			dragListener() {
				var vm = this;
				document.addEventListener("drag", function(ev) {
					var ev = ev || event;
					ev.preventDefault();
					vm.c_id = ev.target.id
				});
				document.addEventListener("dragover", function(ev) {
					var ev = ev || event;
					ev.preventDefault();
				});
				document.addEventListener("drop", vm.handleDrag, false);
				vm.aDD_DROP_EVENT({
					isAddDropEventListener: true
				})
			},
			clearAllDatas() {
				let vm = this;
				eosCommon.storage.set('storageType', '');
				vm.uPDATE_UPLOAD_IMG({
					isClear: true,
					imgDatas: []
				});
				vm.uPDATE_LABEL({
					isClear: true,
					isFreshLabel: false,
					labelDatas: []
				});
				vm.uPDATE_CHART({
					isClear: true,
					isFreshChart: false,
					chartDatas: []
				});
				vm.uPDATE_DATABLOCK({
					isClear: true,
					isFreshDatablock: false,
					datablockDatas: []
				});
				vm.uPDATE_DASHBOARD({
					isClear: true,
					isFreshDashboard: false,
					dashboardDatas: []
				});
				vm.uPDATE_DATASTATE({
					isClear: true,
					isFreshDatastate: false,
					datastateDatas: []
				});
				vm.uPDATETEMPDATA({
					isClear: true,
					data: 'giveUp'
				});
			},
			toggleTabs: function(tabText, isNotClick) {
				let vm = this;
				vm.equiListData.isNotClick = isNotClick;
				if(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
					vm.initToggleTabs(tabText);
					return;
				}
				//get_curr_TargetId
				vm.$confirm('部分操作暂未保存, 是否保存所有操作后再关闭?', '提示', {
					confirmButtonText: '先保存',
					cancelButtonText: '直接关闭',
					type: 'warning'
				}).then(() => {
					//确定操作
					//vm.isToggleTabs=true;
					//vm.tabs=tabText;
					vm.saveAllDragDatas();
					vm.uPDATE_SETTING_STATE({
						curr_setting_state: false,
						isPreview: true,
						targetId: vm.get_curr_TargetId,
						isHasData: true
					});
					vm.initToggleTabs(tabText);
				}).catch(() => {
					vm.clearStorageTempDragData();
					vm.uPDATE_SETTING_STATE({
						curr_setting_state: false,
						isPreview: true,
						targetId: vm.get_curr_TargetId,
						isHasData: true
					});
					vm.initToggleTabs(tabText);
				})
			},
			initToggleTabs(tabText) {
				let vm = this;
				vm.equiListData.currentView = tabText;
				this.uPDATE_CURRENTVIEWTAB(tabText);
				vm.gETPROTOCOLDATA({ protocolList: [] });
				vm.gET_EQUIPMENT_DATA({ EquipmentList: [] });
				//vm.currentViewTab = tabText;
				vm.clearAllDatas();
				vm.dELETE_LABEL({
					typeName: '',
					currenIndex:'' ,
					isDeleteClick:false,
					isResetOperateMemory:true
				});
				if(vm.get_currentViewTab_data == 'equiObjist') {
					vm.IsEquipment = false;	
				} else {
					vm.IsEquipment = true;
					
					vm.tableLoad();
				}
				
			},
			getPageIndex(index) {
				this.PageIndex = index;
			},
			getEquiDetail() {
				let vm = this
				let params = {
					"AccessToken": FUNC.storage.get("AccessToken"),
					"Parameters": {
						"EquipmentId": this.equiListDataSend.EquipmentId,
						"Type": "1"
					}
				}
				let url = this.detailUrl
				GET(url, params)
					.then(function(response) {
						let res = response.data
						if(FUNC.checkCode(res.State, res.Message)) {
							
							vm.equiTabData = res.Data;
							vm.equiTabData.IsSelfProject=vm.equiListDataSend.IsSelfProject;
						}
					})
					.catch(function(error) {
						console.log(error.message)
					});
			},
			//节流
			delaySearch() {
				clearTimeout(this.search.timeId)
				let vm = this
				vm.search.timeId = setTimeout(function() {
					vm.search()
				}, 500)
			},
			//搜索按钮
			search() {
				this.tableLoad(this.PageSize, this.PageIndex = 1)
			},
			//加载表格数据
			tableLoad(PageSize = this.PageSize,
				PageIndex = this.PageIndex,
				CompanyId = this.CompanyId,
				ProjectId = this.ProjectId,
				OnlineStatus = this.OnlineStatus,
				AlarmStatus = this.AlarmStatus,
				RunStatus = this.RunStatus,
				Keywords = this.Keywords,
				EquipmentTypeId = this.EquipmentTypeId) {
				let vm = this
				vm.uPDATE_DRAGDATA_STATE({
					isObjListLoading: true,
					isDragDetalLoading: false
				});
				vm.loading = true
				let params = {
					"AccessToken": FUNC.storage.get("AccessToken"),
					"PageIndex": PageIndex,
					"PageSize": PageSize,
					"IsDefaultEquipment": 1, // -- 是否只获取第一台设备的数据
					"Parameters": {
						"CompanyId": CompanyId, //--业主Id
						"ProjectId": ProjectId, //--项目Id
						"GatewayId": '', //-- 网关id, 可传空
						"Keywords": Keywords, //-- 搜索关键字, 可传空
						"EquipmentTypeId": EquipmentTypeId, //-- 设备类型
						"OnlineStatus": OnlineStatus, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
						"AlarmStatus": AlarmStatus, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
						"RunStatus": RunStatus, //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
						"Status": vm.Status
					}
				}
				let url = this.equipmentListUrl
				GET(url, params)
					.then(function(response) {
						let res = response.data;
						if(FUNC.checkCode(res.State, res.Message)) {
							vm.uPDATE_DRAGDATA_STATE({
								isObjListLoading: false,
								isDragDetalLoading: false
							});
							let dataArr = response.data.Data.Equipments
							let Total = response.data.Data.Total;
							if(Total == 0) {
								vm.Total = 0;
								vm.equiListData.Total = 0;
								vm.equiListData.PageIndex = 0;
								vm.equiListData.PageSize = vm.PageSize;
								dataArr = [];
								//vm.PageIndex=0;
							} else {
								vm.Total = Total;
								vm.equiListData.Total = Total;
								vm.equiListData.PageSize = vm.PageSize;
								vm.equiListData.PageIndex = PageIndex;
							}
							vm.projectOpts = res.Data.Projects
							vm.reload(dataArr);
							vm.loading = false
						}
					})
					.catch(function(error) {
						console.log(error.message)
					});
			},
			reload(dataArr) {
				if(dataArr.length != 0) {
					for(let index in dataArr) {
						dataArr[index].isActive = false
						dataArr[index].show = FUNC.operator.operateRoleFilter(dataArr[index].IsExperienceEquipment,dataArr[index].IsSelfProject)
					}
					dataArr[0].isActive = true
					this.EquipmentId = dataArr[0].EquipmentId
					 FUNC.storage.set('IsSelfProject',dataArr[0].IsSelfProject);
					this.equiListDataSend = dataArr[0]
				}
				
				this.equiListData.tableData = dataArr
				this.equiListData.isNotClick = false;
			},
			updateElMainContentSize(reduceSize) {
				let vm = this;
				let h = getWinSize('Height', reduceSize);
				vm.fullScreenCss['el_mainContent'] = {
					width: `100%`,
					height: `${h}px`,
					overflow: `auto`
				}
				vm.editPanelPropsData.editPanelClass =
					`height:${h-98}px;overflow-y:auto;
				overflow-x:hidden;`
			}
		},
		mounted: function() {
			let vm = this;
			console.log('大家都觉得：',vm.propsData);
			vm.ProjectId = vm.propsData.ProjectId;
			vm.equiListData.ProjectId = vm.propsData.ProjectId
			vm.equiListData.ProjectName = vm.propsData.ProjectName
			let routeName = vm.$route.name;
				/*'wb_equipments_manage'
				'yz_equipments_manage'
				'sm_equipmet_lists'
				'wb_project_detail'
				'yz_project_detail'
				'sm_project_detail'
				consumption_manage*/
			let pattE = new RegExp("equipme");
			let pattP = new RegExp("project_detail");
			let pattC = new RegExp("consumption_manage");
			let testE = pattE.test(routeName);
			let testP = pattP.test(routeName);
			let testC = pattC.test(routeName);
			if(testE || testP) {
				vm.canShow = true;
				vm.equiListData.IsExperienceProject = vm.propsData.IsExperienceProject;
				vm.equiListData.IsSelfProject = vm.propsData.IsSelfProject;
				vm.equiListData.currentView = 'equiObjist';
				vm.uPDATE_CURRENTVIEWTAB('equiObjist');
				if(vm.get_currentViewTab_data == 'equiObjist') {
					if(testE) {						
						vm.updateElMainContentSize(250);
						$(window).resize(function() {
							vm.updateElMainContentSize(250);
						})
					} else if(testP) {
						//vm.dragPosReduceLeft=290;
						vm.dragPosReduceTop=187;
						vm.updateElMainContentSize(222);
						$(window).resize(function() {
							vm.updateElMainContentSize(222);
						})
					}
				}
				setTimeout(function() {
					vm.dragListener();
				}, 100)
			} else if(testC) {
				vm.uPDATE_CURRENTVIEWTAB('equiList');
				vm.equiListData.currentView = 'equiList';
				vm.comsuptionsCSS = "top:16px;"
			}
		},
		beforeDestroy() {},
		destroyed() {
			var vm = this;
			vm.clearAllDatas();
			document.removeEventListener("drop", vm.handleDrag, false);
		}
	}
</script>
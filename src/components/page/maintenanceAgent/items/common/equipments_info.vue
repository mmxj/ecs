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
				padding: 5px 0px;
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
						/*width: 105px;
			  			text-align: center;
			  			display: inline-block;
			  			padding: 5px 0px;*/
						color: #fff;
						background: #1abc9c;
					}
				}
			}
		}
		.bd1 {
			/*border: 1px solid #DFECEB;*/
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
			position: fixed;
			/*top: 148px;*/
			top: 157px;
		}
		.right_c {
			margin-left: 220px;
			/*position: fixed;
				overflow: auto;*/
			/*overflow: hidden;*/
			/*width: 100%;*/
			/*margin-top: 126px;*/
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
				padding: 3px 7px;
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
				/*height: 70px;*/
				/*background: #dfeceb;*/
				.funLists {
					width: 100%;
					height: 70px;
					background: #dfeceb;
					#freshTimeSetting {
						height: 50px;
						/*width:100%;*/
						/*margin-left: -250px;*/
						left: 50%;
						margin-left: 15px;
						/*position: absolute;*/
						/*top: 15px;*/
						.freshTimeSettingSpan {
							color: #8492A6;
							font-size: 14px;
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
							display: inline-block;
							margin-top: 18px;
						}
					}
					ul {
						list-style: none;
						padding: 10px 0;
						li {
							width: 50px;
							height: 50px;
							border-radius: 50px;
							margin-left: 32px;
							cursor: pointer;
							img {
								width: 50px;
								height: 50px;
							}
						}
					}
					ul.right_operations {
						width: 200px;
						margin-right: 8px;
						li {
							padding: 0;
							margin: 0;
							width: 30px;
							height: 30px;
							margin-right: 10px;
							img {
								width: 30px;
								height: 30px;
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
				overflow: auto;
				/*margin-top: 70px;*/
				/*height: 1000px!important;*/
				.noDataimg {
					/*margin-top: 200px;*/
					text-align: center;
					width:226px ;
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
					width: 50%;
					text-align: center;
				}
				.extendTxtInfo {
					width: 25%;
					text-align: left;
				}
				.extendT {
					width: 100%;
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
		.edit_panel {
			width: 220px;
			position: fixed;
			top: 262px;
			right: 10px;
			height: 100%;
			/*color: #fff;*/
			display: none;
			z-index: 100;
			border: 1px solid #eaedef;
			& h3 {
				color: #000000;
				font-size: 16px;
				width: 100%;
				height: 48px;
				line-height: 48px;
				text-align: center;
				margin: 0;
				/*border-top: 2px solid #eaedef;*/
				border-bottom: 1px solid #eaedef;
				background: #eef6f6;
			}
			& .operations {
				width: 220px;
				height: 48px;
				border-bottom: 1px solid #eaedef;
				background: #eef6f6;
				position: fixed;
				right: 10;
				bottom: 0;
				z-index: 101;
				.operatesBtns {
					width: 100%;
					margin-top: 10px;
					.btn_wrap {
						padding: 0 18px;
					}
				}
			}
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
</style>
<template>
	<div id="el_mainContent" class="el_mainContent">
		<div class="el_content">
			<!--<div class="el_content" .el_mainContent .el-tabs__content{
				padding-left: 0px;
			} v-loading="loading" element-loading-text="努力加载中">-->
			<!--<no-data customStyle="margin:200px 0" noDataInfo="暂无设备数据" v-if="Total==0"></no-data>-->
			<!--bd2:currentViewTab!='equiObjist'&& $route.name!='consumption_manage && (!is_item_detail)',is_equipment_manage-->
			<el-row class='c_wrap' :class="{bd1:get_currentViewTab_data!='equiObjist'&& $route.name != 'consumption_manage',bd2:get_currentViewTab_data!='equiObjist' && is_equipment_manage, objList_bd2:get_currentViewTab_data=='equiObjist'&& !is_item_detail,objList_bd1:get_currentViewTab_data=='equiObjist'&& is_item_detail}">
				<el-row class="w220 fl left_lists">
					<div class='equipmentSearchArear'>
						<div class="navs_wrap" v-if="$route.name!='consumption_manage'">
							<span class="tab-title-bottom">
			              		<a :class="{activeBg: get_currentViewTab_data=='equiObjist'}">
					                <label >
				                  		<span @click="toggleTabs('equiObjist',true);">场景列表</span>
									</label>
								</a>
								<a :class="{activeBg: get_currentViewTab_data=='equiList'}">
									<label>
		                  				<span @click="toggleTabs('equiList',true);">设备列表</span>
			            			</label>
								</a>
							</span>
						</div>
						<div id="equip_lists_search" v-show="get_currentViewTab_data=='equiList'" class="search_wrap">
							<el-input placeholder="设备名称" @change='delaySearch()' v-model="Keywords" class="input-with-select">
								<el-select @change='delaySearch()' v-model="Status" slot="prepend" placeholder="全">
									<el-option label="全" value="0"></el-option>
									<el-option label="告" value="1"></el-option>
									<el-option label="掉" value="2"></el-option>
								</el-select>
								<!--<el-button slot="append" icon="el-icon-search"></el-button>-->
							</el-input>
							<i @click="delaySearch()" :style="comsuptionsCSS" style="position: absolute;right:4px;top: 42px; color: palevioletred;" class="fa fa-search m-r-5">
							</i>
						</div>
						<div v-show="get_currentViewTab_data=='equiObjist'" class="search_wrap">
							<el-input v-model="equiListData.Keyword" placeholder="场景名称"></el-input>
							<i :style="comsuptionsCSS" style="position: absolute;right:4px;top: 42px; color: palevioletred;" class="fa fa-search m-r-5">	            	
	            			</i>
						</div>
					</div>
					<div :style="[fullScreenCss['el_mainContent']]">
						<component :fresh="freshData" v-on:comfirClose="getComfirClose" v-on:hasNoTargetIdList="getTargetIdListInfo" :propsData="equiListData" :is="equiListData.currentView" v-on:pageIndexChange="getPageIndex" :dataSend.sync='equiListDataSend' :tableLoad='tableLoad'>
						</component>
					</div>
				</el-row>
				<div v-if="get_currentViewTab_data=='equiObjist'" class="ovh right_c">
					<div id="drag_wrap">
						<div class="drag_panel_header" :style="[fullScreenCss['drag_panel_header']]" :class="{'el-tabs__header1':is_item_detail,'el-tabs__header2':!is_item_detail}">
							<div class="funLists " :style="[getHeaderWidth, fullScreenCss['funLists']]">
								<!--<div v-show="!get_curr_setting" class="edit_mask" style="position:absolute;width:100%;height: 100%;z-index: 296; left:0;top: 0;">-->
								<div v-show="(!get_curr_setting)&& get_curr_isHasData" id="freshTimeSetting" class="clearfix">
									<div class="timerSetting pull-left">
										<span style="margin-right: 10px;" class="freshTimeSettingSpan">刷新频率：</span>
										<span class="freshTimeSettingDataSpan">{{get_freshTime_Data.Rate}}</span>
										<span style="padding: 0 5px;" class="freshTimeSettingSpan">秒</span>
										<span style="border: 1px solid #E2E6E9; " class="btn_wrap">
								            <button style="margin: 0px;"  @click='freshTimeSetting()' id="btn_t" type="button" class="btn fullScreen"  >
								                <i class="fa fa-cog"></i>
								            </button>
							      		</span>
									</div>
								</div>
								<!--</div>-->
								<ul v-if="get_curr_setting && get_curr_isHasData" class="clearfix" style="width: 100%;">
									<li class="pull-left">
										<img draggable="true" title="图片" class="img" src="static/css/images/drag/1.png" id="icon_upLoadImg" />
									</li>
									<li class="pull-left">
										<img draggable="true" title="文本" class="img" src="static/css/images/drag/2.png" id="icon_label" />
									</li class="pull-left">
									<!--<li class="pull-left">
										<img draggable="true" title="曲线" class="img" src="static/css/images/drag/3.png" id="icon_chart" />
									</li>
									<li class="pull-left">
										<img draggable="true" title="图表" class="img" src="static/css/images/drag/4.png" id="icon_chart_table" />
									</li>-->
									<ul class="right_operations pull-right">
										<li class="pull-right">
											<img @click="confirmClose()" title="关闭" class="img" src="static/css/images/drag/7.png" id="icon_close" />
										</li>

										<li class="pull-right">
											<img @click="confirmGiveUp()" title="放弃" class="img" src="static/css/images/drag/6.png" id="icon_give_up" />
										</li>
										<li class="pull-right">
											<img @click="saveAllDragDatas()" title="保存" class="img" src="static/css/images/drag/5.png" id="icon_save" />
										</li>
									</ul>
								</ul>
								<ul v-if="(!get_curr_setting) && get_curr_isHasData" class="pull-right" style="margin: 0;margin-top: 9px;">
									<span class="pull-left btn_wrap">
				            			<button @click='comeToEdit()' id="btnInsert" type="button" style="" class="btn fullScreen" >
							                <i style="margin-left: 0;" class="fa  fa-cog m-r-5"></i>配置
							            </button>
							        </span>
									<span class="pull-left btn_wrap">
								            <button  @click='intoFullScreen()' id="btn_t" type="button" class="btn fullScreen"  >
								                <i class="fa fa-arrows"></i>
								            </button>
							      	</span>
								</ul>
							</div>
							<div class="el_mainContent" ref='indexContent' style='height:99%;position: relative;' :style="[ulClass,fullScreenCss['el_mainContent']]" v-loading='get_dragDataState.isDragDetalLoading'>

								<div v-if="(!get_curr_setting) && (!get_curr_isPreview)&& get_curr_isHasData" class="drag_panel_content" style="position: relative;" :style="[ulClass,fullScreenCss['el_mainContent']]">
									<div class="noDataimg">
										<img src="static/css/images/drag/noSettingPage.png" />
										<p>未配置显示界面</p>
									</div>
								</div>
								<div v-if="(!get_curr_setting) && (!get_curr_isPreview)&& (!get_curr_isHasData)" class="drag_panel_content" style="position: relative;" :style="[ulClass,fullScreenCss['el_mainContent']]">
									<div class="noDataimg">
										<img src="static/css/images/drag/noSettingPage.png" />
										<p>不存在自定义场景</p>
									</div>
								</div>
								<div v-if="get_curr_isPreview && get_curr_isHasData" class="drag_panel_content droptarget" style="position: relative;" :style="[ulClass,fullScreenCss['el_mainContent']]">
									<div v-show="!get_curr_setting" class="edit_mask" style="position:absolute;width:100%;height: 100%;z-index: 296; left:0;top: 0;">
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
													<!--<h2>文字内容</h2>-->
													<textarea class="txtInfo" :class="{extendTxtInfo1:item.editData.selectDataType=='dataStream'}" v-show="item.editData.selectDataType=='dataStream'&& item.editData.PrePositionValue!=''" v-model="item.editData.PrePositionValue" :style="`font-size:${item.editData.PrePositionStyle.fontSize}px;color: ${item.editData.PrePositionStyle.color};font-weight: ${item.editData.PrePositionStyle.fontWeight};font-style:${item.editData.PrePositionStyle.fontItalic};text-decoration:${item.editData.PrePositionStyle.fontUnderLine};`" style="height: 100%; text-align: right; cursor: move;padding: 8px;" maxlength="100">																										
													</textarea>
													<textarea v-show="item.editData.selectDataType!='dataStream'" class="txtInfo" :class="{extendTxtInfo:item.editData.selectDataType=='dataStream',extendT:item.editData.selectDataType=='dataStream'&&(item.editData.PrePositionValue==''&&item.editData.PostPositionValue=='')}" :style="`font-size:${item.editData.Style.fontSize}px;color: ${item.editData.Style.color};font-weight: ${item.editData.Style.fontWeight};font-style:${item.editData.Style.fontItalic};text-decoration:${item.editData.Style.fontUnderLine};`" v-model="item.editData.labelContent" style="height: 100%; cursor: move;padding: 8px;" maxlength="100" placeholder="内容...">															
													</textarea>
													<textarea v-show="(!isDataChange) && (item.editData.selectDataType=='dataStream')" class="txtInfo" :class="{extendTxtInfo:item.editData.selectDataType=='dataStream',extendT:item.editData.selectDataType=='dataStream'&&(item.editData.PrePositionValue==''&&item.editData.PostPositionValue=='')}" :style="`font-size:${item.editData.Style.fontSize}px;color: ${item.editData.Style.color};font-weight: ${item.editData.Style.fontWeight};font-style:${item.editData.Style.fontItalic};text-decoration:${item.editData.Style.fontUnderLine};`" v-model="item.editData.labelContent" style="height: 100%; cursor: move;padding: 8px;" maxlength="100" placeholder="内容...">															
													</textarea>
													<textarea class="txtInfo" :class="{extendTxtInfo:item.editData.selectDataType=='dataStream'}" v-show="item.editData.selectDataType=='dataStream' && item.editData.PostPositionValue!=''" v-model="item.editData.PostPositionValue" :style="`font-size:${item.editData.PostPositionStyle.fontSize}px;color: ${item.editData.PostPositionStyle.color};font-weight: ${item.editData.PostPositionStyle.fontWeight};font-style:${item.editData.PostPositionStyle.fontItalic};text-decoration:${item.editData.PostPositionStyle.fontUnderLine};`" style="height: 100%; text-align:left;position: absolute;right: 8px; top: 0; cursor: move;padding: 8px;" maxlength="100">																										
													</textarea>
												</div>
											</div>
										</common-drag>
									</div>
									<edit_uploadimg v-for="(item,index) in get_upLoad_img_data" :propsData="{editPanelPropsData:editPanelPropsData,item:item}" :key="item.refs" :currentkey="index">
									</edit_uploadimg>
									<edit_label v-for="(item,index) in get_label_data" :propsData="{editPanelPropsData:editPanelPropsData,item:item}" :key="item.refs" :currentkey="index">
									</edit_label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<el-row id="right_c" v-if="get_currentViewTab_data=='equiList'" :style="equipmentListClass" class="ovh right_c ">
					<el-col :span='24' >
						<no-data :others="true" :srcs="'static/css/images/noEquip.png'" v-show='Total==0' :noDataInfo="'项目下暂无设备 !'"></no-data>
						<!--<p v-show='Total==0' class='noData'>暂无数据</p>-->
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
	const FUNC = Common.Func
	const AXIOS = FUNC.axios
	const GET = AXIOS.get
	const URL = Common.Const.url
	const DELETE = Common.Func.axios.delete
	import equiObjist from 'components/common/equipment_objlist'
	import equiList from 'components/common/equipment_list'
	import equiTab from './equipment_tabs'
	import consumptionManage from 'components/page/maintenanceAgent/consumption_manage'
	import commonDrag from './drag/commonDrag'
	import edit_uploadimg from './drag/edit_upLoadImg'
	import edit_label from './drag/edit_label'
	import { mapGetters, mapMutations } from 'vuex'
	import { getStyle,getWinSize } from 'src/assets/js/common/util.js';
	export default {
		data: function() {
			return {
				t1: '黄君福',
				t2: '果果',
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
				freshData:{
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
				typeDatas: [
					'get_upLoad_img_data',
					'get_label_data'
				],
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
				Dashboards: [],
				IsEquipment: false,
				hasListData: false,
				fullScreenCss: {
					drag_panel_header: {},
					funLists: {},
					el_mainContent: {}
				},
				isFullScreen: false,
				isDataChange: false,
				cometoData:false
				//isAddDrag:false
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
			edit_label
		},
		watch: {
			/*currentViewTab(val,oldval){
				console.log('黄：',val,oldval,this.Total);
				this.Total=this.Total;
			},*/
			"get_freshTime_Data.Time" (val, oldVal) {
				this.isDataChange = true;
				setTimeout(() => {
					this.isDataChange = false;
				}, 500);
			},
			isShowSideBar(val) {
				if(this.is_item_detail) {
					let el = document.querySelector('.el-tabs__header1');
					if(!el) {
						if(val) {
							this.getWidth(423);
						} else {
							this.getWidth(240);
						}
						return;
					}
					if(val) {
						this.getWidth(423);
						el.style.left = '413px'

					} else {
						this.getWidth(240);
						el.style.left = '230px'
					}
				} else {
					let el = document.querySelector('.el-tabs__header2');
					if(!el) {
						if(val) {
							this.getWidth(423);
						} else {
							this.getWidth(240);
						}
						return;
					}
					if(val) {
						this.getWidth(423);
						el.style.left = '413px'
					} else {
						this.getWidth(240);
						el.style.left = '230px'
					}
				}
			},
			get_curr_isHasData(val, oldval) {
			},
			get_currentViewTab_data(val,oldval) {
				console.log('currentVi8ew:',val);
				if(val=='equiList'){
					this.getHeight(254);
				}
				this.$nextTick(function() {
					if(this.is_item_detail) {
						if(val == 'equiObjist') {
							let el = document.querySelector('.el-tabs__header1');
							if(this.isShowSideBar) {
								this.getWidth(423);
								el.style.left = '413px'
							} else {
								this.getWidth(239);
								el.style.left = '230px'
							}
						} else {
							let el = document.querySelector('.el-tabs__header1')
						}
					} else {

						if(val == 'equiObjist') {
							let el = document.querySelector('.el-tabs__header2');
							if(this.isShowSideBar) {
								this.getWidth(423);
								el.style.left = '413px'
							} else {
								this.getWidth(239);
								el.style.left = '230px'
							}
						} else {
							let el = document.querySelector('.el-tabs__header2')
						}
					}
				})
			},
			propsData() {
				let vm = this
				let props = vm.propsData
				vm.equiListData.ProjectId = props.ProjectId
				vm.equiListData.ProjectName = props.ProjectName
				vm.equiListData.CompanyId = props.CompanyId
				vm.equiListData.IsExperienceProject = props.IsExperienceProject
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
					console.log('tabel');
					vm.tableLoad()
				}, 300)
			},
			'equiListData.Keyword'(val,oldval){
				if(val!=''){
					this.equiListData.isNotClick=true;
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
			computeStyle() {
				return this.get_curr_isPreview;
			},
			...mapGetters([
				'isShowSideBar',
				'get_upLoad_img_ID',
				'get_label_ID',
				'get_isAddDropEventListener',
				'get_curr_setting',
				'get_curr_isPreview',
				'get_curr_isHasData',
				'get_upLoad_img_data',
				'get_label_data',
				'get_curr_TargetId',
				'get_tempDrag_Datas',
				'get_freshTime_Data',
				'get_dragDataState',
				'get_refs_data',
				'get_isAddDrag_state',
				'get_currentViewTab_data'
			])
		},
		filters: {
			formateSeconds: function(seconds) {
				return eosCommon.formatSeconds(seconds);
			}
		},
		methods: {
			...mapMutations({
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
				uPDATE_CURRENTVIEWTAB:'UPDATE_CURRENTVIEWTAB'
			}),
			intoFullScreen() {
				window.open("/#/test_?TargetId=" + this.get_curr_TargetId)
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
					"AccessToken": eosCommon.storage.get("AccessToken"),
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
				if(vm.get_tempDrag_Datas.length == 0) {
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
			},
			getComfirClose(data) {
				this.saveAllDragDatas();
			},
			getTargetIdListInfo(data) {
				//console.log('shibushi1:',this.get_currentViewTab_data);
				this.cometoData=data;
				if(this.cometoData && (!this.equiListData.isNotClick)) {
					this.equiListData.currentView = 'equiList';
					//this.currentViewTab = 'equiList';
					this.uPDATE_CURRENTVIEWTAB('equiList');
					console.log('tabel');
					this.tableLoad();
					//console.log('shibushi1:',this.get_currentViewTab_data);
				}
			},
			confirmClose() {
				let vm = this
				if(vm.get_tempDrag_Datas.length == 0) {
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
							let PrePositionValue = vm.get_label_data[i].editData.PrePositionValue;
							let DefaultValue = vm.get_label_data[i].editData.labelContent;
							let PostPositionValue = vm.get_label_data[i].editData.PostPositionValue;
							let TerminalEquipmentId = vm.get_label_data[i].editData.dataStream.EquipmentId
							let Address = vm.get_label_data[i].editData.dataStream.RegisterAddress
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
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
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
						//vm.freshData.hasMakeFreshTime = !vm.freshData.hasMakeFreshTime;
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
			updateImgUrl(params) {},
			handleDrag(ev) {
				console.log('托马');
				let vm = this;
				var ev = ev || event;
				vm.c_type = vm.c_id.substr(5);
				var elem = ev.srcElement || ev.target;
				
				while((elem.className) && (elem.className != "drag_region bgC")) {
					elem = elem.parentNode;
				}
				if(elem.className == "drag_region bgC") {
					
					var L = ev.clientX;
					var T = ev.clientY;
					if(vm.c_type == 'upLoadImg') {
						this.uPDATE_IMG_ID({
							isReset: false
						});
						let upLoadImgLength = vm.get_upLoad_img_data.length;
						let currImgID = vm.get_upLoad_img_ID;
						let imgDatas = {
							typeName: `upLoadImg`,
							typeId: currImgID,
							refs: `${vm.get_curr_TargetId}upLoadImg${currImgID}`,
							upLoadImgLength: upLoadImgLength,
							title: '底图',
							previewData: {},
							editData: {
								imgUrl: '',
								layOutStyle: ''
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
						vm.fixPosition('upLoadImg', currImgID, L, T,vm.isShowSideBar);
					} else if(vm.c_type == 'label') {

						this.uPDATE_LABEL_ID({
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
							typeId: currLabelID,
							refs: `${vm.get_curr_TargetId}label${currLabelID}`,
							labelLength: labelLength,
							title: '文本',
							previewData: {
								labelContent: ''
							},
							editData: {
								//dataStream
								layOutStyle: '',
								selectDataType: 'fixedTxt',
								PrePositionValue: '',
								labelContent: '',
								PostPositionValue: '',
								Style: {
									fontSize: '16',
									color: 'rgb(102, 102, 102)',
									fontWeight: 'normal',
									fontItalic: 'normal',
									fontUnderLine: 'normal',
									AlignType: 1
								},
								PostPositionStyle: {
									fontSize: '16',
									color: 'rgb(102, 102, 102)',
									fontWeight: 'normal',
									fontItalic: 'normal',
									fontUnderLine: 'normal',
									AlignType: 1
								},
								PrePositionStyle: {
									fontSize: '16',
									color: 'rgb(102, 102, 102)',
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
							data: `${vm.get_curr_TargetId}label${currLabelID}`
						});
						vm.fixPosition('label', currLabelID, L, T,vm.isShowSideBar);
					}
				}
			},
			fixPosition(type, currTypeID, L, T,isShowSideBar) {
				let vm = this;
				if(vm.get_currentViewTab_data == 'equiList') {
					vm.uPDATE_ISADDDRAG_STATE(true);
					if(vm.get_isAddDrag_state) {
						vm.$refs = vm.get_refs_data;
					}
				}
				//vm.callBack(data);
				vm.$nextTick(() => {
					for(let i = 0; i < vm.$refs[`wraps_${type}`].length; i++) {
						if(vm.$refs[`wraps_${type}`][i].$el.id == `wrap_${vm.get_curr_TargetId}${type}${currTypeID}`) {
							if(isShowSideBar){
								vm.$refs[`wraps_${type}`][i].$el.style.left = (L - 413) + 'px';							
							}else{
								vm.$refs[`wraps_${type}`][i].$el.style.left = (L - 413+183) + 'px';
							}
							vm.$refs[`wraps_${type}`][i].$el.style.top = (T - 262) + 'px';
						}
					}
				});
			},
			callBack(data) {
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
				vm.uPDATETEMPDATA({
					isClear: true,
					data: 'giveUp'
				});
			},
			toggleTabs: function(tabText, isNotClick) {
				let vm = this;
				vm.equiListData.isNotClick = isNotClick;
				if(vm.get_tempDrag_Datas.length == 0) {
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
				//vm.currentViewTab = tabText;
				if(vm.get_currentViewTab_data == 'equiObjist') {
					vm.IsEquipment = false;
				} else {
					vm.IsEquipment = true;
				}
				vm.clearAllDatas();
				vm.setCss();
			},
			addEquipment() {
				let vm = this
				/*if (!vm.propsData.ProjectId) {
				  vm.$alert('请先选择下拉框中的“项目名称”再添加设备')
				  return false
				}*/
				eosCommon.storage.set('routerName', vm.$route.name);
				vm.$router.push({
					name: 'equipment_detail_infos',
					params: {
						ProjectId: vm.equiListData.ProjectId,
						ProjectName: vm.equiListData.ProjectName,
						GatewayId: '',
						GatewayName: '',
						isDirectInto: true,
						isEdit: false,
						isInsert: true
					}
				});
			},
			debug() {
				let vm = this
				/*console.log(this.$route)
				if (!vm.propsData.ProjectId) {
				  vm.$alert('请先选择下拉框中的“项目名称”再调试设备')
				  return false
				}*/
				eosCommon.storage.set('routerName', vm.$route.name);
				vm.$router.push({
					name: 'equipments_info',
					params: {
						ProjectId: vm.equiListData.ProjectId,
						ProjectName: vm.equiListData.ProjectName
					}
				});
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
							vm.equiTabData = res.Data
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
								console.log('zan:',dataArr,Total,vm.Total);
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
						dataArr[index].show = FUNC.operator.operateRoleFilter(dataArr[index].IsExperienceEquipment)
					}
					dataArr[0].isActive = true
					this.EquipmentId = dataArr[0].EquipmentId
					this.equiListDataSend = dataArr[0]
				}
				this.equiListData.tableData = dataArr
				this.equiListData.isNotClick = false;
			},
			setObjHeaderCss() {
				let vm = this;
				vm.heaer_el = document.querySelector('.drag_panel_header');
				if(vm.$route.name == 'wb_project_detail' ||
					vm.$route.name == 'yz_project_detail' ||
					vm.$route.name == 'sm_project_detail') {
					vm.heaer_el.className = 'drag_panel_header el-tabs__header1';
				} else if(vm.$route.name == 'wb_equipments_manage' ||
					vm.$route.name == 'yz_equipments_manage' ||
					vm.$route.name == 'sm_equipmet_lists') {
					vm.heaer_el.className = 'drag_panel_header el-tabs__header2';
				}
			},
			setCss() {
				let vm = this;
				vm.el = document.querySelector('.c_wrap'); //yz_project_detail
				if(vm.$route.name == 'wb_project_detail' ||
					vm.$route.name == 'yz_project_detail' ||
					vm.$route.name == 'sm_project_detail') {
					vm.is_item_detail = true;
					vm.dragListener();
					if(vm.get_currentViewTab_data == 'equiObjist') {
						console.log('哈哈哈2');
						$(document).ready(function() {
							vm.getHeight(227);
							if(vm.isShowSideBar) {
								vm.getWidth(423);
							}
							vm.editClass = 'top:227px'
							vm.editPanelPropsData.editClass = vm.editClass;							
						})
					} else {
						//vm.dragListener();
						//console.log('哈哈哈11');
						if(!(vm.cometoData && (!vm.equiListData.isNotClick))) {
							//console.log('哈哈哈112');
							console.log('tabel');
							vm.tableLoad();
						}
						
					}
				} else if(vm.$route.name == 'wb_equipments_manage' ||
					vm.$route.name == 'yz_equipments_manage' ||
					vm.$route.name == 'sm_equipmet_lists') {
					vm.is_item_detail = false;
					vm.is_equipment_manage = true;
					vm.dragListener();
					$(document).ready(function() {
						if(vm.get_currentViewTab_data == 'equiObjist') {
							vm.getHeight(252);
							if(vm.isShowSideBar) {
								vm.getWidth(423);
							}
							//vm.dragListener();
						} else {
							vm.getHeight(270);
							console.log('tabel');
							vm.tableLoad();
						}
					})
				} else {
					$("#right_c").css('marginTop', '92px');
					vm.is_item_detail = false;
					vm.comsuptionsCSS = 'top:12px'
					vm.$nextTick(() => {
						$(".body-content").getNiceScroll().resize();
						$("#right_c").height($(window).height() - 228).niceScroll({
							cursorwidth: "6px",
							cursorborderradius: "6px",
							autohidemode: 'scroll',
							nativeparentscrolling: true,
							spacebarenabled: true,
							horizrailenabled: false,
							cursoropacitymax: 0.8,
							cursorborder: "0px solid red",
							railpadding: { top: 0, right: 5, left: 0, bottom: 0 },
						});
					});
				}
			},
			getStyle(obj) {},
			getHeight(reduceHeight) {
				//获取窗口高度
				let vm = this;
				let winHeight = getWinSize('Height',reduceHeight);
				vm.ulClass.height = `${winHeight-13}px`;
				vm.ulClass.overflow = `auto`;
				let h = winHeight - 94; //- 94
				let h2 = winHeight + 15;
				vm.equipmentListClass = `height:${h2}px;overflow:auto;`
				vm.editPanelClass = `height:${h}px;overflow:auto;`
				vm.editPanelPropsData.editPanelClass = vm.editPanelClass
			},
			getWidth(reduceWidth) {
				//获取窗口宽度
				let vm = this;
				let winWidth = getWinSize('Width',reduceWidth);
				this.getHeaderWidth = {
					width: `${winWidth}px`
				}
				this.ulClass.width = `${winWidth}px`;
			}
		},
		created() {},
		mounted: function() {
			let vm = this;
			if(this.$route.name == 'wb_equipments_manage' ||
				this.$route.name == 'yz_equipments_manage' ||
				this.$route.name == 'sm_equipmet_lists' ||
				this.$route.name == 'wb_project_detail' ||
				vm.$route.name == 'yz_project_detail' ||
				vm.$route.name == 'sm_project_detail'
			) {
				this.canShow = true;
				this.ProjectId = this.propsData.ProjectId
				this.equiListData.ProjectId = this.propsData.ProjectId
				this.equiListData.ProjectName = this.propsData.ProjectName
				this.equiListData.IsExperienceProject = this.propsData.IsExperienceProject;
				this.equiListData.currentView = 'equiObjist';
				//vm.currentViewTab = 'equiObjist'
				this.uPDATE_CURRENTVIEWTAB('equiObjist');
				if(vm.get_currentViewTab_data == 'equiObjist') {
					$(window).resize(function() {
						vm.getHeight(252);
						vm.getWidth(423);
					})
				} 
			}
			if(this.$route.name == 'consumption_manage') {
				//alert(1);
				//vm.currentViewTab = 'equiList'
				this.uPDATE_CURRENTVIEWTAB('equiList');
				this.equiListData.currentView = 'equiList';
				this.isShowDebugBtnByRoute = false
				this.ProjectId = this.propsData.ProjectId
				this.equiListData.ProjectId = this.propsData.ProjectId
				this.equiListData.ProjectName = this.propsData.ProjectName
				console.log('tabel');
				//this.tableLoad()
			} else {
				this.isShowDebugBtnByRoute = true
			}
			setTimeout(function() {
				vm.setCss();
			}, 100)
		},
		beforeDestroy() {},
		destroyed() {
			var vm = this;
			//alert(1);
			vm.clearAllDatas();
			document.removeEventListener("drop", vm.handleDrag, false);
		}
	}
</script>
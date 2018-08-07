<template>
	<div id="work-order" style="" class="workerBg">
					<!--工单详情开始-->
<div id="addWorkOrderBox"  style="margin: 0 10px;">
	<div class="row" style="margin-top: 12px; border-bottom: 2px solid #edeff1;">
		<div class="col-lg-12">
			<span class="size20 font-bold" style="color: #000;">工单详情</span>
			<button style="margin-bottom: 8px;" @click="detailReturnClick()" type="button" class="btnReturn btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
		</div>
	</div>
	<!--<hr class="divider mb-10 mt-10">-->
	<div id="addWorkOrdeverifyCheck_2" style="margin-top: 20px;">
		<div class="form-horizontal content-box">
			<div class="row ">
				<form class="form-inline col-lg-12">
					<div class="form-group col-lg-3">
						<label class="content-title-left">工单号:</label>

						<p class="form-control-static">{{WorkOrder.WorkOrderNo}}</p>

					</div>
					<div class="form-group col-lg-3">
						<label class="content-title-left">工单类型:</label>

						<p class="form-control-static">{{WorkOrder.OrderTypeName}}</p>

					</div>

					<div class="form-group col-lg-3">
						<label class="content-title-left">所属项目:</label>

						<p class="form-control-static">{{WorkOrder.ProjectName}}</p>

					</div>
					<div class="form-group col-lg-3">
						<label class="content-title-left">相关设备:</label>

						<p class="form-control-static">{{WorkOrder.EquipmentAlias}}</p>

					</div>
					<div class="form-group col-lg-3">
						<label class="content-title-left">创建人:</label>

						<p class="form-control-static">{{WorkOrder.CreatorName}}</p>

					</div>
					<div class="form-group col-lg-3">
						<label class="content-title-left">创建时间:</label>

						<p class="form-control-static">{{WorkOrder.CreatedOn}}</p>

					</div>
					<div class="form-group col-lg-3">
						<label class="content-title-left">当前责任人:</label>

						<p class="form-control-static">{{WorkOrder.ExecutorName}}</p>

					</div>
					<div class="form-group col-lg-3">
						<label class="content-title-left">协助人:</label>

						<p class="form-control-static">
							<span v-for="(datas,index) in detailsParticipants">
		                                	 		<span>{{datas}} ,</span>
							</span>
						</p>

					</div>
					<div class="form-group col-lg-3">
						<label class="content-title-left">状态:</label>

						<p class="form-control-static">

							<span v-if="WorkOrder.OrderStatus==1">未关闭</span>
							<span v-if="WorkOrder.OrderStatus==2">已关闭</span>
							<span v-else-if="WorkOrder.OrderStatus==3">已取消</span>

						</p>

					</div>
					<div class="form-group col-lg-3">
						<label class="content-title-left">工单内容:</label>

						<p class="form-control-static">{{WorkOrder.OrderContent}}</p>

					</div>

				</form>
			</div>

		</div>
		<div class="form-horizontal content-box bg-white" :class="[CanAddJobLog!=1 ? 'col-sm-12' : 'col-sm-6', CanAddJobLog!=1 ? 'col-md-12' : 'col-md-6',CanAddJobLog!=1 ? 'col-lg-12' : 'col-lg-6']">
			<span class="size20 font-bold" style="color: #000;">工作过程</span>
			<!--<h3 >工作过程</h3>-->
			<hr class="divider mb-10 mt-10">
			<div id="JobLogs">
				<ul v-show="isHasJobLog" class="details_wrap" style="margin-bottom: 0; list-style: none; padding:0;padding-left: 30px;"  v-for="item in intoPageDetails">
					<li>
						<h3>
											<span class="JobTheme">{{item.JobTheme}}</span>
											<span class="TransactorName">{{item.TransactorName}}</span>
											
										</h3>
						<p class="StartTime">
							<span>时间：</span>
							<span>
												{{item.CreatedOn}}
											</span>
						</p>
						<p class="Description">
							<span>内容：</span>
							<span>
												{{item.Description}}
											</span>
						</p>
						<p class="Description">
							<span style="position: relative;" class="text-right">附件：
											<!--<a style="margin-right: 5px;" class="cursor text-cleos" href="">{{data.Format}}</a>-->
												<div  class="enclosure" v-if="JSON.parse(item.JobFiles).length>=0">
													<ul class="into_enclosure">
														<li  v-for="data in JSON.parse(item.JobFiles)" class="file_list into_Details">
															<a :title="data.OriginalFileName" class="cursor text-cleos" :href="data.FilePath" target="_blank" v-bind:class="data.Format.substring(1,data.Format.length)">{{data.OriginalFileName}}</a>
														</li>
													</ul>
													
												</div>
											</span>
							<span v-if="JSON.parse(item.JobFiles).length==0">暂无内容</span>

						</p>
					</li>

				</ul>
				<div v-show="!isHasJobLog" class="noDetailData" style="margin-top: 60px;min-height: 467px;">
					<img style="margin: 0 auto;" class="img-responsive" src="../../../static/css/images/noorder_detail_bg.png" />
					<h3 class="text-center" style="color: #3bc6aa; font-weight: bold; font-size: 20px;">当前工单暂无工作过程</h3>

				</div>
			</div>

		</div>
		<div v-show="CanAddJobLog==1" id="addThemePanel" style="min-height: 586px;" class="form-horizontal content-box col-sm-6 col-md-6 col-lg-6 bg-white b-l-1">
			<span class="size20 font-bold" style="color: #000;">添加工作过程</span>
			<!--<h3 >工作过程</h3>-->
			<hr class="divider mb-10 mt-10">
			<div class="form-group">
				<label class="content-title-left">
						                                <em class="ak_required_em">*</em>工作主题：
						                            </label>
				<div class="col-lg-5 col-xs-5">
					<select id="selectJobTheme" @change="selectJobThemeChange()" v-model="JobThemeId" class="form-control selectpicker input-sm" data-style="btn-white">
						<option value="">选择主题</option>
						<option v-for="(item,index) in JobTheme" :value="item.id">{{item.themeName}}</option>

					</select>
				</div>
			</div>

			<div class="form-group">
				<label class="content-title-left"><em class="ak_required_em">*</em>工作描述:</label>
				<div class="col-lg-6 col-xs-9">

					<textarea id="txtobLogDescriptions" v-model="InsertJobLogDescriptions" maxlength="1500" type="text" class="form-control required" data-valid="isNonEmpty" data-error="工作描述不能为空" placeholder="请输入工作描述"></textarea>
					<span class="valid-form-group" style="top: 86px;left: 15px;">
		                                    	<label class="focus valid"></label>
			                                </span>
					<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
					<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>

				</div>
			</div>
			<div class="distribute_c" v-show="isDistribute">
				<div class="form-group">
					<label class="content-title-left">
							                                <em class="ak_required_em"></em>负责人：
							                            </label>
					<div class="col-lg-5 col-xs-5">
						<select id="d_selectCharges" @change="getExecutorCompanyId()" v-model="selectWorkOrderExecutor" class="form-control selectpicker input-sm" data-style="btn-white">
							<option value="">选择负责人</option>
							<option v-for="item in WorkOrderExecutor" :value="item.AccountId">{{item.UserName}}</option>

						</select>
					</div>
				</div>
				<div class="form-group">
					<label class="content-title-left">
							                                <em class="ak_required_em"></em>协助人
							                            </label>
					<div class="col-lg-5 col-xs-5 selectHelpers">
						<select id="d_selectHelpers" v-model='selectParticipants' multiple class="form-control selectpicker input-sm" data-style="btn-white">
							<option v-for="item in WorkOrderParticipants" :value="item.AccountId">{{item.UserName}}</option>

						</select>
					</div>
				</div>
			</div>
			<div class="form-group">
				<label class="content-title-left">附件：</label>
				<div class="col-lg-5 col-xs-8">
					<div id="fileBox1" style="margin-top: -10px;"></div>
				</div>
			</div>
			<div class="content-box-footer">
				<div class="form-group">
					<label class="content-title-left"></label>
					<div class="col-lg-5 col-xs-8 pl-22">
						<button @click="detailReturnClick()" type="button" class="btnReturn btn btn-white pull-left mr-20">取消</button>
						<button @click="InsertJobLogSave()" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中...">确定</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<!--</div>-->

<!--工单详情结束-->
	</div>
</template>

<script>
	export default{
		
		data:function(){
			return{
				WorkOrderId:'',
				initProjectId:'',
				CanAddJobLog:'',
				detailsParticipants:'',
				intoPageDetails:[],
				isHasJobLog:false,
				ExecutorCompanyId:'',
				selectWorkOrderExecutor:'',
				WorkOrderExecutor:[],
				JobTheme:[],
				JobThemeId:'',
				JobFiles:[],
				WorkOrder:'',
				InsertJobLogDescriptions:'',
				isDistribute:false,
				selectParticipants:[],
				selectParticipant_s:[],
				WorkOrderParticipants:[]
				

				
			}
		},
		mounted:function(){
			console.log(this.$route.params)
			var _this=this;
			_this.WorkOrderId=_this.$route.params.orderinfos.WorkOrderId;
			_this.initProjectId=_this.$route.params.orderinfos.ProjectId;
			
			_this.getWorkOrderDetails();
		},
		methods:{
			detailReturnClick:function(){
				this.$router.go(-1);
			},
			InsertJobLogSave: function() {
				var _this = this;
				if(_this.selectJobTheme == '') {
					vdialog({
						type: 'confirm',
						title: '提示',
						content: '请选择工作主题',
						ok: function() {

						},
						cancel: true,
						modal: true
					});
					return false;
				}
				if(!verifyCheck._click("addThemePanel")) {
					return false;
				}
				for(var j = 0; j < _this.selectParticipants.length; j++) {
					for(var i = 0; i < _this.WorkOrderParticipants.length; i++) {
						if(_this.selectParticipants[j] == _this.WorkOrderParticipants[i].AccountId) {
							_this.selectParticipant_s.push({ "UserName": _this.WorkOrderParticipants[i].UserName, "AccountId": _this.selectParticipants[j] });
						}
					}
				}
				if(_this.selectParticipant_s.length == 0) {
					_this.selectParticipant_s = [];
				}
				console.log(JSON.stringify(_this.JobFiles))
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"ProjectName": _this.detailsProjectName, //必填
						"WorkOrderId": _this.WorkOrderId, //必填
						"WorkOrderNo": _this.detailsWorkOrderNo, //必填
						"Description": _this.InsertJobLogDescriptions, //工作描述
						"JobFiles": _this.JobFiles, // 工作附件,可传空 OriginalFileName为客户端上传时文件名,SysNewFileName为上传后系统生成的文件名
						"JobTheme": _this.selectJobTheme, //_this.selectJobTheme //工作主题,系统默认：处理建议、到场签到、处理前记录、处理中记录、处理后记录、完结申请、关闭、退回、取消、派发；也可手动填写,不能超过10个字符 必填
						"Executor": _this.selectWorkOrderExecutor, //当前负责人, 当工单主题为派发为必填项
						"Participants": _this.selectParticipant_s
					}
				}
				var url = eosCommon.ENTERPRISE_API + "api/project/InsertJobLog";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
						_this.getWorkOrderDetails();
//						_this.isIntoDetails = false;
					}
				})
			},
			getWorkOrderDetails: function() {
				var _this = this;
				console.log(_this.WorkOrderId)
				if(_this.WorkOrderId == '') {
					vdialog({
						type: 'confirm',
						title: '提示',
						content: '请先选相应择工单',
						ok: function() {

						},
						cancel: true,
						modal: true
					});
					return false;
				}
				_this.QueryJobTheme();
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"IsLoadOrder": 1, //是否需要加载工单信息
					"WorkOrderId": _this.WorkOrderId
				}

				var url = eosCommon.ENTERPRISE_API + "api/project/WorkOrderDetail";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						console.log('主界面工单详情：', result)
						
						if(result.Data instanceof Array) {
							//暂无数据
							_this.isHasJobLog = false;
						} else {
							_this.WorkOrder = result.Data.WorkOrder[0];
							_this.CanAddJobLog = result.Data.CanAddJobLog;
							_this.detailsParticipants = JSON.parse(_this.WorkOrder.Participants);
							_this.intoPageDetails = result.Data.JobLog;
							_this.detailsProjectName = _this.WorkOrder.ProjectName;
							_this.detailsWorkOrderNo = _this.WorkOrder.WorkOrderNo;

							if(_this.intoPageDetails.length==0){
								_this.isHasJobLog = false;
								
							}else{
								_this.isHasJobLog = true;
								
							}
							
						}
					}
				})
			},
			getExecutorCompanyId: function() {
				var _this = this;
				for(var i = 0; i < _this.WorkOrderExecutor.length; i++) {
					if(_this.selectWorkOrderExecutor == _this.WorkOrderExecutor[i].AccountId) {
						_this.ExecutorCompanyId = _this.WorkOrderExecutor[i].CompanyId;
					}
				}
				_this.QueryWorkOrderParticipants();
			},
			QueryJobTheme: function() {
				var _this = this;
//				_this.isIntoDetails = true;
				_this.initEditDatas();
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"WorkOrderId": _this.WorkOrderId
				}

				var url = eosCommon.ENTERPRISE_API + "api/project/QueryJobTheme";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						if(result.Data.JobTheme.length == 0) {
							_this.JobTheme = []
							_this.$nextTick(function() {
								$('#selectJobTheme').selectpicker('refresh');
							})
						} else {
							for(var i = 0; i < result.Data.JobTheme.length; i++) {
								_this.JobTheme.push({ id: i, themeName: result.Data.JobTheme[i] });
							}
							_this.$nextTick(function() {
								$('#selectJobTheme').selectpicker('refresh');
							})
						}
					}
				})
			},
			selectJobThemeChange: function() {
				var _this = this;
				if(_this.JobThemeId !== '') {
					for(var i = 0; i < _this.JobTheme.length; i++) {
						if(_this.JobThemeId == _this.JobTheme[i].id) {
							_this.selectJobTheme = _this.JobTheme[i].themeName;
						}
					}
				}
				if(_this.selectJobTheme == '派发') {
					_this.isDistribute = true;
				} else {
					_this.isDistribute = false;
					_this.selectWorkOrderExecutor = ''; //当前责任人，不为空则表示新增工单时默认派单 可传空
					_this.selectParticipant_s = []; //协助人，Executor为空时不能传值 可传空,			
				}
			},
			selectHelpersClick: function() {
				var _this = this;
				$('div.selectHelpers button').click(function() {
					if(_this.selectWorkOrderExecutor == '') {
						vdialog({
							type: 'confirm',
							title: '提示',
							content: '请先选择负责人',
							ok: function() {

							},
							cancel: true,
							modal: true
						});
					}
				})
			},
			QueryWorkOrderParticipants: function() {
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"QueryType": 1, //查询场景类型，1-新增工单 2-派单 必填,值只能为1或2
					"WorkOrderId": "", //QueryType为2时必填
					"ProjectId": _this.initProjectId, //QueryType为1时必填
					"CompanyId": _this.ExecutorCompanyId, //负责人所在的企业id, 必填
					"ExecutorId": _this.selectWorkOrderExecutor //负责人用户id, 必填
				}
				var url = eosCommon.ENTERPRISE_API + "api/project/QueryWorkOrderParticipants";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						_this.WorkOrderParticipants = result.Data.Result;
						_this.$nextTick(function() {
							$('#selectHelpers').selectpicker('refresh');
							$('#d_selectHelpers').selectpicker('refresh');
						})
					}
				})
			},
			initEditDatas() {
				var _this = this,
					fielId = [],
					urlId = [];
				_this.JobTheme = [];
				_this.JobThemeId = '';
				_this.InsertJobLogDescriptions = '';
				_this.selectWorkOrderExecutor = '';
				_this.ExecutorCompanyId = '';
				_this.selectParticipants = [];
				_this.QueryWorkOrderExecutor();
				_this.selectHelpersClick();
				_this.$nextTick(function() {
					$('#selectJobTheme').selectpicker('refresh');
					$('#d_selectCharges').selectpicker('refresh');
					$('#d_selectHelpers').selectpicker('refresh');
				})
				_this.initFielUpload();
			},
			QueryWorkOrderExecutor: function() {
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"QueryType": 1, //查询场景类型，1-新增工单 2-派单 必填,值只能为1或2
					"WorkOrderId": "", //QueryType为2时必填
					"ProjectId": _this.initProjectId //QueryType为1时必填
				}

				var url = eosCommon.APP_API + "api/oa/QueryWorkOrderExecutor";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {

						_this.WorkOrderExecutor = result.Data.Result;
						_this.$nextTick(function() {
							$('#selectCharges').selectpicker('refresh');
						})
					}
				})
			},
			initFielUpload: function() {
				var _this = this;
				$("#fileBox1").empty();
				$("#fileBox1").html(
					'<div id="fileDnd1" class="uploader_box1 eos_uploader_box">' +
					'<div class="wu-example">' +
					'<div class="uploader-list"></div>' +
					'<div class="btns">' +
					'<div id="picker">选择上传文件</div>' +
					'</div>' +
					'</div>' +
					'</div>');
				var fileParam = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"ResourceType": "0",
					"Title": "附件",
					"Description": "附件"
				};
				eosCommon.eosUploaderFile({
					'uploaderObj': 'uploaderFile',
					'uploaderBox': '.uploader_box1',
					'uploaderList': '.uploader-list',
					'initBtn': '#picker',
					'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
					'data': fileParam,
					'fileNumLimit': 3,
					'upType': 0,
					'succ': function(result) {
						console.log(result)
						var result = result.Data[0];
						_this.JobFiles.push({
							"FileId": result.ResourceId,
							"OriginalFileName": result.OriginalResourceName,
							"SysNewFileName": result.ResourceName,
							"FileSize": result.Size,
							"Format": result.Format
						});
					},
					'del': function(result) {
						//删除资源ID对应的文件
						if(result != "") {
							var param = {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"ResourceId": result,
									"ResourceType": "0"
								}
							};
							var url = eosCommon.RESOURCES_API + "api/resource/delete";
							eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {}
							});
						}
					}
				}, 1);
			},
		}
		
	}
	
	
</script>

<style scoped="scoped">
	@import '/static/css/notice.css';
	#work-order .order-card-box {
		padding: 10px 15px 15px 15px;
		background-clip: padding-box;
		margin-bottom: 20px;
		background-color: #ffffff;
	}
	
	#work-order .dataTables_wrapper .dataTables_processing {
		top: 140px;
	}
	
	#item-detail .detail_add .tab-content {
		min-height: 700px;
	}
	
	#workOrderData table>tbody>tr:hover {
		cursor: pointer;
	}
	
	#workOrderData table>tbody>tr.order_active:hover {
		background: #c0ede4!important;
	}
	
	#workOrderData table>tbody>tr.order_active {
		background: #c0ede4!important;
	}
	
	ul.details_wrap {
		list-style: none;
		height: 180px;
		background: url('/static/css/images/order_detail_bg.png') no-repeat 0px 0px;
		background-size: auto 100%;
	}
	
	ul.details_wrap h3 {
		margin-top: 0;
	}
	
	ul.details_wrap h3 span {
		font-size: 18px;
		color: #000000;
	}
	
	ul.details_wrap p {
		font-size: 14px;
		color: #a5afbe;
	}
	
	.content-title-left {
		line-height: 34px;
		color: #8694a8;
	}
	
	.form-control-static {
		min-height: 34px;
		/* padding-top: 7px; */
		/* padding-bottom: 7px; */
		/* margin-bottom: -18px; */
		padding: 0;
		line-height: 34px;
		color: #000000;
		margin-left: 10px;
	}
	
	#addWorkOrdeverifyCheck_2 .form-inline .form-group {
		margin-top: 0;
		margin-bottom: 0;
	}
	
	.workerBg {
		background: #fefefe;
		padding: 8px;
		padding-bottom: 80px;
		height: 850px;
	}
	
	.Description span.contents {
		/*width: 100%;*/
		max-width: 200px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: left;
	}
	
	.enclosure ul {
		position: absolute;
		top: 3px;
	}
	
	.enclosure ul {
		list-style: none;
		height: auto;
		/*max-width:250px;*/
		/*max-width:auto;*/
	}
	
	.enclosure ul.into_enclosure {
		max-width: auto;
	}
	
	.enclosure ul li {
		height: auto;
		/*margin-top: 10px;*/
		margin-bottom: 10px;
		margin-left: 43px;
		max-width: 100%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: left;
	}
	
	.enclosure ul li.into_Details {
		height: auto;
		max-width: 100%;
		margin-bottom: 10px;
		text-align: left;
		/*background: red;*/
	}
	
	.enclosure ul li a {
		box-sizing: border-box;
	}
</style>
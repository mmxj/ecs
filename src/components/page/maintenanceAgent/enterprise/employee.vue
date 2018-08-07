<style scoped="scoped">
	.widget-panel-modal i {
		font-size: 30px;
		padding: 15px;
		background: rgba(255, 255, 255, 0.2);
		position: absolute;
		right: 0px;
		bottom: 0px;
		top: 0px;
		line-height: 20px;
	}
	
	#viewImport .text-danger {
		margin: 0;
	}
	.employee_wrap{
		position: absolute;
		overflow-y: auto;
		/*width: 100%;*/
		left: 10px;
		right: 10px;
		top: 10px;
		bottom: 0px;
		
	}
</style>
<template>
				<div class="employee_wrap">
					<!--员工列表视图——开始-->
					<div id="divDataTableView" style="margin-bottom: 0;" class="Org-box m-page table-responsive">
						<div class="row">
							<div class="col-lg-12">
								<span class="size20 font-bold">员工管理</span>
							</div>
						</div>
						<hr class="divider mb-10 mt-10">
						<div class="row">
							<div class="col-lg-12">
								<span class="OrgTopAligin OperatorInsert">
                                    <button id="btnAddCompanyUser" type="button" class="btn btn-default" v-on:click="btnAddCompanyUser()">
                                        <i class="fa fa-plus m-r-5"></i>新增员工
                                    </button>
                                </span>
								<span class="OrgTopAligin OperatorImports"><!--OperatorImports-->
                                    <button id="UserImport" type="button" class="btn btn-default" v-on:click="UserImport()">
                                    			批量导入
                                    </button>
                                </span>
								<span class="OperatorSearch">
                               		 <span class="OrgTopAligin">
                                    	<input id="txtQueryKeywords" type="text" class="form-control w-128" placeholder="工号/姓名/部门">
                               		 </span>
									<span class="OrgTopAligin">
	                                    <button id="btnQuery" type="button" class="btn btn-default" v-on:click="btnQuery()">
	                                        <i class="fa fa-search m-r-5"></i>查找
	                                    </button>
	                                </span>
								</span>
							</div>
						</div>
						<table id="example3" class="table table-striped table-bordered" width="100%">
							<thead>
								<tr>
									<th>序号</th>
									<th>工号</th>
									<th>姓名</th>
									<th>手机号码</th>
									<th>入职时间</th>
									<th>部门</th>
									<th>职位</th>
									<th>状态</th>
									<th style="min-width: 70px;">操作</th>
								</tr>
							</thead>
						</table>
						<loading v-if="noData"></loading>
					</div>
					<!--员工列表视图——结束-->
					<!--员工导入视图——开始-->
					<div id="divImportCompanyUser" class="org-box table-responsive" style="display: none">
						<div class="row">
							<div class="col-md-6">
								<span class="ContentTitle size20 font-bold"></span>
							</div>
						</div>
						<hr class="divider mb-10 mt-10">
						<div class="row">
							<div class="col-md-12">
								<div id="fileBox">
									<div class="alert alert-info alert-dismissable">
										<strong>导入说明</strong> 1、先下载员工导入模板，在对应列填上相应数据。注意，文件大小请勿超过2MB,员工导入条数不超过100条。
										<label class="label label-info p-8">
                                            <a class="text-white" href="../../../../static/doc/员工导入模板.xlsx" target="_blank">下载员工导入模版</a>
                                        </label>
									</div>
								</div>
								<div class="">
									<div id="fileBox1"></div>
								</div>
								<div class="mt-20">
									<div class="form-group">
										<div class="bg-white">
											<table id="viewImport" class="table table-striped table-bordered" width="100%">
												<thead>
													<tr>
														 <th>序号</th>
		                                                <th>姓名</th>
		                                                <th>性别</th>
		                                                <th>入职时间</th>
		                                                <th>手机号码</th>
		                                                <th>工作电话</th>
		                                                <th>电子邮箱</th>
		                                                <th>备注</th>
		                                                <th>验证结果</th>
													</tr>
												</thead>
											</table>
										</div>
									</div>
								</div>

								<div class="content-box-footer-import">
									<div class="form-group">
										<button type="button" class="btnReturn btn btn-white pull-left" v-on:click="btnReturn()">取消</button>
										<button id="btnSaveTemplateData" type="submit" class="btn btn-default pull-left loading_btn" v-on:click="btnSaveTemplateData()" data-loading-text="保存中...">保存</button>
									</div>
								</div>

							</div>
						</div>
					</div>
					<!--员工导入视图——结束-->
					<!--员工添加视图——开始-->
					<div id="divAddCompanyUser" class="org-box table-responsive" style="display: none">
						<div class="row">
							<div class="col-md-6">
								<span class="ContentTitle size20 font-bold"></span>
							</div>
							<div class="col-md-6">
								<button type="button" class="btnReturn btn btn-white pull-right" v-on:click="btnReturn()"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
							</div>
						</div>
						<hr class="divider mb-10 mt-10">
						<div class="row">
							<div id="verifyCheckUser">
								<div class="col-md-12">
									<div class="form-horizontal content-box">
										<div class="form-group">
											<label class="content-title-left"><em class="ak_required_em">*</em>姓名</label>
											<div class="col-lg-2 col-xs-3">
												<span class="valid-form-group">
                                                    <label class="focus valid"></label>
                                                </span>
												<input id="txtChineseName" type="text" maxlength="10" class="form-control required" data-valid="isNonEmpty||isZhEnNum" data-error="姓名不能为空||必须由2-10位的中文、数字或字母组成" placeholder="请输入姓名" />
												<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
												<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
											</div>
											<div class="col-lg-1 col-xs-2">
												<label class="content-title-left pull-right">英文名</label>
											</div>
											<div class="col-lg-2 col-xs-3">
												<input id="txtEnglishName" type="text" maxlength="12" class="form-control" placeholder="请输入英文名" />
											</div>
										</div>
										<div class="form-group">
											<label class="content-title-left"><em class="ak_required_em">*</em>性别</label>
											<div class="col-lg-5 col-xs-8">
												<div class="radio radio-custom radio-inline">
													<input type="radio" name="radioGender" value="1" id="radioGender1" checked>
													<label for="radioGender1">
                                                        男
                                                    </label>
												</div>
												<div class="radio radio-primary radio-inline">
													<input type="radio" name="radioGender" value="0" id="radioGender2">
													<label for="radioGender2">
                                                        女
                                                    </label>
												</div>
												<div class="radio radio-inline">
													<input type="radio" name="radioGender" value="2" id="radioGender3">
													<label for="radioGender3">
                                                        保密
                                                    </label>
												</div>
											</div>
										</div>
									</div>
									<div class="form-horizontal content-box">
										<div v-show="isAdd" class="form-group">
											<label class="content-title-left">
					                                    <em class="ak_required_em">*</em>账号角色
			                                </label>
											<div class="col-lg-5  col-xs-8">
												<span class="valid-form-group">
					                                <label id="lblNameMag2" class="focus valid select_tips"></label>
					                           	</span>
												<select id="selAccountType2" v-model='addAcountRoleId' class="form-control selectpicker" data-style="btn-white">
													<!--<option value="">账号角色</option>-->
													<option v-for="item in roleLists" :value="item.RoleId">{{item.RoleName}}</option>
												</select>
												<span class="ie8 ion-close-circled close hide text-danger valid-input-icon"></span>
												<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
											</div>
										</div>
										<div class="form-group">
											<label class="content-title-left">部门</label>
											<div class="col-lg-5 col-xs-8">
												<select-department></select-department>
											</div>
										</div>
										<div class="form-group">
											<label class="content-title-left">职位</label>
											<div class="col-lg-5 col-xs-8">
												<span class="input-group">
                                                    <input id="txtPositionName" type="text" maxlength="100" class="form-control" placeholder="请选择职位"  data-valid="isNonEmpty" data-error="职位不能为空" disabled="disabled" />
                                                    <span class="input-group-addon cursor" v-on:click="getPosition()"><span class="fa fa-bars"></span></span>
												<input type="hidden" id="hidPositionId" value="" />
												</span>
											</div>

										</div>
										<div class="form-group">
											<label class="content-title-left">直接上司/主管</label>
											<div class="col-lg-5 col-xs-8">
												<select-direct-supervisor></select-direct-supervisor>
											</div>
										</div>
										<div class="form-group">
											<label class="content-title-left">汇报人</label>
											<div class="col-lg-5 col-xs-8">
												<select-report></select-report>
											</div>
										</div>
										<div class="form-group">
											<label class="content-title-left"><em class="ak_required_em">*</em>入职时间</label>
											<div class="col-lg-5 col-xs-8">
												<span class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                                    <input id="txtJoinDate" class="form-control required" size="16" type="text" value="" readonly placeholder="请选择入职时间" data-valid="isNonEmpty" data-error="入职时间不能为空" disabled="disabled">
                                                    <div style="position: absolute;">
                                                        <span class="valid-form-group-addon">
                                                            <label class="focus valid"></label>
                                                        </span>
											</div>
											<span class="valid-form-icon">
                                                        <span class="ion-close-circled close hide text-danger valid-error"></span>
											<label class="fa fa-check-circle blank hide text-success valid-success"></label>
											</span>
											<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
											</span>
											<input type="hidden" id="dtp_input1" value="" />
										</div>
									</div>
								</div>
								<div class="form-horizontal content-box">
									<div class="form-group">
										<label class="content-title-left"><em class="ak_required_em">*</em>员工身份</label>
										<div class="col-lg-5 col-xs-8">
											<div class="radio radio-custom radio-inline">
												<input type="radio" name="radioIdentityState" value="0" id="radioIdentityState1" checked>
												<label for="radioIdentityState1">
                                                        普通员工
                                                    </label>
											</div>
											<div class="radio radio-primary radio-inline">
												<input type="radio" name="radioIdentityState" value="1" id="radioIdentityState2">
												<label for="radioIdentityState2">
                                                        上级/主管/负责人
                                                    </label>
											</div>
										</div>
									</div>
								</div>
								<div class="form-horizontal content-box">
									<div class="form-group">
										<label class="content-title-left"><em class="ak_required_em">*</em>工作手机：</label>
										<div class="col-lg-2 col-xs-3">
											<span class="valid-form-group">
                                                    <label class="focus valid"></label>
                                                </span>
											<input id="txtWorkMobile1" type="text" maxlength="11" class="form-control required" data-valid="isNonEmpty||isPhone" data-error="手机号码不能为空||手机号码格式不正确" placeholder="请输入工作手机号码" />
											<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
											<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
										</div>
										<div class="col-lg-1 col-xs-2">
											<label class="content-title-left">工作电话</label>
										</div>
										<div class="col-lg-2 col-xs-3">
											<input id="txtWorkPhone" type="text" maxlength="12" class="form-control" placeholder="请输入工作电话" />
										</div>
									</div>
									<div class="form-group">
										<label class="content-title-left">电子邮箱</label>
										<div class="col-lg-5 col-xs-8">
											<input id="txtWorkEmail" type="text" maxlength="100" class="form-control" placeholder="请输入电子邮箱" />
										</div>
									</div>
								</div>
								<div class="form-horizontal content-box">
									<div class="form-group">
										<label class="content-title-left"><em class="ak_required_em">*</em>状态</label>
										<div class="col-lg-5 col-xs-8">
											<div class="radio radio-custom radio-inline">
												<input type="radio" name="radioIsQuit" value="0" id="radioIsQuit1" checked>
												<label for="radioIsQuit1">
                                                        在职
                                                    </label>
											</div>

											<div class="radio radio-primary radio-inline">
												<input type="radio" name="radioIsQuit" value="1" id="radioIsQuit2">
												<label for="radioIsQuit2">
                                                        离职
                                                    </label>
											</div>
										</div>

									</div>
								</div>
								<div class="form-horizontal content-box">
									<div class="form-group">
										<label class="content-title-left">备注</label>
										<div class="col-lg-5 col-xs-8">
											<textarea id="txtRemark" maxlength="100" class="form-control" placeholder="请输入备注信息"></textarea>
										</div>
									</div>
								</div>
								<div class="content-box-footer">
									<div class="form-group">
										<label class="content-title-left"></label>
										<div class="col-lg-5 col-xs-8 pl-22">
											<button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="btnReturn()">取消</button>
											<button id="btnAddEdit" type="submit" class="btn btn-default pull-left loading_btn" data="" v-on:click="btnAddEdit()" data-loading-text="保存中...">
                                                    确定
                                                </button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				
				
				
				
				
			<div id="modal-cleosAccount" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true" style="display: none;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="win-close" data-dismiss="modal">×</button>
				<button id="btnSaveAccount" type="button" class="sava loading_btn" v-on:click="btnSaveAccount()" data-loading-text="保存中..."><i class='fa fa-save m-r-5'></i>保存</button>
				<h4 class="modal-title">创建员工账号</h4>
			</div>
			<div id="verifyCheckAccount">
				<!--添加帐号登录-->
				<div class="modal-body">
					<div class="row">
						<div class="col-lg-12">
							<div class="form-horizontal content-box">
								<div class="form-group">
									<label class="content-title-left"><em class="ak_required_em">*</em>账号</label>
									<div class="col-xs-9">
										<span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
										<input id="txtMobile" type="text" maxlength="11" disabled="disabled" class="form-control required" data-valid="isNonEmpty||isPhone" data-error="账号不能为空||账号格式不正确" placeholder="手机号码" />
										<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
										<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left"><em class="ak_required_em">*</em>用户名</label>
									<div class="col-xs-9">
										<span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
										<input id="txtUserName" type="text" disabled="disabled" maxlength="100" class="form-control required" data-valid="isNonEmpty" data-error="用户名不能为空" placeholder="用户名" />
										<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
										<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left"><em class="ak_required_em">*</em>账号角色</label>
									<div class="col-xs-9">
										<span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
										<el-select v-model="RoleId" placeholder="账号角色">
											<el-option v-for="(item, index) in roleLists"  :label="item.RoleName" :value="item.RoleId">
											</el-option>
										</el-select>
										<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
										<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left"><em class="ak_required_em">*</em>密码</label>
									<div class="col-xs-9">
										<span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
										<input id="txtPassword" type="password" maxlength="25" class="form-control required" data-valid="isNonEmpty||between:6-25" data-error="密码不能为空||密码长度6-25位" placeholder="***" />
										<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
										<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left"><em class="ak_required_em">*</em>确认密码</label>
									<div class="col-xs-9">
										<span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
										<input id="txtPasswordtwo" type="password" maxlength="25" class="form-control required" data-valid="isNonEmpty||isRepeat:txtPassword" data-error="确认密码不能为空||两次密码不一致" placeholder="***" />
										<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
										<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--添加帐号登录-->
			</div>
		</div>
	</div>
	<div id="modal-cleosPositions" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true" style="display: none;">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="win-close" data-dismiss="modal">×</button>
				<button id="btnSavePositions" type="button" class="sava" data-dismiss="modal" aria-hidden="true" v-on:click="isChecked()"><i class='fa fa-save m-r-5'></i>确定</button>
				<h4 class="modal-title">选择职位</h4>
			</div>
			<div>
				<div class="modal-body nicescroll">
					<div id="isPostion" class="row pt-10">
						<div class="col-lg-6" v-for="item in PositionsItem">
							<div class="widget-panel-modal user-box b-1">
								<div class="checkbox checkbox-info checkbox-circle pd">
									<input v-bind:id="item.PositionId" type="checkbox" name="cboxPostion" v-bind:value="item.PositionTitle">
									<label v-bind:for="item.PositionId">
                                            {{item.PositionTitle}}
                                        </label>
								</div>
								<div class="contact-action-i">
									<span v-on:click="btnDelPosition(item.PositionId)"><i class="fa fa-trash-o text-danger"></i></span>
								</div>
							</div>
						</div>

						<div class="col-lg-6">
							<div id="addPostionView" class="widget-panel user-box b-1 cursor" v-on:click="divPostionAdd()">
								<h4 class="m-0 text-grey"><span data-plugin="counterup">新增职位</span></h4>
								<h2 class="m-0 text-dark"><i class="fa fa-plus text-grey"></i></h2>
							</div>
							<div id="editPostionView" class="widget-panel-modal user-box b-1" style="display: none">
								<span class="OrgTopAligin">
                                        <input id="addPostionName" type="text" maxlength="12" data-valid="isNonEmpty" data-error="职位不能为空" placeholder="请输入职位名称" class="form-control wid required">
                                    </span>
								<span class="OrgTopAligin">
                                        <button type="button" class="btn btn-default loading_btn" v-on:click="divPostionSava()" data-loading-text="保存中...">保存</button>
                                    </span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>	
				
				
				
				
				
				
				
			</div>
	
</template>
<script>
	import selectDepartment from '../../../common/select-department.vue';
	import selectDirectSupervisor from '../../../common/direct-supervisor.vue';
	import selectReport from '../../../common/select-report.vue';
	var table = '';
	var EmployeeId = '';
	var btn = '';
	export default {
		data() {
			return {
				RoleId: '',
				roleLists: [],
				saveImportData: [],
				errorSign: 0,
				PositionsItem: [],
				DepartmentName: '',
				DepartmentId: '',
				PositionName: '',
				PositionId: [{ "PositionId": "", "PositionTitle": "" }],
				noData:true,
				addAcountRoleId:'',
				isAdd:false
			}
		},
		components: {
			selectDepartment,
			selectDirectSupervisor,
			selectReport
		},
		methods: {
			getRoleLists() {
				var _this = this;
				//获取角色信息
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"CompanyId": eosCommon.storage.get('CompanyId'), //公司id，必填                                   
						"Keywords": ''
					}
				};
				var url = eosCommon.COMMON_API + "api/role/queryrole";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						_this.roleLists = result.Data.Result;
						_this.RoleId = _this.roleLists[1].RoleId;
						_this.addAcountRoleId=_this.roleLists[0].RoleId;
						_this.$nextTick(function() {
							$("#selAccountType2").selectpicker('refresh');
						})
					}
				})
			},
			load_TableView() {
				var _this = this;
				let col=[1, 2, 3, 4, 5, 6, 7];
				$('#txtQueryKeywords').bind('keypress', function(event) {
					if(event.keyCode == "13") {
						table.ajax.reload();
					}
				});
				table = $('#example3').DataTable({
					pagingType: "full_numbers",
					deferRender: true,
					dom: "Bfrtip",
					buttons: [eosCommon.getPrintOptions(col)],
					responsive: !0,
					serverSide: true,
					ajax(data, callback, settings) {
						_this.noData=true;
						var param = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"PageSize": data.length,
							"PageIndex": (data.start / data.length) + 1,
							"Parameters": {
								"Keywords": $('#txtQueryKeywords').val().trim(),
								"Id": "",
								"JoinDateStart": "",
								"JoinDateEnd": ""
							}
						};
						var url = eosCommon.COMMON_API + "api/employee/query";
						eosCommon.eosAjax(url, "GET", param, "json", function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								var returnData = {};
								if(result.Data == "") {
									returnData.draw = data.draw;
									returnData.recordsTotal = 0;
									returnData.recordsFiltered = 0;
									returnData.data = [];
								} else {
									returnData.draw = data.draw;
									returnData.recordsTotal = result.Data.Total;
									returnData.recordsFiltered = result.Data.Total;
									returnData.data = result.Data.Result;
								}
								_this.noData=false;								
								callback(returnData);
								eosCommon.eosOperators(eosCommon.eosOperDataHandle());
							}
						});
					},
					"columns": [
						{ defaultContent: "" },
						{ data: "EmployeeNo" },
						{ data: "ChineseName" },
						{ data: "WorkMobile" },
						{ data: "JoinDate" },
						{ data: "DepartmentName" },
						{ data: "Positions" },
						{ data: "IsQuit" },
						{ data: "AccountFlag" }
					],
					"columnDefs": [{
							"targets": [7],
							"render"(data) {
								var html = '';
								if(data == 0) {
									html = "在职"
								} else if(data == 1) {
									html = "离职"
								}
								return html
							}
						},
						{
							"targets": [8],
							"render"(data) {
								var html = '';
								if(data == 0) {
									html = "<span class='OperatorBtnView OperatorInsert pull-left' data='1' title='创建员工帐号'><i class='fa fa-cog'></i></span>";
								}
								html += "<span class='OperatorBtnDel OperatorDel pull-right' data='3' title='删除员工'><i class='fa fa-trash-o'></i></span>";
								html += "<span class='OperatorBtnEdit OperatorEdit pull-right text-left' data='2' title='修改员工信息'><i class='fa fa-pencil'></i></span>";
								return html
							}
						}
					]
				});
				table.on('draw.dt', function() {
					table.column(0, {
						search: 'applied',
						order: 'applied'
					}).nodes().each(function(cell, i) {
						i = i + 1;
						var page = table.page.info();
						var pageno = page.page;
						var length = page.length;
						var columnIndex = (i + pageno * length);
						cell.innerHTML = columnIndex;
					});
				});
				$('#example3 tbody').on('click', 'tr', function() {
					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					} else {
						table.$('tr.selected').removeClass('selected');
						$(this).addClass('selected');
					}
				});
				$('#example3 tbody').on('click', 'span', function() {
					var data = table.rows($(this).parents('tr')).data();
					var isNum = $(this).attr("data");
					if(isNum == "1") {
						//创建登录账号 函数
						EmployeeId = data[0].EmployeeId;
						$('#txtMobile').val(data[0].WorkMobile);
						$('#txtUserName').val(data[0].ChineseName);
						$('#txtPassword').val('');
						$('#txtPasswordtwo').val('');
						$("#modal-cleosAccount").modal("show");
					} else if(isNum == "2") {
						//编辑信息赋值 函数
						EmployeeId = data[0].EmployeeId;
						$('#btnAddEdit').attr("data", "2");
						$('.ContentTitle').text("修改员工");
						$('#divAddCompanyUser').show();
						$("#divDataTableView").hide();
						$("#divImportCompanyUser").hide();
						_this.bind_AddEdit(data);
					} else if(isNum == "3") {
						//删除信息赋值 函数3
						EmployeeId = data[0].EmployeeId;
						vdialog({
							type: 'confirm',
							title: '提示',
							content: eosCommon.DELETE_MSG_ASK,
							ok() { _this.delRequest(); },
							cancel: true,
							modal: true
						});
					}
				});
			},
			btnQuery() {
				table.ajax.reload();
			},
			addRequest() {
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"ChineseName": $('#txtChineseName').val(), //必填
						"EnglishName": $('#txtEnglishName').val(),
						"Gender": $('input:radio[name="radioGender"]:checked').val(), //必填
						"CompanyId": eosCommon.storage.get("CompanyId"), //必填
						"DepartmentId": $('#hidDepartmentId').val(),
						"Positions": JSON.parse($('#hidPositionId').val()),
						"DirectSupervisor": $('#hidDirectSupervisorId').val(),
						"ReportTo": $('#hidReportToId').val(),
						"WorkSite": "",
						"JoinDate": $('#txtJoinDate').val(), //必填
						"IdentityState": $('input:radio[name="radioIdentityState"]:checked').val(), //必填
						"WorkPhone": $('#txtWorkPhone').val(),
						"WorkMobile": $('#txtWorkMobile1').val(), //必填
						"WorkEmail": $('#txtWorkEmail').val(),
						"IsLocked": 0, //必填
						"IsActive": 1, //必填
						"IsQuit": $('input:radio[name="radioIsQuit"]:checked').val(), //必填
						"Remark": $('#txtRemark').val(),
						"RoleId":_this.addAcountRoleId
					}
				};

				var url = eosCommon.COMMON_API + "api/employee/insert";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
						table.ajax.reload();
						_this.btnReturn();
						$(".loading_btn").button('reset');
					}
				});
			},
			editRequest() {
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"EmployeeId": EmployeeId,
						"ChineseName": $('#txtChineseName').val(), //必填
						"EnglishName": $('#txtEnglishName').val(),
						"Gender": $('input:radio[name="radioGender"]:checked').val(), //必填
						"DepartmentId": $('#hidDepartmentId').val(),
						"Positions": JSON.parse($('#hidPositionId').val()),
						"DirectSupervisor": $('#hidDirectSupervisorId').val(),
						"ReportTo": $('#hidReportToId').val(),
						"WorkSite": "",
						"JoinDate": $('#txtJoinDate').val(), //必填
						"IdentityState": $('input:radio[name="radioIdentityState"]:checked').val(), //必填
						"WorkPhone": $('#txtWorkPhone').val(),
						"WorkMobile": $('#txtWorkMobile1').val(), //必填
						"WorkEmail": $('#txtWorkEmail').val(),
						"IsLocked": 0, //必填
						"IsActive": 1, //必填
						"IsQuit": $('input:radio[name="radioIsQuit"]:checked').val(), //必填
						"Remark": $('#txtRemark').val()
					}
				};
				var url = eosCommon.COMMON_API + "api/employee/update";
				eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
						table.ajax.reload();
						_this.btnReturn();
						$(".loading_btn").button('reset');
					}
				});
			},
			delRequest() {
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"EmployeeId": EmployeeId
					}
				};
				var url = eosCommon.COMMON_API + "api/employee/delete";
				eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
						table.ajax.reload();
					}
				});
			},
			btnAddEdit() {
				var isNum = $("#btnAddEdit").attr("data");
				if(isNum == "1") {
					//添加员工
					if(!verifyCheck._click("verifyCheckUser")) {
						return false;
					} else {
						btn = $(".loading_btn").button('loading');
						this.addRequest();
					}
				} else if(isNum == "2") {
					//编辑员工
					if(!verifyCheck._click("verifyCheckUser")) {
						return false;
					} else {
						btn = $(".loading_btn").button('loading');
						this.editRequest();
					}
				}
			},
			btnAddCompanyUser() {
				$('#btnAddEdit').attr("data", "1");
				$('.ContentTitle').text("新增员工");
				$('#divAddCompanyUser').show();
				$("#divDataTableView").hide();
				$("#divImportCompanyUser").hide();
				this.addAcountRoleId=this.roleLists[0].RoleId;
				this.$nextTick(function() {
					$("#selAccountType2").selectpicker('refresh');
				})
				this.bind_AddEdit(null);
				//this.isAdd=true;
			},
			bind_AddEdit(data) {
				eosCommon.resetFrom();
				
				if(data == null) {
					var _this = this;
					this.isAdd=true;
					$('#txtChineseName').val("");
					$('#txtEnglishName').val("");
					$("input[type='radio'][name='radioGender'][value='1']").prop("checked", "checked");
					this.DepartmentName = '';
					this.DepartmentId = '';
					$('#txtDepartmentName').val(this.DepartmentName);
					$('#hidDepartmentId').val(this.DepartmentId);
					this.PositionName = '';
					this.PositionId = [{ "PositionId": "", "PositionTitle": "" }];
					$('#txtPositionName').val(this.PositionName);
					$('#hidPositionId').val(JSON.stringify(this.PositionId));
					$('#txtDirectSupervisorName').val("");
					$('#hidDirectSupervisorId').val("");
					$('#txtReportToName').val("");
					$('#hidReportToId').val("");
					$("input[type='radio'][name='radioIdentityState'][value='0']").prop("checked", "checked");
					$('#txtWorkPhone').val("");
					$('#txtWorkMobile1').val("");
					$('#txtWorkEmail').val("");
					$("input[type='radio'][name='radioIsQuit'][value='0']").prop("checked", "checked");
					$('#txtRemark').val("");
				} else {					
					this.isAdd=false;
					$('#txtChineseName').val(data[0].ChineseName);
					$('#txtEnglishName').val(data[0].EnglishName);
					$("input[type='radio'][name='radioGender'][value='" + data[0].Gender + "']").prop("checked", "checked");

					this.DepartmentName = data[0].DepartmentName;
					this.DepartmentId = data[0].DepartmentId;
					$('#txtDepartmentName').val(data[0].DepartmentName);
					$('#hidDepartmentId').val(data[0].DepartmentId);

					this.PositionName = data[0].Positions;
					this.PositionId = data[0].PositionIds;
					$('#txtPositionName').val(data[0].Positions);
					$('#hidPositionId').val(JSON.stringify(data[0].PositionIds));

					$('#txtDirectSupervisorName').val(data[0].DirectSupervisorName);
					$('#hidDirectSupervisorId').val(data[0].DirectSupervisor);
					$('#txtReportToName').val(data[0].ReportToName);
					$('#hidReportToId').val(data[0].ReportTo);
					$('#txtJoinDate').val(data[0].JoinDate);
					$("input[type='radio'][name='radioIdentityState'][value='" + data[0].IdentityState + "']").prop("checked", "checked");
					$('#txtWorkPhone').val(data[0].WorkPhone);
					$('#txtWorkMobile1').val(data[0].WorkMobile);
					$('#txtWorkEmail').val(data[0].WorkEmail);
					$("input[type='radio'][name='radioIsQuit'][value='" + data[0].IsQuit + "']").prop("checked", "checked");
					$('#txtRemark').val(data[0].Remark);
				}
			},
			btnReturn() {
				$("#divDataTableView").show();
				$("#divAddCompanyUser").hide();
				$("#divImportCompanyUser").hide();
			},
			UserImport() {
				var _this = this;
				$('.ContentTitle').text("批量导入员工");
				$("#divDataTableView").hide();
				$("#divAddCompanyUser").hide();
				$("#divImportCompanyUser").show();
				$("#fileBox1").empty();
				$("#fileBox1").html(
					'<div id="fileDnd1" class="uploader_box1 eos_uploader_box">' +
					'<div class="wu-example">' +
					'<div class="uploader-list"></div>' +
					'<div class="btns">' +
					'<div id="picker">选择上传文件</div>' +
					'</div>' +
					'</div>' +
					'</div>'
				);
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken")
				};
				eosCommon.eosUploaderFile({
					'uploaderObj': 'uploaderFile',
					'uploaderBox': '.uploader_box1',
					'uploaderList': '.uploader-list',
					'initBtn': '#picker',
					'serverUrl': eosCommon.ENTERPRISE_API + "api/upload/employee",
					'data': param,
					'fileNumLimit': 1,
					'upType': 1,
					'succ'(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							var viewImportData = [];
							_this.saveImportData = [];
							_this.errorSign = 0;
							for(var i = 0; i < result.Data.TotalRows; i++) {
								var viewTemp = {};
								viewTemp.RowId = result.Data.UploadData[i]['序号'];
								viewTemp.ChineseName = result.Data.UploadData[i]['姓名'];
								viewTemp.Mobile = result.Data.UploadData[i]['手机号码'];
								viewTemp.Gender= result.Data.UploadData[i]['性别'];
                                viewTemp.JoinDate = result.Data.UploadData[i]['入职时间'];
                                viewTemp.WorkPhone= result.Data.UploadData[i]['工作电话'];
                                viewTemp.Email= result.Data.UploadData[i]['电子邮箱'];
                                viewTemp.Remark = result.Data.UploadData[i]['备注'];
								viewTemp.Message = '正确';
								var bol = 0;
								for(var j = 0; j < result.Data.ErrorRows; j++) {
									if(result.Data.ErrorMessage[j]['RowId'] == result.Data.UploadData[i]['序号']) {
										_this.errorSign++;
										bol = 1;
										viewTemp.Message = result.Data.ErrorMessage[j]['Message'];
									}
								}
								viewImportData.push(viewTemp);
								if(bol == 1) {
									continue;
								}
								var saveTemp = {};
								saveTemp.RowId = result.Data.UploadData[i]['序号'];
								saveTemp.ChineseName = result.Data.UploadData[i]['姓名'];
								saveTemp.Mobile = result.Data.UploadData[i]['手机号码'];
								 saveTemp.Gender= result.Data.UploadData[i]['性别'];
                                saveTemp.JoinDate = result.Data.UploadData[i]['入职时间'];
                                saveTemp.WorkPhone= result.Data.UploadData[i]['工作电话'];
                                saveTemp.Email= result.Data.UploadData[i]['电子邮箱'];
                                saveTemp.Remark = result.Data.UploadData[i]['备注'];
								_this.saveImportData.push(saveTemp);
							}
							_this.bindEosBaseDveImport(viewImportData);
						}
					},
					'del'(result) {
						var viewImportData = [];
						_this.saveImportData = [];
						_this.errorSign = 0;
						_this.bindEosBaseDveImport(viewImportData);
					}
				})
			},
			bindEosBaseDveImport(viewImportData) {
				var viewImport = $('#viewImport').DataTable({
					pagingType: "full_numbers",
					processing: true,
					deferRender: true,
					dom: "Bfrtip",
					buttons: [],
					responsive: !0,
					lengthMenu: [
						[50, 100, 150, -1],
						[50, 100, 150, "All"]
					],
					destroy: true,
					data: viewImportData,
					"columns": [
						{ data: "RowId" },
						{ data: "ChineseName" },
						 {data: "Gender"},
                        {data: "JoinDate"},
                         {data: "Mobile"},
                        {data: "WorkPhone"},
                        {data: "Email"},
                        {data: "Remark"},                       
                        {data: "Message"}

					],
					"columnDefs": [{
						"targets": [8],
						"render"(data) {
							var html = '';
							if(data == "正确") {
								html = "正确";
							} else {
								html = "<p class='text-danger'>" + data + "</p>";
							}
							return html
						}
					}]
				});

				$('#viewImport tbody').on('click', 'tr', function() {
					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					} else {
						viewImport.$('tr.selected').removeClass('selected');
						$(this).addClass('selected');
					}
				});
			},
			btnSaveTemplateData() {
				var _this = this;
				if(_this.saveImportData.length <= 0) {
					vdialog({
						type: 'error',
						title: '提示',
						content: '批量导入中没有正确的数据可导入',
						cancel: true,
						modal: true
					});
				} else if(_this.errorSign > 0 && _this.saveImportData.length > 0) {
					vdialog({
						type: 'error',
						title: '提示',
						content: '验证结果：' + _this.errorSign + '条错误，' + _this.saveImportData.length + '条正确，确定继续提交正确的数据吗？',
						ok() { _this.saveImport(); },
						cancel: true,
						modal: true
					});
				} else {
					_this.saveImport();
				}
			},
			saveImport() {
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": _this.saveImportData
				};
				var url = eosCommon.COMMON_API + "api/employee/batch";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
						table.ajax.reload();
						_this.saveImportData = [];
						_this.errorSign = 0;
						_this.bindEosBaseDveImport(_this.saveImportData);
						_this.btnReturn();
						$(".loading_btn").button('reset');
					}
				});
			},
			btnSaveAccount() {
				//添加员工帐号
				if(!verifyCheck._click("verifyCheckAccount")) {
					return false;
				} else {
					btn = $(".loading_btn").button('loading');
					this.saveEmployeeAccount();
				}
			},
			saveEmployeeAccount() {
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"EmployeeId": EmployeeId,
						"Mobile": $('#txtMobile').val(),
						"UserName": $('#txtUserName').val(),
						"Password": $('#txtPassword').val(),
						"RoleId": this.RoleId
					}
				};
				var url = eosCommon.COMMON_API + "api/employee/account";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", "创建成功");
						$("#modal-cleosAccount").modal("hide");
						table.ajax.reload();
						$(".loading_btn").button('reset');
					}
				});
			},
			get_Department() {
				if(tempDepartment != null || tempDepartment != '') {
					if(this.DepartmentId != tempDepartment.DepartmentId) {
						this.PositionName = '';
						this.PositionId = [{ "PositionId": "", "PositionTitle": "" }];
						$('#txtPositionName').val(this.PositionName);
						$('#hidPositionId').val(JSON.stringify(this.PositionId));
					}
					this.DepartmentName = tempDepartment.DepartmentName;
					this.DepartmentId = tempDepartment.DepartmentId;
				} else {
					this.DepartmentName = "";
					this.DepartmentId = "";
					this.PositionName = '';
					this.PositionId = [{ "PositionId": "", "PositionTitle": "" }];
					$('#txtPositionName').val(this.PositionName);
					$('#hidPositionId').val(JSON.stringify(this.PositionId));

				}
			},
			divPostionAdd() {
				$('#addPostionName').val("");
				$("#addPostionView").hide();
				$("#editPostionView").show();
			},
			divPostionSava() {
				$("#addPostionView").show();
				$("#editPostionView").hide();
				if(!verifyCheck._click("editPostionView")) {
					return false;
				} else {
					this.addPositionRequest();
				}
			},
			isChecked() {
				var cboxPositions = [];
				var txtPositionsName = [];
				$('#isPostion input:checkbox[name="cboxPostion"]:checked').each(function() {
					var setPostion = { "PositionId": $(this).attr("id"), "PositionTitle": $(this).val() };
					cboxPositions.push(setPostion);
					txtPositionsName.push($(this).val());
				});
				if(cboxPositions.length == 0) {
					var defPostion = { "PositionId": "", "PositionTitle": "" };
					cboxPositions.push(defPostion);
				}
				$('#hidPositionId').val(JSON.stringify(cboxPositions));
				$('#txtPositionName').val(txtPositionsName);
				$("#modal-cleosPositions").modal("hide");
			},
			getPosition() {
				if($('#hidDepartmentId').val() == "") {
					vdialog({
						type: 'error',
						title: '提示',
						content: '请先选择一个所在部门！',
						ok: true,
						cancel: true,
						modal: true
					});
				} else {
					$("#modal-cleosPositions").modal("show");
					var _this = this;
					var param = {
						"AccessToken": eosCommon.storage.get("AccessToken"),
						"PageSize": 0,
						"PageIndex": 0,
						"Parameters": {
							"DepartmentId": $('#hidDepartmentId').val()
						}
					}
					var url = eosCommon.COMMON_API + "api/employee/queryposition";
					eosCommon.eosAjax(url, "GET", param, "json", function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							if(result.Data == "") {
								_this.PositionsItem = [];
							} else {
								_this.PositionsItem = result.Data.Result;
							}
						}
					});
				}
			},
			btnDelPosition(id) {
				var _this = this;
				vdialog({
					type: 'confirm',
					title: '提示',
					content: eosCommon.DELETE_MSG_ASK,
					ok() { _this.delPositionRequest(id); },
					cancel: true,
					modal: true
				});
			},
			delPositionRequest(id) {
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"PositionId": id
					}
				};
				var url = eosCommon.COMMON_API + "api/employee/deleteposition";
				eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
						_this.getPosition();
					}
				});
			},
			addPositionRequest() {
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"DepartmentId": $('#hidDepartmentId').val(),
						"PositionTitle": $('#addPostionName').val()
					}
				};

				var url = eosCommon.COMMON_API + "api/employee/insertposition";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
						_this.getPosition();
					}
				});
			}
		},
		updated() {
			$("[name=cboxPostion]:checkbox").prop("checked", false);
			if($('#hidPositionId').val() != "") {
				var hidPositions = JSON.parse($('#hidPositionId').val());
				for(var i = 0; i < this.PositionsItem.length; i++) {
					for(var j = 0; j < hidPositions.length; j++) {
						if(hidPositions[j].PositionId == this.PositionsItem[i].PositionId) {
							$("#" + this.PositionsItem[i].PositionId + ":checkbox").prop("checked", true);
							break;
						}
					}
				}
			}
		},

		mounted() {

			this.load_TableView();
			this.getRoleLists();
			verifyCheck({ formId: 'verifyCheckAccount', onBlur: null, onFocus: null, onChange: null, successTip: true, resultTips: null, clearTips: null, code: true, phone: true });
			verifyCheck({ formId: 'verifyCheckUser', onBlur: null, onFocus: null, onChange: null, successTip: true, resultTips: null, clearTips: null, code: true, phone: true });
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());
			$('.form_date').datetimepicker({
				format: 'yyyy-mm-dd',
				weekStart: 1,
				autoclose: true,
				startView: 2,
				minView: 2,
				forceParse: false,
				todayBtn: 1,
				todayHighlight: 1,
				language: 'zh-CN'
			});
			$("#txtJoinDate").change(function() {
				if($("#txtJoinDate").val() != '') {
					$('#txtJoinDate').next('.valid-form-group-addon').find('.focus').html('');
				}
			});
		}
	}
</script>

<template>
	<div>
		<!--员工账户管理列表开始-->
		<div id="divDataTableView" class="card-box m-page table-responsive">
			<div class="row">
				<div class="col-sm-6 col-md-4 col-lg-2">
					<span class="size20 font-bold">账号列表</span>
				</div>
			</div>
			<hr class="divider mb-10 mt-10">
			
			<!--<div v-show="!noData" class="page_content">-->
					<div class="row">
				<div class="col-lg-12">
					<span class="OrgTopAligin OperatorInsert">
                        <button id="btnInsert" type="button" class="btn btn-default" v-on:click="btnInsert()">
                            <i class="fa fa-plus m-r-5"></i>新增
                        </button>
                    </span>
                    <!--<span class="OrgTopAligin">
                        <button id="UserImport" type="button" class="btn btn-default" v-on:click="accountImport()">
                           		 批量导入
                        </button>
                    </span>-->
					<span class="OrgTopAligin">
	                        <select id="selAccountType1" v-model='RoleId' class="form-control selectpicker" data-style="btn-white">	                            
	                            <option value="">账号角色</option>
	                            <option v-for="item in roleLists" :value="item.RoleId">{{item.RoleName}}</option>	                            
	                        </select>
               		 </span>
					<span class="OrgTopAligin">
	                        <select id="selLock" v-model="IsActive" class="form-control selectpicker" data-style="btn-white">
	                            <option value="">是否启用</option>
	                            <option value="0">停用</option>
	                            <option value="1">启用</option>
	                        </select>
               		 </span>
					<span class="OperatorSearch">
               		 <span class="OrgTopAligin">
                        <input id="txtQueryKeywordss" v-model="KeyWords" type="text" class="form-control w-128" placeholder="账号/用户名">
                    </span>
					<span class="OrgTopAligin OperatorSearch">
                        <button id="btnQuery" type="button" class="btn btn-default" v-on:click="btnQuery()">
                            <i class="fa fa-search m-r-5"></i>查找
                        </button>
                    </span>
					</span>
				</div>
			</div>
			<table id="example2" class="table table-striped table-bordered" width="100%">
				<thead>
					<tr>
						<th>序号</th>
						<th>账号</th>
						<th>用户名</th>
						<th>账号角色</th>
						<th>登录次数</th>
						<th>最后登录时间</th>
						<th>是否启用</th>
						<th class="w-80">操作</th>
					</tr>
				</thead>
				<loading v-if="noData"></loading>
			</table>
		<!--</div>-->
			
			
		</div>
		<!--员工账户管理列表结束-->
		<!--<div id="importView" class="org-box table-responsive" style="display: none; margin-bottom: 0px!important;">
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
                                    <strong>导入说明</strong> 1、下载账号导入模板，在对应列填上相应数据。注意，文件大小请勿超过2MB,员工导入条数不超过100条
                                    <span class="label label-info p-8">
                                        <a class="text-white" href="../../../../static/doc/账号导入模板.xlsx" target="_blank">下载账号导入模版</a>
                                    </span>
                                </div>
                            </div>
                            <div class="col-lg-12 space-row-10">
                                <div id="fileBox1"></div>
                            </div>
                            <div class="mt-20">
                                <div class="form-group">
                                    <div class="bg-white">
                                        <table id="viewImport" class="table table-striped table-bordered" width="100%">
                                            <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>用户名</th>
                                                <th>账号</th>
                                                <th>账号角色</th>
                                                <th>密码</th>
                                                <th>是否启用</th>
                                                <th>验证结果</th>
                                            </tr>
                                            </thead>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div class="content-box-footer-import">
                                <div class="form-group">
                                    <button type="button" class="btnReturn btn btn-white pull-left" v-on:click="importReturn()">取消</button>
                                    <button id="btnSaveTemplateData" type="submit" class="btn btn-default waves-effect waves-light pull-left" v-on:click="btnSaveTemplateData()">保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>-->
		<!--添加员工账户管理开始-->
		<div id="divInsertView" class="card-box table-responsive" style="display: none">
			
			<div class="row">
				<div class="col-md-6">
					<label class="size20 font-bold view-title">员工账户管理</label>
				</div>
				<div class="col-md-6">
					<button type="button" class="btnReturn btn btn-white pull-right" v-on:click="btnReturn()"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
				</div>
			</div>
			<hr class="divider mb-10 mt-10">
			<div class="row">
				<div class="col-lg-12">
					<div id="verifyCheckAdd">
						<div class="form-horizontal content-box">
							<div class="form-group" v-show="isAdd">
								<label class="content-title-left">
                                    <em class="ak_required_em">*</em>企业员工
                                </label>

								<div class="col-lg-6 col-xs-8">
                                <select-employee :propsdata="projectLeaderData" title="选择项员工账号"></select-employee>									
									<span class="input-group">										
                                        <input id="projectLeader" v-model="projectLeaderData.name" class="form-control required" type="text" data-valid="isNonEmpty" data-error="企业员工不能为空"  readonly placeholder="请选择企业员工" disabled="disabled">
                                        <div style="position: absolute;" class="select_tips2">
                                            <span class="valid-form-group-addon">
                                                <label class="focus valid"></label>
                                            </span>
										</div>										
										<span class="input-group-addon cursor" data-toggle="modal" data-target="#modal-employee"><span class="fa fa-bars"></span></span>
									</span>
							</div>
						</div>
						<div class="form-group" v-if="isAdd">
							<label class="content-title-left"><em class="ak_required_em">*</em>员工账号</label>
							<div class="col-lg-6 col-xs-8">								
                                    <input id="accunt_num" v-model="projectLeaderData.Mobile" class="form-control required" type="text" data-valid="isNonEmpty" data-error="员工账号不能为空"  readonly placeholder="选择项员工账号" disabled="disabled">
									<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
									<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
							</div>
						</div>
					<div class="form-group" v-if="!isAdd">
						<label class="content-title-left">员工账号:</label>
						<div class="col-lg-6 col-xs-9">
							<p class="form-control-static">{{woker_accunt}}</p>
						</div>
					</div>
					<div class="form-group">
						<label class="content-title-left">
                                    <em class="ak_required_em">*</em>账号角色
                                </label>
						<div class="col-lg-6  col-xs-8">
							<span class="valid-form-group">
                                <label id="lblNameMag2" class="focus valid select_tips"></label>
                           	</span>
							<select id="selAccountType2" v-model='addAcountRoleId' class="form-control selectpicker" data-style="btn-white">
								<option value="">账号角色</option>
								<option v-for="item in roleLists" :value="item.RoleId">{{item.RoleName}}</option>
							</select>
							<span class="ie8 ion-close-circled close hide text-danger valid-input-icon"></span>
							<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
						</div>
					</div>
					<div class="form-group" style="display: none">
						<label class="content-title-left">
                                    <em class="ak_required_em">*</em>用户名
                        </label>
						<div class="col-lg-6 col-xs-8">
							<span class="valid-form-group">
                                        <label id="lblUserMag" class="focus valid"></label>
                            </span>
							<input id="txtAdminName" type="text" maxlength="25" class="form-control" data-valid="isNonEmpty||between:1-25" data-error="用户名不能为空||用户名长度为25位" placeholder="请输入用户名" />
							<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
							<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
						</div>
					</div>

					<div class="form-group">
						<label class="content-title-left">
                                    <em class="ak_required_em">*</em>密码
                        </label>
						<div class="col-lg-6 col-xs-8">
							<span class="valid-form-group">
                                        <label id="lblPasswordMag" class="focus valid"></label>
                            </span>
							<input id="txtPassword" :class="{required:hasPassword}" class="form-control" type="password" maxlength="25" placeholder="***" v-on:blur="blur()" />
							<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
							<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
						</div>
					</div>
					<div class="form-group">
						<label class="content-title-left">
                                    <em class="ak_required_em">*</em>密码确认
                        </label>
						<div class="col-lg-6 col-xs-8">
							<span class="valid-form-group">
                                        <label id="txtPasswordtwo1" class="focus valid"></label>
                            </span>
							<input id="txtPasswordtwo" type="password" maxlength="25" :class="{required:hasPassword}" class="form-control" placeholder="***" data-valid="isNonEmpty||isRepeat:txtPassword" data-error="确认密码不能为空||两次密码不一致" />
							<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
							<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
						</div>
					</div>
				</div>
				<div class="form-horizontal content-box ">
					<div class="form-group">
						<label class="content-title-left">
                                    <em class="ak_required_em">*</em>是否启用
                        </label>
						<div class="col-lg-6 col-xs-8">
							<div class="radio radio-custom radio-inline">
								<input type="radio" name="radioIsLocked" value="1" checked="checked" id="radioIsLocked1">
								<label for="radioIsLocked1">
                                            启用
                                </label>
							</div>
							<div class="radio radio-danger radio-inline">
								<input type="radio" name="radioIsLocked" value="0" id="radioIsLocked0">
								<label for="radioIsLocked0">
                                            停用
                                </label>
							</div>
						</div>
					</div>
				</div>
				<div class="content-box-footer">
					<div class="form-group">
						<label class="content-title-left"></label>
						<div class="col-lg-5 col-xs-8 pl-22">
							<button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="btnReturn()">取消</button>
							<button id="btnAddEdit" type="submit" class="btn btn-default pull-left" data-dismiss="modal" data="" v-on:click="btnAddEdit()">确定</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	</div>
	<!--添加员工账户管理结束-->
	<div id="modal-cleos" class="modal fade" tabindex="-1" role="dialog" data-backdrop='static' aria-labelledby="myModalLabel" aria-hidden="true">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="win-close" data-dismiss="modal">×</button>
				<button :disabled="DetailDataEmpty==0" id="btnSave" type="button" class="sava" data-dismiss="modal" aria-hidden="true" v-on:click="btnSave()"><i class='fa fa-save m-r-5'></i>保存</button>
				<h4 id="ModuleTitle" style="" class="modal-title"></h4>
			</div>
			<div id="verifyCheckset">
				<div id="modal_body3" class="content-box" style="height: 530px;padding-left: 30px;!important; ">
					<div class="row ">
						<!--权限设置开始-->
						<div class="col-sm-12">
							<span class="OrgTopAligin">
			                        <input id="txtQueryKeywords" style="width: 200px;" v-model="searchQuery" type="text" class="form-control w-128" placeholder="项目名称">
	                    	</span>
							<span class="OrgTopAligin">
			                        <button id="btnQuery" type="button" class="btn btn-default" v-on:click="btnQueryProject()">
			                            <i class="fa fa-search m-r-5"></i>查找
			                        </button>
		                    </span>
						</div>
					</div>
					<div class="row content-box" style="padding-left: 10px;!important; padding-right: 10px;!important;">
						
						<div class="row">
							<h3 class="col-lg-5" style="font-size: 16px;margin-bottom: 15px; margin-top: 20px;">可见项目:</h3>
							<span class="col-lg-5 allSelect pull-right" style="margin-top: 20px; margin-bottom: 15px;">
			                        			<label style="margin-left: 5px;" class="pull-right" for="checkbox">全选</label>
			                        			<input v-model='iSelectAll' class="pull-right" type="checkbox" name="" id="checkbox" value="" />                      			
			                        		</span>
							<div class="clearfix">
			
							</div>
						</div>
						<no-data v-show="DetailDataEmpty==0"></no-data>
						<div class="form-horizontal item_lists" v-show="DetailDataEmpty==1">
							<div class=" col-sm-10 visible_list" v-for=" item in filteredData">
								<input type="checkbox" :id="item.ProjectId" :disabled="item.Locked==1" :value="item.ProjectId" v-model="selectedCheck">
								<label :for="item.ProjectId">{{item.ProjectName}}</label>
							</div>
							<div class="clearfix">
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
	import selectEmployee from '../../../common/select-employee.vue';
	let treeNode;
	let nodeNum;
	let table;
	let AccountId;
	export default {
		data() {
			return {
				is_view: 0,
				configs: {},
				operatorsList: {},
				projectLeaderData: {
					isAve:false,
					"id": "",
					"name": "",
					'Mobile': '',
					'UserId': '',
					'flag': '0' // 0表示不需要账号，1表示需要                    
				},
				RoleId: '',
				addAcountRoleId: '',
				IsActive: '',
				KeyWords: '',
				roleLists: [],
				txtAccounts: '',
				txtPassword: '',
				txtPasswordtwo: '',
				txtAdminName: '',
				picked: '',
				hasPassword: false,
				checkedNames: [],
				selectedCheck: [],
				woker_accunt: '',
				isAdd: true,
				searchQuery: '',
				iSelectAll:false,
				noData:true
			}
		},
		components: {
			selectEmployee
		},
		create(){
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());			
		},
		created() {
			this.load_table();			
		},
		methods: {			
			btnReturn() {
				$("#divDataTableView").show();
				$('#divInsertView').hide();
				this.addAcountRoleId = '';
				$("#selAccountType2").selectpicker('refresh');
			},
			btnQuery() {
				table.ajax.reload();
			},
			blur() {
				this.IsPassword();
			},
			btnInsert() {
				let vm = this;
				$('#employeeName').val('');
				$(".view-title").html("新增员工账户");
				$("#btnAddEdit").attr("data", "1");
				vm.hasPassword = true;
				$('#divInsertView').show();
				$('#divDataTableView').hide();
				$('.select_tips').css('display', 'block');
				vm.bindDivInsertView(null);
			},
			load_table() {
				let vm = this;
				vm.$nextTick(function() {
					$('#txtQueryKeywords').bind('keypress', function(event) {
						if(event.keyCode == "13") {
							table.ajax.reload();
						}
					});
					table = $('#example2').DataTable({
						pagingType: "full_numbers",
//						processing: true,
						deferRender: true,
						dom: "Bfrtip",
						buttons: [],
						responsive: !0,
						serverSide: true,
						ajax(data, callback, settings) {
							vm.noData=true;
							let param = {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"PageSize": data.length,
								"PageIndex": (data.start / data.length) + 1,
								"Parameters": {
									"CompanyId": eosCommon.storage.get('CompanyId'), //公司id，必填
									"RoleId": vm.RoleId, //角色id
									"IsActive": vm.IsActive, //是否锁定
									"KeyWords": vm.KeyWords.trim()
								}
							};
							let url = eosCommon.COMMON_API + "api/user/queryuser";
							eosCommon.eosAjax(url, "GET", param, "json", function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {
																		
									let returnData = {};
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
									vm.noData=false;
									callback(returnData);
									eosCommon.eosOperators(eosCommon.eosOperDataHandle());
								}
							});
						},
						"columns": [
							{ defaultContent: "" },
							{ data: "Account" },
							{ data: "UserName" },
							{ data: "RoleName" },
							{ data: "LoginCounts" },
							{ data: "LastLoginDateTime" },
							{ data: "IsActive" },
							{ data: "IsAdmin" }
							//{ "defaultContent": "<span class='OperatorBtnSet OperatorEdit'title='权限设置' data-toggle='modal' data-target='#modal-cleos' data='4'><i class='fa fa-cog'></i></span><span class='OperatorBtnEdit OperatorEdit' title='修改员工信息' data='2'><i class='fa fa-pencil'></i></span>" }
						],
						"columnDefs": [{
							"targets": [6],
							"render"(data) {								
								let html = '';
								if(data == 0) {
									html = "否"
								} else if(data == 1) {
									html = "是"
								}
								return html
							}
						},
						{
							"targets": [7],
							"render"(data) {
								let html = '';
								if(data == 1) {
									html = ""
								}else if(data == 0){
									html ="<span class='OperatorBtnSet OperatorEdit'title='权限设置' data-toggle='modal' data-target='#modal-cleos' data='4'><i class='fa fa-cog'></i></span><span class='OperatorBtnEdit OperatorEdit' title='修改员工信息' data='2'><i class='fa fa-pencil'></i></span>"
								}
								return html
							}
						}]
					});
					table.on('draw.dt', function() {
						table.column(0, {
							search: 'applied',
							order: 'applied'
						}).nodes().each(function(cell, i) {
							i = i + 1;
							let page = table.page.info();
							let pageno = page.page;
							let length = page.length;
							let columnIndex = (i + pageno * length);
							cell.innerHTML = columnIndex;
						});
					});

					$('#example2 tbody').on('click', 'tr', function() {
						if($(this).hasClass('selected')) {
							$(this).removeClass('selected');
						} else {
							table.$('tr.selected').removeClass('selected');
							$(this).addClass('selected');
						}
					});

					$('#example2 tbody').on('click', 'span', function() {
						let data = table.rows($(this).parents('tr')).data();
						let isNum = $(this).attr("data");
						if(isNum == "2") {
							//编辑信息赋值 函数
							$(".view-title").html("编辑员工账户");
							$("#txtUserName").val(data[0].UserName);
							$("#hidUserId").val(data[0].AccountId);
							$("#employeeName").val(data[0].UserName);
							vm.addAcountRoleId = data[0].RoleId;
							$("#selAccountType2 option[value='" + data[0].RoleId + "']").prop("selected", true);
							$("#selAccountType2").selectpicker('refresh');
							AccountId = data[0].AccountId;
							$("#btnAddEdit").attr("data", "2");
							$('#txtPassword').val('');
							$('#txtPasswordtwo').val('');
							vm.hasPassword = false;
							$('#divInsertView').show();
							$('#divDataTableView').hide();
							vm.bindDivInsertView(data);
						} else if(isNum == "3") {
							//删除信息赋值 函数
							AccountId = data[0].AccountId;
							vdialog({
								type: 'confirm',
								title: '提示',
								content: eosCommon.DELETE_MSG_ASK,
								ok() { vm.delRequest(); },
								cancel: true,
								modal: true
							});
						} else if(isNum == "4") {
							//权限设置赋值 函数
							vm.selectedCheck = [];
							$('#ModuleTitle').attr("data", "4");
							vm.iSelectAll=false;
							let userName = data[0].UserName;
							$('#ModuleTitle').text("设置账号权限" + '-' + userName);
							$('#modal_body3').show();
							AccountId = data[0].AccountId
							vm.bindVisiblePro();
						}
					});
				});
			},
			bindDivInsertView(data) {
				let vm = this;
				eosCommon.resetFrom();
				$('#lblPasswordMag').text("");
				$('#lblUserMag').text("");
				vm.IsPassword();
				if(data == null) {
					vm.isAdd = true;
					vm.projectLeaderData = {
						isAve:false,
						"id": "",
						"name": "",
						'Mobile': '',
						'UserId': '',
						'flag': '0' // 0表示不需要账号，1表示需要

					}
					vm.addAcountRoleId = '';
					$("#selAccountType2 option[value='" + vm.addAcountRoleId + "']").prop("selected", true);
					$("#selAccountType2").selectpicker('refresh');
					$("#txtUserName").val("");
					$('#txtPassword').val('');
					$('#txtPasswordtwo').val('');
					$("#hidUserId").val("");
					$('#txtAccount').val("");
					$('#hideEmployeeName').show();
					$('#employeeName').removeClass("b-0");
					$('#txtAccount').attr("disabled", "disabled");
					$('#txtAccount').removeClass("b-0");
					$('#txtAdminName').val("");
					$("input[type='radio'][name='radioIsLocked'][value='1']").prop("checked", "checked");
				} else {
					vm.isAdd = false;
					$('#txtAccount').val(data[0].Account);
					vm.woker_accunt = data[0].Account;
					$('#hideEmployeeName').hide();
					$('#employeeName').addClass("b-0");
					$('#txtAccount').addClass("b-0");
					$('#txtAdminName').val(data[0].UserName);
					$("input[type='radio'][name='radioIsLocked'][value='" + data[0].IsActive + "']").prop("checked", "checked");
				}
			},
			bindVisiblePro() {
				let vm = this,
					param = {
						"AccessToken": eosCommon.storage.get('AccessToken'),
						"Parameters": {
							"AccountId": AccountId, //帐号(用户)ID，必填
							"CompanyId": eosCommon.storage.get('CompanyId') //公司id
						}
					},
					url = eosCommon.COMMON_API + "api/user/getuservisibleproject";
				eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.checkedNames = result.Data;
						vm.bindChecked(vm.checkedNames, vm.selectedCheck);
					}
				});
			},
			IsPassword() {
				let isNum = $("#btnAddEdit").attr("data");
				if(isNum == "1") {
					$('#txtPassword').attr("class", "form-control required");
					$('#txtPassword').attr("data-valid", "isNonEmpty||between:6-25");
					$('#txtPassword').attr("data-error", "密码不能为空||密码长度为6-25位");
				} else if(isNum == "2") {
					if($('#txtPassword').val() == "") {
						$('#txtPassword').attr("class", "form-control");
					} else {
						$('#txtPassword').attr("class", "form-control required");
						$('#txtPassword').attr("data-valid", "between:6-25");
						$('#txtPassword').attr("data-error", "密码长度6-25位");

						$('#txtPasswordtwo').attr("class", "form-control required");
						$('#txtPassword').attr("data-valid", "between:6-25");
						$('#txtPassword').attr("data-error", "密码长度6-25位");
					}
				}
			},
			btnAddEdit() {
				let isNum = $("#btnAddEdit").attr("data");
				if(isNum == "1") {
					if(!verifyCheck._click("verifyCheckAdd")) {
						return false;
					} else {
						//添加 成功返回
						this.addRequest();
					}
				} else if(isNum == "2") {
					if(!verifyCheck._click("verifyCheckAdd")) {
						return false;
					} else {
						//编辑 成功返回
						this.editRequest();
					}
				}
			},
			editRequest() {
				let vm = this;
				let param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"AccountId": AccountId,
						"Password": $('#txtPassword').val(),
						"RoleId": vm.addAcountRoleId,
						"IsActive": $('input:radio[name="radioIsLocked"]:checked').val()
					}
				};
				let url = eosCommon.COMMON_API + "api/user/updateuser";
				eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
						$('#txtPasswordtwo').attr("class", "form-control");
						table.ajax.reload();
						vm.btnReturn();
					}
				});
			},
			addRequest() {
				//新增账号请求
				let vm = this;
				if(this.addAcountRoleId == '') {
					vdialog({
						type: 'confirm',
						title: '提示',
						content: '请选择账号角色',
						ok() {},
						cancel: true,
						modal: true
					});
					return false;
				}
				let param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"EmployeeId": vm.projectLeaderData.id,
						"CompanyId": eosCommon.storage.get("CompanyId"),
						"Mobile": vm.projectLeaderData.Mobile,
						"Password": $('#txtPassword').val(),
						"UserName": vm.projectLeaderData.name,
						"IsActive": $('input:radio[name="radioIsLocked"]:checked').val(),
						"RoleId": vm.addAcountRoleId
					}
				};
				let url = eosCommon.COMMON_API + "api/user/insertuser";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
						table.ajax.reload();
						vm.btnReturn();
						vm.projectLeaderData.isAve=true;
						setTimeout(()=>{
							vm.projectLeaderData.isAve=false;
						},1000);
					}
				});
			},
			delRequest() {
				let param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"AccountId": AccountId
					}
				};
				let url = eosCommon.COMMON_API + "api/role/deleterole";
				eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
						table.ajax.reload();
					}
				});
			},
			btnSave() {
				//权限设置实现函数
				let vm = this;
				if(vm.selectedCheck.length == 0) {
					vm.selectedCheck = JSON.stringify(vm.selectedCheck)
				}
				let param = {
						"AccessToken": eosCommon.storage.get('AccessToken'),
						"Parameters": {
							"AccountId": AccountId, //帐号(用户)ID，必填
							"ProjectList": vm.selectedCheck
						}
					},
					url = eosCommon.COMMON_API + "api/user/setuservisibleproject";
				eosCommon.eosAjax(url, 'PUT', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
					}
				});

			},
			getRoleLists() {
				let vm = this;
				//获取角色信息
				let param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"CompanyId": eosCommon.storage.get('CompanyId'), //公司id，必填									
						"Keywords": ''
					}
				};
				let url = eosCommon.COMMON_API + "api/role/queryrole";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.roleLists = result.Data.Result;
						vm.$nextTick(function() {
							$("#selAccountType1").selectpicker('refresh');
							$("#selAccountType2").selectpicker('refresh');
						})
					}
				})
			},
			get_tempUser() {
				if(tempUser != null || tempUser != '') {
					$('#employeeName').val(tempUser.name);
					$('#hidUserId').val(tempUser.id);
					$('#txtAccount').val(tempUser.WorkMobile);
					$('#txtAdminName').val(tempUser.name);
				}
			},
			bindChecked(checkedNames, selectedCheck) {
				for(let i = 0; i < checkedNames.length; i++) {
					if(checkedNames[i].IsVisible == 1) {
						selectedCheck.push(checkedNames[i].ProjectId);
					}
				}
			}
		},
		watch: {
			iSelectAll(newVal, oldVal) {
				let vm = this;
				vm.selectedCheck = [];
				if(newVal) {
					for(let i = 0; i < vm.checkedNames.length; i++) {
						vm.checkedNames[i].IsVisible = 1;
					}
					vm.bindChecked(vm.checkedNames, vm.selectedCheck);
				} else {
					vm.checkedNames = [];
					vm.selectedCheck = [];
					vm.bindVisiblePro();
				}
			}
		},
		computed: {
			filteredData() {
				let filterKey = this.searchQuery && this.searchQuery.toLowerCase()
				let data = this.checkedNames
				if(filterKey) {
					data = data.filter((row)=> {
						return Object.keys(row).some((key)=> {
							return String(row[key]).toLowerCase().indexOf(filterKey) > -1
						})
					})
				}
				return data;
			},
			DetailDataEmpty() {
				let [vm, DetailDataEmpty] = [this, 0];
				vm.filteredData.length == 0 ? DetailDataEmpty = 0 : DetailDataEmpty = 1;
				return DetailDataEmpty;
			},
			
		},
		mounted() {
			let vm = this;			
			$(".item_lists").getNiceScroll().resize();
			$(".item_lists").css('max-height', '378px').niceScroll();
			vm.getRoleLists();
			$("#selAccountType1").selectpicker('refresh');
			$("#selAccountType2").selectpicker('refresh');
			$("#selLock").selectpicker('refresh');
			
			$('#selAccountType1').change(function() {
				table.ajax.reload();
			});
			$('#selLock').change(function() {
				table.ajax.reload();
			});
			verifyCheck({ formId: 'verifyCheckAdd', onBlur: null, onFocus: null, onChange: null, successTip: true, resultTips: null, clearTips: null, code: true, phone: true });
			verifyCheck({ formId: 'verifyCheckset', onBlur: null, onFocus: null, onChange: null, successTip: true, resultTips: null, clearTips: null, code: true, phone: true });
		}
	}
</script>
<style scoped="scoped">
	@import '/static/plugins/tree/css/role_set.css';
	.visible_list {
		padding: 10px 15px;
		color: #253242;
	}
</style>
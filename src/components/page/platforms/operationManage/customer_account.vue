<template>
	<div>
		<!--员工账户管理列表开始-->
		<div id="divDataTableView" class="card-box m-page table-responsive">
			<div class="row">
				<div class="col-sm-6 col-md-4 col-lg-2">
					<span class="size20 font-bold">客户账号列表</span>

				</div>
				<div class="col-sm-6 col-md-8 col-lg-10 tar">
		          <el-button class='mb5 fr' size='small' @click='$router.go(-1)'>
		            <i class="fa fa-mail-reply-all mr5"></i>返回
		          </el-button>
				</div>	
			</div>
			<hr class="divider mb-10 mt-10">
			<div class="row">
				<div class="col-lg-12 search_selects">
					<span class="OrgTopAligin fs">
	                        <select data-live-search="true" @change="btnQuery()" id="selectCompany" v-model='CompanyId' class="form-control selectpicker" data-style="btn-white">	                            
	                            <option value="">所属公司</option>
	                            <option v-for="item in allCompanys" :value="item.CompanyId">{{item.CompanyFullName}}</option>	                            
	                        </select>
               		 </span>
					<span class="OrgTopAligin fs">
	                        <select id="accountType" @change="btnQuery()" v-model='IsAdmin' class="form-control selectpicker" data-style="btn-white">              
	                            <option value="">管理员账号</option>
	                            <option value="0">否</option>
	                            <option value="1">是</option>	                           	                            
	                        </select>
               		</span>
					<span class="OrgTopAligin fs">
	                        <select id="selLock" @change="btnQuery()" v-model="IsActive" class="form-control selectpicker" data-style="btn-white">
	                            <option value="">是否启用</option>
	                            <option value="0">否</option>
	                            <option value="1">是</option>
	                        </select>
               		 </span>
					<span class="fs">
	               		 <span class="OrgTopAligin">
	                        <input style="width: 180px;" id="txtQueryKeywords" v-model="KeyWords" type="text" class="form-control w-128" placeholder="账号/用户名">
	                    </span>
						<span class="OrgTopAligin">
	                        <button id="btnQuery" type="button" class="btn btn-default" v-on:click="btnQuery()">
	                            <i class="fa fa-search m-r-5"></i>查找
	                        </button>
	                    </span>
					</span>
				</div>
			</div>
			<div class="row" style="margin-top: 10px; margin-bottom: 10px;">
				<div class="col-lg-12">

					<span class="OrgTopAliginTime" style="width: 180px;">
                        <span title="创建开始时间" id="c_searchStartTime" class="input-group date form_time" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="createStartDate"   class="form-control" size="16" type="text" value="" readonly placeholder="创建开始时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</span>
					</span>
					<span class="OrgTopAliginTime" style="width: 180px;">
                        <span title="创建结束时间" id="c_searchEndTime" class="input-group date form_time" data-date="2017-01-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="createEndDate"   class="form-control" size="16" type="text" value="" readonly placeholder="创建结束时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</span>
					</span>
					<span class="OrgTopAliginTime" style="width: 180px;">
                        <span title="登入开始时间" id="log_searchStartTime" class="input-group date form_time" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="loginStartDate"   class="form-control" size="16" type="text" value="" readonly placeholder="登入开始时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</span>
					</span>
					<span class="OrgTopAliginTime" style="width: 180px;">
                        <span title="登入结束时间" id="log_searchEndTime" class="input-group date form_time" data-date="2017-01-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="loginEndDate"  class="form-control" size="16" type="text" value="" readonly placeholder="登入结束时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
					</span>
					</span>
					<span class="OrgTopAliginTime pull-right" style="width: auto;">
                      		<button id="exportALLbTN" type="button" class="btn btn-default" @click="exportAll()">
	                            <i class="fa fa-file-excel-o m-r-5"></i>导出全部
	                        </button>
					</span>
				</div>
			</div>
			<table id="example1" class="table table-striped table-bordered" width="100%">
				<thead>
					<tr>
						<th>序号</th>
						<th>账号</th>
						<th>用户名</th>
						<th>所属公司</th>
						<th>账号类型</th>
						<th>登录次数</th>
						<th>创建时间</th>
						<th>最后登录时间</th>
						<th>是否启用</th>
					</tr>
				</thead>
			</table>
		</div>
	</div>
</template>
<script>
	let table;
	export default {
		data() {
			return {
				//列表查询参数
				allCompanys: [],
				CompanyId: '',
				IsActive: '',
				KeyWords: '',
				IsAdmin: '',
				BeginCreateTime: '',
				EndCreateTime: '',
				BeginLastLoginTime: '',
				EndLastLoginTime: '',
				//导出全部
				isExporting:false
			}
		},
		methods: {
			exportAll(){
				this.getDownloadValue();
			},
			getDownloadValue(){               
                let vm=this;
                let params = {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"PageSize": '',
								"PageIndex": '',
								"Parameters": {
									"CompanyId": vm.CompanyId, //公司id，必填
									"RoleId": '', //角色id
									"IsActive": vm.IsActive, //是否锁定
									"KeyWords": vm.KeyWords.trim(),
									"IsAdmin": vm.IsAdmin,
									"BeginCreateTime": $('#createStartDate').val(),
									"EndCreateTime": $('#createEndDate').val(),
									"BeginLastLoginTime": $('#loginStartDate').val(),
									"EndLastLoginTime": $('#loginEndDate').val(),
								}
							};
                eosCommon.eosMaxAjax(eosCommon.COMMON_API + 'api/user/ExportUser', "GET", params, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {                     
               			window.location.href=result.Data.DownloadUrl;
                     	eosCommon.eosMessage('success', '导出数据成功');
                     	vm.isExporting = false;                       
                    }
                },function(err) {
                	vm.isExporting = false;
				vdialog({
                        type: 'confirm',
                        title: '提示',
                        content: '导出数据超时，您可以尝试缩小查询时间范围再试！',
                        ok: function() {                        	
                        },
                        cancel: true,
                        modal: true
       				 });
					});
            },
			btnQuery() {
				table.ajax.reload();
			},
			load_table() {
				let vm = this;
				vm.$nextTick(()=>{
					$('#txtQueryKeywords').bind('keypress', (event)=> {
						if(event.keyCode == "13") {
							table.ajax.reload();
						}
					});
					table = $('#example1').DataTable({
						pagingType: "full_numbers",
						processing: true,
						deferRender: true,
						dom: "Bfrtip",
						buttons: [],
						responsive: !0,
						serverSide: true,
						ajax: (data, callback, settings)=> {
							let param = {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"PageSize": data.length,
								"PageIndex": (data.start / data.length) + 1,
								"Parameters": {
									"CompanyId": vm.CompanyId, //公司id，必填
									"RoleId": '', //角色id
									"IsActive": vm.IsActive, //是否锁定
									"KeyWords": vm.KeyWords.trim(),
									"IsAdmin": vm.IsAdmin,
									"BeginCreateTime": $('#createStartDate').val(),
									"EndCreateTime": $('#createEndDate').val(),
									"BeginLastLoginTime": $('#loginStartDate').val(),
									"EndLastLoginTime": $('#loginEndDate').val(),
								}
							};
							let url = eosCommon.COMMON_API + "api/user/queryuser";
							eosCommon.eosAjax(url, "GET", param, "json",(result)=> {
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
									callback(returnData);
									eosCommon.eosOperators(eosCommon.eosOperDataHandle());
								}
							});
						},
						"columns": [
							{ defaultContent: "" },
							{ data: "Account" },
							{ data: "UserName" },
							{ data: "CompanyFullName" },
							{ data: "IsAdmin" },
							{ data: "LoginCounts" },
							{ data: "CreatedOn" },
							{ data: "LastLoginDateTime" },
							{ data: "IsActive" }

						],
						"columnDefs": [{
								"targets": [8],
								"render": (data)=> {
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
								"targets": [4],
								"render": (data) =>{
									let html = '';
									if(data == 0) {
										html = "非企业管理员"
									} else if(data == 1) {
										html = "企业管理员"
									}
									return html
								}
							}
						]
					});
					table.on('draw.dt',() =>{
						table.column(0, {
							search: 'applied',
							order: 'applied'
						}).nodes().each((cell, i)=> {
							i = i + 1;
							let [page,pageno,length,columnIndex]=['','','','']
							page = table.page.info();
							pageno = page.page;
							length = page.length;
							columnIndex = (i + pageno * length);
							cell.innerHTML = columnIndex;
						});
					});

					$('#example1 tbody').on('click', 'tr', () =>{
						if($(this).hasClass('selected')) {
							$(this).removeClass('selected');
						} else {
							table.$('tr.selected').removeClass('selected');
							$(this).addClass('selected');
						}
					});

				});
			},

			getAllCompany() {
				let vm = this;
				let param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"PageSize": '',
					"PageIndex": '',
					"Parameters": {
						"KeyWord": '',
						"EntitySort": '',
						"EntityClass": ''
					}
				};
				let url = eosCommon.PLATFORM_API + "api/operate/GetTenantList";
				eosCommon.eosAjax(url, "GET", param, "json",(result)=>{
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.allCompanys = result.Data.Result;
						vm.$nextTick(()=>{
							$('#selectCompany').selectpicker('refresh');
						})
					}
				});
			},
			timeInit() {
				let vm = this;
				$('.form_date').datetimepicker({
					language: 'zh-CN',
					weekStart: 1,
					todayBtn: 1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					minView: 2,
					forceParse: 0
				});
				$('.form_time').datetimepicker({
					format: 'yyyy-mm-dd hh:ii:ss',
					weekStart: 1,
					autoclose: true,
					forceParse: false,
					todayBtn: 1,
					todayHighlight: 1,
					language: 'zh-CN'
				});
				//查询时间——开始
				$('#c_searchStartTime').datetimepicker('setEndDate', $("#createEndDate").val());
				$('#c_searchEndTime').datetimepicker('setStartDate', $("#createStartDate").val());
				$("#createStartDate").change(function() {
					$('#c_searchEndTime').datetimepicker('setStartDate', $(this).val());
				});
				$("#createEndDate").change(function() {
					$('#c_searchStartTime').datetimepicker('setEndDate', $(this).val());
				});

				$('#log_searchStartTime').datetimepicker('setEndDate', $("#loginEndDate").val());
				$('#log_searchEndTime').datetimepicker('setStartDate', $("#loginStartDate").val());
				$("#loginStartDate").change(function() {
					$('#log_searchEndTime').datetimepicker('setStartDate', $(this).val());
				});
				$("#loginEndDate").change(function() {
					$('#log_searchStartTime').datetimepicker('setEndDate', $(this).val());
				});
			},
		},
		mounted() {
			let vm = this;
			vm.timeInit();
			vm.getAllCompany();
			vm.load_table();
			$("#accountType").selectpicker('refresh');
			$("#selLock").selectpicker('refresh');
		}
	}
</script>
<style scoped="scoped">
	@import '/static/plugins/tree/css/role_set.css';
	.visible_list {
		padding: 10px 15px;
		color: #253242;
	}
	.fr{float: right;}
	select.selectpicker {
		font-size: 9pt;
		width: 180px;
	}
	
	.bootstrap-select.btn-group:not(.input-group-btn) {
		width: 180px;
	}
	
	.bootstrap-select.btn-group .dropdown-menu.inner {
		max-height: 200px!important;
	}
</style>
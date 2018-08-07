<template>
	<div>
		<!--<span class="input-group">
		    <input v-model="employeeName" id="employeeName" class="form-control required" type="text" data-valid="isNonEmpty" data-error="员工姓名不能为空" value="" readonly placeholder="请选择员工" disabled="disabled">
            <div style="position: absolute;" class="select_tips">
                <span class="valid-form-group-addon">
                    <label class="focus valid"></label>
                </span>
            </div>
		    <span id="hideEmployeeName" class="input-group-addon cursor" data-toggle="modal" data-target="#modal-employee" @click="newGetData()"><span class="fa fa-bars"></span></span>
		</span>-->
		<input type="hidden" v-model="employeeId" id="hidUserId" value="" />
		<div id="modal-employee" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true" style="display: none;">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="win-close" data-dismiss="modal">×</button>
					<button id="btnSave" type="button" class="sava" data-dismiss="modal" aria-hidden="true" v-on:click="get_employeeId()"><i class='fa fa-save m-r-5'></i>确定</button>
					<h4 class="modal-title">选择员工</h4>
				</div>
				<div id="verifyCheck">
					<div id="modal_body1" class="modal-body nicescroll">
						<div class="">
							<span class="OrgTopAligin">
		                        <input id="employeeSearchTxt" v-model.trim="employeeSerach" class="form-control" placeholder="工号/姓名" type="text">
		                    </span>
							<span class="OrgTopAligin">
		                        <button @click="serarch()" id="btnQueryEmployee" type="button" class="btn btn-default">
		                            <i class="fa fa-search m-r-5"></i>查找
		                        </button>
		                    </span>
						</div>
						<div class="dataTables_wrapper mt-10">
							<div class="dataTables_processing" v-if="processing==0" v-bind:style="{display: 'block'}">数据加载中...</div>
							<table class="table table-striped table-bordered dataTable no-footer employee_table" role="grid" aria-describedby="example1_info" style="width: 100%;" width="100%">
								<thead>
									<tr role="row">
										<th>序号</th>
										<th>工号</th>
										<th>姓名</th>
										<th>手机号码</th>
										<th>所属部门</th>
									</tr>
								</thead>
								<tbody>
									<tr v-bind:class="((index % 2) == 0 ? 'odd' : 'even') + (selectRow == item.id ? ' selected' : '')" v-on:click="is_check_tr(item)" role="row" v-for="(item,index) in employeeListData" @click="ischeckdate(item)">
										<td>{{index+begin_row}}</td>
										<td>{{item.EmployeeNo}}</td>
										<td>{{item.name}}</td>
										<td>{{item.WorkMobile}}</td>
										<td>{{item.DepartmentName}}</td>
									</tr>
									<tr class="odd" v-if="page_num == 0">
										<td valign="top" colspan="6" class="dataTables_empty">暂无数据</td>
									</tr>
								</tbody>
							</table>
							<div v-if="page_num > 0">
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
									<a class="paginate_button" v-on:click="on_page(one_page)" v-bind:class="page_record == one_page ? 'current' : ''">{{one_page}}</a>
									<a class="paginate_button" v-on:click="on_page(two_page)" v-bind:class="page_record == two_page ? 'current' : ''">{{two_page}}</a>
									<a class="paginate_button" v-on:click="on_page(three_page)" v-bind:class="page_record == three_page ? 'current' : ''">{{three_page}}</a>
									<a class="paginate_button" v-on:click="on_page(four_page)" v-bind:class="page_record == four_page ? 'current' : ''">{{four_page}}</a>
									<a class="paginate_button" v-on:click="on_page(five_page)" v-bind:class="page_record == five_page ? 'current' : ''">{{five_page}}</a>
									<span class="ellipsis" v-if="page_record+3 <= page_num">…</span>
									<a class="paginate_button " v-on:click="on_page(page_num)" v-bind:class="page_record == page_num ? 'current' : ''">{{page_num}}</a>
							</template>
							</span>
					<a class="paginate_button next" v-bind:class="page_record == page_num ? 'disabled' : ''" v-on:click="dow_page">下一页</a>
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
	export default {
		data: function() {
			return {
				employeeListData: [],
				employeeSerach: "",
				page_size: 10, //页大小
				page_index: 1, //页索引
				begin_row: 0, //开始条数
				end_row: 0, //结束条数
				total: 0, //总的数据条数
				page_num: 0, //多少页
				page_record: 1, //当前页码
				processing: 0, //0:数据加载处理中 1:处理完成
				selectRow: '',
				employeeData: '',
				employeeName: '',
				employeeId: '',
				flag: '',
				CompanyId:''
			}
		},
		template: '#select-employee-tem',
		props: ['propsdata', 'title'],
		computed: { //计算属性，依赖数据缓存
			one_page: function() {
				return(this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 2 : this.page_num - 5) : 2);
			},
			two_page: function() {
				return(this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 1 : this.page_num - 4) : 3);
			},
			three_page: function() {
				return(this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index : this.page_num - 3) : 4);
			},
			four_page: function() {
				return(this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 1 : this.page_num - 2) : 5);
			},
			five_page: function() {
				return(this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 2 : this.page_num - 1) : 6);
			}
			
			
		},		
		methods: {
			getData_isAcount: function() {
				//只查有账号员工
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"PageSize": this.page_size,
					"PageIndex": this.page_index,
					"Parameters": {
						"Keywords": this.employeeSerach,
						"CompanyId":this.CompanyId
					}
				}
				eosCommon.eosAjax(eosCommon.COMMON_API + 'api/employee/GetHaveAccountEmployee', "GET", param, "json", function(result) {
					_this.processing = 1;
					if(eosCommon.checkCode(result.State, result.Message)) {
//						if(this.flag == '0'){
//							_this.total=result.Data.Total;
//							return;
//						}
						if(result.Data == "") {
							_this.employeeListData = [];
							_this.page_num = 0;
						} else {
							_this.total = result.Data.Total;
							_this.employeeListData = result.Data.Result;
							_this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
							_this.end_row = _this.page_size * (_this.page_index - 1) + _this.employeeListData.length;
							_this.page_num = Math.ceil(_this.total / _this.page_size);
						}
					}
				});
			},
			getData_notAcount: function() {
				//不需要有账号，只查没账号员工
				var _this = this;
				_this.employeeListData=[];
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"PageSize": this.page_size,//api/employee/query
					"PageIndex": this.page_index,
					"IsPart":'1',
					"Parameters": {
						"IsPart":'1',
						"Keywords": this.employeeSerach,
						"Id": "",
						"JoinDateStart": "",
						"JoinDateEnd": ""
					}
				};
				var url = eosCommon.COMMON_API + "api/employee/query";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					_this.processing = 1;
					if(eosCommon.checkCode(result.State, result.Message)) {
						console.log(result);
						var data = result.Data.Result;
						var len = data.length;
						var Total = 0;
						if(result.Data == "") {
							_this.employeeListData = [];
							_this.page_num = 0;
						} else {
							for(var i = 0; i < len; i++) {
								if(data[i].AccountFlag == '0') {
									Total++;
									_this.employeeListData.push({
										EmployeeNo: data[i].EmployeeNo,
										name: data[i].ChineseName,
										WorkMobile: data[i].WorkMobile,
										DepartmentName: data[i].DepartmentName,
										id: data[i].EmployeeId,
									});
								}
							}
							_this.total = result.Data.Total;
							_this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
							_this.end_row = _this.page_size * (_this.page_index - 1) + _this.employeeListData.length;
							_this.page_num = Math.ceil(_this.total / _this.page_size);
						}
					}
				});
			},
			newGetData: function() {
				this.selectRow = $("#hidUserId").val();
				this.employeeSerach = '';
				this.employeeName = $("#txtUserName").val();
				this.employeeId = $("#hidUserId").val();
				this.page_index = 1;
				if(this.flag == '0') {
					this.getData_notAcount();

				} else if(this.flag == '1') {
					this.getData_isAcount();

				}

			},
			serarch: function() {
				this.getData_isAcount()
			},
			keyPressVal: function() {
				var _this = this;
				$('#employeeSearchTxt').bind('keypress', function(event) {
					if(event.keyCode == "13") {
						if(this.flag == '0') {
							this.getData_notAcount();

						} else if(this.flag == '1') {
							this.getData_isAcount();

						}
					}
				});
			},
			ischeckdate: function(item) {
				this.employeeData = item;

			},
			is_check_tr: function(item) {
				this.selectRow = item.id;
			},
			get_employeeId: function() {
				if(this.employeeData == '') {
					return false;
				} else {
					this.propsdata.id = this.employeeData.id;
					this.propsdata.name = this.employeeData.name;
					this.propsdata.UserId = this.employeeData.UserId;
					this.propsdata.Mobile = this.employeeData.WorkMobile;
					$('#projectLeader').next('.valid-form-group-addon').find('.focus').html('');
					$(".select_tips2").css('display', 'none');
				}
			},
			modalClose: function() {
				$('#txtCustomerName').val('');
				$('#txtCustomerName').attr('isSelected', '0');
				$('.select_tips').css('display', 'block');
			},
			up_page: function() {
				if(this.page_index > 1) {
					this.page_index--;
					this.page_record--;
				}
			},
			on_page: function(data) {
				this.page_index = data;
				this.page_record = data;
			},
			dow_page: function() {
				if(this.page_index < this.page_num) {
					this.page_index++;
					this.page_record++;
				}
			},
		},
		watch: {
			page_index: function(val) {
				if(this.flag == '0') {
					this.getData_notAcount();

				} else if(this.flag == '1') {
					this.getData_isAcount();

				}
			},
           "propsdata.CompanyId":function(val){
                    console.log('dddd:',val)  
                    this.CompanyId=val;
           			this.getData_isAcount();
           },
           "propsdata.isAve":function(val){
           		if(val){
           			this.getData_notAcount();
           		}
           }
		},
		mounted: function() {
			this.flag = this.propsdata['flag'];
			if(this.flag == '0') {
				this.getData_notAcount();

			} else if(this.flag == '1') {
				this.getData_isAcount();

			}
			this.keyPressVal()
		}
	}
</script>
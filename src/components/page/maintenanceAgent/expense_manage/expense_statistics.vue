<template>
    <div v-cloak>
        <!--费用列表——开始-->
        <div id="divDataTableView" class="card-box table-responsive " style="display: none">
            <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6">
                    <label class="size20 font-bold">费用列表</label>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6">
                    <button id="CostTotal" type="submit" class="btn btn-white pull-right" v-on:click="btnReturn()"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">
            <div class="row">
                <div class="col-lg-12">
                    <span class="OrgTopAligin OperatorInsert">
                        <button id="btnInsert" type="button" class="btn btn-default waves-effect waves-light" v-on:click="addEditCost()">
                            <i class="fa fa-plus m-r-5"></i>新增
                        </button>
                    </span>
                    <span class="OperatorSearch">
		                    	<span class="OrgTopAliginTime">
		                        <span id="startTime" class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
		                            <input id="txtStartDate_statistics" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
		                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
		                        </span>
		                    </span>
		                    <span class="OrgTopAliginTime">
		                        <span id="endTime" class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
		                            <input id="txtEndDate_statistics" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
		                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
		                        </span>
		                    </span>
		                    <span class="OrgTopAligin">
		                        <input id="txtQueryKeywords" type="text" class="form-control" placeholder="工号/姓名">
		                    </span>
		                    <span class="OrgTopAligin">
		                        <button id="btnQueryCostList" type="button" class="btn btn-default" v-on:click="btnQueryCostList()">
		                            <i class="fa fa-search m-r-5"></i>查找
		                        </button>
		                    </span>
                    	
                    </span>
                </div>
            </div>
            <table id="example_statistics" class="table table-striped table-bordered" width="100%">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>工号</th>
                        <th>姓名</th>
                        <th>费用类型</th>
                        <th>金额(元)</th>
                        <th>费用用途</th>
                        <th>消费日期</th>
                        <th>消费归属项目</th>
                        <th style="min-width: 40px;">操作</th>
                    </tr>
                </thead>
            </table>
        </div>
        <!--费用列表——结束-->
        <!--费用统计视图——开始-->
        <div id="costTotalList" class="card-box table-responsive">
            <!--费用统计视图——开始-->
            <div class="row">
                <div class="col-sm-12 col-md-4 col-lg-6">
                    <label class="size20 font-bold">费用统计</label>
                </div>
            </div>
            <hr class="divider mt-10">
            <div class="row">
                <div class="col-lg-12 OperatorSearch">
                    <span class="OrgTopAliginTime">
                        <span id="StartDateCharts" class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="txtStartDate_statisticsCharts" class="form-control" size="16" value="" readonly="" placeholder="开始时间" type="text">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        </span>
                    </span>
                    <span class="OrgTopAliginTime">
                        <span id="EndDateCharts" class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="txtEndDate_statisticsCharts" class="form-control" size="16" value="" readonly="" placeholder="结束时间" type="text">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        </span>
                    </span>
                    <span class="OrgTopAligin">
                        <button id="btnQueryCharts" type="button" class="btn btn-default waves-effect waves-light" v-on:click="btnQueryCharts()">
                            <i class="fa fa-search m-r-5"></i>查找
                        </button>
                    </span>
                </div>
            </div>
            <div class="row bg-white">
                <div id="feiyong" style="height:300px"></div>
            </div>
            <!--费用统计视图——结束-->
            <!--费用统计列表——开始-->
            <hr class="divider mt-10 mb-10">
            <div class="row">
                <div class="EmployeeCostDetailBox col-lg-12" style="width: 100%;">
                    <span class="OrgTopAligin OperatorInsert">
                        <button id="addCost" type="button" class="btn btn-default" v-on:click="addEditCost()"><i class="fa fa-plus m-r-5"></i>新增</button>
                    </span>
                   <span class="OperatorSearch">
		                   			 <span class="OrgTopAligin">
		                        <input id="txtQueryCost" name="txtAccount" class="EosAutocompleter form-control autocompleter-node" placeholder="工号/姓名" autocomplete="off" type="text">
		                    </span>
		                    <span class="OrgTopAliginTime">
		                        <span id="StartDateCost" class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
		                            <input id="txtStartDate_statisticsCost" class="form-control" size="16" value="" readonly="" placeholder="开始时间" type="text">
		                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
		                        </span>
		                    </span>
		                    <span class="OrgTopAliginTime">
		                        <span id="EndDateCost" class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
		                            <input id="txtEndDate_statisticsCost" class="form-control" size="16" value="" readonly="" placeholder="结束时间" type="text">
		                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
		                        </span>
		                    </span>
		                    <span class="OrgTopAligin">
		                        <button id="btnQueryCost" type="button" class="btn btn-default waves-effect waves-light" v-on:click="btnQueryCost()">
		                            <i class="fa fa-search m-r-5"></i>查找
		                        </button>
		                    </span>
                   </span>
                    <div>
                        <table id="EmployeeCostDetail_s" class="table table-striped table-bordered" width="100%">
                            <thead>
                            <tr role="row">
                                <th class="sorting_asc">序号</th>
                            </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <!--费用统计列表——结束-->
            <div class="clearfix"></div>
        </div>
        <!--费用统计视图——结束-->
        <!--添加费用列表——开始-->
        <div id="costTotalAdd" class="card-box table-responsive" style="display: none">
            <div class="row">
                <div class="col-sm-6 col-md-6 col-lg-6">
                    <label class="size20 font-bold view-title">新增费用</label>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-6">
                    <button type="submit" class="btnReturn btn btn-white pull-right" v-on:click="btnReturnView()"><i class="fa fa-clock-o mr-5 size16"></i>费用列表</button>
                </div>
            </div>
            <hr class="divider mt-10">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-xs-12">
                    <div class="mt-15">
                        <div id="verifyCheck">
                            <div class="form-horizontal content-box ">
                                <!--<div class="form-group">
                                    <label class="content-title-left">
                                        <em class="ak_required_em">*</em>员工姓名
                                    </label>
                                    <div class="col-lg-6 col-xs-9">
                                        <select-employee :propsdata="propsEmployeedata" title="选择项员工"></select-employee>
                                    </div>
                                </div>-->
                                <div class="form-group">
                                	<label class="content-title-left">
                                        <em class="ak_required_em">*</em>员工姓名
                                    </label>
	                                <div class="col-lg-6 col-xs-8">
		                                <select-employee :propsdata="propsEmployeedata" title="选择项员工"></select-employee>									
											<span class="input-group">										
		                                        <input id="projectLeader" v-model="propsEmployeedata.name" class="form-control required" type="text" data-valid="isNonEmpty" data-error="企业员工不能为空"  readonly placeholder="请选择企业员工" disabled="disabled">
		                                        <div style="position: absolute;" class="select_tips2">
		                                            <span class="valid-form-group-addon">
		                                                <label class="focus valid"></label>
		                                            </span>
												</div>										
												<span class="input-group-addon cursor" data-toggle="modal" data-target="#modal-employee"><span class="fa fa-bars"></span></span>
											</span>
									</div>
								</div>
                                <div class="form-group">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>费用类型</label>
                                    <div class="col-lg-2 col-xs-3">
                                        <select id="selExpenseItem" class="form-control selectpicker" data-style="btn-white" data-size="6">
                                        </select>
                                    </div>

                                    <div id="IsOther" style="display: none">
                                        <div class="col-lg-2 col-xs-3">
                                            <label class="content-title-left pull-right"><em class="ak_required_em">*</em>其它费用说明</label>
                                        </div>
                                        <div class="col-lg-2 col-xs-3">
                                            <span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
                                            <input id="txtOtherExpenseName" type="text" maxlength="50" class="form-control"  placeholder="其它费用说明" />
                                            <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>消费日期</label>
                                    <div class="col-lg-2 col-xs-3">
                                        <span class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                            <input id="txtCostDate" class="form-control required" data-valid="isNonEmpty" data-error="消费日期不能为空" type="text" value="" readonly placeholder="消费日期">
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

                                    <div class="col-lg-2 col-xs-3">
                                        <label class="content-title-left pull-right"><em class="ak_required_em">*</em>费用归属项目</label>
                                    </div>
                                    <div class="col-lg-2 col-xs-3">
                                        <select-project></select-project>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>金额</label>
                                    <div class="col-lg-6 col-xs-9">
                                        <span class="valid-form-group">
                                            <label class="focus valid"></label>
                                        </span>
                                        <input id="txtCost" type="text" maxlength="12" class="form-control required" data-valid="isNonEmpty||isPrice" data-error="金额不能为空||金额格式不对" placeholder="金额(单位：元)" />
                                        <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                        <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-horizontal content-box ">
                                <div class="form-group">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>费用用途</label>
                                    <div class="col-lg-6 col-xs-9">
                                        <span class="valid-form-group" style="top: 86px">
                                            <label class="focus valid pl-10"></label>
                                        </span>
                                        <textarea maxlength="100" id="txtUsage" class="form-control required" data-valid="isNonEmpty" data-error="费用用途不能为空" placeholder="费用用途"></textarea>
                                        <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                        <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="form-horizontal content-box ">
                                <div class="form-group">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>发票上传</label>
                                    <div class="col-lg-6 col-xs-9">
                                        <div id="imgBox1"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="content-box-footer">
                                <div class="form-group">
                                    <label class="content-title-left"></label>
                                    <div class="col-lg-5 col-xs-8 pl-22">
                                        <button type="button" class="btnReturn btn btn-white pull-left mr-10" v-on:click="btnReturnView()">取消</button>
                                        <button id="btnAddEdit" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中..." data="" v-on:click="btnSaveExpense()">确定</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--添加费用列表——结束-->
    </div>
</template>
<script>
    import selectEmployee from 'components/common/select-employee.vue';
    import selectProject from 'components/common/select-project.vue';
    var btn = "";
    var table;
    var CostDetail;
    var ExpenseId;
    var export_col;
    export default {
    	data(){
    		return{
    			propsEmployeedata:{
					  "id": "",
                    "name": "",
                    'UserId':'',
                    'flag':'1'
				}
    		}
    	},
        components:{
            selectEmployee,
            selectProject
        },
        methods: {
            bind_DateTime: function () {
                $('.form_date').datetimepicker({
                    format: 'yyyy-mm-dd',
                    weekStart: 1,
                    autoclose: true,
                    startView: 2,
                    minView: 2,
                    forceParse: false,
                    todayBtn:  1,
                    todayHighlight: 1,
                    language: 'zh-CN'
                });
                $('#txtStartDate_statisticsCharts').val(eosCommon.getTime("yyyy-MM-dd", -(new Date().getDate()-1)));
                $('#txtEndDate_statisticsCharts').val(eosCommon.getTime("yyyy-MM-dd", 0));
                $('#txtStartDate_statisticsCost').val(eosCommon.getTime("yyyy-MM-dd", -(new Date().getDate()-1)));
                $('#txtEndDate_statisticsCost').val(eosCommon.getTime("yyyy-MM-dd", 0));
                $('#txtStartDate_statistics').val(eosCommon.getTime("yyyy-MM-dd", -(new Date().getDate()-1)));
                $('#txtEndDate_statistics').val(eosCommon.getTime("yyyy-MM-dd", 0));

                $('#EndDateCharts').datetimepicker('setStartDate', $("#txtStartDate_statisticsCharts").val());
                $('#StartDateCharts').datetimepicker('setEndDate', $("#txtEndDate_statisticsCharts").val());
                $("#txtStartDate_statisticsCharts").change(function (){
                    $('#EndDateCharts').datetimepicker('setStartDate', $(this).val());
                });
                $("#txtEndDate_statisticsCharts").change(function (){
                    $('#StartDateCharts').datetimepicker('setEndDate', $(this).val());
                });

                $('#EndDateCost').datetimepicker('setStartDate', $("#txtStartDate_statisticsCost").val());
                $('#StartDateCost').datetimepicker('setEndDate', $("#txtEndDate_statisticsCost").val());
                $("#txtStartDate_statisticsCost").change(function (){
                    $('#EndDateCost').datetimepicker('setStartDate', $(this).val());
                });
                $("#txtEndDate_statisticsCost").change(function (){
                    $('#StartDateCost').datetimepicker('setEndDate', $(this).val());
                });

                $('#endTime').datetimepicker('setStartDate', $("#txtStartDate_statistics").val());
                $('#startTime').datetimepicker('setEndDate', $("#txtEndDate_statistics").val());
                $("#txtStartDate_statistics").change(function (){
                    $('#endTime').datetimepicker('setStartDate', $(this).val());
                });
                $("#txtEndDate_statistics").change(function (){
                    $('#startTime').datetimepicker('setEndDate', $(this).val());
                });
            },
            btnQueryCharts: function () {
                this.load_Charts();
            },
            load_Charts: function () {
                var _this = this;
                var StartDate = $('#txtStartDate_statisticsCharts').val();
                var EndDate = $('#txtEndDate_statisticsCharts').val();
                var ExpenseNames = [];
                var Expenses = [];
                var TotalExpense = "";
                
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "StartDate": $('#txtStartDate_statisticsCharts').val(),
                        "EndDate": $('#txtEndDate_statisticsCharts').val()
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/expense/summary";
                eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        if (result.Data != "") {
                            ExpenseNames = result.Data.Result.ExpenseNames;
                            Expenses = result.Data.Result.Expenses;
                            TotalExpense = result.Data.Result.TotalExpense;
                        }
                        _this.bind_HighCharts(ExpenseNames, Expenses, TotalExpense, StartDate, EndDate);
                    }
                });
            },
            bind_HighCharts: function (ExpenseNames, Expenses, TotalExpense, StartDate, EndDate) {
                var _this = this;
                $('#feiyong').highcharts({
                    chart: {
                        type: 'column'
                    },
                    title: {
                        text: StartDate + ' 至 ' + EndDate + ' 费用统计图'
                    },
                    xAxis: {
                        categories: ExpenseNames,
                        crosshair: true
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: '人民币 (￥)'
                        }
                    },
                    tooltip: {
                        headerFormat: '<span style="font-size:10px">{point.key}</span>'
                    },
                    plotOptions: {
                        column: {
                            pointPadding: 0.2,
                            borderWidth: 0
                        }
                    },
                    series: [{
                        name: '费用总额 ' + TotalExpense + ' (￥)',
                        data: Expenses
                    }]
                });
            },
            bind_EmployeeCostTilte: function () {
                var _this = this;
                var ininDataColums = [{ defaultContent: "" }];
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "PageSize": 1,
                    "PageIndex": 1,
                    "Parameters": {
                        "Keywords": $('#txtQueryCost').val().trim(),
                        "StartDate": $('#txtStartDate_statisticsCost').val(),
                        "EndDate": $('#txtEndDate_statisticsCost').val()
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/expense/query";
                eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        if (result.Data != "") {
                            for (var key in result.Data.Tilte) {
                                $("#EmployeeCostDetail_s tr").append("<th>" + result.Data.Tilte[key] + "</th>");
                                ininDataColums.push({ data: result.Data.Tilte[key] })
                            }
                            
                            var jobNum = result.Data.Tilte['工号'];
                            var ininDataColumnDefs = [];
                            for (var i = 0; i < ininDataColums.length; i++)
                            {
                                var seting = {
                                    targets: [i],
                                    render: function (data) {
                                        var html = '';
                                        html = "<span class='total-hover' title='查看明细'>" + data + "</span>"
                                        return html;
                                    }
                                };
                                ininDataColumnDefs.push(seting);
                            }
                            _this.bind_EmployeeCostDetail_s(ininDataColums, ininDataColumnDefs);
                        }
                    }
                });
            },
            bind_EmployeeCostDetail_s: function (ininDataColums, ininDataColumnDefs) {
                var _this = this;
                export_col = [];
                for (var i = 1; i < ininDataColums.length; i++){
                    export_col.push(i)
                }
                CostDetail = $('#EmployeeCostDetail_s').DataTable({
                    pagingType: "full_numbers",
                    processing: true,
                    deferRender: true,
                    dom: "Bfrtip",
                    buttons: [{
                        extend: "print",
                        exportOptions: {
                            "columns": export_col
                        }
                    }],
                    responsive: !0,
                    serverSide: true,
                    ajax: function (data, callback, settings) {
                        var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "PageSize": data.length,
                            "PageIndex": (data.start / data.length) + 1,
                            "Parameters": {
                                "Keywords": $('#txtQueryCost').val().trim(),
                                "StartDate": $('#txtStartDate_statisticsCost').val(),
                                "EndDate": $('#txtEndDate_statisticsCost').val()
                            }
                        };
                        var url = eosCommon.ENTERPRISE_API + "api/expense/query";
                        eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                            if (eosCommon.checkCode(result.State, result.Message)) {
                                var returnData = {};
                                if (result.Data == "") {
                                    returnData.draw = data.draw;
                                    returnData.recordsTotal = 0;
                                    returnData.recordsFiltered = 0;
                                    returnData.data = [];
                                }
                                else {
                                    returnData.draw = data.draw;
                                    returnData.recordsTotal = result.Data.Total;
                                    
                                    returnData.recordsFiltered = result.Data.Total;
                                    for(var i=0;i<result.Data.Result.length;i++){
                                    	if(result.Data.Result[i]['工号']==null){
                                    		result.Data.Result[i]['工号']='';
                                    	}
                                    }
                                   
                                   returnData.data = result.Data.Result;
                                }
                                callback(returnData);								                                
                            }
                        });
                    },
                    "columns": ininDataColums,
                    "columnDefs": ininDataColumnDefs
                });
                CostDetail.on('draw.dt', function () {
                    CostDetail.column(0, {
                        search: 'applied',
                        order: 'applied'
                    }).nodes().each(function (cell, i) {
                        i = i + 1;
                        var page = CostDetail.page.info();
                        var pageno = page.page;
                        var length = page.length;
                        var columnIndex = (i + pageno * length);
                        cell.innerHTML = columnIndex;
                    });
                });
                $('#EmployeeCostDetail_s tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        CostDetail.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
                $('#EmployeeCostDetail_s tbody').on('click', 'span', function () {
                    var data = CostDetail.rows($(this).parents('tr')).data();
                    $('#txtStartDate_statistics').val($('#txtStartDate_statisticsCost').val());
                    $('#txtEndDate_statistics').val($('#txtEndDate_statisticsCost').val());
                    $('#txtQueryKeywords').val(data[0].工号);
                    $('#costTotalList').hide();
                    $('#divDataTableView').show();
                    table.ajax.reload();


                });
            },
            load_view: function () {
                var _this = this;
                table = $('#example_statistics').DataTable({
                    pagingType: "full_numbers",
                    processing: true,
                    deferRender: true,
                    dom: "Bfrtip",
                    buttons: [{
                        extend: "print",
                        exportOptions: {
                            "columns": [1, 2, 3, 4, 5, 6, 7]
                        }
                    }],
                    responsive: !0,
                    serverSide: true,
                    ajax: function (data, callback, settings) { 
                        var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "PageSize": data.length,
                            "PageIndex": (data.start / data.length) + 1,
                            "Parameters": {
                                "Keywords": $('#txtQueryKeywords').val().trim(),
                                "StartDate": $('#txtStartDate_statistics').val(),
                                "EndDate": $('#txtEndDate_statistics').val()
                            }
                        };
                        
                        var url = eosCommon.ENTERPRISE_API + "api/expense/query2";
                        eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                            if (eosCommon.checkCode(result.State, result.Message)) {
                                var returnData = {};
                                if (result.Data == "") {
                                    returnData.draw = data.draw;
                                    returnData.recordsTotal = 0;
                                    returnData.recordsFiltered = 0;
                                    returnData.data = [];
                                }
                                else {
                                    returnData.draw = data.draw;
                                    returnData.recordsTotal = result.Data.Total;
                                    returnData.recordsFiltered = result.Data.Total;
                                    returnData.data = result.Data.Result;
                                }
                                callback(returnData);
                                 $(function(){
                   					eosCommon.eosOperators(eosCommon.eosOperDataHandle());	
                   				 });
                            }
                        });
                    },
                    "columns": [
                        { defaultContent: "" },
                        { data: "EmployeeNo" },
                        { data: "UserName" },
                        { data: "ExpenseItemName" },
                        { data: "Cost" },
                        { data: "Usage" },
                        { data: "CostDate" },
                        { data: "ProjectName" }
                        ,
                        { "defaultContent": "<span class='OperatorBtnEdit OperatorEdit' data='2' title='编辑信息'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除信息'><i class='fa fa-trash-o'></i></span>" }
                    ]
                });
                table.on('draw.dt', function () {
                    table.column(0, {
                        search: 'applied',
                        order: 'applied'
                    }).nodes().each(function (cell, i) {
                        i = i + 1;
                        var page = table.page.info();
                        var pageno = page.page;
                        var length = page.length;
                        var columnIndex = (i + pageno * length);
                        cell.innerHTML = columnIndex;
                    });
                });
                $('#example_statistics tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
                $('#example_statistics tbody').on('click', 'span', function () {
                    var data = table.rows($(this).parents('tr')).data();
                    var isNum = $(this).attr("data");
                    if (isNum == "2") {
                        //编辑信息赋值 函数
                        ExpenseId = data[0].ExpenseId;
                        $("#btnAddEdit").attr("data", "2");
                        $('#costTotalAdd').show();
                        $('#divDataTableView').hide();
                        _this.bind_AddEditCostView(data);
                    }
                    else if (isNum == "3") {
                        //删除信息赋值 函数
                        ExpenseId = data[0].ExpenseId;
                        vdialog({
                            type: 'confirm',
                            title: '提示',
                            content: eosCommon.DELETE_MSG_ASK,
                            ok: function () { _this.delRequest(); },
                            cancel: true,
                            modal: true
                        });
                    }
                });
            },
            bind_ExpenseItem: function () {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken")
                };
                var url = eosCommon.COMMON_API + "api/common/expenseitem";
                eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        var selExpenseItem = $("#selExpenseItem");
                        selExpenseItem.empty();
                        var json = result.Data;
                        for (var ind in json) {
                            selExpenseItem.append("<option value='" + json[ind].ExpenseItemId + "'>" + json[ind].ExpenseItemName + "</option>");
                        }
                        $("#selExpenseItem").selectpicker('refresh');
                        var selName = $('#selExpenseItem option:selected').text();
                        _this.is_Other(selName);
                    }
                });
                $('#selExpenseItem').change(function () {
                    var selName = $('#selExpenseItem option:selected').text();
                    _this.is_Other(selName);
                });
            },
            is_Other: function (selName) {
                if (selName == "其它") {
                    $('#IsOther').show();
                    $('#txtOtherExpenseName').attr("class", "form-control required");
                    $('#txtOtherExpenseName').attr("data-valid", "isNonEmpty||between:1-25");
                    $('#txtOtherExpenseName').attr("data-error", "其他费用说明不能为空||其他费用说明长度为25位");
                }
                else {
                    $('#txtOtherExpenseName').attr("class", "form-control");
                    $('#IsOther').hide();
                }
            },
            btnQueryCostList: function () {
                table.ajax.reload();
            },
            btnQueryCost: function () {
                CostDetail.ajax.reload();
            },
            bind_AddEditCostView: function (data) {
                eosCommon.resetFrom();
                if (data == null) {
                    $(".view-title").html("新增费用");
                    $('#txtUserName').val("");
                    $('#hidUserId').val("");
                    $('#txtProjectName').val("");
                    $('#hidProjectId').val("");
                    $("#selExpenseItem").selectpicker('refresh');
                    $('#txtOtherExpenseName').val("");
                    $('#txtCostDate').val("");
                    $('#txtCost').val("");
                    $('#txtUsage').val("");
                    this.bindUpFileImg(null, null);
                }
                else {
                    $(".view-title").html("编辑费用");
                    this.propsEmployeedata.name=data[0].UserName;
                    this.propsEmployeedata.id=data[0].EmployeeId;
                    $('#txtProjectName').val(data[0].ProjectName);
                    $('#hidProjectId').val(data[0].ProjectId);
                    $("#selExpenseItem option[value='" + data[0].ExpenseItemId + "']").prop("selected", true);
                    $("#selExpenseItem").selectpicker('refresh');
                    $('#txtOtherExpenseName').val(data[0].OtherExpenseName);
                    this.is_Other(data[0].ExpenseItemName);
                    $('#txtCostDate').val(data[0].CostDate);
                    $('#txtCost').val(data[0].Cost);
                    $('#txtUsage').val(data[0].Usage);
                    var ResourceIds = [];
                    var imgUrls = [];
                    if (data[0].Attachments != null && data[0].Attachments != "") {
                        for (var i = 0; i < data[0].Attachments.length; i++) {
                            ResourceIds.push(data[0].Attachments[i].ResourceId);
                            imgUrls.push(data[0].Attachments[i].ResourceUrl);
                        }
                    }
                    this.bindUpFileImg(ResourceIds, imgUrls);
                }
            },
            addRequest: function (Attachments) {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "ProjectId": $('#hidProjectId').val(),
                        "EmployeeId": _this.propsEmployeedata.id,
                        "ExpenseItemId": $('#selExpenseItem option:selected').val(),
                        "OtherExpenseName": $('#txtOtherExpenseName').val(),
                        "Cost": $('#txtCost').val(),
                        "Usage": $('#txtUsage').val(),
                        "CostDate": $('#txtCostDate').val(),
                        "Attachments": Attachments
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/expense/insert";
                eosCommon.eosAjax(url, "POST", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                        table.ajax.reload();
                        _this.btnReturnView();
                        $(".loading_btn").button('reset');
                    }
                });
            },
            editRequest: function (Attachments) {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "ExpenseId": ExpenseId,
                        "ProjectId": $('#hidProjectId').val(),
                        "EmployeeId": _this.propsEmployeedata.id,
                        "ExpenseItemId": $('#selExpenseItem option:selected').val(),
                        "OtherExpenseName": $('#txtOtherExpenseName').val(),
                        "Cost": $('#txtCost').val(),
                        "Usage": $('#txtUsage').val(),
                        "CostDate": $('#txtCostDate').val(),
                        "Attachments": Attachments
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/expense/update";
                eosCommon.eosAjax(url, "PUT", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                        table.ajax.reload();
                        _this.btnReturnView();
                        $(".loading_btn").button('reset');
                    }
                });
            },
            delRequest: function () {
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "ExpenseId": ExpenseId
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/expense/delete";
                eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                        table.ajax.reload();
                    }
                });
            },
            bindUpFileImg: function (ResourceIds, imgUrls) {
                $("#imgBox1").empty();
                $("#imgBox1").html(
                    '<div class="uploader_img1 eos_uploader_img">' +
                    '<div class="queueList">' +
                    '<div id="dndArea" class="placeholder">' +
                    '<div id="filePickerImg1">点击选择图片</div>' +
                    '</div>' +
                    '<ul class="filelist clearfix"></ul>' +
                    '</div>' +
                    '<div class="statusBar" style="display:none;">' +
                    '<div class="btns">' +
                    '<div id="continueImgBtn1"></div><div class="uploadBtn">开始上传</div>' +
                    '</div>' +
                    '<div class="info"></div>' +
                    '</div>' +
                    '</div>'
                );

                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "ResourceType": "0",
                    "Title": "发票",
                    "Description": "发票"
                };
                eosCommon.eosUploaderImg({
                    'uploaderObj': 'uploaderImg1',
                    'uploaderBox': '.uploader_img1',
                    'uploaderList': '.queueList',
                    'initBtn': '#filePickerImg1',
                    'continueBtn': '#continueImgBtn1',
                    'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                    'data': param,
                    'fileNumLimit': 3,
                    'fileSingleSizeLimit': 3 * 1024 * 1024,
                    'ResourceIds': ResourceIds,
                    'imgUrls': imgUrls,
                    'succ': function (result) {
                        //$('#lblResourceId').text(result.Data[0].ResourceId);
                    },
                    'del': function (result) {
                        //删除资源ID对应的文件
                        if (result != "") {
                            var param = {
                                "AccessToken": eosCommon.storage.get("AccessToken"),
                                "Parameters": {
                                    "ResourceId": result,
                                    "ResourceType": "0"
                                }
                            };
                            var url = eosCommon.RESOURCES_API + "api/resource/delete";
                            eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                                if (eosCommon.checkCode(result.State, result.Message)) {

                                }
                            });
                        }
                    }
                });
            },
            btnReturn: function () {
                $('#costTotalList').show();
                $('#costTotalAdd').hide();
                $('#divDataTableView').hide();
                this.btnQueryCostList();
                this.btnQueryCost();
            },
            btnReturnView: function () {
                $("#divDataTableView").show();
                $('#costTotalList').hide();
                $('#costTotalAdd').hide();
                this.btnQueryCostList();
                this.btnQueryCost();
            },
            addEditCost: function (data) {
                $("#btnAddEdit").attr("data", "1");
                $('#costTotalList').hide();
                $('#divDataTableView').hide();
                $('#costTotalAdd').show();
                this.bind_AddEditCostView(null);
            },
            btnSaveExpense: function () {
                var isNum = $("#btnAddEdit").attr("data");
                var Attachments = [];
                var newImage = 0;
                $(".uploader_img1 .queueList .filelist .item").each(function () {
                    if ($(this).attr("data") != null && $(this).attr("data") != "") {
                        if ($(this).attr("data") != "dataImg") {
                            Attachments.push($(this).attr("data"));
                        }
                        else {
                            Attachments.push($(this).attr("id"));
                        }
                    }
                    if ($(this).attr("data") == null) {
                        newImage++;
                    }
                });
                if (isNum == "1") {
                    if (!verifyCheck._click("verifyCheck")) {
                        return false;
                    } else {
                        //添加发票
                        if (Attachments.length <= 0) {
                            vdialog({
                                type: 'error',
                                title: '提示',
                                content: '请添加发票',
                                ok: true,
                                cancel: true,
                                modal: true
                            });
                            return false;
                        }
                        else if (newImage > 0) {
                            vdialog({
                                type: 'error',
                                title: '提示',
                                content: '请先上传新添加的发票',
                                ok: true,
                                cancel: true,
                                modal: true
                            });
                            return false;
                        }
                        else {
                            btn = $(".loading_btn").button('loading');
                            this.addRequest(Attachments);
                        }
                    }
                }
                else if (isNum == "2") {
                    if (!verifyCheck._click("verifyCheck")) {
                        return false;
                    } else {
                        //修改发票
                        if (Attachments.length <= 0) {
                            vdialog({
                                type: 'error',
                                title: '提示',
                                content: '请添加发票',
                                ok: true,
                                cancel: true,
                                modal: true
                            });
                            return false;
                            return false;
                        }
                        else if (newImage > 0) {
                            vdialog({
                                type: 'error',
                                title: '提示',
                                content: '请先上传新添加的发票',
                                ok: true,
                                cancel: true,
                                modal: true
                            });
                            return false;
                        }
                        else {
                            btn = $(".loading_btn").button('loading');
                            this.editRequest(Attachments);
                        }
                    }
                }
            },
        },
        updated:function(){

        	
        },
   
        mounted: function() {
            var _this = this;
//          $(function(){
//				eosCommon.eosOperators(eosCommon.eosOperDataHandle());            	          	
//          });
            this.bind_DateTime();
            this.load_Charts();
            this.bind_EmployeeCostTilte();
            this.load_view();
            this.bind_ExpenseItem();
            verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
            $('#txtQueryCost').bind('keypress',function(event){
                if(event.keyCode == "13"){
                    table.ajax.reload();
                }
            });
            $('#txtQueryKeywords').bind('keypress',function(event){
                if(event.keyCode == "13"){
                    table.ajax.reload();
                }
            });
            $("#txtCostDate").change(function (){
                if($("#txtCostDate").val() != ''){
                    $('#txtCostDate').next('.valid-form-group-addon').find('.focus').html('');
                }
            });
        }
    }
</script>
<style>

</style>
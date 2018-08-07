<template>
    <div>
        <div>
            <!--考勤统计列表开始-->
            <div id="divDataTableView" class="card-box table-responsive">
                <div class="row">
                    <div class="col-sm-6 col-md-4 col-lg-2">
                        <span class="size20 font-bold">考勤统计</span>
                    </div>
                </div>
                <hr class="divider mb-10 mt-10">
                <div class="row">
                    <div class="col-lg-12 OperatorSearch">
                        <span class="OrgTopAliginTime">
                            <span id="StartTime" class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                <input id="txtStartTime" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </span>
                            <input type="hidden" id="dtp_input1" value="" />
                        </span>
                        <span class="OrgTopAliginTime">
                            <span id="EndTime" class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                <input id="txtEndTime" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                            </span>
                            <input type="hidden" id="dtp_input1" value="" />
                        </span>
                        <span class="OrgTopAligin">
                            <input id="txtKeywords" type="search" class="form-control" placeholder="工号/姓名">
                        </span>
                        <span class="OrgTopAligin">
                            <button id="btnQuery" type="button" class="btn btn-default waves-effect waves-light" v-on:click="btnQuery()">
                                <i class="fa fa-search m-r-5"></i>查找
                            </button>
                        </span>
                        <span class="frBtn">
                            <button type="button" class="btn btn-default waves-effect waves-light" @click="exportTable">
                                导出考勤报表
                            </button>
                        </span>
                    </div>
                </div>
                <div class="attendanceViewBox" style="width:100%">
                    <div>
                        <table id="example_att" class="table table-striped table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th style="width: 35px;">序号</th>
                                    <th>工号</th>
                                    <th>姓名</th>
                                    <th>部门</th>
                                    <th>出勤天数</th>
                                    <th>考勤记录数</th>
                                    <th>上班考勤</th>
                                    <th>下班考勤</th>
                                    <th>外出签到</th>
                                    <th>异常考勤</th>
                                    <th>正常考勤</th>
                                    <th>起始日期</th>
                                    <th>结束日期</th>
                                    <th class="w-40">操作</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <!--考勤统计列表结束-->
            <!--查询考勤明细开始-->
            <div id="divAttendanceDetails" class="card-box table-responsive" style="display: none">
                <div class="row">
                    <div class="col-sm-12">
                        <label class="size20 font-bold">考勤明细</label>
                        <button type="button" class="btnReturn btn btn-white pull-right" v-on:click="btnReturn()">
                            <i class="fa fa-mail-reply-all m-r-5"></i>返回
                        </button>
                    </div>
                </div>
                <hr class="divider mb-10 mt-10">
                <div class="row pl-10">
                    <span class="OrgTopAligin">
                        <input id="txtKeywordsDetails" type="search" class="form-control" placeholder="工号/姓名">
                    </span>
                    <span class="OrgTopAliginTime">
                        <span id="StartTimeDetails" class="input-group date form_date" data-date="2016-10-01" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
                            <input id="txtStartTimeDetails" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        </span>
                    </span>
                    <span class="OrgTopAliginTime">
                        <span id="EndTimeDetails" class="input-group date form_date" data-date="2016-10-01" data-date-format="yyyy-mm-dd" data-link-format="yyyy-mm-dd">
                            <input id="txtEndTimeDetails" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        </span>
                    </span>
                    <span class="OrgTopAligin">
                        <button type="button" class="btn btn-default waves-effect waves-light" v-on:click="btnQueryDetails()">
                            <i class="fa fa-search m-r-5"></i>查找
                        </button>
                    </span>
                </div>
                <hr class="divider mt-10">
                <div class="attendanceBox" style="width: 100%">
                    <div>
                        <table id="example_att_detail" class="table table-striped table-bordered" width="100%">
                            <thead>
                                <tr>
                                    <th style="width: 35px;">序号</th>
                                    <th>工号</th>
                                    <th>姓名</th>
                                    <th>部门</th>
                                    <th>考勤类型</th>
                                    <th>考勤状态</th>
                                    <th>记录时间</th>
                                    <th>记录地址</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
            <!--查询考勤明细结束-->
        </div>
    </div>
</template>
<script>
var table;
var EmployeeId = "0";
var AttendanceId;
var tableDetails;
var btn = ''
import qs from 'qs'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const URL = Common.Const.url
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
export default {
	
		data(){
			return{}
		},
    methods: {
        exportTable(){
          let vm = this;
          let params = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "Parameters": {
                "Keywords": $('#txtKeywords').val().trim(),
                "StartTime": $('#txtStartTime').val(),
                "EndTime": $('#txtEndTime').val()
            }
          };
          params = qs.stringify(params)
          let url = URL.EXPORTSUMMARY
          window.location.href = `${url}?${params}`
        },
        load_StartEndDate: function () {
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
            $('#txtStartTimeDetails').val(eosCommon.getTime("yyyy-MM-dd", -30));
            $('#txtEndTimeDetails').val(eosCommon.getTime("yyyy-MM-dd", 0));
            $('#EndTimeDetails').datetimepicker('setStartDate', $("#txtStartTimeDetails").val());
            $('#StartTimeDetails').datetimepicker('setEndDate', $("#txtEndTimeDetails").val());
            $("#txtStartTimeDetails").change(function (){
                $('#EndTimeDetails').datetimepicker('setStartDate', $(this).val());
            });
            $("#txtEndTimeDetails").change(function (){
                $('#StartTimeDetails').datetimepicker('setEndDate', $(this).val());
            });
            
            $('#txtStartTime').val(eosCommon.getTime("yyyy-MM-dd", -30));
            $('#txtEndTime').val(eosCommon.getTime("yyyy-MM-dd", 0));
            $('#EndTime').datetimepicker('setStartDate', $("#txtStartTime").val());
            $('#StartTime').datetimepicker('setEndDate', $('#txtEndTime').val());
            $("#txtStartTime").change(function (){
                $('#EndTime').datetimepicker('setStartDate', $(this).val());
            });
            $("#txtEndTime").change(function (){
                $('#StartTime').datetimepicker('setEndDate', $(this).val());
            });
        },
        load_table: function () {
            verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
            $('#txtKeywords').bind('keypress',function(event){
                if(event.keyCode == "13"){
                    table.ajax.reload();
                }
            });
            table = $('#example_att').DataTable({
                pagingType: "full_numbers",
                processing: true,
                deferRender: true,
                dom: "Bfrtip",
                buttons: [],
                responsive: !0,
                serverSide: true,
                ajax: function (data, callback, settings) {
                    var param = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "PageSize": data.length,
                        "PageIndex": (data.start / data.length) + 1,
                        "Parameters": {
                            "Keywords": $('#txtKeywords').val().trim(),
                            "StartTime": $('#txtStartTime').val(),
                            "EndTime": $('#txtEndTime').val()
                        }
                    };
                    var url = eosCommon.ENTERPRISE_API + "api/attendance/summary";
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
                        }
                    });
                },
                "columns": [
                    { defaultContent: "" },
                    { data: "EmployeeNo" },
                    { data: "ChineseName" },
                    { data: "DepartmentName" },
                    { data: "AttendanceDays" },
                    { data: "AttendanceCount" },
                    { data: "FirstAttendanceCount" },
                    { data: "SecondAttendanceCount" },
                    { data: "ThirdAttendanceCount" },
                    { data: "AbnormalCount"},
                    { data: "NormalCount" },
                    { data: "StartTime" },
                    { data: "EndTime" },
                    { "defaultContent": "<span class='OperatorBtnView' data='2' title='查看考勤明细'><i class='fa fa-eye'></i></span>" }
                ],
                 "columnDefs": [
                    {
                        "targets": [9],
                        "render": function (data) {
                            var html = data;
                            if (data > 0) {
                                html = "<label class='text-danger'>"+data+"</label>"
                            }
                            return html
                        }
                    }
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
            $('#example_att tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
            $('#example_att tbody').on('click', 'span', function () {
                var data = table.rows($(this).parents('tr')).data();
                var isNum = $(this).attr("data");
                if (isNum == "2") {
                    //查看考勤明细
                    EmployeeId = data[0].EmployeeId;
                    $('#txtKeywordsDetails').val(data[0].EmployeeNo);
                    $('#txtStartTimeDetails').val($('#txtStartTime').val());
                    $('#txtEndTimeDetails').val($('#txtEndTime').val());
                    $('#divDataTableView').hide();
                    $('#divAttendanceDetails').show();
                    tableDetails.ajax.reload();
                }
            });
        },
        load_tableDetails: function () {
        	var _this = this;
            tableDetails = $('#example_att_detail').DataTable({
                pagingType: "full_numbers",
                processing: true,
                deferRender: true,
                dom: "Bfrtip",
                buttons: [],
                responsive: !0,
                serverSide: true,
                ajax: function (data, callback, settings) {
                    var param = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "PageSize": data.length,
                        "PageIndex": (data.start / data.length) + 1,
                        "Parameters": {
                            "Keywords": $('#txtKeywordsDetails').val(),
                            "StartTime": $('#txtStartTimeDetails').val(),
                            "EndTime": $('#txtEndTimeDetails').val()
                        }
                    };
                    var url = eosCommon.ENTERPRISE_API + "api/attendance/summarydetail";
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
                        }
                    });
                },
                "columns": [
                    { defaultContent: "" },
                    { data: "EmployeeNo" },
                    { data: "ChineseName" },
                    { data: "DepartmentName" },
                    { data: "RecordTypeName" },
                    { data: "IsAbnormal" },
                    { data: "RecordTime" },
                    { data: "Address" }

                ],
                "columnDefs": [
                    {
                        "targets": [5],
                        "render": function (data) {
                            var html = '';
                            if (data == 0) {
                                html = "正常"
                            }
                            else if (data == 1) {
                                html = "异常"
                            }
                            return html
                    }
                }
                ]
            });
            tableDetails.on('draw.dt', function () {
                tableDetails.column(0, {
                    search: 'applied',
                    order: 'applied'
                }).nodes().each(function (cell, i) {
                    i = i + 1;
                    var page = tableDetails.page.info();
                    var pageno = page.page;
                    var length = page.length;
                    var columnIndex = (i + pageno * length);
                    cell.innerHTML = columnIndex;
                });
            });
            $('#example_att_detail tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    tableDetails.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
            $('#example_att_detail tbody').on('click', 'span', function () {
                var data = tableDetails.rows($(this).parents('tr')).data();
                var isNum = $(this).attr("data");
            });
        },
        btnReturn: function () {
            $('#divDataTableView').show();
            $('#divAttendanceDetails').hide();
        },
        btnQuery: function () {
            table.ajax.reload();
        },
        btnQueryDetails: function () {
            tableDetails.ajax.reload();
        }

    },
    mounted: function() {
    	$(function(){
				eosCommon.eosOperators(eosCommon.eosOperDataHandle());            	          	
            });
        this.load_StartEndDate();
        this.load_table();
        this.load_tableDetails();
        	
    }
}
</script>
<style scoped>
.frBtn{float: right;margin-top: 7px;}
</style>
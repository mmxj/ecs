<template>
    <div>
        <div id="divDataTableView" class="card-box m-page table-responsive" style="min-height: 300px;">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-2">
                    <span class="size20 font-bold">意见反馈</span>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">
            <div class="row OperatorSearch">
                <div class="col-lg-12">
                    <span class="OrgTopAligin">
                        <select  id="selCategory" class="form-control selectpicker" data-size="6" data-style="btn-white">
                            <option value="">全部反馈类型</option>
                            <option value="1">意见建议</option>
                            <option value="2">App使用</option>
                            <option value="3">企业管理后台</option>
                            <option value="4">现场设备</option>
                            <option value="5">网关配置</option>
                            <option value="6">商务合作</option>
                            <option value="7">其它</option>
                        </select>
                    </span>
                    <span class="OrgTopAliginTime">
                        <span id="startTime" class="input-group date form_date" data-date="2016-10-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="txtStartDate" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        </span>
                        <input type="hidden" id="dtp_input1" value=""/>
                    </span>
                    <span class="OrgTopAliginTime">
                        <span id="endTime" class="input-group date form_date" data-date="2016-10-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="txtEndDate" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        </span>
                        <input type="hidden" id="dtp_input1" value=""/>
                    </span>
                    <span class="OrgTopAligin">
                        <button id="btnQuery" type="button" class="btn btn-default" data-toggle="" data-target="#longzhoufeng1">
                            <i class="fa fa-search m-r-5"></i>查找
                        </button>
                    </span>
                </div>
            </div>
            <table id="example_feedback" class="table table-striped table-bordered" width="100%">
                <thead>
                <tr>
                    <th>序号</th>
                    <th>反馈类型</th>
                    <th style="max-width: 970px;">反馈内容</th>
                    <th>联系方式</th>
                    <th>反馈人</th>
                    <th>反馈时间</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        mounted: function() {
        	eosCommon.eosOperators(eosCommon.eosOperDataHandle()); 
            $("#selCategory").selectpicker("refresh");
            var table;
            $(document).ready(function () {
                $('#txtStartDate').val(eosCommon.getTime("yyyy-MM-dd", -30));
                $('#txtEndDate').val(eosCommon.getTime("yyyy-MM-dd", 1));
                $('#endTime').datetimepicker('setStartDate', $("#txtStartDate").val());
                $('#startTime').datetimepicker('setEndDate', $("#txtEndDate").val());
                $("#txtStartDate").change(function (){
                    $('#endTime').datetimepicker('setStartDate', $(this).val());
                });
                $("#txtEndDate").change(function (){
                    $('#startTime').datetimepicker('setEndDate', $(this).val());
                });
                table = $('#example_feedback').DataTable({
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
                                "Category": $('#selCategory').val(),
                                "StartDate": $('#txtStartDate').val()+" 00:00:00",
                                "EndDate": $('#txtEndDate').val()+" 23:59:59"
                            }
                        };

                        var url = eosCommon.PLATFORM_API + "api/feedback/query";
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
                        { data: "CategoryName" },
                        { data: "FeedbackContent", className: "txt_lt" },
                        { data: "ContactPhone" },
                        { data: "FeedbackPerson" },
                        { data: "CreatedOn" }
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

                $('#example_feedback tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                $('#selCategory').change(function () {
                    table.ajax.reload();
                });
                $('#btnQuery').click(function () {
                    table.ajax.reload();
                });

            });
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
        }
    }
</script>
<style>

</style>
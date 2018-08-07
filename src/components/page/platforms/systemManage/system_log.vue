<template>
    <div>
        <div class="card-box table-responsive">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-2">
                    <span class="size20 font-bold">系统日志</span>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">
            <div class="row OperatorSearch">
                <div class="col-lg-12">
                    <span class="OrgTopAligin">
                        <select id="selLogType" class="form-control selectpicker" data-style="btn-white">
                            <option value="">日志类型</option>
                            <option value="ERROR">ERROR</option>
                            <option value="DEBUG">DEBUG</option>
                            <option value="INFO">INFO</option>
                        </select>
                    </span>
                    <span class="OrgTopAligin">
                        <input id="txtModel" type="search" class="form-control" placeholder="故障位置">
                    </span>
                    <span class="OrgTopAliginTime">
                        <span id="startTime" class="input-group date form_date" data-date="2016-10-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="txtStartDate" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        </span>
                    </span>
                    <span class="OrgTopAliginTime">
                        <span id="endTime" class="input-group date form_date" data-date="2016-10-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                            <input id="txtEndDate" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                        </span>
                    </span>
                    <span class="OrgTopAligin">
                        <button id="btnQuery" type="button" class="btn btn-default">
                            <i class="fa fa-search m-r-5"></i>查找
                        </button>
                    </span>
                </div>
            </div>
            <table id="example_log" class="table table-striped table-bordered" width="100%">
                <thead>
                <tr>
                    <th>操作</th>
                    <th class="w-30">序号</th>
                    <th>故障位置</th>
                    <th>日志类型</th>
                    <th>内容</th>
                    <th>创建时间</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</template>
<script>
    export default {
        mounted: function () {
        	eosCommon.eosOperators(eosCommon.eosOperDataHandle()); 
            $("#selLogType").selectpicker('refresh');
            var table;
            $(document).ready(function () {
                $('#txtStartDate').val(eosCommon.getTime("yyyy-MM-dd", -3));
                $("#txtStartDate").change(function (){
                    $('#endTime').datetimepicker('setStartDate', $(this).val());
                });

                $('#txtEndDate').val(eosCommon.getTime("yyyy-MM-dd", 1));
                $("#txtEndDate").change(function (){
                    $('#startTime').datetimepicker('setEndDate', $(this).val());
                });
                $('#txtModel').bind('keypress',function(event){
                    if(event.keyCode == "13"){
                        table.ajax.reload();
                    }
                });
                table = $('#example_log').DataTable({
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
                                "Model": $('#txtModel').val().trim(),
                                "LogType": $('#selLogType').val(),
                                "StartDate": $('#txtStartDate').val(),
                                "EndDate": $('#txtEndDate').val()
                            }
                        };
                        var url = eosCommon.PLATFORM_API + "api/System/SystemLog";
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
                        {
                            "class": "details-control",
                            "orderable": false,
                            "data": null,
                            "defaultContent": ""
                        },
                        { defaultContent: "" },
                        { data: "Model" },
                        { data: "Type" },
                        { data: "Message" },
                        { data: "CreatedOn" }
                    ]
                });


                var detailRows = [];
                $('#example_log tbody').on('click', 'tr td.details-control', function () {
                    var tr = $(this).closest('tr');
                    var row = table.row(tr);
                    var idx = $.inArray(tr.attr('id'), detailRows);

                    if (row.child.isShown()) {
                        tr.removeClass('details');
                        row.child.hide();

                        detailRows.splice(idx, 1);
                    }
                    else {
                        tr.addClass('details');
                        row.child(format(row.data())).show();

                        if (idx === -1) {
                            detailRows.push(tr.attr('id'));
                        }
                    }
                });
                table.on('draw', function () {
                    $.each(detailRows, function (i, id) {
                        $('#' + id + ' td.details-control').trigger('click');
                    });
                });

                table.on('draw.dt', function () {
                    table.column(1, {
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

                $('#example_log tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                $('#selLogType').change(function () {
                    table.ajax.reload();
                });
                $('#btnQuery').click(function () {
                    table.ajax.reload();
                });

            });
            function format(d) {
                var atStr=d.StackTrace;
                var dataAt=atStr.replace(/(\r\n)|(\n)/g,'<br>');
                return "<p class='text-left pl-10 pr-10'>堆栈信息<br>"+dataAt+"</p>";
            }
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
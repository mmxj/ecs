<template>
    <div id="sim-content">  
        <!--网关信息开始-->
        <div id="EosBaseDve2">
            <!--网关发行列表开始-->
            <div id="EosBaseDveList" class="card-box table-responsive">

                <div class="row">
                    <div class="col-sm-12">
                        <span class="size20 font-bold">物联网(SIM)卡管理</span>
                    </div>
                </div>

                <hr class="divider mb-10 mt-10">

                <div class="row">
                    <div class="col-lg-12">
                        <span class="OrgTopAligin OperatorInsert">
                            <button id="btnInsertDev" type="button" class="btn btn-default">
                                <i class="fa fa-plus m-r-5"></i>新增
                            </button>
                        </span>
                        <span class="OrgTopAligin OperatorImports">
                            <button id="EosBaseStockImport" type="button" class="btn btn-default">
                                批量导入
                            </button>
                        </span>
                       <span class="OperatorSearch">
                   			 	<span class="OrgTopAligin">
		                            <select id="selQuerySimType" class="form-control selectpicker" data-style="btn-white">
		                                <option value="">全部SIM卡类型</option>
		                                <option value="1">电信</option>
		                                <option value="2">移动</option>
		                                <option value="3">联通</option>
		                            </select>
                        		</span>
		                        <span class="OrgTopAligin">
		                            <input id="txtQuerySimImsi" type="search" class="form-control w-128" placeholder="SIM编号">
		                        </span>
		                        <span class="OrgTopAligin">
		                            <button id="btnQuery" type="button" class="btn btn-default">
		                                <i class="fa fa-search m-r-5"></i>查找
		                            </button>
		                        </span>
                       </span>
                    </div>
                </div>
                <table id="exampleDev2" class="table table-striped table-bordered" width="100%">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>SIM编号</th>
                            <th>SIM卡类型</th>
                            <th>是否使用</th>
                            <th>创建人</th>
                            <th>创建时间</th>
                            <th class="w-80" style="width: 40px;">操作</th>
                        </tr>
                    </thead>
                </table>

            </div>
            <!--网关发行列表结束-->

            <!--增加网关信息开始-->
        <div  id="EosBaseDveAdd" class="card-box table-responsive" style="display: none">
            <div class="row">
                <div class="col-md-6">
                    <span class="size20 font-bold win-title">新增SIM卡</span>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">
            <div class="row">
                <div class="col-md-12">
                    <div id="verifyCheck">
                        <div class="form-horizontal content-box ">
                            <div class="form-group">
                                <label class="content-title-left">
                                    <em class="ak_required_em">*</em>SIM编号
                                </label>
                                <div class="col-lg-5 col-xs-8">
                                    <span class="valid-form-group">
                                        <label class="focus valid"></label>
                                    </span>
                                    <input id="txtSimImsi" type="text" maxlength="15" class="form-control required"  data-valid="isNonEmpty||isInt||between:15-15" data-error="SIM编号不能为空||SIM编号必须为纯数字||SIM编号长度15位" placeholder="请输入SIM编号"/>
                                    <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">
                                    <em class="ak_required_em">*</em>SIM卡类型
                                </label>
                              <div class="col-lg-5 col-xs-8">
                                    <select id="selSimType" class="form-control selectpicker" data-style="btn-white">
                                        <option value="1">电信</option>
                                        <option value="2">移动</option>
                                        <option value="3">联通</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="form-horizontal mt-10 content-box ">
                            <div class="form-group">
                                <label class="content-title-left text-right">是否使用</label>
                                <div class="col-lg-5 col-xs-8">
                                    <div class="radio radio-custom radio-inline">
                                        <input type="radio" name="radioIsUsed" value="1" disabled>
                                        <label for="radioShortCutMenu1">
                                            是
                                        </label>
                                    </div>
                                    <div class="radio radio-danger radio-inline">
                                        <input type="radio" name="radioIsUsed" value="0" checked disabled>
                                        <label for="radioShortCutMenu">
                                            否
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-box-footer">
                            <div class="form-group">
                                <label class="content-title-left text-right"></label>
                                <div class="col-lg-5 col-xs-8">
                                    <button type="button" class="btnReturn btn btn-white pull-left">取消</button>
                                    <button id="btnSave" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中...">保存</button>
                                </div>
                            </div>
                        </div>
	                </div>
	            </div>
            </div>
        </div>
        <!--增加网关信息结束-->
        <!--网关导入信息开始-->
        <div  id="EosBaseDveImport" class="card-box table-responsive" style="display: none">
            <div class="row">
                <div class="col-md-6">
                    <span class="size20 font-bold">物联网(SIM)卡导入</span>
                </div>
                <div class="col-md-6">
                    <button type="button" class="btnReturn btn btn-white waves-effect waves-light pull-right">取消</button>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">

            <div class="row">
                <div class="col-md-12">
                    <div>
                        <div id="fileBox">
                            <div class="alert alert-info alert-dismissable">
                                <strong>导入说明</strong> 1、先下载SIM卡模版，在对应列填上相应数据。注意，导入文件中的数据行不能超过1万行！
                                <span class="label label-info p-8"><a class="text-white" href="../../../../static/doc/物联(SIM)卡导入模板.xlsx" target="_blank">下载SIM卡模版</a></span>
                            </div>
                            <div id="fileBox1"></div>
                        </div>
                        <div class="mt-20">
                            <div class="form-group">
                                <div class="bg-white">
                                    <table id="viewImport" class="table table-striped table-bordered" width="100%">
                                        <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>SIM编号</th>
                                                <th>SIM卡类型</th>
                                                <th>验证结果</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="content-box-footer-import">
                            <div class="form-group">
                                <button type="button" class="btnReturn btn btn-white pull-left"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
                                <button id="btnSaveTemplateData" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中...">保存</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!--网关导入信息结束-->
        </div>
        <!--网关信息结束-->
    </div>
</template>
<script>
export default {
    mounted: function() {
        var btn = '';
        $("#selQuerySimType").selectpicker("refresh")
        var tableDev;
        var SimCardId;
        $(document).ready(function () {
            verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
            $('#txtQuerySimImsi').bind('keypress',function(event){
                if(event.keyCode == "13"){
                    tableDev.ajax.reload();
                }
            });
            tableDev = $('#exampleDev2').DataTable({
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
                            "SimImsi": $('#txtQuerySimImsi').val().trim(),
                            "SimType": $('#selQuerySimType  option:selected').val()
                        }
                    };
                    var url = eosCommon.PLATFORM_API + "api/base/QueryIotSim";
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
                           eosCommon.eosOperators(eosCommon.eosOperDataHandle());  
                        }
                    });
                },
                "columns": [
                    { defaultContent: "" },
                    { data: "SimImsi"},
                    { data: "SimTypeName" },
                    { data: "IsUsed" },
                    { data: "Creator" },
                    { data: "CreatedOn" },
                    { data: "IsUsed" }
                ],
                "columnDefs": [
                    {
                        "targets": [3],
                        "render": function (data) {
                            var html = '';
                            if (data == 0) {
                                html = "否"
                            }
                            else if (data == 1) {
                                html = "是"
                            }
                            return html
                        }
                    },
                    {
                        "targets": [6],
                        "render" : function (data){
                            var html = '';
                            if(data == 1){
                                html = "<span class='OperatorBtnEdit OperatorEdit pull-right text-left'  data='2' title='修改(SIM)卡号'><i class='fa fa-pencil'></i></span>"
                            }else if(data == 0){
                                html = "<span class='OperatorBtnEdit OperatorEdit pull-right text-left'  data='2' title='修改(SIM)卡号'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除(SIM)卡号'><i class='fa fa-trash-o'></i></span>"
                            }
                            return html;
                        }
                    }
                ]
            });

            tableDev.on('draw.dt', function () {
                tableDev.column(0, {
                    search: 'applied',
                    order: 'applied'
                }).nodes().each(function (cell, i) {
                    i = i + 1;
                    var page = tableDev.page.info();
                    var pageno = page.page;
                    var length = page.length;
                    var columnIndex = (i + pageno * length);
                    cell.innerHTML = columnIndex;
                });
            });

            $('#exampleDev2 tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    tableDev.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });

            $('#exampleDev2 tbody').on('click', 'span', function () {
                var data = tableDev.rows($(this).parents('tr')).data();
                var isNum = $(this).attr("data");
                if (isNum == "2") {
                    //编辑信息赋值 函数
                    $(".win-title").html("修改(SIM)卡号");
                    SimCardId = data[0].SimCardId;
                    bindEosBaseDveAdd(data);
                    $('#btnSave').attr("data", "2");
                    $('#EosBaseDveList').hide();
                    $('#EosBaseDveImport').hide();
                    $('#EosBaseDveAdd').show();
                }
                else if (isNum == "3") {
                    //删除信息赋值 函数
                    SimCardId = data[0].SimCardId;
                    vdialog({
                        type: 'confirm',
                        title: '提示',
                        content: eosCommon.DELETE_MSG_ASK,
                        ok: function () { delRequest(); },
                        cancel: true,
                        modal: true
                    });
                }
            });
            $('#selQuerySimType').change(function () {
                tableDev.ajax.reload();
            });
            $('#btnQuery').click(function () {
                tableDev.ajax.reload();
            });
            $('#btnInsertDev').click(function () {
                $(".win-title").html("新增(SIM)卡号");
                bindEosBaseDveAdd(null);
                $('#btnSave').attr("data", "1");
                $('#EosBaseDveList').hide();
                $('#EosBaseDveImport').hide();
                $('#EosBaseDveAdd').show();
            });
            //网关导入
            $('#EosBaseStockImport').click(function () {
                $('#EosBaseDveList').hide();
                $('#EosBaseDveImport').show();
                $('#EosBaseDveAdd').hide();
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
                    'serverUrl': eosCommon.PLATFORM_API + "api/upload/IotSim",
                    'data': param,
                    'fileNumLimit': 1,
                    'upType': 1,
                    'succ': function (result) {
                        if (eosCommon.checkCode(result.State, result.Message)) {
                            var viewImportData = [];
                            saveImportData = [];
                            errorSign = 0;
                            for (var i = 0; i < result.Data.TotalRows; i++) {
                                var viewTemp = {};
                                viewTemp.RowId = result.Data.UploadData[i]['序号'];
                                viewTemp.IMSI = result.Data.UploadData[i]['IMSI'];
                                viewTemp.SimType = result.Data.UploadData[i]['SIM卡类型'];
                                viewTemp.Message = '正确';
                                var bol = 0;
                                for (var j = 0; j < result.Data.ErrorRows; j++) {
                                    if (result.Data.ErrorMessage[j]['RowId'] == result.Data.UploadData[i]['序号']) {
                                        errorSign++;
                                        bol = 1;
                                        viewTemp.Message = result.Data.ErrorMessage[j]['Message'];
                                    }
                                }
                                viewImportData.push(viewTemp);
                                if (bol == 1) {
                                    continue;
                                }

                                var saveTemp = {};
                                saveTemp.RowId = result.Data.UploadData[i]['序号'];
                                saveTemp.IMSI = result.Data.UploadData[i]['IMSI'];
                                saveTemp.SimType = result.Data.UploadData[i]['SIM卡类型'];
                                saveImportData.push(saveTemp);
                            }
                            bindEosBaseDveImport(viewImportData);
                        }
                    },
                    'del': function (result) {
                        var viewImportData = [];
                        saveImportData = [];
                        errorSign = 0;
                        bindEosBaseDveImport(viewImportData);
                    }
                })
            });
            $('.btnReturn').click(function () {
                btnReturn();
            });
            $('#btnSave').click(function () {
                var isNum = $('#btnSave').attr("data");
                if (isNum == "2") {
                    if (!verifyCheck._click("verifyCheck")) {
                        return false;
                    } else {
                        btn = $(".loading_btn").button('loading');
                        editRequest();
                    }
                }
                else if (isNum == "1") {
                    if (!verifyCheck._click("verifyCheck")) {
                        return false;
                    } else {
                        btn = $(".loading_btn").button('loading');
                        addRequest();
                    }
                }
            });
            $('#btnSaveTemplateData').click(function () {
                if (saveImportData.length <= 0) {
                    vdialog({
                        type: 'error',
                        title: '提示',
                        content: 'SIM编号已重复',
                        cancel: true,
                        modal: true
                    });
                }
                else if (errorSign > 0 && saveImportData.length > 0) {
                    vdialog({
                        type: 'error',
                        title: '提示',
                        content: '验证结果：'+ errorSign + '条错误，' + saveImportData.length + '条正确，确定继续提交正确的数据吗？',
                        ok: function () { saveImport(); },
                        cancel: true,
                        modal: true
                    });
                }
                else {
                    saveImport();
                }

            });
        });

        //返回初始页控制
        function btnReturn() {
            $('#EosBaseDveList').show();
            $('#EosBaseDveAdd').hide();
            $('#EosBaseDveImport').hide();
        }
        //绑定添加和编辑的初始值
        function bindEosBaseDveAdd(data) {
            eosCommon.resetFrom();
            if (data == null) {
                $('#txtSimImsi').removeAttr("disabled");
                $('#txtSimImsi').val("");
                $("#selSimType option[value='1']").prop("selected", true);
                $("#selSimType").selectpicker('refresh');
                $("input[type='radio'][name='radioIsUsed'][value='0']").prop("checked", "checked");
            }
            else {
                $('#txtSimImsi').removeAttr("disabled");
                $('#txtSimImsi').val(data[0].SimImsi);
                if (data[0].IsUsed == 1) {
                    $('#txtSimImsi').attr("disabled", "disabled");
                }
                $("#selSimType option[value='" + data[0].SimType + "']").prop("selected", true);
                $("#selSimType").selectpicker('refresh');
                $("input[type='radio'][name='radioIsUsed'][value='" + data[0].IsUsed + "']").prop("checked", "checked");
            }
        }
        //修改
        function editRequest() {
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "SimCardId": SimCardId,
                    "SimImsi": $('#txtSimImsi').val(),
                    "SimType": $('#selSimType option:selected').val()
                }
            };
            var url = eosCommon.PLATFORM_API + "api/base/UpdateIotSim";
            eosCommon.eosAjax(url, "PUT", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                    tableDev.ajax.reload();
                    btnReturn();
                    $(".loading_btn").button('reset');
                }
            });
        }
        //添加
        function addRequest() {
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "SimImsi": $('#txtSimImsi').val(),
                    "SimType": $('#selSimType option:selected').val()
                }
            };

            var url = eosCommon.PLATFORM_API + "api/base/InsertIotSim";
            eosCommon.eosAjax(url, "POST", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                    tableDev.ajax.reload();
                    btnReturn();
                    $(".loading_btn").button('reset');
                }
            });
        }
        //删除
        function delRequest() {
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "SimCardId": SimCardId
                }
            };
            var url = eosCommon.PLATFORM_API + "api/base/DeleteIotSim";
            eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                    tableDev.ajax.reload();
                }
            });
        }

        //绑定批量导入预览表格数据
        var viewImport;
        var saveImportData = [];
        var errorSign = 0;
        function bindEosBaseDveImport(viewImportData) {
            viewImport = $('#viewImport').DataTable({
                pagingType: "full_numbers",
                processing: true,
                deferRender: true,

                dom: "Bfrtip",
                buttons: [],
                responsive: !0,
                lengthMenu: [[50, 100, 150, -1], [50, 100, 150, "All"]],
                destroy: true,
                data: viewImportData,
                "columns": [
                    { data: "RowId" },
                    { data: "IMSI" },
                    { data: "SimType" },
                    { data: "Message" }

                ],
                "columnDefs": [
                    {
                        "targets": [3],
                        "render": function (data) {
                            var html = '';
                            if (data == "正确") {
                                html = "正确";
                            }
                            else {
                                html = "<p class='text-danger'>" + data + "</p>";
                            }
                            return html
                        }
                    }
                ]
            });
            eosCommon.resetNiceScroll();
            $('#viewImport tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    viewImport.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
        }
        //保存导入验证正确的数据
        function saveImport() {
            btn = $(".loading_btn").button('loading');
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": saveImportData
            };
            var url = eosCommon.PLATFORM_API + "api/base/BatchIotSim";
            eosCommon.eosAjax(url, "POST", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                    tableDev.ajax.reload();
                    saveImportData = [];
                    errorSign = 0;
                    bindEosBaseDveImport(saveImportData);
                    btnReturn();
                    $(".loading_btn").button('reset');
                }
            });

        }
    }
}
</script>
<style>
</style>
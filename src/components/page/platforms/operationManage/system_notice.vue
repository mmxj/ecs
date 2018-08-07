<template>
    <div id="system-notice">
        <!--平台公告列表开始-->
        <div id="EosBaseDveList" class="card-box m-page table-responsive" style="display: none">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-2">
                    <span class="size20 font-bold">平台公告</span>
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
                   <span class="OperatorSearch">
                   		 <span class="OrgTopAligin">
                        <input id="txtQuerySubject" type="search" class="form-control" placeholder="主题">
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
                        <th>主题</th>
                        <th>摘要</th>
                        <th>是否发送</th>
                        <th>发送时间</th>
                        <th>封面</th>
                        <th class="w-80">操作</th>
                    </tr>
                </thead>
            </table>

        </div>
        <!--平台公告列表结束-->

        <!--增加平台公告开始-->
        <div id="SystemNoticeAdd" class="card-box m-page table-responsive">
            <div class="row">
                <div class="col-md-12">
                    <span class="size20 font-bold">新增公告</span>
                    <button type="submit" class="btnReturn btn btn-white pull-right"><i class="fa fa-clock-o mr-5 size16"></i>历史公告</button>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">
            <div class="row">
                <div class="col-md-12">
                    <div id="verifyCheck">
                        <div class="form-horizontal content-box">
                            <div class="form-group">
                                <label class="content-title-left"><em class="ak_required_em">*</em>公告主题</label>
                                <div class="col-lg-6 col-md-9 col-sm-8 col-xs-9">
                                    <span class="valid-form-group">
                                        <label class="focus valid"></label>
                                    </span>
                                    <input id="txtSubject" type="text" maxlength="100" class="form-control required"  data-valid="isNonEmpty||between:1-100||isOtherName" data-error="公告主题不能为空||公告主题长度1-50位||公告主题不能包含特殊字符" placeholder="请输入公告主题"/>
                                    <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left"><em class="ak_required_em">*</em>摘要</label>
                                <div class="col-lg-6 col-md-9 col-sm-8 col-xs-9">
                                    <span class="valid-form-group">
                                        <label class="focus valid"></label>
                                    </span>
                                    <input id="txtAbstract" type="text" maxlength="100" class="form-control required" data-valid="isNonEmpty||between:1-100" data-error="摘要不能为空||摘要长度1-100位"  placeholder="请输入摘要，且摘要最多为100个字符"/>
                                    <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left"><em class="ak_required_em">*</em>公告内容</label>
                                <div class="col-lg-6 col-md-9 col-sm-8 col-xs-9">
                                    <span class="valid-form-group">
                                        <label class="focus valid"></label>
                                    </span>
                                    <textarea id="txtNoticeContent"></textarea>
                                    <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left"><em class="ak_required_em">*</em>封面</label>
                                <div class="col-lg-6 col-md-9 col-sm-8 col-xs-9">
                                    <div id="imgBox1"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">附件</label>
                                <div class="col-lg-9 col-md-9 col-sm-9 col-xs-9">
                                    <div id="fileBox1" style="margin-top: -10px"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">发布人</label>
                                <div class="col-lg-6 col-md-9 col-sm-8 col-xs-9 pt-5">
                                   <code id="sendPerson"></code> 发布时间：<code id="sendTime"></code>
                                </div>
                            </div>
                        </div>
                        <div class="content-box-footer">
                        <div class="form-group">
                            <label class="content-title-left"></label>
                            <div class="col-lg-6 col-md-9 col-sm-8 col-xs-9">
                                <button type="submit" class="btnReturn btn btn-white pull-left"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
                                <button id="btnSend" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="发布中...">发布</button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <!--增加平台公告结束-->

        <!--平台公告查看详情开始-->
        <div  id="SystemNoticeView" class="card-box table-responsive" style="display: none">
            <div class="row">
                <div class="col-md-12">
                    <span class="size20 font-bold">平台公告详情</span>
                    <button type="button" class="btnReturn btn btn-white pull-right">
                        <i class="fa fa-mail-reply-all m-r-5"></i>返回
                    </button>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">
            <div class="row">
                <div class="col-lg-12">
                    <div class="mt-10 ">
                        <div class="row">
                            <div class="col-md-12 text-center pt-20">
                                <span class="size20 font-bold" id="viewSubject"></span>
                            </div>
                        </div>
                        <div class="mt-10 text-center mb-10">
                            <p>发送时间：<code id="viewSendTime"></code></p>
                            <div class="clearfix"></div>
                        </div>
                        <div class="col-md-12 b-1 mb-20">
                            <span class="p-10">摘要 ：<code id="viewAbstract" class="mr-10 text-muted"></code></span>
                        </div>
                        <hr class="divider">
                        <div class="mt-20 mb-10">
                            <div id="viewNoticeContent" class="pull-left p-10" style="line-height: 2"></div>
                            <div class="clearfix"></div>
                        </div>
                        <hr class="divider">
                        <div id="viewAttachment" class="mt-10 mb-10"></div>
                    </div>
                </div>
            </div>
        </div>
        <!--平台公告查看详情结束-->
    </div>
</template>
<script>
var btn = '';
export default {
    mounted: function() {
        var tableDev;
        $(document).ready(function () {
        	eosCommon.eosOperators(eosCommon.eosOperDataHandle()); 
            bindSendPersonTime();
            $("#txtNoticeContent").Editor();
            verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
            $('#txtQuerySubject').bind('keypress',function(event){
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
                            "Subject": $('#txtQuerySubject').val().trim(),
                            "IsSend": $('#selQueryIsSend').val()
                        }
                    };
                    var url = eosCommon.PLATFORM_API + "api/notice/query";
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
                    { data: "Subject", className: "txt_lt" },
                    { data: "Abstract", className: "txt_lt" },
                    { data: "IsSend" },
                    { data: "SendTime" },
                    { data: "CoverUrl"},
                    { "defaultContent": "<span class='OperatorBtnView' data='1' title='查看公告详情'><i class='fa fa-eye'></i></span>" }
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
                        "targets": [5],
                        "render": function (data) {
                            var html = '-';
                            if (data != "") {
                                html = "<img style='width: 50px;height: 50px;' data='2' class='AppLogo' src='" + data + "'/>"
                            }
                            return html
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
                if (isNum == "1") {
                    //详细信息赋值 函数
                    $('#EosBaseDveList').hide();
                    $('#SystemNoticeAdd').hide();
                    $('#SystemNoticeView').show();
                    SystemNoticeView(data);
                }
            });

            $('#btnQuery').click(function () {
                tableDev.ajax.reload();
            });
            $('#btnInsertDev').click(function () {
                eosCommon.resetFrom();
                clearAdd();
                $('#EosBaseDveList').hide();
                $('#SystemNoticeView').hide();
                $('#SystemNoticeAdd').show();
                bindSendPersonTime();
                bindUpFileImg();
            });

            $('.btnReturn').click(function () {
                $('#EosBaseDveList').show();
                $('#SystemNoticeAdd').hide();
                $('#SystemNoticeView').hide();
            });
            //注册发送按钮事件
            $('#btnSend').click(function () {
                addRequest();
            });
            bindUpFileImg();
        });

        //绑定发送人和发送时间
        function bindSendPersonTime() {
            $('#sendPerson').text(eosCommon.storage.get("Account"));
            var myDate = new Date();
            $('#sendTime').text(myDate.toLocaleString());
        }
        //加载图片上传插件
        function bindUpFileImg() {
            var ResourceIds;
            var imgUrls;
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
                "ResourceType": "4",
                "Title": "封面",
                "Description": "封面"
            };
            eosCommon.eosUploaderImg({
                'uploaderObj': 'uploaderImg1',
                'uploaderBox': '.uploader_img1',
                'uploaderList': '.queueList',
                'initBtn': '#filePickerImg1',
                'continueBtn': '#continueImgBtn1',
                'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                'data': param,
                'fileNumLimit': 1,
                'fileSingleSizeLimit': 3 * 1024 * 1024,
                'ResourceIds': ResourceIds,
                'imgUrls': imgUrls,
                'succ': function (result) {
                    $('#lblResourceId').text(result.Data[0].ResourceId);
                },
                'del': function (result) {
                    //删除资源ID对应的文件
                    if (result != "") {
                        var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "Parameters": {
                                "ResourceId": result,
                                "ResourceType": "4"
                            }
                        };
                        var url = eosCommon.RESOURCES_API + "api/resource/delete";
                        eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                            if (eosCommon.checkCode(result.State, result.Message)) {
                                $('#lblResourceId').text("");
                            }
                        });
                    }
                }
            });
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
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "ResourceType": "4",
                "Title": "附件",
                "Description": "附件"
            };
            eosCommon.eosUploaderFile({
                'uploaderObj': 'uploaderFile',
                'uploaderBox': '.uploader_box1',
                'uploaderList': '.uploader-list',
                'initBtn': '#picker',
                'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                'data': param,
                'fileNumLimit': 10,
                'upType': 0,
                'succ': function (result) {},
                'del': function (result) {
                    //删除资源ID对应的文件
                    if (result != "") {
                        var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "Parameters": {
                                "ResourceId": result,
                                "ResourceType": "4"
                            }
                        };
                        var url = eosCommon.RESOURCES_API + "api/resource/delete";
                        eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                            if (eosCommon.checkCode(result.State, result.Message)) {
                                $('#lblResourceId').text("");
                            }
                        });
                    }
                }
            });
        }

        //加载附近下载
        function SystemNoticeView(data) {
            $('#viewSubject').text(data[0].Subject);
            $('#viewAbstract').text(data[0].Abstract);
            $('#viewSendTime').text(data[0].SendTime);
            $('#viewNoticeContent').html(data[0].NoticeContent);

            var allHtml = '';
            if (data[0].AttachmentDetails.length > 0) {
                allHtml += '<div class="text-left ml-20 pb-10">';
                allHtml += '<span class="size20 font-bold"><b>附件下载</b><i class="fa fa-inbox ml-10"></i></span>';
                allHtml += '</div>';
                allHtml += '<hr class="divider mb-10">';
                allHtml += '<div id="a" class="file-download">';
                allHtml += '<ol  style="line-height: 2">';
                var Html = '';
                for (var i = 0; i < data[0].AttachmentDetails.length; i++) {
                    Html += '<li><a class="text-cleos" href="' + data[0].AttachmentDetails[i].AttachmentUrl + '" target="_blank">' + data[0].AttachmentDetails[i].AttachmentName + '</a> </li>';
                }
                allHtml += Html;
                allHtml += '</ol>';
                allHtml += '</div>';
                allHtml += '<div class="clearfix"></div>';
            }
            $("#viewAttachment").empty();
            $("#viewAttachment").html(allHtml);

        }
        //添加
        function addRequest() {
            //查找封面图片资源ID
            if (!verifyCheck._click("verifyCheck")) {
                return false;
            }
            if($("#txtNoticeContent").Editor("getText") == '' || $("#txtNoticeContent").Editor("getText") == '<br>'){
                vdialog({
                    type: 'error',
                    title: '提示',
                    content: '请输入公告内容',
                    ok: true,
                    modal: true
                });
                return false;
            }
            var Cover = '';
            $(".uploader_img1 .queueList .filelist .item").each(function () {
                if ($(this).attr("data") != null && $(this).attr("data") != "") {
                    Cover = $(this).attr("data");
                }
            });
            //查找附近文件资源ID
            var Attachment = [];
            $(".uploader_box1 .uploader-list .item").each(function () {
                if ($(this).attr("data") != null && $(this).attr("data") != "") {
                    Attachment.push($(this).attr("data"));
                }
            });
            if (Cover == "") {
                vdialog({
                    type: 'error',
                    title: '提示',
                    content: '请上传图片',
                    ok: true,
                    modal: true
                });
                return false;
            }
            else {
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "Subject": $('#txtSubject').val(),
                        "Abstract": $('#txtAbstract').val(),
                        "NoticeContent": $("#txtNoticeContent").Editor("getText"),
                        "Cover": Cover,
                        "Attachment": Attachment
                    }
                };
                var url = eosCommon.PLATFORM_API + "api/notice/insert";
                eosCommon.eosAjax(url, "POST", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.SEND_NOTICE);
                        tableDev.ajax.reload();
                        $(".loading_btn").button('reset');
                        clearAdd();
                    }
                });
            }
        }
        //添加成功清空
        function clearAdd() {
            $('#txtSubject').val("");
            $('#txtAbstract').val("");
            $('#txtNoticeContent').val("");
            $("#imgBox1").empty();
            $("#fileBox1").empty();
            $('#EosBaseDveList').show();
            $('#SystemNoticeAdd').hide();
            $('#SystemNoticeView').hide();
        }
    }
}
</script>
<style>
    @import '/static/plugins/tinymce/css/default.css';
    @import '/static/plugins/tinymce/css/editor.css';
    #system-notice .eos_uploader_box .item .progress{
        width: 170px;
    }
    .system-notice-img{
        max-height: 20px;
    }
</style>
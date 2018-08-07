<template>
    <div>
        <div class="row">
            <div class="col-sm-12">
                <div id="divDataTableView" class="card-box table-responsive">
                    <div class="row">
                        <div class="col-sm-6 col-md-4 col-lg-2">
                            <span class="size20 font-bold">品牌管理</span>
                        </div>
                    </div>
                    <hr class="divider mb-10 mt-10">
                    <div class="row ">
                        <div class="col-lg-12">
                            <span class="OrgTopAligin OperatorInsert">
                                <button id="btnInsert" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-cleos">
                                    <i class="fa fa-plus m-r-5"></i>新增
                                </button>
                            </span>
                           <span class="OperatorSearch">
	                           	 <span class="OrgTopAligin">
	                                <input id="txtBrandName" type="text" class="form-control" placeholder="品牌名称">
	                            </span>
	                            <span class="OrgTopAligin">
	                                <button id="btnQuery" type="button" class="btn btn-default" @click='search'>
	                                    <i class="fa fa-search m-r-5"></i>查找
	                                </button>
	                            </span>
                           </span>
                        </div>
                    </div>
                    <table id="exampleBrand" class="table table-striped table-bordered" width="100%">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>品牌名称</th>
                                <th>英文名称</th>
                                <th>品牌Logo</th>
                                <th class="w-80">操作</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <div id="modal-cleos" class="modal fade" tabindex="-1" role="dialog" data-backdrop='static' aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="win-close" data-dismiss="modal">×</button>
                    <button id="btnSave" type="button" class="sava loading_btn" data-loading-text="保存中..."><i class='fa fa-save m-r-5'></i>保存</button>
                    <h4 id="ModuleTitle" class="modal-title"></h4>
                </div>
                <div id="verifyCheck">
                    <div id="modal_body1" class="modal-body nicescroll pr-45 mb-20">
                        <div class="row pt-20">
                            <div class="form-group">
                                <span class="col-sm-3 control-label text-right pt-5">
                                    <em class="ak_required_em">*</em>品牌名称：
                                </span>
                                <div class="col-sm-9 text-muted pull-right">
                                    <input id="txtBrandChineseName" type="text" maxlength="25" class="form-control required"  data-valid="isNonEmpty||between:1-25||isZh" data-error="品牌名称不能为空||品牌名称长度1-25位||中文名称必须由中文组成" placeholder="品牌名称"/>
                                    <span class="ie8 ion-close-circled close hide text-danger font-16 m-t-3"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                    <label class="focus valid"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row pt-20">
                            <div class="form-group">
                                <span class="col-sm-3 control-label text-right pt-5">
                                    <em class="ak_required_em">*</em>英文名称：
                                </span>
                                <div class="col-sm-9 text-muted pull-right">
                                    <input id="txtBrandEnglishName" type="text" maxlength="25" class="form-control required"  data-valid="isNonEmpty||between:1-25||isEn" data-error="英文名称不能为空||英文名称长度1-25位||英语名称必须由英文组成" placeholder="英文名称"/>
                                    <span class="ie8 ion-close-circled close hide text-danger font-16 m-t-3"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                    <label class="focus valid"></label>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="form-group">
                                <span class="col-sm-3 control-label text-right pt-25">
                                     <em class="ak_required_em">*</em>品牌LOGO：
                                </span>
                                <div class="col-sm-9 text-muted pull-left pt-20">
                                    <div id="imgBox"></div>
                                    <label id="lblResourceId" style="display:none;"></label>
                                    <label id="lblResourceIdError" class="focus valid error"></label>
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
    data(){
        return{
            table:null
        }
    },
    methods:{
        search(){
            this.table.ajax.reload()
        }
    },
    mounted: function() {
        var table;
        var BrandId;
        var btn = "";
        let vm = this
        $(document).ready(function () {
            verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
            $('#txtBrandName').bind('keypress',function(event){
                if(event.keyCode == "13"){
                    table.ajax.reload();
                }
            });
            table = $('#exampleBrand').DataTable({
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
                            "BrandName": $('#txtBrandName').val().trim()
                        }
                    };
                    var url = eosCommon.PLATFORM_API + "api/base/QueryBrand";
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
                    { data: "BrandChineseName" },
                    { data: "BrandEnglishName" },
                    { data: "BrandLogoUrl" },
                    { "defaultContent": "<span class='OperatorBtnEdit OperatorEdit' data-toggle='modal' data-target='#modal-cleos' data='2' title='编辑信息'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除信息'><i class='fa fa-trash-o'></i></span>" }
                ],
                "columnDefs": [
                    {
                        "targets": [3],
                        "render": function (data) {
                            var html = '-';
                            if (data != "") {
                                html = "<img data='2' class='AppLogo' src='" + data + "&Mode=Max&Width=80'/>"
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
            vm.table = table
            $('#exampleBrand tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });

            $('#exampleBrand tbody').on('click', 'span', function () {
                var data = table.rows($(this).parents('tr')).data();
                var isNum = $(this).attr("data");
                if (isNum == "2") {
                    //编辑信息赋值 函数
                    BrandId = data[0].BrandId
                    $('#ModuleTitle').attr("data", "2");
                    $('#ModuleTitle').text("修改品牌");
                    $('#modal_body1').show();
                    addEditUpBindValue(data);

                }
                else if (isNum == "3") {
                    //删除信息赋值 函数
                    BrandId = data[0].BrandId;
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

            /*$('#btnQuery').click(function () {
                table.ajax.reload();
            });*/
            $('#btnInsert').click(function () {
                $('#ModuleTitle').attr("data", "1");
                $('#ModuleTitle').text("新增品牌");
                $('#btnSave').show();
                $('#modal_body1').show();
                addEditUpBindValue(null);

            });

            $('#btnSave').click(function () {
                var isNum = $("#ModuleTitle").attr("data");
                if (isNum == "1") {

                    if (!verifyCheck._click("verifyCheck")) {
                        return false;
                    } else {
                        if ($('#lblResourceId').text() == "") {
                            $('#lblResourceIdError').addClass('error').text("请上传图片");
                            return false;
                        }
                        else {
                            btn = $(".loading_btn").button('loading');
                            addRequest();
                        }
                    }

                }
                else if (isNum == "2") {
                    if (!verifyCheck._click("verifyCheck")) {
                        return false;
                    } else {
                        if ($('#lblResourceId').text() == "") {
                            $('#lblResourceIdError').addClass('error').text("请上传图片");
                            return false;
                        }
                        else {
                            btn = $(".loading_btn").button('loading');
                            editRequest();
                        }
                    }
                }
            });

        });

        //初始化图片上传视图
        function addEditUpBindValue(data) {
            eosCommon.resetFrom();
            var isNum = $("#ModuleTitle").attr("data");
            var _$modal = $('#modal-cleos');
            _$modal.css('display', 'block');
            var ResourceIds;
            var imgUrls;
            if (isNum == "1") {
                $('#txtBrandChineseName').val("");
                $('#txtBrandEnglishName').val("");
                $('#lblResourceId').text("");
                $('#lblResourceIdError').text("");
            }
            else if (isNum == "2") {
                $('#txtBrandChineseName').val(data[0].BrandChineseName);
                $('#txtBrandEnglishName').val(data[0].BrandEnglishName);
                $('#lblResourceId').text(data[0].BrandLogo);
                $('#lblResourceIdError').text("");
                ResourceIds = data[0].BrandLogo;
                imgUrls = data[0].BrandLogoUrl;
            }

            $("#imgBox").empty();
            $("#imgBox").html(
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
                "Title": "品牌Logo",
                "Description": "品牌Logo"
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
        }

        //修改
        function editRequest() {
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "BrandId": BrandId,
                    "BrandChineseName": $('#txtBrandChineseName').val(),
                    "BrandEnglishName": $('#txtBrandEnglishName').val(),
                    "BrandLogo": $('#lblResourceId').text()
                }
            };
            var url = eosCommon.PLATFORM_API + "api/base/UpdateBrand";
            eosCommon.eosAjax(url, "PUT", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                    table.ajax.reload();
                    $('#modal-cleos').modal('hide');
                    $(".loading_btn").button('reset');
                }
            });
        }

        //添加
        function addRequest() {
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "BrandChineseName": $('#txtBrandChineseName').val(),
                    "BrandEnglishName": $('#txtBrandEnglishName').val(),
                    "BrandLogo": $('#lblResourceId').text()
                }
            };

            var url = eosCommon.PLATFORM_API + "api/base/InsertBrand";
            eosCommon.eosAjax(url, "POST", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                    table.ajax.reload();
                    $('#modal-cleos').modal('hide');
                    $(".loading_btn").button('reset');
                }
            });
        }

        //删除
        function delRequest() {
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "BrandId": BrandId
                }
            };

            var url = eosCommon.PLATFORM_API + "api/base/DeleteBrand";
            eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                    table.ajax.reload();
                }
            });
        }
    }
}
</script>
<style>

</style>
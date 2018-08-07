
<template>
    <div>
        <div id="divDataTableView" class="card-box table-responsive">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-2">
                    <span class="size20 font-bold">设备类别</span>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">
            <div class="row">
                <div class="col-lg-12">
                    <span class="OrgTopAligin OperatorInsert">
                        <button id="btnInsert" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-cleos">
                            <i class="fa fa-plus m-r-5"></i>新增
                        </button>
                    </span>
                   	<span class="OperatorSearch">
                   		 <span class="OrgTopAligin">
                        <select id="selBrandId" class="form-control selectpicker" data-size="6" data-style="btn-white">
                            <option value="">品牌</option>
                        </select>
                    </span>
                    <span class="OrgTopAligin">
                        <select id="selEquipmentClassLevel" class="form-control selectpicker" data-style="btn-white">
                            <option value="">类别</option>
                            <option value="0">大类</option>
                            <option value="1">子类</option>
                            <option value="2">型号</option>
                        </select>
                    </span>
                    <span class="OrgTopAligin">
                        <input id="txtEquipmentClassName" type="text" class="form-control" placeholder="设备类别名称">
                    </span>
                    <span class="OrgTopAligin">
                        <button id="btnQuery" type="button" class="btn btn-default" @click='search'>
                            <i class="fa fa-search m-r-5"></i>查找
                        </button>
                    </span>
                   	</span>
                </div>
            </div>
            <table id="exampleClass" class="table table-striped table-bordered" width="100%">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>设备类别名称</th>
                        <th>设备种类</th>
                        <th>类别</th>
                        <th>品牌</th>
                        <th>上级节点</th>
                        <th class="w-80">操作</th>
                    </tr>
                </thead>
            </table>
        </div>
        <div id="modal-cleos" class="modal fade" tabindex="-1" role="dialog" data-backdrop='static' aria-hidden="true" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="win-close" data-dismiss="modal">×</button>
                    <button id="btnSave" type="button" class="sava loading_btn" data-loading-text="保存中..."><i class='fa fa-save m-r-5'></i>保存</button>
                    <h4 id="ModuleTitle" class="modal-title"></h4>
                </div>
                <div id="verifyCheck">
                    <div id="modal_body1" class="modal-body nicescroll ms-box pr-45">
                        <div class="row pt-20 mb-20 mt-10">
                            <div class="form-group">
                                <span class="col-sm-3">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>品牌</label>
                                </span>
                                <div class="col-sm-9 text-muted pull-right">
                                    <select id="selAddEditBrandId" class="form-control selectpicker" data-size="5" data-style="btn-white">
                                    </select>
                                </div>
                            </div>
                             
                           
                        </div>
                         <div class="row mb-20">
                         		<div class="form-group">
	                                <span class="col-sm-3">
	                                    <label class="content-title-left"><em class="ak_required_em">*</em>设备种类</label>
	                                </span>
	                                <div class="col-sm-9 text-muted pull-right">
	                                    <select id="EquipmentTypeSelect" v-model="EquipmentTypeId" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
	                                    		<option value="">请选择设备种类</option>
												<option :value="item.EquipmentTypeId" v-for="item in EquipmentTypeArr" >{{item.TypeName}}</option>
										</select>
	                                </div>
                            	</div>
                         </div>
                        <div class="row">
                            <div class="form-group">
                                <span class="col-sm-3">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>类别</label>
                                </span>
                                <div class="col-sm-5 text-muted pull-left">
                                    <select id="selRootId" class="form-control selectpicker" data-size="5" data-style="btn-white">
                                        <option value="">请选择大类</option>
                                    </select>
                                    <span class="ie8 ion-close-circled close hide text-danger font-16 m-t-3"></span>
                                    <label class="fa fa-check-circle blank hide text-success font-16 m-t-3"></label>
                                    <label class="focus valid"></label>
                                </div>
                                <div class="col-sm-4 text-muted pull-left">
                                    <select id="selSubId1" class="form-control selectpicker" data-size="5" data-style="btn-white">
                                        <option value="">请选择小类</option>
                                    </select>
                                </div>
                                <span class="col-sm-3 control-label text-right">
                                </span>
                                <div class="col-sm-9 text-muted pull-right">
                                    新增时不选择大类则创建设备类别大类，选择了大类不选择小类则创建设备类别小类，大类小类都选择则创建型号。
                                </div>
                            </div>
                        </div>
                        <div class="row pt-20">
                            <div class="form-group">
                                <span class="col-sm-3">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>设备类别名称</label>
                                </span>
                                <div class="col-sm-9 text-muted pull-right">
                                    <input id="txtAddEditClassName" type="text" maxlength="25" class="form-control required"  data-valid="isNonEmpty||between:1-25" data-error="设备类别名称不能为空||设备类别名称长度为1-25位" placeholder="必填"/>
                                    <span class="ie8 ion-close-circled close hide text-danger font-16 m-t-3"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                    <label class="focus valid"></label>
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
var btn = '';
    export default {
    	data(){
    		return{
    			EquipmentTypeId:'',
    			EquipmentTypeArr:[],
                table:null
    		}
    	},
    	methods:{
    		getEquipmentType(){
				var _this=this;
				eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/GetEquipmentType", "Get", {
						"AccessToken": eosCommon.storage.get("AccessToken"),						
					}, "json", function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
								_this.EquipmentTypeArr=result.Data;
								_this.$nextTick(()=>{
									$('#EquipmentTypeSelect').selectpicker('refresh');
								});
						}
					});							
			},
            search(){
                this.table.ajax.reload()
            }
    	},
        mounted: function() {
            $("#selEquipmentClassLevel").selectpicker("refresh")
            var table;
            var EquipmentClassId;
            var vm=this;
            vm.getEquipmentType();
            $(document).ready(function () {
                selBrandIdBind();
                verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
                $('#txtEquipmentClassName').bind('keypress',function(event){
                    if(event.keyCode == "13"){
                        table.ajax.reload();
                    }
                });
                table = $('#exampleClass').DataTable({
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
                                "BrandId": $('#selBrandId').val(),
                                "EquipmentClassLevel": $('#selEquipmentClassLevel').val(),
                                "EquipmentClassName": $('#txtEquipmentClassName').val().trim()
                            }
                        };
                        var url = eosCommon.PLATFORM_API + "api/base/QueryEquipmentClass";
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
                        { data: "EquipmentClassName" },
                        { data: "TypeName" },
                        { data: "EquipmentClassLevelName" },
                        { data: "BrandName" },
                        { data: "ParentName" },
                        { "defaultContent": "<span class='OperatorBtnEdit OperatorEdit' data-toggle='modal' data-target='#modal-cleos' data='2' title='编辑信息'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel	OperatorDel' data='3' title='删除信息'><i class='fa fa-trash-o'></i></span>" }
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
                $('#exampleClass tbody').on('click', 'tr', function () {
                    if ($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });

                $('#exampleClass tbody').on('click', 'span', function () {
                    var data = table.rows($(this).parents('tr')).data();
                    var isNum = $(this).attr("data");
                    if (isNum == "2") {
                        //编辑信息赋值 函数
                        EquipmentClassId = data[0].EquipmentClassId;
                        $('#ModuleTitle').attr("data", "2");
                        $('#ModuleTitle').text("修改设备类别");
                        $('#modal_body1').show();
                        addEditBindValue(data);
                    }
                    else if (isNum == "3") {
                        //删除信息赋值 函数
                        EquipmentClassId = data[0].EquipmentClassId;
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

                $('#selAddEditBrandId').change(function () {
                    selRootIdBind();
                });
                $('#selRootId').change(function () {
                    selSubId1Bind();
                });
                $('#selBrandId').change(function () {
                    table.ajax.reload();
                });
                $('#selEquipmentClassLevel').change(function () {
                    table.ajax.reload();
                });
                /*$('#btnQuery').click(function () {
                    table.ajax.reload();
                });*/
                $('#btnInsert').click(function () {
                	vm.EquipmentTypeId='';
                	$('#EquipmentTypeSelect').selectpicker('refresh');
                	
                    $('#ModuleTitle').attr("data", "1");
                    $('#ModuleTitle').text("新增设备类别");
                    $('#btnSave').show();
                    $('#modal_body1').show();
                    addEditBindValue(null);
                });

                $('#btnSave').click(function () {
                    var isNum = $("#ModuleTitle").attr("data");
                    if (isNum == "1") {
                        if (!verifyCheck._click("verifyCheck")) {
                            return false;
                        } else {
                            btn = $(".loading_btn").button('loading');
                            addRequest();
                        }

                    }
                    else if (isNum == "2") {
                        if (!verifyCheck._click("verifyCheck")) {
                            return false;
                        } else {
                            btn = $(".loading_btn").button('loading');
                            editRequest();
                        }
                    }
                });

            });

            //绑定品牌
            function selBrandIdBind() {
                var param = { "AccessToken": eosCommon.storage.get("AccessToken") };
                var url = eosCommon.COMMON_API + "api/common/brand";
                eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        var json = result.Data;
                        var selBrandId = $("#selBrandId");
                        selBrandId.empty();
                        selBrandId.append("<option value=''>品牌</option>");
                        for (var ind in json) {
                            selBrandId.append("<option value='" + json[ind].BrandId + "'>" + json[ind].BrandName + "</option>");
                        }
                        $("#selBrandId").selectpicker('refresh');

                        if (json.length > 0) {
                            var selAddEditBrandId = $("#selAddEditBrandId");
                            selAddEditBrandId.empty();
                            for (var ine in json) {
                                selAddEditBrandId.append("<option value='" + json[ine].BrandId + "'>" + json[ine].BrandName + "</option>");
                            }
                            $("#selAddEditBrandId").selectpicker('refresh');
                            selRootIdBind();
                        }
                    }
                });
            }
            //绑定大类
            function selRootIdBind() {
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "BrandId": $('#selAddEditBrandId option:selected').val(),
                        "EquipmentClassId": "",
                    }
                };
                var url = eosCommon.COMMON_API + "api/common/EquipmentClassLinkage";
                eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        var json = result.Data;
                        var selRootId = $("#selRootId");
                        selRootId.empty();
                        selRootId.append("<option value=''>请选择大类</option>");
                        for (var ind in json) {
                            selRootId.append("<option value='" + json[ind].EquipmentClassId + "'>" + json[ind].EquipmentClassName + "</option>");
                        }
                        $("#selRootId").selectpicker('refresh');
                        selSubId1Bind();
                    }
                });
            }
            //绑定小类
            function selSubId1Bind() {
                var selSubId1 = $("#selSubId1");
                if ($('#selRootId option:selected').val() != "") {
                    var param = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "Parameters": {
                            "BrandId": "",
                            "EquipmentClassId": $('#selRootId option:selected').val(),
                        }
                    };
                    var url = eosCommon.COMMON_API + "api/common/EquipmentClassLinkage";
                    eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                        if (eosCommon.checkCode(result.State, result.Message)) {
                            var json = result.Data;
                            selSubId1.empty();
                            selSubId1.append("<option value=''>请选择小类</option>");
                            for (var ind in json) {
                                selSubId1.append("<option value='" + json[ind].EquipmentClassId + "'>" + json[ind].EquipmentClassName + "</option>");
                            }
                            $("#selSubId1").selectpicker('refresh');

                        }
                    });
                }
                else {
                    selSubId1.empty();
                    selSubId1.append("<option value=''>请选择小类</option>");
                    $("#selSubId1").selectpicker('refresh');
                }
            }
            //绑定添加编辑时的初始值
            function addEditBindValue(data) {
                eosCommon.resetFrom();
                if (data == null) {
                    $('#txtAddEditClassName').val("");
                    $('#selAddEditBrandId').removeAttr("disabled");
                    $('#selRootId').removeAttr("disabled");
                    $("#selAddEditBrandId").selectpicker('refresh');
                    $("#selRootId option[value='']").prop("selected", true);
                    $("#selRootId").selectpicker('refresh');
                    $('#selSubId1').removeAttr("disabled");
                    $("#selSubId1 option[value='']").prop("selected", true);
                    $("#selSubId1").selectpicker('refresh');
                    selRootIdBind();
                }
                else {
                	vm.EquipmentTypeId=data[0].EquipmentTypeId;
                	vm.$nextTick(function(){
                		$('#EquipmentTypeSelect').selectpicker('refresh');
                		
                	});

                    $('#txtAddEditClassName').val(data[0].EquipmentClassName);
                    $("#selAddEditBrandId option[value='" + data[0].BrandId + "']").prop("selected", true);
                    $('#selAddEditBrandId').attr("disabled", "disabled");
                    $("#selAddEditBrandId").selectpicker('refresh');

                    if (data[0].RootId == "" || data[0].RootId == null) {
                        $('#selRootId option:selected').val("");
                        $("#selRootId option:selected").text("请选择大类");
                    }
                    else {
                        $("#selRootId option:selected").val(data[0].RootId);
                        $("#selRootId option:selected").text(data[0].RootIdName);
                    }
                    $('#selRootId').attr("disabled", "disabled");
                    $("#selRootId").selectpicker('refresh');

                    if (data[0].SubId1 == "" || data[0].SubId1 == null) {
                        $('#selSubId1 option:selected').val("");
                        $("#selSubId1 option:selected").text("请选择小类");
                    }
                    else {
                        $("#selSubId1 option:selected").val(data[0].SubId1);
                        $("#selSubId1 option:selected").text(data[0].SubId1Name);
                    }
                    $('#selSubId1').attr("disabled", "disabled");
                    $("#selSubId1").selectpicker('refresh');

                }
            }

            //修改
            function editRequest() {
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "EquipmentClassId": EquipmentClassId,
                        "EquipmentClassName": $('#txtAddEditClassName').val(),
                        "EquipmentTypeId":vm.EquipmentTypeId
                    }
                };
                var url = eosCommon.PLATFORM_API + "api/base/UpdateEquipmentClass";
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
                        "BrandId": $('#selAddEditBrandId option:selected').val(),
                        "EquipmentClassName": $('#txtAddEditClassName').val(),
                        "RootId": $('#selRootId option:selected').val(),
                        "SubId1": $('#selSubId1 option:selected').val(),
                        "EquipmentTypeId":vm.EquipmentTypeId
                    }
                };
                var url = eosCommon.PLATFORM_API + "api/base/InsertEquipmentClass";
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
                        "EquipmentClassId": EquipmentClassId
                    }
                };
                var url = eosCommon.PLATFORM_API + "api/base/DeleteEquipmentClass";
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
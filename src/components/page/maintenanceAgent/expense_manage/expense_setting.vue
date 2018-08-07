<template>
    <div v-cloak>
        <div class="card-box table-responsive">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-2">
                    <span class="size20 font-bold">费用设置</span>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">

            <div class="row">
                <div id="exampleDev2_processing" class="loading" v-if="processing==0" style="display: block">数据加载中...</div>
                <div class="mt-5" v-if="processing!=0">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="(data, index) in load_data" v-if="data.VisibleScope==0">
                        <div class="widget-panel cost-box bg-white b-1">
                            <h4 class="m-0 text-dark"><span data-plugin="counterup" v-cloak>{{data.ExpenseItemName}}</span></h4>
                            <h2 class="m-0 text-dark" v-if="data.ExpenseItemName=='通讯费'"><i class="fa fa-tty text-pink"></i></h2>
                            <h2 class="m-0 text-dark" v-if="data.ExpenseItemName=='材料费'"><i class="fa fa-clone text-pink"></i></h2>
                            <h2 class="m-0 text-dark" v-if="data.ExpenseItemName=='管理费'"><i class="fa fa-anchor text-pink"></i></h2>
                            <h2 class="m-0 text-dark" v-if="data.ExpenseItemName=='交通费'"><i class="fa fa-car text-pink"></i></h2>
                            <h2 class="m-0 text-dark " v-if="data.ExpenseItemName=='餐饮费'"><i class="fa fa-coffee text-pink"></i></h2>
                            <h2 class="m-0 text-dark" v-if="data.ExpenseItemName=='住宿费'"><i class="fa fa-building-o text-pink"></i></h2>
                            <h2 class="m-0 text-dark" v-if="data.ExpenseItemName=='劳务费'"><i class="fa fa-truck text-pink"></i></h2>
                            <h2 class="m-0 text-dark" v-if="data.ExpenseItemName=='其它'"><i class="fa fa-balance-scale text-pink"></i></h2>
                        </div>
                    </div>
                </div>
                <div v-if="processing!=0">
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12" v-for="(data, index) in load_data" v-if="data.VisibleScope==1">
                        <div class="widget-panel cost-box b-1">
                            <h4 class="m-0 text-dark"><span data-plugin="counterup"  v-cloak>{{data.ExpenseItemName}}</span></h4>
                            <h2 class="m-0 text-dark"><i class="fa fa-file text-custom"></i></h2>
                            <div class="contact-action">
                                <span v-on:click="del(data.ExpenseItemId)"><i class="fa fa-trash-o text-danger cursor OperatorDel"></i></span>
                                <span v-on:click="add_edit(data.ExpenseItemId,data.ExpenseItemName,index)"><i class="fa fa-pencil text-cleos action-del cursor OperatorEdit"></i></span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 cursor OperatorInsert" v-on:click="add_edit('','',0)">
                        <div class="widget-panel cost-box b-1">
                            <h4 class="m-0 text-grey"><span data-plugin="counterup">新增自定义</span></h4>
                            <h2 class="m-0 text-dark"><i class="fa fa-plus text-grey"></i></h2>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>
        </div>

        <div id="modal-cleos" class="modal fade" tabindex="-1" role="dialog" data-backdrop='static' aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="win-close" data-dismiss="modal">×</button>
                    <button id="btnSave" type="button" class="sava loading_btn" v-on:click="btnSave()" data-loading-text="保存中..."><i class='fa fa-save m-r-5'></i>保存</button>
                    <h4 id="ModuleTitle" class="modal-title"  v-cloak>{{title_name}}</h4>
                </div>
                <div id="verifyCheck">
                    <div id="modal_body1" class="modal-body nicescroll  pr-45">
                        <div class="row">
                            <div class="form-group">
                                <label class="content-title-left">
                                    <em class="ak_required_em">*</em>自定义费用名称
                                </label>
                                <div class="col-sm-9 text-muted pull-right">
                                    <span class="valid-form-group">
                                        <label id="lblNameMag" class="focus valid"></label>
                                    </span>
                                    <input id="txtExpenseItemName" type="text" maxlength="25" v-model="cost_name" class="form-control required"  data-valid="isNonEmpty||between:1-25||isZhEn" data-error="自定义费用名称不能为空||自定义费用名称长度1-25位||自定义费用名称只能中英文" placeholder="费用名称" />
                                    <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
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
var btn = "";
    export default {
        data: function (){
            return {
                load_data: [],
                title_name: '',
                cost_id: '',
                cost_name: '',
                data_index: 0,
                processing: 0
            }
        },
        methods: {
            load_view: function () {
                var _this = this;
                var url = eosCommon.ENTERPRISE_API + "api/expenseitem/query";
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "PageSize": 0,
                    "PageIndex": 0,
                    "Parameters": {
                        "Keywords": ""
                    }
                }
                eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        _this.processing = 1;
                        if (result.Data == "") {
                            _this.load_data = [];
                        }
                        else {
                            _this.load_data = result.Data.Result;
                        }
                    }
                });
            },
            addRequest: function () {
                var _this = this;
                var url = eosCommon.ENTERPRISE_API + "api/expenseitem/insert";
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "ExpenseItemName": _this.cost_name
                    }
                }
                eosCommon.eosAjax(url, "Post", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                        _this.load_view();
                        $('#modal-cleos').modal('hide');
                        $(".loading_btn").button('reset');
                    }
                });
            },
            editRequest: function () {
                var _this = this;
                var url = eosCommon.ENTERPRISE_API + "api/expenseitem/update";
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "ExpenseItemId": _this.cost_id,
                        "ExpenseItemName": _this.cost_name
                    }
                }
                eosCommon.eosAjax(url, "Put", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                        _this.load_data[_this.data_index].ExpenseItemName = _this.cost_name;
                        $('#modal-cleos').modal('hide');
                        $(".loading_btn").button('reset');
                    }
                });
            },
            delRequest: function (id, index) {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "ExpenseItemId": id
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/expenseitem/delete";
                eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                        _this.load_data.splice(index, 1)
                    }
                });
            },
            add_edit: function (id, name, index) {
                eosCommon.resetFrom();
                $('#modal-cleos').modal('show');
                if (id == "") {
                    this.title_name = '新增费用类型';
                    this.cost_id = '';
                    this.cost_name = '';
                    this.data_index = 0;
                }
                else {
                    this.title_name = '修改费用类型';
                    this.cost_id = id;
                    this.cost_name = name;
                    this.data_index = index;
                }
            },
            btnSave: function () {
                if (!verifyCheck._click("verifyCheck")) {
                    return false;
                }
                else {
                    if (this.cost_id == '') {
                        btn = $(".loading_btn").button('loading');
                        this.addRequest();
                    }
                    else {
                        btn = $(".loading_btn").button('loading');
                        this.editRequest();
                    }
                }
            },
            del: function (id, index) {
                var _this = this;
                vdialog({
                    type: 'confirm',
                    title: '提示',
                    content: eosCommon.DELETE_MSG_ASK,
                    ok: function () { _this.delRequest(id, index); },
                    cancel: true,
                    modal: true
                });
            }

        },
        updated:function(){
        
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());
        	
        },
        mounted:function () {
            this.load_view();
            var _this = this;
            verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
        }
    }
</script>
<style>

</style>
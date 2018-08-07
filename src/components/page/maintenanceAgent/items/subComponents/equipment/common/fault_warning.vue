<template>
    <div id="faultWarning">
        <div id="faultWarningList" class="row" style="min-height: 330px;">
            <div class="col-sm-12">
                <div class="bg-white" style="padding: 15px; min-height: 220px;padding: 15px">
                    <!--<div class="row">
                        <div class="col-sm-6 col-md-4 col-lg-2">
                            <span class="size20 font-bold">故障报警</span>
                        </div>
                    </div>
                    <hr class="divider mb-10 mt-10">-->
                    <!--故障报警头部查询——开始-->
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="OrgTopAligin">
                                <select id="StatusType" class="form-control selectpicker" data-style="btn-white">
                                    <option value="0">请选择故障状态</option>
                                    <option value="1">未处理</option>
                                    <option value="2">处理中</option>
                                    <option value="3">已处理</option>
                                </select>
                            </div>
                            <div class="OrgTopAligin">
                                <select id="LevelType" class="form-control selectpicker" data-style="btn-white">
                                    <option value="0">请选择报警级别</option>
                                    <option value="1">提醒</option>
                                    <option value="2">警告</option>
                                    <option value="3">报警</option>
                                </select>
                            </div>
                            <span class="OrgTopAliginTime">
								<span id="spanEndTime1" class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
									<input id="StartDate" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
									<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								</span>
							</span>
                            <span class="OrgTopAliginTime">
								<span id="spanEndTime2" class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
									<input id="EndDate" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
									<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								</span>
							</span>
                            <span class="OrgTopAligin">
								<input id="faultKeywords" type="text" class="form-control w-128" placeholder="故障代码">
							</span>
                            <span class="OrgTopAligin ">
								<button @click="search()" type="button" class="btn btn-default waves-effect waves-light">
									<i class="fa fa-search m-r-5"></i>查找
								</button>
							</span>							
                        </div>
                    </div>
                    <!--故障报警头部查询——结束-->
                    <!--<div class="row">
                        <div class="dataTables_wrapper no-footer" v-show="noData">
                            <div id="example1_processing" class="dataTables_processing">数据加载中...</div>
                        </div>
                    </div>-->
                    <loading v-show="noData"></loading>
                    <!--<div class="row">
                        <div class="dataTables_wrapper no-footer" v-show="emptyData">
                            <div class="dataTables_processing" style="background-image: none;text-indent: 0;">暂无数据</div>
                        </div>
                    </div>-->
                    
                    <!--故障报警列表——开始-->
                    <table id="eosSelectAcitve" class="table table-striped table-bordered" width="100%" style="border: 0 solid #fff;margin-top: 10px;">
                        <thead class="thead-bottom-line">
                        <tr>
                            <th class="sorting-title">序号</th>
                            <th class="sorting-title">设备名称</th>
                            <th class="sorting-title">所属项目</th>
                            <th class="sorting-title">预警时间</th>
                            <th class="sorting-title">故障代码</th>
                            <th class="sorting-title">预警位置</th>
                            <th class="sorting-title">故障描述</th>
                            <th class="sorting-title" style="width: 90px;">级别</th>
                            <th class="sorting-title" style="width: 90px;">状态</th>
                            <th class="sorting-title">操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr @click="activehover(index)" class="list-table-hover" v-for="(item,index) in faultWarningListData">
                            <td class="sorting_content">{{index+1+((indexInt-1)*page_size)}}</td>
                            <td class="sorting_content">{{item.EquipmentAlias}}</td>
                            <td class="sorting_content">{{item.ProjectName}}</td>
                            <td class="sorting_content">{{item.AlarmTime}}</td>
                            <td class="sorting_content">{{item.FaultCodes}}</td>
                            <td class="sorting_content">{{item.AlarmLocation}}</td>
                            <td class="sorting_content">{{item.AlarmContent}}</td>
                            <td class="sorting_content">
                                <label v-if="item.AlarmLevel==1" class="label label-success btn-rounded">
                                    {{item.AlarmLevelName}}
                                </label>
                                <label v-else-if="item.AlarmLevel==2" class="label label-warning btn-rounded">
                                    {{item.AlarmLevelName}}
                                </label>
                                <label v-else-if="item.AlarmLevel==3" class="label label-danger btn-rounded">
                                    {{item.AlarmLevelName}}
                                </label>
                            </td>
                            <td class="sorting_content">
                                <label v-if="item.Status==1" class="label label-primary btn-rounded">
                                    {{item.StatusName}}
                                </label>
                                <label v-else-if="item.Status==2" class="label label-warning btn-rounded">
                                    {{item.StatusName}}
                                </label>
                                <label v-else-if="item.Status==3" class="label label-success btn-rounded">
                                    {{item.StatusName}}
                                </label>
                            </td>
                            <td class="sorting_content">
                                <!--<span class="OperatorBtnSet"><i class="fa fa-file-text-o"></i></span>-->
                                <span  v-if="item.Status != 3" title="确认故障报警" class="OperatorBtnEdit" @click="getDataFaultConfirm(item.FaultId,item.Status)"><i class="fa fa-cog"></i></span>
                                <span class="OperatorBtnView" title="查看故障报警" @click="getDataFaultDetail(item.FaultId)"><i class="fa fa-eye"></i></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <no-data v-show="emptyData"></no-data>
                    <!--故障报警列表——结束-->
                    <div class="dataTables_wrapper" v-if="page_num > 0">
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
        <!--故障报警详情——开始-->
        <div id="faultWarningReportForms" class="row" style="display: none">
            <div class="col-sm-12">
                <div class="card-box">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="size20 font-bold pt-5">故障报警报表</span>
                            <button type="submit" class="btn btn-white pull-right" @click="btnReportForms()"><i class="fa fa-mail-reply-all m-r-5"></i>返回
                            </button>
                        </div>
                    </div>
                    <hr class="divider mb-10 mt-10">
                    <div id="bodyDescription" class="row">
                        <div class="col-lg-7 col-md-9 col-sm-11 col-xs-12">
                            <div class="report-box">
                                <div class="report-table-header">
                                    <span class="report-r col-sm-2"><b class="size14">设备名称</b></span>
                                    <span class="report-no col-sm-4">{{FaultDetailData.EquipmentAlias}}</span>
                                    <span class="report-l col-sm-1"><b class="size14">级别</b></span>
                                    <span class="report-l text-danger col-sm-2">{{FaultDetailData.AlarmLevel1}}</span>
                                    <span class="report-l col-sm-1"><b class="size14">状态</b></span>
                                    <span class="report-l text-success col-sm-2">{{FaultDetailData.StatusName}}</span>
                                </div>
                                <div class="report-content">
                                    <p class="report-line clearfix">
                                        <span class="col-sm-2 text-right"><b>报警时间：</b></span>
                                        <span class="text-muted col-sm-10">{{FaultDetailData.AlarmTime}}</span>
                                    </p>
                                    <p class="report-line clearfix">
                                        <span class="col-sm-2 text-right"><b>故障代码：</b></span>
                                        <span class="text-muted col-sm-10">{{FaultDetailData.FaultCodes}}</span>
                                    </p>
                                    <p class="report-line clearfix">
                                        <span class="col-sm-2 text-right"><b>报警位置：</b></span>
                                        <span class="text-muted col-sm-10">{{FaultDetailData.EquipmentPlace}}</span>
                                    </p>
                                    <p class="report-line clearfix">
                                        <span class="col-sm-2 text-right"><b>故障描述：</b></span>
                                        <span class="text-muted col-sm-10">{{FaultDetailData.AlarmContent}}</span>
                                    </p>
                                    <p class="report-line clearfix">
                                        <span class="col-sm-2 text-right"><b>复位级别：</b></span>
                                        <span class="text-muted">{{FaultDetailData.ResetLevels}}</span>
                                    </p>
                                    <p class="report-line clearfix">
                                        <span class="col-sm-2 text-right"><b>故障持久性：</b></span>
                                        <span class="text-muted">{{FaultDetailData.FaultDurabilitys}}</span>
                                    </p>
                                    <p class="report-line clearfix">
                                        <span class="col-sm-2 text-right"><b>维保联系人：</b></span>
                                        <span class="text-muted">{{FaultDetailData.Contact}}</span>
                                    </p>
                                    <p class="report-line clearfix">
                                        <span class="col-sm-2 text-right"><b>维保联系电话：</b></span>
                                        <span class="text-muted">{{FaultDetailData.Mobile}}</span>
                                    </p>
                                    <p class="report-line pl-20">
                                        <span class="col-sm-2 text-right"><b>警报信息：</b></span>
                                        <span class="text-muted">
                                    <p v-for="item in EventDetailData">
                                        {{item.CreatedBy}}
                                        {{item.CreatedOn}}
                                        {{item.Account}}
                                        {{item.Status}}
                                        {{item.Remark}}
                                    </p>
                                    </span>
                                    </p>
                                </div>
                                <div class="report-table-footer">
                                    <span class="report-r col-sm-2"><b>所属项目</b></span>
                                    <span class="report-no col-sm-4">{{FaultDetailData.ProjectName}}</span>
                                    <span class="report-l col-sm-2"><b>项目地址</b></span>
                                    <span class="report-l col-sm-4">{{FaultDetailData.ProjectAddress}}</span>
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
                faultWarningListData: "",
                page_size: 10, //页大小
                page_index: 1, //页索引
                begin_row: 0, //开始条数
                end_row: 0, //结束条数
                total: 0, //总的数据条数
                page_num: 0, //多少页
                page_record: 1, //当前页码
                processing: 0, //0:数据加载处理中 1:处理完成
                noData: false,
                StatusType: '',
                LevelType: '',
                emptyData:false,
                faultKeywords: '',
                selectProjectId: '',
                StartTime: '',
                EndTime: '',
                MessageData: '',
                initProjectId: '',
                initEquipmentId: '',
                FaultDetailData: {
                    EquipmentAlias: '',
                    ProjectName: '',
                    StatusName: '',
                    FaultCodes: '',
                    ProjectAddress: '',
                    FaultDurabilitys: '',
                    AlarmContent: '',
                    AlarmLocation: '',
                    AlarmLevel1: '',
                    EquipmentPlace: '',
                    ResetLevels: '',
                    Contact: '',
                    Mobile: '',
                    AlarmTime: ''
                },
                EventDetailData: '',
                indexInt: 1,
                isReload:false
            }
        },
        props: ['myData'],
        computed: {
            one_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 2 : this.page_num - 5) : 2);
            },
            two_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 1 : this.page_num - 4) : 3);
            },
            three_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index : this.page_num - 3) : 4);
            },
            four_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 1 : this.page_num - 2) : 5);
            },
            five_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 2 : this.page_num - 1) : 6);
            }
        },
        methods: {
            getData: function() {
                var _this = this;
                _this.noData = true;
                _this.emptyData = false;
	               this.initProjectId = this.myData.ProjectId;
	               this.initEquipmentId = this.myData.EquipmentId;
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "PageIndex": this.page_index,
                    "PageSize": this.page_size,
                    "Parameters": {
                        "ProjectId": this.initProjectId,
                        "EquipmentId": this.initEquipmentId,
                        "Status":$("#StatusType").selectpicker('val'),
                        "Level": $("#LevelType").selectpicker('val'),
                        "Keywords": $('#faultKeywords').val(),
                        "StartTime": $('#StartDate').val(),
                        "EndTime": $('#EndDate').val()
                    }
                };
                eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/QueryFault', "GET", params, "json", function(result) {
                    _this.processing = 1;
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        _this.noData = false;
                        if(result.Data == "") {
                            _this.faultWarningListData = [];
                            _this.page_num = 0;
                            _this.emptyData = true;
                        }
                        else {
                            _this.emptyData = false;
                            _this.total = result.Data.Total;
                            _this.faultWarningListData = result.Data.Result;
                            _this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
                            _this.end_row = _this.page_size * (_this.page_index - 1) + _this.faultWarningListData.length;
                            _this.page_num = Math.ceil(_this.total / _this.page_size);
                        }
                    }
                });
            },
            search: function() {
                this.page_index = 1;
                this.getData();
            },
            getProjectList: function() {
                var _this = this;
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "PageIndex": '',
                    "PageSize": '',
                    "Parameters": {
                        "Keywords": ""
                    }
                };
                eosCommon.eosAjax(eosCommon.COMMON_API + 'api/common/project', "GET", params, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        if(result.Data != "") {
                            for(var i = 0; i < result.Data.Result.length; i++) {
                                $("#selectItem").append("<option value=" + result.Data.Result[i]['ProjectId'] + ">" + result.Data.Result[i]['ProjectName'] + "</option>");
                            }
                            $("#selectItem").selectpicker('refresh');
                            _this.getData()
                        }
                    }
                });
            },
            getDeviceList: function(obj, ProjectId, fn) {
                var _this = this;
                if(ProjectId == 0) {
                    $(obj).empty().append("<option value='0'>选择设备</option>");
                    $(obj).selectpicker('refresh');
                } else {
                    var params = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "PageIndex": '',
                        "PageSize": '',
                        "Parameters": {
                            "ProjectId": ProjectId
                        }
                    };
                    eosCommon.eosAjax(eosCommon.COMMON_API + 'api/common/equipment', "GET", params, "json", function(result) {
                        if(eosCommon.checkCode(result.State, result.Message)) {
                            if(result.Data != "") {
                                $(obj).empty();
                                for(var i = 0; i < result.Data.Result.length; i++) {
                                    $(obj).append("<option value=" + result.Data.Result[i]['EquipmentId'] + ">" + result.Data.Result[i]['EquipmentName'] + "</option>");
                                }
                                $(obj).selectpicker('refresh');
                                _this.initEquipmentId = $("#selectDevice").selectpicker('val');
                                _this.getData();
                                fn && fn();
                            } else {
                                $(obj).empty();
                                $(obj).append("<option value=''>暂无设备</option>");
                                $(obj).selectpicker('refresh');
                            }
                        }
                    });
                }
            },
            setSelectTime: function() {
                $('.form_date,.form_time').datetimepicker({
                    format: 'yyyy-mm-dd',
                    weekStart: 1,
                    autoclose: true,
                    forceParse: false,
                    todayBtn: 1,
                    startView: 2,
                    minView: 2,
                    todayHighlight: 1,
                    language: 'zh-CN'
                });
                $('#StartDate').val(eosCommon.getTime("yyyy-MM-dd", -30));
                $('#EndDate').val(eosCommon.getTime("yyyy-MM-dd", 1));
                $('#spanEndTime2').datetimepicker('setStartDate', $("#StartDate").val());
                $('#spanEndTime1').datetimepicker('setEndDate', $("#EndDate").val());
                $("#StartDate").change(function() {
                    $('#spanEndTime2').datetimepicker('setStartDate', $(this).val());
                });
                $("#EndDate").change(function() {
                    $('#spanEndTime1').datetimepicker('setEndDate', $(this).val());
                });
            },
            getDataFaultDetail: function(FaultId) {
                var _this = this;
                _this.noData = true;
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "FaultId": FaultId
                    }
                };
                eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/FaultDetail', "GET", params, "json", function(result) {
                    _this.processing = 1;
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        $("#faultWarningList").hide();
                        $("#faultWarningFaultConfirm").hide();
                        $("#faultWarningReportForms").show();
                        _this.noData = false;
                        if(result.Data != "") {
                            _this.FaultDetailData.EquipmentAlias = result.Data.queryEquipmentFaultDetail[0].EquipmentAlias;
                            _this.FaultDetailData.ProjectName = result.Data.queryEquipmentFaultDetail[0].ProjectName;
                            _this.FaultDetailData.AlarmTime = result.Data.queryEquipmentFaultDetail[0].AlarmTime;
                            _this.FaultDetailData.StatusName = result.Data.queryEquipmentFaultDetail[0].StatusName;
                            _this.FaultDetailData.FaultCodes = result.Data.queryEquipmentFaultDetail[0].FaultCodes;
                            _this.FaultDetailData.ProjectAddress = result.Data.queryEquipmentFaultDetail[0].ProjectAddress;
                            _this.FaultDetailData.FaultDurabilitys = result.Data.queryEquipmentFaultDetail[0].FaultDurabilitys;
                            _this.FaultDetailData.ResetLevels = result.Data.queryEquipmentFaultDetail[0].ResetLevels;
                            _this.FaultDetailData.AlarmContent = result.Data.queryEquipmentFaultDetail[0].AlarmContent;
                            _this.FaultDetailData.AlarmLocation = result.Data.queryEquipmentFaultDetail[0].AlarmLocation;
                            _this.FaultDetailData.EquipmentPlace = result.Data.queryEquipmentFaultDetail[0].EquipmentPlace;
                            _this.FaultDetailData.AlarmLevel1 = result.Data.queryEquipmentFaultDetail[0].AlarmLevel1;
                            _this.FaultDetailData.Contact = result.Data.queryEquipmentFaultDetail[0].Contact;
                            _this.FaultDetailData.Mobile = result.Data.queryEquipmentFaultDetail[0].Mobile;
                            _this.EventDetailData = result.Data.EventDetail;
                        }
                    }
                });
            },
            getDataFaultConfirm: function(FaultId, status) {
                var _this = this;
                var tis = "",
                    url = "";
                if(status == 1) {
                    vdialog({
                        type: 'confirm',
                        title: '提示',
                        content: '<p style="margin-top: 15px; margin-bottom: 35px;">是否确认警报？</p><input placeholder="请输入备注信息" class="form-control w-128" type="text" data-returnable="true">',
                        ok: function() {
                            if(this.returnValue == '') {
                                vdialog({
                                    title: '提示',
                                    type: 'error',
                                    content: '备注信息不能为空',
                                    modal: true,
                                    ok: true
                                });
                                return false;
                            }
                            var param = {
                                "AccessToken": eosCommon.storage.get("AccessToken"),
                                "Parameters": {
                                    "FaultId": FaultId,
                                    "Remark": this.returnValue,
                                }
                            };
                            eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "/api/equipment/faultconfirm", "PUT", param, "json", function(result) {
                                if(eosCommon.checkCode(result.State, result.Message)) {
                                    eosCommon.eosMessage('warning', eosCommon.UPDATE_MSG);
                                    _this.getData();
                                }
                            });
                        },
                        cancel: true,
                        modal: true
                    });
                } else if(status == 2) {
                    vdialog({
                        type: 'confirm',
                        title: '提示',
                        content: '是否复位设备？',
                        ok: function() {
                            var param = {
                                "AccessToken": eosCommon.storage.get("AccessToken"),
                                "Parameters": {
                                    "FaultId": FaultId
                                }
                            };
                            eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "/api/equipment/faultreset", "PUT", param, "json", function(result) {
                                if(eosCommon.checkCode(result.State, result.Message)) {
                                    eosCommon.eosMessage('warning', eosCommon.UPDATE_MSG);
                                    	_this.getData();
									 	_this.isReload=true;
            							_this.$emit('reload-data',_this.isReload);
                                }
                            });
                        },
                        cancel: true,
                        modal: true
                    });
                }
            },           
            showHideDomNode: function(i) {
                var menuParent = $('.menu > .ListTitlePanel > div');
                var menuList = $('.menuList');
                if($(menuList[i]).css('display') == 'none') {
                    $(menuList[i]).slideDown(400);
                }
                else {
                    $(menuList[i]).slideUp(400);
                }
            },
            btnReportForms: function() {
                $("#faultWarningList").show();
                $("#faultWarningReportForms").hide();
            },
            btnEnterSava: function() {
                $('#btnAddEdit').attr("data", "1");
                $('.modal-title').html("请输入你的内容");
                $('#bodyDescription').hide();
                $("#bodyEnterSava").show();
            },
            removeActiveClass: function() {
                $("table#eosSelectAcitve tbody tr.list-table-hover").removeClass("active");
            },
            activehover: function(index) {
                var arrLi = [];
                var aLi = $("table#eosSelectAcitve tbody tr.list-table-hover")
                for(var i = 0; i < aLi.length; i++) {
                    arrLi.push(aLi[i])
                }
                for(var i = 0; i < arrLi.length; i++) {
                    if(arrLi[i] != this) {
                        $(arrLi[i]).removeClass("active")
                    }
                }
                if(!$(arrLi[i]).hasClass("active")) {
                    $(arrLi[index]).addClass("active")
                } else {
                    $(arrLi[i]).removeClass("active")
                }
            },
            btnEnterReset: function() {
                $('#btnAddEdit').attr("data", "1");
                $('.modal-title').html("请确认复位");
                $('#bodyDescription').show();
                $("#bodyEnterSava").hide();
            },
            serarch: function() {
                this.getData()
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
            get_tempUser: function() {
                if(tempUser != null || tempUser != '') {
                    $('#hidUserId').val(tempUser.CustomerId);
                    $('#CustomerName').val(tempUser.CustomerName);
                }
            }
        },
        watch: {
            page_index: function(val) {
                this.indexInt = val;
                this.getData();
                this.removeActiveClass();
            }
        },
         updated:function(){        
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());        	
        },
        mounted: function() {
            var _this = this;
            this.setSelectTime();
            this.getData();
            $("#selectItem,#selectDevice,#StatusType,#LevelType").selectpicker("refresh")
            $("#selectItem,#selectDevice,#StatusType,#LevelType").change(function() {
                _this.getData();
            });
            this.getProjectList();
            $("#selectDevice").selectpicker('refresh');
            $('#faultKeywords').bind('keypress', function(e) {
                var e=e||event;
                if(e.keyCode == "13") {
                    _this.page_index = 1;
                    _this.getData();
                }
            });
        }
    }
</script>
<style>
    #faultWarning .dataTables_wrapper .dataTables_processing {
        top: 70px;
    }
</style>
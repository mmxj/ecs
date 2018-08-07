<template>
    <div>

        <div class="row">
            <div class="col-lg-12">
    			 
            	
                <div class="bg-white table-responsive" style="min-height: 500px;padding: 10px">
                    <!--<div class="row">
                        <div class="col-sm-6 col-md-4 col-lg-2">
                            <span class="size20 font-bold">设备数据</span>
                        </div>
                    </div>
                    <hr class="divider mt-10">-->
                    	
                    <!--<div class="row" >-->
                        <div class="col-lg-12 OperatorSearch" style="padding: 0 10px;">
                            <span class="OrgTopAligin" v-show="!propsData.EquipmentId" style="margin: 0 0 0px 0;">
                                <span class="input-groups">
                                    <select id="selectItem" class="form-control selectpicker" data-style="btn-white" data-live-search="true" data-size="8">
                                        <option value="0">请先选择项目</option>
                                    </select>
                                </span>
                            </span>
                            <span class="OrgTopAligin" v-show="!propsData.EquipmentId" style="margin: 0 0 -45px 0;">
                                <span class="input-groups">
                                    <select id="selectDevice" class="form-control selectpicker" data-style="btn-white" data-live-search="true" data-size="8">
                                        <option value="0">请先选择设备</option>
                                    </select>
                                </span>
                            </span>
                            <span class="OrgTopAliginTime" style="margin: 0 0 0px 0;width: 180px;"><!--style="margin: 0 0 -45px -10px;width: 180px;"-->
                                <span id="searchStartTime" class="input-group date form_time" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                    <input id="StartDate" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                </span>
                            </span>
                            <span class="OrgTopAliginTime" style="margin:0;width: 180px;"><!--style="margin: 0 0 -45px 0;width: 180px;"-->
                                <span id="searchEndTime" class="input-group date form_time" data-date="2017-01-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                    <input id="EndDate" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                </span>
                            </span>
                            <span class="OrgTopAligin" style="margin:;width: 80px;">
                                <span class="input-groups">
                                    <select id="pageIndexData" class="form-control selectpicker" data-style="btn-white">
                                        <option value="20">20条</option>
                                        <option value="50">50条</option>
                                        <option value="100">100条</option>
                                        <option value="200">200条</option>
                                    </select>
                                </span>
                            </span>
                            <span class="OrgTopAliginTime OperatorSearch" style="margin:0;width: 180px;"><!--style="margin: 0 0 -45px 0;"-->
                                <span class="input-group">
                                    <button @click="serarch()" type="button" class="btn btn-default">
                                        <i class="fa fa-search m-r-5"></i>查找
                                    </button>
                                </span>
                            </span>
                        </div>
                        
                    <!--</div>-->
                    <!--<div class="row">
                        <div class="dataTables_wrapper no-footer" v-show="noData">
                            <div id="example1_processing" class="dataTables_processing">数据加载中...</div>
                        </div>
                    </div>-->

                    <div class="dataTables_wrapper no-footer" v-if="isExporting">
                            <div style="" id="example1_processing" class="dataTables_processing">正在导出数据...</div>
                    </div>
                    <div class="row">
                        <div class="dataTables_wrapper no-footer" v-show="emptyData">
                            <div class="dataTables_processing" style="background-image: none;text-indent: 0;">暂无数据</div>
                        </div>
                    </div>
                    <div class="bs-bars pull-right OperatorExports" style="margin-left:20px; position: absolute; top: 5px; right: 15px;">
                        <div>
                            <button @click="exportAll()" class="btn btn-default" style="margin-top:10px">导出所有</button>
                        </div>
                    </div>
                    <div class="bs-bars pull-right OperatorExports" style="margin-left:20px;position: absolute; top: 5px; right: 112px;">
                        <div id="toolbar">
                            <button id="export" @click="tableExport()" class="btn btn-default" style="margin-top:10px">导出：Excel</button>
                        </div>
                    </div>
                    
                    <table v-show="!noData" id="table" data-show-columns="true" data-pagination="false" data-toggle="table" data-show-export="true"></table>
                   
                    <loading :styles="'margin-top:200px'" v-show="noData"></loading>
                    <div class="dataTables_wrapper"  v-if="page_num > 0 && !noData">
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
    </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
    export default {
        data: function() {
            return {
                page_size: 20, //页大小
                page_index: 1, //页索引
                begin_row: 0, //开始条数
                end_row: 0, //结束条数
                total: 0, //总的数据条数
                page_num: 0, //多少页
                page_record: 1, //当前页码
                processing: 0, //0:数据加载处理中 1:处理完成
                noData: false,
                emptyData: false,
                indexInt: 1,
                StartTime: '',
                EndTime: '',
                initProjectId: '',
                initEquipmentId: '',
                historyArr: [],
                totalData: [],
                historyData: [],
                eosRegisterAddress: [],
                isExporting:false,
                ResourceId:''
            }
        },
        props: ['propsData'],
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
                if(!this.propsData.EquipmentId) {
                    this.initProjectId = $("#selectItem").selectpicker('val') == 0 ? '' : $("#selectItem").selectpicker('val');
                    this.initEquipmentId = $("#selectDevice").selectpicker('val') == 0 ? '' : $("#selectDevice").selectpicker('val');
                } else {
                    this.initProjectId = _this.propsData.ProjectId;
                    this.initEquipmentId = _this.propsData.EquipmentId;
                }
                if(this.initEquipmentId == '') {
                    return;
                }
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "TerminalEquipmentId": _this.initEquipmentId,
                    }
                };
                eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/QueryDisPlayName', "GET", params, "json", function(result) {
                    _this.processing = 1;
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        var historyData = result.Data.Result
                        if(historyData.length == 0) {
                            return;
                        }
                        var historyArr = ["时间"];
                        for(var i = 0; i < historyData.length; i++) {
                        	if(historyData[i].DisplayName=='父协议地址'){
                        		continue;
                        	}
                            historyArr.push(historyData[i].DisplayName)
                            _this.eosRegisterAddress.push(historyData[i].RegisterAddress)
                        }
                        _this.historyArr = historyArr
                    }
                });
            },
            getValue: function() {
                if(this.initEquipmentId == '') {
                    return;
                }
                var _this = this;
                _this.noData = true;
                _this.StartTime = $('#StartDate').val();
                _this.EndTime = $('#EndDate').val();
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "PageIndex": this.page_index,
                    "PageSize": this.page_size,
                    "Parameters": {
                        "TerminalEquipmentId": _this.initEquipmentId,
                        "RegisterAddresses": _this.RegisterAddress,
                        "StartTime": _this.StartTime,
                        "EndTime": _this.EndTime
                    }
                };
                eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/QueryData', "GET", params, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        _this.noData = false;
                        var historyData = [];
                        if(result.Data.Result) {
                            _this.emptyData = false;
                            _this.total = result.Data.Total;
                            var resultData = result.Data.Result;
                            _this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
                            _this.end_row = _this.page_size * (_this.page_index - 1) + resultData.length;
                            _this.page_num = Math.ceil(_this.total / _this.page_size);
                            for(var i = 0; i < resultData.length; i++) {
                                var queryDataTime = []
                                queryDataTime.push(resultData[i].ActivityDate)
                                for(var key in resultData[i].Details) {
                                    queryDataTime.push(resultData[i].Details[key].NodeValue)
                                }
                                historyData.push(queryDataTime)
                            }
                            _this.historyData = queryDataTime
                            _this.buildTable($('#table'), _this.historyArr.length, historyData.length, _this.historyArr, historyData);
                        } else {
                            _this.page_num = 0;
                            _this.historyData = [];
                            _this.buildTable($('#table'), _this.historyArr.length, historyData.length, _this.historyArr, historyData)
                        }
                    }
                });
            },
            buildTable: function($el, cells, rows, rowsTitle, cellsContent) {
                var i, j, row,
                        columns = [],
                        data = [];
                for(i = 0; i < cells; i++) {
                    columns.push({
                        field: 'field' + i,
                        title: rowsTitle[i],
                    });
                }
                for(i = 0; i < rows; i++) {
                    row = {};
                    for(j = 0; j < cells; j++) {
                        row['field' + j] = "<span class='w-128'>" + cellsContent[i][j] + "<span class='pr-10'>";
                    }
                    data.push(row);
                }
                $el.bootstrapTable('destroy').bootstrapTable({
                    columns: columns,
                    data: data
                });
            },
            getProjectList: function() {
                var _this = this;
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "PageIndex": this.page_index,
                    "PageSize": this.page_size,
                    "Parameters": {
                        "Keywords": ""
                    }
                };
                eosCommon.eosAjax(eosCommon.COMMON_API + 'api/common/project', "GET", params, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        if(result.Data != "") {
                            for(var i = 0; i < result.Data.Result.length; i++) {
                                $("#selectItem, #addSelectItem").append("<option value=" + result.Data.Result[i]['ProjectId'] + ">" + result.Data.Result[i]['ProjectName'] + "</option>");
                            }
                            $("#selectItem, #addSelectItem").selectpicker('refresh');
                        }
                    }
                });
            },
            setChangeEvent: function() {
                var _this = this;
                $('#selectItem').change(function() {
                    _this.initProjectId = $('#selectItem').selectpicker('val');
                    _this.getDeviceList("#selectDevice", _this.initProjectId);
                });
                $("#selectDevice").change(function() {
                    _this.initEquipmentId = $("#selectDevice").selectpicker('val');
                    _this.getData();
                    _this.getValue();
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
                                _this.getValue();
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
            serarch: function() {
            	this.page_index=1;
            	this.page_record=1;
                this.getValue();
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
            tableExport: function() {
                $('#table').tableExport({
                    type: 'excel',
                    escape: false
                });
            },
            exportAll: function() {
                var _this=this;
                _this.getDownloadValue();

            },
            getDownloadValue:function(){
                if(this.initEquipmentId == '') {
                    return;
                }
                var _this = this;               
                _this.isExporting = true;
                _this.StartTime = $('#StartDate').val();
                _this.EndTime = $('#EndDate').val();
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "PageIndex": this.page_index,
                    "PageSize": _this.total,
                    "Parameters": {
                        "TerminalEquipmentId": _this.initEquipmentId,                   
                        "StartTime": _this.StartTime,
                        "EndTime": _this.EndTime
                    }
                };
                eosCommon.eosMaxAjax(eosCommon.ENTERPRISE_API + 'api/equipment/ExportHistoric', "GET", params, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                    	_this.isExporting = false;
                    	if(result.Data instanceof Array){
                    		//数据为空
                    		vdialog({
		                        type: 'confirm',
		                        title: '提示',
		                        content: '暂无数据导出，导出数据失败！',
		                        ok: function() {
		                        	
		                        },
		                        cancel: true,
		                        modal: true
	       				 	});
                    		return;
                    	}
                       	_this.ResourceId=result.Data.ResourceId;
               			window.location.href=result.Data.DownloadUrl;
                     	eosCommon.eosMessage('success', '导出数据成功');

                     	// _this.deleteValue();
                       
                    }
                },function(err) {
                	_this.isExporting = false;
				vdialog({
                        type: 'confirm',
                        title: '提示',
                        content: '导出数据超时，您可以尝试缩小查询时间范围再试！',
                        ok: function() {
                        	
                        },
                        cancel: true,
                        modal: true
       				 });
					});
            },
            deleteValue:function(){
            	var _this=this;
            		var params={
					    "AccessToken":eosCommon.storage.get("AccessToken"),
					    "Parameters":{
				         "ResourceId":_this.ResourceId, //必填
				         "ResourceType":4//必填 可选值：0:项目资源 1:设备资源 2:证件资源 3:配置资源 4:其他资源
	    				}
					}
            		 eosCommon.eosAjax(eosCommon.RESOURCES_API + 'api/resource/delete', "DELETE", params, "json", function(result) {
	                    if(eosCommon.checkCode(result.State, result.Message)) {                       	                       		                       
	                    }
                	});
            },
            initData(){
            	var _this = this;
            eosCommon.eosOperators(eosCommon.eosOperDataHandle());
            $('.form_date').datetimepicker({
                language: 'zh-CN',
                weekStart: 1,
                todayBtn: 1,
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0
            });
            $('.form_time').datetimepicker({
                format: 'yyyy-mm-dd hh:ii:ss',
                weekStart: 1,
                autoclose: true,
                forceParse: false,
                todayBtn: 1,
                todayHighlight: 1,
                language: 'zh-CN'
            });
            //查询时间——开始
            // 16小时前
            let ago16h = new Date() - 60*60*16*1000
            ago16h = new Date(ago16h)
            Date.prototype.format = FUNC.date.format
            // console.log(ago16h.format("yyyy-MM-dd hh:mm:ss"))
            // $('#StartDate').val(eosCommon.getTime("yyyy-MM-dd hh:mm:ss", -3));
            $('#StartDate').val(ago16h.format("yyyy-MM-dd hh:mm:ss"));

            $('#EndDate').val(eosCommon.getTime("yyyy-MM-dd hh:mm:ss", 0));
            $('#searchStartTime').datetimepicker('setEndDate', $("#EndDate").val());
            $('#searchEndTime').datetimepicker('setStartDate', $("#StartDate").val());
            $("#StartDate").change(function() {
                $('#searchEndTime').datetimepicker('setStartDate', $(this).val());
            });
            $("#EndDate").change(function() {
                $('#searchStartTime').datetimepicker('setEndDate', $(this).val());
            });
            $("#pageIndexData").selectpicker('refresh');
            $("#pageIndexData").change(function() {
                _this.page_size = parseInt($('#pageIndexData').selectpicker('val'));
                _this.getValue()
            });
			//_this.exportAll();
            //查询时间——结束
            _this.getData();
            _this.getProjectList();
            _this.setChangeEvent();
            _this.getValue();
            }
        },
        watch: {
            page_index: function(val) {
                this.indexInt = val;
                this.getValue();
            },
            propsData:{
        		handler(val,oldVal){
        			this.initData();
        		},
        		deep:true
        	}
        },
        updated: function() {
            eosCommon.eosOperators(eosCommon.eosOperDataHandle());
        },
        mounted: function() {
            this.initData();
        }
    }
</script>
<style>
	.row{
	margin-left:0px!important;
	margin-right:0px!important;
	
	}
    .input-groups {
        position: relative;
        display: table;
        border-collapse: separate;
    }
    .fixed-table-toolbar .columns{
    	position: absolute;
    	top: 5px;
    	right: 228px;
    }
</style>
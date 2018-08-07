<template>
    <div id="event_log">
        <div class="row">
            <div class="col-sm-12">
                <div class="bg-white table-responsive" style="min-height: 220px;padding: 15px">
                    <!--<div class="row">
                        <div class="col-sm-6 col-md-4 col-lg-2">
                            <span class="size20 font-bold">事件记录</span>
                        </div>
                    </div>
                    <hr class="divider mb-10 mt-10">-->
                    <div class="row">
                        <div class="col-lg-12 OperatorSearch">
                            <div class="OrgTopAligin" v-show="!propsData.EquipmentId">
                                <select id="selectItem" class="form-control selectpicker input-sm" data-style="btn-white" data-live-search="true" data-size="8">
                                    <option value="0">请先选择项目</option>
                                </select>
                            </div>
                            <div class="OrgTopAligin" v-show="!propsData.EquipmentId">
                                <select id="selectDevice" class="form-control selectpicker input-sm" data-style="btn-white" data-live-search="true" data-size="8">
                                    <option value="0">请先选择设备</option>
                                </select>
                            </div>
                            <span class="OrgTopAliginTime" style="width: 180px;">
								<span id="startTime" class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
									<input id="StartDate" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
									<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								</span>
							</span>
                            <span class="OrgTopAliginTime" style="width: 180px;">
								<span id="endTime" class="input-group date form_date" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
									<input id="EndDate" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
									<span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								</span>
							</span>
                            <span class="OrgTopAligin">
								<button @click="getData()" type="button" class="btn btn-default waves-effect waves-light">
									<i class="fa fa-search m-r-5"></i>查找
								</button>
							</span>
                        </div>
                    </div>
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
                    <table id="eosSelectAcitve" class="table table-striped table-bordered" width="100%" style="border: 0 solid #fff;margin-top: 10px;">
                        <thead class="thead-bottom-line">
                        <tr>
                            <th class="sorting-title">序号</th>
                            <th class="sorting-title">设备</th>
                            <th class="sorting-title">所属项目</th>
                            <th class="sorting-title">操作人</th>
                            <th class="sorting-title">事件内容</th>
                            <th class="sorting-title">操作时间</th>
                            <th class="sorting-title-max">项目地址</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr @click="activehover(index)" class="list-table-hover" v-for="(item,index) in eventLogListData">
                            <td class="sorting_content">{{index+1+((indexInt-1)*page_size)}}</td>
                            <td class="sorting_content">{{item.EquipmentAlias}}</td>
                            <td class="sorting_content">{{item.ProjectName}}</td>
                            <td class="sorting_content">{{item.Creator}}</td>
                            <td class="sorting_content">{{item.LogContent}}</td>
                            <td class="sorting_content">{{item.LogDate}}<span style="margin-left: 5px;">{{item.LogTime}}</span></td>
                            <td class="sorting_content">{{item.ProjectAddress}}</td>
                        </tr>
                        </tbody>
                    </table>
                    <no-data v-show="emptyData"></no-data>
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
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                eventLogListData: "",
                page_size: 10, //页大小
                page_index: 1, //页索引
                begin_row: 0, //开始条数
                end_row: 0, //结束条数
                total: 0, //总的数据条数
                page_num: 0, //多少页
                page_record: 1, //当前页码
                processing: 0, //0:数据加载处理中 1:处理完成
                noData: false,
                emptyData: '',
                indexInt: 1,
                initProjectId: '',
                initEquipmentId: '',
                selectStartDate:'',
                selectEndDate:''
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
                _this.noData = true;
				this.selectStartDate=$("#StartDate").val();
				this.selectEndDate=$("#EndDate").val();				
                if(!this.propsData.EquipmentId) {
                    this.initProjectId = $("#selectItem").selectpicker('val') == 0 ? '' : $("#selectItem").selectpicker('val');
                    this.initEquipmentId = $("#selectDevice").selectpicker('val') == 0 ? '' : $("#selectDevice").selectpicker('val');
                } else {
                    this.initProjectId = this.propsData.ProjectId;
                    this.initEquipmentId = this.propsData.EquipmentId;
                }
                
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "PageIndex": this.page_index,
                    "PageSize": this.page_size,
                    "Parameters": {
                        "ProjectId": this.initProjectId,
                        "EquipmentId": this.initEquipmentId,
                        "StartDate": this.selectStartDate,
                        "EndDate": this.selectEndDate
                    }
                };
                eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/QueryEvent', "GET", params, "json", function(result) {
                    _this.processing = 1;
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        _this.noData = false;
                        if(result.Data == "") {
                            _this.eventLogListData = [];
                            _this.page_num = 0;
                            _this.emptyData = true;
                        }
                        else {
                            _this.emptyData = false;
                            _this.total = result.Data.Total;
                            _this.eventLogListData = result.Data.Result;
                            _this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
                            _this.end_row = _this.page_size * (_this.page_index - 1) + _this.eventLogListData.length;
                            _this.page_num = Math.ceil(_this.total / _this.page_size);
                        }
                    }
                });
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
                                $("#selectItem, #addSelectItem").append("<option value=" + result.Data.Result[i]['ProjectId'] + ">" + result.Data.Result[i]['ProjectName'] + "</option>");
                            }
                            $("#selectItem, #addSelectItem").selectpicker('refresh');
                        }
                    }
                });
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
            get_form_date: function() {
            },
            setChangeEvent: function() {
                var _this = this;
                $('#selectItem').change(function() {
                    var ProjectId = $('#selectItem').selectpicker('val');

                    _this.getDeviceList("#selectDevice", ProjectId);
                });
                 $('#selectDevice').change(function() {
						_this.initEquipmentId = $("#selectDevice").selectpicker('val');
                  		_this.getData();
                });
                $('#selectItemAdd').change(function() {
                    var ProjectId = $('#selectItemAdd').selectpicker('val');
                    if($(this).selectpicker('val') != 0) {
                        $("#addSelectItemText").val($(this).selectpicker('val'))
                    }
                    _this.getDeviceList("#selectDevice1Add", ProjectId);
                });
            },
            getDeviceList: function(obj, ProjectId, fn) {
                if(ProjectId == 0) {
                    $(obj).empty().append("<option value='0'>选择设备</option>");
                    $(obj).selectpicker('refresh');
                } else {
                    var _this = this;
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
                                this.initEquipmentId='';
                                _this.getData();
                                
                            }
                        }
                    });
                }
            },
            initData(){
            	 var _this = this;
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
            $('#StartDate').val(eosCommon.getTime("yyyy-MM-dd", -30));
            $('#EndDate').val(eosCommon.getTime("yyyy-MM-dd", 1));
            $('#startTime').datetimepicker('setEndDate', $("#EndDate").val());
            
            $('#endTime').datetimepicker('setStartDate', $("#StartDate").val());

            $("#StartDate").change(function() {
                $('#endTime').datetimepicker('setStartDate', $(this).val());
            });
            $("#EndDate").change(function() {
                $('#startTime').datetimepicker('setEndDate', $(this).val());
            });
            $('#selectItem,#selectDevice').selectpicker('refresh');
            this.getData();
            this.getProjectList();
            this.setChangeEvent();
            }
        },
        watch: {
            page_index: function(val) {
                this.indexInt = val;
                this.getData();
                this.removeActiveClass();
            },
             propsData:{
        		handler(val,oldVal){
        			this.initData();
        		},
        		deep:true
        	}
        },
         updated:function(){
        
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());
        	
        },
        mounted: function() {
           this.initData();
        }
    }
</script>
<style scoped>
    /*#event_log .row .list-text-title { height: 24px; line-height: 22px; display: inline-block; font-weight: bold; }*/
    /*#event_log .row .list-text { height: 25px; line-height: 25px; margin: 10px 0; display: inline-block; }*/
    #event_log .dataTables_wrapper .dataTables_processing {
        top: 70px;
    }
</style>
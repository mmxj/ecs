<template>
    <div>
        <div class="input-group">
		<input v-model="ProjectName" id="txtProjectName" class="form-control required" size="16" type="text" value="" data-valid="isNonEmpty" data-error="费用归属项目不能为空" placeholder="请选择费用归属项目" disabled="disabled">
        <div style="position: absolute;">
            <span class="valid-form-group-addon">
                <label class="focus valid"></label>
            </span>
        </div>
		<span class="input-group-addon" data-toggle="modal" data-target="#modal-cleosProject" @click="newGetData()"><span class="fa fa-bars"></span></span>
		<input type="hidden" v-model="ProjectId" id="hidProjectId" value="" />
        </div>
		<div id="modal-cleosProject" class="modal fade" role="dialog" data-backdrop="static" aria-hidden="true" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="win-close" data-dismiss="modal">×</button>
                    <button type="button" class="sava" data-dismiss="modal" aria-hidden="true" v-on:click="get_project()"><i class='fa fa-save m-r-5'></i>确定</button>
                    <h4 class="modal-title">选择项目</h4>
                </div>
                <div class="modal-body nicescroll">
                    <div class="row mb-10">
                        <div class="col-lg-12">
                            <span class="OrgTopAligin">
                            <input id="txtProjectNoName" v-model.trim="projectSerach" class="form-control" placeholder="项目编号/项目名称" type="text">
                        </span>
                            <span class="OrgTopAligin">
                            <button @click="serarch()" id="btnQueryProjects" type="button" class="btn btn-default">
                                <i class="fa fa-search m-r-5"></i>查找
                            </button>
                        </span>
                        </div>
                    </div>
                    <div class="dataTables_wrapper">
                        <div class="loading" v-if="processing==0" v-bind:style="{display: 'block'}">数据加载中...</div>
                        <table class="table table-striped table-bordered dataTable mt-0 employee_table" role="grid" aria-describedby="example1_info" style="width: 100%;" width="100%">
                            <thead>
                            <tr role="row">
                                <th rowspan="1" colspan="1">序号</th>
                                <th rowspan="1" colspan="1">项目编号</th>
                                <th rowspan="1" colspan="1">项目名称</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr v-bind:class="((index % 2) == 0 ? 'odd' : 'even') + (selectRow == item.ProjectId ? ' selected' : '')" v-on:click="is_check_tr(item)" role="row" v-for="(item,index) in projectListData" @click="ischeckdate(item)">
                                <td>{{index+begin_row}}</td>
                                <td>{{item.ProjectNo}}</td>
                                <td>{{item.ProjectName}}</td>
                            </tr>
                            <tr class="odd" v-if="page_num == 0"><td valign="top" colspan="6" class="dataTables_empty">暂无数据</td></tr>
                            </tbody>
                        </table>
                        <div v-if="page_num > 0">
                            <div class="dataTables_info" role="status" aria-live="polite" v-cloak>当前显示 {{begin_row}} 到 {{end_row}} 条记录   共 {{total}} 条记录</div>
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
                                <a class="paginate_button next"  v-bind:class="page_record == page_num ? 'disabled' : ''" v-on:click="dow_page">下一页</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
	export default{
		data: function () {
		    return {
		        projectListData: "",
		        projectSerach: "",
		        page_size: 10, //页大小
		        page_index: 1, //页索引
		        begin_row: 0, //开始条数
		        end_row: 0, //结束条数
		        total: 0, //总的数据条数
		        page_num: 0, //多少页
		        page_record: 1, //当前页码
		        processing: 0, //0:数据加载处理中 1:处理完成
		        selectRow: '',
		        projectData: '',
		        ProjectName: '',
		        ProjectId: ''
		    }
		},
		computed: {
		    one_page: function () {
		        return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 2 : this.page_num - 5) : 2);
		    },
		    two_page: function () {
		        return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 1 : this.page_num - 4) : 3);
		    },
		    three_page: function () {
		        return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index : this.page_num - 3) : 4);
		    },
		    four_page: function () {
		        return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 1 : this.page_num - 2) : 5);
		    },
		    five_page: function () {
		        return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 2 : this.page_num - 1) : 6);
		    }
		},
		methods: {
		    getData: function () {
		        var _this = this;
		        var param = {
		            "AccessToken": eosCommon.storage.get("AccessToken"),
		            "PageSize": this.page_size,
		            "PageIndex": this.page_index,
		            "Parameters": {
		                "Keywords": this.projectSerach
		            }
		        }
		        var url = eosCommon.COMMON_API + "api/common/project";
		        eosCommon.eosAjax(url, "GET", param, "json", function (result) {
		            _this.processing = 1;
		            if (eosCommon.checkCode(result.State, result.Message)) {
		                if (result.Data == "") {
		                    _this.projectListData = [];
		                    _this.page_num = 0;
		                }
		                else {
		                    _this.total = result.Data.Total;
		                    _this.projectListData = result.Data.Result;
		                    _this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
		                    _this.end_row = _this.page_size * (_this.page_index - 1) + _this.projectListData.length;
		                    _this.page_num = Math.ceil(_this.total / _this.page_size);
		                }
		            }
		        });
		    },
	        newGetData: function (){
	        	this.selectRow = $("#hidProjectId").val();
        	    this.projectSerach = '';
    	    	this.ProjectName = $("#txtProjectName").val();
    	        this.ProjectId  = $("#hidProjectId").val();
    	        this.page_index  = 1;
	        	this.getData();
	        },
		    serarch: function () {
		        this.getData()
		    },
		    ischeckdate: function (item) {
		        this.projectData = item;
		    },
		    is_check_tr: function (item) {
		        this.selectRow = item.ProjectId;
		    },
		    get_project: function () {
	            if (this.projectData == '') {
	            	return false;
	            }else{
	            	this.ProjectName = this.projectData.ProjectName;
	                this.ProjectId   = this.projectData.ProjectId;
	                $('#txtProjectName').next('.valid-form-group-addon').find('.focus').html('');
	            }
	        },
		    up_page: function () {
		        if (this.page_index > 1) {
		            this.page_index--;
		            this.page_record--;
		        }
		    },
		    on_page: function (data) {
		        this.page_index = data;
		        this.page_record = data;
		    },
		    dow_page: function () {
		        if (this.page_index < this.page_num) {
		            this.page_index++;
		            this.page_record++;
		        }
		    },

		},
		watch: {
		    page_index: function (val) {
		        this.getData();
		    }
		},
		mounted: function() {
	    	var _this = this;
	        this.getData();
	        $('#txtProjectNoName').bind('keypress',function(event){
                if(event.keyCode == "13"){
                    _this.getData();
                }
            });
		}
	}
</script>
<template>
    <div id="job-order">
        <div class="card-box table-responsive">
            <div id="jobOrderData">
                <div>
                    <span class="size20 font-bold">任务列表</span>
                </div>
                <hr class="divider mt-10">
                <div class="panel row mt-10">
                    <div class="addBtn m-r-30 OrgTopAligin">
                        <router-link to="/ecos/work_order" type="button" class="btn btn-white" v-show="!propsData.workOrder">
                           <i class="fa fa-navicon m-r-5"></i>工单列表
                        </router-link>
                        <a href="javascript:;" class="btn btn-white" v-show="propsData.workOrder" @click="changeCurrentViewName(propsData.workOrder)"><i class="fa fa-calendar m-r-5"></i>工单列表</a>
                    </div>
                   <div class="OperatorSearch">
                   		 <div class="OrgTopAligin" v-show="!propsData.jobOrder">
                        <select  id="selectItem" class="form-control selectpicker input-sm" data-style="btn-white" data-live-search="true" data-size="8">
                            <option value="0">请先选择项目</option>
                        </select>
                    </div>
                    <span style="width: 138px;">
                        <select id="selectOrderType" class="form-control selectpicker input-sm" data-style="btn-white">
                            <option value="0">请选择工单类别</option>
                            <option value="1">调试</option>
                            <option value="2">保修</option>
                            <option value="3">保养</option>
                            <option value="4">维修</option>
                            <option value="5">其它</option>
                        </select>
                    </span>
                    <div class="OrgTopAligin">
                        <select id="selectOrderState" class="form-control selectpicker input-sm" data-style="btn-white">
                            <option value="3">工单状态</option>
                            <option value="0">安排中</option>
                            <option value="1">已完成</option>
                        </select>
                    </div>
                    <span style="width: 138px;">
                        <select id="selectPriority" class="form-control selectpicker input-sm" data-style="btn-white">
                            <option value="0">请选择任务优先级</option>
                            <option value="1">普通</option>
                            <option value="2">紧急</option>
                            <option value="3">非常紧急</option>
                        </select>
                    </span>
                    <span class="OrgTopAligin">
                        <button @click="getData()" type="button" class="btn btn-default waves-effect waves-light">
                            <i class="fa fa-search m-r-5"></i>查找
                        </button>
                    </span>
                   </div>
                    <div class="clearfix"></div>
                </div>
                <div class="row bg-white">
                    <div class="col-sm-12 col-md-12 col-lg-12 pull-left">
                        <div class="order-card-box table-responsive">
                            <div class="row">
                                <div class="dataTables_wrapper no-footer" v-show="noData">
                                   <div id="example1_processing" class="dataTables_processing">数据加载中...</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="dataTables_wrapper no-footer" v-show="emptyData">
                                   <div class="dataTables_processing" style="background-image: none;text-indent: 0;">暂无数据</div>
                                </div>
                            </div>
                            <div class="row">

                                <table class="table table-striped table-bordered" width="100%" style="border: 0 solid #fff;margin-top: 10px;">
                                    <thead class="thead-bottom-line">
                                    <tr>
                                        <th class="sorting-title">序号</th>
                                        <th class="sorting-title">任务类别</th>
                                        <th class="sorting-title">任务名称</th>
                                        <th class="sorting-title">所属项目</th>
                                        <th class="sorting-title content-max-width">任务内容</th>
                                        <th class="sorting-title">开始时间</th>
                                        <th class="sorting-title">结束时间</th>
                                        <th class="sorting-title">执行状态</th>
                                        <th class="sorting-title">任务优先级</th>
                                        <th class="sorting-title">操作</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr class="list-table-hover" v-for="(item,index) in jobOrderList">
                                        <td class="sorting_content">{{index+1+((indexInt-1)*page_size)}}</td>
                                        <td class="sorting_content">{{item.OrderTypeName}}</td>
                                        <td class="sorting_content">{{item.TaskName}}</td>
                                        <td class="sorting_content">{{item.ProjectName}}</td>
                                        <td class="sorting_content content-max-width">{{item.TaskContent}}</td>
                                        <td class="sorting_content">{{item.StartDate}}</td>
                                        <td class="sorting_content">{{item.DueDate}}</td>
                                        <td class="sorting_content">
                                            <label v-if="item.ProcessStatus === 0" class="label eos-btn-normal btn-rounded">安排中</label>
                                            <label v-if="item.ProcessStatus === 1" class="label eos-btn-info btn-rounded">已完成</label>
                                        </td>
                                        <td class="sorting_content">
                                            <label v-if="item.Priority === 1" class="label eos-btn-warning btn-rounded">普通</label>
                                            <label v-if="item.Priority === 2" class="label eos-btn-abnormal btn-rounded">紧急</label>
                                            <label v-if="item.Priority === 3" class="label eos-btn-danger btn-rounded">非常紧急</label>
                                        </td>
                                        <td class="sorting_content">
                                            <span class="OperatorBtnView" @click="openJobOrderView(item.TaskId,0)" title="查看详情"><i class="fa fa-eye"></i></span>
                                            <span class="OperatorBtnEdit OperatorEdit" v-if="item.ProcessStatus === 0" @click="openJobOrderView(item.TaskId,1)" title="编辑任务单"><i class="fa fa-pencil"></i></span>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div class="col-md-12 dataTables_wrapper" v-if="page_num > 0">
                                    <div class="dataTables_info" role="status" aria-live="polite">当前显示 {{begin_row}} 到 {{end_row}} 条记录   共 {{total}} 条记录</div>
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
            <div id="jobOrderView" class="row" style="display: none;">
                <div class="col-sm-12">
                    <div class="">
                        <div class="row">
                            <div class="col-lg-12">
                               <span class="size20 font-bold pt-5">查看任务详情</span>
                               <button type="button" class="btn btn-white pull-right" @click="cancel()"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
                            </div>
                        </div>
                        <hr class="divider mb-10 mt-10">
                        <div class="row">
                            <div class="col-lg-7 col-md-9 col-sm-11 col-xs-12">
                               <div class="report-box">
                                   <div class="report-table-header">
                                        <span class="report-r col-sm-2"><b class="size14">任务类别</b></span>
                                        <span class="report-r col-sm-2">{{viewDataTask.OrderTypeName}}</span>
                                        <span class="report-r col-sm-2"><b class="size14">执行状态</b></span>
                                        <span class="report-r col-sm-2">
                                            <label v-if="viewDataTask.ProcessStatus == 0" class="label eos-btn-normal btn-rounded">安排中</label>
                                            <label v-if="viewDataTask.ProcessStatus == 1" class="label eos-btn-info btn-rounded">已完成</label>
                                       </span>
                                         <span class="report-r col-sm-2"><b class="size14">任务优先级</b></span>
                                        <span class="report-r col-sm-2">
                                            <label v-if="viewDataTask.Priority == 1" class="label eos-btn-warning btn-rounded">普通</label>
                                            <label v-if="viewDataTask.Priority == 2" class="label eos-btn-abnormal btn-rounded">紧急</label>
                                            <label v-if="viewDataTask.Priority == 3" class="label eos-btn-danger btn-rounded">非常紧急</label>
                                        </span>
                                    </div>
                                    <div class="report-content">
                                        <p class="report-line clearfix">
                                           <span class="col-sm-2 text-right"><b>任务名称：</b></span>
                                           <span class="text-muted col-sm-10">{{viewDataTask.TaskName}}</span>
                                        </p>
                                        <p class="report-line clearfix">
                                           <span class="col-sm-2 text-right"><b>任务内容：</b></span>
                                           <span class="text-muted col-sm-10">{{viewDataTask.TaskContent}}</span>
                                        </p>
                                        <p class="report-line clearfix">
                                           <span class="col-sm-2 text-right"><b>任务类别：</b></span>
                                           <span class="text-muted col-sm-10">{{viewDataTask.OrderTypeName}}</span>
                                        </p>
                                        <p class="report-line clearfix">
                                           <span class="col-sm-2 text-right"><b>任务级别：</b></span>
                                           <span class="text-muted col-sm-10">{{viewDataTask.PriorityName}}</span>
                                        </p>
                                        <p class="report-line clearfix">
                                           <span class="col-sm-2 text-right"><b>任务状态：</b></span>
                                           <span class="text-muted col-sm-10">{{viewDataTask.ProcessStatusName}}</span>
                                        </p>
                                        <p class="report-line clearfix">
                                           <span class="col-sm-2 text-right"><b>任务开始时间：</b></span>
                                           <span class="text-muted col-sm-10">{{viewDataTask.StartDate}}</span>
                                        </p>
                                        <p class="report-line clearfix">
                                           <span class="col-sm-2 text-right"><b>任务结束时间：</b></span>
                                           <span class="text-muted col-sm-10">{{viewDataTask.DueDate}}</span>
                                        </p>
                                        <p class="report-line clearfix">
                                            <span class="col-sm-2 text-right"><b>任务执行人：</b></span>
                                            <span class="text-muted col-sm-10">
                                                <span v-for="(item,index) in viewDataTask.Executors" style="padding-right: 10px;">
                                                    <i v-if="(index != viewDataTask.Executors.length && index > viewDataTask.Executors.length)">{{item.UserName}}、</i>
                                                    <i v-if="(index == viewDataTask.Executors.length-1)">{{item.UserName}}</i>
                                                </span>
                                            </span>
                                        </p>
                                        <p class="report-line clearfix">
                                            <span class="col-sm-2 text-right"><b>任务参与人：</b></span>
                                            <span class="text-muted col-sm-10">
                                                <span v-for="(item,index) in viewDataTask.Participants" style="padding-right: 10px;">
                                                    <i v-if="(index != viewDataTask.Executors.length && index > viewDataTask.Executors.length)">{{item.UserName}}、</i>
                                                    <i v-if="(index == viewDataTask.Participants.length-1)">{{item.UserName}}</i>
                                                </span>
                                            </span>
                                        </p>
                                        <p class="report-line clearfix">
                                            <span class="col-sm-2 text-right"><b>项目联系人：</b></span>
                                            <span class="text-muted col-sm-10">{{viewDataTask.Contact}}</span>
                                        </p>
                                        <p class="report-line clearfix">
                                            <span class="col-sm-2 text-right"><b>项目联系电话：</b></span>
                                            <span class="text-muted col-sm-10">{{viewDataTask.ContactPhone}}</span>
                                        </p>
                                        <p class="report-line clearfix">
                                           <span class="col-sm-2 text-right"><b>项目联系电话：</b></span>
                                           <span class="text-muted col-sm-10">{{viewDataTask.ContactPhone}}</span>
                                        </p>
                                        <div v-if="actionType == 0" v-for="item in viewDataSchedule" class="report-line clearfix">
                                            <span class="col-sm-2 text-right"><b>{{item.StepId}}：</b></span>
                                            <div class="text-muted col-sm-10">
                                                <p>{{item.Title}} — 确认时间：{{item.ExecuteTime}}</p>
                                                <img v-for="imgItem in item.Photoes" style="width: 200px;display: inline-block;margin-right: 15px;" :src="imgItem.ResourceUrl" />
                                            </div>
                                        </div>
                                        <div v-if="actionType == 1" class="report-line clearfix">
                                            <span class="col-sm-2 text-right"><b>检修前现场拍照：</b></span>
                                            <div class="text-muted col-sm-10"><div id="imgBox1"></div></div>
                                        </div>
                                        <div v-if="actionType == 1" class="report-line clearfix">
                                            <span class="col-sm-2 text-right"><b>维修后现场拍照：</b></span>
                                            <div class="text-muted col-sm-10"><div id="imgBox2"></div></div>
                                       </div>
                                    </div>
                                    <div class="report-table-footer">
                                        <span class="report-r col-sm-2"><b>所属项目</b></span>
                                        <span class="report-no col-sm-4">{{viewDataTask.ProjectName}}</span>
                                        <span class="report-l col-sm-2"><b>项目地址</b></span>
                                        <span class="report-l col-sm-4">{{viewDataTask.ProjectAddress}}</span>
                                    </div>
                                </div>
                                <div class="content-box-footer">
                                    <div class="form-group">
                                        <div class="col-lg-6 col-xs-9">
                                            <button v-if="actionType == 1" @click="confirm()" type="submit" class="btn btn-default loading_btn" data-loading-text="保存中...">完成任务</button>
                                        </div>
                                    </div>
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
    data: function (){
    	return {
	        page_size: 10,
	        page_index: 1,
	        begin_row: 0,
	        end_row: 0,
	        total: 0,
	        page_num: 0,
	        page_record: 1,
	        processing: 0,
	        recordList: [],
	        noData: false,
	        emptyData: '',
	        currentViewTab: 'allList',
	        jobOrderList: [],
	        ProcessStatus: 3,
	        OrderType: 0,
	        Priority: 0,
	        viewDataTask: '',
	        viewDataSchedule: '',
	        actionType: 0,
	        TaskId: '',
            indexInt:1,
            initProjectId: ''
	    }
    },
    props: ['propsData'],
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
    methods:{
        getData: function (){
            var _this = this;
            _this.noData = true;
            if(_this.propsData.ProjectId){
                _this.initProjectId = _this.propsData.ProjectId;
            }else{
                _this.initProjectId = $("#selectItem").selectpicker('val') == 0? '' : $("#selectItem").selectpicker('val')
            }
            var params = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "PageIndex": this.page_index,
                "PageSize": this.page_size,
                "Parameters":{
                    "ProcessStatus": $("#selectOrderState").selectpicker('val'),
                    "OrderType": $("#selectOrderType").selectpicker('val'),
                    "Priority": $("#selectPriority").selectpicker('val'),
                    "ProjectId": _this.initProjectId
                }
            }
            eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/project/QueryTask', "GET", params, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    _this.noData = false;
                    if (result.Data == "") {
                        _this.jobOrderList = [];
                        _this.page_num = 0;
                        _this.emptyData = true;
                    }
                    else {
                        _this.emptyData = false;
                        _this.total = result.Data.Total;
                        _this.jobOrderList = result.Data.Result;
                        _this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
                        _this.end_row = _this.page_size * (_this.page_index - 1) + _this.jobOrderList.length;
                        _this.page_num = Math.ceil(_this.total / _this.page_size);
                    }
                }
            });
        },
        openJobOrderView: function (id,type){
            this.TaskId = id;
            this.actionType = type;
            var _this = this;
            var params = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters":{
                    "TaskId": id,
                }
            }
            eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/project/TaskDetail', "GET", params, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    if (result.Data != "") {
                        $("#jobOrderView").show();
                        $("#jobOrderData,#jobOrderEditor").hide();
                        _this.viewDataTask = result.Data.Task;
                        _this.viewDataSchedule = result.Data.Schedule;
                        if(type == 1){
                            var originalResourceIds = [];
                            var originalImg = [];
                            $("#imgBox1").empty();
                            for(var i = 0;i<result.Data.Schedule[1].Photoes.length;i++){
                                originalResourceIds.push(result.Data.Schedule[1].Photoes[i].ResourceId)
                                originalImg.push(result.Data.Schedule[1].Photoes[i].ResourceUrl)
                            }
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
                            $("#imgBox2").empty();
                            $("#imgBox2").html(
                                '<div class="uploader_img2 eos_uploader_img">' +
                                    '<div class="queueList">' +
                                        '<div id="dndArea" class="placeholder">' +
                                        '<div id="filePickerImg2">点击选择图片</div>' +
                                        '</div>' +
                                        '<ul class="filelist clearfix"></ul>' +
                                    '</div>' +
                                    '<div class="statusBar" style="display:none;">' +
                                        '<div class="btns">' +
                                            '<div id="continueImgBtn2"></div><div class="uploadBtn">开始上传</div>' +
                                        '</div>' +
                                        '<div class="info"></div>' +
                                    '</div>' +
                                '</div>'
                            );
                            var param = {
                                "AccessToken": eosCommon.storage.get("AccessToken"),
                                "ResourceType": "0",
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
                                'fileNumLimit': 100,
                                'fileSingleSizeLimit': 3 * 1024 * 1024,
                                'ResourceIds': originalResourceIds,
                                'imgUrls': originalImg,
                                'succ': function (result) {
                                    if (result != "") {
                                        var param = {
                                            "AccessToken": eosCommon.storage.get("AccessToken"),
                                            "Parameters": {
                                                "TaskId": _this.TaskId,
                                                "Operation": "U",
                                                "FileType": "O",
                                                "ResourceIds": [result.Data[0].ResourceId]
                                            }
                                        };
                                        var url = eosCommon.ENTERPRISE_API + "api/project/TaskFile";
                                        eosCommon.eosAjax(url, "Put", param, "json", function (result){
                                            if (eosCommon.checkCode(result.State, result.Message)) {}
                                        });
                                    }
                                },
                                'del': function (result) {
                                    _this.delResourceImg(result);
                                    var param = {
                                        "AccessToken": eosCommon.storage.get("AccessToken"),
                                        "Parameters": {
                                            "TaskId": _this.TaskId,
                                            "Operation": "U",
                                            "FileType": "O",
                                            "ResourceIds": [result]
                                        }
                                    };
                                    var url = eosCommon.ENTERPRISE_API + "api/project/TaskFile";
                                    eosCommon.eosAjax(url, "Put", param, "json", function (result) {
                                        if (eosCommon.checkCode(result.State, result.Message)) {}
                                    });
                                }
                            });
                            var finishResourceIds = [];
                            var finishImg = [];
                            for(var i = 0;i<result.Data.Schedule[2].Photoes.length;i++){
                                finishResourceIds.push(result.Data.Schedule[2].Photoes[i].ResourceId)
                                finishImg.push(result.Data.Schedule[2].Photoes[i].ResourceUrl)
                            }
                            eosCommon.eosUploaderImg({
                                'uploaderObj': 'uploaderImg2',
                                'uploaderBox': '.uploader_img2',
                                'uploaderList': '.queueList',
                                'initBtn': '#filePickerImg2',
                                'continueBtn': '#continueImgBtn2',
                                'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                                'data': param,
                                'fileNumLimit': 100,
                                'fileSingleSizeLimit': 3 * 1024 * 1024,
                                'ResourceIds': finishResourceIds,
                                'imgUrls': finishImg,
                                'succ': function (result) {
                                    if (result != "") {
                                        var param = {
                                            "AccessToken": eosCommon.storage.get("AccessToken"),
                                            "Parameters": {
                                                "TaskId": _this.TaskId,
                                                "Operation": "U",
                                                "FileType": "F",
                                                "ResourceIds": [result.Data[0].ResourceId]
                                            }
                                        };
                                        var url = eosCommon.ENTERPRISE_API + "api/project/TaskFile";
                                        eosCommon.eosAjax(url, "Put", param, "json", function (result) {
                                            if (eosCommon.checkCode(result.State, result.Message)) {}
                                        });
                                    }
                                },
                                'del': function (result) {
                                    _this.delResourceImg(result);
                                    _this.delJobOrderImg(result);
                                    var param = {
                                        "AccessToken": eosCommon.storage.get("AccessToken"),
                                        "Parameters": {
                                            "TaskId": _this.TaskId,
                                            "Operation": "D",
                                            "FileType": "F",
                                            "ResourceIds": [result]
                                        }
                                    };
                                    var url = eosCommon.ENTERPRISE_API + "api/project/TaskFile";
                                    eosCommon.eosAjax(url, "Put", param, "json", function (result) {
                                        if (eosCommon.checkCode(result.State, result.Message)) {}
                                    });
                                }
                            });
                        }
                    }
                }
            });
        },
        getProjectList: function (){
            var _this = this;
            var params = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "PageIndex": '',
                "PageSize": '',
                "Parameters":{
                    "Keywords": ""
                }
            }
            eosCommon.eosAjax(eosCommon.COMMON_API + 'api/common/project', "GET", params, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    if (result.Data != "") {
                        for(var i = 0; i< result.Data.Result.length;i++){
                            $("#selectItem, #addSelectItem").append("<option value="+ result.Data.Result[i]['ProjectId'] +">"+ result.Data.Result[i]['ProjectName'] +"</option>");
                        }
                        $("#selectItem, #addSelectItem").selectpicker('refresh');
                    }
                }
            });
        },
        delResourceImg: function (result){
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
                    }
                });
            }
        },
        confirm: function (){
            var _this = this;
            vdialog({
                type: 'confirm',
                title: '提示',
                content: "是否确认完成此任务？确认之后将无法改变任务状态！",
                ok: function () {
                    btn = $(".loading_btn").button('loading');
                    var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "Parameters": {
                                "TaskId": _this.TaskId
                            }
                        }
                    var url = eosCommon.ENTERPRISE_API + "api/project/FinishTask";
                    eosCommon.eosAjax(url, "Put", param, "json", function (result) {
                        if (eosCommon.checkCode(result.State, result.Message)) {
                            eosCommon.eosMessage('success', "该任务已被完全");
                            _this.getData();
                            $("#jobOrderData").show();
                            $("#jobOrderView,#jobOrderEditor").hide();
                            $(".loading_btn").button('reset');
                        }
                    });
                },
                cancel: true,
                modal: true
            });
        },
        cancel: function (){
            $("#jobOrderData").show();
            $("#jobOrderView,#jobOrderEditor").hide();
        },
        getList: function(tabText,state){
            this.currentViewTab = tabText;
            this.ProcessStatus  = state;
            this.getData()
        },
        changeCurrentViewName: function (name){
            this.propsData.currentView = name;
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
        }
    },
    watch: {
        page_index: function (val) {
            this.indexInt = val;
            this.getData();
        }
    },
    updated:function(){        
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());        	
        },
    mounted: function(){					    	
        var _this = this;
    	$("#selectOrderType, #selectPriority,#selectOrderState").selectpicker('refresh');
        this.getData();
        this.getProjectList();
        $("#selectItem#selectOrderType,#selectPriority,#selectOrderState").change(function (){
            _this.getData();
        })
    }
}
</script>
<style>
    #job-order .order-card-box{
        padding: 10px 15px 15px 15px;
        background-clip: padding-box;
        margin-bottom: 20px;
        background-color: #ffffff;
    }
    #job-order .dataTables_wrapper .dataTables_processing{
       top: 70px;
    }
    #job-order i{
        font-style: normal;
    }
</style>
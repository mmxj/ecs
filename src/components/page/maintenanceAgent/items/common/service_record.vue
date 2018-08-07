<template>
    <div id="record-box">
        <div class="row">
            <div class="col-sm-12">
                <div id="divDataTableView" class="card-box table-responsive" style="min-height: 330px;">
                    <div class="row">
                        <div class="col-md-12">
                            <span class="size20 font-bold">服务记录</span>
                        </div>
                    </div>
                    <hr class="divider mb-10 mt-10">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="OrgTopAligin OperatorInsert">
                                <button @click="addRecord()" type="button" class="btn btn-default waves-effect waves-light">
                                    <i class="fa fa-plus m-r-5"></i>新增
                                </button>
                            </span>
                            <span class="OperatorSearch">
		                    		<div class="OrgTopAligin" v-show="!propsData.jobOrder">
		                                <select  id="selectItem" class="form-control selectpicker input-sm" data-style="btn-white" data-live-search="true" data-size="8">
		                                    <option value="0">请先选择项目</option>
		                                </select>
		                            </div>
		                            <div class="OrgTopAligin">
		                                <select id="ServiceType" class="form-control selectpicker input-sm" data-style="btn-white">
		                                    <option value="0">服务类别</option>
		                                    <option value="1">调试</option>
		                                    <option value="2">保修</option>
		                                    <option value="3">保养</option>
		                                    <option value="4">维修</option>
		                                    <option value="5">其它</option>
		                                </select>
		                            </div>
		                            <span class="OrgTopAliginTime">
		                                <span id="startTime" class="input-group date form_date" data-date="2017-01-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
		                                    <input id="StartDate" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
		                                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
		                                </span>
		                            </span>
		                            <span class="OrgTopAliginTime">
		                                <span id="endTime" class="input-group date form_date" data-date="2017-01-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
		                                    <input id="EndDate" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
		                                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
		                                </span>
		                            </span>
		                            <span class="OrgTopAligin ">
		                                <button @click="getData()" type="button" class="btn btn-default waves-effect waves-light">
		                                    <i class="fa fa-search m-r-5"></i>查找
		                                </button>
		                            </span>
                            </span>
                            
                        </div>
                    </div>
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
                    <div class="row mt-5">
                        <table class="table table-striped table-bordered" width="100%" style="border: 0 solid #fff;margin-top: 10px;">
                            <thead class="thead-bottom-line">
                            <tr>
                                <th class="sorting-title">序号</th>
                                <th class="sorting-title">服务类型</th>
                                <th class="sorting-title">所属项目</th>
                                <th class="sorting-title">单据单号</th>
                                <th class="sorting-title content-max-width">服务内容</th>
                                <th class="sorting-title">服务客户</th>
                                <th class="sorting-title">服务人员</th>
                                <th class="sorting-title">开始时间</th>
                                <th class="sorting-title">结束时间</th>
                                <th class="sorting-title">服务状态</th>
                                <th class="sorting-title">操作</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr class="list-table-hover" v-for="(item,index) in recordList">
                                <td class="sorting_content">{{index+1+((indexInt-1)*page_size)}}</td>
                                <td class="sorting_content">{{item.ServiceTypeName}}</td>
                                <td class="sorting_content">{{item.ProjectName}}</td>
                                <td class="sorting_content" :title="item.ServiceOrderNo">{{item.ServiceOrderNo}}</td>
                                <td class="sorting_content content-max-width">{{item.ServiceContent}}</td>
                                <td class="sorting_content">{{item.CustomerName}}</td>
                                <td class="sorting_content">{{item.Technicians}}</td>
                                <td class="sorting_content">{{item.StartTime}}</td>
                                <td class="sorting_content">{{item.EndTime}}</td>
                                <td class="sorting_content">
                                    <label v-if="item.ServiceState == 1" class="label eos-btn-warning btn-rounded">{{item.ServiceStateName}}</label>
                                    <label v-if="item.ServiceState == 2" class="label eos-btn-normal btn-rounded">{{item.ServiceStateName}}</label>
                                    <label v-if="item.ServiceState == 3" class="label eos-btn-info btn-rounded">{{item.ServiceStateName}}</label>
                                    <label v-else-if="item.ServiceState == 4" class="label eos-btn-abnormal btn-rounded">{{item.ServiceStateName}}</label>
                                </td>
                                <td class="sorting_content">
                                    <span class="OperatorBtnView" @click="recordView(item.ServiceOrderId)" title="查看详情"><i class="fa fa-eye"></i></span>
                                    
                                    <span @click="delRequest(item.ServiceOrderId)" class="OperatorBtnDel OperatorDel" title="删除信息"><i class="fa fa-trash-o"></i></span>
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
                <!-- 服务记录详情 Start -->
                <div id="recordView" class="row" style="display: none;">
                    <div class="col-sm-12">
                        <div class="card-box">
                            <div class="row">
                                <div class="col-lg-12">
                                    <span class="size20 font-bold pt-5">查看详情</span>
                                    <button type="button" class="btn btn-white pull-right" @click="confirmBtn()"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
                                </div>
                            </div>
                            <hr class="divider mb-10 mt-10">
                            <div class="row">
                                <div class="col-lg-7 col-md-9 col-sm-11 col-xs-12">
                                    <div class="report-box">
                                        <div class="report-content">
                                            <p class="report-line report-line-title clearfix">
                                                <span class="col-sm-2 top-title"><b>服务单号信息</b></span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">服务单号：</span>
                                                <span class="text-muted col-sm-10" :title="ServiceOrderNo">{{ServiceOrderNo}}</span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">服务类型：</span>
                                                <span class="text-muted col-sm-10 eos-text-info">{{ServiceTypeName}}</span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">服务状态：</span>
                                                <span class="text-muted col-sm-10">
                                                    <label v-if="ServiceState == 1" class="label eos-btn-warning btn-rounded">{{ServiceStateName}}</label>
                                                    <label v-if="ServiceState == 2" class="label eos-btn-normal btn-rounded">{{ServiceStateName}}</label>
                                                    <label v-if="ServiceState == 3" class="label eos-btn-info btn-rounded">{{ServiceStateName}}</label>
                                                    <label v-else-if="ServiceState == 4" class="label eos-btn-abnormal btn-rounded">{{ServiceStateName}}</label>
                                                </span>
                                            </p>

                                            <p class="report-line report-line-title clearfix">
                                                <span class="col-sm-2 top-title"><b>服务客户信息</b></span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">服务人员：</span>
                                                <span class="text-muted col-sm-10">
                                                    <span v-for="(item,index) in Technicians">
                                                        <i v-if="(index != Technicians.length && index > Technicians.length)">{{item.UserName}}、</i>
                                                        <i v-if="(index == Technicians.length-1)">{{item.UserName}}</i>
                                                    </span>
                                                </span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">服务客户：</span>
                                                <span class="text-muted col-sm-10">{{CustomerName}}</span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">开始时间：</span>
                                                <span class="text-muted col-sm-10">{{StartTime}}</span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">结束时间：</span>
                                                <span class="text-muted col-sm-10">{{EndTime}}</span>
                                            </p>

                                            <p class="report-line report-line-title clearfix">
                                                <span class="col-sm-2 top-title"><b>服务内容信息</b></span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">服务内容：</span>
                                                <span class="text-muted col-sm-10">{{ServiceContent}}</span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">工作摘要：</span>
                                                <span class="text-muted col-sm-10">{{JobSummary}}</span>
                                            </p>
                                            <div class="report-line clearfix">
                                                <span class="col-sm-2 text-right">合同文件：</span>
                                                <div id="ContractFiles" class="text-muted col-sm-10"></div>
                                            </div>
                                            <div class="report-line clearfix">
                                                <span class="col-sm-2 text-right">清单文件：</span>
                                                <div id="WorkOrderFiles" class="text-muted col-sm-10"></div>
                                            </div>
                                            <div class="report-line clearfix">
                                                <span class="col-sm-2 text-right">维修前图片：</span>
                                                <div id="OriginalPhotos" class="text-muted col-sm-10"></div>
                                            </div>
                                            <div class="report-line clearfix">
                                                <span class="col-sm-2 text-right">维修后图片：</span>
                                                <div id="FinishedPhotos" class="text-muted col-sm-10"></div>
                                            </div>

                                            <p class="report-line report-line-title clearfix">
                                                <span class="col-sm-2 top-title"><b>添加人信息</b></span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">创建人：</span>
                                                <span class="text-muted col-sm-10">{{CreatedBy}}</span>
                                            </p>
                                            <p class="report-line clearfix">
                                                <span class="col-sm-2 text-right">创建时间：</span>
                                                <span class="text-muted col-sm-10">{{CreatedOn}}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 服务记录详情 End -->
                <div id="addRecord" class="card-box table-responsive" style="display: none;">
                    <div class="row">
                        <div class="col-md-6">
                            <span class="size20 font-bold">{{title}}</span>
                        </div>
                        <div class="col-md-6">
                            <button type="button" class="btn btn-white pull-right" @click="confirmBtn()"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
                        </div>
                    </div>
                    <hr class="divider mb-10 mt-10">
                    <div id="verifyCheck">
                        <div class="form-horizontal content-box">
                            <div class="form-group" v-show="!propsData.jobOrder">
                                <label class="content-title-left">
                                    <em class="ak_required_em">*</em>
                                    请选择项目
                                    </label>
                                <div class="col-lg-5 col-xs-8">
                                    <select  id="addSelectItem" class="form-control selectpicker input-sm " data-style="btn-white" data-live-search="true" data-size="8">
                                        <option value="">请先选择项目</option>
                                    </select>
                                    <input style="position: absolute;top: 0;left: -20000em;" id="addSelectItemText" type="text" class="form-control required" data-valid="isNonEmpty" data-error="请选择项目" />
                                    <span class="valid-form-group" style="margin: 2px 0 0 12px;">
                                        <label class="focus valid"></label>
                                    </span>
                                    <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">
                                    <em class="ak_required_em">*</em>选择服务类别
                                </label>
                                <div class="col-lg-5 col-xs-8">
                                    <select id="addServiceType" class="form-control selectpicker input-sm" data-style="btn-white">
                                        <option value="1">调试</option>
                                        <option value="2">保修</option>
                                        <option value="3">保养</option>
                                        <option value="4">维修</option>
                                        <option value="5">其它</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left"><em class="ak_required_em">*</em>选择服务人员</label>
                                <div class="col-lg-5 col-xs-8">
                                    <div id="ExecutorsList" class="level-linkage"></div>
                                    <label class="btn btn-white" data-toggle="modal" data-target="#eosDialogLevelLinkage" v-on:click="levelLinkage"><i class="fa fa-group mr-5"></i>服务人员</label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">
                                    <em class="ak_required_em">*</em>服务内容
                                </label>
                                <div class="col-lg-5 col-xs-8">
                                    <textarea v-model="ServiceContent" type="text" class="form-control required" data-valid="isNonEmpty" maxlength="1500" data-error="服务内容不能为空" placeholder="请输入服务内容" /></textarea>
                                    <span class="valid-form-group" style="top: 86px;left: 15px;">
                                        <label class="focus valid"></label>
                                    </span>
                                    <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                </div>
                            </div>
                        </div>
                        <div class="form-horizontal content-box">
                            <div class="form-group">
                                <label class="content-title-left"><em class="ak_required_em">*</em>开始时间</label>
                                <div class="col-lg-2 col-xs-3">
                                    <span id="spanStartTime1" class="input-group date form_time">
                                        <input id="txtStartTime1" class="form-control" size="16" type="text" v-on:click="btnSelectTime()" readonly>
                                        <span class="input-group-addon" v-on:click="btnSelectTime()"><span class="glyphicon glyphicon-th"></span></span>
                                    </span>
                                </div>
                                <div class="col-lg-1 col-xs-2">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>结束时间</label>
                                </div>
                                <div class="col-lg-2 col-xs-3">
                                    <span id="spanEndTime1" class="input-group date form_time">
                                        <input id="txtEndTime1" class="form-control" size="16" type="text" v-on:click="btnSelectTime()" readonly>
                                        <span class="input-group-addon" v-on:click="btnSelectTime()"><span class="glyphicon glyphicon-th"></span></span>
                                    </span>
                                </div>
                            </div>
                        </div>
                         <div class="form-horizontal content-box">
                            <div class="form-group">
                                <label class="content-title-left">工作摘要</label>
                                <div class="col-lg-5 col-xs-8">
                                    <textarea v-model="JobSummary" maxlength="1500" type="text" class="form-control" placeholder="请输入工作摘要" /></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">合同编号</label>
                                <div class="col-lg-5 col-xs-8">
                                    <input v-model="ContractNo" type="text" class="form-control" placeholder="请输入合同编号" maxlength="20" />
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">合同文件</label>
                                <div class="col-lg-5 col-xs-8">
                                    <div id="fileBox1" style="margin-top: -10px;"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">清单文件</label>
                                <div class="col-lg-5 col-xs-8">
                                    <div id="fileBox2" style="margin-top: -10px;"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">维修前照片</label>
                                <div class="col-lg-5 col-xs-8">
                                    <div id="imgBox1"></div>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="content-title-left">维修后照片</label>
                                <div class="col-lg-5 col-xs-8">
                                    <div id="imgBox2"></div>
                                </div>
                            </div>
                        </div>
                        <div class="content-box-footer">
                            <div class="form-group">
                                <label class="content-title-left"></label>
                                <div class="col-lg-5 col-xs-8 pl-22">
                                    <button @click="confirmBtn()" type="button" class="btnReturn btn btn-white pull-left mr-10">取消</button>
                                    <button @click="btnSave()" type="submit" class="btn btn-default pull-left">确定</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="eosDialogLevelLinkage" class="modal fade" tabindex="-1" role="dialog" data-backdrop='static' aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="win-close" data-dismiss="modal">×</button>
                    <button type="button" class="sava comfirn" data-dismiss="modal" aria-hidden="true"><i class='fa fa-save m-r-5'></i>确认</button>
                    <h4 class="modal-title" id="myModalLabel">选择服务人员</h4>
                </div>
                <div class="modal-body ak_tree mt-10">
                    <div class="level_linkage_box">
                        <div class="main_tree_box nicescroll">
                            <ul id="levelLinkageTree" class="levelLinkageTree"></ul>
                        </div>
                        <div class="tree_panel_box nicescroll">
                            <ul class="tree_panel"></ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data: function (){
        return {
            page_size: 10, //页大小
            page_index: 1, //页索引
            begin_row: 0, //开始条数
            end_row: 0, //结束条数
            total: 0, //总的数据条数
            page_num: 0, //多少页
            page_record: 1, //当前页码
            processing: 0, //0:数据加载处理中 1:处理完成
            recordList: [],
            noData: false,
            ProjectAddress:"",
            emptyData: '',
            ProjectName: '',
            CustomerName: '',
            EquipmentName: '',
            ServiceType: '',
            ServiceTypeName: '',
            ServiceState: '',
            ServiceStateName: '',
            Technicians: '',
            StartTime: '',
            EndTime: '',
            JobSummary: '',
            CreatedBy: '',
            CreatedOn: '',
            ContractNo: '',
            ServiceContent:'',
            ServiceOrderNo: '',
            editStatus: '',
            title: '',
            indexInt: 1,
            initProjectId: ''
          
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
    props: ['propsData'],
    methods: {
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
                    "ProjectId": _this.initProjectId,
                    "ServiceType": $("#ServiceType").selectpicker('val'),
                    "ServiceState": 0,
                    "StartTime": $('#StartDate').val(),
                    "EndTime": $('#EndDate').val()
                }
            }
            eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/project/services', "GET", params, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    _this.noData = false;
                    if (result.Data == "") {
                        _this.recordList = [];
                        _this.page_num = 0;
                        _this.emptyData = true;
                    }
                    else {
                        _this.emptyData = false;
                        _this.total = result.Data.Total;
                        _this.recordList = result.Data.Result;
                        _this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
                        _this.end_row = _this.page_size * (_this.page_index - 1) + _this.recordList.length;
                        _this.page_num = Math.ceil(_this.total / _this.page_size);
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
        addRecord: function (){
            this.editStatus = 1;
            this.title = "新增服务记录";
            $('#addRecord').show();
            $('#divDataTableView').hide();
            $('#addSelectItem').selectpicker('val',"");
            $("#addSelectItemText").val('');
            $('#ExecutorsList, .tree_panel').empty();
            this.ServiceContent = '';
            this.JobSummary = '';
            this.ContractNo = '';
            $("#addSelectItem").change(function (){
                if($(this).selectpicker('val') == ""){
                    $("#addSelectItemText").val("");
                    verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
                }else{
                    $('#addSelectItemText').next('.valid-form-group').find('.focus').html('');
                    $("#addSelectItemText").val($(this).selectpicker('val'))
                }
            })
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
                'ResourceIds': ResourceIds,
                'imgUrls': imgUrls,
                'succ': function (result) { },
                'del': function (result) {
                    if (result != "") {
                        var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "Parameters": {
                                "ResourceId": result,
                                "ResourceType": "0"
                            }
                        };
                        var url = eosCommon.RESOURCES_API + "api/resource/delete";
                        eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                            if (eosCommon.checkCode(result.State, result.Message)) {
                            }
                        });
                    }
                }
            });
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
                'ResourceIds': ResourceIds,
                'imgUrls': imgUrls,
                'succ': function (result) { },
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
                            }
                        });
                    }
                }
            });
            $("#fileBox1").empty();
            $("#fileBox2").empty();
            $("#fileBox1").html(
                '<div id="fileDnd1" class="uploader_box1 eos_uploader_box">' +
                    '<div class="wu-example">' +
                        '<div class="uploader-list"></div>' +
                        '<div class="btns">' +
                            '<div id="picker">选择上传文件</div>' +
                        '</div>' +
                    '</div>' +
                '</div>');
            $("#fileBox2").html(
                '<div id="fileDnd2" class="uploader_box2 eos_uploader_box">' +
                    '<div class="wu-example">' +
                        '<div class="uploader-list"></div>' +
                        '<div class="btns">' +
                            '<div id="picker2">选择上传文件</div>' +
                        '</div>' +
                    '</div>' +
                '</div>');
            var fileParam = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "ResourceType": "0",
                "Title": "附件",
                "Description": "附件"
            };
            eosCommon.eosUploaderFile({
                'uploaderObj': 'uploaderFile',
                'uploaderBox': '.uploader_box1',
                'uploaderList': '.uploader-list',
                'initBtn': '#picker',
                'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                'data': fileParam,
                'fileNumLimit': 10,
                'upType': 0,
                'succ': function (result) { },
                'del': function (result) {
                    //删除资源ID对应的文件
                    if (result != "") {
                        var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "Parameters": {
                                "ResourceId": result,
                                "ResourceType": "0"
                            }
                        };
                        var url = eosCommon.RESOURCES_API + "api/resource/delete";
                        eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                            if (eosCommon.checkCode(result.State, result.Message)) {
                            }
                        });
                    }
                }
            });
            eosCommon.eosUploaderFile({
                'uploaderObj': 'uploaderFile',
                'uploaderBox': '.uploader_box2',
                'uploaderList': '.uploader-list',
                'initBtn': '#picker2',
                'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                'data': param,
                'fileNumLimit': 10,
                'upType': 0,
                'succ': function (result) { },
                'del': function (result) {
                    //删除资源ID对应的文件
                    if (result != "") {
                        var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "Parameters": {
                                "ResourceId": result,
                                "ResourceType": "0"
                            }
                        };
                        var url = eosCommon.RESOURCES_API + "api/resource/delete";
                        eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                            if (eosCommon.checkCode(result.State, result.Message)) {
                            }
                        });
                    }
                }
            });
            $('#txtStartTime1').val(eosCommon.getTime("yyyy-MM-dd hh:mm:ss",0));
            $('#txtEndTime1').val(eosCommon.getTime("yyyy-MM-dd hh:mm:ss",1));
            this.set_StartEndTime();
        },
        editRequest: function (item) {
            this.title = "修改服务记录";
            var _this = this;
            var params = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "ServiceOrderId": item.ServiceOrderId
                }
            }
            eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/project/ServiceOrderDetail', "GET", params, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    _this.editStatus = 2;
                    _this.ServiceOrderId = result.Data.ServiceOrderId;
                    _this.ContractNo = result.Data.ContractNo;
                    $('#addRecord').show();
                    $('#divDataTableView').hide();
                    $("#addSelectItem").selectpicker('val',result.Data.ProjectId);
                    $("#addSelectItemText").val(result.Data.ProjectId);
                    $("#ExecutorsList").empty();
                    for(var i = 0;i<result.Data.Technicians.length;i++){
                        $("#ExecutorsList").append("<li data-id="+ result.Data.Technicians[i].AccountId +">"+ result.Data.Technicians[i].UserName +"</li>")
                    }
                    var SendTo = [];
                    $("#ExecutorsList li").each(function () {
                        if ($(this).attr("data-id") != null && $(this).attr("data-id") != "") {
                            var newJson = '{"id":"' + $(this).attr("data-id") + '","name":"' + $(this).text() + '"}';
                            SendTo.push(JSON.parse(newJson));
                        }
                    });
                    eosCommon.levelLinkage("#eosDialogLevelLinkage","levelLinkageTree",SendTo, function (res) { $('#lblSendToError').text(""); $("#ExecutorsList").empty(); $("#ExecutorsList").append(res) });
                    $('#txtStartTime1').val(result.Data.StartTime);
                    $('#txtEndTime1').val(result.Data.EndTime);
                    _this.JobSummary = result.Data.JobSummary;
                    _this.ServiceContent = result.Data.ServiceContent;
                    $("#OriginalPhotos,#FinishedPhotos,#WorkOrderFiles,#ContractFiles").empty();
                    var OriginalPhotosListId = [];
                    var OriginalPhotosListId = [];
                    var OriginalPhotosListUrls = [];
                    var FinishedPhotosListId = [];
                    var FinishedPhotosListUrls = [];
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
                    for(var i = 0;i<result.Data.OriginalPhotos.length;i++){
                        OriginalPhotosListId.push(result.Data.OriginalPhotos[i].ResourceId)
                        OriginalPhotosListUrls.push(result.Data.OriginalPhotos[i].ResourceUrl)
                    }
                    for(var i = 0;i<result.Data.FinishedPhotos.length;i++){
                        FinishedPhotosListId.push(result.Data.FinishedPhotos[i].ResourceId)
                        FinishedPhotosListUrls.push(result.Data.FinishedPhotos[i].ResourceUrl)
                    }
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
                        'fileNumLimit': 100,
                        'fileSingleSizeLimit': 3 * 1024 * 1024,
                        'ResourceIds': OriginalPhotosListId,
                        'imgUrls': OriginalPhotosListUrls,
                        'succ': function (result) { },
                        'del': function (result) {
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
                        }
                    });
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
                        'ResourceIds': FinishedPhotosListId,
                        'imgUrls': FinishedPhotosListUrls,
                        'succ': function (result) { },
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
                                    }
                                });
                            }
                        }
                    });
                    $("#fileBox1").empty();
                    $("#fileBox2").empty();
                    $("#fileBox1").html(
                        '<div id="fileDnd1" class="uploader_box1 eos_uploader_box">' +
                            '<div class="wu-example">' +
                                '<div class="uploader-list"></div>' +
                                '<div class="btns">' +
                                    '<div id="picker">选择上传文件</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>');
                    $("#fileBox2").html(
                        '<div id="fileDnd2" class="uploader_box2 eos_uploader_box">' +
                            '<div class="wu-example">' +
                                '<div class="uploader-list"></div>' +
                                '<div class="btns">' +
                                    '<div id="picker2">选择上传文件</div>' +
                                '</div>' +
                            '</div>' +
                        '</div>');
                    var fileParam = {
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
                        'data': fileParam,
                        'fileNumLimit': 10,
                        'upType': 0,
                        'succ': function (result) { },
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
                                    }
                                });
                            }
                        }
                    });
                    eosCommon.eosUploaderFile({
                        'uploaderObj': 'uploaderFile',
                        'uploaderBox': '.uploader_box2',
                        'uploaderList': '.uploader-list',
                        'initBtn': '#picker2',
                        'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                        'data': param,
                        'fileNumLimit': 10,
                        'upType': 0,
                        'succ': function (result) { },
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
                                    }
                                });
                            }
                        }
                    });
                    for(var i = 0;i<result.Data.ContractFiles.length;i++){
                        $("#fileBox1").find('.uploader-list').append(
                            '<div id="' + result.Data.ContractFiles[i].FileId + '" class="item" data="' + result.Data.ContractFiles[i].FileId + '">' +
                                '<h4 class="info">' + result.Data.ContractFiles[i].FileName + '</h4>' +
                                '<div class="action"><button class="btn btn-default delFile">删除</button></div>'+
                                '<p class="state">已经上传</p>' +
                            '</div>');
                    };
                    for(var i = 0;i<result.Data.WorkOrderFiles.length;i++){
                        $("#fileBox2").find('.uploader-list').append(
                            '<div id="' + result.Data.WorkOrderFiles[i].FileId + '" class="item" data="' + result.Data.WorkOrderFiles[i].FileId + '">' +
                                '<h4 class="info">' + result.Data.WorkOrderFiles[i].FileName + '</h4>' +
                                '<div class="action"><button class="btn btn-default delFile">删除</button></div>'+
                                '<p class="state">已经上传</p>' +
                            '</div>');
                    };
                    $("#fileBox1,#fileBox2").on("click",".delFile",function (){
                        $(this).parents(".item").remove();
                    })
                }
            });
        },
        set_StartEndTime: function () {
            $('#spanEndTime1').datetimepicker('setStartDate', $('#txtStartTime1').val());
            $('#spanStartTime1').datetimepicker('setEndDate', $('#txtEndTime1').val());
        },
        btnSelectTime: function () {
            this.set_StartEndTime();
        },
        recordView: function (id){
            var _this = this;
            var params = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "ServiceOrderId": id
                }
            }
            eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/project/ServiceOrderDetail', "GET", params, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    $('#recordView').show();
                    $('#divDataTableView,#addRecord').hide();
                    _this.ProjectName = result.Data.ProjectName;
                    _this.CustomerName = result.Data.CustomerName;
                    _this.EquipmentName = result.Data.EquipmentName;
                    _this.ServiceType = result.Data.ServiceType;
                    _this.ServiceTypeName = result.Data.ServiceTypeName;
                    _this.ServiceState = result.Data.ServiceState;
                    _this.ServiceStateName = result.Data.ServiceStateName;
                    _this.Technicians = result.Data.Technicians;
                    _this.StartTime = result.Data.StartTime;
                    _this.EndTime = result.Data.EndTime;
                    _this.JobSummary = result.Data.JobSummary;
                    _this.CreatedBy = result.Data.CreatedBy;
                    _this.CreatedOn = result.Data.CreatedOn;
                    _this.ContractNo = result.Data.ContractNo;
                    _this.ServiceContent = result.Data.ServiceContent;
                    _this.ProjectAddress = result.Data.ProjectAddress;
                    _this.ServiceOrderNo = result.Data.ServiceOrderNo;
                    $("#OriginalPhotos,#FinishedPhotos,#WorkOrderFiles,#ContractFiles").empty();
                    if(result.Data.OriginalPhotos.length == 0){
                        $("#OriginalPhotos").append('暂无图片');
                    }else{
                        for(var i = 0;i<result.Data.OriginalPhotos.length;i++){
                            $("#OriginalPhotos").append('<img src="'+ result.Data.OriginalPhotos[i].ResourceUrl +'" />');
                        }
                        $("#OriginalPhotos").viewer();
                    }
                    if(result.Data.FinishedPhotos.length == 0){
                        $("#FinishedPhotos").append('暂无图片');
                    }else{
                        for(var i = 0;i<result.Data.FinishedPhotos.length;i++){
                            $("#FinishedPhotos").append('<img src="'+ result.Data.FinishedPhotos[i].ResourceUrl +'" />');
                        }
                        $("#FinishedPhotos").viewer();
                    }
                    if(result.Data.WorkOrderFiles == ""){
                        $("#WorkOrderFiles").append('暂无文件');
                    }else{
                        $("#WorkOrderFiles").append('<ul></ul>')
                        for(var i = 0;i<result.Data.WorkOrderFiles.length;i++){
                            $("#WorkOrderFiles ul").append('<li><a class="text-cleos" href="'+result.Data.WorkOrderFiles[i].FilePath+'" target="_blank">'+result.Data.WorkOrderFiles[i].FileName+'</a></li>');
                        }
                    }
                    if(result.Data.ContractFiles.length == ""){
                        $("#ContractFiles").append('暂无文件');
                    }else{
                        $("#ContractFiles").append('<ul></ul>');
                        for(var i = 0;i<result.Data.ContractFiles.length;i++){
                            $("#ContractFiles ul").append('<li><a class="text-cleos" href="'+result.Data.ContractFiles[i].FilePath+'" target="_blank">'+result.Data.ContractFiles[i].FileName+'</a></li>');
                        }
                    }
                }
            });
        },
        confirmBtn: function (){
            $('#recordView,#addRecord').hide();
            $('#divDataTableView').show();
        },
        levelLinkage: function () {
            //获取抄送人的ID和名称
            var SendTo = [];
            $("#ExecutorsList li").each(function () {
                if ($(this).attr("data-id") != null && $(this).attr("data-id") != "") {
                    var newJson = '{"id":"' + $(this).attr("data-id") + '","name":"' + $(this).text() + '"}';
                    SendTo.push(JSON.parse(newJson));
                }
            });
            eosCommon.levelLinkage("#eosDialogLevelLinkage","levelLinkageTree",SendTo, function (res) { $('#lblSendToError').text(""); $("#ExecutorsList").empty(); $("#ExecutorsList").append(res) });
            $.fn.niceScroll &&  $(".nicescroll").niceScroll({ cursorcolor: '#98a6ad',cursorwidth:'6px', cursorborderradius: '5px'});
        },
        btnSave: function () {
            var _this = this;
            if (!verifyCheck._click()) {
                return false;
            }
            var OriginalPhotosList = [];
            var FinishedPhotosList = [];
            var ContractFiles = [];
            var WorkOrderFiles = [];
            var TechniciansList = [];
            $("#imgBox1 li").each(function (){
                OriginalPhotosList.push($(this).attr('data'));
            });
            $("#imgBox2 li").each(function (){
                FinishedPhotosList.push($(this).attr('data'));
            });
            $("#fileDnd1 .uploader-list .item").each(function (){
                ContractFiles.push({"FileId":$(this).attr('data'),"FileName":$(this).find('h4').html()})
            });
            $("#fileDnd2 .uploader-list .item").each(function (){
                WorkOrderFiles.push({"FileId":$(this).attr('data'),"FileName":$(this).find('h4').html()})
            });
            $("#ExecutorsList li").each(function (){
                TechniciansList.push({"UserName":$(this).html(),"AccountId":$(this).attr('data-id')})
            });
            if (TechniciansList.length == 0) {
                vdialog({
                    type: 'error',
                    title: '提示',
                    content: "请选择服务人员",
                    ok: function () {},
                    cancel: true,
                    modal: true
                });
                return false;
            }
            if(_this.propsData.ProjectId){
                _this.initProjectId = _this.propsData.ProjectId;
            }else{
                _this.initProjectId = $("#addSelectItem").selectpicker('val') == 0? '' : $("#addSelectItem").selectpicker('val')
            }
            if(_this.editStatus == 1){
                var param = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "Parameters": {
                            "ProjectId": _this.initProjectId,
                            "EquipmentId": "",
                            "ServiceType": $("#addServiceType").selectpicker('val'),
                            "ServiceContent": _this.ServiceContent,
                            "StartTime": $("#txtStartTime1").val(),
                            "EndTime": $("#txtEndTime1").val(),
                            "Technicians": TechniciansList,
                            "JobSummary": _this.JobSummary,
                            "ContractNo": _this.ContractNo,
                            "ContractFiles": ContractFiles,
                            "WorkOrderFiles": WorkOrderFiles,
                            "OriginalPhotos": OriginalPhotosList,
                            "FinishedPhotos": FinishedPhotosList
                        }
                    }
                var url = eosCommon.ENTERPRISE_API + 'api/project/ServiceOrder';
                eosCommon.eosAjax(url, "Post", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                        _this.getData();
                        $('#addRecord').hide();
                        $('#divDataTableView').show();
                        $(".loading_btn").button('reset');
                    }
                });
            }else{
                var param = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "Parameters": {
                            "ProjectId": _this.initProjectId,
                            "EquipmentId": "",
                            "ServiceType": $("#addServiceType").selectpicker('val'),
                            "ServiceContent": _this.ServiceContent,
                            "StartTime": $("#txtStartTime1").val(),
                            "EndTime": $("#txtEndTime1").val(),
                            "Technicians": TechniciansList,
                            "JobSummary": _this.JobSummary,
                            "ContractNo": _this.ContractNo,
                            "ContractFiles": ContractFiles,
                            "WorkOrderFiles": WorkOrderFiles,
                            "OriginalPhotos": OriginalPhotosList,
                            "FinishedPhotos": FinishedPhotosList
                        }
                    }
                var url = eosCommon.ENTERPRISE_API + '/api/project/UpdateServiceOrder';
                eosCommon.eosAjax(url, "Put", param, "json", function (result) {
                    if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                        _this.getData();
                        $('#addRecord').hide();
                        $('#divDataTableView').show();
                        $(".loading_btn").button('reset');
                    }
                });
            }
        },
        delRequest: function (id) {
            var _this = this;
            vdialog({
                type: 'confirm',
                title: '提示',
                content: eosCommon.DELETE_MSG_ASK,
                ok: function () {
                    var param = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "Parameters": {
                            "ServiceOrderId": id
                        }
                    };
                    var url = eosCommon.ENTERPRISE_API + "api/project/DeleteServiceOrder";
                    eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                        if (eosCommon.checkCode(result.State, result.Message)) {
                            eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                            _this.getData();
                        }
                    });
                },
                cancel: true,
                modal: true
            });
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
            this.indexInt=val;
            this.getData();
        }
    },
    updated:function(){
        
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());
        	
        },
    mounted: function (){
        var _this = this;              			
       verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
        $("#addServiceType").selectpicker("refresh");
        $('.form_date').datetimepicker({
            format: 'yyyy-mm-dd',
            weekStart: 1,
            autoclose: true,
            startView: 2,
            minView: 2,
            forceParse: false,
            todayBtn:  1,
            todayHighlight: 1,
            language: 'zh-CN'
        });
        $('.form_time').datetimepicker({
            format: 'yyyy-mm-dd hh:ii:ss',
            weekStart: 1,
            autoclose: true,
            forceParse: false,
            todayBtn:  1,
            todayHighlight: 1,
            language: 'zh-CN'
        });
        $('#StartDate').val(eosCommon.getTime("yyyy-MM-dd", -30));
        $('#EndDate').val(eosCommon.getTime("yyyy-MM-dd", 1));
        $('#endTime').datetimepicker('setStartDate', $("#StartDate").val());
        $('#startTime').datetimepicker('setEndDate', $("#EndDate").val());
        $("#StartDate").change(function (){
            $('#endTime').datetimepicker('setStartDate', $(this).val());
        });
        $("#EndDate").change(function (){
            $('#startTime').datetimepicker('setEndDate', $(this).val());
        });
        this.getData();
        this.getProjectList();
        $("#selectItem,#ServiceType").change(function (){
            _this.getData();
        })
    }
}
</script>
<style>
@import '/static/css/notice.css';
#record-box .record-box ul{
    list-style-type: none;
}
#record-box .report-box img{
    float: left;
    display: block;
    width: 200px;
    margin-right: 10px;
    margin-bottom: 10px;
}
#record-box .dataTables_wrapper .dataTables_processing{
   top: 70px;
}
#record-box ul{
    padding: 0;
}
#record-box ul li{
    list-style-type: none;
}
#record-box i{
    font-style: normal;
}
</style>
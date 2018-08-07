<template>
    <div v-cloak>
        <div id="EosBaseDve2">
            <!--增加企业公告开始-->
            <div id="SystemNoticeAdd" class="card-box m-page table-responsive" v-if="notice_view == 0">
                <div class="row">
                    <div class="col-md-12">
                        <span class="size20 font-bold">新增公告</span>
                        <button type="submit" class="btnReturn btn btn-white pull-right" v-on:click="is_notice(1)"><i class="fa fa-clock-o mr-5 size16"></i>历史公告</button>
                    </div>
                </div>
                <hr class="divider mb-10 mt-10">
                <div class="row">
                    <div class="col-md-12">
                        <div id="verifyCheck">
                            <div class="form-horizontal content-box">
                                <div class="form-group">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>发送范围</label>
                                    <div class="col-lg-6 col-md-9 col-sm-8 col-xs-9">
                                        <div id="ulSendTo" class="level-linkage"></div>
                                        <label id="btnSendTo" class="btn btn-white" eosTis="Bottom Center 提示文字" x-placement="bottom" data-toggle="modal" data-target="#eosDialogLevelLinkage" v-on:click="levelLinkage"><i class="fa fa-group (alias) mr-5"></i>选择抄送人</label>
                                        <label id="lblSendToError" class="focus valid error"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>公告主题</label>
                                    <div class="col-lg-6 col-md-9 col-sm-8 col-xs-9">
                                        <span class="valid-form-group">
                                            <label class="focus valid"></label>
                                        </span>
                                        <input id="txtSubject" type="text" maxlength="50" class="form-control required"  data-valid="isNonEmpty||between:1-50||isOtherName" data-error="公告主题不能为空||公告主题长度1-50位||公告主题不能包含特殊字符" placeholder="请输入公告主题" />
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
                                        <input id="txtAbstract" type="text" maxlength="50" class="form-control required" data-valid="isNonEmpty||between:1-100" data-error="摘要内容不能为空||摘要长度1-100位|"  placeholder="请输入摘要内容、且摘要内容不超过100个字符" />
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
                                        <div id="fileBox1" style="margin-top: -10px;"></div>
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
                                        <button type="submit" class="btnReturn btn btn-white pull-left" v-on:click="is_notice(1)"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
                                        <button id="btnSend" type="submit" class="btn btn-default pull-left loading_btn" v-on:click="notice_add" data-loading-text="发布中...">发布</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--平台公告列表开始-->
            <div id="EosBaseDveList" class="card-box m-page table-responsive" v-else-if="notice_view == 1">
                <div class="row">
                    <div class="col-sm-6 col-md-4 col-lg-2">
                        <span class="size20 font-bold">企业公告</span>
                    </div>
                </div>
                <hr class="divider mb-10 mt-10">
                <div class="row">
                    <div class="col-lg-12">
                        <span class="OrgTopAligin OperatorInsert">
                            <button id="btnInsertDev" type="button" class="btn btn-default" v-on:click="is_notice(0)">
                                <i class="fa fa-plus m-r-5"></i>新增
                            </button>
                        </span>
                       <span class="OperatorSearch">
	               			 <span class="OrgTopAligin">
	                        	<input id="txtQuerySubject" type="search" class="form-control" v-model="query_where" placeholder="请输入公告主题">
	                   		 </span>
	                        <span class="OrgTopAligin">
	                            <button type="button" class="btn btn-default waves-effect waves-light" v-on:click="btnQuery()">
	                                <i class="fa fa-search m-r-5"></i>查找
	                            </button>
	                        </span>
                       </span>
                    </div>
                </div>
                <div id="exampleDev2_wrapper" class="dataTables_wrapper no-footer">
                    <div class="dt-buttons m-r-1"></div>
                    <div id="exampleDev2_filter" class="dataTables_filter">
                        <label></label>
                    </div>
                    
                    
                    <!--<div id="exampleDev2_processing" class="dataTables_processing" v-if="processing==0" v-bind:style="{display: 'block'}">数据加载中...</div>-->
                    <table id="exampleDev2" width="100%" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="exampleDev2_info" style="width: 100%;">
                        <thead>
                            <tr role="row">
                                <th>序号</th>
                                <th>公告主题</th>
                                <th>摘要</th>
                                <th>是否发送</th>
                                <th>发送时间</th>
                                <th>封面</th>
                                <th class="w-80">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(table, index) in table_data" v-bind:class="((index % 2) == 0 ? 'odd' : 'even') + (check_tr == index ? ' selected' : '')" v-on:click="is_check_tr(index)">
                                <td class="sorting_1">{{ index+begin_row }}</td>
                                <td class="txt_lt">{{table.Subject}}</td>
                                <td class="txt_lt">{{table.Abstract}}</td>
                                <td>{{table.IsSend == 1 ? '是' : '否'}}</td>
                                <td>{{table.SendTime}}</td>
                                <td><img :src="table.CoverUrl== ''?'../../../../static/images/default_image_device.jpg':table.CoverUrl" style="width: 50px;"></td>
                                <td>
                                    <span class="OperatorBtnView" data="1" v-on:click="notice_details(index)">
                                        <i class="fa fa-eye"></i>
                                    </span>
                                </td>
                            </tr>
                            <tr class="odd" v-if="page_num == 0"><td valign="top" colspan="6" class="dataTables_empty">暂无数据</td></tr>
                        </tbody>
                    </table>
                    <loading v-if="processing==0"></loading>
                    <div v-if="page_num > 0">
                        <div class="dataTables_info" id="exampleDev2_info" role="status" aria-live="polite">当前显示 {{begin_row}} 到 {{end_row}} 条记录   共 {{total}} 条记录</div>
                        <div class="dataTables_paginate paging_full_numbers" id="example1_paginate">
                            <a class="paginate_button previous" id="example1_previous" v-bind:class="page_record == 1 ? 'disabled' : ''" v-on:click="up_page">上一页</a>
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
                            <a class="paginate_button next" id="example1_next" v-bind:class="page_record == page_num ? 'disabled' : ''" v-on:click="dow_page">下一页</a>
                        </div>
                    </div>
                </div>

            </div>
            <!--平台公告查看详情开始-->
            <div id="SystemNoticeView" class="card-box table-responsive" v-else-if="notice_view == 2">
                <div class="row">
                    <div class="col-md-12">
                        <span class="size20 font-bold">企业公告详情</span>
                        <button type="button" class="btnReturn btn btn-white pull-right" v-on:click="is_notice(1)">
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
                                <p class="text-muted mb-10"> 抄送人员：<code id="viewSendTo" class="mr-10"></code></p>
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
        </div>
        <eos-float-modal></eos-float-modal>

    </div>
</template>
<script>
var btn = '';
    export default {
        data (){
            return  {
                notice_view: '', // 0:添加视图 1:列表视图 2:详情视图
                table_data: [], //接收列表的数据
                page_size: 10, //页大小
                page_index: 1, //页索引
                begin_row: 0, //开始条数
                end_row: 0, //结束条数
                total: 0, //总的数据条数
                page_num: 0, //多少页
                page_record: 1, //当前页码
                query_where: '', //查询条件
                processing: 0, //0:数据加载处理中 1:处理完成
                check_tr: -1 //检查选择的行
            }
        },
        components: { //内置模版设置
            'eos-float-modal': {
                props: {
                    //接收单向数据传递
                },
                template: '<div id="eosDialogLevelLinkage" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">'+
                '<div class="modal-content">'+
                '<div class="modal-header">'+
                '<button type="button" class="win-close" data-dismiss="modal">×</button>'+
                '<button type="button" class="sava comfirn" data-dismiss="modal" aria-hidden="true"><i class="fa fa-save m-r-5"></i>确认</button>'+
                '<h4 class="modal-title">选择人员</h4>'+
                '</div>'+
                '<div class="modal-body ak_tree mt-10">'+
                '<div class="level_linkage_box">'+
                '<div class="main_tree_box nicescroll">'+
                '<ul id="levelLinkageTree" class="levelLinkageTree"></ul>'+
                '</div>'+
                '<div class="tree_panel_box nicescroll">'+
                '<ul class="tree_panel"></ul>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>'
            }
        },
        created () {
				//this.notice_view = 0;
        },
        computed: { //计算属性，依赖数据缓存
            one_page () {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 2 : this.page_num - 5) : 2);
            },
            two_page () {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 1 : this.page_num - 4) : 3);
            },
            three_page () {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index : this.page_num - 3) : 4);
            },
            four_page:function(){
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 1 : this.page_num - 2) : 5);
            },
            five_page () {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 2 : this.page_num - 1) : 6);
            }
        },
        methods: { //vue实例中的方法不依赖缓存
            is_notice (data) {
                this.notice_view = data;
            },
            is_check_tr (data) {
                this.check_tr = data;
            },
            up_page () {
                if (this.page_index > 1){
                    this.page_index--;
                    this.page_record--;
                }
            },
            on_page (data) {
                this.page_index = data;
                this.page_record = data;
            },
            dow_page () {
                if (this.page_index < this.page_num) {
                    this.page_index++;
                    this.page_record++;
                }
            },
            levelLinkage () {
                //获取抄送人的ID和名称
                var SendTo = [];
                $("#ulSendTo li").each(function () {
                    if ($(this).attr("data-id") != null && $(this).attr("data-id") != "") {
                        var newJson = '{"id":"' + $(this).attr("data-id") + '","name":"' + $(this).text() + '"}';
                        SendTo.push(JSON.parse(newJson));
                    }
                });
                eosCommon.levelLinkage("#eosDialogLevelLinkage","levelLinkageTree",SendTo, function (res) { $('#lblSendToError').text(""); $("#ulSendTo").empty(); $("#ulSendTo").append(res) });
                $.fn.niceScroll &&  $(".nicescroll").niceScroll({ cursorcolor: '#98a6ad',cursorwidth:'6px', cursorborderradius: '5px'});
            },
            ready_add () {
                this.$nextTick(function () {
                    $("#txtNoticeContent").Editor();
                    $('#sendPerson').text(eosCommon.storage.get("Account"));
                    var myDate = new Date();
                    $('#sendTime').text(myDate.toLocaleString());
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
                        'succ' (result) { },
                        'del' (result) {
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
                                    if (eosCommon.checkCode(result.State, result.Message)) {}
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
                        'succ' (result) { },
                        'del' (result) {
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
                })
            },
            load_table () {
                var _this = this;
                _this.$nextTick(function () {
                    var url = eosCommon.ENTERPRISE_API + "api/notice/query";
                    var param= {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "PageSize": this.page_size,
                        "PageIndex": this.page_index,
                        "Parameters": {
                            "Subject": $.trim(_this.query_where),
                            "IsSend": ""
                        }
                    }
                    eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                        if (eosCommon.checkCode(result.State, result.Message)) {
                            _this.processing = 1;
                            if (result.Data == "") {
                                _this.table_data = [];
                                _this.page_num = 0;
                            }
                            else {
                                _this.total = result.Data.Total;
                                _this.table_data = result.Data.Result;
                                _this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
                                _this.end_row = _this.page_size * (_this.page_index - 1) + _this.table_data.length;
                                _this.page_num = Math.ceil(_this.total / _this.page_size);
                            }
                        }
                    });
                })
            },
            notice_add:function(){
                var _this = this;
                //获取抄送人的ID和名称
                var SendTo = [];
                $("#ulSendTo li").each(function () {
                    if ($(this).attr("data-id") != null && $(this).attr("data-id") != "") {
                        var newJson = '{"AccountId":"' + $(this).attr("data-id") + '","UserName":"' + $(this).text() + '"}';
                        SendTo.push(JSON.parse(newJson));
                    }
                });
                if (SendTo.length == 0) {
                    $('#lblSendToError').text("请选择抄送人");
                    return false;
                }
                if (!verifyCheck._click("verifyCheck")) {
                    return false;
                } else {
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
                    
                    //查找封面图片资源ID
                    var Cover = '';
                    $(".uploader_img1 .queueList .filelist .item").each(function () {
                        if ($(this).attr("data") != null && $(this).attr("data") != "") {
                            Cover = $(this).attr("data");
                        }
                    });
                    //查找附近文件资源ID
                    var Attachments = [];
                    $(".uploader_box1 .uploader-list .item").each(function () {
                        if ($(this).attr("data") != null && $(this).attr("data") != "") {
                            Attachments.push($(this).attr("data"));
                        }
                    });
                    
                    if (Cover == "") {
                        vdialog({
                            type: 'error',
                            title: '提示',
                            content: '请上传封面图片',
                            ok: true,
                            cancel: true,
                            modal: true
                        });
                        return false;
                    }else {
                        btn = $(".loading_btn").button('loading');
                        var url = eosCommon.ENTERPRISE_API + "api/notice/insert";
                        var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "Parameters": {
                                "Subject": $('#txtSubject').val(),
                                "Abstract": $('#txtAbstract').val(),
                                "NoticeContent": $("#txtNoticeContent").Editor("getText"),
                                "Cover": Cover,
                                "Attachments": Attachments,
                                "SendTo": SendTo,
                            }
                        };
                        eosCommon.eosAjax(url, "Post", param, "json", function (result) {
                            if (eosCommon.checkCode(result.State, result.Message)) {
                                eosCommon.eosMessage("success", eosCommon.SEND_NOTICE);
                                _this.notice_view = 1;
                                $(".loading_btn").button('reset');
                            }
                        });
                    }
                }
            },
            notice_details (index) {
                var _this = this;
                this.notice_view = 2;
                _this.$nextTick(function () {
                    var data = this.table_data[index];
                    $('#viewSubject').text(data.Subject);
                    $('#viewAbstract').text(data.Abstract);
                    $('#viewSendTime').text(data.SendTime);
                    var allSendTo = '';
                    if (data.SendTo.length > 0) {
                        var Html = '';
                        var strComma = ',';
                        for (var i = 0; i < data.SendTo.length; i++) {
                            if (i == (data.SendTo.length - 1))
                            {
                                strComma = '';
                            }
                            Html += '<span class="mr-10" data-id="' + data.SendTo[i].AccountId + '">' + data.SendTo[i].UserName + "" + strComma + "" + '</span>';
                        }
                        allSendTo += Html;
                    }
                    $('#viewSendTo').html(allSendTo);
                    $('#viewNoticeContent').html(data.NoticeContent);

                    var allHtml = '';
                    if (data.AttachmentDetails.length > 0) {
                        allHtml += '<div class="text-left pb-10">';
                        allHtml += '<span class="size20 font-bold"><b>附件下载</b><i class="fa fa-inbox ml-10"></i></span>';
                        allHtml += '</div>';
                        allHtml += '<hr class="divider mb-10">';
                        allHtml += '<div id="a" class="file-download">';
                        allHtml += '<ol  style="line-height: 2;padding-left:18px;">';
                        var Html = '';
                        for (var i = 0; i < data.AttachmentDetails.length; i++) {
                            Html += '<li><a class="text-cleos" href="' + data.AttachmentDetails[i].AttachmentUrl + '" target="_blank">' + data.AttachmentDetails[i].AttachmentName + '</a> </li>';
                        }
                        allHtml += Html;
                        allHtml += '</ol>';
                        allHtml += '</div>';
                        allHtml += '<div class="clearfix"></div>';
                    }
                    $("#viewAttachment").empty();
                    $("#viewAttachment").html(allHtml);
                });
            },
            btnQuery () {
                this.load_table();
            },
        },
        watch: { //观察属性，data数据体中的所有对象的变化
            notice_view (val) {
                if (val == 0){
                    this.ready_add();
                }
                else if (val == 1){
                    this.load_table();
                }
            },
            page_index (val) {
                this.load_table();
            },
        },
 		created(){

		},
		updated(){
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());			
			
		},
        mounted() {
//			eosCommon.eosOperators(eosCommon.eosOperDataHandle());			
        	
        	this.notice_view = 1;
            verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
            $('#txtQuerySubject').bind('keypress',function(event){
                if(event.keyCode == "13"){
                    table.ajax.reload();
                }
            });
        }
    }
</script>
<style>
    @import '/static/plugins/tinymce/css/default.css';
    @import '/static/plugins/tinymce/css/editor.css';
    @import '/static/css/notice.css';
</style>
<template>
	<div id="Manuals" class="">
								<!--用户手册开始-->
								<div id="UserManual" style="margin-bottom: 0;" class="card-box table-responsive">
									<div class="row pl-10">
										<span class="OrgTopAligin OperatorInsert">
                                            <button id="addUserManualBtn" type="button" class="btnInsertFC btn btn-default waves-effect waves-light">
                                                <i class="fa fa-plus m-r-5"></i>新增
                                            </button>
                                        </span>
									</div>
									<hr class="divider mt-10">
									<div class="row">
										<div class="col-lg-12">
											<ul id="uSerManualList" class="list-unstyled transaction-list">
												<!--黄骏富-->
											</ul>
										</div>
									</div>
								</div>
								<div id="UserManualAdd" class="card-box table-responsive" style="display: none">
									<div class="row">
										<div class="col-md-12">
											<span class="size20 font-bold">上传用户手册</span>
										</div>
									</div>
									<hr class="divider mb-10 mt-10">
									<div class="row">
										<div class="col-md-12">
											<div id="verifyCheck">
												<div class="form-horizontal content-box">
													<div class="form-group mt-10">
														<label class="content-title-left text-right"><em class="ak_required_em">*</em>手册名称</label>
														<div class="col-xs-9">
															<input id="UserManualName" type="text" maxlength="25" class="form-control" />
														</div>
													</div>
													<div class="form-group mt-20 mb-10">
														<label class="content-title-left text-right"><em class="ak_required_em">*</em>用户手册备注</label>
														<div class="col-xs-9">
															<textarea id="UserManualRemark" maxlength="100" required class="form-control"></textarea>
														</div>
													</div>
												</div>
												<div id="uploadFileListBox" class="form-horizontal content-box" style="display: none;">
													<div class="form-group mt-0 mb-5">
														<label class="content-title-left text-right" style="line-height: 31px;">附件名称:</label>
														<div class="col-xs-9 uploadFileList">
															<a href="" style="color:#1abc9c;padding-right: 10px;"></a>
															<button id="resetManualFile" class="btn btn-default" data-status='save'>点击更换附件</button>
														</div>
													</div>
												</div>
												<div class="mt-10 pb-5 pl-10 pr-10 content-box-modal">
													<div class="mb-10 mt-10">
														<div class="form-group uploadImgBox">
														</div>
													</div>
												</div>
												<div class="modal-footer">
													<label class="content-title-left text-right"></label>
													<div class="col-lg-5 col-xs-8" style="padding: 0;">
														<button id="UserManuaCancelBtn" class="btn btn-white waves-effect">取消</button>
														<button id="UserManuaSaveBtn" class="btn btn-default loading_btn" data-status='save' data-loading-text="保存中...">保存</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!--用户手册结束-->
							</div>
</template>

<script>
	export default{
		
		data:function(){
			return{
				EquipmentId:'',
				title:''
			}
		},
		mounted:function(){
			var _this=this;
			_this.title = '铭牌信息';
			_this.$emit('changeTitle',_this.title);
			if(!_this.propsDatas.equipmentData) {
					vdialog({
						type: 'confirm',
						title: '提示',
						content: '请先保存设备信息，才能编辑其它信息',
						ok: function() {},
						cancel: true,
						modal: true
					});
					return false;
				}
			_this.EquipmentId=_this.propsDatas.EquipmentId;
			_this.getManual();
		},
		props: ['propsDatas'],
		methods:{
			EquipmentReturn:function(){
				this.$router.go(-1);
			},
			getManual: function() {
				var _this = this;
				
				//用户手册
				var ManualresourceId = '';
				var format = '';
				var size = '';

				function getUserManualList() {
					eosCommon.eosAjax(
						eosCommon.ENTERPRISE_API + "api/equipment/GetManuals",
						"Get", {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"PageIndex": 0,
							"PageSize": 0,
							"Parameters": {
								"EquipmentId": _this.EquipmentId
							}
						},
						"json",
						function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								$("#uSerManualList").empty();
								if(result.Data == '') {
									$("#uSerManualList").append("<li>暂无数据</li>")
								} else {
									for(var i = 0; i < result.Data.Files.length; i++) {
										$("#uSerManualList").append(
											'<li class="list_item">' +
											'<a class="fa fa-download text-success OperatorDownload d" href="' + result.Data.Files[i]['FilePath'] + '"></a>' +
											'<span class="tran-text"><a target="_blank" data-size="' + result.Data.Files[i]['FileSize'] + '" data-format="' + result.Data.Files[i]['Format'] + '"  class="text-custom e" >' + result.Data.Files[i]['FileName'] + '</a></span>' +
											'<div class="userManualOperBtn"><span style="margin-right:60px"  class="pull-right OperatorBtnEdit userManuaEdit OperatorEdit" title="编辑信息" data-eid="' + result.Data.Files[i]['FileId'] + '" data-remark="' + result.Data.Files[i]['Remark'] + '" data-FilePath="' + result.Data.Files[i]['FilePath'] + '" ><i class="fa fa-pencil"></i></span><span class="pull-right OperatorBtnDel userManualDelBtn OperatorDel" title="删除信息" data-eid="' + result.Data.Files[i]['FileId'] + '"><i class="fa fa-trash-o"></i></span></div>' +
											'<span class="clearfix"></span>' +
											'</li>')
									}
									//黄
									eosCommon.eosOperators(eosCommon.eosOperDataHandle());
								}
							}
						}
					)
				}

				function addUserManualUpload(saveType) {
					$("#UserManualAdd .uploadImgBox").empty().append(
						'<div id="fileDnd1" class="uploader_box3 eos_uploader_box">' +
						'<p class="uploader_box_title pb-5">请选择文件，每次只能上传一个文件，文件大小不超过16M，文件格式.doc/.docx/.xls/.xlsx/.pdf等</p>' +
						'<div class="wu-example">' +
						'<div class="uploader-list"></div>' +
						'<div class="btns">' +
						'<div id="picker3">选择文件</div>' +
						'</div>' +
						'</div>' +
						'</div>');
					eosCommon.eosUploaderFile({
						'uploaderObj': 'uploaderFile',
						'uploaderBox': '.uploader_box3',
						'uploaderList': '.uploader-list',
						'initBtn': '#picker3',
						'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
						'data': {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"ResourceType": "0"
						},
						'fileNumLimit': 1,
						'upType': 0,
						'succ': function(result) {
							if(saveType == '新增') {
								$(" #UserManuaSaveBtn").show();
								_this.isAddFiled = true;
								ManualresourceId = result.Data[0].ResourceId;
								_this.format = result.Data[0].Format;
								_this.size = result.Data[0].Size;
								return;
							}
							$("#UserManuaSaveBtn").show();
							_this.editNewFileId = result.Data[0].ResourceId;
							_this.format = result.Data[0].Format;
							_this.size = result.Data[0].Size;
						},
						'del': function(result) {
							if(result != "") {
								_this.format = '';
								_this.size = '';
								if(saveType == '新增') {
									_this.isAddFiled = false;
									var param = {
										"AccessToken": eosCommon.storage.get("AccessToken"),
										"Parameters": {
											"ResourceId": result,
											"ResourceType": "0"
										}
									};
									var url = eosCommon.RESOURCES_API + "api/equipment/DeleteManuals";
									eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
										if(eosCommon.checkCode(result.State, result.Message)) {}
									});
									return;
								}
								_this.editNewFileId = '';
								_this.format = format;
								_this.size = size;
								var param = {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"Parameters": {
										"ResourceId": result,
										"ResourceType": "0"
									}
								};
								var url = eosCommon.RESOURCES_API + "api/equipment/DeleteManuals";
								eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {}
								});
							}
						}
					})
				}

				getUserManualList();
				$("#addUserManualBtn").unbind("click").click(function() {
					$("#UserManualAdd").show();
					$("#UserManual").hide();
					$("#UserManuaSaveBtn").attr('data-status', 'save');
					$("#uploadFileListBox").hide();
					$("#UserManualName").val("");
					$("#UserManualRemark").val("");
					addUserManualUpload('新增')
				});
				$("#UserManuaCancelBtn").unbind("click").click(function() {
					$("#UserManualAdd").hide();
					$("#UserManual").show();
				})
				$("#UserManuaSaveBtn").unbind("click").click(function() {
					if($("#UserManualName").val() == '') {
						vdialog({
							title: '系统提示',
							type: 'alert',
							modal: true,
							content: "请填写手册名称",
							ok: true
						});
						return false;
					}
					if($("#UserManualRemark").val() == '') {
						vdialog({
							title: '系统提示',
							type: 'alert',
							modal: true,
							content: "请填写手册备注",
							ok: true
						});
						return false;
					}
					if($(this).attr('data-status') == 'save') {
						if(!_this.isAddFiled) {
							vdialog({
								title: '系统提示',
								type: 'alert',
								modal: true,
								content: "请上传用户手册文件",
								ok: true
							});
							return false;
						}
						eosCommon.eosAjax(
							eosCommon.ENTERPRISE_API + "api/equipment/InsertManuals",
							"Post", {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"EquipmentId": _this.EquipmentId,
									"FileName": $("#UserManualName").val(),
									"Format": _this.format,
									"FileSize": _this.size,
									"FileId": ManualresourceId,
									"Remark": $("#UserManualRemark").val()
								}
							},
							"json",
							function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {
									$("#UserManualAdd").hide();
									$("#UserManual").show();
									getUserManualList();
									$("#UserManualAdd .uploadImgBox").empty();
									eosCommon.eosMessage("success", eosCommon.INSERT_FILE_MSG);
								}
							}
						);
						_this.isAddFiled = false;
					} else {
						eosCommon.eosAjax(
							eosCommon.ENTERPRISE_API + "api/equipment/UpdateManuals",
							"Put", {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"OldFileId": _this.editManualFielId,
									"NewFileId": _this.editNewFileId,
									"EquipmentId": _this.EquipmentId,
									"FileName": $("#UserManualName").val(),
									"FileSize": _this.size,
									"Format": _this.format,
									"Remark": $("#UserManualRemark").val()
								}
							},
							"json",
							function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {
									$("#UserManualAdd").hide();
									$("#UserManual").show();
									getUserManualList();
									$("#UserManualAdd .uploadImgBox").empty();
									eosCommon.eosMessage("success", eosCommon.UPDATE_FILE_MSG);
								}
							}
						);
					}
				});
				$("#uSerManualList").on('click', '.userManualDelBtn', function() {
					var __this = $(this);
					vdialog({
						type: 'confirm',
						title: '提示2',
						content: eosCommon.DELETE_MSG_ASK,
						ok: function() {
							var param = {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"EquipmentId": _this.EquipmentId,
									"FileId": __this.attr("data-eid")
								}
							}
							var url = eosCommon.ENTERPRISE_API + "api/equipment/DeleteManuals";
							eosCommon.eosAjax(url, "Delete", param, "json", function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {
									eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
									$(this).parent("li.list_item").remove();
									getUserManualList();
								}
							});
						},
						cancel: true,
						modal: true
					});
				});
				$("#uSerManualList").on('click', '.userManuaEdit', function() {
					$("#UserManualAdd").show();
					$("#UserManual").hide();
					$("#uploadFileListBox").show();
					_this.manualFielPath = $(this).attr('data-FilePath');
					_this.editManualFielId = $(this).attr('data-eid');
					$("#UserManuaSaveBtn").show().attr('data-status', 'edit');
					$("#UserManuaSaveBtn").attr('data-eid', $(this).attr('data-eid'));
					$("#UserManualName").val($(this).parents(".list_item").find("a.e").html());
					$("#UserManualRemark").val($(this).attr('data-remark'));
					$(".uploadFileList a").attr('href', $(this).parents(".list_item").find("a.d").attr('href')).html($(this).parents(".list_item").find("a.e").html());
					format = $(this).parents(".list_item").find("a.e").attr('data-format');
					size = $(this).parents(".list_item").find("a.e").attr('data-size');
					_this.format = format;
					_this.size = size;
					$("#UserManualAdd .uploadImgBox").empty();
					$("#resetManualFile").unbind("click").click(function() {
						addUserManualUpload('编辑')
					})
				});
			}
		}
		
		
	}
</script>

<style scoped="scoped">
	.OperatorBtnDel {
	    font-size: 18px;
	   
	    margin-right: 30px;
	}
	.userManuaEdit{
		margin-right: 30px;
	}
</style>
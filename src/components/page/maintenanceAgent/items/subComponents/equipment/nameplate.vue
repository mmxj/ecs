<template>
	<div id="Nameplate" class="">
		<div id="NameplateList" style="margin-bottom: 0;" class="card-box table-responsive">

			<div class="row OperatorInsert">
				<div class="col-sm-6">
					<div>
						<button id="addNameplate" class="btn btn-default waves-effect waves-light"><i class="fa fa-plus m-r-5"></i>新增
                                                </button>
					</div>
				</div>
			</div>
			<table class="table table-striped dataTable no-footer NameplateListTable" id="datatable-editable" role="grid">
				<thead>
					<tr role="row">
						<th class="sorting" rowspan="1" colspan="1" style="width: 40%;">铭牌名称</th>
						<th class="sorting" rowspan="1" colspan="1" style="width: 40%;">铭牌属性值</th>
						<th class="sorting" rowspan="1" colspan="1" style="width: 20%;">操作</th>
					</tr>
				</thead>
				<tbody id="NameplateListItem"></tbody>
			</table>
			<div class="row mt-10">
				<div class="col-lg-12">
					<div id="nameplateImgBox"></div>
					<div class="pt-20 saveBtns" style="display: none;">
						<button id="saveNameplateBtn" class="btn btn-default btn-block waves-effect waves-light">点击保存铭牌信息</button>
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
				EquipmentId: '',
				title: ''
			}
		},
		props: ['propsDatas'],
		mounted: function() {
			var _this = this;
			_this.title = '铭牌信息';
			_this.$emit('changeTitle', _this.title);
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
			_this.EquipmentId = _this.propsDatas.EquipmentId;
			_this.getNameplate();
		},
		methods: {
			EquipmentReturn: function() {
				this.$router.go(-1);
			},
			getNameplate: function() {
				var _this = this;

				// 铭牌信息
				var nameplateImgArr = [],
					NameplateInfo = [],
					NameplateResourceIds = [],
					NameplateimgUrls = [];

				function getNameplateData(callback) {
					NameplateResourceIds = [],
						NameplateimgUrls = [];
					eosCommon.eosAjax(
						eosCommon.ENTERPRISE_API + "api/equipment/GetDetails",
						"Get", {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters": {
								"EquipmentId": _this.EquipmentId
							}
						},
						"json",
						function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								$("#NameplateListItem").empty()
								if(result.Data == '') {
									$("#NameplateListItem").append(
										'<tr role="row">' +
										'<td class="pl-10 pr-10"><input class="form-control input-block namePlateName" placeholder="请填写铭牌名称" value="" type="text"></td>' +
										'<td class="pl-10 pr-10"><input class="form-control input-block namePlateVal" placeholder="请填写铭牌属性值" value="" type="text"></td>' +
										'</tr>')
								} else {
									for(var i = 0; i < result.Data.NameplateInfo.length; i++) {
										$("#NameplateListItem").append(
											'<tr role="row">' +
											'<td class="namePlateName">' + result.Data.NameplateInfo[i]['Key'] + '</td>' +
											'<td class="namePlateVal">' + result.Data.NameplateInfo[i]['Value'] + '</td>' +
											'<td class="actions">' +
											'<a href="javascript:;" class="hidden cancelNameplateBtn"><i class="fa fa-times"></i></a>' +
											'<a href="javascript:;" class="on-default editNameplateBtn OperatorEdit"><i class="fa fa-pencil"></i></a>' +
											'<a href="javascript:;" class="on-default delNameplateBtn OperatorDel"><i class="fa fa-trash-o"></i></a>' +
											'</td>' +
											'</tr>')
									}
									for(var j = 0; j < result.Data.NameplatePhotos.length; j++) {
										NameplateResourceIds.push(result.Data.NameplatePhotos[j].ResourceId);
										NameplateimgUrls.push(result.Data.NameplatePhotos[j].ResourceUrl);
									}
									//黄
									eosCommon.eosOperators(eosCommon.eosOperDataHandle());
								}
							}
							callback && callback();
							var datas = eosCommon.eosOperDataHandle();
							if(datas['deletes'] == 0) {
								$('.file-panel').hide();
							}
						}
					);
				}

				function updataNameplate() {
					nameplateImgArr = [];
					NameplateInfo = [];
					var a = 0;
					var updata = true;
					$("#NameplateListItem tr").each(function() {
						var t1 = '',
							t2 = '';
						if($(this).find("td input").length != 0) {
							if($(this).find(".namePlateVal").val() == '') {
								vdialog({
									type: 'confirm',
									title: '提示',
									content: '请输入铭牌属性值',
									ok: function() {},
									cancel: true,
									modal: true
								});
								updata = false;
							} else {
								t1 = $(this).find(".namePlateName").val();
								t2 = $(this).find(".namePlateVal").val();
							}
						} else {
							t1 = $(this).find(".namePlateName").html();
							t2 = $(this).find(".namePlateVal").html();
						}
						var newJson = {};
						newJson['Key'] = t1;
						newJson['Value'] = t2;
						NameplateInfo.push(newJson);
					});
					if(updata) {
						$(".uploader_img_nameplate li").each(function() {
							nameplateImgArr.push($(this).attr('data'));
						});
						eosCommon.eosAjax(
							eosCommon.ENTERPRISE_API + "api/equipment/UpdateDetails",
							"Put", {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"EquipmentId": _this.EquipmentId,
									"NameplateInfo": NameplateInfo,
									"NameplatePhotos": nameplateImgArr
								}
							},
							"json",
							function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {
									getNameplateData();
									eosCommon.eosMessage('success', eosCommon.UPDATE_MSG);
								}
							}
						);
					}
				}

				getNameplateData(function() {
					$("#nameplateImgBox").empty().append(
						'<div class="uploader_img_nameplate eos_uploader_img">' +
						'<div class="queueList">' +
						'<div id="dndArea1" class="placeholder">' +
						'<div id="NameplateImgBtn">点击选择图片</div>' +
						'</div>' +
						'<ul class="filelist clearfix"></ul>' +
						'</div>' +
						'<div class="statusBar" style="display:none;">' +
						'<div class="btns">' +
						'<div  id="continueNameplateImgBtn"></div><div class="uploadBtn">开始上传</div>' +
						'</div>' +
						'<div class="info"></div>' +
						'</div>' +
						'</div>');
					//根据权限隐藏继续添加按钮
					eosCommon.eosOperators(eosCommon.eosOperDataHandle());
					var datas = eosCommon.eosOperDataHandle();
					if(datas['insert'] == 0) {
						$('.statusBar').remove();
					}
					if(datas['edit'] == 1 || datas['insert'] == 1) {
						$('.saveBtns').show();

					}

					eosCommon.eosUploaderImg({
						'uploaderObj': 'uploaderImgNameplate',
						'uploaderBox': '.uploader_img_nameplate',
						'uploaderList': '.queueList',
						'initBtn': '#NameplateImgBtn',
						'continueBtn': '#continueNameplateImgBtn',
						'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
						'data': {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"ResourceType": "0"
						},
						'fileNumLimit': 2000,
						'fileSingleSizeLimit': 3 * 1024 * 1024,
						'ResourceIds': NameplateResourceIds,
						'imgUrls': NameplateimgUrls,
						'succ': function(resporn) {
							//                          alert("上传中...")
							$('#nameplateImgBox .filelist').viewer();

						},
						'del': function(result) {
							if(result != "") {
								var param = {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"Parameters": {
										"ResourceId": result,
										"ResourceType": "0"
									}
								};
								var url = eosCommon.RESOURCES_API + "api/resource/delete";
								eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {
										nameplateImgArr.remove(result)
									}
								});
							}
						}
					});
					$('#nameplateImgBox .filelist').viewer();
				});
				$("#addNameplate").unbind('click').click(function() {
					$("#NameplateListItem").append(
						'<tr role="row">' +
						'<td class="pl-10 pr-10"><input class="form-control input-block namePlateName" placeholder="请填写铭牌名称" value="" type="text"></td>' +
						'<td class="pl-10 pr-10"><input class="form-control input-block namePlateVal" placeholder="请填写铭牌属性值" value="" type="text"></td>' +
						'<td class="actions">' +
						'<a href="javascript:;" class="addRemoveNameplateBtn "><i class="fa fa-times"></i></a>' +
						'</td>' +
						'</tr>')
				});
				$("#saveNameplateBtn").unbind('click').click(function() {
					updataNameplate()
				});
				$(".NameplateListTable").unbind('click');
				$(".NameplateListTable").on('click', '.editNameplateBtn', function() {
					var txt01 = $(this).parents("tr").find("td").eq(0).html(),
						txt02 = $(this).parents("tr").find("td").eq(1).html();
					$(this).parents("tr").empty().append(
						'<td class="pl-10 pr-10"><input class="form-control input-block namePlateName" value="' + txt01 + '" type="text"></td>' +
						'<td class="pl-10 pr-10"><input class="form-control input-block namePlateVal" value="' + txt02 + '" type="text"></td>' +
						'<td class="actions ">' +
						'<a href="javascript:;" class="removeNameplateBtn"><i class="fa fa-times"></i></a>' +
						'</td>')
				});
				$(".NameplateListTable").on('click', '.delNameplateBtn', function() {
					var __this = $(this);
					vdialog({
						type: 'confirm',
						title: '提示',
						content: eosCommon.DELETE_MSG_ASK,
						ok: function() {
							__this.parents('tr').remove();
							updataNameplate();
							eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
						},
						cancel: true,
						modal: true
					});
				});
				$(".NameplateListTable").on('click', '.addRemoveNameplateBtn', function() {
					$(this).parents("tr").remove();
				});
				$(".NameplateListTable").on('click', '.removeNameplateBtn', function() {
					var txt01 = $(this).parents("tr").find(".namePlateName").val(),
						txt02 = $(this).parents("tr").find(".namePlateVal").val();
					$(this).parents("tr").empty().append(
						'<td class="namePlateName">' + txt01 + '</td>' +
						'<td class="namePlateVal">' + txt02 + '</td>' +
						'<td class="actions">' +
						'<a href="javascript:;" class="hidden cancelNameplateBtn"><i class="fa fa-times"></i></a>' +
						'<a href="javascript:;" class="on-default editNameplateBtn OperatorEdit"><i class="fa fa-pencil"></i></a>' +
						'<a href="javascript:;" class="on-default delNameplateBtn OperatorDel"><i class="fa fa-trash-o"></i></a>' +
						'</td>');
					//黄骏富
					eosCommon.eosOperators(eosCommon.eosOperDataHandle());
				})
			}
		}

	}
</script>

<style>

</style>
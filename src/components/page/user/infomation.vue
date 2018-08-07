<template>
	<div class="infomation">
		<div class="row">
			<div class="col-sm-12">
				<!--添加企业管理员开始-->
				<div id="divInsertView" class="card-box ">
					<div class="">
						<label style="font-size: 22px;" class="size20 font-bold">账号个人信息</label>
						<div class="reback_btn pull-right" style=" margin-left: 30px;height: 32px; padding: 0px 15px; padding-left:30px;border-left: 1px solid #D1E3E2;">
							 <el-button class='fr' size='small' style='' @click='reBackClick'>
				            <i class="fa fa-mail-reply-all mr5"></i>返回
				         	 </el-button>
						</div>
					</div>
					<hr class="divider mb-10 mt-10">
					<div class="infoTitle">
						<div class="col-sm-6 col-md-4 col-lg-2">
							<label class="size20 font-bold">账号信息</label>
						</div>
						
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div id="verifyCheck">
								<div class="form-horizontal content-box">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
										<div class="form-group">
											<label class="col-lg-3 col-md-3 col-sm-4 col-xs-6 text-rt">
                                                帐号：
                                            </label>
											<div class="col-lg-9 col-md-9 col-sm-8 col-xs-6">
												<span class="valid-form-group">
                                                    <label id="lblNameMag" class="focus valid"></label>
                                                </span>
												<input id="txtAccount" readonly="true" value="" class="form-control bg-no-input" />
											</div>
										</div>

										<div class="form-group">
											<label class=" col-lg-3 col-md-3 col-sm-4 col-xs-6 text-rt">
			                                    <em class="ak_required_em">*</em>旧密码：
			                                </label>
											<div class="col-lg-9 col-md-9 col-sm-8 col-xs-6">
												<span class="valid-form-group">
			                                        <label id="lblOldPasswordMag" class="focus valid"></label>
			                                    </span>
												<input id="txtOldPassword" data-valid="isNonEmpty" data-error="旧密码不能为空" type="password" class="form-control required" maxlength="25" placeholder="***" v-on:blur="blur()" />
												<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
												<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
											</div>
										</div>
										<div class="form-group">
											<label class=" col-lg-3 col-md-3 col-sm-4 col-xs-6 text-rt">
				                                    <em class="ak_required_em">*</em>新密码：
				                                </label>
											<div class="col-lg-9 col-md-9 col-sm-8 col-xs-6">
												<span class="valid-form-group">
				                                        <label id="lblNewPasswordMag" class="focus valid"></label>
				                                    </span>
												<input id="txtNewPassword" type="password" maxlength="25" data-valid="isNonEmpty" data-error="新密码不能为空" class="form-control required" placeholder="***" />
												<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
												<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
											</div>
										</div>
										<div class="form-group">
											<label class=" col-lg-3 col-md-3 col-sm-4 col-xs-6 text-rt">
				                                    <em class="ak_required_em">*</em>确认新密码：
				                                </label>
											<div class="col-lg-9 col-md-9 col-sm-8 col-xs-6">
												<span class="valid-form-group">
				                                        <label id="txtPasswordtwo1" class="focus valid"></label>
				                                    </span>
												<input id="txtPasswordtwo" type="password" maxlength="25" class="form-control" placeholder="***" data-valid="isNonEmpty||isRepeat:txtNewPassword" data-error="确认密码不能为空||两次密码不一致" />
												<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
												<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
											</div>
										</div>
										<div class="content-box-footer">
											<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
												<div class="form-group">
													<label class="col-lg-2 col-md-3 col-sm-4 col-xs-6 text-rt"></label>
													<div class="col-lg-10 col-md-9 col-sm-8 col-xs-6 pl-15">
														<button id="btnAddEdit" type="submit" class="btn btn-default" data="" v-on:click="btnPasswordEdit()">提交</button>
													</div>
												</div>
											</div>
											<div class="clearfix"></div>
										</div>
									</div>
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
					</div>

					<div class="infoTitle">
						<div class="col-sm-6 col-md-4 col-lg-2">
							<label class="size20 font-bold">个人信息</label>
						</div>
					</div>
					<div class="row">
						<div class="col-lg-12">
							<div id="verifyCheck_2">
								<div class="form-horizontal content-box">
									<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">

										<div class="form-group">
											<label class="col-lg-3 col-md-3 col-sm-4 col-xs-6 text-rt">
                                                <em class="ak_required_em">*</em>姓名：
                                            </label>
											<div class="col-lg-9 col-md-9 col-sm-8 col-xs-6">
												<span class="valid-form-group">
                                                    <label id="lblPasswordMag" class="focus valid"></label>
                                                </span>
												<input id="txtMyName" type="text" maxlength="25" class="form-control required" placeholder="用户名" data-valid="isNonEmpty||between:1-25" data-error="用户名不能为空||用户名长度1-25位" />
												<span class="ie8 ion-close-circled close hide text-danger valid-input-icon"></span>
												<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
											</div>
										</div>
										<div class="form-group">
											<label class="col-lg-3 col-md-3 col-sm-4 col-xs-6 text-rt">
                                                <em class="ak_required_em">*</em>性别：
                                            </label>
											<div class="col-lg-9 col-md-9 col-sm-8 col-xs-6">
												<div class="radio radio-danger radio-inline">
													<input type="radio" name="radioGender" value="0" id="radioIsLocked1">
													<label for="radioIsLocked1">
                                                        女
                                                    </label>
												</div>
												<div class="radio radio-custom radio-inline">
													<input type="radio" name="radioGender" value="1" id="radioIsLocked2">
													<label for="radioIsLocked2">
                                                        男
                                                    </label>
												</div>
												<div class="radio radio-danger radio-inline">
													<input type="radio" name="radioGender" value="2" id="radioIsLocked0">
													<label for="radioIsLocked0">
                                                        保密
                                                    </label>
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-lg-3 col-md-3 col-sm-4 col-xs-6 text-rt">
                                                公司：
                                            </label>
											<div class="col-lg-9 col-md-9 col-sm-8 col-xs-6">
												<div id="txtCompanyShortName" class="form-control bg-no-input"></div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-lg-3 col-md-3 col-sm-4 col-xs-6 text-rt">
                                                部门：
                                            </label>
											<div class="col-lg-9 col-md-9 col-sm-8 col-xs-6">
												<div id="txtDepartmentName" class="form-control bg-no-input"></div>
											</div>
										</div>

										<div class="content-box-footer">
											<div class="col-lg-4 col-md-6 col-sm-6 col-xs-12">
												<div class="form-group">
													<label class="col-lg-2 col-md-3 col-sm-4 col-xs-6 text-rt"></label>
													<div class="col-lg-10 col-md-9 col-sm-8 col-xs-6 pl-15">
														<button id="btnAddEdit" type="submit" class="btn btn-default" data="" v-on:click="btnInfoEdit()">提交</button>
													</div>
												</div>
											</div>
											<div class="clearfix"></div>
										</div>
									</div>
									<div class="pull-left mt-20 personal-pic">
										<div id="imgBox1"></div>
										<label id="lblResourceId1" style="display:none;"></label>
									</div>
									<div class="clearfix"></div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<!--添加企业管理员结束-->
			</div>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'
	export default {
		data: function() {

			return {
				isReload: false,
				ResourceIds: '',
				imgUrls: '',
				urlName:'',
				EntitySort:''
			}
		},
		methods: {
		 	...mapActions({
		      showWhichTab: 'update_showwhichtab'
		    }),
			reBackClick(){
				let vm=this;
				vm.EntitySort=eosCommon.storage.get('EntitySort');		        
				if(vm.EntitySort==0){
					vm.urlName='yz_items_manage'
				}else if(vm.EntitySort==1){
					vm.urlName='wb_items_manage'
				}else{
					vm.urlName='project_list'
				}
				vm.showWhichTab({
		            showWhichTab: 1
		          });
				vm.$router.push('/ecos/' + vm.urlName); //左侧路由跳转 
			},
			bind_getAccountDetails: function() {
				var _this = this;
				eosCommon.resetFrom();
				$('#txtAccount').val(eosCommon.storage.get("Account"));
				$('#txtAccountTypeName').text(eosCommon.storage.get("AccountTypeName"));
				$('#txtMyName').val(eosCommon.storage.get("MyName"));
				var Genders = eosCommon.storage.get("Gender");
				$("input[type='radio'][name='radioGender'][value='" + Genders + "']").prop('checked', 'checked');
				$('#txtCompanyShortName').text(eosCommon.storage.get("CompanyName"));
				$('#txtDepartmentName').text(eosCommon.storage.get("DepartmentName"));
				_this.imgUrls = eosCommon.storage.get("ProfilePhotoURL");
				if(_this.imgUrls){
					_this.ResourceIds = eosCommon.getUrlParam(_this.imgUrls, "ResourceId");
				}
				_this.imgUrls = _this.imgUrls ? _this.imgUrls : "../../../../static/images/user_default.jpg";
				_this.ResourceIds = _this.ResourceIds ? _this.ResourceIds : "eos";
				_this.bind_UpFileImg(_this.ResourceIds, _this.imgUrls);
			},
			bind_UpFileImg: function(ResourceIds, imgUrls) {
				var _this = this;
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
					"Title": "个人头像",
					"Description": "个人头像"
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
					'succ': function(result) {
						_this.ResourceIds = result.Data[0].ResourceId;
					},
					'del': function(result) {
						_this.ResourceIds = '';
						if(result&&result!='eos') {
							var param = {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"ResourceId": result,
									"ResourceType": "0"
								}
							};
							var url = eosCommon.RESOURCES_API + "api/resource/delete";
							eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {}
							});
						}
					}
				});
			},
			IsPassword: function() {
				if($('#txtOldPassword').val() == "") {
					$('#txtOldPassword').attr("class", "form-control");
				} else {
					this.addValidAttrs();
				}
				if($('#txtNewPassword').val() == "" && $('#txtPasswordtwo').val() == "" && $('#txtOldPassword').val() == "") {
					$('#txtOldPassword').attr("class", "form-control");
					$('#txtNewPassword').attr("class", "form-control");
					$('#txtPasswordtwo').attr("class", "form-control");
				}
			},
			blur: function() {
				this.IsPassword();
			},
			addValidAttrs: function() {
				//旧密码	
				$('#txtOldPassword').attr("class", "form-control required");
				$('#txtOldPassword').attr("data-valid", "between:6-25");
				$('#txtOldPassword').attr("data-error", "密码长度6-25位");
				//新密码
				$('#txtNewPassword').attr("class", "form-control required");
				$('#txtNewPassword').attr("data-valid", "isNonEmpty");
				$('#txtNewPassword').attr("data-error", "新密码不能为空");
				//再次新密码
				$('#txtPasswordtwo').attr("class", "form-control required");
				$('#txtPasswordtwo').attr("data-valid", "isNonEmpty||isRepeat:txtNewPassword");
				$('#txtPasswordtwo').attr("data-error", "确认密码不能为空||两次密码不一致");
			},
			btnInfoEdit: function() {
				if(!verifyCheck._click('verifyCheck_2')) {
					return false;
				} else {
					this.editInfoRequest();
				}
			},
			btnPasswordEdit: function() {
				if($('#txtNewPassword').val() !== "" || $('#txtPasswordtwo').val() !== "" || $('#txtOldPassword').val() !== "") {
					this.addValidAttrs();
				}
				//                
				if(!verifyCheck._click('verifyCheck')) {
					return false;
				} else {
					this.modifyPassword();
				}
			},
			editInfoRequest: function() {
				//修改个人信息
				var _this = this;
				var imgUrls = '';
				if(_this.ResourceIds == '') {
					eosCommon.storage.set("ProfilePhotoURL", '');
					eosCommon.storage.set("ProfilePhotoId", '');
				} else {
					imgUrls = eosCommon.RESOURCES_API + "api/resource/download?RequestType=4&ResourceId=" + _this.ResourceIds + "&AccessToken=&Mode=Max";
					eosCommon.storage.set("ProfilePhotoId", _this.ResourceIds);
					eosCommon.storage.set("ProfilePhotoURL", imgUrls);
				}
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"ProfilePhoto": _this.ResourceIds,
						"MyName": $('#txtMyName').val(),
						"Gender": $('input:radio[name="radioGender"]:checked').val()

					}
				};
				var url = eosCommon.COMMON_API + "api/account/modify";
				eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);

						eosCommon.storage.set("MyName", $('#txtMyName').val());
						eosCommon.storage.set("Gender", $('input:radio[name="radioGender"]:checked').val());
						_this.bind_getAccountDetails();
						eosCommon.eosUpdataAvatar(imgUrls);
					}
				});
			},
			modifyPassword: function() {
				//修改个人密码
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"OldPassWord": $('#txtOldPassword').val(),
					"NewPassword": $('#txtNewPassword').val()
				};
				var url = eosCommon.COMMON_API + "api/account/ModifyPassword";
				eosCommon.eosAjax(url, "POST", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
					}
				});
			}
		},
		mounted: function() {
			var _this = this;
			_this.bind_getAccountDetails();
			setTimeout(function() {
				_this.isReload = true;
			}, 500);
		},
		watch: {
			isReload: function() {
				this.bind_getAccountDetails();
			}
		}
	}
</script>
<style scoped="scoped">
	.infomation .text-rt {
		white-space: nowrap;
		text-align: right;
		padding-top: 5px;
	}
	
	.infomation .content-box-footer {
		padding: 10px 30px 10px 10px;
	}
	
	.size20 {
		font-size: 16px;
		color: #000000;
	}
	
	.infoTitle {
		margin-top: 30px;
	}
</style>
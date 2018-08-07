<style scoped>
#copyright{position: absolute;bottom: 0;height: 50px;width: 100%;color: #fff;font-size: 14px;text-align: center;line-height: 50px;cursor: default;}
#tool .phone:hover .phone_box{display: block;}
#tool .qr_code:hover .qr_box{display: block;}
</style>
<template>
	<div v-cloak>
		<div id="account-pages-login" class="login">
			<div class="account-pages-login">
				<header id="topnav" style="display: none">
					<div class="navbar-custom">
						<div class="container">
							<div id="navigation">
								<ul class="navigation-menu">
									<li>
										<img class="logo" src="/static/images/top_logo.svg" style="width: 185px;height: auto" />
									</li>
									<li>
										<a href="#"><i class="fa fa-plus"></i>平台简介</a>
									</li>
									<li>
										<a href="#"><i class="fa fa-plus"></i>服务内容</a>
									</li>
									<li>
										<a href="#"><i class="fa fa-plus"></i>手机APP</a>
									</li>
									<li>
										<a href="#"><i class="fa fa-plus"></i>成功案例</a>
									</li>
									<li>
										<a href="#"><i class="fa fa-plus"></i>价格方案</a>
									</li>
									<li>
										<a href="#"><i class="fa fa-plus"></i>联系我们</a>
									</li>
									<li class="has-submenu pull-right">
										<a href="#"><i class="fa fa-plus"></i>登录</a>
									</li>
									<li class="has-submenu pull-right">
										<a href="#"><i class="fa fa-plus"></i>注册</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</header>
				<div v-cloak class="login_box" style="width:100%;">
					<div id="sign-wrapper" class="clearfix">
						<div class="pull-left login-left">
							<div class="panel-heading">
								<div class="eos-logo m-b-20 m-t-15">
									<img src="/static/images/index-logo.png" />
								</div>
								<div class="eos-logo clearfix">
									<div class="pull-left ios">
										<a href="https://itunes.apple.com/cn/app/易云维/id1249894982?mt=8" target="_blank"><img src="/static/images/ios.svg" /></a>
										<a href="http://plf.cleos.com.cn/download/app/android/ecos.apk" target="_blank"><img src="/static/images/and.svg" /></a>
									</div>
									<div class="pull-left">
										<img class="code" src="/static/images/code.png" />
									</div>
								</div>
							</div>
						</div>
						<div class="pull-right login-right">
							<div class="bg-canlead">
								<div class="panel-heading">
									<div class="brand">登录</div>
								</div>
								<div class="bg-no">
									<form id="verifyCheck" class="btn-login">
										<div class="">
											<div class="input-group-lg login-input rounded" style="height: 67px;">
												<i class="icon_lock"></i>
												<input class="bg-lock form-control required" name="username" type="text" size="24" tabindex="1" data-valid="isNonEmpty" data-error="账号不能为空" maxlength="11" id="adminNo" placeholder="请输入您的账号" value="">
												<span class="ie8 ion-close-circled close hide text-danger font-24 m-t-3"></span>
												<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
												<label class="focus"></label>
												<label class="focus valid"></label>
											</div>
										</div>
										<div class="">
											<div class="input-group-lg login-input rounded no-overflow" style="height: 67px;">
												<i class="icon_pass"></i>
												<input type="password" id="password" maxlength="25" class="bg-pass form-control required" tabindex="2" style="ime-mode:disabled;" onpaste="return  false" autocomplete="off" data-valid="isNonEmpty" data-error="密码不能为空" placeholder="请输入您的密码" value="" />
												<span class="ie8 ion-close-circled close hide text-danger font-24 m-t-3"></span>
												<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
												<label class="focus"></label>
												<label class="focus valid"></label>
											</div>
										</div>
										<div class="clearfix">
											<div class="forget pull-left">
												<a @click='isShowCon=true' href="javascript:;" class="text-white checkProtocol" style="color: white;"><input checked="checked" type="checkbox" disabled /><span>《易云维服务协议》</span></a>
											</div>
											<div class="forget pull-right">
												<router-link to="forgot" class="text-white">找回密码？</router-link>
											</div>
										</div>
										<div class="form-group">
											<div class="btnBox clearfix">
												<div class="pull-left">
													<button type="button" class="btn btn-eos btn-lg btn-block rounded loading_btn" id="login-btn" data-loading-text="登录中...">登录</button>
												</div>
												<div class="pull-right">
													<router-link to="register">
														<button type="button" class="btn btn-yello btn-lg btn-block rounded" id="ex-btn">申请开通</button>
													</router-link>
												</div>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
					<div id="tool">
						<div class="icon phone">
							<div class="phone_box"></div>
						</div>
						<div class="icon qr_code">
							<div class="qr_box"></div>
						</div>
					</div>
				</div>
				<div class="m-sPopBg" style="z-index:998;"></div>
				<div class="m-sPopCon regcon" v-cloak style="display: block;" v-show='isShowCon==true'>
					<div class="m-sPopTitle"><strong>服务协议条款 <label id="sPopClose" class="m-sPopClose" @click='isShowCon=false'>×</label></strong></div>
					<div class="f-r0" style="padding: 5px;">
						<div class="eos">
							<iframe src="/static/html/protocol/protocol.html" frameborder="0" width="100%"></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="copyright">Copyright © 2015-2018 广州能迪云服务科技有限公司. 粤ICP备11020852号</div>
	</div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const FUNC = Common.Func
const POST = Common.Func.axios.post
	export default {
		data() {
			return {
				passwords: '',
				isEcode: true,
				isShowCon: false,
				loginDataEB:{
					Account:'',
					PlatformType:'',
					EBTimeStamp:'',
					EBCodeValue:'',
				},
				loginUrl: URL.LOGIN
			}
		},
		mounted: function() {
			var _this = this;
			/*$(".checkProtocol").click(function() {
				$(".m-sPopBg,.m-sPopCon").show();
			})
			$(".m-sPopClose").click(function() {
				$(".m-sPopBg,.m-sPopCon").hide();
			})*/
/*			$("#tool .icon").hover(function() {
				$(this).find("div").show();
			}, function() {
				$(this).find("div").hide();
			})*/
			_this.isFromEB()
			$(".loading_btn").button('reset');
			$("#sign-wrapper").keydown(function(event) {
				if(event.keyCode == 13) {
					if($(".vdialog").length) {
						return false;
					} else {
						$("#login-btn").click();
					}
				}
			});
			$("#login-btn").click(function() {
				_this.passwords = $("#password").val();
				if($("#adminNo").val() == "") {
					$("#adminNo").focus();
					$("#adminNo").blur();
					return false;
				} else if($("#password").val() == "") {
					$("#password").focus();
					$("#password").blur();
					return false;
				}
				eosCommon.storage.clear();
				var btn = $(".loading_btn").button('loading');
				eosCommon.eosAjax(
					eosCommon.COMMON_API + "api/account/login",
					"post", {
						"Account": $("#adminNo").val(),
						"Password": _this.passwords,
						"Device": {
							"Type": "2",
							"Brand": "",
							"Model": "",
							"Version": "",
							"IsForceLogin": 1,
							"IdentifyId": "",
							"JPushRegisterId": ""
						},
						"AppVersion": "",

						"ApplicationCode": "Web"
					},
					"json",
					function(data) {
						if(eosCommon.checkCode(data.State, data.Message)) {
							eosCommon.storage.set({
								"AccessToken": data.Data.AccessToken,
								"IsExperienceUser": data.Data.IsExperienceUser,
								"Account": $("#adminNo").val(),
								"IsProjectAdmin":data.Data.IsProjectAdmin,
								"EBCodeValue":data.Data.EBCodeValue,
								"EBTimeSpan":data.Data.EBTimeSpan,
							})
							_this.initAccountInfos();
							btn.button('reset');
						}
					}
				)

			});
			$("iframe").height($(window).height() - 360);
			$(".regcon").height($(window).height() - 300);
			$(".regcon").css({ "margin-top": -($(window).height() - 300) / 2 });
			$(window).resize(function() {
				$("iframe").height($(window).height() - 360);
				$(".regcon").height($(window).height() - 300);
				$(".regcon").css({ "margin-top": -($(window).height() - 300) / 2 });
			})
		},
		methods: {
			isFromEB(){
				let vm = this
				let query = vm.$route.query
				vm.loginDataEB.Account = query.Account
				vm.loginDataEB.PlatformType = query.PlatformType
				vm.loginDataEB.EBTimeStamp = query.EBTimeStamp
				vm.loginDataEB.EBCodeValue = query.EBCodeValue
				for (let index in vm.loginDataEB) {
					if (!vm.loginDataEB[index]) {
						return
					}
				}
				// console.log(query)
				vm.loginByEB()
			},
			loginByEB(){
				eosCommon.storage.clear()
				let vm = this
				let url = vm.loginUrl
				let params = {
					"Account": vm.loginDataEB.Account,
					"PlatformType": vm.loginDataEB.PlatformType,
					"EBTimeStamp": vm.loginDataEB.EBTimeStamp,
					"EBCodeValue": vm.loginDataEB.EBCodeValue,
					"Device": {
						"Type": "2",
						"Brand": "",
						"Model": "",
						"Version": "",
						"IsForceLogin": 1,
						"IdentifyId": "",
						"JPushRegisterId": ""
					},
					"AppVersion": "",
					"ApplicationCode": "Web"
				}
				POST(url, params).then(function(res) {
					if (res.data.State != 0) {
					  vm.$message.warning(res.data.Message)
					  return false
					} else {
						let data = res.data.Data
						// console.log(data)
						eosCommon.storage.set({
							"AccessToken": data.AccessToken,
							"IsExperienceUser": data.IsExperienceUser,
							"Account": vm.loginDataEB.Account,
							"IsProjectAdmin":data.IsProjectAdmin
						})
						vm.initAccountInfos();
						let btn = $(".loading_btn").button('loading')
						btn.button('reset');
					}
				})
			},
			handleEcode(passwords) {
				var _this = this;
				var b = new Base64();
				var baseChars = b.encode(passwords);
				var chars = '';
				for(var i = 0; i < baseChars.length; i++) {
					chars += (baseChars.charCodeAt(i)).toString() + '%';
				}
				_this.passwords = chars;

				_this.isEcode = true;
			},
			handleDecode() {},
			initAccountInfos: function() {
				var _this = this;
				eosCommon.eosAjax(
					eosCommon.COMMON_API + "api/account/get",
					"GET", { "AccessToken": eosCommon.storage.get("AccessToken") },
					"json",
					function(data) {
						if(eosCommon.checkCode(data.State, data.Message)) {
							console.log(data.Data.LogoImage)
							eosCommon.storage.set({
								"AccountId": data.Data.AccountId,
								"Account": data.Data.Account,
								"EmployeeNo": data.Data.EmployeeNo,
								"DepartmentId": data.Data.DepartmentId,
								"DepartmentName": data.Data.DepartmentName,
								"MyName": data.Data.MyName,
								"Gender": data.Data.Gender,
								"WorkPhone": data.Data.WorkPhone,
								"WorkMobile": data.Data.WorkMobile,
								"WorkEmail": data.Data.WorkEmail,
								"ProfilePhotoId": data.Data.ProfilePhotoId,
								"ProfilePhotoURL":data.Data.ProfilePhotoURL,
								"Wechat": data.Data.Wechat,
								"QQ": data.Data.QQ,
								"IsAdmin": data.Data.IsAdmin,
								"EntitySort": data.Data.EntitySort,
								"CompanyName": data.Data.CompanyName,
								"LogoImage":data.Data.LogoImage
							})
							_this.$router.push('/ecos');
						}
					}
				)
			}

		}
	}
</script>
<style>
	:-webkit-autofill {
		-webkit-text-fill-color: #333 !important;
		transition: background-color 5000s ease-in-out 0s;
	}
	
	.login {
		display: none;
	}
	
	@import '/static/css/user.css';
</style>
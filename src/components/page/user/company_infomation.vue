<template>
	<div>
		<!--内容页框架开始 -->
		<div id="divAddEditCompanyView" class="org-box table-responsive">
			<div class="row">
				<div class="col-lg-12">
					<span class="size20 font-bold">企业信息</span>
				</div>
			</div>
			<hr class="divider mt-10">
			<div class="tab-content">
				<div id="CompanyBaseInfo" class="tab-pane p-0 active">
					<div id="verifyCheck" class="col-lg-12">
						<div class="row col-lg-12">
							<div style="padding-left: 50px;" class="form-horizontal content-box col-sm-8 col-md-8 col-lg-12">
								
											
													<div class="form-group">
														<label class="content-title-left"><em class="ak_required_em">*</em>公司名称：</label>
														<div class="col-lg-6 col-xs-9">
															<span class="valid-form-group">
					                                            <label class="focus valid"></label>
					                                        </span>
															<input  id="txtCompanyShortName" v-model="CompanyShortName" type="text" maxlength="50" class="form-control required" data-valid="isNonEmpty||between:1-50" data-error="企业简称不能为空||企业简称长度1-50位" placeholder="请输入企业简称，且长度不超过50个字符" />
															<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
															<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
														</div>
													</div>
													<div class="form-group">
														<label style="padding-top: 0;" class="control-label content-title-left"><em class="ak_required_em"></em>注册类型：</label>
														<div class="col-lg-4 col-xs-4 col-md-4">
															  <p class="form-control-static">{{userStateInfo}}</p>										
														</div>
														<button @click="applyToUnlimitedUser()" v-show="isExperience" type="button" class="btn tn col-md-offset-1 btn-warning applyToUnlimitedUser">申请正式用户</button>																		
													</div>
													<div class="form-group">
														<label style="padding-top: 0;" class="control-label content-title-left"><em class="ak_required_em"></em>试用到期时间：</label>
														<div class="col-lg-4 col-xs-4 col-md-4">
															  <p class="form-control-static">{{CompanyExpirationDate}}</p>
															  <small style="color: red;">(最多延长2个月，总共三个月)</small>
														</div>
														<button v-show="isExperience" @click="extendUserTime()" type="button" class="btn col-md-offset-1 apply-btn btn-default pull-left">延长一个月</button>																		
														
													</div>
											
											
											<!--<div class="pull-left">
														
														<div class="col-xs-6">
															<div id="imgLogoBox"></div>
															<label id="lblResourceId3" style="display:none;"></label>
														</div>
														<label class="content-title-left">企业logo</label>
													</div>
													<div class="clearfix">
												
											</div>-->
								
								<div class="form-group">
									<label class="content-title-left">统一社会信用代码：</label>
									<div class="col-lg-6 col-xs-9">
										<input id="" type="text" v-model="CompanyUSCCode" class="form-control" placeholder="" />
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">组织机构代码：</label>
									<div class="col-lg-6 col-xs-9">
										<input id="" type="text" v-model="CompanyORGCode" class="form-control" placeholder="" />
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">注册地址：</label>
									<div class="col-lg-6 col-xs-9">
										<input id="" v-model="CompanyAddress" type="text" class="form-control" placeholder="" />
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">法人：</label>
									<div class="col-lg-6 col-xs-9">
										<input id="" v-model="CompanyLegalBody" type="text" class="form-control" placeholder="" />
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">注册资本：</label>
									<div class="col-lg-6 col-xs-9">
										<input id="" v-model="CompanyRegCapital" type="text" class="form-control" placeholder="" />
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">员工数量：</label>
									<div class="col-lg-6 col-xs-9">
										<input id="" v-model="CompanyStaffNum" type="text" class="form-control" placeholder="" />
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">所属行业：</label>
									<div class="col-lg-6 col-xs-9">
										<select id="selIndustryId" v-model="CompanyIndustryId"  class="form-control selectpicker" data-size="8" data-style="btn-white">
											<option v-for="item in industryData" :value="item.IndustryId">{{item.IndustryName}}</option>
										</select>
									</div>
								</div>
								<div class="form-group">
									<label style="padding-top: 0;" class="control-label content-title-left"><em class="ak_required_em"></em>申请人姓名：</label>
									<div class="col-lg-10 col-xs-10 col-md-10">
										  <p class="form-control-static">{{CompanyAplyName}}</p>										
									</div>
								</div>
								<div class="form-group">
									<label style="padding-top: 0;" class="control-label content-title-left"><em class="ak_required_em"></em>申请人电话：</label>
									<div class="col-lg-10 col-xs-10 col-md-10">
										  <p class="form-control-static">{{CompanyAplyPhone}}</p>										
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">申请人职务：</label>
									<div class="col-lg-6 col-xs-9">
										<input id="" v-model="CompanyAplyPost" type="text" class="form-control" placeholder="" />
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">申请人邮箱：</label>
									<div class="col-lg-6 col-xs-9">
										<input id="" v-model="CompanyAplyEmail" type="text" class="form-control" placeholder="" />
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">企业营业执照：</label>
									<div class="col-xs-6">
										<div id="imgBox1"></div>
										<label id="lblResourceId1" style="display:none;"></label>
									</div>
								</div>
								<div class="form-group">
									<label class="content-title-left">企业资质：</label>
									<div class="col-xs-6">
										<div id="imgBox2"></div>
										<label id="lblResourceId2" style="display:none;"></label>
									</div>
								</div>
								<div class="form-group content-box-footer">
									<label class="content-title-left"></label>
									<div class="col-lg-6 col-xs-9">
										<button v-show="isExperience||isAdmin" id="btnCancelEditCompany" type="submit" class="btn btn-default pull-left" data-dismiss="modal" data="" v-on:click="btnCancelEditCompany()">
                                            取消
                                        </button>
										<button v-show="isExperience||isAdmin" id="btnAddEditCompany" type="submit" class="btn btn-default pull-left" data-dismiss="modal" data="" v-on:click="btnAddEditCompany()">
                                            提交
                                        </button>
									</div>
								</div>
							</div>
								
								
						
								
							
							
							
						</div>
					</div>
				</div>
				
			</div>
		</div>
		<!--内容页框架结束 -->
		
	</div>
</template>
<script>
	export default {
		data: function() {
			return {
				LicensesImage: [],
				newImage: 0,
				CompanyDetailId: '',
				isButton: 2,
				imgeData: "",
			 	CompanyId: "",
		        CompanyLogo: "",
		        CompanyShortName: "",
		        CompanyFullName: "",
		        CompanyAddress: "",
		        CompanyEntitySort:'' ,
		        CompanyExpirationDate: "",
		        CompanyUSCCode: "",
		        CompanyORGCode: "",
		        CompanyLegalBody: "",
		        CompanyRegCapital: "",
		        CompanyStaffNum: "",
		        CompanyIndustryId: "",
		        CompanyAplyName: "",
		        CompanyAplyPhone: "",
		        CompanyAplyPost: "",
		        CompanyAplyEmail: "",
		        CompanyBLFiles: "",
		        CompanyICFiles: [],
		        industryData:[],
		        licenseSid:'',
		        licenseUrl:'',
		        qualificationSid:[],
		        IsRegular:'',
		        userStateInfo:'试用用户',
		        IsChecking:0,
		        applyUnlimitedBtnTxt:'申请正式用户',
		        isExperience:true,
		        isAdmin:true
		        
			}
		},
		methods: {

	
			bind_selIndustryId: function() {
				var _this=this;
				var param = null;
				var url = eosCommon.COMMON_API + "api/common/industry";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						_this.CompanyIndustryId=result.Data[0].IndustryId;
						_this.industryData=result.Data;
						_this.$nextTick(function(){
							$("#selIndustryIds").selectpicker('refresh');
							
						});

					}
				});
			},
			
	
			bind_UpQualification:function(ResourceIds2, imgUrls2){
				var _this=this;
				$("#imgBox2").empty();
				$("#imgBox2").html(
					'<div class="uploader_img2 eos_uploader_img">' +
					'<div class="queueList">' +
					'<div id="dndArea" class="placeholder">' +
					'<div id="filePickerImg2">点击选择企业资质图片</div>' +
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
				var param2 = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"ResourceType": "2",
					"Title": "企业资质",
					"Description": "企业资质"
				};
				eosCommon.eosUploaderImg({
					'uploaderObj': 'uploaderImg2',
					'uploaderBox': '.uploader_img2',
					'uploaderList': '.queueList',
					'initBtn': '#filePickerImg2',
					'continueBtn': '#continueImgBtn2',
					'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
					'data': param2,
					'fileNumLimit': 3,
					'fileSingleSizeLimit': 3 * 1024 * 1024,
					'ResourceIds': ResourceIds2,
					'imgUrls': imgUrls2,
					'succ': function(result) {
						_this.qualificationSid.push(result.Data[0].ResourceId);								        
					},
					'del': function(result) {
						//删除资源ID对应的文件
						if(result != "") {
							var param = {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"ResourceId": result,
									"ResourceType": "2"
								}
							};
							var url = eosCommon.RESOURCES_API + "api/resource/delete";
							eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {

								}
							});
						}
					}
				});
				if(_this.IsChecking==1){
					$(".uploader_img2 .file-panel").hide();
					$(".statusBar").hide();
				}
			},
			bind_UpLicenseImg: function(ResourceIds, imgUrls) {
				var _this = this;
				$("#imgBox1").empty();
				$("#imgBox1").html(
					'<div class="uploader_img1 eos_uploader_img">' +
					'<div class="queueList">' +
					'<div id="dndArea" class="placeholder">' +
					'<div id="filePickerImg1">点击选择营业执照图片</div>' +
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
					"ResourceType": "2",
					"Title": "企业营业执照",
					"Description": "企业营业执照"
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

						 _this.licenseSid=result.Data[0].ResourceId;
					},
					'del': function(result) {
						//删除资源ID对应的文件

						if(result != "") {
							var param = {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"ResourceId": result,
									"ResourceType": "2"
								}
							};
							var url = eosCommon.RESOURCES_API + "api/resource/delete";
							eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {
								
								}
							});
						}
					}
				});	
				if(_this.IsChecking==1){
					$(".uploader_img1 .file-panel").hide();				
				}

			},
			btnAddEditCompany: function() {
				//编辑公司基本信息
				if(!verifyCheck._click()) {
					return false;
				} else {
					this.editCompanyRequest();
				}
			},
			
			editCompanyRequest: function() {
				var _this = this;
				console.log(_this.CompanyShortName)
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
					
					    "CompanyId":_this.CompanyId,
					    "CompanyName": _this.CompanyShortName,
					    "CompanyLogo": _this.CompanyLogo,
					    "ApplyPosition": _this.CompanyAplyPost,
					    "ApplyEmail": _this.CompanyAplyEmail,
					    "USCCode": _this.CompanyUSCCode,
					    "ORGCode": _this.CompanyORGCode,
					    "RegisteredAddress": _this.CompanyAddress,
					    "CompanyRegCapital": _this.CompanyRegCapital,
					    "LegalBody": _this.CompanyLegalBody,
					    "StaffNum": _this.CompanyStaffNum,
					    "IndustryId": _this.CompanyIndustryId,
					    "BLFiles": _this.licenseSid,
					    "ICFiles": _this.qualificationSid
					    

					}
				};
				console.log('param:',JSON.stringify(param))
				var url = eosCommon.COMMON_API + "api/Company/modifyCompanyInfo";
				eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);													
					}
				});
			},
			getCompanyDetails: function() {
				var _this = this,
				fielId=[],
				urlId=[],
				param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
				},
				url = eosCommon.COMMON_API + "api/Company/queryCompanyInfo";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						console.log('企业信息：',result)						
						_this.CompanyId=result.Data.CompanyId;
						_this.CompanyLogo=result.Data.CompanyLogo;
					     _this.CompanyShortName=result.Data.CompanyShortName;
					     _this.CompanyAplyPost=result.Data.CompanyAplyPost;
					    _this.CompanyAplyEmail=result.Data.CompanyAplyEmail;
					    _this.CompanyUSCCode=result.Data.CompanyUSCCode;
					    _this.CompanyORGCode=result.Data.CompanyORGCode;
					     _this.CompanyAddress=result.Data.CompanyAddress;
					     _this.CompanyRegCapital=result.Data.CompanyRegCapital;
					    _this.CompanyLegalBody=result.Data.CompanyLegalBody;
					    _this.CompanyStaffNum=result.Data.CompanyStaffNum;
					    _this.CompanyIndustryId=result.Data.CompanyIndustryId;
					    _this.licenseSid=result.Data.CompanyBLFiles;
					    _this.licenseUrl=result.Data.CompanyBLFilesURL;
					     _this.qualificationSid=result.Data.CompanyICFiles;
					     _this.CompanyExpirationDate=_this.formatDate(new Date(Date.parse(result.Data.CompanyExpirationDate)));
					     _this.CompanyAplyPhone=result.Data.CompanyAplyPhone;
					     _this.CompanyAplyName=result.Data.CompanyAplyName;
					     _this.IsRegular=result.Data.IsRegular;
					     _this.IsChecking=result.Data.IsChecking;
					    
					     if(_this.IsRegular==0){
					    
					     	
					     	_this.userStateInfo='试用用户'
						     	if(_this.IsChecking==1){
							     	//审核状态的操作
							     	$('input').attr('readonly',true);
							     	$('select').attr('disabled',true);
							     	$('button.applyToUnlimitedUser').attr('disabled',true);
							     	
							     	_this.userStateInfo="试用用户 (正在审核)"
							     	_this.isExperience=false;
						     	}
					     }else if(_this.IsRegular==1){
					     	
					     	$('input').attr('readonly',true);
					     	$('select').attr('disabled',true);
					     	$('button.applyToUnlimitedUser').attr('disabled',true);
					     	_this.userStateInfo='正式用户'
					     	_this.isExperience=false;
					     }
					     
					     
					     if(_this.CompanyIndustryId){
					     	$("#selIndustryId option[value='" + _this.CompanyIndustryId + "']").prop("selected", true);
							$("#selIndustryId").selectpicker('refresh');					     	
					     }
					   _this.bind_UpLicenseImg(_this.licenseSid,_this.licenseUrl);
					   for(let i=0;i<_this.qualificationSid.length;i++){
					   		fielId.push(_this.qualificationSid[i].FileId);
					   		urlId.push(_this.qualificationSid[i].FileUrl);
					   }
				   		_this.bind_UpQualification(fielId,urlId);
					   
					}
				});
			},
			formatDate:function(now)   {
              var   year=now.getFullYear();     
              var   month=now.getMonth()+1;     
              var   date=now.getDate();      
              return   year+"年"+month+"月"+date+"日";     
            },
            applyToUnlimitedUser(){
            	var _this=this,
            	param={
            		
					"AccessToken":eosCommon.storage.get('AccessToken')
            	},
            	url = eosCommon.COMMON_API + "api/Company/BecomeFormalUse";
				eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						console.log('申请正式用户返回信息：',result);
						
					}
				})
            },
            extendUserTime(){
            	var _this=this,
            	param={           						
					"AccessToken":eosCommon.storage.get('AccessToken'),
					    "Parameters":
						{
							"CompanyId":_this.CompanyId//企业ID
						}
            	},
            	url = eosCommon.COMMON_API + "api/Company/ExtendedProbationaryPeriods";
				eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						console.log('延长试用期返回信息：',result);
						_this.getCompanyDetails();						
					}
				})
            },
            btnCancelEditCompany(){
            	this.$router.push('/ecos/wb_index');
            }
		},
		mounted: function() {
			var _this=this;
						
			_this.bind_selIndustryId();
			_this.getCompanyDetails();
		}
	}
</script>
<style>
.apply-btn{
	padding:6px 26px!important;

}
.content-title-left{
	color: #8492A6;
}
.tn{
	/*margin-left: -1px;*/
}

</style>
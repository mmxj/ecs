<template>
	 <div id="verifyCheck_1">
			                    	
			                        <div class="form-horizontal content-box" style="border:none; margin-top:0;border-bottom: 1px solid #e9ecef;">
			                            <div class="form-group">
			                                <label class="content-title-left">维保方公司:</label>
			                                <div class="col-lg-6 col-xs-9">
			                                	 <p class="form-control-static">{{propsData.MaintCompanyName}}</p>
											</div>
			                            </div>
			                            <div class="form-group">
			                                <label class="content-title-left">维保主管:</label>
			                                <div class="col-lg-6 col-xs-9">
												<select id="mainChanger" :disabled="!isCanSelect" @change="changeCharge(MuserId,'0')" :MWorkMobile="MWorkMobile" v-model="MuserId"  class="form-control selectpicker" data-size="8" data-style="btn-white">
													<option  value="">选择维保主管</option>
													<option  v-for="item in companyUsers" :value="item.UserId">{{item.UserName}}</option>
												</select>
											</div>
			                            </div>
			                           
			                            <div class="form-group">
			                                <label class="content-title-left">维保主管联系电话:</label>
			                                <div class="col-lg-6 col-xs-9">
			                                	 <p class="form-control-static">{{MWorkMobile}}</p>

			                                </div>
			                            </div>
			                             <div class="form-group">
			                                <label class="content-title-left">维保主管电子邮箱:</label>
			                                <div class="col-lg-6 col-xs-9">
			                                	 <p class="form-control-static">{{MWorkEmail}}</p>
			                                </div>
			                            </div>
			                            <div class="form-group">
			                                <label class="content-title-left">维保人:</label>
			                                <div class="col-lg-6 col-xs-9">
												<select id="chargers" :disabled="!isCanSelect" @change="changeCharge(userId,'1')" v-model="userId"  class="form-control selectpicker" data-size="8" data-style="btn-white">
													<option  value="">选择维保人</option>													
													<option v-for="item in companyUsers" :value="item.UserId">{{item.UserName}}</option>
												</select>
											</div>
			                            </div>
			                            <div class="form-group">
			                                <label class="content-title-left">维保人联系电话:</label>
			                                <div class="col-lg-6 col-xs-9">
			                                	 <p class="form-control-static">{{WorkMobile}}</p>

			                                </div>
			                            </div>
			                             <div class="form-group">
			                                <label class="content-title-left">维保人电子邮箱:</label>
			                                <div class="col-lg-6 col-xs-9">
			                                	 <p class="form-control-static">{{WorkEmail}}</p>

			                                </div>
			                            </div>
			                            <div class="form-group" v-if="isCanSelect">
			                                <label class="content-title-left"></label>
			                                <div class="col-lg-5 col-xs-8 pl-22">
			                                    <button @click="btnSave()" type="submit" class="btn btn-default pull-left" >确定</button>
			                                </div>
			                            </div>
			                        </div>
			                        <!--手动录入结束-->
			                    </div>
	
</template>

<script>
	import commonFn from '../../../../../../assets/js/common/commonFunc'
    let projectContr=commonFn.projectContr;
export default {
	data(){
		return{		
			MWorkEmail:'',
			MWorkMobile:'',
			OwnerCompanyName:'',
			MuserId:'',
			companyUsers:'',
			WorkEmail:'',
			WorkMobile:'',
			userId:'',
			isAcceptInfo:'',
			EntitySort:'',
			IsAdmin:0,
			IsTrue:0,
			IsProjectAdmin:0
		}
	},
	props:{
		propsData:Object,
		getIsDualId:Number
	},
	computed:{
		isCanSelect(){
				return projectContr.isCanEditWbInfo(this.EntitySort,this.IsAdmin,this.getIsDualId,this.IsTrue,this.IsProjectAdmin);				
		}
	},
	mounted:function(){
		var _this=this;
		_this.EntitySort=eosCommon.storage.get('EntitySort');
		_this.IsAdmin=eosCommon.storage.get('IsAdmin');		
		_this.IsTrue=eosCommon.storage.get('IsTrue');
		_this.IsProjectAdmin=eosCommon.storage.get('IsProjectAdmin');
		//console.log('propsData:',_this.propsData)
		_this.$nextTick(function(){			
			$('#chargers').selectpicker('refresh');						
			$('#mainChanger').selectpicker('refresh');						
		});
		_this.GetCompanyUser();
		
		
	},
	methods:{
		
		btnSave:function(){
				var _this=this;
				var param = {
				    "AccessToken":eosCommon.storage.get("AccessToken"),
				    "Parameters": {
				         "ProjectId":_this.propsData.ProjectId,//--项目Id(必填)
					        "MaintUserId":_this.userId,//--维保人Id(和MaintSupId必须有一个非空)
					        "MaintSupId":_this.MuserId//--维保主管Id
				    }
				}
	            var url = eosCommon.ENTERPRISE_API + "api/project/ChangeMaintPerson";                           
	            eosCommon.eosAjax(url, "POST", param, "json", function (result) {
	                if (eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                        // _this.$router.go(-1);                               	
                        
                }})
		},
		initEditDatas:function(roleType){
			var _this=this;
			var companyUsers=_this.companyUsers;
			var len=companyUsers.length;			
				for(var i=0;i<len;i++){
					if(_this.propsData.MaintSupId==companyUsers[i].UserId){						
							_this.MuserId=companyUsers[i].UserId;
							_this.MWorkMobile=companyUsers[i].WorkMobile
							_this.MWorkEmail=companyUsers[i].WorkEmail
							$("#mainChanger option[value='" + _this.MuserId + "']").prop("selected", true);
													
					}
					if(_this.propsData.MaintUserId==companyUsers[i].UserId){						
							_this.userId=companyUsers[i].UserId;
							_this.WorkMobile=companyUsers[i].WorkMobile
							_this.WorkEmail=companyUsers[i].WorkEmail
							$("#chargers option[value='" + _this.userId + "']").prop("selected", true);
							$('#chargers').selectpicker('refresh');
					}	
				}								
		},
		GetCompanyUser:function(){
            	var _this=this;
            	var param={
            		 "AccessToken":eosCommon.storage.get('AccessToken'),
            		 "CompanyId":_this.propsData.MaintCompanyId
            	},
            	url=eosCommon.ENTERPRISE_API+"Api/AccountOperation/GetCompanyUser";
            	eosCommon.eosAjax(url,'GET',param,'json',function(result){
            		if(eosCommon.checkCode(result.State, result.Message)){
            			_this.companyUsers=result.Data;
            			_this.$nextTick(function(){
            				$('#mainChanger').selectpicker('refresh');
            				$('#chargers').selectpicker('refresh');
            			})
            			_this.initEditDatas('#mainChanger');
						_this.initEditDatas('#chargers');           			    				            			
            		}
            	});
	
            },
		changeCharge:function(userId,type){
					var _this=this;			
					var companyUsers=_this.companyUsers;									
					var len=companyUsers.length;					
					for(var i=0;i<len;i++){
						if(userId==companyUsers[i].UserId){	
							if(type=='0'){
								_this.MWorkMobile=companyUsers[i].WorkMobile
								_this.MWorkEmail=companyUsers[i].WorkEmail	
							}else{
								_this.WorkMobile=companyUsers[i].WorkMobile
								_this.WorkEmail=companyUsers[i].WorkEmail
							}																							
						}	
					}
		}
		
	}
	
	
}
</script>
<style scoped="scoped" type="text/css">
.form-horizontal:hover{
	border: none!important;
	min-height: 700px;
}

</style>
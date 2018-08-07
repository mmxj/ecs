<template>
	<div class="">
		<div class="card-box table-responsive">
            <div class="row">
                <div class="col-md-6">
                    <span class="size20 font-bold view-title">修改项目信息</span>
                </div>
                <div class="col-md-6">
                    <button @click="btnReturn()" type="button" class="btn btn-white waves-effect waves-light pull-right">
                        <i class="fa fa-mail-reply-all m-r-5"></i>返回
                    </button>
                </div>
            </div>
            <hr class="divider mb-10 mt-10">         
               <div class="item_edit_wrap">							            
	           		<div class="item_edit col-sm-12 col-md-12 col-lg-12 bg-white" style="padding:0px 0px; border-bottom: 1px solid #e9ecef;">
		                <span class="tab-title-bottom">
		                	<a v-if="iShowBasic||IsAdmin==1" :class="{activeBorder:currentViewTab=='info'}" >
		                		<label @click="toggleTabs('info');">
		                        	<span >基本信息</span>
		                    	</label>
		                	</a>
		                	<a v-if="IsAdmin==1||(EntitySort==2&&IsProjectAdmin==1)" :class="{activeBorder:currentViewTab=='charger_info'}">
		                		<label @click="toggleTabs('charger_info');">
		                        	<span >业主负责人信息</span>
		                    	</label>
		                	</a>
		                	<a v-if="IsAdmin==1||(EntitySort==2&&IsProjectAdmin==1)" :class="{activeBorder:currentViewTab=='wb_info'}">
		                		<label @click="toggleTabs('wb_info');">
		                        	<span >维保方信息</span>
		                    	</label>
		                	</a>
		                	<a v-if="iShowCode" :class="{activeBorder:currentViewTab=='code_info'}">
		                		<label @click="toggleTabs('code_info');">
		                        	<span >关联码信息</span>
		                    	</label>
		                	</a>
		                	<a v-if="iShowCode||IsAdmin==1" :class="{activeBorder:currentViewTab=='visible_info'}">
		                		<label @click="toggleTabs('visible_info');">
		                        	<span >可见人员</span>
		                    	</label>
		                	</a>		                				                    		                    		                  		                   
	                	</span>	               
            		</div>
            		<div class="clearfix">         			
            		</div>
            		<div class="tab-content">
		                    <loading v-show='noData'></loading>
                			<keep-alive>
                				<component v-show="!noData" :getCompanyUsers="companyUsers" :getIsDualId='IsDualId' :propsData='propsData' :is="currentViewTab" keep-alive></component>
                			</keep-alive>
           			 </div>
        	</div>
        </div>
        
	</div>
	
</template>

<script>
import info from './info.vue'
// import info from 'components/page/maintenanceAgent/items/subComponents/project/addProject.vue'
import wb_info from './wb_info.vue'
import charger_info from './charger_info.vue'
import code_info from './code_info.vue'
import visible_info from './visible_info.vue'
import commonFn from '../../../../../../assets/js/common/commonFunc'
import {mapMutations} from 'vuex'
let projectContr=commonFn.projectContr;
export default {
	data(){
		return{
			currentViewTab:'',
			propsData:{},
			itemInfo:'',			
			companyUsers:[],
			noData:true,
			//导航可见判断参数
			IsProjectAdmin:0,
			IsDualId:0,
			IsAdmin:0,
			EntitySort:0,
			IsProjectLeader:0,
			IsTrue:0
		}
	},
	computed:{
            //基本信息
            iShowBasic(){	
				return projectContr.editBasic(...this.showBasicParams);
			},			
			showBasicParams(){
				return [this.IsDualId,this.EntitySort,this.IsAdmin,this.IsProjectAdmin,this.IsTrue]
			},
			//维保人信息
			//关联码
			iShowCode(){				
				return projectContr.CodeInfo(...this.showCodeParams);
			},			
			showCodeParams(){
				return [this.IsDualId,this.EntitySort,this.IsAdmin,this.IsProjectLeader,this.IsTrue,this.IsProjectAdmin]
			}
},
	components:{
		info,
		wb_info,
		charger_info,
		code_info,
		visible_info
	},
	methods:{
		...mapMutations({
				uPDATE_SHOWWHICHTAB:'UPDATE_SHOWWHICHTAB'
			}),
		toggleTabs:function(currentTab){
			this.currentViewTab=currentTab;
		},
		btnReturn(){
			this.uPDATE_SHOWWHICHTAB({showWhichTab:1})
			//this.$router.go(-1)
		},
		QueryDetail:function(){
			var _this=this;
			if(!this.itemInfo.ProjectId){
				return;
			}
			var param = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),                            
                        "ProjectId": this.itemInfo.ProjectId                          
            };
            var url = eosCommon.ENTERPRISE_API + "api/project/QueryDetail";
            eosCommon.eosAjax(url, "GET", param, "json", function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                	_this.noData=false;
                   _this.propsData=result.Data;
                   _this.IsProjectLeader=_this.propsData.IsProjectLeader;
                   _this.$nextTick(function(){

                   		if(_this.iShowBasic||_this.IsAdmin==1){
                   			this.currentViewTab='info'
                   			return;
                   		}
                   		if(_this.iShowCode||_this.IsAdmin==1){
                   			this.currentViewTab='code_info'
                   			return;
                   		}
                   		
                   		if(this.EntitySort==0){
                   			this.currentViewTab='charger_info'
                   		}else if(this.EntitySort==1){
                   			this.currentViewTab='wb_info'
                   			
                   		}
                   		
					})
                }
            });
		},
		GetCompanyUser:function(){
            	var _this=this;
            	var param={
            		 "AccessToken":eosCommon.storage.get('AccessToken'),            		  		
            	},
            	url=eosCommon.ENTERPRISE_API+"Api/AccountOperation/GetCompanyUser";
            	eosCommon.eosAjax(url,'GET',param,'json',function(result){
            		if(eosCommon.checkCode(result.State, result.Message)){
            			_this.companyUsers=result.Data;           			    				
            			
            		}
            	});
	
            },
	},
	mounted:function(){
		var _this=this;
		_this.EntitySort=eosCommon.storage.get('EntitySort');
		_this.IsAdmin=eosCommon.storage.get('IsAdmin');
		_this.IsProjectAdmin=eosCommon.storage.get('IsProjectAdmin');
		_this.itemInfo=this.$route.params.itemInfo;
		_this.IsDualId=_this.itemInfo.IsDualId;	
		_this.IsTrue=_this.itemInfo.IsTrue;
		_this.QueryDetail();						
		_this.GetCompanyUser();		
	}	
}
</script>
<style scoped="scoped" type="text/css">
.item_edit_wrap{
	min-height: 800px;
	border: 2px solid #e9ecef;
}
.item_edit label{
	padding:0px 38px;
	color: #000;
	font-size: 16px;
	border-right: 1px solid #a9b3c1;
	font-weight: bolder;
	margin-top: 15px;
	cursor: pointer;
}
.item_edit label span{	
	font-weight: bolder;
}
.item_edit a{
	display:inline-block;
	height: 56px;
}
.item_edit .activeBorder label{
	color: #1abc9c;	
}
.activeBorder{
	border-bottom:4px solid #1abc9c;	
}

</style>
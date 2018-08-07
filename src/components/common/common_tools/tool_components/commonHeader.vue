<template>
	<div class="row" style=" border-bottom: 2px solid #edeff1; ">
			
			<ul class="nav nav-tabs" style="border-bottom: none; margin-bottom: 10px; position: relative;">
		        <li style="margin-right: 10px;">
		          <div class="item-table-detail">
		            <div style="width: 100px;height: 60px; ">
		              <img class="img-responsive" style="border-radius: 5px;" v-lazy="customLazy(mustInfo.thingPhoto,mustInfo.errorImg)">
		            </div>
		          </div>
		        </li>
		        <span class="tab-title-top">{{mustInfo.thingName}}</span>		       
		        <span class="size20 font-bold" style="color: #000;">--{{mustInfo.functionInfo}}</span>
		        <div class="" style="height: 34px;margin-top: 15px;">		
						<div v-if="mustInfo.isCanShowCompany" style="width: 250px;" class="col-lg-3 col-xs-3">
							<label class="content-title-left" style="width: 80px;"><em class="ak_required_em">*</em>所属企业:</label>
							<div id="" style="width: 150px;" class="col-lg-4 col-xs-4">
								<select @change="childrenMsg()" data-live-search="true" v-model="mustInfo.CompanyId"  id="selectCompany" class="form-control selectpicker" data-size="8" data-style="btn-white">
									<option value="">请选择公司</option>
									<option v-for="item in mustInfo.enterprise" :value="item.CompanyId">{{item.CompanyName}}</option>
								</select>
							</div>
							
						</div>
						<div v-if="mustInfo.isCanShowProject" style="width: 250px;" class="form-group col-lg-3 col-xs-3">
							<label class="content-title-left" style="width: 80px;"><em class="ak_required_em">*</em>所属项目:</label>
							<div id="" style="width: 150px;" class="col-lg-4 col-xs-4">
								<select data-live-search="true" v-model="mustInfo.ProjectId" id="selectProject" class="form-control selectpicker" data-size="8" data-style="btn-white">
									<option value="">请选择项目</option>
									<option v-for="item in mustInfo.projectListData" :value="item.ProjectId">{{item.ProjectName}}</option>
								
								</select>
							</div>
							
						</div>
				
		        </div>		       
		        	<button @click="ReturnClick" type="button" class="btnReturn btn btn-white pull-right" style="margin: 10px;position: absolute;right: 0; top: 50%;margin-top:-40px;">
		         			 <i class="fa fa-mail-reply-all m-r-5"></i>返回
	       			</button> 
		      </ul>
		</div>
</template>
<script type="text/javascript">
	import commonFn from '../../../../assets/js/common/commonFunc'
	import {mapMutations} from 'vuex'
	export default{
		name:'commonHeader',
		data(){
			return{
				infos:{},
				name:'huangjunfu',
				ProjectId:'',
				CompanyId:'',
				enterprise:[],
				projectListData:[]
				
			}
		},
		props:['mustInfo']
//		{
//			mustInfo:{
//				type:Object,
//				default:{
//					functionInfo:{
//						type:String,
//						default:''
//					},
//					thingName:{
//						type:String,
//						default:''
//					},
//					thingPhoto:{
//						type:String,
//						default:''
//					},
//					errorImg:{
//						type:String,
//						default:''
//					},
//					isCustomMethods:{
//						type:Boolean
//					},
//					enterprise:{
//						type:Array
//					},
//					projectListData:{
//						type:Array
//					},
//					EntitySort:{
//						type:Number
//					},
//					CompanyId:{
//						type:String
//					},
//					ProjectId:{
//						type:String
//					}
//				}
//			}
//			
//			
//		}
		,
		updated(){
			
		},
		created(){
			
		},
		mounted(){
			
			//console.log('点点点：',this.mustInfo);
			//this.CompanyId=this.mustInfo.CompanyId;
			this.$nextTick(()=>{
				$("#selectCompany").selectpicker('refresh');
				$("#selectProject").selectpicker('refresh');
			});
			
		},
		watch:{
			mustInfo:{
				handler: function(newVal,oldVal) {
				},
				deep: true
			},
			"mustInfo.projectListData"(val, oldVal){
				this.$nextTick(()=>{			
					$("#selectProject").selectpicker('refresh');
				});
			},
			"mustInfo.CompanyId"(newVal,oldVal){
				this.$emit("sendCompanyId",newVal)
			},
			"mustInfo.ProjectId"(newVal,oldVal){
				this.$emit("sendProjectId",newVal)
			}
		},
		methods:{
			...mapMutations({
				 getRENDER_COP:'RENDER_COP'
			}),
			customLazy(src,errorImg){			
				return commonFn.customLazy(src,errorImg)
			},
			childrenMsg(){
				let vm=this;
			},
			getParentMethods(){
			},
			ReturnClick(){
				if(this.mustInfo.isCustomMethods=='cop'){
					this.getRENDER_COP(this.mustInfo.params);
					return;
				}
				this.$router.go(-1);
				
			}
		}				
	}
</script>
<style scoped="scoped">
	.item-table-detail {
		padding: 10px;
		background: #dfeceb;
		border-radius: 5px;
	}
	.item-table-detail img {
	    width: 100px;
	    height: 60px;
	}
</style>
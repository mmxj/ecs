<template>
	<!--style='overflow:auto;height:100%;'-->
	<div id="item-index" style="height: 100%;overflow:auto;" class="card-box ">
		<div id="add-device" style="height: 100%;">
			<div class="device_info" style="height: 100%;">
				<div id="setPanel" style="height: 100%;">
					<div class="row" style=" border-bottom: 1px solid #edeff1; ">
						<div class="col-lg-12">
							<span class="size20 font-bold" style="color: #000;">{{title}}--<span style="color: #9d9d9d; font-size: 20px; ">{{EquipmentName}}</span></span>
							<button style="margin-bottom: 8px;" @click="ReturnClick()" type="button" class="btnReturn btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
						</div>
					</div>
					<div class="contents" style="position: absolute; top: 64px;bottom: 0; left:10px;right:10px;background-color: #eef6f6;border: 2px solid #edf4f4; padding: 0px;">
						<div class="content-left" style="background-color: #eef6f6;z-index: 1;height: 100%; overflow-y: auto;">
							<div class="tabs-vertical-env">
								<ul id="EosBaseDveTab" class="nav tabs-vertical">
									<li :class="{active:currentViewTab=='e_base'}" class="b-b-1">
										<a @click="toggleTabs('e_base')" id="e_base">基本信息</a>
									</li>
									<li :class="{active:currentViewTab=='e_gateway'}" class="b-b-1">
										<a @click="toggleTabs('e_gateway')" id="e_gateway">网关绑定</a>
									</li>
									<li :class="{active:currentViewTab=='e_fault'}" class="b-b-1">
										<a @click="toggleTabs('e_fault')" id="e_fault">故障代码</a>
									</li>
									<li :class="{active:currentViewTab=='e_protocol'}" class="b-b-1">
										<a @click="toggleTabs('e_protocol')" id="e_protocol">通讯协议</a>
									</li>
									<li :class="{active:currentViewTab=='e_policy'}" class="b-b-1">
										<a @click="toggleTabs('e_policy')" id="e_policy">报警策略</a>
									</li>
									<li :class="{active:currentViewTab=='e_nameplate'}" class="b-b-1">
										<a @click="toggleTabs('e_nameplate')" id="e_nameplate">铭牌信息</a>
									</li>
									<li :class="{active:currentViewTab=='e_manuals'}" class="b-b-1">
										<a @click="toggleTabs('e_manuals')" id="e_manuals">设备档案</a>
									</li>
								</ul>
							</div>
						</div>
						<div class="" style="position: relative; height:100%;overflow-y: auto;background: #fff;">
							<div class="tab-content sub-content-right" style="height: 100%;">
								<component v-on:changeTitle="getTile" :propsDatas="equipmentData" v-on:canNext="getCanNextMsg" :is="currentViewTab"></component>								
							</div>
							
						</div>
					</div>

				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import e_base from "./base.vue";
	import e_gateway from "./gateway.vue";
	import e_fault from "./fault.vue";
	import e_manuals from "./manuals.vue";
	import e_nameplate from "./nameplate.vue";
	import e_policy from "./policy.vue";
	import e_protocol from "./protocol.vue";
	import Bus from 'src/assets/js/common/bus.js';
	export default {
		data: function() {
			var _this = this;
			return {

				equipmentData: {
					currentView: 'e_base',
					ProjectId: '',
					GatewayId: '',
					EquipmentId: '',
					ProjectName: '',
					equipmentData: false,
					GatewayName: ''
				},
				title: '基本信息',
				EquipmentName: '',
				currentViewTab: '',
				params: ''

			}
		},
		components: {
			e_base,
			e_gateway,
			e_fault,
			e_manuals,
			e_nameplate,
			e_policy,
			e_protocol
		},
		props: ['propsData'],
		methods: {
			toggleTabs: function(tabText) {
				this.equipmentData.currentView = tabText;
				this.currentViewTab = tabText;
			},
			getCanNextMsg: function(msg) {
				if(msg) {
					this.equipmentData.equipmentData = true;
				}
			},
			ReturnClick() {
				//console.log('项目id：',this.equipmentData,this.equipmentData.ProjectId);
				eosCommon.storage.set('ProjectId',this.equipmentData.ProjectId)
				this.$router.go(-1);


			},
			getTile(title) {
				this.title = title;
			}
		},
		mounted: function() {
			var _this = this;
			_this.params = _this.$route.params;
			//alert(1);
			if(_this.params.isInsert) {//新增的时候
				_this.equipmentData.ProjectId = _this.params.ProjectId;
				_this.equipmentData.GatewayId = _this.params.GatewayId;
				_this.equipmentData.ProjectName = _this.params.ProjectName;
				_this.equipmentData.GatewayName = _this.params.GatewayName;
				_this.EquipmentName = _this.params.EquipmentName;
			     _this.equipmentData.bindGateWay=_this.params.bindGateWay;
			     _this.equipmentData.isDirectInto=_this.params.isDirectInto;			     				
				if(_this.params.bindGateWay){//直接进入绑定网关	
						_this.equipmentData.EquipmentId=_this.params.EquipmentId;
						 _this.equipmentData.EquipmentName=_this.params.EquipmentName;	
						 _this.equipmentData.BaseEquipmentId=_this.params.BaseEquipmentId;
					     _this.equipmentData.EquipmentPhoto=_this.params.EquipmentPhoto;
					     _this.equipmentData.bindGateWay=_this.params.bindGateWay;					     					     
						_this.currentViewTab = 'e_gateway';
					return;
				}
				if(_this.params.isEdit) {//编辑的时候						
					_this.equipmentData.EquipmentId = _this.params.EquipmentId;
					 _this.equipmentData.EquipmentName=_this.params.EquipmentName;
					 _this.equipmentData.EquipmentPhoto=_this.params.EquipmentPhoto;
					  _this.equipmentData.BaseEquipmentId=_this.params.BaseEquipmentId;
					_this.equipmentData.ProjectId = _this.params.ProjectId;				
					_this.equipmentData.ProjectName = _this.params.ProjectName;
					_this.equipmentData.GatewayId = _this.params.GatewayId;
					_this.EquipmentName = _this.params.EquipmentName;						
					 _this.equipmentData.isDirectInto=_this.params.isDirectInto;
					_this.currentViewTab = 'e_base';
					return;	
				}
				_this.currentViewTab = 'e_base';
				return;
			}
			

		}
	}
</script>

<style scoped>
	
	.nav.tabs-vertical>li>a{
		color: #000000!important;
		font-weight: bolder;
		font-size: 16px;
	}
	.tabs-vertical>li.active>a {
		color: #1abc9c!important;
	}
	.tabs-vertical-env .nav.tabs-vertical li>a {
		text-align: center;
    		background-color: #eef6f6;
		}
	.tabs-vertical-env .nav.tabs-vertical li.active>a {
    		background-color: #fff;
		}
	.content-right:hover{
		box-shadow: none;
		left: 265px;
    	right: 29px;
	}
	.b-b-1 {
    border-bottom: 2px solid #e4f0ef !important;
	}
</style>
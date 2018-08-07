<style lang="less" scoped="scoped">
	.clearfloat:after {
		display: block;
		clear: both;
		content: "";
		visibility: hidden;
		height: 0
	}
	
	.ele_peak {
		margin: 0 auto;
		max-width: 340px;
		/*min-width: 230px;*/
		padding: 0 5px;
		p.timeRange {
			position: relative;
			font-size: 14px;
			color: #1F2D3D;
			padding: 10px 0;
			text-align: center;
			font-weight: bolder;
			border-bottom: 1px dashed #8492A6;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			/*span{
				font-size: 14px;
				color: #1F2D3D;
				text-align: center;
				font-weight: bolder;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}*/
		}
		p.ele_peak_info {
			font-size: 14px;
			color: #8492A6;
			padding: 10px 0;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.peak_wrap {
			height: 112px;
			padding: 15px 0;
			position: relative;
		}
		.ele_peak_left {
			padding-right: 20px;
		}
		.ele_peak_right {
			padding-left: 20px;
		}
		.peak_wrap_timeInfo{
			font-size: 12px;
			color: #1F2D3D;
			position: absolute;
			top: -10px;
			left: 43%;
			margin-left: -30px;
			width: 70px;
			text-align: center;
			/*margin: 0 auto;*/
			
		}
	}
</style>
<template>
	<!--ele_statistics-->
	<div class="ele_peak clearfloat">
		<div class="peak_wrap">
			<div class="ele_peak_left pull-left col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<p :title="PowerStatisticDatas.DayKey" class="timeRange">{{PowerStatisticDatas.DayKey}}</p>
				<p :title="'本日MD发生时段'" class="ele_peak_info">本日MD发生时段</p>
			</div>
			<div class="ele_peak_right pull-left col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<p :title="PowerStatisticDatas.DayValue" class="timeRange">{{PowerStatisticDatas.DayValue}}kWh</p>
				<p :title="'本日MD值'" class="ele_peak_info">本日MD值</p>
			</div>
		</div>
		<div class="peak_wrap">
			<div class="ele_peak_left pull-left col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<p :title="PowerStatisticDatas.MonthKey" class="timeRange">
					{{PowerStatisticDatas.MonthKey}}				
				</p>
				<p :title="'本日MD发生时段'" class="ele_peak_info">本月MD发生时段</p>
				<p class="peak_wrap_timeInfo">{{PowerStatisticDatas.MonthDate}}</p>
			</div>
			<div class="ele_peak_right pull-left col-xs-6 col-sm-6 col-md-6 col-lg-6">
				<p :title="PowerStatisticDatas.MonthValue" class="timeRange">
					{{PowerStatisticDatas.MonthValue}}kWh					
				</p>
				<p :title="'本日MD值'" class="ele_peak_info">本月MD值</p>				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
				return {
					ProjectId: '',
					AccessToken: eosCommon.storage.get("AccessToken"),
					PowerStatisticDatas:{
						"DayKey": "--至--",
					   "DayValue": '--',
					   "MonthKey": "--至--",
					   "MonthValue": '--',
					   "MonthDate":'--'
					}
				}
			},
			props: ['propsData','otherParams'],
			watch: {
				'otherParams.isFinishSaved'(val,oldval){
					let vm=this;
					if(val){
						if(vm.otherParams.currEleSetting=='ele_peak'){
							vm.getPeakPreDatas();
							vm.otherParams.currEleSetting='';
						}
					}
				}
			},
			mounted() {
				let vm=this;
				let MonthDate=vm.formatCurrentTime('日',false);
				vm.ProjectId = vm.propsData.previewDatas.ProjectId;
				let confState=vm.otherParams.GetEnergyConfigState;
				if(confState.length>0){
					for(let val of confState){					
						if(val.Type==2){
							vm.getPeakPreDatas();
						}else{
							vm.PowerStatisticDatas.MonthDate=MonthDate;
						}
					}
				}else{
					vm.PowerStatisticDatas.MonthDate=MonthDate;
				}
			},
			methods: {
				formatCurrentTime(timeType,isCharacter){
	            	var vm=this;
	            	//vm.nowTime
	            	var timeStamps=new Date(new Date().getTime());           	
	            	if(timeType=='年'){
	            		if(isCharacter){
	            			return timeStamps.getFullYear()+'年';
	            		}
						return timeStamps.getFullYear();						
					}else if(timeType=='月'){
						return timeStamps.getFullYear()+'-'+(timeStamps.getMonth()+1);
					}else if(timeType=='日'){
						return timeStamps.getFullYear()+'-'+(timeStamps.getMonth()+1)+"-"+timeStamps.getDate();
					}
           		},
				getPeakPreDatas() {
					let vm = this;
					let param = {
						"AccessToken": vm.AccessToken,
						"ProjectId":vm.ProjectId,
					};
					let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/GetPeakPowerStatistic";
					eosCommon.eosAjax(url, "get", param, "json", function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							vm.PowerStatisticDatas=result.Data;
						}
					});
				},
			}
	}
</script>
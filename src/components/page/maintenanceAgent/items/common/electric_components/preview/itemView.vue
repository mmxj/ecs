<style lang="less" scoped="scoped">
	.sub_item_view {
		width: 100%;
		height: 224px;
		padding: 5px 15px;
		.timeSelect {
			width: 100%;
			position: relative;
			a.time_btn {
				display: inline-block;
				padding: 5px 15px;
				background: #E0E1E3;
				margin-right: 5px;
				color: #1F2D3D;
				font-size: 10px;
				cursor: pointer;
			}
			a.time_btn_active {
				background: #1ABC9C;
				color: #fff;
			}
			.currDate {
				font-size: 12px;
				color: #1F2D3D;
				font-weight: bolder;
				position: absolute;
				top: 5px;
				right: 12px;
			}
		}
		.highcharts-container {
			width: 100%!important;
		}
	}
</style>
<template>
	<!--ele_statistics-->
	<div class="sub_item_view">
		<div class="timeSelect">
			<a @click="toggleTime('1')" :class="{'time_btn_active':currTimeType=='1'}" class="time_btn">日</a>
			<a @click="toggleTime('2')" :class="{'time_btn_active':currTimeType=='2'}" class="time_btn">周</a>
			<a @click="toggleTime('3')" :class="{'time_btn_active':currTimeType=='3'}" class="time_btn">月</a>
			<a @click="toggleTime('4')" :class="{'time_btn_active':currTimeType=='4'}" class="time_btn">年</a>
			<div class="currDate">
				{{tipDate}}
			</div>
		</div>
		<div id="container" style="position: relative; width:100%; height: 184px; margin:0 auto;">

		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				ProjectId: '',
				AccessToken: eosCommon.storage.get("AccessToken"),
				currTimeType: '1',
				GroupStatistic: [],
				confStateLen:0,
				currTypeVal:0,
				defaultFormat:'<b>0%</b>',
				format:'<b>{point.percentage:.1f}%</b>',
				nowFormat:this.defaultFormat,
				defaultPointFormat:'<b>0%</b>',
				pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>',
				nowPointFormat:this.defaultPointFormat,
				tipDate:''
			}
		},
		props: ['propsData','otherParams'],
		watch: {
			'otherParams.isFinishSaved'(val,oldval){
					let vm=this;
					if(val){
						if(vm.otherParams.currEleSetting=='sub_item'){
							vm.GetEnergyGroupStatistic();
							vm.otherParams.currEleSetting='';
						}
					}
				}
		},
		mounted() {
			let vm = this;
			vm.tipDate=vm.formatCurrentTime('日',false);
			vm.currTimeType = vm.propsData.previewDatas.Type;
			vm.ProjectId = vm.propsData.previewDatas.ProjectId;
			let confState=vm.otherParams.GetEnergyConfigState;
			vm.confStateLen=confState.length;
			if(vm.confStateLen>0){
				vm.currTypeVal =confState.filter((cVal)=>{
					return cVal.Type==3;
				});
				if(vm.currTypeVal.length){
					vm.GetEnergyGroupStatistic();
				}else{
					vm.setDefaultData();
				}
			}else{
				vm.setDefaultData();
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
			setDefaultData(){
				let vm=this;
				vm.nowFormat=vm.defaultFormat;
				vm.nowPointFormat=vm.defaultPointFormat;
				vm.GroupStatistic=[];
				for(let i=0;i<3;i++){
					let temArr = ['--', 1]
					vm.GroupStatistic.push(temArr);
				}
				vm.initChart();
			},
			toggleTime(timeType) {
				let vm = this;
				vm.currTimeType = timeType;
				if(vm.confStateLen>0 && vm.currTypeVal.length){
						vm.GetEnergyGroupStatistic();
					}else{
						vm.setDefaultData();
					}			
			},
			GetEnergyGroupStatistic() {
				let vm = this;
				let param = {
					"AccessToken": vm.AccessToken,
					"Type":vm.currTimeType,
					"ProjectId": vm.ProjectId,

				};
				let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/GetEnergyGroupStatistic";
				eosCommon.eosAjax(url, "get", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.GroupStatistic = [];
						let rs = result.Data;
						let val0=rs.filter((v)=>v.Value==0);
						if(val0.length==rs.length){
							vm.nowFormat=vm.defaultPointFormat;
							vm.nowPointFormat=vm.defaultPointFormat;
							for(let val of rs) {
								let temArr = [val.GroupName, 1]
								vm.GroupStatistic.push(temArr);
							}
						}else{
							vm.nowFormat=vm.format;
							vm.nowPointFormat=vm.pointFormat;
							for(let val of rs) {
								let temArr = [val.GroupName, val.Value]
								vm.GroupStatistic.push(temArr);
							}
						}						
						vm.initChart();
					}
				});
			},
			initChart() {
				let vm=this;
			  	$('#container').highcharts(vm.getOptions());
			},
			getOptions() {
				let vm=this;
				return {
					chart: {
						plotBackgroundColor: null,
						plotBorderWidth: null,
						plotShadow: false
					},
					 colors:[
                        '#BE95E1',//第一个颜色，欢迎加入Highcharts学习交流群294191384
                        '#3498DB',//第二个颜色
                        '#FBB184',//第三个颜色
                       	'#85CC52', //。。。。
                       	'#FF5C00'
                      ],
					title: {
						text: ''
					},
					credits : {
							enabled: false //不显示LOGO 
					},
					tooltip: {
						headerFormat: '{series.name}<br>',
						pointFormat: vm.nowPointFormat
					},
					legend: {
						layout: 'vertical',
						align: 'right',
						//right: -20,
						verticalAlign: 'top',
						x:10,
						y: 30,
						symbolHeight: 10,
						symbolWidth: 16,
						symbolRadius: 0,
						//					floating: true,
						backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
					},
					plotOptions: {
						pie: {
							allowPointSelect: true,
							cursor: 'pointer',
							showInLegend: true,
							dataLabels: {
								distance: 5,
								enabled: true,
								format: vm.nowFormat,
								//format: '<b>{point.name}</b>: {point.percentage:.1f}%',
								style: {
									color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
								}
							}
						}
					},
					series: [{
						type: 'pie',
						name: '用电占比',
						data:vm.GroupStatistic
					}]
				}
			}
		}
	}
</script>
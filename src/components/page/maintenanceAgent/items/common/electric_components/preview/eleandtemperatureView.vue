<template>
	<!--ele_statistics-->
	<div class="eleAndtemperature">
		<div class="timeSelect">
			<a @click="toggleTime('1')" :class="{'time_btn_active':currTimeType=='1'}" class="time_btn">日</a>
			<a @click="toggleTime('2')" :class="{'time_btn_active':currTimeType=='2'}" class="time_btn">周</a>
			<a @click="toggleTime('3')" :class="{'time_btn_active':currTimeType=='3'}" class="time_btn">月</a>
			<a @click="toggleTime('4')" :class="{'time_btn_active':currTimeType=='4'}" class="time_btn">年</a>
			<div class="currDate">
				{{tipDate}}
			</div>
		</div>
		<div id="splinecontainer" style="width: 100%; height: 180px; margin: 0 auto;margin-top:10px;position: relative;"></div>
	</div>
</template>
<script>
	export default {
		data() {
				return {
					ProjectId:'',
					AccessToken: eosCommon.storage.get("AccessToken"),
					currTimeType: '1',
					xAxi:{
						dayX:[
						'1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
						'13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
						'23', '24'
						],
						weekX:['1', '2', '3', '4', '5', '6', '7'],
						month:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12',
						'13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
						'23', '24', '25', '26', '27', '28', '29', '30'],
						year:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
					},
					xAxiData:[],
					eleValue:[],
					eleTemValue:[],
					previewDatas:{
						Type:2,
						dataList:[
							{
							 "Time": "00:00",
						      "Value": 0.6,
						      "Temp": 25.85
							}
						]
					},
					confStateLen:0,
					currTypeVal:0,
					tipDate:''
				}
			},
			props: ['propsData','otherParams'],
			watch: {
				'otherParams.isFinishSaved'(val,oldval){					
					let vm=this;
					if(val){
						if(vm.otherParams.currEleSetting=='eleAndtemperature'){
							vm.getEnergyTempStatistic();
							vm.otherParams.currEleSetting='';
						}
					}
				}
			},
			computed: {

			},
			mounted() {
				let vm=this;
				vm.tipDate=vm.formatCurrentTime('日',false);
				vm.currTimeType=vm.propsData.previewDatas.Type;
				vm.ProjectId=vm.propsData.previewDatas.ProjectId;
				let confState=vm.otherParams.GetEnergyConfigState;
				vm.confStateLen=confState.length;
				if(vm.confStateLen>0){
					vm.currTypeVal =confState.filter((cVal)=>{
						return cVal.Type==4;
					});
					if(vm.currTypeVal.length){
						vm.getEnergyTempStatistic();
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
					vm.xAxiData=[];
					vm.eleValue=[];
					vm.eleTemValue=[];
					if(vm.currTimeType==1){
						for(let i=0;i<24;i+=3){
							vm.xAxiData.push(`${i}时`);
							vm.eleValue.push(0);
							vm.eleTemValue.push(0);
						}
					}else if(vm.currTimeType==2){
						for(let i=0;i<7;i++){
							let weekDay=`${vm.getWeekFormat(i)}`
							vm.xAxiData.push(weekDay);
							vm.eleValue.push(0);
							vm.eleTemValue.push(0);
						}
					}else if(vm.currTimeType==3){
						for(let i=0;i<30;i+=3){
							vm.xAxiData.push(`${i+1}日`);
							vm.eleValue.push(0);
							vm.eleTemValue.push(0);
						}
					}else if(vm.currTimeType==4){
						for(let i=0;i<12;i++){
							let weekDay=`${i+1}月`
							vm.xAxiData.push(weekDay);
							vm.eleValue.push(0);
							vm.eleTemValue.push(0);
						}
					}
					vm.initChart();
				},
				getWeekFormat(i){
					switch(i){
						case 0:
							return '周一';
							break;
						case 1:
							return '周二';
							break;
						case 2:
							return '周三';
							break;
						case 3:
							return '周四';
							break;
						case 4:
							return '周五';
							break;
						case 5:
							return '周六';
							break;
						case 6:
							return '周日';
							break;
						default:
						console.log('输入错误！');							
					}
				},
				toggleTime(timeType) {
					let vm = this;
					vm.currTimeType = timeType;
					if(vm.confStateLen>0 && vm.currTypeVal.length){
						vm.getEnergyTempStatistic();
					}else{
						vm.setDefaultData();
					}					
				},
				getEnergyTempStatistic() {
					let vm = this;
					let param = {
						"AccessToken": vm.AccessToken,
						'Type':vm.currTimeType,
						"ProjectId":vm.ProjectId,
					};
					let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/GetEnergyTempStatistic";
					eosCommon.eosAjax(url, "get", param, "json", function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							let dataList=[];
							vm.xAxiData=[];
							vm.eleValue=[];
							vm.eleTemValue=[];
							if(result.Data.length==0){
								console.log('暂无数据：');
							}else{
								dataList=result.Data;
								for(let i=0;i<dataList.length;i++){
									vm.xAxiData.push(dataList[i].Time);									
									vm.eleValue.push(dataList[i].Value);
									vm.eleTemValue.push(dataList[i].Temp);									
								}
							}							
							vm.initChart();
						}
					});
				},
				initChart(){
					let vm=this;
						var chart = {
							zoomType: 'xy',
							margin: [30, 35, 40, 30],
							spacing: [0, 0, 0, 0, ]		
						};
						var credits = {
							enabled: false //不显示LOGO 
						}
						var subtitle = {
							text: ''
						};
						var title = {
							text: ''
						};
						var xAxis = {
							categories: vm.xAxiData,
							crosshair: true,
							labels: {
								style: {
									color: '#8492A6',
									fontSize:10
								}
							}
						};
						var yAxis = [{ // 第一条Y轴
								labels: {
									format: '{value}',
									style: {
										color: '#8492A6',
										fontSize:10
									}
								},
								tickAmount:5,
								lineWidth: 1,
								lineColor: '#8492A6',
								tickColor: '#8492A6',
								gridLineDashStyle: 'longdash',
								gridLineColor:'#8492A6',
							title:{
								align: 'high',
								offset: 0,
								text: '用电量(kWh)',
								rotation: 0,
								y: -15,
								x: 40,
								style: {
									color: '#1F2D3D',
									fontSize:10
								}
							}
						}, { // 第二条Y轴
							title: {
								align: 'high',
								offset: 0,
								text: '室外温度(°C)',
								rotation: 0,
								y: -15,
								x: -35,
								style: {
									color: '#1F2D3D',
									fontSize:10
								}
							},
							lineWidth: 1,
							tickAmount:5,
							lineColor: '#8492A6',
							tickColor: '#8492A6',
							gridLineDashStyle: 'longdash',
							gridLineColor:'#8492A6',
							labels: {
								format: '{value}',
								style: {
									color: '#8492A6',
									fontSize:10
								}
							},
							opposite: true
						}];
						var tooltip = {
							shared: true
						};
						var legend = {
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'top',
							y: 0,
							backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
						};
						var series = [{
							name: '室外温度',
							type: 'column',
							color:'#1ABC9C',							
							yAxis: 1,
							data: vm.eleTemValue,
							tooltip: {
								valueSuffix: ' °C'
							}		
						}, {
							name: '用电量',
							color:'#F99C00',
							type: 'spline',
							marker:{
								 fillColor: '#FFFFFF',
					                lineWidth: 1,
					                lineColor: null
							},
							data: vm.eleValue,
							tooltip: {
								valueSuffix: ' kWh'
							}
						}];		
						var json = {};
						json.chart = chart;
						json.credits = credits;
						json.title = title;
						json.subtitle = subtitle;
						json.xAxis = xAxis;
						json.yAxis = yAxis;
						json.tooltip = tooltip;
						json.legend = legend;
						json.series = series;
						$('#splinecontainer').highcharts(json);
				}
				
			}
	}
</script>
<style lang="less" scoped="scoped">
	.eleAndtemperature {
		width: 100%;
		height: 224px;
		padding: 5px 15px;
	}	
	.highcharts-container {
		width: 100%!important;
		margin: 0!important;
	}	
	.highcharts-plot-background {
		width: 100%!important;
	}	
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
</style>
<template>
	<div id="consumption" :style="[fullScreenCss['el_mainContent']]">

		<div class="row">
			<div style="display: block; " class="col-md-12">
				<div style="padding: 0;" class="card-box">
					<div class="t_wrap">
						<div style="margin-bottom: 0px; " class="form-group">
							<span class="size20 font-bold" style="color: #000;">{{EquipmentAlias}}</span>
						</div>
						<div class="form-group t_info">
							<label class="content-title-left">所属项目:</label>
							<div class="col-lg-6 col-xs-9">
								<p class="form-control-static">{{ProjectName}}</p>

							</div>
							<div class="clearfix">

							</div>
						</div>
					</div>

					<!--<hr class="divider mt-10 mb-5">-->
					<div class="row no-space-row bg-white" style="margin: 0;">
						<div class="col-xs-12" style="margin: 0;padding: 0;">
							<div class="code form-inline">
								<span class="pull-left OperatorEdit" style="margin-left: 20px;">
					                <button id="btnInsert" @click="isRenderCop('setting')" data-toggle="modal"  type="button" class="btn" >
					                    <i class="fa  fa-cog m-r-5"></i>COP设置
					                </button>
					            </span>
								<span class="pull-left OperatorSearch">
					                <button id="btnInsert" @click="isRenderCop('historyData')" data-toggle="modal" data-target="#modal-cleos" type="button" class="btn" >
					                    <i class="fa  fa-folder-open m-r-5"></i>历史数据
					                </button>
					            </span>
					           

							</div>
							<div class="chart-content" style="">
								<div class="copValueDescriptions">
									<ul>
										<li style="background: url(../../../../../static/css/img/copInfo_04.png) no-repeat left;">COP值：优</li>
										<li style="background: url(../../../../../static/css/img/copInfo_03.png) no-repeat left;">COP值：良</li>
										<li style="background: url(../../../../../static/css/img/copInfo_02.png) no-repeat left;">COP值：中</li>
										<li style="background: url(../../../../../static/css/img/copInfo_01.png) no-repeat left;">COP值：差</li>
									</ul>
								</div>
								<div id="mainWrap" style="width: 708px; height: 266px; margin: 0 auto; margin-top: 50px;background:url(../../../../../static/css/img/5.png); "><!--url(../../../../../static/css/img/5.png);-->
									<div id="main" style="width: 600px;height:300px;margin: 0 auto;	"></div>
								</div>

								<div id="container" style="max-width:1000px; height: 300px;position: relative; margin:0 auto;z-index: 0;"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import {mapMutations} from 'vuex'	
	import {getWinSize } from 'src/assets/js/common/util.js';
	export default {

		data() {
			return {
				EquipmentAlias: '',
				ProjectName: '',
				CopDatasArr: [],
				CurCop: 0,
				isFirstLoad: true,
				intervalTime: 5000,
				point: {},
				chartSpeed: '',
				timer: 0,
				SplineInitCopDatas: [],
				SplineCopDatas: [],
				myTimer: 0,
				XArray: [],
				YArray: [],
				EquipmentId: '',
				myChart:{},
				options:{},
				timerInterval:30,
				fullScreenCss: {
					el_mainContent: {}
				}

			}
		},
		props: ['equipmentData'],
		watch: {			
			equipmentData: {
				handler: function(newVal,oldVal) {
					let vm = this;
					vm.EquipmentAlias = newVal.EquipmentName;
					vm.ProjectName = newVal.ProjectName;
					vm.EquipmentId = newVal.EquipmentId;
					clearInterval(vm.myTimer);
					vm.myTimer=0;
					vm.CopDatasArr=[];
					if(!vm.EquipmentId){
						return;
					}
					vm.getCopDatas();
				},
				deep: true
			}
		},
		computed: {
		
			
		},
		methods: {
			...mapMutations({
			      getRENDER_COP:'RENDER_COP'
			      //uPDATE_DRAGDATA_STATE: 'UPDATE_DRAGDATA_STATE'
		    }),
		    isRenderCop(operator){
		    	if(operator=='setting'){
		    		this.getRENDER_COP({
		    			isRenderCOP:false,
		    			copOperatorName:'setting',
		    			copEquipmentData:this.equipmentData
		    		});
		    	}else if(operator=='historyData'){
	    			this.getRENDER_COP({isRenderCOP:false,
	    				copOperatorName:'historyData',
	    				copEquipmentData:this.equipmentData
	    			});
		    	}		    	
		    },
			getCopDatas() {
				let vm = this,
					param = {
						"AccessToken": eosCommon.storage.get('AccessToken'),
						"TerminalEquipmentId": vm.EquipmentId, //vm.EquipmentId
						"Minute":vm.timerInterval
					},
					url = eosCommon.ENTERPRISE_API + "Api/Equipment/GetEquipmentCopData";
				
				eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.CopDatasArr = result.Data;					
						vm.CurCop = result.Data.CurCop;
						vm.updateSpline(vm.CurCop);
						vm.initSplineChart(vm.CopDatasArr);
					}
				});
			},
			updateSpline(CurCop){
				let vm=this;
				vm.myChart = echarts.init(document.getElementById('main'));
				vm.myChart.clear();
				vm.myChart={};
				vm.options={};
				vm.myChart = echarts.init(document.getElementById('main'));								
				vm.options=vm.getChartOptions(CurCop);
				vm.myChart.setOption(vm.options,true);
			},
			getSplineCopDatas(series) {
				let vm = this,
					param = {
						"AccessToken": eosCommon.storage.get('AccessToken'),
						"TerminalEquipmentId": vm.EquipmentId //vm.EquipmentId						
					},
					url = eosCommon.ENTERPRISE_API + "Api/Equipment/GetEquipmentCurrentCopData";
				eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.SplineCopDatas=result.Data;
						let x = parseInt(vm.SplineCopDatas.CurTime), 
							y = vm.SplineCopDatas.CurCop;
							vm.CurCop = vm.SplineCopDatas.CurCop;
							vm.updateSpline(vm.CurCop);
							series.addPoint([x, y], true, true);
					}
				});
			},
			goCopHistoryData() {				
				//window.location.href="static/html/my_chart/index.html?AccessToken="+eosCommon.storage.get('AccessToken')+'&'+'TerminalEquipmentId='+this.EquipmentId;
				//this.$router.push({ name: "copHistoryData", params: this.equipmentData });
			},
			initSplineChart(CopDatasArr) {
				let i = 0;
				let vm=this;
				let chart = {
					type: 'spline',
					animation: Highcharts.svg, // don't animate in IE < IE 10.
					marginRight: 10,
					events: {
						load: function() {
							let series = this.series[0];
								if(vm.myTimer=='stop'){
									return;
								}
								vm.myTimer=setInterval(function() {
									vm.getSplineCopDatas(series);								
								}, 10000);													
						}
					}
				};
				let title = {
					text: '近'+vm.timerInterval+'分钟COP曲线图'
				};
				let xAxis = {
					type: 'datetime',
				
					tickPixelInterval: 80
				};
				let yAxis = {
					title: {
						text: 'COP值'						
					},
					max:15,
					plotLines: [{
						value: 0,
						width: 1,
						color: '#808080'
					}]
				};
				let credits={
						enabled: false
				};
				let tooltip = {
					formatter: function() {
						return '<b>' + this.series.name + '</b><br/>' +
							Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
							Highcharts.numberFormat(this.y, 2);
					}
				};
				let plotOptions = {
					area: {
						pointStart: 2017,
						marker: {
							enabled: false,
							symbol: 'circle',
							radius: 2,
							states: {
								hover: {
									enabled: true
								}
							}
						}
					}
				};
				let legend = {
					enabled: false
				};
				let exporting = {
					enabled: false
				};
				let series = [{
					name: 'COP值',
					data: (function() {
						// generate an array of random data												
						let data = [],
							i;
							
						if(CopDatasArr.Data.length==0){
							clearInterval(vm.myTimer);
							vm.myTimer='stop';
							return data;
						}
						for(i=0;i<CopDatasArr.Data.length;i++) {
							data.push({
								//x:(new Date(CopDatasArr.Data[i].Time)).getTime(),
								x:CopDatasArr.Data[i].Time,
								y:vm.CopDatasArr.Data[i].Cop
							});
						}
						console.log('CopDatasArr:',data)
						return data;
					}())
				}
				];

				let json = {};
				json.chart = chart;
				json.credits=credits;
				json.title = title;
				json.tooltip = tooltip;
				json.xAxis = xAxis;
				json.yAxis = yAxis;
				json.legend = legend;
				json.exporting = exporting;
				json.series = series;
				json.plotOptions = plotOptions;
				json.lang={
					// Custom language option              
					noData: "暂无数据"      
				}
				/* Custom options */
				json.noData={
					// Custom positioning/aligning options  
					position: {
						//align: 'right',  
						//verticalAlign: 'bottom'  
					},
					// Custom svg attributes  
					attr: {
//						'stroke-width': 2,  
//						stroke: '#cccccc'  
					},
					// Custom css  
					style: {
						fontWeight: 'bold',       
						fontSize: '15px',  
						color: '#202030'          
					}
				}
				Highcharts.setOptions({
					global: {
						useUTC: false
					}
				});
				$('#container').highcharts(json);
			},
			initHightTheme() {
				Highcharts.theme = {
					chart: {
						backgroundColor: {
							linearGradient: [0, 0, 500, 500],
							stops: [
								[0, 'rgb(255, 255, 255)'],
								[1, 'rgb(240, 240, 255)']
							]
						},
					}
				};
				// Apply the theme
				Highcharts.setOptions(Highcharts.theme);
			},
			getChartOptions(CurCop){
				let vm=this;
				return{
				tooltip: {
					formatter: "{a} <br/>{b} : {c}%"
				},
				toolbox: {
					feature: {
					}
				},
				series: [{
					name: 'COP值',
					
					type: 'gauge',
					max: 10,
					
					detail: {
						formatter: '{value}',
						borderColor: '#fff',
						shadowColor: '#fff', //默认透明
						offsetCenter: [0, '50%'], // x, y，单位px
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontSize:18,
							color: '#000'
						}
					},
					axisLine: { // 坐标轴线  
						lineStyle: { // 属性lineStyle控制线条样式  
							color: [
								[0.35, '#E74C3C'],
								[0.415, '#F1C40F'],
								[0.5, '#2ECC71'],
								[1, '#3498DB']
							],
							width: 12,
							shadowColor: '#000', //默认透明
							shadowBlur: 10
						}
					},
					axisTick: { // 坐标轴小标记
						length: 15, // 属性length控制线长
						lineStyle: { // 属性lineStyle控制线条样式
							color: 'auto',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					splitLine: { // 分隔线
						length: 16, // 属性length控制线长
						lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
							width: 3,	
							color: '#fff',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					pointer: { // 分隔线
					 	color:'auto'
					},
					title: {
						textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
							fontWeight: 'bolder',
							fontSize: 14,
							fontStyle: 'italic',
							color: '#000',
							shadowColor: '#fff', //默认透明
							shadowBlur: 10
						}
					},
					data: [{
						value: CurCop,
						name: '当前系统COP'
					}]

				}]
			};
			},
			updateSize(){
				let h=getWinSize('Height',216);
				this.fullScreenCss['el_mainContent']={
					width:`100%`,
					height:`${h}px`,
					overflow:`auto`
				}
			}

		},
		mounted() {	
			let vm=this;
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());
				vm.updateSize();
				$(window).resize(function() {
					vm.updateSize();
				})
		},
		destroyed() {
			clearInterval(this.myTimer);
			clearInterval(this.timers);
		}

	}
</script>
<style scoped="scoped">
	.card-box {
		min-height: 382px;
	}
	
	.t_wrap {
		border-bottom: 1px solid #ecf4f3;
		padding: 15px;
		padding-bottom: 0;
		background: #EEF6F6;
	}
	
	.t_info label {
		line-height: 34px;
		width: auto;
	}
	
	.t_info p {
		color: #000;
	}
	
	.code {
		margin-top: 5px;
	}
	
	.code span {
		margin-top: 5px;
		margin-right: 20px;
	}
	
	.code span button {
		padding: 4px;
	}
	
	.copValueDescriptions {
		position: absolute;
		right: 30px;
		top: 10px;
		color: #000;
		font-size: 14px;
		z-index: 20;
	}
	
	.copValueDescriptions ul {
		list-style: none;
		padding: 0;
	}
	
	.copValueDescriptions ul li {
		padding: 5px 10px 5px 50px;
	}
	
	.highcharts-yaxis-grid .highcharts-grid-line {
		display: none;
	}
	/*highcharts-data-labels*/
	
	div.highcharts-solidgauge-series.highcharts-data-labels.highcharts-series-0.highcharts-tracker {
		top: 96px!important;
		left: 50px!important;
	}
	
	div.highcharts-solidgauge-series.highcharts-data-labels.highcharts-series-0.highcharts-tracker span {
		/*max-width: initial!important;
		width: 200px;*/
	}
</style>
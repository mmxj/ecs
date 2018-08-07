<style scoped="scoped">
	.form-horizontal {
		border: none;
		background: none;
	}
	
	.form-horizontal:hover {
		border: none;
		border-width: 0!important;
		border-color: none;
		background: none;
		box-shadow: none;
	}
	
	.form-group {
		/*margin: 0 auto;*/
	}
	
	.selectWrap {
		max-width: 1000px;
		margin: 0 auto;
		margin-top: 30px;
		/*margin-top: 30px;*/
		/*margin-left: 59px;*/
	}
	/*重新开始*/
	
	
	.el-table {
		max-width: 1000px!important;
		margin: 0 auto;
	}
	
	.d {
		background: #eef6f6;
	}
</style>
<template>
	<!--新增工单开始-->
	<div id="divDataTableView" class="card-box m-page table-responsive bg-white">
		<common-header v-if="isLoadHeader" v-on:isCustomMethods="ReturnClick" :mustInfo="headerInfos"></common-header>
		
		<div class="form-horizontal content-box container-fluid" style="padding: 0!important;">

			<div class="selectWrap">

				<div class="row" style="">
					<div class="col-lg-12">

						<span class="OrgTopAliginTime" style="width: 180px;">
		                        <span title="开始时间" id="c_searchStartTime" class="input-group date form_time" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
		                            <input id="createStartDate"   class="form-control" size="16" type="text" value="" readonly placeholder="创建开始时间">
		                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								</span>
						</span>
						<span class="OrgTopAliginTime" style="width: 180px;">
		                        <span title="结束时间" id="c_searchEndTime" class="input-group date form_time" data-date="2017-01-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
		                            <input id="createEndDate"   class="form-control" size="16" type="text" value="" readonly placeholder="创建结束时间">
		                            <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
								</span>
						</span>
						<span class="OrgTopAligin">
	                        <button id="btnQuery" type="button" class="btn btn-default" v-on:click="getHistoryCopDatas()">
	                            <i class="fa fa-search m-r-5"></i>查找
	                        </button>
	                    </span>

					</div>
				</div>

			</div>
			<div class="form-horizontal content-box container-fluid">
				<el-table :showHeader="false" :data="tableData" border style="width:100%">
					<el-table-column :fixed="index=='time0'" v-for="(item,index) in HistoryCopDatas[0]" :prop="index" label="" width="150">
					</el-table-column>
					

				</el-table>
				<div id="mainWrap" style="width: 800px; height: 400px; margin: 0 auto; margin-top: 50px;">
					<div id="main_his" style="width: 100%;height:400px;margin: 0 auto;"></div>
				</div>
			</div>
		</div>

	</div>
	<!--新增工单结束-->
</template>

<script>
	import echarts from 'echarts'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				RelateEquipmentId: '',
				parentParams: '',
				EquipmentAlias: '',
				EquipmentPhoto: '',
				ProjectLogo: '',
				tableData: [{
					time0: '时间'					
				}, {
					time0: 'COP'					
				} ],				
				myChart: {},
				options:{},
				HistoryCopDatas:[],
				EndTime:"",
				StartTime:"",
				XlistDatas:[],
				YlistDatas:[],
				//头部参数
				defaultEqui_img:'../../../../../static/css/img/default_equi_bg.png',
				headerInfos:{},
				isLoadHeader:false
			}
		},
		props:['equipmentData'],
		mounted() {
			let vm = this;
			//查询时间——开始
			$('.form_date').datetimepicker({
					language: 'zh-CN',
					weekStart: 1,
					todayBtn: 1,
					autoclose: 1,
					todayHighlight: 1,
					startView: 2,
					minView: 2,
					forceParse: 0
				});
				$('.form_time').datetimepicker({
					format: 'yyyy/mm/dd hh:ii:ss',
					weekStart: 1,
					autoclose: true,
					forceParse: false,
					todayBtn: 1,
					todayHighlight: 1,
					language: 'zh-CN'
				});
			var now = new Date();	
			var startTime = new Date(now.getTime()-1000*60*60);
			vm.StartTime=eosCommon.getTime('yyyy/MM/dd hh:mm:ss',startTime,true);				
			vm.EndTime=eosCommon.getTime('yyyy/MM/dd hh:mm:ss',now,true);
			$('#createStartDate').val(vm.StartTime);
          	$('#createEndDate').val(vm.EndTime);
			$('#c_searchStartTime').datetimepicker('setEndDate', $("#createEndDate").val());
			$('#c_searchEndTime').datetimepicker('setStartDate', $("#createStartDate").val());
			$("#createStartDate").change(function() {
				$('#c_searchEndTime').datetimepicker('setStartDate', $(this).val());
			});
			$("#createEndDate").change(function() {
				$('#c_searchStartTime').datetimepicker('setEndDate', $(this).val());
			});	
			vm.parentParams = vm.equipmentData;
			vm.EquipmentAlias = vm.parentParams.EquipmentName;
			vm.EquipmentPhoto = vm.parentParams.EquipmentPhoto;
			vm.RelateEquipmentId = vm.parentParams.EquipmentId;
			vm.headerInfos={
				functionInfo:'COP值历史数据',
				thingName:vm.EquipmentAlias,
				thingPhoto:vm.EquipmentPhoto,
				errorImg:vm.defaultEqui_img,
				isCustomMethods:'cop',
				params:{isRenderCOP:true,
						copOperatorName:'historyData',
						copEquipmentData:this.equipmentData
					}
			}
			vm.isLoadHeader=true;
			vm.getHistoryCopDatas();		
		},
		watch: {
		},
		methods: {
			...mapMutations({
			      getRENDER_COP:'RENDER_COP' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
		    }),
			btnQuery(){				
			},
			getHistoryCopDatas() {				
					let vm = this;
					vm.HistoryCopDatas=[];
					vm.tableData=[{
						time0: '时间'					
					}, {
						time0: 'COP'					
					} ];
					let param = {
						"AccessToken": eosCommon.storage.get('AccessToken'),
						"TerminalEquipmentId": vm.RelateEquipmentId,//vm.EquipmentId						
						"StartTime" :$('#createStartDate').val(),
						"EndTime":$('#createEndDate').val()
					},
					url = eosCommon.ENTERPRISE_API + "Api/Equipment/GetEquipmentCopHistoryData";					
				eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {		
						for(let i=0;i<result.Data.length;i++){
							vm.XlistDatas.push(result.Data[i].Time);
							vm.YlistDatas.push(result.Data[i].Cop);
						}												
						vm.myChart = echarts.init(document.getElementById('main_his'));
						vm.options=vm.getChartOptions();
						vm.myChart.setOption(vm.options);
						for(let i=0;i<result.Data.length;i++){
							vm.tableData[0]['time'+(i+1)]=result.Data[i].Time;
							vm.tableData[1]['time'+(i+1)]=result.Data[i].Cop;
							
						}
						vm.$nextTick(function(){
							vm.HistoryCopDatas=vm.tableData;
						})												
					}
				});
			},
			getChartOptions(){
				let vm=this;	
				return{
					tooltip: {
					trigger: 'axis'
				},
				legend: {
					data: ['COP历史数据值']
				},
				toolbox: {
					show: true,
					feature: {
						mark: { show: true },
						dataZoom: { show: true },
						dataView: { show: true },
						magicType: { show: true, type: ['line', 'bar', ] },
						restore: { show: true },
						saveAsImage: { show: true }
					}
				},
				calculable: true,
				dataZoom: {
					show: true,
					realtime: true,
					start: 20,
					end: 80
				},
				xAxis: [{
					type: 'category',
					boundaryGap: false,
					data: vm.XlistDatas
				}],
				yAxis: [{
					type: 'value'
				}],
				series: [{
						name: 'COP历史数据值',
						type: 'line',
						 smooth:true,  
						data: vm.YlistDatas 
					}
				]
				}
			},
			ReturnClick(msg) {

			}
		}

	}
</script>
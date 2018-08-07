<style scoped="scoped">
	.equipmentInfo{
		text-align: center;
		margin-top: 15px;
	}
	.equipmentInfo img{
		width: 240px;
		height: 155px;
		margin: 0 auto;
	}
	.equipmentInfo img{
		text-align: center;
		margin: 0 auto;
	}
	.form-horizontal{
		border: none;
		background: none;
	}
	.form-horizontal:hover{
		border: none;
		border-width: 0!important;
		border-color: none;
		background: none;
		box-shadow: none;
	}
	.form-group{
		/*margin: 0 auto;*/
	}
	.selectWrap{

		max-width: 500px;
		margin: 0 auto;
		margin-top: 30px;
	}
	.caculate_tips{
		
		width: 800px;
		min-height: 100px;
		background: #fafafa;
		border: 1px solid #dfeceb;
		margin: 0 auto;
		margin-top: 15px;
		margin-bottom: 40px;
	}
	.caculate_tips h4{
		
		color: #000;
		font-weight: bolder;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.caculate_tips h4,.caculate_tips p{
		text-align: center;
		font-size: 16px;
	}
	.caculate_tips p.tips span{
		padding-right: 15px;
	}
	.content-title-left{
		width: 170px;
	}
	p.unit{
		position: absolute;
		right: -78px;
		top: 40px;
		color: #000;
	}
	.FreezeFlowRateAddress{
		position: static;
		
	}
	 div.multiplying{
		position: absolute;
		right: -59px;
		top: 32px;
		color: #000;
	}
	.electricCurren{
		position: absolute;
		width: 135px;
		right: -30px;
		top: 0px;
		color: #000;
	}

</style>
<template>
	<div id="divDataTableView" class="card-box table-responsive bg-white">
		<common-header v-if="isLoadHeader" :mustInfo="headerInfos"></common-header>
		<div class="form-horizontal content-box container-fluid">
			<div class="caculate_tips">
				<h4>COP=制冷效率/耗电功率</h4>
				<p>制冷效率=C x Q x <span>△</span>T</p>
				<p class="tips" style="padding: 5px 0;"><span>1.C= 4.2×103 J/kg℃</span><span>  2.Q:冷冻水流速(m³/小时) </span><span>3.ΔT= T冷冻水进水温度-T冷冻水出水温度</span></p>
			</div>
			<div class="selectWrap">
				
               
                
                <div class="form-group">
						<label class="content-title-left">冷冻水进(回)水温数据地址:</label>
	                    <div class="col-lg-6 col-xs-9">
							<select data-live-search="true" id="select_03" v-model="settingInfo.FreezeInTemperatureAddress"   class="form-control selectpicker" data-size="8" data-style="btn-white">
								<option  value="">选择数据地址</option>	
								<option v-for="item in equipmentProtocalArr" :value="item.ProtocalAddress">{{item.Name}}</option>
								
							</select>
						</div>
                    
                </div>
                <div class="form-group">
                    <label class="content-title-left">冷冻水出(供)水温数据地址:</label>
                    <div class="col-lg-6 col-xs-9">
						<select data-live-search="true" id="select_02" v-model="settingInfo.FreezeOutTemperatureAddress"   class="form-control selectpicker" data-size="8" data-style="btn-white">
							<option  value="">选择数据地址</option>
							<option v-for="item in equipmentProtocalArr" :value="item.ProtocalAddress">{{item.Name}}</option>
							
						</select>
					</div>
                </div>
               <div class="form-group">
						<label class="content-title-left">冷冻水流速数据地址:</label>																											    							
						<div style="position: relative;"  class="col-lg-6 col-md-5 col-xs-8">
							<label style="width: 80px;color: #000; text-align: left;" class="content-title-left">
					      		<input  id="checkbox" v-model="l_isChecked" type="checkbox"> 固定值
					   		 </label>
							<span class="valid-form-group">
                                <label class="focus valid"></label>
                            </span>
							<input v-show="l_isChecked" v-model="settingInfo.FreezeFlowRateDefault" type="text" maxlength="25" class="form-control" />
							<p v-show="l_isChecked" class="unit ">(立方米/小时)</p>
							
							<div class="FreezeFlowRateAddress" v-show="!l_isChecked"  >
								<select  data-live-search="true" id="select_01" v-model="settingInfo.FreezeFlowRateAddress"   class="form-control selectpicker" data-size="8"  data-style="btn-white">
									<option  value="">选择数据地址</option>
									<option v-for="item in equipmentProtocalArr" :value="item.ProtocalAddress">{{item.Name}}</option>
								</select>
								<div class="multiplying">
									<span style="font-size: 16px;">×</span>
									<input style="width:50px;" v-model="settingInfo.FreezeFlowRateCoefficient" type="text" class="form-control" id="bit1_0" value="" placeholder="">
								</div>
							</div>
						</div>               
                </div>
                <div class="form-group">
                    <label class="content-title-left">主电表功率数据地址:</label>
                    <div  class="col-lg-6 col-md-5 col-xs-8">
								<div style="width: 380px; margin: 0;" class="">
									<div class="radio radio-custom radio-inline">
										<input v-model="settingInfo.PowerType" type="radio" name="Modbus" @change="modbusChange()" id="addressRadio" value="1" checked>
										<label for="addressRadio">
                                            地址取值
                                        </label>
									</div>
									<div class="radio radio-custom radio-inline">
										<input v-model="settingInfo.PowerType" @change="modbusChange()" type="radio" name="Modbus" id="powerRadio" value="2">
										<label for="powerRadio">
                                            额定功率乘电流百分比
                                        </label>
									</div>
									<div class="radio radio-custom radio-inline">
										<input v-model="settingInfo.PowerType" @change="modbusChange()" type="radio" name="Modbus" id="electricCurrentRadio" value="3">
										<label for="electricCurrentRadio">
                                    		电流乘电压
                                        </label>
									</div>
								</div>							
							<div style="margin-top: 15px;" v-show="settingInfo.PowerType==1" class="" >
								<select data-live-search="true" id="PowerMeterAddress" v-model="settingInfo.PowerMeterAddress"   class="form-control selectpicker" data-size="8" data-style="btn-white">
									<option  value="">选择数据地址</option>	
										<option v-for="item in equipmentProtocalArr" :value="item.ProtocalAddress">{{item.Name}}</option>									
								</select>
							</div>
							 <div style="margin-top: 15px;position: relative;" v-show="settingInfo.PowerType==2" class="">
					   		 	<div class="">
					   		 		<span class="valid-form-group">
	                                <label class="focus valid"></label>
		                            </span>
									<input style="width: 80px;" v-model="settingInfo.PowerMeterRateDefault" type="text" maxlength="25" class="form-control" />
									<p style="right: 110px; top: 6px;" class="unit ">(KW)<span style="font-size: 16px;">×</span></p>
									<div class="electricCurren">
										<select data-live-search="true" id="currRateSelect" v-model="settingInfo.PowerMeterAddress"   class="form-control selectpicker" data-size="8" data-style="btn-white">									
											<option value="">请选择电流百分比</option>
											<option v-for="item in equipmentProtocalArr" :value="item.ProtocalAddress">{{item.Name}}</option>								
										</select>
										<div style="right: -106px; top: 0px;width: 100px;" class="multiplying">
											<span style="font-size: 16px;">×</span>
											<input style="width:50px;" v-model="settingInfo.PowerCoefficient" type="text" class="form-control" id="bit1_0" value="" placeholder="">
										</div>
									</div>																
					   		 </div>					   		 	
					   		 </div>
					   		 <div style="margin-top: 15px;position: relative;" v-show="settingInfo.PowerType==3" class="">
					   		 	<div class="">
					   		 		<div class="" style="width:125px!important;">
					   		 			<select  data-live-search="true" id="currAddressSelect" v-model="settingInfo.PowerMeterAddress"   class="form-control selectpicker" data-size="8" data-style="btn-white">
									
											<option value="">请选择电流地址</option>
											<option v-for="item in equipmentProtocalArr" :value="item.ProtocalAddress">{{item.Name}}</option>									
										</select>
										<p style="right: 65px; top: 6px;" class="unit ">(KW)<span style="font-size: 16px;">×</span></p>
					   		 		</div>					   		 											
									<div class="electricCurren" style="right: -75px;">
										<select data-live-search="true" id="Voltage" v-model="settingInfo.Voltage"   class="form-control selectpicker" data-size="8" data-style="btn-white">
									
											<option value="">请选择电压地址</option>
											<option value="1000">1000</option>
											<option value="380">380</option>									
										</select>
										<div style="right: -106px; top: 4px;width: 100px;" class="multiplying">
											<span style="font-size: 16px;">(V)</span>											
										</div>
									</div>									
					   		 	</div>
					   		 	
					   		 </div>							
						</div>                  
                </div>
                <div class="form-group" style="margin-top: 50px;">
					<label class="content-title-left"></label>
					<div class="col-lg-6 col-xs-9">
						<button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="ReturnClick">取消</button>
						<button id="btnAddEdit" type="submit" class="btn btn-default pull-left" data-dismiss="modal" data="1" v-on:click="setEquipmentCopConfig()">确定</button>
					</div>
				</div>
			</div>
			
		</div>
		
	</div>
</template>

<script>
	import commonFn from '../../../assets/js/common/commonFunc'
	import {mapMutations} from 'vuex'
	export default {
		data() {
			return {
				RelateEquipmentId:'',
				equipmentCopConfigArr:[],
				equipmentProtocalArr:[],
				settingInfo:{
				  FreezeFlowRateAddress:"",
			      FreezeOutTemperatureAddress:"",
			      FreezeInTemperatureAddress:"",
			      PowerMeterAddress:"",
			      FreezeFlowRateDefault:'',
			      PowerMeterRateDefault:'',				      
			      FreezeFlowRateCoefficient:'1',
			      PowerType:'1',
			      PowerCoefficient:'',
			      Voltage:''					
				},
				l_isChecked:false,
				z_isChecked:false,
				parentParams:'',
				EquipmentAlias:'',
				EquipmentPhoto:'',
				settedPowerTypeData_1:{},
				settedPowerTypeData_2:{},
				settedPowerTypeData_3:{},
				tempPowerType:'',
				defaultEqui_img:'../../../../../static/css/img/default_equi_bg.png',
				headerInfos:{},
				isLoadHeader:false
			}
		},
		props:['equipmentData'],
		computed:{			
		},
		mounted() {
			let vm=this;			
			vm.parentParams=vm.equipmentData;
			vm.EquipmentAlias=vm.parentParams.EquipmentName;
			vm.EquipmentPhoto=vm.parentParams.EquipmentPhoto;
			vm.RelateEquipmentId=vm.parentParams.EquipmentId;
			if(!vm.RelateEquipmentId){
				return;
			}
			vm.headerInfos={
				functionInfo:'COP值设置',
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
			vm.getEquipmentProtocal();
			vm.getEquipmentCopConfig();
		},
		watch:{
			
			l_isChecked(val){
				let vm=this;
				if(val){
					vm.settingInfo.FreezeFlowRateAddress='';
					vm.$nextTick(()=>{							
						$("#select_01").selectpicker('refresh');											
					});					
				}else{
					vm.settingInfo.FreezeFlowRateDefault='';					
				}
			},
			z_isChecked(val){
				let vm=this;
				if(val){
					vm.settingInfo.PowerMeterAddress='';
					vm.$nextTick(()=>{							
						$("#select_04").selectpicker('refresh');												
					});
				}else{
					vm.settingInfo.PowerMeterRateDefault='';										
				}
			}
		},
		methods: {
			...mapMutations({
			      getRENDER_COP:'RENDER_COP'
		    }),
			customLazy(src,errorImg){			
				return commonFn.customLazy(src,errorImg)
			},
			modbusChange(){
				let vm=this;				
				if(vm.settingInfo.PowerType==vm.tempPowerType){
					for(let i=1;i<4;i++){
						if(("settedPowerTypeData_"+vm.settingInfo.PowerType)==`settedPowerTypeData_${i}`){
								if(i==1){
									vm.settingInfo.PowerMeterAddress=vm.settedPowerTypeData_1.PowerMeterAddress
								}else if(i==2){
									vm.settingInfo.PowerMeterAddress=vm.settedPowerTypeData_2.PowerMeterAddress
									vm.settingInfo.PowerMeterRateDefault=vm.settedPowerTypeData_2.PowerMeterRateDefault
									vm.settingInfo.PowerCoefficient=vm.settedPowerTypeData_2.PowerCoefficient
								}else{
									vm.settingInfo.PowerMeterAddress=vm.settedPowerTypeData_3.PowerMeterAddress
									vm.settingInfo.Voltage=vm.settedPowerTypeData_3["Voltage"]			
								}
						}
					}					 					
				}else{					
					vm.settingInfo.PowerMeterAddress='';
					vm.settingInfo.PowerMeterRateDefault='';
					vm.settingInfo.PowerCoefficient='';																
					vm.settingInfo.Voltage='';											
				}
				vm.$nextTick(function(){							
					$('#PowerMeterAddress').selectpicker('refresh');							
					$('#currRateSelect').selectpicker('refresh');
					$('#currAddressSelect').selectpicker('refresh');
					$('#Voltage').selectpicker('refresh');
				});
			},
			setEquipmentCopConfig(){				
				let vm=this;
			if(!vm.settingInfo.FreezeFlowRateAddress && !vm.settingInfo.FreezeFlowRateDefault) {
					
					vdialog({
						type: 'confirm',
						title: '提示',
						content: '请选择要参与计算的数据地址',
						ok: function() {},
						cancel: true,
						modal: true
					});
					return false;
				}
		if(!vm.settingInfo.PowerMeterAddress && !vm.settingInfo.PowerMeterRateDefault) {					
					vdialog({
						type: 'confirm',
						title: '提示',
						content: '请选择要参与计算的数据地址',
						ok: function() {},
						cancel: true,
						modal: true
					});
					return false;
				}
				if(
				vm.settingInfo.FreezeOutTemperatureAddress==''||
				vm.settingInfo.FreezeInTemperatureAddress==''
				) {
					vdialog({
						type: 'confirm',
						title: '提示',
						content: '请选择要参与计算的数据地址',
						ok: function() {},
						cancel: true,
						modal: true
					});
					return false;
				}
				let param={
					"AccessToken":eosCommon.storage.get('AccessToken'),
					"Parameters": {
					    	"IsBaseEquipment":0, //--是否设备库设备
					        "RelateEquipmentId": vm.RelateEquipmentId,// --设备相关ID 
					        "FreezeFlowRateAddress":vm.settingInfo.FreezeFlowRateAddress, //-- 冷冻水流速数据地址
					        "FreezeOutTemperatureAddress":vm.settingInfo.FreezeOutTemperatureAddress,//--冷冻水出水温度数据地址
					        "FreezeInTemperatureAddress":vm.settingInfo.FreezeInTemperatureAddress,//--冷冻水进水温度数据地址
					        "PowerMeterAddress":vm.settingInfo.PowerMeterAddress, //–主机电表功率数据地址
					        "FreezeFlowRateDefault":vm.settingInfo.FreezeFlowRateDefault,
					        "PowerMeterRateDefault":vm.settingInfo.PowerMeterRateDefault,
					        "FreezeFlowRateCoefficient":vm.settingInfo.FreezeFlowRateCoefficient,// --冷冻水流速系数
					        "PowerType":vm.settingInfo.PowerType, // --功率算法类型 1固定地址，2额定功率，3电流
					        "PowerCoefficient":vm.settingInfo.PowerCoefficient, //-- 额定功率系数
					        "Voltage":vm.settingInfo.Voltage //-- 电流					        
					   }
				},
				url = eosCommon.ENTERPRISE_API + "Api/Equipment/SetEquipmentCopConfig";
				eosCommon.eosAjax(url, 'POST', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.ReturnClick();
					}
				});
			},
			getEquipmentCopConfig(){
				let vm=this,
				param={
					"AccessToken":eosCommon.storage.get('AccessToken'),
					"RelateEquipmentId":vm.RelateEquipmentId
				},
				url = eosCommon.ENTERPRISE_API + "Api/Equipment/GetEquipmentCopConfig";
				eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						if(result.Data.length!=0){
							if(!result.Data[0].FreezeFlowRateAddress){
								vm.settingInfo.FreezeFlowRateDefault=result.Data[0].FreezeFlowRateDefault;
								vm.l_isChecked=true;
							}else{
								vm.settingInfo.FreezeFlowRateAddress=result.Data[0].FreezeFlowRateAddress;
								vm.l_isChecked=false;
							}
							  vm.settingInfo.FreezeOutTemperatureAddress=result.Data[0].FreezeOutTemperatureAddress;
						      vm.settingInfo.FreezeInTemperatureAddress=result.Data[0].FreezeInTemperatureAddress;
						      vm.settingInfo.FreezeFlowRateCoefficient=result.Data[0].FreezeFlowRateCoefficient;// --冷冻水流速系数
						       vm.settingInfo.PowerType=result.Data[0].PowerType;// --功率算法类型 1固定地址，2额定功率，3电流
						       vm.tempPowerType=result.Data[0].PowerType;
								if(vm.settingInfo.PowerType==1){
									vm.settedPowerTypeData_1.PowerMeterAddress=result.Data[0].PowerMeterAddress;
								}else if(vm.settingInfo.PowerType==2){
									vm.settedPowerTypeData_2.PowerMeterAddress=result.Data[0].PowerMeterAddress;
									vm.settedPowerTypeData_2.PowerMeterRateDefault=result.Data[0].PowerMeterRateDefault;
									vm.settedPowerTypeData_2.PowerCoefficient=result.Data[0].PowerCoefficient;
									
								}else{
								 	vm.settedPowerTypeData_3.PowerMeterAddress=result.Data[0].PowerMeterAddress;
									vm.settedPowerTypeData_3["Voltage"]=result.Data[0]['Voltage'];									
								} 
								vm.settingInfo.PowerMeterRateDefault=result.Data[0].PowerMeterRateDefault;														
						      	vm.settingInfo.PowerMeterAddress=result.Data[0].PowerMeterAddress;																																				    						      						       						       						       
						       	vm.settingInfo.PowerCoefficient=result.Data[0].PowerCoefficient; //-- 额定功率系数
						        vm.settingInfo.Voltage=result.Data[0].Voltage; //-- 电流

						}else{							
							//暂无配置数据
						}
				      vm.$nextTick(function(){
							for(var i=1;i<=4;i++){
								$(`#select_0${i}`).selectpicker('refresh');
							}
							$('#PowerMeterAddress').selectpicker('refresh');							
							$('#currRateSelect').selectpicker('refresh');
							$('#currAddressSelect').selectpicker('refresh');
							$('#Voltage').selectpicker('refresh');
						});
					}
				});
			},
			getEquipmentProtocal(){
				let vm=this,
				param={
					"AccessToken":eosCommon.storage.get('AccessToken'),
					"TerminalEquipmentId":vm.RelateEquipmentId
				},
				url = eosCommon.ENTERPRISE_API + "Api/Equipment/GetEquipmentProtocal";
				eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.equipmentProtocalArr=result.Data;						
						vm.$nextTick(()=>{
							for(var i=1;i<=4;i++){
								$(`#select_0${i}`).selectpicker('refresh');
							}
							$('#PowerMeterAddress').selectpicker('refresh');							
							$('#currRateSelect').selectpicker('refresh');
							$('#currAddressSelect').selectpicker('refresh');
							$('#Voltage').selectpicker('refresh');
						});
					}
				});
			},
			ReturnClick(){
				this.getRENDER_COP(
					{isRenderCOP:true,
						copOperatorName:'setting',
						copEquipmentData:this.equipmentData
					});
			}
		}
		
	}
</script>


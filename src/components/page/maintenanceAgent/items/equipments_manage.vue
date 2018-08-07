<template>
	<div id="item-index" >
			<div id="equipment-list" >
        <div class="row" >
            <div style="display: block; " class="col-md-12">
                <div  class="card-box table-responsive m-page">
                    <div class="row">
                        <div class="col-sm-6 col-md-4 col-lg-2">
                            <span class="size20 font-bold">我的设备</span>
                        </div>
                    </div>
                    <hr class="divider mt-10 mb-5">
                    <div class="row no-space-row bg-white" style="margin: 0;">
                        <div class="col-xs-12 pull-left" style="margin: 0;padding: 0;">
                        	
                           <div class="OperatorSearch">
                           		<span class="OrgTopAligin" style="width: 120px;">
	                                <select data-live-search="true" id="projectLists" @change="getData()" v-model="ProjectId" class="form-control selectpicker" data-style="btn-white">
	                                    <option value="">项目名称</option>
	                                    <option v-for="item in Projects" :value="item.ProjectId">{{item.ProjectName}}</option>
	                                    
	                                </select>
	                            </span>
	                   		 	<span class="OrgTopAligin" style="width: 120px;">
	                                <select id="OnlineStatus" @change="getData()" v-model="OnlineStatus" class="form-control selectpicker" data-style="btn-white">
	                                    <option value="-1">在线状态</option>
	                                    <option value="0">离线</option>
	                                    <option value="1">在线</option>
	                                </select>
	                            </span>
                            <span class="OrgTopAligin" style="width: 120px;">
                                <select id="RunStatus" @change="getData()" v-model="RunStatus" class="form-control selectpicker" data-style="btn-white">
                                    <option value="-1">运行状态</option>
                                    <option value="0">不详</option>
                                    <option value="1">开机</option>
                                    <option value="2">停机</option>
                                    <option value="3">值机</option>
                                    <option value="4">故障</option>
                                </select>
                            </span>
                            <span class="OrgTopAligin" style="width: 120px;">
                                <select id="AlarmStatus" @change="getData()" v-model="AlarmStatus" class="form-control selectpicker" data-style="btn-white">
                                    <option value="-1">报警状态</option>                                  
                                    <option value="1">提醒</option>
                                    <option value="2">警告</option>
                                    <option value="3">报警(严重)</option>
                                </select>
                            </span>
                            <span class="OrgTopAligin">
                                <input style="border: 1px solid #dedede;" class="form-control w-128" placeholder="设备名称" type="text" v-model='Keywords'/>
                            </span>
                            <span class="OrgTopAligin ">
                                <button @click="getData()" type="button" class="btn btn-default waves-effect waves-light">
                                    <i class="fa fa-search m-r-5"></i>查找
                                </button>
                            </span>
                           </div>
                           
                            <div id="itemList" class="item-data">
							            
				            <div class="col-sm-12 col-md-10 col-lg-9 bg-white">
				                
				                <div class="order-card-box  pb-20">                  
				                
				                        <div class="tab-content" id="equipmentList" >
				                            	
							                    
				                            <div id="equip_lists" >
				                            	<!--<div class="dataTables_wrapper no-footer" v-show="noData">
							                        <div id="example1_processing" class="dataTables_processing">数据加载中...</div>
							                    </div>-->
							                    <loading v-show="noData"></loading>
							                    
				                            	<div class="text-center" style="margin-top: 100px;" v-show="emptyData">
			                                        <div class="text-error"><img class="mt-lg mb-lg" src="../../../../../static/images/box.png"></div>
			                                        <h3 style="margin-top: 30px;">您还没有创建任何一个设备哦！</h3><br>
			                                        
			                                    </div>
		                            		<div v-show="!noData || !emptyData" @click="getCurrentEqInfo(index,item.EquipmentId,item.EquipmentAlias)"   :class="{equipment_active:index==currIndex}" class="table-box border-1 p-10"  v-for="(item,index) in Equipments">
					                               
					                               <div class="col-xs-4 col-lg-6 table-detail" >
					                                    <a>
					                                        <div class="member-info">
					                                            <router-link :to="{name:'equipment_detail', params:{EquipmentId: item.EquipmentId}}">
					                                                <img @click="intoEquipmentList(item.IsExperienceEquipment)" style="border-radius: 5px;" v-lazy="item.EquipmentPhoto" class="m-r-15" >
					                                            </router-link>
					                                            <div class="div-ver clearfix">
					                                                <div class="getway-sub-title text-20">
					                                                    <router-link :to="{name:'equipment_detail', params:{EquipmentId: item.EquipmentId}}">
					                                                        <b @click="intoEquipmentList(item.IsExperienceEquipment)" class="text-dark" style="color: #000; font-size: 17px;">{{item.EquipmentAlias}}</b>
					                                                    </router-link>
					                                                </div>
					                                                <div class="getway-sub-title project_infos">
					                                                    	<p>
					                                                    		<b class="fa  fa-street-view text-grey" ></b>
					                                                        	<span class="names" v-if="EntitySort==1">运行时长：</span>
					                                                        	
					                                                        	<span class="text-cog">{{item.RunTime|formateSeconds}}</span>
					                                                        </p>
					                                                        <p>
					                                                    		<b class="fa  fa-user-secret text-grey"></b>
					                                                        			                                                   		
					                                                        	<span class="names" v-if="EntitySort==0">所属项目：</span>		                                                   		
					                                                        	<span class="text-cog">{{ item.ProjectName }}</span>
					                                                        </p>
					                                                    					                                                    	
					                                                        <div class="clearfix">				                                                        	
					                                                        </div>				                                                    
					                                                </div>
					                                            </div>
					                                        </div>
					                                    </a>
					                                </div>
					                               
					                                <span class="col-xs-1 table-detail pt20">
		                                                <p><span>在线状态</span></p>
														<label v-if="item.IsOnline == 1">
		                                                    <a class="btn eos-btn-info btn-sm alarmLevel" style="padding: 0;">　在线　</a>
		                                                </label>
		                                                <label v-if="item.IsOnline == 0">
		                                                    <a class="btn eos-btn-gray btn-sm alarmLevel" style="padding: 0;">　离线　</a>
		                                                </label>
																
													</span>
													<span class="col-xs-1 table-detail pt20">
		                                                <p><span>运行状态</span></p>
														<label >
	                                                        <a class="btn btn-sm alarmLevel" :class="[item.IsOnline == 0 ? nolineClass : onlineClass]"> {{ item.RunState }}</a>
		                                                    
		                                                </label>
																
													</span>
													<span class="col-xs-1 table-detail pt20">
		                                                <p><span>报警状态</span></p>
														<label v-if="item.AlarmLevel == 0">
					                                            <a class="alarmLevel btn eos-btn-info btn-sm" >正常</a>											
	
	                                                        </label>
														<label v-if="item.AlarmLevel == 1">
	
					                                            <a  style="background: #3498db!important;" class="alarmLevel btn eos-btn-warning btn-sm">提醒</a>
	                                                            
	                                                        </label>
														<label v-else-if="item.AlarmLevel == 2">
					                                            <a  class="alarmLevel btn eos-btn-abnormal btn-sm">告警</a>
																
	
	                                                        </label>
														<label v-else-if="item.AlarmLevel == 3">
					                                            <a  class="alarmLevel btn eos-btn-danger btn-sm">报警</a>
	
	                                                        </label>
																
													</span>
					                                <div class="col-xs-2 table-detail pt20 table-actions-bar pull-right">
					                                    <div class="contact-action pl-subtitle">
	                                                        <label id="Publish" @click="delayPublish(item,5000)" style="padding-top: 20px; color: #3498DB;" class="text-cog" title="发布协议地址"><i class="fa fa-cloud-upload m-rigth font-size-text"></i></label>
	                                            			<label @click="historyData(item)"  class="text-pencil" style="padding-top: 20px; " title="设备数据"><i class="fa fa-map m-rigth font-size-text" style="color:#1abc9c;font-size: 16px; cursor:pointer"></i></label>				                                        				                                        
					                                    	
					                                         <label v-if="isShowOprate(item.IsExperienceEquipment)" @click="editEquipment(item)" class="text-pencil" style="padding-top: 20px;" title="编辑设备"><i class="fa fa-pencil m-rigth font-size-text"></i></label>
					                                         
	                                                        <label  v-if="isShowOprate(item.IsExperienceEquipment)" @click="delEquipment(item)" class="text-trash-o" style="padding-top: 20px;" title="删除设备"><i class="fa fa-trash-o m-rigth font-size-text"></i></label>
	
	
					                                    </div>
					                                </div>
					                               	
					                            </div>
					                            <div class="dataTables_wrapper col-md-12" v-if="page_num > 0">
			                                        <div class="dataTables_info" role="status" aria-live="polite">当前显示 {{begin_row}} 到 {{end_row}} 条记录 共 {{total}} 条记录</div>
			                                        <div class="dataTables_paginate paging_full_numbers">
			                                            <a class="paginate_button previous" v-bind:class="page_record == 1 ? 'disabled' : ''" v-on:click="up_page">上一页</a>
			                                            <span>
			                                                <template v-if="(page_num > 0 && page_num <= 7)">
			                                                    <a class="paginate_button " v-on:click="on_page(num)" v-for="num in page_num" v-bind:class="num == page_index ? 'current' : ''">{{num}}</a>
			                                                </template>
			                                                <template v-else>
			                                                    <a class="paginate_button " v-on:click="on_page(1)" v-bind:class="page_record == 1 ? 'current' : ''">1</a>
			                                                    <span class="ellipsis" v-if="page_record-3 > 2">…</span>
			                                                    <a class="paginate_button" v-on:click="on_page(one_page)" v-bind:class="page_record == one_page ? 'current' : ''">{{one_page}}</a>
			                                                    <a class="paginate_button" v-on:click="on_page(two_page)" v-bind:class="page_record == two_page ? 'current' : ''">{{two_page}}</a>
			                                                    <a class="paginate_button" v-on:click="on_page(three_page)" v-bind:class="page_record == three_page ? 'current' : ''">{{three_page}}</a>
			                                                    <a class="paginate_button" v-on:click="on_page(four_page)" v-bind:class="page_record == four_page ? 'current' : ''">{{four_page}}</a>
			                                                    <a class="paginate_button" v-on:click="on_page(five_page)" v-bind:class="page_record == five_page ? 'current' : ''">{{five_page}}</a>
			                                                    <span class="ellipsis" v-if="page_record+3 <= page_num">…</span>
			                                                    <a class="paginate_button " v-on:click="on_page(page_num)" v-bind:class="page_record == page_num ? 'current' : ''">{{page_num}}</a>
			                                                </template>
			                                            </span>
			                                            <a class="paginate_button next" v-bind:class="page_record == page_num ? 'disabled' : ''" v-on:click="dow_page">下一页</a>
			                                        </div>
			                                    </div>
				                            </div>				                         
				                            <!--分页开始-->				                           
                        				<!--分页功能结束-->
				                        </div>				                        				                    
				                </div>
				            </div>				            				            				            
				            <div id="rightAddItemList"class="col-sm-12 col-md-2 col-lg-3 bg-white b-l-1">
				                <div class="panel-group" style="padding: 24px; padding-bottom: 0;padding-top: 0;">
				                    <div class="panel-heading">
				                        <h2 class="panel-title">
				                           	 {{equipmentName}}<span class="eos-stat-icon bg-info"><i class="fa fa-home text-white"></i></span>
				                        </h2>
				                    </div>
				                    <hr class="divider">
					                    <div id="right_equip_details">
								                    	<div class="form-group row" style="margin: 15px auto;">
														
														<div class="col-xs-12">
															<select id="addProWbSelect" @change="changeGroup(groupId)" v-model='groupId' class="form-control selectpicker" data-style="btn-white" data-size="8">
																<option value="" >选择分组</option>																																							
																<option :value="item.groupId" v-for="(item,index) in equipmentDetails">{{item.GroupName}}</option>																							
															</select>
														</div>
													</div>
													<div class="form-group row ">
														<div class="col-xs-12" style="margin-left:0 auto;">
															<label class="content-title-left" style="width: auto; color: #000000; font-weight: bold;">数据时间:</label>
							                                <div class="col-lg-8 col-md-8 col-sm-8 text-left">
							                                	 <p style="color: #000000; font-weight: bold;" class="form-control-static">{{UpdatedOn}}</p>
							                                </div>
							                                
														</div>
						                                
						                            </div>
							                    <hr class="divider">
						                            
							                    <ul class="list-unstyled" >
							                    	<li v-show="!noDetailData" style="margin-left: 30px; margin-top: 15px;width: 300px;" v-if="groupId==item.groupId" class="text-center row form-group" v-for="(item,index) in equipmentDetails">
															<div class="" style="width: 300px;margin: 0;" v-for="data in item.Details">
																<label class="content-title-left" style="width: auto; color: #8492a6;">{{data.DisplayName}}:</label>
								                                <div class="col-lg-3 col-md-3 col-sm-3 text-left">
								                                	 <p style="color: #535e6a; " class="form-control-static">{{data.DataValue}}</p>
								                                </div>	
								                                <div class="clearfix">
																
																</div>
															</div>
															
												  	</li>
												  	<div class="noDataBg" v-show="DetailDataEmpty">
												  		<img class="img-responsive" src="../../../../../static/css/images/noEquipDetialBg.png"/>
												  		<h3>暂无数据</h3>
												  	</div>
												</ul>
												<div class="dataTables_wrapper no-footer" v-show="noDetailData">
							                        <div id="example1_processing" class="dataTables_processing">数据加载中...</div>
							                    </div>
					                    </div>
				                 
				                    
				                </div>
				            </div>
				        </div>

				                         
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
	</div>
	
</template>

<script>
	import commonFn from '../../../../assets/js/common/commonFunc'
    let projectContr=commonFn.projectContr;
	export default {
        data: function() {
            return {
              Keywords:'',
              OnlineStatus:-1,
              AlarmStatus:-1,
              RunStatus:-1,
              ProjectId:'',
              Equipments:[],
              Projects:[],
              onlineClass: 'eos-btn-info',
			nolineClass: 'eos-btn-gray',
			EntitySort:'',
			currIndex:'',
			noData:true,
			emptyData:false,
			page_size: 4, //页大小
            page_index: 1, //页索引
            begin_row: 0, //开始条数
            end_row: 0, //结束条数
            total: 0, //总的数据条数
            page_num: 0, //多少页
            page_record: 1, //当前页码
            last:0,
            equipmentName:'',
            equipmentDetails:[],
            UpdatedOn:'',
            groupId:0,
            equipmentId:'',
            type:0,
            noDetailData:false,
            DetailDataEmpty:false,
            isAdmin:0 ,
            isProjectAdmin:0,
            timer:0
            }
        },
        computed: {
            one_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 2 : this.page_num - 5) : 2);
            },
            two_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 1 : this.page_num - 4) : 3);
            },
            three_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index : this.page_num - 3) : 4);
            },
            four_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 1 : this.page_num - 2) : 5);
            },
            five_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 2 : this.page_num - 1) : 6);
            },
            showAddParams(){
				return [this.isAdmin,this.isProjectAdmin]
			}
			
        },
        watch: {
            page_index: function(val) {
            	this.noData=true;
                this.getData();
            }
        },
        filters:{
			formateSeconds:function(seconds){
				return eosCommon.formatSeconds(seconds);
			}
		},
        mounted:function(){
        	var _this=this;
        	$('#addProWbSelect').selectpicker('refresh');
        	_this.EntitySort=eosCommon.storage.get('EntitySort');
        	_this.isAdmin=eosCommon.storage.get('IsAdmin');
    		_this.isProjectAdmin=eosCommon.storage.get('IsProjectAdmin');
      		_this.type=_this.$route.params.type;
      		$(".list-unstyled").css('max-height', '545px').niceScroll();
			$(".list-unstyled").getNiceScroll().resize();
      		if(_this.type==0){
      			_this.OnlineStatus=-1;
      			_this.AlarmStatus=-1;
      			_this.RunStatus-1;
      		}else if(_this.type==1){
      			_this.RunStatus=1;
      		}else if(_this.type==2){
      			_this.RunStatus=2;
      		}else if(_this.type==3){
      			_this.AlarmStatus=3;
      		}
        	_this.getData();
        	_this.getProjectList();
        	_this.initSelect();
        	_this.timer=setInterval(()=>{
				_this.getCurrentEqInfo(_this.currIndex, _this.equipmentId, _this.equipmentName);
			},10000);
        },
        destroyed: function () {
        	 clearInterval(this.timer);
        },
        methods: {
        	intoEquipmentList(IsExperienceEquipment){
        		eosCommon.storage.set('IsExperienceProject',IsExperienceEquipment);
//      		console.log("setIsExperienceProject:",eosCommon.storage.get('IsExperienceProject'))
        	},
        	isShowOprate(IsExperienceEquipment){
				return projectContr.equipmentAdd(...this.showAddParams,IsExperienceEquipment);				
			},
        	getData:function(){
        		
        		var _this=this;
        		_this.noData=true;
				var param = {
				    "AccessToken":eosCommon.storage.get("AccessToken"),
				     "PageIndex":_this.page_index,
				    "PageSize":_this.page_size,
				    "IsDefaultEquipment":1,// -- 是否只获取第一台设备的数据
				    "Parameters": {
				         "ProjectId":_this.ProjectId,//--项目Id
				         	"GatewayId":'', //-- 网关id, 可传空
					        "Keywords":_this.Keywords, //-- 搜索关键字, 可传空
					        "OnlineStatus": _this.OnlineStatus,// -- 网关在线状态: -1 -全部；0 -离线；1 -在线
					        "AlarmStatus": _this.AlarmStatus,// -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
					        "RunStatus":_this.RunStatus //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
				    }
				}
	            var url = eosCommon.ENTERPRISE_API + "api/equipment/QueryEquipmentList";                           
	            eosCommon.eosAjax(url, "GET", param, "json", function (result) {
	                if (eosCommon.checkCode(result.State, result.Message)) {
	                				
									_this.noData=false;
									if(result.Data instanceof Array){
										//暂无数据
										_this.emptyData=true;
										_this.noDetailData=false;
	                        	 		_this.DetailDataEmpty=true;										
										_this.page_num = 0;
										_this.Equipments=[]
										_this.equipmentDetails=[];
	                        	 		_this.$nextTick(function(){$('#addProWbSelect').selectpicker('refresh');})
									}else{
										_this.emptyData=false;
										_this.total = result.Data.Total;
				                		_this.Equipments=result.Data.Equipments;				                		
				                		_this.equipmentId=_this.Equipments[0].EquipmentId;
				                		_this.getCurrentEqInfo(0,_this.equipmentId,_this.Equipments[0].EquipmentAlias); 
			                            _this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
			                            _this.end_row = _this.page_size * (_this.page_index - 1) + _this.Equipments.length;
			                            _this.page_num = Math.ceil(_this.total / _this.page_size);
									}
	                		
                	}})
        	},
        	getProjectList:function(){
            	//请求项目列表数据
            		var _this=this;
	            	var param={
	            		 "AccessToken":eosCommon.storage.get('AccessToken'),					    
					    "PageIndex":'', //第几页（可为空，为空或为0时不分页）
					    "PageSize":'', //条数（可为空，为空或者为0不分页）
					    "Parameters":{
					    "Keywords":''	
					    }
	            	};
	            	var url=eosCommon.COMMON_API+"api/common/project";
	            	eosCommon.eosAjax(url,'GET',param,'json',function(result){
	            		if(eosCommon.checkCode(result.State, result.Message)){	            				            		
	            			_this.Projects=result.Data.Result;	            				            		
	            			_this.$nextTick(function(){
	            				$('#projectLists').selectpicker('refresh');
	            			})          			
	            		}
	            	});
            },
            initSelect:function(){  
            	var _this=this;
            	_this.$nextTick(function(){
    				$('#projectLists').selectpicker('refresh');
    				$('#OnlineStatus').selectpicker('refresh');
    				$('#RunStatus').selectpicker('refresh');
    				$('#AlarmStatus').selectpicker('refresh');
    			})
            },
            delayPublish: function(item, delay) {
				var _this = this;
				var curr = +new Date()
				if(curr - _this.last > delay) {
					_this.Publish(item);
					_this.last = curr
				} else {
					vdialog({
						type: 'confirm',
						title: '提示',
						content: '发布频率太快，请5秒后再发布',
						ok: function() {

						},
						cancel: true,
						modal: true
					});
				}
			},
			Publish: function(item) {
				var _this = this;
				var param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"EquipmentId": item.EquipmentId
					}
				};
				var url = eosCommon.ENTERPRISE_API + "api/equipment/Publish";

				eosCommon.eosAjax(url, "Put", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage('success', '发布成功');
					}
				});
			},
				delEquipment: function(item) {
				var _this = this;
				vdialog({
					type: 'confirm',
					title: '提示',
					content: eosCommon.DELETE_MSG_ASK,
					ok: function() {
						var param = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters": {
								"EquipmentId": item.EquipmentId
							}
						};
						var url = eosCommon.ENTERPRISE_API + "api/equipment/delete";
						eosCommon.eosAjax(url, "Delete", param, "json", function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
								_this.getData();								
							}
						});
					},
					cancel: true,
					modal: true
				});
			},
				getCurrentEqInfo:function(index,equipmentId,equipmentName){
		        		var _this=this;
		        		_this.noDetailData=true;
		        		_this.DetailDataEmpty=false;
		        		_this.currIndex=index;
		        		_this.equipmentId=equipmentId;
		        		_this.equipmentName=equipmentName;
		        		var param = {
		                         	"AccessToken":eosCommon.storage.get('AccessToken'),
		                         	 "EquipmentId":equipmentId,
									"IsDefaultGroup":'' //-- 是否只获取第一个分组的数据						   
		                   }
	                    var url = eosCommon.ENTERPRISE_API + 'api/equipment/GroupRunning';
	                    eosCommon.eosAjax(url, "GET", param, "json", function(result) {
	                        if(eosCommon.checkCode(result.State, result.Message)) {
	                        				_this.noDetailData=false;
			                        	 	if(result.Data.length==0){
			                        	 		//暂无数据
			                        	 		_this.DetailDataEmpty=true;
			                        	 		_this.equipmentDetails=[];
			                        	 		_this.$nextTick(function(){$('#addProWbSelect').selectpicker('refresh');})
			                        	 	}else{
			                        	 		_this.DetailDataEmpty=false;			                        	 		
			                        	 		_this.equipmentDetails=result.Data;								                        	 		
								    	 		for(var i=0;i<_this.equipmentDetails.length;i++){
								    	 			_this.equipmentDetails[i].groupId=i;
								    	 		}											    	 
								    	 		$('#addProWbSelect').selectpicker('refresh');
								    	 		_this.UpdatedOn=_this.equipmentDetails[0].Details[0].UpdatedOn;
											}
	            			}
	        });
        	},
        	changeGroup:function(groupId){
				var _this=this;
				for(var i=0;i<_this.equipmentDetails.length;i++){
					if(groupId==_this.equipmentDetails[i].groupId){

            	 		_this.UpdatedOn=_this.equipmentDetails[i].Details[0].UpdatedOn;
						
					}
				}
			},
			editEquipment:function(item){
				var _this=this;
				vdialog({
					type: 'confirm',
					title: '提示',
					content: '修改设备信息的时候，请先暂停网关数据上传',
					ok: function() {
						_this.$router.push({name:'equipment_detail_infos',params:{EquipmentId:item.EquipmentId,EquipmentName:item.EquipmentAlias,ProjectName:_this.Equipments[0].ProjectName}});						
					},
					cancel: true,
					modal: true
				});
			},
			 historyData: function(item) {
                this.$router.push({name: 'equipment_detail', params: {EquipmentId: item.EquipmentId, isDirected: true}})
           },
		 up_page: function() {

            if(this.page_index > 1) {
                this.page_index--;
                this.page_record--;
            }
        },
        on_page: function(data) {

            this.page_index = data;
            this.page_record = data;
        },
        dow_page: function() {

            if(this.page_index < this.page_num) {
                this.page_index++;
                this.page_record++;
            }
        }
        	
        }
        
	
	
	}
</script>

<style scoped="scoped">
	 #item-index .item-data .table-box.border-title {
        border: 1px solid #eeeeef;
        margin-bottom: 15px;
        margin-top: 20px;
        /*border-bottom: 0 solid #eeeeef;*/
    }
    #item-index .item-data .table-detail .contact-icon {
        position: absolute;
        right: 0;
        cursor: pointer;
        top: 10px;
        display: none;
    }
    #item-index .item-data .table-detail:hover .contact-icon {
        display: block;
        position: relative;
        right: 0;
        cursor: pointer;
        top: 10px;
    }
    #item-index .item-data .pl-subtitle {
        padding-left: 10px;
    }
    #item-index .item-data .table-detail {
        padding: 0;
        line-height: 75px
    }
    #item-index .item-data .table-detail .member-info {
        padding: 0;
        height: 100px;
    }
    #item-index .item-data .member-info img {
        width: 120px;
        height: 100px
    }
    #item-index .item-data .member-info .sub-title {
        padding-left: 0;
    }
    #item-index .member-info .div-ver {
        max-width: 180px;
        white-space: nowrap;
        display: inline-block;
        text-overflow: ellipsis;
        padding-left: 10px;
        position: absolute
    }
    #item-index .member-info .getway-sub-title {
        background-color: #fff;
        height: 10px;
        line-height: 10px;
        margin: 0;
        padding-top: 13px;
    }
    #item-index .member-info .getway-sub-title.project_infos {
        line-height: 22px;
        margin-top: -21px;
    }
    #item-index .member-info .getway-sub-title.project_infos p b{
     	border-radius:14px; 
     	/*background:rgba(192,204,218,0.4);*/
     	color:#8492A6;
     	font-size: 16px;
    }
    #item-index .member-info .getway-sub-title.project_infos p span.names{
     	text-indent: 5px; color: #8492A6  ;
    }
    #item-index .member-info .getway-sub-title.project_infos p span.text-cog{
     	 color: #8492A6;
     	 /*font-weight: bold;*/
    }
    .table-box{
    	background: #fff;
    }
    #item-index .member-info .getway-sub-title.text-20 {
        font-size: 18px;
        margin-bottom: 30px;
    }
    #item-index .member-info .getway-title.text-20 {
        font-size: 18px
    }
    #item-index .member-info .sub-title {
        padding-left: 0;
    }
    #item-index .table-detail-title {
        padding: 10px 0;
        line-height: 30px;
    }
    #item-index .table-detail-title .sub-title {
        text-align: right
    }
    #item-index .table-detail-add {
        background-color: #fff;
        display: inline-block;
        padding: 0 10px 0 5px;
    }
    #item-index .table-box.card-box.border-add:hover {
        border: 1px dashed #bbb;
        color: #1abc9c;
        font-size: 18px;
    }
    #item-index .table-box.border-1 {
        border: 1px solid #eeeeef;
        position: relative;
        margin-top: 15px;
    }
    #item-index .text-pencil {
        color: #1abc9c;
    }
    #item-index .text-trash-o {
        color: #ff3f4e;
    }
    #item-index .text-cog {
        color: #aaa;
    }
    #item-index .text-star {
        color: #ccc;
    }
    #item-index .font-size-text {
        font-size: 20px;
        cursor: pointer;
    }
    #item-index .m-rigth {
        margin-right: 10px;
    }
    #item-index .equipment_panel_nav ul { border-bottom: 1px solid #e6e6e6; border-left: 1px solid #e6e6e6; }
    #item-index .equipment_panel_nav a { border-right: 1px solid #e6e6e6; border-top: 1px solid #e6e6e6; }
    #item-index .item-content-title-right {
        text-align: right;
        height: 34px;
        line-height: 32px;
    }
    #item-index .contact-card,
    #item-index .item-wrapper {
        height: 40px;
    }
    #item-index .text-cleos,
    #item-index .title-info {
        display: block;
        width: 100%;
        height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    #item-index .item-wrapper {
        height: 32px;
    }
    #item-index .project-list-item {
        float: left;
        width: 300px;
        height: 200px;
        margin-right: 10px;
    }
    #item-index .project-list-item img {
        width: 300px;
        height: 160px;
    }
    .p-10{
    	padding: 18px 10px!important;
    }
    a.alarmLevel {
    	border-radius: 18px!important; 
    	font-size: 15px;
    }
    .alarmLevel span{
    	display: inline-block;
    	width: 18px;
	 	height: 18px;
	 	font-size: 18px;
	  	border-radius: 18px;
	   	background: #fff;
	   	line-height: 17px; 
	   	text-align: center;
    }
    .alarmLevel b{
    	color: #2ecc71;
    	font-size: 16px;
    }
    .panel-title{
    	color: #000;
    	font-weight: bold;
    }
   
    .b-l-1{
    	padding: 0;
    	border-left: 1px solid #f2f2f2 !important;
    	border-right: 1px solid #f2f2f2 !important;
    }
    .isActive{
    	background: #eff2f7;
    }
    #item-index .member-info .getway-sub-title{
    	background-color: transparent;
    }
    .code{
    	background: #eff2f7;
    	padding: 10px;
    }
    #mainChanger{
    	height: 26px;
    	margin-top: 3px;
    	margin-left: 5px;
    }
   #item-index .bootstrap-select.btn-group[class*=col-]{
    	margin-left: 10px!important;
    }
    #item-index .item-data .table-detail{
    	line-height: 48px;
    }
    .btn-group-sm>.btn, .btn-sm{
    	padding: 1px 14px;
    }
    
    /*添加设备*/
   [v-cloak] {
		display: none !important;
	}
	
	.getway-info .table-detail-title {
		padding: 10px 0;
		line-height: 30px;
	}
	
	.getway-info .table-detail-add {
		width: 80%;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.row.opport-box .table-detail {
		white-space: nowrap
	}
	
	.row.opport-box .table-detail.pt20 {
		padding-top: 20px;
	}
	
	.tab-content .equipment-title {
		font-size: 18px;
		padding-top: 10px;
		font-weight: bold;
		max-width: 200px;
		padding-left: 10px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis
	}
	
	.tab-content .equipment-title-sub {
		font-size: 14px;
		padding-top: 0px;
		color: #bbb;
		white-space: nowrap;
		padding-left: 10px;
		overflow: hidden;
		text-overflow: ellipsis
	}
	
	.member-info .getway-title .getway-title-sub {
		font-size: 18px;
		font-weight: bold;
		max-width: 200px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis
	}
	
	.center-vertical {
		position: relative;
		top: 50%;
		transform: translateY(-50%);
	}
	.ak-select .group-text {
		display: inline-block;
		overflow: hidden;
		height: 20px;
		line-height: 20px;
		text-align: left;
		font-size: 9pt;
	}
	
	.ak-select ul {
		margin: 0;
		padding: 0;
		list-style-type: none;
	}
	
	.ak-select ul li a {
		display: block;
		padding: 3px 20px;
		clear: both;
		font-weight: 400;
		line-height: 1.42857143;
		color: #333;
		white-space: nowrap;
	}
	
	.ak-select ul li a:hover {
		color: #262626;
		text-decoration: none;
		background-color: #f5f5f5;
		cursor: pointer;
	}
	
	.ak-select ul li .entry-input {
		width: 180px;
		height: 30px;
		margin: 0 8px 3px 8px;
		padding: 0 8px;
		border: 1px solid #E3E3E3;
	}
	
	.ak-select .dropdown-toggle .caret {
		position: absolute;
		top: 50%;
		right: 9pt;
		margin-top: -2px;
		vertical-align: middle;
	}
	.item-content-title-right {
		text-align: right;
		height: 34px;
		line-height: 32px;
	}
	.nicescroll-rails{
		top: 0px!important;
	}
	.equipment_active{
		background: #eff2f7;
	}
	.noDataBg img{
		margin: 0 auto;
		margin-top: 30px;
	}
	.noDataBg h3{		
		margin: 0 auto;
		margin-top: 30px;
		text-align: center;
		font-size: 16px;
		font-weight: bolder;
		color: #1abc9c;
	}
</style>
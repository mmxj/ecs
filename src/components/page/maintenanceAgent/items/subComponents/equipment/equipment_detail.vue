<template>
    <div id="equipment-detail">
        <div class="panel">
            <div class="clearfix">
                <div>
                    <ul class="nav nav-tabs">
                        <li>
                            <div class="item-table-detail">
                                <img v-lazy="detailData.EquipmentPhoto">
                            </div>
                        </li>
                        <span class="tab-title-top">{{detailData.EquipmentName}}</span>
                        <span class="tab-title-bottom">            		 		                           
            		 	    <label v-bind:class="[{active: currentViewTab=='running'},'tab-title']">
            		 	        <span @click="toggleTabs('running');">实时数据</span>
            		 	    </label>
            		 	    <label v-bind:class="[{active: currentViewTab=='fault_warning'},'tab-title']">
            		 	        <span @click="toggleTabs('fault_warning');">预警告警</span>
            		 	    </label>
            		 	    <label v-if="iShowModels" v-bind:class="[{active: currentViewTab=='maintenance_plan'},'tab-title']">
            		 	        <span @click="toggleTabs('maintenance_plan');">维保计划</span>
            		 	    </label>
            		 	    
            		 	    <label v-if="iShowModels" v-bind:class="[{active: currentViewTab=='event_log'},'tab-title']">
            		 	        <span @click="toggleTabs('event_log');">事件记录</span>
            		 	    </label>
            		 	    <label v-bind:class="[{active: currentViewTab=='info'},'tab-title']">
            		 		    <span @click="toggleTabs('info');">设备信息</span>
            		 		</label>
                            <label v-bind:class="[{active: currentViewTab=='history_data'},'tab-title']">
            		 	        <span @click="toggleTabs('history_data');">历史数据</span>
            		 	    </label>
                            
                		</span>
                        <button @click="back()" type="button" class="btnReturn btn btn-white pull-right" style="margin: 10px;">
                            <i class="fa fa-mail-reply-all m-r-5"></i>返回
                        </button>
                    </ul>
                    <div class="pl-10 pt-5">
                    	<span>
                    		<b class="fa fa-map-marker text-grey"></b> 
                    		<span class="text-muted">{{detailData.InstallPlace}}</span>
                    	</span>
                    </div>
                </div>
                <div style="position:absolute;top: 6px;right: 90px;">
                    <div class="table-detail m-r-10" style="float: left;">
                        <div class="mb-5">
                            <span>链接状态</span>
                        </div>
                        <div v-if="detailData.IsOnline == 0">
                            <a class="btn eos-btn-gray btn-xs">　离线　</a>
                        </div>
                        <div v-else="detailData.IsOnline == 1">
                            <a class="btn eos-btn-info btn-xs">　在线　</a>
                        </div>
                    </div>
                    <div class="table-detail m-r-10" style="float: left;">
                        <div class="mb-5">
                            <span>运行状态</span>
                        </div>
                        <label >
                        	<a class="btn btn-xs huangjunfu" :class="[detailData.IsOnline == 0?nolineClass:onlineClass]">    {{ detailData.RunState==1?'运行':(detailData.RunState==2?'停机':'未知') }}    </a>
                        </label>
                        
                    </div>
                    <div class="table-detail m-r-10" style="float: left;">
                        <div class="mb-5">
                            <span>报警状态</span>
                        </div>
                        <div v-if="detailData.AlarmLevel == 0">
                            <a v-bind:class="[detailData.IsOnline == 0 ? 'eos-btn-gray' : '']" class="btn eos-btn-info waves-effect waves-light btn-xs">　正常　</a>
                        </div>
                        <div v-if="detailData.AlarmLevel == 1">
                            <a v-bind:class="[detailData.IsOnline == 0 ? 'eos-btn-gray' : '']" class="btn eos-btn-warning waves-effect waves-light btn-xs">　提醒　</a>
                        </div>
                        <div v-else-if="detailData.AlarmLevel == 2">
                            <a v-bind:class="[detailData.IsOnline == 0 ? 'eos-btn-gray' : '']" class="btn eos-btn-abnormal waves-effect waves-light btn-xs">　警告　</a>
                        </div>
                        <div v-else-if="detailData.AlarmLevel == 3">
                            <a v-bind:class="[detailData.IsOnline == 0 ? 'eos-btn-gray' : '']" class="btn eos-btn-danger waves-effect waves-light btn-xs">　报警　</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row no-space-row">
            <div id="panelWidth" class="col-md-12 mt-10 bg-white" style="padding: 0;">
                <div class="row tab-content" style="min-height: 700px;">
                    <component :propsData="detailData" v-on:reload-data='getReloadMsg'  :is="currentView"></component>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import info from './common/info.vue';
    import fault_warning from 'components/page/owner/items/common/warning.vue';
    import maintenance_plan from './common/maintenance_plan.vue';
    import event_log from './common/event_log.vue';
    import running from './common/running.vue';
    import history_data from './history_data.vue';
	import commonFn from '../../../../../../assets/js/common/commonFunc'
    let projectContr=commonFn.projectContr;
    export default {
        data: function() {
            return {
                detailData: '',
                eventData: '',
                currentView: 'running',
                currentViewTab: 'running',
                archivesData: '',
                equipmentData: {
                    EquipmentId: this.$route.params.EquipmentId,
                    ProjectId: ''
                },
            	onlineClass: 'eos-btn-info',
				nolineClass: 'eos-btn-gray',
				IsProjectAdmin:0
            }
        },
        computed:{
	    		//工单管理和服务管理模块的显示控制
		        iShowModels(){	
					return projectContr.isProjectAdmin(...this.showModelsParams);
				},			
				showModelsParams(){					
					return [this.IsProjectAdmin]
				}
    	},
        components: {
            info,
            fault_warning,
            maintenance_plan,
            event_log,
            running,
            history_data
        },       
        methods: {
            toggleTabs: function(tabText) {
                this.currentView = tabText;
                this.currentViewTab = tabText;
            },
            getReloadMsg:function(msg){
            	if(msg){
					this.getData();
				}
            },
            getData: function() {
                var _this = this;
                var url = eosCommon.ENTERPRISE_API + 'api/equipment/Detail';
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "EquipmentId": _this.$route.params.EquipmentId,
                        "Type": "1"
                    }
                }
                eosCommon.eosAjax(url, "GET", params, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {                  	
                        _this.detailData = result.Data;
                        _this.equipmentData = result.Data.ProjectId;
                        if(_this.$route.params.isDirected) {
                            _this.toggleTabs('history_data');
                        }
                    }
                });
            },
            back: function() {
					eosCommon.storage.set('ProjectId',this.equipmentData)
                  this.$router.go(-1);
                //this.$router.push({name:'equipments_info',params:{ProjectId:this.equipmentData}});
            }
        },
        updated:function(){        
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());       	
        },
        mounted: function() {
        	this.IsProjectAdmin=eosCommon.storage.get('IsProjectAdmin');        	
            this.getData();
        }
    }
</script>
<style>
    #equipment-detail .list-group-item { border-left: none; border-right: none; }
    #equipment-detail .table > thead > tr > th { border-bottom: 2px solid #ebeff2; }
    #equipment-detail .equipment_info .col-sm-4 { text-align: right; }
    #equipment-detail .equipment_img_list { float: left; margin: 0 10px; }
    #equipment-detail .equipment_img_list img { display: block; width: 150px; }
    #equipment-detail .widget-panel { margin-bottom: 10px; padding: 20px 0px; }
    #equipment-detail .yujing { position: relative; margin-top: 10px; }
    #equipment-detail .badge { position: absolute; top: -10px; left: 30px; font-size: 16px; width: 24px; height: 24px; border-radius: 50px; }
    #equipment-detail .time-item { padding-left: 15px; }
    #equipment-detail .row { margin: 0; }
    #equipment-detail .transaction-list i { top: 13px; }
    #equipment-detail .panel-heading { padding: 10px 20px; }
    #equipment-detail .collapsed .fa-minus::before { content: "\f067" !important; }
    #equipment-detail .policy_status .item { position: relative; }
    #equipment-detail .policy_status .item .t1 { margin-top: -30px; padding-bottom: 20px; }
    #equipment-detail .policy_status .item::after {
        background-color: #ffffff;
        border-color: #81c868;
        border-radius: 10px;
        border-style: solid;
        border-width: 2px;
        content: '';
        height: 14px;
        left: 50%;
        margin-left: -7px;
        position: absolute;
        top: -7px;
        width: 14px;
    }
    #equipment-detail .equipment_panel_nav ul { border-bottom: 1px solid #e6e6e6; border-left: 1px solid #e6e6e6; }
    #equipment-detail .equipment_panel_nav a { border-right: 1px solid #e6e6e6; border-top: 1px solid #e6e6e6; }
    #equipment-detail .item-wrapper {
        width: 100%;
        line-height: 30px;
        background-color: rgba(40, 39, 39, 0.3);
        overflow: hidden;
        position: absolute;
        bottom: 0px;
        right: 0px;
        padding: 0px;
        z-index: 251;
    }
    #equipment-detail .item-wrapper .title-info {
        color: #FFFFFF;
        padding: 0px 0px 0px 5px;
        height: 30px;
        font-size: 18px;
    }
    #equipment-detail .fade-enter-active, .fade-leave-active { transition: opacity .5s; }
    #equipment-detail .fade-enter, .fade-leave-active { opacity: 0; }
    #equipment-detail .item-table-detail { padding: 10px }
    #equipment-detail .item-table-detail img { width: 110px; height: 60px }
    #equipment-detail .item-title { margin-bottom: 0; padding-top: 5px; }
    #equipment-detail label.active > span { color: #1abc9c; }
    #equipment-detail .tab-title {
        cursor: pointer;
        position: relative;
        padding-left: 10px;
        padding-right: 10px;
        height: 10px;
        font-size: 14px;
        padding-top: 55px;
        line-height: 10px;
    }
    #equipment-detail .tab-title-bottom {
        position: absolute;
    }
    #equipment-detail .tab-title-top {
        position: absolute;
        padding-top: 5px;
        padding-left: 10px;
        height: 30px;
        font-size: 18px;
        font-weight: bold;
        line-height: 30px;
    }
</style>



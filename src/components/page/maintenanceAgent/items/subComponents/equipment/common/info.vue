<template>
    <div>
        <div class="col-md-12 pt-10 pr-10 pb-20" style="padding-right: 0;">
            <div class="col-md-6">
                <div class="bg-white">
                    <!--<h4 class="plr-10-10 mb-0 mt-0">设备基本信息</h4>-->
                    <form action="#" class="form-horizontal pr-10 pl-10 pb-5 pt-5 equipment_info">
                        <div class="form-group">
                            <div class="col-sm-4">所属项目：</div>
                            <div class="col-sm-8 editable">{{ProjectName}}</div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-4">设备所有人：</div>
                            <div class="col-sm-8 editable">{{CustomerName}}</div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-4">设备品牌：</div>
                            <div class="col-sm-8 editable">{{Brand}}</div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-4">设备型号：</div>
                            <div class="col-sm-8 editable">{{EquipmentModel}}</div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-4">设备资产编号：</div>
                            <div class="col-sm-8 editable">{{AssetsNo}}</div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data: function() {
            return {
                archivesData: '',
                EquipmentId:''
            }
        },
        props: ['propsData'],
        computed:{
        	ProjectName(){
        		
        		return this.propsData.ProjectName ? this.propsData.ProjectName : '暂无信息'
        	},
        	CustomerName(){
        		return this.propsData.CustomerName ? this.propsData.CustomerName : '暂无信息'
        	},
        	Brand(){
        		return this.archivesData.Brand ? this.archivesData.Brand : '暂无信息'
        	},
        	EquipmentModel(){
        		return this.archivesData.EquipmentModel ? this.archivesData.EquipmentModel : '暂无信息'
        	},
        	AssetsNo(){
        		return this.propsData.AssetsNo ? this.propsData.AssetsNo : '暂无信息'
        	}
        },
        methods: {
            getArchives: function() {
                var _this = this;
                var url = eosCommon.ENTERPRISE_API + 'api/equipment/Archives';
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "EquipmentId": _this.EquipmentId
                    }
                }
                eosCommon.eosAjax(url, "GET", params, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        _this.archivesData = result.Data;
                    }
                });
            },
            initData(){
            	this.EquipmentId = this.propsData.EquipmentId;
            	this.getArchives();
            }
        },

        watch:{
        	propsData:{
        		handler(val,oldVal){
        			this.initData();
        		},
        		deep:true
        	}
        },
        mounted: function() {
        		
        	 this.initData();	
        	
            
        }
    }
</script>
<style>
</style>
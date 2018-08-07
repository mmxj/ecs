<template>
    <div id="running" class="col-md-12" style="padding: 15px">
        <!--<div class="row">
            <span class="size20 font-bold">实时数据</span>
        </div>
        <hr class="divider mb-10 mt-10">-->
        <div class="col-lg-12" style="min-height: 130px;">
            <!--<div class="row">
                <div class="dataTables_wrapper no-footer" v-show="emptyData">
                    <div class="dataTables_processing" style="background-image: none;text-indent: 0;">暂无数据</div>
                </div>
            </div>-->
            <no-data v-show="emptyData"></no-data>
			<loading v-show="noData"></loading>
            
		            	<ul class="col-lg-3 col-md-3">
		                <li v-for="(item,index) in runningData" @click="showDataBox(index)" :class="(initIndex == index)?'active':''">
		                    {{(item.GroupName == ''?'默认分组':item.GroupName)}}
		                </li>
		            </ul>
		            <div class="col-lg-9 col-md-9">
		                <div class="runningDataBox" v-for="(list,index) in runningData" style="display: none;" v-show="initIndex == index">
		                    <table class="table table-striped table-bordered runing">
		                        <thead>
		                        <tr>
		                            <th>节点名称</th>
		                            <th>协议地址</th>
		                            <th>运行时长</th>
		                            <th>数据值</th>
		                            <th>采集时间</th>
		                        </tr>
		                        </thead>
		                        <tbody>
		                        <tr v-for="data in list.Details">
		                            <td>{{data.DisplayName}}</td>
		                            <td>{{data.Address}}</td>
		                            <td>{{data.RunDuration}}</td>
		                            <!--<td>{{(data.RunDuration == -1?'&#45;&#45;':data.RunDuration)}}</td>-->
		                            <td>{{data.DataValue}}</td>
		                            <td>{{data.UpdatedOn}}</td>
		                        </tr>
		                        </tbody>
		                    </table>
		                </div>
		            </div>
        </div>
    </div>
</template>
<script>
    var timer = ''
    export default {
        data: function() {
            return {
                eventData: '',
                runningData: '',
                initIndex: 0,
                emptyData: false,
                noData:true,
                
                intervalidRuning: '',
                EquipmentId:''
            }
        },
        props: ['propsData'],
        watch:{
        	propsData: {
				handler(val, oldval) {
					this.EquipmentId=val.EquipmentId;
					this.getArchives();

				},
				deep: true //对象内部的属性监听，也叫深度监听
			}
        },
        methods: {
            getArchives: function() {
                var _this = this;
                _this.noData=true;
                _this.emptyData = false;
                var url = eosCommon.ENTERPRISE_API + 'api/equipment/Running';
                var params = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "EquipmentId": _this.EquipmentId
                    }
                }
                eosCommon.eosAjax(url, "GET", params, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                		_this.noData=false;
                    	
                        if(result.Data instanceof Array) {
                            _this.emptyData = true;
                             _this.runningData=[];
                        } else {
                            _this.emptyData = false;
                            _this.runningData = result.Data.GroupData;
                            for(var i=0;i<_this.runningData.length;i++){
                                var runDurationData=result.Data.GroupData[i].Details
                                for(var j=0;j<runDurationData.length;j++){
                                    var runTimeTotal=parseInt(runDurationData[j].RunDuration)
//                                    var runTimeTotal=10000
                                    if(runTimeTotal<0){
//                                        runDurationData[j].RunDuration=eosCommon.formatSeconds(long)
                                        runDurationData[j].RunDuration="--"
                                    }else{
                                        runDurationData[j].RunDuration=eosCommon.formatSeconds(runTimeTotal)
                                    }
                                }
                            }
                        }
                    }
                });
            },           
            showDataBox: function(index) {
                var _this = this;
                this.initIndex = index;
            }
        },
        mounted: function() {
            var _this = this;
            console.log('fdsfdsfdsfdsfds');
            if(_this.$route.params.EquipmentId){
            	_this.EquipmentId=_this.$route.params.EquipmentId;
            }else{
            	_this.EquipmentId=_this.propsData.EquipmentId;
            	console.log('propsData:',_this.propsData)
            }
            this.getArchives();
            timer = setInterval(function() {
                _this.getArchives();
            }, 10000)
        },
        beforeDestroy: function() {
            var _this = this;
            clearInterval(timer)
        }
    }
</script>
<style>
    table.table.table-striped.table-bordered.runing thead tr th{
        padding: 10px 18px;
    }
    table.table.table-striped.table-bordered.runing tbody tr td{
        padding: 10px 18px;
    }
    #running li {
        height: 43px;
        padding: 5px 10px;
        list-style: none;
        line-height: 43px;
        cursor: pointer;
    }
    #running li.active {
        color: white;
        background-color: #1abc9c;
    }
</style>
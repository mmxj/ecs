<template>
    <div class="h100p" style="position: absolute;top: 0; bottom: 0;">  
        <div class="his_wrap" >
        	<div class="row">	            		
	        	<nav>
	        		<ul class="nav nav-tabs" style="border-bottom: none;">
					  <li role="presentation" :class="{active: currentViewTab == 'dataChart'}" ><a @click="toggleTab('dataChart')">数据图表</a></li>
					  <li role="presentation" :class="{active: currentViewTab == 'dataLists'}"><a @click="toggleTab('dataLists')">数据列表</a></li>
						<li class="blanks"></li>
					</ul>
	        	</nav>		            	
	    	</div>
	    	<div class="his_content">
	    		<component :propsData="historyData" :is='currentView'></component>
	    	</div>
        </div>
		
		<!--<component :propsData="historyData" :is='currentView'></component>-->	
    </div>
</template>
<script>
// import dataLists from './common/history_data.vue';
import dataLists from 'components/page/maintenanceAgent/items/subComponents/equipment/common/dataList.vue';
// import dataChart from './common/history_chart.vue';
import dataChart from 'components/page/maintenanceAgent/items/subComponents/equipment/common/dataChart.vue';
export default {
    data: function (){
        return {
            historyData: {
                EquipmentId: '',
                ProjectId: ''
            },
            currentView:'dataChart',
            currentViewTab:'dataChart'
        }
    },
    props:['propsData'],
    components:{
        dataLists,
        dataChart
    },
    created:function(){
    	if(!this.propsData){
    		this.historyData.EquipmentId='';
    		this.historyData.ProjectId='';
    		return false;
    	}
    	
    	this.historyData.EquipmentId=this.propsData.EquipmentId;
    	this.historyData.ProjectId=this.propsData.ProjectId;
    },
    watch:{
        	propsData:{
        		handler(val,oldVal){
        			if(!this.propsData){
			    		this.historyData.EquipmentId='';
			    		this.historyData.ProjectId='';
			    		return false;
			    	}
			    	
			    	this.historyData.EquipmentId=this.propsData.EquipmentId;
			    	this.historyData.ProjectId=this.propsData.ProjectId;
        		},
        		deep:true
        	}
        },
    mounted:function(){   	    	
    },
    methods:{
    	toggleTab:function(tabTxt){
    		this.currentViewTab=tabTxt;
    		this.currentView=tabTxt;    		   		
    	},
    	
		
    }
}
</script>
<style lang="less" scoped="scoped">
.h100p{
    /*height: 100%;*/
    width: 100%;
    /*margin-top: 15px;*/
    
}
.nav-tabs>li>a{
    line-height:39px;
    color: #1F2D3D;;
    font-size: 12px;
    background: #fff;
    font-weight: bold;
    width: 90px;
    text-align: center;
    border-right: 1px solid #D1E3E2;
    border-bottom: 1px solid #D1E3E2;
    margin: 0;
    
     
}
.nav-tabs>li.active>a{
    border-bottom:none;
	color: #1ABC9C;
	background: #fff;
	 border-right: 1px solid #D1E3E2;
    border-bottom: none;
	
     
}
 .nav-tabs>li.active>a:hover{
    color:#1ABC9C!important;
    cursor: pointer;
     
}

.row{
	margin-left:0px!important;
	margin-right:0px!important;
	
}
.his_wrap{
	position: absolute;
	top: 15px;
	 bottom: 0px;
	 left: 15px; 
	 right: 0px;
	 border: 1px solid #D1E3E2;
	 border-bottom: none;
}
.his_content{
	position: absolute;
	top: 42px; 
	bottom: 0;
	width: 100%; 
	overflow: auto;
}
li.blanks{
	border-bottom: 1px solid #D1E3E2;
	
	position: absolute;
	left: 180px;
	height: 40px;
	line-height: 40px;
	right: 0;
	top: 0;
	text-align: center;
}
</style>
<style scoped="scoped" lang="less">
  .dataName {
    position: absolute;
    display: block;
    border-bottom: 1px solid #D1E3E2;
    border-left: 1px solid #D1E3E2;
    /*border-right: 1px solid #D1E3E2;*/
    right: 140px;
    left: 0;
    text-align: left;
    padding: 0 5px;
    font-size: 12px;
    color: #1F2D3D;
    height: 100%;
    line-height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .isIssuedataName{
  	 right: 80px;
  }
  .dataValue {
    position: absolute;
    right: 60px;
    display: block;
    border-bottom: 1px solid #D1E3E2;
    border-right: 1px solid #D1E3E2;
    margin-left: 0px;
    font-size: 12px;
    color: #1F2D3D;
    width: 80px;
    padding: 0 5px;
    height: 100%;
    line-height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .isIssuedataValue{
  	 right: 0px;
  }
  .isCtr{
  	position: absolute;
  	font-size: 14px;
  	color: #97BEBC;
  	right: 0;
  	width:60px;
  	height:28px;
  	line-height: 28px;
  	text-align: center;
  	 border-bottom: 1px solid #D1E3E2;
  	 border-right: 1px solid #D1E3E2;
  	 i{
  	 	cursor: pointer;
  	 }
  }
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }
  .datablock-middle-line{
    height: 100%;
    width: 1px;
    border-right:1px solid #D1E3E2;
    position: absolute;
    z-index: 8;
    padding-left: 4px;
  }
  .moveline{
    cursor: w-resize;
  }
</style>
<template>
  <div style="height: 100%; width: 100%;position: relative;" ref="datablockWrap">
    <div :style="PrePositionStyle" class="dataName" :class="{isIssuedataName:isNotisIssue}" ref="mdatablockdataName" > {{propsData.dataName}} </div>
    <div class="datablock-middle-line" :class="{moveline:get_curr_setting}" @mousedown="lineMousdown" ref="datablockMiddleLine" :style="{right:lineright}"></div>
    <div class="dataValue" :class="{isIssuedataValue:isNotisIssue}" ref="mdatablockdataValue" :style="{width:valueWidth}">
    	<span :style="PostPositionStyle" v-show="(!isDataChange)">
			{{propsData.valContent}}
		  </span>
    </div>

    <div v-if="!isNotisIssue" class="isCtr">
     	<i v-if="isPublish==1 && propsData.IsIssue==1 && get_expOself" @click="showDialog()" style="margin-left: 0;" class="fa  fa-cog m-r-5"></i>
		</div>

  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import {
    Chart,
    myChart
  } from 'assets/js/common/dragCommon.js';//引入图表
  import commonDialog from './commonDialog' //弹出层
  //import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {

      return {
        isDataChange: false,
        ctrData:{
        	dialogVisible:false,
        	dataName:this.propsData.dataName,
        	finiedDialogVisi:false
        },
        isNotisIssue:true,
        lineLeft:0,
        valueWidth:'80px',
        lineright:'80px'


      }
    },
    props: ['propsData', 'blockID','isPublish','singleDatablockLists','dataValueWidth'],
    components:{
    	commonDialog
    },
    computed: { ...mapGetters(["get_datablockCurr_data", "get_freshTime_Data","get_treeMenu","get_expOself","get_curr_setting"]),
      PrePositionStyle() {
        let vm = this;

        return `font-size:${vm.propsData.PrePositionStyle.fontSize}px;
				color: ${vm.propsData.PrePositionStyle.color};
				font-weight: ${vm.propsData.PrePositionStyle.fontWeight};
				font-style:${vm.propsData.PrePositionStyle.fontItalic};
				text-decoration:${vm.propsData.PrePositionStyle.fontUnderLine};
				right:${vm.isNotisIssue?(vm.propsData.ValueWidth+'px'):(parseInt(vm.propsData.ValueWidth)+60)+'px'};`
      },
      PostPositionStyle() {
        let vm = this;
        return `font-size:${vm.propsData.PostPositionStyle.fontSize}px;
				color: ${vm.propsData.PostPositionStyle.color};
				font-weight: ${vm.propsData.PostPositionStyle.fontWeight};
				font-style:${vm.propsData.PostPositionStyle.fontItalic};
				text-decoration:${vm.propsData.PostPositionStyle.fontUnderLine};`
      }
    },
    watch: {
      'get_datablockCurr_data' (val, oldval) {
        for(let key of val) {
          if(key.Id == this.blockID) {
            for(let singleVal of key.Value) {
              if(singleVal.Id == this.propsData.lineID) {
                this.propsData.dataValue = singleVal.Value;
                this.propsData.Unit = singleVal.PostPositionValue;
                this.propsData.valContent = this.propsData.dataValue + this.propsData.Unit;
              }
            }
          }
        }
      },
      "get_freshTime_Data.Time" (val, oldVal) {
        this.isDataChange = true;
        setTimeout(() => {
          this.isDataChange = false;
        }, 500);
      },
      "dataValueWidth"(val,oldVal){
        if(!this.isNotisIssue){
          this.$set(this,'lineright',val+60+'px');
          this.$set(this,'valueWidth',val+'px');
        }else{
          this.$set(this,'lineright',val+'px');
          this.$set(this,'valueWidth',val+'px');
        }


      }
    },
    mounted() {
    	let vm=this;
    	let arr=vm.singleDatablockLists.filter((val)=>{
    		return val.IsIssue==1;
    	});
    	if(vm.isPublish && arr.length>0 && vm.get_expOself)
      {vm.isNotisIssue=false}
    	else
      {vm.isNotisIssue=true;}

      if(vm.propsData.ValueWidth){

        if(!vm.isNotisIssue){

          this.$set(this,'lineright',(parseInt(vm.propsData.ValueWidth)+60)+'px');

        }else{
          this.$set(this,'lineright',vm.propsData.ValueWidth+'px')
        }

      }else{

    	  if(!vm.isNotisIssue){

          this.$set(this,'lineright',(parseInt(this.dataValueWidth)+60)+'px');

        }else{
          this.$set(this,'lineright',this.dataValueWidth+'px')
        }
        this.$nextTick(()=>{
          this.$set(this,'valueWidth',this.dataValueWidth+'px');
          this.$emit("changeDataValueWidth",this.dataValueWidth)
        })
      }

    },
    methods: {
    	...mapMutations({
    		uPDATE_CTRDATA:'UPDATE_CTRDATA'
    	}),
    	showDialog(){
    		let vm=this;
    		vm.uPDATE_CTRDATA({
    			dialogVisible:true,
    			EquipmentId:vm.propsData.dataStream.EquipmentId,
    			RegisterAddress:vm.propsData.dataStream.RegisterAddress,
    			valContent:vm.propsData.valContent,
    			Status:vm.propsData.Status,
    			DisplayName:vm.propsData.dataName,
    			finiedDialogVisi:false
    		});
    	},
      lineMousdown(e){
    	  var vm=this;
       if(!vm.get_curr_setting){return };
        var  e = e || event;
        e.preventDefault();
        e.stopPropagation();
        let line= this.$refs.datablockMiddleLine;
        let sX = e.clientX ;
        document.onmousemove = function(e){
           var  e = e || event;
            vm.fnMouseMove(e,sX)
        };
        document.onmouseup = function(){
          vm.fnMouseUp()
        }
      },
      fnMouseMove(e,sX ){
        var  e = e || event;
        let iL = e.clientX - sX+this.$refs.mdatablockdataName.clientWidth;
        this.iR = -(e.clientX-sX)+this.$refs.mdatablockdataValue.clientWidth;
        if(this.iR> 10&& this.iR<(this.$refs.datablockWrap.clientWidth-10)){

          if(!this.isNotisIssue){
            this.$set(this,'lineright',this.iR+60+'px');

          }else{
            this.$set(this,'lineright',this.iR+'px');
          }

        }
      },
      fnMouseUp(){
        if(this.iR> 10&& this.iR<(this.$refs.datablockWrap.clientWidth-10)){
          if(!this.isNotisIssue){
            this.$set(this,'valueWidth',this.iR+'px');
          }else{
            this.$set(this,'valueWidth',this.iR+'px');
          }
          this.changeValueWidth();
        }
        document.onmousemove = null;
        document.onmouseup = null;
      },
      changeValueWidth(){
        if(!this.isNotisIssue){
          this.$emit("changeDataValueWidth",this.iR)
        }else{

          this.$emit("changeDataValueWidth",this.iR)
        }

      }
    }
  }
</script>

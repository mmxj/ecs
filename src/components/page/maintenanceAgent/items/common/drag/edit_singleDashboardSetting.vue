<style scoped="scoped" lang="less">
.colorSetting_wrap {
	display: inline-block;
	margin-top: 10px;
	position: relative;
	.dotVal{
		position: absolute;
		top: 0;
		left: 20px;
		width: 50px;
	}
	.colorSettingSpan {
		display: block;
		position: absolute;
		top: 1px;
		height: 30px;
		line-height: 30px;
	}
	.colorSettingPiker {
		height: 30px;
		margin-left: 155px;
	}
	.infoSsp{							
		cursor: pointer;
		position: absolute;
		width: 12px;
		height: 12px;
		right: -16px;
		top: 50%;
		margin-top: -6px;
		display: inline-block;
		background: url(../../../../../../../static/css/images/new_drag/12.png) no-repeat center;		
	}
}
</style>
<template>
<div class="colorSetting_wrap">
	<span class="fontStyle colorSettingSpan" style="">从</span>
	<el-input :disabled="mindex!='0'" v-model="propsData.startNum" class='dotVal' size='small'></el-input>
	<span class="fontStyle colorSettingSpan" style="margin-left: 75px;">到</span>
	<el-input  v-model="propsData.endNum" style="left:95px" class='dotVal' size='small'></el-input>
	<el-color-picker v-model="propsData.regionColor" size='small' class="colorSettingPiker" ></el-color-picker>
	<span v-if="sColorSettingInfoList.length>2" @click="deleteColorSetting(mindex)" class="infoSsp"></span>
</div>
</template>
<script>
	import { mapGetters, mapMutations } from 'vuex'
	export default {
		data() {
			return {
			}
		},
		props: ['propsData', 'sColorSettingInfoList','mindex'],
		watch: {
			'propsData.startNum'(val,oldval){
				let vm=this;
				if(vm.mindex==0){
					return;
				}
				if(typeof val!='number' && isNaN(Number(val))){
					return;
				}
				vm.sColorSettingInfoList[vm.mindex-1].endNum=Number(val);
			},
			'propsData.endNum'(val,oldval){
				let vm=this;				
				if(vm.mindex==vm.sColorSettingInfoList.length-1){
					return;
				}
				if(typeof val!='number' && isNaN(Number(val))){
					return;
				}
				vm.sColorSettingInfoList[vm.mindex+1].startNum=Number(val);
			}
		},
		methods: {
			deleteColorSetting(index){
				let vm=this;
				//let len=vm.sColorSettingInfoList.length;
				vm.sColorSettingInfoList.splice(index,1);
			}
		}
	}
</script>
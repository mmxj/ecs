<template>
	<div class="">
		<energy-manage v-if="showCop"></energy-manage>
		<cop-setting :equipmentData="equipmentData" v-if="showCopSetting"></cop-setting>
		<cophistory-data :equipmentData="equipmentData" v-if="showCopHistory"></cophistory-data>
	</div>
</template>

<script>
	import energyManage from 'components/page/owner/items/n_energy_manage.vue'
	import copSetting from 'components/page/maintenanceAgent/copSetting.vue'
	import cophistoryData from 'components/page/maintenanceAgent/copHistoryData.vue'	
	import { mapGetters} from 'vuex'
	import {mapMutations} from 'vuex'
	export default{
		data(){
			return{
				
			}
		},
		computed:{
			...mapGetters(
				{
				showCop:'get_isRenderCop',
				showCopSetting:'get_isRenderCopSetting',
				showCopHistory:'get_isRenderCopHistory',				
				equipmentData:'get_copEquipmentData'
			})
		},
		components:{
			energyManage,
			copSetting,
			cophistoryData
		},
		methods:{
			...mapMutations({
			      getRENDER_COP:'RENDER_COP'
		    })
		},
		watch:{
		},
		mounted(){
			this.getRENDER_COP(
			{	isRenderCOP:true,
				copOperatorName:'',
				copEquipmentData:{}
			});
		}
	}
</script>

<style>
</style>
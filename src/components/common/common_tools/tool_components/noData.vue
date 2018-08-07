<template>
	<div :style="customStyle" :class="[others ? 'otherNoDataBg' : 'noDataBg']">
		<img class="img-responsive" :src="srcs" />
		<!--noEquip  noEquipDetialBg-->
		<h3 style="font-size: 16px;font-weight: bolder;color: #1abc9c;">{{noDataInfo}}</h3>
	</div>
</template>

<script type="text/javascript">
	export default{
		name:'noData',
		props:{
			noDataInfo:{
				type:String,
				default:'暂无数据'
			},
			customStyle:{
				type:String
			},
			others:{
				type:Boolean,
				default:false
			},
			srcs:{
				type:String,
				default:'static/css/images/noEquipDetialBg.png'
			}
		},
		mounted(){
		}
		
		
	}
</script>

<style lang="less" scoped="scoped">	
	.noDataBg {
		img{
		margin: 0 auto;
		margin-top: 30px;
		width: 226px;
		height: 158px;
		}
		h3{
		margin: 0 auto;
		margin-top: 30px;
		text-align: center;
		font-size: 16px;
		font-weight: bolder;
		color: #1abc9c;
		}
		
		
	}
	.otherNoDataBg{
		text-align: center;
		width:226px ;
		height: 218px;
		position: absolute;
		left: 50%;
		top: 50%;
		margin-top: -109px;
		margin-left: -113px;
		img{
			margin: 0 auto;
			width: 226px;
			height: 158px;
		}
		h3{
			margin: 0 auto;
			margin-top: 30px;
			text-align: center;
			font-size: 16px;
			font-weight: bolder;
			color: #1abc9c;
		}
	}
</style>
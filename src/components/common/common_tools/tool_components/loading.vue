<template>
	<div class="mask">
			<div class="loader" :style="styles">
				<div class="loader-inner ball-spin-fade-loader">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>			
				</div>
				<div class="loading">
					<h4>{{loadingMsg}}<span class="dotting"></span></h4>
				</div>
		</div>	
	</div>
</template>
<script type="text/javascript">
	export default{
		name:'Loading',
		data(){
			return{
				
			}
		},
		props:{
			loadingMsg:{
				type:String,
				default:'数据加载中'
			},
			styles:{
				type:String
				
			}
		},
		mounted(){
			
		},
		methods:{
			
		}
		
	}
</script>
<style scoped>
	.mask{
		width: 100%; height: 100%; background:rgba(0,0,0,0); position: absolute; z-index: 2000;
	}
.dotting {
    display: inline-block; min-width: 2px; min-height: 2px;
    box-shadow: 2px 0 currentColor, 6px 0 currentColor, 10px 0 currentColor; 
    -webkit-animation: dot 2s infinite step-start both;
    animation: dot 2s infinite step-start both;
    *zoom: expression(this.innerHTML = '...'); /* IE7 */
}
.dotting:before { content: '...'; } /* IE8 */
.dotting::before { content: ''; }
:root .dotting { margin-right: 8px; } /* IE9+,FF,CH,OP,SF */

@-webkit-keyframes dot {
    25% { box-shadow: none; }
    50% { box-shadow: 2px 0 currentColor; }
    75% { box-shadow: 2px 0 currentColor, 6px 0 currentColor; }
}
@keyframes dot {
    25% { box-shadow: none; }
    50% { box-shadow: 2px 0 currentColor; }
    75% { box-shadow: 2px 0 currentColor, 6px 0 currentColor; }
}
	.loader {
		width: 80px;
		height: 80px;
		margin: 100px auto;
		position: relative;
	}
	.loading{
		position: absolute;
		width: auto;
		left: -30px;
		top: 50px;
		
	}
	.loading h4{
		color: #1abc9c;
		text-align: center;
		font-size: 18px;
	}
	@keyframes ball-spin-fade-loader {
		50% {
			opacity: 0.3;
			-webkit-transform: scale(0.4);
			transform: scale(0.4);
		}
		100% {
			opacity: 1;
			-webkit-transform: scale(1);
			transform: scale(1);
		}
	}
	
	.ball-spin-fade-loader {
		position: relative;
	}
	
	.ball-spin-fade-loader>div:nth-child(1) {
		top: 25px;
		left: 0;
		-webkit-animation: ball-spin-fade-loader 1s 0s infinite linear;
		animation: ball-spin-fade-loader 1s 0s infinite linear;
	}
	
	.ball-spin-fade-loader>div:nth-child(2) {
		top: 17.04545px;
		left: 17.04545px;
		-webkit-animation: ball-spin-fade-loader 1s 0.12s infinite linear;
		animation: ball-spin-fade-loader 1s 0.12s infinite linear;
	}
	
	.ball-spin-fade-loader>div:nth-child(3) {
		top: 0;
		left: 25px;
		-webkit-animation: ball-spin-fade-loader 1s 0.24s infinite linear;
		animation: ball-spin-fade-loader 1s 0.24s infinite linear;
	}
	
	.ball-spin-fade-loader>div:nth-child(4) {
		top: -17.04545px;
		left: 17.04545px;
		-webkit-animation: ball-spin-fade-loader 1s 0.36s infinite linear;
		animation: ball-spin-fade-loader 1s 0.36s infinite linear;
	}
	
	.ball-spin-fade-loader>div:nth-child(5) {
		top: -25px;
		left: 0;
		-webkit-animation: ball-spin-fade-loader 1s 0.48s infinite linear;
		animation: ball-spin-fade-loader 1s 0.48s infinite linear;
	}
	
	.ball-spin-fade-loader>div:nth-child(6) {
		top: -17.04545px;
		left: -17.04545px;
		-webkit-animation: ball-spin-fade-loader 1s 0.6s infinite linear;
		animation: ball-spin-fade-loader 1s 0.6s infinite linear;
	}
	
	.ball-spin-fade-loader>div:nth-child(7) {
		top: 0;
		left: -25px;
		-webkit-animation: ball-spin-fade-loader 1s 0.72s infinite linear;
		animation: ball-spin-fade-loader 1s 0.72s infinite linear;
	}
	
	.ball-spin-fade-loader>div:nth-child(8) {
		top: 17.04545px;
		left: -17.04545px;
		-webkit-animation: ball-spin-fade-loader 1s 0.84s infinite linear;
		animation: ball-spin-fade-loader 1s 0.84s infinite linear;
	}
	
	.ball-spin-fade-loader>div {
		background-color:#1abc9c;
		width: 15px;
		height: 15px;
		border-radius: 100%;
		margin: 2px;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
		position: absolute;
	}
</style>
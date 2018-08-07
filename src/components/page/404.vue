<template>
    <div>
    	<div style="background: white;position: absolute;top: 0;left: 0;right: 0;bottom: 0;">
    		<div class="page-404">
    		    <div class="txt-right">
    		        <p>很抱歉~~</p>
    		        <p class="pl-30" style="margin-bottom: 8px;">你访问的页面弄丢了！</p>
    		        <router-link to="/"><label class="btn btn-default">返回首页</label></router-link>
    		    </div>
    		</div>
    	</div>
    </div>
</template>
<script>
export default {
    mounted: function() {
        
    }
}
</script>
<style>
.page-404 {
	position: absolute;
	top:50%;
	left:50%;
	background: #fff url("/static/css/images/404.png") no-repeat;
	width: 760px;
	height: 348px;
	color:#666;
	margin-left: -380px;
	margin-top: -224px;
}
.page-404 .txt-right{
	padding-top:100px;
	text-align: left;
	letter-spacing: 3px;
	font-size: 18px;
	margin-right: 10px;
	float:right;
}
.page-404 span{
	float:right;
	padding-right: 60px;
	padding-top: 10px;
	text-align: center;
}
</style>
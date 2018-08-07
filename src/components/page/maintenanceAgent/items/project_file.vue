<template>
    <div>  
		<project_file :propsData="propsData"></project_file>
    </div>
</template>
<script>
	import project_file from 'components/page/maintenanceAgent/items/common/project_file.vue';
    export default {
        data:function (){
            return {
            	propsData:{
            		ProjectId:''
            	}
            }
        },
        components:{
        	project_file
        },
        methods: {},
        watch: {
           
        },
         updated:function(){
        },
        mounted:function(){
		}	
    }
</script>
<style>
   
</style>
<template>
	<div id="item-index" class="">
			
			<!--项目列表结束-->
				<item-lists v-if="get_isRenderPro_index"></item-lists>
        		<add-project v-if="!get_isRenderPro_index"></add-project>
           <!--添加项目结束-->
          
	</div>
</template>
 
  <script>
  	 import itemLists from './subComponents/project/project_list.vue';
	import addProject from './subComponents/project/addProject.vue';
  	 import {mapGetters,mapMutations} from 'vuex'
  	export default{
  		data(){
  		return{
  			
  		}
  	},
  	components:{
  		addProject,
  		itemLists
  	},
  	computed:{
  		  ...mapGetters(['get_isRenderPro_index']),
  	},
  	created(){
  		this.getRenderProject(true);
  		 
  	},
  	methods:{
  		...mapMutations({
        		renderProject:'RENDER_PRO_INDEX'
        	}),
		getRenderProject(isRender){
    		this.renderProject({isRender:isRender});
    	}
  	},
  	mounted(){
  		console.log($(".body-content"))
		
  	}
  	}
  </script>
  <style type="text/css">
  	
  </style>

<template>
    <div class="h100p">  
        <work_order :propsData="projectData"></work_order>
    </div>
</template>
<script>
import work_order from './common/work_order.vue';
export default {
    data: function (){
        return {
            projectData: {
                ProjectId: ''
            }
        }
    },
    components:{
        work_order
    }
}
</script>
<style>
.h100p{height: 100%;}
</style>
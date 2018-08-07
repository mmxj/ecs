<template>
    <div style="height: 100%">  
        <record :propsData="projectData"></record>
    </div>
</template>
<script>
import record from './common/record.vue';
export default {
    data: function (){
        return {
            projectData: {
                ProjectId: ''
            }
        }
    },
    components:{
        record
    }
}
</script>
<style>
    
</style>
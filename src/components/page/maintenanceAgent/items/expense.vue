<template>
    <div>  
        <expense :propsData="projectData"></expense>
    </div>
</template>
<script>
import expense from './common/expense.vue';
export default {
    data: function (){
        return {
            projectData: {
                ProjectId: '',
                ProjectName: ''

            }
        }
    },
    components:{
        expense
    }
}
</script>
<style>
    
</style>
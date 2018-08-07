<template>
    <div>  
        <maintenance_plan :myData="equipmentData"></maintenance_plan>
    </div>
</template>
<script>
import maintenance_plan from './common/maintenance_plan.vue';
export default {
    data: function (){
        return {
            equipmentData: {
                EquipmentId: '',
                ProjectId: '',
                MaintainPlanId: ''
            }
        }
    },
    components:{
        maintenance_plan
    }
}
</script>
<style>
    
</style>
<template>
    <div>  
        <fault_warning :myData="equipmentData"></fault_warning>
    </div>
</template>
<script>
import fault_warning from './common/fault_warning.vue';
export default {
    data: function (){
        return {
            equipmentData: {
                EquipmentId: '',
                ProjectId: ''
            }
        }
    },
    
    components:{
        fault_warning
    }
}
</script>
<style>
    
</style>
<template>
    <div>  
        <event_log :myData="equipmentData"></event_log>
    </div>
</template>
<script>
    import event_log from './common/event_log.vue';
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
            event_log
        }
    }
</script>
<style lang="less" scoped="scoped">
  .ctr_commonDialog {
    position: relative;
    .fontStyle {
      font-size: 14px;
      color: #8492A6;
    }
  }
</style>
<template>
  <div class="ctr_commonDialog" style="position: relative;">
    <el-dialog v-if="get_ctrData.dialogVisible" style="" :append-to-body='true' :modal-append-to-body="true" :title="formItems.title" :visible="get_ctrData.dialogVisible" :before-close="handleClose" width="500px">
      <div class="ctr">
        <el-form :model="formItems" :rules="rules" ref="formItems" label-width="100px" label-position="right">
          <el-form-item :label="formItems.currValLabel" class="selec_pd"> <span>{{get_ctrData.valContent}}</span> </el-form-item>
          <el-form-item prop="settingState" :label="formItems.currSetValLabel" style="" class="selec_pd ">
            <el-input placeholder="请输入设定值" v-if="get_ctrData.Status.length==0" style="width:49%" v-model="formItems.settingState" size='small'></el-input>
            <el-select placeholder="请选择状态" v-if="get_ctrData.Status.length>0" style="width:49%" v-model="formItems.settingState" size='small' class='por'>
              <el-option v-for="(item, index) in get_ctrData.Status" :key="index" :label="item.Key" :value="item.Value"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="验证码：" class="chartName_input" prop="verCode">
            <el-input style="width:49%" v-model="formItems.verCode" size='small'></el-input>
            <el-button style="width:49%;padding-left: 8px; padding-right: 8px;" type="warning" :disabled="spareTime!=0 && sendClick" @click="sendCore()"> <span v-if="spareTime!=0 && sendClick">{{spareTime}}s后重新获取</span> <span v-if="!(spareTime!=0 && sendClick)">手机获取验证码</span> </el-button>
          </el-form-item>
        </el-form>
      </div> <span slot="footer" class="dialog-footer">
			    <el-button @click="handleClose()">取 消</el-button>
			    <el-button type="primary" @click="saveCurrSetting()">确定</el-button>
			  </span> </el-dialog>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        rules: {
    	settingState: [{
            required: true,
            message: '设定值不能为空',
            trigger: 'blur'
          }],
          verCode: [{
            required: true,
            message: '请填写验证码',
            trigger: 'blur'
          }]
        },
        formItems: {
          settingState: '',
          verCode: '',
          title:'',
          currValLabel:'当前值：',
          currSetValLabel:'设定值：',
        },
        allTime: 60,
        runedTime: 0,
        sendClick: false,
        items: []
      }
    },
    components: {},
    watch: {},
    computed: { ...mapGetters(['get_ctrData']),
      spareTime() {
        return this.allTime - this.runedTime;
      }
    },
    mounted() {
    	let vm=this;
    	vm.formItems.title=`设定"${vm.get_ctrData.DisplayName.slice(0,vm.get_ctrData.DisplayName.length-1)}"`
    	if(vm.get_ctrData.Status.length>0){
    		vm.formItems.currValLabel='当前状态：'
    		vm.formItems.currSetValLabel='设定状态：'
    	}
    },
    methods: { ...mapMutations({
        uPDATE_VCOUNT: 'UPDATE_VCOUNT',
        uPDATE_CTRDATA: 'UPDATE_CTRDATA'
      }),
      EquipmentDataIssue() {
        let vm = this;
			vm.items=[];
        	vm.items.push({
	    		key:this.get_ctrData.RegisterAddress,
	        	Value:this.formItems.settingState
        	});
        let param = {
          "AccessToken": eosCommon.storage.get('AccessToken'),
          "Parameters": {
            "Code": vm.formItems.verCode,
            "EquipmentId": vm.get_ctrData.EquipmentId,
            "Items": vm.items
          }
        };
        let url = eosCommon.ENTERPRISE_API + "API/Equipment/EquipmentDataIssue";
        eosCommon.eosAjax(url, "post", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.uPDATE_CTRDATA({
              dialogVisible: false,
              EquipmentId: '',
              valContent: '',
              Status: [],
              DisplayName: '',
              finiedDialogVisi: false
            });
	         	vm.formItems={
		          settingState: '',
		          verCode: ''
		        },
            eosCommon.eosMessage("success", '操作完成，请等待数据刷新。', true);
          }
        });
      },
      sendCore() {
        this.sendClick = true;
        this.CreateCode();
      },
      CreateCode() {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get('AccessToken')
        };
        let url = eosCommon.ENTERPRISE_API + "/API/VerificationCode/CreateCode";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.allTime = 60;
            vm.runedTime = 0;
            let timer = setInterval(() => {
              vm.runedTime++;
              if(vm.spareTime == 0) {
                clearInterval(timer);
                vm.sendClick = false;
              }
            }, 1000);
          }
        });
      },
      saveCurrSetting() {
        let vm = this;
        vm.$refs['formItems'].validate((valid) => {
          if(valid) {
            vm.EquipmentDataIssue();
          } else {
            return false;
          }
        });
      },
      handleClose(done) {
      	let vm=this;
        vm.uPDATE_CTRDATA({
          dialogVisible: false,
          EquipmentId: '',
          valContent: '',
          Status: [],
          DisplayName: '',
          finiedDialogVisi: false
        });
         	vm.formItems={
	          settingState: '',
	          verCode: ''
	        }
      }
    }
  }
</script>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
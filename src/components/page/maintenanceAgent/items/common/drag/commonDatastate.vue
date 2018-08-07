<style scoped="scoped" lang="less">
  .commonState {
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
    img.scalNormal {
      width: 100%;
      height: 100%;
      transition: all .5s;
      position: relative;
    }
    img.scalSmall {
      width: 70%;
      height: 70%;
      transition: all .5s;
      position: relative;
    }
  }
</style>
<template>
  <div class="commonState">
    <el-tooltip v-if="propsData.stateValue==0" class="item" effect="dark" placement="right-start">
      <div slot="content" style="text-align: center;">
        {{DisplayName_s}}<br/><span v-if="isPublish==1 && IsIssue==1 && get_expOself">双击可设定</span>
      </div>
      <img @dblclick="showDialog()" :class="[isDataChange ? 'scalSmall' : 'scalNormal']" src="static/css/images/new_drag/15.png" />
      <!--停机-->
    </el-tooltip>
    <el-tooltip v-if="propsData.stateValue==1" class="item" effect="dark" placement="right-start">
      <div slot="content" style="text-align: center;">
        {{DisplayName_s}}<br/><span v-if="isPublish==1 && IsIssue==1 && get_expOself">双击可设定</span>
      </div>
      <img @dblclick="showDialog()" :class="[isDataChange ? 'scalSmall' : 'scalNormal']" src="static/css/images/new_drag/14.png" />
      <!--开机-->
    </el-tooltip>
    <el-tooltip v-if="propsData.stateValue==2" class="item" effect="dark" placement="right-start">
      <div slot="content" style="text-align: center;">
        {{DisplayName_s}}<br/><span v-if="isPublish==1 && IsIssue==1 && get_expOself">双击可设定</span>
      </div>
      <img @dblclick="showDialog()" :class="[isDataChange ? 'scalSmall' : 'scalNormal']" src="static/css/images/new_drag/16.png" />
      <!--未知-->
    </el-tooltip>
  </div>

</template>
<script>
  import {
    testProtocol,
    deletePanel
  } from 'src/assets/js/common/util';
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import commonDialog from './commonDialog'
  export default {
    data() {
      return {
        id: '',
        AccessToken: eosCommon.storage.get("AccessToken"),
        isDataChange: false,
        protocolList: [],
        DisplayName: '',
        ctrData: {
          dialogVisible: false,
          dataName: this.DisplayName,
          finiedDialogVisi: false
        },
        timer: null,
        isPublish: false,
        IsIssue: 0,
        Status: []
      }
    },
    props: ['propsData', 'currentkey'],
    components: {
      commonDialog
    },
    watch: {
      "get_freshTime_Data.Time" (val, oldVal) {
        this.isDataChange = true;
        setTimeout(() => {
          this.isDataChange = false;
        }, 500);
      },
      "propsData.dataStream.RegisterAddress" (val, oldVal) {
        let vm = this;
        if(vm.protocolList == 0) {
          let res = testProtocol(...vm.testParams);
          if(res.length > 0) {
            vm.propsData.protocolList = vm.protocolList = res;
            vm.handleCurr();
          }
        } else {
          vm.handleCurr();
        }
      }
    },
    created() {
      /*let vm = this;
      let opera = vm.get_treeMenu.filter((val) => {
        if(val.children) {
          return val.children.some((v, k, n) => {
            return v.file == 'wb_items_manage' ||
              v.file == 'yz_items_manage' ||
              v.file == 'project_list'
          })
        }
      });
       vm.isPublish = JSON.parse(opera[0].children[0].OperateSet)['PUBLISH'];
      * */
      let vm=this;
     vm.isPublish=vm.get_isCanCtrl;
     
    },
    mounted() {
      let vm = this;
      vm.id = "edit_" + vm.propsData.refs
      if(vm.propsData.IsEquipment) {
        let res = [...vm.get_protocol_data];        
        vm.protocolList = res.filter((val) => {
          return val.Status.length > 0;
        });
        vm.propsData.protocolList = vm.protocolList;
        vm.handleCurr();
      } else {      	
        if(vm.propsData.dataStream.EquipmentId == '') {
          return;
        }
        let res = testProtocol(...vm.testParams);
        if(res.length > 0) {
          vm.propsData.protocolList = vm.protocolList = res;
          vm.handleCurr();
        } else {       	
          vm.getProtocolList();
        }
      }
    },
    computed: {
      ...mapGetters([
				"get_protocol_data",
				"get_equipment_data",
				'get_freshTime_Data',
				'get_treeMenu',
				'get_expOself',
				'get_STORE_protocol',
				'get_isCanCtrl'
			]),
      DisplayName_s() {
        return this.DisplayName ? this.DisplayName : '请选择协议地址';
      },
      testParams() {
        let vm = this;
        return [vm.get_STORE_protocol, vm.propsData.dataStream.EquipmentId, 'datastate'];
      }
    },
    methods: {
      ...mapMutations({
        dELETE_DASHBAORD: 'DELETE_CURR_PANEL',
        gETPROTOCOLDATA: 'GETPROTOCOLDATA',
        gET_EQUIPMENT_DATA: 'GET_EQUIPMENT_DATA',
        uPDATE_OPERATEMEMORY: 'UPDATE_OPERATEMEMORY',
        uPDATE_CTRDATA: 'UPDATE_CTRDATA',
        uPDATE_LOCAL: 'UPDATE_EQLIST'
      }),
      handleCurr() {
        let vm = this;
        for(let val of vm.protocolList) {
          if(vm.propsData.dataStream.RegisterAddress == val.RegisterAddress) {          	
            vm.DisplayName = val.DisplayName;
            vm.IsIssue = val.IsIssue;
            vm.Status = val.Status;
          }
        }
      },
      showDialog() {
        let vm = this;
        if(!(vm.isPublish == 1 &&
            vm.IsIssue == 1 &&
            vm.get_expOself)) {
          return;
        }
        vm.uPDATE_CTRDATA({
          dialogVisible: true,
          EquipmentId: vm.propsData.dataStream.EquipmentId,
          RegisterAddress: vm.propsData.dataStream.RegisterAddress,
          valContent: vm.propsData.OriginValue,
          Status: vm.Status,
          DisplayName: vm.DisplayName,
          finiedDialogVisi: false
        });
      },
      getEuipmentDatas: function() {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "PageIndex": 1,
          "PageSize": 100,
          "IsDefaultEquipment": 0, // -- 是否只获取第一台设备的数据
          "Parameters": {
            "CompanyId": '', //--业主Id
            "ProjectId": vm.propsData.ProjectId, //--项目Id(必填)
            "GatewayId": '', //-- 网关id, 可传空
            "Keywords": "", //-- 搜索关键字, 可传空
            "OnlineStatus": -1, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
            "AlarmStatus": -1, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
            "RunStatus": -1, //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
            "Status": '0'
          }
        }
        let url = eosCommon.ENTERPRISE_API + "api/equipment/QueryCommonEquipmentList";
        eosCommon.eosAjax(url, "GET", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            if(result.Data instanceof Array) {
              vm.gET_EQUIPMENT_DATA({
                EquipmentList: []
              });
            } else {
              vm.gET_EQUIPMENT_DATA({
                EquipmentList: result.Data.Equipments
              });
            }
          }
        })
      },
      getProtocolList(isChange) {
        let vm = this;
        let res = testProtocol(...vm.testParams);
        if(res.length > 0) {
          vm.propsData.protocolList = vm.protocolList = res;
          vm.handleCurr();
          return;
        }
        let param = {
          "AccessToken": vm.AccessToken,
          "EquipmentId": vm.propsData.dataStream.EquipmentId
        };
        let url = eosCommon.ENTERPRISE_API + "api/Equipment/QueryWorkProtocl";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.uPDATE_LOCAL({
              updateType: 1,
              protocolList: {
                TerminalEquipmentId: vm.propsData.dataStream.EquipmentId,
                ProtocalInfo: [...result.Data]
              }
            })
            let res = [...result.Data]
            vm.protocolList = res.filter((val) => {
              return val.Status.length > 0;
            });
            if(vm.propsData.IsEquipment) {
              vm.gETPROTOCOLDATA({
                protocolList: res
              });
            } else {
              vm.propsData.protocolList = vm.protocolList;
              vm.handleCurr();
            }
          }
        });
      }
    }
  }
</script>
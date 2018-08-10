<style scoped="scoped" lang="less">
  .commonDatablock {
    border-top: 1px solid #D1E3E2;
    div.dataTitle {
      width: 100%;
      height: 28px;
      line-height: 28px;
      font-size: 12px;
      text-align: center;
      color: #1F2D3D;
      font-weight: bolder;
      border-bottom: 1px solid #D1E3E2;
      border-left: 1px solid #D1E3E2;
      border-right: 1px solid #D1E3E2;
      background: #EEF6F6;
      margin: 0px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .singleBlock {
      width: 100%;
      height: 28px;
    }
  }
</style>
<template>
  <div class="commonDatablock" :style="datablockStyles" style="width: 100%; height: 100%; margin:0 auto;">
    <div :style="titleStyles" class="dataTitle">{{propsData.title}}</div>
    <div v-if="isLoaded" v-for="(item ,index) in singleDatablockLists" class="singleBlock">
      <commonsingle-datablock :blockID="propsData.refs" :singleDatablockLists="singleDatablockLists" :isPublish="isPublish" :propsData="item"  :dataValueWidth="valueWidth" v-on:changeDataValueWidth="changeDataValueWidth">
      </commonsingle-datablock>
    </div>
  </div>
</template>
<script>
  import {
    testProtocol
  } from 'src/assets/js/common/util';
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    Chart,
    myChart
  } from 'assets/js/common/dragCommon.js';
  import commonsingleDatablock from './commonsingleDatablock.vue'
  export default {
    data() {
      return {
        protocolList: [],
        currEquipmentId: '',
        currRegisterAddress: '',
        IsIssue: '',
        Status: '',
        singleDatablockLists: [], //singLists: [],
        isLoaded: false,
        isPublish: 0,
        valueWidth:'80'
      }
    },
    props: ['propsData'],
    components: {
      commonsingleDatablock
    },
    computed: {
      ...mapGetters(["get_treeMenu","get_isCanCtrl", "get_protocol_data", "get_STORE_protocol"]),
      testParams() {
        let vm = this;
        return [vm.get_STORE_protocol, vm.currEquipmentId, 'others'];
      },
      datablockStyles() {
        return `background:${this.propsData.editData.datablockBg}`;
      },
      singLists() {
        return this.propsData.singleDatablockLists;
      },
      titleStyles() {
        let vm = this;
        return `background:${
					vm.propsData.editData.datablockTitleBg
				};font-size:${
					vm.propsData.editData.Style.fontSize
				}px;color: ${
					vm.propsData.editData.Style.color
				};font-weight: ${
					vm.propsData.editData.Style.fontWeight
				};font-style:${
					vm.propsData.editData.Style.fontItalic
				};text-decoration:$ {
					vm.propsData.editData.Style.fontUnderLine
				}`
      }
    },
    created() {
     let vm=this;
     vm.isPublish=vm.get_isCanCtrl;
    },
    mounted() {
      this.getSingleDatablockLists();
      this.$set(this,'valueWidth',this.propsData.editData.layOutStyle.ValueWidth);
      this.singleDatablockLists = this.singLists
    },
    methods: {
      ...mapMutations({
        uPDATE_LOCAL: 'UPDATE_EQLIST'
      }),
      async getSingleDatablockLists() {
        let vm = this;
        for(let val of vm.singLists) {
          vm.currEquipmentId = val.dataStream.EquipmentId;
          vm.currRegisterAddress = val.dataStream.RegisterAddress;
          if(vm.propsData.IsEquipment) {
            await vm.getLocalProtocol();
          } else {
            await vm.getCuProtocolList(val);
          }
          if(vm.currEquipmentId == '') {
            val.IsIssue = 0;
            val.Status = [];
          } else {
            val.IsIssue = vm.IsIssue;
            val.Status = vm.Status;
          }
        }
        vm.isLoaded = true;
      },
      getLocalProtocol() {
        let vm = this;
        return new Promise((resolve, reject) => {
          if(vm.get_protocol_data.length == 0) {
            resolve();
          }
          for(let v of vm.get_protocol_data) {
            if(vm.currRegisterAddress) {
              if(vm.currRegisterAddress == v.RegisterAddress) {
                vm.IsIssue = v.IsIssue;
                vm.Status = v.Status;
              }
              resolve()
            } else {
              resolve()
            }
          }
        });
      },
      getCuProtocolList(myVal) {
        let vm = this;
        return new Promise((resolve, reject) => { //异步执行
          if(vm.currEquipmentId == '') {
            resolve();
            return;
          }

          let res = testProtocol(...vm.testParams);

          if(res.length > 0) {
            myVal.protocolList = res;
            for(let v of myVal.protocolList) {
              if(vm.currRegisterAddress) {//登录地区
                if(vm.currRegisterAddress == v.RegisterAddress) {
                  vm.IsIssue = v.IsIssue;
                  vm.Status = v.Status;
                  resolve()
                }
              }
            }
            return;
          }
          let param = {
            "AccessToken": eosCommon.storage.get('AccessToken'),
            "EquipmentId": vm.currEquipmentId
          };
          let url = eosCommon.ENTERPRISE_API + "api/Equipment/QueryWorkProtocl";
          console.log(vm.currEquipmentId)
          eosCommon.eosAjax(url, "get", param, "json", function(result) {

            if(eosCommon.checkCode(result.State, result.Message)) {
              vm.uPDATE_LOCAL({
                updateType: 1,
                protocolList: {
                  TerminalEquipmentId: vm.currEquipmentId,
                  ProtocalInfo: [...result.Data]
                }
              })
              myVal.protocolList = [...result.Data];
              for(let v of myVal.protocolList) {
                if(vm.currRegisterAddress) {
                  if(vm.currRegisterAddress == v.RegisterAddress) {
                    vm.IsIssue = v.IsIssue;
                    vm.Status = v.Status;
                  }
                }
              }
              resolve()
            }
          });
        })
      },
      changeDataValueWidth(width){
        this.$set(this,'valueWidth',width);
        for(var item in this.singleDatablockLists){
          this.$set(this.singleDatablockLists[item],'ValueWidth',width+'' );
        }
      }
    }
  }
</script>

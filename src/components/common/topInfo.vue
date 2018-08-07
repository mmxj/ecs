<style scoped lang='scss'>
.topUnitWrap {
  width: 20%;
  float: left;
  overflow: hidden;
  background: #FAFAFA;
  position: relative;
}

.topUnitCont {
  height: 115px;
  width: 200px;
  margin: 0 auto;
}

.topTitle {
  cursor: pointer;
  width: 100%;
  height: 30px;
  line-height: 30px;
  color: #1F2D3D;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  position: relative;
}

.topTitleBG {
  width: 100%;
  height: 30px;
  background: #EEF6F6;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}

.imgWrap {
  width: 75px;
  height: 85px;
  float: left;
  cursor: pointer;
  & img {
    margin-top: 10px;
  }
}

.txtWrap {
  height: 85px;
  display: inline-block;
  float: left;
  padding-top: 10px;
  color: #828282;
  & p {
    cursor: pointer;
  }
  & span {
    color: #1F2D3D;
    font-size: 16px;
    font-weight: bold;
    padding-left: 5px;
  }
  & span.warn {
    color: #E84F3F;
  }
}

</style>
<template>
  <div class='topUnitWrap'>
    <div class="topUnitCont">
      <div class="topTitle" @click="goTo('yz_equipments_manage',{'EquipmentTypeId':propsData.EquipmentTypeId})">{{propsData.TypeName}}</div>
      <div class="imgWrap">
        <img :src="topicIcon" width="68px" @click="goTo('yz_equipments_manage',{'EquipmentTypeId':propsData.EquipmentTypeId})" />
      </div>
      <div class="txtWrap">
        <p @click="goTo('yz_equipments_manage',{'EquipmentTypeId':propsData.EquipmentTypeId})">总设备数:<span>{{propsData.TotalNum}}</span></p>
        <p @click="goTo('yz_equipments_manage',{'EquipmentTypeId':propsData.EquipmentTypeId,'OnlineStatus':'0'})">离线设备数:<span>{{propsData.OffLineNum}}</span></p>
        <p @click="goTo('yz_equipments_manage',{'EquipmentTypeId':propsData.EquipmentTypeId,'AlarmStatus':4})">报警设备数:<span class="warn">{{propsData.AlarmNum}}</span></p>
      </div>
    </div>
    <div class="topTitleBG"></div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
let FUNC = Common.Func
export default {
  data: function() {
    return {
      topicIcon: '',
    }
  },
  props: ['type', 'propsData', 'goTo'],
  computed: {},
  methods: {
    linkTo(AlarmStatus) {
      // console.log(this.propsData.EquipmentTypeId, this.propsData.TypeName)
      this.$router.push({ name: this.routerName, params: { type: 0, EquipmentTypeId: this.propsData.EquipmentTypeId, AlarmStatus: AlarmStatus || '' } })
    },
  },
  mounted() {
    let vm = this
    switch (vm.type) {
      case 1:
        vm.topicIcon = '../../../static/images/topInfo/4-1.png'
        break;
      case 2:
        vm.topicIcon = '../../../static/images/topInfo/4-2.png'
        break;
      case 3:
        vm.topicIcon = '../../../static/images/topInfo/5.png'
        break;
      case 4:
        vm.topicIcon = '../../../static/images/topInfo/6-1.png'
        break;
      case 5:
        vm.topicIcon = '../../../static/images/topInfo/6-2.png'
        break;
      case 6:
        vm.topicIcon = '../../../static/images/topInfo/6-3.png'
        break;
      default:
        // console.log(this.type)
    }
  }
}

</script>

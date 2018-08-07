<template>
  <div class="main">
    <div class="container" :style='containerStyle' @click='linkTo'>
      <div class="wave" :style='waveStyle'></div>
      <div class="wave2"></div>
      <div class="text">{{text}}</div>
    </div>
    <div class="pointerLine" :style='waveStyle' @click='linkTo'></div>
    <div class="pointerIcon" @click='linkTo'>
      <img class="pointerIconImg" :src='src'>
      <div class="description">{{description}}</div>
    </div>
  </div>

</template>
<script>
import * as Common from 'src/assets/js/common';
let FUNC = Common.Func
export default {
  data: function() {
    return {
      borderColor:'',
      bgColor:'',
      src:'',
      description:'',
      EntitySort:'',
      urlType:'',
      urlName:'_equipments_manage'
    }
  },
  props:['text','type'],
  computed:{
    containerStyle(){
      return {
        borderColor:this.borderColor
      }
    },
    waveStyle(){
      return {
        backgroundColor:this.bgColor
      }
    },
    routerName(){
      return `${this.urlType}${this.urlName}`
    }
  },
  methods:{
    linkTo(){
      this.$router.push({name:this.routerName,params: { type: this.type}})
    }
  },
  mounted(){
    let vm = this
    vm.EntitySort = FUNC.storage.get("EntitySort")
    if (vm.EntitySort == 0) {
      vm.urlType = 'yz'
    }else{
      vm.urlType = 'wb'
    }
    switch(vm.type)
    {
    case '0':
      vm.borderColor='#C1E0F4'
      vm.bgColor='#3498DB'
      vm.src='../../static/images/indexCircle/8.png'
      vm.description='设备总数'
      break;
    case '1':
      vm.borderColor='#BFEFD4'
      vm.bgColor='#2ECC71'
      vm.src='../../static/images/indexCircle/9.gif'
      vm.description='运行设备数'
      break;
    case '2':
      vm.borderColor='#B9EAE1'
      vm.bgColor='#1ABC9C'
      vm.src='../../static/images/indexCircle/16.png'
      vm.description='停机设备数'
      break;
    case '3':
      vm.borderColor='#F8C9C4'
      vm.bgColor='#E74C3C'
      vm.src='../../static/images/indexCircle/11.gif'
      vm.description='告警设备数'
      break;
    case '4':
      vm.borderColor='#ECEFF4'
      vm.bgColor='#C0CCDA'
      vm.src='../../static/images/indexCircle/10.png'
      vm.description='离线设备数'
      break;

    default:
      console.log(this.type)
    }
  }
}
</script>
<style lang='less' scoped>
.description{
  position: relative;
  left: -50%;
  text-align: center;
  font-size: 16px;
  margin-top: 5px;
  color: #333
}
.pointerIconImg{
  position: relative;
  left: -18px
}
.pointerIcon{
  cursor: pointer;
  position: relative;
  left: 50%;
  top: -10px;

}
.pointerLine{
  cursor: pointer;
  position: relative;
  height: 60px;
  width: 1px;
  left: 50%;
  top: -10px;
  // transform: translate(-50%, -50%);
}
.container {
  cursor: pointer;
  width: 150px;
  height: 150px;
  padding: 0;
  border: 10px solid rgb(118, 218, 255);
  transform: translate(0%, 0%);
  border-radius: 50%;
  overflow: hidden;
}
.text{
  font-size: 40px;
  font-weight: bold;
  position: relative;
  top:-180%;
  z-index: 11;
  text-align: center;
  color: #FFF;
}
.wave {
  position: relative;
  width: 130px;
  height: 130px;
  border-radius: 50%;


  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    top: 305%;
    background-color: rgba(255, 255, 255, .4);
    border-radius: 45%;
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 6s linear infinite;
    z-index: 10;
  }
  
  &::before{
    left: 90%;
    opacity: .9;
  }

  &::after {
    left: 20%;
    border-radius: 47%;
    background-color: rgba(255, 255, 255, .5);
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 10s linear -5s infinite;
    z-index: 20;
  }
}

.wave2 {
  position: relative;
  top: -100%;
  width: 140px;
  height: 140px;
  // background-color: rgb(118, 218, 255);
  border-radius: 50%;

  &::before,
  &::after {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    top: 290%;
    background-color: rgba(255, 255, 255, .3);
    border-radius: 45%;
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 7s linear infinite;
    z-index: 10;
  }
  
  &::before{
    left: 50%;
    opacity: .9;
  }

  &::after {
    left: 40%;
    border-radius: 47%;
    background-color: rgba(255, 255, 255, .2);
    transform: translate(-50%, -70%) rotate(0);
    animation: rotate 10s linear -5s infinite;
    z-index: 20;
  }
}

@keyframes rotate {
  50% {
    transform: translate(-50%, -73%) rotate(180deg);
  }
  100% {
    transform: translate(-50%, -70%) rotate(360deg);
  }
}

</style>

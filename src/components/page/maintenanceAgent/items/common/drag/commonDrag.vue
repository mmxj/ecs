<template>
  <div style="padding: 5px; overflow: hidden;" :style="[propsData.editData.layOutStyle]" :id="id" :class="className" class="drag">
    <div class="resizeL resize" style="background: url(/static/images/dot.png) repeat-y 100%;">
      <div class="dot" style="position: absolute; background: #fff; top:50%;margin-top:-6px; margin-left:2px;width: 12px; height: 12px; border: 1px solid #59c7f9; border-radius: 12px;">
      </div>
    </div>
    <div class="resizeT resize" style="background: url(/static/images/dot.png) repeat-x 100%;">
      <div class="dot" style="position: absolute; background: #fff; margin-top:-1px; left: 50%; margin-left:-10px;width: 12px; height: 12px; border: 1px solid #59c7f9; border-radius: 12px;">
      </div>
    </div>
    <div class="resizeR resize" style="background: url(/static/images/dot.png) repeat-y 0">
      <div class="dot" style="position: absolute; background: #fff; top:50%; margin-top:-6px; margin-left:-5px;width: 12px; height: 12px; border: 1px solid #59c7f9; border-radius: 12px;">
      </div>
    </div>
    <div class="resizeB resize" style="background: url(/static/images/dot.png) repeat-x top">
      <div class="dot" style="position: absolute; background: #fff;left:50%; margin-top:-6px; margin-left:-10px;width: 12px; height: 12px; border: 1px solid #59c7f9; border-radius: 12px;">
      </div>
    </div>
    <div class="resizeLT resize"></div>
    <div class="resizeRT resize"></div>
    <div class="resizeRB resize"></div>
    <div class="resizeLB resize"></div>
    <slot></slot>
  </div>
</template>
<script>
  import {
    Dragcomponent
  } from 'assets/js/common/dragCommon.js'; //引入封装好的拖拉函数
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        id: '',
        className: '',
        layOutStyle: {
          left: '',
          top: '',
          width: '',
          height: ''
        }
      }
    },
    watch: {
      get_curr_setting(val, oldval) {
      	let vm=this;
      	let params=[
			`.${vm.className}`,
        vm.propsData.refs,
        vm.propsData.typeName,
        val
		];
        // 生成新的拖拽组件 传入基础数据
        new Dragcomponent(...params)
      }
    },
    props: ['propsData'],
    computed: {
      ...mapGetters([
  		'get_curr_setting'
  	])
    },
    mounted() {
    	let vm=this;
      let patt = new RegExp(`chart`);
      let patt2 = new RegExp(`dashboard`);
      vm.id = `wrap_${vm.propsData.refs}`;
      vm.className = `com_${vm.propsData.refs}`;
      if(patt.test(vm.propsData.refs) ||
        patt2.test(vm.propsData.refs)) {
        /**********如果是曲线*****************/
        return;
      }

		let params=[
			`.${vm.className}`,
        vm.propsData.refs,
        vm.propsData.typeName,
        vm.get_curr_setting //值 true 或false
		];
      vm.$nextTick(() => {
        new Dragcomponent(...params)
      });

    }
  }
</script>
<style scoped="scoped">
  .drag {
    width: 200px;
    height: 100px;
    position: absolute;
    top: 100px;
    left: 100px;
    font-size: 14px;
    z-index: 5;
  }
  
  .title {
    height: 35px;
    line-height: 35px;
    color: darkred;
    font-weight: bolder;
    width: 100%;
    border-bottom: 1px solid #DDDDDD;
  }
  
  .title h3 {
    text-align: center;
  }
  
  .resize {
    display: none;
    z-index: 10;
  }
  
  .resizeB {
    width: 100%;
    height: 6px;
    position: absolute;
    bottom: 0px;
    cursor: n-resize;
  }
  
  .resizeL {
    width: 8px;
    height: 100%;
    position: absolute;
    left: 0px;
    top: 0;
    cursor: w-resize;
  }
  
  .resizeT {
    width: 99%;
    height: 8px;
    position: absolute;
    top: 1px;
    cursor: n-resize;
  }
  
  .resizeR {
    width: 8px;
    height: 100%;
    position: absolute;
    right: 0px;
    top: 0;
    cursor: w-resize;
  }
  
  .resizeLT {
    width: 12px;
    height: 12px;
    border: 1px solid #59c7f9;
    border-radius: 12px;
    background: #fff;
    position: absolute;
    top: 0px;
    left: 0;
    cursor: nw-resize;
  }
  
  .resizeLB {
    width: 12px;
    height: 12px;
    border: 1px solid #59c7f9;
    border-radius: 12px;
    background: #fff;
    position: absolute;
    bottom: 0px;
    left: 0;
    cursor: ne-resize;
  }
  
  .resizeRT {
    width: 12px;
    height: 12px;
    border: 1px solid #59c7f9;
    border-radius: 12px;
    background: #fff;
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: ne-resize;
  }
  
  .resizeRB {
    width: 12px;
    height: 12px;
    border: 1px solid #59c7f9;
    border-radius: 12px;
    background: #fff;
    position: absolute;
    bottom: 0px;
    right: 0px;
    cursor: nw-resize;
  }
</style>

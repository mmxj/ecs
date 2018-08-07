<template>
  <div class="pull-left" :class="classObject">
    <div class="block_wrap ">
      <div class="block_title"> 
      	<span>{{propsData.name}}</span> 
      	<span v-if="propsData.title!='weather' && canOperate" class="pull-right btn_wrap">
					<button style="font-size: 12px;" id="btnInsert" type="button" @click="comeToClickMsg()" class="btn fullScreen" >
	            <i style="margin-left: 0;" class="fa  fa-cog m-r-5"></i>配置
	        </button>
        </span> 
      </div>
      <div class="block_content_wrap clearfloat">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        myClass: {},
        AccessToken: eosCommon.storage.get("AccessToken"),
      }
    },
    props: ['canOperate', 'propsData', 'otherParams'],
    computed: {
      classObject() {
        let vm = this;
        return {
          'ele_statistics': this.propsData.title == 'ele_statistics',
          'ele_peak': this.propsData.title == 'ele_peak',
          'sub_item': this.propsData.title == 'sub_item',
          'col-xs-3': this.propsData.title == 'ele_peak' || this.propsData.title == 'sub_item',
          'col-sm-3': this.propsData.title == 'ele_peak' || this.propsData.title == 'sub_item',
          'col-md-3': this.propsData.title == 'ele_peak' || this.propsData.title == 'sub_item',
          'col-lg-3': this.propsData.title == 'ele_peak' || this.propsData.title == 'sub_item',
          'eleAndtemperature': this.propsData.title == 'eleAndtemperature',
          'col-xs-4': this.propsData.title == 'eleAndtemperature',
          'col-sm-4': this.propsData.title == 'eleAndtemperature',
          'col-md-4': this.propsData.title == 'eleAndtemperature',
          'col-lg-4': this.propsData.title == 'eleAndtemperature',
          'weather': this.propsData.title == 'weather',
          'col-xs-2': this.propsData.title == 'weather',
          'col-sm-2': this.propsData.title == 'weather',
          'col-md-2': this.propsData.title == 'weather',
          'col-lg-2': this.propsData.title == 'weather',
          'ele_trend': this.propsData.title == 'ele_trend',
          'ele_ringRatio': this.propsData.title == 'ele_ringRatio',
          'col-xs-6': this.propsData.title == 'ele_trend' || this.propsData.title == 'ele_ringRatio',
          'col-sm-6': this.propsData.title == 'ele_trend' || this.propsData.title == 'ele_ringRatio',
          'col-md-6': this.propsData.title == 'ele_trend' || this.propsData.title == 'ele_ringRatio',
          'col-lg-6': this.propsData.title == 'ele_trend' || this.propsData.title == 'ele_ringRatio'
        }
      }
    },
    methods: {
      comeToClickMsg(blockMsg) {
        this.$emit('getClick', this.propsData);
      }
    }
  }
</script>
<style lang="less" scoped="scoped">
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }
  
  .blocks {
    margin-bottom: 15px;
    .block_wrap {
      width: 100%;
    }
  }
  
  .ele_statistics {
    width: 100%;
  }
  
  .ele_peak {
    padding: 0;
    padding-right: 15px;
  }
  
  .sub_item {
    padding: 0;
    padding-right: 15px;
  }
  
  .eleAndtemperature {
    padding: 0;
    padding-right: 15px;
  }
  
  .weather {
    padding: 0;
  }
  
  .ele_trend {
    padding: 0;
    padding-right: 15px;
  }
  
  .ele_ringRatio {
    padding: 0;
  }
  
  .block_title {
    width: 100%;
    height: 45px;
    line-height: 45px;
    border: 1px solid #D1E3E2;
    background: #EEF6F6;
    padding-left: 15px;
    span {
      color: #1F2D3D;
      font-size: 14px;
      font-weight: bolder;
    }
    .fullScreen {
      font-size: 16px;
      padding: 2px 6px;
      background: #fff;
      color: #8492A6;
      text-align: center;
      margin-right: 8px;
      margin-top:10px i {
        margin: 0;
      }
    }
  }
  
  .block_content_wrap {
    border: 1px solid #D1E3E2;
    border-right: none;
    border-top: none;
    width: 100%;
    .block_content {
      width: 25%;
      height: 110px;
      /*display: inline-block;*/
      border-right: 1px solid #D1E3E2;
    }
  }
</style>
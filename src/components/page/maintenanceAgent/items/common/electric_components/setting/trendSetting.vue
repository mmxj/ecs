<style lang="less" scoped="scoped">
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }
  
  .myHr {
    border-top: 1px dashed #d1e3e2;
    height: 2px;
    background: #fff;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .mySolidHr {
    border-top: 1px solid #d1e3e2;
    height: 2px;
    background: #fff;
    color: #fff;
    margin-bottom: 20px;
  }
  
  .fontStyle {
    font-size: 14px;
    color: #8492A6;
  }
  
  .addSetting {
    text-align: center;
    margin-top: 20px;
    .addSettingWrap {
      width: 70px;
      margin: 0 auto;
      cursor: pointer;
    }
  }
  
  .setting_title_tips {
    width: 100%;
    font-size: 14px;
    color: #1F2D3D;
    padding: 8px 0;
  }
  
  .time {
    width: 100%;
    margin-top: 8px;
    margin-bottom: 20px;
    .txtF {
      width: 120px;
      height: 30px;
      line-height: 30px;
    }
    .timeSelect {
      /*width: 100%;*/
      .el-select {
        width: 87px;
      }
      span.min {
        font-size: 14px;
        color: #000000;
      }
    }
  }
</style>
<template>
  <!--ele_trend-->
  <div class="ele_trend">
    <common-setting :otherParams="otherParams" :equipmentDataList="equipmentDataList">
    </common-setting>
  </div>
</template>
<script>
  import commonSetting from './commonSetting.vue'
  export default {
    data() {
      return {}
    },
    components: {
      commonSetting
    },
    props: ['equipmentDataList', 'otherParams']
  }
</script>
<style lang="less" scoped="scoped">
  .myHr {
    border-top: 1px dashed #d1e3e2;
    height: 2px;
    background: #fff;
    color: #fff;
    margin-top: 20px;
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
</style>
<template>
  <div class="ele_statistics">
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
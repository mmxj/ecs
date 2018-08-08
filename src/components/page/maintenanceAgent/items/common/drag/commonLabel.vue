<style scoped="scoped" lang="less">
  .commonLabel {
    .dataName {
      display: block;
      width: 100%;
      text-align: left;
      padding: 0 5px;
      font-size: 14px;
      color: #1F2D3D;
      height: 100%;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .PrePositionStyle {
      display: block;
      width: 70%;
      text-align: right;
      padding: 0 5px;
      font-size: 14px;
      color: #1F2D3D;
      height: 100%;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .dataValue {
      display: block;
      margin-left: 0px;
      font-size: 14px;
      color: #1F2D3D;
      width: 30%;
      padding: 0 5px;
      height: 100%;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .clearfloat:after {
      display: block;
      clear: both;
      content: "";
      visibility: hidden;
      height: 0
    }
    .wh-100 {
      width: 100%;
      height: 100%;
    }
  }
</style>
<template>
  <div class="commonLabel clearfloat wh-100">
    <div v-show="(item.editData.selectDataType=='dataStream')" class="clearfloat wh-100">
      <div :style="PrePositionStyle" class="PrePositionStyle pull-left">
        {{item.editData.PrePositionValue}}
      </div>
      <div class="dataValue pull-left">
        <span v-show="!isDataChange" :style="PostPositionStyle">
			{{item.editData.labelContent}}
		</span>
      </div>
    </div>
    <div v-show="item.editData.selectDataType!='dataStream'" class="clearfloat wh-100">
      <div :style="Styles" class="dataName pull-left">
        {{item.editData.labelContent}}
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        isDataChange: false
      }
    },
    props: ['item'],
    computed: {
      ...mapGetters([
  		'get_freshTime_Data'
  	]),
      _Style() {
        return this.item.editData.Style;
      },
      Styles() {
        let vm = this;
        return `font-size:${vm._Style.fontSize}px;
        color: ${vm._Style.color};
        font-weight: ${vm._Style.fontWeight};
        font-style:${vm._Style.fontItalic};
        text-decoration:${vm._Style.fontUnderLine};`
      },
      _PrePositionStyle() {
        return this.item.editData.PrePositionStyle;
      },
      PrePositionStyle() {
        let vm = this;
        return `font-size:${vm._PrePositionStyle.fontSize}px;
				color: ${vm._PrePositionStyle.color};
				font-weight: ${vm._PrePositionStyle.fontWeight};
				font-style:${vm._PrePositionStyle.fontItalic};
				text-decoration:${vm._PrePositionStyle.fontUnderLine};`
      },
      _PostPositionStyle() {
        return this.item.editData.PostPositionStyle;
      },
      PostPositionStyle() {
        let vm = this;
        return `font-size:${vm._PostPositionStyle.fontSize}px;
				color: ${vm._PostPositionStyle.color};
				font-weight: ${vm._PostPositionStyle.fontWeight};
				font-style:${vm._PostPositionStyle.fontItalic};
				text-decoration:${vm._PostPositionStyle.fontUnderLine};`
      }
    },
    watch: {
      "get_freshTime_Data.Time" (val, oldVal) {
        this.isDataChange = true;
        setTimeout(() => {
          this.isDataChange = false;
        }, 500);
      }
    }
  }
</script>

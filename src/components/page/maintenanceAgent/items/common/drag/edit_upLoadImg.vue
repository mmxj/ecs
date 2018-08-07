<template>
  <div :id="id" class="edit_panel" :class="{isEquipClass:isEquip==true}">
    <h3>底图设置</h3>
    <div class="edit_content my_edit_img">
      <img-upload :panelData="propsData"></img-upload>
    </div>
    <div class="operations" style="">
      <div class="operatesBtns form-inline clearfix">
        <span class="pull-left btn_wrap" style="width: 100%;">
            <button @click='deleteCurrentPanel($event)' id="btnInsert" type="button" style="background: #E74C3C;color: #fff; width: 100%;" class="btn" >
                <i style="margin-left: 0;" class="fa fa-trash-o m-r-5"></i>删除
            </button>
     	</span>
      </div>
    </div>
  </div>
</template>
<script>
  import imgUpload from './img_upLoad'
  import {
    mapMutations
  } from 'vuex'
  import {
    deletePanel
  } from 'src/assets/js/common/util';
  export default {
    data() {
      return {
        //图片上传
        id: '',
        isEquip: false
      }
    },
    props: ['propsData', 'currentkey'],
    components: {
      imgUpload
    },
    mounted() {
      let vm = this;
      vm.id = "edit_" + vm.propsData.refs;
      vm.isEquip = vm.propsData.IsEquipment;
    },
    methods: {
      ...mapMutations({
        dELETE_IMG: 'DELETE_CURR_PANEL'
      }),
      deleteCurrentPanel(event) {
        event.cancelBubble = true;
        deletePanel(this.propsData.refs)
        this.dELETE_IMG({
          typeName: this.propsData.typeName,
          currenIndex: this.propsData.refs,
          isDeleteClick: true,
          isResetOperateMemory: false
        })
      }
    }
  }
</script>
<style lang="less" scoped="scoped">
  .edit_panel {
    width: 280px;
    position: absolute;
    top: 0;
    bottom: 0px;
    right: 0px;
    display: none;
    z-index: 100;
    border: 2px solid #d1e3e2;
    background: #fff;
    & h3 {
      color: #1F2D3D;
      font-size: 14px;
      font-weight: bold;
      width: 100%;
      height: 48px;
      line-height: 48px;
      text-align: center;
      margin: 0;
      border-bottom: 1px solid #eaedef;
      background: #dfeceb;
    }
    & .operations {
      width: 100%;
      height: 48px;
      border-bottom: 1px solid #eaedef;
      background: #eef6f6;
      position: absolute;
      bottom: 0;
      .operatesBtns {
        width: 100%;
        margin-top: 10px;
        .btn_wrap {
          padding: 0 18px;
        }
      }
    }
  }
  
  .isEquipClass {
    top: 40px;
    bottom: 0px;
  }
  
  .edit_content {
    position: absolute;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 10px;
    top: 48px;
    bottom: 48px;
    right: 0;
    width: 100%;
    overflow: auto;
  }
</style>
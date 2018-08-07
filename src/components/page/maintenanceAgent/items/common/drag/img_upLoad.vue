<template>
  <div class="uploadImgWrap">
    <div class="axisSetting my_radio">
      <el-radio-group v-model="upLoadType" @change="upLoadChange">
        <el-radio class="radio" :label="0">本地上传</el-radio>
        <el-radio class="radio" :label="1">平台图库</el-radio>
      </el-radio-group>
    </div>
    <div class="contentBox bd0 img_upLoad">
      <el-row>
        <el-col :span="14" class='pl10'>
          <el-upload ref="OriginalPhotosUpload" :before-upload="beforeImgUpload" :file-list="imgLists" :action="uploadUrl" list-type="picture-card" :data='uploadData' :on-success='updateImg' :on-remove="updateDeleteImg" limit='1'>
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import * as Common from 'src/assets/js/common';
  import {countSubstr} from 'src/assets/js/common/util';
  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  const FUNC = Common.Func;
  const AXIOS = FUNC.axios;
  const GET = AXIOS.get;
  const URL = Common.Const.url;
  const DELETE = Common.Func.axios.delete;
  let vm=null;
  export default {
    data() {
      return {
        //图片上传
        uploadUrl: URL.UPLOADRESOURCE, //上传资源url
        deleteUrl: URL.DELETERESOURCE, //删除资源url
        dialogImageUrl: '',
        dialogVisible: false,
        panelId: '',
        imgLists: [],
        upLoadType: 0,
        IsEquipment: false,
        selectType: 0,
        inputEl: null
      }
    },
    props: ['panelData'],
    watch: {
      'panelData.openScenePic' (val) {
        if(!val) {
          vm.imgLists = [];
          if(vm.get_sedImgDatas.SourceId != '') {
            vm.imgLists.push({
              name: '',
              url: vm.get_sedImgDatas.SourceUrl
            });
          } else {
            return;
          }
          vm.cOME_TO_UPLODEIMG({
            panelId: vm.panelId,
            imgUrl: vm.get_sedImgDatas.SourceUrl,
            ResourceId: vm.get_sedImgDatas.SourceId
          });
          if(vm.imgLists.length >= 1)
            vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none')
        }
      },
      'panelData.openEquiPic' (val) {
        if(!val) {
          vm.imgLists = [];
          if(vm.get_sedImgDatas.SourceId != '') {
            vm.imgLists.push({
              name: '',
              url: vm.get_sedImgDatas.SourceUrl
            });
          } else {
            return;
          }
          vm.cOME_TO_UPLODEIMG({
            panelId: vm.panelId,
            imgUrl: vm.get_sedImgDatas.SourceUrl,
            ResourceId: vm.get_sedImgDatas.SourceId,
            Type: 1
          });
          if(vm.imgLists.length >= 1)
            vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none')
        }
      }
    },
    computed: {
      ...mapGetters([
			'openScenePic',
			'openEquiPic',
			'get_sedImgDatas'
		]),
      //上传资源时的附加参数
      uploadData() {
        return {
          "AccessToken": FUNC.storage.get("AccessToken"),
          "ResourceType": "0",
          "Title": "合同附件",
          "Description": "合同附件"
        }
      }
    },
    mounted() {
      vm = this;     
      vm.panelId = vm.panelData.refs;
      vm.IsEquipment = vm.panelData.IsEquipment;
      if(vm.IsEquipment) {
        vm.panelData.Type == 1 ? vm.upLoadType = 1 : vm.upLoadType = 0;
      }
      if(vm.panelData.editData.imgUrl != '') {
        vm.imgLists.push({
          name: '',
          url: vm.panelData.editData.imgUrl
        })
        vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none')
      }
    },
    methods: {
      ...mapMutations({
        cOME_TO_UPLODEIMG: 'COME_TO_UPLODEIMG',
        sET_IMG_SELECT: 'SET_IMG_SELECT'
      }),
      upLoadChange() {
        if(vm.imgLists.length == 0) {
          vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', '');
        } else {
          vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none');
        }
        vm.inputEl = vm.$refs.OriginalPhotosUpload.$el.querySelector('input');
        vm.inputEl.addEventListener('click', vm.goToPicStorage)
      },
  	beforeImgUpload(file) {
      let patter='image/gif,image/jpg,image/jpeg,image/bmp,image/png';
      const isIMG = countSubstr(patter,file.type);
      const isLt2M = file.size / 1024 / 1024 < 16;
      if (!isIMG) {
        this.$message.error('只能是上传JPG 、 PNG、GIF、JPEG、BMP 格式的图片!');
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 16MB!');
        return false
      }
         return isIMG && isLt2M;
    },
      goToPicStorage() {
        vm.imgLists = [];
        if(vm.upLoadType == 1) {
          //进入平台图库	
          let selectType = 0;
          vm.inputEl.setAttribute('type', 'text');
          vm.IsEquipment ? vm.selectType = 1 : vm.selectType = 0;
          vm.sET_IMG_SELECT({
            selectType: vm.selectType,
            intoImgPage: true,
            refs: vm.panelId,
            sedImgDatas: {
              SourceId: '',
              SourceUrl: ''
            }
          });
        } else if(vm.upLoadType == 0) {
          //本地上传
          vm.inputEl.setAttribute('type', 'file');
        }
      },
      //控制图片上传的继续添加按钮隐藏和显示
      imgUpdateUploadShowAndHide(ref = 'OriginalPhotosUpload', string = '') {
        let el = vm.$refs[ref].$el.childNodes[1]
        el.style.display = string;
      },
      updateImg(res, file, fileList) {
        //当提交一张图片后隐藏上传按钮
        vm.dialogImageUrl = file.url;
        vm.imgLists.push({
          name: '',
          url: vm.dialogImageUrl
        })
        vm.cOME_TO_UPLODEIMG({
          panelId: vm.panelId,
          imgUrl: vm.dialogImageUrl,
          ResourceId: res.Data[0].ResourceId,
          Type: 0,
        });
        if(fileList.length >= 1) vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none')
      },
      updateDeleteImg(res, fileList) {
        //当删除图片后重新显示上传按钮
        vm.imgLists = [];
        vm.cOME_TO_UPLODEIMG({
          panelId: vm.panelId,
          imgUrl: ''
        });
        if(fileList.length == 0) vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', '')
        vm.deleteRes(res)
      },
      deleteRes(resId) {
        let url = vm.deleteUrl
        let data = {
          "AccessToken": FUNC.storage.get("AccessToken"),
          "Parameters": {
            "ResourceId": resId,
            "ResourceType": "2"
          }
        }
        // 删除服务器对应资源
        return DELETE(url, data)
      }
    }
  }
</script>

<style lang="less">
  .img_upLoad {
    .pl10 {
      padding-left: 45px;
      width: 100%;
      margin-top: 10px;
    }
  }
  
  .el-upload--picture-card {
    width: 150px;
    height: 100px;
    position: relative;
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -14px;
      margin-left: -14px;
    }
  }
</style>
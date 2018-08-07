<style lang="less" scoped="scoped">
  .scene_pic {
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;
    .scene_header {
      position: relative;
      width: 100%;
      height: 50px;
      line-height: 50px;
      font-size: 20px;
      color: #1F2D3D;
      font-weight: bold;
      background: #fff;
      border-bottom: 1px solid #BFD9D7;
      padding: 0 15px;
      .pic_back {
        position: absolute;
        right: 15px;
        top: 0;
      }
    }
    .scene_content {
      position: absolute;
      overflow-y: auto;
      top: 65px;
      bottom: 0px;
      left: 15px;
      right: 15px;
      border: 1px solid #BFD9D7;
    }
    .left_panel {
      width: 200px;
      height: 100%;
      background: #DFECEB;
      border-right: 1px solid #BFD9D7;
      p {
        width: 100%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        color: #FEFEFE;
        font-style: normal;
        font-weight: bold;
        background: #1abc9c;
      }
      .el-tree {
        width: 100%;
        border: none;
      }
    }
    .right_panel {
      height: 100%;
      background: #fff;
      position: absolute;
      overflow-y: auto;
      left: 215px;
      right: 0px;
      top: 0;
      bottom: 0;
      padding-right: 15px;
      div.right_scene_header {
        font-size: 14px;
        padding-left: 0;
        padding-right: 0;
        border-bottom: 1px solid #BFD9D7;
        margin-right: 15px
      }
      .commonOperate {
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #BFD9D7;
        padding: 10px 0;
      }
      .content {
        width: 100%;
        position: relative;
        .pic_list {
          width: 100%;
          list-style: none;
          padding: 0;
          margin: 0;
          div.pic_detail {
            padding-bottom: 44px;
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            .selectedIcon {
              position: absolute;
              top: 0;
              right: 0;
              img {
                border: none;
              }
            }
            .deleteImg {
              position: absolute;
              border-top-right-radius: 8px;
              border-top-left-radius: 8px;
              top: 0px;
              right: 0;
              visibility: visible;
              width: 100%;
              height: 24px;
              background: rgba(0, 0, 0, 0.3);
              transition: all .5s;
              a {
                display: block;
                cursor: pointer;
                position: absolute;
                right: 10px;
                top: 1px;
                height: 0;
                color: red;
                font-size: 16px;
              }
            }
            p.pic_descri {
              font-size: 14px;
              color: #1F2D3D;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              position: absolute;
              width: 100%;
              bottom: 12px;
              text-align: center;
              /*top: 50%;
							 margin-top: -7px;*/
            }
          }
          div.pointer {
            cursor: pointer;
          }
          li {
            list-style: none;
            overflow: hidden;
            padding: 0;
            margin: 0;
            background: #fff;
            margin-top: 15px;
            padding: 0;
            padding-right: 17px;
            img {
              width: 100%;
              height: 100%;
              border: 1px solid #BFD9D7;
              border-radius: 5px;
            }
          }
        }
      }
    }
    .noImgData {
      width: 226px;
      height: 200px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -100px;
      margin-left: -113px;
      img {
        width: 226px;
        height: 158px;
      }
      p {
        width: 100%;
        height: 40px;
        line-height: 40px;

        font-size: 16px;
        font-weight: bolder;
        text-align: center;
        color: #1abc9c;
      }
    }
  }
  
  .open_scene_pic {
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 10px;
    right: 10px;
    width: auto;
    height: auto;
    z-index: 300;
  }
</style>
<template>
  <div v-loading="treeLoading" class="scene_pic" :class="{open_scene_pic:openScenePic}">
    <div class="scene_header"> 场景图库
      <div v-if="openScenePic" class="pic_back">
        <el-button @click="cancelImg()" size='small' class='mb5'>取消</el-button>
        <el-button @click="sureImg()" size='small' type="primary" class='mb5'>确定</el-button>
      </div>
    </div>
    <div class="scene_content">
      <div class="left_panel">
        <p>分类</p>
        <!--:default-checked-keys="['554b3846-54ee-11e8-8004-000c295ec690']"-->
        <!--:default-expanded-keys="['554b3846-54ee-11e8-8004-000c295ec690']" ref="myTree"-->
        <!-- :props="defaultProps" -->
        <el-tree ref="myTree" :default-expanded-keys="defaultExpandedKeys" node-key="ImageTypeId" highlight-current :data="menuList" accordion @node-click="handleNodeClick"> </el-tree>
      </div>
      <div v-loading="imgLoading" class="right_panel pull-left">
        <div class="scene_header right_scene_header">{{currTypeName}} </div>
        <div class="commonOperate">
          <el-button v-if="!openScenePic" size='small' @click="addPic()" type="primary" icon='plus' class='mb5'>新增图片</el-button> <span class="w150 mb5">
          	<el-input size='small' v-model="ImageName" placeholder="项目名称"></el-input>
        	</span>
          <el-button size='small' type="primary" icon='search' class='mb5'>查找</el-button>
        </div>
        <div class="content" style="position: absolute;right: 0; left: 0; top: 100px; bottom: 0;overflow-y: auto;">
          <ul v-if="hasImgData" class="pic_list clearfix">
            <li v-for="(item,index) in imgList" class="img-box pull-left col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <div :class="[openScenePic ? 'pointer':'']" @click="openScenePic && clickImg(item,index)" @mouseenter="!openScenePic && showDelete(index,true)" @mouseleave="!openScenePic && showDelete(index,false)" class="pic_detail">
                <div v-if="currImgIndex==(index+1) && openScenePic" class="selectedIcon"> <img src="static/images/imgStorage/imgS.png" /> </div>
                <transition enter-active-class="fadeInDown animated" leave-active-class="fadeOutUp animated" style="z-index:302" name="fadeIn" v-cloak>
                  <div v-if="currImgIndex==(index+1) && !openScenePic" ref='index' class="deleteImg">
                    <a @click="deleteCurrImg(item.ImageId)" title="删除图片"><i class="fa fa-trash-o"></i></a>
                  </div>
                </transition> <img class="scene_p" :src="item.SourceUrl" />
                <p class="pic_descri">{{item.ImageName}}</p>
              </div>
            </li>
          </ul>
          <div v-if="!hasImgData" class="noImgData"> <img src="/static/images/no_pic_data.png" />
            <p>暂无图片数据</p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="上传场景图片" :visible.sync="dialogVisible" width="500px">
      <el-form :model="formItems" :rules="rules" ref="formItems" label-width="100px" label-position="right">
        <el-form-item label="大类名称：" class="selec_pd"> <span>{{currLargeName}}</span> </el-form-item>
        <el-form-item label="小类名称：" style="" class="selec_pd "> <span>{{currSmallName}}</span> </el-form-item>
        <el-form-item label="图片名称：" class="chartName_input" prop="picName">
          <el-input v-model="formItems.picName" size='small'></el-input>
        </el-form-item>
        <el-form-item label="上传图片：" class="chartName_input" prop="ResourceId">
          <el-col :span="14" class='pl10'>
            <el-upload ref="OriginalPhotosUpload" :ResourceId="formItems.ResourceId" :file-list="formItems.imgLists" :action="formItems.uploadUrl" list-type="picture-card" :data='uploadData' :on-success='updateImg' :on-remove="updateDeleteImg" limit='1'> <i class="el-icon-plus"></i> </el-upload>
          </el-col>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
			    <el-button @click="cancelCurrSetting()">取 消</el-button>
			    <el-button type="primary" @click="saveCurrSetting()">提交</el-button>
		  </span> 
    </el-dialog>
    <!--</div>-->
  </div>
</template>
<script type="text/javascript">
  import * as Common from 'src/assets/js/common';
  const FUNC = Common.Func
  const AXIOS = FUNC.axios
  const GET = AXIOS.get
  const URL = Common.Const.url
  const DELETE = Common.Func.axios.delete
  import { debounce } from 'assets/js/common/util'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
        rules: {
          picName: [{
            required: true,
            message: '图片名称不能为空',
            trigger: 'blur'
          }, ],
          ResourceId: [{
            required: true,
            message: '请上传图片',
            trigger: 'blur'
          }, ]
        },
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisible: false,
        menuList: [],
        ParentId: '',
        formItems: {
          largeClass: [],
          smallClass: [],
          picName: '',
          //图片上传
          uploadUrl: URL.UPLOADRESOURCE, //上传资源url
          deleteUrl: URL.DELETERESOURCE, //删除资源url
          imgLists: [],
          ResourceId: ''
        },
        currLargeName: '',
        currLargeId: '',
        currSmallName: '',
        currImageTypeId: '',
        currTypeName: '',
        defaultExpandedKeys: [],
        currImgIndex: '',
        imgList: [],
        ImageName: '',
        treeLoading: true,
        imgLoading: false,
        sedImgDatas: {
          SourceId: '',
          SourceUrl: ''
        },
        hasImgData: false
      };
    },
    watch: {
      ImageName(val, oldval) {
        this.QueryAssemblageImagedepot();
      }
    },
    computed: { ...mapGetters(['openScenePic', 'get_CurrImgRefs']),
      AccessToken() {
        return eosCommon.storage.get("AccessToken");
      },
      uploadData() {
        return {
          "AccessToken": this.AccessToken,
          "ResourceType": "0",
          "Title": "合同附件",
          "Description": "合同附件"
        }
      }
    },
    mounted() {
      let vm = this;
      //this.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none') scene_pic
      let Ensotity = eosCommon.storage.get('EntitySort');
      if(Ensotity == 2 && vm.$route.name=='scene_pic') {
        vm.sET_IMG_SELECT({
          selectType: 3,
          intoImgPage: false,
          refs: vm.get_CurrImgRefs,
          sedImgDatas: vm.sedImgDatas
        });
      }
      $(function() {
        vm.albumsResize();
      });
      $(window).on("resize", function() {
        vm.albumsResize();
      });
      vm.QueryEquipmentImageTypeData();
    },
    methods: { ...mapMutations({
        sET_IMG_SELECT: 'SET_IMG_SELECT'
      }),
      sureImg() {
        let vm = this;
        if(vm.sedImgDatas.SourceId == '' || vm.sedImgDatas.SourceUrl == '') {
          vm.$confirm('还未选择图片, 是否继续返回?', '提示', {
            confirmButtonText: '返回3D图示页面',
            cancelButtonText: '否',
            type: 'warning'
          }).then(() => {
            //确定操作
            vm.sET_IMG_SELECT({
              selectType: 0,
              intoImgPage: false,
              refs: vm.get_CurrImgRefs,
              sedImgDatas: vm.sedImgDatas
            })
          }).catch(() => {})
          return;
        }
        vm.sET_IMG_SELECT({
          selectType: 0,
          intoImgPage: false,
          refs: vm.get_CurrImgRefs,
          sedImgDatas: vm.sedImgDatas
        })
      },
      clickImg(item, index) {
        let vm = this;
        vm.currImgIndex = (index + 1);
        vm.sedImgDatas = {
          SourceId: item.SourceId,
          SourceUrl: item.SourceUrl
        }
      },
      cancelImg() {
        let vm = this;
        vm.sET_IMG_SELECT({
          selectType: 0,
          intoImgPage: false,
          refs: vm.get_CurrImgRefs,
          sedImgDatas: null
        })
      },
      showDelete(index, isEnter) {
        let vm = this;
        if(isEnter) {
          debounce(function() {
            vm.currImgIndex = index + 1;
          }, 100, vm)();
        } else {
          debounce(function() {
            vm.currImgIndex = '';
          }, 500, vm)();
        }
      },
      addPic() {
        let vm = this;
        vm.ParentId = -1;
        //vm.QueryEquipmentImageTypeData();
        vm.dialogVisible = true;
        this.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'block')
      },
      handleNodeClick(data) {
        let vm = this;
        vm.currImgIndex = '';
        vm.sedImgDatas = {
          SourceId: '',
          SourceUrl: ''
        }
        if(data.children) {
          if(data.children.length > 0) {
            vm.setCurrentKey(data.children[0].ImageTypeId);
            vm.currImageTypeId = data.children[0].ImageTypeId;
            vm.currTypeName = data.children[0].label;
            vm.currSmallName = data.children[0].label;
          } else {
            vm.setCurrentKey(data.ImageTypeId);
            vm.currImageTypeId = data.ImageTypeId;
            vm.currTypeName = data.label;
            vm.currSmallName = '';
          }
          vm.currLargeName = data.label;
        } else {
          vm.setCurrentKey(data.ImageTypeId);
          vm.currImageTypeId = data.ImageTypeId;
          vm.currTypeName = data.label;
          vm.currSmallName = data.label;
        }
        vm.QueryAssemblageImagedepot();
      },
      cancelCurrSetting() {
        this.dialogVisible = false;
      },
      saveCurrSetting() {
        let vm = this;
        vm.$refs['formItems'].validate((valid) => {
          if(valid) {
            vm.submitAddData();
          } else {
            return false;
          }
        });
      },
      submitAddData() {
        let vm = this;
        var param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "SourceId": vm.formItems.ResourceId,
            "Type": vm.currImageTypeId,
            "ImageName": vm.formItems.picName
          }
        };
        var url = eosCommon.ENTERPRISE_API + '/api/Assemblage/SetAssemblageImagedepot';
        eosCommon.eosAjax(url, "POST", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            eosCommon.eosMessage("success", '添加成功');
            vm.formItems.ResourceId = '';
            vm.formItems.imgLists = [];
            vm.formItems.picName = '';
            vm.dialogVisible = false;
            vm.QueryAssemblageImagedepot();
          }
        })
      },
      deleteCurrImg(ImageId) {
        let vm = this;
        vm.$confirm('确定删除当前图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.runDeleteImg(ImageId);
        }).catch(() => {})
      },
      runDeleteImg(ImageId) {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "Parameters": {
            "ImageId": ImageId
          }
        };
        let url = eosCommon.ENTERPRISE_API + 'api/Assemblage/DeleteAssemblageImagedepot';
        eosCommon.eosAjax(url, "post", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            eosCommon.eosMessage("success", '删除成功');
            vm.QueryAssemblageImagedepot();
            //console.log('删除成功');
          }
        })
      },
      QueryAssemblageImagedepot() {
        let vm = this;
        vm.imgLoading = true;
        var param = {
          "Type": vm.currImageTypeId,
          "ImageName": vm.ImageName,
          "AccessToken": vm.AccessToken,
          "PageIndex": 1,
          "PageSize": 10
        };
        var url = eosCommon.ENTERPRISE_API + '/api/Assemblage/QueryAssemblageImagedepot';
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.imgLoading = false;
            vm.imgList = result.Data.Images;
            if(vm.imgList.length == 0) {
              vm.hasImgData = false;
              vm.imgList = [];
              return;
            }
            vm.hasImgData = true;
            vm.$nextTick(() => {
              vm.albumsResize();
            })
          }
        })
      },
      QueryEquipmentImageTypeData() {
        let vm = this;
        vm.treeLoading = true;
        var param = {
          "AccessToken": vm.AccessToken,
          "ParentId": ''
        };
        var url = eosCommon.ENTERPRISE_API + '/api/Assemblage/QueryEquipmentImageTypeData';
        eosCommon.eosAjax(url, "GET", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.treeLoading = false;
            let data = result.Data;
            if(data.length > 0) {
              if(vm.ParentId == '') {
                for(let i of Object.keys(data)) {
                  let singleMenuInfo = {
                    ImageTypeId: '',
                    label: '',
                    children: []
                  }
                  singleMenuInfo.ImageTypeId = data[i].ImageTypeId;
                  singleMenuInfo.label = data[i].TypeName;
                  if(data[i].Items.length > 0) {
                    let Items = data[i].Items;
                    for(let j of Object.keys(Items)) {
                      let childrenInfo = {
                        ImageTypeId: '',
                        label: ''
                      }
                      childrenInfo.ImageTypeId = Items[j].ImageTypeId;
                      childrenInfo.label = Items[j].TypeName;
                      singleMenuInfo.children.push(childrenInfo);
                    }
                  }
                  vm.menuList.push(singleMenuInfo);
                  let initImageTypeId = vm.menuList[0].children[0].ImageTypeId;
                  vm.defaultExpandedKeys = [initImageTypeId];
                  vm.currLargeName = vm.menuList[0].label;
                  vm.currLargeId = vm.menuList[0].ImageTypeId;
                  vm.currTypeName = vm.menuList[0].children[0].label;
                  vm.currSmallName = vm.menuList[0].children[0].label;
                  //console.log(vm.currTypeName);
                  vm.currImageTypeId = initImageTypeId;
                  vm.$nextTick(() => {
                    vm.setCurrentKey(initImageTypeId);
                    vm.QueryAssemblageImagedepot();
                  })
                }
              } else if(vm.ParentId == -1) {
                //查大类
                vm.formItems.largeClass = result.Data;
              } else {
                //查小类
                vm.formItems.smallClass = result.Data;
              }
            }
          }
        });
      },
      setCurrentKey(key) {
        //var key='554b3846-54ee-11e8-8004-000c295ec690';
        let vm = this;
        const store = vm.$refs.myTree.store;
        const node = store.getNode(key);
        store.setCurrentNode(node);
        vm.$refs.myTree.currentNode = node;
        store.setCurrentNodeKey(key);
        store.currentNodeKey = key;
      },
      albumsResize() {
        var width = $(".img-box").width();
        $(".img-box").height(width / 5 * 4);
      },
      imgUpdateUploadShowAndHide(ref = 'OriginalPhotosUpload', string = '') {
        this.$nextTick(() => {
          let el = this.$refs[ref].$el.childNodes[1]
          el.style.display = string;
        })
      },
      updateImg(res, file, fileList) {
        //当提交一张图片后隐藏上传按钮
        //console.log(res,file,FileList);
        let vm = this;
        if(fileList.length >= 1) vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none')
        vm.formItems.ResourceId = res.Data[0].ResourceId;
      },
      updateDeleteImg(res, fileList) {
        //当删除图片后重新显示上传按钮
        let vm = this
        vm.formItems.ResourceId = '';
        //console.log('shanchu:',res);
        if(fileList.length < 2) vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', '')
        vm.deleteRes(vm.formItems.ResourceId)
      },
      deleteRes(resId) {
        let url = this.formItems.deleteUrl
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

<style lang="less" scoped="scoped">
  .scene_pic {
    /*width: 100%;*/
    position: absolute;
    overflow-y: auto;
    top: 0px;
    bottom: 0px;
    left: 10px;
    right: 10px;
    background: #fff;
    z-index: 300;
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
        /*background: yellow;*/
        /*height: 1000px;*/
        position: relative;
        .pic_list {
          width: 100%;
          list-style: none;
          padding: 0;
          margin: 0;
          div.pic_detail {
            padding-bottom: 82px;
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 5px;
            /*padding: 5px;*/
            /*border: 1px solid #000000;*/
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
              /*display: none;*/
              visibility: visible;
              width: 100%;
              height: 24px;
              background: rgba(0, 0, 0, 0.3);
              /*z-index:100;*/
              transition: all .5s;
              a {
                display: block;
                cursor: pointer;
                position: absolute;
                right: 10px;
                top: 1px;
                height: 0;
                /*z-index:101;*/
                color: red;
                font-size: 16px;
              }
            }
            p.pic_descri {
              font-size: 14px;
              /*color: #1F2D3D;*/
              color: #98a6ad;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              width: 100%;
              text-align: left;
              /*top: 50%;
							 margin-top: -7px;*/
            }
            p.pic_descri1 {
              position: absolute;
              bottom: 56px;
              color: #1abc9c;
            }
            p.pic_descri2 {
              position: absolute;
              bottom: 32px;
            }
            p.pic_descri3 {
              position: absolute;
              bottom: 8px;
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
            /*width: 100%;*/
            /*width:50%;*/
            /*min-height: 250px;*/
            /*max-width: 400px;*/
            /*height: 250px;*/
            /*height: 100%;*/
            background: #fff;
            /*margin-left: 5px;*/
            margin-top: 15px;
            padding: 0;
            padding-right: 17px;
            /*width: 30%;*/
            img {
              width: 100%;
              height: 100%;
              /*margin-bottom: 15px;*/
              border: 1px solid #BFD9D7;
              border-radius: 5px;
              /*height: 90%;*/
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
</style>
<template>
  <div v-loading="treeLoading" class="scene_pic">
    <div class="scene_header"> 设备图库
      <div v-if="openEquiPic" class="pic_back">
        <el-button @click="cancelImg()" size='small' class='mb5'>取消</el-button>
        <el-button @click="sureImg()" size='small' type="primary" class='mb5'>确定</el-button>
      </div>
    </div>
    <div class="scene_content">
      <div class="left_panel">
        <p>品牌分类</p>
        <!--<el-tree ref="myTree" :default-expanded-keys="defaultExpandedKeys" node-key="BrandId" highlight-current :data="menuList" accordion @node-click="handleNodeClick">        	
        </el-tree>-->
        <el-menu default-active="0" class="el-menu-vertical-demo">
          <el-menu-item @click="handleNodeClick(item)" :index="String(index)" v-for="(item,index) in menuList"> <img style="width: 32px; height: 32px;" :src="item.BrandLogo" /> <span slot="title">{{item.label}}{{index}}</span> </el-menu-item>
        </el-menu>
      </div>
      <div v-loading="imgLoading" class="right_panel pull-left">
        <div class="scene_header right_scene_header">{{currTypeName}} </div>
        <div class="commonOperate"> <span class="w150 mb5">
	        	 	<el-select placeholder="设备大类" style="width: 150px;" v-model="BigCategory" size='small' class='por' @change='getSmallCategory'>
	            <el-option  v-for="(item, index) in BigCategoryArr" :key="index" :label="item.EquipmentClassName" :value="item.EquipmentClassId">
	            </el-option>
	         		</el-select>
    	 			</span> <span class="w150 mb5">
	        	 	<el-select placeholder="设备小类" style="width: 150px;" v-model="SmallCategory" size='small' class='por' @change='getProductType'>
	            <el-option v-for="(item, index) in SmallCategoryArr" :key="index" :label="item.EquipmentClassName" :value="item.EquipmentClassId">
	            </el-option>
	         		</el-select>
    	 			</span> <span class="w150 mb5">
	        	 	<el-select placeholder="设备型号" style="width: 150px;" v-model="ProductType" size='small' class='por'>
	            <el-option v-for="(item, index) in ProductTypeArr" :key="index" :label="item.ProductTypeName" @change="QueryAssemblageImagedepot" :value="item.ProductTypeId
">
	            </el-option>
	         		</el-select>
    	 			</span>
          <!--<span class="w150 mb5">
          		<el-input size='small' v-model="ImageName" placeholder="图片名称"></el-input>
        		</span>-->
          <el-button size='small' type="primary" icon='search' class='mb5'>查找</el-button>
        </div>
        <div class="content" style="position: absolute;right: 0; left: 0; top: 100px; bottom: 0;overflow-y: auto;">
          <ul v-if="hasImgData" class="pic_list clearfix">
            <li v-for="(item,index) in imgList" class="img-box pull-left col-xs-12 col-sm-6 col-md-4 col-lg-3">
              <div :class="[openEquiPic ? 'pointer':'']" @click="openEquiPic && clickImg(item,index)" class="pic_detail">
                <div v-if="currImgIndex==(index+1) && openEquiPic" class="selectedIcon"> <img src="static/images/imgStorage/imgS.png" /> </div> <img class="scene_p" :src="item.GalleryCover" />
                <p class="pic_descri pic_descri1">{{item.BrandName}}</p>
                <p class="pic_descri pic_descri2">类别：{{item.BigCategoryName}}/{{item.SmallCategoryName}}</p>
                <p class="pic_descri pic_descri3">型号：{{item.ProductTypeName}}</p>
              </div>
            </li>
          </ul>
          <div v-if="!hasImgData" class="noImgData"> <img src="/static/images/no_pic_data.png" />
            <p>暂无图片数据</p>
          </div>
        </div>
      </div>
    </div>
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
        BigCategory: '',
        BigCategoryArr: [],
        SmallCategory: '',
        SmallCategoryArr: [],
        ProductType: '',
        ProductTypeArr: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        dialogVisible: false,
        menuList: [],
        ParentId: '',
        currLargeName: '',
        currLargeId: '',
        currSmallName: '',
        currBrandId: '',
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
    computed: { ...mapGetters(['openEquiPic', 'get_CurrImgRefs']),
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
      getBigCategory() {
        let vm = this;
        var param = {
          "AccessToken": eosCommon.storage.get('AccessToken'),
          "PageIndex": 0,
          "PageSize": 0,
          "Parameters": {
            "BrandId": vm.currBrandId,
            "EquipmentClassId": ""
          }
        };
        var url = eosCommon.COMMON_API + 'api/common/EquipmentClassLinkage';
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.BigCategoryArr = result.Data;
            vm.QueryAssemblageImagedepot();
          }
        })
      },
      getSmallCategory() {
        let vm = this;
        vm.SmallCategory = ''
        vm.SmallCategoryArr = []
        vm.ProductType = ''
        vm.ProductTypeArr = []
        var param = {
          "AccessToken": eosCommon.storage.get('AccessToken'),
          "PageIndex": 0,
          "PageSize": 0,
          "Parameters": {
            "BrandId": vm.currBrandId,
            "EquipmentClassId": vm.BigCategory
          }
        };
        var url = eosCommon.COMMON_API + 'api/common/EquipmentClassLinkage';
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.SmallCategoryArr = result.Data;
            vm.QueryAssemblageImagedepot();
          }
        })
      },
      getProductType() {
        let vm = this;
        var param = {
          "AccessToken": eosCommon.storage.get('AccessToken'),
          "PageIndex": 0,
          "PageSize": 0,
          "Parameters": {
            "BrandId": vm.currBrandId,
            "BigCategoryId": vm.BigCategory,
            "SmallCategoryId": vm.SmallCategory,
            "ProductTypeId": ""
          }
        };
        var url = eosCommon.PLATFORM_API + 'api/base/ImageGallery';
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.ProductTypeArr = result.Data.Result;
            vm.QueryAssemblageImagedepot();
          }
        })
      },
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
              selectType: 1,            
              intoImgPage: false,
              refs: vm.get_CurrImgRefs,
              sedImgDatas: vm.sedImgDatas
            })
          }).catch(() => {})
          return;
        }
        vm.sET_IMG_SELECT({
          selectType: 1,
          intoImgPage: false,
          refs: vm.get_CurrImgRefs,
          sedImgDatas: vm.sedImgDatas
        })
      },
      clickImg(item, index) {
        let vm = this;
        vm.currImgIndex = (index + 1);
        vm.sedImgDatas = {
          SourceId: item.ResourceId,
          SourceUrl: item.GalleryCover
        }
      },
      cancelImg() {
        let vm = this;
        vm.sET_IMG_SELECT({
          selectType: 1,
          intoImgPage: false,
          refs: vm.get_CurrImgRefs,
          sedImgDatas: null
        })
      },
      handleNodeClick(data) {
        let vm = this;
        vm.currImgIndex = '';
        vm.sedImgDatas = {
          SourceId: '',
          SourceUrl: ''
        }
        vm.currBrandId = data.BrandId;
        vm.currTypeName = data.label;
        vm.BigCategory = ''
        vm.BigCategoryArr = []
        vm.SmallCategory = ''
        vm.SmallCategoryArr = []
        vm.ProductType = ''
        vm.ProductTypeArr = []
        vm.getBigCategory();
        vm.QueryAssemblageImagedepot();
      },
      cancelCurrSetting() {
        this.dialogVisible = false;
      },
      QueryAssemblageImagedepot() {
        let vm = this;
        vm.imgLoading = true;
        var param = {
          "AccessToken": eosCommon.storage.get('AccessToken'),
          "PageIndex": 0,
          "PageSize": 0,
          "Parameters": {
            "BrandId": vm.currBrandId,
            "BigCategoryId": vm.BigCategory,
            "SmallCategoryId": vm.SmallCategory,
            "ProductTypeId": vm.ProductType
          }
        };
        var url = eosCommon.PLATFORM_API + 'api/base/ImageGallery';
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.imgLoading = false;
            if(result.Data instanceof Array) {
              vm.hasImgData = false;
              vm.imgList = [];
              return;
            }
            vm.hasImgData = true;
            vm.imgList = result.Data.Result;
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
        };
        var url = eosCommon.COMMON_API + 'api/common/brand';
        eosCommon.eosAjax(url, "GET", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.treeLoading = false;
            let data = result.Data;
            if(data.length > 0) {
              let initBrandId = '';
              for(let i of Object.keys(data)) {
                let singleMenuInfo = {
                  BrandId: '',
                  label: '',
                  BrandLogo: ''
                }
                singleMenuInfo.BrandId = data[i].BrandId;
                singleMenuInfo.label = data[i].BrandName;
                singleMenuInfo.BrandLogo = data[i].BrandLogo;
                vm.menuList.push(singleMenuInfo);
                initBrandId = vm.menuList[0].BrandId;
                vm.currTypeName = vm.menuList[0].label;
                //console.log(vm.menuList,initBrandId);
                /* vm.defaultExpandedKeys = [initImageTypeId];
                vm.currLargeName = vm.menuList[0].label;
                vm.currLargeId = vm.menuList[0].ImageTypeId;
                vm.currTypeName = vm.menuList[0].children[0].label;
                vm.currSmallName = vm.menuList[0].children[0].label;*/
                //console.log(vm.currTypeName);
                vm.currBrandId = initBrandId;
              }
              vm.$nextTick(() => {
                vm.getBigCategory();
                //vm.setCurrentKey(initBrandId);
                //vm.handleNodeClick();
                vm.QueryAssemblageImagedepot();
              })
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
        $(".img-box").height(width / 5 * 5);
      }
    }
  }
</script>

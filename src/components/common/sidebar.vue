<style scoped="scoped" lang="less">
.logoImgWrap {
  padding: 15px 8px 10px;
}

.logoImgWrap:hover {
  background: #324057;
}

.logoImg {
  width: 34px;
  height: 34px;
  border-radius: 34px;
  cursor: pointer;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  background: #1F2D3D;
  & .el-submenu__title {
    color: #FFF;
  }
}

#sidebar-left {
  // transition: all .8s;
  width: 50px;
  z-index: 300;
}

#sidebar-left:after {
  width: 50px;
  background: #1F2D3D;
  box-shadow: none;
  -webkit-box-shadow: none;
}

</style>
<template>
  <div class="sidebar">
    <aside id="sidebar-left" class="sidebar-circleNo bg-white">
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" :collapse="true">
        <!-- <div><i class="fa fa-bars"></i></div> -->
        <div class="logoImgWrap">
          <img class="logoImg" :src="LogoImage" @click='push("company_infomation")'>
        </div>
        <div v-for='item in get_treeMenu'>
          <el-menu-item :index="item.name" v-if='!item.children' :class='item.isActive?"activeClass":""'>
            <div :class="(item.IconShortcut=='defaulticon.png'?'defaulticon':item.IconShortcut)+'_ico_close'" style="margin-left:-10px" @click='routerPush(item)'></div>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
          <el-submenu :index="item.name" v-else :class='item.isActive?"activeClass":""'>
            <template slot="title">
              <div :class="(item.IconShortcut=='defaulticon.png'?'defaulticon':item.IconShortcut)+'_ico_close'" style="margin-left:-10px"><span class='arrowR'>></span></div>
            </template>
            <el-menu-item-group>
              <span slot="title">{{item.name}}</span>
              <el-menu-item v-for='children in item.children' :index="children.name" @click='routerPush(children)'>{{children.name}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </div>
      </el-menu>
      <!--菜单栏目结束-->
    </aside>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const URL = Common.Const.url
const GET = FUNC.axios.get
export default {
  name: "sidebar",
  data: function() {
    return {
      LogoImage: '',
    }
  },
  computed: {
    ...mapGetters([
      'get_treeMenu',
    ])
  },
  props: ['sidebarData'],
  methods: {
    ...mapActions({
      showWhichTab: 'update_showwhichtab',
      setTreeMenu: 'set_treeMenu',
      setActiveMenu: 'set_activeMenu',
    }),
    /*...mapMutations({
      SHOWWHICHTAB: 'UPDATE_SHOWWHICHTAB'
    }),*/
    push(url) {
      let vm = this
      vm.setActiveMenu(url)
      vm.$router.push(url)
    },
    routerPush(treeNode) {
      let vm = this
      // console.log(treeNode)
      let urlName = treeNode.file;
      vm.setActiveMenu(urlName)
      if (FUNC.storage.get("AccessToken")) {
        FUNC.storage.set('storageType', '');
        FUNC.storage.set('treeNode', JSON.stringify(treeNode));
        FUNC.storage.set('IsExperienceProject', '');
        FUNC.storage.set('IsSelfProject', 1)

        if (urlName == 'equipments_manage') {
          vm.$router.push('/ecos/' + urlName + '/' + 0);
          return;
        }
        if (urlName == 'yz_equipments_manage') {
          vm.$router.push('/ecos/' + urlName + '/' + 0);
          return;
        }
        if (urlName == 'wb_items_manage' ||
          urlName == 'yz_items_manage' ||
          urlName == 'project_list') {
          vm.showWhichTab({
            showWhichTab: 1
          });
        }
        vm.$router.push('/ecos/' + urlName); //左侧路由跳转 
      } else {
        vm.$router.push('/login');
      }
    },
    getAllMenu() {
      let vm = this;
      let url = URL.MENU
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken")
      }
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data;
            let indexPath = ''
            /*let myData = {
              "id": 0,
              "pId": 0,
              "name": "目录",
              "open": 1,
              "file": "#",
              "iconSkin": "pIcon4",
              "IsFolder": 1,
              "IsShortcut": 0,
              "IconShortcut": "defaulticon",
              "Displayorder": 0,
              "OperateSet": null
            }*/
            let treeMenu = data.TreeMenu
            FUNC.storage.set('TreeMenu', JSON.stringify(treeMenu))
            /*for (let item of treeMenu) {
              if (item.id == item.pId) {
                item.pId = myData.id
              }
            }
            treeMenu.unshift(myData);*/
            let [MenuId, newTreeMenu, childrenNodes, treeMenuArr] = [
              [],
              [],
              [],
              []
            ];
            let firstTreeNode = {}
            if (treeMenu != null) {
              for (let item of treeMenu) {
                if (item.file != '#') {
                  if (item.name == '首页') {
                    indexPath = item.file
                  }
                  MenuId.push(item.id);
                  newTreeMenu.push(item);
                }

                //如果id和pid相等且没有路径,则表示有子节点
                if (item.id == item.pId && item.file == '#') {
                  item.children = []
                  item.isActive = false
                  treeMenuArr.push(item)

                  //如果id和pid相等但是有路径,则表示没有子节点的一级菜单
                } else if (item.id == item.pId && item.file != '#') {
                  item.isActive = false
                  treeMenuArr.push(item)

                  //如果id和pid不相等但是有路径,则表示子节点
                } else if (item.id != item.pId && item.file != '#') {
                  childrenNodes.push(item)
                }
              }

              //嵌套循环,构造成菜单所需要的对象,该方法效率不高,可以改进
              for (let item of childrenNodes) {
                for (let jtem of treeMenuArr) {
                  if (item.pId == jtem.id) {
                    jtem.children.push(item)
                  }
                }
              }

              //排序MenuId数组,选出目录中id最小的那个
              MenuId.sort(function(a, b) {
                return a - b;
              });

              //找出首页
              for (let item of newTreeMenu) {
                if (item.id == MenuId[0]) {
                  firstTreeNode = item
                  // sortTreeMenu.push(item);
                  break;
                }
              }
              /*let nowData = treeMenu;
              Object.keys(nowData).some((val) => {
                  if (nowData[val].id == firstTreeNode.pId) {
                    nowData[val].open = 1;
                  }
              })*/

              FUNC.storage.set('treeNode', JSON.stringify(firstTreeNode));
              FUNC.storage.set('IsExperienceProject', '')
              FUNC.storage.set('IsSelfProject', 1)
              let filePath = firstTreeNode.file
              // console.log(treeMenu)
              if (indexPath) {
                filePath = indexPath
              }

              vm.setTreeMenu(treeMenuArr)
              vm.setActiveMenu(filePath)
              FUNC.tntool.setTnAuth(filePath)
              // console.log(vm.get_treeMenu)
              vm.$router.push('/ecos/' + filePath);
            }
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
  },
  mounted: function() {
    let vm = this;
    let LogoImage = FUNC.storage.get('LogoImage');
    vm.LogoImage = LogoImage || '/static/images/inc.jpg'
    vm.getAllMenu()
  }
}

</script>

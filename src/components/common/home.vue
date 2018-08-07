<template>
  <div class="page-header-fixed page-sidebar-fixed home_page">
    <section id="wrapper">
      <!-- 头部开始-->
      <eheader :CompanyFullName='CompanyFullName'></eheader>
      <!-- 头部结束-->
      <sidebar></sidebar>
      <!--内容页开始-->
      <econtent></econtent>
      <!--内容页结束-->
    </section>
  </div>
</template>
<script>
import { mapMutations, mapActions } from 'vuex'
import '../../../static/js/blankon.js';
import eheader from "./header.vue";
import sidebar from "./sidebar.vue"
import econtent from "./content.vue"
export default {
  data() {
    return {
      timeId: null,
      headerData: {
        userLogo: ''
      },
      CompanyFullName: '',
      isMinimize: false
    }
  },
  methods: {
    ...mapMutations({
      uPDATE_SHOWWHICHTAB: 'UPDATE_SHOWWHICHTAB'
    }),
    ...mapActions({
      resetWHeight: 'reset_windowHeight'
    }),
    deResetWH() {
      let vm = this
      clearTimeout(vm.timeId)
      vm.timeId = setTimeout(function() {
        vm.resetWHeight()
      }, 300)
    },
    /*blankon() {
      blankonJson.handleSidebarScroll();
      blankonJson.handleNavbarScroll();
    },*/
    getCompanyDetails() {
      let vm = this,
        param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
        },
        url = eosCommon.COMMON_API + "api/Company/queryCompanyInfo";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          // console.log(result.Data)
          eosCommon.storage.set('CompanyId', result.Data.CompanyId);
          vm.CompanyFullName = result.Data.CompanyFullName
        }
      });
    },
    getAllMenu(leftMenuSetting) {
      let vm = this;
      eosCommon.eosAjax(
        eosCommon.COMMON_API + "api/common/menu",
        "GET", { "AccessToken": eosCommon.storage.get("AccessToken") },
        "json",
        function(data) {
          let myData = {
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
          }
          if (eosCommon.checkCode(data.State, data.Message)) {
            var data = data;
            let indexPath = ''
            eosCommon.storage.set('TreeMenu', JSON.stringify(data.Data.TreeMenu));
            for (let i = 0; i < data.Data.TreeMenu.length; i++) {
              if (data.Data.TreeMenu[i].id == data.Data.TreeMenu[i].pId) {
                data.Data.TreeMenu[i].pId = myData.id;
              }
            }
            data.Data.TreeMenu.unshift(myData);
            vm.$nextTick(function() {
              $('#EcosIndexTree_1_a').hide();
            })
            let [MenuId, newTreeMenu, sortTreeMenue] = [
              [],
              [],
              []
            ];
            if (data.Data.TreeMenu != null) {
              for (let i = 0; i < data.Data.TreeMenu.length; i++) {
                if (data.Data.TreeMenu[i].file != '#') {
                  if (data.Data.TreeMenu[i].name == '首页') {
                    indexPath = data.Data.TreeMenu[i].file
                    // console.log(indexPath)
                  }
                  MenuId.push(data.Data.TreeMenu[i].id);
                  newTreeMenu.push(data.Data.TreeMenu[i]);
                }
              }
              MenuId.sort(function(a, b) {
                return a - b;
              });
              for (let j = 0; j < newTreeMenu.length; j++) {
                if (newTreeMenu[j].id == MenuId[0]) {
                  sortTreeMenue.push(newTreeMenu[j]);
                  break;
                }

              }
              // console.log('sortTreeMenue:',sortTreeMenue)
              //								
              let nowData = data.Data.TreeMenu;
              //								let firstTreeMenu=[];
              //								for(let i=0;i<nowData.length;i++){
              //									if(nowData[i].pId==0){
              //										console.log('nowData[i]:',nowData[i]);
              //										nowData[i].open=1;
              //										break;
              //									}
              //								}
              //								
              //								console.log(':nowData',nowData)
              Object.keys(nowData).some((val) => {
                for (let sortVal of sortTreeMenue) {
                  if (nowData[val].id == sortVal.pId) {
                    nowData[val].open = 1;
                  }
                }

              })
              let EosLeft = $("#EcosIndexTree");
              $.fn.zTree.init(EosLeft, leftMenuSetting, nowData, "TreeMenu");
              let EosTop = $("#CleosNodestTop");
              $.fn.zTree.init(EosTop, leftMenuSetting, data.Data.ShortcutMenu, "ShortcutMenu");
              eosCommon.storage.set('treeNode', JSON.stringify(sortTreeMenue[0]));
              eosCommon.storage.set('IsExperienceProject', '')
              eosCommon.storage.set('IsSelfProject', 1)
              let filePath = sortTreeMenue[0].file
              // console.log(data.Data.TreeMenu)
              if (indexPath) {
                filePath = indexPath
              }
              // console.log('/ecos/' + filePath)
              vm.$router.push('/ecos/' + filePath);
            }
          }
        }
      )
    },
    /*initPageData(leftMenuSetting) {
      let vm = this;
      vm.getAllMenu(leftMenuSetting);
      eosCommon.eosAjax(
        eosCommon.COMMON_API + "api/common/LeaseRemind",
        "GET", { "AccessToken": eosCommon.storage.get("AccessToken") },
        "json",
        function(data) {
          if (eosCommon.checkCode(data.State, data.Message)) {
            $("#LeaseRemind p").html(data.Data.Remind + ': ' + '您的账号将在' + data.Data.ExpirationDate + '到期')
            if (data.Data.Status != 0) {

            } else {
              $("#LeaseRemind").hide();
            }
          }
        }
      )
    }*/

  },
  watch: {
    isMinimize(o, n) {}
  },
  mounted() {
    let vm = this;
    // window.addEventListener('resize', vm.deResetWH)

    let urlName = '';
    let leftMenuSetting = {
      view: {
        showLine: false,
        showIcon: true,
        dblClickExpand: false,
        selectedMulti: false
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        beforeExpand: beforeExpand,
        onClick: onClick,
        beforeClick(treeId, treeNode) {
          if (treeNode.IsFolder == 1) {
            return false;
          } else {
            let EOS = $.fn.zTree.getZTreeObj("Cleostree");
            if (treeNode.isLeaf) {
              EOS.expandNode(treeNode);
              return false;
            } else {
              let urlName;
              if (treeNode.file == "" || treeNode.file == "#") {
                urlName = treeNode.file;
              } else {
                urlName = treeNode.file;
                if (eosCommon.storage.get("AccessToken")) {
                  eosCommon.storage.set('storageType', '');
                  eosCommon.storage.set('treeNode', JSON.stringify(treeNode));
                  eosCommon.storage.set('IsExperienceProject', '');
                  eosCommon.storage.set('IsSelfProject', 1)

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
                    vm.uPDATE_SHOWWHICHTAB({
                      showWhichTab: 1
                    });
                  }
                  vm.$router.push('/ecos/' + urlName); //左侧路由跳转 
                } else {
                  vm.$router.push('/login');
                }
              }
              return true;
            }
          }
        }
      }
    };

    function beforeExpand(treeId, treeNode) {
      let zTree = $.fn.zTree.getZTreeObj("EcosIndexTree");
      let nodes = zTree.getNodes();
      for (let i = 0, l = nodes.length; i < l; i++) {
        if (nodes[i].IsFolder == 1) {
          zTree.expandNode(nodes[i], true);
        }
        if (nodes[i].children != null) {
          for (let j = 0, n = nodes[i].children.length; j < n; j++) {
            zTree.expandNode(nodes[i].children[j], false);
          }
        }
      }
    }

    function onClick(e, treeId, treeNode) {
      let EOS = $.fn.zTree.getZTreeObj("EcosIndexTree");
      EOS.expandNode(treeNode, null, null, null, true);
      setTimeout(function() {
        $('#EcosIndexTree').getNiceScroll().resize();
      }, 100)
    }

    /*$("#CompanyInformation").click(function() {
    	vm.$router.push('company_infomation')
    });*/
    /*$("#MyInformation").click(function() {
      vm.$router.push({ name: 'information' })
    });*/
    // vm.blankon();
    vm.getCompanyDetails();
    // vm.getAllMenu(leftMenuSetting)
    // vm.initPageData(leftMenuSetting);
  },
  components: {
    eheader,
    sidebar,
    econtent
  },
  destroyed() {
    let vm = this
    // window.removeEventListener('resize', vm.deResetWH)
  }
}

</script>
<style>
.page-sidebar-fixed{
  background: #324057;
}
.home_page .account_name {
  display: block;
  height: 20px;
  line-height: 20px;
}

#account_name {
  max-width: 130px;
  height: 20px;
  overflow: hidden;
  display: inline-block;
  padding-right: 10px;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 20px;
}

.home_page .account_name small {
  float: left;
}

.home_page .account_name i {
  float: left;
  margin-top: 4px;
}

</style>

<style scoped="scoped">
  #item-detail {
    height: 100%;
  }
  
  #item-detail .fade-transition {
    transition: opacity .3s ease;
  }
  
  #item-detail .fade-enter, #item-detail .fade-leave {
    opacity: 0;
  }
  
  #item-detail .detail_add .tab-title {
    cursor: pointer;
    position: relative;
    padding-left: 10px;
    padding-right: 10px;
    height: 10px;
    font-size: 14px;
    padding-top: 55px;
    line-height: 10px;
  }
  #item-detail .detail_add .tab-title-top {
    position: absolute;
    padding-top: 5px;
    padding-left: 10px;
    height: 30px;
    font-size: 22px;
    font-weight: bold;
    line-height: 30px;
    color: #1f2d3d;
  }
  #item-detail .detail_add .item-table-detail img {
    width: 40px;
    height: 40px;
    border-radius: 40px;
  }
  
  #item-detail .detail_add .btn-gray {
    background: #eaeaea;
  }
  
  #item-detail .detail_add .sweet-alert .sa-button-container button.cancel, #item-detail .detail_add .sweet-alert .sa-button-container button.cancel:hover {
    background: #5fbeaa;
  } 
  #item-detail .detail_add .pull-title-left {
    background-color: #f2f2f3;
    height: 34px;
    line-height: 34px;
    text-align: right;
  }
  
  #item-detail .detail_add .table-box.card-box.border-add {
    border: 1px dashed #ddd;
    font-size: 18px;
    color: darkgray;
  }
  
  #item-detail .detail_add .table-box.card-box.border-add:hover {
    border: 1px dashed #bbb;
    color: #1abc9c;
    font-size: 18px;
  }
  
  #item-detail .detail_add .b-r-1 {
    border-right: 1px solid #eeeeef;
  }
  
  #item-detail .detail_add .m-rigth {
    margin-right: 10px;
  }
  
  #item-detail .detail_add .btn-gray {
    background: #eaeaea;
  }
  
  #item-detail .detail_add .sweet-alert .sa-button-container button.cancel, #item-detail .detail_add .sweet-alert .sa-button-container button.cancel:hover {
    background: #5fbeaa;
  }
  #item-detail .detail_add .cursor {
    cursor: pointer;
  }
  .item_edit {
    padding: 0px 0px;
    border-bottom: 1px solid #a7c8c4;
    position: absolute;
    top: 48px;
    right: 0;
    z-index: 297;
  }
  
  .item_edit label {
    padding: 0px 38px;
    color: #000;
    font-size: 16px;
    border-right: 1px solid #a9b3c1;
    font-weight: bolder;
    margin-top: 8px;
    cursor: pointer;
  }
  
  .item_edit label span {
    font-weight: bolder;
  }
  
  .item_edit a {
    display: inline-block;
    height: 40px;
  }
  
  .item_edit .activeBorder label span {
    color: #1abc9c;
  }
  
  .activeBorder {
    border-bottom: 4px solid #1abc9c;
  }
  
  .nav.nav-tabs {
    border-bottom: none;
    position: relative;
    transition: all .8s;
  }
</style>
<template>
  <div id="item-detail">
    <div v-cloak class="detail_add" style="height: 100%;bottom: 0;" v-show='getWhichTab_equi==1'>
      <div class="tab-content" id="myContent" style="position: absolute;top:0;bottom: 0;width:100%;overflow: hidden; ">
        <component :propsData="projectData" :is="projectData.currentView"></component>
      </div>
    </div>
    <chartset v-show='getWhichTab_equi==2'></chartset>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations,
    mapActions
  } from 'vuex'
  import chartset from "components/common/equi_chart_setting.vue";
  import equipments_info from "components/page/maintenanceAgent/items/common/n_equipments_info.vue";
  import commonFn from 'assets/js/common/commonFunc';
  import {
    debounce,
    getWinSize
  } from 'assets/js/common/util'
  let projectContr = commonFn.projectContr;
  export default {
    data: function() {
      return {
        style_nav_showbar: {
          left: '193px'
        },
        style_nav_hidebar: {
          left: '10px'
        },
        IsOnline: true,
        addGatewayList: false,
        projectData: {
          ProjectId: this.$route.params.ProjectId,
          ProjectName: this.$route.params.ProjectName,
          currentView: '',
          IsLocked: this.$route.params.IsLocked,
          IsExperienceProject: this.$route.params.IsExperienceProject,
          IsSelfProject: this.$route.params.IsSelfProject,
          EquipmentId: ''
        },
        currentViewTab: '',
        ProjectLogo: '',
        ProjectName: '',
        IsProjectAdmin: 0,
        isAdmin: 0,
        IsExperienceProject: 0,
        IsSelfProject: 1,
        defaultPro_img: 'static/css/img/default_porject_bg.png',
        showTopMenu: false,
        last: 0,
        IsLocked: 0,
        storageViewTab: '',
        wrapClass: '',
        EntitySort: 0
      }
    },
    props: ['showWhichTab'],
    computed: {
      //工单管理和服务管理模块的显示控制
      iShowModels() {
        return projectContr.isProjectAdmin(...this.showModelsParams);
      },
      showModelsParams() {
        return [this.IsProjectAdmin]
      },
      showAddParams() {
        return [this.isAdmin, this.IsProjectAdmin, this.IsExperienceProject, this.IsSelfProject]
      },
      isShowOprate() {
        return projectContr.equipmentAdd(...this.showAddParams);
      },
      ...mapGetters([
				'getWhichTab_equi',
				'isShowSideBar'
			])
    },
    components: {
      equipments_info,
      chartset
    },
    methods: {
      ...mapMutations({
        uPDATE_SHOWWHICHTAB: 'UPDATE_SHOWWHICHTAB'
      }),
      isFromMap() {
        let route = this.$route
        let bool = route.params.isFromMap || route.query.warn
        return bool
      },
      isShowTopMenu(param) {
        let vm = this;
        if(param == '1') {
          debounce(function() {
            vm.showTopMenu = true;
          }, 100, this)();
        } else if(param == '2') {
          debounce(function() {
            vm.showTopMenu = false;
          }, 500, this)();
        }

      },
      customLazy(src, errorImg) {
        return commonFn.customLazy(src, errorImg)
      },
      ...mapActions({
        changeTab: 'changetab_detail'
      }),
      toggleTabs: function(tabText) {
        eosCommon.storage.set('currentViewTab', tabText);
        this.projectData.currentView = tabText;
        this.currentViewTab = tabText;
      },
      QueryDetail: function() {
        var _this = this;
        var param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "ProjectId": _this.$route.params.ProjectId
        };
        var url = eosCommon.ENTERPRISE_API + "api/project/QueryDetail";
        eosCommon.eosAjax(url, "GET", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            _this.projectData.ProjectName = result.Data.ProjectName;
            _this.ProjectName = result.Data.ProjectName;
            _this.ProjectLogo = result.Data.ProjectLogoUrl;
            _this.projectData.ProjectLogo = result.Data.ProjectLogoUrl;
            _this.projectData.currentView = _this.currentViewTab;
            _this.projectData.EquipmentId = _this.$route.params.EquipmentId
          }
        });
      },
      btnReturn() {
        let vm = this;
        if(vm.isFromMap()) {
          vm.$router.go(-1)
          return
        }
        this.uPDATE_SHOWWHICHTAB({
          showWhichTab: 1
        });
      },
    },
    mounted: function() {
      var _this = this;
      this.changeTab(1)
      _this.EntitySort = eosCommon.storage.get('EntitySort');
      if(_this.EntitySort != 2) {
        _this.IsExperienceProject = eosCommon.storage.get('IsExperienceProject');
        _this.IsSelfProject = eosCommon.storage.get('IsSelfProject');
      }
      _this.IsProjectAdmin = eosCommon.storage.get('IsProjectAdmin');
      _this.isAdmin = eosCommon.storage.get('IsAdmin');
      _this.storageViewTab = eosCommon.storage.get('currentViewTab');
      if(!_this.storageViewTab) {
        if(_this.$route.query.warn) {
          _this.toggleTabs('warning_list')
        } else {
          _this.currentViewTab = 'equipments_info';
        }
      } else {
        _this.currentViewTab = _this.storageViewTab;
      }
      _this.QueryDetail();
    }
  }
</script>
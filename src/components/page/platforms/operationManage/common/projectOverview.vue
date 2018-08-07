<style scoped lang='less'>
.overviewCont {
  height: 100%;
  background: #fff;
  overflow: hidden;
  position: relative;
  & .menuTitle {
    margin: 15px 15px 0;
    height: 50px;
    line-height: 50px;
    background: #DFECEB;
    & .imgWrap {
      float: left;
      width: 50px;
      height: 50px;
      background: #D1E3E2;
      & img {
        border-radius: 50%;
        margin-left: 15px;
      }
    }

    & p {
      float: left;
      padding-left: 10px;
      font-weight: bold;
      font-size: 18px;
      width: 170px;
      overflow: hidden;
      line-height: 50px;
      background: #D1E3E2;
      color: #1F2D3D;
    }
    & .menu {
      float: left;
      overflow: hidden;
      & .unit {
        border-top: 1px solid #DFECEB;
        float: left;
        width: 90px;
        position: relative;
        height: 50px;
        overflow: hidden;
        text-align: center;
        cursor: pointer;
        & img {
          line-height: 20px;
          margin: 0 auto;
          border-radius: 50%;
          position: relative;
          top: -10px;
          left: 2px;
        }
        & span {
          color: #1F2D3D;
          position: relative;
          top: -38px;
          font-size: 12px;
          font-weight: bold;
        }
      }
      & .unit:after {
        content: '';
        width: 1px;
        height: 25px;
        background: #BFD9D7;
        position: absolute;
        right: 0;
        top: 15px;
      }
      & .bgActive {
        background: #fff;
      }
      & .bgActive:after {
        content: '';
        width: 1px;
        height: 25px;
        background: #fff;
        position: absolute;
        right: 0;
        top: 15px;
      }
    }
  }

  & .tabContent {
    position: absolute;
    top: 65px;
    bottom: 10px;
    left: 15px;
    right: 15px;
    border: 1px solid #D1E3E2;
    border-top-width: 0;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

</style>
<template>
  <div class="overviewCont">
    <!-- <div v-show='getWhichTab_equi==1'> -->
    <div class="menuTitle">
      <div class="imgWrap">
        <img v-lazy="customLazy(projectData.ProjectLogo,defaultPro_img)" width="35" height="35">
      </div>
      <p class="nowrap" :title='projectData.ProjectName'>{{projectData.ProjectName}}</p>
      <div class="menu">
        <div class="unit" v-if="canShowMenu(index)" v-for='(item,index) in menuData' @click='setMenuIndex(index)' :class="item.isActive?'bgActive':''">
          <img :src="item.src" width="20" height="20" />
          <br />
          <!-- <span :style="item.colorSty">{{item.name}}</span> -->
          <span :style="item.isActive?item.colorSty:{}">{{item.name}}</span>
        </div>
      </div>
      <el-button class='fr mr15' size='small' style='margin-top:8px' @click='btnReturn'>
        <i class="fa fa-mail-reply-all mr5"></i>返回
      </el-button>
    </div>
    <div class="tabContent">
      <component :propsData="projectData" :is="menuView"></component>
    </div>
    <!-- </div> -->
    <!-- <chartset v-show='getWhichTab_equi==2'></chartset> -->
  </div>
</template>
<script>
import menu1Png from 'assets/images/projectList/menu1.png'
import menu2Png from 'assets/images/projectList/menu2.png'
import menu3Png from 'assets/images/projectList/menu3.png'
import menu4Png from 'assets/images/projectList/menu4.png'
import menu5Png from 'assets/images/projectList/menu5.png'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const URL = Common.Const.url
const AXIOS = FUNC.axios
const GET = AXIOS.get
import { mapGetters, mapMutations, mapActions } from 'vuex'
import chartset from "components/common/equi_chart_setting.vue";
import equipments_info from "components/page/maintenanceAgent/items/common/n_equipments_info.vue";
import electric_energy from "components/page/maintenanceAgent/items/common/electric_energy.vue";
import t_equipments_info from "components/page/maintenanceAgent/items/common/t_equipments_info.vue";
import work_order from "components/page/maintenanceAgent/items/common/work_order.vue";
import service_record from "components/page/owner/items/common/record";
import warning_list from 'components/page/owner/items/common/warning.vue';
import project_file from 'components/page/maintenanceAgent/items/common/project_file.vue';
import project_report from 'components/page/platforms/reportList.vue';

import commonFn from 'assets/js/common/commonFunc';
import { debounce, getWinSize } from 'assets/js/common/util'
let projectContr = commonFn.projectContr;
export default {
  data: function() {
    return {
      menuView:'',
      menuData: [{
        name: '能耗管理',
        menuView:'electric_energy',
        isActive: true,
        src: menu1Png,
        colorSty:{
          color:'#2ECC71'
        }
      }, {
        name: '项目工单',
        menuView:'work_order',
        isActive: false,
        src: menu2Png,
        colorSty:{
          color:'#0EC2BA'
        }
      }, {
        name: '预警告警',
        menuView:'warning_list',
        isActive: false,
        src: menu3Png,
        colorSty:{
          color:'#E74C3C'
        }
      }, {
        name: '服务报告',
        menuView:'project_report',
        isActive: false,
        src: menu4Png,
        colorSty:{
          color:'#F99C00'
        }
      }, {
        name: '项目档案',
        menuView:'project_file',
        isActive: false,
        src: menu5Png,
        colorSty:{
          color:'#3498DB'
        }
      }, ],

      style_nav_showbar: { left: '193px' },
      style_nav_hidebar: { left: '10px' },
      IsOnline: true,
      addGatewayList: false,
      /*projectData: {
        ProjectId: this.$route.params.ProjectId,
        ProjectName: this.$route.params.ProjectName,
        currentView: '',
        IsLocked: this.$route.params.IsLocked,
        IsExperienceProject: this.$route.params.IsExperienceProject,
        IsSelfProject: this.$route.params.IsSelfProject
      },*/
      currentViewTab: '',
      ProjectLogo: '',
      ProjectName: '',
      IsProjectAdmin: 0,
      isAdmin: 0,
      IsExperienceProject: 0,
      IsSelfProject: 1,
      defaultPro_img: 'static/css/img/default_porject_bg.png',
      last: 0,
      IsLocked: 0,
      storageViewTab: '',
      wrapClass: '',
      ulClass: '',
      EntitySort: 0
    }
  },
  props: ['projectData', 'whichMenu'],
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
    ])
  },
  components: {
    equipments_info,
    electric_energy,
    t_equipments_info,
    work_order,
    service_record,
    warning_list,
    chartset,
    project_file,
    project_report
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
    customLazy(src, errorImg) {
      return commonFn.customLazy(src, errorImg)
    },
    QueryDetail: function() {
      var vm = this;
      var param = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ProjectId": vm.projectData.ProjectId
      };
      let url = URL.QUERYDETAIL
      GET(url, param)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            // vm.projectData.ProjectName = result.Data.ProjectName;
            vm.ProjectName = res.Data.ProjectName;
            vm.ProjectLogo = res.Data.ProjectLogoUrl;
            // vm.projectData.currentView = vm.currentViewTab;
            vm.loadingOwnerList = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    btnReturn() {
      let vm = this;
      if (vm.isFromMap()) {
        vm.$router.go(-1)
        return
      }
      this.uPDATE_SHOWWHICHTAB({
        showWhichTab: 1
      });
    },
    setMenuIndex(index) {
      let vm = this
      for (let i in vm.menuData) {
        vm.menuData[i].isActive = false
      }
      vm.menuData[index].isActive = true
      vm.menuView = vm.menuData[index].menuView
    },
    goMenu(index){
      let vm = this
      vm.setMenuIndex(index)
    },
    canShowMenu(index){
    	let vm=this;
    	if(vm.projectData.IsEMProject==1||
    		(vm.projectData.IsEMProject==0 && index!=0)){
    		return true;
    	}
    	return false;
    },
    init() {
      let vm = this
      vm.setMenuIndex(vm.whichMenu)
         //console.log(vm.projectData)
      // vm.QueryDetail()
    }
  },
  mounted() {
    let vm = this
    //console.log('黄俊福：',vm.projectData);
    
    
    vm.init()
  }
}

</script>

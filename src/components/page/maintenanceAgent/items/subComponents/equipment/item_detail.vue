<style scoped="scoped">
#item-detail .fade-transition {
  transition: opacity .3s ease;
}

#item-detail .fade-enter,
#item-detail .fade-leave {
  opacity: 0;
}

#item-detail .detail_add .tab-content {
  background-color: #fff;
  margin-top: 67px;
  /*overflow: hidden;*/
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

#item-detail .detail_add .tab-title-bottom {
  /*position: absolute;*/
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

#item-detail .detail_add .item-table-detail {
  /*padding: 10px*/
}

#item-detail .detail_add .item-table-detail img {
  width: 40px;
  height: 40px;
  border-radius: 40px;
}

#item-detail .detail_add .btn-gray {
  background: #eaeaea;
}

#item-detail .detail_add .sweet-alert .sa-button-container button.cancel,
#item-detail .detail_add .sweet-alert .sa-button-container button.cancel:hover {
  background: #5fbeaa;
}


/*#item-detail .detail_add .nav.nav-tabs>li.active>a {
    background: #e1e1e1;
    color: #505461;
  }
  
  #item-detail .detail_add .nav.nav-tabs>li.active>a span {
    color: #505461;
  }*/

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

#item-detail .detail_add .sweet-alert .sa-button-container button.cancel,
#item-detail .detail_add .sweet-alert .sa-button-container button.cancel:hover {
  background: #5fbeaa;
}


/*#item-detail .detail_add .nav.nav-tabs>li.active>a {
    background: #e1e1e1;
    color: #505461;
  }
  
  #item-detail .detail_add .nav.nav-tabs>li.active>a span {
    color: #505461;
  }*/

#item-detail .detail_add .cursor {
  cursor: pointer;
}


/*#item-detail .detail_add label.active>span {
    color: #1abc9c;
  }*/

.item_edit {
  /*display: none;*/
  padding: 0px 0px;
  border-bottom: 1px solid #a7c8c4;
  position: absolute;
  top: 48px;
  right: 0;
  z-index: 300;
  /*transition: 1s all;*/
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
  position: fixed;
  top: 80px;
  transition: all .8s;
  left: 193px;
  /*padding-right: 10px;*/
  right: 10px;
  z-index: 299;

  /*width: 100%;*/
}


/*.nav.nav-tabs:hover .item_edit{
    display: block;     
  }*/

</style>
<template>
  <div id="item-detail">
    <div v-cloak class="detail_add" v-show='getWhichTab_equi==1'>
      <ul @mouseover="isShowTopMenu('1')" @mouseleave="isShowTopMenu('2')" class="nav nav-tabs" style="padding: 10px;" :style='isShowSideBar?style_nav_showbar:style_nav_hidebar'>
        <li>
          <div class="item-table-detail">
            <div>
              <img v-lazy="customLazy(ProjectLogo,defaultPro_img)">
            </div>
          </div>
        </li>
        <span class="tab-title-top">{{ProjectName}}</span>
        <div style="position: relative;width: 100px; height: 48px;" class="custom_btn pull-right">
          <button @click="btnReturn()" style="position: absolute; z-index: 301;right: 0;top: 0;" type="button" class="btnReturn btn btn-white">
            <i class="fa fa-mail-reply-all m-r-5"></i>返回
          </button>
        </div>
        <div class="item_edit1 col-sm-12 col-md-12 col-lg-12 bg-white" style="padding:0px 0px; border-bottom: 1px solid #a7c8c4;margin-top: 8px;">
        </div>
        <transition enter-active-class="fadeInDown animated" style="z-index:302" name="fadeIn" v-cloak>
          <div v-show="showTopMenu" class="item_edit col-sm-12 col-md-12 col-lg-12 bg-white " style="">
            <span class="tab-title-bottom">
	              <a :class="{activeBorder: currentViewTab=='equipments_info'}">
	                <label >
	                  <span @click="toggleTabs('equipments_info');">设备查看</span>
		            	</label>
		            </a>
		            <a :class="{activeBorder: currentViewTab=='t_equipments_info'}">
	                <label >
	                  <span @click="toggleTabs('t_equipments_info');">设备添加</span>
		            	</label>
		            </a>
		            <a :class="{activeBorder: currentViewTab=='work_order'}">
		              <label v-if="iShowModels">
		                <span @click="toggleTabs('work_order');">工单管理</span>
		              </label>
		            </a>
		          
		            <a :class="{activeBorder: currentViewTab=='warning_list'}">
		              <label>
		                <span @click="toggleTabs('warning_list');">预警告警列表</span>
		              </label>
		            </a>
		            <a :class="{activeBorder: currentViewTab=='project_file'}">
		              <label>
		                <span @click="toggleTabs('project_file');">项目档案</span>
		              </label>
		            </a>
            </span>
          </div>
        </transition>
      </ul>
      <div class="tab-content" id="myContent" :style="ulClass" style="position: relative; ">
        <component :propsData="projectData" :is="projectData.currentView"></component>
      </div>
    </div>
    <chartset v-show='getWhichTab_equi==2'></chartset>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import chartset from "components/common/equi_chart_setting.vue";
import equipments_info from "components/page/maintenanceAgent/items/common/equipments_info.vue";
import t_equipments_info from "components/page/maintenanceAgent/items/common/t_equipments_info.vue";
import work_order from "../../common/work_order.vue";
import service_record from "components/page/owner/items/common/record";
import warning_list from 'components/page/owner/items/common/warning.vue';
import project_file from 'components/page/maintenanceAgent/items/common/project_file.vue';
import commonFn from 'assets/js/common/commonFunc';

import { debounce } from 'assets/js/common/util'
let projectContr = commonFn.projectContr;
export default {
  data: function() {
    return {
      style_nav_showbar:{left:'193px'},
      style_nav_hidebar:{left:'10px'},
      IsOnline: true,
      addGatewayList: false,
      projectData: {
        ProjectId: this.$route.params.ProjectId,
        ProjectName: this.$route.params.ProjectName,
        currentView: '',
        IsLocked: this.$route.params.IsLocked,
        IsExperienceProject: this.$route.params.IsExperienceProject
      },
      currentViewTab: 'equipments_info',
      ProjectLogo: '',
      ProjectName: '',
      IsProjectAdmin: 0,
      defaultPro_img: 'static/css/img/default_porject_bg.png',
      showTopMenu: false,
      last: 0,
      ulClass:''
    }
  },
  computed: {
    //工单管理和服务管理模块的显示控制  
    iShowModels() {
      return projectContr.isProjectAdmin(...this.showModelsParams);
    },
    showModelsParams() {

      return [this.IsProjectAdmin]
    },
    ...mapGetters([
      'getWhichTab_equi',
      'isShowSideBar'
    ])
  },
  components: {
    equipments_info,
    t_equipments_info,
    work_order,
    service_record,
    warning_list,
    chartset,
    project_file,
  },
  methods: {
    isShowTopMenu(param) {
      let vm = this;
      if (param == '1') {
        debounce(function() {
          vm.showTopMenu = true;
        }, 100, this)();
      } else if (param == '2') {
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
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.projectData.ProjectName = result.Data.ProjectName;
          _this.ProjectName = result.Data.ProjectName;
          _this.ProjectLogo = result.Data.ProjectLogoUrl;
          _this.projectData.currentView = "equipments_info";
        }
      });
    },
    btnReturn() {
      let vm = this;
      let lastRouterName = 'wb_items_manage' || 'yz_items_manage' || 'sm_items_manage'
      console.log('lastRouterName:', lastRouterName)
      vm.$router.push({ name: lastRouterName });
    },
    isFromMap() {
      let vm = this
      // console.log('路由进入,所带入参数是: ',vm.$route.query)
      if (vm.$route.query.warn) {
        return true
      } else {
        return false
      }
    },
    getHeight(reduceHeight) {
				//获取窗口高度
				let vm = this;
				let winHeight = 0;
				if(window.innerHeight) winHeight = window.innerHeight - reduceHeight;
				else if((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight - reduceHeight;
				//通过深入Document内部对body进行检测，获取窗口大小
				if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
					winHeight = document.documentElement.clientHeight - reduceHeight;
				}
				vm.ulClass = `height:${winHeight}px;overflow: auto;`
		
			}
  },
  mounted: function() {
    this.changeTab(1)
    var _this = this;
    _this.IsProjectAdmin = eosCommon.storage.get('IsProjectAdmin');
    _this.QueryDetail();
//  this.getHeight(153);
    $(document).ready(function() {
      //$("#myContent").height($(window).height() - 200).niceScroll({
      $("#myContent").height($(window).height() - 153).niceScroll({
        cursorwidth: "6px",
        cursorborderradius: "6px",
        autohidemode: 'scroll',
        nativeparentscrolling: true,
        spacebarenabled: true,
        horizrailenabled: false,
        cursoropacitymax: 0.8,
        cursorborder: "0px solid red",
        railpadding: { top: 0, right: 5, left: 0, bottom: 0 },
      });
      if (_this.isFromMap()) {_this.toggleTabs('warning_list')}
    })
  }
}

</script>

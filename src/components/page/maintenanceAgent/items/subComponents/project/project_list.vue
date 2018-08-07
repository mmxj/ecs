<style lang='less' scoped>
.el_mainContent {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.el_fixedWrap {
  min-width: 886px; // overflow: hidden;
}

.listCont {
  width: 100%;
  position: relative;
}

.listRowCont {
  width: 100%; // position: absolute;
  // top: 0;
  // bottom: 10px;
  overflow-x: hidden;
  overflow-y: auto;
}

.pagin {
  background-color: #fff;
}


@media (min-width: 1341px) {
  .listUnitWrap {
    width: 33.33%;
  }
}

@media (max-width: 1340px) {
  .listUnitWrap {
    width: 50%;
  }
}

.listUnitWrap {
  height: 200px;
  float: left;
  position: relative;
}

.listUnit {
  transition: all .5s;
  position: absolute;
  top: 5px;
  bottom: 10px;
  left: 0;
  right: 15px;
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #C4DCDA;
}

.listUnit:hover {
  box-shadow: 0px 0px 15px rgba(0, 60, 0, .6);
}

.itemWrap {
  cursor: default;
  width: 100%;
  height: 100%;
  position: relative;
  & .editArea {
    padding-bottom: 25px;
    padding-left: 10px;
    z-index: 1; // opacity: .9;
    border-radius: 3px;
    background: #fff;
    height: 20px;
    line-height: 20px;
    position: absolute;
    top: 15px;
    right: 15px;
    display: none;
  }
  & .menuArea {
    width: 100%;
    position: absolute;
    z-index: 1; // opacity: .9;
    background: #EEF6F6;
    bottom: -64px;
    height: 64px;
    transition: bottom .3s;
    & .unit {
      width: 20%;
      float: left;
      & .text {
        width: 60px;
        margin: 0 auto;
        padding-top: 43px;
        background: none center 10px no-repeat;
        text-align: center;
        height: 64px;
        color: #8492A6;
        cursor: pointer;
        font-size: 12px;
      }
    }
    & .w25p {
      width: 25%;
    }
  }
  & .fa {
    color: #97bebc;
  }
  & .fa-pencil:hover {
    color: #1ABC9C;
  }
  & .fa-trash-o:hover {
    color: #E74C3C;
  }
  & .fa-unlock:hover,
  .fa-lock:hover {
    color: #F1C40F;
  }
  & a {
    font-size: 16px;
    cursor: pointer;
    z-index: 10;
  }
}

.itemWrap:hover .editArea {
  display: block;
}

.itemWrap:hover .menuArea {
  bottom: 0;
}

.itemCent {
  position: absolute;
  left: 180px;
  right: 15px;
  top: 15px;
  bottom: 50px;
  & .projectName {
    color: #1F2D3D;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 10px;
  }
  & .industry {
    margin-left: 5px;
    border: 1px solid #8492A6;
    padding-left: 5px;
    padding-right: 5px;
    border-radius: 3px;
    color: #8492A6
  }
  & .msgp {
    line-height: 25px;
    font-size: 12px;
    color: #8492A6
  }
  & .fa {
    width: 20px;
    margin-right: ;
  }
}

.itemBottom {
  position: absolute;
  left: 15px;
  right: 15px;
  top: 130px;
  bottom: 0;
  border-top: 1px dashed #BFD9D7;
  & .unit {
    float: left;
    width: 30%;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #8492A6;
    & .num {
      font-size: 16px;
      color: #1F2D3D
    }
  }
  & .unit:nth-child(4) {
    width: 10%;
  }
}

.imgWrap {
  cursor: pointer;
  width: 150px;
  height: 100px;
  overflow: hidden;
  position: absolute;
  left: 15px;
  top: 15px;
  border-radius: 5px;
  & img {
    width: 100%;
  }
}

.lockImgWrap {
  background: rgba(0, 0, 0, .6);
  cursor: pointer;
  width: 150px;
  height: 100px;
  overflow: hidden;
  position: absolute;
  left: 15px;
  top: 15px;
  border-radius: 5px;
  & img {
    width: 50px;
    margin-left: 50px;
    margin-top: 20px;
  }
}

.noProject p {
  text-align: center;
  font-style: 18px;
  font-weight: bold;
  color: #1ABC9C;
  margin-top: 10px;
}

.mapBtn {
  margin-left: 10px;
  font-size: 13px;
  padding-left: 15px;
  padding-right: 15px;
  color: #797979
}

.el-button {
  position: relative;
  top: -2px;
}

.el_content {
  height: 100%;
}

</style>
<template>
  <div class="el_mainContent" ref='indexContent' v-loading='loadingTable'>
    <addForm v-if="get_showWhichTab==3"></addForm>
    <!-- <addForm v-if="get_showWhichTab==3&&EntitySort!=2"></addForm> -->
    <!-- <createForm v-if="get_showWhichTab==3&&EntitySort==2"></createForm> -->
    <editForm v-if="get_showWhichTab==2" :editFormData='editFormData'></editForm>
    <!-- <detailForm v-if="get_showWhichTab==4" :get_showWhichTab.sync='get_showWhichTab' :detailFormData='detailFormData'></detailForm> -->
    <router-view v-if="get_showWhichTab==4"></router-view>
    <overview v-if="get_showWhichTab==5" :whichMenu='whichProjectMenu' :projectData='projectData'></overview>
    <div class='el_content el_fixedWrap' v-show='get_showWhichTab==1' style="height: calc(100% - 50px)">
      <el-row>
        <el-col :span="22">
          <h3>项目列表<el-button v-show='EntitySort!=0' @click="goTo('index',{'IndustryId':IndustryId,'FromMap':true})" size="small" class='mapBtn'>项目地图</el-button></h3>
        </el-col>
        <el-col v-if="$route.query.FromMap" :span="2" class='tar'>
          <el-button class='mb5' size='small' style='top:0' @click='goBack'>
            <i class="fa fa-mail-reply-all mr5"></i>返回
          </el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <el-row ref='searchBar'>
        <el-col :span='24'>
          <el-button size='small' v-if='isShowAdd||isCanOperate' type="primary" icon='plus' @click="uPDATE_SHOWWHICHTAB({showWhichTab:3})" class='mb5'>新增</el-button>
          <!-- <el-button size='small' v-if='isShowAdd&&EntitySort!=2' type="primary" icon='plus' @click="uPDATE_SHOWWHICHTAB({showWhichTab:3})" class='mb5'>新增</el-button>
            <el-button size='small' v-if='isCanOperate&&EntitySort==2' type="primary" icon='plus' @click="uPDATE_SHOWWHICHTAB({showWhichTab:3})" class='mb5'>新增</el-button> -->
          <span class="w100 mb5">
              <el-select size='small' v-model="IndustryId" filterable clearable placeholder="行业名称" @change='search' :loading='loadingIndustryOpts'>
                <el-option
                    v-for="item in IndustryOpts"
                    :key="item.IndustryId"
                    :label="item.IndustryName"
                    :value="item.IndustryId">
                  </el-option>
              </el-select >
            </span>
          <span class="w100 mb5" v-if='EntitySort==2'>
              <el-select size='small' v-model="CompanyId" filterable clearable placeholder="企业名称" @change='search' :loading='loadingCompanyOpts'>
                <el-option
                    v-for="(item, index) in companyOpts"
                    :key="index"
                    :label="item.CompanyName"
                    :value="item.CompanyId">
                  </el-option>
              </el-select >
            </span>
          <span class="w130 mb5">
              <el-select size='small' v-model="AlarmType" clearable placeholder="运行状态" @change='search'>
                <el-option
                    v-for="item in AlarmTypeOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
          <span class="w130 mb5">
              <el-select size='small' v-model="LockType" clearable placeholder="锁定状态" @change='search'>
                <el-option
                    v-for="item in LockTypeOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
          <span class="w130 mb5" v-if='EntitySort!=2'>
              <el-select size='small' v-model="UserId" filterable clearable placeholder="人员列表" @change='search' :loading='loadingUserList'>
                <el-option
                    v-for="item in GetCompanyUsers"
                    :key="item.UserId"
                    :label="item.UserName"
                    :value="item.UserId">
                  </el-option>
              </el-select>
            </span>
          <span class="w130 mb5" v-if='EntitySort!=2'>
              <el-select size='small' v-model="CompanyId" filterable clearable placeholder="全部维保公司或业主" @change='search' :loading='loadingOwnerList'>
                <el-option
                    v-for="item in companyOpts"
                    :key="item.CompanyId"
                    :label="item.CompanyFullName"
                    :value="item.CompanyId">
                  </el-option>
              </el-select>
            </span>
          <span class="w150 mb5" @keyup='searchDebounce'>
              <el-input size='small' v-model="ProjectName" placeholder="项目名称"></el-input>
            </span>
          <el-button v-if='EntitySort==2' size='small' style='margin-top: 2px' type="primary" class='fr mb5' @click='exportInfo' :disabled='exporting'>{{exporting?'导出中...':'导出所有项目信息'}}</el-button>
        </el-col>
      </el-row>
      <div class="listRowCont" ref='listRowCont' style="height: calc(100% - 70px);" v-if='tableData.length'>
        <div class="listUnitWrap" v-for='item in tableData'>
          <div class="listUnit">
            <div class="itemWrap">
              <div class="menuArea">
                <div class="unit" v-if='item.IsEMProject==1'>
                  <div class="text" :style='menu1Sty' @click='goOverview(item,0)'>能耗管理</div>
                </div>
                <div class="unit" :class='item.IsEMProject!=1?"w25p":""'>
                  <div class="text" :style='menu2Sty' @click='goOverview(item,1)'>项目工单</div>
                </div>
                <div class="unit" :class='item.IsEMProject!=1?"w25p":""'>
                  <div class="text" :style='menu3Sty' @click='goOverview(item,2)'>预警告警</div>
                </div>
                <div class="unit" :class='item.IsEMProject!=1?"w25p":""'>
                  <div class="text" :style='menu4Sty' @click='goOverview(item,3)'>服务报告</div>
                </div>
                <div class="unit" :class='item.IsEMProject!=1?"w25p":""'>
                  <div class="text" :style='menu5Sty' @click='goOverview(item,4)'>项目档案</div>
                </div>
              </div>
              <div class="editArea" v-if='EntitySort!=2'>
                <a v-show="isShowEdit(item.IsDualId,item.IsProjectLeader,item.IsTrue,item.IsExperienceProject,item.IsSelfProject)" @click="goEdit(item)" title="编辑项目"><i class="fa fa-pencil mr5"></i></a>
                <a v-show="isShowDelete(item.IsDualId,item.IsTrue,item.IsExperienceProject, item.IsSelfProject)" @click="delRequest(item.ProjectId)" title="删除项目"><i class="fa fa-trash-o mr5"></i></a>
                <a v-show="((item.IsLocked == 0 || item.IsLocked == null) && isShowLock(item.IsProjectLeader,item.IsDualId,item.IsTrue,item.IsExperienceProject,item.IsSelfProject))" @click="isLock(item.ProjectId,item.IsLocked)" title="锁定项目"><i class="fa fa-lock mr5"></i></a>
                <a v-show="((item.IsLocked == 1 || item.IsLocked == null) && isShowLock(item.IsProjectLeader,item.IsDualId,item.IsTrue,item.IsExperienceProject,item.IsSelfProject))" @click="isLock(item.ProjectId,item.IsLocked)" title="解锁项目"><i class="fa fa-unlock mr5"></i></a>
              </div>
              <div class="editArea" v-else>
                <a v-if="isCanOperate" @click="goEdit(item)" title="编辑项目"><i class="fa fa-pencil mr5"></i></a>
                <a v-if="isCanOperate" @click="delRequest(item.ProjectId)" title="删除项目"><i class="fa fa-trash-o"></i></a>
              </div>
              <div class="imgWrap" @click='goDetail(item)'>
                <img v-lazy="customLazy(item.ProjectLogo,defaultPngSrc)" @load='setImgWH' />
              </div>
              <div class="lockImgWrap" @click='goDetail(item)' v-show='item.IsLocked==1'>
                <img :src="lockPng" />
              </div>
              <div class="itemCent">
                <p class="nowrap">
                  <span class='projectName curp' :title='item.ProjectName' @click='goDetail(item)'>{{item.ProjectName}}</span>
                  <span class="industry" :title='item.IndustryName'>{{item.IndustryName||'未分类'}}</span></p>
                <p class="nowrap msgp" v-if='EntitySort!=2'><i class='fa fa-user-secret'></i>{{EntitySort==1?'维保人':'负责人'}}：{{item.UserName}}</p>
                <p class="nowrap msgp" v-else><i class='fa fa-user-secret'></i>所属业主：{{item.OwnerCompanyName}}</p>
                <p class="nowrap msgp" v-if='EntitySort!=2'><i class='fa fa-user'></i>{{EntitySort==1?'业主':'维保商'}}：{{EntitySort==1?item.OwnerCompanyName:item.MaintCompanyName}}</p>
                <p class="nowrap msgp" v-else><i class='fa fa-user'></i>维保商：{{item.MaintCompanyName}}</p>
                <p class="nowrap msgp"><i class='fa fa-map-marker'></i>地址：{{item.ProjectAddress}}</p>
              </div>
              <div class="itemBottom" v-if='EntitySort!=0'>
                <div class="unit">设备总数：<span class="num">{{item.EquipTotal}}</span></div>
                <div class="unit">告警设备数：<span class="num" :style='item.EquipAlarm==0?{color:"#1F2D3D"}:{color:"#E74C3C",fontWeight:"bold"}'>{{item.EquipAlarm}}</span></div>
                <div class="unit">离线设备数：<span class="num">{{item.EquipOffLine}}</span></div>
                <div class="unit"><img :src="item.AlarmLevel==0?warn0Png:(item.AlarmLevel==1?warn1Png:(item.AlarmLevel==2?warn2Png:warn3Png))" style='float:right;margin-top:17px;' /></div>
              </div>
              <div class="itemBottom" v-else>
                <div v-if='item.EquipCountByType!==null'>
                  <div class="unit" v-for='obj in item.EquipCountByType'>{{obj.name}}：<span class="num">{{obj.value}}</span></div>
                  <div class="unit" style='float:right'><img :src="item.AlarmLevel==0?warn0Png:(item.AlarmLevel==1?warn1Png:(item.AlarmLevel==2?warn2Png:warn3Png))" style='float:right;margin-top:17px;' /></div>
                </div>
                <div v-else :style='noEquiSty' @click='goDetail(item)'>
                  抱歉，该项目暂无设备，可进入该项目进行添加
                </div>
              </div>
            </div>
          </div>
        </div>
        <transition name="el-zoom-in-top">
          <div class="page-component-up" @click='scrollTop' v-show='isShowScrollTop'>
            <i class="el-icon-caret-top"></i>
          </div>
        </transition>
      </div>
      <div class='vertical-container' style="height: calc(100% - 70px);" v-else>
        <div class="noProject"><img :src="noProPng" alt="" />
          <p>暂无项目</p>
        </div>
      </div>
      <div class="pagin">
        <div class="pageDes">
          <span>当前显示 {{firstPage}} 到 {{lastPage}} 条记录</span>
          <span>共 {{Total}} 条记录</span>
        </div>
        <div class="pageBlock">
          <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="Total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const STYLE = Common.Const.style
const URL = Common.Const.url
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const DELETE = AXIOS.delete
const OPTS = Common.Const.options
// import createForm from 'components/page/platforms/operationManage/common/createProjectForm'
import addForm from './addProject'
// import createForm from 'components/page/platforms/operationManage/common/createProjectForm'
import editForm from 'components/page/platforms/operationManage/common/editProjectForm'
import overview from 'components/page/platforms/operationManage/common/projectOverview'

import detailForm from 'components/page/platforms/operationManage/common/projectDetail'
import defaultPng from 'assets/images/common/default_porject_bg.png'
import warn0Png from 'assets/images/projectList/warn0.png'
import warn1Png from 'assets/images/projectList/warn1.png'
import warn2Png from 'assets/images/projectList/warn2.png'
import warn3Png from 'assets/images/projectList/warn3.png'
import lockPng from 'assets/images/projectList/lock.png'
import unhappyPng from 'assets/images/projectList/unhappy.png'
import noProPng from 'assets/images/projectList/noProject.png'
import menu1Png from 'assets/images/projectList/menu1.png'
import menu2Png from 'assets/images/projectList/menu2.png'
import menu3Png from 'assets/images/projectList/menu3.png'
import menu4Png from 'assets/images/projectList/menu4.png'
import menu5Png from 'assets/images/projectList/menu5.png'

import Bus from 'src/assets/js/common/bus.js';
let projectContr = FUNC.projectContr;
export default {
  data() {
    return {
      exporting: false,
      whichProjectMenu: 0,
      projectData: {},
      menu1Sty: {
        'backgroundImage': `url(${menu1Png})`
      },
      menu2Sty: {
        'backgroundImage': `url(${menu2Png})`
      },
      menu3Sty: {
        'backgroundImage': `url(${menu3Png})`
      },
      menu4Sty: {
        'backgroundImage': `url(${menu4Png})`
      },
      menu5Sty: {
        'backgroundImage': `url(${menu5Png})`
      },

      timeId: null,
      UserId: '',
      GetCompanyUsers: [],
      loadingUserList: true,

      CompanyId: '',
      loadingOwnerList: true,
      companyOpts: [],

      tableData: [],
      PageSize: 9,
      Total: 50,
      PageIndex: 1,
      defaultPngSrc: defaultPng,
      warn0Png,
      warn1Png,
      warn2Png,
      warn3Png,
      lockPng,
      noProPng,
      noEquiSty: {
        background: `url(${unhappyPng}) 5px 16px no-repeat`,
        height: '52px',
        lineHeight: '52px',
        paddingLeft: '30px',
        cursor: 'pointer'
      },
      isShowScrollTop: false,
      timeId: null,
      IndustryId: '',
      IndustryOpts: [],

      loadingTable: false,
      loadingIndustryOpts: true,
      loadingCompanyOpts: true,

      AlarmType: '',
      AlarmTypeOpts: OPTS.ALARMTYPEOPTS,

      LockType: '',
      LockTypeOpts: OPTS.LOCKTYPEOPTS,

      searchBarH: 0,
      ProjectName: '',

      // get_showWhichTab: 1,

      isAdmin: 0,
      EntitySort: 0,
      IsProjectAdmin: 0,

      PrincipalUserId: '',
      editFormData: {},
      detailFormData: {},

      industryUrl: URL.INDUSTRY, //查询所属行业列表(下拉框)
      companyListUrl: URL.GETALLCOMPANY, //获取业主列表(下拉框)
      targetCompanyUrl: URL.GETTARGETCOMPANY, //获取维保商业主列表(下拉框)
      tableUrl: URL.PROJECTQUERY, //获取项目列表
      deleteProUrl: URL.PROJECTDELETE, //删除项目

      userListUrl: URL.GETCOMPANYUSER, //获取维保人或负责人列表(项目列表筛选项)
      lockUrl: URL.LOCKPROJECT //锁定or解锁项目

    }
  },
  computed: {
    ...mapGetters([
      'windowHeight',
      'isShowSideBar',
      'get_showWhichTab'
    ]),
    routeSort() {
      if (FUNC.storage.get("EntitySort") == 2) {
        return 'sm_'
      } else {
        return 'wb_'
      }
    },
    showAddParams() {
      return [this.isAdmin, this.IsProjectAdmin]
    },
    isShowAdd() {
      return projectContr.projectAdd(...this.showAddParams);
    },
    isCanOperate() {
      return projectContr.isCanOperate(this.EntitySort, this.isAdmin, this.IsProjectAdmin);
    },
    showLockParams() {
      return [this.EntitySort, this.isAdmin]
    },
    showOtherParams() {
      return [this.EntitySort, this.isAdmin, this.IsProjectAdmin]
    },
    /*listContSty() {
      let vm = this
      let h = vm.windowHeight - vm.searchBarH - 170
      return { height: `${h}px` }
    },*/
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.Total)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.Total)
    },
  },
  watch: {
    isShowSideBar() {
      this.deResizeBarH()
    },
    get_showWhichTab(val) {
      if (val == 1) {
        this.tableLoad()
      }
    },
    $route(val) {
      if (val.name == "yz_items_manage" || val.name == "wb_items_manage" || val.name == "sm_project_list") {
        // this.$router.push({name:'project_detail',params:this.detailFormData})
        //this.get_showWhichTab=1
        this.uPDATE_SHOWWHICHTAB({
          showWhichTab: 1
        });
      }
    }
  },
  components: {
    addForm,
    // createForm,
    editForm,
    overview,
    detailForm
  },
  methods: {
    ...mapMutations({
      uPDATE_SHOWWHICHTAB: 'UPDATE_SHOWWHICHTAB'
    }),
    exportInfo() {
      let vm = this;
      // vm.exporting = true
      let params = `?AccessToken=${FUNC.storage.get("AccessToken")}`
      let url = URL.EXPORTPROJECTINFO
      window.location.href = `${url}${params}`
    },
    goOverview(item, index) {
      let vm = this
      vm.whichProjectMenu = index
      vm.projectData = item
      vm.uPDATE_SHOWWHICHTAB({
        showWhichTab: 5
      });
    },
    fromMap() {
      let vm = this
      if (vm.$route.query.AlarmType) {
        vm.AlarmType = vm.$route.query.AlarmType
      } else {
        vm.tableLoad()
      }
    },
    goBack() {
      this.$router.go(-1)
    },
    getChange(msg) {
      //this.get_showWhichTab=4;
    },
    searchDebounce() {
      FUNC.debounce(this.timeId, this, 'search')
      /*let vm = this
      clearTimeout(vm.timeId)
      vm.timeId = setTimeout(function() {
        vm.search()
      }, 300)*/
    },
    isLock(projectId, isLock) {
      let vm = this;
      let IsLock = (isLock == 0 ? 1 : 0)
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "ProjectId": projectId, //--项目Id(必填)
          "IsLock": IsLock //--（0：解锁，1：锁定 必填） 
        }
      }
      let url = vm.lockUrl
      POST(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            if (isLock == 0) {
              vm.$message.success("项目锁定成功");
            } else {
              vm.$message.success("项目解锁成功");
            }
            vm.tableLoad();
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    isShowLock(IsProjectLeader, IsDualId, IsTrue, IsExperienceProject, IsSelfProject) {
      return projectContr.projectLock(...this.showLockParams, IsProjectLeader, IsDualId, IsTrue, IsExperienceProject, IsSelfProject);
    },
    isShowEdit(IsDualId, IsProjectLeader, IsTrue, IsExperienceProject, IsSelfProject) {
      return projectContr.projectEdit(...this.showOtherParams, IsDualId, IsProjectLeader, IsTrue, IsExperienceProject, IsSelfProject);
    },
    isShowDelete(IsDualId, IsTrue, IsExperienceProject, IsSelfProject) {
      return projectContr.projectDelete(...this.showOtherParams, IsDualId, IsTrue, IsExperienceProject, IsSelfProject);
    },
    intoEquipmentList(IsExperienceProject, IsSelfProject) {
      FUNC.storage.set('IsExperienceProject', IsExperienceProject);
      FUNC.storage.set('IsSelfProject', IsSelfProject);
      // console.log('IsExperienceProject')
    },
    GetTargetCompany() {
      let vm = this;
      vm.loadingOwnerList = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "IsMaint": vm.EntitySort == 1 ? false : true
      }
      let url = this.targetCompanyUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let arr0 = { CompanyId: '' }
            if (vm.EntitySort == 0) {
              arr0.CompanyFullName = '全部维保公司'
            } else {
              arr0.CompanyFullName = '全部业主'
            }
            vm.companyOpts = [arr0, ...res.Data];
            vm.loadingOwnerList = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setCompanyOpts() {
      let vm = this
      vm.loadingCompanyOpts = true
      let url = vm.companyListUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          let companyOpt0 = [{
            CompanyId: '',
            CompanyName: '全部企业'
          }]
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.companyOpts = [...companyOpt0, ...res.Data]
            vm.loadingCompanyOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    GetCompanyUser() {
      let vm = this;
      vm.loadingUserList = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = this.userListUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let arr0 = { UserId: '' }
            if (vm.EntitySort == 0) {
              arr0.UserName = '全部负责人'
            } else {
              arr0.UserName = '全部维保人'
            }
            vm.GetCompanyUsers = [arr0, ...res.Data];
            vm.loadingUserList = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },

    goTo(routerName, routerParams) {
      // console.log(routerParams)
      if (routerName == 'index') {
        routerName = `${this.routeSort}${routerName}`
        // console.log(routerName)
      }
      this.$router.push({ name: routerName, params: routerParams })
    },
    goEdit(item) {
      let vm = this
      FUNC.storage.set('IsTrue', item.IsTrue);
      if (vm.EntitySort != 2) {
        FUNC.storage.set('IsDualId', item.IsDualId);
      }
      vm.editFormData.IsDualId = item.IsDualId
      vm.editFormData.ProjectId = item.ProjectId
      vm.editFormData.IsTrue = item.IsTrue
      vm.uPDATE_SHOWWHICHTAB({ showWhichTab: 2 })
    },
    goDetail(item) {
      let vm = this
      vm.detailFormData.ProjectId = item.ProjectId
      vm.detailFormData.ProjectName = item.ProjectName
      vm.detailFormData.ProjectLogo = item.ProjectLogo
      vm.detailFormData.IsLocked = item.IsLocked
      vm.detailFormData.IsExperienceProject = item.IsExperienceProject
      vm.detailFormData.IsSelfProject = item.IsSelfProject
      eosCommon.storage.set('currentViewTab', '');
      if (vm.EntitySort != 2) {
        vm.intoEquipmentList(item.IsExperienceProject, item.IsSelfProject)
        let preName = vm.EntitySort == 1 ? 'wb_' : 'yz_'
        vm.$router.push({ name: `${preName}project_detail`, params: vm.detailFormData })
      } else {
        vm.$router.push({ name: 'sm_project_detail', params: vm.detailFormData })
      }
      // vm.projectData = item
      this.uPDATE_SHOWWHICHTAB({
        showWhichTab: 4
      });
    },
    customLazy(src, errorImg) {
      return FUNC.customLazy(src, errorImg)
    },
    delRequest: function(ProjectId) {
      let vm = this;
      vm.$confirm('此操作将永久删除该项目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          AccessToken: FUNC.storage.get("AccessToken"),
          Parameters: {
            ProjectId: ProjectId
          }
        }
        DELETE(vm.deleteProUrl, data).then(function(res) {
          // 成功删除后提示用户
          if (res.data.State == 0) {
            vm.$message({
              // type: 'success',
              type: 'info',
              message: '删除成功!'
            });
            vm.tableLoad(undefined, vm.PageIndex)
          }
        })
      })
    },
    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      CompanyId = this.CompanyId,
      LockType = this.LockType,
      IndustryId = this.IndustryId,
      AlarmType = this.AlarmType,
      ProjectName = this.ProjectName) {
      let vm = this
      vm.loadingTable = true

      // if (vm.EntitySort == 1) {
      vm.PrincipalUserId = vm.UserId;
      // } else if (vm.EntitySort == 0) {}

      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "IsMaint": vm.EntitySort, //--是否维保方(0：业主列表；1：维保列表  必填)
        "PrincipalUserId": vm.PrincipalUserId, //--用户Id,IsMaint为0时表示项目负责人Id,为1表示项目维保人员Id

        "PageSize": PageSize, //条数（可为空，为空或者为0不分页）
        "PageIndex": PageIndex, //第几页（可为空，为空或为0时不分页）
        "CompanyId": CompanyId, //--企业Id，IsMaint为0时表示项目所属企业Id,为1表示项目维保方企业Id
        "LockType": LockType, //--是否锁定，(0：未加锁；1：加速，空或者-1：查全部)
        "IndustryId": IndustryId,
        "AlarmType": AlarmType, //--报警等级（空或-1：全部,0-正常；1-提醒;2-警告;3-报警(严重)）
        "ProjectName": ProjectName, //--项目名称
      };
      let url = vm.tableUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data.Result
            let Total = res.Data.Total
            // console.log(vm.Total)
            if (!Total) {
              vm.Total = 0
            } else {
              vm.Total = Total
            }
            // console.log(vm.Total)
            vm.reload(dataArr)
            // console.log(vm.tableData)
            vm.loadingTable = false
          }

        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    reload(dataArr) {
      if (this.EntitySort == 0) {
        for (let item of dataArr) {
          let teampCount = []
          if (item.EquipCountByType !== null) {
            let temp = item.EquipCountByType
            temp = temp.split(',')
            for (let item1 of temp) {
              let arr = item1.split(':')
              let newArr = {}
              newArr.name = `${arr[0]}数`
              newArr.value = arr[1]
              teampCount.push(newArr)
            }
            item.EquipCountByType = teampCount
          }
        }
      }
      // console.log(dataArr)
      this.tableData = dataArr
    },
    pageIndexChange(val) {
      this.PageIndex = val
      this.tableLoad(this.PageSize, this.PageIndex)
      this.scrollTop()
    },
    setImgWH(e) {
      let el = e.path[0]
      let normalScale = 150 / 100
      let imgScale = el.naturalWidth / el.naturalHeight
      if (imgScale > normalScale) {
        el.style.width = 'auto'
        el.style.height = '100%'
      } else {
        el.style.width = '100%'
        el.style.height = 'auto'
      }
      // console.log(e.path)
    },
    listenScroll() {
      let vm = this
      let el = vm.$refs.listRowCont
      // console.log(el.scrollTop)
      if (el.scrollTop > 0) {
        vm.isShowScrollTop = true
      } else {
        vm.isShowScrollTop = false
      }
    },
    deListenScroll() {
      let vm = this
      clearTimeout(vm.timeId)
      vm.timeId = setTimeout(function() {
        vm.listenScroll()
      }, 200)
    },
    scrollTop() {
      let vm = this
      let el = vm.$refs.listRowCont
      let timeId = setInterval(function() {
        el.scrollTop -= 20
        if (el.scrollTop <= 0) {
          clearInterval(timeId)
        }
      }, 10)
    },
    search() {
      this.tableLoad(this.PageSize, this.PageIndex = 1)
    },
    resizeBarH() {
      let vm = this
      if (vm.$refs.searchBar) {
        let el = vm.$refs.searchBar.$el
        vm.searchBarH = el.clientHeight
      }
    },
    deResizeBarH() {
      let vm = this
      clearTimeout(vm.timeId)
      vm.timeId = setTimeout(function() {
        vm.resizeBarH()
      }, 800)
    },
    setIndustryOpts() {
      let vm = this
      vm.loadingIndustryOpts = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = this.industryUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let opts = res.Data
            vm.IndustryOpts = opts
            vm.IndustryOpts[0].IndustryName = '全部行业'
            // vm.IndustryOpts.splice(0, 1) //删除"请选择行业"的多余选项
            // console.log(vm.IndustryOpts)
            vm.loadingIndustryOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },

    init() {
      let vm = this
      vm.EntitySort = FUNC.storage.get('EntitySort');
      vm.isAdmin = FUNC.storage.get('IsAdmin');
      vm.IsProjectAdmin = FUNC.storage.get('IsProjectAdmin')
      vm.setIndustryOpts()
      vm.GetCompanyUser()
      if (vm.EntitySort == 2) {
        vm.setCompanyOpts()
      } else {
        vm.GetTargetCompany()
      }
      vm.deResizeBarH()
      vm.fromMap()
      let el = vm.$refs.listRowCont
      // el.addEventListener('scroll', vm.deListenScroll)
    }
  },
  mounted() {
    let vm = this;
    vm.init()
    // window.addEventListener('resize', vm.deResizeBarH)
  },
  beforeDestroy() {
    let vm = this
    window.removeEventListener('resize', vm.deResizeBarH)
    let el = vm.$refs.listRowCont
    el.removeEventListener('scroll', vm.deListenScroll)
  }
}

</script>

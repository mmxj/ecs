<style lang='less' src="assets/css/dragStyle/mainDrag.less" scoped="scoped">
  /*引入样式表*/
</style>
<template>
  <div id="el_mainContent" class="el_mainContent">
    <!--显示场景图库start-->
    <scene-pic v-if='openScenePic'></scene-pic>
    <device_pic_view v-if="openEquiPic"></device_pic_view>
    <!--显示场景图库end-->
    <!--内容start-->
    <div id="drag_content" class="el_content" style="padding: 0;height: 100%;">

      <el-row class='c_wrap' style="height: 100%;">

        <!--左部列表start-->
        <el-row class=" fl left_lists">
          <!--左部列表头部start-->
          <div class="leftPartTitle">
            <div class="imgWrap"> <img v-lazy="customLazy(propsData.ProjectLogo,defaultPro_img)" width="35" height="35"> </div>
            <p class="nowrap" :title='propsData.ProjectName'>{{propsData.ProjectName}}</p>
          </div>
          <!--左部列表头部end-->
          <!--列表头部tab+搜索框wrap  start-->
          <div class='equipmentSearchArear'>
            <!--头部tab start-->
            <div class="navs_wrap">
              <span class="tab-title-bottom curp">

              <a @click="toggleTabs('equiObjist',true);" :class="{activeBg: get_currentViewTab_data=='equiObjist'}">
                <label >
                  <span class='curp'>场景列表</span>
              </label>
              </a>
              <a @click="toggleTabs('equiList',true);" :class="{activeBg: get_currentViewTab_data=='equiList'}">
                <label>
                  <span class='curp'>设备列表</span>
                </label>
              </a>
              </span>
            </div>
            <!--头部tab end-->

            <div id="equip_lists_search" v-show="get_currentViewTab_data=='equiList'" class="search_wrap">
              <el-select @change='delaySearch()' v-model="Status" placeholder="状态" class='w60els' style="left:5px;" size='small'>
                <el-option label="全部" value="0"></el-option>
                <el-option label="告警" value="1"></el-option>
                <el-option label="掉线" value="2"></el-option>
              </el-select>
              <el-input placeholder="设备名称" @change='delaySearch()' v-model="Keywords" class='nobr' size='small'> </el-input>
              <i @click="delaySearch()" style="position: absolute;right:13px;top: 8px;" class="fa fa-search m-r-5">
              </i>
            </div>
            <div v-show="get_currentViewTab_data=='equiObjist'" class="search_wrap" style="padding-left: 10px; padding-right: 10px;">
              <el-input size='small' v-model="equiListData.Keyword" placeholder="场景名称"></el-input>
              <i style="position: absolute;right:13px;top: 8px;" class="fa fa-search m-r-5">
              </i>
            </div>
          </div>

          <!--列表头部tab切换wrap  end-->
          <!--显示对应的列表start-->
          <div class="leftLists">
            <component :fresh="freshData" v-on:comfirClose="getComfirClose" v-on:hasNoTargetIdList="getTargetIdListInfo" :propsData="equiListData" :is="equiListData.currentView" v-on:pageIndexChange="getPageIndex" :dataSend.sync='equiListDataSend' :tableLoad='tableLoad'> </component>
          </div>
          <!--显示对应的列表end-->
        </el-row>
        <!--左部列表end-->
        <!--右侧显示 start-->
        <div v-if="get_currentViewTab_data=='equiObjist'" class="ovh right_c" style="margin-top: 15px;">
          <!--右侧上方导航栏start-->
          <div id="drag_wrap">
            <div class="drag_panel_header">
              <div class="funLists">
                <!--所有的数据都来自mapGetters-->

                <!--导航栏上方左侧刷新频率start-->
                <!--有当前数据 且不是当前设置？-->
                <div v-show="(!get_curr_setting)&& get_curr_isHasData" id="freshTimeSetting" class="clearfix">
                  <div class="timerSetting pull-left"> <span style="" class="freshTimeSettingSpan">刷新频率：</span>
                    <span class="freshTimeSettingDataSpan">{{get_freshTime_Data.Rate}}</span>
                    <span style="padding: 0 5px;" class="freshTimeSettingSpan">秒</span>
                    <!--按角色显示 isShowDebugBtnByRole_PJ 按钮 init中设置-->
                    <span v-if="isShowDebugBtnByRole_PJ" style="border: 1px solid #E2E6E9; " class="btn_wrap">
                        <button style="margin: 0px;"  @click='freshTimeSetting()' id="btn_t" type="button" class="btn fullScreen"  >
                            <i class="fa fa-cog"></i>
                        </button>
                    </span>

                  </div>
                </div>
                <!--导航栏上方左侧刷新频率end-->
                <!--导航栏上方功能标签start-->
                <ul v-if="get_curr_setting && get_curr_isHasData" class="drag_funtion_list clearfix" style="width: 100%;">
                  <li class="pull-left"> <img draggable="true" title="图片" class="img" src="static/css/images/new_drag/1.png" id="icon_upLoadImg" /> </li>
                  <li class="pull-left"> <img draggable="true" title="文本" class="img" src="static/css/images/new_drag/2.png" id="icon_label" /> </li>
                  <li class="pull-left"> <img draggable="true" title="曲线" class="img" src="static/css/images/new_drag/3.png" id="icon_chart" /> </li>
                  <li class="pull-left"> <img draggable="true" title="仪表盘" class="img" src="static/css/images/new_drag/4.png" id="icon_dashboard" /> </li>
                  <li class="pull-left"> <img draggable="true" title="数据块" class="img" src="static/css/images/new_drag/5.png" id="icon_datablock" /> </li>
                  <li class="pull-left"> <img draggable="true" title="状态" class="img" src="static/css/images/new_drag/6.png" id="icon_datastate" /> </li>
                  <div class="reback_btn pull-right" style="margin-left: 30px;height: 32px; padding: 0px 15px; padding-left:30px;border-left: 1px solid #D1E3E2;">
                    <el-button class='fr' size='small' style='' @click="toggleTabs('',false,true)"> <i class="fa fa-mail-reply-all mr5"></i>返回</el-button>
                  </div>
                  <ul class="right_operations pull-right">
                    <li class="pull-right"> <img @click="confirmClose()" title="关闭" class="img" src="static/css/images/new_drag/9.png" id="icon_close" /> </li>
                    <li class="pull-right"> <img @click="confirmGiveUp()" title="放弃" class="img" src="static/css/images/new_drag/8.png" id="icon_give_up" /> </li>
                    <li class="pull-right"> <img @click="saveAllDragDatas()" title="保存" class="img" src="static/css/images/new_drag/7.png" id="icon_save" /> </li>
                  </ul>
                </ul>
                <!--导航栏上方功能标签end-->
                <!--&& propsData.IsSelfProject==1-->
                <!--导航栏上方右侧编辑按钮start-->
                <!--返回上一页start-->
                <div v-if="(!get_curr_setting)" class="reback_btn pull-right" style="margin-left: 30px;height: 32px; margin-top: 10px;padding: 0px 15px; padding-left:30px;border-left: 1px solid #D1E3E2;">
                  <el-button class='fr' size='small' style='' @click='btnReturn'> <i class="fa fa-mail-reply-all mr5"></i>返回</el-button>
                </div>
                <!--返回上一页end-->
                <!--&& propsData.IsSelfProject==1-->
                <!--显示配置按钮start-->
                <ul v-if="(!get_curr_setting) && get_curr_isHasData && isShowDebugBtnByRole_PJ" class="pull-right" style="padding: 12px 0;margin-bottom: 0;">
                  <span class="pull-left btn_wrap">
                    <button style="padding-top: 3px; padding-bottom: 3px;font-size: 12px;" @click='comeToEdit()' id="btnInsert" type="button" class="btn fullScreen">
                        <i style="margin-left: 0;" class="fa  fa-cog m-r-5"></i>配置
                    </button> 
                  </span>
                  <!--全屏显示start-->
                  <span class="pull-left btn_wrap">
                    <button style="font-size: 12px;padding-top: 3px; padding-bottom: 3px;margin-right: 0;"  @click='intoFullScreen()' id="btn_t" type="button" class="btn fullScreen"  >
                        <i class="fa fa-arrows"></i>
                    </button>
                 </span>
                  <!--全屏显示end-->
                </ul>
                <!--显示配置按钮end-->
                <!--导航栏上方右侧编辑按钮end-->
              </div>
            </div>
          </div>
          <!--右侧上方导航栏end-->
          <!--右侧下方显示start-->
          <div class="main_contents_wrap" style="position: absolute;width: 100%; top: 50px;bottom: 15px; ">
            <!--右侧内容区start-->
            <div class="el_mainContent" ref='indexContent' style='height:100%;position: relative;top: 0; bottom: 0;border: 1px solid rgb(209, 227, 226);' v-loading='get_dragDataState.isDragDetalLoading'>

              <div v-if="(!get_curr_setting) && (!get_curr_isPreview)&& get_curr_isHasData" class="drag_panel_content" style="position: relative;">
                <div class="noDataimg"> <img src="static/css/images/drag/noSettingPage.png" />
                  <p>未配置显示界面</p>
                </div>
              </div>

              <div v-if="(!get_curr_setting) && (!get_curr_isPreview)&& (!get_curr_isHasData)" class="drag_panel_content" style="position: relative;">
                <div class="noDataimg"> <img src="static/css/images/drag/noSettingPage.png" />
                  <p>不存在自定义场景</p>
                </div>
              </div>
              <!--有当前预览数据显示start-->
              <div v-if="get_curr_isPreview && get_curr_isHasData" class="drag_panel_content droptarget" style="position: relative;">

                <div v-bind:class="{bgC:get_curr_setting}" class="drag_region">
                  <!--拖拽组件 查看get_upLoad_img_data设置的地方  只负责显示-->
                  <common-drag v-for="(item,index) in get_upLoad_img_data" :propsData="item" :key="item.refs" ref="wraps_upLoadImg">
                    <div class="content" style="position: relative;">
                      <div>
                        <h2 class="typeTips" v-if="!item.editData.imgUrl">请先上传图片</h2> <img v-if="item.editData.imgUrl" style="margin: 0 auto; width: 100%; height: 100%;" :src="item.editData.imgUrl" class="avatar" /> </div>
                    </div>
                  </common-drag>
                  <!--拖拽组件-->

                  <!--拖拽图表显示start组件-->
                  <common-drag v-for="(item,index) in get_chart_data" :propsData="item" :key="item.refs" ref="wraps_chart">
                    <div class="content content_W">
                      <div class="subContent">
                        <common-chart :propsData="item"></common-chart>
                      </div>
                    </div>
                  </common-drag>
                  <!--拖拽图表显示end组件-->

                  <!--拖拽文本显示组件-->
                  <common-drag v-for="(item,index) in get_label_data" :propsData="item" :key="item.refs" ref="wraps_label">
                    <div class="content content_W">
                      <div class="subContent">
                        <common-label :item="item"></common-label>
                      </div>
                    </div>
                  </common-drag>
                  <!--拖拽文本显示组件-->

                  <!--拖拽仪表盘显示组件start-->
                  <common-drag v-for="(item,index) in get_dashboard_data" :propsData="item" :key="item.refs" ref="wraps_dashboard">
                    <div class="content content_W">
                      <div class="subContent">
                        <!--仪表盘-->
                        <common-dashboard :propsData="item"></common-dashboard>
                      </div>
                    </div>
                  </common-drag>
                  <!--拖拽仪表盘显示组件end-->

                  <!--拖拽数据块显示组件start-->
                  <common-drag v-for="(item,index) in get_datablock_data" :propsData="item" :key="item.refs" ref="wraps_datablock">
                    <div class="content content_W">
                      <div class="subContent">
                        <common-datablock :propsData="item"></common-datablock>
                      </div>
                    </div>
                  </common-drag>
                  <!--拖拽数据块显示组件end-->

                  <common-drag v-for="(item,index) in get_datastate_data" :propsData="item" :key="item.refs" ref="wraps_datastate">
                    <div class="content content_W">
                      <div class="subContent">
                        <common-datastate :propsData="item"></common-datastate>
                      </div>
                    </div>
                  </common-drag>

                  <common-dialog v-if="get_ctrData.dialogVisible"></common-dialog>
                </div>
              </div>
              <!--有当前预览数据显示end-->
            </div>
            <!--右侧内容区end-->
            <edit_uploadimg v-for="(item,index) in get_upLoad_img_data" :propsData="item" :key="item.refs" :currentkey="index">
            </edit_uploadimg>
            <edit_label v-for="(item,index) in get_label_data" :propsData="item" :key="item.refs" :currentkey="index">
            </edit_label>
            <edit_chart v-for="(item,index) in get_chart_data" :propsData="item" :key="item.refs" :currentkey="index">
            </edit_chart>
            <edit_dashboard v-for="(item,index) in get_dashboard_data" :propsData="item" :key="item.refs" :currentkey="index">
            </edit_dashboard>
            <edit_datablock v-for="(item,index) in get_datablock_data" :propsData="item" :key="item.refs" :currentkey="index">
            </edit_datablock>
            <edit_datastate v-for="(item,index) in get_datastate_data" :propsData="item" :key="item.refs" :currentkey="index">
            </edit_datastate>
          </div>
          <!--右侧下方显示end-->
        </div>

        <!--右侧显示 end-->
        <equiTab style="height: 100%;" v-if="get_currentViewTab_data=='equiList'" :equipmentData="equiTabData">
        </equiTab>

      </el-row>
    </div>
    <!--内容end-->
  </div>
</template>
<script>
let reDialog=msg=>{
    vdialog({
      type: 'confirm',
      title: '提示',
      content: msg,
      ok: function() {},
      cancel: true,
      modal: true
    });
}
import * as Common from 'src/assets/js/common';
import commonFn from 'assets/js/common/commonFunc';
const FUNC = Common.Func //通用函数
const AXIOS = FUNC.axios //定义axios
const GET = AXIOS.get
const URL = Common.Const.url //定义url
const DELETE = Common.Func.axios.delete
import scenePic from 'components/page/platforms/basicDataManage/scene_pic.vue' //选择场景时平台上传图片时出现的场景图库
import device_pic_view from 'components/page/platforms/basicDataManage/device_pic_view.vue' //选择设备时上传图片时出现的场景图库
import equiObjist from 'components/common/equipment_objlist' //左侧场景列表
import equiList from 'components/common/equipment_list' //左侧设备列表
import equiTab from './equipment_tabs' //未知 设备管理的一部分
import consumptionManage from 'components/page/maintenanceAgent/consumption_manage'
import commonDrag from './drag/commonDrag' //拖拉组件
import edit_uploadimg from './drag/edit_upLoadImg' //上传图片组件
import edit_label from './drag/edit_label' //文本组件
import edit_chart from './drag/edit_chart' //图表组件
import edit_datablock from './drag/edit_datablock' //数据块设置
import commonChart from './drag/commonChart'//拖拽组件
import commonDatablock from './drag/commonDatablock' //通用数据模块设置
import edit_dashboard from './drag/edit_dashboard' //表盘设置
import commonDashboard from './drag/commonDashboard'//通用表盘组件
import commonLabel from './drag/commonLabel' //通用标题组件
import edit_datastate from './drag/edit_datastate' //状态控制组件
import commonDatastate from './drag/commonDatastate'; //通用状态设置组件
import commonDialog from './drag/commonDialog' //对话框

import {
  mapGetters,
  mapMutations
} from 'vuex'
import {
  getStyle,//获取计算后的元素style,用法如：getStyle['width']　
  deletePanel, //清除仪表数据
  NumAscSort, //传入参数a ， b 返回a-b的结果
  showNowBorder //是否显示拖动框
} from 'src/assets/js/common/util';
import {
  initConfig, //默认数据
  DragImg, //拖拽图片
  DragLabel, //拖拽标题
  DragChart, //拖拽图表
  DragDatablock, //拖拽数据块
  DragDashboard, //拖拽表盘
  DragDatastate, //拖拽状态
  StyleSavecommon  //保存字体样式数据
} from 'src/assets/js/common/commonData';

export default {
  data: function() {
    return {
      timeId: null,
      isSaving: false,
      tabText: '',
      isClickReback: false,
      ProjectLogo: '',
      defaultPro_img: 'static/css/img/default_porject_bg.png',
      /**********************/
      AccessToken: eosCommon.storage.get("AccessToken"), //获取当前toker
      tid: null,
      CompanyId: '',
      ProjectId: '',
      EquipmentTypeId: '',
      OnlineStatus: '',
      RunStatus: '',
      AlarmStatus: '',
      Status: '0',
      ProjectName: '',
      EquipmentId: '',
      equiListDataSend: {},
      equiTabData: {
        EquipmentName: '',
        IsOnline: '',
        RunState: '',
        AlarmLevel: '',
      },
      equiListData: {
        tableData: [],
        AssemblageList: [],
        currentView: '',
        hasMakeFreshTime: false,
        Keyword: '',
        isNotClick: false
      },
      freshData: {
        hasMakeFreshTime: false,
        isClickSave: false
      },
      Total: 0,
      loading: true,
      PageSize: 15,
      PageIndex: 1,
      Keywords: '',
      selectInfo: '',
      equipmentListUrl: URL.QUERYEQUIPMENTLIST, //获取服务条目
      detailUrl: URL.EQUIPMENTDETAIL, //获取设备详情
      canShow: false,
      isShowDebugBtnByRoute: null,
      //数据处理
      //图片上传数据
      //imgUrl:''
      c_type: '',
      c_id: '',
      //保存数据
      Texts: [],
      Images: [],
      Graphs: [],
      TextGroups: [],
      Dashboards: [],
      StateGraphs: [],
      IsEquipment: false,
      isDataChange: false,
      cometoData: false,
      dragPosReduceLeft: 295,
      dragPosReduceTop: 127,
      isShowDebugBtnByRole_PJ: null,
      isCanCtrl: 0,
      isClickPage: false
    }
  },
  components: {
    equiObjist,//左侧场景列表components/common/equipment_objlist
    equiList,//左侧设备列表
    equiTab, //未知 设备管理的一部分
    commonDrag, //拖拉组件
    edit_uploadimg,//上传图片
    edit_label, //标题
    edit_chart, //图表
    edit_datablock, //数据块
    commonChart, //通用表
    commonDatablock, //通用数据块
    edit_dashboard, //指针
    commonDashboard,
    commonLabel,
    edit_datastate,
    commonDatastate,
    scenePic,
    device_pic_view,
    commonDialog
  },
  computed: {
    typeDatas() {
      return initConfig.typeDatas();
    },
    defLabelStyle() {
      return initConfig.defLabelStyle;
    },
    computeStyle() {
      return this.get_curr_isPreview;
    },
    ...mapGetters(['get_ctrData',//中心数据
      'openScenePic',//打开平台场景图片
      'openEquiPic', //打开平台设备图片
      'isShowSideBar',//显示操作边框
      'get_equipment_data',//获取设备数据
      'get_protocol_data',//获取协议数据
      'get_upLoad_img_ID',//获取上传图片的id
      'get_label_ID', //获取文本的id
      'get_chart_ID', //获取图表的id
      'get_line_ID', //获取线id
      'get_datablock_ID', //获取数据块id
      'get_dashboard_ID', //获取仪表盘id
      'get_datastate_ID', //获取数据状态
      'get_curr_setting', //获取当前设置
      'get_curr_isPreview',//当前预览值
      'get_curr_isHasData', //当前是否存在数据
      //数据
      'get_upLoad_img_data', //获取上传图片的数据
      'get_label_data', //获取文本的数据
      'get_chart_data', //获取图表的数据
      'get_datablock_data', //获取数据块的数据
      'get_dashboard_data', //获取仪表盘的数据
      'get_datastate_data', //获取数据初始状态
      'get_curr_TargetId', //当前点击的id
      'get_tempDrag_Datas', //临时拖拽的数据
      'get_freshTime_Data', //获取刷新的时间
      'get_dragDataState', //获取拖拽数据的状态
      'get_refs_data', //获取refs 的数据
      'get_isAddDrag_state', //获取是否添加drag 的状态
      'get_currentViewTab_data', //获取当前视图的tab的数据
      'get_isDeleteClick_state' //获取是否点击了删除的状态
    ])
  },
  watch: {
    "get_freshTime_Data.Time" (val, oldVal) {
      this.isDataChange = true;
      setTimeout(() => {
        this.isDataChange = false;
      }, 500);
    },
    "propsData.ProjectId" (val, oldVal) {
      if (!val) {
        return;
      }
      this.ProjectId = val;
      this.gET_EQUIPMENT_DATA({
        EquipmentList: []
      });

      this.gETPROTOCOLDATA({
        protocolList: []
      });
    },
    propsData() {
      let vm = this
      let props = vm.propsData
      vm.equiListData.ProjectId = props.ProjectId
      vm.equiListData.ProjectName = props.ProjectName
      vm.equiListData.CompanyId = props.CompanyId
      vm.equiListData.IsExperienceProject = props.IsExperienceProject
      vm.equiListData.IsSelfProject = props.IsSelfProject
      vm.CompanyId = props.CompanyId || ''
      vm.ProjectId = props.ProjectId || ''
      vm.EquipmentTypeId = props.EquipmentTypeId || ''
      vm.OnlineStatus = props.OnlineStatus;
      vm.RunStatus = props.RunStatus || ''
      vm.AlarmStatus = props.AlarmStatus || ''
      vm.ProjectName = props.ProjectName || ''
      vm.tid = null
      vm.PageIndex = 1;
      vm.tid = setTimeout(function() {
        vm.tableLoad()
      }, 300)
    },
    'equiListData.Keyword' (val, oldval) {
      if (val != '') {
        this.equiListData.isNotClick = true;
      }
    },
    PageIndex(val) {
      if (this.isClickPage) {
        this.tableLoad(this.PageSize, this.PageIndex)
      }
    },
    equiListDataSend(val) {
      if (this.equiListDataSend.EquipmentId) {
        this.getEquiDetail()
      }
    }
  },
  props: ['propsData'],
  // projectData: { //传递到子组件的数据
  //   ProjectId: this.$route.params.ProjectId,//项目id
  //   ProjectName: this.$route.params.ProjectName,//项目名称
  //   currentView: '',//当前视图
  //   IsLocked: this.$route.params.IsLocked,//上锁的
  //   IsExperienceProject: this.$route.params.IsExperienceProject,//体验项目
  //   IsSelfProject: this.$route.params.IsSelfProject, //
  //   EquipmentId: '' //设备
  // },
  methods: {
    ...mapMutations({
      gET_EQUIPMENT_DATA: 'GET_EQUIPMENT_DATA',//获取设备数据
      gETPROTOCOLDATA: 'GETPROTOCOLDATA',//获得协议数据
      uPDATETEMPDATA: 'UPDATETEMPDATA',//更新临时数据
      uPDATE_SETTING_STATE: 'UPDATE_SETTING_STATE',//设置更新状态
      uPDATE_ISADDDRAG_STATE: 'UPDATE_ISADDDRAG_STATE',//更新是添加拖动状态
      uPDATE_IMG_ID: 'UPDATE_IMG_ID',//更新IMG ID
      uPDATE_LABEL_ID: 'UPDATE_LABEL_ID',//更新标签ID
      //底图
      uPDATE_UPLOAD_IMG: 'UPDATE_UPLOAD_IMG',//更新上传IMG
      //文本
      uPDATE_LABEL: 'UPDATE_LABEL', //更新标签
      uPDATE_DRAGDATA_STATE: 'UPDATE_DRAGDATA_STATE',//更新拖动数据状态
      uPDATE_CURRENTVIEWTAB: 'UPDATE_CURRENTVIEWTAB',//更新当前视图选项卡
      //曲线
      uPDATE_CHART: 'UPDATE_CHART', //更新图表
      uPDATE_CHART_ID: 'UPDATE_CHART_ID',//更新图表的ID
      uPDATE_LINE_ID: 'UPDATE_LINE_ID',//更新行(线)ID
      uPDATE_DATABLOCK_ID: 'UPDATE_DATABLOCK_ID',//更新数据块ID
      uPDATE_DATABLOCK: 'UPDATE_DATABLOCK',//更新数据块
      dELETE_LABEL: 'DELETE_CURR_PANEL', //更新当前面板
      uPDATE_DASHBOARD_ID: 'UPDATE_DASHBOARD_ID',//更新仪表板ID
      uPDATE_DASHBOARD: 'UPDATE_DASHBOARD',//更新仪表板
      uPDATE_DATASTATE_ID: 'UPDATE_DATASTATE_ID',//更新数据状态ID
      uPDATE_DATASTATE: 'UPDATE_DATASTATE',//更新数据状态
      uPDATE_SHOWWHICHTAB: 'UPDATE_SHOWWHICHTAB',//更新显示哪些选项卡
      uPDATE_CTRDATA: 'UPDATE_CTRDATA',//更新CTR数据
      uPDATE_EXPOSELF: 'UPDATE_EXPOSELF',//更新EXPOSELF
      cANCTRL: 'UPDATE_CNACTRL'//更新取消状态
    }),
    btnReturn() { //点击返回
      let vm = this;
      vm.$router.go(-1)
    },
    isFromMap() { //是否来自地图
      let route = this.$route
      let bool = route.params.isFromMap || route.query.warn
      return bool
    },
    customLazy(src, errorImg) {
      return commonFn.customLazy(src, errorImg)
    },
    intoFullScreen() {
      window.open("/#/full_page_?TargetId=" + this.get_curr_TargetId + '&IsEquipment=false')
    },
    freshTimeSetting() {

      let vm = this;
      vm.$prompt('刷新时间(秒):', '设置刷新频率', { //修改样式的位置不知在哪 user.less？等看到其他messagebox在看看引用的是不是同一个样式
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[5-9]$|^[1-9]\d{1,2}$|1000$/,
        inputValue: vm.get_freshTime_Data.Rate,//获取默认的值
        inputErrorMessage: '刷新时间不能为空且为不小于5且不大于1000的整数'
      }).then(({
        value
      }) => {
        vm.SetAssemblageDataRate(value); //设置该值
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消操作'
        });
      });
    },
    SetAssemblageDataRate(val) { //提交刷新频率的修改
      let vm = this;
      let param = {
        "AccessToken": vm.AccessToken,
        "Parameters": {
          "TargetId": vm.get_curr_TargetId,
          "Rate": val
        }
      };
      let url = eosCommon.ENTERPRISE_API + "api/Assemblage/SetAssemblageDataRate";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        // eosCommon.checkCode 检查状态码 返回正确
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.freshData.hasMakeFreshTime = !vm.freshData.hasMakeFreshTime;

          vm.$message({
            type: 'success',
            message: '设置成功！'
          });
        }
      });
    },
    comeToEdit() {//点击配置
      let vm = this;
      vm.uPDATE_SETTING_STATE({ //更改更新状态
        curr_setting_state: true, //当前设置状态
        isPreview: true, //是否前视图
        targetId: vm.get_curr_TargetId, //目标id
        isHasData: true //是否有数据
      });
    },
    confirmGiveUp() {
      let vm = this
      if (vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
        return;
      }
      vm.$confirm('部分操作暂未保存, 是否继续放弃操作?', '提示', {
        confirmButtonText: '是',
        cancelButtonText: '否',
        type: 'warning'
      }).then(() => {
        //确定操作
        vm.giveUpTempDragDatas();
      }).catch(() => {})
    },
    giveUpTempDragDatas() {
      let vm = this;
      vm.clearStorageTempDragData();
    },
    clearStorageTempDragData() {//清除存储临时拖放数据
      let vm = this;
      deletePanel(vm.get_tempDrag_Datas);
      vm.uPDATETEMPDATA({
        isClear: true,
        data: 'giveUp'
      });
      vm.dELETE_LABEL({
        typeName: '',
        currenIndex: '',
        isDeleteClick: false,
        isResetOperateMemory: true
      });
    },
    getComfirClose(data) {
      this.saveAllDragDatas();
    },
    getTargetIdListInfo(data) {
      this.cometoData = data;
      if (this.cometoData && (!this.equiListData.isNotClick)) {
        this.equiListData.currentView = 'equiList';
        this.uPDATE_CURRENTVIEWTAB('equiList');
        this.IsEquipment = true;
        this.tableLoad();
      }
    },
    confirmClose() { //关闭前操作
      let vm = this
      if (vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
        vm.uPDATE_SETTING_STATE({
          curr_setting_state: false,
          isPreview: true,
          targetId: vm.get_curr_TargetId,
          isHasData: true
        });
        return;
      }
      vm.$confirm('部分操作暂未保存, 是否保存所有操作后再关闭?', '提示', {
        confirmButtonText: '先保存',
        cancelButtonText: '直接关闭',
        type: 'warning',
        //showClose:false,
        isCustomClose: true,
        closeOnClickModal: false
      }).then(() => {
        //确定操作
        vm.saveAllDragDatas();
        vm.uPDATE_SETTING_STATE({
          curr_setting_state: false,
          isPreview: true,
          targetId: vm.get_curr_TargetId,
          isHasData: true
        });
      }).catch(() => {
        vm.clearStorageTempDragData();
        vm.uPDATE_SETTING_STATE({
          curr_setting_state: false,
          isPreview: true,
          targetId: vm.get_curr_TargetId,
          isHasData: true
        });
      })
    },
    saveAllDragDatas() {
      let vm = this;
      if (vm.isSaving) return
      vm.isSaving = true
      clearTimeout(vm.timeId)
      vm.timeId = setTimeout(function() {
        vm.isSaving = false
      }, 1000)
      let len_type = vm.typeDatas.length;
      let len_label = vm.get_label_data.length;
      let len_img = vm.get_upLoad_img_data.length;
      let len_chart = vm.get_chart_data.length;
      let len_datablock = vm.get_datablock_data.length;
      let len_dashboard = vm.get_dashboard_data.length;
      let len_datastate = vm.get_datastate_data.length;
      vm.Images = [];
      vm.Texts = [];
      vm.Graphs = [];
      vm.TextGroups = [];
      vm.Dashboards = [];
      vm.StateGraphs = [];
      for (let j = 0; j < len_type; j++) {
        if (vm.typeDatas[j] == 'get_label_data') {
          for (let val of vm.get_label_data) {
            /*初始化赋值---开始*/
            let editData = val.editData;
            let Style = val.editData.Style;
            let PostPositionStyle = val.editData.PostPositionStyle;
            let PrePositionStyle = val.editData.PrePositionStyle;
            /*初始化赋值结束---开始*/
            vm.getStyleValue(val);
            let typeName = val.typeName;
            let refs = val.refs;
            let type = editData.selectDataType == 'fixedTxt' ? 1 : 2;
            let PrePositionValue = editData.PrePositionValue;
            let IsMain = editData.IsMain;
            let AliasName = editData.AliasName;
            let DefaultValue = '';
            if (type == 1) DefaultValue = editData.labelContent;
            else DefaultValue = editData.noDataVal;
            let PostPositionValue = editData.PostPositionValue;
            let TerminalEquipmentId = editData.dataStream.EquipmentId
            let Address = editData.dataStream.RegisterAddress
            //let stylesType=[]
            if (type == 2) {
              if (!TerminalEquipmentId) {
                reDialog('数据流模式必须先选择设备！');
                return false;
              }
            }
            vm.Texts.push({
              "TextId": refs,
              "Type": type,
              "PrePositionValue": PrePositionValue,
              "DefaultValue": DefaultValue,
              'PostPositionValue': PostPositionValue,
              "TerminalEquipmentId": TerminalEquipmentId,
              "Address": Address,
              IsMain,
              AliasName,
              "Style": new StyleSavecommon(Style),
              "PostPositionStyle": new StyleSavecommon(PostPositionStyle),
              "PrePositionStyle": new StyleSavecommon(PrePositionStyle),
              "Layout": JSON.stringify(val.editData.layOutStyle),
              "Level": 2
            });
          }
        } else if (vm.typeDatas[j] == 'get_upLoad_img_data') {
          for (let val of vm.get_upLoad_img_data) {
            vm.getStyleValue(val);
            let typeName = val.typeName;
            let refs = val.refs;
            vm.Images.push({
              "ImageId": refs,
              "ResoureId": val.editData.ResoureId,
              "Layout": JSON.stringify(val.editData.layOutStyle),
              "Level": 2
            });
          }
        } else if (vm.typeDatas[j] == 'get_chart_data') {
          for (let val of vm.get_chart_data) {
            vm.getStyleValue(val);
            let typeName = val.typeName;
            let refs = val.refs;
            let Layout = JSON.stringify(val.editData.layOutStyle);
            let BackgroundColor = val.backgroundColor;
            let LeftYColor = val.yAxis.lineColor;
            let RightYColor = val.rightYAxis.lineColor;
            let IsShowLeftY = val.yAxis.visible;
            let IsShowRightY = val.rightYAxis.visible;
            let IsShowXCutLine = val.xAxis.gridLineWidth;
            let IsShowYCutLine = val.yAxis.gridLineWidth;
            let XCutLineColor = val.xAxis.gridLineColor;
            let YCutLineColor = val.yAxis.gridLineColor;
            let singleChartDataLists = val.singleChartDataLists;
            let noRegisterAddressSingle = singleChartDataLists.filter((v) => {
              return v.dataStream.RegisterAddress == '';
            })
            if (noRegisterAddressSingle.length > 0) {
              reDialog('每条曲线中协议地址不能为空！');
              return false;
            }
            let Items = [];
            for (let m of singleChartDataLists) {
              Items.push({
                "LineId": m.lineId,
                "Name": m.yData.name,
                "TerminalEquipmentId": m.dataStream.EquipmentId,
                "Address": m.dataStream.RegisterAddress,
                "Color": m.yData.color,
                "IsRightY": m.yData.yAxis == 1,
              });
            }
            vm.Graphs.push({
              "GraphId": refs,
              "Theme": "",
              "Layout": Layout,
              "Level": 1,
              "Interval": 10,
              "BackgroundColor": BackgroundColor,
              "LeftYColor": LeftYColor,
              "RightYColor": RightYColor,
              "IsShowLeftY": IsShowLeftY,
              "IsShowRightY": IsShowRightY,
              "IsShowXCutLine": IsShowXCutLine,
              "IsShowYCutLine": IsShowYCutLine,
              "XCutLineColor": XCutLineColor,
              "YCutLineColor": YCutLineColor,
              "Items": Items
            });
          }
        } else if (vm.typeDatas[j] == 'get_datablock_data') {
          for (let val of vm.get_datablock_data) {
            vm.getStyleValue(val);
            let typeName = val.typeName;
            let refs = val.refs;
            let Theme = val.title;
            let Layout = JSON.stringify(val.editData.layOutStyle);
            let BackgroundColor = val.editData.datablockBg;
            let ThemeColor = val.editData.datablockTitleBg;
            let singleDatablockLists = val.singleDatablockLists;
            let Texts = [];
            for (let v of singleDatablockLists) {
              Texts.push({
                "TextItemId": v.lineID,
                "TerminalEquipmentId": v.dataStream.EquipmentId,
                "Address": v.dataStream.RegisterAddress,
                "PrePositionStyle": new StyleSavecommon(v.PrePositionStyle),
                "PostPositionStyle": new StyleSavecommon(v.PostPositionStyle),
                "PrePositionValue": v.dataName,
                "PostPositionValue": v.Unit,
                "IsMain": v.IsMain,
                "AliasName": v.AliasName,
                "Value": ""
              })
            }
            vm.TextGroups.push({
              "TextGroupId": refs,
              "Theme": Theme,
              "ThemeColor": ThemeColor,
              "BackgroundColor": BackgroundColor,
              "Texts": Texts,
              "Layout": Layout,
              "Style": new StyleSavecommon(val.editData.Style),
              "Level": "1"
            });
          }
        } else if (vm.typeDatas[j] == 'get_dashboard_data') {
          for (let val of vm.get_dashboard_data) {
            vm.getStyleValue(val);
            let refs = val.refs;
            let TerminalEquipmentId = val.dataStream.EquipmentId;
            let Address = val.dataStream.RegisterAddress;
            let Theme = val.DisplayName;
            let IsMain = val.IsMain;
            let AliasName = val.AliasName;
            let Unit = val.Unit;
            let Layout = JSON.stringify(val.editData.layOutStyle);
            let colorSettingInfo = val.colorSettingInfo;
            let Conifg = [];
            for (let v of colorSettingInfo) {
              Conifg.push({
                "Color": v.regionColor,
                "UpperValue": v.endNum,
                "FloorValue": v.startNum
              })
            }
            vm.Dashboards.push({
              "DashboardId": refs,
              "TerminalEquipmentId": TerminalEquipmentId,
              "Address": Address,
              "DefaultValue": 0,
              "Layout": Layout,
              IsMain,
              AliasName,
              "Theme": Theme,
              "Unit": Unit,
              "Level": 1,
              "Conifg": Conifg
            });
          }
        } else if (vm.typeDatas[j] == 'get_datastate_data') {
          for (let val of vm.get_datastate_data) {
            vm.getStyleValue(val);
            let refs = val.refs;
            let TerminalEquipmentId = val.dataStream.EquipmentId;
            let Address = val.dataStream.RegisterAddress;
            let Layout = JSON.stringify(val.editData.layOutStyle);
            vm.StateGraphs.push({
              "StateGraphId": refs,
              "TerminalEquipmentId": TerminalEquipmentId,
              "Address": Address,
              "Layout": Layout,
              "Level": 1
            });
          }
        }
      } //提交数据
      vm.submitDragDatas();
    },
    validateDrag() {
      //Images
      let vm = this;
      for (let i = 0; i < vm.Images.length; i++) {
        if (!vm.Images[i].ResoureId) {
          reDialog('请先上传底图！');
          return false;
        }
      }
      //TextGroups
      for (let j of vm.TextGroups) {
        for (let m of j.Texts) {
          if (m.TerminalEquipmentId == '' || m.Address == '') {
            reDialog('数据块中请先选择设备和协议地址！');
            return false;
          }
        }
      }
      //Dashboards
      for (let val of vm.Dashboards) {
        let Conifg = val.Conifg,
          UpperValueArr = [],
          isOrdered = true,
          isNum = true;
        if (val.TerminalEquipmentId == '' || val.Address == '') {
          reDialog('仪表盘中请先选择设备和协议地址！');
          return false;
        }
        for (let i of Object.keys(Conifg)) {
          if (isNaN(Number(Conifg[i].FloorValue))) {
            reDialog('仪表盘中配置值须是数字！');
            return false;
          }
          if (i == 0) {
            UpperValueArr.push(Number(Conifg[i].FloorValue));
            UpperValueArr.push(Number(Conifg[i].UpperValue));
          } else {
            UpperValueArr.push(Number(Conifg[i].UpperValue));
          }
        }
        let OriginalUpperValueArr = [...UpperValueArr];
        UpperValueArr.sort(NumAscSort);
        for (let index of Object.keys(OriginalUpperValueArr)) {
          if (OriginalUpperValueArr[index] != UpperValueArr[index]) {
            reDialog('仪表盘中配置值须从小到大排列！');
            return false;
          }
        }
      }
      //StateGraphs
      for (let sVal of vm.StateGraphs) {
        if (sVal.TerminalEquipmentId == '' || sVal.Address == '') {
          reDialog('状态控件中请先选择设备和协议地址！');
          return false;
        }
      }
      return true;
    },
    submitDragDatas() {
      let vm = this;
      let res = vm.validateDrag();
      if (!res) {
        return;
      }
      let param = {
        "AccessToken": vm.AccessToken,
        "Parameters": {
          "IsEquipment": vm.IsEquipment,
          //"IsEquipment": (vm.equiListData.isNotClick && (vm.tabText=='equiObjist')) ? true : false,
          "TargetId": vm.get_curr_TargetId,
          "Html": '',
          "Texts": vm.Texts,
          "Images": vm.Images,
          "Graphs": vm.Graphs,
          "TextGroups": vm.TextGroups,
          "Dashboards": vm.Dashboards,
          "StateGraphs": vm.StateGraphs
        }
      };
      let url = eosCommon.ENTERPRISE_API + "api/Assemblage/SetAssemblageContent";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.$message({
            type: 'success',
            message: '保存成功！'
          });
          vm.uPDATETEMPDATA({
            isClear: true,
            data: 'save'
          });
          vm.dELETE_LABEL({
            typeName: '',
            currenIndex: '',
            isDeleteClick: false,
            isResetOperateMemory: true
          });
          if (vm.isClickReback) {
            vm.uPDATE_SETTING_STATE({
              curr_setting_state: false,
              isPreview: true,
              targetId: vm.get_curr_TargetId,
              isHasData: true
            });
            vm.gETPROTOCOLDATA({
              protocolList: []
            });
            vm.gET_EQUIPMENT_DATA({
              EquipmentList: []
            });
            vm.clearAllDatas();
            vm.dELETE_LABEL({
              typeName: '',
              currenIndex: '',
              isDeleteClick: false,
              isResetOperateMemory: true
            });
            vm.btnReturn();
          } else if (vm.equiListData.isNotClick) {

            vm.uPDATE_SETTING_STATE({
              curr_setting_state: false,
              isPreview: true,
              targetId: vm.get_curr_TargetId,
              isHasData: true
            });
            vm.initToggleTabs(vm.tabText);
          }
          vm.freshData.isClickSave = !vm.freshData.isClickSave;
          vm.equiListData.isNotClick = false;
        }
      });
    },
    getStyleValue(data) {
      let vm = this,
        left, top, width, height = '',
        el = document.querySelector('#wrap_' + data.refs);
      left = el.style.left;
      top = el.style.top;
      width = getStyle(el)['width'];
      height = getStyle(el)['height'];
      data.editData.layOutStyle = { left, top, width, height }
    },
    handleDrag(ev) {
      let vm = this;
      var ev = ev || event;
      vm.c_type = vm.c_id.substr(5);
      let elem = ev.srcElement || ev.target;
      let drag_panel_content = document.querySelector('.droptarget');
      let dscrollTop = drag_panel_content.scrollTop;
      let dscrollLeft = drag_panel_content.scrollLeft;
      while (/*(elem.className) &&*/ (elem.className != "drag_panel_content droptarget")) {
        elem = elem.parentNode;
      }
      if (elem.className == "drag_panel_content droptarget") {
        let L = ev.clientX + dscrollLeft;
        let T = ev.clientY + dscrollTop;
        let paramsArr = [];
        let refs = '';
        let lineID = '';
        switch (vm.c_type) {
          case 'upLoadImg':
            vm.uPDATE_IMG_ID({
              isReset: false
            });
            let currImgID = vm.get_upLoad_img_ID;
            refs = `upLoadImg${currImgID}`;
            let params = {
              refs: refs,
              IsEquipment: vm.IsEquipment
            }
            let img = new DragImg(params);
            let imgDatas = img.imgDatas;
            vm.uPDATE_UPLOAD_IMG({
              isClear: false,
              imgDatas: imgDatas
            });
            vm.uPDATETEMPDATA({
              isClear: false,
              data: refs
            });
            paramsArr = ['upLoadImg', currImgID, L, T, refs];
            vm.fixPosition(...paramsArr);
            break;
          case 'label':
            vm.uPDATE_LABEL_ID({
              isReset: false
            });
            let currLabelID = vm.get_label_ID;
            refs = `label${currLabelID}`;
            let paLabel = {
              refs: refs,
              IsEquipment: vm.IsEquipment,
              equiTabData: vm.equiTabData,
              ProjectId: vm.ProjectId,
              defLabelStyle: vm.defLabelStyle
            }
            let label = new DragLabel(paLabel);
            let labelDatas = label.labelDatas;
            vm.uPDATE_LABEL({
              isClear: false,
              isFreshLabel: false,
              labelDatas: labelDatas
            });
            vm.uPDATETEMPDATA({
              isClear: false,
              data: refs
            });
            paramsArr = ['label', currLabelID, L, T, refs];
            vm.fixPosition(...paramsArr);
            break;
          case 'chart':
            vm.uPDATE_CHART_ID({
              isReset: false
            });
            vm.uPDATE_LINE_ID({
              isReset: false
            });
            let currChartID = vm.get_chart_ID;
            refs = `chart${currChartID}`;
            let containerID = `container${currChartID}`;
            lineID = containerID + vm.get_line_ID;
            let plChart = {
              refs: refs,
              IsEquipment: vm.IsEquipment,
              equiTabData: vm.equiTabData,
              ProjectId: vm.ProjectId,
              get_equipment_data: vm.get_equipment_data,
              containerID,
              lineID
            }
            let chart = new DragChart(plChart);
            let chartDatas = chart.chartDatas;
            vm.uPDATE_CHART({
              isClear: false,
              isFreshChart: false,
              chartDatas: chartDatas
            });
            vm.uPDATETEMPDATA({
              isClear: false,
              data: refs
            });
            paramsArr = ['chart', currChartID, L, T, refs];
            vm.fixPosition(...paramsArr);
            break;
          case 'datablock':
            vm.uPDATE_DATABLOCK_ID({
              isReset: false
            });
            vm.uPDATE_LINE_ID({
              isReset: false
            });
            let currDatablockID = vm.get_datablock_ID,
              refs = `datablock${currDatablockID}`;
            lineID = vm.get_line_ID;
            let plDataBlock = {
              refs,
              IsEquipment: vm.IsEquipment,
              equiTabData: vm.equiTabData,
              ProjectId: vm.ProjectId,
              get_equipment_data: vm.get_equipment_data,
              lineID
            }
            let dataBlock = new DragDatablock(plDataBlock);
            let datablockDatas = dataBlock.datablockDatas;
            vm.uPDATE_DATABLOCK({
              isClear: false,
              isFreshDatablock: false,
              datablockDatas: datablockDatas
            });
            vm.uPDATETEMPDATA({
              isClear: false,
              data: refs
            });
            paramsArr = ['datablock', currDatablockID, L, T, refs]
            vm.fixPosition(...paramsArr);
            break;
          case 'dashboard':
            vm.uPDATE_DASHBOARD_ID({
              isReset: false
            });
            let currDashboardID = vm.get_dashboard_ID;
            refs = `dashboard${currDashboardID}`;
            let plDashBoard = {
              refs,
              IsEquipment: vm.IsEquipment,
              equiTabData: vm.equiTabData,
              ProjectId: vm.ProjectId,
              get_equipment_data: vm.get_equipment_data,
              currDashboardID
            }
            let dashBoard = new DragDashboard(plDashBoard);
            let dashboardDatas = dashBoard.dashboardDatas;
            vm.uPDATE_DASHBOARD({
              isClear: false,
              isFreshDashboard: false,
              dashboardDatas: dashboardDatas
            });
            vm.uPDATETEMPDATA({
              isClear: false,
              data: refs
            });
            paramsArr = ['dashboard', currDashboardID, L, T, refs];
            vm.fixPosition(...paramsArr);
            break;
          case 'datastate':
            vm.uPDATE_DATASTATE_ID({
              isReset: false
            });
            let currDatastateID = vm.get_datastate_ID;
            refs = `datastate${currDatastateID}`;
            let plDatastate = {
              refs,
              IsEquipment: vm.IsEquipment,
              equiTabData: vm.equiTabData,
              ProjectId: vm.ProjectId,
              get_equipment_data: vm.get_equipment_data,
              currDatastateID
            }
            let dataState = new DragDatastate(plDatastate);
            let datastateDatas = dataState.datastateDatas;
            vm.uPDATE_DATASTATE({
              isClear: false,
              isFreshDatastate: false,
              datastateDatas: datastateDatas
            });
            vm.uPDATETEMPDATA({
              isClear: false,
              data: refs
            });
            paramsArr = ['datastate', currDatastateID, L, T, refs];
            vm.fixPosition(...paramsArr);
            break;
          default:
            console.log('控件不存在');
        }

      }
    },
    fixPosition(type, currTypeID, L, T, refs) {
      let vm = this;
      if (vm.get_currentViewTab_data == 'equiList') {
        vm.uPDATE_ISADDDRAG_STATE({ isAddDrag: true, type, currTypeID, L, T, refs });
        return;
      }
      vm.handlePositionData(type, currTypeID, L, T, refs);
    },
    handlePositionData(type, currTypeID, L, T, refs) {
      let vm = this;
      vm.$nextTick(() => {
        //处理当前拖拽出来控件的位置
        for (let i = 0; i < vm.$refs[`wraps_${type}`].length; i++) {
          if (vm.$refs[`wraps_${type}`][i].$el.id == `wrap_${type}${currTypeID}`) {
            vm.$refs[`wraps_${type}`][i].$el.style.left = L - vm.dragPosReduceLeft + 'px';
            vm.$refs[`wraps_${type}`][i].$el.style.top = T - vm.dragPosReduceTop + 'px';
          }
        }
        //以下函数将实现只显示当前拖拽出来的控件的边框
        showNowBorder(refs);
      });
    },
    dragListener() {
      let vm = this;
      document.addEventListener("drag", (ev) => {
        var ev = ev || event;
        ev.preventDefault();
        vm.c_id = ev.target.id
      });
      document.addEventListener("dragover", (ev) => {
        var ev = ev || event;
        ev.preventDefault();
      });
      document.addEventListener("drop", vm.handleDrag, false);
    },
    clearAllDatas() {
      let vm = this;
      eosCommon.storage.set('storageType', '');
      vm.uPDATE_UPLOAD_IMG({
        isClear: true,
        imgDatas: []
      });
      vm.uPDATE_LABEL({
        isClear: true,
        isFreshLabel: false,
        labelDatas: []
      });
      vm.uPDATE_CHART({
        isClear: true,
        isFreshChart: false,
        chartDatas: []
      });
      vm.uPDATE_DATABLOCK({
        isClear: true,
        isFreshDatablock: false,
        datablockDatas: []
      });
      vm.uPDATE_DASHBOARD({
        isClear: true,
        isFreshDashboard: false,
        dashboardDatas: []
      });
      vm.uPDATE_DATASTATE({
        isClear: true,
        isFreshDatastate: false,
        datastateDatas: []
      });
      vm.uPDATETEMPDATA({
        isClear: true,
        data: 'giveUp'
      });
    },
    /*@tabText 列表名称 equiObjist  equiList  ''
    * @isNotClick  是否点击
    * @isClickReback 是否
    * */
    toggleTabs(tabText, isNotClick, isClickReback) {
      let vm = this;
      vm.tabText = tabText;
      vm.equiListData.isNotClick = isNotClick;
      vm.isClickReback = isClickReback;
      // 'get_tempDrag_Datas', //临时拖拽的数据 需要查找从哪里定义的1.
      if (vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
        if (vm.isClickReback) {
          vm.gETPROTOCOLDATA({
            protocolList: []
          });
          vm.gET_EQUIPMENT_DATA({
            EquipmentList: []
          });
          vm.clearAllDatas();
          vm.dELETE_LABEL({
            typeName: '',
            currenIndex: '',
            isDeleteClick: false,
            isResetOperateMemory: true
          });
          vm.btnReturn();
        } else {
          vm.initToggleTabs(tabText);
        }
        return;
      }
      //get_curr_TargetId
      vm.$confirm('部分操作暂未保存, 是否保存所有操作后再关闭?', '提示', {
        confirmButtonText: '先保存',
        cancelButtonText: '直接关闭',
        type: 'warning',
        isCustomClose: true,
        closeOnClickModal: false
      }).then(() => {
        //确定操作         
        vm.saveAllDragDatas();
      }).catch(() => {
        vm.clearStorageTempDragData();
        vm.uPDATE_SETTING_STATE({
          curr_setting_state: false,
          isPreview: true,
          targetId: vm.get_curr_TargetId,
          isHasData: true
        });
        if (vm.isClickReback) {
          vm.gETPROTOCOLDATA({
            protocolList: []
          });
          vm.gET_EQUIPMENT_DATA({
            EquipmentList: []
          });
          vm.clearAllDatas();
          vm.dELETE_LABEL({
            typeName: '',
            currenIndex: '',
            isDeleteClick: false,
            isResetOperateMemory: true
          });
          vm.btnReturn();
        } else {
          vm.initToggleTabs(vm.tabText);
        }
      })
    },
    initToggleTabs(tabText) {
      let vm = this;
      vm.equiTabData = {};
      vm.equiListData.currentView = tabText;
      vm.uPDATE_CURRENTVIEWTAB(tabText);
      vm.clearAllDatas();
      vm.dELETE_LABEL({
        typeName: '',
        currenIndex: '',
        isDeleteClick: false,
        isResetOperateMemory: true
      });
      if (vm.get_currentViewTab_data == 'equiObjist') {
        vm.IsEquipment = false;
      } else {
        vm.IsEquipment = true;
        vm.tableLoad();
      }
    },
    getPageIndex(index) {
      this.isClickPage = true;
      this.PageIndex = index;
    },
    getEquiDetail() {
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "EquipmentId": this.equiListDataSend.EquipmentId,
          "Type": "1"
        }
      }
      let url = this.detailUrl
      GET(url, params).then(function(response) {
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.equiTabData = res.Data;
          vm.equiTabData.IsSelfProject = vm.equiListDataSend.IsSelfProject;
        }
      }).catch(function(error) {
        console.log(error.message)
      });
    },
    //节流
    delaySearch() {
      clearTimeout(this.search.timeId)
      let vm = this
      vm.search.timeId = setTimeout(function() {
        vm.search()
      }, 500)
    },
    //搜索按钮
    search() {
      this.tableLoad(this.PageSize, this.PageIndex = 1)
    },
    //加载表格数据
    tableLoad(PageSize = this.PageSize, PageIndex = this.PageIndex, CompanyId = this.CompanyId, ProjectId = this.ProjectId, OnlineStatus = this.OnlineStatus, AlarmStatus = this.AlarmStatus, RunStatus = this.RunStatus, Keywords = this.Keywords, EquipmentTypeId = this.EquipmentTypeId) {
      let vm = this
      vm.loading = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageIndex": PageIndex,
        "PageSize": PageSize,
        "IsDefaultEquipment": 1, // -- 是否只获取第一台设备的数据
        "Parameters": {
          "CompanyId": CompanyId, //--业主Id
          "ProjectId": ProjectId, //--项目Id
          "GatewayId": '', //-- 网关id, 可传空
          "Keywords": Keywords, //-- 搜索关键字, 可传空
          "EquipmentTypeId": EquipmentTypeId, //-- 设备类型
          "OnlineStatus": OnlineStatus, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
          "AlarmStatus": AlarmStatus, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
          "RunStatus": RunStatus, //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
          "Status": vm.Status
        }
      }
      let url = this.equipmentListUrl
      GET(url, params).then(function(response) {
        let res = response.data;
        if (FUNC.checkCode(res.State, res.Message)) {
          let dataArr = response.data.Data.Equipments
          let Total = response.data.Data.Total;
          if (Total == 0) {
            vm.Total = 0;
            vm.equiListData.Total = 0;
            vm.equiListData.PageIndex = 1;
            vm.equiListData.PageSize = vm.PageSize;
            dataArr = [];
          } else {
            vm.Total = Total;
            vm.equiListData.Total = Total;
            vm.equiListData.PageSize = vm.PageSize;
            vm.equiListData.PageIndex = PageIndex;
          }
          vm.projectOpts = res.Data.Projects
          vm.reload(dataArr);
          vm.loading = false
        }
      }).catch(function(error) {
        console.log(error.message)
      });
    },
    reload(dataArr) {
      let EquipmentId = this.propsData.EquipmentId;
      let vm = this;
      if (dataArr.length != 0) {
        for (let index in dataArr) {
          dataArr[index].isActive = false;
          let params = [
            dataArr[index].IsExperienceEquipment,
            dataArr[index].IsSelfProject
          ]
          dataArr[index].show = FUNC.operator.operateRoleFilter(...params)
          if (EquipmentId && (EquipmentId == dataArr[index].EquipmentId)) {
            dataArr[index].isActive = true
            vm.EquipmentId = dataArr[index].EquipmentId
            FUNC.storage.set('IsSelfProject', dataArr[index].IsSelfProject);
            vm.equiListDataSend = dataArr[index]
          }
        }
        if (!EquipmentId) {
          dataArr[0].isActive = true
          vm.EquipmentId = dataArr[0].EquipmentId
          FUNC.storage.set('IsSelfProject', dataArr[0].IsSelfProject);
        }
        eosCommon.storage.set('ProjectId', '');
        vm.propsData.EquipmentId = '';
      }
      vm.equiListData.tableData = dataArr
      vm.equiListData.curEquipmentId = EquipmentId
      vm.equiListData.isNotClick = false;
    },
    getEuipmentDatas: function() {
      let vm = this;
      let param = {
        "AccessToken": vm.AccessToken,
        "PageIndex": 1,
        "PageSize": 100,
        "IsDefaultEquipment": 0, // -- 是否只获取第一台设备的数据
        "Parameters": {
          "CompanyId": '', //--业主Id
          "ProjectId": vm.propsData.ProjectId, //--项目Id(必填)
          "GatewayId": '', //-- 网关id, 可传空
          "Keywords": "", //-- 搜索关键字, 可传空
          "OnlineStatus": -1, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
          "AlarmStatus": -1, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
          "RunStatus": -1, //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
          "Status": '0'
        }
      }
      let url = eosCommon.ENTERPRISE_API + "api/equipment/QueryCommonEquipmentList";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          let data = [];
          vm.gET_EQUIPMENT_DATA({
            EquipmentList: data
          });
        }
      })
    },
    getHasIssueAction() {
      //查询当前项目是否有下发权限
      let vm = this;
      let param = {
        "AccessToken": vm.AccessToken,
        "ProjectId": vm.ProjectId
      };
      let url = eosCommon.ENTERPRISE_API + 'api/project/HasIssueAction';
      eosCommon.eosAjax(url, "get", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.cANCTRL(result.Data);
        }
      })
    },
    intoList(listName) {
      this.equiListData.currentView = listName;
      this.toggleTabs(listName, false);
    },
    initData() { //初始化数据
      let vm = this;
      let isEx = vm.propsData.IsExperienceProject;
      let isSelf = vm.propsData.IsSelfProject;

      vm.isShowDebugBtnByRole_PJ = FUNC.operator.operateRoleFilter(isEx, isSelf);//通用函数里角色过滤 是否显示按钮
      vm.uPDATE_EXPOSELF({ //设置是否有权限
        expOself: vm.isShowDebugBtnByRole_PJ
      });

      vm.ProjectId = vm.propsData.ProjectId;
      vm.equiListData.ProjectId = vm.propsData.ProjectId
      vm.equiListData.ProjectName = vm.propsData.ProjectName
      vm.equiListData.IsExperienceProject = vm.propsData.IsExperienceProject;
      vm.equiListData.IsSelfProject = vm.propsData.IsSelfProject;
      vm.getHasIssueAction();
      let ProjectId = eosCommon.storage.get('ProjectId');
      if (ProjectId) { //当项目id存在的时候，将记住从编辑设备或添加设备返回时上次的那一页
        vm.PageIndex = Number(eosCommon.storage.get('PageIndex'));
        vm.isClickPage = false;
      } else {
        eosCommon.storage.set('scrollTop', 0)
      }
      if (ProjectId || vm.propsData.EquipmentId) {
        //当项目id或设备id存在的时，直接进入设备列表
        vm.intoList('equiList');
      } else {
        //否则默认进入场景列表，但是如果没有场景列表没有数据也将进入设备列表
        //场景列表有无数据将在场景数据列表中判断
        if (vm.get_currentViewTab_data != 'equiList') {
          vm.intoList('equiObjist');
        } else {
          vm.intoList('equiList');
        }
      }
    }
  },
  created() {
    let vm = this;
    let ProjectId = eosCommon.storage.get('ProjectId');
    let EquipmentId = eosCommon.storage.get('EquipmentId');
    if (!ProjectId) {
      eosCommon.storage.set('EquipmentId', '');
      //vm.propsData.EquipmentId='';
    } else {
      if (EquipmentId) {
        vm.propsData.EquipmentId = EquipmentId;
      }
    }
    vm.uPDATE_CTRDATA({
      dialogVisible: false,
      EquipmentId: '',
      valContent: '',
      Status: [],
      DisplayName: '',
      finiedDialogVisi: false
    });
  },
  mounted() {
    let vm = this;
    vm.initData();
    setTimeout(() => {
      vm.dragListener();
  }, 100);
  },
  destroyed() {
    let vm = this;
    vm.uPDATE_CURRENTVIEWTAB('');
    vm.clearAllDatas();
    eosCommon.storage.set('ProjectId', '');
    document.removeEventListener("drop", vm.handleDrag, false);
  }
}

</script>

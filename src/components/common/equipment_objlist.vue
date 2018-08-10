<style scoped="scoped" src="assets/css/dragStyle/equipment_objlist.less" lang="less">
</style>
<style scoped lang='less'>
.logoWrap {
  overflow: hidden;
  text-align: center;
}
.operateMask {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  cursor: default;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
  background-color: rgba(0, 0, 0, .5);
  transition: opacity .3s;
  line-height: 100px;
}

.operateMask:hover {
  opacity: 1;
}

.operateMask:hover {
  display: inline-block;
}

.operateMask span {
  display: none;
  cursor: pointer;
  text-align: center;
  color: #fff;
  opacity: 0;
  font-size: 20px;
}
</style>
<template>
  <div class="objs">
    <ul class="lists" style="margin-bottom: 0;">
      <li class="clearfix bdb" v-for='(item,index) in AssemblageList' :class='{active:currentIndex==index}' @click='getObjId(item.AssemblageId,item.IsSelfProject,index,true)'>
        <div class="left_pic pull-left">
          <img class="img-responsive" :alt="item.Name" v-lazy="customLazy(item.ResourceUrl,defaultEqui_img)" />
        </div>
        <div class="right_info pull-left">
          <div class="EquipmentAlias">
            <span :title="item.Name" class="tab-title-top">{{item.Name}}</span>
          </div>
        </div>
        <div class="equipmentOperates" v-if="isShowDebugBtnByRole_PJ">
          <a @click='addOrEditObj(item)' title="编辑场景" style="margin-right: 5px;" class="m-rigth font-size-text commonIcoColor" :class="{'text-pencil':(iconType=='text-pencil'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-pencil',index)" @mouseleave="addOremoveActiveClass('')"><i class="fa fa-pencil"></i></a>
          <a @click='confirmDeleteObj(item.AssemblageId)' title="删除场景" class="m-rigth font-size-text commonIcoColor" :class="{'text-trash-o':(iconType=='text-trash-o'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-trash-o',index)" @mouseleave="addOremoveActiveClass('')"><i class="fa fa-trash-o"></i></a>
        </div>
      </li>
      <div style="height: 60px;width: 100%;">
      </div>
    </ul>
    <div class="operates">
      <div v-if="equipLen && isShowDebugBtnByRole_PJ" class="operatesBtns form-inline clearfix">
        <span class="pull-left btn_wrap" style="margin-top: 26px;">
                <button style="padding-top: 2px; padding-bottom: 2px; " @click="addOrEditObj()" id="btnInsert" type="button" class="btn btn-default" >
                    <i style="margin-left: 0;" class="fa fa-plus m-r-5"></i>添加场景
                </button>
             </span>
      </div>
    </div>
    <el-dialog :title="operateObjData.operationType" :visible.sync="dialogFormVisible">
      <el-form label-width="150px" class="demo-ruleForm" :rules="rules">
        <el-form-item label="场景名称：" prop="require">
          <el-input v-model="operateObjData.objName" :maxlength="25" style='width: 300px'></el-input>
        </el-form-item>
        <el-form-item label="场景设备集：" prop="require">
          <span v-show='UnbindEquipmentOpts.length==0' style="cursor: default;color: #8A97AA">无可选设备</span>
          <el-checkbox-group v-model="operateObjData.checkedOpts" v-show='UnbindEquipmentOpts.length!=0'>
            <el-checkbox v-for="item in UnbindEquipmentOpts" :label="item.EquipmentAlias" :key="item.TerminalEquipmentId">{{item.EquipmentAlias}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="场景封面：">
          <div class="logoWrap fl mr15">
            <el-upload style='height:100px' :data='uploadData' class="avatar-uploader tal" :action="uploadUrl" :show-file-list="false" :on-success="setCoverPhoto" :before-upload="beforeImgUpload">
              <img v-if="operateObjData.CoverPhoto.FileUrl" :src="operateObjData.CoverPhoto.FileUrl" class="avatar">
              <span v-if="operateObjData.CoverPhoto.FileUrl" class="operateMask">
                    <i class="fa fa-file-image-o mr5" title='更改'></i>
                    <i class="fa fa-trash-o mr5" title='删除' @click.stop='delCoverPhoto'></i>
                    <i class="fa fa-eye" title='查看大图' @click.stop='showBigPic(operateObjData.CoverPhoto.FileUrl)'></i>
                  </span>
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <span class='curd'> </span>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm()" :disabled='isCreating'>确 定</el-button>
      </div>
    </el-dialog>
    <!-- 大图对话框 -->
    <el-dialog :visible.sync="isShowBigPic" class='bigPic'>
      <img :src="bigPicUrl" alt="" class='vh50' />
    </el-dialog>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
let FUNC = Common.Func;
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const PUT = AXIOS.put
const URL = Common.Const.url
import commonFn from 'assets/js/common/commonFunc'
import {
  mapGetters,
  mapMutations
} from 'vuex'
import {
  debounce,
  getWinSize
} from 'assets/js/common/util';
import {
  StyleShowcommon
} from 'src/assets/js/common/commonData';
export default {
  data() {
    return {
      isCreating: false,
      UnbindEquipmentOpts: [],
      dialogFormVisible: false,
      AccessToken: eosCommon.storage.get("AccessToken"),
      operateObjData: {
        objName: '',
        operationType: '添加自定义场景',
        CoverPhoto: {
          FileUrl: '',
          ResourceId: ''
        },
        checkedOpts: []
      },
      AssemblageId: '',
      ProjectId: '',
      difference: 0,
      currentIndex: 0,
      iconType: '',
      AssemblageList: [],
      //获取场景详情
      currActiveIndex: 0,
      AssemblageDetail: null,
      //刷新数据
      AssemblageDynamicData: [],
      timer: null,
      TargetId: '',
      listB: false,
      isShowDebugBtnByRole_PJ: null,
      equipLen: 0,
      promptOptions: null,
      defaultEqui_img: 'static/css/img/commonEquipList_default.png',
      uploadUrl: URL.UPLOADRESOURCE, //上传资源url
      bigPicUrl: '',
      isShowBigPic: false,
      rules: {
        require: [
          { required: true, message: '', trigger: 'null' },
        ]
      },
    }
  },
  props: ['propsData', 'dataSend', 'fresh'],
  watch: {
    "propsData": {
      handler(val, oldval) {
        this.ProjectId = this.propsData.ProjectId;
        let isEx = this.propsData.IsExperienceProject
        let isSelf = this.propsData.IsSelfProject;
        this.isShowDebugBtnByRole_PJ = FUNC.operator.operateRoleFilter(isEx, isSelf);
        if (this.ProjectId) {
          if (this.propsData.isNotClick) {
            return;
          }
          this.QueryAssemblageList();
        }
      },
      deep: true //场景内部的属性监听，也叫深度监听
    },
    dataSend(val, oldval) {},
    "fresh.isClickSave" (val, oldval) {
      let vm = this;
      vm.QueryAssemblageDetail();
    },
    "fresh.hasMakeFreshTime" (val, oldval) {
      let vm = this;
      this.QueryAssemblageDetail(true);
    },
    "propsData.Keyword" (val, oldval) {
      let vm = this;
      return debounce(function() {
        vm.QueryAssemblageList();
      }, 1000, vm)();
    },
    "propsData.isNotClick" (val, oldval) {},
    get_curr_setting(val) {
      if (!val) {
        this.refreshData()
      } else {
        clearInterval(eosCommon.timer);
      }
    }
  },
  components: {},
  computed: {
    ...mapGetters([
      'get_curr_setting',
      'get_upLoad_img_data',
      'get_label_data',
      'get_upLoad_img_ID',
      'get_label_ID',
      'get_chart_ID',
      'get_datablock_ID',
      'get_dashboard_ID',
      'get_datastate_ID',

      'get_chart_data',
      'get_dashboard_data',
      'get_datablock_data',
      'get_datastate_data',
      ///////
      'get_tempDrag_Datas',
      'get_curr_isPreview',
      'get_curr_TargetId',
      'get_freshTime_Data',
      'get_dragDataState',
      'get_isDeleteClick_state',
      'get_equipment_data',
      'get_STORE_protocol',
      'get_STORE_idlist',
    ]),
    //上传资源时的附加参数
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ResourceType": "0",
        "Title": "上传附件",
        "Description": "上传附件"
      }
    },
  },
  mounted() {
    let vm = this;
    vm.getEuipmentDatas();
    vm.TargetId = '';
    vm.uPDATE_SETTING_STATE({
      curr_setting_state: false,
      isPreview: true,
      targetId: vm.TargetId,
      isHasData: false
    });
    if (vm.propsData.ProjectId) {
      vm.ProjectId = vm.propsData.ProjectId;
      let isEx = vm.propsData.IsExperienceProject
      let isSelf = vm.propsData.IsSelfProject;
      vm.isShowDebugBtnByRole_PJ = FUNC.operator.operateRoleFilter(isEx, isSelf);
      vm.QueryAssemblageList();
    }
  },
  destroyed() {
    clearInterval(eosCommon.timer);
  },
  methods: {
    ...mapMutations({
      uPDATE_SETTING_STATE: 'UPDATE_SETTING_STATE',
      uPDATETEMPDATA: 'UPDATETEMPDATA',
      uPDATE_UPLOAD_IMG: 'UPDATE_UPLOAD_IMG',
      uPDATE_LABEL: 'UPDATE_LABEL',
      uPDATE_IMG_ID: 'UPDATE_IMG_ID',
      uPDATE_LABEL_ID: 'UPDATE_LABEL_ID',
      uPDATE_CHART_ID: 'UPDATE_CHART_ID',
      uPDATE_LINE_ID: 'UPDATE_LINE_ID',
      uPDATE_DATABLOCK_ID: 'UPDATE_DATABLOCK_ID',
      uPDATE_DATASTATE_ID: 'UPDATE_DATASTATE_ID',
      uPDATE_CHART: 'UPDATE_CHART',
      uPDATE_DATABLOCK: 'UPDATE_DATABLOCK',
      uPDATE_FRESHTIME_DATA: 'UPDATE_FRESHTIME_DATA',
      uPDATE_DRAGDATA_STATE: 'UPDATE_DRAGDATA_STATE',
      uPDATE_CHARTCURRENTDATA: 'UPDATE_CHARTCURRENTDATA',
      uPDATE_DATABLOCKCURRENTDATA: 'UPDATE_DATABLOCKCURRENTDATA',
      dELETE_LABEL: 'DELETE_CURR_PANEL',
      uPDATE_DASHBOARD_ID: 'UPDATE_DASHBOARD_ID',
      uPDATE_DASHBOARD: 'UPDATE_DASHBOARD',
      uPDATE_DATASTATE: 'UPDATE_DATASTATE',
      gET_EQUIPMENT_DATA: 'GET_EQUIPMENT_DATA',
      uPDATE_EQLIST: 'UPDATE_EQLIST'
    }),
    /*handleCheckedOptsChange(value) {
      let vm = this
      console.log(vm.operateObjData.checkedOpts)
      // console.log(value)
    },*/
    //
    setCoverPhoto(res, file) {
      console.log(res)
      this.operateObjData.CoverPhoto.FileId = res.Data[0].ResourceId
      this.operateObjData.CoverPhoto.FileUrl = file.url;
    },
    delCoverPhoto() {
      this.operateObjData.CoverPhoto.FileId = ''
      this.operateObjData.CoverPhoto.FileUrl = ''
    },
    showBigPic(url) {
      this.isShowBigPic = true
      this.bigPicUrl = url
    },
    beforeImgUpload(file) {
      const isIMG = (file.type === 'image/jpeg' || file.type === 'image/png');
      // console.log(isIMG)
      const isLt3M = file.size / 1024 / 1024 < 3;
      if (!isIMG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
        return false
      }
      if (!isLt3M) {
        this.$message.error('图片大小不能超过 3MB!');
        return false
      }
      // return isIMG && isLt3M;
    },
    setUnbindEquipmentOpts() {
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        ProjectId: vm.ProjectId, //项目ID
      }
      GET(URL.GETASSEMBLAGEUNBINDEQUIPMENT, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.UnbindEquipmentOpts = data
            // console.log(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    getEuipmentDatas: function() {
      var vm = this;
      var param = {
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
      var url = eosCommon.ENTERPRISE_API + "api/equipment/QueryCommonEquipmentList";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          let data = [];
          if (result.Data instanceof Array) {
            vm.equipLen = false;
          } else {
            vm.equipLen = true
            data = result.Data.Equipments
          }
          vm.gET_EQUIPMENT_DATA({
            isEquip: true,
            EquipmentList: data
          });
        }
      })
    },
    QueryAssemblageList() {
      let vm = this;
      vm.uPDATE_DRAGDATA_STATE({
        isObjListLoading: true,
        isDragDetalLoading: false
      });
      vm.listB = false;
      let param = {
        "AccessToken": vm.AccessToken,
        "ProjectId": vm.ProjectId, //this.ProjectId '4a5d6635-6ecd-4d6f-8654-50256b985597'
        "Keyword": vm.propsData.Keyword
      };
      let url = eosCommon.ENTERPRISE_API + "api/Assemblage/QueryAssemblageList";
      eosCommon.eosAjax(url, "get", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.AssemblageList = result.Data;
          if (vm.AssemblageList.length == 0) {
            //该项目暂无场景列表
            vm.uPDATE_DRAGDATA_STATE({
              isObjListLoading: false,
              isDragDetalLoading: false
            });
            vm.uPDATE_UPLOAD_IMG({
              isClear: true,
              imgDatas: []
            });
            vm.uPDATE_LABEL({
              isClear: true,
              isFreshLabel: false,
              labelDatas: []
            });
            vm.uPDATE_SETTING_STATE({
              curr_setting_state: false,
              isPreview: false,
              targetId: '',
              isHasData: false
            });
            vm.listB = true;
            if (!vm.propsData.isNotClick) {
              vm.$emit('hasNoTargetIdList', vm.listB);
            }
            return false;
          }
          vm.uPDATE_DRAGDATA_STATE({
            isObjListLoading: false,
            isDragDetalLoading: true
          });
          vm.listB = false;
          vm.getObjId(vm.AssemblageList[0].AssemblageId, vm.AssemblageList[0].IsSelfProject, 0, false);
        }
      });
    },
    getObjId(id, IsSelfProject, index, isClick) {
      let vm = this;
      eosCommon.storage.set('IsSelfProject', IsSelfProject);
      //vm.$emit('')
      if (isClick) {
        if (vm.TargetId == id) {
          return false;
        }
      }
      if (vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state)) {
        vm.TargetId = id;
        vm.currentIndex = index;
        eosCommon.storage.set('storageType', '');
        eosCommon.eosOperators(eosCommon.eosOperDataHandle());
        vm.QueryAssemblageDetail();
        vm.uPDATE_SETTING_STATE({
          curr_setting_state: false,
          isPreview: true,
          targetId: vm.get_curr_TargetId,
          isHasData: true
        });
        return;
      }
      //get_curr_TargetId
      vm.$confirm('部分操作暂未保存, 是否保存所有操作后再关闭?', '提示', {
        confirmButtonText: '先保存',
        cancelButtonText: '直接关闭!',
        type: 'warning',
        isCustomClose: true
      }).then(() => {
        //确定操作
        vm.$emit('comfirClose', '确认关闭');
        vm.TargetId = id;
        vm.currentIndex = index;
        eosCommon.storage.set('storageType', '');
        vm.QueryAssemblageDetail();
        vm.uPDATE_SETTING_STATE({
          curr_setting_state: false,
          isPreview: true,
          targetId: vm.get_curr_TargetId,
          isHasData: true
        });
        vm.dELETE_LABEL({
          typeName: '',
          currenIndex: '',
          isDeleteClick: false,
          isResetOperateMemory: true
        });
      }).catch(() => {
        if (vm.TargetId == id) {
          return false;
        }
        vm.TargetId = id;
        vm.currentIndex = index;
        eosCommon.storage.set('storageType', '');
        vm.QueryAssemblageDetail();
        vm.uPDATETEMPDATA({
          isClear: true,
          data: 'giveUp'
        });
        vm.uPDATE_SETTING_STATE({
          curr_setting_state: false,
          isPreview: true,
          targetId: vm.get_curr_TargetId,
          isHasData: true
        });
        vm.dELETE_LABEL({
          typeName: '',
          currenIndex: '',
          isDeleteClick: false,
          isResetOperateMemory: true
        });
      })
    },
    clearAllDrag() {
      let vm = this;
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
    },
    GetAssemblageRelatedEquipment(){
      let vm = this;
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "AssemblageId": vm.TargetId
      }
      GET(URL.GETASSEMBLAGERELATEDEQUIPMENT, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            eosCommon.storage.set('relatedEquipment', JSON.stringify(data));
            // console.log(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    QueryAssemblageDetail(hasMakeFreshTime) {
      let vm = this;
      vm.clearAllDrag();
      vm.GetAssemblageRelatedEquipment()
      if (!hasMakeFreshTime) {
        vm.uPDATE_DRAGDATA_STATE({
          isObjListLoading: false,
          isDragDetalLoading: true
        });
      }
      let param = {
        "AccessToken": vm.AccessToken,
        "TargetId": vm.TargetId
      };
      let url = eosCommon.ENTERPRISE_API + "api/Assemblage/QueryAssemblageDetail";
      eosCommon.eosAjax(url, "get", param, "json", async function(result) {

        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.uPDATE_DRAGDATA_STATE({
            isObjListLoading: false,
            isDragDetalLoading: false
          });
          vm.AssemblageDetail = result.Data;
          vm.uPDATE_FRESHTIME_DATA({
            Rate: result.Data.Rate,
            Time: vm.get_freshTime_Data.Time
          });
          let DefaultValues = vm.AssemblageDetail.DefaultValues;
          let imgDatasArr = [];
          let labelDatasArr = [];
          let chartDatasArr = [];
          let datablockDatasArr = [];
          let dashboardDatasArr = [];
          let datastateDatasArr = [];
          if (DefaultValues.Image.length == 0 &&
            DefaultValues.Text.length == 0 &&
            DefaultValues.Graph.length == 0 &&
            DefaultValues.TextGroups.length == 0 &&
            DefaultValues.Dashboard.length == 0 &&
            DefaultValues.StateGraphs.length == 0
          ) {
            //未配置数据get_curr_TargetId
            vm.uPDATE_SETTING_STATE({
              curr_setting_state: false,
              isPreview: false,
              targetId: vm.TargetId,
              isHasData: true
            });
            vm.uPDATE_UPLOAD_IMG({
              isClear: true,
              imgDatas: imgDatasArr
            });
            vm.uPDATE_LABEL({
              isClear: true,
              isFreshLabel: false,
              labelDatas: labelDatasArr
            });
            vm.uPDATE_CHART({
              isClear: true,
              isFreshChart: false,
              chartDatas: chartDatasArr
            });
            vm.uPDATE_DATABLOCK({
              isClear: true,
              isFreshDatablock: false,
              datablockDatas: datablockDatasArr
            });
            vm.uPDATE_DASHBOARD({
              isClear: true,
              isFreshDashboard: false,
              dashboardDatas: dashboardDatasArr
            });
            vm.uPDATE_DATASTATE({
              isClear: true,
              isFreshDatastate: false,
              datastateDatas: datastateDatasArr
            });
          } else {
            //展示数据
            vm.uPDATE_SETTING_STATE({
              curr_setting_state: false,
              isPreview: true,
              targetId: vm.TargetId,
              isHasData: true
            });
            let imgLen = DefaultValues.Image.length;
            let labelLen = DefaultValues.Text.length;
            let chartLen = DefaultValues.Graph.length;
            let datablockLen = DefaultValues.TextGroups.length;
            let dashboardLen = DefaultValues.Dashboard.length;
            let datastateLen = DefaultValues.StateGraphs.length;
            if (imgLen > 0) { //图片有数据
              let Image = DefaultValues.Image;
              for (let iVal of Image) {
                let currImgID = vm.get_upLoad_img_ID;
                let newLayOutStyle = iVal.Layout;
                imgDatasArr.push({
                  typeName: `upLoadImg`,
                  openScenePic: false,
                  openEquiPic: false,
                  //typeId: currImgID,
                  refs: iVal.Id,
                  IsEquipment: false,
                  title: '底图',
                  previewData: {},
                  editData: {
                    imgUrl: iVal.Value,
                    ResoureId: iVal.ResoureId,
                    layOutStyle: JSON.parse(newLayOutStyle)
                  }
                })
              }
            }
            if (labelLen > 0) { //文本数据
              let Text = DefaultValues.Text;
              for (let tVal of Text) {
                let labelLength = vm.get_label_data.length;
                let selectDataType = tVal.Type == '1' ? 'fixedTxt' : 'dataStream';
                let labelContent = '';
                if (selectDataType == 'fixedTxt') {
                  labelContent = tVal.DefaultValue;
                } else {
                  labelContent = tVal.Value + tVal.PostPositionValue;
                }
                let Address = tVal.Address;
                let TerminalEquipmentId = tVal.TerminalEquipmentId;
                let newLayOutStyle = tVal.Layout;
                labelDatasArr.push({
                  typeName: `label`,
                  ProjectId: vm.ProjectId,
                  protocolList: [],
                  refs: tVal.Id,
                  labelLength: labelLength,
                  title: '文本',
                  previewData: {},
                  editData: {
                    layOutStyle: JSON.parse(newLayOutStyle),
                    selectDataType: selectDataType,
                    PrePositionValue: tVal.PrePositionValue,
                    noDataVal: tVal.DefaultValue,
                    val: tVal.Value,
                    IsMain: tVal.IsMain,
                    AliasName: tVal.AliasName,
                    labelContent: labelContent,
                    PostPositionValue: tVal.PostPositionValue,
                    Style: new StyleShowcommon(tVal.Style),
                    PostPositionStyle: new StyleShowcommon(tVal.PostPositionStyle),
                    PrePositionStyle: new StyleShowcommon(tVal.PrePositionStyle),
                    fixedTxt: {},
                    dataStream: {
                      RegisterAddress: Address,
                      EquipmentId: TerminalEquipmentId
                    }
                  }
                })
              }
            }
            if (chartLen > 0) { //曲线有数据
              let Graph = DefaultValues.Graph;
              for (let cVal of Graph) {
                let chartLength = vm.get_chart_data.length;
                let newLayOutStyle = cVal.Layout;
                let BackgroundColor = cVal.BackgroundColor;
                let XCutLineColor = cVal.XCutLineColor;
                let IsShowXCutLine = cVal.IsShowXCutLine;
                let YCutLineColor = cVal.YCutLineColor;
                let IsShowYCutLine = cVal.IsShowYCutLine;
                let IsShowLeftY = cVal.IsShowLeftY;
                let IsShowRightY = cVal.IsShowRightY;
                let LeftYColor = cVal.LeftYColor;
                let RightYColor = cVal.RightYColor;
                let Content = cVal.Content;
                let refs = cVal.GraphId; //chart
                let Interval = cVal.Interval;
                let currUUid = refs.slice(5);
                let singleChartData = [];
                for (let n of Object.keys(Content)) {
                  let yAxis = 1;
                  let opposite = true;
                  let yVisible = false;
                  if (Content[n].IsRightY) {
                    yAxis = 1;
                    opposite = true;
                    yVisible = IsShowRightY;
                  } else {
                    yAxis = 0;
                    opposite = false;
                    yVisible = IsShowLeftY;
                  }
                  singleChartData.push({
                    get_equipment_data: vm.get_equipment_data,
                    get_protocol_data: [],
                    protocolList: [],
                    lineId: Content[n].LineId,
                    dataStream: {
                      RegisterAddress: Content[n].Address,
                      EquipmentId: Content[n].TerminalEquipmentId
                    },
                    color: '',
                    chartDataSetting: {
                      //axis:0//用于哪个轴0：左Y轴  1：右Y轴
                    },
                    chartAxisSetting: {
                      info: '设置' + 0
                    },
                    yAxis: {
                      title: {
                        text: ''
                      },
                      //y轴分割线
                      gridLineColor: YCutLineColor,
                      gridLineDashStyle: 'longdash',
                      gridLineWidth: IsShowYCutLine,
                      lineWidth: 1, //y轴粗细
                      lineColor: LeftYColor,
                      opposite: opposite,
                      showEmpty: false,
                      visible: yVisible,
                      tickPixelInterval: 50,
                      //tickAmount: 5,
                      min: 0,
                      startOnTick: false
                    },
                    yData: {
                      id: Content[n].LineId,
                      name: Content[n].Name,
                      yAxis: yAxis,
                      color: Content[n].Color,
                      data: Content[n].data
                    }
                  })
                }
                chartDatasArr.push({
                  typeName: `chart`,
                  Interval: Interval,
                  ProjectId: vm.ProjectId,
                  IsEquipment: false,
                  eqInfo: [],
                  refs: refs,
                  chartLength: chartLength,
                  title: '曲线',
                  previewData: {

                  },
                  editData: {
                    layOutStyle: JSON.parse(newLayOutStyle)
                  },
                  containerID: `container${currUUid}`,
                  chartName: '',
                  backgroundColor: BackgroundColor,
                  xAxis: {
                    type: 'datetime',
                    tickPixelInterval: 50,
                    //x轴分割线
                    gridLineWidth: IsShowXCutLine,
                    gridZIndex: 4,
                    gridLineColor: XCutLineColor,
                    gridLineDashStyle: 'longdash',
                    lineColor: '#8492a6',
                  },
                  yAxis: {
                    lineWidth: 1,
                    gridLineColor: YCutLineColor, //y轴分割线
                    lineColor: LeftYColor, //右y轴颜色
                    gridLineWidth: IsShowYCutLine,
                    visible: IsShowLeftY
                  },
                  rightYAxis: {
                    lineWidth: 1, //y轴粗细,
                    lineColor: RightYColor,
                    visible: IsShowRightY
                  },
                  singleChartDataLists: singleChartData
                })
              }
            }
            if (dashboardLen > 0) { //表盘数据
              let Dashboard = DefaultValues.Dashboard;
              for (let dVal of Dashboard) {
                let dashboardLength = vm.get_dashboard_data.length;
                let currDashboardID = vm.get_dashboard_ID;
                let mainInfo = dVal;
                let newLayOutStyle = JSON.parse(mainInfo.Layout);
                let refs = mainInfo.DashboardId;
                let IsMain = mainInfo.IsMain
                let AliasName = mainInfo.AliasName
                let currUUid = refs.slice(9);
                let Config = mainInfo.Config;
                let colorSettingInfo = [];
                for (let val of Config) {
                  colorSettingInfo.push({
                    startNum: val.FloorValue,
                    endNum: val.UpperValue,
                    regionColor: val.Color
                  });
                }
                dashboardDatasArr.push({
                  typeName: `dashboard`,
                  IsEquipment: false,
                  eqInfo: [],
                  protocolList: [],
                  containerID: `container${currUUid}`,
                  ProjectId: vm.ProjectId,
                  DisplayName: mainInfo.Theme,
                  Unit: mainInfo.Unit,
                  value: mainInfo.Value,
                  IsMain,
                  AliasName,
                  refs: refs,
                  dashboardLength: dashboardLength,
                  dataStream: {
                    RegisterAddress: mainInfo.Address,
                    EquipmentId: mainInfo.TerminalEquipmentId
                  },
                  previewData: {
                    dashboardContent: ''
                  },
                  editData: {
                    layOutStyle: newLayOutStyle
                  },
                  colorSettingInfo: colorSettingInfo
                })
              }
            }
            if (datablockLen > 0) { //数据块数据
              let TextGroups = DefaultValues.TextGroups;
              for (let bVal of TextGroups) {
                let datablockLength = vm.get_datablock_data.length;
                let Content = bVal.Content;
                let singleDatablockLists = [];
                for (let val of Content) {
                  vm.uPDATE_EQLIST({
                    updateType: 0,
                    EquipmentId: val.TerminalEquipmentId
                  });
                  singleDatablockLists.push({
                    //title:'气温数据图',
                    get_equipment_data: vm.get_equipment_data,
                    get_protocol_data: [],
                    protocolList: [],
                    lineID: val.TextItemId,
                    IsMain: val.IsMain,
                    AliasName: val.AliasName,
                    dataStream: {
                      RegisterAddress: val.Address,
                      EquipmentId: val.TerminalEquipmentId
                    },
                    dataName: val.PrePositionValue,
                    dataValue: val.Value,
                    Unit: val.PostPositionValue,
                    valContent: val.Value + val.PostPositionValue,
                    PrePositionStyle: new StyleShowcommon(val.PrePositionStyle),
                    PostPositionStyle: new StyleShowcommon(val.PostPositionStyle),
                  });
                }

                datablockDatasArr.push({
                  typeName: `datablock`,
                  IsEquipment: false,
                  eqInfo: [],
                  ProjectId: vm.ProjectId,
                  refs: bVal.TextGroupId,
                  datablockLength: datablockLength,
                  title: bVal.Theme,
                  previewData: {
                    datablockContent: ''
                  },
                  editData: {
                    layOutStyle: JSON.parse(bVal.Layout),
                    title: bVal.Theme,
                    datablockBg: bVal.BackgroundColor,
                    datablockTitleBg: bVal.ThemeColor,
                    Style: new StyleShowcommon(bVal.Style),
                  },
                  singleDatablockLists: singleDatablockLists
                })
              }
            }
            if (datastateLen > 0) {
              let StateGraphs = DefaultValues.StateGraphs;
              for (let sVal of StateGraphs) {
                let datastateLength = vm.get_datastate_data.length;
                let currDatastateID = vm.get_datastate_ID;
                vm.uPDATE_EQLIST({
                  updateType: 0,
                  EquipmentId: sVal.TerminalEquipmentId
                });
                datastateDatasArr.push({
                  typeName: `datastate`,
                  IsEquipment: false,
                  eqInfo: [],
                  protocolList: [],
                  ProjectId: vm.ProjectId,
                  typeId: currDatastateID,
                  refs: sVal.StateGraphId,
                  datastateLength: datastateLength,
                  stateValue: sVal.Value,
                  OriginValue: sVal.OriginValue,
                  dataStream: {
                    RegisterAddress: sVal.Address,
                    EquipmentId: sVal.TerminalEquipmentId
                  },
                  editData: {
                    layOutStyle: JSON.parse(sVal.Layout)
                  }
                })
              }
            }
            await vm.getProtocols();
            //更新数据
            if (hasMakeFreshTime) {
              return
            }
            vm.uPDATE_UPLOAD_IMG({
              isClear: true,
              imgDatas: imgDatasArr
            });
            vm.uPDATE_LABEL({
              isClear: true,
              isFreshLabel: false,
              labelDatas: labelDatasArr
            });
            vm.uPDATE_CHART({
              isClear: true,
              isFreshChart: false,
              chartDatas: chartDatasArr
            });
            vm.uPDATE_DATABLOCK({
              isClear: true,
              isFreshDatablock: false,
              datablockDatas: datablockDatasArr
            });
            vm.uPDATE_DASHBOARD({
              isClear: true,
              isFreshDashboard: false,
              dashboardDatas: dashboardDatasArr
            });
            vm.uPDATE_DATASTATE({
              isClear: true,
              isFreshDatastate: false,
              datastateDatas: datastateDatasArr
            });
            //刷新数据
            //vm.QueryAssemblageDynamicData();
            vm.refreshData();
          }

        }
      });
    },
    refreshData() {
      let vm = this;
      clearInterval(eosCommon.timer);
      eosCommon.timer = setInterval(() => {
        vm.QueryAssemblageDynamicData();
      }, vm.get_freshTime_Data.Rate * 1000);
    },
    requestProtocols(resolve, reject) {
      let vm = this;
      if (vm.get_STORE_idlist.length == 0) {
        resolve();
        return;
      }
      let EquipmentIdsStr = vm.get_STORE_idlist.join(',');
      let param = {
        "AccessToken": eosCommon.storage.get('AccessToken'),
        "EquipmentIds": EquipmentIdsStr
      };
      let url = eosCommon.ENTERPRISE_API + "api/Equipment/QueryWorkProtocols";
      eosCommon.eosAjax(url, "get", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.uPDATE_EQLIST({
            updateType: 2,
            protocolList: result.Data
          });
          resolve();
        }
      });

    },
    getProtocols() {
      return new Promise(this.requestProtocols);
    },
    QueryAssemblageDynamicData() {
      let vm = this;
      let param = {
        "AccessToken": vm.AccessToken,
        "TargetId": vm.TargetId
      };
      let url = eosCommon.ENTERPRISE_API + "api/Assemblage/QueryAssemblageDynamicData";
      eosCommon.eosAjax(url, "get", param, "json", function(result) {
        if (result.State == 10002) {
          clearInterval(eosCommon.timer);
        }
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.AssemblageDynamicData = result.Data.Result;
          vm.uPDATE_FRESHTIME_DATA({
            Rate: vm.get_freshTime_Data.Rate,
            Time: result.Data.Time
          });
          let len1 = vm.AssemblageDynamicData.length;
          let chartCurrentData = [];
          let datablockCurrentData = [];
          for (let i = 0; i < len1; i++) {
            if (vm.AssemblageDynamicData[i].Type == 'Text') {
              for (let j = 0; j < vm.get_label_data.length; j++) {
                if (vm.AssemblageDynamicData[i].Id == vm.get_label_data[j].refs) {
                  vm.uPDATE_LABEL({
                    isClear: true,
                    isFreshLabel: true,
                    labelContentInfo: {
                      val: vm.AssemblageDynamicData[i].Value,
                      Id: vm.AssemblageDynamicData[i].Id,
                      labelContent: vm.AssemblageDynamicData[i].Value + vm.get_label_data[j].editData.PostPositionValue
                    }
                  });
                  break;
                }
              }
            } else if (vm.AssemblageDynamicData[i].Type == 'Graph') {
              chartCurrentData.push(...[vm.AssemblageDynamicData[i]]);
            } else if (vm.AssemblageDynamicData[i].Type == 'TextGroup') {
              datablockCurrentData.push(...[vm.AssemblageDynamicData[i]]);
            } else if (vm.AssemblageDynamicData[i].Type == 'Dashboard') {
              for (let j = 0; j < vm.get_dashboard_data.length; j++) {
                if (vm.AssemblageDynamicData[i].Id == vm.get_dashboard_data[j].refs) {
                  vm.uPDATE_DASHBOARD({
                    isClear: true,
                    isFreshDashboard: true,
                    dashboardContent: vm.AssemblageDynamicData[i]
                  });
                  break;
                }
              }
            } else if (vm.AssemblageDynamicData[i].Type == 'StateGraph') {
              for (let j = 0; j < vm.get_datastate_data.length; j++) {
                if (vm.AssemblageDynamicData[i].Id == vm.get_datastate_data[j].refs) {
                  vm.uPDATE_DATASTATE({
                    isClear: true,
                    isFreshDatastate: true,
                    StateGraphId: vm.AssemblageDynamicData[i].StateGraphId,
                    datastateValue: vm.AssemblageDynamicData[i].Value,
                    OriginValue: vm.AssemblageDynamicData[i].OriginValue
                  });
                  break;
                }
              }
            }
          }
          vm.uPDATE_CHARTCURRENTDATA(chartCurrentData);
          vm.uPDATE_DATABLOCKCURRENTDATA(datablockCurrentData);
        }
      })
    },
    //有id为编辑,没id为新增
    addOrEditObj(obj) {
      let vm = this;
      if (!obj) {
        vm.operateObjData.objName = '';
        vm.AssemblageId = '';
        vm.operateObjData.operationType = '添加自定义场景'
        vm.setUnbindEquipmentOpts()
        vm.resetForm()
        if (!vm.ProjectId) {
          vm.$message.error('请先选择项目')
          return false;
        }
      } else {
        // vm.operateObjData.objName = objName;
        vm.AssemblageId = obj.AssemblageId
        vm.setForm(obj)
        vm.operateObjData.operationType = '编辑场景'
      }
      vm.dialogFormVisible = true
    },
    setForm(obj) {
      let vm = this
      vm.operateObjData.objName = obj.Name
      vm.operateObjData.CoverPhoto.FileUrl = obj.ResourceUrl
      vm.operateObjData.CoverPhoto.FileId = obj.ResourceId
      // vm.operateObjData.checkedOpts = []
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        AssemblageId: obj.AssemblageId
      }
      GET(URL.QUERYASSEMBLAGEEQUIPMENT, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.UnbindEquipmentOpts = data
            // console.log(data)
            let array = []
            for (let item of data) {
              if (item.IsBinded == 1) {
                array.push(item.EquipmentAlias)
              }
            }
            vm.operateObjData.checkedOpts = array
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    resetForm() {
      let vm = this
      vm.operateObjData.objName = ''
      vm.operateObjData.CoverPhoto.FileUrl = ''
      vm.operateObjData.CoverPhoto.FileId = ''
      vm.operateObjData.checkedOpts = []
    },
    submitForm() {
      let vm = this
      if (vm.validateForm()) {
        if (vm.AssemblageId) {
          vm.submitEdit()
        }else{
          vm.submitCreate()
        }
      }
    },
    checkSelectedEquip(checkedList){
      let vm = this
      let res = []
      for (let item of checkedList) {
        for (let jtem of vm.UnbindEquipmentOpts) {
          if (item == jtem.EquipmentAlias) {
            res.push(jtem.TerminalEquipmentId)
            break;
          }
        }
      }
      return res
    },
    validateForm() {
      let vm = this
      let form = vm.operateObjData
      if (!form.objName) {
        vm.$message.error('请填写场景名称')
        return false
      }
      if (form.checkedOpts.length==0||!form.checkedOpts) {
        vm.$message.error('请至少选择一台设备')
        return false
      }
      return true
    },
    submitCreate() {
      let vm = this;
      vm.isCreating = true
      let RelatedEquipmentList = vm.checkSelectedEquip(vm.operateObjData.checkedOpts)
      let param = {
        "AccessToken": vm.AccessToken,
        "Parameters": {
          "ProjectId": vm.ProjectId,
          "AssemblageName": vm.operateObjData.objName,
          "ResourceId": vm.operateObjData.CoverPhoto.FileId,
          RelatedEquipmentList
        }
      };
      let url = eosCommon.ENTERPRISE_API + "api/Assemblage/CreateAssemblage";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        vm.isCreating = false
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.$message.success('添加成功！');
          vm.dialogFormVisible = false
          vm.QueryAssemblageList();
        }
      });
    },
    submitEdit() {
      let vm = this;
      vm.isCreating = true
      let RelatedEquipmentList = vm.checkSelectedEquip(vm.operateObjData.checkedOpts)
      let param = {
        "AccessToken": vm.AccessToken,
        "Parameters": {
          "ProjectId": vm.ProjectId,
          "AssemblageId": vm.AssemblageId,
          "AssemblageName": vm.operateObjData.objName,
          "ResourceId": vm.operateObjData.CoverPhoto.FileId,
          RelatedEquipmentList
        }
      };
      let url = eosCommon.ENTERPRISE_API + "api/Assemblage/ModifyAssemblage";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        vm.isCreating = false
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.$message.success('修改成功！');
          vm.dialogFormVisible = false
          vm.QueryAssemblageList();
        }
      });
    },
    submitDelete(TargetId) {
      let vm = this;
      let param = {
        "AccessToken": vm.AccessToken,
        "Parameters": {
          "TargetId": TargetId,
        }
      };
      let url = eosCommon.ENTERPRISE_API + "api/Assemblage/DeleteEeqipmentAssemblage";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.$message({
            type: 'success',
            message: '删除成功！'
          });
          vm.QueryAssemblageList();
        }
      });
    },
    customLazy(src, errorImg) {
      return commonFn.customLazy(src, errorImg)
    },
    confirmDeleteObj(TargetId) {
      let vm = this
      vm.$confirm('此操作将永久删除该场景, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.submitDelete(TargetId);
      }).catch(() => {})
    },
    addOremoveActiveClass(iconType, currActiveIndex) {
      let vm = this;
      if (iconType == '') {
        vm.iconType = '';
        return;
      }
      vm.iconType = iconType;
      vm.currActiveIndex = currActiveIndex;
    }
  }
}

</script>

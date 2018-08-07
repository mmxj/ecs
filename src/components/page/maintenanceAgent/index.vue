<style scoped lang='less'>
.el_mainContent {
  width: 100%;
  height: 100%;
  position: relative;
}

.leftTop {
  background: url() 0 0 no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  position: absolute;
  background-position: center;
  left: 0;
  overflow: hidden;
}

.leftTopBg {
  // background: #162433;
  background: url() 0 0 no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  background-position: center;
  position: absolute;
  left: 0;
  overflow: hidden;
  opacity: .5;
}

.leftBottom {
  background: #162433;
  position: absolute;
  bottom: 0;
  overflow: hidden;
  height: 140px;
}

.rightPart {
  width: 320px;
  height: 100%;
  background: #162433;
  position: absolute;
  overflow-x: hidden;
  overflow-y: auto;
  right: 0;
  & .unit {
    position: relative;
    height: 110px;
    cursor: pointer;
    transition: background-color .3s;
  }

  & .unit:hover {
    background-color: #2D3A47;
  }
}



.imgWrap {
  width: 120px;
  height: 80px;
  overflow: hidden;
  position: absolute;
  left: 15px;
  top: 15px;
  border-radius: 5px;
  & img {
    width: 100%;
  }
}

.projectName {
  color: #FEFEFE;
  font-size: 18px;
  position: absolute;
  width: 160px;
  left: 150px;
  top: 25px;
}

.alarmLabel {
  position: absolute;
  left: 150px;
  top: 56px;
}

.countType {
  width: 100%;
  height: 40px;
  line-height: 40px;
  position: absolute;
  bottom: 0;
  text-align: center;
  font-size: 14px;
  color: #B6B6B7;
}

.countUnit {
  float: left;
  overflow: hidden;
  height: 100px;
  padding-top: 30px;
}

.bdb {
  cursor: pointer;
  height: 55px;
  border-left: 1px solid #B6B6B7;
  position: relative;
  & .text {
    padding-left: 15px;
    font-size: 16px;
    color: #B6B6B7;
    line-height: 16px;
  }
  & .num {
    padding-left: 15px;
    font-size: 27px;
    color: #FEFEFE;
    position: relative;
    top: 8px;
    font-weight: bold;
  }
}

.bdb:hover .countLogo {
  width: 50px;
  height: 50px;
  top: 4px;
  left: -70px;
}

.countLogo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  -webkit-background-size: 60%;
  background-size: 60%;
  background-color: #B6B6B7;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  left: -65px;
  top: 9px;
  transition: width .3s, height .3s, top .3s, left .3s;
}

.dataBlock {
  z-index: 2;
  position: absolute;
}

.dataArea {
  width: 350px;
  height: 60%;
  position: absolute;
  right: 10px;
  top: 10px
}

.blockUnit {
  height: 50%
}

.areaTitle {
  height: 36px;
  line-height: 36px;
  background-color: rgba(255, 255, 255, .85);
  & .text {
    font-size: 16px;
    color: #162433;
    font-weight: bold;
    padding-left: 15px;
  }
  & .num {
    font-weight: bold;
    font-size: 16px;
    color: #E74C3C;
  }
  & .more {
    color: #3B9FED;
    padding-right: 10px;
    cursor: pointer;
  }
  & .more:hover {
    font-weight: bold;
  }
  ;
}

.areaDetail {
  background-color: rgba(255, 255, 255, .65);
  overflow-x: hidden;
  overflow-y: auto;
  & .warningUnit {
    padding-left: 10px;
    line-height: 25px;
    height: 25px;
    & span {
      font-size: 14px;
      font-weight: bold;
      padding-left: 5px;
    }
    & img{
      position: relative;
      top: -9px;
    }
  }
  & .dataUnit{
    line-height: 25px;
    height: 25px;
    font-weight: bold;
    padding-left: 15px;
  }
}

.select {
  position: absolute;
  top: 10px;
  left: 10px;
  opacity: .5;
  transition: opacity .5s;
}

.select:hover {
  opacity: .8;
}

.el-select-dropdown {
  opacity: .8;
}

</style>
<template>
  <div class="el_mainContent">
    <div class="leftTopBg" style="width: calc(100% - 330px);height: calc(100% - 150px)" :style='hostSty'></div>
    <transition name="el-zoom-in-center">
      <div class="leftTop" style="width: calc(100% - 330px);height: calc(100% - 150px)" :style='bgSty' v-show='isShowFade'>
      </div>
    </transition>
    <div class="dataBlock" style="width: calc(100% - 330px);height: calc(100% - 150px)">
      <el-select v-model="ProjectId" class='select' filterable @change='projectChange' :loading='loadingProjectOpts'>
        <el-option v-for="item in projectOpts" :key="item.ProjectId" :label="item.ProjectName" :value="item.ProjectId">
        </el-option>
      </el-select>
      <div class="dataArea">
        <div class="blockUnit">
          <div class="areaTitle">
            <span class="text curp" @click='queryPushWarn'>预警告警数：</span>
            <span class="num curp" @click='queryPushWarn'>{{warningList.length}}</span>
            <span class="more fr" @click='queryPushWarn'>更多</span>
          </div>
          <div class="areaDetail" style="height: calc(100% - 36px)">
            <!-- warningList -->
            <p class='warningUnit curp' v-for='item in warningList' :title="item.title" @click='seeMore(item)'><img :src="item.AlarmLevel==1?AlarmLevel1PngSrc:item.AlarmLevel==2?AlarmLevel2PngSrc:AlarmLevel3PngSrc" width="35" height="13" />
              <span class="nowrap" style="display: inline-block;width: 270px">{{item.description}}</span>
            </p>
          </div>
        </div>
        <div class="blockUnit por" style="top:10px">
          <div class="areaTitle">
            <span class="text curp" @click='goDetail'>重点数据：</span>
            <span class="num curp" @click='goDetail'>{{MainData.length}}</span>
            <span class="more fr" @click='goDetail'>更多</span>
          </div>
          <div class="areaDetail" style="height: calc(100% - 36px)">
            <p class='dataUnit curd nowrap' v-for='item in MainData' :title='item.description'>{{item.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="leftBottom" style="width: calc(100% - 330px)">
      <div class="countUnit w33p">
        <div class="fr bdb" style="margin-right: 20%" @click="goTo('yz_equipments_manage',{'ProjectId':ProjectId})">
          <div class="text">总设备数</div>
          <div class="num">{{totalEquipNum}}</div>
          <div class="countLogo" :style='{"backgroundImage":"url("+logo1png+")"}'> </div>
        </div>
      </div>
      <div class="countUnit w33p">
        <div class="bdb" style="margin-left: calc(30% + 65px)" @click="goTo('yz_equipments_manage',{'ProjectId':ProjectId,'OnlineStatus':'0'})">
          <div class="text">离线设备数</div>
          <div class="num">{{offEquipNum}}</div>
          <div class="countLogo" :style='{"backgroundImage":"url("+logo2png+")"}'> </div>
        </div>
      </div>
      <div class="countUnit w33p">
        <div class="bdb" style="margin-left: calc(10% + 65px)">
          <div class="text">定时巡检报告</div>
          <div class="num">0</div>
          <div class="countLogo" :style='{"backgroundImage":"url("+logo3png+")"}'> </div>
        </div>
      </div>
      <div class="countType">
        <span class="curd" v-for='item in typeNumList' style="margin-right: 30px">{{item.Type}}：{{item.Total}}</span>
      </div>
    </div>
    <div class="rightPart">
      <div class="unit" v-for='(item, index) in AssemblageList' :style='item.isActive?{backgroundColor:"#1ABC9C",fontWeight:"bold"}:{}' @click='activeMenu(index)'>
        <div class="imgWrap">
          <img v-lazy="customLazy(item.Logo,defaultThumb)" @load='setImgWH' />
        </div>
        <div class="projectName nowrap">{{item.Name}}</div>
        <img :src="item.AlarmLevel==0?AlarmLevel0PngSrc:item.AlarmLevel==1?AlarmLevel1PngSrc:item.AlarmLevel==2?AlarmLevel2PngSrc:AlarmLevel3PngSrc" width="57" height="20" class='alarmLabel' />
      </div>
    </div>
    <el-dialog title="预警告警详情" :visible.sync="isShowDetailDialog">
      <el-row v-loading="loadingDetailDialog" element-loading-text="努力加载中">
        <el-col :span='12'>
          <el-form label-width="120px" class="demo-ruleForm">
            <el-form-item label="设备名称：">{{detailForm.EquipmentAlias}}</el-form-item>
            <el-form-item label="报警时间：">{{detailForm.AlarmTime}}</el-form-item>
            <el-form-item label="故障代码：">{{detailForm.FaultCodes}}</el-form-item>
            <el-form-item label="维保联系人：">{{detailForm.Contact}}</el-form-item>
            <el-form-item label="维保联系电话：">{{detailForm.Mobile}}</el-form-item>
            <el-form-item label="故障持久性：">{{detailForm.FaultDurabilitys}}</el-form-item>
          </el-form>
        </el-col>
        <el-col :span='12'>
          <el-form label-width="100px" class="demo-ruleForm">
            <el-form-item label="级别：">
              <span :style='detailForm.AlarmLevel==1?alarmLevelLableStyle.style1:(detailForm.AlarmLevel==2?alarmLevelLableStyle.style2:alarmLevelLableStyle.style3)' class='colorLabel colorSpan'>{{detailForm.AlarmLevelName}}</span>
            </el-form-item>
            <el-form-item label="状态：">
              <label :style='detailForm.Status==1?resetStatusLableStyle.style0:resetStatusLableStyle.style1' class='colorLabel colorSpan'>{{detailForm.StatusName}}</label>
            </el-form-item>
            <el-form-item label="报警位置：">{{detailForm.EquipmentPlace}}</el-form-item>
            <el-form-item label="所属项目：">{{detailForm.ProjectName}}</el-form-item>
            <el-form-item label="项目地址：">{{detailForm.ProjectAddress}}</el-form-item>
          </el-form>
        </el-col>
        <el-col :span='24'>
          <el-form label-width="120px" class="demo-ruleForm">
            <el-form-item label="故障描述：">{{detailForm.AlarmContent}}</el-form-item>
            <el-form-item label="警报信息：">{{detailForm.EventDetailDes}}</el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDetailDialog = false">关 闭</el-button>
        <el-button type="primary" @click="createOrder" v-show='detailForm.isShowCreateOrder'>手动创建工单</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex'
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const FUNC = Common.Func
const STYLE = Common.Const.style
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
import defaultpng from 'assets/images/index/default.png'
import logo1png from 'assets/images/index/logo1.png'
import logo2png from 'assets/images/index/logo2.png'
import logo3png from 'assets/images/index/logo3.png'
import hostBgSrc from 'assets/images/index/timg.jpg'
import defaultThumb from 'assets/images/index/thumbDefault.png'
import AlarmLevel0PngSrc from 'assets/images/index/alarm0.png'
import AlarmLevel1PngSrc from 'assets/images/index/12.png'
import AlarmLevel2PngSrc from 'assets/images/index/11.png'
import AlarmLevel3PngSrc from 'assets/images/index/10.png'
export default {
  data: function() {
    return {
      currentProjectData: {},
      IsAdmin: FUNC.storage.get("IsAdmin"),
      isShowDetailDialog: false,
      loadingDetailDialog: true,
      detailForm: {
        EventDetail: {}
      },
      alarmLevelLableStyle: STYLE.alarmLevelLable,
      resetStatusLableStyle: STYLE.resetStatusLable,
      totalEquipNum: 0,
      offEquipNum: 0,
      typeNumList: [],
      StatistList: [],
      MainData: [],
      ProjectId: '',
      projectOpts: [],
      loadingProjectOpts: true,
      logo1png,
      logo2png,
      logo3png,
      timeId: null,
      isShowFade: true,
      hostSty: {
        backgroundImage: `url(${hostBgSrc})`
      },
      defaultThumb,
      AlarmLevel0PngSrc,
      AlarmLevel1PngSrc,
      AlarmLevel2PngSrc,
      AlarmLevel3PngSrc,
      bgSty: {
        'backgroundImage': ''
      },
      AssemblageList: [],
      warningList: [],
    }
  },
  computed: {},
  methods: {
    ...mapMutations({
      uPDATE_SHOWWHICHTAB: 'UPDATE_SHOWWHICHTAB'
    }),
    goTo(routerPath, routerParams) {
      let vm = this
      if (routerPath == 'yz_equipments_manage') {
        // vm.uPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
        FUNC.tntool.setTnAuth(routerPath)
        vm.$router.push({ path: `${routerPath}/0`, query: routerParams })
        return
      }
      /*vm.uPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
      FUNC.tntool.setTnAuth(routerPath)
      vm.$router.push({ path: routerPath, query: routerParams })*/
    },
    createOrder() {
      let vm = this
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "EquipmentAlarmId": vm.detailForm.FaultId,
        "ProjectId": vm.ProjectId,
        "EquipmentId": vm.detailForm.EquipmentId,
        "AlarmLevel": vm.detailForm.AlarmLevel,
        "FaultDurabilitys": vm.detailForm.FaultDurabilitys,
        "AlarmTime": vm.detailForm.AlarmTime,
        "AlarmName": vm.detailForm.AlarmContent,
      }
      // console.log(data)
      POST(URL.ALARMWORKORDER, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.$message.success('创建工单成功')
            for (let index in vm.AssemblageList) {
              if (vm.AssemblageList[index].isActive) {
                vm.getWarningListFromAssemblage(vm.AssemblageList[index])
                break;
              }
            }
            vm.isShowDetailDialog = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //查看更多
    seeMore(row) {
      // console.log(row)
      let vm = this
      vm.loadingDetailDialog = true
      vm.isShowDetailDialog = true
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "FaultId": row.FaultId
        }
      }
      GET(URL.FAULTDETAIL, data).then(function(response) {
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.detailForm = res.Data.queryEquipmentFaultDetail[0]
          // vm.detailForm.ProjectId = row.ProjectId
          let EventDetail = res.Data.EventDetail[0]
          vm.detailForm.EventDetailDes = `${EventDetail.CreatedBy} ${EventDetail.CreatedOn} ${EventDetail.Account} ${EventDetail.Status}`
          // console.log(vm.detailForm.EventDetailDes)
          vm.detailForm.isShowCreateOrder = vm.isShowCreateBtn(vm.detailForm)
          vm.loadingDetailDialog = false
          // console.log(vm.detailForm)
        }
      })

    },
    //通过切换项目查询重点数据
    getMainDataFromProject() {
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TargetId": vm.ProjectId,
        "IsProjectId": 1
      };
      GET(URL.QUERYASSEMBLAGEMAINDATA, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data.Result
            vm.MainData = vm.setMainData(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });

    },

    //通过点击场景列表查询重点数据
    getMainDataFromAssemblage(item) {
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TargetId": item.TargetId,
        "IsProjectId": item.IsProject
      };
      GET(URL.QUERYASSEMBLAGEMAINDATA, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data.Result
            vm.MainData = vm.setMainData(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });

    },

    //获取重点数据后按格式填充
    setMainData(data) {
      // console.log(data)
      let vm = this
      for (let item of data) {
        item.description = `【${item.AssemblageName}】${item.AliasName||item.Name}： ${item.Value}${item.Unit}`
      }
      return data
    },

    //通过切换项目查询设备统计信息
    getEquipmentStatisticFromProject() {
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TargetId": vm.ProjectId,
        "IsProjectId": 1
      };
      GET(URL.STATISTICASSEMBLAGEEQUIPMENT, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.setEquipmentStatistic(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });

    },

    //通过点击场景列表查询设备统计信息
    getEquipmentStatisticFromAssemblage(item) {
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TargetId": item.TargetId,
        "IsProjectId": item.IsProject
      };
      GET(URL.STATISTICASSEMBLAGEEQUIPMENT, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.setEquipmentStatistic(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });

    },

    //获取统计数据后按格式填充
    setEquipmentStatistic(data) {
      let vm = this
      vm.totalEquipNum = data[0].Total
      vm.offEquipNum = data[1].Total
      vm.typeNumList = data.slice(2)
    },

    //通过切换项目查询告警条目
    getWarningListFromProject() {
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TargetId": vm.ProjectId,
        "IsProjectId": 1
      };
      GET(URL.GETASSEMBLAGEALARAMINFO, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data.Result
            vm.warningList = vm.setWarningList(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });

    },

    //通过点击场景列表查询告警条目
    getWarningListFromAssemblage(item) {
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TargetId": item.TargetId,
        "IsProjectId": item.IsProject
      };
      GET(URL.GETASSEMBLAGEALARAMINFO, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data.Result
            vm.warningList = vm.setWarningList(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });

    },

    //告警内容字符拼接
    setWarningList(dataObj) {
      for (let item of dataObj) {
        // item.description = `${item.AlarmDateTime} ${item.EquipmentPlace||item.Name} ${item.AlarmContent}`
        item.description = `${item.AlarmHitTime} ${item.EquipmentPlace||item.Name} ${item.AlarmContent}`
        item.title = `${item.EquipmentPlace} ${item.Name} ${item.AlarmContent}`
      }
      return dataObj
    },

    //获取场景及所属项目列表
    getAssemblageList() {
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ProjectId": vm.ProjectId
      };
      GET(URL.GETASSEMBLAGEHOMEINFO, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data.Result
            for (let item of data) {
              item.isActive = false
            }
            data[0].isActive = true
            vm.bgSty.backgroundImage = `url(${data[0].Image||defaultpng})`
            vm.AssemblageList = data
          }

        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    queryPushWarn() {
      let vm = this
      vm.uPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
      let path = 'yz_warning_lists'
      let ProjectId = vm.ProjectId
      FUNC.tntool.setTnAuth(path)
      this.$router.push({
        path: path,
        query: {
          ProjectId,
          fromMap: true
        }
      })
    },

    //跳转到项目数据详情
    goDetail() {
      let vm = this
      eosCommon.storage.set('currentViewTab', '');
      vm.$router.push({ name: `yz_project_detail`, params: vm.currentProjectData })
      this.uPDATE_SHOWWHICHTAB({
        showWhichTab: 4
      });
    },
    //获取业主项目列表(左上角下拉框)
    setProjectOpts() {
      let vm = this
      vm.loadingProjectOpts = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "IsMaint": 0, //--是否维保方(0：业主列表；1：维保列表  必填)
      };
      GET(URL.PROJECTQUERY, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.projectOpts = res.Data.Result
            vm.ProjectId = vm.projectOpts[0].ProjectId
            vm.loadingProjectOpts = false
          }

        })
        .catch(function(error) {
          console.log(error.message)
        });
    },

    //缩略图比例设置
    setImgWH(e) {
      let el = e.path[0]
      let normalScale = 120 / 80
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
    customLazy(src, errorImg) {
      return FUNC.customLazy(src, errorImg)
    },
    hasResetRight(row){
      // if (row.HasResetPower == 1 || (this.EntitySort == 1 && this.IsAdmin == 1)) return true
      if (row.HasResetPower == 1 || this.IsAdmin == 1) return true
      return false
    },
    isShowCreateBtn(row) {
      // console.log(row)
      if (this.hasResetRight(row) && !row.WorkOrderId && row.Status == 1) return true
      return false
    },

    //保存当前选择项目信息,用于进入项目详情页面
    setCurrentProject(){
      let vm = this
      for (let item of vm.projectOpts) {
        if (vm.ProjectId == item.ProjectId) {
          vm.currentProjectData = item
          return
        }
      }
    },
    //点击场景条目触发的操作
    activeMenu(index) {
      let vm = this
      for (let item of vm.AssemblageList) {
        item.isActive = false
      }
      vm.AssemblageList[index].isActive = true
      vm.isShowFade = false
      clearTimeout(vm.timeId)
      vm.timeId = setTimeout(function() {
        vm.bgSty.backgroundImage = `url(${vm.AssemblageList[index].Image||defaultpng})`
        vm.isShowFade = true
        vm.getDataFromAssemblage(vm.AssemblageList[index])
      }, 300)

    },

    //点击场景条目触发函数集
    getDataFromAssemblage(item) {
      let vm = this
      vm.getWarningListFromAssemblage(item)
      vm.getEquipmentStatisticFromAssemblage(item)
      vm.getMainDataFromAssemblage(item)
    },

    //切换项目触发函数集
    projectChange() {
      let vm = this
      vm.setCurrentProject()
      vm.getAssemblageList()
      vm.getWarningListFromProject()
      vm.getEquipmentStatisticFromProject()
      vm.getMainDataFromProject()

    },

    //初始化函数集
    init() {
      let vm = this
      vm.setProjectOpts()
    }
  },
  mounted() {
    let vm = this
    vm.init()
  }
}

</script>

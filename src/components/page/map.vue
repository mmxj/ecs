<style lang='scss' scoped>
.el_mainContent {
  position: relative;
  overflow: hidden;
  background: none 0 0 no-repeat;
  background-size: cover;
}

.top-left {
  position: absolute;
  top: 0;
  left: 0;
  width: 25%;
  height: 50%;
  padding-right: 15px;
  padding-bottom: 7.5px;
}

.bottom-left {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 25%;
  height: 50%;
  padding-right: 15px;
  padding-top: 7.5px;
}

.top-right {
  position: absolute;
  top: 0;
  right: 0;
  width: 25%;
  height: 33.33%;
  padding-left: 15px;
  padding-bottom: 7.5px;
}

.mid-right {
  position: absolute;
  top: 33.33%;
  right: 0;
  width: 25%;
  height: 33.33%;
  padding-left: 15px;
  padding-top: 7.5px;
  padding-bottom: 7.5px;
}

.bottom-right {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25%;
  height: 33.33%;
  padding-left: 15px;
  padding-top: 7.5px;
}

.top-mid {
  position: absolute;
  top: 0;
  left: 25%;
  width: 50%;
  height: 82%;
}

.bottom-mid {
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 50%;
  height: 18%;
  & .w50p {
    padding-top: 15px;
    height: 100%;
    & .con {
      background: rgba(22, 36, 51, .6) none 20% 50% no-repeat;
      width: 100%;
      height: 100%;

      color: #FEFEFE;
      position: relative;
      & .textArea {
        // position: relative;
        // top: 50px;
      }
      & p {
        font-size: 14px;
        line-height: 35px;
        height: 35px;
      }
      & span {
        font-size: 20px;
        font-weight: bold;
        padding-left: 15px;
        position: relative;
        top: 1px
      }

      & .equiTextArea {
        /* position: absolute;
        width: 100%;
        right: 10%;
        top: 50%; */
        & .unit {
          padding-left: 10px;
          font-size: 14px;
          font-weight: normal;
          top: 0;
          text-align: center;
          float: right;
          & span {
            font-size: 14px;
            font-weight: bold;
            padding-left: 5px;
            position: relative;
            top: 0
          }
        }
      }
    }
  }
}

.conWrap {
  width: 100%;
  height: 100%;
  background: rgba(22, 36, 51, .6);
  & .title {
    height: 32px;
    line-height: 32px;
    margin: 0 15px;
    color: #1ABC9C;
    font-size: 12px;
    padding-left: 20px;
    font-weight: bold;
    border-bottom: 1px dashed #1ABC9C;
    background: none 0 9px no-repeat;
  }
  & .con {
    position: absolute;
    top: 47px;
    left: 15px;
    right: 30px;
    bottom: 15px;
    overflow-x: hidden;
    overflow-y: auto;
  }
}

.scrollCon p {
  font-size: 14px;
  line-height: 22px;
  & img {
    position: relative;
    top: -7px
  }
}

$eos-green: #1abc9c;
.mapBtn {
  border: 1px solid $eos-green;
  line-height: 25px;
  padding: 0 10px;
  border-radius: 4px;
  cursor: pointer;
  color: $eos-green;
  position: absolute;
  left: 30px;
  top: 15px;
  transition: background .3s
}

.proData {
  width: 75px;
  position: absolute;
  left: 30px;
  top: 70px;
  & p {
    text-align: center;
  }
  & .num{
    font-weight: bold;
    font-size: 18px;
    border-bottom: 2px solid #FEFEFE;
  }
  & .text{
    color: #FEFEFE;
    font-size: 10px;
    line-height: 28px;
  }
}

.mapBtn:hover {
  background: #324057;
}

</style>
<template>
  <div class="el_mainContent" :style='bgSty' ref='indexContent' style='width:100%;height:100%'>
    <div class="top-left">
      <div class="conWrap">
        <div class="title" :style='disTitSty'>不同区域项目、设备对比</div>
        <div class="con" ref='yCategory' v-loading='loadingYCat'></div>
      </div>
    </div>
    <div class="bottom-left">
      <div class="conWrap">
        <div class="title" :style='indTitSty'>行业占比</div>
        <div class="con" ref='aLine' v-loading='loadingALine'></div>
      </div>
    </div>
    <div class="top-right">
      <div class="conWrap">
        <div class="title" :style='equTitSty'>设备种类</div>
        <div class="con" ref='barChart' v-loading='loadingEqui' style="left: 30px;right:15px"></div>
      </div>
    </div>
    <div class="mid-right">
      <div class="conWrap" v-loading='loading'>
        <div class="title" :style='alaTitSty'>告警项目</div>
        <div class="con" ref='ringChart' style="left: 30px;right:50%"></div>
        <div class="con" style="left: 50%;right:15px;padding-left:15px;padding-right:5px" ref='alarmProjectOutWrap'>
          <div @wheel='handleScroll' @mouseenter='cancelScroll' @mouseleave='startScroll' ref='scrollCon' class='scrollCon' :class="{anim:scrollAnimate==true}">
            <p class='unit curp' v-for='item in alartProject' :title="item.name" @click='queryPushWarn(item.value[8])'><img :src="item.value[9]==1?AlarmLevel1PngSrc:item.value[9]==2?AlarmLevel2PngSrc:AlarmLevel3PngSrc" alt="" width="35" height="13" />
              <span :style='item.value[9]==1?alarmTextStyle.style1:(item.value[9]==2?alarmTextStyle.style2:alarmTextStyle.style3)' style="width:calc(100% - 40px)" class="nowrap">
                        {{item.name}}
                        </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-right">
      <div class="conWrap" v-if='EntitySort==2'>
        <div class="title" :style='newTitSty'>新增项目、新增客户对比</div>
        <div class="con" ref='dYLIne' v-loading='loadingNew' style="left: 30px;right:15px"></div>
      </div>
      <div class="conWrap" v-else>
        <div class="title" :style='miaTitSty'>维保计划</div>
        <div class="con" ref='dYLIne2' v-loading='loadingMiant' style="left: 30px;right:15px"></div>
      </div>
    </div>
    <div class="top-mid">
      <div class="conWrap">
        <div class="con" id="index" ref='index' :style='indexSty' v-loading='loadingMiant'></div>
        <span class="mapBtn" @click="goTo('project_list',{'IndustryId':IndustryId,'FromMap':true})">项目列表</span>
        <div class="proData">
          <p style="color: #1ABC9C;" class="curp num" @click="goTo('project_list',{'IndustryId':IndustryId,'FromMap':true})">{{ProjectTotal}}</p>
          <p class="text curp" style="margin-bottom: 10px" @click="goTo('project_list',{'IndustryId':IndustryId,'FromMap':true})">项目总数</p>
          <p style="color: #E74C3C;" class="curp num" @click="goTo('project_list',{'AlarmType':'4','FromMap':true})">{{ProjectAlarm}}</p>
          <p class="text curp" @click="goTo('project_list',{'AlarmType':'4','FromMap':true})">告警项目数</p>
        </div>
      </div>
      <!-- <div id="index" ref='index' style='width:100%' :style='indexSty'></div> -->
    </div>
    <div class="bottom-mid">
      <!-- <div class="w33p fl" style="padding-right:7.5px;">
        <div class="con" :style='bm1sty'>
          <div class="text">
            <p class="curp" @click="goTo('project_list',{'IndustryId':IndustryId,'FromMap':true})">项目总数<span>{{ProjectTotal}}</span></p>
            <p class="curp" @click="goTo('project_list',{'AlarmType':'4','FromMap':true})">告警项目数<span>{{ProjectAlarm}}</span></p>
          </div>
        </div>
      </div> -->
      <div class="w50p fl" style="padding-right:7.5px;">
        <div class="con vertical-container" v-if='EntitySort==2'>
          <div class="textArea">
            <img :src="cliPng" style="position: relative;top:-10px" />
            <span style="top:10px">
              <p class="curp" @click="goTo('sm_customer')">客户总数<span>{{TernantTotal}}</span></p>
              <p class="curp" @click="goTo('sm_customer_account')">用户总数<span>{{AccountNum}}</span></p>
            </span>
          </div>
        </div>
        <div class="con vertical-container" v-else>
          <div class="textArea">
            <img :src="worPng" style="position: relative;top:-10px" />
            <span style="top:10px">
              <p class="curp" @click="goTo('work_order')">工单总数<span>{{orderTotal}}</span></p>
              <p class="curp" @click="goTo('work_order',{'OrderStatus':'1'})">未处理工单数<span>{{Unexcute}}</span></p>
            </span>
          </div>
        </div>
      </div>
      <div class="w50p fl" style="padding-left:7.5px;">
        <div class="con vertical-container">
          <div class="textArea">
            <img :src="equiPng" style="position: relative;top:10px" />
            <span style="top:-10px">
              <p class="curp" @click="goTo('sm_equipmet_lists')">设备总数<span>{{Total}}</span></p>
            <div class="equiTextArea">
              <div class="unit curp" @click="goTo('sm_equipmet_lists',{'RunStatus':1})"><span>{{Opening}}</span>
                <br />开机</div>
              <div class="unit curp" @click="goTo('sm_equipmet_lists',{'RunStatus':2})"><span>{{Closed}}</span>
                <br />停机</div>
              <div style="padding-left: 0" class="unit curp" @click="goTo('sm_equipmet_lists',{'AlarmStatus':4})"><span>{{Alarm}}</span>
                <br />告警</div>
            </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import disPng from 'assets/images/index/district.png'
import indPng from 'assets/images/index/industry.png'
import equPng from 'assets/images/index/equiment.png'
import alaPng from 'assets/images/index/alarm.png'
import newPng from 'assets/images/index/new.png'
import miaPng from 'assets/images/index/miant.png'
import proPng from 'assets/images/index/project.png'
import cliPng from 'assets/images/index/client.png'
import equiPng from 'assets/images/index/equipment.png'
import worPng from 'assets/images/index/workorder.png'
import bgJpg from 'assets/images/bg/bg.jpg'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/scatter')
require('echarts/lib/chart/effectScatter')
require('echarts/lib/chart/custom')
require('echarts/extension/bmap/bmap')
// import data from './data2.json'
// import geo from './geoCoordMap.json'
import { mapGetters, mapMutations } from 'vuex'
// import option from 'components/page/common/option'
import barOption from 'assets/js/chartOption/barOption'
import yCatOption from 'assets/js/chartOption/yCategoryOption'
import aLineOption from 'assets/js/chartOption/aLineOption'
import ringOption from 'assets/js/chartOption/ringOption'
import dYLIneOption from 'assets/js/chartOption/dYLIneOption'
import dYLIneOption2 from 'assets/js/chartOption/dYLIneOption2'
import mapOption from 'assets/js/chartOption/mapOption'
import geoJson from 'assets/js/chartOption/geo.json'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const STYLE = Common.Const.style
const URL = Common.Const.url
const AXIOS = FUNC.axios
const GET = AXIOS.get
import defaultPng from 'assets/images/index/default_porject_bg.png'
import smRTopPngHome from 'assets/images/index/16.png'
import smRTopPngClient from 'assets/images/index/15.png'
import smRTopPngIndus from 'assets/images/index/14.png'
import smRTopPngAlarm from 'assets/images/index/13.png'
import AlarmLevel1PngSrc from 'assets/images/index/12.png'
import AlarmLevel2PngSrc from 'assets/images/index/11.png'
import AlarmLevel3PngSrc from 'assets/images/index/10.png'
export default {
  data() {
    return {
      timeIdResize: null,
      disTitSty: {
        backgroundImage: `url(${disPng})`
      },
      indTitSty: {
        backgroundImage: `url(${indPng})`
      },
      equTitSty: {
        backgroundImage: `url(${equPng})`
      },
      alaTitSty: {
        backgroundImage: `url(${alaPng})`
      },
      newTitSty: {
        backgroundImage: `url(${newPng})`
      },
      miaTitSty: {
        backgroundImage: `url(${miaPng})`
      },
      /*bm1sty: {
        backgroundImage: `url(${proPng})`
      },
      bm2sty: {
        backgroundImage: `url(${cliPng})`
      },*/
      cliPng,
      /*bm3sty: {
        backgroundImage: `url(${equiPng})`
      },*/
      equiPng,
      /*bm4sty: {
        backgroundImage: `url(${worPng})`
      },*/
      worPng,
      bgSty: {
        backgroundImage: `url(${bgJpg})`
      },
      indexSty: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      },
      AlarmLevel1PngSrc,
      AlarmLevel2PngSrc,
      AlarmLevel3PngSrc,
      smRTopSty1: {
        background: `rgba(31, 45, 61, .5) url(${smRTopPngHome}) 17px 8px no-repeat`
      },
      smRTopSty2: {
        background: `rgba(31, 45, 61, .5) url(${smRTopPngClient}) 17px 8px no-repeat`
      },
      smRTopSty3: {
        background: `rgba(31, 45, 61, .5) url(${smRTopPngIndus}) 17px 8px no-repeat`
      },
      smRTopSty4: {
        background: `rgba(31, 45, 61, .5) url(${smRTopPngAlarm}) 17px 8px no-repeat`
      },
      scrollId: null,
      scrollAnimate: false,
      isScroll: false,

      ProjectTotal: 0, //项目总数
      ProjectAlarm: 0, //告警项目数
      ProjectThisMonth: 0, //本月新增项目数
      TernantTotal: 0, //客户总数
      AccountNum: 0, //用户数
      TernantThisMonth: 0, //本月新增客户数
      loadingCount: true,

      alartProject: [],
      loadingYCat: true,
      loadingALine: true,
      loadingEqui: true,
      loadingNew: true,
      loadingMiant: true,
      loadingIndus: true,
      // equiData: [],
      Total: 0,
      Alarm: 0,
      Closed: 0,
      Opening: 0,
      orderTotal: 0,
      Unexcute: 0,
      indusData: [],
      loadingIndustryOpts: true,
      IndustryOpts: [],
      loading: true,
      PageIndex: '',
      PageSize: '',
      IndustryId: '',
      EntitySort: null,
      industryUrl: URL.INDUSTRY, //查询所属行业列表(下拉框)
      countUrl: URL.QUERYAPPPLATFORMINDEX, //统计客户数量及项目数
      equiUrl: URL.HOMEEQUIPMENTCOUNTBYTYPE, //统计客户数量
      indusUrl: URL.QUERYHOMEPROJECTINDUSTRY, //统计客户数量


      alarmTextStyle: STYLE.alarmLevelText,
    }
  },
  computed: {},
  methods: {
    ...mapMutations({
      uPDATE_SHOWWHICHTAB: 'UPDATE_SHOWWHICHTAB'
    }),
    //写这个函数的原因是,如果直接设置高度为100%,会导致echarts无法正确渲染,必须明确设置高度值方正常
    resetIndexWH() {
      let vm = this
      let el = vm.$refs.indexContent
      // vm.indexSty.height = `${document.documentElement.clientHeight-40}px`
      vm.indexSty.height = `${document.documentElement.clientHeight}px`
      // console.log(vm.indexSty.height)
    },
    queryPushWarn(ProjectId) {
      let vm = this
      vm.uPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
      let path = `${this.EntitySort == 2 ? 'sm_' : ''}warning_lists`
      // this.$router.push({ path: `item_detail/${ProjectId}`, query: { warn: 1 } })
      // let pathName = this.EntitySort == 2 ? 'project_list' : 'wb_items_manage'
      FUNC.tntool.setTnAuth(path)
      this.$router.push({
        path: path,
        query: {
          ProjectId,
          fromMap: true
        }
      })
      // console.log(item)

      //   vm.$router.push({
      //     name: 'sm_project_detail',
      //     params: {
      //       ProjectId: ProjectId,
      //       isFromMap: true
      //     }
      //   })
    },
    goTo(routerPath, routerParams) {
      // console.log(routerParams)
      let vm = this
      if (routerPath == 'project_list') {
        routerPath = (vm.EntitySort == 2 ? routerPath : 'wb_items_manage')
      }
      if (routerPath == 'sm_equipmet_lists') {
        if (vm.EntitySort != 2) {
          routerPath = 'equipments_manage'
          vm.uPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
          FUNC.tntool.setTnAuth(routerPath)
          vm.$router.push({ path: `${routerPath}/0`, query: routerParams })
          return
        }
      }
      vm.uPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
      FUNC.tntool.setTnAuth(routerPath)
      vm.$router.push({ path: routerPath, query: routerParams })
    },
    /*goTo(routerName, routerParams) {
      // console.log(routerParams)
      if (routerName == 'items_manage') {
        routerName = (this.EntitySort == 2 ? `sm_project_list` : `wb_${routerName}`)
      }
      if (routerName == 'equipmet_lists') {
        if (this.EntitySort == 2) {
          routerName = 'sm_equipmet_lists'
        } else {
          routerName = 'wb_equipments_manage'
          if (routerParams) {
            routerParams.type = 0
          } else {
            routerParams = { type: 0 }
          }
        }
      }
      this.uPDATE_SHOWWHICHTAB({ showWhichTab: 1 })
      this.setActiveMenu(filePath)
      this.$router.push({ name: routerName, params: routerParams })
    },*/
    getEntitySort() {
      this.EntitySort = FUNC.storage.get("EntitySort")
      // console.log(this.EntitySort)
    },
    //加载表格数据
    getAllPeoject(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      IndustryId = this.IndustryId) {
      let vm = this
      vm.loading = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          "IndustryId": IndustryId,
        }
      }
      let url = URL.QUERYHOMEMAPPROJECTS
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data.Result
            let bmapData = vm.convertData(dataArr)
            // console.log(bmapData)
            // option.series[0].data = bmapData.normal
            // option.series[1].data = bmapData.alarm1
            // option.series[2].data = bmapData.alarm2
            // option.series[3].data = bmapData.alarm3
            mapOption.series[0].data = bmapData.normal
            mapOption.series[1].data = bmapData.alarm1
            mapOption.series[2].data = bmapData.alarm2
            mapOption.series[3].data = bmapData.alarm3
            // vm.TotalAlarm = bmapData.alarm1.length + bmapData.alarm2.length + bmapData.alarm3.length
            vm.alartProject = [...bmapData.alarm3, ...bmapData.alarm2, ...bmapData.alarm1]
            ringOption.series[0].data = [{
                value: bmapData.alarm3.length,
                name: '报警'
              },
              {
                value: bmapData.alarm2.length,
                name: '告警'
              },
              {
                value: bmapData.alarm1.length,
                name: '提醒'
              }
            ]
            ringOption.title[0].text = vm.alartProject.length + ''
            let el = vm.$refs.ringChart
            let myChart = echarts.init(el)
            myChart.setOption(ringOption);
            myChart.resize()
            // console.log(vm.alartProject)
            /*vm.scrollId = setTimeout(function() {
              let el = vm.$refs.scrollCon
              el.style.top = '0px' //初始化滚动内容的top值,不然会第一次设置会导致跳动,不好看\
              vm.judgeScroll()
            })*/
            //之所以要延迟1秒初始化地图,是因为如果不设置延迟,按F5以后,画布只会刷新出少量100px高的区域散点
            //反复去除不同参数以后仍无法解决该问题,可能是由于echarts+百度地图组件缺陷导致的
            //如果有条件,以后可以尝试换高德地图试试
            vm.initMap()
            /*let initMapSto = setTimeout(function() {
              vm.initMap()
              clearTimeout(initMapSto)
            }, 1000)*/
            vm.loading = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //统计用户数量
    countClient() {
      let vm = this
      vm.loadingCount = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "IndustryId": vm.IndustryId,
      }
      let url = vm.countUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.ProjectTotal = data.ProjectTotal //项目总数
            vm.ProjectAlarm = data.ProjectAlarm //告警项目数
            // vm.ProjectThisMonth = data.ProjectThisMonth //本月新增项目数
            vm.TernantTotal = data.TernantTotal //客户总数
            vm.AccountNum = data.AccountNum //用户数
            // vm.TernantThisMonth = data.TernantThisMonth //本月新增客户数
            vm.loadingCount = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    countOrder() {
      let vm = this
      vm.loadingCount = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = URL.STATISTICWORKORDER
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            // console.log(data)
            vm.orderTotal = data.Total //工单总数
            vm.Unexcute = data.Unexcute //未处理工单总数
            vm.loadingCount = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //按种类统计设备数量
    StatisEquipment() {
      let vm = this
      vm.loadingIndus = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = URL.STATISTICSEQUIPMENTSTATE
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.Total = data.Total
            vm.Alarm = data.Alarm
            vm.Closed = data.Closed
            vm.Opening = data.Opening
            vm.loadingIndus = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setYCat() {
      let vm = this
      vm.loadingYCat = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = URL.STATISTICSREGION
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            let el = vm.$refs.yCategory
            let myChart = echarts.init(el)
            let [IndustryNameArr, ProjectNumArr, EquipmentNumArr] = [
              [],
              [],
              []
            ]
            for (let item of data) {
              IndustryNameArr.push(item.IndustryName)
              ProjectNumArr.push(item.ProjectNum)
              EquipmentNumArr.push(item.EquipmentNum)
            }
            yCatOption.yAxis.data = IndustryNameArr
            yCatOption.series[0].data = ProjectNumArr
            yCatOption.series[1].data = EquipmentNumArr
            myChart.setOption(yCatOption);
            myChart.resize()
            vm.loadingYCat = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //设置折线图
    setALine() {
      let vm = this
      vm.loadingALine = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = URL.STATISTICSINDUSTRY
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            // console.log(data)
            let el = vm.$refs.aLine
            let myChart = echarts.init(el)
            let [IndustryNameArr, ProjectNumArr, EquipmentNumArr] = [
              [],
              [],
              []
            ]
            for (let item of data) {
              IndustryNameArr.push(item.IndustryName)
              ProjectNumArr.push(item.ProjectNum)
              EquipmentNumArr.push(item.EquipmentNum)
            }
            aLineOption.xAxis.data = IndustryNameArr
            aLineOption.series[0].data = ProjectNumArr
            aLineOption.series[1].data = EquipmentNumArr
            myChart.setOption(aLineOption);
            myChart.resize()
            vm.loadingALine = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //设置柱形图
    setBar() {
      let vm = this
      vm.loadingEqui = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "IndustryId": vm.IndustryId,
      }
      let url = vm.equiUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let el = vm.$refs.barChart
            let myChart = echarts.init(el)
            let labelArr = []
            let dataArr = []
            // vm.equiData = []
            let data = res.Data.Result
            for (let item of data) {
              labelArr.push(item.TypeName)
              dataArr.push(item.Number)
              /*vm.equiData.push({
                TypeName: item.TypeName,
                Number: item.Number
              })*/
            }
            // console.log(labelArr,dataArr)
            barOption.xAxis.data = labelArr
            barOption.series[0].data = dataArr
            myChart.setOption(barOption);
            myChart.resize();
            vm.loadingEqui = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //设置折线图
    setDYLine() {
      let vm = this
      vm.loadingNew = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = URL.STATISTICSNEWLYADD
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            // console.log(data)
            let el = vm.$refs.dYLIne
            let myChart = echarts.init(el)
            let [DateArr, ProjectNumArr, CustomerNumArr] = [
              [],
              [],
              []
            ]
            for (let index in data) {
              DateArr.push(index)
              ProjectNumArr.push(data[index].ProjectNum)
              CustomerNumArr.push(data[index].CustomerNum)
            }
            dYLIneOption.xAxis[0].data = DateArr.reverse()
            dYLIneOption.series[0].data = ProjectNumArr.reverse()
            dYLIneOption.series[1].data = CustomerNumArr.reverse()
            myChart.setOption(dYLIneOption);
            myChart.resize()
            vm.loadingNew = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //设置折线图2
    setDYLine2() {
      let vm = this
      vm.loadingMiant = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = URL.STATISTICSMIANTPLAN
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            // console.log(data)
            let el = vm.$refs.dYLIne2
            let myChart = echarts.init(el)
            let [TimeArr, UnStartArr, ExecutingArr, FinishArr, ChancelArr, TotalArr] = [
              [],
              [],
              [],
              [],
              [],
              []
            ]
            for (let item of data) {
              // console.log(item.UnStart)
              TimeArr.push(item.Time)
              UnStartArr.push(item.UnStart)
              ExecutingArr.push(item.Executing)
              FinishArr.push(item.Finish)
              ChancelArr.push(item.Chancel)
              TotalArr.push(item.Total)
            }
            dYLIneOption2.xAxis[0].data = TimeArr
            dYLIneOption2.series[0].data = TotalArr
            dYLIneOption2.series[1].data = UnStartArr
            dYLIneOption2.series[2].data = ExecutingArr
            dYLIneOption2.series[3].data = FinishArr
            dYLIneOption2.series[4].data = ChancelArr
            myChart.setOption(dYLIneOption2);
            myChart.resize()
            vm.loadingMiant = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //把获取回来的生数据转换为地图上的散点
    convertData(dataRaw) {
      let res = {
        normal: [], //存放正常项目的
        alarm1: [], //存放提醒项目的
        alarm2: [], //存放警告项目的
        alarm3: [], //存放报警项目的
      };
      for (let item of dataRaw) {
        let obj = {
          'name': item.ProjectName,
          'value': [
            item.Longitude, item.Latitude, //0,1
            item.ProjectLeaderName || '', //2
            item.CompanyFullName || '', //3
            item.ProjectAddress || '', //4
            item.ProjectLogo || defaultPng, //5
            item.CoverPhoto, //6
            item.ProjectName, //7
            item.ProjectId, //8
            item.AlarmLevel, //9
          ],
        }
        switch (item.AlarmLevel) {
          case 1:
            res.alarm1.push(obj)
            break;
          case 2:
            res.alarm2.push(obj)
            break;
          case 3:
            res.alarm3.push(obj)
            break;
          default:
            res.normal.push(obj)
            break;
        }
      }
      // console.log(res)
      return res;
    },
    initMap() {
      let vm = this
      let el = document.querySelector('#index')
      let myChart = echarts.init(el)
      // myChart.setOption(option);
      echarts.registerMap('zhongguo', geoJson);
      // myChart.hideLoading();
      myChart.setOption(mapOption);
      myChart.resize()
      myChart.on('click', function(item) {
        // vm.$router.push({ path: `item_detail/${item.data.value[8]}`, query: { warn: 1 } })
        vm.uPDATE_SHOWWHICHTAB({ showWhichTab: 4 })
        let routerPath = 'project_list'
        routerPath = (vm.EntitySort == 2 ? routerPath : 'wb_items_manage')
        FUNC.tntool.setTnAuth(routerPath)
        vm.$router.push({
          name: 'sm_project_detail',
          params: {
            ProjectId: item.data.value[8],
            isFromMap: true
          }
        })
        // vm.$router.push({ path: `item_detail/${item.data.value[8]}` })
        // console.dir(item.data.value[8]); //ProjectIds
      });
    },
    search() {
      let vm = this
      vm.diff()
      vm.getAllPeoject()
    },
    diff() {
      let vm = this
      if (vm.EntitySort == 2) {
        vm.setDYLine()
      } else {
        vm.setDYLine2()
      }
    },
    handleScroll() {
      // console.log('msg')
    },
    cancelScroll() {
      clearInterval(this.scrollId)
    },
    startScroll() {
      if (this.isScroll) {
        this.scroll()
      }
    },
    judgeScroll() {
      let vm = this
      let scrollCon = vm.$refs.scrollCon

      let outWrap = vm.$refs.alarmProjectOutWrap
      let outWrapHeight = outWrap.clientHeight
      let tid = setTimeout(function() {
        let bool = outWrap.clientHeight - 30 < vm.alartProject.length * 25
        // console.log(bool)
        if (bool) {
          vm.isScroll = true
          vm.scroll()
          return true
        } else {
          clearInterval(vm.scrollId)
          vm.isScroll = false
          let el = vm.$refs.scrollCon
          el.style.top = '0px'
          return false
        }
        clearTimeout(tid)
      }, 1000)
    },
    scroll() {
      let vm = this
      clearInterval(vm.scrollId)
      vm.scrollId = setInterval(function() {
        let scrollCon = vm.$refs.scrollCon
        if (!scrollCon) clearInterval(vm.scrollId)
        // scrollCon.style.height = `${outWrapHeight-30}px`
        // console.log(scrollCon.clientHeight)
        //if(scrollCon){
        let top = scrollCon.style.top
        top = parseInt(top)
        // console.log(top)
        if (top == (-vm.alartProject.length * 25)) {
          vm.scrollAnimate = false;
          scrollCon.style.top = '0px'
        } else {
          top -= 25
          vm.scrollAnimate = true;
          scrollCon.style.top = `${top}px`
        }
        //}

        // console.log(top)
      }, 2000)
    },
    /*getWH() {
      console.log((window.innerHeight - 80) / 2 - 7.5 - 47)
    },*/
    resizeFun() {
      let vm = this
      clearTimeout(vm.timeIdResize)
      // this.judgeScroll()
      // this.resetIndexWH()
      // this.initMap()
      vm.timeIdResize = setTimeout(function() {
        vm.setYCat()
        vm.setALine()
        vm.setBar()
        vm.getAllPeoject()
        vm.diff()
        vm.initMap()
      }, 300)
    },
  },
  mounted() {
    let vm = this;
    vm.getEntitySort()
    vm.StatisEquipment()
    vm.countClient()
    if (vm.EntitySort != 2) vm.countOrder()
    vm.$nextTick(function() {
      // vm.resetIndexWH()
      setTimeout(function() {
        vm.getAllPeoject()
        vm.setYCat()
        vm.setALine()
        vm.setBar()
        vm.diff()
      }, 1000)
    })
    window.addEventListener('resize', vm.resizeFun)
  },
  destroyed() {
    let vm = this
    clearInterval(vm.scrollId)
    window.removeEventListener('resize', vm.resizeFun)
  }
}

</script>

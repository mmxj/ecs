<style scoped lang='less'>
.detailWrap {
  /*min-width: 760px;*/
  width: 100%;
  overflow: hidden;
}

.leftDetail {
  border-right: 2px solid #D1E5E3;
  padding-top: 15px;
  padding-right: 20px;
  // max-width: 770px;
  overflow: hidden;
  /*margin-right: 370px;*/
}

.rightDetail {
  border-left: 2px solid #D1E5E3;
  margin-left: -2px;
  width: 375px;
  float: right;
}

.detailContent {
  color: #1ABC9C;
  margin-right: 50px;
  font-weight: bold;
}

.leftDetailTop {
  width: 100%;
  line-height: 35px;
  min-height: 35px;
  overflow: hidden;
}

.emptyWrap {
  display: flex;
  /*height: 40vh;*/
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

 /*.emptyContent{border: 1px solid #000;}*/
.emptyImg {
  background: url('../../../../../../../../static/images/detail/equi_offline.png') 0 0 no-repeat;
  width: 270px;
  height: 210px;
  background-size: cover;
}

.emptyImg2 {
  background-image: url(../../../../../../../../static/images/detail/equi_unLinked.png);
  width: 350px
}

.emptyImg3 {
  background-image: url(../../../../../../../../static/images/detail/noSetting.png);
  width: 350px
}

.emptyText {
  text-align: center;
  font-weight: bold;
  font-size: 18px;
  margin-top: 25px;
  color: #1ABC9C
}
.chartWrap{
  float: left;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
</style>
<template>
  <div class='detailWrap'>
    <!--<div class="rightDetail">
        <allconfig :propsData='allCfgData'></allconfig>
    </div>    -->
    <div class="leftDetail" v-loading='loadingChart'>
      <div>
        <el-row class='leftDetailTop'>
          <el-col :span="16" :offset="4">
            <p class="fl">
              <span class="detailLabel">数据时间：</span>
              <span class="detailContent">{{UploadOn}}</span>
            </p>
            <p class="fl">
              <span class="detailLabel">运行时长：</span>
              <span class="detailContent">{{RunTime}}</span>
            </p>
          </el-col>
          <el-col :span="4">
            <el-button class='fa fa-cog fr' @click='goSetting' v-show='isShowDebugBtnByRole'>&nbsp;设置</el-button>
          </el-col>
        </el-row>
      </div>
      <div class="emptyWrap" v-if='propsData.GatewayId==""||propsData.GatewayId=="000000000000"'>
        <div class="emptyContent">
          <div class="emptyImg emptyImg2">&nbsp;</div>
          <div class="emptyText">设备未接入平台，没有监测数据</div>
        </div>
      </div>
      <div class="emptyWrap" v-else-if='propsData.IsOnline!=1'>
        <div class="emptyContent">
          <div class="emptyImg">&nbsp;</div>
          <div class="emptyText">设备离线，没有最新数据</div>
        </div>
      </div>
      <div v-else>
        <div class="emptyWrap" v-if='realTimeData.length==0'>
        <!-- <div class="emptyWrap" v-if='true'> -->
          <div class="emptyContent">
            <div class="emptyImg emptyImg3">&nbsp;</div>
            <div class="emptyText">未设置重点数据来源</div>
          </div>
        </div>
        <div class="chartWrap" v-for='(item,index) in realTimeData' :ref='"chartWidth"+index' v-else>
          <chart :propsData='item'></chart>
        </div>
        <!-- <el-row>
          <el-col :span="chartspan" v-for='(item,index) in realTimeData' :ref='"chartWidth"+index'>
            <chart :propsData='item'></chart>
          </el-col>
        </el-row> -->
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
let tid = ''
import chart from 'components/common/equipment_data_chart';
import allconfig from 'components/page/owner/items/equipments_allConfig';
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const URL = Common.Const.url
Date.prototype.format = FUNC.date.format
export default {
  data: function() {
    return {
      isShowDebugBtnByRole: null,
      allCfgData:{

      },
      timeId: null,
      UploadOn:'',
      RunTime:'',
      realTimeData:[],
      chartspan:24,
      loadingChart:true,
      configdataUrl: URL.EQUIPMENTCONFIGDATA,
      realtimeUrl: URL.RUNNING,
    }
  },
  computed: {
    timeToStr() {
      return this.time.format("yyyy-MM-dd hh:mm:ss")
    },
  },
  props: ['propsData'],
  components: {
    chart,
    allconfig,
    ...mapGetters([
      'detail_equi'
    ])
  },
  watch:{
    detail_equi(){
      this.getRealTimeData(this.detail_equi.EquipmentId)
    },
    propsData(){
      this.initData()
    }
  },  
  methods: {
    getRealTimeData(EquipmentId){
      if (!EquipmentId) return false
      let vm = this
      // vm.loadingChart = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
            'EquipmentId':EquipmentId
        },
      }
      // console.log(params)
      let url = this.realtimeUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.allCfgData = res.Data.GroupData
            if (res.Data.length!=0) {
                // console.log(vm.allCfgData)
                let Data = res.Data
                // console.log(Data.SubData)
                vm.UploadOn = Data.UploadOn
                vm.RunTime = Data.RunTime
                vm.realTimeData = Data.SubData
                if (Data.SubData) {
                    vm.chartspan = 8
                }
                clearTimeout(tid)
                tid = setTimeout(function () {
                  vm.initData();
                }, 6000)
            }else{
              vm.UploadOn = '无数据'
              vm.RunTime = '无数据'
            }
            vm.loadingChart = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    ...mapActions({
            changeTab: 'changetab_detail',
            setDetail: 'setdetail_equi',
            stopRenderChart: 'render_chart'
        }
    ),
    goSetting(){
        // console.log(this.propsData)
        this.stopRenderChart(false)
        this.changeTab(2)
        this.setDetail(this.propsData)
    },
    initData() {
      let vm = this
      vm.getRealTimeData(this.propsData.EquipmentId)
      let isEx = vm.propsData.IsExperienceEquipment
      let isSelf = vm.propsData.IsSelfProject
      vm.isShowDebugBtnByRole = FUNC.operator.operateRoleFilter(isEx,isSelf)      
    },

    showDataBox: function(index) {
      var _this = this;
      this.initIndex = index;
    }
  },
  updated: function() {
    this.getRealTimeData()
  },
  mounted: function() {
    let vm = this
    this.initData()

  },
  beforeDestroy: function() {
    var _this = this;
    clearTimeout(tid)
  }
}

</script>

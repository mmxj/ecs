<template>
  <!--ele_statistics-->
  <div class="ele_statistics clearfloat">
    <div v-for="(item,index) in propsData.previewDatas" class="block_content pull-left">
      <div class="ele_statistics_wrap">
        <div class="img_wrap">
          <img :src="item.icon" />
        </div>
        <div class="ele_statistics_right_infos">
          <div class="typeTitle mb-5">
            {{item.title}}
          </div>
          <div class="typeValue mb-5">
            {{item.value}}
          </div>
          <div v-if="item.title!='累计用电量'" :title="item.time" class="typeValueTime">
            时间：{{item.time}}
          </div>
          <div v-if="item.title=='累计用电量'" style="text-align: right;" :title="item.time" class="typeValueTime">
            时间：{{item.time}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ProjectId: '',
        AccessToken: eosCommon.storage.get("AccessToken"),
        statisticData: []
      }
    },
    props: ['propsData', 'otherParams'],
    watch: {
      'otherParams.isFinishSaved' (val, oldval) {
        let vm = this;
        if(val) {
          if(vm.otherParams.currEleSetting == 'ele_statistics') {
            vm.getStatisticsPreDatas();
          }
        }
      }
    },
    mounted() {
      let vm = this;
      vm.ProjectId = vm.propsData.ProjectId;
      let confState = vm.otherParams.GetEnergyConfigState;
      if(confState.length > 0) {
        for(let val of confState) {
          if(val.Type == 1) {
            vm.getStatisticsPreDatas();
          } else {
            vm.setDefaultData();
          }
        }
      } else {
        vm.setDefaultData();
      }
    },
    methods: {
      formatCurrentTime(timeType, isCharacter) {
        var vm = this;
        var timeStamps = new Date(new Date().getTime());
        if(timeType == '年') {
          if(isCharacter) {
            return timeStamps.getFullYear() + '年';
          }
          return timeStamps.getFullYear();
        } else if(timeType == '月') {
          return timeStamps.getFullYear() + '-' + (timeStamps.getMonth() + 1);
        } else if(timeType == '日') {
          return timeStamps.getFullYear() + '-' + (timeStamps.getMonth() + 1) + "-" + timeStamps.getDate();
        }
      },
      setDefaultData() {
        let vm = this;
        let days = vm.formatCurrentTime('日', false);
        let years = vm.formatCurrentTime('年', false);
        for(let val of vm.propsData.previewDatas) {
          if(val.title == '日用电量') {
            val.time = days;
          } else if(val.title == '月用电量') {
            val.time = vm.formatCurrentTime('月', false);
          } else if(val.title == '年用电量') {
            val.time = years;
          } else if(val.title == '累计用电量') {
            val.time = `${years}-1-1至${days}`;
          }
        }
      },
      getStatisticsPreDatas() {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "ProjectId": vm.ProjectId,
        };
        let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/GetElectricEnergyStatistic";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            let rs = result.Data;
            for(let val of vm.propsData.previewDatas) {
              if(val.title == '日用电量') {
                val.value = `${rs.DayTotal}kWh`;
                val.time = rs.DayTime;
              } else if(val.title == '月用电量') {
                val.value = `${rs.MonthTotal}kWh`;
                val.time = rs.MonthTime;
              } else if(val.title == '年用电量') {
                val.value = `${rs.YearTotal}kWh`;
                val.time = rs.YearTime;
              } else if(val.title == '累计用电量') {
                val.value = `${rs.Total}kWh`;
                val.time = `${rs.OriginTime}至${rs.DayTime}`;
              }
            }
            vm.otherParams.currEleSetting = '';
          }
        });
      }
    }
  }
</script>
<style lang="less" scoped="scoped">
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }
  
  .block_content {
    width: 25%;
    height: 110px;
    border-right: 1px solid #D1E3E2;
    .ele_statistics_wrap {
      position: relative;
      width: 200px;
      height: 110px;
      margin: 0 auto;
      .img_wrap {
        height: 100%;
        padding: 15px 0;
        width: 80px;
      }
      .ele_statistics_right_infos {
        height: 110px;
        position: absolute;
        left: 95px;
        top: 0;
        padding: 15px 0;
        .typeTitle {
          font-size: 14px;
          color: #1F2D3D;
        }
        .typeValue {
          font-size: 22px;
          color: #1F2D3D;
          font-weight: bolder;
        }
        .typeValueTime {
          font-size: 12px;
          width: 120px;
          color: #8492A6;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: wrap;
        }
      }
    }
  }
</style>
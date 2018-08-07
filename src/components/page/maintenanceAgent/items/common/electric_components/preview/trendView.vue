<template>
  <!--ele_statistics-->
  <div class="ele_trend" style="padding: 0;">
    <div id="trendContainer" style="width: 100%; height: 224px; margin: 0 auto"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ProjectId: '',
        AccessToken: eosCommon.storage.get("AccessToken"),
        xAxiData: [],
        yAxiData: [],
        nowMonthDate: '2018-4'
      }
    },
    props: ['propsData', 'otherParams'],
    watch: {
      'otherParams.isFinishSaved' (val, oldval) {
        let vm = this;
        if(val) {
          if(vm.otherParams.currEleSetting == 'ele_trend') {
            vm.getEnergyMonthStatistic();
            vm.otherParams.currEleSetting = '';
          }
        }
      }

    },
    computed: {

    },
    mounted() {
      let vm = this;
      vm.nowMonthDate = vm.formatCurrentTime('月', false);
      vm.ProjectId = vm.propsData.previewDatas.ProjectId;
      let confState = vm.otherParams.GetEnergyConfigState;
      if(confState.length > 0) {
        let val = confState.filter((cVal) => {
          return cVal.Type == 5;
        });
        if(val.length) {
          vm.getEnergyMonthStatistic();
        } else {
          vm.setDefaultData();
        }
      } else {
        vm.setDefaultData();
      }

    },
    methods: {
      formatCurrentTime(timeType, isCharacter) {
        var vm = this;
        //vm.nowTime
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
        for(let i = 0; i < 30; i += 3) {
          vm.xAxiData.push(`${i}日`);
          vm.yAxiData.push(0);
        }
        vm.initChart();
      },
      getEnergyMonthStatistic() {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "ProjectId": vm.ProjectId,
        };
        let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/GetEnergyMonthStatistic";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            let dataList = result.Data;
            vm.xAxiData = [];
            vm.yAxiData = [];
            if(result.Data.length == 0) {
              console.log('暂无数据：');
              //vm.xAxiData=vm.xAxi.dayX;
            } else {
              for(let i = 0; i < dataList.length; i++) {
                vm.xAxiData.push(dataList[i].Time);
                vm.yAxiData.push(dataList[i].Value);
              }
            }
            vm.initChart();
          }
        });
      },
      initChart() {
        let vm = this;
        var chart = {
          type: 'spline',
          margin: [45, 30, 45, 50],
        };
        var title = {
          text: ''
        };
        var subtitle = {
          text: ''
        };
        var xAxis = {
          categories: vm.xAxiData,
          labels: {
            style: {
              color: '#8492A6',
              fontSize: 10
            }
          }
        };
        var yAxis = {
          title: {
            align: 'high',
            offset: 0,
            text: '用电量 (kWh)',
            rotation: 0,
            y: -15,
            x: 32,
            style: {
              color: '#1F2D3D',
              fontSize: 10
            }
          },
          lineWidth: 1,
          lineColor: '#8492A6',
          tickColor: '#8492A6',
          tickAmount: 5,
          gridLineDashStyle: 'longdash',
          gridLineColor: '#8492A6',
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'}]
        };
        var tooltip = {
          valueSuffix: ' kWh'
        }
        var legend = {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top',
          borderWidth: 0
        };
        var series = [{
            name: vm.nowMonthDate,
            marker: {
              fillColor: '#FFFFFF',
              lineWidth: 1,
              lineColor: null
            },
            data: vm.yAxiData}];
        var credits = {
          enabled: false
        };
        var json = {};
        json.chart = chart;
        json.title = title;
        json.subtitle = subtitle;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.tooltip = tooltip;
        json.legend = legend;
        json.series = series;
        json.credits = credits;
        $('#trendContainer').highcharts(json);
      }
    }
  }
</script>

<style lang="less" scoped="scoped">

</style>
<template>
  <!--ele_statistics-->
  <div class="ele_ringRatio">
    <div id="ringRatioContainer" style="width: 100%; height: 224px; margin: 0 auto"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ProjectId: '',
        AccessToken: eosCommon.storage.get("AccessToken"),
        xAxiData: [],
        CurrentValue: [],
        LastValue: [],
        year: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
      }
    },
    props: ['propsData', 'otherParams'],
    watch: {
      'otherParams.isFinishSaved' (val, oldval) {
        let vm = this;
        if(val) {
          if(vm.otherParams.currEleSetting == 'ele_ringRatio') {
            vm.getEnergyYearStatistic();
            vm.otherParams.currEleSetting = '';
          }
        }
      }
    },
    mounted() {
      let vm = this;
      vm.ProjectId = vm.propsData.previewDatas.ProjectId;
      let confState = vm.otherParams.GetEnergyConfigState;
      if(confState.length > 0) {
        let val = confState.filter((cVal) => {
          return cVal.Type == 6;
        });
        if(val.length) {
          vm.getEnergyYearStatistic();
        } else {
          vm.setDefaultData();
        }
      } else {
        vm.setDefaultData();
      }
    },
    methods: {
      setDefaultData() {
        let vm = this;
        vm.xAxiData = vm.year;
        for(let i = 0; i < 12; i++) {
          vm.CurrentValue.push(0);
          vm.LastValue = [0];
        }
        vm.initChart();
      },
      getEnergyYearStatistic() {
        let vm = this;
        let param = {
          "AccessToken": vm.AccessToken,
          "ProjectId": vm.ProjectId,
        };
        let url = eosCommon.ENTERPRISE_API + "api/EnergyManage/GetEnergyYearStatistic";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            let dataList = result.Data;
            vm.xAxiData = [];
            vm.CurrentValue = [];
            vm.LastValue = [];
            if(result.Data.length == 0) {
              console.log('暂无数据：');
            } else {
              for(let i = 0; i < dataList.length; i++) {
                vm.xAxiData.push(dataList[i].Month);
                vm.CurrentValue.push(dataList[i].CurrentValue);
                vm.LastValue.push(dataList[i].LastValue);
              }
            }
            vm.initChart();
          }
        });
      },
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
          vm.currentTime = timeStamps.getFullYear() + '-' + (timeStamps.getMonth() + 1);
        } else if(timeType == '日') {
          return timeStamps.getFullYear() + '-' + (timeStamps.getMonth() + 1) + "-" + timeStamps.getDate();
        }
      },
      initChart() {
        let vm = this;
        let LastName = Number(vm.formatCurrentTime('年', false) - 1) + '年';
        let CurrentName = vm.formatCurrentTime('年', true);
        var chart = {
          type: 'column',
          margin: [45, 30, 45, 50]
        };
        var title = {
          text: ''
        };
        var subtitle = {
          text: ''
        };
        var xAxis = {
          categories: vm.xAxiData,
          crosshair: true,
          labels: {
            style: {
              color: '#8492A6',
              fontSize: 10
            }
          }
        };
        var yAxis = {
          min: 0,
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
          min: 0,
          gridLineDashStyle: 'longdash',
          gridLineColor: '#8492A6',
          plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
							}]
        };
        var tooltip = {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        };
        var plotOptions = {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        };
        var credits = {
          enabled: false
        };

        var series = [{
          name: LastName,
          color: '#F08519',
          data: vm.LastValue
						}, {
          name: CurrentName,
          color: '#3ECDEF',
          data: vm.CurrentValue
						}];
        var legend = {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'top',
          borderWidth: 0
        };
        var json = {};
        json.chart = chart;
        json.title = title;
        json.subtitle = subtitle;
        json.tooltip = tooltip;
        json.xAxis = xAxis;
        json.yAxis = yAxis;
        json.series = series;
        json.plotOptions = plotOptions;
        json.credits = credits;
        json.legend = legend;
        $('#ringRatioContainer').highcharts(json);
      }
    }
  }
</script>

<style lang="less" scoped="scoped">

</style>
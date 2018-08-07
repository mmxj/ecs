<template>
  <div :id="id" class="" style="width: 96%; height: 96%; margin:0 auto;margin-top: 5px;">
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    Chart,
    myChart
  } from 'assets/js/common/dragCommon.js';  //从通用拖拽组件中引入Chart myChart；
  export default {
    data() {
      return {
        id: '',
        ChartDatas: null,
        //曲线参数配置
        chartName: '',
        xAxis: null,
        //单个
        yAxis: [],
        yAxisJson: null,
        series: [],
        seriesJson: null,
        singleChartDataLists: [],
        timer: null,
        isLoaded: false,
        thatSeries: [],
        lastTime: 0
      }
    },
    props: ['propsData'],
    computed: {
      ...mapGetters([
				"get_chart_data",
				"get_chartCurr_data",
				"get_curr_setting"
			])
    },
    watch: {
      get_curr_setting(val, oldval) {
        let vm = this;
        vm.deleteCurrentPanel(val);
      },
      'propsData.yAxis.gridLineWidth' (val, oldval) {
        let vm = this;
        for(let i of Object.keys(vm.propsData.singleChartDataLists)) {
          if(!val) {
            vm.propsData.singleChartDataLists[i].yAxis.gridLineWidth = 0;
          } else {
            vm.propsData.singleChartDataLists[i].yAxis.gridLineWidth = 1;
          }
        }
      },
      'propsData.yAxis.gridLineColor' (val, oldval) {
        let vm = this;
        for(let i of Object.keys(vm.propsData.singleChartDataLists)) {
          vm.propsData.singleChartDataLists[i].yAxis.gridLineColor = val;
        }
      },
      'propsData.yAxis.visible' (val, oldval) {
        let vm = this;
        let leftYaxisSingleChartDataLists = vm.propsData.singleChartDataLists.filter((val) => {
          return val.yData.yAxis == 0
        });
        for(let i of Object.keys(leftYaxisSingleChartDataLists)) {
          leftYaxisSingleChartDataLists[i].yAxis.visible = val;
        }
      },
      'propsData.yAxis.lineColor' (val, oldval) {
        let vm = this;
        let leftYaxisSingleChartDataLists = vm.propsData.singleChartDataLists.filter((val) => {
          return val.yData.yAxis == 0
        });
        for(let i of Object.keys(leftYaxisSingleChartDataLists)) {
          leftYaxisSingleChartDataLists[i].yAxis.lineColor = val;
        }
      },
      //右侧Y轴
      'propsData.rightYAxis.visible' (val, oldval) {
        let vm = this;
        let rightYAxisSingleChartDataLists = vm.propsData.singleChartDataLists.filter((val) => {
          return val.yData.yAxis == 1
        });
        for(let i of Object.keys(rightYAxisSingleChartDataLists)) {
          rightYAxisSingleChartDataLists[i].yAxis.visible = val;
        }
      },
      'propsData.rightYAxis.lineColor' (val, oldval) {
        let vm = this;
        let rightYAxisSingleChartDataLists = vm.propsData.singleChartDataLists.filter((val) => {
          return val.yData.yAxis == 1
        });
        for(let i of Object.keys(rightYAxisSingleChartDataLists)) {
          rightYAxisSingleChartDataLists[i].yAxis.lineColor = val;
        }
      },
      'propsData': {
        handler(val, oldval) {
          let vm = this;
          vm.commonValAssign(val);
          vm.singgelValAssign(val);
          vm.$nextTick(() => {
            vm.myChart(val, val.singleChartDataLists);
          })
        },
        deep: true
      },
      get_chartCurr_data(val, oldval) {
        let vm = this;
        if(vm.isLoaded) {
          for(let i of Object.keys(val)) {
            if(vm.propsData.refs == val[i].Id) {
              let value = val[i].Value;
              for(let j of Object.keys(value)) {
                if(value[j].Time == '') {
                  continue;
                }
                for(let n of Object.keys(vm.singleChartDataLists)) {
                  if(value[j].Id == vm.singleChartDataLists[n].lineId) {
                    if(vm.lastTime == 0) {
                      let len = vm.singleChartDataLists[n].yData.data.length;
                      if(len == 0) {
                        continue;
                      }
                      let time = vm.singleChartDataLists[n].yData.data[len - 1].Time;
                      vm.lastTime = (new Date(time)).getTime();
                    }
                    for(let m of Object.keys(vm.thatSeries)) {
                      if(value[j].Id == vm.thatSeries[m].options.id) {
                        let x = (new Date(value[j].Time)).getTime();
                        let y = Number(value[j].Value);
                        if(vm.lastTime == x) { //如果时间一样，不进行加点
                          return;
                        }
                        vm.thatSeries[m].addPoint([x, y], true, true);
                        if(m == vm.thatSeries.length - 1) {
                          vm.lastTime = x;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    mounted() {
      let vm = this;
      vm.id = vm.propsData.containerID;
      vm.commonValAssign(vm.propsData);
      vm.singgelValAssign(vm.propsData)
      this.$nextTick(() => {
	  	let params=[
	      	'.com_' + vm.propsData.refs,
	      	vm.propsData.refs,
	      	`chart`,
	      	vm.propsData.containerID,
	      	null, 
	      	this.get_curr_setting
	  	]
        vm.instanceChart = new Chart(...params);
        vm.myChart(vm.propsData, vm.singleChartDataLists);
      });
    },
    methods: {
      deleteCurrentPanel(val) {
        let vm = this;
        let storageStr = eosCommon.storage.get('storageType');
        let storageArr = storageStr.split(',');
        let len = storageArr.length;
        for(let i = 0; i < len; i++) {
          if(this.propsData.refs == storageArr[i]) {
            storageArr.splice(i, 1)
          }
        }
        storageStr = storageArr.join(',');
        eosCommon.storage.set('storageType', storageStr);
        let params=[
        '.com_' + vm.propsData.refs,
	        vm.propsData.refs, 
	        `chart`, 
	        vm.propsData.containerID,
	        null,
	        val
        ]
        new Chart(...params);
      },
      singgelValAssign(pro) {
        let vm = this;
        vm.singleChartDataLists = pro.singleChartDataLists;
      },
      commonValAssign(pro) {
        let vm = this;
        vm.xAxis = vm.propsData.xAxis;
      },
      myChart(propsData, singleChartDataLists) {
        let vm = this,       
	        cxAxis = null,
	        cbackgroundColor = '',
	        cyAxis = [],
	        cseries = [];
     			clearInterval(vm.timer);
        cxAxis = propsData.xAxis;
        cbackgroundColor = propsData.backgroundColor;
        for(let key of Object.keys(singleChartDataLists)) {
          cyAxis.push(singleChartDataLists[key].yAxis);
          cseries.push(singleChartDataLists[key].yData);
        }
       	let json={},
    	vars=[
	        'chart',
	        'title',
	        'xAxis',
	        'yAxis',
	        'tooltip',
	        'plotOptions',
	        'legend',
	        'exporting',
	        'credits',
	        'series'
        ];       
        for(let val of vars){        	
        	if(val=='series'){
        		window[val]=[]        		
        		continue;
        	}
        	window[val]={}
        }       
       chart = {
          type: 'spline',
          animation: Highcharts.svg, // don't animate in IE < IE 10.
          events: {
            load: function() {
              vm.thatSeries = this.series;
              vm.isLoaded = true;
            }
          },
          backgroundColor: cbackgroundColor,
        };
        title = {
          text: '',
          align: 'left'
        };
        xAxis = cxAxis;
        yAxis = cyAxis;
        tooltip = {
          formatter: function() {
            return '<b>' + this.series.name + '</b><br/>' +
              Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
              Highcharts.numberFormat(this.y, 2);
          }
        };
        plotOptions = {
          area: {
            pointStart: 2018,
            marker: {
              enabled: true,
              symbol: 'circle',
              radius: 2,
              states: {
                hover: {
                  enabled: true
                }
              }
            }
          },
          series: {
            marker: {
              enabled: true
            }
          }
        };
        legend = {
          enabled: true,
          align: 'center',
          verticalAlign: 'top',
          itemStyle: {
            color: '#1F2D3D',
            fontWeight: 'bold',
            fontSize: '12'
          }

        };
       exporting = {
          enabled: false
        };
        credits = {
          enabled: false //不显示LOGO 
        }
        for(let j of Object.keys(cseries)) {
          series.push({
            id: cseries[j].id,
            name: cseries[j].name,
            yAxis: cseries[j].yAxis,
            color: cseries[j].color,
            data: (function() {
              let data = [];
              for(let l of Object.keys(cseries[j].data)) {
                data.push({
                  x: (new Date(cseries[j].data[l].Time)).getTime(),
                  y: Number(cseries[j].data[l].Value)
                });
              }
              return data;
            }())
          })
        }
		for(let val of vars){        	
        	json[val]=window[val]; 
       }
        Highcharts.setOptions({
          global: {
            useUTC: false
          }
        });
        $(function() {
          $('#' + vm.propsData.containerID).highcharts(json);
        });
      }
    }
  }
</script>
<style scoped="scoped">

</style>

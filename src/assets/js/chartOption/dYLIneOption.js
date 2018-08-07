export default {
  // backgroundColor: '#404a59',
  textStyle: {
    color: '#FEFEFE'
  },
  /*title: {
    text: '行业实时热度指数',
    show: false,
    textStyle: {
      fontWeight: 'normal',
      fontSize: 16,
      color: '#F1F1F3'
    },
    left: '6%'
  },*/
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      lineStyle: {
        color: '#57617B'
      }
    },
    confine: true
  },
  legend: {
    icon: 'rect',
    itemWidth: 14,
    itemHeight: 5,
    itemGap: 13,
    data: ['新增项目', '新增客户'],
    left: 'center',
    textStyle: {
      fontSize: 12,
      color: '#F1F1F3'
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: [{
    type: 'category',
    boundaryGap: false,
    axisLine: {
      lineStyle: {
        color: '#57617B'
      }
    },
    data: []
  }],
  yAxis: [{
    type: 'value',
    name: '新增项目',
    axisTick: {
      show: false
    },
    axisLine: {
      lineStyle: {
        color: '#57617B'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    },
    splitLine: {
      lineStyle: {
        color: '#57617B'
      }
    }
  }, {
    type: 'value',
    name: '新增客户',
    axisLine: {
      lineStyle: {
        color: '#57617B'
      }
    },
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    },
    splitLine: {
      show: false
    }
  }],
  series: [{
    name: '新增项目',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    lineStyle: {
      normal: {
        width: 2
      }
    },
    /*areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(219, 50, 51, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(219, 50, 51, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },*/
    itemStyle: {
      normal: {
        color: '#3ECDEF',
        // borderColor: 'rgba(219,50,51,0.2)',
        // borderWidth: 12
      }
    },
    data: []
  }, {
    name: '新增客户',
    type: 'line',
    smooth: true,
    symbol: 'circle',
    symbolSize: 5,
    showSymbol: false,
    yAxisIndex: 1,
    lineStyle: {
      normal: {
        width: 2
      }
    },
    /*areaStyle: {
      normal: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(0, 136, 212, 0.3)'
        }, {
          offset: 0.8,
          color: 'rgba(0, 136, 212, 0)'
        }], false),
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowBlur: 10
      }
    },*/
    itemStyle: {
      normal: {
        color: '#386FFF',
        // borderColor: 'rgba(0,136,212,0.2)',
        // borderWidth: 12
      }
    },
    data: []
  }, ]

}

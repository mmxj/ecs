export default {
  textStyle: {
    color: '#FEFEFE'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { // 坐标轴指示器，坐标轴触发有效
      type: 'line' // 默认为直线，可选为：'line' | 'shadow'
    },
    confine: true
  },
  grid: {
    top: '6%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  /*toolbox: {
      feature: {
          dataView: {
              show: true,
              readOnly: false
          },
          magicType: {
              show: true,
              type: ['line', 'bar']
          },
          restore: {
              show: true
          },
          saveAsImage: {
              show: true
          }
      }
  },*/
  /*legend: {
    data: ['今日来客人数', '今日就餐人数', '今日客单价'],
    textStyle: {
      fontSize: 12,
      color: '#F1F1F3'
    }
  },*/
  xAxis: [{
    type: 'category',
    data: [],
    axisLabel: {
      margin: 10,
      textStyle: {
        fontSize: 14
      }
    },
  }],
  yAxis: [{
      type: 'value',
      minInterval : 1,
      boundaryGap : [ 0, 0.1 ],
    }
    /*, {
        type: 'value',
        name: '价格',
        min: 0,
        max: 25,
        interval: 5,
        axisLabel: {
          formatter: '{value}元'
        }
      }*/
  ],
  series: [{
    name: '总数',
    type: 'line',
    data: [],
    itemStyle: {
      normal: {
        color: '#FFF000'
      }
    },
  }, {
    name: '未开始',
    type: 'bar',
    data: [],
    stack: '总数',
    label: {
      normal: {
        show: false,
        position: 'insideRight',
        color: '#FF9933'
      }
    },
    itemStyle: {
      normal: {
        color: '#E74C3C'
      }
    }
  }, {
    name: '进行中',
    type: 'bar',
    data: [],
    stack: '总数',
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      normal: {
        color: '#349BDB'
      }
    }
  }, {
    name: '已结束',
    type: 'bar',
    data: [],
    stack: '总数',
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      normal: {
        color: '#2ECC71'
      }
    }
  }, {
    name: '已取消',
    type: 'bar',
    stack: '总数',
    label: {
      normal: {
        show: false,
        position: 'insideRight'
      }
    },
    itemStyle: {
      normal: {
        color: '#8492A6'
      }
    },
    data: []
  }, ]

}

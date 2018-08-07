export default {
  /*title: {
    text: '产品五天销量'
  },*/

  grid: {
    top: '15px',
    left: '0',
    right: '15px',
    bottom: '20px',
    containLabel: true
  },
  xAxis: {
    // data: ['主机', '冷冻水泵', '冷却水泵', '冷却塔', '多联机', '风柜', '其他'],
    data: [],
    axisLabel: {
      color: '#FFF',
      // fontSize:11,
      rotate: -40,
    },
    axisLine: {
      lineStyle: {
        color: '#DCE1E5'
      }
    },
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
  },
  yAxis: {
    axisLabel: {
      color: '#FFF',
      fontSize: 12,
      nameGap: 1
    },
    axisLine: {
      lineStyle: {
        color: '#DCE1E5'
      }
    },
    splitNumber: 3
  },
  series: [{
    type: 'bar',
    barWidth: '50%',
    barMaxWidth: 30,
    itemStyle: {
      normal: {
        color: function(params) {
          // build a color map as your need.
          // console.log(params)
          var colorList = [
            '#1ABC9C', '#3498DB', '#2ECC71', '#F39C12', '#FF9273',
            '#E74C3C', '#B04B87', '#FAD860', '#F3A43B', '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0'
          ];
          return colorList[params.dataIndex]
        },
      }
    },
    label: {
      normal: {
        show: true,
        position: 'top',
        textStyle: {
          color: '#fefefe'
        }
      }
    },
    data: [182, 191, 234, 290, 330, 290, 330]
  }]
}

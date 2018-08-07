export default {
  title: {
    // text: '世界人口总量',
    // subtext: '数据来自网络'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    },
  },
  textStyle: {
    color: '#FEFEFE'
  },
  legend: {
    textStyle: {
      color: '#FEFEFE'
    },
    data: ['项目', '设备']
  },
  grid: {
    top: '13%',
    left: '0',
    right: '10px',
    bottom: '10px',
    containLabel: true
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0]
  },
  yAxis: {
    type: 'category',
    // data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)']
    data: []
  },
  series: [{
      name: '项目',
      type: 'bar',
      itemStyle: {
        normal: {
          color: '#3ECDEF'
        }
      },
      // data: [18203, 23489, 29034, 104970, 131744, 630230]
      data: [],
      /*label: {
        normal: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#3ECDEF'
          }
        }
      },*/
    },
    {
      name: '设备',
      type: 'bar',
      itemStyle: {
        normal: {
          color: '#F08519'
        }
      },
      // data: [19325, 23438, 31000, 121594, 134141, 681807]
      data: [],
      /*label: {
        normal: {
          show: true,
          position: 'right',
          textStyle: {
            color: '#F08519'
          }
        }
      },*/
    }
  ]
}

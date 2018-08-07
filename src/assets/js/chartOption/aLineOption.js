/*let generateData = function() {
  return Array.apply(null, {
    length: 7
  }).map(function(item, index) {
    return Math.round(Math.random() * 25 + 5);
  });
}*/
export default {
  textStyle: {
    color: '#FEFEFE'
  },
  legend: {
    data: ['项目', '设备'],
    textStyle: {
      color: '#FEFEFE'
    },
  },
  xAxis: {
    boundaryGap: false,
    axisLabel: {
      interval: 0
      // rotate: -20, 
    },
    // type: 'category',
    // data: ['06-15', '06-16', '06-17', '06-18', '06-19', '06-20', '06-21']
    data: []
  },
  yAxis: {
    type: 'value',
    boundaryGap: [0, 0.1]
  },
  grid: {
    top: '15%',
    left: '0',
    right: '20px',
    bottom: '10px',
    containLabel: true
  },
  tooltip: {
    trigger: 'axis'
  },
  series: [{
    name: '项目',
    type: 'line',
    itemStyle: {
      normal: {
        color: 'rgba(62,205,239,1)'
      }
    },
    areaStyle: {
      normal: {
        color: 'rgba(62,205,239,0.9)'
      }
    },
    // data: generateData()
    data: []
  }, {
    name: '设备',
    type: 'line',
    itemStyle: {
      normal: {
        color: 'rgba(240,133,25,1)'
      }
    },
    areaStyle: {
      normal: {
        color: 'rgba(240,133,25,0.9)'
      }
    },
    // data: generateData()
    data: []
  }]
}

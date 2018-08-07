const radius = {
  pie: '55%',
  doughnut: ['60%', '70%'],
  rose: ['20%', '55%']
};

/*let data = [{
    value: 400,
    name: '搜索引擎'
  },
  {
    value: 335,
    name: '直接访问'
  },
  {
    value: 310,
    name: '邮件营销'
  },
  {
    value: 274,
    name: '联盟广告'
  },
  {
    value: 235,
    name: '视频广告'
  }
];*/

let type = 'doughnut'; // pie doughnut

export default {
  title: [{
    text: '',
    left: 'center',
    top: '38%',
    padding: [24, 0],
    textStyle: {
      color: '#FEFEFE',
      fontSize: 16,
      align: 'center'
    }
  }, {
    text: "告警项目数",
    left: 'center',
    top: '50%',
    padding: [24, 0],
    textStyle: {
      color: '#FEFEFE',
      fontSize: 11,
      align: 'center'
    }
  }],
  color: ['#E74C3C', '#F1C40F', '#3498DB'],
  grid: {
    top: '15px',
    left: '15px',
    right: '15px',
    bottom: '10px',
    containLabel: false
  },
  tooltip: {
    trigger: 'item',
    formatter: "{b}: <br/> {c} ({d}%)",
    // formatter: "{c} ({d}%)",
    backgroundColor: 'rgba(0,0,0,.8)',
    confine: true
  },
  legend: {
    // type: 'scroll',
    // data: data.map(item => item.name)
    data: ['报警', '告警', '提醒'],
    textStyle: {
      color: '#FEFEFE'
    },
  },

  series: [{
    type: 'pie',
    radius: radius[type],
    center: ['50%', '60%'],
    // data: data,
    data: [],
    roseType: type === 'rose' ? 'radius' : void 0,
    avoidLabelOverlap: false,
    labelLine: {
      normal: {
        show: false
      }
    },
    label: {
      normal: {
        show: false,
        position: 'center'
      },
      emphasis: {
        show: false,
        textStyle: {
          fontSize: '14',
          fontWeight: 'bold'
        }
      }
    },
    animationType: 'scale',
    animationEasing: 'elasticOut',
    animationDelay: function(idx) {
      return Math.random() * 200;
    }
  }]
}

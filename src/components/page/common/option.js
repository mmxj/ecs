import styleJson from './style.json'

// var max = 480,
//   min = 9; // todo 
// var maxSize4Pin = 279,
//   minSize4Pin = 9; //来自data2.json的最大值和最小值
/*function renderItem(params, api) {
  var coords = [
      [116.7,39.53],
      [103.73,36.03],
      [112.91,27.87],
      [120.65,28.01],
      [119.57,39.95]
  ];
  var points = [];
  for (var i = 0; i < coords.length; i++) {
      points.push(api.coord(coords[i]));
  }
  var color = api.visual('color');

  return {
      type: 'polygon',
      shape: {
          points: echarts.graphic.clipPointsByRect(points, {
              x: params.coordSys.x,
              y: params.coordSys.y,
              width: params.coordSys.width,
              height: params.coordSys.height
          })
      },
      style: api.style({
          fill: color,
          stroke: echarts.color.lift(color)
      })
  };
}*/
export default {
  backgroundColor: '#404a59',
  /*  title: {
      text: '全国主要城市空气质量',
      subtext: 'data from PM25.in',
      sublink: 'http://www.pm25.in',
      left: 'center',
      textStyle: {
        color: '#fff'
      }
    },*/
  tooltip: {
    trigger: 'item',
    tirggerOn: 'click',
    borderRadius: 8,
    width: 340,
    backgroundColor: '#FFF',
    formatter: function(params) {
      let res = '<div class="indexToolTipWrap">'
      res += `<img src='${params.value[5]}' alt="图片错误">`
      res += "<div style='float:left'>"
      res += `<p class='title'>${params.name}</p>`
      res += `<p>负责人：${params.value[2]}</p>`
      res += `<p>维保商：${params.value[3]}</p>`
      res += `<p>地址：${params.value[4]}</p>`
      res += "</div>"
      res += "</div>"
      return res;
    },
  },
  bmap: {
    center: [104.114129, 37.550339],
    zoom: 5,
    roam: true,
    mapStyle: {
      styleJson: styleJson.data
    }
  },
  series: [{
      name: 'pm2.5',
      type: 'scatter',
      coordinateSystem: 'bmap',
      data: null,
      symbolSize: 12,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          color: '#1ABC9C'
        }
      }
    },
    /*{
        name: 'pm2.5',
        type: 'scatter',
        coordinateSystem: 'bmap',
        symbol: 'pin',
        symbolSize: function (val) {
            var a = (maxSize4Pin - minSize4Pin) / (max - min);
            var b = minSize4Pin - a*min;
            b = maxSize4Pin - a*max;
            return a*val[2]+b;
        },
        label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: false
            },
            emphasis: {
              show: true
            }
        },
        itemStyle: {
            normal: {
                color: '#F62157', //标志颜色
            }
        },
        // zlevel: 6,
        data: convertData(data),
    },*/
    {
      name: 'alarm1',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      symbol: 'pin',
      data: null,
      symbolSize: 50,
      /*symbolSize: function(val) {
        return val[2] / 10;
      },*/
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      itemStyle: {
        normal: {
          color: '#3798D4',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    },
    {
      name: 'alarm2',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      symbol: 'pin',
      data: null,
      symbolSize: 50,
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      itemStyle: {
        normal: {
          color: '#F1C40F',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    },
    {
      name: 'alarm3',
      type: 'effectScatter',
      coordinateSystem: 'bmap',
      symbol: 'pin',
      data: null,
      symbolSize: 50,
      showEffectOn: 'emphasis',
      rippleEffect: {
        brushType: 'stroke'
      },
      hoverAnimation: true,
      itemStyle: {
        normal: {
          color: '#E74C3C',
          shadowBlur: 10,
          shadowColor: '#333'
        }
      },
      zlevel: 1
    },
    {
      type: 'custom',
      coordinateSystem: 'bmap',
      renderItem: null,
      itemStyle: {
        normal: {
          opacity: 0.5
        }
      },
      animation: false,
      silent: true,
      data: [0],
      z: -10
    }
  ]
}

<style scoped lang='less'>


</style>
<template>
  <div :id="id" :ref='ref' style='width:100%'></div>
  <!-- <div id="main123" :ref='ref' style='width:200px;height:200px' class='bd'></div> -->
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
// import echarts from 'echarts'
let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/gauge')
let tid = null
export default {
  data: function() {
    return {
      // timeId:null,
      id: '',
      ref: '',
      myChart: {},
      option: {
        title: {
          // text: '温度',
          subtext: '',
          left: 'center',
          padding: [120, 0],
          // link: 'http://www.baidu.com'
        },
        backgroundColor: '',
        tooltip: {
          // formatter: '<div style="text-align: center;">业务指标</div>{b} : {c}'
        },
        /*toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },*/
        series: [{
          axisLine: {
            show: true,
            lineStyle: {
              color: [
                [0.2, '#31B499'],
                [0.4, '#31B499'],
                [0.8, '#3498DB'],
                [1, '#E74C3C']
              ],
              width: 10
            }
          },
          splitLine: { // 分隔线
            length: 20, // 属性length控制线长
            lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
              color: 'auto'
            }
          },
          axisTick: {
            show: true,
            length: 18, // 属性length控制线长
            lineStyle: { // 属性lineStyle控制线条样式
              color: 'auto'
            }
          },
          axisLabel: {
            distance: 6,
            textStyle: {
              color: 'auto'
            }
          },
          itemStyle: {
            normal: {
              color: 'auto'
            }
          },
          radius: '80%',
          pointer: {
            width: 10
          },
          title: {
            offsetCenter: [0, '90%']
          },
          detail: {
            textStyle: {
              fontWeight: 'bolder',
              fontSize: 18,
              // color: 'auto'
            },
            offsetCenter: [0, '58%'],
            formatter: '{value}',
            // formatter: '{value}℃',
          },
          min: 0,
          max: 120,
          // name: '制冷设定温度',
          type: 'gauge',
          show: false,
          splitNumber: 10,
          // center: ['79%', '55%'],
          data: [{
            value: '33',
            name: '制冷设定温度'
          }]
        }]
      }
    }
  },
  props: ['propsData'],
  computed: {
    ...mapGetters([
      'get_isRenderChart'
    ]),
    render(){
      return this.get_isRenderChart
    }
  },
  methods: {
    ...mapActions({
      stopRenderChart: 'render_chart'
    }),    
    setData() {
      let vm = this
      // let option = vm.option
      let propsData = vm.propsData
      vm.id = `id${propsData.ProtocalAddress}`
      vm.ref = `ref${propsData.ProtocalAddress}`
      // vm.option.title.text = propsData.DataType
      // vm.option.series[0].name = propsData.DataType
      vm.option.series[0].min = propsData.FirstUpper
      vm.option.series[0].max = propsData.FourthFloor
      vm.option.series[0].detail.formatter = `{value}${propsData.Unit}`

      let sum = propsData.FourthFloor - propsData.FirstUpper
      vm.option.series[0].axisLine.lineStyle.color = [
        [propsData.FirstFloor / sum, propsData.FirstColor],
        [propsData.SecondFloor / sum, propsData.SecondColor],
        [propsData.ThridFloor / sum, propsData.ThridColor],
        [propsData.FourthFloor / sum, propsData.FourthColor],
      ]
      // console.log(vm.option.series[0].axisLine.lineStyle.color)
      vm.option.series[0].data[0].value = propsData.Value
      vm.option.series[0].data[0].name = propsData.ProtocalName
      vm.setWidth()

    },
    setWidth() {
      let vm = this
      let propsData = vm.propsData
      let el = vm.$el
      // console.log(el)
      // el.style.width = `${propsData.clientWidth}px`
      el.style.height = `${el.clientWidth}px`
      vm.option.title.padding=[el.clientWidth/4,0]
    },
    init() {
      let vm = this
      vm.setData()
      let tid = setTimeout(function() {
        let el = document.querySelector(`#${vm.id}`)
        if (!el) return false
        vm.myChart = echarts.init(el)
        let tempVal = vm.option.series[0].data[0].value
        vm.option.series[0].data[0].value = 0
        vm.myChart.setOption(vm.option, false)
        vm.option.series[0].data[0].value = tempVal
        setTimeout(function () {
          vm.myChart.setOption(vm.option, false)
        }, 1000)
        /*window.addEventListener('resize', function() {
          clearTimeout(vm.timeId)
          vm.timeId = setTimeout(function () {
            console.log('resize')
            vm.setData()
            vm.myChart.resize()
          }, 500)
        })*/
      }, 0)

    }
  },
  watch: {
    propsData() {
      let vm = this
      // console.log('msg')
      let timeId = setTimeout(function() {
        vm.init()
      }, 300)
    },
    render(val){
      // console.log(val)
      if (val) this.init()
    }
  },
  updated: function() {
    // console.log('update')
  },  
  mounted() {
    // console.log(this.propsData)
    let vm = this
    let timeId = setTimeout(function() {
      vm.init()
    }, 0)
  }
}

</script>

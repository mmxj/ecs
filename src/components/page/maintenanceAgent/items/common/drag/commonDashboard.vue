<style scoped="scoped" lang="less">
  .chart_container {
    cursor: pointer;
    width: 100%;
    height: 100%;
    margin: 0 auto;
    margin-top: 5px;
  }
</style>
<template>
  <div :id="id" class="chart_container" style="cursor: pointer!important;"> 仪表盘222 </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex'
  import {
    Chart,
    myChart
  } from 'assets/js/common/dragCommon.js';
  export default {
    data() {
      return {
        id: this.propsData.containerID,
        myChart: {},
        options: {},
        instanceChart: null
      }
    },
    props: ['propsData', 'currentkey'],
    watch: {
      get_curr_setting(val, oldval) {
        let vm = this;
        vm.deleteCurrentPanel(val);
      },
      'propsData.colorSettingInfo': {
        handler(val, oldval) {
          let vm = this;
          vm.$nextTick(() => {
            let vRes = val.filter((val) => {
              return typeof(val.endNum) != 'number';
            });
            if(vRes.length > 0) {
              return false;
            } else {
              vm.updateSpline();
            }
          })
        },
        deep: true
      },
      'propsData.DisplayName' (val, oldval) {
        let vm = this;
        vm.options = vm.getChartOptions();
        vm.myChart.setOption(vm.options, true);
      },
      'propsData.value' (val, oldval) {
        let vm = this;
        let vRes = vm.propsData.colorSettingInfo.filter((v) => {
          return typeof(v.endNum) != 'number';
        });
        if(vRes.length > 0) {
          return false;
        } else {
          vm.options = vm.getChartOptions();
          vm.myChart.setOption(vm.options, true);
        }
      }
    },
    mounted() {
      let vm = this;
      this.$nextTick(() => {
        vm.updateSpline();
      });
    },
    computed: { ...mapGetters(["get_protocol_data", "get_equipment_data", "get_curr_setting"])
    },
    methods: { ...mapMutations({
        gETPROTOCOLDATA: 'GETPROTOCOLDATA',
        gET_EQUIPMENT_DATA: 'GET_EQUIPMENT_DATA',
        uPDATE_OPERATEMEMORY: 'UPDATE_OPERATEMEMORY'
      }),
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
        new Chart('.com_' + vm.propsData.refs, vm.propsData.refs, `dashboard`, vm.propsData.containerID, vm.myChart, val);
      },
      checkNumber(theObj) {
        var reg = /^[+-]?\d+[\.\d+]?$/;
        if(reg.test(theObj)) {
          return true;
        }
        return false;
      },
      updateSpline() {
        let vm = this;
        let timeTicket = null;
        vm.myChart = {};
        vm.options = {};
        vm.myChart = echarts.init(document.getElementById(vm.id));
        vm.instanceChart = new Chart('.com_' + vm.propsData.refs, vm.propsData.refs, `dashboard`, vm.propsData.containerID, vm.myChart, vm.get_curr_setting);
        vm.options = vm.getChartOptions();
        vm.myChart.setOption(vm.options, true);
      },
      getChartOptions() {
        let vm = this;
        let colorArr = [];
        let DisplayName = vm.propsData.DisplayName;
        let Unit = vm.propsData.Unit;
        let myValue = vm.propsData.value;
        let len = vm.propsData.colorSettingInfo.length;
        let min = Number(vm.propsData.colorSettingInfo[0].startNum);
        let max = Number(vm.propsData.colorSettingInfo[len - 1].endNum);
        for(let val of vm.propsData.colorSettingInfo) {
          let singleColorArr = [];
          let chaVal = Number(val.endNum) - Number(min);
          singleColorArr.push(chaVal / (max - min));
          singleColorArr.push(val.regionColor);
          colorArr.push(singleColorArr);
        }
        return {
          tooltip: {
            formatter: `{a} <br/>{b} : {c}${Unit}`
          },
          toolbox: {
            show: true,
            feature: {
              mark: {
                show: false
              },
              restore: {
                show: false
              },
              saveAsImage: {
                show: false
              }
            }
          },
          series: [{
            name: DisplayName,
            type: 'gauge',
            min: Number(min),
            max: max,
            splitNumber: 5,
            detail: {
              formatter: `{value}${Unit}`,
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontSize: 18,
                fontWeight: 'bold'
              }
            },
            axisLine: { // 坐标轴线  
              lineStyle: { // 属性lineStyle控制线条样式  
                color: colorArr,
                width: 8
              }
            },
            axisTick: { // 坐标轴小标记
              length: 15, // 属性length控制线长
              lineStyle: { // 属性lineStyle控制线条样式
              }
            },
            splitLine: { // 分隔线
              length: 16, // 属性length控制线长
              lineStyle: { // 属性lineStyle（详见lineStyle）控制线条样式
                width: 3,
              }
            },
            pointer: { // 分隔线
              width: 4
            },
            title: {
              offsetCenter: [0, '92%'],
              textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontSize: 12,
                color: '#1F2D3D'
              }
            },
            data: [{
              value: myValue,
              name: DisplayName
            }],
            axisLabel: {
              formatter: function(value) {
                return vm.toDecimal2(value);
              }
            }
          }]
        };
      },
      toDecimal2(x) {
        let f = parseFloat(x);
        if(isNaN(f)) {
          return false;
        }
        let s = f.toString();
        let str = s.substring(0, 5);
        let rs = str.indexOf('.');
        if(rs > 0) {
          let str1 = str.substring(0, rs + 2);
          return Number(str1);
        } else {
          return Number(str);
        }
      }
    }
  }
</script>
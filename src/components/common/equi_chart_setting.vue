<style scoped lang='less'>
.settingTitle {
  width: 100%;
  height: 70px;
  background: #fff;
  z-index: 1;
  line-height: 70px;
  overflow: hidden;
  border-bottom: 1px solid #E0EDEC;
  position: absolute;
  & span:first-child {
    padding-left: 25px;
    font-weight: bold;
    font-size: 18px
  }
}

.el_content {
  background: #fff;
  overflow: hidden;
  // width: 100%;
}

.imgContent {
  margin-top: 10px;
  float: left;
  min-width: 240px;
  max-width: 386px;
  height: 290px;
  display: flex;
  align-items: center;
  justify-content: center;
  & .imgUnit {
    & p {
      text-align: center;
      margin-top: 20px;
      font-weight: bold;
      font-size: 15px
    }
    & img {
      width: 200px; // height: 100px
    }
  }
}

.settingBox {
  overflow: hidden;
  min-height: 80vh;
  & .settingUnit{
    overflow: auto;
    min-width: 540px;
    max-width: 940px;
    height: 280px;
    border: 1.5px solid #E6F1F0;
    margin-top: 20px;
    & .el-color-picker{width: 38px;cursor: pointer;top: 5px}
    & .el-color-picker__trigger{border-width: 0;}
    & .el-icon-caret-bottom:before{content: ""}
    & .unitTop{
      width: 100%;height: 85px;background: #EEF6F6;padding-top: 25px;
      border-bottom: 1px solid #E6F1F0;
      & .pdl65{padding-left: 65px;}
    }
    & .unitH{
      min-height: 60px;line-height: 60px;padding-left: 100px;
    }
    & .unitP{
      padding-left: 0;
    }
  }
  & .settingUnit:first-child{
    margin-top: 35px;
  }
}
.maw85{max-width: 85px;}
.maw250{max-width: 250px;}
.cong{padding-right: 10px;}
.dao{padding: 0 20px;}
.mt16{margin-top: 16px;}
.el_content_poa{
  margin-top: 70px;
}
</style>
<template>
  <div class="el_mainContent" style='width:100%;height:99%;overflow-y:auto;overflow-x:hidden'>
    <div class="settingTitle">
      <span>设备数据示意图显示设置</span>
      <el-button class='mt16 fr mr25' @click='back'><i class="fa fa-mail-reply-all mr5"></i>返回</el-button>
    </div>
    <div class="el_content pd0 el_content_poa" style='height:auto'>
      <div class="imgContent">
        <div class="imgUnit">
          <img v-lazy="detail_equi.EquipmentPhoto" alt="" />
          <p>{{detail_equi.EquipmentName}}</p>
        </div>
      </div>
      <div class="settingBox" v-loading='loadingConfigdata'>
        <div class="settingUnit" v-for='(item,index) in configData'>
          <div class="unitTop">
            <el-row class='mb20'>
              <el-col :span="12" class='pdl65'>
                <span>第{{index+1}}个数据点名称：</span>
                <span class="mb10 maw250">
                  <el-select v-model="item.ProtocalAddress" clearable placeholder="" :loading='loadingProtocalOpts'>
                    <el-option
                        v-for="item in protocalOpts"
                        :key="item.ProtocalAddress"
                        :label="item.Name"
                        :value="item.ProtocalAddress">
                      </el-option>                    
                  </el-select>
                </span>
              </el-col>
              <el-col :span="12">
                <span>数据类型：</span>
                <span class="mb10 maw250">
                  <el-select v-model="item.DataType" clearable placeholder="" :loading='loadingDatatypeOpts'>
                    <el-option
                        v-for="item in datatypeOpts"
                        :key="item"
                        :label="item"
                        :value="item">
                      </el-option>                    
                  </el-select>
                </span>                
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" class='unitH'>
                <el-color-picker v-model="item.FirstColor" size="small"></el-color-picker>
                <span class="cong">从</span>
                <el-input v-model="item.FirstUpper" class='maw85'></el-input>
                <span class="dao">到</span>
                <el-input v-model="item.FirstFloor" class='maw85'></el-input>
              </el-col>
              <el-col :span="12" class='unitH unitP'>
                <el-color-picker v-model="item.SecondColor" size="small"></el-color-picker>
                <span class="cong">从</span>
                <el-input v-model="item.FirstFloor" class='maw85'></el-input>
                <span class="dao">到</span>
                <el-input v-model="item.SecondFloor" class='maw85'></el-input>
              </el-col>              
            </el-row>
            <el-row>
              <el-col :span="12" class='unitH'>
                <el-color-picker v-model="item.ThridColor" size="small"></el-color-picker>
                <span class="cong">从</span>
                <el-input v-model="item.SecondFloor" class='maw85'></el-input>
                <span class="dao">到</span>
                <el-input v-model="item.ThridFloor" class='maw85'></el-input>
              </el-col>
              <el-col :span="12" class='unitH unitP'>
                <el-color-picker v-model="item.FourthColor" size="small"></el-color-picker>
                <span class="cong">从</span>
                <el-input v-model="item.ThridFloor" class='maw85'></el-input>
                <span class="dao">到</span>
                <el-input v-model="item.FourthFloor" class='maw85'></el-input>
              </el-col>              
            </el-row>            
          </div>
        </div>
        <el-button class='mt20 mb10 mr20' @click='changeTab(1)'> 取 消 </el-button>
        <el-button type="primary" class='mt20 mb10' @click='submitForm'> 确 认 </el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const URL = Common.Const.url
const defaultUnit = Common.Const.configDataUnitDefault
let defaultArr = []
for (var i = 0; i < 6; i++) {
  defaultArr.push(defaultUnit)
}
// console.log(defaultArr)
export default {
  data: function() {
    // console.log(configDataUnitDefault)
    return {
      configData:[{
      "ProtocalAddress": "",
      "DataType": "",
      "FirstColor": '#3498DB',
      "FirstUpper": 0,
      "FirstFloor": 20,
      "SecondColor": '#2ECC71',
      "SecondUpper": 20,
      "SecondFloor": 30,
      "ThridColor": '#F1C40F',
      "ThridUpper": 30,
      "ThridFloor": 40,
      "FourthColor": '#E74C3C',
      "FourthUpper": 40,
      "FourthFloor": 50
  },{
      "ProtocalAddress": "",
      "DataType": "",
      "FirstColor": '#3498DB',
      "FirstUpper": 0,
      "FirstFloor": 20,
      "SecondColor": '#2ECC71',
      "SecondUpper": 20,
      "SecondFloor": 30,
      "ThridColor": '#F1C40F',
      "ThridUpper": 30,
      "ThridFloor": 40,
      "FourthColor": '#E74C3C',
      "FourthUpper": 40,
      "FourthFloor": 50
  },{
      "ProtocalAddress": "",
      "DataType": "",
      "FirstColor": '#3498DB',
      "FirstUpper": 0,
      "FirstFloor": 20,
      "SecondColor": '#2ECC71',
      "SecondUpper": 20,
      "SecondFloor": 30,
      "ThridColor": '#F1C40F',
      "ThridUpper": 30,
      "ThridFloor": 40,
      "FourthColor": '#E74C3C',
      "FourthUpper": 40,
      "FourthFloor": 50
  },{
      "ProtocalAddress": "",
      "DataType": "",
      "FirstColor": '#3498DB',
      "FirstUpper": 0,
      "FirstFloor": 20,
      "SecondColor": '#2ECC71',
      "SecondUpper": 20,
      "SecondFloor": 30,
      "ThridColor": '#F1C40F',
      "ThridUpper": 30,
      "ThridFloor": 40,
      "FourthColor": '#E74C3C',
      "FourthUpper": 40,
      "FourthFloor": 50
  },{
      "ProtocalAddress": "",
      "DataType": "",
      "FirstColor": '#3498DB',
      "FirstUpper": 0,
      "FirstFloor": 20,
      "SecondColor": '#2ECC71',
      "SecondUpper": 20,
      "SecondFloor": 30,
      "ThridColor": '#F1C40F',
      "ThridUpper": 30,
      "ThridFloor": 40,
      "FourthColor": '#E74C3C',
      "FourthUpper": 40,
      "FourthFloor": 50
  },{
      "ProtocalAddress": "",
      "DataType": "",
      "FirstColor": '#3498DB',
      "FirstUpper": 0,
      "FirstFloor": 20,
      "SecondColor": '#2ECC71',
      "SecondUpper": 20,
      "SecondFloor": 30,
      "ThridColor": '#F1C40F',
      "ThridUpper": 30,
      "ThridFloor": 40,
      "FourthColor": '#E74C3C',
      "FourthUpper": 40,
      "FourthFloor": 50
  },],
      loadingConfigdata:true,
      datatypeOpts:[],
      loadingDatatypeOpts:true,
      protocalOpts:[],
      loadingProtocalOpts:true,

      protocalUrl: URL.EQUIPMENTPROTOCAL,
      datatypeUrl: URL.EQUIPMENTDATATYPE,
      configdataUrl: URL.EQUIPMENTCONFIGDATA,
      setConfigdataUrl: URL.SETEQUIPMENTDATACONFIG,
    }
  },
  props: [],
  computed: {
    ...mapGetters([
      'detail_equi',
      'isShowSideBar'
    ])
  },
  methods: {
    ...mapActions({
      changeTab: 'changetab_detail',
      stopRenderChart: 'render_chart'
    }),
    back(){
      this.changeTab(1)
      this.stopRenderChart(true)
    },
    submitForm(){
      this.setConfigdata()
    },
    setConfigdata(){
      let configData = this.configData
      let tempConfig = []
      for (let index in configData) {
        let indexNum=Number(index)
        if (indexNum<5) {
          // console.log(configData[indexNum+1])
          if (configData[indexNum].ProtocalAddress!=''&&configData[indexNum].ProtocalAddress==configData[indexNum+1].ProtocalAddress) {
            this.$alert('数据点名称有重复,请重新填写')
            return false
          }
        }
        if(configData[index].ProtocalAddress!=''&&configData[index].DataType!=''){
          tempConfig.push(configData[index]);
        }
      }
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters: {
          TerminalEquipmentId: vm.detail_equi.EquipmentId,
          Configs: tempConfig,
        }
      }
      // console.log(data.Parameters.Configs)
      let url = vm.setConfigdataUrl
      POST(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.$message({
              type: 'success',
              message: '提交成功!'
            });
            vm.getConfigdata()
            vm.changeTab(1)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    getConfigdata(){
      if (!this.detail_equi.EquipmentId) return false
      let vm = this
      vm.loadingConfigdata = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TerminalEquipmentId": this.detail_equi.EquipmentId,
      }
      let url = this.configdataUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let Total = res.Data.length
            // console.log(Total)
            // vm.configData = []
            // vm.configData = res.Data
            for (let index in res.Data) {
              for (let index2 in res.Data[index]) {
                vm.configData[index][index2] = res.Data[index][index2]
              }
              // console.log(index)
            }
            for (let i = Total; i < 6; i++) {
              // console.log(i)
                vm.configData[i].ProtocalAddress=''
                vm.configData[i].DataType=''
                vm.configData[i].FirstColor='#3498DB'
                vm.configData[i].FirstUpper=0
                vm.configData[i].FirstFloor=20
                vm.configData[i].SecondColor='#2ECC71'
                vm.configData[i].SecondUpper=20
                vm.configData[i].SecondFloor=30
                vm.configData[i].ThridColor='#F1C40F'
                vm.configData[i].ThridUpper=30
                vm.configData[i].ThridFloor=40
                vm.configData[i].FourthColor='#E74C3C'
                vm.configData[i].FourthUpper=40
                vm.configData[i].FourthFloor=50
            }
            // console.log(vm.configData)
            vm.loadingConfigdata = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setProtocalOpts(){
      if (!this.detail_equi.EquipmentId) return false
      let vm = this
      vm.loadingProtocalOpts = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TerminalEquipmentId": this.detail_equi.EquipmentId,
      }
      let url = this.protocalUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.protocalOpts = res.Data
            vm.loadingProtocalOpts = false
            // console.log(vm.equiTabData)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setDatatypeOpts(){
      let vm = this
      vm.loadingDatatypeOpts = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = this.datatypeUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.datatypeOpts = res.Data
            vm.loadingDatatypeOpts = false
            // console.log(vm.equiTabData)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    }
  },
  watch:{
    detail_equi(){
      this.setProtocalOpts()
      this.getConfigdata()
    }
  },
  mounted() {
    // console.log(this.detail_equi)
    this.setProtocalOpts()
    this.setDatatypeOpts()
    this.getConfigdata()

  }
}

</script>

<style lang='less' scoped>
.el-form-item {
  float: left;
  width: 50%;
}

.el-select {
  width: 80%;
}

.w100p {
  width: 100%;
}

.el_content {
  overflow-y: auto;
}

</style>
<template>
  <div class='el_mainContent' style='width:100%;height:100%'>
    <div class="el_content" style='width:100%;height:100%'>
      <el-row>
        <el-col :span="22">
          <h3>基础设置</h3>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <!-- 客户设置 -->
      <div class='detailBox bd0'>
        <el-row class='bd1 pd25 detailDiv'>
          <h4 class='tac'>基础设置信息</h4>
          <div class="clearfix mb10"></div>
          <el-form :model="baseSetForm" :rules="baseSetRule" ref="baseSetForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label="会员最长试用期：" prop="MaxProbationaryPeriods">
              <el-input v-model="baseSetForm.MaxProbationaryPeriods" class='w100'></el-input>（月）
            </el-form-item>
            <el-form-item label="网关默认数据采集周期：" prop="DefaultDataPickPeroid">
              <el-input v-model="baseSetForm.DefaultDataPickPeroid" class='w100'></el-input>（秒）
            </el-form-item>
            <el-form-item label="维保码有效时间：" prop="LinkCodeValidity">
              <el-input v-model="baseSetForm.LinkCodeValidity" class='w100'></el-input>（分）
            </el-form-item>
            <el-form-item label="触发告警的数据连续异常数：" prop="DataAnomalyTimesToTriggerAlarm">
              <el-input v-model="baseSetForm.DataAnomalyTimesToTriggerAlarm" class='w100'></el-input>（次）
            </el-form-item>
            <el-form-item label="正式会员申请的审核公司：" class='w100p'>
              <el-input v-model="baseSetForm.PlatCompanyIdDisplay" class='w80p' disabled></el-input>
            </el-form-item>
            <el-form-item label="体验用户默认项目：" class='w100p' prop="projectSelected">
              <el-select v-model="baseSetForm.projectSelected" multiple filterable placeholder="请选择项目名称">
                <el-option v-for="item in projectList" class='w200' :key="item.ProjectId" :label="item.ProjectName" :value="item.ProjectName+':'+item.ProjectId">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="clearfix"></div>
            <div class="clearfix"></div>
            <el-form-item>
              <el-button type="primary" @click="submitbaseSetForm('baseSetForm')" class='fr mr-30'>提交</el-button>
            </el-form-item>
          </el-form>
        </el-row>
        <div class="clearfix mb10"></div>
        <el-row class='bd1 pd25 detailDiv'>
          <h4 class='tac'>运行状态关键字</h4>
          <div class="clearfix mb10"></div>
          <el-form :model="keyWordsForm" ref="keyWordsForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label='“运行”关键字' style='width:100%'>
              <el-select v-model="keyWordsForm.runStateNames" multiple filterable placeholder="请选择关键字">
                <el-option v-for="item in runStateNamesList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label='“停机”关键字' style='width:100%'>
              <el-select v-model="keyWordsForm.offStateNames" multiple filterable placeholder="请选择关键字">
                <el-option v-for="item in offStateNamesList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitKeyWordsForm" class='fr mr-30'>提交</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
import axios from 'axios'
const URL = Common.Const.url
const OPTS = Common.Const.options
const FUNC = Common.Func
const Vlidator = Common.Func.validator
const PUT = Common.Func.axios.put
const GET = Common.Func.axios.get
const POST = Common.Func.axios.post
export default {
  data() {
    return {
      projectList: [],
      baseSetForm: {
        DefaultDataPickPeroid: '',
        ExperienceProjectId: '',
        LinkCodeValidity: '',
        MaxProbationaryPeriods: '',
        DataAnomalyTimesToTriggerAlarm: '',
        projectSelected: [],
        Remark: ''
      },

      keyWordsForm: {
        runStateNames: [],
        offStateNames: []
      },
      runStateNamesList: [],
      offStateNamesList: [],

      baseSetRule: {
        projectSelected: [
          { validator: Vlidator.checkProjectSelected, trigger: 'change' }
        ],
        MaxProbationaryPeriods: [
          { validator: Vlidator.checkOrd, trigger: 'change' }
        ],
        DefaultDataPickPeroid: [
          { validator: Vlidator.checkOrd, trigger: 'change' }
        ],
        LinkCodeValidity: [
          { validator: Vlidator.checkOrd, trigger: 'change' }
        ],
        DataAnomalyTimesToTriggerAlarm: [
          { validator: Vlidator.checkOrd, trigger: 'change' }
        ],
      },

      AccessToken: '',
      getBaseSetInfoUrl: URL.GETBASESETINFO, //获取基础设置信息
      updateBaseSetInfoUrl: URL.UPDATEBASESETINFO, //修改基础设置信息
      getRunStateKeyWordsUrl: URL.GETRUNSTATEKEYWORDS, //查询已配置的运行状态关键字
      getRunStateOptionUrl: URL.GETRUNSTATEOPTION, //查询待配置的运行状态关键字
      addRunStateKeyWordsUrl: URL.ADDRUNSTATEKEYWORDS, //添加运行状态关键字
      getProjectListUrl: URL.PROJECT, //获取项目列表

    }
  },
  computed: {},
  methods: {
    //关键字表单提交
    addRunStateKeyWords() {
      let vm = this
      let url = this.addRunStateKeyWordsUrl
      let KeyWordsName = []

      for (let item of vm.keyWordsForm.runStateNames) {
        KeyWordsName.push({
          KeyWordsName: item,
          KeyWordsType: '1'
        })
      }
      for (let item of vm.keyWordsForm.offStateNames) {
        KeyWordsName.push({
          KeyWordsName: item,
          KeyWordsType: '0'
        })
      }
      let data = {
        AccessToken: this.AccessToken,
        Parameters: KeyWordsName
      }
      console.log(url)
      POST(url, data).then(function(res) {
        console.log(url)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          axios.all([
              vm.getRunStateKeyWords(),
              vm.getRunStateOption(),
            ])
            .then(axios.spread(function(rst, nst) {
              let rstArr = rst.data.Data
              // console.log(rstArr)
              vm.runStateNamesList = []
              vm.keyWordsForm.runStateNames = []
              vm.offStateNamesList = []
              vm.keyWordsForm.offStateNames = []
              vm.setRunStateKeyWords(rstArr)

              let nstArr = nst.data.Data
              // console.log(nstArr)
              vm.setRunStateOption(nstArr)

            }))
            .catch(axios.spread(function(rst, nst) {
              console.log(rst)
              console.log(nst)
            }))
          vm.successMsg('修改成功')
        }
      })
    },
    //关键字表单验证
    submitKeyWordsForm() {
      let vm = this
      if (vm.keyWordsForm.runStateNames.length == 0 && vm.keyWordsForm.offStateNames.length == 0) {
        vm.warningFromBE('请先添加关键字再提交')
        return false;
      }
      if (Vlidator.isSameStateNames(vm.keyWordsForm.runStateNames, vm.keyWordsForm.offStateNames)) {
        vm.warningFromBE('"停机"与"运行"关键字相同,请重新输入')
        return false;
      } else {
        vm.addRunStateKeyWords()
      }
    },
    //表单提交
    submitbaseSetForm(formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证
        if (valid) {
          this.updateBaseSetInfo()
        } else {
          return false;
        }
      });
    },

    //修改基础设置信息
    updateBaseSetInfo() {
      let vm = this
      let projectObj = FUNC.setProjectData(vm.baseSetForm.projectSelected)
      console.log(projectObj)
      vm.baseSetForm.Remark = projectObj.name
      vm.baseSetForm.ExperienceProjectId = projectObj.id
      let data = {
        AccessToken: vm.AccessToken,
        Parameters: [{
            'SetKey': 'MaxProbationaryPeriods',
            'SetValue': vm.baseSetForm.MaxProbationaryPeriods,
          },
          {
            'SetKey': 'LinkCodeValidity',
            'SetValue': vm.baseSetForm.LinkCodeValidity,
          },
          {
            'SetKey': 'DefaultDataPickPeroid',
            'SetValue': vm.baseSetForm.DefaultDataPickPeroid,
          },
          {
            'SetKey': 'DataAnomalyTimesToTriggerAlarm',
            'SetValue': vm.baseSetForm.DataAnomalyTimesToTriggerAlarm,
          },

          {
            'SetKey': 'ExperienceProjectId',
            'SetValue': vm.baseSetForm.ExperienceProjectId,
            'Remark': vm.baseSetForm.Remark
          }
        ]
      }
      // console.log(data)
      PUT(`${vm.updateBaseSetInfoUrl}`, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.successMsg('修改成功')
        }
      })
    },

    //获取基础设置信息
    getBaseSetInfo() {
      let url = this.getBaseSetInfoUrl
      let params = {
        AccessToken: this.AccessToken,
      }

      return GET(url, params)
    },

    //查询已配置的运行状态关键字
    getRunStateKeyWords() {
      let url = this.getRunStateKeyWordsUrl
      let params = {
        AccessToken: this.AccessToken,
      }

      return GET(url, params)
    },

    //查询待配置的运行状态关键字
    getRunStateOption() {
      let url = this.getRunStateOptionUrl
      let params = {
        AccessToken: this.AccessToken,
      }

      return GET(url, params)
    },

    getProjectList() {
      let url = this.getProjectListUrl
      let params = {
        AccessToken: this.AccessToken,
        IsAll: 1,
      }
      return GET(url, params)
    },
    setRunStateKeyWords(dataArr) {
      // console.log(dataArr)
      let vm = this
      for (let item of dataArr) {
        if (item.KeyWordsType == 1) {
          vm.runStateNamesList.push({
            label: item.KeyWordsName,
            value: item.KeyWordsName,
          })
          // console.log(vm.keyWordsForm.runStateNames)
          vm.keyWordsForm.runStateNames.push(item.KeyWordsName)
        } else if (item.KeyWordsType == 0) {
          vm.offStateNamesList.push({
            label: item.KeyWordsName,
            value: item.KeyWordsName,
          })
          vm.keyWordsForm.offStateNames.push(item.KeyWordsName)
        }
      }

    },
    setRunStateOption(dataArr) {
      let vm = this
      let tempArr = []
      for (let item of dataArr) {
        tempArr.push({
          label: item.RunStateName,
          value: item.RunStateName
        })
      }
      vm.runStateNamesList.push(...tempArr)
      vm.offStateNamesList.push(...tempArr)
    },

    //页面初始化
    init() {
      let vm = this
      axios.all([
          vm.getBaseSetInfo(),
          vm.getRunStateKeyWords(),
          vm.getRunStateOption(),
          vm.getProjectList(),
        ])
        .then(axios.spread(function(bas, rst, nst, plst) {
          let basRes = bas.data.Data
          let tempExperienceProject = []
          for (let item of basRes) {
            // console.log(item)
            vm.baseSetForm[item.SetKey] = item.SetValue
            if (item.Remark && item.SetKey == 'ExperienceProjectId') {
              let nameArr = item.Remark.split(',')
              let idArr = vm.baseSetForm.ExperienceProjectId.split(',')
              for (let index in nameArr) {
                tempExperienceProject.push(`${nameArr[index]}:${idArr[index]}`)
              }
            }
            if (item.Remark && item.SetKey == 'PlatCompanyId') {
              vm.baseSetForm.PlatCompanyIdDisplay = item.Remark
            }
          }
          vm.baseSetForm.projectSelected = tempExperienceProject
          // console.log(vm.baseSetForm.projectSelected)
          let projectList = plst.data.Data.Result
          vm.projectList = projectList

          let rstArr = rst.data.Data
          // console.log(rstArr)
          vm.setRunStateKeyWords(rstArr)

          let nstArr = nst.data.Data
          vm.setRunStateOption(nstArr)

          // console.log(rstArr)
        }))
        .catch(axios.spread(function(bas, rst, nst, plst) {
          console.log(bas)
          console.log(rst)
        }));
    },


    //后台返回保存失败信息
    warningFromBE(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      });
    },

    //成功提示信息
    successMsg(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'success'
      });
    },

    //清空表单
  },

  mounted: function() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    this.init()
  }
}

</script>

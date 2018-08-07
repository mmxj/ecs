<style lang='scss' scoped>
.colorSpan {
  line-height: 20px
}

.el_mainContent {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #fff;
}

.el_content {
  padding: 15px;
  overflow-y: auto;
  width: 100%;
}

.htmlview {
  // width: 1200px;
}

</style>
<template>
  <div class='el_mainContent' v-loading="loading" v-if='!isShowSetting'>
    <div class="el_content" element-loading-text="努力加载中" style="height: calc(100% - 40px);position: static;padding-top: 10px;padding-right: 0">
      <div v-if='false'>
        <el-row class='border-1px'>
          <el-col :span="22">
            <h3>巡检列表</h3>
          </el-col>
          <el-col :span="2" class='tar'>
            <el-button class='mb5' size='small' @click='goBack'>
              <i class="fa fa-mail-reply-all mr5"></i>返回
            </el-button>
          </el-col>
        </el-row>
        <div class="hr mb10"></div>
      </div>
      <div>
        <el-row v-show='isOperate.query'>
          <el-col :span='24'>
            <el-button size='small' type="primary" icon='plus' class='mb10 btn-2top' @click="createReport" v-show='true' title='一键生成当前时刻报告'>生成报告</el-button>
            <el-button v-if='EntitySort==2' size='small' style='margin-top: -2px' type="primary" class='fr mb10' icon="setting" @click='showAddForm'>配置规则</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" style="width: 100%" class='userTable' stripe>
              <el-table-column type="index" label="序号" width='65' align='center'></el-table-column>
              <el-table-column prop="PollingTime" label="巡检时间" align='center'></el-table-column>
              <el-table-column prop="Type" label="周期类型" align='center'></el-table-column>
              <el-table-column label="操作" align='center'>
                <template scope="scope">
                  <el-button @click="seeMore(scope.row.PollingDetailId)" type="text" size="small" class='ml5'><i class="fa fa-eye" title="预览报告"></i></el-button>
                  <el-button @click="download(scope.row.PollingDetailId)" type="text" size="small" class='ml5'><i class="fa fa-download" title="下载报告"></i></el-button>
                  <el-button type="text" size="small" @click="deleteConfirm(scope.row.PollingDetailId
)"><i class="fa fa-trash-o" title="删除模板"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="pagin">
          <div class="pageDes">
            <span>当前显示 {{firstPage}} 到 {{lastPage}} 条记录</span>
            <span>共 {{Total}} 条记录</span>
          </div>
          <div class="pageBlock">
            <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="Total">
            </el-pagination>
          </div>
        </div>
        <el-dialog title="报告预览" :visible.sync="dialogFormVisible">
          <div class="htmlview" v-html='htmlview' v-loading='loadingTable'></div>
          <div slot="footer" class="dialog-footer">
            <!-- <el-button @click="dialogFormVisible = false">取 消</el-button> -->
            <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
  <div class="el_mainContent" v-else>
    <div style="height: calc(100% - 50px);padding: 10px 0 0 15px;overflow-x: hidden;overflow-y: auto">
      <div class="contBlock por">
        <div class="blockTitle">配置规则</div>
        <div class="w40p fl">
          <el-form :model="addForm" label-width="100px" style='margin:34px 0 34px 100px;'>
            <el-form-item label="设备名称：">
              {{EquipmentName}}
            </el-form-item>
            <el-form-item label="开启巡检：">
              <el-switch v-model="addForm.Status" on-color="#13ce66" off-color="#ff4949" on-text="开启" off-text="关闭" on-value='1' off-value='0'>
              </el-switch>
            </el-form-item>
          </el-form>
        </div>
        <div class="w60p fl" v-show='addForm.Status==1'>
          <el-form label-width="150px" style='margin:34px 10px 34px 50px;max-width:600px'>
            <el-form-item label="巡检周期：">
              <el-select v-model="addForm.Type" class='w300'>
                <el-option value="D" :label="'每日'"></el-option>
                <el-option value="W" :label="'每周'"></el-option>
                <el-option value="M" :label="'每月'"></el-option>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="巡检时间：">
              <span v-show='!addForm.Type'>请先选择巡检周期</span>
              <el-select v-show='addForm.Type=="W"' v-model="addForm.week" class='w100' placeholder='星期几'>
                <el-option :value="1" :label="'星期一'"></el-option>
                <el-option :value="2" :label="'星期二'"></el-option>
                <el-option :value="3" :label="'星期三'"></el-option>
                <el-option :value="4" :label="'星期四'"></el-option>
                <el-option :value="5" :label="'星期五'"></el-option>
                <el-option :value="6" :label="'星期六'"></el-option>
                <el-option :value="7" :label="'星期天'"></el-option>
                </el-option>
              </el-select>
              <el-select v-show='addForm.Type=="M"' filterable v-model="addForm.date" class='w100' placeholder='几日'>
                <el-option v-for="index in 31" :key="index" :label="index+'日'" :value="index"></el-option>
              </el-select>
              <el-time-picker v-show='addForm.Type=="W"||addForm.Type=="M"' v-model="addForm.time" style='width: 197px' placeholder='几点' :clearable='false'></el-time-picker>
              <div v-show='addForm.Type=="D"'>
                <el-time-picker v-model="addForm.time" placeholder='几点' :clearable='false' style='width: 240px'></el-time-picker>
                <el-button type="primary" icon="plus" style='margin-left: 10px;' @click='addTimeplus'></el-button>
                <div style='margin-top: 15px;' v-show='addForm.timePlus.length!=0' v-for='(item, index) in addForm.timePlus'>
                  <el-time-picker v-model="item.value" placeholder='几点' :clearable='false' style='width: 240px'></el-time-picker>
                  <el-button icon="minus" style='margin-left: 10px;' @click='sliceTimeplus(index)'></el-button>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="巡检模板：">
              <el-cascader expand-trigger="hover" class='w300' :options="ModuleResourceIdOpts" v-model="addForm.ModuleResourceId" @change='setModulekey'>
              </el-cascader>
            </el-form-item>
            <el-form-item label="巡检条件(非必填)：">
              <el-select v-model="addForm.KernelAddress" class='w150' filterable clearable placeholder='当某协议点地址' style='margin-right: 10px'>
                <el-option v-for="(item, index) in ProtoclOpts" :key="index" :label="item.DisplayName" :value="item.RegisterAddress"> </el-option>
              </el-select>等于
              <el-input v-model="addForm.KernelValue" placeholder='某值' style='width: 102px;margin-left: 10px'></el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="contBlock por" style="margin-top:10px;margin-bottom:300px" v-show='addForm.ModuleResourceId[2]&&addForm.Status==1' v-loading='loadingKeyname'>
        <div class="blockTitle">关联协议点</div>
        <div style="padding: 20px 10px" class="ovh">
          <div class="w450 fl ovh" v-for='item in Modulekeys' style="height: 60px;line-height: 60px;color: #8A97AA;font-size: 14px">
            <div class="fr">
              {{item.NodeName+'：'}}
              <el-select v-model="item.Address" class='w200' filterable clearable>
                <el-option v-for="(item, index) in ProtoclOpts" :key="index" :label="item.DisplayName" :value="item.RegisterAddress"> </el-option>
              </el-select>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 50px;line-height:50px;">
      <el-button size='small' style='margin-left:265px;padding-left:20px;padding-right:20px' @click='isShowSetting = false'>取消</el-button>
      <el-button size='small' type="primary" style='margin-left:20px;padding-left:20px;padding-right:20px' @click='submitForm' :disabled='isSaving'>确定</el-button>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const PUT = AXIOS.put
const DELETE = AXIOS.delete
const URL = Common.Const.url
const OPTS = Common.Const.options
const operateOptions = Common.Const.options.FUNC_OPERATEOPTIONS
const STYLE = Common.Const.style
const Vlidator = Common.Func.validator
import qs from 'qs'
// console.log(STYLE)
Date.prototype.format = FUNC.date.format
export default {
  data() {
    return {
      loadingTable: true,
      dialogFormVisible: false,
      htmlview: '',
      isSaving: false,
      loadingKeyname: false,
      ProtoclOpts: [],
      Modulekeys: [],
      isShowSetting: false,
      stopChange: true,
      // isSearchHistory: false,
      EntitySort: FUNC.storage.get("EntitySort"),
      detailFormData: {},
      CompanyId: '',
      companyOpts: [],
      detailForm: {
        EventDetail: {}
      },
      isShowDetailDialog: false,
      //操作权限相关
      isOperate: {},
      isShowProjectId: true,
      isShowEquipmentId: true,
      addForm: {
        Status: 0,
        Type: '',
        time: '',
        week: '',
        date: '',
        KernelAddress: '',
        KernelValue: '',
        Config: [],
        ModuleResourceId: [],
        timePlus: [] //用来存储多个时间点
      },
      //加载表格相关
      loading: false,
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      KeyWords: "", //搜索关键字, 可传空 按设备id、编码、名称进行搜索

      ProjectId: "", //项目id
      projectOpts: [],

      EquipmentId: "", //设备id
      EquipmentName: "", //设备名称
      EquipmentOpts: [],

      TerminalEquipmentId: '',
      TerminalEquipmentIdOpts: [],

      ModuleResourceIdOpts: [],

      tableData: [],

    }
  },
  computed: {
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.Total)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.Total)
    },
  },
  methods: {
    addTimeplus() {
      let vm = this
      let unit = {
        value: ''
      }
      vm.addForm.timePlus.push(unit)
    },
    sliceTimeplus(index) {
      this.addForm.timePlus.splice(index, 1);
    },
    download(PollingDetailId) {
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        PollingDetailId
      }
      let url = `${URL.EXPORTPOLLINGREPORT}?${qs.stringify(data)}`
      window.location.href = url
    },
    //提交表单
    submitForm() {
      let vm = this
      vm.isSaving = true
      //如果用户设置关闭巡检,则直接调用关闭巡检接口,不用保存相关信息
      if (!vm.addForm.Status) {
        let data = {
          AccessToken: FUNC.storage.get("AccessToken"),
          Parameters: {
            PollingReportId: vm.addForm.ModuleResourceId[2],
          }
        }
        POST(URL.SETPOLLINGREPORTSTATUS, data).then(function(res) {
          // console.log(res)
          if (res.data.State != 0) {
            vm.$message.warning(res.data.Message)
          } else {
            vm.isShowSetting = false
            vm.tableLoad(undefined, 1)
          }
          vm.isSaving = false
          return
        })
      }
      // vm.validateForm()
      if (vm.validateForm()) {
        let time = vm.addForm.time.format("hh:mm:ss")
        let Type = ''
        let TimeFormat = `${vm.addForm.Type}|${time}|`

        switch (vm.addForm.Type) {
          case 'D':
            TimeFormat = `${TimeFormat}0`
            if (vm.addForm.timePlus.length != 0) {
              let timePlusArr = []
              for (let item of vm.addForm.timePlus) {
                let unitStr = ''
                if (item.value) {
                  unitStr = item.value.format("hh:mm:ss")
                }else{
                  unitStr = ''
                }
                timePlusArr.push(unitStr)
              }
              let str = timePlusArr.join(',')
              TimeFormat = `${vm.addForm.Type}|${time},${str}|0`
            }
            Type = 1
            break;
          case 'W':
            TimeFormat = `${TimeFormat}${vm.addForm.week}`
            Type = 2
            break;
          case 'M':
            TimeFormat = `${TimeFormat}${vm.addForm.date}`
            Type = 3
            break;
          default:
            console.log(vm.addForm.Type)
            return false
            break;
        }
        TimeFormat = `[${TimeFormat}]`
        let data = {
          AccessToken: FUNC.storage.get("AccessToken"),
          Parameters: {
            ModuleResourceId: vm.addForm.ModuleResourceId[2],
            TerminalEquipmentId: vm.TerminalEquipmentId, //设备ID
            TimeFormat,
            Type,
            Status: 1,
            KernelAddress: vm.addForm.KernelAddress,
            KernelValue: vm.addForm.KernelValue,
            Config: vm.Modulekeys,
          }
        }
        // console.log(JSON.stringify(data))
        POST(URL.SETPOLLINGREPORT, data).then(function(res) {
          // console.log(res)
          if (res.data.State != 0) {
            vm.$message.warning(res.data.Message)
            return false
          } else {
            vm.isShowSetting = false
            vm.isSaving = false
            vm.tableLoad(undefined, 1)
          }
        })
      }else{
        vm.isSaving = false
      }
    },
    //验证表单
    validateForm() {
      let vm = this
      let add = vm.addForm
      if (!add.Type) {
        vm.$message.error('请选择巡检周期')
        return false
      }
      switch (add.Type) {
        case 'D':
          if (!add.time) {
            vm.$message.error('请选择巡检时间')
            return false
          }
          if (add.timePlus.length != 0) {
            for (let item of add.timePlus) {
              if (item.value == '') {
                vm.$message.error('请完整填写巡检时间')
                return false
              }
            }
          }
          break;
        case 'W':
          if (!add.week || !add.time) {
            vm.$message.error('请完整选择巡检时间')
            return false
          }
          break;
        case 'M':
          if (!add.date || !add.time) {
            vm.$message.error('请完整选择巡检时间')
            return false
          }
          break;
        default:
          console.log(add.Type)
          return false
          break;
      }
      if (!add.ModuleResourceId[2]) {
        vm.$message.error('请选择巡检模板')
        return false
      }
      if (add.KernelAddress && !add.KernelValue) {
        vm.$message.error('未完整填写巡检条件')
        return false
      }
      return true
    },
    showAddForm() {
      let vm = this
      vm.getSetting()
      vm.setModuleResourceIdOpts()
      vm.setProtoclOpts()
      vm.isShowSetting = true
    },
    setProtoclOpts() {
      let vm = this
      let url = URL.QUERYWORKPROTOCL
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        EquipmentId: vm.TerminalEquipmentId, //设备ID
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.ProtoclOpts = data
            // console.log(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //获取模板列表
    setModuleResourceIdOpts() {
      let vm = this
      let url = URL.GETPOLLINGMODULEINFO
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let json = vm.formatJson(res.Data)
            vm.ModuleResourceIdOpts = json
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setModulekey() {
      let vm = this
      if (!vm.addForm.ModuleResourceId) {
        vm.Modulekeys = []
        return
      }
      vm.loadingKeyname = true
      let PollingModuleId = vm.addForm.ModuleResourceId[2]
      let url = URL.GETMODULEKEYINFO
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        PollingModuleId
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            let config = []
            for (let item of data) {
              let unit = {
                NodeName: item,
                Address: ''
              }
              config.push(unit)
            }
            vm.Modulekeys = config
            vm.loadingKeyname = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //把后台返回的数据格式成组件可用的数据格式
    formatJson(json) {
      let index = 0
      let keyName = 'label'
      for (let i of json) {
        i.value = i.BrandName
        if ('Items' in i) {
          for (let j of i.Items) {
            j.value = j.TypeName
          }
        }
      }
      json = JSON.stringify(json)
      json = json.replace(/BrandName/g, keyName)
      json = json.replace(/TypeName/g, keyName)
      json = json.replace(/ClassName/g, keyName)
      json = json.replace(/Items/g, 'children')
      json = json.replace(/ModuleId/g, 'value')
      json = JSON.parse(json)
      // console.log(json)
      return json
    },
    getSetting() {
      let vm = this;
      // vm.loading = true
      let param = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "TerminalEquipmentId": vm.TerminalEquipmentId, //设备ID
      };
      let url = URL.GETPOLLINGREPORT
      GET(url, param)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.resetForm(data)
            // console.log(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    intoEquipmentList(IsExperienceProject, IsSelfProject) {
      FUNC.storage.set('IsExperienceProject', IsExperienceProject);
      FUNC.storage.set('IsSelfProject', IsSelfProject);
      // console.log('IsExperienceProject')
    },
    //根据返回的配置信息进行表格填充或清空
    resetForm(data) {
      let vm = this
      if (data == {}) {
        vm.addForm.Status = '0'
        vm.addForm.Type = ''
        let TimeFormat = ''
        vm.addForm.time = ''
        vm.addForm.week = ''
        vm.addForm.date = ''
        vm.addForm.KernelAddress = ''
        vm.addForm.KernelValue = ''
        vm.addForm.ModuleResourceId = []
        vm.addForm.Config = []
        vm.addForm.timePlus = []
        vm.Modulekeys = []
        return
      } else {
        // console.log(vm.addForm.Status)
        vm.addForm.Status = data.Status + ''
        vm.addForm.Type = data.TimeFormat[1] //"[D|17:43:38,16:44:22|]" 这里指的是D
        let TimeFormat = data.TimeFormat.split('|')
        let timeArr = TimeFormat[1].split(',')
        vm.addForm.time = new Date(`2018-01-01 ${timeArr[0]}`)
        vm.addForm.timePlus = []
        for (let index in timeArr) {
          if (index != 0) {
            let unit = {
              value: new Date(`2018-01-01 ${timeArr[0]}`)
            }
            vm.addForm.timePlus.push(unit)
          }
        }
        vm.addForm.week = ''
        vm.addForm.date = ''
        switch (vm.addForm.Type) {
          case 'W':
            vm.addForm.week = TimeFormat[2]
            break;
          case 'M':
            vm.addForm.date = TimeFormat[2]
            break;
          default:
            console.log(vm.addForm.Type)
            break;
        }
        vm.addForm.KernelAddress = data.KernelAddress
        vm.addForm.KernelValue = data.KernelValue
        vm.addForm.ModuleResourceId = [data.BrandName, data.TypeName, data.ModuleResourceId]
        vm.addForm.Config = data.Config
        vm.Modulekeys = data.Config
      }
    },
    //生成报告
    createReport() {
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters: {
          "TerminalEquipmentId": vm.TerminalEquipmentId, //设备ID
        }
      }
      POST(URL.CREATEPOLLINGREPORT, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          let msg = res.data.Message
          if (msg == '数据不存在') {
            vm.$message.warning('未配置巡检规则，请点击“配置规则”按钮进行配置')
          } else {
            vm.$message.warning(msg)
          }
          return false
        } else {
          vm.tableLoad(undefined, 1)
        }
      })
    },
    seeMore(PollingDetailId) {
      let vm = this;
      vm.dialogFormVisible = true
      vm.loadingTable = true
      let param = {
        AccessToken: FUNC.storage.get("AccessToken"),
        PollingDetailId
        /*Parameters: {
          ResourceId
        }*/
      };
      GET(URL.GETPOLLINGREPORTHTML, param)
        .then(function(response) {
          vm.loadingTable = false
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data
            vm.htmlview = data
            // console.log(data)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //删除报告
    deleteConfirm(id) {
      let vm = this
      vm.$confirm('此操作将永久删除该报告, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          AccessToken: FUNC.storage.get("AccessToken"),
          Parameters: {
            PollingReportDetailIds: [id]
          }
        }
        POST(URL.DELETEPOLLINGREPORT, data).then(function(res) {
          // 成功删除后提示用户
          if (res.data.State == 0) {
            vm.$message({
              // type: 'success',
              type: 'info',
              message: '删除成功!'
            });
            vm.tableLoad(undefined, vm.PageIndex)
          }
        })

      })
    },
    goBack() {
      this.$router.go(-1)
    },
    setProjectOpts() {
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }

      let url = URL.PROJECT //获取项目列表(下拉框)
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.projectOpts = res.Data.Result
            // console.log(vm.projectOpts)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },

    //搜索预警告警条目
    search() {
      let vm = this
      if (vm.stopChange) return
      vm.tableLoad(vm.PageSize, vm.PageIndex = 1)
    },

    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      TerminalEquipmentId = this.TerminalEquipmentId) {
      let vm = this
      vm.loading = true

      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        PageSize,
        PageIndex,
        TerminalEquipmentId
      }
      let url = URL.GETPOLLINGREPORTLIST //获取巡检报告列表

      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data.ReportList
            let Total = res.Data.Total
            // console.log(vm.Total)
            if (!Total) {
              vm.Total = 0
            } else {
              vm.Total = Number(Total)
            }
            // console.log(vm.Total)
            vm.reload(dataArr)
            vm.loading = false
          }

        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    pageIndexChange(val) {
      this.PageIndex = val
      this.tableLoad(this.PageSize, this.PageIndex)
    },
    reload(dataArr) {
      this.tableData = dataArr
    },
    isHasPropsData() {
      let vm = this
      vm.isShowSetting = false
      if (vm.propsData) {
        if (vm.propsData.ProjectId) {
          vm.ProjectId = vm.propsData.ProjectId
          vm.isShowProjectId = false
        }
        if (vm.propsData.EquipmentId) {
          vm.TerminalEquipmentId = vm.propsData.EquipmentId
          vm.isShowEquipmentId = false
        }
        if (vm.propsData.EquipmentName) {
          vm.EquipmentName = vm.propsData.EquipmentName
        }
      }
      vm.tableLoad()
    }
  },
  mounted: function() {
    let vm = this
    vm.stopChange = true
    vm.isOperate = FUNC.operator.eosOperDataHandle()
    vm.isHasPropsData()
    vm.$nextTick(function() {
      vm.stopChange = false
    })
  },
  props: ['propsData'],
  watch: {
    propsData() {
      this.isHasPropsData()
    },
  }
}

</script>

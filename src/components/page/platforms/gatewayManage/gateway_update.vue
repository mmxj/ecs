<style lang='less' scoped>
.el-dialog__body {
  padding: 0;
}

.mb0 {
  margin-bottom: 0;
}

</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" v-loading="loadingTable" element-loading-text="努力加载中" v-if='showWhichTab==1'>
      <div>
        <el-row class='border-1px'>
          <el-col :span="22">
            <h3>网关升级</h3>
          </el-col>
        </el-row>
        <div class="hr mb10"></div>
      </div>
      <div>
        <el-row>
          <el-col :span='24' v-show='isOperate.query'>
            <span class="w150 mb10">
              <el-select size="small" v-model="CompanyId" filterable clearable placeholder="所属公司" @change='search'>
                <el-option
                    v-for="(item, index) in companyOpts"
                    :key="index"
                    :label="item.CompanyName"
                    :value="item.CompanyId">
                  </el-option>
              </el-select >
            </span>
            <span class="w150 mb10">
              <el-select size="small" v-model="GatewayModel" clearable placeholder="网关型号" @change='search'>
                <el-option
                    v-for="item in GatewayModelOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w150 mb10">
              <el-select size="small" v-model="UpgradeWay" clearable placeholder="升级方式" @change='search'>
                <el-option
                    v-for="item in UpgradeWayOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w200 mb10" @keyup.enter='search'>
              <el-input size="small" v-model="BatchNo" placeholder="批次号" @keyup.enter='search'></el-input>
            </span>
            <span class="w200 mb10" @keyup.enter='search'>
              <el-input size="small" v-model="GatewayId" placeholder="网关ID" @keyup.enter='search'></el-input>
            </span>
            <el-button size="small" type="primary" icon='search' class='btn-2top mb10' @click='search'>查找</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%" class='userTable noWrapTable' stripe>
              <el-table-column type="selection" width="45" fixed>
              </el-table-column>
              <el-table-column prop="GatewayId" label="网关ID" width='140' align='center'>
              </el-table-column>
              <el-table-column prop="GatewayModelName" label="网关型号" width='130' align='center'>
              </el-table-column>
              <el-table-column prop="CompanyName" label="所属公司" align='center' min-width='140'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.CompanyName">{{scope.row.CompanyName}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="HWVersion" label="硬件版本" align='center' min-width='120'>
              </el-table-column>
              <el-table-column prop="KernelVersion" label="内核程序版本" align='center' min-width='150'>
              </el-table-column>
              <el-table-column prop="AppsVersion" label="应用程序版本" align='center' min-width='150'>
              </el-table-column>
              <el-table-column prop="ShellScriptVersion" label="脚本程序版本" align='center' min-width='150'>
              </el-table-column>
              <el-table-column prop="WebVersion" label="Web版本" align='center' min-width='150'>
              </el-table-column>
              <el-table-column prop="UpgradeWayName" label="升级方式" align='center' min-width='100'>
              </el-table-column>
              <el-table-column label="批次号" align='center' min-width='120'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.BatchNo">{{scope.row.BatchNo}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="CreatedOn" label="升级日期" align='center' min-width='180'>
              </el-table-column>
              <el-table-column prop="UpdatedOn" label="同步日期" align='center' min-width='180'>
              </el-table-column>
              <el-table-column label="操作" width='80' align='center' fixed="right">
                <template scope="scope">
                  <el-button @click="showUpgradeDia(scope.row)" type="text" size="small" class='ml5' v-show='scope.row.UpgradeWay != 0'>升级</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="clearfix mb10"></div>
        <el-row>
          <el-col :span='24'>
            <el-button type="primary" icon='' size="small" class='mb10' @click='validateRows()'>批量升级</el-button>
            <el-button type="primary" icon='' size="small" class='ml15 mb10' @click='openModifyDia'>批量修改升级方式</el-button>
            <el-button icon='' size="small" class='ml15 mb10' @click='showWhichTab=2'>查看待升级网关</el-button>
            <div class="pageBlock">
              <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="Total">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <pendingList v-if='showWhichTab==2' :showWhichTabBridge.sync='showWhichTab' :companyOpts='companyOpts'></pendingList>
    <el-dialog :visible.sync="isShowModifyDia" title="修改升级方式">
      <el-form label-width="200px">
        <el-form-item label="批量修改升级方式为：" class='mb0'>
          <el-radio-group v-model="UpgradeWay_modi">
            <el-radio :label="0">统一</el-radio>
            <el-radio :label="1">指定</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowModifyDia = false">取 消</el-button>
        <el-button type="primary" @click="modifyGUW">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="设置升级版本号" :visible.sync="isShowSetDialog">
      <el-row v-loading="loadingDetailDialog" element-loading-text="努力加载中">
        <el-col :span='24'>
          <el-form :model="upgradeForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label="硬件版本号：">
              <el-input v-model="upgradeForm.HWVersion" class="w300" :placeholder="preText+currentRow.HWVersion"></el-input>
            </el-form-item>
            <el-form-item label="内核程序版本号：">
              <el-select class="w300" v-model="upgradeForm.KernelVersion" clearable :placeholder="preText+currentRow.KernelVersion">
                <el-option v-for="item in kernelVerOpts" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="应用程序版本号：">
              <el-select class="w300" v-model="upgradeForm.AppsVersion" clearable :placeholder="preText+currentRow.AppsVersion">
                <el-option v-for="item in appsVerOpts" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="脚本程序版本号：">
              <el-select class="w300" v-model="upgradeForm.ShellScriptVersion" clearable :placeholder="preText+currentRow.ShellScriptVersion">
                <el-option v-for="item in scriptVerOpts" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="WEB程序版本号：">
              <el-select class="w300" v-model="upgradeForm.WebVersion" clearable :placeholder="preText+currentRow.WebVersion">
                <el-option v-for="item in webVerOpts" :key="item" :label="item" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否立即升级：">
              <el-radio-group v-model="upgradeForm.IsUpgradeNow">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowSetDialog = false">关 闭</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import pendingList from './common/pendingGatewayList'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const Vlidator = FUNC.validator
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const PUT = AXIOS.put
const URL = Common.Const.url
const OPTS = Common.Const.options
const operateOptions = Common.Const.options.FUNC_OPERATEOPTIONS
const STYLE = Common.Const.style
// console.log(STYLE)
export default {
  data() {
    return {
      preText:'当前版本号：',
      kernelVerOpts: [],
      appsVerOpts: [],
      scriptVerOpts: [],
      webVerOpts: [],
      CompanyId: '',
      companyOpts: [],
      showWhichTab: 1,
      GatewayModel: "", //网关型号: 1-EOS100; 2-EOS200; 3-EOS300
      GatewayModelOpts: OPTS.GATEWAYMODELOPTIONS,

      UpgradeWay: "", //升级方式: 0-统一;1-指定
      UpgradeWayOpts: OPTS.UPGRADEWAYOPTIONS,
      UpgradeWay_modi: 0, //修改表格的升级方式: 0-统一;1-指定

      BatchNo: "",
      GatewayId: "",

      upgradeForm: {
        "GatewayIds": [], //待升级的网关id集合，必填
        "HWVersion": "", //硬件待升级版本号
        "KernelVersion": "", //内核程序待升级版本号
        "AppsVersion": "", //应用程序待升级版本号
        "WebVersion": "", //Web程序待升级版本号
        "ShellScriptVersion": "", //脚本程序待升级版本号
        "IsUpgradeNow": 0 //是否立即升级 0-否;1-是，必填
      },
      multipleSelection: [],
      currentRow: {},
      loadingDetailDialog: true,
      isShowSetDialog: false,
      isShowModifyDia: false,
      //操作权限相关
      isOperate: {},

      //加载表格相关
      loadingTable: false,
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      tableData: [],
      /*rule: {
        HWVersion: [
          { required: true, message: '请填写版本号', trigger: 'change' },
          { validator: Vlidator.verNoComma, trigger: 'change' }
        ],
        KernelVersion: [
          { required: true, message: '请选择内核程序版本号', trigger: 'change' },
        ],
        AppsVersion: [
          { required: true, message: '请选择应用程序版本号', trigger: 'change' },
        ],
        ShellScriptVersion: [
          { required: true, message: '请选择脚本程序版本号', trigger: 'change' },
        ],
        WebVersion: [
          { required: true, message: '请选择WEB程序版本号', trigger: 'change' },
        ],
      },*/
      queryTableUrl: URL.QUERYRUNNINGGATEWAY, //查询运行网关所在的企业列表
      companyListUrl: URL.QUERYGATEWAYCOMPANY, //查询升级网关列表(下拉框)
      queryVersionUrl: URL.QUERYGATEWAYVN, //查询网关型号下的版本号(下拉框)
      modifyUrl: URL.UPDATEGATEWAYUPGRADEWAY, //修改网关升级方式
      setUrl: URL.SETGATEWAYUPGRADE, //设置网关升级

    }
  },
  computed: {},
  components: {
    pendingList
  },
  methods: {
    submitForm() {
      let form = this.upgradeForm
      let tempArr = [form.HWVersion,form.KernelVersion,form.AppsVersion,form.WebVersion]
      for (let item of tempArr) {
        if (item!='') {
          this.setGatewayUpgrade()
          return true
        }
      }
      this.$message.warning('未填写有效信息')
    },
    openModifyDia() {
      if (this.multipleSelection.length == 0) {
        this.$message.warning('未选中数据')
        return false
      }
      this.UpgradeWay_modi = 0
      this.isShowModifyDia = true
    },
    modifyGUW() {
      let vm = this
      let GatewayIds = []
      for (let item of vm.multipleSelection) {
        GatewayIds.push(item.GatewayId)
      }
      let url = vm.modifyUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "UpgradeWay": vm.UpgradeWay_modi,
        "GatewayIds": GatewayIds,

      }
      // console.log(data)
      PUT(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.successMsg('修改网关升级方式成功')
            vm.isShowModifyDia = false
            vm.tableLoad()
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    handleSelectionChange(rows) {
      this.multipleSelection = rows
      // console.log(this.multipleSelection)
    },
    setCompanyOpts() {
      let vm = this
      let url = vm.companyListUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.companyOpts = res.Data.Result
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    resetUpgradeForm(){
      let vm = this
      // vm.upgradeForm.GatewayIds = []
      vm.upgradeForm.HWVersion = ''
      vm.upgradeForm.KernelVersion = ''
      vm.upgradeForm.AppsVersion = ''
      vm.upgradeForm.WebVersion = ''
      vm.upgradeForm.ShellScriptVersion = ''
      vm.upgradeForm.IsUpgradeNow = 0
    },
    setGatewayUpgrade() {
      let vm = this
      let url = vm.setUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "GatewayIds": vm.upgradeForm.GatewayIds,
        "HWVersion": vm.upgradeForm.HWVersion,
        "KernelVersion": vm.upgradeForm.KernelVersion,
        "AppsVersion": vm.upgradeForm.AppsVersion,
        "WebVersion": vm.upgradeForm.WebVersion,
        "ShellScriptVersion": vm.upgradeForm.ShellScriptVersion,
        "IsUpgradeNow": vm.upgradeForm.IsUpgradeNow,
      }
      // console.log(data)
      PUT(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.successMsg('设置网关升级成功')
            vm.isShowSetDialog = false
            vm.tableLoad()
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    hideResetPop() {
      document.querySelector("#ecos").click()
    },
    //成功提示信息
    successMsg(msg) {
      this.$message({
        showClose: true,
        message: msg,
        type: 'success'
      });
    },
    validateRows() {
      let vm = this
      if (!vm.GatewayModel) {
        this.$message.warning('请选择 网关型号 再进行批量操作')
        return false
      }
      if (vm.multipleSelection.length == 0) {
        this.$message.warning('未选中数据')
        return false
      }
      let isErr = false
      for (let item of vm.multipleSelection) {
        if (item.UpgradeWay == 0) {
          isErr = true
          break;
        }
      }
      if (isErr) {
        vm.$confirm('统一升级 方式的网关将被忽略此操作，是否继续？', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          vm.showUpgradeDia(false)
        }).catch(() => {
          return false
        });
      } else {
        vm.showUpgradeDia(false)
      }

    },
    //弹出升级对话框
    showUpgradeDia(row) {
      //row为false代表多选
      let vm = this
      vm.loadingDetailDialog = true
      let GatewayModel = ''
      let GatewayIds = []
      if (!row) {
        GatewayModel = vm.GatewayModel
        for (let item of vm.multipleSelection) {
          if (item.UpgradeWay != 0) GatewayIds.push(item.GatewayId)
        }
        vm.upgradeForm.GatewayIds = GatewayIds
        vm.currentRow.HWVersion = ''
        vm.currentRow.KernelVersion = ''
        vm.currentRow.AppsVersion = ''
        vm.currentRow.ShellScriptVersion = ''
        vm.currentRow.WebVersion = ''
      } else {
        vm.currentRow = row
        GatewayModel = row.GatewayModel
        vm.upgradeForm.GatewayIds = [row.GatewayId]
      }
      vm.isShowSetDialog = true
      vm.upgradeForm.IsUpgradeNow = 0
      vm.resetUpgradeForm()
      // if (vm.$refs.upgradeForm) vm.$refs.upgradeForm.resetFields()
      let url = vm.queryVersionUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "GatewayModel": GatewayModel,
        // "UpgradeWay": row.UpgradeWay
      }
      GET(url, data).then(function(response) {
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          let data = res.Data.Result
          for (let item of data) {
            switch (item.ProgramType) {
              case 'kernel':
                vm.kernelVerOpts = item.Versions.split(',')
                break;
              case 'apps':
                vm.appsVerOpts = item.Versions.split(',')
                break;
              case 'shellscript':
                vm.scriptVerOpts = item.Versions.split(',')
                break;
              case 'web':
                vm.webVerOpts = item.Versions.split(',')
                // console.log(vm.webVerOpts)
                break;
            }
          }
          vm.loadingDetailDialog = false
        }
      })

    },


    //搜索预警告警条目
    search() {
      this.tableLoad(this.PageSize, this.PageIndex = 1)
    },

    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      CompanyId = this.CompanyId,
      GatewayModel = this.GatewayModel,
      UpgradeWay = this.UpgradeWay,
      BatchNo = this.BatchNo,
      GatewayId = this.GatewayId) {
      let vm = this
      vm.loadingTable = true

      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          'CompanyId': CompanyId,
          'GatewayModel': GatewayModel,
          'UpgradeWay': UpgradeWay,
          'BatchNo': BatchNo,
          'GatewayId': GatewayId,
        }
      }
      let url = vm.queryTableUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data.Result
            let Total = res.Data.Total
            // console.log(dataArr)
            if (!Total) {
              vm.Total = 0
            } else {
              vm.Total = Total
            }
            // console.log(vm.Total)
            vm.reload(dataArr)
            vm.loadingTable = false
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
  },
  mounted: function() {
    this.setCompanyOpts()
    this.tableLoad()
    this.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(this.isOperate)
  },
  watch: {}
}

</script>

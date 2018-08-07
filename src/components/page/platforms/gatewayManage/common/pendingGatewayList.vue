<style lang='less' scoped>


</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" v-loading="loadingTable" element-loading-text="努力加载中">
      <div>
        <el-row class='border-1px'>
          <el-col :span="22">
            <h3>待升级网关版本列表</h3>
          </el-col>
          <el-col :span="2">
          </el-col>
        </el-row>
        <div class="hr mb10"></div>
      </div>
      <div>
        <el-row>
          <el-col :span='24' v-show='isOperate.query'>
            <span class="w150 mb10">
              <el-select size='small' v-model="CompanyId" filterable clearable placeholder="所属公司" @change='search'>
                <el-option
                    v-for="(item, index) in companyOpts"
                    :key="index"
                    :label="item.CompanyName"
                    :value="item.CompanyId">
                  </el-option>
              </el-select >
            </span>
            <span class="w150 mb10">
              <el-select size='small' v-model="GatewayModel" clearable placeholder="网关型号" @change='search'>
                <el-option
                    v-for="item in GatewayModelOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w150 mb10">
              <el-select size='small' v-model="UpgradeWay" clearable placeholder="升级方式" @change='search'>
                <el-option
                    v-for="item in UpgradeWayOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w200 mb10" @keyup.enter='search'>
              <el-input size='small' v-model="BatchNo" placeholder="批次号" ></el-input>
            </span>
            <span class="w200 mb10" @keyup.enter='search'>
              <el-input size='small' v-model="GatewayId" placeholder="网关ID" ></el-input>
            </span>
            <el-button size='small' type="primary" icon='search' class='btn-2top mb10' @click='search'>查找</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" @selection-change="handleSelectionChange" style="width: 100%" class='userTable noWrapTable' stripe>
              <el-table-column type="selection" width="45" fixed>
              </el-table-column>
              <el-table-column prop="GatewayId" label="网关ID" min-width='140' align='center'>
              </el-table-column>
              <el-table-column prop="GatewayModelName" label="网关型号" min-width='130' align='center'>
              </el-table-column>
              <el-table-column prop="CompanyName" label="所属公司" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.CompanyName">{{scope.row.CompanyName}}</div>
                </template>
              </el-table-column>
              <el-table-column label="硬件目标版本" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.HWVersion">{{scope.row.HWVersion}}</div>
                </template>
              </el-table-column>
              <el-table-column label="内核程序目标版本" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.KernelVersion">{{scope.row.KernelVersion}}</div>
                </template>
              </el-table-column>
              <el-table-column label="应用程序目标版本" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.AppsVersion">{{scope.row.AppsVersion}}</div>
                </template>
              </el-table-column>
              <el-table-column label="脚本程序目标版本" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.ShellScriptVersion">{{scope.row.ShellScriptVersion}}</div>
                </template>
              </el-table-column>
              <el-table-column label="Web目标版本" align='center' min-width='150'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.WebVersion">{{scope.row.WebVersion}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="UpgradeWayName" label="升级方式" align='center' min-width='100'>
              </el-table-column>
              <el-table-column label="批次号" align='center' min-width='100'>
                <template scope="scope">
                  <div class='nowrap' :title="scope.row.BatchNo">{{scope.row.BatchNo}}</div>
                </template>
              </el-table-column>
              <el-table-column prop="CreatedOn" label="升级日期" align='center' min-width='180'>
              </el-table-column>
              <el-table-column label="操作" width='80' align='center' fixed="right">
                <template scope="scope">
                  <el-popover trigger="click" placement="top" :ref='scope.row.FaultId'>
                    <p style="text-align: center;">确认取消升级吗？</p>
                    <div style="text-align: center; margin-top: 10px">
                      <el-button size="mini" type="text" @click="hideResetPop">取消</el-button>
                      <el-button type="primary" size="mini" @click="cancelRow(scope.row)">确定</el-button>
                    </div>
                    <div slot="reference" class="name-wrapper">
                      <el-button type="text" size="small" class='ml5'>取消</el-button>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <div class="clearfix mb10"></div>
        <el-row>
          <el-col :span='24'>
            <el-button type="primary" icon='' size="small" class='mb10' @click='showAlert'>批量取消</el-button>
            <el-button size='small' icon='caret-left' @click='showWhichTab(1)'> 返回网关升级 </el-button>
            <div class="pageBlock">
              <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="Total">
              </el-pagination>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const Vlidator = FUNC.validator
const AXIOS = FUNC.axios
const GET = AXIOS.get
const DELETE = AXIOS.delete
const URL = Common.Const.url
const OPTS = Common.Const.options
const operateOptions = Common.Const.options.FUNC_OPERATEOPTIONS
const STYLE = Common.Const.style
// console.log(STYLE)
export default {
  props: ['showWhichTabBridge', 'companyOpts'],
  data() {
    return {
      multipleSelection:[],
      CompanyId: '',

      GatewayModel: "", //网关型号: 1-EOS100; 2-EOS200; 3-EOS300
      GatewayModelOpts: OPTS.GATEWAYMODELOPTIONS,

      UpgradeWay: "", //升级方式: 0-统一;1-指定
      UpgradeWayOpts: OPTS.UPGRADEWAYOPTIONS,
      UpgradeWay_modi: 0, //修改表格的升级方式: 0-统一;1-指定

      BatchNo: "",
      GatewayId: "",

      isShowModifyDia: false,

      //操作权限相关
      isOperate: {},

      //加载表格相关
      loadingTable: false,
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      tableData: [],
      queryTableUrl: URL.QUERYPENDINGGATEWAY, //查询运行网关所在的企业列表
      cancelUrl: URL.DeleteGatewayMQ, //查询网关型号下的版本号(下拉框)
    }
  },
  computed: {},
  methods: {
    showAlert(){
      if (this.multipleSelection.length == 0) {
        this.$message.warning('未选中数据')
        return false
      }
      this.$confirm('此操作将批量取消升级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let rows = []
        for (let index in this.multipleSelection) {
          rows.push(this.multipleSelection[index].GatewayId)
        }
        this.cancel(rows)
      }).catch(() => {
      });
    },
    handleSelectionChange(rows) {
      this.multipleSelection = rows
      console.log(this.multipleSelection)
    },    
    openModifyDia() {
      this.isShowModifyDia = true
    },
    showWhichTab(val) {
      this.$emit('update:showWhichTabBridge', val)
    },
    hideResetPop() {
      document.querySelector("#ecos").click()
    },
    cancelRow(row){
      // console.log(row.GatewayId)
      let rows = [row.GatewayId]
      this.cancel(rows)
    },
    cancel(rows) {
      let vm = this
      let url = vm.cancelUrl
      let data = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "GatewayIds": rows
      }
      DELETE(url, data).then(function(response) {
        // console.log(res)
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.$message.success('取消升级成功')
          vm.hideResetPop()
          vm.tableLoad()
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
            // console.log(res)
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
    this.tableLoad()
    this.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(this.isOperate)
  },
  watch: {}
}

</script>

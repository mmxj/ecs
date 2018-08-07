<style lang='less' scoped>
a {
  cursor: pointer;
}

.triangle {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid #97BEBC;
  box-sizing: border-box;
  position: relative;
  top: -3px;
  transition: transform .8s;
}

.turnTri {
  transform: rotate(180deg)
}

.bdtForm {
  border-top: 1px solid #C7DEDC;
  padding: 30px 58px 0;
}

.h0 {
  max-height: 0px;
  transition: all .8s;
  width: 100%;
  overflow: hidden;
}

.ha {
  max-height: 900px
}

.demo-ruleForm img {
  width: 150px;
  height: 100px;
  display: inline-block;
  cursor: pointer;
}
.el_mainContent{
  width:100%;
  height:100%;
  position: relative;
  background-color: #fff;
}
.el_content {
  overflow-y: auto;
  width:100%;
}
</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" style="height: calc(100% - 40px)">
      <el-row class='border-1px'>
        <el-col :span="22">
          <h3>审核认证</h3>
        </el-col>
        <el-col :span="2" class='tar'>
          <el-button class='mb10' size='small' v-if='isShowRowCompanyDetail' @click='notShowRowCompanyDetail'><i class="fa fa-mail-reply-all mr5"></i>返回</el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <div v-show='!isShowRowCompanyDetail'>
        <el-row>
          <el-col :span='24' v-show='isOperate.query'>
            <span class="w100 mb10" v-if='EntitySort!=2'>
              <el-select size='small' v-model="IsAduitCompany" @change='search'>
                <el-option
                    v-for="(item, index) in IsAduitCompanyOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select >
            </span>
            <span class="w100 mb10">
              <el-select size='small' v-model="BussinessType" clearable placeholder="业务类型" @change='search'>
                <el-option
                    v-for="(item, index) in bussinessTypeOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select >
            </span>
            <span class="w100 mb10">
              <el-select size='small' v-model="Status" clearable placeholder="状态" @change='search'>
                <el-option
                    v-for="(item, index) in statusOpts"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select >
            </span>
            <span class="mb10" v-popover:popover1>
              <el-date-picker class="w150" size='small' v-model="StartDate" :editable='false' type="date" @change='search'></el-date-picker>
              <el-popover
                ref="popover1"
                placement="top-end"
                title="申请认证开始时间："
                width="200"
                trigger="hover"
                content="从当天00:00:00起算">
              </el-popover>
            </span>
            <span class="mb10" v-popover:popover2>
              <el-date-picker class="w150" size='small' v-model="EndDate" :editable='false' type="date" @change='search'></el-date-picker>
              <el-popover
                ref="popover2"
                placement="top-end"
                title="申请认证结束时间："
                width="200"
                trigger="hover"
                content="至当天23:59:59结束">
              </el-popover>
            </span>
            <span class="w200" @keyup='deSearch'>
              <el-input size='small' v-model="ApplyPhone" placeholder="手机号码查询" ></el-input>
            </span>
            <span class="w200" @keyup='deSearch'>
              <el-input size='small' v-model="CompanyName" placeholder="申请公司查询" ></el-input>
            </span>
            <!-- <el-button size='small' type="primary" icon='search' class='mb10' @click='search' style='position:relative;top:-2px'>查找</el-button> -->
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" v-loading="loadingTable" element-loading-text="努力加载中" style="width: 100%" class='userTable' stripe>
              <el-table-column type="index" label="序号" width='65' align='center'>
              </el-table-column>
              <el-table-column prop="BusinessTypeName" label="业务类型" align='center' width='100'>
              </el-table-column>
              <el-table-column prop="MessageContent" label="业务内容" align='center' width='150'>
              </el-table-column>
              <el-table-column label="申请公司" align='center' width='150'>
                <template scope="scope">
                  <a :title="scope.row.CompanyName" class='nowrap eosLink' @click='checkRowCompany(scope.row)'>{{scope.row.CompanyName}}</a>
                </template>
              </el-table-column>
              <el-table-column prop="Proposer" label="申请人" align='center'>
              </el-table-column>
              <el-table-column prop="Phone" label="申请人电话" align='center' width='150'>
              </el-table-column>
              <el-table-column prop="Processor" label="审核人" align='center'>
              </el-table-column>
              <el-table-column prop="CreatedOn" label="申请时间" align='center' width='180'>
              </el-table-column>
              <el-table-column prop="StatusName" label="状态" align='center'>
              </el-table-column>
              <el-table-column prop="UpdatedOn" label="审核时间" align='center' width='180'>
              </el-table-column>
              <!-- <el-table-column prop="Remark" label="审核说明" align='center' min-width='120'>
              </el-table-column> -->
              <el-table-column label="审核说明" align='center' width='120'>
                <template scope="scope">
                  <div :title="scope.row.Remark" class='nowrap'>{{scope.row.Remark}}</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" v-if='isOperate.approve && IsAduitCompany!=0' fixed="right" align='center' width='80'>
                <template scope="scope">
                  <el-button type="text" class='eosLink ml0' v-show='scope.row.IsCanAduit' @click='confirmRow(scope.row)'>审核</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- <div class="clearfix mb10"></div>
        <el-row>
          <el-col :span='24'>
            <div class="pageDes">
              <span>当前显示 {{firstPage(PageIndex,PageSize)}} 到 {{lastPage(PageIndex,PageSize)}} 条记录</span>
              <span>共 {{Total}} 条记录</span>
            </div>
            <div class="pageBlock">
              <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="Total">
              </el-pagination>
            </div>
          </el-col>
        </el-row> -->
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
      </div>
      <!-- 客户详情 -->
      <detailBox v-if='isShowRowCompanyDetail' :companyId='rowCompanyId'></detailBox>
    </div>
    <!-- 审核对话框 -->
    <el-dialog title="审核" :visible.sync="isConfirmDiaShow" class='certiDia' @close='isShowDetail=false'>
      <el-form :model="confirmForm" label-width="140px" class="demo-ruleForm w50p fl mt30">
        <el-form-item label="业务类型：">{{confirmForm.BusinessTypeName}}</el-form-item>
      </el-form>
      <el-form :model="confirmForm" label-width="100px" class="demo-ruleForm w50p fl mt30">
        <el-form-item label="申请公司：">{{confirmForm.CompanyName}}</el-form-item>
      </el-form>
      <div style="margin-left:60px" class='ovh w100p'>
        <span class='curp' @click='isShowDetail=!isShowDetail'>申请详情</span>
        <div class="triangle curp ml10" :class="{ turnTri: isShowDetail }" @click='isShowDetail=!isShowDetail'></div>
      </div>
      <el-form label-width="140px" class="demo-ruleForm mt10 h0" :class="{ ha: isShowDetail }" v-loading='loadingDetail' v-if='confirmForm.BusinessType==3'>
        <el-form-item v-for='(item,key) in detailForm' :label="setKeyName(key)" v-if='item!==null'>
          <span v-if='key=="ICFiles"'>
            <img v-for='jtem in item' :src="jtem" @click='showBigPic(jtem)'/>
          </span>
          <img v-else-if='key=="LogoImage"||key=="BLFiles"' :src="item" alt="" @click='showBigPic(item)' />
          <span v-else>{{item}}</span>
        </el-form-item>
      </el-form>
      <el-form label-width="140px" class="demo-ruleForm mt10 h0" :class="{ ha: isShowDetail }" v-else>
        <el-form-item label="业务内容">{{confirmForm.MessageContent}}</el-form-item>
      </el-form>
      <el-form :model="confirmForm" label-width="100px" class="demo-ruleForm bdtForm">
        <el-form-item label="审核说明：">
          <el-input type="textarea" v-model="confirmForm.Remark" :maxlength="100"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="submitConfirm(2)">拒 绝</el-button>
        <el-button type="primary" @click="submitConfirm(1)">同 意</el-button>
      </div>
    </el-dialog>
    <!-- 大图对话框 -->
    <el-dialog :visible.sync="isShowBigPic" class='bigPic'>
      <img :src="bigPicUrl" alt="" class='vh50' />
    </el-dialog>
  </div>
</template>
<script>
import detailBox from 'components/common/companyDetailBox'
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const OPTS = Common.Const.options
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
export default {
  data() {
    return {
      CompanyName: '',
      ApplyPhone: '',
      timeId: null,
      loadingDetail: true,
      bigPicUrl: '',
      isShowBigPic: false,
      isShowDetail: true,
      detailForm: {
        CompanyName: "",
        LogoImage: "",
        ORGCode: "", //组织机构代码
        USCCode: "", //统一社会信用代码
        RSTAddress: "", //注册地址
        LegalBody: "", //法人
        RegisteredCapital: "",
        StaffNum: "", //员工数量
        // IndustryId: "", //行业id
        ApplicantPost: "", //申请人职位
        ApplicantEmail: "",
        IndustryName: "", //行业名称
        BLFiles: "", //营业执照
        ICFiles: [] //企业资质
      },
      isOperate: {},

      isShowRowCompanyDetail: false,
      rowCompanyId: '',
      confirmForm: {
        Remark: ''
      },
      isConfirmDiaShow: false,
      //加载表格相关
      loadingTable: false,
      AccessToken: '',
      PageSize: 10,
      Total: undefined,
      PageIndex: 1,

      IsAduitCompany: 1, //0：我的申请(申请方) 1：我的审核(审核方) 其他情况：全部
      IsAduitCompanyOpts: OPTS.ISADUITCOMPANYOPTIONS,

      BussinessType: "", //消息业务类型(审核认证页)必填，1-申请正式账号;2-确认关联码绑定;
      bussinessTypeOpts: OPTS.BUSSINESSTYPEOPTIONS,

      Status: "", //状态(审核认证页)（空：全部；0-待回复;1-同意;2-拒绝）
      statusOpts: OPTS.CERTIFICATIONSTATUSOPTIONS,

      StartDate: '',
      EndDate: '',
      tableData: [],
      EntitySort: FUNC.storage.get("EntitySort"),
      queryListUrl: URL.MESSAGEQUERY, //审核认证列表
      aduitUrl: URL.MESSAGEADUIT, //审核认证接口
    }
  },
  components: {
    detailBox
  },
  computed: {
    StartTime() {
      if (this.StartDate) {
        let startTime = this.setTimeStr(this.StartDate)
        return `${startTime} 00:00:00`
      } else {
        return ''
      }
    },
    EndTime() {
      if (this.EndDate) {
        let endTime = this.setTimeStr(this.EndDate)
        return `${endTime} 23:59:59`
      } else {
        return ''
      }
    },
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.Total)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.Total)
    },
  },
  methods: {
    deSearch() {
      FUNC.debounce(this.timeId, this, 'search')
    },
    setKeyName(key) {
      switch (key) {
        case 'CompanyName':
          return '公司名称';
          break;
        case 'LogoImage':
          return '企业LOGO';
          break;
        case 'ORGCode':
          return '组织机构代码证';
          break;
        case 'USCCode':
          return '统一社会信用代码';
          break;
        case 'RSTAddress':
          return '注册地址';
          break;
        case 'LegalBody':
          return '法人';
          break;
        case 'StaffNum':
          return '员工数量';
          break;
        case 'RegisteredCapital':
          return '注册资本';
          break;
        case 'IndustryName':
          return '所属行业';
          break;
        case 'ApplicantPost':
          return '申请人职务';
          break;
        case 'ApplicantEmail':
          return '申请人邮箱';
          break;
        case 'BLFiles':
          return '企业营业执照';
          break;
        case 'ICFiles':
          return '企业资质';
          break;

        default:
          return key;
          break;
      }
    },
    //激活大图对话框
    showBigPic(url) {
      this.isShowBigPic = true
      this.bigPicUrl = url
    },
    notShowRowCompanyDetail() {
      this.isShowRowCompanyDetail = false
    },
    checkRowCompany(row) {
      this.rowCompanyId = row.CompanyId
      // console.log(this.rowCompanyId)
      this.isShowRowCompanyDetail = true
    },
    submitConfirm(status) {
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters: {
          MessageId: vm.confirmForm.MessageId,
          BusinessType: vm.confirmForm.BusinessType,
          Status: status, //（1-同意;2-拒绝.）
          Remark: vm.confirmForm.Remark,
          Extend: vm.confirmForm.Extend,
        }
      }
      let url = vm.aduitUrl
      POST(url, data)
        .then(function(response) {
          // console.log(response)
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.tableLoad(vm.PageSize, vm.PageIndex)
            vm.isConfirmDiaShow = false
            vm.$message({
              // type: 'success',
              type: 'success',
              message: '审核成功!'
            });
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    confirmRow(row) {
      let vm = this
      vm.isConfirmDiaShow = true
      vm.confirmForm.MessageId = row.MessageId
      vm.confirmForm.BusinessType = row.BusinessType
      vm.confirmForm.BusinessTypeName = row.BusinessTypeName
      vm.confirmForm.CompanyName = row.CompanyName
      vm.confirmForm.MessageContent = row.MessageContent
      vm.confirmForm.Remark = ''
      vm.confirmForm.Extend = row.Extend

      if (row.BusinessType == 3) {
        vm.queryModify(row.MessageId)
        vm.isShowDetail = true
      } else {
        vm.isShowDetail = false
      }

      // console.log(row)
    },
    queryModify(msgId) {
      let vm = this
      vm.loadingDetail = true
      let params = {
        AccessToken: this.AccessToken,
        msgId
      }
      let url = URL.QUERYMODIFYCOMPANY
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let data = res.Data[0]
            for (let index in data) {
              if (vm.detailForm.hasOwnProperty(index)) {
                // console.log(data[index])
                if (index == 'ICFiles') {
                  if (data[index] == null) {
                    vm.$set(vm.detailForm, index, null)
                    break;
                  }
                  let arr = JSON.parse(data.ICFiles)
                  let temp = []
                  for (let item of arr) {
                    temp.push(item.FileUrl)
                  }
                  vm.$set(vm.detailForm, index, temp)
                } else {
                  vm.$set(vm.detailForm, index, data[index])
                  // console.log(index)
                }
              }
            }
            vm.loadingDetail = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setTime() {
      this.EndDate = new Date()
      let startTime = this.EndDate.valueOf()
      startTime = startTime - 3 * 24 * 60 * 60 * 1000 //默认时间为三天前至今
      this.StartDate = new Date(startTime)
    },
    setTimeStr(date) {
      Date.prototype.format = FUNC.date.format
      date = date.format("yyyy-MM-dd")
      return date
    },

    //搜索按钮
    search() {
      this.tableLoad(this.PageSize, this.PageIndex = 1)
    },

    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      BussinessType = this.BussinessType,
      Status = this.Status,
      IsAduitCompany = this.IsAduitCompany,
      CompanyName = this.CompanyName,
      ApplyPhone = this.ApplyPhone,
      StartTime = this.StartTime,
      EndTime = this.EndTime) {
      let vm = this
      vm.loadingTable = true
      let params = {
        "AccessToken": this.AccessToken,
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'BussinessType': BussinessType,
        'Status': Status,
        'IsAduitCompany': IsAduitCompany,
        CompanyName,
        ApplyPhone,
        'StartTime': StartTime,
        'EndTime': EndTime,
      }
      let url = this.queryListUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = res.Data.Result
            // console.log(dataArr)
            if (!res.Data.Total) {
              vm.Total = 0
            } else {
              vm.Total = res.Data.Total
            }
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
      this.tableLoad()
    },
    reload(dataArr) {
      /*for (let item of dataArr) {
        if (item.BusinessType == 1) {
          item.BusinessTypeName = "账号申请"
        } else if (item.BusinessType == 2) {
          item.BusinessTypeName = "关联码"
        } else if (item.BusinessType == 3) {
          item.BusinessTypeName = "信息修改"
        }

        if (item.Status == 0) {
          item.StatusName = "待审核"
        } else if (item.Status == 1) {
          item.StatusName = "同意"
        } else if (item.Status == 2) {
          item.StatusName = "拒绝"
        }
      }*/
      this.tableData = dataArr
    },
    IsAduit() {
      if (this.$route.query.IsAduitCompany == '0') {
        this.IsAduitCompany = 0
      }
    }
  },
  mounted: function() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    this.isOperate = FUNC.operator.eosOperDataHandle()
    this.setTime()
    this.IsAduit()
    this.tableLoad()
    // console.log(this.isOperate)
  }
}

</script>

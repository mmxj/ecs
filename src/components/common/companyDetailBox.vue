<template>
  <!-- 企业详细信息页面组件 -->
  <div class='detailBox' id='detailBox'>
    <el-row>
      <el-col :span="18">
        <el-form label-position='right' label-width="20%" :model="tenantDetail">
          <el-form-item label="公司名称：">
            <div class="el-form-item__content">{{tenantDetail.CompanyFullName}}</div>
          </el-form-item>
          <el-form-item label="注册类型：">
            <div class="el-form-item__content">{{tenantDetail.EntityClass}}</div>
          </el-form-item>
          <!-- <el-form-item label="到期时间：">
            <div class="el-form-item__content">{{tenantDetail.ExpirationDateDisplay}}
              <el-popover ref="popover" placement="top" width="160" v-model="isPopoverShow">
                <p>确定要延长试用期吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="isPopoverShow = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="extendePeriods(tenantDetail.CompanyId)">确定</el-button>
                </div>
              </el-popover>
              <el-button type="primary" v-show='canExtendePeriods&&tenantDetail.IsRegular!=1' v-popover:popover size='small' class='ml30'>延长试用期</el-button>
            </div>
          </el-form-item> -->
          <el-form-item label="统一社会信用代码：">
            <div class="el-form-item__content">{{tenantDetail.CompanyUSCCode}}</div>
          </el-form-item>
          <el-form-item label="组织机构代码证：">
            <div class="el-form-item__content">{{tenantDetail.CompanyORGCode}}</div>
          </el-form-item>
          <el-form-item label="注册地址：">
            <div class="el-form-item__content">{{tenantDetail.CompanyAddress}}</div>
          </el-form-item>
          <el-form-item label="法人：">
            <div class="el-form-item__content">{{tenantDetail.CompanyLegalBody}}</div>
          </el-form-item>
          <el-form-item label="注册资本：">
            <div class="el-form-item__content">{{tenantDetail.CompanyRegCapital}}</div>
          </el-form-item>
          <el-form-item label="员工数量：">
            <div class="el-form-item__content">{{tenantDetail.CompanyStaffNum}}</div>
          </el-form-item>
          <el-form-item label="所属行业：">
            <div class="el-form-item__content">{{tenantDetail.IndustryName}}</div>
          </el-form-item>
          <el-form-item label="申请人姓名：">
            <div class="el-form-item__content">{{tenantDetail.CompanyAplyName}}</div>
          </el-form-item>
          <el-form-item label="申请人电话：">
            <div class="el-form-item__content">{{tenantDetail.CompanyAplyPhone}}</div>
          </el-form-item>
          <el-form-item label="申请人职务：">
            <div class="el-form-item__content">{{tenantDetail.CompanyAplyPost}}</div>
          </el-form-item>
          <el-form-item label="申请人邮箱：">
            <div class="el-form-item__content">{{tenantDetail.CompanyAplyEmail}}</div>
          </el-form-item>
          <el-form-item label="企业营业执照：">
            <div class="el-form-item__content"><img :src="tenantDetail.CompanyBLFilesURL" alt="企业营业执照" v-show='tenantDetail.CompanyBLFilesURL' id='detailLogo' class='curp' @click='showBigPic(tenantDetail.CompanyBLFilesURL)' /><span v-show='!tenantDetail.CompanyBLFilesURL'>无</span></div>
          </el-form-item>
          <el-form-item label="企业资质：">
            <div class="el-form-item__content"><img :src="item.FileUrl" alt="企业资质" id='detailLogo' class='curp fl mr30' v-for='item in tenantDetail.CompanyICFiles' @click='showBigPic(item.FileUrl)' /><span v-show='!tenantDetail.CompanyBLFilesURL'>无</span></div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <!-- 大图对话框 -->
    <el-dialog :visible.sync="isShowBigPic" class='bigPic'>
      <img :src="bigPicUrl" alt="" class='vh50' />
    </el-dialog>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const FUNC = Common.Func
const GET = Common.Func.axios.get
const PUT = Common.Func.axios.put
export default {
  data: function() {
    return {
      bigPicUrl: '',
      isShowBigPic: false,
      AccessToken: '',
      isPopoverShow: false,
      tenantDetail: {},

      querytenantinfoUrl: URL.QUERYTENANTINFO, //查询客户详细
      extendePeriodsUrl: URL.EXTENDEDPROBATIONARYPERIODS, //延长试用期申请

    }
  },
  props: {
    companyId: [String, Number],
    canExtendePeriods: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    //激活大图对话框
    showBigPic(url) {
      this.isShowBigPic = true
      this.bigPicUrl = url
    },
    extendePeriods(companyId) {
      let vm = this
      let url = vm.extendePeriodsUrl
      let data = {
        'AccessToken': vm.AccessToken,
        Parameters: {
          'CompanyId': companyId
        }
      }
      // console.log(data)
      // data = qs.stringify(data)
      PUT(url, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.tenantDetail.ExpirationDateDisplay = res.data.Data
          vm.successMsg('续期成功')
          // console.log(vm.tenantDetail.ExpirationDateDisplay)
          vm.isPopoverShow = false
        }
      })
    },

    //查看更多租户信息
    initData(companyId) {
      let vm = this
      let url = vm.querytenantinfoUrl;
      let params = {
        "AccessToken": vm.AccessToken,
        'Parameters': {
          'CompanyId': companyId
        }
      }
      GET(url, params)
        .then(function(response) {
          vm.tenantDetail = { ...response.data.Data }
          if (vm.tenantDetail.IsRegular) {
            vm.tenantDetail.ExpirationDateDisplay = vm.tenantDetail.CompanyTenantExpirationDate
          } else {
            vm.tenantDetail.ExpirationDateDisplay = vm.tenantDetail.CompanyExpirationDate
          }
          if (vm.tenantDetail.CompanyBLFilesURL) {
            GET(vm.tenantDetail.CompanyBLFilesURL)
              .then(function(res) {
                if (res.data.State == 10008) {
                  vm.tenantDetail.CompanyBLFilesURL = ''
                }
                // console.log(res)
              })
          }
        })
        .catch(function(error) {
          console.log(`${error.message}`)
        });
      this.isShowMain = false
      this.isShowMore = true
    },
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
  },
  mounted() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    this.initData(this.companyId)
  },
  watch: {
    companyId() {
      this.AccessToken = FUNC.storage.get("AccessToken")
      this.initData(this.companyId)
    }
  },
}

</script>
<style scoped lang='less'>
#detailBox:hover {
  background-color: rgba(0, 0, 0, 0.03);
  border: 1px #01a8fe solid !important;
  -webkit-transition: all .8s;
  box-shadow: 0 0 20px 0 rgba(1, 168, 254, 0.35), 0 0 0 0 rgba(1, 168, 254, 0.1)
}

</style>

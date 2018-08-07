<template>
  <!-- 服务详细信息页面组件 -->
  <div class='contentWrap'>
    <div class="contentBox detailDiv">
      <div class="contentTitle"><span>服务单号信息</span></div>
      <el-form>
        <el-form-item label="服务单号：" label-width="100px">{{orderDetail.ServiceOrderNo}}</el-form-item>
        <el-form-item label="服务类型：" label-width="100px">{{orderDetail.ServiceTypeName}}</el-form-item>
        <el-form-item label="服务状态：" label-width="100px">{{orderDetail.ServiceStateName}}</el-form-item>
      </el-form>
    </div>
    <div class="contentBox detailDiv">
      <div class="contentTitle"><span>服务客户信息</span></div>
      <el-form>
        <el-form-item label="服务人员：" label-width="100px">{{TechniciansDisplay}}</el-form-item>
        <el-form-item label="服务客户：" label-width="100px">{{orderDetail.CustomerName}}</el-form-item>
        <el-form-item label="开始时间：" label-width="100px">{{orderDetail.StartTime}}</el-form-item>
        <el-form-item label="服务状态：" label-width="100px">{{orderDetail.EndTime}}</el-form-item>
      </el-form>
    </div>
    <div class="contentBox detailDiv">
      <div class="contentTitle"><span>服务内容信息</span></div>
      <el-form>
        <el-form-item label="服务内容：" label-width="100px">{{orderDetail.ServiceContent}}</el-form-item>
        <el-form-item label="工作摘要：" label-width="100px">{{orderDetail.JobSummary}}</el-form-item>
        <el-form-item label="合同编号：" label-width="100px">{{orderDetail.ContractNo||'无'}}</el-form-item>
        <el-form-item label="合同文件：" label-width="100px">
          <span v-if='!orderDetail.ContractFiles||orderDetail.ContractFiles.length==0'>暂无文件</span>
          <el-button v-else v-for='item in orderDetail.ContractFiles' @click="download(item.FilePath)" type="text" size="mini" class='eosLink'>{{item.FileName}}</el-button>
        </el-form-item>
        <el-form-item label="清单文件：" label-width="100px">
          <span v-if='!orderDetail.WorkOrderFiles||orderDetail.WorkOrderFiles.length==0'>暂无文件</span>
          <el-button v-else v-for='item in orderDetail.WorkOrderFiles' @click="download(item.FilePath)" type="text" size="mini" class='eosLink'>{{item.FileName}}</el-button>
        </el-form-item>
        <el-form-item label="维修前图片：" label-width="100px">
          <div class="el-form-item__content">
            <span v-if='!orderDetail.OriginalPhotos||orderDetail.OriginalPhotos.length==0'>暂无图片</span>
            <img v-else v-for='item in orderDetail.OriginalPhotos' :src="item.ResourceUrl" id='detailLogo' class='curp' @click='showBigPic(item.ResourceUrl)' @error='errImg'/>
            <!-- <img src="https://rpic.douyucdn.cn/acrpic/171101/2900501_1222.jpg" id='detailLogo' class='curp' @click='showBigPic("https://rpic.douyucdn.cn/acrpic/171101/2900501_1222.jpg")'/> -->
            <!-- <img src="https://rpic.douyucdn.cn/acrpic/171101/2900501_1222.jpg" id='detailLogo' class='curp' @click='showBigPic("https://rpic.douyucdn.cn/acrpic/171101/2900501_1222.jpg")'/> -->
          </div>
        </el-form-item>
        <el-form-item label="维修后图片：" label-width="100px">
          <div class="el-form-item__content">
            <span v-if='!orderDetail.FinishedPhotos||orderDetail.FinishedPhotos.length==0'>暂无图片</span>
            <img v-else v-for='item in orderDetail.FinishedPhotos' :src="item.ResourceUrl" id='detailLogo' class='curp' @click='showBigPic(item.ResourceUrl)' />
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="contentBox detailDiv">
      <div class="contentTitle"><span>添加人信息</span></div>
      <el-form>
        <el-form-item label="创建人：" label-width="100px">{{orderDetail.CreatedBy}}</el-form-item>
        <el-form-item label="创建时间：" label-width="100px">{{orderDetail.CreatedOn}}</el-form-item>
      </el-form>
    </div>
    <!-- 大图对话框 -->
    <el-dialog :visible.sync="isShowBigPic" class='bigPic'>
      <img :src="bigPicUrl" alt="" class='vh50' />
    </el-dialog>
  </div>
</template>
<script>
import errImg from 'assets/images/common/error.jpg'
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
      orderDetail: {},
      serviceOrderDetailUrl: URL.SERVICEORDERDETAIL, //服务详情
    }
  },
  props: {
    serviceOrderId: [String, Number],
    commentRow: [Object],
  },
  methods: {
    errImg(e){
      console.log(e,errImg)
    },
    //激活大图对话框
    showBigPic(url) {
      this.isShowBigPic = true
      this.bigPicUrl = url
    },

    //初始化组件信息
    initData(serviceOrderId) {
      let vm = this
      let url = vm.serviceOrderDetailUrl;
      let params = {
        "AccessToken": vm.AccessToken,
        'Parameters': {
          'ServiceOrderId': serviceOrderId
        }
      }
      GET(url, params).then(function(res) {
        let detail = res.data.Data
        vm.orderDetail = detail
        vm.$emit('update:commentRow', detail)
        // console.log(vm.orderDetail)
      }).catch(function(error) {
        console.log(error)
      })
    },
    //下载
    download(url) {
      window.open(url)
    },
  },
  computed: {
    TechniciansDisplay() {
      let techniciansArr = []
      if (!this.orderDetail.Technicians) return ''
      for (let item of this.orderDetail.Technicians) {
        techniciansArr.push(item.UserName)
      }
      return techniciansArr.join('，')
    },
  },
  mounted() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    // console.log(this.serviceOrderId)
    this.initData(this.serviceOrderId)
  },
  watch: {
    serviceOrderId() {
      this.AccessToken = FUNC.storage.get("AccessToken")
      this.initData(this.serviceOrderId)
    }
  },
}

</script>
<style scoped lang='less'>
.contentWrap {
  padding-right: 20px;
}

.contentBox {
  padding: 24px;
  overflow: hidden;
  border: 1px solid #eeeeef;
  margin: 10px 0;
}

.contentTitle {
  margin: -24px -24px 24px -24px;
  background: #EFF2F7;
  width: 200%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  & span {
    font-weight: 700;
    font-size: 15px
  }
}

img#detailLogo {
  width: 80px;
  height: 80px;
  margin-top: 5px;
}

</style>

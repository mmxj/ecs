<template>
  <!-- 服务详细信息页面组件 -->
  <div class='contentWrap'>
    <div class="contentBox detailDiv">
      <div class="contentTitle"><span>服务确认</span></div>
      <el-form v-if='!isShowConfirmForm'>
        <el-form-item label="确认状态：" label-width="100px">
          {{row.SignedName}}
        </el-form-item>
        <el-form-item label="确认描述：" label-width="100px">
          <el-input disabled type="textarea" v-model="row.CustomerComments"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else ref="confirmForm" :model="confirmForm" label-width="100px">
        <el-form-item label="确认描述：">
          <el-input type="textarea" v-model="confirmForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitConfirmForm()">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      isShowConfirmForm:false,
      confirmForm:{
          desc:'',
      },
      confirmServiceUrl:URL.CONFIRMSERVICE,//服务确认
    }
  },
  props: {
    row:[Object],
  },
  methods:{
    submitConfirmForm() {
        this.$refs.confirmForm.validate((valid) => {
          if (valid) {
            this.confirm()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    confirm(){
      let vm = this
      let url = vm.confirmServiceUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        ServiceOrderId: vm.row.ServiceOrderId,
        CustomerComments: vm.confirmForm.desc
      }
      // console.log(data)
      PUT(url, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.row.SignedName = '已确认'
          vm.row.CustomerComments = vm.confirmForm.desc
          vm.isShowConfirmForm = false
          vm.$message({
            showClose: true,
            message: '确认成功',
            type: 'success',
          });
        }
      })
    },
    //初始化组件信息
    initData() {
      let vm = this;
      vm.isShowConfirmForm = false
      if (vm.row.CustomerSigned==0) {
        vm.confirmForm.desc = ''
        vm.isShowConfirmForm = true
      }
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
  computed: {
  },
  mounted() {
    this.initData()
    // console.log(this.row)
  },
  watch: {
    row(){
      this.initData()
    }
  },
}

</script>
<style scoped lang='less'>
.contentWrap{padding: 0;}
.contentBox{padding: 24px;overflow: hidden;border: 1px solid #eeeeef;margin: 10px 0;}
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

</style>

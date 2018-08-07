<style scoped lang='less'>
.el-rate {
  padding-top: 8px;
}

</style>
<template>
  <!-- 服务详细信息页面组件 -->
  <div class='contentWrap'>
    <div class="contentBox detailDiv">
      <div class="contentTitle"><span>服务确认</span></div>
      <el-form v-if='!isShowCommentForm'>
        <el-form-item label="确认状态：">
          已确认
        </el-form-item>
        <el-form-item label="服务态度：">
          <el-rate v-model="ServiceAttitude" disabled text-color="#ff9900">
          </el-rate>
        </el-form-item>
        <el-form-item label="服务效率：">
          <el-rate v-model="ServiceEfficiency" disabled text-color="#ff9900">
          </el-rate>
        </el-form-item>
        <el-form-item label="服务质量：">
          <el-rate v-model="ServiceQuality" disabled text-color="#ff9900">
          </el-rate>
        </el-form-item>
        <el-form-item label="评价描述：">
          <el-input disabled type="textarea" v-model="ServiceSuggestion"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else ref="commentForm" :model="commentForm" label-width="100px">
        <el-form-item label="服务态度：">
          <el-rate v-model="commentForm.ServiceAttitude"></el-rate>
        </el-form-item>
        <el-form-item label="服务效率：">
          <el-rate v-model="commentForm.ServiceEfficiency"></el-rate>
        </el-form-item>
        <el-form-item label="服务质量：">
          <el-rate v-model="commentForm.ServiceQuality"></el-rate>
        </el-form-item>
        <el-form-item label="评价描述：">
          <el-input type="textarea" v-model="commentForm.ServiceSuggestion"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitCommentForm()">确认</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
import axios from 'axios'
const URL = Common.Const.url
const FUNC = Common.Func
const GET = Common.Func.axios.get
const PUT = Common.Func.axios.put
export default {
  data: function() {
    return {
      isShowCommentForm: false,
      ServiceAttitude: 0,
      ServiceEfficiency: 0,
      ServiceQuality: 0,
      ServiceSuggestion: '',
      commentForm: {
        ServiceAttitude: 5,
        ServiceEfficiency: 5,
        ServiceQuality: 5,
        ServiceSuggestion: '',
      },
      evaluationServiceUrl: URL.EVALUATIONSERVICE, //服务确认
      confirmServiceUrl: URL.CONFIRMSERVICE, //服务确认
    }
  },
  props: {
    row: [Object],
  },
  methods: {
    submitCommentForm() {
      let vm = this
      vm.$refs.commentForm.validate((valid) => {
        if (valid) {
          axios.all([
              vm.confirm(),
              vm.comment(),
            ])
            .then(axios.spread(function(cfm, cmm) {
              if (cfm.data.State != 0) {
                vm.warningFromBE(res.data.Message)
                return false
              } else {
                vm.isShowCommentForm = false
                vm.setCommentDesc()
                vm.$message({
                  showClose: true,
                  message: '确认成功',
                  type: 'success',
                });
              }
            }))
            .catch(axios.spread(function(cfm, cmm) {
              console.log(cfm)
              console.log(cmm)
            }));
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    setCommentDesc() {
      let vm = this
      vm.isShowCommentForm = false
      vm.ServiceAttitude = vm.commentForm.ServiceAttitude
      vm.ServiceEfficiency = vm.commentForm.ServiceEfficiency
      vm.ServiceQuality = vm.commentForm.ServiceQuality
      vm.ServiceSuggestion = vm.commentForm.ServiceSuggestion
    },
    comment() {
      let vm = this
      let url = vm.evaluationServiceUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        ServiceOrderId: vm.row.ServiceOrderId,
        ServiceAttitude: vm.commentForm.ServiceAttitude,
        ServiceEfficiency: vm.commentForm.ServiceEfficiency,
        ServiceQuality: vm.commentForm.ServiceQuality,
        ServiceSuggestion: vm.commentForm.ServiceSuggestion,
      }
      return PUT(url, data)
    },
    confirm() {
      let vm = this
      let url = vm.confirmServiceUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        ServiceOrderId: vm.row.ServiceOrderId,
        CustomerComments: vm.commentForm.ServiceSuggestion
      }
      return PUT(url, data)
    },
    //初始化组件信息
    initData() {
      let vm = this;
      // console.log(vm.row)
      if (vm.row.IsEvaluationed == 0) {
        vm.isShowCommentForm = true
        vm.commentForm.ServiceAttitude = 5
        vm.commentForm.ServiceEfficiency = 5
        vm.commentForm.ServiceQuality = 5
        vm.commentForm.ServiceSuggestion = ''
      } else {
        vm.isShowCommentForm = false
        vm.ServiceAttitude = vm.row.ServiceAttitude || 0
        vm.ServiceEfficiency = vm.row.ServiceEfficiency || 0
        vm.ServiceQuality = vm.row.ServiceQuality || 0
        vm.ServiceSuggestion = vm.row.ServiceSuggestion
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
  computed: {},
  mounted() {
    this.initData()
    // console.log(this.row)
  },
  watch: {
    row() {
      this.initData()
    }
  },
}

</script>
<style scoped lang='less'>
.contentWrap {
  padding: 0;
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

</style>

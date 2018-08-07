<style lang='less' scoped>
.el_mainContent{
  width:100%;
  height:100%;
  position: relative;
  background-color: #fff;
}
.el_content{
  padding-bottom: 0;
  overflow-y: auto;
  width:100%;
}
</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" style="height: 100%">
      <el-row class='border-1px'>
        <el-col :span="22">
          <h3>服务报告</h3>
        </el-col>
        <el-col :span="2" class='tar'>
          <el-button class='mb5' size='small' @click='goBack'>
            <i class="fa fa-mail-reply-all mr5"></i>返回
          </el-button>
        </el-col>
      </el-row>
      <div class="hr"></div>
      <div style="height: calc(100% - 50px)">
        <replist></replist>
      </div>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
import replist from 'components/page/platforms/reportList';

const FUNC = Common.Func
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
  components: {
    replist,
  },
  data() {
    return {
    }
  },
  methods: {
    goBack(){
      this.$router.go(-1)
    },
  },
  mounted: function() {
  },
  watch: {
  }
}

</script>

<style lang='less' scoped>
.el_mainContent{
  width:100%;
  height:100%;
  position: relative;
  background-color: #fff;
}
.el_content{
  padding: 15px;
  overflow-y: auto;
  width:100%;
  border: 1px solid #000;
}
.pageWrap{
  border: 1px solid #DBE9E9;
  & .tabHead{
    height: 40px;
    border-bottom: 1px solid #DBE9E9;
    & .tabUnit{
      color: #1F2D3D;
      font-weight: bold;
      display: inline-block;
      width: 90px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-right: 1px solid #DBE9E9;
      border-bottom: 1px solid #DBE9E9;
      cursor: pointer;
    }
    & .tabUnitActive{
      color: #1ABC9C;
      border-bottom: 1px solid #fff;
    }
  }
}
.tabContent{
  width: 100%;
}
</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" style="height: 100%">
      <el-row class='border-1px'>
        <el-col :span="22">
          <h3>日志查询</h3>
        </el-col>
        <el-col :span="2" class='tar'>
          <el-button class='mb5' size='small' @click='goBack'>
            <i class="fa fa-mail-reply-all mr5"></i>返回
          </el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <div class="pageWrap" style="height: calc(100% - 50px)">
        <div class="tabHead">
          <div class="tabUnit" v-for='(item,index) in tabArr' @click='setTabMenu(index)' :class="item.isActive?'tabUnitActive':''">{{item.label}}</div>
        </div>
        <div class="tabContent" style="height: calc(100% - 40px)">
          <actlog v-show='tabNo==0'></actlog>
          <pro-eventlog v-show='tabNo==1'></pro-eventlog>
          <qui-eventlog v-show='tabNo==2'></qui-eventlog>
          <operlog v-show='tabNo==3'></operlog>
          <loginlog v-show='tabNo==4'></loginlog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
import actlog from 'components/page/common/log_list/projectActivityLog';
import proEventlog from 'components/page/common/log_list/projectEventLog';
import quiEventlog from 'components/page/common/log_list/equipmentEventLog';
import operlog from 'components/page/common/log_list/operatelog';
import loginlog from 'components/page/common/log_list/loginlog';

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
    actlog,
    proEventlog,
    quiEventlog,
    operlog,
    loginlog
  },
  data() {
    return {
      tabNo: 0,
      tabArr: [{
        label:'项目活动',
        isActive: true
      },{
        label:'项目事件',
        isActive: false
      },{
        label:'设备事件',
        isActive: false
      },{
        label:'操作日志',
        isActive: false
      },{
        label:'登录日志',
        isActive: false
      }]
    }
  },
  methods: {
    setTabMenu(index) {
      let vm = this
      for (let i in vm.tabArr) {
        vm.tabArr[i].isActive = false
      }
      vm.tabArr[index].isActive = true
      vm.tabNo = index
    },
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

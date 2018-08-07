<style scoped lang="scss">
.w100span {
  width: 80%;
  height: 36px;
  overflow: hidden;
}

.w80p {
  width: 80%;
}

.regWrap {
  background-color: #162433;
  overflow-x: hidden;
  overflow-y: auto;
  & .regCon {
    margin: 0 auto;
    max-width: 1075px;
    min-width: 650px;
    height: 100%;
    cursor: default;
    & .regHead {
      height: 90px;
      overflow: hidden;
      & .logo {
        width: 187px;
        height: 63px;
        margin-top: 11px;
        float: left;
      }
      & .border {
        height: 60px;
        width: 2px;
        background-color: #374556;
        margin-top: 13px;
        margin-left: 35px;
        float: left;
      }
      & .text {
        color: #8492A6;
        font-size: 18px;
        float: left;
        font-weight: bold;
        margin-left: 30px;
        margin-top: 50px;
      }
      & .text2 {
        float: right;
        color: #fff;
        margin-top: 60px;
        margin-right: 35px;
        & span {
          color: #1079d0;
          cursor: pointer;
        }
        & span:hover {
          color: #30A4F7
        }
      }
    }
    & .regInput {
      background-color: #fff;
      overflow-x: hidden;
      overflow-y: auto;
    }
    & .inner {
      width: 650px;
      margin: 0 auto;
      padding: 75px 10px 30px;
      & .title {
        font-size: 16px;
        font-weight: bold;
        color: #1F2D3D;
        border-bottom: 1px solid #E0ECEB;
        line-height: 32px;
      }
      & .el-radio__input.is-checked .el-radio__inner {
        border-color: #FF4E49;
        background: #FFF
      }
      & .el-radio__inner::after {
        background: #FF4E49;
        width: 9px;
        height: 9px
      }
      & .clickOpen {
        font-size: 16px;
        color: #0F88EB;
        cursor: pointer;
      }
      & .clickOpen:hover {
        color: #30A4F7
      }
      & .checkSpan {
        margin-left: 10px;
        cursor: pointer;
      }
      & .checkSpan:hover {
        color: #30A4F7
      }
    }
  }
}

.PopBg {
  position: fixed;
  background: rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  display: block;
  z-index: 998;
  top: 0;
  left: 0;
}

.PopCon {
  min-width: 420px;
  max-width: 800px;
  background: #fff;
  top: 50%;
  left: 50%;
  position: fixed;
  z-index: 999;
  width: 800px;
  height: 560px;
  margin-left: -400px;
  margin-top: -300px;
  cursor: default;
  & .PopTitle {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    background: #1abc9c;
  }
  & .PopClose {
    position: absolute;
    top: 0px;
    right: 15px;
    font-size: 24px;
    color: #fff;
    cursor: pointer;
  }
}

</style>
<template>
  <div class="regWrap" ref='regWrap'>
    <div class="regCon">
      <div class="regHead">
        <div class="logo" style="background:url('static/css/images/register-logo.png') no-repeat;"></div>
        <div class="border"></div>
        <div class="text">欢迎注册</div>
        <div class="text2" v-show='!isRegisterSucess'>已经注册，现在 <span @click='goback'>登录</span></div>
      </div>
      <div class="regInput" style="height: calc(100% - 110px)">
        <div class="inner" v-if='isRegisterSucess'>
          <img src="static/css/images/register_success.png" style="margin: 0 auto;display: block;" />
          <p style="color: #000;font-weight: bold;font-size: 18px;text-align: center;margin-top: 28px">恭喜帐号成功注册！</p>
          <p style="color: #8492A6;font-size: 16px;text-align: center;margin-top: 20px">
          	<span>密码以短信发送到您手机，注册类型为“</span>
          	<span>{{EntityTypeLabel}}</span>
          	<span>”，类别为“试用会员”,</span>
            <br />如果需要成为“正式会员”，请登入平台后向易云维的运营团队申请。</p>
          <p style="color: #0F88EB;text-align: center;margin-top: 35px;cursor: pointer;" @click='$router.replace("login")'>点击返回登录页</p>
        </div>
        <div class="inner" v-else>
          <div class="title">注册类型</div>
          <el-form :model="form1" ref="form1" :rules="rules" label-width="0px" style='margin:35px 0 35px 150px;'>
            <el-form-item label="" prop="EntityType">
              <el-radio-group v-model="form1.EntityType">
                <el-radio label="1" style='margin-right:70px;'>维保商</el-radio>
                <el-radio label="0">业主</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <div class="title">基本信息</div>
          <el-form :model="form2" ref="form2" :rules="rules" label-width="150px" style='margin:35px 0 35px 0;'>
            <el-form-item label="申请人：" prop="ApplyName">
              <span v-popover:ApplyName class="w100span" @keyup='bindName'>
              <el-input v-model="form2.ApplyName" :maxlength="10"></el-input>
              <el-popover
                ref="ApplyName"
                placement="right-end"
                width="200"
                trigger="hover"
                content="2-10位，中文、字母、数字、下划线的组合，以中文或字母开头">
              </el-popover>
              </span>
            </el-form-item>
            <el-form-item label="手机号码：" prop="ApplyPhone">
              <span v-popover:ApplyPhone class="w100span" @keyup='bindName'>
              <el-input v-model.number="form2.ApplyPhone" :maxlength="11"></el-input>
              <el-popover
                ref="ApplyPhone"
                placement="right-end"
                width="100%"
                trigger="hover"
                content="11位数字组合，例：13612345678">
              </el-popover>
              </span>
            </el-form-item>
            <el-form-item label="公司名称：" prop="CompanyName">
              <span v-popover:CompanyName class="w100span" @keyup='isBindName=false'>
              <el-input v-model="form2.CompanyName" :maxlength="25"></el-input>
              <el-popover
                ref="CompanyName"
                placement="right-end"
                width="200"
                trigger="hover"
                content="3-25位，中文、字母、数字、下划线的组合，以中文或字母开头">
              </el-popover>
              </span>
            </el-form-item>
            <span class="clickOpen" @click='isExpand = !isExpand'>以下内容为非必填项，点击{{isExpand?'收起':'展开'}}</span>
            <transition name="el-zoom-in-top">
              <div v-show='isExpand'>
                <el-form-item label="申请人职务：" prop="ApplyPosition" style='margin-top: 20px'>
                  <span v-popover:ApplyPosition class="w100span">
                  <el-input v-model="form2.ApplyPosition" :maxlength="20"></el-input>
                  <el-popover
                    ref="ApplyPosition"
                    placement="right-end"
                    width="200"
                    trigger="hover"
                    content="3-20位，中文、字母、数字、下划线的组合，以中文或字母开头">
                  </el-popover>
                  </span>
                </el-form-item>
                <el-form-item label="申请人邮箱：" prop="ApplyEmail">
                  <span v-popover:ApplyEmail class="w100span">
                  <el-input v-model="form2.ApplyEmail" :maxlength="25"></el-input>
                  <el-popover
                    ref="ApplyEmail"
                    placement="right-end"
                    width="100%"
                    trigger="hover"
                    content="邮箱格式：abc@abc.com">
                  </el-popover>
                  </span>
                </el-form-item>
                <el-form-item label="统一社会信用代码：" prop="USCCode">
                  <span v-popover:USCCode class="w100span">
                  <el-input v-model="form2.USCCode" :maxlength="18"></el-input>
                  <el-popover
                    ref="USCCode"
                    placement="right-end"
                    width="100%"
                    trigger="hover"
                    content="最大长度18位，由字母、数字、划线组合">
                  </el-popover>
                  </span>
                </el-form-item>
                <el-form-item label="组织机构代码证：" prop="ORGCode">
                  <span v-popover:ORGCode class="w100span">
                  <el-input v-model="form2.ORGCode" :maxlength="10"></el-input>
                  <el-popover
                    ref="ORGCode"
                    placement="right-end"
                    width="100%"
                    trigger="hover"
                    content="最大长度10位，由字母、数字、划线组合">
                  </el-popover>
                  </span>
                </el-form-item>
                <el-form-item label="注册地址：">
                  <span class="w100span">
                  <el-input v-model="form2.RegisteredAddress" :maxlength="25"></el-input>
                  </span>
                </el-form-item>
                <el-form-item label="法人：">
                  <span class="w100span">
                  <el-input v-model="form2.LegalBody" :maxlength="20"></el-input>
                  </span>
                </el-form-item>
                <el-form-item label="所属行业：">
                  <el-select clearable v-model="form2.IndustryId" :loading='loadingIndustryOpts' class='w80p'>
                    <el-option v-for="item in IndustryOpts" :key="item.IndustryId" :label="item.IndustryName" :value="item.IndustryId">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="注册资本：" prop="RegisteredCapital">
                  <span class="w100span">
                  <el-input v-model.number="form2.RegisteredCapital" :maxlength="9"></el-input>
                  </span>
                </el-form-item>
                <el-form-item label="员工数量：" prop="StaffNum">
                  <span class="w100span">
                  <el-input v-model.number="form2.StaffNum" :maxlength="9"></el-input>
                  </span>
                </el-form-item>
              </div>
            </transition>
            <el-form-item label="" style='margin-top: 30px' prop="isChecked" class='checkItem'>
              <el-checkbox v-model="form2.isChecked"></el-checkbox><span class="checkSpan" @click='isShowPop=true'>我已阅读并同意条款</span>
            </el-form-item>
          </el-form>
          <el-button style='margin-left:150px;padding-left:20px;padding-right:20px' @click='goback'>返 回</el-button>
          <el-button type="primary" style='margin-left:20px;padding-left:20px;padding-right:20px' @click='submitForm'>提 交</el-button>
        </div>
      </div>
    </div>
    <div class="PopBg" style="z-index:998;" v-show='isShowPop' @click='isShowPop=false'></div>
    <transition name="el-zoom-in-center">
      <div class="PopCon regcon" v-show='isShowPop'>
        <div class="PopTitle"><strong>服务协议条款 <label class="PopClose" @click='isShowPop=false'>×</label></strong></div>
        <div class="f-r0" style="padding: 5px;">
          <div class="eos">
            <iframe src="/static/html/protocol/protocol.html" frameborder="0" height="500" width="100%"></iframe>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const URL = Common.Const.url
const FUNC = Common.Func
const Vlidator = FUNC.validator
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
import { mapGetters, mapActions } from 'vuex'
export default {
  data() {
    return {
      timeId: null,
      isBindName: true,
      isExpand: false,
      IndustryOpts: [],
      loadingIndustryOpts: true,
      isRegisterSucess: false,
      isShowPop: false,
      form1: {
        EntityType: '',
      },
      form2: {
        ApplyName: '',
        ApplyPhone: '',
        CompanyName: '',
        isChecked: true,
        ApplyPosition: '',
        ApplyEmail: '',
        USCCode: '',
        ORGCode: '',
        RegisteredAddress: '',
        LegalBody: '',
        IndustryId: '',
        RegisteredCapital: '',
        StaffNum: '',
      },
      rules: {
        EntityType: [
          { required: true, message: '请选择注册类型', trigger: 'change' }
        ],
        ApplyName: [
          { required: true, message: '请输入申请人名称', trigger: 'blur' },
          { validator: Vlidator.account, trigger: 'blur' }
        ],
        ApplyPhone: [
          { required: true, type: 'number', message: '请输入正确的手机号码', trigger: 'blur' },
          { validator: Vlidator.phoneNum, trigger: 'blur' }
        ],
        CompanyName: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
          { validator: Vlidator.comName, trigger: 'blur' }
        ],
        ApplyPosition: [
          { validator: Vlidator.pos, trigger: 'blur' }
        ],
        ApplyEmail: [
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
        ],
        USCCode: [
          { validator: Vlidator.usc, trigger: 'blur' }
        ],
        ORGCode: [
          { validator: Vlidator.org, trigger: 'blur' }
        ],
        isChecked: [
          { validator: Vlidator.agree, trigger: 'blur' }
        ],
        RegisteredCapital: [
          { validator: Vlidator.rec, trigger: 'blur' }
        ],
        StaffNum: [
          { validator: Vlidator.stn, trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
  	EntityTypeLabel(){
  		return this.form1.EntityType==0 ? '业主' : '维保商';
  	}
  },
  methods: {
    submitForm() {
      let vm = this
      let isForm1Right = false
      let isForm2Right = false
      vm.$refs.form1.validate((valid) => {
        if (valid) {
          isForm1Right = true
        } else {
          console.log('error submit!!');
        }
      });
      vm.$refs.form2.validate((valid) => {
        if (valid) {
          isForm2Right = true
        } else {
          console.log('error submit!!');
        }
      });
      if (isForm1Right && isForm2Right) {
        vm.apply()
      } else {
        vm.$message.error('填写内容有误,请重新检查后再提交')
        console.log('error submit!!');
      }
    },
    apply() {
      let vm = this
      let f = vm.form2
      let f1 = vm.form1
      let params = {
        "CompanyName": f.CompanyName,
        "ApplyName": f.ApplyName,
        "ApplyPhone": f.ApplyPhone,
        "EntityType": f1.EntityType,
        "ApplyPosition": f.ApplyPosition,
        "ApplyEmail": f.ApplyEmail,
        "USCCode": f.USCCode,
        "ORGCode": f.ORGCode,
        "RegisteredAddress": f.RegisteredAddress,
        "RegisteredCapital": f.RegisteredCapital,
        "LegalBody": f.LegalBody,
        "StaffNum": f.StaffNum,
        "IndustryId": f.IndustryIdSet
      }
      POST(URL.APPLY, params).then(function(response) {
        let res = response.data
        if (FUNC.checkCode(res.State, res.Message)) {
          vm.$message({
            type: 'success',
            message: '提交成功!'
          });
          vm.isRegisterSucess = true
        }
      })
    },
    bindName() {
      let vm = this
      if (vm.isBindName) vm.form2.CompanyName = `${vm.form2.ApplyName}${vm.form2.ApplyPhone}`
    },
    //设置所属行业下拉框
    setIndustryOpts() {
      let vm = this
      vm.loadingIndustryOpts = true
      let params = {
        // "AccessToken": FUNC.storage.get("AccessToken"),
      }
      let url = URL.INDUSTRY
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let opts = res.Data
            vm.IndustryOpts = opts
            vm.IndustryOpts.splice(0, 1) //删除"请选择行业"的多余选项
            // console.log(vm.IndustryOpts)
            vm.loadingIndustryOpts = false
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    goback() {
      let vm = this
      vm.$confirm('点击确定，未提交的信息将无法保存，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.$router.replace("login");
      }).catch(() => {})
    },
    setHeight() {
      let vm = this
      let el = vm.$refs.regWrap
      let height = `${document.body.clientHeight}px`
      // console.log(height)
      el.style.height = height
    },
    resizeFun() {
      let vm = this
      FUNC.debounce(vm.timeId, vm, 'setHeight')
    }
  },
  mounted() {
    let vm = this
    vm.setIndustryOpts()
    vm.$nextTick(function() {
      vm.setHeight()
    })
    window.addEventListener('resize', vm.resizeFun)
  },
  beforeDestroy: function() {
    let vm = this
    window.removeEventListener('resize', vm.resizeFun)
  }

}

</script>

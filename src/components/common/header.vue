<style lang='less' scoped>
#header {
  z-index: 301;
  height: 50px;
  background: #162433;
  color: #FEFEFE;
}

.EOSlogo {
  position: relative;
  top: 9px;
  left: 15px;
}

.headerR {
  position: absolute;
  top: 0px;
  right: 0;
  z-index: 3;
  height: 50px;
  & .logoBlo {
    border-left: 1px solid #324057;
    float: left;
    width: 128px;
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    transition: background .8s;
    cursor: pointer;
    & img {
      margin-right: 5px;
    }
  }
  & .logoBlo:hover {
    background: #324057;
  }
  & .inforBlo {
    width: 165px;
    height: 50px;
    line-height: 50px;
    & img {
      margin: 11px 15px 0 5px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    & p {
      max-width: 90px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    & p:first-child {
      line-height: 13px;
      padding-top: 12px;
      font-size: 10px;
      transform: scale(.9);
      text-align: right;
    }
    & p:last-child {
      line-height: 16px;
      text-align: right;
      font-size: 12px;
      padding-top: 2px;
      padding-right: 3px;
    }
  }
}

.fl {
  float: left;
}

.fr {
  float: right;
}

.accountCtr {
  z-index: 401;
  width: 165px;
  height: 70px;
  background: #0F1C29;
  position: absolute;
  top: 50px;
  right: 0;
  & p {
    text-align: center;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    transition: all .8s;
  }
  & p:hover {
    background: #324057;
    color: #1ABC9C;
  }
}

</style>
<template>
  <div>
    <header id="header" style="position: fixed; left:0;top:0;width: 100%;">
      <img :src="logoPng" alt="" class="EOSlogo" />
      <transition name="el-zoom-in-top">
        <div class="accountCtr" v-show='isShowAccCtr'>
          <p @click="$router.push({ name: 'information' })">个人信息</p>
          <p @click='logout'>退出登录</p>
        </div>
      </transition>
      <div class="headerR">
        <div class="logoBlo" @click='open()'>
          <img :src="epayPng" alt=""/>电子商城
        </div>
        <div class="logoBlo" v-show='false'>
          <img :src="edevPng" alt="" />易速派
        </div>
        <div class="logoBlo inforBlo" @click.stop='isShowAccCtr=!isShowAccCtr'>
          <img class="lazy-avatar fr" v-lazy="userLogo" alt="" />
          <div class="fr">
            <p :title="CompanyFullName">{{CompanyFullName}}</p>
            <p>{{userName}}</p>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>
<script>
import logoPng from 'assets/images/logo/ECSlogo.png'
import epayPng from 'assets/images/logo/epay.png'
import edevPng from 'assets/images/logo/edev.png'
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const URL = Common.Const.url
const POST = FUNC.axios.post
export default {
  name: "header",
  data() {
    return {
      logoPng,
      epayPng,
      edevPng,
      userName: '',
      userLogo: '',
      isShowAccCtr: false
    }
  },
  props: ['CompanyFullName'],
  methods: {
    open() {
      let Account = FUNC.storage.get("Account")
      let EBTimeSpan = FUNC.storage.get("EBTimeSpan")
      let EBCodeValue = FUNC.storage.get("EBCodeValue")
      let url = `http://shop.cleos.com.cn/user.php?act=no_landing&Account=${Account}&PlatformType=1&EBTimeStamp=${EBTimeSpan}&EBCodeValue=${EBCodeValue}`
      window.open(url)
    },
    logout() {
      let vm = this
      let data = {
        "Account": FUNC.storage.get("Account"),
        "AccessToken": FUNC.storage.get("AccessToken")
      }
      let url = URL.LOGOUT
      POST(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            FUNC.storage.remove(["Account", "AccessToken", "AccountId", "AccountType", "AccountTypeName", "CompanyAddress", "CompanyFullName", "CompanyId", "CompanyShortName", "EmployeeNo", "Gender", "MyName", "ProfilePhoto", "Wechat", "QQ", "WorkEmail", "WorkMobile", "WorkPhone", "DepartmentName", "DepartmentId", 'EBCodeValue', 'EBTimeSpan']);
            // vm.$message.success('您已安全退出')
            vm.$router.push('/login');
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    }
  },
  mounted() {
    let vm = this;
    vm.userLogo = FUNC.storage.get('ProfilePhotoURL');
    vm.userName = FUNC.storage.get('MyName');

    let ecos = document.querySelector('#ecos')
    ecos.onclick = function() {
      vm.isShowAccCtr = false
    }
  }
}

</script>

<template>
  <div id="verifyCheck_1">
    <div class="form-horizontal content-box" style="border:none; margin-top:0;border-bottom: 1px solid #e9ecef;">
      <div class="form-group">
        <label class="content-title-left">业主公司:</label>
        <div class="col-lg-6 col-xs-9">
          <p class="form-control-static">{{propsData.OwnerCompanyName}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="content-title-left">负责人:</label>
        <div class="col-lg-6 col-xs-9">
          <select id="chargers" :disabled="!isCanSelect" v-model="userId" class="form-control selectpicker" data-size="8" data-style="btn-white">
            <option value="">选择负责人</option>
            <option v-for="item in companyUsers" :value="item.UserId">{{item.UserName}}</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="content-title-left">负责人联系电话:</label>
        <div class="col-lg-6 col-xs-9">
          <p class="form-control-static">{{WorkMobile}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="content-title-left">负责人电子邮箱:</label>
        <div class="col-lg-6 col-xs-9">
          <p class="form-control-static">{{WorkEmail}}</p>
        </div>
      </div>
      <div class="form-group">
        <label class="content-title-left"></label>
        <div class="col-lg-6 col-xs-9">
          	<label>
          		<input :disabled='!isCanSelect' checked="isAcceptInfo==1" v-model='isAcceptInfo' :value="isAcceptInfo" type="checkbox">接受告警短信/邮件
    		</label>
        </div>
      </div>
      <div class="form-group" v-if='isCanSelect'>
        <label class="content-title-left"></label>
        <div class="col-lg-5 col-xs-8 pl-22">
          <button @click="btnSave()" type="submit" class="btn btn-default pull-left">确定</button>
        </div>
      </div>
    </div>
    <!--手动录入结束-->
  </div>

</template>

<script>
  import commonFn from '../../../../../../assets/js/common/commonFunc'
  let projectContr = commonFn.projectContr;
  export default {
    data() {
      return {
        companyUsers: '',

        WorkEmail: '',
        WorkMobile: '',
        userId: '',
        UserName: '',
        isAcceptInfo: '',
        EntitySort: '',
        IsAdmin: 0,
        IsTrue: 0,
        IsProjectAdmin: 0
      }
    },
    props: {
      propsData: Object,
      getCompanyUsers: Array,
      getIsDualId: Number
    },
    computed: {
      isCanSelect() {
        return projectContr.isCanEditChargersInfo( this.EntitySort, this.IsAdmin, this.getIsDualId, this.IsTrue, this.IsProjectAdmin );
      }
    },
    mounted: function() {
      var _this = this;
      _this.EntitySort = eosCommon.storage.get( 'EntitySort' );
      _this.IsAdmin = eosCommon.storage.get( 'IsAdmin' );
      _this.IsTrue = eosCommon.storage.get( 'IsTrue' );
      _this.IsProjectAdmin = eosCommon.storage.get( 'IsProjectAdmin' )
      _this.$nextTick( function() {
        $( '#chargers' ).selectpicker( 'refresh' );
      } );
      _this.GetCompanyUser();
    },
    methods: {
      btnSave: function() {
        var _this = this;
        var param = {
          "AccessToken": eosCommon.storage.get( "AccessToken" ),
          "Parameters": {
            "ProjectId": _this.propsData.ProjectId, //--项目Id(必填)
            "AccountId": _this.userId, //--项目负责人Id(必填)
            "IsAcceptPush": _this.isAcceptInfo == true ? 1 : 0 //-- 业主是否接收告警短信/邮件:0-否;1-是
          }
        }
        var url = eosCommon.ENTERPRISE_API + "api/project/ChangeProjecLeader";
        eosCommon.eosAjax( url, "POST", param, "json", function( result ) {
          if( eosCommon.checkCode( result.State, result.Message ) ) {
            eosCommon.eosMessage( "success", eosCommon.UPDATE_MSG );
            _this.$router.go( -1 );
          }
        } )
      },
      initEditDatas: function() {
        var _this = this;
        _this.isAcceptInfo = _this.propsData.IsAcceptPush;
        var companyUsers = _this.companyUsers;
        var len = companyUsers.length;
        for( var i = 0; i < len; i++ ) {
          if( _this.propsData.ProjectLeader == companyUsers[ i ].UserId ) {
            _this.userId = companyUsers[ i ].UserId;
            _this.WorkMobile = companyUsers[ i ].WorkMobile
            _this.WorkEmail = companyUsers[ i ].WorkEmail
            $( "#chargers option[value='" + _this.userId + "']" ).prop( "selected", true );
            $( "#chargers" ).selectpicker( 'refresh' );
          }
        }
      },
      GetCompanyUser: function() {
        var _this = this;
        var param = {
            "AccessToken": eosCommon.storage.get( 'AccessToken' ),
            "CompanyId": _this.propsData.OwnerCompanyId
          },
          url = eosCommon.ENTERPRISE_API + "Api/AccountOperation/GetCompanyUser";
        eosCommon.eosAjax( url, 'GET', param, 'json', function( result ) {
          if( eosCommon.checkCode( result.State, result.Message ) ) {
            _this.companyUsers = result.Data;
            _this.$nextTick( function() {
              $( "#chargers" ).selectpicker( 'refresh' );
            } )
            _this.initEditDatas();
            _this.changeCharge();
          }
        } );

      },
      changeCharge: function() {
        var _this = this;
        $( '#chargers' ).change( function() {
          var companyUsers = _this.companyUsers;
          var len = companyUsers.length;
          for( var i = 0; i < len; i++ ) {
            if( _this.userId == companyUsers[ i ].UserId ) {
              _this.WorkMobile = companyUsers[ i ].WorkMobile
              _this.WorkEmail = companyUsers[ i ].WorkEmail
            }
          }
        } );
      }
    }

  }
</script>
<style scoped="scoped" type="text/css">
  .form-horizontal:hover {
    border: none!important;
    min-height: 700px;
  }
</style>
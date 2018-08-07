<template>
  <div id="verifyCheck_1">
    <div class="form-horizontal content-box" style="border:none; margin-top:0;">
      <div class="row">
        <div class="col-lg-12" style="margin: 15px;">
          <div class="content-box code_box">
            <div class="">
              <h3 class="code_title">项目维保关联码							
								<span class=" pull-right" style="margin-top: -9px;">
			                        <button id="btnInsert" type="button" class="btn btn-default" v-on:click="generateCode('2')">
			                            <i class="fa  fa-retweet m-r-5"></i>生成
			                        </button>
			                    </span>
							</h3>
            </div>
            <div class="code form-inline">
              <div class="form-group col-lg-6 col-xs-6">
                <div class='mt30'>
                  <label class="content-title-left"><em class="ak_required_em"></em>字符码:</label>
                  <div class="col-lg-6 col-xs-6">
                    <input id="txtProjectName" v-model="wb_code_val" type="text" maxlength="25" readonly="readonly" class="form-control" @focus="generateCode('2')" />
                  </div>
                </div>
              </div>
              <div class="form-group col-lg-6 col-xs-6">
                <label class="content-title-left" style="top: 30px;"><em class="ak_required_em"></em>二维码:</label>
                <div class="col-lg-6 col-xs-6">
                  <div id="wb_code" class="code_s img-thumbnail text-center" @click="generateCode('2')">
                    <small>点击生成二维码</small>
                  </div>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
            <p class='tip'>提示：维保码用来更换项目的维保商，新维保商扫描并审核通过后，新维保商可以看到该项目并拥有相关权限，旧维保商看不到该项目。</p>
          </div>
          <div class="content-box code_box" style="margin-top: 40px;">
            <div class="">
              <h3 class="code_title">项目业主拥有码							
							<span class=" pull-right" style="margin-top: -9px;">
		                        <button id="btnInsert" type="button" class="btn btn-default" v-on:click="generateCode('1')">
		                            <i class="fa  fa-retweet m-r-5"></i>生成
		                        </button>
		                    </span>
							</h3>
            </div>
            <div class="code form-inline">
              <div class="form-group col-lg-6 col-xs-6">
                <div class="mt30">
                  <label class="content-title-left"><em class="ak_required_em"></em>字符码:</label>
                  <div class="col-lg-6 col-xs-6">
                    <input id="txtProjectName" v-model="yz_code_val" type="text" maxlength="25" readonly="readonly" class="form-control" @focus="generateCode('1')" />
                  </div>
                </div>
              </div>
              <div class="form-group col-lg-6 col-xs-6">
                <label style="top: 30px;" class="content-title-left"><em class="ak_required_em"></em>二维码:</label>
                <div class="col-lg-6 col-xs-6">
                  <div id="yz_code" class="code_s img-thumbnail text-center" @click="generateCode('1')">
                    <small>点击生成二维码</small>
                  </div>
                </div>
              </div>
              <div class="clearfix">
              </div>
            </div>
            <p class='tip'>提示：拥有码用来更换项目的业主，新业主扫描并审核通过后，新业主可以看到该项目并拥有相关权限，旧业主看不到该项目。</p>
          </div>
        </div>
        <!--手动录入结束-->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      wb_code_val: '',
      yz_code_val: ''
    }
  },
  props: {
    propsData: Object
  },
  mounted: function() {

  },
  methods: {

    generateCode: function(CodeType) {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "ProjectId": _this.propsData.ProjectId, //--项目Id(必填)
          "CodeType": CodeType
        }
      }
      var url = eosCommon.ENTERPRISE_API + "api/project/CreateLinkCode";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          var str = '';
          if (CodeType == '2') {
            _this.wb_code_val = result.Data;
            str = _this.toUtf8(_this.wb_code_val);
            $("#wb_code").empty();
            $("#wb_code").qrcode({
              render: "table",
              width: 100,
              height: 100,
              text: str,
            });
          } else {
            _this.yz_code_val = result.Data;
            str = _this.toUtf8(_this.yz_code_val);
            $("#yz_code").empty()
            $("#yz_code").qrcode({
              render: "table",
              width: 100,
              height: 100,
              text: str,
            });
          }
          eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
        }
      })
    },
    toUtf8: function(str) {
      var out, i, len, c;
      out = "";
      len = str.length;
      for (i = 0; i < len; i++) {
        c = str.charCodeAt(i);
        if ((c >= 0x0001) && (c <= 0x007F)) {
          out += str.charAt(i);
        } else if (c > 0x07FF) {
          out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
          out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        } else {
          out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
          out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
        }
      }
      return out;
    }

  }


}

</script>
<style scoped="scoped" type="text/css">
.mt30 {
  margin-top: 30px;
}

.tip {
  width: 100%;
  text-align: center;
  padding: 20px 0;
  color: #1abc9c
}

.code_title {
  background: #eff2f7;
  margin: 0;
  padding: 15px;
  color: #1f2d3d;
  font-size: 16px;
  font-weight: bold;
}

.code_box {
  padding: 0;
  border: 1px solid #e2e6e9;
}

.form-horizontal:hover {
  border: none!important;
  min-height: 700px;
}

.code {
  padding-top: 30px;
  /*padding: 30px 0 0;*/
  overflow: hidden;
}

#wb_code {}

.code_s {
  position: relative;
  width: 100px;
  height: 87px;
  line-height: 87px;
  border: 1px solid #e2e6e9;
  box-sizing: content-box;
  cursor: pointer;
  /*background: #eff2f7;*/
}

.code_s small {
  margin: 0 auto;
  color: #8694a8;
}

</style>

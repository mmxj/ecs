<template>
  <div>
    <div id="app-1">
      <!--网关信息开始-->
      <div id="EosBaseDve2">
        <!--网关发行列表开始-->
        <div id="EosBaseDveList" class="card-box table-responsive">
          <div class="row">
            <div class="col-sm-6 col-md-4 col-lg-2">
              <span class="size20 font-bold">网关发行</span>
            </div>
          </div>
          <hr class="divider mb-10 mt-10">
          <div class="row">
            <div class="col-lg-12">
              <span class="OrgTopAligin OperatorInsert">
                                <button id="btnInsertDev" type="button" class="btn btn-default" v-on:click="btnInsertDev()">
                                    <i class="fa fa-plus m-r-5"></i>新增
                                </button>
                            </span>
              <span class="OrgTopAligin OperatorImports">
                                <button id="EosBaseStockImport" type="button" class="btn btn-default" v-on:click="EosBaseStockImport()">
                                    批量导入
                                </button>
                            </span>
              <span class="OperatorSearch">
                                <span class="OrgTopAligin">
                                    <select id="selQueryIssuedTo" class="form-control selectpicker" data-size="5" data-style="btn-white" v-on:change="change_selQueryIssuedTo()">
                                        <option value="">客户名称</option>
                                    </select>
                                 </span>
              <span class="OrgTopAligin">
                                        <input id="txtQueryGatewayId" type="search" class="form-control" placeholder="网关ID">
                                    </span>
              <span class="OrgTopAligin">
                                        <button id="btnQuery" type="button" class="btn btn-default" v-on:click="btnQuery()">
                                            <i class="fa fa-search m-r-5"></i>查找
                                        </button>
                                    </span>
              </span>
            </div>
          </div>
          <table id="exampleDev2" class="table table-striped table-bordered" width="100%">
            <thead>
              <tr>
                <th>序号</th>
                <th>网关ID</th>
                <th>网关名称</th>
                <th>SIM卡号</th>
                <th>客户名称</th>
                <th>发行日期</th>
                <th>描述</th>
                <th class="w-80">操作</th>
              </tr>
            </thead>
          </table>
        </div>
        <!--网关发行列表结束-->
        <!--增加网关信息开始-->
        <div id="EosBaseDveAdd" class="card-box table-responsive" style="display: none">
          <div class="row">
            <div class="col-md-6">
              <span class="size20 font-bold headerTitle">新增网关发行</span>
            </div>
            <div class="col-md-6">
              <button v-on:click="btnReturn()" type="button" class="btn btn-white waves-effect waves-light pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
            </div>
          </div>
          <hr class="divider mb-10 mt-10">
          <div class="row">
            <div class="col-md-12">
              <div id="verifyCheck">
                <div class="form-horizontal content-box ">
                  <div class="form-group">
                    <label class="content-title-left">
                      <em class="ak_required_em">*</em>网关ID
                    </label>
                    <div class="col-lg-5 col-xs-8">
                      <span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
                      <input id="txtGatewayId" type="text" maxlength="12" class="form-control required" data-valid="isNonEmpty||between:12-12||isComputerphobe" data-error="网关ID不能为空||网关ID长度为12位||网关ID不能出现中文" placeholder="请输入出厂配置的网关ID" />
                      <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                      <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left">SIM卡号</label>
                    <div class="col-lg-5 col-xs-8">
                      <input id="txtSimImsi" type="text" maxlength="18" class="form-control" placeholder="请输入出厂配置的SIM卡号" />
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left text-right">
                      <em class="ak_required_em">*</em>客户名称
                    </label>
                    <div class="col-lg-5 col-xs-8">
                      <select-company></select-company>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="content-title-left">
                      <em class="ak_required_em">*</em>发行日期
                    </label>
                    <div class="col-lg-5 col-xs-8">
                      <span class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                                <input id="txtIssueDate" class="form-control required" data-valid="isNonEmpty" data-error="发行日期不能为空" size="16" type="text" value="" readonly placeholder="发行日期" disabled="disabled">
                                                <div style="position: absolute;">
                                                    <span class="valid-form-group-addon">
                                                        <label class="focus valid"></label>
                                                    </span>
                    </div>
                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                    </span>
                    <input type="hidden" id="dtp_input1" value="" />
                  </div>
                </div>
                <div class="form-group">
                  <label class="content-title-left">
                    <em class="ak_required_em"></em>数据采集周期
                  </label>
                  <div class="col-lg-5 col-xs-8">
                    <span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
                    <input id="txtGatewayId" v-model="DataPickPeroid" value="" placeholder="单位：秒" type="text" maxlength="12" class="form-control" />
                  </div>
                  <!--<span class='DataPickPeroidEdit OperatorBtnSet OperatorSet' @click="DataPickPeroidEdit()" v-if="isPickPeroidShow"  data='2' title='修改默认值'><i class='fa fa-cog'></i></span>-->
                </div>
              </div>
              <div class="form-horizontal mt-10 content-box ">
                <div class="form-group">
                  <label class="content-title-left text-right">描述</label>
                  <div class="col-lg-5 col-xs-8">
                    <textarea id="txtRemark" class="form-control" maxlength="100">描述内容</textarea>
                  </div>
                </div>
              </div>
              <div class="content-box-footer ">
                <div class="form-group">
                  <label class="content-title-left text-right"></label>
                  <div class="col-lg-5 col-xs-8 ml-10">
                    <button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="btnReturn()">取消</button>
                    <button id="btnSave" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中..." v-on:click="btnSave()">保存</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--增加网关信息结束-->
      <!--网关导入信息开始-->
      <div id="EosBaseDveImport" class="card-box table-responsive" style="display: none">
        <div class="row">
          <div class="col-md-6">
            <span class="size20 font-bold">网关导入</span>
          </div>
          <div class="col-md-6">
            <button v-on:click="btnReturn()" type="button" class="btn btn-white waves-effect waves-light pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
          </div>
        </div>
        <hr class="divider mb-10 mt-10">
        <div class="row">
          <div class="col-md-12">
            <div id="fileBox">
              <div class="alert alert-info alert-dismissable">
                <strong>导入说明</strong> 1、先下载网关出库模版，在对应列填上相应数据。注意，导入文件中的数据行不能超过1万行！
                <span class="label label-info p-8"><a class="text-white" href="../../../../static/doc/网关出库模板.xlsx" target="_blank">下载网关出库模版</a></span>
              </div>
              <div id="fileBox1"></div>
            </div>
            <div class="mt-20">
              <div class="form-group">
                <div class="bg-white">
                  <table id="viewImport" class="table table-striped table-bordered" width="100%">
                    <thead>
                      <tr>
                        <th>序号</th>
                        <th>网关ID</th>
                        <th>SIM卡号</th>
                        <th>出库日期</th>
                        <th>客户名称</th>
                        <th>数据采集周期</th>
                        <th>备注</th>
                        <th>验证结果</th>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
            <div class="content-box-footer-import">
              <div class="form-group">
                <button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="btnReturn()">取消</button>
                <button id="btnSaveTemplateData" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中..." data-dismiss="modal" v-on:click="btnSaveTemplateData()">保存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--网关导入信息结束-->
    </div>
  </div>
  <!--网关信息结束-->
  </div>
</template>
<script>
import selectCompany from '../../../common/select-company.vue';
var IssueItemId = '',
  tableDev = '',
  btn = '',
  viewImport = '';
export default {
  data: function() {
    return {
      saveImportData: [],
      errorSign: 0,
      CompanyName: '',
      DataPickPeroid: '',
      isEditDataPickPeroid: false,
      isPickPeroidShow: true,
      OldDataPickPeroid: '',
      GatewayIdEdit: '',
    }
  },
  components: {
    selectCompany
  },
  methods: {

    btnReturn_d: function() {
      var _this = this;
      _this.getDataPickPeroid();
      _this.isEditDataPickPeroid = false;
      $("#EosBaseDveAdd").show();
    },
    btnSave_d: function() {
      var _this = this;
      if (!verifyCheck._click("myVerifyCheck")) {

        return false;
      }

      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "DefaultDataPickPeroid": _this.DataPickPeroid
        }
      };
      console.log(JSON.stringify(param))
      var url = eosCommon.PLATFORM_API + "api/base/UpdateDefaultDataPickPeroid";
      eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          console.log('更新结果：', result)
          _this.getDataPickPeroid();
          _this.isEditDataPickPeroid = false;
          $("#EosBaseDveAdd").show();
          btn = $(".loading_btn").button('loading');

        }
      });



    },
    getDataPickPeroid: function() {
      var _this = this;

      var param = { "AccessToken": eosCommon.storage.get("AccessToken") };
      var url = eosCommon.PLATFORM_API + "api/base/QueryDefaultDataPickPeroid";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          console.log('默认值：', result)
          _this.DataPickPeroid = result.Data;
        }
      });
    },
    bind_selQueryIssuedTo: function() {
      var param = { "AccessToken": eosCommon.storage.get("AccessToken") };
      var url = eosCommon.COMMON_API + "api/common/company";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          var json = result.Data.Result;
          var selQueryIssuedTo = $("#selQueryIssuedTo");
          selQueryIssuedTo.empty();
          selQueryIssuedTo.append("<option value=''>客户名称</option>");
          for (var ind in json) {
            selQueryIssuedTo.append("<option value='" + json[ind].CompanyId + "'>" + json[ind].CompanyShortName + "</option>");
          }
          $("#selQueryIssuedTo").selectpicker('refresh');
        }
      });
    },
    load_TableView: function() {
      var _this = this;
      verifyCheck({ formId: 'verifyCheck', onBlur: null, onFocus: null, onChange: null, successTip: true, resultTips: null, clearTips: null, code: true, phone: true });
      $('#txtQueryGatewayId').bind('keypress', function(event) {
        if (event.keyCode == "13") {
          tableDev.ajax.reload();
        }
      });
      tableDev = $('#exampleDev2').DataTable({
        pagingType: "full_numbers",
        processing: true,
        deferRender: true,
        dom: "Bfrtip",
        buttons: [],
        responsive: !0,
        serverSide: true,
        ajax: function(data, callback, settings) {
          var CompanyName = $("#selQueryIssuedTo option:selected").text();
          if ($("#selQueryIssuedTo option:selected").text() == "客户名称") {
            CompanyName = "";
          }
          var param = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "PageSize": data.length,
            "PageIndex": (data.start / data.length) + 1,
            "Parameters": {
              "GatewayId": $('#txtQueryGatewayId').val().trim(),
              "CompanyName": CompanyName
            }
          };
          var url = eosCommon.PLATFORM_API + "api/base/QueryStockOut";
          eosCommon.eosAjax(url, "GET", param, "json", function(result) {
            if (eosCommon.checkCode(result.State, result.Message)) {
              var returnData = {};
              if (result.Data == "") {
                returnData.draw = data.draw;
                returnData.recordsTotal = 0;
                returnData.recordsFiltered = 0;
                returnData.data = [];
              } else {
                returnData.draw = data.draw;
                returnData.recordsTotal = result.Data.Total;
                returnData.recordsFiltered = result.Data.Total;
                returnData.data = result.Data.Result;
              }
              callback(returnData);
              eosCommon.eosOperators(eosCommon.eosOperDataHandle());
            }
          });
        },
        "columns": [
          { defaultContent: "" },
          { data: "GatewayId" },
          { data: "GatewayName" },
          { data: "SimImsi" },
          { data: "CompanyShortName", className: "txt_lt" },
          { data: "IssueDate" },
          { data: "Remark", className: "txt_lt" },
          { "defaultContent": "<span class='OperatorBtnEdit OperatorEdit'  data='2' title='修改网关'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除设备' data-toggle='modal' data-target='#modal-cleos'><i class='fa fa-trash-o'></i></span>" }
        ]
      });
      tableDev.on('draw.dt', function() {
        tableDev.column(0, {
          search: 'applied',
          order: 'applied'
        }).nodes().each(function(cell, i) {
          i = i + 1;
          var page = tableDev.page.info();
          var pageno = page.page;
          var length = page.length;
          var columnIndex = (i + pageno * length);
          cell.innerHTML = columnIndex;
        });
      });
      $('#exampleDev2 tbody').on('click', 'tr', function() {
        if ($(this).hasClass('selected')) {
          $(this).removeClass('selected');
        } else {
          tableDev.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
        }
      });
      $('#exampleDev2 tbody').on('click', 'span', function() {
        var data = tableDev.rows($(this).parents('tr')).data();
        var isNum = $(this).attr("data");
        if (isNum == "2") {
          //编辑信息赋值 函数
          // console.log('ggggggg')

          IssueItemId = data[0].IssueItemId;
          _this.bindEosBaseDveAdd(data);
          _this.DataPickPeroid = data[0].DataPickPeroid;
          _this.OldDataPickPeroid = data[0].DataPickPeroid;
          _this.GatewayIdEdit = data[0].GatewayId;

          // console.log('网关ID',data[0].GatewayId)
          $('#btnSave').attr("data", "2");
          $('.headerTitle').html('修改网关');

          $('#EosBaseDveAdd').show();
          $('#EosBaseDveList').hide();
          $('#EosBaseDveImport').hide();
          _this.isPickPeroidShow = false;
          // console.log('isPickPeroidShow:', _this.isPickPeroidShow)
        } else if (isNum == "3") {
          //删除信息赋值 函数
          IssueItemId = data[0].IssueItemId;
          vdialog({
            type: 'confirm',
            title: '提示',
            content: eosCommon.DELETE_MSG_ASK,
            ok: function() { _this.delRequest(); },
            cancel: true,
            modal: true
          });
        }
      });
    },
    change_selQueryIssuedTo: function() {
      tableDev.ajax.reload();
    },
    btnQuery: function() {
      tableDev.ajax.reload();
    },
    btnInsertDev: function() {
      //添加信息赋值函数
      var _this = this;
      _this.getDataPickPeroid();
      _this.bindEosBaseDveAdd(null);
      $('#btnSave').attr("data", "1");
      _this.isPickPeroidShow = true;
      $('.headerTitle').html('新增网关发行');
      $('#EosBaseDveList').hide();
      $('#EosBaseDveImport').hide();
      $('#EosBaseDveAdd').show();
    },
    btnReturn: function() {
      $('#EosBaseDveList').show();
      $('#EosBaseDveAdd').hide();
      $('#EosBaseDveImport').hide();
    },
    bindEosBaseDveAdd: function(data) {
      eosCommon.resetFrom();
      if (data == null) {
        $('#txtGatewayId').removeAttr("disabled");
        $('#txtGatewayId').val("");
        $('#txtSimImsi').val("");
        $('#txtCompanyName').val("");
        $('#hidCompanyId').val("");
        $('#txtIssueDate').val("");
        $('#txtRemark').val("");
      } else {
        $('#txtGatewayId').val(data[0].GatewayId);
        $('#txtGatewayId').attr("disabled", "disabled");
        $('#txtSimImsi').val(data[0].SimImsi);
        $('#txtCompanyName').val(data[0].CompanyShortName);
        $('#hidCompanyId').val(data[0].IssuedTo);
        $('#txtIssueDate').val(data[0].IssueDate);
        $('#txtRemark').val(data[0].Remark);
      }
    },
    btnSave: function() {

      var isNum = $('#btnSave').attr("data");
      if (isNum == "2") {
        console.log('22222222')
        if (!verifyCheck._click("verifyCheck")) {
          return false;
        } else {
          this.editRequest();

          btn = $(".loading_btn").button('loading');
        }
      } else if (isNum == "1") {
        console.log('拦住了11')
        if (!verifyCheck._click("verifyCheck")) {
          console.log('拦住了')
          return false;
        } else {
          eosCommon.resetFrom()
          this.addRequest();
          btn = $(".loading_btn").button('loading');
        }
      }
    },
    addRequest: function() {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "GatewayId": $('#txtGatewayId').val(),
          "SimImsi": $('#txtSimImsi').val(),
          "IssuedTo": $('#hidCompanyId').val(),
          "IssueDate": $('#txtIssueDate').val(),
          "Remark": $('#txtRemark').val(),
          "DataPickPeroid": _this.DataPickPeroid
        }
      };
      var url = eosCommon.PLATFORM_API + "api/base/InsertStockOut";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
          tableDev.ajax.reload();
          _this.btnReturn();
          $(".loading_btn").button('reset');
        }
      });
    },
    editRequest: function() {
      var _this = this;

      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "IssueItemId": IssueItemId,
          "SimImsi": $('#txtSimImsi').val(),
          "IssuedTo": $('#hidCompanyId').val(),
          "IssueDate": $('#txtIssueDate').val(),
          "Remark": $('#txtRemark').val(),
          "NewDataPickPeroid": _this.DataPickPeroid,
          "OldDataPickPeroid": _this.OldDataPickPeroid,
          "GatewayId": _this.GatewayIdEdit
        }
      };
      var url = eosCommon.PLATFORM_API + "api/base/UpdateStockOut";
      eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
          tableDev.ajax.reload();
          _this.btnReturn();
          $(".loading_btn").button('reset');
        }
      });
    },
    delRequest: function() {
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "IssueItemId": IssueItemId
        }
      };
      var url = eosCommon.PLATFORM_API + "api/base/DeleteStockOut";
      eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
          tableDev.ajax.reload();
        }
      });
    },
    EosBaseStockImport: function() {
      var _this = this;
      $('#EosBaseDveList').hide();
      $('#EosBaseDveImport').show();
      $('#EosBaseDveAdd').hide();
      $("#fileBox1").empty();
      $("#fileBox1").html(
        '<div id="fileDnd1" class="uploader_box1 eos_uploader_box">' +
        '<div class="wu-example">' +
        '<div class="uploader-list"></div>' +
        '<div class="btns">' +
        '<div id="picker">选择上传文件</div>' +
        '</div>' +
        '</div>' +
        '</div>'
      );
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken")
      };
      eosCommon.eosUploaderFile({
        'uploaderObj': 'uploaderFile',
        'uploaderBox': '.uploader_box1',
        'uploaderList': '.uploader-list',
        'initBtn': '#picker',
        'serverUrl': eosCommon.PLATFORM_API + "api/upload/StockOut",
        'data': param,
        'fileNumLimit': 1,
        'upType': 1,
        'succ': function(result) {
          if (eosCommon.checkCode(result.State, result.Message)) {
            var viewImportData = [];
            this.saveImportData = [];
            this.errorSign = 0;
            for (var i = 0; i < result.Data.TotalRows; i++) {
              var viewTemp = {};
              viewTemp.RowId = result.Data.UploadData[i]['序号'];
              viewTemp.GatewayId = result.Data.UploadData[i]['网关ID'];
              viewTemp.IMSI = result.Data.UploadData[i]['IMSI'];
              viewTemp.IssueDate = result.Data.UploadData[i]['出库日期'];
              viewTemp.CompanyName = result.Data.UploadData[i]['客户名称'];
              viewTemp.Remark = result.Data.UploadData[i]['备注'];
              viewTemp.DataPickPeroid = result.Data.UploadData[i]['数据采集周期'];
              //viewTemp.DataPickPeroid = 5;

              viewTemp.Message = '正确';
              var bol = 0;
              for (var j = 0; j < result.Data.ErrorRows; j++) {
                if (result.Data.ErrorMessage[j]['RowId'] == result.Data.UploadData[i]['序号']) {
                  _this.errorSign++;
                  bol = 1;
                  viewTemp.Message = result.Data.ErrorMessage[j]['Message'];
                }
              }
              viewImportData.push(viewTemp);
              if (bol == 1) {
                continue;
              }

              var saveTemp = {};
              saveTemp.RowId = result.Data.UploadData[i]['序号'];
              saveTemp.GatewayId = result.Data.UploadData[i]['网关ID'];
              saveTemp.IMSI = result.Data.UploadData[i]['IMSI'];
              saveTemp.IssueDate = result.Data.UploadData[i]['出库日期'];
              saveTemp.CompanyName = result.Data.UploadData[i]['客户名称'];
              viewTemp.DataPickPeroid = result.Data.UploadData[i]['数据采集周期'];
              saveTemp.Remark = result.Data.UploadData[i]['备注'];
              _this.saveImportData.push(saveTemp);
            }
            _this.bindEosBaseDveImport(viewImportData);
          }
        },
        'del': function(result) {
          console.log(result)
          var viewImportData = [];
          this.saveImportData = [];
          this.errorSign = 0;
          this.bindEosBaseDveImport(viewImportData);
        }
      })
    },
    bindEosBaseDveImport: function(viewImportData) {
      viewImport = $('#viewImport').DataTable({
        pagingType: "full_numbers",
        processing: true,
        deferRender: true,
        dom: "Bfrtip",
        buttons: [],
        responsive: !0,
        lengthMenu: [
          [50, 100, 150, -1],
          [50, 100, 150, "All"]
        ],
        destroy: true,
        data: viewImportData,
        "columns": [
          { data: "RowId" },
          { data: "GatewayId" },
          { data: "IMSI" },
          { data: "IssueDate" },
          { data: "CompanyName" },
          { data: "DataPickPeroid" },
          { data: "Remark" },
          { data: "Message" }

        ],
        "columnDefs": [{
          "targets": [7],
          "render": function(data) {
            var html = '';
            if (data == "正确") {
              html = "正确";
            } else {
              html = "<p class='text-danger'>" + data + "</p>";
            }
            return html
          }
        }]
      });
      eosCommon.resetNiceScroll();
      $('#viewImport tbody').on('click', 'tr', function() {
        if ($(this).hasClass('selected')) {
          $(this).removeClass('selected');
        } else {
          viewImport.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
        }
      });
    },
    btnSaveTemplateData: function() {

      var _this = this
      if (_this.saveImportData.length <= 0) {
        vdialog({
          type: 'error',
          title: '提示',
          content: '批量导入中没有正确的数据可导入',
          ok: true,
          modal: true
        });
      } else if (_this.errorSign > 0 && _this.saveImportData.length > 0) {
        vdialog({
          type: 'error',
          title: '提示',
          content: '验证结果：' + _this.errorSign + '条错误，' + _this.saveImportData.length + '条正确，确定继续提交正确的数据吗？',
          ok: function() { _this.saveImport(); },
          modal: true
        });
      } else {
        console.log('2222')
        _this.saveImport();
      }
    },
    saveImport: function() {
      btn = $(".loading_btn").button('loading');
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": _this.saveImportData
      };
      var url = eosCommon.PLATFORM_API + "api/base/BatchStockOut";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
          tableDev.ajax.reload();
          _this.saveImportData = [];
          _this.errorSign = 0;
          _this.bindEosBaseDveImport(_this.saveImportData);
          _this.btnReturn();
          $(".loading_btn").button('reset');
        }
      });
    }
  },
  mounted: function() {
    this.bind_selQueryIssuedTo();
    this.load_TableView();
    $('.form_date').datetimepicker({
      format: 'yyyy-mm-dd hh:ii:ss',
      weekStart: 1,
      autoclose: true,
      forceParse: false,
      todayBtn: 1,
      todayHighlight: 1,
      language: 'zh-CN'
    });
    $("#txtIssueDate").change(function() {
      if ($("#txtIssueDate").val() != '') {
        $('#txtIssueDate').next('.valid-form-group-addon').find('.focus').html('');
      }
    });
  }
}

</script>
<style>


</style>

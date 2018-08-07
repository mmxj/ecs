<template>
  <div>
    <div id="EosBaseDve2">
      <!--网关入库列表开始-->
      <div id="EosBaseDveList" class="card-box table-responsive">
        <div class="row">
          <div class="col-sm-6 col-md-4 col-lg-2">
            <span class="size20 font-bold">网关入库</span>
          </div>
        </div>
        <hr class="divider mb-10 mt-10">
        <div class="row">
          <div class="col-lg-12">
            <span class="OrgTopAligin OperatorInsert">
                            <button id="btnInsertDev" type="button" class="btn btn-default">
                                <i class="fa fa-plus m-r-5"></i>新增
                            </button>
                        </span>
            <span class="OrgTopAligin OperatorImports">
                            <button id="EosBaseStockImport" type="button" class="btn btn-default">
                                批量导入
                            </button>
                        </span>
            <span class="OperatorSearch">
                            <span class="OrgTopAligin">
                                    <select id="selQueryGatewayModel" class="form-control selectpicker" data-style="btn-white">
                                        <option value="">网关型号</option>
                                        <option value="1">EOS-Link 100</option>
                                        <option value="2">EOS-Link 200</option>
                                        <option value="3">EOS-Link 300</option>
                                    </select>
                             </span>
            <span class="OrgTopAligin">
                                    <input id="txtQueryGatewayId" type="search" class="form-control" placeholder="网关ID">
                                </span>
            <span class="OrgTopAligin">
                                    <button id="btnQuery" type="button" class="btn btn-default">
                                        <i class="fa fa-search m-r-5"></i>查找
                                    </button>
                                </span>
            </span>
          </div>
        </div>
        <table id="exampleDev3" class="table table-striped table-bordered" width="100%">
          <thead>
            <tr>
              <th>序号</th>
              <th>网关ID</th>
              <th>网关型号</th>
              <th>资产编号</th>
              <th>出厂日期</th>
              <th>批次号</th>
              <th>联网方式</th>
              <th>是否出库</th>
              <th>是否启用</th>
              <th style="width: 60px;">操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <!--网关入库列表结束-->
      <!--查看网关详情开始-->
      <div id="EosBaseDveView" class="card-box table-responsive" style="display: none">
        <div class="row">
          <div class="col-md-6">
            <span class="size20 font-bold">网关详情</span>
          </div>
          <div class="col-md-6">
            <button type="button" class="btnReturn btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
          </div>
        </div>
        <hr class="divider mb-10 mt-10">
        <div class="row">
          <div class="col-md-12">
            <div class="form-horizontal mt-10 content-box">
              <div class="form-group">
                <label class="content-title-left text-right">网关ID</label>
                <div id="viewGatewayId" class="content-title-right"></div>
              </div>
              <hr class="divider">
              <div class="form-group">
                <label class="content-title-left text-right">网关型号</label>
                <div id="viewGatewayName" class="content-title-right"></div>
              </div>
              <hr class="divider">
              <div class="form-group">
                <label class="content-title-left text-right">资产编号</label>
                <div id="viewAssetsNo" class="content-title-right"></div>
              </div>
              <hr class="divider">
              <div class="form-group">
                <label class="content-title-left text-right">出厂日期</label>
                <div id="viewProductionDate" class="content-title-right"></div>
              </div>
              <hr class="divider">
              <div class="form-group">
                <label class="content-title-left text-right">批次号</label>
                <div id="viewBatchNo" class="content-title-right"></div>
              </div>
              <hr class="divider mb-20">
            </div>
            <div class="form-horizontal mt-10 content-box">
              <div class="form-group">
                <label class="content-title-left text-right">联网方式</label>
                <div id="viewNetModeName" class="content-title-right"></div>
              </div>
              <hr class="divider">
              <div class="form-group">
                <label class="content-title-left text-right">IP地址</label>
                <div id="viewIPAddress" class="content-title-right"></div>
              </div>
              <hr class="divider">
              <div class="form-group ">
                <label class="content-title-left text-right">MAC地址</label>
                <div id="viewMac" class="content-title-right"></div>
              </div>
              <hr class="divider mb-20">
            </div>
            <div class="form-horizontal mt-10 content-box">
              <div class="form-group">
                <label class="content-title-left text-right">固件版本号</label>
                <div id="viewFirmwareVersion" class="content-title-right"></div>
              </div>
              <hr class="divider">
              <div class="form-group">
                <label class="content-title-left text-right">软件版本号</label>
                <div id="viewSoftwareVersion" class="content-title-right"></div>
              </div>
              <hr class="divider mb-20">
              <div class="form-group">
                <label class="content-title-left text-right">升级方式</label>
                <div id="UpgradeWayName" class="content-title-right"></div>
              </div>
            </div>
            <div class="form-horizontal mt-10 content-box">
              <div class="form-group">
                <label class="content-title-left text-right">是否出库</label>
                <div id="viewIsStockOut" class="content-title-right"></div>
              </div>
              <hr class="divider">
              <div class="form-group">
                <label class="content-title-left text-right">是否启用</label>
                <div id="viewIsActive" class="content-title-right"></div>
              </div>
              <hr class="divider mb-20">
            </div>
            <div class="form-horizontal mt-10 content-box ">
              <div class="form-group">
                <label class="content-title-left text-right">描述</label>
                <div id="viewRemark" class="content-title-right"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--查看网关详情结束-->
      <!--增加网关信息开始-->
      <div id="EosBaseDveAdd" class="card-box table-responsive" style="display: none">
        <div class="row">
          <div class="col-md-6">
            <span class="size20 font-bold">新增网关入库</span>
          </div>
          <div class="col-md-6">
            <button type="button" class="btnReturn btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
          </div>
        </div>
        <hr class="divider mb-10 mt-10">
        <div class="row">
          <div class="col-md-12">
            <div id="verifyCheck">
              <div class="form-horizontal mt-10 content-box">
                <div class="form-group">
                  <label class="content-title-left">
                    <em class="ak_required_em">*</em>网关ID
                  </label>
                  <div class="col-lg-5 col-xs-8">
                    <span class="valid-form-group">
                                            <label class="focus valid"></label>
                                        </span>
                    <input id="txtGatewayId" type="text" maxlength="12" class="form-control required" data-valid="isNonEmpty||between:12-12||isComputerphobe" data-error="网关ID不能为空||网关ID长度为12位||网关ID不能出现中文" placeholder="请输入长度12位的网关ID" />
                    <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                  </div>
                </div>
                <div class="form-group">
                  <label class="content-title-left text-right">
                    <em class="ak_required_em">*</em>网关型号
                  </label>
                  <div class="col-lg-5 col-xs-8">
                    <select id="selGatewayModel" class="form-control selectpicker" data-style="btn-white">
                      <option value="1">EOS-Link 100</option>
                      <option value="2">EOS-Link 200</option>
                      <option value="3">EOS-Link 300</option>
                    </select>
                  </div>
                </div>
                <div class="form-group">
                  <label class="content-title-left text-right">
                    <em class="ak_required_em">*</em>出厂日期
                  </label>
                  <div class="col-lg-5 col-xs-8">
                    <span class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                            <input id="txtProductionDate" class="form-control required" data-valid="isNonEmpty" data-error="出厂日期不能为空" size="16" type="text" value="" readonly placeholder="出厂日期">
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
                  <em class="ak_required_em">*</em>批次号
                </label>
                <div class="col-lg-5 col-xs-8">
                  <span class="valid-form-group">
                                            <label class="focus valid"></label>
                                        </span>
                  <input id="txtBatchNo" type="text" maxlength="20" class="form-control required" data-valid="isNonEmpty||isInt" data-error="批次号不能为空||批次号只能为数字" placeholder="批次号" />
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box ">
              <div class="form-group">
                <label class="content-title-left">
                  <em class="ak_required_em">*</em>联网方式
                </label>
                <div class="col-lg-5 col-xs-8">
                  <div class="radio radio-custom radio-inline">
                    <input type="radio" name="NetMode" value="1" checked id="checkbox1">
                    <label for="checkbox1" id="netWork">
                      有线
                    </label>
                  </div>
                  <div class="radio radio-custom radio-inline">
                    <input type="radio" name="NetMode" value="2" id="checkbox2">
                    <label for="checkbox2">
                      GPRS
                    </label>
                  </div>
                  <div class="radio radio-custom radio-inline">
                    <input type="radio" name="NetMode" value="3" id="checkbox3">
                    <label for="checkbox3">
                      3G/4G
                    </label>
                  </div>
                  <div class="radio radio-custom radio-inline">
                    <input type="radio" name="NetMode" value="4" id="checkbox4">
                    <label for="checkbox4">
                      其它
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left">
                  <em class="ak_required_em">*</em>IP地址
                </label>
                <div class="col-lg-5 col-xs-8">
                  <span class="valid-form-group">
                                            <label class="focus valid"></label>
                                        </span>
                  <input id="txtIPAddress" type="text" maxlength="20" class="form-control required" data-valid="isNonEmpty||isIpv4" data-error="IP地址不能为空||ip地址格式不正确" placeholder="IP地址" />
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left">
                  <em class="ak_required_em">*</em>MAC地址
                </label>
                <div class="col-lg-5 col-xs-8">
                  <span class="valid-form-group">
                                            <label class="focus valid"></label>
                                        </span>
                  <input id="txtMac" type="text" maxlength="20" class="form-control required" data-valid="isNonEmpty||isComputerphobe" data-error="MAC地址不能为空||MAC地址格式不对" placeholder="网卡物理地址" />
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box ">
              <div class="form-group">
                <label class="content-title-left text-right">固件版本号</label>
                <div class="col-lg-5 col-xs-8">
                  <input id="txtFirmwareVersion" type="text" maxlength="20" class="form-control" placeholder="固件版本号" />
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left text-right">软件版本号</label>
                <div class="col-lg-5 col-xs-8">
                  <input id="txtSoftwareVersion" type="text" maxlength="20" class="form-control" placeholder="软件版本号" />
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left text-right">升级方式</label>
                <div class="col-lg-5 col-xs-8">
                  <div class="radio radio-custom radio-inline">
                    <input type="radio" name="radioUpgradeWay" id='radioUpgradeWay0' value="0" checked>
                    <label for="radioUpgradeWay0">
                      统一
                    </label>
                  </div>
                  <div class="radio radio-danger radio-inline">
                    <input type="radio" name="radioUpgradeWay" id='radioUpgradeWay1' value="1">
                    <label for="radioUpgradeWay1">
                      指定
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-horizontal mt-10 content-box ">
              <div class="form-group">
                <label class="content-title-left text-right">是否出库</label>
                <div class="col-lg-5 col-xs-8">
                  <div class="radio radio-custom radio-inline">
                    <input type="radio" name="radioIsStockOut" value="1" checked disabled>
                    <label for="radioShortCutMenu9">
                      是
                    </label>
                  </div>
                  <div class="radio radio-danger radio-inline">
                    <input type="radio" name="radioIsStockOut" value="0" disabled>
                    <label for="radioShortCutMenu90">
                      否
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left text-right">是否启用</label>
                <div class="col-lg-5 col-xs-8">
                  <div class="radio radio-custom radio-inline">
                    <input type="radio" name="radioIsActive" value="1" checked>
                    <label for="radioShortCutMenu1">
                      是
                    </label>
                  </div>
                  <div class="radio radio-danger radio-inline">
                    <input type="radio" name="radioIsActive" value="0">
                    <label for="radioShortCutMenu">
                      否
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-horizontal mt-10 content-box ">
              <div class="form-group">
                <label class="content-title-left text-right">描述</label>
                <div class="col-lg-5 col-xs-8">
                  <textarea id="txtRemark" maxlength="100" class="form-control">描述内容</textarea>
                </div>
              </div>
            </div>
            <div class="content-box-footer">
              <div class="form-group">
                <label class="content-title-left text-right"></label>
                <div class="col-lg-5 col-xs-8 pl-22">
                  <button type="button" class="btnReturn btn btn-white pull-left mr-20">取消</button>
                  <button id="btnSave" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中...">保存</button>
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
          <span class="size20 font-bold">批量导入</span>
        </div>
        <div class="col-md-6">
          <button type="button" class="btnReturn btn btn-white waves-effect waves-light pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
        </div>
      </div>
      <hr class="divider mb-10 mt-10">
      <div class="row">
        <div class="col-md-12">
          <div id="fileBox">
            <div class="alert alert-info alert-dismissable">
              <strong>导入说明</strong> 1、先下载网关入库模版，在对应列填上相应数据。注意，导入文件中的数据行不能超过1万行！
              <span class="label label-info p-8"><a class="text-white" href="../../../../static/doc/网关入库模板.xlsx" target="_blank">下载网关入库模版</a></span>
            </div>
            <div id="fileBox1"></div>
          </div>
          <div class="mt-20">
            <div class="form-group">
              <!--<label class="text-right">数据验证预览列表</label>-->
              <div class="bg-white" id="viewIport">
                <table id="viewImport" class="table table-striped table-bordered" width="100%">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>网关ID</th>
                      <th>网关型号</th>
                      <th>出厂日期</th>
                      <th>批次号</th>
                      <th>联网方式</th>
                      <th>IP地址</th>
                      <th>MAC地址</th>
                      <th>固件版本号</th>
                      <th>软件版本号</th>
                      <th>描述</th>
                      <th>验证结果</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div class="content-box-footer-import">
            <div class="form-group">
              <button type="button" class="btnReturn btn btn-white pull-left">取消</button>
              <button id="btnSaveTemplateData" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中...">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--网关导入信息结束-->
  </div>
  </div>
</template>
<script>
var tableDev = '',
  btn = '';
export default {
  data: function() {
    return {
      GatewayList: []
    }
  },
  mounted: function() {
    $("#selQueryGatewayModel").selectpicker("refresh");
    $('.form_date').datetimepicker({
      format: 'yyyy-mm-dd',
      weekStart: 1,
      autoclose: true,
      startView: 2,
      minView: 2,
      forceParse: false,
      todayBtn: 1,
      todayHighlight: 1,
      language: 'zh-CN'
    });
    var tableDev;
    var GatewayId;
    var _this = this;
    $(document).ready(function() {
      verifyCheck({ formId: 'verifyCheck', onBlur: null, onFocus: null, onChange: null, successTip: true, resultTips: null, clearTips: null, code: true, phone: true });
      $('#txtQueryGatewayId').bind('keypress', function(event) {
        if (event.keyCode == "13") {
          tableDev.ajax.reload();
        }
      });
      tableDev = $('#exampleDev3').DataTable({
        pagingType: "full_numbers",
        processing: true,
        deferRender: true,
        dom: "Bfrtip",
        buttons: [],
        responsive: !0,
        serverSide: true,
        ajax: function(data, callback, settings) {
          var param = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "PageSize": data.length,
            "PageIndex": (data.start / data.length) + 1,
            "Parameters": {
              "GatewayId": $('#txtQueryGatewayId').val().trim(),
              "GatewayModel": $('#selQueryGatewayModel').val(),
            }
          };
          var url = eosCommon.PLATFORM_API + "api/base/QueryStockIn";
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
          { data: "AssetsNo" },
          { data: "ProductionDate" },
          { data: "BatchNo" },
          { data: "NetModeName" },
          { data: "IsStockOut" },
          { data: "IsActive" },
          { data: "IsStockOut" }
        ],
        "columnDefs": [{
            "targets": [7],
            "render": function(data) {
              var html = '';
              if (data == 0) {
                html = "否";
              } else if (data == 1) {
                html = "是";
              } else {
                html = data;
              }
              return html
            }
          },
          {
            "targets": [8],
            "render": function(data) {
              var html = '';
              if (data == 0) {
                html = "否";
              } else if (data == 1) {
                html = "是";
              } else {
                html = data;
              }
              return html
            }
          },
          {
            "targets": [9],
            "render": function(data) {
              var html = '';
              if (data == 0) {
                html = "<div class='tc'><span class='OperatorBtnView'  data='1' title='查看详情'><i class='fa fa-eye'></i></span><span class='OperatorBtnEdit OperatorEdit'  data='2' title='修改网关'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除设备'><i class='fa fa-trash-o'></i></span></div>";
              } else if (data == 1) {
                html = "<div class='tc'><span class='OperatorBtnView'  data='1' title='查看详情'><i class='fa fa-eye'></i></span></div>";
              }
              return html
            }
          }
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
      $('#exampleDev3 tbody').on('click', 'tr', function() {
        if ($(this).hasClass('selected')) {
          $(this).removeClass('selected');
        } else {
          tableDev.$('tr.selected').removeClass('selected');
          $(this).addClass('selected');
        }
      });
      $('#exampleDev3 tbody').on('click', 'span', function() {
        var data = tableDev.rows($(this).parents('tr')).data();
        var isNum = $(this).attr("data");
        if (isNum == "1") {
          //详细信息赋值 函数
          bindEosBaseDveView(data);
          $('#EosBaseDveView').show();
          $('#EosBaseDveList').hide();
          $('#EosBaseDveImport').hide();
          $('#EosBaseDveAdd').hide();
        } else if (isNum == "2") {
          //编辑信息赋值 函数
          bindEosBaseDveAdd(data);
          $('#btnSave').attr("data", "2");
          $('#EosBaseDveList').hide();
          $('#EosBaseDveImport').hide();
          $('#EosBaseDveAdd').show();
        } else if (isNum == "3") {
          //删除信息赋值 函数
          GatewayId = data[0].GatewayId;
          vdialog({
            type: 'confirm',
            title: '提示',
            content: eosCommon.DELETE_MSG_ASK,
            ok: function() { delRequest(); },
            cancel: true,
            modal: true
          });
        }
      });

      $('#selQueryGatewayModel').change(function() {
        tableDev.ajax.reload();
      });
      $('#btnQuery').click(function() {
        tableDev.ajax.reload();
      });
      $('#btnInsertDev').click(function() {
        //添加信息赋值函数
        bindEosBaseDveAdd(null);
        $('#btnSave').attr("data", "1");
        $('#EosBaseDveList').hide();
        $('#EosBaseDveImport').hide();
        $('#EosBaseDveAdd').show();
      });
      //网关导入
      $('#EosBaseStockImport').click(function() {
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
          'serverUrl': eosCommon.PLATFORM_API + "api/upload/StockIn",
          'data': param,
          'fileNumLimit': 1,
          'upType': 1,
          'succ': function(result) {
            if (eosCommon.checkCode(result.State, result.Message)) {
              var viewImportData = [];
              saveImportData = [];
              errorSign = 0;
              for (var i = 0; i < result.Data.TotalRows; i++) {
                var viewTemp = {};
                viewTemp.RowId = result.Data.UploadData[i]['序号'];
                viewTemp.GatewayId = result.Data.UploadData[i]['网关ID'];
                viewTemp.GatewayModel = result.Data.UploadData[i]['网关型号'];
                viewTemp.ProductionDate = result.Data.UploadData[i]['出厂日期'];
                viewTemp.BatchNo = result.Data.UploadData[i]['批次号'];
                viewTemp.NetMode = result.Data.UploadData[i]['联网方式'];
                viewTemp.IP = result.Data.UploadData[i]['IP'];
                viewTemp.MAC = result.Data.UploadData[i]['MAC'];
                viewTemp.FirmwareVersion = result.Data.UploadData[i]['固件版本号'];
                viewTemp.SoftwareVersion = result.Data.UploadData[i]['软件版本号'];
                viewTemp.Remark = result.Data.UploadData[i]['备注'];
                viewTemp.Message = '正确';
                var bol = 0;
                for (var j = 0; j < result.Data.ErrorRows; j++) {
                  if (result.Data.ErrorMessage[j]['RowId'] == result.Data.UploadData[i]['序号']) {
                    errorSign++;
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
                saveTemp.GatewayModel = result.Data.UploadData[i]['网关型号'];
                saveTemp.ProductionDate = result.Data.UploadData[i]['出厂日期'];
                saveTemp.BatchNo = result.Data.UploadData[i]['批次号'];
                saveTemp.NetMode = result.Data.UploadData[i]['联网方式'];
                saveTemp.IP = result.Data.UploadData[i]['IP'];
                saveTemp.MAC = result.Data.UploadData[i]['MAC'];
                saveTemp.FirmwareVersion = result.Data.UploadData[i]['固件版本号'];
                saveTemp.SoftwareVersion = result.Data.UploadData[i]['软件版本号'];
                saveTemp.Remark = result.Data.UploadData[i]['备注'];
                saveImportData.push(saveTemp);
              }
              bindEosBaseDveImport(viewImportData);
            }
          },
          'del': function(result) {
            var viewImportData = [];
            saveImportData = [];
            errorSign = 0;
            bindEosBaseDveImport(viewImportData);
          }
        })
      });

      $('.btnReturn').click(function() {
        btnReturn();
      });

      $('#btnSave').click(function() {
        var isNum = $('#btnSave').attr("data");
        if (isNum == "2") {
          if (!verifyCheck._click("verifyCheck")) {
            return false;
          } else {
            btn = $(".loading_btn").button('loading');
            editRequest();
          }
        } else if (isNum == "1") {
          if (!verifyCheck._click("verifyCheck")) {
            return false;
          } else {
            btn = $(".loading_btn").button('loading');
            addRequest();
          }
        }
      });

      $('#btnSaveTemplateData').click(function() {
        if (saveImportData.length <= 0) {
          vdialog({
            type: 'error',
            title: '提示',
            content: '批量导入中没有正确的数据可导入',
            ok: true,
            modal: true
          });
        } else if (errorSign > 0 && saveImportData.length > 0) {
          vdialog({
            type: 'error',
            title: '提示',
            content: '验证结果：' + errorSign + '条错误，' + saveImportData.length + '条正确，确定继续提交正确的数据吗？',
            ok: function() { saveImport(); },
            modal: true
          });
        } else {
          saveImport();
        }
      });
    });

    //返回初始页控制
    function btnReturn() {
      $('#EosBaseDveList').show();
      $('#EosBaseDveView').hide();
      $('#EosBaseDveAdd').hide();
      $('#EosBaseDveImport').hide();
    }
    //绑定详细信息
    function bindEosBaseDveView(data) {
      $('#viewGatewayId').text(data[0].GatewayId);
      $('#viewGatewayName').text(data[0].GatewayName);
      $('#viewAssetsNo').text(data[0].AssetsNo);
      $('#viewProductionDate').text(data[0].ProductionDate);
      $('#viewBatchNo').text(data[0].BatchNo);
      $('#viewNetModeName').text(data[0].NetModeName);
      $('#viewIPAddress').text(data[0].IPAddress);
      $('#viewMac').text(data[0].Mac);
      $('#viewFirmwareVersion').text(data[0].FirmwareVersion);
      $('#viewSoftwareVersion').text(data[0].SoftwareVersion);
      $('#UpgradeWayName').text(data[0].UpgradeWayName);
      if (data[0].IsStockOut == 0) {
        $('#viewIsStockOut').text("否");
      } else {
        $('#viewIsStockOut').text("是");
      }

      if (data[0].IsActive == 0) {
        $('#viewIsActive').text("否");
      } else {
        $('#viewIsActive').text("是");
      }
      $('#viewRemark').text(data[0].Remark);
    }
    //绑定添加和编辑的初始值
    function bindEosBaseDveAdd(data) {
      eosCommon.resetFrom();
      if (data == null) {
        $('#txtProductionDate').val(eosCommon.getTime("yyyy-MM-dd", 1));
        $('#txtGatewayId').removeAttr("disabled");
        $('#txtGatewayId').val("");
        $("#selGatewayModel option[value='']").prop("selected", true);
        $("#selGatewayModel").selectpicker('refresh');
        $('#txtAssetsNo').val("");
        $('#txtAssetsNo').attr("disabled", "disabled");
        $('#txtProductionDate').val("");
        $('#txtBatchNo').val("");
        $("input[type='radio'][name='NetMode'][value='1']").prop("checked", "checked");
        $('#txtIPAddress').val("");
        $('#txtMac').val("");
        $('#txtFirmwareVersion').val("");
        $('#txtSoftwareVersion').val("");
        $("input[type='radio'][name='radioIsStockOut'][value='0']").prop("checked", "checked");
        $("input[name='radioIsStockOut']").attr("disabled", "disabled");
        $("input[type='radio'][name='radioIsActive'][value='1']").prop("checked", "checked");
        $("input[type='radio'][name='radioUpgradeWay'][value='0']").prop("checked", "checked");
        $('#txtRemark').val("");
      } else {
        $('#txtGatewayId').val(data[0].GatewayId);
        $('#txtGatewayId').attr("disabled", "disabled");
        $("#selGatewayModel option[value='" + data[0].GatewayModel + "']").prop("selected", true);
        $("#selGatewayModel").selectpicker('refresh');
        $('#txtAssetsNo').val(data[0].AssetsNo);
        $('#txtAssetsNo').attr("disabled", "disabled");
        $('#txtProductionDate').val(data[0].ProductionDate);
        $('#txtBatchNo').val(data[0].BatchNo);
        //                alert($("input[type='radio'][name='NetMode'][value='" + data[0].NetMode + "']").prop("checked", "checked"))
        $("input[type='radio'][name='NetMode'][value='" + data[0].NetMode + "']").prop("checked", "checked");
        $('#txtIPAddress').val(data[0].IPAddress);
        $('#txtMac').val(data[0].Mac);
        $('#txtFirmwareVersion').val(data[0].FirmwareVersion);
        $('#txtSoftwareVersion').val(data[0].SoftwareVersion);
        $("input[type='radio'][name='radioIsStockOut'][value='" + data[0].IsStockOut + "']").prop("checked", "checked");
        $("input[name='radioIsStockOut']").attr("disabled", "disabled");
        $("input[type='radio'][name='radioIsActive'][value='" + data[0].IsActive + "']").prop("checked", "checked");
        $("input[type='radio'][name='radioUpgradeWay'][value='" + data[0].UpgradeWay + "']").prop("checked", "checked");
        $('#txtRemark').val(data[0].Remark);
      }
    }
    //修改
    function editRequest() {
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "GatewayId": $('#txtGatewayId').val(),
          "GatewayModel": $('#selGatewayModel option:selected').val(),
          "GatewayName": $('#selGatewayModel option:selected').text(),
          "ProductionDate": $('#txtProductionDate').val(),
          "BatchNo": $('#txtBatchNo').val(),
          "NetMode": $('input:radio[name="NetMode"]:checked').val(),
          "IpAddress": $('#txtIPAddress').val(),
          "Mac": $('#txtMac').val(),
          "FirmwareVersion": $('#txtFirmwareVersion').val(),
          "SoftwareVersion": $('#txtSoftwareVersion').val(),
          "IsActive": $('input:radio[name="radioIsActive"]:checked').val(),
          // "UpgradeWay": $('input:radio[name="radioUpgradeWay"]:checked').val(),
          "Remark": $('#txtRemark').val()
        }
      };
      var url = eosCommon.PLATFORM_API + "api/base/UpdateStockIn";
      eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
          tableDev.ajax.reload();
          btnReturn();
          $(".loading_btn").button('reset');
        }
      });
    }
    //添加
    function addRequest() {
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "GatewayId": $('#txtGatewayId').val(),
          "GatewayModel": $('#selGatewayModel option:selected').val(),
          "GatewayName": $('#selGatewayModel option:selected').text(),
          "ProductionDate": $('#txtProductionDate').val(),
          "BatchNo": $('#txtBatchNo').val(),
          "NetMode": $('input:radio[name="NetMode"]:checked').val(),
          "IpAddress": $('#txtIPAddress').val(),
          "Mac": $('#txtMac').val(),
          "FirmwareVersion": $('#txtFirmwareVersion').val(),
          "SoftwareVersion": $('#txtSoftwareVersion').val(),
          "IsActive": $('input:radio[name="radioIsActive"]:checked').val(),
          "UpgradeWay": $('input:radio[name="radioUpgradeWay"]:checked').val(),
          "Remark": $('#txtRemark').val()
        }
      };
      var url = eosCommon.PLATFORM_API + "api/base/InsertStockIn";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
          tableDev.ajax.reload();
          btnReturn();
          $(".loading_btn").button('reset');
        }
      });
    }
    //删除
    function delRequest() {
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "GatewayId": GatewayId
        }
      };
      var url = eosCommon.PLATFORM_API + "api/base/DeleteStockIn";
      eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
          tableDev.ajax.reload();
        }
      });
    }
    //绑定批量导入预览表格数据
    var viewImport;
    var saveImportData = [];
    var errorSign = 0;

    function bindEosBaseDveImport(viewImportData) {
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
          { data: "GatewayModel" },
          { data: "ProductionDate" },
          { data: "BatchNo" },
          { data: "NetMode" },
          { data: "IP" },
          { data: "MAC" },
          { data: "FirmwareVersion" },
          { data: "SoftwareVersion" },
          { data: "Remark" },
          { data: "Message" }
        ],
        "columnDefs": [{
          "targets": [11],
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
    }
    //保存导入验证正确的数据
    function saveImport() {
      btn = $(".loading_btn").button('loading');
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": saveImportData
      };
      var url = eosCommon.PLATFORM_API + "api/base/BatchStockIn";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
          tableDev.ajax.reload();
          saveImportData = [];
          errorSign = 0;
          bindEosBaseDveImport(saveImportData);
          btnReturn();
          $(".loading_btn").button('reset');
        }
      });
    }
    $("#txtProductionDate").change(function() {
      if ($("#txtProductionDate").val() != '') {
        $('#txtProductionDate').next('.valid-form-group-addon').find('.focus').html('');
      }
    });
  }
}

</script>
<style>


</style>

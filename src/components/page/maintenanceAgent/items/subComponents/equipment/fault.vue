<template>
  <div class="fault">
    <div id="Fault" class="tab-pane">
      <!--故障代码列表开始-->
      <div id="FaultList" style="margin-bottom: 0;" class="card-box table-responsive">
        <div class="row pl-10">
          <span class="OrgTopAligin OperatorInsert">
                                            <button id="addFaultBtn" type="button" class="btnInsertFC btn btn-default waves-effect waves-light">
                                                <i class="fa fa-plus m-r-5"></i>新增
                                            </button>
                                        </span>
          <span class="OrgTopAligin "><!--OperatorImports-->
                                            <button id="faultbtnImport" type="button" class="btn btn-default">
                                                批量导入
                                            </button>
                                        </span>
          <span class="OperatorSearch">
                                        	
                                        	<span class="OrgTopAligin">
                                            	<input id="FaultQueryTxt" type="search" class="form-control" placeholder="故障代码" value="">
                                        	</span>
          <span class="OrgTopAligin">
		                                        <button id="FaultQueryBtn" type="button" class="btn btn-default waves-effect waves-light">
		                                                <i class="fa fa-search m-r-5"></i>查找
	                                            </button>
	                                        </span>
          </span>
          <span class="OrgTopAligin OperatorDel">
                                            <button @click="DelAllFault()" type="button" class="btn btn-default">
                                                		删除所选
                                            </button>
                                    	</span>
          <span class="OrgTopAligin">
											<button @click="DelAllFaults()" type="button" class="btn btn-default">
                                                		删除全部
                                            </button>
										</span>
        </div>
        <hr class="divider mt-10">
        <table id="FaultTable" class="table table-striped table-bordered" width="100%">
          <thead>
            <tr>
              <th style="width: 20px;"> <label style="margin-left: 5px"><input id="allIsChecked" name="allCheckDataTitle" type="checkbox">全选/反选</label> </th>
              <th style="width: 50px;">查看更多</th>
              <th>序号</th>
              <th>故障名称</th>
              <th>故障代码</th>
              <th>故障持久性</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <!--故障代码列表结束-->
      <!--添加故障代码开始-->
      <div id="FaultAdd" class="card-box table-responsive detail_info_wrap" style="display: none;">
        <div class="row">
          <div class="col-md-6">
            <span id="FaultTitle" class="size20 font-bold">故障代码</span>
          </div>
          <div class="col-md-6">
            <button type="button" class="FaultCancelBtn btn btn-white waves-effect waves-light pull-right">
                                                <i class="fa fa-mail-reply-all m-r-5"></i>返回
                                            </button>
          </div>
        </div>
        <hr class="divider mb-10 mt-10">
        <div class="row">
          <div class="col-md-12">
            <div id="FaultVerifyCheck">
              <div class="form-horizontal mt-10 pb-10 content-box-modal">
                <div class="form-group mt-20">
                  <label class="content-title-left text-right"><em class="ak_required_em">*</em>故障名称</label>
                  <div class="col-xs-6">
                    <input id="FaultName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||maxLength:25" data-error="故障名称不能为空||故障名称最长为25位字符" />
                    <span class="ie8 icon-close close hide"></span>
                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                    <label class="focus"><span>故障名称为25位，中文、字母、数字、下划线的组合，以中文或字母开头</span></label>
                    <label class="focus valid"></label>
                  </div>
                </div>
                <div class="form-group mt-20">
                  <label class="content-title-left text-right"><em class="ak_required_em">*</em>故障代码</label>
                  <div class="col-xs-6">
                    <input id="FaultCode" type="text" class="form-control required" maxlength="20" data-valid="isNonEmpty||maxLength:20" data-error="故障代码不能为空||故障代码最长为20位字符" />
                    <span class="ie8 icon-close close hide"></span>
                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                    <label class="focus"><span>必填，20个字符以内，只能为字符，不能出现中文</span></label>
                    <label class="focus valid"></label>
                  </div>
                </div>

                <div class="form-group">

                  <label class="content-title-left">
                                                            <em class="ak_required_em">*</em>故障持久性
                                                        </label>
                  <div class="col-lg-2 col-xs-3">
                    <select id="FaultDurability" class="form-control selectpicker" value="1" data-style="btn-white" tabindex="-98">
                      <option value="1">锁定</option>
                      <option value="2">非锁定</option>
                    </select>
                  </div>
                </div>
                <div class="form-group mt-20">
                  <label class="content-title-left text-right"><em class="ak_required_em">*</em>故障描述</label>
                  <div class="col-xs-6">
                    <textarea id="FaultDescription" type="text" maxlength="250" class="form-control required" data-valid="isNonEmpty||maxLength:250" data-error="故障描述不能为空||故障描述最长为250位字符" /></textarea>
                    <span class="ie8 icon-close close hide"></span>
                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                    <label class="focus"><span></span></label>
                    <label class="focus valid"></label>
                  </div>
                </div>
              </div>
              <div class="form-horizontal mt-10 pb-10 content-box-modal">
                <div class="portlet more-data">
                  <div class="portlet-heading portlet-default">
                    <h3 class="portlet-title text-dark" style="cursor: pointer;">以下内容为非必填项，点击展开</h3>
                  </div>
                  <div class="panel-collapse collapse">
                    <div class="form-group mt-20">
                      <label class="content-title-left text-right">故障位置</label>
                      <div class="col-xs-6">
                        <input id="FaultLocation" type="text" class="form-control" maxlength="50" />
                      </div>
                    </div>
                    <div class="form-group mt-20">
                      <label class="content-title-left text-right">备注信息</label>
                      <div class="col-xs-6">
                        <textarea id="FaultRemark" type="text" maxlength="100" class="form-control" /></textarea>
                        <span class="ie8 icon-close close hide"></span>
                        <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                        <label class="focus"><span>备注信息最长为100个字符</span></label>
                        <label class="focus valid"></label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="modal-footer" style="text-align: left;">
                <label class="content-title-left text-right"></label>
                <div class="col-lg-5 col-xs-8" style="padding-left: 2px;">
                  <button class="FaultCancelBtn btn btn-white waves-effect" data-dismiss="modal">取消</button>
                  <button id="FaultSaveBtn" class="btn btn-default loading_btn" data-status="save" data-loading-text="保存中...">保存</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="faultbtnImportBox" class="card-box table-responsive" style="display: none">
        <div class="row">
          <div class="col-md-6">
            <span class="size20 font-bold">故障代码导入</span>
          </div>
          <div class="col-md-6">
            <button type="button" class="faultBtnReturn btn btn-white waves-effect waves-light pull-right">
                                                <i class="fa fa-mail-reply-all m-r-5"></i>返回
                                            </button>
          </div>
        </div>
        <hr class="divider mb-10 mt-10">
        <div class="row">
          <div class="col-md-12">
            <div class="fileBoxs">
              <div class="alert alert-info alert-dismissable">
                <strong>导入说明</strong> 1、先下载故障代码模版，在对应列填上相应数据。注意，导入文件中的数据行不能超过1万行！
                <span class="label label-info p-8"><a class="text-white" href="../../../../static/doc/故障代码导入模板.xlsx" target="_blank">下载故障代码模版</a></span>
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
                        <th>故障代码</th>
                        <th>故障名称</th>
                        <th>故障描述</th>
                        <th>故障持久性</th>
                        <th>故障位置</th>
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
                <button type="button" class="faultBtnReturn btn btn-white pull-left">取消</button>
                <button id="btnSaveTemplateData" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中..." data-dismiss="modal">保存</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--添加故障代码结束-->
    </div>
    <!--添加故障代码结束-->
  </div>
  </div>
</template>

<script>
  var btn = '';
  var viewImport = '';
  var FaultTable;
  export default {

    data: function() {
      return {
        EquipmentId: '',
        saveImportData: [],
        errorSign: '',
        title: '',
        selectArr: []

      }
    },
    props: ['propsDatas'],
    mounted: function() {
      var _this = this;
      _this.title = '故障代码';
      _this.$emit('changeTitle', _this.title);
      if(!_this.propsDatas.equipmentData) {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '请先保存设备信息，才能编辑其它信息',
          ok: function() {},
          cancel: true,
          modal: true
        });
        return false;
      }
      _this.EquipmentId = _this.propsDatas.EquipmentId;
      _this.getFault();
      $(".detail_info_wrap").delegate(".portlet-heading", 'click', function() {
        if($(this).find('.portlet-title').html() == "以下内容为非必填项，点击展开") {
          $(this).parents(".more-data").find('.panel-collapse').show();
          $(this).find('.portlet-title').html("以下内容为非必填项，点击隐藏");
          eosCommon.resetNiceScroll();
        } else {
          $(this).parents(".more-data").find('.panel-collapse').hide();
          $(this).find('.portlet-title').html("以下内容为非必填项，点击展开");
          eosCommon.resetNiceScroll();
        }
      });
    },
    methods: {
      EquipmentReturn: function() {
        this.$router.go(-1);
      },
      DelAllFaults() {
        let _this = this;
        vdialog({
          type: 'confirm',
          title: '提示',
          content: eosCommon.DELETE_MSG_ASK,
          ok: function() {
            eosCommon.eosAjax(
              eosCommon.ENTERPRISE_API + "api/equipment/DeleteFault",
              "Delete", {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                  "EquipmentId": _this.EquipmentId,
                  "DeleteType": 3,
                  "EquipmentFaultIdList": JSON.stringify([])
                }
              },
              "json",
              function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                  eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                  FaultTable.ajax.reload();
                }
              }
            );
          },
          cancel: true,
          modal: true
        });
      },
      DelAllFault: function() {
        var _this = this;
        if(_this.selectArr.length == 0) {
          vdialog({
            type: 'confirm',
            title: '提示',
            content: '请选择您要删除的故障代码',
            ok: function() {},
            cancel: true,
            modal: true
          });
          return false;
        } else {
          vdialog({
            type: 'confirm',
            title: '提示',
            content: eosCommon.DELETE_MSG_ASK,
            ok: function() {
              eosCommon.eosAjax(
                eosCommon.ENTERPRISE_API + "api/equipment/DeleteFault",
                "Delete", {
                  "AccessToken": eosCommon.storage.get("AccessToken"),
                  "Parameters": {
                    "EquipmentFaultIdList": _this.selectArr
                  }
                },
                "json",
                function(result) {
                  if(eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                    FaultTable.ajax.reload();
                  }
                }
              );
            },
            cancel: true,
            modal: true
          });
        }
      },
      getFault: function() {
        var _this = this;
        // 故障代码
        $("#FirmwareVersion").on("click", ".dropdown-menu li", function() {
          var obj = $(this).parents('#FirmwareVersion');
          obj.find(".group-text").html($(this).find(".text").html());
          $("#FirmwareVersionData").val($(this).find(".text").html());
          if($(this).find(".text").html() != "") {
            obj.find(".error, .focus").html("")
          }
        });
        $("#FirmwareVersion").on("click", ".dropdown-menu li input", function() {
          return false;
        });
        $("#FirmwareVersion").on("change", ".entry-input", function() {
          var obj = $(this).parents('#FirmwareVersion');
          obj.find(".group-text").html($(this).val());
          $("#FirmwareVersionData").val($(this).val());
          if($(this).find(".text").html() != "") {
            obj.find(".error, .focus").html("")
          }
        });
        $('#FaultQueryTxt').bind('keypress', function(event) {
          if(event.keyCode == "13") {
            FaultTable.ajax.reload();
          }
        });
        FaultTable = $('#FaultTable').DataTable({
          pagingType: "full_numbers",
          processing: true,
          deferRender: true,
          dom: "Bfrtip",
          buttons: [],
          responsive: !0,
          serverSide: true,
          destroy: true,
          ajax: function(data, callback, settings) {
            var param = {
              "AccessToken": eosCommon.storage.get("AccessToken"),
              "PageSize": data.length,
              "PageIndex": (data.start / data.length) + 1,
              "Parameters": {
                "EquipmentId": _this.EquipmentId,
                "Keywords": $("#FaultQueryTxt").val().trim()
              }
            };
            var url = eosCommon.ENTERPRISE_API + "api/equipment/GetFault";
            eosCommon.eosAjax(url, "GET", param, "json", function(result) {
              if(eosCommon.checkCode(result.State, result.Message)) {
                var returnData = {};
                if(result.Data == "") {
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
            {
              "orderable": false,
              "data": "EquipmentFaultId",
              "defaultContent": ''
			          	},
            {
              defaultContent: ""
            },
            {
              "className": 'details-control FaultdetailsControl',
              "orderable": false,
              "data": null,
              "defaultContent": ''
						},

            {
              data: "FaultName"
            },
            {
              data: "FaultCode"
            },
            {
              data: "FaultDurabilityName"
            },
            {
              "defaultContent": "<span class='OperatorBtnEdit OperatorEdit' data='1' title='修改故障'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除故障'><i class='fa fa-trash-o'></i></span>"
            }

					],
          "columnDefs": [{
            "targets": [0],
            "render": function(data) {
              var html = '';
              html = '<label><input type="checkbox" name="allCheckData" id="' + data + '" class="group-checkable" value="' + data + '" /></label>'
              return html
            }
		          	}]
        });
        $('#FaultQueryBtn').unbind("click").click(function() {
          FaultTable.ajax.reload();
        });
        $("#faultbtnImport").unbind("click").click(function() {
          var viewImportData = [];
          _this.saveImportData = [];
          _this.errorSign = 0;
          _this.bindEosBaseDveImport(viewImportData);
          $("#FaultList").hide();
          $("#FaultAdd").hide();
          $('.panel-collapse').hide();
          $("#faultbtnImportBox").show();
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
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "Parameters.EquipmentId": _this.EquipmentId
          };
          eosCommon.eosUploaderFile({
            'uploaderObj': 'uploaderFile',
            'uploaderBox': '.uploader_box1',
            'uploaderList': '.uploader-list',
            'initBtn': '#picker',
            'serverUrl': eosCommon.ENTERPRISE_API + "api/upload/fault",
            'data': param,
            'fileNumLimit': 1,
            'upType': 1,
            'succ': function(result) {
              var viewImportData = [];
              _this.saveImportData = [];
              _this.errorSign = 0;
              for(var i = 0; i < result.Data.TotalRows; i++) {
                var viewTemp = {};
                viewTemp.RowId = result.Data.UploadData[i]['序号'];
                viewTemp.FaultCode = result.Data.UploadData[i]['故障代码'];
                viewTemp.FaultName = result.Data.UploadData[i]['故障名称'];
                viewTemp.FaultDescription = result.Data.UploadData[i]['故障描述'];
                viewTemp.FaultDurability = result.Data.UploadData[i]['持久性'];
                viewTemp.FaultLocation = result.Data.UploadData[i]['故障位置'];
                viewTemp.Remark = result.Data.UploadData[i]['备注'];
                viewTemp.Message = '正确';
                var bol = 0;
                for(var j = 0; j < result.Data.ErrorRows; j++) {
                  if(result.Data.ErrorMessage[j]['RowId'] == result.Data.UploadData[i]['序号']) {
                    _this.errorSign++;
                    bol = 1;
                    viewTemp.Message = result.Data.ErrorMessage[j]['Message'];
                  }
                }
                viewImportData.push(viewTemp);
                if(bol == 1) {
                  continue;
                }
                //故障代码上传结果
                var saveTemp = {};
                saveTemp.RowId = result.Data.UploadData[i]['序号'];
                saveTemp.FaultCode = result.Data.UploadData[i]['故障代码'];
                saveTemp.FaultName = result.Data.UploadData[i]['故障名称'];
                saveTemp.FaultDescription = result.Data.UploadData[i]['故障描述'];
                saveTemp.FaultDurability = result.Data.UploadData[i]['持久性'].substring('-')[0];
                saveTemp.FaultLocation = result.Data.UploadData[i]['故障位置'];
                saveTemp.Remark = result.Data.UploadData[i]['备注'];
                _this.saveImportData.push(saveTemp);
              }
              _this.bindEosBaseDveImport(viewImportData);
            },
            'del': function(result) {
              var viewImportData = [];
              _this.saveImportData = [];
              _this.errorSign = 0;
              _this.bindEosBaseDveImport(viewImportData);
            }
          })
        });

        function saveImport() {
          btn = $(".loading_btn").button('loading');
          var param = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "Parameters": {
              "EquipmentId": _this.EquipmentId,
              "Faults": _this.saveImportData
            }
          };
          var url = eosCommon.ENTERPRISE_API + "api/equipment/BatchFault";
          eosCommon.eosAjax(url, "POST", param, "json", function(result) {
            if(eosCommon.checkCode(result.State, result.Message)) {
              eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
              FaultTable.ajax.reload();
              _this.saveImportData = [];
              _this.errorSign = 0;
              _this.bindEosBaseDveImport(_this.saveImportData);
              $("#FaultList").show();
              $("#FaultAdd,#faultbtnImportBox").hide();
              $(".loading_btn").button('reset');
            }
          });
        }

        $('#btnSaveTemplateData').unbind("click").click(function() {
          if(_this.saveImportData.length <= 0) {
            vdialog({
              type: 'error',
              title: '提示',
              content: '批量导入中没有正确的数据可导入',
              ok: true,
              modal: true
            });
          } else if(_this.errorSign > 0 && _this.saveImportData.length > 0) {
            vdialog({
              type: 'error',
              title: '提示',
              content: '批量导入的数据有' + _this.errorSign + '条数据验证错误！正确的数据有' + _this.saveImportData.length + '条，请修改文档！',
              ok: function() {},
              modal: true
            });
          } else {
            saveImport();
          }
        });

        function FaultdetFormat(d) {
          return '<table class="table-bordered table table-hover" style="display: table;">' +
            '<tr>' +
            '<td style="width: 150px;text-align: right;padding: 8px 12px;">故障描述</td>' +
            '<td style="text-align: left;padding: 8px 12px;">' + (d.FaultDescription == null ? "" : d.FaultDescription) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width: 150px;text-align: right;padding: 8px 12px;">故障位置</td>' +
            '<td style="text-align: left;padding: 8px 12px;">' + (d.FaultLocation == null ? "" : d.FaultLocation) + '</td>' +
            '</tr>' +
            '<tr>' +
            '<td style="width: 150px;text-align: right;padding: 8px 12px;">故障备注信息</td>' +
            '<td style="text-align: left;padding: 8px 12px;">' + (d.Remark == null ? "" : d.Remark) + '</td>' +
            '</tr>'
          '</table>';
        };
        $('#FaultTable').unbind("click").on('click', 'td.FaultdetailsControl', function() {
          var tr = $(this).closest('tr');
          var row = FaultTable.row(tr);
          if(row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
          } else {
            row.child(FaultdetFormat(row.data())).show();
            tr.addClass('shown');
          }
        });
        FaultTable.on('draw.dt', function() {
          FaultTable.column(1, {
            search: 'applied',
            order: 'applied'
          }).nodes().each(function(cell, i) {
            i = i + 1;
            var page = FaultTable.page.info();
            var pageno = page.page;
            var length = page.length;
            var columnIndex = (i + pageno * length);
            cell.innerHTML = columnIndex;
          });
        });
        $('#FaultTable tbody').unbind("click").on('click', 'tr', function() {
          if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
          } else {
            FaultTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
          }
        });
        $('#FaultTable tbody').unbind("click").on('click', 'span', function() {
          var data = FaultTable.rows($(this).parents('tr')).data();
          var isNum = $(this).attr("data");
          if(isNum == "1") {
            //编辑数据
            editFaultTableList(data);
          } else if(isNum == "3") {
            //删除信息赋值 函数
            vdialog({
              type: 'confirm',
              title: '提示',
              content: eosCommon.DELETE_MSG_ASK,
              ok: function() {
                eosCommon.eosAjax(
                  eosCommon.ENTERPRISE_API + "api/equipment/DeleteFault",
                  "Delete", {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                      "EquipmentFaultIdList": data[0]['EquipmentFaultId']
                    }
                  },
                  "json",
                  function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                      eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                      FaultTable.ajax.reload();
                    }
                  }
                );
              },
              cancel: true,
              modal: true
            });
          }
        });
        verifyCheck({
          formId: 'FaultVerifyCheck',
          onBlur: null,
          onFocus: null,
          onChange: null,
          successTip: true,
          resultTips: null,
          clearTips: null,
          code: true,
          phone: true
        });
        $(".FaultCancelBtn,#FaultBtn,.faultBtnReturn").unbind("click").click(function() {
          $("#FaultList").show();
          $("#FaultAdd,#faultbtnImportBox").hide();
          $('.panel-collapse').hide();
          $('.portlet-title').html("以下内容为非必填项，点击展开");
        })
        $("#addFaultBtn").unbind("click").click(function() {
          eosCommon.resetFrom();
          $('.panel-collapse').hide();
          $('.portlet-title').html("以下内容为非必填项，点击展开");
          $("#FirmwareVersion .group-text").html("");
          $("#FirmwareVersion input").val("");
          $("#FaultSaveBtn").attr('data-status', 'save');
          $("#FaultTitle").html("新增故障代码");
          $("#FaultList").hide();
          $("#FaultAdd").show();
          $("#FaultLocation,#FaultCode,#FaultName,#FaultDescription,#FaultRemark").val('');
          $("#FaultType,#FaultLevel,#FaultDurability,#FaultResetLevel").selectpicker('val', '');
          $("#FaultType").selectpicker('val', '0');
          $("#FaultLevel").selectpicker('val', '1');
          $("#FaultDurability").selectpicker('val', '1');
          $("#FaultResetLevel").selectpicker('val', '1');
        });
        $("#FaultSaveBtn").unbind("click").click(function() {
          if(!verifyCheck._click("FaultVerifyCheck")) return false;
          if($(this).attr('data-status') == 'save') {
            btn = $(".loading_btn").button('loading');
            eosCommon.eosAjax(
              eosCommon.ENTERPRISE_API + "api/equipment/InsertFault",
              "Post", {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                  "EquipmentId": _this.EquipmentId,
                  "FirmwareVersion": $("#FirmwareVersionData").val(),
                  "FaultLocation": $("#FaultLocation").val(),
                  "FaultCode": $("#FaultCode").val(),
                  "FaultName": $("#FaultName").val(),
                  "FaultType": '0',
                  "FaultLevel": '1',
                  "FaultDurability": $("#FaultDurability").selectpicker('val'),
                  "FaultDescription": $("#FaultDescription").val(),
                  "ResetLevel": '1',
                  "Remark": $("#FaultRemark").val()
                }
              },
              "json",
              function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                  FaultTable.ajax.reload();
                  eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                  $("#FaultList").show();
                  $("#FaultAdd").hide();
                  $('.panel-collapse').hide();
                  $('.portlet-title').html("以下内容为非必填项，点击展开");
                  $(".loading_btn").button('reset');
                }
              }
            );
          } else {
            btn = $(".loading_btn").button('loading');
            eosCommon.eosAjax(
              eosCommon.ENTERPRISE_API + "api/equipment/UpdateFault",
              "Put", {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                  "EquipmentId": _this.EquipmentId,
                  "FirmwareVersion": $("#FirmwareVersionData").val(),
                  "FaultLocation": $("#FaultLocation").val(),
                  "FaultCode": $("#FaultCode").val(),
                  "FaultName": $("#FaultName").val(),
                  "FaultType": '0',
                  "FaultLevel": '1',
                  "FaultDurability": $("#FaultDurability").selectpicker('val'),
                  "FaultDescription": $("#FaultDescription").val(),
                  "ResetLevel": '1',
                  "Remark": $("#FaultRemark").val(),
                  "EquipmentFaultId": $("#FaultSaveBtn").attr('data-id')
                }
              },
              "json",
              function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                  FaultTable.ajax.reload();
                  eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                  $("#FaultList").show();
                  $("#FaultAdd").hide();
                  $('.panel-collapse').hide();
                  $('.portlet-title').html("以下内容为非必填项，点击展开");
                  $(".loading_btn").button('reset');
                }
              }
            );
          }
        })
        //绑定复选框id事件
        $('#FaultTable tbody').unbind("change").on('change', 'input[name=allCheckData]', function() {
          var currentAll = []
          $("#FaultTable tbody tr td input[name=allCheckData]:checked").each(function() {
            currentAll.push($(this).val());
          })
          _this.selectArr = currentAll
        });
        $('#FaultTable thead #allIsChecked').unbind("click").on('click', function() {
          $('#FaultTable thead #allIsChecked').attr("checked", true)
          $("[name=allCheckData]:checkbox").each(function() { //遍历每一个复选框
            //$(this).attr("checked",!$(this).attr("checked")); //jQuery方法取复选框的反向值
            this.checked = !this.checked; //js方法
            var currentAll = []
            $("#FaultTable tbody tr td input[name=allCheckData]:checked").each(function() {
              currentAll.push($(this).val());
            })
            _this.selectArr = currentAll
          });
        });

        function editFaultTableList(data) {
          eosCommon.resetFrom();
          $('.panel-collapse').hide();
          $('.portlet-title').html("以下内容为非必填项，点击展开");
          eosCommon.resetFrom();
          $("#FirmwareVersion input").val("");
          $("#FaultSaveBtn").attr('data-status', 'edit');
          $("#FaultTitle").html("编辑故障代码");
          $("#FaultSaveBtn").attr('data-id', data[0]['EquipmentFaultId']);
          $("#FaultList").hide();
          $("#FaultAdd").show();
          $("#FirmwareVersionData").val(data[0]['FirmwareVersion']);
          $("#FirmwareVersion .group-text").html(data[0]['FirmwareVersion']);
          $("#FaultLocation").val(data[0]['FaultLocation']);
          $("#FaultCode").val(data[0]['FaultCode']);
          $("#FaultName").val(data[0]['FaultName']);
          $("#FaultType").selectpicker('val', data[0]['FaultType']);
          $("#FaultLevel").selectpicker('val', data[0]['FaultLevel']);
          $("#FaultDurability").selectpicker('val', data[0]['FaultDurability']);
          $("#FaultDescription").val(data[0]['FaultDescription']);
          $("#FaultResetLevel").selectpicker('val', data[0]['ResetLevel']);
          $("#FaultRemark").val(data[0]['Remark']);
        }
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
            {
              data: "RowId"
            },
            {
              data: "FaultCode"
            },
            {
              data: "FaultName"
            },
            {
              data: "FaultDescription",
              className: "txt_lt"
            },
//						{ data: "FaultType" },
//						{ data: "FaultLevel" },
            {
              data: "FaultDurability"
            },
            {
              data: "FaultLocation"
            },

            {
              data: "Remark"
            },
            {
              data: "Message"
            }
					],
          "columnDefs": [{
            "targets": [7],
            "render": function(data) {
              var html = '';
              if(data == "正确") {
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
          if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
          } else {
            viewImport.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
          }
        });
      }

    }

  }
</script>

<style>

</style>
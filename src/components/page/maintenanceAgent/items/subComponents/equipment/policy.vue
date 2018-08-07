<template>
  <div id="Policy" class="">
    <div id="PolicyList" v-show="!isAllImport" style="margin-bottom: 0;" class="card-box table-responsive">
      <div class="row pl-10">
        <span class="OrgTopAligin OperatorInsert">
                    <button id="addPolicy" type="button" class="btn btn-default waves-effect waves-light" data-toggle="" data-target="#modal-cleos-Dev">
                    <i class="fa fa-plus m-r-5"></i>新增报警策略
                    </button>
                </span>
        <span class="OrgTopAligin ">
                    <button @click="allImport()" id="protoImport" type="button" class="btn btn-default">
                       		 批量导入
                    </button>
                </span>
        <span class="OperatorSearch">
                	<span class="OrgTopAligin">
                    	<input id="PolicyQueryTxt" class="form-control input-sm w-128" placeholder="报警标题" type="search">
                	</span>
        <span class="OrgTopAligin">
	                    <button id="PolicyQueryBtn" type="button" class="btn btn-default waves-effect waves-light">
	                        <i class="fa fa-search m-r-5"></i>查找
	                    </button>
	                </span>
        </span>
        <span class="OrgTopAligin OperatorDel">
                    <button @click="DelAllPolicy()" type="button" class="btn btn-default">
                        		删除所选
                    </button>
            	</span>
        <span class="OrgTopAligin">
				 	<button @click="DelAllPolicys()" type="button" class="btn btn-default">
                        		删除全部
                    </button>
				</span>
      </div>
      <hr class="divider mb-10 mt-10">
      <div id="example1_wrapper" class="dataTables_wrapper no-footer">
        <div class="dt-buttons m-r-1"></div>
        <div id="example1_filter" class="dataTables_filter">
          <label></label>
        </div>
        <div id="example1_processing" class="dataTables_processing" style="display: none;">数据加载中...</div>
        <table id="PolicyTable" class="table table-striped table-bordered dataTable no-footer" role="grid" aria-describedby="example1_info" style="width: 100%;" width="100%">
          <thead>
            <tr role="row">
              <th style="width: 20px;"> <label style="margin-left: 5px"><input id="allIsChecked" name="allCheckDataTitle" type="checkbox">全选/反选</label> </th>
              <th class="sorting_asc" rowspan="1" colspan="1">序号</th>
              <th class="sorting">报警标题</th>
              <th class="sorting">严重性级别</th>
              <th class="sorting">报警表达式</th>
              <th class="sorting">报警内容</th>
              <th class="sorting">报警描述</th>
              <th class="sorting">备注</th>
              <th class="sorting">操作</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
    <!--批量导入-->
    <div id="ProtoImportBox" v-show="isAllImport" class="card-box table-responsive">
      <div class="row">
        <div class="col-md-6">
          <span class="size20 font-bold">报警策略导入</span>
        </div>
        <div class="col-md-6">
          <button type="button" @click="returnBack()" class="ProtocolBtnReturn btn btn-white pull-right">
                        <i class="fa fa-mail-reply-all m-r-5"></i>返回
                    </button>
        </div>
      </div>
      <hr class="divider mb-10 mt-10">
      <div class="row">
        <div class="col-md-12">
          <div class="fileBoxs">
            <div class="alert alert-info alert-dismissable">
              <strong>导入说明</strong> 1、先下载报警策略模版，在对应列填上相应数据。注意，导入文件中的数据行不能超过1万行！
              <span class="label label-info p-8"><a class="text-white" href="../../../../static/doc/报警策略导入模板.xlsx" target="_blank">下载报警策略模版</a></span>
            </div>
            <div id="fileBox2"></div>
          </div>
          <div class="mt-20">
            <div class="form-group">
              <div class="bg-white">
                <table id="policyctViewImport" class="table table-striped table-bordered" width="100%">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>策略名称</th>
                      <th>告警内容</th>
                      <th>报警级别</th>
                      <th>报警地址</th>
                      <th>数值运算符</th>
                      <th>对比值</th>
                      <th>报警表达式描述</th>
                      <th>备注信息</th>
                      <th>验证结果</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div class="content-box-footer-import">
            <div class="form-group">
              <button @click="returnBack()" type="button" class="ProtocolBtnReturn btn btn-white pull-left">取消</button>
              <button @click="savePolicycaolImport()" id="saveProtoTemplateData" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中...">保存</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--批量导入结束-->
    <div id="PolicyAdd" class="card-box table-responsive" style="display: none;">
      <div class="row">
        <div class="col-sm-12">
          <span id="PolicyTitle" class="size20 font-bold">新增报警策略</span>
          <button id="PolicyReturnBtn" type="submit" class="btn btn-white pull-right">
                        <i class="fa fa-mail-reply-all m-r-5"></i>返回
                    </button>
        </div>
      </div>
      <hr class="divider mb-10 mt-10">
      <div class="row">
        <div class="col-md-12">
          <div id="PolicyVerifyCheck">
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left text-right"><em class="ak_required_em">*</em>策略名称</label>
                <div class="col-xs-9">
                  <input id="PolicyAlarmName" type="text" maxlength="25" class="form-control input-sm required" data-valid="isNonEmpty||maxLength:25" data-error="策略名称不能为空||策略名称最长为25位字符" placeholder="请输入策略名称" />
                  <span class="valid-form-group">
                                        <label class="focus valid"></label>
                                    </span>
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
              <div class="form-group mt-20">
                <label class="content-title-left text-right"><em class="ak_required_em">*</em>报警内容</label>
                <div class="col-xs-9">
                  <textarea id="PolicyAlarmContent" type="text" maxlength="100" class="form-control required" data-valid="isNonEmpty||maxLength:100" data-error="报警内容不能为空||报警内容最长为25位字符" placeholder="请输入报警内容" /></textarea>
                  <span class="valid-form-group" style="top: 86px;">
                                        <label class="focus valid"></label>
                                    </span>
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left text-right"><em class="ak_required_em">*</em>报警级别</label>
                <div class="col-xs-9">
                  <select id="PolicySeverityLevel" class="form-control selectpicker input-sm" data-style="btn-white" tabindex="-98">
                    <option value="1">提醒</option>
                    <option value="2">警告</option>
                    <option value="3">报警(严重)</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label class="content-title-left text-right"><em class="ak_required_em">*</em>报警触发条件</label>
                <div class="col-xs-9" style="margin: 0;padding: 0;">
                  <div class="col-md-4">
                    <select data-live-search="true" v-model="ProtocolAddress" id="ProtocolAddress" class="form-control selectpicker" data-size="8" data-style="btn-white">
                      <option disabled="disabled" value="">请选择协议地址</option>
                      <option v-for="item in protocolList" :value="item.RegisterAddress">{{item.RegisterAddress}}_{{item.DisplayName}}</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <select id="PolicyExpressions2" class="form-control selectpicker" data-style="btn-white">
                      <option value=">">&gt;</option>
                      <option value="<">&lt;</option>
                      <option value="==">=</option>
                      <option value="≥">&ge;</option>
                      <option value="≤">&le;</option>
                    </select>
                  </div>
                  <div class="col-md-4">
                    <input id="PolicyExpressions3" data-valid="isNonEmpty||maxLength:25" data-error="数值不能为空||数值最长为25位字符" type="text" maxlength="25" class="form-control required" placeholder="请输入数值" />
                    <span class="valid-form-group" style="top: 36px;">
                                            <label class="focus valid"></label>
                                        </span>
                    <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                  </div>
                </div>
              </div>
              <div class="form-group mt-20">
                <label class="content-title-left text-right"><em class="ak_required_em">*</em>报警表达式描述</label>
                <div class="col-xs-9">
                  <textarea id="ExpressionsDescription" data-valid="isNonEmpty||maxLength:100" data-error="报警表达式描述不能为空||报警表达式描述最长为100位字符" type="text" maxlength="100" class="form-control required" placeholder="请输入报警表达式描述" /></textarea>
                  <span class="valid-form-group" style="top: 86px;">
                                        <label class="focus valid"></label>
                                    </span>
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
            </div>
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left text-right"><em class="ak_required_em">*</em>通知方式</label>
                <div class="col-sm-9 text-muted">
                  <div class="checkbox checkbox-custom checkbox-inline">
                    <input id="app" type="checkbox" checked='' disabled="disabled" />
                    <label for="app">
                                            APP
                                        </label>
                  </div>
                  <div class="checkbox checkbox-custom checkbox-inline">
                    <input id="message" type="checkbox" disabled="disabled">
                    <label for="message">
                                        		短信
                                        </label>
                  </div>
                  <div class="checkbox checkbox-custom checkbox-inline">
                    <input id="email" type="checkbox" disabled="disabled">
                    <label for="email">
                                        		邮件
                                        </label>
                  </div>
                </div>
              </div>
              <div class="form-group mt-20">
                <label class="content-title-left text-right">备注信息</label>
                <div class="col-xs-9">
                  <textarea id="PolicyRemark" type="text" maxlength="100" class="form-control" /></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer" style="text-align: left;">
              <div class="form-group">
                <label class="content-title-left"></label>
                <div class="col-lg-5 col-xs-8 pl-22">
                  <button id="PolicyCancelBtn" type="button" class="btnReturn btn btn-white pull-left mr-10">取消</button>
                  <button id="PolicySaveBtn" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中...">确定</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  var btn = '';
  var viewImport = '';
  var PolicyTable = null;
  export default {
    data: function() {
      return {
        EquipmentId: '',
        title: '',
        protocolList: [],
        ProtocolAddress: '',
        //批量导入
        isAllImport: false,
        saveImportData: [],
        viewImportData: [],
        errorSign: 0,
        selectArr: []

      }
    },
    props: ['propsDatas'],
    mounted: function() {
      var _this = this;
      _this.title = '报警策略';
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
      _this.getProtocolList();
      _this.getPolicy();
    },
    methods: {
      DelAllPolicys() {
        let _this = this;
        vdialog({
          type: 'confirm',
          title: '提示',
          content: eosCommon.DELETE_MSG_ASK,
          ok: function() {
            eosCommon.eosAjax(
              eosCommon.ENTERPRISE_API + "api/equipment/DeletePolicy",
              "Delete", {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                  "EquipmentId": _this.EquipmentId,
                  "DeleteType": 3,
                  "EquipmentPolicyIdList": JSON.stringify([])
                }
              },
              "json",
              function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                  eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                  PolicyTable.ajax.reload();
                }
              }
            );
          },
          cancel: true,
          modal: true
        });
      },
      DelAllPolicy: function() {
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
                eosCommon.ENTERPRISE_API + "api/equipment/DeletePolicy",
                "Delete", {
                  "AccessToken": eosCommon.storage.get("AccessToken"),
                  "Parameters": {
                    "EquipmentPolicyIdList": _this.selectArr
                  }
                },
                "json",
                function(result) {
                  if(eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                    PolicyTable.ajax.reload();
                  }
                }
              );
            },
            cancel: true,
            modal: true
          });
        }
      },
      getProtocolList() {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "EquipmentId": vm.EquipmentId
        };
        let url = eosCommon.ENTERPRISE_API + "api/Equipment/QueryWorkProtocl";
        eosCommon.eosAjax(url, "get", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            vm.protocolList = result.Data;
            vm.$nextTick(() => {
              $('#ProtocolAddress').selectpicker('refresh');
            });

          }
        });
      },
      EquipmentReturn: function() {
        this.$router.go(-1);
      },
      returnBack() {
        this.isAllImport = false;
      },
      allImport() {
        let _this = this;
        _this.isAllImport = true;
        var viewImportData = [];
        _this.saveImportData = [];
        _this.errorSign = 0;
        _this.bindPolicyImport(viewImportData);
        _this.$nextTick(() => {
          _this.initUpLoad();
        })

      },
      initUpLoad() {
        let _this = this;
        $("#fileBox2").empty();
        $("#fileBox2").html(
          '<div id="fileDnd2" class="uploader_box2 eos_uploader_box">' +
          '<div class="wu-example">' +
          '<div class="uploader-list"></div>' +
          '<div class="btns">' +
          '<div id="_picker2">选择上传文件</div>' +
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
          'uploaderBox': '.uploader_box2',
          'uploaderList': '.uploader-list',
          'initBtn': '#_picker2',
          'serverUrl': eosCommon.ENTERPRISE_API + "Api/Upload/AlaramStrategy",
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
              viewTemp.AlarmName = result.Data.UploadData[i]['策略名称'];
              viewTemp.AlarmContent = result.Data.UploadData[i]['告警内容'];
              viewTemp.SeverityLevel = result.Data.UploadData[i]['报警级别'];
              viewTemp.alarmAddress = result.Data.UploadData[i]['报警地址'];
              viewTemp.numericalOperator = result.Data.UploadData[i]['数值运算符'];
              viewTemp.contrastValue = result.Data.UploadData[i]['对比值'];
              viewTemp.ExpressionsDescription = result.Data.UploadData[i]['报警表达式描述'];
              viewTemp.Remark = result.Data.UploadData[i]['备注信息'];
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
              _this.viewImportData = viewImportData
              if(bol == 1) {
                continue;
              }
              var saveTemp = {};
              saveTemp.AlarmName = result.Data.UploadData[i]['策略名称'];
              saveTemp.AlarmContent = result.Data.UploadData[i]['告警内容'];
              saveTemp.SeverityLevel = _this.SeverityLevelHandle(result.Data.UploadData[i]['报警级别']);
              saveTemp.ProtocolAddress = result.Data.UploadData[i]['报警地址'];
              saveTemp.Operator = result.Data.UploadData[i]['数值运算符'];
              saveTemp.TargetValue = result.Data.UploadData[i]['对比值'];
              saveTemp.ExpressionsDescription = result.Data.UploadData[i]['报警表达式描述'];
              saveTemp.Remark = result.Data.UploadData[i]['备注信息'];
              _this.saveImportData.push(saveTemp);
            }
            _this.bindPolicyImport(_this.viewImportData);
            var num1 = parseInt(_this.viewImportData.length)
            var num2 = parseInt(_this.saveImportData.length)
            if(!result.Data.ErrorRows == '') {
              vdialog({
                type: 'confirm',
                title: '提示',
                content: "您导入的数据有" + (num1 - num2) + "条数据验证有误！",
                ok: function() {},
                cancel: false,
                modal: true
              });
              return false;
            }
          },
          'del': function() {
            var viewImportData = [];
            _this.viewImportData = [];
            _this.saveImportData = [];
            _this.errorSign = 0;
            _this.bindPolicyImport(_this.viewImportData);
          }
        })
      },
      SeverityLevelHandle(SeverityLevel) {
        switch(SeverityLevel) {
          case '提醒':
            return '1'
            break;
          case '警告':
            return '2'
            break;
          case '报警':
            return '3'
            break;
          default:
            ''
        }
      },
      savePolicycaolImport() {
        let _this = this;
        if(_this.saveImportData.length <= 0) {
          vdialog({
            type: 'error',
            title: '提示',
            content: '批量导入中没有正确的数据可导入',
            ok: true,
            modal: true
          });
          return false;
        }
        var param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "EquipmentId": _this.EquipmentId,
            "Items": _this.saveImportData
          }
        };
        var url = eosCommon.ENTERPRISE_API + "API/Equipment/BatchAddAlaramStrategy";
        eosCommon.eosAjax(url, "POST", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
            _this.isAllImport = false;
            PolicyTable.ajax.reload();
          }
        });
      },
      savePolicyTemplateData() {},
      bindPolicyImport: function(viewImportData) {
        viewImport = $('#policyctViewImport').DataTable({
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
              data: "AlarmName"
            },
            {
              data: "AlarmContent"
            },
            {
              data: "SeverityLevel"
            },
            {
              data: "alarmAddress"
            },
            {
              data: "numericalOperator"
            },
            {
              data: "contrastValue"
            },
            {
              data: "ExpressionsDescription"
            },
            {
              data: "Remark"
            },
            {
              data: "Message"
            }
					],
          "columnDefs": [{
            "targets": [9],
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
        $('#policyctViewImport tbody').on('click', 'tr', function() {
          if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
          } else {
            viewImport.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
          }
        });
      },
      getPolicy: function() {
        var _this = this;
        // 通信协议
        verifyCheck({
          formId: 'PolicyVerifyCheck',
          onBlur: null,
          onFocus: null,
          onChange: null,
          successTip: true,
          resultTips: null,
          clearTips: null,
          code: true,
          phone: true
        });
        $('#PolicyQueryTxt').bind('keypress', function(e) {
          var e = e || event;
          if(e.keyCode == "13") {
            PolicyTable.ajax.reload();
            return false;
          }
        });
        PolicyTable = $('#PolicyTable').DataTable({
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
                "Keywords": $("#PolicyQueryTxt").val().trim()
              }
            };
            var url = eosCommon.ENTERPRISE_API + "api/equipment/GetPolicy";
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
              "data": "AlarmPolicyId",
              "defaultContent": ''
			          	},
            {
              defaultContent: ""
            },
            {
              data: "AlarmName"
            },
            {
              data: "SeverityLevel"
            },
            {
              data: "Expressions"
            },
            {
              data: "AlarmContent"
            },
            {
              data: "ExpressionsDescription"
            },
            {
              data: "Remark"
            },
            {
              "defaultContent": "<span class='OperatorBtnEdit OperatorEdit' data='1' title='修改报警策略'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除报警策略'><i class='fa fa-trash-o'></i></span>"
            }
					],
          "columnDefs": [{
            "targets": [0],
            "render": function(data) {
              var html = '';
              html = '<label><input type="checkbox" name="allCheckData" id="' + data + '" class="group-checkable" value="' + data + '" /></label>'
              return html
            }
				          }, {
            "targets": [3],
            "render": function(data) {
              var html = '';
              if(data == 1) {
                html = "提醒"
              } else if(data == 2) {
                html = "警告"
              } else if(data == 3) {
                html = "报警(严重)"
              }
              return html
            }
					}]
        });
        PolicyTable.on('draw.dt', function() {
          PolicyTable.column(1, {
            search: 'applied',
            order: 'applied'
          }).nodes().each(function(cell, i) {
            i = i + 1;
            var page = PolicyTable.page.info();
            var pageno = page.page;
            var length = page.length;
            var columnIndex = (i + pageno * length);
            cell.innerHTML = columnIndex;
          });
        });
        $("#PolicyQueryBtn").unbind("click").click(function() {
          PolicyTable.ajax.reload();
        })
        $('#PolicyTable tbody').unbind("click").on('click', 'span', function() {
          var data = PolicyTable.rows($(this).parents('tr')).data();
          var isNum = $(this).attr("data");
          if(isNum == "1") {
            //编辑数据
            _this.ProtocolAddress = '';
            _this.$nextTick(() => {
              $('#ProtocolAddress').selectpicker('refresh');
            });
            editPolicyTableList(data);
          } else if(isNum == "3") {
            //删除信息赋值 函数
            vdialog({
              type: 'confirm',
              title: '提示',
              content: eosCommon.DELETE_MSG_ASK,
              ok: function() {
                eosCommon.eosAjax(
                  eosCommon.ENTERPRISE_API + "api/equipment/DeletePolicy",
                  "Delete", {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                      "EquipmentPolicyIdList": data[0]['AlarmPolicyId']
                    }
                  },
                  "json",
                  function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                      eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                      PolicyTable.ajax.reload();
                    }
                  }
                );
              },
              cancel: true,
              modal: true
            });
          }
        });
        $("#PolicyCancelBtn,#PolicyReturnBtn").unbind('click').click(function() {
          $("#PolicyAdd").hide();
          $("#PolicyList").show();
        });
        $("#addPolicy").unbind('click').click(function() {
          eosCommon.resetFrom();
          $("#PolicyList").hide();
          $("#PolicyAdd").show();
          $("#PolicySaveBtn").attr('data-status', 'save');
          $("#PolicyTitle").html("新增报警策略");
          _this.ProtocolAddress = '';
          _this.$nextTick(() => {
            $('#ProtocolAddress').selectpicker('refresh');
          });
          $("#PolicySeverityLevel").selectpicker('val', 1);
          $("#PolicySeverityLevel").selectpicker('refresh');
          $("#PolicyAlarmName").val("");
          $("#PolicyAlarmContent").val("");
          $("#ExpressionsDescription").val("");
          $("#PolicyRemark").val("");
          $("#PolicyExpressions1").val("");
          $("#PolicyExpressions2").selectpicker('val', "");
          $("#PolicyExpressions3").val("");
          $("#message").removeAttr("checked");
        });
        $("#PolicySeverityLevel").change(function() {
          if($(this).selectpicker('val') == '3') {
            $("#message").attr("checked", "checked");
            $("#email").attr("checked", "checked");
          } else {
            $("#message").removeAttr("checked");
            $("#email").removeAttr("checked", "checked");
          }
        });
        $("#PolicySaveBtn").unbind('click').click(function() {
          if(!verifyCheck._click("PolicyVerifyCheck")) return false;
          if($(this).attr('data-status') == 'save') {
            btn = $(".loading_btn").button('loading');
            eosCommon.eosAjax(
              eosCommon.ENTERPRISE_API + "api/equipment/InsertPolicy",
              "Post", {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                  "EquipmentId": _this.EquipmentId,
                  "SeverityLevel": $("#PolicySeverityLevel").selectpicker('val'),
                  "AlarmName": $("#PolicyAlarmName").val(),
                  "AlarmContent": $("#PolicyAlarmContent").val(),
                  "Expressions": '[V' + _this.ProtocolAddress + ']' + $("#PolicyExpressions2").val() + $("#PolicyExpressions3").val(),
                  "ExpressionsDescription": $("#ExpressionsDescription").val(),
                  "Remark": $("#PolicyRemark").val()
                }
              },
              "json",
              function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                  PolicyTable.ajax.reload();
                  eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                  $("#PolicyAdd").hide();
                  $("#PolicyList").show();
                }
              }
            );
          } else {
            btn = $(".loading_btn").button('loading');
            eosCommon.eosAjax(
              eosCommon.ENTERPRISE_API + "api/equipment/UpdatePolicy",
              "Put", {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                  "EquipmentPolicyId": $("#PolicySaveBtn").attr('data-id'),
                  "EquipmentId": _this.EquipmentId,
                  "SeverityLevel": $("#PolicySeverityLevel").selectpicker('val'),
                  "AlarmName": $("#PolicyAlarmName").val(),
                  "AlarmContent": $("#PolicyAlarmContent").val(),
                  "Expressions": '[V' + _this.ProtocolAddress + ']' + $("#PolicyExpressions2").val() + $("#PolicyExpressions3").val(),
                  "ExpressionsDescription": $("#ExpressionsDescription").val(),
                  "Remark": $("#PolicyRemark").val()
                }
              },
              "json",
              function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                  PolicyTable.ajax.reload();
                  eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                  $("#PolicyAdd").hide();
                  $("#PolicyList").show();
                }
              }
            );
          }
        });
        //绑定复选框id事件
        $('#PolicyTable tbody').unbind("change").on('change', 'input[name=allCheckData]', function() {
          var currentAll = []
          $("#PolicyTable tbody tr td input[name=allCheckData]:checked").each(function() {
            currentAll.push($(this).val());
          })
          _this.selectArr = currentAll
        });
        $('#PolicyTable thead #allIsChecked').unbind("click").on('click', function() {
          $('#PolicyTable thead #allIsChecked').attr("checked", true)
          $("[name=allCheckData]:checkbox").each(function() { //遍历每一个复选框
            //$(this).attr("checked",!$(this).attr("checked")); //jQuery方法取复选框的反向值
            this.checked = !this.checked; //js方法
            var currentAll = []
            $("#PolicyTable tbody tr td input[name=allCheckData]:checked").each(function() {
              currentAll.push($(this).val());
            })
            _this.selectArr = currentAll
          });
        });

        function editPolicyTableList(data) {
          eosCommon.resetFrom();
          $("#PolicySaveBtn").attr('data-status', 'edit');
          $("#PolicySaveBtn").attr('data-id', data[0]['AlarmPolicyId']);
          $("#PolicyAdd").show();
          $("#PolicyList").hide();
          $("#PolicyTitle").html("编辑报警策略");
          $("#PolicySeverityLevel").selectpicker('val', data[0]["SeverityLevel"]);
          $("#PolicySeverityLevel").selectpicker('refresh');
          $("#PolicySeverityLevelName").val(data[0]["SeverityLevelName"]);
          $("#PolicyAlarmName").val(data[0]["AlarmName"]);
          $("#PolicyAlarmContent").val(data[0]["AlarmContent"]);
          let [protocolAddress, index, protocolAddressHandle] = [];
          protocolAddress = data[0]["Expressions"];
          index = protocolAddress.indexOf(']');
          protocolAddressHandle = protocolAddress.split(protocolAddress[index])[0].split('[V')[1];
          _this.ProtocolAddress = protocolAddressHandle;
          _this.$nextTick(() => {
            $('#ProtocolAddress').selectpicker('refresh');
          });
          $("#ExpressionsDescription").val(data[0]["ExpressionsDescription"]);
          $("#PolicyRemark").val(data[0]["Remark"]);

          if(data[0]["SeverityLevel"] == '3') {
            $("#message").attr("checked", "checked");
            $("#email").attr("checked", "checked");
          } else {
            $("#message").removeAttr("checked");
            $("#email").removeAttr("checked", "checked");
          }
          if(data[0]['Expressions'].indexOf(">") != -1) {
            expressionsFn(data[0]['Expressions'], '>')
          }
          if(data[0]['Expressions'].indexOf("<") != -1) {
            expressionsFn(data[0]['Expressions'], '<')
          }
          if(data[0]['Expressions'].indexOf("==") != -1) {
            expressionsFn(data[0]['Expressions'], '==')
          }
          if(data[0]['Expressions'].indexOf("≥") != -1) {
            expressionsFn(data[0]['Expressions'], '≥')
          }
          if(data[0]['Expressions'].indexOf("≤") != -1) {
            expressionsFn(data[0]['Expressions'], '≤')
          }
        };

        function expressionsFn(data, s) {
          $("#PolicyExpressions1").val(data.split(s)[0].split('[')[1].split(']')[0].split('V')[1]);
          $("#PolicyExpressions2").selectpicker('val', s);
          $("#PolicyExpressions2").selectpicker('refresh');
          $("#PolicyExpressions3").val(data.split(s)[1]);
        }
      }
    }

  }
</script>

<style>

</style>
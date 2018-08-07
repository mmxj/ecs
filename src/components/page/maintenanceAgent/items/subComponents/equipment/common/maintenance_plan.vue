<style scoped>
.OrgTopAliginTime{
    width: 190px;
}
</style>
<template>
  <div id="maintenance-plan">
    <div class="col-sm-12">
      <div id="maintenancePlanningList" class="bg-white table-responsive" style="min-height: 220px;padding: 15px">
        <!--<div class="row">
                    <div class="col-sm-6 col-md-4 col-lg-2">
                        <span class="size20 font-bold">维保计划</span>
                    </div>
                </div>
                <hr class="divider mb-10 mt-10">-->
        <div class="row">
          <div class="col-lg-12">
            <span class="OrgTopAligin OperatorInsert">
                            <button @click="addRecord()" type="button" class="btn btn-default waves-effect waves-light">
                                <i class="fa fa-plus m-r-5"></i>新增
                            </button>
                        </span>
            <span class="OperatorSearch">                       
                        <div class="OrgTopAligin">
                            <select id="ServiceState" class="form-control selectpicker input-sm" data-style="btn-white">
                                <option value="0">请选择状态</option>
                                <option value="1">未开始</option>
                                <option value="2">进行中</option>
                                <option value="3">已结束</option>
                                <option value="4">已取消</option>
                            </select>
                        </div>
                        <span class="OrgTopAliginTime">
                            <!-- <span id="StartDate1" class="input-group date form_date" data-date="2017-01-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                <input id="StartDate" class="form-control" size="16" type="text" value="" readonly placeholder="开始时间">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
            </span> -->
            <el-date-picker size='small' v-model="StartDate" :clearable='false' :editable='false' type="datetime" placeholder="开始时间"></el-date-picker>
            </span>
            <span class="OrgTopAliginTime">
                            <!-- <span id="StartDate2" class="input-group date form_date" data-date="2017-01-01" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                <input id="EndDate" class="form-control" size="16" type="text" value="" readonly placeholder="结束时间">
                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                        </span> -->
            <el-date-picker size='small' v-model="EndDate" :clearable='false' :editable='false' type="datetime" placeholder="结束时间"></el-date-picker>
            </span>
            <span class="OrgTopAligin">
                            <input id="MaintainPlanKeywords" type="text" class="form-control w-128" placeholder="计划名称">
                        </span>
            <span class="OrgTopAligin">
                            <button @click="serarch()" type="button" class="btn btn-default waves-effect waves-light">
                                <i class="fa fa-search m-r-5"></i>查找
                            </button>
                        </span>
            </span>
          </div>
        </div>
        <!--<div class="row">
                    <div class="dataTables_wrapper no-footer" v-show="noData">
                        <div id="example1_processing" class="dataTables_processing">数据加载中...</div>
                    </div>
                </div>-->
        <loading v-show="noData"></loading>
        <!--<div class="row">
                    <div class="dataTables_wrapper no-footer" v-show="emptyData">
                        <div class="dataTables_processing" style="background-image: none;text-indent: 0;">暂无数据</div>
                    </div>
                </div>-->
        <table id="eosSelectAcitve" class="table table-striped table-bordered" width="100%" style="border: 0 solid #fff;margin-top: 10px;">
          <thead class="thead-bottom-line">
            <tr>
              <th class="sorting-title">序号</th>
              <th class="sorting-title">计划名称</th>
              <th class="sorting-title">所属项目</th>
              <th class="sorting-title content-max-width">计划内容</th>
              <th class="sorting-title">执行时间</th>
              <th class="sorting-title">状态</th>
              <th class="sorting-title-min">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr @click="activehover(index)" class="list-table-hover" v-for="(item,index) in planListData">
              <td class="sorting_content">{{index+1+((indexInt-1)*page_size)}}</td>
              <td class="sorting_content">{{item.PlanName}}</td>
              <td class="sorting_content">{{item.ProjectName}}</td>
              <td class="sorting_content content-max-width">{{item.PlanContent}}</td>
              <td class="sorting_content">{{item.StartTime}}<span class="ml-10 mr-10">至</span><span>{{item.EndTime}}</span></td>
              <td class="sorting_content">
                <label v-if="item.PlanStatus==1" class="label eos-btn-info btn-rounded">
                  {{item.PlanStatusName}}
                </label>
                <label v-else-if="item.PlanStatus==2" class="label eos-btn-normal btn-rounded">
                  {{item.PlanStatusName}}
                </label>
                <label v-else-if="item.PlanStatus==3" class="label eos-btn-info btn-rounded">
                  {{item.PlanStatusName}}
                </label>
              </td>
              <td class="sorting_content">
                <span v-if="item.PlanStatus==1" class="OperatorBtnEdit OperatorEdit" @click="editRequest(item)" title="编辑信息"><i class="fa fa-pencil"></i></span>
                <span class="OperatorBtnDel OperatorDel" @click="delRequest(item.MaintainPlanId)" title="删除信息"><i class="fa fa-trash-o"></i></span>
              </td>
            </tr>
          </tbody>
        </table>
        <no-data v-show="emptyData"></no-data>
        <div class="dataTables_wrapper" v-if="page_num > 0">
          <div class="dataTables_info" role="status" aria-live="polite">当前显示 {{begin_row}} 到 {{end_row}} 条记录 共 {{total}} 条记录</div>
          <div class="dataTables_paginate paging_full_numbers">
            <a class="paginate_button previous" v-bind:class="page_record == 1 ? 'disabled' : ''" v-on:click="up_page">上一页</a>
            <span>
                            <template v-if="(page_num > 0 && page_num <= 7)">
                                <a class="paginate_button " v-on:click="on_page(num)" v-for="num in page_num" v-bind:class="num == page_index ? 'current' : ''">{{num}}</a>
                            </template>
                            <template v-else>
                                <a class="paginate_button " v-on:click="on_page(1)" v-bind:class="page_record == 1 ? 'current' : ''">1</a>
                                <span class="ellipsis" v-if="page_record-3 > 2">…</span>
            <a class="paginate_button" v-on:click="on_page(one_page)" v-bind:class="page_record == one_page ? 'current' : ''">{{one_page}}</a>
            <a class="paginate_button" v-on:click="on_page(two_page)" v-bind:class="page_record == two_page ? 'current' : ''">{{two_page}}</a>
            <a class="paginate_button" v-on:click="on_page(three_page)" v-bind:class="page_record == three_page ? 'current' : ''">{{three_page}}</a>
            <a class="paginate_button" v-on:click="on_page(four_page)" v-bind:class="page_record == four_page ? 'current' : ''">{{four_page}}</a>
            <a class="paginate_button" v-on:click="on_page(five_page)" v-bind:class="page_record == five_page ? 'current' : ''">{{five_page}}</a>
            <span class="ellipsis" v-if="page_record+3 <= page_num">…</span>
            <a class="paginate_button " v-on:click="on_page(page_num)" v-bind:class="page_record == page_num ? 'current' : ''">{{page_num}}</a>
</template>
</span>
<a class="paginate_button next" v-bind:class="page_record == page_num ? 'disabled' : ''" v-on:click="dow_page">下一页</a>
</div>
</div>
</div>
<div id="addRecord" class="card-box table-responsive" style="display: none;">
  <div class="row">
    <div class="col-md-6">
      <span class="size20 font-bold view-title">新增维保计划</span>
    </div>
    <div class="col-md-6">
      <button type="button" class="btnReturn btn btn-white pull-right" @click="btnReturn()"><i class="fa fa-mail-reply-all m-r-5"></i>返回
      </button>
    </div>
  </div>
  <hr class="divider mb-10 mt-10">
  <div id="verifyCheck">
    <div class="form-horizontal content-box">
      <div class="form-group">
        <label class="content-title-left"><em class="ak_required_em">*</em>计划名称</label>
        <div class="col-lg-5 col-xs-8">
          <span class="valid-form-group" style="padding-left:0px;">
                                    <label class="focus valid"></label>
                                </span>
          <input id="MaintainPlanNameAdd" type="text" class="form-control required" placeholder="计划名称" data-valid="isNonEmpty" data-error="计划名称不能为空" maxlength="20" />
          <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
          <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
        </div>
      </div>
      <div class="form-group">
        <label class="content-title-left"><em class="ak_required_em">*</em>开始时间</label>
        <div class="col-lg-2 col-xs-3">
          <span id="spanEndTime1" class="input-group date form_time" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                    <span class="valid-form-group-addon">
                                        <label class="focus valid"></label>
                                    </span>
          <input id="txtStartTime1Add" class="form-control required" size="16" type="text" data-valid="isNonEmpty" data-error="开始时间不能为空" readonly placeholder="开始时间">
          <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
          </span>
        </div>
        <div class="col-lg-1 col-xs-2">
          <label class="content-title-left"><em class="ak_required_em">*</em>结束时间</label>
        </div>
        <div class="col-lg-2 col-xs-3">
          <span id="spanEndTime2" class="input-group date form_time" data-date="" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                    <span class="valid-form-group-addon">
                                        <label class="focus valid"></label>
                                    </span>
          <input id="txtEndTime1Add" class="form-control required" size="16" type="text" data-valid="isNonEmpty" data-error="结束时间不能为空" readonly placeholder="结束时间">
          <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
          </span>
        </div>
      </div>
      <div class="form-group">
        <label class="content-title-left"><em class="ak_required_em">*</em>计划内容</label>
        <div class="col-lg-5 col-xs-8">
          <span class="valid-form-group" style="top: 86px;padding-left:0px;">
                                    <label class="focus valid"></label>
                                </span>
          <textarea id="MaintainPlanContentAdd" maxlength="1500" class="form-control required" data-valid="isNonEmpty" data-error="计划内容不能为空" /></textarea>
          <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
          <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
        </div>
      </div>
    </div>
    <div class="content-box-footer">
      <div class="form-group">
        <label class="content-title-left"></label>
        <div class="col-lg-5 col-xs-8 pl-22">
          <button @click="btnReturn()" type="button" class="btnReturn btn btn-white pull-left mr-20">取消</button>
          <button @click="btnSave()" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中..." :data="editStatus">确定</button>
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
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
export default {
  data: function() {
    return {
      isaddRecord: false,
      planListData: "",
      planSerach: "",
      page_size: 10, //页大小
      page_index: 1, //页索引
      begin_row: 0, //开始条数
      end_row: 0, //结束条数
      total: 0, //总的数据条数
      page_num: 0, //多少页
      page_record: 1, //当前页码
      processing: 0, //0:数据加载处理中 1:处理完成
      ContactRole: 0,
      selectItemAdd: '',
      selectDevice1Add: '',
      StartDateAdd: '',
      EndDateAdd: '',
      MaintainPlanNameAdd: '',
      MaintainPlanContentAdd: '',
      txtStartTime1Add: '',
      txtEndTime1Add: '',
      ServiceState: '',
      btnStatus: '',
      StartDate: '',
      EndDate: '',
      MaintainPlanKeywords: '',
      ProjectId: '',
      EquipmentId: '',
      MaintainPlanName: '',
      MaintainPlanContent: '',
      noData: false,
      emptyData: '',
      editStatus: 1,
      indexInt: 1,
      initProjectId: '',
      initEquipmentId: '',
      MaintainPlanId: ""
    }
  },
  computed: {
    one_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 2 : this.page_num - 5) : 2);
    },
    two_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index - 1 : this.page_num - 4) : 3);
    },
    three_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index : this.page_num - 3) : 4);
    },
    four_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 1 : this.page_num - 2) : 5);
    },
    five_page: function() {
      return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.page_num - 1 ? this.page_index + 2 : this.page_num - 1) : 6);
    }
  },
  props: ['propsData'],
  methods: {
    setTimeStr(date) {
      if (date === '') return date
      Date.prototype.format = FUNC.date.format
      date = date.format("yyyy-MM-dd hh:mm:ss")
      return date
    },
    getData: function() {
      var _this = this;
      _this.noData = true;
      this.initProjectId = this.propsData.ProjectId;
      this.initEquipmentId = this.propsData.EquipmentId;
      var params = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "PageIndex": this.page_index,
        "PageSize": this.page_size,
        "Parameters": {
          "ProjectId": this.initProjectId,
          "EquipmentId": this.initEquipmentId,
          "Status": $("#ServiceState").val(),
          // "StartDate": $("#StartDate").val(),
          // "EndDate": $("#EndDate").val(),
          "StartDate": _this.setTimeStr(_this.StartDate),
          "EndDate": _this.setTimeStr(_this.EndDate),
          "Keywords": $("#MaintainPlanKeywords").val().trim()
        }
      };
      eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/QueryMaintainPlan', "GET", params, "json", function(result) {
        _this.processing = 1;
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.noData = false;
          if (result.Data == "") {
            _this.planListData = [];
            _this.page_num = 0;
            _this.emptyData = true;
          } else {
            _this.emptyData = false;
            _this.total = result.Data.Total;
            _this.planListData = result.Data.Result;
            _this.begin_row = _this.page_size * (_this.page_index - 1) + 1;
            _this.end_row = _this.page_size * (_this.page_index - 1) + _this.planListData.length;
            _this.page_num = Math.ceil(_this.total / _this.page_size);
          }
        }
      });
    },
    addRecord: function() {
      //var _this=this;
      //_this.isaddRecord=!_this.isaddRecord;
      verifyCheck._clearTips($('#addSelectItemText'));
      verifyCheck._clearTips($('#MaintainPlanNameAdd'));
      verifyCheck._clearTips($('#MaintainPlanContentAdd'));
      this.editStatus = 1;
      $(".view-title").html("新增维保计划");
      $('#addRecord').show();
      $('#maintenancePlanningList').hide();
      $('#selectItemAdd').selectpicker('val', '');
      this.getDeviceList("#selectDevice1Add", 0);
      $("#MaintainPlanNameAdd").val("");
      $("#MaintainPlanContentAdd").val("");
      $('#txtStartTime1Add').val(eosCommon.getTime("yyyy-MM-dd hh:mm:ss", 0));
      $('#txtEndTime1Add').val(eosCommon.getTime("yyyy-MM-dd hh:mm:ss", 1));
      $('#spanEndTime2').datetimepicker('setStartDate', $("#txtStartTime1Add").val());
      $('#spanEndTime1').datetimepicker('setEndDate', $("#txtEndTime1Add").val());
    },
    btnReturn: function() {
      verifyCheck._clearTips($('#addSelectItemText'));
      verifyCheck._clearTips($('#MaintainPlanNameAdd'));
      verifyCheck._clearTips($('#MaintainPlanContentAdd'));
      $('#addRecord').hide();
      $('#maintenancePlanningList').show();
    },
    btnSave: function() {
      verifyCheck._clearTips($('#addSelectItemText'), 1);
      verifyCheck._clearTips($('#MaintainPlanNameAdd'), 1);
      verifyCheck._clearTips($('#MaintainPlanContentAdd'), 1);
      if (!verifyCheck._click()) {
        return false;
      }
      if ($("#selectDevice1Add").selectpicker('val') == '') {
        vdialog({
          type: 'error',
          title: '提示',
          content: "该项目暂无设备",
          ok: function() {},
          cancel: true,
          modal: true
        });
        return false;
      };
      var _this = this;
      btn = $(".loading_btn").button('loading');

      this.initProjectId = this.propsData.ProjectId;
      this.initEquipmentId = this.propsData.EquipmentId;
      if (this.editStatus == 1) {
        var param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "ProjectId": this.initProjectId,
            "EquipmentId": this.initEquipmentId,
            "MaintainPlanName": $("#MaintainPlanNameAdd").val(),
            "MaintainPlanContent": $("#MaintainPlanContentAdd").val(),
            "StartDate": $("#txtStartTime1Add").val(),
            "EndDate": $("#txtEndTime1Add").val()
          }
        };
        var url = eosCommon.ENTERPRISE_API + 'api/equipment/maintainplan';
        eosCommon.eosAjax(url, "Post", param, "json", function(result) {
          if (eosCommon.checkCode(result.State, result.Message)) {
            eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
            _this.page_index = 1;
            _this.getData();
            $('#addRecord').hide();
            $('#maintenancePlanningList').show();
            $(".loading_btn").button('reset');
          }
        });
      } else {
        var param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "MaintainPlanId": this.MaintainPlanId,
            "ProjectId": this.initProjectId,
            "EquipmentId": this.initEquipmentId,
            "MaintainPlanName": $("#MaintainPlanNameAdd").val(),
            "MaintainPlanContent": $("#MaintainPlanContentAdd").val(),
            "StartDate": $("#txtStartTime1Add").val(),
            "EndDate": $("#txtEndTime1Add").val()
          }
        };
        var url = eosCommon.ENTERPRISE_API + 'api/equipment/updatemaintainplan';
        eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
          if (eosCommon.checkCode(result.State, result.Message)) {
            eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
            _this.page_index = 1;
            _this.getData();
            $('#addRecord').hide();
            $('#maintenancePlanningList').show();
            $(".loading_btn").button('reset');
          }
        });
      }
    },
    setChangeEvent: function() {
      var _this = this;
      $('#selectItem').change(function() {
        var ProjectId = $('#selectItem').selectpicker('val');
        _this.getDeviceList("#selectDevice", ProjectId);
      });
      $('#selectDevice').change(function() {
        _this.initEquipmentId = $("#selectDevice").selectpicker('val');
        _this.getData();
      });
      $('#selectItemAdd').change(function() {
        var ProjectId = $('#selectItemAdd').selectpicker('val');
        if ($(this).selectpicker('val') == "") {
          $("#addSelectItemText").val("");
          verifyCheck({
            formId: 'verifyCheck',
            onBlur: null,
            onFocus: null,
            onChange: null,
            successTip: true,
            resultTips: null,
            clearTips: null,
            code: true,
            phone: true
          });
        } else {
          $("#addSelectItemText").val($(this).selectpicker('val'));
          _this.getDeviceList("#selectDevice1Add", ProjectId);
        }
      });
    },
    getProjectList: function() {
      var _this = this;
      var params = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "PageIndex": '',
        "PageSize": '',
        "Parameters": {
          "Keywords": ""
        }
      };
      eosCommon.eosAjax(eosCommon.COMMON_API + 'api/common/project', "GET", params, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          if (result.Data != "") {
            for (var i = 0; i < result.Data.Result.length; i++) {
              $("#selectItem,#selectItemAdd").append("<option value=" + result.Data.Result[i]['ProjectId'] + ">" + result.Data.Result[i]['ProjectName'] + "</option>");
            }
            $("#selectItem,#selectItemAdd").selectpicker('refresh');
          }
        }
      });
    },
    getDeviceList: function(obj, ProjectId, fn) {
      if (ProjectId == 0) {
        $(obj).empty().append("<option value='0'>选择设备</option>");
        $(obj).selectpicker('refresh');
      } else {
        var _this = this;
        var params = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "PageIndex": '',
          "PageSize": '',
          "Parameters": {
            "ProjectId": ProjectId
          }
        };
        eosCommon.eosAjax(eosCommon.COMMON_API + 'api/common/equipment', "GET", params, "json", function(result) {
          if (eosCommon.checkCode(result.State, result.Message)) {
            if (result.Data != "") {
              $(obj).empty();
              for (var i = 0; i < result.Data.Result.length; i++) {
                $(obj).append("<option value=" + result.Data.Result[i]['EquipmentId'] + ">" + result.Data.Result[i]['EquipmentName'] + "</option>");
              }
              $(obj).selectpicker('refresh');
              _this.initEquipmentId = $("#selectDevice").selectpicker('val');
              _this.getData();
              fn && fn();
            } else {
              $(obj).empty();
              $(obj).append("<option value=''>暂无设备</option>");
              $(obj).selectpicker('refresh');
              _this.getData();

            }
          }
        });
      }
    },
    removeActiveClass: function() {
      $("table#eosSelectAcitve tbody tr.list-table-hover").removeClass("active");
    },
    activehover: function(index) {
      var arrLi = [];
      var aLi = $("table#eosSelectAcitve tbody tr.list-table-hover")
      for (var i = 0; i < aLi.length; i++) {
        arrLi.push(aLi[i])
      }
      for (var i = 0; i < arrLi.length; i++) {
        if (arrLi[i] != this) {
          $(arrLi[i]).removeClass("active")
        }
      }
      if (!$(arrLi[i]).hasClass("active")) {
        $(arrLi[index]).addClass("active")
      } else {
        $(arrLi[i]).removeClass("active")
      }
    },
    setSelectTime: function() {
      $('.form_date').datetimepicker({
        language: 'zh-CN',
        weekStart: 1,
        todayBtn: 1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        minView: 2,
        forceParse: 0
      });
      $('.form_time').datetimepicker({
        format: 'yyyy-mm-dd hh:ii:ss',
        weekStart: 1,
        autoclose: true,
        forceParse: false,
        todayBtn: 1,
        todayHighlight: 1,
        language: 'zh-CN'
      });
      //              $('#StartDate').val(eosCommon.getTime("yyyy-MM-dd", -30));
      //              $('#EndDate').val(eosCommon.getTime("yyyy-MM-dd", 1));
      //              $('#StartDate2').datetimepicker('setStartDate', $("#StartDate").val());
      //              $('#StartDate1').datetimepicker('setEndDate', $("#EndDate").val());
      /*$("#StartDate").change(function() {
        $('#StartDate2').datetimepicker('setStartDate', $(this).val());
      });
      $("#EndDate").change(function() {
        $('#StartDate1').datetimepicker('setEndDate', $(this).val());
      });*/
      $("#txtStartTime1Add").change(function() {
        $('#spanEndTime2').datetimepicker('setStartDate', $(this).val());
      });
      $("#txtEndTime1Add").change(function() {
        $('#spanEndTime1').datetimepicker('setEndDate', $(this).val());
      });
    },
    editRequest: function(item) {
      this.MaintainPlanId = item.MaintainPlanId
      this.editStatus = 2;
      $(".view-title").html("编辑维保计划");
      $('#addRecord').show();
      $('#maintenancePlanningList').hide();
      $("#selectItemAdd").selectpicker('val', item.ProjectId);
      this.getDeviceList("#selectDevice1Add", item.ProjectId, function() {
        $("#selectDevice1Add").selectpicker('val', item.EquipmentId);
      });
      $("#MaintainPlanNameAdd").val(item.PlanName);
      $("#MaintainPlanContentAdd").val(item.PlanContent);
      $("#txtStartTime1Add").val(item.StartTime);
      $("#txtEndTime1Add").val(item.EndTime);
      $('#spanEndTime2').datetimepicker('setStartDate', $("#txtStartTime1Add").val());
      $('#spanEndTime1').datetimepicker('setEndDate', $("#txtEndTime1Add").val());
    },
    delRequest: function(id) {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "MaintainPlanId": id
        }
      };
      var url = eosCommon.ENTERPRISE_API + "api/equipment/deletemaintainplan";
      vdialog({
        type: 'confirm',
        title: '提示',
        content: eosCommon.DELETE_MSG_ASK,
        ok: function() {
          eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
            if (eosCommon.checkCode(result.State, result.Message)) {
              eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
              _this.getData();
            }
          });
        },
        cancel: true,
        modal: true
      });
    },
    serarch: function() {
      this.page_index = 1;
      this.getData()
    },
    up_page: function() {
      if (this.page_index > 1) {
        this.page_index--;
        this.page_record--;
      }
    },
    on_page: function(data) {
      this.page_index = data;
      this.page_record = data;
    },
    dow_page: function() {
      if (this.page_index < this.page_num) {
        this.page_index++;
        this.page_record++;
      }
    },
    initData() {
      var _this = this;
      this.setChangeEvent();
      verifyCheck({
        formId: 'verifyCheck',
        onBlur: null,
        onFocus: null,
        onChange: null,
        successTip: true,
        resultTips: null,
        clearTips: null,
        code: true,
        phone: true
      });
      this.setSelectTime();
      this.getData();
      this.getProjectList();
      $("#ServiceState,#selectDevice1Add").selectpicker("refresh");
      $('#selectItem,#selectDevice,#ServiceState').change(function() {
        _this.getData();
      });
      $('#MaintainPlanKeywords').bind('keypress', function(e) {
        var e = e || event
        if (e.keyCode == "13") {
          _this.page_index = 1;
          _this.getData();
        }
      });
    }
  },
  watch: {
    page_index: function(val) {
      this.indexInt = val;
      this.getData();
      this.removeActiveClass();
    },
    propsData: {
      handler(val, oldVal) {
        this.initData();
      },
      deep: true
    }
  },
  updated: function() {
    eosCommon.eosOperators(eosCommon.eosOperDataHandle());
  },
  mounted: function() {
    this.initData();
  }
}

</script>
<style>
#maintenance-plan .dataTables_wrapper .dataTables_processing {
  top: 70px;
}

</style>

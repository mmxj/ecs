<template>
  <div>
    <div class="container-fluid" style="margin-bottom: 50px; box-shadow: 5px 5px 5px 2px #E3E3E3;">
      <span class="OperatorSearch container" style="width: 100%;">
							<span class="OrgTopAligin" v-show="!propsData.EquipmentId">
        						<select id="selectItem" class="form-control selectpicker" data-style="btn-white">
        							<option value="">请选择项目</option>        							
        						</select>
        					</span>
      <span class="OrgTopAligin" v-show="!propsData.EquipmentId">
        						<select id="selectDevice" class="form-control selectpicker" data-size="5" data-style="btn-white">
        							<option value="">请选择设备</option>        							
        						</select>
        					</span>
      <span class="OrgTopAligin pull-right">
        						<button id="btnQuery" type="button" class="btn btn-default filterBtn" data-toggle="modal" data-target="#filterRegisterAddresses">
        							<i class=" fa fa-hourglass-2 m-r-5"></i>筛选
        						</button>
        					</span>
      </span>
      <div class="time_select col-lg-12 col-md-12" style="padding-top: 10px;">
        <nav class="navbar navbar-default col-md-4 col-sm-4 col-lg-4 col-md-offset-4">
          <div class="collapse navbar-collapse">
            <ul class="nav nav-tabs  nav-justified">
              <li class="btn-group hours lisBorder" role="presentation" :class="{nowActive: currentSelectedTime=='hours'}">
                <a :class="{nowActive: currentSelectedTime=='hours'}" @click="selectTime('hours')">时</a>
              </li>
              <li role="presentation" class="days btn-group lisBorder" :class="{nowActive: currentSelectedTime=='days'}">
                <a :class="{nowActive: currentSelectedTime=='days'}" @click="selectTime('days')">日</a>
              </li>
              <li role="presentation" class="months btn-group lisBorder" :class="{nowActive: currentSelectedTime=='months'}">
                <a :class="{nowActive: currentSelectedTime=='months'}" @click="selectTime('months')">月</a>
              </li>
              <li role="presentation" class="years btn-group lisBorder" :class="{nowActive: currentSelectedTime=='years'}">
                <a :class="{nowActive: currentSelectedTime=='years'}" @click="selectTime('years')">年</a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <div class="nowTime row col-lg-12 col-md-12" style="padding: 10px 0;">
        <p style="text-align: center;padding: 10px 0;"><b>当前选择时间：</b><b>{{currentTime}}</b></p>
      </div>
      <div id="filterRegisterAddresses" class="modal fade" role="dialog" data-backdrop="static" aria-hidden="true" style="display: none;">
        <div class="modal-content">
          <div class="modal-header time_select">
            <button type="button" class="win-close" data-dismiss="modal">×</button>
            <button @click="savefilterRegisterAddresses()" type="button" class="sava">保存</button>
            <span class="OrgTopAliginTime col-lg-4 col-md-4 col-sm-4" style="margin: 0 0 -45px 0px;width: 200px;"><!--style="margin: 0 0 -45px -10px;width: 180px;"-->
                                <span id="spanEndTime1" class="input-group date form_time "  data-date="" data-date-format="yyyy-MM-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                    <input id="StartDate" class="form-control " size="16" type="text" value="" readonly='true'>
                                    <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
            </span>
            </span>
          </div>
          <div id="getRegisterAddressCheck">
            <div id="modal_body1" class="modal-body nicescroll">
              <div class="form-horizontal mt-10 content-box-modal" style="display: block;">
                <ul id="checkLists" style=" padding-left: 0;">
                  <!--<div class="" v-show="DisplayNameArr.length==0">
											<div class="" style="height: 300px; line-height: 300px;background: #fff; font-size: 16px; color: #999; text-align: center;">暂无数据节点</div>
											
									</div>-->
                  <no-data :noDataInfo="'暂无数据节点'" v-show="DisplayNameArr.length==0"></no-data>
                  <li v-for="(item,index) in DisplayNameArr" class="checkbox-inline form-group" style="margin-left: 50px;  display: block;">
                    <label>
                      <input type="checkbox" :checked="item.isCheck" :value="item.RegisterAddress">{{item.DisplayName}}
                    </label>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row bg-white chartLists table-responsive" style="">
      <!--<div class="" v-show="!RegisterAddressParams">
						<div class="" style="height: 300px; line-height: 300px; background: #fff; font-size: 16px; text-align: center; color: #999;">暂无数据或请重新筛选数据节点</div>
					</div>-->
      <no-data :noDataInfo="'暂无数据或请重新筛选数据节点!'" v-show="emptyData"></no-data>
      <loading v-show="noData"></loading>
      <div class="currentChartLists " v-if="(!emptyData) && (!noData)">
        <div class="currentChart container-fluid myCarBox" v-for="(item,index) in chartDatas" style="margin-bottom: 50px;padding: 0px 200px;">
          <div v-if='chartDatas.length != 0' :id="index" :datas='item.Address' style="height:300px;"></div>
          <table style="background: #fff; display: none;" class="table table-striped table-bordered" width="100%">
            <caption style="text-align: center; background: #fff;">{{item.DisplayName}}(单位：{{item.Unit}})</caption>
            <tbody>
              <tr>
                <th>时间</th>
                <th v-for="data in item.XArray">{{data}}</th>
              </tr>
              <tr>
                <th>数据值</th>
                <th v-for="data in item.YArray">{{data}}{{item.Unit}}</th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return {
      dateData: {
        'years': [],
        'months': [],
        'days': [],
        'hours': []
      },
      currentSelectedTime: 'hours',
      nowTimeDatas: {
        'years': [],
        'months': [],
        'days': [],
        'hours': []
      },
      noData: true,
      emptyData: false,
      name: '',
      Unit: '',
      equimentId: '',
      DisplayNameArr: [],
      QueryTimeType: 1,
      chartDatas: [],
      title: '',
      RegisterAddress: [],
      RegisterAddressParams: '',
      limit: 4,
      listAdressParams: '',
      page_size: 20, //页大小
      page_index: 1, //页索引
      total: 0, //总的数据条数
      page_num: 0, //多少页
      page_record: 1, //当前页码,
      table: '',
      tableAdressName: '数据值',
      nowTime: '',
      selectedMonth: '月',
      selectedDate: "日",
      selectedYear: '年',
      selectedHour: '时',
      initProjectId: '',
      isSearch: false,
      isCurrentExpand: false,
      myResultArr: [],
      isTimeSelected: false,
      currentTime: ''
    }
  },
  props: ['propsData'],
  methods: {
    bind_HighCharts: function(el, timeTypeData, name, data, unit, title, timeType) {
      var _this = this;
      _this.myResultArr = [];
      //Highcharts.chart('container',
      $(el).highcharts({

        chart: {
          type: 'line'
        },
        credits: {
          enabled: false
        },
        title: {
          text: title + '(单位：' + unit + ')',
          style: { color: '#1abc9c' }
        },
        xAxis: {
          categories: timeTypeData
        },
        yAxis: {
          min: 0,
          title: {
            text: unit
          },
          labels: {
            formatter: function() {
              return this.value + unit;
            }

          },
          tooltip: {

          }

        },
        tooltip: {
          formatter: function() {

            var s = '<div style="font-size:12px;color:red">' + this.x + '~' + '</div>' + '<div style="font-size:12px;border:none;display:block;">' + this.y + unit + '</div>';
            return s;
          }

        },
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true // 开启数据标签
            },
            enableMouseTracking: true,
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: {
            events: {
              legendItemClick: function(e) {

                _this.tableAdressName = title;
                if (!_this.isCurrentExpand) {
                  $(el).next().show();
                  _this.isCurrentExpand = true;
                } else {
                  $(el).next().hide();
                  _this.isCurrentExpand = false;
                }
                return false;
                /*
                 * 默认实现是显示或隐藏当前数据列，e 代表事件， this 为当前数据列
                 */
              }
            }
          }
        },
        series: [{
          name: '查看数据表',
          data: data
        }]
      });
    },
    handTableDatas: function(timeTypeData, data, timeType, unit) {
      var _this = this;
      var nowTime = _this.getNowDate();
      for (var i = 0; i < timeTypeData.length; i++) {
        _this.myResultArr.push({ "ActivityDate": timeTypeData[i], "NodeValue": data[i] });
      }
    },
    getDaysInOneMonth: function(year, month) {
      //计算某年某月有多少天
      month = parseInt(month, 10);
      var d = new Date(year, month, 0);
      return d.getDate();
    },
    selectTime: function(timeType) {
      var _this = this;
      _this.emptyData = false;
      _this.currentSelectedTime = timeType;
      _this.formatCurrentTime();
      if (_this.RegisterAddressParams == '') {
        //暂无数据节点或请重新筛选数据节点
        _this.noData = false;
        _this.emptyData = true;
        return;
      }
      _this.getData(_this.currentSelectedTime)
    },
    getData: function(timeType) {
      var _this = this;
      _this.noData = true;
      if (timeType == 'years') {
        _this.QueryTimeType = 3;
      }
      if (timeType == 'months') {
        _this.QueryTimeType = 2;
      }
      if (timeType == 'days') {
        _this.QueryTimeType = 1;
      }
      if (timeType == 'hours') {
        _this.QueryTimeType = 0;
      }
      _this.nowTime = $('#StartDate').val();
      _this.formatCurrentTime();
      var params = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "TerminalEquipmentId": _this.equimentId, //设备ID _this.equimentId                     						
        "QueryTimeType": _this.QueryTimeType, //查询类型 0:时 1:天 2:月 3:年
        "StatTime": _this.nowTime, //统计时间，按小时查询精确到小时，按天查询精确到日期，按月查询精确到当月的1号，按年查询精确到今年的1月1号
        "RegisterAddresses": _this.RegisterAddressParams
      }

      eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/QueryEquipmentRunData', "GET", params, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.noData = false;
          _this.chartDatas = result.Data;
          if (timeType == 'hours') {
            for (var i = 0; i < _this.chartDatas.length; i++) {
              for (var j = 0; j < _this.chartDatas[i].XArray.length; j++) {
                _this.chartDatas[i].XArray[j] = _this.chartDatas[i].XArray[j] + '分';
              }
            }
          }
          if (timeType == 'days') {
            for (var i = 0; i < _this.chartDatas.length; i++) {
              for (var j = 0; j < _this.chartDatas[i].XArray.length; j++) {
                _this.chartDatas[i].XArray[j] = _this.chartDatas[i].XArray[j] + '时';
              }
            }
          }
          if (timeType == 'months') {
            for (var i = 0; i < _this.chartDatas.length; i++) {
              for (var j = 0; j < _this.chartDatas[i].XArray.length; j++) {
                _this.chartDatas[i].XArray[j] = _this.chartDatas[i].XArray[j] + '日';
              }
            }
          }
          if (timeType == 'years') {
            for (var i = 0; i < _this.chartDatas.length; i++) {
              for (var j = 0; j < _this.chartDatas[i].XArray.length; j++) {
                _this.chartDatas[i].XArray[j] = _this.chartDatas[i].XArray[j] + '月';
              }
            }
          }
          _this.$nextTick(function() {
            for (var i = 0; i < _this.chartDatas.length; i++) {
              _this.dateData[timeType] = _this.chartDatas[i].XArray;
              _this.nowTimeDatas[timeType] = _this.chartDatas[i].YArray;
              _this.name = _this.chartDatas[i].DisplayName;
              _this.Unit = _this.chartDatas[i].Unit;
              _this.title = _this.chartDatas[i].DisplayName;
              _this.bind_HighCharts('#' + i, _this.dateData[timeType], _this.name, _this.nowTimeDatas[timeType], _this.Unit, _this.title, timeType);
              //_this.bind_HighCharts(i,_this.dateData[timeType],_this.name,_this.nowTimeDatas[timeType],_this.Unit,_this.title,timeType);
            }
          })
        }
      });
    },
    getRegisterAddress: function() {
      var _this = this;
      if (!_this.propsData.EquipmentId) {
        _this.initProjectId = $("#selectItem").selectpicker('val') == 0 ? '' : $("#selectItem").selectpicker('val');
        _this.equimentId = $("#selectDevice").selectpicker('val') == 0 ? '' : $("#selectDevice").selectpicker('val');
      } else {
        _this.initProjectId = _this.propsData.ProjectId;
        _this.equimentId = _this.propsData.EquipmentId;
      }

      if (this.equimentId == '') {
        return;
      }
      var params = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "PageIndex": 1,
        "PageSize": 0, //PageSize=0时传全部数据
        "Parameters": {
          "TerminalEquipmentId": _this.equimentId //_this.equimentId
        }
      };
      eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/QueryStatProtocol', "GET", params, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.DisplayNameArr = [];
          var resultArr = result.Data.Result;
          if (resultArr.length == 0) {
            //数据为空
            _this.noData = false;
            _this.emptyData = true;
            return;
          }
          for (var j = 0; j < resultArr.length; j++) {
            if (j <= _this.limit) {
              resultArr[j].isCheck = true;
              continue;
            }
            resultArr[j].isCheck = false
          }
          var len = resultArr.length;
          for (var i = 0; i < len; i++) {
            _this.DisplayNameArr.push(resultArr[i]);
          }
          if (_this.DisplayNameArr.length != 0) {
            $(function() {
              _this.initfilterRegisterAddresses();
            });
          }
        }
      });
    },
    formatDate: function(now) {
      var year = now.getFullYear();
      var month = now.getMonth() + 1;
      var date = now.getDate();
      var hour = now.getHours();
      var minute = now.getMinutes();
      var second = now.getSeconds();
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },
    savefilterRegisterAddresses: function() {
      var _this = this;
      var checkedAddress = $("input[type=checkbox]:checked");
      if (checkedAddress.length > (_this.limit + 1)) {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: "最多能选择5个数据节点",
          ok: function() {
            _this.bindCheck();
          },
          cancel: function() {
            _this.bindCheck();
          },
          modal: true
        });
        return;
      }
      _this.RegisterAddress = [];
      _this.initfilterRegisterAddresses();
      $("#filterRegisterAddresses").modal('hide');
    },
    initfilterRegisterAddresses: function() {
      var _this = this;
      _this.emptyData = false;
      _this.RegisterAddress = [];
      var checkedAddress = $("input:checked");
      var len = checkedAddress.length;
      for (var i = 0; i < len; i++) {
        _this.RegisterAddress.push(checkedAddress.eq(i).val());
      }
      _this.RegisterAddressParams = _this.RegisterAddress.join(',')

      if (_this.RegisterAddressParams == '') {
        //暂无数据节点或请重新筛选数据节点
        _this.emptyData = true;
        return;
      }
      _this.getData(_this.currentSelectedTime);
    },
    bindCheck: function() {
      var _this = this;
      for (var j = 0; j < _this.DisplayNameArr.length; j++) {
        _this.DisplayNameArr[j].isCheck = false;
      }
      for (var i = 0; i < _this.RegisterAddress.length; i++) {
        for (var j = 0; j < _this.DisplayNameArr.length; j++) {
          if (_this.RegisterAddress[i] == _this.DisplayNameArr[j].RegisterAddress) {
            _this.DisplayNameArr[j].isCheck = true;
            break;
          }
        }
      }
    },
    getNowDate: function() {
      var _this = this;
      var nowTime = new Date();
      var timestamp2 = Date.parse(new Date(nowTime));
      timestamp2 = new Date(timestamp2);
      return timestamp2;
    },
    getProjectList: function() {
      var _this = this;
      var params = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "PageIndex": this.page_index,
        "PageSize": this.page_size,
        "Parameters": {
          "Keywords": ""
        }
      };
      eosCommon.eosAjax(eosCommon.COMMON_API + 'api/common/project', "GET", params, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          if (result.Data != "") {
            for (var i = 0; i < result.Data.Result.length; i++) {
              $("#selectItem").append("<option value=" + result.Data.Result[i]['ProjectId'] + ">" + result.Data.Result[i]['ProjectName'] + "</option>");
            }
            $("#selectItem").selectpicker('refresh');
          }
        }
      });
    },
    getDeviceList: function(obj, ProjectId, fn) {
      var _this = this;
      if (ProjectId == 0) {
        $(obj).empty().append("<option value='0'>选择设备</option>");
        $(obj).selectpicker('refresh');
      } else {
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
              _this.equimentId = $("#selectDevice").selectpicker('val');
              _this.getRegisterAddress();
              fn && fn();
            } else {
              $(obj).empty();
              $(obj).append("<option value=''>暂无设备</option>");
              $(obj).selectpicker('refresh');
            }
          }
        });
      }
    },
    setChangeEvent: function() {
      var _this = this;
      $('#selectItem').change(function() {
        _this.initProjectId = $('#selectItem').selectpicker('val');
        _this.getDeviceList("#selectDevice", _this.initProjectId);
      });
      $("#selectDevice").change(function() {
        _this.RegisterAddressParams = '';
        _this.equimentId = $("#selectDevice").selectpicker('val');
        _this.getRegisterAddress();
      });
    },
    formatCurrentTime: function() {
      var _this = this;
      var timeStamps = new Date(_this.nowTime);
      if (_this.currentSelectedTime == 'hours') {
        _this.currentTime = timeStamps.getFullYear() + '年' + (timeStamps.getMonth() + 1) + "月" + timeStamps.getDate() + '日 ' + timeStamps.getHours() + '时';
      }
      if (_this.currentSelectedTime == 'days') {
        _this.currentTime = timeStamps.getFullYear() + '年' + (timeStamps.getMonth() + 1) + "月" + timeStamps.getDate() + '日';
      }
      if (_this.currentSelectedTime == 'months') {
        _this.currentTime = timeStamps.getFullYear() + '年' + (timeStamps.getMonth() + 1) + "月";
      }
      if (_this.currentSelectedTime == 'years') {
        _this.currentTime = timeStamps.getFullYear() + '年';
      }
    },
    initData() {
      var _this = this;
      if (!_this.propsData.EquipmentId) {
        _this.isSearch = true;
      } else {
        _this.isSearch = false;
      }
      $(function() {
        _this.getRegisterAddress();
        _this.getProjectList();
        _this.setChangeEvent();
        $('.filterBtn').click(function() {
          _this.bindCheck();
        });
        $('[data-toggle="tooltip"]').tooltip()

      });
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
      $('#StartDate').val(eosCommon.getTime("yyyy-MM-dd hh:mm:ss", 0));
      _this.nowTime = $('#StartDate').val();
      _this.formatCurrentTime();
      $("#StartDate").change(function() {
        var selectedTime = Date.parse(new Date($('#StartDate').val()));
        var nowTime = Date.parse(new Date());
        if (selectedTime - nowTime > 0) {
          vdialog({
            type: 'error',
            title: '提示',
            content: "选择的时间不能大于当前时间",
            ok: function() {},
            cancel: true,
            modal: true
          });
          return;
        }
        _this.nowTime = $('#StartDate').val();
        _this.formatCurrentTime();
      });
    }

  },
  watch: {
    propsData: {
      handler(val, oldVal) {
        this.initData();
      },
      deep: true
    }
  },
  mounted: function() {
    //console.log(Highcharts.chart)
    this.initData();

  }
}

</script>
<style scoped="scoped">
.row {
  margin-left: 0px!important;
  margin-right: 0px!important;
}

.nowActive {
  background: #1abc9c!important;
  color: #fff!important;
}

.myDefault-btn {
  background-color: transparent!important;
  border: 1px solid transparent!important;
  color: #505461!important;
}

button.myDefault-btn:hover {
  color: #1abc9c!important;
}

.lisBorder {
  border-right: 1px solid #ebeff2;
}

.nav.nav-tabs>li>a:hover {
  color: #1abc9c!important;
}

.nav.nav-tabs>li.filterBtn>a:hover {
  color: #505461!important;
}

.nav.nav-tabs>li.nowActive>a:hover {
  color: #fff!important;
}

.nav.nav-tabs>li.nowActive>a {
  color: #fff!important;
  font-size: 18px;
  font-weight: 900;
}

.nav.nav-tabs>li.active>a {
  background-color: #1abc9c;
}

.nav.nav-tabs>li>a {
  font-size: 16px;
  font-weight: 800;
  height: 40px;
  line-height: 40px;
}

.navbar-default {
  background-color: transparent!important;
  border-color: transparent!important;
}

.navbar-collapse.collapse {
  height: 40px!important;
}

nav .nav-tabs {
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  border-left: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}

.myCarBox {
  box-shadow: 5px 5px 5px 2px #E3E3E3;
}

</style>

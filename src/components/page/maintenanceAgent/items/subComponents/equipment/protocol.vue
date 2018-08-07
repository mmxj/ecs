<template>
  <div id="Protocol" class="tab-pane active" style="height: 100%; position: relative;">
    <!--通讯协议列表开始-->
    <div id="ProtoList" style="margin-bottom: 0;" class="card-box table-responsive">
      <div class="row pl-10"> <span class="OrgTopAligin OperatorInsert">
                                            <button id="addProtocolBtn" type="button" class="btn btn-default waves-effect waves-light" data-toggle="" data-target="#modal-cleos-Dev">
                                            <i class="fa fa-plus m-r-5"></i>新增
                                            </button>
                                        </span> <span class="OrgTopAligin ">
                                            <button id="protoImport" type="button" class="btn btn-default">
                                               			 批量导入
                                            </button>
                                        </span>
                                        <span class="OperatorSearch">
                                       		 <span class="OrgTopAligin">
                                            	<input id="ProtocolQueryTxt" type="search" class="form-control w-128" placeholder="协议地址/中文名">
                                        	</span>
                                        	<span class="OrgTopAligin">
	                                            <button id="ProtocolQueryBtn" type="button" class="btn btn-default waves-effect waves-light">
	                                                <i class="fa fa-search m-r-5"></i>查找
	                                            </button>
	                                        </span> 
                                        </span> 
	                                        <span class="OrgTopAligin OperatorDel">
                                            <button @click="DelAllProtocol()" type="button" class="btn btn-default">
                                                		删除所选
                                            </button>
                                        	</span> 
                                        <span class="OrgTopAligin">
																					 <button @click="DelAllProtocols()" type="button" class="btn btn-default">
                                                		删除全部
                                            </button>
																				</span> 
      </div>
      <hr class="divider mt-10">
      <table id="ProtocolTable" class="table table-striped table-bordered" width="100%">
        <thead>
          <tr>
            <th style="width: 20px;"> <label style="margin-left: 5px"><input id="allIsCheckedlongzhoufeng" name="allCheckDataTitle" type="checkbox">全选/反选</label> </th>
            <th style="width: 50px;">序号</th>
            <th>查看更多</th>
            <th>协议地址</th>
            <th>中文名</th>
            <th>数据类型</th>
            <th>数据处理方式</th>
            <th>数据偏移量</th>
            <th>数据比例</th>
            <th class="w-80">操作</th>
            <th style="display: none">操作</th>
          </tr>
        </thead>
      </table>
    </div>
    <!--通信协议列表结束-->
    <!--增加通信协议开始-->
    <div id="ProtocolAdd" class="card-box table-responsive" style="display: none">
      <div class="row">
        <div class="col-md-6"> <span class="size20 font-bold ProtocolTitle"></span> </div>
        <div class="col-md-6"> <button type="button" class="ProtocolCancelBtn btn btn-white waves-effect waves-light pull-right">
                                                <i class="fa fa-mail-reply-all m-r-5"></i>返回
                                            </button> </div>
      </div>
      <hr class="divider mb-10 mt-10">
      <div class="row">
        <div class="col-md-12">
          <div id="ProtocolVerifyCheck">
            <div class="form-horizontal content-box">
              <div class="form-group mt-20"> <label class="content-title-left text-right"><em class="ak_required_em">*</em>协议数据地址</label>
                <div class="col-xs-6"> <input id="ProtocolAddress" v-model='ProtocolAddress' type="text" class="form-control required" maxlength="25" data-valid="isNonEmpty||maxLength:25||isComputerphobe" data-error="协议数据地址不能为空||协议数据地址最长为25位字符||只能为字符，不能为中文" /> <span class="ie8 icon-close close hide"></span> <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label> <label class="focus"><span>必填，只能为英文字符，不能为中文</span></label> <label class="focus valid"></label> </div>
              </div>
              <div class="form-group"> <label class="content-title-left"><em class="ak_required_em">*</em>数据类别</label>
                <div class="col-lg-2 col-xs-3">
                  <select id="ProtocolDataType" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
                    <option value="SInt16">SInt16</option>
                    <option value="SInt32">SInt32</option>
                    <option value="UInt16">UInt16</option>
                    <option value="UInt32">UInt32</option>
                    <option value="UInt64">UInt64</option>
                    <option value="Float16">Float16</option>
                    <option value="Float32">Float32</option>
                    <option value="Double64">Double64</option>
                    <option value="BitMask16">BitMask16</option>
                    <option value="BitMask32">BitMask32</option>
                  </select>
                </div>
              </div>
              <div class="form-group"> <label class="content-title-left"><em class="ak_required_em">*</em>选择群组</label>
                <div class="col-lg-2 col-xs-3">
                  <div id="group" class="ak-select">
                    <div class="btn-group" style="width: 100%;"> <button type="button" class="btn dropdown-toggle bs-placeholder btn-white" data-toggle="dropdown" role="button" data-id="selFunctionType" style="width: 100%;">
			                                                                <span class="filter-option pull-left group-text">请选择或输入协议分组名称</span>
			                                                                &nbsp;<span class="bs-caret"><span class="caret"></span></span>
			                                                            </button>
                      <div class="dropdown-menu open" role="combobox" style="width: 100%;max-height: 142px; overflow: hidden;">
                        <ul class="inner" role="listbox" aria-expanded="false" style="width: 100%;max-height: 142px; overflow-y: auto;">
                          <li class=""> <input class="entry-input" type="text" placeholder="手动输入新建分组" /> </li>
                          <li v-for="item in groupList" class="">
                            <a class="" role="option"><span class="text">{{item.GroupName}}</span></a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="detail_info_wrap">
              <div class="default_info_content protocList contentWrap" id='contentWrap_0'>
                <div class="form-horizontal content-box row" v-show='isBitMask' style="margin-left: 0;margin-right: 0;">
                  <div class="form-group"> <label class="content-title-left"><em class="ak_required_em">*</em>子协议数据地址</label>
                    <div class="col-lg-3 col-xs-3"> <input readonly="true" id="subProtocolAddress_0" type="text" value="" class="form-control required subProtocolAddress" data-valid="isNonEmpty" data-error="" maxlength="30" /> </div>
                    <div class="col-lg-3 col-xs-3">
                      <div class="bitDataInsert">
                        <div class="input-group">
                          <div class="input-group-addon">从</div> <input type="text" class="form-control bit1" id="bit1_0" value="" placeholder="">
                          <div class="input-group-addon">位到</div> <input type="text" class="form-control bit2" id="bit2_0" value="" placeholder=""> </div>
                      </div>
                    </div>
                    <div class="col-lg-1 col-xs-1" v-show='!isOnlyOne'> <span class='OperatorBtnDel OperatorDel delCurSubProtocolBtn' data='0' title='删除当前子协议'><i class='fa fa-trash-o'></i></span> </div>
                  </div>
                </div>
                <div class="form-horizontal content-box">
                  <div class="form-group"> <label class="content-title-left"><em class="ak_required_em">*</em>中文名</label>
                    <div class="col-lg-2 col-xs-3"> <input id="ProtocolDisplayName_0" type="text" class="form-control required ProtocolDisplayName" data-valid="isNonEmpty" data-error="中文名不能为空" maxlength="30" /> <span class="ie8 icon-close close hide"></span> <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label> <label class="focus"><span></span></label> <label class="focus valid"></label> </div>
                    <div class="col-lg-2 col-xs-3"> <label class="content-title-left pull-right">英文名</label> </div>
                    <div class="col-lg-2 col-xs-3"> <input id="EnglishName_0" type="text" class="form-control EnglishName" maxlength="50" /> </div>
                  </div>
                  <div class="form-group mt-20"> <label class="content-title-left text-right"><em class="ak_required_em">*</em>数据处理方式</label>
                    <div class="col-lg-6 col-xs-6">
                      <select id="ProtocolDataModel_0" class="form-control selectpicker ProtocolDataModel" data-style="btn-white" tabindex="-98">
                        <option value="HL">HL</option>
                        <option value="LH">LH</option>
                      </select>
                    </div>
                  </div>
                  <div class="form-group"> <label class="content-title-left"><em class="ak_required_em">*</em>数据偏移量</label>
                    <div class="col-lg-2 col-xs-3"> <input id="ProtocolOffset_0" type="text" class="form-control required ProtocolOffset" maxlength="20" data-valid="isNonEmpty||between:1-20||isNumFloatSix" data-error="数据偏移量不能为空||数据偏移量最长为1-20位字符||数据偏移量格式为（数字或小数点六位）" /> <span class="ie8 icon-close close hide"></span> <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label> <label class="focus"><span>必填，只能为保留两位小数的数字</span></label> <label class="focus valid"></label> </div>
                    <div class="col-lg-2 col-xs-3"> <label class="content-title-left pull-right">
                                                                <em class="ak_required_em">*</em>数据比例
                                                            </label> </div>
                    <div class="col-lg-2 col-xs-3"> <input id="ProtocolRatio_0" type="text" class="form-control required ProtocolRatio" maxlength="20" data-valid="isNonEmpty||between:1-20||isNumFloatSix" data-error="数据比例量不能为空||数据比例最长为1-20位字符||数据比例格式为（数字或小数点六位）" /> <span class="ie8 icon-close close hide"></span> <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label> <label class="focus"><span>必填，只能为保留两位小数的数字</span></label> <label class="focus valid"></label> </div>
                  </div>
                </div>
                <div class="content-box form-horizontal form-group row" style="margin-left: 0;margin-right: 0;"> <label class="content-title-left text-right">是否计算时长</label>
                  <div class="col-lg-3 col-xs-4">
                    <div id="isComputeTimeDivlong_0" class="checkbox checkbox-primary" style="margin-left: 20px;"> 
                    	<input id="isComputeTimeDiv_0" class="isComputeTimeDiv" name="isComputeTime_0" type="checkbox" value="0" data-parsley-multiple="groups" data-parsley-mincheck="2"> 
                    		<label for="isComputeTimeDiv_0">                   			
                    		</label> 
                    </div>
                  </div> <label class="content-title-left text-right">是否需要统计</label>
                  <div class="col-lg-3 col-xs-4">
                    <div id="isNeedStat_0" class="checkbox checkbox-primary" style="margin-left: 20px;"> <input id="isStat_0" class="isStat" name="isNeedStat_0" type="checkbox" value="0" data-parsley-multiple="groups" data-parsley-mincheck="2"> <label for="isStat_0"></label> </div>
                  </div>
                </div>
                <div class="form-horizontal content-box">
                  <div class="portlet more-data">
                    <div class="portlet-heading portlet-default">
                      <h3 class="portlet-title text-dark" style="cursor: pointer;">以下内容为非必填项，点击展开</h3> </div>
                    <div class="panel-collapse collapse">
                      <div class="form-group"> 
                      	<label class="content-title-left">转化类型</label>
                        <div class="col-lg-2 col-xs-3">
                          <select id="ProtocolConvertTo_0" class="form-control selectpicker ProtocolConvertTo" data-style="btn-white" tabindex="-98">
                            <option value="0">None</option>
                            <option value="1">String</option>
                          </select>
                        </div>
                        <div class="col-lg-2 col-xs-3"> 
	                        	<label class="content-title-left pull-right">
	                                                                        转化方式
	                        	</label> 
                        </div>
                        <div class="col-lg-2 col-xs-3">
                          <select id="ProtocolConvertBy_0" class="form-control selectpicker ProtocolConvertBy" data-style="btn-white" tabindex="-98">
                            <option value="0">None</option>
                            <option value="1">ASCII</option>
                          </select>
                        </div>
                      </div>
                      <div class="form-group"> 
                      	<label class="content-title-left">显示单位</label>
                        <div class="col-lg-2 col-xs-3">
                        	<input id="ProtocolUnit_0" type="text" class="form-control ProtocolUnit" maxlength="500" />
                        </div>
                        
                        
                        <div v-if="canSettingShow==1" class="col-lg-2 col-xs-3"> 
	                        	<label class="content-title-left pull-right">
	                                                                        是否远程设定
	                        	</label> 
                        </div>
                        <div v-if="canSettingShow==1" id="IsIssue_0" class="col-lg-2 col-xs-3">
                        	<div  class="radio radio-custom radio-inline">
														<input  type="radio" name="IsIssuei_0"  id="IsIssuei_0" value="1" >
														<label for="IsIssuei_0">
                            	是
                            </label>
													</div>
													<div class="radio radio-custom radio-inline">
														<input   type="radio" name="IsIssuei_0" id="no_IsIssuei_0" value="0" checked>
														<label for="no_IsIssuei_0">
                          	  否
                        		</label>
													</div>
                        </div>
                        
                        
                      </div>
                      <div class="form-group"> <label class="content-title-left">故障代码</label>
                        <div class="col-lg-2 col-xs-3">
                          <div id="ProtocolFaultCode_0" class="ak-select">
                            <div class="btn-group" style="width: 100%;"> <button type="button" class="codesSelectBtn btn dropdown-toggle bs-placeholder btn-white" data-toggle="dropdown" role="button" data-id="selFunctionType" style="width: 100%;">
								                                                        <span class="filter-option pull-left group-text"></span>
								                                                        &nbsp;<span class="bs-caret"><span class="caret"></span></span>
								                                                    </button>
                              <div class="dropdown-menu open" role="combobox" style="width: 100%;max-height: 142px; overflow: hidden;">
                                <ul class="inner" role="listbox" aria-expanded="false" style="width: 100%;max-height: 142px; overflow-y: auto;">
                                  <li class=""> <input id="" v-model='search' class="entry-input" type="text" placeholder="搜索或下拉选择故障代码" /> </li>
                                  <li v-for="item in searchData" class="codes">
                                    <a class="codes_0" role="option"><span class="text" :id='item.EquipmentFaultId'>{{item.FaultCode}}</span></a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="col-lg-2 col-xs-3"> <label class="content-title-left pull-right">
                                                                       								故障持久性
                                                                    		</label> </div>
                        <div class="col-lg-2 col-xs-3">
                          <div class=""> <input id="FaultDurability_0" type="text" readonly="true" class="form-control FaultDurability" maxlength="30" /> </div>
                        </div>
                      </div>
                      <div class="form-group mt-20"> <label class="content-title-left text-right">故障描述</label>
                        <div class="col-xs-6"> <textarea id="ProtocolFaultDescription_0" class="form-control ProtocolFaultDescription" placeholder="不需要手动填写，由上面的故障代码匹配之后自动填写"></textarea> </div>
                      </div>
                      <div class="form-group mt-20"> <label class="content-title-left text-right">备注信息</label>
                        <div class="col-xs-6"> <textarea id="ProtocolRemark_0" type="text" maxlength="100" class="form-control ProtocolRemark" /></textarea> <span class="ie8 icon-close close hide"></span> <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label> <label class="focus"><span>备注信息最长为100个字符</span></label> <label class="focus valid"></label> </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div v-show='isBitMask' id="addBitDataBtn" @click="addRow()" class=" card-box table-box border-add border-1 content-box form-horizontal" style="min-height: 100px">
                <div class="table-detail text-center" style="cursor: pointer;"> <span class="text-cog"><i class="fa fa-plus m-rigth" style=""></i><label>新增</label></span> </div>
              </div>
            </div>
            <div class="modal-footer" style="text-align: left;"> <label class="content-title-left text-right"></label>
              <div class="col-lg-5 col-xs-8" style="padding-left: 1;"> <button class="ProtocolCancelBtn btn btn-white waves-effect" data-dismiss="modal">取消</button> <button id="ProtocolSaveBtn" class="btn btn-default loading_btn" data-loading-text="保存中..." data-status="save">保存</button> </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="ProtoImportBox" style="position: absolute; top: 0; bottom: 0;left: 0; right: 0; margin: 0; overflow-y: auto;display: none" class="card-box table-responsive">
      <div class="row">
        <div class="col-md-6"> <span class="size20 font-bold">通讯协议导入</span> </div>
        <div class="col-md-6"> <button type="button" class="ProtocolBtnReturn btn btn-white pull-right">
                                                <i class="fa fa-mail-reply-all m-r-5"></i>返回
                                            </button> </div>
      </div>
      <hr class="divider mb-10 mt-10">
      <div class="row">
        <div class="col-md-12">
          <div class="fileBoxs">
            <div class="alert alert-info alert-dismissable"> <strong>导入说明</strong> 1、先下载通讯协议模版，在对应列填上相应数据。注意，导入文件中的数据行不能超过1万行！ <span class="label label-info p-8"><a class="text-white" href="../../../../static/doc/通讯协议导入模板.xlsx" target="_blank">下载通讯协议模版</a></span> </div>
            <div id="fileBox2"></div>
          </div>
          <div class="mt-20">
            <div class="form-group">
              <div class="bg-white">
                <table id="protoctViewImport" class="table table-striped table-bordered" width="100%">
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>协议地址</th>
                      <th>中文名</th>
                      <th>英文名</th>
                      <th>数据点类型</th>
                      <th>Offset</th>
                      <th>Ratio</th>
                      <th>数据处理方式</th>
                      <th>显示单位</th>
                      <th>故障代码</th>
                      <th>输出字符</th>
                      <th>分组名称</th>
                      <th>是否计算时长</th>
                      <th>是否需要统计</th>
                      <th>是否远程设定</th>
                      <th>备注</th>
                      <th>验证结果</th>
                    </tr>
                  </thead>
                </table>
              </div>
            </div>
          </div>
          <div class="content-box-footer-import">
            <div class="form-group"> <button type="button" class="ProtocolBtnReturn btn btn-white pull-left">取消</button> <button id="saveProtoTemplateData" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中..." data-dismiss="modal">保存</button> </div>
          </div>
        </div>
      </div>
    </div>
    <!--增加通信协议结束-->
  </div>
</template>
<script>
  var btn = '';
  var viewImport = '';
  import {
    mapGetters
  } from 'vuex'
  export default {
    data: function() {
      return {
        isBitMask: false,
        bitIndex: 1,
        ProtocolAddress: '',
        subAdreesIndex: 1,
        protocLists: '',
        isOnlyOne: true,
        selectorsData: [],
        getFaultDataLists: [],
        search: '',
        groupList: [],
        EquipmentId: '',
        title: '',
        IsIssue:0,
        ProjectId:'',
        initProjectId:'42c4c4cd-2838-415f-b0b2-4a29c245e626',
        canSettingShow:1,
        selectArr:[]
      }
    },
    props: ['propsDatas'],
    computed: {
    	...mapGetters(["get_isCanCtrl"]),
      searchData: function() {
        var search = this.search;
        if(search) {
          return this.getFaultDataLists.filter(function(product) {
            return Object.keys(product).some(function(key) {
              return String(product[key]).toLowerCase().indexOf(search.toLowerCase()) > -1
            })
          })
        }
        return this.getFaultDataLists;
      }
    },
    watch: {
      ProtocolAddress: function(cur, old) {
        var protocList = $('.protocList');
        for(var i = 0; i < protocList.length; i++) {
          $('#subProtocolAddress_' + i).val(cur + '-' + (i + 1));
        }
      }
    },
    mounted: function() {
      var _this = this;
      
//    _this.ProjectId=_this.propsDatas.ProjectId;
//    if(_this.get_isCanCtrl==1){
//    		_this.canSettingShow=1;
//    }else{
//    	_this.canSettingShow=0;
//    }
      _this.title = '通讯协议';
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
      _this.getProtocol();
      $(".detail_info_wrap").delegate(".delCurSubProtocolBtn", 'click', function() {
        var proLists = $('.protocList');
        $('#contentWrap_' + $(this).attr('data')).remove();
        _this.subAdreesIndex--;
        _this.bitIndex--;
        _this.protocLists = $('.protocList');
        for(var i = 0; i < _this.protocLists.length; i++) {
          $('.protocList.contentWrap').eq(i).attr('id', 'contentWrap_' + i);
          $('.protocList').eq(i).find('.subProtocolAddress').attr('id', 'subProtocolAddress_' + i);
          $('.protocList').eq(i).find('select.ProtocolDataModel').attr('id', 'ProtocolDataModel_' + i);
          $('.protocList').eq(i).find('.ProtocolOffset').attr('id', 'ProtocolOffset_' + i);
          $('.protocList').eq(i).find('.ProtocolRatio').attr('id', 'ProtocolRatio_' + i);
          $('.protocList').eq(i).find('select.ProtocolConvertTo').attr('id', 'ProtocolConvertTo_' + i);
          $('.protocList').eq(i).find('select.ProtocolConvertBy').attr('id', 'ProtocolConvertBy_' + i);
          $('.protocList').eq(i).find('.ProtocolDisplayName').attr('id', 'ProtocolDisplayName_' + i);
          $('.protocList').eq(i).find('.EnglishName').attr('id', 'EnglishName_' + i);
          $('.protocList').eq(i).find('.ProtocolUnit').attr('id', 'ProtocolUnit_' + i);
          $('.protocList').eq(i).find('select.ProtocolFaultCode').attr('id', 'ProtocolFaultCode_' + i);
          $('.protocList').eq(i).find('select.ProtocolFaultLevel').attr('id', 'ProtocolFaultLevel_' + i);
          $('.protocList').eq(i).find('.ProtocolFaultDescription').attr('id', 'ProtocolFaultDescription_' + i);
          $('.protocList').eq(i).find('.isComputeTimeDiv').attr('id', 'isComputeTimeDiv_' + i);
          $('.protocList').eq(i).find('.isStat').attr('id', 'isStat_' + i);
          $('.protocList').eq(i).find('.bit1').attr('id', 'bit1_' + i);
          $('.protocList').eq(i).find('.bit2').attr('id', 'bit2_' + i);
        }
        _this.protocLists = $('.protocList');
        _this.bindCheckEvent();
        if(_this.subAdreesIndex <= 1) {
          _this.isOnlyOne = true;
        }
      });
      $("#ProtocolDataType").change(function() {
        _this.isOnlyOne = true;
        var selectValue = $(this).selectpicker('val');
        var content = $('.detail_info_content');
        if(selectValue == 'BitMask16' || selectValue == 'BitMask32') {
          for(var i = 0; i < content.length; i++) {
            content[i].remove();
          }
          _this.isBitMask = true;
          $('#ProtocolOffset_0').val('0');
          $('#ProtocolRatio_0').val('1');
          $("#isComputeTimeDiv_0").attr("value", "0")
          $("#isComputeTimeDiv_0").prop("checked", false)
          $("#isStat_0").attr("value", "0")
          $("#isStat_0").prop("checked", false)
          $('#subProtocolAddress_0').val($('#ProtocolAddress').val() + '-' + _this.subAdreesIndex);
        } else {
          for(var i = 0; i < content.length; i++) {
            content[i].remove();
          }
          _this.isBitMask = false;
        }
      });
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
      bindProtocolImport: function(viewImportData) {
        viewImport = $('#protoctViewImport').DataTable({
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
          "columns": [{
            data: "RowId"
          }, {
            data: "ModbusAddress"
          }, {
            data: "ChineseName"
          }, {
            data: "EnglishName"
          }, {
            data: "DataType"
          }, {
            data: "Offset"
          }, {
            data: "Ratio"
          }, {
            data: "DataModel"
          }, {
            data: "Unit"
          }, {
            data: "FaultCode"
          }, {
            data: "IsStringOutput"
          }, {
            data: "GroupName"
          }, {
            data: "IsTimeKeeping"
          },  {
            data: "IsStat"
          }, {
            data: "IsIssue"
          },{
            data: "Remark"
          }, {
            data: "Message"
          }],
          "columnDefs": [{
            "targets": [15],
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
        $('#protoctViewImport tbody').on('click', 'tr', function() {
          if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
          } else {
            viewImport.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
          }
        });
      },
      EquipmentReturn: function() {
        this.$router.go(-1);
      },
      bindCheckEvent: function() {
        var _this = this;
        _this.protocLists = $('.protocList');
        for(var i = 0; i < _this.protocLists.length; i++) {
          $("input[name=isComputeTime_" + i + "],input[name=isNeedStat_" + i + "]").on('click', {
            index: i
          }, function(event) {
            if($(this).prop("checked")) {
              $(this).prop("checked", true);
              $(this).attr("value", "1")
            } else {
              $(this).prop("checked", false);
              $(this).attr("value", "0")
            }
          })
        }
        $('.codesSelectBtn').on('click', function() {
          _this.search = '';
        });
        for(var j = 1; j < _this.protocLists.length; j++) {
          $('#ProtocolOffset_' + j).val('0');
          $('#ProtocolRatio_' + j).val('1');
          (function(j) {
            $("#ProtocolFaultCode_" + j).on("click", ".dropdown-menu li a", function() {
              var obj = $(this).parents('#ProtocolFaultCode_' + j);
              obj.find(".group-text").html($(this).find(".text").html());
              obj.find(".group-text").attr('id', $(this).find(".text").attr('id'));
              var curVal = obj.find(".group-text").attr('id');
              if(!curVal) {
                $('#FaultDurability_' + j).val('');
                $('#ProtocolFaultDescription_' + j).val('');
                $('#ProtocolRemark_' + j).val('');
              }
              for(var i = 0; i < _this.getFaultDataLists.length; i++) {
                if(curVal == _this.getFaultDataLists[i].EquipmentFaultId) {
                  _this.getFaultDataLists[i].FaultDurabilityName == '锁定' ? $('#FaultDurability_' + j).attr('data-val', 1) : $('#FaultDurability_' + j).attr('data-val', 2);
                  $('#FaultDurability_' + j).val(_this.getFaultDataLists[i].FaultDurabilityName);
                  $('#ProtocolFaultDescription_' + j).val(_this.getFaultDataLists[i].FaultDescription);
                  $('#ProtocolRemark_' + j).val(_this.getFaultDataLists[i].Remark);
                }
              }
            });
            $("#ProtocolFaultCode_" + j).on("change", ".entry-input", function() {
              for(var i = 0; i < _this.getFaultDataLists.length; i++) {
                if($.trim($(this).val()) !== $.trim(_this.getFaultDataLists[i].FaultCode)) {
                  continue;
                } else {
                  var obj = $(this).parents('#ProtocolFaultCode_' + j);
                  obj.find(".group-text").html($(this).val());
                  obj.find(".group-text").attr('id', _this.getFaultDataLists[i].EquipmentFaultId);
                  $(this).val('');
                  var curVal = obj.find(".group-text").attr('id');
                  if(!curVal) {
                    $('#FaultDurability_' + j).val('');
                    $('#ProtocolFaultDescription_' + j).val('');
                    $('#ProtocolRemark_' + j).val('');
                  }
                  for(var i = 0; i < _this.getFaultDataLists.length; i++) {
                    if(curVal == _this.getFaultDataLists[i].EquipmentFaultId) {
                      _this.getFaultDataLists[i].FaultDurabilityName == '锁定' ? $('#FaultDurability_' + j).attr('data-val', 1) : $('#FaultDurability_' + j).attr('data-val', 2);
                      $('#FaultDurability_' + j).val(_this.getFaultDataLists[i].FaultDurabilityName);
                      $('#ProtocolFaultDescription_' + j).val(_this.getFaultDataLists[i].FaultDescription);
                      $('#ProtocolRemark_' + j).val(_this.getFaultDataLists[i].Remark);
                    }
                  }
                  $(this).val('');
                  return;
                }
              }
              $(this).val('');
              return false;
            });
          })(j);
        }
      },
      addRow: function() {
        var _this = this;
        var setStr=`<div  class="col-lg-2 col-xs-3"> 
            	<label class="content-title-left pull-right">
                                                            是否远程设定
            	</label> 
        </div>
        <div  id="IsIssue_${this.bitIndex}" class="col-lg-2 col-xs-3">
     				<div  class="radio radio-custom radio-inline">
											<input  type="radio" name="IsIssue_${this.bitIndex}"  id="IsIssuei_${this.bitIndex}" value="1" >
											<label for="IsIssuei_${this.bitIndex}">
                	是
                </label>
										</div>
										<div class="radio radio-custom radio-inline">
											<input   type="radio" name="IsIssue_${this.bitIndex}" id="no_IsIssuei_${this.bitIndex}" value="0" checked>
											<label for="no_IsIssuei_${this.bitIndex}">
              	  否
            		</label>
										</div>
        </div>`;
        var initStr=``;
        if(_this.canSettingShow==1){
        	initStr=setStr;
        }else{
        	initStr=``;
        }
        _this.detailInfoContentHtml = `
    			
    			        		<div class="detail_info_content protocList contentWrap" id='contentWrap_${this.bitIndex}'>
                       				            		<div class="form-horizontal content-box row" style="margin-left: 0;margin-right: 0;" v-show='isBitMask'>
	                   				            			<div class="form-group">
			                                                        <label class="content-title-left"><em class="ak_required_em">*</em>子协议数据地址</label>
			                                                        <div class="col-lg-3 col-xs-3">
			                                                            <input readonly="true" v-model='' id="subProtocolAddress_${this.bitIndex}"  type="text" value="" class="form-control required subProtocolAddress" data-valid="isNonEmpty" data-error="中文名不能为空" maxlength="30"/>
			                                                         
			                                                      	</div>
			                                                         <div class="col-lg-3 col-xs-3" >
				                                                    	<div class="bitDataInsert">					                                                  
																			    <div class="input-group">
																				      <div class="input-group-addon">从</div>
																				      <input type="text" class="form-control bit1" id="bit1_${this.bitIndex}" value="" placeholder="">
																				      <div class="input-group-addon">位到</div>											    
																				      <input type="text" class="form-control bit2" id="bit2_${this.bitIndex}" value="" placeholder="">																			      
																			    </div>													   																															  
				                                                  		</div>			                                                       																																						
			                                                       </div>
			                                                       <div class="col-lg-1 col-xs-1" >
			                                                        	<span class='OperatorBtnDel OperatorDel delCurSubProtocolBtn' data='${this.bitIndex}' title='删除当前子协议'><i class='fa fa-trash-o'></i></span>
		                                                        	</div>
	                                                    	</div>			                                               
														</div>
                                               		 <div class="form-horizontal content-box">                                                   
                                                    <div class="form-group">
                                                        <label class="content-title-left"><em class="ak_required_em">*</em>中文名</label>
                                                        <div class="col-lg-2 col-xs-3">
                                                            <input id="ProtocolDisplayName_${this.bitIndex}" type="text" class="form-control required ProtocolDisplayName" data-valid="isNonEmpty" data-error="中文名不能为空" maxlength="30"/>
                                                            <span class="ie8 icon-close close hide"></span>
                                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                                            <label class="focus"><span></span></label>
                                                            <label class="focus valid"></label>
                                                        </div>
                                                        <div class="col-lg-2 col-xs-3">
                                                            <label class="content-title-left pull-right">英文名</label>
                                                        </div>
                                                        <div class="col-lg-2 col-xs-3">
                                                            <input id="EnglishName_${this.bitIndex}" type="text" class="form-control EnglishName" maxlength="50"/>
                                                        </div>
                                                    </div>
                                                    
                                                    <div class="form-group mt-20">                                                 	 
                                                            <label class="content-title-left text-right"><em class="ak_required_em">*</em>数据处理方式</label>                                                       
	                                                        <div class="col-lg-6 col-xs-6">
	                                                            <select id="ProtocolDataModel_${this.bitIndex}" class="form-control selectpicker ProtocolDataModel" data-style="btn-white" tabindex="-98">
	                                                                <option value="HL">HL</option>
	                                                                <option value="LH">LH</option>
	                                                            </select>
	                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="content-title-left"><em class="ak_required_em">*</em>数据偏移量</label>
                                                        <div class="col-lg-2 col-xs-3">
                                                            <input id="ProtocolOffset_${this.bitIndex}" type="text" class="form-control required ProtocolOffset" maxlength="20" data-valid="isNonEmpty||between:1-20||isNumFloatSix" data-error="数据偏移量不能为空||数据偏移量最长为1-20位字符||数据偏移量格式为（数字或小数点六位）"/>
                                                            <span class="ie8 icon-close close hide"></span>
                                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                                            <label class="focus"><span>必填，只能为保留两位小数的数字</span></label>
                                                            <label class="focus valid"></label>
                                                        </div>
                                                        <div class="col-lg-2 col-xs-3">
                                                            <label class="content-title-left pull-right">
                                                                <em class="ak_required_em">*</em>数据比例
                                                            </label>
                                                        </div>
                                                        <div class="col-lg-2 col-xs-3">
                                                            <input id="ProtocolRatio_${this.bitIndex}" type="text" class="form-control required ProtocolRatio" maxlength="20" data-valid="isNonEmpty||between:1-20||isNumFloatSix" data-error="数据比例量不能为空||数据比例最长为1-20位字符||数据比例格式为（数字或小数点六位）"/>
                                                            <span class="ie8 icon-close close hide"></span>
                                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                                            <label class="focus"><span>必填，只能为保留两位小数的数字</span></label>
                                                            <label class="focus valid"></label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="content-box form-horizontal form-group row" style="margin-left: 0;margin-right: 0;">
                                                    
                                                        <label class="content-title-left text-right">是否计算时长</label>
                                                        <div class="col-lg-3 col-xs-4">
                                                            <div id="isComputeTimeDivlong_${this.bitIndex}" class="checkbox checkbox-primary" style="margin-left: 20px;">
                                                                <input id="isComputeTimeDiv_${this.bitIndex}" class="isComputeTimeDiv" name="isComputeTime_${this.bitIndex}" type="checkbox" value="0" data-parsley-multiple="groups" data-parsley-mincheck="2">
                                                                <label for="isComputeTimeDiv_${this.bitIndex}"></label>
                                                            </div>
                                                        </div>
                                                    
                                                     
                                                        <label class="content-title-left text-right">是否需要统计</label>
                                                        <div class="col-lg-3 col-xs-4">
                                                            <div id="isNeedStat_${this.bitIndex}" class="checkbox checkbox-primary" style="margin-left: 20px;">
                                                                <input id="isStat_${this.bitIndex}" class="isStat" name="isNeedStat_${this.bitIndex}" type="checkbox" value="0" data-parsley-multiple="groups" data-parsley-mincheck="2">
                                                                <label for="isStat_${this.bitIndex}"></label>
                                                            </div>
                                                        </div>
                                                   
                                                </div>
                                                <div class="form-horizontal content-box">
                                                    <div class="portlet more-data">
                                                        <div class="portlet-heading portlet-default">
                                                            <h3 class="portlet-title text-dark" style="cursor: pointer;">以下内容为非必填项，点击展开</h3>
                                                        </div>
                                                        <div class="panel-collapse collapse">
                                                            <div class="form-group">
                                                                <label class="content-title-left">转化类型</label>
                                                                <div class="col-lg-2 col-xs-3">
                                                                    <select id="ProtocolConvertTo_${this.bitIndex}" class="form-control selectpicker ProtocolConvertTo" data-style="btn-white" tabindex="-98">
                                                                        <option value="0">None</option>
                                                                        <option value="1">String</option>
                                                                    </select>
                                                                </div>
                                                                <div class="col-lg-2 col-xs-3">
                                                                    <label class="content-title-left pull-right">
                                                                        转化方式
                                                                    </label>
                                                                </div>
                                                                <div class="col-lg-2 col-xs-3">
                                                                    <select id="ProtocolConvertBy_${this.bitIndex}" class="form-control selectpicker ProtocolConvertBy" data-style="btn-white" tabindex="-98">
                                                                        <option value="0">None</option>
                                                                        <option value="1">ASCII</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="content-title-left">显示单位</label>
                                                                <div class="col-lg-2 col-xs-3">
                                                                    <input id="ProtocolUnit_${this.bitIndex}" type="text" class="form-control ProtocolUnit" maxlength="30"/>
                                                                </div>
                                                                `
                                                                +initStr+
                                                               ` 
                                                            </div>
                                                            		<div class="form-group">
																		<label class="content-title-left">故障代码</label>
																				
																				<div class="col-lg-2 col-xs-3">
																					<div id="ProtocolFaultCode_${this.bitIndex}" class="ak-select">
																						<div class="btn-group" style="width: 100%;">
																							<button type="button" class="btn dropdown-toggle bs-placeholder btn-white" data-toggle="dropdown" role="button" data-id="selFunctionType" style="width: 100%;">
										                                                        <span class="filter-option pull-left group-text"></span>
										                                                        &nbsp;<span class="bs-caret"><span class="caret"></span></span>
										                                                    </button>
																							<div class="dropdown-menu open" role="combobox" style="width: 100%;max-height: 142px; overflow: hidden;">
																								<ul class="inner codeLists" role="listbox" aria-expanded="false" style="width: 100%;max-height: 142px; overflow-y: auto;">
																									<li class="curCodes">
																										<input  v-model='${this.search}' class='entry-input' type='text' placeholder='搜索或手动输入故障代码' />
																									</li>																																														
																								</ul>
																							</div>
																						</div>
																					</div>
																				</div>
																	
																		<div class="col-lg-2 col-xs-3">
																			<label class="content-title-left pull-right">
                                                                       								故障持久性
                                                                    		</label>
																		</div>
																		<div class="col-lg-2 col-xs-3">
																			
																			<div class="">
																				<input id="FaultDurability_${this.bitIndex}" type="text" readonly="true" class="form-control FaultDurability" maxlength="30" />
																			</div>
																		</div>
																	</div>
                                                            <div class="form-group mt-20">
                                                                <label class="content-title-left text-right">故障描述</label>
                                                                <div class="col-xs-6">
                                                                    <textarea id="ProtocolFaultDescription_${this.bitIndex}" class="form-control ProtocolFaultDescription" placeholder="不需要手动填写，由上面的故障代码匹配之后自动填写"></textarea>
                                                                </div>
                                                            </div>
                                                            <div class="form-group mt-20">
                                                                <label class="content-title-left text-right">备注信息</label>
                                                                <div class="col-xs-6">
                                                                    <textarea id="ProtocolRemark_${this.bitIndex}" type="text" maxlength="100" class="form-control ProtocolRemark"/></textarea>
                                                                    <span class="ie8 icon-close close hide"></span>
                                                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                                                    <label class="focus"><span>备注信息最长为100个字符</span></label>
                                                                    <label class="focus valid"></label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                               		</div>
    									`;
        $('#addBitDataBtn').before(_this.detailInfoContentHtml);
        var _this = this;
        _this.protocLists = $('.protocList');
        _this.subAdreesIndex++;
        if(_this.subAdreesIndex >= 2) {
          _this.isOnlyOne = false;
        }
        $("#subProtocolAddress_" + (_this.subAdreesIndex - 1)).val($('#ProtocolAddress').val() + '-' + _this.subAdreesIndex);
        for(var j = 0; j < _this.searchData.length; j++) {
          $("#ProtocolFaultCode_" + (_this.subAdreesIndex - 1) + " .codeLists").append(`<li  class="codes">
																		<a class='codes_${this.bitIndex}' role='option'><span class='text' id="${_this.searchData[j].EquipmentFaultId}">${_this.searchData[j].FaultCode}</span></a>
																	</li>`)
          $('#FaultDurability_' + (_this.subAdreesIndex - 1)).attr('data-val', '');
          $("#ProtocolFaultCode_" + (_this.subAdreesIndex - 1)).selectpicker('refresh');
        }
        _this.bindCheckEvent();
        _this.bitIndex++;
      },
      getProtocol: function() {
        var _this = this;
        // 通信协议
        $('#ProtocolQueryTxt').bind('keypress', function(event) {
          if(event.keyCode == "13") {
            ProtocolTable.ajax.reload();
          }
        });
        var ProtocolTable = $('#ProtocolTable').DataTable({
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
                "Keywords": $("#ProtocolQueryTxt").val().trim()
              }
            };
            var url = eosCommon.ENTERPRISE_API + "api/equipment/GetProtocol";
            eosCommon.eosAjax(url, "GET", param, "json", function(result) {
              if(eosCommon.checkCode(result.State, result.Message)) {
                var returnData = {};
                var EquipmentProtocolIdData = [];
                if(result.Data == "") {
                  returnData.draw = data.draw;
                  returnData.recordsTotal = 0;
                  returnData.recordsFiltered = 0;
                  returnData.data = [];
                  _this.EquipmentProtocolIdData = EquipmentProtocolIdData
                } else {
                  returnData.draw = data.draw;
                  returnData.recordsTotal = result.Data.Total;
                  returnData.recordsFiltered = result.Data.Total;
                  for(var i = 0; i < result.Data.Result.length; i++) {
                    var dataJson = {};
                    var spliceFirstDataArr = [];
                    dataJson.DataType = result.Data.Result[i].DataType;
                    dataJson.EquipmentId = result.Data.Result[i].EquipmentId;
                    dataJson.ProtocolAddress = result.Data.Result[i].ProtocolAddress;
                    dataJson.GroupName = result.Data.Result[i].GroupName;
                    if(result.Data.Result[i].SubProtocols.length > 1) {
                      spliceFirstDataArr = result.Data.Result[i].SubProtocols.splice(0, 1);
                      dataJson.SubProtocols = result.Data.Result[i].SubProtocols;
                      EquipmentProtocolIdData.push($.extend({}, dataJson, spliceFirstDataArr[0]))
                    } else {
                      dataJson.SubProtocols = result.Data.Result[i].SubProtocols;
                      EquipmentProtocolIdData.push($.extend({}, dataJson, result.Data.Result[i].SubProtocols[0]))
                    }
                  }
                  _this.EquipmentProtocolIdData = EquipmentProtocolIdData
                }
                returnData.data = _this.EquipmentProtocolIdData;
                callback(returnData);
                eosCommon.eosOperators(eosCommon.eosOperDataHandle());
              }
            });
          },
          "columns": [{
            "orderable": false,
            "data": "EquipmentProtocolId",
            "defaultContent": ''
          }, {
            defaultContent: ""
          }, {
            "className": 'details-control ProtocolControl',
            "orderable": true,
            "data": null,
            "defaultContent": ''
          }, {
            data: "ProtocolAddress"
          }, {
            data: "DisplayName"
          }, {
            data: "DataType"
          }, {
            data: "DataModel"
          }, {
            data: "Offset"
          }, {
            data: "Ratio"
          }, {
            "defaultContent": "<span v-model='selectArr' class='OperatorBtnEdit OperatorEdit' data='1' title='修改通信协议'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除通信协议'><i class='fa fa-trash-o'></i></span>"
          }, ],
          "columnDefs": [{
            "targets": [0],
            "render": function(data) {
              var html = '';
              html = '<label><input type="checkbox" name="allCheckData" id="' + data + '" class="group-checkable" value="' + data + '" /></label>'
              return html
            }
          }],
        });
        $("#protoImport").unbind("click").click(function() {
          var viewImportData = [];
          _this.saveImportData = [];
          _this.errorSign = 0;
          _this.bindProtocolImport(viewImportData);
          $("#ProtocolAdd").hide();
          $("#ProtoList").hide();
          $('.panel-collapse').hide();
          $("#ProtoImportBox").show();
          $("#fileBox2").empty();
          $("#fileBox2").html('<div id="fileDnd2" class="uploader_box2 eos_uploader_box">' + '<div class="wu-example">' + '<div class="uploader-list"></div>' + '<div class="btns">' + '<div id="picker2">选择上传文件</div>' + '</div>' + '</div>' + '</div>');
          var param = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "Parameters.EquipmentId": _this.EquipmentId
          };
          eosCommon.eosUploaderFile({
            'uploaderObj': 'uploaderFile',
            'uploaderBox': '.uploader_box2',
            'uploaderList': '.uploader-list',
            'initBtn': '#picker2',
            'serverUrl': eosCommon.ENTERPRISE_API + "api/upload/protocol",
            'data': param,
            'fileNumLimit': 1,
            'upType': 1,
            'succ': function(result) {
              // console.log(result)
              var viewImportData = [];
              _this.saveImportData = [];
              _this.errorSign = 0;
              for(var i = 0; i < result.Data.TotalRows; i++) {
                var viewTemp = {};
                viewTemp.RowId = result.Data.UploadData[i]['序号'];
                viewTemp.ModbusAddress = result.Data.UploadData[i]['Modbus地址'];
                //								viewTemp.FirmwareVersion = result.Data.UploadData[i]['固件版本号'];
                viewTemp.ChineseName = result.Data.UploadData[i]['中文名'];
                viewTemp.EnglishName = result.Data.UploadData[i]['英文名'];
                viewTemp.DataType = result.Data.UploadData[i]['数据点类型'];
                viewTemp.Offset = result.Data.UploadData[i]['Offset'];
                viewTemp.Ratio = result.Data.UploadData[i]['Ratio'];
                viewTemp.DataModel = result.Data.UploadData[i]['数据处理方式'];
                viewTemp.Unit = result.Data.UploadData[i]['显示单位'];
                viewTemp.FaultCode = result.Data.UploadData[i]['故障代码'];
                viewTemp.IsStringOutput = result.Data.UploadData[i]['输出字符'];
                viewTemp.GroupName = result.Data.UploadData[i]['分组名称'];
                viewTemp.IsTimeKeeping = result.Data.UploadData[i]['是否计算时长'] == "是" ? "1" : "0";
                viewTemp.IsStat = result.Data.UploadData[i]['是否需要统计'] == "是" ? "1" : "0";
                viewTemp.IsIssue = result.Data.UploadData[i]['是否远程设定'] == "是" ? "1" : "0";
                viewTemp.Remark = result.Data.UploadData[i]['备注'] ? result.Data.UploadData[i]['备注']: '';
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
                saveTemp.RowId = result.Data.UploadData[i]['序号'];
                saveTemp.ModbusAddress = result.Data.UploadData[i]['Modbus地址'];
                //saveTemp.FirmwareVersion = result.Data.UploadData[i]['固件版本号'];
                saveTemp.ChineseName = result.Data.UploadData[i]['中文名'];
                saveTemp.EnglishName = result.Data.UploadData[i]['英文名'];
                saveTemp.DataType = result.Data.UploadData[i]['数据点类型'];
                saveTemp.Offset = result.Data.UploadData[i]['Offset'];
                saveTemp.Ratio = result.Data.UploadData[i]['Ratio'];
                saveTemp.DataModel = result.Data.UploadData[i]['数据处理方式'];
                saveTemp.Unit = result.Data.UploadData[i]['显示单位'];
                saveTemp.FaultCode = result.Data.UploadData[i]['故障代码'];
                saveTemp.IsStringOutput = result.Data.UploadData[i]['输出字符'];
                saveTemp.GroupName = result.Data.UploadData[i]['分组名称'];
                saveTemp.IsTimeKeeping = result.Data.UploadData[i]['是否计算时长'] == "是" ? "1" : "0";
                saveTemp.IsStat = result.Data.UploadData[i]['是否需要统计'] == "是" ? "1" : "0";
                if(_this.canSettingShow==1){
                	 saveTemp.IsIssue = result.Data.UploadData[i]['是否远程设定'] == "是" ? "1" : "0";
                }else{
                	 saveTemp.IsIssue=0;
                }
                saveTemp.Remark = result.Data.UploadData[i]['备注'];              
                _this.saveImportData.push(saveTemp);
              }
              // console.log(_this.saveImportData)
              _this.bindProtocolImport(_this.viewImportData);
              var num1 = parseInt(_this.viewImportData.length)
              var num2 = parseInt(_this.saveImportData.length)
              if(!result.Data.ErrorRows == '') {
                vdialog({
                  type: 'confirm',
                  title: '提示',
                  content: "您导入的数据有" + (num1 - num2) + "条数据已存在或数据有误！",
                  ok: function() {},
                  cancel: false,
                  modal: true
                });
              }
              //							var num1 = parseInt(_this.viewImportData.length)
              //							var num2 = parseInt(_this.saveImportData.length)
              //_this.bindProtocolImport(_this.saveImportData);
            },
            'del': function() {
              var viewImportData = [];
              _this.saveImportData = [];
              _this.errorSign = 0;
              _this.bindProtocolImport(_this.viewImportData);
            }
          })
        });

        function saveProtocaolImport() {
          btn = $(".loading_btn").button('loading');
          var param = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "Parameters": {
              "EquipmentId": _this.EquipmentId,
              "Protocols": _this.saveImportData,
              "AddWay": 1
            }
          };
          // console.log(param)
          var url = eosCommon.ENTERPRISE_API + "api/equipment/BatchProtocol";
          eosCommon.eosAjax(url, "POST", param, "json", function(result) {
            if(eosCommon.checkCode(result.State, result.Message)) {
              eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
              ProtocolTable.ajax.reload();
              _this.saveImportData = [];
              _this.errorSign = 0;
              //_this.bindProtocolImport(_this.viewImportData);
              $("#ProtocolAdd,#ProtoImportBox").hide();
              $("#ProtoList").show();
              $(".loading_btn").button('reset');
              vdialog({
                type: 'confirm',
                title: '提示',
                content: "对通信协议进行新增更改之后，需要重新点击发布按钮",
                ok: function() {},
                cancel: false,
                modal: true
              });
            }
          });
        }
        $('#saveProtoTemplateData').unbind("click").click(function() {
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
              ok: function() {
                saveProtocaolImport();
              },
              modal: true
            });
          } else if(_this.saveImportData.length > 0) {
            saveProtocaolImport();
          }
        });
        $('#ProtocolQueryBtn').unbind("click").click(function() {
          ProtocolTable.ajax.reload();
        });
        verifyCheck({
          formId: 'ProtocolVerifyCheck',
          onBlur: null,
          onFocus: null,
          onChange: null,
          successTip: true,
          resultTips: null,
          clearTips: null,
          code: true,
          phone: true
        });

        function ProtocolFormat(d) {
          return '<table class="table-bordered table table-hover" style="display: table;">' + '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">转换类型</td>' + '<td style="text-align: left;padding: 8px 12px;">' + d.ConvertToName + '</td>' + '</tr>' + '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">转换方式</td>' + '<td style="text-align: left;padding: 8px 12px;">' + d.ConvertByName + '</td>' + '</tr>' + '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">中文名</td>' + '<td style="text-align: left;padding: 8px 12px;">' + (d.DisplayName == null ? "" : d.DisplayName) + '</td>' + '</tr>' + '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">英文名</td>' + '<td style="text-align: left;padding: 8px 12px;">' + (d.EnglishName == null ? "" : d.EnglishName) + '</td>' + '</tr>' + '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">显示单位</td>' + '<td style="text-align: left;padding: 8px 12px;">' + (d.Unit == null ? "" : d.Unit) + '</td>' + '</tr>' +     '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">是否远程设定</td>' + '<td style="text-align: left;padding: 8px 12px;">' + (d.IsIssue == 1 ? "是" : "否") + '</td>' + '</tr>'         + '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">故障代码</td>' + '<td style="text-align: left;padding: 8px 12px;">' + (d.FaultCode == null ? "" : d.FaultCode) + '</td>' + '</tr>' + '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">故障级别</td>' + '<td style="text-align: left;padding: 8px 12px;">' + (d.FaultLevelName == null ? "" : d.FaultLevelName) + '</td>' + '</tr>' + '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">故障描述</td>' + '<td style="text-align: left;padding: 8px 12px;">' + (d.FaultDescription == null ? "" : d.FaultDescription) + '</td>' + '</tr>' + '<tr>' + '<td style="width: 150px;text-align: right;padding: 8px 12px;">备注信息</td>' + '<td style="text-align: left;padding: 8px 12px;">' + (d.Remark == null ? "" : d.Remark) + '</td>' + '</tr>'
          '</table>';
        };
        $('#ProtocolTable').unbind("click").on('click', 'td.ProtocolControl', function() {
          var tr = $(this).closest('tr');
          var row = ProtocolTable.row(tr);
          if(row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
          } else {
            row.child(ProtocolFormat(row.data())).show();
            tr.addClass('shown');
          }
        });
        ProtocolTable.on('draw.dt', function() {
          ProtocolTable.column(1, {
            search: 'applied',
            order: 'applied'
          }).nodes().each(function(cell, i) {
            i = i + 1;
            var page = ProtocolTable.page.info();
            var pageno = page.page;
            var length = page.length;
            var columnIndex = (i + pageno * length);
            cell.innerHTML = columnIndex;
          });
        });
        $('#ProtocolTable tbody').unbind("click").on('click', 'tr', function() {
          if($(this).hasClass('selected')) {
            $(this).removeClass('selected');
          } else {
            ProtocolTable.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
          }
        });
        $('#ProtocolTable tbody').unbind("click").on('click', 'span', function() {
          var data = ProtocolTable.rows($(this).parents('tr')).data();
          var isNum = $(this).attr("data");
          if(isNum == "1") {
            //编辑数据
            _this.editProtocolTableList(data);
          } else if(isNum == "3") {
            //删除信息赋值 函数
            vdialog({
              type: 'confirm',
              title: '提示',
              content: eosCommon.DELETE_MSG_ASK,
              ok: function() {
                eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/DeleteProtocol", "Delete", {
                  "AccessToken": eosCommon.storage.get("AccessToken"),
                  "Parameters": {
                    "EquipmentProtocolId": data[0]['EquipmentProtocolId'],
                  }
                }, "json", function(result) {
                  if(eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                    ProtocolTable.ajax.reload();
                  }
                });
              },
              cancel: true,
              modal: true
            });
          }
        });
        //绑定复选框id事件
        $('#ProtocolTable tbody').unbind("change").on('change', 'input[name=allCheckData]', function() {
          var longzhoufengAll = []
          $("#ProtocolTable tbody tr td input[name=allCheckData]:checked").each(function() {
            longzhoufengAll.push($(this).val());
          })
          _this.selectArr = longzhoufengAll
        });
        $('#ProtocolTable thead #allIsCheckedlongzhoufeng').unbind("click").on('click', function() {
          $('#ProtocolTable thead #allIsCheckedlongzhoufeng').attr("checked", true)
          $("[name=allCheckData]:checkbox").each(function() { //遍历每一个复选框
            //$(this).attr("checked",!$(this).attr("checked")); //jQuery方法取复选框的反向值
            this.checked = !this.checked; //js方法
            var longzhoufengAll = []
            $("#ProtocolTable tbody tr td input[name=allCheckData]:checked").each(function() {
              longzhoufengAll.push($(this).val());
            })
            _this.selectArr = longzhoufengAll
          });
        });
        
        
        $(".ProtocolCancelBtn,#ProtocolBtn,.ProtocolBtnReturn").unbind('click').click(function() {
          _this.bitIndex = 1;
          _this.subAdreesIndex = 1;
          $(".loading_btn").button('reset');
          $("#ProtocolAdd,#ProtoImportBox").hide();
          $("#ProtoList").show();
          $('.panel-collapse').hide();
          $('.portlet-title').html("以下内容为非必填项，点击展开");
        });
        $("#addProtocolBtn").unbind('click').click(function() {
          //xinzeng
          eosCommon.resetFrom();
          _this.ProtocolAddress = '';
          $('.panel-collapse').hide();
          $('.portlet-title').html("以下内容为非必填项，点击展开");
          $("#ProtocolSaveBtn").attr('data-status', 'save');
          $("#isComputeTimeDiv_0").attr("value", "0")
          $("#isComputeTimeDiv_0").prop("checked", false)
          $("#isStat_0").attr("value", "0")
          $("#isStat_0").prop("checked", false)
          $('#bit1_0').val('');
          $('#bit2_0').val('');
          $("#ProtocolFaultCode_0").selectpicker('val', '');
          $('#FaultDurability_0').attr('data-val', '');
          $('#FaultDurability_0').val('');
          $("#group").find(".group-text").html('');
          $('#group').find('.entry-input').val('');
          $("#ProtocolFaultCode_0 .group-text").html("");
          $("#ProtocolFaultCode_0 .group-text").attr("id", '');
          $("#ProtocolFaultCode_0 input").val("");
          _this.bindCheckEvent();
          _this.isBitMask = false;
          $("#ProtocolAdd").show();
          $("#ProtoList").hide();
          $(".ProtocolTitle").html("新增通讯协议");
          _this.protocLists = $('.protocList');
          for(var i = 1; i < _this.protocLists.length; i++) {
            _this.protocLists[i].remove();
          }
          $("#ProtocolFirmwareVersion_0,#ProtocolAddress,#subProtocolAddress_0,#ProtocolOffset_0,#ProtocolRatio_0,#ProtocolDisplayName_0,#EnglishName_0,#ProtocolUnit_0,#ProtocolFaultDescription_0,#ProtocolRemark_0").val('');
          $("#ProtocolDataType,#ProtocolDataModel_0,#ProtocolConvertTo_0,#ProtocolConvertBy_0,#ProtocolFaultLevel_0").selectpicker('val', '');
          $("#group").on("click", ".dropdown-menu li", function() {
            var obj = $(this).parents('#group');
            obj.find(".group-text").html($(this).find(".text").html());
          });
          $("#group").on("change", ".entry-input", function() {
            var obj = $(this).parents('#group');
            obj.find(".group-text").html($(this).val());
          });
          $('.codesSelectBtn').on('click', function() {
            _this.search = '';
          });
          $("#ProtocolFaultCode_0").on("click", ".dropdown-menu li a", function() {
            var obj = $(this).parents('#ProtocolFaultCode_0');
            obj.find('.entry-input').val('');
            obj.find(".group-text").html($(this).find(".text").html());
            obj.find(".group-text").attr('id', $(this).find(".text").attr('id'));
            var curVal = obj.find(".group-text").attr('id');
            if(!curVal) {
              $('#FaultDurability_0').val('');
              $('#ProtocolFaultDescription_0').val('');
              $('#ProtocolRemark_0').val('');
            }
            for(var i = 0; i < _this.getFaultDataLists.length; i++) {
              if(curVal == _this.getFaultDataLists[i].EquipmentFaultId) {
                _this.getFaultDataLists[i].FaultDurabilityName == '锁定' ? $('#FaultDurability_0').attr('data-val', 1) : $('#FaultDurability_0').attr('data-val', 2);
                $('#FaultDurability_0').val(_this.getFaultDataLists[i].FaultDurabilityName);
                $('#ProtocolFaultDescription_0').val(_this.getFaultDataLists[i].FaultDescription);
                $('#ProtocolRemark_0').val(_this.getFaultDataLists[i].Remark);
              }
            }
          });
          $("#ProtocolFaultCode_0").on("change", ".entry-input", function() {
            for(var i = 0; i < _this.getFaultDataLists.length; i++) {
              if($.trim($(this).val()) !== $.trim(_this.getFaultDataLists[i].FaultCode)) {
                continue;
              } else {
                var obj = $(this).parents('#ProtocolFaultCode_0');
                obj.find(".group-text").html($(this).val());
                obj.find(".group-text").attr('id', _this.getFaultDataLists[i].EquipmentFaultId);
                var curVal = obj.find(".group-text").attr('id');
                if(!curVal) {
                  $('#FaultDurability_0').val('');
                  $('#ProtocolFaultDescription_0').val('');
                  $('#ProtocolRemark_0').val('');
                }
                for(var i = 0; i < _this.getFaultDataLists.length; i++) {
                  if(curVal == _this.getFaultDataLists[i].EquipmentFaultId) {
                    _this.getFaultDataLists[i].FaultDurabilityName == '锁定' ? $('#FaultDurability_0').attr('data-val', 1) : $('#FaultDurability_0').attr('data-val', 2);
                    $('#FaultDurability_0').val(_this.getFaultDataLists[i].FaultDurabilityName);
                    $('#ProtocolFaultDescription_0').val(_this.getFaultDataLists[i].FaultDescription);
                    $('#ProtocolRemark_0').val(_this.getFaultDataLists[i].Remark);
                  }
                }
                $(this).val('');
                return;
              }
            }
            $(this).val('');
            return false;
          });
          $("#ProtocolDataType").selectpicker('val', 'SInt16');
          $("#ProtocolDataType").selectpicker('refresh');
          $("#ProtocolDataModel_0").selectpicker('val', 'HL');
          $("#ProtocolConvertTo_0").selectpicker('val', '0');
          $("#ProtocolConvertBy_0").selectpicker('val', '0');
          $("#ProtocolFaultLevel_0").selectpicker('val', 0);
          var params = {
            "AccessToken": eosCommon.storage.get("AccessToken"),
            "Parameters": {
              "EquipmentId": _this.EquipmentId
            }
          }
          eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/GetGroupNameOfProtocol', "GET", params, "json", function(result) {
            if(eosCommon.checkCode(result.State, result.Message)) {
              _this.groupList = result.Data.Result
            }
          });
        })
        $("#ProtocolSaveBtn").unbind('click').click(function() {
          //点击保存
          var paramsArr = [];
          var protocList = $('.protocList');
          var GroupName = "";
          if($("#group .group-text").html() == "" || $("#group .group-text").html() == "请选择或输入协议分组名称") {
            GroupName = "默认群组";
          } else {
            GroupName = $("#group .group-text").html();
          }
          for(var i = 0; i < protocList.length; i++) {
            var paramsJson = {
              "SubProtocolAddress": $("#subProtocolAddress_" + i).val(),
              "DataModel": $("#ProtocolDataModel_" + i).selectpicker('val'),
              "Offset": $("#ProtocolOffset_" + i).val(),
              "Ratio": $("#ProtocolRatio_" + i).val(),
              "ConvertTo": $("#ProtocolConvertTo_" + i).selectpicker('val'),
              "ConvertBy": $("#ProtocolConvertBy_" + i).selectpicker('val'),
              "DisplayName": $("#ProtocolDisplayName_" + i).val(),
              "EnglishName": $("#EnglishName" + "_" + i).val(),
              "Unit": $("#ProtocolUnit" + "_" + i).val(),
              "FaultCode": $("#ProtocolFaultCode_" + i + " .group-text").html(),
              "EquipmentFaultId": $("#ProtocolFaultCode_" + i).find(".group-text").attr('id'),
              "FaultLevel": '1',
              'FaultDurability': $('#FaultDurability_' + i).attr('data-val'),
              "FaultDescription": $("#ProtocolFaultDescription_" + i).val(),
              "Remark": $("#ProtocolRemark_" + i).val(),
              "IsTimeKeeping": $("#isComputeTimeDiv_" + i).val(),
              "IsStat": $("#isStat_" + i).val(),
              "BeginPointIndex": $("#bit1_" + i).val(),
              "EndPointIdex": $("#bit2_" + i).val(),
              "SubEquipmentProtocolId": $("#subProtocolAddress_" + i).attr('data-id'),
            	"IsIssue":_this.canSettingShow==1? Number($("#IsIssue_"+i).find('input:checked').val()) : 0
              //.find("input:radio[name=IsIssue_"+i+"]:checked")
            }
//         console.log('元素：',$("#IsIssue_"+i).find('input:checked').val());
              paramsArr.push(paramsJson)
                 //console.log('json:',paramsJson);
                // return;
          }
          if(!verifyCheck._click("ProtocolVerifyCheck")) return false;
          if($("#ProtocolFaultDescription").val() == "暂无匹配数据，请检查故障代码是否填写正确") {
            return false;
          }
          if($(this).attr('data-status') == 'save') {
            btn = $(".loading_btn").button('loading');
            var params = {
              "AccessToken": eosCommon.storage.get("AccessToken"),
              "EquipmentId": _this.EquipmentId,
              "ProtocolAddress": $("#ProtocolAddress").val(),
              "DataType": $("#ProtocolDataType").selectpicker('val'),
              "GroupName": GroupName,
              "SubProtocols": paramsArr
            }
            eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/InsertProtocol", "Post", params, "json", function(result) {
              if(eosCommon.checkCode(result.State, result.Message)) {
                ProtocolTable.ajax.reload();
                eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                $("#ProtocolAdd").hide();
                $("#ProtoList").show();
                $('.panel-collapse').hide();
                $('.portlet-title').html("以下内容为非必填项，点击展开");
                $(".loading_btn").button('reset');
                vdialog({
                  type: 'confirm',
                  title: '提示',
                  content: "对通信协议进行新增更改之后，需要重新点击发布按钮",
                  ok: function() {
                    _this.getProtocol();
                  },
                  cancel: false,
                  modal: true
                });
		          _this.bitIndex = 1;
		          _this.subAdreesIndex = 1;
              }
            });
          } else {
            //修改保存代码
            var params = {
              "AccessToken": eosCommon.storage.get("AccessToken"),
              "ParentEquipmentProtocolId": $("#ProtocolAddress").attr('data-id'),
              "EquipmentId": _this.EquipmentId,
              "ProtocolAddress": $("#ProtocolAddress").val(),
              "DataType": $("#ProtocolDataType").selectpicker('val'),
              "GroupName": GroupName,
              "SubProtocols": paramsArr
            }
            btn = $(".loading_btn").button('loading');
            eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/UpdateProtocol", "Put", params, "json", function(result) {
              if(eosCommon.checkCode(result.State, result.Message)) {
                ProtocolTable.ajax.reload();
                eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                $("#ProtocolAdd").hide();
                $("#ProtoList").show();
                $('.panel-collapse').hide();
                $('.portlet-title').html("以下内容为非必填项，点击展开");
                $(".loading_btn").button('reset');
                vdialog({
                  type: 'confirm',
                  title: '提示',
                  content: "对通信协议进行新增更改之后，需要重新点击发布按钮",
                  ok: function() {},
                  cancel: false,
                  modal: true
                });
	          _this.bitIndex = 1;
	          _this.subAdreesIndex = 1;
              }
            });
          }
         
        });
        //******************************
        _this.getFaultDatas();
      },
      editProtocolTableList(data) {
        //修改通信协议
        var _this = this;
        eosCommon.resetFrom();
        $('.panel-collapse').hide();
        $('.portlet-title').html("以下内容为非必填项，点击展开");
        $("#ProtocolSaveBtn").attr('data-status', 'edit');
        $("#ProtocolAdd").show();
        $("#ProtoList").hide();
        $(".ProtocolTitle").html("编辑通讯协议");
        _this.protocLists = $('.protocList');
        for(var i = 1; i < _this.protocLists.length; i++) {
          _this.protocLists[i].remove();
        }
        $("#ProtocolAddress").val(data[0]["ProtocolAddress"]);
        _this.ProtocolAddress = data[0]["ProtocolAddress"];
        $("#ProtocolDataType").selectpicker('val', data[0]["DataType"]);
        $("#ProtocolAddress").attr('data-id', data[0]['EquipmentProtocolId']);
        $('#FaultDurability_0').val();
        $("#group .group-text").html(data[0]['GroupName']);
        $("#group").on("click", ".dropdown-menu li", function() {
          var obj = $(this).parents('#group');
          obj.find(".group-text").html($(this).find(".text").html());
        });
        $("#group").on("change", ".entry-input", function() {
          var obj = $(this).parents('#group');
          obj.find(".group-text").html($(this).val());
        });
        $("#ProtocolFaultCode_0").on("click", ".dropdown-menu li a", function() {
          var obj = $(this).parents('#ProtocolFaultCode_0');
          obj.find(".group-text").html($(this).find(".text").html());
          obj.find(".group-text").attr('id', $(this).find(".text").attr('id'));
          var curVal = obj.find(".group-text").attr('id');
          if(!curVal) {
            $('#FaultDurability_0').val('');
            $('#ProtocolFaultDescription_0').val('');
            $('#ProtocolRemark_0').val('');
          }
          for(var i = 0; i < _this.getFaultDataLists.length; i++) {
            if(curVal == _this.getFaultDataLists[i].EquipmentFaultId) {
              _this.getFaultDataLists[i].FaultDurabilityName == '锁定' ? $('#FaultDurability_0').attr('data-val', 1) : $('#FaultDurability_0').attr('data-val', 2);
              $('#FaultDurability_0').val(_this.getFaultDataLists[i].FaultDurabilityName);
              $('#ProtocolFaultDescription_0').val(_this.getFaultDataLists[i].FaultDescription);
              $('#ProtocolRemark_0').val(_this.getFaultDataLists[i].Remark);
            }
          }
        });
        $("#ProtocolFaultCode_0").on("change", ".entry-input", function() {
          for(var i = 0; i < _this.getFaultDataLists.length; i++) {
            if($.trim($(this).val()) !== $.trim(_this.getFaultDataLists[i].FaultCode)) {
              continue;
            } else {
              var obj = $(this).parents('#ProtocolFaultCode_0');
              obj.find(".group-text").html($(this).val());
              obj.find(".group-text").attr('id', _this.getFaultDataLists[i].EquipmentFaultId);
              var curVal = obj.find(".group-text").attr('id');
              if(!curVal) {
                $('#FaultDurability_0').val('');
                $('#ProtocolFaultDescription_0').val('');
                $('#ProtocolRemark_0').val('');
              }
              for(var i = 0; i < _this.getFaultDataLists.length; i++) {
                if(curVal == _this.getFaultDataLists[i].EquipmentFaultId) {
                  _this.getFaultDataLists[i].FaultDurabilityName == '锁定' ? $('#FaultDurability_0').attr('data-val', 1) : $('#FaultDurability_0').attr('data-val', 2);
                  $('#FaultDurability_0').val(_this.getFaultDataLists[i].FaultDurabilityName);
                  $('#ProtocolFaultDescription_0').val(_this.getFaultDataLists[i].FaultDescription);
                  $('#ProtocolRemark_0').val(_this.getFaultDataLists[i].Remark);
                }
              }
              $(this).val('');
              return;
            }
          }
          return false;
        });
        var datas = data[0].SubProtocols;
        if(data[0]["DataType"] == 'BitMask32' || data[0]["DataType"] == 'BitMask16') {
          _this.isBitMask = true;
          for(var i = 0; i < datas.length - 1; i++) {
            _this.addRow();
          }
          for(var i = 0; i < datas.length; i++) {
            $('#bit1_' + i).val(datas[i]['BeginPointIndex']);
            $('#bit2_' + i).val(datas[i]['EndPointIdex']);
            $("#subProtocolAddress_" + i).attr('data-id', datas[i]['EquipmentProtocolId']);
            $("#isComputeTimeDiv_" + i).val(datas[i]["IsTimeKeeping"])
            $("#isStat_" + i).val(datas[i]["IsStat"])
            _this.editProtocolInitDatas(i, datas);
          }
          _this.bindCheckEvent();
        } else {
          for(var i = 0; i < datas.length; i++) {
            $("#isComputeTimeDiv_" + i).val(datas[i]["IsTimeKeeping"])
            $("#isStat_" + i).val(datas[i]["IsStat"])
            _this.editProtocolInitDatas(i, datas);
          }
          _this.bindCheckEvent();
        }
        var params = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "EquipmentId": _this.EquipmentId
          }
        }
        eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/equipment/GetGroupNameOfProtocol', "GET", params, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            _this.groupList = result.Data.Result
          }
        });
      },
      getFaultDatas: function() {
        var _this = this;
        eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/GetFault", "Get", {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "EquipmentId": _this.EquipmentId,
            "Keywords": ''
          }
        }, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            if(result.Data == "") {
              $("#ProtocolFaultDescription").val("暂无匹配数据，请检查故障代码是否填写正确");
            } else {
              _this.getFaultDataLists = result.Data.Result;
            }
          }
        });
      },
      editProtocolInitDatas: function(i, datas) {
        //bianji  no_IsIssuei_0
        if(datas[i]["IsIssue"]==1){
        	 $("#IsIssuei_"+i).prop("checked", true);
        }else{
        	 $("#no_IsIssuei_"+i).prop("checked", true);
        }
        if(datas[i]["IsTimeKeeping"] == 1) {
          $("input[name=isComputeTime_" + i + "]").prop("checked", true);
        } else {
          $("input[name=isComputeTime_" + i + "]").prop("checked", false);
        }
        if(datas[i]["IsStat"] == 1) {
          $("input[name=isNeedStat_" + i + "]").prop("checked", true);
        } else {
          $("input[name=isNeedStat_" + i + "]").prop("checked", false);
        }
        $("#ProtocolFirmwareVersionData_" + i).val(datas[i]['FirmwareVersion']);
        $("#ProtocolFirmwareVersion_" + i + ".group-text").html(datas[i]['FirmwareVersion']);
        $("#group_" + i + ".group-text").html(datas[i]['GroupName']);
        $("#ProtocolDataModel_" + i).selectpicker('val', datas[i]["DataModel"]);
        $("#ProtocolOffset_" + i).val(datas[i]["Offset"]);
        $("#ProtocolRatio_" + i).val(datas[i]["Ratio"]);
        $("#ProtocolConvertTo_" + i).selectpicker('val', datas[i]["ConvertTo"]);
        $("#ProtocolConvertBy_" + i).selectpicker('val', datas[i]["ConvertBy"]);
        $("#ProtocolDisplayName_" + i).val(datas[i]["DisplayName"]);
        $("#EnglishName_" + i).val(datas[i]["EnglishName"]),
          $("#ProtocolUnit_" + i).val(datas[i]["Unit"]);
        $("#ProtocolFaultCode_" + i).find(".group-text").html(datas[i]["FaultCode"]);
        $("#ProtocolFaultCode_" + i).find(".group-text").attr('id', datas[i]["EquipmentFaultId"]);
        datas[i]["FaultDurability"] == 1 ? $("#FaultDurability_" + i).val('锁定') : $("#FaultDurability_" + i).val('不锁定');
        $("#FaultDurability_" + i).val() == '锁定' ? $('#FaultDurability_' + i).attr('data-val', 1) : $('#FaultDurability_' + i).attr('data-val', 2);
        $("#ProtocolFaultDescription_" + i).val(datas[i]["FaultDescription"]);
        $("#ProtocolRemark_" + i).val(datas[i]["Remark"]);
        this.bindCheckEvent();
      },
      DelAllProtocols(){
      	let _this=this;
      	vdialog({
            type: 'confirm',
            title: '提示',
            content: "是否删除全部的协议地址？",
            ok: function() {
              eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/DeleteProtocol", "Delete", {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                	"EquipmentId":_this.EquipmentId,
                  "EquipmentProtocolId": JSON.stringify([]),
                  "BatchType": 3
                }
              }, "json", function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                  eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                  _this.getProtocol();
                }
              });
            },
            cancel: true,
            modal: true
          });
      },
      DelAllProtocol: function() {
        var _this = this;
        console.log(_this.selectArr);
        if(_this.selectArr.length ==0) {
          vdialog({
            type: 'confirm',
            title: '提示',
            content: '请选择您要删除的通讯协议',
            ok: function() {},
            cancel: true,
            modal: true
          });
          return false;
        } else {
          vdialog({
            type: 'confirm',
            title: '提示',
            content: "是否删除选中的协议地址",
            ok: function() {
              eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/DeleteProtocol", "Delete", {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                  "EquipmentProtocolId": _this.selectArr,
                  "BatchType": 2
                }
              }, "json", function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                  eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                  _this.getProtocol();
                }
              });
            },
            cancel: true,
            modal: true
          });
        }
      }
    }
  }
</script>
<style scoped="scoped">
  .device_info .form-control {
    font-size: 14px;
  }
  
  .device_info.eos_uploader_img {
    overflow: hidden;
  }
  
  .device_info.eos_uploader_img .filelist li {
    margin: 10px 10px 0 0;
  }
  
  .device_info .eos_uploader_img .queueList {
    padding: 0;
    margin: 0;
  }
  
  .device_info .eos_uploader_img .filelist {
    padding: 0;
    margin: 0 0 10px 13px;
  }
  
  .device_info .eos_uploader_img .filelist li {
    width: 122px;
    height: 118px;
    cursor: pointer;
  }
  
  .device_info .eos_uploader_img .no_data {
    padding-top: 10px;
  }
  
  .device_info .panel_nav_box {
    position: relative;
  }
  
  .device_info .panel_nav_box button {
    position: absolute;
    top: 10px;
    right: 0;
  }
  
  .device_info .content-right {
    left: 245px;
  }
  
  .device_info .OrgTopAligin {
    margin-top: 0;
  }
  
  #UserManual .OperatorBtnEdit {
    margin-right: 28px;
  }
  
  #UserManual .transaction-list i {
    font-size: 18px;
  }
  
  #NameplateList .form-horizontal {
    font-size: 24px;
  }
  
  #setPanel .form-horizontal .editable {
    padding-top: 7px;
    display: inline-block;
  }
  
  #NameplateListItem {
    position: relative;
  }
  
  .device_info .modal-footer {
    text-align: left;
    border-top: none;
    padding-left: 0;
  }
  
  .device_info .transaction-list .tran-text {
    width: 90%;
  }
  
  .device_info .userManualOperBtn {
    position: absolute;
    right: 6px;
    top: 0;
  }
  
  .device_info .table>thead>tr>th:nth-child(1) {
    width: auto;
  }
  
  .device_info .tabs-vertical-env .nav.tabs-vertical li.active>a {
    color: #fff !important;
  }
  
  .device_info .eos_uploader_img .filelist li {
    width: 172px;
    height: 168px;
    text-align: center;
    border: 1px solid #dddddd;
    margin: 10px 10px 0 0;
    position: relative;
    display: inline;
    float: left;
    font-size: 12px;
  }
  
  .ak-select .group-text {
    display: inline-block;
    overflow: hidden;
    height: 20px;
    line-height: 20px;
    text-align: left;
    font-size: 9pt;
  }
  
  .ak-select ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }
  
  .ak-select ul li a {
    display: block;
    padding: 3px 20px;
    clear: both;
    font-weight: 400;
    line-height: 1.42857143;
    color: #333;
    white-space: nowrap;
  }
  
  .ak-select ul li a:hover {
    color: #262626;
    text-decoration: none;
    background-color: #f5f5f5;
    cursor: pointer;
  }
  
  .ak-select ul li .entry-input {
    width: 180px;
    height: 30px;
    margin: 0 8px 3px 8px;
    padding: 0 8px;
    border: 1px solid #E3E3E3;
  }
  
  .ak-select .dropdown-toggle .caret {
    position: absolute;
    top: 50%;
    right: 9pt;
    margin-top: -2px;
    vertical-align: middle;
  }
  
  .item-content-title-right {
    text-align: right;
    height: 34px;
    line-height: 32px;
  }
  
  .device_info .uploadFileList a {
    padding-right: 20px;
  }
</style>
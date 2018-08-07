<style scoped="scoped" lang="less">
    /*.logoCustom{
    	border-radius: 5px;
    	width: 75px;
    }*/
   .el_mainContent {
  background: #FEFEFE;
  height: 100%;
  position: relative;
  /*overflow: auto;*/
}

</style>
<template>
    <div id="industry" class="el_mainContent">  
        <div class="row">
            <div class="col-sm-12">
                <div id="divDataTableView" class="card-box table-responsive">

                    <div class="row">
                        <div class="col-sm-6 col-md-4 col-lg-2">
                            <span class="size20 font-bold">行业管理</span>
                        </div>
                    </div>

                    <hr class="divider mb-10 mt-10">

                    <div class="row">
                        <div class="col-lg-12">
                            <span class="OrgTopAligin OperatorInsert">
                                <button id="btnInsert" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-cleos">
                                    <i class="fa fa-plus m-r-5"></i>新增
                                </button>
                            </span>
                            <span class="OperatorSearch">
                            	<div class="OrgTopAligin eosAuto">
                               		 <input id="txtQueryIndustryName" type="text" name="txtAccount"  class="EosAutocompleter form-control" placeholder="行业名称">
                           		 </div>
	                            <span class="OrgTopAligin">
	                                <button id="btnQuery" type="button" class="btn btn-default" @click='search'>
	                                    <i class="fa fa-search m-r-5"></i>查找
	                                </button>
	                            </span>
                            </span>
                        </div>
                    </div>
                    <table id="exampleIn" class="table table-striped table-bordered" width="100%">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>行业名称</th>
                                <th>描述</th>
                                <th>行业Logo</th>
                                <th>是否启用</th>
                                <th class="w-80">操作</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>
        <div id="modal-cleos" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="win-close" data-dismiss="modal">×</button>
                    <button id="btnSave" type="button" class="sava loading_btn" data-loading-text="保存中..."><i class='fa fa-save m-r-5'></i>保存</button>
                    <h4 id="ModuleTitle" class="modal-title"></h4>
                </div>
                <div id="verifyCheck">

                    <div id="modal_body1" class="modal-body nicescroll">

                        <div class="form-horizontal mt-10 content-box-modal">

                            <div class="form-group mt-20">
                                <label class="content-title-left text-right">
                                    <em class="ak_required_em">*</em>行业名称
                                </label>
                                <div class="col-xs-9">
                                    <input id="txtIndustryName" type="text" maxlength="25" class="form-control required"  data-valid="isNonEmpty||between:1-25||isZh" data-error="行业名称不能为空||行业名称长度1-25位||行业名称必须为中文" placeholder="行业名称" />
                                    <span class="ie8 ion-close-circled close hide text-danger font-16 m-t-3"></span>
                                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                    <label class="focus valid"></label>
                                </div>
                            </div>
							
                            <div class="form-group">
                                <label class="content-title-left text-right">描述</label>
                                <div class="col-xs-9 pb-10">
                                    <textarea id="txtDescription" maxlength="100" class="form-control"></textarea>
                                </div>
                            </div>
                            <div class="form-group">
                            	<el-form :model="formItems" :rules="rules" ref="formItems" label-width="150px" label-position="right">
							        <el-form-item label="行业LOGO" class="chartName_input" prop="ResourceId">
							          <el-col :span="14" class='pl10'>
							            <el-upload ref="OriginalPhotosUpload" :ResourceId="formItems.ResourceId" :file-list="formItems.imgLists" :action="formItems.uploadUrl" list-type="picture-card" :data='uploadData' :on-success='updateImg' :on-remove="updateDeleteImg" limit='1'> <i class="el-icon-plus"></i> </el-upload>
							          </el-col>
							        </el-form-item>
						      	</el-form>
                            </div>
                        </div>
                        <div class="form-horizontal mt-10 content-box-modal">
                            <div class="form-group">
                                <label class="content-title-left text-right">
                                    <em class="ak_required_em">*</em>是否启用
                                </label>
                                <div class="col-xs-9 pt-3">
                                    <div class="radio radio-custom radio-inline">
                                        <input type="radio" name="radioIsActive" value="0">
                                        <label for="radioIsActive0">
                                            否
                                        </label>
                                    </div>
                                    <div class="radio radio-danger radio-inline">
                                        <input type="radio" name="radioIsActive" value="1" checked>
                                        <label for="radioIsActive1">
                                            是
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
		<el-dialog :visible.sync="isShowBigPic" class='bigPic'>
	      		<img :src="bigPicUrl" alt="" class='vh50' />
	    </el-dialog>
    </div>
</template>
<script>
  import * as Common from 'src/assets/js/common';
  const FUNC = Common.Func
  const URL = Common.Const.url
  const DELETE = Common.Func.axios.delete
export default {
    data(){
        return{
            table:null,
            isShowBigPic:false,
            bigPicUrl:'',
            ResourceIds:'',
            imgUrls:'',
            rules: {         
	          ResourceId: [{
	            required: true,
	            message: '请上传图片',
	            trigger: 'blur'
	          }]
	        },
            formItems: {
	          //图片上传
	          uploadUrl: URL.UPLOADRESOURCE, //上传资源url
	          deleteUrl: URL.DELETERESOURCE, //删除资源url
	          imgLists: [],
	          ResourceId: ''
	        }
        }
    },
    computed:{
		AccessToken() {
        return eosCommon.storage.get("AccessToken");
      },
      uploadData() {
        return {
          "AccessToken": this.AccessToken,
          "ResourceType": "0",
          "Title": "合同附件",
          "Description": "合同附件"
        }
      }
    },
    updated(){
    	//vm.addEditUpBindValue();
    },
    methods:{
    	 updateImg(res, file, fileList) {
	        //当提交一张图片后隐藏上传按钮
	        let vm = this;
	        if(fileList.length >= 1) vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none')
	        vm.formItems.ResourceId = res.Data[0].ResourceId;
	      },
	      updateDeleteImg(res, fileList) {
	        //当删除图片后重新显示上传按钮
	        let vm = this
	        vm.formItems.ResourceId = '';
	        if(fileList.length < 2) vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', '')
	        vm.deleteRes(vm.formItems.ResourceId)
	      },
       	imgUpdateUploadShowAndHide(ref = 'OriginalPhotosUpload', string = '') {
	        this.$nextTick(() => {
	          let el = this.$refs[ref].$el.childNodes[1]
	          el.style.display = string;
	        })
	      },
	      deleteRes(resId) {
	        let url = this.formItems.deleteUrl
	        let data = {
	          "AccessToken": FUNC.storage.get("AccessToken"),
	          "Parameters": {
	            "ResourceId": resId,
	            "ResourceType": "2"
	          }
	        }
	        // 删除服务器对应资源
	        return DELETE(url, data)
	      },
        search(){
            this.table.ajax.reload()
        },
        showBigPic(url) {
	      this.isShowBigPic = true;
	      this.bigPicUrl = url;	      
	    },
	    addEditBindValue(data){
	    	let vm=this;
	    	 eosCommon.resetFrom();
            if (data == null) {
                $('#txtIndustryName').val("");
                $('#txtDescription').val("");            
                $("input[type='radio'][name='radioIsActive'][value='1']").prop("checked", "checked");
            }
            else {
                $('#txtIndustryName').val(data[0].IndustryName);
                $('#txtDescription').val(data[0].Description);
                $("input[type='radio'][name='radioIsActive'][value='" + data[0].IsActive + "']").prop("checked", "checked");
            }    
	    }
    },
    mounted: function() {
        var table;
        var IndustryId;
        var btn = '';
        let vm = this
          $(document).ready(function () {
            verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
            $('#txtQueryIndustryName').bind('keypress',function(event){
                if(event.keyCode == "13"){
                    table.ajax.reload();
                }
            });
            table = $('#exampleIn').DataTable({
                pagingType: "full_numbers",
                processing: true,
                deferRender: true,

                dom: "Bfrtip",
                buttons: [],
                responsive: !0,
                serverSide: true,

                ajax: function (data, callback, settings) {
                    var param = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "PageSize": data.length,
                        "PageIndex": (data.start / data.length) + 1,
                        "Parameters": {
                            "IndustryName": $('#txtQueryIndustryName').val().trim()
                        }
                    };
                    var url = eosCommon.PLATFORM_API + "api/base/queryindustry";
                    eosCommon.eosAjax(url, "GET", param, "json", function (result) {
                        if (eosCommon.checkCode(result.State, result.Message)) {
                            var returnData = {};

                            if (result.Data == "") {
                                returnData.draw = data.draw;
                                returnData.recordsTotal = 0;
                                returnData.recordsFiltered = 0;
                                returnData.data = [];
                            }
                            else {
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
                    { data: "IndustryName" },
                    { data: "Description" },
                    { data: "DefaultLogoUrl" },
                    { data: "IsActive" },
                    { defaultContent: "<span class='OperatorBtnEdit OperatorEdit' data-toggle='modal' data-target='#modal-cleos' data='2' title='编辑信息'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除信息'><i class='fa fa-trash-o'></i></span>" }
                ],
                "columnDefs": [
                	{
                        "targets": [3],
                        "render": function (data) {
                            var html = '-';

                            if (data != "") {
                               html=`
	                            <div class="logoWrap">
	                            	<img style="border-radius:5px;width:75px;" src="${data}"/>
		                            <span  class="operateMask">
				                    	<i class="fa fa-eye currEye" title='查看大图'></i>
				                  	</span>
	                            </div>                           
	                            `;
                            }
                            return html
                        }
                    },
                    {
                        "targets": [4],
                        "render": function (data) {
                            var html = '';
                            if (data == 0) {
                                html = "否"
                            }
                            else if (data == 1) {
                                html = "是"
                            }
                            return html
                        }
                    }
                ]
            });

            table.on('draw.dt', function () {
                table.column(0, {
                    search: 'applied',
                    order: 'applied'
                }).nodes().each(function (cell, i) {
                    i = i + 1;
                    var page = table.page.info();
                    var pageno = page.page;
                    var length = page.length;
                    var columnIndex = (i + pageno * length);
                    cell.innerHTML = columnIndex;
                });
            });
            vm.table = table

            $('#exampleIn tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }
            });
			$('#exampleIn tbody').on('click', 'i.currEye', function (event) {
				event.stopPropagation();
                var data = table.rows($(this).parents('tr')).data();
                  vm.showBigPic(data[0].DefaultLogoUrl)

            });
            $('#exampleIn tbody').on('click', 'span', function () {
                var data = table.rows($(this).parents('tr')).data();
                var isNum = $(this).attr("data");
                if (isNum == "2") {
                    //编辑信息赋值 函数
                  	vm.formItems.ResourceId='';
                    vm.formItems.imgLists=[];
                    $('#ModuleTitle').attr("data", "2");
                    $('#ModuleTitle').text("修改行业");
                    $('#btnSave').html("<i class='fa fa-save m-r-5'></i>保存");
                    $('#modal_body1').show();                  
                   	 IndustryId = data[0].IndustryId;                     
                     if(data[0].DefaultLogoUrl&&data[0].DefaultLogo){
                     	vm.formItems.ResourceId=data[0].DefaultLogo;
	                     vm.formItems.imgLists.push({
	                     	 name: '',
	          				url: data[0].DefaultLogoUrl
	                     });
                     	vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none')
                     }
                    vm.addEditBindValue(data);
                }
                else if (isNum == "3") {
                    //权限设置赋值 函数
                    IndustryId = data[0].IndustryId;
                    vdialog({
                        type: 'confirm',
                        title: '提示',
                        content: eosCommon.DELETE_MSG_ASK,
                        ok: function () { delRequest(); },
                        cancel: true,
                        modal: true
                    });
                }

            });
            $('#btnInsert').click(function () {
                $('#ModuleTitle').attr("data", "1");
                $('#ModuleTitle').text("新增行业");
                $('#btnSave').html("<i class='fa fa-save m-r-5'></i>保存");
                $('#modal_body1').show();
                vm.formItems.ResourceId='';
                 vm.formItems.imgLists=[];
              	//vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'none')
                vm.addEditBindValue(null);
            });

            /*$('#btnQuery').click(function () {
                table.ajax.reload();
            });*/

            $('#btnSave').click(function () {
                var isNum = $("#ModuleTitle").attr("data");
                if (isNum == "1") {
					
                    if (!verifyCheck._click("verifyCheck")) {
                        return false;
                    } else {
                    	vm.$refs['formItems'].validate((valid) => {
				          if(valid) {
				            btn = $(".loading_btn").button('loading');
                        	addRequest();
				          } else {
				            return false;
				          }
				        });
                       
                    }

                }
                else if (isNum == "2") {
                    if (!verifyCheck._click("verifyCheck")) {
                        return false;
                    } else {
                    	vm.$refs['formItems'].validate((valid) => {
				          if(valid) {
				            btn = $(".loading_btn").button('loading');
                        	editRequest();
				          } else {
				            return false;
				          }
				        });
                       
                    }
                }
            });

          });
        //添加修改绑定初始值
//      function addEditBindValue(data) {
//          eosCommon.resetFrom();
//          if (data == null) {
//              $('#txtIndustryName').val("");
//              $('#txtDescription').val("");
//              vm.ResourceIds='';
//              vm.imgUrls='';
//              vm.$nextTick(()=>{
//              	vm.addEditUpBindValue();
//              })
//              
//              $("input[type='radio'][name='radioIsActive'][value='1']").prop("checked", "checked");
//          }
//          else {
//              $('#txtIndustryName').val(data[0].IndustryName);
//              $('#txtDescription').val(data[0].Description);
//              $("input[type='radio'][name='radioIsActive'][value='" + data[0].IsActive + "']").prop("checked", "checked");
//          }
//      }
        //修改
        function editRequest() {
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "IndustryId": IndustryId,
                    "IndustryName": $('#txtIndustryName').val(),
                    "Description": $('#txtDescription').val(),
                    "IsActive": $('input:radio[name="radioIsActive"]:checked').val(),
                    "DefaultLogo":vm.formItems.ResourceId
                }
            };

            var url = eosCommon.PLATFORM_API + "api/base/updateindustry";
            eosCommon.eosAjax(url, "PUT", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                    table.ajax.reload();
                    $('#modal-cleos').modal('hide');
                    $(".loading_btn").button('reset');
                    vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'block')
                }
            });
        }
        //添加
        function addRequest() {
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "IndustryName": $('#txtIndustryName').val(),
                    "Description": $('#txtDescription').val(),
                    "IsActive": $('input:radio[name="radioIsActive"]:checked').val(),
                    "DefaultLogo":vm.formItems.ResourceId
                }
            };
            //var aa = JSON.stringify(param);
            //alert(aa);

            var url = eosCommon.PLATFORM_API + "api/base/insertindustry";
            eosCommon.eosAjax(url, "POST", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                    table.ajax.reload();
                    $('#modal-cleos').modal('hide');
                    $(".loading_btn").button('reset');
                    vm.imgUpdateUploadShowAndHide('OriginalPhotosUpload', 'block')
                }
            });
        }
        //删除
        function delRequest() {
            var param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                    "IndustryId": IndustryId
                }
            };

            var url = eosCommon.PLATFORM_API + "api/base/deleteindustry";
            eosCommon.eosAjax(url, "DELETE", param, "json", function (result) {
                if (eosCommon.checkCode(result.State, result.Message)) {
                    eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                    table.ajax.reload();
                }
            });

        }
    }
}
</script>

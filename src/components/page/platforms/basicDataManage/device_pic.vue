<template>
    <div class="device_pic">  
        <div class="row">
        	<div class="col-sm-12">
        		<!-- 头部左边开始-->
        		<div class="header-left">
        			<div id="brandTree" class="eosOrg bg-white"></div>
        		</div>
        		<!-- 头部左边结束-->
        		<!-- 头部右边开始-->
        		<div class="header-right">
        			<div id="main_box" class="col-sm-12 col-xs-12">
        				<div class="content-main">
        					<div id="divDataTableView" class="card-box table-responsive">
        						<div class="row">
        							<div class="col-sm-6 col-md-4 col-lg-6">
        								<div id="top_title" class="size20 font-bold"><span></span>-图库</div>
        							</div>
        						</div>
        						<hr class="divider mb-10 mt-10">
        						<div class="row pl-10">
        							<span class="OrgTopAligin w-85 OperatorInsert">
        								<button id="addImg" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-cleos">
        									新增图片
        								</button>
        							</span>
        							<span class="OperatorSearch">
        								<span class="OrgTopAligin w-128">
        									<select id="BigCategorySelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98" data-size="10">
        								</select>
        							</span>
        							<span class="OrgTopAligin w-128">
        								<select id="SmallCategorySelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98" data-size="10">
        									<option value="">筛选小类别</option>
        								</select>
        							</span>
        							<span class="OrgTopAligin w-128">
        								<select id="ProductTypeSelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98" data-size="10">
        									<option value="">筛选型号</option>
        								</select>
        							</span>
        							<span class="OrgTopAligin w-80">
        								<button id="btnQuery" type="button" class="btn btn-default" data-toggle="" data-target="">
        									<i class="fa fa-search m-r-5"></i>查找
        								</button>
        							</span>
        							</span>
        						</div>
        						<hr class="divider mt-10">
        						<div class="row">
        							<input id="BrandId" type="hidden" value=""/>
        							<div id="photo_albums" class="clearfix"></div>
        						</div>
        					</div>
        				</div>
        				<div id="dervice_pic_view" class="card-box table-responsive" style="display: none;">
        					<input id="data_box" type="hidden"/>
        					<div class="clearfix">
        						<div class="col-sm-12 p-b-10">
        							<label id="dervice_pic_title" class="size20 font-bold"></label>
        							<button id="btnReturn" type="button" class="btn btn-white pull-right">
        								<i class="fa fa-mail-reply-all m-r-5"></i>返回
        							</button>
        						</div>
        					</div>
        					<div class="eos_uploader_img ">
        						<div class="statusBar" style="border-top: none;border-bottom: 1px solid #dadada;display: block;">
        							<div class="btns clearfix">
        								<div class="webuploader-pick addImgBtn OperatorInsert" data-toggle="modal" data-target="#modal-cleos">继续新增图片</div>
        							</div>
        						</div>
        						<div class="queueList">
        							<div class="placeholder" style="display: none;">
        								<div class="webuploader-pick addImgBtn" data-toggle="modal" data-target="#modal-cleos">新增相册图片</div>
        							</div>
        							<div id="albums_item_list" class="clearfix" style="display: block">

        							</div>
        						</div>
        					</div>
        				</div>
        			</div>
        		</div>
        		<!-- 头部右边结束1-->
        	</div>
        </div>
        <div id="modal-cleos" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        	<div class="modal-content">
        		<div class="modal-header">
        			<button type="button" class="win-close" data-dismiss="modal">×</button>
        			<button id="btnSave" type="button" class="sava" data-dismiss="modal" aria-hidden="true"></button>
        			<h4 id="ModuleTitle" class="modal-title">上传设备图片</h4>
        		</div>
        		<div id="verifyCheck">
        			<div class="modal-body p-20">
        				<div class="row mb-20">
        					<div class="col-md-12">
        						<div class="form-group">
        							<span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>品牌名称：</span>
        							<div class="col-sm-9 text-muted pull-right">
        								<select id="BandSelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
        								</select>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div class="row mb-20">
        					<div class="col-md-12">
        						<div class="form-group">
        							<span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>设备大类：</span>
        							<div class="col-sm-9 text-muted pull-right">
        								<select id="imgBigCategorySelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
        								</select>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div class="row mb-20">
        					<div class="col-md-12">
        						<div class="form-group">
        							<span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>设备小类：</span>
        							<div class="col-sm-9 text-muted pull-right">
        								<select id="imgSmallCategorySelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
        								</select>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div class="row mb-20">
        					<div class="col-md-12">
        						<div class="form-group">
        							<span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>设备型号：</span>
        							<div class="col-sm-9 text-muted pull-right">
        								<select id="imgProductTypeSelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
        								</select>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div class="row mb-10">
        					<div class="col-md-12">
        						<div class="form-group">
        							<span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>图片标题：</span>
        							<div class="col-sm-9 text-muted pull-right">
        								<input id="img_title" maxlength="20" class="form-control required"  data-valid="isNonEmpty||between:3-20" data-error="图片标题不能为空||图片标题长度3-20位" placeholder="图片标题" type="text">
        								<span class="ie8 ion-close-circled close hide text-danger font-16 m-t-3"></span>
        								<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
        								<label class="focus valid"></label>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div class="row mb-10">
        					<div class="col-md-12">
        						<div class="form-group">
        							<span class="col-sm-3 control-label text-right pt-5"><em class="ak_required_em">*</em>图片描述：</span>
        							<div class="col-sm-9 text-muted pull-right">
        								<textarea id="img_des" maxlength="100" required class="form-control required" placeholder="图片描述" data-valid="isNonEmpty||between:2-100" data-error="图片描述不能为空||图片描述2-100字"></textarea>
        								<span class="ie8 ion-close-circled close hide text-danger font-16 m-t-3"></span>
        								<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
        								<label class="focus valid"></label>
        							</div>
        						</div>
        					</div>
        				</div>
        				<div class="row mb-10">
        					<div class="col-md-12">
        						<div class="form-group">
        							<span class="col-sm-3 control-label text-right pt-5">上传图片：</span>
        							<div id="imgBox" class="col-sm-9 text-muted pull-right">
        							</div>
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
import "../../../../../static/plugins/lazyload/jquery.lazyload.js";
export default {
    mounted: function() {
    	
        $(function (){
        	 eosCommon.eosOperators(eosCommon.eosOperDataHandle()); 
            var updaImgType = '',
                brandId = '',
                brandName = '';
            eosCommon.eosAjax(
                eosCommon.COMMON_API+'api/common/brand',
                "Get",
                {
                    'AccessToken': eosCommon.storage.get('AccessToken')},
                
                "json",
                function (result){
                    if (eosCommon.checkCode(result.State, result.Message)){
                        var CleosNodes = [{ id: 1, pId: 0, name: "品牌", open: true,icon:''}];
                        var num = -1;
                        for(var i = 0;i<result.Data.length;i++){
                            var temp = {};
                            for(var key in result.Data[i]){
                                temp.id = result.Data[i]['BrandId'];
                                temp.pid = 1;
                                temp.name = result.Data[i]['BrandName'];
                                temp.iconOpen = result.Data[i]['BrandLogo'];
                                temp.icon = result.Data[i]['BrandLogo'];
                            }
                            CleosNodes.push(temp)
                        }
                        $.fn.zTree.init($("#brandTree"), brandPicSetting, CleosNodes,"BrandPicMenu");
                        var treeObj = $.fn.zTree.getZTreeObj("brandTree");
                        var nodes = treeObj.getNodes();
                        if (nodes.length>0) {
                            brandId = nodes[1].id;
                            brandName = nodes[1].name;
                            treeObj.selectNode(nodes[1]);
                            ImageGallery(nodes[1].id);
                            queutSelect(nodes[1].id);
                            $("#BrandId").val(nodes[1].id);
                            $("#top_title span").html(nodes[1].name);
                        }
                        $("#brandTree .button.ico_close").eq(0).next('span').css({'text-align':'center',"height":"50px",'font-size':'20px',"width":"100%","letterSpacing":"10px","borderBottom":"1px solid #eee"}).parent().css("padding","0")
                        $("#brandTree .button.ico_close").eq(0).remove();
                    }
                }
            )
            var brandPicSetting = {
                view: {
                    selectedMulti: false,
                    showIcon: true,
                    dblClickExpand: false
                },
                edit: {
                    enable: true,
                    showRemoveBtn: false,
                    showRenameBtn: false
                },
                data: {
                    keep: {
                        parent:true,
                        leaf:true
                    },
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    beforeDrag: beforeDrag,
                    beforeClick: function(treeId, treeNode) {
                        if(treeNode.id == 1){
                            return false;
                        }else{
                            ImageGallery(treeNode.id);
                            $("#BrandId").val(treeNode.id);
                            $("#top_title span").html(treeNode.name);
                            $("#divDataTableView").show();
                            $("#dervice_pic_view").hide();
                            brandId = treeNode.id;
                            brandName = treeNode.name;
                            queutSelect(treeNode.id);
                        }
                    }
                }
            };
            var CleosNodes =[];
            function beforeDrag(treeId, treeNodes) {
                return false;
            }
            function ImageGallery(brandId){
                eosCommon.eosAjax(
                    eosCommon.PLATFORM_API+'api/base/ImageGallery',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                             "BrandId":brandId,
                             "BigCategoryId":"",
                             "SmallCategoryId":"",
                             "ProductTypeId":""
                        }
                    },
                    "json",
                    function (result){
                        if (eosCommon.checkCode(result.State, result.Message)){
                            $("#photo_albums").empty();
                            if(result.Data != ''){
                                for(var i = 0; i< result.Data.Result.length;i++){
                                    $("#photo_albums").append(
                                        '<div data-ProductTypeId="'+ result.Data.Result[i]["ProductTypeId"] +'" data-Brand="'+ result.Data.Result[i]["BrandId"] +'$'+ result.Data.Result[i]["BrandName"] +'" data-BigCategory="'+ result.Data.Result[i]["BigCategoryId"] +'$'+ result.Data.Result[i]["BigCategoryName"] +'" data-BigCategoryName="'+ result.Data.Result[i]["BigCategoryName"] +'" data-SmallCategory="'+ result.Data.Result[i]["SmallCategoryId"] +'$'+ result.Data.Result[i]["SmallCategoryName"] +'" data-SmallCategoryName="'+ result.Data.Result[i]["SmallCategoryName"] +'" data-ProductType="'+ result.Data.Result[i]["ProductTypeId"] +'$'+ result.Data.Result[i]["ProductTypeName"] +'" data-ProductTypeName="'+ result.Data.Result[i]["ProductTypeName"] +'" class="photo_albums_list blog-box-one">'+
                                            '<div class="img_box">'+
                                                '<img class="lazy img-responsive" src="../../../../static/images/brandLoading.gif" data-original='+ (result.Data.Result[i]["GalleryCover"] != ""? result.Data.Result[i]["GalleryCover"]:"../../../../static/images/brandLoading.gif") +' />'+
                                            '</div>'+
                                            '<div class="text-muted font-18 albums_item_des" style="color:#1abc9c;">'+result.Data.Result[i]['BrandName']+'（'+result.Data.Result[i]['Totals']+'）</div>'+
                                            '<div class="text-muted albums_item_des">类别：'+ result.Data.Result[i]['BigCategoryName'] +' / '+ result.Data.Result[i]['SmallCategoryName'] +'</div>'+
                                            '<div class="text-muted albums_item_des">型号：'+ result.Data.Result[i]['ProductTypeName'] +'</div>'+
                                        '</div>'
                                    );
                                }
                                $('#photo_albums .lazy').lazyload({container: $("#photo_albums")});
                                albumsResize();
                            }else{
                                $("#photo_albums").append('<div class="dataTables_wrapper no-footer"><div class="dataTables_processing" style="background-image: none;text-indent: 0;">暂无数据</div></div>')
                            }
                        }
                    }
                )
            }
            function queutSelect(brandId){
                $("#BigCategorySelect").empty().append('<option value="">设备大类</option>');
                $("#SmallCategorySelect").empty().append('<option value="">设备小类</option>');
                $("#ProductTypeSelect").empty().append('<option value="">设备型号</option>');
                eosCommon.eosAjax(
                    eosCommon.COMMON_API+'api/common/EquipmentClassLinkage',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                             "BrandId":brandId,
                             "EquipmentClassId":""
                        }
                    },
                    "json",
                    function (result){
                        if (eosCommon.checkCode(result.State, result.Message)){
                            if(result.Data != ''){
                                for(var i = 0; i< result.Data.length;i++){
                                    $("#BigCategorySelect").append("<option value="+ result.Data[i]['EquipmentClassId'] +">"+ result.Data[i]['EquipmentClassName'] +"</option>");
                                }
                            }
                            $("#BigCategorySelect,#SmallCategorySelect,#ProductTypeSelect").selectpicker('refresh');
                        }

                    }
                );
            };
            $("#BigCategorySelect").change(function (){
                eosCommon.eosAjax(
                    eosCommon.COMMON_API+'api/common/EquipmentClassLinkage',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                             "BrandId":brandId,
                             "EquipmentClassId":$("#BigCategorySelect").selectpicker('val')
                        }
                    },
                    "json",
                    function (result){
                        if (eosCommon.checkCode(result.State, result.Message)){
                            $("#SmallCategorySelect").empty().append('<option value="">筛选小类别</option>');
                            if(result.Data != ''){
                                for(var i = 0; i< result.Data.length;i++){
                                    $("#SmallCategorySelect").append("<option value="+ result.Data[i]['EquipmentClassId'] +">"+ result.Data[i]['EquipmentClassName'] +"</option>");
                                }
                            }
                            $("#SmallCategorySelect").selectpicker('refresh');
                        }

                    }
                );
            })
            $("#SmallCategorySelect").change(function (){
                eosCommon.eosAjax(
                    eosCommon.PLATFORM_API+'api/base/ImageGallery',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                             "BrandId":brandId,
                             "BigCategoryId":$("#BigCategorySelect").selectpicker('val'),
                             "SmallCategoryId":$("#SmallCategorySelect").selectpicker('val'),
                             "ProductTypeId":""
                        }
                    },
                    "json",
                    function (result){
                        if (eosCommon.checkCode(result.State, result.Message)){
                            $("#ProductTypeSelect").empty().append('<option value="">筛选型号</option>');
                            if(result.Data != ''){
                                for(var i = 0; i< result.Data.Result.length;i++){
                                    $("#ProductTypeSelect").append("<option value="+ result.Data.Result[i]['ProductTypeId'] +">"+ result.Data.Result[i]['ProductTypeName'] +"</option>");
                                }
                            }
                            $("#ProductTypeSelect").selectpicker('refresh');
                        }

                    }
                );
            })
            $("#imgBigCategorySelect").change(function (){
                eosCommon.eosAjax(
                    eosCommon.COMMON_API+'api/common/EquipmentClassLinkage',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                             "BrandId":brandId,
                             "EquipmentClassId":$("#imgBigCategorySelect").selectpicker('val')
                        }
                    },
                    "json",
                    function (result){
                        if (eosCommon.checkCode(result.State, result.Message)){
                            $("#imgSmallCategorySelect").empty();
                            if(result.Data != ''){
                                for(var i = 0; i< result.Data.length;i++){
                                    $("#imgSmallCategorySelect").append("<option value="+ result.Data[i]['EquipmentClassId'] +">"+ result.Data[i]['EquipmentClassName'] +"</option>");
                                }
                                eosCommon.eosAjax(
                                    eosCommon.PLATFORM_API+'api/base/ImageGallery',
                                    "Get",
                                    {
                                        "AccessToken":eosCommon.storage.get('AccessToken'),
                                        "PageIndex":0,
                                        "PageSize":0,
                                        "Parameters":{
                                             "BrandId":brandId,
                                             "BigCategoryId":$("#imgBigCategorySelect").selectpicker('val'),
                                             "SmallCategoryId":$("#imgSmallCategorySelect").selectpicker('val'),
                                             "ProductTypeId":""
                                        }
                                    },
                                    "json",
                                    function (result){
                                        if (eosCommon.checkCode(result.State, result.Message)){
                                            $("#imgProductTypeSelect").empty();
                                            if(result.Data != ''){
                                                for(var i = 0; i< result.Data.Result.length;i++){
                                                    $("#imgProductTypeSelect").append("<option value="+ result.Data.Result[i]['ProductTypeId'] +">"+ result.Data.Result[i]['ProductTypeName'] +"</option>");
                                                }
                                            }
                                            $("#imgProductTypeSelect").selectpicker('refresh');
                                        }

                                    }
                                );
                            }
                            $("#imgSmallCategorySelect").selectpicker('refresh');
                        }

                    }
                );
            })
            $("#imgSmallCategorySelect").change(function (){
                if($("#imgSmallCategorySelect").selectpicker('val') == ''){
                    alert(1)
                }
                eosCommon.eosAjax(
                    eosCommon.PLATFORM_API+'api/base/ImageGallery',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                             "BrandId":brandId,
                             "BigCategoryId":$("#imgBigCategorySelect").selectpicker('val'),
                             "SmallCategoryId":$("#imgSmallCategorySelect").selectpicker('val'),
                             "ProductTypeId":""
                        }
                    },
                    "json",
                    function (result){
                        if (eosCommon.checkCode(result.State, result.Message)){
                            $("#imgProductTypeSelect").empty();
                            if(result.Data != ''){
                                for(var i = 0; i< result.Data.Result.length;i++){
                                    $("#imgProductTypeSelect").append("<option value="+ result.Data.Result[i]['ProductTypeId'] +">"+ result.Data.Result[i]['ProductTypeName'] +"</option>");
                                }
                            }
                            $("#imgProductTypeSelect").selectpicker('refresh');
                        }

                    }
                );
            })
            $("#btnQuery").click(function (){
                eosCommon.eosAjax(
                    eosCommon.PLATFORM_API+'api/base/ImageGallery',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                             "BrandId":$("#BrandId").val(),
                             "BigCategoryId":$('#BigCategorySelect').selectpicker('val',$('#BigCategorySelect').attr('value')),
                             "SmallCategoryId":$('#SmallCategorySelect').selectpicker('val',$('#SmallCategorySelect').attr('value')),
                             "ProductTypeId":$('#ProductTypeSelect').selectpicker('val',$('#ProductTypeSelect').attr('value'))
                        }
                    },
                    "json",
                    function (result){
                        if (eosCommon.checkCode(result.State, result.Message)){
                            $("#photo_albums").empty();
                            for(var i = 0; i< result.Data.Result.length;i++){
                                $("#photo_albums").append(
                                    '<div data-ProductTypeId="'+ result.Data.Result[i]["ProductTypeId"] +'" data-Brand="'+ result.Data.Result[i]["BrandId"] +'$'+ result.Data.Result[i]["BrandName"] +'" data-BigCategory="'+ result.Data.Result[i]["BigCategoryId"] +'$'+ result.Data.Result[i]["BigCategoryName"] +'" data-SmallCategory="'+ result.Data.Result[i]["SmallCategoryId"] +'$'+ result.Data.Result[i]["SmallCategoryName"] +'" data-ProductType="'+ result.Data.Result[i]["ProductTypeId"] +'$'+ result.Data.Result[i]["ProductTypeName"] +'" class="photo_albums_list blog-box-one">'+
                                        '<div class="img_box">'+
                                            '<img class="lazy img-responsive" src="../../../../static/images/default_image_device.jpg" data-original='+ (result.Data.Result[i]["GalleryCover"] != ""? result.Data.Result[i]["GalleryCover"]:"../../assets/images/default_image_device.jpg") +' class="img-responsive"/>'+
                                        '</div>'+
                                        '<p class="text-muted m-b-5 mt-5  font-18"><a class="text-custom text_title" href="Javascript:;">'+result.Data.Result[i]['BrandName']+'（'+result.Data.Result[i]['Totals']+'）</a></p>'+
                                        '<p class="text-muted m-b-0 mt-5">类别：'+ result.Data.Result[i]['BigCategoryName'] +' / '+ result.Data.Result[i]['SmallCategoryName'] +'</p>'+
                                        '<p class="text-muted m-b-0 mt-5">型号：'+ result.Data.Result[i]['ProductTypeName'] +'</p>'+
                                    '</div>'
                                );
                            }
                            $('#photo_albums .lazy').lazyload();
                            albumsResize();
                        }
                    }
                )
            })

            $("#addImg").click(function (){
                updaImgType = 'addImg';
                $("#imgBigCategorySelect,#imgSmallCategorySelect,#imgProductTypeSelect").empty().selectpicker('refresh');
                var _$modal = $('#modal-cleos');
                _$modal.css('display', 'block');
                $("#BandSelect").append("<option value="+ brandId +">"+ brandName +"</option>").selectpicker('val',brandId).attr('disabled','').selectpicker('refresh');
                eosCommon.eosAjax(
                    eosCommon.COMMON_API+'api/common/EquipmentClassLinkage',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                             "BrandId":$("#BandSelect").selectpicker('val'),
                             "EquipmentClassId":""
                        }
                    },
                    "json",
                    function (result){
                        if (eosCommon.checkCode(result.State, result.Message)){
                            $("#imgBigCategorySelect,#imgSmallCategorySelect,#imgProductTypeSelect").empty();
                            if(result.Data != ''){
                                for(var i = 0; i< result.Data.length;i++){
                                    $("#imgBigCategorySelect").append("<option value="+ result.Data[i]['EquipmentClassId'] +">"+ result.Data[i]['EquipmentClassName'] +"</option>").selectpicker('refresh');
                                }
                                eosCommon.eosAjax(
                                    eosCommon.COMMON_API+'api/common/EquipmentClassLinkage',
                                    "Get",
                                    {
                                        "AccessToken":eosCommon.storage.get('AccessToken'),
                                        "PageIndex":0,
                                        "PageSize":0,
                                        "Parameters":{
                                             "BrandId": $("#BandSelect").selectpicker('val'),
                                             "EquipmentClassId": $("#imgBigCategorySelect").selectpicker('val')
                                        }
                                    },
                                    "json",
                                    function (result){
                                        if (eosCommon.checkCode(result.State, result.Message)){
                                            if(result.Data != ''){
                                                for(var i = 0; i< result.Data.length;i++){
                                                    $("#imgSmallCategorySelect").append("<option value="+ result.Data[i]['EquipmentClassId'] +">"+ result.Data[i]['EquipmentClassName'] +"</option>").selectpicker('refresh');
                                                }
                                                eosCommon.eosAjax(
                                                    eosCommon.PLATFORM_API+'api/base/ImageGallery',
                                                    "Get",
                                                    {
                                                        "AccessToken":eosCommon.storage.get('AccessToken'),
                                                        "PageIndex":0,
                                                        "PageSize":0,
                                                        "Parameters":{
                                                             "BrandId":$("#BandSelect").selectpicker('val'),
                                                             "BigCategoryId":$("#imgBigCategorySelect").selectpicker('val'),
                                                             "SmallCategoryId":$("#imgSmallCategorySelect").selectpicker('val'),
                                                             "ProductTypeId":""
                                                        }
                                                    },
                                                    "json",
                                                    function (result){
                                                        if (eosCommon.checkCode(result.State, result.Message)){
                                                            if(result.Data != ''){
                                                                for(var i = 0; i< result.Data.Result.length;i++){
                                                                    $("#imgProductTypeSelect").append("<option value="+ result.Data.Result[i]['ProductTypeId'] +">"+ result.Data.Result[i]['ProductTypeName'] +"</option>").selectpicker('refresh');
                                                                }
                                                            }
                                                        }

                                                    }
                                                );
                                            }
                                        }

                                    }
                                );
                            }
                        }

                    }
                );
                $("#imgBox").html(
                    '<div class="uploader_img1 eos_uploader_img">'+
                        '<div class="queueList">'+
                            '<div id="dndArea1" class="placeholder">'+
                                '<div id="filePickerImg1">点击选择图片</div>'+
                            '</div>'+
                            '<ul class="filelist clearfix"></ul>'+
                        '</div>'+
                        '<div class="statusBar" style="display:none;">'+
                            '<div class="btns clearfix">'+
                                '<div class="uploadBtn">上传图片并保存信息</div>'+
                            '</div>'+
                            '<div class="info"></div>'+
                        '</div>'+
                    '</div>'
                );
                eosUploaderImg({
                    'uploaderObj':'uploaderImg1',
                    'uploaderBox':'.uploader_img1',
                    'uploaderList':'.queueList',
                    'initBtn':'#filePickerImg1',
                    'continueBtn':'#continueImgBtn1',
                    'serverUrl':eosCommon.RESOURCES_API+'api/resource/upload',
                    'data':{
                                "AccessToken": eosCommon.storage.get('AccessToken'),
                                "ResourceType": "1",
                                "Title": '',
                                "Description": '',
                                "Brand":'',
                                "BigCategory":"",
                                "SmallCategory":"",
                                "ProductType":""
                            },
                    'fileNumLimit':1,
                    'fileSingleSizeLimit':3 * 1024 * 1024,
                    'succ': function (resporn){
                        $(".uploader_img1 .btns").hide()
                    },
                    'fileBeforeSend': function (obj, data, headers){
                        $("#data_box").attr('Brand',$("#BandSelect").selectpicker('val'));
                        $("#data_box").attr('BigCategory',$("#imgBigCategorySelect").selectpicker('val'));
                        $("#data_box").attr('SmallCategory',$("#imgSmallCategorySelect").selectpicker('val'));
                        $("#data_box").attr('ProductType',$("#imgProductTypeSelect").selectpicker('val'));
                        $("#data_box").attr('ProductTypeId',$("#imgProductTypeSelect").selectpicker('val'));
                        data.Title = $("#img_title").val();
                        data.Description = $("#img_des").val();
                        data.Brand = $("#data_box").attr('Brand');
                        data.BigCategory = $("#data_box").attr('BigCategory');
                        data.SmallCategory = $("#data_box").attr('SmallCategory');
                        data.ProductType = $("#data_box").attr('ProductType');
                    },
                    'del': function (){

                    }
                })
            })
            $(".addImgBtn").click(function (){
                updaImgType = 'addImgBtn';
                var _$modal = $('#modal-cleos');
                _$modal.css('display', 'block');
                $("#imgBigCategorySelect,#imgSmallCategorySelect,#imgProductTypeSelect").empty();
                $("#BandSelect").empty().append("<option value="+ brandId +">"+ brandName +"</option>").selectpicker('refresh');
                $("#imgBigCategorySelect").empty().append("<option value="+ $("#data_box").attr("bigcategory") +">"+ $("#data_box").attr("bigcategoryname") +"</option>").selectpicker('refresh');
                $("#imgSmallCategorySelect").empty().append("<option value="+ $("#data_box").attr("smallcategory") +">"+ $("#data_box").attr("smallcategoryname") +"</option>").selectpicker('refresh');
                $("#imgProductTypeSelect").empty().append("<option value="+ $("#data_box").attr("producttype") +">"+ $("#data_box").attr("producttypename") +"</option>").selectpicker('refresh');

                $("#imgBox").html(
                    '<div class="uploader_img1 eos_uploader_img">'+
                        '<div class="queueList">'+
                            '<div id="dndArea1" class="placeholder">'+
                                '<div id="filePickerImg1">点击选择图片</div>'+
                            '</div>'+
                            '<ul class="filelist clearfix"></ul>'+
                        '</div>'+
                        '<div class="statusBar" style="display:none;">'+
                            '<div class="btns clearfix">'+
                                '<div class="uploadBtn">上传图片并保存信息</div>'+
                            '</div>'+
                            '<div class="info"></div>'+
                        '</div>'+
                    '</div>'
                );
                eosUploaderImg({
                    'uploaderObj':'uploaderImg1',
                    'uploaderBox':'.uploader_img1',
                    'uploaderList':'.queueList',
                    'initBtn':'#filePickerImg1',
                    'continueBtn':'#continueImgBtn1',
                    'serverUrl':eosCommon.RESOURCES_API+'api/resource/upload',
                    'data':{
                                "AccessToken": eosCommon.storage.get('AccessToken'),
                                "ResourceType": "1",
                                "Title": '',
                                "Description": '',
                                "Brand":'',
                                "BigCategory":"",
                                "SmallCategory":"",
                                "ProductType":""
                            },
                    'fileNumLimit':1,
                    'fileSingleSizeLimit':3 * 1024 * 1024,
                    'succ': function (resporn){
                        $(".uploader_img1 .btns").hide()
                    },
                    'fileBeforeSend': function (obj, data, headers){
                        data.Title = $("#img_title").val();
                        data.Description = $("#img_des").val();
                        data.Brand = $("#data_box").attr('Brand');
                        data.BigCategory = $("#data_box").attr('BigCategory');
                        data.SmallCategory = $("#data_box").attr('SmallCategory');
                        data.ProductType = $("#data_box").attr('ProductType');
                    },
                    'del': function (){

                    }
                })
            })
            $("#photo_albums").on('click','.photo_albums_list', function (){
                var _this = $(this)
                $("#data_box").attr('Brand',$(this).attr('data-Brand'));
                $("#data_box").attr('BigCategory',$(this).attr('data-BigCategory'));
                $("#data_box").attr('BigCategoryName',$(this).attr('data-BigCategoryName'));
                $("#data_box").attr('SmallCategory',$(this).attr('data-SmallCategory'));
                $("#data_box").attr('SmallCategoryName',$(this).attr('data-SmallCategoryName'));
                $("#data_box").attr('ProductType',$(this).attr('data-ProductType'));
                $("#data_box").attr('ProductTypeName',$(this).attr('data-ProductTypeName'));
                $("#data_box").attr('ProductTypeId',$(this).attr('data-ProductTypeId'));
                eosCommon.eosAjax(
                    eosCommon.PLATFORM_API+'api/base/ImageGalleryDetail',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                            "ProductTypeId":$(this).attr('data-ProductTypeId')
                        }
                    },
                    "json",
                    function (result){
                        if (eosCommon.checkCode(result.State, result.Message)){
                            $("#albums_item_list").empty().append("<div class='viewer_box clearfix'></div>");
                            $("#dervice_pic_title").html(_this.attr("data-bigcategoryname")+' / '+_this.attr("data-smallcategoryname")+' / '+_this.attr("data-ProductTypeName"))
                            if(result.Data.Result == ''){
                                $(".eos_uploader_img").find(".statusBar").hide();
                                $("#albums_item_list").hide();
                                $(".eos_uploader_img").find(".placeholder").show();
                            }else{
                                $(".eos_uploader_img").find(".statusBar").show();
                                $("#albums_item_list").show();
                                $(".eos_uploader_img").find(".placeholder").hide();
                                for(var i = 0;i<result.Data.Result.length;i++){
                                    $("#albums_item_list .viewer_box").append(
                                        '<div class="albums_item_box cursor">'+
                                            '<div class="file-panel OperatorDel"><span class="del" data-resourceid="'+ result.Data.Result[i]["ResourceId"] +'">删除</span></div>'+
                                            '<div class="img_box"><img class="lazy img-responsive" src="../../../../static/images/default_image_device.jpg" data-original="'+ (result.Data.Result[i]["ImageUrl"] != ""? result.Data.Result[i]["ImageUrl"]:"../../assets/images/default_image.jpg") +'" /></div>'+
                                            '<div class="text-left">'+
                                                '<div class="albums_item_des text-muted">'+ result.Data.Result[i]['Description'] +'</div>'+
                                            '</div>'+
                                        '</div>'
                                    );
                                }
                                eosCommon.eosOperators(eosCommon.eosOperDataHandle()); 
                                $('#albums_item_list .viewer_box').viewer();
                                $('#albums_item_list .lazy').lazyload();
                                imgResize();
                            }
                            $("#divDataTableView").hide();
                            $("#dervice_pic_view").show();
                        }
                    }
                )
            })
            $('#btnReturn').click(function () {
                ImageGallery($("#BrandId").val());
                $("#divDataTableView").show();
                $("#dervice_pic_view").hide();
            });
            // 鼠标进入li 效果
            $("#albums_item_list").on( 'mouseenter','.albums_item_box', function() {
                $(this).find('.file-panel').stop().animate({height: 29});
            });
            $("#albums_item_list").on( 'mouseleave','.albums_item_box', function() {
                $(this).find('.file-panel').stop().animate({height: 0});
            });
            $("#albums_item_list").on('click','.del', function(){
                var _this = $(this)
                vdialog({
                    type: 'confirm',
                    title: '提示',
                    content: '你确定需要删除此图片？',
                    ok: function () {
                        eosCommon.eosAjax(
                            eosCommon.RESOURCES_API+'api/resource/delete',
                            "Delete",
                            {
                                "AccessToken":eosCommon.storage.get('AccessToken'),
                                "Parameters":{
                                     "ResourceId": _this.attr('data-resourceid'),
                                     "ResourceType":1
                                }
                            },
                            "json",
                            function (result){
                                if (eosCommon.checkCode(result.State, result.Message)){
                                    getImgList();
                                    eosCommon.eosMessage("success", eosCommon.DELETE_IMG_MSG);
                                }
                            }
                        )
                    },
                    cancel: true,
                    modal: true
                });

            })
            // 获取数据
            function getImgList(){
                    	
            	
                eosCommon.eosAjax(
                    eosCommon.PLATFORM_API+'api/base/ImageGalleryDetail',
                    "Get",
                    {
                        "AccessToken":eosCommon.storage.get('AccessToken'),
                        "PageIndex":0,
                        "PageSize":0,
                        "Parameters":{
                            "ProductTypeId":$("#data_box").attr('ProductTypeId')
                        }
                    },
                    "json",
                    function (result){
                    	
                        if (eosCommon.checkCode(result.State, result.Message)){
                            $("#albums_item_list").empty().append("<div class='viewer_box clearfix'></div>");
                            if(result.Data.Result == ''){
                                $(".eos_uploader_img").find(".statusBar").hide();
                                $("#albums_item_list").hide();
                                $(".eos_uploader_img").find(".placeholder").show();
                            }else{
                                $(".eos_uploader_img").find(".statusBar").show();
                                $("#albums_item_list").show();
                                $(".eos_uploader_img").find(".placeholder").hide();
                                for(var i = 0;i<result.Data.Result.length;i++){
                                    $("#albums_item_list").append(
                                        '<div class="albums_item_box">'+
                                            '<div class="file-panel"><span class="del" data-resourceid="'+ result.Data.Result[i]["ResourceId"] +'">删除</span></div>'+
                                            '<div><img class="lazy img-responsive" src="../../../../static/images/default_image_device.jpg" data-original="'+ (result.Data.Result[i]["ImageUrl"] != ""? result.Data.Result[i]["ImageUrl"]:"../../assets/images/default_image.jpg") +'" /></div>'+
                                            '<div class="font-18 albums_item_des">'+ result.Data.Result[i]['Title'] +'</div>'+
                                            '<div class="text-left">'+
                                                '<div class="albums_item_des text-muted">'+ result.Data.Result[i]['Description'] +'</div>'+
                                            '</div>'+
                                        '</div>'
                                    );
                                }
                            }
                            $('#albums_item_list .viewer_box').viewer();
                            $('#albums_item_list .lazy').lazyload();
                            imgResize()
                        }
                    }
                )
            }

            //  图片上传
            function eosUploaderImg(initData){
                var init = {},
                    $wrap = $(initData['uploaderBox']).find('.eos_uploader_img'),
                    $queue = $(initData['uploaderBox']).find( '.filelist' ),
                    fileCount = 0,
                    fileSize  = 0;
                // 初始化Web Uploader
                init[initData['uploaderObj']] = WebUploader.create({
                    auto: false,
                    swf: false,
                    server: initData['serverUrl'],
                    pick: initData['initBtn'],
                    fileNumLimit: initData['fileNumLimit'],
                    fileSingleSizeLimit: initData['fileSingleSizeLimit'],
                    formData: initData['data'],
                    accept: {
                        title: 'Images',
                        extensions: 'gif,jpg,jpeg,bmp,png',
                        mimeTypes: ''
                    }
                });
                function addFile( file ) {
                    $(initData['uploaderBox']).find(".placeholder").hide()
                    var $li = $( '<li id="' + file.id + '" class="item">' +
                            '<p class="title">' + file.name + '</p>' +
                            '<p class="imgWrap"></p>'+
                            '<p class="progress"><span></span></p>' +
                            '</li>' ),
                    $btns = $('<div class="file-panel">' +
                        '<span class="cancel">删除</span>').appendTo( $li ),
                    $prgress = $li.find('p.progress span'),
                    $wrap = $li.find( 'p.imgWrap' ),
                    $info = $('<p class="error"></p>');
                    init[initData['uploaderObj']].makeThumb( file, function(error, src ) {
                        var img;
                        if (error) {
                            $wrap.text( '不能预览' );return;
                        }
                        img = $('<img src="'+src+'">');
                        $wrap.empty().append( img );
                    }, 110, 110 );
                    $li.prependTo( $queue );
                }
                init[initData['uploaderObj']].on('uploadBeforeSend', function (obj, data, headers){
                    initData['fileBeforeSend'] && initData['fileBeforeSend'](obj, data, headers);
                })
                // 当有文件添加进来的时候
                init[initData['uploaderObj']].on( 'fileQueued', function( file ) {
                    addFile(file);
                    $(initData['uploaderBox']).find(".info").html(text);
                    fileCount++;
                    fileSize += file.size;
                    var text = '选中 ' + fileCount + ' 张图片';
                    $(initData['uploaderBox']).find(".statusBar").show();
                });
                // 文件上传过程中创建进度条实时显示。
                init[initData['uploaderObj']].on( 'uploadProgress', function( file, percentage ) {
                    var $li = $('#'+file.id),
                        $percent = $li.find('.progress span');
                    $percent.css( 'width', percentage * 100 + '%' );
                });
                init[initData['uploaderObj']].on('uploadAccept', function (object,ret){
                    if (eosCommon.checkCode(ret.State, ret.Message)) {}
                    if(ret.Data.length){
                        if (ret.Data[0]['UploadTips'] != 'ok'){
                            return false
                        }
                    }else{
                        return false;
                    }
                })
                // 文件上传成功，给item添加成功class, 用样式标记上传成功。
                init[initData['uploaderObj']].on( 'uploadSuccess', function( file,response ) {
                    $( '#'+file.id ).addClass('upload-state-done');
                    var $li = $( '#'+file.id ),
                        $success = $li.find('div.success');
                    // 避免重复创建
                    if ( !$success.length ) {
                        $success = $('<div class="success"></div>').appendTo( $li );
                    }
                    $success.text('');
                    if(updaImgType = "addImg"){
                        ImageGallery($("#data_box").attr('Brand'))
                    }else{
                        getImgList();
                    }
                    $('#modal-cleos').modal('hide');
                    getImgList();
                    eosCommon.eosMessage("success", eosCommon.INSERT_IMG_MSG);
                });
                init[initData['uploaderObj']].on('fileDequeued', function (file){
                    fileCount--;
                    fileSize -= file.size;
                    if ( !fileCount ) {
                        $(initData['uploaderBox']).find(".statusBar").hide();
                        $(initData['uploaderBox']).find(".placeholder").show();
                    }
                })
                // 文件上传失败，显示上传出错。
                init[initData['uploaderObj']].on( 'uploadError', function( file ) {
                    setTimeout(function (){
                        $( '#'+file.id ).find('.progress span').animate({'width':'0%'},200);
                    },200)
                    var $li = $( '#'+file.id ),
                        $error = $li.find('div.error');
                    // 避免重复创建
                    if ( !$error.length ) {
                        $error = $('<div class="error"></div>').appendTo( $li );
                    }
                    $error.text('上传失败');
                    initData['error'] && initData['error'](file);
                });
                // 完成上传完了，成功或者失败，先删除进度条。
                init[initData['uploaderObj']].on( 'uploadComplete', function( file ) {
                    // $( '#'+file.id ).find('.progress').remove();
                    var fileSizeFormat = fileSize;
                    var stats = init[initData['uploaderObj']].getStats();
                    var text = '共 ' + fileCount + ' 张，已上传 ' + stats.successNum + ' 张';

                    if ( stats.uploadFailNum ) {
                        text += '，失败 ' + stats.uploadFailNum + ' 张；<a class="retry" href="Javascript:;">重新上传 </a>失败图片';
                    }
                    $(initData['uploaderBox']).find(".info").html(text);
                });
                $(initData['uploaderBox']).on("click", ".cancel", function () {
                    if ($(this).parents('.item').attr('data') == "dataImg") {
                        fileCount = fileCount - 1;
                        $(this).parents('.item').remove();
                        initData['del'] && initData['del']($(this).parents('.item').attr('id'));
                        if (!fileCount) {
                            $(initData['uploaderBox']).find(".statusBar").hide();
                            $(initData['uploaderBox']).find(".placeholder").show()
                            init[initData['uploaderObj']].addButton({
                                id: initData['initBtn'],
                                label: '点击选择图片'
                            });
                        } else {
                            if (fileCount < initData['fileNumLimit']) {
                                $(initData['continueBtn']).show();
                            }
                        }
                    }
                    else {
                        init[initData['uploaderObj']].removeFile($(this).parents('.item').attr('id'));
                        $(this).parents('.item').remove();
                        if ($(this).parents('.item').find("input:hidden").val() != null) {
                            initData['del'] && initData['del']($(this).parents('.item').find("input:hidden").val());
                        }
                        if (fileCount < initData['fileNumLimit']) {
                            $(initData['continueBtn']).show();
                        }
                    }
                });
                // 验证
                init[initData['uploaderObj']].on("error",function (type){
                     if(type == "F_DUPLICATE"){
                         vdialog({
                            title: '系统提示',type:'error',modal: true,
                            content: "您已经上传了一份，请不要重复上传！",
                            ok: true
                         });
                     }else if(type == "F_EXCEED_SIZE"){
                         vdialog({
                            title: '系统提示',type:'error',modal: true,
                            content: "单个附件的大小不可超过 3M 哦！换个小点的文件吧！",
                            ok: true
                         });
                     }else if(type == "Q_EXCEED_NUM_LIMIT"){
                         vdialog({
                            title: '系统提示',type:'error',modal: true,
                            content: "您准备上传的照片超过限定的数量啦！",
                            ok: true
                         });
                     }else if(type == "Q_TYPE_DENIED"){
                         vdialog({
                            title: '系统提示',type:'error',modal: true,
                            content: "请上传系统规定的文件<br />gif，jpg，jpeg，bmp，png",
                            ok: true
                         });
                     }
                 });
                // 鼠标进入li 效果
                $(initData['uploaderBox']).on( 'mouseenter','.queueList li.item', function() {
                    $(this).find('.file-panel').stop().animate({height: 29});
                });
                $(initData['uploaderBox']).on( 'mouseleave','.queueList li.item', function() {
                    $(this).find('.file-panel').stop().animate({height: 0});
                });
                $(initData['uploaderBox']).on("click",".uploadBtn", function (){
                    if($("#imgProductTypeSelect").selectpicker('val') == null){
                        vdialog({
                            type: 'error',
                            title: '提示',
                            content: '在“设备类别”模块维护设备型号才能进行图片上传',
                            modal: true,
                            ok: function(){}
                        });
                        return false;
                    }
                    if ($("#img_title").val() == '') {
                        vdialog({
                           title: '系统提示',type:'alert',modal: true,
                           content: "请填写图片标题",
                           ok: true
                        });
                        return false;
                    }
                    if($("#img_des").val() == ''){
                        vdialog({
                           title: '系统提示',type:'alert',modal: true,
                           content: "请填写图片描述",
                           ok: true
                        });
                        return false;
                    }
                    
                    
                    init[initData['uploaderObj']].upload();
                    
                    
                });
                $(initData['uploaderBox']).on( 'click','.retry', function() {
                    if ($("#img_title").val() == '') {
                        vdialog({
                           title: '系统提示',type:'alert',modal: true,
                           content: "请填写图片标题",
                           ok: true
                        });
                        return false;
                    }
                    if($("#img_des").val() == ''){
                        vdialog({
                           title: '系统提示',type:'alert',modal: true,
                           content: "请填写图片描述",
                           ok: true
                        });
                        return false;
                    }
                    init[initData['uploaderObj']].retry();
                });
            };
            function albumsResize(){
            	console.log('厂里');
                  $("#photo_albums").width($("#main_box").width()-50);
                if ($("#main_box").width()-50 < 850){
                    var width = ($("#photo_albums").width() - 70)/2;
                } 
                if($("#main_box").width()-50 > 850 && $("#main_box").width()-50 < 1200){
                    var width = ($("#photo_albums").width() - 100)/3;
                }
                if ($("#main_box").width()-50 > 1200){
                    var width = ($("#photo_albums").width() - 138)/4;
                }
                $("#photo_albums .photo_albums_list").width(width);
                $("#photo_albums .img_box").width(width);
                $("#photo_albums .img_box").height(width/5*4);
            }
            function imgResize(){
                $("#albums_item_list .viewer_box").width($("#main_box").width() - 52);
                if ($("#main_box").width()-50 < 850){
                    var width = ($("#albums_item_list .viewer_box").width() - 58)/3;
                } 
                if($("#main_box").width()-50 > 850 && $("#main_box").width()-50 < 1200){
                    var width = ($("#albums_item_list .viewer_box").width() - 76)/4;
                }
                if ($("#main_box").width()-50 > 1200){
                    var width = ($("#albums_item_list .viewer_box").width() - 96)/5;
                }
                $(".albums_item_box .img_box").width(width);
                $(".albums_item_box").width(width+2);
                $(".albums_item_box .img_box").height(width/5*4);
            }
            $(window).on("resize", function() {
                albumsResize();
                imgResize();
                verifyCheck({formId:'verifyCheck',onBlur:null,onFocus:null,onChange: null,successTip: true,resultTips:null,clearTips:null,code:true, phone:true});
            });
        })
    },
    updated(){
    	
//  	eosCommon.eosOperators(eosCommon.eosOperDataHandle());
    }
}
</script>
<style>
	@import '/static/plugins/tree/css/device_pic.css';
    #brandTree_1_a{
        cursor: default;
    }
    .device_pic .header-right {
        float: left;
        position: absolute;
        height: 100%;
        left: 245px;
        right: 0px;
    }
    #brandTree .button.ico_close {
    	width: 32px;
    	height: 32px;
    	margin-top: 8px;
    	background-size: cover;
    	background-position: top center;
    }
    #brandTree .EosIcon {
    	font-size: 13px;
    	line-height: 46px;
    }
    #dervice_pic_view {
    	box-shadow: 0 0px 20px 0 rgba(0, 0, 0, 0.13), 0 0px 0px 0 rgba(0, 0, 0, 0.1);
    }
    .device_pic .text-muted {
    	text-align: justify;
    	text-justify: inter-ideograph
    }
    .device_pic .photo_albums_list {
    	cursor: pointer;
    }
    .device_pic .carousel-inner > .item > a > img, .carousel-inner > .item > img, .img-responsive, .thumbnail a > img, .thumbnail > img {
    	display: block;
    	width: 100%;
    	height: 100%;
    }
    .device_pic .text-custom:hover {
    	color: #1abc9c;
    }
    .device_pic .albums_item_box {
    	float: left;
    	position: relative;
    	margin: 20px 8px 0;
    }
    .device_pic .albums_item_box .file-panel {
    	position: absolute;
    	height: 0;
    	background: rgba(0, 0, 0, 0.5);
    	top: 0;
    	right: 0;
    	left: 0;
    	overflow: hidden;
    	z-index: 300;
    }
    .device_pic .photo_albums_list{
    	float: left;
    	margin: 20px 16px 0;
    }
    .device_pic .albums_item_box .file-panel span {
    	width: 24px;
    	height: 29px;
    	display: inline;
    	float: right;
    	text-indent: -9999px;
    	overflow: hidden;
    	background: url(../../../../../static/css/images/icons.png) no-repeat;
    	margin: 5px 1px 1px;
    	cursor: pointer;
    }
    .device_pic .albums_item_box .file-panel span.del {
    	background-position: -48px -24px;
    }
    .device_pic .albums_item_box .file-panel span.del:hover {
    	background-position: -48px 0;
    }
    .device_pic .albums_item_des {
    	width: 100%;
    	height: 30px;
    	line-height: 30px;
    	overflow: hidden;
    	white-space:nowrap;
    	text-overflow:ellipsis;
    }
    .device_pic .css_dot{
    	width: 100%;
    	height: 30px;
    	overflow: hidden;
    	white-space:nowrap;
    	text-overflow:ellipsis;
    }
    .device_pic .img_box{
    	width: 320px;
    	height: 260px; 
    }
    .device_pic .eos_uploader_img .queueList{
    	margin: 0;
    }
    #photo_albums{
    	padding: 0 10px;
    	margin: auto;
    }
    #albums_item_list .viewer_box{
    	padding: 0 10px 0 12px;
    	margin: auto;
    }
</style>
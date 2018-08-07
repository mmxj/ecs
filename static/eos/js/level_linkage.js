
// 二级树
// 初始化数据  
// initId 编辑模式下传过来的数值 
// selectEle 选中之后渲染的
// dom callback 预留的回调函数
var vlevelLinkage = function (initId,callback){
    var RoleNodesContent = [];
    eosCommon.eosAjax(
         eosCommon.EOS_COMMON_API +'api/common/organization',
         'GET',
         {
             "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
             "Parameters":{
                 "Type":"3"
             }
         },
        'json',
        function (results){
            if(window.parent.eosCommon.checkCode(results.State,results.Message)){
                var setting = {
                    check: {enable: true},
                    view: {showLine: false,showIcon: true,dblClickExpand: false,selectedMulti: false},
                    data: {simpleData: {enable: true}},
                    callback: {onClick: onClick,onCheck:zTreeOnCheck}
                };
                RoleNodesContent = results.Data;
                function onClick(e,treeId, treeNode) {
                    var tree = $.fn.zTree.getZTreeObj("levelLinkageTree");
                    tree.expandNode(treeNode);
                }
                function setCheck() {
                    var zTree = $.fn.zTree.getZTreeObj("levelLinkageTree"),
                        type = { "Y":ps, "N":s};
                    zTree.setting.check.chkboxType = type;
                }
                function zTreeOnCheck(treeId, treeNode){
                    var tree = $.fn.zTree.getZTreeObj("levelLinkageTree");
                    var nodeArrTrue = tree.getCheckedNodes(true);
                    var nodeArrFalse = tree.getCheckedNodes(false);
                    $("#tree_panel").empty();
                    for(var i = 0; i< nodeArrTrue.length;i++){
                        if(nodeArrTrue[i].levels == 3){
                            $("#tree_panel").append("<li data-id="+ nodeArrTrue[i]["id"] +">"+ nodeArrTrue[i]["name"] +"</li>")
                        }
                    }
                    for(var j = 0;j< nodeArrFalse.length;j++){
                        $("#tree_panel li").each(function (){
                            if($(this).attr("data-id") == nodeArrFalse[j].id){
                                $(this).remove();
                            }
                        })
                    }
                }
                var levelLinkageTree=$("#levelLinkageTree");
                $.fn.zTree.init(levelLinkageTree, setting, RoleNodesContent,"RoleMenu");
                if (initId) {
                    $("#tree_panel").empty();
                    var tree = $.fn.zTree.getZTreeObj("levelLinkageTree");
                    for(var i=0;i<initId.length;i++){
                        $("#tree_panel").append("<li data-id="+ initId[i]['id'] +">"+ initId[i]['name'] +"</li>")
                        var node = tree.getNodeByParam("id",initId[i]['id']);
                        tree.checkNode(node, true, true);
                    }
                }
                $("#eosDialogLevelLinkageComfirn").click(function (){
                    var arr = [];
                    for(var i=0;i< $("#tree_panel li").length;i++){
                        arr.push($("#tree_panel li").eq(i).attr("data-id"))
                    }
                    callback && callback($("#tree_panel").html());
                });
            }
        }
    )
}
var levelLinkageCompontents = function (obj,initId,callback){
    var _this = $(obj);
    var RoleNodesContent = [];
    eosCommon.eosAjax(
         eosCommon.EOS_COMMON_API +'api/common/organization',
         'GET',
         {
             "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
             "Parameters":{
                 "Type":"3"
             }
         },
        'json',
        function (results){
            if(window.parent.eosCommon.checkCode(results.State,results.Message)){
                var setting = {
                    check: {enable: true},
                    view: {showLine: false,showIcon: true,dblClickExpand: false,selectedMulti: false},
                    data: {simpleData: {enable: true}},
                    callback: {onClick: onClick,onCheck:zTreeOnCheck}
                };
                RoleNodesContent = results.Data;
                function onClick(e,treeId, treeNode) {
                    var tree = $.fn.zTree.getZTreeObj(treeId);
                    tree.expandNode(treeNode);
                }
                function setCheck(e,treeId, treeNode) {
                    var zTree = $.fn.zTree.getZTreeObj(treeId),
                        type = { "Y":ps, "N":s};
                    zTree.setting.check.chkboxType = type;
                }
                function zTreeOnCheck(e,treeId, treeNode){
                    var tree = $.fn.zTree.getZTreeObj(treeId);
                    var nodeArrTrue = tree.getCheckedNodes(true);
                    var nodeArrFalse = tree.getCheckedNodes(false);
                    $(".tree_panel").empty();
                    for(var i = 0; i< nodeArrTrue.length;i++){
                        if(nodeArrTrue[i].levels == 3){
                            _this.find(".tree_panel").append("<li data-id="+ nodeArrTrue[i]["id"] +">"+ nodeArrTrue[i]["name"] +"</li>")
                        }
                    }
                    for(var j = 0;j< nodeArrFalse.length;j++){
                        _this.find(".tree_panel li").each(function (){
                            if($(this).attr("data-id") == nodeArrFalse[j].id){
                                $(this).remove();
                            }
                        })
                    }
                }
                var levelLinkageTree = _this.find(".levelLinkageTree");
                $.fn.zTree.init(levelLinkageTree, setting, RoleNodesContent,"RoleMenu");
                if (initId) {
                    _this.find(".tree_panel").empty();
                    var tree = $.fn.zTree.getZTreeObj("levelLinkageTree");
                    for(var i=0;i<initId.length;i++){
                        _this.find(".tree_panel").append("<li data-id="+ initId[i]['id'] +">"+ initId[i]['name'] +"</li>")
                        var node = tree.getNodeByParam("id",initId[i]['id']);
                        tree.checkNode(node, true, true);
                    }
                }
                _this.find(".comfirn").click(function (){
                    var arr = [];
                    for(var i=0;i< _this.find(".tree_panel li").length;i++){
                        arr.push(_this.find(".tree_panel li").eq(i).attr("data-id"))
                    }
                    callback && callback(_this.find(".tree_panel").html());
                });
            }
        }
    )
}
var onlyLevelLinkage = function (){
    $("body").append(
        '<div class="modal fade" id="eosDialogLevelLinkage" tabindex="-1" role="dialog" >'+
            '<div class="modal-dialog">'+
                '<div class="modal-content">'+
                    '<div class="modal-header">'+
                        '<button type="button" class="close cancel" data-dismiss="modal" aria-hidden="true">&times;</button>'+
                        '<h4 class="modal-title" id="myModalLabel">选择抄送人</h4>'+
                   '</div>'+
                   '<div class="modal-body ak_tree">'+ 
                        '<div class="level_linkage_box">'+
                            '<div id="main_tree_box" class="main_tree_box">'+
                                '<ul id="levelLinkageTree" class="ztree"></ul>'+
                            '</div>'+
                            '<div id="tree_panel_box"  class="tree_panel_box">'+
                                '<ul id="tree_panel"></ul>'+
                            '</div>'+
                        '</div>'+
                    '</div>'+
                    '<div class="modal-footer">'+
                        '<button type="button" class="btn cancel" data-dismiss="modal" aria-hidden="true">取消</button>'+
                        '<button id="eosDialogLevelLinkageComfirn" type="button" class="btn btn-primary">确认选择</button>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>')
    $("#eosDialogLevelLinkage").modal({backdrop: false});
    window.parent.eosCommon.eosAjax(
        // 'http://192.168.1.90:8081/api/common/organization',
        // 'GET',
        // {
        //     "AccessToken":"x9KDsw@6OGRvyS3@2pWQoI@Yi7z2d9grVdX4QcoCry28PhiO0nBCysfsAwq2le@F//Hdkc9Y0nbsKKa@U/u8egWyRPb7A1oqBIPci/kPJCg=",
        //     "Parameters":{
        //         "Type":"3"
        //     }
        // },
        'http://192.168.1.90:8081/api/common/employee',
        'GET',
        {
            "AccessToken":"x9KDsw@6OGRvyS3@2pWQoI@Yi7z2d9grVdX4QcoCry28PhiO0nBCysfsAwq2le@F//Hdkc9Y0nbsKKa@U/u8egWyRPb7A1oqBIPci/kPJCg=",
            "PageIndex":0,
            "PageSize":0,
            "Parameters":{
                 "EmployeeNo":"",
                 "EmployeeName":""
            }
        },
        'json',
        function (results){
            if(window.parent.eosCommon.checkCode(results.State,results.Message)){
                $("#main_tree_box").niceScroll();
                $("#tree_panel_box").niceScroll();
                var setting = {
                    check: {enable: true},
                    view: {showLine: false,showIcon: true,dblClickExpand: false,selectedMulti: false},
                    data: {simpleData: {enable: true}},
                    callback: {onClick: onClick,onCheck:zTreeOnCheck}
                };
                var RoleNodesContent = results.Data;
                function onClick(e,treeId, treeNode) {
                    var tree = $.fn.zTree.getZTreeObj("levelLinkageTree");
                    tree.expandNode(treeNode);
                }
                function setCheck() {
                    var zTree = $.fn.zTree.getZTreeObj("levelLinkageTree"),
                        type = { "Y":ps, "N":s};
                    zTree.setting.check.chkboxType = type;
                }
                function zTreeOnCheck(treeId, treeNode){
                    var tree = $.fn.zTree.getZTreeObj("levelLinkageTree");
                    var nodeArrTrue = tree.getCheckedNodes(true);
                    var nodeArrFalse = tree.getCheckedNodes(false);
                    $("#tree_panel").empty();
                    for(var i = 0; i< nodeArrTrue.length;i++){
                        if(nodeArrTrue[i].levels == 3){
                            $("#tree_panel").append("<li data-id="+ nodeArrTrue[i]["id"] +">"+ nodeArrTrue[i]["name"] +"</li>")
                        }
                    }
                    for(var j = 0;j< nodeArrFalse.length;j++){
                        $("#tree_panel li").each(function (){
                            if($(this).attr("data-id") == nodeArrFalse[j].id){
                                $(this).remove();
                            }
                        })
                    }
                }
                var levelLinkageTree=$("#levelLinkageTree");
                $.fn.zTree.init(levelLinkageTree, setting, RoleNodesContent,"RoleMenu");
                if(initId){
                    var tree = $.fn.zTree.getZTreeObj("levelLinkageTree");
                    for(var i=0;i<initId.length;i++){
                        $("#tree_panel").append("<li data-id="+ initId[i]['id'] +">"+ initId[i]['name'] +"</li>")
                        var node = tree.getNodeByParam("id",initId[i]['id']);
                        tree.checkNode(node, true, true);
                    }
                }
                $("#eosDialogLevelLinkageComfirn").click(function (){
                    var arr = [];
                    for(var i=0;i< $("#tree_panel li").length;i++){
                        arr.push($("#tree_panel li").eq(i).attr("data-id"))
                    }
                    $(selectEle).html($("#tree_panel").html());
                    $("#eosDialogLevelLinkage").remove();
                })
                $("#eosDialogLevelLinkage .cancel").click(function (){
                    $("#eosDialogLevelLinkage").remove();
                })
                callback && callback()
            }
        }
    )
}
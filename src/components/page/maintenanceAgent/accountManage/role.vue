<template>
  <div>
    <!--员工账户管理列表开始-->
    <div id="divDataTableView" class="card-box m-page table-responsive" v-show="!isClickAdd">
      <div class="row">
        <div class="col-sm-6 col-md-4 col-lg-2">
          <span class="size20 font-bold">角色列表</span>
        </div>
      </div>
      <hr class="divider mb-10 mt-10">
      <div class="row">
        <div class="col-lg-12">
	      <span class="OrgTopAligin OperatorInsert">
	            <button id="btnInsert" type="button" class="btn btn-default" v-on:click="btnInsert()">
	                <i class="fa fa-plus m-r-5"></i>新增
	            </button>
	       </span>
      	<span class="OperatorSearch">
   		 <span class="OrgTopAligin">
            <input id="txtQueryKeywords" v-model="KeyWords" type="text" class="form-control w-128" placeholder="角色名称">
        </span>
          <span class="OrgTopAligin OperatorSearch">
	            <button id="btnQuery" type="button" class="btn btn-default" v-on:click="btnQuery()">
	                <i class="fa fa-search m-r-5"></i>查找
	            </button>
	        </span>
          </span>
        </div>
      </div>
      <table id="example1" class="table table-striped table-bordered" width="100%">
        <thead>
          <tr>
            <th>序号</th>
            <th>角色</th>
            <th>角色说明</th>
            <th class="w-80">操作</th>
          </tr>
        </thead>
        <loading v-if="noData"></loading>
      </table>
      <!--</div>-->

    </div>
    <!--员工账户管理列表结束-->
    <!--添加角色开始-->
    <!--添加员工账户管理开始-->
    <div id="divInsertView" class="card-box table-responsive animated fadeIn" v-show="isClickAdd" style="min-height:800px;">
      <div class="row">
        <div class="col-md-6">
          <label class="size20 font-bold view-title">{{nowOperation}}</label>
        </div>
        <div class="col-md-6">
          <button type="button" class="btnReturn btn btn-white pull-right" v-on:click="btnReturn()"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
        </div>
      </div>
      <hr class="divider mb-10 mt-10">
      <div class="row">
        <div class="col-lg-12">
          <div id="verifyCheckAdd">
            <div class="form-horizontal content-box">
              <div class="form-group">
                <label class="content-title-left">
                                    <em class="ak_required_em">*</em>角色名称：
                                </label>
                <div class="col-lg-6 col-xs-8">
                  <span class="valid-form-group">
                                        <label id="lblUserMag" class="focus valid"></label>
                                    </span>
                  <input v-model="roleName" placeholder="请输入角色名称" id="roleName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||between:1-25" data-error="用户名不能为空||用户名长度为25位" />
                  <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                </div>
              </div>
              <div class="form-group mt-20">
                <label class="content-title-left text-right"><em class="ak_required_em"></em>角色说明</label>
                <div class="col-xs-6">
                  <textarea v-model="roleDescriptions" placeholder="请输入角色说明" id="roleDescript" type="text" maxlength="100" class="form-control" /></textarea>
                  <span class="ie8 icon-close close hide"></span>
                  <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                  <label class="focus valid"></label>
                </div>
              </div>
              <div class="content-box-footer">
                <div class="form-group">
                  <label class="content-title-left"></label>
                  <div class="col-lg-5 col-xs-8 pl-22">
                    <button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="btnReturn()">取消</button>
                    <button id="btnAddEdit" type="submit" class="btn btn-default pull-left" data-dismiss="modal" data="1" v-on:click="btnAddEdit()">确定</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <!--添加角色结束-->
    <!--权限设置开始-->
    <div id="modal-cleos" class="modal fade" tabindex="-1" role="dialog" data-backdrop='static' aria-labelledby="myModalLabel" aria-hidden="true">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="win-close" data-dismiss="modal">×</button>
          <button id="btnSave" type="button" class="sava" data-dismiss="modal" aria-hidden="true" v-on:click="btnSave()"><i class='fa fa-save m-r-5'></i>保存</button>
          <h4 id="ModuleTitle" class="modal-title">权限设置</h4>
        </div>
        <div id="verifyCheckset" style="">
          <div class="register_panel">
            <nav role="navigation">
              <ul class="nav nav-tabs" style="background: #8492a6;">
                <li role="presentation" :class="{myActive:currentView=='web'}" @click="platformSelect('web')">
                  <a><i class=" fa-windows fa m-r-5" style="font-size: 20px;"></i>web端</a>
                </li>
                <li role="presentation" :class="{myActive:currentView=='app'}" @click="platformSelect('app')" style="border-right: 1px solid #fefefe;">
                  <a><i class="  fa-android fa m-r-5" style="font-size: 20px;"></i>app端</a>
                </li>
              </ul>
            </nav>
          </div>
          <div id="modal_body3" style="height: 440px; overflow-y: auto;">
            <div class="">
              <!--权限设置开始-->
              <div class="col-sm-12" style="">
                <ul id="roleTree" class="ztree roleTree roleTree_web"></ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let treeNode;
  let nodeNum;
  let table;
  let AccountId;
  export default {
    data() {
      let vm = this;
      return {
        currentView: 'web',
        nowOperation: '新增角色',
        KeyWords: '',
        isClickAdd: false,
        roleName: '',
        roleDescriptions: '',
        roleId: '',
        configs: {
          "CanPrint": 0,
          "CanExport": 0,
          "CanImport": 0,
          "CanRefresh": 0,
          "CanCReate": 0,
          "CanUpdate": 0,
          "CanDelete": 0,
          "CanQury": 0,
          "CanApprove": 0,
          "CanCopy": 0
        },
        operatorsList: {
          CanCReate: '创建',
          CanPrint: '打印',
          CanExport: '导出',
          CanImport: '导入',
          CanRefresh: '刷新',
          CanUpdate: '修改',
          CanQury: '查询',
          CanApprove: '审核',
          CanCopy: '复制',
          CanDelete: '删除',
          CanPublish: '下发',
          CanDownload: '下载',
          CanCancel: '取消',
          CanDistribute: '派发',
          CanUpload: '上传'
        },
        roleSetting: {
          check: {
            enable: true
          },
          view: {
            showLine: false,
            showIcon: true,
            dblClickExpand: false,
            selectedMulti: false
          },
          data: {
            simpleData: {
              enable: true
            }
          },
          callback: {
            onClick: vm.onClick,
            onCheck: vm.onCheck
          }
        },
        EosLeft: '',
        ApplicationCode: 'Web',
        webTreeLists: [],
        appTreeLists: [],
        noData: true
      }
    },
    updated() {
      eosCommon.eosOperators(eosCommon.eosOperDataHandle());
    },
    created() {
      this.is_view = 1;
    },
    methods: {
      btnQuery() {
        table.ajax.reload();
      },
      btnInsert() {
        let vm = this;
        $('#btnAddEdit').attr('data', '1');
        vm.roleName = '';
        vm.nowOperation = '新增角色'
        vm.roleDescriptions = '';
        vm.isClickAdd = true;
      },
      btnReturn() {
        this.isClickAdd = false;
      },
      btnAddEdit() {
        let vm = this;
        if(!verifyCheck._click("verifyCheckAdd")) {
          return false;
        }
        let data = $('#btnAddEdit').attr('data');
        if(data == '1') {
          vm.getInsertRole();
        } else if(data == '2') {
          vm.getUpdaterole();
        }
      },
      platformSelect(platform) {
        let vm = this;
        vm.currentView = platform;
        if(vm.currentView == 'web') {
          vm.ApplicationCode = 'Web';
          vm.roleNodesContentBind();
        } else if(vm.currentView == 'app') {
          vm.ApplicationCode = 'App';
          vm.roleNodesContentBind();
        }
      },
      getInsertRole() {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "CompanyId": eosCommon.storage.get('CompanyId'), //公司ID
            "RoleName": vm.roleName, //角色名称
            "Description": vm.roleDescriptions //角色描述
          }
        };
        let url = eosCommon.COMMON_API + "api/role/InsertRole";
        eosCommon.eosAjax(url, "POST", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            table.ajax.reload();
            vm.isClickAdd = false;
          }
        });
      },
      getUpdaterole() {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "RoleId": vm.roleId, ////角色ID
            "RoleName": vm.roleName, //角色名称
            "Description": vm.roleDescriptions, //角色描述，
            "CompanyId": eosCommon.storage.get("CompanyId")
          }
        };
        let url = eosCommon.COMMON_API + "api/role/updaterole";
        eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            table.ajax.reload();
            vm.isClickAdd = false;
          }
        });
      },
      delRequest() {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "RoleId": vm.roleId //角色ID	
          }
        };
        let url = eosCommon.COMMON_API + "api/role/deleterole";
        eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            table.ajax.reload();
          }
        });
      },
      load_table() {
        let vm = this;
        this.$nextTick(function() {
          $('#txtQueryKeywords').bind('keypress', function(event) {
            if(event.keyCode == "13") {
              table.ajax.reload();
            }
          });
          table = $('#example1').DataTable({
            pagingType: "full_numbers",
            //processing: true,
            deferRender: true,
            dom: "Bfrtip",
            buttons: [],
            responsive: !0,
            serverSide: true,
            ajax(data, callback, settings) {
              vm.noData = true;
              let param = {
                "AccessToken": eosCommon.storage.get("AccessToken"),
                "Parameters": {
                  "CompanyId": eosCommon.storage.get('CompanyId'), //公司id，必填									
                  "Keywords": vm.KeyWords.trim()
                }
              };
              let url = eosCommon.COMMON_API + "api/role/queryrole";
              eosCommon.eosAjax(url, "GET", param, "json", function(result) {
                if(eosCommon.checkCode(result.State, result.Message)) {
                  //									return;
                  let returnData = {};
                  vm.noData = false;
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
                defaultContent: ""
              },
              {
                data: "RoleName"
              },
              {
                data: "Description"
              },
              {
                data: "AddType"
              }
						],
            "columnDefs": [{
              "targets": [3],
              "render" (data) {
                let html = '';
                if(data == 1) {
                  html = "<span class='OperatorBtnSet OperatorEdit'title='权限设置' data-toggle='modal' data-target='#modal-cleos' data='4'><i class='fa fa-cog'></i></span><span class='OperatorBtnEdit OperatorEdit' title='修改角色' data='2'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除角色'><i class='fa fa-trash-o'></i></span>"
                } else if(data == 0) {
                  html = "<span class='OperatorBtnSet OperatorEdit' title='权限设置' data-toggle='modal' data-target='#modal-cleos' data='4'><i class='fa fa-cog'></i></span><span class='OperatorBtnEdit OperatorEdit' title='修改角色' data='2'><i class='fa fa-pencil'></i></span>"
                }
                return html
              }
						}]
          });
          table.on('draw.dt', function() {
            table.column(0, {
              search: 'applied',
              order: 'applied'
            }).nodes().each(function(cell, i) {
              i = i + 1;
              let page = table.page.info();
              let pageno = page.page;
              let length = page.length;
              let columnIndex = (i + pageno * length);
              cell.innerHTML = columnIndex;
            });
          });
          $('#example1 tbody').on('click', 'tr', function() {
            if($(this).hasClass('selected')) {
              $(this).removeClass('selected');
            } else {
              table.$('tr.selected').removeClass('selected');
              $(this).addClass('selected');
            }
          });

          $('#example1 tbody').on('click', 'span', function() {
            let data = table.rows($(this).parents('tr')).data();
            let isNum = $(this).attr("data");
            if(isNum == "2") {
              //修改信息
              $('#btnAddEdit').attr('data', '2');
              vm.isClickAdd = true;
              vm.nowOperation = '修改角色'
              vm.roleName = data[0].RoleName;
              vm.roleDescriptions = data[0].Description;
              vm.roleId = data[0].RoleId;
            } else if(isNum == "3") {
              //删除信息赋值 函数
              vm.roleId = data[0].RoleId;
              AccountId = data[0].AccountId;
              vdialog({
                type: 'confirm',
                title: '提示',
                content: eosCommon.DELETE_MSG_ASK,
                ok() {
                  vm.delRequest();
                },
                cancel: true,
                modal: true
              });
            } else if(isNum == "4") {
              //权限设置赋值 函数
              vm.currentView == 'web'
              vm.roleId = data[0].RoleId;
              vm.platformSelect('web');
            }
          });
        });
      },
      getNodesContent(ApplicationCode = 'Web') {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "CompanyId": eosCommon.storage.get('CompanyId'), //公司ID
            "ApplicationCode": ApplicationCode //应用类型：weixin,Web,App
          }
        };
        //列表数据
        let url = eosCommon.PLATFORM_API + "api/operate/GetTenantUsableFunctionList";
        eosCommon.eosAjax(url, "GET", param, "json", function(result) {
          if(eosCommon.checkCode(result.State, result.Message)) {
            if(ApplicationCode == 'Web') {
              vm.webTreeLists = result.Data;
            } else if(ApplicationCode == 'App') {
              vm.appTreeLists = result.Data;
            }
          }
        });
      },
      roleNodesContentBind(ApplicationCode) {
        let vm = this;
        let EosLeft = $("#roleTree");
        if(vm.ApplicationCode == 'Web') {
          $.fn.zTree.init(EosLeft, vm.roleSetting, vm.webTreeLists, "RoleMenu");
        } else if(vm.ApplicationCode == 'App') {
          $.fn.zTree.init(EosLeft, vm.roleSetting, vm.appTreeLists, "RoleMenu");
        }
        vm.CheckTreeNodesBind();
        //$("#modal_body3").css('max-height', '550px').niceScroll();
      },
      CheckTreeNodesBind() {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "RoleId": vm.roleId,
            "ApplicationCode": vm.ApplicationCode //应用类型：weixin,Web,App
          }
        };
        let url = eosCommon.COMMON_API + "api/role/QueryRoleFunction";
        eosCommon.eosAjax(url, "GET", param, "json", (result) => {
          if(eosCommon.checkCode(result.State, result.Message)) {
            let zTreeRole = $.fn.zTree.getZTreeObj("roleTree");
            zTreeRole.checkAllNodes(false);
            zTreeRole.expandAll(false);
            treeNode = zTreeRole.getNodes();
            nodeNum = treeNode.length;
            vm.$nextTick(function() {
              vm.setCheckTreeNodes(zTreeRole, treeNode, nodeNum, result.Data);
            })
          }
        });
      },
      setCheckTreeNodes(zTreeRole, treeNode, nodeNum, getRoleFunctionId) {
        let curOperator = null;
        for(let i = 0; i < nodeNum; i++) {
          for(let j = 0; j < getRoleFunctionId.length; j++) {
            if(treeNode[i].id == getRoleFunctionId[j].FunctionId) {
              curOperator = JSON.parse(getRoleFunctionId[j].OperateSet);
              zTreeRole.checkNode(treeNode[i], true, false, false);
              if(treeNode[i].children != null) {
                zTreeRole.expandNode(treeNode[i], false, null, null, false);
              }
              if(treeNode[i].children != null) {
                //	我的档案  查询/新增/删除
                let childCrenLen = treeNode[i].children.length;
                for(let k = 0; k < childCrenLen; k++) {
                  //todo  判断是否是查询/新增这一级
                  if(treeNode[i].children[k].name == "查询") {
                    if(curOperator != null && curOperator['QUERY'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "复制") {
                    if(curOperator != null && curOperator['COPY'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "打印") {
                    if(curOperator != null && curOperator['PRINT'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "创建") {
                    if(curOperator != null && curOperator['CREATE'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "删除") {
                    if(curOperator != null && curOperator['DELETE'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "导出") {
                    if(curOperator != null && curOperator['EXPORT'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "导入") {
                    if(curOperator != null && curOperator['IMPORT'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "修改") {
                    if(curOperator != null && curOperator['UPDATE'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "审核") {
                    if(curOperator != null && curOperator['APPROVE'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "刷新") {
                    if(curOperator != null && curOperator['REFRESH'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "下发") {
                    if(curOperator != null && curOperator['PUBLISH'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "下载") {
                    if(JSON.parse(getRoleFunctionId[j].OperateSet)['DOWNLOAD'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "取消") {
                    if(JSON.parse(getRoleFunctionId[j].OperateSet)['CANCEL'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "派发") {
                    if(JSON.parse(getRoleFunctionId[j].OperateSet)['DISTRIBUTE'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                  if(treeNode[i].children[k].name == "上传") {
                    if(JSON.parse(getRoleFunctionId[j].OperateSet)['UPLOAD'] == 1) {
                      zTreeRole.checkNode(treeNode[i].children[k], true, false, false);
                    }
                  }
                }

              }

            }
          }
          if(treeNode[i].children != null) {
            this.setCheckTreeNodes(zTreeRole, treeNode[i].children, treeNode[i].children.length, getRoleFunctionId);
          }
        }
      },
      getCheckTreeNodes(treeNode, nodeNum, AccountId, setAccountRoleId) {
        function array_contain(array, obj) {
          for(let i = 0; i < array.length; i++) {
            if(array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
              return true;
          }
          return false;
        }
        let configs = {
          "CanPrint": 0,
          "CanExport": 0,
          "CanImport": 0,
          "CanRefresh": 0,
          "CanCReate": 0,
          "CanUpdate": 0,
          "CanDelete": 0,
          "CanQury": 0,
          "CanApprove": 0,
          "CanCopy": 0,
          "CanPublish": 0
        };
        let checkNums = 0;
        let curSelectNum = 0;
        for(let i = 0; i < nodeNum; i++) {
          if(treeNode[i].checked == true) {
            checkNums += 1;
          }
        }
        for(let i = 0; i < nodeNum; i++) {
          let CanAction = false;
          if(treeNode[i].checked == true) {
            curSelectNum += 1;
            if(treeNode[i].name == '创建') {
              CanAction = true;
              configs.CanCReate = 1;
            }
            if(treeNode[i].name == '打印') {
              CanAction = true;
              configs.CanPrint = 1;
            }
            if(treeNode[i].name == '导出') {
              CanAction = true;
              configs.CanExport = 1;
            }
            if(treeNode[i].name == '导入') {
              CanAction = true;
              configs.CanImport = 1;
            }
            if(treeNode[i].name == '刷新') {
              CanAction = true;
              configs.CanRefresh = 1;
            }
            if(treeNode[i].name == '修改') {
              CanAction = true;
              configs.CanUpdate = 1;
            }
            if(treeNode[i].name == '删除') {
              CanAction = true;
              configs.CanDelete = 1;
            }
            if(treeNode[i].name == '查询') {
              CanAction = true;
              configs.CanQury = 1;
            }
            if(treeNode[i].name == '审核') {
              CanAction = true;
              configs.CanApprove = 1;
            }
            if(treeNode[i].name == '复制') {
              CanAction = true;
              configs.CanCopy = 1;
            }
            if(treeNode[i].name == '下发') {
              CanAction = true;
              configs.CanPublish = 1;
            }
            if(treeNode[i].name == '下载') {
              CanAction = true;
              configs.CanDownLoad = 1;
            }
            if(treeNode[i].name == '取消') {
              CanAction = true;
              configs.CanCancel = 1;
            }
            if(treeNode[i].name == '派发') {
              CanAction = true;
              configs.CanDistribute = 1;
            }
            if(treeNode[i].name == '上传') {
              CanAction = true;
              configs.CanUpload = 1;
            }
            let FunctionId = treeNode[i].id;
            if(CanAction) {
              FunctionId = treeNode[i].pId;
            }
            let ActionArray = new Array("创建", "打印", "导出", "导入", "刷新", "修改", "删除", "查询", "审核", "复制", "下发", "下载", "取消", "派发", "上传");
            if(array_contain(ActionArray, treeNode[i].name)) {
              let newJson = '{"FunctionId":"' + FunctionId + '","OperateSet":' + JSON.stringify(configs) + '}';
              if(curSelectNum == checkNums) {
                setAccountRoleId.pop(setAccountRoleId.length - 1);
                setAccountRoleId.push(JSON.parse(newJson));
              }
            } else {
              let newJson = '{"FunctionId":"' + FunctionId + '","OperateSet":' + JSON.stringify(null) + '}';
              setAccountRoleId.push(JSON.parse(newJson));
            }
          }
          if(treeNode[i].children != null) {
            this.getCheckTreeNodes(treeNode[i].children, treeNode[i].children.length, AccountId, setAccountRoleId);
          }
        }
      },
      saveAccountRole(setAccountRoleId) {
        let vm = this;
        let param = {
          "AccessToken": eosCommon.storage.get('AccessToken'),
          "ApplicationCode": vm.ApplicationCode,
          "RoleId": vm.roleId,
          "Parameters": setAccountRoleId
        };
        $.ajax({
          url: eosCommon.COMMON_API + "api/role/SaveRoleFunction",
          type: 'POST',
          data: JSON.stringify(param),
          contentType: "application/json",
          dataType: 'json',
          success(result) {
            if(eosCommon.checkCode(result.State, result.Message)) {
              eosCommon.eosMessage("success", eosCommon.SET_PERMISSION);
              table.ajax.reload();
            }
          },
          timeout: 60000,
          error() {}
        });

      },
      onClick(e, treeId, treeNode) {
        let ea = $.fn.zTree.getZTreeObj("roleTree");
        ea.expandNode(treeNode);
        //$("#modal_body3").getNiceScroll().resize();
      },
      onCheck(e, treeId, treeNode) {
        let RoleTree = $.fn.zTree.getZTreeObj("roleTree");
        if(treeNode.checked == true) {
          RoleTree.expandNode(treeNode, true, true, null, false);
        } else {
          RoleTree.expandNode(treeNode, false, true, null, false);
        }
      },
      btnSave() {
        //权限设置实现函数
        let zTreeRole = $.fn.zTree.getZTreeObj("roleTree");
        treeNode = zTreeRole.getNodes();
        nodeNum = treeNode.length;
        let setAccountRoleId = [];
        let configs = null;
  		
        this.getCheckTreeNodes(treeNode, nodeNum, AccountId, setAccountRoleId);
        if(setAccountRoleId.length == 0) {
          let newJson = '{"FunctionId":"","OperateSet":' + JSON.stringify(configs) + '}';
          setAccountRoleId.push(JSON.parse(newJson));
        }
        this.saveAccountRole(setAccountRoleId);
      }

    },
    mounted() {
      this.load_table();
      this.getNodesContent();
      this.getNodesContent('App');
    }
  }
</script>
<style scoped="scoped">
  @import '/static/plugins/tree/css/role_set.css';
  #register-box .m-t-5 {
    margin-top: 7px;
  }
  
  nav li {
    padding: 0 50px;
  }
  
  .myActive {
    font-size: 16px;
    font-weight: bold;
    background: #fff;
    color: #1abc9c!important;
  }
  
  .myActive a {
    color: #1abc9c!important;
  }
  
  .nav.nav-tabs>li.myActive>a {
    color: #1abc9c!important;
  }
  
  .nav.nav-tabs>li.myActive>a:hover {
    color: #1abc9c!important;
  }
  
  .nav.nav-tabs>li>a {
    color: #c0ccda!important;
    font-size: 16px;
    font-weight: bold;
    height: 40px;
    line-height: 40px;
  }
  
  .nav.nav-tabs>li>a:hover {
    color: #c0ccda!important;
    font-size: 16px;
    font-weight: bold;
  }
  
  .enter-vertical {
    position: relative;
    transform: translateY(50%);
    margin-right: 10px;
  }
  
  .eos_uploader_img {
    margin: 0 auto;
  }
  
  #cancel.btn-blue {
    background-color: #fefefe;
    border-color: #e3e7ea;
    color: #8492a6;
  }
  
  .company_log {
    width: 1080px;
    min-width: 1080px;
    margin: 15px auto;
    padding: 15px;
    height: 63px;
  }
  
  .mt-30 {
    margin-top: 0!important;
  }
  
  .company_log h3 {
    margin-left: 187px;
    height: 100%;
    height: 63px;
    line-height: 63px;
    margin-top: -15px;
    border-left: 1px solid #ccd3db;
    text-indent: 30px;
    font-size: 24px;
    color: #8492a6;
    font-weight: bold;
  }
  
  .radio_tips {
    margin-top: 40px;
    margin-left: 150px;
    color: #000000;
    font-weight: bolder;
    margin-bottom: 50px;
  }
  
  .part2 {
    height: 530px;
  }
  
  .part2 h3 {
    margin-top: 28px;
    color: #000000;
    font-weight: bold;
    font-size: 18px;
  }
  
  .register_success_img {
    display: block;
    margin: 0 auto;
    padding-top: 125px;
  }
  
  .reg-box .intelligent-label {
    background-color: none!important;
  }
  
  .panel-body {
    padding: 15 30px;
  }
  
  .detail_info_wrap {
    border: none;
  }
</style>
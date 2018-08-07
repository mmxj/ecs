<style scoped>
.card-box {
  padding: 0
}

.card-box:hover {
  padding: 0
}

</style>
<template>
  <div>
    <div id="fileManager" class="card-box table-responsive">
      <div class="row" v-show='!propsData'>
        <div class="col-lg-12 p-10">
          <span class="size20 font-bold pl-10">档案中心</span>
        </div>
      </div>
      <hr class="divider" v-show='!propsData'>
      <!--左边——组织架构 开始-->
      <div id="rightAddPart" class="col-xs-12 col-sm-4 col-md-3 col-lg-2 pull-left archives-text-line b-r-1">
        <!--<div v-if="!projectId" style="padding: 0;" class="form-group col-lg-3 col-xs-3">
                    <label class="content-title-left" style="width: 80px;"><em class="ak_required_em">*</em>所属项目:</label>
                    <div id="" style="padding: 0;" class="col-lg-4 col-xs-4">
                        <select data-live-search="true" v-model="projectId" id="selectProject" class="form-control selectpicker" data-size="8" data-style="btn-white">
                            <option value="">请选择项目</option>
                            <option v-for="item in projectListData" :value="item.ProjectId">{{item.ProjectName}}</option>
                        
                        </select>
                    </div>
                    
                </div>-->
        <div v-if="!propsData.ProjectId" style="padding: 0;" class="row mb-10">
          <span class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0 10px;">
                        <select data-live-search="true" @change="changeGetFileList()"  v-model="projectId" id="selectProject" class="form-control selectpicker" data-size="8" data-style="btn-white">
                            <option value="">请选择项目</option>
                            <option v-for="item in projectListData"  :value="item.ProjectId">{{item.ProjectName}}</option>                      
                        </select>
                    </span>
        </div>
        <div class="row mb-10 OperatorSearch">
          <span class="input-group col-xs-12 col-sm-12 col-md-12 col-lg-12" style="padding: 0 10px;">
                        <input id="d-searchText" v-model.trim="searchText" type="text" class="form-control b-r-0" placeholder="查找文件夹，文件">
                        <span @click="getUpdataFileList(fileId)" class="input-group-addon bg-no"><span class="fa fa-search"></span></span>
          </span>
        </div>
        <div v-show="homeDirectoryLoading" class="row archives-text-files">
          <div class="dataTables_wrapper no-footer">
            <div class="dataTables_processing" style="top: 30px;">数据加载中...</div>
          </div>
        </div>
        <div v-if="item.DirectoryId == 1" class="row archives-text-files cursor b-b-1" v-for="(item,index) in homeDirectoryList">
          <span class="archives-img-center col-xs-2 col-sm-2 col-md-2 col-lg-2"></span>
          <span class="archives-left-text col-xs-10 col-sm-10 col-md-10 col-lg-10">{{item.DirectoryName}}</span>
        </div>
        <div v-if="item.DirectoryId != 1" class="row archives-text-files-sub create_ele cursor" v-for="(item,index) in homeDirectoryList" @mouseenter="mouseHover(index,item.IsSystem)" @mouseleave="mouseLeave()" :class="{selectHomeDirectory : editorHomeDirectoryIndex == index}" @click="getFileList(item,index)">
          <span class="col-xs-2 col-sm-2 col-md-2 col-lg-2" :class="[item.Icon,[getDirectoryListClassIndex == index ? homeDirectoryHoverIcon:'']]"></span>
          <span class="editorHomeNormal col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <span class="archives-left-text home-directory-name col-xs-8 col-sm-8 col-md-8 col-lg-8">{{item.DirectoryName}}</span>
          <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center" style="padding: 0;">
            <span id="delBtns" v-show="showDelBtn == index" @click="del(item,index)" :class="{OperatorDel:showDelBtn == index }" class="fa fa-trash-o text-danger "></span>
            <span id="editBtns" v-show="showEditBtn == index" @click="editor(item,index)" :class="{OperatorEdit:showEditBtn == index }" class="fa fa-pencil text-cleos action-del "></span>
          </div>
          </span>
          <span class="editorHomeDirectory col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0;">
                        <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="padding: 0;"><input style="width: 100%;" type="text" v-model='editorHomeDirectoryText'></div>
                        <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center" style="padding: 0;">
                            <em class="fa fa-check" style="margin:0;" @click="saveEditor(item,index)"></em>
                            <em class="fa fa-times" @click="cancelEditor()"></em>
                        </div>
                    </span>
        </div>
        <div v-show="newHomeDirectory" @click="createHomeDirectory()" class="row archives-text-files-sub cursor OperatorInsert">
          <span class="archives-img-create col-xs-2 col-sm-2 col-md-2 col-lg-2"></span>
          <span class="archives-left-text col-xs-10 col-sm-10 col-md-10 col-lg-10">新建目录</span>
        </div>
        <div v-show="newCreateHomeDirectory" class="row archives-text-files-sub cursor create_ele">
          <span class="default col-xs-2 col-sm-2 col-md-2 col-lg-2"></span>
          <div class="col-xs-10 col-sm-10 col-md-10 col-lg-10" style="padding: 0;">
            <div class="col-xs-8 col-sm-8 col-md-8 col-lg-8" style="padding: 0;">
              <input style="width: 100%;" type="text" v-model='newHomeDirectoryText' placeholder="目录名称">
            </div>
            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4 text-center" style="padding: 0;">
              <em class="fa fa-check" @click="save()"></em>
              <em class="fa fa-times" @click="cancel()"></em>
            </div>
          </div>
        </div>
      </div>
      <!--左边——组织架构 结束-->
      <!--右边——添加子公司/部门 开始-->
      <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10">
        <div id="divDataTableView" style="padding: 10px 15px 15px 15px;">
          <div class="row">
            <div class="col-lg-5 col-xs-5 breadcrumb">
              <span class="archives-center-img"></span>
              <span v-for="(item,index) in breadcrumb">
                                <span v-if="index == 0" class="archives-center-text">
                                    {{item.DirectoryName}}
                                    <i class="fa fa-angle-right ml-5 mr-5"></i>
                                </span>
              <span v-if="index != 0 && index != breadcrumb.length-1" @click="getReturnFileList(item)" class="archives-center-text b_txt cursor">
                                    {{item.DirectoryName}}
                                    <i class="fa fa-angle-right ml-5 mr-5" style="color: #bbb;"></i>
                                </span>
              <span v-if="index == breadcrumb.length-1" class="archives-center-text">
                                    {{item.DirectoryName}}
                                </span>
              </span>
            </div>
            <div class="col-lg-7 col-xs-7">
              <span class="pull-right ml-10 OperatorInsert" v-show="showCreateFileDirectory">
                                <button @click="createFilesDirectory()" type="button" class="btn btn-white">
                                    <i class="fa fa-plus m-r-5"></i>新建文件夹
                                </button>
                            </span>
              <span class="pull-right OperatorUpload">
                                <button @click="upload()" type="button" class="btn btn-default">
                                    <i class="fa  fa-upload m-r-5"></i>上传文件
                                </button>
                            </span>
              <span class="pull-right mr-10 OperatorEdit">
                                <button @click="moveFilesDirectory()" type="button" class="btn btn-white">
                                    <i class="fa fa-file-movie-o m-r-5"></i>移动到
                                </button>
                            </span>
            </div>
          </div>
          <hr class="divider">
          <div class="p-0">
            <ul class="list-unstyled file_list">
              <li class="archives-center row" style="padding-top: 8px;">
                <div class="col-xs-5" style="padding-left: 30px;">
                  <div class="checkbox checkbox-primary p-0" style="margin-top: 0;margin-bottom: 0;">
                    <input id="allCheckFile" v-model='checked' @click='checkedAll()' type="checkbox">
                    <label class="allCheckFile" for="allCheckFile">
                      <span class="archives-text cursor size14 font-bold">文件名</span>
                    </label>
                  </div>
                </div>
                <div class="col-xs-2">
                  <span class="archives-text size14 font-bold">文件大小</span>
                </div>
                <div class="col-xs-3">
                  <span class="archives-text size14 font-bold">最后更新</span>
                </div>
                <div class="col-xs-2 archives-text archives-text size14 font-bold text-center">
                  操作
                </div>
                <span class="clearfix"></span>
              </li>
              <li class="clearfix row" v-show="directoryLoading">
                <div class="dataTables_wrapper no-footer">
                  <div class="dataTables_processing">数据加载中...</div>
                </div>
              </li>
              <li class="archives-center clearfix row" v-show="newCreateFilesDirectory">
                <span class="col-lg-12 archives-text-files-sub cursor create_ele">
                                    <span class="archives-text directory cursor" style="display: inline-block;height: 25px;float: left;margin-top: 3px;">
                                        <a style="display: block;width: 2px;"></a>
                                    </span>
                <input style="float: left;" type="text" v-model='newCreateFilesDirectoryTxt' placeholder="新建文件夹">
                <em class="fa fa-check" style="float: left;" @click="saveFiles()"></em>
                <em class="fa fa-times" style="float: left;" @click="cancelFiles()"></em>
                </span>
              </li>
              <li class="archives-center clearfix row file_list_item" v-for="(item,index) in fileList">
                <div v-if="item.IsDirectory == 1" class="col-xs-5 create_ele" :class="{selectFileDirectory : editorFileDirectoryIndex == index}">
                  <span class="archives-text directory cursor">
                                        <a class="editorFileNormal" @click="getSubFileList(item)">{{item.FileName}}</a>
                                        <span class="editorFileDirectory">
                                            <input type="text" v-model='editorFilesDirectoryTxt' style="margin-top: 0;min-width: 88px;">
                                            <em class="fa fa-check"  @click="editorSaveFiles(item)"></em>
                                            <em class="fa fa-times" @click="editorCancelFiles()"></em>
                                        </span>
                  </span>
                </div>
                <div v-if="item.IsDirectory == 0" class="col-xs-5" style="padding-left: 30px;">
                  <div class="checkbox checkbox-primary p-0" style="margin-top: 0;margin-bottom: 0;">
                    <input :id="item.id" type="checkbox" v-model='checkFileList' :value='item.FileId' name="checkFile" class="mt-5">
                    <label :for="item.id">
                      <a class="archives-text cursor" v-bind:class="item.Format">{{item.FileName}}</a>
                    </label>
                  </div>
                </div>
                <div class="col-xs-2">
                  <span class="archives-text">
                                        {{item.FileSize?item.FileSize+'k':'-'}}
                                    </span>
                </div>
                <div class="col-xs-3">
                  <span class="archives-text" style="line-height: 25px;">
                                        {{item.CreatedOn}}&nbsp;&nbsp;&nbsp;&nbsp;<span style="color:#c6d1de;">{{item.Creator}}</span>
                  </span>
                </div>
                <div class="col-xs-2 p-0 text-center">
                  <span v-if="item.IsDirectory == 1" class="OperatorBtnEdit cursor OperatorEdit" @click="updatFielDirectory(item,index)">
                                        <i class="fa fa-pencil size20"></i>
                                    </span>
                  <a :href="item.ResourceUrl" v-if="item.IsDirectory == 0" class="OperatorBtnEdit OperatorDownload" target="_blank" style="display:inline-block;width: 30px;">
                                        <i class="fa fa-download size20"></i>
                                    </a>
                  <span class="cursor ml-10 text-danger OperatorDel" v-if="item.IsDirectory == 1" @click="delFileDirectory(item,index)">
                                        <i class="fa fa-trash-o size20"></i>
                                    </span>
                  <span class="cursor ml-10 text-danger OperatorDel" v-if="item.IsDirectory == 0" @click="delFile(item,index)">
                                        <i class="fa fa-trash-o size20"></i>
                                    </span>
                </div>
                <span class="clearfix"></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--右边——添加子公司/部门 结束-->
      <!-- 文件上传组件 -->
      <div id="upLoadFilesWin" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="win-close" data-dismiss="modal">×</button>
            <button id="btnSave" type="button" class="sava" data-dismiss="modal" aria-hidden="true"></button>
            <h4 id="ModuleTitle" class="modal-title">上传文件</h4>
          </div>
          <div class="modal-body nicescroll">
            <div id="upLoadFilesBox"></div>
          </div>
        </div>
      </div>
      <!-- 移动文件夹树 -->
      <div id="moveFilesWin" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true" style="display: none;">
        <div class="modal-content">
          <div class="modal-header" style="height: 58.5px;">
            <button type="button" class="win-close" data-dismiss="modal">×</button>
            <button v-show="showMoveSaveBtn" type="button" class="sava" @click="fileMoveTo()"><i class='fa fa-save m-r-5'></i>确定</button>
            <h4 class="modal-title">称动到</h4>
          </div>
          <div>
            <div class="modal-body nicescroll">
              <div class="row">
                <div class="col-lg-12">
                  <ul id="fileTree" class="ztree"></ul>
                </div>
                <div class="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var setting;
var zTree;
var zNodes;
var code;
export default {
  data: function() {

    return {
      projectId: '',
      homeDirectoryList: [],
      editorHomeDirectoryText: '',
      homeDirectoryId: '',
      editorHomeDirectoryIndex: -1,
      newCreateHomeDirectory: false,
      homeDirectoryHoverIcon: 'class-2-hover',
      newHomeDirectory: false,
      newHomeDirectoryText: '',
      fileList: [],
      fileId: '',
      editorFilesDirectoryTxt: '',
      showDelBtn: 0,
      showEditBtn: 0,
      newCreateFilesDirectory: false,
      newCreateFilesDirectoryTxt: '',
      editorFileDirectoryIndex: -1,
      getDirectoryListClassIndex: 1,
      showCreateFileDirectory: true,
      breadcrumb: [{ 'DirectoryName': '档案中心' }, { 'DirectoryName': '管理制度' }],
      checkFileList: [],
      checked: "",
      fromDirectoryId: '',
      ToDirectoryId: '',
      showMoveSaveBtn: false,
      searchText: '',
      homeDirectoryLoading: true,
      directoryLoading: true,
      projectListData: []
    }
  },
  props: ['propsData'],
  methods: {
    changeGetFileList() {
      console.log('222');
      let vm = this;
      vm.getDirectoryList('管理制度', 1);
      //vm.getUpdataFileList(vm.fileId)
    },
    getProjectList: function() {
      //请求项目列表数据
      var vm = this;
      var param = {
        "AccessToken": eosCommon.storage.get('AccessToken'),
      };
      var url = eosCommon.COMMON_API + "api/common/project";
      eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          vm.noData = false;
          if (result.Data instanceof Array) {
            vm.projectListData = [];
            vm.getDirectoryList('管理制度', 1);
            //vm.projectId = '';
          } else {
            //alert(this.projectId);
            vm.projectListData = result.Data.Result.filter((val) => {
              return val.IsSelfProject == 1;
            });
            //vm.projectId=vm.projectListData[0].ProjectId;
            vm.getDirectoryList('管理制度', 1);
            $('#d-searchText').bind('keypress', function(event) {
              if (event.keyCode == "13") {
                vm.getUpdataFileList(vm.fileId)
              }
            });
          }
          vm.$nextTick(() => {
            $("#selectProject").selectpicker('refresh');
          });

        }
      });
    },
    getDirectoryList: function(thisName, num) {
      var _this = this;
      this.breadcrumb.pop();
      this.breadcrumb.push(thisName);
      this.getDirectoryListClassIndex = num;
      this.newCreateFilesDirectory = false;
      var param = {
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "Type": "B"
        }
      };
      var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/filedirectory";
      window.parent.eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
          _this.homeDirectoryId = result.Data.Result[0].DirectoryId;
          _this.homeDirectoryList = result.Data.Result;
          _this.getFileList(result.Data.Result[1], 1);
          _this.fileId = result.Data.Result[1].DirectoryId;
          _this.getUpdataFileList(_this.fileId)
          _this.newHomeDirectory = true;
          _this.homeDirectoryLoading = false;
        }
      });
    },
    getFileList: function(item, index) {
      this.homeDirectoryHoverIcon = item.Icon + '-hover';
      this.getDirectoryListClassIndex = index;
      this.newCreateFilesDirectory = false;
      this.fileId = item.DirectoryId;
      this.breadcrumb = [{ 'DirectoryName': '档案中心' }];
      this.breadcrumb.push({ 'DirectoryId': item.DirectoryId, 'DirectoryName': item.DirectoryName, 'IsSystem': item.IsSystem, 'Icon': item.Icon, 'Index': index });
      this.showCreateFileDirectory = true;
      var _this = this;
      var param = {
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "DirectoryId": item.DirectoryId,
          "ProjectId": this.projectId,
          "Keywords": "",
        }
      };
      var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/QueryFile";
      window.parent.eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
          _this.fileList = result.Data.Result;
          _this.directoryLoading = false;
        }
      });
    },
    getReturnFileList: function(item) {
      this.breadcrumb = [{ 'DirectoryName': '档案中心' }];
      this.breadcrumb.push(item);
      this.getFileList(item, item.Index);
    },
    getUpdataFileList: function(id) {
      this.showCreateFileDirectory = true;
      var _this = this;
      var param = {
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "DirectoryId": id,
          "ProjectId": this.projectId,
          "Keywords": this.searchText,
        }
      };
      var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/QueryFile";
      window.parent.eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
          _this.fileList = result.Data.Result;
          _this.newCreateFilesDirectory = false;
        }
      });
    },
    getSubFileList: function(item) {
      this.fileId = item.DirectoryId;
      this.showCreateFileDirectory = false;
      this.breadcrumb.push({ 'DirectoryName': item.FileName });
      var _this = this;
      var param = {
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "DirectoryId": item.DirectoryId,
          "ProjectId": this.projectId,
          "Keywords": "",
        }
      };
      var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/QueryFile";
      window.parent.eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
          _this.fileList = result.Data.Result;
          _this.newCreateFilesDirectory = false;
        }
      });
    },
    mouseHover: function(index, status) {
      if (status == 0) {

        this.showDelBtn = index;
        this.showEditBtn = index;
        //                      console.log('11111111', Boolean(this.showDelBtn)); 

        //                      $('#delBtns').addClass('OperatorDel');
        //                      $('#editBtns').addClass('OperatorEdit');
        //                      eosCommon.eosOperators(eosCommon.eosOperDataHandle());
      }
    },
    mouseLeave: function() {
      this.showDelBtn = 0;
      this.showEditBtn = 0;
      //              console.log('11111111', Boolean(this.showDelBtn)); 
      //              $('#delBtns').removeClass('OperatorDel');
      //                $('#editBtns').removeClass('OperatorEdit');
      //                eosCommon.eosOperators(eosCommon.eosOperDataHandle());
    },
    createHomeDirectory: function() {
      this.newCreateHomeDirectory = true;
      this.newHomeDirectory = false;
      this.editorHomeDirectoryIndex = -1;
      this.newHomeDirectoryText = '';
    },
    createFilesDirectory: function() {
      this.newCreateFilesDirectory = true;
      this.newCreateFilesDirectoryTxt = '';
      this.editorFileDirectoryIndex = -1;
    },
    editor: function(item, index) {
      this.editorHomeDirectoryIndex = index;
      this.editorHomeDirectoryText = item.DirectoryName;
      this.newCreateHomeDirectory = false;
      this.newHomeDirectory = true;
    },
    saveEditor: function(item, index) {
      var _this = this;
      if (this.editorHomeDirectoryText == '') {
        window.parent.vdialog({
          type: 'confirm',
          title: '提示',
          content: '目录名称不能为空',
          ok: function() {},
          modal: true
        });
      } else {
        var param = {
          "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "ParentId": this.homeDirectoryId,
            "DirectoryId": item.DirectoryId,
            "DirectoryName": this.editorHomeDirectoryText
          }
        };
        var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/updatedirectory";
        window.parent.eosCommon.eosAjax(url, "Put", param, "json", function(result) {
          if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
            item.DirectoryName = _this.editorHomeDirectoryText
            _this.$set(_this.homeDirectoryList, index, item);
            _this.editorHomeDirectoryIndex = -1;
            window.parent.eosCommon.eosMessage('success', window.parent.eosCommon.UPDATE_DIRECTORY);
          }
        });
      }
    },
    cancelEditor: function() {
      this.editorHomeDirectoryIndex = -1;
    },
    save: function() {
      var _this = this;
      if (this.newHomeDirectoryText == '') {
        window.parent.vdialog({
          type: 'confirm',
          title: '提示',
          content: '目录名称不能为空！',
          ok: function() {},
          modal: true
        });
      } else {
        var param = {
          "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "ParentId": this.homeDirectoryId,
            "DirectoryName": this.newHomeDirectoryText
          }
        };
        var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/createdirectory";
        window.parent.eosCommon.eosAjax(url, "POST", param, "json", function(result) {
          if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
            _this.homeDirectoryList.push({ "DirectoryId": result.Data.DirectoryId, "DirectoryName": _this.newHomeDirectoryText, "IsSystem": 0, "Icon": "default" });
            window.parent.eosCommon.eosMessage('success', window.parent.eosCommon.CREATE_DIRECTORY);
            _this.newCreateHomeDirectory = false;
            _this.newHomeDirectory = true;
          }
        });
      }
    },
    cancel: function() {
      this.newCreateHomeDirectory = false;
      this.newHomeDirectory = true;
    },
    del: function(item, index) {
      var _this = this;
      var param = {
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "DirectoryId": item.DirectoryId
        }
      };
      var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/deletedirectory";
      window.parent.vdialog({
        type: 'confirm',
        title: '提示',
        content: '你确定需要删除此目录？',
        ok: function() {
          window.parent.eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
            if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
              window.parent.eosCommon.eosMessage('warning', window.parent.eosCommon.DELETE_DIRECTORY);
              _this.homeDirectoryList.splice(index, 1)
            }
          });
        },
        cancel: true,
        modal: true
      });
    },
    saveFiles: function() {
      var _this = this;
      if (this.newCreateFilesDirectoryTxt == '') {
        window.parent.vdialog({
          type: 'confirm',
          title: '提示',
          content: '文件夹名称不能为空！',
          ok: function() {},
          modal: true
        });
      } else {
        var param = {
          "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "ParentId": this.fileId,
            "DirectoryName": this.newCreateFilesDirectoryTxt
          }
        };
        var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/createdirectory";
        window.parent.eosCommon.eosAjax(url, "Post", param, "json", function(result) {
          if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
            _this.getUpdataFileList(_this.fileId);
            window.parent.eosCommon.eosMessage('success', window.parent.eosCommon.UPDATE_DIRECTORY);
          }
        });
      }
    },
    cancelFiles: function() {
      this.newCreateFilesDirectory = false;
    },
    updatFielDirectory: function(item, index) {
      this.editorFileDirectoryIndex = index;
      this.newCreateFilesDirectory = false;
      this.editorFilesDirectoryTxt = item.FileName;
    },
    editorSaveFiles: function(item) {
      var _this = this;
      if (this.editorFilesDirectoryTxt == '') {
        window.parent.vdialog({
          type: 'confirm',
          title: '提示',
          content: '文件夹名称不能为空！',
          ok: function() {},
          modal: true
        });
      } else {
        var param = {
          "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "ParentId": this.fileId,
            "DirectoryId": item.DirectoryId,
            "DirectoryName": this.editorFilesDirectoryTxt
          }
        };
        var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/updatedirectory";
        window.parent.eosCommon.eosAjax(url, "Put", param, "json", function(result) {
          if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
            _this.getUpdataFileList(_this.fileId);
            _this.editorFileDirectoryIndex = -1;
            window.parent.eosCommon.eosMessage('success', window.parent.eosCommon.UPDATE_DFOLDER);
          }
        });
      }
    },
    editorCancelFiles: function() {
      this.editorFileDirectoryIndex = -1;
    },
    delFileDirectory: function(item, index) {
      var _this = this;
      var param = {
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "DirectoryId": item.DirectoryId
        }
      };
      var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/deletedirectory";
      window.parent.vdialog({
        type: 'confirm',
        title: '提示',
        content: '你确定需要删除此文件夹吗？',
        ok: function() {
          window.parent.eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
            if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
              window.parent.eosCommon.eosMessage('warning', window.parent.eosCommon.DELETE_DFOLDER);
              _this.fileList.splice(index, 1)
            }
          });
        },
        cancel: true,
        modal: true
      });
    },
    delFile: function(item, index) {
      var _this = this;
      var param = {
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "FileId": item.FileId
        }
      };
      param.Parameters.EquipmentId = item.DirectoryId == -1 ? item.EquipmentId : ''
      var preUrl = item.DirectoryId == -1 ? 'equipment/DeleteManuals' : 'project/deletefile'
      var url = window.parent.eosCommon.ENTERPRISE_API + "api/" + preUrl;
      // console.log(url)
      // return false
      window.parent.vdialog({
        type: 'confirm',
        title: '提示',
        content: '你确定需要删除此文件吗？',
        ok: function() {
          window.parent.eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
            if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
              window.parent.eosCommon.eosMessage('warning', window.parent.eosCommon.DELETE_FILE_MSG);
              _this.fileList.splice(index, 1)
            }
          });
        },
        cancel: true,
        modal: true
      });
    },
    upload: function() {
      var _this = this;
      var _$modal = $('#upLoadFilesWin');
      _$modal.css('display', 'block');
      _$modal.modal('show');
      $("#upLoadFilesBox").empty();
      $("#upLoadFilesBox").html(
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
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "ResourceType": "0",
        "Title": "设备档案名称",
        "Description": "设备档案描述"
      };
      this.upLoadFiles({
        'uploaderObj': 'uploaderFile',
        'uploaderBox': '.uploader_box1',
        'uploaderList': '.uploader-list',
        'initBtn': '#picker',
        'serverUrl': window.parent.eosCommon.RESOURCES_API + "api/resource/upload",
        'data': param,
        'fileNumLimit': 999,
        'upType': 1,
        'succ': function(result) {
          _this.upLoadFilesDirectory(result.Data[0])
        },
        'del': function(result) {}
      })
    },
    upLoadFilesDirectory: function(item) {
      var _this = this;
      var param = {
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "DirectoryId": this.fileId,
          "ProjectId": this.projectId,
          "FileName": item.OriginalResourceName,
          "ResourceId": item.ResourceId,
          "NewFileName": item.ResourceName,
          "FileSize": item.Size,
          "Format": item.Format.replace(/./, '').toLocaleLowerCase()
        }
      };
      var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/uploadfile";
      window.parent.eosCommon.eosAjax(url, "Post", param, "json", function(result) {
        if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
          _this.getUpdataFileList(_this.fileId)
        }
      });
    },
    upLoadFiles: function(initData) {
      var init = {},
        upType = initData['upType'];
      init[initData['uploaderObj']] = WebUploader.create({
        auto: false,
        swf: '../assets/plugins/webuploader/js/Uploader.swf',
        server: initData['serverUrl'],
        formData: initData['data'],
        pick: initData['initBtn'],
        fileNumLimit: initData['fileNumLimit'],
        resize: false,
        fileSingleSizeLimit: 10 * 1024 * 1024,
        accept: {
          title: 'intoTypes',
          extensions: 'ppt,pptx,rar,zip,doc,xls,docx,xlsx,pdf,jpg,gif,png',
          mimeTypes: '*'
        }
      });
      init[initData['uploaderObj']].on('fileQueued', function(file) {
        var typeClass = '';
        if (file.ext == "jpg" || file.ext == "png" || file.ext == "gif") {
          typeClass = 'jpg';
        }
        if (file.ext == 'docx' || file.ext == 'doc') {
          typeClass = 'doc';
        }
        if (file.ext == 'xlsx') {
          typeClass = 'xlsx';
        }
        if (file.ext == 'pdf' || file.ext == 'xls') {
          typeClass = 'pdf';
        }
        if (file.ext == 'zip' || file.ext == 'zip') {
          typeClass = 'zip';
        }
        if (file.ext == 'rar' || file.ext == 'rar') {
          typeClass = 'rar';
        }
        //                  if(file.ext == 'ppt' || file.ext == 'ppt'){
        //                      typeClass = 'ppt';
        //                  }
        if (file.ext == 'pptx' || file.ext == 'ppt') {
          typeClass = 'ppt';
        }
        $(initData['uploaderBox']).find(initData['uploaderList']).append(
          '<div id="' + file.id + '" class="item file_list" data="">' +
          '<h4 class="info ' + typeClass + '">' + file.name + '</h4>' +
          '<div class="progress progress-striped active">' +
          '<div class="progress-bar" role="progressbar" style="width: 0%">' +
          '</div>' +
          '</div>' +
          '<div class="action"><button class="startBtn btn btn-default">开始</button><button class="btn btn-default delBtn">删除</button></div>' +
          '<p class="state">等待上传...</p>' +
          '</div>');
      });
      init[initData['uploaderObj']].on('uploadBeforeSend', function(obj, data, headers) {
        initData['fileBeforeSend'] && initData['fileBeforeSend'](obj, data, headers);
      })
      init[initData['uploaderObj']].on('uploadProgress', function(file, percentage) {
        var $li = $('#' + file.id),
          $percent = $li.find('.progress .progress-bar');
        $li.find('p.state').text('上传中...');
        $percent.css('width', percentage * 100 + '%');
      });
      init[initData['uploaderObj']].on('uploadAccept', function(object, ret) {

        if (upType != 1) {
          if (ret.Data.length) {
            if (ret.Data[0]['UploadTips'] != 'ok') {
              return false
            }
          } else {
            return false;
          }
        }
      })
      init[initData['uploaderObj']].on('uploadSuccess', function(file, response) {
        $('#' + file.id).find(".startBtn").remove();
        $('#' + file.id).find('p.state').html('<span type="color:#81c868">上传成功</span>');
        if (upType != 1) {
          $('#' + file.id).attr("data", response.Data[0].ResourceId); //上传成给data赋值
          $('#' + file.id).append('<input type="hidden" value="' + response.Data[0].ResourceId + '">');
        }
        initData['succ'] && initData['succ'](response);
      });
      init[initData['uploaderObj']].on('uploadError', function(file) {
        setTimeout(function() {
          $('#' + file.id).find('.progress-bar').animate({ 'width': '0%' }, 400);
        }, 400)
        $('#' + file.id).find(".startBtn").html("重新上传");
        $('#' + file.id).find('p.state').html('<span style="color: #f43838">上传出错</span>');
        initData['error'] && initData['error'](file);
      });
      init[initData['uploaderObj']].on('uploadComplete', function(file) {});
      //  验证
      init[initData['uploaderObj']].on("error", function(type) {
        console.log('type:', type);
        if (type == "F_DUPLICATE") {
          window.parent.vdialog({
            title: '系统提示',
            type: 'error',
            modal: true,
            content: "您已经上传了一份，请不要重复上传！",
            ok: true
          });
        } else if (type == "F_EXCEED_SIZE") {
          window.parent.vdialog({
            title: '系统提示',
            type: 'error',
            modal: true,
            content: "单个附件的大小不可超过 16M 哦！换个小点的文件吧！",
            ok: true
          });
        } else if (type == "Q_TYPE_DENIED") {
          window.parent.vdialog({
            title: '系统提示',
            type: 'error',
            modal: true,
            content: "请上传如下格式的文档：<br />rar,zip,doc,xls,docx,xlsx,ppt,pptx,pdf,jpg,gif,png",
            ok: true
          });
        }
      });
      $(initData['uploaderBox']).on('click', ".ctlAllBtn", function() {
        $(initData['uploaderBox']).find(initData['uploaderList'] + " .item").each(function() {
          init[initData['uploaderObj']].upload($(this).attr("id"));
        });
      })
      $(initData['uploaderBox']).on('click', ".delAllBtn", function() {
        $(initData['uploaderBox']).find(initData['uploaderList'] + " .item").each(function() {
          initData['del'] && initData['del']($(this).attr("data"));
          init[initData['uploaderObj']].removeFile($(this).attr("id"));
          $(this).remove();
        });
        $(initData['uploaderBox']).find(".ctlAllBtn , .delAllBtn").remove();
      })
      $(initData['uploaderBox']).on('click', '.delBtn', function() {
        $(initData['uploaderBox']).find(".btns").show();
        if ($(initData['uploaderBox']).find(initData['uploaderList'] + " .item").length == 1) {
          $(initData['uploaderBox']).find(".ctlAllBtn , .delAllBtn").remove();
        };
        init[initData['uploaderObj']].removeFile($(this).parents('.item').attr('id'));
        $(this).parents('.item').remove();
        initData['del'] && initData['del']($(this).parents('.item').attr("data"));
      })
      $(initData['uploaderBox']).on('click', '.startBtn', function() {
        init[initData['uploaderObj']].upload($(this).parents('.item').attr('id'));
      })
    },
    moveFilesDirectory: function() {
      if (this.checkFileList.length == 0) {
        window.parent.vdialog({
          type: 'confirm',
          title: '提示',
          content: '您还未选择任何想要移动的文件！',
          ok: function() {},
          modal: true
        });
      } else {
        var _$modal = $('#moveFilesWin');
        _$modal.css('display', 'block');
        _$modal.modal('show');
        var _this = this;
        var param = {
          "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
          "Parameters": {
            "Type": "A"
          }
        };
        var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/filedirectory";
        window.parent.eosCommon.eosAjax(url, "GET", param, "json", function(result) {
          if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
            var zNodes = result.Data.Result;
            var setting = {
              data: {
                simpleData: {
                  enable: true
                }
              },
              callback: { onClick: onClick }
            };
            var fileTreeObj = $("#fileTree");
            $.fn.zTree.init(fileTreeObj, setting, zNodes, "TreeMenu");

            function onClick(e, treeId, treeNode) {
              var zTree = $.fn.zTree.getZTreeObj("fileTree");
              var nodes = zTree.getNodes();
              if (treeNode.level == 0) {
                zTree.cancelSelectedNode(nodes[0]);
              } else {
                _this.ToDirectoryId = treeNode.id;
                _this.showMoveSaveBtn = true;
              }
            }
          }
        });
      }
    },
    fileMoveTo: function() {
      var _this = this;
      var param = {
        "AccessToken": window.parent.eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "FromDirectoryId": this.fileId,
          "ToDirectoryId": this.ToDirectoryId,
          "FileIds": this.checkFileList
        }
      };
      var url = window.parent.eosCommon.ENTERPRISE_API + "api/project/movefile";
      window.parent.eosCommon.eosAjax(url, "Put", param, "json", function(result) {
        if (window.parent.eosCommon.checkCode(result.State, result.Message)) {
          window.parent.eosCommon.eosMessage('success', window.parent.eosCommon.MOVE_FILE);
          var _$modal = $('#moveFilesWin');
          _$modal.modal('hide');
          _this.getUpdataFileList(_this.fileId);
          _this.showMoveSaveBtn = false;
          _this.checkFileList = [];
          _this.checked = '';
        }
      });
    },
    checkedAll: function() {
      var _this = this;
      console.log("aaaa" + _this.fileList)
      if (_this.fileList) {
        if (!_this.checked) {
          _this.checkFileList = [];
        } else {
          _this.fileList.forEach(function(item) {
            if (item.IsDirectory == 0) {
              _this.checkFileList.push(item.FileId)
            }
          });
        }
      } else {
        _this.checked = '';
      }
    },
    search: function() {}
  },
  watch: {
    'checkFileList': {
      handler: function() {
        var ln = 0;
        this.fileList.forEach(function(item) {
          if (item.IsDirectory == 0) {
            ln++;
          }
        });
        if (this.checkFileList.length === ln) {
          this.checked = true;
        } else {
          this.checked = false;
        }
      }
    }
  },
  updated: function() {
    eosCommon.eosOperators(eosCommon.eosOperDataHandle());
  },
  mounted: function() {
    var _this = this;
    if (this.propsData.ProjectId) {
      this.projectId = this.propsData.ProjectId;
      this.getDirectoryList('管理制度', 1);
      $('#d-searchText').bind('keypress', function(event) {
        if (event.keyCode == "13") {
          _this.getUpdataFileList(_this.fileId)
        }
      });

    } else {
      this.projectId = '';
      _this.getProjectList();
      return;
    }







  }
}

</script>
<style>
@import '/static/css/files_tree.css';
#fileManager .create_ele {
  line-height: 25px;
}

#fileManager .create_ele em {
  display: inline-block;
  width: 20px;
  height: 20px;
  margin: 6px 0 0 2px;
  border: 1px solid #ccd6e1;
  padding: 2px;
}

#fileManager .create_ele input {
  width: 100px;
  height: 22px;
  line-height: 18px;
  padding: 0 2px;
  border: 1px solid #ccd6e1;
  margin-top: 5px;
}

#fileManager .fa-check,
#fileManager .checkbox,
#fileManager .radio {
  line-height: 1
}

#fileManager .fa-times {
  margin-top: 5px;
}

#fileManager .fa-check::before {
  color: #6bdb9b;
}

#fileManager .fa-times::before {
  margin-left: 1px;
  color: #eb6557;
}

#fileManager .breadcrumb .b_txt {
  color: #1abc9c
}

#fileManager .eos_uploader_box .item .info {
  padding-left: 35px;
}

#fileManager .eos_uploader_box .item .doc,
#fileManager .eos_uploader_box .item .pdf,
#fileManager .eos_uploader_box .item .xlsx,
#fileManager .eos_uploader_box .item .jpg {
  background-position: 0 3px;
}

#fileManager .editorHomeDirectory,
#fileManager .editorFileDirectory {
  display: none;
}

#fileManager .selectHomeDirectory .editorHomeNormal,
#fileManager .selectFileDirectory .editorFileNormal {
  display: none;
}

#fileManager .selectHomeDirectory .editorHomeDirectory,
#fileManager .selectFileDirectory .editorFileDirectory {
  display: inline-block;
}

#fileManager .file_list_item {
  line-height: 25px;
  padding-top: 14px;
  padding-bottom: 12px;
  width: 100%;
}

#fileManager .file_list_item .checkbox label::before {
  margin-top: 3px;
}

#fileManager .file_list_item .checkbox label::after {
  top: 4px;
}

#fileManager .archives-text {
  height: 24px;
  line-height: 24px;
  display: inline-block;
}

#fileManager .fa-trash-o,
#fileManager .fa-pencil {
  margin: 0 2px 0 2px;
}

#fileManager .archives-left-text {
  font-size: 16px;
  color: #666;
  height: 28px;
  display: inline-block;
  line-height: 28px;
  padding: 2px 0px 0px 5px;
}

#fileManager .editorHomeNormal {
  padding: 0;
}

#fileManager .home-directory-name {
  height: 25px;
  overflow: hidden;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#fileManager .checkbox label::after {
  top: 3px;
}

#fileManager .allCheckFile::before {
  top: 3px;
}

</style>

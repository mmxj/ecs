<template>
    <div id="organization-box" style="position: absolute;top: 0;bottom: 0; left: 15px;right: 15px;background-color: #fff; overflow-x: auto;">
        <div class="no-space-row clearfix" style="background-color: #fff">
            <!--左边——组织架构 开始 background-color: #fff;-->
            <div id="rightAddPart" class="col-xs-12 col-sm-4 col-md-3 col-lg-2 pull-left">
                <div class="EoslistTitle"><i class="fa fa-sitemap"></i>组织架构</div>
                <!--组织架构树节点——开始-->
                <div id="treeDemo" class="eosOrg"></div>
                <!--组织架构树节点——结束-->
                <div class="rMenu">
                    <ul class="nav navbar-nav navbar-right pull-right">
                        <li class="dropdown hidden-sm hidden-xs">
                            <ul class="dropdown-menu">
                                <!-- <li class="btnAddCompany" v-on:click="btnAddCompany()">
                                    <a><i class="fa fa-plus m-r-5"></i>新增下属公司</a>
                                </li> -->
                                <li id="btnAddPartTree" v-on:click="btnAddPartTree()">
                                    <a><i class="fa fa-plus m-r-5"></i>新增下级部门</a>
                                </li>
                                <li id="btnEditCompany" v-on:click="btnEditCompany()">
                                    <a><i class="fa fa-pencil m-r-5"></i>编辑公司 </a>
                                </li>
                                <li id="btnEditPartTree" v-on:click="btnEditPartTree()">
                                    <a><i class="fa fa-pencil m-r-5"></i>编辑部门</a>
                                </li>
                                <li  id="btnDelPartTree" v-on:click="btnDelPartTree()">
                                    <a><i class="fa fa-trash m-r-5"></i>删除部门</a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
            <!--左边——组织架构 结束-->
            <!--右边——添加子公司/部门 开始-->
            <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10 b-l-1">
                <div id="divDataTableView" style=" padding: 10px 15px 15px 15px;" class=" m-page table-responsive">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="size20 font-bold">员工管理</span>
                        </div>
                    </div>
                    <hr class="divider mb-10 mt-10">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="OrgTopAligin OperatorInsert">
                                <button id="btnAddCompanyUser" type="button" class="btn btn-default" v-on:click="btnAddCompanyUser()">
                                    <i class="fa fa-plus m-r-5"></i>新增员工
                                </button>
                            </span>
                            <span class="OrgTopAligin OperatorImports">
                                <button id="UserImport" type="button" class="btn btn-default" v-on:click="UserImport()">
                                    批量导入
                                </button>
                            </span>
                            <span class="OrgTopAligin OperatorEdit" v-if="is_CompanySet == 1">
                                <button type="button" class="btn btn-default" v-on:click="btnEditCompany()">
                                    公司设置
                                </button>
                            </span>
                            <span class="OperatorSearch">
                            	<span class="OrgTopAligin">
                                <input id="txtQueryKeywords" type="text" class="form-control w-128" placeholder="工号/姓名/部门">
                            </span>
                            <span class="OrgTopAligin">
                                <button id="btnQuery" type="button" class="btn btn-default waves-effect waves-light" v-on:click="btnQuery()">
                                    <i class="fa fa-search m-r-5"></i>查找
                                </button>
                            </span>
                            </span>
                        </div>
                    </div>
                    <table id="example4" class="table table-striped table-bordered" width="100%">
                        <thead>
                        <tr>
                            <th>序号</th>
                            <th>工号</th>
                            <th>姓名</th>
                            <th>工作手机</th>
                            <th>入职时间</th>
                            <th>部门</th>
                            <th>职位</th>
                            <th>状态</th>
                            <th style="min-width: 70px;">操作</th>
                        </tr>
                        </thead>
                    </table>
                </div>
                <div id="divImportCompanyUser" class="org-box table-responsive" style="display: none; margin-bottom: 0px!important;">
                    <div class="row">
                        <div class="col-md-6">
                            <span class="ContentTitle size20 font-bold"></span>
                        </div>
                    </div>
                    <hr class="divider mb-10 mt-10">
                    <div class="row">
                        <div class="col-md-12">
                            <div id="fileBox">
                                <div class="alert alert-info alert-dismissable">
                                    <strong>导入说明</strong> 1、下载员工导入模板，在对应列填上相应数据。注意，文件大小请勿超过2MB,员工导入条数不超过100条
                                    <span class="label label-info p-8">
                                        <a class="text-white" href="../../../../static/doc/员工导入模板.xlsx" target="_blank">下载员工导入模版</a>
                                    </span>
                                </div>
                            </div>
                            <div class="col-lg-12 space-row-10">
                                <div id="fileBox1"></div>
                            </div>
                            <div class="mt-20">
                                <div class="form-group">
                                    <div class="bg-white">
                                        <table id="viewImport" class="table table-striped table-bordered" width="100%">
                                            <thead>
                                            <tr>
                                                <th>序号</th>
                                                <th>姓名</th>
                                                <th>性别</th>
                                                <th>入职时间</th>
                                                <th>手机号码</th>
                                                <th>工作电话</th>
                                                <th>电子邮箱</th>
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
                                    <button type="button" class="btnReturn btn btn-white pull-left" v-on:click="btnReturn()">取消</button>
                                    <button id="btnSaveTemplateData" type="submit" class="btn btn-default waves-effect waves-light pull-left" v-on:click="btnSaveTemplateData()">保存</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="divAddCompanyUser" class="org-box table-responsive" style="display: none; margin-bottom: 0px!important;">
                    <div class="row">
                        <div class="col-md-6">
                            <span class="ContentTitle size20 font-bold"></span>
                        </div>
                        <div class="col-md-6">
                            <button type="button" class="btnReturn btn btn-white pull-right" v-on:click="btnReturn()"><i class="fa fa-mail-reply-all m-r-5"></i>返回
                            </button>
                        </div>
                    </div>
                    <hr class="divider mb-10 mt-10">
                    <div class="row">
                        <div id="verifyCheckUser">
                            <div class="col-md-12">
                                <div class="form-horizontal content-box ">
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>姓名</label>
                                        <div class="col-lg-2 col-xs-3">
                                            <span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
                                            <input id="txtChineseName" type="text" maxlength="12" class="form-control required" data-valid="isNonEmpty||isZhEnNum" data-error="姓名不能为空||必须由2-10位的中文、数字或字母组成" placeholder="请输入姓名"/>
                                            <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                        </div>
                                        <div class="col-lg-1 col-xs-2">
                                            <label class="content-title-left pull-right">英文名</label>
                                        </div>
                                        <div class="col-lg-2 col-xs-3">
                                            <input id="txtEnglishName" type="text" maxlength="12" class="form-control" placeholder="请输入英文名"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>性别</label>
                                        <div class="col-lg-5 col-xs-8" style="padding-top: 1px;">
                                            <div class="radio radio-custom radio-inline">
                                                <input type="radio" name="radioGender" value="1" id="radioGender1" checked>
                                                <label for="radioGender1">
                                                    男
                                                </label>
                                            </div>
                                            <div class="radio radio-primary radio-inline">
                                                <input type="radio" name="radioGender" value="0" id="radioGender2">
                                                <label for="radioGender2">
                                                    女
                                                </label>
                                            </div>
                                            <div class="radio radio-primary radio-inline">
                                                <input type="radio" name="radioGender" value="2" id="radioGender3">
                                                <label for="radioGender3">
                                                    保密
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-horizontal content-box ">
                                	<div v-show="isAdd" class="form-group">
											<label class="content-title-left">
					                                    <em class="ak_required_em">*</em>账号角色
					                                </label>
											<div class="col-lg-5  col-xs-8">
												<span class="valid-form-group">
					                                <label id="lblNameMag2" class="focus valid select_tips"></label>
					                           	</span>
												<select id="selAccountType2" v-model='addAcountRoleId' class="form-control selectpicker" data-style="btn-white">
													<option value="">账号角色</option>
													<option v-for="item in roleLists" :value="item.RoleId">{{item.RoleName}}</option>
												</select>
												<span class="ie8 ion-close-circled close hide text-danger valid-input-icon"></span>
												<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
											</div>
										</div>
                                    <div class="form-group">
                                        <label class="content-title-left">部门</label>
                                        <div class="col-lg-5 col-xs-8">
                                            <select-department></select-department>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="content-title-left">
                                            职位
                                        </label>
                                        <div class="col-lg-5 col-xs-8">
                                            <span class="input-group">
                                                <input id="txtPositionName" type="text" maxlength="100" class="form-control" placeholder="请选择职位" disabled="disabled"/>
                                                <span class="input-group-addon cursor" v-on:click="getPosition()"><span class="fa fa-bars"></span></span>
                                                <input type="hidden" id="hidPositionId" value=""/>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="content-title-left">
                                            直接上司/主管
                                        </label>
                                        <div class="col-lg-5 col-xs-8">
                                            <select-direct-supervisor></select-direct-supervisor>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="content-title-left">
                                            汇报人
                                        </label>
                                        <div class="col-lg-5 col-xs-8">
                                            <select-report></select-report>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>入职时间</label>
                                        <div class="col-lg-5 col-xs-8">
                                            <span class="input-group date form_date" data-date-format="yyyy-mm-dd" data-link-field="dtp_input1" data-link-format="yyyy-mm-dd">
                                                <input id="txtJoinDate" class="form-control required" size="16" type="text" value="" readonly placeholder="请选择入职时间" data-valid="isNonEmpty" data-error="入职时间不能为空">
                                                <div style="position: absolute;">
                                                    <span class="valid-form-group-addon">
                                                        <label class="focus valid"></label>
                                                    </span>
                                                </div>
                                                <span class="valid-form-icon">
                                                    <span class="ion-close-circled close hide text-danger valid-error"></span>
                                                    <label class="fa fa-check-circle blank hide text-success valid-success"></label>
                                                </span>
                                                <span class="input-group-addon"><span class="glyphicon glyphicon-th"></span></span>
                                            </span>
                                            <input type="hidden" id="dtp_input1" value=""/>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-horizontal content-box ">
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>员工身份</label>
                                        <div class="col-lg-8 col-xs-8" style="padding-top: 1px;">
                                            <div class="radio radio-custom radio-inline">
                                                <input type="radio" name="radioIdentityState" value="0" id="radioIdentityState1" checked>
                                                <label for="radioIdentityState1">
                                                    普通员工
                                                </label>
                                            </div>
                                            <div class="radio radio-primary radio-inline">
                                                <input type="radio" name="radioIdentityState" value="1" id="radioIdentityState2">
                                                <label for="radioIdentityState2">
                                                    上级/主管/负责人
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-horizontal content-box ">
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>工作手机：</label>
                                        <div class="col-lg-2 col-xs-3">
                                            <span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
                                            <input id="txtWorkMobile" type="text" maxlength="11" class="form-control required" data-valid="isNonEmpty||isPhone" data-error="工作手机不能为空||手机号码格式不正确" placeholder="请输入工作手机号码"/>
                                            <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                        </div>
                                        <div class="col-lg-1 col-xs-2">
                                            <label class="content-title-left">工作电话</label>
                                        </div>
                                        <div class="col-lg-2 col-xs-3">
                                            <input id="txtWorkPhone" type="text" maxlength="20" class="form-control" placeholder="请输入工作电话"/>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="content-title-left">电子邮箱</label>
                                        <div class="col-lg-5 col-xs-8">
                                            <input id="txtWorkEmail" type="text" maxlength="100" class="form-control" placeholder="请输入电子邮箱"/>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-horizontal content-box ">
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>状态</label>
                                        <div class="col-lg-5 col-xs-8">
                                            <div class="radio radio-custom radio-inline">
                                                <input type="radio" name="radioIsQuit" value="0" id="radioIsQuit1" checked>
                                                <label for="radioIsQuit1">
                                                    在职
                                                </label>
                                            </div>
                                            <div class="radio radio-primary radio-inline">
                                                <input type="radio" name="radioIsQuit" value="1" id="radioIsQuit2">
                                                <label for="radioIsQuit2">
                                                    离职
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-horizontal content-box ">
                                    <div class="form-group">
                                        <label class="content-title-left">备注</label>
                                        <div class="col-lg-5 col-xs-8">
                                            <textarea maxlength="100" id="txtRemark" class="form-control" placeholder="请输入备注信息"></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-box-footer">
                                    <div class="form-group">
                                        <label class="content-title-left"></label>
                                        <div class="col-lg-5 col-xs-8 pl-22">
                                            <button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="btnReturn()">取消</button>
                                            <button id="btnAddEdit" type="submit" class="btn btn-default pull-left" data-dismiss="modal"
                                                    data="" v-on:click="btnAddEdit()">
                                                确定
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="divAddEditCompanyView" class="org-box table-responsive" style="display: none">
                    <div class="row">
                        <div class="col-md-6">
                            <label class="ContentTitle size20 font-bold">企业管理</label>
                        </div>
                        <div class="col-md-6">
                            <button type="button" class="btnReturn btn btn-white pull-right" v-on:click="btnReturn()"><i class="fa fa-mail-reply-all m-r-5"></i>返回
                            </button>
                        </div>
                    </div>
                    <hr class="divider mt-5">
                    <ul class="nav nav-tabs">
                        <li id="viewCompanyInfo" class="" v-on:click="viewCompanyInfo()">
                            <a>
                                <span class="visible-xs"><i class="fa fa-home"></i></span>
                                <span class="hidden-xs">基本信息</span>
                            </a>
                        </li>
                        <li id="viewLicenses" class="" v-on:click="viewLicenses()">
                            <a>
                                <span class="visible-xs"><i class="fa fa-home"></i></span>
                                <span class="hidden-xs">资质证书</span>
                            </a>
                        </li>
                    </ul>
                    <div class="tab-content">
                        <div id="CompanyBaseInfo" class="tab-pane p-0 active">
                            <div class="col-lg-12">
                                <div class="row">
                                    <div class="form-horizontal content-box">
                                        <div class="form-group">
                                            <label class="content-title-left"><em class="ak_required_em">*</em>企业简称</label>
                                            <div class="col-lg-6 col-xs-9">
                                                <span class="valid-form-group">
                                                    <label class="focus valid"></label>
                                                </span>
                                                <input id="txtCompanyShortName" type="text" maxlength="50" class="form-control required" data-valid="isNonEmpty||between:1-50" data-error="企业简称不能为空||企业简称长度1-50位" placeholder="请输入企业简称，且长度不超过50个字符"/>
                                                <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                                <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="content-title-left"><em class="ak_required_em">*</em>企业全称</label>
                                            <div class="col-lg-6 col-xs-9">
                                                <span class="valid-form-group">
                                                    <label class="focus valid"></label>
                                                </span>
                                                <input id="txtCompanyFullName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||between:1-25" data-error="企业全称不能为空||企业全称长度1-25位" placeholder="请输入企业全称，且长度不超过25个字符"/>
                                                <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                                <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="content-title-left"><em class="ak_required_em">*</em>所属行业</label>
                                            <div class="col-lg-6 col-xs-9">
                                                <select id="selIndustryId" class="form-control selectpicker" data-size="8" data-style="btn-white">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-horizontal content-box ">
                                        <div class="form-group">
                                            <label class="content-title-left">
                                                <em class="ak_required_em">*</em>区域地址
                                            </label>
                                            <div class="col-xs-2">
                                                <select id="province" class="form-control selectpicker" data-size="8" data-style="btn-white" tabindex="-98"></select>
                                            </div>
                                            <div class="col-xs-2">
                                                <select id="city" class="form-control selectpicker" data-size="8" data-style="btn-white" tabindex="-98"></select>
                                            </div>
                                            <div class="col-xs-2">
                                                <select id="district" class="form-control selectpicker" data-size="8" data-style="btn-white" tabindex="-98"></select>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="content-title-left">联系地址</label>
                                            <div class="col-lg-6 col-xs-9">
                                                <input id="txtAddress" type="text" class="form-control" placeholder="请输入联系地址"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-horizontal content-box ">
                                        <div class="form-group">
                                            <label class="content-title-left"><em class="ak_required_em">*</em>负责人</label>
                                            <div class="col-lg-6 col-xs-9">
                                                <span class="valid-form-group">
                                                    <label class="focus valid"></label>
                                                </span>
                                                <input id="txtContactPerson" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||between:1-25" data-error="负责人名称不能为空||负责人名称长度1-25位" placeholder="请输入负责人"/>
                                                <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                                <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="content-title-left"><em class="ak_required_em">*</em>手机号码</label>
                                            <div class="col-lg-2 col-xs-3">
                                                <span class="valid-form-group">
                                                    <label class="focus valid"></label>
                                                </span>
                                                <input id="txtContactPersonMobile" type="text" maxlength="11" class="form-control required" data-valid="isNonEmpty||isPhone" data-error="手机号码不能为空||手机号码格式不正确" placeholder="请输入手机号码"/>
                                                <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                                <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                            </div>
                                            <div class="col-lg-2 col-xs-3">
                                                <label class="content-title-left text-right pull-right">办公电话</label>
                                            </div>
                                            <div class="col-lg-2 col-xs-3">
                                                <input id="txtPhone" type="text" maxlength="12" class="form-control" placeholder="请输入办公电话"/>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="content-title-left text-right">传真</label>
                                            <div class="col-lg-2 col-xs-3">
                                                <input id="txtFax" type="text" maxlength="12" class="form-control" placeholder="请输入传真"/>
                                            </div>
                                            <div class="col-lg-2 col-xs-3">
                                                <label class="content-title-left pull-right">邮箱</label>
                                            </div>
                                            <div class="col-lg-2 col-xs-3">
                                                <input id="txtEmail" type="text" class="form-control" placeholder="请输入邮箱"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-horizontal content-box ">
                                        <div class="form-group">
                                            <label class="content-title-left">LOGO图片</label>
                                            <div class="col-xs-6">
                                                <div id="imgBox1"></div>
                                                <label id="lblResourceId1" style="display:none;"></label>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label class="content-title-left">企业封面</label>
                                            <div class="col-xs-6">
                                                <div id="imgBox2"></div>
                                                <label id="lblResourceId2" style="display:none;"></label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-horizontal content-box ">
                                        <div class="form-group">
                                            <label class="content-title-left">公司简介</label>
                                            <div class="col-lg-6 col-xs-9">
                                                <textarea id="txtDescription" maxlength="100" class="form-control" placeholder="请输入公司简介"></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="content-box-footer">
                                        <div class="form-group">
                                            <label class="content-title-left"></label>
                                            <div class="col-lg-5 col-xs-8 pl-22">
                                                <button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="btnReturn()">取消</button>
                                                <button id="btnAddEditCompany" type="submit" class="btn btn-default pull-left" data-dismiss="modal"
                                                        data="" v-on:click="btnAddEditCompany()">
                                                    确定
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="Certification" class="tab-pane p-0">
                            <div class="row mt-10 mb-10">
                                <div class="col-md-12 col-sm-6">
                                    <div class="alert alert-info">
                                        <strong>资质证书上传说明</strong> 1、上传文件必须的是gif，jpg，jpeg，bmp，png！
                                        <span class="label label-info">
                                            <a v-on:click="btnAddLicenses()">
                                                上传文件
                                            </a>
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div id="viewEditLicenses">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!--右边——添加子公司/部门 结束-->
        </div>
        <div id="modal-cleosAccount" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="win-close" data-dismiss="modal">×</button>
                    <button id="btnSaveAccount" type="button" class="sava" v-on:click="btnSaveAccount()"><i class='fa fa-save m-r-5'></i>保存</button>
                    <h4 id="ModuleTitle" class="modal-title"></h4>
                </div>
                <div id="verifyCheckAccount" style="display: none;">
                    <!--添加帐号登录-->
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="form-horizontal content-box">
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>账号</label>
                                        <div class="col-lg-8">
                                            <span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
                                            <input id="txtMobile" type="text" maxlength="100" class="form-control required" data-valid="isNonEmpty||isPhone" data-error="工作手机不能为空||手机号码格式不正确" placeholder="手机号码"/>
                                            <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>用户名</label>
                                        <div class="col-lg-8">
                                            <span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
                                            <input id="txtUserName" type="text" maxlength="100" class="form-control required" data-valid="isNonEmpty" data-error="密码不能为空" placeholder="用户名"/>
                                            <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
										<label class="content-title-left"><em class="ak_required_em">*</em>账号角色</label>
                                        <div class="col-lg-8">
	                                        <select name="" id="roleSelects" v-model="RoleId" class="form-control selectpicker" data-style="btn-white">
												<option :value="item.RoleId" v-for="(item, index) in roleLists">{{item.RoleName}}</option>
											</select>
                                        </div>
									</div>
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>密码</label>
                                        <div class="col-lg-8">
                                            <span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
                                            <input id="txtPassword" type="password" maxlength="25" class="form-control required" data-valid="isNonEmpty||between:6-25" data-error="密码不能为空||密码长度6-25位" placeholder="***"/>
                                            <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="content-title-left"><em class="ak_required_em">*</em>确认密码</label>
                                        <div class="col-lg-8">
                                            <span class="valid-form-group">
                                                <label class="focus valid"></label>
                                            </span>
                                            <input id="txtPasswordtwo" type="password" maxlength="25" class="form-control required" data-valid="isNonEmpty||isRepeat:txtPassword" data-error="确认密码不能为空||两次密码不一致" placeholder="***"/>
                                            <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                            <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--添加帐号登录-->
                </div>
                <div id="verifyCheckDepartment" style="display: none;">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="form-horizontal content-box mt-0">
                                <div id="treeParentName" class="form-group">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>总公司</label>
                                    <div class="col-lg-8 pt-7">
                                        <label id="lblParentName" style="line-height: 32px;"></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="content-title-left"><em class="ak_required_em">*</em>部门名称</label>
                                    <div class="col-lg-8">
                                        <span class="valid-form-group">
                                            <label class="focus valid"></label>
                                        </span>
                                        <input id="txtAddEditName" type="text" maxlength="20" class="form-control required" data-valid="isNonEmpty||between:2-20" data-error="部门名称不能为空||部门名称长度2-20位" placeholder="部门名称"/>
                                        <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                        <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="verifyCheckLicenses" class="modal-body nicescroll pr-45" style="display: none;">
                    <div class="row pt-20">
                        <div class="form-group">
                            <span class="col-sm-3 control-label text-right pt-5">
                                <em class="ak_required_em">*</em>证书名称：
                            </span>
                            <div class="col-sm-9 text-muted pull-right">
                                <input id="txtLicensesName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||between:1-25" data-error="证书名称不能为空||证书名称长度1-25位" placeholder="证书名称"/>
                                <span class="ie8 ion-close-circled close hide text-danger font-16 m-t-3"></span>
                                <label class="fa fa-check-circle blank hide text-success font-16 m-t-3"></label>
                                <label class="focus valid"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row pt-20">
                        <div class="form-group">
                            <span class="col-sm-3 control-label text-right pt-5">
                                <em class="ak_required_em">*</em>证书编号：
                            </span>
                            <div class="col-sm-9 text-muted pull-right">
                                <input id="txtLicensesNumber" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||between:1-25" data-error="证书编号不能为空||证书编号长度1-25位" placeholder="证书编号"/>
                                <span class="ie8 ion-close-circled close hide text-danger font-16 m-t-3"></span>
                                <label class="fa fa-check-circle blank hide text-success font-16 m-t-3"></label>
                                <label class="focus valid"></label>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="form-group">
                            <span class="col-sm-3 control-label text-right pt-25">
                                <em class="ak_required_em">*</em>上传证书：
                            </span>
                            <div class="col-sm-9 text-muted pull-left pt-20">
                                <div id="imgBox3"></div>
                                <div class="clearfix"></div>
                                <label id="lblResourceIdError" class="focus valid error"></label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="modal-cleosPositions" class="modal fade" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true" style="display: none;">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="win-close" data-dismiss="modal">×</button>
                    <button id="btnSavePositions" type="button" class="sava" data-dismiss="modal" aria-hidden="true" v-on:click="isChecked()">
                        <i class='fa fa-save m-r-5'></i>确定
                    </button>
                    <h4 class="modal-title">选择职位</h4>
                </div>
                <div>
                    <div class="modal-body nicescroll">
                        <div id="isPostion" class="row pt-10">
                            <div class="col-lg-6" v-for="item in PositionsItem">
                                <div class="widget-panel-modal user-box b-1">
                                    <div class="checkbox checkbox-info checkbox-circle pd">
                                        <input v-bind:id="item.PositionId" type="checkbox" name="cboxPostion" v-bind:value="item.PositionTitle">
                                        <label v-bind:for="item.PositionId">
                                            {{item.PositionTitle}}
                                        </label>
                                    </div>
                                    <div class="contact-action-i">
                                        <span v-on:click="btnDelPosition(item.PositionId)"><i class="fa fa-trash-o text-danger"></i></span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6" id="checkPostion">
                                <div id="addPostionView" class="widget-panel user-box b-1" v-on:click="divPostionAdd()">
                                    <h4 class="m-0 text-grey"><span data-plugin="counterup">新增职位</span></h4>
                                    <h2 class="m-0 text-dark"><i class="fa fa-plus text-grey"></i></h2>
                                </div>
                                <div class="editPostionView widget-panel-modal user-box b-1" style="display: none">
                                    <span class="OrgTopAligin">
                                        <span class="valid-form-group" style="left: 7px;">
                                            <label class="focus valid"></label>
                                        </span>
                                        <input id="addPostionName" type="text" maxlength="100" class="form-control required" data-valid="isNonEmpty" data-error="职位不能为空" placeholder="请输入职位名称"/>
                                        <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                                        <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
                                    </span>
                                    <span class="OrgTopAligin">
                                        <button type="button" class="btn btn-default" v-on:click="divPostionSava()">保存</button>
                                    </span>
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
    import selectDepartment from '../../../common/select-department.vue';
    import selectDirectSupervisor from '../../../common/direct-supervisor.vue';
    import selectReport from '../../../common/select-report.vue';
    var table;
    var EmployeeId;
    var CompanyId;
    var DepartmentId = "";
    var treeNode;
    var zTree;
    var rMenu;
    var setting;
    var query_id = "";
    var IDMark_A = "_a";
    var Company_id = "";
    export default {
        data: function() {
            return {
                query_id:'',
                saveImportData: [],
                errorSign: 0,
                is_CompanySet: 2,
                CompanyId: '',
                LicensesImage: [],
                newImage: 0,
                CompanyDetailId: '',
                PositionsItem: [],
                isDepartment: false,
                DepartmentName: '',
                DepartmentId: '',
                PositionName: '',
                PositionId: [{"PositionId": "", "PositionTitle": ""}],
                selectTreeNodeId: '',
                isReload:false,
                isDeleteShow:true,
                RoleId:'',
                roleLists:[],
                addAcountRoleId:'',
                isAdd:false
            }
        },
        components: {
            selectDepartment,
            selectDirectSupervisor,
            selectReport
        },
        methods: {
        	getRoleLists() {
				let vm = this;
				//获取角色信息
				let param = {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"CompanyId": eosCommon.storage.get('CompanyId'), //公司id，必填									
						"Keywords": ''
					}
				};
				let url = eosCommon.COMMON_API + "api/role/queryrole";
				eosCommon.eosAjax(url, "GET", param, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.roleLists = result.Data.Result;
						vm.RoleId=vm.roleLists[0].RoleId;
						vm.addAcountRoleId=vm.roleLists[0].RoleId;
						vm.$nextTick(function() {
							$("#roleSelects").selectpicker('refresh');
							$("#selAccountType2").selectpicker('refresh');
						})
					}
				})
			},
            load_Setting: function() {
                var _this = this;
                rMenu = $(".rMenu");
                setting = {
                    view: {
                        selectedMulti: false,
                        showIcon: true,
                        dblClickExpand: true,
                        addHoverDom: this.addHoverDom,
                        removeHoverDom: this.removeHoverDom
                    },
                    edit: {
                        enable: true,
                        showRemoveBtn: false,
                        showRenameBtn: false
                    },
                    data: {
                        keep: {
                            parent: true,
                            leaf: true
                        },
                        simpleData: {
                            enable: true
                        }
                    },
                    callback: {
                        dblonClick: this.onClick,
                        beforeDrag: this.beforeDrag,
                        beforeClick: function(treeId, treeNode) {
                            var zTree = $.fn.zTree.getZTreeObj("Cleostree");
                            _this.selectTreeNodeId = treeNode.id;
                            if(treeNode.isLeaf) {
                                zTree.expandNode(treeNode);
                                return false;
                            } else {
                                _this.getCompanyId(treeNode);
                                _this.query_id = treeNode.id;
                                var levels = treeNode.levels;
                                if(levels == "1") {
                                    _this.is_CompanySet = 1;
                                    Company_id = treeNode.id;
                                    _this.DepartmentName = "";
                                    _this.DepartmentId = "";
                                    table.ajax.reload();
                                }
                                else if(levels == "2") {
                                    _this.is_CompanySet = 2;
                                    Company_id = treeNode.pId;
                                    _this.DepartmentName = treeNode.name;
                                    _this.DepartmentId = treeNode.id;
                                    table.ajax.reload();
                                }
                                document.getElementById("divDataTableView").style.display = "block";
                                document.getElementById("divImportCompanyUser").style.display = "none";
                                document.getElementById("divAddCompanyUser").style.display = "none";
                                document.getElementById("divAddEditCompanyView").style.display = "none";
                                return true;
                            }
                        }
                    }
                };
            },
            getCompanyId: function(treeNode) {
                if(treeNode.levels == "1") {
                    CompanyId = treeNode.id;
                }
                else {
                    this.getCompanyId(treeNode.getParentNode());
                }
            },
            addHoverDom: function(treeId, treeNode) {
                var _this = this;
                var aObj = $("#" + treeNode.tId + IDMark_A);
                if(treeNode.id == treeNode.id) {
                    if($("#diyBtn_" + treeNode.id).length > 0) return;
                    var editStr = "<span class='label' id='diyBtn_" + treeNode.id + "' title='" + treeNode.name + "' onfocus='this.blur();'></span>";
                    aObj.append(editStr);
                    var btn = $("#diyBtn_" + treeNode.id);
                    if(btn) btn.bind("click", function(event) {
                        _this.OnAddClick(event, treeId, treeNode)
                    });
                }
            },
            OnAddClick: function(event, treeId, treeNode) {
                var _this = this;
                var initHeight = $("#LeaseRemind").outerHeight(true);
                if(initHeight) {
                    initHeight = initHeight;
                } else {
                    initHeight = 0;
                }
                if(!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
                    zTree.cancelSelectedNode();
                    this.showRMenu("root", event.clientX - $("#sidebar-left").width(), event.clientY - $("#header").height() - initHeight);
                    //+ $(".body-content").getNiceScroll(0).getScrollTop() 
                } else if(treeNode && !treeNode.noR) {
                    zTree.selectNode(treeNode);
                    this.showRMenu("node", event.clientX - $("#sidebar-left").width(), event.clientY - $("#header").height()  - initHeight);
                    //+ $(".body-content").getNiceScroll(0).getScrollTop()
                }
            },
            showRMenu: function(type, x, y) {
                $(".rMenu ul").show();
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var selNodes = zTree.getSelectedNodes();
                treeNode = selNodes[0];
                var isParent = 1;
                if(treeNode.getParentNode() != null) {
                    isParent = treeNode.getParentNode().levels
                }
                if(treeNode.levels == "1" && treeNode.getParentNode() == null) {
                    $(".btnAddCompany").show();
                    $("#btnEditCompany").show();
                    $("#btnAddPartTree").show();
                    $("#btnEditPartTree").hide();
                    $("#btnDelPartTree").hide();
                }
                else if(treeNode.levels == "1" && treeNode.getParentNode() != null) {
                    $(".btnAddCompany").hide();
                    $("#btnEditCompany").show();
                    $("#btnAddPartTree").show();
                    $("#btnEditPartTree").hide();
                    $("#btnDelPartTree").hide();
                }
                else if(treeNode.levels == "2" && isParent == "1") {
                    $(".btnAddCompany").hide();
                    $("#btnEditCompany").hide();
                    $("#btnAddPartTree").hide()
                    $("#btnEditPartTree").show();
                    $("#btnDelPartTree").show();
                }
                else {
                    $(".btnAddCompany").hide();
                    $("#btnEditCompany").hide();
                    $("#btnAddPartTree").hide()
                    $("#btnEditPartTree").show();
                    $("#btnDelPartTree").show();
                }
                rMenu.css({"top": y + "px", "left": x + "px", "visibility": "visible"});
                $("body").bind("mousedown", this.onBodyMouseDown);
            },
            hideRMenu: function() {
                if(rMenu) rMenu.css({"visibility": "hidden"});
                $("body").unbind("mousedown", this.onBodyMouseDown);
            },
            onBodyMouseDown: function(event) {
                if(!(event.target.id == "rMenu" || $(event.target).parents(".rMenu").length > 0)) {
                    rMenu.css({"visibility": "hidden"});
                }
            },
            removeHoverDom: function(treeId, treeNode) {
                if(treeNode.id == 50) {
                    $("#diyBtn1_" + treeNode.id).unbind().remove();
                    $("#diyBtn2_" + treeNode.id).unbind().remove();
                } else {
                    $("#diyBtn_" + treeNode.id).unbind().remove();
                    $("#diyBtn_space_" + treeNode.id).unbind().remove();
                }
            },
            onClick: function(e, treeId, treeNode) {
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                zTree.expandNode(treeNode);
            },
            beforeDrag: function(treeId, treeNodes) {
                return false;
            },
            load_OrganizationTree: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "Type": 2
                    }
                };
                var url = eosCommon.COMMON_API + "api/common/organization";
                eosCommon.eosAjax(url, "GET", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        $.fn.zTree.init($("#treeDemo"), setting, result.Data, "OrgTreeMenu");
                        zTree = $.fn.zTree.getZTreeObj("treeDemo");
                        if(_this.selectTreeNodeId) {
                            var node = zTree.getNodeByParam("id", _this.selectTreeNodeId);
                            zTree.selectNode(node.id);
                        }
                    }
                });
            },
            load_TableView: function() {
                var _this = this;
                $('#txtQueryKeywords').bind('keypress', function(event) {
                    if(event.keyCode == "13") {
                        table.ajax.reload();
                    }
                });
                table = $('#example4').DataTable({
                    pagingType: "full_numbers",
                    processing: true,
                    deferRender: true,
                    dom: "Bfrtip",
                    buttons: [{
                        extend: "print",
                        exportOptions: {
                            "columns": [1, 2, 3, 4, 5, 6, 7]
                        }
                    }],
                    responsive: !0,
                    serverSide: true,
                    ajax: function(data, callback, settings) {
                        var param = {
                            "AccessToken": eosCommon.storage.get("AccessToken"),
                            "PageSize": data.length,
                            "PageIndex": (data.start / data.length) + 1,
                            "Parameters": {
                                "Keywords": $('#txtQueryKeywords').val().trim(),
                                "Id": _this.query_id,
                                "JoinDateStart": "",
                                "JoinDateEnd": ""
                            }
                        };
                        var url = eosCommon.COMMON_API + "api/employee/query";
                        eosCommon.eosAjax(url, "GET", param, "json", function(result) {
                            if(eosCommon.checkCode(result.State, result.Message)) {
                                var returnData = {};
                                if(result.Data == "") {
                                    returnData.draw = data.draw;
                                    returnData.recordsTotal = 0;
                                    returnData.recordsFiltered = 0;
                                    returnData.data = [];
									$('#btnDelPartTree').show();
                                }
                                else {                                	
                                    returnData.draw = data.draw;
                                    returnData.recordsTotal = result.Data.Total;
                                    returnData.recordsFiltered = result.Data.Total;
                                    returnData.data = result.Data.Result;                            
                          			$('#btnDelPartTree').hide();
                                }
                                callback(returnData);
								eosCommon.eosOperators(eosCommon.eosOperDataHandle());
                                
                            }
                        });
                    },
                    "columns": [
                        {defaultContent: ""},
                        {data: "EmployeeNo"},
                        {data: "ChineseName"},
                        {data: "WorkMobile"},
                        {data: "JoinDate"},
                        {data: "DepartmentName"},
                        {data: "Positions"},
                        {data: "IsQuit"},
                        {data: "AccountFlag"}
                    ],
                    "columnDefs": [
                        {
                            "targets": [7],
                            "render": function(data) {
                                var html = '';
                                if(data == 0) {
                                    html = "在职"
                                }
                                else if(data == 1) {
                                    html = "离职"
                                }
                                return html
                            }
                        },
                        {
                            "targets": [8],
                            "render": function(data) {
                                var html = '';
                                if(data == 0) {
                                    html = "<span class='OperatorBtnView pull-left OperatorInsert' data-toggle='modal' data-target='#modal-cleosAccount' data='1' title='创建员工帐号'><i class='fa fa-cog'></i></span>";
                                }
                                html += "<span class='OperatorBtnDel OperatorDel  pull-right' data='3' title='删除员工'><i class='fa fa-trash-o'></i></span>";
                                html += "<span class='OperatorBtnEdit OperatorEdit pull-right text-left' data='2' title='修改员工信息'><i class='fa fa-pencil'></i></span>";
                                return html
                            }
                        }
                    ]
                });
                table.on('draw.dt', function() {
                    table.column(0, {
                        search: 'applied',
                        order: 'applied'
                    }).nodes().each(function(cell, i) {
                        i = i + 1;
                        var page = table.page.info();
                        var pageno = page.page;
                        var length = page.length;
                        var columnIndex = (i + pageno * length);
                        cell.innerHTML = columnIndex;
                    });
                });
                $('#example4 tbody').on('click', 'tr', function() {
                    if($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        table.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
                $('#example4 tbody').on('click', 'span', function() {
                    var data = table.rows($(this).parents('tr')).data();
                    var isNum = $(this).attr("data");
                    if(isNum == "1") {
                        //创建登录账号 函数
                        EmployeeId = data[0].EmployeeId;
                        $("#ModuleTitle").attr("data", "1");
                        $('#ModuleTitle').text("创建员工账号");
                        $('#verifyCheckAccount').show();
                        $('#verifyCheckDepartment').hide();
                        $('#verifyCheckLicenses').hide();
                        $('#txtMobile').val(data[0].WorkMobile);
                        $('#txtUserName').val(data[0].ChineseName);
                        eosCommon.resetFrom();
                    }
                    else if(isNum == "2") {
                        //编辑信息赋值 函数
                        EmployeeId = data[0].EmployeeId;
                        $('#btnAddEdit').attr("data", "2");
                        $('.ContentTitle').text("修改员工");
                        $('#divAddCompanyUser').show();
                        $("#divDataTableView").hide();
                        $("#divImportCompanyUser").hide();
                        _this.bind_AddEdit(data);
                    }
                    else if(isNum == "3") {
                        //删除信息赋值 函数3
                        EmployeeId = data[0].EmployeeId;
                        vdialog({
                            type: 'confirm',
                            title: '提示',
                            content: eosCommon.DELETE_MSG_ASK,
                            ok: function() {
                                _this.delRequest();
                            },
                            cancel: true,
                            modal: true
                        });
                    }
                });
            },
            btnQuery: function() {
                table.ajax.reload();
            },
            addRequest: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "ChineseName": $('#txtChineseName').val(), //必填
                        "EnglishName": $('#txtEnglishName').val(),
                        "Gender": $('input:radio[name="radioGender"]:checked').val(),//必填
                        "CompanyId": Company_id,//必填
                        "DepartmentId": $('#hidDepartmentId').val(),
                        "Positions": JSON.parse($('#hidPositionId').val()),
                        "DirectSupervisor": $('#hidDirectSupervisorId').val(),
                        "ReportTo": $('#hidReportToId').val(),
                        "WorkSite": "",
                        "JoinDate": $('#txtJoinDate').val(), //必填
                        "IdentityState": $('input:radio[name="radioIdentityState"]:checked').val(), //必填
                        "WorkPhone": $('#txtWorkPhone').val(),
                        "WorkMobile": $('#txtWorkMobile').val(), //必填
                        "WorkEmail": $('#txtWorkEmail').val(),
                        "IsLocked": 0, //必填
                        "IsActive": 1, //必填
                        "IsQuit": $('input:radio[name="radioIsQuit"]:checked').val(), //必填
                        "Remark": $('#txtRemark').val(),
                        "RoleId":_this.addAcountRoleId
                    }
                };
                var url = eosCommon.COMMON_API + "api/employee/insert";
                eosCommon.eosAjax(url, "POST", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                        _this.load_OrganizationTree();
                        table.ajax.reload();
                        _this.btnReturn();
                    }
                });
            },
            editRequest: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "EmployeeId": EmployeeId,
                        "ChineseName": $('#txtChineseName').val(), //必填
                        "EnglishName": $('#txtEnglishName').val(),
                        "Gender": $('input:radio[name="radioGender"]:checked').val(),//必填
                        "DepartmentId": $('#hidDepartmentId').val(),
                        "Positions": JSON.parse($('#hidPositionId').val()),
                        "DirectSupervisor": $('#hidDirectSupervisorId').val(),
                        "ReportTo": $('#hidReportToId').val(),
                        "WorkSite": "",
                        "JoinDate": $('#txtJoinDate').val(), //必填
                        "IdentityState": $('input:radio[name="radioIdentityState"]:checked').val(), //必填
                        "WorkPhone": $('#txtWorkPhone').val(),
                        "WorkMobile": $('#txtWorkMobile').val(), //必填
                        "WorkEmail": $('#txtWorkEmail').val(),
                        "IsLocked": 0, //必填
                        "IsActive": 1, //必填
                        "IsQuit": $('input:radio[name="radioIsQuit"]:checked').val(), //必填
                        "Remark": $('#txtRemark').val()
                    }
                };
                var url = eosCommon.COMMON_API + "api/employee/update";
                eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                        _this.load_OrganizationTree();
                        table.ajax.reload();
                        _this.btnReturn();
                    }
                });
            },
            delRequest: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "EmployeeId": EmployeeId
                    }
                };
                var url = eosCommon.COMMON_API + "api/employee/delete";
                eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                        _this.load_OrganizationTree();
                        table.ajax.reload();
                    }
                });
            },
            btnAddEdit: function() {
                var isNum = $("#btnAddEdit").attr("data");
                if(isNum == "1") {
                    //添加员工
                    if(!verifyCheck._click("verifyCheckUser")) {
                        return false;
                    } else {
                        this.addRequest();
                    }
                }
                else if(isNum == "2") {
                    //编辑员工
                    if(!verifyCheck._click("verifyCheckUser")) {
                        return false;
                    } else {
                        this.editRequest();
                    }
                }
            },
            btnAddCompanyUser: function() {
                var _this=this;
                if(Company_id==''){
                	 vdialog({
                        type: 'warning',
                        title: '提示',
                        content: '请先选择公司！',
                        cancel: true,
                        ok:function(){
                        	
                        },
                        modal: true
                    });
                    return false;
                }
                $('#btnAddEdit').attr("data", "1");
                $('.ContentTitle').text("新增员工");
                $('#divAddCompanyUser').show();
                $("#divDataTableView").hide();
                $("#divImportCompanyUser").hide();
                $("#divAddCompanyUser").getNiceScroll().resize();
                _this.addAcountRoleId=_this.roleLists[0].RoleId;
				_this.$nextTick(function() {
					$("#selAccountType2").selectpicker('refresh');
				})
                _this.bind_AddEdit(null);
            },
            bind_AddEdit: function(data) {
                var _this = this;
                eosCommon.resetFrom();
                if(data == null) {
                	this.isAdd=true;
                    $('#txtChineseName').val("");
                    $('#txtEnglishName').val("");
                    $('#txtDepartmentName,#hidDepartmentId,#txtPositionName,#hidPositionId,#txtDirectSupervisorName,#hidDirectSupervisorId,#txtReportToName,#hidReportToId').val("");
                    $("input[type='radio'][name='radioGender'][value='1']").prop("checked", "checked");
                    var str_before = this.DepartmentName.split('(')[0];
                    $("#txtDepartmentName").val(str_before)
                    $("#hidDepartmentId").val(this.DepartmentId)
                    if(_this.is_CompanySet != 2) {
                        this.DepartmentName = '';
                        this.DepartmentId = '';
                        $('#txtDepartmentName').val(this.DepartmentName);
                        $('#hidDepartmentId').val(this.DepartmentId);
                    }
                    this.PositionName = '';
                    this.PositionId = [{"PositionId": "", "PositionTitle": ""}];
                    $('#txtPositionName').val(this.PositionName);
                    $('#hidPositionId').val(JSON.stringify(this.PositionId));
                    $('#hidDirectSupervisorId').val("");
                    $('#hidReportToId').val("");
                    $('#txtJoinDate').val("");
                    $("input[type='radio'][name='radioIdentityState'][value='0']").prop("checked", "checked");
                    $('#txtWorkPhone').val("");
                    $('#txtWorkMobile').val("");
                    $('#txtWorkEmail').val("");
                    $("input[type='radio'][name='radioIsQuit'][value='0']").prop("checked", "checked");
                    $('#txtRemark').val("");
                }
                else {
                	this.isAdd=false;
                    $('#txtChineseName').val(data[0].ChineseName);
                    $('#txtEnglishName').val(data[0].EnglishName);
                    $("input[type='radio'][name='radioGender'][value='" + data[0].Gender + "']").prop("checked", "checked");
                    this.DepartmentName = data[0].DepartmentName;
                    this.DepartmentId = data[0].DepartmentId;
                    $('#txtDepartmentName').val(data[0].DepartmentName);
                    $('#hidDepartmentId').val(data[0].DepartmentId);
                    this.PositionName = data[0].Positions;
                    this.PositionId = data[0].PositionIds;
                    $('#txtPositionName').val(data[0].Positions);
                    $('#hidPositionId').val(JSON.stringify(data[0].PositionIds));
                    $('#txtDirectSupervisorName').val(data[0].DirectSupervisorName);
                    $('#hidDirectSupervisorId').val(data[0].DirectSupervisor);
                    $('#txtReportToName').val(data[0].ReportToName);
                    $('#hidReportToId').val(data[0].ReportTo);
                    $('#txtJoinDate').val(data[0].JoinDate);
                    $("input[type='radio'][name='radioIdentityState'][value='" + data[0].IdentityState + "']").prop("checked", "checked");
                    $('#txtWorkPhone').val(data[0].WorkPhone);
                    $('#txtWorkMobile').val(data[0].WorkMobile);
                    $('#txtWorkEmail').val(data[0].WorkEmail);
                    $("input[type='radio'][name='radioIsQuit'][value='" + data[0].IsQuit + "']").prop("checked", "checked");
                    $('#txtRemark').val(data[0].Remark);
                }
            },
            btnReturn: function() {
                $("#divDataTableView").show();
                $("#divImportCompanyUser").hide();
                $("#divAddCompanyUser").hide();
                $("#divAddEditCompanyView").hide();
            },
            UserImport: function() {
                var _this = this;
                _this.bindEosBaseDveImport([]);
                $('.ContentTitle').text("批量导入员工");
                $("#divDataTableView").hide();
                $("#divAddCompanyUser").hide();
                $("#divImportCompanyUser").show();
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
                    "AccessToken": eosCommon.storage.get("AccessToken")
                };
                eosCommon.eosUploaderFile({
                    'uploaderObj': 'uploaderFile',
                    'uploaderBox': '.uploader_box1',
                    'uploaderList': '.uploader-list',
                    'initBtn': '#picker',
                    'serverUrl': eosCommon.ENTERPRISE_API + "api/upload/employee",
                    'data': param,
                    'fileNumLimit': 1,
                    'upType': 1,
                    'succ': function(result) {
                        if(eosCommon.checkCode(result.State, result.Message)) {
                            var viewImportData = [];
                            _this.saveImportData = [];
                            _this.errorSign = 0;
                            for(var i = 0; i < result.Data.TotalRows; i++) {
                                var viewTemp = {};
                                viewTemp.RowId = result.Data.UploadData[i]['序号'];
                                viewTemp.ChineseName = result.Data.UploadData[i]['姓名'];
                                viewTemp.Mobile= result.Data.UploadData[i]['手机号码'];
                                viewTemp.Gender= result.Data.UploadData[i]['性别'];
                                viewTemp.JoinDate = result.Data.UploadData[i]['入职时间'];
                                viewTemp.WorkPhone= result.Data.UploadData[i]['工作电话'];
                                viewTemp.Email= result.Data.UploadData[i]['电子邮箱'];
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
                                var saveTemp = {};
                                saveTemp.RowId = result.Data.UploadData[i]['序号'];
                                saveTemp.ChineseName = result.Data.UploadData[i]['姓名'];
                                saveTemp.Mobile= result.Data.UploadData[i]['手机号码'];
                                saveTemp.Gender= result.Data.UploadData[i]['性别'];
                                saveTemp.JoinDate = result.Data.UploadData[i]['入职时间'];
                                saveTemp.WorkPhone= result.Data.UploadData[i]['工作电话'];
                                saveTemp.Email= result.Data.UploadData[i]['电子邮箱'];
                                saveTemp.Remark = result.Data.UploadData[i]['备注'];
                                _this.saveImportData.push(saveTemp);
                            }
                            _this.bindEosBaseDveImport(viewImportData);
                        }
                    },
                    'del': function(result) {
                        var viewImportData = [];
                        _this.saveImportData = [];
                        _this.errorSign = 0;
                        _this.bindEosBaseDveImport(viewImportData);
                    }
                })
            },
            bindEosBaseDveImport: function(viewImportData) {
                var viewImport = $('#viewImport').DataTable({
                    pagingType: "full_numbers",
                    processing: true,
                    deferRender: true,
                    dom: "Bfrtip",
                    buttons: [],
                    responsive: !0,
                    lengthMenu: [[50, 100, 150, -1], [50, 100, 150, "All"]],
                    destroy: true,
                    data: viewImportData,
                    "columns": [
                        {data: "RowId"},
                        {data: "ChineseName"},
                        {data: "Gender"},
                        {data: "JoinDate"},
                         {data: "Mobile"},
                        {data: "WorkPhone"},
                        {data: "Email"},
                        {data: "Remark"},                       
                        {data: "Message"}
                    ],
                    "columnDefs": [
                        {
                            "targets": [8],
                            "render": function(data) {
                                var html = '';
                                if(data == "正确") {
                                    html = "正确";
                                }
                                else {
                                    html = "<p class='text-danger'>" + data + "</p>";
                                }
                                return html
                            }
                        }
                    ]
                });
                $('#viewImport tbody').on('click', 'tr', function() {
                    if($(this).hasClass('selected')) {
                        $(this).removeClass('selected');
                    }
                    else {
                        viewImport.$('tr.selected').removeClass('selected');
                        $(this).addClass('selected');
                    }
                });
            },
            btnSaveTemplateData: function() {
                var _this = this;
                if(this.saveImportData.length <= 0) {
                    vdialog({
                        type: 'error',
                        title: '提示',
                        content: '批量导入中没有正确的数据可导入',
                        cancel: true,
                        modal: true
                    });
                }
                else if(this.errorSign > 0 && this.saveImportData.length > 0) {
                    vdialog({
                        type: 'error',
                        title: '提示',
                        content: '验证结果：' + this.errorSign + '条错误，' + this.saveImportData.length + '条正确，确定继续提交正确的数据吗？',
                        ok: function() {
                            _this.saveImport();
                        },
                        cancel: true,
                        modal: true
                    });
                }
                else {
                    this.saveImport();
                }
            },
            saveImport: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": _this.saveImportData
                };
                var url = eosCommon.COMMON_API + "api/employee/batch";
                eosCommon.eosAjax(url, "POST", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                        _this.load_OrganizationTree()
                        table.ajax.reload();
                        _this.saveImportData = [];
//                      alert(_this.saveImportData)
                        _this.errorSign = 0;
                        _this.bindEosBaseDveImport(_this.saveImportData);
                        _this.btnReturn();
                    }
                });
            },
            btnSaveAccount: function() {
                var isNum = $("#ModuleTitle").attr("data");
                if(isNum == "1") {
                    //添加员工帐号
                    if(!verifyCheck._click("verifyCheckAccount")) {
                        return false;
                    } else {
                        this.saveEmployeeAccount();
                    }
                }
                else if(isNum == "2") {
                    //添加下级部门
                    if(!verifyCheck._click("verifyCheckDepartment")) {
                        return false;
                    } else {
                        this.addDepartment();
                    }
                }
                else if(isNum == "3") {
                    //修改下级部门
                    if(!verifyCheck._click("verifyCheckDepartment")) {
                        return false;
                    } else {
                        this.editDepartment();
                    }
                }
                else if(isNum == "4") {
                    //添加证书
                    if(!verifyCheck._click("verifyCheckLicenses")) {
                        return false;
                    } else {
                        this.isLicensesNull();
                        if(this.LicensesImage.length <= 0) {
                            $('#lblResourceIdError').text("请上传图片");
                            return false;
                        }
                        else if(this.newImage > 0) {
                            $('#lblResourceIdError').text("请先上传新添加的图片");
                            return false;
                        }
                        else {
                            this.addLicensesRequest(this.LicensesImage);
                        }
                    }
                }
                else if(isNum == "5") {
                    //修改证书
                    if(!verifyCheck._click("verifyCheckLicenses")) {
                        return false;
                    } else {
                        this.isLicensesNull();
                        if(this.LicensesImage.length <= 0) {
                            $('#lblResourceIdError').text("请上传图片");
                            return false;
                        }
                        else if(this.newImage > 0) {
                            $('#lblResourceIdError').text("请先上传新添加的图片");
                            return false;
                        }
                        else {
                            this.editLicensesRequest(this.LicensesImage);
                        }
                    }
                }
            },
            saveEmployeeAccount: function() {
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "EmployeeId": EmployeeId,
                        "Mobile": $('#txtMobile').val(),
                        "UserName": $('#txtUserName').val(),
                        "Password": $('#txtPassword').val(),
                        "RoleId": this.RoleId
                    }
                };
                var url = eosCommon.COMMON_API + "api/employee/account";
                eosCommon.eosAjax(url, "POST", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", "创建成功");
                        $("#modal-cleosAccount").modal("hide");
                        table.ajax.reload();
                    }
                });
            },
            get_DirectSupervisor: function() {
                if(tempUser != null || tempUser != '') {
                    $('#txtDirectSupervisorName').val(tempUser.name);
                    $('#hidDirectSupervisorId').val(tempUser.id);
                }
            },
            get_ReportTo: function() {
                if(tempUser != null || tempUser != '') {
                    $('#txtReportToName').val(tempUser.name);
                    $('#hidReportToId').val(tempUser.id);
                }
            },
            openDepartment: function() {
                $('#modal-cleosDepartment').modal("show")
                this.isDepartment = true;
            },
            cleosDepartment: function() {
                $('#modal-cleosDepartment').modal("hide")
                this.isDepartment = false;
            },
            get_Department: function() {
                $('#modal-cleosDepartment').modal("hide")
                this.isDepartment = false;
                if(tempDepartment != null || tempDepartment != '') {
                    if(this.DepartmentId != tempDepartment.DepartmentId) {
                        this.PositionName = '';
                        this.PositionId = [{"PositionId": "", "PositionTitle": ""}];
                        $('#txtPositionName').val(this.PositionName);
                        $('#hidPositionId').val(JSON.stringify(this.PositionId));
                    }
                    this.DepartmentName = tempDepartment.DepartmentName;
                    this.DepartmentId = tempDepartment.DepartmentId;
                }
                else {
                    this.DepartmentName = "";
                    this.DepartmentId = "";
                    this.PositionName = '';
                    this.PositionId = [{"PositionId": "", "PositionTitle": ""}];
                    $('#txtPositionName').val(this.PositionName);
                    $('#hidPositionId').val(JSON.stringify(this.PositionId));
                }
            },
            btnAddCompany: function() {
                this.hideRMenu();
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var selNodes = zTree.getSelectedNodes();
                treeNode = selNodes[0];
                DepartmentId = treeNode.id;
                $('#btnAddEditCompany').attr("data", "1");
                $('.ContentTitle').text("新增公司");
                $("#divDataTableView").hide();
                $("#divImportCompanyUser").hide();
                $("#divAddCompanyUser").hide();
                $("#divAddEditCompanyView").show();
                $("#viewCompanyInfo").show();
                $('#viewCompanyInfo').attr("class", "active");
                $("#CompanyBaseInfo").show();
                $("#viewLicenses").hide();
                $("#Certification").hide();
                this.bind_AddEditCompanyInfo(null);
            },
            btnEditCompany: function() {
                this.hideRMenu();
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var selNodes = zTree.getSelectedNodes();
                if(selNodes[0].id) {
                    var treeNode = selNodes[0];
                    DepartmentId = treeNode.id;
                } else {
                    DepartmentId = selNodes[0];
                }
                $('#btnAddEditCompany').attr("data", "2");
                $('.ContentTitle').text("编辑公司");
                $("#divDataTableView").hide();
                $("#divImportCompanyUser").hide();
                $("#divAddCompanyUser").hide();
                $("#divAddEditCompanyView").show();
                $("#divAddEditCompanyView").getNiceScroll().resize();
                $("#viewCompanyInfo").show();
                $('#viewCompanyInfo').attr("class", "active");
                $("#CompanyBaseInfo").show();
                $("#viewLicenses").show();
                $('#viewLicenses').attr("class", "");
                $("#Certification").hide();
                this.getCompanyDetails();
            },
            viewCompanyInfo: function() {
                var isNum = $("#btnAddEditCompany").attr("data");
                if(isNum == 1) {
                    $("#viewCompanyInfo").show();
                    $('#viewCompanyInfo').attr("class", "active");
                    $("#CompanyBaseInfo").show();
                    $("#viewLicenses").hide();
                    $('#viewLicenses').attr("class", "");
                    $("#Certification").hide();
                }
                else if(isNum == 2) {
                    $("#viewCompanyInfo").show();
                    $('#viewCompanyInfo').attr("class", "active");
                    $("#CompanyBaseInfo").show();
                    $("#viewLicenses").show();
                    $('#viewLicenses').attr("class", "");
                    $("#Certification").hide();
                }
            },
            viewLicenses: function() {
                $("#viewCompanyInfo").show();
                $('#viewCompanyInfo').attr("class", "");
                $("#CompanyBaseInfo").hide();
                $("#viewLicenses").show();
                $('#viewLicenses').attr("class", "active");
                $("#Certification").show();
                this.bindLicensesDetails();
            },
            bindLicensesDetails: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "CompanyId": this.CompanyId
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/querydetail";
                eosCommon.eosAjax(url, "GET", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        $("#viewEditLicenses").empty();
                        if(result.Data.Result != null) {
                            for(var i = 0; i < result.Data.Result.length; i++) {
                                var Html = '';
                                Html += '<div id="' + result.Data.Result[i].CompanyLicenseId + '" class="mb-20">';
                                Html += '<div class="row">';
                                Html += '<div class="col-sm-12">';
                                Html += '<p class="text-muted m-b-20 font-16 b-1 p-10">证书名称 ：<code class="LicensesName">' + result.Data.Result[i].LicensesName + '</code> 证书编号：<code class="LicensesNumber">' + result.Data.Result[i].LicensesNumber + '</code>';
                                Html += '<button class="btn btn-danger pull-right p-header" onclick="_this.btnDelLicenses(\'' + result.Data.Result[i].CompanyLicenseId + '\');"><i class="fa fa-trash-o mr-5"></i>删除</button>';
                                Html += '</p>';
                                Html += '<ul class="docs-pictures clearfix">';
                                for(var j = 0; j < result.Data.Result[i].LicensesImage.length; j++) {
                                    Html += '<li><img data-original="' + result.Data.Result[i].LicensesImage[j].ResourceUrl + '" src="' + result.Data.Result[i].LicensesImage[j].ResourceUrl + '" class="img-responsive" style="height: 230px" alt="' + j + '"></li>';
                                }
                                Html += '<li class="border-1" style="background:url(../../../assets/eos_web/css/img/edit.jpg);height: 230px;cursor: pointer;background-position: top center;" onclick="_this.btnEditLicenses(\'' + result.Data.Result[i].CompanyLicenseId + '\');"></li>';
                                Html += '</ul>';
                                Html += '</div>';
                                Html += '</div>';
                                Html += '</div>';
                                $("#viewEditLicenses").append(Html);
                                $("#" + result.Data.Result[i].CompanyLicenseId + " .row .col-sm-12 ul").viewer();
                            }
                        }
                    }
                });
            },
            btnAddLicenses: function() {
                $("#ModuleTitle").attr("data", "4");
                $('#ModuleTitle').text("新增证书");
                $("#modal-cleosAccount").modal("show");
                $('#verifyCheckAccount').hide();
                $('#verifyCheckDepartment').hide();
                $('#verifyCheckLicenses').show();
                this.bind_LicensesImg(null, null);
            },
            btnEditLicenses: function(id) {
                $("#ModuleTitle").attr("data", "5");
                $('#ModuleTitle').text("编辑证书");
                $("#modal-cleosAccount").modal("show");
                $('#verifyCheckAccount').hide();
                $('#verifyCheckDepartment').hide();
                $('#verifyCheckLicenses').show();
                this.CompanyDetailId = id;
                $('#txtLicensesName').val($('#' + id + ' .LicensesName').text());
                $('#txtLicensesNumber').val($('#' + id + ' .LicensesNumber').text());
                //查找列表中的图片资源ID和URL
                var ResourceIds = [];
                var imgUrls = [];
                $('#' + id + ' img').each(function() {
                    if($(this).attr("src") != null && $(this).attr("src") != "") {
                        var ResourceId = eosCommon.getUrlParam($(this).attr("src"), "ResourceId");
                        ResourceIds.push(ResourceId);
                        imgUrls.push($(this).attr("src"));
                    }
                });
                this.bind_LicensesImg(ResourceIds, imgUrls);
            },
            btnDelLicenses: function(id) {
                var _this = this;
                vdialog({
                    type: 'confirm',
                    title: '提示',
                    content: eosCommon.DELETE_MSG_ASK,
                    ok: function() {
                        _this.delLicensesRequest(id);
                    },
                    cancel: true,
                    modal: true
                });
            },
            bind_LicensesImg: function(ResourceIds3, imgUrls3) {
                var _$modal = $('#modal-cleosAccount');
                _$modal.css('display', 'block');
                $("#imgBox3").empty();
                $("#imgBox3").html(
                    '<div class="uploader_img3 eos_uploader_img">' +
                    '<div class="queueList">' +
                    '<div id="dndArea" class="placeholder">' +
                    '<div id="filePickerImg3">点击选择图片</div>' +
                    '</div>' +
                    '<ul class="filelist clearfix"></ul>' +
                    '</div>' +
                    '<div class="statusBar" style="display:none;">' +
                    '<div class="btns clearfix">' +
                    '<div id="continueImgBtn3"></div><div class="uploadBtn">开始上传</div>' +
                    '</div>' +
                    '<div class="info"></div>' +
                    '</div>' +
                    '</div>'
                );
                var param3 = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "ResourceType": "2",
                    "Title": "资质证书",
                    "Description": "资质证书"
                };
                eosCommon.eosUploaderImg({
                    'uploaderObj': 'uploaderImg3',
                    'uploaderBox': '.uploader_img3',
                    'uploaderList': '.queueList',
                    'initBtn': '#filePickerImg3',
                    'continueBtn': '#continueImgBtn3',
                    'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                    'data': param3,
                    'fileNumLimit': 3,
                    'fileSingleSizeLimit': 3 * 1024 * 1024,
                    'ResourceIds': ResourceIds3,
                    'imgUrls': imgUrls3,
                    'succ': function(result) {
                    },
                    'del': function(result) {
                    }
                });
            },
            isLicensesNull: function() {
                var _this = this;
                this.LicensesImage = [];
                this.newImage = 0;
                $(".uploader_img3 .queueList .filelist .item").each(function() {
                    if($(this).attr("data") != null && $(this).attr("data") != "") {
                        if($(this).attr("data") != "dataImg") {
                            _this.LicensesImage.push($(this).attr("data"));
                        }
                        else {
                            _this.LicensesImage.push($(this).attr("id"));
                        }
                    }
                    if($(this).attr("data") == null) {
                        _this.newImage++;
                    }
                });
            },
            addLicensesRequest: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "CompanyId": this.CompanyId,
                        "LicensesName": $('#txtLicensesName').val(),
                        "LicensesNumber": $('#txtLicensesNumber').val(),
                        "LicensesImage": this.LicensesImage
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/insertdetail";
                eosCommon.eosAjax(url, "POST", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                        $("#modal-cleosAccount").modal("hide");
                        _this.bindLicensesDetails();
                    }
                });
            },
            editLicensesRequest: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "CompanyDetailId": this.CompanyDetailId,
                        "LicensesName": $('#txtLicensesName').val(),
                        "LicensesNumber": $('#txtLicensesNumber').val(),
                        "LicensesImage": this.LicensesImage
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/updatedetail";
                eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                        $("#modal-cleosAccount").modal("hide");
                        _this.bindLicensesDetails();
                    }
                });
            },
            delLicensesRequest: function(id) {
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "CompanyDetailId": id
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/deletedetail";
                eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                        $('#' + id).remove();
                    }
                });
            },
            bind_selIndustryId: function() {
                var param = null;
                var url = eosCommon.COMMON_API + "api/common/industry";
                eosCommon.eosAjax(url, "GET", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        var selIndustryId = $("#selIndustryId");
                        selIndustryId.empty();
                        var json = result.Data;
                        for(var ind in json) {
                            selIndustryId.append("<option value='" + json[ind].IndustryId + "'>" + json[ind].IndustryName + "</option>");
                        }
                        $("#selIndustryId").selectpicker('refresh');
                    }
                });
            },
            bind_cityLinage: function() {
                eosCommon.cityLinage.init('19', '289', '3042')
                $("#province").change(function() {
                    eosCommon.cityLinage.getCity($("#province").selectpicker('val'), function() {
                        eosCommon.cityLinage.getDistrict($("#city").selectpicker('val'))
                    })
                });
                $("#city").change(function() {
                    eosCommon.cityLinage.getDistrict($("#city").selectpicker('val'))
                });
            },
            bind_AddEditCompanyInfo: function(data) {
                var _this = this;
                if(data == null) {
                    $('#txtCompanyShortName').val("");
                    $('#txtCompanyFullName').val("");
                    $("#selIndustryId").selectpicker('refresh');
                    $("#district").selectpicker('refresh');
                    $('#txtAddress').val("");
                    $('#txtContactPerson').val("");
                    $('#txtContactPersonMobile').removeAttr("disabled");
                    $('#txtContactPersonMobile').val("");
                    $('#txtPhone').val("");
                    $('#txtFax').val("");
                    $('#txtEmail').val("");
                    $('#lblResourceId1').text("");
                    $('#lblResourceId2').text("");
                    $('#txtDescription').val("");
                    this.bind_UpFileImg(null, null, null, null);
                }
                else {
                    _this.CompanyId = data[0].CompanyId;
                    $('#txtCompanyShortName').val(data[0].CompanyShortName);
                    $('#txtCompanyFullName').val(data[0].CompanyFullName);
                    $("#selIndustryId option[value='" + data[0].IndustryId + "']").prop("selected", true);
                    $("#selIndustryId").selectpicker('refresh');
                    $("#province option[value='" + data[0].ProvinceId + "']").prop("selected", true);
                    $("#province").selectpicker('refresh');
                    $("#city option[value='" + data[0].CityId + "']").prop("selected", true);
                    $("#city").selectpicker('refresh');
                    $("#district option[value='" + data[0].DistrictId + "']").prop("selected", true);
                    $("#district").selectpicker('refresh');
                    $('#txtAddress').val(data[0].Address);
                    $('#txtContactPerson').val(data[0].ContactPerson);
                    $('#txtContactPersonMobile').attr("disabled", "disabled");
                    $('#txtContactPersonMobile').val(data[0].Mobile);
                    $('#txtPhone').val(data[0].Phone);
                    $('#txtFax').val(data[0].Fax);
                    $('#txtEmail').val(data[0].Email);
                    $('#lblResourceId1').text(data[0].LogoImage);
                    $('#lblResourceId2').text(data[0].CoverPhoto);
                    $('#txtDescription').val(data[0].Description);
                    this.bind_UpFileImg(data[0].LogoImage, data[0].LogoImageUrl, data[0].CoverPhoto, data[0].CoverPhotoUrl);
                }
            },
            bind_UpFileImg: function(ResourceIds, imgUrls, ResourceIds2, imgUrls2) {
                $("#imgBox1").empty();
                $("#imgBox1").html(
                    '<div class="uploader_img1 eos_uploader_img">' +
                    '<div class="queueList">' +
                    '<div id="dndArea" class="placeholder">' +
                    '<div id="filePickerImg1">点击选择LOGO图片</div>' +
                    '</div>' +
                    '<ul class="filelist clearfix"></ul>' +
                    '</div>' +
                    '<div class="statusBar" style="display:none;">' +
                    '<div class="btns clearfix">' +
                    '<div id="continueImgBtn1"></div><div class="uploadBtn">开始上传</div>' +
                    '</div>' +
                    '<div class="info"></div>' +
                    '</div>' +
                    '</div>');
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "ResourceType": "0",
                    "Title": "企业Logo",
                    "Description": "企业Logo或"
                };
                eosCommon.eosUploaderImg({
                    'uploaderObj': 'uploaderImg1',
                    'uploaderBox': '.uploader_img1',
                    'uploaderList': '.queueList',
                    'initBtn': '#filePickerImg1',
                    'continueBtn': '#continueImgBtn1',
                    'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                    'data': param,
                    'fileNumLimit': 1,
                    'fileSingleSizeLimit': 3 * 1024 * 1024,
                    'ResourceIds': ResourceIds,
                    'imgUrls': imgUrls,
                    'succ': function(result) {
                        $('#lblResourceId1').text(result.Data[0].ResourceId);
                    },
                    'del': function(result) {
                    }
                });
                $("#imgBox2").empty();
                $("#imgBox2").html(
                    '<div class="uploader_img2 eos_uploader_img">' +
                    '<div class="queueList">' +
                    '<div id="dndArea" class="placeholder">' +
                    '<div id="filePickerImg2">点击选择企业封面</div>' +
                    '</div>' +
                    '<ul class="filelist clearfix"></ul>' +
                    '</div>' +
                    '<div class="statusBar" style="display:none;">' +
                    '<div class="btns clearfix">' +
                    '<div id="continueImgBtn2"></div><div class="uploadBtn">开始上传</div>' +
                    '</div>' +
                    '<div class="info"></div>' +
                    '</div>' +
                    '</div>');
                var param2 = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "ResourceType": "2",
                    "Title": "企业封面",
                    "Description": "企业封面"
                };
                eosCommon.eosUploaderImg({
                    'uploaderObj': 'uploaderImg2',
                    'uploaderBox': '.uploader_img2',
                    'uploaderList': '.queueList',
                    'initBtn': '#filePickerImg2',
                    'continueBtn': '#continueImgBtn2',
                    'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
                    'data': param2,
                    'fileNumLimit': 1,
                    'fileSingleSizeLimit': 3 * 1024 * 1024,
                    'ResourceIds': ResourceIds2,
                    'imgUrls': imgUrls2,
                    'succ': function(result) {
                        $('#lblResourceId2').text(result.Data[0].ResourceId);
                    },
                    'del': function(result) {
                    }
                });
            },
            btnAddEditCompany: function() {
                var isNum = $("#btnAddEditCompany").attr("data");
                if(isNum == "1") {
                    //添加公司基本信息
                    if(!verifyCheck._click("CompanyBaseInfo")) {
                        return false;
                    } else {
                        this.addCompanyRequest();
                    }
                }
                else if(isNum == "2") {
                    //编辑公司基本信息
                    if(!verifyCheck._click("CompanyBaseInfo")) {
                        return false;
                    } else {
                        this.editCompanyRequest();
                    }
                }
            },
            getCompanyDetails: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "Keywords": DepartmentId
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/query";
                eosCommon.eosAjax(url, "GET", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        _this.bind_AddEditCompanyInfo(result.Data.Result);
                    }
                });
            },
            addCompanyRequest: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "CompanyShortName": $('#txtCompanyShortName').val(),
                        "CompanyFullName": $('#txtCompanyFullName').val(),
                        "CompanyType": 1,
                        "RootId": DepartmentId,
                        "IndustryId": $('#selIndustryId option:selected').val(),
                        "DistrictId": $('#district option:selected').val(),
                        "Address": $('#txtAddress').val(),
                        "Phone": $('#txtPhone').val(),
                        "Fax": $('#txtFax').val(),
                        "ContactPerson": $('#txtContactPerson').val(),
                        "Mobile": $('#txtContactPersonMobile').val(),
                        "Email": $('#txtEmail').val(),
                        "LogoImage": $('#lblResourceId1').text(),
                        "CoverPhoto": $('#lblResourceId2').text(),
                        "Description": $('#txtDescription').val()
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/insert";
                eosCommon.eosAjax(url, "POST", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                        _this.btnReturn();
                        _this.load_OrganizationTree();
                    }
                });
            },
            editCompanyRequest: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "CompanyId": _this.CompanyId,
                        "CompanyShortName": $('#txtCompanyShortName').val(),
                        "CompanyFullName": $('#txtCompanyFullName').val(),
                        "IndustryId": $('#selIndustryId option:selected').val(),
                        "DistrictId": $('#district option:selected').val(),
                        "Address": $('#txtAddress').val(),
                        "Phone": $('#txtPhone').val(),
                        "Fax": $('#txtFax').val(),
                        "ContactPerson": $('#txtContactPerson').val(),
                        "Email": $('#txtEmail').val(),
                        "LogoImage": $('#lblResourceId1').text(),
                        "CoverPhoto": $('#lblResourceId2').text(),
                        "Description": $('#txtDescription').val()
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/update";
                eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                        _this.btnReturn();
                        _this.load_OrganizationTree();
                    }
                });
            },
            btnAddPartTree: function() {
                this.hideRMenu();
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var selNodes = zTree.getSelectedNodes();
                treeNode = selNodes[0];
                DepartmentId = treeNode.id;
                $("#ModuleTitle").attr("data", "2");
                $('#ModuleTitle').text("新增部门");
                eosCommon.resetFrom();
                $('#txtAddEditName').val('');
                $('#verifyCheckAccount').hide();
                $('#treeParentName').hide();
                $('#verifyCheckDepartment').show();
                $('#verifyCheckLicenses').hide();
                $("#modal-cleosAccount").modal("show");
            },
            btnEditPartTree: function() {
                this.hideRMenu();
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var selNodes = zTree.getSelectedNodes();
                treeNode = selNodes[0];
                DepartmentId = treeNode.id;
                $("#ModuleTitle").attr("data", "3");
                $('#ModuleTitle').text("编辑部门");
                $('#verifyCheckAccount').hide();
                $('#treeParentName').show();
                $('#lblParentName').text(treeNode.getParentNode().name);
                $('#txtAddEditName').val(treeNode.name.substring(0, treeNode.name.lastIndexOf("(")));
                $('#verifyCheckDepartment').show();
                $('#verifyCheckLicenses').hide();
                $("#modal-cleosAccount").modal("show");
            },
            btnDelPartTree: function() {
                var _this = this;
                this.hideRMenu();
                var zTree = $.fn.zTree.getZTreeObj("treeDemo");
                var selNodes = zTree.getSelectedNodes();
                treeNode = selNodes[0];
                DepartmentId = treeNode.id;
                vdialog({
                    type: 'confirm',
                    title: '提示',
                    content: eosCommon.DELETE_MSG_ASK,
                    ok: function() {
                        _this.delDepartment(treeNode);
                    },
                    cancel: true,
                    modal: true
                });
            },
            addDepartment: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "DepartmentName": $('#txtAddEditName').val(),
                        "ParentId": DepartmentId
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/insertdepartment";
                eosCommon.eosAjax(url, "POST", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                        $("#modal-cleosAccount").modal("hide");
                        _this.load_OrganizationTree();
                    }
                });
            },
            editDepartment: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "DepartmentId": DepartmentId,
                        "DepartmentName": $('#txtAddEditName').val()
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/updatedepartment";
                eosCommon.eosAjax(url, "PUT", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
                        $("#modal-cleosAccount").modal("hide");
                        _this.load_OrganizationTree();
                    }
                });
            },
            delDepartment: function(treeNode) {
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "DepartmentId": DepartmentId
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/organization/deletedepartment";
                eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                        zTree.removeNode(treeNode);
                    }
                });
            },
            divPostionAdd: function() {
                $('#addPostionName').val("");
                $("#addPostionView").hide();
                $(".editPostionView").show();
            },
            divPostionSava: function() {
                if(!verifyCheck._click("checkPostion")) {
                    return false;
                } else {
                    this.addPositionRequest();
                }
            },
            isChecked: function() {
                var cboxPositions = [];
                var txtPositionsName = [];
                $('#isPostion input:checkbox[name="cboxPostion"]:checked').each(function() {
                    var setPostion = {"PositionId": $(this).attr("id"), "PositionTitle": $(this).val()};
                    cboxPositions.push(setPostion);
                    txtPositionsName.push($(this).val());
                });
                if(cboxPositions.length == 0) {
                    var defPostion = {"PositionId": "", "PositionTitle": ""};
                    cboxPositions.push(defPostion);
                }
                $('#hidPositionId').val(JSON.stringify(cboxPositions));
                $('#txtPositionName').val(txtPositionsName);
                $("#modal-cleosPositions").modal("hide");
            },
            getPosition: function() {
                if($('#hidDepartmentId').val() == "") {
                    vdialog({
                        type: 'confirm',
                        title: '提示',
                        content: '请先选择一个所在部门！',
                        ok: true,
                        modal: true
                    });
                }
                else {
                    $("#modal-cleosPositions").modal("show");
                    var _this = this;
                    var param = {
                        "AccessToken": eosCommon.storage.get("AccessToken"),
                        "PageSize": 0,
                        "PageIndex": 0,
                        "Parameters": {
                            "DepartmentId": $('#hidDepartmentId').val()
                        }
                    }
                    eosCommon.eosAjax(eosCommon.COMMON_API + 'api/employee/queryposition', "GET", param, "json", function(result) {
                        if(eosCommon.checkCode(result.State, result.Message)) {
                            if(result.Data == "") {
                                _this.PositionsItem = [];
                            }
                            else {
                                _this.PositionsItem = result.Data.Result;
                            }
                        }
                    });
                }
            },
            btnDelPosition: function(id) {
                var _this = this;
                vdialog({
                    type: 'confirm',
                    title: '提示',
                    content: eosCommon.DELETE_MSG_ASK,
                    ok: function() {
                        _this.delPositionRequest(id);
                    },
                    cancel: true,
                    modal: true
                });
            },
            delPositionRequest: function(id) {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "PositionId": id
                    }
                };
                var url = eosCommon.ENTERPRISE_API + "api/employee/deleteposition";
                eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
                        _this.getPosition();
                    }
                });
            },
            addPositionRequest: function() {
                var _this = this;
                var param = {
                    "AccessToken": eosCommon.storage.get("AccessToken"),
                    "Parameters": {
                        "DepartmentId": $('#hidDepartmentId').val(),
                        "PositionTitle": $('#addPostionName').val()
                    }
                };
                var url = eosCommon.COMMON_API + "api/employee/insertposition";
                eosCommon.eosAjax(url, "POST", param, "json", function(result) {
                    if(eosCommon.checkCode(result.State, result.Message)) {
                        eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
                        _this.getPosition();
                        $("#addPostionView").show();
                        $(".editPostionView").hide();
                    }
                });
            }
        },
        updated: function() {
            $("[name=cboxPostion]:checkbox").prop("checked", false);
            if($('#hidPositionId').val() != "") {
                var hidPositions = JSON.parse($('#hidPositionId').val());
                for(var i = 0; i < this.PositionsItem.length; i++) {
                    for(var j = 0; j < hidPositions.length; j++) {
                        if(hidPositions[j].PositionId == this.PositionsItem[i].PositionId) {
                            $("#" + this.PositionsItem[i].PositionId + ":checkbox").prop("checked", true);
                            break;
                        }
                    }
                }
            }

            
        },
    
        mounted: function() {
        	var _this=this;
			
			if(eosCommon.storage.get('EntitySort')==2){
				Company_id='';
			}else{
				Company_id=eosCommon.storage.get('CompanyId');
			}
        	_this.getRoleLists();
            _this.load_Setting();
            _this.load_OrganizationTree();
            //左侧增删改权限控制
          var operatorsDatas=eosCommon.eosOperDataHandle();
            if(operatorsDatas.insert !== 1){            	
            	$(".btnAddCompany").remove();
            	$("#btnAddPartTree").remove();
            }
             if(operatorsDatas.deletes !== 1){
          		$("#btnDelPartTree").remove();
            }
              if(operatorsDatas.edit !== 1){           	
            	$("#btnEditCompany").remove();
            	$("#btnEditPartTree").remove();
            }            
            _this.load_TableView();
            _this.bind_selIndustryId();
            _this.bind_cityLinage();
          
            $("#divAddCompanyUser,#divImportCompanyUser,#divAddEditCompanyView,#divAddEditCompanyView,#rightAddPart").getNiceScroll().resize();
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());
           
           $('.form_date').datetimepicker({
                format: 'yyyy-mm-dd',
                weekStart: 1,
                autoclose: true,
                startView: 2,
                minView: 2,
                forceParse: false,
                todayBtn: 1,
                todayHighlight: 1,
                language: 'zh-CN'
            });
            $("#txtJoinDate").change(function() {
                if($("#txtJoinDate").val() != '') {
                    $('#txtJoinDate').next('.valid-form-group-addon').find('.focus').html('');
                }
            });
            verifyCheck({
                formId: 'verifyCheckUser',
                onBlur: null,
                onFocus: null,
                onChange: null,
                successTip: true,
                resultTips: null,
                clearTips: null,
                code: true,
                phone: true
            });
            verifyCheck({
                formId: 'verifyCheckAccount',
                onBlur: null,
                onFocus: null,
                onChange: null,
                successTip: true,
                resultTips: null,
                clearTips: null,
                code: true,
                phone: true
            });
            verifyCheck({
                formId: 'verifyCheckDepartment',
                onBlur: null,
                onFocus: null,
                onChange: null,
                successTip: true,
                resultTips: null,
                clearTips: null,
                code: true,
                phone: true
            });
            verifyCheck({
                formId: 'verifyCheckLicenses',
                onBlur: null,
                onFocus: null,
                onChange: null,
                successTip: true,
                resultTips: null,
                clearTips: null,
                code: true,
                phone: true
            });
            verifyCheck({
                formId: 'checkPostion',
                onBlur: null,
                onFocus: null,
                onChange: null,
                successTip: true,
                resultTips: null,
                clearTips: null,
                code: true,
                phone: true
            });
            verifyCheck({
                formId: 'CompanyBaseInfo',
                onBlur: null,
                onFocus: null,
                onChange: null,
                successTip: true,
                resultTips: null,
                clearTips: null,
                code: true,
                phone: true
            });
            setTimeout(function() {
				// console.log('米啊');
				_this.isReload = true;
			}, 500);
        },
        watch: {
			isReload: function() {
                table.ajax.reload();				
			}
		}
    }
</script>
<style>
    @import '/static/plugins/tree/css/organizational_tree.css';
    #organization-box .Org-box {
        padding: 10px 15px 15px 15px;
        margin-bottom: 0px!important;
    }
    #organization-box .Org-box:hover {
        /*padding: 10px 15px 15px 15px;*/
        margin-bottom: 0px!important;
        /*-webkit-transition: all .8s;*/
    }
    
</style>
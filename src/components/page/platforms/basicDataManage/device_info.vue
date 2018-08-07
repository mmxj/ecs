<template>
	<div class="device_info">
		<div id="normalPanel">
			<div id="EquipmentTable" class="card-box table-responsive">
				<div class="row">
					<div class="col-sm-6 col-md-4 col-lg-2">
						<span class="size20 font-bold">设备管理</span>
					</div>
				</div>
				<hr class="divider mb-10 mt-10">
				<div class="row">
					<div class="col-lg-12">
						<span class="OrgTopAligin OperatorInsert">
                            <button id="addDataBtn" type="button" class="btn btn-default" data-toggle="modal" data-target="#modal-cleos">
                                <i class="fa fa-plus m-r-5"></i>新增
                            </button>
                        </span>
						<span class="OperatorSearch">
							<span class="OrgTopAligin">
                            	<input id="EquipmentQueryTxt" type="text" class="form-control" placeholder="设备名称">
                        	</span>
						<span class="OrgTopAligin">
	                            <button id="EquipmentQueryBtn" type="button" class="btn btn-default">
	                                <i class="fa fa-search m-r-5"></i>查找
	                            </button>
	                        </span>
						</span>
					</div>
				</div>
				<table id="deviceInfoTable" class="table table-striped table-bordered" width="100%">
					<thead>
						<tr>
							<th>序号</th>
							<th>设备名称</th>
							<th>设备品牌</th>
							<th>设备种类</th>
							<th>设备大类</th>
							<th>设备小类</th>
							<th>设备型号</th>
							<th>是否启用</th>
							<th>操作</th>
						</tr>
					</thead>
				</table>
			</div>
			<div id="addEquipment" class="card-box table-responsive" style="display: none;min-height: 500px;">
				<div class="row">
					<div class="col-md-6">
						<span id="EquipmentTitle" class="size20 font-bold">设备信息</span>
					</div>
					<div class="col-md-6 modal-return">
						<button id="EquipmentReturnBtn" type="submit" class="btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
					</div>
				</div>
				<hr class="divider mb-10 mt-10">
				<div class="row">
					<div class="col-lg-12">
						<div id="equipmentVerifyCheck">
							<div class="form-horizontal content-box">
								<div class="form-group">
									<label class="content-title-left text-right"><em class="ak_required_em">*</em>设备名称</label>
									<div class="col-lg-5 col-xs-8">
										<span class="valid-form-group">
                                            <label class="focus valid"></label>
                                        </span>
										<input id="name" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||maxLength:25" data-error="设备名称不能为空||设备名称最长为25位字符" />
										<span class="ion-close-circled close hide text-danger valid-input-icon"></span>
										<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
									</div>
								</div>
							</div>
							<div class="form-horizontal content-box">
								<div class="form-group">
									<label class="content-title-left"><em class="ak_required_em">*</em>品牌名称</label>
									<div class="col-lg-2 col-xs-3">
										<select id="BandSelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
											<option value="">请选择设备品牌</option>
										</select>
									</div>
									<div id="BigCategoryRow" style="display: none;">
										<div class="col-lg-1 col-xs-2">
											<label class="content-title-left"><em class="ak_required_em">*</em>设备大类</label>
										</div>
										<div class="col-lg-2 col-xs-3">
											<select id="BigCategorySelect" class="form-control " data-style="btn-white" tabindex="-98">
											</select>
										</div>
									</div>
								</div>
								<div class="form-group" id="BigCategoryRow" style="display: none;">
									<label class="content-title-left"><em class="ak_required_em">*</em>设备小类</label>
									<div class="col-lg-2 col-xs-3">
										<select id="SmallCategorySelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
										</select>
									</div>
									<div class="col-lg-1 col-xs-2">
										<label class="content-title-left"><em class="ak_required_em">*</em>设备型号</label>
									</div>
									<div class="col-lg-2 col-xs-3">
										<select id="ProductTypeSelect" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
										</select>
									</div>
								</div>
								<div class="form-group" id="BigCategoryRow" style="display: none;">
									<label class="content-title-left"><em class="ak_required_em">*</em>设备种类</label>
									<div class="col-lg-2 col-xs-3">
										<select id="EquipmentTypeSelect" @change="EquipmentTypeChange()" v-model="EquipmentTypeId" class="form-control selectpicker" data-style="btn-white" tabindex="-98">
											<option :value="item.EquipmentTypeId" v-for="item in EquipmentTypeArr">{{item.TypeName}}</option>
										</select>
									</div>
								</div>
							</div>
							<div id="select_img_row" class="form-horizontal content-box" style="display: none;">
								<div>
									<div class="form-group">
										<label class="content-title-left"><em class="ak_required_em">*</em>设备图片</label>
										<div class="col-lg-5 col-xs-8">
											<div class="eos_uploader_img">
												<div class="queueList">
													<ul class="filelist clearfix"></ul>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div class="form-group">
									<label class="content-title-left"><em class="ak_required_em"></em>固件版本号</label>
									<div class="col-lg-2 col-xs-3">
										<div id="ProtocolFirmwareVersion" class="ak-select">
											<input type="text" placeholder="手动输入新的固件版本号" class="form-control" id="ProtocolFirmwareVersionData" maxlength="20" data-valid="computerphobe" data-error="固件版本号不能出现中文跟特殊字符" />
											<span class="ie8 icon-close close hide"></span>
											<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
											<label class="focus valid"></label>
										</div>
									</div>
								</div>

								<div class="form-group">
									<label class="content-title-left text-right"><em class="ak_required_em">*</em>是否启用</label>
									<div class="col-lg-5 col-xs-8">
										<div class="radio radio-custom radio-inline">
											<input id="IsActiveOn" name="IsActiveRadio" value="1" type="radio" checked=''>
											<label for="IsActiveOn">
                                                是
                                            </label>
										</div>
										<div class="radio radio-danger radio-inline">
											<input id="IsActiveOff" name="IsActiveRadio" value="0" type="radio">
											<label for="IsActiveOff">
                                                否
                                            </label>
										</div>
									</div>
								</div>
							</div>
							<div class="form-horizontal content-box detail_info_wrap">
								<div class="portlet more-data">
									<div class="portlet-heading portlet-default">
										<h3 class="portlet-title text-dark" style="cursor: pointer;">以下内容为非必填项，点击展开</h3>
									</div>
									<div class="panel-collapse collapse">
										<div class="textItem">
											<div class="form-group mt-10">
												<label class="content-title-left text-right">设备资产编号</label>
												<div class="col-lg-5 col-xs-8">
													<input id="SerialNo" type="text" class="form-control" maxlength="20" />
													<span class="ie8 icon-close close hide"></span>
													<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
													<label class="focus"><span>20个字符以内</span></label>
													<label class="focus valid"></label>
												</div>
											</div>
										</div>
										<div id="product_des_row">
											<div class="form-group mt-10">
												<label class="content-title-left text-right">设备描述</label>
												<div class="col-lg-5 col-xs-8">
													<textarea id="product_des" type="text" maxlength="100" class="form-control" /></textarea>
													<span class="ie8 icon-close close hide"></span>
													<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
													<label class="focus"><span>描述内容最长为100个字符</span></label>
													<label class="focus valid"></label>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="modal-footer">
								<label class="content-title-left text-right"></label>
								<div class="col-lg-5 col-xs-8" style="padding-left: 22px;">
									<button id="EquipmentCancelBtn" class="btn btn-white mr-20" data-dismiss="modal">取消</button>
									<button id="EquipmentSaveBtn" class="btn btn-default loading_btn" data-loading-text="保存中..." data-status="save">保存</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="setPanel" style="display: none;">
			<div class="content-left">
				<!-- 头部左边开始-->
				<div class="tabs-vertical-env">
					<ul id="EosBaseDveTab" class="nav tabs-vertical">
						<li class="active">
							<a id="FaultBtn" href="#Fault" data-toggle="tab">故障代码</a>
						</li>
						<li>
							<a id="ProtocolBtn" href="#Protocol" data-toggle="tab">通讯协议</a>
						</li>
						<li>
							<a id="NameplateBtn" href="#Nameplate" data-toggle="tab">铭牌信息</a>
						</li>
						<li>
							<a id="ManualsBtn" href="#Manuals" data-toggle="tab">用户手册</a>
						</li>
					</ul>
				</div>
			</div>
			<!-- 头部左边结束-->
			<div class="content-right">
				<!-- 头部右边开始-->
				<div class="tab-content m-0">
					<!-- 内容页开始-->
					<div id="Fault" class="tab-pane active mb--20">
						<!--故障代码列表开始-->
						<div id="FaultList" class="card-box table-responsive">
							<div class="row">
								<div class="col-sm-12">
									<span class="size20 font-bold">故障代码</span>
									<button type="button" class="btnReturnList btn btn-white waves-effect waves-light pull-right">
                                        <i class="fa fa-mail-reply-all m-r-5"></i>返回
                                    </button>
								</div>
							</div>
							<hr class="divider mb-10 mt-10">
							<div class="row pl-10">
								<span class="OrgTopAligin OperatorInsert">
                                    <button id="addFaultBtn" type="button" class="btnInsertFC btn btn-default waves-effect waves-light">
                                        <i class="fa fa-plus m-r-5"></i>新增
                                    </button>
                                </span>
								<span class="OrgTopAligin OperatorImports">
                                    <button id="faultbtnImport" type="button" class="btn btn-default">
                                        批量导入
                                    </button>
                                </span>
								<span class="OperatorSearch">
	                        		<span class="OrgTopAligin">
	                                    <input id="FaultQueryTxt" type="search" class="form-control" placeholder="故障代码" value="">
	                                </span>
								<span class="OrgTopAligin">
		                                <button id="FaultQueryBtn" type="button" class="btn btn-default waves-effect waves-light">
		                                        <i class="fa fa-search m-r-5"></i>查找
		                                </button>
	                                </span>
								</span>
							</div>
							<hr class="divider mt-10">
							<table id="FaultTable" class="table table-striped table-bordered" width="100%">
								<thead>
									<tr>
										<th style="width: 50px;">查看更多</th>
										<th>序号</th>
										<th>故障名称</th>
										<th>故障代码</th>
										<th>故障持久性</th>
										<th>操作</th>
									</tr>
								</thead>
							</table>
						</div>
						<!--故障代码列表结束-->
						<!--添加故障代码开始-->
						<div id="FaultAdd" class="card-box table-responsive" style="display: none;">
							<div class="row">
								<div class="col-md-6">
									<span id="FaultTitle" class="size20 font-bold">故障代码</span>
								</div>
								<div class="col-md-6">
									<button type="button" class="FaultCancelBtn btn btn-white waves-effect waves-light pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
								</div>
							</div>
							<hr class="divider mb-10 mt-10">
							<div class="row">
								<div class="col-md-12">
									<div id="FaultVerifyCheck">
										<div class="form-horizontal mt-10 pb-10 content-box-modal">
											<div class="form-group mt-20">
												<label class="content-title-left text-right"><em class="ak_required_em">*</em>故障名称</label>
												<div class="col-xs-6">
													<input id="FaultName" type="text" maxlength="25" class="form-control required" data-valid="isNonEmpty||maxLength:25||isOtherName" data-error="故障名称不能为空||故障名称最长为25位字符||只能输入中文、字母、数字、下划线，中划线，且以中文或字母开头" />
													<span class="ie8 icon-close close hide"></span>
													<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
													<label class="focus"><span>故障名称为25位，中文、字母、数字、下划线的组合，以中文或字母开头</span></label>
													<label class="focus valid"></label>
												</div>
											</div>
											<div class="form-group mt-20">
												<label class="content-title-left text-right"><em class="ak_required_em">*</em>故障代码</label>
												<div class="col-xs-6">
													<input id="FaultCode" type="text" class="form-control required" maxlength="20" data-valid="isNonEmpty||maxLength:20||isComputerphobe" data-error="故障代码不能为空||故障代码最长为20位字符||故障代码只能为字符，不能为中文" />
													<span class="ie8 icon-close close hide"></span>
													<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
													<label class="focus"><span>必填，20个字符以内，只能为字符，不能出现中文</span></label>
													<label class="focus valid"></label>
												</div>
											</div>
											<div class="form-group">

												<label class="content-title-left">
                                                            <em class="ak_required_em">*</em>故障持久性
                                                </label>
												<div class="col-lg-2 col-xs-3">
													<select id="FaultDurability" class="form-control selectpicker" value="1" data-style="btn-white" tabindex="-98">
														<option value="1">锁定</option>
														<option value="2">非锁定</option>
													</select>
												</div>
											</div>
											<div class="form-group mt-20">
												<label class="content-title-left text-right"><em class="ak_required_em">*</em>故障描述</label>
												<div class="col-xs-6">
													<textarea id="FaultDescription" type="text" maxlength="250" class="form-control required" data-valid="isNonEmpty||maxLength:250" data-error="故障描述不能为空||故障描述最长为250位字符" /></textarea>
													<span class="ie8 icon-close close hide"></span>
													<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
													<label class="focus"><span></span></label>
													<label class="focus valid"></label>
												</div>
											</div>
										</div>
										<div class="form-horizontal mt-10 pb-10 content-box-modal detail_info_wrap">
											<div class="portlet more-data">
												<div class="portlet-heading portlet-default">
													<h3 class="portlet-title text-dark" style="cursor: pointer;">以下内容为非必填项，点击展开</h3>
												</div>
												<div class="panel-collapse collapse">
													<div class="form-group mt-20">
														<label class="content-title-left text-right">故障位置</label>
														<div class="col-xs-6">
															<input id="FaultLocation" type="text" class="form-control" maxlength="50" />
														</div>
													</div>
													<div class="form-group mt-20">
														<label class="content-title-left text-right">备注信息</label>
														<div class="col-xs-6">
															<textarea id="FaultRemark" type="text" maxlength="100" class="form-control" /></textarea>
															<span class="ie8 icon-close close hide"></span>
															<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
															<label class="focus"><span>备注信息最长为100个字符</span></label>
															<label class="focus valid"></label>
														</div>
													</div>
												</div>
											</div>

										</div>
										<div class="modal-footer" style="text-align: left;">
											<label class="content-title-left text-right"></label>
											<div class="col-lg-5 col-xs-8" style="padding-left: 2px;">
												<button class="FaultCancelBtn btn btn-white waves-effect" data-dismiss="modal">取消</button>
												<button id="FaultSaveBtn" class="btn btn-default loading_btn" data-status="save" data-loading-text="保存中...">保存</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div id="faultbtnImportBox" class="card-box table-responsive" style="display: none">
							<div class="row">
								<div class="col-md-6">
									<span class="size20 font-bold">故障代码导入</span>
								</div>
								<div class="col-md-6">
									<button type="button" class="faultBtnReturn btn btn-white waves-effect waves-light pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
								</div>
							</div>
							<hr class="divider mb-10 mt-10">
							<div class="row">
								<div class="col-md-12">
									<div id="fileBox">
										<div class="alert alert-info alert-dismissable">
											<strong>导入说明</strong> 1、先下载故障代码模版，在对应列填上相应数据。注意，导入文件中的数据行不能超过1万行！
											<span class="label label-info p-8"><a class="text-white" href="../../../../static/doc/故障代码导入模板(基础数据).xlsx" target="_blank">下载故障代码模版</a></span>
										</div>
										<div id="fileBox1"></div>
									</div>
									<div class="mt-20">
										<div class="form-group">
											<div class="bg-white">
												<table id="viewImport" class="table table-striped table-bordered" width="100%">
													<thead>
														<tr>
															<th>序号</th>
															<th>故障代码</th>
															<th>故障名称</th>
															<th>故障描述</th>
															<th>故障持久性</th>
															<th>故障位置</th>
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
											<button type="button" class="faultBtnReturn btn btn-white pull-left">取消</button>
											<button id="btnSaveTemplateData" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中..." data-dismiss="modal">保存</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--添加故障代码结束-->
					</div>
					<div class="tab-pane mb--20" id="Protocol">
						<!--通讯协议列表开始-->
						<div id="ProtoList" class="card-box table-responsive">
							<div class="row">
								<div class="col-sm-12">
									<span class="size20 font-bold">通讯协议</span>
									<button type="submit" class="btnReturnList btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
								</div>
							</div>
							<hr class="divider mb-10 mt-10">
							<div class="row pl-10">
								<span class="OrgTopAligin OperatorInsert">
                                    <button id="addProtocolBtn" type="button" class="btn btn-default waves-effect waves-light" data-toggle="" data-target="#modal-cleos-Dev">
                                    <i class="fa fa-plus m-r-5"></i>新增
                                    </button>
                                </span>
								<span class="OrgTopAligin OperatorImports">
                                    <button id="protoImport" type="button" class="btn btn-default">
                                        批量导入
                                    </button>
                                </span>
								<span class="OperatorSearch">
									<span class="OrgTopAligin">
                                    <input id="ProtocolQueryTxt" type="search" class="form-control w-128" placeholder="协议地址">
                                </span>
								<span class="OrgTopAligin">
                                    <button id="ProtocolQueryBtn" type="button" class="btn btn-default waves-effect waves-light">
                                        <i class="fa fa-search m-r-5"></i>查找
                                    </button>
                                </span>
								</span>
							</div>
							<hr class="divider mt-10">
							<table id="ProtocolTable" class="table table-striped table-bordered" width="100%">
								<thead>
									<tr>
										<th style="width: 50px;">查看更多</th>
										<th>序号</th>
										<th>协议地址</th>
										<th>数据类型</th>
										<th>数据处理方式</th>
										<th>数据偏移量</th>
										<th>数据比例</th>
										<th class="w-80">操作</th>
									</tr>
								</thead>
							</table>
						</div>
						<!--通信协议列表结束-->
						<!--增加通信协议开始-->
						<div id="ProtocolAdd" class="card-box table-responsive" style="display: none">
							<div class="row">
								<div class="col-md-6">
									<span class="size20 font-bold ProtocolTitle">通讯协议</span>
								</div>
								<div class="col-md-6">
									<button type="button" class="ProtocolCancelBtn btn btn-white waves-effect waves-light pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
								</div>
							</div>
							<hr class="divider mb-10 mt-10">
							<div class="row">
								<div class="col-md-12">
									<div id="ProtocolVerifyCheck">
										<div class="form-horizontal content-box">
											<div class="form-group mt-20">
												<label class="content-title-left text-right"><em class="ak_required_em">*</em>协议数据地址</label>
												<div class="col-xs-6">
													<input id="ProtocolAddress" v-model='ProtocolAddress' type="text" class="form-control required" maxlength="25" data-valid="isNonEmpty||maxLength:25||isComputerphobe" data-error="协议数据地址不能为空||协议数据地址最长为25位字符||只能为字符，不能为中文" />
													<span class="ie8 icon-close close hide"></span>
													<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
													<label class="focus"><span>必填，只能为英文字符，不能为中文</span></label>
													<label class="focus valid"></label>
												</div>
											</div>
											<div class="form-group">
												<label class="content-title-left"><em class="ak_required_em">*</em>数据类别</label>
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
											<div class="form-group">

												<label class="content-title-left"><em class="ak_required_em">*</em>选择群组</label>

												<div class="col-lg-2 col-xs-3">
													<div id="group" class="ak-select">
														<div class="btn-group" style="width: 100%;">
															<button type="button" class="btn dropdown-toggle bs-placeholder btn-white" data-toggle="dropdown" role="button" data-id="selFunctionType" style="width: 100%;">
			                                                                <span class="filter-option pull-left group-text">请选择或输入协议分组名称</span>
			                                                                &nbsp;<span class="bs-caret"><span class="caret"></span></span>
			                                                            </button>
															<div class="dropdown-menu open" role="combobox" style="width: 100%;max-height: 142px; overflow: hidden;">
																<ul class="inner" role="listbox" aria-expanded="false" style="width: 100%;max-height: 142px; overflow-y: auto;">
																	<li class="">
																		<input class="entry-input" type="text" placeholder="手动输入新建分组" />
																	</li>
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
													<div class="form-group">
														<label class="content-title-left"><em class="ak_required_em">*</em>子协议数据地址</label>
														<div class="col-lg-3 col-xs-3">
															<input readonly="true" id="subProtocolAddress_0" type="text" value="" class="form-control required subProtocolAddress" data-valid="isNonEmpty" data-error="" maxlength="30" />

														</div>
														<div class="col-lg-3 col-xs-3">
															<div class="bitDataInsert">
																<div class="input-group">
																	<div class="input-group-addon">从</div>
																	<input type="text" class="form-control bit1" id="bit1_0" value="" placeholder="">
																	<div class="input-group-addon">位到</div>
																	<input type="text" class="form-control bit2" id="bit2_0" value="" placeholder="">
																</div>
															</div>
														</div>
														<div class="col-lg-1 col-xs-1" v-show='!isOnlyOne'>
															<span class='OperatorBtnDel OperatorDel delCurSubProtocolBtn' data='0' title='删除当前子协议'><i class='fa fa-trash-o'></i></span>
														</div>

													</div>
												</div>
												<div class="form-horizontal content-box">
													<div class="form-group">
														<label class="content-title-left"><em class="ak_required_em">*</em>中文名</label>
														<div class="col-lg-2 col-xs-3">
															<input id="ProtocolDisplayName_0" type="text" class="form-control required ProtocolDisplayName" data-valid="isNonEmpty" data-error="中文名不能为空" maxlength="30" />
															<span class="ie8 icon-close close hide"></span>
															<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
															<label class="focus"><span></span></label>
															<label class="focus valid"></label>
														</div>
														<div class="col-lg-2 col-xs-3">
															<label class="content-title-left pull-right">英文名</label>
														</div>
														<div class="col-lg-2 col-xs-3">
															<input id="EnglishName_0" type="text" class="form-control EnglishName" maxlength="50" />
														</div>
													</div>

													<div class="form-group mt-20">
														<label class="content-title-left text-right"><em class="ak_required_em">*</em>数据处理方式</label>
														<div class="col-lg-6 col-xs-6">
															<select id="ProtocolDataModel_0" class="form-control selectpicker ProtocolDataModel" data-style="btn-white" tabindex="-98">
																<option value="HL">HL</option>
																<option value="LH">LH</option>
															</select>
														</div>
													</div>
													<div class="form-group">
														<label class="content-title-left"><em class="ak_required_em">*</em>数据偏移量</label>
														<div class="col-lg-2 col-xs-3">
															<input id="ProtocolOffset_0" type="text" class="form-control required ProtocolOffset" maxlength="20" data-valid="isNonEmpty||between:1-20||isNumFloatSix" data-error="数据偏移量不能为空||数据偏移量最长为1-20位字符||数据偏移量格式为（数字或小数点六位）" />
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
															<input id="ProtocolRatio_0" type="text" class="form-control required ProtocolRatio" maxlength="20" data-valid="isNonEmpty||between:1-20||isNumFloatSix" data-error="数据比例量不能为空||数据比例最长为1-20位字符||数据比例格式为（数字或小数点六位）" />
															<span class="ie8 icon-close close hide"></span>
															<label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
															<label class="focus"><span>必填，只能为保留两位小数的数字</span></label>
															<label class="focus valid"></label>
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
																	<input id="ProtocolUnit_0" type="text" class="form-control ProtocolUnit" maxlength="30" />
																</div>
															</div>

															<div class="form-group">

																<label class="content-title-left">故障代码</label>

																<div class="col-lg-2 col-xs-3">
																	<div id="ProtocolFaultCode_0" class="ak-select">
																		<div class="btn-group" style="width: 100%;">
																			<button type="button" class="codesSelectBtn btn dropdown-toggle bs-placeholder btn-white" data-toggle="dropdown" role="button" data-id="selFunctionType" style="width: 100%;">
								                                                        <span class="filter-option pull-left group-text">请选择或输入故障代码</span>
								                                                        &nbsp;<span class="bs-caret"><span class="caret"></span></span>
								                                                    </button>
																			<div class="dropdown-menu open" role="combobox" style="width: 100%;max-height: 142px; overflow: hidden;">
																				<ul class="inner" role="listbox" aria-expanded="false" style="width: 100%;max-height: 142px; overflow-y: auto;">
																					<li class="">
																						<input id="" v-model='search' class="entry-input" type="text" placeholder="搜索或手动输入故障代码" />
																					</li>
																					<li v-for="item in searchData" class="codes">
																						<a class="codes_0" role="option"><span class="text" :id='item.EquipmentFaultId'>{{item.FaultCode}}</span></a>
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
																		<input id="FaultDurability_0" type="text" readonly="true" class="form-control FaultDurability" maxlength="30" />
																	</div>
																</div>
															</div>

															<div class="form-group mt-20">
																<label class="content-title-left text-right">故障描述</label>
																<div class="col-xs-6">
																	<textarea id="ProtocolFaultDescription_0" class="form-control ProtocolFaultDescription" placeholder="不需要手动填写，由上面的故障代码匹配之后自动填写"></textarea>
																</div>
															</div>
															<div class="form-group mt-20">
																<label class="content-title-left text-right">备注信息</label>
																<div class="col-xs-6">
																	<textarea id="ProtocolRemark_0" type="text" maxlength="100" class="form-control ProtocolRemark" /></textarea>
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
											<div v-show='isBitMask' id="addBitDataBtn" @click="addRow()" class=" card-box table-box border-add border-1 content-box form-horizontal" style="min-height: 100px">
												<div class="table-detail text-center" style="cursor: pointer;">
													<span class="text-cog"><i class="fa fa-plus m-rigth" style=""></i><label>新增</label></span>
												</div>
											</div>

										</div>

										<div class="modal-footer" style="text-align: left;">
											<label class="content-title-left text-right"></label>
											<div class="col-lg-5 col-xs-8" style="padding-left: 1;">
												<button class="ProtocolCancelBtn btn btn-white waves-effect" data-dismiss="modal">取消</button>
												<button id="ProtocolSaveBtn" class="btn btn-default loading_btn" data-loading-text="保存中..." data-status="save">保存</button>
											</div>
										</div>
									</div>
								</div>
							</div>

						</div>
						<div id="ProtoImportBox" class="card-box table-responsive" style="display: none">
							<div class="row">
								<div class="col-md-6">
									<span class="size20 font-bold">通讯协议导入</span>
								</div>
								<div class="col-md-6">
									<button type="button" class="ProtocolBtnReturn btn btn-white waves-effect waves-light pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
								</div>
							</div>
							<hr class="divider mb-10 mt-10">
							<div class="row">
								<div class="col-md-12">
									<div id="fileBox">
										<div class="alert alert-info alert-dismissable">
											<strong>导入说明</strong> 1、先下载通讯协议模版，在对应列填上相应数据。注意，导入文件中的数据行不能超过1万行！
											<span class="label label-info p-8"><a class="text-white" href="../../../../static/doc/通讯协议导入模板(基础数据).xlsx" target="_blank">下载通讯协议模版</a></span>
										</div>
										<div id="fileBox2"></div>
									</div>
									<div class="mt-20">
										<div class="form-group">
											<div class="bg-white">
												<table id="protoctViewImport" class="table table-striped table-bordered" width="100%">
													<thead>
														<tr>
															<th>序号</th>
															<th>Modbus地址</th>
															<!--<th>固件版本号</th>-->
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
											<button type="button" class="ProtocolBtnReturn btn btn-white pull-left">取消</button>
											<button id="saveProtoTemplateData" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中..." data-dismiss="modal">保存</button>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--增加通信协议结束-->
					</div>
					<div class="tab-pane mb--20" id="Nameplate">
						<div id="NameplateList" class="card-box table-responsive">
							<div class="row">
								<div class="col-md-6">
									<span class="size20 font-bold">铭牌信息</span>
								</div>
								<div class="col-md-6 modal-return">
									<button type="submit" class="btnReturnList btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
								</div>
							</div>
							<hr class="divider mb-10 mt-10">
							<div class="row OperatorInsert">
								<div class="col-sm-6">
									<div class="m-b-30">
										<button id="addNameplate" class="btn btn-default waves-effect waves-light"><i class="fa fa-plus m-r-5"></i>新增</button>
									</div>
								</div>
							</div>
							<table class="table table-striped dataTable no-footer NameplateListTable" id="datatable-editable" role="grid">
								<thead>
									<tr role="row">
										<th class="sorting" rowspan="1" colspan="1">铭牌名称</th>
										<th class="sorting" rowspan="1" colspan="1">铭牌属性值</th>
										<th class="sorting" rowspan="1" colspan="1">操作</th>
									</tr>
								</thead>
								<tbody id="NameplateListItem"></tbody>
							</table>
							<div class="row mt-10">
								<div class="col-lg-12">
									<div id="nameplateImgBox"></div>
									<div class="pt-20"><button id="saveNameplateBtn" class="btn btn-default btn-block waves-effect waves-light">点击保存铭牌信息</button></div>
								</div>
							</div>
						</div>
					</div>
					<div class="tab-pane mb--20" id="Manuals">
						<!--用户手册开始-->
						<div id="UserManual" class="card-box table-responsive">
							<div class="row">
								<div class="col-md-6">
									<span class="size20 font-bold">用户手册</span>
								</div>
								<div class="col-md-6 modal-return">
									<button type="submit" class="btnReturnList btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
								</div>
							</div>
							<hr class="divider mb-10 mt-10">
							<div class="row pl-10 OperatorInsert">
								<span class="OrgTopAligin">
                                    <button id="addUserManualBtn" type="button" class="btnInsertFC btn btn-default waves-effect waves-light">
                                        <i class="fa fa-plus m-r-5"></i>新增
                                    </button>
                                </span>
							</div>
							<hr class="divider mt-10">
							<div class="row">
								<div class="col-lg-12">
									<ul id="uSerManualList" class="list-unstyled transaction-list">

									</ul>
								</div>
							</div>
						</div>
						<div id="UserManualAdd" class="card-box table-responsive" style="display: none">
							<div class="row">
								<div class="col-md-12">
									<span class="size20 font-bold">上传用户手册</span>
								</div>
							</div>
							<hr class="divider mb-10 mt-10">
							<div class="row">
								<div class="col-md-12">
									<div id="verifyCheck">
										<div class="form-horizontal mt-10 content-box-modal">
											<div class="form-group mt-10">
												<label class="content-title-left text-right"><em class="ak_required_em">*</em>手册名称</label>
												<div class="col-xs-9">
													<input id="UserManualName" type="text" maxlength="25" class="form-control" />
												</div>
											</div>
											<div class="form-group mt-20 mb-10">
												<label class="content-title-left text-right"><em class="ak_required_em">*</em>用户手册备注</label>
												<div class="col-xs-9">
													<textarea id="UserManualRemark" maxlength="100" required class="form-control"></textarea>
												</div>
											</div>
										</div>
										<div id="uploadFileListBox" class="form-horizontal mt-10 content-box-modal" style="display: none;">
											<div class="form-group mt-0 mb-5">
												<label class="content-title-left text-right" style="line-height: 31px;">附件名称</label>
												<div class="col-xs-9 uploadFileList mt-5">
													<a href="" style="color:#1abc9c;"></a><button id="resetManualFile" class="btn btn-default" data-status='save'>点击更换附件</button>
												</div>
											</div>
										</div>
										<div class="mt-10 pb-5 pl-10 pr-10 content-box-modal">
											<div class="mb-10 mt-10">
												<div class="form-group uploadImgBox">

												</div>
											</div>
										</div>
										<div class="modal-footer">
											<label class="content-title-left text-right"></label>
											<div class="col-lg-5 col-xs-8" style="padding: 0;">
												<button id="UserManuaCancelBtn" class="btn btn-white waves-effect">取消</button>
												<button id="UserManuaSaveBtn" class="btn btn-default loading_btn" data-status='save' data-loading-text="保存中...">保存</button>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<!--用户手册结束-->
					</div>
				</div>
				<!-- 内容页结束-->
			</div>
			<!-- 头部右边结束-->
		</div>

		<input id="EquipmentIdHidden" type="hidden" value="" />
		<input id="BrandIdHidden" type="hidden" value="" />
		<input id="BigCategoryIdHidden" type="hidden" value="" />
		<input id="SmallCategoryIdHidden" type="hidden" value="" />
		<input id="ProductTypeIdHidden" type="hidden" value="" />
	</div>
</template>
<script>
	var btn = '';
	var viewImport = '';
	var initImgList = '',
		EquipmentId = '';
	export default {
		data: function() {
			return {
				groupList: [],
				FirmwareVersionList: [],
				saveImportData: [],
				errorSign: '',
				editManualFielId: '',
				editNewFileId: '',
				manualFielPath: '',
				addManualFielId: '',
				isAddFiled: false,
				isEditFiled: true,
				format: '',
				size: '',
				isBitMask: false,
				bitIndex: 1,
				ProtocolAddress: '',
				subAdreesIndex: 1,
				protocLists: '',
				isOnlyOne: true,
				selectorsData: [],
				EquipmentProtocolIdData: [],
				EquipmentId: '',
				getFaultDataLists: [],
				search: '',
				EquipmentTypeId: '',
				EquipmentTypeArr: [],
				SubId2: ''
			}
		},
		computed: {
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
		methods: {
			getEquipmentType() {
				var _this = this;
				eosCommon.eosAjax(eosCommon.ENTERPRISE_API + "api/equipment/GetEquipmentType", "Get", {
					"AccessToken": eosCommon.storage.get("AccessToken"),
				}, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						_this.EquipmentTypeArr = result.Data;
						_this.$nextTick(() => {
							$('#EquipmentTypeSelect').selectpicker('refresh');
						});
					}
				});

			},
			EquipmentTypeChange() {
				var vm = this;
				eosCommon.eosAjax(
					eosCommon.COMMON_API + 'api/common/EquipmentClassLinkage',
					"Get", {
						"AccessToken": eosCommon.storage.get('AccessToken'),
						"PageIndex": 0,
						"PageSize": 0,
						"Parameters": {
							"BrandId": $("#BandSelect").selectpicker('val'),
							"EquipmentTypeId": vm.EquipmentTypeId,
							"EquipmentClassId": ""
						}
					},
					"json",
					function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {

							vm.bigTypeChange();
						}
					})
			},
			bigTypeChange() {
				let vm = this;
				eosCommon.eosAjax(
					eosCommon.COMMON_API + 'api/common/EquipmentClassLinkage',
					"Get", {
						"AccessToken": eosCommon.storage.get('AccessToken'),
						"PageIndex": 0,
						"PageSize": 0,
						"Parameters": {
							"BrandId": $("#BandSelect").selectpicker('val'),
							"EquipmentTypeId": vm.EquipmentTypeId,
							"EquipmentClassId": ""
						}
					},
					"json",
					function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							$("#BigCategorySelect,#SmallCategorySelect,#ProductTypeSelect").empty();

							if(result.Data != '') {
								for(var i = 0; i < result.Data.length; i++) {
									$("#BigCategorySelect").append("<option value=" + result.Data[i]['EquipmentClassId'] + ">" + result.Data[i]['EquipmentClassName'] + "</option>");
								}
								eosCommon.eosAjax(
									eosCommon.COMMON_API + 'api/common/EquipmentClassLinkage',
									"Get", {
										"AccessToken": eosCommon.storage.get('AccessToken'),
										"PageIndex": 0,
										"PageSize": 0,
										"Parameters": {
											"BrandId": $("#BandSelect").selectpicker('val'),
											"EquipmentClassId": $("#BigCategorySelect").selectpicker('val')
										}
									},
									"json",
									function(result) {
										if(eosCommon.checkCode(result.State, result.Message)) {
											if(result.Data != '') {
												for(var i = 0; i < result.Data.length; i++) {
													$("#SmallCategorySelect").append("<option value=" + result.Data[i]['EquipmentClassId'] + ">" + result.Data[i]['EquipmentClassName'] + "</option>");
													//															if(){
													//																
													//															}
												}
												eosCommon.eosAjax(
													eosCommon.PLATFORM_API + 'api/base/ImageGallery',
													"Get", {
														"AccessToken": eosCommon.storage.get('AccessToken'),
														"PageIndex": 0,
														"PageSize": 0,
														"Parameters": {
															"BrandId": $("#BandSelect").selectpicker('val'),
															"BigCategoryId": $("#BigCategorySelect").selectpicker('val'),
															"SmallCategoryId": $("#SmallCategorySelect").selectpicker('val'),
															"ProductTypeId": ""
														}
													},
													"json",
													function(result) {
														if(eosCommon.checkCode(result.State, result.Message)) {
															if(result.Data != '') {
																for(var i = 0; i < result.Data.Result.length; i++) {
																	$("#ProductTypeSelect").append("<option value=" + result.Data.Result[i]['ProductTypeId'] + ">" + result.Data.Result[i]['ProductTypeName'] + "</option>");
																}
															}
															$("#BigCategorySelect,#SmallCategorySelect,#ProductTypeSelect").selectpicker('refresh');
															vm.getImgList(initImgList)
														}

													}
												);
											}
										}

									}
								);
							} else {
								$("#BigCategorySelect,#SmallCategorySelect,#ProductTypeSelect").empty();
								$("#BigCategorySelect,#SmallCategorySelect,#ProductTypeSelect").selectpicker('val', '');
							}
						}

					}
				);
			},
			getImgList(initImgList) {
				if($("#ProductTypeSelect").selectpicker('val') == null) {
					$("#addEquipment .filelist").empty().append("<div class='error no_data'>暂无数据，请先到<a href='#/ecos/device_pic'>设备图库</a>补充数据！</div>")
					$("#addEquipment .textItem").hide();
				} else {
					eosCommon.eosAjax(
						eosCommon.PLATFORM_API + 'api/base/ImageGalleryDetail',
						"Get", {
							"AccessToken": eosCommon.storage.get('AccessToken'),
							"PageIndex": 0,
							"PageSize": 0,
							"Parameters": {
								"ProductTypeId": $("#ProductTypeSelect").selectpicker('val')
							}
						},
						"json",
						function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								var status = '';
								$("#addEquipment .filelist").empty();
								$("#addEquipment .placeholder").hide();
								if(result.Data.Result == '') {
									$("#addEquipment .filelist").append("<div class='error no_data'>暂无数据，请先到<a href='#/ecos/device_pic'>设备图库</a>补充数据！</div>")
									$("#addEquipment .textItem").hide();
								} else {
									for(var i = 0; i < result.Data.Result.length; i++) {
										$("#addEquipment .filelist").append(
											'<li id="' + result.Data.Result[i]["ResourceId"] + '" class="item">' +
											'<p class="title">' + result.Data.Result[i]['Title'] + '</p>' +
											'<p class="imgWrap"><img src="' + result.Data.Result[i]["ImageUrl"] + '"></p>' +
											'<div class="status_active ' + status + '"></div>' +
											'</li>'
										);
									}
									if(initImgList != '') {
										$("#addEquipment .filelist li").each(function() {
											for(var i = 0; i < initImgList.length; i++) {
												if($(this).attr("id") == initImgList[i]["ResourceId"]) {
													$(this).find(".status_active").addClass("success")
												}
											}
										})
									}

								}
							}
						}
					)
				}
			},
			imgBoxData: function() {
				var ResourceIds;
				var imgUrls;
				$("#imgBox1").empty();
				$("#imgBox1").html(
					'<div class="uploader_img1 eos_uploader_img">' +
					'<div class="queueList">' +
					'<div id="dndArea" class="placeholder">' +
					'<div id="filePickerImg1">点击选择图片</div>' +
					'</div>' +
					'<ul class="filelist clearfix"></ul>' +
					'</div>' +
					'<div class="statusBar" style="display:none;">' +
					'<div class="btns">' +
					'<div id="continueImgBtn1"></div><div class="uploadBtn">开始上传</div>' +
					'</div>' +
					'<div class="info"></div>' +
					'</div>' +
					'</div>'
				);
				var param = {
					"AccessToken": eosCommon.storage.get('AccessToken'),
					"ResourceType": "1",
					"Brand": '1',
					"BigCategory": "1",
					"SmallCategory": "1",
					"ProductType": "1"
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
					'succ': function(result) {},
					'del': function(result) {
						//删除资源ID对应的文件
						if(result != "") {
							var param = {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"ResourceId": result,
									"ResourceType": "1"
								}
							};
							var url = eosCommon.RESOURCES_API + "api/resource/delete";
							eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {}
							});
						}
					}
				});
			},
			getFaultDatas: function() {
				var _this = this;
				eosCommon.eosAjax(eosCommon.PLATFORM_API + "api/base/QueryEquipmentFault", "Get", {
					"AccessToken": eosCommon.storage.get("AccessToken"),
					"Parameters": {
						"EquipmentId": _this.EquipmentId,
						"Keywords": ''
					}
				}, "json", function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						console.log('故障代码列表：', result);
						if(result.Data == "") {
							$("#ProtocolFaultDescription").val("暂无匹配数据，请检查故障代码是否填写正确");
						} else {
							_this.getFaultDataLists = result.Data.Result;
						}
					}
				});

			},
			bindBulitys: function() {
				var _this = this;
				_this.protocLists = $('.protocList');
				$('.codesSelectBtn').on('click', function() {
					_this.search = '';
				});
				for(var j = 1; j < _this.protocLists.length; j++) {
					console.log('curVal1:', j);
					$('#ProtocolOffset_' + j).val('0');
					$('#ProtocolRatio_' + j).val('1');
					(function(j) {
						$("#ProtocolFaultCode_" + j).on("click", ".dropdown-menu li a", function() {

							var obj = $(this).parents('#ProtocolFaultCode_' + j);
							//							obj.find(".group-text").html($(this).find(".codes_"+j+" .text").html());
							//							obj.find(".group-text").attr('id',$(this).find(".codes_"+j+" .text").attr('id'));
							obj.find(".group-text").html($(this).find(".text").html());
							obj.find(".group-text").attr('id', $(this).find(".text").attr('id'));
							var curVal = obj.find(".group-text").attr('id');
							console.log('好好的bu', $(this))
							if(!curVal) {
								$('#FaultDurability_' + j).val('');
								$('#ProtocolFaultDescription_' + j).val('');
								$('#ProtocolRemark_' + j).val('');
							}
							for(var i = 0; i < _this.getFaultDataLists.length; i++) {
								if(curVal == _this.getFaultDataLists[i].EquipmentFaultId) {
									console.log('好好的', j)
									_this.getFaultDataLists[i].FaultDurabilityName == '锁定' ? $('#FaultDurability_' + j).attr('data-val', 1) : $('#FaultDurability_' + j).attr('data-val', 2);
									$('#FaultDurability_' + j).val(_this.getFaultDataLists[i].FaultDurabilityName);
									$('#ProtocolFaultDescription_' + j).val(_this.getFaultDataLists[i].FaultDescription);
									$('#ProtocolRemark_' + j).val(_this.getFaultDataLists[i].Remark);
								}

							}
						});

						$("#ProtocolFaultCode_" + j).on("change", ".entry-input", function() {
							//							console.log('我是谁：',$(this))
							//							var obj = $(this).parents('#ProtocolFaultCode_'+j);
							//							obj.find(".group-text").html($(this).val());
							//							$(this).val('');

							console.log('输入值：', $(this).val())
							for(var i = 0; i < _this.getFaultDataLists.length; i++) {
								console.log('pipeizhi：', _this.getFaultDataLists[i].FaultCode)

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
							//								$(this).val('');
							//								vdialog({
							//		                                title: '系统提示',
							//		                                type: 'alert',
							//		                                modal: true,
							//		                                content: "暂无匹配到您所输入的故障代码，请重新输入或搜索！",
							//		                                ok: function(){
							//		                                	
							//		                                }
							//		                            });
						});
					})(j);

				}

			},
			addRow: function() {
				var _this = this;
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
                                                            </div>
                                                            <div class="form-group">
																		<label class="content-title-left">故障代码</label>
																
																<div class="col-lg-2 col-xs-3">
																	<div id="ProtocolFaultCode_${this.bitIndex}" class="ak-select">
																		<div class="btn-group" style="width: 100%;">
																			<button type="button" class="codesSelectBtn btn dropdown-toggle bs-placeholder btn-white" data-toggle="dropdown" role="button" data-id="selFunctionType" style="width: 100%;">
						                                                        <span class="filter-option pull-left group-text">请选择或输入故障代码</span>
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
				//				$("#ProtocolFaultCode_"+ (_this.subAdreesIndex - 1)+" .codeLists .curCodes").append(`<input  v-model='${this.search}' class='entry-input' type='text' placeholder='搜索或手动输入故障代码' />`)

				$("#subProtocolAddress_" + (_this.subAdreesIndex - 1)).val($('#ProtocolAddress').val() + '-' + _this.subAdreesIndex);
				for(var j = 0; j < _this.searchData.length; j++) {
					$("#ProtocolFaultCode_" + (_this.subAdreesIndex - 1) + " .codeLists").append(`<li  class="codes">
																	<a class='codes_${this.bitIndex}' role='option'><span class='text' id="${_this.searchData[j].EquipmentFaultId}">${_this.searchData[j].FaultCode}</span></a>
																</li>`)
					$('#FaultDurability_' + (_this.subAdreesIndex - 1)).attr('data-val', '');
					$("#ProtocolFaultCode_" + (_this.subAdreesIndex - 1)).selectpicker('refresh');
				}
				_this.bindBulitys();
				_this.bitIndex++;
			},
			editProtocolInitDatas: function(i, datas) {
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
				//				$("#ProtocolFaultLevel_" + i).selectpicker('val', datas[i]["FaultLevel"]);
				$("#ProtocolFaultDescription_" + i).val(datas[i]["FaultDescription"]);
				$("#ProtocolRemark_" + i).val(datas[i]["Remark"]);

			},
			bindEosBaseDveImport: function(viewImportData) {
				viewImport = $('#viewImport').DataTable({
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
						{ data: "RowId" },
						{ data: "FaultCode" },
						{ data: "FaultName" },
						{ data: "FaultDescription", className: "txt_lt" },
						{ data: "FaultDurability" },
						{ data: "FaultLocation" },
						{ data: "Remark" },
						{ data: "Message" }
					],
					"columnDefs": [{
						"targets": [7],
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
				$('#viewImport tbody').on('click', 'tr', function() {
					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					} else {
						viewImport.$('tr.selected').removeClass('selected');
						$(this).addClass('selected');
					}
				});
			},
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
					"columns": [
						{ data: "RowId" },
						{ data: "ModbusAddress" },
						//						{ data: "FirmwareVersion" },
						{ data: "ChineseName" },
						{ data: "EnglishName" },
						{ data: "DataType" },
						{ data: "Offset" },
						{ data: "Ratio" },
						{ data: "DataModel" },
						{ data: "Unit" },
						{ data: "FaultCode" },
						{ data: "IsStringOutput" },
						{ data: "GroupName" },
						{ data: "Remark" },
						{ data: "Message" }
					],
					"columnDefs": [{
						"targets": [13],
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
		},
		watch: {
			ProtocolAddress: function(cur, old) {
				var protocList = $('.protocList');
				for(var i = 0; i < protocList.length; i++) {
					$('#subProtocolAddress_' + i).val(cur + '-' + (i + 1));
				}

			},
			search: function(cur, old) {
				console.log(cur);
			}

		},
		mounted: function() {
			eosCommon.eosOperators(eosCommon.eosOperDataHandle());
			var _this = this;
			_this.bindEosBaseDveImport()
			var table;
			$("#ProtocolDataType").change(function() {
				var selectValue = $(this).selectpicker('val');
				var content = $('.detail_info_content');
				if(selectValue == 'BitMask16' || selectValue == 'BitMask32') {
					for(var i = 0; i < content.length; i++) {
						content[i].remove();
					}
					_this.isBitMask = true;
					$('#ProtocolOffset_0').val('0');
					$('#ProtocolRatio_0').val('1');
					console.log('ggggg', $('#ProtocolAddress').val());
					$('#subProtocolAddress_0').val($('#ProtocolAddress').val() + '-' + _this.subAdreesIndex);
				} else {
					for(var i = 0; i < content.length; i++) {
						content[i].remove();
					}
					_this.isBitMask = false;
				}
			});

			$(".detail_info_wrap").delegate(".delCurSubProtocolBtn", 'click', function() {
				console.log('事件委托1111:', $('.protocList'))
				var proLists = $('.protocList');
				$('#contentWrap_' + $(this).attr('data')).remove();
				_this.subAdreesIndex--;
				_this.bitIndex--;
				_this.protocLists = $('.protocList');
				console.log('当前索引值:', _this.protocLists, $('.protocList.contentWrap'));
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
					$('.protocList').eq(i).find('.bit1').attr('id', 'bit1_' + i);
					$('.protocList').eq(i).find('.bit2').attr('id', 'bit2_' + i);
				}
				_this.protocLists = $('.protocList');
				_this.bindBulitys();
				if(_this.subAdreesIndex <= 1) {
					_this.isOnlyOne = true;
				}
			});
			var vm = this;
			$(document).ready(function() {
				$(".detail_info_wrap").delegate(".portlet-heading", 'click', function() {
					console.log('此时this:', this)
					console.log('事件委托')
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
				$('#EquipmentQueryTxt').bind('keypress', function(event) {
					if(event.keyCode == "13") {
						table.ajax.reload();
					}
				});

				table = $('#deviceInfoTable').DataTable({
					pagingType: "full_numbers",
					processing: true,
					deferRender: true,
					dom: "Bfrtip",
					buttons: [],
					responsive: !0,
					serverSide: true,
					ajax: function(data, callback, settings) {
						var param = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"PageSize": data.length,
							"PageIndex": (data.start / data.length) + 1,
							"Parameters": {
								"EquipmentName": $("#EquipmentQueryTxt").val().trim(),
								"BrandId": "",
								"EquipmentModel": ""
							}
						};
						var url = eosCommon.PLATFORM_API + "api/base/QueryEquipment";
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
						{ defaultContent: "" },
						{ data: "EquipmentName" },
						{ data: "BrandName" },
						{ data: "TypeName" }, //设备种类
						{ data: "SubId1Name" },
						{ data: "SubId2Name" },
						{ data: "EquipmentModel" },
						{ data: "IsActive" },
						{ "defaultContent": "<span class='OperatorBtnEdit OperatorEdit' data='1' title='修改设备'><i class='fa fa-pencil'></i></span><span class='OperatorBtnSet OperatorSet'  data='2' title='参数设置'><i class='fa fa-cog'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除设备'><i class='fa fa-trash-o'></i></span>" }
					],
					"columnDefs": [{
						"targets": [6],
						"render": function(data) {
							data == 1 ? data = "已启用" : data = "未启用"
							return data
						}
					}]
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

				$("#addDataBtn").unbind("click").click(function() {
					eosCommon.resetFrom()
					$('.panel-collapse').hide();
					console.log(_this)

					$('.portlet-title').html("以下内容为非必填项，点击展开");
					initImgList = '';
					$("#name,#product_des,#EquipmentModelNo,#SerialNo,#ProtocolFirmwareVersionData").val('');

					$("#EquipmentTitle").html("新增设备");
					$(this).attr('data-status', 'save');
					$("#addEquipment").show();
					$("#EquipmentTable").hide();
					eosCommon.eosAjax(
						eosCommon.COMMON_API + 'api/common/brand',
						"Get", {
							'AccessToken': eosCommon.storage.get('AccessToken')
						},
						"json",
						function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								$("#BandSelect").empty().append("<option value=''>请选择品牌</option>");
								for(var i = 0; i < result.Data.length; i++) {
									$("#BandSelect").append("<option value=" + result.Data[i]['BrandId'] + ">" + result.Data[i]['BrandName'] + "</option>");
								}
								$("#BandSelect").selectpicker('refresh');
							}
						}
					)
				});

				$("#BandSelect").change(function() {
					vm.getEquipmentType();
					if($("#BandSelect").selectpicker('val') != "") {
						$("#BigCategoryRow,#SmallCategoryRow,#ProductTypeRow,#product_des_row,#select_img_row").show();
					} else {
						$("#BigCategoryRow,#SmallCategoryRow,#ProductTypeRow,#product_des_row,#select_img_row").hide();
					}

				});
				$("#BigCategorySelect").change(function() {
					$("#SmallCategorySelect,#ProductTypeSelect").empty();
					eosCommon.eosAjax(
						eosCommon.COMMON_API + 'api/common/EquipmentClassLinkage',
						"Get", {
							"AccessToken": eosCommon.storage.get('AccessToken'),
							"PageIndex": 0,
							"PageSize": 0,
							"Parameters": {
								"BrandId": $("#BandSelect").selectpicker('val'),
								"EquipmentClassId": $("#BigCategorySelect").selectpicker('val')
							}
						},
						"json",
						function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								if(result.Data != '') {
									for(var i = 0; i < result.Data.length; i++) {
										$("#SmallCategorySelect").append("<option value=" + result.Data[i]['EquipmentClassId'] + ">" + result.Data[i]['EquipmentClassName'] + "</option>");
									}
									eosCommon.eosAjax(
										eosCommon.PLATFORM_API + 'api/base/ImageGallery',
										"Get", {
											"AccessToken": eosCommon.storage.get('AccessToken'),
											"PageIndex": 0,
											"PageSize": 0,
											"Parameters": {
												"BrandId": $("#BandSelect").selectpicker('val'),
												"BigCategoryId": $("#BigCategorySelect").selectpicker('val'),
												"SmallCategoryId": $("#SmallCategorySelect").selectpicker('val'),
												"ProductTypeId": ""
											}
										},
										"json",
										function(result) {
											if(eosCommon.checkCode(result.State, result.Message)) {
												if(result.Data != '') {
													for(var i = 0; i < result.Data.Result.length; i++) {
														$("#ProductTypeSelect").append("<option value=" + result.Data.Result[i]['ProductTypeId'] + ">" + result.Data.Result[i]['ProductTypeName'] + "</option>");
													}
												}
												$("#SmallCategorySelect,#ProductTypeSelect").selectpicker('refresh');
												_this.getImgList(initImgList);
											}

										}
									);
								}
							}

						}
					);
				})
				$("#SmallCategorySelect").change(function() {
					$("#ProductTypeSelect").empty();
					eosCommon.eosAjax(
						eosCommon.PLATFORM_API + 'api/base/ImageGallery',
						"Get", {
							"AccessToken": eosCommon.storage.get('AccessToken'),
							"PageIndex": 0,
							"PageSize": 0,
							"Parameters": {
								"BrandId": $("#BandSelect").selectpicker('val'),
								"BigCategoryId": $("#BigCategorySelect").selectpicker('val'),
								"SmallCategoryId": $("#SmallCategorySelect").selectpicker('val'),
								"ProductTypeId": ""
							}
						},
						"json",
						function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								if(result.Data != '') {
									for(var i = 0; i < result.Data.Result.length; i++) {
										$("#ProductTypeSelect").append("<option value=" + result.Data.Result[i]['ProductTypeId'] + ">" + result.Data.Result[i]['ProductTypeName'] + "</option>");
									}
								}
								$("#ProductTypeSelect").selectpicker('refresh');
								_this.getImgList(initImgList)
							}

						}
					);
				})
				$("#ProductTypeSelect").change(function() {
					eosCommon.eosAjax(
						eosCommon.PLATFORM_API + 'api/base/ImageGallery',
						"Get", {
							"AccessToken": eosCommon.storage.get('AccessToken'),
							"PageIndex": 0,
							"PageSize": 0,
							"Parameters": {
								"BrandId": $("#BandSelect").selectpicker('val'),
								"BigCategoryId": $("#BigCategorySelect").selectpicker('val'),
								"SmallCategoryId": $("#SmallCategorySelect").selectpicker('val'),
								"ProductTypeId": $("#ProductTypeSelect").selectpicker('val')
							}
						},
						"json",
						function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								_this.getImgList(initImgList);
							}
						}
					);
				});

				$("#addEquipment .filelist").on('click', 'li', function() {
					var obj = $(this).find(".status_active"),
						status = false;
					if(obj.hasClass('success')) {
						obj.removeClass('success');
					} else {
						obj.addClass('success');
					}
					$(".filelist li").each(function() {
						if($(".filelist li .status_active").hasClass('success')) {
							status = true;
						}
					})
					if(status) {
						$(".textItem").show();
					} else {
						$(".textItem").hide();
					}
				})
				$("#EquipmentSaveBtn").unbind("click").click(function() {
					if(!verifyCheck._click("equipmentVerifyCheck")) return false;
					var imgArr = [],
						url = '',
						text = '',
						type = '';
					$(".filelist li").each(function() {
						if($(this).find(".status_active").hasClass('success')) {
							imgArr.push($(this).attr('id'));
						}
					});
					if($(this).attr('data-status') == 'save') {
						url = eosCommon.PLATFORM_API + 'api/base/InsertEquipment';
						text = '新增设备信息成功';
						type = 'Post';

					} else {
						url = eosCommon.PLATFORM_API + 'api/base/UpdateEquipment';
						text = '修改设备信息成功';
						type = 'Put';
					}
					if(imgArr == "") {
						vdialog({
							type: 'error',
							title: '提示',
							content: "请选择设备图片",
							ok: function() {},
							modal: true
						});
						return false;
					}
					btn = $(".loading_btn").button('loading');
					eosCommon.eosAjax(
						url,
						type, {
							"AccessToken": eosCommon.storage.get('AccessToken'),
							"Parameters": {
								"EquipmentId": EquipmentId,
								"EquipmentName": $("#name").val(),
								"BrandId": $("#BandSelect").selectpicker('val'),
								"SubId1": $("#SmallCategorySelect").selectpicker('val'),
								"SubId2": $("#ProductTypeSelect").selectpicker('val'),
								"EquipmentModel": $("#ProductTypeSelect").find('option:selected').html(),
								"EquipmentModelNo": $("#EquipmentModelNo").val(),
								"SerialNo": $("#SerialNo").val(),
								"EquipmentPhotos": imgArr,
								"Description": $("#product_des").val(),
								"IsActive": $('input[name="IsActiveRadio"]:checked').val(),
								"FirmwareVersion": $('#ProtocolFirmwareVersionData').val(),
								"EquipmentTypeId": _this.EquipmentTypeId
							}
						},
						"json",
						function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								$("#addEquipment").hide();
								$("#EquipmentTable").show();
								$("#BandSelect").selectpicker('val', '0');
								$("#BigCategoryRow,#SmallCategoryRow,#ProductTypeRow,#product_des_row,#select_img_row").hide();
								table.ajax.reload();
								eosCommon.eosMessage("success", text);
								$('.panel-collapse').hide();
								$('.portlet-title').html("以下内容为非必填项，点击展开");
								$(".loading_btn").button('reset');
							}
						}
					);
				})
				verifyCheck({
					formId: 'equipmentVerifyCheck',
					onBlur: null,
					onFocus: null,
					onChange: null,
					successTip: true,
					resultTips: null,
					clearTips: null,
					code: true,
					phone: true
				});
				$('#deviceInfoTable tbody').on('click', 'tr', function() {
					if($(this).hasClass('selected')) {
						$(this).removeClass('selected');
					} else {
						table.$('tr.selected').removeClass('selected');
						$(this).addClass('selected');
					}
				});
				$('#deviceInfoTable tbody').on('click', 'span', function() {
					var data = table.rows($(this).parents('tr')).data();
					console.log('当前行数据：', data);
					var isNum = $(this).attr("data");
					if(isNum == "1") {
						//编辑数据
						editTableList(data);
					} else if(isNum == '2') {
						//参数设置
						_this.EquipmentId = data[0].EquipmentId;
						$("#normalPanel").hide();
						$("#setPanel").show();
						$(".btnReturnList").unbind("click").click(function() {
							$("#normalPanel").show();
							$("#setPanel").hide();
							$("#EosBaseDveTab li").removeClass('active').eq(0).addClass('active');
							$(".tab-pane").removeClass('active').eq(0).addClass('active');
							$("#setPanel .tab-pane").each(function() {
								$(this).find(".card-box").eq(0).show()
								$(this).find(".card-box").eq(1).hide();
							})
						});
						$("#EquipmentIdHidden").val(data[0]['EquipmentId']);
						$("#BrandIdHidden").val(data[0]['BrandId']);
						$("#BigCategoryIdHidden").val(data[0]['RootId']);
						$("#SmallCategoryIdHidden").val(data[0]['SubId1']);
						$("#ProductTypeIdHidden").val(data[0]['SubId2']);
						_this.SubId2 = data[0]['SubId2'];
						FaultFn();
						ProtolFn();
						userManualFn();
						nameplateFn();
					} else if(isNum == "3") {
						//删除信息赋值 函数
						vdialog({
							type: 'confirm',
							title: '提示',
							content: eosCommon.DELETE_MSG_ASK,
							ok: function() { delRequest(data[0].EquipmentId); },
							cancel: true,
							modal: true
						});
					}
				});
				$('#EquipmentQueryBtn').unbind("click").click(function() {
					table.ajax.reload();
				});
				$('#EquipmentCancelBtn, #EquipmentReturnBtn').unbind("click").click(function() {
					$("#addEquipment").hide();
					$("#EquipmentTable").show();
					$("#BandSelect").selectpicker('val', '0');
					$("#BigCategoryRow,#SmallCategoryRow,#ProductTypeRow,#product_des_row,#select_img_row").hide();
					$('.panel-collapse').hide();
					$('.portlet-title').html("以下内容为非必填项，点击展开");
				});
				// 编辑数据444
				function editTableList(data) {
					eosCommon.resetFrom();

					$('.panel-collapse').hide();
					$('.portlet-title').html("以下内容为非必填项，点击展开");
					$("#EquipmentSaveBtn").show().attr('data-status', 'edit');
					$("#EquipmentTitle").html("编辑设备信息");
					$("#addEquipment").show();
					$("#EquipmentTable").hide();
					$("#BigCategoryRow,#SmallCategoryRow,#ProductTypeRow,#product_des_row,#select_img_row,.textItem").show();
					_this.getEquipmentType();
					_this.EquipmentTypeId = data[0]['EquipmentTypeId'];
					_this.$nextTick(() => {
						$('#EquipmentTypeSelect').selectpicker('refresh');
					});
					EquipmentId = data[0]['EquipmentId'];
					$('#ProtocolFirmwareVersionData').val(data[0]['FirmwareVersion']);
					$("#name").val(data[0]['EquipmentName']);
					$("#product_des").val(data[0]['Description']);
					$('input[name="IsActiveRadio"]').removeAttr("checked");
					$('input[name="IsActiveRadio"][value="' + data[0]['IsActive'] + '"]').prop("checked", true);
					$("#EquipmentModelNo").val(data[0]['EquipmentModelNo']);
					$("#SerialNo").val(data[0]['SerialNo']);
					$("#BandSelect").empty().append("<option value=" + data[0]['BrandId'] + ">" + data[0]['BrandName'] + "</option>");
					$("#BigCategorySelect").empty().append("<option value=" + data[0]['RootId'] + ">" + data[0]['RootName'] + "</option>");
					$("#SmallCategorySelect").empty().append("<option value=" + data[0]['SubId1'] + ">" + data[0]['SubId1Name'] + "</option>");
					$("#ProductTypeSelect").empty().append("<option value=" + data[0]['SubId2'] + ">" + data[0]['SubId2Name'] + "</option>");
					$("#BandSelect,#BigCategorySelect,#SmallCategorySelect,#ProductTypeSelect").selectpicker('refresh');
					initImgList = data[0]['EquipmentPhotosUrl'];
					_this.getImgList(initImgList)
				}
				//删除
				function delRequest(EquipmentId) {
					var param = {
						"AccessToken": eosCommon.storage.get("AccessToken"),
						"Parameters": {
							"EquipmentId": EquipmentId
						}
					};
					var url = eosCommon.PLATFORM_API + "api/base/DeleteEquipment";
					eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
							table.ajax.reload();
						}
					});
				}
				// 故障代码
				function FaultFn() {
					$("#FirmwareVersion").on("click", ".dropdown-menu li", function() {
						var obj = $(this).parents('#FirmwareVersion');
						obj.find(".group-text").html($(this).find(".text").html());
						$("#FirmwareVersionData").val($(this).find(".text").html());
						if($(this).find(".text").html() != "") {
							obj.find(".error, .focus").html("")
						}
					});
					$("#FirmwareVersion").on("click", ".dropdown-menu li input", function() {
						return false;
					});
					$("#FirmwareVersion").on("change", ".entry-input", function() {
						var obj = $(this).parents('#FirmwareVersion');
						obj.find(".group-text").html($(this).val());
						$("#FirmwareVersionData").val($(this).val());
						if($(this).find(".text").html() != "") {
							obj.find(".error, .focus").html("")
						}
					});

					$('#FaultQueryTxt').bind('keypress', function(event) {
						if(event.keyCode == "13") {
							FaultTable.ajax.reload();
						}
					});
					var FaultTable = $('#FaultTable').DataTable({
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
									"EquipmentId": $("#EquipmentIdHidden").val(),
									"FaultCode": $("#FaultQueryTxt").val().trim()
								}
							};
							var url = eosCommon.PLATFORM_API + "api/base/QueryEquipmentFault";
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
						"columns": [{
								"className": 'details-control FaultdetailsControl',
								"orderable": false,
								"data": null,
								"defaultContent": ''
							},
							{ defaultContent: "" },
							{ data: "FaultName" },
							{ data: "FaultCode" },
							{ data: "FaultDurabilityName" },
							//							{ data: "FaultLocation" },

							{ "defaultContent": "<span class='OperatorBtnEdit OperatorEdit' data='1' title='修改故障'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除故障'><i class='fa fa-trash-o'></i></span>" }
						]
					});
					$('#FaultQueryBtn').unbind("click").click(function() {
						FaultTable.ajax.reload();
					});
					$("#faultbtnImport").unbind("click").click(function() {
						var viewImportData = [];
						_this.saveImportData = [];
						_this.errorSign = 0;
						_this.bindEosBaseDveImport(viewImportData);
						//						console
						$("#FaultList").hide();
						$("#FaultAdd").hide();
						$('.panel-collapse').hide();
						$("#faultbtnImportBox").show();
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
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters.EquipmentId": $("#EquipmentIdHidden").val()
						};
						eosCommon.eosUploaderFile({
							'uploaderObj': 'uploaderFile',
							'uploaderBox': '.uploader_box1',
							'uploaderList': '.uploader-list',
							'initBtn': '#picker',
							'serverUrl': eosCommon.PLATFORM_API + "api/upload/fault",
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
									viewTemp.FaultCode = result.Data.UploadData[i]['故障代码'];
									//									viewTemp.FirmwareVersion = result.Data.UploadData[i]['固件版本号'];
									viewTemp.FaultName = result.Data.UploadData[i]['故障名称'];
									viewTemp.FaultDescription = result.Data.UploadData[i]['故障描述'];
									//									viewTemp.FaultType = result.Data.UploadData[i]['类型'];
									//									viewTemp.FaultLevel = result.Data.UploadData[i]['级别'];
									viewTemp.FaultDurability = result.Data.UploadData[i]['持久性'];
									viewTemp.FaultLocation = result.Data.UploadData[i]['故障位置'];

									//									viewTemp.ResetLevel = result.Data.UploadData[i]['复位级别'];
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
									saveTemp.FaultCode = result.Data.UploadData[i]['故障代码'];
									//									saveTemp.FirmwareVersion = result.Data.UploadData[i]['固件版本号'];
									saveTemp.FaultName = result.Data.UploadData[i]['故障名称'];
									saveTemp.FaultDescription = result.Data.UploadData[i]['故障描述'];
									//									saveTemp.FaultType = result.Data.UploadData[i]['类型'].substring('-')[0];
									//									saveTemp.FaultLevel = result.Data.UploadData[i]['级别'].substring('-')[0];
									saveTemp.FaultDurability = result.Data.UploadData[i]['持久性'].substring('-')[0];
									viewTemp.FaultLocation = result.Data.UploadData[i]['故障位置'];

									//									saveTemp.ResetLevel = result.Data.UploadData[i]['复位级别'].substring('-')[0];
									saveTemp.Remark = result.Data.UploadData[i]['备注'];
									_this.saveImportData.push(saveTemp);
								}
								_this.bindEosBaseDveImport(viewImportData);
							},
							'del': function(result) {
								var viewImportData = [];
								_this.saveImportData = [];
								_this.errorSign = 0;
								_this.bindEosBaseDveImport(viewImportData);
							}
						})
					});

					function saveImport() {
						btn = $(".loading_btn").button('loading');
						var param = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters": {
								"EquipmentId": $("#EquipmentIdHidden").val(),
								"Faults": _this.saveImportData
							}
						};
						var url = eosCommon.PLATFORM_API + "api/base/BatchFault";
						eosCommon.eosAjax(url, "POST", param, "json", function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
								FaultTable.ajax.reload();
								_this.saveImportData = [];
								_this.errorSign = 0;
								_this.bindEosBaseDveImport(_this.saveImportData);
								$("#FaultList").show();
								$("#FaultAdd,#faultbtnImportBox").hide();
								$(".loading_btn").button('reset');
							}
						});
					}
					$('#btnSaveTemplateData').unbind("click").click(function() {
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
								ok: function() {},
								modal: true
							});
						} else {
							saveImport();
						}

					});

					function FaultdetFormat(d) {
						return '<table class="table-bordered table table-hover" style="display: table;">' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">故障描述</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.FaultDescription == null ? "" : d.FaultDescription) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">故障位置</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.FaultLocation == null ? "" : d.FaultLocation) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">故障备注信息</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.Remark == null ? "" : d.Remark) + '</td>' +
							'</tr>'
						'</table>';
					};
					$('#FaultTable').unbind("click").on('click', 'td.FaultdetailsControl', function() {
						var tr = $(this).closest('tr');
						var row = FaultTable.row(tr);
						if(row.child.isShown()) {
							row.child.hide();
							tr.removeClass('shown');
						} else {
							row.child(FaultdetFormat(row.data())).show();
							tr.addClass('shown');
						}
					});
					FaultTable.on('draw.dt', function() {
						FaultTable.column(1, {
							search: 'applied',
							order: 'applied'
						}).nodes().each(function(cell, i) {
							i = i + 1;
							var page = FaultTable.page.info();
							var pageno = page.page;
							var length = page.length;
							var columnIndex = (i + pageno * length);
							cell.innerHTML = columnIndex;
						});
					});
					$('#FaultTable tbody').unbind("click").on('click', 'tr', function() {
						if($(this).hasClass('selected')) {
							$(this).removeClass('selected');
						} else {
							FaultTable.$('tr.selected').removeClass('selected');
							$(this).addClass('selected');
						}
					});
					$('#FaultTable tbody').unbind("click").on('click', 'span', function() {
						var data = FaultTable.rows($(this).parents('tr')).data();
						var isNum = $(this).attr("data");
						if(isNum == "1") {
							//编辑数据
							editFaultTableList(data);
						} else if(isNum == "3") {
							//删除信息赋值 函数
							vdialog({
								type: 'confirm',
								title: '提示',
								content: eosCommon.DELETE_MSG_ASK,
								ok: function() {
									eosCommon.eosAjax(
										eosCommon.PLATFORM_API + "api/base/DeleteEquipmentFault",
										"Delete", {
											"AccessToken": eosCommon.storage.get("AccessToken"),
											"Parameters": {
												"EquipmentFaultId": data[0]['EquipmentFaultId']
											}
										},
										"json",
										function(result) {
											if(eosCommon.checkCode(result.State, result.Message)) {
												eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
												FaultTable.ajax.reload();
											}
										}
									);
								},
								cancel: true,
								modal: true
							});
						}
					});
					verifyCheck({
						formId: 'FaultVerifyCheck',
						onBlur: null,
						onFocus: null,
						onChange: null,
						successTip: true,
						resultTips: null,
						clearTips: null,
						code: true,
						phone: true
					});
					$(".FaultCancelBtn,#FaultBtn,.faultBtnReturn").unbind("click").click(function() {
						$("#FaultList").show();
						$("#FaultAdd,#faultbtnImportBox").hide();
						$('.panel-collapse').hide();
						$('.portlet-title').html("以下内容为非必填项，点击展开");
					})
					$("#addFaultBtn").unbind("click").click(function() {
						eosCommon.resetFrom()
						$('.panel-collapse').hide();
						$('.portlet-title').html("以下内容为非必填项，点击展开");
						$("#FirmwareVersion .group-text").html("");
						$("#FirmwareVersion input").val("");
						$("#FaultSaveBtn").attr('data-status', 'save');
						$("#FaultTitle").html("新增故障代码");
						$("#FaultList").hide();
						$("#FaultAdd").show();
						$("#FaultLocation,#FaultCode,#FaultName,#FaultDescription,#FaultRemark").val('');
						$("#FaultType,#FaultLevel,#FaultDurability,#FaultResetLevel").selectpicker('val', '');
						$("#FaultType").selectpicker('val', '0');
						$("#FaultLevel").selectpicker('val', '1');
						$("#FaultDurability").selectpicker('val', '1');
						$("#FaultResetLevel").selectpicker('val', '1');
					});
					$("#FaultSaveBtn").unbind("click").click(function() {
						if(!verifyCheck._click("FaultVerifyCheck")) return false;
						if($(this).attr('data-status') == 'save') {
							btn = $(".loading_btn").button('loading');
							eosCommon.eosAjax(
								eosCommon.PLATFORM_API + "api/base/InsertEquipmentFault",
								"Post", {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"Parameters": {
										"EquipmentId": $("#EquipmentIdHidden").val(),
										"FirmwareVersion": $("#FirmwareVersionData").val(),
										"FaultLocation": $("#FaultLocation").val(),
										"FaultCode": $("#FaultCode").val(),
										"FaultName": $("#FaultName").val(),
										"FaultType": '0',
										"FaultLevel": '1',
										"FaultDurability": $("#FaultDurability").selectpicker('val'),
										"FaultDescription": $("#FaultDescription").val(),
										"ResetLevel": '1',
										"Remark": $("#FaultRemark").val()
									}
								},
								"json",
								function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {
										FaultTable.ajax.reload();
										eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
										$("#FaultList").show();
										$("#FaultAdd").hide();
										$('.panel-collapse').hide();
										$('.portlet-title').html("以下内容为非必填项，点击展开");
										$(".loading_btn").button('reset');
									}
								}
							);
						} else {
							btn = $(".loading_btn").button('loading');
							eosCommon.eosAjax(
								eosCommon.PLATFORM_API + "api/base/UpdateEquipmentFault",
								"Put", {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"Parameters": {
										"EquipmentFaultId": $("#FaultSaveBtn").attr('data-id'),
										"EquipmentId": $("#EquipmentIdHidden").val(),
										"FirmwareVersion": '1.0',
										"FaultLocation": $("#FaultLocation").val(),
										"FaultCode": $("#FaultCode").val(),
										"FaultName": $("#FaultName").val(),
										"FaultType": '1',
										"FaultLevel": '1',
										"FaultDurability": $("#FaultDurability").selectpicker('val'),
										"FaultDescription": $("#FaultDescription").val(),
										"ResetLevel": '1',
										"Remark": $("#FaultRemark").val()
									}
								},
								"json",
								function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {
										FaultTable.ajax.reload();
										eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
										$("#FaultList").show();
										$("#FaultAdd").hide();
										$('.panel-collapse').hide();
										$('.portlet-title').html("以下内容为非必填项，点击展开");
										$(".loading_btn").button('reset');
									}
								}
							);
						}
					})

					function editFaultTableList(data) {
						eosCommon.resetFrom();
						$('.panel-collapse').hide();
						$('.portlet-title').html("以下内容为非必填项，点击展开");
						eosCommon.resetFrom();
						$("#FirmwareVersion input").val("");
						$("#FaultSaveBtn").attr('data-status', 'edit');
						$("#FaultTitle").html("编辑故障代码");
						$("#FaultSaveBtn").attr('data-id', data[0]['EquipmentFaultId']);
						$("#FaultList").hide();
						$("#FaultAdd").show();
						$("#FirmwareVersionData").val(data[0]['FirmwareVersion']);
						$("#FirmwareVersion .group-text").html(data[0]['FirmwareVersion']);
						$("#FaultLocation").val(data[0]['FaultLocation']);
						$("#FaultCode").val(data[0]['FaultCode']);
						$("#FaultName").val(data[0]['FaultName']);
						$("#FaultType").selectpicker('val', data[0]['FaultType']);
						$("#FaultLevel").selectpicker('val', data[0]['FaultLevel']);
						$("#FaultDurability").selectpicker('val', data[0]['FaultDurability']);
						$("#FaultDescription").val(data[0]['FaultDescription']);
						$("#FaultResetLevel").selectpicker('val', data[0]['ResetLevel']);
						$("#FaultRemark").val(data[0]['Remark']);
						var firmwareParams = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters": {
								"EquipmentId": $("#EquipmentIdHidden").val()
							}
						}
						eosCommon.eosAjax(eosCommon.PLATFORM_API + 'api/base/FirmwareVersion', "GET", firmwareParams, "json", function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								_this.FirmwareVersionList = result.Data.Result
							}
						});
					}
				}

				// 通信协议
				function ProtolFn() {
					$("#ProtocolFirmwareVersion").on("click", ".dropdown-menu li", function() {
						var obj = $(this).parents('#ProtocolFirmwareVersion');
						obj.find(".group-text").html($(this).find(".text").html());

						$("#ProtocolFirmwareVersionData").val($(this).find(".text").html());
						if($(this).find(".text").html() != "") {
							obj.find(".error, .focus").html("")
						}
					});
					$("#ProtocolFirmwareVersion").on("click", ".dropdown-menu li input", function() {
						return false;
					});
					$("#ProtocolFirmwareVersion").on("change", ".entry-input", function() {
						var obj = $(this).parents('#ProtocolFirmwareVersion');
						obj.find(".group-text").html($(this).val());

						$("#ProtocolFirmwareVersionData").val($(this).val());
						if($(this).find(".text").html() != "") {
							obj.find(".error, .focus").html("")
						}
					});
					var firmwareParams = {
						"AccessToken": eosCommon.storage.get("AccessToken"),
						"Parameters": {
							"EquipmentId": $("#EquipmentIdHidden").val()
						}
					}
					eosCommon.eosAjax(eosCommon.PLATFORM_API + 'api/base/FirmwareVersion', "GET", firmwareParams, "json", function(result) {
						if(eosCommon.checkCode(result.State, result.Message)) {
							_this.FirmwareVersionList = result.Data.Result
						}
					});
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
									"EquipmentId": $("#EquipmentIdHidden").val(),
									"ProtocolAddress": $("#ProtocolQueryTxt").val().trim()
								}
							};
							var url = eosCommon.PLATFORM_API + "api/base/QueryEquipmentProtocol";
							eosCommon.eosAjax(url, "GET", param, "json", function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {

									var returnData = {};
									var EquipmentProtocolIdData = [];
									if(result.Data == "") {
										returnData.draw = data.draw;
										returnData.recordsTotal = 0;
										returnData.recordsFiltered = 0;
										returnData.data = [];
										_this.EquipmentProtocolIdData = EquipmentProtocolIdData;
									} else {
										_this.EquipmentId = result.Data.Result[0].EquipmentId;
										_this.getFaultDatas();
										returnData.draw = data.draw;
										returnData.recordsTotal = result.Data.Total;
										returnData.recordsFiltered = result.Data.Total;
										for(var i = 0; i < result.Data.Result.length; i++) {
											var dataJson = {};
											var spliceFirstDataArr = [];
											dataJson.DataType = result.Data.Result[i].DataType;
											dataJson.EquipmentId = result.Data.Result[i].EquipmentId;
											dataJson.ProtocolAddress = result.Data.Result[i].ProtocolAddress;
											dataJson.FirmwareVersion = result.Data.Result[i].FirmwareVersion;
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
										console.log('黄啊：', _this.EquipmentProtocolIdData)
									}
									returnData.data = _this.EquipmentProtocolIdData;
									callback(returnData);
									eosCommon.eosOperators(eosCommon.eosOperDataHandle());
								}
							});
						},
						"columns": [{
								"className": 'details-control ProtocolControl',
								"orderable": false,
								"data": null,
								"defaultContent": ''
							},
							{ defaultContent: "" },
							{ data: "ProtocolAddress" },
							{ data: "DataType" },
							{ data: "DataModel" },
							{ data: "Offset" },
							{ data: "Ratio" },
							// { data: "ConvertToName" },
							// { data: "ConvertByName" },
							// { data: "DisplayName" },
							// { data: "Unit" },
							{ "defaultContent": "<span class='OperatorBtnEdit OperatorEdit' data='1' title='修改通信协议'><i class='fa fa-pencil'></i></span><span class='OperatorBtnDel OperatorDel' data='3' title='删除通信协议'><i class='fa fa-trash-o'></i></span>" }
						]
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
						$("#fileBox2").html(
							'<div id="fileDnd2" class="uploader_box2 eos_uploader_box">' +
							'<div class="wu-example">' +
							'<div class="uploader-list"></div>' +
							'<div class="btns">' +
							'<div id="picker2">选择上传文件</div>' +
							'</div>' +
							'</div>' +
							'</div>'
						);
						var param = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters.EquipmentId": $("#EquipmentIdHidden").val()
						};
						eosCommon.eosUploaderFile({
							'uploaderObj': 'uploaderFile',
							'uploaderBox': '.uploader_box2',
							'uploaderList': '.uploader-list',
							'initBtn': '#picker2',
							'serverUrl': eosCommon.PLATFORM_API + "api/upload/protocol",
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
									viewTemp.ModbusAddress = result.Data.UploadData[i]['Modbus地址'];
									//									viewTemp.FirmwareVersion = result.Data.UploadData[i]['固件版本号'];
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
									saveTemp.ModbusAddress = result.Data.UploadData[i]['Modbus地址'];
									saveTemp.FirmwareVersion = result.Data.UploadData[i]['固件版本号'];
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
									saveTemp.Remark = result.Data.UploadData[i]['备注'];
									_this.saveImportData.push(saveTemp);
								}
								_this.bindProtocolImport(viewImportData);
							},
							'del': function(result) {
								var viewImportData = [];
								_this.saveImportData = [];
								_this.errorSign = 0;
								_this.bindProtocolImport(viewImportData);
							}
						})
					});

					function saveProtocaolImport() {
						btn = $(".loading_btn").button('loading');
						var param = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters": {
								"EquipmentId": $("#EquipmentIdHidden").val(),
								"Protocols": _this.saveImportData

							}
						};
						console.log(JSON.stringify(param))
						var url = eosCommon.PLATFORM_API + "api/base/BatchProtocol";
						eosCommon.eosAjax(url, "POST", param, "json", function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
								ProtocolTable.ajax.reload();
								_this.saveImportData = [];
								_this.errorSign = 0;
								_this.bindEosBaseDveImport(_this.saveImportData);
								$("#ProtocolAdd,#ProtoImportBox").hide();
								$("#ProtoList").show();
								$(".loading_btn").button('reset');
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
								ok: function() {},
								modal: true
							});
						} else {
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
						return '<table class="table-bordered table table-hover" style="display: table;">' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">转换类型</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + d.ConvertToName + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">转换方式</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + d.ConvertByName + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">中文名</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.DisplayName == null ? "" : d.DisplayName) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">英文名</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.EnglishName == null ? "" : d.EnglishName) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">显示单位</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.Unit == null ? "" : d.Unit) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">故障代码</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.FaultCode == null ? "" : d.FaultCode) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">故障级别</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.FaultLevelName == null ? "" : d.FaultLevelName) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">故障描述</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.FaultDescription == null ? "" : d.FaultDescription) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">固件版本</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.FirmwareVersion == null ? "" : d.FirmwareVersion) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">所属群组</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.GroupName == null ? "" : d.GroupName) + '</td>' +
							'</tr>' +
							'<tr>' +
							'<td style="width: 150px;text-align: right;padding: 8px 12px;">备注信息</td>' +
							'<td style="text-align: left;padding: 8px 12px;">' + (d.Remark == null ? "" : d.Remark) + '</td>' +
							'</tr>'
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
							editProtocolTableList(data);
						} else if(isNum == "3") {
							//删除信息赋值 函数
							vdialog({
								type: 'confirm',
								title: '提示',
								content: eosCommon.DELETE_MSG_ASK,
								ok: function() {
									eosCommon.eosAjax(
										eosCommon.PLATFORM_API + "api/base/DeleteEquipmentProtocol",
										"Delete", {
											"AccessToken": eosCommon.storage.get("AccessToken"),
											"Parameters": {
												"EquipmentProtocolId": data[0]['EquipmentProtocolId']
											}
										},
										"json",
										function(result) {
											if(eosCommon.checkCode(result.State, result.Message)) {
												eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
												ProtocolTable.ajax.reload();
											}
										}
									);
								},
								cancel: true,
								modal: true
							});
						}
					});
					$(".ProtocolCancelBtn,#ProtocolBtn,.ProtocolBtnReturn").unbind('click').click(function() {
						_this.bitIndex = 1;
						_this.subAdreesIndex = 1;
						$("#ProtocolAdd,#ProtoImportBox").hide();
						$("#ProtoList").show();
						$('.panel-collapse').hide();
						$('.portlet-title').html("以下内容为非必填项，点击展开");
					});
					$("#addProtocolBtn").unbind('click').click(function() {
						//新增通信
						eosCommon.resetFrom();
						_this.ProtocolAddress = '';
						var firmwareParams = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters": {
								"EquipmentId": $("#EquipmentIdHidden").val()
							}
						}
						eosCommon.eosAjax(eosCommon.PLATFORM_API + 'api/base/FirmwareVersion', "GET", firmwareParams, "json", function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								_this.FirmwareVersionList = result.Data.Result
							}
						});
						$('.panel-collapse').hide();
						$('.portlet-title').html("以下内容为非必填项，点击展开");
						$("#ProtocolSaveBtn").attr('data-status', 'save');
						$("#ProtocolAdd").show();
						$("#ProtoList").hide();
						$("#ProtocolTitle").html("新增通讯协议");
						$("#ProtocolFaultCode_0 .group-text").html("");
						$("#ProtocolFaultCode_0 .group-text").attr("id", '');

						$("#ProtocolFaultCode_0 input").val("");
						_this.isBitMask = false;
						_this.protocLists = $('.protocList');
						console.log('列表长度：', _this.protocLists.length)
						for(var i = 1; i < _this.protocLists.length; i++) {
							_this.protocLists[i].remove();
						}
						$("#ProtocolFirmwareVersion,#ProtocolAddress,#subProtocolAddress_0,#ProtocolOffset_0,#ProtocolRatio_0,#ProtocolDisplayName_0,#EnglishName_0,#ProtocolUnit_0,#ProtocolFaultDescription_0,#ProtocolRemark_0").val('');
						$("#ProtocolDataType,#ProtocolDataModel_0,#ProtocolConvertTo_0,#ProtocolConvertBy_0,#ProtocolFaultLevel_0").selectpicker('val', '');
						$("#ProtocolDataType").selectpicker('val', 'SInt16');
						$("#ProtocolDataType").selectpicker('refresh');
						$("#ProtocolDataModel_0").selectpicker('val', 'HL');
						$("#ProtocolConvertTo_0").selectpicker('val', '0');
						$("#ProtocolConvertBy_0").selectpicker('val', '0');
						//					$("#ProtocolFaultLevel_0").selectpicker('val', 0);
						$('#FaultDurability_0').attr('data-val', '');
						//					$("#ProtocolFaultCode_0").change(function() {
						//						var curVal=$(this).selectpicker('val')
						////						console.log('你好:',$(this)[0].selectedOptions[0].innerHTML)
						//						if(!curVal){						
						//							$('#FaultDurability_0').val('');
						//              			$('#ProtocolFaultDescription_0').val('');
						//              			$('#ProtocolRemark_0').val('');
						//						}
						//	                	for(var i=0;i<_this.getFaultDataLists.length;i++){
						//	                		if(curVal==_this.getFaultDataLists[i].EquipmentFaultId){
						//	                			_this.getFaultDataLists[i].FaultDurabilityName=='锁定' ? $('#FaultDurability_0').attr('data-val',1):$('#FaultDurability_0').attr('data-val',2);	               			
						//	                			$('#FaultDurability_0').val(_this.getFaultDataLists[i].FaultDurabilityName);
						//	                			$('#ProtocolFaultDescription_0').val(_this.getFaultDataLists[i].FaultDescription);
						//	                			$('#ProtocolRemark_0').val(_this.getFaultDataLists[i].Remark);
						//	                		}
						//	                		
						//	                	}
						//          		})

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

							//							_this.getFaultDatas();
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
							console.log('输入值：', $(this).val())
							for(var i = 0; i < _this.getFaultDataLists.length; i++) {
								console.log('pipeizhi：', _this.getFaultDataLists[i].FaultCode)

								if($.trim($(this).val()) !== $.trim(_this.getFaultDataLists[i].FaultCode)) {
									continue;
								} else {
									var obj = $(this).parents('#ProtocolFaultCode_0');
									obj.find(".group-text").html($(this).val());
									obj.find(".group-text").attr('id', _this.getFaultDataLists[i].EquipmentFaultId);
									$(this).val('');
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
						var params = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters": {
								"Type": "B",
								"EquipmentId": $("#EquipmentIdHidden").val()
							}
						}
						eosCommon.eosAjax(eosCommon.COMMON_API + 'api/common/group', "GET", params, "json", function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								_this.groupList = result.Data
							}
						});
					})
					$("#ProtocolSaveBtn").unbind('click').click(function() {
						//baocun
						var paramsArr = [];
						var protocList = $('.protocList');
						var GroupName = "";
						if($("#group .group-text").html() == "" || $("#group .group-text").html() == "请选择或输入协议分组名称") {
							GroupName = "默认群组";
						} else {
							GroupName = $("#group .group-text").html();
						}
						for(var i = 0; i < protocList.length; i++) {
							console.log('故障代码：', $("#ProtocolFaultCode_" + i))
							console.log(GroupName)
							var paramsJson = {

								"DataModel": $("#ProtocolDataModel_" + i).selectpicker('val'),
								"Offset": $("#ProtocolOffset_" + i).val(),
								"Ratio": $("#ProtocolRatio_" + i).val(),
								"ConvertTo": $("#ProtocolConvertTo_" + i).selectpicker('val'),
								"ConvertBy": $("#ProtocolConvertBy_" + i).selectpicker('val'),
								"DisplayName": $("#ProtocolDisplayName_" + i).val(),
								"EnglishName": $("#EnglishName_" + i).val(),
								"Unit": $("#ProtocolUnit_" + i).val(),
								//												"FaultCode": $("#ProtocolFaultCode_" + i)[0].selectedOptions[0].innerHTML=='请选择故障代码'?$("#ProtocolFaultCode_" + i).selectpicker('val'):$("#ProtocolFaultCode_" + i)[0].selectedOptions[0].innerHTML,
								"FaultCode": $("#ProtocolFaultCode_" + i + " .group-text").html(),
								"EquipmentFaultId": $("#ProtocolFaultCode_" + i).find(".group-text").attr('id'),
								"FaultLevel": '1',
								'FaultDurability': $('#FaultDurability_' + i).attr('data-val'),

								"FaultDescription": $("#ProtocolFaultDescription_" + i).val(),
								"Remark": $("#ProtocolRemark_" + i).val(),
								"SubProtocolAddress": $("#subProtocolAddress_" + i).val(),
								"BeginPointIndex": $("#bit1_" + i).val(),
								"EndPointIdex": $("#bit2_" + i).val(),
								"SubEquipmentProtocolId": $("#subProtocolAddress_" + i).attr('data-id')

							}

							paramsArr.push(paramsJson)
						}
						console.log('参数protocList111:', JSON.stringify({
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"EquipmentId": $("#EquipmentIdHidden").val(),
							"ProtocolAddress": $("#ProtocolAddress").val(),
							"DataType": $("#ProtocolDataType").selectpicker('val'),
							"GroupName": GroupName,
							"FirmwareVersion": '1.0',
							"SubProtocols": paramsArr
						}));
						if(!verifyCheck._click("ProtocolVerifyCheck")) return false;
						if($("#ProtocolFaultDescription").val() == "暂无匹配数据，请检查故障代码是否填写正确") {
							return false;
						}

						if($(this).attr('data-status') == 'save') {
							btn = $(".loading_btn").button('loading');
							eosCommon.eosAjax(
								eosCommon.PLATFORM_API + "api/base/InsertEquipmentProtocol",
								"Post", {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"EquipmentId": $("#EquipmentIdHidden").val(),
									"ProtocolAddress": $("#ProtocolAddress").val(),
									"DataType": $("#ProtocolDataType").selectpicker('val'),
									"GroupName": GroupName,
									"FirmwareVersion": '1.0',
									"SubProtocols": paramsArr
								},
								"json",
								function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {
										ProtocolTable.ajax.reload();
										eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
										$("#ProtocolAdd").hide();
										$("#ProtoList").show();
										$('.panel-collapse').hide();
										$('.portlet-title').html("以下内容为非必填项，点击展开");
										$(".loading_btn").button('reset');
									}
								}
							);
						} else {
							btn = $(".loading_btn").button('loading');
							console.log('参数protocList222:', JSON.stringify({
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"EquipmentId": $("#EquipmentIdHidden").val(),
								"ProtocolAddress": $("#ProtocolAddress").val(),
								"DataType": $("#ProtocolDataType").selectpicker('val'),
								"GroupName": GroupName,
								"FirmwareVersion": '1.0',
								"ParentEquipmentProtocolId": $("#ProtocolAddress").attr('data-id'),
								"SubProtocols": paramsArr

							}));
							eosCommon.eosAjax(
								eosCommon.PLATFORM_API + "api/base/UpdateEquipmentProtocol",
								"Put", {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"EquipmentId": $("#EquipmentIdHidden").val(),
									"ProtocolAddress": $("#ProtocolAddress").val(),
									"DataType": $("#ProtocolDataType").selectpicker('val'),
									"GroupName": GroupName,
									"FirmwareVersion": '1.0',
									"ParentEquipmentProtocolId": $("#ProtocolAddress").attr('data-id'),
									"SubProtocols": paramsArr

								},
								"json",
								function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {
										ProtocolTable.ajax.reload();
										eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
										$("#ProtocolAdd").hide();
										$("#ProtoList").show();
										$('.panel-collapse').hide();
										$('.portlet-title').html("以下内容为非必填项，点击展开");
										$(".loading_btn").button('reset');
									}
								}
							);
						}
						_this.bitIndex = 1;
						_this.subAdreesIndex = 1;
					});

					function editProtocolTableList(data) {
						eosCommon.resetFrom();
						//						var firmwareParams = {
						//							"AccessToken": eosCommon.storage.get("AccessToken"),
						//							"Parameters": {
						//								"EquipmentId": $("#EquipmentIdHidden").val()
						//							}
						//						}
						//						eosCommon.eosAjax(eosCommon.PLATFORM_API + 'api/base/FirmwareVersion', "GET", firmwareParams, "json", function(result) {
						//							if(eosCommon.checkCode(result.State, result.Message)) {
						//								_this.FirmwareVersionList = result.Data.Result
						//							}
						//						});
						$('.panel-collapse').hide();
						$('.portlet-title').html("以下内容为非必填项，点击展开");
						$("#ProtocolSaveBtn").attr('data-status', 'edit');
						_this.protocLists = $('.protocList');
						console.log('列表长度：', data)
						for(var i = 1; i < _this.protocLists.length; i++) {
							_this.protocLists[i].remove();

						}
						$("#ProtocolAddress").val(data[0]["ProtocolAddress"]);
						_this.ProtocolAddress = data[0]["ProtocolAddress"];
						$("#ProtocolDataType").selectpicker('val', data[0]["DataType"]);
						$("#ProtocolAddress").attr('data-id', data[0]['EquipmentProtocolId']);
						//						$("#group .group-text").val(data[0]["GroupName"]);
						$("#ProtocolFirmwareVersionData").val(data[0]['FirmwareVersion']);
						$("#ProtocolFirmwareVersion .group-text").html(data[0]['FirmwareVersion']);
						$("#group .group-text").html(data[0]['GroupName']);
						$("#ProtocolFaultCode_0 .group-text").html(data[0]['FaultCode']);
						$("#ProtocolFaultCode_0 .group-text").attr('id', data[0]['EquipmentFaultId']);
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

							console.log('输入值：', $(this).val())
							for(var i = 0; i < _this.getFaultDataLists.length; i++) {
								console.log('pipeizhi：', _this.getFaultDataLists[i].FaultCode)

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
						$("#ProtocolAdd").show();
						$("#ProtoList").hide();
						$("#ProtocolTitle").html("编辑通讯协议");

						var datas = data[0].SubProtocols;
						if(data[0]["DataType"] == 'BitMask32' || data[0]["DataType"] == 'BitMask16') {
							_this.isBitMask = true;
							for(var i = 0; i < datas.length - 1; i++) {
								console.log('i的值：', i);
								_this.addRow();
							}
							for(var i = 0; i < datas.length; i++) {
								$('#bit1_' + i).val(datas[i]['BeginPointIndex']);
								$('#bit2_' + i).val(datas[i]['EndPointIdex']);
								$("#subProtocolAddress_" + i).attr('data-id', datas[i]['EquipmentProtocolId']);
								_this.editProtocolInitDatas(i, datas);
							}

						} else {
							for(var i = 0; i < datas.length; i++) {
								_this.editProtocolInitDatas(i, datas);
							}

						}

						$("#group").on("click", ".dropdown-menu li", function() {
							var obj = $(this).parents('#group');
							obj.find(".group-text").html($(this).find(".text").html());
						});
						$("#group").on("change", ".entry-input", function() {
							var obj = $(this).parents('#group');
							obj.find(".group-text").html($(this).val());
						});
						var params = {
							"AccessToken": eosCommon.storage.get("AccessToken"),
							"Parameters": {
								"Type": "B",
								"EquipmentId": $("#EquipmentIdHidden").val()
							}
						}
						eosCommon.eosAjax(eosCommon.COMMON_API + 'api/common/group', "GET", params, "json", function(result) {
							if(eosCommon.checkCode(result.State, result.Message)) {
								_this.groupList = result.Data
							}
						});
					};
					$("#ProtocolFaultCode").unbind('change').change(function() {
						eosCommon.eosAjax(
							eosCommon.PLATFORM_API + "api/base/QueryEquipmentFault",
							"Get", {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"EquipmentId": $("#EquipmentIdHidden").val(),
									"FaultCode": $(this).val()
								}
							},
							"json",
							function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {
									if(result.Data == "") {
										$("#ProtocolFaultDescription").val("暂无匹配数据，请检查故障代码是否填写正确");
									} else {
										$("#ProtocolFaultDescription").val(result.Data.Result[0]['FaultDescription']);
										$("#ProtocolFaultLevel").selectpicker('val', result.Data.Result[0]["FaultLevel"])
									}
								}
							}
						);
					});
				}

				//  用户手册
				function userManualFn() {
					var ManualresourceId = '';
					var format = '';
					var size = '';

					function getUserManualList() {
						eosCommon.eosAjax(
							eosCommon.PLATFORM_API + "api/base/QueryEquipmentManuals",
							"Get", {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"PageIndex": 0,
								"PageSize": 0,
								"Parameters": {
									"EquipmentId": _this.EquipmentId
								}
							},
							"json",
							function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {
									$("#uSerManualList").empty();
									if(result.Data == '') {
										$("#uSerManualList").append("<li>暂无数据</li>")
									} else {
										console.log('数据：', result.Data);
										for(var i = 0; i < result.Data.Files.length; i++) {
											$("#uSerManualList").append(
												'<li class="list_item">' +
												'<a class="fa fa-download OperatorDownload d text-success" href="' + result.Data.Files[i]['FilePath'] + '"></a>' +
												'<span class="tran-text"><a class="text-custom e" target="_blank" data-size="' + result.Data.Files[i]['FileSize'] + '" data-format="' + result.Data.Files[i]['Format'] + '">' + result.Data.Files[i]['FileName'] + '</a></span>' +
												'<div class="userManualOperBtn"><span class="OperatorBtnEdit userManuaEdit OperatorEdit" title="编辑信息" data-eid="' + result.Data.Files[i]['FileId'] + '" data-remark="' + result.Data.Files[i]['Remark'] + '" data-FilePath="' + result.Data.Files[i]['FilePath'] + '" ><i class="fa fa-pencil"></i></span><span class="OperatorBtnDel userManualDelBtn OperatorDel" data-eid="' + result.Data.Files[i]['FileId'] + '" title="删除信息" ><i class="fa fa-trash-o"></i></span></div>' +
												'<span class="clearfix"></span>' +
												'</li>')
										}
										eosCommon.eosOperators(eosCommon.eosOperDataHandle());
									}
								}
							}
						)
					}

					function addUserManualUpload(saveType) {
						$("#UserManualAdd .uploadImgBox").empty().append(
							'<div id="fileDnd1" class="uploader_box3 eos_uploader_box">' +
							'<p class="uploader_box_title pb-5">请选择文件，每次只能上传一个文件，文件大小不超过16M，文件格式.doc/.docx/.xls/.xlsx/.pdf等</p>' +
							'<div class="wu-example">' +
							'<div class="uploader-list"></div>' +
							'<div class="btns">' +
							'<div id="picker3">选择文件</div>' +
							'</div>' +
							'</div>' +
							'</div>');
						eosCommon.eosUploaderFile({
							'uploaderObj': 'uploaderFile',
							'uploaderBox': '.uploader_box3',
							'uploaderList': '.uploader-list',
							'initBtn': '#picker3',
							'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
							'data': {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"ResourceType": "0"
								// "Brand":$("#BrandIdHidden").val(),
								// "BigCategory":$("#BigCategoryIdHidden").val(),
								// "SmallCategory":$("#SmallCategoryIdHidden").val(),
								// "ProductType":$("#ProductTypeIdHidden").val()
							},
							'fileNumLimit': 1,
							'upType': 0,
							'succ': function(result) {
								if(saveType == '新增') {
									$(" #UserManuaSaveBtn").show();
									_this.isAddFiled = true;
									ManualresourceId = result.Data[0].ResourceId;
									_this.format = result.Data[0].Format;
									_this.size = result.Data[0].Size;
									return;
								}
								$("#UserManuaSaveBtn").show();
								_this.editNewFileId = result.Data[0].ResourceId;
								_this.format = result.Data[0].Format;
								_this.size = result.Data[0].Size;
							},
							'del': function(result) {
								if(result != "") {
									_this.format = '';
									_this.size = '';
									if(saveType == '新增') {
										_this.isAddFiled = false;
										var param = {
											"AccessToken": eosCommon.storage.get("AccessToken"),
											"Parameters": {
												"ResourceId": result,
												"ResourceType": "0"
											}
										};
										var url = eosCommon.RESOURCES_API + "api/equipment/DeleteManuals";
										eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
											if(eosCommon.checkCode(result.State, result.Message)) {}
										});
										return;
									}
									_this.editNewFileId = '';
									_this.format = format;
									_this.size = size;
									var param = {
										"AccessToken": eosCommon.storage.get("AccessToken"),
										"Parameters": {
											"ResourceId": result,
											"ResourceType": "0"
										}
									};
									var url = eosCommon.RESOURCES_API + "api/equipment/DeleteManuals";
									eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
										if(eosCommon.checkCode(result.State, result.Message)) {}
									});
								}
							}
						})
					}
					getUserManualList();

					$("#addUserManualBtn").unbind("click").click(function() {
						$("#UserManualAdd").show();
						$("#UserManual").hide();
						$("#UserManuaSaveBtn").attr('data-status', 'save');
						$("#uploadFileListBox").hide();
						$("#UserManualName").val("");
						$("#UserManualRemark").val("");
						addUserManualUpload('新增')
					});
					$("#UserManuaCancelBtn").unbind("click").click(function() {
						$("#UserManualAdd").hide();
						$("#UserManual").show();
					})
					$("#UserManuaSaveBtn").unbind("click").click(function() {
						if($("#UserManualName").val() == '') {
							vdialog({
								title: '系统提示',
								type: 'alert',
								modal: true,
								content: "请填写手册名称",
								ok: true
							});
							return false;
						}
						if($("#UserManualRemark").val() == '') {
							vdialog({
								title: '系统提示',
								type: 'alert',
								modal: true,
								content: "请填写手册备注",
								ok: true
							});
							return false;
						}

						if($(this).attr('data-status') == 'save') {
							if(!_this.isAddFiled) {
								vdialog({
									title: '系统提示',
									type: 'alert',
									modal: true,
									content: "请上传用户手册文件",
									ok: true
								});
								return false;
							}
							//							document.write(JSON.stringify({
							//									"AccessToken": eosCommon.storage.get("AccessToken"),
							//									"Parameters": {
							//										"EquipmentId": _this.EquipmentId,
							//	                                    "FileName": $("#UserManualName").val(),
							//	                                    "Format": _this.format,
							//	                                    "FileSize": _this.size,
							//	                                    "FileId": ManualresourceId,
							//	                                    "Remark": $("#UserManualRemark").val()
							//									}
							//								}));
							eosCommon.eosAjax(
								eosCommon.PLATFORM_API + "api/base/InsertEquipmentManuals",
								"Post", {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"Parameters": {
										"EquipmentId": _this.EquipmentId,
										"FileName": $("#UserManualName").val(),
										"Format": _this.format,
										"FileSize": _this.size,
										"FileId": ManualresourceId,
										"Remark": $("#UserManualRemark").val()
									}
								},
								"json",
								function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {
										$("#UserManualAdd").hide();
										$("#UserManual").show();
										getUserManualList();
										$("#UserManualAdd .uploadImgBox").empty();
										eosCommon.eosMessage("success", eosCommon.INSERT_FILE_MSG);
									}
								}
							);
							_this.isAddFiled = false;

						} else {
							eosCommon.eosAjax(
								eosCommon.PLATFORM_API + "api/base/UpdateEquipmentManuals",
								"Put", {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"Parameters": {
										"OldFileId": _this.editManualFielId,
										"NewFileId": _this.editNewFileId,
										"EquipmentId": _this.EquipmentId,
										"FileName": $("#UserManualName").val(),
										"FileSize": _this.size,
										"Format": _this.format,
										"Remark": $("#UserManualRemark").val()
									}
								},
								"json",
								function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {
										$("#UserManualAdd").hide();
										$("#UserManual").show();
										getUserManualList();
										$("#UserManualAdd .uploadImgBox").empty();
										eosCommon.eosMessage("success", eosCommon.UPDATE_FILE_MSG);
									}
								}
							);
						}
					});
					$("#uSerManualList").on('click', '.userManualDelBtn', function() {
						var __this = $(this);
						console.log(_this)

						vdialog({
							type: 'confirm',
							title: '提示',
							content: eosCommon.DELETE_MSG_ASK,
							ok: function() {
								var param = {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"Parameters": {
										"EquipmentId": _this.EquipmentId,
										"FileId": __this.attr("data-eid")
									}
								};

								var url = eosCommon.PLATFORM_API + "api/base/DeleteEquipmentManuals";
								eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {
										eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
										__this.parent("li.list_item").remove();
										getUserManualList();
									}
								});
							},
							cancel: true,
							modal: true
						});
					});
					$("#uSerManualList").on('click', '.userManuaEdit', function() {
						$("#UserManualAdd").show();
						$("#UserManual").hide();
						$("#uploadFileListBox").show();
						_this.manualFielPath = $(this).attr('data-FilePath');
						_this.editManualFielId = $(this).attr('data-eid');
						$("#UserManuaSaveBtn").show().attr('data-status', 'edit');
						$("#UserManuaSaveBtn").attr('data-eid', $(this).attr('data-eid'));
						$("#UserManualName").val($(this).parents(".list_item").find("a.e").html());
						console.log('qqqqq', $(this).attr('data-remark'));
						$("#UserManualRemark").val($(this).attr('data-remark'));
						$(".uploadFileList a").attr('href', $(this).parents(".list_item").find("a.d").attr('href')).html($(this).parents(".list_item").find("a.e").html());
						format = $(this).parents(".list_item").find("a.e").attr('data-format');
						console.log('aaaaaaa', $('a.e'));
						size = $(this).parents(".list_item").find("a.e").attr('data-size');
						_this.format = format;
						_this.size = size;
						console.log('format1:', format);
						console.log('size1:', size);
						$("#UserManualAdd .uploadImgBox").empty();
						$("#resetManualFile").unbind("click").click(function() {
							addUserManualUpload('编辑')
						})
					});
				}

				// 铭牌信息
				function nameplateFn() {
					var nameplateImgArr = [],
						NameplateInfo = [],
						NameplateResourceIds = [],
						NameplateimgUrls = [];

					function getNameplateData(callback) {
						NameplateResourceIds = [],
							NameplateimgUrls = [];
						eosCommon.eosAjax(
							eosCommon.PLATFORM_API + "api/base/QueryEquipmentDetails",
							"Get", {
								"AccessToken": eosCommon.storage.get("AccessToken"),
								"Parameters": {
									"EquipmentId": $("#EquipmentIdHidden").val()
								}
							},
							"json",
							function(result) {
								if(eosCommon.checkCode(result.State, result.Message)) {
									$("#NameplateListItem").empty()
									if(result.Data == '') {
										$("#NameplateListItem").append(
											'<tr role="row">' +
											'<td class="pl-10 pr-10"><input class="form-control input-block namePlateName" placeholder="请填写铭牌名称" value="" type="text"></td>' +
											'<td class="pl-10 pr-10"><input class="form-control input-block namePlateVal" placeholder="请填写铭牌属性值" value="" type="text"></td>' +
											'</tr>')
									} else {
										for(var i = 0; i < result.Data.NameplateInfo.length; i++) {
											$("#NameplateListItem").append(
												'<tr role="row">' +
												'<td class="namePlateName">' + result.Data.NameplateInfo[i]['Key'] + '</td>' +
												'<td class="namePlateVal">' + result.Data.NameplateInfo[i]['Value'] + '</td>' +
												'<td class="actions">' +
												'<a href="javascript:;" class="hidden cancelNameplateBtn"><i class="fa fa-times"></i></a>' +
												'<a href="javascript:;" class="on-default editNameplateBtn OperatorEdit"><i class="fa fa-pencil"></i></a>' +
												'<a href="javascript:;" class="on-default delNameplateBtn OperatorDel"><i class="fa fa-trash-o"></i></a>' +
												'</td>' +
												'</tr>')
										}
										for(var j = 0; j < result.Data.NameplatePhotos.length; j++) {
											NameplateResourceIds.push(result.Data.NameplatePhotos[j].ResourceId);
											NameplateimgUrls.push(result.Data.NameplatePhotos[j].ResourceUrl);
										}
										eosCommon.eosOperators(eosCommon.eosOperDataHandle());
									}
								}
								callback && callback();
								var datas = eosCommon.eosOperDataHandle();
								if(datas['deletes'] == 0) {
									$('.file-panel').hide();
								}
							}
						);
					}

					function updataNameplate() {
						nameplateImgArr = [];
						NameplateInfo = [];
						var a = 0;
						var updata = true;
						$("#NameplateListItem tr").each(function() {
							var t1 = '',
								t2 = '';
							if($(this).find("td input").length != 0) {
								if($(this).find(".namePlateVal").val() == '') {
									vdialog({
										type: 'confirm',
										title: '提示',
										content: '请输入铭牌属性值',
										ok: function() {},
										cancel: true,
										modal: true
									});
									updata = false;
								} else {
									t1 = $(this).find(".namePlateName").val();
									t2 = $(this).find(".namePlateVal").val();
								}
							} else {
								t1 = $(this).find(".namePlateName").html();
								t2 = $(this).find(".namePlateVal").html();
							}
							var newJson = {};
							newJson['Key'] = t1;
							newJson['Value'] = t2;
							NameplateInfo.push(newJson);
						});
						if(updata) {
							$(".uploader_img_nameplate li").each(function() {
								nameplateImgArr.push($(this).attr('data'));
							});
							eosCommon.eosAjax(
								eosCommon.PLATFORM_API + "api/base/InsertEquipmentDetails",
								"Post", {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"Parameters": {
										"EquipmentId": $("#EquipmentIdHidden").val(),
										"NameplateInfo": NameplateInfo,
										"NameplatePhotos": nameplateImgArr
									}
								},
								"json",
								function(result) {
									if(eosCommon.checkCode(result.State, result.Message)) {
										getNameplateData();
										eosCommon.eosMessage('success', eosCommon.UPDATE_MSG);
									}
								}
							);
						}
					}
					$("#NameplateBtn").unbind('click').click(function() {
						getNameplateData(function() {
							$("#nameplateImgBox").empty().append(
								'<div class="uploader_img_nameplate eos_uploader_img">' +
								'<div class="queueList">' +
								'<div id="dndArea1" class="placeholder">' +
								'<div id="NameplateImgBtn">点击选择图片</div>' +
								'</div>' +
								'<ul class="filelist clearfix"></ul>' +
								'</div>' +
								'<div class="statusBar" style="display:none;">' +
								'<div class="btns">' +
								'<div id="continueNameplateImgBtn"></div><div class="uploadBtn">开始上传</div>' +
								'</div>' +
								'<div class="info"></div>' +
								'</div>' +
								'</div>');
							eosCommon.eosOperators(eosCommon.eosOperDataHandle());
							var datas = eosCommon.eosOperDataHandle();
							if(datas['insert'] == 0) {
								$('.statusBar').remove();
							}
							if(datas['edit'] == 1 || datas['insert'] == 1) {
								$('.saveBtns').show();

							}

							eosCommon.eosUploaderImg({
								'uploaderObj': 'uploaderImgNameplate',
								'uploaderBox': '.uploader_img_nameplate',
								'uploaderList': '.queueList',
								'initBtn': '#NameplateImgBtn',
								'continueBtn': '#continueNameplateImgBtn',
								'serverUrl': eosCommon.RESOURCES_API + 'api/resource/upload',
								'data': {
									"AccessToken": eosCommon.storage.get("AccessToken"),
									"ResourceType": "0"
								},
								'fileNumLimit': 2000,
								'fileSingleSizeLimit': 3 * 1024 * 1024,
								'ResourceIds': NameplateResourceIds,
								'imgUrls': NameplateimgUrls,
								'succ': function(resporn) { $('#nameplateImgBox .filelist').viewer(); },
								'del': function(result) {
									if(result != "") {
										var param = {
											"AccessToken": eosCommon.storage.get("AccessToken"),
											"Parameters": {
												"ResourceId": result,
												"ResourceType": "0"
											}
										};
										var url = eosCommon.RESOURCES_API + "api/resource/delete";
										eosCommon.eosAjax(url, "DELETE", param, "json", function(result) {
											if(eosCommon.checkCode(result.State, result.Message)) {
												nameplateImgArr.remove(result)
											}
										});
									}
								}
							});
							$('#nameplateImgBox .filelist').viewer();
						})
					});
					$("#addNameplate").unbind('click').click(function() {
						$("#NameplateListItem").append(
							'<tr role="row">' +
							'<td class="pl-10 pr-10"><input class="form-control input-block namePlateName" placeholder="请填写铭牌名称" value="" type="text"></td>' +
							'<td class="pl-10 pr-10"><input class="form-control input-block namePlateVal" placeholder="请填写铭牌属性值" value="" type="text"></td>' +
							'<td class="actions">' +
							'<a href="javascript:;" class="addRemoveNameplateBtn"><i class="fa fa-times"></i></a>' +
							'</td>' +
							'</tr>')
					});
					$("#saveNameplateBtn").unbind('click').click(function() {
						updataNameplate()
					});
					$(".NameplateListTable").unbind('click');
					$(".NameplateListTable").on('click', '.editNameplateBtn', function() {
						var txt01 = $(this).parents("tr").find("td").eq(0).html(),
							txt02 = $(this).parents("tr").find("td").eq(1).html();
						$(this).parents("tr").empty().append(
							'<td class="pl-10 pr-10"><input class="form-control input-block namePlateName" value="' + txt01 + '" type="text"></td>' +
							'<td class="pl-10 pr-10"><input class="form-control input-block namePlateVal" value="' + txt02 + '" type="text"></td>' +
							'<td class="actions">' +
							'<a href="javascript:;" class="removeNameplateBtn"><i class="fa fa-times"></i></a>' +
							'</td>')
					});
					$(".NameplateListTable").on('click', '.delNameplateBtn', function() {
						var __this = $(this);
						vdialog({
							type: 'confirm',
							title: '提示',
							content: eosCommon.DELETE_MSG_ASK,
							ok: function() {
								__this.parents('tr').remove();
								updataNameplate();
								eosCommon.eosMessage('warning', eosCommon.DELETE_MSG);
							},
							cancel: true,
							modal: true
						});
					});
					$(".NameplateListTable").on('click', '.addRemoveNameplateBtn', function() {
						$(this).parents("tr").remove();
					});
					$(".NameplateListTable").on('click', '.removeNameplateBtn', function() {
						var txt01 = $(this).parents("tr").find(".namePlateName").val(),
							txt02 = $(this).parents("tr").find(".namePlateVal").val();
						$(this).parents("tr").empty().append(
							'<td class="namePlateName">' + txt01 + '</td>' +
							'<td class="namePlateVal">' + txt02 + '</td>' +
							'<td class="actions">' +
							'<a href="javascript:;" class="hidden cancelNameplateBtn"><i class="fa fa-times"></i></a>' +
							'<a href="javascript:;" class="on-default editNameplateBtn"><i class="fa fa-pencil"></i></a>' +
							'<a href="javascript:;" class="on-default delNameplateBtn"><i class="fa fa-trash-o"></i></a>' +
							'</td>')
					})
				}
			});
		}
	}
</script>
<style>
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
	
	.device_info .eos_uploader_img .filelist .imgWrap {
		/*width: 120px;
        height: 79px;*/
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
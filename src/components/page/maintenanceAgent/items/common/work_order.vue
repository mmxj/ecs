<style scoped>
.w100p {
  width: 100%;
}

@import '/static/css/notice.css';
#work-order .order-card-box {
  padding: 0 0 15px 10px;
  background-clip: padding-box;
  margin-bottom: 20px;
  background-color: #ffffff;
}

#work-order .dataTables_wrapper .dataTables_processing {
  top: 140px;
}

#workOrderData table>tbody>tr:hover {
  cursor: pointer;
}

#workOrderData table>tbody>tr.order_active:hover {
  background: #c0ede4!important;
}

#workOrderData table>tbody>tr.order_active {
  background: #c0ede4!important;
}

ul.details_wrap {
  list-style: none;
  min-height: 100px;
  background: url('/static/css/images/order_detail_bgss.png') no-repeat 6px 10px / auto, url('/static/css/images/order_detail_bgs.png') no-repeat 9px 0px/auto 100%;
  /*background-size: auto;*/
}

ul.details_wrap h3 {
  margin-top: 0;
}

ul.details_wrap h3 span {
  font-size: 18px;
  color: #000000;
}

ul.details_wrap p {
  font-size: 14px;
  color: #a5afbe;
  /*width: ;*/
}

.content-title-left {
  line-height: 34px;
  color: #8694a8;
}

.form-control-static {
  min-height: 34px;
  /* padding-top: 7px; */
  /* padding-bottom: 7px; */
  /* margin-bottom: -18px; */
  padding: 0;
  line-height: 34px;
  color: #000000;
  margin-left: 10px;
}

#addWorkOrdeverifyCheck_2 .form-inline .form-group {
  margin-top: 0;
  margin-bottom: 0;
}

.workerBg {
  background: #fefefe;
  padding: 8px;
  height: 100%;
  /*padding-bottom: 80px;*/
}

.Description span.contents {
  /*width: 100%;*/
  max-width: 183px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}

.enclosure {
  /*margin-left: 35px;*/
  position: relative;
  top: -20px;
  left: 42px;
}

.enclosure ul {
  position: relative;
  top: 3px;
  list-style: none;
  height: auto;
  padding-left: 0px!important;
}

.enclosure ul.into_enclosure {
  max-width: auto;
}

.enclosure ul li {
  height: auto;
  /*margin-top: 10px;*/
  margin-bottom: 10px;
  /*margin-left: 43px;*/
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: left;
}

.enclosure ul li.into_Details {
  height: auto;
  max-width: 100%;
  margin-bottom: 10px;
  text-align: left;
  /*background: red;*/
}

.enclosure ul li a {
  box-sizing: border-box;
  width: 100px;
  display: inline-block;
}

.main_page {
  position: relative;
  overflow: hidden;
}

.m-page {
  position: absolute;
  top: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  min-height: 0;
}

#rightAddItemList {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
}

.h100p {
  height: 100%
}

.w100 {
  width: 100px;
}

.por {
  position: relative;
}

.panel-title {
  display: inline-block;
  width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.fr {
  float: right;
}

.btn-2top {
  position: relative;
  top: -2px
}

#work-order {
  overflow: hidden;
}

#addWorkOrderBox {
  margin: 0 10px;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

</style>
<template>
  <div id="work-order" :class="{workerBg : propsData.ProjectId==''}" class="h100p">
    <div class="main_page h100p" v-if="!isAddOrder && !isIntoDetails">
      <div style="position: absolute;top: 0; bottom: 0; left: 0;right: 220px; overflow-y: auto;">
        <!--class="m-page col-xs-10 col-sm-10 col-md-10 col-lg-10 bg-white"-->
        <div id="workOrderData">
          <div class="mt-10">
            <div class="col-lg-12" style='padding-left:10px;padding-right:0;'>
              <span class="OrgTopAligin OperatorInsert">
                <!-- <button @click="showAddForm()" type="button" class="btn btn-default waves-effect waves-light">
                    <i class="fa fa-plus m-r-5"></i>新增
                </button> -->
                <el-button size='small' type="primary" icon='plus' @click="showAddForm()" class='mb5 por' style='top:-2px;' v-if='isShowAddBtn'>新增</el-button>
              </span>
              <!--<span class="OrgTopAligin OperatorInsert">
                                <button @click="gets()" type="button" class="btn btn-default waves-effect waves-light">
                                    <i class="fa fa-plus m-r-5"></i>进入
                                </button>
                        </span>-->
              <span class="OperatorSearch">
                              <div class="OrgTopAligin">
                      <!-- <select id="order_charges" @change="getData(1)" v-model="ExecutorType" class="form-control selectpicker input-sm" data-style="btn-white">
                        <option value="">处理人</option>
                        <option value="1">我自己</option>
                        <option value="2">其它人</option>
                      </select> -->
              <el-select size='small' v-model="ExecutorType" clearable placeholder="处理人" @change='getData(1)' class='w100'>
                <el-option label="处理人" value=""></el-option>
                <el-option label="我自己" value="1"></el-option>
                <el-option label="其它人" value="2"></el-option>
              </el-select >
                    </div>
                    <span style="display:inline-block;width: 168px;" v-show="!propsData.ProjectId">
                                  <!-- <select id="selectItem" @change="getData(1)" v-model="initProjectId" class="form-control selectpicker input-sm" data-style="btn-white" data-live-search="true" data-size="8">
                                      <option value="">请选择项目</option>
                                      <option v-for='item in projectDatas' :value="item.ProjectId">{{item.ProjectName}}</option>
                                  </select> -->
              <el-select size='small' v-model="initProjectId" filterable clearable placeholder="请选择项目" @change='getData(1)'>
                <el-option label="请选择项目" value=""></el-option>
                <el-option v-for='item in projectDatas' :label="item.ProjectName" :value="item.ProjectId"></el-option>
              </el-select >
                    </span>
              <div class="OrgTopAligin">
                <!-- <select id="OrderType" @change="getData(1)" v-model="OrderType" class="form-control selectpicker input-sm" data-style="btn-white">
                  <option value="0">工单类别</option>
                  <option value="1">调试</option>
                  <option value="2">保修</option>
                  <option value="3">保养</option>
                  <option value="4">维修</option>
                  <option value="5">其它</option>
                  <option value="6">故障</option>
                </select> -->
                <el-select size='small' v-model="OrderType" placeholder="工单类别" @change='getData(1)' class='w100'>
                  <el-option label="工单类别" :value="0"></el-option>
                  <el-option label="调试" :value="1"></el-option>
                  <el-option label="保修" :value="2"></el-option>
                  <el-option label="保养" :value="3"></el-option>
                  <el-option label="维修" :value="4"></el-option>
                  <el-option label="其它" :value="5"></el-option>
                  <el-option label="故障" :value="6"></el-option>
                </el-select>
              </div>
              <div class="OrgTopAligin">
                <!-- <select id="selectOrderState" @change="getData(1)" v-model="OrderStatus" class="form-control selectpicker input-sm" data-style="btn-white">
                  <option value="0">工单状态</option>
                  <option value="1">未关闭</option>
                  <option value="2">已关闭</option>
                  <option value="3">已取消</option>
                </select> -->
                <el-select size='small' v-model="OrderStatus" placeholder="工单状态" @change='getData(1)' class='w100'>
                  <el-option label="工单状态" :value="0"></el-option>
                  <el-option label="未关闭" :value="1"></el-option>
                  <el-option label="已关闭" :value="2"></el-option>
                  <el-option label="已取消" :value="3"></el-option>
                </el-select>
              </div>
              <span class="OrgTopAligin" @keyup='getDataDebounce()'>
                <el-input size='small' v-model="keyWords" placeholder="责任人名称"></el-input>
                                  <!-- <input id="txtQueryKeywords" v-model="keyWords" type="text" class="form-control w-128" placeholder="责任人名称"> -->
              </span>
              <!-- <span class="OrgTopAligin">
                            <button @click="getData(1)" type="button" class="btn btn-default waves-effect waves-light">
                                <i class="fa fa-search m-r-5"></i>查找
                            </button>
                        </span> -->
              </span>
              <el-button v-show='!propsData.ProjectId' class='mb5 fr por' size='small' @click='$router.go(-1)' style='top:7px;right:10px;'>
                <i class="fa fa-mail-reply-all mr5"></i>返回
              </el-button>
              <div class="clearfix"></div>
            </div>
          </div>
          <hr class="divider" style="margin-left: 10px;margin-top: 10px;">
          <div class="order-card-box">
            <div class="">
              <!--row-->
              <table class="table table-striped table-bordered" width="100%" style="border: 0 solid #fff;">
                <thead class="thead-bottom-line" style="border-top: 0px;">
                  <tr>
                    <!--style="height:50px; line-height: 50px;"-->
                    <th class="sorting-title">序号</th>
                    <th class="sorting-title">工单类别</th>
                    <th class="sorting-title">工单号</th>
                    <th class="sorting-title">所属项目</th>
                    <th class="sorting-title">工单描述</th>
                    <th class="sorting-title">创建时间</th>
                    <th class="sorting-title">创建人</th>
                    <th class="sorting-title">当前责任人</th>
                    <th class="sorting-title">状态</th>
                  </tr>
                </thead>
                <Loading v-show="noData"></Loading>
                <tbody>
                  <!--<transition-group enter-active-class="animated shake" style="width: 100%;display: inline-block;">-->
                  <tr :key="index" style="height:50px; line-height: 50px;" class="list-table-hover" :class="{order_active:currOrderIndex==index}" v-for="(item,index) in workOrderList" @click="getCurrWorkOrderDetail(item.WorkOrderId,item.WorkOrderNo,index,item.ProjectId)">
                    <td class="sorting_content" style="width: 50px">{{index+1+((indexInt-1)*pagingDatas.page_size)}}</td>
                    <td class="sorting_content eos-text-info">
                      <label v-if="item.OrderType == 1" class="label eos-btn-warning btn-rounded">调试</label>
                      <label v-if="item.OrderType == 2" class="label eos-btn-normal btn-rounded">保修</label>
                      <label v-if="item.OrderType == 3" class="label eos-btn-info btn-rounded">保养</label>
                      <label v-if="item.OrderType == 4" class="label eos-btn-info btn-rounded">维修</label>
                      <label v-if="item.OrderType == 5" class="label eos-btn-info btn-rounded">其它</label>
                      <label v-else-if="item.OrderType == 6" class="label eos-btn-abnormal btn-rounded">故障</label>
                    </td>
                    <td class="sorting_content" :title="item.WorkOrderNo">{{item.WorkOrderNo}}</td>
                    <td class="sorting_content" :title="item.ProjectName">{{item.ProjectName}}</td>
                    <td class="sorting_content content-max-width" :title="item.OrderContent">{{item.OrderContent}}</td>
                    <td class="sorting_content" :title="item.CreatedOn">{{item.CreatedOn}}</td>
                    <td class="sorting_content" :title="item.CreatorName">{{item.CreatorName}}</td>
                    <td class="sorting_content" :title="item.ExecutorName">
                      {{item.ExecutorName}}
                    </td>
                    <td class="sorting_content">
                      <label v-if="item.OrderStatus == 1" class="label eos-btn-warning btn-rounded">未关闭</label>
                      <label v-if="item.OrderStatus == 2" class="label eos-btn-normal btn-rounded">已关闭</label>
                      <label v-else-if="item.OrderStatus == 3" class="label eos-btn-abnormal btn-rounded">已取消</label>
                    </td>
                  </tr>
                  <!--</transition-group>-->
                </tbody>
              </table>
              <no-data v-show="emptyData"></no-data>
              <paging v-show="pagingDatas.total!=0" :pagingData="pagingDatas"></paging>
            </div>
          </div>
        </div>
      </div>
      <div id="rightAddItemList" style="width: 220px;">
        <span style="position: absolute;right: 0px; bottom: 5px;z-index: 3000;display: block;left: 13px;" class="OrgTopAligin">
          <button style=" background-color: #3498db!important;width: 100%;" @click="getWorkOrderDetails()" type="button" class="text-center btn btn-default waves-effect waves-light">
                  工单详情
          </button>
        </span>
        <!--class="col-sm-2 col-xs-2 col-md-2 col-lg-2 bg-white b-l-1"-->
        <div class="panel-group" style="">
          <div class="panel-heading" style="position: relative;">
            <h2 class="panel-title" :title="WorkOrderNo"> 工单号：{{WorkOrderNo}}                       
                 <!-- <span style="color: #000000; font-size:14px;font-weight: bold;">
                    <p style="width: 100%;white-space: nowrap;text-overflow:ellipsis;overflow:hidden;">工单号：{{WorkOrderNo}}</p>
                 </span> -->
            </h2>
          </div>
          <hr class="divider">
          <!--margin-top: 15px;padding-bottom: 70px;-->
          <div id="right_lists" class="lists" style="position:absolute;top:65px;bottom:40px;overflow-y: auto;overflow-x: hidden;">
            <ul v-show="isHasDetailData" class="details_wrap" style="margin-bottom: 0;  list-style: none; padding:0;padding-left: 30px;" v-for="item in mainPageDetails">
              <li>
                <h3>
            <span class="JobTheme">{{item.JobTheme}}</span>
            <span class="TransactorName">{{item.TransactorName}}</span>
            
          </h3>
                <p class="StartTime textHidden" :title="item.CreatedOn" style="margin-top: 10px;">
                  <span>时间：</span>
                  <span class="">
              {{item.CreatedOn}}
            </span>
                </p>
                <p class="Description" style="position: relative;">
                  <span>内容：</span>
                  <span :title="item.Description" class="contents" style="position: absolute; top: 0;">
              {{item.Description}}
            </span>
                </p>
                <p class="Description" style="position: relative;">
                  <span style="position: relative; ">
              <span  class="text-left">附件：                            
              </span>
                  <div class="enclosure" style="" v-if="JSON.parse(item.JobFiles).length>=0">
                    <ul style="max-width:250px">
                      <li v-for="data in JSON.parse(item.JobFiles)" class="file_list ">
                        <a :title="data.OriginalFileName" class="cursor text-cleos" :href="data.FilePath" target="_blank" v-bind:class="data.Format.substring(1,data.Format.length)">{{data.OriginalFileName}}</a>
                      </li>
                    </ul>
                  </div>
                  </span>
                  <span style="position: absolute; top: 0; left: 46px;" v-if="JSON.parse(item.JobFiles).length==0">暂无内容</span>
                </p>
              </li>
            </ul>
            <div v-show="!isHasDetailData" class="noDetailData" style="margin-top: 60px;height: 600px; ">
              <img style="margin: 0 auto;" class="img-responsive" src="../../../../../../static/css/images/noorder_detail_bg.png" />
              <h3 class="text-center" style="color: #3bc6aa; font-weight: bold; font-size: 18px;">当前工单暂无工作过程</h3>
              <p class="text-center" style="color: #96a2b3;font-size: 16px; margin-top: 15px;">请点击"工单详情"按钮进行添加工作过程</p>
            </div>
          </div>
        </div>
      </div>
      <div class="clearfix">
      </div>
    </div>
    <!--新增工单开始-->
    <div id="addWorkOrderBox" v-if="isAddOrder">
      <div class="row" style="margin-top: 12px; border-bottom: 1px solid #edeff1;">
        <div class="col-lg-12">
          <span class="size20 font-bold" style="color: #000;">新增工单</span>
          <button style="margin-bottom: 8px;" @click="returnClick()" type="button" class="btnReturn btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
        </div>
      </div>
      <!--<hr class="divider mb-10 mt-10">-->
      <el-row class="form-horizontal content-box" style='padding-top:30px'>
        <el-col :span='16'>
          <el-form :model="addForm" :rules="addFormRules" ref="addForm" label-width="200px" class="demo-ruleForm">
            <el-form-item label="所属项目：" prop="ProjectId">
              <el-select v-model="addForm.ProjectId" :disabled="propsData.ProjectId!=''" filterable placeholder="请先选择项目" @change='projectIdChange' class='w100p'>
                <!-- <option value="">请先选择项目</option> -->
                <el-option v-for="item in projectOpts" :key="item.ProjectId" :label="item.ProjectName" :value="item.ProjectId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="相关设备：">
              <el-select v-model="addForm.EquipmentId" filterable clearable placeholder="" class='w100p'>
                <!-- <el-option value="">无</el-option> -->
                <el-option v-for="item in equipmentOpts" :key="item.EquipmentId" :label="item.EquipmentAlias" :value="item.EquipmentId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工单类别：">
              <el-select v-model="addForm.OrderType" filterable placeholder="服务类型" class='w100p'>
                <el-option v-for="item in ServiceTypeOpts" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="责任人：">
              <el-select v-model="addForm.Executor" filterable clearable placeholder="责任人" @change='executorChange' class='w100p'>
                <!-- <el-option value="">无</el-option> -->
                <el-option v-for="item in executorOpts" :key="item.AccountId" :label="item.UserName" :value="item.AccountId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="协助人：">
              <el-select v-model="addForm.Participants" multiple filterable clearable placeholder="协助人" class='w100p'>
                <!-- <el-option value="">无</el-option> -->
                <el-option v-for="item in participantOpts" :key="item.AccountId" :label="item.UserName" :value="item.AccountId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="工单描述：" prop='OrderContent'>
              <el-input type="textarea" v-model="addForm.OrderContent"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="returnClick">取 消</el-button>
              <el-button type="primary" @click="submitAddForm">确 认</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <!-- <div id="addWorkOrdeverifyCheck" style="margin-top: 20px;">
        <div class="form-horizontal content-box">
          <div class="form-group" style="margin-top: 50px;">
            <label class="content-title-left"><em class="ak_required_em">*</em>所属项目</label>
            <div class="col-lg-5 col-xs-5">
              <select @change="getEuipmentDatas()" :disabled="propsData.ProjectId!=''" id="addSelectItem" v-model="ProjectId" class="form-control selectpicker input-sm " data-style="btn-white" data-live-search="true" data-size="8">
                <option value="">请先选择项目</option>
                <option v-for="item in Projects" :datas='item.ProjectName' :value="item.ProjectId">
                  {{item.ProjectName}}
                </option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="content-title-left">
              <em class="ak_required_em"></em>相关设备
            </label>
            <div class="col-lg-5 col-xs-5">
              <select id="relativeEquipment" v-model="selectEquipmentId" class="form-control selectpicker input-sm" data-style="btn-white">
                <option value="">相关设备</option>
                <option v-for="item in equipments" :value="item.EquipmentId">{{item.EquipmentAlias}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="content-title-left">
              <em class="ak_required_em">*</em>工单类别
            </label>
            <div class="col-lg-5 col-xs-5">
              <select id="selectOrderType" v-model="selectOrderType" class="form-control selectpicker input-sm" data-style="btn-white">
                <option value="1">调试</option>
                <option value="2">保修</option>
                <option value="3">保养</option>
                <option value="4">维修</option>
                <option value="5">其它</option>
                <option value="6">故障</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="content-title-left">
              <em class="ak_required_em"></em>责任人
            </label>
            <div class="col-lg-5 col-xs-5">
              <select id="selectCharges" @change="getExecutorCompanyId()" v-model="selectWorkOrderExecutor" class="form-control selectpicker input-sm" data-style="btn-white">
                <option value="">责任人</option>
                <option v-for="item in WorkOrderExecutor" :value="item.AccountId">{{item.UserName}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="content-title-left">
              <em class="ak_required_em"></em>协助人
            </label>
            <div class="col-lg-5 col-xs-5 selectHelpers">
              <select id="selectHelpers" v-model='selectParticipants' multiple class="form-control selectpicker input-sm" data-style="btn-white">
                <option  value="">协助人</option>
                <option v-for="item in WorkOrderParticipants" :value="item.AccountId">{{item.UserName}}</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="content-title-left"><em class="ak_required_em">*</em>工单描述</label>
            <div class="col-lg-6 col-xs-9">
              <textarea id="txtProjectIntro" v-model="orderDescriptions" maxlength="1500" type="text" class="form-control required" data-valid="isNonEmpty" data-error="工单内容不能为空" placeholder="请输入工单内容"></textarea>
              <span class="valid-form-group" style="top: 86px;left: 15px;">
                      <label class="focus valid"></label>
                    </span>
              <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
              <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
            </div>
          </div>
          <div class="content-box-footer">
            <div class="form-group">
              <label class="content-title-left"></label>
              <div class="col-lg-5 col-xs-8 pl-22">
                <button @click="returnClick()" type="button" class="btnReturn btn btn-white pull-left mr-20">取消</button>
                <button @click="addWordOrderSave()" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中...">确定</button>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
    <!--新增工单结束-->
    <!--工单详情开始-->
    <!--<div class="tab-content" id="myContent" style="position: relative;" >-->
    <div id="addWorkOrderBox" v-if="isIntoDetails">
      <div class="row" style="margin-top: 12px; border-bottom: 2px solid #edeff1; ">
        <div class="col-lg-12">
          <span class="size20 font-bold" style="color: #000;">工单详情</span>
          <button style="margin-bottom: 8px;" @click="detailReturnClick()" type="button" class="btnReturn btn btn-white pull-right"><i class="fa fa-mail-reply-all m-r-5"></i>返回</button>
        </div>
      </div>
      <!--<hr class="divider mb-10 mt-10">-->
      <div id="addWorkOrdeverifyCheck_2" style="margin-top: 20px;">
        <div class="form-horizontal content-box container-fluid">
          <div class="row ">
            <form class="form-inline col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">工单号:</label>
                <p class="form-control-static">{{WorkOrder.WorkOrderNo}}</p>
              </div>
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">工单类型:</label>
                <p class="form-control-static">{{WorkOrder.OrderTypeName}}</p>
              </div>
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">所属项目:</label>
                <p class="form-control-static">{{WorkOrder.ProjectName}}</p>
              </div>
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">相关设备:</label>
                <p v-if="WorkOrder.EquipmentAlias" class="form-control-static" v-text="WorkOrder.EquipmentAlias"></p>
                <p v-if="!WorkOrder.EquipmentAlias" class="form-control-static" v-text="noDataTxts"></p>
              </div>
              <!--WorkOrder.EquipmentAlias ? txt = '暂无' : txt = WorkOrder.EquipmentAlias-->
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">创建人:</label>
                <p class="form-control-static">{{WorkOrder.CreatorName}}</p>
              </div>
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">创建时间:</label>
                <p class="form-control-static">{{WorkOrder.CreatedOn}}</p>
              </div>
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">当前责任人:</label>
                <p v-if="WorkOrder.ExecutorName" class="form-control-static" v-text="WorkOrder.ExecutorName"></p>
                <p v-if="!WorkOrder.ExecutorName" class="form-control-static" v-text="noDataTxts"></p>
              </div>
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">协助人:</label>
                <p v-if="WorkOrder.Participants" class="form-control-static">
                  <!--<span v-for="(datas,index) in detailsParticipants">-->
                  <span>{{detailsParticipants}}</span>
                  <!--</span>-->
                </p>
                <p v-if="!WorkOrder.Participants" v-text="noDataTxts" class="form-control-static">
                </p>
              </div>
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">状态:</label>
                <p class="form-control-static">
                  <span v-if="WorkOrder.OrderStatus==1">未关闭</span>
                  <span v-if="WorkOrder.OrderStatus==2">已关闭</span>
                  <span v-else-if="WorkOrder.OrderStatus==3">已取消</span>
                </p>
              </div>
              <div class="form-group col-lg-3 col-md-4 col-sm-6 col-xs-6">
                <label class="">工单内容:</label>
                <p class="form-control-static">{{WorkOrder.OrderContent}}</p>
              </div>
            </form>
          </div>
        </div>
        <div class="form-horizontal content-box bg-white" :class="[CanAddJobLog!=1 ? 'col-sm-12' : 'col-sm-6', CanAddJobLog!=1 ? 'col-md-12' : 'col-md-6',CanAddJobLog!=1 ? 'col-lg-12' : 'col-lg-6']">
          <span class="size20 font-bold" style="color: #000;">工作过程</span>
          <!--<h3 >工作过程</h3>-->
          <hr class="divider mb-10 mt-10">
          <div id="JobLogs">
            <ul v-show="!isHasJobLog" class="details_wrap" style="margin-bottom: 0; list-style: none; padding:0;padding-left: 30px;" v-for="item in intoPageDetails">
              <li>
                <h3>
            <span class="JobTheme">{{item.JobTheme}}</span>
            <span class="TransactorName">{{item.TransactorName}}</span>                     
        </h3>
                <p class="StartTime">
                  <span>时间：</span>
                  <span>{{item.CreatedOn}}</span>
                </p>
                <p class="Description">
                  <span>内容：</span>
                  <span>
                {{item.Description}}
              </span>
                </p>
                <p class="Description" style="position: relative;">
                  <span style="position: relative;">
                <span  class="text-left">附件：                            
                </span>
                  <div style="" class="enclosure" v-if="JSON.parse(item.JobFiles).length>=0">
                    <ul class="into_enclosure">
                      <li v-for="data in JSON.parse(item.JobFiles)" class="file_list into_Details">
                        <a style="width: 100%;" :title="data.OriginalFileName" class="cursor text-cleos" :href="data.FilePath" target="_blank" v-bind:class="data.Format.substring(1,data.Format.length)">{{data.OriginalFileName}}</a>
                      </li>
                    </ul>
                  </div>
                  </span>
                  <span style="position: absolute; top: 0; left: 46px;" v-show="JSON.parse(item.JobFiles).length==0">暂无内容</span>
                </p>
              </li>
            </ul>
            <div v-show="isHasJobLog" class="noDetailData" style="margin-top: 60px;min-height: 467px;">
              <img style="margin: 0 auto;" class="img-responsive" src="../../../../../../static/css/images/noorder_detail_bg.png" />
              <h3 class="text-center" style="color: #3bc6aa; font-weight: bold; font-size:20px;">当前工单暂无工作过程</h3>
            </div>
          </div>
        </div>
        <div v-show="CanAddJobLog==1" id="addThemePanel" style="min-height: 586px;" class="form-horizontal content-box col-sm-6 col-md-6 col-lg-6 bg-white b-l-1">
          <span class="size20 font-bold" style="color: #000;">添加工作过程</span>
          <!--<h3 >工作过程</h3>-->
          <hr class="divider mb-10 mt-10">
          <div class="wrapddd" style="margin:0 auto;min-width: 200px;">
            <div class="form-group">
              <label style="width: 100px;margin-right: 0;border-left: 0;text-align: right;" class="content-title-right">
                <em class="ak_required_em">*</em>工作主题:
              </label>
              <div class="col-lg-5 col-xs-5">
                <select id="selectJobTheme" @change="selectJobThemeChange()" v-model="JobThemeId" class="form-control selectpicker input-sm" data-live-search="true" data-style="btn-white">
                  <option value="">选择主题</option>
                  <option v-for="(item,index) in JobTheme" :value="item.id">{{item.themeName}}</option>
                </select>
              </div>
              <span class="" style="margin-top: 0px;">
                <button id="btnInsert" type="button" class="btn btn-default" v-on:click="customThemeClick()">
                    <i class="fa fa-pencil m-r-5"></i>自定义主题
                </button>
            </span>
              <!--<label style="text-align: left; color: red;"  class="text-pencil content-title-left"  ><i style="cursor: pointer;" title="自定义主题" class="fa fa-pencil m-rigth font-size-text"></i></label>-->
            </div>
            <div class="form-group">
              <label style="width: 100px;margin-right: 0;border-left: 0; text-align: right;" class="content-title-right"><em class="ak_required_em">*</em>工作描述:</label>
              <div class="col-lg-6 col-xs-6">
                <textarea id="txtobLogDescriptions" v-model="InsertJobLogDescriptions" maxlength="1500" type="text" class="form-control required" data-valid="isNonEmpty" data-error="工作描述不能为空" placeholder="请输入工作描述"></textarea>
                <span class="valid-form-group" style="top: 86px;left: 15px;">
                                          <label class="focus valid"></label>
                                      </span>
                <span class="ion-close-circled close hide text-danger valid-input-icon"></span>
                <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
              </div>
            </div>
            <div class="distribute_c" v-show="isDistribute">
              <div class="form-group">
                <label style="width: 100px;margin-right: 0;border-left: 0;text-align: right;" class="content-title-right">
                  <em class="ak_required_em"></em>负责人:
                </label>
                <div class="col-lg-5 col-xs-5">
                  <select id="d_selectCharges" @change="getExecutorCompanyId()" v-model="selectWorkOrderExecutor" class="form-control selectpicker input-sm" data-style="btn-white">
                    <option value="">选择负责人</option>
                    <option v-for="item in WorkOrderExecutor" :value="item.AccountId">{{item.UserName}}</option>
                  </select>
                </div>
              </div>
              <div v-show="HasParticipants" class="form-group">
                <label style="width: 100px;margin-right: 0;border-left: 0;text-align: right;" class="content-title-right">
                  <em class="ak_required_em"></em>协助人:
                </label>
                <div class="col-lg-5 col-xs-5 selectHelpers">
                  <select id="d_selectHelpers" v-model='selectParticipants' multiple class="form-control selectpicker input-sm" data-style="btn-white">
                    <option v-for="item in WorkOrderParticipants" :value="item.AccountId">{{item.UserName}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-group">
              <el-form :model="formL" ref="formL">
                <el-form-item label="附件：">
                  <el-upload limit="2" class="upload-demo" :on-exceed="handleExceed" :action="uploadUrl" :data='uploadData' multiple :on-success='fileUploadSuccess' :on-remove="fileRemove" :file-list="formL.ContractFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div style="margin-top: 0;height: 20px;line-height: 20px;" slot="tip" class="el-upload__tip">最多只能上传3个附件文件</div>
                  </el-upload>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div class="content-box-footer" style="margin-top: 50px;">
            <div class="form-group">
              <label class="content-title-left"></label>
              <div class="col-lg-12 col-md-12 col-sm-12 col-xs-8 pl-22">
                <button style="margin-left:150px;" @click="detailReturnClick()" type="button" class="btnReturn btn btn-white pull-left mr-50">取消</button>
                <button style="margin-left:50px ;" @click="InsertJobLogSave()" type="submit" class="btn btn-default pull-left loading_btn" data-loading-text="保存中...">确定</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--</div>-->
    <!--工单详情结束-->
    <div class="clearfix">
    </div>
    <div id="modal-cleos" class="modal fade" role="dialog" data-backdrop="static">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="win-close" data-dismiss="modal">×</button>
          <button @click="addcustomThemeSave()" type="button" class="sava">保存</button>
          <h4 id="ModuleTitle" class="modal-title">自定义主题</h4>
        </div>
        <div id="addThemeVerifyCheck">
          <div id="modal_body1" class="modal-body nicescroll">
            <div class="form-horizontal mt-10 content-box-modal" style="display: block;">
              <div id="shebeiImg">
                <div class="form-group">
                  <label class="content-title-left text-right">
                    主题名称：
                  </label>
                  <div class="col-xs-9">
                    <span class="valid-form-group">
                                              <label id="lblNameMag" class="focus valid"></label>
                                      </span>
                    <input v-model="customTheme" data-valid="isNonEmpty" data-error="主题名称不能为空" id="customthemeName" type="text" maxlength="10" class="form-control required" placeholder="请输入主题名称，10字以内" />
                    <span class="ie8 ion-close-circled close hide text-danger valid-input-icon"></span>
                    <label class="fa fa-check-circle blank hide text-success valid-input-icon"></label>
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
import * as Common from 'src/assets/js/common';
const OPTS = Common.Const.options
const URL = Common.Const.url
const FUNC = Common.Func
const POST = Common.Func.axios.post
const GET = Common.Func.axios.get
import commonFn from 'assets/js/common/commonFunc';
const DELETE = commonFn.axios.delete
var btn = "";
export default {
  data: function() {
    return {
      formL: {
        ContractNo: '',
        ContractFileList: [],
        ContractFileId: '',
        ContractFileName: ''
      },
      //其它
      uploadUrl: URL.UPLOADRESOURCE, //上传资源url
      timeId: null,
      hasSetProjectOpts: false,
      projectOpts: [],
      equipmentOpts: [],
      executorOpts: [],
      participantOpts: [],
      addForm: {
        ProjectId: '',
        EquipmentId: '',
        OrderType: 1,
        Executor: '',
        Participants: [],
        OrderContent: '',
      },
      addFormRules: {
        ProjectId: [
          { required: true, message: '请选择项目', trigger: 'change' },
        ],
        OrderContent: [
          { required: true, message: '请填写工单描述', trigger: 'blur' },
        ]
      },
      ServiceTypeOpts: OPTS.SERVICETYPEOPTIONS,
      newOrderUrl: URL.WORKORDER, //创建工单
      equipmentListUrl: URL.EQUIPMENTLIST, //创建工单

      noDataTxts: '暂无',
      processing: 0, //0:数据加载处理中 1:处理完成
      recordList: [],
      noData: false,
      emptyData: '',
      currentViewTab: 'allList',
      workOrderList: [],
      OrderState: 1,
      OrderType: 0,
      TaskName: '',
      TaskContent: '',
      WorkOrderId: '',
      ContactName: '',
      ContactPhone: '',
      ContactAddress: '',
      OrderContent: '',
      IsAgent: 0,
      Tags: '',
      viewData: '',
      indexInt: 1,
      ExecutorType: '',
      OrderStatus: 0,
      OrderType: 0,
      keyWords: '',
      isAddOrder: false,

      Projects: [],
      initProjectId: '',
      ProjectId: '',
      selectedProject: '',
      orderDescriptions: '',
      equipments: [],
      selectEquipmentId: '',
      WorkOrderExecutor: [],
      selectWorkOrderExecutor: '',
      ExecutorCompanyId: '',
      WorkOrderParticipants: '',
      //selectHelpers:[],
      ProjectName: '',
      selectOrderType: 1,
      selectParticipants: [],
      WorkOrderNo: '',
      currOrderIndex: 0,
      mainPageDetails: [],
      isIntoDetails: false,
      isHasDetailData: false,
      WorkOrder: [],
      intoPageDetails: [],
      isHasJobLog: true,
      submitXResourceIds: [],
      JobTheme: [],
      JobThemeId: '',

      InsertJobLogDescriptions: '',
      selectJobTheme: '',
      detailsProjectName: '',
      detailsWorkOrderNo: '',
      detailsParticipants: [],
      CanAddJobLog: 1,
      isDistribute: false,
      selectParticipant_s: [],
      EntitySort: '',
      projectDatas: [],
      JobFiles: [],
      customTheme: '',
      CompanyId: '',
      //分页数据        
      pagingDatas: {
        page_size: 10,
        page_index: 1,
        begin_row: 0,
        end_row: 0,
        total: 0,
        page_num: 0
      },
      HasParticipants: false
    }
  },
  props: ['propsData'],
  computed: {
    uploadData() {
      return {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "ResourceType": "0",
        "Title": "上传附件",
        "Description": "上传附件"
      }
    },
    isShowAddBtn(){
      let vm = this
      if (vm.EntitySort == 2) return true
      if (vm.propsData) {
        if (vm.propsData.IsSelfProject===undefined) {
          return true
        }else{
          return vm.propsData.IsSelfProject
        }
      }
      return true
    },
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    //资源上传
    fileUploadSuccess(res) {
      let vm = this
      //console.log(res,vm.formL.ContractFileList);
      let data = res.Data[0]
      vm.JobFiles.push({
        "FileId": data.ResourceId,
        "OriginalFileName": data.OriginalResourceName,
        "SysNewFileName": data.ResourceName,
        "FileSize": data.Size,
        "Format": data.Format
      });
      if (vm.JobFiles.length >= 3) {
        let el = document.querySelector('.el-upload');
        el.style.display = 'none';
      }

      //    if (vm.formL.ContractFileId) vm.deleteRes(vm.formL.ContractFileId)
      //    vm.formL.ContractFileId = data.ResourceId
      //    vm.formL.ContractFileName = data.OriginalResourceName
      //    // console.log(vm.formL.ContractFileList)
      //    vm.formL.ContractFileList = [{
      //      name: data.OriginalResourceName,
      //      url: ''
      //    }]
    },
    fileRemove(file, fileList) {
      let vm = this;
      let resId = file.response.Data[0].ResourceId;
      vm.deleteRes(resId).then(function(res) {
        if (res.data.State == 0) {
          for (let val of Object.keys(vm.JobFiles)) {
            console.log(vm.JobFiles[val]);
            if (resId == vm.JobFiles[val].FileId) {
              vm.JobFiles.splice(val, 1)
              break;
            }
          }
          if (vm.JobFiles.length < 3) {
            let el = document.querySelector('.el-upload');
            el.style.display = 'inline-block';
          }
        }
      })
    },
    deleteRes(resId) {
      let url = URL.DELETERESOURCE
      let data = {
        "AccessToken": FUNC.storage.get('AccessToken'),
        "Parameters": {
          "ResourceId": resId,
          "ResourceType": "0"
        }
      }
      // 删除服务器对应资源          
      return DELETE(url, data)
    },
    getDataDebounce() {
      let vm = this
      clearTimeout(vm.timeId)
      vm.timeId = setTimeout(function() {
        vm.getData(1)
      }, 300)
    },
    submitAddForm() {
      this.$refs.addForm.validate((valid) => {
        //表单验证
        if (valid) {
          this.insertOrder()
          // console.log('可以提交')
        } else {
          return false;
        }
      });
    },
    insertOrder() {
      let vm = this
      let url = vm.newOrderUrl;
      let ProjectName = ''
      for (let item of vm.projectOpts) {
        if (item.ProjectId == vm.addForm.ProjectId) {
          ProjectName = item.ProjectName
          break;
        }
      }

      let Participants = []
      for (let i in vm.addForm.Participants) {
        for (let j in vm.participantOpts) {
          if (vm.addForm.Participants[i] == vm.participantOpts[j].AccountId) {
            Participants.push({
              UserName: vm.participantOpts[j].UserName,
              AccountId: vm.participantOpts[j].AccountId
            })
            break;
          }
        }
      }
      let params = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "ProjectId": vm.addForm.ProjectId, //必填
          "ProjectName": ProjectName, //Executor不为空时必填,派单时APP提醒用到
          "EquipmentId": vm.addForm.EquipmentId, //可传空
          "OrderType": vm.addForm.OrderType, //工单类别:1-调试;2-保修;3-保养;4-维修;5-其它';6-故障 必填
          "Executor": vm.addForm.Executor, //当前责任人，不为空则表示新增工单时默认派单 可传空
          "OrderContent": vm.addForm.OrderContent, //必填
          "IsAgent": "", //是否代办工单 0-否 1-是 兼容2.0版本，传空
          "Tags": "", //标签，可传空
          "Participants": Participants //协助人，Executor为空时不能传值 可传空,     
        }
      }
      POST(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.$message.success('新建工单成功')
            vm.isAddOrder = false
            vm.getData()
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    addcustomThemeSave: function() {
      let vm = this;
      if (!verifyCheck._click("addThemeVerifyCheck")) {
        return false;
      }
      let len = vm.JobTheme.length;
      vm.JobTheme.unshift({ id: len, themeName: vm.customTheme });
      vm.JobThemeId = len;
      vm.$nextTick(function() {
        $("#selectJobTheme option[value='" + vm.JobThemeId + "']").prop("selected", true);
        $('#selectJobTheme').selectpicker('refresh');
      })

      $('#modal-cleos').modal('hide');
    },
    customThemeClick: function() {
      $('#modal-cleos').modal('show');
    },
    gets: function() {
      var _this = this;
      this.$router.push({
        name: 'work_order_details',
        params: {
          orderinfos: { WorkOrderId: "f2e38e50-0635-4f68-8ddb-810ac1fb8b57", ProjectId: "a2b48b56-1281-414a-afc7-970a5e8fe00f" }
        }
      });
    },
    getAllProjectList: function() {
      //请求项目列表数据
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get('AccessToken'),
        "IsMaint": _this.EntitySort,
        "PrincipalUserId": '',
        "CompanyId": '',
        "LockType": '',
        "AlarmType": '',
        "ProjectName": '',
        "PageIndex": '',
        "PageSize": ''
      };
      var url = eosCommon.ENTERPRISE_API + "api/project/Query";
      eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {

          if (result.Data.Result.length == 0) {
            _this.projectDatas = result.Data.Result;

            //_this.allListData=result.Data.Result;

          } else {

            _this.projectDatas = result.Data.Result;
            //                              _this.currProjectName=_this.allListData[0].ProjectName;
            //                              _this.ProjectId=_this.allListData[0].ProjectId;

          }
          _this.initProjectId = '';
          _this.$nextTick(function() {
            $('#selectItem').selectpicker('refresh');
          })
        }
      });
    },
    getProjectList: function() {
      //请求项目列表数据
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get('AccessToken'),
        "PageIndex": '', //第几页（可为空，为空或为0时不分页）
        "PageSize": '', //条数（可为空，为空或者为0不分页）
        "Parameters": {
          "Keywords": ''
        }
      };
      var url = eosCommon.COMMON_API + "api/common/project";
      eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          //            _this.projectDatas = result.Data.Result;
          //            _this.initProjectId = '';
          if (result.Data.Result.length == 0) {
            _this.Projects = [];
            _this.ProjectId = '';
          } else {
            _this.Projects = result.Data.Result;
            _this.ProjectId = _this.Projects[0].ProjectId;
            //$("#addSelectItem option[value='" + _this.ProjectId + "']").prop("selected", true);
          }
          _this.$nextTick(function() {
            $('#addSelectItem').selectpicker('refresh');
          })
          if (_this.ProjectId) {
            _this.QueryWorkOrderExecutor();
            _this.getEuipmentDatas();
          } else {
            _this.equipments = [];
            _this.$nextTick(function() {
              $('#relativeEquipment').selectpicker('refresh');
            })
          }

        }
      });
    },
    InsertJobLogSave: function() {
      var _this = this;
      if (_this.selectJobTheme == '') {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '请选择工作主题',
          ok: function() {

          },
          cancel: true,
          modal: true
        });
        return false;
      }

      if (!verifyCheck._click("addThemePanel")) {
        return false;
      }
      if (_this.selectJobTheme == '派发') {
        if (_this.selectWorkOrderExecutor == '') {
          vdialog({
            type: 'confirm',
            title: '提示',
            content: '请选择负责人',
            ok: function() {

            },
            cancel: true,
            modal: true
          });
          return false;
        }
      }
      for (var j = 0; j < _this.selectParticipants.length; j++) {
        for (var i = 0; i < _this.WorkOrderParticipants.length; i++) {
          if (_this.selectParticipants[j] == _this.WorkOrderParticipants[i].AccountId) {
            _this.selectParticipant_s.push({ "UserName": _this.WorkOrderParticipants[i].UserName, "AccountId": _this.selectParticipants[j] });
          }
        }
      }
      if (_this.selectParticipant_s.length == 0) {
        _this.selectParticipant_s = [];
      }
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "ProjectName": _this.detailsProjectName, //必填
          "WorkOrderId": _this.WorkOrderId, //必填
          "WorkOrderNo": _this.detailsWorkOrderNo, //必填
          "Description": _this.InsertJobLogDescriptions, //工作描述
          "JobFiles": _this.JobFiles, // 工作附件,可传空 OriginalFileName为客户端上传时文件名,SysNewFileName为上传后系统生成的文件名
          "JobTheme": _this.selectJobTheme, //_this.selectJobTheme //工作主题,系统默认：处理建议、到场签到、处理前记录、处理中记录、处理后记录、完结申请、关闭、退回、取消、派发；也可手动填写,不能超过10个字符 必填
          "Executor": _this.selectWorkOrderExecutor, //当前负责人, 当工单主题为派发为必填项
          "Participants": _this.selectParticipant_s,
          "JobAddress": "", //工作处理的详细地址(街道地址),不能超过300字符 可传空
          "Longitude": "", //工作处理地址经度,精确到小数点7位 可传空
          "Latitude": "" //工作处理地址纬度,精确到小数点7位 可传空
        }
      }
      var url = eosCommon.ENTERPRISE_API + "api/project/InsertJobLog";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.INSERT_MSG);
          _this.getWorkOrderDetails();
          _this.selectJobTheme = '';
          _this.JobFiles = [];
          let el = document.querySelector('.el-upload');
          el.style.display = 'inline-block';
          _this.formL.ContractFileList = []
        }
      })
    },
    selectJobThemeChange: function() {
      var _this = this;
      if (_this.JobThemeId !== '') {
        for (var i = 0; i < _this.JobTheme.length; i++) {
          if (_this.JobThemeId == _this.JobTheme[i].id) {
            _this.selectJobTheme = _this.JobTheme[i].themeName;
          }
        }
      }
      if (_this.selectJobTheme == '派发') {
        _this.isDistribute = true;
        var param = {
          "AccessToken": eosCommon.storage.get("AccessToken"),
          "QueryType": 2, //查询场景类型，1-新增工单 2-派单 必填,值只能为1或2
          "WorkOrderId": _this.WorkOrderId, //QueryType为2时必填
          "ProjectId": "" //QueryType为1时必填
        }

        var url = eosCommon.APP_API + "api/oa/QueryWorkOrderExecutor";
        eosCommon.eosAjax(url, "GET", param, "json", function(result) {
          if (eosCommon.checkCode(result.State, result.Message)) {
            _this.WorkOrderExecutor = result.Data.Result;
            _this.$nextTick(function() {
              // $('#selectCharges').selectpicker('refresh');
              $('#d_selectCharges').selectpicker('refresh');
            })
          }
        })
      } else {
        _this.isDistribute = false;
        _this.selectWorkOrderExecutor = ''; //当前责任人，不为空则表示新增工单时默认派单 可传空
        _this.selectParticipant_s = []; //协助人，Executor为空时不能传值 可传空,      
      }
    },
    QueryJobTheme: function() {
      var _this = this;
      //_this.isIntoDetails = true;
      _this.initEditDatas();
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "WorkOrderId": _this.WorkOrderId
      }

      var url = eosCommon.ENTERPRISE_API + "api/project/QueryJobTheme";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          if (result.Data.JobTheme.length == 0) {
            _this.JobTheme = []
            _this.$nextTick(function() {
              $('#selectJobTheme').selectpicker('refresh');
            })
          } else {
            for (var i = 0; i < result.Data.JobTheme.length; i++) {
              _this.JobTheme.push({ id: i, themeName: result.Data.JobTheme[i] });
            }
            _this.$nextTick(function() {
              $('#selectJobTheme').selectpicker('refresh');
            })
          }
        }
      })
    },
    detailReturnClick: function() {
      var _this = this;
      //_this.initProjectId='';

      _this.getData();
      _this.getCurrWorkOrderDetail(_this.WorkOrderId, _this.WorkOrderNo, _this.currOrderIndex);
      _this.isIntoDetails = false;
    },
    setProjectOpts: function() {
      //请求项目列表数据
      let vm = this;
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageIndex": '', //第几页（可为空，为空或为0时不分页）
        "PageSize": '', //条数（可为空，为空或者为0不分页）
        "Parameters": {
          "Keywords": ''
        }
      };
      let url = URL.PROJECT;
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            if (res.Data.Result.length == 0) {
              vm.projectOpts = [];
              vm.addForm.ProjectId = '';
            } else {
              if (vm.EntitySort == 2) {
                vm.projectOpts = res.Data.Result
              } else {
                vm.projectOpts = res.Data.Result.filter((val) => {
                  return val.IsSelfProject == 1;
                });
              }
              // vm.addForm.ProjectId = vm.projectOpts[0].ProjectId;
              vm.addForm.ProjectId = vm.propsData.ProjectId || vm.projectOpts[0].ProjectId
              console.log(vm.projectOpts)
            }
            // if (vm.ProjectId) {
            //   vm.QueryWorkOrderExecutor();
            //   vm.getEuipmentDatas();
            // } else {
            //   vm.equipments = [];
            // }
            vm.hasSetProjectOpts = true
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setEquipmentOpts: function() {
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageIndex": 1,
        "PageSize": 10,
        "IsDefaultEquipment": '', // -- 是否只获取第一台设备的数据
        "Parameters": {
          "ProjectId": vm.addForm.ProjectId, //--项目Id(必填)
          "GatewayId": '', //-- 网关id, 可传空
          "Keywords": "", //-- 搜索关键字, 可传空
          "OnlineStatus": -1, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
          "AlarmStatus": -1, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
          "RunStatus": -1 //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
        }
      }
      let url = this.equipmentListUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            if (res.Data instanceof Array) {
              vm.equipmentOpts = [];
            } else {
              vm.equipmentOpts = res.Data.Equipments;
            }
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setExecutorOpts: function() {
      let vm = this;
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "QueryType": 1, //查询场景类型，1-新增工单 2-派单 必填,值只能为1或2
        "WorkOrderId": "", //QueryType为2时必填
        "ProjectId": vm.addForm.ProjectId //QueryType为1时必填
      }
      let url = URL.QUERYWORKORDEREXECUTOR
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            if (res.Data.Result instanceof Array) {
              vm.executorOpts = res.Data.Result;
            } else {
              vm.executorOpts = [];
            }
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setParticipantOpts: function() {
      let vm = this;
      let companyId = ''
      for (let i in vm.executorOpts) {
        if (vm.addForm.Executor == vm.executorOpts[i].AccountId) {
          companyId = vm.executorOpts[i].CompanyId;
        }
      }
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "QueryType": 1, //查询场景类型，1-新增工单 2-派单 必填,值只能为1或2
        "WorkOrderId": "", //QueryType为2时必填
        "ProjectId": vm.addForm.ProjectId, //QueryType为1时必填
        "CompanyId": companyId, //负责人所在的企业id, 必填
        "ExecutorId": vm.addForm.Executor //
          ,
        必填
      }
      let url = URL.QUERYWORKORDERPARTICIPANTS
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.participantOpts = res.Data.Result;
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    resetAddForm() {
      let vm = this
      vm.addForm.ProjectId = ''
      vm.addForm.EquipmentId = ''
      vm.addForm.Executor = ''
      vm.addForm.OrderType = 1
      vm.addForm.Participants = []
      vm.addForm.OrderContent = ''
    },
    projectIdChange() {
      let vm = this
      if (!vm.addForm.ProjectId) {
        vm.projectOpts = []
        vm.executorOpts = []
      } else {
        vm.setEquipmentOpts()
        vm.setExecutorOpts()
      }
      vm.participantOpts = []

      vm.addForm.EquipmentId = ''
      vm.addForm.Executor = ''
      vm.addForm.Participants = []
    },
    executorChange() {
      let vm = this
      if (!vm.addForm.Executor) {
        vm.participantOpts = []
      } else {
        vm.setParticipantOpts()
      }
      vm.addForm.Participants = []
    },
    showAddForm() {
      let vm = this;
      vm.isAddOrder = true;
      // if (!vm.hasSetProjectOpts) 
      vm.setProjectOpts()
      // vm.addForm.ProjectId = vm.propsData.ProjectId || ''
      vm.resetAddForm()
    },
    getWorkOrderDetails: function() {
      var _this = this;
      _this.JobThemeId = '';
      _this.selectJobTheme = '';
      eosCommon.resetFrom();
      if (_this.WorkOrderId == '') {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '请先选相应择工单',
          ok: function() {

          },
          cancel: true,
          modal: true
        });
        return false;
      }
      _this.isIntoDetails = true;
      _this.QueryJobTheme();
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "IsLoadOrder": 1, //是否需要加载工单信息
        "WorkOrderId": _this.WorkOrderId
      }

      var url = eosCommon.ENTERPRISE_API + "api/project/WorkOrderDetail";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.WorkOrder = result.Data.WorkOrder[0];
          let OrderStatusName = _this.WorkOrder.OrderStatusName;
          if (result.Data.CanAddJobLog == 0 || OrderStatusName == "已关闭" || OrderStatusName == "已取消") {
            _this.CanAddJobLog = 0;
          } else {
            _this.CanAddJobLog = 1;
          }
          _this.detailsParticipants = _this.WorkOrder.Participants;
          _this.intoPageDetails = result.Data.JobLog;
          if (_this.intoPageDetails.length == 0) {
            //暂无数据
            _this.isHasJobLog = true;
          } else {
            _this.isHasJobLog = false;

          }
          _this.detailsProjectName = _this.WorkOrder.ProjectName;
          _this.detailsWorkOrderNo = _this.WorkOrder.WorkOrderNo;

        }
      })
    },
    getCurrWorkOrderDetail: function(WorkOrderId, WorkOrderNo, index, currProjectId) {
      var _this = this;
      _this.currOrderIndex = index;
      _this.WorkOrderNo = WorkOrderNo;
      _this.WorkOrderId = WorkOrderId;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "IsLoadOrder": 0, //是否需要加载工单信息
        "WorkOrderId": _this.WorkOrderId
      }

      var url = eosCommon.ENTERPRISE_API + "api/project/WorkOrderDetail";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          if (result.Data instanceof Array) {
            //数据为空
            _this.isHasDetailData = false;
          } else {
            _this.isHasDetailData = true;
            _this.mainPageDetails = result.Data.JobLog;
          }
        }
      })
    },
    mainPageOrderDetails: function() {
      var _this = this;
    },
    addWorkOrder: function() {
      var _this = this;
      eosCommon.resetFrom();
      _this.isAddOrder = true;
      if (!_this.propsData.ProjectId) {
        //          for(let i=0;i<_this.Projects.length;i++){
        //            if(_this.Projects[i].IsExperienceProject != 1){
        //              _this.initProjectId = _this.Projects[0].ProjectId;
        //              break;
        //            }
        //            if( i == (_this.Projects.length-1)){              
        //              _this.Projects=[];
        //              _this.initProjectId='';
        //            }
        //          }
        //_this.initProjectId = _this.Projects[0].ProjectId;
        _this.getProjectList();

      }
      _this.orderDescriptions = '';
      _this.selectEquipmentId = '';
      _this.selectWorkOrderExecutor = '';
      _this.ExecutorCompanyId = '';
      _this.selectOrderType = 1;
      _this.selectParticipants = [];
      _this.$nextTick(function() {
        _this.initSelects();
      })
    },
    addWordOrderSave: function() {
      var _this = this;

      if (_this.ProjectId == '') {
        vdialog({
          type: 'confirm',
          title: '提示',
          content: '请先选择项目',
          ok: function() {

          },
          cancel: true,
          modal: true
        });
        return;
      }
      if (!verifyCheck._click("addWorkOrdeverifyCheck")) {
        return false;
      }
      var selectParticipants = [];
      for (var j = 0; j < _this.selectParticipants.length; j++) {
        for (var i = 0; i < _this.WorkOrderParticipants.length; i++) {
          if (_this.selectParticipants[j] == _this.WorkOrderParticipants[i].AccountId) {
            selectParticipants.push({ "UserName": _this.WorkOrderParticipants[i].UserName, "AccountId": _this.selectParticipants[j] });
          }
        }
      }
      if (selectParticipants.length == 0) {
        selectParticipants = [];
      }
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "Parameters": {
          "ProjectId": _this.ProjectId, //必填
          "ProjectName": $("#addSelectItem option:selected").attr("datas"), //Executor不为空时必填,派单时APP提醒用到
          "EquipmentId": _this.selectEquipmentId, //可传空
          "OrderType": _this.selectOrderType, //工单类别:1-调试;2-保修;3-保养;4-维修;5-其它';6-故障 必填
          "OrderContent": _this.orderDescriptions, //必填
          "IsAgent": "", //是否代办工单 0-否 1-是 兼容2.0版本，传空
          "Tags": "", //标签，可传空
          "Executor": _this.selectWorkOrderExecutor, //当前责任人，不为空则表示新增工单时默认派单 可传空
          "Participants": selectParticipants //协助人，Executor为空时不能传值 可传空,     
        }
      }
      var url = eosCommon.ENTERPRISE_API + "api/project/WorkOrder";
      eosCommon.eosAjax(url, "POST", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          eosCommon.eosMessage("success", eosCommon.INSERT_MSG);

          _this.isAddOrder = false;
          _this.getData();
        }
      })
    },
    returnClick: function() {
      var _this = this;
      _this.isAddOrder = false;
    },
    getData: function(page_index) {
      var _this = this;
      _this.workOrderList = [];
      if (page_index) {
        this.pagingDatas.page_index = 1;
      }
      _this.noData = true;
      // console.log(_this.OrderStatus)
      var params = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "PageIndex": this.pagingDatas.page_index,
        "PageSize": this.pagingDatas.page_size,
        "Parameters": {
          "ProjectId": _this.initProjectId,
          "ExecutorType": _this.ExecutorType, //负责人类别: 0或传空-全部;1-本人;2-其他人
          "OrderStatus": _this.OrderStatus, //工单状态:1-未关闭;2-已关闭;3-已取消, 必填
          "OrderType": _this.OrderType, //工单类别:1-调试;2-保修;3-保养;4-维修;5-其它;6-故障;0-全部, 必填
          "ExecutorName": _this.keyWords //负责人姓名,可传空
        }
      }
      eosCommon.eosAjax(eosCommon.ENTERPRISE_API + 'api/project/QueryWorkOrder', "GET", params, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.noData = false;
          if (!result.Data.Result.length) {
            _this.workOrderList = [];
            _this.pagingDatas.total = 0;
            _this.emptyData = true;
            _this.WorkOrderId = '';
            _this.isHasDetailData = false;
          } else {
            _this.emptyData = false;
            _this.pagingDatas.total = result.Data.Total;
            _this.workOrderList = result.Data.Result;
            _this.getCurrWorkOrderDetail(_this.workOrderList[0].WorkOrderId, _this.workOrderList[0].WorkOrderNo, 0);
            _this.pagingDatas.begin_row = _this.pagingDatas.page_size * (_this.pagingDatas.page_index - 1) + 1;
            _this.pagingDatas.end_row = _this.pagingDatas.page_size * (_this.pagingDatas.page_index - 1) + _this.workOrderList.length;
            _this.pagingDatas.page_num = Math.ceil(_this.pagingDatas.total / _this.pagingDatas.page_size);
          }
        }
      });
    },
    initSelects: function() {
      $("#order_charges option[value='" + this.ExecutorType + "']").prop("selected", true);
      $("#selectOrderState option[value='" + this.OrderStatus + "']").prop("selected", true);
      $('#order_charges').selectpicker('refresh');
      $('#OrderType').selectpicker('refresh');
      $('#selectOrderState').selectpicker('refresh');
      $('#selectOrderType').selectpicker('refresh');
      $('#relativeEquipment').selectpicker('refresh');
      $('#selectCharges').selectpicker('refresh');
      $('#selectHelpers').selectpicker('refresh');

    },

    getEuipmentDatas: function() {
      var _this = this;

      if (_this.initProjectId !== '') {
        _this.QueryWorkOrderExecutor();
      }
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "PageIndex": 1,
        "PageSize": 10,
        "IsDefaultEquipment": '', // -- 是否只获取第一台设备的数据
        "Parameters": {
          "ProjectId": _this.ProjectId, //--项目Id(必填)
          "GatewayId": '', //-- 网关id, 可传空
          "Keywords": "", //-- 搜索关键字, 可传空
          "OnlineStatus": -1, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
          "AlarmStatus": -1, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
          "RunStatus": -1 //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
        }
      }

      var url = eosCommon.ENTERPRISE_API + "api/equipment/QueryEquipmentList";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          if (result.Data instanceof Array) {
            _this.equipments = [];
            _this.$nextTick(function() {
              $('#relativeEquipment').selectpicker('refresh');
            })
          } else {
            _this.equipments = result.Data.Equipments;
            _this.$nextTick(function() {
              $('#relativeEquipment').selectpicker('refresh');
            })
          }
        }
      })
    },
    QueryWorkOrderExecutor: function() {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "QueryType": 1, //查询场景类型，1-新增工单 2-派单 必填,值只能为1或2
        "WorkOrderId": "", //QueryType为2时必填
        "ProjectId": _this.ProjectId //QueryType为1时必填
      }

      var url = eosCommon.APP_API + "api/oa/QueryWorkOrderExecutor";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.WorkOrderExecutor = result.Data.Result;
          _this.$nextTick(function() {
            $('#selectCharges').selectpicker('refresh');
            $('#d_selectCharges').selectpicker('refresh');
          })
        }
      })
    },
    selectHelpersClick: function() {
      var _this = this;
      $('div.selectHelpers button').click(function() {
        if (_this.selectWorkOrderExecutor == '') {
          vdialog({
            type: 'confirm',
            title: '提示',
            content: '请先选择负责人',
            ok: function() {

            },
            cancel: true,
            modal: true
          });
        }
      })
    },
    QueryWorkOrderParticipants: function() {
      var _this = this;
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "QueryType": 1, //查询场景类型，1-新增工单 2-派单 必填,值只能为1或2
        "WorkOrderId": "", //QueryType为2时必填
        "ProjectId": _this.ProjectId, //QueryType为1时必填
        "CompanyId": _this.ExecutorCompanyId, //负责人所在的企业id, 必填
        "ExecutorId": _this.selectWorkOrderExecutor //负责人用户id, 必填
      }
      var url = eosCommon.ENTERPRISE_API + "api/project/QueryWorkOrderParticipants";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.WorkOrderParticipants = result.Data.Result;
          _this.$nextTick(function() {
            $('#selectHelpers').selectpicker('refresh');
            $('#d_selectHelpers').selectpicker('refresh');
          })
        }
      })
    },

    getExecutorCompanyId: function() {
      var _this = this;
      for (var i = 0; i < _this.WorkOrderExecutor.length; i++) {
        if (_this.selectWorkOrderExecutor == _this.WorkOrderExecutor[i].AccountId) {
          if (_this.WorkOrderExecutor[i].HasParticipants == 1) {
            _this.HasParticipants = true;
          } else {
            _this.HasParticipants = false;
          }
          _this.ExecutorCompanyId = _this.WorkOrderExecutor[i].CompanyId;
        }
      }
      _this.selectParticipants = []
      var param = {
        "AccessToken": eosCommon.storage.get("AccessToken"),
        "QueryType": 2, //查询场景类型，1-新增工单 2-派单 必填,值只能为1或2
        "WorkOrderId": _this.WorkOrderId, //QueryType为2时必填
        "ProjectId": '', //QueryType为1时必填
        "CompanyId": _this.ExecutorCompanyId, //负责人所在的企业id, 必填
        "ExecutorId": _this.selectWorkOrderExecutor //负责人用户id, 必填
      }
      var url = eosCommon.ENTERPRISE_API + "api/project/QueryWorkOrderParticipants";
      eosCommon.eosAjax(url, "GET", param, "json", function(result) {
        if (eosCommon.checkCode(result.State, result.Message)) {
          _this.WorkOrderParticipants = result.Data.Result;
          _this.$nextTick(function() {
            $('#selectHelpers').selectpicker('refresh');
            $('#d_selectHelpers').selectpicker('refresh');
          })
        }
      })
    },
    initEditDatas() {
      var _this = this,
        fielId = [],
        urlId = [];
      _this.JobTheme = [];
      _this.JobThemeId = '';
      _this.InsertJobLogDescriptions = '';
      _this.selectWorkOrderExecutor = '';
      _this.ExecutorCompanyId = '';
      _this.selectParticipants = [];
      if (!_this.propsData.ProjectId) {
        //黄君福
        return;
      }
      //_this.ProjectId = _this.Projects[0].ProjectId;
      _this.QueryWorkOrderExecutor();
      _this.selectHelpersClick();
      _this.$nextTick(function() {
        $('#selectJobTheme').selectpicker('refresh');
        $('#d_selectCharges').selectpicker('refresh');
        $('#d_selectHelpers').selectpicker('refresh');

      })
    },
    cancel: function() {
      $("#workOrderData").show();
      $("#dispatchWorkOrderBox,#addWorkOrderBox,#workOrderView").hide();
    },
    changeCurrentViewName: function(name) {
      this.propsData.currentView = name;
    },
    selectOrderChange() {
      this.pagingDatas.page_index = 1;
      this.getData();
    },
    searchClick() {
      this.pagingDatas.page_index = 1;
      this.getData();
    }
  },
  watch: {
    "pagingDatas.page_index": function(val, oldVal) {
      this.indexInt = val;
      this.getData();
    }
  },
  updated() {
    eosCommon.eosOperators(eosCommon.eosOperDataHandle());
  },
  mounted: function() {
    var _this = this;
    // console.log(_this.propsData)
    if (_this.$route.params.subType == 1) {
      _this.ExecutorType = 1;
      _this.OrderStatus = 1;
    }

    $('.delAllBtn').remove();
    _this.EntitySort = eosCommon.storage.get('EntitySort');
    _this.CompanyId = eosCommon.storage.get('CompanyId');
    //$("#right_lists").getNiceScroll().resize();
    $("#JobLogs").css('max-height', '534px').niceScroll();
    $("#JobLogs").getNiceScroll().resize();
    if (_this.propsData.ProjectId) {
      _this.initProjectId = _this.propsData.ProjectId;
      _this.ProjectId = _this.propsData.ProjectId;
      _this.QueryWorkOrderExecutor();
      _this.Projects.push(_this.propsData);
      $("#addSelectItem option[value='" + _this.ProjectId + "']").prop("selected", true);
      $('#addSelectItem').selectpicker('refresh');
      _this.getEuipmentDatas();
    } else {
      _this.getAllProjectList();
    }
    _this.QueryWorkOrderParticipants();
    _this.initSelects();
    _this.selectHelpersClick();
    setTimeout(function() {
      if (_this.$route.query.OrderStatus) {
        _this.OrderStatus = Number(_this.$route.query.OrderStatus)
        console.log(_this.OrderStatus)
      } else {
        _this.getData();
      }
    }, 0)
    $(window).resize(function() {
      if ($(".body-content").width() < 950) {
        $('.report-view-box').width($(".body-content").width() - 50)
      } else {
        $('.report-view-box').width(900)
      }
    });
    if ($(".body-content").width() < 950) {
      $('.report-view-box').width($(".body-content").width() - 50)
    } else {
      $('.report-view-box').width("900px")
    }
  }
}

</script>

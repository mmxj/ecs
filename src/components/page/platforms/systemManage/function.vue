<style lang='less' scoped>
.el_mainContent{
  width:100%;
  height:100%;
  position: relative;
  background-color: #fff;
}
.el_content {
  overflow-y: auto;
  width:100%;
}
</style>
<template>
  <div class='el_mainContent'>
    <div class="el_content" style="height: calc(100% - 40px)">
      <el-row class='border-1px'>
        <el-col :span="22">
          <h3>功能管理</h3>
        </el-col>
        <el-col :span="2" class='tar'>
          <el-button class='mb10' size='small' v-show='!isShowMain' @click='isShowMain=!isShowMain'><i class="fa fa-mail-reply-all mr5"></i>返回 </el-button>
        </el-col>
      </el-row>
      <div class="hr mb10"></div>
      <div v-show='!isShowMain&&isShowMore' class='detailBox'>
        <el-form :label-position="labelPosition" label-width="20%" :model="funDetail">
          <el-form-item label="排序：">
            <div class="el-form-item__content">{{funDetail.DisplayOrder}}</div>
          </el-form-item>
          <el-form-item label="功能名称：">
            <div class="el-form-item__content">{{funDetail.FunctionName}}</div>
          </el-form-item>
          <el-form-item label="功能类别：">
            <div class="el-form-item__content">{{funDetail.FunctionTypeName}}</div>
          </el-form-item>
          <el-form-item label="URL：">
            <div class="el-form-item__content">{{funDetail.FunctionUrl}}</div>
          </el-form-item>
          <el-form-item label="父功能名称：">
            <div class="el-form-item__content">{{funDetail.ParentName}}</div>
          </el-form-item>
          <el-form-item label="所属应用：">
            <div class="el-form-item__content">{{funDetail.ApplicationName}}</div>
          </el-form-item>
          <el-form-item label="是否启用：">
            <div class="el-form-item__content">{{funDetail.IsActiveDisplay}}</div>
          </el-form-item>
          <el-form-item label="自动展开：">
            <div class="el-form-item__content">{{funDetail.IsAutoExpandDisplay}}</div>
          </el-form-item>
          <el-form-item label="快捷菜单：">
            <div class="el-form-item__content">{{funDetail.IsShortcutDisplay}}</div>
          </el-form-item>
          <el-form-item label="菜单图标：">
            <div class="el-form-item__content"><span :class="funDetail.FunctionIcon" v-show='funDetail.FunctionIcon' id='FunctionIcon' /></div>
          </el-form-item>
          <el-form-item label="快捷菜单图标：">
            <div class="el-form-item__content"><img :class="funDetail.ShortcutIcon" v-show='funDetail.ShortcutIcon' id='ShortcutIcon' /></div>
          </el-form-item>
          <el-form-item label="功能描述：">
            <div class="el-form-item__content">{{funDetail.Description}}</div>
          </el-form-item>
        </el-form>
      </div>
      <div v-show='isShowMain'>
        <el-row>
          <el-col :span='24' >
            <el-button size='small' v-show='isOperate.create' type="primary" icon='plus' class='mb10 btn-2top' @click="openAddForm">新增</el-button>
            <span v-show='isOperate.query'>
            <span class="w150 mb10">
              <el-select size='small' v-model="ApplicationId" clearable placeholder="所属应用" @change='searchFunc'>
                <el-option
                    v-for="(item, index) in ApplicationIdOptions"
                    :key="index"
                    :label="item.ApplicationName"
                    :value="item.ApplicationId">
                  </el-option>
              </el-select >
            </span>
            <span class="w150 mb10">
              <el-select size='small' v-model="FunctionType" clearable placeholder="功能类别" @change='searchFunc'>
                <el-option
                    v-for="item in FunctionTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w150 mb10">
              <el-select size='small' v-model="FunctionSort" clearable placeholder="功能类型" @change='searchFunc'>
                <el-option
                    v-for="item in FunctionSortOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w150 mb10">
              <el-select size='small' v-model="IsActive" clearable placeholder="功能状态" @change='searchFunc'>
                <el-option
                    v-for="item in IsActiveOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w200 mb10" @keyup='deSearchFunc'>
              <el-input size='small' v-model="KeyWords" placeholder="功能名称" ></el-input>
            </span>
            <el-button size='small' type="primary" icon='search' class='mb10 btn-2top' @click='searchFunc'>查找</el-button>
            </span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-table :data="tableData" v-loading="loadingTable" element-loading-text="努力加载中" style="width: 100%" class='userTable' stripe>
              <el-table-column type="index" label="序号" width='65' align='center'>
              </el-table-column>
              <el-table-column prop="FunctionName" label="功能名称" align='center' min-width='100'>
              </el-table-column>
              <el-table-column prop="ParentName" label="所属目录名称" align='center' min-width='120'>
              </el-table-column>
              <el-table-column prop="ApplicationName" label="所属应用" align='center' min-width='100'>
              </el-table-column>
              <el-table-column prop="FunctionTypeName" label="功能类别" align='center' min-width='100'>
              </el-table-column>
              <el-table-column prop="FunctionSortName" label="功能类型" align='center' min-width='100'>
              </el-table-column>
              <el-table-column prop="FunctionUrl" label="URL" align='center' min-width='150'>
              </el-table-column>
              <el-table-column prop="IsShortcutDisplay" label="快捷菜单" align='center' min-width='100'>
              </el-table-column>
              <el-table-column prop="DisplayOrder" label="排序" align='center' min-width='80'>
              </el-table-column>
              <el-table-column prop="IsActiveDisplay" label="状态" align='center' min-width='80'>
              </el-table-column>
              <el-table-column label="操作" fixed='right' align='center' width='120'>
                <template scope="scope">
                  <el-button @click="seeMore(scope.row)" type="text" size="small"><i class="fa fa-eye" title="查看详情"></i></el-button>
                  <el-button type="text" size="small" v-show='isOperate.update' @click='editFunc(scope.row)'><i class="el-icon-edit" title="编辑信息"></i></el-button>
                  <el-button type="text" size="small" v-show='isOperate.delete' @click="deleteConfirm(scope.row.FunctionId)"><i class="el-icon-delete" title="删除信息"></i></el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- <div class="clearfix mb10"></div>
        <el-row>
          <el-col :span='24'>
            <div class="pageBlock">
              <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="TotalData">
              </el-pagination>
            </div>
          </el-col>
        </el-row> -->
        <div class="pagin">
          <div class="pageDes">
            <span>当前显示 {{firstPage}} 到 {{lastPage}} 条记录</span>
            <span>共 {{TotalData}} 条记录</span>
          </div>
          <div class="pageBlock">
            <el-pagination @current-change="pageIndexChange" :current-page.sync="PageIndex" :page-size="PageSize" layout="prev, pager, next, jumper" :total="TotalData">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="修改功能" :visible.sync="isShowEdit">
      <el-form :model="funcEditForm" :rules="rules" ref="ruleEditForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="功能名称" prop="FunctionName">
          <el-input v-model="funcEditForm.FunctionName"></el-input>
        </el-form-item>
        <el-form-item label="功能类别" prop='FunctionSort'>
          <el-select v-model="funcEditForm.FunctionTypeName" disabled>
            <el-option :label="funcEditForm.FunctionTypeName" :value="0">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属目录名称">
          <el-select v-model="funcEditForm.ParentName" disabled class='mr30 mb10'>
            <el-option :label="funcEditForm.ParentName" :value="0">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录图标">
          <el-select v-model="funcEditForm.FunctionIcon" clearable placeholder="选择图标">
            <el-option v-for="item in functionIconOpts" :key="item.IconId" :label="item.IconName" :value="item.IconName">
              <span style="float: left" :class='item.IconName' class='mr30'></span>
              <span style="float: left; color: #8492a6;">{{ item.IconName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属应用" prop="ApplicationId">
          <el-select v-model="funcEditForm.ApplicationId" clearable placeholder="所属应用">
            <el-option v-for="(item, index) in ApplicationIdOptions" :key="index" :label="item.ApplicationName" :value="item.ApplicationId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能类型" prop='FunctionSort'>
          <el-select v-model="funcEditForm.FunctionSort" clearable placeholder="功能类型">
            <el-option v-for="item in FunctionSortOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能地址">
          <el-input v-model="funcEditForm.FunctionUrl"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="DisplayOrder">
          <el-input v-model="funcEditForm.DisplayOrder"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChangeEdit">全选</el-checkbox>
          <div class="w80p ti15">
            <el-checkbox-group v-model="checkedOptsEdit" @change="handleCheckedOptsChange">
              <el-checkbox v-for="opt in opOpts" :label="opt" :key="opt">{{opt}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="快捷菜单">
          <el-radio-group v-model="funcEditForm.IsShortcut">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="快捷菜单图标" v-show='funcEditForm.IsShortcut==1'>
          <el-select v-model="funcEditForm.ShortcutIcon" clearable placeholder="选择快捷菜单图标">
            <el-option v-for="item in shortcutIconOpts" :key="item.IconId" :label="item.IconName" :value="item.IconName">
              <span style="float: left" :class='item.IconName' class='mr30'></span>
              <span style="float: left; color: #8492a6;">{{ item.IconName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="funcEditForm.IsActive">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动展开">
          <el-radio-group v-model="funcEditForm.IsAutoExpand">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="功能描述">
          <el-input type="textarea" v-model="funcEditForm.Description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowEdit = false">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('ruleEditForm')">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 新增功能表单 -->
    <el-dialog title="新增功能" :visible.sync="dialogFormVisible">
      <el-form :model="addFunForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="功能名称" prop="FunctionName">
          <el-input v-model="addFunForm.FunctionName"></el-input>
        </el-form-item>
        <el-form-item label="功能类别" prop="FunctionType">
          <el-select v-model="addFunForm.FunctionType" clearable placeholder="功能类别" @change='setFunctionlinkage(undefined,addFunForm.FunctionType)'>
            <el-option v-for="(item,index) in FunctionTypeOptions" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属目录名称">
          <el-select v-model="addFunForm.ParentId" clearable placeholder="所属目录名称" class='mr30 mb10'>
            <el-option v-for="item in functionListPar" :key="item.FunctionId" :label="item.FunctionName" :value="item.FunctionId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="目录图标">
          <el-select v-model="addFunForm.FunctionIcon" clearable placeholder="选择图标">
            <el-option v-for="item in functionIconOpts" :key="item.IconId" :label="item.IconName" :value="item.IconName">
              <span style="float: left" :class='item.IconName' class='mr30'></span>
              <span style="float: left; color: #8492a6;">{{ item.IconName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属应用" prop="ApplicationId">
          <el-select v-model="addFunForm.ApplicationId" clearable placeholder="所属应用">
            <el-option v-for="(item, index) in ApplicationIdOptions" :key="index" :label="item.ApplicationName" :value="item.ApplicationId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能类型" prop='FunctionSort'>
          <el-select v-model="addFunForm.FunctionSort" clearable placeholder="功能类型">
            <el-option v-for="item in FunctionSortOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="功能地址">
          <el-input v-model="addFunForm.FunctionUrl"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="DisplayOrder">
          <el-input v-model="addFunForm.DisplayOrder"></el-input>
        </el-form-item>
        <el-form-item label="操作">
          <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
          <div class="w80p ti15">
            <el-checkbox-group v-model="checkedOpts" @change="handleCheckedOptsChange">
              <el-checkbox v-for="opt in opOpts" :label="opt" :key="opt">{{opt}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
        <el-form-item label="快捷菜单" prop='IsShortcut'>
          <el-radio-group v-model="addFunForm.IsShortcut">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="快捷菜单图标" v-show='addFunForm.IsShortcut==1'>
          <el-select v-model="addFunForm.ShortcutIcon" clearable placeholder="选择快捷菜单图标">
            <el-option v-for="item in shortcutIconOpts" :key="item.IconId" :label="item.IconName" :value="item.IconName">
              <span style="float: left" :class='item.IconName' class='mr30'></span>
              <span style="float: left; color: #8492a6;">{{ item.IconName }}</span>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否启用" prop='IsActive'>
          <el-radio-group v-model="addFunForm.IsActive">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="自动展开" prop='IsAutoExpand'>
          <el-radio-group v-model="addFunForm.IsAutoExpand">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="功能描述">
          <el-input type="textarea" v-model="addFunForm.Description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
let URL = Common.Const.url
let OPTS = Common.Const.options
let FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post
const DELETE = AXIOS.delete
const PUT = AXIOS.put
let Vlidator = Common.Func.validator
const operateOptions = Common.Const.options.FUNC_OPERATEOPTIONS

// console.log(allOperateOptions)
export default {
  data() {
    return {
      timeId: null,
      shortcutIconOpts: [],
      functionIconOpts: [],
      functionListPar: [],
      //多选框
      checkAll: true,
      checkedOpts: [],
      checkedOptsEdit:[],
      opOpts: operateOptions,
      isIndeterminate: true,

      //编辑应用相关
      isShowEdit: false,
      funcEditForm: {},


      //应用详细内容
      funDetail: {},
      labelPosition: 'right',
      isShowMore: false,

      //操作权限相关
      isOperate: {},

      //加载表格相关
      isShowMain: true,
      loadingTable: true,
      AccessToken: '',
      PageSize: 10,
      TotalData: undefined,
      PageIndex: 1,
      KeyWords: "", //关键字
      ApplicationId: "", //所属应用id
      ApplicationIdOptions: [],

      FunctionType: "", //功能类别:0-业主,1-维保商功能,2-平台功能，空-全部
      FunctionTypeOptions: OPTS.FUNCTIONTYPEOPTIONS,

      FunctionSort: "", //功能类型:0-基础,1-增值,空-全部
      FunctionSortOptions: OPTS.FUNCTIONSORTOPTIONS,

      IsActive: "", //状态:0-启用,1-停用,空-全部
      IsActiveOptions: OPTS.ISACTIVEOPTIONS,

      tableData: [],

      dialogImageUrl: '',
      dialogVisible: false,

      //新增应用表单入参
      addFunForm: {
        "ParentId": "", //父功能ID
        "FunctionName": "", //功能名称
        "FunctionIcon": "", //功能ICON
        "FunctionUrl": "", //功能url
        "ApplicationId": "", //应用id
        "FunctionType": "", //功能类别  0-业主,1-维保商功能,2-平台功能
        "FunctionSort": "", //功能类型  0-基础,1-增值
        "IsShortcut": "", //是否快捷方式  
        "ShortcutIcon": "", //快捷图标
        "DisplayOrder": "", //序号
        "IsActive": "", //是否启用
        "IsAutoExpand": "", //是否自动展开
        "Description": "", //功能描述
        "OperateSet": {} //操作集
      },

      //新增应用表单的验证规则
      rules: {
        FunctionName: [
          { required: true, message: '功能名称不能为空', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        DisplayOrder: [
          { validator: Vlidator.checkOrd, required: true, trigger: 'change' },
          // { required: true, message: '排序不能为空', trigger: 'blur' },
          // { type: 'number', message: '排序必须为数字', trigger: 'blur' },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        ApplicationId: [
          { required: true, message: '请选择所属应用', trigger: 'change' }
        ],
        FunctionType: [
          { type: 'number', required: true, message: '请选择功能类别', trigger: 'change' }
        ],
        FunctionSort: [
          { type: 'number', required: true, message: '请选择功能类型', trigger: 'change' }
        ],
        IsShortcut: [
          { type: 'number', required: true, message: '请选择功能类型', trigger: 'change' }
        ],
        IsActive: [
          { type: 'number', required: true, message: '请选择功能类型', trigger: 'change' }
        ],
        IsAutoExpand: [
          { type: 'number', required: true, message: '请选择功能类型', trigger: 'change' }
        ],

        Version: [
          { required: true, message: '应用版本不能为空', trigger: 'blur' }
        ]
      },

      dialogFormVisible: false,

      saveFuncUrl: URL.INSERTFUNCTION, //保存功能url
      saveUpdateFuncUrl: URL.UPDATEFUNCTION, //更新功能url
      deleteFuncUrl: URL.DELETEFUNCTION, //删除应用条目url
      getFunctionListUrl: URL.GETFUNCTIONLIST, //查询功能列表接口
      functionlinkageUrl: URL.FUNCTIONLINKAGE, //查询功能列表接口
      queryApplicationUrl: URL.QUERYAPPLICATION, //查找应用条目url
      iconListUrl: URL.ICON, //查找应用条目url
    }
  },
  computed: {
    firstPage() {
      return FUNC.page.firstPage(this.PageIndex, this.PageSize, this.TotalData)
    },
    lastPage() {
      return FUNC.page.lastPage(this.PageIndex, this.PageSize, this.TotalData)
    },
    //上传图片资源时的附加参数
    uploadData() {
      return {
        "AccessToken": this.AccessToken,
        "ResourceType": "4",
        "Title": "应用Logo",
        "Description": "应用Logo"
      }
    },
    //删除图片资源的附加参数
    deleteData() {
      return {
        "AccessToken": this.AccessToken,
        "Parameters": {
          "ResourceId": this.addFunForm.Logo,
          "ResourceType": "4"
        }
      }
    },
    deleteUpdateData() {
      return {
        "AccessToken": this.AccessToken,
        "Parameters": {
          "ResourceId": this.funcEditForm.Logo,
          "ResourceType": "4"
        }
      }
    }
  },
  methods: {
    openAddForm(){
      this.resetForm()
      this.dialogFormVisible = true
      if (this.$refs.ruleForm) {
        this.$refs.ruleForm.resetFields()
      }
    },
    setFunctionIconOpts(IconType = 1) {
      let vm = this
      let data = {
        AccessToken: this.AccessToken,
        Parameters: {
          IconType
        }
      }

      let url = this.iconListUrl
      GET(url,data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)){
            //把图标的数组裁剩14个,是因为后端返回义工30多个图标,但是没有这么多图标图片对应,避免用户选择
            if (IconType == 1) {
              vm.functionIconOpts = res.Data.slice(0,14)
            } else {
              vm.shortcutIconOpts = res.Data.slice(0,14)
              // console.log(res)
            }
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //加载功能父祖列表
    setFunctionlinkage(id = '', type) {
      if (type===''||type===undefined) return false

      let vm = this
      let data = {
        AccessToken: this.AccessToken,
        Parameters: {
          FunctionId: id,
          FunctionType: type
        }
      }
      // console.log()

      let url = this.functionlinkageUrl
      GET(url,data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)){
            vm.functionListPar = res.Data
            vm.addFunForm.ParentId = ''
          }

        })
        .catch(function(error) {
          console.log(error.message)
          // console.log(error.message)
        });
    },

    //多选框
    handleCheckAllChange(event) {
      this.checkedOpts = event.target.checked ? operateOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedOptsChange(value) {
      // console.log(value)
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.opOpts.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.opOpts.length;
    },

    //新增功能中的多选框
    handleCheckAllChangeEdit(event) {
      this.checkedOptsEdit = event.target.checked ? operateOptions : [];
      this.isIndeterminate = false;
    },

    //设置所属应用下拉框选项
    setApplicationIdOptions() {
      let vm = this
      let data = {
        AccessToken: this.AccessToken,
        Parameters: {
          FunctionId: ''
        }
      }
      let url = this.queryApplicationUrl
      GET(url,data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)){
            vm.ApplicationIdOptions = res.Data.Result
            // console.log(vm.ApplicationIdOptions)
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    //删除应用
    deleteConfirm(id) {
      let vm = this
      vm.$confirm('此操作将永久删除该条目, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {
          AccessToken: this.AccessToken,
          Parameters: {
            FunctionId: id
          }
        }
        DELETE(this.deleteFuncUrl, data).then(function(res) {
          // 成功删除后提示用户
          if (res.data.State == 0) {
            vm.$message({
              // type: 'success',
              type: 'info',
              message: '删除成功!'
            });
            vm.tableLoad(undefined, vm.PageIndex)
          }
        })
      })
    },


    //编辑应用
    editFunc(row) {
      this.funcEditForm = { ...row }
      let OperateSet = JSON.parse(this.funcEditForm.OperateSet)
      let setOperateSetArr = FUNC.setOperateSetArr(OperateSet)
      this.checkedOptsEdit = setOperateSetArr

      // console.log(setOperateSetArr)
      this.isShowEdit = true
      // this.$refs.ruleEditForm.validate()
    },


    //更新应用
    saveUpdateFunc() {
      let vm = this
      vm.funcEditForm.OperateSet = FUNC.setOperateSet(vm.checkedOptsEdit)
      let data = {
        AccessToken: vm.AccessToken,
        Parameters: {
          "FunctionId": vm.funcEditForm.FunctionId, //功能ID
          "FunctionName": vm.funcEditForm.FunctionName, //功能名称
          "FunctionIcon": vm.funcEditForm.FunctionIcon, //功能ICON
          "FunctionUrl": vm.funcEditForm.FunctionUrl, //功能url
          "ApplicationId": vm.funcEditForm.ApplicationId, //应用id
          "FunctionType": vm.funcEditForm.FunctionType, //功能类别  0-业主,1-维保商功能,2-平台功能
          "FunctionSort": vm.funcEditForm.FunctionSort, //功能类型  0-基础,1-增值
          "IsShortcut": vm.funcEditForm.IsShortcut, //是否快捷方式  
          "ShortcutIcon": vm.funcEditForm.ShortcutIcon, //快捷图标
          "DisplayOrder": vm.funcEditForm.DisplayOrder, //序号
          "IsActive": vm.funcEditForm.IsActive, //是否启用
          "IsAutoExpand": vm.funcEditForm.IsAutoExpand, //是否自动展开
          "Description": vm.funcEditForm.Description, //功能描述
          "OperateSet": vm.funcEditForm.OperateSet //操作集
        }
      }
      // console.log(data)
      PUT(vm.saveUpdateFuncUrl, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.tableLoad(undefined, vm.PageIndex)
          vm.isShowEdit = false
        }
      })
    },

    //修改表单提交
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证
        if (valid) {
          this.saveUpdateFunc()
        } else {
          return false;
        }
      });
    },

    //查看更多
    seeMore(row) {
      // console.log(row)
      this.isShowMain = false
      this.isShowMore = true
      this.funDetail = row
    },
    //搜索应用名称
    searchFunc() {
      this.tableLoad(this.PageSize, this.PageIndex=1)
    },
    deSearchFunc() {
      FUNC.debounce(this.timeId, this, 'searchFunc')
      // this.tableLoad(this.PageSize, this.PageIndex = 1, this.KeyWord)
    },
    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      KeyWords = this.KeyWords,
      ApplicationId = this.ApplicationId,
      FunctionType = this.FunctionType,
      FunctionSort = this.FunctionSort,
      IsActive = this.IsActive) {
      let vm = this
      vm.loadingTable = true

      let params = {
        "AccessToken": this.AccessToken,
        "PageSize": PageSize,
        "PageIndex": PageIndex,
        'Parameters': {
          'KeyWords': KeyWords,
          'ApplicationId': ApplicationId,
          'FunctionType': FunctionType,
          'FunctionSort': FunctionSort,
          'IsActive': IsActive,
        }
      }
      let url = this.getFunctionListUrl
      GET(url,params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)){
            let dataArr = res.Data
            vm.TotalData = dataArr.Total
            vm.reload(dataArr.Result)
            vm.loadingTable = false
          }          
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    pageIndexChange(val) {
      this.PageIndex = val
      this.tableLoad(this.PageSize, this.PageIndex, this.ApplicationName)
    },
    reload(dataArr) {
      for (let item of dataArr) {
        item.IsActiveDisplay = item.IsActive == 1 ? '启用' : '停用'
        item.IsShortcutDisplay = item.IsShortcut == 1 ? '是' : '否'
        item.IsAutoExpandDisplay = item.IsAutoExpand == 1 ? '是' : '否'
      }
      this.tableData = dataArr
    },

    //控制图片上传的继续添加按钮隐藏和显示
    imgAddUploadShowAndHide(string = '') {
      let el = this.$refs['addUpload'].$el.childNodes[1]
      el.style.display = string;
    },

    //图片上传
    handleSuccess(res) {
      //当提交一张图片后隐藏上传按钮
      this.imgAddUploadShowAndHide('none')
      this.addFunForm.Logo = res.Data[0].ResourceId
    },
    handleRemove(res) {
      //当删除图片后重新显示上传按钮
      let vm = this
      vm.imgAddUploadShowAndHide('')

      // 删除服务器的图片资源
      DELETE(this.deleteImgUrl,this.deleteData).then(function(res) {
        // 成功删除图片后清空Logo url
        if (res.data.State == 0) {
          vm.addFunForm.Logo = ''
        }
      })
    },

    //表单提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //表单验证
        if (valid) {
          this.saveFunc()
        } else {
          return false;
        }
      });
    },
    saveFunc() {
      let vm = this
      vm.addFunForm.OperateSet = FUNC.setOperateSet(vm.checkedOpts)
      let data = {
        AccessToken: vm.AccessToken,
        Parameters: vm.addFunForm
      }
      // console.log(data)
      POST(vm.saveFuncUrl, data).then(function(res) {
        // console.log(res)
        if (res.data.State != 0) {
          vm.warningFromBE(res.data.Message)
          return false
        } else {
          vm.ApplicationName = ''
          vm.tableLoad(undefined,
            vm.PageIndex = 1,
            vm.KeyWords = '',
            vm.ApplicationId = '',
            vm.FunctionType = '',
            vm.FunctionSort = '',
            vm.IsActive = '')
          vm.dialogFormVisible = false
          vm.$message({
            type: 'success',
            message: '增加功能成功!'
          });
        }
      })
    },
    //后台返回保存失败信息
    warningFromBE(message) {
      this.$message({
        showClose: true,
        message: message,
        type: 'warning'
      });
    },
    //清空表单
    resetForm() {
      this.addFunForm.FunctionId = ''
      this.addFunForm.ParentId = ''
      this.addFunForm.FunctionIcon = ''
      this.addFunForm.FunctionUrl = ''
      this.addFunForm.ShortcutIcon = ''
      this.addFunForm.Description = ''
      this.addFunForm.OperateSet = {}
      this.checkedOpts = []
    }


  },
  mounted: function() {
    this.AccessToken = FUNC.storage.get("AccessToken")
    this.setApplicationIdOptions()
    this.setFunctionIconOpts()
    this.setFunctionIconOpts(2)
    this.tableLoad()
    this.isOperate = FUNC.operator.eosOperDataHandle()
    // console.log(this.isOperate)

  }
}

</script>

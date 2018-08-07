// 域名 
// const EOS_URL = "http://api.cleos.com.cn";
const EOS_URL = "http://192.168.16.211";

const EOS_SHOP = "http://shop.cleos.com.cn";
const EOS_APP_API = `${EOS_URL}:2189/`;
	// let EOS_COMMON_API = `${EOS_URL}:8081/`;
const EOS_COMMON_API = `${EOS_URL}:2181/`;
const EOS_IOT_API = `${EOS_URL}:2182/`;
const EOS_OPEN_API = `${EOS_URL}:2183/`;
const EOS_ENTERPRISE_API = `${EOS_URL}:2184/`;
const EOS_REPORTS_API = `${EOS_URL}:2185/`;
const EOS_PLATFORM_API = `${EOS_URL}:2186/`;
const EOS_USER_API = `${EOS_URL}:2187/`;
const EOS_RESOURCES_API = `${EOS_URL}:2188/`;
const EOS_PROJECT_API = `${EOS_URL}:2189/`;



//业务处理
const RESOURCES_API = `${EOS_RESOURCES_API}api/resource/`;
const SYSTEM_API = `${EOS_PLATFORM_API}api/System/`;
const COMMON_API = `${EOS_COMMON_API}api/common/`;
const COMPANY_API = `${EOS_COMMON_API}api/company/`;
const ACCOUNTLOGIN_API = `${EOS_COMMON_API}api/account/`;
const OPERATE_API = `${EOS_PLATFORM_API}api/operate/`;
const BASE_API = `${EOS_PLATFORM_API}api/base/`;
const USER_API = `${EOS_COMMON_API}api/user/`;
const EMPLOYEE_API = `${EOS_COMMON_API}api/employee/`;
const OA_API = `${EOS_APP_API}api/oa/`;
const STATISTIC_API = `${EOS_ENTERPRISE_API}api/Statistic/`;
const LOG_API = `${EOS_ENTERPRISE_API}api/Log/`;
const ATTEND_API = `${EOS_ENTERPRISE_API}api/attendance/`;

const SHOP_USER_API = `${EOS_SHOP}/user.php`;


const PROJECT_API = `${EOS_ENTERPRISE_API}api/project/`;
const EQUIPMENT_API = `${EOS_ENTERPRISE_API}api/equipment/`;
const MESSAGE_API = `${EOS_ENTERPRISE_API}Api/Message/`;
const ACCOUNT_API = `${EOS_ENTERPRISE_API}api/AccountOperation/`;
const POLLING_API = `${EOS_ENTERPRISE_API}api/PollingReport/`; //巡检
const ASSEMBLAGE_API = `${EOS_ENTERPRISE_API}api/Assemblage/`; //场景




export default {
  url: {
    //考勤
    EXPORTSUMMARY: `${ATTEND_API}ExportSummary`, //考勤导出接口（HttpGet）

    //登陆
    LOGIN: `${ACCOUNTLOGIN_API}login`, //帐号登录接口（HttpPost）
    APPLY: `${ACCOUNTLOGIN_API}apply`, //帐号申请接口（HttpPost）
    LOGOUT: `${ACCOUNTLOGIN_API}logout`, //帐号登出接口（HttpPost）
    MENU: `${COMMON_API}menu`, //菜单接口（HttpGet）

    //商城相关接口
    OUTSIDE_REGISTER: `${SHOP_USER_API}?act= outside_register`, //易云维平台注册会员时，需调用该接口将注册的企业和申请人信息同步到电子商城（HttpPost）

    //省市区查询接口
    PROVINCE: `${COMMON_API}province`, //查询省（HttpGet）
    CITY: `${COMMON_API}city`, //查询市（HttpGet）
    DISTRICT: `${COMMON_API}district`, //查询区（HttpGet）

    //首页
    PROJECTSTATISTICS: `${COMMON_API}ProjectStatistics`, //项目统计信息接口（HttpGet）
    EQUIPMENTSTATISTICS: `${COMMON_API}EquipmentStatistics`, //设备统计信息接口（HttpGet）
    EQUIPMENTSTATBYTYPE: `${COMMON_API}EquipmentStatsByType`, //设备统计信息接口(业主)（HttpGet）
    EQUIPMENTSTATBYALARM: `${COMMON_API}EquipmentStatsByAlarm`, //设备统计信息接口(维保方) （HttpGet）

    QUERYHOMEMAPPROJECTS: `${PROJECT_API}QueryHomeMapProjects`, //项目列表--首页地图（HttpGet）
    INDUSTRY: `${COMMON_API}industry`, //查询所属行业列表(下拉框) （HttpGet）
    COUNTTENANT: `${OPERATE_API}CountTenant`, //客户(会员)统计--首页（HttpGet）
    HOMEEQUIPMENTCOUNTBYTYPE: `${COMMON_API}HomeEquipmentCountByType`, //按设备类型统计—地图首页（HttpGet）
    QUERYHOMEPROJECTINDUSTRY: `${PROJECT_API}QueryHomeProjectIndustry`, //项目行业统计列表--首页地图（HttpGet）
    QUERYAPPPLATFORMINDEX: `${COMMON_API}QueryAppPlatformIndex`, //平台首页统计（HttpGet）

    //首页统计
    STATISTICSREGION: `${STATISTIC_API}StatisticsRegion`, //地区项目设备数量统计（HttpGet）http://192.168.16.211:8888/index.php?s=/7&page_id=105
    STATISTICSINDUSTRY: `${STATISTIC_API}StatisticsIndustry`, //行业项目设备数量统计（HttpGet）http://192.168.16.211:8888/index.php?s=/7&page_id=105
    STATISTICSNEWLYADD: `${STATISTIC_API}StatisticsNewlyAdd`, //新增信息统计（HttpGet）http://192.168.16.211:8888/index.php?s=/7&page_id=105
    STATISTICSEQUIPMENTSTATE: `${STATISTIC_API}StatisticsEquipmentState`, //设备状态统计（HttpGet）http://192.168.16.211:8888/index.php?s=/7&page_id=105
    STATISTICWORKORDER: `${STATISTIC_API}StatisticWorkOrder`, //工单数统计（HttpGet）http://192.168.16.211:8888/index.php?s=/7&page_id=105
    STATISTICSMIANTPLAN: `${STATISTIC_API}StatisticsMiantPlan`, //维保计划统计（HttpGet）http://192.168.16.211:8888/index.php?s=/7&page_id=105
    
    //日志查询
    QUERYPROJECTACTIVITYLOG: `${LOG_API}QueryProjectActivityLog`, //项目活动查询接口（HttpGet）
    QUERYPROJECTEVENTLOG: `${LOG_API}QueryProjectEventLog`, //项目活动查询接口（HttpGet）
    QUERYEVENT: `${LOG_API}QueryEvent`, //设备事件查询接口（HttpGet）
    QUERYOPERATELOG: `${LOG_API}queryOperatelog`, //登录日志、操作日志查询接口（HttpGet）
    
    //企业信息
    QUERYCOMPANYINFO: `${COMPANY_API}queryCompanyInfo`, //获取企业信息接口（Http+Get）
    APPLYMODIFYCOMMANYINFO: `${COMPANY_API}ApplyModifyCommanyInfo`, //申请修改企业信息（HttpPut）
    BECOMEFORMALUSE: `${COMPANY_API}BecomeFormalUse`, //申请正式会员（HttpPut）
    MODIFYCOMPANYINFO: `${COMPANY_API}modifyCompanyInfo`, //试用会员修改企业信息（HttpPut）
    CHANGECOMPANYTYPE: `${COMPANY_API}ChangeCompanyType`, //试用会员修改企业信息（HttpPost）

    //应用相关
    QUERYAPPLICATION: `${SYSTEM_API}QueryApplication`, //查找应用条目
    INSERTAPPLICATION: `${SYSTEM_API}InsertApplication`, //保存应用
    UPDATEAPPLICATION: `${SYSTEM_API}UpdateApplication`, //更新应用
    DELETEAPPLICATION: `${SYSTEM_API}DeleteApplication`, //删除应用条目
    
    //功能相关
    GETFUNCTIONLIST: `${SYSTEM_API}GetFunctionList`, //查询功能列表
    INSERTFUNCTION: `${SYSTEM_API}InsertFunction`, //保存功能
    UPDATEFUNCTION: `${SYSTEM_API}UpdateFunction`, //更新功能
    DELETEFUNCTION: `${SYSTEM_API}DeleteFunction`, //删除功能条目
    FUNCTIONLINKAGE: `${SYSTEM_API}FunctionLinkage`, //查询父级所属目录名称

    ICON: `${COMMON_API}icon`, //查询图标

    //客户列表相关
    GETTENANTLIST: `${OPERATE_API}GetTenantList`, //客户列表查询
    QUERYTENANTINFO: `${OPERATE_API}querytenantinfo`, //查询客户详细信息
    GETTENANTMANGERACCOUNT: `${OPERATE_API}GetTenantMangerAccount`, //获取客户的企业管理员帐号
    RESETTMACCOUNTPASSWORD: `${OPERATE_API}ResetTMAccountPassWord`, //重置客户管理员帐号密码
    UPDATETENANTCONTRACTINFO: `${OPERATE_API}UpdateTenantContractInfo`, //修改与客户的合同信息
    UPDATETENANTAPPLYPERSONINFO: `${OPERATE_API}UpdateTenantApplyPersonInfo`, //修改与客户信息

    UPDATETENANTAPPLYPERSONINFO: `${OPERATE_API}UpdateTenantApplyPersonInfo`, //修改客户的申请人信息
    LOCKTENANT: `${OPERATE_API}LockTenant`, //锁定客户
    EXTENDEDPROBATIONARYPERIODS: `${COMPANY_API}extendedprobationaryperiods`, //延长试用期申请
    EXPORTTENANTLIST: `${OPERATE_API}ExportTenantList`, //客户列表导出EXCEL数据（HttpGet）
    QUERYUSER: `${USER_API}queryuser`, //客户列表导出EXCEL数据（HttpGet）
    
    //项目
    INSERT: `${PROJECT_API}Insert`, //创建项目（HttpPost）http://192.168.16.211:8888/index.php?s=/7&page_id=93
    UPDATE: `${PROJECT_API}Update`, //更新项目基本信息（HttpPost）http://192.168.16.211:8888/index.php?s=/7&page_id=93
    SCANLINKCODE: `${PROJECT_API}ScanLinkCode`, //扫码（HttpPost）http://192.168.16.211:8888/index.php?s=/7&page_id=93
    EXPORTPROJECTINFO: `${PROJECT_API}ExportProjectInfo`, //导出项目信息（HttpGet）
    GETHAVEACCOUNTEMPLOYEE: `${EMPLOYEE_API}GetHaveAccountEmployee`, //获取有账号员工（HttpGet）

    //客户服务记录相关
    GETTENANTSERVICEHISTORY: `${OPERATE_API}GetTenantServiceHistory`, //查询客户的服务记录
    GETPROJECTSERVICEHISTORY: `${OPERATE_API}GetProjectServiceHistory`, //查询客户的项目服务记录

    //客户功能列表
    GETTENANTFUNCTIONLIST: `${OPERATE_API}GetTenantFunctionList`, //查询客户功能列表,包括过期和未过期的
    GETTENANTUNUSEDFUNCTIONLIST: `${OPERATE_API}GetTenantUnusedFunctionList`, //获取客户未使用的功能模块
    INSERTTENANTFUNCTION: `${OPERATE_API}InsertTenantFunction`, //添加客户的功能
    UPDATETENANTFUNCTION: `${OPERATE_API}UpdateTenantFunction`, //修改客户的功能
    DELETETENANTFUNCTION: `${OPERATE_API}DeleteTenantFunction`, //删除客户的功能

    //基础设置相关
    GETBASESETINFO: `${OPERATE_API}GetBaseSetInfo`, //获取基础设置信息
    UPDATEBASESETINFO: `${OPERATE_API}UpdateBaseSetInfo`, //修改基础设置信息
    GETRUNSTATEKEYWORDS: `${OPERATE_API}GetRunStateKeyWords`, //查询已配置的运行状态关键字
    GETRUNSTATEOPTION: `${OPERATE_API}GetRunStateOption`, //查询待配置的运行状态关键字
    ADDRUNSTATEKEYWORDS: `${OPERATE_API}AddRunStateKeyWords`, //添加运行状态关键字
    
    //资源相关
    UPLOADRESOURCE: `${RESOURCES_API}upload`, //上传小文件
    DELETERESOURCE: `${RESOURCES_API}delete`, //删除小文件
    UPLOADGRIDFS: `${RESOURCES_API}UploadGridFS`, //上传大文件（HttpPost）
    DELETEGRIDFS: `${RESOURCES_API}DeleteGridFS`, //删除大文件（HttpPost）

    //服务管理
    SERVICES: `${PROJECT_API}services`, //查询服务条目
    SERVICEORDERDETAIL: `${PROJECT_API}ServiceOrderDetail`, //服务详情
    CONFIRMSERVICE: `${PROJECT_API}ConfirmService`, //服务确认
    EVALUATIONSERVICE: `${PROJECT_API}EvaluationService`, //服务评价
    ORGANIZATION: `${COMMON_API}organization`, //获取服务人员列表
    INSERTSERVICEORDER: `${PROJECT_API}ServiceOrder`, //新增服务条目

    //服务报告
    QUERYPROJECTREPORT: `${PROJECT_API}QueryProjectReport`, //服务报告列表
    UPLOADPROJECTREPORT: `${PROJECT_API}UploadProjectReport`, //新增服务报告
    DELETEPROJECTREPORT: `${PROJECT_API}DeleteProjectReport`, //删除服务报告

    //预警告警
    QUERYFAULT: `${EQUIPMENT_API}QueryFault`, //预警告警列表
    QUERYFAULTHISTORY: `${EQUIPMENT_API}QueryFaultHistory`, //预警告警列表已复位记录
    
    PROJECT: `${COMMON_API}project`, //获取项目列表(下拉框)
    EQUIPMENT: `${COMMON_API}equipment`, //获取设备列表(下拉框)
    FAULTRESET: `${EQUIPMENT_API}faultreset`, //复位设备(PUT)
    FAULTDETAIL: `${EQUIPMENT_API}FaultDetail`, //预警告警详情
    ALARMWORKORDER: `${PROJECT_API}AlarmWorkOrder`, //新增告警类工单（HttpPost）


    //审核认证
    MESSAGEQUERY: `${MESSAGE_API}Query`, //获取审核认证列表
    MESSAGEADUIT: `${MESSAGE_API}MessageAduit`, //审核或拒绝认证
    QUERYMODIFYCOMPANY: `${OPERATE_API}QueryModifyCompany`, //待审核的客户信息（HttpGet）
    

    //能耗管理
    QUERYEQUIPMENTLIST: `${EQUIPMENT_API}QueryCommonEquipmentList`, //获取设备列表
    EQUIPMENTDETAIL: `${EQUIPMENT_API}Detail`, //获取设备详情
    GETALLCOMPANY: `${COMPANY_API}GetAllCompany`, //获取业主下拉列表
    EQUIPMENTLIST: `${EQUIPMENT_API}QueryEquipmentList`, //获取设备列表
    
    //项目列表
    PROJECTQUERY: `${PROJECT_API}Query`, //获取项目列表
    PROJECTDELETE: `${PROJECT_API}delete`, //删除项目
    GETCOMPANYUSER: `${ACCOUNT_API}GetCompanyUser`, //获取维保人或负责人列表(项目列表筛选项)
    GETTARGETCOMPANY: `${PROJECT_API}GetTargetCompany`, //获取企业列表(项目列表筛选项)
    LOCKPROJECT: `${PROJECT_API}LockProject`, //锁定or解锁项目
    QUERYDETAIL: `${PROJECT_API}QueryDetail`, //查询项目详情

    //工单
    WORKORDER: `${PROJECT_API}WorkOrder`, //创建工单
    QUERYWORKORDEREXECUTOR: `${OA_API}QueryWorkOrderExecutor`, //获取负责人列表
    QUERYWORKORDERPARTICIPANTS: `${PROJECT_API}QueryWorkOrderParticipants`, //获取协助人列表

    //设备数据
    EXPORTHISTORIC: `${EQUIPMENT_API}ExportHistoric`, //EXCEL表格形式导出所有设备节点数据
    QUERYDATA: `${EQUIPMENT_API}QueryData`, //获取设备节点数据列表
    QUERYDISPLAYNAME: `${EQUIPMENT_API}QueryDisPlayName`, //获取设备节点
    EQUIPMENTPROTOCAL: `${EQUIPMENT_API}GetEquipmentProtocal`, //获取协议列表
    EQUIPMENTDATATYPE: `${EQUIPMENT_API}GetEquipmentDataType`, //获取数据类型列表
    GETEQUIPMENTTYPE: `${EQUIPMENT_API}GetEquipmentType`, //获取设备类型列表
    EQUIPMENTCONFIGDATA: `${EQUIPMENT_API}GetEquipmentConfigData`, //获取设备设置数据（Get）
    SETEQUIPMENTDATACONFIG: `${EQUIPMENT_API}SetEquipmentDataConfig`, //设置设备数据配置（Post）
    QUERYEQUIPMENTSTATUS: `${EQUIPMENT_API}QueryEquipmentStatus`, //设备实时状态接口（Get）
    RUNNING: `${EQUIPMENT_API}Running`, //获取设备实时数据（Get）
    QUERYPROJECTGATEWAY: `${EQUIPMENT_API}QueryProjectGateway`, //查询项目下的网关（HttpGet）
    EQUIPMENTDELETE: `${EQUIPMENT_API}delete`, //查询项目下的网关（HttpGet）
    QUERYSTATPROTOCOL: `${EQUIPMENT_API}QueryStatProtocol`, //查询设备下的注册节点（HttpGet）
    QUERYEQUIPMENTRUNDATA: `${EQUIPMENT_API}QueryEquipmentRunData`, //查询设备下节点数据（HttpGet）
    EXPORTEQUIPMENTINFO: `${PROJECT_API}ExportEquipmentInfo`, //导出设备列表
    CLEAREINFOINGATEWAY: `${EQUIPMENT_API}ClearEInfoInGateway`, //下发设备信息清除指令

    //巡检相关
    SETPOLLINGMODULE: `${POLLING_API}SetPollingModule`, //设置巡检模板[post]
    GETPOLLINGMODULELIST: `${POLLING_API}GetPollingModuleList`, //巡检模板列表[get]
    GETPOLLINGREPORTLIST: `${POLLING_API}GetPollingReportList`, //获取巡检报告列表[get]
    GETPOLLINGREPORT: `${POLLING_API}GetPollingReport`, //获取设备巡检配置信息[get]
    EQUIPMENTCLASSINFO: `${EQUIPMENT_API}EquipmentClassInfo`, //获取设备型号数据[get]
    CREATEPOLLINGREPORT: `${POLLING_API}CreatePollingReport`, //创建巡检报告[post]
    GETPOLLINGMODULEINFO: `${POLLING_API}GetPollingModuleInfo`, //获取巡检模板下拉项[get]
    GETMODULEKEYINFO: `${POLLING_API}GetModuleKeyInfo`, //获取Excel模板Key信息[get]
    QUERYWORKPROTOCL: `${EQUIPMENT_API}QueryWorkProtocl`, //获取协议地址列表[get]
    SETPOLLINGREPORT: `${POLLING_API}SetPollingReport`, //设置设备巡检配置信息[post]
    GETPOLLINGMODULEHTML: `${POLLING_API}GetPollingModuleHtml`, //获取巡检模板HTML[Get]
    GETPOLLINGREPORTHTML: `${POLLING_API}GetPollingReportHtml`, //获取巡检带内容的模板HTML[Get]
    SETPOLLINGREPORTSTATUS: `${POLLING_API}GetPollingModuleHtml`, //修改巡检报告状态[Post]
    DELETEPOLLINGREPORT: `${POLLING_API}DeletePollingReport`, //删除巡检报告[Post]
    DELETEPOLLINGREPORTMODULE: `${POLLING_API}DeletePollingReportModule`, //删除巡检报告模板[Post]
    DELETEPOLLINGREPORTCONFIG: `${POLLING_API}DeletePollingReportConfig`, //删除巡检报告模板关联设备[Post]
    EXPORTPOLLINGREPORT: `${POLLING_API}ExportPollingReport`, //删除巡检报告模板关联设备[Post]
    




    // 网关管理
    QUERYGATEWAYCOMPANY: `${BASE_API}QueryGatewayCompany`, //查询运行网关所在的企业列表（HttpGet）
    QUERYRUNNINGGATEWAY: `${BASE_API}QueryRunningGateway`, //查询升级网关列表（HttpGet）
    QUERYGATEWAYVN: `${BASE_API}QueryGatewayVN`, //查询网关型号下的版本号（HttpGet）
    QUERYPENDINGGATEWAY: `${BASE_API}QueryPendingGateway`, //查询待升级网关列表（HttpGet）
    QUERYGATEWAYPROGRAM: `${BASE_API}QueryGatewayProgram`, //查询版本管理列表（HttpGet）
    DELGATEWAYPROGRAM: `${BASE_API}DelGatewayProgram`, //删除网关版本（HttpDelete）
    INSERTGATEWAYPROGRAM: `${BASE_API}InsertGatewayProgram`, //发布网关（HttpPost）
    UPDATEGATEWAYPROGRAM: `${BASE_API}UpdateGatewayProgram`, //修改网关版本（HttpPost）
    UPDATEGATEWAYUPGRADEWAY: `${BASE_API}UpdateGatewayUpgradeWay`, //修改网关升级方式（HttpPut）
    SETGATEWAYUPGRADE: `${BASE_API}SetGatewayUpgrade`, //设置网关升级（HttpPut）
    DeleteGatewayMQ: `${BASE_API}DeleteGatewayMQ`, //取消待升级的网关（HttpDelete）
    
    // 场景
    GETASSEMBLAGEUNBINDEQUIPMENT: `${ASSEMBLAGE_API}GetAssemblageUnbindEquipment`, //查询未绑定的设备[Get]
    QUERYASSEMBLAGEEQUIPMENT: `${ASSEMBLAGE_API}QueryAssemblageEquipment`, //查询项目下已绑定及未绑定的设备[Get]
    GETASSEMBLAGEHOMEINFO: `${ASSEMBLAGE_API}GetAssemblageHomeInfo`, //首页对象列表[Get]
    GETASSEMBLAGEALARAMINFO: `${ASSEMBLAGE_API}GetassemblageAlaramInfo`, //业主首页报警列表[Get]
    STATISTICASSEMBLAGEEQUIPMENT: `${STATISTIC_API}StatisticAssemblageEquipment`, //业主首页设备信息统计[Get]
    QUERYASSEMBLAGEMAINDATA: `${ASSEMBLAGE_API}QueryAssemblageMainData`, //查询重点数据[Get]
    GETASSEMBLAGERELATEDEQUIPMENT: `${ASSEMBLAGE_API}GetAssemblageRelatedEquipment`, //查询对象下已绑定设备[Get]

    
  },

  //下拉框或多选框选项
  options: {
    //网关管理

    //程序类型，kernel-内核程序;apps-应用程序;web-Web程序;shellscript-脚本程序
    PROGRAMTYPOPTIONS: [{
      label: '内核程序',
      value: 'kernel'
    }, {
      label: '应用程序',
      value: 'apps'
    }, {
      label: 'Web程序',
      value: 'web'
    }, {
      label: '脚本程序',
      value: 'shellscript'
    }],

    //网关型号: 1-EOS100; 2-EOS200; 3-EOS300
    GATEWAYMODELOPTIONS: [{
      label: 'EOS100',
      value: '1'
    }, {
      label: 'EOS200',
      value: '2'
    }, {
      label: 'EOS300',
      value: '3'
    }],

    //升级方式: 0-统一;1-指定
    UPGRADEWAYOPTIONS: [{
      label: '统一',
      value: '0'
    }, {
      label: '指定',
      value: '1'
    }],

    //锁定状态
    LOCKTYPEOPTS: [{
      label: '全部锁定状态',
      value: ''
    },{
      label: '非锁定',
      value: '0'
    }, {
      label: '锁定',
      value: '1'
    }],

    //运行状态
    RUNSTATUSOPTIONS: [{
      label: '未知',
      value: 0
    }, {
      label: '运行',
      value: 1
    }, {
      label: '停机',
      value: 2
    }],

    //在线状态 -1为全部
    ONLINESTATUSOPTIONS: [{
      label: '离线',
      value: 0
    }, {
      label: '在线',
      value: 1
    }],

    //服务状态
    SIGNEDSTATEOPTIONS: [{
      label: '未确认',
      value: 0
    }, {
      label: '已确认',
      value: 1
    }],

    //服务状态
    SERVICESTATEOPTIONS: [{
      label: '未完成',
      value: 1
    }, {
      label: '已完成',
      value: 3
    }],

    //服务类型
    SERVICETYPEOPTIONS: [{
      label: '调试',
      value: 1
    }, {
      label: '保修',
      value: 2
    }, {
      label: '保养',
      value: 3
    }, {
      label: '维修',
      value: 4
    }, {
      label: '故障',
      value: 6
    }, {
      label: '其它',
      value: 5
    }],

    //状态(审核认证页)（空：全部；0-待回复;1-同意;2-拒绝）
    CERTIFICATIONSTATUSOPTIONS: [{
      label: '待审核',
      value: 0
    }, {
      label: '同意',
      value: 1
    }, {
      label: '拒绝',
      value: 2
    }],

    //0：我的申请(申请方) 1：我的审核(审核方) 其他情况：全部
    ISADUITCOMPANYOPTIONS: [{
      label: '我的申请',
      value: 0
    }, {
      label: '我的审核',
      value: 1
    }],

    //消息业务类型(审核认证页)必填，1-申请正式账号;2-确认关联码绑定;
    BUSSINESSTYPEOPTIONS: [{
      label: '账号申请',
      value: 1
    }, {
      label: '关联码',
      value: 2
    }, {
      label: '信息修改',
      value: 3
    }],

    //报警级别:1-提醒;2-警告;3-报警(严重) 0或传空-全部。
    LEVELOPTIONS: [{
      label: '提醒',
      value: 1
    }, {
      label: '警告',
      value: 2
    }, {
      label: '报警(严重)',
      value: 3
    }, {
      label: '警告及报警',
      value: 4
    }],

    //报警等级(运行状态)
    ALARMTYPEOPTS: [{
      label: '全部运行状态',
      value: ''
    }, {
      label: '正常',
      value: '0'
    }, {
      label: '提醒',
      value: '1'
    }, {
      label: '警告',
      value: '2'
    }, {
      label: '报警',
      value: '3'
    }, {
      label: '所有异常',
      value: '4'
    }],

    //复位状态：0-未复位 1-已复位 空-全部
    RESETSTATUSOPTIONS: [{
      label: '未复位',
      value: 0
    }, {
      label: '已复位',
      value: 1
    }],

    //客户类别：0-业主，1-维保商，空-全部
    ENTITYSORTOPTIONS: [{
      label: '业主',
      value: 0
    }, {
      label: '维保商',
      value: 1
    }],

    //客户类型：0-试用，1-正式，空-全部
    ENTITYCLASSOPTIONS: [{
      label: '试用会员',
      value: 0
    }, {
      label: '正式会员',
      value: 1
    }],    

    //功能类别:0-业主,1-维保商功能,2-平台功能，空-全部
    FUNCTIONTYPEOPTIONS: [{
      label: '业主',
      value: 0
    }, {
      label: '维保商功能',
      value: 1
    }, {
      label: '平台功能',
      value: 2
    }],

    //功能类型:0-基础,1-增值,空-全部
    FUNCTIONSORTOPTIONS: [{
      label: '基础',
      value: 0
    }, {
      label: '增值',
      value: 1
    }],

    //状态:0-启用,1-停用,空-全部
    ISACTIVEOPTIONS: [{
      label: '启用',
      value: 0
    }, {
      label: '停用',
      value: 1
    }],
    
    /* /api/equipment/QueryEquipmentRunData所用的参数 */
    /* 入参单位 */
    QUERYTIMETYPEOPTIONS: [{
      label: '分',
      value: -1
    },{
      label: '时',
      value: 0
    }, {
      label: '天',
      value: 1
    }, {
      label: '月',
      value: 2
    }],

    //报表类型: 空-全部
    REPORTTYPEOPTIONS: [{
      label: '月报',
      value: '1'
    }, {
      label: '季报',
      value: '2'
    }, {
      label: '年报',
      value: '3'
    }],

    //操作多选框(功能管理)
    FUNC_OPERATEOPTIONS:['新增','删除','编辑','查询','打印','导出','导入','刷新','审核','复制','下发','下载','取消','派发','上传']

  },
  style:{
    onlineStatusLable:{
      style0:{
        backgroundColor:'#2ECC71'
      },
      style1:{
        backgroundColor:'#8492A6'
      }
    },
    alarmLevelLable:{
      style0:{
        backgroundColor:'#2ECC71'
      },
      style1:{
        backgroundColor:'#3498DB'
      },
      style2:{
        backgroundColor:'#F1C40F'
      },
      style3:{
        backgroundColor:'#E74C3C'
      }
    },
    alarmLevelText:{
      style1:{
        color:'#3798D4'
      },
      style2:{
        color:'#F1C40F'
      },
      style3:{
        color:'#E74C3C'
      }
    },    
    resetStatusLable:{
      style0:{
        backgroundColor:'#337ab7'
      },
      style1:{
        backgroundColor:'#5cb85c'
      }
    },

  },
  configDataUnitDefault:{
      "ProtocalAddress": "",
      "DataType": "",
      "FirstColor": '#3498DB',
      "FirstUpper": 0,
      "FirstFloor": 20,
      "SecondColor": '#2ECC71',
      "SecondUpper": 20,
      "SecondFloor": 30,
      "ThridColor": '#F1C40F',
      "ThridUpper": 30,
      "ThridFloor": 40,
      "FourthColor": '#E74C3C',
      "FourthUpper": 40,
      "FourthFloor": 50
  }
}

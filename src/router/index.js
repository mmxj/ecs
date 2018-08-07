import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export default new Router({
	//mode:'history',
	routes: [{
			path: '/ecos',
			component: resolve => require(['../components/common/home.vue'], resolve),
			children: [
				//个人信息
				{
					path: 'index',
					component: resolve => require(['../components/page/loading.vue'], resolve)
				},
				{
					name: 'information',
					path: 'information',
					component: resolve => require(['../components/page/user/infomation.vue'], resolve)
				},
				{
					//首页
					name: 'sm_index',
					path: 'sm_index',
					component: resolve => require(['../components/page/map.vue'], resolve)
				},
				// 企业信息
				{
					path: 'company_infomation',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/company_infomation.vue'], resolve)
				},				
				//工单详情
				{
					name: 'work_order_details',
					path: 'worke_order_details/:orderinfos',
					component: resolve => require(['../components/common/work_order_details.vue'], resolve)
				},
				// 测试
				{	name:'sm_3d',
					path: 'sm_3d',
//					component: resolve => require(['../components/page/3d.vue'], resolve)
					component: resolve => require(['../components/page/user/infomation_test.vue'], resolve)
				},
				// demo
				{
					path: 'demo',
					component: resolve => require(['../components/page/demo.vue'], resolve)
				},
				////运营平台
				//..运营管理..
				{
					//审核认证
					path: 'sm_certification',
					component: resolve => require(['../components/page/maintenanceAgent/certification.vue'], resolve)
				},
				{
					////项目列表
					name:'sm_items_manage',
					path: 'item_lists',
					component: resolve => require(['../components/page/platforms/operationManage/item_lists.vue'], resolve)
				},
				{
					//测试项目列表
					name: 'sm_project_list',
					path: 'project_list',
					component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/project/project_list.vue'], resolve),
					children: [
						{ //项目详情
							name: 'sm_project_detail',
							path: 'project_detail/:ProjectId',
							component: resolve => require(['../components/page/platforms/operationManage/common/projectDetail.vue'], resolve)
						}
						,
						{
							//设备管理
							name: 'sm_equipment_detail_infos',
							path: 'equipment_detail_infos',
							component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/equipment/equipment_detail_infos.vue'], resolve)
						}
					]

				},
				{
					//客户列表
					name: 'sm_customer',
					path: 'sm_customer',
					component: resolve => require(['../components/page/platforms/operationManage/customer.vue'], resolve)
				},
				{
					//客户功能管理
					path: 'sm_customer_function',
					component: resolve => require(['../components/page/platforms/operationManage/customer_function.vue'], resolve)
				},
				{
					//客户功能管理
					name: 'sm_customer_account',
					path: 'sm_customer_account',
					component: resolve => require(['../components/page/platforms/operationManage/customer_account.vue'], resolve)
				},
				{
					//基础设置
					path: 'sm_basic_settings',
					component: resolve => require(['../components/page/platforms/operationManage/basic_settings.vue'], resolve)
				},
				{
					//平台公告
					path: 'system_notice',
					component: resolve => require(['../components/page/platforms/operationManage/system_notice.vue'], resolve)
				},
				{
					//远程控制设置
					path: 'sm_remoteSetting',
					component: resolve => require(['../components/page/platforms/operationManage/remoteSetting.vue'], resolve)
				},
				//..基础数据管理..
				{
					////项目列表
					name:'polling_setting',
					path: 'polling_setting',
					component: resolve => require(['../components/page/platforms/operationManage/polling_setting.vue'], resolve)
				},
				{
					//设备类别
					path: 'equipment_class',
					component: resolve => require(['../components/page/platforms/basicDataManage/equipment_class.vue'], resolve)
				},
				{
					//设备图库
					path: 'device_pic',
					component: resolve => require(['../components/page/platforms/basicDataManage/device_pic.vue'], resolve)
					//component: resolve => require(['../components/page/platforms/basicDataManage/scene_pic.vue'], resolve)
//					component: resolve => require(['../components/page/platforms/basicDataManage/device_pic_view.vue'], resolve)
				},
				{
					//场景图库
					name: 'scene_pic',
					path: 'scene_pic',
//					component: resolve => require(['../components/page/platforms/basicDataManage/device_pic.vue'], resolve)
					component: resolve => require(['../components/page/platforms/basicDataManage/scene_pic.vue'], resolve)
//					component: resolve => require(['../components/page/platforms/basicDataManage/device_pic_view.vue'], resolve)
				},
				{
					//标准设备库
					path: 'device_info',
					component: resolve => require(['../components/page/platforms/basicDataManage/device_info.vue'], resolve)
				},
				{
					//品牌管理
					path: 'brand',
					component: resolve => require(['../components/page/platforms/basicDataManage/brand.vue'], resolve)
				},
				{
					//行业管理
					path: 'industry',
					component: resolve => require(['../components/page/platforms/basicDataManage/industry.vue'], resolve)
				},
				{
					//SIM卡管理
					path: 'sim',
					component: resolve => require(['../components/page/platforms/basicDataManage/sim.vue'], resolve)
				},

				//..平台管理..
				//网关管理
				{
					//网关入库
					path: 'gateway_stock',
					component: resolve => require(['../components/page/platforms/basicDataManage/gateway_stock.vue'], resolve)
				},
				{
					//网关发行
					path: 'gateway_issued',
					component: resolve => require(['../components/page/platforms/basicDataManage/gateway_issued.vue'], resolve)
				},
				{
					//网关升级
					path: 'gateway_update',
					component: resolve => require(['../components/page/platforms/gatewayManage/gateway_update.vue'], resolve)
				},
				{
					//版本管理
					path: 'gateway_version_manage',
					component: resolve => require(['../components/page/platforms/gatewayManage/gateway_versionManage.vue'], resolve)
				},

				{
					//账号管理
					path: 'sm_account',
					component: resolve => require(['../components/page/maintenanceAgent/accountManage/account.vue'], resolve)
				},
				{
					//角色管理
					path: 'sm_role',
					component: resolve => require(['../components/page/maintenanceAgent/accountManage/role.vue'], resolve)
				},
				//..系统管理..
				{
					//功能管理
					path: 'sm_function',
					component: resolve => require(['../components/page/platforms/systemManage/function.vue'], resolve)
				},
				{
					//应用管理
					path: 'sm_application',
					component: resolve => require(['../components/page/platforms/systemManage/application.vue'], resolve)
				},

				{
					//系统日志
					path: 'sm_system_log',
					component: resolve => require(['../components/page/platforms/systemManage/system_log.vue'], resolve)
				},
				{
					//意见反馈
					path: 'feedback',
					component: resolve => require(['../components/page/platforms/systemManage/feedback.vue'], resolve)
				},
				//企业管理
				
				{
					//组织架构
					path: 'sm_organizational',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/organizational.vue'], resolve)
				},
				{
					//员工管理
					path: 'sm_employee',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/employee.vue'], resolve)
				},
				{
					//项目报表
					name:'sm_project_report',
					path: 'sm_project_report',
					component: resolve => require(['../components/page/platforms/project_report.vue'], resolve)
				},
				{
					//平台预警告警列表
					name: 'sm_warning_lists',
					path: 'sm_warning_lists',
					component: resolve => require(['../components/page/owner/items/warning_lists.vue'], resolve)
				},
				{
					//日志查询
					// name:'sm_equipmet_lists',
					path:'log_list',
					component: resolve => require(['../components/page/common/log_list/index.vue'], resolve)
				},
				{
					//平台设备管理
					name:'sm_equipmet_lists',
					path:'sm_equipmet_lists',//energy_manage
					// component: resolve => require(['../components/page/owner/items/n_energy_manage.vue'], resolve)
					component: resolve => require(['../components/page/common/equipmet_list.vue'], resolve)
				},
				////维保方				
				//..首页..
				{
					//首页
					name: 'wb_index',
					path: 'wb_index',
					component: resolve => require(['../components/page/map.vue'], resolve)
				},
				//..我的项目..
				{
					//项目管理,
					name: 'wb_items_manage',
					path: 'wb_items_manage',
					component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/project/project_list.vue'], resolve),
					children: [
						{ //项目详情
							name: 'wb_project_detail',
							path: 'project_detail/:ProjectId',
							component: resolve => require(['../components/page/platforms/operationManage/common/projectDetail.vue'], resolve)							
						},
						{
							//设备管理
							name: 'wb_equipment_detail_infos',
							path: 'equipment_detail_infos',
							component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/equipment/equipment_detail_infos.vue'], resolve)
						},

						
					]
				},
				{
					//设备管理
					name: 'wb_equipment_detail_infos',
					path: 'equipment_detail_infos',
					component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/equipment/equipment_detail_infos.vue'], resolve)
				},
				
				
				{ //编辑项目
					name: 'wb_items_edit',
					path: 'wb_items_edit/:itemInfo',
					component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/project/editProject.vue'], resolve)
				},
				{ //项目详情
					name: 'item_detail',
					path: 'item_detail/:ProjectId',
					component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/equipment/item_detail.vue'], resolve)
				},
				{
					//设备管理
					name: 'wb_equipments_manage',
					path: 'equipments_manage/:type',
					// component: resolve => require(['../components/page/owner/items/n_energy_manage.vue'], resolve)
					component: resolve => require(['../components/page/common/equipmet_list.vue'], resolve)
				},
				{
					//设备详情
					name: 'equipment_detail',
					path: 'equipment_detail/:EquipmentId',
					component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/equipment/equipment_detail.vue'], resolve)
				},
				//
				{
					//调试设备列表
					name: 'equipments_info',
					path: 'equipments_info',
					component: resolve => require(['../components/page/maintenanceAgent/items/common/t_equipments_info.vue'], resolve)
				},
//				{
//					//设备管理
//					name: 'equipment_detail_infos',
//					path: 'equipment_detail_infos',
//					component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/equipment/equipment_detail_infos.vue'], resolve)
//				},
				{
					//工单管理
					name: 'wb_work_order',
					path: 'work_order',
					component: resolve => require(['../components/page/maintenanceAgent/items/work_order.vue'], resolve)
				}, {
					//服务管理
					name: 'wb_service_manage',
					path: 'service_manage',
					component: resolve => require(['../components/page/owner/items/service_manage.vue'], resolve)
				}, {
					//预警告警列表
					name: 'warning_lists',
					path: 'warning_lists',
					component: resolve => require(['../components/page/owner/items/warning_lists.vue'], resolve)
				},
				{
					//项目档案
					name:'wb_project_file',
					path: 'wb_project_file',
					component: resolve => require(['../components/page/maintenanceAgent/items/project_file.vue'], resolve)
				},
				{
					//费用成本
					name:'wb_pro_expense',
					path: 'wb_pro_expense',
					component: resolve => require(['../components/page/maintenanceAgent/items/expense.vue'], resolve)
				},
				
               //..我的企业..
				{
					//企业信息
					path: 'wb_enterprise_info',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/company_infomation.vue'], resolve)
				},
				{
					//组织架构
					path: 'wb_organizational',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/organizational.vue'], resolve)
				},
				{
					//员工管理
					path: 'wb_employee',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/employee.vue'], resolve)
				},
				{
					//企业公告
					path: 'wb_company_notice',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/company_notice.vue'], resolve)
				},
				{
					//考勤统计
					path: 'wb_attendancesum',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/attendancesum.vue'], resolve)
				},
				
				//..账号管理..                 
				{
					//账号列表
					path: 'wb_maintenance_account',
					component: resolve => require(['../components/page/maintenanceAgent/accountManage/account.vue'], resolve)
				},
				
				{
					//角色管理
					path: 'wb_maintenance_role',
					component: resolve => require(['../components/page/maintenanceAgent/accountManage/role.vue'], resolve)
				},
				//                 //..消息管理..                 
				{
					//审核认证
					path: 'wb_certification',
					component: resolve => require(['../components/page/maintenanceAgent/certification.vue'], resolve)
				},
				{
					//能耗管理
					name:'consumption_manage',
					path: 'wb_consumption_manage',
					component: resolve => require(['../components/common/consmption_ma_index.vue'], resolve)
					//component: resolve => require(['../components/page/maintenanceAgent/consumption_manage.vue'], resolve)
				},
				{
					//能耗管理---设置页面
					name:'copSetting',
					path: 'wb_copSetting',
					component: resolve => require(['../components/page/maintenanceAgent/copSetting.vue'], resolve)
					//component: resolve => require(['../components/page/maintenanceAgent/consumption_manage.vue'], resolve)
				},
				{
					//能耗管理---设置历史数据页面
					name:'copHistoryData',
					path: 'wb_copHistoryData',
					component: resolve => require(['../components/page/maintenanceAgent/copHistoryData.vue'], resolve)
					//component: resolve => require(['../components/page/maintenanceAgent/consumption_manage.vue'], resolve)
				},
				{
					//服务报表
					name:'service_report',
					path: 'wb_service_report',
					component: resolve => require(['../components/page/platforms/project_report.vue'], resolve)
				},
				{
					//费用设置
					name:'wb_expense_setting',
					path: 'wb_expense_setting',
					component: resolve => require(['../components/page/maintenanceAgent/expense_manage/expense_setting.vue'], resolve)
				},
				{
					//费用统计
					name:'wb_expense_statistics',
					path: 'wb_expense_statistics',
					component: resolve => require(['../components/page/maintenanceAgent/expense_manage/expense_statistics.vue'], resolve)
				},
				////业主

				//..首页..
				{
					//首页
					path: 'yz_index',
					component: resolve => require(['../components/page/maintenanceAgent/index.vue'], resolve)
				},
				//..我的项目..
				{
					//项目管理
					name: 'yz_items_manage',
					path: 'yz_items_manage',
					component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/project/project_list.vue'], resolve),
					children: [
						{ //项目详情
							name: 'yz_project_detail',
							path: 'project_detail/:ProjectId',
							component: resolve => require(['../components/page/platforms/operationManage/common/projectDetail.vue'], resolve)
						},

						{
							//设备管理
							name: 'yz_equipment_detail_infos',
							path: 'yz_equipment_detail_infos',
							component: resolve => require(['../components/page/maintenanceAgent/items/subComponents/equipment/equipment_detail_infos.vue'], resolve)
						}
					]
				},
				{
					//设备管理
					name: 'yz_equipments_manage',
					path: 'yz_equipments_manage/:type/',
					// component: resolve => require(['../components/page/owner/items/n_energy_manage.vue'], resolve)
					component: resolve => require(['../components/page/common/equipmet_list.vue'], resolve)
				},
				{
					//工单管理
					name: 'yz_work_order',
					path: 'yz_work_order',
					component: resolve => require(['../components/page/maintenanceAgent/items/work_order.vue'], resolve)
				},
				{
					//服务管理
					name: 'yz_service_manage',
					path: 'yz_service_manage',
					component: resolve => require(['../components/page/owner/items/service_manage.vue'], resolve)
				}, {
					//预警告警列表
					path: 'yz_warning_lists',
					component: resolve => require(['../components/page/owner/items/warning_lists.vue'], resolve)
				},
				{
					//项目档案
					name:'project_file',
					path: 'yz_project_file',
					component: resolve => require(['../components/page/maintenanceAgent/items/project_file.vue'], resolve)
				},
				{
					//费用成本
					name:'yz_pro_expense',
					path: 'yz_pro_expense',
					component: resolve => require(['../components/page/maintenanceAgent/items/expense.vue'], resolve)
				},
				
				//              //..我的企业..
				{
					//企业信息
					path: 'yz_enterprise_info',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/company_infomation.vue'], resolve)
				},
				{
					//组织架构
					path: 'yz_organizational',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/organizational.vue'], resolve)
				},
				{
					//员工管理
					path: 'yz_employee',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/employee.vue'], resolve)
				},
				{
					//企业公告
					path: 'yz_company_notice',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/company_notice.vue'], resolve)
				},
				{
					//考勤统计
					path: 'yz_attendancesum',
					component: resolve => require(['../components/page/maintenanceAgent/enterprise/attendancesum.vue'], resolve)
				},
				//..账号管理..                 
				{
					//账号列表
					path: 'yz_maintenance_account',
					component: resolve => require(['../components/page/maintenanceAgent/accountManage/account.vue'], resolve)
				},
				{
					//角色管理
					path: 'yz_maintenance_role',
					component: resolve => require(['../components/page/maintenanceAgent/accountManage/role.vue'], resolve)
				},
				//..消息管理..                 
				{
					//审核认证
					path: 'yz_certification',
					component: resolve => require(['../components/page/maintenanceAgent/certification.vue'], resolve)
				},
				{
					//能耗管理
					name:'consumption_manage',
					path: 'yz_consumption_manage',
					component: resolve => require(['../components/common/consmption_ma_index.vue'], resolve)
					//component: resolve => require(['../components/page/maintenanceAgent/consumption_manage.vue'], resolve)
				},
				{
					//服务报表
					name:'yz_project_report',
					path: 'yz_service_report',
					component: resolve => require(['../components/page/platforms/project_report.vue'], resolve)
				},
				{
					//费用设置
					name:'yz_expense_setting',
					path: 'yz_expense_setting',
					component: resolve => require(['../components/page/maintenanceAgent/expense_manage/expense_setting.vue'], resolve)
				},
				{
					//费用统计
					name:'yz_expense_statistics',
					path: 'yz_expense_statistics',
					component: resolve => require(['../components/page/maintenanceAgent/expense_manage/expense_statistics.vue'], resolve)
				},
				// 404
				{
					path: '*',
					component: resolve => require(['../components/page/404.vue'], resolve)
				}
			]
		},
		// 登录页面
		{
			path: '/login',
			component: resolve => require(['../components/page/user/login.vue'], resolve)
		},
		// 注册页面
		{
			path: '/register',
			component: resolve => require(['../components/page/user/register_s.vue'], resolve)
		},
		// 找回密码
		{
			path: '/forgot',
			component: resolve => require(['../components/page/user/forgot.vue'], resolve)
		},
		{
			path: '*',
			component: resolve => require(['../components/page/404.vue'], resolve)
		},
		{ //全屏
			name: 'full_page',
			path: '/full_page_',
			component: resolve => require(['../components/page/maintenanceAgent/items/common/drag/fullScreenPage.vue'], resolve)
		},
		{ //项目详情
			name: 'test_',
			path: '/test_',
			component: resolve => require(['../components/common/test.vue'], resolve)
		},
	]
})
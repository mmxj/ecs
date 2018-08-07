// @akaash  项目列表
Mock.mock('equipment_list.json?AccessToken='+window.parent.eosCommon.storage.get("AccessToken"), {
	'State':0,
	'Message':'请求成功',
	'Data':{
		'Total':10,
		'Result|10':[{
			'EquipmentId|+1': 1,
			'EquipmentName|1': ['大金-空调-冷暖型-3MXS80EV2C','开利-锅炉-热水型-KL002322','约克-净化器-空气型-YOKE098XX','大金-空调-制冷型-CV215452','约克-锅炉-冷暖型-3MXS80EV2C','开利-净化器-空气压缩型-KL5456FF'],
			'Location': '@county(true)',
			'Icon': '@img(150x80)',
			'RunState|0-3':100,
			'AlarmLevel|0-3':100,
			'IsOnline|0-1':100
		}]
	}
})
// akaash 项目列表-分页
Mock.mock('equipment_list.json?AccessToken='+window.parent.eosCommon.storage.get("AccessToken")+'&page=1', {
	'State':0,
	'Message':'请求成功',
	'Data':{
		'Total':10,
		'Result|10':[{
			'EquipmentId|+1': 1,
			'EquipmentName|1': ['大金-空调-冷暖型-3MXS80EV2C','开利-锅炉-热水型-KL002322','约克-净化器-空气型-YOKE098XX','大金-空调-制冷型-CV215452','约克-锅炉-冷暖型-3MXS80EV2C','开利-净化器-空气压缩型-KL5456FF'],
			'Location': '@county(true)',
			'Icon': '@img(150x80)',
			'RunState|0-3':100,
			'AlarmLevel|0-3':100,
			'IsOnline|0-1':100
		}]
	}
})
// 设备信息
Mock.mock('equipment_info.json?AccessToken='+window.parent.eosCommon.storage.get("AccessToken"),{
	'State':0,
	'Message':'请求成功',
	'Data':{
		'EquipmentTotal':100,
		'EquipmentAlarm':50,
		'EquipmentOnline':30,
		'GatewayTotal':100,
		'GatewayOnline':80
	}
})
// 设备详情
Mock.mock('equipment_detail.json?AccessToken='+window.parent.eosCommon.storage.get("AccessToken"),{
	'State':0,
	'Message':'请求成功',
	'Data':{
		'EquipmentId': 1,
		'EquipmentName|1': ['大金-空调-冷暖型-3MXS80EV2C','开利-锅炉-热水型-KL002322','约克-净化器-空气型-YOKE098XX','大金-空调-制冷型-CV215452','约克-锅炉-冷暖型-3MXS80EV2C','开利-净化器-空气压缩型-KL5456FF'],
		'Location': '@county(true)',
		'Icon': '@img(527x158)',
		'RunState|0-3':100,
		'AlarmLevel|0-3':100,
		'IsOnline|0-1':100,
		'EquipmentTime':'2年05个月20天12小时30分40秒',
		'Company':'广州地铁总公司',//所属企业
		'People':'张小凡',//所属企业
		'ModelNo':'ggxh0003',//设备编号
		'SerialNo':'E012548645',//设备编号
		'Description':'Dantes remained confused and silent by this explanation of the thoughts which had unconsciously been working in his mind',//设备简介
		'Remark':'设备备注信息',//设备备注
		"NameplateInfo":[{
			                "Key": "流量",
			                "Value": "25m³/h"
			             },
			             {
			                "Key": "功率",
			                "Value": "1200w/h"
			             },
			             {
			                "Key": "转速",
			                "Value": "12000r/min"
			             }],
        "NameplatePhotos|6":[{
                     "ResourceId|+1": 1,
                     "ResourceUrl": '@img(150x90)'
                    }],
        'ProjectDynamic|8':[
        				{
        					"name":'@cname',
        					"time":'@datetime(yyyy-MM-dd A HH:mm:ss)',
        					"content":'@csentence'
        				}
        ]

	}
})
// 项目列表
Mock.mock('item_list.json?AccessToken='+window.parent.eosCommon.storage.get("AccessToken"),{
	'State':0,
	'Message':'请求成功',
	'Data':{
		'Total':10,
		'Result|10':[{
			"type":"all",
			"ProjectId|+1": 1,
			"ProjectName": "@csentence()",
			"Icon": "@img(150x80)",
			"Location":"@county(true)",
			'AlarmLevel|0-3':100,
			'IsCollect|0-1':100
		}]
	}
})
// 项目信息
Mock.mock('item_info.json?AccessToken='+window.parent.eosCommon.storage.get("AccessToken"),{
	'State':0,
	'Message':'请求成功',
	'Data':{
		'ProjectTotal': 100,
		'EquipmentTotal':100,
		'Mission':100,
		'AlarmTotal':100,
		'ResponsibleListTotal':100,
		'participationListTotal':100,
		'attentionList':100,
		'AreaStatistics':{
			'Key':['华南','华中','华东','华北','西南'],
			'Value':[100,200,121,221,154]
		}
	}
})
// 删除接口
Mock.mock('del.json',{
	'State':0,
	'Message':'请求成功',
	'Data':{}
})
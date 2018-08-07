/**
 * 功能说明:    易运维 公共 函数
 * @author: longzhoufeng
 * @time: 2017.07.01
// * @version: 2.0 http://api.cleos.com.cn
	var EOS_URL = "http://192.168.16.211";
 * 
 */
   
var eosCommon = window.eosCommon || {};
eosCommon = (function() {
	// 域名 
	var EOS_URL = "http://192.168.16.211";
//	 var EOS_URL = "http://api.cleos.com.cn";
	var EOS_APP_API = EOS_URL + ":" + "2189/";
//	var EOS_COMMON_API = EOS_URL + ":" + '8081/';
	var EOS_COMMON_API = EOS_URL + ":" + '2181/';
	var EOS_IOT_API = EOS_URL + ":" + "2182/";
	var EOS_OPEN_API = EOS_URL + ":" + "2183/";
	var EOS_ENTERPRISE_API = EOS_URL + ":" + "2184/";
	var EOS_REPORTS_API = EOS_URL + ":" + "2185/";
	var EOS_PLATFORM_API = EOS_URL + ":" + "2186/";
	var EOS_USER_API = EOS_URL + ":" + "2187/";
	var EOS_RESOURCES_API = EOS_URL + ":" + "2188/";
	// 提示语
	var INSERT_MSG = '添加成功';
	var INSERT_IMG_MSG = '添加成功';
	var INSERT_FILE_MSG = '添加成功';
	var UPDATE_MSG = '更新成功';
	var UPDATE_IMG_MSG = '更新成功';
	var UPDATE_FILE_MSG = '更新成功';
	var DELETE_MSG = '删除成功';
	var DELETE_IMG_MSG = '删除成功';
	var DELETE_FILE_MSG = '删除成功';
	var FAULT_CONFIRM_ASK = '请勿重复确认报警，谢谢';
	var DELETE_MSG_ASK = '是否删除数据？';
	var DELETE_IMG_ASK = '是否删除图片？';
	var DELETE_FILE_ASK = '是否删除文件？';
	var SET_PERMISSION = '成功设置权限';
	var UPDATE_DIRECTORY = '更新成功';
	var CREATE_DIRECTORY = '新建成功';
	var DELETE_DIRECTORY = '删除成功';
	var UPDATE_DFOLDER = '更新成功';
	var CREATE_DFOLDER = '新建成功';
	var DELETE_DFOLDER = '删除成功';
	var MOVE_FILE = '你刚刚移动了一批文件';
	var SUBSCRIBE_MSG = '成功关注';
	var UNSUBSCRIBE_MSG = '取消关注';
	var SEND_NOTICE = '发送成功';
	var CONFIRM_SCC='确认成功'
	var LOCK_MSG='锁定成功'
	var UNLOCK_MSG='解锁成功';
	
	var loginDialog = false;
	var myData = '';
	var operatorData = '';
	var timer=null;
	var encryptedDes = function(message, keyHex) {
		var encrypted = CryptoJS.DES.encrypt(message, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt), {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return encrypted.toString();
	}
	var decryptedDes = function(message, keyHex) {
		var decrypted = CryptoJS.DES.decrypt({
			ciphertext: CryptoJS.enc.Base64.parse(message)
		}, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt), {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		});
		return decrypted.toString(CryptoJS.enc.Utf8);
	}
	// 封装ajax  请求
	// type      请求类型
	// url       请求链接
	// param     传值
	// data      传值类型
	// callback  成功回调
	
	var eosAjax = function(url, type, param, dataType, callback) {		
		$.ajax({
			url: url,
			type: type,
			data: param,
			dataType: dataType,
			success: callback,
			timeout: 60000,
			error: function(err) {				
				if($(".loading_btn").length) {
					$(".loading_btn").button('reset');
				}
			}
		})
		
		
	};
	var eosMaxAjax = function(url, type, param, dataType, callback,errcallback) {
		// console.log('开始时间：',new Date());
		$.ajax({
			url: url,
			type: type,
			data: param,
			dataType: dataType,
			success: callback,
			timeout: 900000,
			error: errcallback
		})				
	};
	// 判断是否登录
	var login = function(mes) {
		if(loginDialog) {
			return false;
		} else {
			loginDialog = true;
			vdialog({
				type: 'error',
				title: '提示',
				content: '您的登录已超时, 请点确定后重新登录!',
				modal: true,
				ok: function() {
					loginDialog = false;
					location.href = '#/login';
				},
				close: function() {
					loginDialog = false;
					location.href = '#/login';
				}
			});
		}
	};
	// 比对状态码
	// stateCode  状态码
	// mes        消息内容
	var vdialogs = '';
	var checkCode = function(stateCode, mes) {
		$(".loading_btn").button('reset');
		switch(stateCode) {
			case 99999:
				if(loginDialog) {
					return false
				} else {
					loginDialog = true;
					vdialog({
						title: '系统提示',
						type: 'error',
						content: '您的网络不给力，请稍后重试！',
						modal: true,
						ok: function() {
							loginDialog = false
						},
						close: function() {
							loginDialog = false;
						}
					})
				};
				break;
			case 0:
				return true;
				break;
			case 10001:
				vdialog({
					title: '系统提示',
					type: 'alert',
					content: mes,
					modal: true,
					ok: function() {}
				});
				break;
			case 10002:
				login(mes);
				break;
			case 10003:
				login(mes);
				break;
			case 10004:
				vdialog({
					title: '系统提示',
					type: 'alert',
					content: mes,
					modal: true,
					ok: function() {}
				});
				break;
			case 10005:
				vdialog({
					title: '系统提示',
					type: 'alert',
					content: mes,
					modal: true,
					ok: function() {}
				});
				break;
			case 10006:
				vdialog({
					title: '系统提示',
					type: 'alert',
					content: mes,
					modal: true,
					ok: function() {}
				});
				break;
			case 10007:
				vdialog({
					title: '系统提示',
					type: 'alert',
					content: mes,
					modal: true,
					ok: function() {}
				});
				break;
			case 10008:
				vdialog({
					title: '系统提示',
					type: 'alert',
					content: mes,
					modal: true,
					ok: function() {}
				});
				break;
			case 10009:
				//自定义提示
				if(mes == "invalid code") {
					mes = "验证码错误";
				}
				vdialog({
					title: '系统提示',
					type: 'alert',
					content: mes,
					modal: true,
					ok: function() {}
				});
				break;
			case 10010:
				login(mes);
				break;
			case 10011:
				login(mes);
				break;
		}
	};
	// 正则表达式，校验
	var valueCheck = function(value, type) {
		switch(type) {
			case 'mobile': //手机号码
				objexp = "^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$";
				break;
			case 'tel': //固话格式
				objexp = "^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$";
				break;
			case 'email': //邮件地址格式
				objexp = "^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$";
				break;
			case 'zh': //纯中文字符
				objexp = '^[\u4e00-\u9fa5]{0,}$';
				break;
			case 'num': //纯数字
				objexp = "^[0-9]*$ ";
				break;
			case 'num': //纯英文
				objexp = "^[0-9]*$ ";
				break;
			case 'numletterchina': //汉字、字母、数字组成
				objexp = "^[0-9a-zA-Z\u4e00-\u9fa5]+$";
				break;
		}
	};
	// cookie 操作
	var eosCookie = {
		// 获取cookie : 名字
		eCodeTxt: 'canlead',
		get: function(name) {
			var nameEQ = name + "=";
			var ca = document.cookie.split(";");
			for(var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while(c.charAt(0) == " ") {
					c = c.substring(1, c.length);
				}
				if(c.indexOf(nameEQ) == 0) {
					return unescape(c.substring(nameEQ.length, c.length));
				}
			}
			return false;
		},
		// 设置cookie :  名字，设置值，过期时长(天)
		set: function(name, value, exdays) {
			if(name instanceof Object) {
				for(var key in name) {
					var d = new Date();
					d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
					var expires = "expires=" + d.toGMTString();
					document.cookie = key + "=" + name[key] + "; " + expires;
				}
			}
		},
		// 删除cookie : 名字  names 可以传一个数组进来  ["a","b"]
		remove: function(names) {
			var arr = [];
			if(names instanceof Array) {
				names = names;
			} else {
				arr.push(names)
				names = arr;
			}
			for(var i = 0, l = names.length; i < l; i++) {
				document.cookie = names[i] + "=" + "" + "; -1";
			}
			return names;
		}
	}
	// localstorage 操作
	var storage = {
		set: function(name, value) {
			if(name instanceof Object) {
				for(var key in name) {
					window.localStorage.setItem(encryptedDes(key, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)), encryptedDes(name[key].toString(), CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)));
				}
			} else {
				window.localStorage.setItem(encryptedDes(name, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)), encryptedDes(value.toString(), CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)));
			}
		},
		get: function(name) {
			if(window.localStorage.getItem(encryptedDes(name, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt))) != null) {
				return decryptedDes(window.localStorage.getItem(encryptedDes(name, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt))), CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt));
			}
		},
		clear: function() {
			window.localStorage.clear();
		},
		remove: function(name) {
			var arr = [];
			if(name instanceof Array) {
				arr = name;
			} else {
				arr.push(name);
			}
			for(var i = 0, l = arr.length; i < l; i++) {
				window.localStorage.removeItem(encryptedDes(arr[i], CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)));
			}
		}
	}
	// 获取url param 值
	// variable : 想要获取的值名称
	var getUrlParam = function(url, name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = url.substr(1).match(reg);
		if(r != null) return unescape(r[2]);
		return null;
	}
	// 获取时间
	// 实例：console.log(getTime("yyyy-MM-dd",5))
	// fmt 传入格式 "yyyy-MM-dd HH:mm:ss" 或者 "yyyy-MM-dd" selectTime
	// 输入需要获取的日期 0：当前日期；正数为加多少天，负数为减多少天
	var getTime = function(fmt, selectTime,isFormat) {
		
		if(isFormat){
				var date = selectTime;		
				
		}else{
				var date = new Date();		
				if(selectTime != 0) {
					date.setDate(date.getDate() + selectTime);
				}
		}
		var timeArr = {
			"M+": date.getMonth() + 1, //月份
			"d+": date.getDate(), //日
			"h+": date.getHours(), //小时
			"m+": date.getMinutes(), //分
			"s+": date.getSeconds(), //秒
			"q+": Math.floor((date.getMonth() + 3) / 3), //季度
			"S": date.getMilliseconds() //毫秒
		};
		var week = {
			"0": "/u65e5",
			"1": "/u4e00",
			"2": "/u4e8c",
			"3": "/u4e09",
			"4": "/u56db",
			"5": "/u4e94",
			"6": "/u516d"
		};
		if(/(y+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
		}
		if(/(E+)/.test(fmt)) {
			fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
		}
		for(var k in timeArr) {
			if(new RegExp("(" + k + ")").test(fmt)) {
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (timeArr[k]) : (("00" + timeArr[k]).substr(("" + timeArr[k]).length)));
			}
		}
		return fmt;
	}
	// 省市区三级联动
	// 实例: cityLinage.init('19','289','3042')
	// 三个参数分别为   省份id 城市id 区域id
	// 如果是初始化的话直接调用 cityLinage.init('','','')
	var cityLinage = {
		init: function(prov, city, dist) {
			cityLinage.getPorvince(
				prov,
				function() {
					cityLinage.getCity(
						$('#province').selectpicker('val', $('#province').attr('value')),
						city,
						function() {
							cityLinage.getDistrict(
								$('#city').selectpicker('val', $('#city').attr('value')),
								dist
							);
						});
				})
		},
		loadData: function(defaultVal, results, selectEle, id, name, callback) {
			if(checkCode(results.State, results.Message)) {
				$(selectEle).empty();
				if(results.Data == '') {
					$(selectEle).append("<option>暂无数据</option>")
				} else {
					for(var key in results.Data) {
						$(selectEle).append("<option value=" + results.Data[key][id] + ">" + results.Data[key][name] + "</option>");
					}
				}
				if(defaultVal) {
					$(selectEle).selectpicker('val', defaultVal);
				}
				if(selectEle == "#province") {
					$(selectEle).selectpicker('val', defaultVal == "" ? "19" : defaultVal);
				}
				$(selectEle).selectpicker('refresh');
				callback && callback();
			}
		},
		getPorvince: function(prov, callback) {
			eosAjax(
				EOS_COMMON_API + "api/common/province",
				"GET", { "Region": "" },
				"json",
				function(results) {
					cityLinage.loadData(prov, results, '#province', "ProvinceId", "ProvinceName", callback)
				}
			);
		},
		getCity: function(provinceId, city, callback) {
			eosAjax(
				EOS_COMMON_API + "api/common/city",
				"GET", { "ProvinceId": provinceId },
				"json",
				function(results) {
					cityLinage.loadData(city, results, '#city', "CityId", "CityName", callback);
				}
			);
		},
		getDistrict: function(cityId, dist, callback) {
			eosAjax(
				EOS_COMMON_API + "api/common/district",
				"GET", { "CityId": cityId },
				"json",
				function(results) {
					cityLinage.loadData(dist, results, '#district', "DistrictId", "DistrictName", callback);
				}
			);
		}
	}
	// Message 消息提示
	// tyep: success/warning/info/error  成功/警告/正常/错误
	var eosMessage = function(type, message,isPosition,onClose) {
		var src='';
		switch(type) {
			case 'success':
				src = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl9zdWNjZXNzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkVsZW1lbnQtZ3VpZGVsaW5lLXYwLjIuNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MC4wMDAwMDAsIC0yMTIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLluKblgL7lkJFf5L+h5oGvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MC4wMDAwMDAsIDIxMi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtMiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Imljb25fc3VjY2VzcyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzEzQ0U2NiIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNy44MjU1ODE0LDE3LjE0ODQzNTcgTDE5LjAxNzQ0LDI1LjgyODEyMTMgQzE4LjkwMTE2MDksMjUuOTQyNzA4MyAxOC43NjU1MDMzLDI2IDE4LjYxMDQ2NywyNiBDMTguNDU1NDI3LDI2IDE4LjMxOTc2OTMsMjUuOTQyNzA4MyAxOC4yMDM0ODY1LDI1LjgyODEyMTMgTDE4LjAyOTA3MTYsMjUuNjU2MjUgTDEzLjE3NDQxODYsMjAuODQzNzUgQzEzLjA1ODEzOTUsMjAuNzI5MTYzIDEzLDIwLjU5NTQ4MzcgMTMsMjAuNDQyNzA0NyBDMTMsMjAuMjg5OTI5MyAxMy4wNTgxMzk1LDIwLjE1NjI1IDEzLjE3NDQxODYsMjAuMDQxNjY2NyBMMTQuMzY2Mjc3MiwxOC44NjcxODU3IEMxNC40ODI1NiwxOC43NTI2MDIzIDE0LjYxODIxNzcsMTguNjk1MzEwNyAxNC43NzMyNTc3LDE4LjY5NTMxMDcgQzE0LjkyODI5NCwxOC42OTUzMTA3IDE1LjA2Mzk1MTYsMTguNzUyNjAyMyAxNS4xODAyMzA3LDE4Ljg2NzE4NTcgTDE4LjYxMDQ2NywyMi4yNzYwMzggTDI1LjgxOTc2OTMsMTUuMTcxODcxMyBDMjUuOTM2MDQ4NCwxNS4wNTcyODggMjYuMDcxNzA2LDE1IDI2LjIyNjc0MjMsMTUgQzI2LjM4MTc4MjMsMTUgMjYuNTE3NDQsMTUuMDU3Mjg4IDI2LjYzMzcyMjgsMTUuMTcxODcxMyBMMjcuODI1NTgxNCwxNi4zNDYzNTIzIEMyNy45NDE4NjA1LDE2LjQ2MDkzNTcgMjgsMTYuNTk0NjE1IDI4LDE2Ljc0NzM5NCBDMjgsMTYuOTAwMTczIDI3Ljk0MTg2MDUsMTcuMDMzODUyMyAyNy44MjU1ODE0LDE3LjE0ODQzNTcgTDI3LjgyNTU4MTQsMTcuMTQ4NDM1NyBaIiBpZD0iUGF0aCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";
				break;
			case 'warning':
				src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl93YXJuaW5nPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MC4wMDAwMDAsIC0yNzIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLluKblgL7lkJFf5L+h5oGvLWNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYwLjAwMDAwMCwgMjcyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS0yIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl93YXJuaW5nIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjRjdCQTJBIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIxLjYxNTM4NDYsMjYuNTQzMjA5OSBDMjEuNjE1Mzg0NiwyNi45NDc4NzUxIDIxLjQ1ODMzNDgsMjcuMjkxODM2OCAyMS4xNDQyMzA4LDI3LjU3NTEwMjkgQzIwLjgzMDEyNjgsMjcuODU4MzY4OSAyMC40NDg3MTk0LDI4IDIwLDI4IEMxOS41NTEyODA2LDI4IDE5LjE2OTg3MzIsMjcuODU4MzY4OSAxOC44NTU3NjkyLDI3LjU3NTEwMjkgQzE4LjU0MTY2NTIsMjcuMjkxODM2OCAxOC4zODQ2MTU0LDI2Ljk0Nzg3NTEgMTguMzg0NjE1NCwyNi41NDMyMDk5IEwxOC4zODQ2MTU0LDE5Ljc0NDg1NiBDMTguMzg0NjE1NCwxOS4zNDAxOTA3IDE4LjU0MTY2NTIsMTguOTk2MjI5IDE4Ljg1NTc2OTIsMTguNzEyOTYzIEMxOS4xNjk4NzMyLDE4LjQyOTY5NjkgMTkuNTUxMjgwNiwxOC4yODgwNjU4IDIwLDE4LjI4ODA2NTggQzIwLjQ0ODcxOTQsMTguMjg4MDY1OCAyMC44MzAxMjY4LDE4LjQyOTY5NjkgMjEuMTQ0MjMwOCwxOC43MTI5NjMgQzIxLjQ1ODMzNDgsMTguOTk2MjI5IDIxLjYxNTM4NDYsMTkuMzQwMTkwNyAyMS42MTUzODQ2LDE5Ljc0NDg1NiBMMjEuNjE1Mzg0NiwyNi41NDMyMDk5IFogTTIwLDE1LjgwNDI5ODEgQzE5LjQ0NDQ0MjcsMTUuODA0Mjk4MSAxOC45NzIyMjQsMTUuNjE5MzY4NyAxOC41ODMzMzMzLDE1LjI0OTUwNDYgQzE4LjE5NDQ0MjcsMTQuODc5NjQwNiAxOCwxNC40MzA1MjU1IDE4LDEzLjkwMjE0OTEgQzE4LDEzLjM3Mzc3MjYgMTguMTk0NDQyNywxMi45MjQ2NTc1IDE4LjU4MzMzMzMsMTIuNTU0NzkzNSBDMTguOTcyMjI0LDEyLjE4NDkyOTUgMTkuNDQ0NDQyNywxMiAyMCwxMiBDMjAuNTU1NTU3MywxMiAyMS4wMjc3NzYsMTIuMTg0OTI5NSAyMS40MTY2NjY3LDEyLjU1NDc5MzUgQzIxLjgwNTU1NzMsMTIuOTI0NjU3NSAyMiwxMy4zNzM3NzI2IDIyLDEzLjkwMjE0OTEgQzIyLDE0LjQzMDUyNTUgMjEuODA1NTU3MywxNC44Nzk2NDA2IDIxLjQxNjY2NjcsMTUuMjQ5NTA0NiBDMjEuMDI3Nzc2LDE1LjYxOTM2ODcgMjAuNTU1NTU3MywxNS44MDQyOTgxIDIwLDE1LjgwNDI5ODEgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjRkZGRkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDIwLjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMjAuMDAwMDAwLCAtMjAuMDAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==';
				break;
			case 'info':
				src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl9pbmZvPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkVsZW1lbnQtZ3VpZGVsaW5lLXYwLjIuNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MC4wMDAwMDAsIC0xNTIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLluKblgL7lkJFf5L+h5oGvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MC4wMDAwMDAsIDE1Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtMiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Imljb25faW5mbyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzUwQkZGRiIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMS42MTUzODQ2LDI2LjU0MzIwOTkgQzIxLjYxNTM4NDYsMjYuOTQ3ODc1MSAyMS40NTgzMzQ4LDI3LjI5MTgzNjggMjEuMTQ0MjMwOCwyNy41NzUxMDI5IEMyMC44MzAxMjY4LDI3Ljg1ODM2ODkgMjAuNDQ4NzE5NCwyOCAyMCwyOCBDMTkuNTUxMjgwNiwyOCAxOS4xNjk4NzMyLDI3Ljg1ODM2ODkgMTguODU1NzY5MiwyNy41NzUxMDI5IEMxOC41NDE2NjUyLDI3LjI5MTgzNjggMTguMzg0NjE1NCwyNi45NDc4NzUxIDE4LjM4NDYxNTQsMjYuNTQzMjA5OSBMMTguMzg0NjE1NCwxOS43NDQ4NTYgQzE4LjM4NDYxNTQsMTkuMzQwMTkwNyAxOC41NDE2NjUyLDE4Ljk5NjIyOSAxOC44NTU3NjkyLDE4LjcxMjk2MyBDMTkuMTY5ODczMiwxOC40Mjk2OTY5IDE5LjU1MTI4MDYsMTguMjg4MDY1OCAyMCwxOC4yODgwNjU4IEMyMC40NDg3MTk0LDE4LjI4ODA2NTggMjAuODMwMTI2OCwxOC40Mjk2OTY5IDIxLjE0NDIzMDgsMTguNzEyOTYzIEMyMS40NTgzMzQ4LDE4Ljk5NjIyOSAyMS42MTUzODQ2LDE5LjM0MDE5MDcgMjEuNjE1Mzg0NiwxOS43NDQ4NTYgTDIxLjYxNTM4NDYsMjYuNTQzMjA5OSBaIE0yMCwxNS44MDQyOTgxIEMxOS40NDQ0NDI3LDE1LjgwNDI5ODEgMTguOTcyMjI0LDE1LjYxOTM2ODcgMTguNTgzMzMzMywxNS4yNDk1MDQ2IEMxOC4xOTQ0NDI3LDE0Ljg3OTY0MDYgMTgsMTQuNDMwNTI1NSAxOCwxMy45MDIxNDkxIEMxOCwxMy4zNzM3NzI2IDE4LjE5NDQ0MjcsMTIuOTI0NjU3NSAxOC41ODMzMzMzLDEyLjU1NDc5MzUgQzE4Ljk3MjIyNCwxMi4xODQ5Mjk1IDE5LjQ0NDQ0MjcsMTIgMjAsMTIgQzIwLjU1NTU1NzMsMTIgMjEuMDI3Nzc2LDEyLjE4NDkyOTUgMjEuNDE2NjY2NywxMi41NTQ3OTM1IEMyMS44MDU1NTczLDEyLjkyNDY1NzUgMjIsMTMuMzczNzcyNiAyMiwxMy45MDIxNDkxIEMyMiwxNC40MzA1MjU1IDIxLjgwNTU1NzMsMTQuODc5NjQwNiAyMS40MTY2NjY3LDE1LjI0OTUwNDYgQzIxLjAyNzc3NiwxNS42MTkzNjg3IDIwLjU1NTU1NzMsMTUuODA0Mjk4MSAyMCwxNS44MDQyOTgxIFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';
				break;
			case 'error':
				src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl9kYW5nZXI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iRWxlbWVudC1ndWlkZWxpbmUtdjAuMi40IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWVzc2FnZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYwLjAwMDAwMCwgLTMzMi4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IuW4puWAvuWQkV/kv6Hmga8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYwLjAwMDAwMCwgMzMyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS0yIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9kYW5nZXIiPgogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIGZpbGw9IiNGRjQ5NDkiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuODE3MjYyNywxNi4zNDUxNzk2IEMyNS45MzkwOTAyLDE2LjIyMzM0ODMgMjYsMTYuMDc2MTQxOCAyNiwxNS45MDM1NTIzIEMyNiwxNS43MzA5NjI4IDI1LjkzOTA5MDIsMTUuNTgzNzU2MyAyNS44MTcyNjI3LDE1LjQ2MTkyODkgTDI0LjUwNzYxNTcsMTQuMTgyNzQxMSBDMjQuMzg1Nzg4MiwxNC4wNjA5MTM3IDI0LjI0MzY1NzUsMTQgMjQuMDgxMjE5NiwxNCBDMjMuOTE4NzgxNywxNCAyMy43NzY2NTEsMTQuMDYwOTEzNyAyMy42NTQ4MjM1LDE0LjE4Mjc0MTEgTDIwLDE3LjgzNzU2MzUgTDE2LjMxNDcyMTYsMTQuMTgyNzQxMSBDMTYuMTkyODkwMiwxNC4wNjA5MTM3IDE2LjA1MDc1OTUsMTQgMTUuODg4MzIxNiwxNCBDMTUuNzI1ODg3NiwxNCAxNS41ODM3NTY5LDE0LjA2MDkxMzcgMTUuNDYxOTI5NCwxNC4xODI3NDExIEwxNC4xNTIyODI0LDE1LjQ2MTkyODkgQzE0LjA1MDc1ODIsMTUuNTgzNzU2MyAxNCwxNS43MzA5NjI4IDE0LDE1LjkwMzU1MjMgQzE0LDE2LjA3NjE0MTggMTQuMDUwNzU4MiwxNi4yMjMzNDgzIDE0LjE1MjI4MjQsMTYuMzQ1MTc5NiBMMTcuODM3NTYwOCwyMC4wMDAwMDE5IEwxNC4xNTIyODI0LDIzLjY1NDgyNDMgQzE0LjA1MDc1ODIsMjMuNzc2NjUxNyAxNCwyMy45MjM4NTgyIDE0LDI0LjA5NjQ0NzcgQzE0LDI0LjI2OTAzNzIgMTQuMDUwNzU4MiwyNC40MTYyNDM3IDE0LjE1MjI4MjQsMjQuNTM4MDcxMSBMMTUuNDYxOTI5NCwyNS44MTcyNTg5IEMxNS41ODM3NTY5LDI1LjkzOTA4NjMgMTUuNzI1ODg3NiwyNiAxNS44ODgzMjE2LDI2IEMxNi4wNTA3NTk1LDI2IDE2LjE5Mjg5MDIsMjUuOTM5MDg2MyAxNi4zMTQ3MjE2LDI1LjgxNzI1ODkgTDIwLDIyLjE2MjQzNjUgTDIzLjY1NDgyMzUsMjUuODE3MjU4OSBDMjMuNzc2NjUxLDI1LjkzOTA4NjMgMjMuOTE4NzgxNywyNiAyNC4wODEyMTk2LDI2IEMyNC4yNDM2NTc1LDI2IDI0LjM4NTc4ODIsMjUuOTM5MDg2MyAyNC41MDc2MTU3LDI1LjgxNzI1ODkgTDI1LjgxNzI2MjcsMjQuNTM4MDcxMSBDMjUuOTM5MDkwMiwyNC40MTYyNDM3IDI2LDI0LjI2OTAzNzIgMjYsMjQuMDk2NDQ3NyBDMjYsMjMuOTIzODU4MiAyNS45MzkwOTAyLDIzLjc3NjY1MTcgMjUuODE3MjYyNywyMy42NTQ4MjQzIEwyMi4xMzE5ODA0LDIwLjAwMDAwMTkgTDI1LjgxNzI2MjcsMTYuMzQ1MTc5NiBaIiBpZD0iUGF0aCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';
				break;
			default:
				src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl9pbmZvPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkVsZW1lbnQtZ3VpZGVsaW5lLXYwLjIuNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MC4wMDAwMDAsIC0xNTIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLluKblgL7lkJFf5L+h5oGvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MC4wMDAwMDAsIDE1Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtMiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Imljb25faW5mbyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzUwQkZGRiIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMS42MTUzODQ2LDI2LjU0MzIwOTkgQzIxLjYxNTM4NDYsMjYuOTQ3ODc1MSAyMS40NTgzMzQ4LDI3LjI5MTgzNjggMjEuMTQ0MjMwOCwyNy41NzUxMDI5IEMyMC44MzAxMjY4LDI3Ljg1ODM2ODkgMjAuNDQ4NzE5NCwyOCAyMCwyOCBDMTkuNTUxMjgwNiwyOCAxOS4xNjk4NzMyLDI3Ljg1ODM2ODkgMTguODU1NzY5MiwyNy41NzUxMDI5IEMxOC41NDE2NjUyLDI3LjI5MTgzNjggMTguMzg0NjE1NCwyNi45NDc4NzUxIDE4LjM4NDYxNTQsMjYuNTQzMjA5OSBMMTguMzg0NjE1NCwxOS43NDQ4NTYgQzE4LjM4NDYxNTQsMTkuMzQwMTkwNyAxOC41NDE2NjUyLDE4Ljk5NjIyOSAxOC44NTU3NjkyLDE4LjcxMjk2MyBDMTkuMTY5ODczMiwxOC40Mjk2OTY5IDE5LjU1MTI4MDYsMTguMjg4MDY1OCAyMCwxOC4yODgwNjU4IEMyMC40NDg3MTk0LDE4LjI4ODA2NTggMjAuODMwMTI2OCwxOC40Mjk2OTY5IDIxLjE0NDIzMDgsMTguNzEyOTYzIEMyMS40NTgzMzQ4LDE4Ljk5NjIyOSAyMS42MTUzODQ2LDE5LjM0MDE5MDcgMjEuNjE1Mzg0NiwxOS43NDQ4NTYgTDIxLjYxNTM4NDYsMjYuNTQzMjA5OSBaIE0yMCwxNS44MDQyOTgxIEMxOS40NDQ0NDI3LDE1LjgwNDI5ODEgMTguOTcyMjI0LDE1LjYxOTM2ODcgMTguNTgzMzMzMywxNS4yNDk1MDQ2IEMxOC4xOTQ0NDI3LDE0Ljg3OTY0MDYgMTgsMTQuNDMwNTI1NSAxOCwxMy45MDIxNDkxIEMxOCwxMy4zNzM3NzI2IDE4LjE5NDQ0MjcsMTIuOTI0NjU3NSAxOC41ODMzMzMzLDEyLjU1NDc5MzUgQzE4Ljk3MjIyNCwxMi4xODQ5Mjk1IDE5LjQ0NDQ0MjcsMTIgMjAsMTIgQzIwLjU1NTU1NzMsMTIgMjEuMDI3Nzc2LDEyLjE4NDkyOTUgMjEuNDE2NjY2NywxMi41NTQ3OTM1IEMyMS44MDU1NTczLDEyLjkyNDY1NzUgMjIsMTMuMzczNzcyNiAyMiwxMy45MDIxNDkxIEMyMiwxNC40MzA1MjU1IDIxLjgwNTU1NzMsMTQuODc5NjQwNiAyMS40MTY2NjY3LDE1LjI0OTUwNDYgQzIxLjAyNzc3NiwxNS42MTkzNjg3IDIwLjU1NTU1NzMsMTUuODA0Mjk4MSAyMCwxNS44MDQyOTgxIFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+';
		}
		if(isPosition){
			//console.log(el,$('.'+el));
			$("body").append(
				'<div class="el-message el-message-fade-enter" style="z-index: 5000;top:30%;">' +
				'<img src="' + src + '" alt="" class="el-message__icon">' +
				'<div class="el-message__group">' +
				'<p>' + message + '</p>' +
				'</div>' +
				'</div>'
			)
		}else{
			$("body").append(
				'<div class="el-message el-message-fade-enter" style="z-index: 2017;">' +
				'<img src="' + src + '" alt="" class="el-message__icon">' +
				'<div class="el-message__group">' +
				'<p>' + message + '</p>' +
				'</div>' +
				'</div>'
			)
		}
		
		setTimeout(function() {
			$(".el-message").removeClass("el-message-fade-enter")
		}, 10)
		setTimeout(function() {
			$(".el-message").addClass("el-message-fade-leave-active")
		}, 2500)
		setTimeout(function() {
			$(".el-message").remove();
		}, 4000)
		onClose && onClose();
	}
	// 更新首页头像
	var eosUpdataAvatar = function(imgUrl) {

		//console.log('imgUrl:',imgUrl)
		imgUrl == '' ? imgUrl = './static/images/user_default.jpg' : imgUrl = imgUrl;
		$(".avatar img").attr('src', imgUrl);
	}
	var eosUploaderFile = function(initData,isBlend) {
			//console.log('是否混合上传：',isBlend)
		var init = {},
			extensions='rar,zip,doc,xls,docx,xlsx,pdf',
			upType = initData['upType'];
			if(isBlend!='undefined'){
				extensions='rar,zip,doc,xls,docx,xlsx,pdf,pdf,gif,jpg,jpeg,bmp,png'
			}
		init[initData['uploaderObj']] = WebUploader.create({
			auto: false,
			swf: '../assets/plugins/webuploader/js/Uploader.swf',
			server: initData['serverUrl'],
			formData: initData['data'],
			pick: initData['initBtn'],
			fileNumLimit: initData['fileNumLimit'],
			resize: false,
			fileSingleSizeLimit: 16 * 1024 * 1024,
			accept: {
				title: 'intoTypes',
				extensions: extensions,
				mimeTypes: ''
			}
		});
		init[initData['uploaderObj']].on('fileQueued', function(file) {
			$(initData['uploaderBox']).find(initData['uploaderList']).append(
				'<div id="' + file.id + '" class="item" data="">' +
				'<h4 class="info">' + file.name + '</h4>' +
				'<div class="progress progress-striped active">' +
				'<div class="progress-bar" role="progressbar" style="width: 0%">' +
				'</div>' +
				'</div>' +
				'<div class="action"><button class="startBtn btn btn-default">开始</button><button class="btn btn-default delBtn">删除</button></div>' +
				'<p class="state">等待上传...</p>' +
				'</div>');
			if(!$(initData['uploaderBox']).find(".ctlAllBtn").html()) {
				if(initData['fileNumLimit'] == 1) {
					$(initData['uploaderBox']).find(".btns").hide();
				} 
//				else {
//					$(initData['uploaderBox']).find(".btns").append('<button class="btn btn-default ctlAllBtn">全部上传</button><button class="btn btn-default delAllBtn">全部删除</button>')
//				}
			}
			eosCommon.resetNiceScroll();
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
			if(eosCommon.checkCode(ret.State, ret.Message)) {}
			if(upType != 1) {
				if(ret.Data.length) {
					if(ret.Data[0]['UploadTips'] != 'ok') {
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
			if(upType != 1) {
				$('#' + file.id).attr("data", response.Data[0].ResourceId); //上传成给data赋值
				$('#' + file.id).append('<input type="hidden" value="' + response.Data[0].ResourceId + '">');
			}
			initData['succ'] && initData['succ'](response);
		});
		init[initData['uploaderObj']].on('uploadError', function(file, response) {
			// console.log(response)
			setTimeout(function() {
				$('#' + file.id).find('.progress-bar').animate({ 'width': '0%' }, 400);
			}, 400)
			$('#' + file.id).find(".startBtn").html("重新上传");
			$('#' + file.id).find('p.state').html('<span style="color: #f43838">上传出错</span>');
			initData['error'] && initData['error'](file);
		});
		init[initData['uploaderObj']].on('uploadComplete', function(file) {
			// $( '#'+file.id ).find('.progress').fadeOut();
		});
		//  验证
		init[initData['uploaderObj']].on("error", function(type) {
			if(type == "F_DUPLICATE") {
				window.parent.vdialog({
					title: '系统提示',
					type: 'error',
					modal: true,
					content: "您已经上传了一份，请不要重复上传！",
					ok: true
				});
			} else if(type == "F_EXCEED_SIZE") {
				window.parent.vdialog({
					title: '系统提示',
					type: 'error',
					modal: true,
					content: "单个附件的大小不可超过 16M 哦！换个小点的文件吧！",
					ok: true
				});
			} else if(type == "Q_TYPE_DENIED") {
				window.parent.vdialog({
					title: '系统提示',
					type: 'error',
					modal: true,
					content: "为了系统安全，请上传系统规定的文件<br />doc，docx，pdf，zip，rar，xls，xlsx",
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
			if($(initData['uploaderBox']).find(initData['uploaderList'] + " .item").length == 1) {
				$(initData['uploaderBox']).find(".ctlAllBtn , .delAllBtn").remove();
			};
			init[initData['uploaderObj']].removeFile($(this).parents('.item').attr('id'));
			$(this).parents('.item').remove();
			//$(this).parents('.item').find("input:hidden").val()
			initData['del'] && initData['del']($(this).parents('.item').attr("data"));
		})
		$(initData['uploaderBox']).on('click', '.startBtn', function() {
			init[initData['uploaderObj']].upload($(this).parents('.item').attr('id'));
		})
	}
	var eosUploaderImg = function(initData) {
		var init = {},
			$wrap = $(initData['uploaderBox']).find('.eos_uploader_img'),
			$queue = $(initData['uploaderBox']).find('.filelist'),
			fileCount = 0,
			fileSize = 0;
		// 初始化Web Uploader
		init[initData['uploaderObj']] = WebUploader.create({
			auto: false,
			swf: false,
			server: initData['serverUrl'],
			pick: initData['initBtn'],
			fileNumLimit: initData['fileNumLimit'],
			fileSingleSizeLimit: initData['fileSingleSizeLimit'],
			formData: initData['data'],
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: ''
			}
		});
		//获取数据库中的图片地址加载图片
		function addImg(ResourceId, imgUrl) {
			$(initData['uploaderBox']).find(".placeholder").hide()
			var $li = $('<li id="' + ResourceId + '" class="item" data-num="dataImg" data="' + ResourceId + '">' +
					'<p class="title">' + ' ' + '</p>' +
					'<p class="imgWrap"></p>' +
					'<p class="progress"><span></span></p>' +
					'</li>'),
				$btns = $('<div class="file-panel">' +
					'<span class="cancel">删除</span>').appendTo($li),
				$prgress = $li.find('p.progress span'),
				$wrap = $li.find('p.imgWrap'),
				$info = $('<p class="error"></p>');
			var img = $('<img class="" src="' + imgUrl + '">');
			$wrap.empty().append(img);
			$li.prependTo($queue);
			//文件数加一
			fileCount++;
			if(fileCount < initData['fileNumLimit']) {
				$(initData['uploaderBox']).find(".statusBar").show();
				$(initData['continueBtn']).show();
				init[initData['uploaderObj']].addButton({
					id: initData['continueBtn'],
					label: '继续添加'
				});
			} else {
				$(initData['continueBtn']).hide();
			}
		}

		function loadImg() {
			var ResourceIds = initData['ResourceIds'];
			var imgUrls = initData['imgUrls'];
			if(ResourceIds != null && ResourceIds != "") {
				if(Object.prototype.toString.call(ResourceIds) === '[object Array]') {
					for(var i = 0; i < ResourceIds.length; i++) {
						addImg(ResourceIds[i], imgUrls[i]);
					}
				} else {
					addImg(ResourceIds, imgUrls);
				}
			}
		}

		loadImg();
		// 拖拽时不接受 js, txt 文件。
		init[initData['uploaderObj']].on('dndAccept', function(items) {
			var denied = false,
				len = items.length,
				i = 0,
				// 修改js类型
				unAllowed = 'text/plain;application/javascript ';
			for(; i < len; i++) {
				// 如果在列表里面
				if(~unAllowed.indexOf(items[i].type)) {
					denied = true;
					break;
				}
			}
			return !denied;
		});

		function addFile(file) {
			$(initData['uploaderBox']).find(".placeholder").hide()
			var $li = $('<li id="' + file.id + '" class="item">' +
					'<p class="title">' + file.name + '</p>' +
					'<p class="imgWrap"></p>' +
					'<p class="progress"><span></span></p>' +
					'</li>'),
				$btns = $('<div class="file-panel">' +
					'<span class="cancel">删除</span>').appendTo($li),
				$prgress = $li.find('p.progress span'),
				$wrap = $li.find('p.imgWrap'),
				$info = $('<p class="error"></p>');
			init[initData['uploaderObj']].makeThumb(file, function(error, src) {
				var img;
				if(error) {
					$wrap.text('不能预览');
					return;
				}
				img = $('<img src="' + src + '">');
				$wrap.empty().append(img);
			}, 110, 110);
			$li.prependTo($queue);
		}

		init[initData['uploaderObj']].on('uploadBeforeSend', function(obj, data, headers) {
			initData['fileBeforeSend'] && initData['fileBeforeSend'](obj, data, headers);
		})
		// 当有文件添加进来的时候
		init[initData['uploaderObj']].on('fileQueued', function(file) {
			addFile(file);
			$(initData['uploaderBox']).find(".info").html(text);
			fileCount++;
			fileSize += file.size;
			var text = '选中 ' + fileCount + ' 张图片';
			if(fileCount === 1) {
				$(initData['uploaderBox']).find(".statusBar").show();
				$(initData['continueBtn']).show();
				init[initData['uploaderObj']].addButton({
					id: initData['continueBtn'],
					label: '继续添加'
				});
			}
			if(fileCount >= initData['fileNumLimit']) {
				$(initData['continueBtn']).hide();
			}
			eosCommon.resetNiceScroll();
		});
		// 文件上传过程中创建进度条实时显示。
		init[initData['uploaderObj']].on('uploadProgress', function(file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('.progress span');
			$percent.css('width', percentage * 100 + '%');
		});
		init[initData['uploaderObj']].on('uploadAccept', function(object, ret) {
			if(eosCommon.checkCode(ret.State, ret.Message)) {}
			if(ret.Data.length) {
				if(ret.Data[0]['UploadTips'] != 'ok') {
					return false
				}
			} else {
				return false;
			}
		})
		// 文件上传成功，给item添加成功class, 用样式标记上传成功。
		init[initData['uploaderObj']].on('uploadSuccess', function(file, response) {
			$('#' + file.id).addClass('upload-state-done');
			var $li = $('#' + file.id),
				$success = $li.find('div.success');
			// 避免重复创建
			if(!$success.length) {
				$success = $('<div class="success"></div>').appendTo($li);
			}
			$success.text('');
			$('#' + file.id).append('<input type="hidden" value="' + response.Data[0].ResourceId + '">');
			$('#' + file.id).attr('data', response.Data[0].ResourceId);
			initData['succ'] && initData['succ'](response);
		});
		init[initData['uploaderObj']].on('fileDequeued', function(file) {
			fileCount--;
			fileSize -= file.size;
			if(!fileCount) {
				$(initData['uploaderBox']).find(".statusBar").hide();
				$(initData['uploaderBox']).find(".placeholder").show()
			}
		})
		// 文件上传失败，显示上传出错。
		init[initData['uploaderObj']].on('uploadError', function(file) {
			setTimeout(function() {
				$('#' + file.id).find('.progress span').animate({ 'width': '0%' }, 200);
			}, 200)
			var $li = $('#' + file.id),
				$error = $li.find('div.error');
			// 避免重复创建
			if(!$error.length) {
				$error = $('<div class="error"></div>').appendTo($li);
			}
			$error.text('上传失败');
			initData['error'] && initData['error'](file);
		});
		// 完成上传完了，成功或者失败，先删除进度条。
		init[initData['uploaderObj']].on('uploadComplete', function(file) {
			// $( '#'+file.id ).find('.progress').remove();
			var fileSizeFormat = fileSize;
			var stats = init[initData['uploaderObj']].getStats();
			var text = '共 ' + fileCount + ' 张，已上传 ' + stats.successNum + ' 张';
			if(stats.uploadFailNum) {
				text += '，失败 ' + stats.uploadFailNum + ' 张；<a class="retry" href="Javascript:;">重新上传 </a>失败图片';
			}
			$(initData['uploaderBox']).find(".info").html(text);
		});
		$(initData['uploaderBox']).on("click", ".uploadBtn", function() {
			init[initData['uploaderObj']].upload();
		});
		$(initData['uploaderBox']).on("click", ".cancel", function() {
			if($(this).parents('.item').attr('data-num') == "dataImg") {
				fileCount = fileCount - 1;
				$(this).parents('.item').remove();
				initData['del'] && initData['del']($(this).parents('.item').attr('id'));
				if(!fileCount) {
					$(initData['uploaderBox']).find(".statusBar").hide();
					$(initData['uploaderBox']).find(".placeholder").show()
					init[initData['uploaderObj']].addButton({
						id: initData['initBtn'],
						label: '点击选择图片'
					});
				} else {
					if(fileCount < initData['fileNumLimit']) {
						$(initData['continueBtn']).show();
					}
				}
			} else {
				init[initData['uploaderObj']].removeFile($(this).parents('.item').attr('id'));
				$(this).parents('.item').remove();
				if($(this).parents('.item').find("input:hidden").val() != null) {
					initData['del'] && initData['del']($(this).parents('.item').find("input:hidden").val());
				}
				if(fileCount < initData['fileNumLimit']) {
					$(initData['continueBtn']).show();
				}
			}
		});
		// 验证
		init[initData['uploaderObj']].on("error", function(type) {
			if(type == "F_DUPLICATE") {
				window.parent.vdialog({
					title: '系统提示',
					type: 'error',
					modal: true,
					content: "您已经上传了一份，请不要重复上传！",
					ok: true
				});
			} else if(type == "F_EXCEED_SIZE") {
				window.parent.vdialog({
					title: '系统提示',
					type: 'error',
					modal: true,
					content: "单个图片的大小不可超过 3M 哦！换个小点的文件吧！",
					ok: true
				});
			} else if(type == "Q_EXCEED_NUM_LIMIT") {
				window.parent.vdialog({
					title: '系统提示',
					type: 'error',
					modal: true,
					content: "您准备上传的照片超过限定的数量啦！",
					ok: true
				});
			} else if(type == "Q_TYPE_DENIED") {
				window.parent.vdialog({
					title: '系统提示',
					type: 'error',
					modal: true,
					content: "请上传系统规定的文件<br />gif，jpg，jpeg，bmp，png",
					ok: true
				});
			}
		});
		// 鼠标进入li 效果
		$(initData['uploaderBox']).on('mouseenter', '.queueList li.item', function() {
			$(this).find('.file-panel').stop().animate({ height: 29 });
		});
		$(initData['uploaderBox']).on('mouseleave', '.queueList li.item', function() {
			$(this).find('.file-panel').stop().animate({ height: 0 });
		});
		$(initData['uploaderBox']).on('click', '.retry', function() {
			init[initData['uploaderObj']].retry();
		});
	}
	var levelLinkage = function(obj, treeObj, initId, callback) {
		var _this = $(obj);
		var RoleNodesContent = [];
		eosAjax(
			EOS_COMMON_API + 'api/common/organization',
			'GET', {
				"AccessToken": storage.get("AccessToken"),
				"Parameters": {
					"Type": "3"
				}
			},
			'json',
			function(results) {
				if(checkCode(results.State, results.Message)) {
					var setting = {
						check: { enable: true },
						view: { showLine: false, showIcon: true, dblClickExpand: false, selectedMulti: false },
						data: { simpleData: { enable: true } },
						callback: { onClick: onClick, onCheck: zTreeOnCheck }
					};
					RoleNodesContent = results.Data;

					function onClick(e, treeId, treeNode) {
						var tree = $.fn.zTree.getZTreeObj(treeId);
						tree.expandNode(treeNode);
					}

					function setCheck(e, treeId, treeNode) {
						var zTree = $.fn.zTree.getZTreeObj(treeId),
							type = { "Y": ps, "N": s };
						zTree.setting.check.chkboxType = type;
					}

					function zTreeOnCheck(e, treeId, treeNode) {
						var tree = $.fn.zTree.getZTreeObj(treeId);
						var nodeArrTrue = tree.getCheckedNodes(true);
						var nodeArrFalse = tree.getCheckedNodes(false);
						$(".tree_panel").empty();
						for(var i = 0; i < nodeArrTrue.length; i++) {
							if(nodeArrTrue[i].levels == 3) {
								_this.find(".tree_panel").append("<li data-id=" + nodeArrTrue[i]["id"] + ">" + nodeArrTrue[i]["name"] + "</li>")
							}
						}
						for(var j = 0; j < nodeArrFalse.length; j++) {
							_this.find(".tree_panel li").each(function() {
								if($(this).attr("data-id") == nodeArrFalse[j].id) {
									$(this).remove();
								}
							})
						}
					}

					var levelLinkageTree = $("#" + treeObj)
					$.fn.zTree.init(levelLinkageTree, setting, RoleNodesContent, "RoleMenu");
					if(initId != "") {
						_this.find(".tree_panel").empty();
						var tree = $.fn.zTree.getZTreeObj(treeObj);
						for(var i = 0; i < initId.length; i++) {
							_this.find(".tree_panel").append("<li data-id=" + initId[i]['id'] + ">" + initId[i]['name'] + "</li>")
							var node = tree.getNodeByParam("id", initId[i]['id']);
							tree.checkNode(node, true, true);
						}
					}
					_this.find(".comfirn").click(function() {
						var arr = [];
						for(var i = 0; i < _this.find(".tree_panel li").length; i++) {
							arr.push(_this.find(".tree_panel li").eq(i).attr("data-id"))
						}
						callback && callback(_this.find(".tree_panel").html());
					});
				}
			}
		)
	}
	var resetFrom = function() {
		$(".fa-check-circle").addClass("hide");
		$(".focus,.valid").removeClass("error");
		$(".mustIp").removeClass("v_error");
		$(".focus,.valid").text("");
	}
	var resetNiceScroll = function() {
		$(".body-content").getNiceScroll().resize();
	}

	//var oldTimes = "2017-07-09T03:59:33.041Z"
	var eosFormatTime = function(oldTime) {
		var time1 = oldTime.split('T')[0];
		var time2 = oldTime.split('15')[1];
		// console.log('中国：', time2);
		var h = parseInt(oldTime.split('T')[1].split(':')[0]);
		// console.log('小时：', h);
		var newH = ((h + 8 < 24) ? (h + 8) : (h + 8) % 24).toString();
		return time1 + 'T' + newH + time2;
	}
	
	//var oldTimes1 = "2017-07-10 03:28:54"
	var eosFormatTime2 = function(oldTimes1) {
		var stringTime = oldTimes1;
		var timestamp2 = Date.parse(new Date(stringTime));		
		timestamp2=timestamp2+8*3600*1000;
			function   formatDate(now)   {     
              var   year=now.getFullYear();     
              var   month=now.getMonth()+1;     
              var   date=now.getDate();     
              var   hour=now.getHours();     
              var   minute=now.getMinutes();     
              var   second=now.getSeconds();     
              return   year+"-"+month+"-"+date+"   "+hour+":"+minute+":"+second;     
             }
			var d=new Date(timestamp2);
		return formatDate(d);
	}
	//增、删、改、查等功能权限操作
	var eosOperators = function(operatorData) {
		var eleParams={
				insert:$('.OperatorInsert'),
				deletes:$('.OperatorDel'),
				edit:$('.OperatorEdit'),
//				{
//					edit:$('.OperatorEdit'),
//					set:$('.OperatorSet')
//				},
				search:$('.OperatorSearch'),
				print:$('.OperatorPrint'),
				exports:$('.OperatorExports'),
				imports:$('.OperatorImports'),
				refresh:$('.OperatorRefresh'),
				examine:$('.OperatorExamine'),
				copy:$('.OperatorCopy')	,
				publish:$('.OperatorPublish'),
				download:$('.OperatorDownload'),
				cancel:$('.OperatorCancel'),
				distribute:$('.OperatorDistribute'),
				upload:$('.OperatorUpload')
			}
		var isEX=operatorData.IsExperienceProject;
		var isSelf=operatorData.IsSelfProject;
		for(var prop in eleParams){
			if(eleParams[prop]){
				if(isEX){
					if(prop=='search'){
						continue;
					}
				}
				if(!isSelf){
					if(prop=='search'){
						continue;
					}
				}
				((operatorData[prop] == 1) && (!isEX)&&(isSelf)) ? eleParams[prop].show() : eleParams[prop].hide();
			}
		}
//		//有新增功能
//		if(eleParams.insert) {
//			((operatorData.insert == 1) && (!isEX) )? eleParams.insert.show() : eleParams.insert.hide(); //有新增功能						
//		}
//		//有删除功能
//		if(eleParams.deletes) {
//			((operatorData.deletes == 1) && (!isEX))? eleParams.deletes.show() : eleParams.deletes.hide();
//		}
//		//有修改功能
//		if(eleParams.edits.edit && eleParams.edits.set) {
//			((operatorData.edit == 1) && (!isEX))? eleParams.edits.edit.show() && eleParams.edits.set.show() : eleParams.edits.edit.hide() && eleParams.edits.set.hide(); //有修改功能						
//		}
//		if(eleParams.edits.edit) {
//			((operatorData.edit == 1) && (!isEX))? eleParams.edits.edit.show() : eleParams.edits.edit.hide();
//		}
//		//有查找功能
//		if(eleParams.search) {
//			operatorData.search == 1? eleParams.search.show() : eleParams.search.hide();
//		}
//		//打印功能
//		if(eleParams.print) {
//			((operatorData.print == 1)  && (!isEX))? eleParams.print.show() : eleParams.print.hide();
//		}
//		//导出功能
//		if(eleParams.exports) {
//			((operatorData.exports == 1) && (!isEX))? eleParams.exports.show() : eleParams.exports.hide();
//		}
//		//导入功能
//		if(eleParams.imports) {
//			((operatorData.imports == 1) && (!isEX))? eleParams.imports.show() : eleParams.imports.hide();
//		}
//		//刷新功能examine
//		if(eleParams.refresh) {
//			((operatorData.refresh == 1)  && (!isEX))? eleParams.refresh.show() : eleParams.refresh.hide();
//		}
//		//审核功能
//		if(eleParams.examine) {
//			((operatorData.examine == 1)  && (!isEX))? eleParams.examine.show() : eleParams.examine.hide();
//		}
//		//复制功能
//		if(eleParams.copy) {
//			((operatorData.copy == 1)  && (!isEX))? eleParams.copy.show() : eleParams.copy.hide();
//		}
//		//发布功能
//		if(eleParams.publish) {
//			((operatorData.publish == 1)  && (!isEX))? eleParams.publish.show() : eleParams.publish.hide();
//		}
//		//下载功能
//		if(eleParams.download) {
////			console.log('operatorData.download111:',operatorData.download);
//			((operatorData.download == 1) && (!isEX))? eleParams.download.show() : eleParams.download.hide();
//		}//取消功能
//		if(eleParams.cancel) {
//			((operatorData.cancel == 1)  && (!isEX))? eleParams.cancel.show() : eleParams.cancel.hide();
//		}//派发功能
//		if(eleParams.distribute) {
//			((operatorData.distribute == 1)  && (!isEX))? eleParams.distribute.show() : eleParams.distribute.hide();
//		}//上传功能
//		if(eleParams.upload) {
//			((operatorData.upload == 1)  && (!isEX))? eleParams.upload.show() : eleParams.upload.hide();
//		}
//		console.log('编辑按钮22222：',$('.OperatorBtnEdit'));				
		
	}
	var getPrintOptions=function(columArr){
			var noPrintOptions ={};
			var operatorData=eosOperDataHandle();
			var hasPrintOptions={
		            extend: "print",
		            exportOptions: {
		                "columns":columArr
		            }
	           }
				var printOptions=operatorData.print == 1 ? hasPrintOptions:operatorData
				return printOptions
		}
	var eosOperDataHandle = function() {		
		myData = JSON.parse(JSON.parse(storage.get('treeNode')).OperateSet);
		var IsExperienceProject=storage.get('IsExperienceProject');
		var IsSelfProject=storage.get('IsSelfProject');
		var EntitySort = Number(storage.get('EntitySort'));
		//console.log('myData:',myData)
		if(IsExperienceProject==1){
			IsExperienceProject=true
		}else{
			IsExperienceProject=false;
		}
		if(EntitySort==2){
			IsSelfProject=true
		}else{
			if(IsSelfProject==1){
				IsSelfProject=true
			}else{
				IsSelfProject=false;
			}
		}
		
//		 console.log('获取权限数据oo：',IsExperienceProject);
		operatorData = {
			insert: myData['CREATE'],
			deletes: myData['DELETE'],
			edit: myData['UPDATE'],
			search: myData['QUERY'],
			copy: myData['COPY'],
			print: myData['PRINT'],
			exports: myData['EXPORT'],
			imports: myData['IMPORT'],
			refresh: myData['REFRESH'],
			examine: myData['APPROVE'],
			publish: myData['PUBLISH'],
			download: myData['DOWNLOAD'],			
			cancel: myData['CANCEL'],		
			distribute: myData['DISTRIBUTE'],
			upload: myData['UPLOAD'],
			IsExperienceProject:IsExperienceProject,
			IsSelfProject:IsSelfProject
		}
		return operatorData;
	}
    var formatSeconds = function (value) {
        var secondTime = parseInt(value);// 秒
        var minuteTime = 0;// 分
        var hourTime = 0;// 小时
        if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
            //获取分钟，除以60取整数，得到整数分钟
            minuteTime = parseInt(secondTime / 60);
            //获取秒数，秒数取佘，得到整数秒数
            secondTime = parseInt(secondTime % 60);
            //如果分钟大于60，将分钟转换成小时
            if(minuteTime > 60) {
                //获取小时，获取分钟除以60，得到整数小时
                hourTime = parseInt(minuteTime / 60);
                //获取小时后取佘的分，获取分钟除以60取佘的分
                minuteTime = parseInt(minuteTime % 60);
            }
        }
        var result = "" + parseInt(secondTime) + "秒";
        if(minuteTime > 0) {
            result = "" + parseInt(minuteTime) + "分" + result;
        }
        if(hourTime > 0) {
            result = "" + parseInt(hourTime) + "小时" + result;
        }
        return result;
    }
    return {
    	EOS_URL:EOS_URL,
        APP_API: EOS_APP_API,
        COMMON_API: EOS_COMMON_API,
        IOT_API: EOS_IOT_API,
        OPEN_API: EOS_OPEN_API,
        ENTERPRISE_API: EOS_ENTERPRISE_API,
        REPORTS_API: EOS_REPORTS_API,
        PLATFORM_API: EOS_PLATFORM_API,
        USER_API: EOS_USER_API,
        RESOURCES_API: EOS_RESOURCES_API,
        INSERT_MSG: INSERT_MSG,
		INSERT_IMG_MSG: INSERT_IMG_MSG,
		INSERT_FILE_MSG: INSERT_FILE_MSG,
		UPDATE_MSG: UPDATE_MSG,
		UPDATE_IMG_MSG: UPDATE_IMG_MSG,
		UPDATE_FILE_MSG: UPDATE_FILE_MSG,
		DELETE_MSG: DELETE_MSG,
		DELETE_IMG_MSG: DELETE_IMG_MSG,
		DELETE_FILE_MSG: DELETE_FILE_MSG,
		FAULT_CONFIRM_ASK: FAULT_CONFIRM_ASK,
		DELETE_MSG_ASK: DELETE_MSG_ASK,
		DELETE_IMG_ASK: DELETE_IMG_ASK,
		DELETE_FILE_ASK: DELETE_FILE_ASK,
		SET_PERMISSION: SET_PERMISSION,
		UPDATE_DIRECTORY: UPDATE_DIRECTORY,
		CREATE_DIRECTORY: CREATE_DIRECTORY,
		DELETE_DIRECTORY: DELETE_DIRECTORY,
		UPDATE_DFOLDER: UPDATE_DFOLDER,
		CREATE_DFOLDER: CREATE_DFOLDER,
		DELETE_DFOLDER: DELETE_DFOLDER,
		MOVE_FILE: MOVE_FILE,
		SEND_NOTICE: SEND_NOTICE,
		SUBSCRIBE_MSG: SUBSCRIBE_MSG,
		UNSUBSCRIBE_MSG: UNSUBSCRIBE_MSG,
		CONFIRM_SCC:CONFIRM_SCC,
		LOCK_MSG:LOCK_MSG,
		UNLOCK_MSG:UNLOCK_MSG,
		loginDialog: loginDialog,
		encryptedDes: encryptedDes,
		decryptedDes: decryptedDes,
		eosAjax: eosAjax,
		eosMaxAjax:eosMaxAjax,
		login: login,
		checkCode: checkCode,
		valueCheck: valueCheck,
		eosCookie: eosCookie,
		storage: storage,
		getUrlParam: getUrlParam,
		getTime: getTime,
		cityLinage: cityLinage,
		eosMessage: eosMessage,
		eosUpdataAvatar: eosUpdataAvatar,
		eosUploaderFile: eosUploaderFile,
		eosUploaderImg: eosUploaderImg,
		levelLinkage: levelLinkage,
		resetFrom: resetFrom,
		resetNiceScroll: resetNiceScroll,
		eosFormatTime: eosFormatTime,
		eosFormatTime2: eosFormatTime2,
		eosOperators: eosOperators,
		eosOperDataHandle: eosOperDataHandle,
		formatSeconds: formatSeconds,
		getPrintOptions:getPrintOptions,
		timer:timer
	}
}())
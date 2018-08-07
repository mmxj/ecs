import 'plugins/crypto/tripledes.js'
import axios from 'axios'
import qs from 'qs'

let decryptedDes = function(message, keyHex) {
	let decrypted = CryptoJS.DES.decrypt({
		ciphertext: CryptoJS.enc.Base64.parse(message)
	}, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return decrypted.toString(CryptoJS.enc.Utf8);
}

// cookie 操作
let eosCookie = {
	// 获取cookie : 名字
	eCodeTxt: 'canlead',
	get: function(name) {
		let nameEQ = name + "=";
		let ca = document.cookie.split(";");
		for(let i = 0; i < ca.length; i++) {
			let c = ca[i];
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
			for(let key in name) {
				let d = new Date();
				d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
				let expires = "expires=" + d.toGMTString();
				document.cookie = key + "=" + name[key] + "; " + expires;
			}
		}
	},
	// 删除cookie : 名字  names 可以传一个数组进来  ["a","b"]
	remove: function(names) {
		let arr = [];
		if(names instanceof Array) {
			names = names;
		} else {
			arr.push(names)
			names = arr;
		}
		for(let i = 0, l = names.length; i < l; i++) {
			document.cookie = names[i] + "=" + "" + "; -1";
		}
		return names;
	}
}
let encryptedDes = function(message, keyHex) {
	let encrypted = CryptoJS.DES.encrypt(message, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt), {
		mode: CryptoJS.mode.ECB,
		padding: CryptoJS.pad.Pkcs7
	});
	return encrypted.toString();
}
// 比对状态码
// stateCode  状态码
// mes        消息内容
// 判断是否登录
let loginDialog = false;
let login = function(mes) {
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
let vdialogs = '';
let checkCode = function(stateCode, mes) {
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
//根据返回数组设置操作权限的值
let setOperateSet = function(arr) {
	let OperateSet = {
        "CanPrint": "0",
        "CanExport": "0",
        "CanImport": "0",
        "CanRefresh": "0",
        "CanCReate": "0",
        "CanUpdate": "0",
        "CanDelete": "0",
        "CanQury": "0",
        "CanApprove": "0",
        "CanCopy": "0",
        "CanPublish": "0",
        "CanDownLoad": "0",
        "CanCancel": "0",
        "CanDistribute": "0",
        "CanUpload": "0"
	}
	for(let item of arr){
		switch(item)
		{
			case '新增':OperateSet.CanCReate=1;break;
			case '删除':OperateSet.CanDelete=1;break;
			case '编辑':OperateSet.CanUpdate=1;break;
			case '查询':OperateSet.CanQury=1;break;
			case '打印':OperateSet.CanPrint=1;break;
			case '导出':OperateSet.CanExport=1;break;
			case '导入':OperateSet.CanImport=1;break;
			case '刷新':OperateSet.CanRefresh=1;break;
			case '审核':OperateSet.CanApprove=1;break;
			case '复制':OperateSet.CanCopy=1;break;
			case '下发':OperateSet.CanPublish=1;break;
			case '下载':OperateSet.CanDownLoad=1;break;
			case '取消':OperateSet.CanCancel=1;break;
			case '派发':OperateSet.CanDistribute=1;break;
			case '上传':OperateSet.CanUpload=1;break;
			default:break;
		}
	}
	return OperateSet
}

//根据操作权限的值设置多选控件数据回显
let setOperateSetArr = function(OperateSetObj) {
	// console.log(OperateSetObj)
	let arr = []
	for(let item in OperateSetObj){
		switch(item)
		{
			case 'PRINT':if(OperateSetObj[item]==1)arr.push('打印');break;
			case 'EXPORT':if(OperateSetObj[item]==1)arr.push('导出');break;
			case 'IMPORT':if(OperateSetObj[item]==1)arr.push('导入');break;
			case 'REFRESH':if(OperateSetObj[item]==1)arr.push('刷新');break;
			case 'CREATE':if(OperateSetObj[item]==1)arr.push('新增');break;
			case 'UPDATE':if(OperateSetObj[item]==1)arr.push('编辑');break;
			case 'DELETE':if(OperateSetObj[item]==1)arr.push('删除');break;
			case 'QUERY':if(OperateSetObj[item]==1)arr.push('查询');break;
			case 'APPROVE':if(OperateSetObj[item]==1)arr.push('审核');break;
			case 'COPY':if(OperateSetObj[item]==1)arr.push('复制');break;
			case 'PUBLISH':if(OperateSetObj[item]==1)arr.push('下发');break;
			case 'DOWNLOAD':if(OperateSetObj[item]==1)arr.push('下载');break;
			case 'CANCEL':if(OperateSetObj[item]==1)arr.push('取消');break;
			case 'DISTRIBUTE':if(OperateSetObj[item]==1)arr.push('派发');break;
			case 'UPLOAD':if(OperateSetObj[item]==1)arr.push('上传');break;
			default:break;
		}
	}
	return arr
}



//校验器
let Validator = {}
Validator.classIdArr = (rule, value, callback) => {
	let res = true
	if (!value) res = false
	if (!res) {
	  return callback(new Error('设备型号不能为空'));
	}else {
		callback();
	}
};
Validator.account = (rule, value, callback) => {
	let patt = /^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9_]{1,9}$/ //字母或中文开头，允许2-10字节，允许字母或中文数字下划线
	if (!patt.test(value)) {
	  return callback(new Error('申请人名称格式不正确'));
	}else {
		callback();
	}
};
Validator.phoneNum = (rule, value, callback) => {
	let patt = /^\d{11}$/ //手机号码
	if (!patt.test(value)) {
	  return callback(new Error('手机号码格式不正确'));
	}else {
		callback();
	}
};
Validator.pos = (rule, value, callback) => {
	if (value=='') {
		return callback()
	}
	let patt = /^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9_]{2,20}$/ //字母或中文开头，允许3-20位，允许字母或中文数字下划线
	if (!patt.test(value)) {
	  return callback(new Error('申请人职务格式不正确'));
	}else {
		callback();
	}
};
Validator.usc = (rule, value, callback) => {
	let patt = /^[\da-zA-Z_-]{0,18}$/ //字母或中文开头，允许1-18位，允许字母或中文数字下划线
	if (!patt.test(value)) {
	  return callback(new Error('信用代码格式不正确'));
	}else {
		callback();
	}
};
Validator.org = (rule, value, callback) => {
	let patt = /^[\da-zA-Z_-]{0,10}$/ //字母或中文开头，允许1-10位，允许字母或中文数字下划线
	if (!patt.test(value)) {
	  return callback(new Error('代码证格式不正确'));
	}else {
		callback();
	}
};
Validator.rec = (rule, value, callback) => {
	let patt = /^[\d]{0,10}$/ //字母或中文开头，允许1-10位，允许字母或中文数字下划线
	if (!patt.test(value)) {
	  return callback(new Error('注册资本必须为数字值'));
	}else {
		callback();
	}
};
Validator.stn = (rule, value, callback) => {
	let patt = /^[\d]{0,10}$/ //字母或中文开头，允许1-10位，允许字母或中文数字下划线
	if (!patt.test(value)) {
	  return callback(new Error('员工数量必须为数字值'));
	}else {
		callback();
	}
};
Validator.agree = (rule, value, callback) => {
	if (!value) {
	  return callback(new Error('同意条款后方能继续操作'));
	}else {
		callback();
	}
};
Validator.comName = (rule, value, callback) => {
	let patt = /^[\u4E00-\u9FA5a-zA-Z][\u4E00-\u9FA5a-zA-Z0-9_]{2,24}$/ //字母或中文开头，允许3-25字节，允许字母或中文数字下划线
	if (!patt.test(value)) {
	  return callback(new Error('公司名称格式不正确'));
	}else {
		callback();
	}
};
Validator.verNoComma = (rule, value, callback) => {
	if (value.indexOf(',')>=0) {
	  return callback(new Error('版本号不能含有逗号'));
	}else {
		callback();
	}
};
Validator.checkOrd = (rule, value, callback) => {
	if (value==='') {
	  return callback(new Error('该值不能为空'));
	}
	let valueInt = parseInt(value)
	if (!Number.isInteger(value)&&valueInt!=value) {
		callback(new Error('请输入数字值'));
	} else {
		callback();
	}
};
Validator.isSameStateNames = (runStateNames, offStateNames) => {
	for (let runIndex in runStateNames) {
		for (let offIndex in offStateNames) {
				if (runStateNames[runIndex]==offStateNames[offIndex]) {
					return true
				}	
			}		
	}
	return false
};
Validator.checkProjectSelected = (rule, value, callback) => {
	let length = value.length
	if (length>3) {
		callback(new Error('体验项目数不能大于3'));
	} else {
		callback();
	}
};
Validator.isEmptyArr = (rule, value, callback) => {
	console.log(value)
	let length = value.length
	if (length==0) {
		callback(new Error('请选择服务人员'));
	} else {
		callback();
	}
};
//Storage存取
let Storage = {}
Storage.set = function(name, value) {
			if(name instanceof Object) {
				for(let key in name) {
					window.localStorage.setItem(encryptedDes(key, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)), encryptedDes(name[key].toString(), CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)));
				}
			} else {
				window.localStorage.setItem(encryptedDes(name, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)), encryptedDes(value.toString(), CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)));
			}
		}

Storage.get = function(name) {
			if(window.localStorage.getItem(encryptedDes(name, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt))) != null) {
				return decryptedDes(window.localStorage.getItem(encryptedDes(name, CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt))), CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt));
			}
		}

Storage.clear = function() {
			window.localStorage.clear();
		}

Storage.remove = function(name) {
			let arr = [];
			if(name instanceof Array) {
				arr = name;
			} else {
				arr.push(name);
			}
			for(let i = 0, l = arr.length; i < l; i++) {
				window.localStorage.removeItem(encryptedDes(arr[i], CryptoJS.enc.Utf8.parse(eosCookie.eCodeTxt)));
			}
		}

//由于数据结构的需要,把数组分成name和id的字符串,以逗号隔开
let setProjectData = function(dataArr){
      let nameStr = ''
      let idStr = ''
      for (let item of dataArr) {
        let tempItem = item.split(':')
        nameStr += `${tempItem[0]},`
        idStr += `${tempItem[1]},`
      }
      let obj = {
        name: nameStr.substring(0, nameStr.lastIndexOf(',')),
        id:idStr.substring(0, idStr.lastIndexOf(','))
      }
      return obj
    };

/**
 * 树形结构转换
 * @param a 转换对象
 * @param idStr id名称
 * @param pidStr 父id名称
 * @param chindrenStr 子ID名称
 * @returns {Array}
 例子: let result = FUNC.setTreeNodes(res, 'id', 'pId', 'children')
 */
let setTreeNodes = function(a, idStr, pidStr, childrenStr) {
	let defaultOpenArr = []
    let r = [], hash = {}, id = idStr, pid = pidStr, children = childrenStr, i = 0, j = 0, len = a.length;    
    for(; i < len; i++){    
        hash[a[i][id]] = a[i];
        if (a[i].open) defaultOpenArr.push(a[i].id)
    }    
    for(; j < len; j++){    
        let aVal = a[j], hashVP = hash[aVal[pid]];    
        if(hashVP){    
            !hashVP[children] && (hashVP[children] = []);    
            hashVP[children].push(aVal);    
        }else{    
            r.push(aVal);    
        }    
    }
    return {
    	tree:r,
    	defaultOpen:defaultOpenArr
    };  
}

//延时执行工具,专门用于截流,一般用于keyup,resize等事件触发后的函数
/*
参数说明:
timeId: 用于清除上一次的time id,释放内存
_this: 用于传入函数的所属对象,一般是vue里面的this
funcName: 函数名,这里需要的是字符串
args: 传入函数中执行的参数,必须使用数组把需要传入的参数包起(就算参数只有一个)
*/
let debounce = function(timeId, _this, funcName, args) {
  let vm = _this
  clearTimeout(timeId)
  vm.timeId = setTimeout(function() {
  	if (args) {
  		vm[funcName](...args)
  	}else{
    	vm[funcName]()
  	}
  }, 300)
}

//节点工具
let TreeNodeTools = {}
TreeNodeTools.setTreeNodeAuth = (path) => {
	let TreeMenu = Storage.get('TreeMenu')
	TreeMenu = JSON.parse(TreeMenu)
	for (let item of TreeMenu) {
		if (item.file === path) {
		  Storage.set('treeNode', JSON.stringify(item));
		  // console.log('权限设置成功，filepath名称：', path)
		  return
		}
	}
	console.log('权限设置失败，filepath名称：', path)
}

TreeNodeTools.setTreeNodeAuthByName = (name) => {
	let TreeMenu = Storage.get('TreeMenu')
	TreeMenu = JSON.parse(TreeMenu)
	for (let item of TreeMenu) {
		if (item.name === name) {
		  let res = JSON.parse(item.OperateSet)
		  return res
		}
	}
	console.log('权限设置失败，页面名称：', name)
}

let Operator = {}
Operator.eosOperDataHandle = function(myData) {
		myData = myData||JSON.parse(JSON.parse(Storage.get('treeNode')).OperateSet);
		// console.log(myData)
		let isEx = Storage.get('IsExperienceProject');//判断是否体验项目
		let IsSelf = Storage.get('IsSelfProject');//判断是否自建项目
		isEx = isEx?parseInt(isEx):isEx
		IsSelf = IsSelf?parseInt(IsSelf):IsSelf

		let operatorData = {
			create: myData['CREATE'],
			delete: myData['DELETE'],
			update: myData['UPDATE'],
			query: myData['QUERY'],
			copy: myData['COPY'],
			print: myData['PRINT'],
			export: myData['EXPORT'],
			import: myData['IMPORT'],
			refresh: myData['REFRESH'],
			approve: myData['APPROVE'],
			publish: myData['PUBLISH'],
			download: myData['DOWNLOAD'],
			cancel: myData['CANCEL'],
			distribute: myData['DISTRIBUTE'],
			upload: myData['UPLOAD'],
		}
		// console.log(operatorData)

		if(isEx||IsSelf!=1){
			let obj = {}
			for (let index in operatorData) {
				obj[index] = 0
			}
			// console.log(obj)
			obj.query = operatorData.query
			return obj
		}else{
			return operatorData;
		}
	}

Operator.operateRoleFilter = function(isEx,isSelf){
	let IsAdmin = Storage.get('IsAdmin')
	let IsProjectAdmin = Storage.get('IsProjectAdmin')
	let EntitySort = Storage.get('EntitySort')
	// console.log(IsAdmin,IsProjectAdmin,EntitySort,isEx)
	if(EntitySort==2 && (IsAdmin==1||IsProjectAdmin==1)) return true
	if(isEx==1) return false //只要是体验项目或设备,一律不显示编辑按钮
	if(isSelf==0) return false //只要是体验项目或设备,一律不显示编辑按钮
	if(IsAdmin==1||IsProjectAdmin==1) return true
	// if(EntitySort==2 && (IsAdmin==1||IsProjectAdmin==1)) return true
	
	return false	
}

Operator.isAdminOrProjectAdmin = function(){
	let IsAdmin = Storage.get('IsAdmin')
	let IsProjectAdmin = Storage.get('IsProjectAdmin')
	IsAdmin=Number(IsAdmin)
	IsProjectAdmin=Number(IsProjectAdmin)
	// console.log('是否管理员:',IsAdmin||IsProjectAdmin)
	return IsAdmin||IsProjectAdmin	
}

let Axios = {}
Axios.axiosGet = function(url,params) {
      params = qs.stringify(params)
      url = `${url}?${params}`
      return axios.get(url)
}

Axios.axiosPost = function(url,params) {
      params = qs.stringify(params)
      return axios.post(url, params)
}

Axios.axiosPut = function(url,data) {
      data = qs.stringify(data)
      return axios.put(url, data)
}

Axios.axiosDelete = function(url,data) {
      return axios.delete(url, {
        data: data
      })
}

Axios.axiosAll = function(questArray) {
      return axios.all(questArray)
}

//该方法有问题,请勿使用
Axios.axiosSpread = function(callback) {
      return axios.spread(callback())
}

let date = {
	// 时间格式化用法：
	// Date.prototype.format = FUNC.date.format
	// this.addFunForm.BeginTime = (new Date()).format("yyyy-MM-dd hh:mm:ss")
	format:function(fmt) { 
	     var o = { 
	        "M+" : this.getMonth()+1,                 //月份 
	        "d+" : this.getDate(),                    //日 
	        "h+" : this.getHours(),                   //小时 
	        "m+" : this.getMinutes(),                 //分 
	        "s+" : this.getSeconds(),                 //秒 
	        "q+" : Math.floor((this.getMonth()+3)/3), //季度 
	        "S"  : this.getMilliseconds()             //毫秒 
	    }; 
	    if(/(y+)/.test(fmt)) {
	            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	    }
	     for(var k in o) {
	        if(new RegExp("("+ k +")").test(fmt)){
	             fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
	         }
	     }
	    return fmt; 
	}
}

let array = {
  // 数组比较用法：
  // Array.prototype.equals = FUNC.array.equals
  // let boolean = arr1.equals(arr2)
  equals: function(array) {
    // if the other array is a falsy value, return
    if (!array)
      return false;

    // compare lengths - can save a lot of time 
    if (this.length != array.length)
      return false;

    for (var i = 0, l = this.length; i < l; i++) {
      // Check if we have nested arrays
      if (this[i] instanceof Array && array[i] instanceof Array) {
        // recurse into the nested arrays
        if (!this[i].equals(array[i]))
          return false;
      } else if (this[i] != array[i]) {
        // Warning - two different object instances will never be equal: {x:20} != {x:20}
        return false;
      }
    }
    return true;
  }
}

//校验器
let page = {}

page.firstPage = (PageIndex, PageSize, Total) => {
      let firstPage = PageIndex * PageSize - PageSize + 1
      let res = Total != 0 ? firstPage : 0
      return res
};

page.lastPage = (PageIndex, PageSize, Total) => {
      let lastPage = PageIndex * PageSize
      let res = lastPage < Total ? lastPage : Total
      return res
};

let projectContr={
		/*	ensotity:0业主,1维保商,2平台管理	 
		 * isProjectAdmin:项目管理员，0否，1是
		 * isProjectLeader:项目负责人，0否，1是
		 * IsDualId:维保方...相对项目来说是否是双重身份
		 * 
		 * */
		//默认传的参数返回true	
		/*项目 列表 中 的 增删改权限*/
		projectAdd(isAdmin=1,IsProjectAdmin=1){
			if(isAdmin==1||IsProjectAdmin==1){
				return true;
			}
			return false
	
		},
		projectEdit(ensotity=0,isAdmin=1,IsProjectAdmin=1,IsDualId=0,isProjectLeader=0,IsTrue=0,IsExperienceProject=1, IsSelfProject=0){
			//双重身份维保方把维保权给出去，IsTrue返回0，相对当前项目来说自己变成了为业主
			//双重身份维保方把业主权给出去，IsTrue返回1，相对当前项目来说自己变成了真是维保商
			if(IsSelfProject==0){
				return false;
			}
			if(IsExperienceProject==1){
				return false;
			}
			//if((((ensotity==0&&IsTrue==1)||(ensotity==1 && IsTrue==0)||IsDualId==1) && (isAdmin==1||IsProjectAdmin==1||isProjectLeader==1))||(ensotity==1 && isAdmin==1)){
			if(((IsDualId==1||ensotity==0||ensotity==1) && (isAdmin==1||IsProjectAdmin==1||isProjectLeader==1))){
				return true;
			}
			return false;
		},
		projectDelete(ensotity=0,isAdmin=1,IsProjectAdmin=1,IsDualId=0,IsTrue=0,IsExperienceProject=1, IsSelfProject=0){
			if(IsSelfProject==0){
				return false;
			}
			if(IsExperienceProject==1){
				return false;
			}
			if(((ensotity==0&&IsTrue==1)||(ensotity==1 && IsTrue==0)||IsDualId==1) && (isAdmin==1||IsProjectAdmin==1)){
				return true;
			}
			return false
	
		},
		projectLock(ensotity=0,isAdmin=1,isProjectLeader=1,IsDualId=0,IsTrue=0,IsExperienceProject=1,IsSelfProject=0){
			if(IsSelfProject==0){
				return false;
			}
			if(IsExperienceProject==1){
				return false;
			}
			if(((ensotity==0&&IsTrue==1)||(ensotity==1 && IsTrue==0)||IsDualId==1) && (isAdmin==1||isProjectLeader==1)){
				return true;
			}
			return false
		},
		/*isPseudoOwner(ensotity=0,IsTrue=0){
			if((ensotity==1&&IsTrue==0)||(ensotity==0&&IsTrue==1)){
				return true;
			}else{
				return false;
			}
		},*/
		/*项目编辑下模块权限*/
		editBasic(IsDualId=0,ensotity=0,isAdmin=1,IsProjectAdmin=1,IsTrue=0){
			//双重身份维保方把维保权给出去，IsTrue返回0，相对当前项目来说自己变成了为业主
			//双重身份维保方把业主权给出去，IsTrue返回1，相对当前项目来说自己变成了真是维保商
			if(((ensotity==0&&IsTrue==1)||(ensotity==1&&IsTrue==0)||IsDualId==1||ensotity==2)&&(isAdmin==1||IsProjectAdmin==1)){			
				return true;
			}
			return false
	
		},
		CodeInfo(IsDualId=0,ensotity=0,isAdmin=1,isProjectLeader=1,IsTrue=0,IsProjectAdmin=1){
			if((ensotity==2)&&(isAdmin==1||IsProjectAdmin==1)){
				return true;			
			}
			if(((ensotity==0 && IsTrue==1)||(ensotity==1 && IsTrue==0)||IsDualId==1) && (isAdmin==1||isProjectLeader==1)){			
				return true;
			}
			return false
		},
		
		/*工单管理和服务管理模块(...)*/
		isProjectAdmin(isProjectLeader=1){
			if(isProjectLeader==1){			
				return false;
			}			
			return true;
		},
		/**其它操作...是否可以编辑维保商或业主信息**/
		isCanEditChargersInfo(ensotity=0,isAdmin=1,IsDualId=0,IsTrue=0,IsProjectAdmin=0){		
			if((ensotity==2)&&(isAdmin==1||IsProjectAdmin==1)){
				return true;			
			}
			if((IsDualId==1 && isAdmin==1)||((((ensotity== 1&&IsTrue==0)||(ensotity== 0&&IsTrue==1)))&& isAdmin==1)){
				return true;
			}
			return false;
		},
		isCanEditWbInfo(ensotity=0,isAdmin=1,IsDualId=0,IsTrue=0,IsProjectAdmin=0){
			if((ensotity==2)&&(isAdmin==1||IsProjectAdmin==1)){
				return true;			
			}
			if(((((ensotity== 1 && IsTrue==1)||(ensotity== 0 && IsTrue==0))) && isAdmin==1)||(IsDualId==1 && isAdmin==1)){
				return true;
			}
			return false;
		},
		equipmentAdd(isAdmin=1,IsProjectAdmin=1,IsExperienceProject=1,IsSelfProject=0){	
			let EntitySort = Number(Storage.get('EntitySort'));
			if(EntitySort==2 && (isAdmin==1||IsProjectAdmin==1)) return true;
			if(IsExperienceProject==1){
				return false;			
			}
			if(IsSelfProject==0){
				return false;			
			}
			if(isAdmin==1||IsProjectAdmin==1){
				return true;
			}
			return false
	
		},
		/****平台管理权限控制*******/
		/*项目*/
		isCanOperate(EntitySort=0,IsAdmin=0,IsProjectAdmin=0){
			if(EntitySort==2 && (IsAdmin==1||IsProjectAdmin==1)){
				return true;
			}
			return false
		}
}
	let customLazy=function (src,errorUrl,loadingSrc){
		let imgObj={
	        src: src,
	        error: errorUrl,
	        // try: 1, // 这个是加载图片数量
		    attempt:1,
		    listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove']
	     }
	    if (loadingSrc!==undefined) {
	    	imgObj.loading = loadingSrc
	    }
		return imgObj;
	}
	
export default{
	storage:{
		set: Storage.set,
		get: Storage.get,
		clear: Storage.get,
		remove: Storage.remove
	},
	operator:{
		eosOperDataHandle: Operator.eosOperDataHandle,
		operateRoleFilter: Operator.operateRoleFilter,
		isAdminOrProjectAdmin: Operator.isAdminOrProjectAdmin,

	},
	tntool:{
		setTnAuth:TreeNodeTools.setTreeNodeAuth,
		setTnAuthByName:TreeNodeTools.setTreeNodeAuthByName
	},
	validator:{
		classIdArr:Validator.classIdArr,
		account:Validator.account,
		phoneNum:Validator.phoneNum,
		comName:Validator.comName,
		pos:Validator.pos,
		usc:Validator.usc,
		org:Validator.org,
		rec:Validator.rec,
		stn:Validator.stn,
		agree:Validator.agree,
		checkOrd:Validator.checkOrd,
		verNoComma:Validator.verNoComma,
		checkProjectSelected:Validator.checkProjectSelected,
		isSameStateNames:Validator.isSameStateNames,
		isEmptyArr:Validator.isEmptyArr,
	},
	axios:{
		put:Axios.axiosPut,
		get:Axios.axiosGet,
		post:Axios.axiosPost,
		delete:Axios.axiosDelete,
		all:Axios.axiosAll,
		spread:Axios.axiosSpread,
	},
	page,
	debounce,
	setOperateSet,
	setOperateSetArr,
	setProjectData,
	setTreeNodes,
	checkCode,
	date,
	array,
	projectContr,
	customLazy

}
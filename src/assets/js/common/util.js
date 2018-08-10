let debounce = (action, delay, _this) => {
  let vm = _this;
  return function() {
    var ctx = this,
      args = arguments;
    clearTimeout(vm.last)
    vm.last = setTimeout(function() {
      action.apply(ctx, args)
    }, delay)
  }
}
let copyArr = (arr) => {
  let res = []
  for(let i = 0; i < arr.length; i++) {
    res.push(arr[i])
  }
  return res
}

function getStyle(el, name) {//获取计算后的元素style,用法如：getStyle['width']　
  if(window.getComputedStyle) {　　　
    return window.getComputedStyle(el, null);　　
  } else {　　　
    return el.currentStyle;　　
  }　
}
let getWinSize = (type, reduceSize) => {
  //获取窗口高度
  let size = 0;
  if(window[`inner${type}`]) size = window[`inner${type}`] - reduceSize;
  else if((document.body) && (document.body[`client${type}`])) size = document.body[`client${type}`] - reduceSize;
  //通过深入Document内部对body进行检测，获取窗口大小
  if(document.documentElement && document.documentElement[`client${type}`]) {
    size = document.documentElement[`client${type}`] - reduceSize;
  }
  return size;
}
let S4 = () => {
  return(((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
let guid = () => {
  return(S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
let testProtocol = (get_STORE_protocol, EquipmentId, type) => { //测试协议
  let resProtocol = [];
  let _res = get_STORE_protocol.filter((val) => {
    return val.TerminalEquipmentId == EquipmentId
  });
  if(_res.length) {
    let res = _res[0];
    if(res.ProtocalInfo.length > 0) {
      if(type == 'datastate') {
        resProtocol = res.ProtocalInfo.filter((val) => {
          return val.Status.length > 0;
        });
      } else {
        resProtocol = res.ProtocalInfo
      }
    }
  }
  return resProtocol;
}
let deletePanel = (refs) => {
  let storageStr = eosCommon.storage.get('storageType');
  let storageArr = storageStr.split(',');
  let len = storageArr.length;
  if(refs instanceof Array) {
    for(let j = 0; j < refs.length; j++) {
      for(let i = 0; i < len; i++) {
        if(refs[j] == storageArr[i]) {
          storageArr.splice(i, 1);
        }
      }
    }
  } else {
    for(let i = 0; i < len; i++) {
      if(refs == storageArr[i]) {
        storageArr.splice(i, 1)
      }
    }
  }
  storageStr = storageArr.join(',');
  eosCommon.storage.set('storageType', storageStr);
}
let reDialog=msg=>{
	  vdialog({
	    type: 'confirm',
	    title: '提示',
	    content: msg,
	    ok: function() {},
	    cancel: true,
	    modal: true
	  });
}
let countSubstr=(str, substr)=>{
	 let reg = new RegExp(substr, "g");
	return str.match(reg) ? str.match(reg).length : 0;
}
let delEle=(delType,dataArr,currRefs)=>{
		let newLabelArr = [...dataArr];
		let len = newLabelArr.length;
				for(let i = 0; i < len; i++) {
					if(currRefs == newLabelArr[i].refs) {
						newLabelArr.splice(i, 1);
						if(delType=='DELETECURR'){
							break;
						}
					}
				}
		return [...newLabelArr];
}
let NumAscSort=(a, b) =>(a - b);
let showNowBorder=(refs)=>{
		let  tempStrType = eosCommon.storage.get('storageType');
	  let storageType = tempStrType.split(','); //字符串转数组
	  for(let i = 0; i < storageType.length; i++) {
	    let resize = document.getElementsByClassName('resize');
	    for(let m = 0; m < resize.length; m++) {
	      resize[m].style.display = 'none'
	    }
	    let currResizeWrap = document.getElementById('wrap_' + refs);
	    let currResize = currResizeWrap.getElementsByClassName('resize');
	    for(let n = 0; n < currResize.length; n++) {
	      currResize[n].style.display = 'block';
	    }
	  }
}
export {
  debounce,
  copyArr,
  getStyle,
  getWinSize,
  guid,
  testProtocol,
  deletePanel,
  reDialog,
  countSubstr,
  delEle,
  NumAscSort,
  showNowBorder
}

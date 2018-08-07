import * as Common from 'src/assets/js/common';
import { initCommonDragData } from 'src/assets/js/common/commonData';
let storages = Common.Func.storage;
//console.log('storages:',storages)
//拖拉函数*******************************************************************************************
function Drag(oDragWrap) {
  this.disX = 0;
  this.disY = 0;
  this.minLeft = 0;
  this.minTop = 0;
  this.oDragWrap = oDragWrap;
  this.oDrag = document.querySelector(this.oDragWrap);
  this.oTitle = document.querySelector(this.oDragWrap + ' .title');
  this.dragHandle = this.oTitle || this.oDrag;
  this.dragHandle.style.cursor = 'move';
  var that = this;
  this.dragHandle.onmousedown = function() {
    that.DragmousedownFn();
  }
}
Drag.prototype.DragmousedownFn = function(ev) {
  var e = ev || event;
  e.preventDefault();
  this.disX = e.clientX - this.oDrag.offsetLeft;
  this.disY = e.clientY - this.oDrag.offsetTop;
  var that = this;
  document.onmousemove = function(ev) {
    that.DragfnMove();
  };
  document.onmouseup = function() {
    that.DragfnMouseUp()
  };
};
Drag.prototype.DragfnMove = function(ev) {
  var e = ev || event;
  var Left = e.clientX - this.disX;
  var Top = e.clientY - this.disY;
  var maxleft = document.documentElement.offsetWidth - this.oDrag.offsetWidth;
  var maxtop = document.documentElement.clientHeight - this.oDrag.offsetHeight;
  if(Left < this.minLeft) {
    Left = this.minLeft;
  }
  //	else if(Left > maxleft) {
  //		Left = maxleft;
  //	};
  if(Top < this.minTop) {
    Top = this.minTop;
  }
  //	else if(Top > maxtop) {
  //		Top = maxtop;
  //	};
  this.oDrag.style.left = Left + 'px';
  this.oDrag.style.top = Top + 'px';
}
Drag.prototype.DragfnMouseUp = function(ev) {
  document.onmousemove = null;
  document.onmouseup = null;
}
//改变元素大小类*********************************************************************************************
function ResizeDrag(oDragWrap, typeName) {
  this.typeName = typeName;
  for(let val of initCommonDragData.typeNameList) {
  	//设置当前控件初始化默认宽高
    if(this.typeName == val.typeName) {
      this.dragMinWidth = val.dragMinWidth;
      this.dragMinHeight = val.dragMinHeight;
    }
  }
  this.disX = 0;
  this.disY = 0;
  this.oDragWrap = document.querySelector(oDragWrap);
  this.iparenttop = this.oDragWrap.offsetTop;
  this.iparentleft = this.oDragWrap.offsetLeft;
  this.iparentwidth = this.oDragWrap.offsetWidth;
  this.iparentheight = this.oDragWrap.offsetHeight;
  //this.Directions = ['L', 'B', 'R', 'T', 'LT', 'LB', 'RT', 'RB'];
  this.Directions = initCommonDragData.Directions;
  for(var i = 0; i < this.Directions.length; i++) {
    this['resize' + this.Directions[i]] = document.querySelector(oDragWrap + ' .resize' + this.Directions[i]);
  }
  //四边变大
  this.resize(this.resizeB, false, false, false, true);
  this.resize(this.resizeR, false, false, true, false);
  this.resize(this.resizeT, false, true, false, true);
  this.resize(this.resizeL, true, false, true, false);
  //四角变大
  this.resize(this.resizeRB, false, false, true, true);
  this.resize(this.resizeRT, false, true, true, true);
  this.resize(this.resizeLT, true, true, true, true);
  this.resize(this.resizeLB, true, false, true, true);
}
ResizeDrag.prototype.fnMouseMove = function(e, handle, isleft, istop, lookx, looky) {
  e = e || event;
  var iL = e.clientX - this.disX;
  var iT = e.clientY - this.disY;
  var maxw = document.documentElement.clientWidth - this.oDragWrap.offsetLeft - 2;
  var maxh = document.documentElement.clientHeight - this.oDragWrap.offsetTop - 2;
  var iw = isleft ? this.iparentwidth - iL : handle.offsetWidth + iL;
  var ih = istop ? this.iparentheight - iT : handle.offsetHeight + iT;
  if(isleft) {
    this.oDragWrap.style.left = this.iparentleft + iL + 'px';
  };
  if(istop) {
    this.oDragWrap.style.top = this.iparenttop + iT + 'px';
  };
  if(iw < this.dragMinWidth) {
    iw = this.dragMinWidth
  }
  //	else if(iw > maxw) {
  //		iw = maxw;
  //	};
  if(lookx) {
    this.oDragWrap.style.width = iw + 'px';
  };
  if(ih < this.dragMinHeight) {
    ih = this.dragMinHeight;
  }
  //	else if(ih > maxh) {
  //		ih = maxh;
  //	};
  if(looky) {
    this.oDragWrap.style.height = ih + 'px';
  };
  if((isleft && iw == this.dragMinWidth) || (istop && ih == this.dragMinHeight)) {
  	//当大小为最小宽高时，将禁止改变大小
    document.onmousemove = null;
  };
  return false;
}
ResizeDrag.prototype.fnMouseUp = function() {
  document.onmousemove = null;
  document.onmouseup = null;
}
ResizeDrag.prototype.resize = function(handle, isleft, istop, lookx, looky) {
  var that = this;
  handle.onmousedown = function(e) {
    e = e || event;
    e.preventDefault();
    e.stopPropagation();
    that.disX = e.clientX - this.offsetLeft;
    that.disY = e.clientY - this.offsetTop;
    that.iparenttop = that.oDragWrap.offsetTop;
    that.iparentleft = that.oDragWrap.offsetLeft;
    that.iparentwidth = that.oDragWrap.offsetWidth;
    that.iparentheight = that.oDragWrap.offsetHeight;
    document.onmousemove = function(e) {
      that.fnMouseMove(e, handle, isleft, istop, lookx, looky);
    };
    document.onmouseup = function() {
      that.fnMouseUp();
    };
  };
};
//统一继承拖拽、改变大小两类的方法封装**********************************************************************
var extendDrgAndResMethods = function(newClass) {
  if(newClass == 'Chart') {
    for(var i in Dragcomponent.prototype) {
      Chart.prototype[i] = Dragcomponent.prototype[i];
    }
    return;
  }
  for(var i in ResizeDrag.prototype) {
    newClass.prototype[i] = ResizeDrag.prototype[i];
  }
  for(var i in Drag.prototype) {
    newClass.prototype[i] = Drag.prototype[i];
  }
}
var storageType = [];
//***********************公用************************************************
function Dragcomponent(oDragWrap, type, typeName, isCanOperate) {
  var drag_content = document.querySelector('#drag_content')
  this.isCanOperate = isCanOperate;
  if(!this.isCanOperate) {
    Drag.call(this, oDragWrap);
    var eDrag = document.querySelector(this.oDragWrap);
    eDrag.style.cursor = 'auto';
    this.dragHandle.onmousedown = null;
    document.onmousemove = null;
    document.onmouseup = null;
    document.onclick = null;
    try{
    	drag_content.onclick=null;
    }catch(err){
    	//console.log(err);
    }
    return;
  }
  Drag.call(this, oDragWrap);
  ResizeDrag.call(this, oDragWrap, typeName);
  this.type = type;
  var tempStrType = storages.get('storageType');
  if(tempStrType == '') {
    storageType = [];
    storageType.push(this.type);
    tempStrType = storageType.join(','); //数组转字符串
    storages.set('storageType', tempStrType);
  } else {
    tempStrType = tempStrType + ',' + this.type;
    storages.set('storageType', tempStrType);
    tempStrType = storages.get('storageType');
    storageType = tempStrType.split(','); //字符串转数组		
  }
  this.currEditPanel = null;
  var that = this;
  drag_content.onclick = function(event) {
    var e = event || window.event;
    var elem = e.srcElement || e.target;
    while(elem) {
      if(elem != document) {
        //console.log('storageType2:',storageType);
        for(var i = 0; i < storageType.length; i++) {
          if(elem.id == "wrap_" + storageType[i] || elem.id == 'edit_' + storageType[i]) {
            e.stopPropagation();
            tempStrType = storages.get('storageType');
            storageType = tempStrType.split(','); //字符串转数组
            //console.log('storageType:',storageType);
            for(var j = 0; j < storageType.length; j++) {
              var allEditPanel = document.getElementById('edit_' + storageType[j]);
              if(allEditPanel){
              	 allEditPanel.style.display = 'none'
              }            
            }
            var resize = document.getElementsByClassName('resize');
            for(var m = 0; m < resize.length; m++) {
              resize[m].style.display = 'none'
            }
            var currResizeWrap = document.getElementById('wrap_' + storageType[i]);
            var currResize = currResizeWrap.getElementsByClassName('resize');
            for(var n = 0; n < currResize.length; n++) {
              currResize[n].style.display = 'block';
            }
            that.currEditPanel = document.querySelector('#edit_' + storageType[i]);
            that.currEditPanel.style.display = 'block'
            return;
          }
        }
        elem = elem.parentNode;
      } else {
        //if(!that.currEditPanel){
        //return;
        //}
        for(var j = 0; j < storageType.length; j++) {
          var allEditPanel = document.querySelector('#edit_' + storageType[j]);
          if(!allEditPanel) {
            return;
          }
          allEditPanel.style.display = 'none'
        }
        var resize = document.getElementsByClassName('resize');
        if(!resize) {
          return;
        }
        for(var m = 0; m < resize.length; m++) {
          resize[m].style.display = 'none'
        }
        return;
      }
    }
  }
}
extendDrgAndResMethods(Dragcomponent);
//图表实例***************************************************************			
function Chart(oDragWrap, type, typeName, el, myChart, isCanOperate) {
  Dragcomponent.call(this, oDragWrap, type, typeName, isCanOperate);
  this.el = el;
  this.myChart = myChart;
}
//继承拖拽和改大小方法
for(var i in Dragcomponent.prototype) {
  Chart.prototype[i] = Dragcomponent.prototype[i];
}
extendDrgAndResMethods(Chart);
//重写fnMouseUp方法
Chart.prototype.fnMouseUp = function() {
  var that = this;
  this.createChart(function() {
    if(that.typeName == 'chart') {
      $("#" + that.el).highcharts().setSize(null, null, false);
    } else if(that.typeName == 'dashboard') {
      that.myChart.resize();
    }
  });
  document.onmousemove = null;
  document.onmouseup = null;
}
Chart.prototype.createChart = function(fn) {
  fn && fn();
}
//*********生成图表函数**********************************
var myChart = function() {}
export {
  Dragcomponent,
  Chart,
  myChart
}
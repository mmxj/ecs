"use strict";var eosCommon=window.eosCommon||{};eosCommon=function(){var e="http://192.168.16.211",i=e+":2181/",t=!1,g="",M=function(e,I){return CryptoJS.DES.encrypt(e,CryptoJS.enc.Utf8.parse(o.eCodeTxt),{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7}).toString()},I=function(e,I){return CryptoJS.DES.decrypt({ciphertext:CryptoJS.enc.Base64.parse(e)},CryptoJS.enc.Utf8.parse(o.eCodeTxt),{mode:CryptoJS.mode.ECB,padding:CryptoJS.pad.Pkcs7}).toString(CryptoJS.enc.Utf8)},s=function(e,I,t,i,g){$.ajax({url:e,type:I,data:t,dataType:i,success:g,timeout:6e4,error:function(e){$(".loading_btn").length&&$(".loading_btn").button("reset")}})},a=function(e){if(t)return!1;t=!0,vdialog({type:"error",title:"提示",content:"您的登录已超时, 请点确定后重新登录!",modal:!0,ok:function(){t=!1,location.href="#/login"},close:function(){t=!1,location.href="#/login"}})},l=function(e,I){switch($(".loading_btn").button("reset"),e){case 99999:if(t)return!1;t=!0,vdialog({title:"系统提示",type:"error",content:"您的网络不给力，请稍后重试！",modal:!0,ok:function(){t=!1},close:function(){t=!1}});break;case 0:return!0;case 10001:vdialog({title:"系统提示",type:"alert",content:I,modal:!0,ok:function(){}});break;case 10002:case 10003:a();break;case 10004:case 10005:case 10006:case 10007:case 10008:vdialog({title:"系统提示",type:"alert",content:I,modal:!0,ok:function(){}});break;case 10009:"invalid code"==I&&(I="验证码错误"),vdialog({title:"系统提示",type:"alert",content:I,modal:!0,ok:function(){}});break;case 10010:case 10011:a()}},o={eCodeTxt:"canlead",get:function(e){for(var I=e+"=",t=document.cookie.split(";"),i=0;i<t.length;i++){for(var g=t[i];" "==g.charAt(0);)g=g.substring(1,g.length);if(0==g.indexOf(I))return unescape(g.substring(I.length,g.length))}return!1},set:function(e,I,t){if(e instanceof Object)for(var i in e){var g=new Date;g.setTime(g.getTime()+24*t*60*60*1e3);var M="expires="+g.toGMTString();document.cookie=i+"="+e[i]+"; "+M}},remove:function(e){var I=[];e instanceof Array?e=e:(I.push(e),e=I);for(var t=0,i=e.length;t<i;t++)document.cookie=e[t]+"=; -1";return e}},c={set:function(e,I){if(e instanceof Object)for(var t in e)window.localStorage.setItem(M(t,CryptoJS.enc.Utf8.parse(o.eCodeTxt)),M(e[t].toString(),CryptoJS.enc.Utf8.parse(o.eCodeTxt)));else window.localStorage.setItem(M(e,CryptoJS.enc.Utf8.parse(o.eCodeTxt)),M(I.toString(),CryptoJS.enc.Utf8.parse(o.eCodeTxt)))},get:function(e){if(null!=window.localStorage.getItem(M(e,CryptoJS.enc.Utf8.parse(o.eCodeTxt))))return I(window.localStorage.getItem(M(e,CryptoJS.enc.Utf8.parse(o.eCodeTxt))),CryptoJS.enc.Utf8.parse(o.eCodeTxt))},clear:function(){window.localStorage.clear()},remove:function(e){var I=[];e instanceof Array?I=e:I.push(e);for(var t=0,i=I.length;t<i;t++)window.localStorage.removeItem(M(I[t],CryptoJS.enc.Utf8.parse(o.eCodeTxt)))}},n={init:function(e,I,t){n.getPorvince(e,function(){n.getCity($("#province").selectpicker("val",$("#province").attr("value")),I,function(){n.getDistrict($("#city").selectpicker("val",$("#city").attr("value")),t)})})},loadData:function(e,I,t,i,g,M){if(l(I.State,I.Message)){if($(t).empty(),""==I.Data)$(t).append("<option>暂无数据</option>");else for(var a in I.Data)$(t).append("<option value="+I.Data[a][i]+">"+I.Data[a][g]+"</option>");e&&$(t).selectpicker("val",e),"#province"==t&&$(t).selectpicker("val",""==e?"19":e),$(t).selectpicker("refresh"),M&&M()}},getPorvince:function(I,t){s(i+"api/common/province","GET",{Region:""},"json",function(e){n.loadData(I,e,"#province","ProvinceId","ProvinceName",t)})},getCity:function(e,I,t){s(i+"api/common/city","GET",{ProvinceId:e},"json",function(e){n.loadData(I,e,"#city","CityId","CityName",t)})},getDistrict:function(e,I,t){s(i+"api/common/district","GET",{CityId:e},"json",function(e){n.loadData(I,e,"#district","DistrictId","DistrictName",t)})}},r=function(){g=JSON.parse(JSON.parse(c.get("treeNode")).OperateSet);var e=c.get("IsExperienceProject"),I=c.get("IsSelfProject");return e=1==e,I=2==Number(c.get("EntitySort"))||1==I,{insert:g.CREATE,deletes:g.DELETE,edit:g.UPDATE,search:g.QUERY,copy:g.COPY,print:g.PRINT,exports:g.EXPORT,imports:g.IMPORT,refresh:g.REFRESH,examine:g.APPROVE,publish:g.PUBLISH,download:g.DOWNLOAD,cancel:g.CANCEL,distribute:g.DISTRIBUTE,upload:g.UPLOAD,IsExperienceProject:e,IsSelfProject:I}};return{EOS_URL:e,APP_API:"http://192.168.16.211:2189/",COMMON_API:i,IOT_API:"http://192.168.16.211:2182/",OPEN_API:"http://192.168.16.211:2183/",ENTERPRISE_API:"http://192.168.16.211:2184/",REPORTS_API:"http://192.168.16.211:2185/",PLATFORM_API:"http://192.168.16.211:2186/",USER_API:"http://192.168.16.211:2187/",RESOURCES_API:"http://192.168.16.211:2188/",INSERT_MSG:"添加成功",INSERT_IMG_MSG:"添加成功",INSERT_FILE_MSG:"添加成功",UPDATE_MSG:"更新成功",UPDATE_IMG_MSG:"更新成功",UPDATE_FILE_MSG:"更新成功",DELETE_MSG:"删除成功",DELETE_IMG_MSG:"删除成功",DELETE_FILE_MSG:"删除成功",FAULT_CONFIRM_ASK:"请勿重复确认报警，谢谢",DELETE_MSG_ASK:"是否删除数据？",DELETE_IMG_ASK:"是否删除图片？",DELETE_FILE_ASK:"是否删除文件？",SET_PERMISSION:"成功设置权限",UPDATE_DIRECTORY:"更新成功",CREATE_DIRECTORY:"新建成功",DELETE_DIRECTORY:"删除成功",UPDATE_DFOLDER:"更新成功",CREATE_DFOLDER:"新建成功",DELETE_DFOLDER:"删除成功",MOVE_FILE:"你刚刚移动了一批文件",SEND_NOTICE:"发送成功",SUBSCRIBE_MSG:"成功关注",UNSUBSCRIBE_MSG:"取消关注",CONFIRM_SCC:"确认成功",LOCK_MSG:"锁定成功",UNLOCK_MSG:"解锁成功",loginDialog:t,encryptedDes:M,decryptedDes:I,eosAjax:s,eosMaxAjax:function(e,I,t,i,g,M){$.ajax({url:e,type:I,data:t,dataType:i,success:g,timeout:9e5,error:M})},login:a,checkCode:l,valueCheck:function(e,I){switch(I){case"mobile":objexp="^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}$";break;case"tel":objexp="^((d{3,4}-)|d{3.4}-)?d{7,8}$";break;case"email":objexp="^w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$";break;case"zh":objexp="^[一-龥]{0,}$";break;case"num":case"num":objexp="^[0-9]*$ ";break;case"numletterchina":objexp="^[0-9a-zA-Z一-龥]+$"}},eosCookie:o,storage:c,getUrlParam:function(e,I){var t=new RegExp("(^|&)"+I+"=([^&]*)(&|$)"),i=e.substr(1).match(t);return null!=i?unescape(i[2]):null},getTime:function(e,I,t){if(t)var i=I;else i=new Date,0!=I&&i.setDate(i.getDate()+I);var g={"M+":i.getMonth()+1,"d+":i.getDate(),"h+":i.getHours(),"m+":i.getMinutes(),"s+":i.getSeconds(),"q+":Math.floor((i.getMonth()+3)/3),S:i.getMilliseconds()};for(var M in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(i.getFullYear()+"").substr(4-RegExp.$1.length))),/(E+)/.test(e)&&(e=e.replace(RegExp.$1,(1<RegExp.$1.length?2<RegExp.$1.length?"/u661f/u671f":"/u5468":"")+{0:"/u65e5",1:"/u4e00",2:"/u4e8c",3:"/u4e09",4:"/u56db",5:"/u4e94",6:"/u516d"}[i.getDay()+""])),g)new RegExp("("+M+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?g[M]:("00"+g[M]).substr((""+g[M]).length)));return e},cityLinage:n,eosMessage:function(e,I,t,i){var g="";switch(e){case"success":g="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl9zdWNjZXNzPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkVsZW1lbnQtZ3VpZGVsaW5lLXYwLjIuNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MC4wMDAwMDAsIC0yMTIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLluKblgL7lkJFf5L+h5oGvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MC4wMDAwMDAsIDIxMi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtMiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Imljb25fc3VjY2VzcyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzEzQ0U2NiIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yNy44MjU1ODE0LDE3LjE0ODQzNTcgTDE5LjAxNzQ0LDI1LjgyODEyMTMgQzE4LjkwMTE2MDksMjUuOTQyNzA4MyAxOC43NjU1MDMzLDI2IDE4LjYxMDQ2NywyNiBDMTguNDU1NDI3LDI2IDE4LjMxOTc2OTMsMjUuOTQyNzA4MyAxOC4yMDM0ODY1LDI1LjgyODEyMTMgTDE4LjAyOTA3MTYsMjUuNjU2MjUgTDEzLjE3NDQxODYsMjAuODQzNzUgQzEzLjA1ODEzOTUsMjAuNzI5MTYzIDEzLDIwLjU5NTQ4MzcgMTMsMjAuNDQyNzA0NyBDMTMsMjAuMjg5OTI5MyAxMy4wNTgxMzk1LDIwLjE1NjI1IDEzLjE3NDQxODYsMjAuMDQxNjY2NyBMMTQuMzY2Mjc3MiwxOC44NjcxODU3IEMxNC40ODI1NiwxOC43NTI2MDIzIDE0LjYxODIxNzcsMTguNjk1MzEwNyAxNC43NzMyNTc3LDE4LjY5NTMxMDcgQzE0LjkyODI5NCwxOC42OTUzMTA3IDE1LjA2Mzk1MTYsMTguNzUyNjAyMyAxNS4xODAyMzA3LDE4Ljg2NzE4NTcgTDE4LjYxMDQ2NywyMi4yNzYwMzggTDI1LjgxOTc2OTMsMTUuMTcxODcxMyBDMjUuOTM2MDQ4NCwxNS4wNTcyODggMjYuMDcxNzA2LDE1IDI2LjIyNjc0MjMsMTUgQzI2LjM4MTc4MjMsMTUgMjYuNTE3NDQsMTUuMDU3Mjg4IDI2LjYzMzcyMjgsMTUuMTcxODcxMyBMMjcuODI1NTgxNCwxNi4zNDYzNTIzIEMyNy45NDE4NjA1LDE2LjQ2MDkzNTcgMjgsMTYuNTk0NjE1IDI4LDE2Ljc0NzM5NCBDMjgsMTYuOTAwMTczIDI3Ljk0MTg2MDUsMTcuMDMzODUyMyAyNy44MjU1ODE0LDE3LjE0ODQzNTcgTDI3LjgyNTU4MTQsMTcuMTQ4NDM1NyBaIiBpZD0iUGF0aCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";break;case"warning":g="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl93YXJuaW5nPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IlBhZ2UtMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MC4wMDAwMDAsIC0yNzIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLluKblgL7lkJFf5L+h5oGvLWNvcHkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYwLjAwMDAwMCwgMjcyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS0yIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl93YXJuaW5nIj4KICAgICAgICAgICAgICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS0yIiBmaWxsPSIjRjdCQTJBIiB4PSIwIiB5PSIwIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiPjwvcmVjdD4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTIxLjYxNTM4NDYsMjYuNTQzMjA5OSBDMjEuNjE1Mzg0NiwyNi45NDc4NzUxIDIxLjQ1ODMzNDgsMjcuMjkxODM2OCAyMS4xNDQyMzA4LDI3LjU3NTEwMjkgQzIwLjgzMDEyNjgsMjcuODU4MzY4OSAyMC40NDg3MTk0LDI4IDIwLDI4IEMxOS41NTEyODA2LDI4IDE5LjE2OTg3MzIsMjcuODU4MzY4OSAxOC44NTU3NjkyLDI3LjU3NTEwMjkgQzE4LjU0MTY2NTIsMjcuMjkxODM2OCAxOC4zODQ2MTU0LDI2Ljk0Nzg3NTEgMTguMzg0NjE1NCwyNi41NDMyMDk5IEwxOC4zODQ2MTU0LDE5Ljc0NDg1NiBDMTguMzg0NjE1NCwxOS4zNDAxOTA3IDE4LjU0MTY2NTIsMTguOTk2MjI5IDE4Ljg1NTc2OTIsMTguNzEyOTYzIEMxOS4xNjk4NzMyLDE4LjQyOTY5NjkgMTkuNTUxMjgwNiwxOC4yODgwNjU4IDIwLDE4LjI4ODA2NTggQzIwLjQ0ODcxOTQsMTguMjg4MDY1OCAyMC44MzAxMjY4LDE4LjQyOTY5NjkgMjEuMTQ0MjMwOCwxOC43MTI5NjMgQzIxLjQ1ODMzNDgsMTguOTk2MjI5IDIxLjYxNTM4NDYsMTkuMzQwMTkwNyAyMS42MTUzODQ2LDE5Ljc0NDg1NiBMMjEuNjE1Mzg0NiwyNi41NDMyMDk5IFogTTIwLDE1LjgwNDI5ODEgQzE5LjQ0NDQ0MjcsMTUuODA0Mjk4MSAxOC45NzIyMjQsMTUuNjE5MzY4NyAxOC41ODMzMzMzLDE1LjI0OTUwNDYgQzE4LjE5NDQ0MjcsMTQuODc5NjQwNiAxOCwxNC40MzA1MjU1IDE4LDEzLjkwMjE0OTEgQzE4LDEzLjM3Mzc3MjYgMTguMTk0NDQyNywxMi45MjQ2NTc1IDE4LjU4MzMzMzMsMTIuNTU0NzkzNSBDMTguOTcyMjI0LDEyLjE4NDkyOTUgMTkuNDQ0NDQyNywxMiAyMCwxMiBDMjAuNTU1NTU3MywxMiAyMS4wMjc3NzYsMTIuMTg0OTI5NSAyMS40MTY2NjY3LDEyLjU1NDc5MzUgQzIxLjgwNTU1NzMsMTIuOTI0NjU3NSAyMiwxMy4zNzM3NzI2IDIyLDEzLjkwMjE0OTEgQzIyLDE0LjQzMDUyNTUgMjEuODA1NTU3MywxNC44Nzk2NDA2IDIxLjQxNjY2NjcsMTUuMjQ5NTA0NiBDMjEuMDI3Nzc2LDE1LjYxOTM2ODcgMjAuNTU1NTU3MywxNS44MDQyOTgxIDIwLDE1LjgwNDI5ODEgWiIgaWQ9IkNvbWJpbmVkLVNoYXBlIiBmaWxsPSIjRkZGRkZGIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMC4wMDAwMDAsIDIwLjAwMDAwMCkgc2NhbGUoMSwgLTEpIHRyYW5zbGF0ZSgtMjAuMDAwMDAwLCAtMjAuMDAwMDAwKSAiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==";break;case"info":g="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl9pbmZvPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkVsZW1lbnQtZ3VpZGVsaW5lLXYwLjIuNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MC4wMDAwMDAsIC0xNTIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLluKblgL7lkJFf5L+h5oGvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MC4wMDAwMDAsIDE1Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtMiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Imljb25faW5mbyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzUwQkZGRiIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMS42MTUzODQ2LDI2LjU0MzIwOTkgQzIxLjYxNTM4NDYsMjYuOTQ3ODc1MSAyMS40NTgzMzQ4LDI3LjI5MTgzNjggMjEuMTQ0MjMwOCwyNy41NzUxMDI5IEMyMC44MzAxMjY4LDI3Ljg1ODM2ODkgMjAuNDQ4NzE5NCwyOCAyMCwyOCBDMTkuNTUxMjgwNiwyOCAxOS4xNjk4NzMyLDI3Ljg1ODM2ODkgMTguODU1NzY5MiwyNy41NzUxMDI5IEMxOC41NDE2NjUyLDI3LjI5MTgzNjggMTguMzg0NjE1NCwyNi45NDc4NzUxIDE4LjM4NDYxNTQsMjYuNTQzMjA5OSBMMTguMzg0NjE1NCwxOS43NDQ4NTYgQzE4LjM4NDYxNTQsMTkuMzQwMTkwNyAxOC41NDE2NjUyLDE4Ljk5NjIyOSAxOC44NTU3NjkyLDE4LjcxMjk2MyBDMTkuMTY5ODczMiwxOC40Mjk2OTY5IDE5LjU1MTI4MDYsMTguMjg4MDY1OCAyMCwxOC4yODgwNjU4IEMyMC40NDg3MTk0LDE4LjI4ODA2NTggMjAuODMwMTI2OCwxOC40Mjk2OTY5IDIxLjE0NDIzMDgsMTguNzEyOTYzIEMyMS40NTgzMzQ4LDE4Ljk5NjIyOSAyMS42MTUzODQ2LDE5LjM0MDE5MDcgMjEuNjE1Mzg0NiwxOS43NDQ4NTYgTDIxLjYxNTM4NDYsMjYuNTQzMjA5OSBaIE0yMCwxNS44MDQyOTgxIEMxOS40NDQ0NDI3LDE1LjgwNDI5ODEgMTguOTcyMjI0LDE1LjYxOTM2ODcgMTguNTgzMzMzMywxNS4yNDk1MDQ2IEMxOC4xOTQ0NDI3LDE0Ljg3OTY0MDYgMTgsMTQuNDMwNTI1NSAxOCwxMy45MDIxNDkxIEMxOCwxMy4zNzM3NzI2IDE4LjE5NDQ0MjcsMTIuOTI0NjU3NSAxOC41ODMzMzMzLDEyLjU1NDc5MzUgQzE4Ljk3MjIyNCwxMi4xODQ5Mjk1IDE5LjQ0NDQ0MjcsMTIgMjAsMTIgQzIwLjU1NTU1NzMsMTIgMjEuMDI3Nzc2LDEyLjE4NDkyOTUgMjEuNDE2NjY2NywxMi41NTQ3OTM1IEMyMS44MDU1NTczLDEyLjkyNDY1NzUgMjIsMTMuMzczNzcyNiAyMiwxMy45MDIxNDkxIEMyMiwxNC40MzA1MjU1IDIxLjgwNTU1NzMsMTQuODc5NjQwNiAyMS40MTY2NjY3LDE1LjI0OTUwNDYgQzIxLjAyNzc3NiwxNS42MTkzNjg3IDIwLjU1NTU1NzMsMTUuODA0Mjk4MSAyMCwxNS44MDQyOTgxIFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";break;case"error":g="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl9kYW5nZXI8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iRWxlbWVudC1ndWlkZWxpbmUtdjAuMi40IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iTWVzc2FnZSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTYwLjAwMDAwMCwgLTMzMi4wMDAwMDApIj4KICAgICAgICAgICAgPGcgaWQ9IuW4puWAvuWQkV/kv6Hmga8iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYwLjAwMDAwMCwgMzMyLjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPGcgaWQ9IlJlY3RhbmdsZS0yIj4KICAgICAgICAgICAgICAgICAgICA8ZyBpZD0iaWNvbl9kYW5nZXIiPgogICAgICAgICAgICAgICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLTIiIGZpbGw9IiNGRjQ5NDkiIHg9IjAiIHk9IjAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PC9yZWN0PgogICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMjUuODE3MjYyNywxNi4zNDUxNzk2IEMyNS45MzkwOTAyLDE2LjIyMzM0ODMgMjYsMTYuMDc2MTQxOCAyNiwxNS45MDM1NTIzIEMyNiwxNS43MzA5NjI4IDI1LjkzOTA5MDIsMTUuNTgzNzU2MyAyNS44MTcyNjI3LDE1LjQ2MTkyODkgTDI0LjUwNzYxNTcsMTQuMTgyNzQxMSBDMjQuMzg1Nzg4MiwxNC4wNjA5MTM3IDI0LjI0MzY1NzUsMTQgMjQuMDgxMjE5NiwxNCBDMjMuOTE4NzgxNywxNCAyMy43NzY2NTEsMTQuMDYwOTEzNyAyMy42NTQ4MjM1LDE0LjE4Mjc0MTEgTDIwLDE3LjgzNzU2MzUgTDE2LjMxNDcyMTYsMTQuMTgyNzQxMSBDMTYuMTkyODkwMiwxNC4wNjA5MTM3IDE2LjA1MDc1OTUsMTQgMTUuODg4MzIxNiwxNCBDMTUuNzI1ODg3NiwxNCAxNS41ODM3NTY5LDE0LjA2MDkxMzcgMTUuNDYxOTI5NCwxNC4xODI3NDExIEwxNC4xNTIyODI0LDE1LjQ2MTkyODkgQzE0LjA1MDc1ODIsMTUuNTgzNzU2MyAxNCwxNS43MzA5NjI4IDE0LDE1LjkwMzU1MjMgQzE0LDE2LjA3NjE0MTggMTQuMDUwNzU4MiwxNi4yMjMzNDgzIDE0LjE1MjI4MjQsMTYuMzQ1MTc5NiBMMTcuODM3NTYwOCwyMC4wMDAwMDE5IEwxNC4xNTIyODI0LDIzLjY1NDgyNDMgQzE0LjA1MDc1ODIsMjMuNzc2NjUxNyAxNCwyMy45MjM4NTgyIDE0LDI0LjA5NjQ0NzcgQzE0LDI0LjI2OTAzNzIgMTQuMDUwNzU4MiwyNC40MTYyNDM3IDE0LjE1MjI4MjQsMjQuNTM4MDcxMSBMMTUuNDYxOTI5NCwyNS44MTcyNTg5IEMxNS41ODM3NTY5LDI1LjkzOTA4NjMgMTUuNzI1ODg3NiwyNiAxNS44ODgzMjE2LDI2IEMxNi4wNTA3NTk1LDI2IDE2LjE5Mjg5MDIsMjUuOTM5MDg2MyAxNi4zMTQ3MjE2LDI1LjgxNzI1ODkgTDIwLDIyLjE2MjQzNjUgTDIzLjY1NDgyMzUsMjUuODE3MjU4OSBDMjMuNzc2NjUxLDI1LjkzOTA4NjMgMjMuOTE4NzgxNywyNiAyNC4wODEyMTk2LDI2IEMyNC4yNDM2NTc1LDI2IDI0LjM4NTc4ODIsMjUuOTM5MDg2MyAyNC41MDc2MTU3LDI1LjgxNzI1ODkgTDI1LjgxNzI2MjcsMjQuNTM4MDcxMSBDMjUuOTM5MDkwMiwyNC40MTYyNDM3IDI2LDI0LjI2OTAzNzIgMjYsMjQuMDk2NDQ3NyBDMjYsMjMuOTIzODU4MiAyNS45MzkwOTAyLDIzLjc3NjY1MTcgMjUuODE3MjYyNywyMy42NTQ4MjQzIEwyMi4xMzE5ODA0LDIwLjAwMDAwMTkgTDI1LjgxNzI2MjcsMTYuMzQ1MTc5NiBaIiBpZD0iUGF0aCIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+";break;default:g="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjQwcHgiIGhlaWdodD0iNDBweCIgdmlld0JveD0iMCAwIDQwIDQwIiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPCEtLSBHZW5lcmF0b3I6IFNrZXRjaCAzOS4xICgzMTcyMCkgLSBodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2ggLS0+CiAgICA8dGl0bGU+aWNvbl9pbmZvPC90aXRsZT4KICAgIDxkZXNjPkNyZWF0ZWQgd2l0aCBTa2V0Y2guPC9kZXNjPgogICAgPGRlZnM+PC9kZWZzPgogICAgPGcgaWQ9IkVsZW1lbnQtZ3VpZGVsaW5lLXYwLjIuNCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9Ik1lc3NhZ2UiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC02MC4wMDAwMDAsIC0xNTIuMDAwMDAwKSI+CiAgICAgICAgICAgIDxnIGlkPSLluKblgL7lkJFf5L+h5oGvIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg2MC4wMDAwMDAsIDE1Mi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxnIGlkPSJSZWN0YW5nbGUtMiI+CiAgICAgICAgICAgICAgICAgICAgPGcgaWQ9Imljb25faW5mbyI+CiAgICAgICAgICAgICAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtMiIgZmlsbD0iIzUwQkZGRiIgeD0iMCIgeT0iMCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIj48L3JlY3Q+CiAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMS42MTUzODQ2LDI2LjU0MzIwOTkgQzIxLjYxNTM4NDYsMjYuOTQ3ODc1MSAyMS40NTgzMzQ4LDI3LjI5MTgzNjggMjEuMTQ0MjMwOCwyNy41NzUxMDI5IEMyMC44MzAxMjY4LDI3Ljg1ODM2ODkgMjAuNDQ4NzE5NCwyOCAyMCwyOCBDMTkuNTUxMjgwNiwyOCAxOS4xNjk4NzMyLDI3Ljg1ODM2ODkgMTguODU1NzY5MiwyNy41NzUxMDI5IEMxOC41NDE2NjUyLDI3LjI5MTgzNjggMTguMzg0NjE1NCwyNi45NDc4NzUxIDE4LjM4NDYxNTQsMjYuNTQzMjA5OSBMMTguMzg0NjE1NCwxOS43NDQ4NTYgQzE4LjM4NDYxNTQsMTkuMzQwMTkwNyAxOC41NDE2NjUyLDE4Ljk5NjIyOSAxOC44NTU3NjkyLDE4LjcxMjk2MyBDMTkuMTY5ODczMiwxOC40Mjk2OTY5IDE5LjU1MTI4MDYsMTguMjg4MDY1OCAyMCwxOC4yODgwNjU4IEMyMC40NDg3MTk0LDE4LjI4ODA2NTggMjAuODMwMTI2OCwxOC40Mjk2OTY5IDIxLjE0NDIzMDgsMTguNzEyOTYzIEMyMS40NTgzMzQ4LDE4Ljk5NjIyOSAyMS42MTUzODQ2LDE5LjM0MDE5MDcgMjEuNjE1Mzg0NiwxOS43NDQ4NTYgTDIxLjYxNTM4NDYsMjYuNTQzMjA5OSBaIE0yMCwxNS44MDQyOTgxIEMxOS40NDQ0NDI3LDE1LjgwNDI5ODEgMTguOTcyMjI0LDE1LjYxOTM2ODcgMTguNTgzMzMzMywxNS4yNDk1MDQ2IEMxOC4xOTQ0NDI3LDE0Ljg3OTY0MDYgMTgsMTQuNDMwNTI1NSAxOCwxMy45MDIxNDkxIEMxOCwxMy4zNzM3NzI2IDE4LjE5NDQ0MjcsMTIuOTI0NjU3NSAxOC41ODMzMzMzLDEyLjU1NDc5MzUgQzE4Ljk3MjIyNCwxMi4xODQ5Mjk1IDE5LjQ0NDQ0MjcsMTIgMjAsMTIgQzIwLjU1NTU1NzMsMTIgMjEuMDI3Nzc2LDEyLjE4NDkyOTUgMjEuNDE2NjY2NywxMi41NTQ3OTM1IEMyMS44MDU1NTczLDEyLjkyNDY1NzUgMjIsMTMuMzczNzcyNiAyMiwxMy45MDIxNDkxIEMyMiwxNC40MzA1MjU1IDIxLjgwNTU1NzMsMTQuODc5NjQwNiAyMS40MTY2NjY3LDE1LjI0OTUwNDYgQzIxLjAyNzc3NiwxNS42MTkzNjg3IDIwLjU1NTU1NzMsMTUuODA0Mjk4MSAyMCwxNS44MDQyOTgxIFoiIGlkPSJDb21iaW5lZC1TaGFwZSIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"}t?$("body").append('<div class="el-message el-message-fade-enter" style="z-index: 5000;top:30%;"><img src="'+g+'" alt="" class="el-message__icon"><div class="el-message__group"><p>'+I+"</p></div></div>"):$("body").append('<div class="el-message el-message-fade-enter" style="z-index: 2017;"><img src="'+g+'" alt="" class="el-message__icon"><div class="el-message__group"><p>'+I+"</p></div></div>"),setTimeout(function(){$(".el-message").removeClass("el-message-fade-enter")},10),setTimeout(function(){$(".el-message").addClass("el-message-fade-leave-active")},2500),setTimeout(function(){$(".el-message").remove()},4e3),i&&i()},eosUpdataAvatar:function(e){e=""==e?"./static/images/user_default.jpg":e,$(".avatar img").attr("src",e)},eosUploaderFile:function(i,e){var I={},t="rar,zip,doc,xls,docx,xlsx,pdf",g=i.upType;"undefined"!=e&&(t="rar,zip,doc,xls,docx,xlsx,pdf,pdf,gif,jpg,jpeg,bmp,png"),I[i.uploaderObj]=WebUploader.create({auto:!1,swf:"../assets/plugins/webuploader/js/Uploader.swf",server:i.serverUrl,formData:i.data,pick:i.initBtn,fileNumLimit:i.fileNumLimit,resize:!1,fileSingleSizeLimit:16777216,accept:{title:"intoTypes",extensions:t,mimeTypes:""}}),I[i.uploaderObj].on("fileQueued",function(e){$(i.uploaderBox).find(i.uploaderList).append('<div id="'+e.id+'" class="item" data=""><h4 class="info">'+e.name+'</h4><div class="progress progress-striped active"><div class="progress-bar" role="progressbar" style="width: 0%"></div></div><div class="action"><button class="startBtn btn btn-default">开始</button><button class="btn btn-default delBtn">删除</button></div><p class="state">等待上传...</p></div>'),$(i.uploaderBox).find(".ctlAllBtn").html()||1==i.fileNumLimit&&$(i.uploaderBox).find(".btns").hide(),eosCommon.resetNiceScroll()}),I[i.uploaderObj].on("uploadBeforeSend",function(e,I,t){i.fileBeforeSend&&i.fileBeforeSend(e,I,t)}),I[i.uploaderObj].on("uploadProgress",function(e,I){var t=$("#"+e.id),i=t.find(".progress .progress-bar");t.find("p.state").text("上传中..."),i.css("width",100*I+"%")}),I[i.uploaderObj].on("uploadAccept",function(e,I){if(eosCommon.checkCode(I.State,I.Message),1!=g){if(!I.Data.length)return!1;if("ok"!=I.Data[0].UploadTips)return!1}}),I[i.uploaderObj].on("uploadSuccess",function(e,I){$("#"+e.id).find(".startBtn").remove(),$("#"+e.id).find("p.state").html('<span type="color:#81c868">上传成功</span>'),1!=g&&($("#"+e.id).attr("data",I.Data[0].ResourceId),$("#"+e.id).append('<input type="hidden" value="'+I.Data[0].ResourceId+'">')),i.succ&&i.succ(I)}),I[i.uploaderObj].on("uploadError",function(e,I){setTimeout(function(){$("#"+e.id).find(".progress-bar").animate({width:"0%"},400)},400),$("#"+e.id).find(".startBtn").html("重新上传"),$("#"+e.id).find("p.state").html('<span style="color: #f43838">上传出错</span>'),i.error&&i.error(e)}),I[i.uploaderObj].on("uploadComplete",function(e){}),I[i.uploaderObj].on("error",function(e){"F_DUPLICATE"==e?window.parent.vdialog({title:"系统提示",type:"error",modal:!0,content:"您已经上传了一份，请不要重复上传！",ok:!0}):"F_EXCEED_SIZE"==e?window.parent.vdialog({title:"系统提示",type:"error",modal:!0,content:"单个附件的大小不可超过 16M 哦！换个小点的文件吧！",ok:!0}):"Q_TYPE_DENIED"==e&&window.parent.vdialog({title:"系统提示",type:"error",modal:!0,content:"为了系统安全，请上传系统规定的文件<br />doc，docx，pdf，zip，rar，xls，xlsx",ok:!0})}),$(i.uploaderBox).on("click",".ctlAllBtn",function(){$(i.uploaderBox).find(i.uploaderList+" .item").each(function(){I[i.uploaderObj].upload($(this).attr("id"))})}),$(i.uploaderBox).on("click",".delAllBtn",function(){$(i.uploaderBox).find(i.uploaderList+" .item").each(function(){i.del&&i.del($(this).attr("data")),I[i.uploaderObj].removeFile($(this).attr("id")),$(this).remove()}),$(i.uploaderBox).find(".ctlAllBtn , .delAllBtn").remove()}),$(i.uploaderBox).on("click",".delBtn",function(){$(i.uploaderBox).find(".btns").show(),1==$(i.uploaderBox).find(i.uploaderList+" .item").length&&$(i.uploaderBox).find(".ctlAllBtn , .delAllBtn").remove(),I[i.uploaderObj].removeFile($(this).parents(".item").attr("id")),$(this).parents(".item").remove(),i.del&&i.del($(this).parents(".item").attr("data"))}),$(i.uploaderBox).on("click",".startBtn",function(){I[i.uploaderObj].upload($(this).parents(".item").attr("id"))})},eosUploaderImg:function(M){var a={},o=($(M.uploaderBox).find(".eos_uploader_img"),$(M.uploaderBox).find(".filelist")),n=0;function i(e,I){$(M.uploaderBox).find(".placeholder").hide();var t=$('<li id="'+e+'" class="item" data-num="dataImg" data="'+e+'"><p class="title"> </p><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),i=($('<div class="file-panel"><span class="cancel">删除</span>').appendTo(t),t.find("p.progress span"),t.find("p.imgWrap")),g=($('<p class="error"></p>'),$('<img class="" src="'+I+'">'));i.empty().append(g),t.prependTo(o),++n<M.fileNumLimit?($(M.uploaderBox).find(".statusBar").show(),$(M.continueBtn).show(),a[M.uploaderObj].addButton({id:M.continueBtn,label:"继续添加"})):$(M.continueBtn).hide()}a[M.uploaderObj]=WebUploader.create({auto:!1,swf:!1,server:M.serverUrl,pick:M.initBtn,fileNumLimit:M.fileNumLimit,fileSingleSizeLimit:M.fileSingleSizeLimit,formData:M.data,accept:{title:"Images",extensions:"gif,jpg,jpeg,bmp,png",mimeTypes:""}}),function(){var e=M.ResourceIds,I=M.imgUrls;if(null!=e&&""!=e)if("[object Array]"===Object.prototype.toString.call(e))for(var t=0;t<e.length;t++)i(e[t],I[t]);else i(e,I)}(),a[M.uploaderObj].on("dndAccept",function(e){for(var I=!1,t=e.length,i=0;i<t;i++)if(~"text/plain;application/javascript ".indexOf(e[i].type)){I=!0;break}return!I}),a[M.uploaderObj].on("uploadBeforeSend",function(e,I,t){M.fileBeforeSend&&M.fileBeforeSend(e,I,t)}),a[M.uploaderObj].on("fileQueued",function(e){!function(e){$(M.uploaderBox).find(".placeholder").hide();var I=$('<li id="'+e.id+'" class="item"><p class="title">'+e.name+'</p><p class="imgWrap"></p><p class="progress"><span></span></p></li>'),i=($('<div class="file-panel"><span class="cancel">删除</span>').appendTo(I),I.find("p.progress span"),I.find("p.imgWrap"));$('<p class="error"></p>'),a[M.uploaderObj].makeThumb(e,function(e,I){var t;e?i.text("不能预览"):(t=$('<img src="'+I+'">'),i.empty().append(t))},110,110),I.prependTo(o)}(e),$(M.uploaderBox).find(".info").html(I),n++,e.size;var I="选中 "+n+" 张图片";1===n&&($(M.uploaderBox).find(".statusBar").show(),$(M.continueBtn).show(),a[M.uploaderObj].addButton({id:M.continueBtn,label:"继续添加"})),n>=M.fileNumLimit&&$(M.continueBtn).hide(),eosCommon.resetNiceScroll()}),a[M.uploaderObj].on("uploadProgress",function(e,I){$("#"+e.id).find(".progress span").css("width",100*I+"%")}),a[M.uploaderObj].on("uploadAccept",function(e,I){return eosCommon.checkCode(I.State,I.Message),!!I.Data.length&&"ok"==I.Data[0].UploadTips&&void 0}),a[M.uploaderObj].on("uploadSuccess",function(e,I){$("#"+e.id).addClass("upload-state-done");var t=$("#"+e.id),i=t.find("div.success");i.length||(i=$('<div class="success"></div>').appendTo(t)),i.text(""),$("#"+e.id).append('<input type="hidden" value="'+I.Data[0].ResourceId+'">'),$("#"+e.id).attr("data",I.Data[0].ResourceId),M.succ&&M.succ(I)}),a[M.uploaderObj].on("fileDequeued",function(e){n--,e.size,n||($(M.uploaderBox).find(".statusBar").hide(),$(M.uploaderBox).find(".placeholder").show())}),a[M.uploaderObj].on("uploadError",function(e){setTimeout(function(){$("#"+e.id).find(".progress span").animate({width:"0%"},200)},200);var I=$("#"+e.id),t=I.find("div.error");t.length||(t=$('<div class="error"></div>').appendTo(I)),t.text("上传失败"),M.error&&M.error(e)}),a[M.uploaderObj].on("uploadComplete",function(e){var I=a[M.uploaderObj].getStats(),t="共 "+n+" 张，已上传 "+I.successNum+" 张";I.uploadFailNum&&(t+="，失败 "+I.uploadFailNum+' 张；<a class="retry" href="Javascript:;">重新上传 </a>失败图片'),$(M.uploaderBox).find(".info").html(t)}),$(M.uploaderBox).on("click",".uploadBtn",function(){a[M.uploaderObj].upload()}),$(M.uploaderBox).on("click",".cancel",function(){"dataImg"==$(this).parents(".item").attr("data-num")?(n-=1,$(this).parents(".item").remove(),M.del&&M.del($(this).parents(".item").attr("id")),n?n<M.fileNumLimit&&$(M.continueBtn).show():($(M.uploaderBox).find(".statusBar").hide(),$(M.uploaderBox).find(".placeholder").show(),a[M.uploaderObj].addButton({id:M.initBtn,label:"点击选择图片"}))):(a[M.uploaderObj].removeFile($(this).parents(".item").attr("id")),$(this).parents(".item").remove(),null!=$(this).parents(".item").find("input:hidden").val()&&M.del&&M.del($(this).parents(".item").find("input:hidden").val()),n<M.fileNumLimit&&$(M.continueBtn).show())}),a[M.uploaderObj].on("error",function(e){"F_DUPLICATE"==e?window.parent.vdialog({title:"系统提示",type:"error",modal:!0,content:"您已经上传了一份，请不要重复上传！",ok:!0}):"F_EXCEED_SIZE"==e?window.parent.vdialog({title:"系统提示",type:"error",modal:!0,content:"单个图片的大小不可超过 3M 哦！换个小点的文件吧！",ok:!0}):"Q_EXCEED_NUM_LIMIT"==e?window.parent.vdialog({title:"系统提示",type:"error",modal:!0,content:"您准备上传的照片超过限定的数量啦！",ok:!0}):"Q_TYPE_DENIED"==e&&window.parent.vdialog({title:"系统提示",type:"error",modal:!0,content:"请上传系统规定的文件<br />gif，jpg，jpeg，bmp，png",ok:!0})}),$(M.uploaderBox).on("mouseenter",".queueList li.item",function(){$(this).find(".file-panel").stop().animate({height:29})}),$(M.uploaderBox).on("mouseleave",".queueList li.item",function(){$(this).find(".file-panel").stop().animate({height:0})}),$(M.uploaderBox).on("click",".retry",function(){a[M.uploaderObj].retry()})},levelLinkage:function(e,a,o,n){var r=$(e),D=[];s(i+"api/common/organization","GET",{AccessToken:c.get("AccessToken"),Parameters:{Type:"3"}},"json",function(e){if(l(e.State,e.Message)){var I={check:{enable:!0},view:{showLine:!1,showIcon:!0,dblClickExpand:!1,selectedMulti:!1},data:{simpleData:{enable:!0}},callback:{onClick:function(e,I,t){$.fn.zTree.getZTreeObj(I).expandNode(t)},onCheck:function(e,I,t){var i=$.fn.zTree.getZTreeObj(I),g=i.getCheckedNodes(!0),M=i.getCheckedNodes(!1);$(".tree_panel").empty();for(var a=0;a<g.length;a++)3==g[a].levels&&r.find(".tree_panel").append("<li data-id="+g[a].id+">"+g[a].name+"</li>");for(var o=0;o<M.length;o++)r.find(".tree_panel li").each(function(){$(this).attr("data-id")==M[o].id&&$(this).remove()})}}};D=e.Data;var t=$("#"+a);if($.fn.zTree.init(t,I,D,"RoleMenu"),""!=o){r.find(".tree_panel").empty();for(var i=$.fn.zTree.getZTreeObj(a),g=0;g<o.length;g++){r.find(".tree_panel").append("<li data-id="+o[g].id+">"+o[g].name+"</li>");var M=i.getNodeByParam("id",o[g].id);i.checkNode(M,!0,!0)}}r.find(".comfirn").click(function(){for(var e=[],I=0;I<r.find(".tree_panel li").length;I++)e.push(r.find(".tree_panel li").eq(I).attr("data-id"));n&&n(r.find(".tree_panel").html())})}})},resetFrom:function(){$(".fa-check-circle").addClass("hide"),$(".focus,.valid").removeClass("error"),$(".mustIp").removeClass("v_error"),$(".focus,.valid").text("")},resetNiceScroll:function(){$(".body-content").getNiceScroll().resize()},eosFormatTime:function(e){var I=e.split("T")[0],t=e.split("15")[1],i=parseInt(e.split("T")[1].split(":")[0]);return I+"T"+(i+8<24?i+8:(i+8)%24).toString()+t},eosFormatTime2:function(e){var I=e,t=Date.parse(new Date(I));t+=288e5;var i,g=new Date(t);return(i=g).getFullYear()+"-"+(i.getMonth()+1)+"-"+i.getDate()+"   "+i.getHours()+":"+i.getMinutes()+":"+i.getSeconds()},eosOperators:function(e){var I={insert:$(".OperatorInsert"),deletes:$(".OperatorDel"),edit:$(".OperatorEdit"),search:$(".OperatorSearch"),print:$(".OperatorPrint"),exports:$(".OperatorExports"),imports:$(".OperatorImports"),refresh:$(".OperatorRefresh"),examine:$(".OperatorExamine"),copy:$(".OperatorCopy"),publish:$(".OperatorPublish"),download:$(".OperatorDownload"),cancel:$(".OperatorCancel"),distribute:$(".OperatorDistribute"),upload:$(".OperatorUpload")},t=e.IsExperienceProject,i=e.IsSelfProject;for(var g in I)if(I[g]){if(t&&"search"==g)continue;if(!i&&"search"==g)continue;1==e[g]&&!t&&i?I[g].show():I[g].hide()}},eosOperDataHandle:r,formatSeconds:function(e){var I=parseInt(e),t=0,i=0;60<I&&(t=parseInt(I/60),I=parseInt(I%60),60<t&&(i=parseInt(t/60),t=parseInt(t%60)));var g=parseInt(I)+"秒";return 0<t&&(g=parseInt(t)+"分"+g),0<i&&(g=parseInt(i)+"小时"+g),g},getPrintOptions:function(e){var I=r(),t={extend:"print",exportOptions:{columns:e}};return 1==I.print?t:I},timer:null}}();
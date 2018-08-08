import Vue from 'vue';
import ecos from './ecos';
import router from './router';
import store from 'src/store/'
import VueLazyload from "vue-lazyload";
import ElementUI from 'element-ui'

import '../static/plugins/datatables/css/jquery.datatables.css';
import '../static/plugins/datatables/css/buttons.bootstrap.min.css';
//import '../static/plugins/animate/animate.css';
//import '../static/eos/js/ecos_commonjs.js'
import '../static/plugins/webuploader/css/webuploader.css';
import 'src/assets/css/user.less';
import '../static/plugins/imgviewer/css/viewer.min.css';
//import '../static/plugins/jquery/jquery.v2.2.2.min.js';
import '../static/plugins/jquery-cookie/jquery.cookie.js';
import '../static/plugins/tree/js/jquery.ztree.core.js';
import '../static/plugins/tree/js/jquery.ztree.excheck.js';
import '../static/plugins/tree/js/jquery.ztree.exedit.js';
import '../static/plugins/bootstrap/bootstrap-select/js/bootstrap-select.min.js';
import '../static/plugins/datatables/js/jquery.datatables.min.js';
import '../static/plugins/bootstrap/bootstrap-datepicker/js/bootstrap-datetimepicker.min.js';
import '../static/plugins/bootstrap/bootstrap-datepicker/js/locales/bootstrap-datetimepicker.zh-CN.js';
import '../static/plugins/jquery-nicescroll/jquery.nicescroll.min.js';
import '../static/plugins/tinymce/editor.js';
import '../static/js/level_linkage.js';
//import '../static/plugins/highcharts/myHighcharts.js';
//import '../static/plugins/highcharts/highcharts-more.js';
//import '../static/plugins/highcharts/solid-gauge.js';
import '../static/plugins/highcharts/exporting.js';
import '../static/plugins/imgviewer/js/viewer.min.js';
import common_tools from './components/common/common_tools'
import '../static/plugins/highcharts/echarts-all.js'
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
	if(to.path == "/forgot" || to.path == "/register" || to.path == "/login"){
		next()
	}else {
		if(eosCommon.storage.get("AccessToken")){
			function checkCode(stateCode,mes){
			    switch (stateCode) {
			        case 99999:
			            vdialog({title: '系统提示',type:'error',content: '您的网络不给力，请稍后试试吧！',modal: true,ok: function(){}});
			            break;
			        case 0:
			            return true;
			            break;
			        case 10001:
			            vdialog({title: '系统提示',type:'alert',content: mes,modal: true,ok: function(){}});
			            break;
			        case 10002: 
			            login(mes);
			            break;
			        case 10003:
			            login(mes);
			            break;
			        case 10004:
			            vdialog({title: '系统提示',type:'alert',content: mes,modal: true,ok: function(){}});
			            break;
			        case 10005:
			            vdialog({title: '系统提示',type:'alert',content: mes,modal: true,ok: function(){}});
			            break;
			        case 10006:
			            vdialog({title: '系统提示',type:'alert',content: mes,modal: true,ok: function(){}});
			            break;
			        case 10007:
			            vdialog({title: '系统提示',type:'alert',content: mes,modal: true,ok: function(){}});
			            break;
			        case 10008:
			            vdialog({title: '系统提示',type:'alert',content: mes,modal: true,ok: function(){}});
			            break;
			        case 10009:
			            vdialog({title: '系统提示',type:'alert',content: mes,modal: true,ok: function(){}});
			            break;
			        case 10010:
			            login(mes);
			            break;
			        case 10011:
			            login(mes);
			            break;
			    }
			};
			function login(mes){
			    vdialog({
			        type: 'error',
			        title: '提示',
			        content: '您的登录已超时, 请点确定后重新登录!',
			        modal: true,
			        ok: function(){
			        	console.log('哈哈哈哈啊222');
			            next('/login');
			        },
			        close: function(){
			        	console.log('哈哈哈哈啊111');
			            next('/login');
			        }
			    });
			};
			if(to.path == '/' || to.path == '/ecos'){
		            		next('/ecos/index');		            		
		            	}else{
		            		next()
		            	}
		}else{
			next('/login');
		}
	}
})

//使用element-ui组件
Vue.use(ElementUI)
Vue.use(common_tools);
Vue.use(VueLazyload, {
    error:'',//这个是请求失败后显示的图片
    loading:'',//这个是加载的loading过渡效果
    //try: 1, // 这个是加载图片数量
    attempt:3,  
    listenEvents:['scroll','wheel','mousewheel','resize','animationend','transitionend','touchmove']
})

new Vue({
	store,
    router,
    render: h => h(ecos)
}).$mount('#ecos');


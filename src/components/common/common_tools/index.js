import LoadingComponent from './tool_components/loading'
import noDataComponent from './tool_components/noData'
import paging from './tool_components/paging'
import commonHeader from './tool_components/commonHeader'
const components=[
	LoadingComponent,
	noDataComponent,
	paging,
	commonHeader
]
const tools={
	install(Vue){		
		components.map(function(c){
			Vue.component(c.name,c);			
		})
		//components.forEach(function(c){
			//console.log('ccc3:',c);		
		//})
	}
	
//  install(Vue) {
//      Vue.component('Loading',LoadingComponent)
//      Vue.component('noData',noDataComponent);
//      Vue.component('paging',paging);
//      Vue.component('commonHeader',commonHeader);
//  }
}
export default tools
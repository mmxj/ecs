import {
	INCREMENT,
	DECREMENT,
	REGISTERTYPE,
	CHANGETAB_DETAIL,
	SETDETAIL_EQUI,
	RENDER_CHART,
	RENDER_COP,
	COPSET_PARAMS,
	RENDER_PRO_INDEX,
	UPDATE_ITEMLIST_PARAMS,
	TOGGLE_SIDEBAR,
	RESET_WINDOWHEIGHT,
	UPDATE_SHOWWHICHTAB,
	//拖拽 
	UPDATE_SETTING_STATE,
	UPDATE_IMG_ID,
	UPDATE_LABEL_ID,
	UPDATE_CHART_ID,
	UPDATE_LINE_ID,
	UPDATE_DATABLOCK_ID,
	UPDATE_DASHBOARD_ID,
	UPDATE_DATASTATE_ID,
	UPDATETEMPDATA,
	//1.底图数据
	COME_TO_UPLODEIMG,
	UPDATE_UPLOAD_IMG,
	//2.文本数据
	UPDATE_LABEL,
	GETPROTOCOLDATA,
	GET_EQUIPMENT_DATA,
	//3.曲线数据
	UPDATE_CHART,
	//數據塊
	UPDATE_DATABLOCK,
	//表盘数据
	UPDATE_DASHBOARD,
	//状态控件数据
	UPDATE_DATASTATE,
	//共用
	DELETE_CURR_PANEL,
	//数据刷新
	UPDATE_FRESHTIME_DATA,
	UPDATE_DRAGDATA_STATE,
	UPDATE_ISADDDRAG_STATE,
	UPDATE_REFS,
	UPDATE_CURRENTVIEWTAB,
	UPDATE_OPERATEMEMORY,
	//曲线数据实时刷新
	UPDATE_CHARTCURRENTDATA,
	//数据块数据实时刷新
	UPDATE_DATABLOCKCURRENTDATA,
	  SET_TREEMENU,
  	SET_ACTIVEMENU,
  	UPDATE_VCOUNT,
  	SET_IMG_SELECT,
  	UPDATE_CTRDATA,
  	UPDATE_EXPOSELF,
  	UPDATE_EQLIST,
  	UPDATE_CNACTRL
	
	

} from './types'
import getters from './getters'
import { guid,delEle } from 'assets/js/common/util'
import { initConfig } from 'assets/js/common/commonData'

//定义vuex仓库内的数据初始值
const state = {
  count: 20,
  registerType: 0,
  whichTab_equi: 1,
  detail_equi: {},
  isRenderChart: true,
  //cop初始数据
  isRenderCOP: true,
  isRenderCopSetting: false,
  isRenderCopHistory: false,
  copEquipmentData: {},
  //项目首页
  isRenderPro_index: true,
  showWhichTab: 1,
  itemListParams: {
    keyWords: '',
    pageIndex: 1
  },
  //侧边栏显示隐藏
  isShowSideBar: true,
  //浏览器窗口高度
  windowHeight: document.documentElement.clientHeight,
  //拖拽
  currTargetAttr: {
    curr_setting_state: false,
    isPreview: false,
    isHasData: false,
    targetId: ''
  },

	img_upLoadURL: '',
	typesID: {
		upLoadImgID: 0,
		labelID: 0,
		chartID:0,
		lineID:0,
		datablockID:0,
		dashboardID:0,
		datastateID:0
	},
	//数据数组
	upLoadImg: [],
	label: [],
	chart:[],
	datablock:[],
	dashboard:[],
	datastate:[],
	protocolList: [],
	commonEquipmentList:{
		isEquip:false,
		EquipmentList: [],
		singleEquipmentList:[]
	},
	
	tempDragDatas: [],
	freshTimeData: {
		Rate: 5,
		Time: ''
	},
	dragDataState: {
		isObjListLoading: true,
		isDragDetalLoading: false
	},
	//设备列表是否有拖拽行为	
	isAddDragData:{
		 isAddDrag:false,
		 type:'',
		 currTypeID:'',
		 L:'',
		 T:'',
		 refs:''
	},
	refs: [],
	currentViewTab:'',
	operateMemory:{
		isDeleteClick:false
	},
	chartCurrentData:[],
	datablockCurrentData:[],
	  treeMenu: [],
	  validCount:0,
	  
	  img_select:{
	  	ScenePic:false,
	  	EquiPic:false,
	  	refs:'',
	  	sedImgDatas:{
	  		SourceId:'',
        	SourceUrl:''
	  	}
	  },
   ctrData:{
    	dialogVisible:false,
    	EquipmentId:'',
    	RegisterAddress:'',
    	valContent:'',
    	Status:[],
    	DisplayName:'', 
    	finiedDialogVisi:false
   },
   expOself:false,
   protocolHandle:{
   	hasEQList:[],
   	localEQList:[{
   		EquipmentId:'',
   		protocolList:[]
   	}]
   },
   isCanCtrl:0
	   
	
};

//用mutations调用actions.js中定义好的方法
const mutations = {
	[INCREMENT](state) {
		state.count++;
	},
	[DECREMENT](state) {
		state.count--;
	},
	[REGISTERTYPE](state, payload) {
		state.registerType = payload;
	},
	[CHANGETAB_DETAIL](state, val) {
		state.whichTab_equi = val;
	},
	[SETDETAIL_EQUI](state, newObj) {
		state.detail_equi = newObj;
	},
	[UPDATE_SHOWWHICHTAB](state, payload) {
		state.showWhichTab = payload.showWhichTab;
	},
	[RENDER_CHART](state, boolean) {
		state.isRenderChart = boolean;
	},
	[RENDER_COP](state, payload) {
		state.isRenderCOP = payload.isRenderCOP;
		if(payload.isRenderCOP) {
			state.isRenderCopSetting = !state.isRenderCOP;
			state.isRenderCopHistory = !state.isRenderCOP;
		} else {
			if(payload.copOperatorName == 'setting') {
				state.isRenderCopSetting = !state.isRenderCOP;
				state.isRenderCopHistory = state.isRenderCOP;
			} else if(payload.copOperatorName == 'historyData') {
				state.isRenderCopHistory = !state.isRenderCOP;
				state.isRenderCopSetting = state.isRenderCOP;
			}
		}
		state.copEquipmentData = payload.copEquipmentData;
	},
	[RENDER_PRO_INDEX](state, payload) {
		state.isRenderPro_index = payload.isRender;
	},
	[UPDATE_ITEMLIST_PARAMS](state, payload) {
		state.itemListParams.keyWords = payload.keyWords;
		state.itemListParams.pageIndex = payload.pageIndex;
	},
	[TOGGLE_SIDEBAR](state) {
		state.isShowSideBar = !state.isShowSideBar;
	},
	[RESET_WINDOWHEIGHT](state) {
		state.windowHeight = document.documentElement.clientHeight;
	},
	[UPDATE_SETTING_STATE](state, payload) {
		state.currTargetAttr.curr_setting_state = payload.curr_setting_state;
		state.currTargetAttr.isPreview = payload.isPreview;
		state.currTargetAttr.targetId = payload.targetId;
		state.currTargetAttr.isHasData = payload.isHasData;
	},
	[UPDATE_IMG_ID](state, payload) {
		state.typesID.upLoadImgID=guid();
	},
	[UPDATE_LABEL_ID](state, payload) {
		state.typesID.labelID=guid();
	},
	[UPDATE_CHART_ID](state, payload) {
		state.typesID.chartID=guid();		
	},
	[UPDATE_LINE_ID](state, payload) {
		state.typesID.lineID=guid();		
	},
	[UPDATE_DATABLOCK_ID](state, payload) {
		state.typesID.datablockID=guid();		
	},
	[UPDATE_DASHBOARD_ID](state, payload) {
		state.typesID.dashboardID=guid();		
	},
	[UPDATE_DATASTATE_ID](state, payload) {
		state.typesID.datastateID=guid();		
	},
	//**************底图***************************
	[UPDATE_UPLOAD_IMG](state, payload) {
		if(payload.isClear) {
			state.upLoadImg = [];
			for(let i = 0; i < payload.imgDatas.length; i++) {
				state.upLoadImg.push(payload.imgDatas[i]);
			}
			return;
		} else {
			state.upLoadImg.push(payload.imgDatas);
		}

	},
	//**************底图***************************
	[COME_TO_UPLODEIMG](state, payload) {
		for(var i = 0; i < state.upLoadImg.length; i++) {
			if(payload.panelId == state.upLoadImg[i].refs) {
				state.upLoadImg[i].editData.imgUrl = payload.imgUrl;
				state.upLoadImg[i].editData.ResoureId = payload.ResourceId;
				if(payload.Type==0||payload.Type==1){
					state.upLoadImg[i].Type = payload.Type;					
				}
			}
		}
	},
	//更新文本 
	[UPDATE_LABEL](state, payload) {
		if(payload.isFreshLabel) {
			for(let i = 0; i < state.label.length; i++) {
				if(payload.labelContentInfo.Id == state.label[i].refs) {
					state.label[i].editData.labelContent = payload.labelContentInfo.labelContent;
				}
			}
			return;
		}
		if(payload.isClear) {
			state.label = [];
			state.label = payload.labelDatas;		
			return;
		} else {
			state.label.push(payload.labelDatas);
		}
	},
	//更新曲线
	[UPDATE_CHART](state, payload) {
		if(payload.isFreshChart) {
			for(let i = 0; i < state.chart.length; i++) {
				if(payload.chartContentInfo.Id == state.chart[i].refs) {
					state.chart[i].editData.chartContent = payload.chartContentInfo.chartContent;
				}
			}
			return;
		}
		if(payload.isClear) {
			state.chart = [];					
			state.chart = payload.chartDatas;
			return;
		} else {
			state.chart.push(payload.chartDatas);
		}
	},
	//更新数据块
	[UPDATE_DATABLOCK](state, payload) {
		if(payload.isFreshDatablock) {
			return;
		}
		if(payload.isClear) {
			state.datablock = [];					
			state.datablock = payload.datablockDatas;
			return;
		} else {
			state.datablock.push(payload.datablockDatas);
		}
	},
	//更新仪表盘
	[UPDATE_DASHBOARD](state, payload) {				
		if(payload.isFreshDashboard) {
			for(let i = 0; i < state.dashboard.length; i++) {
				if(payload.dashboardContent.Id == state.dashboard[i].refs) {					
					state.dashboard[i].value = payload.dashboardContent.Value;
					setTimeout(()=>{
						try{
							state.dashboard[i].value=state.dashboard[i].colorSettingInfo[0].startNum;
						}catch(err){
						}					
					},state.freshTimeData.Rate*1000-500);
				}
			}
			return;
		}
		if(payload.isClear) {
			state.dashboard = [];					
			state.dashboard = payload.dashboardDatas;
			return;
		} else {
			state.dashboard.push(payload.dashboardDatas);
		}
	},
	//更新数据状态控件
	[UPDATE_DATASTATE](state, payload) {				
		if(payload.isFreshDatastate) {
			for(let i = 0; i < state.datastate.length; i++) {
				if(payload.StateGraphId == state.datastate[i].refs) {
					state.datastate[i].stateValue = payload.datastateValue;
					state.datastate[i].OriginValue = payload.OriginValue;
				}
			}
			return;
		}
		if(payload.isClear) {
			state.datastate = [];					
			state.datastate = payload.datastateDatas;
			return;
		} else {
			state.datastate.push(payload.datastateDatas);
		}
	},
	//删除当前控件
	[DELETE_CURR_PANEL](state, payload) {
		if(payload.isResetOperateMemory){
			state.operateMemory.isDeleteClick=false;
			return;
		}
		state.operateMemory.isDeleteClick=payload.isDeleteClick;
		let ctrlList=initConfig.ctrlList;		
		let len=ctrlList.length;
		for(let i=0;i<len;i++){
			if(payload.typeName==ctrlList[i]){
				state[`${ctrlList[i]}`]=delEle('DELETECURR',state[`${ctrlList[i]}`],payload.currenIndex);
			}
		}
	},
	[GETPROTOCOLDATA](state, payload) {
		state.protocolList = payload.protocolList;
	},
	[GET_EQUIPMENT_DATA](state, payload) {
		state.commonEquipmentList.isEquip = payload.isEquip;
		if(payload.isEquip){			
			state.commonEquipmentList.singleEquipmentList = payload.EquipmentList;			
		}else{
			state.commonEquipmentList.EquipmentList = payload.EquipmentList;						
		}
	},
	//更新临时数据
	[UPDATETEMPDATA](state, payload) {
		if(payload.isClear) {
			if(payload.data == 'save') {
				state.tempDragDatas = [];
				return;
			}
			let len1 = state.tempDragDatas.length;
			let ctrlList=initConfig.ctrlList;		
			let len=ctrlList.length;
			let params=[];
			for(let j = 0; j < len1; j++) {
				for(let i=0;i<len;i++){	
					params=['UPDATETEMP',state[`${ctrlList[i]}`],state.tempDragDatas[j]];
					state[`${ctrlList[i]}`]=delEle(...params);
				}
			}
			state.tempDragDatas = [];
			return;
		}
		state.tempDragDatas.push(payload.data)
	},
	[UPDATE_FRESHTIME_DATA](state, payload) {
		state.freshTimeData.Rate = payload.Rate;
		state.freshTimeData.Time = payload.Time;
	},
	[UPDATE_DRAGDATA_STATE](state, payload) {
		state.dragDataState.isObjListLoading = payload.isObjListLoading;
		state.dragDataState.isDragDetalLoading = payload.isDragDetalLoading;
	},
	[UPDATE_ISADDDRAG_STATE](state, payload) {
		state.isAddDragData= payload;
	},
	[UPDATE_REFS](state, payload) {	
		state.isAddDragData.isAddDrag = false;
	},
	[UPDATE_CURRENTVIEWTAB](state, payload) {
		state.currentViewTab = payload;
	},
	[UPDATE_OPERATEMEMORY](state, payload) {
		state.operateMemory.isDeleteClick = payload.isDeleteClick;
	},
	[UPDATE_CHARTCURRENTDATA](state,payload){
		state.chartCurrentData=payload;
	},
	[UPDATE_DATABLOCKCURRENTDATA](state,payload){	
		state.datablockCurrentData=payload;
	},
	 [SET_TREEMENU](state, newTreeMenu) {
    state.treeMenu = newTreeMenu;
  },
  [SET_ACTIVEMENU](state, filePath) {
    let ok = false
    let childrenMenu = []
    let pId = ''
    for (let item of state.treeMenu) {
      item.isActive = false
      if (item.hasOwnProperty('children')) {
        childrenMenu.push(...item.children)
      }
      if (filePath == item.file) {
        item.isActive = true
        ok = true
      }
    }
    if (ok) {
      return
    } else {
      for (let item of childrenMenu) {
        if (filePath == item.file) {
          pId = item.pId
          break
        }
      }
      for (let item of state.treeMenu) {
        if (item.id == pId) {
          item.isActive = true
          return
        }
      }
    }
    // console.log(`${filePath}路径在菜单对象中不存在`)
  },
  [UPDATE_VCOUNT](state,payload){
  	if(payload.isReset){
  		state.validCount=0;
  	}else{
		state.validCount++;
  	} 
  },
  [SET_IMG_SELECT](state,payload){
  	state.img_select.refs=payload.refs; 
  	if(payload.selectType==0){
  		//进入设场景图库  		
  		state.img_select.EquiPic=false;
  		if(payload.intoImgPage){
  			state.img_select.ScenePic=true;  			 			 			
  			for(let val of state.upLoadImg){
  				if(payload.refs==val.refs){
  					val.openScenePic=true;
  					break;
  				}
  			}  			
  		}else{
  			state.img_select.ScenePic=false;
  			for(let val of state.upLoadImg){
  				if(payload.refs==val.refs){
  					val.openScenePic=false;
  					break;
  				}
  			}
  			if(payload.sedImgDatas==null){
  				state.img_select.sedImgDatas={
			  		SourceId:'',
			    	SourceUrl:''
			  	}
  				return;
  			}
  		}  		  		
  	}else if(payload.selectType==1){
  		//进入设备图库
  		state.img_select.ScenePic=false; 
  		if(payload.intoImgPage){
  			state.img_select.EquiPic=true;
  			for(let val of state.upLoadImg){
  				if(payload.refs==val.refs){
  					val.openEquiPic=true;
  					break;
  				}
  			}
  		}else{
  			state.img_select.EquiPic=false;
  			for(let val of state.upLoadImg){
  				if(payload.refs==val.refs){
  					val.openEquiPic=false;
  					break;
  				}
  			}
  			if(payload.sedImgDatas==null){
  				state.img_select.sedImgDatas={
			  		SourceId:'',
			    	SourceUrl:''
			  	}
  				return;
  			}
  		}    		 		 			
  	}else{
  		state.img_select.ScenePic=false; 
  		state.img_select.EquiPic=false;
  	}
  	state.img_select.sedImgDatas={
  		SourceId:payload.sedImgDatas.SourceId,
    	SourceUrl:payload.sedImgDatas.SourceUrl
  	}
  },
  [UPDATE_CTRDATA](state,payload){
  	 state.ctrData.dialogVisible=payload.dialogVisible;
  	 state.ctrData.EquipmentId=payload.EquipmentId;
  	 state.ctrData.RegisterAddress=payload.RegisterAddress;
  	 state.ctrData.valContent=payload.valContent;
  	 state.ctrData.Status=payload.Status;
  	 state.ctrData.DisplayName=payload.DisplayName;
  	 state.ctrData.finiedDialogVisi=payload.finiedDialogVisi;
 },
 [UPDATE_EXPOSELF](state,payload){
 	state.expOself=payload.expOself;
 },
 [UPDATE_EQLIST](state,payload){
 	if(payload.updateType==0){
 		state.protocolHandle.hasEQList.push(payload.EquipmentId);
 		state.protocolHandle.hasEQList=[...new Set(state.protocolHandle.hasEQList)]
 	}else if(payload.updateType==1){
 		state.protocolHandle.localEQList.push(payload.protocolList);
 	}else if(payload.updateType==2){
 		state.protocolHandle.localEQList=payload.protocolList;
 	} 	 	
 },
 [UPDATE_CNACTRL](state,isCanCtrl){ 	
 	state.isCanCtrl=isCanCtrl;
 }
};
export default {
  state,
  mutations,
  getters
}

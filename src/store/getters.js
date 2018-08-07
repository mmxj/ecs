export default {
	count: (state) => {
		return state.count;
	},
	getOdd: (state) => {
		return state.count % 2 == 0 ? '偶数' : '奇数'
	},
	loginType:(state)=>{
		return state.registerType;
	},
	get_showWhichTab:(state)=>{
		return state.showWhichTab;
	},
	getWhichTab_equi:(state)=>{
		return state.whichTab_equi;
	},
	detail_equi:(state)=>{
		return state.detail_equi;
	},
	get_isRenderChart:(state)=>{
		return state.isRenderChart;
	},
	get_isRenderCop:(state)=>{
		return state.isRenderCOP;
	},
	get_copEquipmentData:(state)=>{
		return state.copEquipmentData;
	},
	get_isRenderCopSetting:(state)=>{
		return state.isRenderCopSetting;
	},
	get_isRenderCopHistory:(state)=>{
		return state.isRenderCopHistory;
	},
	get_isRenderPro_index:(state)=>{
		return state.isRenderPro_index;
	},
	get_itemListParams:(state)=>{
		return state.itemListParams;
	},
	isShowSideBar:(state)=>{
		return state.isShowSideBar;
	},
	windowHeight:(state)=>{
		return state.windowHeight;
	},
	//拖拽**************************************
	get_curr_setting:(state)=>{
		return state.currTargetAttr.curr_setting_state;
	},
	get_curr_isPreview:(state)=>{
		return state.currTargetAttr.isPreview;
	},
	get_curr_TargetId:(state)=>{
		return state.currTargetAttr.targetId;
	},
	get_curr_isHasData:(state)=>{
		return state.currTargetAttr.isHasData;
	},
	
	get_upLoad_img_ID:(state)=>{
		return state.typesID.upLoadImgID;
	},
	get_label_ID:(state)=>{
		return state.typesID.labelID;
	},
	get_chart_ID:(state)=>{
		return state.typesID.chartID;
	},
	get_line_ID:(state)=>{
		return state.typesID.lineID;
	},
	get_datablock_ID:(state)=>{
		return state.typesID.datablockID;
	},
	get_dashboard_ID:(state)=>{
		return state.typesID.dashboardID;
	},
	get_datastate_ID:(state)=>{
		return state.typesID.datastateID;
	},
	get_upLoad_img_data:(state)=>{
		return state.upLoadImg;
	},
	get_label_data:(state)=>{
		return state.label;
	},
	get_chart_data:(state)=>{
		return state.chart;
	},
	get_datablock_data:(state)=>{
		return state.datablock;
	},
	get_dashboard_data:(state)=>{
		return state.dashboard;
	},
	get_datastate_data:(state)=>{
		return state.datastate;
	},
	get_protocol_data:(state)=>{
		return state.protocolList;
	},
	get_equipment_data:(state)=>{
		if(state.commonEquipmentList.isEquip){
			return state.commonEquipmentList.singleEquipmentList;
		}
		return state.commonEquipmentList.EquipmentList;
	},
	get_tempDrag_Datas:(state)=>{
		return state.tempDragDatas;
	},
	get_freshTime_Data:(state)=>{
		return state.freshTimeData;
	},
	get_dragDataState:(state)=>{
		return state.dragDataState;
	},
	get_isAddDrag_state:(state)=>{
		return state.isAddDragData.isAddDrag;
	},
	get_isAddDrag_data:(state)=>{
		return state.isAddDragData;
	},
	get_refs_data:(state)=>{
		return state.refs;
	},
	get_currentViewTab_data:(state)=>{
		return state.currentViewTab;
	},
	get_isDeleteClick_state:(state)=>{
		return state.operateMemory.isDeleteClick;
	},
	get_chartCurr_data:(state)=>{
		return state.chartCurrentData;
	},
	get_datablockCurr_data:(state)=>{
		return state.datablockCurrentData;
	},
  get_treeMenu: (state) => {
    return state.treeMenu;
  },
  get_validCount:(state)=>{
  	 return state.validCount;
  },
  openScenePic:(state)=>{
  	 return state.img_select.ScenePic;
  },
  openEquiPic:(state)=>{
  	 return state.img_select.EquiPic;
  },
  get_sedImgDatas:(state)=>{
  	 return state.img_select.sedImgDatas;
  },
  get_CurrImgRefs:(state)=>{
  	 return state.img_select.refs;
  },
  get_ctrData:(state)=>{
  	 return state.ctrData;
  },
  get_expOself:(state)=>{
  	 return state.expOself;
  },
  get_STORE_idlist:(state)=>{
  	 return state.protocolHandle.hasEQList;
  },
  get_STORE_protocol:(state)=>{
  	 return state.protocolHandle.localEQList;
  },
  get_isCanCtrl:(state)=>{
  	 return state.isCanCtrl;
  }
}

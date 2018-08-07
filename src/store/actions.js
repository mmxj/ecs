import * as types from './types'

export default {
  increment: ({
    commit
  }) => {
    commit(types.INCREMENT);
  },
  decrement: ({
    commit
  }) => {
    commit(types.DECREMENT);
  },
  clickOdd: ({
    commit,
    state
  }) => {
    if (state.mutations.count % 2 == 0) {
      commit(types.INCREMENT);
    }
  },
  clickAsync: ({
    commit
  }) => {
    new Promise((resolve) => {
      setTimeout(function() {
        commit(types.INCREMENT);
      }, 1000);
    })
  },
  changeRgisterType: ({
    commit
  }, payload) => {
    console.log(payload);
    commit(types.REGISTERTYPE, payload);
  },
  changetab_detail: ({
    commit
  }, val) => {
    commit(types.CHANGETAB_DETAIL, val);
  },
  setdetail_equi: ({
    commit
  }, newObj) => {
    commit(types.SETDETAIL_EQUI, newObj);
  },
  render_chart: ({
    commit
  }, boolean) => {
    commit(types.RENDER_CHART, boolean);
  },
  //	render_comsumption: ({commit	
  //	},boolean) => {
  //		commit(types.RENDER_CHART,boolean);
  //	},
  //设置侧边栏显示隐藏
  toggle_sidebar: ({
    commit
  }) => {
    commit(types.TOGGLE_SIDEBAR);
  },
  //设置窗口高度
  reset_windowHeight: ({
    commit
  }) => {
    commit(types.RESET_WINDOWHEIGHT);
  },
  /*,hand_UPDATE_ISADDDRAG_STATE: ({commit	
  }) => {
  	commit(types.UPDATE_ISADDDRAG_STATE,payload);
  }
  hand_UPDATE_REFS: ({commit	
  }) => {
  	commit(types.UPDATE_REFS,payload);
  }*/
// clearAllDrag:({commit},emptyArr)=>{
// },
  update_showwhichtab: ({
    commit
  }, newTab) => {
    commit(types.UPDATE_SHOWWHICHTAB, newTab);
  },
  set_treeMenu: ({
    commit
  }, newArr) => {
    commit(types.SET_TREEMENU, newArr);
  },
  set_activeMenu: ({
    commit
  }, filePath) => {
    commit(types.SET_ACTIVEMENU, filePath);
  }
}

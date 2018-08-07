const initCommonDragData = {
  typeNameList: [{
      typeName: 'label',
      dragMinWidth: 50,
      dragMinHeight: 45
		},
    {
      typeName: 'upLoadImg',
      dragMinWidth: 100,
      dragMinHeight: 100
		},
    {
      typeName: 'chart',
      dragMinWidth: 220,
      dragMinHeight: 130
		},
    {
      typeName: 'dashboard',
      dragMinWidth: 150,
      dragMinHeight: 150
		},
    {
      typeName: 'datablock',
      dragMinWidth: 180,
      dragMinHeight: 74
		},
    {
      typeName: 'datastate',
      dragMinWidth: 45,
      dragMinHeight: 45
		}
		],
    Directions: ['L', 'B', 'R', 'T', 'LT', 'LB', 'RT', 'RB']
}
let initConfig = {
  ctrlList: [
			'upLoadImg',
			'label',
			'chart',
			'datablock',
			'dashboard',
			'datastate'
		],
  defLabelStyle: {
    fontSize: '14',
    color: '#1F2D3D',
    fontWeight: 'normal',
    fontItalic: 'normal',
    fontUnderLine: 'normal',
    AlignType: 1
  },
  typeDatas() {
    let typeDatas = [];
    for(let val of this.ctrlList) {
    	if(val=='upLoadImg'){		
    		val='upLoad_img';
    	}
      typeDatas.push(`get_${val}_data`);
    }
    return typeDatas;
  }
}
//拖拽图片类
class DragImg{
  constructor({
    refs,
    IsEquipment
  }) {
    console.log(refs, IsEquipment);
    //super(refs, IsEquipment);   
    this.refs = refs;
    this.IsEquipment = IsEquipment;
    this.imgDatas = this.getImgDatas();
  }
  getImgDatas() {
    return {
      typeName: `upLoadImg`,
      refs: this.refs,
      openScenePic: false,
      openEquiPic: false,
      Type: 0,
      IsEquipment: this.IsEquipment,
      editData: {
        imgUrl: '',
        layOutStyle: {
          left: '',
          top: '',
          width: '',
          height: ''
        }
      }
    };
  }
}
//公共类数据
class CommonDrag {
  constructor(refs='', IsEquipment=false,equiTabData={},ProjectId='') {
  	this.refs=refs;
  	this.ProjectId=ProjectId;
    this.equiTabData = equiTabData;
    this.IsEquipment = IsEquipment;
    if(this.IsEquipment) {
      let paramArr = [
					this.equiTabData.EquipmentName,
					this.equiTabData.EquipmentId
				]
      this.eqInfo = this.getEqInfo(...paramArr);
    } else {
      this.eqInfo = this.getEqInfo();
    }
  }
  getEqInfo(EquipmentAlias = '', EquipmentId = '') {
    return {
      EquipmentAlias,
      EquipmentId
    }
  }
}
//拖拽文本类
class DragLabel extends CommonDrag {
  constructor({
    refs,
    IsEquipment,
    equiTabData,
    ProjectId,
    defLabelStyle
  }) {
    super(refs, IsEquipment,equiTabData,ProjectId);
    this.defLabelStyle = defLabelStyle;
    this.labelDatas = this.getLabelDatas();
  }
  getLabelDatas() {
    let vm = this;
    return {
      typeName: `label`,
      IsEquipment: vm.IsEquipment,
      eqInfo: [vm.eqInfo],
      ProjectId: vm.ProjectId,
      refs: vm.refs,
      protocolList: [],
      previewData: {
        labelContent: ''
      },
      editData: {
        layOutStyle: {
          left: '',
          top: '',
          width: '170px',
          height: '45px'
        },
        selectDataType: 'fixedTxt',
        PrePositionValue: '',
        val: '--',
        IsMain: 0,
        AliasName: '',
        noDataVal: '--',
        labelContent: '文本内容...',
        PostPositionValue: '',
        Style: vm.defLabelStyle,
        PostPositionStyle: vm.defLabelStyle,
        PrePositionStyle: vm.defLabelStyle,
        dataStream: {
          RegisterAddress: '',
          EquipmentId: vm.eqInfo.EquipmentId
        }
      }
    }
  }
}
//曲线拖拽类
class DragChart extends CommonDrag {
  constructor({
    refs,
    IsEquipment,
    equiTabData,
    ProjectId,
    get_equipment_data,
    containerID,
    lineID
  }) {
    super(refs, IsEquipment,equiTabData,ProjectId);
  this.get_equipment_data = get_equipment_data;
    this.containerID = containerID;
    this.lineID = lineID;
    this.chartDatas = this.getChartDatas();
  }
  getChartDatas() {
    let vm = this;
    return {
      typeName: `chart`,
      Interval: 10,
      IsEquipment: vm.IsEquipment,
      eqInfo: [vm.eqInfo],
      ProjectId: vm.ProjectId,
      //typeId: currChartID,
      refs: vm.refs,
      title: '文本',
      previewData: {},
      editData: {
        layOutStyle: {
          left: '',
          top: '',
          width: '220px',
          height: '130px'
        }
      },
      containerID: vm.containerID,
      chartName: '',
      backgroundColor: '#EEF6F6',
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 50,
        //x轴分割线
        gridZIndex: 4,
        gridLineColor: '#8492a6',
        gridLineDashStyle: 'longdash',
        lineColor: '#8492a6',
        gridLineWidth: true,
      },
      yAxis: {
        lineWidth: 1,
        gridLineColor: '#8492a6', //y轴分割线
        lineColor: '#8492a6', //右y轴颜色
        gridLineWidth: true,
        visible: true
      },
      rightYAxis: {
        lineWidth: 1, //y轴粗细,
        lineColor: '#8492a6',
        visible: true
      },
      singleChartDataLists: [{
        //title:'气温数据图',
        get_equipment_data: vm.get_equipment_data,
        get_protocol_data: [],
        protocolList: [],
        lineId: vm.lineID,
        dataStream: {
          RegisterAddress: '',
          EquipmentId: vm.eqInfo.EquipmentId
        },
        color: '#fff', //rgb(102, 102, 102)
        chartDataSetting: {
          //axis:0//用于哪个轴0：左Y轴  1：右Y轴
        },
        chartAxisSetting: {
          info: '设置' + 0
        },
        yAxis: {
          title: {
            text: ''
          },
          //y轴分割线
          gridLineColor: '#8492a6',
          gridLineDashStyle: 'longdash',
          gridLineWidth: true,
          color: '#EF2D3D',
          lineWidth: 1, //y轴粗细
          lineColor: '#8492a6', //#FF0000
          opposite: false,
          showEmpty: false,
          visible: true
        },
        yData: {
          name: '',
          yAxis: 0,
          color: '#00a2e9', //#EF0C0C
          data: []
        }
              }]
    }
  }
}
//数据块拖拽类
class DragDatablock extends CommonDrag {
  constructor({
    refs,
    IsEquipment,
    equiTabData,
    ProjectId,
    get_equipment_data,
    lineID
  }) {
    super(refs, IsEquipment,equiTabData,ProjectId);
  	this.get_equipment_data = get_equipment_data;
    this.lineID = lineID;
    this.datablockDatas = this.getBlockDatas();
  }
  getBlockDatas() {
    let vm = this;
    return {
      typeName: `datablock`,
      IsEquipment: vm.IsEquipment,
      eqInfo: [vm.eqInfo],
      ProjectId: vm.ProjectId,
      refs: vm.refs,
      title: '标题',
      previewData: {
        datablockContent: ''
      },
      editData: {
        layOutStyle: {
          left: '',
          top: '',
          width: '220px',
          height: '74px'
        },
        title: '黄君福',
        datablockBg: '#fff',
        datablockTitleBg: '#EEF6F6',
        Style: {
          fontSize: '12',
          color: '#1F2D3D',
          fontWeight: 'bold',
          fontItalic: 'normal',
          fontUnderLine: 'normal',
          AlignType: 1
        }
      },
      singleDatablockLists: [{
        //title:'气温数据图',
        get_equipment_data: vm.get_equipment_data,
        get_protocol_data: [],
        protocolList: [],
        lineID: vm.lineID,
        dataStream: {
          RegisterAddress: '',
          EquipmentId: vm.eqInfo.EquipmentId
        },
        IsMain: 0,
        AliasName: '',
        dataName: '',
        dataValue: '--',
        Unit: '',
        valContent: '',
        PrePositionStyle: {
          fontSize: '12',
          color: '#1F2D3D',
          fontWeight: 'normal',
          fontItalic: 'normal',
          fontUnderLine: 'normal',
          AlignType: 1
        },
        PostPositionStyle: {
          fontSize: '12',
          color: '#1F2D3D',
          fontWeight: 'normal',
          fontItalic: 'normal',
          fontUnderLine: 'normal',
          AlignType: 1
        }
          }]
    }
  }
}
//仪表盘拖拽类
class DragDashboard extends CommonDrag {
  constructor({
    refs,
    IsEquipment,
    equiTabData,
    ProjectId,
    get_equipment_data,
    currDashboardID
  }) {
    super(refs, IsEquipment,equiTabData,ProjectId);
  this.get_equipment_data = get_equipment_data;
    this.currDashboardID = currDashboardID;
    this.dashboardDatas = this.getDashBoardDatas();
  }
  getDashBoardDatas() {
    let vm = this;
    return {
      typeName: `dashboard`,
      containerID: `container${vm.currDashboardID}`,
      IsEquipment: vm.IsEquipment,
      eqInfo: [vm.eqInfo],
      protocolList: [],
      ProjectId: vm.ProjectId,
      typeId: vm.currDashboardID,
      refs: vm.refs,
      title: '文本',
      DisplayName: '',
      Unit: '',
      value: 0,
      IsMain: 0,
      AliasName: '',
      dataStream: {
        RegisterAddress: '',
        EquipmentId: vm.eqInfo.EquipmentId
      },
      colorSettingInfo: [{
        startNum: 0,
        endNum: 20,
        regionColor: '#1ABC9C'
	      }, {
        startNum: 20,
        endNum: 80,
        regionColor: '#FF8C00'
	      }, {
        startNum: 80,
        endNum: 100,
        regionColor: '#E74C3C'
	      }],
      previewData: {
        dashboardContent: ''
      },
      editData: {
        layOutStyle: {
          left: '',
          top: '',
          width: '218px',
          height: '218px'
        },
        title: '黄君福'
      }
    }
  }
}
//数据状态拖拽类
class DragDatastate extends CommonDrag {
  constructor({
    refs,
    IsEquipment,
    equiTabData,
    ProjectId,
    get_equipment_data,
    currDatastateID
  }) {
    super(refs, IsEquipment,equiTabData,ProjectId);
  this.get_equipment_data = get_equipment_data;
    this.currDatastateID = currDatastateID;
    this.datastateDatas = this.getDatastateDatas();
  }
  getDatastateDatas() {
    let vm = this;
    return {
      typeName: `datastate`,
      IsEquipment: vm.IsEquipment,
      eqInfo: [vm.eqInfo],
      protocolList: [],
      ProjectId: vm.ProjectId,
      typeId: vm.currDatastateID,
      refs: vm.refs,
      stateValue: 2,
      OriginValue: '',
      dataStream: {
        RegisterAddress: '',
        EquipmentId: vm.eqInfo.EquipmentId
      },
      editData: {
        layOutStyle: {
          left: '',
          top: '',
          width: '45px',
          height: '45px'
        }
      }
    }
  }
}
//保存数据字体样式类
class StyleSavecommon{
	constructor(Style){
		 this.Color = Style.color;
	    this.FontSize = Style.fontSize;
			this.IsBold = Style.fontWeight == 'bold';
			this.IsItalic = Style.fontItalic == 'italic';
			this.IsUnderLine = Style.fontUnderLine == 'underline';
			this.AlignType=1;
	}
}
//取数据展示字体样式类
class StyleShowcommon{
	constructor(Style){
		 this.color = Style.Color;
	    this.fontSize = Style.FontSize;
			this.fontWeight = !Style.IsBold ? 'normal' : 'bold';
			this.fontItalic = !Style.IsItalic ? 'normal' : 'italic';
			this.fontUnderLine = !Style.IsUnderLine ? 'normal' : 'underline';
			this.AlignType=1;
	}
}
export {
  initCommonDragData,
  initConfig,
  DragImg,
  DragLabel,
  DragChart,
  DragDatablock,
  DragDashboard,
  DragDatastate,
  StyleSavecommon,
  StyleShowcommon
}

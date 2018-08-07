<style scoped lang='less'>
.equimentUnit {
  cursor: pointer;
  padding: 20px;
  overflow: hidden;
  width: 220px;
  background: #DFECEB;
  transition: background .3s;
  position: relative;
  & img {
    display: block; // background: #fff;
    border-radius: 5px;
    width: 180px;
    height: 125px;
  }
  & p {
    margin-top: 5px;
    text-align: center;
  }
}


.equimentUnit:hover {
  transition: background .5s;
  background: #CCE2DF;
}

.equimentList {
  /*// min-height: 200px;
  // max-height: 500vh;*/
  border-right: 1px solid #DFECEB;
  height: 50vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 50px;
}

.equimentFoot {
  position: absolute;
  bottom: 0;
  line-height: 50px;
  height: 50px; // padding: 20px;
  overflow: hidden;
  width: 220px;
  background: #DFECEB;
}

.fa-plus {
  margin-left: 28px;
}

.fa-wrench {
  margin-left: 15px;
}

.fa-pencil {
  border-radius: 50%;
  font-size: 2px
}

.fa-trash-o {
  border-radius: 50%;
  font-size: 3px;
  margin-left: 0;
}

.btnbox {
  position: absolute;
  opacity: .8;
  top: 30px;
  right: 26px;
}
ul,li{
	list-style: none;
	padding: 0;
	margin: 0;
	
}
.pdb0{padding-bottom: 0}
.objs {
		height: 100%;
		width: 100%;
		position: relative;
		}
ul.lists{
	/*background: #d1e3e2;*/
	position: relative;
			background: #d1e3e2;
			padding-left: 0;
			top:0;
			bottom: 0;
			height: 100%;
			width:100%; 
			overflow-y:auto;
	/*overflow: scroll;*/
	& li{
			padding: 10px;
			width: 100%;
			position: relative;
			.left_pic img{
				width:60px;
				height: 40px;
				
			}
	}
	.right_info{
		margin-left: 10px;
		.EquipmentAlias{
      position: relative;
      top: -4px;
      & p{
        max-width: 120px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        text-align: left;
        color: #000;
      }
    }

	}
	.onlineClass{
		color: #2ECC71;;
	}
	.state_icon span{
		font-size: 12px;
    background: #abc;
    border-radius: 10px;
    padding: 0 5px;
    color: #fff;
    // transform:scale(2,2.5);  
	}
}
.active {
  background: #fff;
}
.equipmentOperates{
	position: absolute;
	right: 10px;
	top: 6px;
  background: #fff;
  padding-left: 10px;
	& a {
		cursor: pointer;
			i{
			font-size: 16px;
			}
	}
	.text-pencil {
        color: #1abc9c;
    }
     .text-trash-o {
        color: #ff3f4e;
    }
}
  
 .commonIcoColor{
		color: #97bebc;
	}
	.text-trash-o i,
	.text-pencil i
	{
		font-size: 24px!important;
	}
	.operates{
		width: 220px;
		/*position: fixed;*/
		position: absolute;
		bottom: 0;
		height: 80px;
		background: #d1e3e2;
		/*border-top: 1px solid saddlebrown;*/
		.operatesBtns{
			width: 100%;
			/*margin-top: 50px;*/
			.btn_wrap{
				padding: 0 18px;
			}
		}
		.paging{
			width: 100%;
				position: relative;
				height: 80px;
			/*margin-top: 44px;*/
		}
		.paging_sp{
			width: 40px;
			padding: 15px 0;
		
			text-align: center;
		}
		.paging_btn{
			width: 15px;
			padding: 15px 0;
			& button{
				margin-left: 0;
				cursor: pointer;
			}
			& button:hover{
				color: red
			}
		}
		.paging_go{
			width: 112px;
			margin-left: 10px;
			/*margin-top: 10px;*/
			/*padding: 10px 0;*/
			.allToal{
				width:53px; 
				padding: 15px 0;
				color: #000;
				text-align: center;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}
  .bdb{border-bottom: 1px solid #fff;}
</style>
<template>
	<div class="objs">
		<ul class="lists" style="height: 100%;" > <!--:style="ulClass"-->
			<li class="clearfix curp bdb" v-for='(item,index) in tableData' :class='{active:item.isActive}' @click='getEquipmentId(item,index)'>
				<div class="left_pic pull-left">
					<img class="img-responsive" :alt="item.EquipmentAlias" v-lazy="customLazy(item.EquipmentPhoto,defaultEqui_img)"/>
				</div>
				<div class="right_info pull-left">
					<div class="EquipmentAlias">
           <p :title="item.EquipmentAlias" class="tab-title-top">{{item.EquipmentAlias}}</p>
					 <p style="color: #797979;font-size: 12px" :title="item.EquipmentPlace" class="tab-title-top">{{item.EquipmentPlace}}</p>
					</div>
					<div class="state_icon">
            <span class="mr5" title='在线状态' :style='item.IsOnline == 1?onlineBgSty.style0:onlineBgSty.style1'>{{item.IsOnline == 1?'在':'离'}}线</span>
						<!-- <i :title="item.OnlineStatusName|IsOnline" v-if="item.IsOnline == 1" style="color:#2ECC71;" class="fa  fa-rss-square m-r-5"></i>
            <i :title="item.OnlineStatusName|IsOnline" v-if="item.IsOnline == 0"  class="fa  fa-rss-square m-r-5"></i> -->
						
						<!--运行状态-->
            <span class="mr5" :title='"具体运行状态："+item.RunStateName' :style='(item.IsOnline!= 1||item.RunState!=1)?onlineBgSty.style1:onlineBgSty.style0'>{{(item.IsOnline!= 1||item.RunState==0)?'未知':(item.RunState == 1?'运行':'停机')}}</span>
            <!-- <span class="mr5" :title='"具体运行状态："+item.RunStateName' :style='item.RunState == 1?onlineBgSty.style0:onlineBgSty.style1'>{{item.RunState == 1?'运行':(item.RunState == 2?'停机':'未知')}}</span> -->
						<!-- <i :title="item.RunState|RunStatus" :class="[item.IsOnline == 0 ? '' : 'onlineClass']" class="fa fa-cog text-grey"></i> -->
						<!--报警项： fa-gears  fa-meh-o-->
            <span title='报警状态' 
            :style='item.AlarmLevel == 3?alarmBgSty.style3:(item.AlarmLevel == 2?alarmBgSty.style2:(item.AlarmLevel == 1?alarmBgSty.style1:alarmBgSty.style0))'>
              {{item.AlarmLevel == 3?'报警':(item.AlarmLevel == 2?'警告':(item.AlarmLevel == 1?'提醒':'正常'))}}
            </span>
						<!-- <i :title="item.AlarmLevelName|AlarmLevelName" v-if="item.AlarmLevel == 0"  style="color: #2ECC71;" class="fa fa-bell text-grey"></i>
						<i v-if="item.AlarmLevel == 1" :title="item.AlarmLevelName|AlarmLevelName" style="color: #3498db;" class="fa fa-info-circle text-grey"></i>
						<i v-if="item.AlarmLevel == 2" :title="item.AlarmLevelName|AlarmLevelName" style="color: #f39c12;" class="fa fa-exclamation-triangle text-grey"></i>
						<i v-if="item.AlarmLevel == 3" :title="item.AlarmLevelName|AlarmLevelName" style="color: #e74c3c;" class="fa fa-bell text-grey"></i> -->
					</div>
				</div>
				<div class="equipmentOperates" v-if='isShowDebugBtnByRoute&& item.isActive && item.show'>
					<a @click.stop='editEq' title="编辑设备" style="margin-right: 5px;" class="m-rigth font-size-text commonIcoColor" :class="{'text-pencil':(iconType=='text-pencil'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-pencil',index)" @mouseleave="addOremoveActiveClass('')"><i class="fa fa-pencil"></i></a>
					<a @click='confirmDeleteEq' title="删除设备" class="m-rigth font-size-text commonIcoColor" :class="{'text-trash-o':(iconType=='text-trash-o'&& currActiveIndex==index)}" @mouseenter="addOremoveActiveClass('text-trash-o',index)" @mouseleave="addOremoveActiveClass('')"><i class="fa fa-trash-o"></i></a>
				</div>
				
			</li>
			<div style="height: 80px;width: 100%;">
			</div>
		</ul>
		<div class="operates">
			<div class="paging clearfix">
					<span class="btn_lists pull-left" style="margin-left: 15px;">
						<span class="paging_btn">
							<button :disabled="PageIndex==1" style="padding: 0;"  class="btn btn-sm glyphicon glyphicon-menu-left" @click="lastPage()"></button>
		        </span>
		        <span class="paging_sp paging_info">
		        	<span style="color: #000000;">{{PageIndex}}</span>/<span >{{page_record}}</span>
		        </span>	        
		        <span  class="paging_btn ">	
		        		<!--{{PageIndex}},{{page_record}}-->
		        		 <button :disabled="PageIndex==page_record" style="padding: 0;"  class="btn btn-sm glyphicon glyphicon-menu-right" @click="nextPage()"></button>
		        </span>
					</span>
	        <span class="paging_go pull-left">
				      <span class="allToal">				       
				       		 共{{propsData.Total}}条
				      </span>
				       <input style="width: 42px; height: 30px; margin-top: -45px;" v-model.number="pageNum" type="text" class="form-control" placeholder="页码">
	        </span>
	        <div v-if='isShowDebugBtnByRoute && isShowDebugBtnByRole_PJ' class="operatesBtns form-inline clearfix" style="width:100px;height:26px;position: absolute; bottom: 8px;left: 50%; margin-left: -67px;">
							<span class="btn_wrap pull-left" >
		            <button @click='addEquipment' style="padding-top: 2px; padding-bottom: 2px; " id="btnInsert" type="button" class="btn btn-default" >
		                <i style="margin-left: 0;" class="fa fa-plus m-r-5"></i>添加设备
		            </button>
			      	 </span>
					</div>
			</div>
			<!--<div class="operatesBtns form-inline clearfix" v-if='isShowDebugBtnByRoute && isShowDebugBtnByRole_PJ'>
				<span class="pull-left btn_wrap">
            <button @click='addEquipment' id="btnInsert" type="button" class="btn btn-default" >
                <i style="margin-left: 0;" class="fa fa-plus m-r-5"></i>添加
            </button>
        </span>
				<span class="pull-left btn_wrap">
            <button  @click='debug' id="btn_t" type="button" class="btn btn-warning" >
                <i class="fa fa-legal m-r-5"></i>调试
            </button>
        </span>
	           

			</div>-->
		</div>
	</div>
  <!--<div class='equimentList' :class="{ pdb0: !(isShowDebugBtnByRoute && isShowDebugBtnByRole_PJ) }">
  			fa-legal
    <div class="equimentUnit" v-for='(item,index) in propsData.tableData' :class='{active:item.isActive}' @click='getEquipmentId(item.EquipmentId,index)'>
      <div class="btnbox" v-show='isShowDebugBtnByRoute && item.isActive && item.show'>
        <el-button size="mini" round type="primary" class='fa fa-pencil' @click.stop='editEq'></el-button>
        <el-button size="mini" round type="danger" class='fa fa-trash-o' @click='confirmDeleteEq'></el-button>
      </div>
      <p>
        <img :alt="item.EquipmentAlias" v-lazy="customLazy(item.EquipmentPhoto,defaultEqui_img)"/>
      </p>
      <p>{{item.EquipmentAlias}}</p>
    </div>
    <div class="equimentFoot" v-show='isShowDebugBtnByRoute && isShowDebugBtnByRole_PJ'>
      <el-button type="primary" class='fa fa-plus' size='small' @click='addEquipment'>&nbsp;添加</el-button>
      <el-button type="warning" class='fa fa-wrench' size='small' @click='debug'>&nbsp;调试</el-button>
    </div>
  </div>-->
</template>
<script>
import * as Common from 'src/assets/js/common';
import commonFn from '../../assets/js/common/commonFunc'
import {mapGetters,mapMutations} from 'vuex'
let URL = Common.Const.url
let FUNC = Common.Func
const AXIOS = FUNC.axios
const DELETE = AXIOS.delete
const STYLE = Common.Const.style
export default {
  data: function() {
    return {
      onlineBgSty: STYLE.onlineStatusLable,
      alarmBgSty: STYLE.alarmLevelLable,
      isShowDebugBtnByRoute: null,
      isShowDebugBtnByRole_PJ: null,
      deleteEqUrl: URL.EQUIPMENTDELETE, //删除应用条目url
      defaultEqui_img:'../../../../static/css/img/commonEquipList_default.png',
      //整改
      currActiveIndex:'',
      iconType:'',
      winHeight:0,
      PageIndex:1,
      pageNum:'',
      page_record:0,
      tableData:[],
      EquipmentId:'',
      scrollTop:'',
      itemIndex:0
    }
  },
  props: ['propsData', 'equipmentId', 'dataSend','tableLoad'],
  computed:{
  	...mapGetters([
  		'get_isDeleteClick_state',
  		'get_tempDrag_Datas'
  	])
  },
  watch: {
			pageNum(val){
				let vm=this;
				//如果是数字  且不等于零
				if((typeof val)=='number' && (val != 0)){
					vm.$emit('pageIndexChange',parseInt(val));
				}
				
			},
			'propsData.tableData'(val,oldval){
				let vm=this;
				let currEqID=vm.propsData.curEquipmentId;
				if(val.length>0){
					vm.tableData=val;					
					if(currEqID){
						val.some((v,i)=>{
							if(v.EquipmentId==currEqID)	
								vm.getEquipmentId(v,i);							
						});							
					}else{
							vm.getEquipmentId(val[0],0);
					}										
				}else{
					vm.tableData=[];
				}			
			}
  },
  filters:{
  	IsOnline(val){
  		return '在线状态：'+val;
  	},
  	RunStatus(val){
  		return '运行状态：'+val;
  	},
  	AlarmLevelName(val){
  		return '报警状态：'+val;
  	}
  },
  methods: {
  	...mapMutations({
  			gET_EQUIPMENT_DATA:'GET_EQUIPMENT_DATA',
				gETPROTOCOLDATA:'GETPROTOCOLDATA',
				uPDATE_SHOWWHICHTAB:'UPDATE_SHOWWHICHTAB'
			}),
  	lastPage(){
  		let vm=this;
  		vm.PageIndex--;
  		vm.$emit('pageIndexChange',vm.PageIndex);
  	},
  	nextPage(){
  		let vm=this;
  		vm.PageIndex++;
  		vm.$emit('pageIndexChange',vm.PageIndex);
  	},
  	onPage(){
  		//如果是大于0的正整数
  		let vm=this;
  		vm.$emit('pageIndexChange',vm.pageNum);
  	},
  	addOremoveActiveClass(iconType,currActiveIndex){
				let vm=this;
				if(iconType==''){
					vm.iconType='';
					return;
				}
				vm.iconType=iconType;
				vm.currActiveIndex=currActiveIndex;
			},
    confirmDeleteEq(){
      let vm = this
      vm.$confirm('此操作将永久删除该设备, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        vm.deleteEq(vm.dataSend.EquipmentId)
      }).catch(() => {
      })
    },
    deleteEq(EquipmentId){
      let vm = this
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters: {
          EquipmentId: EquipmentId
        }
      }
      DELETE(vm.deleteEqUrl, data).then(function(res) {
        // 成功删除后提示用户
        if (res.data.State == 0) {
          vm.$message({
            type: 'info',
            message: '删除成功!'
          });
          vm.tableLoad()
        }
      })
    },
    editEq() {
      let vm = this
      let dataSend = vm.dataSend;    
      let params = {
        EquipmentId: dataSend.EquipmentId,
        ProjectId: dataSend.ProjectId,
        EquipmentName: dataSend.EquipmentAlias,
        EquipmentPhoto: dataSend.EquipmentPhoto,
        BaseEquipmentId: dataSend.BaseEquipmentId,
        ProjectName: dataSend.ProjectName,
        ProjectLogo: dataSend.ProjectLogo,
     		isDirectInto:true,
     		isEdit:true,
     		isInsert:true
      }
       eosCommon.storage.set('routerName',vm.$route.name);
				eosCommon.storage.set('PageIndex',vm.PageIndex);
				eosCommon.storage.set('EquipmentId',dataSend.EquipmentId);
				eosCommon.storage.set('scrollTop',vm.scrollTop);
       let EntitySort=eosCommon.storage.get('EntitySort');
       let preName ='';
				if(EntitySort==0){
					preName='yz_'
				}else if(EntitySort==1){
					preName='wb_'
				}else{
					preName='sm_'
				}
				 vm.uPDATE_SHOWWHICHTAB({showWhichTab:4});
      vm.$router.push({
    		name:`${preName}equipment_detail_infos`,
        params: params
      });
    },
    //初始化组件信息
    initData() {
      let vm = this;
      vm.PageIndex=vm.propsData.PageIndex;
      vm.page_record = Math.ceil(vm.propsData.Total / vm.propsData.PageSize);
      if (vm.propsData.ProjectId) {
        let isEx = vm.propsData.IsExperienceProject
        let isSelf = vm.propsData.IsSelfProject
        vm.isShowDebugBtnByRole_PJ = FUNC.operator.operateRoleFilter(isEx,isSelf);        
      }else{
        vm.isShowDebugBtnByRole_PJ = FUNC.operator.isAdminOrProjectAdmin()
      }
      if(vm.$route.name=='consumption_manage'){
        vm.isShowDebugBtnByRoute = false
      }else{
        vm.isShowDebugBtnByRoute = true
      }
    },
    getEquipmentId(item, index) {
      let vm = this;
      vm.EquipmentId=item.EquipmentId;     
	   	eosCommon.storage.set('IsSelfProject', item.IsSelfProject);
			vm.gETPROTOCOLDATA({ protocolList: [] });
			vm.gET_EQUIPMENT_DATA({ EquipmentList: [] });
      vm.$emit('update:equipmentId', item.EquipmentId);			
			/*
			 vm.itemIndex=index;*/
			/*if(!(vm.get_tempDrag_Datas.length == 0 && (!vm.get_isDeleteClick_state))) {
					vm.$emit('update:dataSend', vm.propsData.tableData[index])
      		return;
  		}*/
	      for (let tableIndex in vm.propsData.tableData) {
	        vm.propsData.tableData[tableIndex].isActive = false
	      }
        let thisData = vm.propsData.tableData[index];               
        thisData.isActive = true;
        //vm.itemIndex=index;
        vm.$emit('update:dataSend', vm.propsData.tableData[index])
    },
    addEquipment() {
      let vm = this;
      eosCommon.storage.set('PageIndex',vm.PageIndex);
     	eosCommon.storage.set('ProjectId','')
   		eosCommon.storage.set('routerName',vm.$route.name);
      vm.$router.push({
        name: 'equipments_info',
        params: {
          ProjectId: vm.propsData.ProjectId,
          ProjectName: vm.propsData.ProjectName,
          GatewayId: '',
          GatewayName: '',
          isDirectInto:true,
          isEdit:false,
     			isInsert:true
        }
      });
    },
    debug() {
      let vm = this
      eosCommon.storage.set('routerName',vm.$route.name);
      vm.$router.push({
        name: 'equipments_info',
        params: {
          ProjectId: vm.propsData.ProjectId,
          ProjectName: vm.propsData.ProjectName
        }
      });
    },
    customLazy(src,errorImg){			
				return commonFn.customLazy(src,errorImg)
		}
  },
  mounted() {
   	let vm=this;
    let ProjectId=eosCommon.storage.get('ProjectId');
   	let el=document.querySelector('.lists');
   	let elSTop=parseInt(eosCommon.storage.get('scrollTop'))||0;
   	setTimeout(function(){
   		if(ProjectId){
   			el.scrollTop=elSTop;
   		}  	   			
   	},500) 	   
   	el.onscroll=function(){
   		vm.scrollTop=this.scrollTop;
   	}
	    vm.initData();		  
  },
  destroyed() {			
			clearInterval(eosCommon.timer);
	},
  updated() {
    this.initData()
  }
}

</script>

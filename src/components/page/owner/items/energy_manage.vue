<style lang='less' scoped="scoped">
div#equip_lists{
	/*height: 800px;*/
	.equipmentSearchArear {
		  /*background: #DFECEB;*/
		  /*padding: 15px 20px;*/
		}
		
		.bd {
		  /*border: 1px solid #DFECEB;
		   border-left: none;*/
		   /*margin-top: 143px;*/
		}
		.el_content {
			   
			    padding-left: 0;
			    padding-right: 0;
			    height: 100%;
			    /*position: fixed;
			    overflow-y: auto;
			    margin: 0;
			    width: 100%;*/
			    /*left: 450px;*/
			    /*right: 0;*/
			   
			   /*margin-top: 143px;*/
			}
		.noData {
		  line-height: 65px;
		  text-align: center;
		  font-weight: bold;
		}
		.left_lists{
				/*position: fixed;
				top: 192px;*/
				/*height: 600px;
				overflow: auto;*/
			}
		.el_mainContent .el_content{
			padding-left: 0;
		}
		.equip_m_header{
			position: fixed;
			top: 80px;
			/*left: 230px;*/
			/*margin-right:200px ;*/
			width: 100%;
			z-index: 21;
			/*background: red;*/
			padding:10px;
		}
		.fales{
			height: 76px;
			width: 100%;
			padding: 10px;
			
		}
}

</style>
<template>
  <div id="equip_lists"  class='el_mainContent' style="position: relative;width: 100%; height: 100%;">
  	<!--v-loading='get_dragDataState.isObjListLoading'-->
    <div v-show='getWhichTab_equi==1' class="el_content" v-loading="get_dragDataState.isObjListLoading" >
      <div>
        <el-row class="equip_m_header" >
        	 <el-row class='border-1px' style="width: 100%;">
		        <el-col :span="22">
		          <h3>{{pageName}}</h3>
		        </el-col>
		      </el-row>
		      <div class="hr mb10"></div>
          <el-col :span='24'>          
            <span>
            <span class="w150 mb10" v-show='isShowCompanyId'>
              <el-select v-model="CompanyId" filterable clearable placeholder="客户名称" @change='resetProjectOpts(CompanyId)'>
                <el-option
                    v-for="(item, index) in companyOpts"
                    :key="index"
                    :label="item.CompanyName"
                    :value="item.CompanyId">
                  </el-option>
              </el-select >
            </span>
            <span class="w150 mb10" v-show='isShowProjectId'>
              <el-select v-model="ProjectId" filterable clearable placeholder="项目名称" @change='setProjectName(ProjectId)'>
                <el-option
                    v-for="(item, index) in projectOpts"
                    :key="index"
                    :label="item.ProjectName"
                    :value="item.ProjectId">
                  </el-option>
              </el-select >
            </span>
            <span class="w150 mb10">
              <el-select v-model="OnlineStatus" filterable clearable placeholder="在线状态" @change=''>
                <el-option
                    v-for="item in onlineStatusOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w150 mb10">
              <el-select v-model="RunStatus" clearable placeholder="运行状态" @change=''>
                <el-option
                    v-for="item in runStatusOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w150 mb10">
              <el-select v-model="AlarmStatus" clearable placeholder="报警状态" @change=''>
                <el-option
                    v-for="item in alarmStatusOpts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
              </el-select>
            </span>
            <span class="w150 mb10">
              <el-select v-model="EquipmentTypeId" clearable placeholder="设备类型" @change=''>
                <el-option
                    v-for="item in equipmentTypeIdOpts"
                    :key="item.EquipmentTypeId"
                    :label="item.TypeName"
                    :value="item.EquipmentTypeId">
                  </el-option>
              </el-select>
            </span>
            </span>
          </el-col>
        </el-row>
        
        <el-row class='bd'>
          <info :propsData="projectData"></info>
        </el-row>
      </div>
    </div>
    <chartset v-if="getWhichTab_equi==2 && ($route.name=='wb_equipments_manage'||$route.name=='yz_equipments_manage'||$route.name=='sm_equipmet_lists')"></chartset>
  </div>
</template>
<script>
import { mapGetters,mapMutations, mapActions } from 'vuex'
import chartset from "components/common/equi_chart_setting.vue";
import equipments_info from "components/page/maintenanceAgent/items/common/n_equipments_info.vue";
import * as Common from 'src/assets/js/common';
const OPTS = Common.Const.options
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const POST = AXIOS.post

const URL = Common.Const.url
export default {
  data: function() {
    return {
      CompanyId: '',
      companyOpts: [],
      IsExperienceProject: '',
      IsSelfProject:'',

      EquipmentId: '',
      ProjectName: '',
      DataSend: '',
      equiListData: {
        tableData: [],
      },
      Keywords: '',
      isShowProjectId: true,
      EquipmentTypeId: '',
      equipmentTypeIdOpts: [],

      ProjectId: '',
      projectOpts: [],

      OnlineStatus: '',
      onlineStatusOpts: OPTS.ONLINESTATUSOPTIONS,
      OnlineStatusName: '',

      RunStatus: '',
      runStatusOpts: OPTS.RUNSTATUSOPTIONS,

      AlarmStatus: '',
      alarmStatusOpts: OPTS.LEVELOPTIONS, //报警状态

      timeRange: [],

      loadingTable: false,
      PageIndex: 1,
      PageSize: 10,
      Total: undefined,
      currentRow: {},
      commentRow: {},
      //操作权限相关
      isOperate: {},

      currentRow: {
        ServiceAttitude: 5,
        ServiceEfficiency: 5,
        ServiceQuality: 5,
        ServiceSuggestion: '',
      },

      companyListUrl: URL.GETALLCOMPANY, //获取业主列表(下拉框)
      projectListUrl: URL.PROJECT, //获取项目列表(下拉框)
      getEquipmentTypUrl: URL.GETEQUIPMENTTYPE, //获取设备类型(下拉框)
      resetProjectListUrl: URL.PROJECTQUERY, //根据业主(CompanyId)获取项目列表(下拉框)


    }
  },
  created(){
//	 this.uPDATE_UPLOAD_IMG(
//		{	isClear:true,
//			imgDatas:[]
//		}
//	);
//	this.uPDATE_LABEL(
//		{	isClear:true,
//			labelDatas:[]
//		}
//	);
  },
  computed: {
    pageName() {
      if (this.$route.name == 'consumption_manage') {
        return '能耗管理'
      } else {
        return '设备管理'
      }
    },
   
    ...mapGetters([
      'getWhichTab_equi',
      'get_dragDataState'
    ]),
    projectData() {
      return {
        CompanyId: this.CompanyId,
        ProjectId: this.ProjectId,
        OnlineStatus: this.OnlineStatus,
        RunStatus: this.RunStatus,
        EquipmentTypeId: this.EquipmentTypeId,
        AlarmStatus: this.AlarmStatus,
        ProjectName: this.ProjectName,
        IsExperienceProject: this.IsExperienceProject,
        IsSelfProject: this.IsSelfProject,
        currentView: 'equipments_info',
        // IsLocked: null,
        // IsExperienceProject: null        
      }
    },
    isShowCompanyId() {
      let EntitySort = FUNC.storage.get("EntitySort")
      if (EntitySort == 2) {
        this.setCompanyOpts()
        return true
      } else {
        return false
      }
    },

  },
  components: {
    info: equipments_info,
    chartset
  },
  methods: {
  	...mapMutations({
  		uPDATE_UPLOAD_IMG:'UPDATE_UPLOAD_IMG',
  		uPDATE_LABEL:'UPDATE_LABEL',
  		uPDATE_DRAGDATA_STATE:'UPDATE_DRAGDATA_STATE',
  		uPDATE_SETTING_STATE: 'UPDATE_SETTING_STATE'
  		}),
    ...mapActions({
      changeTab: 'changetab_detail'
    }),
    setProjectName(ProjectId) {
      let vm = this
      vm.ProjectName = ''
      vm.IsExperienceProject = 0;
      vm.IsSelfProject= 0;
      
      for (let item of vm.projectOpts) {
        if (ProjectId == item.ProjectId) {
          vm.ProjectName = item.ProjectName
          vm.IsExperienceProject = item.IsExperienceProject
          vm.IsSelfProject= item.IsSelfProject

        }
      }
      // console.log(vm.IsExperienceProject)

    },
    setEquipmentTypeIdOpts() {
      let vm = this
      let url = vm.getEquipmentTypUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.equipmentTypeIdOpts = res.Data
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setProjectOpts() {
      let vm = this
      let url = vm.projectListUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken"),
        Parameters:{
          AllowExperienceProject: 1
        }
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            //vm.projectOpts = res.Data.Result
            if(res.Data instanceof Array){
            	//暂无项目
            	vm.ProjectId='';
            	vm.uPDATE_DRAGDATA_STATE({
					isObjListLoading: false,
					isDragDetalLoading: false
				});
				vm.uPDATE_SETTING_STATE({
					curr_setting_state: false,
					isPreview: false,
					targetId: '',
					isHasData: false
				});
            }else{
            	vm.projectOpts = res.Data.Result
            	vm.ProjectId = vm.projectOpts[0].ProjectId;
            }
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    resetProjectOpts(CompanyId) {
      let vm = this
      let url = vm.resetProjectListUrl
      let data = {
        IsMaint: 2,
        AccessToken: FUNC.storage.get("AccessToken"),
        CompanyId: CompanyId
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.projectOpts = res.Data.Result;
	            if( vm.projectOpts.length>0){
	            	vm.ProjectId = vm.projectOpts[0].ProjectId;	            	
	            }else{
	            	//暂无项目
	            	vm.ProjectId='';
	            	vm.uPDATE_SETTING_STATE({
						curr_setting_state: false,
						isPreview: false,
						targetId: '',
						isHasData: false
					});
	            }           
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
    setCompanyOpts() {
      let vm = this
      let url = vm.companyListUrl
      let data = {
        AccessToken: FUNC.storage.get("AccessToken")
      }
      GET(url, data)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            vm.companyOpts = res.Data
            vm.CompanyId=vm.companyOpts[0].CompanyId;
          }
        })
        .catch(function(error) {
          console.log(error.message)
        });
    },
  },
  watch: {},
  mounted: function() {
    let vm = this	
    vm.changeTab(1)
    vm.setProjectOpts()
    vm.setEquipmentTypeIdOpts()
    vm.isOperate = FUNC.operator.eosOperDataHandle()
    setTimeout(function () {
      if (vm.$route.params.EquipmentTypeId) {
        vm.EquipmentTypeId = vm.$route.params.EquipmentTypeId
      }
      if (vm.$route.params.AlarmStatus) {
        vm.AlarmStatus = vm.$route.params.AlarmStatus
      }
    }, 0)

  },
  destroyed(){
  	this.uPDATE_DRAGDATA_STATE({
		isObjListLoading:true,
		isDragDetalLoading:false
	});
  }
}

</script>

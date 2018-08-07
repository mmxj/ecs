<style scoped lang='less'>
.equipmentSearchArear {
  background: #DFECEB;
  padding: 15px 20px;
}

.bd {
  border: 1px solid #DFECEB;
}

.noData {
  line-height: 65px;
  text-align: center;
  font-weight: bold;
}

</style>
<template>
  <div class="el_mainContent">
    <div class="el_content" v-loading="loading" element-loading-text="努力加载中">
      <el-row class='bd'>
        <el-row class="w220 fl">
          <div class='equipmentSearchArear'>
            <el-input v-model="Keywords" @change='delaySearch()' placeholder="设备名称"></el-input>
          </div>
          <equiList :propsData="equiListData" :dataSend.sync='equiListDataSend'></equiList>
        </el-row>
        <el-row class="ovh">
          <el-col :span='24'>
            <p v-show='Total==0' class='noData'>暂无数据</p>
					  <consumption-manage v-show='Total!=0' :settingDataSend="equiListDataSend"></consumption-manage>            	
          </el-col>
        </el-row>
      </el-row>
    </div>
  </div>
</template>
<script>
import * as Common from 'src/assets/js/common';
const FUNC = Common.Func
const AXIOS = FUNC.axios
const GET = AXIOS.get
const URL = Common.Const.url
import equiList from 'components/common/equipment_list'
import consumptionManage from 'components/page/maintenanceAgent/consumption_manage'
export default {
  data: function() {
    return {
      CompanyId: '',
      ProjectId: '',
      OnlineStatus: '',
      RunStatus: '',
      AlarmStatus: '',
      ProjectName: '',

      EquipmentId: '',
      equiListDataSend: {},
      equiTabData:{
      	EquipmentName:'',
      	IsOnline:'',
      	RunState:'',
      	AlarmLevel:'',
      },
      equiListData: {
        tableData: [],
      },
      Total: undefined,
      loading: true,
      PageSize: 10,
      PageIndex: 1,
      Keywords: '',
      equipmentListUrl: URL.QUERYEQUIPMENTLIST, //获取服务条目
      detailUrl: URL.EQUIPMENTDETAIL, //获取设备详情
    }
  },
  watch: {
    propsData(){
      let vm = this
      let props = vm.propsData
      vm.CompanyId = props.CompanyId||''
      vm.ProjectId = props.ProjectId||''
      vm.OnlineStatus = props.OnlineStatus||''
      vm.RunStatus = props.RunStatus||''
      vm.AlarmStatus = props.AlarmStatus||''
      vm.ProjectName = props.ProjectName||''
      vm.tableLoad()
    },
  	equiListDataSend(){
  		if (this.equiListDataSend.EquipmentId) {
  			this.getEquiDetail()
  		}
  		// console.log(this.equiListDataSend)
  	}
  },
  props: ['propsData'],
  computed: {
  },
  components: {
    equiList,
    consumptionManage
  },
  filters: {
    formateSeconds: function(seconds) {
      return eosCommon.formatSeconds(seconds);
    }
  },
  methods: {
  	getEquiDetail(){
      let vm = this
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "Parameters": {
          "EquipmentId": this.equiListDataSend.EquipmentId,
          "Type": "1"
        }
      }
      let url = this.detailUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
          	vm.equiTabData = res.Data
          	// console.log(vm.equiTabData)
          }
        })
        .catch(function(error) {
          vm.$alert(error.message)
        });
  	},
    //节流
    delaySearch() {
      clearTimeout(this.search.timeId)
      let vm = this
      vm.search.timeId = setTimeout(function() {
        vm.search()
      }, 500)
    },
    //搜索按钮
    search() {
      this.tableLoad(this.PageSize, this.PageIndex = 1,this.CompanyId,
        this.ProjectId, this.OnlineStatus,
        this.AlarmStatus, this.RunStatus,
        this.Keywords)
    },
    //加载表格数据
    tableLoad(PageSize = this.PageSize,
      PageIndex = this.PageIndex,
      CompanyId = this.CompanyId,
      ProjectId = this.ProjectId,
      OnlineStatus = this.OnlineStatus,
      AlarmStatus = this.AlarmStatus,
      RunStatus = this.RunStatus,
      Keywords = this.Keywords) {
      let vm = this
      vm.loading = true
      let params = {
        "AccessToken": FUNC.storage.get("AccessToken"),
        "PageIndex": PageIndex,
        "PageSize": PageSize,
        "IsDefaultEquipment": 1, // -- 是否只获取第一台设备的数据
        "Parameters": {
          "CompanyId": CompanyId, //--业主Id
          "ProjectId": ProjectId, //--项目Id
          "GatewayId": '', //-- 网关id, 可传空
          "Keywords": Keywords, //-- 搜索关键字, 可传空
          "OnlineStatus": OnlineStatus, // -- 网关在线状态: -1 -全部；0 -离线；1 -在线
          "AlarmStatus": AlarmStatus, // -- 设备报警级别：-1 -全部；1-提醒;2-警告;3-报警(严重)
          "RunStatus": RunStatus //-- 设备运行状态：-1 -全部；0-不详;1-开机;2-停机;3-值机
        }
      }
      let url = this.equipmentListUrl
      GET(url, params)
        .then(function(response) {
          let res = response.data
          if (FUNC.checkCode(res.State, res.Message)) {
            let dataArr = response.data.Data.Equipments
            let Total = response.data.Data.Total
            // console.log(Total)
            if (!Total) {
              vm.Total = 0
              dataArr = []
            } else {
              vm.Total = Total
            }
            vm.projectOpts = res.Data.Projects
            vm.reload(dataArr)
            vm.loading = false
          }
        })
        .catch(function(error) {
          vm.$alert(error.message)
        });
    },
    reload(dataArr) {
      if (dataArr.length != 0) {
        for (let index in dataArr) {
          dataArr[index].isActive = false
        }
        dataArr[0].isActive = true
        // console.log(dataArr[0].EquipmentId)
        this.EquipmentId = dataArr[0].EquipmentId
        this.equiListDataSend = dataArr[0]
      }
      this.equiListData.tableData = dataArr
    },
  },
  mounted: function() {
  	console.log('ffff')
    if (this.propsData.currentView == 'equipments_info') {
      this.ProjectId = this.propsData.ProjectId
      this.equiListData.ProjectId = this.propsData.ProjectId
      this.equiListData.ProjectName = this.propsData.ProjectName
      this.tableLoad()
    }
    // console.log(this.propsData)
  },
  destroyed() {
    // clearInterval(this.timer);
  }

}

</script>

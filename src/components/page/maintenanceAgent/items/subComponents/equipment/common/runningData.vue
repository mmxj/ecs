<style scoped lang='less'>
  .runWrap {
    width: 100%;
    // height: 100%;
    overflow-x: hidden;
    position: relative;
    & .title {
      margin-top: 15px;
      color: #8492A6;
      font-size: 14px;
      overflow: hidden;
    }
    & .cont {
      // width: 100%;
      position: absolute;
      top: 60px;
      bottom: 10px;
      left: 15px;
      right: 15px; // border: 1px solid #000;
    }
    & .pagin {
      // width: 100%;
      position: absolute;
      bottom: 10px;
      left: 15px;
      right: 15px;
      overflow-x: hidden;
    }
    i.isCtr {
      margin-left: 0;
      position: absolute;
      right: 5px;
      top: 50%;
      /*left: 50%;*/
      margin-top: -7px;
      /*width: 20px;
  	height: 20px;*/
      font-size: 14px;
      color: #97BEBC;
      cursor: pointer;
    }
    /*.selectWidth{
  	width: 200px;
  }*/
  }
</style>
<template>
  <div v-loading='loading' class="runWrap" style="height: calc(100% - 55px)">
    <div class="title">
      <div style="width: 189px;" class="fl tar">
        <span>
         	 分组名称：
          <el-select style="width: 100px;" v-model="GroupName" size='small' class='por' @change='changeGroupName'>
            <el-option v-for="(item, index) in GroupNameOpts" :key="index" :label="item" :value="item">
            </el-option>
          </el-select>
        </span>
      </div>
      <div style="width: 195px;" class="fl tar">
        <span>
         	 可否远程控制：
          <el-select  style="width: 75px;" v-model="isCtr" size='small' class='por' @change='changeIsCtr'>
            <el-option v-for="(item, index) in isCtrSelect" :key="index" :label="item.label" :value="item.state">
            </el-option>
          </el-select>
        </span>
      </div>
      <div style="width: 150px; margin-left: 15px;position: relative;" class="fl tar">
        <span class="w150 mb5">
	      		<el-input size='small' v-model="searchQuery" placeholder="节点名称">
	      			
	      		</el-input>
	    	</span>
        <i class="fa fa-search m-r-5" style="position: absolute; right: 3px; top: 8px; color: rgb(131, 165, 163);;"></i>
      </div>

      <div class="fl" style="line-height:30px; width:auto;position: absolute;right: 15px;top: 15px;">
        采集时间：
        <span style="font-weight:bold;color:#1ABC9C">{{UploadOn}}</span>
      </div>
    </div>
    <div class="cont">
      <div class="w33p fl" style="padding-right:7.5px">
        <el-table :data="DetailsData1" class='userTable' stripe>
          <el-table-column type="expand">
            <template scope="props">
              <p style="text-align:center">
                <span style="text-align:center;font-weight:bold">运行时长：</span> {{ props.row.RunDuration }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="节点名称" align='left' min-width='150'>
            <template scope="scope">
              <div class='nowrap' :title="scope.row.DisplayName">{{scope.row.DisplayName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="数据值" align='left'>
            <template scope="props">
              <span style="margin-left: 10px">{{props.row.DataValue}}</span>
              <i v-if="props.row.IsIssue==1&&isPublish==1 && get_expOself" title="点击编辑数据" @click="showDialog(props.row)" class="isCtr fa fa-cog m-r-5"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="w33p fl" style="padding-right:7.5px;padding-left:7.5px;">
        <el-table :data="DetailsData2" class='userTable' stripe>
          <el-table-column type="expand">
            <template scope="props">
              <p style="text-align:center">
                <span style="text-align:center;font-weight:bold">运行时长：</span> {{ props.row.RunDuration }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="节点名称" align='left' min-width='150'>
            <template scope="scope">
              <div class='nowrap' :title="scope.row.DisplayName">{{scope.row.DisplayName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="数据值" align='left'>
            <template scope="props">
              <span style="margin-left: 10px">{{props.row.DataValue}}</span>
              <i v-if="props.row.IsIssue==1&&isPublish==1 && get_expOself" title="点击编辑数据" @click="showDialog(props.row)" class="isCtr fa fa-cog m-r-5"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="w33p fl" style="padding-left:7.5px;">
        <el-table :data="DetailsData3" class='userTable' stripe>
          <el-table-column type="expand">
            <template scope="props">
              <p style="text-align:center">
                <span style="text-align:center;font-weight:bold">运行时长：</span> {{ props.row.RunDuration }}
              </p>
            </template>
          </el-table-column>
          <el-table-column label="节点名称" align='left' min-width='150'>
            <template scope="scope">
              <div class='nowrap' :title="scope.row.DisplayName">{{scope.row.DisplayName}}</div>
            </template>
          </el-table-column>
          <el-table-column label="数据值" align='left'>
            <template scope="props">
              <span style="margin-left: 10px">{{props.row.DataValue}}</span>
              <i v-if="props.row.IsIssue==1&&isPublish==1 && get_expOself" title="点击编辑数据" @click="showDialog(props.row)" class="isCtr fa fa-cog m-r-5"></i>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <common-dialog v-if="get_ctrData.dialogVisible"></common-dialog>
  </div>
</template>
<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import commonDialog from '../../../common/drag/commonDialog'
  let tid = null
  import * as Common from 'src/assets/js/common';
  const FUNC = Common.Func
  const AXIOS = FUNC.axios
  const GET = AXIOS.get
  const URL = Common.Const.url
  export default {
    data: function() {
      return {
        loading: true,
        GroupName: '',
        GroupNameOpts: [],
        GroupData: [],
        UploadOn: '',
        DetailsData: [],
        DetailsData1: [],
        DetailsData2: [],
        DetailsData3: [],
        isCtrSelect: [
          {
            state: 0,
            label: '全部'
      	},
          {
            state: 1,
            label: '是'
      	},
          {
            state: 2,
            label: '否'
      	}
      ],
        isCtr: 0,
        searchQuery: '',
        quotient: 0,
        isNoCtrList: [],
        isCtrList: [],
        initDetailsData: [],
        isPublish: 0
      }
    },
    props: [ 'propsData' ],
    components: {
      commonDialog
    },
    watch: {
      'propsData.EquipmentId' ( val, oldval ) {
        this.getRunningData( val )
      },
      searchQuery( val ) {
        this.separateDetails( this.filteredData );
      }
    },
    computed: {
      ...mapGetters( [ "get_treeMenu","get_isCanCtrl", "get_ctrData","get_expOself" ] ),
      GroupIndex() {
        let vm = this
        let index = 0
        for( index in vm.GroupNameOpts ) {
          if( vm.GroupNameOpts[ index ] == vm.GroupName ) {
            return index
          }
        }
        return index
      },
      filteredData() {
        let vm = this;
        let filterKey = vm.searchQuery && vm.searchQuery.toLowerCase();
        let data = [ ...vm.DetailsData ];
        if( filterKey ) {
          data = data.filter( function( row ) {
            return Object.keys( row ).some( function( key ) {
              return String( row[ key ] ).toLowerCase().indexOf( filterKey ) > -1
            } )
          } )
        }
        return data;
      }
    },
    methods: {
      ...mapMutations( {
        uPDATE_CTRDATA: 'UPDATE_CTRDATA'
      } ),
      changeIsCtr() {
        let vm = this;
        if( vm.isCtr == 1 ) {
          vm.DetailsData = vm.initDetailsData.filter( ( val ) => {
            return val.IsIssue == true;
          } );
          vm.separateDetails( vm.filteredData )
        } else if( vm.isCtr == 2 ) {
          vm.DetailsData = vm.initDetailsData.filter( ( val ) => {
            return val.IsIssue == false;
          } );
          vm.separateDetails( vm.filteredData )
        } else {
          vm.DetailsData = [ ...vm.initDetailsData ];
          vm.separateDetails( vm.filteredData )
        }
      },
      showDialog( data ) {
        let vm = this;
        vm.uPDATE_CTRDATA( {
          dialogVisible: true,
          EquipmentId: vm.propsData.EquipmentId,
          RegisterAddress: data.Address,
          valContent: data.DataValue,
          Status: data.Status,
          DisplayName: data.DisplayName,
          finiedDialogVisi: false
        } );
      },
      /*pageIndexChange(val) {
        this.PageIndex = val
        this.tableLoad(this.PageSize, this.PageIndex)
        this.scrollTop()
      },
      scrollTop() {
        let vm = this
        let el = vm.$refs.listRowCont
        let timeId = setInterval(function() {
          el.scrollTop -= 20
          if (el.scrollTop <= 0) {
            clearInterval(timeId)
          }
        }, 10)
      },*/
      getRunningData( EquipmentId ) {
        if( !EquipmentId ) return false
        let vm = this
        vm.GroupNameOpts = [];
        vm.loading = true
        let params = {
          "AccessToken": FUNC.storage.get( "AccessToken" ),
          "Parameters": {
            EquipmentId
          },
        }
        let url = URL.RUNNING
        GET( url, params )
          .then( function( response ) {
            let res = response.data
            if( FUNC.checkCode( res.State, res.Message ) ) {

              if( res.Data.length != 0 ) {
                let data = res.Data
                vm.UploadOn = data.UploadOn
                let GroupData = data.GroupData
                vm.GroupData = GroupData
                for( let item of GroupData ) {
                  vm.GroupNameOpts.push( item.GroupName )
                }
                vm.GroupName = vm.GroupName || GroupData[ 0 ].GroupName;
                vm.initDetailsData = vm.GroupData[ vm.GroupIndex ].Details;
                vm.DetailsData = [ ...vm.initDetailsData ];
                vm.separateDetails( vm.filteredData )
                clearTimeout( tid )
                tid = setTimeout( function() {
                  vm.getRunningData( EquipmentId )
                }, 10000 )
              } else {
                vm.UploadOn = '无数据'
                vm.RunTime = '无数据'
                vm.DetailsData1 = []
                vm.DetailsData2 = []
                vm.DetailsData3 = []
              }
              vm.loading = false
            }
          } )
          .catch( function( error ) {
            console.log( error.message )
          } );
      },
      changeGroupName() {
        let vm = this
        vm.getRunningData( vm.propsData.EquipmentId )
      },
      separateDetails( DetailsData ) {
        let vm = this
        let l = DetailsData.length
        let quotient = Math.ceil( l / 3 )
        vm.DetailsData1 = DetailsData.splice( 0, quotient )
        vm.DetailsData2 = DetailsData.splice( 0, quotient )
        vm.DetailsData3 = DetailsData
      },
      init() {
        let vm = this
        vm.getRunningData( vm.propsData.EquipmentId )
      },
    },
    updated: function() {},
    created() {
      /*let vm = this;
      let opera = vm.get_treeMenu.filter( ( val ) => {
        if( val.children ) {
          return val.children.some( ( v, k, n ) => {
            return v.file == 'wb_items_manage' ||
              v.file == 'yz_items_manage' ||
              v.file == 'project_list'
          } )
        }
      } );
      vm.isPublish = JSON.parse( opera[ 0 ].children[ 0 ].OperateSet )[ 'PUBLISH' ];*/
     let vm=this;
      vm.isPublish=vm.get_isCanCtrl;
    },
    mounted: function() {
      let vm = this
       vm.uPDATE_CTRDATA({
	      dialogVisible: false,
	      EquipmentId: '',
	      valContent: '',
	      Status: [],
	      DisplayName: '',
	      finiedDialogVisi: false
	    });
      vm.init()
    },
    beforeDestroy: function() {
      let vm = this
      clearTimeout( tid )
    }
  }
</script>
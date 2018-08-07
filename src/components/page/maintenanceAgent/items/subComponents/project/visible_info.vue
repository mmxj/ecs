<template>
	<div id="verifyCheck">
		<div class="row check_wrap">
			<!--权限设置开始-->
			<div class="col-sm-12" style="margin: 15px 0;">
				<span class="OrgTopAligin">
	                    <input id="txtQueryKeywords" style="width: 200px;" v-model="searchQuery" type="text" class="form-control w-128" placeholder="输入要搜索的人员">
	        	</span>
				<span class="OrgTopAligin">
	                    <button id="btnQuery" type="button" class="btn btn-default" v-on:click="btnQueryProject()">
	                        <i class="fa fa-search m-r-5"></i>查找
	                    </button>
	            </span>
			</div>
		</div>
		<div class="row content-box check_wrap">
			<div class="row">
				<h3 class="col-lg-5">可见人员:</h3>
				<span class="col-lg-5 allSelect pull-right">
                        			<label style="margin-left: 5px;" class="pull-right" for="checkbox">全选</label>
                        			<input v-model='iSelectAll' class="pull-right" type="checkbox" name="" id="checkbox" value="" />                      			
                        		</span>
				<div class="clearfix">

				</div>
			</div>
			<div v-show="DetailDataEmpty==1" class="form-horizontal item_lists">
				<div class=" col-sm-10 visible_list" v-for=" item in filteredData">
					<input type="checkbox" :id="item.UserId" :disabled="item.Locked==1" :value="item.UserId" v-model="selectedCheck">
					<label :for="item.UserId">{{item.UserName}}</label>
				</div>
				<div class="clearfix">
				</div>
			</div>
			<!--<loading v-show="DetailDataEmpty==0"></loading>-->
			<no-data v-show="DetailDataEmpty==0"></no-data>
			<div class="content-box-footer" v-show="DetailDataEmpty==1">
				<div class="form-group">
					<label class="content-title-left"></label>
					<div class="col-lg-5 col-xs-8 pl-22">
						<button type="button" class="btnReturn btn btn-white pull-left mr-20" v-on:click="btnReturn()">取消</button>
						<button id="btnAddEdit" type="submit" class="btn btn-default pull-left" data-dismiss="modal" data="1" v-on:click="btnSave()">确定</button>
					</div>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
	export default {
		data() {
			return {
				checkedNames: [],
				selectedCheck: [],
				searchQuery: '',
				iSelectAll: false
			}
		},
		props: {
			propsData: Object
		},
		computed: {
			filteredData() {
				let vm = this;
				let filterKey = vm.searchQuery && vm.searchQuery.toLowerCase()
				let data = vm.checkedNames
				if(filterKey) {
					data = data.filter(function(row) {
						return Object.keys(row).some(function(key) {
							return String(row[key]).toLowerCase().indexOf(filterKey) > -1
						})
					})
				}

				return data;
			},
			DetailDataEmpty() {
				let [vm, DetailDataEmpty] = [this, 0];
				vm.filteredData.length == 0 ? DetailDataEmpty = 0 : DetailDataEmpty = 1;
				return DetailDataEmpty;
			}
		},
		watch: {
			iSelectAll(newVal, oldVal) {
				var vm = this;
				vm.selectedCheck = [];
				if(newVal) {
					for(let i = 0; i < vm.checkedNames.length; i++) {
						vm.checkedNames[i].State = 1;
					}
					vm.bindChecked(vm.checkedNames, vm.selectedCheck);
				} else {
					vm.checkedNames = [];
					vm.selectedCheck = [];
					vm.bindVisibleAcount();
				}

			}
		},
		mounted() {
			var vm = this;
			$(".item_lists").getNiceScroll().resize();
			$(".item_lists").css('max-height', '410px').niceScroll();
			vm.bindVisibleAcount();
		},
		methods: {
			btnReturn() {
				this.$router.push({ name: 'wb_items_manage' });
			},
			btnSave() {
				//权限设置实现函数
				var vm = this;
				if(vm.selectedCheck.length == 0) {
					vm.selectedCheck = JSON.stringify(vm.selectedCheck)
				}
				var param = {
						"AccessToken": eosCommon.storage.get('AccessToken'),
						"Parameters": {
							"ProjectId": vm.propsData.ProjectId, //帐号(用户)ID，必填
							"UserList": vm.selectedCheck
						}
					},
					url = eosCommon.ENTERPRISE_API + "Api/Project/SetProjectAccount";
				eosCommon.eosAjax(url, 'POST', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						eosCommon.eosMessage("success", eosCommon.UPDATE_MSG);
					}
				});
			},
			bindVisibleAcount() {
				var vm = this,
					param = {
						"AccessToken": eosCommon.storage.get('AccessToken'),
						"ProjectId": vm.propsData.ProjectId //帐号(用户)ID，必填						
					},
					url = eosCommon.ENTERPRISE_API + "Api/Project/GetProjectBindUserList";
				eosCommon.eosAjax(url, 'GET', param, 'json', function(result) {
					if(eosCommon.checkCode(result.State, result.Message)) {
						vm.checkedNames = result.Data;
						vm.bindChecked(vm.checkedNames, vm.selectedCheck);
					}
				});
			},
			bindChecked(checkedNames, selectedCheck) {
				for(var i = 0; i < checkedNames.length; i++) {
					if(checkedNames[i].State == 1) {
						selectedCheck.push(checkedNames[i].UserId);
					}
				}
			}
		}
	}
</script>
<style scoped="scoped" type="text/css">
	.visible_list {
		padding: 10px 15px;
		color: #253242;
	}
	
	.check_wrap {
		padding-left: 100px!important;
		padding-right: 100px!important;
		margin-top: 0px;
	}
	
	.check_wrap h3 {
		font-size: 16px;
		padding: 15px;
		font-weight: bold;
		color: #000;
		margin:0;
	}
	
	.check_wrap span.allSelect {
		font-size: 16px;
		padding: 15px;
		font-weight: bold;
		color: #000;
	}

</style>
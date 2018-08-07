<template>
	<div  class="col-md-12 dataTables_wrapper" v-if="pagingData.page_num > 0">
        <div class="dataTables_info" role="status" aria-live="polite">当前显示 {{pagingData.begin_row}} 到 {{pagingData.end_row}} 条记录 共 {{pagingData.total}} 条记录</div>
        <div class="dataTables_paginate paging_full_numbers">
            <a class="paginate_button previous" v-bind:class="page_record == 1 ? 'disabled' : ''" v-on:click="up_page">上一页</a>
            <span>
                <template v-if="(pagingData.page_num > 0 && pagingData.page_num <= 7)">
                    <a class="paginate_button " v-on:click="on_page(num)" v-for="num in pagingData.page_num" v-bind:class="num == pagingData.page_index ? 'current' : ''">{{num}}</a>
                </template>
                <template v-else>
                    <a class="paginate_button " v-on:click="on_page(1)" v-bind:class="page_record == 1 ? 'current' : ''">1</a>
                    <span class="ellipsis" v-if="page_record-3 > 2">…</span>
                    <a class="paginate_button" v-on:click="on_page(one_page)" v-bind:class="page_record == one_page ? 'current' : ''">{{one_page}}</a>
                    <a class="paginate_button" v-on:click="on_page(two_page)" v-bind:class="page_record == two_page ? 'current' : ''">{{two_page}}</a>
                    <a class="paginate_button" v-on:click="on_page(three_page)" v-bind:class="page_record == three_page ? 'current' : ''">{{three_page}}</a>
                    <a class="paginate_button" v-on:click="on_page(four_page)" v-bind:class="page_record == four_page ? 'current' : ''">{{four_page}}</a>
                    <a class="paginate_button" v-on:click="on_page(five_page)" v-bind:class="page_record == five_page ? 'current' : ''">{{five_page}}</a>
                    <span class="ellipsis" v-if="page_record+3 <= pagingData.page_num">…</span>
                    <a class="paginate_button " v-on:click="on_page(pagingData.page_num)" v-bind:class="page_record == pagingData.page_num ? 'current' : ''">{{pagingData.page_num}}</a>
                </template>
            </span>
            <a class="paginate_button next" v-bind:class="page_record == pagingData.page_num ? 'disabled' : ''" v-on:click="dow_page">下一页</a>
        </div>
    </div>
</template>
<script type="text/javascript">
	
	export default{
		name:'paging',
		data(){
			return{
             page_record: 1
			}
		},
		props:['pagingData'],
		computed: {
            one_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.pagingData.page_num - 1 ? this.pagingData.page_index - 2 : this.pagingData.page_num - 5) : 2);
            },
            two_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.pagingData.page_num - 1 ? this.pagingData.page_index - 1 : this.pagingData.page_num - 4) : 3);
            },
            three_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.pagingData.page_num - 1 ? this.pagingData.page_index : this.pagingData.page_num - 3) : 4);
            },
            four_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.pagingData.page_num - 1 ? this.pagingData.page_index + 1 : this.pagingData.page_num - 2) : 5);
            },
            five_page: function() {
                return (this.page_record - 3 > 2 ? (this.page_record + 3 < this.pagingData.page_num - 1 ? this.pagingData.page_index + 2 : this.pagingData.page_num - 1) : 6);
            }

			
      },  
		mounted(){	
		},
		methods:{
		up_page: function() {
	        if(this.pagingData.page_index > 1) {
	            this.pagingData.page_index--;
	            this.page_record--;
	        }
        },
        on_page: function(data) {
            this.pagingData.page_index = data;
            this.page_record = data;
        },
        dow_page: function() {
            if(this.pagingData.page_index < this.pagingData.page_num) {
                this.pagingData.page_index++;
                this.page_record++;
            }
        }
		}
		
	}
</script>
<style scoped>
	
</style>
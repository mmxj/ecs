<style lang='less' scoped>
#page-content {
  // transition: all .8s;
  // padding: 10px;
}

</style>
<template>
  <div>
    <section id="page-content" :class="ulClass" style="margin-top: 50px;"  class="body-content"  :style='isShowSideBar?style_showbar:style_hidebar'>
      <!--<div v-cloak class="row">
                <div class="col-lg-12">
                    <div id="LeaseRemind" class="alert alert-danger alert-dismissable" style="padding:5px 10px;z-index: 9999;overflow:hidden;">
                        <button type="button" class="close closes" data-dismiss="alert" aria-hidden="true">×</button>
                        <p></p>
                    </div>
                </div>
            </div>-->
      <!--内容页框架开始 -->
      <transition enter-active-class="animated fadeIn" name="bounce" v-cloak>
        <router-view/>
      </transition>
      <!--内容页框架结束 -->
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import {getWinSize } from 'assets/js/common/util'
export default {
  name: "content",
  data: function() {
    return {
      style_showbar:{marginLeft:'50px'},
      style_hidebar:{marginLeft:'0'},
      ulClass:'',
    }

  },
  computed: {
    ...mapGetters([
      'isShowSideBar'
    ])
  },
  update(){
  	 
  },
  methods:{
  	getHeight(reduceHeight) {
				//获取窗口高度
				let vm = this;
				let winHeight = 0;
				if(window.innerHeight) winHeight = window.innerHeight - reduceHeight;
				else if((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight - reduceHeight;
				//通过深入Document内部对body进行检测，获取窗口大小
				if(document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
					winHeight = document.documentElement.clientHeight - reduceHeight;
				}
				vm.ulClass = `height:${winHeight}px;overflow: auto;`
		
			}
  },	
  mounted: function() {
//			this.getHeight(86);
			
		$(document).ready(function() {
      $(".body-content").height($(window).height() - 70)/*.niceScroll({
        cursorwidth: "6px",
        cursorborderradius: "6px",
        autohidemode: "scroll",
        spacebarenabled: true,
        cursoropacitymax: 0.8,
        cursorborder: "0px solid red",
        railpadding: { top: 0, right: 5, left: 0, bottom: 0 },
      });*/
      $(window).resize(function() {
        $(".body-content").height($(window).height() - 70)/*.niceScroll({
          cursorwidth: "10px",
          cursorborderradius: "10px",
        });
        $(".body-content").getNiceScroll().resize();*/
      })
    })		 
  }
}

</script>
<style>
.close.closes {
  position: relative;
  top: 16px;
  right: -10px;
  color: inherit;
}

</style>

"use strict";var blankonJson={init:function(){},handleBaseURL:function(){var e=window.location;return e.protocol+"//"+e.host+"/"+e.pathname.split("/")[1]},handleIE:function(){var e,a,n;e=!!navigator.userAgent.match(/MSIE 8.0/),a=!!navigator.userAgent.match(/MSIE 9.0/),(n=!!navigator.userAgent.match(/MSIE 10.0/))&&$("html").addClass("ie10"),(n||a||e)&&$("html").addClass("ie"),(e||a)&&$("input[placeholder]:not(.placeholder-no-fix), textarea[placeholder]:not(.placeholder-no-fix)").each(function(){var e=$(this);""==e.val()&&""!=e.attr("placeholder")&&e.addClass("placeholder").val(e.attr("placeholder")),e.focus(function(){e.val()==e.attr("placeholder")&&e.val("")}),e.blur(function(){""!=e.val()&&e.val()!=e.attr("placeholder")||e.val(e.attr("placeholder"))})})},handleCheckCookie:function(){"active"==$.cookie("page_sidebar_minimize")&&$("body").addClass("page-sidebar-minimize")},handleSound:function(){$(".page-sound").length&&(ion.sound({sounds:[{name:"beer_can_opening"},{name:"bell_ring",volume:.6},{name:"branch_break",volume:.3},{name:"button_click"},{name:"button_click_on"},{name:"button_push"},{name:"button_tiny",volume:.6},{name:"camera_flashing"},{name:"camera_flashing_2",volume:.6},{name:"cd_tray",volume:.6},{name:"computer_error"},{name:"door_bell"},{name:"door_bump",volume:.3},{name:"glass"},{name:"keyboard_desk"},{name:"light_bulb_breaking",volume:.6},{name:"metal_plate"},{name:"metal_plate_2"},{name:"pop_cork"},{name:"snap"},{name:"staple_gun"},{name:"tap",volume:.6},{name:"water_droplet"},{name:"water_droplet_2"},{name:"water_droplet_3",volume:.6}],path:BlankonApp.handleBaseURL()+"/assets/global/plugins/bower_components/ionsound/sounds/",preload:!0}),$(".dropdown-toggle").on("click",function(){ion.sound.play("water_droplet_3")})),$(".page-sound").length&&($("input, textarea").on("input",function(){ion.sound.play("tap")}),$("input[type=file]").on("click",function(){ion.sound.play("metal_plate_2")}),$("input[type=checkbox], input[type=radio]").on("click",function(){ion.sound.play("button_tiny")}),$("select").on("change",function(){ion.sound.play("snap")}))},handleBackToTop:function(){$("#back-top").hide(),$(window).scroll(function(){100<$(this).scrollTop()?$("#back-top").addClass("show animated pulse"):$("#back-top").removeClass("show animated pulse")}),$("#back-top").click(function(){return ion.sound.play("cd_tray"),$("body,html").animate({scrollTop:0},800),!1})},handleSidebarNavigation:function(){$(".submenu > a").click(function(){var e=$(this).parent(".submenu"),a=$(this).nextAll(),n=$(this).find(".arrow"),o=$(this).find(".plus");$(".page-sound").length&&ion.sound.play("button_click_on"),e.parent("ul").find("ul:visible")&&(e.parent("ul").find("ul:visible").slideUp("fast"),e.parent("ul").find(".open").removeClass("open")),a.is("ul:visible")&&(n.removeClass("open"),o.removeClass("open"),a.slideUp("fast"),n.removeClass("fa-angle-double-down").addClass("fa-angle-double-right")),a.is("ul:visible")||(n.addClass("open"),o.addClass("open"),a.slideDown("fast"),n.removeClass("fa-angle-double-right").addClass("fa-angle-double-down"))})},handleSidebarScroll:function(){function e(){if($(".page-sidebar-fixed").length){var e=$(window).outerHeight()-$("#header").outerHeight()-$(".sidebar-content").outerHeight();$("#EcosIndexTree").height(e).niceScroll({railalign:"left",cursorwidth:"5px",cursoropacitymax:.8,cursorborder:"0px solid #fff",railpadding:{top:0,right:0,left:3,bottom:0}})}var a=$(window).outerHeight()-$("#sidebar-right .panel-heading").outerHeight(),n=$(window).outerHeight()-$("#sidebar-right .panel-heading").outerHeight()-$("#sidebar-chat .form-horizontal").outerHeight();$("#sidebar-profile .sidebar-menu").height(a).niceScroll({cursorwidth:"5px",cursorborder:"0px"}),$("#sidebar-layout .sidebar-menu").height(a).niceScroll({cursorwidth:"5px",cursorborder:"0px"}),$("#sidebar-setting .sidebar-menu").height(a).niceScroll({cursorwidth:"5px",cursorborder:"0px"}),$("#sidebar-chat .sidebar-menu").height(n).niceScroll({cursorwidth:"5px",cursorborder:"0px"})}e(),$(window).resize(e)},handleSidebarResponsive:function(){var a=$(window);function e(){var e=a.width();768<e&&e<=1024?$("body").addClass("page-sidebar-minimize-auto"):(e<=768&&$("body").removeClass("page-sidebar-minimize"),$("body").removeClass("page-sidebar-minimize-auto"))}e(),$(window).resize(e),$(".navbar-minimize a").on("click",function(){$(".page-sound").length&&ion.sound.play("button_click"),$(".page-sidebar-right-show").length&&$("body").removeClass("page-sidebar-right-show"),$(".page-sidebar-minimize-auto").length?$("body").removeClass("page-sidebar-minimize-auto"):$("body").toggleClass("page-sidebar-minimize"),"undefined"==$.cookie("page_sidebar_minimize")||"not_active"==$.cookie("page_sidebar_minimize")?$.cookie("page_sidebar_minimize","active",{expires:1}):($.removeCookie("page_sidebar_minimize"),$.cookie("page_sidebar_minimize","not_active",{expires:1}))}),$(".navbar-setting a").on("click",function(){$(".page-sound").length&&ion.sound.play("button_click"),$(".page-sidebar-minimize.page-sidebar-right-show").length?$("body").toggleClass("page-sidebar-minimize page-sidebar-right-show"):$(".page-sidebar-minimize").length?$("body").toggleClass("page-sidebar-right-show"):$("body").toggleClass("page-sidebar-minimize page-sidebar-right-show")}),$(".navbar-minimize-mobile.left").on("click",function(){$(".page-sound").length&&ion.sound.play("button_click"),$("body.page-sidebar-right-show").length&&($("body").removeClass("page-sidebar-right-show"),$("body").removeClass("page-sidebar-minimize")),$("body").toggleClass("page-sidebar-left-show")}),$(".navbar-minimize-mobile.right").on("click",function(){$(".page-sound").length&&ion.sound.play("button_click"),$("body.page-sidebar-left-show").length&&($("body").removeClass("page-sidebar-left-show"),$("body").removeClass("page-sidebar-minimize")),$("body").toggleClass("page-sidebar-right-show")})},handleNavbarScroll:function(){$(".navbar-message .niceScroll").length&&$(".navbar-message .niceScroll").niceScroll({cursorwidth:"10px",cursorborder:"0px"}),$(".navbar-notification .niceScroll").length&&$(".navbar-notification .niceScroll").niceScroll({cursorwidth:"10px",cursorborder:"0px"})},handlePanelScroll:function(){$(".panel-scrollable").length&&$(".panel-scrollable .panel-body").niceScroll({cursorwidth:"10px",cursorborder:"0px"})},handleTypehead:function(){var e;$(".typeahead").length&&((e=new Bloodhound({datumTokenizer:function(e){return e.tokens},queryTokenizer:Bloodhound.tokenizers.whitespace,prefetch:BlankonApp.handleBaseURL()+"/assets/global/plugins/bower_components/typehead.js/dist/typeahead-sample.json"})).initialize(),$(".typeahead").typeahead(null,{name:"typeahead-sample",source:e.ttAdapter(),templates:{empty:['<div class="empty-message">',"unable to find your type that match the current query","</div>"].join("\n"),suggestion:Handlebars.compile(['<a href="javascript:void(0);" class="media border-dotted animated fadeIn">','<span class="media-left"><span class="media-object">','<i class="fa fa-{{icon}} bg-{{color}}"></i>',"</span>","</span>",'<span class="media-body">','<span class="media-heading">{{name}}</span>','<span class="media-text">{{description}}</span>',"</span>","</a>"].join(""))}}))},handleFullscreen:function(){var n;$("#fullscreen").on("click",function(){var e,a;(n=!n)?($(".page-sound").length&&ion.sound.play("bell_ring"),$(this).toggleClass("fg-theme"),$(this).attr("data-original-title","Exit Fullscreen"),void 0!==(a=(e=document.documentElement).requestFullScreen||e.webkitRequestFullScreen||e.mozRequestFullScreen||e.msRequestFullScreen)&&a&&a.call(e)):($(".page-sound").length&&ion.sound.play("bell_ring"),$(this).removeClass("fg-theme"),$(this).attr("data-original-title","Fullscreen"),void 0!==(a=(e=document).cancelFullScreen||e.webkitCancelFullScreen||e.mozCancelFullScreen||e.msCancelFullScreen||e.exitFullscreen)&&a&&a.call(e))})},handleSelect2:function(){$(".select2").length&&$(".select2").select2()},handleTooltip:function(){$("[data-toggle=tooltip]").length&&$("[data-toggle=tooltip]").tooltip({animation:"fade"}),$(".tooltips").length&&$(".tooltips").tooltip({animation:"fade"})},handlePopover:function(){$("[data-toggle=popover]").length&&$("[data-toggle=popover]").popover()},handlePanelToolAction:function(){$("[data-action=collapse]").on("click",function(e){var a=$(this).parents(".panel").find(".panel-body"),n=$(this).parents(".panel").find(".panel-sub-heading"),o=$(this).parents(".panel").find(".panel-footer");a.is(":visible")?($(this).find("i").removeClass("fa-angle-up").addClass("fa-angle-down"),a.slideUp(),n.slideUp(),o.slideUp()):($(this).find("i").removeClass("fa-angle-down").addClass("fa-angle-up"),a.slideDown(),n.slideDown(),o.slideDown()),e.stopImmediatePropagation()}),$("[data-action=remove]").on("click",function(){$(this).parents(".panel").fadeOut(),$("body").find(".panel-fullsize").length&&$("body").find(".panel-fullsize-backdrop").remove()}),$("[data-action=refresh]").on("click",function(){var a=$(this).closest(".panel").children(".panel-body");a.append('<div class="indicator"><span class="spinner"></span></div>'),setInterval(function(){$.getJSON(BlankonApp.handleBaseURL()+"/assets/admin/data/reload-sample.json",function(e){$.each(e,function(){console.log("Retrieving data from json...")}),a.find(".indicator").hide()})},5e3)}),$("[data-action=expand]").on("click",function(){$(this).parents(".panel").hasClass("panel-fullsize")?($("body").find(".panel-fullsize-backdrop").remove(),$(this).data("bs.tooltip").options.title="Expand",$(this).find("i").removeClass("fa-compress").addClass("fa-expand"),$(this).parents(".panel").removeClass("panel-fullsize")):($("body").append('<div class="panel-fullsize-backdrop"></div>'),$(this).data("bs.tooltip").options.title="Minimize",$(this).find("i").removeClass("fa-expand").addClass("fa-compress"),$(this).parents(".panel").addClass("panel-fullsize"))}),$("[data-action=search]").on("click",function(){return $(this).parents(".panel").find(".panel-search").toggle(100),!1})},handleSparkline:function(){$(".sparklines").length&&($(".average").sparkline("html",{type:"bar",barColor:"#37BC9B",height:"30px"}),$(".traffic").sparkline("html",{type:"bar",barColor:"#8CC152",height:"30px"}),$(".disk").sparkline("html",{type:"bar",barColor:"#E9573F",height:"30px"}),$(".cpu").sparkline("html",{type:"bar",barColor:"#F6BB42",height:"30px"}))},handleClearCookie:function(){$("#reset-setting").on("click",function(){var e=$.cookie();for(var a in e)$.removeCookie(a);location.reload(!0)})},handleBoxModal:function(){$("#setting").on("click",function(){ion.sound.play("camera_flashing"),bootbox.dialog({message:"I am a custom dialog setting",title:"Custom setting",className:"modal-success modal-center",buttons:{success:{label:"Success!",className:"btn-success",callback:function(){alert("You are so calm!")}},danger:{label:"Danger!",className:"btn-danger",callback:function(){alert("You are so hot!")}},main:{label:"Click ME!",className:"btn-primary",callback:function(){alert("Hello World")}}}})}),$("#lock-screen").on("click",function(){ion.sound.play("camera_flashing"),bootbox.dialog({message:"Locker with notification display, Receive your notifications directly on your lock screen",title:"Lock Screen",className:"modal-lilac modal-center",buttons:{danger:{label:"No",className:"btn-danger"},success:{label:"Yes",className:"btn-success",callback:function(){window.location=$("#lock-screen").data("url")}}}})}),$("#logout").on("click",function(){ion.sound.play("camera_flashing"),bootbox.dialog({message:"Do you want to exit from Blankon?",title:"Logout",className:"modal-danger modal-center",buttons:{danger:{label:"No",className:"btn-danger"},success:{label:"Yes",className:"btn-success",callback:function(){window.location=$("#logout").data("url")}}}})})}};
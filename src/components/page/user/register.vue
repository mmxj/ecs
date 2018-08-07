<style>
    @import '/static/css/user.css';
    .reg-box .strength { width: 200px; height: 22px; left: 10px; right: 0; }
    .reg-box .strength span { float: left; }
    .register-box { display: none; }
</style>
<template>
    <div id="register-box" class="register-box">
        <div class="login-box f-mt10 mt-30">
            <div class="main bgf">
                <div class="content">
                    <div class="">
                        <div style="padding-top: 35px">
                            <div class="step">
                                <ul>
                                    <li class="col-xs-6 on">
                                        <span class="num"><em class="f-r5"></em><i>1</i></span>
                                        <span class="line_bg lbg-r"></span>
                                        <p class="lbg-txt">申请开通</p>
                                    </li>
                                   <!-- <li class="col-xs-4">
                                        <span class="num"><em class="f-r5"></em><i>2</i></span>
                                        <span class="line_bg lbg-l"></span>
                                        <span class="line_bg lbg-r"></span>
                                        <p class="lbg-txt">开通成功</p>
                                    </li>-->
                                    <li class="col-xs-6">
                                        <span class="num"><em class="f-r5"></em><i>3</i></span>
                                        <span class="line_bg lbg-l"></span>
                                        <p class="lbg-txt">开通成功</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="panel-body">
                                    <div id="navpills-11" class="tab-pane active">
                                        <div class="reg-box" id="verifyCheck" style="margin-top:20px;">
                                            <div class="part1">
                                                <div class="col-sm-3 text-right m-t-5"><span class="intelligent-label f-fl"><b class="ftx04">*</b>公司名称</span>
                                                </div>
                                                <div class="item col-sm-8">
                                                    <div class="f-fl item-ifo m-l-15">
                                                        <input type="text" maxlength="25" class="txt03 f-r3 required" data-valid="isNonEmpty||between:3-25||isCompany" data-error="公司名不能为空||公司名最低长度为3-25位||只能输入中文、字母、数字、下划线，且以中文或字母开头" id="CompanyName"/>
                                                        <span class="ie8 icon-close close hide"></span>
                                                        <label class="fa fa-check-circle blank text-success valid-input-icon hide"></label>
                                                        <label class="focus"><span>3-25位，中文、字母、数字、下划线的组合，以中文或字母开头</span></label>
                                                        <label class="focus valid"></label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3 text-right m-t-5">
                                                    <span class="intelligent-label f-fl"><b class="ftx04">*</b>申请人</span>
                                                </div>
                                                <div class="item col-sm-8">
                                                    <div class="f-fl item-ifo m-l-15">
                                                        <input type="text" maxlength="10" class="txt03 f-r3 required" data-valid="isNonEmpty||between:2-10||isUname" data-error="申请人不能为空||申请人长度2-10位||只能输入中文、字母、数字、下划线，且以中文或字母开头" id="ApplyName"/>
                                                        <span class="ie8 icon-close close hide"></span>
                                                        <label class="fa fa-check-circle blank text-success valid-input-icon hide"></label>
                                                        <label class="focus"><span>2-10位，中文、字母、数字、下划线的组合，以中文或字母开头</span></label>
                                                        <label class="focus valid"></label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3 text-right m-t-5">
                                                    <span class="intelligent-label f-fl"><b class="ftx04">*</b>手机号码</span>
                                                </div>
                                                <div class="item col-sm-8">
                                                    <div class="f-fl item-ifo m-l-15">
                                                        <input type="text" maxlength="11" class="txt03 f-r3 required" data-valid="isNonEmpty||isPhone" data-error="手机号码不能为空||手机号码格式错误" id="Phone"/>
                                                        <span class="ie8 icon-close close hide"></span>
                                                        <label class="fa fa-check-circle blank text-success valid-input-icon hide"></label>
                                                        <label class="focus"><span>手机号码格式：13688888888</span></label>
                                                        <label class="focus valid"></label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3 text-right m-t-5">
                                                    <span class="intelligent-label f-fl"><b class="ftx04"></b>申请人职务</span>
                                                </div>
                                                <div class="item col-sm-8">
                                                    <div class="f-fl item-ifo m-l-15">
                                                        <input type="text" maxlength="20" class="txt03 f-r3" id="ApplytPosition"/>
                                                        <label class="focus"><span>3-20位，中文、字母、数字、下划线的组合，以中文或字母开头</span></label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3 text-right m-t-5">
                                                    <span class="intelligent-label f-fl"><b class="ftx04"></b>邮箱</span></div>
                                                <div class="item col-sm-8">
                                                    <div class="f-fl item-ifo m-l-15">
                                                        <input type="text" class="txt03 f-r3 " data-valid="isNonEmpty||isEmail" data-error="邮箱不能为空||邮箱格式错误" id="Email"/>
                                                        <span class="ie8 icon-close close hide"></span>
                                                        <label class="fa fa-check-circle blank text-success valid-input-icon hide"></label>
                                                        <label class="focus"><span>邮箱格式为，例如：abc@abc.com</span></label>
                                                        <label class="focus valid"></label>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3 text-right m-t-5">
                                                    <span class="intelligent-label f-fl">所属行业</span>
                                                </div>
                                                <div class="item col-sm-8">
                                                    <div class="f-fl item-ifo m-l-15">
                                                        <select id="Industry" class="form-control no-border-top"></select>
                                                    </div>
                                                </div>
                                                <div class="col-sm-3 text-right m-t-5">
                                                    <span class="intelligent-label f-fl"><b class="ftx04"></b>员工数量</span>
                                                </div>
                                                <div class="item col-sm-8">
                                                    <div class="f-fl item-ifo m-l-15">
                                                        <select id="Employees" class="form-control no-border-top">
                                                            <option>20人以下</option>
                                                            <option>20-99人</option>
                                                            <option>100-499人</option>
                                                            <option>500-999人</option>
                                                            <option>1000人以上</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div class="item col-sm-8 col-sm-offset-3">
                                                    <span class="intelligent-label f-fl">&nbsp;</span>
                                                    <label class="f-size14 m-l-10 required" data-valid="isChecked" data-error="请先同意条款">
                                                        <input type="checkbox" checked/>
                                                        <a href="javascript:;" class="checkProtocol f-ml5">我已阅读并同意条款</a>
                                                    </label>
                                                    <label class="focus valid"></label>
                                                </div>
                                                <div class="col-sm-3"></div>
                                                <div class="item col-lg-8 m-b-30 m-l-15">
                                                    <span><a href="#/login" class="btn btn-blue f-r3" id="">返回首页</a></span>
                                                    <span><a href="javascript:" class="btn btn-blue f-r3" id="btn_part1">下一步</a></span>
                                                </div>
                                            </div>
                                            <div class="part2 text-center" style="display: none;padding-bottom: 20px;">
                                                <h3>恭喜帐号<label id="abc"></label>开通成功</h3>
                                                <p class="c-666 f-mt30 f-mb50" style="margin-top: 20px">密码已短信发送到您手机，当前帐号的类别是“体验帐号”，如果需要正式开通使用，请联系能迪客服人员。　
                                                    <router-link to="login" style="color: #0f88eb;">点击返回登录页</router-link>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-sPopBg" style="z-index:998;"></div>
        <div class="m-sPopCon regcon">
            <div class="m-sPopTitle"><strong>服务协议条款 <label id="sPopClose" class="m-sPopClose">×</label></strong></div>
            <div class="f-r0" style="padding: 5px;">
                <div class="eos">
                    <iframe src="/static/html/protocol/protocol.html" frameborder="0" height="500" width="100%"></iframe>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted: function() {
        	console.log(eosCommon.storage)
            $(".checkProtocol").click(function() {
                $(".m-sPopBg,.m-sPopCon").show();
            })
            $(".m-sPopClose").click(function() {
                $(".m-sPopBg,.m-sPopCon").hide();
            })
             
            $(function() {
                $("#Industry").change(function() {
                    $(this).attr("data-val", $(this).find("option:selected").attr("data"))
                })
                eosCommon.eosAjax(
                    eosCommon.COMMON_API + "api/common/industry",
                    "GET",
                    {"IndustryId": ""},
                    "json",
                    function(data) {
                        if(eosCommon.checkCode(data.State, data.Message)) {
                            for(var key in data.Data) {
//                                $("#Industry").append("<option data='0'>请选择所属行业</option>")
                                $("#Industry").append("<option data='" + data.Data[key]["IndustryId"] + "'>" + data.Data[key]["IndustryName"] + "</option>")
                            }
                            $("#Industry").attr("data-val", data.Data[0]["IndustryId"])
                        }
                    }
                )
                

                
                $("#btn_part1").click(function() {
                    var aaa=$("#Phone").val()
                    $(".part2 #abc").text(aaa);
                	
                	var value=$('#Email').val().trim();
                	  if(value !==''){
                    		$('#Email').addClass('required');
                    	}
                    	
                    if(!verifyCheck._click()) return;
                  
                    eosCommon.eosAjax(
                        eosCommon.COMMON_API + "api/account/apply",
                        "post",
                        {
                            "CompanyName": $("#CompanyName").val(),
                            "ApplyName": $("#ApplyName").val(),
                            "Phone": $("#Phone").val(),
                            "ApplytPosition": $("#ApplytPosition").val(),
                            "Email": $("#Email").val(),
                            "Employees": $("#Employees").val(),
                            "IndustryId": $("#Industry").attr("data-val")
                        },
                        "json",
                        function(data) {
                            if(eosCommon.checkCode(data.State, data.Message)) {
                                $(".part1").hide();
                                $(".part2").show();
                                $(".step li").eq(1).addClass("on");
                            }
                        }
                    )
                });
                $(window).resize(function() {
                    $("iframe").height($(window).height() - 360);
                    $(".regcon").height($(window).height() - 300);
                    $(".regcon").css({"margin-top": -($(window).height() - 300) / 2});
                })
            });
        }
    }
</script>
<style>
    #register-box .m-t-5 {
        margin-top: 7px;
    }
</style>
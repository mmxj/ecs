<template>
    <div id="forgot-box" class="forgot-box login-box f-mt10 mt-30" v-cloak>
        <div class="main bgf">
            <div class="content">
                <div class="container" style="width: 100%;">
                    <div class="m-t-30">
                        <div class="step">
                            <ul>
                                <li class="col-xs-4 on">
                                    <span class="num"><em class="f-r5"></em><i>1</i></span>
                                    <span class="line_bg lbg-r"></span>
                                    <p class="lbg-txt">获取验证码</p>
                                </li>
                                <li class="col-xs-4">
                                    <span class="num"><em class="f-r5"></em><i>2</i></span>
                                    <span class="line_bg lbg-l"></span>
                                    <span class="line_bg lbg-r"></span>
                                    <p class="lbg-txt">修改密码</p>
                                </li>
                                <li class="col-xs-4">
                                    <span class="num"><em class="f-r5"></em><i>3</i></span>
                                    <span class="line_bg lbg-l"></span>
                                    <p class="lbg-txt">修改成功</p>
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
                                            <div class="alert alert-info" style="display:none;margin: 0 auto 15px auto;">短信已发送至您手机，请输入短信中的验证码，确保您的手机号真实有效。</div>
                                            <div class="col-sm-3 text-right" style="margin-top: 5px;">
                                                <span class="intelligent-label f-fl"><b class="ftx04">*</b>手机号码</span></div>
                                            <div class="item col-sm-8">
                                                <div class="f-fl item-ifo">
                                                    <input type="text" class="txt03 f-r3 required" keycodes="tel" tabindex="2" data-valid="isNonEmpty||isPhone" data-error="手机号码不能为空||手机号码格式不正确" maxlength="11" id="phone" value=""/>
                                                    <span class="ie8 icon-close close hide"></span>
                                                    <label class="fa fa-check-circle blank text-success valid-input-icon hide"></label>
                                                    <label class="focus"><span>请您填写手机号码，手机号码不能为空，且为手机号码格式为11位有效数字</span></label>
                                                    <label class="focus valid"></label>
                                                </div>
                                            </div>
                                            <div class="col-sm-3 text-right" style="margin-top: 5px;">
                                                <span class="intelligent-label f-fl"><b class="ftx04">*</b>验证码</span></div>
                                            <div class="verifyYz_item item col-sm-8">
                                                <div class="f-fl item-ifo">
                                                    <input type="text" maxlength="6" id="verifyNo" class="txt03 f-r3 f-fl required" tabindex="4" style="width:185px" data-valid="isNonEmpty||isInt||minLength:6" data-error="验证码不能为空||验证码只能为数字||请输入6位数字验证码"/>
                                                    <span class="btn btn-gray f-r3 f-ml5 f-size13" id="time_box" disabled style="width:120px;display:none;">获取验证码</span>
                                                    <span class="btn btn-gray f-size13" id="verifyYz" style="width:115px;">获取验证码</span>
                                                    <span class="ie8 icon-close close hide" style="right:185px"></span>
                                                    <label class="fa fa-check-circle blank text-success valid-input-icon hide" style="left: 145px;"></label>
                                                    <label class="focus"><span>请查收手机短信，并填写短信中的验证码</span></label>
                                                    <label class="focus valid"></label>
                                                </div>
                                            </div>
                                            <div class="col-sm-3"></div>
                                            <div class="item col-sm-8 m-b-30 m-t-20 ">
                                                <div class="f-fl item-ifo">
                                                    <span><a href="index.html#/login" class="btn btn-blue f-r3" id="">返回首页</a></span>
                                                    <a style="display: none;" href="javascript:" class="btn btn-blue f-r3" id="btn_part1">下一步</a>
                                                </div>
                                            </div>
                                        </div>
                                        <!--<div class="part2">-->
                                        <div class="part2" style="display: none">
                                            <div class="item col-xs-12 m-b-30" style="height:auto">
                                                <span class="col-sm-3 text-right intelligent-label f-fl">手机号：</span>
                                                <span class="col-sm-8 f-fl item-ifo c-blue phone"></span>
                                            </div>
                                            <div class="item col-xs-12">
                                                <span class="col-sm-3 text-right intelligent-label f-fl"><b class="ftx04">*</b>密码：</span>
                                                <div class="f-fl item-ifo col-sm-8 m-b-40">
                                                    <input type="password" id="password" maxlength="20" class="txt03 f-r3 required" tabindex="3" style="ime-mode:disabled;" onpaste="return  false" autocomplete="off" data-valid="isNonEmpty||between:6-20||level:2" data-error="密码不能为空||密码长度6-20位||该密码太简单，有被盗风险，建议字母+数字的组合"/>
                                                    <span class="ie8 icon-close close hide" style="right:55px"></span>
                                                    <span class="showpwd" data-eye="password"></span>
                                                    <label class="fa fa-check-circle blank text-success valid-input-icon hide"></label>
                                                    <label class="focus">6-20位英文（区分大小写）、数字、字符的组合</label>
                                                    <label class="focus valid"></label>
                                                    <span class="clearfix"></span>
                                                    <label class="strength">
                                                        <span class="f-fl f-size12">安全程度：</span>
                                                        <b><i>弱</i><i>中</i><i>强</i></b>
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="item col-xs-12">
                                                <span class="col-sm-3 text-right intelligent-label f-fl"><b class="ftx04">*</b>确认密码：</span>
                                                <div class="f-fl item-ifo col-sm-8 m-b-40 ">
                                                    <input type="password" maxlength="20" class="txt03 f-r3 required" tabindex="4" style="ime-mode:disabled;" onpaste="return  false" autocomplete="off" data-valid="isNonEmpty||between:6-20||isRepeat:password" data-error="密码不能为空||密码长度6-20位||两次密码输入不一致" id="rePassword"/>
                                                    <span class="ie8 icon-close close hide" style="right:55px"></span>
                                                    <span class="showpwd" data-eye="rePassword"></span>
                                                    <label class="fa fa-check-circle blank text-success valid-input-icon hide"></label>
                                                    <label class="focus">请再输入一遍上面的密码</label>
                                                    <label class="focus valid"></label>
                                                </div>
                                            </div>
                                            <div class="item col-xs-12">
                                                <span class="intelligent-label f-fl col-sm-3">&nbsp;</span>
                                                <div class="f-fl item-ifo col-sm-8">
                                                    <a href="javascript:;" class="btn btn-blue f-r3" id="btn_part2">提交</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="part3 text-center" style="display:none">
                                            <h3>恭喜，您的密码已修改成功！</h3>
                                            <p class="c-666 f-mt30 f-mb50">页面将在 <strong id="times" class="f-size18">3</strong> 秒钟后，跳转到登录页面</p>
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
</template>
<script>
    var timerC = 60;
    var timerT;
    export default {
        mounted: function() {
            function _sendVerify() {
                $("#verifyYz").text("发送验证码").hide();
                $("#time_box").text("60 s后可重发").show();
                if(timerC === 0) {
                    clearTimeout(timerT);
                    timerC = 60;
                    var re = /^1([^01269])\d{9}$/;
                    if(!re.test($("#phone").val())) {
                        $("#time_box").text("发送验证码");
                    } else {
                        $("#verifyYz").show();
                        $("#time_box").hide();
                    }
                    return;
                }
                $("#time_box").text(timerC + " s后可重发");
                timerC--;
                timerT = setTimeout(function() {
                    _sendVerify();
                }, 1000);
            }

            $(function() {
                var SmsId = '',
                    TempAccessToken = '',
                    isCanSend = false;
                $("#phone").keyup(function() {
                    var re = /^1([^01269])\d{9}$/;
                    if(re.test($(this).val())) {
                        isCanSend = true;
                    } else {
                        isCanSend = false;
                    }
                });
                $("#verifyYz").click(function() {
                    if(!isCanSend) {
                        return false;
                    }
                    if(!$("#phone").val()) {
                        return false;
                    }
                    eosCommon.eosAjax(
                        eosCommon.COMMON_API + 'api/account/smscode',
                        "POST",
                        {"Mobile": $("#phone").val(), "IsCheckAccount": 1},
                        "json",
                        function(data) {
                            if(eosCommon.checkCode(data.State, data.Message)) {
                                $(".alert-info").show();
                                $("#time_box").text("60 s后可重发");
                                _sendVerify();
                                SmsId = data.Data.SmsId;
                                TempAccessToken = data.Data.TempAccessToken;
                                $("#btn_part1").show();
                            }
                        }
                    )
                })
                //第一页的确定按钮
                $("#btn_part1").click(function() {
                    if(!verifyCheck._click()) return;
                    eosCommon.eosAjax(
                        eosCommon.COMMON_API + "api/account/smsvalidate",
                        "post",
                        {"Code": $("#verifyNo").val(), "SmsId": SmsId},
                        "json",
                        function(data) {
                            if(eosCommon.checkCode(data.State, data.Message)) {
                                $(".phone").html($("#phone").val())
                                $(".part1").hide();
                                $(".part2").show();
                                $(".step li").eq(1).addClass("on");
                            }
                        }
                    )
                });
                //第二页的确定按钮
                $("#btn_part2").click(function() {
                    if(!verifyCheck._click()) return;
                    eosCommon.eosAjax(
                        eosCommon.COMMON_API + "api/account/resetpassword",
                        "post",
                        {"NewPassword": $("#rePassword").val(), "TempAccessToken": TempAccessToken},
                        "json",
                        function(data) {
                            if(eosCommon.checkCode(data.State, data.Message)) {
                                $(".part2").hide();
                                $(".part3").show();
                                $(".step li").eq(2).addClass("on");
                                countdown({
                                    maxTime: 3,
                                    ing: function(c) {
                                        $("#times").text(c);
                                    },
                                    after: function() {
                                        window.location.href = "#/login";
                                    }
                                });
                            }
                        }
                    )
                });
            });
        }
    }
</script>
<style>
    @import '/static/css/user.css';
    .reg-box .strength { width: 200px; height: 22px; left: 10px; right: 0; }
    .reg-box .strength span { float: left; }
    .forgot-box { display: none; }
</style>
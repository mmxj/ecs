var eosCommon = window.eosCommon || {};
eosCommon = (function() {
  var EOS_URL = "http://api.cleos.com.cn";
  //		 var EOS_URL = "http://192.168.16.211";
  var EOS_ENTERPRISE_API = EOS_URL + ":" + "2184/";
  var eosAjax = function(url, type, param, dataType, callback) {
    $.ajax({
      url: url,
      type: type,
      data: param,
      dataType: dataType,
      success: callback,
      timeout: 60000,
      error: function(err) {}
    })
  };

  function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r != null) return unescape(r[2]);
    return null;
  }
  return {
    ENTERPRISE_API: EOS_ENTERPRISE_API,
    eosAjax: eosAjax,
    GetQueryString: GetQueryString
  }
}())
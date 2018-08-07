// 省市区三级联动
// 实例: cityLinage.init('19','289','3042')
// 三个参数分别为   省份id 城市id 区域id
// 如果是初始化的话直接调用 cityLinage.init('','','')
var cityLinage = {
    init: function (prov,city,dist){
        cityLinage.getPorvince(
            prov,
            function (){
                cityLinage.getCity(
                    $('#province').selectpicker('val',$('#province').attr('value')),
                    city,
                    function (){
                        cityLinage.getDistrict(
                            $('#city').selectpicker('val',$('#city').attr('value')),
                            dist
                    );
            });
        })
    },
    loadData: function (defaultVal,results,selectEle,id,name,callback){
        if(window.parent.eosCommon.checkCode(results.State,results.Message)){
            $(selectEle).empty();
            if(results.Data == ''){
                $(selectEle).append("<option>暂无数据</option>")
            }else{
                for(var key in results.Data){
                    $(selectEle).append("<option value="+ results.Data[key][id] +">"+ results.Data[key][name] +"</option>")
                }
            }       
            if(defaultVal){
                $(selectEle).selectpicker('val',defaultVal)
            }
            if(selectEle == "#province"){
                $(selectEle).selectpicker('val','19')
            }
            $(selectEle).selectpicker('refresh');
            callback && callback();
        }
    },
    getPorvince: function (prov,callback){
        eosCommon.eosAjax(
            EOS_COMMON_API+"api/common/province",
            "GET",
            {"Region":""},
            "json",
            function (results){
                cityLinage.loadData(prov,results,'#province',"ProvinceId","ProvinceName",callback)
            } 
        );
    },
    getCity: function (provinceId,city,callback){
        eosCommon.eosAjax(
            eosCommon.EOS_COMMON_API+"api/common/city",
            "GET",
            {"ProvinceId":provinceId},
            "json",
            function (results){
                cityLinage.loadData(city,results,'#city',"CityId","CityName",callback);
            }
        );
    },
    getDistrict: function (cityId,dist,callback){
        eosCommon.eosAjax(
            eosCommon.EOS_COMMON_API+"api/common/district",
            "GET",
            {"CityId":cityId},
            "json",
            function (results){
                cityLinage.loadData(dist,results,'#district',"DistrictId","DistrictName",callback);
            }
        );
    }
}
<style lang="less" scoped="scoped">
  .ele_weather {
    width: 100%;
    height: 224px;
    .weather_detail_wrap {
      width: 100%;
      border-bottom: 1px solid #D1E3E2;
      .weather_detail_info {
        width: 100%;
        padding: 20px 5px 5px 26px;
        height: 150px;
        p.w_infos {
          margin-bottom: 4px;
        }
        .w_infos_key {
          font-size: 12px;
          color: #8492A6;
        }
        .w_infos_val {
          font-size: 12px;
          color: #1F2D3D;
        }
      }
    }
  }  
  .bottom_info {
    width: 100%;
    .w_temperature,
    .w_sd {
      position: relative;
      max-width: 110px;
      min-width: 90px;
      padding: 15px 0;
      margin: 0 auto;
      .img_wrap {
        height: 38px;
        width: 38px;
      }
      .ele_statistics_right_infos {
        height: 38px;
        width: 50px;
        position: absolute;
        right: 0px;
        top: 15px;
        .typeValue {
          width: 50px;
          font-size: 12px;
          color: #1F2D3D;
          font-weight: bolder;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .typeValueTime {
          font-size: 12px;
          text-align: center;
          color: #8492A6;
        }
      }
    }
  }
  .clearfloat:after {
    display: block;
    clear: both;
    content: "";
    visibility: hidden;
    height: 0
  }
</style>
<template>
  <!--ele_statistics-->
  <div class="ele_weather">
    <div class="weather_detail_wrap">
      <div class="weather_detail_info">
        <p class="w_infos"> <span class="w_infos_key">日期：</span> <span class="w_infos_val">{{weatherInfo.dateStr2}}</span> </p>
        <!--{{weatherInfo.date}}-->
        <p class="w_infos"> <span class="w_infos_key">城市：</span> <span class="w_infos_val">{{weatherInfo.currentCity}}</span> </p>
        <p class="w_infos"> <span class="w_infos_key">天气：</span> <span class="w_infos_val">{{weatherInfo.weather}}</span> </p>
        <p class="w_infos"> <span class="w_infos_key">温度：</span> <span class="w_infos_val">{{weatherInfo.temperature}}</span> </p>
        <p class="w_infos"> <span class="w_infos_key">风向：</span> <span class="w_infos_val">{{weatherInfo.wind}}</span> </p>
      </div>
      <div class="bottom_info">
        <div style="height: 74px;" class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div class="w_temperature clearfloat">
            <div class="img_wrap pull-left"> <img src="static/css/images/electric_manage/温度.png" /> </div>
            <div class="ele_statistics_right_infos pull-left">
              <div class="typeValue mb-5"> {{weatherInfo.date}} </div>
              <div class="typeValueTime"> 温度 </div>
            </div>
          </div>
        </div>
        <div style="height: 74px;" class=" col-xs-6 col-sm-6 col-md-6 col-lg-6">
          <div class="w_sd">
            <div class="img_wrap  pull-left"> <img src="static/css/images/electric_manage/湿度.png" /> </div>
            <div class="ele_statistics_right_infos  pull-left">
              <div class="typeValue mb-5"> 未知 </div>
              <div class="typeValueTime"> 湿度 </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--好听器 {{weatherInfo}}-->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        weatherInfo: {
          currentCity: '',
          date: '',
          dayPictureUrl: '',
          nightPictureUrl: '',
          weather: '',
          wind: '',
          temperature: '',
          dateStr2: ''
        },
        Latitude: '',
        Longitude: '',
        location: '',
        city: ''
      }
    },
    props: ['propsData'],
    watch: {},
    computed: {},
    mounted() {
      let vm = this;
      vm.Latitude = JSON.parse(vm.propsData.ProjectLocation).Latitude;
      vm.Longitude = JSON.parse(vm.propsData.ProjectLocation).Longitude;
      vm.location = vm.Latitude + ',' + vm.Longitude;
      vm.getCityy();
    },
    methods: {
      getWeatherInfo(city = '广州') {
        let vm = this;
        //http://api.map.baidu.com/telematics/v3/weather?output=json&ak=6tYzTvGZSOpYB5Oc2YGGOKt8&location=%E5%B9%BF%E5%B7%9E
        let param = {
          "ak": "VDjl1IawAVDBXlSgIDCq9sKQsuqm966U",
          "output": "json",
          "location": city
        };
        let url = "http://api.map.baidu.com/telematics/v3/weather";
        eosCommon.eosAjax(url, "get", param, "jsonp", function(result) {
          let data = result.results[0];
          let dateStr = data.weather_data[0].date;
          let [arr,
            index11,
            index22,
            index1,
            index2,
            dateStr1,
            dateStr2
          ] = [[],0,0,0,0,'','',];
	          index11=dateStr.indexOf(' '),
	          index22=dateStr.indexOf('('),
	          index1=dateStr.indexOf('：'),
	          index2=dateStr.indexOf(')'),
	          dateStr1=dateStr.slice(index1 + 1, index2),
	          dateStr2=dateStr.slice(index11 + 1, index22)
          vm.weatherInfo = {
            currentCity: data.currentCity,
            date: dateStr1,
            dayPictureUrl: data.weather_data[0].dayPictureUrl,
            nightPictureUrl: data.weather_data[0].nightPictureUrl,
            weather: data.weather_data[0].weather,
            wind: data.weather_data[0].wind,
            temperature: data.weather_data[0].temperature,
            dateStr2: dateStr2
          }
        });
      },
      getCityy() {
        let vm = this;
        //http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=35.658651,139.745415&output=json&pois=1&ak=您的ak //GET请求
        let param = {
          "output": "json",
          "ak": "VDjl1IawAVDBXlSgIDCq9sKQsuqm966U",
          "location": vm.location,
          "pois": 0
        };
        let url = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse";
        eosCommon.eosAjax(url, "get", param, "jsonp", function(rs) {
          let addComp = rs.result.addressComponent;
          vm.getWeatherInfo(addComp.city);
        });
      }
    }
  }
</script>
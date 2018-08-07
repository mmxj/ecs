
/**
* Theme: Ubold Admin Template
* Author: Coderthemes
* Leads
*/

!function($) {
    "use strict";

    var LeadsCharts = function() {};

    //creates Stacked chart
    LeadsCharts.prototype.createStackedChart  = function(element, data, xkey, ykeys, labels, lineColors) {
        Morris.Bar({
            element: element,
            data: data,
            xkey: xkey,
            ykeys: ykeys,
            stacked: true,
            labels: labels,
            hideHover: 'auto',
            resize: true, //defaulted to true
            gridLineColor: '#eeeeee',
            barColors: lineColors
        });
    },
    
    LeadsCharts.prototype.init = function() {
        //creating Stacked chart
        var $stckedData  = [
            { y: '华东地区', a: 45, b: 180 },
            { y: '华南地区', a: 75,  b: 65 },
            { y: '华中地区', a: 100, b: 90 },
            { y: '华北地区', a: 75,  b: 65 },
            { y: '西北地区', a: 100, b: 90 },
            { y: '西南地区', a: 75,  b: 65 },
            { y: '东北地区', a: 50,  b: 40 }
        ];
        this.createStackedChart('morris-bar-stacked', $stckedData, 'y', ['a', 'b'], ['项目总数', '设备总数'], ['#5d9cec', '#ebeff2']);

    },
    //init
    $.LeadsCharts = new LeadsCharts, $.LeadsCharts.Constructor = LeadsCharts
}(window.jQuery),

//initializing 
function($) {
    "use strict";
    $.LeadsCharts.init();
}(window.jQuery);
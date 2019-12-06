var CHART_RESIZE = [];

function chartPie(obj, series) {
  var myChart = echarts.init(obj);
  var option = option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0
    },
    color: ['#00d0cc', '#007efe', '#ae7fe3', '#f85159', '#ff9255'],
    series: series
  };
  myChart.setOption(option);
  CHART_RESIZE.push(function () {
    myChart.resize()
  })
}

function chartPieData() {
  $.ajax({
    type: "GET",
    url: "../api/getYearData.json",
    success: function (data) {
      var res = data.obj;
      var html;
      var i = 0;
      var series = [];
      for (var key in res) {
        if (res[key].length > 0) {
          if (i % 4 == 0) {
            html = $('<div class="pie-box swiper-slide"></div>')
            $("#Pies").append(html)
          }
          series.push(
            [{
              name: key,
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['50%', '50%'],
              data: res[key].map(function (item) {
                return {
                  value: item.jc,
                  name: item.categoryname
                }
              })
            }, {
              name: key,
              type: 'pie',
              radius: ['30%', '50%'],
              center: ['50%', '50%'],
              data: res[key].map(function (item) {
                return {
                  value: item.jc,
                  name: item.categoryname
                }
              })
            }])
          $(html).append('<div></div>')
          i++
        }
      }
      $('#Pies .pie-box>div').each(function (i, item) {
        chartPie(item, series[i])
      })
      var mySwiper = new Swiper('.swiper-container', {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
        }
      })
    }
  })
}

function chartLine(xAxis, series) {
  var myChart = echarts.init($('#ChartLine')[0]);
  var option = {
    color: ['#ff8d91', '#00deff'],
    grid: {
      left: 40,
      right: 0,
      top: 30,
      bottom: 30
    },
    legend: {
      right: 10,
      top: 0,
      textStyle: {
        color: "#fff"
      },
      icon: "circle",
      data: ['检验', '合格']
    },
    tooltip: {
      trigger: 'axis'
    },
    xAxis: {
      type: 'category',
      data: xAxis,
      axisLine: {
        lineStyle: {
          color: "#18d2ff"
        }
      },
      axisLabel: {
        color: "#18d2ff"
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      },
      axisLabel: {
        color: "#18d2ff"
      },
      splitLine: {
        lineStyle: {
          color: "#18d2ff"
        }
      },
    },
    series: series
  };
  myChart.setOption(option);
  CHART_RESIZE.push(function () {
    myChart.resize()
  })
}

function chartColumn(id, source) {
  var myChart = echarts.init(id);
  var option = {
    legend: {
      right: 0,
      textStyle: {
        color: "#fff"
      },
    },
    grid: {
      left: 40,
      right: 0,
      top: 30,
      bottom: 30
    },
    color: ['#003bad', '#9b812d', '#00a7b5'],
    dataset: {
      source: source
    },
    xAxis: {
      type: 'category',
      axisLine: {
        lineStyle: { color: "#fff" }
      },
      axisLabel: {
        color: "#fff"
      }
    },
    tooltip: {},
    yAxis: {
      axisLine: {
        lineStyle: { color: "#fff" }
      },
      axisLabel: {
        color: "#fff"
      }
    },
    series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
  };
  myChart.setOption(option);
  CHART_RESIZE.push(function () {
    myChart.resize({
      width: $('#ChartColumn').width(),
      height: $('#ChartColumn').height(),
    })
  })
}

function objectValues(obj) {
  var res = [];
  for (var key in obj) {
    res.push(obj[key])
  }
  return res
}

function objectKey(obj) {
  var res = [];
  for (var key in obj) {
    res.push(key)
  }
  return res
}

function chartLineData() {
  $.ajax({
    type: "GET",
    url: "../api/getCurMonthEveryDayData.json",
    success: function (data) {
      var res = data.obj;
      var xAxis = objectKey(res.checkData[0])
      var series = [{
        name: "检验",
        data: objectValues(res.checkData[0]),
        type: 'line'
      }, {
        name: "合格",
        data: objectValues(res.qualifiedData[0]),
        type: 'line'
      }]
      chartLine(xAxis, series);
    }
  })
}

function working() { //工位状态
  $.ajax({
    type: "GET",
    url: "../api/getworkstationData.json",
    success: function (data) {
      var res = data.obj;
      var html;
      res.forEach(function (item, i) {
        if (i % 10 == 0) {
          html = $("<div class='swiper-slide'></div>");
          $("#table").append(html)
        }
        ++i;
        var span = "<span class='circular' style='width:" + parseInt(item.finishrate) + "%'></span>"
        var div = "<div class='flex'><div style='flex:0 0 40px'>" + i + "</div>"
        div += "<div style='flex:0 0 200px'>" + item.workname + "</div>"
        div += "<div style='flex:1'>" + item.encodingcode + "</div>"
        div += "<div style='flex:0 0 200px'>" + item.testitemname + "</div>"
        div += "<div style='flex:0 0 120px'>" + span + "</div></div>"
        html.append(div)
      })
      new Swiper('.table-container', {
        direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
        }
      })
    }
  })
}

function chartColumnData() { //年度每月检测设备合格数目
  $.ajax({
    type: "GET",
    url: "../api/getYearQualifiedData.json",
    success: function (data) {
      var res = data.obj;
      var obj = {};
      for (var key in res) {
        var arr = res[key];
        arr.forEach(function (item, i) {
          obj[item.categoryname] = obj[item.categoryname] || [];
          obj[item.categoryname].push(item.jc)
        })
      }
      var source = [];
      var num = 0;
      for (var key in obj) {
        var arrResult = obj[key];
        if (num % 3 == 0) {
          var arr = [
            ['product'],
            ['一月'],
            ['二月'],
            ['三月'],
            ['四月'],
            ['五月'],
            ['六月'],
            ['七月'],
            ['八月'],
            ['九月'],
            ['十月'],
            ['十一月'],
            ['十二月'],
          ]
          source.push(arr)
        }
        arr[0].push(key);
        arrResult.forEach(function (v, i) {
          arr[i + 1].push(v)
        })
        num++
      }
      var length = source.length;
      for (var i = 0; i < length; i++) {
        $("#ChartColumn").append('<div class="swiper-slide"><div class="column-box "></div></div>')
      }
      new Swiper('.column-container', {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
        }
      })
      $('#ChartColumn .column-box ').each(function (i, item) {
        chartColumn(item, source[i])
      })
    }
  })
}

function information() { //预警信息
  $.ajax({
    type: "GET",
    url: "../api/getearlyalarm.json",
    success: function (data) {
      var res = data.obj;
      var html;
      res.forEach(function (item, i) {
        if (i % 5 == 0) {
          html = $("<div class='swiper-slide'></div>");
          $("#info").append(html)
        }
        ++i;
        var div = '<div class="flex"><div style="flex:0 0 60px">' + i + '</div>'
        div += '<div style="flex:1">' + item.alarm_time + '</div>'
        div += '<div style="flex:0 0 60px">' + item.alarm_type + '</div>'
        div += '<div style="flex:0 0 60px">' + item.point_name + '</div>'
        div += '<div style="flex:0 0 60px"><span class="status">红色</span></div>'
        div += '<div style="flex:0 0 50px">' + item.isdispose + '</div></div>'
        html.append(div)
      })
      new Swiper('.s-container', {
        pagination: {
          el: '.swiper-pagination',
        }
      })
    }
  })
}

function chartRader(obj, data) {
  console.log(data)
  var myChart = echarts.init(obj);
  var option = {
    color: ["#00e5f8", "#5bfcec", "#8a9ec3"],
    tooltip: {
      confine: true
        //show: true
    },
    legend: {
      right: 0,
      top: 0,
      textStyle: {
        color: 'fff'
      },
      data: [{
        name: data.title,
        icon: 'rect'
      }]
    },
    radar: {
      radius: "65%",
      show: false,
      splitNumber: 3,
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      axisLable: {
        backgroundColor: 'transprarent'
      },
      indicator: data.indicator,
    },
    series: [{
      name: data.title,
      type: 'radar',
      // areaStyle: {normal: {}},
      data: data.data
    }]
  };
  myChart.setOption(option);
  CHART_RESIZE.push(function () {
    myChart.resize()
  })
}

function chartRaderData() {
  $.ajax({
    type: "GET",
    url: "../api/getRadar.json",
    success: function (data) {
      var res = data.obj;
      var result = []
      res.forEach(function (obj, i) {
        result[i] = result[i] || {
          indicator: [],
          data: [{
            value: [],
            name: "",
          }],
          title: "",
        }
        var radarData = result[i];
        for (var key in obj) {
          if (key !== "deviceName") {
            radarData.indicator.push({
              name: key,
              max: 100,
            })
            radarData.data[0].value.push(obj[key])
          } else {
            radarData.data[0].name = obj[key]
            radarData.title = obj[key]
          }
        }
      })
      for (var i = 0, length = res.length; i < length; i++) {
        $("#Rader").append('<div class=" swiper-slide"></div>')
      }
      new Swiper('.r-container', {
        effect: 'fade',
        pagination: {
          el: '.swiper-pagination',
        }
      })
      $('#Rader .swiper-slide').each(function (i, item) {
        chartRader(item, result[i])
      })
    }
  })
}
chartPieData() //当月每日检测数目
chartLineData() //当月每日检测数及合格数目
chartColumnData() //年度每月检测设备合格数目
chartRaderData(); //设备健康曲线
working() //工位状态
information() //预警信息
$(window).resize(function () {
  CHART_RESIZE.forEach(function (cb) {
    console.log(cb)
    cb()
  })
})
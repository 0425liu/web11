var mySwiper = new Swiper('.swiper-container', {
  autoplay: true,
  pagination: {
    el: '.swiper-pagination',
  }
})
var CHART_RESIZE = [];

function chartPie(obj) {
  var myChart = echarts.init(obj);
  var option = option = {
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    color: ['#00d0cc', '#007efe', '#ae7fe3', '#f85159', '#ff9255'],
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: ['30%', '80%'],
      center: ['50%', '50%'],
      data: [{ value: 335, name: '直接访问' }, { value: 310, name: '邮件营销' }, { value: 234, name: '联盟广告' }, { value: 135, name: '视频广告' }, { value: 1548, name: '搜索引擎' }],
    }, {
      name: '访问来源',
      type: 'pie',
      radius: ['30%', '80%'],
      center: ['50%', '50%'],
      label: {
        position: 'inside',
        formatter: '{d}%'
      },
      data: [{ value: 335, name: '直接访问' }, { value: 310, name: '邮件营销' }, { value: 234, name: '联盟广告' }, { value: 135, name: '视频广告' }, { value: 1548, name: '搜索引擎' }],
    }]
  };
  myChart.setOption(option);
  CHART_RESIZE.push(function () {
    myChart.resize()
  })
}
$('#Pies .pie-box>div').each(function (i, item) {
  chartPie(item)
})

function chartLine() {
  var myChart = echarts.init($('#ChartLine')[0]);
  var option = {
    color: ['#ff8d91', '#00deff'],
    legend: {
      right: 10,
      top: 0,
      width: 100,
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
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
    series: [{
      name: "检验",
      data: [820, 932, 901, 934, 1290, 1330, 1320, 1330, 1320, 1330, 1320, 1320],
      type: 'line'
    }, {
      name: "合格",
      data: [820, 932, 901, 934, 1290, 1330, 1320, 820, 932, 901, 934, 1290],
      type: 'line'
    }]
  };
  myChart.setOption(option);
  CHART_RESIZE.push(function () {
    myChart.resize()
  })
}

function chartColumn() {
  var myChart = echarts.init($('#ChartColumn')[0]);
  var option = {
    legend: {
      right: 0,
      textStyle: {
        color: "#fff"
      },
    },
    color: ['#003bad', '#9b812d', '#00a7b5'],
    dataset: {
      source: [
        ['product', '变压器', '干式变压器', '油浸式变压器'],
        ['一月', 43.3, 85.8, 93.7],
        ['二月', 83.1, 73.4, 55.1],
        ['三月', 43.3, 85.8, 93.7],
        ['四月', 43.3, 85.8, 93.7],
        ['五月', 83.1, 73.4, 55.1],
        ['六月', 43.3, 85.8, 93.7],
        ['七月', 43.3, 85.8, 93.7],
        ['八月', 83.1, 73.4, 55.1],
        ['九月', 43.3, 85.8, 93.7],
        ['十月', 43.3, 85.8, 93.7],
        ['十一月', 83.1, 73.4, 55.1],
        ['十二月', 43.3, 85.8, 93.7],
      ]
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
    myChart.resize()
  })
}

function chartRader() {
  var myChart = echarts.init($('#ChartRader')[0]);
  var option = {
    color: ["#00e5f8", "#5bfcec", "#8a9ec3"],
    tooltip: {},
    radar: {
      show: false,
      // shape: 'circle',
      name: {
        textStyle: {
          color: '#fff',
          backgroundColor: '#00defe',
          borderRadius: 3,
          padding: [3, 5]
        }
      },
      indicator: [{
        name: '1',
        max: 6500
      }, {
        name: '2',
        max: 16000
      }, {
        name: '3',
        max: 30000
      }, {
        name: '4',
        max: 38000
      }, {
        name: '5',
        max: 52000
      }, {
        name: '6',
        max: 25000
      }, {
        name: '7',
        max: 25000
      }]
    },
    series: [{
      name: '预算 vs 开销（Budget vs spending）',
      type: 'radar',
      // areaStyle: {normal: {}},
      data: [{
        value: [4300, 10000, 28000, 35000, 50000, 19000, 19000],
        name: '预算分配（Allocated Budget）'
      }, {
        value: [430, 1000, 2800, 3500, 5000, 1900, 1900],
        name: '预算分配（Allocated Budget）'
      }, {
        value: [5000, 14000, 28000, 31000, 42000, 21000, 21000],
        name: '实际开销（Actual Spending）'
      }]
    }]
  };
  myChart.setOption(option);
  CHART_RESIZE.push(function () {
    myChart.resize()
  })
}
chartLine()
chartColumn()
  // chartRader()
$(window).resize(function () {
  CHART_RESIZE.forEach(function (cb) {
    cb()
  })
})
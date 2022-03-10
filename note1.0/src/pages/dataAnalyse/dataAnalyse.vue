<template>
  <div class="Echarts">
    <el-tabs
      v-model="activeName"
      type="border-card"
      @tab-click="handleClick"
      stretch="false"
    >
      <el-tab-pane label="标签访问量" name="first">
        <div id="mains" style="width: 480px;height:480px"></div>
      </el-tab-pane>
      <el-tab-pane label="用户地区统计" name="second">
        <div id="area" style="width: 480px;height:480px"></div>
      </el-tab-pane>
      <el-tab-pane label="用户性别排名" name="third">
        <div id="gender" style="width: 480px;height:480px"></div>
      </el-tab-pane>
    </el-tabs>
    <!-- <div id="main" style="width: 1080px;height:1080px"></div> -->
  </div>
</template>

<script>
import request from "@/network/request";

export default {
  name: "Echarts",
  data() {
    return {
      tagCounts: "10",
      activeName: "first",
      option: {
        title: {
          text: "标签访问量",
        },
        dataset: [
          {
            dimensions: ["count", "tagName"],
            source: [],
          },
          {
            transform: {
              type: "sort",
              config: { dimension: "count", order: "asc" },
            },
          },
        ],
        xAxis: {},
        yAxis: {
          type: "category",
          axisLabel: { interval: 0, rotate: 30 },
        },
        series: {
          type: "bar",
          encode: { x: "count", y: "tagName" },
          datasetIndex: 1,
        },
      },
      areaoption: {
        title: {
          text: "用户地区统计",
        },
        dataset: [
          {
            dimensions: ["count", "province"],
            source: [],
          },
          {
            transform: {
              type: "sort",
              config: { dimension: "count", order: "asc" },
            },
          },
        ],
        xAxis: {},
        yAxis: {
          type: "category",
          axisLabel: { interval: 0, rotate: 30 },
        },
        series: {
          type: "bar",
          encode: { x: "count", y: "province" },
          datasetIndex: 1,
        },
      },
      genderoption: {
        title: {
          text: "用户性别排名",
        },
        dataset: [
          {
            dimensions: ["gender", "count"],
            source: [
              { gender: "m", count: "0" },
              { gender: "f", count: "0" },
            ],
          },
          {
            transform: {
              type: "sort",
              config: { dimension: "count", order: "asc" },
            },
          },
        ],
        xAxis: {},
        yAxis: {
          type: "category",
          axisLabel: { interval: 0, rotate: 30 },
        },
        series: {
          type: "bar",
          encode: { x: "count", y: "gender" },
          datasetIndex: 1,
        },
      },
    };
  },
  methods: {
    tagCount() {
      var myChart;
      if (myChart != null && myChart != "" && myChart != undefined) {
        myChart.dispose(); //销毁
      }
      request({
        url: "/internal/admin/statics/count/tag/" + this.tagCounts,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.option.dataset[0].source = res.data.data.counts;
          console.log(this.option);
          myChart = this.$echarts.init(document.getElementById("mains"));
          myChart.setOption(this.option);
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
    },
    areaCount() {
      var myChart;
      if (myChart != null && myChart != "" && myChart != undefined) {
        myChart.dispose(); //销毁
      }
      request({
        url: "/auth/user/count/area/" + this.tagCounts,
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.areaoption.dataset[0].source = res.data.data.counts;
          console.log(this.areaoption);
          myChart = this.$echarts.init(document.getElementById("area"));
          myChart.setOption(this.areaoption);
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
    },
    genderCount() {
      var myChart;
      if (myChart != null && myChart != "" && myChart != undefined) {
        myChart.dispose(); //销毁
      }
      request({
        url: "/auth/user/count/gender",
        method: "get",
      })
        .then((res) => {
          console.log(res);
          this.genderoption.dataset[0].source = res.data.data.counts;
          console.log(this.genderoption);
          myChart = this.$echarts.init(document.getElementById("gender"));
          myChart.setOption(this.genderoption);
          // $window.seesionStorage.accessToken = this.user_token
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 使用刚指定的配置项和数据显示图表。
  },
  mounted() {
    // this.myEcharts();
    this.tagCount();
    this.areaCount();
    this.genderCount();
  },
};
</script>

<style></style>

<!-- myEcharts() {
// 基于准备好的dom，初始化echarts实例
var myChart = this.$echarts.init(document.getElementById("main"));

// 指定图表的配置项和数据
var base = +new Date(2020, 10, 7);

var oneDay = 24 * 3600 * 1000;

var data = [[base, Math.random() * 300]];
console.log(data);
for (var i = 0; i < 2; i++) { var now=new Date((base +=oneDay)); var y=now.getFullYear(); var m=now.getMonth() < 9 ? "0"
    + (now.getMonth() + 1) : +(now.getMonth() + 1); const idks=y + "/" + m + "/" + (now.getDate() < 10 ? "0" +
    now.getDate() : +now.getDate()); const idk=y + "-" + m + "-" + (now.getDate() < 10 ? "0" + now.getDate() :
    +now.getDate()) + " 00:00:00" ; const idk2=y + "-" + m + "-" + (now.getDate() < 9 ? "0" + (now.getDate() + 1) :
    +now.getDate() + 1) + " 23:59:59" ; request({ url: "/internal/admin/statics/count/note?end=" + idk2 + "&start=" +
    idk, method: "get" , }) .then((res)=> {
    console.log(res.data.data);
    data.push([idks, res.data.data]);

    // $window.seesionStorage.accessToken = this.user_token
    })
    .catch((err) => {
    console.log(err);
    });
    }
    console.log(data);

    var option = {
    tooltip: {
    trigger: "axis",
    position: function(pt) {
    return [pt[0], "10%"];
    },
    },
    title: {
    left: "center",
    text: "大数据量面积图",
    },
    toolbox: {
    feature: {
    dataZoom: {
    yAxisIndex: "none",
    },
    restore: {},
    saveAsImage: {},
    },
    },
    xAxis: {
    type: "time",
    boundaryGap: false,
    },
    yAxis: {
    type: "value",
    boundaryGap: [0, "100%"],
    },
    dataZoom: [
    {
    type: "inside",
    start: 0,
    end: 20,
    },
    {
    start: 0,
    end: 20,
    },
    ],
    series: [
    {
    name: "模拟数据",
    type: "line",
    smooth: true,
    symbol: "none",
    areaStyle: {},
    data: data,
    },
    ],
    }; 
    myChart.setOption(option);-->

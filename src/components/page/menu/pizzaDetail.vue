<template>
  <div class="order-detail">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          pizza详情
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <!-- <el-row :gutter="20">
        <el-col :span="16">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple"></div>
        </el-col>
      </el-row>-->
      <el-row :gutter="20">
        <el-col :span="10">
          <div id="pizzaChart"></div>
        </el-col>
        <el-col :span="10">
          <div class="order-info">
            <img :src="picURL">
            <br>
            <br>
            状态：{{this.$route.query.pizzaStatus}}
            <br>
            <br>
            编号：{{this.$route.query.pizzaID}}
            <br>
            <br>
            名字：{{this.$route.query.pizzaName}}
            <br>
            <br>
            描述：{{this.$route.query.description}}
            <br>
            <br>
            原料：{{this.$route.query.formula}}
            <br>
            <br>
            价格（9寸）：{{this.$route.query.price9}}
            <br>
            <br>
            价格（12寸）：{{this.$route.query.price12}}
          </div>
        </el-col>
      </el-row>
      <!-- <div align="right" id="pizzaChart" style="width:50%; height:400px;"></div> -->
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      pizzaChart: "",
      picURL: this.$route.query.picURL
    };
  },

  methods: {
    drawPizzaChart() {
      this.pizzaChart = echarts.init(document.getElementById("pizzaChart"));
      this.pizzaChart.setOption({
        title: { text: "近半年销量" },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["月销售额"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "2018/09",
            "2018/10",
            "2018/11",
            "2018/12",
            "2019/02",
            "2019/03"
          ],
          axisLabel: {
            interval: 0
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "月销量",
            type: "line",
            stack: "总量",
            data: [1200, 1320, 1010, 1340, 900, 2300]
          }
        ]
      });
    },
    drawCharts() {
      this.drawPizzaChart();
    }
  },
  mounted: function() {
    this.drawCharts();
  },
  updated: function() {
    this.drawCharts();
  }
};
</script>

<style scoped>
.order-detail {
  width: 100%;
  font-size: 18px;
}
.amap-wrapper {
  height: 500px;
  margin-left: 510px;
  /* width: 100%;
    height: 500px; */
}
.order-info {
  float: left;
  width: 500px;
  margin-right: -100%;
  height: 500px;
}
.right {
  float: right;
  width: 100%;
}
</style>
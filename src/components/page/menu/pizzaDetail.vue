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
      <div align="left">
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
      <div align="right">right!</div>
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
      this.chartColumn.setOption({
        title: { text: "今日各种披萨销量" },
        tooltip: {},
        xAxis: {
          data: [
            "韩式烤肉披萨",
            "照烧风味牛肉土豆披萨",
            "豪华尊享披萨",
            "意式烤肠披萨",
            "多重浓汁披萨",
            "BBQ鸡肉披萨"
          ],
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [10, 20, 36, 10, 10, 20]
          }
        ]
      });
    }
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
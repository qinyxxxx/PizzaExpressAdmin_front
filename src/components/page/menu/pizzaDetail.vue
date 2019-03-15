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
      <el-row :gutter="4">
        <el-col :span="9">
          <img :src="picURL">
        </el-col>
        <el-col :span="15">
          <el-table :data="pizzaData" style="width: 100%" border fit>
            <el-table-column prop="pizzaID" label="ID" width="100"></el-table-column>
            <el-table-column prop="pizzaStatus" label="当前状态" width="100"></el-table-column>
            <el-table-column prop="pizzaName" label="名称" width="100"></el-table-column>
            <el-table-column prop="description" label="描述" :formatter="formatter"></el-table-column>
            <el-table-column prop="formula" label="原料" width="100"></el-table-column>
            <el-table-column prop="price9" label="价格（9寸）" width="100"></el-table-column>
            <el-table-column prop="price12" label="价格（12寸）" width="100"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <br>
      <el-row>
        <div id="pizzaChart" style="width:100%; height:500px"></div>
      </el-row>
      <br>
      <el-row>
        <div id="pizzaShopChart" style="width:100%; height:500px"></div>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      pizzaData: [
        {
          pizzaID: this.$route.query.pizzaID,
          pizzaStatus: this.$route.query.pizzaStatus,
          pizzaName: this.$route.query.pizzaName,
          description: this.$route.query.description,
          formula: this.$route.query.formula,
          price9: this.$route.query.price9,
          price12: this.$route.query.price9
        }
      ],
      pizzaChart: null,
      pizzaShopChart: null,
      picURL: this.$route.query.picURL
    };
  },

  methods: {
    formatter(row, column) {
      return row.description;
    },
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
    drawPizzaShopChart() {
      this.chartColumn = echarts.init(
        document.getElementById("pizzaShopChart")
      );
      this.chartColumn.setOption({
        title: { text: "各工厂今日销量" },
        tooltip: {},
        xAxis: {
          data: [
            "华师大店",
            "上大店",
            "上师大店",
            "复旦店",
            "同济店",
            "交大店",
            "上外店",
            "华理店"
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
            name: "今日销量",
            type: "bar",
            data: [10, 20, 36, 10, 10, 20, 5, 40],
            itemStyle:{
              normal:{
                color: '#106EDD'
              }
            }
          }
        ]
      });
    },
    drawCharts() {
      this.drawPizzaChart();
      this.drawPizzaShopChart();
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
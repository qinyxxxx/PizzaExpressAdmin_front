<template>
  <section class="chart-container">
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:220px;">
          <div class="user-info">
            <img src="../../assets/img/touxiang.png" class="user-avator" alt>
            <div class="user-info-cont">
              <div style="padding-bottom: 5px">欢迎您，{{name}}</div>
              <div>{{shopID}}号工厂管理员</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover" class="mgb20" style="height:220px;">
          <div slot="header" class="clearfix">
            <span>工厂基本信息</span>
          </div>
          <el-table :data="factory_info" border class="table">
            <el-table-column prop="shopName" label="名称" width="120"></el-table-column>
            <el-table-column prop="shopID" label="ID编号" width="100"></el-table-column>
            <el-table-column prop="shopSalesVolume" label="上月接单量" width="110"></el-table-column>
            <el-table-column prop="shopPhone" label="电话" width="100"></el-table-column>
            <el-table-column prop="shopAddress" label="地址" :formatter="formatter"></el-table-column>
            <el-table-column prop="shopStartTime" label="营业时间" width="90"></el-table-column>
            <el-table-column prop="shopEndTime" label="打烊时间" width="90"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="15">
      <el-col :span="12">
        <el-card>
          <div id="chartColumn" style="width:100%; height:400px;"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <div id="chartLine" style="width:100%; height:400px;"></div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import echarts from "echarts";
import ElFormItem from "element-ui/packages/form/src/form-item";

export default {
  components: { ElFormItem },
  data() {
    return {
      url_factory_info: "/pizzaexpress/shop/getshopbyid", //返回这个工厂的信息
      chartColumn: null,
      chartBar: null,
      name: sessionStorage.getItem("account"),
      shopID: sessionStorage.getItem("shopID"),
      factory_info: [
        {
          shopName: "华东师范大学店",
          shopID: 123456,
          shopNumber: 12580,
          shopSalesVolume: 2300,
          shopAddress: "中山北路3663号",
          shopStartTime: "8:00",
          shopEndTime: "22:00"
        }
      ]
    };
  },
  created() {
    this.getData();
  },
  methods: {
    formatter(row, column) {
      return row.shopAddress;
    },
    drawColumnChart() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      this.chartColumn.setOption({
        title: { text: "今日披萨销量" },
        tooltip: {},
        xAxis: {
          data: [
            "韩式烤肉披萨",
            "照烧风味牛肉土豆披萨",
            "豪华尊享披萨",
            "意式烤肠披萨",
            "多重浓芝披萨",
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
            data: [10, 20, 36, 10, 10, 20],
            itemStyle: {
              normal: {
                color: "#106EDD"
              }
            }
          }
        ]
      });
    },
    drawLineChart() {
      this.chartLine = echarts.init(document.getElementById("chartLine"));
      this.chartLine.setOption({
        title: {
          text: "近半年的月销售额"
        },
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
            "2018/10",
            "2018/11",
            "2018/12",
            "2019/01",
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
            name: "月销售额",
            type: "line",
            stack: "总量",
            data: [1200, 1320, 1010, 1340, 900, 2300],
            itemStyle: {
              normal: {
                color: "#106EDD"
              }
            }
          }
        ]
      });
    },
    drawCharts() {
      this.drawColumnChart();
      this.drawLineChart();
    },
    getData() {
      this.$axios
        .post(this.url_factory_info, {
          shopID: sessionStorage.getItem("shopID")
        })
        .then(res => {
          let factory_info = res.data.shopData.data;
          this.factory_info = factory_info;
        });
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
.chart-container {
  width: 100%;
  float: left;
}
.mgb20 {
  margin-bottom: 20px;
}
.user-info {
  display: flex;
  align-items: center;
}
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
}
.user-info-cont {
  padding-left: 50px;
  font-size: 20px;
  color: #000;
}
.factory-info {
  font-size: 18px;
  color: #000;
}
</style>

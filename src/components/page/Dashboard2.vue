<template>
  <section class="chart-container">
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:160px;">
          <div class="user-info">
            <img src="../../assets/img/img.jpg" class="user-avator" alt>
            <div class="user-info-cont">
              <div style="padding-bottom: 5px">管理员编号：{{name}}</div>
              <div>身份：{{role}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="15" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-pizza-yonghu1 grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{sumShops}}</div>
                  <div>工厂总数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-pizza-tongzhi1 grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{sumUsers}}</div>
                  <div>用户总数</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-pizza-caiwubaobiao grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">{{sumOrders}}</div>
                  <div>今日披萨总销量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
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
      urlSeletTop: "/pizzaexpress/shop/getTop5shops",
      urlGetSum: "/pizzaexpress/shop/getallsalesvolume",
      chartColumn: null,
      chartBar: null,
      name: sessionStorage.getItem("account"),
      role: "系统管理员",
      topShopData: [],
      sumOrders: 0,
      sumUsers: 0,
      sumShops: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.post(this.urlGetSum).then(res => {
        this.sumOrders = res.data.salesVolume;
        this.sumUsers = res.data.userCount;
        this.sumShops = res.data.shopCount;
      });
    },
    drawColumnChart() {
      this.chartColumn = echarts.init(document.getElementById("chartColumn"));
      this.chartColumn.setOption({
        title: { text: "今日工厂收益前五名" },
        tooltip: {},
        xAxis: {
          data: this.topShopData.shopName,
          type: "category",
          axisLabel: {
            interval: 0,
            rotate: 20
          }
        },
        yAxis: {},
        series: [
          {
            name: "收益",
            type: "bar",
            data: this.topShopData.shopSalesVolume,
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
          text: "近半年收益"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["月收益"]
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
            "2018/01",
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
            name: "月收益额",
            type: "line",
            stack: "总量",
            data: [8200, 6320, 9010, 10340, 9000, 11200],
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
    }
  },
  mounted: function() {
    this.$axios.post(this.urlSeletTop).then(res => {
      let topShops = res.data.shopData.data;
      this.topShopData = topShops;
      this.drawCharts();
    });
  },
  updated: function() {
    this.getTopShops();
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

.grid-content {
  display: flex;
  align-items: center;
  height: 160px;
}

.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}

.grid-num {
  font-size: 30px;
  font-weight: bold;
}

.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 160px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
</style>

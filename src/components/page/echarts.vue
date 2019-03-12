<template>
  <section class="chart-container">
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:220px;">
          <div class="user-info">
            <img src="../../assets/img/img.jpg" class="user-avator" alt="">
            <div class="user-info-cont">
              <div style="padding-bottom: 5px">用户：{{name}}</div>
              <div>身份：{{role}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card shadow="hover" class="mgb20" style="height:220px;">

            <div slot="header" class="clearfix">
              <span>工厂基本信息</span>

            </div>

          <el-table :data="factory_info" border class="table" >
            <el-table-column prop="factory_name" label="工厂名称" width="130"></el-table-column>
            <el-table-column prop="factory_id" label="工厂ID" width="100"></el-table-column>
            <el-table-column prop="factory_count" label="接单量（份）" width="100"></el-table-column>
            <el-table-column prop="factory_number" label="电话号码" width="100"></el-table-column>
            <el-table-column prop="factory_address" label="地址" width="130"></el-table-column>
            <el-table-column prop="start_time" label="营业时间" width="100"></el-table-column>
            <el-table-column prop="end_time" label="打烊时间" width="100"></el-table-column>
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
      <!--<el-col :span="12">-->
        <!--<div id="chartBar" style="width:100%; height:400px;"></div>-->
      <!--</el-col>-->

      <!--<el-col :span="12">-->
        <!--<div id="chartPie" style="width:100%; height:400px;"></div>-->
      <!--</el-col>-->
    </el-row>
  </section>
</template>

<script>
    import echarts from 'echarts'
    import ElFormItem from "element-ui/packages/form/src/form-item";

    export default {
      components: {ElFormItem},
      data(){
        return {
          chartColumn: null,
          chartBar: null,
          name:"three",
          role:"工厂管理员",
          factory_info:[{
            factory_name:"华东师范大学店",
            factory_id:123456,
            factory_number:12580,
            factory_count:1500,
            factory_address:"中山北路3663号",
            start_time:"8:00",
            end_time:"22:00"
            }
          ]
        }
      },
      methods: {
        drawColumnChart() {
          this.chartColumn = echarts.init(document.getElementById('chartColumn'));
          this.chartColumn.setOption({
            title: { text: '今日各种披萨销量' },
            tooltip: {},
            xAxis: {
              data: ["韩式烤肉披萨", "照烧风味牛肉土豆披萨", "豪华尊享披萨", "意式烤肠披萨", "多重浓汁披萨", "BBQ鸡肉披萨"],
              type:'category',
              axisLabel:{
                interval: 0,
                rotate:20
              }
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              data: [10, 20, 36, 10, 10, 20]
            }]
          });
        },
        drawLineChart() {
          this.chartLine = echarts.init(document.getElementById('chartLine'));
          this.chartLine.setOption({
            title: {
              text: '近半年的月销售额'
            },
            tooltip: {
              trigger: 'axis'
            },
            legend: {
              data: ['月销售额']
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: [  '2018/09', '2018/10', '2018/11', '2018/12', '2019/02','2019/03'],
              axisLabel:{
                interval: 0
              }
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                name: '月销售额',
                type: 'line',
                stack: '总量',
                data: [1200, 1320, 1010, 1340, 900, 2300]
              }
            ]
          });
        },
        drawCharts() {
          this.drawColumnChart()
          this.drawLineChart()
          // this.drawBarChart()
          // this.drawPieChart()
        }
      },
      mounted: function () {
        this.drawCharts()
      },
      updated: function () {
        this.drawCharts()
      }
    }
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
    width:120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info-cont {
    padding-left: 50px;
    font-size: 20px;
    color: #000;
  }
  .factory-info{
    font-size: 18px;
    color: #000;
  }
</style>

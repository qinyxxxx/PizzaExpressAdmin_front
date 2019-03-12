<template>
  <section >
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>工厂收益</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

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
  import echarts from 'echarts'
  import ElFormItem from "element-ui/packages/form/src/form-item";

  export default {
    components: {ElFormItem},
    data(){
      return {
        chartColumn: null,
        chartBar: null,
      }
    },
    methods: {
      drawColumnChart() {
        this.chartColumn = echarts.init(document.getElementById('chartColumn'));
        this.chartColumn.setOption({
          title: { text: '今日各个工厂的销量' },
          tooltip: {},
          xAxis: {
            data: ["韩国馆", "中国馆", "美国馆", "意大利馆", "西班牙馆", "匈牙利馆"],
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
            text: '近半年所有工厂的月销售额'
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

</style>

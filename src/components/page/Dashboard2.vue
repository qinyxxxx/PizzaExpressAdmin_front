<template>
  <section class="chart-container">
    <el-row :gutter="15">
      <el-col :span="8">
        <el-card shadow="hover" class="mgb20" style="height:160px;">
          <div class="user-info">
            <img src="../../assets/img/img.jpg" class="user-avator" alt="">
            <div class="user-info-cont">
              <div style="padding-bottom: 5px">管理员编号：{{name}}</div>
              <div>身份：{{role}}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <!--<el-card shadow="hover" class="mgb20" style="height:220px;">-->

          <!--<div slot="header" class="clearfix">-->
            <!--<span>工厂基本信息</span>-->

          <!--</div>-->

          <!--<el-table :data="factory_info" border class="table" >-->
            <!--<el-table-column prop="factory_name" label="工厂名称" width="130"></el-table-column>-->
            <!--<el-table-column prop="factory_id" label="工厂ID" width="100"></el-table-column>-->
            <!--<el-table-column prop="factory_count" label="接单量（份）" width="100"></el-table-column>-->
            <!--<el-table-column prop="factory_number" label="电话号码" width="100"></el-table-column>-->
            <!--<el-table-column prop="factory_address" label="地址" width="130"></el-table-column>-->
            <!--<el-table-column prop="start_time" label="营业时间" width="100"></el-table-column>-->
            <!--<el-table-column prop="end_time" label="打烊时间" width="100"></el-table-column>-->
          <!--</el-table>-->

        <!--</el-card>-->

        <el-row :gutter="15" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-pizza-yonghu1 grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">34</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-pizza-tongzhi1 grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">0</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-pizza-caiwubaobiao grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">657</div>
                  <div>今日销售披萨数量</div>
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
        name: sessionStorage.getItem("account"),
        role: "系统管理员",
        // factory_info:[{
        //   factory_name:"华东师范大学店",
        //   factory_id:123456,
        //   factory_number:12580,
        //   factory_count:1500,
        //   factory_address:"中山北路3663号",
        //   start_time:"8:00",
        //   end_time:"22:00"
        // }
        // ]
      }
    },
    methods: {
      drawColumnChart() {
        this.chartColumn = echarts.init(document.getElementById('chartColumn'));
        this.chartColumn.setOption({
          title: { text: '今日各个工厂净利润（万元）' },
          tooltip: {

          },
          xAxis: {
            data: ["韩国馆", "日本馆", "美国馆", "中国馆", "西班牙馆", "尼日利亚馆"],
            type:'category',
            axisLabel:{
              interval: 0,
              rotate:20
            }
          },
          yAxis: {},
          series: [{
            name: '净利润',
            type: 'bar',
            data: [10, 20, 36, 10, 10, 20],
            itemStyle:{
              normal:{
                color:'#106EDD'
              }
            }
          }]
        });
      },
      drawLineChart() {
        this.chartLine = echarts.init(document.getElementById('chartLine'));
        this.chartLine.setOption({
          title: {
            text: '近半年的月收益额（万元）'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['月收益额']
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
              name: '月收益额',
              type: 'line',
              stack: '总量',
              data: [1200, 1320, 1010, 1340, 900, 2300],
              itemStyle:{
                normal:{
                  color:'#106EDD'
                }
              }
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
  /*.factory-info{*/
    /*font-size: 18px;*/
    /*color: #000;*/
  /*}*/

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

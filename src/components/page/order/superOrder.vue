<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          订单信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-select v-model="select_cate" filterable placeholder="筛选条件" class="handle-select mr10">
          <el-option key="1" label="订单编号" value="订单编号"></el-option>
          <el-option key="2" label="配送员" value="配送员"></el-option>
        </el-select>-->
        <!-- <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input> -->
        <el-input v-model="selectShopName" placeholder="商铺编号" class="handle-input mr10"></el-input>
        <el-input v-model="selectOrderID" placeholder="订单编号" class="handle-input mr10"></el-input>
        <br>
        <br>
        <el-date-picker
          v-model="selectDate"
          type="datetimerange"
          :picker-options="pickerOptions2"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
        ></el-date-picker>
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        <br>
      </div>
      <el-table :data="orderData" ref="filterTable" border class="table" fit>
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="订单编号：">
                <span>{{ props.row.orderID }}</span>
              </el-form-item>
              <el-form-item label="所属商铺：">
                <span>{{ props.row.shopName }}</span>
              </el-form-item>
              <el-form-item label="用户：">
                <span>{{ props.row.user }}</span>
              </el-form-item>
              <el-form-item label="配送员：">
                <span>{{ props.row.deliver }}</span>
              </el-form-item>
              <el-form-item label="送餐地址：">
                <span>{{ props.row.orderAddress }}</span>
              </el-form-item>
              <el-form-item label="下单时间：">
                <span>{{ props.row.startDate }}</span>
              </el-form-item>
              <el-form-item label="送达时间：">
                <span>{{ props.row.finishDate }}</span>
              </el-form-item>
              <el-form-item label="订单内容：">
                <span>{{ props.row.orderInfo }}</span>
              </el-form-item>
              <el-form-item label="金额：">
                <span>{{ props.row.orderAmount }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column prop="orderID" label="ID" width="200"></el-table-column>
        <el-table-column prop="startDate" label="下单时间" sortable :formatter="formatter"></el-table-column>
        <el-table-column prop="shopName" label="所属商铺" width="250"></el-table-column>
        <el-table-column
          prop="orderStatus"
          label="配送状态"
          width="250"
          :filters="[{ text: '等待接单', value: '等待接单' },{ text: '配送完成', value: '配送完成' }, { text: '正在配送', value: '正在配送' }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.orderStatus === '配送完成' ? 'success' : 'primary'"
              disable-transitions
            >{{scope.row.orderStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.orderStatus=='正在配送'"
              type="text"
              icon="el-icon-view"
              @click="openDetails(scope.row)"
            >查看配送状态</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { AMapManager } from "vue-amap";
let amapManager = new AMapManager();
export default {
  name: "order",
  data() {
    return {
      urlSelect: "/pizzaexpress/order/getorderbyselect",
      urlInit: "/pizzaexpress/order/getlasttwentyorders",
      urlDeliverPos: "/pizzaexpress/order/getorderbyselect",
      orderData: [],
      cur_page: 1,
      total: 20,
      selectShopName: "",
      selectOrderID: "",
      selectDate: [],
      deliverPos: [],
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    formatter(row, column) {
      return row.startDate;
    },
    getData() {
      // this.$axios
      //   .post(this.urlInit, {
      //     shopID: sessionStorage.getItem("shopID")
      //   })
      //   .then(res => {
      //     let orderData = res.data.orderData.data;
      //     this.orderData = orderData;
      //     let status = res.data.status; //状态码
      //     if (status == 200) {
      //       console.log(this.orderData);
      //     } else {
      //       console.log(status);
      //     }
      //   });
      this.orderData = [
        {
          orderID: "1",
          startDate: "2019-02-05 10:01:00",
          finishDate: "2019-02-05 10:21:00",
          user: "秦妤欣",
          deliver: "吴青峰",
          orderInfo: "夏威夷芝心披萨",
          orderStatus: "配送完成",
          orderAmount: "100.0",
          orderAddress: "我家",
          shopName: "金沙江路店"
        },
        {
          orderID: "2",
          startDate: "2019-02-25 12:01:00",
          finishDate: "2019-02-05 12:21:00",
          user: "沈庭杉",
          deliver: "陈信宏",
          orderInfo: "帕帕罗尼披萨",
          orderStatus: "正在配送",
          orderAmount: "120.0",
          orderAddress: "小沈家",
          shopName: "长寿路店"
        },
        {
          orderID: "2",
          startDate: "2019-01-05 12:01:00",
          finishDate: "2019-02-05 12:21:00",
          user: "秦妤欣",
          deliver: "小飞象",
          orderInfo: "不管什么披萨",
          orderStatus: "等待接单",
          orderAmount: "150.0",
          orderAddress: "我家",
          shopName: "中山北路店"
        }
      ];
    },
    filterStatus(value, row) {
      return row.orderStatus === value;
    },
    search() {
      //   console.log("orderid:", this.orderID);
      //   console.log("deliverid:", this.deliverid);
      //   console.log("startTime:", typeof this.select_date[1]);
      //   console.log("shopid:", typeof sessionStorage.getItem("shopID"));
      this.$axios
        .post(this.urlSelect, {
          orderid: this.orderid,
          deliverid: this.deliverid,
          startTime: this.select_date[0],
          endTime: this.select_date[1],
          shopID: sessionStorage.getItem("shopID")
        })
        .then(res => {
          let orderData = res.data.orderData.data;
          this.orderData = orderData;
          let status = res.data.status; //状态码
          if (status == 200) {
            console.log(this.orderData);
            console.log(sessionStorage.getItem("shopID"));
          } else {
            console.log(status);
          }
        });
    },
    openDetails(row) {
        // this.$axios
        // .post(this.urlDeliverPos, {
        //   deliver: row.deliver
        // })
        // .then(res => {
        //   let deliverPos = res.data.orderData.data;
        //   this.deliverPos = deliverPos;
        //   let status = res.data.status; //状态码
        //   if (status == 200) {
        //     console.log(this.deliverPos);
        //   } else {
        //     console.log(status);
        //   }
        // });
        this.deliverPos = [121.4064320000, 31.2267820000],
        this.$router.push({
          name: "SuperOrderDetail",
          query: {
            // detail: row
            orderID: row.orderID,
            startDate: row.startDate,
            orderInfo: row.orderInfo,
            deliver: row.deliver,
            user: row.user,
            deliverPos: this.deliverPos,
            shopName: row.shopName,
            orderAddress: row.orderAddress
          }
        });
      console.log("row:", row);
      console.log("pos:", this.deliverPos);
    }
  },
  watch: {

  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>

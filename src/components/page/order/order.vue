<template>
  <div class="table">
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i>
          工厂订单信息
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="handle-box">
        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button> -->
        <el-select v-model="select_cate" filterable placeholder="筛选条件" class="handle-select mr10">
          <el-option key="1" label="订单编号" value="订单编号"></el-option>
          <el-option key="2" label="配送员" value="配送员"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <br>
        <br>
        <el-date-picker
          v-model="select_date"
          type="datetimerange"
          :picker-options="pickerOptions2"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
        <br>
      </div>
      <el-table :data="orderData" ref="filterTable" border class="table" fit>
        <!--@selection-change="handleSelectionChange" -->
        <!-- <el-table-column type="selection" width="55" align="center"></el-table-column> -->
        <el-table-column prop="orderid" label="ID" width="100"></el-table-column>
        <el-table-column prop="date" label="订单时间" sortable width="200"></el-table-column>
        <el-table-column prop="user" label="用户" width="120"></el-table-column>
        <el-table-column prop="deliver" label="配送员" width="120"></el-table-column>
        <el-table-column prop="orderInfo" label="订单内容" width="250"></el-table-column>
        <el-table-column
          prop="orderStatus"
          label="配送状态"
          width="120"
          :filters="[{ text: '配送完成', value: '配送完成' }, { text: '正在配送', value: '正在配送' }]"
          :filter-method="filterStatus"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.orderStatus === '配送完成' ? 'primary' : 'success'"
              disable-transitions
            >{{scope.row.orderStatus}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderAmount" label="金额" width="120"></el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" icon="el-icon-view" @click="openDetails(scope.row)">查看</el-button>
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
        <el-button type="primary" icon="search" @click="goTo">走着看看</el-button>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: "order",
  data() {
    return {
      urlSelect: "/pizzaexpress/order/getorderbyselect",
      urlInit: "/pizzaexpress/order/getlasttwentyorders",
      orderData: [],
      cur_page: 1,
      total: 20,
      // multipleSelection: [],  // 多选
      select_cate: "",
      select_word: "",
      select_date: [],
      orderid: "-1",
      deliverid: "-1",
      // editVisible: false,  // 编辑按钮可以看见否
      // delVisible: false,   // 删除按钮可以显示否
      idx: -1,
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
      }
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
    getData() {
      this.$axios
        .post(this.urlInit, {
          shopID: sessionStorage.getItem("shopID")
        })
        .then(res => {
          let orderData = res.data.orderData.data;
          this.orderData = orderData;
          let status = res.data.status; //状态码
          if (status == 200) {
            console.log(this.orderData);
          } else {
            console.log(status);
          }
        });
      // this.orderData = [
      //   {
      //     orderid: "1",
      //     date: "2019-02-05 10:01:00",
      //     user: "秦妤欣",
      //     deliver: "吴青峰",
      //     orderInfo: "夏威夷芝心披萨",
      //     orderStatus: "配送完成",
      //     orderAmount: "100.0"
      //   },
      //   {
      //     orderid: "2",
      //     date: "2019-02-25 12:01:00",
      //     user: "沈庭杉",
      //     deliver: "陈信宏",
      //     orderInfo: "帕帕罗尼披萨",
      //     orderStatus: "正在配送",
      //     orderAmount: "120.0"
      //   },
      //   {
      //     orderid: "2",
      //     date: "2019-01-05 12:01:00",
      //     user: "秦妤欣",
      //     deliver: "小飞象",
      //     orderInfo: "不管什么披萨",
      //     orderStatus: "正在配送",
      //     orderAmount: "150.0"
      //   }
      // ];
    },
    filterStatus(value, row) {
      return row.orderStatus === value;
    },
    search() {
      switch (this.select_cate) {
        case "配送员":
          this.orderid = "-1";
          this.deliverid = this.select_word;
          break;
        case "订单编号":
          this.deliverid = "-1";
          this.orderid = this.select_word;
          break;
      }

      console.log("orderid:", this.orderid);
      console.log("deliverid:", this.deliverid);
      console.log("startTime:", typeof this.select_date[1]);
      console.log("shopid:", typeof sessionStorage.getItem("shopID"));
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
      this.$router.push({
        name: "OrderDetail",
        params: {
          detail: row
        }
      });
      console.log("row:", row.orderid);
    },
    goTo(){
      this.$router.push('/Home2')
    }
    // handleClose(done) {
    //   this.$confirm("确认关闭？")
    //     .then(_ => {
    //       done();
    //     })
    //     .catch(_ => {});
    // }
    // handleEdit(index, row) {
    //     this.idx = index;
    //     const item = this.tableData[index];
    //     this.form = {
    //         orderid: item.orderid,
    //         date: item.date,
    //         user: item.user,
    //         deliverer: item.deliverer,
    //         orderInfo: item.orderInfo,
    //         orderStatus: item.orderStatus,
    //         orderAmount: item.orderAmount
    //     }
    //     // this.editVisible = true;
    // },
    // handleDelete(index, row) {
    //     this.idx = index;
    //     this.delVisible = true;
    // },
    // delAll() {
    //     const length = this.multipleSelection.length;
    //     let str = '';
    //     this.del_list = this.del_list.concat(this.multipleSelection);
    //     for (let i = 0; i < length; i++) {
    //         str += this.multipleSelection[i].name + ' ';
    //     }
    //     this.$message.error('删除了' + str);
    //     this.multipleSelection = [];
    // },
    // handleSelectionChange(val) {
    //     this.multipleSelection = val;
    // },
    // 保存编辑
    // saveEdit() {
    //     this.$set(this.tableData, this.idx, this.form);
    //     this.editVisible = false;
    //     this.$message.success(`修改第 ${this.idx+1} 行成功`);
    // },
    // // 确定删除
    // deleteRow(){
    //     this.tableData.splice(this.idx, 1);
    //     this.$message.success('删除成功');
    //     this.delVisible = false;
    // }
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
</style>
